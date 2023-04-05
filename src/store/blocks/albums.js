import requests from './requests';

export default ({
  state: {
    albums: [
      /* {
        id: 1,
        image: 'https://picsum.photos/500/300?image=2',
        title: 'Техника',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore',
        date: '12.12.2023',
      },
      {
        id: 2,
        image: 'https://picsum.photos/500/300?image=25',
        title: 'Природа',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, consequat.',
        date: '12.10.2020',
      },
      {
        id: 3,
        image: 'https://picsum.photos/500/300?image=27',
        title: 'Природа minim veniam, quis nostrudp ex ea commodo',
        description: 'Lorem ipsum t labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrudp ex ea commodo consequat.',
        date: '12.12.2023',
      },
*/
    ],

  },

  getters: {
    albums(state) {
      return state.albums;
    },
  },

  mutations: {
    SET_ALBUMS(state, albums) {
      state.albums = albums;
    },

    ADD_ALBUM() {
      //   { ...state.user, ...profile }
      // state.albums = [...state.albums, ...album];
    },

    DELETE_ALBUM(state, album) {
      state.albums = state.albums.filter((item) => item.id !== album.id);
    },

  },

  actions: {

    async CREATE_ALBUM({ commit }, album) {
      const result = await requests.uploadFile('/api/v1/albums', album);
      if (result.success === true) {
        console.log(result.data);
        commit('ADD_ALBUM', result.data);
        this.dispatch('GET_ALBUMS');
        return true;
      }

      this.dispatch('addError', result.error);
      return false;
    },

    async GET_ALBUMS({ commit }) {
      const result = await requests.getJson('/api/v1/albums');
      if (result.success === true) {
        // console.log(result.data);
        commit('SET_ALBUMS', result.data.data);
        return true;
      }

      this.dispatch('addError', result.error);
      return false;
    },

    async DELETE_ALBUMS({ commit }, album) {
      const result = await requests.deleteJson(`/api/v1/albums/${album.id}`);
      if (result.success === true) {
        // console.log(result.data);
        commit('DELETE_ALBUM', album);
        this.dispatch('GET_ALBUMS');
        return true;
      }

      this.dispatch('addError', result.error);
      return false;
    },

  },

  modules: {
  },

});
