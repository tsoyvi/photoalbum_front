<template>
<div v-if="selectedAlbum">
  <VCard class="mx-5 my-2 pa-3">
    <span class="text-h5">Альбом: {{selectedAlbum.title}}</span>
  </VCard>

  <ButtonAddFluid
    @click="addImage()"
  />

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
                  :src="`/api/v1/posts/${image.id}/s3small`"
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
<AddImageAlbum
  ref = "AddImageAlbum"
/>
<v-btn @click="this.GET_IMAGES()"> teset </v-btn>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
// Components
import PageNotFound from '../PageNotFound.vue';
import ButtonAddFluid from '../ButtonAddFluid.vue';
import AddImageAlbum from './AddImageAlbum.vue';

export default {
  name: 'ImageGallery',
  components: {
    PageNotFound,
    ButtonAddFluid,
    AddImageAlbum,
  },

  computed: {
    ...mapGetters(['IMAGES', 'albums']),

    selectedAlbumId() {
      if (!this.$route.params.id) {
        return null;
      }
      return parseInt(this.$route.params.id, 10);
    },

    imagesInAlbumItems() {
      if (this.selectedAlbumId) {
        return this.IMAGES.filter((x) => x.album_id === this.selectedAlbumId);
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

    addImage() {
      // console.log(this.selectedAlbumId);
      // const idAlbum = JSON.parse(JSON.stringify(this.selectedAlbumId));
      this.$refs.AddImageAlbum.openWindow(this.selectedAlbumId);
    },
  },
  mounted() {
    this.GET_IMAGES();
  },

};
</script>

<style>
.ts-card-text-margin {
  margin-top: -10px;
  margin-bottom: -10px;
}
</style>
