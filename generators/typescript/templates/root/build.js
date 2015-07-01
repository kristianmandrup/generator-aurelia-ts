var gulp = require('gulp');
var runSequence = require('run-sequence');
var ts = require('gulp-typescript');
var merge = require('merge2');
var changed = require('gulp-changed');
var paths = require('../paths');

var path = {
  sourceTS: "views/**/*.ts",
  html: "views/**/*.html",
  style: "styles/**/*.css"
}

gulp.task('build-system', function() {
  var tsResult = gulp.src([
      './typings/**/*.d.ts',
      './src/*.ts'
    ], {
      base: "src"
    })
    .pipe(ts({
      typescript: require('typescript'),
      declarationFiles: false,
      noExternalResolve: true,
      target: "es5",
      module: "<%= (amd)? 'amd': 'commonjs' %>",
      // emitDecoratorMetadata: true,
      noImplicitAny: false,
      removeComments: false,
      noLib: false
    }));

  return merge([
    tsResult.dts.pipe(gulp.dest('dist')),
    tsResult.js.pipe(gulp.dest('dist'))
  ]);
});
/*
gulp.task('build-system', function() {
  var tsPrj = ts.createProject('tsconfig.json');
  var tsResult = tsPrj.src()
    .pipe(ts(tsPrj));

  return merge([
    tsResult.dts.pipe(gulp.dest('.')),
    tsResult.js.pipe(gulp.dest('.'))
  ]);
});
*/
// copies changed html files to the output directory
gulp.task('build-html', function () {
  return gulp.src(paths.html)
    .pipe(changed(paths.output, {extension: '.html'}))
    .pipe(gulp.dest(paths.output));
});

// this task calls the clean task (located
// in ./clean.js), then runs the build-system
// and build-html tasks in parallel
// https://www.npmjs.com/package/gulp-run-sequence
gulp.task('build', function(callback) {
  return runSequence(
    'clean',
    ['build-system', 'build-html'],
    callback
  );
});
