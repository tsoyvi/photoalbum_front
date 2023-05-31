import axios from 'axios';
import FileDownload from 'js-file-download';
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
      state.albums = albums.map((album) => {
        if (album.image) return { ...album, image: `/v1/albums/${album.id}/s3cover` };
        return { ...album };
      });
    },

    ADD_ALBUM() {
      //   { ...state.user, ...profile }
      // state.albums = [...state.albums, ...album];
    },

    UPDATE_ALBUM(state, editedAlbum) {
      const index = state.albums.findIndex((album) => album.id === editedAlbum.id);
      state.albums[index] = { ...state.albums[index], ...editedAlbum };
      state.albums[index].image = `/v1/albums/${editedAlbum.id}/s3cover`;

      fetch(editedAlbum.image, { cache: 'reload', mode: 'no-cors' });
      document.body.querySelectorAll(`img[src='${editedAlbum.image}']`)
        // eslint-disable-next-line no-return-assign, no-param-reassign
        .forEach((img) => img.src = editedAlbum.image);
    },

    DELETE_ALBUM(state, album) {
      state.albums = state.albums.filter((item) => item.id !== album.id);
    },

  },

  actions: {

    async CREATE_ALBUM({ commit }, album) {
      const result = await requests.uploadFile('/v1/albums', album);
      if (result.success === true) {
        // console.log(result.data);
        commit('ADD_ALBUM', result.data);
        this.dispatch('GET_ALBUMS');
        return true;
      }

      this.dispatch('addError', result.error);
      return false;
    },

    async GET_ALBUMS({ commit }) {
      const result = await requests.getJson('/v1/albums');
      if (result.success === true) {
        // console.log(result.data);
        commit('SET_ALBUMS', result.data.data);
        return true;
      }

      this.dispatch('addError', result.error);
      return false;
    },

    async UPDATE_ALBUM({ commit }, { formData, album }) {
      const result = await requests.uploadFile(`/v1/albums/${album.id}`, formData);
      if (result.success === true) {
        // console.log(result.data);
        commit('UPDATE_ALBUM', album);
        // this.dispatch('GET_ALBUMS');
        return true;
      }

      this.dispatch('addError', result.error);
      return false;
    },

    async DELETE_ALBUMS({ commit }, album) {
      const result = await requests.deleteJson(`/v1/albums/${album.id}`);
      if (result.success === true) {
        // console.log(result.data);
        commit('DELETE_ALBUM', album);
        this.dispatch('GET_ALBUMS');
        return true;
      }

      this.dispatch('addError', result.error);
      return false;
    },

    async DOWNLOAD_ALBUM(nul, album) {
      axios({
        url: `/v1/albums/${album.id}/download-zip`,
        method: 'GET',
        responseType: 'blob',
      }).then((res) => {
        FileDownload(res.data, `${album.title}.zip`);
      });
    },

  },

  modules: {
  },

});
