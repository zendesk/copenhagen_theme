import type { IGardenTheme } from "@zendeskgarden/react-theming";
import { ThemeProvider, DEFAULT_THEME } from "@zendeskgarden/react-theming";
import type { ReactNode } from "react";

let theme = DEFAULT_THEME;

export function setupGardenTheme(
  callback: (defaultTheme: IGardenTheme) => IGardenTheme
) {
  theme = callback(DEFAULT_THEME);
}

export function ComponentProviders({ children }: { children: ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
