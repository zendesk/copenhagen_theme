import DOMPurify from "dompurify";

/**
 * Sanitizes rich-text HTML for safe rendering via `dangerouslySetInnerHTML`.
 * `iframe` is kept (descriptions can embed videos) but DOMPurify still blocks
 * `javascript:`/`data:` sources, `srcdoc` and event-handler attributes.
 */
export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ADD_TAGS: ["iframe"],
    ADD_ATTR: [
      "allow",
      "allowfullscreen",
      "frameborder",
      "scrolling",
      "target",
      "title",
    ],
  });
}

export function sanitizeFieldDescription(html: string): string {
  return DOMPurify.sanitize(html, {
    ADD_ATTR: ["target"],
  });
}

/**
 * Converts a possibly-HTML string to plain text using an inert `DOMParser`
 * document, so resources are never fetched and handlers like `onerror` never
 * fire (unlike assigning to `innerHTML`).
 */
export function htmlToText(html: string): string {
  if (!html) {
    return "";
  }

  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent ?? "";
}
