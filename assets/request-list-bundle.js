import { r as reactExports, u as useTranslation, j as jsxRuntimeExports, b as Field, M as MediaInput, a2 as SvgSearchStroke, s as styled, a3 as Menu, a4 as Field$1, a5 as Dropdown, a6 as Label, a7 as Autocomplete, a8 as Item, B as Paragraph, X as Alert, y as useModalContainer, v as Modal, C as Checkbox, A as Anchor, E as Button, N as Dots, n as notify, a9 as Ne, aa as subDays, ab as formatISO, ac as subMonths, ad as subYears, ae as Select, I as Input, af as DatePickerRange, ag as Grid, ah as format, ai as Multiselect$2, q as Tag, R as Header, U as Body, V as Footer, Q as FooterItem, W as Close, S as Span, aj as upperFirst, ak as isToday, al as isYesterday, T as Tooltip, am as Ellipsis, an as Table, ao as Trigger, ap as HeaderItem, aq as SvgChevronDownStroke, ar as Tabs, as as Skeleton, at as CursorPagination, Y as initI18next, Z as loadTranslations, _ as reactDomExports, a0 as ThemeProviders, a1 as createTheme, au as ErrorBoundary } from 'shared';

function useParams(initialParams, serialize, deserialize) {
    const [params, setParams] = reactExports.useState(initialParams);
    function push(newParams) {
        const mergedParams = { ...params, ...newParams };
        const searchParams = serialize(mergedParams);
        setParams((prevParams) => ({ ...prevParams, ...mergedParams }));
        window.history.pushState({}, "", "?" + searchParams.toString());
    }
    function readParams() {
        const searchParams = new URLSearchParams(window.location.search);
        const newParams = deserialize(searchParams);
        setParams((prevParams) => ({ ...prevParams, ...newParams }));
    }
    reactExports.useEffect(() => {
        readParams();
    }, []);
    return {
        params,
        push,
    };
}

function RequestsSearch({ query, onSearchSubmit, }) {
    const { t } = useTranslation();
    const searchInputRef = reactExports.useRef(null);
    const onSearchChange = (event) => {
        event.preventDefault();
        if (searchInputRef.current !== null) {
            onSearchSubmit(searchInputRef.current.value);
        }
    };
    return (jsxRuntimeExports.jsx("form", { onSubmit: onSearchChange, children: jsxRuntimeExports.jsxs(Field, { children: [jsxRuntimeExports.jsx(Field.Label, { hidden: true, children: t("guide-requests-app.searchField.Label", "Search") }), jsxRuntimeExports.jsx(MediaInput, { start: jsxRuntimeExports.jsx(SvgSearchStroke, { "aria-hidden": "true" }), ref: searchInputRef, type: "search", defaultValue: query })] }) }));
}

const StyledMenu$2 = styled(Menu) `
  max-height: 100%;
  overflow-y: visible;
`;
const StyledField$1 = styled(Field$1) `
  width: 200px;
`;
function OrganizationsDropdown({ organizations, currentOrganizationId, onOrganizationSelected, }) {
    const { t } = useTranslation();
    const [inputValue, setInputValue] = reactExports.useState("");
    const selectedOrganization = organizations.find((organization) => organization.id === currentOrganizationId);
    const onSelect = (orgId) => {
        onOrganizationSelected(orgId);
    };
    return (jsxRuntimeExports.jsxs(Dropdown, { inputValue: inputValue, onInputValueChange: setInputValue, selectedItem: currentOrganizationId, onSelect: onSelect, children: [jsxRuntimeExports.jsxs(StyledField$1, { children: [jsxRuntimeExports.jsx(Label, { children: t("guide-requests-app.organization", "Organization") }), jsxRuntimeExports.jsx(Autocomplete, { "data-test-id": "organizations-menu", children: selectedOrganization?.name })] }), jsxRuntimeExports.jsx(StyledMenu$2, { placement: "bottom-start", children: organizations
                    .filter((organization) => organization.name
                    .trim()
                    .toLowerCase()
                    .includes(inputValue.trim().toLowerCase()))
                    .map((organization) => (jsxRuntimeExports.jsx(Item, { value: organization.id, "data-test-id": `organization-${organization.id}`, children: organization.name }, organization.id))) })] }));
}

const DEFAULT_SHOWING_AMOUNT = 20;
const SHOWING_AMOUNT_INCREMENT = 10;
const StyledField = styled(Field) `
  padding-bottom: ${(p) => p.theme.space.xs};
`;
const StyledParagraph = styled(Paragraph) `
  padding-bottom: ${(p) => p.theme.space.sm};
`;
const StyledAlert = styled(Alert) `
  margin-bottom: ${(p) => p.theme.space.sm};
`;
function FollowOrganizationsModal(props) {
    const { t } = useTranslation();
    const { organizations, user, onClose } = props;
    const [amountShowing, setAmountShowing] = reactExports.useState(DEFAULT_SHOWING_AMOUNT);
    const [subscriptions, setSubscriptions] = reactExports.useState([]);
    const [isUpdating, setIsUpdating] = reactExports.useState(false);
    const modalContainer = useModalContainer();
    const onSave = () => {
        resetFailedState();
        updateSubscriptions();
    };
    const onShowMore = () => {
        setAmountShowing(amountShowing + SHOWING_AMOUNT_INCREMENT);
    };
    const fetchSubscriptions = async (organizations, userId) => {
        let totalSubscriptions = [];
        let subscriptionUrl = `/api/v2/users/${userId}/organization_subscriptions.json?page[size]=100`;
        let hasMore = true;
        while (hasMore) {
            const response = await fetch(subscriptionUrl);
            if (!response.ok) {
                throw new Error("Failed to fetch organization subscriptions");
            }
            const { organization_subscriptions, meta: { has_more }, links: { next }, } = await response.json();
            hasMore = has_more;
            subscriptionUrl = next;
            totalSubscriptions = totalSubscriptions.concat(organization_subscriptions);
        }
        const lookUpMap = {};
        totalSubscriptions.forEach((sub) => {
            lookUpMap[`${sub.organization_id}`] = sub;
        });
        setSubscriptions(organizations.map((o) => ({
            organizationId: o.id,
            name: o.name,
            subscriptionId: lookUpMap[`${o.id}`]?.id,
            subscribed: lookUpMap[`${o.id}`] !== undefined,
            isError: false,
            isChecked: lookUpMap[`${o.id}`] !== undefined,
        })));
    };
    const updateSubscriptions = async () => {
        const updatedOrganizationSubscriptionState = subscriptions.map((subscription) => ({ ...subscription, isError: false }));
        if (!updatedOrganizationSubscriptionState.some((oss) => oss.subscribed !== oss.isChecked)) {
            onClose();
            return;
        }
        setIsUpdating(true);
        const requests = updatedOrganizationSubscriptionState
            .filter((oss) => oss.subscribed !== oss.isChecked)
            .map(async (oss) => {
            let response;
            try {
                if (oss.subscribed) {
                    response = await fetch(`/api/v2/organization_subscriptions/${oss.subscriptionId}.json`, {
                        method: "DELETE",
                        headers: {
                            "X-CSRF-Token": user.authenticity_token,
                        },
                    });
                }
                else {
                    response = await fetch(`/api/v2/organization_subscriptions.json`, {
                        body: JSON.stringify({
                            organization_subscription: {
                                user_id: user.id,
                                organization_id: oss.organizationId,
                            },
                        }),
                        method: "POST",
                        headers: {
                            "X-CSRF-Token": user.authenticity_token,
                            "Content-Type": "application/json",
                        },
                    });
                }
                if (response.ok) {
                    oss.subscribed = !oss.subscribed;
                    oss.isError = false;
                }
                else {
                    throw Error(response.statusText);
                }
            }
            catch (e) {
                oss.isError = true;
            }
            finally {
                oss.isChecked = oss.subscribed;
            }
        });
        await Promise.all(requests);
        setSubscriptions(updatedOrganizationSubscriptionState);
        setIsUpdating(false);
        if (!updatedOrganizationSubscriptionState.some((oss) => oss.isError)) {
            notify({
                type: "success",
                message: t("guide-requests-app.organizationSubscriptionUpdated", "Organization subscription updated"),
            });
            onClose();
        }
    };
    const subscriptionStateChange = (organizationId) => {
        setSubscriptions(subscriptions.map((subscription) => subscription.organizationId === organizationId
            ? { ...subscription, isChecked: !subscription.isChecked }
            : subscription));
    };
    reactExports.useEffect(() => {
        fetchSubscriptions(organizations, user.id);
    }, []);
    const onCloseAlert = (e) => {
        e.preventDefault();
        resetFailedState();
    };
    const resetFailedState = () => {
        setSubscriptions(subscriptions.map((subscription) => ({
            ...subscription,
            isError: false,
        })));
    };
    return (jsxRuntimeExports.jsxs(Modal, { onClose: onClose, appendToNode: modalContainer, children: [jsxRuntimeExports.jsx(Modal.Header, { children: t("guide-requests-app.followOrganization", "Follow organization") }), jsxRuntimeExports.jsxs(Modal.Body, { children: [jsxRuntimeExports.jsx(StyledParagraph, { children: t("guide-requests-app.receiveEmailUpdatesOrganizationsTickets", "Receive email updates about tickets within these organizations:") }), subscriptions.some((o) => o.isError) && (jsxRuntimeExports.jsxs(StyledAlert, { type: "error", children: [jsxRuntimeExports.jsx(Alert.Title, { children: t("guide-requests-app.organizationSubscriptionCouldNotBeSaved", "Organization subscription could not be saved") }), t("guide-requests-app.giveItAMomentAndTryAgain", "Give it a moment and try again"), jsxRuntimeExports.jsx(Modal.Close, { "aria-label": "Close Alert", onClick: onCloseAlert })] })), subscriptions.slice(0, amountShowing).map((o) => (jsxRuntimeExports.jsxs(StyledField, { children: [jsxRuntimeExports.jsx(Checkbox, { "data-test-id": `checkbox_${o.organizationId}`, checked: o.isChecked, onChange: () => subscriptionStateChange(o.organizationId), children: jsxRuntimeExports.jsx(Field.Label, { children: o.name }) }), o.isError && (jsxRuntimeExports.jsx(Field.Message, { validation: "error", children: t("guide-requests-app.organizationSubscriptionCouldNotBeSaved", "Organization subscription could not be saved") }))] }, o.organizationId))), organizations.length > DEFAULT_SHOWING_AMOUNT &&
                        amountShowing < organizations.length && (jsxRuntimeExports.jsx(Anchor, { onClick: onShowMore, children: t("guide-requests-app.showMore", "Show more") }))] }), jsxRuntimeExports.jsxs(Modal.Footer, { children: [jsxRuntimeExports.jsx(Modal.FooterItem, { children: jsxRuntimeExports.jsx(Button, { onClick: onClose, isBasic: true, children: t("guide-requests-app.cancel", "Cancel") }) }), jsxRuntimeExports.jsx(Modal.FooterItem, { children: jsxRuntimeExports.jsx(Button, { isPrimary: true, onClick: onSave, "data-test-id": `saveOrganizationButton`, children: isUpdating ? (jsxRuntimeExports.jsx(Dots, { size: 20, delayMS: 0 })) : (t("guide-requests-app.save", "Save")) }) })] }), jsxRuntimeExports.jsx(Modal.Close, { "aria-label": t("guide-requests-app.closeModal", "Close modal"), onClick: onClose })] }));
}

function OrganizationsManagement({ organizations, user, }) {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = reactExports.useState(false);
    const onClick = () => {
        setIsOpen(true);
    };
    return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(Button, { onClick: onClick, "data-test-id": `followOrganizationButton`, children: t("guide-requests-app.followOrganization", "Follow organization") }), isOpen && (jsxRuntimeExports.jsx(FollowOrganizationsModal, { organizations: organizations, user: user, onClose: () => setIsOpen(false) }))] }));
}

const breakpoint = {
    mobile: 768,
    desktop: 1024,
};
const query = {
    mobile: `(max-width: ${breakpoint.mobile}px)`,
    desktop: `(min-width: ${breakpoint.mobile + 1}px)`,
};
const media = {
    mobile: (template) => Ne `
      @media screen and ${query.mobile} {
        ${Ne(template)}
      }
    `,
    desktop: (template) => Ne `
      @media screen and ${query.desktop} {
        ${Ne(template)}
      }
    `,
};
const Mobile = styled.div `
  ${media.desktop `display: none;`}
`;
const Desktop = styled.div `
  ${media.mobile `display: none;`}
`;
const isMobile = () => matchMedia(query.mobile).matches;

const MY_REQUESTS_TAB_NAME = "my-requests";
const CCD_REQUESTS_TAB_NAME = "ccd-requests";
const ORG_REQUESTS_TAB_NAME = "org-requests";

function daysAgo(currentDate, numberOfDays) {
    const newDate = subDays(currentDate, numberOfDays);
    const dateISOString = formatISO(newDate, { representation: "date" });
    return `>${dateISOString}`;
}
function monthsAgo(currentDate, numberOfMoths) {
    const newDate = subMonths(currentDate, numberOfMoths);
    const dateISOString = formatISO(newDate, { representation: "date" });
    return `>${dateISOString}`;
}
function yearAgo(currentDate) {
    const newDate = subYears(currentDate, 1);
    const dateISOString = formatISO(newDate, { representation: "date" });
    return `>${dateISOString}`;
}
function useFilterTranslations() {
    const { t } = useTranslation();
    const filterTypeDropdownI18N = {
        anyValue: t("guide-requests-app.anyValue", "Any value"),
        range: t("guide-requests-app.range-filter-type", "Range"),
        exactMatch: t("guide-requests-app.exactMatch", "Exact match"),
    };
    const statusFilterValuesI18N = {
        ":open :new :hold": t("guide-requests-app.statusOpen", "Open"),
        ":pending": t("guide-requests-app.statusPending", "Awaiting reply"),
        ":solved :closed": t("guide-requests-app.statusSolved", "Solved"),
    };
    const checkboxFilterValuesI18N = {
        ":checked": t("guide-requests-app.checkbox-filter.selected", "Selected"),
        ":unchecked": t("guide-requests-app.checkbox-filter.not-selected", "Not selected"),
    };
    function createDefaultDateRangeI18N() {
        const currentDate = new Date();
        return {
            [daysAgo(currentDate, 1)]: t("guide-requests-app.inThePastDay", "In the past day"),
            [daysAgo(currentDate, 7)]: t("guide-requests-app.inThePastWeek", "In the past week"),
            [monthsAgo(currentDate, 1)]: t("guide-requests-app.inThePastMonth", "In the past month"),
            [monthsAgo(currentDate, 3)]: t("guide-requests-app.inThePast3Months", "In the past 3 months"),
            [monthsAgo(currentDate, 6)]: t("guide-requests-app.inThePast6Months", "In the past 6 months"),
            [yearAgo(currentDate)]: t("guide-requests-app.inThePastYear", "In the past year"),
        };
    }
    return {
        filterTypeDropdownI18N,
        statusFilterValuesI18N,
        checkboxFilterValuesI18N,
        createDefaultDateRangeI18N,
    };
}

function FieldError({ errors, field, }) {
    const { t } = useTranslation();
    return errors[field] ? (jsxRuntimeExports.jsx(Field.Message, { validation: "error", validationLabel: t("guide-requests-app.error-icon-label", "Error"), children: errors[field] })) : null;
}

function ModalMenu({ children }) {
    const modalContainer = useModalContainer();
    return (jsxRuntimeExports.jsx(Menu, { appendToNode: modalContainer, popperModifiers: { preventOverflow: { boundariesElement: "viewport" } }, children: children }));
}

function CheckboxFilter({ label, onSelect, errors, }) {
    const { t } = useTranslation();
    const validateForm = (checkboxFilterValue) => {
        if (checkboxFilterValue === null) {
            return {
                state: "invalid",
                errors: {
                    filterValue: t("guide-requests-app.filters-modal.select-value-error", "Select a value"),
                },
            };
        }
        return {
            state: "valid",
            values: [checkboxFilterValue],
        };
    };
    const { checkboxFilterValuesI18N } = useFilterTranslations();
    const [value, setValue] = reactExports.useState(null);
    reactExports.useEffect(() => {
        onSelect(validateForm(null));
    }, []);
    const handleSelect = (item) => {
        setValue(item);
        onSelect(validateForm(item));
    };
    return (jsxRuntimeExports.jsxs(Dropdown, { selectedItem: value, onSelect: handleSelect, children: [jsxRuntimeExports.jsxs(Field$1, { children: [jsxRuntimeExports.jsx(Label, { children: t("guide-requests-app.filters-modal.select-field-value", "Select {{field_name}}", {
                            field_name: label,
                        }) }), jsxRuntimeExports.jsx(Select, { validation: errors.filterValue ? "error" : undefined, children: value ? checkboxFilterValuesI18N[value] : "" }), jsxRuntimeExports.jsx(FieldError, { errors: errors, field: "filterValue" })] }), jsxRuntimeExports.jsxs(ModalMenu, { children: [jsxRuntimeExports.jsx(Item, { value: ":checked", children: checkboxFilterValuesI18N[":checked"] }), jsxRuntimeExports.jsx(Item, { value: ":unchecked", children: checkboxFilterValuesI18N[":unchecked"] })] })] }));
}

const StyledSelect = styled(Select) `
  margin-top: ${(p) => p.theme.space.xs};
`;
const FilterTypeDropdown = (props) => {
    const { t } = useTranslation();
    const { onFilterTypeSelect, selectedFilter, errors } = props;
    const { filterTypeDropdownI18N } = useFilterTranslations();
    return (jsxRuntimeExports.jsxs(Dropdown, { onSelect: onFilterTypeSelect, selectedItem: selectedFilter, children: [jsxRuntimeExports.jsxs(Field$1, { children: [jsxRuntimeExports.jsx(Label, { children: t("guide-requests-app.filter-modal.filterTypeLabel", "Filter type") }), jsxRuntimeExports.jsx(StyledSelect, { validation: errors["filterType"] ? "error" : undefined, children: selectedFilter ? filterTypeDropdownI18N[selectedFilter] : "" }), jsxRuntimeExports.jsx(FieldError, { errors: errors, field: "filterType" })] }), jsxRuntimeExports.jsxs(ModalMenu, { children: [jsxRuntimeExports.jsx(Item, { value: "anyValue", children: filterTypeDropdownI18N.anyValue }), jsxRuntimeExports.jsx(Item, { value: "exactMatch", children: filterTypeDropdownI18N.exactMatch })] })] }));
};

const CARD_NUMBER_REGEX = /^\d{4}$/;
const Container$6 = styled.div `
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.md};
`;
function CreditCardFilter({ onSelect, errors, }) {
    const { t } = useTranslation();
    const [filterType, setFilterType] = reactExports.useState();
    const [cardNumber, setCardNumber] = reactExports.useState("");
    const validateForm = (filterType, cardNumber) => {
        switch (filterType) {
            case undefined: {
                return {
                    state: "invalid",
                    errors: {
                        filterType: t("guide-requests-app.filters-modal.select-value-error", "Select a value"),
                    },
                };
            }
            case "anyValue": {
                return { state: "valid", values: [`:*`] };
            }
            case "exactMatch": {
                if (CARD_NUMBER_REGEX.test(cardNumber)) {
                    return { state: "valid", values: [`:*${cardNumber}`] };
                }
                else {
                    return {
                        state: "invalid",
                        errors: {
                            cardNumber: t("guide-requests-app.filter-modal.credit-card-digits-format-error", "Enter the last four digits of the credit card, using only numbers"),
                        },
                    };
                }
            }
        }
    };
    reactExports.useEffect(() => {
        onSelect(validateForm(undefined, ""));
    }, []);
    const handleFilterTypeSelect = (value) => {
        setFilterType(value);
        onSelect(validateForm(value, cardNumber));
    };
    const handleCardNumberChanged = (e) => {
        const value = e.target.value;
        setCardNumber(value);
        onSelect(validateForm(filterType, value));
    };
    return (jsxRuntimeExports.jsxs(Container$6, { children: [jsxRuntimeExports.jsx(FilterTypeDropdown, { selectedFilter: filterType, onFilterTypeSelect: handleFilterTypeSelect, errors: errors }), filterType === "exactMatch" && (jsxRuntimeExports.jsxs(Field, { children: [jsxRuntimeExports.jsx(Field.Label, { children: t("guide-requests-app.filter-modal.credit-card-digits-label", "Enter the last four digits of the credit card") }), jsxRuntimeExports.jsx(Input, { type: "text", inputMode: "numeric", value: cardNumber, onChange: handleCardNumberChanged, validation: errors.cardNumber ? "error" : undefined, maxLength: 4 }), jsxRuntimeExports.jsx(FieldError, { errors: errors, field: "cardNumber" })] }))] }));
}

const Container$5 = styled.div `
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.sm};
`;
function CustomDateFilter({ initialValues: [from, to], onChange, errors, allowFutureDates, className, }) {
    const { t, i18n } = useTranslation();
    const currentLocale = i18n.language;
    const [startValue, setStartValue] = reactExports.useState(from);
    const [endValue, setEndValue] = reactExports.useState(to);
    const handleStartDateChange = (e) => {
        const startDate = e.target.value ? new Date(e.target.value) : undefined;
        setStartValue(startDate);
        onChange([startDate, endValue]);
    };
    const handleEndDateChange = (e) => {
        const endDate = e.target.value ? new Date(e.target.value) : undefined;
        setEndValue(endDate);
        onChange([startValue, endDate]);
    };
    const handleDatePickerChange = (changes) => {
        changes.startValue && setStartValue(changes.startValue);
        changes.endValue && setEndValue(changes.endValue);
        onChange([changes.startValue ?? startValue, changes.endValue ?? endValue]);
    };
    return (jsxRuntimeExports.jsx("div", { className: className, children: isMobile() ? (jsxRuntimeExports.jsxs(Container$5, { children: [jsxRuntimeExports.jsxs(Field, { children: [jsxRuntimeExports.jsx(Field.Label, { children: t("guide-requests-app.startDate", "Start") }), jsxRuntimeExports.jsx(Input, { type: "date", value: startValue
                                ? formatISO(startValue, { representation: "date" })
                                : "", max: allowFutureDates
                                ? undefined
                                : formatISO(new Date(), { representation: "date" }), onChange: handleStartDateChange, validation: errors.startDate ? "error" : undefined, required: true }), jsxRuntimeExports.jsx(FieldError, { errors: errors, field: "startDate" })] }), jsxRuntimeExports.jsxs(Field, { children: [jsxRuntimeExports.jsx(Field.Label, { children: t("guide-requests-app.endDate", "End") }), jsxRuntimeExports.jsx(Input, { type: "date", value: endValue ? formatISO(endValue, { representation: "date" }) : "", max: allowFutureDates
                                ? undefined
                                : formatISO(new Date(), { representation: "date" }), onChange: handleEndDateChange, validation: errors.endDate ? "error" : undefined, required: true }), jsxRuntimeExports.jsx(FieldError, { errors: errors, field: "endDate" })] })] })) : (jsxRuntimeExports.jsx(DatePickerRange, { startValue: startValue, endValue: endValue, maxValue: allowFutureDates ? undefined : new Date(), onChange: handleDatePickerChange, locale: currentLocale, isCompact: true, children: jsxRuntimeExports.jsxs(Container$5, { children: [jsxRuntimeExports.jsxs(Grid.Row, { children: [jsxRuntimeExports.jsx(Grid.Col, { children: jsxRuntimeExports.jsxs(Field, { children: [jsxRuntimeExports.jsx(Field.Label, { children: t("guide-requests-app.startDate", "Start") }), jsxRuntimeExports.jsx(DatePickerRange.Start, { children: jsxRuntimeExports.jsx(Input, { validation: errors.startDate ? "error" : undefined }) }), jsxRuntimeExports.jsx(FieldError, { errors: errors, field: "startDate" })] }) }), jsxRuntimeExports.jsx(Grid.Col, { children: jsxRuntimeExports.jsxs(Field, { children: [jsxRuntimeExports.jsx(Field.Label, { children: t("guide-requests-app.endDate", "End") }), jsxRuntimeExports.jsx(DatePickerRange.End, { children: jsxRuntimeExports.jsx(Input, { validation: errors.endDate ? "error" : undefined }) }), jsxRuntimeExports.jsx(FieldError, { errors: errors, field: "endDate" })] }) })] }), jsxRuntimeExports.jsx(Grid.Row, { children: jsxRuntimeExports.jsx(Grid.Col, { children: jsxRuntimeExports.jsx(DatePickerRange.Calendar, {}) }) })] }) })) }));
}

const StyledCustomDateFilter = styled(CustomDateFilter) `
  margin-top: ${(p) => p.theme.space.md};
`;
function DateFilter({ label, onSelect, errors, allowFutureDates, }) {
    const { t } = useTranslation();
    const [selectedItem, setSelectedItem] = reactExports.useState(null);
    const { createDefaultDateRangeI18N } = useFilterTranslations();
    const dateRangeI18n = createDefaultDateRangeI18N();
    const customDatesInitialValues = [new Date(), new Date()];
    const renderItemValue = (value, dateRangeI18n) => {
        switch (value) {
            case null:
                return "";
            case "custom":
                return t("guide-requests-app.custom", "Custom");
            default:
                return dateRangeI18n[value] || "";
        }
    };
    const validateCustomDates = ({ values: [startDate, endDate], allowFutureDates, }) => {
        if (startDate === undefined || endDate === undefined) {
            const errors = {};
            if (startDate === undefined) {
                errors.startDate = t("guide-requests-app.no-start-date-error", "Select a start date");
            }
            if (endDate === undefined) {
                errors.endDate = t("guide-requests-app.no-end-date-error", "Select an end date");
            }
            return { state: "invalid", errors };
        }
        else if (startDate > endDate) {
            return {
                state: "invalid",
                errors: {
                    endDate: t("guide-requests-app.endDateAfterStartDate", "End date must occur after the start date"),
                },
            };
        }
        else {
            const errors = {};
            const today = new Date();
            if (!allowFutureDates && startDate > today) {
                errors.startDate = t("guide-requests-app.date-lte-today", "Select a date earlier than or equal to today");
            }
            if (!allowFutureDates && endDate > today) {
                errors.endDate = t("guide-requests-app.date-lte-today", "Select a date earlier than or equal to today");
            }
            if (Object.keys(errors).length > 0) {
                return { state: "invalid", errors };
            }
            else {
                const values = [
                    `>=${format(startDate, "yyyy-MM-dd")}`,
                    `<=${format(endDate, "yyyy-MM-dd")}`,
                ];
                return { state: "valid", values };
            }
        }
    };
    const validateForm = (itemValue, allowFutureDates, customDateValues = [undefined, undefined]) => {
        if (itemValue === null) {
            return {
                state: "invalid",
                errors: {
                    dateFilterItem: t("guide-requests-app.filters-modal.select-value-error", "Select a value"),
                },
            };
        }
        else if (itemValue !== "custom") {
            return { state: "valid", values: [itemValue] };
        }
        else {
            return validateCustomDates({
                values: customDateValues,
                allowFutureDates,
            });
        }
    };
    reactExports.useEffect(() => {
        onSelect(validateForm(null, allowFutureDates, customDatesInitialValues));
    }, []);
    function handleItemSelected(item) {
        setSelectedItem(item);
        onSelect(validateForm(item, allowFutureDates, customDatesInitialValues));
    }
    function handleCustomDateSelected(values) {
        onSelect(validateForm(selectedItem, allowFutureDates, values));
    }
    return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsxs(Dropdown, { selectedItem: selectedItem, onSelect: handleItemSelected, children: [jsxRuntimeExports.jsxs(Field$1, { children: [jsxRuntimeExports.jsx(Label, { children: label }), jsxRuntimeExports.jsx(Select, { validation: errors.dateFilterItem ? "error" : undefined, children: renderItemValue(selectedItem, dateRangeI18n) }), jsxRuntimeExports.jsx(FieldError, { errors: errors, field: "dateFilterItem" })] }), jsxRuntimeExports.jsxs(ModalMenu, { children: [Object.entries(dateRangeI18n).map(([value, label]) => (jsxRuntimeExports.jsx(Item, { value: value, children: label }, value))), jsxRuntimeExports.jsx(Item, { value: "custom", children: t("guide-requests-app.custom", "Custom") })] })] }), selectedItem === "custom" && (jsxRuntimeExports.jsx(StyledCustomDateFilter, { initialValues: customDatesInitialValues, onChange: handleCustomDateSelected, errors: errors, allowFutureDates: allowFutureDates }))] }));
}

function useDropdownFilter(options, key) {
    const { t } = useTranslation();
    const [inputValue, setInputValue] = reactExports.useState("");
    const [matchingFields, setMatchingFields] = reactExports.useState(options);
    const filterMatchingOptionsRef = reactExports.useRef((value) => {
        const matchedOptions = options.filter((option) => {
            return option[key]
                .trim()
                .toLowerCase()
                .includes(value.trim().toLowerCase());
        });
        setMatchingFields(matchedOptions);
    });
    const onInputValueChange = (value) => setInputValue(value);
    const dropdownProps = {
        inputValue,
        onInputValueChange,
    };
    const renderItems = (render) => matchingFields.length ? (jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: matchingFields.map((option) => render(option)) })) : (jsxRuntimeExports.jsx(Item, { disabled: true, children: t("guide-requests-app.filters-modal.no-matches-found", "No matches found") }));
    reactExports.useEffect(() => {
        filterMatchingOptionsRef.current(inputValue);
    }, [inputValue]);
    return { dropdownProps, renderItems };
}

function Multiselect$1({ label, options, onSelect, errors, }) {
    const { t } = useTranslation();
    const validateForm = (selectedOptions) => {
        if (selectedOptions.length > 0) {
            return {
                state: "valid",
                values: selectedOptions.map((option) => option.value),
            };
        }
        else {
            return {
                state: "invalid",
                errors: {
                    selectedOptions: t("guide-requests-app.filters-modal.multiselect-no-value-error", "Select at least one value"),
                },
            };
        }
    };
    const [selectedOptions, setSelectedOptions] = reactExports.useState([]);
    const { dropdownProps, renderItems } = useDropdownFilter(options, "value");
    reactExports.useEffect(() => {
        onSelect(validateForm([]));
    }, []);
    function handleSelect(items) {
        setSelectedOptions(items);
        onSelect(validateForm(items));
    }
    return (jsxRuntimeExports.jsxs(Dropdown, { ...dropdownProps, selectedItems: selectedOptions, onSelect: handleSelect, downshiftProps: {
            defaultHighlightedIndex: 0,
            itemToString: (option) => option?.value,
        }, children: [jsxRuntimeExports.jsxs(Field$1, { children: [jsxRuntimeExports.jsx(Label, { children: label }), jsxRuntimeExports.jsx(Multiselect$2, { renderItem: ({ value, removeValue }) => (jsxRuntimeExports.jsxs(Tag, { children: [jsxRuntimeExports.jsx("span", { children: value.label }), jsxRuntimeExports.jsx(Tag.Close, { onClick: () => removeValue() })] })), validation: errors.selectedOptions ? "error" : undefined }), jsxRuntimeExports.jsx(FieldError, { errors: errors, field: "selectedOptions" })] }), jsxRuntimeExports.jsx(ModalMenu, { children: renderItems((option) => (jsxRuntimeExports.jsx(Item, { value: option, children: option.label }, option.value))) })] }));
}

const Container$4 = styled.div `
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.sm};
`;
function NumberFilter({ label, onSelect, errors, type, }) {
    const { t } = useTranslation();
    const [filter, setFilter] = reactExports.useState(null);
    const validateForm = (filter, type) => {
        if (filter === null) {
            return {
                state: "invalid",
                errors: {
                    filterType: t("guide-requests-app.filters-modal.no-filter-type-error", "Select a filter type"),
                },
            };
        }
        switch (filter.type) {
            case "anyValue": {
                return {
                    state: "valid",
                    values: [":*"],
                };
            }
            case "range": {
                const minValue = parseFloat(filter.minValue);
                const maxValue = parseFloat(filter.maxValue);
                if (Number.isNaN(minValue)) {
                    return {
                        state: "invalid",
                        errors: {
                            minValue: t("guide-requests-app.filters-modal.no-text-value-error", "Insert a value"),
                        },
                    };
                }
                if (Number.isNaN(maxValue)) {
                    return {
                        state: "invalid",
                        errors: {
                            maxValue: t("guide-requests-app.filters-modal.no-text-value-error", "Insert a value"),
                        },
                    };
                }
                if (type === "integer" && !Number.isInteger(minValue)) {
                    return {
                        state: "invalid",
                        errors: {
                            minValue: t("guide-requests-app.filter-modal.integer-value-error", "Insert an integer value"),
                        },
                    };
                }
                if (type === "integer" && !Number.isInteger(maxValue)) {
                    return {
                        state: "invalid",
                        errors: {
                            maxValue: t("guide-requests-app.filter-modal.integer-value-error", "Insert an integer value"),
                        },
                    };
                }
                if (minValue >= maxValue) {
                    return {
                        state: "invalid",
                        errors: {
                            maxValue: t("guide-requests-app.filter-modal.minValue-greater-than-maxValue", "Select a value greater than min value"),
                        },
                    };
                }
                return { state: "valid", values: [`>=${minValue}`, `<=${maxValue}`] };
            }
            case "exactMatch": {
                const { value } = filter;
                if (value === "") {
                    return {
                        state: "invalid",
                        errors: {
                            exactValue: t("guide-requests-app.filters-modal.no-text-value-error", "Insert a value"),
                        },
                    };
                }
                else if (type === "integer" && !Number.isInteger(Number(value))) {
                    return {
                        state: "invalid",
                        errors: {
                            exactValue: t("guide-requests-app.filter-modal.integer-value-error", "Insert an integer value"),
                        },
                    };
                }
                else {
                    return { state: "valid", values: [`:${value}`] };
                }
            }
        }
    };
    reactExports.useEffect(() => {
        onSelect(validateForm(null, type));
    }, []);
    const handleFilterTypeSelect = (value) => {
        let newFilter;
        switch (value) {
            case "anyValue": {
                newFilter = { type: "anyValue" };
                break;
            }
            case "range": {
                newFilter = { type: "range", minValue: "", maxValue: "" };
                break;
            }
            case "exactMatch": {
                newFilter = { type: "exactMatch", value: "" };
                break;
            }
        }
        setFilter(newFilter);
        onSelect(validateForm(newFilter, type));
    };
    const handleMinValueChanged = (newValue, filter) => {
        const newFilter = { ...filter, minValue: newValue };
        setFilter(newFilter);
        onSelect(validateForm(newFilter, type));
    };
    const handleMaxValueChanged = (newValue, filter) => {
        const newFilter = { ...filter, maxValue: newValue };
        setFilter(newFilter);
        onSelect(validateForm(newFilter, type));
    };
    const handleExactValueChanged = (newValue, filter) => {
        const newFilter = { ...filter, value: newValue };
        setFilter(newFilter);
        onSelect(validateForm(newFilter, type));
    };
    const { filterTypeDropdownI18N } = useFilterTranslations();
    return (jsxRuntimeExports.jsxs(Container$4, { children: [jsxRuntimeExports.jsxs(Dropdown, { selectedItem: filter?.type, onSelect: handleFilterTypeSelect, children: [jsxRuntimeExports.jsxs(Field$1, { children: [jsxRuntimeExports.jsx(Label, { children: t("guide-requests-app.filter-modal.filterTypeLabel", "Filter type") }), jsxRuntimeExports.jsx(Select, { validation: errors.filterType ? "error" : undefined, children: filter ? filterTypeDropdownI18N[filter.type] : "" }), jsxRuntimeExports.jsx(FieldError, { errors: errors, field: "filterType" })] }), jsxRuntimeExports.jsxs(ModalMenu, { children: [jsxRuntimeExports.jsx(Item, { value: "anyValue", children: filterTypeDropdownI18N.anyValue }), jsxRuntimeExports.jsx(Item, { value: "range", children: filterTypeDropdownI18N.range }), jsxRuntimeExports.jsx(Item, { value: "exactMatch", children: filterTypeDropdownI18N.exactMatch })] })] }), filter?.type === "range" && (jsxRuntimeExports.jsxs(Grid.Row, { children: [jsxRuntimeExports.jsx(Grid.Col, { children: jsxRuntimeExports.jsxs(Field, { children: [jsxRuntimeExports.jsx(Field.Label, { children: t("guide-requests-app.filter-modal.minValue", "Min value") }), jsxRuntimeExports.jsx(Input, { type: "number", value: filter.minValue, onChange: (e) => {
                                        handleMinValueChanged(e.target.value, filter);
                                    }, validation: errors.minValue ? "error" : undefined }), jsxRuntimeExports.jsx(FieldError, { errors: errors, field: "minValue" })] }) }), jsxRuntimeExports.jsx(Grid.Col, { children: jsxRuntimeExports.jsxs(Field, { children: [jsxRuntimeExports.jsx(Field.Label, { children: t("guide-requests-app.filter-modal.maxValue", "Max value") }), jsxRuntimeExports.jsx(Input, { type: "number", value: filter.maxValue, onChange: (e) => {
                                        handleMaxValueChanged(e.target.value, filter);
                                    }, validation: errors.maxValue ? "error" : undefined }), jsxRuntimeExports.jsx(FieldError, { errors: errors, field: "maxValue" })] }) })] })), filter?.type === "exactMatch" && (jsxRuntimeExports.jsxs(Field, { children: [jsxRuntimeExports.jsx(Field.Label, { children: t("guide-requests-app.filters-modal.enter-field-value", "Enter {{field_name}}", {
                            field_name: label,
                        }) }), jsxRuntimeExports.jsx(Input, { type: "number", value: filter.value, onChange: (e) => {
                            handleExactValueChanged(e.target.value, filter);
                        }, validation: errors.exactValue ? "error" : undefined }), jsxRuntimeExports.jsx(FieldError, { errors: errors, field: "exactValue" })] }))] }));
}

const Gap$1 = styled.div `
  height: ${(p) => p.theme.space.md};
`;
const TextField = ({ label, onSelect, errors, }) => {
    const { t } = useTranslation();
    const [value, setValue] = reactExports.useState("");
    const [selectedFilter, setSelectedFilter] = reactExports.useState();
    const validateForm = (filterType, value) => {
        switch (filterType) {
            case undefined: {
                return {
                    state: "invalid",
                    errors: {
                        filterType: t("guide-requests-app.filters-modal.no-filter-type-error", "Select a filter type"),
                    },
                };
            }
            case "anyValue": {
                return { state: "valid", values: [":*"] };
            }
            case "exactMatch": {
                if (value !== "") {
                    return { state: "valid", values: [`:"${value}"`] };
                }
                else {
                    return {
                        state: "invalid",
                        errors: {
                            textValue: t("guide-requests-app.filters-modal.no-text-value-error", "Insert a value"),
                        },
                    };
                }
            }
        }
    };
    reactExports.useEffect(() => {
        onSelect(validateForm(undefined, ""));
    }, []);
    const handleFilterTypeSelect = (filterType) => {
        setSelectedFilter(filterType);
        onSelect(validateForm(filterType, value));
    };
    const handleChange = (event) => {
        const inputValue = event.target.value;
        setValue(inputValue);
        onSelect(validateForm(selectedFilter, inputValue));
    };
    return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(FilterTypeDropdown, { onFilterTypeSelect: handleFilterTypeSelect, selectedFilter: selectedFilter, errors: errors }), jsxRuntimeExports.jsx(Gap$1, {}), selectedFilter === "exactMatch" && (jsxRuntimeExports.jsxs(Field, { children: [jsxRuntimeExports.jsx(Field.Label, { children: t("guide-requests-app.filters-modal.enter-field-value", "Enter {{field_name}}", {
                            field_name: label,
                        }) }), jsxRuntimeExports.jsx(Input, { value: value, onChange: handleChange, validation: errors["textValue"] ? "error" : undefined }), jsxRuntimeExports.jsx(FieldError, { errors: errors, field: "textValue" })] }))] }));
};

function FilterValueField({ selectedFilterProperty, ticketFields, organizations, customStatusOptions, onSelect, errors, }) {
    const { t } = useTranslation();
    const { statusFilterValuesI18N } = useFilterTranslations();
    if (selectedFilterProperty.identifier === "created_at" ||
        selectedFilterProperty.identifier === "updated_at") {
        return (jsxRuntimeExports.jsx(DateFilter, { label: selectedFilterProperty.label, onSelect: onSelect, errors: errors, allowFutureDates: false }));
    }
    if (selectedFilterProperty.identifier === "status") {
        const options = Object.entries(statusFilterValuesI18N).map(([value, label]) => ({
            value: value,
            label,
        }));
        return (jsxRuntimeExports.jsx(Multiselect$1, { label: t("guide-requests-app.status", "Status"), onSelect: onSelect, options: options, errors: errors }));
    }
    if (selectedFilterProperty.identifier === "custom_status_id") {
        return (jsxRuntimeExports.jsx(Multiselect$1, { label: t("guide-requests-app.status", "Status"), onSelect: onSelect, options: customStatusOptions, errors: errors }));
    }
    if (selectedFilterProperty.identifier === "organization") {
        const options = organizations.map((organization) => ({
            label: organization.name,
            value: `:${organization.id}`,
        }));
        return (jsxRuntimeExports.jsx(Multiselect$1, { label: t("guide-requests-app.organization", "Organization"), onSelect: onSelect, options: options, errors: errors }));
    }
    const ticketField = ticketFields.find((field) => String(field.id) === selectedFilterProperty.identifier);
    if (ticketField == null) {
        return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {});
    }
    const { type, title_in_portal } = ticketField;
    switch (type) {
        case "textarea":
        case "text":
        case "regexp": {
            return (jsxRuntimeExports.jsx(TextField, { label: title_in_portal, onSelect: onSelect, errors: errors }));
        }
        case "tagger":
        case "multiselect": {
            const options = ticketField.custom_field_options?.map((option) => ({
                value: `:${option.value}`,
                label: option.name,
            })) ?? [];
            return (jsxRuntimeExports.jsx(Multiselect$1, { label: title_in_portal, onSelect: onSelect, options: options, errors: errors }));
        }
        case "date": {
            return (jsxRuntimeExports.jsx(DateFilter, { label: title_in_portal, onSelect: onSelect, errors: errors, allowFutureDates: true }));
        }
        case "integer":
        case "decimal": {
            return (jsxRuntimeExports.jsx(NumberFilter, { label: title_in_portal, onSelect: onSelect, errors: errors, type: type }));
        }
        case "checkbox": {
            return (jsxRuntimeExports.jsx(CheckboxFilter, { label: title_in_portal, onSelect: onSelect, errors: errors }));
        }
        case "partialcreditcard": {
            return jsxRuntimeExports.jsx(CreditCardFilter, { onSelect: onSelect, errors: errors });
        }
        default:
            return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {});
    }
}

const HIDDEN_FIELDS$1 = [
    "description",
    "group",
    "assignee",
    "custom_status",
    "status",
    "subject",
    "priority",
    "tickettype",
    "lookup",
    "requester",
];
function FilterPropertyDropdown({ ticketFields, organizations, selectedProperty, hasCustomStatuses, onSelect, errors, }) {
    const { t } = useTranslation();
    const filterProperties = [
        {
            identifier: "created_at",
            label: t("guide-requests-app.createdDate", "Created date"),
        },
        {
            identifier: "updated_at",
            label: t("guide-requests-app.updatedDate", "Updated date"),
        },
        hasCustomStatuses
            ? {
                identifier: "custom_status_id",
                label: t("guide-requests-app.status", "Status"),
            }
            : {
                identifier: "status",
                label: t("guide-requests-app.status", "Status"),
            },
        ...(organizations.length > 1
            ? [
                {
                    identifier: "organization",
                    label: t("guide-requests-app.organization", "Organization"),
                },
            ]
            : []),
        ...ticketFields
            .filter((field) => !HIDDEN_FIELDS$1.includes(field.type))
            .map(({ id, title_in_portal }) => ({
            identifier: String(id),
            label: title_in_portal,
        })),
    ];
    const { dropdownProps, renderItems } = useDropdownFilter(filterProperties, "label");
    return (jsxRuntimeExports.jsxs(Dropdown, { ...dropdownProps, selectedItem: selectedProperty, onSelect: onSelect, downshiftProps: {
            defaultHighlightedIndex: 0,
            itemToString: (property) => `${property?.identifier}`,
        }, children: [jsxRuntimeExports.jsxs(Field$1, { children: [jsxRuntimeExports.jsx(Label, { children: t("guide-requests-app.filters-modal.select-filter", "Select filter") }), jsxRuntimeExports.jsx(Autocomplete, { validation: errors.ticketField ? "error" : undefined, children: selectedProperty?.label }), jsxRuntimeExports.jsx(FieldError, { errors: errors, field: "ticketField" })] }), jsxRuntimeExports.jsx(ModalMenu, { children: renderItems((property) => (jsxRuntimeExports.jsx(Item, { value: property, children: property.label }, property.identifier))) })] }));
}

const Gap = styled.div `
  height: ${(p) => p.theme.space.md};
`;
const systemType = [
    "subject",
    "description",
    "status",
    "custom_status",
    "type",
    "priority",
    "basic_priority",
    "assignee",
    "group",
    "tickettype",
    "requester",
];
function isSystemFieldType(type) {
    return systemType.includes(type);
}
function FilterModal({ onClose, ticketFields, organizations, filterValuesMap, onFiltersChanged, customStatusesEnabled, customStatusOptions, }) {
    const { t } = useTranslation();
    const [selectedFilterProperty, setSelectedFilterProperty] = reactExports.useState();
    const [formState, setFormState] = reactExports.useState();
    const [errors, setErrors] = reactExports.useState({});
    const modalContainer = useModalContainer();
    const handleSelectFilterProperty = (property) => {
        setErrors({});
        setSelectedFilterProperty(property);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedFilterProperty) {
            setErrors({
                ticketField: t("guide-requests-app.filters-modal.select-filter-required", "Select a filter"),
            });
            return;
        }
        if (formState?.state === "valid") {
            const filterKey = isSystemFieldType(selectedFilterProperty.identifier) ||
                selectedFilterProperty.identifier === "created_at" ||
                selectedFilterProperty.identifier === "updated_at" ||
                selectedFilterProperty.identifier === "organization" ||
                selectedFilterProperty.identifier === "custom_status_id"
                ? selectedFilterProperty.identifier
                : `custom_field_${selectedFilterProperty.identifier}`;
            onFiltersChanged({
                ...filterValuesMap,
                [filterKey]: formState.values,
            });
            onClose();
        }
        else if (formState?.state === "invalid") {
            setErrors(formState.errors);
        }
    };
    return (jsxRuntimeExports.jsx(Modal, { appendToNode: modalContainer, onClose: onClose, children: jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, noValidate: true, children: [jsxRuntimeExports.jsx(Header, { children: t("guide-requests-app.filters-modal.title", "Filters") }), jsxRuntimeExports.jsxs(Body, { children: [jsxRuntimeExports.jsx(FilterPropertyDropdown, { ticketFields: ticketFields, organizations: organizations, hasCustomStatuses: customStatusesEnabled, selectedProperty: selectedFilterProperty, onSelect: handleSelectFilterProperty, errors: errors }), jsxRuntimeExports.jsx(Gap, {}), selectedFilterProperty && (jsxRuntimeExports.jsx(FilterValueField, { selectedFilterProperty: selectedFilterProperty, ticketFields: ticketFields, organizations: organizations, customStatusOptions: customStatusOptions, onSelect: setFormState, errors: errors }, selectedFilterProperty.identifier))] }), jsxRuntimeExports.jsxs(Footer, { children: [jsxRuntimeExports.jsx(FooterItem, { children: jsxRuntimeExports.jsx(Button, { type: "button", onClick: onClose, isBasic: true, children: t("guide-requests-app.cancel", "Cancel") }) }), jsxRuntimeExports.jsx(FooterItem, { children: jsxRuntimeExports.jsx(Button, { type: "submit", isPrimary: true, children: t("guide-requests-app.filters-modal.apply-filter-button", "Apply filter") }) })] }), jsxRuntimeExports.jsx(Close, { "aria-label": t("guide-requests-app.closeModal", "Close modal") })] }) }));
}

function FilterTagWrapper({ field, onFilterRemoved, children, }) {
    function handleFilterKeyDown(e) {
        if (e.code === "Delete" || e.code === "Backspace") {
            e.preventDefault();
            onFilterRemoved();
        }
    }
    return (jsxRuntimeExports.jsxs(Tag, { size: "large", isRegular: true, tabIndex: 0, onKeyDown: (e) => handleFilterKeyDown(e), children: [children, jsxRuntimeExports.jsx(Tag.Close, { onClick: () => onFilterRemoved() })] }, field));
}

function getTextLabel(values) {
    const value = values[0]?.substring(1);
    if (!value || value === "*") {
        return "";
    }
    return value.substring(1, value.length - 1);
}
function getNumberLabel(values) {
    const [first, second] = values;
    if (values.length === 1 && first) {
        const trimmed = first.substring(1);
        if (!trimmed || trimmed === "*") {
            return "";
        }
        return trimmed;
    }
    if (values.length === 2 && first && second) {
        return `${first.substring(2)} - ${second.substring(2)}`;
    }
    return "";
}
function getCreditCardLabel(values) {
    const value = values[0]?.substring(2);
    return value === "" ? "" : `XXXXXXXXXXXX${value}`;
}
function FieldTags({ identifier, ticketFields, organizations, values, customStatusOptions, onFilterRemoved, }) {
    const { t, i18n } = useTranslation();
    const currentLocale = i18n.language;
    const { checkboxFilterValuesI18N, statusFilterValuesI18N, createDefaultDateRangeI18N, } = useFilterTranslations();
    const getDateRangeLabel = ([from, to]) => {
        const startDate = new Date(from.substring(2));
        const endDate = new Date(to.substring(2));
        const longDate = new Intl.DateTimeFormat(currentLocale, {
            dateStyle: "long",
        });
        return longDate.formatRange(startDate, endDate);
    };
    const getDateLabel = (values) => {
        const firstValue = values[0];
        if (values.length === 1 && firstValue !== undefined) {
            return createDefaultDateRangeI18N()[firstValue] || "";
        }
        else {
            return getDateRangeLabel(values);
        }
    };
    if (identifier === "organization") {
        const organization = organizations.find((o) => String(o.id) === values[0]?.substring(1));
        return organization ? (jsxRuntimeExports.jsx(FilterTagWrapper, { field: identifier, values: values, onFilterRemoved: () => {
                onFilterRemoved(values);
            }, children: jsxRuntimeExports.jsxs("span", { children: [jsxRuntimeExports.jsx(Span, { isBold: true, children: t("guide-requests-app.organization", "Organization") }), " ", organization.name] }) })) : (jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {}));
    }
    if (identifier === "created_at") {
        return (jsxRuntimeExports.jsx(FilterTagWrapper, { field: identifier, values: values, onFilterRemoved: () => {
                onFilterRemoved(values);
            }, children: jsxRuntimeExports.jsxs("span", { children: [jsxRuntimeExports.jsx(Span, { isBold: true, children: t("guide-requests-app.createdDate", "Created date") }), " ", getDateLabel(values)] }) }));
    }
    if (identifier === "updated_at") {
        return (jsxRuntimeExports.jsx(FilterTagWrapper, { field: identifier, values: values, onFilterRemoved: () => {
                onFilterRemoved(values);
            }, children: jsxRuntimeExports.jsxs("span", { children: [jsxRuntimeExports.jsx(Span, { isBold: true, children: t("guide-requests-app.updatedDate", "Updated date") }), " ", getDateLabel(values)] }) }));
    }
    if (identifier === "status") {
        return (jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: values.map((value) => (jsxRuntimeExports.jsx(FilterTagWrapper, { field: identifier, values: values, onFilterRemoved: () => {
                    onFilterRemoved([value]);
                }, children: jsxRuntimeExports.jsxs("span", { children: [jsxRuntimeExports.jsx(Span, { isBold: true, children: t("guide-requests-app.status", "Status") }), " ", statusFilterValuesI18N[value]] }) }, value))) }));
    }
    if (identifier === "custom_status_id") {
        return (jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: values.map((value) => {
                const label = customStatusOptions.find((option) => option.value === value)?.label;
                return (jsxRuntimeExports.jsx(FilterTagWrapper, { field: identifier, values: values, onFilterRemoved: () => {
                        onFilterRemoved([value]);
                    }, children: jsxRuntimeExports.jsxs("span", { children: [jsxRuntimeExports.jsx(Span, { isBold: true, children: t("guide-requests-app.status", "Status") }), " ", label] }) }, value));
            }) }));
    }
    const ticketField = identifier.startsWith("custom_field_")
        ? ticketFields.find((f) => String(f.id) === identifier.replace("custom_field_", ""))
        : ticketFields.find((f) => f.type === identifier);
    if (ticketField == null) {
        return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {});
    }
    switch (ticketField.type) {
        case "date": {
            return (jsxRuntimeExports.jsx(FilterTagWrapper, { field: identifier, values: values, onFilterRemoved: () => {
                    onFilterRemoved(values);
                }, children: jsxRuntimeExports.jsxs("span", { children: [jsxRuntimeExports.jsx(Span, { isBold: true, children: ticketField.title_in_portal }), " ", getDateLabel(values)] }) }));
        }
        case "tagger":
        case "multiselect": {
            return (jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: values.map((value) => {
                    const item = ticketField.custom_field_options?.find((option) => option.value === value.substring(1));
                    return (item && (jsxRuntimeExports.jsx(FilterTagWrapper, { field: identifier, values: [value], onFilterRemoved: () => {
                            onFilterRemoved([value]);
                        }, children: jsxRuntimeExports.jsxs("span", { children: [jsxRuntimeExports.jsx(Span, { isBold: true, children: ticketField.title_in_portal }), " ", item.name] }) }, item.id)));
                }) }));
        }
        case "text":
        case "textarea":
        case "regexp": {
            return (jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: jsxRuntimeExports.jsx(FilterTagWrapper, { field: identifier, values: values, onFilterRemoved: () => {
                        onFilterRemoved(values);
                    }, children: jsxRuntimeExports.jsxs("span", { children: [jsxRuntimeExports.jsx(Span, { isBold: true, children: ticketField.title_in_portal }), " ", getTextLabel(values)] }) }) }));
        }
        case "integer":
        case "decimal": {
            return (jsxRuntimeExports.jsx(FilterTagWrapper, { field: identifier, values: values, onFilterRemoved: () => {
                    onFilterRemoved(values);
                }, children: jsxRuntimeExports.jsxs("span", { children: [jsxRuntimeExports.jsx(Span, { isBold: true, children: ticketField.title_in_portal }), " ", getNumberLabel(values)] }) }));
        }
        case "checkbox": {
            return (jsxRuntimeExports.jsx(FilterTagWrapper, { field: identifier, values: values, onFilterRemoved: () => {
                    onFilterRemoved(values);
                }, children: jsxRuntimeExports.jsxs("span", { children: [jsxRuntimeExports.jsx(Span, { isBold: true, children: ticketField.title_in_portal }), " ", checkboxFilterValuesI18N[values[0]]] }) }));
        }
        case "partialcreditcard": {
            return (jsxRuntimeExports.jsx(FilterTagWrapper, { field: identifier, values: values, onFilterRemoved: () => {
                    onFilterRemoved(values);
                }, children: jsxRuntimeExports.jsxs("span", { children: [jsxRuntimeExports.jsx(Span, { isBold: true, children: ticketField.title_in_portal }), " ", getCreditCardLabel(values)] }) }));
        }
        default: {
            return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {});
        }
    }
}

function removeFilterValuesFromMap(filterValuesMap, field, valuesToRemove) {
    const prevValues = filterValuesMap[field];
    if (prevValues == null) {
        return filterValuesMap;
    }
    const newValues = prevValues.filter((v) => !valuesToRemove.includes(v));
    if (newValues.length === 0) {
        const res = { ...filterValuesMap };
        delete res[field];
        return res;
    }
    else {
        return { ...filterValuesMap, [field]: newValues };
    }
}

const Container$3 = styled.div `
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  min-height: 32px;
  margin-bottom: 28px;
`;
function FilterTags({ filters, ticketFields, organizations, customStatusOptions, onFiltersChanged, }) {
    const { t } = useTranslation();
    function removeFilter(field, values) {
        onFiltersChanged(removeFilterValuesFromMap(filters, field, values));
    }
    return (jsxRuntimeExports.jsxs(Container$3, { children: [Object.entries(filters).map(([field, values]) => {
                return (jsxRuntimeExports.jsx(FieldTags, { ticketFields: ticketFields, organizations: organizations, customStatusOptions: customStatusOptions, values: values, identifier: field, onFilterRemoved: (values) => removeFilter(field, values) }, field));
            }), Object.keys(filters).length > 0 && (jsxRuntimeExports.jsx(Button, { isBasic: true, size: "small", onClick: () => onFiltersChanged({}), children: t("guide-requests-app.clearFilters", "Clear filters") }))] }));
}

const Container$2 = styled.div `
  align-items: flex-end;
  display: flex;
  gap: 12px;
  margin: ${(p) => p.theme.space.sm} 0 ${(p) => p.theme.space.xs};
  ${media.mobile `
    align-items: flex-start;
    flex-direction: column;
  `}
`;
const Block = styled.div `
  display: flex;
  flex-direction: column;
`;
const SearchBlock = styled(Block) `
  width: 400px;
  ${media.mobile `
    flex-direction: column;
    width: 100%;
  `};
`;
const RequestsFilterMenuBlock = Block;
const OrganizationBlock = styled(Block) `
  ${media.mobile `
    align-items: flex-end;
    flex-direction: row;
    gap: 12px;
  `};
`;
const OrganizationsManagementBlock = styled(Block) `
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  flex-grow: 1;
`;
const StyledSpan = styled(Span) `
  margin-bottom: ${(p) => p.theme.space.xs};
`;
/**
 * This function creates an array of `MultiSelectOption`, grouping options
 * with the same label together.
 *
 * For example, from this array of custom statuses
 * ```
 * [
 *  { id: 1, label: "Open", ...},
 *  { id: 2, label: "Open", ... },
 *  { id: 3, label: "Solved", ... },
 *  { id: 4, label: "Closed", ... },
 * ]
 * ```
 *
 * It will return
 * ```
 * [
 *  { label: "Open", value: ":1 :2" },
 *  { label: "Solved", value: ":3" },
 *  { label: "Open", value: ":4" },
 * ]
 * ```
 * @param customStatuses Array of custom statuses
 * @returns A array of multiselect option
 */
function createCustomStatusOptions(customStatuses) {
    const res = [];
    for (const customStatus of customStatuses) {
        const label = (customStatus.label ?? customStatus.end_user_label);
        const existingOption = res.find((option) => option.label === label);
        if (existingOption) {
            existingOption.value += ` :${customStatus.id}`;
        }
        else {
            res.push({ label, value: `:${customStatus.id}` });
        }
    }
    return res;
}
function RequestsToolbar({ hasPagination, page, requestsCount, requestsPerPage, query, onSearchSubmit, filters, onFiltersChanged, organizations, selectedTab, onOrganizationSelected, user, ticketFields, customStatuses, customStatusesEnabled, }) {
    const { t } = useTranslation();
    const [isFilterModalOpen, setIsFilterModalOpen] = reactExports.useState(false);
    const customStatusOptions = reactExports.useMemo(() => createCustomStatusOptions(customStatuses), [customStatuses]);
    const from = (page - 1) * requestsPerPage + 1;
    let to = from + requestsPerPage - 1;
    if (to > requestsCount)
        to = requestsCount;
    const isOrganizationTab = selectedTab.name === ORG_REQUESTS_TAB_NAME;
    const hasOrganizations = organizations.length > 0;
    return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(Span, { role: "status", hidden: true, children: hasPagination
                    ? t("guide-requests-app.requestCount.screenreader.range", "{{from}} to {{to}} of {{total}} requests", {
                        from,
                        to,
                        total: requestsCount,
                    })
                    : t("guide-requests-app.requestCount", "{{count}} requests", {
                        count: requestsCount,
                    }) }), jsxRuntimeExports.jsxs(Container$2, { children: [jsxRuntimeExports.jsxs(SearchBlock, { children: [jsxRuntimeExports.jsx(StyledSpan, { children: hasPagination
                                    ? t("guide-requests-app.requestCount.range", "{{from}} - {{to}} of {{total}} requests", {
                                        from,
                                        to,
                                        total: requestsCount,
                                    })
                                    : t("guide-requests-app.requestCount", "{{count}} requests", {
                                        count: requestsCount,
                                    }) }), jsxRuntimeExports.jsx(RequestsSearch, { query: query, onSearchSubmit: onSearchSubmit })] }), isOrganizationTab && (jsxRuntimeExports.jsxs(OrganizationBlock, { children: [jsxRuntimeExports.jsx(OrganizationsDropdown, { organizations: organizations, currentOrganizationId: selectedTab.organizationId, onOrganizationSelected: onOrganizationSelected }), hasOrganizations && user && (jsxRuntimeExports.jsx(Mobile, { children: jsxRuntimeExports.jsx(OrganizationsManagement, { organizations: organizations, user: user }) }))] })), jsxRuntimeExports.jsx(RequestsFilterMenuBlock, { children: jsxRuntimeExports.jsx(Button, { onClick: () => {
                                setIsFilterModalOpen(true);
                            }, children: t("guide-requests-app.filter", "Filter") }) }), jsxRuntimeExports.jsx(OrganizationsManagementBlock, { children: jsxRuntimeExports.jsx(Desktop, { children: isOrganizationTab && hasOrganizations && user && (jsxRuntimeExports.jsx(OrganizationsManagement, { organizations: organizations, user: user })) }) })] }), jsxRuntimeExports.jsx(FilterTags, { filters: filters, ticketFields: ticketFields, organizations: organizations, customStatusOptions: customStatusOptions, onFiltersChanged: onFiltersChanged }), isFilterModalOpen && (jsxRuntimeExports.jsx(FilterModal, { onClose: () => setIsFilterModalOpen(false), ticketFields: ticketFields, filterValuesMap: filters, onFiltersChanged: onFiltersChanged, organizations: isOrganizationTab ? [] : organizations, customStatusesEnabled: customStatusesEnabled, customStatusOptions: customStatusOptions }))] }));
}

var location = {
    assign(url) {
        return window.location.assign(url);
    },
};

const ONE_MINUTE = 1000 * 60;
const ONE_HOUR = ONE_MINUTE * 60;
function RelativeTime({ date, locale, }) {
    const relativeTimeFormat = reactExports.useMemo(() => new Intl.RelativeTimeFormat(locale, { numeric: "auto" }), [locale]);
    const dateTimeFormat = reactExports.useMemo(() => new Intl.DateTimeFormat(locale, {
        dateStyle: "medium",
        timeStyle: "short",
    }), [locale]);
    const timeFormat = reactExports.useMemo(() => new Intl.DateTimeFormat(locale, {
        timeStyle: "short",
    }), [locale]);
    const [value, setValue] = reactExports.useState("");
    reactExports.useEffect(() => {
        const update = () => {
            setValue(getRelativeTime(date, relativeTimeFormat, dateTimeFormat, timeFormat));
        };
        const intervalId = setInterval(() => {
            update();
        }, ONE_MINUTE);
        update();
        return () => {
            clearInterval(intervalId);
        };
    }, [date, relativeTimeFormat, dateTimeFormat, timeFormat]);
    return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: value });
}
function getRelativeTime(date, relativeTimeFormat, dateTimeFormat, timeFormat) {
    const now = new Date();
    const elapsed = now.valueOf() - date.valueOf();
    if (elapsed < 0) {
        return dateTimeFormat.format(date);
    }
    if (elapsed < ONE_HOUR) {
        const minutes = Math.floor(elapsed / ONE_MINUTE);
        return upperFirst(relativeTimeFormat.format(-minutes, "minutes"));
    }
    if (isToday(date)) {
        const value = `${relativeTimeFormat.format(0, "day")}, ${timeFormat.format(date)}`;
        return upperFirst(value);
    }
    if (isYesterday(date)) {
        const value = `${relativeTimeFormat.format(-1, "day")}, ${timeFormat.format(date)}`;
        return upperFirst(value);
    }
    return dateTimeFormat.format(date);
}

function TruncatedText({ children, tooltip, }) {
    return (jsxRuntimeExports.jsx(Tooltip, { content: tooltip ? tooltip : children, size: "medium", children: jsxRuntimeExports.jsx(Ellipsis, { title: "", children: children }) }));
}

const StyledTag = styled(Tag) `
  margin: 2px;
`;
const SeeMore = styled(Anchor) `
  display: block;
  margin: 5px;
`;
function Multiselect({ tags }) {
    const [isExpanded, setIsExpanded] = reactExports.useState(false);
    const createTag = (tag) => (jsxRuntimeExports.jsx(StyledTag, { isPill: true, children: jsxRuntimeExports.jsx(TruncatedText, { children: tag }) }, tag));
    return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [tags.length === 0 && "-", tags.slice(0, 3).map(createTag), tags.length > 3 && !isExpanded && (jsxRuntimeExports.jsx(SeeMore, { onClick: () => setIsExpanded(true), children: `+ ${tags.length - 3} more` })), isExpanded && tags.slice(3).map(createTag)] }));
}

const Subject = styled(Anchor) `
  word-break: break-word;
`;
const TruncatedTableCell = ({ children, identifier, }) => (jsxRuntimeExports.jsx(Table.Cell, { "data-test-id": `table-cell-${identifier}`, children: children ? jsxRuntimeExports.jsx(TruncatedText, { children: children }) : "-" }));
function RequestsTableCell({ ticketFields, identifier, request, customStatuses, customStatusesEnabled, user, }) {
    const { id, created_at, updated_at, subject, description, status, priority, type, } = request;
    const { t, i18n } = useTranslation();
    const currentLocale = i18n.language;
    const mediumDate = new Intl.DateTimeFormat(currentLocale, {
        dateStyle: "medium",
    });
    const open = {
        color: "red",
        label: t("guide-requests-app.statusOpen", "Open"),
    };
    const pending = {
        color: "#038153",
        label: t("guide-requests-app.statusPending", "Awaiting reply"),
    };
    const solved = {
        color: "#68737d",
        label: t("guide-requests-app.statusSolved", "Solved"),
    };
    const STATUS_MAPPING = {
        new: open,
        open: open,
        hold: open,
        pending: pending,
        solved: solved,
        closed: solved,
    };
    const getCustomFieldValue = (identifier) => request.custom_fields.find((field) => field.id.toString() === identifier)
        ?.value;
    const getCheckboxLabel = (identifier) => {
        const value = getCustomFieldValue(identifier);
        switch (value) {
            case true:
                return t("guide-requests-app.checkbox-filter.selected", "Selected");
            case false:
                return t("guide-requests-app.checkbox-filter.not-selected", "Not selected");
            default:
                return undefined;
        }
    };
    const getStatusLabel = () => {
        if (!customStatusesEnabled) {
            return {
                label: STATUS_MAPPING[status].label,
                tooltip: undefined,
            };
        }
        const customStatus = customStatuses.find((customStatus) => customStatus.id === request.custom_status_id);
        /* We want to always show the end-user label.
    This is exposed in the API as `label` for end-users and `end_user_label` for agents/admins.
    The same applies for the description. */
        const label = customStatus?.label ||
            customStatus?.end_user_label ||
            STATUS_MAPPING[status].label;
        const description = customStatus?.description || customStatus?.end_user_description;
        return {
            label,
            tooltip: description ? `${label} - ${description}` : label,
        };
    };
    if (identifier === "id") {
        return (jsxRuntimeExports.jsx(TruncatedTableCell, { identifier: identifier, children: `#${id}` }));
    }
    if (identifier === "created_at") {
        return (jsxRuntimeExports.jsx(TruncatedTableCell, { identifier: identifier, children: mediumDate.format(new Date(created_at)) }));
    }
    if (identifier === "updated_at") {
        return (jsxRuntimeExports.jsx(TruncatedTableCell, { identifier: identifier, children: jsxRuntimeExports.jsx(RelativeTime, { date: new Date(updated_at), locale: currentLocale }) }));
    }
    if (identifier === "status") {
        const { label, tooltip } = getStatusLabel();
        return (jsxRuntimeExports.jsx(Table.Cell, { "data-test-id": `table-cell-${identifier}`, children: jsxRuntimeExports.jsx(Tag, { hue: STATUS_MAPPING[status].color, children: jsxRuntimeExports.jsx(TruncatedText, { tooltip: tooltip, children: label || "" }) }) }));
    }
    if (identifier === "requester") {
        const nameOrAlias = user?.alias || user?.name;
        return (jsxRuntimeExports.jsx(TruncatedTableCell, { identifier: identifier, children: nameOrAlias }));
    }
    if (identifier === "subject") {
        const requestUrl = `/hc/requests/${id}`;
        const navigateToRequestPage = (e) => {
            e.preventDefault();
            location.assign(requestUrl);
        };
        return (jsxRuntimeExports.jsx(Table.Cell, { role: "rowheader", "data-test-id": `table-cell-${identifier}`, children: jsxRuntimeExports.jsx(Subject, { href: requestUrl, onClick: navigateToRequestPage, children: jsxRuntimeExports.jsx(TruncatedText, { children: subject || description }) }) }));
    }
    const ticketField = ticketFields.find((field) => String(field.id) === identifier || field.type === identifier);
    if (ticketField === undefined) {
        return null;
    }
    switch (ticketField.type) {
        case "priority":
            return (jsxRuntimeExports.jsx(TruncatedTableCell, { identifier: identifier, children: priority }));
        case "tickettype":
            return (jsxRuntimeExports.jsx(TruncatedTableCell, { identifier: identifier, children: type }));
        case "checkbox": {
            return (jsxRuntimeExports.jsx(TruncatedTableCell, { identifier: identifier, children: getCheckboxLabel(identifier) }));
        }
        case "regexp":
        case "partialcreditcard":
        case "text":
        case "textarea":
        case "integer":
        case "decimal": {
            const value = getCustomFieldValue(identifier);
            return (jsxRuntimeExports.jsx(TruncatedTableCell, { identifier: identifier, children: value ? value.toString() : undefined }));
        }
        case "date": {
            const value = getCustomFieldValue(identifier);
            return (jsxRuntimeExports.jsx(TruncatedTableCell, { identifier: identifier, children: value ? (jsxRuntimeExports.jsx(RelativeTime, { date: new Date(value), locale: currentLocale })) : (jsxRuntimeExports.jsx("span", { children: "-" })) }));
        }
        case "tagger": {
            const value = getCustomFieldValue(identifier);
            const name = ticketField.custom_field_options?.find((field) => field.value === value)?.name;
            return (jsxRuntimeExports.jsx(TruncatedTableCell, { identifier: identifier, children: name }));
        }
        case "multiselect": {
            const value = getCustomFieldValue(identifier) || [];
            const tags = value.map((value) => ticketField.custom_field_options?.find((field) => field.value === value)?.name);
            return (jsxRuntimeExports.jsx(Table.Cell, { "data-test-id": `table-cell-${identifier}`, children: jsxRuntimeExports.jsx(Multiselect, { tags: tags }) }));
        }
        default:
            return jsxRuntimeExports.jsx(Table.Cell, {});
    }
}

function RequestsTableRow({ request, ticketFields, selectedAttributes, customStatuses, customStatusesEnabled, user, }) {
    return (jsxRuntimeExports.jsxs(Table.Row, { children: [selectedAttributes.map(({ identifier }) => {
                return (jsxRuntimeExports.jsx(RequestsTableCell, { request: request, ticketFields: ticketFields, identifier: identifier, customStatuses: customStatuses, customStatusesEnabled: customStatusesEnabled, user: user }, `request-${request.id}-field-${identifier}`));
            }), jsxRuntimeExports.jsx(Table.Cell, {})] }, request.id));
}

const StyledBody = styled(Modal.Body) `
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.md};
`;
function RequestsColumnModal({ onClose, selectedColumns, onSelectedColumnsChanged, requestAttributes, }) {
    const { t } = useTranslation();
    const [selectedIdentifiers, setSelectedIdentifiers] = reactExports.useState(selectedColumns);
    const [searchValue, setSearchValue] = reactExports.useState("");
    const modalContainer = useModalContainer();
    const filteredAttributes = searchValue
        ? requestAttributes.filter((attribute) => attribute.label
            .trim()
            .toLocaleLowerCase()
            .includes(searchValue.trim().toLocaleLowerCase()))
        : requestAttributes;
    const handleToggleAllChanged = (e) => {
        const checked = e.target.checked;
        if (checked) {
            const res = new Set([
                ...selectedColumns,
                ...filteredAttributes.map((f) => f.identifier),
            ]);
            setSelectedIdentifiers([...res]);
        }
        else {
            setSelectedIdentifiers(selectedIdentifiers.filter((identifier) => filteredAttributes.find((f) => f.identifier === identifier) ===
                undefined));
        }
    };
    const handleSave = () => {
        onSelectedColumnsChanged(selectedIdentifiers);
        onClose();
    };
    const areAllSelected = filteredAttributes.every((f) => selectedIdentifiers.includes(f.identifier));
    const isSomeSelected = filteredAttributes.some((f) => selectedIdentifiers.includes(f.identifier));
    return (jsxRuntimeExports.jsxs(Modal, { appendToNode: modalContainer, onClose: onClose, children: [jsxRuntimeExports.jsx(Modal.Header, { children: t("guide-requests-app.column-selection.show-hide-columns", "Show and hide columns") }), jsxRuntimeExports.jsxs(StyledBody, { children: [jsxRuntimeExports.jsxs(Field, { children: [jsxRuntimeExports.jsx(Field.Label, { hidden: true, children: t("guide-requests-app.column-selection.search-columns", "Search for columns") }), jsxRuntimeExports.jsx(MediaInput, { start: jsxRuntimeExports.jsx(SvgSearchStroke, {}), type: "search", value: searchValue, onChange: (e) => {
                                    setSearchValue(e.target.value);
                                } })] }), jsxRuntimeExports.jsxs(Table, { "aria-live": "polite", children: [jsxRuntimeExports.jsx(Table.Head, { children: jsxRuntimeExports.jsxs(Table.HeaderRow, { children: [jsxRuntimeExports.jsx(Table.HeaderCell, { isMinimum: true, children: jsxRuntimeExports.jsx(Field, { children: jsxRuntimeExports.jsx(Checkbox, { checked: areAllSelected, indeterminate: !areAllSelected && isSomeSelected, onChange: handleToggleAllChanged, children: jsxRuntimeExports.jsx(Field.Label, { hidden: true, children: areAllSelected
                                                            ? t("guide-requests-app.column-selection.hide-all", "Hide all columns")
                                                            : t("guide-requests-app.column-selection.show-all", "Show all columns") }) }) }) }), jsxRuntimeExports.jsx(Table.HeaderCell, { children: t("guide-requests-app.column-selection.column", "Column") })] }) }), jsxRuntimeExports.jsx(Table.Body, { children: filteredAttributes.map(({ identifier, label }) => {
                                    const isSelected = selectedIdentifiers.includes(identifier);
                                    return (jsxRuntimeExports.jsxs(Table.Row, { isSelected: isSelected, children: [jsxRuntimeExports.jsx(Table.Cell, { isMinimum: true, children: jsxRuntimeExports.jsx(Field, { children: jsxRuntimeExports.jsx(Checkbox, { checked: isSelected, onChange: (e) => {
                                                            const checked = e.target.checked;
                                                            if (checked) {
                                                                setSelectedIdentifiers((current) => [
                                                                    ...current,
                                                                    identifier,
                                                                ]);
                                                            }
                                                            else {
                                                                setSelectedIdentifiers((current) => current.filter((c) => c !== identifier));
                                                            }
                                                        }, children: jsxRuntimeExports.jsx(Field.Label, { hidden: true, children: isSelected
                                                                ? t("guide-requests-app.column-selection.hide-column", "Hide {{column_name}} column", { column_name: label })
                                                                : t("guide-requests-app.column-selection.show-column", "Show {{column_name}} column", { column_name: label }) }) }) }) }), jsxRuntimeExports.jsx(Table.Cell, { children: label })] }, identifier));
                                }) })] })] }), jsxRuntimeExports.jsxs(Modal.Footer, { children: [jsxRuntimeExports.jsx(Modal.FooterItem, { children: jsxRuntimeExports.jsx(Button, { onClick: onClose, isBasic: true, children: t("guide-requests-app.cancel", "Cancel") }) }), jsxRuntimeExports.jsx(Modal.FooterItem, { children: jsxRuntimeExports.jsx(Button, { onClick: handleSave, isPrimary: true, children: t("guide-requests-app.save", "Save") }) })] }), jsxRuntimeExports.jsx(Modal.Close, { "aria-label": t("guide-requests-app.closeModal", "Close modal") })] }));
}

const StyledMenu$1 = styled(Menu) `
  max-height: 380px;
`;
const OPEN_MODAL_VALUE = "__openModal__";
// primaryEmphasis is the color used for links https://garden.zendesk.com/design/color#hierarchy
const SeeMoreColumnsItem = styled(Item) `
  color: ${(p) => p.theme.colors.variables.light.background.primaryEmphasis};
`;
function RequestsColumnFilter({ onSelectedColumnsChanged, selectedColumns, requestAttributes, defaultDesktopColumns, }) {
    const { t } = useTranslation();
    const [isDropdownOpen, setIsDropdownOpen] = reactExports.useState(false);
    const [isModalOpen, setIsModalOpen] = reactExports.useState(false);
    const [lastSelectedColumns, setLastSelectedColumns] = reactExports.useState(selectedColumns);
    const hasSeeMoreColumns = requestAttributes.length > defaultDesktopColumns.length;
    const handleSelect = (items) => {
        if (items.length === 0) {
            onSelectedColumnsChanged([]);
            return;
        }
        onSelectedColumnsChanged(items.filter((item) => item !== OPEN_MODAL_VALUE));
    };
    // Garden augments the Downshift object with a custom `selectedItems` property:
    // https://github.com/zendeskgarden/react-components/blob/354a84d162fe194b6f484f597d46fca2acbf8160/packages/dropdowns/src/elements/Dropdown/Dropdown.tsx#L152-L156
    // This results in a TS type error when using this property even though that is
    // the Garden approved/documented way to access mutliple selected items.
    // The usage of `any` here is to work around that error when testing in JEST:
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleStateChange = (changes) => {
        if (changes.isOpen === true) {
            // Cache the last selected columns when dropdown is opened
            setLastSelectedColumns(selectedColumns);
        }
        if ("selectedItems" in changes &&
            changes.selectedItems[changes.selectedItems.length - 1] ===
                OPEN_MODAL_VALUE) {
            setIsDropdownOpen(false);
            setIsModalOpen(true);
            return;
        }
        if (changes.isOpen != null) {
            setIsDropdownOpen("selectedItems" in changes || changes.isOpen);
        }
    };
    return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsxs(Dropdown, { isOpen: isDropdownOpen, selectedItems: selectedColumns, onSelect: handleSelect, onStateChange: handleStateChange, children: [jsxRuntimeExports.jsx(Trigger, { children: jsxRuntimeExports.jsx(Table.OverflowButton, { "aria-label": t("guide-requests-app.column-selection.show-hide-columns", "Show and hide columns") }) }), jsxRuntimeExports.jsxs(StyledMenu$1, { placement: "bottom-end", popperModifiers: {
                            preventOverflow: {
                                boundariesElement: "viewport",
                            },
                            flip: {
                                enabled: false,
                            },
                            offset: {
                                fn: (data) => {
                                    /**
                                     * Ensure correct placement relative to trigger
                                     **/
                                    data.offsets.popper.top -= 2;
                                    return data;
                                },
                            },
                        }, children: [jsxRuntimeExports.jsx(HeaderItem, { children: t("guide-requests-app.column-selection.show-hide-columns", "Show and hide columns") }), requestAttributes.map(({ identifier, label }) => {
                                if (!defaultDesktopColumns.includes(identifier) &&
                                    !lastSelectedColumns.includes(identifier)) {
                                    return null;
                                }
                                return (jsxRuntimeExports.jsx(Item, { value: identifier, "data-test-id": `column-filter-menu-${identifier}`, children: label }, identifier));
                            }), hasSeeMoreColumns && (jsxRuntimeExports.jsx(SeeMoreColumnsItem, { value: OPEN_MODAL_VALUE, children: t("guide-requests-app.column-selection.see-more-columns", "See more columns") }))] })] }), isModalOpen && (jsxRuntimeExports.jsx(RequestsColumnModal, { onClose: () => {
                    setIsModalOpen(false);
                }, selectedColumns: selectedColumns, onSelectedColumnsChanged: handleSelect, requestAttributes: requestAttributes }))] }));
}

var localStorage = {
    setItem(key, value) {
        return window.localStorage.setItem(key, value);
    },
    getItem(key) {
        return window.localStorage.getItem(key);
    },
    removeItem(key) {
        window.localStorage.removeItem(key);
    },
    clear() {
        window.localStorage.clear();
    },
};

function useLocalStorage(key, initialValue, version = "v1") {
    const readValue = reactExports.useCallback(() => {
        try {
            const item = localStorage.getItem(key);
            if (!item)
                return initialValue;
            const data = JSON.parse(item);
            return data[0] === version ? data[1] : initialValue;
        }
        catch (error) {
            return initialValue;
        }
    }, [initialValue, key]);
    const [storedValue, setStoredValue] = reactExports.useState(readValue);
    const setValue = (value) => {
        try {
            setStoredValue(value);
            localStorage.setItem(key, JSON.stringify([version, value]));
        }
        catch (error) {
            // ignore
        }
    };
    return [storedValue, setValue];
}

const Container$1 = styled.div `
  margin-bottom: 24px;
`;
const StyledSortableCell = styled(Table.SortableCell) `
  display: grid; // Without it Ellipsis won't work
`;
const SORTABLE_FIELDS = ["created_at", "updated_at", "status"];
const HIDDEN_FIELDS = [
    "description",
    "group",
    "assignee",
    "custom_status",
    "lookup",
];
const NON_REMOVABLE_FIELDS = ["subject"];
const DEFAULT_DESKTOP_COLUMNS = [
    "subject",
    "id",
    "created_at",
    "updated_at",
    "status",
];
const DEFAULT_MOBILE_COLUMNS = ["subject", "updated_at", "status"];
const LOCAL_STORAGE_KEY = "GUIDE_REQUESTS_APP_COLUMN_CONFIG";
function RequestsTable({ onSort, sort, requests, users, ticketFields, customStatuses, customStatusesEnabled, }) {
    const { t } = useTranslation();
    const requestAttributesLabels = {
        id: t("guide-requests-app.id", "ID"),
        created_at: t("guide-requests-app.createdDate", "Created date"),
        updated_at: t("guide-requests-app.updatedDate", "Updated date"),
        status: t("guide-requests-app.status", "Status"),
        requester: t("guide-requests-app.requester", "Requester"),
    };
    const defaultColumns = isMobile()
        ? DEFAULT_MOBILE_COLUMNS
        : DEFAULT_DESKTOP_COLUMNS;
    const [selectedColumns, setSelectedColumns] = useLocalStorage(LOCAL_STORAGE_KEY, defaultColumns, "v4");
    const SELECTABLE_COLUMNS = [...DEFAULT_DESKTOP_COLUMNS, "requester"];
    const requestAttributes = reactExports.useMemo(() => {
        if (ticketFields.length === 0) {
            return [];
        }
        return [
            ...SELECTABLE_COLUMNS.map((identifier) => {
                const label = requestAttributesLabels[identifier] ??
                    ticketFields.find((field) => field.type === identifier)
                        ?.title_in_portal ??
                    identifier;
                return { identifier, label };
            }),
            ...ticketFields
                .filter((field) => !SELECTABLE_COLUMNS.includes(field.type))
                .filter((field) => !HIDDEN_FIELDS.includes(field.type))
                .map(({ id, title_in_portal }) => ({
                identifier: String(id),
                label: title_in_portal,
            })),
        ];
    }, [ticketFields]);
    const selectedAttributes = requestAttributes.filter((attribute) => selectedColumns.includes(attribute.identifier));
    const selectedRemovableColumns = selectedColumns.filter((identifier) => !NON_REMOVABLE_FIELDS.includes(identifier));
    const selectableAttributes = requestAttributes.filter(({ identifier }) => !NON_REMOVABLE_FIELDS.includes(identifier));
    function handleSelectedColumnsChanged(columns) {
        setSelectedColumns([...NON_REMOVABLE_FIELDS, ...columns]);
    }
    function getHeaderCellWidth(identifier) {
        const columns = selectedColumns.length;
        if (isMobile())
            return "auto";
        if (identifier === "subject") {
            if (columns === 1)
                return "auto";
            if (columns <= 2)
                return "80%";
            if (columns <= 3)
                return "60%";
            if (columns <= 6)
                return "40%";
            if (columns <= 8)
                return "30%";
            return "20%";
        }
        else
            return "auto";
    }
    const requestUser = (userId) => {
        return users.find((user) => user.id === userId);
    };
    return (jsxRuntimeExports.jsx(Container$1, { "aria-live": "polite", children: requests.length === 0 ? (t("guide-requests-app.requests-empty-state", "No requests found")) : (jsxRuntimeExports.jsxs(Table, { isReadOnly: true, children: [jsxRuntimeExports.jsx(Table.Head, { children: jsxRuntimeExports.jsxs(Table.HeaderRow, { children: [selectedAttributes.map(({ identifier, label }) => {
                                return SORTABLE_FIELDS.includes(identifier) ? (jsxRuntimeExports.jsx(StyledSortableCell, { "data-test-id": `sortable-cell-${identifier}`, sort: sort?.by === identifier ? sort?.order : undefined, onClick: () => onSort(identifier), width: isMobile() ? "auto" : "", children: jsxRuntimeExports.jsx(TruncatedText, { children: label }) }, identifier)) : (jsxRuntimeExports.jsx(Table.HeaderCell, { "data-test-id": `header-cell-${identifier}`, width: getHeaderCellWidth(identifier), children: jsxRuntimeExports.jsx(TruncatedText, { children: label }) }, identifier));
                            }), jsxRuntimeExports.jsx(Table.HeaderCell, { hasOverflow: true, children: jsxRuntimeExports.jsx(RequestsColumnFilter, { selectedColumns: selectedRemovableColumns, onSelectedColumnsChanged: handleSelectedColumnsChanged, requestAttributes: selectableAttributes, defaultDesktopColumns: DEFAULT_DESKTOP_COLUMNS }) })] }) }), jsxRuntimeExports.jsx(Table.Body, { children: requests.map((request) => (jsxRuntimeExports.jsx(RequestsTableRow, { request: request, ticketFields: ticketFields, selectedAttributes: selectedAttributes, customStatuses: customStatuses, customStatusesEnabled: customStatusesEnabled, user: requestUser(request.requester_id) }, request.id))) })] })) }));
}

const Container = styled.div `
  margin-bottom: ${(p) => p.theme.space.xxs};
  position: relative;
`;
const StyledButton = styled(Button) `
  background: none !important;
  border: 0;
  border-bottom: 3px solid;
  border-radius: 0;
  justify-content: start;
  line-height: 40px;
  margin-bottom: 20px;
  &:hover {
    color: ${(p) => p.theme.colors.primaryHue};
  }
`;
const StyledMenu = styled(Menu) `
  width: 100%;
`;
function getDefaultOrganization(organizations) {
    const defaultOrganization = organizations.find((organization) => organization.default);
    return defaultOrganization || organizations[0];
}
function RequestsTabs({ selectedTab, organizations, onTabSelected, }) {
    const { t } = useTranslation();
    const [iconIsRotated, setIconIsRotated] = reactExports.useState(false);
    const getTabLabel = (tab) => {
        switch (tab) {
            case ORG_REQUESTS_TAB_NAME:
                return t("guide-requests-app.organizationalRequests", "Organizational requests");
            case MY_REQUESTS_TAB_NAME:
                return t("guide-requests-app.myRequests", "My requests");
            case CCD_REQUESTS_TAB_NAME:
                return t("guide-requests-app.ccdRequests", "Requests I am CC'd on");
        }
    };
    const availableTabs = [
        MY_REQUESTS_TAB_NAME,
        CCD_REQUESTS_TAB_NAME,
    ];
    if (organizations.length > 0) {
        availableTabs.push(ORG_REQUESTS_TAB_NAME);
    }
    function handleTabSelect(name) {
        if (name === ORG_REQUESTS_TAB_NAME) {
            const defaultOrg = getDefaultOrganization(organizations);
            if (defaultOrg) {
                onTabSelected({
                    name: ORG_REQUESTS_TAB_NAME,
                    organizationId: defaultOrg.id,
                });
            }
        }
        else {
            onTabSelected({ name });
        }
    }
    const handleMobileTabSelected = (name) => {
        handleTabSelect(name);
    };
    return (jsxRuntimeExports.jsxs(Container, { children: [jsxRuntimeExports.jsx(Mobile, { children: jsxRuntimeExports.jsxs(Dropdown, { onSelect: handleMobileTabSelected, onStateChange: ({ isOpen }) => {
                        if (isOpen != null) {
                            setIconIsRotated(isOpen);
                        }
                    }, children: [jsxRuntimeExports.jsx(Trigger, { children: jsxRuntimeExports.jsxs(StyledButton, { isBasic: true, isStretched: true, children: [getTabLabel(selectedTab.name), jsxRuntimeExports.jsx(Button.EndIcon, { isRotated: iconIsRotated, children: jsxRuntimeExports.jsx(SvgChevronDownStroke, {}) })] }) }), jsxRuntimeExports.jsx(StyledMenu, { popperModifiers: {
                                offset: {
                                    fn(data) {
                                        data.styles.width = `${parseInt(String(data.offsets.reference.width), 10)}px`;
                                        return data;
                                    },
                                },
                            }, children: availableTabs.map((tabName) => (jsxRuntimeExports.jsx(Item, { value: tabName, children: getTabLabel(tabName) }, tabName))) })] }) }), jsxRuntimeExports.jsx(Desktop, { children: jsxRuntimeExports.jsx(Tabs, { onChange: handleTabSelect, selectedItem: selectedTab.name, children: jsxRuntimeExports.jsx(Tabs.TabList, { children: availableTabs.map((tabName) => (jsxRuntimeExports.jsx(Tabs.Tab, { "data-test-id": `tab-${tabName}`, item: tabName, children: getTabLabel(tabName) }, tabName))) }) }) })] }));
}

const FILTER_PREFIX$1 = "filter_";
const SERIALIZED_KEYS$1 = {
    QUERY: "query",
    PAGE: "page",
    SORT_BY: "sort_by",
    SORT_ORDER: "sort_order",
    SELECTED_TAB_NAME: "selected_tab_name",
    ORGANIZATION_ID: "organization_id",
};
function serializeRequestListParams({ query, page, sort, selectedTab, filters, }) {
    const res = new URLSearchParams();
    res.append(SERIALIZED_KEYS$1.QUERY, query);
    res.append(SERIALIZED_KEYS$1.PAGE, page.toString());
    if (sort) {
        res.append(SERIALIZED_KEYS$1.SORT_BY, sort.by);
        res.append(SERIALIZED_KEYS$1.SORT_ORDER, sort.order);
    }
    res.append(SERIALIZED_KEYS$1.SELECTED_TAB_NAME, selectedTab.name);
    if (selectedTab.name === ORG_REQUESTS_TAB_NAME) {
        res.append(SERIALIZED_KEYS$1.ORGANIZATION_ID, selectedTab.organizationId.toString());
    }
    for (const [field, values] of Object.entries(filters)) {
        for (const value of values) {
            res.append(`${FILTER_PREFIX$1}${field}`, value);
        }
    }
    return res;
}

const FILTER_PREFIX = "filter_";
const SERIALIZED_KEYS = {
    QUERY: "query",
    PAGE: "page",
    SORT_BY: "sort_by",
    SORT_ORDER: "sort_order",
    SELECTED_TAB_NAME: "selected_tab_name",
    ORGANIZATION_ID: "organization_id",
};
const SORT_ORDER_ASC = "asc";
const SORT_ORDER_DESC = "desc";
function deserializeRequestListParams(searchParams) {
    const res = {};
    const queryParam = searchParams.get(SERIALIZED_KEYS.QUERY);
    const pageParam = searchParams.get(SERIALIZED_KEYS.PAGE);
    const sortBy = searchParams.get(SERIALIZED_KEYS.SORT_BY);
    const sortOrder = searchParams.get(SERIALIZED_KEYS.SORT_ORDER);
    const selectedTabName = searchParams.get(SERIALIZED_KEYS.SELECTED_TAB_NAME);
    const organizationId = searchParams.get(SERIALIZED_KEYS.ORGANIZATION_ID);
    if (queryParam != null) {
        res.query = queryParam;
    }
    if (pageParam != null) {
        res.page = parseInt(pageParam, 10);
    }
    if (sortBy != null &&
        sortOrder != null &&
        (sortOrder === SORT_ORDER_ASC || sortOrder === SORT_ORDER_DESC)) {
        res.sort = { by: sortBy, order: sortOrder };
    }
    if (selectedTabName !== null) {
        if (selectedTabName === ORG_REQUESTS_TAB_NAME && organizationId != null) {
            res.selectedTab = {
                name: ORG_REQUESTS_TAB_NAME,
                organizationId: parseInt(organizationId, 10),
            };
        }
        else if (selectedTabName === MY_REQUESTS_TAB_NAME ||
            selectedTabName === CCD_REQUESTS_TAB_NAME) {
            res.selectedTab = { name: selectedTabName };
        }
    }
    const filters = getFiltersFromSearchParams(searchParams);
    if (Object.keys(filters).length > 0) {
        res.filters = filters;
    }
    return res;
}
function getFiltersFromSearchParams(searchParams) {
    const res = {};
    for (const [key] of searchParams) {
        if (!key.startsWith(FILTER_PREFIX)) {
            continue;
        }
        const field = key.replace(FILTER_PREFIX, "");
        if (res[field] != null) {
            continue;
        }
        const values = searchParams.getAll(key).filter(isFilterValue);
        res[field] = values;
    }
    return res;
}
function isFilterValue(value) {
    return (value.startsWith(":") || value.startsWith("<") || value.startsWith(">"));
}

function useUser() {
    const [user, setUser] = reactExports.useState();
    const [error, setError] = reactExports.useState();
    const [isLoading, setIsLoading] = reactExports.useState(true);
    async function fetchUser() {
        try {
            setIsLoading(true);
            const response = await fetch("/api/v2/users/me");
            if (!response.ok)
                throw Error(response.statusText);
            const { user } = await response.json();
            setUser(user);
        }
        catch (error) {
            setError(error);
        }
        finally {
            setIsLoading(false);
        }
    }
    reactExports.useEffect(() => {
        fetchUser();
    }, []);
    return { user, error, isLoading };
}

async function fetchAllCursorPages(firstPagePromise, field, init) {
    const firstPageResponse = await firstPagePromise();
    let res = [...firstPageResponse[field]];
    let hasMore = firstPageResponse.meta.has_more;
    let nextPageUrl = firstPageResponse.links.next;
    while (hasMore) {
        const response = await fetch(nextPageUrl, init);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const decodedResponse = (await response.json());
        res = res.concat(decodedResponse[field]);
        hasMore = decodedResponse.meta.has_more;
        nextPageUrl = decodedResponse.links.next;
    }
    return res;
}

function useOrganizations(user) {
    const [organizations, setOrganizations] = reactExports.useState([]);
    const [error, setError] = reactExports.useState();
    async function fetchOrganizationsPage() {
        const response = await fetch(`/api/v2/users/${user?.id}/organization_memberships?page[size]=100`);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return await response.json();
    }
    async function fetchOrganizations() {
        try {
            const memberships = await fetchAllCursorPages(fetchOrganizationsPage, "organization_memberships");
            const membershipsWithTicketPermissions = memberships.filter((organization) => organization.view_tickets);
            setOrganizations(membershipsWithTicketPermissions.map((organization) => ({
                id: organization.organization_id,
                name: organization.organization_name,
                default: organization.default,
            })));
        }
        catch (error) {
            setError(error);
        }
    }
    reactExports.useEffect(() => {
        if (user) {
            fetchOrganizations();
        }
    }, [user]);
    return { organizations, error };
}

// Returns method used to abort the request inside the wrapped function
function withAbort(wrappedFn) {
    const requestController = new AbortController();
    const signal = requestController.signal;
    wrappedFn(signal);
    return () => requestController.abort();
}

/**
 * Map each field with an array of filter values.
 *
 * For example:
 * {
 *   created_at: [">=2021-08-08", "<=2022-08-08"],
 *   organization: [":1", ":2"],
 * }
 *
 * Represents two filters set on the created_at field (that should be greater than 2021-08-08 and less than 2022-08-08)
 * and two filters on the organization field (that should be equal 1 or equal 2)
 */
function filterValuesMapToQueryFilters(filterValuesMap) {
    return Object.entries(filterValuesMap)
        .map(([field, values]) => fieldValuesToQueryFilters(field, values))
        .flat();
}
function fieldValuesToQueryFilters(field, values) {
    if (field === "status" || field === "custom_status_id") {
        /* Handling special case for status, where for example
           status: [":open :new :hold"] should be mapped to
           "status:open", "status:new", "status:hold"
         */
        return values
            .map((value) => value.split(" ").map((v) => `${field}${v}`))
            .flat();
    }
    else {
        return values.map((value) => `${field}${sanitizeValue(value)}`).flat();
    }
}
function sanitizeValue(value) {
    const isPhraseValue = /^:".*"$/.test(value);
    if (isPhraseValue) {
        return `:"${value.substring(2, value.length - 1).replace(/"/g, "")}"`;
    }
    else {
        return value;
    }
}

const PER_PAGE = 15;
const MAX_RESULTS = 1000;
function useRequests(params, push) {
    const { t } = useTranslation();
    const { query, page, sort, selectedTab, filters } = params;
    const [error, setError] = reactExports.useState();
    const [{ requests, users, hasNextPage, hasPreviousPage, count: requestsCount, isLoading, }, setRequestState,] = reactExports.useState({
        count: 0,
        hasNextPage: false,
        hasPreviousPage: false,
        requests: [],
        users: [],
        isLoading: true,
    });
    async function fetchRequests(signal) {
        const searchParams = new URLSearchParams();
        const searchQuery = query.length ? query : "*";
        const queryFilters = filterValuesMapToQueryFilters(filters);
        searchParams.set("include", "users");
        if (sort) {
            queryFilters.push(`order_by:${sort.by}`, `sort:${sort.order}`);
        }
        if (selectedTab.name === MY_REQUESTS_TAB_NAME) {
            queryFilters.push("requester:me");
        }
        else if (selectedTab.name === CCD_REQUESTS_TAB_NAME) {
            searchParams.set("cc_id", "true");
        }
        else if (selectedTab.name === ORG_REQUESTS_TAB_NAME) {
            searchParams.set("organization_id", selectedTab.organizationId.toString());
        }
        if (PER_PAGE * page > MAX_RESULTS) {
            searchParams.set("page", Math.floor(MAX_RESULTS / PER_PAGE).toString());
        }
        else {
            searchParams.set("page", page.toString());
        }
        searchParams.set("per_page", PER_PAGE.toString());
        searchParams.set("query", `${searchQuery} ${queryFilters.join(" ")}`);
        try {
            const response = await fetch(`/api/v2/requests/search.json?${searchParams.toString()}`, {
                signal: signal,
            });
            if (response.status === 406) {
                const { error } = await response.json();
                if (error.includes("Number of search words exceeds the limit")) {
                    notify({
                        type: "error",
                        message: t("guide-requests-app.SearchPhraseIsTooLong", "Search phrase is too long. Try something shorter."),
                    });
                    push({ page: 1, query: "" });
                }
            }
            else {
                const { requests, users, next_page, previous_page, count, } = await response.json();
                setRequestState({
                    count: Math.min(count ?? 0, MAX_RESULTS),
                    hasNextPage: !!next_page && !(PER_PAGE * page >= MAX_RESULTS),
                    hasPreviousPage: !!previous_page,
                    requests: requests ?? [],
                    users: users ?? [],
                    isLoading: false,
                });
            }
        }
        catch (error) {
            if (error instanceof Error && error.name === "AbortError") {
                // Do nothing, request was cancelled, because another one was started;
                return;
            }
            else
                setError(error);
        }
    }
    reactExports.useEffect(() => {
        return withAbort(fetchRequests);
    }, [params]);
    return {
        requests,
        users,
        hasNextPage,
        hasPreviousPage,
        requestsCount,
        requestsPerPage: PER_PAGE,
        error,
        isLoading,
    };
}

async function listTicketFields(locale, pageSize = 100) {
    const response = await fetch(`/api/v2/ticket_fields.json?locale=${locale}&page[size]=${pageSize}`);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return await response.json();
}
function useTicketFields(locale) {
    const [ticketFields, setTicketFields] = reactExports.useState([]);
    const [error, setError] = reactExports.useState();
    const [isLoading, setIsLoading] = reactExports.useState(true);
    async function fetchTicketFields() {
        try {
            const response = await fetchAllCursorPages(() => listTicketFields(locale), "ticket_fields");
            setTicketFields(response.filter((ticketField) => ticketField.active));
            setIsLoading(false);
        }
        catch (error) {
            setError(error);
        }
    }
    reactExports.useEffect(() => {
        fetchTicketFields();
    }, []);
    return { ticketFields, error, isLoading };
}

function useCustomStatuses(customStatusesEnabled, locale) {
    const [customStatuses, setCustomStatuses] = reactExports.useState([]);
    const [error, setError] = reactExports.useState();
    async function fetchCustomStatuses() {
        if (!customStatusesEnabled) {
            return;
        }
        try {
            const response = await fetch(`/api/v2/custom_statuses?active=true&locale=${locale}`);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const { custom_statuses } = await response.json();
            setCustomStatuses(custom_statuses);
        }
        catch (error) {
            setError(error);
        }
    }
    reactExports.useEffect(() => {
        fetchCustomStatuses();
    }, []);
    return { customStatuses, error };
}

const SkeletonCells = () => (jsxRuntimeExports.jsxs(Table.Row, { children: [jsxRuntimeExports.jsx(Table.Cell, { children: jsxRuntimeExports.jsx(Skeleton, {}) }), jsxRuntimeExports.jsx(Table.Cell, { children: jsxRuntimeExports.jsx(Skeleton, {}) }), jsxRuntimeExports.jsx(Table.Cell, { children: jsxRuntimeExports.jsx(Skeleton, {}) })] }));
const NoLeftPaddingCol = styled(Grid.Col) `
  padding-left: 0;
`;
const RequestLoadingState = () => {
    return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsxs(Grid, { children: [jsxRuntimeExports.jsx(NoLeftPaddingCol, { children: jsxRuntimeExports.jsx(Skeleton, { width: "50%" }) }), jsxRuntimeExports.jsx(NoLeftPaddingCol, { children: jsxRuntimeExports.jsx(Skeleton, { width: "30%" }) }), jsxRuntimeExports.jsx(NoLeftPaddingCol, { children: jsxRuntimeExports.jsx(Skeleton, { width: "40%" }) }), jsxRuntimeExports.jsx(NoLeftPaddingCol, { children: jsxRuntimeExports.jsx(Skeleton, { width: "50%" }) })] }), jsxRuntimeExports.jsxs(Table, { style: { minWidth: 400 }, children: [jsxRuntimeExports.jsx(Table.Head, { children: jsxRuntimeExports.jsxs(Table.HeaderRow, { children: [jsxRuntimeExports.jsx(Table.HeaderCell, { children: jsxRuntimeExports.jsx(Skeleton, { width: "40%" }) }), jsxRuntimeExports.jsx(Table.HeaderCell, { children: jsxRuntimeExports.jsx(Skeleton, { width: "40%" }) }), jsxRuntimeExports.jsx(Table.HeaderCell, { children: jsxRuntimeExports.jsx(Skeleton, { width: "40%" }) })] }) }), jsxRuntimeExports.jsxs(Table.Body, { children: [jsxRuntimeExports.jsx(SkeletonCells, {}), jsxRuntimeExports.jsx(SkeletonCells, {}), jsxRuntimeExports.jsx(SkeletonCells, {})] })] })] }));
};

function useShowManyUsers(ids) {
    const [error, setError] = reactExports.useState();
    const [{ users, isLoading }, setRequestState] = reactExports.useState({
        users: [],
        isLoading: true,
    });
    const userIds = ids.join(",");
    async function fetchUsers(signal) {
        try {
            const response = await fetch(`/api/v2/users/show_many.json?ids=${userIds}`, { signal });
            const { users } = await response.json();
            setRequestState({ users, isLoading: false });
        }
        catch (error) {
            if (error instanceof Error && error.name === "AbortError") {
                // Do nothing, request was cancelled, because another one was started;
                return;
            }
            else
                setError(error);
        }
    }
    reactExports.useEffect(() => {
        return withAbort(fetchUsers);
    }, [userIds]);
    return {
        users,
        error,
        isLoading,
    };
}

function RequestsList({ locale, customStatusesEnabled, }) {
    const { t } = useTranslation();
    const { params, push } = useParams({
        query: "",
        page: 1,
        sort: { order: "desc", by: "updated_at" },
        selectedTab: { name: MY_REQUESTS_TAB_NAME },
        filters: {},
    }, serializeRequestListParams, deserializeRequestListParams);
    const { query, page, sort, selectedTab, filters } = params;
    const { user, isLoading: isLoadingUser, error: userError } = useUser();
    const { organizations } = useOrganizations(user);
    const { requests, users, hasNextPage, hasPreviousPage, requestsCount, requestsPerPage, isLoading: isLoadingRequests, error: requestsError, } = useRequests(params, push);
    const { ticketFields, isLoading: isLoadingTicketFields, error: ticketFieldsError, } = useTicketFields(locale);
    const loadingError = requestsError || ticketFieldsError || userError;
    const isEndUser = !isLoadingUser && user?.role === "end-user";
    const userIds = !isLoadingRequests && !isEndUser
        ? requests.map((request) => request.requester_id)
        : [];
    const { users: usersWithAliases, isLoading: usersLoading } = useShowManyUsers(userIds);
    const isLoading = isLoadingRequests || isLoadingTicketFields || isLoadingUser || usersLoading;
    if (loadingError) {
        throw loadingError;
    }
    const { customStatuses } = useCustomStatuses(customStatusesEnabled, locale);
    const handleTabSelected = (newSelectedTab) => {
        push({
            page: 1,
            selectedTab: newSelectedTab,
            filters: {},
        });
    };
    const handleOrganizationSelected = (selectedOrgId) => {
        if (selectedTab.name === ORG_REQUESTS_TAB_NAME) {
            push({
                page: 1,
                selectedTab: {
                    name: ORG_REQUESTS_TAB_NAME,
                    organizationId: selectedOrgId,
                },
            });
        }
    };
    const handleFiltersChanged = (newFilters) => {
        push({ page: 1, filters: newFilters });
    };
    const onSort = (name) => {
        if (sort?.by === name) {
            if (sort.order === "asc") {
                push({
                    page: 1,
                    sort: {
                        by: sort.by,
                        order: "desc",
                    },
                });
            }
            else {
                push({
                    page: 1,
                    sort: null,
                });
            }
        }
        else {
            push({
                page: 1,
                sort: {
                    by: name,
                    order: "asc",
                },
            });
        }
    };
    return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [isLoading ? (jsxRuntimeExports.jsx(RequestLoadingState, {})) : (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(RequestsTabs, { organizations: organizations, selectedTab: selectedTab, onTabSelected: handleTabSelected }), jsxRuntimeExports.jsx(RequestsToolbar, { hasPagination: hasNextPage || hasPreviousPage, page: page, requestsCount: requestsCount, requestsPerPage: requestsPerPage, query: query, onSearchSubmit: (value) => push({ page: 1, query: value }), filters: filters, ticketFields: ticketFields, onFiltersChanged: handleFiltersChanged, organizations: organizations, selectedTab: selectedTab, onOrganizationSelected: handleOrganizationSelected, user: user, customStatusesEnabled: customStatusesEnabled, customStatuses: customStatuses }), jsxRuntimeExports.jsx(RequestsTable, { onSort: onSort, requests: requests, users: usersWithAliases || users, sort: sort, ticketFields: ticketFields, customStatuses: customStatuses, customStatusesEnabled: customStatusesEnabled })] })), !isLoading && (hasPreviousPage || hasNextPage) && (jsxRuntimeExports.jsxs(CursorPagination, { children: [jsxRuntimeExports.jsx(CursorPagination.Previous, { onClick: () => push({ page: page - 1 }), disabled: !hasPreviousPage, children: t("guide-requests-app.previous", "Previous") }), jsxRuntimeExports.jsx(CursorPagination.Next, { onClick: () => push({ page: page + 1 }), disabled: !hasNextPage, children: t("guide-requests-app.next", "Next") })] }))] }));
}

function __variableDynamicImportRuntime1__(path) {
  switch (path) {
    case '../shared/translations/locales/af.json': return import('shared').then(function (n) { return n.aW; });
    case '../shared/translations/locales/ar-x-pseudo.json': return import('shared').then(function (n) { return n.aX; });
    case '../shared/translations/locales/ar.json': return import('shared').then(function (n) { return n.aY; });
    case '../shared/translations/locales/az.json': return import('shared').then(function (n) { return n.aZ; });
    case '../shared/translations/locales/be.json': return import('shared').then(function (n) { return n.a_; });
    case '../shared/translations/locales/bg.json': return import('shared').then(function (n) { return n.a$; });
    case '../shared/translations/locales/bn.json': return import('shared').then(function (n) { return n.b0; });
    case '../shared/translations/locales/bs.json': return import('shared').then(function (n) { return n.b1; });
    case '../shared/translations/locales/ca.json': return import('shared').then(function (n) { return n.b2; });
    case '../shared/translations/locales/cs.json': return import('shared').then(function (n) { return n.b3; });
    case '../shared/translations/locales/cy.json': return import('shared').then(function (n) { return n.b4; });
    case '../shared/translations/locales/da.json': return import('shared').then(function (n) { return n.b5; });
    case '../shared/translations/locales/de-de.json': return import('shared').then(function (n) { return n.b6; });
    case '../shared/translations/locales/de-x-informal.json': return import('shared').then(function (n) { return n.b7; });
    case '../shared/translations/locales/de.json': return import('shared').then(function (n) { return n.b8; });
    case '../shared/translations/locales/el.json': return import('shared').then(function (n) { return n.b9; });
    case '../shared/translations/locales/en-001.json': return import('shared').then(function (n) { return n.ba; });
    case '../shared/translations/locales/en-150.json': return import('shared').then(function (n) { return n.bb; });
    case '../shared/translations/locales/en-au.json': return import('shared').then(function (n) { return n.bc; });
    case '../shared/translations/locales/en-ca.json': return import('shared').then(function (n) { return n.bd; });
    case '../shared/translations/locales/en-gb.json': return import('shared').then(function (n) { return n.be; });
    case '../shared/translations/locales/en-my.json': return import('shared').then(function (n) { return n.bf; });
    case '../shared/translations/locales/en-ph.json': return import('shared').then(function (n) { return n.bg; });
    case '../shared/translations/locales/en-se.json': return import('shared').then(function (n) { return n.bh; });
    case '../shared/translations/locales/en-us.json': return import('shared').then(function (n) { return n.bi; });
    case '../shared/translations/locales/en-x-dev.json': return import('shared').then(function (n) { return n.bj; });
    case '../shared/translations/locales/en-x-keys.json': return import('shared').then(function (n) { return n.bk; });
    case '../shared/translations/locales/en-x-obsolete.json': return import('shared').then(function (n) { return n.bl; });
    case '../shared/translations/locales/en-x-pseudo.json': return import('shared').then(function (n) { return n.bm; });
    case '../shared/translations/locales/en-x-test.json': return import('shared').then(function (n) { return n.bn; });
    case '../shared/translations/locales/es-419.json': return import('shared').then(function (n) { return n.bo; });
    case '../shared/translations/locales/es-ar.json': return import('shared').then(function (n) { return n.bp; });
    case '../shared/translations/locales/es-cl.json': return import('shared').then(function (n) { return n.bq; });
    case '../shared/translations/locales/es-es.json': return import('shared').then(function (n) { return n.br; });
    case '../shared/translations/locales/es-mx.json': return import('shared').then(function (n) { return n.bs; });
    case '../shared/translations/locales/es-pe.json': return import('shared').then(function (n) { return n.bt; });
    case '../shared/translations/locales/es.json': return import('shared').then(function (n) { return n.bu; });
    case '../shared/translations/locales/et.json': return import('shared').then(function (n) { return n.bv; });
    case '../shared/translations/locales/eu.json': return import('shared').then(function (n) { return n.bw; });
    case '../shared/translations/locales/fa-af.json': return import('shared').then(function (n) { return n.bx; });
    case '../shared/translations/locales/fa.json': return import('shared').then(function (n) { return n.by; });
    case '../shared/translations/locales/fi.json': return import('shared').then(function (n) { return n.bz; });
    case '../shared/translations/locales/fil.json': return import('shared').then(function (n) { return n.bA; });
    case '../shared/translations/locales/fo.json': return import('shared').then(function (n) { return n.bB; });
    case '../shared/translations/locales/fr-ca.json': return import('shared').then(function (n) { return n.bC; });
    case '../shared/translations/locales/fr-dz.json': return import('shared').then(function (n) { return n.bD; });
    case '../shared/translations/locales/fr-mu.json': return import('shared').then(function (n) { return n.bE; });
    case '../shared/translations/locales/fr.json': return import('shared').then(function (n) { return n.bF; });
    case '../shared/translations/locales/ga.json': return import('shared').then(function (n) { return n.bG; });
    case '../shared/translations/locales/he.json': return import('shared').then(function (n) { return n.bH; });
    case '../shared/translations/locales/hi.json': return import('shared').then(function (n) { return n.bI; });
    case '../shared/translations/locales/hr.json': return import('shared').then(function (n) { return n.bJ; });
    case '../shared/translations/locales/hu.json': return import('shared').then(function (n) { return n.bK; });
    case '../shared/translations/locales/hy.json': return import('shared').then(function (n) { return n.bL; });
    case '../shared/translations/locales/id.json': return import('shared').then(function (n) { return n.bM; });
    case '../shared/translations/locales/is.json': return import('shared').then(function (n) { return n.bN; });
    case '../shared/translations/locales/it-ch.json': return import('shared').then(function (n) { return n.bO; });
    case '../shared/translations/locales/it.json': return import('shared').then(function (n) { return n.bP; });
    case '../shared/translations/locales/ja.json': return import('shared').then(function (n) { return n.bQ; });
    case '../shared/translations/locales/ka.json': return import('shared').then(function (n) { return n.bR; });
    case '../shared/translations/locales/kk.json': return import('shared').then(function (n) { return n.bS; });
    case '../shared/translations/locales/kl-dk.json': return import('shared').then(function (n) { return n.bT; });
    case '../shared/translations/locales/km.json': return import('shared').then(function (n) { return n.bU; });
    case '../shared/translations/locales/ko.json': return import('shared').then(function (n) { return n.bV; });
    case '../shared/translations/locales/ku.json': return import('shared').then(function (n) { return n.bW; });
    case '../shared/translations/locales/ky.json': return import('shared').then(function (n) { return n.bX; });
    case '../shared/translations/locales/lt.json': return import('shared').then(function (n) { return n.bY; });
    case '../shared/translations/locales/lv.json': return import('shared').then(function (n) { return n.bZ; });
    case '../shared/translations/locales/mk.json': return import('shared').then(function (n) { return n.b_; });
    case '../shared/translations/locales/mn.json': return import('shared').then(function (n) { return n.b$; });
    case '../shared/translations/locales/ms.json': return import('shared').then(function (n) { return n.c0; });
    case '../shared/translations/locales/mt.json': return import('shared').then(function (n) { return n.c1; });
    case '../shared/translations/locales/my.json': return import('shared').then(function (n) { return n.c2; });
    case '../shared/translations/locales/ne.json': return import('shared').then(function (n) { return n.c3; });
    case '../shared/translations/locales/nl-be.json': return import('shared').then(function (n) { return n.c4; });
    case '../shared/translations/locales/nl.json': return import('shared').then(function (n) { return n.c5; });
    case '../shared/translations/locales/no.json': return import('shared').then(function (n) { return n.c6; });
    case '../shared/translations/locales/pl.json': return import('shared').then(function (n) { return n.c7; });
    case '../shared/translations/locales/pt-br.json': return import('shared').then(function (n) { return n.c8; });
    case '../shared/translations/locales/pt.json': return import('shared').then(function (n) { return n.c9; });
    case '../shared/translations/locales/ro-md.json': return import('shared').then(function (n) { return n.ca; });
    case '../shared/translations/locales/ro.json': return import('shared').then(function (n) { return n.cb; });
    case '../shared/translations/locales/ru.json': return import('shared').then(function (n) { return n.cc; });
    case '../shared/translations/locales/si.json': return import('shared').then(function (n) { return n.cd; });
    case '../shared/translations/locales/sk.json': return import('shared').then(function (n) { return n.ce; });
    case '../shared/translations/locales/sl.json': return import('shared').then(function (n) { return n.cf; });
    case '../shared/translations/locales/sq.json': return import('shared').then(function (n) { return n.cg; });
    case '../shared/translations/locales/sr-me.json': return import('shared').then(function (n) { return n.ch; });
    case '../shared/translations/locales/sr.json': return import('shared').then(function (n) { return n.ci; });
    case '../shared/translations/locales/sv.json': return import('shared').then(function (n) { return n.cj; });
    case '../shared/translations/locales/sw-ke.json': return import('shared').then(function (n) { return n.ck; });
    case '../shared/translations/locales/ta.json': return import('shared').then(function (n) { return n.cl; });
    case '../shared/translations/locales/th.json': return import('shared').then(function (n) { return n.cm; });
    case '../shared/translations/locales/tr.json': return import('shared').then(function (n) { return n.cn; });
    case '../shared/translations/locales/uk.json': return import('shared').then(function (n) { return n.co; });
    case '../shared/translations/locales/ur-pk.json': return import('shared').then(function (n) { return n.cp; });
    case '../shared/translations/locales/ur.json': return import('shared').then(function (n) { return n.cq; });
    case '../shared/translations/locales/uz.json': return import('shared').then(function (n) { return n.cr; });
    case '../shared/translations/locales/vi.json': return import('shared').then(function (n) { return n.cs; });
    case '../shared/translations/locales/zh-cn.json': return import('shared').then(function (n) { return n.ct; });
    case '../shared/translations/locales/zh-tw.json': return import('shared').then(function (n) { return n.cu; });
    default: return new Promise(function(resolve, reject) {
      (typeof queueMicrotask === 'function' ? queueMicrotask : setTimeout)(
        reject.bind(null, new Error("Unknown variable dynamic import: " + path))
      );
    })
   }
 }

function __variableDynamicImportRuntime0__(path) {
  switch (path) {
    case './translations/locales/af.json': return import('request-list-translations').then(function (n) { return n.a; });
    case './translations/locales/ar-x-pseudo.json': return import('request-list-translations').then(function (n) { return n.b; });
    case './translations/locales/ar.json': return import('request-list-translations').then(function (n) { return n.c; });
    case './translations/locales/az.json': return import('request-list-translations').then(function (n) { return n.d; });
    case './translations/locales/be.json': return import('request-list-translations').then(function (n) { return n.e; });
    case './translations/locales/bg.json': return import('request-list-translations').then(function (n) { return n.f; });
    case './translations/locales/bn.json': return import('request-list-translations').then(function (n) { return n.g; });
    case './translations/locales/bs.json': return import('request-list-translations').then(function (n) { return n.h; });
    case './translations/locales/ca.json': return import('request-list-translations').then(function (n) { return n.i; });
    case './translations/locales/cs.json': return import('request-list-translations').then(function (n) { return n.j; });
    case './translations/locales/cy.json': return import('request-list-translations').then(function (n) { return n.k; });
    case './translations/locales/da.json': return import('request-list-translations').then(function (n) { return n.l; });
    case './translations/locales/de-de.json': return import('request-list-translations').then(function (n) { return n.m; });
    case './translations/locales/de-x-informal.json': return import('request-list-translations').then(function (n) { return n.n; });
    case './translations/locales/de.json': return import('request-list-translations').then(function (n) { return n.o; });
    case './translations/locales/el.json': return import('request-list-translations').then(function (n) { return n.p; });
    case './translations/locales/en-001.json': return import('request-list-translations').then(function (n) { return n.q; });
    case './translations/locales/en-150.json': return import('request-list-translations').then(function (n) { return n.r; });
    case './translations/locales/en-au.json': return import('request-list-translations').then(function (n) { return n.s; });
    case './translations/locales/en-ca.json': return import('request-list-translations').then(function (n) { return n.t; });
    case './translations/locales/en-gb.json': return import('request-list-translations').then(function (n) { return n.u; });
    case './translations/locales/en-my.json': return import('request-list-translations').then(function (n) { return n.v; });
    case './translations/locales/en-ph.json': return import('request-list-translations').then(function (n) { return n.w; });
    case './translations/locales/en-se.json': return import('request-list-translations').then(function (n) { return n.x; });
    case './translations/locales/en-us.json': return import('request-list-translations').then(function (n) { return n.y; });
    case './translations/locales/en-x-dev.json': return import('request-list-translations').then(function (n) { return n.z; });
    case './translations/locales/en-x-keys.json': return import('request-list-translations').then(function (n) { return n.A; });
    case './translations/locales/en-x-obsolete.json': return import('request-list-translations').then(function (n) { return n.B; });
    case './translations/locales/en-x-pseudo.json': return import('request-list-translations').then(function (n) { return n.C; });
    case './translations/locales/en-x-test.json': return import('request-list-translations').then(function (n) { return n.D; });
    case './translations/locales/es-419.json': return import('request-list-translations').then(function (n) { return n.E; });
    case './translations/locales/es-ar.json': return import('request-list-translations').then(function (n) { return n.F; });
    case './translations/locales/es-cl.json': return import('request-list-translations').then(function (n) { return n.G; });
    case './translations/locales/es-es.json': return import('request-list-translations').then(function (n) { return n.H; });
    case './translations/locales/es-mx.json': return import('request-list-translations').then(function (n) { return n.I; });
    case './translations/locales/es-pe.json': return import('request-list-translations').then(function (n) { return n.J; });
    case './translations/locales/es.json': return import('request-list-translations').then(function (n) { return n.K; });
    case './translations/locales/et.json': return import('request-list-translations').then(function (n) { return n.L; });
    case './translations/locales/eu.json': return import('request-list-translations').then(function (n) { return n.M; });
    case './translations/locales/fa-af.json': return import('request-list-translations').then(function (n) { return n.N; });
    case './translations/locales/fa.json': return import('request-list-translations').then(function (n) { return n.O; });
    case './translations/locales/fi.json': return import('request-list-translations').then(function (n) { return n.P; });
    case './translations/locales/fil.json': return import('request-list-translations').then(function (n) { return n.Q; });
    case './translations/locales/fo.json': return import('request-list-translations').then(function (n) { return n.R; });
    case './translations/locales/fr-ca.json': return import('request-list-translations').then(function (n) { return n.S; });
    case './translations/locales/fr-dz.json': return import('request-list-translations').then(function (n) { return n.T; });
    case './translations/locales/fr-mu.json': return import('request-list-translations').then(function (n) { return n.U; });
    case './translations/locales/fr.json': return import('request-list-translations').then(function (n) { return n.V; });
    case './translations/locales/ga.json': return import('request-list-translations').then(function (n) { return n.W; });
    case './translations/locales/he.json': return import('request-list-translations').then(function (n) { return n.X; });
    case './translations/locales/hi.json': return import('request-list-translations').then(function (n) { return n.Y; });
    case './translations/locales/hr.json': return import('request-list-translations').then(function (n) { return n.Z; });
    case './translations/locales/hu.json': return import('request-list-translations').then(function (n) { return n._; });
    case './translations/locales/hy.json': return import('request-list-translations').then(function (n) { return n.$; });
    case './translations/locales/id.json': return import('request-list-translations').then(function (n) { return n.a0; });
    case './translations/locales/is.json': return import('request-list-translations').then(function (n) { return n.a1; });
    case './translations/locales/it-ch.json': return import('request-list-translations').then(function (n) { return n.a2; });
    case './translations/locales/it.json': return import('request-list-translations').then(function (n) { return n.a3; });
    case './translations/locales/ja.json': return import('request-list-translations').then(function (n) { return n.a4; });
    case './translations/locales/ka.json': return import('request-list-translations').then(function (n) { return n.a5; });
    case './translations/locales/kk.json': return import('request-list-translations').then(function (n) { return n.a6; });
    case './translations/locales/kl-dk.json': return import('request-list-translations').then(function (n) { return n.a7; });
    case './translations/locales/km.json': return import('request-list-translations').then(function (n) { return n.a8; });
    case './translations/locales/ko.json': return import('request-list-translations').then(function (n) { return n.a9; });
    case './translations/locales/ku.json': return import('request-list-translations').then(function (n) { return n.aa; });
    case './translations/locales/ky.json': return import('request-list-translations').then(function (n) { return n.ab; });
    case './translations/locales/lt.json': return import('request-list-translations').then(function (n) { return n.ac; });
    case './translations/locales/lv.json': return import('request-list-translations').then(function (n) { return n.ad; });
    case './translations/locales/mk.json': return import('request-list-translations').then(function (n) { return n.ae; });
    case './translations/locales/mn.json': return import('request-list-translations').then(function (n) { return n.af; });
    case './translations/locales/ms.json': return import('request-list-translations').then(function (n) { return n.ag; });
    case './translations/locales/mt.json': return import('request-list-translations').then(function (n) { return n.ah; });
    case './translations/locales/my.json': return import('request-list-translations').then(function (n) { return n.ai; });
    case './translations/locales/ne.json': return import('request-list-translations').then(function (n) { return n.aj; });
    case './translations/locales/nl-be.json': return import('request-list-translations').then(function (n) { return n.ak; });
    case './translations/locales/nl.json': return import('request-list-translations').then(function (n) { return n.al; });
    case './translations/locales/no.json': return import('request-list-translations').then(function (n) { return n.am; });
    case './translations/locales/pl.json': return import('request-list-translations').then(function (n) { return n.an; });
    case './translations/locales/pt-br.json': return import('request-list-translations').then(function (n) { return n.ao; });
    case './translations/locales/pt.json': return import('request-list-translations').then(function (n) { return n.ap; });
    case './translations/locales/ro-md.json': return import('request-list-translations').then(function (n) { return n.aq; });
    case './translations/locales/ro.json': return import('request-list-translations').then(function (n) { return n.ar; });
    case './translations/locales/ru.json': return import('request-list-translations').then(function (n) { return n.as; });
    case './translations/locales/si.json': return import('request-list-translations').then(function (n) { return n.at; });
    case './translations/locales/sk.json': return import('request-list-translations').then(function (n) { return n.au; });
    case './translations/locales/sl.json': return import('request-list-translations').then(function (n) { return n.av; });
    case './translations/locales/sq.json': return import('request-list-translations').then(function (n) { return n.aw; });
    case './translations/locales/sr-me.json': return import('request-list-translations').then(function (n) { return n.ax; });
    case './translations/locales/sr.json': return import('request-list-translations').then(function (n) { return n.ay; });
    case './translations/locales/sv.json': return import('request-list-translations').then(function (n) { return n.az; });
    case './translations/locales/sw-ke.json': return import('request-list-translations').then(function (n) { return n.aA; });
    case './translations/locales/ta.json': return import('request-list-translations').then(function (n) { return n.aB; });
    case './translations/locales/th.json': return import('request-list-translations').then(function (n) { return n.aC; });
    case './translations/locales/tr.json': return import('request-list-translations').then(function (n) { return n.aD; });
    case './translations/locales/uk.json': return import('request-list-translations').then(function (n) { return n.aE; });
    case './translations/locales/ur-pk.json': return import('request-list-translations').then(function (n) { return n.aF; });
    case './translations/locales/ur.json': return import('request-list-translations').then(function (n) { return n.aG; });
    case './translations/locales/uz.json': return import('request-list-translations').then(function (n) { return n.aH; });
    case './translations/locales/vi.json': return import('request-list-translations').then(function (n) { return n.aI; });
    case './translations/locales/zh-cn.json': return import('request-list-translations').then(function (n) { return n.aJ; });
    case './translations/locales/zh-tw.json': return import('request-list-translations').then(function (n) { return n.aK; });
    default: return new Promise(function(resolve, reject) {
      (typeof queueMicrotask === 'function' ? queueMicrotask : setTimeout)(
        reject.bind(null, new Error("Unknown variable dynamic import: " + path))
      );
    })
   }
 }
async function renderRequestList(themeSettings, props, container) {
    const { locale } = props;
    const { customStatusesEnabled } = props;
    initI18next(locale);
    await loadTranslations(locale, [
        () => __variableDynamicImportRuntime0__(`./translations/locales/${locale}.json`),
        () => __variableDynamicImportRuntime1__(`../shared/translations/locales/${locale}.json`),
    ]);
    const helpCenterPath = `/hc/${locale}`;
    reactDomExports.render(jsxRuntimeExports.jsx(ThemeProviders, { theme: createTheme(themeSettings), children: jsxRuntimeExports.jsx(ErrorBoundary, { helpCenterPath: helpCenterPath, children: jsxRuntimeExports.jsx(RequestsList, { locale: locale, customStatusesEnabled: customStatusesEnabled }) }) }), container);
}

export { renderRequestList };
