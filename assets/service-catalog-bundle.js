import { j as jsxRuntimeExports, Z as Button, r as reactExports, a4 as reactDomExports, a5 as ThemeProviders, a6 as createTheme } from 'shared';

function ServiceCatalogItems({ items }) {
    const catalogToName = {
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

async function renderServiceCatalog(settings, container) {
    reactDomExports.render(jsxRuntimeExports.jsx(ThemeProviders, { theme: createTheme(settings), children: jsxRuntimeExports.jsx(ServiceCatalog, {}) }), container);
}
async function renderServiceCatalogTwo(settings, container) {
    reactDomExports.render(jsxRuntimeExports.jsx(ThemeProviders, { theme: createTheme(settings), children: jsxRuntimeExports.jsx(ServiceCatalogTwo, {}) }), container);
}

export { renderServiceCatalog, renderServiceCatalogTwo };
