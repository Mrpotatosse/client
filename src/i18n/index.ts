import {createI18n} from "vue-i18n";
import enUS from "@/i18n/locales/en-US.json";

export type MessageSchema = typeof enUS;

const i18n = createI18n<[MessageSchema]>({
  // todo: remove this later
  legacy: false,
  fallbackLocale: "en",
  messages: {
    "en-US": enUS
  }
});

export default i18n;
