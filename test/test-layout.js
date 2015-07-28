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
describe('aurelia-ts:layout', function () {
  this.spy = sinon.spy();
  var dummyGen = generator.Base.extend({
    exec: this.spy
  });

  var pkgFile = 'package.json';

  function pkgKeyExpr(name) {
    var key = name + ":";
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

    app = helpers.run(path.join(__dirname, '../generators/layout'))
      .withOptions({
        ui: 'Bootstrap',
      })
      .withPrompts({
        style: [
          // 'Bootstrap',
          'Bootstrap Material',
          'Foundation',
          'Framework7'
        ]
      })
      .on('end', function() {
        done();
      });
  });

  it('includes bootstrap', function() {
    assert.fileContent([
      ['package.json', /"bootstrap": ".*\/bootstrap.+"/]
    ]);

    assert.fileContent([
      ['src/nav-bar.html', /<nav class="navbar navbar\-default.*"/],
      ['src/welcome.html', /<div class="form\-group">/]
    ]);
  });

  it('includes Foundation', function() {
    assert.fileContent([
      ['package.json', /"foundation": ".*zurb\/bower\-foundation.+"/]
    ]);
  });

  it('includes Framework7', function() {
    assert.fileContent([
      ['package.json', /"framework7": ".*Framework7.+"/]
    ]);
  });

  it('includes Semantic-UI', function() {
    assert.fileContent([
      ['package.json', /"semantic-ui": ".*semantic.+"/]
    ]);
  });
});
*/