<% if (i18next) { %>import {I18N} from 'aurelia-i18next';<% } %>
<% if (materialize && validation) { %>import {MaterialValidationViewStrategy} from 'aurelia-materialize';<% } %>

export default class PluginConfig {
  plugins = [<%= selected %>];
  configs = {
    'aurelia-auth': (baseConfig) => {
         baseConfig.configure(config);
    }
    <% if (i18next) { %>
    , 'aurelia-i18next': (instance) => {
      // adapt options to your needs (see http://i18next.com/pages/doc_init.html)
      instance.setup({
        resGetPath : 'locale/__lng__/__ns__.json',
        lng : 'de',
        attributes : ['t','i18n'],
        getAsync : true,
        sendMissing : false,
        fallbackLng : 'en',
        debug : false
      });
    }
    <% } %>
    <% if (materialize && validation) { %>
    , 'aurelia-validation': (config) => { config.useViewStrategy(new MaterialValidationViewStrategy()); }
    <% } %>
  };

  constructor(aurelia){
      this.aurelia = aurelia;
  }

  configure() {
    for (let name of this.plugins) {
      let config = this.configs[name];
      config ? this.aurelia.use.plugin(name, config) : this.aurelia.use.plugin(name);
    }
  }
}
