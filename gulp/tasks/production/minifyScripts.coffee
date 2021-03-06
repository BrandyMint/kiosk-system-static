gulp         = require 'gulp'
uglify       = require 'gulp-uglify'
rename       = require 'gulp-rename'
handleErrors = require '../../util/handleErrors'
config       = require('../../config').scripts.production.minify

gulp.task '[Production] MinifyScripts', ['[Production] Scripts'], ->
  gulp.src config.src
    .pipe uglify()
    .on 'error', handleErrors
    .pipe rename config.outputName
    .pipe gulp.dest config.dest