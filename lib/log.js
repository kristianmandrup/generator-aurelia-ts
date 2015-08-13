'use strict';

module.exports = {
  info: function(msg) {
    console.log(msg);
  },
  command: function(msg) {
    console.log('  $ ' + msg);
  }
}
