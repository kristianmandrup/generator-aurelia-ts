'use strict';

module.exports = function(gen) {
  return {
    // test if project contains an app.ts file. If so assume we are using TypeScript!
    getJsLangExt: function() {
      var appTs = gen.destinationPath('src/app.ts');
      return fs.existsSync(appTs) ? 'ts' : 'js';
    },
    isTypeScript: function() {
      this.getJsLangExt() === 'ts';
    },
    isJavaScript: function() {
      this.getJsLangExt() === 'js';
    }
  };
}
