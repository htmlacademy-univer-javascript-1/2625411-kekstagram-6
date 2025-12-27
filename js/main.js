import { getData } from './api.js';
import { renderThumbnails } from './thumbnails.js';
import { initFilters } from './filters.js';
import './form.js';

const picturesContainerElement = document.querySelector('.pictures');

const showErrorMessage = (message) => {
  const errorTemplateElement = document.querySelector('#error').content.querySelector('.error');
  const errorElement = errorTemplateElement.cloneNode(true);
  errorElement.classList.add('data-error');
  const errorTitleElement = errorElement.querySelector('.error__title');
  const errorButtonElement = errorElement.querySelector('.error__button');

  errorTitleElement.textContent = message;
  errorButtonElement.textContent = 'Попробовать снова';

  errorButtonElement.addEventListener('click', () => {
    document.location.reload();
  });

  document.body.appendChild(errorElement);
};

const loadAndRenderPhotos = async () => {
  try {
    const photosArray = await getData();
    initFilters(photosArray);
    renderThumbnails(photosArray, picturesContainerElement);
  } catch (error) {
    showErrorMessage(error.message);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  loadAndRenderPhotos();
});
