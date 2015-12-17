require './libs'

require './routes/routes'
require './react/components/callback_form/callback_form'

window.ReactUjs.initialize()

calcOfferHeight = ->
  wHeigth = $(window).height()
  hHeigth = $('header').height()
  fheigth = $('footer').height()
  $el = $('object[type="application/pdf"]')

  $el.height(wHeigth - hHeigth - fheigth) if $el.length

$ ->
  $('[ks-owl-carousel2]').owlCarousel
    loop: true
    center: true
    autoWidth: true
    dots: false
    autoplay: true
    autoplayTimeout: 2500
    autoplaySpeed: 1000

  $('[ks-testimonials-slider]').owlCarousel
    items: 1
    loop: true
    center: true
    autoHeight: true
    dots: false
    nav: true
    navText: ''
    autoplay: true
    autoplayTimeout: 2500
    autoplaySpeed: 1000
    themeClass: 'owl-theme owl-nav-arrow owl-testimonials'

  $('[ks-scrollto]').click ->
    id = $(@).attr('href')
    x = $(window).scrollLeft()
    y = $(window).scrollTop()

    window.location.hash = id
    window.scrollTo(x, y)

    $.scrollTo id, 500,
      onAfter: (e) ->
        $(e).find('.form-control').eq(0).focus()

    false

  $('[ks-popover-trigger]').popover
    container: 'body'
    placement: 'top'
    trigger:   'hover'

  $(window).on('resize', calcOfferHeight)
  calcOfferHeight()