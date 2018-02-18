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

/**
   * Функция генерирующая случайное число от max до min
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
