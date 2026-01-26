import styled from "styled-components";
import { Fragment, useCallback, useState } from "react";
import { RequestFormField } from "../../../ticket-fields";
import { Button } from "@zendeskgarden/react-buttons";
import { getColor } from "@zendeskgarden/react-theming";
import { useTranslation } from "react-i18next";
import type { ServiceCatalogItem } from "../../data-types/ServiceCatalogItem";
import { CollapsibleDescription } from "./CollapsibleDescription";
import type { TicketFieldObject } from "../../../ticket-fields/data-types/TicketFieldObject";
import type { CustomObjectRecord } from "../../../ticket-fields/data-types/CustomObjectRecord";
import type { ITAMAssetOptionObject } from "../../data-types/ITAMAssetOptionObject";
import { Span } from "@zendeskgarden/react-typography";
import { Option } from "@zendeskgarden/react-dropdowns";
import { Attachments } from "../../../ticket-fields/fields/attachments/Attachments";
import {
  AttachmentsInputName,
  ASSET_TYPE_KEY,
  ASSET_KEY,
} from "../../constants";
import type {
  AttachmentsError,
  AttachmentsOption,
} from "../../data-types/Attachments";

const Form = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: ${(props) => props.theme.space.md};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

const FieldsContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space.md};
  margin-inline-end: ${(props) => props.theme.space.xl};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    margin-inline-end: 0;
  }
`;

const ButtonWrapper = styled.div`
  flex: 1;
  margin-inline-start: ${(props) => props.theme.space.xl};
  padding: ${(props) => props.theme.space.lg};
  border: ${(props) => props.theme.borders.sm}
    ${({ theme }) => getColor({ theme, hue: "grey", shade: 300 })};
  height: fit-content;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    position: sticky;
    top: 0;
    background: ${({ theme }) =>
      getColor({ theme, variable: "background.default" })};
    padding: ${(props) => props.theme.space.lg};
    border: none;
    border-top: ${(props) => props.theme.borders.sm}
      ${({ theme }) => getColor({ theme, hue: "grey", shade: 300 })};
    width: 100vw;
    margin-inline-start: 0;
  }
`;

const RightColumn = styled.div`
  flex: 1;
  margin-inline-start: ${(props) => props.theme.space.xl};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    position: sticky;
    bottom: 0;
    margin-inline-start: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const LeftColumn = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space.lg};
  margin-inline-end: ${(props) => props.theme.space.xl};
  min-width: 0;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    margin-inline-end: 0;
  }
`;

const isAssetField = (f: TicketFieldObject) =>
  f.relationship_target_type === ASSET_KEY;
const isAssetTypeField = (f: TicketFieldObject) =>
  f.relationship_target_type === ASSET_TYPE_KEY;

interface ItemRequestFormProps {
  requestFields: TicketFieldObject[];
  serviceCatalogItem: ServiceCatalogItem;
  baseLocale: string;
  hasAtMentions: boolean;
  userRole: string;
  userId: number;
  brandId: number;
  defaultOrganizationId: string | null;
  handleChange: (
    field: TicketFieldObject,
    value: string | string[] | boolean | null
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  attachmentsOption: AttachmentsOption | undefined;
  attachmentsRequiredError: AttachmentsError;
  setAttachmentsRequiredError: (error: AttachmentsError) => void;
  isRequestFieldsLoading: boolean;
  isLoadingAttachmentsOption: boolean;
  assetTypeError: string | null;
  assetError: string | null;
  assetTypeHiddenValue: string;
  isAssetTypeHidden: boolean;
  assetTypeIds: string[];
  assetIds: string[];
}

export function ItemRequestForm({
  requestFields,
  serviceCatalogItem,
  baseLocale,
  hasAtMentions,
  userRole,
  userId,
  brandId,
  defaultOrganizationId,
  handleChange,
  onSubmit,
  attachmentsOption,
  attachmentsRequiredError,
  setAttachmentsRequiredError,
  isRequestFieldsLoading,
  isLoadingAttachmentsOption,
  assetTypeError,
  assetError,
  assetTypeHiddenValue,
  isAssetTypeHidden,
  assetTypeIds,
  assetIds,
}: ItemRequestFormProps) {
  const { t } = useTranslation();

  const [isUploadingAttachments, setIsUploadingAttachments] = useState(false);

  const buildLookupFieldOptions = async (
    records: CustomObjectRecord[],
    field: TicketFieldObject
  ): Promise<ITAMAssetOptionObject[]> => {
    if (!Array.isArray(records) || records.length === 0) return [];

    const options: ITAMAssetOptionObject[] = records.map((rec) => {
      const base = {
        name: rec.name,
        value: rec.id,
        serialNumber: rec.custom_object_fields["standard::serial_number"] as
          | string
          | undefined,
      };

      if (rec.custom_object_key === "standard::itam_asset") {
        const fields = (rec.custom_object_fields ?? {}) as {
          "standard::asset_type"?: string;
        };
        return {
          ...base,
          item_asset_type_id: fields["standard::asset_type"] ?? "",
        };
      }
      return { ...base, item_asset_type_id: "" };
    });

    if (isAssetTypeField(field)) {
      if (isAssetTypeHidden) return [];
      if (!assetTypeIds?.length) return [];
      return options.filter((o) => assetTypeIds.includes(o.value));
    }

    if (isAssetField(field)) {
      let list = options;
      if (assetIds?.length) {
        list = list.filter((o) =>
          assetIds.includes(o.item_asset_type_id ?? "")
        );
      }
      return list;
    }
    return options.map(({ name, value, serialNumber }) => ({
      name,
      value,
      serialNumber,
    }));
  };

  const renderLookupFieldOption = (option: ITAMAssetOptionObject) => {
    if (option.serialNumber) {
      return (
        <>
          {option.name}
          <Option.Meta>
            <Span hue="grey">
              {t(
                "service-catalog.item.serial-number-label",
                "SN: {{serialNumber}}",
                { serialNumber: option.serialNumber }
              )}
            </Span>
          </Option.Meta>
        </>
      );
    }
    return option.name;
  };

  const handleAttachmentsOnUpload = useCallback(
    (status: boolean) => {
      setAttachmentsRequiredError(null);
      setIsUploadingAttachments(status);
    },
    [setAttachmentsRequiredError, setIsUploadingAttachments]
  );

  const renderRequestFields = () => {
    if (isRequestFieldsLoading || isLoadingAttachmentsOption) {
      return null;
    }

    const attachmentsPosition =
      attachmentsOption?.custom_object_fields?.["standard::position_in_portal"];

    const attachmentsElement = attachmentsOption ? (
      <Attachments
        key="attachments"
        field={{
          name: AttachmentsInputName,
          label: attachmentsOption.name,
          description:
            attachmentsOption.custom_object_fields["standard::description"] ??
            "",
          error: attachmentsRequiredError,
          attachments: [],
          isRequired:
            attachmentsOption.custom_object_fields["standard::is_required"] ??
            false,
        }}
        baseLocale={baseLocale}
        onUploadingChange={handleAttachmentsOnUpload}
      />
    ) : null;

    const elements: React.ReactNode[] = [];

    requestFields.forEach((field, index) => {
      if (
        attachmentsElement &&
        typeof attachmentsPosition === "number" &&
        index === attachmentsPosition
      ) {
        elements.push(attachmentsElement);
      }

      if (isAssetTypeField(field) && isAssetTypeHidden) {
        elements.push(
          <Fragment key={field.id}>
            <input
              type="hidden"
              name={field.name}
              value={assetTypeHiddenValue}
            />
            <input type="hidden" name="isAssetTypeHidden" value="true" />
          </Fragment>
        );
        return;
      }

      const customField = {
        ...field,
        error: isAssetField(field)
          ? assetError || field.error
          : isAssetTypeField(field)
          ? assetTypeError || field.error
          : field.error,
      };

      elements.push(
        <RequestFormField
          key={field.id}
          field={customField}
          baseLocale={baseLocale}
          hasAtMentions={hasAtMentions}
          userRole={userRole}
          userId={userId}
          brandId={brandId}
          defaultOrganizationId={defaultOrganizationId}
          handleChange={handleChange}
          visibleFields={requestFields}
          buildLookupFieldOptions={buildLookupFieldOptions}
          renderLookupFieldOption={renderLookupFieldOption}
        />
      );
    });
    if (
      attachmentsElement &&
      typeof attachmentsPosition === "number" &&
      attachmentsPosition >= requestFields.length
    ) {
      elements.push(attachmentsElement);
    }

    return elements;
  };

  return (
    <Form onSubmit={onSubmit} noValidate>
      <LeftColumn>
        <CollapsibleDescription
          title={serviceCatalogItem.name}
          description={serviceCatalogItem.description}
          thumbnailUrl={serviceCatalogItem.thumbnail_url}
        />
        <FieldsContainer>{renderRequestFields()}</FieldsContainer>
      </LeftColumn>
      <RightColumn>
        <ButtonWrapper>
          <Button
            disabled={isUploadingAttachments}
            isPrimary
            size="large"
            isStretched
            type="submit"
          >
            {t("service-catalog.item.submit-button", "Submit request")}
          </Button>
        </ButtonWrapper>
      </RightColumn>
    </Form>
  );
}
