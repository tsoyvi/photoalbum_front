<template>
  <v-snackbar
    v-for="(error, index) in errors"
    :key="index"
    :color="'error'"
    :timeout="6000"
    v-model="show"
    @click="closeError(index)"
  >
    {{ error }}
  </v-snackbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters(['errors']),
    show() {
      return this.errors.length !== 0;
    },
  },
  methods: {
    ...mapActions(['closeError']),
  },
};
</script>

<style>
</style>
