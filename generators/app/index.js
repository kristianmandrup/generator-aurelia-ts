'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
require('sugar');

var generator;

var uiFrameworkMap = {
  bs: 'Bootstrap',
  zurb: 'Foundation',
  sem: 'Semantic-UI',
  f7: 'Framework7'
};


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

    this.option('ts'); // typescript
    this.option('vs'); // visual studio
    this.option('fa'); // font awesome
    this.option('cli'); // aurelia CLI
    this.option('plugins');

    // ui framework options
    this.option('ui', {type: 'string'});

    this.props.uiFramework = uiFrameworkMap[this.options.ui];

    this.option('sass');
    this.option('stylus');
    this.props.styleLang = this.options.stylus || this.options.sass || 'css';

    this.props.vs = this.options.vs;
    this.props.ts = this.options.ts;
    this.props.fa = this.options.fa;
    this.props.plugins = this.options.plugins;

    this.props.githubAccount = this.config.get('githubAccount');
  },

  initializing: function() {
  },

  // TODO: Add prompt for style lang unless passed as argument
  // TODO: Add editor selection prompt
  prompting: function() {
    var done = this.async();

    var prompts = [{
      type: 'input',
      name: 'appName',
      message: 'application (module) name',
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
    }];

    // info('Create Aurelia Application:');
    this.prompt(prompts, function(answers) {
      this.title = answers.title;
      this.appName = normalizeName(answers.appName || this.appName);
      this.appDesc = answers.title;

      this.authorName = answers.authorName;
      this.authorEmail = answers.authorEmail;
      this.githubAccount = answers.githubAccount;

      this.visualStudio = answers.visualStudio || this.props.vs;
      this.ie9Support = answers.ie9Support;

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
          foundation: self.foundation
        }
      );

      this.fs.copyTpl(
        this.templatePath('_index.html'),
        this.destinationPath('index.html'), {
          title: self.appDesc,
          appName: self.appName,
          ie9: this.ie9Support
        }
      );

      this.fs.copy(
        this.templatePath('aureliafile.js'),
        this.destinationPath('aureliafile.js')
      );

      this.fs.copyTpl(
        this.templatePath('src/app.js'),
        this.destinationPath('src/app.js'), {
        }
      );

      this.fs.copyTpl(
        this.templatePath('root/_gitignore'),
        this.destinationPath('.gitignore'), {
          visualStudio: self.visualStudio
        }
      );

      this.fs.copyTpl(
        this.templatePath('root/_README.md'),
        this.destinationPath('README.md'), {
          appTitle: self.appTitle,
          appDesc: self.appDesc
        }
      );
    },

    projectFiles: function() {
      this.copy('root/editorconfig', '.editorconfig');
      this.copy('root/jshintrc', '.jshintrc');
      this.copy('root/npmignore', '.npmignore');
      this.copy('root/aurelia.protractor.js', 'aurelia.protractor.js');
      this.copy('root/gulpfile.js', 'gulpfile.js');
      this.copy('root/favicon.ico', 'favicon.ico');
      this.copy('root/config.js', 'config.js');
      this.copy('root/jsconfig.json', 'jsconfig.json');
      this.copy('root/karma.conf.js', 'karma.conf.js');
      this.copy('root/protractor.conf.js', 'protractor.conf.js');
      this.copy('root/LICENSE', 'LICENSE');
      // this.bulkDirectory('root', '.');
    },

    styleFiles: function() {
      this.bulkDirectory('styles', 'styles');
    },

    testFiles: function() {
      this.bulkDirectory('test', 'test');
    },

    docFiles: function() {
      this.bulkDirectory('doc', 'doc');
    },

    srcFiles: function() {
      this.conflicter.force = true;
      this.bulkDirectory('src/bone', 'src');
    },

    buildFiles: function() {
      this.bulkDirectory('build', 'build');
    }
  },

  install: function() {
    if (this.ie9Support) {
      runJspmInstall(['github:polymer/mutationobservers']);
    }
  },

  end: function() {
    this.composeWith('aurelia-ts:decorate', {
      options: {}
    });
  }
});
