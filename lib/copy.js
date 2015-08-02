function normalized(fromPath, toPath, opts = {}) {
  if (typeof toPath !== 'string') {
    opts = toPath;
    toPath = fromPath;
  }
  return [fromPath, toPath, opts];
}


module.exports = function(gen) {
  var base = {
    template: function(fromPath, toPath, opts = {}) {
      [fromPath, toPath, opts] = normalized(fromPath, toPath, opts);
      gen.fs.copyTpl(
        gen.templatePath(fromPath),
        gen.destinationPath(toPath),
        opts
      );
    },
    file: function(from, to) {
      [fromPath, toPath, opts] = normalized(fromPath, toPath, opts);
      gen.fs.copy(
        gen.templatePath(fromPath),
        gen.destinationPath(toPath)
      );
    },
    // creates a template or file function with a base path, such as src/
    createFn: function(fn, baseFrom, baseTo) {
      baseTo = baseTo || baseFrom;
      return function(fromPath, toPath, opts = {}) {
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
