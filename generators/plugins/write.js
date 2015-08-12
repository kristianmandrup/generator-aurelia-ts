'use strict';
var util = require('./util');

module.exports = function(gen) {
  return {
    dirs: ['docs', 'src'],
    docs: function() {
      // TODO: copy all such docs to /docs folder
      var plugins = gen.props.plugins;

      var selectedPluginRepos = util.docRepos(plugins.selected);
      gen.copy.docsTpl('_Plugins.md', {
          selectedPluginRepos: selectedPluginRepos
        }
      );
    },
    src: function() {
      var props = gen.props;
      var plugins = gen.props.plugins;
      var ext = gen.info.getLangExt();
      gen.copy.srcTpl(`_plugin-config.${ext}`, plugins.conf);

      // welcome with validation configured!
      if (props.validation) gen.copy.srcFile('welcome.js');
    }
  };
}
