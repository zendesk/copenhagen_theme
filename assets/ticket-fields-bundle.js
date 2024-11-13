import { r as reactExports, j as jsxRuntimeExports, F as Field, C as Checkbox$1, L as Label, S as Span, H as Hint, M as Message, s as styled, u as useTranslation, a as MediaInput, b as SvgCreditCardStroke, D as Datepicker, I as Input$1, c as useToast, N as Notification, T as Title, d as Close, e as Textarea, f as Field$1, g as Label$1, h as Hint$1, i as Combobox, O as Option, k as Message$1, l as OptGroup, m as debounce } from 'shared';

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
  margin-left: ${(props) => props.theme.space.xxs};
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
    const formatDate = (value) => {
        if (value === undefined) {
            return "";
        }
        const isoString = value.toISOString();
        return valueFormat === "dateTime" ? isoString : isoString.split("T")[0];
    };
    const handleChange = (date) => {
        // Set the time to 12:00:00 as this is also the expected behavior across Support and the API
        const newDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0));
        setDate(newDate);
        const dateString = formatDate(newDate);
        if (dateString !== undefined) {
            onChange(dateString);
        }
    };
    const handleInputChange = (e) => {
        // Allow field to be cleared
        if (e.target.value === "") {
            setDate(undefined);
            onChange("");
        }
    };
    return (jsxRuntimeExports.jsxs(Field, { children: [jsxRuntimeExports.jsxs(Label, { children: [label, required && jsxRuntimeExports.jsx(Span, { "aria-hidden": "true", children: "*" })] }), description && (jsxRuntimeExports.jsx(Hint, { dangerouslySetInnerHTML: { __html: description } })), jsxRuntimeExports.jsx(Datepicker, { value: date, onChange: handleChange, locale: locale, children: jsxRuntimeExports.jsx(Input$1, { required: required, lang: locale, onChange: handleInputChange, validation: error ? "error" : undefined }) }), error && jsxRuntimeExports.jsx(Message, { validation: "error", children: error }), jsxRuntimeExports.jsx("input", { type: "hidden", name: name, value: formatDate(date) })] }));
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
    const { addToast } = useToast();
    const { t } = useTranslation();
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
                addToast(({ close }) => (jsxRuntimeExports.jsxs(Notification, { type: type, children: [jsxRuntimeExports.jsx(Title, { children: title }), message, jsxRuntimeExports.jsx(Close, { "aria-label": t("new-request-form.close-label", "Close"), onClick: close })] })));
            });
        }
    }, [hasWysiwyg, baseLocale, hasAtMentions, userRole, brandId, addToast, t]);
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

function MultiSelect({ field }) {
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
            return jsxRuntimeExports.jsx(MultiSelect, { field: field });
        case "tagger":
            return (jsxRuntimeExports.jsx(Tagger, { field: field, onChange: (value) => handleChange(field, value) }, field.name));
        case "priority":
        case "basic_priority":
        case "tickettype":
            return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(DropDown, { field: field, onChange: (value) => handleChange(field, value) }, field.name), field.value === "task" && dueDateField && handleDueDateChange && (jsxRuntimeExports.jsx(DatePicker, { field: dueDateField, locale: baseLocale, valueFormat: "dateTime", onChange: (value) => {
                            handleDueDateChange(value);
                        } }))] }));
        case "lookup":
            return (jsxRuntimeExports.jsx(LookupField, { field: field, userId: userId, organizationId: organizationField !== undefined
                    ? organizationField?.value
                    : defaultOrganizationId, onChange: (value) => handleChange(field, value) }, field.name));
        default:
            return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {});
    }
};

export { DropDown as D, Input as I, TextArea as T, TicketField as a, getCustomObjectKey as g };
