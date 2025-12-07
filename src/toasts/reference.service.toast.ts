import type {TnToastMessage} from "@/toasts/index.ts";
import i18n from "@/i18n";

export const createSuccessToast: TnToastMessage<string> = (reference) => ({
  severity: "success",
  summary: i18n.global.t("app.success"),
  detail: i18n.global.t("app.reference.create.success", reference), life: 3000
});

export const createErrorToast: TnToastMessage<string> = (reference) => ({
  severity: "error",
  summary: i18n.global.t("app.failed"),
  detail: i18n.global.t("app.reference.create.failed", reference), life: 3000
});

export const getSuccessToast: TnToastMessage<string> = (reference) => ({
  severity: "success",
  summary: i18n.global.t("app.success"),
  detail: i18n.global.t("app.reference.get.success", reference), life: 3000
});

export const getErrorToast: TnToastMessage<string> = (reference) => ({
  severity: "error",
  summary: i18n.global.t("app.failed"),
  detail: i18n.global.t("app.reference.get.failed", reference), life: 3000
});

export const deleteSuccessToast: TnToastMessage<string> = (reference) => ({
  severity: "success",
  summary: i18n.global.t("app.success"),
  detail: i18n.global.t("app.reference.delete.success", reference), life: 3000
});

export const deleteErrorToast: TnToastMessage<string> = (reference) => ({
  severity: "error",
  summary: i18n.global.t("app.failed"),
  detail: i18n.global.t("app.reference.delete.failed", reference), life: 3000
});


export const updateSuccessToast: TnToastMessage<string> = (reference) => ({
  severity: "success",
  summary: i18n.global.t("app.success"),
  detail: i18n.global.t("app.referenuce.update.success", reference), life: 3000
});

export const updateErrorToast: TnToastMessage<string> = (reference) => ({
  severity: "error",
  summary: i18n.global.t("app.failed"),
  detail: i18n.global.t("app.reference.update.failed", reference), life: 3000
});

