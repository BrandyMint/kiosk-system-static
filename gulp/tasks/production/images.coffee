gulp         = require 'gulp'
handleErrors = require '../../util/handleErrors'
config       = require('../../config').images.production

gulp.task '[Production] Images', ->
  gulp.src config.src
    .on 'error', handleErrors
    .pipe gulp.dest config.dest