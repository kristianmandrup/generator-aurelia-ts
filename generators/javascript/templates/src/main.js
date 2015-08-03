import PluginConfig from './plugin-config';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    // .defaultBindingLanguage()
    // .defaultResources()
    // .history()
    // .router()
    // .eventAggregator()

  // load resources (f.ex from modules) and make the globally accessible
  // aurelia.globalizeResources('x', 'y');

  new PluginConfig(aurelia).configure();

  aurelia.start().then(a => a.setRoot());
}
