<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

import { supabase } from '@/supabase';

const route = useRoute();
const isSigningIn = ref(false);

async function signIn() {
  try {
    isSigningIn.value = true;

    const redirectPath = route.query.redirect as string;
    const redirectTo = window.location.origin + (redirectPath || '/');

    if (redirectPath) localStorage.setItem('customRedirectCheck', 'notReady');

    const { error } = await supabase.auth.signIn(
      { provider: 'github' },
      { redirectTo }
    );

    if (error) throw error;
  } catch (error) {
    localStorage.removeItem('customRedirectCheck');
    console.error(error);
    alert('Something went wrong! Check the console for more details');
  } finally {
    isSigningIn.value = false;
  }
}
</script>

<template>
  <p v-if="isSigningIn">Please wait...</p>
  <button v-else @click="signIn">Sign in via Github</button>
</template>
