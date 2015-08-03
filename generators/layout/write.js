'use strict';
let util = require('./util');

module.exports = function(gen) {
  function copyView(framework, view) {
    gen.fs.copy(
      gen.templatePath(`views/${framework}/${view}.html`),
      gen.destinationPath(`src/${view}.html`)
    );
  }

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
      let ui = {ui: gen.props.ui.obj};
      gen.copy.srcTpl('_ui.js', ui);
      gen.copy.srcFile(`app.${ext}`, ui);
    },
    // For primary UI framework chosen
    views: function() {
      let ui = gen.props.ui;
      if (!ui.selected) return;
      for (let view of ['app', 'nav-bar', 'welcome']) {
        copyView(ui.selected, view);
      }
    }
  }
}
