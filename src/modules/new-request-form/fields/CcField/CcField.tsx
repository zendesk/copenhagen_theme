import type { Field } from "../../data-types";
import {
  FauxInput,
  Field as GardenField,
  Hint,
  Input,
  Label,
  Message,
} from "@zendeskgarden/react-forms";
import styled from "styled-components";
import { Tag } from "@zendeskgarden/react-tags";
import { focusStyles } from "@zendeskgarden/react-theming";
import { useTagsInputContainer } from "./useTagsInputContainer";
import { hideVisually } from "polished";
import { useRef, useState } from "react";

interface CcFieldProps {
  field: Field;
}

const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function CcField({ field }: CcFieldProps): JSX.Element {
  const { label, value, name, error, description } = field;
  const initialValue = value
    ? value.split(",").map((email) => email.trim())
    : [];
  const [tags, setTags] = useState(initialValue);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const gridRowRef = useRef<HTMLElement>(null);
  const {
    getContainerProps,
    getGridProps,
    getGridRowProps,
    getGridCellProps,
    getTagCloseProps,
    getInputProps,
    getAnnouncementProps,
    announcement,
  } = useTagsInputContainer({
    tags,
    onTagsChange: setTags,
    inputValue,
    onInputValueChange: setInputValue,
    inputRef,
    gridRowRef,
    i18n: {
      addedTag: (value) => `${value} has been added`,
      removedTag: (value) => `${value} has been removed`,
      addedTags: (values) => `${values.join(", ")} have been added`,
    },
  });

  return (
    <GardenField>
      <Label>{label}</Label>
      {description && <Hint>{description}</Hint>}
      <Container {...getContainerProps()}>
        <span {...getGridProps({ "aria-label": "Selected CC e-mails" })}>
          <span ref={gridRowRef} {...getGridRowProps()}>
            {tags.map((email, index) => {
              const isValid = EMAIL_REGEX.test(email);

              return (
                <span
                  key={index}
                  aria-invalid={!isValid}
                  {...getGridCellProps(index)}
                >
                  <StyledTag
                    size="large"
                    aria-label={`${email} - Press Backspace to remove`}
                    hue={isValid ? undefined : "red"}
                  >
                    <span>{email}</span>
                    <Tag.Close {...getTagCloseProps(index)} />
                  </StyledTag>
                </span>
              );
            })}
          </span>
        </span>
        <InputWrapper>
          {/* Used to automatically resize the input based on the content */}
          <InputMirror isBare aria-hidden="true" tabIndex={-1}>
            {/* When the input is empty we show a space, otherwise the height of the mirror is less than the input */}
            {inputValue || " "}
          </InputMirror>
          <StyledInput ref={inputRef} isBare {...getInputProps()} />
        </InputWrapper>
      </Container>
      {error && <Message validation="error">{error}</Message>}
      {tags.map((email) => (
        <input key={email} type="hidden" name={name} value={email} />
      ))}
      <AnnouncementMessage {...getAnnouncementProps()}>
        {announcement}
      </AnnouncementMessage>
    </GardenField>
  );
}

const Container = styled(FauxInput)`
  padding: ${(props) => `${props.theme.space.xxs} ${props.theme.space.sm}`};
`;

const StyledTag = styled(Tag)`
  margin-right: ${(props) => props.theme.space.sm};

  ${(props) =>
    focusStyles({
      theme: props.theme,
      shadowWidth: "sm",
      selector: "&:focus",
    })}
`;

const InputWrapper = styled.div`
  display: inline-block;
  margin-top: ${(props) => props.theme.space.xs};
  margin-bottom: ${(props) => props.theme.space.xs};
  position: relative;
`;

const InputMirror = styled(FauxInput)`
  display: inline-block;
  min-width: 200px;
  opacity: 0;
  user-select: none;
`;

const StyledInput = styled(Input)`
  position: absolute;
  top: 0;
  left: 0;

  // override CPH default style. Can be removed once global styles are removed
  &:focus {
    border: none !important;
  }
`;

const AnnouncementMessage = styled.span`
  ${hideVisually()}
`;
