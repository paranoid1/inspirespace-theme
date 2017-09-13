var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

// Setup autoprefixer as Bootstrap
var autoprefixerOptions = require('./node_modules/bootstrap/build/postcss.config.js')({ file: { dirname: "undefined" } }).plugins.autoprefixer;


const PATH_DIST = "dist/";
const PATH_SRC = "src/";
const TARGET_CSS = "inspirespace";

gulp.task('serve', ['sass', 'sass-min'], function () {
  browserSync.init({
    server: "./"
  });

  gulp.watch(PATH_SRC + 'scss/*.scss', ['sass', 'sass-min']);
  gulp.watch('*.html').on('change', browserSync.reload);
});

gulp.task('sass', function () {
  return gulp.src(PATH_SRC + 'scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true,
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(rename(TARGET_CSS + ".css"))
    .pipe(gulp.dest(PATH_DIST + 'css'))
    .pipe(browserSync.stream());
});

gulp.task('sass-min', function () {
  return gulp.src(PATH_SRC + 'scss/main.scss')
    .pipe(sass({
      errLogToConsole: true,
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(rename(TARGET_CSS + ".min.css"))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(PATH_DIST + 'css'))
    .pipe(browserSync.stream());
});

gulp.task('font', function () {
  return gulp.src([
    'node_modules/typeface-metropolis/Webfonts/**/*.woff',
    'node_modules/typeface-metropolis/Webfonts/**/*.woff2',
    'node_modules/typeface-playfair-display/files/*.woff',
    'node_modules/typeface-playfair-display/files/*.woff2',
    'node_modules/open-iconic/font/fonts/*',
    'vendor/Geomanist-Complete-Webfont/**/*.eot',
    'vendor/Geomanist-Complete-Webfont/**/*.svg',
    'vendor/Geomanist-Complete-Webfont/**/*.ttf',
    'vendor/Geomanist-Complete-Webfont/**/*.woff',
    'vendor/Geomanist-Complete-Webfont/**/*.woff2'
  ])
    .pipe(rename({ dirname: '' }))
    .pipe(gulp.dest(PATH_DIST + "font"));
});

gulp.task('js', function () {
  return gulp.src('node_modules/bootstrap/dist/js/*.js')
    .pipe(gulp.dest(PATH_DIST + "js"));
});

gulp.task('default', ['font', 'js', 'serve']);