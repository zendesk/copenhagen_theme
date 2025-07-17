import type { TicketFieldObject } from "../../../ticket-fields/data-types/TicketFieldObject";
import type { ServiceCatalogItem } from "../../data-types/ServiceCatalogItem";

export async function submitServiceItemRequest(
  serviceCatalogItem: ServiceCatalogItem,
  requestFields: TicketFieldObject[],
  associatedLookupField: TicketFieldObject,
  baseLocale: string
) {
  try {
    const currentUserRequest = await fetch("/api/v2/users/me.json");
    if (!currentUserRequest.ok) {
      throw new Error("Error fetching current user data");
    }
    const currentUser = await currentUserRequest.json();

    const customFields = requestFields.map((field) => {
      return {
        id: field.id,
        value: field.value,
      };
    });
    const response = await fetch(`/api/v2/requests?locale=${baseLocale}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": currentUser.user.authenticity_token,
      },
      body: JSON.stringify({
        request: {
          subject: `${serviceCatalogItem.name}`,
          comment: {
            html_body: `<a href="/hc/en-us/services/${serviceCatalogItem.id}" style="text-decoration: underline" target="_blank" rel="noopener noreferrer">${serviceCatalogItem.name}</a>`,
          },
          ticket_form_id: serviceCatalogItem.form_id,
          custom_fields: [
            ...customFields,
            { id: associatedLookupField.id, value: serviceCatalogItem.id },
          ],
          via: {
            channel: "web form",
            source: 50,
          },
        },
      }),
    });
    return response;
  } catch (error) {
    console.error("Error submitting service request:", error);
    return;
  }
}
