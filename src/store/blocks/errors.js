export default ({
  state: {
    errors: null,
  },

  getters: {
    errors(state) {
      return state.errors;
    },
  },

  mutations: {
    ADD_ERROR(state, error) {
      state.errors = error;
      console.log(`error ->${error}`);
      console.log(error.response.statusText);
      console.log(error.response.data.message);
      console.log(error.response.data.errors);
    },

    RESET_ERROR(state) {
      state.errors = null;
    },
  },

  actions: {
    addError({ commit }, error) {
      commit('ADD_ERROR', error);
    },

  },

  modules: {
  },

});
