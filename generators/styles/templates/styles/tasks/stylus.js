var gulp = require('gulp');
var paths = require('../paths');
var stylus = require('gulp-stylus');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('stylus', function () {
  gulp.src(paths.stylus)
    .pipe(sourcemaps.init())
    .pipe(stylus({
      'include css': true
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styleDest));
});

gulp.task('stylus:watch', function () {
  gulp.watch(paths.stylus, ['stylus']);
});
