gulp         = require 'gulp'
handleErrors = require '../../util/handleErrors'
config       = require('../../config').favicons.local

gulp.task '[Local] favicons', ->
  gulp.src config.src
    .on 'error', handleErrors
    .pipe gulp.dest config.dest