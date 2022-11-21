// config
import { config as gulpConfig } from './gulp.config';
import { config as webpackConfig } from './webpack.config';
import { viewports } from './tokens';

// plugins
import { readFile, readdir, writeFile } from 'fs/promises';
import junk from 'junk';
import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import sassVars from 'gulp-sass-vars';
import imagemin from 'gulp-imagemin';
import postCss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import webpack from 'webpack';

/*
  Tasks
*/
const manifestVariables = () => {
  return readFile(gulpConfig.zendesk.manifest, 'utf8')
    .then((data) => {
      const parsedData = JSON.parse(data);
      const { settings } = parsedData;

      const variables = settings
        .map((item) => {
          return item.variables;
        })
        .flat();

      const identifiers = variables.map((item) => {
        return item.identifier;
      });

      return identifiers;
    })
    .catch((err) => console.error('Error while loadind manifest file!', err));
};

const assetsVariables = () => {
  return readdir(gulpConfig.assets.input.path)
    .then((filesList) => {
      const fixedFilesList = filesList.filter(junk.not);

      const variables = fixedFilesList.map((fileName) => {
        const fixedFileName = fileName.replace(/[^a-z0-9\-_]+/g, '-');

        return `assets-${fixedFileName}`;
      });

      return variables;
    })
    .catch((err) => console.error('Error while loading assets dir!', err));
};

const zendeskSassVars = async () => {
  const variables = new Object();

  await Promise.all([manifestVariables(), assetsVariables()]).then((values) => {
    const flat = values.flat();

    flat.forEach((value) => {
      variables[value] = '\t' + '$' + value + '\t';
    });
  });

  return variables;
};

const compileStyles = async () => {
  const sassCompiler = gulpSass(dartSass);
  const plugins = [autoprefixer()];
  const customVars = await zendeskSassVars();

  return gulp
    .src(`${gulpConfig.sass.input.path}/${gulpConfig.sass.input.file}`)
    .pipe(
      sassVars(
        {
          ...customVars,
          viewports
        },
        { verbose: false }
      )
    )
    .pipe(sassCompiler({ outputStyle: 'compressed' }).on('error', sassCompiler.logError))
    .pipe(postCss(plugins))
    .pipe(gulp.dest(gulpConfig.sass.output.path));
};

const unescapeCss = () => {
  return readFile(`${gulpConfig.sass.output.path}/${gulpConfig.sass.output.file}`, 'utf8')
    .then((data) => {
      const unescaped = data.replace(/zass-/gm, '').replace(/\"\t/g, '').replace(/\t\"/g, '');

      writeUnescapedCss(unescaped);
    })
    .catch((err) => console.error('Error while unescaping compiled CSS!', err));
};

const writeUnescapedCss = (unescapedCss) => {
  writeFile(`${gulpConfig.sass.output.path}/${gulpConfig.sass.output.file}`, unescapedCss)
    .then((data) => {
      console.log('Unescaped CSS written successfully!');
    })
    .catch((err) => console.error('Error while writing unescaped CSS!', err));
};

const compileScripts = () => {
  return new Promise((resolve, reject) => {
    webpack(webpackConfig, (err, stats) => {
      if (err) {
        return reject(err);
      }

      if (stats.hasErrors()) {
        return reject(new Error(stats.compilation.errors.join('\n')));
      }

      resolve();
    });
  });
};

const compressImages = () => {
  return gulp
    .src(`${gulpConfig.assets.input.path}/*`)
    .pipe(imagemin())
    .pipe(gulp.dest(gulpConfig.assets.output.path));
};

const copyTemplates = () => {
  return gulp
    .src(`${gulpConfig.templates.input.path}/**`)
    .pipe(gulp.dest(gulpConfig.templates.output.path));
};

const copySettings = () => {
  return gulp
    .src(`${gulpConfig.settings.input.path}/**`)
    .pipe(gulp.dest(gulpConfig.settings.output.path));
};

/*
  Watchers
*/
const watch = () => {
  gulp.watch(`${gulpConfig.sass.input.path}/**/*.scss`, gulp.series(compileStyles, unescapeCss));
  gulp.watch(`${gulpConfig.scripts.input.path}/**/*.js`, compileScripts);
  gulp.watch(`${gulpConfig.templates.input.path}/*.hbs`, copyTemplates);
  // gulp.watch(`${gulpConfig.sass.output.path}/${gulpConfig.sass.output.file}`, unescapeCss);
};

/*
  Builders
*/
const build = gulp.series(
  gulp.parallel(compileStyles, compileScripts, compressImages, copyTemplates, copySettings),
  unescapeCss
);

/*
  Exports
*/
exports.watch = gulp.series(build, watch);
exports.build = build;
