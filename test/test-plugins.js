'use strict';

var path = require('path');
var generator = require('yeoman-generator');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');
var sinon = require('sinon');
var fs = require('fs');
var app;

/*
  async: 'aurelia-async',
  flux: 'aurelia-flux',
  computed: 'aurelia-computed',
  dialog: 'aurelia-dialog',
  fetch: 'aurelia-fetch-client',
  virtualList: 'aurelia-ui-virtualization',
  i18next: 'aurelia-i18next=github:zewa666/aurelia-i18next',
  bsModal: 'aurelia-bs-modal',
  auth: 'github:paulvanbladel/aureliauth',
  validation: 'aurelia-validation',
  rethinkDB: 'github:kristianmandrup/aurelia-rethink-bindtable',
  breeze: 'aurelia-breeze'
*/

/*
describe('aurelia-ts:plugins', function () {
  this.spy = sinon.spy();
  var dummyGen = generator.Base.extend({
    exec: this.spy
  });

  var pkgFile = 'package.json';

  function pkgKeyExpr(name) {
    var key = "aurelia\-" + name + ":";
    return new RegExp(key, 'g');
  }
  function entry(name) {
    return [pkgFile, pkgKeyExpr(name)];
  }

  before(function(done) {
    var fs = require('fs');
    fs.exists('./package.json', function (exists) {
      if (exists) {
        // var mockFs = require('mock-fs');
        console.log('writing fixture: package.json')
        var packageJson = "{\"name\": \"test-plugins\"}";
        fs.writeFileSync('package.json', packageJson);
      }
    });

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
        bindings: ['Async', 'Breeze bindings', 'RethinkDB bindings'],
        bsModal: true
      })
      .on('end', function() {
        done();
      });
  });

  after(function() {
    fs.exists('./package.json', function (exists) {
      if (exists) {
        var content = fs.readFileSync('package.json');
        console.log('removing fixture: package.json')
        if (content.match(/test-plugins/)) {
          fs.unlink('package.json', function (err) {
            if (err) throw err;
            console.log('successfully deleted package.json');
          });
        }
      }
    });
  });

  describe('writes jspm dependencies to package.json', function() {
    it('includes async', function() {
      assert.fileContent([
        entry('async')
      ]);
    });

    it('includes breeze', function() {
      assert.fileContent([
        entry('breeze')
      ]);
    });

    it('includes bs-modal', function() {
      assert.fileContent([
        entry('bs-modal')
      ]);
    });

    it('includes computed', function() {
      assert.fileContent([
        entry('computed')
      ]);
    });

    it('includes dialog', function() {
      assert.fileContent([
        entry('dialog')
      ]);
    });

    it('includes flux', function() {
      assert.fileContent([
        entry('flux')
      ]);
    });

    it('includes fetch', function() {
      assert.fileContent([
        entry('fetch')
      ]);
    });

    it('includes i18next', function() {
      assert.fileContent([
        entry('i18next')
      ]);
    });

    it('includes rethink-bindtable', function() {
      assert.fileContent([
        entry('rethink-bindtable')
      ]);
    });

    it('includes ui-virtualization', function() {
      assert.fileContent([
        entry('ui-virtualization')
      ]);
    });

    it('includes validation', function() {
      assert.fileContent([
        [pkgFile, /"aureliaauth":/]
      ]);
    });
  });
});
*/