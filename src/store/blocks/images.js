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
      // state.images = [...images];
      state.images = state.images.concat(images);
      /* console.log(state.images);
      state.images = images; */
      // console.log(state.images);
    },

    ADD_IMAGE(state, image) {
      // !!! здесь костыль, перевод строики в число.
      // eslint-disable-next-line no-param-reassign
      image.album_id = parseInt(image.album_id, 10);
      state.images.unshift(image);
    },

    UPDATE_IMAGE(state, editedImage) {
      let urlImage = `/api/v1/posts/${editedImage.id}/s3large`;

      /*      fetch(urlImage, { cache: 'reload' });

      document.body.querySelectorAll(`img[src='${urlImage}']`)
        // eslint-disable-next-line no-return-assign, no-param-reassign
        .forEach((img) => img.src = urlImage);
*/
      urlImage = `/api/v1/posts/${editedImage.id}/s3small`;
      fetch(urlImage, { cache: 'reload', mode: 'no-cors' });
      document.body.querySelectorAll(`img[src='${urlImage}']`)
        // eslint-disable-next-line no-return-assign, no-param-reassign
        .forEach((img) => img.src = urlImage);
    },

    MOVE_IMAGE(state, { img, albumId }) {
      const index = state.images.findIndex((image) => image.id === img.id);
      state.images[index].album_id = albumId;
      // state.albums[index].image = `/api/v1/albums/${editedAlbum.id}/s3cover`;
    },

    DELETE_IMAGE(state, img) {
      const index = state.images.findIndex((image) => image.id === img.id);
      state.images[index].album_id = 0;
    },

    SHARE_IMAGE(state, { image, link }) {
      const index = state.images.findIndex((img) => img.id === image.id);
      state.images[index].share_link = link;
    },

    DELETE_SHARE_IMAGE(state, img) {
      const index = state.images.findIndex((image) => image.id === img.id);
      state.images[index].share_link = '';
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
        commit('SET_IMAGES', result.data.data);
        return true;
      }

      this.dispatch('addError', result.error);
      return false;
    },

    // eslint-disable-next-line no-unused-vars
    async GET_IMAGES_IN_ALBUM({ commit }, payload = null) {
      // /api/v1/albums/{album_id}/posts
      console.log(payload.albumId);
      const result = await requests.getJson(`/api/v1/albums/${payload.albumId}/posts?page=${payload.page}`);
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
        if (image.title !== '') {
          FileDownload(res.data, `${image.title}.jpg`);
        } else {
          FileDownload(res.data, `${image.id}.jpg`);
        }
      });
    },

    async ROTATE_IMAGE({ commit }, { image, schema }) {
      /* const schema = {
        size": "S",
        "angle": 90,
        "bgcolor": "#ffffff"
      }; */

      const result = await requests.postJson(`/api/v1/posts/${image.id}/rotate`, schema);
      if (result.success === true) {
        // console.log(result.data);
        commit('UPDATE_IMAGE', image);

        return true;
      }

      this.dispatch('addError', result.error);
      return false;
    },

    async DELETE_IMAGE({ commit }, image) {
      const result = await requests.deleteJson(`/api/v1/posts/${image.id}`);
      if (result.success === true) {
        commit('DELETE_IMAGE', image);
        // this.dispatch('GET_IMAGES');
        return true;
      }

      this.dispatch('addError', result.error);
      return false;
    },

    async MOVE_IMAGE({ commit }, { image, albumId }) {
      const schema = {
        album_id: albumId,
      };
      const result = await axios.put(`/api/v1/posts/${image.id}`, schema);
      if (result.status === 204) {
        commit('MOVE_IMAGE', { img: image, albumId });
        console.log(result.status);
        return true;
      }
      this.dispatch('addError', result.error);
      return false;
    },

    async SHARE_IMAGE({ commit }, image) {
      /* const schema = {
        size": "S",
        "angle": 90,
        "bgcolor": "#ffffff"
      }; */
      // /api/v1/posts/{post_id}/share
      const result = await requests.postJson(`/api/v1/posts/${image.id}/share`);
      if (result.success === true) {
        // console.log(result.data);
        commit('SHARE_IMAGE', { image, link: result.data.share_link });
        return true;
      }
      this.dispatch('addError', result.error);
      return false;
    },

    async DELETE_SHARE_IMAGE({ commit }, image) {
      /* const schema = {
        size": "S",
        "angle": 90,
        "bgcolor": "#ffffff"
      }; */
      // /api/v1/posts/{post_id}/share
      const result = await requests.postJson(`/api/v1/posts/${image.id}/unshare`);
      if (result.success === true) {
        console.log(result);
        commit('DELETE_SHARE_IMAGE', image);
        return result.data.share_link;
      }
      this.dispatch('addError', result.error);
      return false;
    },

  },

  modules: {
  },

});
