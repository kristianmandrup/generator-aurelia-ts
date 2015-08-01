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

function jspmInstallAmp(names) {
  var params = names.map(function(name) {
    var fullName = ['ampersand', name].join('-');
    return ['github:ampersandjs', fullName].join('/');
  });
  runJspmInstall(params);
}

function runJspmInstall(list) {
  if (!list || list.length ==0) return;
  list.unshift('install');
  generator.spawnCommand('jspm', list);
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
      choices: ['app', 'registry', 'state', 'collection', 'rest-collection', 'model'],
      default: ['app', 'collection', 'model']
    }, {
      type: 'confirm',
      name: 'humanModel',
      message: 'Human model',
      default: false
    }];

    this.prompt(prompts, function(answers) {
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
    jspmInstallAmp(this.modules);
    if (this.humanModel) {
      runJspmInstall(['github:HenrikJoreteg/human-model']);
    }
  },
  end: function() {
  }
});
