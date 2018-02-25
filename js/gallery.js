'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500; // ms

  var pictureTemplate = document.querySelector('#picture-template').content;

  /**
   * Фцнкция генерирующая дом-элемент
   * @param  {type} photoObject объект
   * @param  {type} y порядковый номер объекта
   * @return {type} pictureElement объект
   */
  var generateDomElement = function (photoObject, y) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture img').setAttribute('src', photoObject.url);
    pictureElement.querySelector('.picture-likes').textContent = photoObject.likes;
    pictureElement.querySelector('.picture-comments').textContent = photoObject.comments.length;

    pictureElement.querySelector('a').setAttribute('href', '#');
    pictureElement.querySelector('img').setAttribute('data-id', y);

    return pictureElement;
  };

  /**
   * Функция отрисовывающая сгенерированные дом-элементы
   * @param  {type} data данные полученные с сервера
   */
  var drawElements = function (data) {
    var picturesContainer = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();

    picturesContainer.innerHTML = '';

    for (var y = 0; y < data.length; y++) {
      fragment.appendChild(generateDomElement(data[y], y));
    }
    picturesContainer.appendChild(fragment);
    window.gallery.dataPhotos = data;

    var filters = document.querySelector('.filters');

    filters.classList.remove('filters-inactive');
  };

  var onError = function (message) {
    window.error(message);
  };

  window.backend.load(drawElements, onError);

  // ********************сортировка
  var dataPhotos;
  var recommend = document.querySelector('#filter-recommend');
  var popular = document.querySelector('#filter-popular');
  var discussed = document.querySelector('#filter-discussed');
  var random = document.querySelector('#filter-random');
  var filtersItem = document.querySelectorAll('.filters-item');

  for (var j = 0; j < filtersItem.length; j++) {
    filtersItem[j].addEventListener('keydown', function (evt) {

      window.util.isEnterEvent(evt, function () {

        evt.target.click();
      });
    });
  }

  var showReceivedPhotos = function () {
    dataPhotos = window.backend.receivedPhotos.slice();
    window.gallery.dataPhotos = dataPhotos;

    window.util.debounce(function () {
      drawElements(dataPhotos);
    }, DEBOUNCE_INTERVAL);
  };

  recommend.addEventListener('click', function () {
    showReceivedPhotos();
  });

  popular.addEventListener('click', function () {

    showReceivedPhotos();

    for (var x = 0; x < dataPhotos.length; x++) {
      for (var y = 0; y < dataPhotos.length - 1; y++) {
        if (dataPhotos[y].likes < dataPhotos[y + 1].likes) {
          var swap = dataPhotos[y + 1];
          dataPhotos[y + 1] = dataPhotos[y];
          dataPhotos[y] = swap;
        }
      }
    }
  });

  discussed.addEventListener('click', function () {
    showReceivedPhotos();

    for (var x = 0; x < dataPhotos.length; x++) {
      for (var y = 0; y < dataPhotos.length - 1; y++) {
        if (dataPhotos[y].comments.length < dataPhotos[y + 1].comments.length) {
          var swap = dataPhotos[y + 1];
          dataPhotos[y + 1] = dataPhotos[y];
          dataPhotos[y] = swap;
        }
      }
    }
  });

  random.addEventListener('click', function () {
    showReceivedPhotos();

    var compareRandom = function () {
      return Math.random() - 0.5;
    };

    dataPhotos.sort(compareRandom);
  });

  window.gallery = {
    dataPhotos: dataPhotos
  };
})();
