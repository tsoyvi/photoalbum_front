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
    ...mapActions(['СНЕК_LOGIN']),
  },

  mounted() {
    this.СНЕК_LOGIN();
    window.isLoggedin = 'loading';
  },

};
</script>
