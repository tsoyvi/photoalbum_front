<template>
  <SideBar
    :albums = "albums"
    ref="SideBar"
  />

  <AlbumGallery
    v-if="!selectedAlbumId"
    :albums = "imagesInAlbumItems"
  />

  <ImageGallery
    v-if="selectedAlbumId"
    :images = "imagesInAlbumItems"
    :album = "selectedAlbum"
    :openViewImageWindow = "openViewImageWindow"
  />
  <router-view></router-view>

  <ModalWindow
    ref="ModalWindow"
  />

</template>

<script>
import { mapActions, mapGetters } from 'vuex';

// Components
import ImageGallery from '../components/ImageGallery.vue';
import AlbumGallery from '../components/userAccount/AlbumGallery.vue';
import SideBar from '../components/SideBar.vue';
import ModalWindow from '../components/ModalWindow.vue';

export default {
  name: 'GalleryPage',
  components: {
    ImageGallery,
    AlbumGallery,
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
    this.GET_IMAGES(); //
  },
};
</script>
