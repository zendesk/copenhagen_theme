import ReactDOM from "react-dom";
import { NewRequestForm, NewRequestFormProps } from "./NewRequestForm";
import { ComponentProviders } from "../shared";

export function renderNewRequestForm(
  props: NewRequestFormProps,
  container: HTMLElement
) {
  ReactDOM.render(
    <ComponentProviders>
      <NewRequestForm {...props} />
    </ComponentProviders>,
    container
  );
}
