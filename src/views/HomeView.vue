<script lang="ts" setup>
import { computed } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

import { useAuthStore } from '@/stores/auth';
import { supabase } from '@/supabase';

const router = useRouter();
const authStore = useAuthStore();

const routerLinkDestination = computed(() =>
  authStore.isAuthenticated ? 'Protected' : 'SignIn'
);

const signOut = async () => {
  await supabase.auth.signOut();
  authStore.clearUser();
  router.push('/sign-in');
};
</script>

<template>
  <h1>Vue Supabase TPA Demo</h1>
  <RouterLink :to="{ name: routerLinkDestination }">
    <p>Go to {{ routerLinkDestination }}</p>
  </RouterLink>
  <button v-if="authStore.isAuthenticated" @click="signOut">Sign out</button>
</template>
