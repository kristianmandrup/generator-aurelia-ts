require('sugar');

Array.prototype.hasEntry = function(obj) {
  return this.indexOf(obj) >= 0;
}

module.exports = {
  containsFor: function(list) {
    return function contains(value) {
      return list.indexOf(value) >= 0;
    }
  },
  humanize: function(name) {
    if (typeof name !== 'string') return '';
    return name.humanize();
  },
  normalizeName: function(name) {
    if (typeof name !== 'string') return '';
    return name.replace(/ /,'-').toLowerCase();
  },
  prepare4Tpl: function(list) {
    return list.map(function(item) {
      return "'" + item + "'";
    });
  },
  isEmpty: function(list) {
    return (!list || list.length < 1);
  },
  function normalizeFolder(lang) {
    return lang.toLowerCase();
  }
}
