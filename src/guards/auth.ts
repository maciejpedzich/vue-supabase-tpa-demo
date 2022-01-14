import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

export function authGuard(
  from: RouteLocationNormalized,
  to: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<void> | void {
  const authStore = useAuthStore();

  if (authStore.isAuthenticated) return next();
  else return next({ name: 'SignIn' });
}
