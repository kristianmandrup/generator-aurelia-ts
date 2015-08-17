'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
require('sugar');
var extend = require('extend');
var fs = require('node-fs-extra');
var utl = require('util');
var lib = require('../../lib');
var log = lib.log;

var selected, ext;
const maps = require('./maps');
var util = require('./util');
var write = require('./write');
var prompts = require('./prompts');
var parser = require('./parser');

module.exports = yeoman.generators.Base.extend({
  // note: arguments and options should be defined in the constructor.
  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);
    this.option('bootstrap');
    // options
  },
  initializing: function() {
    this.props = {plugins: {}};
    this.props.bootstrap = this.options.bootstrap;
    this.util = lib.util;
    this.copy = lib.copy(this);
    this.writer = lib.writer(write(this));
    this.install = lib.install(this);
    this.info = lib.info(this);
    this.prompts = prompts(this);
    this.conflicter.force = true;
  },
  prompting: function() {
    var done = this.async();
    this.prompt(this.prompts.createFor(this.options), function(answers) {
      // returns:
      // obj: {...}
      // selected: [...]
      this.props.plugins = parser(answers).parse();
      // this.config.save();
      // console.log(`index.js:: this.props.plugins selected: ${this.props.plugins.selected}`)
      done();
    }.bind(this));
  },

  configuring: function() {
    var plugins = this.props.plugins;
    this.props.plugins.real = util.filterReal(plugins.selected, maps.plugins);
    this.props.plugins.conf = extend({}, plugins.obj, {
      selected: this.util.prepare4Tpl(plugins.real),
    });
  },

  writing: function() {
    this.writer.writeAll();
  },

  install: function() {
    log.info('Installing Plugins...');
    var plugins = this.props.plugins;
    this.install.jspm.resolvedPackages(plugins.selected, maps.jspm);

    // fixes bad jade dependency: https://github.com/Craga89/aurelia-jade-viewstrategy/issues/2
    if (plugins.obj.jade) {
      // install.jspm.packages(['npm:jade']);
    }
  },

  end: function() {
    log.info('Installed: ' + this.props.plugins.selected.join(', '));
  }
});
