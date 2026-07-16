/**
 * Thin wrapper around window.location.assign so call sites can be unit
 * tested. Newer jsdom versions make window.location and its methods
 * non-configurable/non-writable, so window.location.assign can no longer
 * be mocked directly in tests - mock this module instead.
 */
export function navigateTo(url: string): void {
  window.location.assign(url);
}
