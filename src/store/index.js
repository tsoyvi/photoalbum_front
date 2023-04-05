import { createStore } from 'vuex';

import auth from './blocks/user';
import images from './blocks/images';
import albums from './blocks/albums';
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
    albums,
    auth,
    errors,
  },

});
