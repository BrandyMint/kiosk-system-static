gulp = require 'gulp'

gulp.task '[Shared] watch', ['[Shared] browserSync'], ->
  gulp.watch './app/haml/**/*.haml',               ['[Local] html']
  gulp.watch './app/stylesheets/**/*.{sass,scss}', ['[Local] styles']
  gulp.watch './app/images/**/*',                  ['[Local] images']