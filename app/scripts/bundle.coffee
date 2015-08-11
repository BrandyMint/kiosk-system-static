require './libs'

require './routes/routes'
require './react/components/callback_form/callback_form'

window.ReactUjs.initialize()

$ ->
  $('[ks-owl-carousel2]').owlCarousel
    loop: true
    center: true
    autoWidth: true
    dots: false
    autoplay: true
    autoplayTimeout: 2500
    autoplaySpeed: 1000

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