var path = require('path');

var appRoot = 'src/';
var outputRoot = 'dist/';

module.exports = {
  root: appRoot,
  source: appRoot + '**/*.js',
  jadeSrc: appRoot +'templates/**/*.jade',
  sourceTS: appRoot + '**/*.ts',
  typings: appRoot + '../typings/tsd.d.ts',
  html: appRoot + '**/*.html',
  style: 'styles/css/**/*.css',
  sass: 'styles/sass/**/*.scss',
  stylus: 'styles/stylus/**/*.scss',
  styleDest: './styles/css',

  output: outputRoot,
  sourceMapRelativePath: '../' + appRoot,
  doc:'./doc',
  e2eSpecsSrc: 'test/e2e/src/*.js',
  e2eSpecsDist: 'test/e2e/dist/'
};
