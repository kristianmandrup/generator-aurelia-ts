let maps = require('./maps');
let lib = require('../../lib');
let log = lib.log;
let install = lib.install;

function repoKeys(selected) {
  return selected.map(label => maps.repos[label])
}

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
