import { openFullscreen } from './fullscreen-thumbnails.js';

const createThumbnail = (photo) => {
  const templateElement = document.querySelector('#picture').content.querySelector('.picture');
  const thumbnailElement = templateElement.cloneNode(true);

  const imageElement = thumbnailElement.querySelector('.picture__img');
  imageElement.src = photo.url;
  imageElement.alt = photo.description;

  const likesElement = thumbnailElement.querySelector('.picture__likes');
  likesElement.textContent = photo.likes;

  const commentsElement = thumbnailElement.querySelector('.picture__comments');
  commentsElement.textContent = photo.comments.length;

  thumbnailElement.dataset.photoId = photo.id;

  thumbnailElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    openFullscreen(photo);
  });

  return thumbnailElement;
};

const renderThumbnails = (picturesList, picturesContainerElement) => {
  picturesContainerElement.querySelectorAll('.picture').forEach((pictureElement) => pictureElement.remove());

  const fragmentElement = document.createDocumentFragment();

  picturesList.forEach((pictureItem) => {
    const thumbnailElement = createThumbnail(pictureItem);
    fragmentElement.appendChild(thumbnailElement);
  });

  picturesContainerElement.appendChild(fragmentElement);
};

export { renderThumbnails };
