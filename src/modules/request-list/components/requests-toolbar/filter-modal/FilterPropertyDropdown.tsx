import { Combobox, Field, Option } from "@zendeskgarden/react-dropdowns";

import { useTranslation } from "react-i18next";
import { FieldError } from "./FieldError";
import type { FormErrors } from "./FormState";
import type { Organization, TicketField } from "../../../data-types";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useModalContainer } from "../../../../shared/garden-theme/modal-container/useModalContainer";

const HIDDEN_FIELDS = [
  "description",
  "group",
  "assignee",
  "custom_status",
  "status",
  "subject",
  "priority",
  "tickettype",
  "lookup",
  "requester",
];

type FormFieldKey = "ticketField";

export interface FilterProperty {
  identifier: string;
  label: string;
}

interface FilterPropertyDropdownProps {
  ticketFields: TicketField[];
  organizations: Organization[];
  selectedProperty: FilterProperty | undefined;
  hasCustomStatuses: boolean;
  onSelect: (property: FilterProperty) => void;
  errors: FormErrors<FormFieldKey>;
}

export function FilterPropertyDropdown({
  ticketFields,
  organizations,
  selectedProperty,
  hasCustomStatuses,
  onSelect,
  errors,
}: FilterPropertyDropdownProps): JSX.Element {
  const { t } = useTranslation();

  const modalContainer = useModalContainer();

  const filterProperties = useMemo(
    () => [
      {
        identifier: "created_at",
        label: t("guide-requests-app.createdDate", "Created date"),
      },
      {
        identifier: "updated_at",
        label: t("guide-requests-app.updatedDate", "Updated date"),
      },
      hasCustomStatuses
        ? {
            identifier: "custom_status_id",
            label: t("guide-requests-app.status", "Status"),
          }
        : {
            identifier: "status",
            label: t("guide-requests-app.status", "Status"),
          },
      ...(organizations.length > 1
        ? [
            {
              identifier: "organization",
              label: t("guide-requests-app.organization", "Organization"),
            },
          ]
        : []),
      ...ticketFields
        .filter((field) => !HIDDEN_FIELDS.includes(field.type))
        .map(({ id, title_in_portal }) => ({
          identifier: String(id),
          label: title_in_portal,
        })),
    ],
    [t, hasCustomStatuses, organizations, ticketFields]
  );

  const [options, setOptions] = useState<FilterProperty[]>([]);

  useEffect(() => {
    setOptions(filterProperties);
  }, [filterProperties]);

  const getOptionValue = useCallback(
    (property: FilterProperty) => property.identifier,
    []
  );

  const handleChange = useCallback(
    (changes: {
      selectionValue?: string | string[] | null;
      inputValue?: string;
    }) => {
      const { inputValue, selectionValue } = changes;

      if (inputValue !== undefined) {
        if (inputValue === "") {
          setOptions(filterProperties);
        } else {
          const matchedOptions = filterProperties.filter((option) => {
            return option.label
              .trim()
              .toLowerCase()
              .includes(inputValue.trim().toLowerCase());
          });

          setOptions(matchedOptions);
        }
      }

      if (selectionValue && typeof selectionValue === "string") {
        const selectedFilterProperty = filterProperties.find(
          (property) => property.identifier === selectionValue
        );

        if (selectedFilterProperty) {
          onSelect(selectedFilterProperty);
        }
      }
    },
    [filterProperties, onSelect]
  );

  return (
    <Field>
      <Field.Label>
        {t("guide-requests-app.filters-modal.select-filter", "Select filter")}
      </Field.Label>
      <Combobox
        isAutocomplete
        onChange={handleChange}
        selectionValue={
          selectedProperty ? getOptionValue(selectedProperty) : null
        }
        validation={errors.ticketField ? "error" : undefined}
        listboxAppendToNode={modalContainer}
      >
        {options.length === 0 ? (
          <Option
            isDisabled
            label={t(
              "guide-requests-app.filters-modal.no-matches-found",
              "No matches found"
            )}
            value=""
          />
        ) : (
          options.map((property) => (
            <Option
              key={property.identifier}
              value={getOptionValue(property)}
              label={property.label}
            />
          ))
        )}
      </Combobox>
      <FieldError errors={errors} field="ticketField" />
    </Field>
  );
}
