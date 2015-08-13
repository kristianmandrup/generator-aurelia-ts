'use strict';
var path = require('path');
module.exports = function(gen) {
  return {
    copyView: function(framework, view) {
      var fileName = view + '.html';
      gen.fs.copy(
        gen.templatePath(path.join('views', framework, fileName)),
        gen.destinationPath(path.join('src', fileName))
      );
    },
    selectedFramework: function(framework) {
      if (framework == 'None') return;
      if (framework.match(/Bootstrap/)) return 'bootstrap';
      return framework.toLowerCase();
    }
  }
}
