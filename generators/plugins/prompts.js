module.exports = {
  createFor: function(opts) {
    var prompts = [{
      type: 'checkbox',
      name: 'ui',
      choices: ['Virtual List', 'Dialog', 'Materialize', 'Animator'],
      message: 'UI',
      default: [],
    }, {
      type: 'confirm',
      name: 'jadeViews',
      message: 'Jade Views',
      default: false,
    }, {
      type: 'confirm',
      name: 'fetch',
      message: 'HTTP Fetch',
      default: false,
    }, {
      type: 'confirm',
      name: 'flux',
      message: 'Flux',
      default: false,
    }, {
      type: 'confirm',
      name: 'leaflet',
      message: 'Leaflet Map API',
      default: false,
    }, {
      type: 'confirm',
      name: 'auth',
      message: 'Token based Authentication',
      default: false,
    }, {
      type: 'confirm',
      name: 'validation',
      message: 'Validation',
      default: false,
    }, {
      type: 'confirm',
      name: 'computed',
      message: 'Computed properties',
      default: false,
    }, {
      type: 'confirm',
      name: 'i18next',
      message: 'i18 next localization',
      default: false,
    }, {
      type: 'checkbox',
      name: 'bindings',
      choices: ['Async', 'Breeze bindings', 'RethinkDB bindings'],
      message: 'Bindings',
      default: [],
    }];

    var bsModalPrompt = {
      type: 'confirm',
      name: 'bsModal',
      message: 'Bootstrap Modal',
      default: false,
    };

    if (opts.bootstrap) {
      prompts.push(bsModalPrompt);
    }
    return prompts;
  }
}
