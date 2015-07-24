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

// Pace - a loading spinner plugin
// http://github.hubspot.com/pace/docs/welcome/
// import 'pace/themes/silver/loading-bar.css';

<% } %>
<% if (cssFramework == 'Semantic-UI') { %>
import 'semantic-ui';
import 'semantic-ui/css/semantic-ui.css!';
// import '../semantic/dist'; // your themes and customizations
<% } %>
<% if (cssFramework == 'Framework7') { %>
import 'framework7';
import 'framework7/css/framework7.ios.css!';
import 'framework7/css/framework7.ios.colors.css!';

// TODO: should be a generator choice
// import 'framework7/css/framework7.material.css!';
// import 'framework7/css/framework7.material.colors.css!';
// import 'framework7/css/framework7.material.rtl.css';
<% } %>

export class App {
  configureRouter(config, router){
    config.title = 'Aurelia';
    config.map([
      { route: ['','welcome'],  moduleId: './welcome',      nav: true, title:'Welcome' }
    ]);

    this.router = router;
  }
}
