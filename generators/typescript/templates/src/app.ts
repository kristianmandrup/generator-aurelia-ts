/// <reference path="../typings/tsd.d.ts" />

import {Router} from "aurelia-router";

<% if (cssFramework == 'Bootstrap') { %>
import 'bootstrap';
import 'bootstrap/css/bootstrap.css!';
<% } %>
<% if (cssFramework == 'Foundation') { %>
// import 'modernizr';
// import 'fastclick';
import 'foundation';
import 'foundation/css/foundation.css!';
import 'foundation/js/foundation/foundation.topbar';
import 'foundation/js/foundation/foundation.reveal';
<% } %>

export class App {
  static inject = [Router];

  constructor(private router: Router) {
    this.router.configure((config) => {
      config.title = "Aurelia";
      config.map([
        { route: ["", "welcome"], moduleId: "welcome", nav: true, title: "Welcome to Atom" },
        // { route: "flickr", moduleId: "views/flickr", nav: true },
        // { route: "child-router", moduleId: "views/child-router", nav: true, title: "Child Router" }
      ]);
    });
  }
}
