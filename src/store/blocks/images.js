import axios from 'axios';
import FileDownload from 'js-file-download';
import requests from './requests';

export default ({
  state: {
    images: [],
  },

  getters: {
    IMAGES(state) {
      return state.images;
    },

  },

  mutations: {
    SET_IMAGES(state, images) {
      state.images = images;
    },

    ADD_IMAGE(state, image) {
      // !!! здесь костыль, перевод строики в число.
      // eslint-disable-next-line no-param-reassign
      image.album_id = parseInt(image.album_id, 10);
      state.images.unshift(image);
    },

    DELETE_IMAGE(state, image) {
      state.images = state.images.filter((item) => item.id !== image.id);
    },

  },

  actions: {

    async CREATE_IMAGE({ commit }, image) {
      const result = await requests.uploadFile('/api/v1/posts', image);
      if (result.success === true) {
        commit('ADD_IMAGE', result.data);
        // this.dispatch('GET_ALBUMS');
        return true;
      }

      this.dispatch('addError', result.error);
      return false;
    },

    async GET_IMAGES({ commit }) {
      const result = await requests.getJson('/api/v1/posts');
      if (result.success === true) {
        console.log(result.data);
        commit('SET_IMAGES', result.data.data);

        return true;
      }

      this.dispatch('addError', result.error);
      return false;
    },

    async DOWNLOAD_IMAGE(nul, image) {
      axios({
        url: `/api/v1/posts/${image.id}/s3large`,
        method: 'GET',
        responseType: 'blob',
      }).then((res) => {
        FileDownload(res.data, `${image.title}.jpg`);
      });
    },

    async DELETE_IMAGE({ commit }, image) {
      const result = await requests.deleteJson(`/api/v1/posts/${image.id}`);
      if (result.success === true) {
        commit('DELETE_IMAGE', image);
        this.dispatch('GET_IMAGES');
        return true;
      }

      this.dispatch('addError', result.error);
      return false;
    },

  },

  modules: {
  },

});
