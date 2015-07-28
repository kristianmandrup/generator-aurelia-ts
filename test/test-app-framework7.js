
'use strict';

var path = require('path');
var generator = require('yeoman-generator');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');
var sinon = require('sinon');
var app;

describe('aurelia-ts:app with Framework7', function () {
  this.spy = sinon.spy();
  var dummyGen = generator.Base.extend({
    exec: this.spy
  });

  before(function(done) {
    app = helpers.run(path.join(__dirname, '../generators/app'))
      .withGenerators([
        [dummyGen, 'aurelia-ts:typescript']
      ])
      .withPrompts({
        appName: 'framework7-app',
        title: 'The Framework7 APP',
        githubAccount: 'kristianmandrup',
        authorName: 'me',
        authorEmail: 'me@me.es',
        style: 'Framework7'
      })
      .on('end', function() {
        done();
      });
  });

  it('creates files', function () {
    assert.file([
      'gulpfile.js',
      'package.json',
      'aureliafile.js',
      '.editorconfig', // review
      '.jshintrc'
    ]);
  });


  it('include just ES6', function() {
    assert.noFile(['tsconfig.json', 'typings']);
    assert.noFileContent([
      ['package.json', /typescript/],
      ['build/tasks/build.js', /typescript/]
    ]);

  });
});
