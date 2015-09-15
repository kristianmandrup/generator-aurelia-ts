'use strict';

function isFun(fn) {
  return typeof fn === 'function';
}

module.exports = function(writeConf) {
  return {
    write: function(dir) {
      return function() {
        var dirFun = writeConf[dir];
        if (isFun(dirFun)) dirFun();
      }
    },
    writeAll: function() {
      if (writeConf.prepare) writeConf.prepare();
      // console.log('Writing', writeConf.dirs);
      for (var dir of writeConf.dirs)
        this.write(dir)();
    }
  }
}
