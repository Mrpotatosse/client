import type {TnToastMessage} from "@/toasts/types.ts";
import i18n from "@/i18n";
import {TOAST_FAILED, TOAST_SUCCESS} from "@/toasts/const.ts";

export const createSuccessToast: TnToastMessage<string> = (reference) => ({
  severity: "success",
  summary: TOAST_SUCCESS,
  detail: i18n.global.t("app.reference.create.success", reference), life: 3000,
});

export const createErrorToast: TnToastMessage<string> = (reference) => ({
  severity: "error",
  summary: TOAST_FAILED,
  detail: i18n.global.t("app.reference.create.failed", reference), life: 3000
});

export const getSuccessToast: TnToastMessage<string> = (reference) => ({
  severity: "success",
  summary: TOAST_SUCCESS,
  detail: i18n.global.t("app.reference.get.success", reference), life: 3000
});

export const getErrorToast: TnToastMessage<string> = (reference) => ({
  severity: "error",
  summary: TOAST_FAILED,
  detail: i18n.global.t("app.reference.get.failed", reference), life: 3000
});

export const deleteSuccessToast: TnToastMessage<string> = (reference) => ({
  severity: "success",
  summary: TOAST_SUCCESS,
  detail: i18n.global.t("app.reference.delete.success", reference), life: 3000
});

export const deleteErrorToast: TnToastMessage<string> = (reference) => ({
  severity: "error",
  summary: TOAST_FAILED,
  detail: i18n.global.t("app.reference.delete.failed", reference), life: 3000
});

export const updateSuccessToast: TnToastMessage<string> = (reference) => ({
  severity: "success",
  summary: TOAST_SUCCESS,
  detail: i18n.global.t("app.referenuce.update.success", reference), life: 3000
});

export const updateErrorToast: TnToastMessage<string> = (reference) => ({
  severity: "error",
  summary: TOAST_FAILED,
  detail: i18n.global.t("app.reference.update.failed", reference), life: 3000
});

