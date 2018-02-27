'use strict';

(function () {
  var FILE_TYPES = ['jpg', 'jpeg', 'png'];

  var fileChooser = document.querySelector('.upload-image input[type=file]');
  var preview = document.querySelector('.effect-image-preview');

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();
