###* @jsx React.DOM ###

SHOW_STATE             = 'show'
INPUT_STATE            = 'input'
SEND_STATE             = 'send'
SUCCESS_STATE          = 'success'
ERROR_STATE            = 'error'

OPEN_BUTTON_FULL_TEXT  = 'Оставьте свой телефон и мы вам перезвоним'
OPEN_BUTTON_SHORT_TEXT = 'Оставьте телефон'

SUBMIT_BUTTON_TEXT     = 'Отпр.'

INPUT_PLACEHOLDER      = 'Введите номер телефона'

SEND_MESSAGE           = 'Отправка...'
SUCCESS_MESSAGE        = 'Спасибо! Мы скоро свяжемся с Вами'
ERROR_MESSAGE          = 'Возникла ошибка! Попробуйте еще раз'

KEYCODE_ENTER          = 13


CallbackForm_Mixin =
  _sendData: (phone) ->
    $.ajax
      url: @props.postUrl
      method: 'POST'
      data:
        phone: phone
      beforeSend: => @setState(currentState: SEND_STATE) if @isMounted()
      success:    => @setState(currentState: SUCCESS_STATE) if @isMounted()
      error:      => @setState(currentState: ERROR_STATE) if @isMounted()


window.CallbackForm = React.createClass
  mixins: [CallbackForm_Mixin]

  propTypes:
    postUrl: React.PropTypes.string.isRequired

  getInitialState: -> currentState: SHOW_STATE

  render: ->
    formContent = switch @state.currentState
      when SHOW_STATE
        `<CallbackForm_OpenButton onClick={ this.activateInputState } />`
      when INPUT_STATE
        `<CallbackForm_Form onBlur={ this.activateShowState }
                            onSubmit={ this.handleSubmit } />`
      when SEND_STATE
        `<CallbackForm_Send />`
      when SUCCESS_STATE
        `<CallbackForm_Success />`
      when ERROR_STATE
        `<CallbackForm_Error onClick={ this.activateInputState } />`
      else console.warn 'Unknown currentState of CallbackForm component', @state.currentState

    return `<div className='kiosklanding-callback-form'>
              { formContent }
            </div>`

  activateShowState: -> @setState(currentState: SHOW_STATE)

  activateInputState: -> @setState(currentState: INPUT_STATE)

  handleSubmit: (phoneNumber) ->
    @_sendData phoneNumber


window.CallbackForm_Form = React.createClass
  propTypes:
    onBlur:   React.PropTypes.func.isRequired
    onSubmit: React.PropTypes.func.isRequired

  render: ->
    return `<div className='kiosklanding-callback-form-form'>
              <CallbackForm_SubmitButton onSubmit={ this.handleButtonSubmit } />
              <CallbackForm_Input ref="input"
                                  onBlur={ this.props.onBlur }
                                  onEnter={ this.props.onSubmit } />
            </div>`

  handleButtonSubmit: ->
    @props.onSubmit @refs.input.getValue() unless @refs.input.isEmpty()


window.CallbackForm_OpenButton = React.createClass
  propTypes:
    onClick: React.PropTypes.func.isRequired

  render: ->
    return `<button className='btn kiosklanding-callback-form-open-button'
                    onClick={ this.props.onClick }>
              <span className='hidden-xs hidden-sm'>{ OPEN_BUTTON_FULL_TEXT }</span>
              <span className='hidden-md hidden-lg'>{ OPEN_BUTTON_SHORT_TEXT }</span>
            </button>`


window.CallbackForm_SubmitButton = React.createClass
  propTypes:
    onSubmit: React.PropTypes.func.isRequired

  render: ->
    return `<button className='btn kiosklanding-callback-form-submit-button'
                    onClick={ this.props.onSubmit }>
              { SUBMIT_BUTTON_TEXT }
            </button>`


window.CallbackForm_Input = React.createClass
  propTypes:
    onEnter: React.PropTypes.func.isRequired
    onBlur:  React.PropTypes.func.isRequired

  render: ->
    return `<input ref='input'
                   type='tel'
                   placeholder={ INPUT_PLACEHOLDER }
                   autoFocus='true'
                   className='kiosklanding-callback-form-input'
                   onBlur={ this.handleBlur }
                   onKeyDown={ this.handleChange }
                   onPaste={ this.handleChange } />`

  handleBlur: ->
    @props.onBlur() if @isEmpty()

  handleChange: (e) ->
    if e.which == KEYCODE_ENTER and not @isEmpty()
      @props.onEnter @getValue()
      return false

  getValue: ->
    @refs.input.getDOMNode().value.trim()

  isEmpty: ->
    @getValue() is ""


window.CallbackForm_Send = React.createClass
  render: ->
    return `<div className='kiosklanding-callback-form-send'>{SEND_MESSAGE}</div>`


window.CallbackForm_Success = React.createClass
  render: ->
    return `<div className='kiosklanding-callback-form-success'>{SUCCESS_MESSAGE}</div>`


window.CallbackForm_Error = React.createClass
  propTypes:
    onClick: React.PropTypes.func.isRequired

  render: ->
    return `<div className='kiosklanding-callback-form-error-wrap'>
              <div className='kiosklanding-callback-form-error'>{ERROR_MESSAGE}</div>
              <CallbackForm_OpenButton onClick={ this.props.onClick } />
            </div>`
