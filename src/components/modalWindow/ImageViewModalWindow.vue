<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" fullscreen>

            <v-card v-if="image !== null">

                <v-img
                  class=""
                  max-height="100vh"
                  :src="`/api/v1/posts/${image.id}/s3large`"
                  :lazy-src="image.url"
                >
                    <div class="d-flex justify-space-between mx-2 mt-2">
                        <span class="text-h5">{{image.title}}</span>
                        <span class="icon-image mt-1">
                          <v-btn
                              v-for="(icon, index) in icons"
                              :key="index"
                              variant="text"
                              size="small"
                              class="show-btns"
                              @click="handlerButton({ action: icon.action, image})"
                          ><v-icon :icon="icon.icon"></v-icon> &nbsp; {{icon.title}}
                          </v-btn>
                        </span>
                        <v-btn color="primary" variant="plain" class="text-h6 me-n3" @click="closeWindow()"><v-icon
                                icon="mdi-close"></v-icon>
                        </v-btn>
                    </div>
                </v-img>

            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'ModalWindow',
  props: {
  },

  data: () => ({
    dialog: false,
    image: null,
    icons: [
      {
        icon: 'mdi-download',
        action: 'downloadImage',
        title: 'Скачать файл',
      },
      {
        icon: 'mdi-link-variant',
        action: 'null',
        title: 'Поделиться',
      },
      {
        icon: 'mdi-delete-forever-outline',
        action: 'deleteImage',
        title: 'удалить',
      },
    ],
  }),

  methods: {
    ...mapActions(['DOWNLOAD_IMAGE', 'DELETE_IMAGE']),

    openWindow(image) {
      this.dialog = true;
      this.image = image;
    },
    closeWindow() {
      this.dialog = false;
    },

    handlerButton({ action, image }) {
      if (action === 'downloadImage') {
        this.downloadImage(image);
      }
      if (action === 'deleteImage') {
        this.deleteImage(image);
      }
    },

    downloadImage(image) {
      this.DOWNLOAD_IMAGE(image);
    },

    async deleteImage(image) {
      const result = await this.DELETE_IMAGE(image);
      if (result) {
        this.closeWindow();
      }
    },

  },

};
</script>

<style>

</style>
