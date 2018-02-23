'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var DEBOUNCE_INTERVAL = 500; // ms

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
  * Функция генерирующая случайное число от max до min
  * @param {number} max Максимальное число
  * @param {number} min Минимальное число
  * @return {number}
  */
  var getRandomNumber = function (max, min) {
    var RandomNumber = Math.round(Math.random() * (max - min) + min);

    return RandomNumber;
  };

  /**
   * Функция устраняющая дребезг
   * @param  {type} fun
   */
  var debounce = function (fun) {
    var lastTimeout;
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
  };

  window.util = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    getRandomNumber: getRandomNumber,
    debounce: debounce
  };
})();
