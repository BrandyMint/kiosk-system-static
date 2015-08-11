gulp   = require 'gulp'
del    = require 'del'
config = require('../../config').clean

gulp.task '[Shared] clean', (cb) ->
  del config.dest, cb