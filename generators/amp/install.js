'use strict';
module.exports = function(gen) {
  return {
    all: function(opts) {
      var names = opts.modules;
      var packsToInstall = [];
      var params = names.map(function(name) {
        var fullName = ['ampersand', name].join('-');
        return ['github:ampersandjs', fullName].join('/');
      });
      packsToInstall = packsToInstall.concat(params);
      // gen.install.jspm.packages(params);
      if (opts.humanModel) {
        // gen.install.jspm.packages(['github:HenrikJoreteg/human-model']);
        packsToInstall = packsToInstall.concat(['github:HenrikJoreteg/human-model']);
      }
      gen.install.jspm.packages(packsToInstall);
    }
  }
}
