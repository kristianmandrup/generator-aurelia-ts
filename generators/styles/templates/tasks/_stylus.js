var gulp = require('gulp');
var paths = require('../paths');
var stylus = require('gulp-stylus');
var sourcemaps = require('gulp-sourcemaps');
<% if (axis) { %>var axis = require('axis');<% } %>
<% if (rupture) { %>var rupture = require('rupture');<% } %>
<% if (jeet) { %>var jeet = require('jeet');<% } %>
<% if (autoprefixer) { %>var autoprefixer = require('autoprefixer-stylus');<% } %>
<% if (nib) { %>var nib = require('nib'); <% } %>
<% if (fluidity) { %>var fluidity = require('fluidity'); <% } %>
<% if (typographic) { %>var typographic = require('typographic'); <% } %>

gulp.task('stylus', function () {
  gulp.src(paths.stylus)
    .pipe(sourcemaps.init())
    // .pipe(stylus({'include css': true}).use([<%= useList %>]))
    .pipe(stylus({
    	'include css': true, 
    	use: [<%= useList %>]
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styleDest));
});

gulp.task('stylus:watch', function () {
  gulp.watch(paths.stylus, ['stylus']);
});
