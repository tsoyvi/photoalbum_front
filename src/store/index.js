import { createStore } from 'vuex';

import auth from './blocks/auth';
import images from './blocks/images';
import errors from './blocks/errors';

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },

  modules: {
    images,
    auth,
    errors,
  },

});
