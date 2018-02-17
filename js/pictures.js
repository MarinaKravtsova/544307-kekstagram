'use strict';

var COMMENTS_LIST = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.!',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var PHOTO_NUMBERS = 25;
var LIKE_MIN = 15;
var LIKE_MAX = 200;
var COMMENT_MIN = 1;
var COMMENT_MAX = 2;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var STEP = 25;
var RESIZE_MAX = 100;
var RESIZE_MIN = 25;
var RESIZE_DEFAULT = 100;
var HASHTAG_MAX = 5;
var HASHTAG_MAX_LONG = 20;
var FILTERS = {
  'effect-none': function () {
    return '';
  },
  'effect-chrome': function (value) {
    return 'grayscale(' + value * 0.01 + ')';
  },
  'effect-sepia': function (value) {
    return 'sepia(' + value * 0.01 + ')';
  },
  'effect-marvin': function (value) {
    return 'invert(' + value + '%' + ')';
  },
  'effect-phobos': function (value) {
    return 'blur(' + value * 0.03 + 'px' + ')';
  },
  'effect-heat': function (value) {
    return 'brightness(' + value * 0.03 + ')';
  }
};

/**
 * Фцнкция генерирующая случайное число от max до min
 * @param {number} max Максимальное число
 * @param {number} min Минимальное число
 * @return {number}
 */
var getRandomNumber = function (max, min) {
  var RandomNumber = Math.round(Math.random() * (max - min) + min);

  return RandomNumber;
};

/**
 * Фцнкция генерирущая объект
 * @param {object} photo Объект с параметрами url, likes, comments, commentsCount
 * @return {object} photo Объект
 */
var generatePhotoObject = function () {

  var commentsArray = [];// Массив для 1 или 2 комментов

  for (var x = 0; x < getRandomNumber(COMMENT_MAX, COMMENT_MIN); x++) {
    var comment = COMMENTS_LIST[getRandomNumber(COMMENTS_LIST.length, 0)];

    commentsArray.push(comment);
  }

  var photo = {
    url: 'photos/' + (i + 1) + '.jpg',
    likes: getRandomNumber(LIKE_MAX, LIKE_MIN),
    comments: commentsArray
  };
  return photo;
};

var photos = [];// Массив с фотографиями 1-25

for (var i = 0; i < PHOTO_NUMBERS; i++) {
  photos[i] = generatePhotoObject();
}

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

for (var y = 0; y < photos.length; y++) {
  fragment.appendChild(generateDomElement(photos[y]));
}
picturesContainer.appendChild(fragment);

/**
  * Функция генерирущая фото на весь экран
  * @param  {type} index
  */
var generateFullScreenPhoto = function (index) {
  var userDialog = document.querySelector('.gallery-overlay');
  userDialog.classList.remove('hidden');

  userDialog.querySelector('.gallery-overlay-image').setAttribute('src', photos[index].url);
  userDialog.querySelector('.likes-count').textContent = photos[index].likes;
  userDialog.querySelector('.comments-count').textContent = photos[index].comments.length;
};

/**
 ******** Загрузка изображения и показ формы редактирования
 */
var uploadFile = document.querySelector('#upload-file');
var uploadForm = document.querySelector('.upload-overlay');

/**
 ********** Применение эффекта для изображения
 */
var uploadEffectPin = document.querySelector('.upload-effect-level-pin');
var effectImage;
var uploadEffectNone = document.querySelector('#upload-effect-none');
var uploadEffectLevel = document.querySelector('.upload-effect-level');

/**
 * Функция добавляющая ползунок
 */
var addEffectLevelLine = function () {
  uploadEffectLevel.classList.remove('hidden');
};

uploadFile.addEventListener('change', function () {
  uploadForm.classList.remove('hidden');
  effectImage = document.querySelector('.effect-image-preview');

  uploadForm.addEventListener('click', generateFormParameters);

  uploadEffectNone.addEventListener('click', function () {
    uploadEffectLevel.classList.add('hidden');

    applyFilter('effect-none', '', effectImage);
  });

  uploadResizeControlsValue.setAttribute('value', RESIZE_DEFAULT + '%');

  uploadEffectLevel.classList.add('hidden');
});

/**
 ****** Редактирование размера изображения
 */
var uploadResizeControlsDec = document.querySelector('.upload-resize-controls-button-dec');
var uploadResizeControlsInc = document.querySelector('.upload-resize-controls-button-inc');
var uploadResizeControlsValue = document.querySelector('.upload-resize-controls-value');

var uploadResizeValue = RESIZE_DEFAULT;

/**
 * Функция применяющая к изображению фильтр и размер
 *
 * @param  {type} name    название применяемого фильтра
 * @param  {type} value   величина применяемого фильтра
 * @param  {type} element загружаемая фотография
 */
var applyFilter = function (name, value, element) {
  element.style.filter = FILTERS[name](value);
  effectImage.style.transform = 'scale(' + uploadResizeValue / RESIZE_DEFAULT + ')';
  effectImage.setAttribute('class', 'effect-image-preview' + ' ' + name);
};

/**
 * Функция обрабатывающая клики на фильтры
 * @param  {type} evt
 */
var filterClickHandler = function (evt) {
  var filterName = 'effect-' + evt.target.value;
  applyFilter(filterName, 20, effectImage);
  addEffectLevelLine();

  if (evt.target.value === 'none') {
    uploadEffectLevel.classList.add('hidden');
  }
};

/**
 * Функция обрабатывающая клики на регулировщики размера
 * @param  {type} evt
 */
var resizeClickHandler = function (evt) {
  if (evt.target === uploadResizeControlsDec) {
    if (uploadResizeValue > RESIZE_MIN && uploadResizeValue <= RESIZE_MAX) {
      uploadResizeValue = uploadResizeValue - STEP;
    } else {
      uploadResizeValue = RESIZE_DEFAULT;
    }
    uploadResizeControlsValue.setAttribute('value', uploadResizeValue + '%');
  } else if (evt.target === uploadResizeControlsInc) {
    if (uploadResizeValue >= RESIZE_MIN && uploadResizeValue < RESIZE_MAX) {
      uploadResizeValue = +uploadResizeValue + STEP;
    } else {
      uploadResizeValue = RESIZE_DEFAULT;
    }
    uploadResizeControlsValue.setAttribute('value', uploadResizeValue + '%');
  }
  effectImage.style.transform = 'scale(' + uploadResizeValue / RESIZE_DEFAULT + ')';
};

/**
 * Функция генерирующая параметры формы (фильтры и размеры)
 * @param  {type} evt
 */
var generateFormParameters = function (evt) {
  resizeClickHandler(evt);
  filterClickHandler(evt);
};

/**
 * Функция устанавливающая настройки поумолчанию
 */
var setDefaultParameter = function () {
  uploadFile.value = ''; // сбрасывает значение поля выбора файла #upload-file
  uploadResizeValue = RESIZE_DEFAULT;
  applyFilter('effect-none', '', effectImage);
  uploadEffectLevel.classList.add('hidden');
  document.querySelector('#upload-effect-none').checked = true;
};

var uploadFormClose = document.querySelector('#upload-cancel');

/**
 * Функция закрытия формы
 */
var closeUploadForm = function () {
  uploadForm.classList.add('hidden');

  setDefaultParameter();

  uploadForm.removeEventListener('click', generateFormParameters);
};

uploadFormClose.addEventListener('click', function () {
  closeUploadForm();
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeUploadForm();
  }
});

uploadEffectPin.addEventListener('mouseup', function () {

});

/**
 * *******обработчик событий, который вызывает показ оверлея с
 * *******соответствующими данными / открытие и закрытие его
 */
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
  if (evt.keyCode === ESC_KEYCODE) {
    closeGalleryOverlay();
  }
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeGalleryOverlay();
  }
});

/**
 * *********2.3. Хэш-теги:
 */
var uploadFormHashtags = document.querySelector('.upload-form-hashtags');
var error = false;
var uploadFormSubmit = document.querySelector('.upload-form-submit');

uploadFormSubmit.addEventListener('click', function () {
  if (error === true) {
    uploadFormHashtags.setAttribute('style', 'border' + ':' + '3px solid red');
  }
});

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

    for (var b = x + 1; b < hashtagArrSplit.length; b++) {
      if (hashtagArrSplit[x].toUpperCase().slice(0, -1) === hashtagArrSplit[b].toUpperCase() || hashtagArrSplit[x].toUpperCase().slice(0, -1) === hashtagArrSplit[b].toUpperCase().slice(0, -1)) {
        setNotice('Хэш-теги не должны повторяться');
      }
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

/**
 * ************2.4. Комментарии
 */
var uploadFormDescription = document.querySelector('.upload-form-description');

uploadFormDescription.addEventListener('focus', function () {
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      uploadForm.classList.remove('hidden');
    }
  });
});

uploadFormDescription.addEventListener('blur', function () {
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      uploadForm.classList.add('hidden');
    }
  });
});
