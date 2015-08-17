'use strict';

var path = require('path');
var generator = require('yeoman-generator');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');
var sinon = require('sinon');
var fs = require('fs');

var app;
var testHelpers = require('./lib/helper');

// Need tests for all combinations??
describe('aurelia-ts:state', function () {
  this.spy = sinon.spy();
  var dummyGen = generator.Base.extend({
    exec: this.spy
  });

  describe('install ampersand', function() {
    let jspmArgs;
    let mockOptions = {};
    let mockPrompts = {
      ampersand: true
    };
    before(function(done) {
      app = testHelpers.runGenerator('state', mockOptions, mockPrompts)
        .withGenerators([
          [dummyGen, 'aurelia-ts:amp']
        ])
        .on('ready', testHelpers.onready.bind(this))
        .on('end', function() {
          done();
        });
    }.bind(this));

    after(function() {
      this.npmInstallCalls.length = 0;
      this.spawnCommandCalls.length = 0;
      this.spy.reset();
    }.bind(this));

    it('generator can be run', function() {
      assert(app !== undefined);
    });

    it('just call once amp subgenerator', function() {
      assert(this.spy.calledOnce);
    }.bind(this));
  }.bind(this));

  describe('does not install ampersand', function() {
    let mockOptions = {};
    let mockPrompts = {
      ampersand: false
    };
    before(function(done) {
      app = testHelpers.runGenerator('amp', mockOptions, mockPrompts)
        .withGenerators([
          [dummyGen, 'aurelia-ts:amp']
        ])
        .on('ready', testHelpers.onready.bind(this))
        .on('end', function() {
          done();
        });
    }.bind(this));

    it('generator can be run', function() {
      assert(app !== undefined);
    });

    it('does not call amp subgenerator', function() {
      assert(this.spy.called == false);
    }.bind(this));
  }.bind(this));


});
