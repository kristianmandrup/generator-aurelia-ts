module.exports = function(gen) {
  return [{
    type: 'input',
    name: 'appName',
    message: 'application (module) name',
    default: gen.props.moduleName // Name
  }, {
    type: 'input',
    name: 'title',
    message: 'title',
    default: gen.props.appTitle || gen.props.appName
  }, {
    type: 'input',
    name: 'title',
    message: 'description',
    default: gen.props.appDesc
  }, {
    type: 'input',
    name: 'githubAccount',
    message: 'github account',
    default: gen.props.githubAccount
  }, {
    type: 'input',
    name: 'authorEmail',
    message: 'Your email',
    default: gen.props.authorEmail
  }, {
    type: 'input',
    name: 'authorName',
    message: 'Your name',
    default: gen.props.authorName
  }];
}
