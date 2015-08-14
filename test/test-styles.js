'use strict';

var path = require('path');
var generator = require('yeoman-generator');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');
var sinon = require('sinon');
var fs = require('fs');
var app;

var mockPrompts = require('prompts').styles;
var mockOptions = require('options').styles;

// Need test for no styles => just raw CSS
var styles = ['SASS', 'Stylus'];
var useJade = true;
var stylusPlugins = ['Autoprefixer', 'Nib', 'Axis', // extends nib
  'Rupture', 'Fluidity', 'Jeet' // extends nib
];

describe('aurelia-ts:styles', function () {
  this.spy = sinon.spy();
  var dummyGen = generator.Base.extend({
    exec: this.spy
  });

  this.npmInstallCalls = [];
  this.spawnCommandCalls = [];
  let npmCallsArgs = [] ;
  before(function(done) {
    app = helpers.run(path.join(__dirname, '../generators/styles'))
      .withOptions({
        // ui: 'Bootstrap',
      })
      .withPrompts({
        styles: styles,
        useJade: useJade,
        removeOld: false,
        stylusPlugins: stylusPlugins
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

  it('npm is run more than once', function() {
    assert(this.spawnCommandCalls.length == 0);
    assert(this.npmInstallCalls.length > 1);
  }.bind(this));

  it('install SASS support', function() {
    let aux = npmCallsArgs.filter(function(elem) {
      return elem.match(/gulp-sass/);
    });
    assert(aux.length == 1);
    assert.file(['build/tasks/sass.js']);
  });

  it('copy SASS style files', function() {
    assert.file(['styles/sass/styles.scss']);
  });

  it('install stylus support', function() {
    let aux = npmCallsArgs.filter(function(elem) {
      return elem.match(/gulp-stylus/);
    });
    assert(aux.length == 1);
    assert.file(['build/tasks/stylus.js']);
  });

  it('copy stylus style files', function() {
    assert.file(['styles/stylus/styles.styl']);
  });

  it('install Jade templating', function() {
    let aux = npmCallsArgs.filter(function(elem) {
      return elem.match(/gulp-jade/);
    });
    assert(aux.length == 1);
    assert.file(['build/tasks/jade.js']);
  });

  // Check if every plugin has a related npm call for it
  // This could be unrolled in several tests one per plugin
  it('install stylus plugins', function() {
    let aux = true;
    stylusPlugins.forEach(function(plugin, index, plugins) {
      // npmCallsArgs.forEach(function(call, indexC, calls) {
      // check there is the plugin name(s) at least in one npm call
      let res = npmCallsArgs.some(function(call, indexC, calls){
        return call.toLowerCase().indexOf(plugin.toLowerCase()) > -1;
      });
      assert(res == true);
    });

  });

});
