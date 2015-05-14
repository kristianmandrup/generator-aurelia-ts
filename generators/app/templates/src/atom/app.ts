import {Router} from "aurelia-router";

export class App {
    static inject = [Router];

    constructor(private router: Router) {
        this.router.configure((config) => {
            config.title = "Aurelia ESRI Atom Sample";
            config.map([
                { route: ["", "welcome"], moduleId: "views/welcome", nav: true, title: "Welcome to Atom" },
                { route: "flickr", moduleId: "views/flickr", nav: true },
                { route: "esri-map", moduleId: "views/esri-map", nav: true, title:"ESRI Map V1" },
                { route: "child-router", moduleId: "views/child-router", nav: true, title: "Child Router" }
            ]);
        });
    }
}
