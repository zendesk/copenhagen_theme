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
import { useRef, useState } from "react";
import { Tooltip } from "@zendeskgarden/react-tooltips";
import AlertWarningStroke from "@zendeskgarden/svg-icons/src/12/alert-warning-stroke.svg";
import { useTranslation } from "react-i18next";
import { Span } from "@zendeskgarden/react-typography";
import type { TicketFieldObject } from "../../../ticket-fields/data-types/TicketFieldObject";

interface CcFieldProps {
  field: TicketFieldObject;
}

const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Container = styled(FauxInput)`
  padding: ${(props) => `${props.theme.space.xxs} ${props.theme.space.sm}`};

  // Removes white spaces for inline elements
  font-size: 0;

  // Same as height of Tag size="large" + base space (4px)
  // to give some vertical space between tags
  --line-height: ${(props) =>
    props.theme.space.base * 8 + props.theme.space.base}px;
  line-height: var(--line-height);
`;

const GridCell = styled.span`
  display: inline-block;
  margin-inline-end: ${(props) => props.theme.space.sm};
`;

const StyledTag = styled(Tag)`
  ${(props) =>
    focusStyles({
      theme: props.theme,
      shadowWidth: "sm",
      selector: "&:focus",
    })}
`;

const InputWrapper = styled.div`
  display: inline-block;
  position: relative;
`;

const InputMirror = styled(FauxInput)`
  display: inline-block;
  min-width: 200px;
  opacity: 0;
  user-select: none;
  height: var(--line-height);
  line-height: var(--line-height);
`;

const StyledInput = styled(Input)`
  position: absolute;
  top: 0;
  left: 0;
  height: var(--line-height);
  line-height: var(--line-height);
`;

export function CcField({ field }: CcFieldProps): JSX.Element {
  const { label, value, name, error, description } = field;
  const { t } = useTranslation();
  const initialValue = value
    ? (value as string).split(",").map((email) => email.trim())
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
      addedTag: (email) =>
        t("new-request-form.cc-field.email-added", "{{email}} has been added", {
          email,
        }),
      removedTag: (email) =>
        t(
          "new-request-form.cc-field.email-removed",
          "{{email}} has been removed",
          { email }
        ),
      addedTags: (emails) =>
        t(
          "new-request-form.cc-field.emails-added",
          "{{emails}} have been added",
          { emails }
        ),
    },
  });

  const renderTag = (index: number, isValid: boolean, email: string) => (
    <StyledTag
      size="large"
      aria-label={t(
        "new-request-form.cc-field.email-label",
        "{{email}} - Press Backspace to remove",
        { email }
      )}
      hue={isValid ? undefined : "red"}
    >
      {!isValid && (
        <Tag.Avatar>
          <AlertWarningStroke />
        </Tag.Avatar>
      )}
      <span>{email}</span>
      <Tag.Close {...getTagCloseProps(index)} />
    </StyledTag>
  );

  return (
    <GardenField>
      <Label>{label}</Label>
      {description && <Hint>{description}</Hint>}
      <Container {...getContainerProps()}>
        {tags.length > 0 && (
          <span
            {...getGridProps({
              "aria-label": t(
                "new-request-form.cc-field.container-label",
                "Selected CC emails"
              ),
            })}
          >
            <span ref={gridRowRef} {...getGridRowProps()}>
              {tags.map((email, index) => {
                const isValid = EMAIL_REGEX.test(email);

                return isValid ? (
                  <GridCell key={index} {...getGridCellProps(index)}>
                    {renderTag(index, isValid, email)}
                  </GridCell>
                ) : (
                  <Tooltip
                    key={index}
                    content={t(
                      "new-request-form.cc-field.invalid-email",
                      "Invalid email address"
                    )}
                  >
                    <GridCell {...getGridCellProps(index)}>
                      {renderTag(index, isValid, email)}
                    </GridCell>
                  </Tooltip>
                );
              })}
            </span>
          </span>
        )}
        <InputWrapper>
          {/* Used to automatically resize the input based on the content */}
          <InputMirror isBare aria-hidden="true" tabIndex={-1}>
            {inputValue}
          </InputMirror>
          <StyledInput ref={inputRef} isBare {...getInputProps()} />
        </InputWrapper>
      </Container>
      {error && <Message validation="error">{error}</Message>}
      {tags.map((email) => (
        <input key={email} type="hidden" name={name} value={email} />
      ))}
      <Span hidden {...getAnnouncementProps()}>
        {announcement}
      </Span>
    </GardenField>
  );
}
