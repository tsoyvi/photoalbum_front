import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import GalleryView from '../views/GalleryView.vue';
// import store from '../store'; // your vuex store

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/gallery',
    name: 'gallery',
    component: GalleryView,
    meta: { requiresAuth: true },
  },
  {
    path: '/gallery/:id',
    name: 'albums',
    component: GalleryView,
    meta: { requiresAuth: true },
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// eslint-disable-next-line no-unused-vars, consistent-return
router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && !window.isLoggedin) {
    return { name: 'home' };
  }
});

export default router;
