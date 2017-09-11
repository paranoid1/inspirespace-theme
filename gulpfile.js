var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var rename = require('gulp-rename');

const PATH_DIST = "dist/";
const PATH_SRC = "src/";

gulp.task('serve', ['sass'], function () {
  browserSync.init({
    server: "./"
  });

  gulp.watch(PATH_SRC + 'scss/*.scss', ['sass']);
  gulp.watch('*.html').on('change', browserSync.reload);
});

gulp.task('sass', function () {
  return gulp.src(PATH_SRC + 'scss/main.scss')
    .pipe(sass())
    .pipe(gulp.dest(PATH_DIST + 'css'))
    .pipe(browserSync.stream());
});

gulp.task('font', function() {
  return gulp.src([
    'node_modules/metropolis-font/Webfonts/**/*.woff',
    'node_modules/metropolis-font/Webfonts/**/*.woff2'])
    .pipe(rename({dirname: ''}))
    .pipe(gulp.dest(PATH_DIST + "font"));
});

gulp.task('default', ['font', 'serve']);