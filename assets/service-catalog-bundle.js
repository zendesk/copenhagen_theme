import { s as styled, aa as Tiles, J as getColorV8, j as jsxRuntimeExports, ab as SvgShapesFill, ac as Col, r as reactExports, a as useTranslation, ad as Row, ae as CursorPagination, a6 as reactDomExports, a7 as ThemeProviders, a8 as createTheme } from 'shared';

const StyledTiles = styled(Tiles.Tile) `
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  max-height: 164px;
  height: 164px;
  overflow: hidden;

  &:hover {
    border: 1px solid;
    border-color: ${(props) => getColorV8("blue", 600, props.theme)} !important;
    background-color: ${(props) => getColorV8("white", 100, props.theme)} !important;
  }
`;
const StyledTilesDescription = styled(Tiles.Description) `
  text-align: left;
  display: -webkit-box; /* Enable flexbox layout */
  -webkit-box-orient: vertical; /* Set orientation to vertical */
  -webkit-line-clamp: 2; /* Limit to 2 lines */
  overflow: hidden; /* Hide overflow text */
  text-overflow: ellipsis; /* Add ellipsis for overflow text */
  width: 100%; /* Use full width of the parent */
`;
const StyledDiv = styled.div `
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
}
`;
const ServiceCatalogListItem = ({ serviceItem, }) => {
    return (jsxRuntimeExports.jsx(Tiles, { name: "service-catalog", children: jsxRuntimeExports.jsxs(StyledTiles, { value: serviceItem.id, onClick: (e) => e.preventDefault(), children: [jsxRuntimeExports.jsx(Tiles.Icon, { children: jsxRuntimeExports.jsx(SvgShapesFill, {}) }), jsxRuntimeExports.jsxs(StyledDiv, { children: [jsxRuntimeExports.jsx(Tiles.Label, { children: serviceItem.name }), jsxRuntimeExports.jsx(StyledTilesDescription, { children: serviceItem.description })] })] }) }));
};

const StyledCol = styled(Col) `
  margin-top: ${(props) => props.theme.space.sm};
  flex: 0 0 25%; /* Set width to 25% for 4 columns */
  max-width: 25%; /* Set max-width to 25% for 4 columns */
  padding: 0 24px 24px 0;
`;
function ServiceCatalog() {
    const [serviceCatalogItems, setServiceCatalogItems] = reactExports.useState([]);
    const [meta, setMeta] = reactExports.useState(null);
    const [currentCursor, setCurrentCursor] = reactExports.useState(null);
    const [previousCursors, setPreviousCursors] = reactExports.useState([]);
    const { t } = useTranslation();
    const fetchServiceCatalogItems = reactExports.useCallback(async (cursorParam) => {
        try {
            const response = await fetch(cursorParam
                ? `/api/v2/custom_objects/service_catalog_item/records?page[size]=16&page[after]=${cursorParam}`
                : `/api/v2/custom_objects/service_catalog_item/records?page[size]=16`);
            const data = await response.json();
            if (response.ok) {
                const records = data.custom_object_records.map(({ id, name, custom_object_fields, }) => ({ id, name, description: custom_object_fields.description }));
                setMeta(data.meta);
                setServiceCatalogItems(records);
            }
        }
        catch (error) {
            console.error("Error fetching service catalog items:", error);
        }
    }, []);
    const onFirst = () => {
        setCurrentCursor(null);
        setPreviousCursors([]);
    };
    const onLast = () => {
        if (meta && meta.after_cursor) {
            setPreviousCursors((prev) => [...prev, currentCursor || ""]);
            setCurrentCursor(meta.after_cursor);
        }
    };
    const onNext = () => {
        if (meta && meta.after_cursor) {
            setPreviousCursors((prev) => [...prev, currentCursor || ""]);
            setCurrentCursor(meta.after_cursor);
        }
    };
    const onPrevious = () => {
        if (previousCursors.length > 0) {
            const newPreviousCursors = [...previousCursors];
            const previousCursor = newPreviousCursors.pop();
            setPreviousCursors(newPreviousCursors);
            setCurrentCursor(previousCursor || null);
        }
    };
    reactExports.useEffect(() => {
        fetchServiceCatalogItems(currentCursor);
    }, [currentCursor, fetchServiceCatalogItems]);
    return (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx(Row, { children: serviceCatalogItems.length !== 0 &&
                    serviceCatalogItems.map((record) => (jsxRuntimeExports.jsx(StyledCol, { xs: 6, sm: 4, md: 3, children: jsxRuntimeExports.jsx(ServiceCatalogListItem, { serviceItem: record }, record.id) }, record.id))) }), jsxRuntimeExports.jsxs(CursorPagination, { children: [jsxRuntimeExports.jsx(CursorPagination.First, { onClick: onFirst, disabled: previousCursors.length === 0, children: t("service-catalog.pagination.first", "First") }), jsxRuntimeExports.jsx(CursorPagination.Previous, { onClick: onPrevious, disabled: previousCursors.length === 0, children: t("service-catalog.pagination.previous", "Previous") }), jsxRuntimeExports.jsx(CursorPagination.Next, { onClick: onNext, disabled: !meta || !meta.after_cursor || !meta.has_more, children: t("service-catalog.pagination.next", "Next") }), jsxRuntimeExports.jsx(CursorPagination.Last, { onClick: onLast, disabled: !meta || !meta.has_more, children: t("service-catalog.pagination.last", "Last") })] })] }));
}

async function renderServiceCatalog(container, settings) {
    reactDomExports.render(jsxRuntimeExports.jsx(ThemeProviders, { theme: createTheme(settings), children: jsxRuntimeExports.jsx(ServiceCatalog, {}) }), container);
}

export { renderServiceCatalog };
