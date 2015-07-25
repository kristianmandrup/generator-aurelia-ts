'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
require('sugar');

var generator;

function jspmInstall(generator, pkg) {
  generator.spawn('jspm', ['install', pack]);
}

var jspmInstalls = {
  flux: 'github:tfrydrychewicz/aurelia-flux',
  computed: 'aurelia-computed',
  i18next: 'aurelia-i18next=github:zewa666/aurelia-i18next',
  bsModal: 'aurelia-bs-modal',
  auth: 'github:paulvanbladel/aureliauth',
  validation: 'aurelia-validation',
  rethinkDB: 'github:kristianmandrup/aurelia-rethink-bindtable',
  breeze: 'aurelia-breeze'
};

module.exports = yeoman.generators.Base.extend({

  // note: arguments and options should be defined in the constructor.
  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);

    generator = this;
    this.props = {};
  },

  // TODO: Add prompt for style lang unless passed as argument
  // TODO: Add editor selection prompt
  prompting: function() {
    var done = this.async();

    var prompts = [{
      type: 'confirm',
      name: 'flux',
      message: 'flux',
      default: false,
    }, {
      type: 'confirm',
      name: 'auth',
      message: 'authentication',
      default: false,
    }, {
      type: 'confirm',
      name: 'validation',
      message: 'validation',
      default: false,
    }, {
      type: 'confirm',
      name: 'computed',
      message: 'computed properties',
      default: false,
    }, {
      type: 'confirm',
      name: 'i18next',
      message: 'i18 next localization',
      default: false,
    }, {
      type: 'confirm',
      name: 'rethinkDB',
      message: 'RethinkDB bindings',
      default: false,
    }, {
      type: 'confirm',
      name: 'breeze',
      message: 'Breeze bindings',
      default: false,
    }];

    var bsModalPrompt = {
      type: 'confirm',
      name: 'bsModal',
      message: 'Bootstrap Modal',
      default: false,
    };

    if (this.opts.cssFramework == 'Bootstrap') {
      prompts.push(bsModalPrompt);
    }

    this.prompt(prompts, function(answers) {
      this.sel = {};
      // iterate all keys in answers!
      for (key in answers.keys()) {
        this.sel[key] = answers[key];
      }
      this.config.save();

      done();
    }.bind(this));
  },

  writing: {
    plugins: function() {
      // TODO: iterate selection map
      // lookup how to install selection in jspm map
      // This is terrible pattern duplication (quick hack!)
      for (name in this.sel) {
        jspmInstall(this, jspmInstalls[name]);
      }
    }
  }
}


