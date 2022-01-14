<script setup lang="ts">
import { RouterView } from 'vue-router';

import { useAuthStore } from '@/stores/auth';
import { supabase } from './supabase';

const authStore = useAuthStore();

authStore.loadUser();

supabase.auth.onAuthStateChange(
  (event) => event === 'SIGNED_IN' && authStore.loadUser()
);
</script>

<template>
  <RouterView />
</template>
