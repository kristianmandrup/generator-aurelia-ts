Aurelia Turbo Start generator
=============================

[![Build Status](https://secure.travis-ci.org/kristianmandrup/generator-aurelia-ts.png?branch=master)](https://travis-ci.org/kristianmandrup/generator-aurelia-ts)

Generate an [Aurelia](aurelia.io) Quick Start project with: - [Aurelia CLI](http://www.programwitherik.com/what-is-aurelia-cli-how-does-it-work/) - [SASS](http://sass-lang.com/) or [Stylus](https://learnboost.github.io/stylus/) CSS extenstion language - TypeScript definitions - A popular UI framework of your choice - Plugins of your choice installed - Aurelia CLI for rapid development...

### Generators

-	`aurelia-ts` (new app)
-	`aurelia-ts:decorate` (decorate app)
-	`aurelia-ts:plugins` (add plugins)
-	`aurelia-ts:cli` (add CLI)
-	`aurelia-ts:styles` (add CSS preprocessors: SASS/Stylus )
-	`aurelia-ts:layout` (add ui/layout framework:)
-	`aurelia-ts:javascript` (javascript app)
-	`aurelia-ts:typescript` (typescript app)
-	`aurelia-ts:state` (add state or stores)
-	`aurelia-ts:amp` - (add Ampersand models/collections)

Now includes IE9 support ;)

### Compatibility

The genrator has been tested successfully on Node.js 0.12.7

We recommend that you use [nvm](https://github.com/creationix/nvm) to manage your system installed Node versions.

Install NVM

`curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.25.4/install.sh | bash`

We highly recommend using [IOjs](https://iojs.org/en/index.html) or the latest Node.js (>0.12)

To install IOjs via NVM:

-	`nvm ls-remote` - list of Node and IOjs versions available
-	`nvm install iojs` - install latest IOjs
-	`nvm alias default iojs` - make iojs your default (optional)
-	`node -v`

### Layout Frameworks

Run: `yo aurelia-ts:layout`

The layout generator currently supports:

#### Font frameworks

-	[Font Awesome](http://fortawesome.github.io/Font-Awesome/)

#### CSS frameworks

-	[Bootstrap](http://getbootstrap.com)
-	[Bootstrap Material](https://fezvrasta.github.io/bootstrap-material-design/)
-	[Zurb Foundation](http://foundation.zurb.com/)
-	[Semantic UI](semantic-ui.com)
-	[Framework7](http://www.idangero.us/framework7)

Make a pull request to make the generator support your favorite alternative UI/Layout framework (see *Contributing* below).

### TypeScript

We currently use [Aurelia Typings](https://github.com/cmichaelgraham/aurelia-typescript-atom/tree/master/skel-nav-ts/typings/aurelia) as of *July 24th, 2015*.

We would like to soon integrate use of the [aurelia-amd-bundler](https://github.com/cmichaelgraham/aurelia-amd-bundler)

Ideas on how to best achieve TypeScript support are most welcome!

### Install

To install *generator-aurelia-ts* via *npm*, run:

```bash
npm install -g generator-aurelia-ts
```

### Run

Create a folder for your app:

```bash
mkdir my-app
cd my-app
```

Initiate the app generator (default):

```bash
yo aurelia-ts
```

Note: If for some reason it tries to install in a parent folder, check out [Issue #4](https://github.com/kristianmandrup/generator-aurelia-ts/issues/4#issuecomment-130134599)

Answer the prompts in order to generate your Aurelia project to suit your preferences.

### Generator arguments & options

You can pass the application name as the first argument

```bash
yo aurelia-ts my-app
```

Run with TypeScript `--ts` and Plugins `--plugins` generators auto enabled.

```bash
yo aurelia-ts --ts --plugins
```

### CSS language extension options

The generator also supports *SCSS* and *Stylus* via `--scss` and `--stylus` options

```bash
yo aurelia-ts --stylus
```

### Stylus plugins

-	[Nib](https://github.com/tj/nib)
-	[Axis](http://axis.netlify.com/)
-	[Rupture](http://jenius.github.io/rupture/)
-	[Fluidity](www.fluiditycss.com)
-	[Jeet](http://jeet.gs/)

We highly recommend watching these [Stylus tutorial videos](https://www.youtube.com/playlist?list=PLLnpHn493BHFWQGA1PcyQZWAfR96a4CkH) to get a feel and understanding of the power of using Stylus with plugins and get over the temptation to use Bootstrap or kin for all your styling needs. Break your bad habits ;)

### UI framework option

You can also pass the UI framework as a `--ui` option

```bash
yo aurelia-ts --stylus --ui sem
```

The ui can take any of these shorthands: - `bs` Bootstrap - `zurb` Zurb Foundation - `sem` Semantic-UI - `f7` Framework7

### Prompts

You will be prompted for the following:

-	application name?
-	application title?
-	github account?
-	Author email?
-	Author name?
-	Install Aurelia CLI?
-	Install TypeScript?
-	Visual Studio?

TypeScript
----------

After setting up the basic project structure, the main generator will ask if you want TypeScript. You can always add TypeScript to your project at any time by calling the `typescript` sub-generator.

```bash
yo aurelia-ts:typescript
```

Note: The `typescript` generator will clear your javascript files and rewrite the skeleton files as `.ts` files. Be sure you have committed your code before running any generator!

### Plugins

Experimental support for installing around a dozen Aurelia plugins:

`yo aurelia-ts:plugins`

-	[Flux](https://github.com/tfrydrychewicz/aurelia-flux)
-	[Authentication](https://github.com/paulvanbladel/aureliauth)
-	[Validation](https://github.com/aurelia/validation)
-	[i18next](https://github.com/zewa666/aurelia-i18next)
-	[Computed properties](https://github.com/jdanyow/aurelia-computed/)
-	[Bootstrap Modal](https://github.com/PWKad/aurelia-bs-modal)
-	[Rethink DB bindings](https://github.com/kristianmandrup/aurelia-rethink-bindtable)
-	[Breeze bindings](https://github.com/jdanyow/aurelia-breeze)
-	...
-	(TODO: Add YOUR favorite plugins...)

See [jspm registry](https://github.com/jspm/registry/blob/master/registry.json) for predefined entries setup to be installed by name, such as: `jspm install semantic-ui`

Frameworks
----------

### Semantic-UI

For *Semantic-UI* you should reference `/semantic/dist` in `app.js`

```js
// import '../semantic/dist'; // your themes and customizations
```

You can then customize your layout from within the `/semantic` folder using: - [Build tools](http://semantic-ui.com/introduction/build-tools.html) - [Theming](http://semantic-ui.com/usage/theming.html) - [Recipes](http://semantic-ui.com/introduction/advanced-usage.html)

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

For the `layout` generator:

Add a new entry to the `repoKeyMap` at the top, such as:

```js
var repoKeyMap = {
  ...,
  'Framework7': 'github:nolimits4web/Framework7@master'
}
```

Add the [JSPM](jspm.io) imports to `templates/src/app.js`. JSPM can load css via the [JSPM CSS loader](https://github.com/geelen/jspm-loader-css)

See the [framework7 distribution folder](https://github.com/nolimits4web/Framework7/tree/master/dist) and use it to guide your ES2015 module imports.

Also check out the [package.json](https://github.com/nolimits4web/Framework7/tree/master/package.json) for the project.

We can see, it has a `main` entry pointing to `dist/js/framework7.js` so we can safely import the js via `import 'framework7';`

The `css` imports needs to reference the `dist` folder structure directly.

We add the following to `src/_ui.js` template. The same template will be used for TS.

```js
<% if (framework7) { %>
import 'framework7';
import 'framework7/css/framework7.ios.css!';
import 'framework7/css/framework7.ios.colors.css!';
<% } %>
```

Finally test that it all works by adding a unit test, such as:

`test/test-layout-framework7.js`

Then run `npm test`. If all tests pass, you can make a PR :)

*Troubleshooting*

If while developing the generator you get an error such as:

`Uncaught SyntaxError: Unexpected token return`

Most likely due to an [EJS](http://ejs.co/) template error (typically a missing `}` in an `if` clause).

### Contributors

-	[@telekosmos](https://github.com/telekosmos)
-	[@kristianmandrup](https://github.com/kristianmandrup)
-	You :)

TODO
----

Ideas for improvement are welcome :)

-	Support for Aurelia's built in `.d.ts` files [Issue #7](https://github.com/kristianmandrup/generator-aurelia-ts/issues/7)
-	More UI frameworks ...??
-	Support for more editors/IDEs: Visual Studio, WebStorm etc.

License
-------

MIT
