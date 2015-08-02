'use strict';
var maps = require('./maps');

module.exports = function(answers) {
  return {
    parse: function() {
      let plugins = {
        obj: this.parseObj()
      };
      plugins.selected = this.selected(plugins.obj);
      return plugins;
    },
    parseObj: function() {
      let keys = Object.keys(answers);
      let sel = {};
      for (let key of keys) {
        var answer = answers[key];

        if (typeof answer === 'boolean') {
          sel[key] = answer ? key : false;
        } else {
          // Assume Array
          for (let choice of answer) {
            var name = maps.names[choice] || choice.toLowerCase();
            sel[name] = name;
          }
        }
      }
      return sel;
    },
    selected: function(obj) {
      let keys = Object.keys(obj);
      return keys.filter(function(key) { return obj[key]; });
    }
  }
}
