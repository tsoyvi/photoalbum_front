<template>
  <SideBar
    :albums = "albums"
    ref="SideBar"
  />
  <router-view></router-view>

</template>

<script>
import { mapActions, mapGetters } from 'vuex';

// Components
import SideBar from '../components/SideBar.vue';

export default {
  name: 'GalleryPage',
  components: {
    SideBar,
  },

  data() {
    return {
      dialog: false,
    };
  },

  computed: {
    ...mapGetters(['images', 'albums']),

    selectedAlbumId() {
      if (!this.$route.params.id) {
        return null;
      }
      return parseInt(this.$route.params.id, 10);
    },

    imagesInAlbumItems() {
      if (this.selectedAlbumId) {
        return this.images.filter((x) => x.albumId === this.selectedAlbumId);
      }
      return this.albums;
    },

    selectedAlbum() {
      if (this.selectedAlbumId) {
        // return this.albums.filter((item,  i, ar) => ar.item.id === this.albumId);
        const index = this.albums.findIndex((x) => x.id === this.selectedAlbumId);
        return this.albums[index];
      }
      return null;
    },

  },

  methods: {
    ...mapActions(['']),
    /*
    selectAlbumCart(album) {
      this.$refs.SideBar.openAlbumsList();
      this.selectAlbum(album);
    },
*/

  },

  mounted() {
    /**
     * Загрузка картинок
     * / */
    // this.GET_IMAGES(); //
  },
};
</script>
