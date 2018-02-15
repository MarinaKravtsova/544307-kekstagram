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

/**
 * Фцнкция генерирущая случайное число от max до min
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
    url: 'photos/' + i + '.jpg',
    likes: getRandomNumber(LIKE_MAX, LIKE_MIN),
    comments: commentsArray
  };
  return photo;
};

var photos = [];// Массив с фотографиями 1-25

for (var i = 1; i <= PHOTO_NUMBERS; i++) {
  photos[i - 1] = generatePhotoObject();
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
  pictureElement.querySelector('IMG').setAttribute('id', y);

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
 * Функция генерирущая стили фильтров
 * @param  {type} filterType параметр функции описываюший класс используемого фильтра
 * @param  {type} filter     параметр функции описываюший используемый фильтр
 */
var generateFilterStyle = function () {
  uploadEffectLevel.classList.remove('hidden');
  effectImage.setAttribute('class', 'effect-image-preview' + ' ' + filterType);
  effectImage.style = 'filter:' + filter + '; transform: scale(' + uploadResizeValue / RESIZE_DEFAULT + ')';
};

uploadFile.addEventListener('change', function () {
  uploadForm.classList.remove('hidden');

  uploadForm.addEventListener('click', generateFormParameters);

  uploadEffectNone.addEventListener('click', function () {
    filterType = 'effect-none';
    filter = 'none';
    generateFilterStyle();

    uploadEffectLevel.classList.add('hidden');
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

var filterType = 'none';
var filter = 'none';
/**
 * Функция генерирущая параментры формы для загружаемой фотографии
 * @param  {type} evt
 */
var generateFormParameters = function (evt) {
  if (evt.target === uploadEffectChrome) {
    filterType = 'effect-chrome';
    filter = 'grayscale(0.2)';
    generateFilterStyle();
  } else if (evt.target === uploadEffectSepia) {
    filterType = 'effect-sepia';
    filter = 'sepia(0.2)';
    generateFilterStyle();
  } else if (evt.target === uploadEffectMarvin) {
    filterType = 'effect-marvin';
    filter = 'invert(20%)';
    generateFilterStyle();
  } else if (evt.target === uploadEffectPhobos) {
    filterType = 'effect-phobos';
    filter = 'blur(0.6px)';
    generateFilterStyle();
  } else if (evt.target === uploadEffectHeat) {
    filterType = 'effect-heat';
    filter = 'brightness(0.6)';
    generateFilterStyle();
  } else if (evt.target === uploadEffectNone) {
    filterType = 'effect-none';
    filter = 'none';
    generateFilterStyle();
    uploadEffectLevel.classList.add('hidden');
  } else if (evt.target === uploadResizeControlsDec) {
    if (uploadResizeValue > RESIZE_MIN && uploadResizeValue <= RESIZE_MAX) {
      uploadResizeValue = uploadResizeValue - STEP;
      generateFilterStyle();
    } else {
      uploadResizeValue = RESIZE_DEFAULT;
      generateFilterStyle();
    }
    uploadResizeControlsValue.setAttribute('value', uploadResizeValue + '%');
  } else if (evt.target === uploadResizeControlsInc) {
    if (uploadResizeValue >= RESIZE_MIN && uploadResizeValue < RESIZE_MAX) {
      uploadResizeValue = +uploadResizeValue + STEP;
      generateFilterStyle();
    } else {
      uploadResizeValue = RESIZE_DEFAULT;
      generateFilterStyle();
    }
    uploadResizeControlsValue.setAttribute('value', uploadResizeValue + '%');
  }
};

/**
 * Функция устанавливающая настройки поумолчанию
 */
var setDefaultParameter = function () {
  uploadFile.value = ''; // сбрасывает значение поля выбора файла #upload-file
  uploadResizeValue = RESIZE_DEFAULT;
  filterType = 'effect-none';
  filter = 'none';
  generateFilterStyle();
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

/**
 ********** Применение эффекта для изображения
 */
var uploadEffectPin = document.querySelector('.upload-effect-level-pin');
var effectImage = document.querySelector('.effect-image-preview');
var uploadEffectNone = document.querySelector('#upload-effect-none');
var uploadEffectChrome = document.querySelector('#upload-effect-chrome');
var uploadEffectSepia = document.querySelector('#upload-effect-sepia');
var uploadEffectMarvin = document.querySelector('#upload-effect-marvin');
var uploadEffectPhobos = document.querySelector('#upload-effect-phobos');
var uploadEffectHeat = document.querySelector('#upload-effect-heat');
var uploadEffectLevel = document.querySelector('.upload-effect-level');

uploadEffectPin.addEventListener('mouseup', function () {
  effectImage.style = 'filter: grayscale(0.2)';
  effectImage.style = 'filter: sepia(0.2)';
  effectImage.style = 'filter: invert(20%)';
  effectImage.style = 'filter: blur(0.6px)';
  effectImage.style = 'filter: brightness(0.6)';
});

/**
 * ***обработчик событий, который вызывает показ оверлея с
 * ***соответствующими данными / открытие и закрытие его
 */
document.querySelector('.pictures').addEventListener('click', function (evt) {
  if (evt.target.tagName === 'IMG') {
    var id = evt.target.id;
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
