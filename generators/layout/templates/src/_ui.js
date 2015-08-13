<% if (ui.bootstrap) { %>
import 'bootstrap';
import 'bootstrap/css/bootstrap.css!';
<% } %><% if (ui.foundation) { %>
// import 'modernizr';
// import 'fastclick';
import 'foundation';
import 'foundation/css/foundation.css!';
import 'foundation/js/foundation/foundation.topbar';
import 'foundation/js/foundation/foundation.reveal';
// Pace - a loading spinner plugin
// http://github.hubspot.com/pace/docs/welcome/
// import 'pace/themes/silver/loading-bar.css';
<% } %><% if (ui.semantic) { %>
import 'semantic-ui';
// import 'semantic/dist/semantic.css!'; // your themes and customizations
<% } %><% if (ui.framework7) { %>
import 'framework7';
import 'framework7/css/framework7.ios.css!';
import 'framework7/css/framework7.ios.colors.css!';
// TODO: should be a generator choice
// import 'framework7/css/framework7.material.css!';
// import 'framework7/css/framework7.material.colors.css!';
// import 'framework7/css/framework7.material.rtl.css';
<% } %>
