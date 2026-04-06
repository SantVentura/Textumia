import { createRouter, createWebHistory } from 'vue-router';
import MyLibrary from '../views/MyLibrary.vue';
import PublicGallery from '../views/PublicGallery.vue';
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },

    { path: '/mine', component: MyLibrary },
    { path: '/public', component: PublicGallery }, {
      path: '/admin',
      component: () => import('../views/AdminPanel.vue')
    }, {
      path: '/read/:id',
      component: () => import('../components/BookReader.vue')
    }

  ]
});

export default router;
