'use strict';
var lib = require('../../lib');
var util = lib.util;

module.exports = {
  g: util,
  styleFolders: ['css', 'styl', 'scss', 'sass'],
  bulkStyles: function(styleLangs) {
    var stylusIdx = styleLangs.indexOf('Stylus');
    var bulkStyles = styleLangs.slice(0);

    if (stylusIdx >= 0)
      bulkStyles.splice(stylusIdx, 1);
    return bulkStyles;
  },

  watchTasks: function(pre) {
    var watchTasks = [];
    if (pre.sass || pre.scss) {
      watchTasks.push('sass:watch');
    }

    if (pre.stylus) {
      watchTasks.push('stylus:watch');
    }
    return util.prepare4Tpl(watchTasks);
  },

  useList: function(plugins) {
    var list = [];
    // autoprefixer should be last
    for (var name of plugins) {
      list.push(name.toLowerCase());
    }
    return list.map(function(plugin) {
      return plugin + '()';
    }).join(', ');
  },
  stylesPath: function(folder) {
    var normalizeFolder = util.normalizeFolder(folder);normalizeFolder
    return ['styles', normalizeFolder].join('/');
  },
  mapToList: function(mapObj) {
    var list = [];
    for (var key in mapObj) {
      if (mapObj[key] == true) list.push(key);
    }
    return list;
  },
  styles: function(styles) {
    var contains = util.containsFor(styles);
    return {
      css: contains('None'),
      pre: {
        scss: contains('SCSS'),
        sass: contains('SASS'),
        stylus: contains('Stylus')
      }
    }
  },
  addOns: function(plugins) {
    var contains = util.containsFor(plugins);
    // TODO: refactor to avoid duplication pattern!
    return {
      nib: contains('Nib'),
      axis: contains('Axis'),
      fluidity: contains('Fluidity'),
      jeet: contains('Jeet'),
      rupture: contains('Rupture'),
      typographic: contains('Typographic'),
      autoprefixer: contains('Autoprefixer')
    };
  }
}
