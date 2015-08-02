'use strict';

module.exports = function(gen) {
  return {
    dirs: ['build', 'doc', 'root', 'styles', 'test'],
    rootFiles: [
      'aureliafile.js',
      'editorconfig',
      'jshintrc',
      'npmignore',
      'aurelia.protractor.js',
      'gulpfile.js',
      'favicon.ico',
      'config.js',
      'jsconfig.json',
      'karma.conf.js',
      'protractor.conf.js',
      'LICENSE'
    ],
    prepare: function() {
    },
    build: function() {
      gen.bulkDirectory('build', 'build');
    },
    doc: function() {
      gen.bulkDirectory('doc', 'docs');
    },
    root: {
      write: function() {
        this.templates();
        this.files();
      },
      templates: function() {
        gen.copy.rootTpl('_README.md', 'README.md', gen.props.app);
        gen.copy.rootTpl('_gitignore','.gitignore', {vs: gen.props.vs});
        gen.copy.rootTpl('_package.json', 'package.json', props.pkg);
        gen.copy.rootTpl('_index.html', 'index.html', gen.props.appExt);
      },
      files: function() {
        for (let file of this.rootFiles)
          gen.copy.rootTpl(file);
      }
    },
    styles: function() {
      gen.bulkDirectory('styles', 'styles');
    },
    test: function() {
      gen.bulkDirectory('test', 'test');
    }
  };
}
