import {defineRule} from "vee-validate";
import {all} from "@vee-validate/rules";

export function defineAllRules() {
  Object.entries(all).forEach(([name, rule]) => {
    defineRule(name, rule);
  });

  defineRule("boolean", (value: unknown) => {
    return typeof value === "boolean";
  });

  defineRule("list", (value: unknown) => {
    return Array.isArray(value);
  });
}
