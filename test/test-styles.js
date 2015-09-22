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

// Need test for no styles => just raw CSS
var styles = ['SASS', 'SCSS', 'Stylus'];
var useJade = true;
var stylusPlugins = ['Autoprefixer', 'Nib', 'Axis', // extends nib
  'Rupture', 'Fluidity', 'Jeet' // extends nib
];

describe('aurelia-ts:styles w/ prompts', function () {
  this.spy = sinon.spy();
  var dummyGen = generator.Base.extend({
    exec: this.spy
  });

  // this.npmInstallCalls = [];
  // this.spawnCommandCalls = [];
  // this.npmCallsArgs = [] ;
  let mockOptions = {};
  let mockPrompts = {
    styles: styles,
    useJade: useJade,
    removeOld: false,
    stylusPlugins: stylusPlugins
  };
  let npmCallsArgs = [];
  before(function(done) {
    app = testHelpers.runGenerator('styles', mockOptions, mockPrompts)
      .on('ready', testHelpers.onready.bind(this))
      .on('end', function() {
        for (let mods of this.npmInstallCalls) {
          // console.log(mods[0]);
          npmCallsArgs.push(mods[0]);
        }
        done();
      }.bind(this));
  }.bind(this));

  it('generator can be run', function() {
    assert(app !== undefined);
  });

  it('npm is run more than once', function() {
    assert(this.spawnCommandCalls.length == 0);
    assert(this.npmInstallCalls.length > 1);
  }.bind(this));

  it('install SASS support', function() {
    let aux = npmCallsArgs.filter(function(elem) {
      return elem.match(/gulp-sass/);
    });
    assert(aux.length == 1);
    assert.file(['build/tasks/sass.js']);
  });

  it('copy SCSS style files', function() {
    assert.file(['styles/sass/styles.scss']);
  });

  it('copy SASS style files', function() {
    assert.file(['styles/sass/styles.sass']);
  });

  it('install stylus support', function() {
    let aux = npmCallsArgs.filter(function(elem) {
      return elem.match(/gulp-stylus/);
    });
    assert(aux.length == 1);
    assert.file(['build/tasks/stylus.js']);
  });

  it('copy stylus style files', function() {
    assert.file(['styles/stylus/styles.styl']);
  });

  it('install Jade templating', function() {
    let aux = npmCallsArgs.filter(function(elem) {
      return elem.match(/gulp-jade/);
    });
    assert(aux.length == 1);
    assert.file(['build/tasks/jade.js']);
  });

  // Check if every plugin has a related npm call for it
  // This could be unrolled in several tests one per plugin
  it('install stylus plugins', function() {
    let aux = true;
    stylusPlugins.forEach(function(plugin, index, plugins) {
      // npmCallsArgs.forEach(function(call, indexC, calls) {
      // check there is the plugin name(s) at least in one npm call
      let res = npmCallsArgs.some(function(call, indexC, calls){
        return call.toLowerCase().indexOf(plugin.toLowerCase()) > -1;
      });
      assert(res == true);
    });
  });
});

describe('aurelia-ts:styles --stylus', function () {
  this.spy = sinon.spy();
  var dummyGen = generator.Base.extend({
    exec: this.spy
  });

  // this.npmInstallCalls = [];
  // this.spawnCommandCalls = [];
  // this.npmCallsArgs = [] ;
  let mockOptions = {
    stylus: true
  };
  let mockPrompts = {
    styles: [],
    useJade: false,
    removeOld: false,
    stylusPlugins: []
  };
  let npmCallsArgs = [];
  before(function(done) {
    app = testHelpers.runGenerator('styles', mockOptions, mockPrompts)
      .on('ready', testHelpers.onready.bind(this))
      .on('end', function() {
        for (let mods of this.npmInstallCalls) {
          // console.log(mods[0]);
          npmCallsArgs.push(mods[0]);
        }
        done();
      }.bind(this));
  }.bind(this));

  it('can be run', function() {
    assert(app !== undefined);
  });

  it('install stylus support', function() {
    let aux = npmCallsArgs.filter(function(elem) {
      return elem.match(/gulp-stylus/);
    });
    assert(aux.length == 1);
    assert.file(['build/tasks/stylus.js']);
    assert.file(['styles/stylus/styles.styl']);
  });

  it('does not install stylus plugins', function() {
    let aux = true;
    stylusPlugins.forEach(function(plugin, index, plugins) {
      let res = npmCallsArgs.some(function(call, indexC, calls){
        return call.toLowerCase().indexOf(plugin.toLowerCase()) == -1;
      });
      assert(res == true);
    });
  });
});

describe('aurelia-ts:styles --sass', function() {
  let mockOptions = {
    sass: true
  };
  let mockPrompts = {
    styles: [],
    useJade: false,
    removeOld: false,
    stylusPlugins: []
  };
  let npmCallsArgs = [];
  before(function(done) {
    app = testHelpers.runGenerator('styles', mockOptions, mockPrompts)
      .on('ready', testHelpers.onready.bind(this))
      .on('end', function() {
        for (let mods of this.npmInstallCalls) {
          npmCallsArgs.push(mods[0]);
        }
        done();
      }.bind(this))

  }.bind(this));

  it('can be run', function() {
    assert(app !== undefined);
  });

  it('install SASS (.s?ss) support', function() {
    let aux = npmCallsArgs.filter(function(elem) {
      return elem.match(/gulp-sass/);
    });
    assert(aux.length == 1);
    assert.file(['build/tasks/sass.js']);
  });

  it('copy SASS style files', function() {
    assert.file(['styles/sass/styles.sass']);
  });
});


describe('aurelia-ts:styles --scss', function() {
  let mockOptions = {
    scss: true
  };
  let mockPrompts = {
    styles: [],
    useJade: false,
    removeOld: false,
    stylusPlugins: []
  };
  let npmCallsArgs = [];
  before(function(done) {
    app = testHelpers.runGenerator('styles', mockOptions, mockPrompts)
      .on('ready', testHelpers.onready.bind(this))
      .on('end', function() {
        for (let mods of this.npmInstallCalls) {
          npmCallsArgs.push(mods[0]);
        }
        done();
      }.bind(this))

  }.bind(this));

  it('can be run', function() {
    assert(app !== undefined);
  });

  it('install SCSS (.s?ss) support', function() {
    let aux = npmCallsArgs.filter(function(elem) {
      return elem.match(/gulp-sass/);
    });
    assert(aux.length == 1);
    assert.file(['build/tasks/sass.js']);
  });

  it('copy SCSS style files', function() {
    assert.file(['styles/sass/styles.scss']);
  });
});


describe('aurelia-ts:styles --scss --sass', function() {
  let mockOptions = {
    scss: true,
    sass: true
  };
  let mockPrompts = {
    styles: [],
    useJade: false,
    removeOld: false,
    stylusPlugins: []
  };
  let npmCallsArgs = [];
  before(function(done) {
    app = testHelpers.runGenerator('styles', mockOptions, mockPrompts)
      .on('ready', testHelpers.onready.bind(this))
      .on('end', function() {
        for (let mods of this.npmInstallCalls) {
          npmCallsArgs.push(mods[0]);
        }
        done();
      }.bind(this))

  }.bind(this));

  it('can be run', function() {
    assert(app !== undefined);
  });

  it('install SCSS (.s?ss) support', function() {
    let aux = npmCallsArgs.filter(function(elem) {
      return elem.match(/gulp-sass/);
    });
    assert(aux.length == 1);
    assert.file(['build/tasks/sass.js']);
  });

  it('copy SCSS style files', function() {
    assert.file(['styles/sass/styles.scss']);
  });

  it('and copy SASS styles files', function() {
    assert.file(['styles/sass/styles.sass']);
  });
});



describe('aurelia-ts:styles (no preProcessors)', function() {
  let mockOptions = {};
  let mockPrompts = {
    styles: [],
    useJade: false,
    removeOld: false,
    stylusPlugins: []
  };
  let npmCallsArgs = [];

  before(function(done) {
    app = testHelpers.runGenerator('styles', mockOptions, mockPrompts)
      .on('ready', testHelpers.onready.bind(this))
      .on('end', function() {
        for (let mods of this.npmInstallCalls) {
          npmCallsArgs.push(mods[0]);
        }
        done();
      }.bind(this));
  }.bind(this));

  it('can be run', function() {
    assert(app !== undefined);
  });

  it('does not install proprecessors', function() {
    let sassPlugin = npmCallsArgs.filter(function(elem) {
      return elem.match(/gulp-sass/);
    });
    let stylPlugin = npmCallsArgs.filter(function(elem) {
      return elem.match(/gulp-stylus/);
    });

    assert(sassPlugin.length == 0);
    assert(stylPlugin.length == 0);
  });

  it('does not copy style lang files', function() {
    assert.noFile(['styles/sass/styles.sass']);
    assert.noFile(['styles/sass/styles.scss'])
    assert.noFile(['styles/stylus/styles.styl']);
    assert.file(['styles/css/styles.css']);
  });

});

describe('aurelia-ts:styles --stylus & no plugins', function() {
  let mockOptions = {
    stylus: true
  };
  let mockPrompts = {
    styles: [],
    useJade: false,
    removeOld: false,
    stylusPlugins: ['Autoprefixer', 'Nib', 'Axis']
  };
  let npmCallsArgs = [];
  before(function(done) {
    app = testHelpers.runGenerator('styles', mockOptions, mockPrompts)
      .on('ready', testHelpers.onready.bind(this))
      .on('end', function() {
        for (let mods of this.npmInstallCalls) {
          npmCallsArgs.push(mods[0]);
        }
        done();
      }.bind(this))
  }.bind(this));

  it('can be run', function() {
    assert(app !== undefined);
  });

  it('install support for stylus', function() {
    let stylPlugin = npmCallsArgs.filter(function(elem) {
      return elem.match(/gulp-stylus/);
    });
    assert(stylPlugin.length == 1);
  });

  it('install the stylus plugins', function() {
    mockPrompts.stylusPlugins.forEach(function(p, i, l) {
      var passed = npmCallsArgs.some(function(arg, idx, args){
        return arg.toLowerCase().indexOf(p.toLowerCase());
      });
      assert(passed == true);
    });
  });

});
