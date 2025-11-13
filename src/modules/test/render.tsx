import type { ReactElement, ReactNode } from "react";
import { render as rtlRender } from "@testing-library/react";
import { ThemeProvider, DEFAULT_THEME } from "@zendeskgarden/react-theming";
import { ToastProvider } from "@zendeskgarden/react-notifications";
import { initI18next } from "../shared/i18n";

export const testTheme = DEFAULT_THEME;

type ProvidersProps = {
  children: ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return (
    <ThemeProvider theme={testTheme}>
      <ToastProvider>{children}</ToastProvider>
    </ThemeProvider>
  );
};

export const render = (ui: ReactElement) => {
  initI18next("en-us");

  rtlRender(ui, {
    wrapper: Providers,
  });
};
