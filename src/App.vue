<script setup lang="ts">
import { RouteLocationRaw, RouterView, useRouter } from 'vue-router';

import { supabase } from '@/supabase';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

authStore.loadUser();

supabase.auth.onAuthStateChange((event) => {
  if (event === 'SIGNED_IN') {
    authStore.loadUser();
    authStore.loadRedirectRoute();
  } else if (event === 'SIGNED_OUT') {
    authStore.clearUser();
  }
});

authStore.$onAction(({ name, store, after }) => {
  if (name === 'loadRedirectRoute') {
    after(async () => {
      const redirect = store.redirectRoute;

      if (redirect) {
        authStore.clearRedirectRoute();
        await router.isReady();
        await router.replace(redirect as RouteLocationRaw);
      }
    });
  }
});
</script>

<template>
  <RouterView />
</template>
