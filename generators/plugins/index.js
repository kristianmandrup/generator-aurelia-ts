'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({

  // note: arguments and options should be defined in the constructor.
  constructor: function () {
    generators.Base.apply(this, arguments);
  },      

  // TODO: Add prompt for style lang unless passed as argument
  // TODO: Add editor selection prompt
  prompting: function () {
    var done = this.async();

    // TODO: dynamically build prompt object?
    var prompts = [{
      type    : 'checkbox',
      name    : 'backends',
      message : 'Your Backend integrations',
      choices: ['Breeze', 'Sails'],
      default : []
    }, {
      type    : 'checkbox',
      name    : 'databases',
      message : 'Your Database integrations',
      choices: ['RethinkDB', 'MongoDB'],
      default: []      
    }];

    this.prompt(prompts, function (answers) {
      this.opts.backends = answers.backends;
      this.opts.databases = answers.databases;
      done();
    }.bind(this));
  },

  writing: {
    backends: function () {
    },

    databases: function () {
    }
  },

  install: function () {
    this.installDependencies();
  }
});
