import {
  Field as GardenField,
  Hint,
  Textarea,
  Label,
  Message,
} from "@zendeskgarden/react-forms";
import { Span } from "@zendeskgarden/react-typography";
import { useWysiwyg } from "./useWysiwyg";
import styled from "styled-components";
import type { TicketFieldObject } from "../../data-types/TicketFieldObject";
import { useTranslation } from "react-i18next";
import { useId } from "@zendeskgarden/container-utilities";

interface TextAreaProps {
  field: TicketFieldObject;
  hasWysiwyg: boolean;
  baseLocale: string;
  hasAtMentions: boolean;
  userRole: string;
  brandId: number;
  onChange: (value: string) => void;
}

const StyledField = styled(GardenField)`
  .ck.ck-editor {
    margin-top: ${(props) => props.theme.space.xs};
  }
`;

const StyledMessage = styled(Message)`
  .ck.ck-editor + & {
    margin-top: ${(props) => props.theme.space.xs};
  }
`;

export function TextArea({
  field,
  hasWysiwyg,
  baseLocale,
  hasAtMentions,
  userRole,
  brandId,
  onChange,
}: TextAreaProps): JSX.Element {
  const { label, error, value, name, required, description } = field;
  const ref = useWysiwyg({
    hasWysiwyg,
    baseLocale,
    hasAtMentions,
    userRole,
    brandId,
  });
  const { t } = useTranslation();
  const ariaLabel = t(
    "new-request-form.description.aria-label",
    "Description editing area"
  );
  const ariaDescribedby = t(
    "new-request-form.description.aria_describedby",
    "Press ⌥0 for keyboard shortcuts dialog"
  );
  const descriptionId = useId();

  return (
    <StyledField>
      <Label>
        {label}
        {required && <Span aria-hidden="true">*</Span>}
      </Label>
      {description && (
        <Hint dangerouslySetInnerHTML={{ __html: description }} />
      )}
      <Textarea
        ref={ref}
        name={name}
        defaultValue={value as string}
        validation={error ? "error" : undefined}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        rows={6}
        isResizable
        aria-label={ariaLabel}
        aria-describedby={descriptionId}
      />
      {error && <StyledMessage validation="error">{error}</StyledMessage>}
      {ariaDescribedby && (
        <Span id={descriptionId} hidden>
          {ariaDescribedby}
        </Span>
      )}
    </StyledField>
  );
}
