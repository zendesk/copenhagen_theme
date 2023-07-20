import { render } from "react-dom";
import { ComponentProviders } from "../shared";
import type { NewRequestFormProps } from "./NewRequestForm";
import { NewRequestForm } from "./NewRequestForm";

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
