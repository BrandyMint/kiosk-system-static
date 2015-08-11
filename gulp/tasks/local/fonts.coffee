gulp         = require 'gulp'
flatten      = require 'gulp-flatten'
handleErrors = require '../../util/handleErrors'
config       = require('../../config').fonts.local

gulp.task '[Local] fonts', ->
  gulp.src config.src
    .on 'error', handleErrors
    # проверить, нужен ли flatten
    .pipe flatten()
    .pipe gulp.dest config.dest