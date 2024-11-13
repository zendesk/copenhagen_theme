import { s as styled, K as getColorV8, j as jsxRuntimeExports, aa as SvgShapesFill, ab as Grid, ac as Col, ad as Row, ae as Skeleton, af as MD, ag as SM, u as useTranslation, ah as LG, A as Anchor, a0 as Button, r as reactExports, ai as CursorPagination, a6 as reactDomExports, a7 as ThemeProviders, a8 as createTheme, aj as XXXL, ak as SvgChevronUpFill, al as SvgChevronDownFill } from 'shared';
import { g as getCustomObjectKey, a as TicketField } from 'ticket-fields';

const ItemContainer = styled.a `
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

  &:visited {
    text-decoration: none;
    color: ${(props) => getColorV8("grey", 800, props.theme)};
  }
`;
const ItemTitle$1 = styled.div `
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: ${(props) => props.theme.fontWeights.semibold};
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  word-break: break-word;
`;
const ItemDescription = styled.div `
  font-size: ${(props) => props.theme.fontSizes.sm};
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  word-break: break-word;
`;
const TextContainer$1 = styled.div `
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
    return (jsxRuntimeExports.jsxs(ItemContainer, { href: "/hc/en-us/p/service_catalog_item", children: [jsxRuntimeExports.jsx(IconContainer, { children: jsxRuntimeExports.jsx(SvgShapesFill, {}) }), jsxRuntimeExports.jsxs(TextContainer$1, { children: [jsxRuntimeExports.jsx(ItemTitle$1, { children: serviceItem.name }), jsxRuntimeExports.jsx(ItemDescription, { children: serviceItem.description })] })] }));
};

const SkeletonItem = styled.div `
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space.sm};
  height: 100%;
  border-radius: ${(props) => props.theme.borderRadii.md};
  padding: ${(props) => props.theme.space.md};
  border: ${(props) => props.theme.borders.sm}
    ${(props) => getColorV8("grey", 300, props.theme)};
`;
const TextSkeleton = styled.div `
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space.xxs};
  margin-bottom: ${(props) => props.theme.space.md};
`;
const StyledGrid$1 = styled(Grid) `
  padding: 0;
`;
const StyledCol$1 = styled(Col) `
  @media (min-width: 0px) {
    margin-bottom: ${(props) => props.theme.space.md};
  }
`;
const SkeletonCol = () => (jsxRuntimeExports.jsx(StyledCol$1, { xs: 12, sm: 6, md: 4, lg: 3, children: jsxRuntimeExports.jsxs(SkeletonItem, { children: [jsxRuntimeExports.jsx(Skeleton, { width: "40px", height: "40px" }), jsxRuntimeExports.jsxs(TextSkeleton, { children: [jsxRuntimeExports.jsx(MD, { children: jsxRuntimeExports.jsx(Skeleton, { width: "75%" }) }), jsxRuntimeExports.jsx(SM, { children: jsxRuntimeExports.jsx(Skeleton, { width: "90%" }) }), jsxRuntimeExports.jsx(SM, { children: jsxRuntimeExports.jsx(Skeleton, { width: "50%" }) })] })] }) }));
const LoadingState = () => {
    return (jsxRuntimeExports.jsx(StyledGrid$1, { children: jsxRuntimeExports.jsxs(Row, { wrap: "wrap", children: [jsxRuntimeExports.jsx(SkeletonCol, {}), jsxRuntimeExports.jsx(SkeletonCol, {}), jsxRuntimeExports.jsx(SkeletonCol, {})] }) }));
};

const Container$2 = styled.div `
  padding: ${(p) => p.theme.space.xl} 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${(props) => props.theme.space.md};
`;
const TextContainer = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${(props) => props.theme.space.xxs};
`;
const EmptyState = ({ helpCenterPath }) => {
    const handleRedirect = () => {
        window.location.href = helpCenterPath;
    };
    const { t } = useTranslation();
    return (jsxRuntimeExports.jsxs(Container$2, { children: [jsxRuntimeExports.jsxs(TextContainer, { children: [jsxRuntimeExports.jsx(LG, { children: t("service-catalog.empty-state.no-services", "No services in sight") }), jsxRuntimeExports.jsx(MD, { children: t("service-catalog.empty-state.description", "Once services are added to catalog, you’ll find them here.") }), jsxRuntimeExports.jsx(Anchor, { isExternal: true, href: "#", target: "_blank", children: t("service-catalog.empty-state.support-article-link", "Learn about the service catalog") })] }), jsxRuntimeExports.jsx(Button, { isPrimary: true, onClick: handleRedirect, children: t("service-catalog.empty-state.go-to-homepage", "Go to the homepage") })] }));
};

const StyledCol = styled(Col) `
  margin-bottom: ${(props) => props.theme.space.md};
`;
const Container$1 = styled.div `
  padding-top: ${(props) => props.theme.space.sm};
`;
const StyledGrid = styled(Grid) `
  padding: 0;
`;
function ServiceCatalogList({ helpCenterPath, }) {
    const [serviceCatalogItems, setServiceCatalogItems] = reactExports.useState([]);
    const [meta, setMeta] = reactExports.useState(null);
    const [currentCursor, setCurrentCursor] = reactExports.useState(null);
    const [isLoading, setIsLoading] = reactExports.useState(false);
    const { t } = useTranslation();
    reactExports.useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            try {
                const response = await fetch(currentCursor
                    ? `/api/v2/custom_objects/service_catalog_item/records?page[size]=16&${currentCursor}`
                    : `/api/v2/custom_objects/service_catalog_item/records?page[size]=16`);
                const data = await response.json();
                if (response.ok) {
                    const records = data.custom_object_records.map(({ id, name, custom_object_fields, custom_object_key, }) => ({
                        id,
                        name,
                        description: custom_object_fields.description,
                        form_id: custom_object_fields.form_id,
                        custom_object_key,
                    }));
                    setMeta(data.meta);
                    setServiceCatalogItems(records);
                    setIsLoading(false);
                }
            }
            catch (error) {
                setIsLoading(false);
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
    return (jsxRuntimeExports.jsx(Container$1, { children: isLoading ? (jsxRuntimeExports.jsx(LoadingState, {})) : (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(StyledGrid, { children: jsxRuntimeExports.jsx(Row, { wrap: "wrap", children: serviceCatalogItems.length !== 0 &&
                            serviceCatalogItems.map((record) => (jsxRuntimeExports.jsx(StyledCol, { xs: 12, sm: 6, md: 4, lg: 3, children: jsxRuntimeExports.jsx(ServiceCatalogListItem, { serviceItem: record }, record.id) }, record.id))) }) }), serviceCatalogItems.length === 0 && (jsxRuntimeExports.jsx(EmptyState, { helpCenterPath: helpCenterPath })), serviceCatalogItems.length > 0 && (jsxRuntimeExports.jsxs(CursorPagination, { children: [jsxRuntimeExports.jsx(CursorPagination.Previous, { onClick: handlePreviousClick, disabled: !currentCursor ||
                                (currentCursor?.startsWith("page[before]") && !meta?.has_more), children: t("service-catalog.pagination.previous", "Previous") }), jsxRuntimeExports.jsx(CursorPagination.Next, { onClick: handleNextClick, disabled: (currentCursor?.startsWith("page[after]") &&
                                !meta?.has_more) ||
                                (currentCursor == null && !meta?.has_more), children: t("service-catalog.pagination.next", "Next") })] }))] })) }));
}

async function renderServiceCatalogList(container, settings, helpCenterPath) {
    reactDomExports.render(jsxRuntimeExports.jsx(ThemeProviders, { theme: createTheme(settings), children: jsxRuntimeExports.jsx(ServiceCatalogList, { helpCenterPath: helpCenterPath }) }), container);
}

const formatField = (field) => {
    const { id, type, description, title_in_portal, custom_field_options, required_in_portal, relationship_target_type, } = field;
    return {
        id,
        type,
        name: `custom_fields_${id}`,
        description,
        label: title_in_portal,
        options: custom_field_options,
        required: required_in_portal,
        relationship_target_type,
        error: null,
    };
};
const isAssociatedLookupField = (field) => {
    const customObjectKey = getCustomObjectKey(field.relationship_target_type);
    return customObjectKey === "service_catalog_item";
};
const fetchTicketFields = async (form_id, baseLocale) => {
    try {
        const [formResponse, fieldsResponse] = await Promise.all([
            fetch(`/api/v2/ticket_forms/${form_id}`),
            fetch(`/api/v2/ticket_fields?locale=${baseLocale}`),
        ]);
        if (!formResponse.ok) {
            throw new Error("Error fetching form data");
        }
        if (!fieldsResponse.ok) {
            throw new Error("Error fetching fields data");
        }
        const formData = await formResponse.json();
        const fieldsData = await fieldsResponse.json();
        const ids = formData.ticket_form.ticket_field_ids;
        const ticketFieldsData = fieldsData.ticket_fields;
        const requestFields = ids
            .map((id) => {
            const ticketField = ticketFieldsData.find((field) => field.id === id);
            if (ticketField &&
                !(ticketField.type === "lookup" &&
                    isAssociatedLookupField(ticketField)) &&
                ticketField.editable_in_portal) {
                return formatField(ticketField);
            }
            return null;
        })
            .filter(Boolean);
        return requestFields;
    }
    catch (error) {
        console.error("Error fetching ticket fields:", error);
        return [];
    }
};
function useItemFormFields(serviceCatalogItem, baseLocale) {
    const [requestFields, setRequestFields] = reactExports.useState([]);
    reactExports.useEffect(() => {
        const fetchAndSetFields = async () => {
            try {
                await fetchTicketFields(serviceCatalogItem.form_id, baseLocale).then((ticketFields) => setRequestFields(ticketFields));
            }
            catch (error) {
                console.error("Error fetching ticket fields:", error);
            }
        };
        fetchAndSetFields();
    }, [baseLocale, serviceCatalogItem.form_id]);
    const handleChange = reactExports.useCallback((field, value) => {
        setRequestFields(requestFields.map((ticketField) => ticketField.name === field.name
            ? { ...ticketField, value }
            : ticketField));
    }, [requestFields]);
    return { requestFields, handleChange };
}

const Form = styled.form `
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space.md};
`;
const ItemRequestForm = ({ requestFields, baseLocale, hasAtMentions, userRole, userId, brandId, defaultOrganizationId, handleChange, }) => {
    return (jsxRuntimeExports.jsx(Form, { children: requestFields.map((field) => (jsxRuntimeExports.jsx(TicketField, { field: field, baseLocale: baseLocale, hasAtMentions: hasAtMentions, userRole: userRole, userId: userId, brandId: brandId, defaultOrganizationId: defaultOrganizationId, handleChange: handleChange }, field.id))) }));
};

const ItemTitle = styled(XXXL) `
  font-weight: ${(props) => props.theme.fontWeights.semibold};
`;
const CollapsibleDescription = styled.div `
  font-size: ${(props) => props.theme.fontSizes.md};
  text-align: left;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${(props) => (props.expanded ? "none" : 3)};
  overflow: hidden;
  margin-top: ${(props) => props.theme.space.md};
  padding-right: ${(props) => props.theme.space.xl};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    padding-right: 0;
  }
`;
const Container = styled.div `
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: ${(props) => props.theme.space.xxl};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: column;
  }
`;
const LeftColumn = styled.div `
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space.lg};
  margin-right: ${(props) => props.theme.space.xl};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    margin-right: 0;
  }
`;
const DescriptionWrapper = styled.div `
  border-bottom: ${(props) => props.theme.borders.sm}
    ${(props) => getColorV8("grey", 300, props.theme)};
  padding-bottom: ${(props) => props.theme.space.lg};
  margin-right: ${(props) => props.theme.space.xl};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    margin-right: 0;
  }
`;
const FromFieldsWrapper = styled.div `
  margin-right: ${(props) => props.theme.space.xl};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    margin-right: 0;
  }
`;
const RightColumn = styled.div `
  flex: 1;
  margin-left: ${(props) => props.theme.space.xl};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    position: sticky;
    bottom: 0;
    margin-left: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
const ToggleButton = styled(Button) `
  margin-top: ${(props) => props.theme.space.sm};
  font-size: ${(props) => props.theme.fontSizes.md};
  &:hover {
    text-decoration: none;
  }
`;
const ButtonWrapper = styled.div `
  padding: ${(props) => props.theme.space.lg};
  border: ${(props) => props.theme.borders.sm}
    ${(props) => getColorV8("grey", 300, props.theme)};
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    position: sticky;
    top: 0;
    background: ${(props) => props.theme.colors.background};
    padding: ${(props) => props.theme.space.lg};
    border: none;
    border-top: ${(props) => props.theme.borders.sm}
      ${(props) => getColorV8("grey", 300, props.theme)};
    width: 100vw;
    left: 0;
    right: 0;
  }
`;
function ServiceCatalogItemPage({ serviceCatalogItem, baseLocale, hasAtMentions, userRole, organizations, userId, brandId, }) {
    const [isExpanded, setIsExpanded] = reactExports.useState(false);
    const { requestFields, handleChange } = useItemFormFields(serviceCatalogItem, baseLocale);
    const { t } = useTranslation();
    const defaultOrganizationId = organizations.length > 0 && organizations[0]?.id
        ? organizations[0]?.id?.toString()
        : null;
    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };
    return (jsxRuntimeExports.jsxs(Container, { children: [jsxRuntimeExports.jsxs(LeftColumn, { children: [jsxRuntimeExports.jsxs(DescriptionWrapper, { children: [jsxRuntimeExports.jsx(ItemTitle, { tag: "h1", children: serviceCatalogItem.name }), jsxRuntimeExports.jsx(CollapsibleDescription, { expanded: isExpanded, children: serviceCatalogItem.description }), jsxRuntimeExports.jsxs(ToggleButton, { isLink: true, onClick: toggleDescription, children: [isExpanded
                                        ? t("service-catalog.item.read-less", "Read less")
                                        : t("service-catalog.item.read-more", "Read more"), jsxRuntimeExports.jsx(Button.EndIcon, { children: isExpanded ? jsxRuntimeExports.jsx(SvgChevronUpFill, {}) : jsxRuntimeExports.jsx(SvgChevronDownFill, {}) })] })] }), jsxRuntimeExports.jsx(FromFieldsWrapper, { children: jsxRuntimeExports.jsx(ItemRequestForm, { requestFields: requestFields, baseLocale: baseLocale, hasAtMentions: hasAtMentions, userRole: userRole, userId: userId, brandId: brandId, defaultOrganizationId: defaultOrganizationId, handleChange: handleChange }) })] }), jsxRuntimeExports.jsx(RightColumn, { children: jsxRuntimeExports.jsx(ButtonWrapper, { children: jsxRuntimeExports.jsx(Button, { isPrimary: true, size: "large", isStretched: true, children: t("service-catalog.item.submit-button", "Submit request") }) }) })] }));
}

//data mocked for now
const serviceCatalogItem = {
    id: 1,
    name: "Apple MacBook Pro",
    description: "Request for a new Apple MacBook Pro. The MacBook Pro is equipped with Apple's powerful M3 Pro chip, featuring a 12-core CPU, 18-core GPU, and a 16-core Neural Engine, making it ideal for high-performance tasks. It comes with a 140W USB-C power adapter, three Thunderbolt 4 ports, HDMI, SDXC card slot, headphone jack, and MagSafe 3 port. The backlit Magic Keyboard with Touch ID enhances security and usability. Exclusively for Engineering, Design, and Marketing departments, the 16-inch model includes up to 36+ GB of memory and 1+ TB of storage, while other departments can request machines with up to 36 GB of memory and 512 GB of storage.",
    form_id: "8448527509374",
};
async function renderServiceCatalogItem(container, settings, props) {
    const extendedProps = {
        ...props,
        serviceCatalogItem: serviceCatalogItem,
    };
    reactDomExports.render(jsxRuntimeExports.jsx(ThemeProviders, { theme: createTheme(settings), children: jsxRuntimeExports.jsx(ServiceCatalogItemPage, { ...extendedProps }) }), container);
}

export { renderServiceCatalogItem, renderServiceCatalogList };
