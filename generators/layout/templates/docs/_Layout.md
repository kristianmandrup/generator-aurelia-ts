Layout
======

<% if (ui.semantic) { %>

Semantic UI
-----------

`npm run sem-build`

Make symbolic link from `dist`.

`ls -s semantic/dist dist/semantic`

Allows you to reference your customized semantic build from: `app.ts` or `app.js`:

`import 'semantic/semantic';` // javascript`import 'semantic/semantic.css!';`<% } %> Enjoy :)
