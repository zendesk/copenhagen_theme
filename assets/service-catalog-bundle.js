import { r as reactExports, aq as linkifyStr, s as styled, w as getColor, L as Avatar, j as jsxRuntimeExports, ar as SvgShapesFill, as as XXXL, E as Button, u as useTranslation, at as SvgChevronUpFill, au as SvgChevronDownFill, k as debounce, v as Modal, O as Option, g as Field, h as Combobox, av as SvgUserCircleStroke, S as Span, W as Close$2, am as Skeleton, A as Anchor, ah as Menu, ag as Item, ak as SvgChevronDownStroke, ai as ItemGroup, aw as GlobalAlert, ax as Z_INDEX_ABOVE_NAVBAR, _ as reactDomExports, G as addFlashNotification, n as notify, Y as initI18next, Z as loadTranslations, a0 as ThemeProviders, a1 as createTheme, ao as ErrorBoundary, ay as SvgChevronUpFill$1, az as SvgChevronDownFill$1, a9 as Grid, aA as LG, aB as MD, aC as IconButton, T as Tooltip, aD as SvgXStroke, b as Field$1, M as MediaInput, a2 as SvgSearchStroke, N as Dots, aE as XL, an as CursorPagination, aF as ErrorScreen } from 'shared';
import { g as getVisibleFields, a as getCustomObjectKey, A as Attachments, R as RequestFormField } from 'ticket-fields';

const useAssetDataFetchers = (assetOptionId, assetTypeOptionId) => {
    const fetchAssets = reactExports.useCallback(async () => {
        if (!assetOptionId)
            return undefined;
        const res = await fetch(`/api/v2/custom_objects/standard::service_catalog_asset_option/records/${assetOptionId}`);
        if (!res.ok) {
            throw new Error("Error fetching asset data");
        }
        const data = await res.json();
        if (!data?.custom_object_record) {
            throw new Error("Missing custom_object_record in asset response");
        }
        const { name, custom_object_fields } = data.custom_object_record;
        const fields = custom_object_fields ?? {};
        return {
            assetIds: fields["standard::asset_filter_ids"],
            assetDescription: fields["standard::description"],
            assetName: name,
            isRequired: fields["standard::is_required"],
        };
    }, [assetOptionId]);
    const fetchAssetTypes = reactExports.useCallback(async () => {
        if (!assetTypeOptionId)
            return undefined;
        const res = await fetch(`/api/v2/custom_objects/standard::service_catalog_asset_type_option/records/${assetTypeOptionId}`);
        if (!res.ok) {
            throw new Error("Error fetching asset type data");
        }
        const data = await res.json();
        if (!data?.custom_object_record) {
            throw new Error("Missing custom_object_record in asset type response");
        }
        const { name, custom_object_fields } = data.custom_object_record;
        const fields = custom_object_fields ?? {};
        return {
            assetTypeIds: fields["standard::asset_type_ids"],
            isHiddenAssetsType: !!fields["standard::is_hidden"],
            assetTypeDescription: fields["standard::description"],
            assetTypeName: name,
            isRequired: fields["standard::is_required"],
        };
    }, [assetTypeOptionId]);
    return { fetchAssets, fetchAssetTypes };
};

const ASSET_TYPE_KEY$1 = "zen:custom_object:standard::itam_asset_type";
const ASSET_KEY$1 = "zen:custom_object:standard::itam_asset";
const processAssetConfig = (assetTypeData, assetData) => {
    let assetTypeIdsList = [];
    if (assetTypeData?.assetTypeIds) {
        const raw = assetTypeData.assetTypeIds;
        if (Array.isArray(raw)) {
            assetTypeIdsList = raw.map(String);
        }
        else if (typeof raw === "string") {
            assetTypeIdsList = raw.split(",");
        }
        assetTypeIdsList = assetTypeIdsList.map((s) => s.trim()).filter(Boolean);
    }
    let assetIdsList = [];
    if (assetData?.assetIds) {
        const raw = assetData.assetIds;
        if (typeof raw === "string") {
            assetIdsList = raw.split(",");
        }
        else if (Array.isArray(raw)) {
            assetIdsList = raw.map(String);
        }
        assetIdsList = assetIdsList.map((s) => s.trim()).filter(Boolean);
    }
    const isHidden = !!assetTypeData?.isHiddenAssetsType;
    return {
        assetTypeIds: assetTypeIdsList,
        assetIds: assetIdsList,
        isAssetTypeHidden: isHidden,
        assetTypeHiddenValue: isHidden && assetTypeIdsList[0] ? assetTypeIdsList[0] : "",
        assetTypeLabel: assetTypeData?.assetTypeName,
        assetTypeDescription: assetTypeData?.assetTypeDescription,
        assetTypeIsRequired: assetTypeData?.isRequired || false,
        assetLabel: assetData?.assetName,
        assetDescription: assetData?.assetDescription,
        assetIsRequired: assetData?.isRequired || false,
    };
};
const getFieldValue = (field) => {
    if (field.type === "tagger") {
        return (field.custom_field_options.find((option) => option.default)?.value ?? null);
    }
    return null;
};
const formatField = (field) => {
    const { id, type, description, title_in_portal, custom_field_options, required_in_portal, relationship_target_type, relationship_filter, } = field;
    const sanitizedDescription = linkifyStr(description);
    return {
        id,
        type,
        name: `custom_fields_${id}`,
        description: sanitizedDescription,
        label: title_in_portal,
        options: custom_field_options,
        required: required_in_portal,
        relationship_target_type,
        relationship_filter,
        error: null,
        value: getFieldValue(field),
    };
};
const HIDDEN_SERVICE_CATALOG_LOOKUP_KEYS = [
    "standard::service_catalog_item",
    "standard::service_catalog_category",
];
const isAssociatedLookupField = (field) => {
    const customObjectKey = getCustomObjectKey(field.relationship_target_type);
    return customObjectKey === "standard::service_catalog_item";
};
const isCategoryLookupField = (field) => {
    const customObjectKey = getCustomObjectKey(field.relationship_target_type);
    return customObjectKey === "standard::service_catalog_category";
};
const isHiddenServiceCatalogLookup = (field) => {
    const customObjectKey = getCustomObjectKey(field.relationship_target_type);
    return HIDDEN_SERVICE_CATALOG_LOOKUP_KEYS.includes(customObjectKey);
};
const enrichFieldsWithAssetConfig = (fields, assetConfig) => {
    return fields.map((field) => {
        if (field.relationship_target_type === ASSET_TYPE_KEY$1) {
            return {
                ...field,
                label: assetConfig.assetTypeLabel || field.label,
                description: assetConfig.assetTypeDescription || field.description,
                required: assetConfig.assetTypeIsRequired || field.required,
            };
        }
        if (field.relationship_target_type === ASSET_KEY$1) {
            return {
                ...field,
                label: assetConfig.assetLabel || field.label,
                description: assetConfig.assetDescription || field.description,
                required: assetConfig.assetIsRequired || field.required,
            };
        }
        return field;
    });
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
    if (!formData.ticket_form.active) {
        throw new Error("Associated ticket form is not active");
    }
    const ticketForm = formData.ticket_form;
    const ids = ticketForm.ticket_field_ids;
    const endUserConditions = ticketForm.end_user_conditions || [];
    const ticketFieldsData = fieldsData.ticket_fields;
    let associatedLookupField = null;
    let categoryLookupField = null;
    const requestFields = ids
        .map((id) => {
        const ticketField = ticketFieldsData.find((field) => field.id === id);
        if (ticketField &&
            ticketField.type !== "subject" &&
            ticketField.type !== "description" &&
            ticketField.active &&
            ticketField.editable_in_portal) {
            if (ticketField.type === "lookup" &&
                isHiddenServiceCatalogLookup(ticketField)) {
                if (isAssociatedLookupField(ticketField)) {
                    associatedLookupField = ticketField;
                }
                else if (isCategoryLookupField(ticketField)) {
                    categoryLookupField = ticketField;
                }
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
    return {
        requestFields,
        associatedLookupField,
        categoryLookupField,
        endUserConditions,
    };
};
function useItemFormFields(serviceCatalogItem, baseLocale) {
    const [allRequestFields, setAllRequestFields] = reactExports.useState([]);
    const [endUserConditions, setEndUserConditions] = reactExports.useState([]);
    const [associatedLookupField, setAssociatedLookupField] = reactExports.useState();
    const [categoryLookupField, setCategoryLookupField] = reactExports.useState(null);
    const [error, setError] = reactExports.useState(null);
    const [isRequestFieldsLoading, setIsRequestFieldsLoading] = reactExports.useState(false);
    const [assetConfig, setAssetConfig] = reactExports.useState({
        assetTypeIds: [],
        assetIds: [],
        isAssetTypeHidden: false,
        assetTypeHiddenValue: "",
        assetTypeIsRequired: false,
        assetIsRequired: false,
    });
    const assetOptionId = serviceCatalogItem?.custom_object_fields?.["standard::asset_option"];
    const assetTypeOptionId = serviceCatalogItem?.custom_object_fields?.["standard::asset_type_option"];
    const { fetchAssets, fetchAssetTypes } = useAssetDataFetchers(assetOptionId ?? "", assetTypeOptionId ?? "");
    reactExports.useEffect(() => {
        if (!serviceCatalogItem?.form_id)
            return;
        let alive = true;
        const fetchAllData = async () => {
            setIsRequestFieldsLoading(true);
            setError(null);
            try {
                const [ticketFieldsResult, assetTypeData, assetData] = await Promise.all([
                    fetchTicketFields(serviceCatalogItem.form_id, baseLocale),
                    fetchAssetTypes(),
                    fetchAssets(),
                ]);
                if (!alive)
                    return;
                const { requestFields, associatedLookupField, categoryLookupField, endUserConditions, } = ticketFieldsResult;
                const processedAssetConfig = processAssetConfig(assetTypeData, assetData);
                setAssetConfig(processedAssetConfig);
                setAssociatedLookupField(associatedLookupField);
                setCategoryLookupField(categoryLookupField);
                setEndUserConditions(endUserConditions);
                const enrichedFields = enrichFieldsWithAssetConfig(requestFields, processedAssetConfig);
                setAllRequestFields(enrichedFields);
            }
            catch (error) {
                if (alive) {
                    setError(error);
                }
            }
            finally {
                if (alive) {
                    setIsRequestFieldsLoading(false);
                }
            }
        };
        fetchAllData();
        return () => {
            alive = false;
        };
    }, [baseLocale, serviceCatalogItem?.form_id, fetchAssets, fetchAssetTypes]);
    const handleChange = reactExports.useCallback((field, value) => {
        const updatedFields = allRequestFields.map((ticketField) => ticketField.name === field.name
            ? { ...ticketField, value }
            : ticketField);
        setAllRequestFields(updatedFields);
    }, [allRequestFields]);
    const requestFields = getVisibleFields(allRequestFields, endUserConditions);
    return {
        requestFields,
        associatedLookupField,
        categoryLookupField,
        error,
        setRequestFields: setAllRequestFields,
        handleChange,
        isRequestFieldsLoading,
        assetTypeHiddenValue: assetConfig.assetTypeHiddenValue,
        isAssetTypeHidden: assetConfig.isAssetTypeHidden,
        assetTypeIds: assetConfig.assetTypeIds,
        assetIds: assetConfig.assetIds,
    };
}

const StyledAvatar = styled(Avatar) `
  background-color: ${({ theme }) => getColor({ theme, hue: "grey", shade: 100 })};
  width: ${(props) => (props.size === "large" ? 72 : 40)}px !important;
  height: ${(props) => (props.size === "large" ? 72 : 40)}px !important;

  && > svg {
    width: ${(props) => (props.size === "large" ? 28 : 16)}px;
    height: ${(props) => (props.size === "large" ? 28 : 16)}px;
    color: ${({ theme }) => getColor({ theme, hue: "grey", shade: 600 })};
  }
`;
const ItemThumbnail = ({ size, url }) => {
    return (jsxRuntimeExports.jsx(StyledAvatar, { size: size, isSystem: true, children: url ? jsxRuntimeExports.jsx("img", { src: url, alt: "" }) : jsxRuntimeExports.jsx(SvgShapesFill, { "aria-hidden": "true" }) }));
};

const DescriptionWrapper = styled.div `
  border-bottom: ${(props) => props.theme.borders.sm}
    ${({ theme }) => getColor({ theme, hue: "grey", shade: 300 })};
  padding-bottom: ${(props) => props.theme.space.lg};
  margin-inline-end: ${(props) => props.theme.space.xl};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    margin-inline-end: 0;
  }
`;
const ItemTitle$1 = styled(XXXL) `
  font-weight: ${(props) => props.theme.fontWeights.semibold};
  margin-bottom: 0;
  overflow-wrap: break-word;
  max-width: 100%;
`;
const CollapsibleText = styled.div `
  font-size: ${(props) => props.theme.fontSizes.md};
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${(props) => (props.isCollapsed ? 3 : "none")};
  overflow: hidden;
  margin-top: ${(props) => props.theme.space.md};
  padding-inline-end: ${(props) => props.theme.space.xl};
  overflow-wrap: break-word;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    padding-inline-end: 0;
  }
`;
const ToggleButton = styled(Button) `
  margin-top: ${(props) => props.theme.space.sm};
  font-size: ${(props) => props.theme.fontSizes.md};
  &:hover {
    text-decoration: none;
  }
`;
const HeaderContainer = styled.div `
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${(props) => props.theme.space.md};
`;
const CollapsibleDescription = ({ title, description, thumbnailUrl, }) => {
    const [isCollapsed, setIsCollapsed] = reactExports.useState(true);
    const [isClamped, setIsClamped] = reactExports.useState(false);
    const { t } = useTranslation();
    const contentRef = reactExports.useRef(null);
    reactExports.useEffect(() => {
        const el = contentRef.current;
        if (el) {
            const checkClamped = () => {
                const visibleBoxHeight = el.getBoundingClientRect().height;
                const fullContentHeight = el.scrollHeight;
                const clamped = fullContentHeight - visibleBoxHeight > 1;
                setIsClamped(clamped);
                if (!clamped) {
                    setIsCollapsed(false);
                }
            };
            requestAnimationFrame(checkClamped);
        }
    }, [description]);
    const toggleDescription = () => {
        setIsCollapsed(!isCollapsed);
    };
    return (jsxRuntimeExports.jsxs(DescriptionWrapper, { children: [jsxRuntimeExports.jsxs(HeaderContainer, { children: [jsxRuntimeExports.jsx(ItemThumbnail, { size: "large", url: thumbnailUrl }), jsxRuntimeExports.jsx(ItemTitle$1, { tag: "h1", children: title })] }), description && (jsxRuntimeExports.jsx(CollapsibleText, { ref: contentRef, className: "service-catalog-description", isCollapsed: isCollapsed, dangerouslySetInnerHTML: { __html: description } })), isClamped && (jsxRuntimeExports.jsxs(ToggleButton, { isLink: true, onClick: toggleDescription, children: [!isCollapsed
                        ? t("service-catalog.item.read-less", "Read less")
                        : t("service-catalog.item.read-more", "Read more"), jsxRuntimeExports.jsx(Button.EndIcon, { children: !isCollapsed ? jsxRuntimeExports.jsx(SvgChevronUpFill, {}) : jsxRuntimeExports.jsx(SvgChevronDownFill, {}) })] }))] }));
};

const AttachmentsInputName = "attachments";
const ASSET_TYPE_KEY = "zen:custom_object:standard::itam_asset_type";
const ASSET_KEY = "zen:custom_object:standard::itam_asset";
// Marker class added to <html> when the page is in preview mode. CSS in
// styles/_service_catalog.scss uses it to hide product chrome (admin shell,
// trial banners) so admins can see the page exactly as end-users would.
// IMPORTANT: keep in sync with the inline script in templates/service_page.hbs.
const PREVIEW_MODE_HTML_CLASS = "is-service-catalog-preview";
// Query parameter that drives preview mode. When present and equal to "true",
// the inline script in templates/service_page.hbs adds the marker class to
// <html> synchronously, before first paint, eliminating the chrome flicker.
const PREVIEW_MODE_QUERY_PARAM = "preview";
const PREVIEW_MODE_QUERY_PARAM_VALUE = "true";

const SEARCH_DEBOUNCE_MS = 300;
function useUserSearch(selectedUser, onSearchFired) {
    const [options, setOptions] = reactExports.useState([]);
    const [isLoadingOptions, setIsLoadingOptions] = reactExports.useState(false);
    // Read the latest values inside the (stable) fetch without recreating it.
    const selectedUserRef = reactExports.useRef(selectedUser);
    reactExports.useEffect(() => {
        selectedUserRef.current = selectedUser;
    }, [selectedUser]);
    const onSearchFiredRef = reactExports.useRef(onSearchFired);
    reactExports.useEffect(() => {
        onSearchFiredRef.current = onSearchFired;
    }, [onSearchFired]);
    // Tracks the in-flight request so we can abort it and ignore stale results.
    const abortControllerRef = reactExports.useRef(null);
    const fetchUsers = reactExports.useCallback(async (searchQuery) => {
        abortControllerRef.current?.abort();
        const controller = new AbortController();
        abortControllerRef.current = controller;
        setIsLoadingOptions(true);
        try {
            const response = await fetch(`/hc/api/v2/service_catalog/users?query=${encodeURIComponent(searchQuery)}`, { signal: controller.signal });
            const data = await response.json();
            if (response.ok) {
                const selected = selectedUserRef.current;
                const userOptions = data.users.map((user) => ({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                }));
                setOptions(selected
                    ? [selected, ...userOptions.filter((o) => o.id !== selected.id)]
                    : userOptions);
            }
        }
        catch (error) {
            // A newer search aborted this one; the newer request owns the state.
            if (error instanceof DOMException && error.name === "AbortError") {
                return;
            }
            console.error("Error fetching users:", error);
            setOptions([]);
        }
        finally {
            // Only the most recent request may clear the loading flag, otherwise an
            // aborted request would hide the spinner for the one still running.
            if (abortControllerRef.current === controller) {
                setIsLoadingOptions(false);
            }
        }
    }, []);
    const searchUsers = reactExports.useMemo(() => debounce((query) => {
        fetchUsers(query);
        onSearchFiredRef.current?.();
    }, SEARCH_DEBOUNCE_MS), [fetchUsers]);
    const clearOptions = reactExports.useCallback(() => {
        searchUsers.cancel();
        abortControllerRef.current?.abort();
        setOptions([]);
    }, [searchUsers]);
    reactExports.useEffect(() => {
        return () => {
            searchUsers.cancel();
            abortControllerRef.current?.abort();
        };
    }, [searchUsers]);
    return { options, isLoadingOptions, searchUsers, clearOptions };
}

const StyledHeader = styled(Modal.Header) `
  color: ${({ theme }) => getColor({ theme, hue: "successHue", shade: 700 })};
`;
const FormContainer = styled.div `
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space.md};
`;
const StyledModalBody = styled(Modal.Body) `
  padding-bottom: 48px;
`;
const StyledOption = styled(Option) `
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${(props) => props.theme.space.sm};
`;
const OptionContent = styled.div `
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${(props) => props.theme.space.sm};
`;
const StyledContainer = styled.div `
  display: flex;
  gap: ${(props) => props.theme.space.xs};
`;
const StyledOptionContent = styled.div `
  display: flex;
  flex-direction: column;
`;
const StyledModalFooter = styled(Modal.Footer) `
  padding: 32px 40px;
  border-top: 1px solid rgb(232, 234, 236);
`;
const ChangeUserForm = ({ onCancel, onCreate, selectedUser, setSelectedUser, }) => {
    const { t } = useTranslation();
    const [userError, setUserError] = reactExports.useState(false);
    const inputRef = reactExports.useRef(null);
    const [inputValue, setInputValue] = reactExports.useState(selectedUser?.name ?? "");
    const [isCreating, setIsCreating] = reactExports.useState(false);
    const isTyping = reactExports.useRef(false);
    const { options, isLoadingOptions, searchUsers, clearOptions } = useUserSearch(selectedUser, () => {
        isTyping.current = false;
    });
    const highlightMatch = (text, query) => {
        if (!query.trim())
            return text;
        const index = text.toLowerCase().indexOf(query.toLowerCase());
        if (index === -1)
            return text;
        const before = text.slice(0, index);
        const match = text.slice(index, index + query.length);
        const after = text.slice(index + query.length);
        return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [before, jsxRuntimeExports.jsx("strong", { children: match }), after] }));
    };
    const loadingOption = {
        id: "loading",
        name: t("service-catalog.change-user-modal.loading-users", "Loading users..."),
        email: "",
    };
    const noResultsOption = {
        id: "no-results",
        name: t("service-catalog.change-user-modal.no-matches-found", "Type to search"),
        email: "",
    };
    const handleChange = reactExports.useCallback(({ inputValue, selectionValue }) => {
        if (selectionValue !== undefined) {
            const selectedOption = options.find((opt) => opt.id === selectionValue);
            if (selectedOption &&
                selectedOption.id !== "loading" &&
                selectedOption.id !== "no-results") {
                setSelectedUser(selectedOption);
                setInputValue(selectedOption.name);
                setUserError(false);
                isTyping.current = false;
            }
        }
        if (inputValue !== undefined) {
            setInputValue(inputValue);
            isTyping.current = true; // Mark as typing
            if (inputValue.trim().length >= 3) {
                searchUsers(inputValue.trim());
            }
            else {
                clearOptions();
                setSelectedUser(null);
                isTyping.current = false;
            }
        }
    }, [options, searchUsers, clearOptions, setSelectedUser]);
    const handleCreate = async () => {
        if (!selectedUser) {
            setUserError(true);
            return;
        }
        setIsCreating(true);
        try {
            await onCreate(selectedUser.name, selectedUser.id);
        }
        catch (error) {
            console.error("Error changing user:", error);
        }
        finally {
            setIsCreating(false);
        }
    };
    const setSelectedUserFromInput = reactExports.useCallback(() => {
        if (!inputValue.trim()) {
            if (selectedUser) {
                setSelectedUser(null);
                setUserError(false);
            }
            return;
        }
        if (selectedUser &&
            (selectedUser.name.toLowerCase() === inputValue.toLowerCase() ||
                selectedUser.email.toLowerCase() === inputValue.toLowerCase())) {
            return;
        }
        const match = options.find((opt) => opt.name.toLowerCase() === inputValue.toLowerCase());
        if (match) {
            setSelectedUser(match);
            setInputValue(match.name);
            setUserError(false);
        }
    }, [inputValue, options, selectedUser]);
    const handleBlur = reactExports.useCallback(() => {
        if (!isTyping.current) {
            setSelectedUserFromInput();
        }
    }, [setSelectedUserFromInput]);
    const handleKeyDown = reactExports.useCallback((e) => {
        if (e.key === "Enter" && !isTyping.current && !isLoadingOptions) {
            setSelectedUserFromInput();
            // Combobox will close automatically on Enter
        }
    }, [isLoadingOptions, setSelectedUserFromInput]);
    const displayOptions = isLoadingOptions
        ? [loadingOption]
        : options.length === 0
            ? [noResultsOption] // Show "No results" when no options (whether typed or not)
            : options;
    return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(StyledHeader, { tag: "h2", children: t("service-catalog.change-user-modal.title", "Change user") }), jsxRuntimeExports.jsx(StyledModalBody, { children: jsxRuntimeExports.jsx(FormContainer, { children: jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: jsxRuntimeExports.jsxs(Field, { children: [jsxRuntimeExports.jsx(Field.Label, { children: t("service-catalog.change-user-modal.select-user-label", "Select user* (required)") }), jsxRuntimeExports.jsx(Combobox, { ref: inputRef, inputValue: inputValue, selectionValue: selectedUser?.id, onChange: handleChange, validation: userError ? "error" : undefined, "data-test-id": "user-autocomplete-input", isAutocomplete: true, placeholder: t("service-catalog.change-user-modal.search-placeholder", "Search users..."), renderValue: () => selectedUser?.name || "", inputProps: {
                                        onBlur: handleBlur,
                                        onKeyDown: handleKeyDown,
                                    }, children: displayOptions.length > 0
                                        ? displayOptions.map((option) => (jsxRuntimeExports.jsx(StyledOption, { value: option.id, label: option.name, isDisabled: option.id === "loading" || option.id === "no-results", children: option.email ? (jsxRuntimeExports.jsxs(StyledContainer, { children: [jsxRuntimeExports.jsx(SvgUserCircleStroke, {}), jsxRuntimeExports.jsxs(StyledOptionContent, { children: [jsxRuntimeExports.jsx("span", { children: highlightMatch(option.name, inputValue) }), jsxRuntimeExports.jsx(Option.Meta, { children: jsxRuntimeExports.jsx(Span, { hue: "grey", children: option.email }) })] })] })) : (jsxRuntimeExports.jsx(OptionContent, { children: jsxRuntimeExports.jsx("span", { children: option.name }) })) }, option.id)))
                                        : null }), userError && (jsxRuntimeExports.jsx(Field.Message, { validation: "error", validationLabel: t("service-catalog.validation.error.aria.label", "Error"), children: t("service-catalog.change-user-modal.user-required", "Select a user") }))] }) }) }) }), jsxRuntimeExports.jsxs(StyledModalFooter, { children: [jsxRuntimeExports.jsx(Modal.FooterItem, { children: jsxRuntimeExports.jsx(Button, { onClick: onCancel, isBasic: true, "data-test-id": "cancel-button", children: t("service-catalog.change-user-modal.cancel", "Cancel") }) }), jsxRuntimeExports.jsx(Modal.FooterItem, { children: jsxRuntimeExports.jsx(Button, { isPrimary: true, onClick: handleCreate, disabled: isCreating || !selectedUser, "data-test-id": "change-user-button", children: t("service-catalog.change-user-modal.change-user", "Save") }) })] })] }));
};

const ChangeUserModal = ({ onClose, onCreate, selectedUser, setSelectedUser, }) => {
    const { t } = useTranslation();
    const handleCreate = async (userName, userId) => {
        await onCreate(userName, userId);
    };
    return (jsxRuntimeExports.jsxs(Modal, { onClose: onClose, focusOnMount: false, children: [jsxRuntimeExports.jsx(ChangeUserForm, { onCancel: onClose, onCreate: handleCreate, selectedUser: selectedUser, setSelectedUser: setSelectedUser }), jsxRuntimeExports.jsx(Close$2, { "aria-label": t("service-catalog.change-user-modal.close", "Close dialog") })] }));
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
  margin-inline-end: ${(props) => props.theme.space.xl};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    margin-inline-end: 0;
  }
`;
const ButtonWrapper = styled.div `
  flex: 1;
  padding: ${(props) => props.theme.space.lg};
  border: ${(props) => props.theme.borders.sm}
    ${({ theme }) => getColor({ theme, hue: "grey", shade: 300 })};
  height: fit-content;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    position: sticky;
    top: 0;
    background: ${({ theme }) => getColor({ theme, variable: "background.default" })};
    padding: ${(props) => props.theme.space.lg};
    border: none;
    border-top: ${(props) => props.theme.borders.sm}
      ${({ theme }) => getColor({ theme, hue: "grey", shade: 300 })};
    width: 100vw;
    margin-inline-start: 0;
  }
`;
const RightColumn = styled.div `
  flex: 1;
  margin-inline-start: ${(props) => props.theme.space.xl};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    position: sticky;
    bottom: 0;
    margin-inline-start: 0;
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
  margin-inline-end: ${(props) => props.theme.space.xl};
  min-width: 0;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    margin-inline-end: 0;
  }
`;
const ButtonSkeleton = styled(Skeleton) `
  width: 100%;
  height: 48px;
  display: block;
`;
const UserNameWrapper = styled.div `
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space.xxs};
`;
const ButtonContainer = styled.div `
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const isAssetField$2 = (f) => f.relationship_target_type === ASSET_KEY;
const isAssetTypeField$2 = (f) => f.relationship_target_type === ASSET_TYPE_KEY;
function ItemRequestForm({ requestFields, serviceCatalogItem, baseLocale, hasAtMentions, userRole, userId, requestOnBehalfEnabled, userName, selectedUser, setSelectedUser, brandId, defaultOrganizationId, handleChange, onSubmit, attachmentsOption, attachmentsRequiredError, setAttachmentsRequiredError, isRequestFieldsLoading, isLoadingAttachmentsOption, assetTypeError, assetError, assetTypeHiddenValue, isAssetTypeHidden, assetTypeIds, assetIds, onAttachmentUploadingChange, isFormInitializing, isPreviewMode = false, }) {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = reactExports.useState(false);
    const [displayedUserName, setDisplayedUserName] = reactExports.useState(userName);
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const handleChangeUser = async (newUserName) => {
        setDisplayedUserName(newUserName);
        handleCloseModal();
    };
    const buildLookupFieldOptions = async (records, field) => {
        if (!Array.isArray(records) || records.length === 0)
            return [];
        const options = records.map((rec) => {
            const base = {
                name: rec.name,
                value: rec.id,
                serialNumber: rec.custom_object_fields["standard::serial_number"],
            };
            if (rec.custom_object_key === "standard::itam_asset") {
                const fields = (rec.custom_object_fields ?? {});
                return {
                    ...base,
                    item_asset_type_id: fields["standard::asset_type"] ?? "",
                };
            }
            return { ...base, item_asset_type_id: "" };
        });
        if (isAssetTypeField$2(field)) {
            if (isAssetTypeHidden)
                return [];
            if (!assetTypeIds?.length)
                return [];
            return options.filter((o) => assetTypeIds.includes(o.value));
        }
        if (isAssetField$2(field)) {
            let list = options;
            if (assetIds?.length) {
                list = list.filter((o) => assetIds.includes(o.item_asset_type_id ?? ""));
            }
            return list;
        }
        return options.map(({ name, value, serialNumber }) => ({
            name,
            value,
            serialNumber,
        }));
    };
    const renderLookupFieldOption = (option) => {
        if (option.serialNumber) {
            return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [option.name, jsxRuntimeExports.jsx(Option.Meta, { children: jsxRuntimeExports.jsx(Span, { hue: "grey", children: t("service-catalog.item.serial-number-label", "SN: {{serialNumber}}", { serialNumber: option.serialNumber }) }) })] }));
        }
        return option.name;
    };
    const handleAttachmentsOnUpload = reactExports.useCallback((status) => {
        setAttachmentsRequiredError(null);
        onAttachmentUploadingChange(status);
    }, [setAttachmentsRequiredError, onAttachmentUploadingChange]);
    const renderRequestFields = () => {
        if (isRequestFieldsLoading || isLoadingAttachmentsOption) {
            return null;
        }
        const attachmentsPosition = attachmentsOption?.custom_object_fields?.["standard::position_in_portal"];
        const attachmentsElement = attachmentsOption ? (jsxRuntimeExports.jsx(Attachments, { field: {
                name: AttachmentsInputName,
                label: t("service-catalog.item.attachments-label", "Upload a file"),
                description: attachmentsOption.custom_object_fields["standard::description"] ??
                    "",
                error: attachmentsRequiredError,
                attachments: [],
                isRequired: attachmentsOption.custom_object_fields["standard::is_required"] ??
                    false,
            }, baseLocale: baseLocale, onUploadingChange: handleAttachmentsOnUpload }, "attachments")) : null;
        const elements = [];
        requestFields.forEach((field, index) => {
            if (attachmentsElement &&
                typeof attachmentsPosition === "number" &&
                index === attachmentsPosition) {
                elements.push(attachmentsElement);
            }
            if (isAssetTypeField$2(field) && isAssetTypeHidden) {
                elements.push(jsxRuntimeExports.jsxs(reactExports.Fragment, { children: [jsxRuntimeExports.jsx("input", { type: "hidden", name: field.name, value: assetTypeHiddenValue }), jsxRuntimeExports.jsx("input", { type: "hidden", name: "isAssetTypeHidden", value: "true" })] }, field.id));
                return;
            }
            const customField = {
                ...field,
                error: isAssetField$2(field)
                    ? assetError || field.error
                    : isAssetTypeField$2(field)
                        ? assetTypeError || field.error
                        : field.error,
            };
            elements.push(jsxRuntimeExports.jsx(RequestFormField, { field: customField, baseLocale: baseLocale, hasAtMentions: hasAtMentions, userRole: userRole, userId: userId, brandId: brandId, defaultOrganizationId: defaultOrganizationId, handleChange: handleChange, visibleFields: requestFields, buildLookupFieldOptions: buildLookupFieldOptions, renderLookupFieldOption: renderLookupFieldOption }, field.id));
        });
        if (attachmentsElement &&
            typeof attachmentsPosition === "number" &&
            attachmentsPosition >= requestFields.length) {
            elements.push(attachmentsElement);
        }
        return elements;
    };
    return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsxs(Form, { onSubmit: onSubmit, noValidate: true, children: [jsxRuntimeExports.jsxs(LeftColumn, { children: [jsxRuntimeExports.jsx(CollapsibleDescription, { title: serviceCatalogItem.name, description: serviceCatalogItem.description, thumbnailUrl: serviceCatalogItem.thumbnail_url }), jsxRuntimeExports.jsx(FieldsContainer, { children: renderRequestFields() })] }), jsxRuntimeExports.jsx(RightColumn, { children: jsxRuntimeExports.jsxs(ButtonWrapper, { children: [jsxRuntimeExports.jsxs(ButtonContainer, { children: [jsxRuntimeExports.jsxs(UserNameWrapper, { children: [jsxRuntimeExports.jsx(Span, { isBold: true, children: t("service-catalog.item.user", "User") }), jsxRuntimeExports.jsx(Span, { children: displayedUserName })] }), requestOnBehalfEnabled && (jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: jsxRuntimeExports.jsx(Anchor, { isUnderlined: false, onClick: handleOpenModal, children: t("service-catalog.item.change-user-requesting-on-behalf", "Change") }) }))] }), isFormInitializing ? (jsxRuntimeExports.jsx(ButtonSkeleton, {})) : (jsxRuntimeExports.jsx(Button, { isPrimary: true, size: "large", isStretched: true, type: "submit", disabled: isPreviewMode, title: isPreviewMode
                                        ? t("service-catalog.item.preview-mode.submit-disabled-tooltip", "Submitting requests is disabled while previewing a draft")
                                        : undefined, children: t("service-catalog.item.submit-button", "Submit request") }))] }) })] }), isModalOpen && (jsxRuntimeExports.jsx(ChangeUserModal, { onClose: handleCloseModal, onCreate: handleChangeUser, setSelectedUser: setSelectedUser, selectedUser: selectedUser }))] }));
}

const StyledMenu = styled(Menu) `
  max-width: min(420px, calc(100vw - 32px));

  [data-garden-id="dropdowns.menu.item.content"] {
    min-width: 0;
    flex: 1 1 auto;
    overflow: hidden;
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow-wrap: anywhere;
  }
`;
const StyledItem = styled(Item) `
  white-space: normal;
  overflow-wrap: anywhere;
  word-break: break-word;
`;
function CategorySelector({ categories, selectedCategoryId, onCategoryChange, }) {
    const { t } = useTranslation();
    if (categories.length < 2) {
        return null;
    }
    return (jsxRuntimeExports.jsx(StyledMenu, { button: (props) => (jsxRuntimeExports.jsxs(Button, { ...props, isBasic: true, children: [t("service-catalog.item.change-category", "Change category"), jsxRuntimeExports.jsx(Button.EndIcon, { children: jsxRuntimeExports.jsx(SvgChevronDownStroke, {}) })] })), onChange: ({ value }) => {
            if (value) {
                onCategoryChange(value);
            }
        }, children: jsxRuntimeExports.jsx(ItemGroup, { type: "radio", children: categories.map((cat) => (jsxRuntimeExports.jsxs(StyledItem, { value: cat.id, isSelected: cat.id === selectedCategoryId, children: [cat.name, cat.path?.length > 0 && (jsxRuntimeExports.jsx(Item.Meta, { children: cat.path.join(" > ") }))] }, cat.id))) }) }));
}

const StyledGlobalAlert = styled(GlobalAlert) `
  background: ${({ theme }) => getColor({ theme, hue: "blue", shade: 200 })};
  border-bottom: 1px solid
    ${({ theme }) => getColor({ theme, hue: "blue", shade: 300 })};
  color: ${({ theme }) => getColor({ theme, hue: "blue", shade: 700 })};
  box-shadow: none;

  svg {
    color: ${({ theme }) => getColor({ theme, hue: "blue", shade: 600 })};
  }
`;
const StyledGlobalAlertTitle = styled(GlobalAlert.Title) `
  color: ${({ theme }) => getColor({ theme, hue: "blue", shade: 800 })};
`;
function PreviewModeBanner() {
    const { t } = useTranslation();
    const [portalHost, setPortalHost] = reactExports.useState(null);
    const initialBodyPaddingTopRef = reactExports.useRef("");
    reactExports.useEffect(() => {
        const host = document.createElement("div");
        host.setAttribute("data-preview-mode-banner-host", "true");
        host.style.position = "fixed";
        host.style.top = "0";
        host.style.left = "0";
        host.style.right = "0";
        host.style.zIndex = String(Z_INDEX_ABOVE_NAVBAR);
        initialBodyPaddingTopRef.current = document.body.style.paddingTop;
        document.body.prepend(host);
        setPortalHost(host);
        return () => {
            host.remove();
            document.body.style.paddingTop = initialBodyPaddingTopRef.current;
            setPortalHost(null);
        };
    }, []);
    reactExports.useEffect(() => {
        if (!portalHost) {
            return;
        }
        let lastPadding = "";
        let animationFrameId = null;
        const applyLayout = () => {
            animationFrameId = null;
            const bannerHeight = portalHost.offsetHeight;
            const nextPadding = `${bannerHeight}px`;
            if (nextPadding !== lastPadding) {
                document.body.style.paddingTop = nextPadding;
                lastPadding = nextPadding;
            }
        };
        const scheduleApply = () => {
            if (animationFrameId !== null) {
                return;
            }
            animationFrameId = window.requestAnimationFrame(applyLayout);
        };
        applyLayout();
        let resizeObserver;
        if (typeof ResizeObserver !== "undefined") {
            resizeObserver = new ResizeObserver(scheduleApply);
            resizeObserver.observe(portalHost);
        }
        window.addEventListener("resize", scheduleApply);
        return () => {
            if (animationFrameId !== null) {
                window.cancelAnimationFrame(animationFrameId);
            }
            resizeObserver?.disconnect();
            window.removeEventListener("resize", scheduleApply);
            document.body.style.paddingTop = initialBodyPaddingTopRef.current;
        };
    }, [portalHost]);
    if (!portalHost) {
        return null;
    }
    return reactDomExports.createPortal(jsxRuntimeExports.jsx("div", { "data-testid": "preview-mode-banner", children: jsxRuntimeExports.jsx(StyledGlobalAlert, { type: "info", children: jsxRuntimeExports.jsxs(GlobalAlert.Content, { children: [jsxRuntimeExports.jsx(StyledGlobalAlertTitle, { children: t("service-catalog.item.preview-mode.title", "Preview mode") }), t("service-catalog.item.preview-mode.message", "If you navigate away from this page or click on anything outside of this preview, you'll exit the preview mode.")] }) }) }), portalHost);
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

const getCurrentUser = async () => {
    try {
        const currentUserRequest = await fetch("/api/v2/users/me.json");
        if (!currentUserRequest.ok) {
            throw new Error("Error fetching current user data");
        }
        return await currentUserRequest.json();
    }
    catch (error) {
        throw new Error("Error fetching current user data");
    }
};
async function submitServiceItemRequest(serviceCatalogItem, requestFields, associatedLookupField, attachments, helpCenterPath, categoryLookupField, categoryId, requesterId, onBehalfNoteHtml) {
    try {
        const currentUser = await getCurrentUser();
        const uploadTokens = attachments.map((a) => a.id);
        const customFields = requestFields.map((field) => {
            return {
                id: field.id,
                value: field.value,
            };
        });
        const lookupFields = [
            { id: associatedLookupField.id, value: serviceCatalogItem.id },
        ];
        if (categoryLookupField && categoryId) {
            lookupFields.push({ id: categoryLookupField.id, value: categoryId });
        }
        const submitterId = currentUser.user.id;
        const isRequestingOnBehalf = requesterId != null && requesterId !== submitterId;
        const response = await fetch("/hc/api/v2/service_catalog/requests", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": currentUser.user.authenticity_token,
            },
            body: JSON.stringify({
                request: {
                    item_id: serviceCatalogItem.id,
                    subject: `${serviceCatalogItem.name}`,
                    comment: {
                        html_body: `<a href="${window.location.origin}${helpCenterPath}/services/${serviceCatalogItem.id}" style="text-decoration: underline" target="_blank" rel="noopener noreferrer">${serviceCatalogItem.name}</a>${onBehalfNoteHtml ?? ""}`,
                        uploads: uploadTokens,
                    },
                    custom_fields: [...customFields, ...lookupFields],
                    ...(isRequestingOnBehalf
                        ? { requester_id: requesterId, collaborators: [submitterId] }
                        : {}),
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

function useAttachmentsOption(attachmentsOptionId) {
    const [attachmentsOption, setAttachmentsOption] = reactExports.useState();
    const [isLoadingAttachmentsOption, setIsLoadingAttachmentsOption] = reactExports.useState(false);
    const [errorAttachmentsOption, setErrorAttachmentsOption] = reactExports.useState(null);
    reactExports.useEffect(() => {
        if (!attachmentsOptionId) {
            setAttachmentsOption(undefined);
            setErrorAttachmentsOption(null);
            setIsLoadingAttachmentsOption(false);
            return;
        }
        const fetchAttachmentsOption = async () => {
            setErrorAttachmentsOption(null);
            setIsLoadingAttachmentsOption(false);
            try {
                const response = await fetch(`/api/v2/custom_objects/standard::service_catalog_attachment_option/records/${attachmentsOptionId}`);
                if (response.ok) {
                    const data = await response.json();
                    setAttachmentsOption(data.custom_object_record);
                }
                else {
                    throw new Error("Error fetching service catalog item");
                }
            }
            catch (error) {
                setErrorAttachmentsOption(error);
            }
            finally {
                setIsLoadingAttachmentsOption(false);
            }
        };
        fetchAttachmentsOption();
    }, [attachmentsOptionId]);
    return {
        attachmentsOption,
        errorAttachmentsOption,
        isLoadingAttachmentsOption,
    };
}

function isAssetTypeField$1(field) {
    return field.relationship_target_type === ASSET_TYPE_KEY;
}
function isAssetField$1(field) {
    return field.relationship_target_type === ASSET_KEY;
}
function hasFieldValue(field) {
    const { value } = field;
    if (Array.isArray(value)) {
        return value.length > 0;
    }
    return value !== undefined && value !== null && value !== "";
}
function useValidateServiceItemForm(attachmentsOption) {
    const { t } = useTranslation();
    const validate = reactExports.useCallback((fields, attachments) => {
        const errors = {
            attachments: null,
            assetType: null,
            asset: null,
        };
        if (attachmentsOption) {
            const isRequired = attachmentsOption.custom_object_fields["standard::is_required"];
            if (isRequired && attachments.length === 0) {
                errors.attachments = t("service-catalog.attachments-required-error", "Upload a file to continue.");
            }
        }
        for (const field of fields) {
            if (field.required && !hasFieldValue(field)) {
                if (isAssetTypeField$1(field)) {
                    errors.assetType = t("service-catalog.asset-type-required-error", "Select an asset type");
                }
                else if (isAssetField$1(field)) {
                    errors.asset = t("service-catalog.asset-required-error", "Select an asset");
                }
            }
        }
        const hasError = Boolean(errors.attachments || errors.assetType || errors.asset);
        return { hasError, errors };
    }, [attachmentsOption, t]);
    return { validate };
}

const Container$3 = styled.div `
  display: flex;
  flex-direction: column;
`;
const StyledNotificationLink = styled(Anchor) `
  text-decoration: underline;
  display: block;
  margin-top: ${(props) => props.theme.space.xxs}px;
`;
const isAssetTypeField = (field) => field.relationship_target_type === ASSET_TYPE_KEY;
const isAssetField = (field) => field.relationship_target_type === ASSET_KEY;
function getCategoryIdFromUrl$1() {
    const params = new URLSearchParams(window.location.search);
    return params.get("category_id");
}
function ServiceCatalogItem({ serviceCatalogItemId, baseLocale, hasAtMentions, userRole, organizations, userId, brandId, userName, helpCenterPath, }) {
    const { serviceCatalogItem, errorFetchingItem } = useServiceCatalogItem(serviceCatalogItemId);
    const { requestFields, associatedLookupField, categoryLookupField, error, setRequestFields, handleChange, isRequestFieldsLoading, assetTypeHiddenValue, isAssetTypeHidden, assetTypeIds, assetIds, } = useItemFormFields(serviceCatalogItem, baseLocale);
    const { t } = useTranslation();
    const [selectedCategoryId, setSelectedCategoryId] = reactExports.useState(null);
    const [selectedUser, setSelectedUser] = reactExports.useState(null);
    reactExports.useEffect(() => {
        if (!serviceCatalogItem?.categories?.length)
            return;
        const urlCategoryId = getCategoryIdFromUrl$1();
        const matchesUrl = serviceCatalogItem.categories.find((c) => c.id === urlCategoryId);
        setSelectedCategoryId(matchesUrl ? matchesUrl.id : serviceCatalogItem.categories[0]?.id ?? null);
    }, [serviceCatalogItem]);
    const handleCategoryChange = reactExports.useCallback((categoryId) => {
        setSelectedCategoryId(categoryId);
        const params = new URLSearchParams(window.location.search);
        params.set("category_id", categoryId);
        window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);
    }, []);
    const attachmentsOptionId = serviceCatalogItem?.custom_object_fields?.["standard::attachment_option"];
    const requestOnBehalfEnabled = serviceCatalogItem?.is_request_on_behalf;
    const { attachmentsOption, errorAttachmentsOption, isLoadingAttachmentsOption, } = useAttachmentsOption(attachmentsOptionId);
    const { validate } = useValidateServiceItemForm(attachmentsOption);
    const [attachmentsRequiredError, setAttachmentsRequiredError] = reactExports.useState(null);
    const [assetTypeError, setAssetTypeError] = reactExports.useState(null);
    const [assetError, setAssetError] = reactExports.useState(null);
    const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
    const [isUploadingAttachments, setIsUploadingAttachments] = reactExports.useState(false);
    reactExports.useEffect(() => {
        const handlePageShow = (e) => {
            if (e.persisted) {
                setIsSubmitting(false);
            }
        };
        window.addEventListener("pageshow", handlePageShow);
        return () => window.removeEventListener("pageshow", handlePageShow);
    }, []);
    const hasCategories = (serviceCatalogItem?.categories?.length ?? 0) > 0;
    const hasResolvedCategory = !hasCategories || !!selectedCategoryId;
    const isFormInitializing = !serviceCatalogItem ||
        isRequestFieldsLoading ||
        isLoadingAttachmentsOption ||
        !hasResolvedCategory;
    const hasPreviewQueryParam = typeof window !== "undefined" &&
        new URLSearchParams(window.location.search).get(PREVIEW_MODE_QUERY_PARAM) === PREVIEW_MODE_QUERY_PARAM_VALUE;
    // Before the API resolves we trust the URL param to avoid a flicker; once
    // the item is known, draft state is authoritative — published items never
    // show preview UI even if the URL accidentally carries the param.
    const isPreviewMode = serviceCatalogItem
        ? serviceCatalogItem.published_at === null
        : hasPreviewQueryParam;
    reactExports.useEffect(() => {
        if (typeof document === "undefined" || !isPreviewMode) {
            return undefined;
        }
        document.documentElement.classList.add(PREVIEW_MODE_HTML_CLASS);
        return () => {
            document.documentElement.classList.remove(PREVIEW_MODE_HTML_CLASS);
        };
    }, [isPreviewMode]);
    reactExports.useEffect(() => {
        if (typeof window === "undefined" || !serviceCatalogItem) {
            return;
        }
        const url = new URL(window.location.href);
        const isDraft = serviceCatalogItem.published_at === null;
        const urlHasParam = url.searchParams.get(PREVIEW_MODE_QUERY_PARAM) ===
            PREVIEW_MODE_QUERY_PARAM_VALUE;
        if (isDraft && !urlHasParam) {
            url.searchParams.set(PREVIEW_MODE_QUERY_PARAM, PREVIEW_MODE_QUERY_PARAM_VALUE);
            window.history.replaceState(null, "", url.toString());
        }
        else if (!isDraft && urlHasParam) {
            url.searchParams.delete(PREVIEW_MODE_QUERY_PARAM);
            window.history.replaceState(null, "", url.toString());
        }
    }, [serviceCatalogItem]);
    const canSubmit = !isPreviewMode &&
        !isFormInitializing &&
        !isSubmitting &&
        !isUploadingAttachments &&
        !!serviceCatalogItem &&
        !!associatedLookupField;
    const handleFieldChange = (field, value) => {
        if (isAssetTypeField(field) && value) {
            setAssetTypeError(null);
        }
        else if (isAssetField(field) && value) {
            setAssetError(null);
        }
        handleChange(field, value);
    };
    if (error) {
        throw error;
    }
    if (errorFetchingItem) {
        throw errorFetchingItem;
    }
    if (errorAttachmentsOption) {
        throw errorAttachmentsOption;
    }
    function parseAttachments(formData) {
        return formData
            .getAll(AttachmentsInputName)
            .filter((a) => typeof a === "string")
            .map((a) => JSON.parse(a));
    }
    function validateForm(fields, attachments) {
        const { hasError, errors } = validate(fields, attachments);
        setAttachmentsRequiredError(errors.attachments);
        setAssetTypeError(errors.assetType);
        setAssetError(errors.asset);
        return hasError;
    }
    function notifySubmitError(message) {
        notify({
            type: "error",
            title: t("service-catalog.item.service-request-error-title", "Service couldn't be submitted"),
            message: message ??
                t("service-catalog.item.service-request-error-message", "Give it a moment and try it again"),
        });
    }
    async function handleValidationErrors(response) {
        const errorData = await response.json();
        const invalidFieldErrors = errorData?.details?.base ?? [];
        const missingErrorFields = invalidFieldErrors.filter((errorField) => !requestFields.some((field) => field.id === errorField.field_key));
        if (missingErrorFields.length > 0) {
            notifySubmitError(jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [t("service-catalog.item.service-request-refresh-message", "Refresh the page and try again in a few seconds."), " ", jsxRuntimeExports.jsx(StyledNotificationLink, { href: `${helpCenterPath}/services/${serviceCatalogItem.id}`, children: t("service-catalog.item.service-request-refresh-link-text", "Refresh the page") })] }));
        }
        else if (invalidFieldErrors.length > 0) {
            notifySubmitError();
        }
        const updatedFields = requestFields.map((field) => {
            const errorField = invalidFieldErrors.find((errorField) => errorField.field_key === field.id);
            return { ...field, error: errorField?.description || null };
        });
        setRequestFields(updatedFields);
    }
    async function handleSubmitError(response) {
        if (response?.status === 422) {
            try {
                await handleValidationErrors(response);
            }
            catch {
                notifySubmitError();
            }
        }
        else {
            notifySubmitError();
        }
    }
    const handleRequestSubmit = async (e) => {
        e.preventDefault();
        // Submitting requests is not allowed while previewing a draft. Bail out
        // silently so the admin doesn't see a misleading error toast.
        if (isPreviewMode) {
            return;
        }
        if (!canSubmit) {
            notifySubmitError();
            return;
        }
        const form = e.currentTarget;
        const formData = new FormData(form);
        const isAssetTypeFieldHidden = formData.get("isAssetTypeHidden") === "true";
        const attachments = parseAttachments(formData);
        const requestFieldsWithFormData = requestFields.map((field) => {
            if (isAssetTypeField(field) && isAssetTypeFieldHidden) {
                return {
                    ...field,
                    value: formData.get(field.name),
                };
            }
            return field;
        });
        if (validateForm(requestFieldsWithFormData, attachments)) {
            return;
        }
        if (!serviceCatalogItem || !associatedLookupField) {
            return;
        }
        setIsSubmitting(true);
        try {
            const isRequestingOnBehalf = selectedUser != null && Number(selectedUser.id) !== userId;
            const requesterId = isRequestingOnBehalf ? Number(selectedUser.id) : null;
            const onBehalfNoteHtml = isRequestingOnBehalf && selectedUser
                ? `<p style="margin:0;padding:0">${t("service-catalog.item.submitter-label", "Submitter: {{name}}", { name: userName })}</p><p style="margin:0;padding:0">${t("service-catalog.item.user-label", "User: {{name}}", { name: selectedUser.name })}</p>`
                : null;
            const response = await submitServiceItemRequest(serviceCatalogItem, requestFieldsWithFormData, associatedLookupField, attachments, helpCenterPath, categoryLookupField, selectedCategoryId, requesterId, onBehalfNoteHtml);
            if (response?.ok) {
                addFlashNotification({
                    type: "success",
                    message: t("service-catalog.item.service-request-submitted", "Service request submitted"),
                });
                const data = await response.json();
                window.location.href = `${helpCenterPath}/requests/${data.request.id}`;
                return;
            }
            await handleSubmitError(response);
        }
        catch {
            // caught by handleSubmitError in most cases, this handles unexpected errors
        }
        setIsSubmitting(false);
    };
    const defaultOrganizationId = organizations.length > 0 && organizations[0]?.id
        ? organizations[0]?.id?.toString()
        : null;
    const [categorySelectorContainer, setCategorySelectorContainer] = reactExports.useState(null);
    reactExports.useEffect(() => {
        setCategorySelectorContainer(document.getElementById("category-selector"));
    }, []);
    return (jsxRuntimeExports.jsxs(Container$3, { children: [isPreviewMode && jsxRuntimeExports.jsx(PreviewModeBanner, {}), categorySelectorContainer &&
                serviceCatalogItem &&
                selectedCategoryId &&
                serviceCatalogItem.categories.length > 0 &&
                reactDomExports.createPortal(jsxRuntimeExports.jsx(CategorySelector, { categories: serviceCatalogItem.categories, selectedCategoryId: selectedCategoryId, onCategoryChange: handleCategoryChange }), categorySelectorContainer), serviceCatalogItem && (jsxRuntimeExports.jsx(ItemRequestForm, { requestFields: requestFields, isRequestFieldsLoading: isRequestFieldsLoading, isLoadingAttachmentsOption: isLoadingAttachmentsOption, serviceCatalogItem: serviceCatalogItem, baseLocale: baseLocale, hasAtMentions: hasAtMentions, userRole: userRole, userId: userId, requestOnBehalfEnabled: requestOnBehalfEnabled, userName: userName, selectedUser: selectedUser, setSelectedUser: setSelectedUser, brandId: brandId, defaultOrganizationId: defaultOrganizationId, handleChange: handleFieldChange, onSubmit: handleRequestSubmit, attachmentsOption: attachmentsOption, attachmentsRequiredError: attachmentsRequiredError, setAttachmentsRequiredError: setAttachmentsRequiredError, assetTypeError: assetTypeError, assetError: assetError, assetTypeHiddenValue: assetTypeHiddenValue, isAssetTypeHidden: isAssetTypeHidden, assetTypeIds: assetTypeIds, assetIds: assetIds, onAttachmentUploadingChange: setIsUploadingAttachments, isFormInitializing: isFormInitializing, isPreviewMode: isPreviewMode }))] }));
}

function __variableDynamicImportRuntime2__$1(path) {
  switch (path) {
    case '../shared/translations/locales/af.json': return import('shared').then(function (n) { return n.aX; });
    case '../shared/translations/locales/ar-x-pseudo.json': return import('shared').then(function (n) { return n.aY; });
    case '../shared/translations/locales/ar.json': return import('shared').then(function (n) { return n.aZ; });
    case '../shared/translations/locales/az.json': return import('shared').then(function (n) { return n.a_; });
    case '../shared/translations/locales/be.json': return import('shared').then(function (n) { return n.a$; });
    case '../shared/translations/locales/bg.json': return import('shared').then(function (n) { return n.b0; });
    case '../shared/translations/locales/bn.json': return import('shared').then(function (n) { return n.b1; });
    case '../shared/translations/locales/bs.json': return import('shared').then(function (n) { return n.b2; });
    case '../shared/translations/locales/ca.json': return import('shared').then(function (n) { return n.b3; });
    case '../shared/translations/locales/cs.json': return import('shared').then(function (n) { return n.b4; });
    case '../shared/translations/locales/cy.json': return import('shared').then(function (n) { return n.b5; });
    case '../shared/translations/locales/da.json': return import('shared').then(function (n) { return n.b6; });
    case '../shared/translations/locales/de-de.json': return import('shared').then(function (n) { return n.b7; });
    case '../shared/translations/locales/de-x-informal.json': return import('shared').then(function (n) { return n.b8; });
    case '../shared/translations/locales/de.json': return import('shared').then(function (n) { return n.b9; });
    case '../shared/translations/locales/el.json': return import('shared').then(function (n) { return n.ba; });
    case '../shared/translations/locales/en-001.json': return import('shared').then(function (n) { return n.bb; });
    case '../shared/translations/locales/en-150.json': return import('shared').then(function (n) { return n.bc; });
    case '../shared/translations/locales/en-au.json': return import('shared').then(function (n) { return n.bd; });
    case '../shared/translations/locales/en-ca.json': return import('shared').then(function (n) { return n.be; });
    case '../shared/translations/locales/en-gb.json': return import('shared').then(function (n) { return n.bf; });
    case '../shared/translations/locales/en-my.json': return import('shared').then(function (n) { return n.bg; });
    case '../shared/translations/locales/en-ph.json': return import('shared').then(function (n) { return n.bh; });
    case '../shared/translations/locales/en-se.json': return import('shared').then(function (n) { return n.bi; });
    case '../shared/translations/locales/en-us.json': return import('shared').then(function (n) { return n.bj; });
    case '../shared/translations/locales/en-x-dev.json': return import('shared').then(function (n) { return n.bk; });
    case '../shared/translations/locales/en-x-keys.json': return import('shared').then(function (n) { return n.bl; });
    case '../shared/translations/locales/en-x-obsolete.json': return import('shared').then(function (n) { return n.bm; });
    case '../shared/translations/locales/en-x-pseudo.json': return import('shared').then(function (n) { return n.bn; });
    case '../shared/translations/locales/en-x-test.json': return import('shared').then(function (n) { return n.bo; });
    case '../shared/translations/locales/es-419.json': return import('shared').then(function (n) { return n.bp; });
    case '../shared/translations/locales/es-ar.json': return import('shared').then(function (n) { return n.bq; });
    case '../shared/translations/locales/es-cl.json': return import('shared').then(function (n) { return n.br; });
    case '../shared/translations/locales/es-es.json': return import('shared').then(function (n) { return n.bs; });
    case '../shared/translations/locales/es-mx.json': return import('shared').then(function (n) { return n.bt; });
    case '../shared/translations/locales/es-pe.json': return import('shared').then(function (n) { return n.bu; });
    case '../shared/translations/locales/es.json': return import('shared').then(function (n) { return n.bv; });
    case '../shared/translations/locales/et.json': return import('shared').then(function (n) { return n.bw; });
    case '../shared/translations/locales/eu.json': return import('shared').then(function (n) { return n.bx; });
    case '../shared/translations/locales/fa-af.json': return import('shared').then(function (n) { return n.by; });
    case '../shared/translations/locales/fa.json': return import('shared').then(function (n) { return n.bz; });
    case '../shared/translations/locales/fi.json': return import('shared').then(function (n) { return n.bA; });
    case '../shared/translations/locales/fil.json': return import('shared').then(function (n) { return n.bB; });
    case '../shared/translations/locales/fo.json': return import('shared').then(function (n) { return n.bC; });
    case '../shared/translations/locales/fr-ca.json': return import('shared').then(function (n) { return n.bD; });
    case '../shared/translations/locales/fr-dz.json': return import('shared').then(function (n) { return n.bE; });
    case '../shared/translations/locales/fr-mu.json': return import('shared').then(function (n) { return n.bF; });
    case '../shared/translations/locales/fr.json': return import('shared').then(function (n) { return n.bG; });
    case '../shared/translations/locales/ga.json': return import('shared').then(function (n) { return n.bH; });
    case '../shared/translations/locales/he.json': return import('shared').then(function (n) { return n.bI; });
    case '../shared/translations/locales/hi.json': return import('shared').then(function (n) { return n.bJ; });
    case '../shared/translations/locales/hr.json': return import('shared').then(function (n) { return n.bK; });
    case '../shared/translations/locales/hu.json': return import('shared').then(function (n) { return n.bL; });
    case '../shared/translations/locales/hy.json': return import('shared').then(function (n) { return n.bM; });
    case '../shared/translations/locales/id.json': return import('shared').then(function (n) { return n.bN; });
    case '../shared/translations/locales/is.json': return import('shared').then(function (n) { return n.bO; });
    case '../shared/translations/locales/it-ch.json': return import('shared').then(function (n) { return n.bP; });
    case '../shared/translations/locales/it.json': return import('shared').then(function (n) { return n.bQ; });
    case '../shared/translations/locales/ja.json': return import('shared').then(function (n) { return n.bR; });
    case '../shared/translations/locales/ka.json': return import('shared').then(function (n) { return n.bS; });
    case '../shared/translations/locales/kk.json': return import('shared').then(function (n) { return n.bT; });
    case '../shared/translations/locales/kl-dk.json': return import('shared').then(function (n) { return n.bU; });
    case '../shared/translations/locales/km.json': return import('shared').then(function (n) { return n.bV; });
    case '../shared/translations/locales/ko.json': return import('shared').then(function (n) { return n.bW; });
    case '../shared/translations/locales/ku.json': return import('shared').then(function (n) { return n.bX; });
    case '../shared/translations/locales/ky.json': return import('shared').then(function (n) { return n.bY; });
    case '../shared/translations/locales/lt.json': return import('shared').then(function (n) { return n.bZ; });
    case '../shared/translations/locales/lv.json': return import('shared').then(function (n) { return n.b_; });
    case '../shared/translations/locales/mk.json': return import('shared').then(function (n) { return n.b$; });
    case '../shared/translations/locales/mn.json': return import('shared').then(function (n) { return n.c0; });
    case '../shared/translations/locales/ms.json': return import('shared').then(function (n) { return n.c1; });
    case '../shared/translations/locales/mt.json': return import('shared').then(function (n) { return n.c2; });
    case '../shared/translations/locales/my.json': return import('shared').then(function (n) { return n.c3; });
    case '../shared/translations/locales/ne.json': return import('shared').then(function (n) { return n.c4; });
    case '../shared/translations/locales/nl-be.json': return import('shared').then(function (n) { return n.c5; });
    case '../shared/translations/locales/nl.json': return import('shared').then(function (n) { return n.c6; });
    case '../shared/translations/locales/no.json': return import('shared').then(function (n) { return n.c7; });
    case '../shared/translations/locales/pl.json': return import('shared').then(function (n) { return n.c8; });
    case '../shared/translations/locales/pt-br.json': return import('shared').then(function (n) { return n.c9; });
    case '../shared/translations/locales/pt.json': return import('shared').then(function (n) { return n.ca; });
    case '../shared/translations/locales/ro-md.json': return import('shared').then(function (n) { return n.cb; });
    case '../shared/translations/locales/ro.json': return import('shared').then(function (n) { return n.cc; });
    case '../shared/translations/locales/ru.json': return import('shared').then(function (n) { return n.cd; });
    case '../shared/translations/locales/si.json': return import('shared').then(function (n) { return n.ce; });
    case '../shared/translations/locales/sk.json': return import('shared').then(function (n) { return n.cf; });
    case '../shared/translations/locales/sl.json': return import('shared').then(function (n) { return n.cg; });
    case '../shared/translations/locales/sq.json': return import('shared').then(function (n) { return n.ch; });
    case '../shared/translations/locales/sr-me.json': return import('shared').then(function (n) { return n.ci; });
    case '../shared/translations/locales/sr.json': return import('shared').then(function (n) { return n.cj; });
    case '../shared/translations/locales/sv.json': return import('shared').then(function (n) { return n.ck; });
    case '../shared/translations/locales/sw-ke.json': return import('shared').then(function (n) { return n.cl; });
    case '../shared/translations/locales/ta.json': return import('shared').then(function (n) { return n.cm; });
    case '../shared/translations/locales/th.json': return import('shared').then(function (n) { return n.cn; });
    case '../shared/translations/locales/tr.json': return import('shared').then(function (n) { return n.co; });
    case '../shared/translations/locales/uk.json': return import('shared').then(function (n) { return n.cp; });
    case '../shared/translations/locales/ur-pk.json': return import('shared').then(function (n) { return n.cq; });
    case '../shared/translations/locales/ur.json': return import('shared').then(function (n) { return n.cr; });
    case '../shared/translations/locales/uz.json': return import('shared').then(function (n) { return n.cs; });
    case '../shared/translations/locales/vi.json': return import('shared').then(function (n) { return n.ct; });
    case '../shared/translations/locales/zh-cn.json': return import('shared').then(function (n) { return n.cu; });
    case '../shared/translations/locales/zh-tw.json': return import('shared').then(function (n) { return n.cv; });
    default: return new Promise(function(resolve, reject) {
      (typeof queueMicrotask === 'function' ? queueMicrotask : setTimeout)(
        reject.bind(null, new Error("Unknown variable dynamic import: " + path))
      );
    })
   }
 }

function __variableDynamicImportRuntime1__$1(path) {
  switch (path) {
    case '../ticket-fields/translations/locales/af.json': return import('ticket-fields').then(function (n) { return n.b; });
    case '../ticket-fields/translations/locales/ar-x-pseudo.json': return import('ticket-fields').then(function (n) { return n.c; });
    case '../ticket-fields/translations/locales/ar.json': return import('ticket-fields').then(function (n) { return n.d; });
    case '../ticket-fields/translations/locales/az.json': return import('ticket-fields').then(function (n) { return n.e; });
    case '../ticket-fields/translations/locales/be.json': return import('ticket-fields').then(function (n) { return n.f; });
    case '../ticket-fields/translations/locales/bg.json': return import('ticket-fields').then(function (n) { return n.h; });
    case '../ticket-fields/translations/locales/bn.json': return import('ticket-fields').then(function (n) { return n.i; });
    case '../ticket-fields/translations/locales/bs.json': return import('ticket-fields').then(function (n) { return n.j; });
    case '../ticket-fields/translations/locales/ca.json': return import('ticket-fields').then(function (n) { return n.k; });
    case '../ticket-fields/translations/locales/cs.json': return import('ticket-fields').then(function (n) { return n.l; });
    case '../ticket-fields/translations/locales/cy.json': return import('ticket-fields').then(function (n) { return n.m; });
    case '../ticket-fields/translations/locales/da.json': return import('ticket-fields').then(function (n) { return n.n; });
    case '../ticket-fields/translations/locales/de-de.json': return import('ticket-fields').then(function (n) { return n.o; });
    case '../ticket-fields/translations/locales/de-x-informal.json': return import('ticket-fields').then(function (n) { return n.p; });
    case '../ticket-fields/translations/locales/de.json': return import('ticket-fields').then(function (n) { return n.q; });
    case '../ticket-fields/translations/locales/el.json': return import('ticket-fields').then(function (n) { return n.r; });
    case '../ticket-fields/translations/locales/en-001.json': return import('ticket-fields').then(function (n) { return n.s; });
    case '../ticket-fields/translations/locales/en-150.json': return import('ticket-fields').then(function (n) { return n.t; });
    case '../ticket-fields/translations/locales/en-au.json': return import('ticket-fields').then(function (n) { return n.u; });
    case '../ticket-fields/translations/locales/en-ca.json': return import('ticket-fields').then(function (n) { return n.v; });
    case '../ticket-fields/translations/locales/en-gb.json': return import('ticket-fields').then(function (n) { return n.w; });
    case '../ticket-fields/translations/locales/en-my.json': return import('ticket-fields').then(function (n) { return n.x; });
    case '../ticket-fields/translations/locales/en-ph.json': return import('ticket-fields').then(function (n) { return n.y; });
    case '../ticket-fields/translations/locales/en-se.json': return import('ticket-fields').then(function (n) { return n.z; });
    case '../ticket-fields/translations/locales/en-us.json': return import('ticket-fields').then(function (n) { return n.B; });
    case '../ticket-fields/translations/locales/en-x-dev.json': return import('ticket-fields').then(function (n) { return n.C; });
    case '../ticket-fields/translations/locales/en-x-keys.json': return import('ticket-fields').then(function (n) { return n.E; });
    case '../ticket-fields/translations/locales/en-x-obsolete.json': return import('ticket-fields').then(function (n) { return n.F; });
    case '../ticket-fields/translations/locales/en-x-pseudo.json': return import('ticket-fields').then(function (n) { return n.G; });
    case '../ticket-fields/translations/locales/en-x-test.json': return import('ticket-fields').then(function (n) { return n.H; });
    case '../ticket-fields/translations/locales/es-419.json': return import('ticket-fields').then(function (n) { return n.J; });
    case '../ticket-fields/translations/locales/es-ar.json': return import('ticket-fields').then(function (n) { return n.K; });
    case '../ticket-fields/translations/locales/es-cl.json': return import('ticket-fields').then(function (n) { return n.L; });
    case '../ticket-fields/translations/locales/es-es.json': return import('ticket-fields').then(function (n) { return n.M; });
    case '../ticket-fields/translations/locales/es-mx.json': return import('ticket-fields').then(function (n) { return n.N; });
    case '../ticket-fields/translations/locales/es-pe.json': return import('ticket-fields').then(function (n) { return n.O; });
    case '../ticket-fields/translations/locales/es.json': return import('ticket-fields').then(function (n) { return n.P; });
    case '../ticket-fields/translations/locales/et.json': return import('ticket-fields').then(function (n) { return n.Q; });
    case '../ticket-fields/translations/locales/eu.json': return import('ticket-fields').then(function (n) { return n.S; });
    case '../ticket-fields/translations/locales/fa-af.json': return import('ticket-fields').then(function (n) { return n.U; });
    case '../ticket-fields/translations/locales/fa.json': return import('ticket-fields').then(function (n) { return n.V; });
    case '../ticket-fields/translations/locales/fi.json': return import('ticket-fields').then(function (n) { return n.W; });
    case '../ticket-fields/translations/locales/fil.json': return import('ticket-fields').then(function (n) { return n.X; });
    case '../ticket-fields/translations/locales/fo.json': return import('ticket-fields').then(function (n) { return n.Y; });
    case '../ticket-fields/translations/locales/fr-ca.json': return import('ticket-fields').then(function (n) { return n.Z; });
    case '../ticket-fields/translations/locales/fr-dz.json': return import('ticket-fields').then(function (n) { return n._; });
    case '../ticket-fields/translations/locales/fr-mu.json': return import('ticket-fields').then(function (n) { return n.$; });
    case '../ticket-fields/translations/locales/fr.json': return import('ticket-fields').then(function (n) { return n.a0; });
    case '../ticket-fields/translations/locales/ga.json': return import('ticket-fields').then(function (n) { return n.a1; });
    case '../ticket-fields/translations/locales/he.json': return import('ticket-fields').then(function (n) { return n.a2; });
    case '../ticket-fields/translations/locales/hi.json': return import('ticket-fields').then(function (n) { return n.a3; });
    case '../ticket-fields/translations/locales/hr.json': return import('ticket-fields').then(function (n) { return n.a4; });
    case '../ticket-fields/translations/locales/hu.json': return import('ticket-fields').then(function (n) { return n.a5; });
    case '../ticket-fields/translations/locales/hy.json': return import('ticket-fields').then(function (n) { return n.a6; });
    case '../ticket-fields/translations/locales/id.json': return import('ticket-fields').then(function (n) { return n.a7; });
    case '../ticket-fields/translations/locales/is.json': return import('ticket-fields').then(function (n) { return n.a8; });
    case '../ticket-fields/translations/locales/it-ch.json': return import('ticket-fields').then(function (n) { return n.a9; });
    case '../ticket-fields/translations/locales/it.json': return import('ticket-fields').then(function (n) { return n.aa; });
    case '../ticket-fields/translations/locales/ja.json': return import('ticket-fields').then(function (n) { return n.ab; });
    case '../ticket-fields/translations/locales/ka.json': return import('ticket-fields').then(function (n) { return n.ac; });
    case '../ticket-fields/translations/locales/kk.json': return import('ticket-fields').then(function (n) { return n.ad; });
    case '../ticket-fields/translations/locales/kl-dk.json': return import('ticket-fields').then(function (n) { return n.ae; });
    case '../ticket-fields/translations/locales/km.json': return import('ticket-fields').then(function (n) { return n.af; });
    case '../ticket-fields/translations/locales/ko.json': return import('ticket-fields').then(function (n) { return n.ag; });
    case '../ticket-fields/translations/locales/ku.json': return import('ticket-fields').then(function (n) { return n.ah; });
    case '../ticket-fields/translations/locales/ky.json': return import('ticket-fields').then(function (n) { return n.ai; });
    case '../ticket-fields/translations/locales/lt.json': return import('ticket-fields').then(function (n) { return n.aj; });
    case '../ticket-fields/translations/locales/lv.json': return import('ticket-fields').then(function (n) { return n.ak; });
    case '../ticket-fields/translations/locales/mk.json': return import('ticket-fields').then(function (n) { return n.al; });
    case '../ticket-fields/translations/locales/mn.json': return import('ticket-fields').then(function (n) { return n.am; });
    case '../ticket-fields/translations/locales/ms.json': return import('ticket-fields').then(function (n) { return n.an; });
    case '../ticket-fields/translations/locales/mt.json': return import('ticket-fields').then(function (n) { return n.ao; });
    case '../ticket-fields/translations/locales/my.json': return import('ticket-fields').then(function (n) { return n.ap; });
    case '../ticket-fields/translations/locales/ne.json': return import('ticket-fields').then(function (n) { return n.aq; });
    case '../ticket-fields/translations/locales/nl-be.json': return import('ticket-fields').then(function (n) { return n.ar; });
    case '../ticket-fields/translations/locales/nl.json': return import('ticket-fields').then(function (n) { return n.as; });
    case '../ticket-fields/translations/locales/no.json': return import('ticket-fields').then(function (n) { return n.at; });
    case '../ticket-fields/translations/locales/pl.json': return import('ticket-fields').then(function (n) { return n.au; });
    case '../ticket-fields/translations/locales/pt-br.json': return import('ticket-fields').then(function (n) { return n.av; });
    case '../ticket-fields/translations/locales/pt.json': return import('ticket-fields').then(function (n) { return n.aw; });
    case '../ticket-fields/translations/locales/ro-md.json': return import('ticket-fields').then(function (n) { return n.ax; });
    case '../ticket-fields/translations/locales/ro.json': return import('ticket-fields').then(function (n) { return n.ay; });
    case '../ticket-fields/translations/locales/ru.json': return import('ticket-fields').then(function (n) { return n.az; });
    case '../ticket-fields/translations/locales/si.json': return import('ticket-fields').then(function (n) { return n.aA; });
    case '../ticket-fields/translations/locales/sk.json': return import('ticket-fields').then(function (n) { return n.aB; });
    case '../ticket-fields/translations/locales/sl.json': return import('ticket-fields').then(function (n) { return n.aC; });
    case '../ticket-fields/translations/locales/sq.json': return import('ticket-fields').then(function (n) { return n.aD; });
    case '../ticket-fields/translations/locales/sr-me.json': return import('ticket-fields').then(function (n) { return n.aE; });
    case '../ticket-fields/translations/locales/sr.json': return import('ticket-fields').then(function (n) { return n.aF; });
    case '../ticket-fields/translations/locales/sv.json': return import('ticket-fields').then(function (n) { return n.aG; });
    case '../ticket-fields/translations/locales/sw-ke.json': return import('ticket-fields').then(function (n) { return n.aH; });
    case '../ticket-fields/translations/locales/ta.json': return import('ticket-fields').then(function (n) { return n.aI; });
    case '../ticket-fields/translations/locales/th.json': return import('ticket-fields').then(function (n) { return n.aJ; });
    case '../ticket-fields/translations/locales/tr.json': return import('ticket-fields').then(function (n) { return n.aK; });
    case '../ticket-fields/translations/locales/uk.json': return import('ticket-fields').then(function (n) { return n.aL; });
    case '../ticket-fields/translations/locales/ur-pk.json': return import('ticket-fields').then(function (n) { return n.aM; });
    case '../ticket-fields/translations/locales/ur.json': return import('ticket-fields').then(function (n) { return n.aN; });
    case '../ticket-fields/translations/locales/uz.json': return import('ticket-fields').then(function (n) { return n.aO; });
    case '../ticket-fields/translations/locales/vi.json': return import('ticket-fields').then(function (n) { return n.aP; });
    case '../ticket-fields/translations/locales/zh-cn.json': return import('ticket-fields').then(function (n) { return n.aQ; });
    case '../ticket-fields/translations/locales/zh-tw.json': return import('ticket-fields').then(function (n) { return n.aR; });
    default: return new Promise(function(resolve, reject) {
      (typeof queueMicrotask === 'function' ? queueMicrotask : setTimeout)(
        reject.bind(null, new Error("Unknown variable dynamic import: " + path))
      );
    })
   }
 }

function __variableDynamicImportRuntime0__$1(path) {
  switch (path) {
    case './translations/locales/af.json': return import('service-catalog-translations').then(function (n) { return n.a; });
    case './translations/locales/ar-x-pseudo.json': return import('service-catalog-translations').then(function (n) { return n.b; });
    case './translations/locales/ar.json': return import('service-catalog-translations').then(function (n) { return n.c; });
    case './translations/locales/az.json': return import('service-catalog-translations').then(function (n) { return n.d; });
    case './translations/locales/be.json': return import('service-catalog-translations').then(function (n) { return n.e; });
    case './translations/locales/bg.json': return import('service-catalog-translations').then(function (n) { return n.f; });
    case './translations/locales/bn.json': return import('service-catalog-translations').then(function (n) { return n.g; });
    case './translations/locales/bs.json': return import('service-catalog-translations').then(function (n) { return n.h; });
    case './translations/locales/ca.json': return import('service-catalog-translations').then(function (n) { return n.i; });
    case './translations/locales/cs.json': return import('service-catalog-translations').then(function (n) { return n.j; });
    case './translations/locales/cy.json': return import('service-catalog-translations').then(function (n) { return n.k; });
    case './translations/locales/da.json': return import('service-catalog-translations').then(function (n) { return n.l; });
    case './translations/locales/de-de.json': return import('service-catalog-translations').then(function (n) { return n.m; });
    case './translations/locales/de-x-informal.json': return import('service-catalog-translations').then(function (n) { return n.n; });
    case './translations/locales/de.json': return import('service-catalog-translations').then(function (n) { return n.o; });
    case './translations/locales/el.json': return import('service-catalog-translations').then(function (n) { return n.p; });
    case './translations/locales/en-001.json': return import('service-catalog-translations').then(function (n) { return n.q; });
    case './translations/locales/en-150.json': return import('service-catalog-translations').then(function (n) { return n.r; });
    case './translations/locales/en-au.json': return import('service-catalog-translations').then(function (n) { return n.s; });
    case './translations/locales/en-ca.json': return import('service-catalog-translations').then(function (n) { return n.t; });
    case './translations/locales/en-gb.json': return import('service-catalog-translations').then(function (n) { return n.u; });
    case './translations/locales/en-my.json': return import('service-catalog-translations').then(function (n) { return n.v; });
    case './translations/locales/en-ph.json': return import('service-catalog-translations').then(function (n) { return n.w; });
    case './translations/locales/en-se.json': return import('service-catalog-translations').then(function (n) { return n.x; });
    case './translations/locales/en-us.json': return import('service-catalog-translations').then(function (n) { return n.y; });
    case './translations/locales/en-x-dev.json': return import('service-catalog-translations').then(function (n) { return n.z; });
    case './translations/locales/en-x-keys.json': return import('service-catalog-translations').then(function (n) { return n.A; });
    case './translations/locales/en-x-obsolete.json': return import('service-catalog-translations').then(function (n) { return n.B; });
    case './translations/locales/en-x-pseudo.json': return import('service-catalog-translations').then(function (n) { return n.C; });
    case './translations/locales/en-x-test.json': return import('service-catalog-translations').then(function (n) { return n.D; });
    case './translations/locales/es-419.json': return import('service-catalog-translations').then(function (n) { return n.E; });
    case './translations/locales/es-ar.json': return import('service-catalog-translations').then(function (n) { return n.F; });
    case './translations/locales/es-cl.json': return import('service-catalog-translations').then(function (n) { return n.G; });
    case './translations/locales/es-es.json': return import('service-catalog-translations').then(function (n) { return n.H; });
    case './translations/locales/es-mx.json': return import('service-catalog-translations').then(function (n) { return n.I; });
    case './translations/locales/es-pe.json': return import('service-catalog-translations').then(function (n) { return n.J; });
    case './translations/locales/es.json': return import('service-catalog-translations').then(function (n) { return n.K; });
    case './translations/locales/et.json': return import('service-catalog-translations').then(function (n) { return n.L; });
    case './translations/locales/eu.json': return import('service-catalog-translations').then(function (n) { return n.M; });
    case './translations/locales/fa-af.json': return import('service-catalog-translations').then(function (n) { return n.N; });
    case './translations/locales/fa.json': return import('service-catalog-translations').then(function (n) { return n.O; });
    case './translations/locales/fi.json': return import('service-catalog-translations').then(function (n) { return n.P; });
    case './translations/locales/fil.json': return import('service-catalog-translations').then(function (n) { return n.Q; });
    case './translations/locales/fo.json': return import('service-catalog-translations').then(function (n) { return n.R; });
    case './translations/locales/fr-ca.json': return import('service-catalog-translations').then(function (n) { return n.S; });
    case './translations/locales/fr-dz.json': return import('service-catalog-translations').then(function (n) { return n.T; });
    case './translations/locales/fr-mu.json': return import('service-catalog-translations').then(function (n) { return n.U; });
    case './translations/locales/fr.json': return import('service-catalog-translations').then(function (n) { return n.V; });
    case './translations/locales/ga.json': return import('service-catalog-translations').then(function (n) { return n.W; });
    case './translations/locales/he.json': return import('service-catalog-translations').then(function (n) { return n.X; });
    case './translations/locales/hi.json': return import('service-catalog-translations').then(function (n) { return n.Y; });
    case './translations/locales/hr.json': return import('service-catalog-translations').then(function (n) { return n.Z; });
    case './translations/locales/hu.json': return import('service-catalog-translations').then(function (n) { return n._; });
    case './translations/locales/hy.json': return import('service-catalog-translations').then(function (n) { return n.$; });
    case './translations/locales/id.json': return import('service-catalog-translations').then(function (n) { return n.a0; });
    case './translations/locales/is.json': return import('service-catalog-translations').then(function (n) { return n.a1; });
    case './translations/locales/it-ch.json': return import('service-catalog-translations').then(function (n) { return n.a2; });
    case './translations/locales/it.json': return import('service-catalog-translations').then(function (n) { return n.a3; });
    case './translations/locales/ja.json': return import('service-catalog-translations').then(function (n) { return n.a4; });
    case './translations/locales/ka.json': return import('service-catalog-translations').then(function (n) { return n.a5; });
    case './translations/locales/kk.json': return import('service-catalog-translations').then(function (n) { return n.a6; });
    case './translations/locales/kl-dk.json': return import('service-catalog-translations').then(function (n) { return n.a7; });
    case './translations/locales/km.json': return import('service-catalog-translations').then(function (n) { return n.a8; });
    case './translations/locales/ko.json': return import('service-catalog-translations').then(function (n) { return n.a9; });
    case './translations/locales/ku.json': return import('service-catalog-translations').then(function (n) { return n.aa; });
    case './translations/locales/ky.json': return import('service-catalog-translations').then(function (n) { return n.ab; });
    case './translations/locales/lt.json': return import('service-catalog-translations').then(function (n) { return n.ac; });
    case './translations/locales/lv.json': return import('service-catalog-translations').then(function (n) { return n.ad; });
    case './translations/locales/mk.json': return import('service-catalog-translations').then(function (n) { return n.ae; });
    case './translations/locales/mn.json': return import('service-catalog-translations').then(function (n) { return n.af; });
    case './translations/locales/ms.json': return import('service-catalog-translations').then(function (n) { return n.ag; });
    case './translations/locales/mt.json': return import('service-catalog-translations').then(function (n) { return n.ah; });
    case './translations/locales/my.json': return import('service-catalog-translations').then(function (n) { return n.ai; });
    case './translations/locales/ne.json': return import('service-catalog-translations').then(function (n) { return n.aj; });
    case './translations/locales/nl-be.json': return import('service-catalog-translations').then(function (n) { return n.ak; });
    case './translations/locales/nl.json': return import('service-catalog-translations').then(function (n) { return n.al; });
    case './translations/locales/no.json': return import('service-catalog-translations').then(function (n) { return n.am; });
    case './translations/locales/pl.json': return import('service-catalog-translations').then(function (n) { return n.an; });
    case './translations/locales/pt-br.json': return import('service-catalog-translations').then(function (n) { return n.ao; });
    case './translations/locales/pt.json': return import('service-catalog-translations').then(function (n) { return n.ap; });
    case './translations/locales/ro-md.json': return import('service-catalog-translations').then(function (n) { return n.aq; });
    case './translations/locales/ro.json': return import('service-catalog-translations').then(function (n) { return n.ar; });
    case './translations/locales/ru.json': return import('service-catalog-translations').then(function (n) { return n.as; });
    case './translations/locales/si.json': return import('service-catalog-translations').then(function (n) { return n.at; });
    case './translations/locales/sk.json': return import('service-catalog-translations').then(function (n) { return n.au; });
    case './translations/locales/sl.json': return import('service-catalog-translations').then(function (n) { return n.av; });
    case './translations/locales/sq.json': return import('service-catalog-translations').then(function (n) { return n.aw; });
    case './translations/locales/sr-me.json': return import('service-catalog-translations').then(function (n) { return n.ax; });
    case './translations/locales/sr.json': return import('service-catalog-translations').then(function (n) { return n.ay; });
    case './translations/locales/sv.json': return import('service-catalog-translations').then(function (n) { return n.az; });
    case './translations/locales/sw-ke.json': return import('service-catalog-translations').then(function (n) { return n.aA; });
    case './translations/locales/ta.json': return import('service-catalog-translations').then(function (n) { return n.aB; });
    case './translations/locales/th.json': return import('service-catalog-translations').then(function (n) { return n.aC; });
    case './translations/locales/tr.json': return import('service-catalog-translations').then(function (n) { return n.aD; });
    case './translations/locales/uk.json': return import('service-catalog-translations').then(function (n) { return n.aE; });
    case './translations/locales/ur-pk.json': return import('service-catalog-translations').then(function (n) { return n.aF; });
    case './translations/locales/ur.json': return import('service-catalog-translations').then(function (n) { return n.aG; });
    case './translations/locales/uz.json': return import('service-catalog-translations').then(function (n) { return n.aH; });
    case './translations/locales/vi.json': return import('service-catalog-translations').then(function (n) { return n.aI; });
    case './translations/locales/zh-cn.json': return import('service-catalog-translations').then(function (n) { return n.aJ; });
    case './translations/locales/zh-tw.json': return import('service-catalog-translations').then(function (n) { return n.aK; });
    default: return new Promise(function(resolve, reject) {
      (typeof queueMicrotask === 'function' ? queueMicrotask : setTimeout)(
        reject.bind(null, new Error("Unknown variable dynamic import: " + path))
      );
    })
   }
 }
async function renderServiceCatalogItem(container, settings, props) {
    const { baseLocale, helpCenterPath } = props;
    initI18next(baseLocale);
    await loadTranslations(baseLocale, [
        () => __variableDynamicImportRuntime0__$1(`./translations/locales/${baseLocale}.json`),
        () => __variableDynamicImportRuntime1__$1(`../ticket-fields/translations/locales/${baseLocale}.json`),
        () => __variableDynamicImportRuntime2__$1(`../shared/translations/locales/${baseLocale}.json`),
    ]);
    reactDomExports.render(jsxRuntimeExports.jsx(ThemeProviders, { theme: createTheme(settings), children: jsxRuntimeExports.jsx(ErrorBoundary, { helpCenterPath: helpCenterPath, children: jsxRuntimeExports.jsx(ServiceCatalogItem, { ...props }) }) }), container);
}

const ALL_SERVICES_ID = "all-categories-virtual-id";
const UNCATEGORIZED_ID = "uncategorized-virtual-id";

const MAX_NESTING_LEVEL = 6;
const INDENT_PER_LEVEL = 20;
const BASE_PADDING_LEFT = 32;
const ARROW_MARGIN_LEFT = 12;
const CategoryItemWrapper = styled.div `
  width: 100%;
`;
const CategoryItemContainer = styled.div `
  display: flex;
  align-items: center;
  width: 100%;
  padding-left: ${(props) => {
    const level = Math.min(props.$nestingLevel, MAX_NESTING_LEVEL);
    return `${level * INDENT_PER_LEVEL}px`;
}};
`;
const StyledSidebarItem = styled.div `
  display: flex;
  align-items: center;
  height: 40px;
  padding-right: 12px;
  padding-left: ${(props) => {
    const level = Math.min(props.$nestingLevel, MAX_NESTING_LEVEL);
    const baseOffset = BASE_PADDING_LEFT + level * INDENT_PER_LEVEL;
    return props.$hasChildren ? `${ARROW_MARGIN_LEFT}px` : `${baseOffset}px`;
}};
  cursor: pointer;
  background-color: ${(props) => props.$active
    ? `${getColor({ theme: props.theme, hue: "blue", shade: 600 })}33`
    : "transparent"};
  border-radius: 4px;

  &:hover {
    background-color: ${(props) => props.$active
    ? `${getColor({ theme: props.theme, hue: "blue", shade: 600 })}47`
    : `${getColor({ theme: props.theme, hue: "blue", shade: 600 })}14`};
  }

  &:focus {
    outline: none;
    box-shadow: inset 0 0 0 2px
      ${(props) => getColor({ theme: props.theme, hue: "blue", shade: 600 })};
  }

  &:focus:not(:focus-visible) {
    box-shadow: none;
  }

  &:focus-visible {
    box-shadow: inset 0 0 0 2px
      ${(props) => getColor({ theme: props.theme, hue: "blue", shade: 600 })};
  }
`;
const ExpandButton = styled.button `
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 12px;
  height: 12px;
  margin-right: 8px;
  color: ${({ theme }) => getColor({ theme, hue: "grey", shade: 600 })};
  flex-shrink: 0;

  &:hover {
    color: ${({ theme }) => getColor({ theme, hue: "grey", shade: 800 })};
  }

  svg {
    width: 12px;
    height: 12px;
  }
`;
const ItemContent = styled.div `
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
  gap: 8px;
`;
const SidebarItemName = styled.span `
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const ItemCount = styled.span `
  flex-shrink: 0;
  color: ${({ theme }) => getColor({ theme, hue: "grey", shade: 600 })};
`;
const CategoryItem = ({ category, nestingLevel, expandedCategories, onToggleExpand, selectedCategoryId, onSelect, }) => {
    const hasChildren = (category.children?.length ?? 0) > 0;
    const isExpanded = expandedCategories.has(category.id);
    const isAllServices = category.id === ALL_SERVICES_ID;
    const isUncategorized = category.id === UNCATEGORIZED_ID;
    const isSelected = selectedCategoryId === category.id;
    const { t } = useTranslation();
    const displayName = isAllServices
        ? t("service-catalog-sidebar.all-services", "All services")
        : isUncategorized
            ? t("service-catalog-sidebar.uncategorized", "Uncategorized")
            : category.name;
    const handleExpandClick = (e) => {
        e.stopPropagation();
        onToggleExpand(category.id);
    };
    return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(CategoryItemWrapper, { children: jsxRuntimeExports.jsx(StyledSidebarItem, { "$active": isSelected, "$nestingLevel": nestingLevel, "$hasChildren": hasChildren, onClick: () => onSelect(category.id), tabIndex: 0, role: "button", onKeyDown: (e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            onSelect(category.id);
                        }
                    }, "data-test-id": isAllServices
                        ? "sidebar-all-services"
                        : `sidebar-category-${category.id}`, children: jsxRuntimeExports.jsxs(CategoryItemContainer, { "$nestingLevel": hasChildren ? nestingLevel : 0, children: [hasChildren && (jsxRuntimeExports.jsx(ExpandButton, { onClick: handleExpandClick, "aria-label": isExpanded
                                    ? t("service-catalog-sidebar.collapse-category", "Collapse category")
                                    : t("service-catalog-sidebar.expand-category", "Expand category"), type: "button", children: isExpanded ? jsxRuntimeExports.jsx(SvgChevronUpFill$1, {}) : jsxRuntimeExports.jsx(SvgChevronDownFill$1, {}) })), jsxRuntimeExports.jsxs(ItemContent, { children: [jsxRuntimeExports.jsx(SidebarItemName, { children: displayName }), typeof category.items_count === "number" && (jsxRuntimeExports.jsx(ItemCount, { children: category.items_count }))] })] }) }) }), hasChildren && isExpanded && (jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: category.children?.map((child) => (jsxRuntimeExports.jsx(CategoryItem, { category: child, nestingLevel: nestingLevel + 1, selectedCategoryId: selectedCategoryId, onSelect: onSelect, expandedCategories: expandedCategories, onToggleExpand: onToggleExpand }, child.id))) }))] }));
};

const SIDEBAR_WIDTH = 250;
function findCategoryById(categories, id) {
    for (const category of categories) {
        if (category.id === id)
            return category;
        if (category.children?.length) {
            const found = findCategoryById(category.children, id);
            if (found)
                return found;
        }
    }
    return null;
}
function findAncestorIds(categories, targetId) {
    for (const category of categories) {
        if (category.id === targetId) {
            return [];
        }
        if (category.children?.length) {
            const path = findAncestorIds(category.children, targetId);
            if (path !== null) {
                return [category.id, ...path];
            }
        }
    }
    return null;
}

const Container$2 = styled.div `
  width: ${SIDEBAR_WIDTH}px;
`;
const ServiceCatalogCategoriesSidebar = ({ categories, selectedCategoryId, onSelect }) => {
    const [expandedCategories, setExpandedCategories] = reactExports.useState(new Set());
    const handleToggleExpand = reactExports.useCallback((categoryId) => {
        setExpandedCategories((prev) => {
            const next = new Set(prev);
            if (next.has(categoryId)) {
                next.delete(categoryId);
            }
            else {
                next.add(categoryId);
            }
            return next;
        });
    }, []);
    const handleCategorySelect = reactExports.useCallback((categoryId) => {
        const params = new URLSearchParams(window.location.search);
        params.set("category_id", categoryId);
        window.history.pushState({}, "", `${window.location.pathname}?${params.toString()}`);
        const ancestors = findAncestorIds(categories, categoryId);
        if (ancestors?.length) {
            setExpandedCategories((prev) => {
                const next = new Set(prev);
                for (const id of ancestors) {
                    next.add(id);
                }
                return next;
            });
        }
        onSelect(categoryId);
    }, [categories, onSelect]);
    reactExports.useEffect(() => {
        if (selectedCategoryId) {
            const ancestors = findAncestorIds(categories, selectedCategoryId);
            if (ancestors?.length) {
                setExpandedCategories((prev) => {
                    const next = new Set(prev);
                    for (const id of ancestors) {
                        next.add(id);
                    }
                    return next;
                });
            }
            return;
        }
        const firstCategory = categories[0];
        if (firstCategory) {
            onSelect(firstCategory.id);
        }
    }, [categories, selectedCategoryId, onSelect]);
    return (jsxRuntimeExports.jsx(Container$2, { children: jsxRuntimeExports.jsx("div", { children: categories.map((category) => (jsxRuntimeExports.jsx(CategoryItem, { category: category, nestingLevel: 0, selectedCategoryId: selectedCategoryId, onSelect: handleCategorySelect, expandedCategories: expandedCategories, onToggleExpand: handleToggleExpand }, category.id))) }) }));
};

const ItemContainer = styled.div `
  height: 100%;
`;
const ItemLink = styled.a `
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: ${(props) => props.theme.borderRadii.md};
  padding: ${(props) => props.theme.space.md};
  border: ${(props) => props.theme.borders.sm}
    ${({ theme }) => getColor({ theme, hue: "grey", shade: 300 })};
  color: ${({ theme }) => getColor({ theme, variable: "foreground.default" })};

  &:hover {
    border-color: ${(props) => props.theme.colors.primaryHue};
  }

  &:hover,
  &:visited {
    text-decoration: none;
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
  color: ${({ theme }) => getColor({ theme, variable: "foreground.default" })};
  margin-top: ${(props) => props.theme.space.sm};
`;
const ServiceCatalogListItem = ({ serviceItem, helpCenterPath, selectedCategoryId, }) => {
    const itemUrl = selectedCategoryId
        ? `${helpCenterPath}/services/${serviceItem.id}?category_id=${selectedCategoryId}`
        : `${helpCenterPath}/services/${serviceItem.id}`;
    const decodeToText = (htmlString) => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = htmlString;
        return tempDiv.textContent || tempDiv.innerText || "";
    };
    const titleText = reactExports.useMemo(() => decodeToText(serviceItem.name || ""), [serviceItem.name]);
    const cleanText = reactExports.useMemo(() => decodeToText(serviceItem.description || ""), [serviceItem.description]);
    return (jsxRuntimeExports.jsx(ItemContainer, { "data-testid": "service-catalog-list-item-container", children: jsxRuntimeExports.jsxs(ItemLink, { href: itemUrl, children: [jsxRuntimeExports.jsx(ItemThumbnail, { size: "medium", url: serviceItem.thumbnail_url }), jsxRuntimeExports.jsxs(TextContainer$1, { children: [jsxRuntimeExports.jsx(ItemTitle, { children: titleText }), jsxRuntimeExports.jsx(ItemDescription, { children: cleanText })] })] }) }));
};

const SkeletonCard = styled.div `
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => getColor({ theme, hue: "grey", shade: 300 })};
  height: 100%;
  border-radius: ${(props) => props.theme.borderRadii.md};
  padding: ${(props) => props.theme.space.md};
  border: ${(props) => props.theme.borders.sm}
    ${({ theme }) => getColor({ theme, hue: "grey", shade: 300 })};
`;
const ServiceCatalogListItemSkeleton = () => {
    return (jsxRuntimeExports.jsx(SkeletonCard, { "aria-hidden": "true", "data-testid": "service-catalog-list-item-skeleton", children: jsxRuntimeExports.jsx(Skeleton, { width: "100%", height: "140px" }) }));
};

const StyledGrid$2 = styled(Grid) `
  padding: 0;
`;
const StyledCol$2 = styled(Grid.Col) `
  @media (min-width: 0px) {
    margin-bottom: ${(props) => props.theme.space.md};
  }
`;
const DEFAULT_SKELETON_COUNT = 8;
const LoadingState = ({ count = DEFAULT_SKELETON_COUNT, }) => {
    const safeCount = Math.max(1, count);
    return (jsxRuntimeExports.jsx(StyledGrid$2, { children: jsxRuntimeExports.jsx(Grid.Row, { wrap: "wrap", children: Array.from({ length: safeCount }, (_, index) => (jsxRuntimeExports.jsx(StyledCol$2, { xs: 12, sm: 6, md: 4, lg: 3, children: jsxRuntimeExports.jsx(ServiceCatalogListItemSkeleton, {}) }, index))) }) }));
};

const Container$1 = styled.div `
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
const EmptyState = ({ helpCenterPath, searchInputValue, }) => {
    const handleRedirect = () => {
        window.location.href = helpCenterPath;
    };
    const { t } = useTranslation();
    return (jsxRuntimeExports.jsxs(Container$1, { children: [jsxRuntimeExports.jsxs(TextContainer, { children: [jsxRuntimeExports.jsx(LG, { children: t("service-catalog.empty-state.no-services", "No services in sight") }), searchInputValue === "" ? (jsxRuntimeExports.jsx(MD, { children: t("service-catalog.empty-state.description", "Once services are added to catalog, you'll find them here.") })) : (jsxRuntimeExports.jsx(MD, { children: t("service-catalog.empty-state.search-description", "Enter your keywords in the search field.") }))] }), searchInputValue === "" && (jsxRuntimeExports.jsx(Button, { isPrimary: true, onClick: handleRedirect, children: t("service-catalog.empty-state.go-to-homepage", "Go to the homepage") }))] }));
};

const StyledIconButton = styled(IconButton) `
  position: absolute;
  top: 4px;
  inset-inline-end: 4px;
`;
const SearchClearIcon = ({ onChange }) => {
    const { t } = useTranslation();
    return (jsxRuntimeExports.jsx(Tooltip, { content: t("service-catalog.clear-search", "Clear search"), placement: "bottom", size: "small", children: jsxRuntimeExports.jsx(StyledIconButton, { "aria-label": t("service-catalog.clear-search", "Clear search"), size: "small", focusInset: true, onClick: () => onChange(""), children: jsxRuntimeExports.jsx(SvgXStroke, {}) }) }));
};

const StyledField = styled(Field$1) `
  align-items: center;
  width: 320px;
  @media (max-width: 768px) {
    width: 100%;
    display: flex;
  }
`;
const StyledMediaInput = styled(MediaInput) `
  padding-inline-end: ${(props) => props.theme.space.base * 7}px;
`;
const Search = ({ searchInputValue, isLoading, onChange, }) => {
    const { t } = useTranslation();
    return (jsxRuntimeExports.jsxs(StyledField, { children: [jsxRuntimeExports.jsx(StyledField.Label, { hidden: true, children: t("service-catalog.search-services", "Search for services") }), jsxRuntimeExports.jsx(StyledMediaInput, { start: jsxRuntimeExports.jsx(SvgSearchStroke, {}), type: "search", autoComplete: "off", end: isLoading && searchInputValue ? jsxRuntimeExports.jsx(Dots, {}) : undefined, value: searchInputValue, placeholder: t("service-catalog.search-services", "Search for services"), onChange: (event) => onChange(event.target.value) }), !isLoading && searchInputValue && (jsxRuntimeExports.jsx(SearchClearIcon, { onChange: onChange }))] }));
};

const PAGE_SIZE = 16;
function useServiceCatalogItems() {
    const [meta, setMeta] = reactExports.useState(null);
    const [count, setCount] = reactExports.useState(0);
    const [isLoading, setIsLoading] = reactExports.useState(true);
    const [error, setError] = reactExports.useState(null);
    const [serviceCatalogItems, setServiceCatalogItems] = reactExports.useState([]);
    const fetchData = reactExports.useCallback(async (searchInputValue, currentCursor, categoryId, sortParams) => {
        setIsLoading(true);
        const searchParams = new URLSearchParams();
        searchParams.set("page[size]", PAGE_SIZE.toString());
        if (currentCursor) {
            const [cursorKey, cursorValue] = currentCursor.split("=");
            cursorKey && cursorValue && searchParams.set(cursorKey, cursorValue);
        }
        if (searchInputValue) {
            searchParams.set("query", searchInputValue);
        }
        if (categoryId) {
            searchParams.set("category_id", String(categoryId));
        }
        if (sortParams) {
            searchParams.set("sort_by", sortParams.sort_by);
            searchParams.set("sort_order", sortParams.sort_order);
        }
        try {
            const response = await fetch(`/api/v2/help_center/service_catalog/items/search?${searchParams.toString()}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setMeta(data.meta);
            setServiceCatalogItems(data.service_catalog_items);
            setCount(data.count);
        }
        catch (error) {
            setError(error);
        }
        finally {
            setIsLoading(false);
        }
    }, []);
    return {
        serviceCatalogItems,
        meta,
        count,
        isLoading,
        errorFetchingItems: error,
        fetchServiceCatalogItems: fetchData,
    };
}

const DEFAULT_SORT_OPTION = "name_asc";
const SORT_URL_PARAM = "sort";
const VALID_SORT_OPTIONS = new Set([
    "name_asc",
    "name_desc",
    "created_at_desc",
]);
function isValidSortOption(value) {
    return (typeof value === "string" && VALID_SORT_OPTIONS.has(value));
}
function getSortFromUrl(search = window.location.search) {
    const params = new URLSearchParams(search);
    const value = params.get(SORT_URL_PARAM);
    return isValidSortOption(value) ? value : DEFAULT_SORT_OPTION;
}
function getSortParams(option) {
    switch (option) {
        case "name_asc":
            return { sort_by: "name", sort_order: "asc" };
        case "name_desc":
            return { sort_by: "name", sort_order: "desc" };
        case "created_at_desc":
            return { sort_by: "created_at", sort_order: "desc" };
    }
}
const StyledButton = styled(Button) `
  white-space: nowrap;
`;
function SortMenu({ selectedOption, onChange }) {
    const { t } = useTranslation();
    const optionLabels = {
        name_asc: t("service-catalog.sort.name-asc", "A-Z"),
        name_desc: t("service-catalog.sort.name-desc", "Z-A"),
        created_at_desc: t("service-catalog.sort.newest", "Newest"),
    };
    return (jsxRuntimeExports.jsx(Menu, { button: (props) => (jsxRuntimeExports.jsxs(StyledButton, { ...props, isBasic: true, size: "small", children: [optionLabels[selectedOption], jsxRuntimeExports.jsx(Button.EndIcon, { children: jsxRuntimeExports.jsx(SvgChevronDownStroke, {}) })] })), onChange: ({ value }) => {
            if (value) {
                onChange(value);
            }
        }, children: jsxRuntimeExports.jsxs(ItemGroup, { type: "radio", "aria-label": t("service-catalog.sort.aria-label", "Sort services"), children: [jsxRuntimeExports.jsx(Item, { value: "name_asc", isSelected: selectedOption === "name_asc", children: optionLabels.name_asc }), jsxRuntimeExports.jsx(Item, { value: "name_desc", isSelected: selectedOption === "name_desc", children: optionLabels.name_desc }), jsxRuntimeExports.jsx(Item, { value: "created_at_desc", isSelected: selectedOption === "created_at_desc", children: optionLabels.created_at_desc })] }) }));
}

const StyledCol$1 = styled(Grid.Col) `
  margin-bottom: ${(props) => props.theme.space.md};
`;
const Container = styled.div `
  gap: ${(props) => `${props.theme.space.base * 6}px`};
  display: flex;
  flex-direction: column;
`;
const StyledGrid$1 = styled(Grid) `
  padding: 0;
`;
const CategoryHeading = styled(XL).attrs({ tag: "h2", isBold: true }) `
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 600px;
`;
const CountAndSortRow = styled.div `
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${(props) => props.theme.space.sm};
  flex-wrap: wrap;
`;
function getApiCategoryId(selectedCategoryId) {
    if (!selectedCategoryId)
        return null;
    if (selectedCategoryId === ALL_SERVICES_ID)
        return null;
    return selectedCategoryId;
}
function updateSortUrlParam(sortOption) {
    const params = new URLSearchParams(window.location.search);
    if (sortOption === DEFAULT_SORT_OPTION) {
        params.delete(SORT_URL_PARAM);
    }
    else {
        params.set(SORT_URL_PARAM, sortOption);
    }
    const query = params.toString();
    const newUrl = query
        ? `${window.location.pathname}?${query}`
        : window.location.pathname;
    window.history.pushState({}, "", newUrl);
}
function ServiceCatalogList({ helpCenterPath, selectedCategoryId, selectedCategoryName, }) {
    const [searchInputValue, setSearchInputValue] = reactExports.useState("");
    const searchInputValueRef = reactExports.useRef(searchInputValue);
    searchInputValueRef.current = searchInputValue;
    const [sortOption, setSortOption] = reactExports.useState(getSortFromUrl);
    const sortOptionRef = reactExports.useRef(sortOption);
    sortOptionRef.current = sortOption;
    reactExports.useEffect(() => {
        const handlePopState = () => {
            const nextSort = getSortFromUrl();
            if (nextSort !== sortOptionRef.current) {
                setSortOption(nextSort);
            }
        };
        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, []);
    const { t } = useTranslation();
    const { serviceCatalogItems, meta, count, isLoading, errorFetchingItems, fetchServiceCatalogItems, } = useServiceCatalogItems();
    reactExports.useEffect(() => {
        if (!errorFetchingItems)
            return;
        notify({
            title: t("service-catalog.service-list-error-title", "Services couldn't be loaded"),
            message: t("service-catalog.service-list-error-message", "Give it a moment and try it again"),
            type: "error",
        });
    }, [errorFetchingItems, t]);
    if (errorFetchingItems) {
        throw errorFetchingItems;
    }
    const debouncedUpdateServiceCatalogItems = reactExports.useMemo(() => debounce((value, cursor, categoryId, sort) => fetchServiceCatalogItems(value, cursor, categoryId, getSortParams(sort)), 300), [fetchServiceCatalogItems]);
    const apiCategoryId = getApiCategoryId(selectedCategoryId);
    const fetchedCategoryRef = reactExports.useRef(apiCategoryId);
    const isCategoryChanging = fetchedCategoryRef.current !== apiCategoryId;
    const previousItemsCountRef = reactExports.useRef(0);
    if (!isLoading) {
        previousItemsCountRef.current = serviceCatalogItems.length;
    }
    const skeletonCount = isCategoryChanging
        ? undefined
        : previousItemsCountRef.current || undefined;
    reactExports.useEffect(() => {
        debouncedUpdateServiceCatalogItems.cancel();
        fetchedCategoryRef.current = apiCategoryId;
        fetchServiceCatalogItems(searchInputValueRef.current, null, apiCategoryId, getSortParams(sortOption));
    }, [
        fetchServiceCatalogItems,
        apiCategoryId,
        sortOption,
        debouncedUpdateServiceCatalogItems,
    ]);
    reactExports.useEffect(() => {
        return () => debouncedUpdateServiceCatalogItems.cancel();
    }, [debouncedUpdateServiceCatalogItems]);
    const handleNextClick = () => {
        if (meta?.after_cursor) {
            fetchServiceCatalogItems(searchInputValue, "page[after]=" + meta.after_cursor, apiCategoryId, getSortParams(sortOption));
        }
    };
    const handlePreviousClick = () => {
        if (meta?.before_cursor) {
            fetchServiceCatalogItems(searchInputValue, "page[before]=" + meta.before_cursor, apiCategoryId, getSortParams(sortOption));
        }
    };
    const handleInputChange = (value) => {
        setSearchInputValue(value);
        debouncedUpdateServiceCatalogItems(value, null, apiCategoryId, sortOption);
    };
    const handleSortChange = (option) => {
        if (option === sortOption)
            return;
        updateSortUrlParam(option);
        setSortOption(option);
    };
    const categoryHeading = selectedCategoryName === ALL_SERVICES_ID
        ? t("service-catalog-sidebar.all-services", "All services")
        : selectedCategoryName === UNCATEGORIZED_ID
            ? t("service-catalog-sidebar.uncategorized", "Uncategorized")
            : selectedCategoryName;
    return (jsxRuntimeExports.jsxs(Container, { children: [categoryHeading && jsxRuntimeExports.jsx(CategoryHeading, { children: categoryHeading }), jsxRuntimeExports.jsx(Search, { searchInputValue: searchInputValue, isLoading: isLoading, onChange: handleInputChange }), !isCategoryChanging && (jsxRuntimeExports.jsxs(CountAndSortRow, { children: [jsxRuntimeExports.jsx("span", { children: t("service-catalog.service-count", "{{count}} services", {
                            "defaultValue.one": "{{count}} service",
                            count,
                        }) }), jsxRuntimeExports.jsx(SortMenu, { selectedOption: sortOption, onChange: handleSortChange })] })), isLoading || isCategoryChanging ? (jsxRuntimeExports.jsx(LoadingState, { count: skeletonCount })) : (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(StyledGrid$1, { children: jsxRuntimeExports.jsx(Grid.Row, { wrap: "wrap", children: serviceCatalogItems.map((record) => (jsxRuntimeExports.jsx(StyledCol$1, { xs: 12, sm: 6, md: 4, lg: 3, children: jsxRuntimeExports.jsx(ServiceCatalogListItem, { serviceItem: record, helpCenterPath: helpCenterPath, selectedCategoryId: apiCategoryId }) }, record.id))) }) }), serviceCatalogItems.length === 0 && (jsxRuntimeExports.jsx(EmptyState, { helpCenterPath: helpCenterPath, searchInputValue: searchInputValue })), meta && (meta.before_cursor || meta.after_cursor) && (jsxRuntimeExports.jsxs(CursorPagination, { children: [jsxRuntimeExports.jsx(CursorPagination.Previous, { onClick: handlePreviousClick, disabled: meta.before_cursor === null, children: t("service-catalog.pagination.previous", "Previous") }), jsxRuntimeExports.jsx(CursorPagination.Next, { onClick: handleNextClick, disabled: meta.after_cursor === null, children: t("service-catalog.pagination.next", "Next") })] }))] }))] }));
}

function filterUncategorized(categories) {
    return categories.filter((cat) => cat.id !== UNCATEGORIZED_ID);
}
function getCategoryIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("category_id");
}
const ServiceCatalogPage = ({ helpCenterPath, categoryTree, }) => {
    const hasCategories = categoryTree.length > 0;
    const [selectedCategoryId, setSelectedCategoryId] = reactExports.useState(getCategoryIdFromUrl);
    reactExports.useEffect(() => {
        const handlePopState = () => {
            setSelectedCategoryId(getCategoryIdFromUrl());
        };
        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, []);
    const selectedCategoryName = reactExports.useMemo(() => {
        if (!selectedCategoryId || !hasCategories)
            return null;
        if (selectedCategoryId === ALL_SERVICES_ID)
            return ALL_SERVICES_ID;
        if (selectedCategoryId === UNCATEGORIZED_ID)
            return UNCATEGORIZED_ID;
        const category = findCategoryById(categoryTree, selectedCategoryId);
        return category?.name ?? null;
    }, [selectedCategoryId, categoryTree, hasCategories]);
    const handleCategorySelect = reactExports.useCallback((categoryId) => {
        setSelectedCategoryId(categoryId);
    }, []);
    return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [hasCategories && (jsxRuntimeExports.jsx("aside", { className: "service-catalog-sidebar", children: jsxRuntimeExports.jsx(ServiceCatalogCategoriesSidebar, { categories: filterUncategorized(categoryTree), selectedCategoryId: selectedCategoryId, onSelect: handleCategorySelect }) })), jsxRuntimeExports.jsx("main", { className: "service-catalog-list", children: jsxRuntimeExports.jsx(ServiceCatalogList, { helpCenterPath: helpCenterPath, selectedCategoryId: hasCategories ? selectedCategoryId : null, selectedCategoryName: selectedCategoryName }) })] }));
};

const SidebarContainer = styled.div `
  width: ${SIDEBAR_WIDTH}px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const ContentContainer = styled.div `
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${(props) => `${props.theme.space.base * 6}px`};
`;
const StyledGrid = styled(Grid) `
  padding: 0;
`;
const StyledCol = styled(Grid.Col) `
  @media (min-width: 0px) {
    margin-bottom: ${(props) => props.theme.space.md};
  }
`;
const SidebarSkeleton = () => (jsxRuntimeExports.jsxs(SidebarContainer, { children: [jsxRuntimeExports.jsx(Skeleton, { width: "100%", height: "40px" }), jsxRuntimeExports.jsx(Skeleton, { width: "100%", height: "40px" }), jsxRuntimeExports.jsx(Skeleton, { width: "100%", height: "40px" }), jsxRuntimeExports.jsx(Skeleton, { width: "80%", height: "40px" }), jsxRuntimeExports.jsx(Skeleton, { width: "80%", height: "40px" }), jsxRuntimeExports.jsx(Skeleton, { width: "100%", height: "40px" })] }));
const ContentSkeleton = () => (jsxRuntimeExports.jsxs(ContentContainer, { children: [jsxRuntimeExports.jsx(Skeleton, { width: "200px", height: "28px" }), jsxRuntimeExports.jsx(Skeleton, { width: "320px", height: "40px" }), jsxRuntimeExports.jsx(Skeleton, { width: "120px", height: "20px" }), jsxRuntimeExports.jsx(StyledGrid, { children: jsxRuntimeExports.jsxs(Grid.Row, { wrap: "wrap", children: [jsxRuntimeExports.jsx(StyledCol, { xs: 12, sm: 6, md: 4, lg: 3, children: jsxRuntimeExports.jsx(Skeleton, { width: "100%", height: "140px" }) }), jsxRuntimeExports.jsx(StyledCol, { xs: 12, sm: 6, md: 4, lg: 3, children: jsxRuntimeExports.jsx(Skeleton, { width: "100%", height: "140px" }) }), jsxRuntimeExports.jsx(StyledCol, { xs: 12, sm: 6, md: 4, lg: 3, children: jsxRuntimeExports.jsx(Skeleton, { width: "100%", height: "140px" }) }), jsxRuntimeExports.jsx(StyledCol, { xs: 12, sm: 6, md: 4, lg: 3, children: jsxRuntimeExports.jsx(Skeleton, { width: "100%", height: "140px" }) })] }) })] }));
const PageLoadingState = () => (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx("aside", { className: "service-catalog-sidebar", children: jsxRuntimeExports.jsx(SidebarSkeleton, {}) }), jsxRuntimeExports.jsx("main", { className: "service-catalog-list", children: jsxRuntimeExports.jsx(ContentSkeleton, {}) })] }));

function __variableDynamicImportRuntime2__(path) {
  switch (path) {
    case '../shared/translations/locales/af.json': return import('shared').then(function (n) { return n.aX; });
    case '../shared/translations/locales/ar-x-pseudo.json': return import('shared').then(function (n) { return n.aY; });
    case '../shared/translations/locales/ar.json': return import('shared').then(function (n) { return n.aZ; });
    case '../shared/translations/locales/az.json': return import('shared').then(function (n) { return n.a_; });
    case '../shared/translations/locales/be.json': return import('shared').then(function (n) { return n.a$; });
    case '../shared/translations/locales/bg.json': return import('shared').then(function (n) { return n.b0; });
    case '../shared/translations/locales/bn.json': return import('shared').then(function (n) { return n.b1; });
    case '../shared/translations/locales/bs.json': return import('shared').then(function (n) { return n.b2; });
    case '../shared/translations/locales/ca.json': return import('shared').then(function (n) { return n.b3; });
    case '../shared/translations/locales/cs.json': return import('shared').then(function (n) { return n.b4; });
    case '../shared/translations/locales/cy.json': return import('shared').then(function (n) { return n.b5; });
    case '../shared/translations/locales/da.json': return import('shared').then(function (n) { return n.b6; });
    case '../shared/translations/locales/de-de.json': return import('shared').then(function (n) { return n.b7; });
    case '../shared/translations/locales/de-x-informal.json': return import('shared').then(function (n) { return n.b8; });
    case '../shared/translations/locales/de.json': return import('shared').then(function (n) { return n.b9; });
    case '../shared/translations/locales/el.json': return import('shared').then(function (n) { return n.ba; });
    case '../shared/translations/locales/en-001.json': return import('shared').then(function (n) { return n.bb; });
    case '../shared/translations/locales/en-150.json': return import('shared').then(function (n) { return n.bc; });
    case '../shared/translations/locales/en-au.json': return import('shared').then(function (n) { return n.bd; });
    case '../shared/translations/locales/en-ca.json': return import('shared').then(function (n) { return n.be; });
    case '../shared/translations/locales/en-gb.json': return import('shared').then(function (n) { return n.bf; });
    case '../shared/translations/locales/en-my.json': return import('shared').then(function (n) { return n.bg; });
    case '../shared/translations/locales/en-ph.json': return import('shared').then(function (n) { return n.bh; });
    case '../shared/translations/locales/en-se.json': return import('shared').then(function (n) { return n.bi; });
    case '../shared/translations/locales/en-us.json': return import('shared').then(function (n) { return n.bj; });
    case '../shared/translations/locales/en-x-dev.json': return import('shared').then(function (n) { return n.bk; });
    case '../shared/translations/locales/en-x-keys.json': return import('shared').then(function (n) { return n.bl; });
    case '../shared/translations/locales/en-x-obsolete.json': return import('shared').then(function (n) { return n.bm; });
    case '../shared/translations/locales/en-x-pseudo.json': return import('shared').then(function (n) { return n.bn; });
    case '../shared/translations/locales/en-x-test.json': return import('shared').then(function (n) { return n.bo; });
    case '../shared/translations/locales/es-419.json': return import('shared').then(function (n) { return n.bp; });
    case '../shared/translations/locales/es-ar.json': return import('shared').then(function (n) { return n.bq; });
    case '../shared/translations/locales/es-cl.json': return import('shared').then(function (n) { return n.br; });
    case '../shared/translations/locales/es-es.json': return import('shared').then(function (n) { return n.bs; });
    case '../shared/translations/locales/es-mx.json': return import('shared').then(function (n) { return n.bt; });
    case '../shared/translations/locales/es-pe.json': return import('shared').then(function (n) { return n.bu; });
    case '../shared/translations/locales/es.json': return import('shared').then(function (n) { return n.bv; });
    case '../shared/translations/locales/et.json': return import('shared').then(function (n) { return n.bw; });
    case '../shared/translations/locales/eu.json': return import('shared').then(function (n) { return n.bx; });
    case '../shared/translations/locales/fa-af.json': return import('shared').then(function (n) { return n.by; });
    case '../shared/translations/locales/fa.json': return import('shared').then(function (n) { return n.bz; });
    case '../shared/translations/locales/fi.json': return import('shared').then(function (n) { return n.bA; });
    case '../shared/translations/locales/fil.json': return import('shared').then(function (n) { return n.bB; });
    case '../shared/translations/locales/fo.json': return import('shared').then(function (n) { return n.bC; });
    case '../shared/translations/locales/fr-ca.json': return import('shared').then(function (n) { return n.bD; });
    case '../shared/translations/locales/fr-dz.json': return import('shared').then(function (n) { return n.bE; });
    case '../shared/translations/locales/fr-mu.json': return import('shared').then(function (n) { return n.bF; });
    case '../shared/translations/locales/fr.json': return import('shared').then(function (n) { return n.bG; });
    case '../shared/translations/locales/ga.json': return import('shared').then(function (n) { return n.bH; });
    case '../shared/translations/locales/he.json': return import('shared').then(function (n) { return n.bI; });
    case '../shared/translations/locales/hi.json': return import('shared').then(function (n) { return n.bJ; });
    case '../shared/translations/locales/hr.json': return import('shared').then(function (n) { return n.bK; });
    case '../shared/translations/locales/hu.json': return import('shared').then(function (n) { return n.bL; });
    case '../shared/translations/locales/hy.json': return import('shared').then(function (n) { return n.bM; });
    case '../shared/translations/locales/id.json': return import('shared').then(function (n) { return n.bN; });
    case '../shared/translations/locales/is.json': return import('shared').then(function (n) { return n.bO; });
    case '../shared/translations/locales/it-ch.json': return import('shared').then(function (n) { return n.bP; });
    case '../shared/translations/locales/it.json': return import('shared').then(function (n) { return n.bQ; });
    case '../shared/translations/locales/ja.json': return import('shared').then(function (n) { return n.bR; });
    case '../shared/translations/locales/ka.json': return import('shared').then(function (n) { return n.bS; });
    case '../shared/translations/locales/kk.json': return import('shared').then(function (n) { return n.bT; });
    case '../shared/translations/locales/kl-dk.json': return import('shared').then(function (n) { return n.bU; });
    case '../shared/translations/locales/km.json': return import('shared').then(function (n) { return n.bV; });
    case '../shared/translations/locales/ko.json': return import('shared').then(function (n) { return n.bW; });
    case '../shared/translations/locales/ku.json': return import('shared').then(function (n) { return n.bX; });
    case '../shared/translations/locales/ky.json': return import('shared').then(function (n) { return n.bY; });
    case '../shared/translations/locales/lt.json': return import('shared').then(function (n) { return n.bZ; });
    case '../shared/translations/locales/lv.json': return import('shared').then(function (n) { return n.b_; });
    case '../shared/translations/locales/mk.json': return import('shared').then(function (n) { return n.b$; });
    case '../shared/translations/locales/mn.json': return import('shared').then(function (n) { return n.c0; });
    case '../shared/translations/locales/ms.json': return import('shared').then(function (n) { return n.c1; });
    case '../shared/translations/locales/mt.json': return import('shared').then(function (n) { return n.c2; });
    case '../shared/translations/locales/my.json': return import('shared').then(function (n) { return n.c3; });
    case '../shared/translations/locales/ne.json': return import('shared').then(function (n) { return n.c4; });
    case '../shared/translations/locales/nl-be.json': return import('shared').then(function (n) { return n.c5; });
    case '../shared/translations/locales/nl.json': return import('shared').then(function (n) { return n.c6; });
    case '../shared/translations/locales/no.json': return import('shared').then(function (n) { return n.c7; });
    case '../shared/translations/locales/pl.json': return import('shared').then(function (n) { return n.c8; });
    case '../shared/translations/locales/pt-br.json': return import('shared').then(function (n) { return n.c9; });
    case '../shared/translations/locales/pt.json': return import('shared').then(function (n) { return n.ca; });
    case '../shared/translations/locales/ro-md.json': return import('shared').then(function (n) { return n.cb; });
    case '../shared/translations/locales/ro.json': return import('shared').then(function (n) { return n.cc; });
    case '../shared/translations/locales/ru.json': return import('shared').then(function (n) { return n.cd; });
    case '../shared/translations/locales/si.json': return import('shared').then(function (n) { return n.ce; });
    case '../shared/translations/locales/sk.json': return import('shared').then(function (n) { return n.cf; });
    case '../shared/translations/locales/sl.json': return import('shared').then(function (n) { return n.cg; });
    case '../shared/translations/locales/sq.json': return import('shared').then(function (n) { return n.ch; });
    case '../shared/translations/locales/sr-me.json': return import('shared').then(function (n) { return n.ci; });
    case '../shared/translations/locales/sr.json': return import('shared').then(function (n) { return n.cj; });
    case '../shared/translations/locales/sv.json': return import('shared').then(function (n) { return n.ck; });
    case '../shared/translations/locales/sw-ke.json': return import('shared').then(function (n) { return n.cl; });
    case '../shared/translations/locales/ta.json': return import('shared').then(function (n) { return n.cm; });
    case '../shared/translations/locales/th.json': return import('shared').then(function (n) { return n.cn; });
    case '../shared/translations/locales/tr.json': return import('shared').then(function (n) { return n.co; });
    case '../shared/translations/locales/uk.json': return import('shared').then(function (n) { return n.cp; });
    case '../shared/translations/locales/ur-pk.json': return import('shared').then(function (n) { return n.cq; });
    case '../shared/translations/locales/ur.json': return import('shared').then(function (n) { return n.cr; });
    case '../shared/translations/locales/uz.json': return import('shared').then(function (n) { return n.cs; });
    case '../shared/translations/locales/vi.json': return import('shared').then(function (n) { return n.ct; });
    case '../shared/translations/locales/zh-cn.json': return import('shared').then(function (n) { return n.cu; });
    case '../shared/translations/locales/zh-tw.json': return import('shared').then(function (n) { return n.cv; });
    default: return new Promise(function(resolve, reject) {
      (typeof queueMicrotask === 'function' ? queueMicrotask : setTimeout)(
        reject.bind(null, new Error("Unknown variable dynamic import: " + path))
      );
    })
   }
 }

function __variableDynamicImportRuntime1__(path) {
  switch (path) {
    case '../ticket-fields/translations/locales/af.json': return import('ticket-fields').then(function (n) { return n.b; });
    case '../ticket-fields/translations/locales/ar-x-pseudo.json': return import('ticket-fields').then(function (n) { return n.c; });
    case '../ticket-fields/translations/locales/ar.json': return import('ticket-fields').then(function (n) { return n.d; });
    case '../ticket-fields/translations/locales/az.json': return import('ticket-fields').then(function (n) { return n.e; });
    case '../ticket-fields/translations/locales/be.json': return import('ticket-fields').then(function (n) { return n.f; });
    case '../ticket-fields/translations/locales/bg.json': return import('ticket-fields').then(function (n) { return n.h; });
    case '../ticket-fields/translations/locales/bn.json': return import('ticket-fields').then(function (n) { return n.i; });
    case '../ticket-fields/translations/locales/bs.json': return import('ticket-fields').then(function (n) { return n.j; });
    case '../ticket-fields/translations/locales/ca.json': return import('ticket-fields').then(function (n) { return n.k; });
    case '../ticket-fields/translations/locales/cs.json': return import('ticket-fields').then(function (n) { return n.l; });
    case '../ticket-fields/translations/locales/cy.json': return import('ticket-fields').then(function (n) { return n.m; });
    case '../ticket-fields/translations/locales/da.json': return import('ticket-fields').then(function (n) { return n.n; });
    case '../ticket-fields/translations/locales/de-de.json': return import('ticket-fields').then(function (n) { return n.o; });
    case '../ticket-fields/translations/locales/de-x-informal.json': return import('ticket-fields').then(function (n) { return n.p; });
    case '../ticket-fields/translations/locales/de.json': return import('ticket-fields').then(function (n) { return n.q; });
    case '../ticket-fields/translations/locales/el.json': return import('ticket-fields').then(function (n) { return n.r; });
    case '../ticket-fields/translations/locales/en-001.json': return import('ticket-fields').then(function (n) { return n.s; });
    case '../ticket-fields/translations/locales/en-150.json': return import('ticket-fields').then(function (n) { return n.t; });
    case '../ticket-fields/translations/locales/en-au.json': return import('ticket-fields').then(function (n) { return n.u; });
    case '../ticket-fields/translations/locales/en-ca.json': return import('ticket-fields').then(function (n) { return n.v; });
    case '../ticket-fields/translations/locales/en-gb.json': return import('ticket-fields').then(function (n) { return n.w; });
    case '../ticket-fields/translations/locales/en-my.json': return import('ticket-fields').then(function (n) { return n.x; });
    case '../ticket-fields/translations/locales/en-ph.json': return import('ticket-fields').then(function (n) { return n.y; });
    case '../ticket-fields/translations/locales/en-se.json': return import('ticket-fields').then(function (n) { return n.z; });
    case '../ticket-fields/translations/locales/en-us.json': return import('ticket-fields').then(function (n) { return n.B; });
    case '../ticket-fields/translations/locales/en-x-dev.json': return import('ticket-fields').then(function (n) { return n.C; });
    case '../ticket-fields/translations/locales/en-x-keys.json': return import('ticket-fields').then(function (n) { return n.E; });
    case '../ticket-fields/translations/locales/en-x-obsolete.json': return import('ticket-fields').then(function (n) { return n.F; });
    case '../ticket-fields/translations/locales/en-x-pseudo.json': return import('ticket-fields').then(function (n) { return n.G; });
    case '../ticket-fields/translations/locales/en-x-test.json': return import('ticket-fields').then(function (n) { return n.H; });
    case '../ticket-fields/translations/locales/es-419.json': return import('ticket-fields').then(function (n) { return n.J; });
    case '../ticket-fields/translations/locales/es-ar.json': return import('ticket-fields').then(function (n) { return n.K; });
    case '../ticket-fields/translations/locales/es-cl.json': return import('ticket-fields').then(function (n) { return n.L; });
    case '../ticket-fields/translations/locales/es-es.json': return import('ticket-fields').then(function (n) { return n.M; });
    case '../ticket-fields/translations/locales/es-mx.json': return import('ticket-fields').then(function (n) { return n.N; });
    case '../ticket-fields/translations/locales/es-pe.json': return import('ticket-fields').then(function (n) { return n.O; });
    case '../ticket-fields/translations/locales/es.json': return import('ticket-fields').then(function (n) { return n.P; });
    case '../ticket-fields/translations/locales/et.json': return import('ticket-fields').then(function (n) { return n.Q; });
    case '../ticket-fields/translations/locales/eu.json': return import('ticket-fields').then(function (n) { return n.S; });
    case '../ticket-fields/translations/locales/fa-af.json': return import('ticket-fields').then(function (n) { return n.U; });
    case '../ticket-fields/translations/locales/fa.json': return import('ticket-fields').then(function (n) { return n.V; });
    case '../ticket-fields/translations/locales/fi.json': return import('ticket-fields').then(function (n) { return n.W; });
    case '../ticket-fields/translations/locales/fil.json': return import('ticket-fields').then(function (n) { return n.X; });
    case '../ticket-fields/translations/locales/fo.json': return import('ticket-fields').then(function (n) { return n.Y; });
    case '../ticket-fields/translations/locales/fr-ca.json': return import('ticket-fields').then(function (n) { return n.Z; });
    case '../ticket-fields/translations/locales/fr-dz.json': return import('ticket-fields').then(function (n) { return n._; });
    case '../ticket-fields/translations/locales/fr-mu.json': return import('ticket-fields').then(function (n) { return n.$; });
    case '../ticket-fields/translations/locales/fr.json': return import('ticket-fields').then(function (n) { return n.a0; });
    case '../ticket-fields/translations/locales/ga.json': return import('ticket-fields').then(function (n) { return n.a1; });
    case '../ticket-fields/translations/locales/he.json': return import('ticket-fields').then(function (n) { return n.a2; });
    case '../ticket-fields/translations/locales/hi.json': return import('ticket-fields').then(function (n) { return n.a3; });
    case '../ticket-fields/translations/locales/hr.json': return import('ticket-fields').then(function (n) { return n.a4; });
    case '../ticket-fields/translations/locales/hu.json': return import('ticket-fields').then(function (n) { return n.a5; });
    case '../ticket-fields/translations/locales/hy.json': return import('ticket-fields').then(function (n) { return n.a6; });
    case '../ticket-fields/translations/locales/id.json': return import('ticket-fields').then(function (n) { return n.a7; });
    case '../ticket-fields/translations/locales/is.json': return import('ticket-fields').then(function (n) { return n.a8; });
    case '../ticket-fields/translations/locales/it-ch.json': return import('ticket-fields').then(function (n) { return n.a9; });
    case '../ticket-fields/translations/locales/it.json': return import('ticket-fields').then(function (n) { return n.aa; });
    case '../ticket-fields/translations/locales/ja.json': return import('ticket-fields').then(function (n) { return n.ab; });
    case '../ticket-fields/translations/locales/ka.json': return import('ticket-fields').then(function (n) { return n.ac; });
    case '../ticket-fields/translations/locales/kk.json': return import('ticket-fields').then(function (n) { return n.ad; });
    case '../ticket-fields/translations/locales/kl-dk.json': return import('ticket-fields').then(function (n) { return n.ae; });
    case '../ticket-fields/translations/locales/km.json': return import('ticket-fields').then(function (n) { return n.af; });
    case '../ticket-fields/translations/locales/ko.json': return import('ticket-fields').then(function (n) { return n.ag; });
    case '../ticket-fields/translations/locales/ku.json': return import('ticket-fields').then(function (n) { return n.ah; });
    case '../ticket-fields/translations/locales/ky.json': return import('ticket-fields').then(function (n) { return n.ai; });
    case '../ticket-fields/translations/locales/lt.json': return import('ticket-fields').then(function (n) { return n.aj; });
    case '../ticket-fields/translations/locales/lv.json': return import('ticket-fields').then(function (n) { return n.ak; });
    case '../ticket-fields/translations/locales/mk.json': return import('ticket-fields').then(function (n) { return n.al; });
    case '../ticket-fields/translations/locales/mn.json': return import('ticket-fields').then(function (n) { return n.am; });
    case '../ticket-fields/translations/locales/ms.json': return import('ticket-fields').then(function (n) { return n.an; });
    case '../ticket-fields/translations/locales/mt.json': return import('ticket-fields').then(function (n) { return n.ao; });
    case '../ticket-fields/translations/locales/my.json': return import('ticket-fields').then(function (n) { return n.ap; });
    case '../ticket-fields/translations/locales/ne.json': return import('ticket-fields').then(function (n) { return n.aq; });
    case '../ticket-fields/translations/locales/nl-be.json': return import('ticket-fields').then(function (n) { return n.ar; });
    case '../ticket-fields/translations/locales/nl.json': return import('ticket-fields').then(function (n) { return n.as; });
    case '../ticket-fields/translations/locales/no.json': return import('ticket-fields').then(function (n) { return n.at; });
    case '../ticket-fields/translations/locales/pl.json': return import('ticket-fields').then(function (n) { return n.au; });
    case '../ticket-fields/translations/locales/pt-br.json': return import('ticket-fields').then(function (n) { return n.av; });
    case '../ticket-fields/translations/locales/pt.json': return import('ticket-fields').then(function (n) { return n.aw; });
    case '../ticket-fields/translations/locales/ro-md.json': return import('ticket-fields').then(function (n) { return n.ax; });
    case '../ticket-fields/translations/locales/ro.json': return import('ticket-fields').then(function (n) { return n.ay; });
    case '../ticket-fields/translations/locales/ru.json': return import('ticket-fields').then(function (n) { return n.az; });
    case '../ticket-fields/translations/locales/si.json': return import('ticket-fields').then(function (n) { return n.aA; });
    case '../ticket-fields/translations/locales/sk.json': return import('ticket-fields').then(function (n) { return n.aB; });
    case '../ticket-fields/translations/locales/sl.json': return import('ticket-fields').then(function (n) { return n.aC; });
    case '../ticket-fields/translations/locales/sq.json': return import('ticket-fields').then(function (n) { return n.aD; });
    case '../ticket-fields/translations/locales/sr-me.json': return import('ticket-fields').then(function (n) { return n.aE; });
    case '../ticket-fields/translations/locales/sr.json': return import('ticket-fields').then(function (n) { return n.aF; });
    case '../ticket-fields/translations/locales/sv.json': return import('ticket-fields').then(function (n) { return n.aG; });
    case '../ticket-fields/translations/locales/sw-ke.json': return import('ticket-fields').then(function (n) { return n.aH; });
    case '../ticket-fields/translations/locales/ta.json': return import('ticket-fields').then(function (n) { return n.aI; });
    case '../ticket-fields/translations/locales/th.json': return import('ticket-fields').then(function (n) { return n.aJ; });
    case '../ticket-fields/translations/locales/tr.json': return import('ticket-fields').then(function (n) { return n.aK; });
    case '../ticket-fields/translations/locales/uk.json': return import('ticket-fields').then(function (n) { return n.aL; });
    case '../ticket-fields/translations/locales/ur-pk.json': return import('ticket-fields').then(function (n) { return n.aM; });
    case '../ticket-fields/translations/locales/ur.json': return import('ticket-fields').then(function (n) { return n.aN; });
    case '../ticket-fields/translations/locales/uz.json': return import('ticket-fields').then(function (n) { return n.aO; });
    case '../ticket-fields/translations/locales/vi.json': return import('ticket-fields').then(function (n) { return n.aP; });
    case '../ticket-fields/translations/locales/zh-cn.json': return import('ticket-fields').then(function (n) { return n.aQ; });
    case '../ticket-fields/translations/locales/zh-tw.json': return import('ticket-fields').then(function (n) { return n.aR; });
    default: return new Promise(function(resolve, reject) {
      (typeof queueMicrotask === 'function' ? queueMicrotask : setTimeout)(
        reject.bind(null, new Error("Unknown variable dynamic import: " + path))
      );
    })
   }
 }

function __variableDynamicImportRuntime0__(path) {
  switch (path) {
    case './translations/locales/af.json': return import('service-catalog-translations').then(function (n) { return n.a; });
    case './translations/locales/ar-x-pseudo.json': return import('service-catalog-translations').then(function (n) { return n.b; });
    case './translations/locales/ar.json': return import('service-catalog-translations').then(function (n) { return n.c; });
    case './translations/locales/az.json': return import('service-catalog-translations').then(function (n) { return n.d; });
    case './translations/locales/be.json': return import('service-catalog-translations').then(function (n) { return n.e; });
    case './translations/locales/bg.json': return import('service-catalog-translations').then(function (n) { return n.f; });
    case './translations/locales/bn.json': return import('service-catalog-translations').then(function (n) { return n.g; });
    case './translations/locales/bs.json': return import('service-catalog-translations').then(function (n) { return n.h; });
    case './translations/locales/ca.json': return import('service-catalog-translations').then(function (n) { return n.i; });
    case './translations/locales/cs.json': return import('service-catalog-translations').then(function (n) { return n.j; });
    case './translations/locales/cy.json': return import('service-catalog-translations').then(function (n) { return n.k; });
    case './translations/locales/da.json': return import('service-catalog-translations').then(function (n) { return n.l; });
    case './translations/locales/de-de.json': return import('service-catalog-translations').then(function (n) { return n.m; });
    case './translations/locales/de-x-informal.json': return import('service-catalog-translations').then(function (n) { return n.n; });
    case './translations/locales/de.json': return import('service-catalog-translations').then(function (n) { return n.o; });
    case './translations/locales/el.json': return import('service-catalog-translations').then(function (n) { return n.p; });
    case './translations/locales/en-001.json': return import('service-catalog-translations').then(function (n) { return n.q; });
    case './translations/locales/en-150.json': return import('service-catalog-translations').then(function (n) { return n.r; });
    case './translations/locales/en-au.json': return import('service-catalog-translations').then(function (n) { return n.s; });
    case './translations/locales/en-ca.json': return import('service-catalog-translations').then(function (n) { return n.t; });
    case './translations/locales/en-gb.json': return import('service-catalog-translations').then(function (n) { return n.u; });
    case './translations/locales/en-my.json': return import('service-catalog-translations').then(function (n) { return n.v; });
    case './translations/locales/en-ph.json': return import('service-catalog-translations').then(function (n) { return n.w; });
    case './translations/locales/en-se.json': return import('service-catalog-translations').then(function (n) { return n.x; });
    case './translations/locales/en-us.json': return import('service-catalog-translations').then(function (n) { return n.y; });
    case './translations/locales/en-x-dev.json': return import('service-catalog-translations').then(function (n) { return n.z; });
    case './translations/locales/en-x-keys.json': return import('service-catalog-translations').then(function (n) { return n.A; });
    case './translations/locales/en-x-obsolete.json': return import('service-catalog-translations').then(function (n) { return n.B; });
    case './translations/locales/en-x-pseudo.json': return import('service-catalog-translations').then(function (n) { return n.C; });
    case './translations/locales/en-x-test.json': return import('service-catalog-translations').then(function (n) { return n.D; });
    case './translations/locales/es-419.json': return import('service-catalog-translations').then(function (n) { return n.E; });
    case './translations/locales/es-ar.json': return import('service-catalog-translations').then(function (n) { return n.F; });
    case './translations/locales/es-cl.json': return import('service-catalog-translations').then(function (n) { return n.G; });
    case './translations/locales/es-es.json': return import('service-catalog-translations').then(function (n) { return n.H; });
    case './translations/locales/es-mx.json': return import('service-catalog-translations').then(function (n) { return n.I; });
    case './translations/locales/es-pe.json': return import('service-catalog-translations').then(function (n) { return n.J; });
    case './translations/locales/es.json': return import('service-catalog-translations').then(function (n) { return n.K; });
    case './translations/locales/et.json': return import('service-catalog-translations').then(function (n) { return n.L; });
    case './translations/locales/eu.json': return import('service-catalog-translations').then(function (n) { return n.M; });
    case './translations/locales/fa-af.json': return import('service-catalog-translations').then(function (n) { return n.N; });
    case './translations/locales/fa.json': return import('service-catalog-translations').then(function (n) { return n.O; });
    case './translations/locales/fi.json': return import('service-catalog-translations').then(function (n) { return n.P; });
    case './translations/locales/fil.json': return import('service-catalog-translations').then(function (n) { return n.Q; });
    case './translations/locales/fo.json': return import('service-catalog-translations').then(function (n) { return n.R; });
    case './translations/locales/fr-ca.json': return import('service-catalog-translations').then(function (n) { return n.S; });
    case './translations/locales/fr-dz.json': return import('service-catalog-translations').then(function (n) { return n.T; });
    case './translations/locales/fr-mu.json': return import('service-catalog-translations').then(function (n) { return n.U; });
    case './translations/locales/fr.json': return import('service-catalog-translations').then(function (n) { return n.V; });
    case './translations/locales/ga.json': return import('service-catalog-translations').then(function (n) { return n.W; });
    case './translations/locales/he.json': return import('service-catalog-translations').then(function (n) { return n.X; });
    case './translations/locales/hi.json': return import('service-catalog-translations').then(function (n) { return n.Y; });
    case './translations/locales/hr.json': return import('service-catalog-translations').then(function (n) { return n.Z; });
    case './translations/locales/hu.json': return import('service-catalog-translations').then(function (n) { return n._; });
    case './translations/locales/hy.json': return import('service-catalog-translations').then(function (n) { return n.$; });
    case './translations/locales/id.json': return import('service-catalog-translations').then(function (n) { return n.a0; });
    case './translations/locales/is.json': return import('service-catalog-translations').then(function (n) { return n.a1; });
    case './translations/locales/it-ch.json': return import('service-catalog-translations').then(function (n) { return n.a2; });
    case './translations/locales/it.json': return import('service-catalog-translations').then(function (n) { return n.a3; });
    case './translations/locales/ja.json': return import('service-catalog-translations').then(function (n) { return n.a4; });
    case './translations/locales/ka.json': return import('service-catalog-translations').then(function (n) { return n.a5; });
    case './translations/locales/kk.json': return import('service-catalog-translations').then(function (n) { return n.a6; });
    case './translations/locales/kl-dk.json': return import('service-catalog-translations').then(function (n) { return n.a7; });
    case './translations/locales/km.json': return import('service-catalog-translations').then(function (n) { return n.a8; });
    case './translations/locales/ko.json': return import('service-catalog-translations').then(function (n) { return n.a9; });
    case './translations/locales/ku.json': return import('service-catalog-translations').then(function (n) { return n.aa; });
    case './translations/locales/ky.json': return import('service-catalog-translations').then(function (n) { return n.ab; });
    case './translations/locales/lt.json': return import('service-catalog-translations').then(function (n) { return n.ac; });
    case './translations/locales/lv.json': return import('service-catalog-translations').then(function (n) { return n.ad; });
    case './translations/locales/mk.json': return import('service-catalog-translations').then(function (n) { return n.ae; });
    case './translations/locales/mn.json': return import('service-catalog-translations').then(function (n) { return n.af; });
    case './translations/locales/ms.json': return import('service-catalog-translations').then(function (n) { return n.ag; });
    case './translations/locales/mt.json': return import('service-catalog-translations').then(function (n) { return n.ah; });
    case './translations/locales/my.json': return import('service-catalog-translations').then(function (n) { return n.ai; });
    case './translations/locales/ne.json': return import('service-catalog-translations').then(function (n) { return n.aj; });
    case './translations/locales/nl-be.json': return import('service-catalog-translations').then(function (n) { return n.ak; });
    case './translations/locales/nl.json': return import('service-catalog-translations').then(function (n) { return n.al; });
    case './translations/locales/no.json': return import('service-catalog-translations').then(function (n) { return n.am; });
    case './translations/locales/pl.json': return import('service-catalog-translations').then(function (n) { return n.an; });
    case './translations/locales/pt-br.json': return import('service-catalog-translations').then(function (n) { return n.ao; });
    case './translations/locales/pt.json': return import('service-catalog-translations').then(function (n) { return n.ap; });
    case './translations/locales/ro-md.json': return import('service-catalog-translations').then(function (n) { return n.aq; });
    case './translations/locales/ro.json': return import('service-catalog-translations').then(function (n) { return n.ar; });
    case './translations/locales/ru.json': return import('service-catalog-translations').then(function (n) { return n.as; });
    case './translations/locales/si.json': return import('service-catalog-translations').then(function (n) { return n.at; });
    case './translations/locales/sk.json': return import('service-catalog-translations').then(function (n) { return n.au; });
    case './translations/locales/sl.json': return import('service-catalog-translations').then(function (n) { return n.av; });
    case './translations/locales/sq.json': return import('service-catalog-translations').then(function (n) { return n.aw; });
    case './translations/locales/sr-me.json': return import('service-catalog-translations').then(function (n) { return n.ax; });
    case './translations/locales/sr.json': return import('service-catalog-translations').then(function (n) { return n.ay; });
    case './translations/locales/sv.json': return import('service-catalog-translations').then(function (n) { return n.az; });
    case './translations/locales/sw-ke.json': return import('service-catalog-translations').then(function (n) { return n.aA; });
    case './translations/locales/ta.json': return import('service-catalog-translations').then(function (n) { return n.aB; });
    case './translations/locales/th.json': return import('service-catalog-translations').then(function (n) { return n.aC; });
    case './translations/locales/tr.json': return import('service-catalog-translations').then(function (n) { return n.aD; });
    case './translations/locales/uk.json': return import('service-catalog-translations').then(function (n) { return n.aE; });
    case './translations/locales/ur-pk.json': return import('service-catalog-translations').then(function (n) { return n.aF; });
    case './translations/locales/ur.json': return import('service-catalog-translations').then(function (n) { return n.aG; });
    case './translations/locales/uz.json': return import('service-catalog-translations').then(function (n) { return n.aH; });
    case './translations/locales/vi.json': return import('service-catalog-translations').then(function (n) { return n.aI; });
    case './translations/locales/zh-cn.json': return import('service-catalog-translations').then(function (n) { return n.aJ; });
    case './translations/locales/zh-tw.json': return import('service-catalog-translations').then(function (n) { return n.aK; });
    default: return new Promise(function(resolve, reject) {
      (typeof queueMicrotask === 'function' ? queueMicrotask : setTimeout)(
        reject.bind(null, new Error("Unknown variable dynamic import: " + path))
      );
    })
   }
 }
function isPreviewMode() {
    if (typeof window === "undefined")
        return false;
    return (new URLSearchParams(window.location.search).get(PREVIEW_MODE_QUERY_PARAM) === PREVIEW_MODE_QUERY_PARAM_VALUE);
}
async function fetchCategoryTree({ publishedOnly, }) {
    try {
        const params = new URLSearchParams({
            published_only: String(publishedOnly),
        });
        const response = await fetch(`/api/v2/help_center/service_catalog/categories?${params.toString()}`);
        if (response.ok) {
            const data = await response.json();
            return Array.isArray(data.service_catalog_categories)
                ? data.service_catalog_categories
                : [];
        }
        return [];
    }
    catch {
        return [];
    }
}
async function renderServiceCatalogPage(container, settings, baseLocale, helpCenterPath) {
    initI18next(baseLocale);
    const theme = createTheme(settings);
    reactDomExports.render(jsxRuntimeExports.jsx(ThemeProviders, { theme: theme, children: jsxRuntimeExports.jsx(PageLoadingState, {}) }), container);
    const [, categoryTree] = await Promise.all([
        loadTranslations(baseLocale, [
            () => __variableDynamicImportRuntime0__(`./translations/locales/${baseLocale}.json`),
            () => __variableDynamicImportRuntime1__(`../ticket-fields/translations/locales/${baseLocale}.json`),
            () => __variableDynamicImportRuntime2__(`../shared/translations/locales/${baseLocale}.json`),
        ]).catch((error) => {
            console.error("Failed to load translations:", error);
        }),
        fetchCategoryTree({ publishedOnly: !isPreviewMode() }),
    ]);
    reactDomExports.render(jsxRuntimeExports.jsx(ThemeProviders, { theme: theme, children: jsxRuntimeExports.jsx(ErrorBoundary, { helpCenterPath: helpCenterPath, fallback: jsxRuntimeExports.jsx("main", { className: "service-catalog-list", children: jsxRuntimeExports.jsx(ErrorScreen, { helpCenterPath: helpCenterPath }) }), children: jsxRuntimeExports.jsx(ServiceCatalogPage, { helpCenterPath: helpCenterPath, categoryTree: categoryTree }) }) }), container);
}

export { renderServiceCatalogItem, renderServiceCatalogPage };
