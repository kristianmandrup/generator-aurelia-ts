module.exports = function(gen) {
  return {
    prompts: {
      name: {
        type: 'input',
        name: 'appName',
        message: 'application (module) name',
        default: gen.props.moduleName // Name
      },
      title: {
        type: 'input',
        name: 'title',
        message: 'title',
        default: gen.props.appTitle || gen.props.appName
      },
      desc: {
        type: 'input',
        name: 'desc',
        message: 'description',
        default: gen.props.appDesc
      },
      github: {
        type: 'input',
        name: 'githubAccount',
        message: 'github account',
        default: gen.props.githubAccount
      },
      authorEmail: {
        type: 'input',
        name: 'authorEmail',
        message: 'Your email',
        default: gen.props.authorEmail
      },
      authorName: {
        type: 'input',
        name: 'authorName',
        message: 'Your name',
        default: gen.props.authorName
      }
    },
    promptList: ['name', 'title', 'desc', 'github', 'authorEmail', 'authorEmail'],
    create: function() {
      var prompts = [];
      for (let name of this.promptList)
        prompts.push(this.prompts[name]);
      return prompts;
    }
  };
}
