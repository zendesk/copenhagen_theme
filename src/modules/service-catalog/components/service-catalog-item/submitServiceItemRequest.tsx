import type { TicketFieldObject } from "../../../ticket-fields/data-types/TicketFieldObject";
import type { ServiceCatalogItem } from "../../data-types/ServiceCatalogItem";
import type { Attachment } from "../../../ticket-fields/data-types/AttachmentsField";

interface OnBehalfNote {
  submitterLabel: string;
  requesterLabel: string;
}

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

const buildCommentHtml = (
  serviceCatalogItem: ServiceCatalogItem,
  helpCenterPath: string,
  onBehalfNote?: OnBehalfNote | null
) => {
  const link = document.createElement("a");
  link.setAttribute(
    "href",
    `${window.location.origin}${helpCenterPath}/services/${serviceCatalogItem.id}`
  );
  link.setAttribute("style", "text-decoration: underline");
  link.setAttribute("target", "_blank");
  link.setAttribute("rel", "noopener noreferrer");
  link.textContent = serviceCatalogItem.name;

  if (!onBehalfNote) {
    return link.outerHTML;
  }

  const submitter = document.createElement("p");
  submitter.setAttribute("style", "margin:0;padding:0");
  submitter.textContent = onBehalfNote.submitterLabel;

  const requester = document.createElement("p");
  requester.setAttribute("style", "margin:0;padding:0");
  requester.textContent = onBehalfNote.requesterLabel;

  return `${link.outerHTML}${submitter.outerHTML}${requester.outerHTML}`;
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
  onBehalfNote?: OnBehalfNote | null
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
            html_body: buildCommentHtml(
              serviceCatalogItem,
              helpCenterPath,
              onBehalfNote
            ),
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
