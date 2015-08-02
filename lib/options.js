'use strict';

let util = require('./util');
let uiMap = require('./maps/ui');

module.exports = {
  mapUi: function(ui) {
    return uiMap[ui];
  },
  uiFramework: function (list) {
    var contains = util.containsFor(list);
    return {
      semanticUI: contains('Semantic-UI'),
      framework7: contains('Framework7'),
      foundation: contains('Foundation'),
      bootstrap: contains('Bootstrap'),
      bootstrapMaterial: contains('Bootstrap Material')
    }
  }
}
