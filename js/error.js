'use strict';

(function () {
  /**
   * Функция показывающая окно с сообщением об ошибки
   * @param  {type} message
   */
  var showErrorMessage = function (message) {

    var container = document.createElement('div');

    container.innerHTML = '<div class="my-container" style="position: absolute; margin-left: 35%; z-index: 10; width: 400px; height: 200px; background-color: #c0c0c0;">' +
    '<div style=" width:250px; margin: auto; box-sizing: borderbox; margin-top: 50px;" class="my-message">' + message + '</div>' +
    '<input style=" margin: auto; display: block; margin-top: 50px;" class="my-message-ok" type="button" value="OK"/>' + '</div>';

    document.body.appendChild(container);

    var closeMyMessage = document.querySelector('.my-message-ok');
    var closeMyContainer = document.querySelector('.my-container');

    var closeContainer = function () {
      closeMyContainer.classList.add('hidden');
      container.remove();
    };

    closeMyMessage.addEventListener('click', function () {
      closeContainer();
    });

    document.addEventListener('keydown', function (evt) {
      window.util.isEscEvent(evt, closeContainer);
    });

    document.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, closeContainer);
    });
  };

  window.error = showErrorMessage;
})();
