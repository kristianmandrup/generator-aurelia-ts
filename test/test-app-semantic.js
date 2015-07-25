
'use strict';

var path = require('path');
var generator = require('yeoman-generator');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');
var sinon = require('sinon');
var app;

describe('aurelia-ts:app with Semantic-UI', function () {
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
        appName: 'semantic-ui-app',
        title: 'The Semantic-UI App',
        githubAccount: 'kristianmandrup',
        authorName: 'me',
        authorEmail: 'me@me.es',
        style: 'Semantic-UI'
      })
      .on('end', function() {
        done();
      });
  });

  it('creates files', function () {
    assert.file([
      'gulpfile.js',
      'package.json',
      'Aureliafile.js',
      '.editorconfig', // review
      '.jshintrc'
    ]);
  });

  it('include Semantic-UI', function() {
    assert.fileContent([
      ['package.json', /"semantic-ui": ".*semantic.+"/]
    ]);
    assert.noFileContent([
      ['package.json', /"bootstrap":/]
    ]);
    assert.fileContent([
      ['src/nav-bar.html', /ui item/],
      ['src/welcome.html', /ui form/]
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
