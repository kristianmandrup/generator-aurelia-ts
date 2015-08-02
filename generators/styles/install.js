let lib = function(file) {
  return require(`../../lib/${file}`);
}
let install = lib('install');

function installCairo(opts) {
  if (opts.linux) {
    gen.spawnCommand('wget', ['https://raw.githubusercontent.com/LearnBoost/node-canvas/master/install -O - | sh']);
  }
  if (opts.macOSX) {
    gen.spawnCommand('brew', ['install', 'cairo']);
  }
}

module.exports = function (gen) {
  return {
    jade: function() {
      install.npmDev('gulp-jade');
    },
    sass: function() {
      install.npmDev('gulp-sass');
    },
    stylus: function() {
      install.npmDev('gulp-stylus');
      for (let addon of this.addonsList) {
        install.npmDev(addon);
      }
    },
    installCairo: installCairo,
    nib: function(opts) {
      if (opts.cairo) installCairo(opts);
      install.npmDev('canvas');
    }
  };
}
