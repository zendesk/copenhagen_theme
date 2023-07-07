import React from "react";
import { ThemeProvider, DEFAULT_THEME } from "@zendeskgarden/react-theming";

let theme = DEFAULT_THEME;

export function setupGardenTheme(callback) {
  theme = callback(DEFAULT_THEME);
}

export function ComponentProviders({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
