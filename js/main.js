import { thumbnailRenderer } from './thumbnail-renderer.js';
import { formValidator } from './form-validator.js';
import { api } from './api.js';

async function init() {
  try {
    const photos = await api.loadPhotos();
    thumbnailRenderer.renderThumbnails(photos);
  } catch (error) {
    thumbnailRenderer.showLoadError(error.message);
  }

  formValidator.init();
}

document.addEventListener('DOMContentLoaded', init);
