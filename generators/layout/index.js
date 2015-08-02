'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
require('sugar');
var fs = require('fs');
var generator;

let lib = require('../../lib');
let write = require('./write');
let prompts = require('./prompts');

let util = lib.util;
let writer = lib.writer;
let copy = lib.copy;

module.exports = yeoman.generators.Base.extend({

  // note: arguments and options should be defined in the constructor.
  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);

    generator = this;
    this.props = {};

    this.option('fa'); // font awesome
    // ui framework options
    this.option('ui', {type: 'string'});
  },

  initializing: function() {
    this.appTitle = this.options.appTitle || 'My App';
    this.appDesc = this.options.appDesc || 'No description...';
    this.props.uiFramework = uiFrameworkMap[this.options.ui];
    this.props.fa = this.options.fa;

    this.myPrompts = this.prompts.createFor(this.props);
    this.myUtil = require('./util')(this);
  },

  prompting: {
    phase1: function() {
      var done = this.async();

      this.prompt(this.myPrompts.phase1(), function(answers) {
        // TODO: extract util
        this.cssFrameworks = util.isEmpty(answers.cssFrameworks) ? ['None'] : answers.cssFrameworks;

        this.fontAwesome = answers.fontAwesome || this.props.fa;
        this.ui = this.options.ui(this.cssFrameworks);

        // this.config.save();
        done();
      }.bind(this));
    },

    phase2: function() {
      var done = this.async();

      this.prompt(this.myPrompts.phase2(this), function(answers) {
        this.primary = answers.primary;
        if (this.primary == 'None') this.cssFrameworks = [];
        // this.config.save();
        done();
      }.bind(this));
    }
  },

  writing: {
    writer.writeAll();
  },

  install: function() {
  },

  end: function() {
    if (!this.selFramework) return;
    info("Installed:" + this.cssFrameworks.join(' '));
  }
});
