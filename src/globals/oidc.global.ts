import {UserManager, WebStorageStateStore} from "oidc-client-ts";


export const oidc = new UserManager({
  authority: `${import.meta.env.VITE_AUTH_URL}/realms/${import.meta.env.VITE_AUTH_REALM}`,
  client_id: import.meta.env.VITE_AUTH_CLIENT_ID,
  redirect_uri: window.location.href,
  post_logout_redirect_uri: `${window.location.origin}/`,
  response_type: "code",
  scope: "openid profile email",

  // IMPORTANT for SPAs
  userStore: new WebStorageStateStore({store: window.sessionStorage}),

  automaticSilentRenew: false
  //silent_redirect_uri: `${window.location.origin}/auth/silent-renew.html`,
});
