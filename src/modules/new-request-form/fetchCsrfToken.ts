export async function fetchCsrfToken() {
  const response = await fetch("/api/v2/help_center/sessions.json");
  const { current_session } = await response.json();
  return current_session.csrf_token as string;
}
