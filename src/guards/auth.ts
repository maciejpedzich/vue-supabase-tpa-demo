import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

export function authGuard(
  from: RouteLocationNormalized,
  to: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<void> | void {
  const authStore = useAuthStore();

  const checkAuthStatus = () => {
    localStorage.removeItem('customRedirectCheck');

    if (authStore.isAuthenticated) return next();
    else return next({ name: 'SignIn', query: { redirect: from.fullPath } });
  };

  if (from.meta.authRequired) {
    authStore.$subscribe(
      (mutation, state) => {
        const loadingFinished = !state.isLoading;
        const customRedirectCheck = localStorage.getItem('customRedirectCheck');

        if (
          loadingFinished &&
          (!customRedirectCheck || customRedirectCheck === 'ready')
        ) {
          checkAuthStatus();
        }
      },
      { immediate: true }
    );
  } else {
    return next();
  }
}
