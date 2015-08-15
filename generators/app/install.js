'use strict';
var deps = require('./dependencies');
// var log = lib.log;

module.exports = function(gen) {
  return {
    all: function(opts) {
      var jspmPacksToInstall = deps.npm;
      gen.install.jspm.packages(jspmPacksToInstall);
    }
  }
}
