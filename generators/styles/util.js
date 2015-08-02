let lib = function(file) {
  return require(`../../lib/${file}`);
}
let util = lib('util');

module.exports = function(gen) {
  styleFolders: ['css', 'stylus', 'sass'],
  bulkStyles: function(styleLangs) {
    let stylusIdx = styleLangs.indexOf('Stylus');
    var bulkStyles = styleLangs.slice(0);

    if (stylusIdx >= 0)
      bulkStyles.splice(stylusIdx, 1);
    return bulkStyles;
  },

  watchTasks: function(pre) {
    var watchTasks = [];
    if (pre.sass) {
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
    for (let name of plugins) {
      list.push(name.toLowerCase());
    }
    return list.map(function(plugin) {
      return plugin + '()';
    }).join(', ');
  },
  stylesPath: function(folder) {
    return ['styles', util.normalizeFolder(folder)].join('/');
  },
  mapToList: function(mapObj) {
    let list = [];
    for (key in mapObj) {
      list.push(key);
    }
    return list;
  },
  styles: function(styles) {
    var contains = util.containsFor(styles);
    return {
      css: contains('None'),
      pre: {
        sass: contains('SASS'),
        stylus: contains('Stylus')
      }
    }
  },
  addOns: function(plugins) {
    var contains = util.containsFor(plugins);
    return {
      nib: contains('Nib'),
      axis: contains('Axis'),
      fluidity: contains('Fluidity'),
      jeet: contains('Jeet'),
      rupture: contains('Rupture'),
      autoprefixer: contains('Autoprefixer')
    };
  }
}
