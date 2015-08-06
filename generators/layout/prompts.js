'use strict';
module.exports = {
  editors: ['Atom', 'VS', 'WebStorm', 'Sublime', 'Other'],
  createFor: function(opts) {
    return {
      phase1: function() {
        var prompts = [];

        var defaultUI = opts.ui.use || 'Bootstrap';

        var uiFrameWorksPrompt = {
          type: 'checkbox',
          name: 'cssFrameworks',
          choices: [
            'Bootstrap',
            'Bootstrap Material',
            'Foundation',
            'Semantic-UI',
            'Framework7'
          ],
          default: [defaultUI],
          message: 'Layout frameworks'
        }

        // should not prompt to install
        // if options are passed to force install
        var faPrompt = {
          type: 'confirm',
          name: 'fontAwesome',
          message: 'Font Awesome',
          default: true
        };

        if (!opts.fa) {
          prompts.push(faPrompt);
        }

        if (!opts.uiFrameworks) {
          prompts.push(uiFrameWorksPrompt);
        }
        return prompts;
      },
      phase2: function(opts) {
        return [{
          type: 'list',
          name: 'primary',
          message: 'Primary layout framework',
          choices: opts.cssFrameworks,
          default: []
        }];
      }
    };
  }
};
