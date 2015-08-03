'use strict';

function resolved(names, pkgMap) {
  return names.map(function(name) {
    var resolved = pkgMap[name];
    if (!resolved) {
      resolved = name;
    }
    return resolved;
  });
}

module.exports = function(generator) {
  return {
    packages: function (list) {
      if (!list || list.length == 0) return;
      list.unshift('install');
      generator.spawnCommand('jspm', list);
    },

    resolvedPackages: function(names, pkgMap) {
      this.packages(resolved(names, pkgMap));
    }
  }
}
