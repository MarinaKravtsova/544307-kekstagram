'use strict';

(function () {
  var URL_UPLOAD = 'https://js.dump.academy/kekstagram';
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  var SUCCESS_STATUS = 200;

  var upLoad = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', URL_UPLOAD);

    xhr.send(data);

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_STATUS) {
        onLoad();
      } else {
        onError('Произошла ошибка соединения');
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
  };

  var receivedPhotos;

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', URL_LOAD);

    xhr.send();

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_STATUS) {
        receivedPhotos = xhr.response;
        onLoad(receivedPhotos);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
      window.backend.receivedPhotos = receivedPhotos;
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
  };

  window.backend = {
    upLoad: upLoad,
    load: load,
    receivedPhotos: receivedPhotos,
  };
})();
