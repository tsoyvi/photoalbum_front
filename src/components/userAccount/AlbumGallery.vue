<template>
  <VCard class="mx-5 my-2 pa-3 ">
    <span class="text-h5">Список альбомов</span>
  </VCard>

<ButtonAddFluid
  @click="addAlbum"
/>

      <v-container class="pa-4 text-center">
        <v-row
          class="fill-height"
        >
          <template v-for="(album, index) in albums" :key="index">
            <v-col
              cols="6"
              sm="4"
              md="3"
              lg="3"
            >
              <v-hover v-slot="{ isHovering, props }">
                <v-card
                  :elevation="isHovering ? 12 : 2"
                  :class="{ 'on-hover': isHovering }"
                  v-bind="props"
                >
                <div class="stackone">

                  <v-img
                    class="image-album stackone0"
                    :src="album.image"
                    height="225px"
                    cover
                  >
                    <v-card-title class="text-h6 text-white d-flex flex-column">
                      <p class="mt-4" :class="{ 'show-btns': isHovering }">
                        {{ album.title }}
                      </p>

                      <div>
                        <p class="ma-0 text-body-1 font-weight-bold">
                          {{ album.text }}
                        </p>
                        <p class="text-caption font-weight-medium">
                          {{ album.subtext }}
                        </p>
                      </div>
                    </v-card-title>

                    <div class="icon-album d-flex justify-space-evenly align-end">
                      <v-btn
                        v-for="(icon, index) in icons"
                        :key="index"
                        variant="tonal"
                        :class="{ 'show-btns': isHovering }"
                        :color="transparent"
                        :icon="icon.icon"
                        @click="handlerButton({ action: icon.action, album })"
                      ></v-btn>
                    </div>
                  </v-img>

                  <v-img class="stackone1"
                    :src="'https://picsum.photos/500/300?image=22'"
                    :lazy-src="album.url"
                    cover
                  ></v-img>
                  <v-img class="stackone2"
                    :src="'https://picsum.photos/500/300?image=43'"
                    :lazy-src="album.url"
                    cover
                  ></v-img>
                  <v-img class="stackone3"
                    :src="'https://picsum.photos/500/300?image=41'"
                    :lazy-src="album.url"
                    cover
                  ></v-img>

                </div>
                </v-card>
              </v-hover>
            </v-col>
          </template>
        </v-row>
      </v-container>

  <AddAlbumGallery
    ref = "AddAlbumGallery"
  />

</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import ButtonAddFluid from '../ButtonAddFluid.vue';
import AddAlbumGallery from './AddAlbumGallery.vue';

export default {
  name: 'AlbumGallery',

  components: {
    ButtonAddFluid,
    AddAlbumGallery,
  },

  props: {
    /* albums: {
      type: Array,
      default: null,
    }, */
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

  data: () => ({
    icons: [
      {
        icon: 'mdi-information',
        action: null,
      },
      {
        icon: 'mdi-folder-download-outline',
        action: null,
      },
      {
        icon: 'mdi-delete-forever-outline',
        action: 'deleteAlbum',
      },
    ],
    transparent: 'rgba(255, 255, 255, 0)',
  }),

  computed: {
    ...mapGetters(['USER', 'albums']),
  },

  methods: {
    ...mapActions(['GET_ALBUMS', 'DELETE_ALBUMS']),

    addAlbum() {
      this.$refs.AddAlbumGallery.openWindow();
    },

    deleteAlbum(album) {
      if (window.confirm('Удалить альбом?')) {
        this.DELETE_ALBUMS(album);
      }
    },

    handlerButton({ action, album }) {
      if (action === 'deleteAlbum') {
        this.deleteAlbum(album);
      }
    },

  },

  mounted() {
    this.GET_ALBUMS();
  },

};
</script>

<style scoped>

.icon-album {
  height: 65%;
  transform: rotate(1deg);
}

.image-album:hover {
   /*opacity: 0.85; */
}

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
  background:rgb(0, 0, 0);
}

.v-card-title-text {
  background: rgba(117, 117, 117, 0.5)
}

.stackone {
  border: 6px solid #fff;
  float: left;
  width: 100%;
  position: relative;
  box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
  margin-bottom: 10px;
  margin-top: 10px;
}

/*СТОПКА*/

.stackone0 {
  border: 2px solid #fff;
  z-index: 1;
  top: 13px;
  left: 0px;
  transform: rotate(-1deg);

}

.stackone1 {
  height: 100%; width: 100%;
  border: 2px solid #fff;
  position: absolute;
  z-index: 0;
  top: -10px;
  left: -3px;
  box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
  transform: rotate(-2deg);
  opacity: 0.9;
}

.stackone2 {
  height: 100%; width: 100%;
  border: 2px solid #fff;
  position: absolute;
  z-index: 0;
  top: 0px;
  left: -2px;
  box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
  transform: rotate(-1.5deg);
  opacity: 0.9;
}

.stackone3 {
  height: 100%; width: 100%;
  border: 2px solid #fff;
  position: absolute;
  z-index: 0;
  top: 7px;
  left: -1px;
  box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
  transform: rotate(-1deg);
  opacity: 0.9;
}

</style>
