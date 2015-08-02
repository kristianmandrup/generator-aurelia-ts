'use strict';

module.exports = function(generator) {
  return {
    allDeps: function() {
      generator.npmInstall();
      generator.spawnCommand('jspm', ['install']);
    },
    npm: function(name) {
      generator.npmInstall(name);
    },
    npmDev: function(name) {
      generator.npmInstall(name, {saveDev: true});
    },
    npmGlobal: function(name) {
      generator.npmInstall(name, {global: true});
    },
    jspm: require('./jspm')
  }
}
