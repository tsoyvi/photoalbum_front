<template>
<div v-if="selectedAlbum">
  <VCard class="mx-5 my-2 pa-3">
    <span class="text-h5">Альбом: {{selectedAlbum.title}}</span>
  </VCard>

  <VCard class="mx-5 my-2 pa-3">
    <v-row>
        <div class="text-h5 pa-3" v-if="!imagesInAlbumItems.length">Папка пуста</div>
        <v-col
          v-for="(image, index) in imagesInAlbumItems"
          :key="index"
          cols="6"
          sm="4"
          md="3"
          lg="2"
        >
          <v-hover
            v-slot="{ isHovering, props }"
            open-delay="50"
          >
            <VCard
              :elevation ="isHovering ? 12 :2"
              :class="{ 'on-hover': isHovering }"
              v-bind="props"
              @click="openViewImageWindow(image)"
            >
            <template v-slot:title>
              {{image.title}}
            </template>
                <v-img
                  :src="image.url"
                  :lazy-src="image.url"
                  aspect-ratio="1"
                  cover
                >
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular
                        indeterminate
                        color="grey-lighten-5"
                      ></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
                <v-card-text class="ts-card-text-margin">
                  <div class="">{{image.date}}</div>
                </v-card-text>
              </VCard>
          </v-hover>
        </v-col>
      </v-row>
  </VCard>

</div>

<div v-else>
  <PageNotFound />
</div>

</template>

<script>
import { mapGetters } from 'vuex';
// Components
import PageNotFound from '../PageNotFound.vue';

export default {
  name: 'ImageGallery',
  components: {
    PageNotFound,
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

};
</script>

<style>
.ts-card-text-margin {
  margin-top: -10px;
  margin-bottom: -10px;
}
</style>
