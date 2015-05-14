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
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

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
    }
  }
});
