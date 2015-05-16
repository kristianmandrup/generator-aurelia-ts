'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // TODO: remove!
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the awesome ' + chalk.red('Aurelia TypeScript') + ' generator!'
    ));

    // TODO: remove!
    var prompts = [{
      type: 'confirm',
      name: 'typescript',
      message: 'Would you like to enable TypeScript for Aurelia?',
      default: true
    }, {
      type    : 'confirm',
      name    : 'amd',
      message : 'Use Aurelia AMD?',
      default : this.amd
    }, {
      type    : 'checkbox',
      name    : 'editors',
      message : 'Which editors do you widh to support',
      choices: ['WebStorm', 'Sublime', 'Atom', 'VS 2015'],
      default : ['Sublime', 'Atom']
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;
      if (answers.editors.includes('WebStorm')) {        
        this.props.maps = true;
      }

      done();
    }.bind(this));
  },

  writing: {
    typescript: function () {
      this.bulkCopy('root', '.');
    },

    // See http://yeoman.github.io/generator/actions.html
    typings: function () {
      this.bulkDirectory('typings', 'typings');
    },

    // TODO: improve by using templates ;)
    srcFiles: function () {
      this.bulkDirectory('src', 'src');
    },

    mapFiles: function () {
      if (this.props.maps) {
        this.bulkCopy('maps', 'src');
      }      
    }

  }
});
