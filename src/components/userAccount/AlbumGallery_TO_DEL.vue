<template>
  <VCard class="mx-5 my-2 pa-3 ">
    <span class="text-h5">Список альбомов</span>
  </VCard>

<ButtonAddFluid
  @click="addAlbum"
/>

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
              :to="'/account/albums/'+album.id"
            >
                <div class="stackone">
                  <v-img class="stackone0"
                    :src="album.url"
                    :lazy-src="album.url"
                    cover
                  >
                  <!--
                  <v-card-title class="text-white v-card-title-text">
                  {{album.title}}
                  </v-card-title>
                  -->
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

                  <v-img class="stackone1"
                    :src="`https://picsum.photos/500/300?image=${index}`"
                    :lazy-src="album.url"
                    cover
                  ></v-img>
                  <v-img class="stackone2"
                    :src="`https://picsum.photos/500/300?image=${index + 1}`"
                    :lazy-src="album.url"
                    cover
                  ></v-img>

                </div>
                <v-card-subtitle class="pt-6">
                  {{album.date}}
                </v-card-subtitle>

                <v-card-text class="truncate">
                  <div>{{album.title}}</div>
                </v-card-text>

              </VCard>
          </v-hover>
        </v-col>
      </v-row>

  </VCard>

  <AddAlbumGallery
    ref = "AddAlbumGallery"
  />

  <v-btn @click="GET_ALBUMS()">test</v-btn>

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

  computed: {
    ...mapGetters(['USER', 'albums']),
  },

  methods: {
    ...mapActions(['GET_ALBUMS']),

    addAlbum() {
      console.log('test');
      this.$refs.AddAlbumGallery.openWindow();
    },
  },

  mounted() {
    // this.GET_ALBUMS();
  },

};
</script>

<style>
.v-card-title-text {
  background: rgba(117, 117, 117, 0.5)
}

.stackone {
  border: 6px solid #fff;
  float: left;
  /* height: 200px; */
   width: 100%;
  /*margin: 50px;*/
  position: relative;
  -webkit-box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
  -moz-box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
  box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
}

/*СТОПКА*/

.stackone0 {
  border: 3px solid #fff;
  z-index: 0;
  top: 6px;
  left: 0px;
}

.stackone1 {
  height: 100%; width: 100%;
  border: 3px solid #fff;
  position: absolute;
  z-index: -1;
  top: 6px;
  left: -10px;
  -webkit-box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
  -moz-box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
  box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
  -webkit-transform: rotate(-8deg);
  -moz-transform: rotate(-8deg);
  -o-transform: rotate(-8deg);
  -ms-transform: rotate(-8deg);
  transform: rotate(-10deg);
}

.stackone2 {
  height: 100%; width: 100%;
  border: 3px solid #fff;
  position: absolute;
  z-index: -1;
  top: 5px;
  left: 0px;
  -webkit-box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
  -moz-box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
  box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
  -webkit-transform: rotate(-10deg);
  -moz-transform: rotate(-5deg);
  -o-transform: rotate(-5deg);
  -ms-transform: rotate(-5deg);
  transform: rotate(-5deg);
}

</style>
