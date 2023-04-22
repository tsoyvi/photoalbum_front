export default ({
  state: {
    errors: [],
  },

  getters: {
    errors(state) {
      return state.errors;
    },
  },

  mutations: {
    ADD_ERROR(state, error) {
      state.errors.push(error);
    },

    CLOSE_ERROR(state, index) {
      state.errors.splice(index, 1);
    },

    RESET_ERRORS(state) {
      state.errors = [];
    },
  },

  actions: {
    addError({ commit }, error) {
      commit('ADD_ERROR', error);
    },

    closeError({ commit }, index) {
      commit('CLOSE_ERROR', index);
    },

    resetErrors({ commit }) {
      commit('RESET_ERRORS');
    },
  },

  modules: {
  },

});
