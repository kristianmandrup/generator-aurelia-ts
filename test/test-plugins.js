'use strict';

var path = require('path');
var generator = require('yeoman-generator');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');
var sinon = require('sinon');
var fs = require('fs');
var app;
var testHelpers = require('./lib/helper');

// TODO pending testing these three plugins!!
var plugins = {
  animator: 'aurelia-animator-css',
  async: 'aurelia-async',
  flux: 'aurelia-flux',
  computed: 'aurelia-computed',
  dialog: 'aurelia-dialog',
  fetch: 'aurelia-fetch-client',
  virtualList: 'aurelia-ui-virtualization',
  leaflet: 'aurelia-leaflet=github:ceoaliongroo/aurelia-leaflet',
  i18next: 'aurelia-i18next=github:zewa666/aurelia-i18next',
  bsModal: 'aurelia-bs-modal',
  auth: 'aureli-auth=github:paulvanbladel/aureliauth',
  validation: 'aurelia-validation',
  // jadeViews: 'aurelia-jade-viewstrategy=github:Craga89/aurelia-jade-viewstrategy',
  materialize: 'aurelia-materialize=github:manuel-guilbault/aurelia-materialize',
  rethinkDb: 'aurelia-rethink-bindtable=github:kristianmandrup/aurelia-rethink-bindtable',
  breeze: 'aurelia-breeze'
};
var pluginVals = Object.keys(plugins).map(function(p, i, l) {
  return plugins[p];
});

describe('aurelia-ts:plugins', function () {
  this.spy = sinon.spy();
  var dummyGen = generator.Base.extend({
    exec: this.spy
  });

  let mockOptions = {};
  let mockPrompts = {
    ui: ['Virtual List', 'Dialog', 'Materialize', 'Animator'],
    fetch: true,
    flux: true,
    leaflet: true,
    auth: true,
    validation: true,
    computed: true,
    i18next: true,
    bindings: ['Async', 'Breeze', 'RethinkDB'],
    bsModal: false
  };
  let jspmArgs;
  before(function(done) {
    app = testHelpers.runGenerator('plugins', mockOptions, mockPrompts)
      .on('ready', testHelpers.onready.bind(this))
      .on('end', function() {
        jspmArgs = this.spawnCommandCalls[0][1];
        done();
      }.bind(this));
  }.bind(this)); // EO before

  it('generator can be run', function() {
    assert(app !== undefined);
  });

  it('jspm is called once', function() {
    assert(this.spawnCommandCalls.length == 1);
    assert(this.npmInstallCalls.length == 0);
  }.bind(this));

  // This could be as well unrolled in separate plugins
  it('install the right plugins', function() {
    jspmArgs = this.spawnCommandCalls[0][1];
    assert(this.spawnCommandCalls[0][0].indexOf('jspm') != -1);

    // assert(jspmArgs.indexOf('aurelia-async') != -1);
    // check all arguments of jspm call are registered plugins
    for (let i=1; i<Object.keys(jspmArgs).length; i++) {
      let res = pluginVals.indexOf(jspmArgs[i]);
      assert(res != -1);
    }
    /*
    for (let plugin in plugins) {
      let res = jspmArgs.indexOf(plugins[plugin]);
      console.log(`ALL plugins: '${jspmArgs}'.indexOf('${plugins[plugin]}')=${res}`);
      assert(res != -1);
    }
    */
  }.bind(this));
});

describe('aurelia-ts:plugins UI', function() {
  let mockOptions = {};
  let mockPrompts = {
    ui: ['Virtual List', 'Dialog', 'Animator', 'Materialize'],
  };
  let jspmArgs;
  before(function(done) {
    app = testHelpers.runGenerator('plugins', mockOptions, mockPrompts)
      .on('ready', testHelpers.onready.bind(this))
      .on('end', function() {
        jspmArgs = this.spawnCommandCalls[0][1];
        done();
      }.bind(this));
  }.bind(this)); // EO before

  it('generator can be run', function() {
    assert(app !== undefined);
  });

  it('install just UI plugins', function() {
    assert(this.spawnCommandCalls[0][0].indexOf('jspm') != -1);
    for (let i=1; i<Object.keys(jspmArgs).length; i++) {
      let res = pluginVals.indexOf(jspmArgs[i]);
      // console.log(`${pluginVals}.indexOf(${jspmArgs[i]}) = ${pluginVals.indexOf(jspmArgs[i])}`);
      assert(res != -1);
    }

  }.bind(this));
})

describe('aurelia-ts:plugins bootstrap modal', function() {
  let mockOptions = {
    bootstrap: true
  };
  let mockPrompts = {
    ui: ['Materialize', 'Dialog'],
    bsModal: true
  };
  let jspmArgs;
  before(function(done) {
    app = testHelpers.runGenerator('plugins', mockOptions, mockPrompts)
      .on('ready', testHelpers.onready.bind(this))
      .on('end', function() {
        jspmArgs = this.spawnCommandCalls[0][1];
        done();
      }.bind(this))
  }.bind(this));

  it('can be run', function() {
    assert(app !== undefined);
  });

  it('install bootstrap modal', function() {
    console.log('jspmArgs: '+jspmArgs);
    assert(jspmArgs.indexOf('aurelia-bs-modal') != -1);
  })
});

describe('aurelia-ts:plugins install normal plugins', function() {
  let mockOptions = {};
  let mockPrompts = {
    ui: [],
    i18next: true,
    computed: true
  };
  let jspmArgs;

  before(function(done) {
    app = testHelpers.runGenerator('plugins', mockOptions, mockPrompts)
      .on('ready', testHelpers.onready.bind(this))
      .on('end', function() {
        jspmArgs = this.spawnCommandCalls[0][1];
        done();
      }.bind(this));
  }.bind(this));

  it('can be run', function() {
    assert(app !== undefined);
  });

  it('does not install any UI plugins', function() {
    assert(jspmArgs.indexOf('aurelia-animator-css') == -1);
    assert(jspmArgs.indexOf('aurelia-dialog') == -1);
    assert(jspmArgs.indexOf('aurelia-ui-virtualization') == -1);
    assert(jspmArgs.indexOf('aurelia-materialize=github:manuel-guilbault/aurelia-materialize') == -1);
  });

  it('installs i18n plugin', function() {
    assert(jspmArgs.indexOf('aurelia-i18next=github:zewa666/aurelia-i18next') != -1);
  });
  it('installs computed plugin', function() {
    assert(jspmArgs.indexOf('aurelia-computed'))
  });
});


describe('aurelia-ts:plugins install binding plugins', function() {
  let mockOptions = {};
  let mockPrompts = {
    ui: [],
    bindings: ['Async', 'RethinkDB']
  };
  let jspmArgs;

  before(function(done) {
    app = testHelpers.runGenerator('plugins', mockOptions, mockPrompts)
      .on('ready', testHelpers.onready.bind(this))
      .on('end', function() {
        jspmArgs = this.spawnCommandCalls[0][1];
        done();
      }.bind(this));
  }.bind(this));

  it('can be run', function() {
    assert(app !== undefined);
  });

  it('installs RethinkDB plugin', function() {
    assert(jspmArgs.indexOf('aurelia-rethink-bindtable=github:kristianmandrup/aurelia-rethink-bindtable') != -1);
  });

  it('installs Async plugin', function() {
    assert(jspmArgs.indexOf('aurelia-async') != -1);
  });

});
