import type {TnToastMessage} from "@/toasts/types.ts";
import i18n from "@/i18n";
import {TOAST_FAILED, TOAST_SUCCESS} from "@/toasts/const.ts";

export const formGetSuccessToast: TnToastMessage<string> = (reference) => ({
  severity: "success",
  summary: TOAST_SUCCESS,
  detail: i18n.global.t("app.form.get.success", reference), life: 3000
});

export const formGetErrorToast: TnToastMessage<string> = (reference) => ({
  severity: "error",
  summary: TOAST_FAILED,
  detail: i18n.global.t("app.form.get.failed", reference), life: 3000
});
