import { MAX_PREFILL_URL_LENGTH, PREFILL_FIELD_PREFIX } from "../constants";

export function parseQueryStringPrefill(
  search: string,
  fullUrlLength: number = search.length
): Map<string, string> {
  const prefill = new Map<string, string>();

  if (fullUrlLength > MAX_PREFILL_URL_LENGTH) {
    return prefill;
  }

  const params = new URLSearchParams(search);

  for (const [key, value] of params) {
    if (!key.startsWith(PREFILL_FIELD_PREFIX)) {
      continue;
    }

    const fieldKey = key.substring(PREFILL_FIELD_PREFIX.length);
    if (fieldKey.length === 0) {
      continue;
    }

    prefill.set(fieldKey, value);
  }

  return prefill;
}
