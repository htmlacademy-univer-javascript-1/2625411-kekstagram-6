import { isEscapeKey } from './util.js';
import { initScaleAndEffects, resetScaleAndEffects } from './scale-effects.js';
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';

const uploadFormElement = document.querySelector('.img-upload__form');
const uploadInputElement = uploadFormElement.querySelector('#upload-file');
const uploadOverlayElement = uploadFormElement.querySelector('.img-upload__overlay');
const uploadCancelElement = uploadFormElement.querySelector('#upload-cancel');
const hashtagsInputElement = uploadFormElement.querySelector('.text__hashtags');
const commentInputElement = uploadFormElement.querySelector('.text__description');
const submitButtonElement = uploadFormElement.querySelector('.img-upload__submit');
const previewImageElement = uploadFormElement.querySelector('.img-upload__preview img');
const effectsPreviews = uploadFormElement.querySelectorAll('.effects__preview');

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const pristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';
};

const validateHashtags = (value) => {
  if (value.trim() === '') {
    return true;
  }

  const hashtags = value.trim().split(/\s+/).filter(Boolean);

  if (hashtags.length > 5) {
    return false;
  }

  for (let i = 0; i < hashtags.length; i++) {
    const hashtag = hashtags[i];

    if (!HASHTAG_REGEX.test(hashtag)) {
      return false;
    }

    for (let j = i + 1; j < hashtags.length; j++) {
      if (hashtag.toLowerCase() === hashtags[j].toLowerCase()) {
        return false;
      }
    }
  }

  return true;
};

const getHashtagErrorMessage = (value) => {
  if (value.trim() === '') {
    return '';
  }

  const hashtags = value.trim().split(/\s+/).filter(Boolean);

  if (hashtags.length > 5) {
    return 'Не более 5 хэш-тегов';
  }

  const lowerCaseHashtags = hashtags.map((tag) => tag.toLowerCase());
  const uniqueHashtags = new Set(lowerCaseHashtags);
  if (uniqueHashtags.size !== hashtags.length) {
    return 'Хэш-теги не должны повторяться';
  }

  for (const hashtag of hashtags) {
    if (!HASHTAG_REGEX.test(hashtag)) {
      return 'Неверный формат хэш-тега';
    }
  }

  return '';
};

const validateComment = (value) => value.length <= 140;

pristine.addValidator(
  hashtagsInputElement,
  validateHashtags,
  getHashtagErrorMessage
);

pristine.addValidator(
  commentInputElement,
  validateComment,
  'Комментарий не может быть длиннее 140 символов'
);

const openUploadForm = () => {
  uploadOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  initScaleAndEffects();
};

const closeUploadForm = () => {
  uploadOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);

  uploadFormElement.reset();
  pristine.reset();
  resetScaleAndEffects();
  unblockSubmitButton();
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    const isErrorMessageExists = document.querySelector('.error');
    if (isErrorMessageExists) {
      return;
    }

    if (document.activeElement === hashtagsInputElement || document.activeElement === commentInputElement) {
      return;
    }
    evt.preventDefault();
    closeUploadForm();
  }
}

const onFileInputChange = () => {
  const file = uploadInputElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const url = URL.createObjectURL(file);
    previewImageElement.src = url;
    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url(${url})`;
    });
  }
  openUploadForm();
};

const onFormSubmit = async (evt) => {
  evt.preventDefault();

  if (!pristine.validate()) {
    return;
  }

  blockSubmitButton();

  const formData = new FormData(uploadFormElement);

  try {
    await sendData(formData);
    closeUploadForm();
    showSuccessMessage();
  } catch (err) {
    showErrorMessage();
  } finally {
    unblockSubmitButton();
  }
};

uploadInputElement.addEventListener('change', onFileInputChange);
uploadCancelElement.addEventListener('click', closeUploadForm);
uploadFormElement.addEventListener('submit', onFormSubmit);

[hashtagsInputElement, commentInputElement].forEach((element) => {
  element.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
    }
  });
});

export { closeUploadForm };
