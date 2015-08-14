(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('./bundle');



},{"./bundle":2}],2:[function(require,module,exports){
require('./libs');

require('./routes/routes');

require('./react/components/callback_form/callback_form');

window.ReactUjs.initialize();

$(function() {
  $('[ks-owl-carousel2]').owlCarousel({
    loop: true,
    center: true,
    autoWidth: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 2500,
    autoplaySpeed: 1000
  });
  $('[ks-scrollto]').click(function() {
    var id, x, y;
    id = $(this).attr('href');
    x = $(window).scrollLeft();
    y = $(window).scrollTop();
    window.location.hash = id;
    window.scrollTo(x, y);
    $.scrollTo(id, 500, {
      onAfter: function(e) {
        return $(e).find('.form-control').eq(0).focus();
      }
    });
    return false;
  });
  return $('[ks-popover-trigger]').popover({
    container: 'body',
    placement: 'top',
    trigger: 'hover'
  });
});



},{"./libs":3,"./react/components/callback_form/callback_form":4,"./routes/routes":5}],3:[function(require,module,exports){
window._ = require('lodash');

window.$ = window.jQuery = require('jquery');

window.React = require('react');

window.ReactUjs = require('reactUjs');

window.Dispatcher = require('flux').Dispatcher;

window.EventEmitter = require('eventEmitter');

window.accounting = require('accounting');

require('react-mixin-manager')(window.React);

require('owlCarousel2');

require('jquery.scrollTo');

require('bootstrapSass');

window.accounting.settings = {
  currency: {
    symbol: 'руб.',
    format: '%v %s',
    decimal: ',',
    thousand: ' ',
    precision: 0
  },
  number: {
    precision: 0,
    thousand: '',
    decimal: ','
  }
};



},{"accounting":"accounting","bootstrapSass":"bootstrapSass","eventEmitter":"eventEmitter","flux":6,"jquery":"jquery","jquery.scrollTo":"jquery.scrollTo","lodash":"lodash","owlCarousel2":"owlCarousel2","react":"react","react-mixin-manager":"react-mixin-manager","reactUjs":"reactUjs"}],4:[function(require,module,exports){

/** @jsx React.DOM */
var CallbackForm_Mixin, ERROR_MESSAGE, ERROR_STATE, INPUT_PLACEHOLDER, INPUT_STATE, KEYCODE_ENTER, OPEN_BUTTON_FULL_TEXT, OPEN_BUTTON_SHORT_TEXT, SEND_MESSAGE, SEND_STATE, SHOW_STATE, SUBMIT_BUTTON_TEXT, SUCCESS_MESSAGE, SUCCESS_STATE;

SHOW_STATE = 'show';

INPUT_STATE = 'input';

SEND_STATE = 'send';

SUCCESS_STATE = 'success';

ERROR_STATE = 'error';

OPEN_BUTTON_FULL_TEXT = 'Оставьте свой телефон и мы вам перезвоним';

OPEN_BUTTON_SHORT_TEXT = 'Оставьте телефон';

SUBMIT_BUTTON_TEXT = 'Отпр.';

INPUT_PLACEHOLDER = 'Введите номер телефона';

SEND_MESSAGE = 'Отправка...';

SUCCESS_MESSAGE = 'Спасибо! Мы скоро свяжемся с Вами';

ERROR_MESSAGE = 'Возникла ошибка! Попробуйте еще раз';

KEYCODE_ENTER = 13;

CallbackForm_Mixin = {
  _sendData: function(phone) {
    return $.ajax({
      url: this.props.postUrl,
      method: 'POST',
      data: {
        phone: phone
      },
      beforeSend: (function(_this) {
        return function() {
          if (_this.isMounted()) {
            return _this.setState({
              currentState: SEND_STATE
            });
          }
        };
      })(this),
      success: (function(_this) {
        return function() {
          if (_this.isMounted()) {
            return _this.setState({
              currentState: SUCCESS_STATE
            });
          }
        };
      })(this),
      error: (function(_this) {
        return function() {
          if (_this.isMounted()) {
            return _this.setState({
              currentState: ERROR_STATE
            });
          }
        };
      })(this)
    });
  }
};

window.CallbackForm = React.createClass({displayName: 'CallbackForm',
  mixins: [CallbackForm_Mixin],
  propTypes: {
    postUrl: React.PropTypes.string.isRequired
  },
  getInitialState: function() {
    return {
      currentState: SHOW_STATE
    };
  },
  render: function() {
    var formContent;
    formContent = (function() {
      switch (this.state.currentState) {
        case SHOW_STATE:
          return CallbackForm_OpenButton({onClick:  this.activateInputState});
        case INPUT_STATE:
          return CallbackForm_Form({onBlur:  this.activateShowState, 
                            onSubmit:  this.handleSubmit});
        case SEND_STATE:
          return CallbackForm_Send(null);
        case SUCCESS_STATE:
          return CallbackForm_Success(null);
        case ERROR_STATE:
          return CallbackForm_Error({onClick:  this.activateInputState});
        default:
          return console.warn('Unknown currentState of CallbackForm component', this.state.currentState);
      }
    }).call(this);
    return React.DOM.div({className: "kiosklanding-callback-form"}, 
              formContent 
            );
  },
  activateShowState: function() {
    return this.setState({
      currentState: SHOW_STATE
    });
  },
  activateInputState: function() {
    return this.setState({
      currentState: INPUT_STATE
    });
  },
  handleSubmit: function(phoneNumber) {
    return this._sendData(phoneNumber);
  }
});

window.CallbackForm_Form = React.createClass({displayName: 'CallbackForm_Form',
  propTypes: {
    onBlur: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired
  },
  render: function() {
    return React.DOM.div({className: "kiosklanding-callback-form-form"}, 
              CallbackForm_SubmitButton({onSubmit:  this.handleButtonSubmit}), 
              CallbackForm_Input({ref: "input", 
                                  onBlur:  this.props.onBlur, 
                                  onEnter:  this.props.onSubmit})
            );
  },
  handleButtonSubmit: function() {
    if (!this.refs.input.isEmpty()) {
      return this.props.onSubmit(this.refs.input.getValue());
    }
  }
});

window.CallbackForm_OpenButton = React.createClass({displayName: 'CallbackForm_OpenButton',
  propTypes: {
    onClick: React.PropTypes.func.isRequired
  },
  render: function() {
    return React.DOM.button({className: "btn kiosklanding-callback-form-open-button", 
                    onClick:  this.props.onClick}, 
              React.DOM.span({className: "hidden-xs hidden-sm"}, OPEN_BUTTON_FULL_TEXT ), 
              React.DOM.span({className: "hidden-md hidden-lg"}, OPEN_BUTTON_SHORT_TEXT )
            );
  }
});

window.CallbackForm_SubmitButton = React.createClass({displayName: 'CallbackForm_SubmitButton',
  propTypes: {
    onSubmit: React.PropTypes.func.isRequired
  },
  render: function() {
    return React.DOM.button({className: "btn kiosklanding-callback-form-submit-button", 
                    onClick:  this.props.onSubmit}, 
              SUBMIT_BUTTON_TEXT 
            );
  }
});

window.CallbackForm_Input = React.createClass({displayName: 'CallbackForm_Input',
  propTypes: {
    onEnter: React.PropTypes.func.isRequired,
    onBlur: React.PropTypes.func.isRequired
  },
  render: function() {
    return React.DOM.input({ref: "input", 
                   type: "tel", 
                   placeholder: INPUT_PLACEHOLDER, 
                   autoFocus: "true", 
                   className: "kiosklanding-callback-form-input", 
                   onBlur:  this.handleBlur, 
                   onKeyDown:  this.handleChange, 
                   onPaste:  this.handleChange});
  },
  handleBlur: function() {
    if (this.isEmpty()) {
      return this.props.onBlur();
    }
  },
  handleChange: function(e) {
    if (e.which === KEYCODE_ENTER && !this.isEmpty()) {
      this.props.onEnter(this.getValue());
      return false;
    }
  },
  getValue: function() {
    return this.refs.input.getDOMNode().value.trim();
  },
  isEmpty: function() {
    return this.getValue() === "";
  }
});

window.CallbackForm_Send = React.createClass({displayName: 'CallbackForm_Send',
  render: function() {
    return React.DOM.div({className: "kiosklanding-callback-form-send"}, SEND_MESSAGE);
  }
});

window.CallbackForm_Success = React.createClass({displayName: 'CallbackForm_Success',
  render: function() {
    return React.DOM.div({className: "kiosklanding-callback-form-success"}, SUCCESS_MESSAGE);
  }
});

window.CallbackForm_Error = React.createClass({displayName: 'CallbackForm_Error',
  propTypes: {
    onClick: React.PropTypes.func.isRequired
  },
  render: function() {
    return React.DOM.div({className: "kiosklanding-callback-form-error-wrap"}, 
              React.DOM.div({className: "kiosklanding-callback-form-error"}, ERROR_MESSAGE), 
              CallbackForm_OpenButton({onClick:  this.props.onClick})
            );
  }
});



},{}],5:[function(require,module,exports){




},{}],6:[function(require,module,exports){
/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

module.exports.Dispatcher = require('./lib/Dispatcher')

},{"./lib/Dispatcher":7}],7:[function(require,module,exports){
/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Dispatcher
 * @typechecks
 */

"use strict";

var invariant = require('./invariant');

var _lastID = 1;
var _prefix = 'ID_';

/**
 * Dispatcher is used to broadcast payloads to registered callbacks. This is
 * different from generic pub-sub systems in two ways:
 *
 *   1) Callbacks are not subscribed to particular events. Every payload is
 *      dispatched to every registered callback.
 *   2) Callbacks can be deferred in whole or part until other callbacks have
 *      been executed.
 *
 * For example, consider this hypothetical flight destination form, which
 * selects a default city when a country is selected:
 *
 *   var flightDispatcher = new Dispatcher();
 *
 *   // Keeps track of which country is selected
 *   var CountryStore = {country: null};
 *
 *   // Keeps track of which city is selected
 *   var CityStore = {city: null};
 *
 *   // Keeps track of the base flight price of the selected city
 *   var FlightPriceStore = {price: null}
 *
 * When a user changes the selected city, we dispatch the payload:
 *
 *   flightDispatcher.dispatch({
 *     actionType: 'city-update',
 *     selectedCity: 'paris'
 *   });
 *
 * This payload is digested by `CityStore`:
 *
 *   flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'city-update') {
 *       CityStore.city = payload.selectedCity;
 *     }
 *   });
 *
 * When the user selects a country, we dispatch the payload:
 *
 *   flightDispatcher.dispatch({
 *     actionType: 'country-update',
 *     selectedCountry: 'australia'
 *   });
 *
 * This payload is digested by both stores:
 *
 *    CountryStore.dispatchToken = flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'country-update') {
 *       CountryStore.country = payload.selectedCountry;
 *     }
 *   });
 *
 * When the callback to update `CountryStore` is registered, we save a reference
 * to the returned token. Using this token with `waitFor()`, we can guarantee
 * that `CountryStore` is updated before the callback that updates `CityStore`
 * needs to query its data.
 *
 *   CityStore.dispatchToken = flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'country-update') {
 *       // `CountryStore.country` may not be updated.
 *       flightDispatcher.waitFor([CountryStore.dispatchToken]);
 *       // `CountryStore.country` is now guaranteed to be updated.
 *
 *       // Select the default city for the new country
 *       CityStore.city = getDefaultCityForCountry(CountryStore.country);
 *     }
 *   });
 *
 * The usage of `waitFor()` can be chained, for example:
 *
 *   FlightPriceStore.dispatchToken =
 *     flightDispatcher.register(function(payload) {
 *       switch (payload.actionType) {
 *         case 'country-update':
 *           flightDispatcher.waitFor([CityStore.dispatchToken]);
 *           FlightPriceStore.price =
 *             getFlightPriceStore(CountryStore.country, CityStore.city);
 *           break;
 *
 *         case 'city-update':
 *           FlightPriceStore.price =
 *             FlightPriceStore(CountryStore.country, CityStore.city);
 *           break;
 *     }
 *   });
 *
 * The `country-update` payload will be guaranteed to invoke the stores'
 * registered callbacks in order: `CountryStore`, `CityStore`, then
 * `FlightPriceStore`.
 */

  function Dispatcher() {
    this.$Dispatcher_callbacks = {};
    this.$Dispatcher_isPending = {};
    this.$Dispatcher_isHandled = {};
    this.$Dispatcher_isDispatching = false;
    this.$Dispatcher_pendingPayload = null;
  }

  /**
   * Registers a callback to be invoked with every dispatched payload. Returns
   * a token that can be used with `waitFor()`.
   *
   * @param {function} callback
   * @return {string}
   */
  Dispatcher.prototype.register=function(callback) {
    var id = _prefix + _lastID++;
    this.$Dispatcher_callbacks[id] = callback;
    return id;
  };

  /**
   * Removes a callback based on its token.
   *
   * @param {string} id
   */
  Dispatcher.prototype.unregister=function(id) {
    invariant(
      this.$Dispatcher_callbacks[id],
      'Dispatcher.unregister(...): `%s` does not map to a registered callback.',
      id
    );
    delete this.$Dispatcher_callbacks[id];
  };

  /**
   * Waits for the callbacks specified to be invoked before continuing execution
   * of the current callback. This method should only be used by a callback in
   * response to a dispatched payload.
   *
   * @param {array<string>} ids
   */
  Dispatcher.prototype.waitFor=function(ids) {
    invariant(
      this.$Dispatcher_isDispatching,
      'Dispatcher.waitFor(...): Must be invoked while dispatching.'
    );
    for (var ii = 0; ii < ids.length; ii++) {
      var id = ids[ii];
      if (this.$Dispatcher_isPending[id]) {
        invariant(
          this.$Dispatcher_isHandled[id],
          'Dispatcher.waitFor(...): Circular dependency detected while ' +
          'waiting for `%s`.',
          id
        );
        continue;
      }
      invariant(
        this.$Dispatcher_callbacks[id],
        'Dispatcher.waitFor(...): `%s` does not map to a registered callback.',
        id
      );
      this.$Dispatcher_invokeCallback(id);
    }
  };

  /**
   * Dispatches a payload to all registered callbacks.
   *
   * @param {object} payload
   */
  Dispatcher.prototype.dispatch=function(payload) {
    invariant(
      !this.$Dispatcher_isDispatching,
      'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.'
    );
    this.$Dispatcher_startDispatching(payload);
    try {
      for (var id in this.$Dispatcher_callbacks) {
        if (this.$Dispatcher_isPending[id]) {
          continue;
        }
        this.$Dispatcher_invokeCallback(id);
      }
    } finally {
      this.$Dispatcher_stopDispatching();
    }
  };

  /**
   * Is this Dispatcher currently dispatching.
   *
   * @return {boolean}
   */
  Dispatcher.prototype.isDispatching=function() {
    return this.$Dispatcher_isDispatching;
  };

  /**
   * Call the callback stored with the given id. Also do some internal
   * bookkeeping.
   *
   * @param {string} id
   * @internal
   */
  Dispatcher.prototype.$Dispatcher_invokeCallback=function(id) {
    this.$Dispatcher_isPending[id] = true;
    this.$Dispatcher_callbacks[id](this.$Dispatcher_pendingPayload);
    this.$Dispatcher_isHandled[id] = true;
  };

  /**
   * Set up bookkeeping needed when dispatching.
   *
   * @param {object} payload
   * @internal
   */
  Dispatcher.prototype.$Dispatcher_startDispatching=function(payload) {
    for (var id in this.$Dispatcher_callbacks) {
      this.$Dispatcher_isPending[id] = false;
      this.$Dispatcher_isHandled[id] = false;
    }
    this.$Dispatcher_pendingPayload = payload;
    this.$Dispatcher_isDispatching = true;
  };

  /**
   * Clear bookkeeping used for dispatching.
   *
   * @internal
   */
  Dispatcher.prototype.$Dispatcher_stopDispatching=function() {
    this.$Dispatcher_pendingPayload = null;
    this.$Dispatcher_isDispatching = false;
  };


module.exports = Dispatcher;

},{"./invariant":8}],8:[function(require,module,exports){
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule invariant
 */

"use strict";

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (false) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        'Invariant Violation: ' +
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

},{}]},{},[1]);
