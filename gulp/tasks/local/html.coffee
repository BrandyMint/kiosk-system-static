gulp        = require 'gulp'
haml        = require 'gulp-haml-coffee'
htmlreplace = require 'gulp-html-replace'
browserSync = require 'browser-sync'
config      = require('../../config').html.local
reload      = browserSync.reload

gulp.task '[Local] html', ->
  gulp.src config.src
    .pipe haml()
    .pipe htmlreplace config.replace, keepUnassigned: true
    .pipe gulp.dest config.dest
    .pipe reload({ stream: true })