'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
require('sugar');

var fs = require('fs');

var generator;

function info(msg) {
  console.log(msg);
}

function command(msg) {
  console.log('  $ ' + msg);
}

module.exports = yeoman.generators.Base.extend({

  // note: arguments and options should be defined in the constructor.
  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);

    generator = this;
    this.props = {};
  },

  initializing: function() {
    info('Install Aurelia CLI:')
  },

  // TODO: Add prompt for style lang unless passed as argument
  // TODO: Add editor selection prompt
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
      this.npmInstall(['aurelia-cli'], {global: true });
    }
    info('Installing aurelia-cli locally for dev mode');
    this.npmInstall(['aurelia-cli'], {saveDev: true });
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
