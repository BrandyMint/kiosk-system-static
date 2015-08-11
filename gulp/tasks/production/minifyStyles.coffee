gulp         = require 'gulp'
rename       = require 'gulp-rename'
minifyCSS    = require 'gulp-minify-css'
handleErrors = require '../../util/handleErrors'
config       = require('../../config').styles.sass.production.minify

gulp.task '[Production] minifyStyles', ['[Production] styles'], ->
  gulp.src config.src
    .pipe minifyCSS()
    .on 'error', handleErrors
    .pipe rename config.outputName
    .pipe gulp.dest config.dest