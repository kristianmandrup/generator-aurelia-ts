'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
require('sugar');
var fs = require('node-fs-extra');

let lib = function(file) {
  return require(`../../lib/${file}`);
}

let util = require('./util');
let stylesPath = util.stylesPath;

let install = lib('install');
let copy = lib('copy');
let log = lib('log');
let options = lib('options');

var generator, linux, macOSX;

module.exports = yeoman.generators.Base.extend({

  // note: arguments and options should be defined in the constructor.
  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);

    generator = this;
    this.props = {};

    this.option('sass');
    this.option('stylus');

    this.defaultStyles = util.defaultStyles(this.options);
    // choose preferred style (Stylus highest priority)
    this.styleLang = this.defaultStyles[0] || 'css';
  },

  initializing: function() {
  },

  prompting: {
    phase1: function() {
      var done = this.async();

      var prompts = [{
        type: 'checkbox',
        name: 'styles',
        choices: [
          'Stylus',
          'SASS'
        ],
        default: this.defaultStyles,
        message: 'CSS Preprocessors'
      }, {
        type: 'confirm',
        name: 'removeOld',
        default: false,
        message: 'Remove old styles?'
      }, {
        type: 'confirm',
        name: 'useJade',
        default: false,
        message: 'Use Jade Templates?'
      }];

      this.prompt(prompts, function(answers) {
        this.chosenStyles = isEmpty(answers.styles) ? ['None'] : answers.styles;
        this.styles = util.styles(this.chosenStyles);

        this.removeOld = answers.removeOld;
        this.useJade = answers.useJade;

        this.preProcessors = util.mapToList(this.styles.pre);
        this.styleLangs = this.preProcessors.slice(0);
        if (this.styles.css) {
          this.styleLangs.push('css');
        }
        // this.config.save();

        done();
      }.bind(this));
    },

    phase2: function () {
      if (!this.styles.pre.stylus) return;

      var done = this.async();

      info('Note: For Nib you need cairo installed for canvas installation used');
      info('brew install cairo (MacOSX)');
      info('wget https://raw.githubusercontent.com/LearnBoost/node-canvas/master/install -O - | sh');
      info('IO.js: See https://github.com/mafintosh/node-gyp-install')

      var prompts = [{
        type: 'checkbox',
        name: 'stylusPlugins',
        choices: [
          'Autoprefixer',
          'Nib',
          'Axis', // extends nib
          'Rupture',
          'Fluidity',
          'Jeet' // extends nib
        ],
        default: ['Autoprefixer', 'Nib'],
        message: 'Stylus plugins'
      }];

      this.prompt(prompts, function(answers) {
        this.stylus = {plugins: {}};
        this.stylus.plugins.list = answers.stylusPlugins;
        this.stylus.plugins.obj = util.addons(this.stylus.plugins);
        done();
      }.bind(this));
    }
  },

  // See File API: https://github.com/sboudrias/mem-fs-editor
  writing: {
    readme: function() {
      this.fs.copyTpl(
        this.templatePath('root/_Styles.md'),
        this.destinationPath('Styles.md'), {
          stylus: this.addons.stylus
        }
      );
    },

    clearOld: function() {
      var self = this;
      if (!this.removeOld) return;
      for (let folder of ['css', 'stylus', 'sass']) {
        var path = this.destinationPath(stylesPath(folder));
        if (fs.existsSync(path)) {
          fs.removeSync(path, function(err) {
            info('deleted:' + path);
          });
        }
      }

      var path = this.destinationPath('styles/styles.css');
      if (fs.existsSync(path)) {
        fs.remove(path, function(err) {
          info('deleted:' + path);
        });
      }
    },

    styleFiles: function() {
      if (!this.styles.pre.stylus) return;

      let stylusIdx = this.styleLangs.indexOf('Stylus');
      var bulkStyles = this.styleLangs.slice(0);

      if (stylusIdx >= 0)
        bulkStyles.splice(stylusIdx, 1);

      for (let lang of bulkStyles) {
        var folder = stylesFolder(lang);
        var path = stylesPath(folder);
        this.bulkDirectory(path, path);
      }
      this.copy.stylesTemplate('stylus/_styles.styl', 'stylus/styles.styl', this.addons);
    },

    cssBuildTask: function() {
      var watchTasks = util.watchTasks(this.styles.pre);
      var preProcessors = util.prepare4Tpl(this.preProcessors);

      this.copy.buildTemplate('_styles.js', 'styles.js'), {
          preProcessors: preProcessors,
          watchTasks: watchTasks,
          styles: this.styleLangs.join(' and '),
        }
      );
    },

    cssPreProcessorTasks: function() {
      if (!this.styles.pre.sass) return;

      this.fs.copy(
        this.templatePath('styles/tasks/sass.js'),
        this.destinationPath('build/tasks/sass.js')
      );
    },
    stylusTasks: function() {
      if (!this.styles.pre.stylus) return;
      var useList = util.useList(this.stylus.plugins.list)
      this.copy.buildTemplate('_stylus.js', 'stylus.js',
        extend(this.addons, {useList: useList})
      );
    },

    templateTasks: function() {
      if (this.useJade) this.copy.buildFile('jade.js');
    }
  },

  install: function() {
    if (this.styles.pre.sass) install.sass();
    if (this.styles.pre.stylus) install.stylus();
    if (this.useJade) install.jade();
  },

  end: function() {
    info("Installed:" + this.preProcessors.join(' '));
  }
});
