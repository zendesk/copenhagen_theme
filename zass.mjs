import path from "path";
import fs from "fs";
import sass from "rollup-plugin-sass";

const manifestPath = path.resolve("manifest.json");
const assetsPath = path.resolve("assets");

const data = fs.readFileSync(manifestPath, "utf-8");
const manifest = JSON.parse(data);
const variables = manifest.settings.reduce(
  (variables, setting) =>
    variables.concat(setting.variables.map((variable) => variable.identifier)),
  []
);
const filenames = fs.readdirSync(assetsPath);

// Make sure all assets have an allowed filename that can be used as a variable
for (const file of filenames) {
  if (file === ".gitkeep") continue;
  const extname = path.extname(file);
  const basename = path.basename(file, extname).toLowerCase();
  if (basename.match(/[^a-z0-9-_+.]/)) {
    throw new Error(
      `The asset "${file}" has illegal characters in its name. Filenames should only have alpha-numerical characters, ., _, -, and +`
    );
  } else {
    variables.push(
      `assets-${basename.replace(/\+|\./g, "-")}-${extname.split(".").pop()}`
    );
  }
}

// The preamble assigns all the ignored variables to an escaped version of
// the variable name itself, e.g.
//
//   $foo: \$foo;
//
// This makes Sass replace occurences of the variable with the escaped name.
//
// Afterwards, the escaped names can be unescaped, yielding a CSS file with
// the ignored variables intact.
const preamble = variables
  .map((variable) => `$${variable}: \\$${variable};`)
  .join("\n");

// Unescapes all escaped variables
const unescapeVariables = (css) => css.replace(/\\\$/g, "$");

// Converts darken and lighten filter so that zass will process
// them and user can see them as normal sass css function in the editor.
//
// Note: we are prefixing them with `zass-` because we don't want
// the Sass-c compiler to execute them since we want the end-users
// to see those function in the editor when customizing their template.
function convertZassFunctions(css) {
  return css
    .replace(/zass-lighten/g, "lighten")
    .replace(/zass-darken/g, "darken");
}

export default () =>
  sass({
    output: "style.css",
    options: { data: preamble },
    processor: (css) => {
      const unescaped = unescapeVariables(css);
      return convertZassFunctions(unescaped);
    },
  });
