import { D as DEFAULT_THEME, N as Ne, r as reactExports, s as styled, j as jsxRuntimeExports, T as ThemeProvider, a as ToastProvider, F as Field, L as Label$1, S as Span, H as Hint, I as Input$1, M as Message, b as Textarea, h as hideVisually, u as useTranslation, c as Field$1, d as Label, e as Hint$1, C as Combobox, O as Option, f as Message$1, g as Checkbox$1, i as OptGroup, p as purify, k as FileList, l as File, m as Tooltip, P as Progress, A as Anchor, n as useToast, o as Notification, q as Title, t as Close, v as useDropzone, w as FileUpload, x as Datepicker, y as useGrid, z as focusStyles, B as FauxInput, E as Tag, G as SvgAlertWarningStroke, $ as $e, J as Header$1, K as Footer$2, Q as Modal, R as Alert, U as Body$2, V as Accordion, W as Paragraph, X as Button, Y as Close$2, Z as instance, _ as initReactI18next, a0 as reactDomExports } from 'vendor-bundle';

function createTheme(settings) {
    return {
        ...DEFAULT_THEME,
        rtl: document.dir === "rtl",
        colors: {
            ...DEFAULT_THEME.colors,
            foreground: settings.text_color,
            primaryHue: settings.brand_color,
        },
        components: {
            "buttons.anchor": Ne `
        color: ${settings.link_color};

        :hover,
        :active,
        :focus {
          color: ${settings.hover_link_color};
        }

        &:visited {
          color: ${settings.visited_link_color};
        }
      `,
        },
    };
}

const ModalContainerContext = reactExports.createContext(null);

// z-index needs to be higher than the z-index of the navbar,
const ModalContainer = styled.div `
  z-index: 2147483647;
  position: fixed;
`;
function ModalContainerProvider({ children, }) {
    const [container, setContainer] = reactExports.useState();
    const containerRefCallback = (element) => {
        setContainer(element);
    };
    return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(ModalContainer, { ref: containerRefCallback }), container && (jsxRuntimeExports.jsx(ModalContainerContext.Provider, { value: container, children: children }))] }));
}

function ThemeProviders({ theme, children, }) {
    return (jsxRuntimeExports.jsx(ThemeProvider, { theme: theme, children: jsxRuntimeExports.jsx(ToastProvider, { zIndex: 2147483647, children: jsxRuntimeExports.jsx(ModalContainerProvider, { children: children }) }) }));
}

function useModalContainer() {
    const modalContainer = reactExports.useContext(ModalContainerContext);
    if (modalContainer === null) {
        throw new Error("useModalContainer should be used inside a ModalContainerProvider");
    }
    return modalContainer;
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
    return (jsxRuntimeExports.jsxs(Field, { children: [jsxRuntimeExports.jsxs(Label$1, { children: [label, required && jsxRuntimeExports.jsx(Span, { "aria-hidden": "true", children: "*" })] }), description && jsxRuntimeExports.jsx(Hint, { children: description }), jsxRuntimeExports.jsx(Input$1, { name: name, type: inputType, defaultValue: value, validation: error ? "error" : undefined, required: required, onChange: (e) => onChange(e.target.value), autoComplete: autocomplete, ...stepProp }), error && jsxRuntimeExports.jsx(Message, { validation: "error", children: error })] }));
}

function TextArea({ field, hasWysiwyg, onChange, }) {
    const { label, error, value, name, required, description } = field;
    const wysiwygInitialized = reactExports.useRef(false);
    const textAreaRefCallback = reactExports.useCallback((ref) => {
        if (hasWysiwyg && ref && !wysiwygInitialized.current) {
            if (window.NewRequestForm) {
                wysiwygInitialized.current = true;
                window.NewRequestForm.initializeWysiwyg(ref);
            }
        }
    }, [hasWysiwyg]);
    return (jsxRuntimeExports.jsxs(Field, { children: [jsxRuntimeExports.jsxs(Label$1, { children: [label, required && jsxRuntimeExports.jsx(Span, { "aria-hidden": "true", children: "*" })] }), description && jsxRuntimeExports.jsx(Hint, { children: description }), jsxRuntimeExports.jsx(Textarea, { ref: textAreaRefCallback, name: name, defaultValue: value, validation: error ? "error" : undefined, required: required, onChange: (e) => onChange(e.target.value) }), error && jsxRuntimeExports.jsx(Message, { validation: "error", children: error })] }));
}

const HideVisually = styled.span `
  ${hideVisually()}
`;
function EmptyValueOption() {
    const { t } = useTranslation();
    return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(Span, { "aria-hidden": "true", children: "-" }), jsxRuntimeExports.jsx(HideVisually, { children: t("new-request-form.dropdown.empty-option", "Select an option") })] }));
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
    return (jsxRuntimeExports.jsxs(Field$1, { children: [jsxRuntimeExports.jsxs(Label, { children: [label, required && jsxRuntimeExports.jsx(Span, { "aria-hidden": "true", children: "*" })] }), description && jsxRuntimeExports.jsx(Hint$1, { children: description }), jsxRuntimeExports.jsxs(Combobox, { ref: wrapperRef, inputProps: { name, required }, isEditable: false, validation: error ? "error" : undefined, inputValue: selectionValue, selectionValue: selectionValue, renderValue: ({ selection }) => selection?.label || jsxRuntimeExports.jsx(EmptyValueOption, {}), onChange: ({ selectionValue }) => {
                    if (selectionValue !== undefined) {
                        onChange(selectionValue);
                    }
                }, children: [!required && (jsxRuntimeExports.jsx(Option, { value: "", label: "-", children: jsxRuntimeExports.jsx(EmptyValueOption, {}) })), options.map((option) => (jsxRuntimeExports.jsx(Option, { value: option.value.toString(), label: option.name }, option.value)))] }), error && jsxRuntimeExports.jsx(Message$1, { validation: "error", children: error })] }));
}

function Checkbox({ field, onChange }) {
    const { label, error, value, name, required, description } = field;
    const [checkboxValue, setCheckboxValue] = reactExports.useState(value);
    const handleChange = (e) => {
        const { checked } = e.target;
        setCheckboxValue(checked);
        onChange(checked);
    };
    return (jsxRuntimeExports.jsxs(Field, { children: [jsxRuntimeExports.jsx("input", { type: "hidden", name: name, value: "off" }), jsxRuntimeExports.jsxs(Checkbox$1, { name: name, required: required, defaultChecked: value, value: checkboxValue ? "on" : "off", onChange: handleChange, children: [jsxRuntimeExports.jsxs(Label$1, { children: [label, required && jsxRuntimeExports.jsx(Span, { "aria-hidden": "true", children: "*" })] }), description && jsxRuntimeExports.jsx(Hint, { children: description })] }), error && jsxRuntimeExports.jsx(Message, { validation: "error", children: error })] }));
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
    return (jsxRuntimeExports.jsxs(Field$1, { children: [selectedValues.map((selectedValue) => (jsxRuntimeExports.jsx("input", { type: "hidden", name: `${name}[]`, value: selectedValue }, selectedValue))), jsxRuntimeExports.jsxs(Label, { children: [label, required && jsxRuntimeExports.jsx(Span, { "aria-hidden": "true", children: "*" })] }), description && jsxRuntimeExports.jsx(Hint$1, { children: description }), jsxRuntimeExports.jsxs(Combobox, { ref: wrapperRef, isMultiselectable: true, inputProps: { required }, isEditable: false, validation: error ? "error" : undefined, onChange: handleChange, selectionValue: selectedValues, maxHeight: "auto", children: [currentGroup.type === "SubGroup" && (jsxRuntimeExports.jsx(Option, { ...currentGroup.backOption })), currentGroup.type === "SubGroup" ? (jsxRuntimeExports.jsx(OptGroup, { "aria-label": currentGroup.name, children: currentGroup.options.map((option) => (jsxRuntimeExports.jsx(Option, { ...option, children: option.menuLabel ?? option.label }, option.value))) })) : (currentGroup.options.map((option) => (jsxRuntimeExports.jsx(Option, { ...option }, option.value))))] }), error && jsxRuntimeExports.jsx(Message$1, { validation: "error", children: error })] }));
}

const key = "return-focus-to-ticket-form-field";
function TicketFormField({ field }) {
    const ref = reactExports.createRef();
    const handleChange = ({ selectionValue }) => {
        if (selectionValue && typeof selectionValue === "number") {
            const url = new URL(window.location.href);
            const searchParams = url.searchParams;
            searchParams.set("ticket_form_id", selectionValue);
            sessionStorage.setItem(key, "true");
            window.location.href = url.toString();
        }
    };
    reactExports.useEffect(() => {
        if (sessionStorage.getItem(key)) {
            sessionStorage.removeItem(key);
            // return focus to the ticket form field dropdown
            // after the page reloads for better a11y
            ref.current?.firstChild?.focus();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx("input", { type: "hidden", name: field.name, value: field.value }), field.options.length > 1 && (jsxRuntimeExports.jsxs(Field$1, { children: [jsxRuntimeExports.jsx(Label, { children: field.label }), jsxRuntimeExports.jsx(Combobox, { isEditable: false, onChange: handleChange, ref: ref, children: field.options.map((option) => (jsxRuntimeExports.jsx(Option, { value: option.value, label: option.name, isSelected: field.value === option.value, children: option.name }, option.value))) })] }))] }));
}

function ParentTicketField({ field, }) {
    const { value, name } = field;
    return jsxRuntimeExports.jsx("input", { type: "hidden", name: name, value: value });
}

const NON_DIGITS_REGEX = /[^\d]/g;
const CC_NUMBERS_REGEX = /[0-9]{13,19}/;
const REDACTED_CC_NUMBER_REGEX = /^[X]{9,15}/;
const MIN_LENGTH = 13;
const MAX_LENGTH = 19;
function redactCreditCard(input) {
    // if number is already redacted, just send it back
    if (alreadyRedactedCCNumber(input)) {
        return input;
    }
    const cleaned = removeNonDigits(input);
    if (!hasValidLength(cleaned)) {
        // if input string is not inside valid length for credit card number,
        // such as in the case when extra text is entered beside cc number,
        // we will remove spaces and dashes from original input,
        // and redact credit card number if we can find it
        // or redact everything if we can't find anything resembling cc number.
        const ccTextWithoutSpacesAndDashes = removeSpacesAndDashes(input);
        const ccNumber = CC_NUMBERS_REGEX.exec(ccTextWithoutSpacesAndDashes.toString());
        if (ccNumber !== null) {
            return redactCCNumber(ccNumber.toString());
        }
        else {
            // redact everything since that is an error and not valid cc number
            return charRepeater("X", cleaned.length);
        }
    }
    else {
        return redactCCNumber(cleaned.toString());
    }
}
function hasValidLength(input) {
    return input.length >= MIN_LENGTH && input.length <= MAX_LENGTH;
}
function removeNonDigits(input) {
    return input.replace(NON_DIGITS_REGEX, "");
}
function removeSpacesAndDashes(input) {
    return input.replace(/-|\s/g, "");
}
function redactCCNumber(input) {
    const length = input.length;
    const redactEnd = length - 4;
    const lastDigits = input.toString().substring(redactEnd, length);
    return charRepeater("X", redactEnd) + lastDigits;
}
function alreadyRedactedCCNumber(input) {
    return REDACTED_CC_NUMBER_REGEX.test(input);
}
function charRepeater(character, length) {
    const repeatedString = [];
    for (let i = 0; i < length; i++) {
        repeatedString.push(character);
    }
    return repeatedString.join("");
}

// NOTE: This is a temporary handling of the CSRF token
async function fetchCsrfToken$1() {
    const response = await fetch("/api/v2/help_center/sessions.json");
    const { current_session } = await response.json();
    return current_session.csrf_token;
}

/**
 * This hook creates a ref callback used to override the submit method of the form
 * that uses the callback.
 * Before submitting the form, it fetches the CSRF token from the backend and appends it to the form,
 * and redacts the value of the eventual credit card field
 * @param ticketFields array of ticket fields for the form
 * @returns a Ref callback and a submit handler
 */
function useFormSubmit(ticketFields) {
    const initialized = reactExports.useRef(false);
    const isSubmitting = reactExports.useRef(false);
    const formRefCallback = reactExports.useCallback((ref) => {
        if (ref && !initialized.current) {
            initialized.current = true;
            /* We are monkey patching the submit method of the form, since this behavior is what
               other scripts in Help Center are intercepting the submit event, stopping the event propagation and
               calling the submit method directly */
            ref.submit = async () => {
                /* We are performing an async call to fetch the CSRF token and for this reason
                 the submit is not immediate, and the user can click the submit button multiple times.
                 We don't want to disable the submit button for A11Y, so we use the isSubmitting ref
                 to stop subsequent submits after the first one. */
                if (isSubmitting.current === false) {
                    isSubmitting.current = true;
                    const token = await fetchCsrfToken$1();
                    const hiddenInput = document.createElement("input");
                    hiddenInput.type = "hidden";
                    hiddenInput.name = "authenticity_token";
                    hiddenInput.value = token;
                    ref.appendChild(hiddenInput);
                    // Ensure that the credit card field is redacted before submitting
                    const creditCardField = ticketFields.find((field) => field.type === "partialcreditcard");
                    if (creditCardField) {
                        const creditCardInput = ref.querySelector(`input[name="${creditCardField.name}"]`);
                        if (creditCardInput &&
                            creditCardInput instanceof HTMLInputElement) {
                            creditCardInput.value = redactCreditCard(creditCardInput.value);
                        }
                    }
                    HTMLFormElement.prototype.submit.call(ref);
                }
            };
        }
    }, [ticketFields]);
    const handleSubmit = (e) => {
        e.preventDefault();
        e.target.submit();
    };
    return { formRefCallback, handleSubmit };
}

const MAX_URL_LENGTH = 2048;
const TICKET_FIELD_PREFIX = "tf_";
const ALLOWED_SYSTEM_FIELDS = [
    "anonymous_requester_email",
    "priority",
    "type",
    "description",
    "subject",
    "due_at",
    "collaborators",
    "organization_id",
];
const ALLOWED_BOOLEAN_VALUES = ["true", "false"];
const ALLOWED_HTML_TAGS = [
    "pre",
    "strong",
    "b",
    "p",
    "blockquote",
    "ul",
    "ol",
    "li",
    "h2",
    "h3",
    "h4",
    "i",
    "em",
    "br",
];
function usePrefilledTicketFields(fields) {
    const { href } = location;
    const params = new URL(href).searchParams;
    if (href.length > MAX_URL_LENGTH)
        return fields;
    if (params.get("parent_id"))
        return fields;
    for (const [key, value] of params) {
        if (!key.startsWith(TICKET_FIELD_PREFIX))
            continue;
        const ticketFieldId = key.substring(TICKET_FIELD_PREFIX.length);
        const isSystemField = ALLOWED_SYSTEM_FIELDS.includes(ticketFieldId);
        const isCustomField = !Number.isNaN(Number(ticketFieldId));
        if (!isSystemField && !isCustomField)
            continue;
        const isCollaborators = ticketFieldId === "collaborators";
        const name = isSystemField
            ? isCollaborators
                ? "request[collaborators][]"
                : `request[${ticketFieldId}]`
            : `request[custom_fields][${ticketFieldId}]`;
        const field = fields.find((field) => field.name === name);
        if (!field)
            continue;
        const sanitizedValue = purify.sanitize(value, {
            ALLOWED_TAGS: ALLOWED_HTML_TAGS,
        });
        switch (field.type) {
            case "partialcreditcard":
                continue;
            case "multiselect":
                field.value = sanitizedValue
                    .split(",")
                    // filter out prefilled options that don't exist
                    .filter((value) => field.options.some((option) => option.value === value));
                break;
            case "checkbox":
                if (ALLOWED_BOOLEAN_VALUES.includes(sanitizedValue)) {
                    field.value =
                        sanitizedValue === "true"
                            ? "on"
                            : sanitizedValue === "false"
                                ? "off"
                                : "";
                }
                break;
            default:
                field.value = sanitizedValue;
        }
    }
    return fields;
}

const FileNameWrapper = styled.div `
  flex: 1;
`;
function FileListItem({ file, onRemove, }) {
    const { t } = useTranslation();
    const handleFileKeyDown = (e) => {
        if (e.code === "Delete" || e.code === "Backspace") {
            e.preventDefault();
            onRemove();
        }
    };
    const handleCloseKeyDown = (e) => {
        if (e.code === "Enter" ||
            e.code === "Space" ||
            e.code === "Delete" ||
            e.code === "Backspace") {
            e.preventDefault();
            onRemove();
        }
    };
    const fileName = file.status === "pending" ? file.file_name : file.value.file_name;
    const stopUploadLabel = t("new-request-form.attachments.stop-upload", "Stop upload");
    const removeFileLabel = t("new-request-form.attachments.remove-file", "Remove file");
    return (jsxRuntimeExports.jsx(FileList.Item, { children: jsxRuntimeExports.jsx(File, { type: "generic", title: fileName, onKeyDown: handleFileKeyDown, children: file.status === "pending" ? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(FileNameWrapper, { children: fileName }), jsxRuntimeExports.jsx(Tooltip, { content: stopUploadLabel, children: jsxRuntimeExports.jsx(File.Close, { "aria-label": stopUploadLabel, onClick: () => {
                                onRemove();
                            }, onKeyDown: handleCloseKeyDown }) }), jsxRuntimeExports.jsx(Progress, { value: file.progress, "aria-label": t("new-request-form.attachments.uploading", "Uploading {{fileName}}", { fileName }) })] })) : (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(FileNameWrapper, { children: jsxRuntimeExports.jsx(Anchor, { isExternal: true, href: file.value.url, target: "_blank", children: fileName }) }), jsxRuntimeExports.jsx(Tooltip, { content: removeFileLabel, children: jsxRuntimeExports.jsx(File.Delete, { "aria-label": removeFileLabel, onClick: () => {
                                onRemove();
                            }, onKeyDown: handleCloseKeyDown }) }), jsxRuntimeExports.jsx(Progress, { value: 100, "aria-hidden": "true" })] })) }) }));
}

function useAttachedFiles(initialValue) {
    const [files, setFiles] = reactExports.useState(initialValue);
    const addPendingFile = reactExports.useCallback((id, file_name, xhr) => {
        setFiles((current) => [
            ...current,
            { status: "pending", id, file_name, progress: 0, xhr },
        ]);
    }, []);
    const setPendingFileProgress = reactExports.useCallback((id, progress) => {
        setFiles((current) => current.map((file) => file.status === "pending" && file.id === id
            ? { ...file, progress }
            : file));
    }, []);
    const removePendingFile = reactExports.useCallback((id) => {
        setFiles((current) => current.filter((file) => file.status !== "pending" || file.id !== id));
    }, []);
    const removeUploadedFile = reactExports.useCallback((id) => {
        setFiles((current) => current.filter((file) => file.status !== "uploaded" || file.value.id !== id));
    }, []);
    const setUploaded = reactExports.useCallback((pendingId, value) => {
        setFiles((current) => current.map((file) => file.status === "pending" && file.id === pendingId
            ? { status: "uploaded", value }
            : file));
    }, []);
    return {
        files,
        addPendingFile,
        setPendingFileProgress,
        removePendingFile,
        removeUploadedFile,
        setUploaded,
    };
}

async function fetchCsrfToken() {
    const response = await fetch("/api/v2/users/me.json");
    const { user: { authenticity_token }, } = await response.json();
    return authenticity_token;
}
function Attachments({ field }) {
    const { label, error, name, attachments } = field;
    const { files, addPendingFile, setPendingFileProgress, setUploaded, removePendingFile, removeUploadedFile, } = useAttachedFiles(attachments.map((value) => ({
        status: "uploaded",
        value,
    })) ?? []);
    const { addToast } = useToast();
    const { t } = useTranslation();
    const notifyError = reactExports.useCallback((fileName) => {
        addToast(({ close }) => (jsxRuntimeExports.jsxs(Notification, { type: "error", children: [jsxRuntimeExports.jsx(Title, { children: t("new-request-form.attachments.upload-error-title", "Upload error") }), t("new-request-form.attachments.upload-error-description", "There was an error uploading {{fileName}}. Try again or upload another file.", { fileName }), jsxRuntimeExports.jsx(Close, { "aria-label": t("new-request-form.close-label", "Close"), onClick: close })] })));
    }, [addToast, t]);
    const onDrop = reactExports.useCallback(async (acceptedFiles) => {
        const csrfToken = await fetchCsrfToken();
        for (const file of acceptedFiles) {
            // fetch doesn't support upload progress, so we use XMLHttpRequest
            const xhr = new XMLHttpRequest();
            const url = new URL(`${window.location.origin}/api/v2/uploads.json`);
            url.searchParams.append("filename", file.name);
            xhr.open("POST", url);
            xhr.setRequestHeader("Content-Type", file.type);
            xhr.setRequestHeader("X-CSRF-Token", csrfToken);
            xhr.responseType = "json";
            const pendingId = crypto.randomUUID();
            addPendingFile(pendingId, file.name, xhr);
            xhr.upload.addEventListener("progress", ({ loaded, total }) => {
                const progress = Math.round((loaded / total) * 100);
                // There is a bit of delay between the upload ending and the
                // load event firing, so we don't want to set the progress to 100
                // otherwise it is not clear that the upload is still in progress.
                if (progress <= 90) {
                    setPendingFileProgress(pendingId, progress);
                }
            });
            xhr.addEventListener("load", () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    const { upload: { attachment: { file_name, content_url }, token, }, } = xhr.response;
                    setUploaded(pendingId, { id: token, file_name, url: content_url });
                }
                else {
                    notifyError(file.name);
                    removePendingFile(pendingId);
                }
            });
            xhr.addEventListener("error", () => {
                notifyError(file.name);
                removePendingFile(pendingId);
            });
            xhr.send(file);
        }
    }, [
        addPendingFile,
        removePendingFile,
        setPendingFileProgress,
        setUploaded,
        notifyError,
    ]);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });
    const handleRemove = async (file) => {
        if (file.status === "pending") {
            file.xhr.abort();
            removePendingFile(file.id);
        }
        else {
            const csrfToken = await fetchCsrfToken();
            const token = file.value.id;
            removeUploadedFile(file.value.id);
            await fetch(`/api/v2/uploads/${token}.json`, {
                method: "DELETE",
                headers: { "X-CSRF-Token": csrfToken },
            });
        }
    };
    return (jsxRuntimeExports.jsxs(Field, { children: [jsxRuntimeExports.jsx(Label$1, { children: label }), error && jsxRuntimeExports.jsx(Message, { validation: "error", children: error }), jsxRuntimeExports.jsxs(FileUpload, { ...getRootProps(), isDragging: isDragActive, children: [isDragActive ? (jsxRuntimeExports.jsx("span", { children: t("new-request-form.attachments.drop-files-label", "Drop files here") })) : (jsxRuntimeExports.jsx("span", { children: t("new-request-form.attachments.choose-file-label", "Choose a file or drag and drop here") })), jsxRuntimeExports.jsx(Input$1, { ...getInputProps() })] }), files.map((file) => (jsxRuntimeExports.jsx(FileListItem, { file: file, onRemove: () => {
                    handleRemove(file);
                } }, file.status === "pending" ? file.id : file.value.id))), files.map((file) => file.status === "uploaded" && (jsxRuntimeExports.jsx("input", { type: "hidden", name: name, value: JSON.stringify(file.value) }, file.value.id)))] }));
}

function useEndUserConditions(fields, endUserConditions) {
    return fields.reduce((accumulator, field) => {
        const conditions = endUserConditions.filter((condition) => condition.child_fields.some((childField) => childField.id === field.id));
        const metCondition = conditions.find((condition) => fields.find((field) => field.id === condition.parent_field_id)
            ?.value === condition.value);
        const childField = metCondition?.child_fields.find((childField) => childField.id === field.id);
        if (conditions.length === 0 || !!metCondition) {
            accumulator.push({
                ...field,
                required: childField ? childField.is_required : field.required,
            });
        }
        return accumulator;
    }, []);
}

function DatePicker({ field, locale, valueFormat, }) {
    const { label, error, value, name, required, description } = field;
    const [date, setDate] = reactExports.useState(value ? new Date(value) : undefined);
    const handleChange = (date) => {
        // Set the time to 12:00:00 as this is also the expected behavior across Support and the API
        setDate(new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0)));
    };
    const formatDate = (value) => {
        if (value === undefined) {
            return "";
        }
        const isoString = value.toISOString();
        return valueFormat === "dateTime" ? isoString : isoString.split("T")[0];
    };
    const handleInputChange = (e) => {
        // Allow field to be cleared
        if (e.target.value === "") {
            setDate(undefined);
        }
    };
    return (jsxRuntimeExports.jsxs(Field, { children: [jsxRuntimeExports.jsxs(Label$1, { children: [label, required && jsxRuntimeExports.jsx(Span, { "aria-hidden": "true", children: "*" })] }), description && jsxRuntimeExports.jsx(Hint, { children: description }), jsxRuntimeExports.jsx(Datepicker, { value: date, onChange: handleChange, locale: locale, children: jsxRuntimeExports.jsx(Input$1, { required: required, lang: locale, onChange: handleInputChange }) }), error && jsxRuntimeExports.jsx(Message, { validation: "error", children: error }), jsxRuntimeExports.jsx("input", { type: "hidden", name: name, value: formatDate(date) })] }));
}

function useTagsInputContainer({ tags, onTagsChange, inputValue, onInputValueChange, inputRef, gridRowRef, i18n, }) {
    const [selectedIndex, setSelectedIndex] = reactExports.useState(0);
    const [announcement, setAnnouncement] = reactExports.useState("");
    const gridOnChange = reactExports.useCallback((_, colIndex) => {
        setSelectedIndex(colIndex);
    }, [setSelectedIndex]);
    const { getGridProps, getGridCellProps } = useGrid({
        matrix: [tags],
        rowIndex: 0,
        colIndex: selectedIndex,
        onChange: gridOnChange,
    });
    const hasTag = (tag) => {
        return tags.includes(tag);
    };
    const addTag = (tag) => {
        onTagsChange([...tags, tag]);
        setAnnouncement(i18n.addedTag(tag));
    };
    const removeTagAt = (at) => {
        const tag = tags[at];
        onTagsChange(tags.filter((_, index) => index !== at));
        setAnnouncement(i18n.removedTag(tag));
        setSelectedIndex(0);
        /* Move focus to the first tag once a tag has been removed, after 100ms to let screen reader read the
           announcement first */
        setTimeout(() => {
            const selectedTag = gridRowRef.current?.querySelector(`[tabindex="0"]`);
            selectedTag?.focus();
        }, 100);
    };
    const handleContainerClick = (e) => {
        if (e.target === e.currentTarget) {
            inputRef.current?.focus();
        }
    };
    const handleContainerBlur = () => {
        setSelectedIndex(0);
    };
    const handleInputKeyDown = (e) => {
        const target = e.target;
        const tag = target.value;
        if (tag &&
            (e.code === "Space" ||
                e.code === "Enter" ||
                e.code === "Comma" ||
                e.code === "Tab")) {
            e.preventDefault();
            if (!hasTag(tag)) {
                addTag(tag);
            }
            onInputValueChange("");
        }
    };
    const handleInputChange = (e) => {
        const currentValue = e.target.value;
        /* On mobile browsers, the keyDown event doesn't provide the code
          of the pressed key: https://www.w3.org/TR/uievents/#determine-keydown-keyup-keyCode,
          so we need to check for spaces or commas on the change event to let the user
          adds a tag  */
        const [tag, separator] = [
            currentValue.slice(0, -1),
            currentValue.slice(-1),
        ];
        if (separator === " " || separator === ",") {
            if (tag.length > 0 && !hasTag(tag)) {
                addTag(tag);
            }
            onInputValueChange("");
        }
        else {
            onInputValueChange(currentValue);
        }
    };
    const handleInputPaste = (e) => {
        e.preventDefault();
        const data = e.clipboardData.getData("text");
        const values = new Set(data.split(/[\s,;]+/).filter((value) => !tags.includes(value)));
        onTagsChange([...tags, ...values]);
        setAnnouncement(i18n.addedTags([...values]));
    };
    const handleTagKeyDown = (index) => (e) => {
        if (e.code === "Backspace") {
            e.preventDefault();
            removeTagAt(index);
        }
    };
    const handleTagCloseClick = (index) => () => {
        removeTagAt(index);
    };
    const getContainerProps = () => ({
        onClick: handleContainerClick,
        onBlur: handleContainerBlur,
        tabIndex: -1,
    });
    const getGridRowProps = () => ({
        role: "row",
    });
    const getTagCloseProps = (index) => ({
        onClick: handleTagCloseClick(index),
    });
    const getInputProps = () => ({
        value: inputValue,
        onChange: handleInputChange,
        onKeyDown: handleInputKeyDown,
        onPaste: handleInputPaste,
    });
    const getAnnouncementProps = () => ({
        "aria-live": "polite",
        "aria-relevant": "text",
    });
    return {
        getContainerProps,
        getGridProps,
        getGridRowProps,
        getGridCellProps: (index) => getGridCellProps({
            rowIndex: 0,
            colIndex: index,
            onKeyDown: handleTagKeyDown(index),
        }),
        getTagCloseProps,
        getInputProps,
        announcement,
        getAnnouncementProps,
    };
}

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const Container$1 = styled(FauxInput) `
  padding: ${(props) => `${props.theme.space.xxs} ${props.theme.space.sm}`};

  // Removes white spaces for inline elements
  font-size: 0;

  // Same as height of Tag size="large" + base space (4px)
  // to give some vertical space between tags
  --line-height: ${(props) => props.theme.space.base * 8 + props.theme.space.base}px;
  line-height: var(--line-height);
`;
const GridCell = styled.span `
  display: inline-block;
  margin-right: ${(props) => props.theme.space.sm};
`;
const StyledTag = styled(Tag) `
  ${(props) => focusStyles({
    theme: props.theme,
    shadowWidth: "sm",
    selector: "&:focus",
})}
`;
const InputWrapper = styled.div `
  display: inline-block;
  position: relative;
`;
const InputMirror = styled(FauxInput) `
  display: inline-block;
  min-width: 200px;
  opacity: 0;
  user-select: none;
  height: var(--line-height);
  line-height: var(--line-height);
`;
const StyledInput = styled(Input$1) `
  position: absolute;
  top: 0;
  left: 0;
  height: var(--line-height);
  line-height: var(--line-height);

  // override CPH default style. Can be removed once global styles are removed
  &:focus {
    border: none !important;
  }
`;
const AnnouncementMessage = styled.span `
  ${hideVisually()}
`;
function CcField({ field }) {
    const { label, value, name, error, description } = field;
    const { t } = useTranslation();
    const initialValue = value
        ? value.split(",").map((email) => email.trim())
        : [];
    const [tags, setTags] = reactExports.useState(initialValue);
    const [inputValue, setInputValue] = reactExports.useState("");
    const inputRef = reactExports.useRef(null);
    const gridRowRef = reactExports.useRef(null);
    const { getContainerProps, getGridProps, getGridRowProps, getGridCellProps, getTagCloseProps, getInputProps, getAnnouncementProps, announcement, } = useTagsInputContainer({
        tags,
        onTagsChange: setTags,
        inputValue,
        onInputValueChange: setInputValue,
        inputRef,
        gridRowRef,
        i18n: {
            addedTag: (email) => t("new-request-form.cc-field.email-added", "{{email}} has been added", {
                email,
            }),
            removedTag: (email) => t("new-request-form.cc-field.email-removed", "{{email}} has been removed", { email }),
            addedTags: (emails) => t("new-request-form.cc-field.emails-added", "{{emails}} have been added", { emails }),
        },
    });
    const renderTag = (index, isValid, email) => (jsxRuntimeExports.jsxs(StyledTag, { size: "large", "aria-label": t("new-request-form.cc-field.email-label", "{{email}} - Press Backspace to remove", { email }), hue: isValid ? undefined : "red", children: [!isValid && (jsxRuntimeExports.jsx(Tag.Avatar, { children: jsxRuntimeExports.jsx(SvgAlertWarningStroke, {}) })), jsxRuntimeExports.jsx("span", { children: email }), jsxRuntimeExports.jsx(Tag.Close, { ...getTagCloseProps(index) })] }));
    return (jsxRuntimeExports.jsxs(Field, { children: [jsxRuntimeExports.jsx(Label$1, { children: label }), description && jsxRuntimeExports.jsx(Hint, { children: description }), jsxRuntimeExports.jsxs(Container$1, { ...getContainerProps(), children: [tags.length > 0 && (jsxRuntimeExports.jsx("span", { ...getGridProps({
                            "aria-label": t("new-request-form.cc-field.container-label", "Selected CC emails"),
                        }), children: jsxRuntimeExports.jsx("span", { ref: gridRowRef, ...getGridRowProps(), children: tags.map((email, index) => {
                                const isValid = EMAIL_REGEX.test(email);
                                return isValid ? (jsxRuntimeExports.jsx(GridCell, { ...getGridCellProps(index), children: renderTag(index, isValid, email) }, index)) : (jsxRuntimeExports.jsx(Tooltip, { content: t("new-request-form.cc-field.invalid-email", "Invalid email address"), children: jsxRuntimeExports.jsx(GridCell, { ...getGridCellProps(index), children: renderTag(index, isValid, email) }) }, index));
                            }) }) })), jsxRuntimeExports.jsxs(InputWrapper, { children: [jsxRuntimeExports.jsx(InputMirror, { isBare: true, "aria-hidden": "true", tabIndex: -1, children: inputValue }), jsxRuntimeExports.jsx(StyledInput, { ref: inputRef, isBare: true, ...getInputProps() })] })] }), error && jsxRuntimeExports.jsx(Message, { validation: "error", children: error }), tags.map((email) => (jsxRuntimeExports.jsx("input", { type: "hidden", name: name, value: email }, email))), jsxRuntimeExports.jsx(AnnouncementMessage, { ...getAnnouncementProps(), children: announcement })] }));
}

function CreditCard({ field, onChange }) {
    const { label, error, value, name, required, description } = field;
    const handleBlur = (e) => {
        onChange(redactCreditCard(e.target.value));
    };
    return (jsxRuntimeExports.jsxs(Field, { children: [jsxRuntimeExports.jsxs(Label$1, { children: [label, required && jsxRuntimeExports.jsx(Span, { "aria-hidden": "true", children: "*" })] }), description && jsxRuntimeExports.jsx(Hint, { children: description }), jsxRuntimeExports.jsx(Input$1, { name: name, type: "text", value: value, onChange: (e) => onChange(e.target.value), onBlur: handleBlur, validation: error ? "error" : undefined, required: required, autoComplete: "cc-number" }), error && jsxRuntimeExports.jsx(Message, { validation: "error", children: error })] }));
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
    return (jsxRuntimeExports.jsxs(Field$1, { children: [jsxRuntimeExports.jsxs(Label, { children: [label, required && jsxRuntimeExports.jsx(Span, { "aria-hidden": "true", children: "*" })] }), description && jsxRuntimeExports.jsx(Hint$1, { children: description }), jsxRuntimeExports.jsxs(Combobox, { ref: wrapperRef, inputProps: { required, name }, isEditable: false, validation: error ? "error" : undefined, onChange: handleChange, selectionValue: selectionValue, inputValue: selectionValue, renderValue: ({ selection }) => selection?.label ?? jsxRuntimeExports.jsx(EmptyValueOption, {}), isExpanded: isExpanded, children: [currentGroup.type === "SubGroup" && (jsxRuntimeExports.jsx(Option, { ...currentGroup.backOption })), currentGroup.type === "SubGroup" ? (jsxRuntimeExports.jsx(OptGroup, { "aria-label": currentGroup.name, children: currentGroup.options.map((option) => (jsxRuntimeExports.jsx(Option, { ...option, children: option.menuLabel ?? option.label }, option.value))) })) : (currentGroup.options.map((option) => option.value === "" ? (jsxRuntimeExports.jsx(Option, { ...option, children: jsxRuntimeExports.jsx(EmptyValueOption, {}) }, option.value)) : (jsxRuntimeExports.jsx(Option, { ...option }, option.value))))] }), error && jsxRuntimeExports.jsx(Message$1, { validation: "error", children: error })] }));
}

function useDebounce(value, delayMs) {
    const [debouncedValue, setDebouncedValue] = reactExports.useState(value);
    reactExports.useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delayMs);
        return () => {
            clearTimeout(timer);
        };
    }, [value, delayMs]);
    return debouncedValue;
}

const slideIn = $e `
  from {
    grid-template-rows: 0fr;
  }
  to {
    grid-template-rows: 1fr;
  }
`;
const Container = styled.div `
  display: grid;
  animation: ${slideIn} 200ms forwards;
`;
const InnerContainer = styled.div `
  overflow: hidden;
`;
const UnstyledList = styled.ul `
  list-style: none;
  padding: 0;
  margin: 0;
`;
const ListItem = styled.li `
  margin: ${(props) => props.theme.space.sm} 0;
`;
function hasMinLength(value) {
    const firstLetter = value.charCodeAt(0);
    /*
     * Special case considering CJK characters. Since ideographs represent
     * whole words, we want to start searching when just two has been typed.
     *
     * Unicode range reference:
     * http://www.unicode.org/versions/Unicode5.0.0/ch12.pdf#G16616
     */
    if (firstLetter >= 0x4e00 && firstLetter <= 0x2fa1f) {
        return value.length >= 2;
    }
    else {
        return value.length >= 3;
    }
}
function SuggestedArticles({ query: inputQuery, locale, }) {
    const debouncedQuery = useDebounce(inputQuery, 500);
    const [articles, setArticles] = reactExports.useState([]);
    const requestsCache = reactExports.useRef({});
    const { t } = useTranslation();
    reactExports.useEffect(() => {
        const query = debouncedQuery?.trim().toLocaleLowerCase();
        if (!query || !hasMinLength(query)) {
            setArticles([]);
            return;
        }
        const requestUrl = new URL(`${window.location.origin}/api/v2/help_center/deflection/suggestions.json`);
        requestUrl.searchParams.append("locale", locale);
        requestUrl.searchParams.append("query", query);
        const cachedResponse = requestsCache.current[requestUrl.toString()];
        if (cachedResponse) {
            setArticles(cachedResponse);
            return;
        }
        fetch(requestUrl)
            .then((response) => response.json())
            .then(({ results }) => {
            requestsCache.current[requestUrl.toString()] = results;
            setArticles(results);
        });
    }, [debouncedQuery, locale]);
    return articles.length > 0 ? (jsxRuntimeExports.jsx(Container, { children: jsxRuntimeExports.jsxs(InnerContainer, { children: [jsxRuntimeExports.jsx("h2", { children: t("new-request-form.suggested-articles", "Suggested articles") }), jsxRuntimeExports.jsx(UnstyledList, { children: articles.map((article) => (jsxRuntimeExports.jsx(ListItem, { children: jsxRuntimeExports.jsx(Anchor, { href: article.html_url, children: article.name }) }, article.html_url))) })] }) })) : null;
}

const H2 = styled.h2 `
  font-size: ${(props) => props.theme.fontSizes.lg};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  margin-bottom: 0;
`;
const H3 = styled.h3 `
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;
const StyledHeader = styled(Header$1) `
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space.sm};
`;
const ArticleLink = styled(Anchor) `
  display: inline-block;
  margin-top: ${(props) => props.theme.space.sm};
`;
const StyledFooter = styled(Footer$2) `
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${(props) => props.theme.space.xl};
`;
const ButtonsContainer = styled.div `
  display: flex;
  gap: ${(props) => props.theme.space.sm};
`;
/**
 * We are doing an old-school form submission here,
 * so the server can redirect the user to the proper page and
 * show a notification
 */
async function submitForm(action, data) {
    const token = await fetchCsrfToken$1();
    const allData = { ...data, authenticity_token: token };
    const form = document.createElement("form");
    form.method = "post";
    form.action = action;
    for (const [name, value] of Object.entries(allData)) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = value;
        form.appendChild(input);
    }
    document.body.appendChild(form);
    form.submit();
}
function AnswerBotModal({ token, articles, requestId, }) {
    const [expandedIndex, setExpandedIndex] = reactExports.useState(0);
    const [alertMessage, setAlertMessage] = reactExports.useState("");
    const modalContainer = useModalContainer();
    const { t } = useTranslation();
    /* To let screen readers read the notification on page load,
       we need to add the Alert message after the page has been
       loaded */
    reactExports.useEffect(() => {
        setTimeout(() => {
            setAlertMessage(t("new-request-form.answer-bot-modal.request-submitted", "Your request was successfully submitted"));
        }, 100);
    }, [t]);
    const getExpandedArticleId = () => {
        return String(articles[expandedIndex]?.article_id);
    };
    const solveRequest = () => {
        submitForm("/hc/answer_bot/solve", {
            article_id: getExpandedArticleId(),
            token,
        });
    };
    const markArticleAsIrrelevant = () => {
        submitForm("/hc/answer_bot/irrelevant", {
            article_id: getExpandedArticleId(),
            token,
        });
    };
    const ignoreAnswerBot = () => {
        submitForm("/hc/answer_bot/ignore", {
            token,
        });
    };
    return (jsxRuntimeExports.jsxs(Modal, { appendToNode: modalContainer, onClose: () => {
            ignoreAnswerBot();
        }, children: [jsxRuntimeExports.jsxs(StyledHeader, { children: [jsxRuntimeExports.jsx(Alert, { type: "success", children: alertMessage }), jsxRuntimeExports.jsx(H2, { children: t("new-request-form.answer-bot-modal.title", "While you wait, do any of these articles answer your question?") })] }), jsxRuntimeExports.jsx(Body$2, { children: jsxRuntimeExports.jsx(Accordion, { level: 3, expandedSections: [expandedIndex], onChange: (index) => {
                        setExpandedIndex(index);
                    }, children: articles.map(({ article_id, html_url, snippet, title }, index) => (jsxRuntimeExports.jsxs(Accordion.Section, { children: [jsxRuntimeExports.jsx(Accordion.Header, { children: jsxRuntimeExports.jsx(Accordion.Label, { children: title }) }), jsxRuntimeExports.jsxs(Accordion.Panel, { children: [jsxRuntimeExports.jsx(Paragraph, { dangerouslySetInnerHTML: { __html: snippet } }), jsxRuntimeExports.jsx(ArticleLink, { tabIndex: expandedIndex === index ? 0 : -1, isExternal: true, href: `${html_url}?auth_token=${token}`, target: "_blank", children: t("new-request-form.answer-bot-modal.view-article", "View article") })] })] }, article_id))) }) }), jsxRuntimeExports.jsxs(StyledFooter, { children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx(H3, { children: t("new-request-form.answer-bot-modal.footer-title", "Does this article answer your question?") }), jsxRuntimeExports.jsx("div", { children: t("new-request-form.answer-bot-modal.footer-content", "If it does, we can close your recent request {{requestId}}", {
                                    requestId: `\u202D#${requestId}\u202C`,
                                }) })] }), jsxRuntimeExports.jsxs(ButtonsContainer, { children: [jsxRuntimeExports.jsx(Button, { onClick: () => {
                                    markArticleAsIrrelevant();
                                }, children: t("new-request-form.answer-bot-modal.mark-irrelevant", "No, I need help") }), jsxRuntimeExports.jsx(Button, { isPrimary: true, onClick: () => {
                                    solveRequest();
                                }, children: t("new-request-form.answer-bot-modal.solve-request", "Yes, close my request") })] })] }), jsxRuntimeExports.jsx(Close$2, { "aria-label": t("new-request-form.close-label", "Close") })] }));
}

const StyledParagraph = styled(Paragraph) `
  margin: ${(props) => props.theme.space.md} 0;
`;
const Form = styled.form `
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space.md};
`;
const Footer = styled.div `
  margin-top: ${(props) => props.theme.space.md};
`;
function NewRequestForm({ requestForm, wysiwyg, answerBot, parentId, parentIdPath, locale, baseLocale, }) {
    const { ticket_fields, action, http_method, accept_charset, errors, parent_id_field, ticket_form_field, email_field, cc_field, organization_field, due_date_field, end_user_conditions, attachments_field, inline_attachments_fields, description_mimetype_field, } = requestForm;
    const prefilledTicketFields = usePrefilledTicketFields(ticket_fields);
    const [ticketFields, setTicketFields] = reactExports.useState(prefilledTicketFields);
    const visibleFields = useEndUserConditions(ticketFields, end_user_conditions);
    const { formRefCallback, handleSubmit } = useFormSubmit(ticketFields);
    const { t } = useTranslation();
    function handleChange(field, value) {
        setTicketFields(ticketFields.map((ticketField) => ticketField.name === field.name
            ? { ...ticketField, value }
            : ticketField));
    }
    return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [parentId && (jsxRuntimeExports.jsx(StyledParagraph, { children: jsxRuntimeExports.jsx(Anchor, { href: parentIdPath, children: t("new-request-form.parent-request-link", "Follow-up to request {{parentId}}", {
                        parentId: `\u202D#${parentId}\u202C`,
                    }) }) })), jsxRuntimeExports.jsx(StyledParagraph, { "aria-hidden": "true", children: t("new-request-form.required-fields-info", "Fields marked with an asterisk (*) are required.") }), jsxRuntimeExports.jsxs(Form, { ref: formRefCallback, action: action, method: http_method, acceptCharset: accept_charset, noValidate: true, onSubmit: handleSubmit, children: [errors && jsxRuntimeExports.jsx(Alert, { type: "error", children: errors }), parentId && jsxRuntimeExports.jsx(ParentTicketField, { field: parent_id_field }), ticket_form_field.options.length > 0 && (jsxRuntimeExports.jsx(TicketFormField, { field: ticket_form_field })), email_field && (jsxRuntimeExports.jsx(Input, { field: email_field, onChange: (value) => handleChange(email_field, value) }, email_field.name)), cc_field && jsxRuntimeExports.jsx(CcField, { field: cc_field }), organization_field && (jsxRuntimeExports.jsx(DropDown, { field: organization_field, onChange: (value) => handleChange(organization_field, value) }, organization_field.name)), visibleFields.map((field) => {
                        switch (field.type) {
                            case "subject":
                                return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(Input, { field: field, onChange: (value) => handleChange(field, value) }, field.name), jsxRuntimeExports.jsx(SuggestedArticles, { query: field.value, locale: locale })] }));
                            case "text":
                            case "integer":
                            case "decimal":
                            case "regexp":
                                return (jsxRuntimeExports.jsx(Input, { field: field, onChange: (value) => handleChange(field, value) }, field.name));
                            case "partialcreditcard":
                                return (jsxRuntimeExports.jsx(CreditCard, { field: field, onChange: (value) => handleChange(field, value) }));
                            case "description":
                                return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(TextArea, { field: field, hasWysiwyg: wysiwyg, onChange: (value) => handleChange(field, value) }, field.name), jsxRuntimeExports.jsx("input", { type: "hidden", name: description_mimetype_field.name, value: wysiwyg ? "text/html" : "text/plain" })] }));
                            case "textarea":
                                return (jsxRuntimeExports.jsx(TextArea, { field: field, hasWysiwyg: false, onChange: (value) => handleChange(field, value) }, field.name));
                            case "priority":
                            case "tickettype":
                                return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(DropDown, { field: field, onChange: (value) => handleChange(field, value) }, field.name), field.value === "task" && (jsxRuntimeExports.jsx(DatePicker, { field: due_date_field, locale: baseLocale, valueFormat: "dateTime" }))] }));
                            case "checkbox":
                                return (jsxRuntimeExports.jsx(Checkbox, { field: field, onChange: (value) => handleChange(field, value) }));
                            case "date":
                                return (jsxRuntimeExports.jsx(DatePicker, { field: field, locale: baseLocale, valueFormat: "date" }));
                            case "multiselect":
                                return jsxRuntimeExports.jsx(MultiSelect, { field: field });
                            case "tagger":
                                return (jsxRuntimeExports.jsx(Tagger, { field: field, onChange: (value) => handleChange(field, value) }, field.name));
                            default:
                                return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {});
                        }
                    }), attachments_field && jsxRuntimeExports.jsx(Attachments, { field: attachments_field }), inline_attachments_fields.map(({ type, name, value }, index) => (jsxRuntimeExports.jsx("input", { type: type, name: name, value: value }, index))), jsxRuntimeExports.jsx(Footer, { children: (ticket_form_field.options.length === 0 ||
                            ticket_form_field.value) && (jsxRuntimeExports.jsx(Button, { isPrimary: true, type: "submit", children: t("new-request-form.submit", "Submit") })) })] }), answerBot.token &&
                answerBot.articles.length > 0 &&
                answerBot.request_id && (jsxRuntimeExports.jsx(AnswerBotModal, { token: answerBot.token, articles: answerBot.articles, requestId: answerBot.request_id }))] }));
}

var baseUrl = "https://static.zdassets.com/translations";
var files = {
	af: "/new-request-form/af.3148abfe385c6550fbc5e4e8c626d30d.json",
	ar: "/new-request-form/ar.23e8e2a08d0be895566eec401ab2f379.json",
	"ar-x-pseudo": "/new-request-form/ar-x-pseudo.5d492e20a22d4fd276b15d312d351c3e.json",
	az: "/new-request-form/az.6ba2181919b89aa505aa52936bf2daca.json",
	be: "/new-request-form/be.f52d8dee1fcfe6c8fde3c6be8ef81c7d.json",
	bg: "/new-request-form/bg.e4b6473086af3e20fae1a2881cdda384.json",
	bn: "/new-request-form/bn.cf5044201104d8c424975163f9ab0e19.json",
	bs: "/new-request-form/bs.52b894414d7efd15af36b9e3f3ae9273.json",
	ca: "/new-request-form/ca.f2b6f9e25d8a0bca4981b73eabb87208.json",
	cs: "/new-request-form/cs.c4cc570786eef8492d0be4bc807dced3.json",
	cy: "/new-request-form/cy.23914f726d70fddcff7ba18afa2b6bf4.json",
	da: "/new-request-form/da.8d3a1fa5b85b8655124b1ba25058e25c.json",
	de: "/new-request-form/de.6b0e747003255159eeac6d7cada0138f.json",
	"de-x-informal": "/new-request-form/de-x-informal.cc96db0b08bd0f8c8f45ceae220cb188.json",
	el: "/new-request-form/el.3d44e3c2d4bbbe10fcfdb5c2bdc85c48.json",
	"en-001": "/new-request-form/en-001.f2252b68d9c4579a765ba85a5eb03a36.json",
	"en-150": "/new-request-form/en-150.4c6c23c83be6d30223a5eed2c9e6c81f.json",
	"en-us": "/new-request-form/en-US.415457a48563b8c11fdb71f5063f7a6e.json",
	"en-au": "/new-request-form/en-au.d2cfe8891b8a90a8085e98c279de7c5b.json",
	"en-ca": "/new-request-form/en-ca.eafe0918915e55c87347f46dae3ec640.json",
	"en-gb": "/new-request-form/en-gb.b176884668b4df0ea20bd78fa1d24bd4.json",
	"en-my": "/new-request-form/en-my.0905b7e041f7f2acf1d518fe3bf030f8.json",
	"en-ph": "/new-request-form/en-ph.06d5bd15f14ad07232a5f663cb5ee9e2.json",
	"en-se": "/new-request-form/en-se.ab88f1a29a6b041b9fe727834da2065f.json",
	"en-x-dev": "/new-request-form/en-x-dev.705cae101b8bcb462565fd85e3d393c4.json",
	"en-x-keys": "/new-request-form/en-x-keys.e95b7337e34a81473954b23932befeb7.json",
	"en-x-obsolete": "/new-request-form/en-x-obsolete.bfb9807604f26ac8d3cf5f2bacc6418f.json",
	"en-x-pseudo": "/new-request-form/en-x-pseudo.f9a7973f8d0ab7ad4625f88393a8047d.json",
	"en-x-test": "/new-request-form/en-x-test.43bdc5858da518be62617889d96cc0f0.json",
	es: "/new-request-form/es.31558a09732344ea76cfb83585798499.json",
	"es-419": "/new-request-form/es-419.d6491e7e2af25500c0fcbf0b29f8bf3b.json",
	"es-es": "/new-request-form/es-es.8c84ca2f8a4729903c92d86f86524ef9.json",
	et: "/new-request-form/et.590e1e1a6cf333a323e34e06eb8dbae0.json",
	eu: "/new-request-form/eu.abf7fadaff02f1230f548476e71686e3.json",
	fa: "/new-request-form/fa.a425b3bac48112efea3e6a7c77186d08.json",
	"fa-af": "/new-request-form/fa-AF.06fef8d6a27a91ddda2aebfdc696b781.json",
	fi: "/new-request-form/fi.5631a0f712dfbb515a37e93a429acc51.json",
	fil: "/new-request-form/fil.3241831dd85e50a2e0c95d782aee01cd.json",
	fo: "/new-request-form/fo.e739a1936af13785e46f5bf84073a9f8.json",
	fr: "/new-request-form/fr.c9d60dbedf317a770c8b25b36c77421b.json",
	"fr-ca": "/new-request-form/fr-ca.fecef3d75423eb04f4c40fc89eaae97d.json",
	ga: "/new-request-form/ga.fbd7004c9779b1c33855d1c61d4ad864.json",
	he: "/new-request-form/he.8532664f57eeea74bddd6eb5dd076332.json",
	hi: "/new-request-form/hi.97c5dce0a9dbefcb6e0187eb74b27620.json",
	hr: "/new-request-form/hr.545b2e9f593208bffd5467dff9b276fe.json",
	hu: "/new-request-form/hu.f61192a81aa3c679537e4cfbf9bd1645.json",
	hy: "/new-request-form/hy.9a1848a3a5b622e786923181bfd188c7.json",
	id: "/new-request-form/id.5b82e67a78628073578933a44edee9a6.json",
	is: "/new-request-form/is.80917afd44d0997538e4d0fdf62ee440.json",
	it: "/new-request-form/it.c72343f4aaf22aaf2786a9329235adce.json",
	"it-ch": "/new-request-form/it-ch.7fbe9eac9a79b9320a3110560cc7fe2c.json",
	ja: "/new-request-form/ja.d7db3d910ad1e5f6d3284e955afa98aa.json",
	ka: "/new-request-form/ka.8315995a7fa99a83f4de8b49f4879a1f.json",
	kk: "/new-request-form/kk.66ad98a0a1700997a69d341e62043c87.json",
	"kl-dk": "/new-request-form/kl-dk.50bc978e62a681721793753310125f18.json",
	ko: "/new-request-form/ko.1fed79fc73a7052da775f25b49ac2d8d.json",
	ku: "/new-request-form/ku.0d36901056e1f0b24339b1d7803a0557.json",
	lt: "/new-request-form/lt.185d27f6e0c0bbf21812f12f7e074d42.json",
	lv: "/new-request-form/lv.e969ec351590b7440010a82f8834c557.json",
	mk: "/new-request-form/mk.0ac754ab59fa3f2649c44d7911bf7bf4.json",
	mn: "/new-request-form/mn.f8b7fb07773488b5102276496412bd9d.json",
	ms: "/new-request-form/ms.571a77abd36828e2b6cc4d43b0eb28db.json",
	mt: "/new-request-form/mt.abb7ae7b6cec313832849693ed82d3db.json",
	my: "/new-request-form/my.aed66814bd2383b44a437d59cc19153c.json",
	nl: "/new-request-form/nl.cc0bbc80aabadc852675bea0f82aa62b.json",
	"nl-be": "/new-request-form/nl-be.0d2354bb7c3964fdb4b9f5bfd3ceface.json",
	no: "/new-request-form/no.91afa7c5d2e7bae972b21dcdabc9ca45.json",
	pl: "/new-request-form/pl.3bd338ed31b8d28e1b4101821ad4dbdf.json",
	pt: "/new-request-form/pt.a926fecceb1e41e90b2bafb2ad80eb72.json",
	"pt-br": "/new-request-form/pt-br.6ebbe498973a81139416b9210db3e742.json",
	ro: "/new-request-form/ro.79c228da5fd5bac9d6cb08b0b00560d2.json",
	ru: "/new-request-form/ru.227061eb7967ba628bb5bfa2118a56b0.json",
	sk: "/new-request-form/sk.83eee50bee7b450069507aac5d977834.json",
	sl: "/new-request-form/sl.d669d7b3968d8ad0d62c2325cb067818.json",
	sq: "/new-request-form/sq.cbfa31ae14760624dee3e6d2beb0fed3.json",
	sr: "/new-request-form/sr.0f09772dcb20343e59e1d617d1bd1a9a.json",
	"sr-me": "/new-request-form/sr-me.f32d3c397a253b544721251b28c276ad.json",
	sv: "/new-request-form/sv.4a472010565d0ce5de8e38932f7163fb.json",
	th: "/new-request-form/th.9c6738b82bc1acaf396091c7d3a94df2.json",
	tr: "/new-request-form/tr.37cba3919b296a975722bdc44d9269d7.json",
	uk: "/new-request-form/uk.d0d5a0bee8c18990791f3510c02cd6fe.json",
	ur: "/new-request-form/ur.76a3dca2953c592e0991fe84d1b73727.json",
	uz: "/new-request-form/uz.491203ac69077976ae3526402137efa7.json",
	vi: "/new-request-form/vi.1c6700912b722e40f649e8b628f15035.json",
	"zh-cn": "/new-request-form/zh-cn.6d026145eb39ddab4eab08be5ad1ffd1.json",
	"zh-tw": "/new-request-form/zh-tw.b39cc46bd8cac89de18cc183f7e9c5a1.json"
};
var translationsManifest = {
	baseUrl: baseUrl,
	files: files
};

async function loadTranslations(locale, manifest) {
    try {
        const BASE_URL = manifest.baseUrl;
        const fileUrl = manifest.files[locale];
        if (fileUrl === undefined) {
            return {};
        }
        const content = await (await fetch(`${BASE_URL}${fileUrl}`)).json();
        return content.translations;
    }
    catch (e) {
        console.error("Error fetching translations", e);
        return {};
    }
}
/**
 * This function adds the translations published on the Zendesk CDN to i18next,
 * taking the base locale and a manifest as input.
 *
 * If you want to load your own translations you can use a different setup following the i18next
 * documentation.
 *
 * @param locale The base locale
 * @param manifest A manifest object containing the translations file URL for each base locale.
 */
async function addZendeskTranslations(locale, manifest) {
    const translations = await loadTranslations(locale, manifest);
    instance.addResourceBundle(locale, "translation", translations);
}

function initI18next(locale) {
    instance.use(initReactI18next).init({
        resources: {
            [`${locale}`]: {},
        },
        lng: locale,
        lowerCaseLng: true,
        interpolation: {
            escapeValue: false,
        },
        keySeparator: false,
        pluralSeparator: ".",
    });
}

async function renderNewRequestForm(settings, props, container) {
    const { baseLocale } = props;
    initI18next(baseLocale);
    await addZendeskTranslations(baseLocale, translationsManifest);
    reactDomExports.render(jsxRuntimeExports.jsx(ThemeProviders, { theme: createTheme(settings), children: jsxRuntimeExports.jsx(NewRequestForm, { ...props }) }), container);
}

export { renderNewRequestForm };
