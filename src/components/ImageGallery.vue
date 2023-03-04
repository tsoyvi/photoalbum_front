<template>
  <VCard class="mx-5 my-2 pa-3">
    <v-row>
        <v-col
          v-for="n in 100"
          :key="n"
          cols="6"
          sm="4"
          md="2"
          lg="1"
        >
          <v-hover
            v-slot="{ isHovering, props }"
            open-delay="50"
          >
            <VCard
              :elevation ="isHovering ? 12 :2"
              :class="{ 'on-hover': isHovering }"
              v-bind="props"
            >
                <v-img
                  :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                  :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                  aspect-ratio="1"
                  cover
                >
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
              </VCard>
          </v-hover>
        </v-col>
      </v-row>
  </VCard>
</template>

<script>
export default {
  name: 'ImageGallery',

};
</script>

<style>

</style>
