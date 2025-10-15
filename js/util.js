const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const usedIds = [];

const getUniqueId = (min, max) => {
  let id = getRandomInteger(min, max);
  while (usedIds.includes(id)) {
    id = getRandomInteger(min, max);
  }
  usedIds.push(id);
  return id;
};

export { getRandomInteger, getRandomArrayElement, getUniqueId };
