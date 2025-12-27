export const stringTypes = ["java.lang.String"] as const;

export const booleanTypes = ["java.lang.Boolean"] as const;

export const number8 = [
  "java.lang.Byte",
] as const;

export const number16 = [
  "java.lang.Short",
] as const;

export const number32 = [
  "java.lang.Integer",
  "java.lang.Float"
] as const;

export const number64 = [
  "java.lang.Long",
  "java.lang.Double"
] as const;

export const numberTypes = [
  "java.lang.Number",
  ...number8,
  ...number16,
  ...number32,
  ...number64
] as const;

export const listRegex = /^java\.util\.(List|Set|Collection)<([^>]+)>$/;
export const mapRegex = /^java\.util\.Map<[^>]+>$/;
