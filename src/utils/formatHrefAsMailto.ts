function isValidEmail(href: string): boolean {
  // Regular expression to validate email address
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(href);
}

export default function formatHrefAsMailto(href: string): string {
  // Check if the href is a valid email address
  if (isValidEmail(href)) {
    // If it doesn't already start with "mailto:", add it
    if (!href.startsWith("mailto:")) {
      return `mailto:${href}`;
    }
  }
  // Return the original href if it's not an email or already formatted correctly
  return href;
}
