import i18n from "@/i18n";
import type {NavbarItem} from "@/components/navbar/types.ts";

export const navbarItems: NavbarItem[] = [
  {
    label: i18n.global.t("app.references"),
    route: "references",
    role: "reference-manager"
  },
  {
    label: i18n.global.t("app.test"),
    route: "about",
    role: "user"
  }
];
