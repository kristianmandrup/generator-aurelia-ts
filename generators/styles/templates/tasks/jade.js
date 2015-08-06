var gulp = require('gulp');
var paths = require('../paths');
var jade = require('gulp-jade');

gulp.task('jade', function() {
  gulp.src(paths.jadeSrc)
    .pipe(jade({
      client: true
    }))
    .pipe(gulp.dest(paths.root))
});

gulp.task('jade:watch', function () {
  gulp.watch(paths.jade, ['jade']);
});
