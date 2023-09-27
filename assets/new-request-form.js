import { j as jsxRuntimeExports, F as Field, L as Label$1, S as Span, H as Hint, I as Input$1, M as Message, T as Textarea, a as Field$1, b as Label, c as Hint$1, C as Combobox, O as Option, d as Message$1, r as reactExports, e as Checkbox$1, f as OptGroup, p as purify, s as styled, g as FileList, h as File, i as Tooltip, P as Progress, A as Anchor, u as useToast, N as Notification, k as Title, l as Close, m as useDropzone, n as FileUpload, o as Alert, B as Button, q as reactDomExports } from 'vendor';
import { ComponentProviders } from 'shared';

function Input({ field, onChange }) {
    const { label, error, value, name, required, description, type } = field;
    const stepProp = {};
    const inputType = type === "integer" || type === "decimal" ? "number" : "text";
    if (type === "integer")
        stepProp.step = "1";
    if (type === "decimal")
        stepProp.step = "any";
    return (jsxRuntimeExports.jsxs(Field, { children: [jsxRuntimeExports.jsxs(Label$1, { children: [label, required && jsxRuntimeExports.jsx(Span, { "aria-hidden": "true", children: "*" })] }), description && jsxRuntimeExports.jsx(Hint, { children: description }), jsxRuntimeExports.jsx(Input$1, { name: name, type: inputType, defaultValue: value, validation: error ? "error" : undefined, required: required, onChange: (e) => onChange(e.target.value), ...stepProp }), error && jsxRuntimeExports.jsx(Message, { validation: "error", children: error })] }));
}

function TextArea({ field, onChange }) {
    const { label, error, value, name, required, description } = field;
    return (jsxRuntimeExports.jsxs(Field, { children: [jsxRuntimeExports.jsxs(Label$1, { children: [label, required && jsxRuntimeExports.jsx(Span, { "aria-hidden": "true", children: "*" })] }), description && jsxRuntimeExports.jsx(Hint, { children: description }), jsxRuntimeExports.jsx(Textarea, { name: name, defaultValue: value, validation: error ? "error" : undefined, required: required, onChange: (e) => onChange(e.target.value) }), error && jsxRuntimeExports.jsx(Message, { validation: "error", children: error })] }));
}

function DropDown({ field, onChange }) {
    const { label, options, error, value, name, required, description } = field;
    const selectedOption = options.find((option) => option.value.toString() === value?.toString());
    return (jsxRuntimeExports.jsxs(Field$1, { children: [jsxRuntimeExports.jsxs(Label, { children: [label, required && jsxRuntimeExports.jsx(Span, { "aria-hidden": "true", children: "*" })] }), description && jsxRuntimeExports.jsx(Hint$1, { children: description }), jsxRuntimeExports.jsx(Combobox, { inputProps: { name, required }, isEditable: false, validation: error ? "error" : undefined, inputValue: selectedOption?.value.toString(), selectionValue: selectedOption?.value.toString(), renderValue: () => selectedOption?.name || "-", onChange: ({ selectionValue }) => {
                    if (selectionValue !== undefined) {
                        onChange(selectionValue);
                    }
                }, children: options.map((option) => (jsxRuntimeExports.jsx(Option, { value: option.value.toString(), children: option.name }, option.value))) }), error && jsxRuntimeExports.jsx(Message$1, { validation: "error", children: error })] }));
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

// Maps a flat option data structure into a nested option structure.
// Original option data structure:
// [
//   {name: 'Color::Special::Radioactive Green', value: 'color__special__radioactive_green'}
//   {name: 'Color::Red', value: 'color__red'}
//   {name: 'Color::Green', value: 'color__green'}
//   {name: 'Simple Value', value: 'simple_value'}
// ]
// Mapped nested option data strucutre:
// {
//   "root": [
//     {value: 'Color', name: 'Color', type: 'next'},
//     {value: 'simple_value', label: 'Simple Value', name: 'Simple Value'}
//   ],
//   "Color": [
//       {value: 'Special', name: 'Special', type: 'next'},
//       {value: 'color__red', label: 'Color::Red', name: 'Red'},
//       {value: 'color__green', label: 'Color::Green', name: 'Green'},
//   ],
//   "Special": [
//      {value: 'color__special__atomic_green', label: 'Color::Special::Atomic Green', name: 'Atomic Green'}
//   ]
function buildNestedOptions(options) {
    const result = { root: [] };
    options.forEach((option) => {
        // for flat values
        if (!option.name.includes("::")) {
            result["root"]?.push({
                value: option.value,
                label: option.name,
                name: option.name,
            });
        }
        // for nested values ex: (Color::Special::Radioactive Green)
        else {
            const optionNameList = option.name.split("::");
            for (let i = 0; i < optionNameList.length - 1; i++) {
                const subGroupName = optionNameList[i];
                if (subGroupName && result[subGroupName] == null) {
                    // creates an entry in `result` to store the options associated to `subGroupName`
                    result[subGroupName] = [];
                    // links the new option subgroup to the parent option group
                    const list = i == 0 ? result.root : result[optionNameList[i - 1]];
                    list?.push({
                        value: subGroupName,
                        label: subGroupName,
                        name: subGroupName,
                        type: "next",
                    });
                }
            }
            // adds a option to the last subgroup of the chain, ex:
            // ex: adding `Radioactive Green` to `result[Special]`
            const lastSubGroupName = optionNameList[optionNameList.length - 2];
            result[lastSubGroupName]?.push({
                value: option.value,
                label: option.name,
                name: optionNameList.slice(-1)[0],
            });
        }
    });
    return result;
}

function MultiSelect({ field }) {
    const { label, options, error, value, name, required, description } = field;
    const nestedOptions = reactExports.useMemo(() => buildNestedOptions(options), [options]);
    const [selectedValues, setSelectValues] = reactExports.useState(value || []);
    // represents the subgroup chain, for example: ['Color','Special']
    const [subGroupStack, setSubGroupStack] = reactExports.useState([]);
    // indicates the "selected" subgroup, for example: 'Special'
    const [activeSubGroup, setActiveSubOption] = reactExports.useState(null);
    // holds the available options related to the activeSubGroup or the root(default) group.
    const [activeOptions, setActiveOptions] = reactExports.useState(nestedOptions.root);
    const handleChange = (changes) => {
        if (Array.isArray(changes.selectionValue)) {
            // for an option like `Color::Special::Radioactive Green` the return will be `Radioactive Green`
            const lastSelectedItem = changes.selectionValue
                .slice(-1)
                .toString();
            if (lastSelectedItem == "back") {
                // walks back the subgroup option chain. Example: from: `Color::Special` to ``Color`
                subGroupStack.pop();
                const previousSubGroup = subGroupStack.length > 0 ? subGroupStack.slice(-1)[0] : "root";
                setSubGroupStack(subGroupStack);
                previousSubGroup == "root"
                    ? setActiveSubOption(null)
                    : setActiveSubOption(previousSubGroup);
                setActiveOptions(nestedOptions[previousSubGroup]);
            }
            else if (nestedOptions[lastSelectedItem] !== undefined) {
                // the selected Item represents/matches an option subgroup then move up the group chain
                // Example: if lastSelectedItem = `Color`, the component move up the group chain from root to color
                // and it will update the activeOptions property to display the elements inside `nestedOptions['Color']
                if (!subGroupStack.includes(lastSelectedItem)) {
                    subGroupStack.push(lastSelectedItem);
                    setSubGroupStack(subGroupStack);
                    setActiveSubOption(lastSelectedItem);
                    setActiveOptions(nestedOptions[lastSelectedItem]);
                }
            }
            else {
                // if the lastSelectedItem represents a option Value then we update the component state
                setSelectValues(changes.selectionValue);
            }
        }
    };
    return (jsxRuntimeExports.jsxs(Field$1, { children: [selectedValues.map((selectedValue) => (jsxRuntimeExports.jsx("input", { type: "hidden", name: `${name}[]`, value: selectedValue }, selectedValue))), jsxRuntimeExports.jsxs(Label, { children: [label, required && jsxRuntimeExports.jsx(Span, { "aria-hidden": "true", children: "*" })] }), description && jsxRuntimeExports.jsx(Hint$1, { children: description }), jsxRuntimeExports.jsxs(Combobox, { isMultiselectable: true, inputProps: { required }, isEditable: false, validation: error ? "error" : undefined, onChange: handleChange, selectionValue: selectedValues, children: [activeSubGroup && (jsxRuntimeExports.jsx(Option, { value: "back", type: "previous", children: "Back" })), activeSubGroup ? (jsxRuntimeExports.jsx(OptGroup, { "aria-label": activeSubGroup, children: activeOptions?.map((option) => (jsxRuntimeExports.jsx(Option, { value: option.value, type: option.type, label: option.label, isSelected: selectedValues.includes(option.value.toString()), children: option.name }, option.value))) })) : (activeOptions?.map((option) => (jsxRuntimeExports.jsx(Option, { value: option.value, label: option.label, type: option.type, isSelected: selectedValues.includes(option.value.toString()), children: option.name }, option.value))))] }), error && jsxRuntimeExports.jsx(Message$1, { validation: "error", children: error })] }));
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
const fetchCsrfToken$1 = async () => {
    const response = await fetch("/hc/api/internal/csrf_token.json");
    const { current_session } = await response.json();
    return current_session.csrf_token;
};
/**
 * This hook creates an event handler for form submits, fetching the CSRF token
 * from the backend and appending it to the form
 * @param ticketFields array of ticket fields for the form
 * @returns a Submit Event Handler function
 */
function useSubmitHandler(ticketFields) {
    const isSubmitting = reactExports.useRef(false);
    return async (e) => {
        e.preventDefault();
        /* We are performing an async call to fetch the CSRF token and for this reason
           the submit is not immediate, and the user can click the submit button multiple times.
           We don't want to disable the submit button for A11Y, so we use the isSubmitting ref
           to stop subsequent submits after the first one. */
        if (isSubmitting.current === false) {
            isSubmitting.current = true;
            const form = e.target;
            const token = await fetchCsrfToken$1();
            const hiddenInput = document.createElement("input");
            hiddenInput.type = "hidden";
            hiddenInput.name = "authenticity_token";
            hiddenInput.value = token;
            form.appendChild(hiddenInput);
            // Ensure that the credit card field is redacted before submitting
            const creditCardField = ticketFields.find((field) => field.type === "partialcreditcard");
            if (creditCardField) {
                const creditCardInput = form.querySelector(`input[name="${creditCardField.name}"]`);
                if (creditCardInput && creditCardInput instanceof HTMLInputElement) {
                    creditCardInput.value = redactCreditCard(creditCardInput.value);
                }
            }
            form.submit();
        }
    };
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
    const { label, error, name, attachments, description } = field;
    const { files, addPendingFile, setPendingFileProgress, setUploaded, removePendingFile, removeUploadedFile, } = useAttachedFiles(attachments?.map((value) => ({
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
    return (jsxRuntimeExports.jsxs(Field, { children: [jsxRuntimeExports.jsx(Label$1, { children: label }), description && jsxRuntimeExports.jsx(Hint, { children: description }), error && jsxRuntimeExports.jsx(Message, { validation: "error", children: error }), jsxRuntimeExports.jsxs(FileUpload, { ...getRootProps(), isDragging: isDragActive, children: [isDragActive ? (jsxRuntimeExports.jsx("span", { children: "Drop files here" })) : (jsxRuntimeExports.jsx("span", { children: "Choose a file or drag and drop here" })), jsxRuntimeExports.jsx(Input$1, { ...getInputProps() })] }), files.map((file) => (jsxRuntimeExports.jsx(FileListItem, { file: file, onRemove: () => {
                    handleRemove(file);
                } }, file.status === "pending" ? file.id : file.value.id))), files.map((file) => file.status === "uploaded" && (jsxRuntimeExports.jsx("input", { type: "hidden", name: name, value: JSON.stringify(file.value) }, file.value.id)))] }));
}

function useEndUserConditions(fields, endUserConditions) {
    return fields.filter((field) => {
        const conditions = endUserConditions.filter((condition) => condition.child_fields.some((childField) => childField.id === field.id));
        const hasNoConditions = conditions.length === 0;
        const meetsAnyCondition = conditions.some((condition) => fields.find((field) => field.id === condition.parent_field_id)
            ?.value === condition.value);
        return hasNoConditions || meetsAnyCondition;
    });
}

function CreditCard({ field, onChange }) {
    const { label, error, value, name, required, description } = field;
    const handleBlur = (e) => {
        onChange(redactCreditCard(e.target.value));
    };
    return (jsxRuntimeExports.jsxs(Field, { children: [jsxRuntimeExports.jsxs(Label$1, { children: [label, required && jsxRuntimeExports.jsx(Span, { "aria-hidden": "true", children: "*" })] }), description && jsxRuntimeExports.jsx(Hint, { children: description }), jsxRuntimeExports.jsx(Input$1, { name: name, type: "text", value: value, onChange: (e) => onChange(e.target.value), onBlur: handleBlur, validation: error ? "error" : undefined, required: required }), error && jsxRuntimeExports.jsx(Message, { validation: "error", children: error })] }));
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
function NewRequestForm({ ticketForms, requestForm, parentId, locale, }) {
    const { fields, action, http_method, accept_charset, errors, ticket_form_field, ticket_forms_instructions, parent_id_field, end_user_conditions, } = requestForm;
    const prefilledTicketFields = usePrefilledTicketFields(fields);
    const [ticketFields, setTicketFields] = reactExports.useState(prefilledTicketFields);
    const visibleFields = useEndUserConditions(ticketFields, end_user_conditions);
    const handleSubmit = useSubmitHandler(ticketFields);
    function handleChange(field, value) {
        setTicketFields(ticketFields.map((ticketField) => ticketField.name === field.name
            ? { ...ticketField, value }
            : ticketField));
    }
    return (jsxRuntimeExports.jsxs(Form, { action: action, method: http_method, acceptCharset: accept_charset, noValidate: true, onSubmit: handleSubmit, children: [errors && jsxRuntimeExports.jsx(Alert, { type: "error", children: errors }), parentId && jsxRuntimeExports.jsx(ParentTicketField, { field: parent_id_field }), ticketForms.length > 0 && (jsxRuntimeExports.jsx(TicketFormField, { label: ticket_forms_instructions, ticketFormField: ticket_form_field, ticketForms: ticketForms })), visibleFields.map((field) => {
                switch (field.type) {
                    case "anonymous_requester_email":
                    case "subject":
                    case "text":
                    case "integer":
                    case "decimal":
                    case "regexp":
                        return (jsxRuntimeExports.jsx(Input, { field: field, onChange: (value) => handleChange(field, value) }, field.name));
                    case "partialcreditcard":
                        return (jsxRuntimeExports.jsx(CreditCard, { field: field, onChange: (value) => handleChange(field, value) }));
                    case "description":
                    case "textarea":
                        return (jsxRuntimeExports.jsx(TextArea, { field: field, onChange: (value) => handleChange(field, value) }, field.name));
                    case "priority":
                    case "organization_id":
                        return (jsxRuntimeExports.jsx(DropDown, { field: field, onChange: (value) => handleChange(field, value) }, field.name));
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
                        return jsxRuntimeExports.jsx("div", { children: "tagger" });
                    case "attachments":
                        return jsxRuntimeExports.jsx(Attachments, { field: field });
                    default:
                        return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {});
                }
            }), jsxRuntimeExports.jsx(Footer, { children: (ticketForms.length === 0 || ticket_form_field.value) && (jsxRuntimeExports.jsx(Button, { isPrimary: true, type: "submit", children: "Submit" })) })] }));
}

function renderNewRequestForm(props, container) {
    reactDomExports.render(jsxRuntimeExports.jsx(ComponentProviders, { children: jsxRuntimeExports.jsx(NewRequestForm, { ...props }) }), container);
}

export { renderNewRequestForm };
