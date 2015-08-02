module.exports = function(gen) {
  return {
    copyView: function(framework, view) {
      gen.fs.copy(
        gen.templatePath(`views/${framework}/${view}.html`),
        gen.destinationPath(`src/${view}.html`)
      );
    },
    selectedFramework: function(framework) {
      if (framework == 'None') return;
      if (framework.match(/Bootstrap/)) return 'bootstrap';
      return gen.primary.toLowerCase();
    }
  }
}
