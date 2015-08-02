let util = require('./util');

module.exports = function(gen) {
  return {
    dirs: ['files', 'tasks'],
    prepare: function() {
      if (!gen.removeOld) return;
      for (let folder of util.styleFolders) {
        gen.fs.delete(folder);
      }
      gen.fs.delete('styles/styles.css');
    },
    styles: {
      write: function() {
        this.nonStylus();
        this.stylus();
      },
      // since styles for Stylus is a template, we want to remove it from bulk directory copy
      nonStylus: function() {
        for (let lang of util.bulkStyles(gen.styleLangs)) {
          var path = util.stylesPath(lang);
          gen.bulkDirectory(path, path);
        }
      },
      stylus: function() {
        gen.copy.stylesTemplate('stylus/_styles.styl', 'stylus/styles.styl', gen.addons);
      }
    }
    root: {
      write: function() {
        gen.fs.copy.rootTpl('_Styles.md', 'Styles.md', {stylus: gen.styles.pre.stylus});
      }
    },
    tasks: {
      write: function() {
        for (let dir of ['styles', 'sass', 'stylus', 'jade'])
          this[dir]();
      },
      styles: function() {
        gen.copy.buildTemplate('_styles.js', 'styles.js'), {
            preProcessors: util.prepare4Tpl(gen.preProcessors),
            watchTasks: util.watchTasks(gen.styles.pre),
            styles: gen.styleLangs.join(' and '),
          }
        );
      },
      sass: function() {
        if (!gen.styles.pre.sass) return;
        gen.fs.copy.buildFile('sass.js');
      },
      stylus: function() {
        if (!gen.styles.pre.stylus) return;
        var useList = util.useList(gen.stylus.plugins.list)
        gen.copy.buildTemplate('_stylus.js', 'stylus.js',
          // TODO: replace with Object.assign
          extend(gen.addons, {useList: useList})
        );
      },
      jade: function() {
        if (gen.useJade) gen.copy.buildFile('jade.js');
      }
    }
  }
}
