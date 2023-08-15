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
      <Container {...getContainerProps()}>
        <List aria-label="Selected e-mails" {...getListProps()}>
          {tags.map((email, index) => {
            const isValid = EMAIL_REGEX.test(email);

            return (
              <ListItem key={email}>
                <StyledTag
                  size="large"
                  aria-invalid={!isValid}
                  aria-label={`${email} - Press Backspace to remove`}
                  hue={isValid ? undefined : "red"}
                  {...getTagProps(index)}
                >
                  <span>{email}</span>
                  <Tag.Close {...getTagCloseProps(index)} />
                </StyledTag>
              </ListItem>
            );
          })}
        </List>
        <StyledInput isBare {...getInputProps()} />
      </Container>
      {error && <Message validation="error">{error}</Message>}
      {tags.map((email) => (
        <input key={email} type="hidden" name={name} value={email} />
      ))}
    </GardenField>
  );
}

const Container = styled(FauxInput)`
  padding: ${(props) => `${props.theme.space.xxs} ${props.theme.space.sm}`};
`;

const List = styled.ul`
  display: inline;
  list-style-type: none;
  margin: 0;
`;

const ListItem = styled.li`
  display: inline;
  margin: 0;
  margin-right: ${(props) => props.theme.space.sm};
`;

const StyledTag = styled(Tag)`
  ${(props) =>
    focusStyles({
      theme: props.theme,
      shadowWidth: "sm",
      selector: "&:focus",
    })}
`;

const StyledInput = styled(Input)`
  width: revert;
  margin-top: ${(props) => props.theme.space.xs};
  margin-bottom: ${(props) => props.theme.space.xs};

  // override CPH default style. Can be removed once global styles are removed
  &:focus {
    border: none !important;
  }
`;
