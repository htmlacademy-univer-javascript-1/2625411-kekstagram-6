const fullscreenViewer = (function() {
  const bigPicture = document.querySelector('.big-picture');
  const body = document.body;
  const cancelButton = bigPicture.querySelector('.big-picture__cancel');

  function openFullscreen(photoData) {
    const img = bigPicture.querySelector('.big-picture__img img');
    img.src = photoData.url;
    img.alt = photoData.description;

    bigPicture.querySelector('.likes-count').textContent = photoData.likes;
    bigPicture.querySelector('.comments-count').textContent = photoData.comments.length;
    bigPicture.querySelector('.social__caption').textContent = photoData.description;

    renderComments(photoData.comments);

    bigPicture.querySelector('.social__comment-count').classList.add('hidden');
    bigPicture.querySelector('.comments-loader').classList.add('hidden');

    bigPicture.classList.remove('hidden');
    body.classList.add('modal-open');

    document.addEventListener('keydown', onDocumentKeydown);
    cancelButton.addEventListener('click', closeFullscreen);
  }

  function renderComments(comments) {
    const commentsContainer = bigPicture.querySelector('.social__comments');
    commentsContainer.innerHTML = '';

    const fragment = document.createDocumentFragment();

    comments.forEach(comment => {
      const commentElement = document.createElement('li');
      commentElement.classList.add('social__comment');

      commentElement.innerHTML = `
        <img
          class="social__picture"
          src="${comment.avatar}"
          alt="${comment.name}"
          width="35" height="35">
        <p class="social__text">${comment.message}</p>
      `;

      fragment.appendChild(commentElement);
    });

    commentsContainer.appendChild(fragment);
  }

  function closeFullscreen() {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');

    document.removeEventListener('keydown', onDocumentKeydown);
    cancelButton.removeEventListener('click', closeFullscreen);
  }

  function onDocumentKeydown(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeFullscreen();
    }
  }

  return {
    openFullscreen
  };
})();

export { fullscreenViewer };
