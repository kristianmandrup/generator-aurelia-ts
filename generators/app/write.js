'use strict';

module.exports = function(gen) {
  return {
    dirs: ['build', 'doc', 'root', 'styles', 'test'],
    prepare: function() {
    },
    build: function() {
      gen.copy.bulkDir('build');
    },
    doc: function() {
      gen.copy.bulkDir('doc', 'docs');
    },
    root: function() {
      var props = gen.props;
      gen.copy.rootTpl('_README.md', 'README.md', props.app);
      gen.copy.rootTpl('_gitignore','.gitignore', {vs: props.vs});
      gen.copy.rootTpl('_package.json', 'package.json', {
        app: props.app,
        pkg: props.pkg
      });
      gen.copy.rootTpl('_index.html', 'index.html', props.appExt);
      // Are all of them just files and no templates?
      for (var file of rootFiles) {
        if ((file == 'editorconfig') || (file == 'jshintrc'))
          gen.copy.rootFile(file, '.'+file);
        else
          gen.copy.rootFile(file);
      }

    },
    /*
    styles: function() {
      gen.copy.bulkDir('styles');
    },
    */
    test: function() {
      gen.copy.bulkDir('test');
    }
  };
}

var rootFiles = [
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
];
