import styled from "styled-components";
import { useItemFormFields } from "../../hooks/useItemFormFields";
import { ItemRequestForm } from "./ItemRequestForm";
import type { Organization } from "../../../ticket-fields/data-types/Organization";
import { useServiceCatalogItem } from "../../hooks/useServiceCatalogItem";
import { submitServiceItemRequest } from "./submitServiceItemRequest";
import type { ServiceRequestResponse } from "../../data-types/ServiceRequestResponse";
import { addFlashNotification } from "../../../shared";
import { useTranslation } from "react-i18next";
import { useNotify } from "../../../shared/notifications/useNotify";
import { Anchor } from "@zendeskgarden/react-buttons";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledNotificationLink = styled(Anchor)`
  text-decoration: underline;
  display: block;
  margin-top: ${(props) => props.theme.space.xxs}px;
`;

export interface ServiceCatalogItemProps {
  serviceCatalogItemId: number;
  baseLocale: string;
  hasAtMentions: boolean;
  userRole: string;
  userId: number;
  brandId: number;
  organizations: Array<Organization>;
  helpCenterPath: string;
}

export function ServiceCatalogItem({
  serviceCatalogItemId,
  baseLocale,
  hasAtMentions,
  userRole,
  organizations,
  userId,
  brandId,
  helpCenterPath,
}: ServiceCatalogItemProps) {
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
        const missingErrorFields = invalidFieldErrors.filter(
          (errorField) =>
            !requestFields.some((field) => field.id === errorField.field_key)
        );

        if (missingErrorFields.length > 0) {
          notify({
            type: "error",
            title: t(
              "service-catalog.item.service-request-error-title",
              "Service couldn't be submitted"
            ),
            message: (
              <>
                {t(
                  "service-catalog.item.service-request-refresh-message",
                  "Refresh the page and try again in a few seconds."
                )}{" "}
                <StyledNotificationLink
                  href={`${helpCenterPath}/services/${serviceCatalogItem.id}`}
                >
                  {t(
                    "service-catalog.item.service-request-refresh-link-text",
                    "Refresh the page"
                  )}
                </StyledNotificationLink>
              </>
            ),
          });
        }

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
      const redirectUrl = `${helpCenterPath}/requests/${data.request.id}`;
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
