import { thumbnailRenderer } from './thumbnail-renderer.js';
import { mockPhotos } from './mock-data.js';
import { formValidator } from './form-validator.js';

function init() {
  const picturesContainer = document.querySelector('.pictures');
  thumbnailRenderer.renderThumbnails(mockPhotos, picturesContainer);
  formValidator.init();
}

document.addEventListener('DOMContentLoaded', init);
