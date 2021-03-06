'use strict';
var maps = require('./maps');
var lib = require('../../lib');
var prompts = lib.prompts;

module.exports = function(answers) {
  return {
    allPlugins: Object.keys(maps.jspm),
    listPrompts: ['ui', 'bindings'],
    parse: function() {
      var plugins = {
        obj: this.parseObj()
      };
      plugins.selected = this.selected(plugins.obj);
      return plugins;
    },

    parseObj: function() {
      var keys = this.allPlugins;
      var selectionObj = {};
      for (var key of keys) {
        selectionObj[key] = prompts.value(answers[key], key);
      }
      for (var key of this.listPrompts) {
        prompts.mapListAnswers(selectionObj, answers[key]);
      }
      // console.log(`selectionObj.keys: ${Object.keys(selectionObj)}`);
      return selectionObj;
    },

    selected: function(obj) {
      var keys = Object.keys(obj);
      return keys.filter(function(key) { return obj[key]; });
    }
  }
}
