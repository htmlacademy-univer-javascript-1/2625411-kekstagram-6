const imageUpload = (function() {
  const uploadInput = document.querySelector('.img-upload__input');
  const imagePreview = document.querySelector('.img-upload__preview img');
  const effectsPreviews = document.querySelectorAll('.effects__preview');

  const FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

  function init() {
    setupEventListeners();
  }

  function setupEventListeners() {
    uploadInput.addEventListener('change', onUploadInputChange);
  }

  function onUploadInputChange() {
    const file = uploadInput.files[0];

    if (file) {
      const fileName = file.name.toLowerCase();
      const matches = FILE_TYPES.some((type) => fileName.endsWith(type));

      if (matches) {
        loadImagePreview(file);
      } else {
        showFileTypeError();
      }
    }
  }

  function loadImagePreview(file) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      const result = reader.result;

      imagePreview.src = result;

      effectsPreviews.forEach((preview) => {
        preview.style.backgroundImage = `url(${result})`;
      });
    });

    reader.readAsDataURL(file);
  }

  function showFileTypeError() {
    uploadInput.value = '';
  }

  function reset() {
    imagePreview.src = 'img/upload-default-image.jpg';

    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = '';
    });
  }

  return {
    init,
    reset
  };
})();

export { imageUpload };
