'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  /**
  * Функция объявляюшее событие при нажатии на кнопку Esc
  * @param  {type} evt    событие
  * @param  {type} action
  */
  var isEscEvent = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  };

  /**
  * Функция объявляюшее событие при нажатии на кнопку Enter
  * @param  {type} evt    событие
  * @param  {type} action
  */
  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
    }
  };

  /**
   * Функция устраняющая дребезг
   * @param  {type} func
   * @param  {type} interval
   */
  var debounce = function (func, interval) {
    var lastTimeout;
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(func, interval);
  };

  window.util = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    debounce: debounce
  };
})();
