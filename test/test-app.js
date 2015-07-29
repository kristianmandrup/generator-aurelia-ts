'use strict';

var path = require('path');
var generator = require('yeoman-generator');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');
var sinon = require('sinon');
var app;

describe('aurelia-ts generator', function() {
  it('can be imported', function() {
    app = require('../generators/app');
    assert(app !== undefined);
  });
});

describe('aurelia-ts:app', function () {
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
        appName: 'my-app',
        title: 'The APP',
        githubAccount: 'telek',
        authorName: 'me',
        authorEmail: 'me@me.es'
      })
      .on('end', function() {
        // console.log('it finishes!!');
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
    assert.noFileContent([
      ['package.json', /typescript/],
      ['build/tasks/build.js', /typescript/]
    ]);
    assert.fileContent([
      ['build/tasks/build.js', /gulp\-babel/],
      ['package.json', /gulp\-babel/]
    ]);
    assert.noFile(['src/app.ts', 'src/welcome.ts', 'src/nav-bar.ts']);
  });
});