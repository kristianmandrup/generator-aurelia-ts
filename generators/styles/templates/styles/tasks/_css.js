var gulp = require('gulp');

gulp.task('css:build', function(callback) {
  return runSequence(
    [<%= preProcessors %>],
    callback
  );
});

gulp.task('css:watch', [<%= watchTasks %>], function(callback) {
  console.log('Watching <%= styles %> files for changes...');
});
