import { defineStore } from 'pinia';
import { RouteLocation } from 'vue-router';

import { User } from '@supabase/supabase-js';
import { supabase } from '@/supabase';

type State = {
  currentUser: User | null;
  redirectRoute: Partial<RouteLocation> | null;
};

type Getters = {
  isAuthenticated(): boolean;
};

type Actions = {
  loadUser(): void;
  clearUser(): void;
  saveRedirectRoute(route: Partial<RouteLocation>): void;
  loadRedirectRoute(): void;
  clearRedirectRoute(): void;
};

export const useAuthStore = defineStore<'auth', State, Getters, Actions>(
  'auth',
  {
    state() {
      return {
        currentUser: null,
        redirectRoute: null
      };
    },
    getters: {
      isAuthenticated() {
        return !!this.currentUser;
      }
    },
    actions: {
      loadUser() {
        this.currentUser = supabase.auth.user();
      },
      clearUser() {
        this.currentUser = null;
      },
      saveRedirectRoute(route: Partial<RouteLocation>) {
        localStorage.setItem(
          'redirectRoute',
          JSON.stringify({
            name: route.name,
            params: route.params,
            query: route.query,
            hash: route.hash
          })
        );
      },
      loadRedirectRoute() {
        const route = JSON.parse(
          localStorage.getItem('redirectRoute') || 'null'
        ) as Partial<RouteLocation> | null;

        this.redirectRoute = route;
      },
      clearRedirectRoute() {
        localStorage.removeItem('redirectRoute');
        this.redirectRoute = null;
      }
    }
  }
);
