'use strict';

let path = require('path');
let fs = require('node-fs-extra');

function normalized(fromPath, toPath, opts) {
  opts = opts || {};
  if (typeof toPath !== 'string') {
    opts = toPath;
    toPath = fromPath;
  }
  return {fromPath: fromPath, toPath: toPath, opts: opts};
}

module.exports = function(gen) {
  var base = {
    bulkDir: function(fromPath, toPath, opts) {
      toPath = toPath || fromPath;
      console.log(`copying /${fromPath} -> /${toPath}`);
      let from = gen.templatePath(fromPath);
      let to = gen.destinationPath(toPath);
      fs.copySync(from, to);
    },
    template: function(fromPath, toPath, opts) {
      if (fromPath[0] === '_' && typeof toPath !== 'string') {
        toPath = fromPath.slice(1);
      }
      let x = normalized(fromPath, toPath, opts);
      gen.fs.copyTpl(
        gen.templatePath(x.fromPath),
        gen.destinationPath(x.toPath),
        x.opts
      );
    },
    file: function(fromPath, toPath) {
      let x = normalized(fromPath, toPath);
      gen.fs.copy(
        gen.templatePath(x.fromPath),
        gen.destinationPath(x.toPath)
      );
    },
    // creates a template or file function with a base path, such as src/
    createFn: function(fn, baseFrom, baseTo) {
      baseTo = baseTo || baseFrom;
      return function(fromPath, toPath, opts) {
        opts = opts || {};
        toPath = toPath || fromPath;
        let from = path.join(baseFrom, fromPath);
        let to = path.join(baseTo, toPath);
        this[fn](from, to, opts);
      }
    },
    createFuns: function(name, baseFrom, baseTo) {
      baseTo = baseTo || baseFrom;
      this[`${name}File`] = this.createFn('file', baseFrom, baseTo);
      this[`${name}Tpl`] = this.createFn('template', baseFrom, baseTo);
      base[`${name}Template`] = base[`${name}Tpl`]; //alias
    }
  };

  for (let dir of ['src', 'styles', 'test', 'docs']) {
    base.createFuns(dir, dir);
  }
  base.createFuns('root', 'root', '.');
  base.createFuns('build', 'tasks', 'build/tasks');
  return base;
};
