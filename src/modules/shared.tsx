import { ToastProvider } from "@zendeskgarden/react-notifications";
import { ThemeProvider, DEFAULT_THEME } from "@zendeskgarden/react-theming";
import type { ReactNode } from "react";
import { css } from "styled-components";

let theme = DEFAULT_THEME;

interface SetupGardenThemeProps {
  textColor: string;
  brandColor: string;
  linkColor: string;
  hoverLinkColor: string;
  visitedLinkColor: string;
}

export function setupGardenTheme({
  textColor,
  brandColor,
  linkColor,
  hoverLinkColor,
  visitedLinkColor,
}: SetupGardenThemeProps) {
  theme = {
    ...DEFAULT_THEME,
    colors: {
      ...DEFAULT_THEME.colors,
      foreground: textColor,
      primaryHue: brandColor,
    },
    components: {
      "buttons.anchor": css`
        color: ${linkColor};

        :hover,
        :active,
        :focus {
          color: ${hoverLinkColor};
        }

        &:visited {
          color: ${visitedLinkColor};
        }
      `,
    },
  };
}

export function ComponentProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      {/* ToastProvider z-index needs to be higher than the z-index of the admin navbar */}
      <ToastProvider zIndex={2147483647}>{children}</ToastProvider>
    </ThemeProvider>
  );
}
