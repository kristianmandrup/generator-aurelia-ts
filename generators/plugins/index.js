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

function spawn(params) {
  generator.spawnCommand('jspm', params);
}

function jspmInstall(names) {
  var params = names.map(function(name) {
    var resolved = jsmpInstallsMap[name];
    if (!resolved) {
      resolved = name;
    }
    return resolved;
  });

  params.unshift('install');
  if (params) {
    // var done = generator.async();
    spawn(params);
    // done();
  }
}

var jsmpInstallsMap = {
  async: 'aurelia-async',
  flux: 'aurelia-flux',
  computed: 'aurelia-computed',
  dialog: 'aurelia-dialog',
  fetch: 'aurelia-fetch-client',
  virtualList: 'aurelia-ui-virtualization',
  leaflet: 'github:ceoaliongroo/aurelia-leaflet',
  i18next: 'github:zewa666/aurelia-i18next',
  bsModal: 'aurelia-bs-modal',
  auth: 'github:paulvanbladel/aureliauth',
  validation: 'aurelia-validation',
  materialize: 'github:manuel-guilbault/aurelia-materialize',
  rethinkDB: 'github:kristianmandrup/aurelia-rethink-bindtable',
  breeze: 'aurelia-breeze'
};

var mapped = {
  'Virtual List': 'virtualList',
  'Dialog': 'dialog',
  'Async': 'async',
  'Materialize': 'materialize',
  'Breeze bindings': 'breeze',
  'RethinkDB bindings': 'rethinkDB'
}

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
    info('Install Aurelia Plugins:')
  },

  // TODO: Add prompt for style lang unless passed as argument
  // TODO: Add editor selection prompt
  prompting: function() {
    var done = this.async();

    var prompts = [{
      type: 'checkbox',
      name: 'ui',
      choices: ['Virtual List', 'Dialog', 'Materialize'],
      message: 'Dialog',
      default: [],
    }, {
      type: 'confirm',
      name: 'fetch',
      message: 'HTTP Fetch',
      default: false,
    }, {
      type: 'confirm',
      name: 'flux',
      message: 'Flux',
      default: false,
    }, {
      type: 'confirm',
      name: 'leaflet',
      message: 'Leaflet Map API',
      default: false,
    }, {
      type: 'confirm',
      name: 'auth',
      message: 'Token based Authentication',
      default: false,
    }, {
      type: 'confirm',
      name: 'validation',
      message: 'Validation',
      default: false,
    }, {
      type: 'confirm',
      name: 'computed',
      message: 'Computed properties',
      default: false,
    }, {
      type: 'confirm',
      name: 'i18next',
      message: 'i18 next localization',
      default: false,
    }, {
      type: 'checkbox',
      name: 'bindings',
      choices: ['Async', 'Breeze bindings', 'RethinkDB bindings'],
      message: 'Bindings',
      default: [],
    }];

    var bsModalPrompt = {
      type: 'confirm',
      name: 'bsModal',
      message: 'Bootstrap Modal',
      default: false,
    };

    if (this.props.bootstrap) {
      prompts.push(bsModalPrompt);
    }

    this.prompt(prompts, function(answers) {
      this.sel = {};
      // iterate all keys in answers!
      let keys = Object.keys(answers);
      for (let key of keys) {
        var answer = answers[key];

        if (typeof answer === 'boolean') {
          this.sel[key] = answer;
        } else {
          // Assume Array
          for (let choice of answer) {
            var name = mapped[choice];
            this.sel[name] = name;
          }
        }
      }

      var self = this;
      selected = Object.keys(this.sel).filter(function(key) {
        return self.sel[key];
      })

      // this.config.save();

      done();
    }.bind(this));
  },

  install: function() {
    // TODO: iterate selection map
    // lookup how to install selection in jspm map
    // This is terrible pattern duplication (quick hack!)
    info("Installing Plugins...");
    jspmInstall(selected);
  },

  end: function() {
    info('Installed: ' + selected.join(' '));
  }
});
