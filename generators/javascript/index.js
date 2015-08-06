'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
require('sugar');
var fs = require('node-fs-extra');
var generator;
let lib = require('../../lib');

module.exports = yeoman.generators.Base.extend({
  // note: arguments and options should be defined in the constructor.
  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);
  },

  initializing: function() {
    generator = this;
    this.copy = lib.copy(this)
  },

  writing: {
    removeTs: function() {
      this.fs.delete('src/*.ts');
    },
    app: function() {
    },
    srcFiles: function() {
      this.conflicter.force = true;
      this.copy.bulkDir('src');
    }
  },
  end: function() {
  }
});
