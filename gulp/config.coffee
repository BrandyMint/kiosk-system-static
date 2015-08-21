src   = './app'
build = './build'
dist  = './dist/system'

module.exports = {
  clean: {
    dest: [build, dist]
  }
  browserSync: {
    port: 9000
    open: false
    server: {
      baseDir: [build, src]
    }
    files: [build + '/**']
  }
  ghPages: {
    src: build + '/**/*'
    options: {
      message: 'gh-pages'
    }
  }
  scripts: {
    local: {
      vendor: {
        baseDir: src + '/bower_components'
        dest: build + '/scripts'
        outputName: 'vendor.js'
        extensions: ['.coffee']
      }
      client: {
        entries: src + '/scripts/main.coffee'
        dest: build + '/scripts'
        outputName: 'client.js'
        extensions: ['.coffee', '.js.jsx.coffee']
      }
    }
    production: {
      bundle: {
        baseDir: src
        entries: './scripts/bundle.coffee'
        extensions: ['.coffee', '.js.jsx.coffee']
        dest: dist
        outputName: 'bundle.js'
      }
      minify: {
        src: dist + '/bundle.js'
        dest: dist
        outputName: 'bundle.min.js'
      }
    }
  }
  styles: {
    sass: {
      local: {
        src: src + '/stylesheets/local.scss'
        options: {
          errLogToConsole: true
          sourceComments: 'normal'
          includePaths: [
            './app/stylesheets/'
            './app/bower_components/'
            './app/bower_components/bootstrap-sass-official/assets/stylesheets/bootstrap'
          ]
        }
        dest: build + '/stylesheets'
        outputName: 'local.css'
      }
      production: {
        bundle: {
          src: src + '/stylesheets/production.scss'
          options: {
            errLogToConsole: true
            includePaths: [
              './app/stylesheets/'
              './app/bower_components/'
              './app/bower_components/bootstrap-sass-official/assets/stylesheets/bootstrap'
            ]
          }
          dest: dist
          outputName: 'bundle.css'
        }
        minify: {
          src: dist + '/bundle.css'
          dest: dist
          outputName: 'bundle.min.css'
        }
      }
    }
  }
  html: {
    local: {
      src: src + '/haml/*.haml'
      replace:
        counters: ''
      dest: build
    }
    production: {
      src: src + '/haml/landing2.haml'
      replace:
        js:  'bundle.min.js'
        css: 'bundle.min.css'
      dest: dist
    }
  }
  fonts: {
    local: {
      src: src + '/**/*.{ttf,woff,woff2,eof,eot,svg}'
      dest: build + '/fonts'
    }
    production: {
      src: src + '/**/*.{ttf,woff,woff2,eof,eot,svg}'
      dest: dist + '/fonts'
    }
  }
  images: {
    local: {
      src: src + '/images/**/*'
      dest: build + '/images'
    }
    production: {
      src: src + '/images/**/*'
      dest: dist + '/images'
    }
  }
  favicons: {
    local: {
      src: src + '/favicons/**/*'
      dest: build + '/favicons'
    }
    production: {
      src: src + '/favicons/**/*'
      dest: dist + '/favicons'
    }
  }
}
