
import { ThemeProvider, DEFAULT_THEME, IGardenTheme } from "@zendeskgarden/react-theming";
import { PropsWithChildren } from "react";

let theme = DEFAULT_THEME;

export function setupGardenTheme(callback: (theme: IGardenTheme) => IGardenTheme) {
  theme = callback(DEFAULT_THEME);
}

export function ComponentProviders({ children }: PropsWithChildren<{}>) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
