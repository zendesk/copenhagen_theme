import type { TicketFieldObject } from "../../../ticket-fields/data-types/TicketFieldObject";
import type { ServiceCatalogItem } from "../../data-types/ServiceCatalogItem";
import type { Attachment } from "../../../ticket-fields/data-types/AttachmentsField";

const getCurrentUser = async () => {
  try {
    const currentUserRequest = await fetch("/api/v2/users/me.json");
    if (!currentUserRequest.ok) {
      throw new Error("Error fetching current user data");
    }

    return await currentUserRequest.json();
  } catch (error) {
    throw new Error("Error fetching current user data");
  }
};

export async function submitServiceItemRequest(
  serviceCatalogItem: ServiceCatalogItem,
  requestFields: TicketFieldObject[],
  associatedLookupField: TicketFieldObject,
  attachments: Attachment[],
  helpCenterPath: string,
  categoryLookupField?: TicketFieldObject | null,
  categoryId?: string | null,
  requesterId?: number | null,
  onBehalfNoteHtml?: string | null
) {
  try {
    const currentUser = await getCurrentUser();
    const uploadTokens = attachments.map((a) => a.id);

    const customFields = requestFields.map((field) => {
      return {
        id: field.id,
        value: field.value,
      };
    });

    const lookupFields: Array<{ id: number; value: string | number }> = [
      { id: associatedLookupField.id, value: serviceCatalogItem.id },
    ];

    if (categoryLookupField && categoryId) {
      lookupFields.push({ id: categoryLookupField.id, value: categoryId });
    }

    const submitterId = currentUser.user.id;

    const isRequestingOnBehalf =
      requesterId != null && requesterId !== submitterId;

    const response = await fetch("/hc/api/v2/service_catalog/requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": currentUser.user.authenticity_token,
      },
      body: JSON.stringify({
        request: {
          item_id: serviceCatalogItem.id,
          subject: `${serviceCatalogItem.name}`,
          comment: {
            html_body: `<a href="${
              window.location.origin
            }${helpCenterPath}/services/${
              serviceCatalogItem.id
            }" style="text-decoration: underline" target="_blank" rel="noopener noreferrer">${
              serviceCatalogItem.name
            }</a>${onBehalfNoteHtml ?? ""}`,
            uploads: uploadTokens,
          },
          custom_fields: [...customFields, ...lookupFields],
          ...(isRequestingOnBehalf
            ? { requester_id: requesterId, collaborators: [submitterId] }
            : {}),
        },
      }),
    });
    return response;
  } catch (error) {
    console.error("Error submitting service request:", error);
    return;
  }
}
