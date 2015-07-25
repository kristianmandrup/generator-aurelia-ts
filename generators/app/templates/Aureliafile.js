var aurelia = require('aurelia-cli');

aurelia.command('bundle', {
  js: {
    "dist/app-bundle": {
      modules: [
        '*',
        'aurelia-bootstrapper',
        'aurelia-http-client',
        'aurelia-router',
        'aurelia-animator-css',
        'github:aurelia/templating-binding@0.13.1',
        'github:aurelia/templating-resources@0.13.1',
        'github:aurelia/templating-router@0.14.0',
        'github:aurelia/loader-default@0.9.0',
        'github:aurelia/history-browser@0.6.1'
      ],
      options: {
        inject: true,
        minify: true
      }
    }
  },
  template: {
    "dist/app-bundle": {
      pattern: 'dist/*.html',
      options: {
        inject: true
      }
    }
  }
});
