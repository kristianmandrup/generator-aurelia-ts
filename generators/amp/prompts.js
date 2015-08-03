module.exports = [{
  type: 'checkbox',
  name: 'modules',
  message: 'Ampersand state modulas',
  choices: ['app', 'registry', 'state', 'collection', 'rest-collection', 'model'],
  default: ['app', 'collection', 'model']
}, {
  type: 'confirm',
  name: 'humanModel',
  message: 'Human model',
  default: false
}];
