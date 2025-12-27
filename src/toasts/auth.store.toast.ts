import type {TnToastMessage} from "@/toasts/types.ts";
import i18n from "@/i18n";
import type {KeycloakToken} from "@/stores/auth.store.types.ts";

export const userLoadedToast: TnToastMessage<KeycloakToken> = (user: KeycloakToken) => ({
  severity: "success",
  summary: i18n.global.t("app.auth.user.loaded"),
  detail: i18n.global.t("app.auth.user.name", user.preferred_username), life: 3000
});

export const userUnloadedToast: TnToastMessage<void> = () => ({
  severity: "success",
  summary: i18n.global.t("app.auth.user.unloaded"),
  detail: i18n.global.t("app.auth.user.unloaded.detail"), life: 3000
});

export const userExpiredToast: TnToastMessage<void> = () => ({
  severity: "warn",
  summary: i18n.global.t("app.auth.user.expired"),
  detail: i18n.global.t("app.auth.user.expired.detail"), life: 3000
});
