<template>
    <v-navigation-drawer
        expand-on-hover
      >
        <v-list >
          <v-list-item
            :prepend-avatar="USER.image"
            :title="USER.title"
            :subtitle="USER.email"
          ></v-list-item>

          <v-list-item  prepend-icon="mdi-home" title="logout" value="logout"
           @click="LOGOUT()"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" v-model:opened="open" nav update:modelValue>

          <v-list-item prepend-icon="mdi-home" title="Home" value="home"
            :to="'/'"
          ></v-list-item>

          <v-list-item prepend-icon="mdi-image" title="My Gallery" value="myGallery"
            :to="'/account/albums'">
          </v-list-item>

          <v-divider></v-divider>

             <v-list-group value="Albums">
                <template v-slot:activator="{ props }">
                  <v-list-item
                    v-bind="props"
                    prepend-icon="mdi-account-circle"
                    title="Albums"
                  ></v-list-item>
                </template>

                <v-list-item
                  v-for="(album, index) in albums"
                  :key="index"
                  :title="album.title"
                  :prepend-icon="'mdi-folder-open'"
                  :value="album.title"
                  :to="'/account/albums/'+album.id"
                ></v-list-item>

              </v-list-group>
              <v-divider></v-divider>
              <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared"></v-list-item>
            </v-list>

          <v-divider></v-divider>

          <v-list-item prepend-icon="mdi-account-edit-outline" title="My Account" value="myAccount"
            :to="'/account/account'">
          </v-list-item>

      </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  props: {
    albums: {
      type: Array,
      default: null,
    },
    selectAlbum: null,
  },

  data: () => ({
    open: [],
    modelValue: null,

  }),

  computed: {
    ...mapGetters(['USER']),
  },

  methods: {
    ...mapActions(['LOGOUT']),

    openAlbumsList() {
      this.open = [...['Albums']];
    },
  },

};
</script>
