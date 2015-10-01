'use strict';

function installCairo(opts) {
  if (opts.linux) {
    gen.spawnCommand('wget', ['https://raw.githubusercontent.com/LearnBoost/node-canvas/master/install -O - | sh']);
  }
  if (opts.macOSX) {
    gen.spawnCommand('brew', ['install', 'cairo']);
  }
}

function npmMap(name) {
  if (name.match(/prefixer/)) return 'autoprefixer-stylus'
  return name.toLowerCase();
}

module.exports = function (gen) {
  var install = gen.install;
  return {
    jade: function() {
      install.npmDev('gulp-jade');
    },
    sass: function() {
      install.npmDev('gulp-concat');
      install.npmDev('gulp-sass');
    },
    stylus: function() {
      install.npmDev('gulp-stylus');
      var list = gen.stylus.plugins.list;
      for (var addon of list) {
        var npmAddon = npmMap(addon);
        install.npmDev(npmAddon);
        if (npmAddon.match(/fluidity/) != null)
          install.npmDev('stylus');
      }
    },
    installCairo: installCairo,
    nib: function(opts) {
      if (opts.cairo) installCairo(opts);
      install.npmDev('canvas');
    }
  };
}
