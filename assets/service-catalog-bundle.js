import { s as styled, K as getColorV8, j as jsxRuntimeExports, aa as SvgShapesFill, ab as Grid, ac as Col, ad as Row, ae as Skeleton, af as MD, ag as SM, u as useTranslation, ah as LG, A as Anchor, a0 as Button, c as useToast, N as Notification, T as Title, d as Close, r as reactExports, ai as CursorPagination, a6 as reactDomExports, a7 as ThemeProviders, a8 as createTheme, aj as ErrorBoundary, ak as XXXL, al as SvgChevronUpFill, am as SvgChevronDownFill, a2 as addFlashNotification } from 'shared';
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
    return (jsxRuntimeExports.jsxs(ItemContainer, { href: `/hc/en-us/services/${serviceItem.id}`, children: [jsxRuntimeExports.jsx(IconContainer, { children: jsxRuntimeExports.jsx(SvgShapesFill, {}) }), jsxRuntimeExports.jsxs(TextContainer$1, { children: [jsxRuntimeExports.jsx(ItemTitle$1, { children: serviceItem.name }), jsxRuntimeExports.jsx(ItemDescription, { children: serviceItem.description })] })] }));
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
    return (jsxRuntimeExports.jsxs(Container$2, { children: [jsxRuntimeExports.jsxs(TextContainer, { children: [jsxRuntimeExports.jsx(LG, { children: t("service-catalog.empty-state.no-services", "No services in sight") }), jsxRuntimeExports.jsx(MD, { children: t("service-catalog.empty-state.description", "Once services are added to catalog, you'll find them here.") }), jsxRuntimeExports.jsx(Anchor, { isExternal: true, href: "#", target: "_blank", children: t("service-catalog.empty-state.support-article-link", "Learn about the service catalog") })] }), jsxRuntimeExports.jsx(Button, { isPrimary: true, onClick: handleRedirect, children: t("service-catalog.empty-state.go-to-homepage", "Go to the homepage") })] }));
};

const useNotifyError = () => {
    const { addToast } = useToast();
    const { t } = useTranslation();
    const notifyError = (title, message) => {
        addToast(({ close }) => (jsxRuntimeExports.jsxs(Notification, { type: "error", children: [jsxRuntimeExports.jsx(Title, { children: title }), message, jsxRuntimeExports.jsx(Close, { "aria-label": t("new-request-form.close-label", "Close"), onClick: close })] })));
    };
    return notifyError;
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
const PAGE_SIZE = 16;
function ServiceCatalogList({ helpCenterPath, }) {
    const [serviceCatalogItems, setServiceCatalogItems] = reactExports.useState([]);
    const [meta, setMeta] = reactExports.useState(null);
    const [currentCursor, setCurrentCursor] = reactExports.useState(null);
    const [isLoading, setIsLoading] = reactExports.useState(false);
    const [error, setError] = reactExports.useState(null);
    const notifyError = useNotifyError();
    const { t } = useTranslation();
    if (error) {
        throw error;
    }
    reactExports.useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            try {
                const response = await fetch(currentCursor
                    ? `/api/v2/help_center/service_catalog/items?page[size]=${PAGE_SIZE}&${currentCursor}`
                    : `/api/v2/help_center/service_catalog/items?page[size]=${PAGE_SIZE}`);
                const data = await response.json();
                if (response.ok) {
                    setMeta(data.meta);
                    setServiceCatalogItems(data.service_catalog_items);
                    setIsLoading(false);
                }
                if (!response.ok) {
                    setIsLoading(false);
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            }
            catch (error) {
                setIsLoading(false);
                notifyError(t("service-catalog.service-list-error-title", "Services couldn't be loaded"), t("service-catalog.service-list-error-message", "Give it a moment and try it again"));
                setError(error);
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
    reactDomExports.render(jsxRuntimeExports.jsx(ThemeProviders, { theme: createTheme(settings), children: jsxRuntimeExports.jsx(ErrorBoundary, { helpCenterPath: helpCenterPath, children: jsxRuntimeExports.jsx(ServiceCatalogList, { helpCenterPath: helpCenterPath }) }) }), container);
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
    if (customObjectKey === "service_catalog_item") {
        return true;
    }
    return false;
};
const fetchTicketFields = async (form_id, baseLocale) => {
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
    let associatedLookupField = null;
    const requestFields = ids
        .map((id) => {
        const ticketField = ticketFieldsData.find((field) => field.id === id);
        if (ticketField &&
            ticketField.type !== "subject" &&
            ticketField.type !== "description" &&
            ticketField.editable_in_portal) {
            if (ticketField.type === "lookup" &&
                isAssociatedLookupField(ticketField)) {
                associatedLookupField = ticketField;
                return null;
            }
            return formatField(ticketField);
        }
        return null;
    })
        .filter(Boolean);
    if (!associatedLookupField) {
        throw new Error("Associated lookup field not found");
    }
    return { requestFields, associatedLookupField };
};
function useItemFormFields(serviceCatalogItem, baseLocale) {
    const [requestFields, setRequestFields] = reactExports.useState([]);
    const [associatedLookupField, setAssociatedLookupField] = reactExports.useState();
    const [error, setError] = reactExports.useState(null);
    reactExports.useEffect(() => {
        const fetchAndSetFields = async () => {
            if (serviceCatalogItem && serviceCatalogItem.form_id) {
                try {
                    const { requestFields, associatedLookupField } = await fetchTicketFields(serviceCatalogItem.form_id, baseLocale);
                    setRequestFields(requestFields);
                    setAssociatedLookupField(associatedLookupField);
                }
                catch (error) {
                    setError(error);
                }
            }
        };
        fetchAndSetFields();
    }, [baseLocale, serviceCatalogItem]);
    const handleChange = reactExports.useCallback((field, value) => {
        setRequestFields(requestFields.map((ticketField) => ticketField.name === field.name
            ? { ...ticketField, value }
            : ticketField));
    }, [requestFields]);
    return {
        requestFields,
        associatedLookupField,
        error,
        setRequestFields,
        handleChange,
    };
}

const DescriptionWrapper = styled.div `
  border-bottom: ${(props) => props.theme.borders.sm}
    ${(props) => getColorV8("grey", 300, props.theme)};
  padding-bottom: ${(props) => props.theme.space.lg};
  margin-right: ${(props) => props.theme.space.xl};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    margin-right: 0;
  }
`;
const ItemTitle = styled(XXXL) `
  font-weight: ${(props) => props.theme.fontWeights.semibold};
`;
const CollapsibleText = styled.div `
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
const ToggleButton = styled(Button) `
  margin-top: ${(props) => props.theme.space.sm};
  font-size: ${(props) => props.theme.fontSizes.md};
  &:hover {
    text-decoration: none;
  }
`;
const DESCRIPTION_LENGTH_THRESHOLD = 270;
const CollapsibleDescription = ({ title, description, }) => {
    const [isExpanded, setIsExpanded] = reactExports.useState(false);
    const { t } = useTranslation();
    const showToggleButton = description.length > DESCRIPTION_LENGTH_THRESHOLD;
    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };
    return (jsxRuntimeExports.jsxs(DescriptionWrapper, { children: [jsxRuntimeExports.jsx(ItemTitle, { tag: "h1", children: title }), jsxRuntimeExports.jsx(CollapsibleText, { expanded: isExpanded || !showToggleButton, children: description }), showToggleButton && (jsxRuntimeExports.jsxs(ToggleButton, { isLink: true, onClick: toggleDescription, children: [isExpanded
                        ? t("service-catalog.item.read-less", "Read less")
                        : t("service-catalog.item.read-more", "Read more"), jsxRuntimeExports.jsx(Button.EndIcon, { children: isExpanded ? jsxRuntimeExports.jsx(SvgChevronUpFill, {}) : jsxRuntimeExports.jsx(SvgChevronDownFill, {}) })] }))] }));
};

const Form = styled.form `
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: ${(props) => props.theme.space.md};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: column;
  }
`;
const FieldsContainer = styled.div `
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space.md};
  margin-right: ${(props) => props.theme.space.xl};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    margin-right: 0;
  }
`;
const ButtonWrapper = styled.div `
  flex: 1;
  margin-left: ${(props) => props.theme.space.xl};
  padding: ${(props) => props.theme.space.lg};
  border: ${(props) => props.theme.borders.sm}
    ${(props) => getColorV8("grey", 300, props.theme)};
  height: fit-content;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    position: sticky;
    top: 0;
    background: ${(props) => props.theme.colors.background};
    padding: ${(props) => props.theme.space.lg};
    border: none;
    border-top: ${(props) => props.theme.borders.sm}
      ${(props) => getColorV8("grey", 300, props.theme)};
    width: 100vw;
    margin-left: 0;
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
function ItemRequestForm({ requestFields, serviceCatalogItem, baseLocale, hasAtMentions, userRole, userId, brandId, defaultOrganizationId, handleChange, onSubmit, }) {
    const { t } = useTranslation();
    return (jsxRuntimeExports.jsxs(Form, { onSubmit: onSubmit, noValidate: true, children: [jsxRuntimeExports.jsxs(LeftColumn, { children: [jsxRuntimeExports.jsx(CollapsibleDescription, { title: serviceCatalogItem.name, description: serviceCatalogItem.description }), jsxRuntimeExports.jsx(FieldsContainer, { children: requestFields.map((field) => (jsxRuntimeExports.jsx(TicketField, { field: field, baseLocale: baseLocale, hasAtMentions: hasAtMentions, userRole: userRole, userId: userId, brandId: brandId, defaultOrganizationId: defaultOrganizationId, handleChange: handleChange }, field.id))) })] }), jsxRuntimeExports.jsx(RightColumn, { children: jsxRuntimeExports.jsx(ButtonWrapper, { children: jsxRuntimeExports.jsx(Button, { isPrimary: true, size: "large", isStretched: true, type: "submit", children: t("service-catalog.item.submit-button", "Submit request") }) }) })] }));
}

function useServiceCatalogItem(serviceItemId) {
    const [serviceCatalogItem, setServiceCatalogItem] = reactExports.useState();
    const [errorFetchingItem, setError] = reactExports.useState(null);
    reactExports.useEffect(() => {
        const fetchServiceCatalogItem = async () => {
            try {
                const response = await fetch(`/api/v2/help_center/service_catalog/items/${serviceItemId}`);
                if (response.ok) {
                    const data = await response.json();
                    setServiceCatalogItem(data.service_catalog_item);
                }
                else {
                    throw new Error("Error fetching service catalog item");
                }
            }
            catch (error) {
                setError(error);
            }
        };
        fetchServiceCatalogItem();
    }, [serviceItemId]);
    return { serviceCatalogItem, errorFetchingItem };
}

async function submitServiceItemRequest(serviceCatalogItem, requestFields, associatedLookupField, baseLocale) {
    try {
        const currentUserRequest = await fetch("/api/v2/users/me.json");
        if (!currentUserRequest.ok) {
            throw new Error("Error fetching current user data");
        }
        const currentUser = await currentUserRequest.json();
        const customFields = requestFields.map((field) => {
            return {
                id: field.id,
                value: field.value,
            };
        });
        const response = await fetch("/api/v2/requests", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": currentUser.user.authenticity_token,
            },
            body: JSON.stringify({
                request: {
                    subject: `Service request: ${serviceCatalogItem.name}`,
                    comment: {
                        body: `Hi, I would like to request ${serviceCatalogItem.name}. ${serviceCatalogItem.description.substring(0, 100)}`,
                    },
                    ticket_form_id: serviceCatalogItem.form_id,
                    custom_fields: [
                        ...customFields,
                        { id: associatedLookupField.id, value: serviceCatalogItem.id },
                    ],
                    via: {
                        channel: "web form",
                        source: 50,
                    },
                    locale: baseLocale,
                },
            }),
        });
        return response;
    }
    catch (error) {
        console.error("Error submitting service request:", error);
        return;
    }
}

const Container = styled.div `
  display: flex;
  flex-direction: column;
`;
function ServiceCatalogItemPage({ serviceCatalogItemId, baseLocale, hasAtMentions, userRole, organizations, userId, brandId, }) {
    const { serviceCatalogItem, errorFetchingItem } = useServiceCatalogItem(serviceCatalogItemId);
    const { requestFields, associatedLookupField, error, setRequestFields, handleChange, } = useItemFormFields(serviceCatalogItem, baseLocale);
    const { t } = useTranslation();
    const notifyError = useNotifyError();
    if (error) {
        throw error;
    }
    if (errorFetchingItem) {
        throw errorFetchingItem;
    }
    const handleRequestSubmit = async (e) => {
        e.preventDefault();
        if (!serviceCatalogItem || !associatedLookupField) {
            return;
        }
        const response = await submitServiceItemRequest(serviceCatalogItem, requestFields, associatedLookupField, baseLocale);
        if (!response?.ok) {
            if (response?.status === 422) {
                const errorData = await response.json();
                const invalidFieldErrors = errorData.details.base;
                const updatedFields = requestFields.map((field) => {
                    const errorField = invalidFieldErrors.find((errorField) => errorField.field_key === field.id);
                    return errorField
                        ? { ...field, error: errorField.description }
                        : field;
                });
                setRequestFields(updatedFields);
            }
            else {
                notifyError(t("service-catalog.item.service-request-error-title", "Service couldn't be submitted"), t("service-catalog.item.service-request-error-message", "Give it a moment and try it again"));
            }
        }
        else if (response && response.ok) {
            addFlashNotification({
                type: "success",
                message: t("service-catalog.item.service-request-submitted", "Service request submitted"),
            });
            const data = await response?.json();
            const redirectUrl = "/hc/requests/" + data.request.id;
            window.location.href = redirectUrl;
        }
    };
    const defaultOrganizationId = organizations.length > 0 && organizations[0]?.id
        ? organizations[0]?.id?.toString()
        : null;
    return (jsxRuntimeExports.jsx(Container, { children: serviceCatalogItem && (jsxRuntimeExports.jsx(ItemRequestForm, { requestFields: requestFields, serviceCatalogItem: serviceCatalogItem, baseLocale: baseLocale, hasAtMentions: hasAtMentions, userRole: userRole, userId: userId, brandId: brandId, defaultOrganizationId: defaultOrganizationId, handleChange: handleChange, onSubmit: handleRequestSubmit })) }));
}

async function renderServiceCatalogItem(container, settings, props, helpCenterPath) {
    reactDomExports.render(jsxRuntimeExports.jsx(ThemeProviders, { theme: createTheme(settings), children: jsxRuntimeExports.jsx(ErrorBoundary, { helpCenterPath: helpCenterPath, children: jsxRuntimeExports.jsx(ServiceCatalogItemPage, { ...props }) }) }), container);
}

export { renderServiceCatalogItem, renderServiceCatalogList };
