'use strict';
module.exports = function (gen) {
  return {
    prompts: {
      ui: {
        type: 'checkbox',
        name: 'ui',
        choices: ['Virtual List', 'Dialog', 'Materialize', 'Animator'],
        message: 'UI',
        default: [],
      },
      jade: {
        type: 'confirm',
        name: 'jadeViews',
        message: 'Jade Views',
        default: false,
      },
      fetch: {
        type: 'confirm',
        name: 'fetch',
        message: 'HTTP Fetch',
        default: false,
      },
      flux: {
        type: 'confirm',
        name: 'flux',
        message: 'Flux',
        default: false,
      },
      leaflet: {
        type: 'confirm',
        name: 'leaflet',
        message: 'Leafvar Map API',
        default: false,
      },
      auth: {
        type: 'confirm',
        name: 'auth',
        message: 'Token based Authentication',
        default: false,
      },
      validation: {
        type: 'confirm',
        name: 'validation',
        message: 'Validation',
        default: false,
      },
      computed: {
        type: 'confirm',
        name: 'computed',
        message: 'Computed properties',
        default: false,
      },
      i18next: {
        type: 'confirm',
        name: 'i18next',
        message: 'i18 next localization',
        default: false,
      },
      bindings: {
        type: 'checkbox',
        name: 'bindings',
        choices: ['Async', 'Breeze', 'RethinkDB'],
        message: 'Bindings',
        default: [],
      }
    },
    promptList: ['ui', 'fetch', 'flux', 'leaflet', 'auth', 'validation', 'computed', 'i18next', 'bindings'],
    createFor: function(opts) {
      var prompts = [];
      for (var name of this.promptList)
        prompts.push(this.prompts[name]);

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
}
