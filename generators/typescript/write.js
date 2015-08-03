'use strict';
module.exports = function(gen) {
  return {
    dirs: ['docs', 'root', 'src', 'tasks', 'test', 'typings'],
    docs: function() {
      gen.copy.docsFile('tsd-generation.md', 'typescript/tsd-generation.md');
      let editorFile = `Aurelia-TypeScript-IDE-${gen.props.editor}.md`;
      gen.copy.docsFile(`editors/${editorFile}`, `typescript/editors/${editorFile}`);
    },
    typings: function () {
      gen.copy.bulkDir('typings');
      // gen.fs.delete('typings/es6-promise');
      var typingsTpl = gen.copy.createFn('template', 'ts', 'typings');
      typingsTpl('_tsd.txt', 'tsd.d.ts', {amd: gen.props.amd});
    },
    src: function () {
      gen.fs.delete('src/*.js');
      gen.copy.bulkDir('src');
      gen.copy.srcTpl('app.ts', 'app.ts', gen.props.ui || {});
    },
    tasks: function() {
      gen.copy.buildFile('test.js');
      // gen.copy.buildFile('build.js');
      gen.copy.buildTpl('build.js', {amd: gen.props.amd});
    },
    test: function() {
      gen.copy.testFile('unit/app.spec.js');
    },
    root: function () {
      // typescript
      gen.copy.rootTpl('tsconfig.json', {amd: gen.props.amd});
      // doc
      gen.copy.rootTpl('_TypeScript.md', 'TypeScript.md', {
        atom: gen.props.editor == 'atom'
      });
      // karmaConf
      gen.copy.rootFile('karma.conf.js');
      // gulpfile
      gen.copy.rootFile('ts-gulpfile.js');
    }
  }
}
