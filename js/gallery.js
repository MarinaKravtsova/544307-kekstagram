'use strict';

/**
 * Фцнкция генерирующая дом-элемент
 * @param  {type} photoObject объект
 * @param  {type} y
 * @return {type} pictureElement объект
 */
(function () {
  var pictureTemplate = document.querySelector('#picture-template').content;

  window.generateDomElement = function (photoObject, y) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture img').setAttribute('src', photoObject.url);
    pictureElement.querySelector('.picture-likes').textContent = photoObject.likes;
    pictureElement.querySelector('.picture-comments').textContent = photoObject.comments.length;

    pictureElement.querySelector('a').setAttribute('href', '#');
    pictureElement.querySelector('img').setAttribute('data-id', y);

    return pictureElement;
  };
})();
