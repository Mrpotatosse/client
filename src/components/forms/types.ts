// Core schema used by TnFormContent
import {booleanTypes, numberTypes, type stringTypes} from "@/components/forms/const.ts";

export type JavaStringType = typeof stringTypes;
export type JavaBooleanType = typeof booleanTypes;
export type JavaNumberType = typeof numberTypes;

export type JavaCollectionType =
  | `java.util.List<${string}>`
  | `java.util.Set<${string}>`
  | `java.util.Collection<${string}>`;
export type JavaMapType = `java.util.Map<${string}>`;

export type ValuesTypes = Record<string, unknown>;
