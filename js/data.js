import { getRandomInteger, getRandomArrayElement, getUniqueId } from './util.js';

const PICTURE_COUNT = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MAX_COMMENTS = 30;
const MAX_AVATAR_NUMBER = 6;
const MIN_ID = 1;
const MAX_COMMENT_ID = 1000;

const DESCRIPTIONS = [
  'Момент, запечатленный навечно.',
  'Новые приключения ждут! 🚀',
  'Просто наслаждаюсь моментом.',
  'Летние вибрации. ☀️',
  'Немного искусства в ленту.',
  'Всем хорошего настроения!',
  'Красота в деталях.',
  'Душевный пейзаж.',
  'Прогулка на закате.',
  'Что-то новенькое.',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Артём',
  'Мария',
  'Иван',
  'Виктория',
  'Дмитрий',
  'Екатерина',
  'Алексей',
  'Ольга',
];

const createComment = () => {
  const id = getUniqueId(MIN_ID, MAX_COMMENT_ID);

  const avatar = `img/avatar-${getRandomInteger(1, MAX_AVATAR_NUMBER)}.svg`;

  let message = getRandomArrayElement(MESSAGES);
  if (Math.random() > 0.5) {
    let secondMessage = getRandomArrayElement(MESSAGES);
    while (secondMessage === message && MESSAGES.length > 1) {
      secondMessage = getRandomArrayElement(MESSAGES);
    }
    message += ` ${secondMessage}`;
  }

  const name = getRandomArrayElement(NAMES);

  return {
    id,
    avatar,
    message,
    name,
  };
};

const createPhotoDescription = (index) => {
  const uniqueId = index + 1;

  return {
    id: uniqueId,
    url: `photos/${uniqueId}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
    comments: Array.from({ length: getRandomInteger(0, MAX_COMMENTS) }, createComment),
  };
};

const generatePhotoDescriptions = () => {
  return Array.from({ length: PICTURE_COUNT }, (item, index) => createPhotoDescription(index));
};

export { generatePhotoDescriptions };
