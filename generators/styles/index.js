'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
require('sugar');
var fs = require('node-fs-extra');

var generator;

function prepare4Tpl(list) {
  return list.map(function(item) {
    return "'" + item + "'";
  });
}

function info(msg) {
  console.log(msg);
}

function command(msg) {
  console.log('  $ ' + msg);
}

function stylesPath(folder) {
  return ['styles', folder].join('/');
}

function stylesFolder(lang) {
  return lang.toLowerCase();
}

function containsFor(list) {
  return function contains(value) {
    return list.indexOf(value) >= 0;
  }
}

module.exports = yeoman.generators.Base.extend({

  // note: arguments and options should be defined in the constructor.
  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);

    generator = this;
    this.props = {};

    this.option('sass');
    this.option('stylus');

    this.defaultStyles = [];
    if (this.options.sass) {
      this.defaultStyles.push('SASS')
    }
    if (this.options.stylus) {
      this.defaultStyles.push('Stylus')
    }

    this.styleLang = this.defaultStyles[0] || 'css';
  },

  initializing: function() {
  },

  prompting: function() {
    var done = this.async();

    var prompts = [{
      type: 'checkbox',
      name: 'styles',
      choices: [
        'None (CSS)',
        'Stylus',
        'SASS'
      ],
      default: this.defaultStyles,
      message: 'CSS Preprocessors'
    }, {
      type: 'prompt',
      name: 'removeOld',
      default: false,
      message: 'Remove old styles'
    }, {
      type: 'prompt',
      name: 'useJade',
      default: false,
      message: 'Use Jade Templates'
    }];

    this.prompt(prompts, function(answers) {
      this.styles = answers.styles;

      var contains = containsFor(this.styles);

      this.css = contains('None (CSS)');
      this.sass = contains('SASS');
      this.stylus = contains('Stylus');
      this.removeOld = answers.removeOld;
      this.useJade = answers.useJade;

      this.preProcessors = [];
      if (this.sass) {
        this.preProcessors.push('sass')
      }
      if (this.stylus) {
        this.preProcessors.push('stylus')
      }

      this.styleLangs = this.preProcessors.slice(0);

      if (this.css) {
        this.styleLangs.push('css');
      }
      // this.config.save();

      done();
    }.bind(this));
  },

  default: function () {
    if (!this.stylus) return;

    var done = this.async();

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
      this.stylusPlugins = answers.stylusPlugins;

      var contains = containsFor(this.stylusPlugins);
      this.nib = contains('Nib');
      this.axis = contains('Axis');
      this.fluidity = contains('Fluidity');
      this.jeet = contains('Jeet');
      this.rupture = contains('Rupture');
      this.autoprefixer = contains('Autoprefixer');

      done();
    }.bind(this));
  },

  // See File API: https://github.com/sboudrias/mem-fs-editor
  writing: {
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
      var self = this;

      var stylusIdx = this.styleLangs.indexOf('stylus');
      if (stylusIdx >= 0) {
        var bulkStyles = this.styleLangs.slice(0);
        bulkStyles.splice(stylusIdx, 1);
      }

      for (let lang of bulkStyles) {
        var folder = stylesFolder(lang);
        var path = stylesPath(folder);
        this.bulkDirectory(path, path);
      }

      if (this.stylus) {
        this.fs.copyTpl(
          this.templatePath('styles/stylus/_styles.styl'),
          this.destinationPath('styles/stylus/styles.styl'), {
            nib: this.nib, // @import 'nib'
            axis: this.axis,
            fluidity: this.fluidity,
            rupture: this.rupture,
            jeet: this.jeet
          }
        );
      }
    },

    cssBuildTask: function() {
      var watchTasks = [];
      if (this.sass) {
        watchTasks.push('sass:watch');
      }
      if (this.stylus) {
        watchTasks.push('stylus:watch');
      }
      var preProcessors = prepare4Tpl(this.preProcessors);
      watchTasks = prepare4Tpl(watchTasks);

      this.fs.copyTpl(
        this.templatePath('styles/tasks/_styles.js'),
        this.destinationPath('build/tasks/styles.js'), {
          preProcessors: preProcessors,
          watchTasks: watchTasks,
          styles: this.styleLangs.join(' and '),
        }
      );
    },

    cssPreProcessorTasks: function() {
      if (this.sass) {
        this.fs.copy(
          this.templatePath('styles/tasks/sass.js'),
          this.destinationPath('build/tasks/sass.js')
        );
      }

      //

      var list = [];
      // autoprefixer should be last
      for (let plugin of ['axis', 'rupture', 'jeet', 'autoprefixer']) {
        if (this[plugin]) {
          list.push(plugin);
        }
      }
      var useList = list.map(function(plugin) {
        return plugin + '()';
      }).join(',');

      if (this.stylus) {
        this.fs.copyTpl(
          this.templatePath('styles/tasks/_stylus.js'),
          this.destinationPath('build/tasks/stylus.js'), {
            nib: this.nib,
            axis: this.axis,
            fluidity: this.fluidity,
            rupture: this.rupture,
            jeet: this.jeet,
            autoprefixer: this.autoprefixer,
            useList: useList
          }
        );
      }
    },

    templateTasks: function() {
      if (this.useJade) {
        this.fs.copy(
          this.templatePath('styles/tasks/jade.js'),
          this.destinationPath('build/tasks/jade.js')
        );
      }
    }
  },

  install: function() {
    if (this.sass) {
      generator.npmInstall('gulp-sass', {saveDev: true});
    }
    if (this.stylus) {
      generator.npmInstall('gulp-stylus', {saveDev: true});

      if (this.autoprefixer) {
        generator.npmInstall('autoprefixer-stylus', {saveDev: true});
      }

      if (this.nib) {
        generator.npmInstall('nib', {saveDev: true});
        generator.npmInstall('canvas', {saveDev: true});
      }

      if (this.axis) {
        generator.npmInstall('axis', {saveDev: true});
      }

      if (this.fluidity) {
        generator.npmInstall('fluidity', {saveDev: true});
      }

      if (this.rupture) {
        generator.npmInstall('rupture', {saveDev: true});
      }

      if (this.jeet) {
        generator.npmInstall('jeet', {saveDev: true});
      }
    }

    if (this.useJade) {
      generator.npmInstall('gulp-jade', {saveDev: true});
    }
  },

  end: function() {
    info("Installed:" + this.preProcessors.join(' '));
  }
});
