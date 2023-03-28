import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import UserView from '../views/UserView.vue';
import UserAccount from '../components/userAccount/UserAccount.vue';

import AlbumGallery from '../components/userAccount/AlbumGallery.vue';
import ImageGallery from '../components/userAccount/ImageGallery.vue';

// import store from '../store'; // your vuex store

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/user-account/:id',
    name: 'userAccount',
    component: UserView,
    children: [
      {
        // при совпадении пути с шаблоном /userAccount/account
        // в <router-view> компонента account будет показан UserProfile
        name: 'account',
        path: 'account',
        component: UserAccount,
      },
      {
        path: 'albums',
        name: 'albums',
        component: AlbumGallery,
      },
      {
        path: 'albums/:id',
        name: 'images',
        component: ImageGallery,
      },
    ],
    meta: { requiresAuth: true },
  },
  /*
    {
      path: '/gallery/:id',
      name: 'albums',
      component: UserView,
      meta: { requiresAuth: true },
    },
     {
      path: '/account',
      name: 'account',
      component: UserAccount,
      meta: { requiresAuth: true },
    },
  */
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
