<template>
<div v-if="album.id">
  <VCard class="mx-5 my-2 pa-3">
    <span class="text-h5">Альбом: {{album.title}}</span>

  </VCard>

  <VCard class="mx-5 my-2 pa-3">
    <v-row>
        <div class="text-h5 pa-3" v-if="!images.length">Папка пуста</div>
        <v-col
          v-for="(image, index) in images"
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
// Components
import PageNotFound from './PageNotFound.vue';

export default {
  name: 'ImageGallery',
  components: {
    PageNotFound,
  },

  props: {
    images: {
      type: Array,
      default: null,
    },

    album: {
      type: Object,
      default() {
        return {
          id: null,
          url: null,
          title: '-',
        };
      },

    },

    openViewImageWindow: {
      type: Function,
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
