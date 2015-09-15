'use strict';

var path = require('path');
var generator = require('yeoman-generator');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');
var sinon = require('sinon');
var fs = require('fs');
var app;


describe('aurelia-ts:javascript', function () {
  this.spy = sinon.spy();
  var dummyGen = generator.Base.extend({
    exec: this.spy
  });

  this.npmInstallCalls = [];
  this.spawnCommandCalls = [];
  let npmCallsArgs = [] ;
  before(function(done) {
    app = helpers.run(path.join(__dirname, '../generators/javascript'))
      .withOptions({
        // ui: 'Bootstrap',
      })
      .withPrompts({
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
        for (let mods of this.npmInstallCalls) {
          // console.log(mods[0]);
          npmCallsArgs.push(mods[0]);
        }
        done();
      }.bind(this));
  }.bind(this));

  it('generator can be run', function() {
    assert(app !== undefined);
  });

  it('copy all js files', function() {
    assert.file([
      'src/app.js', 'src/nav-bar.js', 'src/main.js', 'src/welcome.js',
      'src/plugin-config.js', 'src/animation-main.js'
    ]);
  });

  it('doesnt install anything', function() {
    assert(this.spawnCommandCalls.length == 0);
    assert(this.npmInstallCalls.length == 0);
  }.bind(this));

});
