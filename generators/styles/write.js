'use strict';
var util = require('./util');
var extend = require('extend');

module.exports = function(gen) {
  return {
    dirs: ['root', 'styles', 'tasks'],
    prepare: function() {
      if (!gen.removeOld) return;
      for (var folder of util.styleFolders) {
        gen.fs.delete(folder);
      }
      gen.fs.delete('styles/styles.css');
    },

    root: function() {
      gen.copy.rootTpl('_Styles.md', 'Styles.md', {stylus: gen.styles.pre.stylus});
    },

    styles: function() {
      // All files are copied as templates as they can be chosen one by one and sass folder contains 2 files
      for (var lang of util.bulkStyles(gen.styleLangs)) {
        var path = util.stylesPath(lang);
        var lcLang = lang.toLowerCase();
        if (lcLang == 'sass' || lcLang == 'scss')
          gen.copy.stylesTemplate('sass/styles.'+lcLang, 'sass/styles.'+lcLang, {});        

        if (lang.toLowerCase() == 'css')
          gen.copy.bulkDir(path);
        
        /*
        if (lang.toLowerCase() == 'scss')
          gen.copy.stylesTemplate('sass/styles.scss', 'sass/styles.scss', {});

        if (lang.toLowerCase() != 'stylus')
          gen.copy.bulkDir(path);
        */
      }
      // stylus
      if (gen.styles.pre.stylus) {
        gen.copy.stylesTemplate('stylus/_styles.styl', 'stylus/styles.styl', gen.stylus.plugins.obj);
      }
    },

    tasks: function() {
      var pre = gen.styles.pre;
      gen.copy.buildTpl('_styles.js', 'styles.js', {
        preProcessors: util.g.prepare4Tpl(gen.preProcessors),
        watchTasks: util.watchTasks(pre),
        styles: gen.styleLangs.join(' and '),
      });
      // sass
      if (pre.sass || pre.scss) {
        gen.copy.buildFile('sass.js');
      }
      // stylus
      if (pre.stylus) {
        var useList = util.useList(gen.stylus.plugins.list)
        gen.copy.buildTpl('_stylus.js', 'stylus.js', extend({useList: useList}, gen.stylus.plugins.obj));
      }
      // jade
      if (gen.useJade) gen.copy.buildFile('jade.js');
    }
  }
}
