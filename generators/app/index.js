'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
require('sugar');

var generator;

function info(msg) {
  console.log(msg);
}

function command(msg) {
  console.log('  $ ' + msg);
}

var uiFrameworkMap = {
  bs: 'Bootstrap',
  zurb: 'Foundation',
  sem: 'Semantic-UI',
  f7: 'Framework7'
};

function runJspmInstall(list) {
  if (!list || list.length ==0) return;
  var args = list.unshift('install');
  generator.spawnCommand('jspm', args);
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
    }, {
      type: 'confirm',
      name: 'installStyles',
      message: 'Install Styles',
      default: true
    }, {
      type: 'confirm',
      name: 'installCLI',
      message: 'Install Aurelia CLI',
      default: true
    }, {
      type: 'confirm',
      name: 'ie9Support',
      message: 'Support IE9',
      default: true
    }];

    var pluginsPrompt ={
      type: 'confirm',
      name: 'installPlugins',
      message: 'Install Aurelia Plugins',
      default: false
    };

    // should not prompt to install
    // if options are passed to force install
    var typeScriptPrompt = {
      type: 'confirm',
      name: 'installTypeScript',
      message: 'Install TypeScript',
      default: false
    };

    var vsPrompt = {
      type: 'confirm',
      name: 'visualStudio',
      message: 'Visual Studio',
      default: false
    };

    var layoutPrompt = {
      type: 'confirm',
      name: 'installLayout',
      message: 'Install UI Frameworks',
      default: true
    };

    if (!this.props.vs) {
      prompts.push(vsPrompt);
    }

    if (!this.props.plugins) {
      prompts.push(pluginsPrompt);
    }

    if (!this.props.ts) {
      prompts.push(typeScriptPrompt);
    }

    if (!this.props.uiFramework) {
      prompts.push(layoutPrompt);
    }

    // info('Create Aurelia Application:');
    this.prompt(prompts, function(answers) {
      this.title = answers.title;
      this.appName = answers.appName || this.appName;
      this.appDesc = answers.title;

      this.authorName = answers.authorName;
      this.authorEmail = answers.authorEmail;
      this.githubAccount = answers.githubAccount;

      this.installStyles = answers.installStyles;
      this.installLayout = answers.installLayout || this.props.uiFramework;
      this.installCLI = answers.installCLI || this.props.cli;
      this.installPlugins = answers.installPlugins || this.props.plugins;
      this.installTypeScript = answers.installTypeScript || this.props.ts;

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
      this.bulkDirectory('src', 'src');
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
    if (this.installStyles) {
      this.composeWith('aurelia-ts:styles', {
        options: {
          styleLang: this.props.styleLang,
          sass: this.options.sass,
          stylus: this.options.stylus
        }
      });
    }

    if (this.installTypeScript) {
      this.composeWith('aurelia-ts:typescript', {
        options: {
          cssFrameworks: this.cssFrameworks,
          githubAccount: this.githubAccount,
          authorName: this.authorName,
          authorEmail: this.authorEmail,
          appDesc: this.appDesc,
          appName: this.appName
        }
      });
    }

    if (this.installLayout) {
      this.composeWith('aurelia-ts:layout', {
        options: {
          ui: this.options.ui,
          fa: this.options.fa
        }
      });
    }

    if (this.installPlugins) {
      this.composeWith('aurelia-ts:plugins', {
        options: {
          bootstrap: this.bootstrap
        }
      });
    }

    if (this.installCLI) {
      this.composeWith('aurelia-ts:cli', {
        options: {}
      });
    }

    this.composeWith('aurelia-ts:state', {
      options: {}
    });
  }
});
