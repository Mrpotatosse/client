import type {ToastMessageOptions} from "primevue";

export type TnToastMessage<T> = (content: T) => ToastMessageOptions
