'use strict';

(function () {
  var STEP = 25;
  var RESIZE_MAX = 100;
  var RESIZE_MIN = 25;
  var RESIZE_DEFAULT = 100;
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
  var EFFECT_MAX = 100;
  var EFFECT_MIN = 0;
  var EFFECT_MAX_PX = 450;

  /**
 ******** Загрузка изображения и показ формы редактирования
 */
  var uploadFile = document.querySelector('#upload-file');
  var uploadForm = document.querySelector('.upload-overlay');

  /**
   ********** Применение эффекта для изображения
   */
  var effectImage;
  var uploadEffectLevel = document.querySelector('.upload-effect-level');
  var uploadResizeControls = document.querySelector('.upload-resize-controls');
  var uploadEffectControls = document.querySelector('.upload-effect-controls');

  /**
   * Функция добавляющая ползунок
   */
  var addEffectLevelLine = function () {
    uploadEffectLevel.classList.remove('hidden');
  };

  uploadFile.addEventListener('change', function () {
    uploadForm.classList.remove('hidden');
    effectImage = document.querySelector('.effect-image-preview');

    uploadResizeControls.addEventListener('click', resizeClickHandler);
    uploadEffectControls.addEventListener('click', filterClickHandler);

    applyFilter('effect-none', '', effectImage);

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

  var filterName;
  var previousPosition;

  /**
   * Функция обрабатывающая клики на фильтры
   * @param  {type} evt
   */
  var filterClickHandler = function (evt) {

    if (evt.target !== uploadEffectLevel && evt.target !== uploadEffectLevelLine && evt.target !== uploadEffectPin && evt.target !== uploadEffectVal) {
      previousPosition = 450;
      uploadEffectPin.style.left = (EFFECT_MAX) + '%';
      uploadEffectVal.style.width = (EFFECT_MAX) + '%';

      filterName = 'effect-' + evt.target.value;
      applyFilter(filterName, EFFECT_MAX, effectImage);
      addEffectLevelLine();
    }

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
      resizeControlsDec();
    } else if (evt.target === uploadResizeControlsInc) {
      resizeControlsInc();
    }
    effectImage.style.transform = 'scale(' + uploadResizeValue / RESIZE_DEFAULT + ')';
  };

  var resizeControlsDec = function () {
    if (uploadResizeValue > RESIZE_MIN && uploadResizeValue <= RESIZE_MAX) {
      uploadResizeValue = uploadResizeValue - STEP;
    } else {
      uploadResizeValue = RESIZE_DEFAULT;
    }
    uploadResizeControlsValue.setAttribute('value', uploadResizeValue + '%');
  };

  var resizeControlsInc = function () {
    if (uploadResizeValue >= RESIZE_MIN && uploadResizeValue < RESIZE_MAX) {
      uploadResizeValue = +uploadResizeValue + STEP;
    } else {
      uploadResizeValue = RESIZE_DEFAULT;
    }
    uploadResizeControlsValue.setAttribute('value', uploadResizeValue + '%');
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

    uploadResizeControls.removeEventListener('click', resizeClickHandler);
    uploadEffectControls.removeEventListener('click', filterClickHandler);
  };

  uploadFormClose.addEventListener('click', function () {
    closeUploadForm();
  });

  var uploadFormDescription = document.querySelector('.upload-form-description');

  document.addEventListener('keydown', function (evt) {
    if (uploadFormDescription !== document.activeElement) {
      window.util.isEscEvent(evt, closeUploadForm);
    }
  });

  // ****************перемещение слайдера
  var uploadEffectPin = document.querySelector('.upload-effect-level-pin');
  var uploadEffectVal = document.querySelector('.upload-effect-level-val');
  var uploadEffectLevelLine = document.querySelector('.upload-effect-level-line');

  uploadEffectPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var shift = evt.clientX - previousPosition;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var cordinateX = moveEvt.clientX - shift;
      previousPosition = cordinateX;

      cordinateX = Math.round((cordinateX * EFFECT_MAX) / EFFECT_MAX_PX);

      if (cordinateX > EFFECT_MAX) {
        cordinateX = EFFECT_MAX;
      } else if (cordinateX < EFFECT_MIN) {
        cordinateX = EFFECT_MIN;
      }

      uploadEffectPin.style.left = (cordinateX) + '%';

      applyFilter(filterName, cordinateX, effectImage);

      uploadEffectVal.style.width = (cordinateX) + '%';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });


})();
