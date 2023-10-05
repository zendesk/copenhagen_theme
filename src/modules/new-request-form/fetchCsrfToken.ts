// NOTE: This is a temporary handling of the CSRF token
export async function fetchCsrfToken() {
  const response = await fetch("/hc/api/internal/csrf_token.json");
  const { current_session } = await response.json();
  return current_session.csrf_token as string;
}
