const BASE_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  [Method.GET]: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  [Method.POST]: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const load = async (route, errorText, method = Method.GET, body = null) => {
  try {
    const response = await fetch(`${BASE_URL}${route}`, {
      method,
      body,
    });

    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  } catch (err) {
    throw new Error(errorText);
  }
};

const getData = () => load(Route.GET_DATA, ErrorText[Method.GET]);

const sendData = (body) => load(Route.SEND_DATA, ErrorText[Method.POST], Method.POST, body);

export { getData, sendData };
