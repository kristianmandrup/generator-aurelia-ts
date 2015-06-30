'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('aurelia-ts generator', function() {
  it('can be imported', function() {
    var app = require('../generators/app');
    assert(app !== undefined);
  });
});

describe('aurelia-ts:app', function () {
  before(function(done) {
    console.info('*** before helpers');
    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        appName: 'TheAPP',
        title: 'The TheAPP',
        githubAccount: 'telek',
        authorName: 'me',
        authorEmail: 'me@me.es',
        style: 'Bootstrap'
      })
      .on('ready', function() {
        console.log('just before genertor.run is called');
      })
      .on('end', function() {
        console.log('it finishes!!');
        done();
      });
  });

  it('creates files', function () {
    assert.file([
      'gulpfile.js',
      'package.json',
      'editorconfig', // review
      'jshintrc'
    ]);
  });
});
