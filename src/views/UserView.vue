<template>
  <SideBar
    :albums = "albums"
    ref="SideBar"
  />
  <router-view></router-view>

  <ModalWindow
    ref="ModalWindow"
  />

</template>

<script>
import { mapActions, mapGetters } from 'vuex';

// Components
import SideBar from '../components/SideBar.vue';
import ModalWindow from '../components/modalWindow/ModalWindow.vue';

export default {
  name: 'GalleryPage',
  components: {
    SideBar,
    ModalWindow,
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
    ...mapActions(['GET_IMAGES']),

    selectAlbumCart(album) {
      this.$refs.SideBar.openAlbumsList();
      this.selectAlbum(album);
    },

    openViewImageWindow(image) {
      this.$refs.ModalWindow.openWindow(image);
    },

  },

  mounted() {
    /**
     * Загрузка картинок
     * / */
    // this.GET_IMAGES(); //
  },
};
</script>
