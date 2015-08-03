'use strict';
let util = require('./util');

module.exports = function(gen) {
  return {
    dirs: ['docs', 'src'],
    docs: function() {
      // TODO: copy all such docs to /docs folder
      let plugins = gen.props.plugins;
      let selectedPluginRepos = util.docRepos(plugins.selected);
      gen.copy.docsTpl('_Plugins.md', {
          selectedPluginRepos: selectedPluginRepos
        }
      );
    },
    src: function() {
      let props = gen.props;
      let plugins = gen.props.plugins;
      let ext = gen.info.getLangExt();
      gen.copy.srcTpl(`_plugin-config.${ext}`, plugins.conf);

      // welcome with validation configured!
      if (props.validation) gen.copy.srcFile('welcome.js');
    }
  };
}
