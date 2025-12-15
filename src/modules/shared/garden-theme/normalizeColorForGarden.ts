/**
 * Normalizes color values from various formats to Garden-compatible format.
 * Converts standard CSS rgba/rgb colors to formats supported by Garden's theme system.
 *
 * @param color - Input color in hex, rgb, or rgba format
 * @returns Color in Garden-compatible format:
 *   - Hex colors are returned as-is
 *   - rgba(r, g, b, 1) is converted to #RRGGBB
 *   - rgba(r, g, b, a) where a < 1 is converted to rgba(#RRGGBB, a)
 *   - rgb(r, g, b) is converted to #RRGGBB
 *   - Alpha values in 0-100 range are normalized to 0-1 range
 *     - This handles a bug where theme settings editor saved alpha in 0-100 range
 */
export function normalizeColorForGarden(color: string): string {
  if (color.startsWith("#")) {
    return color;
  }

  const rgbaMatch = color.match(
    /^rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\s*\)$/
  );

  if (rgbaMatch && rgbaMatch[1] && rgbaMatch[2] && rgbaMatch[3]) {
    const r = parseInt(rgbaMatch[1], 10);
    const g = parseInt(rgbaMatch[2], 10);
    const b = parseInt(rgbaMatch[3], 10);
    let a = rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : 1;

    if (a > 1 && a <= 100) {
      a = a / 100;
    }

    const toHex = (n: number) => n.toString(16).padStart(2, "0");
    const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;

    if (a >= 1) {
      return hex;
    } else {
      return `rgba(${hex}, ${a})`;
    }
  }

  // If format is unrecognized, return as-is and let Garden handle the error
  return color;
}
