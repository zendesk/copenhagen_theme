import { render } from "react-dom";
import type { Settings } from "../garden-theme/createTheme";
import { createTheme, ThemeProviders } from "../garden-theme";
import type { NewRequestFormProps } from "./NewRequestForm";
import { NewRequestForm } from "./NewRequestForm";

export function renderNewRequestForm(
  settings: Settings,
  props: NewRequestFormProps,
  container: HTMLElement
) {
  render(
    <ThemeProviders theme={createTheme(settings)}>
      <NewRequestForm {...props} />
    </ThemeProviders>,
    container
  );
}
