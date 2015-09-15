'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
require('sugar');
var fs = require('node-fs-extra');
var generator;
var lib = require('../../lib');
var prompts = require('./prompts');
// var util = require('./util');
// var write = require('./write');

module.exports = yeoman.generators.Base.extend({

  // note: arguments and options should be defined in the constructor.
  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);
    this.option('ts'); // typescript
    this.option('vs'); // visual studio
    this.option('fa'); // font awesome
    this.option('cli'); // aurelia CLI
    this.option('plugins');

    this.option('sass');
    this.option('stylus');
    this.option('fa');
  },

  initializing: function() {
    generator = this;
    this.props = {};
    this.props.vs = this.options.vs;
    this.props.ts = this.options.ts;
    this.props.fa = this.options.fa;
    this.props.plugins = this.options.plugins;
    this.prompts = prompts;
  },

  prompting: function() {
    var done = this.async();

    // info('Install Aurelia CLI:');

    this.prompt(this.prompts.create(), function(answers) {

      this.installStyles = answers.installStyles;
      this.installLayout = answers.installLayout || this.props.uiFramework;
      this.installCLI = answers.installCLI || this.props.cli;
      this.installPlugins = answers.installPlugins || this.props.plugins;
      this.installTypeScript = answers.installTypeScript || this.props.ts;
      // this.config.save();

      done();
    }.bind(this));
  },

  end: function() {
    // src files
    var lang = this.installTypeScript ? 'typescript' : 'javascript';
    var appGenerator = ['aurelia-ts', lang].join(':');
    this.composeWith(appGenerator, {});

    if (this.installStyles) {
      this.composeWith('aurelia-ts:styles', {
        options: {
          styleLang: this.props.styleLang,
          sass: this.options.sass,
          stylus: this.options.stylus
        }
      });
    }

    if (this.installLayout) {
      this.composeWith('aurelia-ts:layout', {
        options: {
          appTitle: this.appTitle,
          appDesc: this.appDesc,
          ui: this.options.ui,
          fa: this.options.fa
        }
      });
    }

    if (this.installPlugins) {
      this.composeWith('aurelia-ts:plugins', {
        options: {
          bootstrap: this.bootstrap
        }
      });
    }

    if (this.installCLI) {
      this.composeWith('aurelia-ts:cli', {
        options: {}
      });
    }

    this.composeWith('aurelia-ts:state', {
      options: {}
    });
  }
});
