'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
require('sugar');
var fs = require('fs');
var generator;
var lib = require('../../lib');
var write = require('./write');
var prompts = require('./prompts');
var util = require('./util');
var install = require('./install');
var info = lib.log.info;

function frameworks(gen, answers) {
  return gen.util.isEmpty(answers.cssFrameworks) ? ['None'] : answers.cssFrameworks;
}

module.exports = yeoman.generators.Base.extend({
  // note: arguments and options should be defined in the constructor.
  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);
    generator = this;
    this.props = {ui: {}};
    this.option('fa'); // font awesome
    // ui framework options
    this.option('ui', {type: 'string'});
  },

  initializing: function() {
    this.props.ui.use = lib.options.mapUi(this.options.ui);

    this.myPrompts = prompts.createFor(this.props);
    this.myUtil = require('./util')(this);
    this.writer = lib.writer(write(this));
    this.copy = lib.copy(this);
    this.install = lib.install(this);
    this.util = lib.util;
  },

  prompting: {
    phase1: function() {
      var done = this.async();
      this.prompt(this.myPrompts.phase1(), function(answers) {
        // TODO: extract util
        this.props.cssFrameworks = frameworks(this, answers);
        this.props.fontAwesome = answers.fontAwesome || this.options.fa;
        this.props.ui.obj = lib.options.uiFrameworks(this.cssFrameworks);
        // this.config.save();
        done();
      }.bind(this));
    },

    phase2: function() {
      var done = this.async();
      this.prompt(this.myPrompts.phase2(this.props), function(answers) {
        this.props.ui.primary = answers.primary;
        var ui = this.props.ui;
        if (ui.primary == 'None') this.props.cssFrameworks = [];

        this.props.ui.selected = this.myUtil.selectedFramework(ui.primary);
        // this.config.save();
        done();
      }.bind(this));
    }
  },

  // set props!
  configuring: function() {
  },

  writing: function() {
    this.writer.writeAll();
  },

  install: function() {
    install(this).all(this.props);
  },

  end: function() {
    info("Installed:" + this.props.cssFrameworks.join(', '));
  }
});
