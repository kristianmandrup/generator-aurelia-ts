'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
require('sugar');
var fs = require('node-fs-extra');
var generator;
var lib = require('../../lib');
var log = lib.log;
var info = log.info;
var command = log.command;

module.exports = yeoman.generators.Base.extend({
  // note: arguments and options should be defined in the constructor.
  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);
  },
  initializing: function() {
    generator = this;
    this.props = {};
    this.install = lib.install(this);
  },
  prompting: function() {
    var done = this.async();
    var prompts = [{
      type: 'confirm',
      name: 'installGlobal',
      message: 'Install CLI in global registry',
      default: false,
    }];

    this.prompt(prompts, function(answers) {
      this.installGlobal = answers.installGlobal;
      // this.config.save();
      done();
    }.bind(this));
  },
  install: {
    global: function() {
      if (this.installGlobal) {
        info('Installing aurelia-cli in global registry...');
        info('This is useful for CLI commands such as:');
        command('aurelia new APPNAME');
        this.install.npmGlobal(['aurelia-cli']);
      }
    },
    local: function() {
      info('Installing aurelia-cli locally for dev mode');
      this.install.npmDev(['aurelia-cli']);
    }
  },
  end: function() {
    info('====================================================================');
    info('aurelia CLI dev mode commands:');
    command('aurelia -h');
    info('Create a ViewModel');
    command('aurelia generate viewmodel -n NAME');
    info('with a View (Template)');
    command('aurelia generate viewmodel -n NAME -v');
    info('with injections');
    command('aurelia generate viewmodel -n NAME -v --inject Element,HttpClient');
    info('---------------------------------------------------------------------')
    info('Bundling:');
    info("Configure bundle settings in: config.js");
    command("aurelia bundle --force");
  }
});
