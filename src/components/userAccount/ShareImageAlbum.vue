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
                        <span class="text-h5">Поделиться ссылкой на изображение</span>
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
                                <v-list-item v-if="image.share_link"
                                  :title="image.share_link"
                                  :value="image.share_link"
                                  @click="copyToClipboard(image.share_link)"
                                ></v-list-item>
                              </v-list>
                            </v-col>
                        </v-row>

                          <v-row>
                            <v-col cols="12">
                                <v-btn v-if="!image.share_link"
                                    prepend-icon="mdi-image"
                                    color="blue-grey"
                                    class="me-4 my-5"
                                    :loading="loading"
                                    :disabled="loading"
                                    @click="createShareImage()"
                                >Сгенерировать ссылку
                                </v-btn>
                                <v-btn v-else
                                    prepend-icon="mdi-image"
                                    color="blue-grey"
                                    class="me-4 my-5"
                                    :loading="loading"
                                    :disabled="loading"
                                    @click="deleteShareImage()"
                                >Удалить ссылку
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>

                </v-card-text>

            </v-card>
        </v-form>
    </v-dialog>
  </v-row>

    <v-snackbar
        v-model="snackbar"
        :timeout="timeout"
      >Ссылка скопирована
        <template v-slot:actions>
          <v-btn
            color="blue"
            variant="text"
            @click="snackbar = false"
          > закрыть
          </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
import { mapActions /* mapGetters */ } from 'vuex';

export default {
  props: ['moveSelectedImages'],

  data: () => ({
    dialog: false,
    image: null,
    loading: null,
    snackbar: false,
    timeout: 3000,
  }),

  methods: {
    ...mapActions(['SHARE_IMAGE', 'DELETE_SHARE_IMAGE']),

    openWindow(image) {
      this.image = image;
      this.dialog = true;
    },
    closeWindow() {
      this.dialog = false;
    },

    async createShareImage() {
      this.loading = true;
      await this.SHARE_IMAGE(this.image);
      this.loading = false;
    },

    async copyToClipboard(shareLink) {
      await navigator.clipboard.writeText(shareLink);
      this.snackbar = true;
    },

    async deleteShareImage() {
      this.loading = true;
      await this.DELETE_SHARE_IMAGE(this.image);
      this.loading = false;
    },

  },

};
</script>

<style>

</style>
