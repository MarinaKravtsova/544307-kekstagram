'use strict';
var COMMENTS_LIST = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.!',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var PHOTO_NUMBERS = 25;
var LIKE_MIN = 15;
var LIKE_MAX = 200;
var COMMENT_MIN = 1;
var COMMENT_MAX = 2;
var ESC_KEYCODE = 27;
var photos = [];// Массив с фотографиями 1-25
var commentsArray = [];// Массив для 1 или 2 комментов

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
 * @return {objct} photo Объект
 */
var photoFunction = function () {

  commentsArray = [];

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

/**
 * Заполнение массива
 */
for (var i = 1; i <= PHOTO_NUMBERS; i++) {
  photos[i - 1] = photoFunction();
}

/**
 * Создание дом-элементов
 */
var pictureTemplate = document.querySelector('#picture-template').content;

/**
 * Фцнкция генерирующая дом-элемент
 * @param  {type} photoObject объект
 * @return {type} pictureElement объект
 */
var pictureFunction = function (photoObject) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture img').setAttribute('src', photoObject.url);
  pictureElement.querySelector('.picture-likes').textContent = photoObject.likes;
  pictureElement.querySelector('.picture-comments').textContent = photoObject.comments.length;

  pictureElement.querySelector('a').setAttribute('href', '#');
  pictureElement.querySelector('IMG').setAttribute('id', y);

  return pictureElement;
};

/**
 * Отрисовка сгенерированных дом-элементов
 */
var picturesContainer = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();

for (var y = 0; y < photos.length; y++) {
  fragment.appendChild(pictureFunction(photos[y]));
}
picturesContainer.appendChild(fragment);

/**
  * Функция генерирущая фото на весь экран
  * @param  {type} index
  */
var fullScreenPhoto = function (index) {
  var userDialog = document.querySelector('.gallery-overlay');
  userDialog.classList.remove('hidden');

  userDialog.querySelector('.gallery-overlay-image').setAttribute('src', photos[index].url);
  userDialog.querySelector('.likes-count').textContent = photos[index].likes;
  userDialog.querySelector('.comments-count').textContent = photos[index].comments.length;
};

/**
 * Загрузка изображения и показ формы редактирования
 */
var uploadFile = document.querySelector('#upload-file');
var uploadForm = document.querySelector('.upload-overlay');

uploadFile.addEventListener('change', function () {
  uploadForm.classList.remove('hidden');
});

var uploadFormClose = document.querySelector('#upload-cancel');

uploadFormClose.addEventListener('click', function () {
  uploadForm.classList.add('hidden');

  // сбрасывать значение поля выбора файла #upload-file??????НЕПОНЯТНО
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    uploadForm.classList.add('hidden');
  }
  // сбрасывать значение поля выбора файла #upload-file??????НЕПОНЯТНО
});

/**
 * Применение эффекта для изображения
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

uploadEffectNone.addEventListener('click', function () {
  effectImage.style = 'filter: none';
  uploadEffectLevel.classList.add('hidden');
});

uploadEffectChrome.addEventListener('click', function () {
  effectImage.style = 'filter: grayscale(0.2)';
  uploadEffectLevel.classList.remove('hidden');
});

uploadEffectSepia.addEventListener('click', function () {
  effectImage.style = 'filter: sepia(0.2)';
  uploadEffectLevel.classList.remove('hidden');
});

uploadEffectMarvin.addEventListener('click', function () {
  effectImage.style = 'filter: invert(20%)';
  uploadEffectLevel.classList.remove('hidden');
});

uploadEffectPhobos.addEventListener('click', function () {
  effectImage.style = 'filter: blur(0.6px)';
  uploadEffectLevel.classList.remove('hidden');
});

uploadEffectHeat.addEventListener('click', function () {
  effectImage.style = 'filter: brightness(0.6)';
  uploadEffectLevel.classList.remove('hidden');
});

/**
 * обработчик событий, который вызывает показ оверлея с соответствующими данными
 */
document.addEventListener('click', function (evt) {
  if (evt.target.tagName === 'IMG') {
    var id = evt.target.id;
    fullScreenPhoto(id);
  }
});

/**
 * Редактирование размера изображения
 */
var uploadResizeControlsDec = document.querySelector('.upload-resize-controls-button-dec');
var uploadResizeControlsInc = document.querySelector('.upload-resize-controls-button-inc');
var uploadResizeControlsValue = document.querySelector('.upload-resize-controls-value');

var STEP = 25;
var RESIZE_MAX = 100;
var RESIZE_MIN = 25;
var RESIZE_DEFAULT = 100;

uploadResizeControlsValue.value = RESIZE_DEFAULT;

uploadResizeControlsDec.addEventListener('click', function () {
  if (uploadResizeControlsValue.value > RESIZE_MIN && uploadResizeControlsValue.value <= RESIZE_MAX) {
    uploadResizeControlsValue.value = uploadResizeControlsValue.value - STEP;
    effectImage.style = 'transform: scale(' + uploadResizeControlsValue.value / RESIZE_DEFAULT + ')';
  } else {
    uploadResizeControlsValue.value = RESIZE_DEFAULT;
    effectImage.style = 'transform: scale(' + uploadResizeControlsValue.value / RESIZE_DEFAULT + ')';
  }
});

uploadResizeControlsInc.addEventListener('click', function () {
  if (uploadResizeControlsValue.value >= RESIZE_MIN && uploadResizeControlsValue.value < RESIZE_MAX) {
    uploadResizeControlsValue.value = +uploadResizeControlsValue.value + STEP;
    effectImage.style = 'transform: scale(' + uploadResizeControlsValue.value / RESIZE_DEFAULT + ')';

  } else {
    uploadResizeControlsValue.value = RESIZE_DEFAULT;
    effectImage.style = 'transform: scale(' + uploadResizeControlsValue.value / RESIZE_DEFAULT + ')';
  }
});
