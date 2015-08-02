module.exports = {
  root: function() {
    this.fs.copyTpl(
      this.templatePath('root/_gitignore'),
      this.destinationPath('.gitignore'), {
        visualStudio: self.visualStudio,
        semanticUI: self.semanticUI
      }
    );

    this.fs.copyTpl(
      this.templatePath('root/_README.md'),
      this.destinationPath('README.md'), {
        appTitle: self.appTitle,
        appDesc: self.appDesc,
        semanticUI: self.semanticUI
      }
    );
  },
  src: function() {
    var self = this;
    if (!this.selFramework) return;
    var ext = this.util.getJsLangExt();
    this.copy.srcTpl(`app.${ext}`, opts.ui);
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
  },
}
