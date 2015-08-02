'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
require('sugar');
let lib = require('../../lib');
let util = require('./util');
var generator;

let log = lib.log;

// Ampersand
module.exports = yeoman.generators.Base.extend({

  // note: arguments and options should be defined in the constructor.
  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);
    generator = this;
    this.props = {};
    this.props.bootstrap = this.options.bootstrap;
    generator = this;
  },

  initializing: function() {
    this.prompts = require('./prompts');
  },

  prompting: function() {
    var done = this.async();

    // TODO: add more state managers
    // f.ex swarm.js for realtime

    this.prompt(this.prompts, function(answers) {
      this.modules = [];
      for (let name of answers.modules) {
        this[name] = true;
      }
      this.modules = answers.modules;
      this.humanModel = answers.humanModel;
      // this.config.save();

      done();
    }.bind(this));
  },

  install: function() {
    util.install(this.modules);
    if (this.humanModel) {
      jspm.packages(['github:HenrikJoreteg/human-model']);
    }
  },
  end: function() {
  }
});
