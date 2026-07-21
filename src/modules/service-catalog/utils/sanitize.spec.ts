import { htmlToText, sanitizeFieldDescription, sanitizeHtml } from "./sanitize";

describe("sanitize utils", () => {
  describe("htmlToText", () => {
    it("returns an empty string for empty input", () => {
      expect(htmlToText("")).toBe("");
    });

    it("decodes HTML entities to plain text", () => {
      expect(
        htmlToText("This is a keyboard &quot;from&quot; Atl Nacional")
      ).toBe('This is a keyboard "from" Atl Nacional');
    });

    it("strips HTML tags and keeps the text content", () => {
      expect(htmlToText("<strong>Order</strong> a new <em>laptop</em>")).toBe(
        "Order a new laptop"
      );
    });

    it("does not execute event-handler payloads and returns no text for them", () => {
      const onerror = jest.fn();
      (window as unknown as { __xss?: () => void }).__xss = onerror;

      const result = htmlToText(
        '<img src=x onerror="window.__xss()">safe text'
      );

      expect(onerror).not.toHaveBeenCalled();
      expect(result).toBe("safe text");

      delete (window as unknown as { __xss?: () => void }).__xss;
    });

    it("does not execute script payloads", () => {
      const spy = jest.fn();
      (window as unknown as { __xss?: () => void }).__xss = spy;

      htmlToText("<script>window.__xss()</script>");

      expect(spy).not.toHaveBeenCalled();
      delete (window as unknown as { __xss?: () => void }).__xss;
    });

    it("does not execute SVG event-handler payloads", () => {
      const onload = jest.fn();
      (window as unknown as { __xss?: () => void }).__xss = onload;

      const result = htmlToText(
        '<svg onload="window.__xss()">safe svg text</svg>'
      );

      expect(onload).not.toHaveBeenCalled();
      expect(result).toBe("safe svg text");
      delete (window as unknown as { __xss?: () => void }).__xss;
    });
  });

  describe("sanitizeHtml", () => {
    it("removes script tags", () => {
      expect(sanitizeHtml("<p>hi</p><script>alert(1)</script>")).toBe(
        "<p>hi</p>"
      );
    });

    it("removes event-handler attributes but keeps the element", () => {
      const result = sanitizeHtml('<img src="x" onerror="alert(1)">');

      expect(result).toContain("<img");
      expect(result).not.toContain("onerror");
    });

    it("removes SVG event-handler attributes", () => {
      const result = sanitizeHtml(
        '<svg onload="alert(1)"><circle cx="10" cy="10" r="5"></circle></svg>'
      );

      expect(result).toContain("<svg");
      expect(result).not.toContain("onload");
      expect(result).not.toContain("alert(1)");
    });

    it("preserves safe formatting markup", () => {
      const input =
        '<p><strong>Bold</strong> and <a href="https://example.com" target="_blank" rel="noopener noreferrer">link</a></p>';

      const result = sanitizeHtml(input);

      expect(result).toContain("<strong>Bold</strong>");
      expect(result).toContain('href="https://example.com"');
      expect(result).toContain('target="_blank"');
      expect(result).toContain('rel="noopener noreferrer"');
    });

    it("preserves video iframes", () => {
      const input =
        '<iframe src="https://www.youtube.com/embed/abc123" allowfullscreen></iframe>';

      const result = sanitizeHtml(input);

      expect(result).toContain("<iframe");
      expect(result).toContain('src="https://www.youtube.com/embed/abc123"');
    });

    it("strips iframe srcdoc payloads", () => {
      const result = sanitizeHtml(
        '<iframe srcdoc="<script>alert(1)</script>"></iframe>'
      );

      expect(result).not.toContain("srcdoc");
      expect(result).not.toContain("alert(1)");
    });

    it("removes javascript: urls", () => {
      const result = sanitizeHtml('<a href="javascript:alert(1)">x</a>');

      expect(result).not.toContain("javascript:");
    });
  });

  describe("sanitizeFieldDescription", () => {
    it("preserves safe links and formatting", () => {
      const result = sanitizeFieldDescription(
        '<strong>Choose carefully</strong> or visit <a href="https://example.com" target="_blank" rel="noopener noreferrer">docs</a>'
      );

      expect(result).toContain("<strong>Choose carefully</strong>");
      expect(result).toContain('href="https://example.com"');
      expect(result).toContain('target="_blank"');
      expect(result).toContain('rel="noopener noreferrer"');
    });

    it("removes executable content and iframes", () => {
      const result = sanitizeFieldDescription(
        '<img src="x" onerror="alert(1)"><script>alert(2)</script><iframe src="https://example.com"></iframe>'
      );

      expect(result).not.toContain("onerror");
      expect(result).not.toContain("<script");
      expect(result).not.toContain("<iframe");
      expect(result).not.toContain("alert");
    });
  });
});
