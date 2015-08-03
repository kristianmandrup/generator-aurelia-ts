<%= title %>
============

<%= desc %>

Tasks
-----

The following npm tasks are available:

-	`npm test` : Run Tests
-	`npm build` : Build
-	`npm start` : Start server
-	`npm run watch` : Watch files and build on change
-	`npm run ts-build` : Build TypeScript files

Troubleshooting
---------------

If for any reason your app is not served correctly, Make sure

-	you have all your jspm dependencies listed in the `package.json` file. Run `jspm install`.
-	you have an entry for the UI framework you have chosen.
-	you have run `gulp build` and have a `/build` folder populated with `js` and `html` files.
-	If you are using Semantic-UI, you have run `npm run sem-build`
-	If you are using a CSS lang extension (Stylus or Sass) you have run `gulp css:build` or `gulp styles:watch`

```json
  "jspm": {
    "dependencies": {
      "aurelia-animator-css": "github:aurelia/animator-css@^0.13.0",
      ...
      "aurelia-templating-router": "github:aurelia/templating-router@^0.14.0",
      "css": "github:systemjs/plugin-css@^0.1.9",
      "font-awesome": "npm:font-awesome@^4.3.0",
      "semantic-ui": "github:Semantic-Org/Semantic-UI@^2.0.7"
    },
```
