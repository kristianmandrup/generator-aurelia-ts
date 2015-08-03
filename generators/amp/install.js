'use strict';
module.exports = function(gen) {
  return {
    all: function(opts) {
      let names = opts.modules;
      var params = names.map(function(name) {
        var fullName = ['ampersand', name].join('-');
        return ['github:ampersandjs', fullName].join('/');
      });
      gen.install.jspm.packages(params);
      if (opts.humanModel) {
        gen.install.jspm.packages(['github:HenrikJoreteg/human-model']);
      }
    }
  }
}
