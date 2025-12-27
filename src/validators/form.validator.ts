import type {ReferenceTableProperty} from "@/services/types.ts";
import {isBoolean, isList} from "@/components/forms/utils.ts";

export function buildValidator(table: ReferenceTableProperty[]) {
  return table.reduce((acc, curr) => ({
    ...acc,
    [curr.name]: buildValidatorString(curr)
  }), {});
}

export function buildValidatorString(property: ReferenceTableProperty) {
  const validators: string[] = [];
  if (property.required) {
    if (isBoolean(property.type)) validators.push("boolean");
    else if (isList(property.type)) validators.push("list");
    else validators.push("required");
  }
  if (property.min !== undefined) validators.push(`min_value:${property.min}`);
  if (property.max !== undefined) validators.push(`max_value:${property.max}`);
  return validators.join("|");
}
