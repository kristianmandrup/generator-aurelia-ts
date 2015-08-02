module.exports = function(gen) {
  return {
    dirs: ['docs', 'root', 'src', 'tasks', 'test', 'typings'],    
    docs: function() {
      gen.copy.docsFile('tsd-generation.md', 'typescript/tsd-generation.md');
      let editorFile = `Aurelia-TypeScript-IDE-${gen.editor}.md`;
      gen.copy.docsFile(`editors/${editorFile}`, `typescript/editors/${editorFile}`);
    },
    typings: function () {
      gen.bulkDirectory('typings', 'typings');
      // gen.fs.delete('typings/es6-promise');
      var typingsTpl = gen.copy.createFn('template', 'ts', 'typings');
      typingsTpl('_tsd.txt', 'tsd.d.ts'), {amd: gen.amd});
    },
    src: function () {
      gen.fs.delete('src/*.js');
      gen.bulkDirectory('src', 'src');
      gen.copy.srcTemplate('app.ts', gen.opts.ui);
    },
    tasks: function() {
      gen.copy.buildFile('test.js');
      gen.copy.buildFile('build.js');
    },
    test: function() {
      gen.copy.testFile('unit/app.spec.js');
    }
    root: {
      write: function () {
        for (let name of ['readme', 'karmaConf', 'gulpfile'])
          this[name]();
      },
      typescript: function () {
        gen.copy.rootTemplate('tsconfig.json', {amd: gen.amd});
      },
      readme: function () {
        gen.copy.rootTemplate('_TypeScript.md', 'TypeScript.md'), {atom: gen.props.atom});
      },
      karmaConf: function () {
        gen.copy.rootFile('karma.conf.js');
      },
      gulpfile: function () {
        gen.copy.rootFile('ts-gulpfile.js');
      }
    }
  }
}
