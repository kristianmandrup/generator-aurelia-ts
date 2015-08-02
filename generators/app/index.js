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
    // TODO: send options to app decorator
    this.option('ts'); // typescript
    this.option('vs'); // visual studio
    this.option('fa'); // font awesome
    this.option('cli'); // aurelia CLI
    this.option('plugins');
    this.option('sass');
    this.option('stylus');
    // ui framework options
    this.option('ui', {type: 'string'});

  },

  initializing: function() {
    this.props.appName = this.appname ? this.appname.camelize() : null;
    this.props.moduleName = util.normalizeName(this.props.appName);
    this.props.appTitle = util.humanize(this.props.appName);
    this.props.uiFramework = uiFrameworkMap[this.options.ui];
    this.props.styleLang = this.options.stylus || this.options.sass || 'css';
    this.props.vs = this.options.vs;
    this.props.ts = this.options.ts;
    this.props.fa = this.options.fa;
    this.props.plugins = this.options.plugins;

    this.props.githubAccount = this.config.get('githubAccount');

  },

  // TODO: Add prompt for style lang unless passed as argument
  // TODO: Add editor selection prompt
  prompting: function() {
    var done = this.async();

    // info('Create Aurelia Application:');
    this.prompt(prompts, function(answers) {
      this.props.app = {
        name: normalizeName(answers.appName || this.appName);
        title: answers.title,
        desc: answers.appDesc
      };

      this.props.pkg = {};
      for (let name of ['authorName', 'authorEmail', 'githubAccount'])
        this.props.pkg[name] = answers[name];

      this.props.vs = answers.visualStudio || this.props.vs;
      this.props.ie9 = answers.ie9Support;
      this.props.appExt = extend(this.props.app, {ie9: this.ie9Support});

      this.config.save();

      done();
    }.bind(this));
  },

  writing: {
    writer.writeAll();
  },

  install: function() {
    if (this.ie9) {
      install.jspm.packages(['github:polymer/mutationobservers']);
    }
  },

  end: function() {
    this.composeWith('aurelia-ts:decorate', {
      options: {}
    });
  }
});
