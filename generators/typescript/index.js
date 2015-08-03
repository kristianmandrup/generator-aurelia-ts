'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
let prompts = require('./prompts');
let write = require('./write');
let lib = require('../../lib');
let install = lib.install;
let copy = lib.copy;
let log = lib.log;
let util = lib.util;
let options = lib.options;
var generator;

module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);
    var self = this;
    generator = this;
    // this.props.vs = this.options.vs;
  },
  initializing: function () {
    this.props = {};
    this.props.ui = options.uiFrameworks(this.options.ui);
    this.install = install(this);
    this.copy = copy(this);
    this.writer = lib.writer(write(this));
  },
  prompting: function () {
    var done = this.async();

    // info('TypeScript configuration:');
    this.prompt(prompts.createFor(this), function (answers) {
      this.props = answers;
      this.props.editor = answers.editor;
      this.conflicter.force = answers.typescript;
      this.props.amd = answers.amd;
      done();
    }.bind(this));
  },
  writing: function() {
    this.writer.writeAll();
  },
  install: function() {
    this.install.jspm.packages(['typescript', 'ts=github:frankwallis/plugin-typescript@^1.0.5']);
    this.install.npmDev('gulp-typescript');
  },
  end: function() {
    log.info('TypeScript installation complete :)');
  }
});
