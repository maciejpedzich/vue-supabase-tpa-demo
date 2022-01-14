import { defineStore } from 'pinia';

import { User } from '@supabase/supabase-js';
import { supabase } from '@/supabase';

type State = {
  isLoading: boolean;
  currentUser: User | null;
};

type Getters = {
  isAuthenticated(): boolean;
};

type Actions = {
  loadUser(): void;
  clearUser(): void;
};

export const useAuthStore = defineStore<'auth', State, Getters, Actions>(
  'auth',
  {
    state() {
      return {
        isLoading: true,
        currentUser: null
      };
    },
    getters: {
      isAuthenticated(): boolean {
        return !!this.currentUser;
      }
    },
    actions: {
      loadUser() {
        this.isLoading = true;
        this.currentUser = supabase.auth.user();
        this.isLoading = false;
      },
      clearUser() {
        this.currentUser = null;
      }
    }
  }
);
