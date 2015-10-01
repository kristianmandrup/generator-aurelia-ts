'use strict';
module.exports = {
  editors: ['Atom', 'VS', 'WebStorm', 'Sublime', 'Other'],
  createFor: function(opts) {
    return {
      phase1: [{
        type: 'checkbox',
        name: 'styles',
        choices: [
          'Stylus',
          'SCSS',
          'SASS'
        ],
        default: opts.defaultStyles,
        message: 'CSS Preprocessors',
        when: function(answers) {
          var ask = (typeof opts.options.sass === 'undefined') && (typeof opts.options.scss === 'undefined')
            && (typeof opts.options.stylus === 'undefined')
        
          return ask;
        }
      }, {
        type: 'confirm',
        name: 'removeOld',
        default: false,
        message: 'Remove old styles?'
      }, {
        type: 'confirm',
        name: 'useJade',
        default: false,
        message: 'Use Jade Templates?'
      }],

      phase2: [{
        type: 'checkbox',
        name: 'stylusPlugins',
        choices: [
          'Autoprefixer',
          'Nib',
          'Axis', // extends nib
          'Rupture',
          'Fluidity',
          'Typographic',
          'Jeet' // extends nib
        ],
        default: ['Autoprefixer', 'Nib'],
        message: 'Stylus plugins'
      }]
    };
  }
};
