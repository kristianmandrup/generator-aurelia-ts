module.exports = {
  createFor: function(opts) {
    var prompts = [{
      type: 'confirm',
      name: 'installStyles',
      message: 'Install Styles',
      default: true
    }, {
      type: 'confirm',
      name: 'installCLI',
      message: 'Install Aurelia CLI',
      default: true
    }];

    var pluginsPrompt ={
      type: 'confirm',
      name: 'installPlugins',
      message: 'Install Aurelia Plugins',
      default: false
    };

    // should not prompt to install
    // if options are passed to force install
    var typeScriptPrompt = {
      type: 'confirm',
      name: 'installTypeScript',
      message: 'Install TypeScript',
      default: false
    };

    var vsPrompt = {
      type: 'confirm',
      name: 'visualStudio',
      message: 'Visual Studio',
      default: false
    };

    var layoutPrompt = {
      type: 'confirm',
      name: 'installLayout',
      message: 'Install UI Frameworks',
      default: true
    };

    if (!opts.vs) {
      prompts.push(vsPrompt);
    }

    if (!opts.plugins) {
      prompts.push(pluginsPrompt);
    }

    if (!opts.ts) {
      prompts.push(typeScriptPrompt);
    }

    if (!opts.uiFramework) {
      prompts.push(layoutPrompt);
    }
    return prompts;
  }
}
