'use strict';

/**
 * ******обработчик событий, который вызывает показ оверлея с
 * ******соответствующими данными / открытие и закрытие его
 */
(function () {
  var pictures = document.querySelector('.pictures');

  pictures.addEventListener('click', function (evt) {
    if (evt.target.tagName === 'IMG') {
      var id = evt.target.getAttribute('data-id');
      generateFullScreenPhoto(id, window.gallery.dataPhotos);
    }
  });

  pictures.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, function () {
      if (evt.target.querySelector('IMG').tagName === 'IMG') {
        var id = evt.target.querySelector('IMG').getAttribute('data-id');
        generateFullScreenPhoto(id, window.gallery.dataPhotos);
      }
    });
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

  galleryOverlayClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closeGalleryOverlay);
  });

  /**
  * Функция генерирущая фото на весь экран
  * @param  {type} index  порядковый номер фотографии
  * @param  {type} dataPhotos массив фотографий
  */
  var generateFullScreenPhoto = function (index, dataPhotos) {
    userDialog = document.querySelector('.gallery-overlay');
    userDialog.classList.remove('hidden');

    userDialog.querySelector('.gallery-overlay-image').setAttribute('src', dataPhotos[index].url);
    userDialog.querySelector('.likes-count').textContent = dataPhotos[index].likes;
    userDialog.querySelector('.comments-count').textContent = dataPhotos[index].comments.length;
  };
})();
