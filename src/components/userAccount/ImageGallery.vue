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
            @click="openViewImageWindow(imagesInAlbumItems, index)"
            :class="{ 'on-hover': isHovering, 'selected-image': image.isSelected }"
            :src="`/api/v1/posts/${image.id}/s3small`"
            :lazy-src="'/images/bg_img_default_5.jpg'"
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
                :lazy-src="'images/bg_img_default_0.jpg'"
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
                {{ file.name }}
              </p>
              <p class="overflow-x-hidden ml-2" v-if="file.resultLoad === true">
                 <v-icon icon="mdi-check"></v-icon>
              </p>
              <p class="overflow-x-hidden ml-2" v-if="file.resultLoad === false">
                 <v-icon icon="mdi-close"></v-icon>
              </p>
          </div>
          <v-progress-linear color="blue-lighten-3"
            indeterminate
            v-if="file.resultLoad === 'loading'"></v-progress-linear>
        </v-card-text>
      </v-card>
    </div>
    <div style="display: none;"> {{ filesLoaded }} </div>

    <v-snackbar
      color="blue-grey"
      v-model="isSelectedImage"
    >
      <v-btn
          variant="text"
          @click="downLoadSelectedImages()"
      ><v-icon icon="mdi-download"></v-icon> Скачать
      </v-btn>
      <v-btn
          variant="text"
          @click="deleteSelectedImages()"
      ><v-icon icon="mdi-delete-forever-outline"></v-icon> удалить
      </v-btn>
      <v-btn
          variant="text"
      ><v-icon icon="mdi-file-move-outline"></v-icon> &nbsp; переместить
      </v-btn>

    </v-snackbar>

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
// Components
import PageNotFound from '../PageNotFound.vue';
import ButtonAddFluid from '../ButtonAddFluid.vue';
import AddImageAlbum from './AddImageAlbum.vue';
import ImageViewModalWindow from '../modalWindow/ImageViewModalWindow.vue';
import ImagesMixin from '../../mixins/imagesMixin';

export default {
  name: 'ImageGallery',
  mixins: [ImagesMixin],

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
        action: 'selectImage',
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
    filesLoaded: [],
    isLoadingAddImages: false,

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
      this.GET_ALBUMS();

      return null;
    },

    isSelectedImage() {
      const count = this.imagesInAlbumItems.filter((img) => img.isSelected === true).length;
      if (count > 0) return true;
      return false;
    },

  },

  methods: {
    ...mapActions(['GET_IMAGES', 'GET_IMAGES_IN_ALBUM', 'GET_ALBUMS', 'DOWNLOAD_IMAGE', 'CREATE_IMAGE']),

    addImage() {
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
      if (action === 'selectImage') {
        this.selectImage(image);
      }
    },

    downloadImage(image) {
      this.DOWNLOAD_IMAGE(image);
    },

    selectImage(image) {
      const imagesArray = this.imagesInAlbumItems;
      const index = imagesArray.findIndex((img) => img === image);
      if (imagesArray[index].isSelected === undefined) {
        imagesArray[index].isSelected = false;
      }

      imagesArray[index].isSelected = !imagesArray[index].isSelected;
      // this.countSelectedImage(imagesArray);
    },

    openViewImageWindow(image, index) {
      this.$refs.ImageViewModalWindow.openWindow(image, index);
    },

    async uploadFile() {
      this.filesArray = this.$refs.imageFile.files;
      this.isDragStarted = false;

      for (let i = 0; i < this.filesArray.length; i += 1) {
        this.filesArray[i].resultLoad = 'loading';
        // eslint-disable-next-line no-await-in-loop
        const result = await this.addDropImages(this.filesArray[i]);

        this.filesArray[i].resultLoad = result;
        // console.log(result);
        this.filesLoaded[i] = result;
      }
    },

    getSrc(photo) {
      return URL.createObjectURL(photo);
    },

    async addDropImages(file) {
      const formData = new FormData();
      formData.append('_method', 'POST');
      formData.append('album_id', this.selectedAlbumId);
      formData.append('title', file.name);
      formData.append('description', file.name);
      formData.append('image', file);

      const result = await this.CREATE_IMAGE(formData);
      if (result) {
        return true;
      }

      return false;
    },

    scrollPageLoader() {
      const { scrollHeight } = document.documentElement;
      const { clientHeight } = document.documentElement;
      const height = scrollHeight - clientHeight;

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

      console.log(height, scrollTop);
      if (height < scrollTop + 100 && !this.isLoadingAddImages) {
      // добавим больше данных
        this.isLoadingAddImages = true;
        console.log(this.selectedAlbum.id);
        this.GET_IMAGES_IN_ALBUM({ albumId: this.selectedAlbum.id, page: 2 });
      }
    },

  },

  mounted() {
    this.GET_IMAGES();

    window.addEventListener('scroll', () => {
      this.scrollPageLoader();
    });
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

.selected-image{
  outline: rgb(183, 0, 255) solid 4px;
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
  position: fixed;
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
