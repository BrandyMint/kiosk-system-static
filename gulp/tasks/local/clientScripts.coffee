browserify     = require 'browserify'
watchify       = require 'watchify'
gulp           = require 'gulp'
source         = require 'vinyl-source-stream'
bundleLogger   = require '../../util/bundleLogger'
handleErrors   = require '../../util/handleErrors'
config         = require('../../config').scripts.local.client

gulp.task '[Local] clientScripts', ->
  bundler = browserify({
    cache: {}, packageCache: {}
    entries: config.entries
    extensions: config.extensions
  }).external 'jquery'
    .external 'bootstrapSass'
    .external 'react'
    .external 'react-mixin-manager'
    .external 'reactUjs'
    .external 'eventEmitter'
    .external 'accounting'
    .external 'lodash'
    .external 'owlCarousel2'
    .external 'jquery.scrollTo'

  bundle = ->
    bundleLogger.start config.outputName

    return bundler
             .bundle()
             .on 'error', handleErrors
             .pipe source(config.outputName)
             .pipe gulp.dest(config.dest)
             .on 'end', ->
               bundleLogger.end config.outputName

  bundler = watchify bundler
  bundler.on 'update', bundle

  return bundle()