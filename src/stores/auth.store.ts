import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {keycloak} from "@/globals/keycloak.global.ts";
import {useToast} from "primevue";

export const useAuthStore =
  defineStore("auth", () => {
    const authenticated = ref(false);
    const toast = useToast();

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
      .logout({redirectUri: window.location.href})
      .then(() => authenticated.value = keycloak.authenticated);

    const isAuthenticated = computed(() => authenticated);

    return {init, login, logout, isAuthenticated};
  });
