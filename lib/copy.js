'use strict';

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
    template: function(fromPath, toPath, opts) {
      let x = normalized(fromPath, toPath, opts);
      gen.fs.copyTpl(
        gen.templatePath(x.fromPath),
        gen.destinationPath(x.toPath),
        opts
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
        this[fn](path.join(path, fromPath), path.join(path, toPath), opts = {})
      }
    }
  };

  for (let dir of ['src', 'styles', 'test', 'docs']) {
    base[`${dir}Tpl`] = base.createFn('template', dir);
    base[`${dir}Template`] = base[`${dir}Tpl`]; //alias
    base[`${dir}File`] = base.createFn('file', dir);
  }
  base.rootFile = base.createFn('file', 'root', '.');
  base.buildFile = base.createFn('file', 'tasks', 'build/tasks');
  return base;
};
