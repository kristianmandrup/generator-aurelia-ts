'use strict';

module.exports = function(gen) {
  var util = require('./util')(gen);

  return {
    dirs: ['docs', 'root', 'src', 'views'],
    docs: function() {
      gen.copy.docsTpl('_Layout.md', {
        ui: gen.props.ui.obj
      });
    },
    root: function() {
      gen.copy.rootTpl('_gitignore', {
        vs: gen.props.vs,
        ui: gen.props.ui.obj
      });
    },
    src: function() {
      if (!gen.selFramework) return;
      var ext = gen.util.getJsLangExt();
      var ui = {ui: gen.props.ui.obj};
      gen.copy.srcTpl('_ui.js', ui);
      gen.copy.srcFile('app.' + ext, ui);
    },
    // For primary UI framework chosen
    views: function() {
      var ui = gen.props.ui;
      if (!ui.selected) return;
      for (var view of ['app', 'nav-bar', 'welcome']) {
        util.copyView(ui.selected, view);
      }
    }
  }
}
