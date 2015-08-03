'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
require('sugar');

var generator;
var selected;

function info(msg) {
  console.log(msg);
}

// Ampersand
module.exports = yeoman.generators.Base.extend({
  // note: arguments and options should be defined in the constructor.
  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);
    generator = this;
    this.props = {};
  },

  initializing: function() {
  },

  prompting: function() {
    var done = this.async();

    // TODO: add more state managers
    // f.ex swarm.js for realtime
    var prompts = [{
      type: 'confirm',
      name: 'ampersand',
      message: 'Ampersand models and collections',
      default: false,
    }];

    this.prompt(prompts, function(answers) {
      this.ampersand = answers.ampersand;
      // this.config.save();

      done();
    }.bind(this));
  },

  install: function() {
  },
  end: function() {
    if (this.ampersand) {
      this.composeWith('aurelia-ts:amp', {
        options: {}
      });
    }
  }
});
