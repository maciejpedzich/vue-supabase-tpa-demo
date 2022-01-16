<script lang="ts" setup>
import { RouterLink } from 'vue-router';

import { User } from '@supabase/supabase-js';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const { user_metadata } = authStore.currentUser as User;
const { avatar_url, user_name } = user_metadata;
const avatarAltText = `${user_name}'s avatar`;
</script>

<template>
  <h1>{{ user_name }}</h1>
  <img :src="avatar_url" :alt="avatarAltText" />
  <RouterLink to="/">
    <p>Take me back home</p>
  </RouterLink>
</template>
