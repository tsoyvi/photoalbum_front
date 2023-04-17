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

  },

  actions: {

    async CREATE_IMAGE({ commit }, image) {
      const result = await requests.uploadFile('/api/v1/posts', image);
      if (result.success === true) {
        console.log(result.data);
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

  },

  modules: {
  },

});
