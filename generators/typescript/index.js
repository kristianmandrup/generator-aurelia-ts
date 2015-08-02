'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

let lib = function(file) {
  return require(`../../lib/${file}`);
}

let prompts = require('./prompts');
let write = require('./write');

let install = lib('install');
let copy = lib('copy');
let log = lib('log');
let options = lib('options');

var generator;

module.exports = yeoman.generators.Base.extend({

  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);
    var self = this;
    generator = this;
    this.props = {};
    this.install = install(this);
    this.copy = copy(this);
    this.writer = write(this);

    this.opts.ui = options.uiFramework(this.options);
    // this.props.vs = this.options.vs;
  },

  initializing: function () {
  },

  prompting: function () {
    var done = this.async();

    // info('TypeScript configuration:');
    this.prompt(prompts.createFor(this), function (answers) {
      this.props = answers;
      this.editor = answers.editor;
      this.conflicter.force = answers.typescript;
      this.amd = answers.amd;
      done();
    }.bind(this));
  },

  writing: function() {
    writer.writeAll();
  },

  install: function() {
    this.install.jspm.packages(['typescript', 'ts=github:frankwallis/plugin-typescript@^1.0.5']);
    this.install.npmDev('gulp-typescript');
  },
  end: function() {
    log.info('TypeScript installation complete :)');
  }
});
