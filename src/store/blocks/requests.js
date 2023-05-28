import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_SERVER_APP_URL;
axios.defaults.auth = {
  username: process.env.VUE_APP_SERVER_APP_LOGIN,
  password: process.env.VUE_APP_SERVER_APP_PASS,
};
axios.defaults.withCredentials = true;

export default {

  /**
     * Загрузка файла на сервер
     * @param {string} url
     * @param {object} formData
     * @returns
     */
  async uploadFile(url, formData) {
    try {
      const result = await axios.post(
        url,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      if (result) {
        return { success: true, data: result.data };
      }
      return { success: false, result };
    } catch (error) {
      return { success: false, error };
    }
  },

  async getJson(url) {
    try {
      const result = await axios.get(url);
      if (result) {
        return { success: true, data: result.data };
      }
      return { success: false, error: result.message };
    } catch (error) {
      return { success: false, error };
    }
  },

  async postJson(url, pData) {
    try {
      const result = await axios.post(url, pData);
      if (result) {
        return { success: true, data: result.data };
      }
      return { success: false, error: result.data.message };
    } catch (error) {
      return { success: false, error };
    }
  },

  async putJson(url, pData) {
    try {
      const { data } = await axios.put(url, pData);
      if (data) {
        return { success: true, data };
      }
      return { success: false, error: data.message };
    } catch (error) {
      return { success: false, error };
    }
  },

  async patchJson(url, pData) {
    try {
      const { data } = await axios.patch(url, pData);
      if (data) {
        return { success: true, data };
      }
      return { success: false, error: data.message };
    } catch (error) {
      return { success: false, error };
    }
  },

  async deleteJson(url, pData) {
    try {
      const result = await axios.delete(url, pData);

      if (result) {
        return { success: true, result };
      }
      return { success: false, error: result.data.message };
    } catch (error) {
      return { success: false, error };
    }
  },

  async getImg(url) {
    try {
      const result = await axios.get(
        url,
        {
          responseType: 'arraybuffer',
        },
      );

      if (result) {
        const img = `data:image/jpeg;base64,${btoa(
          new Uint8Array(result.data).reduce((data, byte) => data + String.fromCharCode(byte), ''),
        )}`;
        return { success: true, data: img };
      }
      return { success: false };
    } catch (error) {
      return { success: false, error };
    }
  },

};
