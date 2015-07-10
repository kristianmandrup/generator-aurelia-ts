var gulp = require('gulp');
var karma = require('karma').server;

/**
 * Run test once and exit
 */
gulp.task('test', ['build-system'], function (done) {
    karma.start({
        configFile: __dirname + '/../../karma.conf.js',
        singleRun: true
    }, function(e) {
        done();
    });
});

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('tdd', ['build-system'], function (done) {
    karma.start({
        configFile: __dirname + '/../../karma.conf.js'
    }, function(e) {
        done();
    });
});
