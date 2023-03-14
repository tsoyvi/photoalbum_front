import axios from 'axios';
import requests from './requests';
import router from '../../router';

export default ({
  state: {
    status: false,
    user: [],
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
      state.user = user;
      window.isLoggedin = true;
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
    /*
        LOGIN_USER({ commit }, user) {
          axios.get('/api/sanctum/csrf-cookie').then(() => {
            axios.post('/api/v1/login', user)
              .then((response) => {
                if (response.data.success) {
                  commit('AUTH_SUCCESS', response.data.user);
                  console.log(response.data.user);
                } else {
                  commit('AUTH_ERROR', response.data.message);
                  console.log(response.data.message);
                }
              });
          });
        },
    */
    async REGISTRATION_USER({ commit }, user) {
      const result = await requests.postJson('/api/v1/register', user);
      if (result) {
        console.log(result);
        commit('SET_FORM_DATA_FILL', result.data.data);
        return true;
      }

      this.dispatch('addError', result.error);
      return false;
    },

    async LOGIN_USER({ commit }, user) {
      const result = await requests.postJson('/api/v1/login', user);
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
      commit('AUTH_REQUEST');
      const result = await requests.getJson('/api/v1/user');
      console.log(result);
      if (result.success) {
        commit('AUTH_SUCCESS', result.data);
      } else {
        commit('LOGOUT'); // Разлогиниваем пользователя
        commit('AUTH_ERROR'); // обработчик ошибок
      }
    },

    async LOGOUT({ commit }) {
      const result = await axios.post('/api/v1/logout');
      if (result) {
        commit('LOGOUT'); // Разлогиниваем пользователя
        router.push('/');
        return true;
      }
      commit('AUTH_ERROR');
      return false;
    },

    /*
   // кнопка сохранить (из журнала заявок)
      async addFormKss({ commit }, data) {
        const result = await requests.postJson('/api/result-control-att-kss', data);
        if (result.success === true) {
          console.log(result.data);
          commit('SET_FORM_DATA_FILL', result.data.data);
          return true;
        }

        this.dispatch('addError', result.error);
        return false;
      },

      async checkLogin({ commit }) {
        commit('AUTH_REQUEST');
        const { data } = await axios.get('api/check_login');

        // console.log(data);
        if (data.success) {
          commit('AUTH_SUCCESS', data.user);
        } else {
          commit('AUTH_ERROR');
        }
      },

      async login({ commit }, user) {
        axios.get('/sanctum/csrf-cookie').then(() => {
          axios.post('api/login', {
            login: user.login,
            password: user.password,
            remember: user.remember,
          })
            .then((response) => {
              if (response.data.success) {
                commit('AUTH_SUCCESS', response.data.user);
                router.push(window.laravelPath || '/');
              } else {
                commit('AUTH_ERROR', response.data.message);
              }
            });
        });
      },

      async logout({ commit }) {
        const { data } = await axios.get('api/logout');
        if (data.success) {
          commit('LOGOUT');
          router.push('login');
        }
      },

  */

  },

  modules: {
  },

});
