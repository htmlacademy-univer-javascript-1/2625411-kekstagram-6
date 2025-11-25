import { fullscreenViewer } from './fullscreen-viewer.js';

const thumbnailRenderer = (function() {
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const picturesContainer = document.querySelector('.pictures');
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');

  function createThumbnailElement(photoData) {
    const thumbnailElement = pictureTemplate.cloneNode(true);

    const image = thumbnailElement.querySelector('.picture__img');
    image.src = photoData.url;
    image.alt = photoData.description;

    thumbnailElement.querySelector('.picture__comments').textContent = photoData.comments.length;
    thumbnailElement.querySelector('.picture__likes').textContent = photoData.likes;

    thumbnailElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      fullscreenViewer.openFullscreen(photoData);
    });

    thumbnailElement.dataset.photoId = photoData.id;

    return thumbnailElement;
  }

  function renderThumbnails(photosData) {
    const fragment = document.createDocumentFragment();

    photosData.forEach(photo => {
      const thumbnailElement = createThumbnailElement(photo);
      fragment.appendChild(thumbnailElement);
    });

    picturesContainer.innerHTML = '';
    picturesContainer.appendChild(fragment);
  }

  function showLoadError(message) {
    const errorElement = errorTemplate.cloneNode(true);
    const errorTitle = errorElement.querySelector('.error__title');
    const errorButton = errorElement.querySelector('.error__button');

    errorTitle.textContent = message;
    errorButton.textContent = 'Попробовать снова';

    errorButton.addEventListener('click', () => {
      errorElement.remove();
      window.location.reload();
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

  return {
    renderThumbnails,
    showLoadError
  };
})();

export { thumbnailRenderer };
