# generator-aurelia-ts

[![Build Status](https://secure.travis-ci.org/kristianmandrup/generator-aurelia-ts.png?branch=master)](https://travis-ci.org/kristianmandrup/generator-aurelia-ts)

Generate an [Aurelia](aurelia.io) project skeleton with:
- [Aurelia CLI](http://www.programwitherik.com/what-is-aurelia-cli-how-does-it-work/)
- SCSS or Stylus
- TypeScript definitions (optional)
- A popular UI framework of your choice

### CSS Frameworks

This generator currently supports:
- [Bootstrap](http://getbootstrap.com) 3.3.x
- [Zurb Foundation](http://foundation.zurb.com/) 5.5.x
- [Semantic UI](semantic-ui.com) 2.0.x
- [Framework7 - F7*](http://www.idangero.us/framework7)

Make a pull request to make the generator support your favorite alternative UI framework (see *Contributing* below).

### TypeScript

We currently use [Aurelia Typings](https://github.com/cmichaelgraham/aurelia-typescript-atom/tree/master/skel-nav-ts/typings/aurelia) as of *July 24th, 2015*.

Note: We don't yet fully trust the automatic `d.ts` file generator :P

Please submit pull requests for further TypeScript Definition updates or help integrate with auto generation (when mature).

### Plugins

Experimental support for installing various Aurelia plguins:

`yo aurelia-ts:plugins`

## Install

To install generator-aurelia-ts from npm, run:

```bash
npm install -g generator-aurelia-ts
```

## Run

Initiate the app generator (default):

```bash
yo aurelia-ts
```

The generator also supports SCSS and Stylus via options: `--scss` and `--stylus`

```bash
yo aurelia-ts --stylus
```

You will be prompted for the following:
- Your application name
- Yourapplication title
- Your github account
- Your email
- Your name
- UI Framework:
  - Bootstrap 3.3.x
  - Foundation 5.5.x
  - Semantic UI 2.0.x
  - Framework7 1.2.x
- Install Aurelia CLI (default: no)

You can also pass the UI framework as a `--ui` option

```bash
yo aurelia-ts --stylus --ui sem
```

The ui can take any of these shorthands:
- `bs` Bootstrap
- `zurb` Zurb Foundation
- `sem` Semantic-UI
- `f7` Framework7

### Semantic-UI

For *Semantic-UI* you should reference `/semantic/dist` in `app.js`

```js
// import '../semantic/dist'; // your themes and customizations
```

You can then customize your layout from within the `/semantic` folder. See:
- [Build tools](http://semantic-ui.com/introduction/build-tools.html)
- [Theming](http://semantic-ui.com/usage/theming.html)
- [Recipes](http://semantic-ui.com/introduction/advanced-usage.html)

## TypeScript

After setting up the basic project structure, the main generator will ask you to call the `aurelia-ts:typescript` generator.

If you skip TypeScript, know that you can always add TypeScript later using the `typescript` sub-generator.

```bash
yo aurelia-ts:typescript
```

### Contributing

As you add features, add [yeoman tests](http://yeoman.io/authoring/testing.html)

`npm test`

Use [npm link](http://justjs.com/posts/npm-link-developing-your-own-npm-modules-without-tears) to install it locally to test it as you develop ;)

Create a symbolic link to your local generator:

`npm link generator-aurelia-ts`

Now use the linked package and test it

`yo aurelia-ts`

Profit!

### Adding your Favorite Framework to the generator

Example [F7](http://www.idangero.us/framework7):

In `package.json` insert the `"framework7"` as a jspm dependency. Note that it includes the [systemjs/plugin-css](https://github.com/systemjs/plugin-css) at the end, which is the [SystemJS](https://github.com/systemjs/systemjs) CSS loader.

```json
  "jspm": {
    "dependencies": {
      ...
    <% if (cssFramework == 'Framework7') { %>
    "framework7": "github:nolimits4web/Framework7@^1.2.0",
    <% } %>
    "css": "github:systemjs/plugin-css@^0.1.9"
  },
```

Add the [JSPM](jspm.io) imports to `templates/src/app.js`.
JSPM can load css via the [JSPM css loader](https://github.com/geelen/jspm-loader-css)

See the [framework7 distribution folder](https://github.com/nolimits4web/Framework7/tree/master/dist) and use it to guide your ES2015 module imports.

Also check out the [package.json](https://github.com/nolimits4web/Framework7/tree/master/package.json) for the project.

We can see, it has a `main` entry pointing to `dist/js/framework7.js` so we can safely import the js via `import 'framework7';`

The `css` imports needs to reference the `dist` folder structure directly.

```js
<% if (cssFramework == 'Framework7') { %>
import 'framework7';
import 'framework7/css/framework7.ios.css!';
import 'framework7/css/framework7.ios.colors.css!';
<% } %>
```

For a finishing touch you can add/customize the Application load spinner in `_index.html`

```html
  <% if (cssFramework == 'Bootstrap') %>
  <i class="fa fa-spinner fa-spin"></i>
  <% } %>
```

Finally test that it all works by adding a unit test, such as:

`test/test-app-framework7.js`

Then run `npm test`. If all tests pass, you can do your pull request :)

*Troubleshooting*

If while developing the generator you get an error such as:

`Uncaught SyntaxError: Unexpected token return`

Most likely due to an [EJS](http://ejs.co/) template error (typically a missing `{` in an `if` clause). Likely it has nothing to do with your generator javascript ;)

### Contributors

- [@telekosmos](https://github.com/telekosmos)
- [@kristianmandrup](https://github.com/kristianmandrup)
- You :)

## TODO

Ideas for improvement are welcome :)

- ESLint (stage 0)

## License

MIT
