'use strict';
var maps = require('./maps');
var lib = require('../../lib');
var log = lib.log;

function repoKeys(frameworks) {
  return frameworks.map(function(label) {
    return maps.repos[label]
  });
}

function jspms(obj) {
  return Object.keys(obj).map(function(key) {
    var val = obj[key];
    return [key, '=', val].join('');
  })
}

function extras(frameworks) {
  return frameworks.map(function(label) {
    var xtras = maps.extras[label];
    return xtras ? jspms(xtras) : undefined;
  }).compact();
}

module.exports = function(gen) {
  return {
    all: function(opts) {
      var jspmPacksToInstall = [];
      if (opts.fontAwesome) {
        log.info("Installing Font Awesome :)");
        // gen.install.jspm.packages(['font-awesome']);
        jspmPacksToInstall.push('font-awesome');
      }

      var frameworks = opts.cssFrameworks;
      // this.selectedFramework
      if (!opts.ui.selected) return;
      log.info('Installing UI frameworks:' + frameworks.join(', '));
      // gen.install.jspm.packages(repoKeys(frameworks));
      jspmPacksToInstall = jspmPacksToInstall.concat(repoKeys(frameworks));
      // install extras for certain UI frameworks
      var xtras = extras(frameworks);
      log.info('Installing Xtras:');
      // gen.install.jspm.packages(xtras);
      jspmPacksToInstall = jspmPacksToInstall.concat(extras(frameworks));

      gen.install.jspm.packages(jspmPacksToInstall);
    }
  }
}
