import { debounce } from './functions.js';

const photoFilter = (function() {
  const filtersContainer = document.querySelector('.img-filters');
  const filtersForm = document.querySelector('.img-filters__form');
  const filterButtons = filtersForm.querySelectorAll('.img-filters__button');

  let currentPhotos = [];
  let currentFilter = 'filter-default';

  const FilterType = {
    DEFAULT: 'filter-default',
    RANDOM: 'filter-random',
    DISCUSSED: 'filter-discussed'
  };

  const RANDOM_PHOTOS_COUNT = 10;

  function init(photos) {
    currentPhotos = photos;
    showFilters();
    setupEventListeners();
  }

  function showFilters() {
    filtersContainer.classList.remove('img-filters--inactive');
  }

  function setupEventListeners() {
    const debouncedFilterHandler = debounce(handleFilterChange, 500);

    filtersForm.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('img-filters__button')) {
        const selectedFilter = evt.target.id;

        if (selectedFilter !== currentFilter) {
          updateActiveFilter(selectedFilter);
          debouncedFilterHandler(selectedFilter);
        }
      }
    });
  }

  function updateActiveFilter(selectedFilter) {
    filterButtons.forEach(button => {
      button.classList.remove('img-filters__button--active');
    });

    const activeButton = filtersForm.querySelector(`#${selectedFilter}`);
    activeButton.classList.add('img-filters__button--active');

    currentFilter = selectedFilter;
  }

  function handleFilterChange(filterType) {
    let filteredPhotos;

    switch (filterType) {
      case FilterType.RANDOM:
        filteredPhotos = getRandomPhotos();
        break;
      case FilterType.DISCUSSED:
        filteredPhotos = getDiscussedPhotos();
        break;
      case FilterType.DEFAULT:
      default:
        filteredPhotos = getDefaultPhotos();
        break;
    }

    return filteredPhotos;
  }

  function getDefaultPhotos() {
    return [...currentPhotos];
  }

  function getRandomPhotos() {
    const shuffledPhotos = [...currentPhotos]
      .sort(() => Math.random() - 0.5);

    return shuffledPhotos.slice(0, RANDOM_PHOTOS_COUNT);
  }

  function getDiscussedPhotos() {
    return [...currentPhotos].sort((a, b) => {
      return b.comments.length - a.comments.length;
    });
  }

  function getCurrentFilter() {
    return currentFilter;
  }

  function getFilteredPhotos() {
    return handleFilterChange(currentFilter);
  }

  return {
    init,
    getFilteredPhotos,
    getCurrentFilter
  };
})();

export { photoFilter };
