'use strict';

(function () {
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
  var onLoad = function (data) {
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

  window.backend.load(onLoad, onError);

  // ********************сортировка
  var dataPhotos;
  var recommend = document.querySelector('#filter-recommend');
  var popular = document.querySelector('#filter-popular');
  var discussed = document.querySelector('#filter-discussed');
  var random = document.querySelector('#filter-random');

  recommend.addEventListener('click', function () {
    dataPhotos = window.backend.receivedPhotos;

    window.gallery.dataPhotos = dataPhotos;

    window.util.debounce(function () {
      onLoad(dataPhotos);
    });
  });

  popular.addEventListener('click', function () {

    dataPhotos = window.backend.receivedPhotos.slice();

    for (var x = 0; x < dataPhotos.length; x++) {
      for (var y = 0; y < dataPhotos.length - 1; y++) {
        if (dataPhotos[y].likes < dataPhotos[y + 1].likes) {
          var swap = dataPhotos[y + 1];
          dataPhotos[y + 1] = dataPhotos[y];
          dataPhotos[y] = swap;
        }
      }
    }

    window.gallery.dataPhotos = dataPhotos;

    window.util.debounce(function () {
      onLoad(dataPhotos);
    });
  });

  discussed.addEventListener('click', function () {
    dataPhotos = window.backend.receivedPhotos.slice();

    for (var x = 0; x < dataPhotos.length; x++) {
      for (var y = 0; y < dataPhotos.length - 1; y++) {
        if (dataPhotos[y].comments.length < dataPhotos[y + 1].comments.length) {
          var swap = dataPhotos[y + 1];
          dataPhotos[y + 1] = dataPhotos[y];
          dataPhotos[y] = swap;
        }
      }
    }

    window.gallery.dataPhotos = dataPhotos;

    window.util.debounce(function () {
      onLoad(dataPhotos);
    });
  });

  random.addEventListener('click', function () {
    dataPhotos = window.backend.receivedPhotos.slice();

    var compareRandom = function () {
      return Math.random() - 0.5;
    };

    dataPhotos.sort(compareRandom);

    window.gallery.dataPhotos = dataPhotos;

    window.util.debounce(function () {
      onLoad(dataPhotos);
    });
  });

  window.gallery = {
    dataPhotos: dataPhotos
  };
})();
