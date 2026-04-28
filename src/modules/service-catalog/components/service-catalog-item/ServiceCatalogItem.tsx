import styled from "styled-components";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useItemFormFields } from "../../hooks/useItemFormFields";
import { ItemRequestForm } from "./ItemRequestForm";
import { CategorySelector } from "./CategorySelector";
import type { Organization } from "../../../ticket-fields/data-types/Organization";
import { useServiceCatalogItem } from "../../hooks/useServiceCatalogItem";
import { submitServiceItemRequest } from "./submitServiceItemRequest";
import type { ServiceRequestResponse } from "../../data-types/ServiceRequestResponse";
import { addFlashNotification, notify } from "../../../shared";
import { useTranslation } from "react-i18next";
import { Anchor } from "@zendeskgarden/react-buttons";
import type { TicketFieldObject } from "../../../ticket-fields/data-types/TicketFieldObject";
import {
  AttachmentsInputName,
  ASSET_TYPE_KEY,
  ASSET_KEY,
} from "../../constants";
import type { Attachment } from "../../../ticket-fields/data-types/AttachmentsField";
import { useAttachmentsOption } from "../../hooks/useAttachmentsOption";
import { useValidateServiceItemForm } from "../../hooks/useValidateServiceItemForm";
import type { AttachmentsError } from "../../data-types/Attachments";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledNotificationLink = styled(Anchor)`
  text-decoration: underline;
  display: block;
  margin-top: ${(props) => props.theme.space.xxs}px;
`;

const isAssetTypeField = (field: TicketFieldObject) =>
  field.relationship_target_type === ASSET_TYPE_KEY;

const isAssetField = (field: TicketFieldObject) =>
  field.relationship_target_type === ASSET_KEY;

export interface ServiceCatalogItemProps {
  serviceCatalogItemId: number;
  baseLocale: string;
  hasAtMentions: boolean;
  userRole: string;
  userId: number;
  brandId: number;
  organizations: Array<Organization>;
  helpCenterPath: string;
  userName: string;
}

function getCategoryIdFromUrl(): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get("category_id");
}

export function ServiceCatalogItem({
  serviceCatalogItemId,
  baseLocale,
  hasAtMentions,
  userRole,
  organizations,
  userId,
  brandId,
  userName,
  helpCenterPath,
}: ServiceCatalogItemProps) {
  const { serviceCatalogItem, errorFetchingItem } =
    useServiceCatalogItem(serviceCatalogItemId);
  const {
    requestFields,
    associatedLookupField,
    categoryLookupField,
    error,
    setRequestFields,
    handleChange,
    isRequestFieldsLoading,
    assetTypeHiddenValue,
    isAssetTypeHidden,
    assetTypeIds,
    assetIds,
  } = useItemFormFields(serviceCatalogItem, baseLocale);
  const { t } = useTranslation();

  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (!serviceCatalogItem?.categories?.length) return;

    const urlCategoryId = getCategoryIdFromUrl();
    const matchesUrl = serviceCatalogItem.categories.find(
      (c) => c.id === urlCategoryId
    );

    setSelectedCategoryId(
      matchesUrl ? matchesUrl.id : serviceCatalogItem.categories[0]?.id ?? null
    );
  }, [serviceCatalogItem]);

  const handleCategoryChange = useCallback((categoryId: string) => {
    setSelectedCategoryId(categoryId);
    const params = new URLSearchParams(window.location.search);
    params.set("category_id", categoryId);
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`
    );
  }, []);

  const attachmentsOptionId =
    serviceCatalogItem?.custom_object_fields?.["standard::attachment_option"];

  const requestOnBehalfEnabled = serviceCatalogItem?.allow_request_on_behalf;

  const {
    attachmentsOption,
    errorAttachmentsOption,
    isLoadingAttachmentsOption,
  } = useAttachmentsOption(attachmentsOptionId);

  const { validate } = useValidateServiceItemForm(attachmentsOption);

  const [attachmentsRequiredError, setAttachmentsRequiredError] =
    useState<AttachmentsError>(null);
  const [assetTypeError, setAssetTypeError] = useState<string | null>(null);
  const [assetError, setAssetError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingAttachments, setIsUploadingAttachments] = useState(false);

  useEffect(() => {
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        setIsSubmitting(false);
      }
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  const hasCategories = (serviceCatalogItem?.categories?.length ?? 0) > 0;

  const hasResolvedCategory = !hasCategories || !!selectedCategoryId;

  const isFormInitializing =
    !serviceCatalogItem ||
    isRequestFieldsLoading ||
    isLoadingAttachmentsOption ||
    !hasResolvedCategory;

  const canSubmit =
    !isFormInitializing &&
    !isSubmitting &&
    !isUploadingAttachments &&
    !!serviceCatalogItem &&
    !!associatedLookupField;

  const handleFieldChange = (
    field: TicketFieldObject,
    value: string | string[] | boolean | null
  ) => {
    if (isAssetTypeField(field) && value) {
      setAssetTypeError(null);
    } else if (isAssetField(field) && value) {
      setAssetError(null);
    }

    handleChange(field, value);
  };

  if (error) {
    throw error;
  }

  if (errorFetchingItem) {
    throw errorFetchingItem;
  }

  if (errorAttachmentsOption) {
    throw errorAttachmentsOption;
  }

  function parseAttachments(formData: FormData): Attachment[] {
    return formData
      .getAll(AttachmentsInputName)
      .filter((a): a is string => typeof a === "string")
      .map((a) => JSON.parse(a));
  }

  function validateForm(
    fields: TicketFieldObject[],
    attachments: Attachment[]
  ): boolean {
    const { hasError, errors } = validate(fields, attachments);

    setAttachmentsRequiredError(errors.attachments);
    setAssetTypeError(errors.assetType);
    setAssetError(errors.asset);

    return hasError;
  }

  function notifySubmitError(message?: React.ReactNode) {
    notify({
      type: "error",
      title: t(
        "service-catalog.item.service-request-error-title",
        "Service couldn't be submitted"
      ),
      message:
        message ??
        t(
          "service-catalog.item.service-request-error-message",
          "Give it a moment and try it again"
        ),
    });
  }

  async function handleValidationErrors(response: Response) {
    const errorData: ServiceRequestResponse = await response.json();
    const invalidFieldErrors = errorData?.details?.base ?? [];
    const missingErrorFields = invalidFieldErrors.filter(
      (errorField) =>
        !requestFields.some((field) => field.id === errorField.field_key)
    );

    if (missingErrorFields.length > 0) {
      notifySubmitError(
        <>
          {t(
            "service-catalog.item.service-request-refresh-message",
            "Refresh the page and try again in a few seconds."
          )}{" "}
          <StyledNotificationLink
            href={`${helpCenterPath}/services/${serviceCatalogItem!.id}`}
          >
            {t(
              "service-catalog.item.service-request-refresh-link-text",
              "Refresh the page"
            )}
          </StyledNotificationLink>
        </>
      );
    } else if (invalidFieldErrors.length > 0) {
      notifySubmitError();
    }

    const updatedFields = requestFields.map((field) => {
      const errorField = invalidFieldErrors.find(
        (errorField) => errorField.field_key === field.id
      );
      return { ...field, error: errorField?.description || null };
    });
    setRequestFields(updatedFields);
  }

  async function handleSubmitError(response: Response | undefined) {
    if (response?.status === 422) {
      try {
        await handleValidationErrors(response);
      } catch {
        notifySubmitError();
      }
    } else {
      notifySubmitError();
    }
  }

  const handleRequestSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!canSubmit) {
      notifySubmitError();
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);
    const isAssetTypeFieldHidden = formData.get("isAssetTypeHidden") === "true";
    const attachments = parseAttachments(formData);

    const requestFieldsWithFormData = requestFields.map((field) => {
      if (isAssetTypeField(field) && isAssetTypeFieldHidden) {
        return {
          ...field,
          value: formData.get(field.name),
        } as TicketFieldObject;
      }
      return field;
    });

    if (validateForm(requestFieldsWithFormData, attachments)) {
      return;
    }

    if (!serviceCatalogItem || !associatedLookupField) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await submitServiceItemRequest(
        serviceCatalogItem,
        requestFieldsWithFormData,
        associatedLookupField,
        baseLocale,
        attachments,
        helpCenterPath,
        categoryLookupField,
        selectedCategoryId
      );

      if (response?.ok) {
        addFlashNotification({
          type: "success",
          message: t(
            "service-catalog.item.service-request-submitted",
            "Service request submitted"
          ),
        });
        const data = await response.json();
        window.location.href = `${helpCenterPath}/requests/${data.request.id}`;
        return;
      }

      await handleSubmitError(response);
    } catch {
      // caught by handleSubmitError in most cases, this handles unexpected errors
    }

    setIsSubmitting(false);
  };

  const defaultOrganizationId =
    organizations.length > 0 && organizations[0]?.id
      ? organizations[0]?.id?.toString()
      : null;

  const [categorySelectorContainer, setCategorySelectorContainer] =
    useState<HTMLElement | null>(null);
  useEffect(() => {
    setCategorySelectorContainer(document.getElementById("category-selector"));
  }, []);

  return (
    <Container>
      {categorySelectorContainer &&
        serviceCatalogItem &&
        selectedCategoryId &&
        serviceCatalogItem.categories.length > 0 &&
        createPortal(
          <CategorySelector
            categories={serviceCatalogItem.categories}
            selectedCategoryId={selectedCategoryId}
            onCategoryChange={handleCategoryChange}
          />,
          categorySelectorContainer
        )}
      {serviceCatalogItem && (
        <ItemRequestForm
          requestFields={requestFields}
          isRequestFieldsLoading={isRequestFieldsLoading}
          isLoadingAttachmentsOption={isLoadingAttachmentsOption}
          serviceCatalogItem={serviceCatalogItem}
          baseLocale={baseLocale}
          hasAtMentions={hasAtMentions}
          userRole={userRole}
          userId={userId}
          requestOnBehalfEnabled={requestOnBehalfEnabled}
          userName={userName}
          brandId={brandId}
          defaultOrganizationId={defaultOrganizationId}
          handleChange={handleFieldChange}
          onSubmit={handleRequestSubmit}
          attachmentsOption={attachmentsOption}
          attachmentsRequiredError={attachmentsRequiredError}
          setAttachmentsRequiredError={setAttachmentsRequiredError}
          assetTypeError={assetTypeError}
          assetError={assetError}
          assetTypeHiddenValue={assetTypeHiddenValue}
          isAssetTypeHidden={isAssetTypeHidden}
          assetTypeIds={assetTypeIds}
          assetIds={assetIds}
          onAttachmentUploadingChange={setIsUploadingAttachments}
          isFormInitializing={isFormInitializing}
        />
      )}
    </Container>
  );
}
