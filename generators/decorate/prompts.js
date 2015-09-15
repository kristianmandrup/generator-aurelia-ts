'use strict';

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
  promptList: ['styles', 'cli', 'plugins', 'typescript', 'vs', 'layout'],
  create: function() {
    var list = [];
    for (var name of this.promptList)
      list.push(this.prompts[name]);
    return list;
  }
}
