# generator-aurelia-ts

[![Build Status](https://secure.travis-ci.org/kristianmandrup/generator-aurelia-ts.png?branch=master)](https://travis-ci.org/kristianmandrup/generator-aurelia-ts)

Based on [aurelia-typescript](https://github.com/kristianmandrup/aurelia-typescript) forked from [@cmichaelgraham](https://github.com/cmichaelgraham/aurelia-typescript)

### CSS Frameworks

### TypeScript

Currently uses bindings from [Aurelia Typings](https://github.com/cmichaelgraham/aurelia-typescript-atom/tree/master/skel-nav-ts/typings/aurelia) as of *July 24th, 2015*.

Please submit pull requests for further updates...

### Install

To install generator-aurelia-ts from npm, run:

```bash
npm install -g generator-aurelia-ts
```

Initiate the app generator (default):

```bash
yo aurelia-ts
```

- application name
- application title
- github account
- email
- name
- CSS Framework:
  - Bootstrap 3.3.x
  - Foundation 5.5.x
  - Semantic UI 2.0.x

It will auto-inject CSS and JS reference tags into your index.html using CDN sources by default.

For Semantic-UI it will reference `/semantic/dist` your semantic build destination folder.
For Semantic UI, you can customize your layout from within the `/semantic` folder. See:
- [Build tools](http://semantic-ui.com/introduction/build-tools.html)
- [Theming](http://semantic-ui.com/usage/theming.html)
- [Recipes](http://semantic-ui.com/introduction/advanced-usage.html)

After setting up the basic project structure, the main generator will ask you to call the `aurelia-ts:typescript` generator.
If you skip TypeScript, know that you can always add TypeScript later using the `typescript` sub-generator.

```bash
yo aurelia-ts:typescript
```

## TODO

Ideas for improvement are welcome :)

## License

MIT
