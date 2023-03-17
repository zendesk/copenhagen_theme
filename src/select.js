import React, { useState } from "react";
import ReactDOM from "react-dom";
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

const SelectDropdown = ({ select, options, aria, initialValue }) => {
  const [selectedItem, setSelectedItem] = useState(
    options.find((option) => option.value === initialValue)
  );
  const onSelect = (option) => {
    setSelectedItem(option);
    select.value = option.value;
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
          {options.map((option) => ( option.value !== "" &&
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
  const selects = [...document.querySelectorAll(".form-field select")];

  selects.forEach((select) => {
    if (select.id === "request_issue_type_select") return;

    // Create root
    const container = document.createElement("div");
    select.parentNode.insertBefore(container, select.nextSibling);

    const options = [...select.options].map((option) => ({
      label: option.text,
      value: option.value,
    }));

    const aria = {
      required: select.getAttribute("aria-required"),
      describedby: select.getAttribute("aria-describedby"),
    };

    const initialValue = select.value;

    // Delete nesty
    const nestyInput = select.parentNode.querySelector(".nesty-input");
    nestyInput.remove();

    ReactDOM.render(
      <SelectDropdown
        select={select}
        options={options}
        aria={aria}
        initialValue={initialValue}
      />,
      container
    );
  });
});

{
  /*

<select name="request[ticket_form_id]" id="request_issue_type_select" aria-label="Please choose your issue below" autofocus="autofocus" style="display: none;">
  <option data-url="https://z3naalves17.zendesk.com/hc/en-us/requests/new" value="-">-</option>
  <option data-url="https://z3naalves17.zendesk.com/hc/en-us/requests/new?ticket_form_id=360000100638" value="360000100638">Default Ticket Form</option>
  <option data-url="https://z3naalves17.zendesk.com/hc/en-us/requests/new?ticket_form_id=13790249420049" value="13790249420049">Alternative form</option>
</select> */
}
