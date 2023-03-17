import React, { useState } from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@zendeskgarden/react-theming";
import {
  Dropdown,
  Menu,
  Item,
  Separator,
  NextItem,
  PreviousItem,
  Field,
  Select,
  Label,
} from "@zendeskgarden/react-dropdowns";
import Theme from "./theme";

const TicketFormSelector = ({ select, options, aria, initialValue }) => {
  const [selectedItem, setSelectedItem] = useState(options.find(option => option.value === initialValue));

  const onSelect = (option) => {
    setSelectedItem(option);
    window.location.assign(option.url);
  };

  return (
    <Theme>
      <Dropdown
        selectedItem={selectedItem}
        onSelect={onSelect}
        downshiftProps={{ itemToString: (item) => item && item.label }}
      >
        <Field>
          <Select>{selectedItem.label}</Select>
        </Field>
        <Menu>
          {options.map((option) => (
            <Item key={option.value} value={option}>
              {option.label}
            </Item>
          ))}
        </Menu>
      </Dropdown>
    </Theme>
  );
};

window.addEventListener("DOMContentLoaded", () => {
  const formSelect = document.querySelector("#request_issue_type_select");

  if (!formSelect) return;

  // Create root
  const container = document.createElement("div");
  formSelect.parentNode.insertBefore(container, formSelect.nextSibling);

  const options = [...formSelect.options].map((option) => ({
    label: option.text,
    value: option.value,
    url: option.dataset.url,
  }));

  const aria = {
    label: formSelect.getAttribute("aria-label"),
  };

  const initialValue = formSelect.value;

  // Delete nesty
  const nestyInput = formSelect.parentNode.querySelector(".nesty-input");
  nestyInput.remove();

  ReactDOM.render(
    <TicketFormSelector select={formSelect} options={options} aria={aria} initialValue={initialValue} />,
    container
  );
});

{
  /*

<select name="request[ticket_form_id]" id="request_issue_type_select" aria-label="Please choose your issue below" autofocus="autofocus" style="display: none;">
  <option data-url="https://z3naalves17.zendesk.com/hc/en-us/requests/new" value="-">-</option>
  <option data-url="https://z3naalves17.zendesk.com/hc/en-us/requests/new?ticket_form_id=360000100638" value="360000100638">Default Ticket Form</option>
  <option data-url="https://z3naalves17.zendesk.com/hc/en-us/requests/new?ticket_form_id=13790249420049" value="13790249420049">Alternative form</option>
</select> */
}
