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

  this.spawnCommandCalls = [];
  this.npmInstallCalls = [];
  this.runGenerator = function(prompts) {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withGenerators([
        [dummyGen, 'aurelia-ts:decorate']
      ])
      .withPrompts(prompts)
      .on('ready', function(generator) {
        generator.npmInstall = function() {
          this.npmInstallCalls.push(arguments);
        }.bind(this);

        generator.spawnCommand = function() {
          this.spawnCommandCalls.push(arguments);
        }.bind(this);
      }.bind(this))
  }

  describe('ie9 & decorate', function() {
    before(function(done) {
      let mockPrompt = {
        appName: 'my-app',
        title: 'App title',
        desc: 'App description',
        githubAccount: 'githubUser',
        authorName: 'me',
        authorEmail: '',
        ie9: true,
        decorate: true
      };

      app = this.runGenerator(mockPrompt);
      app.on('end', function() {
        // console.log('it finishes!!');
        done();
      });
    }.bind(this));

    after(function() {
      this.spy.reset();
      this.npmInstallCalls.length = 0;
      this.spawnCommandCalls.length = 0;
    }.bind(this));

    it('generator can be run', function() {
      assert(app !== undefined);
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
        // ['package.json', /typescript/], gulp-typescript is included by default
        ['build/tasks/build.js', /typescript/]
      ]);
      assert.fileContent([
        ['build/tasks/build.js', /gulp\-babel/],
        ['package.json', /gulp\-babel/]
      ]);
      assert.noFile(['src/app.ts', 'src/welcome.ts', 'src/nav-bar.ts']);
    });

    it('subgenerator decorate is called', function() {
      assert(this.spawnCommandCalls.length == 1);
      assert(this.npmInstallCalls.length == 0);
      assert(this.spy.calledOnce);
    }.bind(this));
  }.bind(this));


  describe('with no ie9 & decorate', function() {
    before(function(done) {
      let mockPrompt = {
        appName: 'my-app',
        title: 'App title',
        desc: 'App description',
        githubAccount: 'githubUser',
        authorName: 'me',
        authorEmail: '',
        ie9: false,
        decorate: false
      };

      app = this.runGenerator(mockPrompt);
      app.on('end', function() {
        // console.log('it finishes!!');
        done();
      });
    }.bind(this));

    after(function() {
      this.spy.reset();
      this.npmInstallCalls.length = 0;
      this.spawnCommandCalls.length = 0;
    }.bind(this));

    it('generator can be run', function() {
      assert(app !== undefined);
    });

    it('no called subgenerator', function() {
      assert(this.spy.called == false);
    }.bind(this));

    it('no installed ie9 polyfill', function() {
      assert(this.spawnCommandCalls.length == 0);
      assert(this.npmInstallCalls.length == 0);
    }.bind(this));
  }.bind(this));

});
