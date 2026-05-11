import { render, screen, within } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { DEFAULT_THEME } from "@zendeskgarden/react-theming";
import { PreviewModeBanner } from "./PreviewModeBanner";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (_key: string, defaultValue: string) => defaultValue,
  }),
}));

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={DEFAULT_THEME}>{component}</ThemeProvider>
  );
};

describe("PreviewModeBanner", () => {
  let originalBodyPaddingTop: string;

  beforeEach(() => {
    originalBodyPaddingTop = document.body.style.paddingTop;
    document.body.style.removeProperty("padding-top");
  });

  afterEach(() => {
    document.body.style.removeProperty("padding-top");
    document.body.style.paddingTop = originalBodyPaddingTop;
  });

  it("renders a Garden Global Alert with the title and message", () => {
    renderWithTheme(<PreviewModeBanner />);

    const banner = screen.getByTestId("preview-mode-banner");
    expect(banner).toBeInTheDocument();

    const alert = within(banner).getByRole("status");
    expect(alert).toBeInTheDocument();

    expect(within(banner).getByText("Preview mode")).toBeInTheDocument();
    expect(
      within(banner).getByText(
        "If you navigate away from this page or click on anything outside of this preview, you'll exit the preview mode."
      )
    ).toBeInTheDocument();
  });

  it("portals to a fixed host pinned at the top of the body with the highest z-index", () => {
    renderWithTheme(<PreviewModeBanner />);

    const host = document.body.firstElementChild as HTMLElement;
    expect(host.getAttribute("data-preview-mode-banner-host")).toBe("true");
    expect(host.style.position).toBe("fixed");
    expect(host.style.top).toBe("0px");
    expect(host.style.zIndex).toBe("2147483647");
  });

  it("reserves body padding-top to keep page content below the banner", () => {
    renderWithTheme(<PreviewModeBanner />);

    expect(document.body.style.paddingTop).not.toBe("");
  });

  it("removes its host element and restores body padding-top on unmount", () => {
    document.body.style.paddingTop = "64px";

    const { unmount } = renderWithTheme(<PreviewModeBanner />);
    expect(
      document.querySelector("[data-preview-mode-banner-host]")
    ).not.toBeNull();

    unmount();

    expect(
      document.querySelector("[data-preview-mode-banner-host]")
    ).toBeNull();
    expect(document.body.style.paddingTop).toBe("64px");
  });
});
