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
describe('aurelia-ts:amd for Ampersand modules', function () {
  this.spy = sinon.spy();
  var dummyGen = generator.Base.extend({
    exec: this.spy
  });

  this.npmInstallCalls = [];
  this.spawnCommandCalls = [];
  let ampModules = ['app', 'registry', 'state', 'collection', 'rest-collection', 'model'];
  let jspmArgs;
  before(function(done) {
    app = helpers.run(path.join(__dirname, '../generators/amp'))
      .withOptions({
        // ui: 'Bootstrap',
      })
      .withPrompts({
        modules: ampModules,
        humanModel: true
      })
      .on('ready', function(generator) {
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


  it('jspm is called just once', function() {
    assert(this.spawnCommandCalls.length == 1);
    assert(this.spawnCommandCalls[0][0] == 'jspm');
  }.bind(this));

  it('installs the right ampersand packages', function() {
    jspmArgs = this.spawnCommandCalls[0][1];
    for(let mod=0; mod<ampModules.length; mod++) {
      // console.log('module: '+mod+'->'+ampModules[mod]);
      let aux = jspmArgs.filter(function(elem) {
        return elem.indexOf('ampersand-'+ampModules[mod]) != -1;
      })
      assert(aux.length == 1);
    }
  }.bind(this));

  it('installs the human model', function() {
    let aux = jspmArgs.filter(function(elem) {
      return elem.match(/human/);
    });

    assert(aux.length == 1);
  });
});
