import { Span } from "@zendeskgarden/react-typography";
import { useFilterTranslations } from "../i18n";
import { useTranslation } from "react-i18next";
import { FilterTagWrapper } from "./FilterTagWrapper";
import type {
  FilterValue,
  CheckboxFilterValue,
} from "../../../data-types/FilterValue";
import type { Organization, TicketField } from "../../../data-types";
import type { MultiSelectOption } from "../filter-modal/Multiselect";

interface FieldTagsProps {
  identifier: string;
  ticketFields: TicketField[];
  organizations: Organization[];
  values: FilterValue[];
  customStatusOptions: MultiSelectOption[];
  onFilterRemoved: (values: FilterValue[]) => void;
}

function getTextLabel(values: FilterValue[]): string {
  const value = values[0]?.substring(1);
  if (!value || value === "*") {
    return "";
  }
  return value.substring(1, value.length - 1);
}

function getNumberLabel(values: FilterValue[]): string {
  const [first, second] = values;

  if (values.length === 1 && first) {
    const trimmed = first.substring(1);
    if (!trimmed || trimmed === "*") {
      return "";
    }
    return trimmed;
  }

  if (values.length === 2 && first && second) {
    return `${first.substring(2)} - ${second.substring(2)}`;
  }

  return "";
}

function getCreditCardLabel(values: FilterValue[]): string {
  const value = values[0]?.substring(2);
  return value === "" ? "" : `XXXXXXXXXXXX${value}`;
}

export function FieldTags({
  identifier,
  ticketFields,
  organizations,
  values,
  customStatusOptions,
  onFilterRemoved,
}: FieldTagsProps): JSX.Element {
  const { t, i18n } = useTranslation();
  const currentLocale = i18n.language;

  const {
    checkboxFilterValuesI18N,
    statusFilterValuesI18N,
    createDefaultDateRangeI18N,
  } = useFilterTranslations();

  const getDateRangeLabel = ([from, to]: FilterValue[]): string => {
    const startDate = new Date(from!.substring(2));
    const endDate = new Date(to!.substring(2));
    const longDate = new Intl.DateTimeFormat(currentLocale, {
      dateStyle: "long",
    });

    return (
      longDate as Intl.DateTimeFormat as {
        formatRange: (start: Date, end: Date) => string;
      }
    ).formatRange(startDate, endDate);
  };

  const getDateLabel = (values: FilterValue[]): string => {
    const firstValue = values[0];

    if (values.length === 1 && firstValue !== undefined) {
      return createDefaultDateRangeI18N()[firstValue] || "";
    } else {
      return getDateRangeLabel(values);
    }
  };

  if (identifier === "organization") {
    const organization = organizations.find(
      (o) => String(o.id) === values[0]?.substring(1)
    );

    return organization ? (
      <FilterTagWrapper
        field={identifier}
        values={values}
        onFilterRemoved={() => {
          onFilterRemoved(values);
        }}
      >
        <span>
          <Span isBold>
            {t("guide-requests-app.organization", "Organization")}
          </Span>{" "}
          {organization.name}
        </span>
      </FilterTagWrapper>
    ) : (
      <></>
    );
  }

  if (identifier === "created_at") {
    return (
      <FilterTagWrapper
        field={identifier}
        values={values}
        onFilterRemoved={() => {
          onFilterRemoved(values);
        }}
      >
        <span>
          <Span isBold>
            {t("guide-requests-app.createdDate", "Created date")}
          </Span>{" "}
          {getDateLabel(values)}
        </span>
      </FilterTagWrapper>
    );
  }

  if (identifier === "updated_at") {
    return (
      <FilterTagWrapper
        field={identifier}
        values={values}
        onFilterRemoved={() => {
          onFilterRemoved(values);
        }}
      >
        <span>
          <Span isBold>
            {t("guide-requests-app.updatedDate", "Updated date")}
          </Span>{" "}
          {getDateLabel(values)}
        </span>
      </FilterTagWrapper>
    );
  }

  if (identifier === "status") {
    return (
      <>
        {values.map((value) => (
          <FilterTagWrapper
            key={value}
            field={identifier}
            values={values}
            onFilterRemoved={() => {
              onFilterRemoved([value]);
            }}
          >
            <span>
              <Span isBold>{t("guide-requests-app.status", "Status")}</Span>{" "}
              {statusFilterValuesI18N[value]}
            </span>
          </FilterTagWrapper>
        ))}
      </>
    );
  }

  if (identifier === "custom_status_id") {
    return (
      <>
        {values.map((value) => {
          const label = customStatusOptions.find(
            (option) => option.value === value
          )?.label;

          return (
            <FilterTagWrapper
              key={value}
              field={identifier}
              values={values}
              onFilterRemoved={() => {
                onFilterRemoved([value]);
              }}
            >
              <span>
                <Span isBold>{t("guide-requests-app.status", "Status")}</Span>{" "}
                {label}
              </span>
            </FilterTagWrapper>
          );
        })}
      </>
    );
  }

  const ticketField = identifier.startsWith("custom_field_")
    ? ticketFields.find(
        (f) => String(f.id) === identifier.replace("custom_field_", "")
      )
    : ticketFields.find((f) => f.type === identifier);

  if (ticketField == null) {
    return <></>;
  }

  switch (ticketField.type) {
    case "date": {
      return (
        <FilterTagWrapper
          field={identifier}
          values={values}
          onFilterRemoved={() => {
            onFilterRemoved(values);
          }}
        >
          <span>
            <Span isBold>{ticketField.title_in_portal}</Span>{" "}
            {getDateLabel(values)}
          </span>
        </FilterTagWrapper>
      );
    }
    case "tagger":
    case "multiselect": {
      return (
        <>
          {values.map((value) => {
            const item = ticketField.custom_field_options?.find(
              (option) => option.value === value.substring(1)
            );

            return (
              item && (
                <FilterTagWrapper
                  key={item.id}
                  field={identifier}
                  values={[value]}
                  onFilterRemoved={() => {
                    onFilterRemoved([value]);
                  }}
                >
                  <span>
                    <Span isBold>{ticketField.title_in_portal}</Span>{" "}
                    {item.name}
                  </span>
                </FilterTagWrapper>
              )
            );
          })}
        </>
      );
    }
    case "text":
    case "textarea":
    case "regexp": {
      return (
        <>
          <FilterTagWrapper
            field={identifier}
            values={values}
            onFilterRemoved={() => {
              onFilterRemoved(values);
            }}
          >
            <span>
              <Span isBold>{ticketField.title_in_portal}</Span>{" "}
              {getTextLabel(values)}
            </span>
          </FilterTagWrapper>
        </>
      );
    }
    case "integer":
    case "decimal": {
      return (
        <FilterTagWrapper
          field={identifier}
          values={values}
          onFilterRemoved={() => {
            onFilterRemoved(values);
          }}
        >
          <span>
            <Span isBold>{ticketField.title_in_portal}</Span>{" "}
            {getNumberLabel(values)}
          </span>
        </FilterTagWrapper>
      );
    }
    case "checkbox": {
      return (
        <FilterTagWrapper
          field={identifier}
          values={values}
          onFilterRemoved={() => {
            onFilterRemoved(values);
          }}
        >
          <span>
            <Span isBold>{ticketField.title_in_portal}</Span>{" "}
            {checkboxFilterValuesI18N[values[0] as CheckboxFilterValue]}
          </span>
        </FilterTagWrapper>
      );
    }
    case "partialcreditcard": {
      return (
        <FilterTagWrapper
          field={identifier}
          values={values}
          onFilterRemoved={() => {
            onFilterRemoved(values);
          }}
        >
          <span>
            <Span isBold>{ticketField.title_in_portal}</Span>{" "}
            {getCreditCardLabel(values)}
          </span>
        </FilterTagWrapper>
      );
    }
    default: {
      return <></>;
    }
  }
}
