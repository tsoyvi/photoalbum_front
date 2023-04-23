<template>
  <v-snackbar
    v-for="(error, index) in errors"
    :key="index"
    :color="'error'"
    v-model="visible"
    location="top"
  >
    {{ error.response?.data?.message ?? error.message ?? error }}
    <template v-slot:actions>
      <v-btn variant="plain" icon="mdi-close-box" @click="closeError(index)" />
    </template>
  </v-snackbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters(['errors']),
    visible() {
      return this.errors.length !== 0;
    },
  },
  methods: {
    ...mapActions(['closeError']),
  },
};
</script>
