'use strict';

var path = require('path');
var generator = require('yeoman-generator');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');
var sinon = require('sinon');
var fs = require('fs');
var app;

// TODO pending testing these three plugins!!
var plugins = {
  async: 'aurelia-async',
  flux: 'aurelia-flux',
  computed: 'aurelia-computed',
  dialog: 'aurelia-dialog',
  fetch: 'aurelia-fetch-client',
  virtualList: 'aurelia-ui-virtualization',
  i18next: 'aurelia-i18next=github:zewa666/aurelia-i18next',
  // bsModal: 'aurelia-bs-modal',
  // auth: 'github:paulvanbladel/aureliauth',
  validation: 'aurelia-validation',
  // rethinkDb: 'github:kristianmandrup/aurelia-rethink-bindtable',
  breeze: 'aurelia-breeze'
};

describe('aurelia-ts:plugins', function () {
  this.spy = sinon.spy();
  var dummyGen = generator.Base.extend({
    exec: this.spy
  });
/*
  var pkgFile = 'package.json';
  function pkgKeyExpr(name) {
    var key = "aurelia\-" + name + ":";
    return new RegExp(key, 'g');
  }
  function entry(name) {
    return [pkgFile, pkgKeyExpr(name)];
  }
*/
  this.npmInstallCalls = [];
  this.spawnCommandCalls = [];
  before(function(done) {
    /*
    var fs = require('fs');
    fs.exists('./package.json', function (exists) {
      if (exists) {
        // var mockFs = require('mock-fs');
        console.log('writing fixture: package.json')
        var packageJson = "{\"name\": \"test-plugins\"}";
        fs.writeFileSync('package.json', packageJson);
      }
    });
    */
    app = helpers.run(path.join(__dirname, '../generators/plugins'))
      .withOptions({
        cssFramework: 'Bootstrap',
      })
      .withPrompts({
        ui: ['Virtual List', 'Dialog'],
        fetch: true,
        flux: true,
        auth: true,
        validation: true,
        computed: true,
        i18next: true,
        bindings: ['Async', 'Breeze', 'RethinkDB'],
        bsModal: true
      })
      .on('ready', function(generator) {
        generator.npmInstall = function() {
          this.npmInstallCalls.push(arguments);
        }.bind(this);
        generator.spawnCommand = function() {
          this.spawnCommandCalls.push(arguments);
        }.bind(this);
      }.bind(this))
      .on('end', function() {
        done();
      });
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
    let jspmArgs = this.spawnCommandCalls[0][1];
    assert(this.spawnCommandCalls[0][0].indexOf('jspm') != -1);

    // assert(jspmArgs.indexOf('aurelia-async') != -1);
    for (let plugin in plugins) {
      // console.log(`${plugin}->${plugins[plugin]}`);
      assert(jspmArgs.indexOf(plugins[plugin]) != -1);
    }
  }.bind(this));

});
