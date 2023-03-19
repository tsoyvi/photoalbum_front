<template>
  <VCard class="mx-5 my-2 pa-3 ">
    <span class="text-h5">Список альбомов</span>
  </VCard>

<ButtonAddFluid/>

  <VCard class="mx-5 my-2 pa-3">
    <v-row>
        <v-col
          v-for="(album, index) in albums"
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
              :to="'/gallery/'+album.id"
            >
                <v-img
                  :src="album.url"
                  :lazy-src="album.url"
                  cover
                >
                <v-card-title class="text-white v-card-title-text">
                 {{album.title}}
                </v-card-title>

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
                <v-card-subtitle class="pt-4">
                  {{album.date}}
                </v-card-subtitle>

                <v-card-text class="truncate">
                  <div>{{album.description}}</div>
                </v-card-text>

              </VCard>
          </v-hover>
        </v-col>
      </v-row>
  </VCard>
</template>

<script>
import ButtonAddFluid from './ButtonAddFluid.vue';

export default {
  name: 'AlbumGallery',

  components: {
    ButtonAddFluid,
  },

  props: {
    albums: {
      type: Array,
      default: null,
    },
    album: {
      type: Object,
      default() {
        return {
          id: null,
          url: null,
          title: 'Список альбомов',
        };
      },
    },

  },

};
</script>

<style>
.v-card-title-text {
  background: rgba(117, 117, 117, 0.5)
}
</style>
