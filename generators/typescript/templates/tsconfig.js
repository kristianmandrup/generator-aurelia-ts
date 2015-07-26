{
    "version": "1.5.1",
    "compilerOptions": {
        "target": "es5",
        "module": "amd",
        "declaration": false,
        "noImplicitAny": false,
        "removeComments": false,
        "noLib": true,
        "emitDecoratorMetadata": true
    },
    "filesGlob": [
        "./**/*.ts",
        "!./node_modules/**/*.ts"
    ],
    "files": [
        <% if (amd) { %>
        "./typings/aurelia-amd/aurelia-amd.d.ts",
        <%- } else { %>
        "./typings/aurelia/aurelia.d.ts",
        <%- } %>
        "./typings/aurelia/aurelia-animator-css.d.ts",
        "./typings/aurelia/aurelia-binding.d.ts",
        "./typings/aurelia/aurelia-bootstrapper.d.ts",
        "./typings/aurelia/aurelia-dependency-injection.d.ts",
        "./typings/aurelia/aurelia-event-aggregator.d.ts",
        "./typings/aurelia/aurelia-framework.d.ts",
        "./typings/aurelia/aurelia-history-browser.d.ts",
        "./typings/aurelia/aurelia-history.d.ts",
        "./typings/aurelia/aurelia-http-client.d.ts",
        "./typings/aurelia/aurelia-loader-default.d.ts",
        "./typings/aurelia/aurelia-loader.d.ts",
        "./typings/aurelia/aurelia-logging-console.d.ts",
        "./typings/aurelia/aurelia-logging.d.ts",
        "./typings/aurelia/aurelia-metadata.d.ts",
        "./typings/aurelia/aurelia-path.d.ts",
        "./typings/aurelia/aurelia-route-recognizer.d.ts",
        "./typings/aurelia/aurelia-router.d.ts",
        "./typings/aurelia/aurelia-task-queue.d.ts",
        "./typings/aurelia/aurelia-templating-binding.d.ts",
        "./typings/aurelia/aurelia-templating-resources.d.ts",
        "./typings/aurelia/aurelia-templating-router.d.ts",
        "./typings/aurelia/aurelia-templating.d.ts",
        "./typings/es6.d.ts",
        "./typings/reflect-metadata.d.ts",
        "./views/animation-main.ts",
        "./views/main.ts",
        "./views/app.ts",
        "./views/nav-bar.ts",
        "./views/welcome.ts"
    ]
}