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

    data.forEach(function (x, y) {
      fragment.appendChild(generateDomElement(data[y], y));
    });

    picturesContainer.appendChild(fragment);
    window.gallery.dataPhotos = data;

    var filters = document.querySelector('.filters');

    filters.classList.remove('filters-inactive');
  };

  window.backend.load(drawElements, window.error);

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

    dataPhotos.sort(function (a, b) {
      return b.likes - a.likes;
    });
  });

  discussed.addEventListener('click', function () {
    showReceivedPhotos();

    dataPhotos.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
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
