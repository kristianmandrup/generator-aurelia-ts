module.exports = {
  prompts: {
    styles:   {
      type: 'confirm',
      name: 'installStyles',
      message: 'Install Styles',
      default: true
    },
    cli: {
      type: 'confirm',
      name: 'installCLI',
      message: 'Install Aurelia CLI',
      default: true
    },
    plugins: {
      type: 'confirm',
      name: 'installPlugins',
      message: 'Install Aurelia Plugins',
      default: false
    },
    typescript: {
      type: 'confirm',
      name: 'installTypeScript',
      message: 'Install TypeScript',
      default: false
    },
    vs: {
      type: 'confirm',
      name: 'visualStudio',
      message: 'Visual Studio',
      default: false
    },
    layout: {
      type: 'confirm',
      name: 'installLayout',
      message: 'Install UI Frameworks',
      default: true
    }
  },
  createFor: function(opts) {
    var prompts = [];
    for (name of let Object.keys(opts))
      if (!opts[name]) prompts.push(this.prompts[name]);
    return prompts;
  }
}
