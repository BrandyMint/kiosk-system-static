gulp   = require 'gulp'
del    = require 'del'
config = require('../../config').clean

gulp.task '[Shared] Clean', (cb) ->
  del config.dest, cb