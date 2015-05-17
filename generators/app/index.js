'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
require('sugar');

var generator;

module.exports = yeoman.generators.Base.extend({

  // note: arguments and options should be defined in the constructor.
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);

    generator = this;
    this.props = {};
    // This makes `appname` a required argument.
    this.argument('appname', { type: String, required: false });
    // And you can then access it later on this way; e.g. CamelCased
    this.props.appname = this.appname ? this.appname.camelize() : null;

    // This method adds support for a `--coffee` flag
    this.option('sass');
    this.option('stylus');

    // TODO: use to configure css/scss or stylus
    this.props.styleLang = 'css';
    this.props.styleLang = this.options.scss || this.styleLang;
    this.props.styleLang = this.options.stylus || this.styleLang;

    this.props.githubAccount = this.config.get('githubAccount');
  },

  // TODO: Add prompt for style lang unless passed as argument
  // TODO: Add editor selection prompt
  prompting: function () {
    var done = this.async();

    // TODO: dynamically build prompt object
    var prompts = [{
      type    : 'input',
      name    : 'title',
      message : 'Your application name',
      default : this.appName // Name
    }, {
      type    : 'input',
      name    : 'title',
      message : 'Your application title',
      default : this.appTitle
    }, {
      type    : 'input',
      name    : 'githubAccount',
      message : 'Your github account',
      default : this.props.githubAccount
    }, {
      type    : 'input',
      name    : 'authorEmail',
      message : 'Your email',
      default : this.props.authorEmail
    }, {
      type    : 'input',
      name    : 'authorName',
      message : 'Your name',
      default : this.props.authorName
    }, {
      type    : 'list',
      name    : 'style',
      choices: ['None', 'Stylus', 'SCSS'],
      default: 'Stylus',
      message : 'Your CSS preprocessor'
    }];

    this.prompt(prompts, function (answers) {
      this.title = answers.title;
      this.appName = answers.appName;
      this.appDesc = answers.appDesc || answers.appName;

      this.config.save();

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      var self = this;
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        {
          githubAccount: self.githubAccount,
          authorName: self.authorName,
          authorEmail: self.authorEmail,
          appDesc: self.appDesc,
          appName: self.appName
        }
      );
      this.fs.copyTpl(
        this.templatePath('_index.html'),
        this.destinationPath('index.html'),
        { title: self.title }
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

    // TODO: improve by using templates ;)
    viewFiles: function () {
      this.bulkCopy('views', 'src');
    },

    buildFiles: function () {
      this.bulkDirectory('build', 'build');
    }
  },

  install: function () {
    this.installDependencies();
  },

  end: function () {
    this.composeWith('aurelia-ts:typescript');
  }
});
