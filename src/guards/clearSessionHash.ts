/* eslint-disable @typescript-eslint/no-unused-vars */

import { RouteLocationNormalized, NavigationFailure } from 'vue-router';

export function clearSessionHash(
  from: RouteLocationNormalized,
  to: RouteLocationNormalized,
  failure: void | NavigationFailure | undefined
) {
  if ((from.name as string) !== 'Home') {
    const sessionHashKeys = [
      'access_token',
      'expires_in',
      'provider_token',
      'refresh_token',
      'token_type'
    ];
    const searchParamsObj = new URLSearchParams(
      window.location.hash.slice(1).replace('#', '&')
    );

    for (const key of sessionHashKeys) {
      searchParamsObj.delete(key);
    }

    const fragment = Array.from(searchParamsObj.keys())[0];
    const nonSessionHash = fragment ? `#${fragment}` : '';

    history.pushState(
      {},
      document.title,
      window.location.pathname + window.location.search + nonSessionHash
    );
  }
}
