browserify   = require 'browserify'
gulp         = require 'gulp'
source       = require 'vinyl-source-stream'
bundleLogger = require '../../util/bundleLogger'
handleErrors = require '../../util/handleErrors'
config       = require('../../config').scripts.production.bundle

gulp.task '[Production] Scripts', ->
  bundler = browserify({
    cache: {}, packageCache: {}
    basedir: config.baseDir
    entries: config.entries
    extensions: config.extensions
  }).require './bower_components/jquery/dist/jquery',                                   { expose: 'jquery' }
    .require './bower_components/bootstrap-sass-official/assets/javascripts/bootstrap', { expose: 'bootstrapSass' }
    .require './bower_components/react/react-with-addons',                              { expose: 'react' }
    .require './bower_components/react-mixin-manager/react-mixin-manager',              { expose: 'react-mixin-manager' }
    .require './scripts/resources/react_ujs',                                           { expose: 'reactUjs' }
    .require './bower_components/eventEmitter/EventEmitter',                            { expose: 'eventEmitter' }
    .require './bower_components/accounting.js/accounting',                             { expose: 'accounting' }
    .require './bower_components/lodash/dist/lodash',                                   { expose: 'lodash' }
    .require './bower_components/owl.carousel/dist/owl.carousel',                       { expose: 'owlCarousel2'}
    .require './bower_components/jquery.scrollTo/jquery.scrollTo',                      { expose: 'jquery.scrollTo'}

  bundle = ->
    bundleLogger.start config.outputName

    return bundler
      .bundle()
      .on 'error', handleErrors
      .pipe source(config.outputName)
      .pipe gulp.dest(config.dest)
      .on 'end', ->
        bundleLogger.end config.outputName

  return bundle()