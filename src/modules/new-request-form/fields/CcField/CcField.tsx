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
import { Fragment } from "react";
import { Tag } from "@zendeskgarden/react-tags";
import { focusStyles } from "@zendeskgarden/react-theming";
import { useTagsInputContainer } from "./useTagsInputContainer";

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

  const {
    tags,
    getContainerProps,
    getListProps,
    getTagProps,
    getTagCloseProps,
    getInputProps,
  } = useTagsInputContainer({ initialValue });

  return (
    <GardenField>
      <Label>{label}</Label>
      {description && <Hint>{description}</Hint>}
      <FauxInput {...getContainerProps()}>
        <span aria-label="Selected e-mails" {...getListProps()}>
          {tags.map((email, index) => (
            <Fragment key={email}>
              <StyledTag
                size="large"
                aria-invalid={!EMAIL_REGEX.test(email)}
                aria-label={`${email} - Press Backspace to remove`}
                {...getTagProps(index)}
              >
                <span>{email}</span>
                <Tag.Close {...getTagCloseProps(index)} />
              </StyledTag>
              <input type="hidden" name={name} value={email} />
            </Fragment>
          ))}
        </span>
        <StyledInput isBare {...getInputProps()} />
      </FauxInput>
      {error && <Message validation="error">{error}</Message>}
    </GardenField>
  );
}

const StyledInput = styled(Input)`
  width: revert;
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
