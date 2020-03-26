import {
  dest,
  series,
  src,
  watch,
} from 'gulp';
import { exec } from 'child_process';
import nodeSass from 'node-sass';

import $autoprefixer from 'gulp-autoprefixer';
import $concat from 'gulp-concat';
import $cssnano from 'gulp-cssnano';
import $sass from 'gulp-sass';
import $stylelint from 'gulp-stylelint';

$sass.compiler = nodeSass;

const execCommand = (command, cb) => {
  const child = exec(command);
  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);
  child.on('close', () => cb());
};

export const buildScss = () => src(`src/scss/index.scss`)
  .pipe($sass({
    includePaths: ['node_modules']
  }).on('error', $sass.logError))
  .pipe($cssnano({ discardComments: { removeAllButFirst: true }, safe: true }))
  .pipe($autoprefixer())
  .pipe($concat('saagie.scss'))
  .pipe(dest(`./styles`));

export const lintScss = () => src('src/scss/*.scss')
  .pipe($stylelint({
    reporters: [{ formatter: 'string', console: true }],
  }));

export const buildDefaultScss = (cb) => execCommand('ruby ./bin/compile.rb', cb);

export const watchScss = () => watch('./src/scss/*.scss', series(buildScss, buildDefaultScss));

export const build = series(
  buildScss,
  buildDefaultScss,
  lintScss
);

export const start = series(
  build,
  watchScss
);

export default build;