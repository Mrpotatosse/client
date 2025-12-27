import type {LocationQuery} from "vue-router";

export function locationQueryToSearchParams(
  query: LocationQuery
): Record<string, string> {
  const params: Record<string, string> = {};

  for (const [key, value] of Object.entries(query)) {
    if (value == null) continue;

    if (Array.isArray(value)) {
      params[key] = value.join(",");
    } else {
      params[key] = value;
    }
  }

  return params;
}
