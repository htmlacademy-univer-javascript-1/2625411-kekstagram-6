import { imageEditor } from './image-editor.js';
import { api } from './api.js';

const formValidator = (function() {
  const uploadForm = document.querySelector('.img-upload__form');
  const uploadInput = document.querySelector('.img-upload__input');
  const uploadOverlay = document.querySelector('.img-upload__overlay');
  const uploadCancel = document.querySelector('.img-upload__cancel');
  const body = document.body;
  const hashtagsInput = uploadForm.querySelector('.text__hashtags');
  const descriptionInput = uploadForm.querySelector('.text__description');
  const submitButton = uploadForm.querySelector('.img-upload__submit');

  const successTemplate = document.querySelector('#success').content.querySelector('.success');
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');

  const pristine = new Pristine(uploadForm, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--invalid',
    successClass: 'img-upload__field-wrapper--valid',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'img-upload__error'
  });

  function init() {
    setupEventListeners();
    setupValidation();
    imageEditor.init();
  }

  function setupEventListeners() {
    uploadInput.addEventListener('change', onUploadInputChange);
    uploadCancel.addEventListener('click', onUploadCancelClick);
    uploadForm.addEventListener('submit', onFormSubmit);

    hashtagsInput.addEventListener('keydown', onHashtagsKeydown);
    descriptionInput.addEventListener('keydown', onDescriptionKeydown);
  }

  function setupValidation() {
    pristine.addValidator(
      hashtagsInput,
      validateHashtags,
      getHashtagsErrorMessage
    );

    pristine.addValidator(
      descriptionInput,
      validateDescription,
      'Длина комментария не может быть больше 140 символов'
    );
  }

  function validateHashtags(value) {
    if (value.trim() === '') {
      return true;
    }

    const hashtags = value.trim().toLowerCase().split(/\s+/);

    if (hashtags.length > 5) {
      return false;
    }

    const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;
    const seenHashtags = new Set();

    for (const hashtag of hashtags) {
      if (!hashtagRegex.test(hashtag)) {
        return false;
      }

      if (seenHashtags.has(hashtag)) {
        return false;
      }

      seenHashtags.add(hashtag);
    }

    return true;
  }

  function getHashtagsErrorMessage(value) {
    if (value.trim() === '') {
      return '';
    }

    const hashtags = value.trim().toLowerCase().split(/\s+/);

    if (hashtags.length > 5) {
      return 'Нельзя указать больше пяти хэш-тегов';
    }

    const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;
    const seenHashtags = new Set();

    for (const hashtag of hashtags) {
      if (hashtag === '#') {
        return 'Хэш-тег не может состоять только из одной решётки';
      }

      if (!hashtag.startsWith('#')) {
        return 'Хэш-тег должен начинаться с символа #';
      }

      if (!hashtagRegex.test(hashtag)) {
        return 'Хэш-тег содержит недопустимые символы';
      }

      if (hashtag.length > 20) {
        return 'Максимальная длина хэш-тега 20 символов';
      }

      if (seenHashtags.has(hashtag)) {
        return 'Один и тот же хэш-тег не может быть использован дважды';
      }

      seenHashtags.add(hashtag);
    }

    return 'Некорректные хэш-теги';
  }

  function validateDescription(value) {
    return value.length <= 140;
  }

  function onUploadInputChange() {
    showForm();
  }

  function showForm() {
    uploadOverlay.classList.remove('hidden');
    body.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydown);
  }

  function hideForm() {
    uploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onDocumentKeydown);
    resetForm();
  }

  function resetForm() {
    uploadForm.reset();
    pristine.reset();
    imageEditor.resetEditor();
  }

  function onUploadCancelClick() {
    hideForm();
  }

  async function onFormSubmit(evt) {
    evt.preventDefault();

    const isValid = pristine.validate();

    if (isValid) {
      await sendFormData();
    }
  }

  async function sendFormData() {
    const formData = new FormData(uploadForm);

    blockSubmitButton();

    try {
      await api.sendPhoto(formData);
      hideForm();
      showSuccessMessage();
    } catch (error) {
      showErrorMessage(error.message);
    } finally {
      unblockSubmitButton();
    }
  }

  function blockSubmitButton() {
    submitButton.disabled = true;
    submitButton.textContent = 'Публикую...';
  }

  function unblockSubmitButton() {
    submitButton.disabled = false;
    submitButton.textContent = 'Опубликовать';
  }

  function showSuccessMessage() {
    const successElement = successTemplate.cloneNode(true);
    const successButton = successElement.querySelector('.success__button');

    successButton.addEventListener('click', () => {
      successElement.remove();
    });

    successElement.addEventListener('click', (evt) => {
      if (evt.target === successElement) {
        successElement.remove();
      }
    });

    document.addEventListener('keydown', function onEscKeydown(evt) {
      if (evt.key === 'Escape') {
        successElement.remove();
        document.removeEventListener('keydown', onEscKeydown);
      }
    });

    document.body.appendChild(successElement);
  }

  function showErrorMessage(message) {
    const errorElement = errorTemplate.cloneNode(true);
    const errorTitle = errorElement.querySelector('.error__title');
    const errorButton = errorElement.querySelector('.error__button');

    errorTitle.textContent = message;
    errorButton.textContent = 'Попробовать снова';

    errorButton.addEventListener('click', () => {
      errorElement.remove();
    });

    errorElement.addEventListener('click', (evt) => {
      if (evt.target === errorElement) {
        errorElement.remove();
      }
    });

    document.addEventListener('keydown', function onEscKeydown(evt) {
      if (evt.key === 'Escape') {
        errorElement.remove();
        document.removeEventListener('keydown', onEscKeydown);
      }
    });

    document.body.appendChild(errorElement);
  }

  function onDocumentKeydown(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();

      const isHashtagsFocused = document.activeElement === hashtagsInput;
      const isDescriptionFocused = document.activeElement === descriptionInput;

      if (!isHashtagsFocused && !isDescriptionFocused) {
        hideForm();
      }
    }
  }

  function onHashtagsKeydown(evt) {
    if (evt.key === 'Escape') {
      evt.stopPropagation();
    }
  }

  function onDescriptionKeydown(evt) {
    if (evt.key === 'Escape') {
      evt.stopPropagation();
    }
  }

  return {
    init
  };
})();

export { formValidator };
