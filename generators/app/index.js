'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
require('sugar');

var generator;

module.exports = yeoman.generators.Base.extend({

  // note: arguments and options should be defined in the constructor.
  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);

    generator = this;
    this.props = {};
    // This makes `appname` a required argument.
    this.argument('appname', {
      type: String,
      required: false
    });
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
  prompting: function() {
    var done = this.async();

    // TODO: dynamically build prompt object
    var prompts = [{
      type: 'input',
      name: 'appName',
      message: 'application name',
      default: this.appName // Name
    }, {
      type: 'input',
      name: 'title',
      message: 'application title',
      default: this.appTitle
    }, {
      type: 'input',
      name: 'githubAccount',
      message: 'github account',
      default: this.props.githubAccount
    }, {
      type: 'input',
      name: 'authorEmail',
      message: 'Your email',
      default: this.props.authorEmail
    }, {
      type: 'input',
      name: 'authorName',
      message: 'Your name',
      default: this.props.authorName
    }, {
      type: 'list',
      name: 'style',
      choices: ['Bootstrap', 'Foundation', 'Semantic-UI'],
      default: 'Bootstrap',
      message: 'Your CSS Framework'
    }];

    this.prompt(prompts, function(answers) {
      this.title = answers.title;
      this.appName = answers.appName || this.appName;
      this.appDesc = answers.title;
      this.cssFramework = answers.style;
      this.authorName = answers.authorName;
      this.authorEmail = answers.authorEmail;
      this.githubAccount = answers.githubAccount;

      this.config.save();

      done();
    }.bind(this));
  },

  writing: {
    app: function() {
      var self = this;
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'), {
          githubAccount: self.githubAccount,
          authorName: self.authorName,
          authorEmail: self.authorEmail,
          appDesc: self.appDesc,
          appName: self.appName,
          cssFramework: self.cssFramework
        }
      );
      this.fs.copyTpl(
        this.templatePath('_index.html'),
        this.destinationPath('index.html'), {
          title: self.appDesc,
          appName: self.appName
          cssFramework: self.cssFramework
        }
      );
      this.fs.copyTpl(
        this.templatePath('src/app.js'),
        this.destinationPath('src/app.js'), {
          cssFramework: self.cssFramework
        }
      );
    },

    projectFiles: function() {
      this.copy('root/editorconfig', '.editorconfig');
      this.copy('root/jshintrc', '.jshintrc');
      this.copy('root/aurelia.protractor.js', 'aurelia.protractor.js');
      this.copy('root/gulpfile.js', 'gulpfile.js');
      this.copy('root/favicon.ico', 'favicon.ico');
      this.copy('root/config.js', 'config.js');
      this.copy('root/karma.conf.js', 'karma.conf.js');
      this.copy('root/protractor.conf.js', 'protractor.conf.js');
      this.copy('root/LICENSE', 'LICENSE');
      // this.bulkDirectory('root', '.');
    },

    testFiles: function() {
      this.bulkDirectory('test', 'test');
    },

    styleFiles: function() {
      this.bulkDirectory('styles', 'styles');
    },

    docFiles: function() {
      this.bulkDirectory('doc', 'doc');
    },

    srcFiles: function() {
      this.conflicter.force = true;
      this.bulkDirectory('src', 'src');
    },

    viewFiles: function() {
      if (this.cssFramework == 'Bootstrap')
        this.bulkDirectory('views/bootstrap', 'src');
      if (this.cssFramework == 'Foundation')
        this.bulkDirectory('views/foundation', 'src');
      if (this.cssFramework == 'Semantic-UI')
        this.bulkDirectory('views/semantic-ui', 'src');
    },

    buildFiles: function() {
      this.bulkDirectory('build', 'build');
    }
  },

  end: function() {
    if (this.cssFramework == 'Semantic-UI') {
      this.npmInstall(['semantic-ui'], { 'save': true });
    }

    // console.info('ComposingWith aurelia-ts:typescript for: ' + this.cssFramework);
    this.composeWith('aurelia-ts:typescript', {
      options: {
        cssFramework: this.cssFramework,
        githubAccount: this.githubAccount,
        authorName: this.authorName,
        authorEmail: this.authorEmail,
        appDesc: this.appDesc,
        appName: this.appName
      }
    });
  }

});
