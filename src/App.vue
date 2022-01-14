<script setup lang="ts">
import { RouterView } from 'vue-router';

import { useAuthStore } from '@/stores/auth';
import { supabase } from './supabase';

const authStore = useAuthStore();

authStore.loadUser();

supabase.auth.onAuthStateChange((event) => {
  if (event === 'SIGNED_IN') {
    const customRedirectCheck = localStorage.getItem('customRedirectCheck');

    if (customRedirectCheck) {
      localStorage.setItem('customRedirectCheck', 'ready');
    }

    authStore.loadUser();
  }
});
</script>

<template>
  <RouterView />
</template>
