import { thumbnailRenderer } from './thumbnail-renderer.js';
import { mockPhotos } from './mock-data.js';

function init() {
  const picturesContainer = document.querySelector('.pictures');
  thumbnailRenderer.renderThumbnails(mockPhotos, picturesContainer);
}

document.addEventListener('DOMContentLoaded', init);
