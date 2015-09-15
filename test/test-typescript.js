'use strict';

var path = require('path');
var generator = require('yeoman-generator');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');
var sinon = require('sinon');

var app;
var testHelpers = require('./lib/helper');

describe('aurelia-ts:typescript', function () {
  this.spy = sinon.spy();
  var dummyGen = generator.Base.extend({
    exec: this.spy
  });

  let oldOpts = {
    cssFramework: 'Bootstrap',
    githubAccount: 'telekosmos',
    authorName: 'me',
    authorEmail: 'telekosmos@ymail.com',
    appDesc: 'The App description',
    appName: 'The App name'
  };
  let mockOptions = {};
  let mockPrompts = {
    editor: 'Atom',
    amd: true
    // installDeps: false
  }
  before(function(done) {
    app = testHelpers.runGenerator('typescript', mockOptions, mockPrompts)
      .on('ready', testHelpers.onready.bind(this))
      .on('end', function() {
        done();
      });
  }.bind(this));

  it('generator can be run', function() {
    assert(app !== undefined);
  });

  it('creates files', function () {
    assert.file([
      'tsconfig.json', 'typings/tsd.d.ts',
      'src/app.ts', 'src/welcome.ts', 'src/nav-bar.ts'
    ]);
  });

  it('writes the content to files', function() {
    assert.fileContent([
      ['build/tasks/build.js', /require\s*\(["']gulp\-typescript["']\);/],
      ['build/tasks/build.js', /module:\s+"amd"/],
      ['build/tasks/build.js', /target:\s+"es5"/],
      ['tsconfig.json', /"module":\s+"amd"/]
    ]);
    assert.fileContent([
      ['src/app.ts', /\/\/\/\s+<reference path="\.\.\/typings\/tsd\.d\.ts"\s*\/>/],
      ['src/nav-bar.ts', /\/\/\/\s+<reference path="\.\.\/typings\/tsd\.d\.ts"\s*\/>/],
      ['src/welcome.ts', /\/\/\/\s+<reference path="\.\.\/typings\/tsd\.d\.ts"\s*\/>/]
    ]);
  });

  it('makes test tasks depending on build', function() {
    assert.fileContent([
      ['build/tasks/test.js', /\[['"]build\-system['"]\]/]
    ]);
  });

  it('makes karma configuration', function() {
    assert.noFileContent([
      ['karma.conf.js', /src/]
    ]);
    // load the right files and babel preprocessor
    assert.fileContent([
      ['karma.conf.js', /loadFiles:\s*\[.*dist\/.*\]/],
      ['karma.conf.js', /preprocessors:\s*\{\s*.+\s*.+\s*'dist\/.*\.js':\s*\['babel'\]/]
    ]);
  });

  it('install npm dependencies', function() {
    assert(this.npmInstallCalls.length > 0);
    assert(this.npmInstallCalls.length == 1);
    assert(this.npmInstallCalls[0][0].indexOf('gulp') != -1);
  }.bind(this));

  it('install jspm dependencies', function() {
    assert(this.spawnCommandCalls.length == 1);
    assert(this.spawnCommandCalls[0][0] == 'jspm');
    assert(this.spawnCommandCalls[0][1].indexOf('typescript') != -1);
  }.bind(this))
});

describe('aurelia-ts:typescript no amd', function() {
  let mockOptions = {};
  let mockPrompts = {
    amd: false,
    editor: 'Atom'
  };

  before(function(done) {
    app = testHelpers.runGenerator('typescript', mockOptions, mockPrompts)
      .on('ready', testHelpers.onready.bind(this))
      .on('end', function() {
        done();
      })
  }.bind(this));

  it('can be run', function() {
    assert(app !== undefined);
  });

  it('supports commonjs module system', function() {
    assert.fileContent([
      ['build/tasks/build.js', /require\s*\(["']gulp\-typescript["']\);/],
      ['build/tasks/build.js', /module:\s+"commonjs"/],
      ['build/tasks/build.js', /target:\s+"es5"/],
      ['tsconfig.json', /"module":\s+"commonjs"/]
    ]);
  });
});

describe('aurelia-ts:typescript editors', function() {
  let mockOptions = {};
  let mockPrompts = {
    editor: ['WebStorm'],
    amd: true
  };

  before(function(done) {
    app = testHelpers.runGenerator('typescript', mockOptions, mockPrompts)
      .on('ready', testHelpers.onready.bind(this))
      .on('end', function() {
        done();
      })
  }.bind(this));

  it('can be run', function() {
    assert(app !== undefined);
  });

  it('install docs for WebStorm', function() {
    assert.file(['docs/typescript/editors/Aurelia-TypeScript-IDE-WebStorm.md'])
  });
});

describe('aurelia-ts:typescript default editor', function() {
  let mockOptions = {};
  let mockPrompts = {
    editor: 'Atom',
    amd: true
  };

  before(function(done) {
    app = testHelpers.runGenerator('typescript', mockOptions, mockPrompts)
      .on('ready', testHelpers.onready.bind(this))
      .on('end', function() {
        done();
      })
  }.bind(this));

  it('can be run', function() {
    assert(app !== undefined);
  });

  it('install docs for Atom by default', function() {
    assert.file(['docs/typescript/editors/Aurelia-TypeScript-IDE-Atom.md'])
  });
});



/*
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
    *
    assert.noFile([
      'tsconfig.json', 'typings/tsd.d.ts',
      'src/app.ts', 'src/welcome.ts', 'src/nav-bar.ts'
    ]);
  });
});
*/
