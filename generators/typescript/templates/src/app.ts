/// <reference path="../typings/tsd.d.ts" />

export class App {
  static inject = [Router];

  constructor(private router: Router) {
    this.router.configure((config) => {
      config.title = "Aurelia";
      config.map([
        { route: ["", "welcome"], moduleId: "welcome", nav: true, title: "Welcome" }
      ]);
    });
  }
}
