'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var generator;

function info(msg) {
  console.log(msg);
}

function runJspmInstall(list) {
  if (!list || list.length == 0) return;
  list.unshift('install');
  generator.spawnCommand('jspm', list);
}

function jspmInstall(names) {
  var params = names.map(function(name) {
    var resolved = jspmInstalls[name];
    if (!resolved) {
      resolved = name;
    }
    return resolved;
  });
  runJspmInstall(params);
}

// Can be used to create jspm package install map
// See plugins generator
var jsmpInstallsMap = {};

// TODO: How to pass --save-dev option ??
function jspmInstallDev(names) {
  jspmInstall(names);
}

module.exports = yeoman.generators.Base.extend({

  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);
    var self = this;
    generator = this;
    this.props = {};
    this.props.cssFrameworks = this.options.cssFrameworks;
    this.cssFrameworks = this.props.cssFrameworks;
    if (this.cssFrameworks) {
      // TODO: use helper function
      this.semanticUI = this.cssFrameworks.indexOf('Semantic-UI') >= 0;
      this.framework7 = this.cssFrameworks.indexOf('Framework7') >= 0;
      this.foundation = this.cssFrameworks.indexOf('Foundation') >= 0;
      this.bootstrap = this.cssFrameworks.indexOf('Bootstrap') >= 0;
    }

    this.props.visualStudio = this.options.visualStudio;

    this.installDeps = function() {
      self.npmInstall();
      self.spawnCommand('jspm', ['install']);
    }
  },

  initializing: function () {
  },

  prompting: function () {
    var done = this.async();

    var prompts = [{
      type    : 'confirm',
      name    : 'amd',
      message : 'Use Aurelia AMD?',
      default : this.amd,
      when: function(answers) {
        return answers.typescript;
      }
    }];

    // {
    //   type: 'confirm',
    //   name: 'installDeps',
    //   message: 'Install dependencies for npm and jspm?',
    //   default: false
    // }

    // info('TypeScript configuration:');
    this.prompt(prompts, function (answers) {
      this.props = answers;
      this.conflicter.force = answers.typescript;
      this.amd = answers.amd;
      done();
    }.bind(this));
  },

  writing: {
    // copy templates for package.json, build/tasks/build.js
    typescript: function () {
      this.fs.copyTpl(
        this.templatePath('root/tsconfig.json'),
        this.destinationPath('tsconfig.json'), {
          amd: this.amd
        }
      );
      this.copy('root/build.js', 'build/tasks/build.js');
    },

    // See http://yeoman.github.io/generator/actions.html
    typings: function () {
      this.bulkDirectory('scripts', 'scripts');
      this.bulkDirectory('typings', 'typings');
      // this.fs.delete('typings/es6-promise');
      this.fs.copyTpl(
        this.templatePath('typings/tsd.d.ts'),
        this.destinationPath('typings/tsd.d.ts'), {
          amd: this.amd
        }
      );
    },

    srcFiles: function () {
      var self = this;
      this.fs.delete('src/*.js');
      this.bulkDirectory('src', 'src');
      this.fs.copyTpl(
        this.templatePath('src/app.ts'),
        this.destinationPath('src/app.ts'), {
          semanticUI: self.semanticUI,
          bootstrap: self.bootstrap,
          foundation: self.foundation,
          framework7: self.framework7
        }
      );
    },

    testFiles: function() {
      this.copy('root/ts-gulpfile.js', 'ts-gulpfile.js');
      this.copy('root/karma.conf.js', 'karma.conf.js');
      this.copy('root/test.js', 'build/tasks/test.js');
      this.copy('test/unit/app.spec.js', 'test/unit/app.spec.js');
    }
  },

  install: function() {
    jspmInstall(['typescript', 'ts=github:frankwallis/plugin-typescript@^1.0.5']);
    generator.npmInstall('gulp-typescript', {saveDev: true});

    // if (this.props.installDeps) {
    //   this.installDeps();
    // }
  },
  end: function() {
    info('TypeScript installation complete :)');
  }
});
