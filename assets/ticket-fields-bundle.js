import { r as reactExports, j as jsxRuntimeExports, F as Field, C as Checkbox$1, L as Label, S as Span, H as Hint, M as Message, s as styled, u as useTranslation, a as MediaInput, b as SvgCreditCardStroke, D as Datepicker, I as Input$1, c as useNotify, T as Textarea, d as Field$1, e as Label$1, f as Hint$1, g as Combobox, O as Option, h as Message$1, i as OptGroup, k as debounce } from 'shared';

function Checkbox({ field, onChange }) {
    const { label, error, value, name, required, description } = field;
    const [checkboxValue, setCheckboxValue] = reactExports.useState(value);
    const handleChange = (e) => {
        const { checked } = e.target;
        setCheckboxValue(checked);
        onChange(checked);
    };
    return (jsxRuntimeExports.jsxs(Field, { children: [jsxRuntimeExports.jsx("input", { type: "hidden", name: name, value: "off" }), jsxRuntimeExports.jsxs(Checkbox$1, { name: name, required: required, defaultChecked: value, value: checkboxValue ? "on" : "off", onChange: handleChange, children: [jsxRuntimeExports.jsxs(Label, { children: [label, required && jsxRuntimeExports.jsx(Span, { "aria-hidden": "true", children: "*" })] }), description && (jsxRuntimeExports.jsx(Hint, { dangerouslySetInnerHTML: { __html: description } }))] }), error && jsxRuntimeExports.jsx(Message, { validation: "error", children: error })] }));
}

/**
 * When there is an error in the credit card field, the backend returns a redacted value with the last 4 digits prefixed with some Xs.
 * This function removes the Xs from the value and returns the last 4 digits of the credit card
 *
 * @param value The value returned by the backend with last 4 digits prefixed with some Xs
 * @returns The last 4 digits of the credit card
 */
function getLastDigits(value) {
    return value ? value.replaceAll("X", "") : "";
}
const DigitsHintSpan = styled(Span) `
  margin-inline-start: ${(props) => props.theme.space.xxs};
  font-weight: ${(props) => props.theme.fontWeights.medium};
`;
function CreditCard({ field, onChange }) {
    const { t } = useTranslation();
    const { label, error, value, name, required, description } = field;
    const digits = getLastDigits(value);
    return (jsxRuntimeExports.jsxs(Field, { children: [jsxRuntimeExports.jsxs(Label, { children: [label, required && jsxRuntimeExports.jsx(Span, { "aria-hidden": "true", children: "*" }), jsxRuntimeExports.jsx(DigitsHintSpan, { children: t("cph-theme-ticket-fields.credit-card-digits-hint", "(Last 4 digits)") })] }), description && (jsxRuntimeExports.jsx(Hint, { dangerouslySetInnerHTML: { __html: description } })), jsxRuntimeExports.jsx(MediaInput, { start: jsxRuntimeExports.jsx(SvgCreditCardStroke, {}), name: name, type: "text", value: digits, onChange: (e) => onChange(e.target.value), validation: error ? "error" : undefined, required: required, maxLength: 4, placeholder: "XXXX" }), error && jsxRuntimeExports.jsx(Message, { validation: "error", children: error })] }));
}

function DatePicker({ field, locale, valueFormat, onChange, }) {
    const { label, error, value, name, required, description } = field;
    const [date, setDate] = reactExports.useState(value ? new Date(value) : undefined);
    /* Formats the date using the UTC time zone to prevent timezone-related issues.
     * By creating a new Date object with only the date, the time defaults to 00:00:00 UTC.
     * This avoids date shifts that can occur if formatted with the local time zone, as Garden does by default.
     */
    const formatDateInput = reactExports.useCallback((date) => {
        const dateTimeFormat = new Intl.DateTimeFormat(locale, {
            month: "long",
            day: "numeric",
            year: "numeric",
            timeZone: "UTC",
        });
        return dateTimeFormat.format(date);
    }, [locale]);
    const formatDateValue = reactExports.useCallback((value) => {
        if (value === undefined) {
            return "";
        }
        const isoString = value.toISOString();
        return valueFormat === "dateTime" ? isoString : isoString.split("T")[0];
    }, [valueFormat]);
    const handleChange = reactExports.useCallback((date) => {
        // Set the time to 12:00:00 as this is also the expected behavior across Support and the API
        const newDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0));
        setDate(newDate);
        const dateString = formatDateValue(newDate);
        if (dateString !== undefined) {
            onChange(dateString);
        }
    }, [onChange, formatDateValue]);
    const handleInputChange = (e) => {
        // Allow field to be cleared
        if (e.target.value === "") {
            setDate(undefined);
            onChange("");
        }
    };
    return (jsxRuntimeExports.jsxs(Field, { children: [jsxRuntimeExports.jsxs(Label, { children: [label, required && jsxRuntimeExports.jsx(Span, { "aria-hidden": "true", children: "*" })] }), description && (jsxRuntimeExports.jsx(Hint, { dangerouslySetInnerHTML: { __html: description } })), jsxRuntimeExports.jsx(Datepicker, { value: date, onChange: handleChange, formatDate: formatDateInput, locale: locale, children: jsxRuntimeExports.jsx(Input$1, { required: required, lang: locale, onChange: handleInputChange, validation: error ? "error" : undefined }) }), error && jsxRuntimeExports.jsx(Message, { validation: "error", children: error }), jsxRuntimeExports.jsx("input", { type: "hidden", name: name, value: formatDateValue(date) })] }));
}

function Input({ field, onChange }) {
    const { label, error, value, name, required, description, type } = field;
    const stepProp = {};
    const inputType = type === "integer" || type === "decimal" ? "number" : "text";
    if (type === "integer")
        stepProp.step = "1";
    if (type === "decimal")
        stepProp.step = "any";
    const autocomplete = type === "anonymous_requester_email" ? "email" : undefined;
    return (jsxRuntimeExports.jsxs(Field, { children: [jsxRuntimeExports.jsxs(Label, { children: [label, required && jsxRuntimeExports.jsx(Span, { "aria-hidden": "true", children: "*" })] }), description && (jsxRuntimeExports.jsx(Hint, { dangerouslySetInnerHTML: { __html: description } })), jsxRuntimeExports.jsx(Input$1, { name: name, type: inputType, defaultValue: value, validation: error ? "error" : undefined, required: required, onChange: (e) => {
                    onChange && onChange(e.target.value);
                }, autoComplete: autocomplete, ...stepProp }), error && jsxRuntimeExports.jsx(Message, { validation: "error", children: error })] }));
}

function useWysiwyg({ hasWysiwyg, baseLocale, hasAtMentions, userRole, brandId, }) {
    const isInitializedRef = reactExports.useRef(false);
    const notify = useNotify();
    return reactExports.useCallback(async (ref) => {
        if (hasWysiwyg && ref && !isInitializedRef.current) {
            isInitializedRef.current = true;
            const { createEditor } = await import('wysiwyg').then(function (n) { return n.m; });
            const editor = await createEditor(ref, {
                editorType: "supportRequests",
                hasAtMentions,
                userRole,
                brandId,
                baseLocale,
            });
            const notifications = editor.plugins.get("Notification");
            // Handle generic notifications and errors with "toast" notifications
            notifications.on("show", (event, data) => {
                event.stop(); // Prevent the default notification from being shown via window.alert
                const message = data.message instanceof Error
                    ? data.message.message
                    : data.message;
                const { type, title } = data;
                notify({ type, title, message });
            });
        }
    }, [hasWysiwyg, baseLocale, hasAtMentions, userRole, brandId, notify]);
}

const StyledField = styled(Field) `
  .ck.ck-editor {
    margin-top: ${(props) => props.theme.space.xs};
  }
`;
const StyledMessage = styled(Message) `
  .ck.ck-editor + & {
    margin-top: ${(props) => props.theme.space.xs};
  }
`;
function TextArea({ field, hasWysiwyg, baseLocale, hasAtMentions, userRole, brandId, onChange, }) {
    const { label, error, value, name, required, description } = field;
    const ref = useWysiwyg({
        hasWysiwyg,
        baseLocale,
        hasAtMentions,
        userRole,
        brandId,
    });
    return (jsxRuntimeExports.jsxs(StyledField, { children: [jsxRuntimeExports.jsxs(Label, { children: [label, required && jsxRuntimeExports.jsx(Span, { "aria-hidden": "true", children: "*" })] }), description && (jsxRuntimeExports.jsx(Hint, { dangerouslySetInnerHTML: { __html: description } })), jsxRuntimeExports.jsx(Textarea, { ref: ref, name: name, defaultValue: value, validation: error ? "error" : undefined, required: required, onChange: (e) => onChange(e.target.value), rows: 6, isResizable: true }), error && jsxRuntimeExports.jsx(StyledMessage, { validation: "error", children: error })] }));
}

function EmptyValueOption() {
    const { t } = useTranslation();
    return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(Span, { "aria-hidden": "true", children: "-" }), jsxRuntimeExports.jsx(Span, { hidden: true, children: t("cph-theme-ticket-fields.dropdown.empty-option", "Select an option") })] }));
}

function DropDown({ field, onChange }) {
    const { label, options, error, value, name, required, description } = field;
    const selectionValue = value == null ? "" : value.toString();
    const wrapperRef = reactExports.useRef(null);
    reactExports.useEffect(() => {
        if (wrapperRef.current && required) {
            const combobox = wrapperRef.current.querySelector("[role=combobox]");
            combobox?.setAttribute("aria-required", "true");
        }
    }, [wrapperRef, required]);
    return (jsxRuntimeExports.jsxs(Field$1, { children: [jsxRuntimeExports.jsxs(Label$1, { children: [label, required && jsxRuntimeExports.jsx(Span, { "aria-hidden": "true", children: "*" })] }), description && (jsxRuntimeExports.jsx(Hint$1, { dangerouslySetInnerHTML: { __html: description } })), jsxRuntimeExports.jsxs(Combobox, { ref: wrapperRef, inputProps: { name, required }, isEditable: false, validation: error ? "error" : undefined, inputValue: selectionValue, selectionValue: selectionValue, renderValue: ({ selection }) => selection?.label || jsxRuntimeExports.jsx(EmptyValueOption, {}), onChange: ({ selectionValue }) => {
                    if (selectionValue !== undefined) {
                        onChange(selectionValue);
                    }
                }, children: [!required && (jsxRuntimeExports.jsx(Option, { value: "", label: "-", children: jsxRuntimeExports.jsx(EmptyValueOption, {}) })), options.map((option) => (jsxRuntimeExports.jsx(Option, { value: option.value.toString(), label: option.name }, option.value)))] }), error && jsxRuntimeExports.jsx(Message$1, { validation: "error", children: error })] }));
}

/**
 * The root group is identified by an empty string, to avoid possible clashes with a level with
 * a "Root" name.
 */
const ROOT_GROUP_IDENTIFIER = "[]";
function getGroupIdentifier(names) {
    return `[${names.join("::")}]`;
}
function isGroupIdentifier(name) {
    return name.startsWith("[") && name.endsWith("]");
}
function getGroupAndOptionNames(input) {
    const namesList = input.split("::");
    return [namesList.slice(0, -1), namesList.slice(-1)[0]];
}
function buildSubGroupOptions(groupNames) {
    const parentGroupNames = groupNames.slice(0, -1);
    const parentGroupIdentifier = getGroupIdentifier(parentGroupNames);
    const name = groupNames[groupNames.length - 1];
    return {
        type: "SubGroup",
        name,
        backOption: {
            type: "previous",
            label: "Back",
            value: parentGroupIdentifier,
        },
        options: [],
    };
}
/**
 * Maps a flat list of options to a nested structure
 *
 * For example, given the following options:
 * [
 *  { "name": "Bass::Fender::Precision", "value": "bass__fender__precision" },
 *  { "name": "Bass::Fender::Jazz", "value": "bass__fender__jazz" }
 *  { "name": "Drums", "value": "drums" },
 * ]
 *
 * The following nested structure will be returned:
 * {
 *  "[]": {
 *   "type": "RootGroup",
 *   "options": [
 *    { "label": "Bass", "value": "[Bass]", type: "next" },
 *    { "label": "Drums", "value": "drums" },
 *   ]
 *  },
 *  "[Bass]": {
 *   "type": "SubGroup",
 *   "name": "Bass",
 *   "backOption": { "type": "previous", "label": "Back", "value": "[]" },
 *   "options": [
 *    { "label": "Fender", "value": "[Bass::Fender]", type: "next" },
 *   ]
 *  },
 *  "[Bass::Fender]": {
 *   "type": "SubGroup",
 *   "name": "Fender",
 *   "backOption": { "type": "previous", "label": "Back", "value": "[Bass]" },
 *   "options": [
 *    { "menuLabel": "Precision", "label": "Bass > Fender > Precision", "value": "bass__fender__precision" },
 *    { "menuLabel": "Jazz", "label": "Bass > Fender > Jazz", "value": "bass__fender__jazz" },
 *   ]
 *  }
 * }
 *
 * @param options original field options
 * @param hasEmptyOption if true, adds an empty option to the root group
 * @returns nested options
 */
function buildNestedOptions(options, hasEmptyOption) {
    const result = {
        [ROOT_GROUP_IDENTIFIER]: {
            type: "RootGroup",
            options: hasEmptyOption ? [{ label: "-", value: "" }] : [],
        },
    };
    options.forEach((option) => {
        const { name, value } = option;
        if (!name.includes("::")) {
            result[ROOT_GROUP_IDENTIFIER].options.push({
                value,
                label: name,
            });
        }
        else {
            const [groupNames, optionName] = getGroupAndOptionNames(name);
            const groupIdentifier = getGroupIdentifier(groupNames);
            if (!result[groupIdentifier]) {
                result[groupIdentifier] = buildSubGroupOptions(groupNames);
            }
            result[groupIdentifier]?.options.push({
                value,
                label: name.split("::").join(" > "),
                menuLabel: optionName,
            });
            // creates next options for each parent group, if they don't already exists
            for (let i = 0; i < groupNames.length; i++) {
                const parentGroupNames = groupNames.slice(0, i);
                const nextGroupNames = groupNames.slice(0, i + 1);
                const parentGroupIdentifier = getGroupIdentifier(parentGroupNames);
                const nextGroupIdentifier = getGroupIdentifier(nextGroupNames);
                if (!result[parentGroupIdentifier]) {
                    result[parentGroupIdentifier] =
                        buildSubGroupOptions(parentGroupNames);
                }
                if (result[parentGroupIdentifier]?.options.find((o) => o.value === nextGroupIdentifier) === undefined) {
                    result[parentGroupIdentifier]?.options.push({
                        type: "next",
                        label: nextGroupNames[nextGroupNames.length - 1],
                        value: nextGroupIdentifier,
                    });
                }
            }
        }
    });
    return result;
}
/**
 * When one or more options are selected, the Combobox component renders the label
 * for an option in the input, searching for an option passed as a child with the
 * same value as the selected option.
 *
 * In the first render we are passing only the root group options as children,
 * and if we already have some selected values from a SubGroup, the component is not
 * able to find the label for the selected option.
 *
 * We therefore need to pass all the non-navigation options as children in the first render.
 * The passed options are cached by the Combobox component, so we can safely remove them
 * after the first render and pass only the root group options.
 */
function getInitialGroup(nestedOptions) {
    const result = {
        type: "RootGroup",
        options: [],
    };
    Object.values(nestedOptions).forEach(({ options }) => {
        result.options.push(...options.filter(({ type }) => type === undefined));
    });
    return result;
}
function useNestedOptions({ options, hasEmptyOption, }) {
    const nestedOptions = reactExports.useMemo(() => buildNestedOptions(options, hasEmptyOption), [options, hasEmptyOption]);
    const [currentGroup, setCurrentGroup] = reactExports.useState(getInitialGroup(nestedOptions));
    reactExports.useEffect(() => {
        setCurrentGroup(nestedOptions[ROOT_GROUP_IDENTIFIER]);
    }, [nestedOptions]);
    const setCurrentGroupByIdentifier = (identifier) => {
        const group = nestedOptions[identifier];
        if (group) {
            setCurrentGroup(group);
        }
    };
    return {
        currentGroup,
        isGroupIdentifier,
        setCurrentGroupByIdentifier,
    };
}

function MultiSelect({ field, onChange, }) {
    const { label, options, error, value, name, required, description } = field;
    const { currentGroup, isGroupIdentifier, setCurrentGroupByIdentifier } = useNestedOptions({
        options,
        hasEmptyOption: false,
    });
    const [selectedValues, setSelectValues] = reactExports.useState(value || []);
    const wrapperRef = reactExports.useRef(null);
    reactExports.useEffect(() => {
        if (wrapperRef.current && required) {
            const combobox = wrapperRef.current.querySelector("[role=combobox]");
            combobox?.setAttribute("aria-required", "true");
        }
    }, [wrapperRef, required]);
    const handleChange = (changes) => {
        if (Array.isArray(changes.selectionValue)) {
            const lastSelectedItem = changes.selectionValue.slice(-1).toString();
            if (isGroupIdentifier(lastSelectedItem)) {
                setCurrentGroupByIdentifier(lastSelectedItem);
            }
            else {
                setSelectValues(changes.selectionValue);
                onChange(changes.selectionValue);
            }
        }
    };
    return (jsxRuntimeExports.jsxs(Field$1, { children: [selectedValues.map((selectedValue) => (jsxRuntimeExports.jsx("input", { type: "hidden", name: `${name}[]`, value: selectedValue }, selectedValue))), jsxRuntimeExports.jsxs(Label$1, { children: [label, required && jsxRuntimeExports.jsx(Span, { "aria-hidden": "true", children: "*" })] }), description && (jsxRuntimeExports.jsx(Hint$1, { dangerouslySetInnerHTML: { __html: description } })), jsxRuntimeExports.jsxs(Combobox, { ref: wrapperRef, isMultiselectable: true, inputProps: { required }, isEditable: false, validation: error ? "error" : undefined, onChange: handleChange, selectionValue: selectedValues, maxHeight: "auto", children: [currentGroup.type === "SubGroup" && (jsxRuntimeExports.jsx(Option, { ...currentGroup.backOption })), currentGroup.type === "SubGroup" ? (jsxRuntimeExports.jsx(OptGroup, { "aria-label": currentGroup.name, children: currentGroup.options.map((option) => (jsxRuntimeExports.jsx(Option, { ...option, children: option.menuLabel ?? option.label }, option.value))) })) : (currentGroup.options.map((option) => (jsxRuntimeExports.jsx(Option, { ...option }, option.value))))] }), error && jsxRuntimeExports.jsx(Message$1, { validation: "error", children: error })] }));
}

function Tagger({ field, onChange }) {
    const { label, options, error, value, name, required, description } = field;
    const { currentGroup, isGroupIdentifier, setCurrentGroupByIdentifier } = useNestedOptions({
        options,
        hasEmptyOption: true,
    });
    const selectionValue = value ?? "";
    const [isExpanded, setIsExpanded] = reactExports.useState(false);
    const wrapperRef = reactExports.useRef(null);
    reactExports.useEffect(() => {
        if (wrapperRef.current && required) {
            const combobox = wrapperRef.current.querySelector("[role=combobox]");
            combobox?.setAttribute("aria-required", "true");
        }
    }, [wrapperRef, required]);
    const handleChange = (changes) => {
        if (typeof changes.selectionValue === "string" &&
            isGroupIdentifier(changes.selectionValue)) {
            setCurrentGroupByIdentifier(changes.selectionValue);
            return;
        }
        if (typeof changes.selectionValue === "string") {
            onChange(changes.selectionValue);
        }
        if (changes.isExpanded !== undefined) {
            setIsExpanded(changes.isExpanded);
        }
    };
    return (jsxRuntimeExports.jsxs(Field$1, { children: [jsxRuntimeExports.jsxs(Label$1, { children: [label, required && jsxRuntimeExports.jsx(Span, { "aria-hidden": "true", children: "*" })] }), description && (jsxRuntimeExports.jsx(Hint$1, { dangerouslySetInnerHTML: { __html: description } })), jsxRuntimeExports.jsxs(Combobox, { ref: wrapperRef, inputProps: { required, name }, isEditable: false, validation: error ? "error" : undefined, onChange: handleChange, selectionValue: selectionValue, inputValue: selectionValue, renderValue: ({ selection }) => selection?.label ?? jsxRuntimeExports.jsx(EmptyValueOption, {}), isExpanded: isExpanded, children: [currentGroup.type === "SubGroup" && (jsxRuntimeExports.jsx(Option, { ...currentGroup.backOption })), currentGroup.type === "SubGroup" ? (jsxRuntimeExports.jsx(OptGroup, { "aria-label": currentGroup.name, children: currentGroup.options.map((option) => (jsxRuntimeExports.jsx(Option, { ...option, children: option.menuLabel ?? option.label }, option.value))) })) : (currentGroup.options.map((option) => option.value === "" ? (jsxRuntimeExports.jsx(Option, { ...option, children: jsxRuntimeExports.jsx(EmptyValueOption, {}) }, option.value)) : (jsxRuntimeExports.jsx(Option, { ...option }, option.value))))] }), error && jsxRuntimeExports.jsx(Message$1, { validation: "error", children: error })] }));
}

function getCustomObjectKey(targetType) {
    return targetType.replace("zen:custom_object:", "");
}
const EMPTY_OPTION = {
    value: "",
    name: "-",
};
function LookupField({ field, userId, organizationId, onChange, }) {
    const { id: fieldId, label, error, value, name, required, description, relationship_target_type, } = field;
    const [options, setOptions] = reactExports.useState([]);
    const [selectedOption, setSelectedOption] = reactExports.useState(null);
    const [inputValue, setInputValue] = reactExports.useState(value);
    const [isLoadingOptions, setIsLoadingOptions] = reactExports.useState(false);
    const { t } = useTranslation();
    const customObjectKey = getCustomObjectKey(relationship_target_type);
    const loadingOption = {
        name: t("cph-theme-ticket-fields.lookup-field.loading-options", "Loading items..."),
        id: "loading",
    };
    const noResultsOption = {
        name: t("cph-theme-ticket-fields.lookup-field.no-matches-found", "No matches found"),
        id: "no-results",
    };
    const fetchSelectedOption = reactExports.useCallback(async (selectionValue) => {
        try {
            const res = await fetch(`/api/v2/custom_objects/${customObjectKey}/records/${selectionValue}`);
            if (res.ok) {
                const { custom_object_record } = await res.json();
                const newSelectedOption = {
                    name: custom_object_record.name,
                    value: custom_object_record.id,
                };
                setSelectedOption(newSelectedOption);
                setInputValue(custom_object_record.name);
            }
        }
        catch (error) {
            console.error(error);
        }
    }, [customObjectKey]);
    const fetchOptions = reactExports.useCallback(async (inputValue) => {
        const searchParams = new URLSearchParams();
        searchParams.set("name", inputValue.toLocaleLowerCase());
        searchParams.set("source", "zen:ticket");
        searchParams.set("field_id", fieldId.toString());
        searchParams.set("requester_id", userId.toString());
        if (organizationId !== null)
            searchParams.set("organization_id", organizationId);
        setIsLoadingOptions(true);
        try {
            const response = await fetch(`/api/v2/custom_objects/${customObjectKey}/records/autocomplete?${searchParams.toString()}`);
            const data = await response.json();
            if (response.ok) {
                let fetchedOptions = data.custom_object_records.map(({ name, id }) => ({
                    name,
                    value: id,
                }));
                if (selectedOption) {
                    fetchedOptions = fetchedOptions.filter((option) => option.value !== selectedOption.value);
                    fetchedOptions = [selectedOption, ...fetchedOptions];
                }
                setOptions(fetchedOptions);
            }
            else {
                setOptions([]);
            }
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setIsLoadingOptions(false);
        }
    }, [customObjectKey, fieldId, organizationId, selectedOption, userId]);
    const debouncedFetchOptions = reactExports.useMemo(() => debounce(fetchOptions, 300), [fetchOptions]);
    reactExports.useEffect(() => {
        return () => debouncedFetchOptions.cancel();
    }, [debouncedFetchOptions]);
    const handleChange = reactExports.useCallback(({ inputValue, selectionValue }) => {
        if (selectionValue !== undefined) {
            if (selectionValue == "") {
                setSelectedOption(EMPTY_OPTION);
                setInputValue(EMPTY_OPTION.name);
                setOptions([]);
                onChange(EMPTY_OPTION.value);
            }
            else {
                const selectedOption = options.find((option) => option.value === selectionValue);
                if (selectedOption) {
                    setInputValue(selectedOption.name);
                    setSelectedOption(selectedOption);
                    setOptions([selectedOption]);
                    onChange(selectedOption.value);
                }
            }
        }
        if (inputValue !== undefined) {
            setInputValue(inputValue);
            debouncedFetchOptions(inputValue);
        }
    }, [debouncedFetchOptions, onChange, options]);
    reactExports.useEffect(() => {
        if (value) {
            fetchSelectedOption(value);
        }
    }, []); //we don't set dependency array as we want this hook to be called only once
    const onFocus = () => {
        setInputValue("");
        fetchOptions("*");
    };
    return (jsxRuntimeExports.jsxs(Field$1, { children: [jsxRuntimeExports.jsxs(Label$1, { children: [label, required && jsxRuntimeExports.jsx(Span, { "aria-hidden": "true", children: "*" })] }), description && (jsxRuntimeExports.jsx(Hint$1, { dangerouslySetInnerHTML: { __html: description } })), jsxRuntimeExports.jsxs(Combobox, { inputProps: { required }, "data-test-id": "lookup-field-combobox", validation: error ? "error" : undefined, inputValue: inputValue, selectionValue: selectedOption?.value, isAutocomplete: true, placeholder: t("cph-theme-ticket-fields.lookup-field.placeholder", "Search {{label}}", { label: label.toLowerCase() }), onFocus: onFocus, onChange: handleChange, renderValue: () => selectedOption ? selectedOption?.name : EMPTY_OPTION.name, children: [selectedOption?.name !== EMPTY_OPTION.name && (jsxRuntimeExports.jsx(Option, { value: "", label: "-", children: jsxRuntimeExports.jsx(EmptyValueOption, {}) })), isLoadingOptions && (jsxRuntimeExports.jsx(Option, { isDisabled: true, value: loadingOption.name }, loadingOption.id)), !isLoadingOptions &&
                        inputValue?.length > 0 &&
                        options.length === 0 && (jsxRuntimeExports.jsx(Option, { isDisabled: true, value: noResultsOption.name }, noResultsOption.id)), !isLoadingOptions &&
                        options.length !== 0 &&
                        options.map((option) => (jsxRuntimeExports.jsx(Option, { value: option.value, label: option.name, "data-test-id": `option-${option.name}` }, option.value)))] }), error && jsxRuntimeExports.jsx(Message$1, { validation: "error", children: error }), jsxRuntimeExports.jsx("input", { type: "hidden", name: name, value: selectedOption?.value })] }));
}

const TicketField = ({ field, baseLocale, hasAtMentions, userRole, userId, defaultOrganizationId, organizationField, brandId, dueDateField, handleDueDateChange, handleChange, }) => {
    switch (field.type) {
        case "text":
        case "integer":
        case "decimal":
        case "regexp":
            return (jsxRuntimeExports.jsx(Input, { field: field, onChange: (value) => handleChange(field, value) }, field.name));
        case "partialcreditcard":
            return (jsxRuntimeExports.jsx(CreditCard, { field: field, onChange: (value) => handleChange(field, value) }));
        case "textarea":
            return (jsxRuntimeExports.jsx(TextArea, { field: field, hasWysiwyg: false, baseLocale: baseLocale, hasAtMentions: hasAtMentions, userRole: userRole, brandId: brandId, onChange: (value) => handleChange(field, value) }, field.name));
        case "checkbox":
            return (jsxRuntimeExports.jsx(Checkbox, { field: field, onChange: (value) => handleChange(field, value) }));
        case "date":
            return (jsxRuntimeExports.jsx(DatePicker, { field: field, locale: baseLocale, valueFormat: "date", onChange: (value) => handleChange(field, value) }));
        case "multiselect":
            return (jsxRuntimeExports.jsx(MultiSelect, { field: field, onChange: (value) => handleChange(field, value) }));
        case "tagger":
            return (jsxRuntimeExports.jsx(Tagger, { field: field, onChange: (value) => handleChange(field, value) }, field.name));
        case "priority":
        case "basic_priority":
        case "tickettype":
            return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(DropDown, { field: field, onChange: (value) => handleChange(field, value) }, field.name), field.value === "task" && dueDateField && handleDueDateChange && (jsxRuntimeExports.jsx(DatePicker, { field: dueDateField, locale: baseLocale, valueFormat: "dateTime", onChange: (value) => {
                            handleDueDateChange(value);
                        } }))] }));
        case "lookup":
            return (jsxRuntimeExports.jsx(LookupField, { field: field, userId: userId, organizationId: organizationField !== null
                    ? organizationField?.value
                    : defaultOrganizationId, onChange: (value) => handleChange(field, value) }, field.name));
        default:
            return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {});
    }
};

var af = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}"
};

var af$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: af
});

var arXPseudo = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "[ผู้龍(Ḻααṡṭ 4 ḍḭḭḡḭḭṭṡ)龍ผู้]",
	"cph-theme-ticket-fields.dropdown.empty-option": "[ผู้龍Ṣḛḛḽḛḛͼṭ ααṇ ṓṓṗṭḭḭṓṓṇ龍ผู้]",
	"cph-theme-ticket-fields.lookup-field.loading-options": "[ผู้龍Ḻṓṓααḍḭḭṇḡ ḭḭṭḛḛṃṡ...龍ผู้]",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "[ผู้龍Ṅṓṓ ṃααṭͼḥḛḛṡ ϝṓṓṵṵṇḍ龍ผู้]",
	"cph-theme-ticket-fields.lookup-field.placeholder": "[ผู้龍Ṣḛḛααṛͼḥ {{label}}龍ผู้]"
};

var arXPseudo$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: arXPseudo
});

var ar = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(آخر 4 أرقام)",
	"cph-theme-ticket-fields.dropdown.empty-option": "حدّد خيارًا",
	"cph-theme-ticket-fields.lookup-field.loading-options": "جارٍ تحميل العناصر...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "لم يتم العثور على نتائج مطابقة",
	"cph-theme-ticket-fields.lookup-field.placeholder": "بحث في {{label}}"
};

var ar$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: ar
});

var az = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}"
};

var az$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: az
});

var be = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(последние 4 цифры)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Выберите вариант",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Загрузка элементов...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Соответствия не найдены",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Поиск: {{label}}"
};

var be$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: be
});

var bg = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(последните 4 цифри)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Изберете опция",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Зареждане на елементите…",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Няма открити съвпадения",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Търсене на {{label}}"
};

var bg$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: bg
});

var bn = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}"
};

var bn$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: bn
});

var bs = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}"
};

var bs$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: bs
});

var ca = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Últimos 4 dígitos)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Seleccione una opción",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Cargando elementos...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No se encontraron coincidencias",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Buscar {{label}}"
};

var ca$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: ca
});

var cs = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Poslední 4 číslice)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Vyberte možnost",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Načítání položek…",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Nebyly nalezeny žádné shody",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Hledat {{label}}"
};

var cs$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: cs
});

var cy = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}"
};

var cy$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: cy
});

var da = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Sidste 4 cifre)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Foretag et valg",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Indlæser elementer...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Ingen matchende resultater",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Søgning i {{label}}"
};

var da$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: da
});

var deDe = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Letzte vier Ziffern)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Wählen Sie eine Option aus",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Elemente werden geladen...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Keine Übereinstimmungen gefunden",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Suche {{label}}"
};

var deDe$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: deDe
});

var deXInformal = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Letzte vier Ziffern)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Wählen Sie eine Option aus",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Elemente werden geladen...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Keine Übereinstimmungen gefunden",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Suche {{label}}"
};

var deXInformal$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: deXInformal
});

var de = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Letzte vier Ziffern)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Wählen Sie eine Option aus",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Elemente werden geladen...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Keine Übereinstimmungen gefunden",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Suche {{label}}"
};

var de$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: de
});

var el = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(4 τελευταία ψηφία)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Ορίστε μια επιλογή",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Φόρτωση στοιχείων...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Δεν βρέθηκαν αποτελέσματα",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Αναζήτηση για {{label}}"
};

var el$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: el
});

var en001 = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}"
};

var en001$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: en001
});

var en150 = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}"
};

var en150$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: en150
});

var enAu = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}"
};

var enAu$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: enAu
});

var enCa = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}"
};

var enCa$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: enCa
});

var enGb = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}"
};

var enGb$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: enGb
});

var enMy = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}"
};

var enMy$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: enMy
});

var enPh = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}"
};

var enPh$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: enPh
});

var enSe = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}"
};

var enSe$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: enSe
});

var enUs = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}"
};

var enUs$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: enUs
});

var enXDev = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}"
};

var enXDev$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: enXDev
});

var enXKeys = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "cph-theme-ticket-fields.credit-card-digits-hint",
	"cph-theme-ticket-fields.dropdown.empty-option": "cph-theme-ticket-fields.dropdown.empty-option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "cph-theme-ticket-fields.lookup-field.loading-options",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "cph-theme-ticket-fields.lookup-field.no-matches-found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "cph-theme-ticket-fields.lookup-field.placeholder"
};

var enXKeys$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: enXKeys
});

var enXObsolete = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}"
};

var enXObsolete$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: enXObsolete
});

var enXPseudo = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "[ผู้龍(Ḻααṡṭ 4 ḍḭḭḡḭḭṭṡ)龍ผู้]",
	"cph-theme-ticket-fields.dropdown.empty-option": "[ผู้龍Ṣḛḛḽḛḛͼṭ ααṇ ṓṓṗṭḭḭṓṓṇ龍ผู้]",
	"cph-theme-ticket-fields.lookup-field.loading-options": "[ผู้龍Ḻṓṓααḍḭḭṇḡ ḭḭṭḛḛṃṡ...龍ผู้]",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "[ผู้龍Ṅṓṓ ṃααṭͼḥḛḛṡ ϝṓṓṵṵṇḍ龍ผู้]",
	"cph-theme-ticket-fields.lookup-field.placeholder": "[ผู้龍Ṣḛḛααṛͼḥ {{label}}龍ผู้]"
};

var enXPseudo$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: enXPseudo
});

var enXTest = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}"
};

var enXTest$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: enXTest
});

var es419 = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Últimos 4 dígitos)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Seleccione una opción",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Cargando elementos...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No se encontraron coincidencias",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Buscar {{label}}"
};

var es419$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: es419
});

var esEs = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Últimos 4 dígitos)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Seleccione una opción",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Cargando elementos...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No se encontraron coincidencias",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Buscar {{label}}"
};

var esEs$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: esEs
});

var es = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Últimos 4 dígitos)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Seleccione una opción",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Cargando elementos...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No se encontraron coincidencias",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Buscar {{label}}"
};

var es$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: es
});

var et = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}"
};

var et$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: et
});

var eu = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Últimos 4 dígitos)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Seleccione una opción",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Cargando elementos...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No se encontraron coincidencias",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Buscar {{label}}"
};

var eu$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: eu
});

var faAf = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}"
};

var faAf$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: faAf
});

var fa = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}"
};

var fa$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: fa
});

var fi = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(4 viimeistä numeroa)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Valitse vaihtoehto",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Ladataan kohteita...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Vastineita ei löytynyt",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Hae {{label}}"
};

var fi$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: fi
});

var fil = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}"
};

var fil$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: fil
});

var fo = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}"
};

var fo$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: fo
});

var frCa = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(4 derniers chiffres)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Sélectionner une option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Chargement des éléments...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Aucun résultat",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Rechercher {{label}}"
};

var frCa$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: frCa
});

var fr = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(4 derniers chiffres)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Sélectionner une option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Chargement des éléments...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Aucun résultat",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Rechercher {{label}}"
};

var fr$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: fr
});

var ga = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}"
};

var ga$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: ga
});

var he = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(4 הספרות האחרונות)",
	"cph-theme-ticket-fields.dropdown.empty-option": "בחר אפשרות",
	"cph-theme-ticket-fields.lookup-field.loading-options": "טוען פריטים...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "לא נמצאו התאמות",
	"cph-theme-ticket-fields.lookup-field.placeholder": "חיפוש {{label}}"
};

var he$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: he
});

var hi = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(आखिरी 4 अक्षर)",
	"cph-theme-ticket-fields.dropdown.empty-option": "कोई विकल्प चुनें",
	"cph-theme-ticket-fields.lookup-field.loading-options": "आइटम लोड हो रहे हैं...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "कोई मिलान नहीं मिले",
	"cph-theme-ticket-fields.lookup-field.placeholder": "खोज {{label}}"
};

var hi$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: hi
});

var hr = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}"
};

var hr$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: hr
});

var hu = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Utolsó négy számjegy)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Lehetőség kiválasztása",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Elemek betöltése…",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Nincs találat",
	"cph-theme-ticket-fields.lookup-field.placeholder": "{{label}} keresése"
};

var hu$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: hu
});

var hy = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}"
};

var hy$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: hy
});

var id = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(4 digit terakhir)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Pilih opsi",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Memuat item...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Tidak ditemukan kecocokan",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Cari {{label}}"
};

var id$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: id
});

var is = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}"
};

var is$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: is
});

var itCh = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Ultime 4 cifre)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Seleziona un’opzione",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Caricamento elementi in corso...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Nessuna corrispondenza trovata",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Cerca {{label}}"
};

var itCh$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: itCh
});

var it = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Ultime 4 cifre)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Seleziona un’opzione",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Caricamento elementi in corso...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Nessuna corrispondenza trovata",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Cerca {{label}}"
};

var it$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: it
});

var ja = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "（下4桁）",
	"cph-theme-ticket-fields.dropdown.empty-option": "オプションを選択",
	"cph-theme-ticket-fields.lookup-field.loading-options": "アイテムを読み込んでいます...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "一致するものが見つかりません",
	"cph-theme-ticket-fields.lookup-field.placeholder": "{{label}}を検索"
};

var ja$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: ja
});

var ka = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}"
};

var ka$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: ka
});

var kk = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}"
};

var kk$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: kk
});

var klDk = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}"
};

var klDk$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: klDk
});

var ko = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(마지막 4자리)",
	"cph-theme-ticket-fields.dropdown.empty-option": "옵션 선택",
	"cph-theme-ticket-fields.lookup-field.loading-options": "항목 로드 중...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "일치 항목을 찾지 못함",
	"cph-theme-ticket-fields.lookup-field.placeholder": "{{label}} 검색"
};

var ko$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: ko
});

var ku = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}"
};

var ku$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: ku
});

var lt = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}"
};

var lt$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: lt
});

var lv = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}"
};

var lv$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: lv
});

var mk = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}"
};

var mk$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: mk
});

var mn = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}"
};

var mn$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: mn
});

var ms = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}"
};

var ms$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: ms
});

var mt = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}"
};

var mt$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: mt
});

var my = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}"
};

var my$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: my
});

var nlBe = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Laatste 4 cijfers)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Selecteer een optie",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Items laden...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Geen overeenkomsten gevonden",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Zoek in {{label}}"
};

var nlBe$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: nlBe
});

var nl = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Laatste 4 cijfers)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Selecteer een optie",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Items laden...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Geen overeenkomsten gevonden",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Zoek in {{label}}"
};

var nl$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: nl
});

var no = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(4 siste sifre)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Velg et alternativ",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Laster inn elementer ...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Fant ingen samsvarende",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Søk {{label}}"
};

var no$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: no
});

var pl = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(ostatnie 4 cyfry)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Wybierz opcję",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Ładowanie elementów...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Nie znaleziono dopasowań",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Szukaj {{label}}"
};

var pl$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: pl
});

var ptBr = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Últimos 4 dígitos)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Selecionar uma opção",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Carregando itens...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Nenhuma correspondência encontrada",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Pesquisar {{label}}"
};

var ptBr$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: ptBr
});

var pt = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Últimos 4 dígitos)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Selecionar uma opção",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Carregando itens...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Nenhuma correspondência encontrada",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Pesquisar {{label}}"
};

var pt$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: pt
});

var ro = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Ultimele 4 cifre)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Selectați o opțiune",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Se încarcă articolele...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Nu s-au găsit corespondențe",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Căutare {{label}}"
};

var ro$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: ro
});

var ru = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(последние 4 цифры)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Выберите вариант",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Загрузка элементов...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Соответствия не найдены",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Поиск: {{label}}"
};

var ru$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: ru
});

var sk = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}"
};

var sk$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: sk
});

var sl = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}"
};

var sl$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: sl
});

var sq = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}"
};

var sq$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: sq
});

var srMe = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}"
};

var srMe$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: srMe
});

var sr = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}"
};

var sr$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: sr
});

var sv = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(4 sista siffror)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Välj ett alternativ",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Läser in objekt...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Inga träffar hittades",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Sök {{label}}"
};

var sv$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: sv
});

var th = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(เลข 4 หลักสุดท้าย)",
	"cph-theme-ticket-fields.dropdown.empty-option": "เลือกตัวเลือก",
	"cph-theme-ticket-fields.lookup-field.loading-options": "กำลังโหลดรายการ...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "ไม่พบรายการที่ตรงกัน",
	"cph-theme-ticket-fields.lookup-field.placeholder": "ค้นหา {{label}}"
};

var th$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: th
});

var tr = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Son 4 hane)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Bir seçim yapın",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Öğeler yükleniyor...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Eşleşme bulunamadı",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Ara {{label}}"
};

var tr$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: tr
});

var uk = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Останні 4 цифри)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Виберіть варіант",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Завантаження елементів...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Збігів не знайдено",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Пошук {{label}}"
};

var uk$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: uk
});

var ur = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}"
};

var ur$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: ur
});

var uz = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}"
};

var uz$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: uz
});

var vi = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "(4 chữ số cuối)",
	"cph-theme-ticket-fields.dropdown.empty-option": "Chọn một tùy chọn",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Đang tải các mục...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Không tìm thấy kết quả phù hợp",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Tìm kiếm {{label}}"
};

var vi$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: vi
});

var zhCn = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "（最后 4 位数）",
	"cph-theme-ticket-fields.dropdown.empty-option": "选择一个选项",
	"cph-theme-ticket-fields.lookup-field.loading-options": "正在加载项目…",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "未找到匹配项",
	"cph-theme-ticket-fields.lookup-field.placeholder": "搜索 {{label}}"
};

var zhCn$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: zhCn
});

var zhTw = {
	"cph-theme-ticket-fields.credit-card-digits-hint": "（最後 4 位數）",
	"cph-theme-ticket-fields.dropdown.empty-option": "請選取一項",
	"cph-theme-ticket-fields.lookup-field.loading-options": "項目載入中...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "找不到符合項目",
	"cph-theme-ticket-fields.lookup-field.placeholder": "搜尋「{{label}}」"
};

var zhTw$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: zhTw
});

export { id$1 as $, enUs$1 as A, enXDev$1 as B, enXKeys$1 as C, DropDown as D, enXObsolete$1 as E, enXPseudo$1 as F, enXTest$1 as G, es419$1 as H, Input as I, esEs$1 as J, es$1 as K, et$1 as L, eu$1 as M, faAf$1 as N, fa$1 as O, fi$1 as P, fil$1 as Q, fo$1 as R, frCa$1 as S, TextArea as T, fr$1 as U, ga$1 as V, he$1 as W, hi$1 as X, hr$1 as Y, hu$1 as Z, hy$1 as _, TicketField as a, is$1 as a0, itCh$1 as a1, it$1 as a2, ja$1 as a3, ka$1 as a4, kk$1 as a5, klDk$1 as a6, ko$1 as a7, ku$1 as a8, lt$1 as a9, zhCn$1 as aA, zhTw$1 as aB, lv$1 as aa, mk$1 as ab, mn$1 as ac, ms$1 as ad, mt$1 as ae, my$1 as af, nlBe$1 as ag, nl$1 as ah, no$1 as ai, pl$1 as aj, ptBr$1 as ak, pt$1 as al, ro$1 as am, ru$1 as an, sk$1 as ao, sl$1 as ap, sq$1 as aq, srMe$1 as ar, sr$1 as as, sv$1 as at, th$1 as au, tr$1 as av, uk$1 as aw, ur$1 as ax, uz$1 as ay, vi$1 as az, af$1 as b, arXPseudo$1 as c, ar$1 as d, az$1 as e, be$1 as f, getCustomObjectKey as g, bg$1 as h, bn$1 as i, bs$1 as j, ca$1 as k, cs$1 as l, cy$1 as m, da$1 as n, deDe$1 as o, deXInformal$1 as p, de$1 as q, el$1 as r, en001$1 as s, en150$1 as t, enAu$1 as u, enCa$1 as v, enGb$1 as w, enMy$1 as x, enPh$1 as y, enSe$1 as z };
