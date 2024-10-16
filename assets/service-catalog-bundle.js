import { s as styled, J as getColorV8, j as jsxRuntimeExports, aa as SvgShapesFill, ab as Col, ac as Grid, r as reactExports, a as useTranslation, ad as Row, ae as CursorPagination, a6 as reactDomExports, a7 as ThemeProviders, a8 as createTheme } from 'shared';

const StyledItem = styled.a `
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: ${(props) => props.theme.borderRadii.md};
  padding: ${(props) => props.theme.space.md};
  border: ${(props) => props.theme.borders.sm}
    ${(props) => getColorV8("grey", 300, props.theme)};
  color: ${(props) => getColorV8("grey", 800, props.theme)};

  &:hover {
    text-decoration: none;
    border: ${(props) => props.theme.borders.sm};
    border-color: ${(props) => getColorV8("blue", 600, props.theme)};
  }
`;
const ItemTitle = styled.div `
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: ${(props) => props.theme.fontWeights.semibold};
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  word-break: break-word;
  margin-bottom: ${(props) => props.theme.space.sm};
`;
const ItemDescription = styled.p `
  font-size: ${(props) => props.theme.fontSizes.sm};
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  word-break: break-word;
`;
const TextContainer = styled.div `
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${(props) => props.theme.space.xxs};
`;
const IconContainer = styled.div `
  color: ${(props) => getColorV8("grey", 600, props.theme)};
  background-color: ${(props) => getColorV8("grey", 100, props.theme)};
  margin-bottom: ${(props) => props.theme.space.sm};
  width: ${(props) => props.theme.space.xl};
  height: ${(props) => props.theme.space.xl};
  text-align: center;
  align-content: center;
`;
const ServiceCatalogListItem = ({ serviceItem, }) => {
    return (jsxRuntimeExports.jsxs(StyledItem, { href: "#", children: [jsxRuntimeExports.jsx(IconContainer, { children: jsxRuntimeExports.jsx(SvgShapesFill, {}) }), jsxRuntimeExports.jsxs(TextContainer, { children: [jsxRuntimeExports.jsx(ItemTitle, { children: serviceItem.name }), jsxRuntimeExports.jsx(ItemDescription, { children: serviceItem.description })] })] }));
};

const StyledCol = styled(Col) `
  margin-bottom: ${(props) => props.theme.space.md};
`;
const StyledDiv = styled.div `
  padding-top: ${(props) => props.theme.space.sm};
`;
const StyledGrid = styled(Grid) `
  padding: 0;
`;
function ServiceCatalogList() {
    const [serviceCatalogItems, setServiceCatalogItems] = reactExports.useState([]);
    const [meta, setMeta] = reactExports.useState(null);
    const [currentCursor, setCurrentCursor] = reactExports.useState(null);
    const { t } = useTranslation();
    reactExports.useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(currentCursor
                    ? `/api/v2/custom_objects/service_catalog_item/records?page[size]=16&${currentCursor}`
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
        }
        fetchData();
    }, [currentCursor]);
    const handleNextClick = () => {
        if (meta && meta.after_cursor) {
            setCurrentCursor(`page[after]=${meta.after_cursor}`);
        }
    };
    const handlePreviousClick = () => {
        if (meta && meta.before_cursor) {
            setCurrentCursor(`page[before]=${meta?.before_cursor}`);
        }
    };
    return (jsxRuntimeExports.jsxs(StyledDiv, { children: [jsxRuntimeExports.jsx(StyledGrid, { children: jsxRuntimeExports.jsx(Row, { wrap: "wrap", children: serviceCatalogItems.length !== 0 &&
                        serviceCatalogItems.map((record) => (jsxRuntimeExports.jsx(StyledCol, { xs: 12, sm: 6, md: 4, lg: 3, children: jsxRuntimeExports.jsx(ServiceCatalogListItem, { serviceItem: record }, record.id) }, record.id))) }) }), jsxRuntimeExports.jsxs(CursorPagination, { children: [jsxRuntimeExports.jsx(CursorPagination.Previous, { onClick: handlePreviousClick, disabled: !currentCursor ||
                            (currentCursor?.startsWith("page[before]") && !meta?.has_more), children: t("service-catalog.pagination.previous", "Previous") }), jsxRuntimeExports.jsx(CursorPagination.Next, { onClick: handleNextClick, disabled: (currentCursor?.startsWith("page[after]") && !meta?.has_more) ||
                            (currentCursor == null && !meta?.has_more), children: t("service-catalog.pagination.next", "Next") })] })] }));
}

async function renderServiceCatalogList(container, settings) {
    reactDomExports.render(jsxRuntimeExports.jsx(ThemeProviders, { theme: createTheme(settings), children: jsxRuntimeExports.jsx(ServiceCatalogList, {}) }), container);
}

export { renderServiceCatalogList };
