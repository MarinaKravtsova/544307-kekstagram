'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture-template').content;

  /**
   * Фцнкция генерирующая дом-элемент
   * @param  {type} photoObject объект
   * @return {type} pictureElement объект
   */
  var generateDomElement = function (photoObject) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture img').setAttribute('src', photoObject.url);
    pictureElement.querySelector('.picture-likes').textContent = photoObject.likes;
    pictureElement.querySelector('.picture-comments').textContent = photoObject.comments.length;

    pictureElement.querySelector('a').setAttribute('href', '#');
    pictureElement.querySelector('img').setAttribute('data-id', y);

    return pictureElement;
  };

  /**
 * ********Отрисовка сгенерированных дом-элементов
 */
  var picturesContainer = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();

  for (var y = 0; y < window.data.photos.length; y++) {
    fragment.appendChild(generateDomElement(window.data.photos[y]));
  }
  picturesContainer.appendChild(fragment);
})();
