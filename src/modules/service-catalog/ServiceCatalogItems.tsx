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
    const itemId = item.id;
    const itemName = item.name;
    const description = item.custom_object_fields.description;
    const iconImage = item.custom_object_fields.icon_image;
    const catalog = item.custom_object_fields.catalog;
    const additionalOptions = item.custom_object_fields.additional_options;

    let redirectUrl = `/hc/p/service_catalog_item_form?id=${itemId}&item_name=${itemName}&description=${description}&icon=${iconImage}&catalog=${catalog}`;

    if (additionalOptions !== null) {
      redirectUrl += `&additional_options=${additionalOptions}`;
    }

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
