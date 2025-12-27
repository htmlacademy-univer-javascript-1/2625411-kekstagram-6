import { debounce } from './util.js';
import { renderThumbnails } from './thumbnails.js';

const RANDOM_PHOTOS_COUNT = 10;
const RERENDER_DELAY = 500;

const filtersElement = document.querySelector('.img-filters');
const filterButtonsElement = filtersElement.querySelector('.img-filters__form');
const picturesContainerElement = document.querySelector('.pictures');

let currentFilter = 'default';
let photos = [];

const showFilters = () => {
  filtersElement.classList.remove('img-filters--inactive');
};

const getRandomPhotos = (photosArray, count) => {
  const shuffled = [...photosArray].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const getDiscussedPhotos = (photosArray) =>
  [...photosArray].sort((a, b) => b.comments.length - a.comments.length);

const applyFilter = (filter) => {
  let filteredPhotos = [];

  switch (filter) {
    case 'random':
      filteredPhotos = getRandomPhotos(photos, RANDOM_PHOTOS_COUNT);
      break;
    case 'discussed':
      filteredPhotos = getDiscussedPhotos(photos);
      break;
    case 'default':
    default:
      filteredPhotos = [...photos];
      break;
  }

  const currentThumbnails = picturesContainerElement.querySelectorAll('.picture');
  currentThumbnails.forEach((thumbnail) => thumbnail.remove());

  renderThumbnails(filteredPhotos, picturesContainerElement);
};

const updateActiveFilterButton = (activeButton) => {
  const buttons = filterButtonsElement.querySelectorAll('.img-filters__button');
  buttons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });

  activeButton.classList.add('img-filters__button--active');
};

const debouncedApplyFilter = debounce(applyFilter, RERENDER_DELAY);

const onFilterClick = (evt) => {
  const target = evt.target;

  if (!target.classList.contains('img-filters__button')) {
    return;
  }

  evt.preventDefault();

  const selectedFilter = target.id.replace('filter-', '');

  if (selectedFilter === currentFilter) {
    return;
  }

  currentFilter = selectedFilter;

  updateActiveFilterButton(target);

  debouncedApplyFilter(currentFilter);
};

const initFilters = (loadedPhotos) => {
  photos = loadedPhotos;

  showFilters();

  filterButtonsElement.addEventListener('click', onFilterClick);
};

export { initFilters };
