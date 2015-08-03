'use strict';
module.exports = {
  createFor: function(opts) {
    return [{
      type    : 'confirm',
      name    : 'amd',
      message : 'Use Aurelia AMD?',
      default : opts.amd,
      when: function(answers) {
        return answers.typescript;
      }
    }, {
      type    : 'list',
      name    : 'editor',
      message : 'Choose Editor',
      choices: editors,
      default : ['Atom']
    }];
  }
}

let editors = ['Atom', 'VS', 'WebStorm', 'Sublime', 'Other'];
