import { render } from "react-dom";
import type { NewRequestFormProps } from "./NewRequestForm";
import { NewRequestForm } from "./NewRequestForm";
import { ComponentProviders } from "../shared";

export function renderNewRequestForm(
  props: NewRequestFormProps,
  container: HTMLElement
) {
  render(
    <ComponentProviders>
      <NewRequestForm {...props} />
    </ComponentProviders>,
    container
  );
}
