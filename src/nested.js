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

/* 
  [
    {label: '-', value: ''},
    {
      label: 'warm',
      options: [
        {label: 'Yellow', value: 'warm_yellow'},
        {label: 'red', value: 'warm_red'}
      ]
    },
    {
      label: 'cold',
      options: [
        {label: 'Blue', value: 'blue'},
        {label: 'Green', value: 'cold_green'}
      ]
    }
  ]
*/

const Nested = ({ input, options, aria, initialValue }) => {
  const [state, setState] = useState({
    isOpen: false,
    tempSelectedItem: undefined,
    selectedItem: undefined,
  });

  const [selectedItem, setSelectedItem] = useState(
    initialValue || options[0]
  );

  return (
    <Theme>
      <Dropdown
        isOpen={state.isOpen}
        onSelect={(item) => {
          if (!item.options && item !== "back") {
            setSelectedItem(item);
            input.value = item.value;
          }
        }}
        onStateChange={(changes, stateAndHelpers) => {
          const updatedState = {};

          if (Object.hasOwn(changes, "isOpen")) {
            updatedState.isOpen =
              (changes.selectedItem && changes.selectedItem.options) ||
              changes.selectedItem === "back" ||
              changes.isOpen;
          }

          if (Object.hasOwn(changes, "selectedItem")) {
            updatedState.tempSelectedItem =
              changes.selectedItem === "back"
                ? undefined
                : changes.selectedItem;
            stateAndHelpers.setHighlightedIndex(1);
          }

          if (Object.keys(updatedState).length > 0) {
            setState(updatedState);
          }
        }}
      >
        <Field>
          <Select>{selectedItem.label}</Select>
        </Field>
        <Menu>
          {state.tempSelectedItem && state.tempSelectedItem.options ? (
            <>
              <PreviousItem value="back">Back</PreviousItem>
              <Separator />
              {state.tempSelectedItem.options.map((option) =>
                option.options ? (
                  <NextItem key={option.value} value={option}>
                    {option.label}
                  </NextItem>
                ) : (
                  <Item key={option.value} value={option}>
                    {option.label}
                  </Item>
                )
              )}
            </>
          ) : (
            options.map((option) =>
              option.options ? (
                <NextItem key={option.value} value={option}>
                  {option.label}
                </NextItem>
              ) : (
                <Item key={option.value} value={option}>
                  {option.label}
                </Item>
              )
            )
          )}
        </Menu>
      </Dropdown>
    </Theme>
  );
};

window.addEventListener("DOMContentLoaded", () => {
  const inputs = [...document.querySelectorAll("[data-tagger]")];

  console.log(inputs);

  const findOption = (arr, value) => {
    for (const obj of arr) {
      if (obj.value === value) return obj;
      if (obj.options) {
        const nestedObj = findOption(obj.options, value);
        if (nestedObj) return nestedObj;
      }
    }
  };

  inputs.forEach((input) => {
    // Create root
    const container = document.createElement("div");
    input.parentNode.insertBefore(container, input.nextSibling);

    // Extract data
    const options = JSON.parse(input.getAttribute("data-tagger"));
    const aria = {
      required: input.getAttribute("aria-required"),
      labelledby: input.getAttribute("aria-labelledby"),
      describedby: input.getAttribute("aria-describedby"),
    };

    const initialValue = findOption(options, input.value);
    console.log(initialValue);

    // Delete nesty
    const nestyInput = input.parentNode.querySelector(".nesty-input");
    nestyInput.remove();

    ReactDOM.render(
      <Nested
        input={input}
        options={options}
        aria={aria}
        initialValue={initialValue}
      />,
      container
    );
  });
});
