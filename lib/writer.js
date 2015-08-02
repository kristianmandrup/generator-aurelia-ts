'use strict';

module.exports = function(writeConf) {
  return {
    write: function(dir) {
      return function() {
        var fn = typeof writeConf[dir] === 'function' ? writeConf[dir] : writeConf[dir].write;
        fn();
      }
    },
    writeAll: function() {
      if (writeConf.prepare) writeConf.prepare();
      for (dir of writeConf.dirs)
        this.write(dir);
    }    
  }
}
