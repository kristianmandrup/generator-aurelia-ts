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
  return name;
}

module.exports = function (gen) {
  let install = gen.install;
  return {
    jade: function() {
      install.npmDev('gulp-jade');
    },
    sass: function() {
      install.npmDev('gulp-sass');
    },
    stylus: function() {
      install.npmDev('gulp-stylus');
      let list = gen.stylus.plugins.list;
      for (let addon of list) {
        install.npmDev(npmMap(addon));
      }
    },
    installCairo: installCairo,
    nib: function(opts) {
      if (opts.cairo) installCairo(opts);
      install.npmDev('canvas');
    }
  };
}
