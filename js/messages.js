import { isEscapeKey } from './util.js';
import { closeUploadForm } from './form.js';

const successTemplateElement = document.querySelector('#success').content.querySelector('.success');
const errorTemplateElement = document.querySelector('#error').content.querySelector('.error');

let currentMessageElement = null;

function closeMessage() {
  if (currentMessageElement) {
    currentMessageElement.remove();
    currentMessageElement = null;
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onOverlayClick);
  }
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
}

function onOverlayClick(evt) {
  if (evt.target === currentMessageElement) {
    closeMessage();
  }
}

const showMessage = (templateElement, buttonClass) => {
  currentMessageElement = templateElement.cloneNode(true);
  const buttonElement = currentMessageElement.querySelector(buttonClass);

  buttonElement.addEventListener('click', closeMessage);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onOverlayClick);

  document.body.appendChild(currentMessageElement);
};

const showSuccessMessage = () => {
  showMessage(successTemplateElement, '.success__button');
  closeUploadForm();
};

const showErrorMessage = () => {
  showMessage(errorTemplateElement, '.error__button');
};

export { showSuccessMessage, showErrorMessage };
