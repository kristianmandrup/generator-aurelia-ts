
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

module.exports = {
  onready: function(generator) {
    this.npmInstallCalls = [];
    this.spawnCommandCalls = [];

    generator.npmInstall = function() {
      this.npmInstallCalls.push(arguments);
    }.bind(this);

    generator.spawnCommand = function() {
      this.spawnCommandCalls.push(arguments);
    }.bind(this);
  },

  runGenerator: function(generatorName, theOpts, thePrompts) {
    return helpers.run(path.join(__dirname, '../../generators/'+generatorName))
      .withOptions(theOpts)
      .withPrompts(thePrompts)
  }
}
