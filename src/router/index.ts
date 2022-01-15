import { authGuard } from '@/guards/auth';
import { clearSessionHash } from '@/guards/clearSessionHash';
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      meta: { authRequired: false },
      component: HomeView
    },
    {
      path: '/sign-in',
      name: 'SignIn',
      meta: { authRequired: false },
      component: () => import('../views/SignInView.vue')
    },
    {
      path: '/protected',
      name: 'Protected',
      meta: { authRequired: true },
      component: () => import('../views/ProtectedView.vue')
    }
  ]
});

router.beforeEach(authGuard);

router.afterEach(clearSessionHash);

export default router;
