'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
require('sugar');
var extend = require('extend');
var fs = require('node-fs-extra');
let lib = require('../../lib');
let write = require('./write');
let prompts = require('./prompts');
let util = require('./util');
let stylesPath = util.stylesPath;

var generator, linux, macOSX;

module.exports = yeoman.generators.Base.extend({

  // note: arguments and options should be defined in the constructor.
  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);
    generator = this;
    // define options that the generator accepts
    this.option('sass');
    this.option('stylus');
  },

  initializing: function() {
    // set initial properties
    this.props = {};
    this.props.defaultStyles = util.defaultStyles(this.options);
    // choose preferred style (Stylus highest priority)
    this.props.styleLang = this.defaultStyles[0] || 'css';

    // init phase helpers
    this.prompts = lib.prompts(this);
    this.install = lib.install(this);
    this.writer = lib.writer(write(this));
  },

  prompting: {
    phase1: function() {
      var done = this.async();

      var prompts = this.prompts.phase1(this);

      this.prompt(prompts, function(answers) {
        this.chosenStyles = isEmpty(answers.styles) ? ['None'] : answers.styles;
        this.styles = util.styles(this.chosenStyles);

        this.removeOld = answers.removeOld;
        this.useJade = answers.useJade;

        this.preProcessors = util.mapToList(this.styles.pre);

        this.styleLangs = this.preProcessors.slice(0);
        if (this.styles.css) this.styleLangs.push('css');
        // this.config.save();

        done();
      }.bind(this));
    },

    phase2: function () {
      if (!this.styles.pre.stylus) return;

      var done = this.async();

      info('Note: For Nib you need cairo installed for canvas installation used');
      info('brew install cairo (MacOSX)');
      info('wget https://raw.githubusercontent.com/LearnBoost/node-canvas/master/install -O - | sh');
      info('IO.js: See https://github.com/mafintosh/node-gyp-install')

      var prompts = this.prompts.phase2(this);

      this.prompt(prompts, function(answers) {
        this.stylus = {plugins: {}};
        this.stylus.plugins.list = answers.stylusPlugins;
        this.stylus.plugins.obj = util.addons(this.stylus.plugins);
        done();
      }.bind(this));
    }
  },

  // See File API: https://github.com/sboudrias/mem-fs-editor
  writing: {
    writer.writeAll();
  },

  install: function() {
    if (this.styles.pre.sass) install.sass();
    if (this.styles.pre.stylus) install.stylus();
    if (this.useJade) install.jade();
  },

  end: function() {
    info("Installed:" + this.preProcessors.join(' '));
  }
});
