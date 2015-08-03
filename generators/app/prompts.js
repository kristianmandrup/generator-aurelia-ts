'use strict';

module.exports = function(gen) {
  let props = gen.props;
  let app = props.app;
  let pkg = props.pkg;

  return {
    prompts: {
      name: {
        type: 'input',
        name: 'appName',
        message: 'application (module) name',
        default: app.moduleName // Name
      },
      title: {
        type: 'input',
        name: 'title',
        message: 'title',
        default: app.title
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
        default: pkg.githubAccount
      },
      authorEmail: {
        type: 'input',
        name: 'authorEmail',
        message: 'Your email',
        default: pkg.authorEmail
      },
      authorName: {
        type: 'input',
        name: 'authorName',
        message: 'Your name',
        default: pkg.authorName
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
    promptList: [], // ['name', 'title', 'desc', 'github', 'authorName', 'authorEmail', 'ie9', 'decorate'],
    createFor: function() {
      var prompts = [];
      for (let name of this.promptList)
        prompts.push(this.prompts[name]);
      return prompts;
    }
  };
}
