'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
require('sugar');
var fs = require('node-fs-extra');

var generator;
var selected, ext;

function info(msg) {
  console.log(msg);
}

function jspmInstall(names) {
  var params = names.map(function(name) {
    var resolved = jsmpInstallsMap[name];
    if (!resolved) {
      resolved = name;
    }
    return resolved;
  });
  runJspmInstall(params);
}

function runJspmInstall(list) {
  if (!list || list.length ==0) return;
  list.unshift('install');
  generator.spawnCommand('jspm', list);
}

Array.prototype.hasEntry = function(obj) {
  return this.indexOf(obj) >= 0;
}

function filterReal(list) {
  return list.filter(function(name) {
    return pluginMap[name];
  }).map(function(name) {
    return pluginMap[name];
  })
}

function docRepos(selected) {
  return selected.map(function(name) {
    let entry = repoMap[name];
    return `- [${entry.label}](${entry.repo})`;
  }).join('\n')
}

var repoMap = {
  flux: {
    label: 'Flux',
    repo: 'https://github.com/tfrydrychewicz/aurelia-flux'
  },
  auth: {
    label: 'Authentication',
    repo: 'https://github.com/paulvanbladel/aureliauth'
  },
  validation: {
    label: 'Validation',
    repo: 'https://github.com/aurelia/validation'
  },
  computed: {
    label: 'Computed properties',
    repo: 'https://github.com/jdanyow/aurelia-computed',
  },
  i18next: {
    label: 'i18next',
    repo: 'https://github.com/zewa666/aurelia-i18next'
  },
  bsModal: {
    label: 'Bootstrap Modal',
    repo: 'https://github.com/PWKad/aurelia-bs-modal',
  },
  rethinkDB: {
    label: 'Rethink DB bindings',
    repo: 'https://github.com/kristianmandrup/aurelia-rethink-bindtable'
  },
  breeze: {
    label: 'Breeze bindings',
    repo: 'https://github.com/jdanyow/aurelia-breeze'
  },
  async: {
    label: 'Async',
    repo: 'https://github.com/jdanyow/aurelia-async'
  },
  animator: {
    label: 'CSS Animator',
    repo: 'https://github.com/aurelia/aurelia-animator-css'
  },
  dialog: {
    label: 'Dialog',
    repo: 'https://github.com/gooy/aurelia-dialogs'
  },
  fetch: {
    label: 'Fetch Client',
    repo: 'https://github.com/aurelia/fetch-client'
  },
  virtualList: {
    label: 'Virtual List',
    repo: 'https://github.com/aurelia/ui-virtualization'
  },
  leaflet: {
    label: 'Leaflet',
    repo: 'https://github.com/ceoaliongroo/aurelia-leaflet'
  },
  jadeViews: {
    label: 'Jade View Strategy',
    repo: 'https://github.com/Craga89/aurelia-jade-viewstrategy'
  },
  materialize: {
    label: 'Material UI',
    repo: 'https://github.com/manuel-guilbault/aurelia-materialize'
  }
}

var pluginMap = {
  animator: 'aurelia-animator-css',
  validation: 'aurelia-validation',
  computed: 'aurelia-computed',
  async: 'aurelia-async',
  virtualList: 'aurelia-ui-virtualization',
  i18next: 'aurelia-i18next',
  auth: 'aureli-auth',
  leaflet: 'aurelia-leaflet',
  breeze: 'aurelia-breeze',
  bsModal: 'aurelia-bs-modal'
  // more...
};

var jsmpInstallsMap = {
  animator: 'aurelia-animator-css',
  async: 'aurelia-async',
  flux: 'aurelia-flux',
  computed: 'aurelia-computed',
  dialog: 'aurelia-dialog',
  fetch: 'aurelia-fetch-client',
  virtualList: 'aurelia-ui-virtualization',
  leaflet: 'aurelia-leaflet=github:ceoaliongroo/aurelia-leaflet',
  i18next: 'aurelia-i18next=github:zewa666/aurelia-i18next',
  bsModal: 'aurelia-bs-modal',
  auth: 'aureli-auth=github:paulvanbladel/aureliauth',
  validation: 'aurelia-validation',
  jadeViews: 'aurelia-jade-viewstrategy=github:Craga89/aurelia-jade-viewstrategy',
  materialize: 'aurelia-materialize=github:manuel-guilbault/aurelia-materialize',
  rethinkDB: 'aurelia-rethink-bindtable=github:kristianmandrup/aurelia-rethink-bindtable',
  breeze: 'aurelia-breeze'
};

var mapped = {
  'Animator': 'animator',
  'Virtual List': 'virtualList',
  'Dialog': 'dialog',
  'Async': 'async',
  'Materialize': 'materialize',
  'Breeze bindings': 'breeze',
  'RethinkDB bindings': 'rethinkDB',
  'Jade Views': 'jadeViews'
}

function prepare4Tpl(list) {
  return list.map(function(item) {
    return "'" + item + "'";
  });
}

// test if project contains an app.ts file. If so assume we are using TypeScript!
function getJsLangExt() {
  var appTs = generator.destinationPath('src/app.ts');
  return fs.existsSync(appTs) ? 'ts' : 'js';
}

module.exports = yeoman.generators.Base.extend({

  // note: arguments and options should be defined in the constructor.
  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);
    generator = this;
    this.props = {};
    this.props.bootstrap = this.options.bootstrap;
    generator = this;

    ext = getJsLangExt();
  },

  initializing: function() {
  },

  // TODO: Add prompt for style lang unless passed as argument
  // TODO: Add editor selection prompt
  prompting: function() {
    var done = this.async();
    // info('Install Aurelia Plugins:');

    // TODO: add Bootstrap Modal to UI checkbox list
    var prompts = [{
      type: 'checkbox',
      name: 'ui',
      choices: ['Virtual List', 'Dialog', 'Materialize', 'Animator'],
      message: 'UI',
      default: [],
    }, {
      type: 'confirm',
      name: 'jadeViews',
      message: 'Jade Views',
      default: false,
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
          this.sel[key] = answer ? key : false;
        } else {
          // Assume Array
          for (let choice of answer) {
            var name = mapped[choice] || choice.toLowerCase();
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

  writing: {
    prepare: function() {
      this.realPlugins = filterReal(selected);
      this.conflicter.force = true;
    },
    docs: function() {
      // TODO: copy all such docs to /docs folder
      this.fs.copyTpl(
        this.templatePath('root/_Plugins.md'),
        this.destinationPath('Plugins.md'), {
          selectedPluginRepos: docRepos(selected)
        }
      );
    },

    srcFiles: function() {
      // TODO: choose to use either .ts or .js file somehow!
      this.fs.copyTpl(
        this.templatePath(`src/_plugin-config.${ext}`),
        this.destinationPath(`src/plugin-config.${ext}`), {
          selected: prepare4Tpl(this.realPlugins),
          i18next: this.i18next,
          materialize: this.materialize,
          validation: this.validation
        }
      );
    },
    specialFiles: function() {
      if (this.validation) {
        this.fs.copy(
          this.templatePath('src/welcome.js'),
          this.destinationPath('src/welcome.js')
        );
      }
    }
  },

  install: function() {
    info("Installing Plugins...");
    jspmInstall(selected);

    // fixes bad jade dependency: https://github.com/Craga89/aurelia-jade-viewstrategy/issues/2
    if (this.jade) {
      runJspmInstall('npm:jade');
    }
  },

  end: function() {
    info('Installed: ' + selected.join(', '));
  }
});
