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

function command(msg) {
  console.log('  $ ' + msg);
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

function spawn(params) {
  generator.spawnCommand('jspm', params);
}

function jspmInstall(names) {
  var params = names.map(function(name) {
    var resolved = jsmpInstallsMap[name];
    if (!resolved) {
      resolved = name;
    }
    return resolved;
  });
  for (let name of params) {
    chalk.blue(name);
  }

  params.unshift('install');
  if (params) {
    // var done = generator.async();
    spawn(params);
    // done();
  }
}

var jsmpInstallsMap = {};

module.exports = yeoman.generators.Base.extend({

  // note: arguments and options should be defined in the constructor.
  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);

    generator = this;
    this.props = {};

    this.option('fa'); // font awesome
    // ui framework options
    this.option('ui', {type: 'string'});

    this.props.uiFramework = uiFrameworkMap[this.options.ui];

    this.props.fa = this.options.fa;
  },

  initializing: function() {
  },

  // TODO: Add prompt for style lang unless passed as argument
  // TODO: Add editor selection prompt
  prompting: function() {
    var done = this.async();

    var prompts = [];

    defaultUI = this.props.uiFramework || 'Bootstrap';

    var uiFrameWorksPrompt = {
      type: 'checkbox',
      name: 'style',
      choices: [
        'Bootstrap',
        'Bootstrap Material',
        'Foundation',
        'Semantic-UI',
        'Framework7'
      ],
      default: [defaultUI],
      message: 'Layout frameworks'
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
      this.cssFrameworks = answers.style;
      this.fontAwesome = answers.fontAwesome || this.props.fa;

      this.semanticUI = this.cssFrameworks.indexOf('Semantic-UI');
      this.framework7 = this.cssFrameworks.indexOf('Framework7');
      this.foundation = this.cssFrameworks.indexOf('Foundation');
      this.bootstrap = this.cssFrameworks.indexOf('Bootstrap');
      this.bootstrapMaterial = this.cssFrameworks.indexOf('Bootstrap Material');

      // this.config.save();

      done();
    }.bind(this));
  },

  default: function() {
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

      // this.config.save();

      done();
    }.bind(this));
  },

  writing: {
    app: function() {
      var self = this;

      fs.exists('src/app.js', function(exists) {
        if (exists) {
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
      });

      fs.exists('src/app.ts', function(exists) {
        if (exists) {
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
      });

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
    },

    // For now only use one Framework as the baseline!
    viewFiles: function() {
      if (!this.primary) {
        this.primary = 'Bootstrap';
      }

      info('Using primary UI framework: ' + this.primary);

      // default if no primary chosen
      if (this.primary.match(/Bootstrap/)) {
        this.bulkDirectory('views/bootstrap', 'src');
      }
      // TODO Bootstrap Material?

      if (this.primary == 'Foundation') {
        this.bulkDirectory('views/foundation', 'src');
      }

      if (this.primary == 'Semantic-UI') {
        this.bulkDirectory('views/semantic-ui', 'src');
      }

      if (this.primary == 'Framework7') {
        this.bulkDirectory('views/framework7', 'src');
      }
    }
  },

  install: function() {
    if (this.fontAwesome) {
      info("Installing Font Awesome :)");
      jspmInstall(['font-awesome']);
    }

    info("Installing Layout frameworks...");
    var repoKeys = this.cssFrameworks.map(function(label) {
      info(label);
      return repoKeyMap[label];
    });
    jspmInstall(repoKeys);
  },

  end: function() {
    info("Installed:" + this.cssFrameworks.join(' '));
  }
});
