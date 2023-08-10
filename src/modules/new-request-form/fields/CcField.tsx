import type { Field } from "../data-types";
import {
  FauxInput,
  Field as GardenField,
  Hint,
  Input,
  Label,
  Message,
} from "@zendeskgarden/react-forms";
import * as tagsInput from "@zag-js/tags-input";
import { useMachine, normalizeProps } from "@zag-js/react";
import styled from "styled-components";
import type { ComponentProps } from "react";
import { Tag } from "@zendeskgarden/react-tags";
import { focusStyles } from "@zendeskgarden/react-theming";

interface CcFieldProps {
  field: Field;
}

const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function CcField({ field }: CcFieldProps): JSX.Element {
  const { label, value, name, error, description, id } = field;
  const initialValue = value
    ? value.split(",").map((email) => email.trim())
    : [];
  const [state, send] = useMachine(
    tagsInput.machine({
      id,
      value: initialValue,
      allowEditTag: false,
    })
  );

  const api = tagsInput.connect(state, send, normalizeProps);

  return (
    <GardenField {...api.rootProps}>
      <Label {...(api.labelProps as ComponentProps<typeof Label>)}>
        {label}
      </Label>
      {description && <Hint>{description}</Hint>}
      <Control {...api.controlProps} validation={error ? "error" : undefined}>
        {api.value.map((email, index) => (
          <span key={index}>
            <StyledTag
              {...api.getTagProps({ index, value: email })}
              size="large"
              hue={EMAIL_REGEX.test(email) ? undefined : "red"}
            >
              <span>{email}</span>
              <Tag.Close
                {...(api.getTagDeleteTriggerProps({
                  index,
                  value: email,
                }) as ComponentProps<typeof Tag.Close>)}
              />
            </StyledTag>
            <input {...api.getTagInputProps({ index, value })} />
          </span>
        ))}
        <StyledInput
          isBare
          {...(api.inputProps as ComponentProps<typeof StyledInput>)}
        />
      </Control>
      {error && <Message validation="error">{error}</Message>}
      {api.value.map((email) => (
        <input key={email} type="hidden" name={name} value={email} />
      ))}
    </GardenField>
  );
}

const Control = styled(FauxInput)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${(p) => p.theme.space.sm};
`;

const StyledInput = styled(Input)`
  width: revert;
  flex: 1;
`;

const StyledTag = styled(Tag)`
  ${(props) =>
    focusStyles({
      theme: props.theme,
      shadowWidth: "sm",
      selector: "&[data-highlighted]",
    })}
`;
