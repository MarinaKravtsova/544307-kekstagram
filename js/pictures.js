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
var photos = [];// Массив с фотографиями 1-25
/**
 * Фцнкция генерирущая случайное число от max до min
 * @param {number} max Максимальное число
 * @param {number} min Минимальное число
 * @return {number}
 */
var getRandomNumber = function (max, min) {
  var RandomNumber = Math.floor(Math.random() * (max - min) + min);

  return RandomNumber;
};
/**
 * Фцнкция генерирущая объект
 * @param {object} photo Объект с параметрами url, likes, comments, commentsCount
 * @return {objct}
 */
var photoFunction = function () {

  if ((Math.floor(Math.random() * (10 - 0)) + 0) % 2 === 0) {
    var comment = COMMENTS_LIST[getRandomNumber(COMMENTS_LIST.length, 0)];
    var count = COMMENT_MIN;
  } else {
    comment = COMMENTS_LIST[getRandomNumber(COMMENTS_LIST.length, 0)] + '    ' + COMMENTS_LIST[getRandomNumber(COMMENTS_LIST.length, 0)];
    count = COMMENT_MAX;
  }

  var photo = {
    url: 'photos/' + i + '.jpg',
    likes: getRandomNumber(LIKE_MAX, LIKE_MIN),
    comments: comment,
    commentsCount: count
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

var pictureFunction = function (photoObject) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture img').setAttribute('src', photoObject.url);
  pictureElement.querySelector('.picture-likes').textContent = photoObject.likes;
  pictureElement.querySelector('.picture-comments').textContent = photoObject.comments;

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
 * Скрытая фотография
 */
var userDialog = document.querySelector('.gallery-overlay');
userDialog.classList.remove('hidden');

userDialog.querySelector('.gallery-overlay-image').setAttribute('src', photos[0].url);
userDialog.querySelector('.likes-count').textContent = photos[0].likes;
userDialog.querySelector('.comments-count').textContent = photos[0].commentsCount;
