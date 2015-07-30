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

  new PluginConfig(aurelia).configure();

  aurelia.start().then(a => a.setRoot());
}
