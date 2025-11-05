const localUrl = 'zberegy'
const silenceDeprecations = ['color-functions', 'global-builtin', 'import', 'abs-percent', 'legacy-js-api']

const {src, dest, parallel, series, watch} = require('gulp');
const browserSync  = require('browser-sync').create();
const concat       = require('gulp-concat');
const uglify       = require('gulp-uglify-es').default;
// const sass         = require('gulp-sass'); //old version :((
var sass = require('gulp-dart-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleancss     = require('gulp-clean-css');
const imagemin     = require('gulp-imagemin'),
      newer        = require('gulp-newer');
const rigger       = require('gulp-rigger');
const sourcemaps   = require('gulp-sourcemaps');
const fileinclude  = require('gulp-file-include');
const formatHtml = require('gulp-format-html')
var removeEmptyLines = require('gulp-remove-empty-lines');
// const del          = require('del');


function browsersync() {
  browserSync.init({
    // proxy: localUrl,
    server: {baseDir: 'dist'},
    // host: "192.168.0.103",
    notify: false,
    // port: 4200,
    // port: 3000,
    // online: true
  })
}

function styles() {
  return src('src/sass/style.sass')
    .pipe(sourcemaps.init())
    .pipe(sass({ silenceDeprecations }))
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({overrideBrowserslist:  ['last 10 versions'], grid: true}))
    .pipe(cleancss(({level: {1: {specialComments: 0}}})))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/static/css/'))
    .pipe(browserSync.stream());
}

function stylesHeader() {
  return src('src/sass/header.sass')
    .pipe(sourcemaps.init())
    .pipe(sass({ silenceDeprecations }))
    .pipe(concat('header.min.css'))
    .pipe(autoprefixer({overrideBrowserslist:  ['last 10 versions'], grid: true}))
    .pipe(cleancss(({level: {1: {specialComments: 0}}})))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/static/css/'))
    .pipe(browserSync.stream());
}

// function cleanStyles() {
//   return src('src/sass/all/all.sass')
//     .pipe(sass())
//     .pipe(cleancss(({level: {1: {specialComments: 0}}})))
//     .pipe(dest('static/css/all/'));
// }

function scripts() {
  return src('src/js/common.js')
    .pipe(rigger())
    .pipe(concat('common.min.js'))
    .pipe(uglify())
    .pipe(dest('dist/static/js/'))
    .pipe(browserSync.stream());

    // .pipe(concat('all.min.js'))
    // .pipe(uglify())
    //.pipe(dest('../../js/'))
    //.pipe(browserSync.stream());
}

function scriptsModules() {
  return src('src/js/modules.js')
    .pipe(rigger())
    .pipe(concat('modules.min.js'))
    .pipe(uglify())
    .pipe(dest('dist/static/js/'))
    .pipe(browserSync.stream());
}

// function cleanImg() {
//   // , '!static/img/favicon'
//   return del(['static/img/**/*'])
// }

function images(){
  return src('src/img/**/*')
    .pipe(newer('dist/static/img/'))
    // .pipe(imagemin())
    .pipe(dest('dist/static/img/'));
}


function fonts(){
  return src('src/fonts/**/*')
    .pipe(dest('dist/static/fonts/'))
}

// function svg(){
//   return src('src/svg/**/*')
//     .pipe(dest('static/svg/'))
// }

// function cleanHtml() {
//   return del(['*.html'])
// }

function htmlConcat() {
  return src(['src/html/*.html', 'src/html/*.php', '!src/html/_*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
    }))
    .pipe(removeEmptyLines({
      removeComments: false,
      removeSpaces: true
    }))
    .pipe(formatHtml())
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

const htmlFiles = [
  // 'src/**/*.html',
  'dist/*.html',
]

function startwatch(){
  watch(['src/sass/**/*.(sass|scss)'], parallel(styles, stylesHeader));
  // watch(['src/sass/**/*.(sass|scss)'], parallel(stylesHeader));
  watch(['src/js/**/*.js'], parallel(scripts));
  watch(['src/js/modules.js'], parallel(scriptsModules));
  // watch(['src/**/*.html'], parallel(cleanHtml));
  watch(['src/**/*.html'], parallel(htmlConcat));
  // watch('src/img/**/*', parallel(cleanImg));
  watch('src/img/**/*', parallel(images));
  watch(['src/fonts/**/*'], parallel(fonts));
  watch(htmlFiles).on('change', browserSync.reload);
}

exports.browsersync = browsersync;
exports.scripts = scripts;
exports.scriptsModules = scriptsModules;
exports.styles = styles;
exports.stylesHeader = stylesHeader;
// exports.cleanHtml = cleanHtml;
exports.htmlConcat = htmlConcat;
// exports.cleanImg = cleanImg;
exports.images = images;
exports.fonts = fonts;

// exports.cleanStyles = cleanStyles;

// exports.default = parallel(browsersync, scripts, cleanHtml, htmlConcat, // cleanImg, images, fonts, startwatch);
exports.default = parallel(browsersync, scriptsModules, scripts, htmlConcat, images, fonts, startwatch);
exports.b = parallel(scriptsModules, scripts, htmlConcat, images, fonts);
// exports.default = parallel(browsersync, startwatch);