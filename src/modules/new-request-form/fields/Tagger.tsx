import type {
  IComboboxProps,
  ISelectedOption,
} from "@zendeskgarden/react-dropdowns.next";
import {
  Field as GardenField,
  Label,
  Hint,
  Combobox,
  Message,
  Option,
  OptGroup,
} from "@zendeskgarden/react-dropdowns.next";
import styled from "styled-components";
import { Span } from "@zendeskgarden/react-typography";
import type { Field } from "../data-types";
import { useState, useRef, useEffect } from "react";
import { hideVisually } from "polished";
import { useNestedOptions } from "./useNestedOptions";

interface TaggerProps {
  field: Field;
  onChange: (value: string) => void;
}

const HideVisually = styled.span`
  ${hideVisually()}
`;

const EmptyValue = () => (
  <>
    <Span aria-hidden="true">-</Span>
    <HideVisually>Choose an option</HideVisually>
  </>
);

export function Tagger({ field, onChange }: TaggerProps): JSX.Element {
  const { label, options, error, value, name, required, description } = field;
  const { currentGroup, isGroupIdentifier, setCurrentGroupByIdentifier } =
    useNestedOptions({
      options,
      hasEmptyOption: true,
    });

  const selectionValue = (value as string | undefined) ?? "";
  const [isExpanded, setIsExpanded] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (wrapperRef.current && required) {
      const combobox = wrapperRef.current.querySelector("[role=combobox]");
      combobox?.setAttribute("aria-required", "true");
    }
  }, [wrapperRef, required]);

  const handleChange: IComboboxProps["onChange"] = (changes) => {
    if (
      typeof changes.selectionValue === "string" &&
      isGroupIdentifier(changes.selectionValue)
    ) {
      setCurrentGroupByIdentifier(changes.selectionValue);
      return;
    }

    if (typeof changes.selectionValue === "string") {
      onChange(changes.selectionValue);
    }

    if (changes.isExpanded !== undefined) {
      setIsExpanded(changes.isExpanded);
    }
  };

  return (
    <GardenField>
      <Label>
        {label}
        {required && <Span aria-hidden="true">*</Span>}
      </Label>
      {description && <Hint>{description}</Hint>}
      <Combobox
        ref={wrapperRef}
        inputProps={{ required, name }}
        isEditable={false}
        validation={error ? "error" : undefined}
        onChange={handleChange}
        selectionValue={selectionValue}
        inputValue={selectionValue}
        renderValue={({ selection }) =>
          (selection as ISelectedOption | null)?.label ?? <EmptyValue />
        }
        isExpanded={isExpanded}
      >
        {currentGroup.type === "SubGroup" && (
          <Option {...currentGroup.backOption} />
        )}
        {currentGroup.type === "SubGroup" ? (
          <OptGroup aria-label={currentGroup.name}>
            {currentGroup.options.map((option) => (
              <Option key={option.value} {...option}>
                {option.menuLabel ?? option.label}
              </Option>
            ))}
          </OptGroup>
        ) : (
          currentGroup.options.map((option) =>
            option.value === "" ? (
              <Option key={option.value} {...option}>
                <EmptyValue />
              </Option>
            ) : (
              <Option key={option.value} {...option} />
            )
          )
        )}
      </Combobox>
      {error && <Message validation="error">{error}</Message>}
    </GardenField>
  );
}
