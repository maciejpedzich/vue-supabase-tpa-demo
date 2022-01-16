<script lang="ts" setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

import { useAuthStore } from '@/stores/auth';
import { supabase } from '@/supabase';

const authStore = useAuthStore();

const routerLinkDestination = computed(() =>
  authStore.isAuthenticated ? 'Profile' : 'SignIn'
);

const signOut = async () => {
  await supabase.auth.signOut();
};
</script>

<template>
  <h1>Vue Supabase TPA Demo</h1>
  <RouterLink :to="{ name: routerLinkDestination }">
    <p>Go to {{ routerLinkDestination }} page</p>
  </RouterLink>
  <button v-if="authStore.isAuthenticated" @click="signOut">Sign out</button>
</template>
