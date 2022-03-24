const path = require('path');
const fs = require('fs');

module.exports = async function(source) {
  var callback = this.async();
  var manifestPath = path.resolve('manifest.json');
  var assetsPath = path.resolve('assets');

  this.addDependency(manifestPath);
  this.addContextDependency(assetsPath);

  fs.readFile(manifestPath, 'utf-8', (err, data) => {
    if (err) return callback(err);

    const manifest = JSON.parse(data);
    const variables = manifest.settings.reduce((variables, setting) => variables.concat(setting.variables.map(variable => variable.identifier)), []);

    fs.readdir(assetsPath, (err, files) => {
      if (err) return callback(err);

      for (const file of files) {
        if (file === ".gitkeep") continue;

        const extname = path.extname(file);
        const basename = path.basename(file, extname).toLowerCase();

        if (basename.match(/[^a-z0-9-_+]/)) {
          const error = new Error(`The asset "${file}" has illegal characters in its name. Filenames should only have alpha-numerical characters, _, -, and +`)
          this.emitError(error);
        } else {
          variables.push(`assets-${basename.replace(/\+/g, "-")}-${extname.split('.').pop()}`)
        }
      }

      const preamble = variables.map(variable => `$${variable}: \\$${variable};`).join("\n");
      callback(null, `${preamble}\n${source}`);
    });
  });
}
