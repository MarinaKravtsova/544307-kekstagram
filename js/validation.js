'use strict';

(function () {
  var HASHTAG_MAX = 5;
  var HASHTAG_MAX_LONG = 20;

  var uploadFormHashtags = document.querySelector('.upload-form-hashtags');
  var error = false;
  var uploadFormSubmitButton = document.querySelector('.upload-form-submit');

  uploadFormSubmitButton.addEventListener('click', function () {
    setBorderStyle(uploadFormHashtags, error ? '3px solid red' : 'none');
  });

  var setBorderStyle = function (elem, rule) {
    elem.setAttribute('style', 'border' + ':' + rule);
  };

  /**
   * Функция генерирующая сообщение, которое указывает на несоответствие ограничениям
   *  и выделяет поле с ошибкой
   * @param  {type} notice сообщение, указывающее на несоответствие ограничениям
   */
  var setNotice = function (notice) {
    uploadFormHashtags.setCustomValidity(notice);
    error = true;
  };

  uploadFormHashtags.addEventListener('input', function () {
    error = false;
    uploadFormHashtags.setCustomValidity('');
    var hashtagArr = uploadFormHashtags.value;
    var hashtagArrSplit = hashtagArr.split('#');
    hashtagArrSplit.splice(0, 1);
    var hashtag = hashtagArr.split('');

    uploadFormHashtags.setAttribute('style', 'border' + ':' + 'none');

    for (var x = 0; x < hashtagArrSplit.length; x++) {
      if (hashtagArrSplit[x].length > HASHTAG_MAX_LONG) {
        setNotice('Хэш-тег не должен превышать 20-ти символов');
      }

      for (var b = x + 1; b < hashtagArrSplit.length - 1; b++) {
        if (hashtagArrSplit[x].toUpperCase().slice(0, -1) === hashtagArrSplit[b].toUpperCase().slice(0, -1)) {
          setNotice('Хэш-теги не должны повторяться');
        }
      }
      if (hashtagArrSplit[x].toUpperCase().slice(0, -1) === hashtagArrSplit[hashtagArrSplit.length - 1].toUpperCase() || (hashtagArrSplit[hashtagArrSplit.length - 1].charAt(hashtagArrSplit[hashtagArrSplit.length - 1].length - 1) === ' ' && hashtagArrSplit[x].toUpperCase().slice(0, -1) === hashtagArrSplit[hashtagArrSplit.length - 1].toUpperCase().slice(0, -1))) {
        setNotice('Хэш-теги не должны повторяться');
      }

      var hashtagArrSign = hashtagArrSplit[x].split('');

      if (x < hashtagArrSplit.length - 1) {
        if (hashtagArrSign[hashtagArrSign.length - 1] !== ' ') {
          setNotice('Хэш-теги должны разделяться пробелами');
        }
      }

      for (var c = 0; c < hashtagArrSign.length - 1; c++) {
        if (hashtagArrSign[c] === ' ') {
          setNotice('Хэш-тег должен состоять из одного слова');
        }
      }
    }

    if (hashtagArrSplit.length > HASHTAG_MAX) {
      setNotice('Нельзя указывать больше пяти хэш-тегов');
    }

    if (hashtag[0] !== '#') {
      setNotice('Хэш-теги должны начинаться с символа # (решётка)');
    }
  });

  window.validation = {
    uploadFormHashtags: uploadFormHashtags
  };
})();
