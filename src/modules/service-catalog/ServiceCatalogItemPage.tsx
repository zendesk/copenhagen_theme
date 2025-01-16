import styled from "styled-components";
import { useItemFormFields } from "./components/useItemFormFields";
import { ItemRequestForm } from "./components/service-catalog-item/ItemRequestForm";
import type { Organization } from "../ticket-fields";
import { useServiceCatalogItem } from "./useServiceCatalogItem";
import { submitServiceItemRequest } from "./submitServiceItemRequest";
import type { ServiceRequestResponse } from "./data-types/ServiceRequestResponse";
import { addFlashNotification } from "../shared";
import { useTranslation } from "react-i18next";
import { useNotify } from "../shared/notifications/useNotify";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export interface ServiceCatalogItemPageProps {
  serviceCatalogItemId: number;
  baseLocale: string;
  hasAtMentions: boolean;
  userRole: string;
  userId: number;
  brandId: number;
  organizations: Array<Organization>;
  wysiwyg: boolean;
}

export function ServiceCatalogItemPage({
  serviceCatalogItemId,
  baseLocale,
  hasAtMentions,
  userRole,
  organizations,
  userId,
  brandId,
}: ServiceCatalogItemPageProps) {
  const { serviceCatalogItem, errorFetchingItem } =
    useServiceCatalogItem(serviceCatalogItemId);
  const {
    requestFields,
    associatedLookupField,
    error,
    setRequestFields,
    handleChange,
  } = useItemFormFields(serviceCatalogItem, baseLocale);
  const { t } = useTranslation();
  const notify = useNotify();

  if (error) {
    throw error;
  }

  if (errorFetchingItem) {
    throw errorFetchingItem;
  }

  const handleRequestSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!serviceCatalogItem || !associatedLookupField) {
      return;
    }
    const response = await submitServiceItemRequest(
      serviceCatalogItem,
      requestFields,
      associatedLookupField,
      baseLocale
    );
    if (!response?.ok) {
      if (response?.status === 422) {
        const errorData: ServiceRequestResponse = await response.json();
        const invalidFieldErrors = errorData.details.base;
        const updatedFields = requestFields.map((field) => {
          const errorField = invalidFieldErrors.find(
            (errorField) => errorField.field_key === field.id
          );
          return errorField
            ? { ...field, error: errorField.description }
            : field;
        });
        setRequestFields(updatedFields);
      } else {
        notify({
          title: t(
            "service-catalog.item.service-request-error-title",
            "Service couldn't be submitted"
          ),
          message: t(
            "service-catalog.item.service-request-error-message",
            "Give it a moment and try it again"
          ),
          type: "error",
        });
      }
    } else if (response && response.ok) {
      addFlashNotification({
        type: "success",
        message: t(
          "service-catalog.item.service-request-submitted",
          "Service request submitted"
        ),
      });
      const data = await response?.json();
      const redirectUrl = "/hc/requests/" + data.request.id;
      window.location.href = redirectUrl;
    }
  };

  const defaultOrganizationId =
    organizations.length > 0 && organizations[0]?.id
      ? organizations[0]?.id?.toString()
      : null;

  return (
    <Container>
      {serviceCatalogItem && (
        <ItemRequestForm
          requestFields={requestFields}
          serviceCatalogItem={serviceCatalogItem}
          baseLocale={baseLocale}
          hasAtMentions={hasAtMentions}
          userRole={userRole}
          userId={userId}
          brandId={brandId}
          defaultOrganizationId={defaultOrganizationId}
          handleChange={handleChange}
          onSubmit={handleRequestSubmit}
        />
      )}
    </Container>
  );
}
