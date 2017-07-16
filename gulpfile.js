var gulp = require('gulp');
var browserSync = require('browser-sync').create();

// Static server
gulp.task('browser-sync', function () {
  browserSync.init({
    server: {baseDir: './'},
    port: 8080
  });
});

// Watch files and reload browser on change
gulp.task('watch', function () {

  gulp.watch([
    'index.html',
    'index.js'
  ]).on('change', browserSync.reload);

});

gulp.task('default', ['browser-sync', 'watch']);
