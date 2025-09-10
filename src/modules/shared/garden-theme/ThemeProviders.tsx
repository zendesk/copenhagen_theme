import type { ReactNode } from "react";
import type { IGardenTheme } from "@zendeskgarden/react-theming";
import { ThemeProvider } from "@zendeskgarden/react-theming";
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
      <ModalContainerProvider>{children}</ModalContainerProvider>
    </ThemeProvider>
  );
}
