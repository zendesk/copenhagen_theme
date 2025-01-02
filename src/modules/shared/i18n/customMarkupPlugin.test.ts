import { customMarkupPlugin } from "./customMarkupPlugin";

describe("customMarkupPlugin", () => {
  it("should convert interpolation tags to HTML", () => {
    const value = "{{#strong}}Hello{{/strong}} {{#br/}}";
    expect(customMarkupPlugin.process(value, "my_key", {}, null)).toBe(
      "<strong>Hello</strong> <br/>"
    );
  });

  it("should convert interpolation tags to HTML with multiple tags", () => {
    const value = "{{#strong}}Hello{{/strong}} {{#br/}} {{#em}}World{{/em}}";
    expect(customMarkupPlugin.process(value, "my_key", {}, null)).toBe(
      "<strong>Hello</strong> <br/> <em>World</em>"
    );
  });

  it("should not convert interpolation tags to HTML with nested tags", () => {
    const value = "{{#strong}}Hello {{#em}}World{{/em}}{{/strong}}";
    expect(customMarkupPlugin.process(value, "my_key", {}, null)).toBe(
      "<strong>Hello {{#em}}World{{/em}}</strong>"
    );
  });

  it("should not convert interpolation tags to HTML with unclosed tags", () => {
    const value = "{{#strong}}Hello";
    expect(customMarkupPlugin.process(value, "my_key", {}, null)).toBe(
      "{{#strong}}Hello"
    );
  });

  it("should not convert interpolation tags to HTML with different opening an closing tags", () => {
    const value = "{{#b}}Hello{{/strong}}";
    expect(customMarkupPlugin.process(value, "my_key", {}, null)).toBe(
      "{{#b}}Hello{{/strong}}"
    );
  });
});
