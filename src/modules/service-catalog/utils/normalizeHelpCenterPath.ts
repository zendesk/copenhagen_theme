/**
 * Ensures a Help Center base path is root-relative (starts with a leading
 * slash).
 *
 * `helpCenterPath` comes from the theme templates via
 * `{{json (page_path 'help_center')}}` and is expected to always resolve to
 * an absolute path such as "/hc/en-us". Every service catalog link is built
 * by concatenating onto it directly, e.g. `${helpCenterPath}/services/${id}`.
 *
 * If `helpCenterPath` were ever missing its leading slash, those links would
 * silently become relative URLs. Since the catalog pages themselves are
 * served at "/hc/<locale>/services", a browser resolving a relative URL from
 * there drops the last path segment and re-appends the relative value,
 * producing a duplicated "/hc/<locale>/hc/services" instead of
 * "/hc/<locale>/services". Normalizing here guarantees every downstream
 * consumer always receives an absolute path.
 */
export function normalizeHelpCenterPath(path: string): string {
  if (!path) return "/";
  return path.startsWith("/") ? path : `/${path}`;
}
