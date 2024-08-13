import { Button } from "@zendeskgarden/react-buttons";

export function ServiceCatalogItems({ items }: { items: any }) {
  const catalogToName: { [key: string]: string } = {
    administrative___business: "Administrative & Business",
    communication___collaboration: "Communication & Collaboration",
    desktop___mobile_computing: "Desktop & Mobile Computing",
    information_security: "Information Security",
    it_professional_services: "IT Professional Services",
    hardware___devices: "Hardware & Devices",
  };

  const getCurrentUserField = async () => {
    const currentUserRequest = await fetch("/api/v2/users/me.json");
    return await currentUserRequest.json();
  };

  const getLookupField = async (title: any) => {
    const ticketFields = await fetch(
      "/api/v2/ticket_fields.json?page[size]=100"
    );
    const ticketFieldsResponse = await ticketFields.json();

    return ticketFieldsResponse.ticket_fields.find(
      (field: any) => field.title === title
    );
  };

  const getServiceTicketForm = async (name: any) => {
    const ticketForm = await fetch("/api/v2/ticket_forms.json");
    const ticketFormResponse = await ticketForm.json();

    return ticketFormResponse.ticket_forms.find(
      (form: any) => form.name === name
    );
  };

  const handleNewRequest = async (item:any) => {
    const catalogName = catalogToName[item.custom_object_fields.catalog];

    const serviceCatalogForm = await getServiceTicketForm(catalogName);

    const lookupField = await getLookupField(catalogName);

    const description = "New Item Request";
    const subject = "Request for: " + item.name;

    const redirectUrl = `/hc/requests/new?ticket_form_id=${serviceCatalogForm.id}&tf_${lookupField.id}=${item.id}&tf_subject=${subject}&tf_description=${description}`;

    window.location.href = redirectUrl;
  };

  const handleRequest = async (item:any) => {
    const catalogName = catalogToName[item.custom_object_fields.catalog];

    const currentUser = await getCurrentUserField();

    const lookupField = await getLookupField(catalogName);

    const serviceCatalogForm = await getServiceTicketForm(catalogName);

    const response = await fetch("/api/v2/requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": currentUser.user.authenticity_token,
      },
      body: JSON.stringify({
        request: {
          subject: "Request for: " + item.name,
          comment: {
            body: "New Item Request",
          },
          ticket_form_id: serviceCatalogForm.id,
          custom_fields: [
            {
              id: lookupField.id,
              value: item.id,
            },
          ],
        },
      }),
    });
    const data = await response.json();
    const redirectUrl = "/hc/requests/" + data.request.id;
    window.location.href = redirectUrl;
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "24px" }}>
      {items.map((item: any) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ccc",
            padding: "16px",
            width: "250px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <img
            src={item.custom_object_fields.icon_image}
            alt={item.name}
            height="70px"
          />
          <h3 style={{ textAlign: "center", margin: 0 }}>{item.name}</h3>
          <div
            style={{
              display: "-webkit-box",
              "-webkit-box-orient": "vertical",
              "-webkit-line-clamp": "3",
              overflow: "hidden",
            }}
          >
            {item.custom_object_fields.description}
          </div>
          <Button onClick={() => handleRequest(item)} isPrimary>Request</Button>
          <Button onClick={() => handleNewRequest(item)} isPrimary>New Request</Button>
        </div>
      ))}
    </div>
  );
}
