'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();
    console.info('cssFramework: '+this.option('cssFramework')+ ' vs '+this.options.cssFramework);

    /* Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the awesome ' + chalk.red('Aurelia TypeScript') + ' generator!'
    ));
    */
    var prompts = [{
      type: 'confirm',
      name: 'typescript',
      message: 'Would you like to enable TypeScript for Aurelia?',
      default: true
    }, {
      type    : 'confirm',
      name    : 'amd',
      message : 'Use Aurelia AMD?',
      default : this.amd,
      when: function(answers) {
        return answers.typescript;
      }
    }];

    this.prompt(prompts, function (answers) {
      this.props = answers;
      // To access props later use this.props.someOption;
      // generator returns in typescript was not selected
      if (answers.typescript == false)
        return;
      else {
        this.conflicter.force = true;
      }

      this.amd = answers.amd;
      done();
    }.bind(this));
  },

  writing: {
    // copy templates for package.json, build/tasks/build.js
    typescript: function () {
      // this.bulkDirectory('root', '.');
      this.fs.copyTpl(
        this.templatePath('root/package.json'),
        this.destinationPath('package.json'), {
          githubAccount: this.options.githubAccount,
          authorName: this.options.authorName,
          authorEmail: this.options.authorEmail,
          appDesc: this.options.appDesc,
          appName: this.options.appName,
          cssFramework: this.options.cssFramework
        }
      );
      this.fs.copyTpl(
        this.templatePath('root/tsconfig.json'),
        this.destinationPath('tsconfig.json'), {
          amd: this.amd
        }
      );
      this.copy('root/build.js', 'build/tasks/build.js');
    },

    // See http://yeoman.github.io/generator/actions.html
    typings: function () {
      this.bulkDirectory('typings', 'typings');
      this.fs.delete('typings/es6-promise');
      this.fs.copyTpl(
        this.templatePath('typings/tsd.d.ts'),
        this.destinationPath('typings/tsd.d.ts'), {
          amd: this.amd
        }
      );
    },

    // TODO remove src/tsconfig.json
    srcFiles: function () {
      this.fs.delete('src/*.js');
      this.bulkDirectory('src', 'src');
      this.fs.copyTpl(
        this.templatePath('src/app.ts'),
        this.destinationPath('src/app.ts'), {
          cssFramework: this.options.cssFramework
        }
      );
    }
/*
    mapFiles: function () {
      if (this.props.maps) {
        this.bulkCopy('maps', 'src');
      }
    }
*/
  }
});
