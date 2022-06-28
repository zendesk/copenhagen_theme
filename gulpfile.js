'use strict';

const gulp = require('gulp'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    cleancss = require('gulp-clean-css'),
    uglify = require('gulp-uglify-es').default,
    sass = require('gulp-sass')(require('node-sass')),
    clean = require('gulp-clean'),
    purgecss = require('gulp-purgecss'),
    rename = require('gulp-rename'),
    merge = require('merge-stream'),
    injectstring = require('gulp-inject-string'),
    bundleconfig = require('./bundleconfig.json'),
    fs = require('fs');

const editFilePartial = 'Edit this file at https://github.com/chocolatey/choco-theme/partials';
const { series, parallel, src, dest, watch } = require('gulp');

const regex = {
    css: /\.css$/,
    js: /\.js$/
};

const paths = {
    templates: 'templates/',
    globalpartials: 'global-partials/',
    assets: 'assets/',
    partials: 'global-partials',
    node_modules: 'node_modules/',
    theme: 'node_modules/choco-theme/'
};

const getBundles = (regexPattern) => {
    return bundleconfig.filter(bundle => {
        return regexPattern.test(bundle.outputFileName);
    });
};

function del() {
    return src([
        paths.assets + 'css',
        paths.assets + 'js',
        paths.assets + 'fonts',
        paths.assets + 'images/global-shared',
        paths.partials
    ], { allowEmpty: true })
        .pipe(clean({ force: true }));
}

function copyTheme() {
    var copyThemeToggleHbs = src(paths.theme + 'partials/ThemeToggle.txt')
        .pipe(injectstring.prepend('---\npartial: themetoggle\n---\n{{!-- ' + editFilePartial + ' --}}\n'))
        .pipe(rename({ basename: 'themetoggle', extname: '.hbs' }))
        .pipe(dest(paths.partials));

    return merge(copyThemeToggleHbs);
}

function compileSass() {
    return src(paths.theme + 'scss/zendesk.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest(paths.assets + 'css'));
}

function compileJs() {
    var tasks = getBundles(regex.js).map(function (bundle) {

        return src(bundle.inputFiles, { base: '.' })
            .pipe(babel({
                "sourceType": "unambiguous",
                "presets": [
                    ["@babel/preset-env", {
                        "targets": {
                            "ie": "10"
                        }
                    }
                  ]]
            }))
            .pipe(concat(bundle.outputFileName))
            .pipe(dest('.'));
    });

    return merge(tasks);
}

function compileCss() {
    var tasks = getBundles(regex.css).map(function (bundle) {

        return src(bundle.inputFiles, { base: '.' })
            .pipe(concat(bundle.outputFileName))
            .pipe(dest('.'));
    });

    return merge(tasks);
}

function purgeCss() {
    return src(paths.assets + 'css/chocolatey.bundle.css')
        .pipe(purgecss({
            content: [
                paths.templates + '*.hbs',
                paths.globalpartials + '*.hbs',
                paths.assets + 'js/*.*',
                paths.assets + 'js/*.*.*',
                paths.assets + 'js/*.*.*.*'
            ],
            safelist: ['::-webkit-scrollbar', '::-webkit-scrollbar-thumb', 'link-light', 'main', 'table-bordered', 'table-striped', 'table-responsive-sm', 'clear-button'],
            keyframes: true,
            variables: true
        }))
        .pipe(dest(paths.assets + 'css/'));
}

function minCss() {
    var tasks = getBundles(regex.css).map(function (bundle) {

        return src(bundle.outputFileName, { base: '.' })
            .pipe(cleancss({
                level: 2,
                compatibility: 'ie8'
            }))
            .pipe(rename({ suffix: '.min' }))
            .pipe(dest('.'));
    });

    return merge(tasks);
}

function minJs() {
    var tasks = getBundles(regex.js).map(function (bundle) {

        return src(bundle.outputFileName, { base: '.' })
            .pipe(uglify())
            .pipe(rename({ suffix: '.min' }))
            .pipe(dest('.'));
    });

    return merge(tasks);
}

function delEnd() {
    return src([
        paths.assets + 'css/*.css',
        '!' + paths.assets + 'css/*.min.css',
        paths.assets + 'js/*.js',
        '!' + paths.assets + 'js/*.min.js'
    ], { allowEmpty: true })
        .pipe(clean({ force: true }));
}

// Independednt tasks
exports.del = del;
exports.compileSass = parallel(compileSass);
// Gulp series
exports.compileSassJs = parallel(compileSass, compileJs);
exports.minCssJs = parallel(minCss, minJs);

// Gulp default
exports.default = series(copyTheme, exports.compileSassJs, compileCss, purgeCss, exports.minCssJs, delEnd);

// Watch files
exports.watchFiles = function () {
    watch([paths.theme], exports.default);
};