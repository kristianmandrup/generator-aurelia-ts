'use strict';
let util = require('./util');
let extend = require('extend');

module.exports = function(gen) {
  return {
    dirs: ['root', 'styles', 'tasks'],
    prepare: function() {
      if (!gen.removeOld) return;
      for (let folder of util.styleFolders) {
        gen.fs.delete(folder);
      }
      gen.fs.delete('styles/styles.css');
    },
    root: function() {
      gen.copy.rootTpl('_Styles.md', 'Styles.md', {stylus: gen.styles.pre.stylus});
    },
    styles: function() {
      // since styles for Stylus is a template, we want to remove it from bulk directory copy
      for (let lang of util.bulkStyles(gen.styleLangs)) {
        var path = util.stylesPath(lang);
        gen.copy.bulkDir(path);
      }
      // stylus
      gen.copy.stylesTemplate('stylus/_styles.styl', 'stylus/styles.styl', gen.stylus.plugins.obj);
    },
    tasks: function() {
      let pre = gen.styles.pre;
      gen.copy.buildTpl('_styles.js', 'styles.js', {
        preProcessors: util.g.prepare4Tpl(gen.preProcessors),
        watchTasks: util.watchTasks(pre),
        styles: gen.styleLangs.join(' and '),
      });
      // sass
      if (pre.sass) {
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
