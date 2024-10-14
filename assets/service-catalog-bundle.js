import { s as styled, J as getColorV8, aa as SvgShapesFill, j as jsxRuntimeExports, ab as Col, r as reactExports, a as useTranslation, ac as Row, ad as CursorPagination, a6 as reactDomExports, a7 as ThemeProviders, a8 as createTheme } from 'shared';

const StyledItem = styled.div `
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  gap: ${(props) => props.theme.space.sm};
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: ${(props) => props.theme.borderRadii.md};
  cursor: pointer;
  padding: ${(props) => props.theme.space.md};
  word-break: break-word;
  border: ${(props) => props.theme.borders.sm}
    ${(props) => getColorV8("grey", 300, props.theme)};
  &:hover {
    border: ${(props) => props.theme.borders.sm};
    border-color: ${(props) => getColorV8("blue", 600, props.theme)} !important;
    background-color: ${(props) => getColorV8("white", 100, props.theme)} !important;
  }
`;
const ItemTitle = styled.div `
  text-align: left;
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: ${(props) => props.theme.fontWeights.semibold};
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* Limit to 2 lines */
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;
const ItemDescription = styled.p `
  font-size: ${(props) => props.theme.fontSizes.sm};
  text-align: left;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /* Limit to 3 lines */
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;
const StyledDiv = styled.div `
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${(props) => props.theme.space.base}
}
`;
const StyledSpan = styled.span `
  display: block;
  color: ${(props) => getColorV8("grey", 600, props.theme)};
`;
const StyledShapesIcon = styled(SvgShapesFill) `
  height: ${(props) => props.theme.iconSizes.md};
  width: ${(props) => props.theme.iconSizes.md};
`;
const ServiceCatalogListItem = ({ serviceItem, }) => {
    return (jsxRuntimeExports.jsxs(StyledItem, { children: [jsxRuntimeExports.jsx(StyledSpan, { children: jsxRuntimeExports.jsx(StyledShapesIcon, {}) }), jsxRuntimeExports.jsxs(StyledDiv, { children: [jsxRuntimeExports.jsx(ItemTitle, { children: serviceItem.name }), jsxRuntimeExports.jsx(ItemDescription, { children: serviceItem.description })] })] }));
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
