let lib = require('../../lib');
let jspm = lib.jspm;

module.exports = {
  install: function(names) {
    var params = names.map(function(name) {
      var fullName = ['ampersand', name].join('-');
      return ['github:ampersandjs', fullName].join('/');
    });
    jspm.packages(params);
  }
}
