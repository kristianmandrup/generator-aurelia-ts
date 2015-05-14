define(["require", "exports", "aurelia-router", "aurelia-framework"], function (require, exports, aur, auf) {
    var Welcome = (function () {
        function Welcome(theRouter) {
            this.theRouter = theRouter;
            this.addedDynoViewRoute = false;
            this.heading = "Welcome to the Aurelia Navigation App Webstorm!";
            this.firstName = "John";
            this.lastName = "Doe";
        }
        Welcome.inject = function () {
            return [auf.Parent.of(aur.Router)];
        };
        Object.defineProperty(Welcome.prototype, "fullName", {
            get: function () {
                return this.firstName + " " + this.lastName;
            },
            enumerable: true,
            configurable: true
        });
        Welcome.prototype.welcome = function () {
            alert("Welcome, " + this.fullName + "!");
            if (!this.addedDynoViewRoute) {
                this.addedDynoViewRoute = true;
                this.theRouter.addRoute({ route: "dyno-view", moduleId: "views/dyno-view", nav: true, title: "dyno-view" });
                this.theRouter.refreshNavigation();
            }
        };
        return Welcome;
    })();
    exports.Welcome = Welcome;
});
//# sourceMappingURL=welcome.js.map