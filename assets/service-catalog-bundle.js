import { j as jsxRuntimeExports, Z as Button, r as reactExports, s as styled, W as Paragraph, d as Field, e as Label, h as Combobox, O as Option, a4 as reactDomExports, a5 as ThemeProviders, a6 as createTheme } from 'shared';

function ServiceCatalogItems({ items }) {
    const catalogToName = {
        administrative___business: "Administrative & Business",
        communication___collaboration: "Communication & Collaboration",
        desktop___mobile_computing: "Desktop & Mobile Computing",
        information_security: "Information Security",
        it_professional_services: "IT Professional Services",
        hardware___devices: "Hardware & Devices",
    };
    const getLookupField = async (title) => {
        const ticketFields = await fetch("/api/v2/ticket_fields.json?page[size]=100");
        const ticketFieldsResponse = await ticketFields.json();
        return ticketFieldsResponse.ticket_fields.find((field) => field.title === title);
    };
    const getServiceTicketForm = async (name) => {
        const ticketForm = await fetch("/api/v2/ticket_forms.json");
        const ticketFormResponse = await ticketForm.json();
        return ticketFormResponse.ticket_forms.find((form) => form.name === name);
    };
    const handleNewRequest = async (item) => {
        const catalogName = catalogToName[item.custom_object_fields.catalog];
        const serviceCatalogForm = await getServiceTicketForm(catalogName);
        const lookupField = await getLookupField(catalogName);
        const description = "New Item Request";
        const subject = "Request for: " + item.name;
        const redirectUrl = `/hc/requests/new?ticket_form_id=${serviceCatalogForm.id}&tf_${lookupField.id}=${item.id}&tf_subject=${subject}&tf_description=${description}`;
        window.location.href = redirectUrl;
    };
    const handleRequest = async (item) => {
        const itemId = item.id;
        const itemName = item.name;
        const description = item.custom_object_fields.description;
        const iconImage = item.custom_object_fields.icon_image;
        const catalog = item.custom_object_fields.catalog;
        const additionalOptions = item.custom_object_fields.additional_options;
        const additionalObjects = item.custom_object_fields.additional_objects;
        let redirectUrl = `/hc/p/service_catalog_item_form?id=${itemId}&item_name=${itemName}&description=${description}&icon=${iconImage}&catalog=${catalog}`;
        if (additionalOptions !== null) {
            redirectUrl += `&additional_options=${additionalOptions}`;
        }
        if (additionalObjects !== null) {
            redirectUrl += `&additional_objects=${additionalObjects}`;
        }
        window.location.href = redirectUrl;
    };
    return (jsxRuntimeExports.jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: "24px" }, children: items.map((item) => (jsxRuntimeExports.jsxs("div", { style: {
                border: "1px solid #ccc",
                padding: "16px",
                width: "250px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
            }, children: [jsxRuntimeExports.jsx("img", { src: item.custom_object_fields.icon_image, alt: item.name, height: "70px" }), jsxRuntimeExports.jsx("h3", { style: { textAlign: "center", margin: 0 }, children: item.name }), jsxRuntimeExports.jsx("div", { style: {
                        display: "-webkit-box",
                        "-webkit-box-orient": "vertical",
                        "-webkit-line-clamp": "3",
                        overflow: "hidden",
                    }, children: item.custom_object_fields.description }), jsxRuntimeExports.jsx(Button, { onClick: () => handleRequest(item), isPrimary: true, children: "Request" }), jsxRuntimeExports.jsx(Button, { onClick: () => handleNewRequest(item), isPrimary: true, children: "New Request" })] }, item.id))) }));
}

function ServiceCatalog() {
    const [items, setItems] = reactExports.useState([]);
    reactExports.useEffect(() => {
        async function fetchItems() {
            const response = await fetch("/api/v2/custom_objects/service_catalog/records");
            const data = await response.json();
            setItems(data.custom_object_records);
        }
        fetchItems();
    }, []);
    return (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h1", { children: "Service Catalog" }), jsxRuntimeExports.jsx("div", { children: jsxRuntimeExports.jsx(ServiceCatalogItems, { items: items }) })] }));
}

const object_keys = [
    "administrative___business",
    "communication___collaboration",
    "desktop___mobile_computing",
    "hardware___devices",
    "information_security",
    "it_professional_services",
];
function ServiceCatalogTwo() {
    const [items, setItems] = reactExports.useState([]);
    reactExports.useEffect(() => {
        async function fetchItems() {
            const apis = object_keys.map((key) => fetch(`/api/v2/custom_objects/${key}/records`));
            const responses = await Promise.all(apis);
            const data = await Promise.all(responses.map((response) => response.json()));
            const records = [];
            for (let i = 0; i < responses.length; i++) {
                records.push(data[i].custom_object_records);
            }
            setItems(records.flat());
        }
        fetchItems();
    }, []);
    return (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h1", { children: "Service Catalog" }), jsxRuntimeExports.jsx("div", { children: jsxRuntimeExports.jsx(ServiceCatalogItems, { items: items }) })] }));
}

function ServiceCatalogItem({ ticketFields, detailedCustomObjects, serviceCatalogItem, }) {
    const [selectedValue, setSelectedValue] = reactExports.useState(null);
    const objectToName = {
        macbook_pro___16_inch_option: "MacBook Pro - 16-inch Option",
    };
    const handleOptionsChange = (selection) => {
        if (selection.type === "option:click") {
            setSelectedValue(selection.selectionValue);
        }
    };
    const StyledParagraph = styled(Paragraph) `
    margin: ${(props) => props.theme.space.md} 0;
  `;
    // const formatOptionsField = (optionsField: any) => {
    //   const formattedOptionValues = optionsField.custom_field_options.map(
    //     (option: any) => ({
    //       name: option.name,
    //       value: option.value,
    //     })
    //   );
    //   const defaultValue = optionsField.custom_field_options.find(
    //     (option: any) => option.default
    //   );
    //   if (selectedValue === null) {
    //     setSelectedValue(defaultValue.value);
    //   }
    //   return {
    //     description: optionsField.agent_description,
    //     id: optionsField.id,
    //     label: optionsField.raw_title_in_portal,
    //     name: `request[custom_fields][${optionsField.id}]`,
    //     options: formattedOptionValues,
    //     type: optionsField.type,
    //     error: null,
    //     value: selectedValue,
    //     required: optionsField.required,
    //   };
    // };
    const formatObjectsField = (objectsFields) => {
        const values = objectsFields.map((object) => object.options);
        const defaultValue = values[0];
        if (selectedValue === null) {
            setSelectedValue(defaultValue);
        }
        return values;
    };
    const getCurrentUserField = async () => {
        const currentUserRequest = await fetch("/api/v2/users/me.json");
        return await currentUserRequest.json();
    };
    const getLookupField = async (title) => {
        const ticketFields = await fetch("/api/v2/ticket_fields.json?page[size]=100");
        const ticketFieldsResponse = await ticketFields.json();
        return ticketFieldsResponse.ticket_fields.find((field) => field.title === title);
    };
    const getServiceTicketForm = async (name) => {
        const ticketForm = await fetch("/api/v2/ticket_forms.json");
        const ticketFormResponse = await ticketForm.json();
        return ticketFormResponse.ticket_forms.find((form) => form.name === name);
    };
    const catalogToName = {
        administrative___business: "Administrative & Business",
        communication___collaboration: "Communication & Collaboration",
        desktop___mobile_computing: "Desktop & Mobile Computing",
        information_security: "Information Security",
        it_professional_services: "IT Professional Services",
        hardware___devices: "Hardware & Devices",
    };
    const handleRequest = async (item, catalogName) => {
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
    // const handleAdditionalRequest = async (
    //   item: any,
    //   catalogLookup: any,
    //   optionsLookup: any
    // ) => {
    //   const currentUser = await getCurrentUserField();
    //   const serviceCatalogForm = await getServiceTicketForm(
    //     item.additionalOptions
    //   );
    //   const response = await fetch("/api/v2/requests", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "X-CSRF-Token": currentUser.user.authenticity_token,
    //     },
    //     body: JSON.stringify({
    //       request: {
    //         subject: "Request for: " + item.name,
    //         comment: {
    //           body: "New Item Request",
    //         },
    //         ticket_form_id: serviceCatalogForm.id,
    //         custom_fields: [
    //           {
    //             id: catalogLookup.id,
    //             value: item.id,
    //           },
    //           {
    //             id: optionsLookup.id,
    //             value: selectedValue,
    //           },
    //         ],
    //       },
    //     }),
    //   });
    //   const data = await response.json();
    //   const redirectUrl = "/hc/requests/" + data.request.id;
    //   window.location.href = redirectUrl;
    // };
    const handleObjectRequest = async (items, catalogItem, formField) => {
        const currentUser = await getCurrentUserField();
        const selectedObject = items.find((object) => {
            return object.options === selectedValue;
        });
        console.log(selectedObject);
        const mappedObjectName = objectToName[catalogItem.additionalObjects];
        const serviceCatalogForm = await getServiceTicketForm(mappedObjectName);
        const response = await fetch("/api/v2/requests", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": currentUser.user.authenticity_token,
            },
            body: JSON.stringify({
                request: {
                    subject: "Request for: " + selectedObject.name,
                    comment: {
                        body: "New Item Request",
                    },
                    ticket_form_id: serviceCatalogForm.id,
                    custom_fields: [
                        {
                            id: formField.id,
                            value: selectedObject.id,
                        },
                    ],
                },
            }),
        });
        const data = await response.json();
        const redirectUrl = "/hc/requests/" + data.request.id;
        window.location.href = redirectUrl;
    };
    const renderRequest = (serviceCatalogItem, catalogName) => {
        return (jsxRuntimeExports.jsx("div", { children: jsxRuntimeExports.jsx(Button, { onClick: () => handleRequest(serviceCatalogItem, catalogName), isPrimary: true, children: "Request" }) }));
    };
    const renderRequestWithObjects = (serviceCatalogObjects, serviceCatalogItem) => {
        const values = formatObjectsField(serviceCatalogObjects);
        const mappedObjectName = objectToName[serviceCatalogItem.additionalObjects];
        const formField = ticketFields.find((field) => field.title === mappedObjectName);
        return (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsxs(Field, { children: [jsxRuntimeExports.jsx(Label, { children: "Select an option" }), jsxRuntimeExports.jsx(Combobox, { isAutocomplete: true, onChange: handleOptionsChange, selectionValue: selectedValue, children: values.map((value) => (jsxRuntimeExports.jsx(Option, { value: value, label: value }, value))) })] }), jsxRuntimeExports.jsx(Button, { onClick: () => handleObjectRequest(serviceCatalogObjects, serviceCatalogItem, formField), isPrimary: true, children: "Request" })] }));
    };
    // const renderRequestWithOptions = (serviceCatalogItem: any, itemAdditionalOptions: any) => {
    //   const [catalogLookup, optionsLookup] = ticketFields.filter(
    //     (field: any) =>
    //       field.title === catalogName || field.title === itemAdditionalOptions
    //   );
    //   const formattedOptionsField = formatOptionsField(optionsLookup);
    //   return (
    //     <div>
    //       <Tagger
    //         key={formattedOptionsField.name}
    //         field={formattedOptionsField}
    //         onChange={(value: any) => handleOptionsChange(value)}
    //       />
    //       <Button
    //         onClick={() =>
    //           handleAdditionalRequest(
    //             serviceCatalogItem,
    //             catalogLookup,
    //             optionsLookup
    //           )
    //         }
    //         isPrimary
    //       >
    //         Request
    //       </Button>
    //     </div>
    //   )
    // };
    const catalogName = catalogToName[serviceCatalogItem.catalog];
    // const itemAdditionalOptions = serviceCatalogItem.additionalOptions;
    return (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h1", { children: serviceCatalogItem.name }), jsxRuntimeExports.jsx(StyledParagraph, { children: serviceCatalogItem.description }), jsxRuntimeExports.jsx("img", { src: serviceCatalogItem.iconImage, alt: serviceCatalogItem.name, height: "auto", width: "300px" }), serviceCatalogItem.additionalObjects
                ? renderRequestWithObjects(detailedCustomObjects, serviceCatalogItem)
                : renderRequest(serviceCatalogItem, catalogName)] }));
}

function parseAdditionalObjects(additionalObjects) {
    return additionalObjects.map((additionalObject) => {
        return {
            id: additionalObject.id,
            name: additionalObject.name,
            description: additionalObject.custom_object_fields.description,
            iconImage: additionalObject.custom_object_fields.icon_image,
            options: additionalObject.custom_object_fields.options,
        };
    });
}
async function renderServiceCatalog(settings, container) {
    reactDomExports.render(jsxRuntimeExports.jsx(ThemeProviders, { theme: createTheme(settings), children: jsxRuntimeExports.jsx(ServiceCatalog, {}) }), container);
}
async function renderServiceCatalogTwo(settings, container) {
    reactDomExports.render(jsxRuntimeExports.jsx(ThemeProviders, { theme: createTheme(settings), children: jsxRuntimeExports.jsx(ServiceCatalogTwo, {}) }), container);
}
async function renderServiceCatalogItem(settings, container, props) {
    const { serviceCatalogItem: { additionalObjects }, } = props;
    let parsedAdditionalObjects = null;
    if (additionalObjects) {
        const additionalObjectsResponse = await fetch(`/api/v2/custom_objects/${additionalObjects}/records`);
        const additionalObjectsData = await additionalObjectsResponse.json();
        parsedAdditionalObjects = parseAdditionalObjects(additionalObjectsData.custom_object_records);
    }
    const ticketFields = await fetch("/api/v2/ticket_fields.json?page[size]=100");
    const ticketFieldsResponse = await ticketFields.json();
    props.ticketFields = ticketFieldsResponse.ticket_fields;
    props.detailedCustomObjects = parsedAdditionalObjects;
    reactDomExports.render(jsxRuntimeExports.jsx(ThemeProviders, { theme: createTheme(settings), children: jsxRuntimeExports.jsx(ServiceCatalogItem, { ...props }) }), container);
}

export { renderServiceCatalog, renderServiceCatalogItem, renderServiceCatalogTwo };
