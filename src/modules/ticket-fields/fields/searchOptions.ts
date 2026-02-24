import type { TicketFieldOptionObject } from "../data-types/TicketFieldObject";

interface SearchResult {
  value: string;
  label: string;
  menuLabel?: string;
}

/**
 * Builds a map of option values to their display labels.
 * Nested options (with "::" in the name) are formatted as "Part1 > Part2 > Part3".
 */
export function buildOptionsMap(
  options: TicketFieldOptionObject[]
): Map<string, string> {
  const map = new Map<string, string>();

  for (const option of options) {
    const { name, value } = option;
    if (name.includes("::")) {
      const parts = name.split("::");
      map.set(value, parts.join(" > "));
    } else {
      map.set(value, name);
    }
  }

  return map;
}

/**
 * Searches through all options, including nested ones for matches.
 * Returns a flat list of matching options with formatted labels.
 */
export function searchAllOptions(
  options: TicketFieldOptionObject[],
  searchValue: string
): SearchResult[] {
  const results: SearchResult[] = [];
  const lowerSearch = searchValue.toLowerCase();

  for (const option of options) {
    const { name, value } = option;

    if (name.toLowerCase().includes(lowerSearch)) {
      if (name.includes("::")) {
        const parts = name.split("::");
        results.push({
          value,
          label: parts.join(" > "),
          menuLabel: parts[parts.length - 1],
        });
      } else {
        results.push({
          value,
          label: name,
        });
      }
    }
  }

  return results;
}
