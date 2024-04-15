import {
  Field as GardenField,
  Hint,
  Textarea,
  Label,
  Message,
} from "@zendeskgarden/react-forms";
import { Span } from "@zendeskgarden/react-typography";
import type { Field } from "../data-types";
import { useCallback, useRef } from "react";

interface TextAreaProps {
  field: Field;
  hasWysiwyg: boolean;
  onChange: (value: string) => void;
}

export function TextArea({
  field,
  hasWysiwyg,
  onChange,
}: TextAreaProps): JSX.Element {
  const { label, error, value, name, required, description } = field;
  const wysiwygInitialized = useRef(false);

  const textAreaRefCallback = useCallback(
    (ref: HTMLTextAreaElement) => {
      if (hasWysiwyg && ref && !wysiwygInitialized.current) {
        if (window.NewRequestForm) {
          wysiwygInitialized.current = true;
          window.NewRequestForm.initializeWysiwyg(ref);
        }
      }
    },
    [hasWysiwyg]
  );

  return (
    <GardenField>
      <Label>
        {label}
        {required && <Span aria-hidden="true">*</Span>}
      </Label>
      {description && (
        <Hint dangerouslySetInnerHTML={{ __html: description }} />
      )}
      <Textarea
        ref={textAreaRefCallback}
        name={name}
        defaultValue={value as string}
        validation={error ? "error" : undefined}
        required={required}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <Message validation="error">{error}</Message>}
    </GardenField>
  );
}
