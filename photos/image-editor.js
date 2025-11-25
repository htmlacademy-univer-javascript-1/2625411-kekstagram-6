const imageEditor = (function() {
  const uploadForm = document.querySelector('.img-upload__form');
  const uploadOverlay = document.querySelector('.img-upload__overlay');
  const scaleControlValue = uploadOverlay.querySelector('.scale__control--value');
  const scaleControlSmaller = uploadOverlay.querySelector('.scale__control--smaller');
  const scaleControlBigger = uploadOverlay.querySelector('.scale__control--bigger');
  const imagePreview = uploadOverlay.querySelector('.img-upload__preview img');
  const effectLevel = uploadOverlay.querySelector('.img-upload__effect-level');
  const effectLevelValue = uploadOverlay.querySelector('.effect-level__value');
  const effectLevelSlider = uploadOverlay.querySelector('.effect-level__slider');
  const effectsList = uploadOverlay.querySelector('.effects__list');

  let currentScale = 100;
  let currentEffect = 'none';
  let slider = null;

  const Effects = {
    NONE: 'none',
    CHROME: 'chrome',
    SEPIA: 'sepia',
    MARVIN: 'marvin',
    PHOBOS: 'phobos',
    HEAT: 'heat'
  };

  const EffectConfig = {
    [Effects.CHROME]: {
      filter: 'grayscale',
      min: 0,
      max: 1,
      step: 0.1,
      unit: ''
    },
    [Effects.SEPIA]: {
      filter: 'sepia',
      min: 0,
      max: 1,
      step: 0.1,
      unit: ''
    },
    [Effects.MARVIN]: {
      filter: 'invert',
      min: 0,
      max: 100,
      step: 1,
      unit: '%'
    },
    [Effects.PHOBOS]: {
      filter: 'blur',
      min: 0,
      max: 3,
      step: 0.1,
      unit: 'px'
    },
    [Effects.HEAT]: {
      filter: 'brightness',
      min: 1,
      max: 3,
      step: 0.1,
      unit: ''
    }
  };

  function init() {
    setupEventListeners();
    initSlider();
    resetEditor();
  }

  function setupEventListeners() {
    scaleControlSmaller.addEventListener('click', onScaleControlSmallerClick);
    scaleControlBigger.addEventListener('click', onScaleControlBiggerClick);
    effectsList.addEventListener('change', onEffectsListChange);
  }

  function initSlider() {
    if (effectLevelSlider) {
      slider = noUiSlider.create(effectLevelSlider, {
        range: {
          min: 0,
          max: 100
        },
        start: 100,
        step: 1,
        connect: 'lower'
      });

      slider.on('update', onSliderUpdate);
    }
  }

  function resetEditor() {
    currentScale = 100;
    currentEffect = Effects.NONE;

    updateScale();
    resetEffects();
  }

  function onScaleControlSmallerClick() {
    if (currentScale > 25) {
      currentScale -= 25;
      updateScale();
    }
  }

  function onScaleControlBiggerClick() {
    if (currentScale < 100) {
      currentScale += 25;
      updateScale();
    }
  }

  function updateScale() {
    scaleControlValue.value = `${currentScale}%`;
    const scaleValue = currentScale / 100;
    imagePreview.style.transform = `scale(${scaleValue})`;
  }

  function onEffectsListChange(evt) {
    if (evt.target.name === 'effect') {
      currentEffect = evt.target.value;
      applyEffect(currentEffect);
    }
  }

  function applyEffect(effect) {
    resetImageFilter();

    if (effect === Effects.NONE) {
      hideSlider();
      return;
    }

    showSlider();
    const config = EffectConfig[effect];

    slider.updateOptions({
      range: {
        min: config.min,
        max: config.max
      },
      start: config.max,
      step: config.step
    });

    updateEffectValue(config.max, config);
  }

  function onSliderUpdate(values) {
    const value = parseFloat(values[0]);
    const config = EffectConfig[currentEffect];

    if (config) {
      updateEffectValue(value, config);
    }
  }

  function updateEffectValue(value, config) {
    effectLevelValue.value = value;

    let filterValue;
    if (config.filter === 'invert') {
      filterValue = `${value}%`;
    } else if (config.filter === 'blur') {
      filterValue = `${value}px`;
    } else {
      filterValue = value;
    }

    imagePreview.style.filter = `${config.filter}(${filterValue})`;
  }

  function resetImageFilter() {
    imagePreview.style.filter = 'none';
  }

  function showSlider() {
    effectLevel.classList.remove('hidden');
  }

  function hideSlider() {
    effectLevel.classList.add('hidden');
  }

  function resetEffects() {
    const noneEffect = uploadOverlay.querySelector('#effect-none');
    if (noneEffect) {
      noneEffect.checked = true;
    }

    resetImageFilter();
    hideSlider();

    if (slider) {
      slider.updateOptions({
        range: {
          min: 0,
          max: 100
        },
        start: 100
      });
    }
  }

  function destroy() {
    if (slider) {
      slider.destroy();
    }
  }

  return {
    init,
    destroy,
    resetEditor
  };
})();

export { imageEditor };
