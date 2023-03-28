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
          auth: {
            username: process.env.VUE_APP_SERVER_APP_LOGIN,
            password: process.env.VUE_APP_SERVER_APP_PASS,
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
      const result = await axios.get(url, {
        auth: {
          username: process.env.VUE_APP_SERVER_APP_LOGIN,
          password: process.env.VUE_APP_SERVER_APP_PASS,
        },
      });
      // console.log(result);
      if (result.data) {
        return { success: true, data: result.data };
      }
      return { success: false, error: result.message };
    } catch (error) {
      console.log(error);
      return { success: false, error };
    }
  },

  async postJson(url, pData) {
    try {
      const result = await axios.post(
        url,
        pData,
        {
          auth: {
            username: process.env.VUE_APP_SERVER_APP_LOGIN,
            password: process.env.VUE_APP_SERVER_APP_PASS,
          },
        },
      );

      if (result) {
        return { success: true, data: result.data };
      }
      return { success: false, error: result.data.message };
    } catch (error) {
      console.log(error);
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
      console.log(error);
      return { success: false, error };
    }
  },

  async patchJson(url, pData) {
    try {
      const { data } = await axios.patch(url, pData);
      console.log(data);
      if (data) {
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

  async getImg(url) {
    try {
      const result = await axios.get(
        url,
        {
          // responseType: 'stream',
          responseType: 'arraybuffer',
          auth: {
            username: process.env.VUE_APP_SERVER_APP_LOGIN,
            password: process.env.VUE_APP_SERVER_APP_PASS,
          },
        },
      );

      // console.log(result.data);

      if (result) {
        const img = `data:image/jpeg;base64,${btoa(
          new Uint8Array(result.data).reduce((data, byte) => data + String.fromCharCode(byte), ''),
        )}`;
        return { success: true, data: img };
      }
      return { success: false };
    } catch (error) {
      console.log(error);
      return { success: false, error };
    }
  },

};
