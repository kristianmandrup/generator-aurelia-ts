'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

lib = function(file) {
  return require(`../../lib/${file}`);
}

let install = lib('install');
let copy = lib('copy');
let log = lib('log');
let options = lib('options');

var generator;

module.exports = yeoman.generators.Base.extend({

  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);
    var self = this;
    generator = this;
    this.props = {};
    this.install = install(this);
    this.copy = copy(this);

    this.opts.ui = options.uiFramework(this.options);
    // this.props.vs = this.options.vs;
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
    }, {
      type    : 'confirm',
      name    : 'editor',
      message : 'Choose Editor',
      choices: ['Atom', 'VS', 'WebStorm', 'Sublime', 'Other'],
      default : 'Atom'
    }];

    // info('TypeScript configuration:');
    this.prompt(prompts, function (answers) {
      this.props = answers;
      this.editor = answers.editor;
      this.conflicter.force = answers.typescript;
      this.amd = answers.amd;
      done();
    }.bind(this));
  },

  writing: {
    docs: function () {
      this.fs.copy('docs/tsd-generation.md', 'docs/typescript/tsd-generation.md');

      let editorFile = `Aurelia-TypeScript-IDE-${this.editor}.md`;
      this.fs.copy(`docs/editors/${editorFile}`, `docs/typescript/editors/${editorFile}`);
    },

    // copy templates for package.json, build/tasks/build.js
    typescript: function () {
      this.copy.rootTemplate('tsconfig.json', {amd: this.amd});
      this.copy.buildFile('build.js');
    },

    // See http://yeoman.github.io/generator/actions.html
    typings: function () {
      this.bulkDirectory('scripts', 'scripts');
      this.bulkDirectory('typings', 'typings');
      // this.fs.delete('typings/es6-promise');
      var typingsTpl = this.copy.createFn('template', 'ts', 'typings');
      typingsTpl('_tsd.txt', 'tsd.d.ts'), {amd: this.amd});
    },

    srcFiles: function () {
      this.fs.delete('src/*.js');
      this.bulkDirectory('src', 'src');
      this.copy.srcTemplate('app.ts', this.opts.ui);
    },

    readme: function () {
      this.copy.rootTemplate('_TypeScript.md', 'TypeScript.md'), {atom: this.props.atom});
    },
    gulpfile: function () {
      this.copy.rootFile('ts-gulpfile.js');
    },
    buildTasks: function() {
      this.copy.buildFile('test.js');
    },
    testFiles: function() {
      this.copy.rootFile('karma.conf.js');
      this.copy.testFile('unit/app.spec.js');
    }
  },

  install: function() {
    this.install.jspm.packages(['typescript', 'ts=github:frankwallis/plugin-typescript@^1.0.5']);
    this.install.npmDev('gulp-typescript');

    // if (this.props.installDeps) {
    //   this.installDeps();
    // }
  },
  end: function() {
    log.info('TypeScript installation complete :)');
  }
});
