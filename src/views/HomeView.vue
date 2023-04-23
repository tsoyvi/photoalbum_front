<template>
  <notification-bar />
  <HomePage />
</template>

<script>
import { defineComponent } from 'vue';

// Components
import NotificationBar from '@/components/NotificationBar.vue';
import HomePage from '../components/HomePage.vue';

export default defineComponent({
  name: 'HomeView',

  components: {
    NotificationBar,
    HomePage,
  },
});
</script>
