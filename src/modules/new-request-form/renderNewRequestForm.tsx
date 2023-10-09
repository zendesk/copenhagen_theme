import { render } from "react-dom";
import { ThemeProviders } from "../theming";
import type { NewRequestFormProps } from "./NewRequestForm";
import { NewRequestForm } from "./NewRequestForm";

export function renderNewRequestForm(
  props: NewRequestFormProps,
  container: HTMLElement
) {
  render(
    <ThemeProviders>
      <NewRequestForm {...props} />
    </ThemeProviders>,
    container
  );
}
