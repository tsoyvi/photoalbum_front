<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      width="600"
      height="50vh"
    >
        <v-form >
            <v-card>
                <v-card-title>
                    <div class="d-flex justify-space-between">
                        <span class="text-h5">Перемещение изображения</span>
                        <v-btn color="primary" variant="plain" class="text-h6 me-n3" @click="closeWindow()">
                            <v-icon icon="mdi-close"></v-icon>
                        </v-btn>
                    </div>
                </v-card-title>
                <v-card-text>
                    <v-container>

                        <v-row>
                            <v-col cols="12">
                          <v-list>
                                <v-list-item
                                  v-for="(album, index) in albums"
                                  :key="index"
                                  :value="album.title"
                                  :title="album.title"
                                  @click="selectedAlbumToMoveId = album.id"
                                 >
                                </v-list-item>
                          </v-list>
                            </v-col>
                        </v-row>

                          <v-row>
                            <v-col cols="12">
                                <v-btn v-if="selectedAlbumToMoveId"
                                    prepend-icon="mdi-image"
                                    color="blue-grey"
                                    class="me-4 my-5"
                                    :loading="loading"
                                    :disabled="loading"
                                    @click="moveSelectedImages(selectedAlbumToMoveId)"
                                >Переместить
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>

                </v-card-text>

            </v-card>
        </v-form>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions /* mapGetters */ } from 'vuex';

export default {
  props: [],

  data: () => ({
    dialog: false,
    albums: {},
    loading: null,
    selectedAlbumToMoveId: null,
    selectedImages: null,
  }),

  methods: {
    ...mapActions(['MOVE_IMAGE']),

    openWindow(albums, selectedImages) {
      this.albums = albums;
      this.selectedImages = selectedImages;
      this.dialog = true;
    },
    closeWindow() {
      this.dialog = false;
    },

    async moveSelectedImages(albumId) {
      this.loading = true;

      // console.log(this.selectedImage());
      for (let i = 0; i < this.selectedImages.length; i += 1) {
        // console.log(this.selectedImages[i], albumId);
        this.selectedImages[i].isSelected = false;
        // eslint-disable-next-line no-await-in-loop
        await this.MOVE_IMAGE({ image: this.selectedImages[i], albumId });
      }
      this.loading = false;
      this.closeWindow();
    },
  },

};
</script>

<style>

</style>
