export default class PluginConfig {
  plugins = [];
  configs = {
    i18next: {}
  };

  constructor(aurelia){
      this.aurelia = aurelia;
  }

  configure() {
    for (let name of this.plugins) {
      this.aurelia.use.plugin(name);
    }
  }
}
