'use strict';
var COMMENTS_LIST = ['Всё отлично!', 'В целом всё неплохо. Но не всё.!', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var PHOTO_NUMBERS = 25;

// массив с фотографиями 1-25
var photos = [];
// создание объекта
for (var i = 1; i <= PHOTO_NUMBERS; i++) {

  if ((Math.floor(Math.random() * (10 - 0)) + 0) % 2 === 0) {
    var comment = COMMENTS_LIST[Math.floor(Math.random() * (COMMENTS_LIST.length - 0) + 0)];
  } else {
    comment = COMMENTS_LIST[Math.floor(Math.random() * (COMMENTS_LIST.length - 0) + 0)] + '    ' + COMMENTS_LIST[Math.floor(Math.random() * (COMMENTS_LIST.length - 0) + 0)];
  }

  var photo = {
    url: 'photos/' + i + '.jpg',
    likes: Math.floor(Math.random() * (200 - 15)) + 15,
    comments: comment
  };
  photos.push(photo); // записываем в массив photos
}

// создание дом-элементов
var pictureTemplate = document.querySelector('#picture-template').content;

var pictureFunction = function (photoObject) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture img').setAttribute('src', photoObject.url);
  pictureElement.querySelector('.picture-likes').textContent = photoObject.likes;
  pictureElement.querySelector('.picture-comments').textContent = photoObject.comments;

  return pictureElement;
};

// отрисовка сгенерированных дом-элементов
var picturesContainer = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();
for (var y = 0; y < photos.length; y++) {
  fragment.appendChild(pictureFunction(photos[y]));
}
picturesContainer.appendChild(fragment);

// скрытая фотография
var userDialog = document.querySelector('.gallery-overlay');
userDialog.classList.remove('hidden');

userDialog.querySelector('.gallery-overlay-image').setAttribute('src', photos[0].url);
userDialog.querySelector('.likes-count').textContent = photos[0].likes;
userDialog.querySelector('.comments-count').textContent = photos[0].comments;
