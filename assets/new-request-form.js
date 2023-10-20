import { j as jsxRuntimeExports, F as Field, L as Label$1, S as Span, H as Hint, I as Input$1, M as Message, r as reactExports, T as Textarea, s as styled, h as hideVisually, a as Field$1, b as Label, c as Hint$1, C as Combobox, O as Option, d as Message$1, e as Checkbox$1, f as OptGroup, p as purify, g as FileList, i as File, k as Tooltip, P as Progress, A as Anchor, u as useToast, N as Notification, l as Title, m as Close, n as useDropzone, o as FileUpload, $ as $e, q as Header$1, t as Footer$2, v as Modal, w as Alert, B as Body$2, x as Accordion, y as Paragraph, z as Button, D as Close$2, E as reactDomExports } from 'vendor';
import { u as useModalContainer, T as ThemeProviders } from 'useModalContainer';

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

const HideVisually$1 = styled.span `
  ${hideVisually()}
`;
const EmptyValue$1 = () => (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(Span, { "aria-hidden": "true", children: "-" }), jsxRuntimeExports.jsx(HideVisually$1, { children: "Choose an option" })] }));
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
    return (jsxRuntimeExports.jsxs(Field$1, { children: [jsxRuntimeExports.jsxs(Label, { children: [label, required && jsxRuntimeExports.jsx(Span, { "aria-hidden": "true", children: "*" })] }), description && jsxRuntimeExports.jsx(Hint$1, { children: description }), jsxRuntimeExports.jsxs(Combobox, { ref: wrapperRef, inputProps: { name, required }, isEditable: false, validation: error ? "error" : undefined, inputValue: selectionValue, selectionValue: selectionValue, renderValue: ({ selection }) => selection?.label || jsxRuntimeExports.jsx(EmptyValue$1, {}), onChange: ({ selectionValue }) => {
                    if (selectionValue !== undefined) {
                        onChange(selectionValue);
                    }
                }, children: [!required && (jsxRuntimeExports.jsx(Option, { value: "", label: "-", children: jsxRuntimeExports.jsx(EmptyValue$1, {}) })), options.map((option) => (jsxRuntimeExports.jsx(Option, { value: option.value.toString(), label: option.name }, option.value)))] }), error && jsxRuntimeExports.jsx(Message$1, { validation: "error", children: error })] }));
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

function TicketFormField({ label, ticketFormField, ticketForms, }) {
    const handleChange = ({ selectionValue }) => {
        if (selectionValue && typeof selectionValue === "string") {
            const newUrl = new URL(window.location.origin + selectionValue);
            const currentSearchParams = new URLSearchParams(window.location.search);
            currentSearchParams.delete("ticket_form_id");
            for (const [key, value] of currentSearchParams) {
                newUrl.searchParams.append(key, value);
            }
            window.location.href = newUrl.toString();
        }
    };
    return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx("input", { type: "hidden", name: ticketFormField.name, value: ticketFormField.value }), ticketForms.length > 1 && (jsxRuntimeExports.jsxs(Field$1, { children: [jsxRuntimeExports.jsx(Label, { children: label }), jsxRuntimeExports.jsx(Combobox, { isEditable: false, onChange: handleChange, children: ticketForms.map(({ id, url, display_name }) => (jsxRuntimeExports.jsx(Option, { value: url, label: display_name, isSelected: ticketFormField.value === id, children: display_name }, id))) })] }))] }));
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
    const response = await fetch("/hc/api/internal/csrf_token.json");
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
                field.value = JSON.stringify(sanitizedValue.split(","));
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
    return (jsxRuntimeExports.jsx(FileList.Item, { children: jsxRuntimeExports.jsx(File, { type: "generic", title: fileName, onKeyDown: handleFileKeyDown, children: file.status === "pending" ? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(FileNameWrapper, { children: fileName }), jsxRuntimeExports.jsx(Tooltip, { content: "Stop upload", children: jsxRuntimeExports.jsx(File.Close, { "aria-label": "Stop upload", onClick: () => {
                                onRemove();
                            }, onKeyDown: handleCloseKeyDown }) }), jsxRuntimeExports.jsx(Progress, { value: file.progress, "aria-label": `Uploading ${fileName}` })] })) : (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(FileNameWrapper, { children: jsxRuntimeExports.jsx(Anchor, { isExternal: true, href: file.value.url, target: "_blank", children: fileName }) }), jsxRuntimeExports.jsx(Tooltip, { content: "Remove file", children: jsxRuntimeExports.jsx(File.Delete, { "aria-label": "Remove file", onClick: () => {
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
    const notifyError = reactExports.useCallback((fileName) => {
        addToast(({ close }) => (jsxRuntimeExports.jsxs(Notification, { type: "error", children: [jsxRuntimeExports.jsx(Title, { children: "Upload error" }), "There was an error uploading ", fileName, ". Please try again or upload another file.", jsxRuntimeExports.jsx(Close, { "aria-label": "Close", onClick: close })] })));
    }, [addToast]);
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
    return (jsxRuntimeExports.jsxs(Field, { children: [jsxRuntimeExports.jsx(Label$1, { children: label }), error && jsxRuntimeExports.jsx(Message, { validation: "error", children: error }), jsxRuntimeExports.jsxs(FileUpload, { ...getRootProps(), isDragging: isDragActive, children: [isDragActive ? (jsxRuntimeExports.jsx("span", { children: "Drop files here" })) : (jsxRuntimeExports.jsx("span", { children: "Choose a file or drag and drop here" })), jsxRuntimeExports.jsx(Input$1, { ...getInputProps() })] }), files.map((file) => (jsxRuntimeExports.jsx(FileListItem, { file: file, onRemove: () => {
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
                required: !!childField?.is_required,
            });
        }
        return accumulator;
    }, []);
}

function CreditCard({ field, onChange }) {
    const { label, error, value, name, required, description } = field;
    const handleBlur = (e) => {
        onChange(redactCreditCard(e.target.value));
    };
    return (jsxRuntimeExports.jsxs(Field, { children: [jsxRuntimeExports.jsxs(Label$1, { children: [label, required && jsxRuntimeExports.jsx(Span, { "aria-hidden": "true", children: "*" })] }), description && jsxRuntimeExports.jsx(Hint, { children: description }), jsxRuntimeExports.jsx(Input$1, { name: name, type: "text", value: value, onChange: (e) => onChange(e.target.value), onBlur: handleBlur, validation: error ? "error" : undefined, required: required, autoComplete: "cc-number" }), error && jsxRuntimeExports.jsx(Message, { validation: "error", children: error })] }));
}

const HideVisually = styled.span `
  ${hideVisually()}
`;
const EmptyValue = () => (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(Span, { "aria-hidden": "true", children: "-" }), jsxRuntimeExports.jsx(HideVisually, { children: "Choose an option" })] }));
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
    return (jsxRuntimeExports.jsxs(Field$1, { children: [jsxRuntimeExports.jsxs(Label, { children: [label, required && jsxRuntimeExports.jsx(Span, { "aria-hidden": "true", children: "*" })] }), description && jsxRuntimeExports.jsx(Hint$1, { children: description }), jsxRuntimeExports.jsxs(Combobox, { ref: wrapperRef, inputProps: { required, name }, isEditable: false, validation: error ? "error" : undefined, onChange: handleChange, selectionValue: selectionValue, inputValue: selectionValue, renderValue: ({ selection }) => selection?.label ?? jsxRuntimeExports.jsx(EmptyValue, {}), isExpanded: isExpanded, children: [currentGroup.type === "SubGroup" && (jsxRuntimeExports.jsx(Option, { ...currentGroup.backOption })), currentGroup.type === "SubGroup" ? (jsxRuntimeExports.jsx(OptGroup, { "aria-label": currentGroup.name, children: currentGroup.options.map((option) => (jsxRuntimeExports.jsx(Option, { ...option, children: option.menuLabel ?? option.label }, option.value))) })) : (currentGroup.options.map((option) => option.value === "" ? (jsxRuntimeExports.jsx(Option, { ...option, children: jsxRuntimeExports.jsx(EmptyValue, {}) }, option.value)) : (jsxRuntimeExports.jsx(Option, { ...option }, option.value))))] }), error && jsxRuntimeExports.jsx(Message$1, { validation: "error", children: error })] }));
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
    reactExports.useEffect(() => {
        const query = debouncedQuery?.trim().toLocaleLowerCase();
        if (!query || !hasMinLength(query)) {
            setArticles([]);
            return;
        }
        const requestUrl = new URL(`${window.location.origin}/hc/api/internal/deflection/suggestions.json`);
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
    return articles.length > 0 ? (jsxRuntimeExports.jsx(Container, { children: jsxRuntimeExports.jsxs(InnerContainer, { children: [jsxRuntimeExports.jsx("h2", { children: "Suggested Articles" }), jsxRuntimeExports.jsx(UnstyledList, { children: articles.map((article) => (jsxRuntimeExports.jsx(ListItem, { children: jsxRuntimeExports.jsx(Anchor, { href: article.html_url, children: article.name }) }, article.html_url))) })] }) })) : null;
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
    /* To let screen readers read the notification on page load,
       we need to add the Alert message after the page has been
       loaded */
    reactExports.useEffect(() => {
        setTimeout(() => {
            setAlertMessage("Your request was successfully submitted.");
        }, 100);
    }, []);
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
        }, children: [jsxRuntimeExports.jsxs(StyledHeader, { children: [jsxRuntimeExports.jsx(Alert, { type: "success", children: alertMessage }), jsxRuntimeExports.jsx(H2, { children: "While you wait, do any of these articles answer your question?" })] }), jsxRuntimeExports.jsx(Body$2, { children: jsxRuntimeExports.jsx(Accordion, { level: 3, expandedSections: [expandedIndex], onChange: (index) => {
                        setExpandedIndex(index);
                    }, children: articles.map(({ article_id, html_url, snippet, title }, index) => (jsxRuntimeExports.jsxs(Accordion.Section, { children: [jsxRuntimeExports.jsx(Accordion.Header, { children: jsxRuntimeExports.jsx(Accordion.Label, { children: title }) }), jsxRuntimeExports.jsxs(Accordion.Panel, { children: [jsxRuntimeExports.jsx(Paragraph, { dangerouslySetInnerHTML: { __html: snippet } }), jsxRuntimeExports.jsx(ArticleLink, { tabIndex: expandedIndex === index ? 0 : -1, isExternal: true, href: `${html_url}?auth_token=${token}`, target: "_blank", children: "View article" })] })] }, article_id))) }) }), jsxRuntimeExports.jsxs(StyledFooter, { children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx(H3, { children: "Does this article answer your question?" }), jsxRuntimeExports.jsxs("div", { children: ["If it does, we can close your recent request #", requestId] })] }), jsxRuntimeExports.jsxs(ButtonsContainer, { children: [jsxRuntimeExports.jsx(Button, { onClick: () => {
                                    markArticleAsIrrelevant();
                                }, children: "No, I need help" }), jsxRuntimeExports.jsx(Button, { isPrimary: true, onClick: () => {
                                    solveRequest();
                                }, children: "Yes, close my request" })] })] }), jsxRuntimeExports.jsx(Close$2, { "aria-label": "Close modal" })] }));
}

const Form = styled.form `
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space.md};
`;
const Footer = styled.div `
  margin-top: ${(props) => props.theme.space.md};
`;
const DatePicker = reactExports.lazy(() => import('DatePicker'));
const CcField = reactExports.lazy(() => import('CcField'));
function NewRequestForm({ ticketForms, requestForm, wysiwyg, answerBot, parentId, locale, }) {
    const { fields, action, http_method, accept_charset, errors, ticket_form_field, ticket_forms_instructions, parent_id_field, end_user_conditions, attachments_field, inline_attachments_fields, description_mimetype_field, } = requestForm;
    const prefilledTicketFields = usePrefilledTicketFields(fields);
    const [ticketFields, setTicketFields] = reactExports.useState(prefilledTicketFields);
    const visibleFields = useEndUserConditions(ticketFields, end_user_conditions);
    const { formRefCallback, handleSubmit } = useFormSubmit(ticketFields);
    function handleChange(field, value) {
        setTicketFields(ticketFields.map((ticketField) => ticketField.name === field.name
            ? { ...ticketField, value }
            : ticketField));
    }
    return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsxs(Form, { ref: formRefCallback, action: action, method: http_method, acceptCharset: accept_charset, noValidate: true, onSubmit: handleSubmit, children: [errors && jsxRuntimeExports.jsx(Alert, { type: "error", children: errors }), parentId && jsxRuntimeExports.jsx(ParentTicketField, { field: parent_id_field }), ticketForms.length > 0 && (jsxRuntimeExports.jsx(TicketFormField, { label: ticket_forms_instructions, ticketFormField: ticket_form_field, ticketForms: ticketForms })), visibleFields.map((field) => {
                        switch (field.type) {
                            case "subject":
                                return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(Input, { field: field, onChange: (value) => handleChange(field, value) }, field.name), jsxRuntimeExports.jsx(SuggestedArticles, { query: field.value, locale: locale })] }));
                            case "anonymous_requester_email":
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
                            case "organization_id":
                            case "priority":
                            case "tickettype":
                                return (jsxRuntimeExports.jsx(DropDown, { field: field, onChange: (value) => handleChange(field, value) }, field.name));
                            case "due_at": {
                                const isTask = ticketFields.find((field) => field.type === "tickettype")
                                    ?.value === "task";
                                return (isTask && (jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {}), children: jsxRuntimeExports.jsx(DatePicker, { field: field, locale: locale, valueFormat: "dateTime" }) })));
                            }
                            case "cc_email":
                                return (jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {}), children: jsxRuntimeExports.jsx(CcField, { field: field }) }));
                            case "checkbox":
                                return (jsxRuntimeExports.jsx(Checkbox, { field: field, onChange: (value) => handleChange(field, value) }));
                            case "date":
                                return (jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {}), children: jsxRuntimeExports.jsx(DatePicker, { field: field, locale: locale, valueFormat: "date" }) }));
                            case "multiselect":
                                return jsxRuntimeExports.jsx(MultiSelect, { field: field });
                            case "tagger":
                                return (jsxRuntimeExports.jsx(Tagger, { field: field, onChange: (value) => handleChange(field, value) }, field.name));
                            default:
                                return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {});
                        }
                    }), attachments_field && jsxRuntimeExports.jsx(Attachments, { field: attachments_field }), inline_attachments_fields.map(({ type, name, value }, index) => (jsxRuntimeExports.jsx("input", { type: type, name: name, value: value }, index))), jsxRuntimeExports.jsx(Footer, { children: (ticketForms.length === 0 || ticket_form_field.value) && (jsxRuntimeExports.jsx(Button, { isPrimary: true, type: "submit", children: "Submit" })) })] }), answerBot.token &&
                answerBot.articles.length > 0 &&
                answerBot.request_id && (jsxRuntimeExports.jsx(AnswerBotModal, { token: answerBot.token, articles: answerBot.articles, requestId: answerBot.request_id }))] }));
}

function renderNewRequestForm(props, container) {
    reactDomExports.render(jsxRuntimeExports.jsx(ThemeProviders, { children: jsxRuntimeExports.jsx(NewRequestForm, { ...props }) }), container);
}

export { renderNewRequestForm };
