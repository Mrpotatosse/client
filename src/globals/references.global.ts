import i18n from "@/i18n";

export type ReferenceItem = { label: string, value: string }

export const referencesItems: ReferenceItem[] = [
  {
    label: i18n.global.t("app.test"),
    value: "test"
  },
  {
    label: i18n.global.t("app.match.type"),
    value: "type-match"
  }
];
