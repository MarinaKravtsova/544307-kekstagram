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

  var uploadFile = document.querySelector('#upload-file');
  var uploadForm = document.querySelector('.upload-overlay');
  var effectImage;
  var uploadEffectLevel = document.querySelector('.upload-effect-level');
  var uploadResizeControls = document.querySelector('.upload-resize-controls');
  var uploadEffectControls = document.querySelectorAll('.upload-effect-label');

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

    for (var x = 0; x < uploadEffectControls.length; x++) {
      uploadEffectControls[x].previousElementSibling.addEventListener('click', filterClickHandler);
    }

    applyFilter('effect-none', '', effectImage);

    uploadResizeControlsValue.setAttribute('value', RESIZE_DEFAULT + '%');

    uploadEffectLevel.classList.add('hidden');

    document.addEventListener('keydown', closeFormEsc);
  });

  document.querySelector('.upload-file').addEventListener('keydown', function (evt) {

    window.util.isEnterEvent(evt, function () {

      document.querySelector('.upload-file').click();
    });
  });

  var uploadResizeControlsDec = document.querySelector('.upload-resize-controls-button-dec');
  var uploadResizeControlsInc = document.querySelector('.upload-resize-controls-button-inc');
  var uploadResizeControlsValue = document.querySelector('.upload-resize-controls-value');

  var uploadResizeValue = RESIZE_DEFAULT;

  /**
 * Функция применяющая к изображению фильтр и размер
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
    previousPosition = EFFECT_MAX_PX;
    uploadEffectPin.style.left = (EFFECT_MAX) + '%';
    uploadEffectVal.style.width = (EFFECT_MAX) + '%';

    filterName = 'effect-' + evt.target.value;
    applyFilter(filterName, EFFECT_MAX, effectImage);
    addEffectLevelLine();

    if (evt.target.value === 'none') {
      uploadEffectLevel.classList.add('hidden');
    }
  };

  for (var j = 0; j < uploadEffectControls.length; j++) {
    uploadEffectControls[j].addEventListener('keydown', function (evt) {

      window.util.isEnterEvent(evt, function () {

        evt.target.click();
      });
    });
  }

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

  /**
   * Функция увеличивающая размер фото
   */
  var resizeControlsDec = function () {
    if (uploadResizeValue > RESIZE_MIN && uploadResizeValue <= RESIZE_MAX) {
      uploadResizeValue = uploadResizeValue - STEP;
    } else {
      uploadResizeValue = RESIZE_DEFAULT;
    }
    uploadResizeControlsValue.setAttribute('value', uploadResizeValue + '%');
  };

  /**
   * Функция уменьшающая размер фото
   */
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
    uploadFile.value = '';
    uploadResizeValue = RESIZE_DEFAULT;
    applyFilter('effect-none', '', effectImage);
    uploadEffectLevel.classList.add('hidden');
    document.querySelector('#upload-effect-none').checked = true;
    window.validation.uploadFormHashtags.value = '';
    window.validation.uploadFormHashtags.setAttribute('style', 'border' + ':' + 'none');
    uploadFormDescription.value = '';
  };

  var uploadFormClose = document.querySelector('#upload-cancel');

  /**
   * Функция закрытия формы
   */
  var closeUploadForm = function () {
    uploadForm.classList.add('hidden');

    setDefaultParameter();

    uploadResizeControls.removeEventListener('click', resizeClickHandler);
    for (var x = 0; x < uploadEffectControls.length; x++) {
      uploadEffectControls[x].previousElementSibling.removeEventListener('click', filterClickHandler);
    }
    document.removeEventListener('keydown', closeFormEsc);
  };

  uploadFormClose.addEventListener('click', function () {
    closeUploadForm();
  });

  var uploadFormDescription = document.querySelector('.upload-form-description');

  /**
   * Функция закрытия формы клавишей Esc
   * @param  {type} evt
   */
  var closeFormEsc = function (evt) {
    if (uploadFormDescription !== document.activeElement) {
      window.util.isEscEvent(evt, closeUploadForm);
    }
  };

  var uploadEffectPin = document.querySelector('.upload-effect-level-pin');
  var uploadEffectVal = document.querySelector('.upload-effect-level-val');
  var uploadEffectValue = document.querySelector('.upload-effect-level-value');

  uploadEffectPin.addEventListener('keydown', function (evt) {

    window.util.isEnterEvent(evt, function () {

      uploadEffectPin.click();
    });
  });

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
      uploadEffectValue.setAttribute('value', cordinateX);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var form = document.querySelector('.upload-form');

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(form), closeUploadForm, window.error);
  });
})();
