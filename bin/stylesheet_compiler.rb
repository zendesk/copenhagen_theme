gem 'sassc', '1.12.1'
require 'sassc'

# Compiles SCSS to CSS, while allowing some variables to be ignored. This is
# nice if you have a different way of inserting some variables, e.g. user
# settings.
#
# Example
#
#   scss = "$color: #424242; h1 { color: $color; }"
#   ThemeStylesheet.compile(scss)
#   #=> "h1 { color: #424242; }"
#
#   scss = "$color: #424242; h1 { color: $color; font-size: $size; }"
#   ThemeStylesheet.compile(scss, ["size"])
#   #=> "h1 { color: #424242; font-size: $size; }"
#
class StylesheetCompiler
  def self.compile(scss, ignored_variables = [])
    new([], ignored_variables).compile(scss)
  end

  # Builds a new StylesheetCompiler.
  #
  # load_paths        - An Array of String load paths from which Sass modules
  #                     should be looked up.
  # ignored_variables - An Array of String variable names that should be
  #                     ignored.
  #
  def initialize(load_paths = [], ignored_variables = [])
    @load_paths = load_paths
    @ignored_variables = ignored_variables
  end

  # Compiles the SCSS into CSS.
  #
  # scss - A String containing SCSS.
  #
  # Returns a new CSS String.
  def compile(scss)
    # this comes in as a single string
    stylesheet = "#{preamble}\n#{scss}"
    options = {
      syntax: :scss,
      style: :expanded,
      load_paths: @load_paths,
      filename: "style.scss",
    }

    SassC::Engine.new(stylesheet, options).render.tap do |css|
      unescape_variables!(css)
      convert_zass_functions!(css)
    end
  end

  private

  # The preamble assigns all the ignored variables to an escaped version of
  # the variable name itself, e.g.
  #
  #   $foo: \$foo;
  #
  # This makes Sass replace occurences of the variable with the escaped name.
  #
  # Afterwards, the escaped names can be unescaped, yielding a CSS file with
  # the ignored variables intact.
  #
  # Returns a String preamble.
  def preamble
    @ignored_variables.
      map {|name| escape_variable(name) }.
      join("\n")
  end

  # Escapes that variable by generating a Sass variable assignment.
  #
  # Returns a String Sass variable assignment.
  def escape_variable(name)
    "$#{name}: \\$#{name};"
  end

  # Unescapes an escaped variable.
  #
  # Returns a String.
  def unescape_variables!(css)
    css.gsub!("\\$", "$")
  end

  # Converts darken and lighten filter so that zass will process
  # them and user can see them as normal sass css function in the editor.
  #
  # Note: we are prefixing them with `zass-` because we don't want
  # the Sass-c compiler to execute them since we want the end-users
  # to see those function in the editor when customizing their template.
  #
  # Returns a String.
  def convert_zass_functions!(css)
    keys_regex = /(zass-darken|zass-lighten)/

    substitution_hash = {
      'zass-darken' => 'darken',
      'zass-lighten' => 'lighten'
    }

    css.gsub!(keys_regex, substitution_hash)
  end
end
