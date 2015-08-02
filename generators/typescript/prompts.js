module.exports = {
  editors: ['Atom', 'VS', 'WebStorm', 'Sublime', 'Other'],
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
      type    : 'confirm',
      name    : 'editor',
      message : 'Choose Editor',
      choices: this.editors
      default : 'Atom'
    }];
  }
}
