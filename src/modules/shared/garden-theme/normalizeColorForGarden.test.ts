import { normalizeColorForGarden } from "./normalizeColorForGarden";

describe("normalizeColorForGarden", () => {
  it("should handle hex colors as-is", () => {
    expect(normalizeColorForGarden("#1f73b7")).toBe("#1f73b7");
    expect(normalizeColorForGarden("#ffffff")).toBe("#ffffff");
    expect(normalizeColorForGarden("#000000")).toBe("#000000");
  });

  it("should convert opaque rgba to hex", () => {
    expect(normalizeColorForGarden("rgba(237, 196, 196, 1)")).toBe("#edc4c4");
    expect(normalizeColorForGarden("rgba(255, 255, 255, 1)")).toBe("#ffffff");
  });

  it("should convert transparent rgba to Garden rgba format", () => {
    expect(normalizeColorForGarden("rgba(237, 196, 196, 0.5)")).toBe(
      "rgba(#edc4c4, 0.5)"
    );
    expect(normalizeColorForGarden("rgba(0, 0, 0, 0.8)")).toBe(
      "rgba(#000000, 0.8)"
    );
  });

  it("should convert rgb (without alpha) to hex", () => {
    expect(normalizeColorForGarden("rgb(237, 196, 196)")).toBe("#edc4c4");
    expect(normalizeColorForGarden("rgb(0, 0, 0)")).toBe("#000000");
  });

  it("should pass through unrecognized color formats unchanged", () => {
    expect(normalizeColorForGarden("transparent")).toBe("transparent");
  });

  it("should normalize alpha values in the 0-100 range", () => {
    expect(normalizeColorForGarden("rgba(237, 196, 196, 50)")).toBe(
      "rgba(#edc4c4, 0.5)"
    );
    expect(normalizeColorForGarden("rgba(0, 0, 0, 80)")).toBe(
      "rgba(#000000, 0.8)"
    );
  });
});
