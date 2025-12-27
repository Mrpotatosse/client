import type {ConfirmationOptions} from "primevue/confirmationoptions";

export type TnConfirmMessage<T> = (content: T & {
  accept?: () => void,
  reject?: () => void,
  onHide?: () => void
}) => ConfirmationOptions
