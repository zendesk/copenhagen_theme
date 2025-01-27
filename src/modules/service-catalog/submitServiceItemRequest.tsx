import type { Field } from "../ticket-fields";
import type { ServiceCatalogItem } from "./data-types/ServiceCatalogItem";

export async function submitServiceItemRequest(
  serviceCatalogItem: ServiceCatalogItem,
  requestFields: Field[],
  associatedLookupField: Field,
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
    const response = await fetch("/api/v2/requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": currentUser.user.authenticity_token,
      },
      body: JSON.stringify({
        request: {
          subject: `Service request: ${serviceCatalogItem.name}`,
          comment: {
            body: `Hi, I would like to request ${
              serviceCatalogItem.name
            }. ${serviceCatalogItem.description.substring(0, 100)}`,
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
          locale: baseLocale,
        },
      }),
    });
    return response;
  } catch (error) {
    console.error("Error submitting service request:", error);
    return;
  }
}
