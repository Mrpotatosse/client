import {defineStore} from "pinia";
import {oidc} from "@/globals/oidc.global.ts";
import {jwtDecode} from "jwt-decode";
import type {ToastServiceMethods} from "primevue";
import {userExpiredToast, userLoadedToast, userUnloadedToast} from "@/toasts/auth.store.toast.ts";
import type {AuthState, KeycloakToken} from "@/stores/auth.store.types.ts";


export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: undefined,
    keycloak: undefined,
    _eventsBound: false,
  }),

  getters: {
    isAuthenticated: state => !!state.user && !state.user.expired,
  },

  actions: {
    async init() {
      // Called on /auth/callback
      const user = await oidc.signinRedirectCallback();
      await this.updateData(user);
    },

    async bootstrap() {
      await this.updateData(undefined);
    },

    async login() {
      await oidc.signinRedirect({
        redirect_uri: `${window.origin}/auth/callback`,
      });
    },

    async logout() {
      this.clearData();
      await oidc.signoutSilent();
    },

    async updateData(user?: AuthState["user"]) {
      if (!user) {
        user = await oidc.getUser(false);
      }

      this.user = user ?? undefined;

      this.keycloak = this.user
        ? jwtDecode<KeycloakToken>(this.user.access_token)
        : undefined;
    },

    clearData() {
      this.user = undefined;
      this.keycloak = undefined;
    },

    hasRole(role: string): boolean {
      return this.isAuthenticated && (this.keycloak?.realm_access?.roles?.includes(role) ?? false);
    },

    bindOidcEvents(toast: ToastServiceMethods, events?: {
      onUserLoad?: () => Promise<void>,
      onUserUnload?: () => Promise<void>,
      onTokenExpired?: () => Promise<void>
    }) {
      // Prevent double-binding
      if (this._eventsBound) return;
      this._eventsBound = true;

      oidc.events.addUserLoaded(async user => {
        await this.updateData(user);
        if (this.keycloak)
          toast.add(userLoadedToast(this.keycloak));
        await events?.onUserLoad?.();
      });

      oidc.events.addUserUnloaded(async () => {
        this.clearData();
        toast.add(userUnloadedToast());
        await events?.onUserUnload?.();
      });

      oidc.events.addAccessTokenExpired(async () => {
        this.clearData();
        toast.add(userExpiredToast());
        await events?.onTokenExpired?.();
      });
    }
  },
});
