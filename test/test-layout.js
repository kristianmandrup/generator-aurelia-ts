'use strict';

var path = require('path');
var generator = require('yeoman-generator');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');
var sinon = require('sinon');
var fs = require('fs');

var testHelpers = require('./lib/helper');
var app;

describe('aurelia-ts:layout for Bootstrap/Semantic-UI', function () {
  var pkgFile = 'package.json';
  function pkgKeyExpr(name) {
    var key = name + ":";
    return new RegExp(key, 'g');
  }
  function entry(name) {
    return [pkgFile, pkgKeyExpr(name)];
  }

  // this.bowerInstallCalls = [];
  // this.npmInstallCalls = [];
  // this.spawnCommandCalls = [];
  let mockPrompts = {
    cssFrameworks: ['Bootstrap', 'Semantic-UI'],
    primary: 'Bootstrap',
    fontAwesome: true
  };
  let mockOptions = {};
  before(function(done) {
    app = testHelpers.runGenerator('layout', mockOptions, mockPrompts)
      .on('ready', testHelpers.onready.bind(this))
      .on('end', function() {
        done();
      });
  }.bind(this));

  it('generator can be run', function() {
    assert(app !== undefined);
  });

  it('includes bootstrap', function() {
    assert(this.npmInstallCalls.length == 0);
    // assert(this.bowerInstallCalls.length == 0);
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
  // this.npmInstallCalls = [];
  // this.spawnCommandCalls = [];
  // this.bowerInstallCalls = [];
  let jspmParams;
  let mockPrompts = {
    cssFrameworks: ['Foundation', 'Semantic-UI'],
    primary: 'Semantic-UI',
    fontAwesome: true
  };
  let mockOptions = {};
  before(function(done) {
    app = testHelpers.runGenerator('layout', mockOptions, mockPrompts)
      .on('ready', testHelpers.onready.bind(this))
      .on('end', function() {
        jspmParams = this.spawnCommandCalls[0][1];
        done();
      }.bind(this));
  }.bind(this));

  it('generator can be run', function() {
    assert(app !== undefined);
  });

  it('includes semantic-ui', function() {
    assert(this.spawnCommandCalls.length == 1);

    // jspmParams = this.spawnCommandCalls[0][1];
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


describe('aurelia-ts:layout no framework', function() {
  let mockOptions = {ui: 'bs', fa: false};
  let mockPrompts = {primary: 'Bootstrap'};
  let jspmParams;
  before(function(done) {
    app = testHelpers.runGenerator('layout', mockOptions, mockPrompts)
      .on('ready', testHelpers.onready.bind(this))
      .on('end', function() {
        jspmParams = this.spawnCommandCalls[0][1];
        done();
      }.bind(this))
  }.bind(this));

  it('generator can be run', function() {
    assert(app !== undefined);
    assert(this.spawnCommandCalls.length == 1);
  }.bind(this));

  it('includes font-awesome (despite the option)', function() {
    assert(jspmParams.indexOf('font-awesome') != -1);
  });

  it('includes bootstrap', function() {
    assert(jspmParams.indexOf('bootstrap') != -1);
  });

  it('includes bootstrap as primary', function() {
    assert.fileContent([
      ['src/nav-bar.html', /<nav class="navbar navbar\-default.*"/],
      ['src/welcome.html', /<div class="form\-group">/]
    ]);
  });
});


describe('aurelia-ts:layout subgenerator with options', function() {
  let mockOptions = {
    ui: 'bs', fa: false
  };
  let mockPrompts = {
    primary: 'None',
    fontAwesome: true,
    cssFrameworks: []
  };
  let jspmParams;
  before(function(done) {
    app = testHelpers.runGenerator('layout', mockOptions, mockPrompts)
      .on('ready', testHelpers.onready.bind(this))
      .on('end', function() {
        // jspmParams = this.spawnCommandCalls[0][1];
        done();
      }.bind(this));
  }.bind(this));

  it('generator can be run', function() {
    assert(app !== undefined);
  }.bind(this));

  it('does not install any framework', function() {
    assert(this.spawnCommandCalls.length == 0); // BAD!!!
  }.bind(this));

});
