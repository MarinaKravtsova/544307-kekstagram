'use strict';

/**
 * ******обработчик событий, который вызывает показ оверлея с
 * ******соответствующими данными / открытие и закрытие его
 */
(function () {
  document.querySelector('.pictures').addEventListener('click', function (evt) {
    if (evt.target.tagName === 'IMG') {
      var id = evt.target.getAttribute('data-id');
      generateFullScreenPhoto(id);
    }
  });

  var galleryOverlayClose = document.querySelector('.gallery-overlay-close');
  var userDialog = document.querySelector('.gallery-overlay');

  var closeGalleryOverlay = function () {
    userDialog.classList.add('hidden');
  };

  galleryOverlayClose.addEventListener('click', function () {
    closeGalleryOverlay();
  });

  document.addEventListener('keydown', function (evt) {
    window.util.isEscEvent(evt, closeGalleryOverlay);
  });

  document.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closeGalleryOverlay);
  });

  /**
  * Функция генерирущая фото на весь экран
  * @param  {type} index
  */
  var generateFullScreenPhoto = function (index) {
    userDialog = document.querySelector('.gallery-overlay');
    userDialog.classList.remove('hidden');

    userDialog.querySelector('.gallery-overlay-image').setAttribute('src', window.data.photos[index].url);
    userDialog.querySelector('.likes-count').textContent = window.data.photos[index].likes;
    userDialog.querySelector('.comments-count').textContent = window.data.photos[index].comments.length;
  };
})();
