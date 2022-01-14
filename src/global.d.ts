import 'vue-router';
declare module 'vue-router' {
  interface RouteMeta {
    authRequired?: boolean;
  }
}

interface ImportMetaEnv {
  MODE: 'development' | 'production';
  BASE_URL: string;
  VITE_SUPABASE_URL: string;
  VITE_SUPABASE_ANON_KEY: string;
}
