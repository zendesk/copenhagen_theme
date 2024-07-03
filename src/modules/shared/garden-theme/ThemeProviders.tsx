import type { ReactNode } from "react";
import type { IGardenTheme } from "@zendeskgarden/react-theming";
import { ThemeProvider } from "@zendeskgarden/react-theming";
import { ToastProvider } from "@zendeskgarden/react-notifications";
import { ModalContainerProvider } from "./modal-container/ModalContainerProvider";

export function ThemeProviders({
  theme,
  children,
}: {
  theme: IGardenTheme;
  children: ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      {/* ToastProvider z-index needs to be higher than the z-index of the admin navbar */}
      <ToastProvider zIndex={2147483647}>
        <ModalContainerProvider>{children}</ModalContainerProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
