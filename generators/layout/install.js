'use strict';
let maps = require('./maps');
let lib = require('../../lib');
let log = lib.log;

function repoKeys(selected) {
  return selected.map(function(label) {
    return maps.repos[label]
  });
}

// TODO
// foundation
// "fastclick": "npm:fastclick@^1.0.6",
// "modernizr": "github:Modernizr/Modernizr@^2.8.3",
// "pace": "github:HubSpot/pace",

module.exports = function(gen) {
  return {
    all: function(opts) {
      if (opts.fontAwesome) {
        log.info("Installing Font Awesome :)");
        gen.install.jspm.packages(['font-awesome']);
      }
      // this.selectedFramework
      if (!opts.ui.selected) return;
      log.info("Installing UI frameworks...");
      gen.install.jspm.packages(repoKeys(this.selectedFramework));
    }
  }
}
