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
        semanticUI: gen.semanticUI
      });
    },
    root: function() {
      gen.copy.rootTpl('_gitignore', {
        vs: gen.props.visualStudio,
        semanticUI: gen.semanticUI
      });
    },
    src: function() {
      if (!gen.selFramework) return;
      var ext = gen.util.getJsLangExt();
      gen.copy.srcTpl('_ui.js', opts.ui);
      gen.copy.srcFile(`app.${ext}`, opts.ui);
    },
    // For primary UI framework chosen
    views: function() {
      if (!gen.primary) {
        gen.primary = 'Bootstrap';
      }
      gen.selFramework = gen.myUtil.selectedFramework(gen.primary);
      if (!gen.selFramework) return;
      for (let view of ['app', 'nav-bar', 'welcome']) {
        copyView(gen.selFramework, view);
      }
    }
  }
}
