<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';

export default {

  name: 'App',
  components: {

  },

  data: () => ({
    //
  }),
  methods: {
    ...mapActions(['СНЕК_LOGIN', 'GET_USER_PROFILE']),
  },

  mounted() {
    this.СНЕК_LOGIN();
    // this.GET_USER_PROFILE();
    window.isLoggedin = 'loading';
  },

};
</script>
