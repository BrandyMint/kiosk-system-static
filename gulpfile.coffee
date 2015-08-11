gulp        = require 'gulp'
requireDir  = require 'require-dir'
runSequence = require 'run-sequence'

requireDir './gulp/tasks', { recurse: true }

gulp.task 'dist', ['[Shared] clean'], ->
  gulp.start '[Production] minifyScripts', '[Production] minifyStyles', '[Production] fonts', '[Production] images'

gulp.task 'build', ['[Shared] clean'], (cb) ->
  runSequence ['[Local] vendorScripts', '[Local] clientScripts', '[Local] styles', '[Local] html', '[Local] fonts', '[Local] images', '[Local] favicons'], cb

gulp.task 'server', ['build'], ->
  gulp.start '[Shared] watch'