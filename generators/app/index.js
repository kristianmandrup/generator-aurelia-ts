'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({

  // note: arguments and options should be defined in the constructor.
  constructor: function () {
    generators.Base.apply(this, arguments);

    // This makes `appname` a required argument.
    this.argument('appname', { type: String, required: true });
    // And you can then access it later on this way; e.g. CamelCased
    this.appname = this._.camelize(this.appname);

    // This method adds support for a `--coffee` flag
    this.option('sass');

    // TODO: use to configure css/scss or stylus
    this.styleLang = 'css';
    this.styleLang = this.options.scss || this.styleLang;
    this.styleLang = this.options.stylus || this.styleLang;    
  },      

  // TODO: Add prompt for style lang unless passed as argument
  // TODO: Add editor selection prompt
  prompting: function () {
    var done = this.async();

    // TODO: dynamically build prompt object?
    var appNamePrompt = {
      type    : 'input',
      name    : 'title',
      message : 'Your application title',
      default : this.appname // Default to current folder name
    };

    this.prompt(appNamePrompt, function (answers) {
      this.opts.title = answers.title;
      this.log(answers.title);
      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      var self = this;
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copyTpl(
        this.templatePath('_index.html'),
        this.destinationPath('index.html')
        { title: self.opts.title }
      );
    },

    projectFiles: function () {
      this.bulkCopy('root', '.');
    },

    testFiles: function () {
      this.bulkDirectory('test', 'test');
    },

    styleFiles: function () {
      this.bulkDirectory('styles', 'styles');
    },

    docFiles: function () {
      this.bulkDirectory('doc', 'doc');
    },

    // TODO: improve by using templates ;)
    srcFiles: function () {
      this.bulkDirectory('src', 'src');
    },

    buildFiles: function () {
      this.bulkDirectory('build', 'build');
    }
  },

  install: function () {
    this.installDependencies();
  }
});
