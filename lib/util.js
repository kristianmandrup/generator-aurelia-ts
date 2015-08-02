module.exports = {
  containsFor: function(list) {
    return function contains(value) {
      return list.indexOf(value) >= 0;
    }
  },
  normalizeName: function(name) {
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
