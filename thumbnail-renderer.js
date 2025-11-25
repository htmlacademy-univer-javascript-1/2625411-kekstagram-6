const thumbnailRenderer = (function() {
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  function createThumbnailElement(photoData) {
    const thumbnailElement = pictureTemplate.cloneNode(true);

    const image = thumbnailElement.querySelector('.picture__img');
    image.src = photoData.url;
    image.alt = photoData.description;

    thumbnailElement.querySelector('.picture__likes').textContent = photoData.likes;
    thumbnailElement.querySelector('.picture__comments').textContent = photoData.comments.length;

    thumbnailElement.dataset.photoId = photoData.id;

    return thumbnailElement;
  }

  function renderThumbnails(photosData, container) {
    const fragment = document.createDocumentFragment();

    photosData.forEach(photo => {
      const thumbnailElement = createThumbnailElement(photo);
      fragment.appendChild(thumbnailElement);
    });

    container.innerHTML = '';
    container.appendChild(fragment);
  }

  return {
    renderThumbnails
  };
})();

export { thumbnailRenderer };
