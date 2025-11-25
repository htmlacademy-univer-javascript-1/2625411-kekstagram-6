const API_CONFIG = {
  BASE_URL: 'https://29.javascript.htmlacademy.pro/kekstagram',
  TIMEOUT: 10000,
  Routes: {
    GET_DATA: '/data',
    SEND_DATA: '/'
  }
};

const api = (function() {
  async function loadPhotos() {
    try {
      const response = await fetch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.Routes.GET_DATA}`,
        {
          method: 'GET',
          timeout: API_CONFIG.TIMEOUT
        }
      );

      if (!response.ok) {
        throw new Error(`Ошибка загрузки: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      throw new Error(`Не удалось загрузить фотографии: ${error.message}`);
    }
  }

  async function sendPhoto(formData) {
    try {
      const response = await fetch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.Routes.SEND_DATA}`,
        {
          method: 'POST',
          body: formData,
          timeout: API_CONFIG.TIMEOUT
        }
      );

      if (!response.ok) {
        throw new Error(`Ошибка отправки: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      throw new Error(`Не удалось отправить фотографию: ${error.message}`);
    }
  }

  return {
    loadPhotos,
    sendPhoto
  };
})();

export { api };
