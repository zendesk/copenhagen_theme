module.exports = function(source) {
  return source
    .replace(/zass-lighten/g, 'lighten')
    .replace(/zass-darken/g, 'darken');
}
