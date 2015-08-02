'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
require('sugar');
var fs = require('node-fs-extra');
var generator;
let lib = require('../../lib');
let log = lib.log;
let info = log.info;
let command = log.command;
let install = lib.install;

module.exports = yeoman.generators.Base.extend({
  // note: arguments and options should be defined in the constructor.
  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);
  },
  initializing: function() {
    generator = this;
    this.props = {};
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
  install: function() {
    if (this.installGlobal) {
      info('Installing aurelia-cli in global registry...');
      info('This is useful for CLI commands such as:');
      command('aurelia new APPNAME');
      install.npmGlobal(['aurelia-cli']);
    }
    info('Installing aurelia-cli locally for dev mode');
    install.npmDev(['aurelia-cli']);
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
