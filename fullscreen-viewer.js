const fullscreenViewer = (function() {
  const bigPicture = document.querySelector('.big-picture');
  const body = document.body;
  const cancelButton = bigPicture.querySelector('.big-picture__cancel');
  const commentsLoader = bigPicture.querySelector('.comments-loader');
  const socialCommentCount = bigPicture.querySelector('.social__comment-count');

  let currentComments = [];
  let commentsShown = 0;
  const COMMENTS_PER_PORTION = 5;

  function openFullscreen(photoData) {
    const img = bigPicture.querySelector('.big-picture__img img');
    img.src = photoData.url;
    img.alt = photoData.description;

    bigPicture.querySelector('.likes-count').textContent = photoData.likes;
    bigPicture.querySelector('.comments-count').textContent = photoData.comments.length;
    bigPicture.querySelector('.social__caption').textContent = photoData.description;

    currentComments = photoData.comments;
    commentsShown = 0;

    socialCommentCount.classList.remove('hidden');
    commentsLoader.classList.remove('hidden');

    renderComments();

    bigPicture.classList.remove('hidden');
    body.classList.add('modal-open');

    document.addEventListener('keydown', onDocumentKeydown);
    cancelButton.addEventListener('click', closeFullscreen);
    commentsLoader.addEventListener('click', onCommentsLoaderClick);
  }

  function renderComments() {
    const commentsContainer = bigPicture.querySelector('.social__comments');
    commentsContainer.innerHTML = '';

    const commentsToShow = currentComments.slice(0, commentsShown + COMMENTS_PER_PORTION);
    commentsShown = commentsToShow.length;

    const fragment = document.createDocumentFragment();

    commentsToShow.forEach(comment => {
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

    updateCommentsCounter();

    if (commentsShown >= currentComments.length) {
      commentsLoader.classList.add('hidden');
    }
  }

  function updateCommentsCounter() {
    socialCommentCount.innerHTML = `${commentsShown} из <span class="comments-count">${currentComments.length}</span> комментариев`;
  }

  function onCommentsLoaderClick() {
    renderComments();
  }

  function closeFullscreen() {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');

    document.removeEventListener('keydown', onDocumentKeydown);
    cancelButton.removeEventListener('click', closeFullscreen);
    commentsLoader.removeEventListener('click', onCommentsLoaderClick);

    currentComments = [];
    commentsShown = 0;
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
