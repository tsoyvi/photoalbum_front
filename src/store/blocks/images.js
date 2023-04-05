import requests from './requests';

export default ({
  state: {
    images: [
      {
        id: 1,
        url: 'https://picsum.photos/500/300?image=5',
        description: 'ноут',
        title: 'Ноут',
        date: '15.06.2020',
        albumId: 1,
      },
      {
        id: 2,
        url: 'https://picsum.photos/800/600?image=10',
        description: 'лес',
        title: 'Лес',
        date: '15.06.2020',
        albumId: 2,
      },
      {
        id: 3,
        url: 'https://picsum.photos/800/600?image=92',
        description: 'пляж',
        title: 'Песок на пляже',
        date: '15.06.2020',
        albumId: 2,
      },

      {
        id: 4,
        url: 'https://picsum.photos/800/600?image=100',
        description: 'пляж',
        title: 'Пляж',
        date: '15.06.2020',
        albumId: 2,
      },
      {
        id: 5,
        url: 'https://picsum.photos/800/600?image=49',
        description: 'пляж',
        title: 'Природа',
        date: '15.06.2020',
        albumId: 2,
      },
      {
        id: 6,
        url: 'https://picsum.photos/800/600?image=26',
        description: 'пляж',
        title: 'adipisicing',
        date: '15.06.2020',
        albumId: 2,
      },
      {
        id: 7,
        url: 'https://picsum.photos/800/600?image=92',
        description: 'пляж',
        title: 'perspiciatis',
        date: '15.06.2020',
        albumId: 1,
      },
      {
        id: 8,
        url: 'https://picsum.photos/800/600?image=89',
        description: 'пляж',
        title: 'harum quia',
        date: '15.06.2020',
        albumId: 1,
      },
      {
        id: 9,
        url: 'https://picsum.photos/800/600?image=9',
        description: 'пляж',
        title: 'consectetur',
        date: '15.06.2020',
        albumId: 2,
      },
      {
        id: 10,
        url: 'https://picsum.photos/800/600?image=10',
        description: 'пляж',
        title: 'ducimus alias',
        date: '15.06.2020',
        albumId: 2,
      },
      {
        id: 11,
        url: 'https://picsum.photos/800/600?image=11',
        description: 'пляж',
        title: 'ipsum dolor',
        date: '15.06.2020',
        albumId: 2,
      },
      {
        id: 12,
        url: 'https://picsum.photos/800/600?image=12',
        description: 'пляж',
        title: 'temporibus labore',
        date: '15.06.2020',
        albumId: 2,
      },
      {
        id: 13,
        url: 'https://picsum.photos/800/600?image=13',
        description: 'пляж',
        title: 'ipsam odio ducimus',
        date: '15.06.2020',
        albumId: 2,
      },
      {
        id: 14,
        url: 'https://picsum.photos/800/600?image=14',
        description: 'пляж',
        title: 'Quisquam quaerat mollitia',
        date: '15.06.2020',
        albumId: 2,
      },
      {
        id: 15,
        url: 'https://picsum.photos/800/600?image=15',
        description: 'пляж',
        title: 'ostrum placeat',
        date: '15.06.2020',
        albumId: 2,
      },
      {
        id: 16,
        url: 'https://picsum.photos/800/600?image=16',
        description: 'пляж',
        title: 'animi amet',
        date: '15.06.2020',
        albumId: 2,
      },
      {
        id: 17,
        url: 'https://picsum.photos/800/600?image=17',
        description: 'пляж',
        title: 'laboriosam velit ',
        date: '15.06.2020',
        albumId: 2,
      },
      {
        id: 18,
        url: 'https://picsum.photos/800/600?image=19',
        description: 'пляж',
        title: 'repudiandae illo',
        date: '15.06.2020',
        albumId: 2,
      },
      {
        id: 19,
        url: 'https://picsum.photos/800/600?image=20',
        description: 'пляж',
        title: 'sunt et architecto',
        date: '15.06.2020',
        albumId: 2,
      },
      {
        id: 20,
        url: 'https://picsum.photos/800/600?image=21',
        description: 'пляж',
        title: 'fficia praesentium',
        date: '15.06.2020',
        albumId: 2,
      },
      {
        id: 21,
        url: 'https://picsum.photos/800/600?image=22',
        description: 'пляж',
        title: 'riosam velit',
        date: '15.06.2020',
        albumId: 2,
      },
      {
        id: 22,
        url: 'https://picsum.photos/800/600?image=23',
        description: 'пляж',
        title: 'possimus aspernatur',
        date: '15.06.2020',
        albumId: 2,
      },
      {
        id: 23,
        url: 'https://picsum.photos/800/600?image=24',
        description: 'пляж',
        title: 'eiciendis id',
        date: '15.06.2020',
        albumId: 2,
      },
      {
        id: 24,
        url: 'https://picsum.photos/800/600?image=25',
        description: 'пляж',
        title: 'Прfugit repellat eligendi aut',
        date: '15.06.2020',
        albumId: 2,
      },
      {
        id: 25,
        url: 'https://picsum.photos/800/600?image=26',
        description: 'пляж',
        title: 'fugit, aspernatur',
        date: '15.06.2020',
        albumId: 2,
      },
      {
        id: 26,
        url: 'https://picsum.photos/800/600?image=27',
        description: 'пляж',
        title: 'uisquam quib',
        date: '15.06.2020',
        albumId: 2,
      },
      {
        id: 27,
        url: 'https://picsum.photos/800/600?image=28',
        description: 'пляж',
        title: ' veniam iusto',
        date: '15.06.2020',
        albumId: 2,
      },
      {
        id: 28,
        url: 'https://picsum.photos/800/600?image=29',
        description: 'пляж',
        title: 'ndi repudiandae illo',
        date: '15.06.2020',
        albumId: 2,
      },
      {
        id: 29,
        url: 'https://picsum.photos/800/600?image=30',
        description: 'пляж',
        title: 'eleniti? Quisquam ',
        date: '15.06.2020',
        albumId: 2,
      },
      {
        id: 30,
        url: 'https://picsum.photos/800/600?image=310',
        description: 'пляж',
        title: 'fugit, aspernatur',
        date: '15.06.2020',
        albumId: 2,
      },
      {
        id: 31,
        url: 'https://picsum.photos/800/600?image=32',
        description: 'пляж',
        title: 'Nobis reiciendis',
        date: '15.06.2020',
        albumId: 2,
      },
      {
        id: 33,
        url: 'https://picsum.photos/800/600?image=33',
        description: 'пляж',
        title: 't atque nemo',
        date: '15.06.2020',
        albumId: 2,
      },
      {
        id: 34,
        url: 'https://picsum.photos/800/600?image=34',
        description: 'пляж',
        title: 'omnis illum ipsa',
        date: '15.06.2020',
        albumId: 2,
      },
      {
        id: 35,
        url: 'https://picsum.photos/800/600?image=35',
        description: 'пляж',
        title: ' minima commodi',
        date: '15.06.2020',
        albumId: 2,
      },
      {
        id: 36,
        url: 'https://picsum.photos/800/600?image=36',
        description: 'пляж',
        title: 'aliquam mollitia',
        date: '15.06.2020',
        albumId: 2,
      },

    ],

  },

  getters: {
    images(state) {
      return state.images;
    },

  },

  mutations: {
    ADD_IMAGE(state, images) {
      state.images = images;
    },

  },

  actions: {

    async GET_IMAGES({ commit }) {
      const result = await requests.getJson('api/images');
      if (result.success === true) {
        // console.log(result.data);
        commit('ADD_IMAGE', result.data.images);

        return true;
      }

      this.dispatch('addError', result.error);
      return false;
    },

  },

  modules: {
  },

});
