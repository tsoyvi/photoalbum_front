import axios from 'axios';

export default {

  /**
     * Загрузка файла на сервер
     * @param {string} url
     * @param {object} formData
     * @returns
     */
  async uploadFile(url, formData) {
    try {
      const { data } = await axios.post(
        url,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      // console.log(data);
      if (data.success === true) {
        return { success: true };
      }
      return { success: false, error: data.message };
      //
    } catch (error) {
      console.log(error);
      return { success: false, error };
    }
  },
  async getJson(url) {
    try {
      const { data } = await axios.get(url);
      if (data) {
        return { success: true, data };
      }
      return { success: false, error: data.message };
    } catch (error) {
      console.log(error);
      return { success: false, error };
    }
  },

  async postJson(url, pData) {
    try {
      const { data } = await axios.post(url, pData);

      if (data.success === true) {
        return { success: true, data };
      }
      return { success: false, error: data.message };
    } catch (error) {
      console.log(error);
      return { success: false, error };
    }
  },

  async putJson(url, pData) {
    try {
      const { data } = await axios.put(url, pData);

      if (data.success === true) {
        return { success: true, data };
      }
      return { success: false, error: data.message };
    } catch (error) {
      console.log(error);
      return { success: false, error };
    }
  },

  async deleteJson(url, pData) {
    try {
      const { data } = await axios.delete(url, pData);

      if (data.success === true) {
        return { success: true, data };
      }
      return { success: false, error: data.message };
    } catch (error) {
      console.log(error);
      return { success: false, error };
    }
  },

  async getCsrfToken() {
    try {
      const result = await axios.get('/api/sanctum/csrf-cookie');

      if (result === true) {
        return { success: true };
      }
      return { success: false };
    } catch (error) {
      console.log(error);
      return { success: false, error };
    }
  },

};
