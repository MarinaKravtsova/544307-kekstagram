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

    for (var y = 0; y < data.length; y++) {
      fragment.appendChild(generateDomElement(data[y], y));
    }
    picturesContainer.appendChild(fragment);
  };

  var onError = function (message) {
    window.error.error(message);
  };

  window.backend.load(onLoad, onError);
})();
