'use strict';

var path = require('path');
var generator = require('yeoman-generator');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');
var sinon = require('sinon');
var app;


describe('aurelia-ts:typescript', function () {
  this.spy = sinon.spy();
  var dummyGen = generator.Base.extend({
    exec: this.spy
  });

  before(function(done) {
    app = helpers.run(path.join(__dirname, '../generators/typescript'))
      .withOptions({
        cssFramework: 'Bootstrap',
        githubAccount: 'telekosmos',
        authorName: 'me',
        authorEmail: 'telekosmos@ymail.com',
        appDesc: 'The App description',
        appName: 'The App name'
      })
      .withPrompts({
        typescript: true,
        amd: true,
        installDeps: false
      })
      .on('end', function() {
        done();
      });
  });

  it('creates files', function () {
    assert.file([
      'tsconfig.json', 'typings/tsd.d.ts',
      'src/app.ts', 'src/welcome.ts', 'src/nav-bar.ts'
    ]);
  });

  /*
  it('adds typescript jspm dependencies', function() {
    assert.fileContent([
      ['package.json', /"gulp\-typescript":/],
      ['package.json', /"typescript":/]
    ]);
  });
  */

  it('writes the content to files', function() {
    assert.fileContent([
      ['build/tasks/build.js', /require\s*\(["']gulp\-typescript["']\);/],
      ['build/tasks/build.js', /module:\s+"amd"/],
      ['build/tasks/build.js', /target:\s+"es5"/],
    ]);
    assert.fileContent([
      ['src/app.ts', /\/\/\/\s+<reference path="\.\.\/typings\/tsd\.d\.ts"\s*\/>/],
      ['src/nav-bar.ts', /\/\/\/\s+<reference path="\.\.\/typings\/tsd\.d\.ts"\s*\/>/],
      ['src/welcome.ts', /\/\/\/\s+<reference path="\.\.\/typings\/tsd\.d\.ts"\s*\/>/]
    ]);
  });

  /*
  it('makes test tasks depending on build', function() {
    assert.fileContent([
      ['build/tasks/test.js', /\[['"]build\-system['"]\]/]
    ]);
  });
  */

  it('makes karma configuration', function() {
    /*
    assert.noFileContent([
      ['karma.conf.js', /src/]
    ]);
    */
    /*
    // load the right files and babel preprocessor
    assert.fileContent([
      ['karma.conf.js', /loadFiles:\s*\[.*dist\/.*\]/],
      ['karma.conf.js', /preprocessors:\s*\{\s*.+\s*.+\s*'dist\/.*\.js':\s*\['babel'\]/]
    ]);
    */
  })
});


describe('aurelia-ts:typescript -no TS support-', function () {
  this.spy = sinon.spy();
  var dummyGen = generator.Base.extend({
    exec: this.spy
  });

  before(function(done) {
    app = helpers.run(path.join(__dirname, '../generators/typescript'))
      .withOptions({
        cssFramework: 'Bootstrap',
        githubAccount: 'telekosmos',
        authorName: 'me',
        authorEmail: 'telekosmos@ymail.com',
        appDesc: 'The App description',
        appName: 'The App name'
      })
      .withPrompts({
        typescript: false,
        amd: true,
        installDeps: false
      })
      .on('end', function() {
        done();
      });
  });

  it('creates no files', function () {
    /*
    assert.noFile([
      'package.json', 'src/app.js', 'src/welcome.js', 'src/nav-bar.js'
    ]);
    */
    assert.noFile([
      'tsconfig.json', 'typings/tsd.d.ts',
      'src/app.ts', 'src/welcome.ts', 'src/nav-bar.ts'
    ]);
  });
});
