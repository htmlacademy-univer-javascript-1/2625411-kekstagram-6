/**
 * @param {string} textToValidate
 * @param {number} maximumLength
 * @returns {boolean}
 */
const checkTextLength = (textToValidate, maximumLength) => textToValidate.length <= maximumLength;

// Примеры использования функции
console.log('--- Проверка длины строки ---');
console.log(`'проверяемая строка', 20: ${checkTextLength('проверяемая строка', 20)}`);
console.log(`'проверяемая строка', 18: ${checkTextLength('проверяемая строка', 18)}`);
console.log(`'проверяемая строка', 10: ${checkTextLength('проверяемая строка', 10)}`);
console.log(`'', 0: ${checkTextLength('', 0)}`);

/**
 * @param {string} sourceString
 * @returns {boolean}
 */
const isStringAPalindrome = (sourceString) => {
  const normalizedString = sourceString.replaceAll(' ', '').toLowerCase();

  let reversedString = '';

  for (let i = normalizedString.length - 1; i >= 0; i--) {
    reversedString += normalizedString[i];
  }

  return normalizedString === reversedString;
};


// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_throttle

function throttle (callback, delayBetweenFrames) {
  // Используем замыкания, чтобы время "последнего кадра" навсегда приклеилось
  // к возвращаемой функции с условием, тогда мы его сможем перезаписывать
  let lastTime = 0;

  return (...rest) => {
    // Получаем текущую дату в миллисекундах,
    // чтобы можно было в дальнейшем
    // вычислять разницу между кадрами
    const now = new Date();

    // Если время между кадрами больше задержки,
    // вызываем наш колбэк и перезаписываем lastTime
    // временем "последнего кадра"
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}

// Примеры использования функции
console.log('\n--- Проверка палиндрома ---');
console.log(`'топот': ${isStringAPalindrome('топот')}`);
console.log(`'ДовОд': ${isStringAPalindrome('ДовОд')}`);
console.log(`'Кекс': ${isStringAPalindrome('Кекс')}`);
console.log(`'Лёша на полке клопа нашёл ': ${isStringAPalindrome('Лёша на полке клопа нашёл ')}`);
console.log(`'А роза упала на лапу Азора': ${isStringAPalindrome('А роза упала на лапу Азора')}`);

// Делу - время
const isMeetingInWorkDay = (workStart, workEnd, meetingStart, duration) => {

  const timeToMinutes = (timeString) => {
    const parts = timeString.split(':');
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    return hours * 60 + minutes;
  };

  const workStartMinutes = timeToMinutes(workStart);
  const workEndMinutes = timeToMinutes(workEnd);
  const meetingStartMinutes = timeToMinutes(meetingStart);

  const meetingEndMinutes = meetingStartMinutes + duration;

  const isStartValid = meetingStartMinutes >= workStartMinutes;
  const isEndValid = meetingEndMinutes <= workEndMinutes;

  return isStartValid && isEndValid;
};
