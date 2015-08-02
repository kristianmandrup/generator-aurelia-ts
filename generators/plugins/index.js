'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
require('sugar');
var fs = require('node-fs-extra');

let lib = require('../../lib');

let log = lib.log;

var generator;
var selected, ext;

var maps = require('./maps');
var util = require('./util');
let prompts = require('./prompts');
let parser = require('./parser');

module.exports = yeoman.generators.Base.extend({
  // note: arguments and options should be defined in the constructor.
  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);
    generator = this;
    // options
  },

  initializing: function() {
    this.props = {};
    this.props.bootstrap = this.options.bootstrap;
    this.util = lib.util;
    this.copy = lib.copy;

  },

  prompting: function() {
    var done = this.async();
    this.prompt(prompts.createFor(this), function(answers) {
      this.plugins = parser(answers).parse();
      // this.config.save();
      done();
    }.bind(this));
  },

  writing: {
    prepare: function() {
      this.realPlugins = util.filterReal(this.plugins.selected);
      this.conflicter.force = true;
    },
    docs: function() {
      // TODO: copy all such docs to /docs folder
      this.copy.rootTpl('_Plugins.md', 'Plugins.md', {
          selectedPluginRepos: docRepos(this.plugins.selected)
        }
      );
    },

    srcFiles: function() {
      let ext = lib.info.getJsLangExt();
      // TODO: choose to use either .ts or .js file somehow!
      this.copy.srcTpl(`src/_plugin-config.${ext}`, `src/plugin-config.${ext}`, {
          selected: prepare4Tpl(this.realPlugins),
          i18next: this.plugins.i18next,
          materialize: this.plugins.materialize,
          validation: this.plugins.validation
        });
    },
    specialFiles: function() {
      if (this.validation) this.copy.srcFile('welcome.js');
    }
  },

  install: function() {
    log.info("Installing Plugins...");
    lib.jspm.resolvedPackages(selected, maps.jspmInstalls);

    // fixes bad jade dependency: https://github.com/Craga89/aurelia-jade-viewstrategy/issues/2
    if (this.plugins.jade) {
      install.jspm.packages(['npm:jade']);
    }
  },

  end: function() {
    log.info('Installed: ' + this.plugins.selected.join(', '));
  }
});
