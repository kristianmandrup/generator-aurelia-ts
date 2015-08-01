'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
require('sugar');
var fs = require('fs');

var defaultUI;

var generator;

function info(msg) {
  console.log(msg);
}

function copyView(framework, view) {
  generator.fs.copy(
    generator.templatePath(`views/${framework}/${view}.html`),
    generator.destinationPath(`src/${view}.html`)
  );
}

function selectedFramework(framework) {
  if (framework == 'None') return;
  if (framework.match(/Bootstrap/)) return 'bootstrap';
  return generator.primary.toLowerCase();
}

var repoKeyMap = {
  'Bootstrap': 'bootstrap',
  'Bootstrap Material': 'bootstrap-material',
  'Foundation': 'foundation',
  'Semantic-UI': 'semantic-ui',
  'Framework7': 'github:nolimits4web/Framework7@master'
}

var uiFrameworkMap = {
  bs: 'Bootstrap',
  zurb: 'Foundation',
  sem: 'Semantic-UI',
  bmat: 'Bootstrap Material',
  f7: 'Framework7'
};

function jspmInstall(names) {
  var params = names.map(function(name) {
    var resolved = jsmpInstallsMap[name];
    if (!resolved) {
      resolved = name;
    }
    return resolved;
  });
  runJspmInstall(params);
}

function runJspmInstall(list) {
  if (!list || list.length ==0) return;
  list.unshift('install');
  generator.spawnCommand('jspm', list);
}

var jsmpInstallsMap = {};

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

    this.option('fa'); // font awesome
    // ui framework options
    this.option('ui', {type: 'string'});

    this.appTitle = this.options.appTitle || 'My App';
    this.appDesc = this.options.appDesc || 'No description...';

    this.props.uiFramework = uiFrameworkMap[this.options.ui];

    this.props.fa = this.options.fa;
  },

  initializing: function() {
  },

  // TODO: Add prompt for style lang unless passed as argument
  // TODO: Add editor selection prompt
  prompting: {
    phase1: function() {
      var done = this.async();

      var prompts = [];

      defaultUI = this.props.uiFramework || 'Bootstrap';

      var uiFrameWorksPrompt = {
        type: 'checkbox',
        name: 'cssFrameworks',
        choices: [
          'Bootstrap',
          'Bootstrap Material',
          'Foundation',
          'Semantic-UI',
          'Framework7'
        ],
        default: [defaultUI],
        message: 'Layout frameworks'
        // if no answers return ['None'];
        when: function(answers) {
          return (!answers || answers.length == 0) ? ['None'] : answers;
        }
      }

      // should not prompt to install
      // if options are passed to force install
      var faPrompt = {
        type: 'confirm',
        name: 'fontAwesome',
        message: 'Font Awesome',
        default: true
      };

      if (!this.props.fa) {
        prompts.push(faPrompt);
      }

      if (!this.props.uiFrameworks) {
        prompts.push(uiFrameWorksPrompt);
      }

      // info('Install UI/Layout Frameworks:');

      this.prompt(prompts, function(answers) {
        this.cssFrameworks = answers.cssFrameworks || [];

        this.fontAwesome = answers.fontAwesome || this.props.fa;
        var contains = containsFor(this.cssFrameworks);

        this.semanticUI = contains('Semantic-UI');
        this.framework7 = contains('Framework7');
        this.foundation = contains('Foundation');
        this.bootstrap = contains('Bootstrap');
        this.bootstrapMaterial = contains('Bootstrap Material');

        // this.config.save();
        done();
      }.bind(this));
    },

    phase2: function() {
      var done = this.async();
      var morePrompts = [{
        type: 'list',
        name: 'primary',
        message: 'Primary layout framework',
        choices: this.cssFrameworks,
        default: [defaultUI]
      }];

      this.prompt(morePrompts, function(answers) {
        this.primary = answers.primary;
        if (this.primary == 'None') {
          this.cssFrameworks = [];
        }
        // this.config.save();
        done();
      }.bind(this));
    }
  },

  writing: {
    // For now only use one Framework as the baseline!
    viewFiles: function() {
      if (!this.primary) {
        this.primary = 'Bootstrap';
      }
      this.selFramework = selectedFramework(this.primary);

      if (!this.selFramework) return;
      info('Using primary UI framework: ' + this.primary);
      for (let view of ['app', 'nav-bar', 'welcome']) {
        copyView(this.selFramework, view);
      }
    },

    app: function() {
      var self = this;

      if (!this.selFramework) return;

      if (fs.existsSync('src/app.js')) {
        self.fs.copyTpl(
          self.templatePath('src/app.js'),
          self.destinationPath('src/app.js'), {
            semanticUI: self.semanticUI,
            bootstrap: self.bootstrap,
            foundation: self.foundation,
            framework7: self.framework7,
            bootstrapMaterial: self.bootstrapMaterial
          }
        );
      }

      if (fs.existsSync('src/app.ts')) {
        self.fs.copyTpl(
          self.templatePath('src/app.ts'),
          self.destinationPath('src/app.ts'), {
            semanticUI: self.semanticUI,
            bootstrap: self.bootstrap,
            foundation: self.foundation,
            framework7: self.framework7,
            bootstrapMaterial: self.bootstrapMaterial
          }
        );
      }

      this.fs.copyTpl(
        this.templatePath('root/_gitignore'),
        this.destinationPath('.gitignore'), {
          visualStudio: self.visualStudio,
          semanticUI: self.semanticUI
        }
      );

      this.fs.copyTpl(
        this.templatePath('root/_README.md'),
        this.destinationPath('README.md'), {
          appTitle: self.appTitle,
          appDesc: self.appDesc,
          semanticUI: self.semanticUI
        }
      );
    }
  },

  install: function() {
    if (this.fontAwesome) {
      info("Installing Font Awesome :)");
      jspmInstall(['font-awesome']);
    }
    if (!this.selFramework) return;
    info("Installing Layout frameworks...");
    var repoKeys = this.cssFrameworks.map(function(label) {
      info(label);
      return repoKeyMap[label];
    });
    jspmInstall(repoKeys);
  },

  end: function() {
    if (!this.selFramework) return;
    info("Installed:" + this.cssFrameworks.join(' '));
  }
});
