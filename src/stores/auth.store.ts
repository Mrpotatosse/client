import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {keycloak} from "@/globals/keycloak.global.ts";

export const useAuthStore =
  defineStore("auth", () => {
    const authenticated = ref(false);
    const token = ref<string>();
    const roles = ref<string[]>([]);

    const init = async () => {
      await keycloak
        .init({
          onLoad: "check-sso",
          silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`
        })
        .then(a => authenticated.value = a);
    };

    const login = async () => await keycloak
      .login({redirectUri: window.location.href})
      .then(() => authenticated.value = keycloak.authenticated);

    const logout = async () => await keycloak
      .logout({redirectUri: window.location.origin})
      .then(() => authenticated.value = keycloak.authenticated);

    const hasRole = (role: string) => {
      if (roles.value.length === 0) return false;
      return roles.value.some(r => r === role);
    };

    const isAuthenticated = computed(() => authenticated);

    const updateData = () => {
      token.value = keycloak.token;
      roles.value = keycloak.tokenParsed?.realm_access?.roles ?? [];
    };

    const clearData = () => {
      token.value = undefined;
      roles.value = [];
    };

    keycloak.onAuthSuccess = updateData;
    keycloak.onAuthRefreshSuccess = updateData;

    keycloak.onAuthError = clearData;
    keycloak.onAuthRefreshError = clearData;

    return {init, login, logout, isAuthenticated, token, roles, hasRole};
  });
