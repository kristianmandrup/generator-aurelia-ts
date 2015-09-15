'use strict';

module.exports = function(gen) {
  var props = gen.props;
  var app = props.app;
  var pkg = props.pkg;
  var defaults = require('./defaults');

  return {
    prompts: {
      name: {
        type: 'input',
        name: 'appName',
        message: 'application (package) name',
        default: app.moduleName || defaults.appName
      },
      title: {
        type: 'input',
        name: 'title',
        message: 'title',
        default: app.title || defaults.appName
      },
      desc: {
        type: 'input',
        name: 'desc',
        message: 'description',
        default: app.desc
      },
      github: {
        type: 'input',
        name: 'githubAccount',
        message: 'github account',
        default: pkg.githubAccount || defaults.userName
      },
      authorEmail: {
        type: 'input',
        name: 'authorEmail',
        message: 'Your email',
        default: pkg.authorEmail || defaults.authorEmail
      },
      authorName: {
        type: 'input',
        name: 'authorName',
        message: 'Your name',
        default: pkg.authorName || defaults.authorName
      },
      ie9: {
        type: 'confirm',
        name: 'ie9',
        message: 'Support IE9',
        default: true
      },
      decorate: {
        type: 'confirm',
        name: 'decorate',
        message: 'Decorate the app?',
        default: true
      }
    },
    promptList: ['name', 'title', 'desc', 'github', 'authorName', 'authorEmail', 'ie9', 'decorate'],
    createFor: function() {
      var prompts = [];
      for (var name of this.promptList)
        prompts.push(this.prompts[name]);
      return prompts;
    }
  };
}
