<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      width="800"
    >
        <v-form @submit.prevent="addImage">
            <v-card>
                <v-card-title>
                    <div class="d-flex justify-space-between">
                        <span class="text-h5">Добавление изображения в альбом</span>
                        <v-btn color="primary" variant="plain" class="text-h6 me-n3" @click="closeWindow()">
                            <v-icon icon="mdi-close"></v-icon>
                        </v-btn>
                    </div>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                    v-model="image.title"
                                    label="Title"
                                    hint="Название изображения"
                                    variant="outlined"
                                    required
                                    prepend-icon="mdi-text"
                                >
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <v-textarea label="Image Description"
                                    v-model="image.description"
                                    auto-grow variant="outlined"
                                    hint="Описание изображения"
                                    rows="1"
                                    row-height="15"
                                    prepend-icon="mdi-text-box"
                                ></v-textarea>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="12">
                                <v-file-input accept="image/png, image/jpeg, image/bmp"
                                    placeholder="Image"
                                    prepend-icon="mdi-file-image-outline"
                                    variant="outlined"
                                    label="Image"
                                    show-size
                                    ref="imageFile"
                                >
                                </v-file-input>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <v-btn
                                    prepend-icon="mdi-image"
                                    color="blue-grey"
                                    class="me-4 my-5"
                                    :loading="loading"
                                    :disabled="loading"
                                    type="submit"
                                >Добавить изображение в альбом
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
  data: () => ({
    dialog: false,
    image: {
      album_id: null,
      title: '',
      description: '',
      image: '',
    },
    loading: null,
  }),

  methods: {
    ...mapActions(['CREATE_IMAGE']),

    openWindow(selectedAlbumId) {
      this.image.album_id = selectedAlbumId;
      this.dialog = true;
    },
    closeWindow() {
      this.dialog = false;
    },

    clearDataForm() {
      this.image = {
        title: '',
        description: '',
        image: '',
      };
    },

    async addImage() {
      const formData = new FormData();
      formData.append('_method', 'POST');

      const imageKeys = Object.keys(this.image);

      const vm = this.$refs.imageFile.files[0];

      imageKeys.forEach((key) => {
        if (key !== 'image') {
          formData.append(key, this.image[key]);
        } else {
          formData.append('image', vm);
        }
      });

      this.loading = true;

      const result = await this.CREATE_IMAGE(formData);
      if (result) {
        this.clearDataForm();
        this.closeWindow();
      }

      this.loading = false;
    },

  },

};
</script>

<style>

</style>
