import { shouldShowToggleButton } from './CollapsibleDescription';

describe('shouldShowToggleButton', () => {
  test('returns false for empty string', () => {
    expect(shouldShowToggleButton("")).toBe(false);
  });

  test('returns false for null', () => {
    expect(shouldShowToggleButton(null)).toBe(false);
  });

  test('returns false for undefined', () => {
    expect(shouldShowToggleButton(undefined)).toBe(false);
  });

  test('returns false for short description', () => {
    expect(shouldShowToggleButton("Short description")).toBe(false);
  });

  test('returns true for long description', () => {
    const longDescription = "A".repeat(300);
    expect(shouldShowToggleButton(longDescription)).toBe(true);
  });
});