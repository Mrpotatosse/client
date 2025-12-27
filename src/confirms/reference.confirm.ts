import type {TnConfirmMessage} from "@/confirms/types.ts";
import i18n from "@/i18n";

export const referenceDeletionConfirm: TnConfirmMessage<{
  name: string,
}> = ({name, ...params}) => ({
  message: i18n.global.t(`app.references.${name}.delete.confirm`),
  header: i18n.global.t(`app.references.delete.confirmation`),
  icon: "pi pi-exclamation-triangle",
  rejectProps: {
    label: i18n.global.t(`app.references.delete.cancel`),
    severity: "secondary",
    outlined: true
  },
  acceptProps: {
    label: i18n.global.t(`app.references.delete.confirm`),
    severity: "danger"
  },
  ...params
});
