// import axios from 'axios';
import requests from './requests';
import router from '../../router';

export default ({
  state: {
    status: false,
    user: {},
  },

  getters: {
    authStatus(state) {
      return state.status;
    },

    USER(state) {
      return state.user;
    },
  },

  mutations: {
    AUTH_REQUEST(state) {
      state.status = 'loading';
    },

    AUTH_SUCCESS(state, user) {
      state.status = true;
      state.user = { ...state.user, ...user };
      window.isLoggedin = true;
    },

    USER_PROFILE(state, profile) {
      state.user = { ...state.user, ...profile };
    },

    AUTH_ERROR(state) {
      state.status = false;
      window.isLoggedin = false;
      router.push('/');
    },

    LOGOUT(state) {
      state.status = false;
      state.user = [];
      window.isLoggedin = false;
      router.push('/');
    },
  },

  actions: {

    async REGISTRATION_USER({ commit }, user) {
      const result = await requests.postJson('/api/register', user);
      if (result) {
        console.log(result);
        commit('SET_FORM_DATA_FILL', result.data.data);
        return true;
      }

      this.dispatch('addError', result.error);
      return false;
    },

    async LOGIN_USER({ commit }, user) {
      const result = await requests.postJson('/api/login', user);
      if (result) {
        console.log(result);
        commit('SET_FORM_DATA_FILL', result.data);
        this.dispatch('СНЕК_LOGIN');
        return true;
      }
      this.dispatch('addError', result.error);
      return false;
    },

    async СНЕК_LOGIN({ commit }) {
      commit('AUTH_REQUEST');// /api/v1/user

      const result = await requests.getJson('/api/v1/user');
      // console.log(result);
      if (result.success) {
        commit('AUTH_SUCCESS', result.data);
        this.dispatch('GET_USER_PROFILE');
      } else {
        commit('LOGOUT'); // Разлогиниваем пользователя
        commit('AUTH_ERROR'); // обработчик ошибок
      }
    },

    async LOGOUT({ commit }) {
      const result = await requests.postJson('/api/logout');

      if (result) {
        commit('LOGOUT'); // Разлогиниваем пользователя
        router.push('/');
        return true;
      }
      commit('AUTH_ERROR');
      return false;
    },

    async GET_USER_PROFILE({ commit }) {
      const result = await requests.getJson('/api/v1/profile');
      // console.log(result);
      if (result.success) {
        commit('USER_PROFILE', result.data);
        this.dispatch('GET_USER_AVATAR');
        return true;
      }
      this.dispatch('addError', result.error);
      return false;
    },

    async GET_USER_AVATAR({ commit }) {
      const result = await requests.getImg('/api/v1/profile/s3avatar/');
      // console.log(result.data);
      if (result.success) {
        commit('USER_PROFILE', { image: result.data });
        return true;
      }
      this.dispatch('addError', result.error);
      return false;
    },

    async UPDATE_USER_PROFILE({ commit }, user) {
      // const result = await requests.patchJson('/api/v1/profile', user);
      const result = await requests.uploadFile('/api/v1/profile', user);
      console.log(user);
      if (result) {
        console.log(result);
        commit('SET_FORM_DATA_FILL', result.data);
        // this.dispatch('СНЕК_LOGIN');
        return true;
      }
      this.dispatch('addError', result.error);
      return false;
    },

    async UPLOAD_USER_AVATAR({ commit }, userImage) {
      const result = await requests.uploadFile('/api/v1/profile', userImage);
      console.log(userImage);
      if (result) {
        // console.log(result);
        commit('SET_FORM_DATA_FILL', result.data);
        // this.dispatch('СНЕК_LOGIN');
        return true;
      }
      this.dispatch('addError', result.error);
      return false;
    },

  },

  modules: {
  },

});
