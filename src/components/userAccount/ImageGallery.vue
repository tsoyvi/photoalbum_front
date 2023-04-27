<template>
<div
  v-if="selectedAlbum"
  @dragenter="isDragStarted = true"

  style="height:100vh"
>
  <VCard class="mx-5 my-2 pa-3">
    <span class="text-h5">Альбом: {{ selectedAlbum.title }}</span>
  </VCard>

  <ButtonAddFluid
    @click="addImage()"
  />

  <VCard class="mx-5 my-2 pa-3">
    <v-row>
      <div class="text-h5 pa-3" v-if="!imagesInAlbumItems.length">Папка пуста</div>

      <template v-for="(image, index) in imagesInAlbumItems" :key="index">

     <v-hover v-slot:default="{ isHovering, props }">
        <v-col
          v-if="colSize(index) !== 12 && colSize(index) !== 0"
          :cols="colSize(index)" class="px-2"
          v-bind="props"
          >
          <v-img
            @click="openViewImageWindow(image)"
            :class="{ 'on-hover': isHovering }"
            :src="`/api/v1/posts/${image.id}/s3small`"
            :lazy-src="`https://picsum.photos/500/300?image=${image.id}`"
            cover
            height="100%"
          >
          <div class="icon-image d-flex justify-space-between align-end mx-5 mt-n3">
            <v-btn
              v-for="(icon, index) in icons"
              :key="index"
              variant="tonal"
              size="x-small"
              :class="{ 'show-btns': isHovering }"
              :icon="icon.icon"
              @click.stop="handlerButton({ action: icon.action, image})"
            ></v-btn>
          </div>

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
        </v-col>

        <v-col v-if="colSize(index) === 12" cols="4" class="d-flex flex-column">
          <v-row height="50%">
            <v-col v-for="(subImageIndex, subIndex) in 2" :key="subIndex" cols="12"
              class="px-2">
              <v-img
                :src="`/api/v1/posts/${image.id}/s3small`"
                :lazy-src="`https://picsum.photos/500/300?image=${ subIndex }`"
                cover
                height="100%"
              >
              </v-img>
            </v-col>
          </v-row>
        </v-col>

      </v-hover>

      </template>
    </v-row>

  </VCard>

</div>

<div v-else-if="selectedAlbum !== null">
  <PageNotFound />
</div>

      <div
        v-if="isDragStarted"
      >

        <div class="photo-uploader">
          <div class="photo-uploader__wrapper">
            <label for="file">
              <input type="file"
                multiple
                title=""
                class="photo-uploader__input"
                ref="imageFile"
                @change="uploadFile"
              />
            </label>
          </div>
        </div>

      </div>

  <AddImageAlbum
    ref = "AddImageAlbum"
  />

  <ImageViewModalWindow
    ref="ImageViewModalWindow"
  ></ImageViewModalWindow>

    <div class="loaderImages">
      <v-card width="400"
        v-for="(file, index) in filesArray"
        :key="index"
      >
        <v-card-text>
            <div class="loaderImages__item">
              <img
                class="loaderImages__image"
                :src="getSrc(file)"
                alt=""
              >
              <p class="overflow-x-hidden">
                This is a subtitle This is content
              </p>
          </div>
          <v-progress-linear color="blue-lighten-3" indeterminate></v-progress-linear>
        </v-card-text>
      </v-card>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
// Components
import PageNotFound from '../PageNotFound.vue';
import ButtonAddFluid from '../ButtonAddFluid.vue';
import AddImageAlbum from './AddImageAlbum.vue';
import ImageViewModalWindow from '../modalWindow/ImageViewModalWindow.vue';

export default {
  name: 'ImageGallery',
  components: {
    PageNotFound,
    ButtonAddFluid,
    AddImageAlbum,
    ImageViewModalWindow,
  },

  data: () => ({
    icons: [
      {
        icon: 'mdi-check',
        action: 'updateImage',
        title: 'Выделить',
      },
      {
        icon: 'mdi-download',
        action: 'downloadImage',
        title: 'Скачать картинку',
      },
      {
        icon: 'mdi-link-variant',
        action: 'null',
        title: 'Поделиться',
      },
    ],
    isDragStarted: false,
    filesArray: [],
  }),

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
      if (this.selectedAlbumId && this.albums.length > 0) {
        // return this.albums.filter((item,  i, ar) => ar.item.id === this.albumId);
        const index = this.albums.findIndex((x) => x.id === this.selectedAlbumId);
        return this.albums[index];
      }
      console.log('albums');
      this.GET_ALBUMS();

      return null;
    },

  },

  methods: {
    ...mapActions(['GET_IMAGES', 'GET_ALBUMS', 'DOWNLOAD_IMAGE']),

    addImage() {
      // console.log(this.selectedAlbumId);
      // const idAlbum = JSON.parse(JSON.stringify(this.selectedAlbumId));
      this.$refs.AddImageAlbum.openWindow(this.selectedAlbumId);
    },

    colSize(index) {
      const colSizeArray = [
        2, 2, 4, 2, 2,
        4, 2, 2, 4,
        5, 3, 4,
        4, 2, 4, 2,
        2, 4, 4, 2,
        // 12, 0, 8,
      ];

      let count = index;
      while (count > colSizeArray.length - 1) {
        count -= colSizeArray.length;
      }
      // console.log(count);
      return colSizeArray[count];
    },

    handlerButton({ action, image }) {
      if (action === 'downloadImage') {
        this.downloadImage(image);
      }
    },

    downloadImage(image) {
      this.DOWNLOAD_IMAGE(image);
    },

    openViewImageWindow(image) {
      this.$refs.ImageViewModalWindow.openWindow(image);
    },

    uploadFile() {
      this.filesArray = this.$refs.imageFile.files;
      this.isDragStarted = false;
    },

    getSrc(photo) {
      return URL.createObjectURL(photo);
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
.show-btns {
  color: rgb(255, 251, 251) !important;
  background:rgb(0, 0, 0, 0.8);
}
.icon-image {
  font-size: 8pt;
  height: 100%;
  color: rgba(255, 255, 255, 0) !important;
}
.on-hover {
  opacity: 0.85;
}

.photo-uploader{
  position: fixed;
  z-index: 2000;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.2);
}

.photo-uploader__wrapper{
  position: relative;
  text-align: center;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 4px dotted #eee;
  border-radius: 10px;
  color: rgb(0, 0, 0, 0.5);
}

.photo-uploader__input{
  cursor: pointer;
  position: absolute;
  z-index: 2;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  opacity: .5;
}

.loaderImages{
  right: 10px;
  bottom: 10px;
  position: absolute;
  display: inline-block;
  max-height: 50vh;
  overflow-y: auto;
  border: 1px solid #eee;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
}

.loaderImages__item{
  display: flex;
  justify-content: start;
  align-items: center;
}

.loaderImages__image{
  width: 35px;
  margin-right: 15px;
}

</style>
