import ReactDOM from "react-dom";
import {
  Combobox,
  Option,
  Field,
  Label,
  IComboboxProps,
} from "@zendeskgarden/react-dropdowns.next";
import { ComponentProviders } from "./shared";

interface TicketFormOption {
  id: string;
  url: string;
  name: string;
}

interface NewRequestFormProps {
  ticketForms: { options: TicketFormOption[] };
}

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

function NewRequestForm({ ticketForms }: NewRequestFormProps) {
  return (
    <form>
      <TicketFormField ticketForms={ticketForms} />
    </form>
  );
}

function TicketFormField({ ticketForms }: NewRequestFormProps) {
  const { options } = ticketForms;

  const handleChange: IComboboxProps["onChange"] = ({ selectionValue }) => {
    if (selectionValue && typeof selectionValue === "string") {
      window.location.href = selectionValue;
    }
  }

  return (
    <Field>
      <Label>Please choose your issue below</Label>
      <Combobox isEditable={false} onChange={handleChange}>
        {options.map(({ id, url, name }) => (
          <Option key={id} value={url} label={name}>
            {name}
          </Option>
        ))}
      </Combobox>
    </Field>
  );
}
