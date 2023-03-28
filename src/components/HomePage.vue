<template>
  <v-carousel
      cycle
      height="100vh"
      hide-delimiter-background
      show-arrows="hover"
  >
    <v-carousel-item
        v-for="(imageCarouselItem, index) in imageCarouselList" :key="index"
            :src="imageCarouselItem.url"
        cover
    >

        <div class="d-flex fill-height justify-center align-center">
          <div class="font-weight-regular text-h3"
            :class="imageCarouselItem.color"
          >
             {{ imageCarouselItem.text }}

             <div class="d-flex justify-space-between" v-if="USER.length === 0">
                <v-btn
                  color="grey-lighten-5"
                  variant="text"
                  class="font-weight-regular text-h5 v-btn-bg"
                  @click="openRegistrationWindow()"
                >START TO FREE
                </v-btn>
                <v-btn
                  color="grey-lighten-5"
                  variant="text"
                  class="font-weight-regular text-h5 v-btn-bg"
                  @click="openAuthWindow()"
                >LOG IN
                </v-btn>
             </div>

             <div class="d-flex justify-center" v-if="USER.length !== 0">
                <v-btn
                  color="grey-lighten-5"
                  variant="text"
                  class="font-weight-regular text-h5 v-btn-bg"
                  :to="'/user-account/'+USER.id"
                >GET START
                </v-btn>
             </div>

          </div>
        </div>

    </v-carousel-item>
  </v-carousel>

  <RegistrationBlock
    ref = "RegistrationBlock"
  />

  <AuthBlock
    ref = "AuthBlock"
  />

</template>

<script>
import { mapGetters } from 'vuex';

import RegistrationBlock from './auth/RegistrationBlock.vue';
import AuthBlock from './auth/AuthBlock.vue';

export default {
  name: 'HomePage',
  data() {
    return {
      imageCarouselList: [
        {
          url: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
          text: 'Keep your memories',
          color: 'text-white',
        },
        {
          url: 'https://cdn.vuetifyjs.com/images/cards/hotel.jpg',
          text: 'Share your creativity',
          color: 'text-grey-lighten-5',
        },
        {
          url: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
          text: 'Keep your memories',
          color: 'text-deep-orange-accent-1',
        },

      ],

    };
  },
  components: {
    RegistrationBlock,
    AuthBlock,
  },

  computed: {
    ...mapGetters(['USER']),
  },

  methods: {
    openRegistrationWindow() {
      this.$refs.RegistrationBlock.openWindow();
    },

    openAuthWindow() {
      this.$refs.AuthBlock.openWindow();
    },
  },

};
</script>

<style>
.v-btn-bg {
  margin-top: 100px;
  background: rgba(255, 255, 255, 0.1)
};
</style>
