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
