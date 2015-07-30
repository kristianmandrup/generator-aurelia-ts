import {Aurelia} from 'aurelia-framework';

@inject(Aurelia);
export default class PluginConfig {
  plugins = [];
  config = {
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
