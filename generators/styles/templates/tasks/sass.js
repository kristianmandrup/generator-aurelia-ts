var gulp = require('gulp');
var paths = require('../paths');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');

gulp.task('sass', function () {
  gulp.src(paths.sass)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('styles.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styleDest));
});

gulp.task('sass:watch', function () {
  gulp.watch(paths.sass, ['sass']);
});
