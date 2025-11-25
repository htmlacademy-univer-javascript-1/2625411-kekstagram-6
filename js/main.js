import { thumbnailRenderer } from './thumbnail-renderer.js';
import { formValidator } from './form-validator.js';
import { photoFilter } from './photo-filter.js';
import { api } from './api.js';

async function init() {
  try {
    const photos = await api.loadPhotos();
    photoFilter.init(photos);

    // Первоначальная отрисовка с фильтром по умолчанию
    const initialPhotos = photoFilter.getFilteredPhotos();
    thumbnailRenderer.renderThumbnails(initialPhotos);

    // Обработчик изменения фильтра
    setupFilterHandler();
  } catch (error) {
    thumbnailRenderer.showLoadError(error.message);
  }

  formValidator.init();
}

function setupFilterHandler() {
  const filtersForm = document.querySelector('.img-filters__form');

  filtersForm.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('img-filters__button')) {
      const filteredPhotos = photoFilter.getFilteredPhotos();
      thumbnailRenderer.renderThumbnails(filteredPhotos);
    }
  });
}

document.addEventListener('DOMContentLoaded', init);
