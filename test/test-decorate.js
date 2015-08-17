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
describe('aurelia-ts:decorate', function () {
  this.spy = sinon.spy();
  this.jsSpy = sinon.spy();
  this.stateSpy = sinon.spy();
  var dummyGen = generator.Base.extend({
    exec: this.spy
  });
  var jsDummyGen = generator.Base.extend({
    exec: this.jsSpy
  });
  var stateDummyGen = generator.Base.extend({
    exec: this.stateSpy
  });

  this.runGenerator = function(generators, options, prompts) {
    return helpers.run(path.join(__dirname, '../generators/decorate'))
      .withOptions(options)
      .withGenerators(generators)
      .withPrompts(prompts);
  }


  describe('styles', function() {
    before(function(done) {
      let dummyGens = [
        [dummyGen, 'aurelia-ts:styles'],
        [jsDummyGen, 'aurelia-ts:javascript'],
        [stateDummyGen, 'aurelia-ts:state']
      ];

      let mockOptions = {};
      let mockPrompt = {
        installStyles: true,
        installCLI: false,
        installTypeScript: false,
        installPlugins: false,
        installLayout: false,
        visualStudio: false
      };
      // console.log(this);

      let jspmArgs;
      app = this.runGenerator(dummyGens, mockOptions, mockPrompt);
      app.on('ready', testHelpers.onready.bind(this))
        .on('end', function() {
          // jspmArgs = this.spawnCommandCalls[0][1];
          done();
        }.bind(this));
    }.bind(this));

    after(function() {
      this.jsSpy.reset();
      this.stateSpy.reset();
      this.spy.reset();
    }.bind(this));

    it('generator can be run', function() {
      assert(app !== undefined);
    });

    it('just call the subgenerators', function() {
      assert(this.jsSpy.calledOnce);
      assert(this.stateSpy.calledOnce);
      assert(this.spy.calledOnce);
    }.bind(this));

  }.bind(this));


  describe('typescript', function() {
    let tsSpy = sinon.spy();
    before(function(done) {
      let tsDummyGen = generator.Base.extend({
        exec: tsSpy
      });
      let dummyGens = [
        [dummyGen, 'aurelia-ts:styles'],
        [jsDummyGen, 'aurelia-ts:javascript'],
        [stateDummyGen, 'aurelia-ts:state'],
        [tsDummyGen, 'aurelia-ts:typescript']
      ];
      let mockPrompt = {
        installStyles: true,
        installCLI: false,
        installTypeScript: true,
        installPlugins: false,
        installLayout: false,
        visualStudio: false
      };
      let mockOptions = {};
      // console.log(this);
      app = this.runGenerator(dummyGens, mockOptions, mockPrompt);
      app.on('ready', testHelpers.onready.bind(this))
        .on('end', function() {
          done();
        });
    }.bind(this));

    after(function() {
      this.jsSpy.reset();
      this.spy.reset();
      this.stateSpy.reset();
    }.bind(this));

    it('ts subgenerator can be run', function() {
      assert(app !== undefined);
    });

    it('just call the typescript sub-generator', function() {
      assert(this.jsSpy.calledOnce == false);
      assert(tsSpy.calledOnce == true);
      assert(this.stateSpy.calledOnce);
      assert(this.spy.calledOnce == true);
    }.bind(this));

  }.bind(this)); // EO typescript


  describe('layout', function() {
    let layoutSpy = sinon.spy();
    before(function(done) {
      let layoutDummyGen = generator.Base.extend({
        exec: layoutSpy
      });
      let dummyGens = [
        [dummyGen, 'aurelia-ts:styles'],
        [jsDummyGen, 'aurelia-ts:javascript'],
        [stateDummyGen, 'aurelia-ts:state'],
        [layoutDummyGen, 'aurelia-ts:layout']
      ];
      let mockPrompt = {
        installStyles: true,
        installCLI: false,
        installTypeScript: false,
        installPlugins: false,
        installLayout: true,
        visualStudio: false
      };

      let mockOptions = {};
      // console.log(this);
      app = this.runGenerator(dummyGens, mockOptions, mockPrompt);
      app.on('ready', testHelpers.onready.bind(this))
        .on('end', function() {
          done();
        });
    }.bind(this));

    after(function() {
      this.jsSpy.reset();
      this.spy.reset();
      this.stateSpy.reset();
    }.bind(this));

    it('layout subgenerator can be run', function() {
      assert(app !== undefined);
    });

    it('just call the layout sub-generator', function() {
      assert(this.jsSpy.calledOnce);
      assert(this.stateSpy.calledOnce);
      assert(this.spy.calledOnce == true);
      assert(layoutSpy.calledOnce == true);
    }.bind(this));

  }.bind(this));


  describe('typescript & plugins', function() {
    let tsSpy = sinon.spy();
    let pluginSpy = sinon.spy();
    before(function(done) {
      let tsDummyGen = generator.Base.extend({
        exec: tsSpy
      });
      let pluginsDummyGen = generator.Base.extend({
        exec: pluginSpy
      });
      let dummyGens = [
        [dummyGen, 'aurelia-ts:styles'],
        [jsDummyGen, 'aurelia-ts:javascript'],
        [stateDummyGen, 'aurelia-ts:state'],
        [tsDummyGen, 'aurelia-ts:typescript'],
        [pluginsDummyGen, 'aurelia-ts:plugins']
      ];
      let mockPrompt = {
        installStyles: true,
        installCLI: false,
        installTypeScript: true,
        installPlugins: true,
        installLayout: false,
        visualStudio: false
      };

      let mockOptions = {};
      // console.log(this);
      app = this.runGenerator(dummyGens, mockOptions, mockPrompt);
      app.on('ready', testHelpers.onready.bind(this))
        .on('end', function() {
          done();
        });
    }.bind(this));

    after(function() {
      this.jsSpy.reset();
      this.spy.reset();
      this.stateSpy.reset();
    }.bind(this));

    it('subgenerators can be run', function() {
      assert(app !== undefined);
    });

    it('just call the ts & plugins sub-generators', function() {
      assert(this.jsSpy.calledOnce == false);
      assert(this.stateSpy.calledOnce);
      assert(this.spy.calledOnce == true);
      assert(tsSpy.calledOnce == true);
      assert(pluginSpy.calledOnce);
    }.bind(this));

  }.bind(this));

});
