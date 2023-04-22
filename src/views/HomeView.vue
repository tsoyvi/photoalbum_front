<template>
  <HomePage />
  <SnackBar />
</template>

<script>
import { defineComponent } from 'vue';

// Components
import HomePage from '../components/HomePage.vue';
import SnackBar from '../components/SnackBar.vue';

export default defineComponent({
  name: 'HomeView',

  components: {
    HomePage,
    SnackBar,
  },
});
</script>
