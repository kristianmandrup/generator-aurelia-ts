// npm install -g ampersand : CLI
// AmpersandJS/ampersand-app
// AmpersandJS/ampersand-collection
// https://github.com/ampersandjs/ampersand-model
// https://github.com/ampersandjs/ampersand-rest-collection
// AmpersandJS/ampersand-registry

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

function jspmInstall(names) {
  var params = names.map(function(name) {
    return ['github:ampersandjs', name].join('/');
  });

  params.unshift('install');
  if (params) {
    // var done = generator.async();
    spawn(params);
    // done();
  }
}

function spawn(params) {
  generator.spawnCommand('jspm', params);
}

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
  },

  prompting: function() {
    var done = this.async();

    // TODO: add more state managers
    // f.ex swarm.js for realtime
    var prompts = [{
      type: 'checkbox',
      name: 'modules',
      message: 'Ampersand state modulas',
      choices: ['app', 'collection', 'rest-collection', 'model'],
      default: ['app', 'collection', 'model']
    }];

    this.prompt(prompts, function(answers) {
      this.modules = [];
      for (let key of Object.keys(answers)) {
        this[key] = answers[key];
        this.modules.push(key);
      }
      // this.config.save();

      done();
    }.bind(this));
  },

  install: function() {
    jspmInstall(this.modules);
  },
  end: function() {
  }
});
