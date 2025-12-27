import type {
  JavaBooleanType,
  JavaCollectionType,
  JavaMapType,
  JavaNumberType,
  JavaStringType
} from "@/components/forms/types.ts";
import {
  booleanTypes,
  listRegex,
  mapRegex,
  numberTypes,
  stringTypes
} from "@/components/forms/const.ts";


export const isString = (v: unknown): v is JavaStringType => stringTypes.includes(v as never);
export const isNumber = (v: unknown): v is JavaNumberType => numberTypes.includes(v as never);
export const isBoolean = (v: unknown): v is JavaBooleanType => booleanTypes.includes(v as never);

export const isList = (v: string): v is JavaCollectionType => listRegex.test(v);
export const isMap = (v: string): v is JavaMapType => mapRegex.test(v);

export const extractList = (v: string) => {
  const match = v.match(listRegex);
  if (match) {
    return {type: match[1], generic: match[2]};
  }
  return {type: "", generic: ""};
};
