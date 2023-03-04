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
          </div>
        </div>

    </v-carousel-item>

</v-carousel>
</template>

<script>
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
        {
          url: 'https://picsum.photos/800/600?5',
          text: 'Let your imagination run riot',
          color: 'text-yellow-accent-1',
        },
        {
          url: 'https://picsum.photos/800/600?62',
          text: 'Keep your memories',
          color: 'text-green-accent-1',
        },
        {
          url: 'https://picsum.photos/800/600?100',
          text: 'Let your imagination run riot',
          color: 'text-light-blue-lighten-5',
        },

      ],

    };
  },

};
</script>

<style>

</style>
