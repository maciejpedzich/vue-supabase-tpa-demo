import { authGuard } from '@/guards/auth';
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/sign-in',
      name: 'SignIn',
      component: () => import('../views/SignInView.vue')
    },
    {
      path: '/protected',
      name: 'Protected',
      component: () => import('../views/ProtectedView.vue'),
      beforeEnter: authGuard
    }
  ]
});

export default router;
