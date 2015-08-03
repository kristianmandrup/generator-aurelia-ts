'use strict';

module.exports = function(gen) {
  return {
    dirs: ['root', 'src', 'views'],
    root: function() {
      this.copy.rootTpl('root/_gitignore', '.gitignore', {
        vs: gen.props.visualStudio,
        semanticUI: gen.semanticUI
      });
      this.copy.rootTpl('_README.md', 'README.md', {
        appTitle: self.appTitle,
        appDesc: self.appDesc,
        semanticUI: self.semanticUI
      });
    },
    src: function() {
      var self = this;
      if (!this.selFramework) return;
      var ext = this.util.getJsLangExt();
      this.copy.srcTpl('_ui.js', opts.ui);
      this.copy.srcFile(`app.${ext}`, opts.ui);
    },
    // For primary UI framework chosen
    views: function() {
      if (!this.primary) {
        this.primary = 'Bootstrap';
      }
      this.selFramework = util.selectedFramework(this.primary);
      if (!this.selFramework) return;

      info('Using primary UI framework: ' + this.primary);
      for (let view of ['app', 'nav-bar', 'welcome']) {
        copyView(this.selFramework, view);
      }
    }
  }
}
