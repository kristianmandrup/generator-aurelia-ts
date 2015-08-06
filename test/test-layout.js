'use strict';

var path = require('path');
var generator = require('yeoman-generator');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');
var sinon = require('sinon');
var fs = require('fs');
var app;

// Need tests for all combinations??
describe('aurelia-ts:layout for Bootstrap/Semantic-UI', function () {
  this.spy = sinon.spy();
  var dummyGen = generator.Base.extend({
    exec: this.spy
  });

  var pkgFile = 'package.json';

  function pkgKeyExpr(name) {
    var key = name + ":";
    return new RegExp(key, 'g');
  }
  function entry(name) {
    return [pkgFile, pkgKeyExpr(name)];
  }

  this.npmInstallCalls = [];
  this.spawnCommandCalls = [];
  this.bowerInstallCalls = [];
  before(function(done) {
    var fs = require('fs');
    fs.exists('./package.json', function (exists) {
      if (exists) {
        // var mockFs = require('mock-fs');
        console.log('writing fixture: package.json')
        var packageJson = "{\"name\": \"test-plugins\"}";
        fs.writeFileSync('package.json', packageJson);
      }
    });

    app = helpers.run(path.join(__dirname, '../generators/layout'))
      .withOptions({
        // ui: 'Bootstrap',
      })
      .withPrompts({
        cssFrameworks: ['Bootstrap', 'Semantic-UI'],
        primary: 'Bootstrap',
        fontAwesome: true
      })
      .on('ready', function(generator) {
        generator.bowerInstall = function() {
          this.bowerInstallCalls.push(arguments);
        }.bind(this);
        generator.npmInstall = function() {
          this.npmInstallCalls.push(arguments);
        }.bind(this);
        generator.spawnCommand = function() {
          this.spawnCommandCalls.push(arguments);
        }.bind(this);
      }.bind(this))
      .on('end', function() {
        done();
      });
  }.bind(this));

  it('generator can be run', function() {
    assert(app !== undefined);
  });

  it('includes bootstrap', function() {
    assert(this.npmInstallCalls.length == 0);
    assert(this.bowerInstallCalls.length == 0);
    assert(this.spawnCommandCalls.length == 1);

    let jspmParams = this.spawnCommandCalls[0][1];
    assert(this.spawnCommandCalls[0][0] == 'jspm');
    assert(jspmParams.indexOf('bootstrap') !== -1);
    assert(jspmParams.indexOf('semantic-ui') !== -1);
  }.bind(this));

  it('includes semantic-ui', function() {
    let jspmParams = this.spawnCommandCalls[0][1];
    assert(jspmParams.indexOf('semantic-ui') !== -1);
  }.bind(this));

  it('bootstrap as primary framework', function() {
    assert.fileContent([
      ['src/nav-bar.html', /<nav class="navbar navbar\-default.*"/],
      ['src/welcome.html', /<div class="form\-group">/]
    ]);
  });

});

describe('aurelia-ts:layout for Semantic-UI/Foundation', function () {
  this.spy = sinon.spy();
  var dummyGen = generator.Base.extend({
    exec: this.spy
  });

  this.npmInstallCalls = [];
  this.spawnCommandCalls = [];
  this.bowerInstallCalls = [];
  let jspmParams;
  before(function(done) {
    app = helpers.run(path.join(__dirname, '../generators/layout'))
      .withOptions({
        // ui: 'Bootstrap',
      })
      .withPrompts({
        cssFrameworks: ['Foundation', 'Semantic-UI'],
        primary: 'Semantic-UI',
        fontAwesome: true
      })
      .on('ready', function(generator) {
        generator.bowerInstall = function() {
          this.bowerInstallCalls.push(arguments);
        }.bind(this);
        generator.npmInstall = function() {
          this.npmInstallCalls.push(arguments);
        }.bind(this);
        generator.spawnCommand = function() {
          this.spawnCommandCalls.push(arguments);
        }.bind(this);
      }.bind(this))
      .on('end', function() {
        done();
      });
  }.bind(this));

  it('generator can be run', function() {
    assert(app !== undefined);
  });

  it('includes semantic-ui', function() {
    assert(this.spawnCommandCalls.length == 1);

    jspmParams = this.spawnCommandCalls[0][1];
    assert(this.spawnCommandCalls[0][0] == 'jspm');
    assert(jspmParams.indexOf('semantic-ui') != -1);
  }.bind(this));

  it('includes fondation', function() {
    assert(jspmParams.indexOf('foundation') != -1);
  });

  it('semantic-ui as primary framework', function() {
    assert.fileContent([
      ['src/nav-bar.html', /<div class="ui fixed inverted main menu">/],
      ['src/welcome.html', /<form class="ui form"/]
    ]);
  });
});
