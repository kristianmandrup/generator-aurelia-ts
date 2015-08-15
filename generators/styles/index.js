'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
require('sugar');
var extend = require('extend');
var fs = require('node-fs-extra');
var lib = require('../../lib');
var write = require('./write');
var prompts = require('./prompts');
var util = require('./util');
var install = require('./install');
var stylesPath = util.stylesPath;
var log = lib.log;
var info = log.info;
var generator, linux, macOSX;

var printObj = function(name, obj) {
  console.log(`printObject ${name}`);
  let keys = Object.keys(obj);
  console.log(`got ${keys.length} properties:`);
  keys.forEach(function(k, i, arr) {
    console.log(`${k}->${obj[k]}`);
  });
}
console.log('*** Before generator');
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
    // this.props.styles = util.styles(this.options);
    // choose preferred style (Stylus highest priority)
    this.props.styleLang = 'css'; // this.props.styles[0] || 'css';

    // init phase helpers
    this.install = lib.install(this);
    this.copy = lib.copy(this);
    this.writer = lib.writer(write(this));
    this.prompts = prompts.createFor(this);
    this.util = lib.util;
    this.install = install(this);
  },

  prompting: {
    phase1: function() {
      var done = this.async();

      this.prompt(this.prompts.phase1, function(answers) {
        // this.chosenStyles = this.util.isEmpty(answers.styles) ? ['None'] : answers.styles;
        this.chosenStyles = [];
        if (this.options.sass) this.chosenStyles.push('SASS');
        if (this.options.stylus) this.chosenStyles.push('Stylus');
        if (this.util.isEmpty(answers.styles))
          this.chosenStyles = this.chosenStyles.length == 0? ['None']: this.chosenStyles;
        else
          this.chosenStyles = this.chosenStyles.concat(answers.styles);

        this.chosenStyles = this.chosenStyles.filter(function(elem, i, arr) {
          return arr.indexOf(elem) == i;
        });
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
      info('Note: For Nib you might need cairo installed (for canvas)');
      info('brew install cairo (MacOSX)');
      info('wget https://raw.githubusercontent.com/LearnBoost/node-canvas/master/install -O - | sh');
      info('IO.js: See https://github.com/mafintosh/node-gyp-install')

      this.prompt(this.prompts.phase2, function(answers) {
        this.stylus = {plugins: {}};
        this.stylus.plugins.list = answers.stylusPlugins;
        this.stylus.plugins.obj = util.addOns(this.stylus.plugins.list);

        done();
      }.bind(this));
    }
  },
  writing: function() {
    this.writer.writeAll();
  },
  install: function() {
    if (this.styles.pre.sass) this.install.sass();
    if (this.styles.pre.stylus) this.install.stylus();
    if (this.useJade) this.install.jade();
  },
  end: function() {
    info("Installed:" + this.preProcessors.join(' '));
  }
});
