module.exports = {
  uiFramework: function (options) {
    var contains = containsFor(options.cssFrameworks);

    return {
      semanticUI: contains('Semantic-UI'),
      framework7: contains('Framework7'),
      foundation: contains('Foundation'),
      bootstrap: contains('Bootstrap'),
      bootstrapMaterial: contains('Bootstrap Material')
    }
  }
}
