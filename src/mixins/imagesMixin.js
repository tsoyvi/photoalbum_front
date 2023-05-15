import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions(['DOWNLOAD_IMAGE', 'DELETE_IMAGE']),

    downloadImage(image) {
      this.DOWNLOAD_IMAGE(image);
    },

    async deleteImage(image) {
      const result = await this.DELETE_IMAGE(image);
      if (result) {
        this.closeWindow();
      }
    },

    async deleteSelectedImages() {
      const selectedImages = this.imagesInAlbumItems.filter((img) => img.isSelected === true);
      // console.log(this.selectedImage());
      for (let i = 0; i < selectedImages.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        const result = await this.DELETE_IMAGE(selectedImages[i]);
        console.log(result);
      }
    },

    async downLoadSelectedImages() {
      const selectedImages = this.imagesInAlbumItems.filter((img) => img.isSelected === true);
      // console.log(this.selectedImage());
      for (let i = 0; i < selectedImages.length; i += 1) {
        this.DOWNLOAD_IMAGE(selectedImages[i]);
      }
    },

  },
};
