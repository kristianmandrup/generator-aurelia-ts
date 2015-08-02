'use strict';

let util = require('./util');
let uiMap = require('./maps/ui');

module.exports = {
  mapUi: function(ui) {
    return uiMap[ui];
  },
  uiFramework: function (options) {
    var contains = util.containsFor(options.cssFrameworks);
    return {
      semanticUI: contains('Semantic-UI'),
      framework7: contains('Framework7'),
      foundation: contains('Foundation'),
      bootstrap: contains('Bootstrap'),
      bootstrapMaterial: contains('Bootstrap Material')
    }
  }
}
