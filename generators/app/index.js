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
    var prompts = [{
      type    : 'input',
      name    : 'title',
      message : 'Your application name',
      default : this.appName // Name
    }, {
      type    : 'input',
      name    : 'title',
      message : 'Your application title',
      default : this.appTitle // Title
    }, , {
      type    : 'list',
      name    : 'style',
      choices: ['None', 'Stylus', 'SCSS'],
      default: 'Stylus'
      message : 'Your CSS preprocessor',      
    }];

    this.prompt(prompts, function (answers) {
      this.props.title = answers.title;
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
  }

  end: function () {
    this.composeWith('aurelia-ts:typescript');
    this.composeWith('aurelia-ts:plugins');
  }
});
