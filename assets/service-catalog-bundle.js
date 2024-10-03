import { r as reactExports, j as jsxRuntimeExports, aa as Row, ab as Col, ac as OrderedList, a6 as reactDomExports } from 'shared';

function ServiceCatalog() {
    const [serviceCatalogItems, setServiceCatalogItems] = reactExports.useState([]);
    const fetchServiceCatalogItems = reactExports.useCallback(async () => {
        try {
            const response = await fetch(`/api/v2/custom_objects/service_catalog_item/records`);
            if (response.ok) {
                const { custom_object_records } = await response.json();
                setServiceCatalogItems(custom_object_records);
                console.log(">>>>>>data", custom_object_records);
            }
        }
        catch (error) {
            console.error(error);
        }
    }, []);
    reactExports.useEffect(() => {
        fetchServiceCatalogItems();
    }, []);
    return (jsxRuntimeExports.jsx(Row, { children: jsxRuntimeExports.jsx(Col, { children: jsxRuntimeExports.jsx(OrderedList, { children: serviceCatalogItems?.length !== 0 &&
                    serviceCatalogItems.map((record) => (jsxRuntimeExports.jsx(OrderedList.Item, { children: record.name }, record.id))) }) }) }));
}

async function renderServiceCatalog(container) {
    reactDomExports.render(jsxRuntimeExports.jsx(ServiceCatalog, {}), container);
}

export { renderServiceCatalog };
