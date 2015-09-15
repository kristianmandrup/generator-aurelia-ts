Styles
======

CSS Preprocessing tasks
-----------------------

-	`gulp css:build` build css from CSS lang extension files (Stylus, Sass)
-	`gulp css:watch` watch CSS lang extension files and build on change

These builds will result in css files which will be dumped in `styles/css` which is being watched by `gulp watch`. Hence they will result in a new distribution build and browser sync reload.

<% if (stylus) { %>Extra goodies for Stylus
-------------------------------------------

For Stylus, the following Stylus extension libraries are included in order to greatly improve Stylus based styling.

-	[Nib](https://github.com/tj/nib) and [screencast](http://www.screenr.com/M6a)
-	[Axis](http://axis.netlify.com/)
-	[Rupture](http://jenius.github.io/rupture/) nice "break points" ;)
-	[Fluidity](www.fluiditycss.com)
-	[Jeet](http://jeet.gs/) super awesome framework!

With these libraries, it should in large part be unnecessary to add presentational classes to your HTML, keeping it clean and ensuring true decoupling of your document structure from presentational logic.<% } %>
