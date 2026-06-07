import type { ReactElement } from "react";
import { ThemeProvider, DEFAULT_THEME } from "@zendeskgarden/react-theming";
import { render } from "@testing-library/react";

export const renderWithTheme = (ui: ReactElement) => {
  return render(<ThemeProvider theme={DEFAULT_THEME}>{ui}</ThemeProvider>);
};
