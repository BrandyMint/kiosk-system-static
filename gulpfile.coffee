gulp        = require 'gulp'
requireDir  = require 'require-dir'
runSequence = require 'run-sequence'

requireDir './gulp/tasks', { recurse: true }

gulp.task 'dist', ['[Shared] Clean'], ->
  gulp.start '[Production] MinifyScripts', '[Production] MinifyStyles', '[Production] Fonts', '[Production] Images'

gulp.task 'build', ['[Shared] Clean'], (cb) ->
  runSequence ['[Local] VendorScripts', '[Local] ClientScripts', '[Local] Styles', '[Local] Html', '[Local] Fonts', '[Local] Images', '[Local] Favicons'], cb

gulp.task 'deploy', ['build'], ->
  gulp.start '[Shared] GithubPages'

gulp.task 'server', ['[Shared] SetWatch', 'build'], ->
  gulp.start '[Shared] Watch'