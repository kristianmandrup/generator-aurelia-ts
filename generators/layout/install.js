'use strict';
let maps = require('./maps');
let lib = require('../../lib');
let log = lib.log;
let install = lib.install;

function repoKeys(selected) {
  return selected.map(label => maps.repos[label])
}

// foundation
// "fastclick": "npm:fastclick@^1.0.6",
// "modernizr": "github:Modernizr/Modernizr@^2.8.3",
// "pace": "github:HubSpot/pace",

module.exports = function(gen) {
  return {
    all: function(opts) {
      if (opts.fontAwesome) {
        log.info("Installing Font Awesome :)");
        install.jspm.packages(['font-awesome']);
      }
      if (!opts.ui.selected) return;

      log.info("Installing UI frameworks...");
      install.jspm.packages(repoKeys(this.selectedFramework));
    }
  }
}
