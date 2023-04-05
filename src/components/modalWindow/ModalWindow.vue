<template>
 <v-row justify="center">
    <v-dialog
      v-model="dialog"
      width="100%"
    >

    <v-card v-if="image !== null">
        <v-card-title>
          <div class="d-flex justify-space-between">
            <span class="text-h5">{{image.title}}</span>
            <v-btn
                color="primary"
                variant="plain"
                class="text-h6 me-n3"
                @click="closeWindow()"
              ><v-icon icon="mdi-close"></v-icon>
              </v-btn>
          </div>
        </v-card-title>

          <v-container>
            <v-img
                max-height="85vh"
                :src="image.url"
                :lazy-src="image.url"
                cover
            ></v-img>
          </v-container>

    </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'ModalWindow',
  props: {
  },

  data: () => ({
    dialog: false,
    image: null,
  }),

  methods: {
    openWindow(image) {
      this.dialog = true;
      this.image = image;
    },
    closeWindow() {
      this.dialog = false;
    },
  },

};
</script>

<style>

</style>
