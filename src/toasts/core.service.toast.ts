import type {TnToastMessage} from "@/toasts/types.ts";
import i18n from "@/i18n";
import {TOAST_FAILED, TOAST_SUCCESS} from "@/toasts/const.ts";

export const coreDiscoverSuccessToast: TnToastMessage<void> = () => ({
  severity: "success",
  summary: TOAST_SUCCESS,
  detail: i18n.global.t("app.reference.core.discover.success"), life: 3000,
});

export const coreDiscoverErrorToast: TnToastMessage<void> = () => ({
  severity: "error",
  summary: TOAST_FAILED,
  detail: i18n.global.t("app.reference.core.discover.error"), life: 3000,
});
