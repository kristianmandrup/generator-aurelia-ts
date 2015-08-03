'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
require('sugar');
var generator;
let extend = require('extend');

let prompts = require('./prompts');
let writeConf = require('./write');

let lib = require('../../lib');
let install = lib.install;
let copy = lib.copy;
let log = lib.log;
let util = lib.util;
let options = lib.options;
let writer = lib.writer;

module.exports = yeoman.generators.Base.extend({
  // note: arguments and options should be defined in the constructor.
  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);

    generator = this;
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
    this.util = util;
    this.props = {app: {}, pkg: {}};
    this.props.app.name = this.appname ? this.appname.camelize() : null;
    this.props.app.moduleName = this.util.normalizeName(this.props.appName);
    this.props.app.title = this.util.humanize(this.props.appName);

    this.props.uiFramework = options.mapUi(this.options.ui)

    this.props.styleLang = this.options.stylus || this.options.sass || 'css';
    this.props.vs = this.options.vs;
    this.props.ts = this.options.ts;
    this.props.fa = this.options.fa;
    this.props.plugins = this.options.plugins;

    this.props.pkg.githubAccount = this.config.get('githubAccount');

    this.copy = copy(this);
    this.writer = writer(writeConf(this));
    this.myPrompts = prompts(this);
  },

  // TODO: Add prompt for style lang unless passed as argument
  // TODO: Add editor selection prompt
  prompting: function() {
    var done = this.async();

    // info('Create Aurelia Application:');
    this.prompt(this.myPrompts.createFor(this), function(answers) {
      let app = this.props.app;
      this.props.app = {
        name: util.normalizeName(answers.appName || app.name),
        title: answers.title || app.title,
        desc: answers.desc || app.desc
      };

      this.props.pkg = {};
      for (let name of ['authorName', 'authorEmail', 'githubAccount'])
        this.props.pkg[name] = answers[name];

      this.props.decorate = answers.decorate;
      this.props.appExt = extend({ie9: answers.ie9}, this.props.app);
      console.log('ext', this.props.appExt);

      this.config.save();

      done();
    }.bind(this));
  },

  writing: function() {
    log.info('Writing app files...')
    generator.conflicter.force = true;
    this.writer.writeAll();
  },

  install: function() {
    if (this.ie9) {
      // install.jspm.packages(['github:polymer/mutationobservers']);
    }
  },

  end: function() {
    if (!this.decorate) return;
    // this.composeWith('aurelia-ts:decorate', {
    //   options: {}
    // });
  }
});
