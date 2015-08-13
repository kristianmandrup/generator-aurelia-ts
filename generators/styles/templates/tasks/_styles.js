var gulp = require('gulp');

gulp.task('styles:build', function(callback) {
  return runSequence(
    [<%= preProcessors %>],
    callback
  );
});

gulp.task('styles:watch', [<%= watchTasks %>], function(callback) {
  console.log('Watching <%= styles %> files for changes...');
});
