import { s as styled, u as useTranslation, j as jsxRuntimeExports, F as FileList, a as File, T as Tooltip, P as Progress, A as Anchor, r as reactExports, b as Field, n as notify, c as useDropzone, d as FileUpload, I as Input$1, C as Checkbox$1, S as Span, M as MediaInput, e as SvgCreditCardStroke, D as DatePicker$1, f as Textarea, g as Field$1, h as Combobox, O as Option, i as OptGroup, k as debounce } from 'shared';

const FileNameWrapper = styled.div `
  flex: 1;
`;
function FileListItem({ file, onRemove, }) {
    const { t } = useTranslation();
    const handleFileKeyDown = (e) => {
        if (e.code === "Delete" || e.code === "Backspace" || e.code === "Enter") {
            e.preventDefault();
            onRemove();
        }
    };
    const handleFileKeyUp = (e) => {
        if (e.code === "Space") {
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
    const stopUploadLabel = t("cph-theme-ticket-fields.attachments.stop-upload", "Stop upload");
    const removeFileLabel = t("cph-theme-ticket-fields.attachments.remove-file", "Remove file");
    return (jsxRuntimeExports.jsx(FileList.Item, { children: jsxRuntimeExports.jsx(File, { type: "generic", tabIndex: 0, "aria-label": t("cph-theme-ticket-fields.attachments.file", "File: {{fileName}}, press delete to remove", { fileName }), onKeyDown: handleFileKeyDown, onKeyUp: handleFileKeyUp, children: file.status === "pending" ? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(FileNameWrapper, { children: fileName }), jsxRuntimeExports.jsx(Tooltip, { content: stopUploadLabel, children: jsxRuntimeExports.jsx(File.Close, { "aria-label": t("cph-theme-ticket-fields.attachments.stop-upload-aria-label", "Stop uploading {{fileName}}", { fileName }), "aria-describedby": undefined, onClick: () => {
                                onRemove();
                            }, onKeyDown: handleCloseKeyDown }) }), jsxRuntimeExports.jsx(Progress, { value: file.progress, "aria-label": t("cph-theme-ticket-fields.attachments.uploading", "Uploading {{fileName}}", { fileName }) })] })) : (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(FileNameWrapper, { children: jsxRuntimeExports.jsx(Anchor, { isExternal: true, href: file.value.url, target: "_blank", children: fileName }) }), jsxRuntimeExports.jsx(Tooltip, { content: removeFileLabel, children: jsxRuntimeExports.jsx(File.Delete, { "aria-label": t("cph-theme-ticket-fields.attachments.remove-file-aria-label", "Remove file: {{fileName}}", { fileName }), "aria-describedby": undefined, onClick: () => {
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

const StyledErrorMessage = styled(Field.Message) `
  margin-top: ${(props) => (props.hasDescription ? props.theme.space.xxs : 0)};
`;
async function fetchCsrfToken() {
    const response = await fetch("/api/v2/users/me.json");
    const { user: { authenticity_token }, } = await response.json();
    return authenticity_token;
}
function Attachments({ field, baseLocale, onUploadingChange, }) {
    const { label, error, name, attachments } = field;
    const { files, addPendingFile, setPendingFileProgress, setUploaded, removePendingFile, removeUploadedFile, } = useAttachedFiles(attachments.map((value) => ({
        status: "uploaded",
        value,
    })) ?? []);
    const { t } = useTranslation();
    const isUploading = files.some((file) => file.status === "pending");
    reactExports.useEffect(() => {
        onUploadingChange?.(isUploading);
    }, [isUploading, onUploadingChange]);
    const uploadFailedTitle = reactExports.useCallback((file) => {
        return t("cph-theme-ticket-fields.upload-failed-title", "Upload failed", {
            fileName: file.name,
        });
    }, [t]);
    const convertError = reactExports.useCallback((file, xhr) => {
        if (xhr.response?.error == "RecordInvalid" &&
            !!xhr.response?.details?.base) {
            const errorMessage = xhr.response?.details?.base
                ?.map((errorString) => errorString?.description)
                .join(t("cph-theme-ticket-fields.attachments.error-separator", "; "));
            return {
                title: uploadFailedTitle(file),
                errorMessage,
            };
        }
        else if (xhr.response?.error == "AttachmentFilenameTooLong" ||
            xhr.response?.error == "AttachmentTooLarge") {
            return {
                title: uploadFailedTitle(file),
                errorMessage: xhr.response?.description,
            };
        }
        else {
            return {
                title: t("cph-theme-ticket-fields.attachments.upload-error-title", "Upload error"),
                errorMessage: t("cph-theme-ticket-fields.attachments.upload-error-description", "There was an error uploading {{fileName}}. Try again or upload another file.", { fileName: file.name }),
            };
        }
    }, [t, uploadFailedTitle]);
    const notifyError = reactExports.useCallback((title, errorMessage) => {
        notify({
            title,
            message: errorMessage,
            type: "error",
        });
    }, []);
    const onDrop = reactExports.useCallback(async (acceptedFiles) => {
        const csrfToken = await fetchCsrfToken();
        for (const file of acceptedFiles) {
            // fetch doesn't support upload progress, so we use XMLHttpRequest
            const xhr = new XMLHttpRequest();
            const url = new URL(`${window.location.origin}/api/v2/uploads.json`);
            url.searchParams.append("filename", file.name);
            url.searchParams.append("locale", baseLocale);
            xhr.open("POST", url);
            // If the browser returns a type for the file, use it as the Content-Type header,
            // otherwise we fall back to application/octet-stream and let the backend
            // determine the file type.
            if (file.type) {
                xhr.setRequestHeader("Content-Type", file.type);
            }
            else {
                xhr.setRequestHeader("Content-Type", "application/octet-stream");
            }
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
                    const { title, errorMessage } = convertError(file, xhr);
                    notifyError(title, errorMessage);
                    removePendingFile(pendingId);
                }
            });
            xhr.addEventListener("error", () => {
                const { title, errorMessage } = convertError(file, xhr);
                notifyError(title, errorMessage);
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
        convertError,
        baseLocale,
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
    return (jsxRuntimeExports.jsxs(Field, { children: [jsxRuntimeExports.jsxs(Field.Label, { children: [label, field.isRequired ? "*" : ""] }), field.description && (jsxRuntimeExports.jsx(Field.Hint, { children: field.description })), error && (jsxRuntimeExports.jsx(StyledErrorMessage, { validation: "error", hasDescription: !!field.description, children: error })), jsxRuntimeExports.jsxs(FileUpload, { ...getRootProps(), isDragging: isDragActive, children: [isDragActive ? (jsxRuntimeExports.jsx("span", { children: t("cph-theme-ticket-fields.attachments.drop-files-label", "Drop files here") })) : (jsxRuntimeExports.jsx("span", { children: t("cph-theme-ticket-fields.attachments.choose-file-label", "Choose a file or drag and drop here") })), jsxRuntimeExports.jsx(Input$1, { ...getInputProps() })] }), jsxRuntimeExports.jsx(FileList, { children: files.map((file) => (jsxRuntimeExports.jsx(FileListItem, { file: file, onRemove: () => {
                        handleRemove(file);
                    } }, file.status === "pending" ? file.id : file.value.id))) }), files.map((file) => file.status === "uploaded" && (jsxRuntimeExports.jsx("input", { type: "hidden", name: name, value: JSON.stringify(file.value) }, file.value.id)))] }));
}

function getFieldConditions(fieldId, endUserConditions) {
    return endUserConditions.filter((condition) => {
        return condition.child_fields.some((child) => child.id === fieldId);
    });
}
function isMatchingValue(fieldValue, condition) {
    if (condition.parent_field_type === "checkbox" && condition.value === false) {
        return fieldValue === false || fieldValue === null;
    }
    return fieldValue === condition.value;
}
function getAppliedConditions(fieldConditions, allConditions, fields) {
    return fieldConditions.filter((condition) => {
        const parentField = fields.find((field) => field.id === condition.parent_field_id);
        if (!parentField) {
            return false;
        }
        const parentFieldConditions = getFieldConditions(parentField.id, allConditions);
        // the condition is applied if the parent field value matches the condition value
        // and if the parent field has no conditions or if the parent field conditions are met
        return (isMatchingValue(parentField.value, condition) &&
            (parentFieldConditions.length === 0 ||
                getAppliedConditions(parentFieldConditions, allConditions, fields)
                    .length > 0));
    });
}
function getVisibleFields(fields, endUserConditions) {
    if (endUserConditions.length === 0) {
        return fields;
    }
    return fields.reduce((acc, field) => {
        const fieldConditions = getFieldConditions(field.id, endUserConditions);
        if (fieldConditions.length === 0) {
            return [...acc, field];
        }
        const appliedConditions = getAppliedConditions(fieldConditions, endUserConditions, fields);
        if (appliedConditions.length > 0) {
            return [
                ...acc,
                {
                    ...field,
                    required: appliedConditions.some((condition) => condition.child_fields.some((child) => child.id == field.id && child.is_required)),
                },
            ];
        }
        return acc;
    }, []);
}

function Checkbox({ field, onChange }) {
    const { label, error, value, name, required, description } = field;
    const [checkboxValue, setCheckboxValue] = reactExports.useState(value);
    const handleChange = (e) => {
        const { checked } = e.target;
        setCheckboxValue(checked);
        onChange(checked);
    };
    return (jsxRuntimeExports.jsxs(Field, { children: [jsxRuntimeExports.jsx("input", { type: "hidden", name: name, value: "off" }), jsxRuntimeExports.jsxs(Checkbox$1, { name: name, required: required, defaultChecked: value, value: checkboxValue ? "on" : "off", onChange: handleChange, children: [jsxRuntimeExports.jsxs(Field.Label, { children: [label, required && jsxRuntimeExports.jsx(Span, { "aria-hidden": "true", children: "*" })] }), description && (jsxRuntimeExports.jsx(Field.Hint, { dangerouslySetInnerHTML: { __html: description } }))] }), error && (jsxRuntimeExports.jsx(Field.Message, { validation: "error", children: error }))] }));
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
    return (jsxRuntimeExports.jsxs(Field, { children: [jsxRuntimeExports.jsxs(Field.Label, { children: [label, required && jsxRuntimeExports.jsx(Span, { "aria-hidden": "true", children: "*" }), jsxRuntimeExports.jsx(DigitsHintSpan, { children: t("cph-theme-ticket-fields.credit-card-digits-hint", "(Last 4 digits)") })] }), description && (jsxRuntimeExports.jsx(Field.Hint, { dangerouslySetInnerHTML: { __html: description } })), jsxRuntimeExports.jsx(MediaInput, { start: jsxRuntimeExports.jsx(SvgCreditCardStroke, {}), name: name, type: "text", value: digits, onChange: (e) => onChange(e.target.value), validation: error ? "error" : undefined, required: required, maxLength: 4, placeholder: "XXXX" }), error && (jsxRuntimeExports.jsx(Field.Message, { validation: "error", children: error }))] }));
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
    return (jsxRuntimeExports.jsxs(Field, { children: [jsxRuntimeExports.jsxs(Field.Label, { children: [label, required && jsxRuntimeExports.jsx(Span, { "aria-hidden": "true", children: "*" })] }), description && (jsxRuntimeExports.jsx(Field.Hint, { dangerouslySetInnerHTML: { __html: description } })), jsxRuntimeExports.jsx(DatePicker$1, { value: date, onChange: handleChange, formatDate: formatDateInput, locale: locale, children: jsxRuntimeExports.jsx(Input$1, { required: required, lang: locale, onChange: handleInputChange, validation: error ? "error" : undefined }) }), error && (jsxRuntimeExports.jsx(Field.Message, { validation: "error", children: error })), jsxRuntimeExports.jsx("input", { type: "hidden", name: name, value: formatDateValue(date) })] }));
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
    return (jsxRuntimeExports.jsxs(Field, { children: [jsxRuntimeExports.jsxs(Field.Label, { children: [label, required && jsxRuntimeExports.jsx(Span, { "aria-hidden": "true", children: "*" })] }), description && (jsxRuntimeExports.jsx(Field.Hint, { dangerouslySetInnerHTML: { __html: description } })), jsxRuntimeExports.jsx(Input$1, { name: name, type: inputType, defaultValue: value, validation: error ? "error" : undefined, required: required, onChange: (e) => {
                    onChange && onChange(e.target.value);
                }, autoComplete: autocomplete, ...stepProp }), error && (jsxRuntimeExports.jsx(Field.Message, { validation: "error", children: error }))] }));
}

function useWysiwyg({ hasWysiwyg, baseLocale, hasAtMentions, userRole, brandId, }) {
    const isInitializedRef = reactExports.useRef(false);
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
    }, [hasWysiwyg, baseLocale, hasAtMentions, userRole, brandId]);
}

const StyledField = styled(Field) `
  .ck.ck-editor {
    margin-top: ${(props) => props.theme.space.xs};
  }
`;
const StyledMessage = styled(Field.Message) `
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
    return (jsxRuntimeExports.jsxs(StyledField, { children: [jsxRuntimeExports.jsxs(StyledField.Label, { children: [label, required && jsxRuntimeExports.jsx(Span, { "aria-hidden": "true", children: "*" })] }), description && (jsxRuntimeExports.jsx(StyledField.Hint, { dangerouslySetInnerHTML: { __html: description } })), jsxRuntimeExports.jsx(Textarea, { ref: ref, name: name, defaultValue: value, validation: error ? "error" : undefined, required: required, onChange: (e) => onChange(e.target.value), rows: 6, isResizable: true }), error && jsxRuntimeExports.jsx(StyledMessage, { validation: "error", children: error })] }));
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
    return (jsxRuntimeExports.jsxs(Field$1, { children: [jsxRuntimeExports.jsxs(Field$1.Label, { children: [label, required && jsxRuntimeExports.jsx(Span, { "aria-hidden": "true", children: "*" })] }), description && (jsxRuntimeExports.jsx(Field$1.Hint, { dangerouslySetInnerHTML: { __html: description } })), jsxRuntimeExports.jsxs(Combobox, { ref: wrapperRef, inputProps: { name, required }, isEditable: false, validation: error ? "error" : undefined, inputValue: selectionValue, selectionValue: selectionValue, renderValue: ({ selection }) => selection?.label || jsxRuntimeExports.jsx(EmptyValueOption, {}), onChange: ({ selectionValue }) => {
                    if (selectionValue !== undefined) {
                        onChange(selectionValue);
                    }
                }, children: [!required && (jsxRuntimeExports.jsx(Option, { value: "", label: "-", children: jsxRuntimeExports.jsx(EmptyValueOption, {}) })), options.map((option) => (jsxRuntimeExports.jsx(Option, { value: option.value.toString(), label: option.name }, option.value)))] }), error && jsxRuntimeExports.jsx(Field$1.Message, { validation: "error", children: error })] }));
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
function buildSubGroupOptions(groupNames, backLabel) {
    const parentGroupNames = groupNames.slice(0, -1);
    const parentGroupIdentifier = getGroupIdentifier(parentGroupNames);
    const name = groupNames[groupNames.length - 1];
    return {
        type: "SubGroup",
        name,
        backOption: {
            type: "previous",
            label: backLabel,
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
function buildNestedOptions(options, hasEmptyOption, backLabel) {
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
                result[groupIdentifier] = buildSubGroupOptions(groupNames, backLabel);
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
                    result[parentGroupIdentifier] = buildSubGroupOptions(parentGroupNames, backLabel);
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
    const { t } = useTranslation();
    const nestedOptions = reactExports.useMemo(() => buildNestedOptions(options, hasEmptyOption, t("cph-theme-ticket-fields.dropdown.back-option-label", "Back")), [options, hasEmptyOption, t]);
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
    return (jsxRuntimeExports.jsxs(Field$1, { children: [selectedValues.map((selectedValue) => (jsxRuntimeExports.jsx("input", { type: "hidden", name: `${name}[]`, value: selectedValue }, selectedValue))), jsxRuntimeExports.jsxs(Field$1.Label, { children: [label, required && jsxRuntimeExports.jsx(Span, { "aria-hidden": "true", children: "*" })] }), description && (jsxRuntimeExports.jsx(Field$1.Hint, { dangerouslySetInnerHTML: { __html: description } })), jsxRuntimeExports.jsxs(Combobox, { ref: wrapperRef, isMultiselectable: true, inputProps: { required }, isEditable: false, validation: error ? "error" : undefined, onChange: handleChange, selectionValue: selectedValues, maxHeight: "auto", children: [currentGroup.type === "SubGroup" && (jsxRuntimeExports.jsx(Option, { ...currentGroup.backOption })), currentGroup.type === "SubGroup" ? (jsxRuntimeExports.jsx(OptGroup, { "aria-label": currentGroup.name, children: currentGroup.options.map((option) => (jsxRuntimeExports.jsx(Option, { ...option, children: option.menuLabel ?? option.label }, option.value))) })) : (currentGroup.options.map((option) => (jsxRuntimeExports.jsx(Option, { ...option }, option.value))))] }), error && jsxRuntimeExports.jsx(Field$1.Message, { validation: "error", children: error })] }));
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
    return (jsxRuntimeExports.jsxs(Field$1, { children: [jsxRuntimeExports.jsxs(Field$1.Label, { children: [label, required && jsxRuntimeExports.jsx(Span, { "aria-hidden": "true", children: "*" })] }), description && (jsxRuntimeExports.jsx(Field$1.Hint, { dangerouslySetInnerHTML: { __html: description } })), jsxRuntimeExports.jsxs(Combobox, { ref: wrapperRef, inputProps: { required, name }, isEditable: false, validation: error ? "error" : undefined, onChange: handleChange, selectionValue: selectionValue, inputValue: selectionValue, renderValue: ({ selection }) => selection?.label ?? jsxRuntimeExports.jsx(EmptyValueOption, {}), isExpanded: isExpanded, children: [currentGroup.type === "SubGroup" && (jsxRuntimeExports.jsx(Option, { ...currentGroup.backOption })), currentGroup.type === "SubGroup" ? (jsxRuntimeExports.jsx(OptGroup, { "aria-label": currentGroup.name, children: currentGroup.options.map((option) => (jsxRuntimeExports.jsx(Option, { ...option, children: option.menuLabel ?? option.label }, option.value))) })) : (currentGroup.options.map((option) => option.value === "" ? (jsxRuntimeExports.jsx(Option, { ...option, children: jsxRuntimeExports.jsx(EmptyValueOption, {}) }, option.value)) : (jsxRuntimeExports.jsx(Option, { ...option }, option.value))))] }), error && jsxRuntimeExports.jsx(Field$1.Message, { validation: "error", children: error })] }));
}

function buildAdvancedDynamicFilterParams(filter, fields = []) {
    if (!filter)
        return [];
    const dynamicFilters = [
        ...filter.all.filter((f) => f.operator === "matches" || f.operator === "not_matches"),
        ...filter.any.filter((f) => f.operator === "matches" || f.operator === "not_matches"),
    ];
    return dynamicFilters.map((f) => {
        const parsedFilterId = f.value.split("ticket_fields_")[1];
        const field = fields.find((field) => field.id.toString() === parsedFilterId);
        return {
            key: f.value,
            value: field?.value ?? null,
        };
    });
}
function getCustomObjectKey(targetType) {
    return targetType.replace("zen:custom_object:", "");
}
const EMPTY_OPTION = {
    value: "",
    name: "-",
};
function LookupField({ field, userId, organizationId, brandId, onChange, visibleFields, buildLookupFieldOptions, renderOption, }) {
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
        const filterPairs = buildAdvancedDynamicFilterParams(field.relationship_filter, visibleFields);
        for (const { key: filterValue, value: fieldValue } of filterPairs) {
            if (!filterValue)
                continue;
            if (filterValue === "ticket_brand_id") {
                if (brandId) {
                    searchParams.set("filter[dynamic_values][ticket_brand_id]", brandId.toString());
                }
                continue;
            }
            const filterValueParam = `filter[dynamic_values][${filterValue}]`;
            const fieldValueParam = fieldValue?.toString() || "";
            searchParams.set(filterValueParam, fieldValueParam);
        }
        if (organizationId)
            searchParams.set("organization_id", organizationId);
        setIsLoadingOptions(true);
        try {
            const response = await fetch(`/api/v2/custom_objects/${customObjectKey}/records/autocomplete?${searchParams.toString()}`);
            const data = await response.json();
            if (response.ok) {
                const fetchedRecords = data.custom_object_records;
                let options;
                if (buildLookupFieldOptions) {
                    options = await buildLookupFieldOptions(fetchedRecords, field);
                }
                else {
                    options = fetchedRecords.map(({ name, id }) => ({
                        name,
                        value: id,
                    }));
                }
                if (selectedOption) {
                    options = options.filter((option) => option.value !== selectedOption.value);
                    options = [selectedOption, ...options];
                }
                setOptions(options);
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
    }, [
        brandId,
        customObjectKey,
        field,
        fieldId,
        organizationId,
        selectedOption,
        userId,
        visibleFields,
        buildLookupFieldOptions,
    ]);
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
    return (jsxRuntimeExports.jsxs(Field$1, { children: [jsxRuntimeExports.jsxs(Field$1.Label, { children: [label, required && jsxRuntimeExports.jsx(Span, { "aria-hidden": "true", children: "*" })] }), description && (jsxRuntimeExports.jsx(Field$1.Hint, { dangerouslySetInnerHTML: { __html: description } })), jsxRuntimeExports.jsxs(Combobox, { inputProps: { required }, "data-test-id": "lookup-field-combobox", validation: error ? "error" : undefined, inputValue: inputValue, selectionValue: selectedOption?.value, isAutocomplete: true, placeholder: t("cph-theme-ticket-fields.lookup-field.placeholder", "Search {{label}}", { label }), onFocus: onFocus, onChange: handleChange, renderValue: () => selectedOption ? selectedOption?.name : EMPTY_OPTION.name, children: [selectedOption?.name !== EMPTY_OPTION.name && (jsxRuntimeExports.jsx(Option, { value: "", label: "-", children: jsxRuntimeExports.jsx(EmptyValueOption, {}) })), isLoadingOptions && (jsxRuntimeExports.jsx(Option, { isDisabled: true, value: loadingOption.name }, loadingOption.id)), !isLoadingOptions &&
                        inputValue?.length > 0 &&
                        options.length === 0 && (jsxRuntimeExports.jsx(Option, { isDisabled: true, value: noResultsOption.name }, noResultsOption.id)), !isLoadingOptions &&
                        options.length !== 0 &&
                        options.map((option) => (jsxRuntimeExports.jsx(Option, { value: option.value, label: option.name, "data-test-id": `option-${option.name}`, children: renderOption ? renderOption(option) : option.name }, option.value)))] }), error && jsxRuntimeExports.jsx(Field$1.Message, { validation: "error", children: error }), jsxRuntimeExports.jsx("input", { type: "hidden", name: name, value: selectedOption?.value })] }));
}

const RequestFormField = ({ field, baseLocale, hasAtMentions, userRole, userId, defaultOrganizationId, organizationField, brandId, dueDateField, visibleFields, handleDueDateChange, handleChange, buildLookupFieldOptions, renderLookupFieldOption, }) => {
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
            return (jsxRuntimeExports.jsx(LookupField, { field: field, userId: userId, organizationId: organizationField != null
                    ? organizationField.value
                    : defaultOrganizationId, brandId: brandId, visibleFields: visibleFields, onChange: (value) => handleChange(field, value), buildLookupFieldOptions: buildLookupFieldOptions, renderOption: renderLookupFieldOption }, field.name));
        default:
            return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {});
    }
};

var af = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Choose a file or drag and drop here",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Drop files here",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "File: {{fileName}}, press delete to remove",
	"cph-theme-ticket-fields.attachments.remove-file": "Remove file",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Remove file: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Stop upload",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Stop uploading {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "There was an error uploading {{fileName}}. Try again or upload another file.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Upload error",
	"cph-theme-ticket-fields.attachments.uploading": "Uploading {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Back",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.search-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}} upload failed"
};

var af$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: af
});

var arXPseudo = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "[ผู้龍Ḉḥṓṓṓṓṡḛḛ αα ϝḭḭḽḛḛ ṓṓṛ ḍṛααḡ ααṇḍ ḍṛṓṓṗ ḥḛḛṛḛḛ龍ผู้]",
	"cph-theme-ticket-fields.attachments.drop-files-label": "[ผู้龍Ḍṛṓṓṗ ϝḭḭḽḛḛṡ ḥḛḛṛḛḛ龍ผู้]",
	"cph-theme-ticket-fields.attachments.error-separator": "[ผู้龍; 龍ผู้]",
	"cph-theme-ticket-fields.attachments.file": "[ผู้龍Ḟḭḭḽḛḛ: {{fileName}}, ṗṛḛḛṡṡ ḍḛḛḽḛḛṭḛḛ ṭṓṓ ṛḛḛṃṓṓṽḛḛ龍ผู้]",
	"cph-theme-ticket-fields.attachments.remove-file": "[ผู้龍Ṛḛḛṃṓṓṽḛḛ ϝḭḭḽḛḛ龍ผู้]",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "[ผู้龍Ṛḛḛṃṓṓṽḛḛ ϝḭḭḽḛḛ: {{fileName}}龍ผู้]",
	"cph-theme-ticket-fields.attachments.stop-upload": "[ผู้龍Ṣṭṓṓṗ ṵṵṗḽṓṓααḍ龍ผู้]",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "[ผู้龍Ṣṭṓṓṗ ṵṵṗḽṓṓααḍḭḭṇḡ {{fileName}}龍ผู้]",
	"cph-theme-ticket-fields.attachments.upload-error-description": "[ผู้龍Ṫḥḛḛṛḛḛ ẁααṡ ααṇ ḛḛṛṛṓṓṛ ṵṵṗḽṓṓααḍḭḭṇḡ {{fileName}}. Ṫṛẏẏ ααḡααḭḭṇ ṓṓṛ ṵṵṗḽṓṓααḍ ααṇṓṓṭḥḛḛṛ ϝḭḭḽḛḛ.龍ผู้]",
	"cph-theme-ticket-fields.attachments.upload-error-title": "[ผู้龍ṲṲṗḽṓṓααḍ ḛḛṛṛṓṓṛ龍ผู้]",
	"cph-theme-ticket-fields.attachments.uploading": "[ผู้龍ṲṲṗḽṓṓααḍḭḭṇḡ {{fileName}}龍ผู้]",
	"cph-theme-ticket-fields.credit-card-digits-hint": "[ผู้龍(Ḻααṡṭ 4 ḍḭḭḡḭḭṭṡ)龍ผู้]",
	"cph-theme-ticket-fields.dropdown.back-option-label": "[ผู้龍Ḃααͼḳ龍ผู้]",
	"cph-theme-ticket-fields.dropdown.empty-option": "[ผู้龍Ṣḛḛḽḛḛͼṭ ααṇ ṓṓṗṭḭḭṓṓṇ龍ผู้]",
	"cph-theme-ticket-fields.lookup-field.loading-options": "[ผู้龍Ḻṓṓααḍḭḭṇḡ ḭḭṭḛḛṃṡ...龍ผู้]",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "[ผู้龍Ṅṓṓ ṃααṭͼḥḛḛṡ ϝṓṓṵṵṇḍ龍ผู้]",
	"cph-theme-ticket-fields.lookup-field.placeholder": "[ผู้龍Ṣḛḛααṛͼḥ {{label}}龍ผู้]",
	"cph-theme-ticket-fields.search-field.no-matches-found": "[ผู้龍Ṅṓṓ ṃααṭͼḥḛḛṡ ϝṓṓṵṵṇḍ龍ผู้]",
	"cph-theme-ticket-fields.search-field.placeholder": "[ผู้龍Ṣḛḛααṛͼḥ {{label}}龍ผู้]",
	"cph-theme-ticket-fields.upload-failed-title": "[ผู้龍{{fileName}} ṵṵṗḽṓṓααḍ ϝααḭḭḽḛḛḍ龍ผู้]"
};

var arXPseudo$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: arXPseudo
});

var ar = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "اختر ملفًا أو قم بالسحب والإسقاط هنا",
	"cph-theme-ticket-fields.attachments.drop-files-label": "أسقِط الملفات هنا",
	"cph-theme-ticket-fields.attachments.error-separator": "؛ ",
	"cph-theme-ticket-fields.attachments.file": "الملف: {{fileName}}، اضغط على حذف لإزالته",
	"cph-theme-ticket-fields.attachments.remove-file": "إزالة الملف",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "إزالة الملف: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "إيقاف التحميل",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "إيقاف تحميل {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "حدث خطأ أثناء تحميل {{fileName}}. حاول مرة أخرى أو قم بتحميل ملف آخر.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "خطأ في التحميل",
	"cph-theme-ticket-fields.attachments.uploading": "جارٍ تحميل {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(آخر 4 أرقام)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "السابق",
	"cph-theme-ticket-fields.dropdown.empty-option": "حدّد خيارًا",
	"cph-theme-ticket-fields.lookup-field.loading-options": "جارٍ تحميل العناصر...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "لم يتم العثور على نتائج مطابقة",
	"cph-theme-ticket-fields.lookup-field.placeholder": "بحث في {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "لم يتم العثور على نتائج مطابقة",
	"cph-theme-ticket-fields.search-field.placeholder": "بحث في {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "فشل تحميل {{fileName}}"
};

var ar$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: ar
});

var az = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Choose a file or drag and drop here",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Drop files here",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "File: {{fileName}}, press delete to remove",
	"cph-theme-ticket-fields.attachments.remove-file": "Remove file",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Remove file: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Stop upload",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Stop uploading {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "There was an error uploading {{fileName}}. Try again or upload another file.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Upload error",
	"cph-theme-ticket-fields.attachments.uploading": "Uploading {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Back",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.search-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}} upload failed"
};

var az$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: az
});

var be = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Выберите файл или перетащите его сюда",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Перетащите файлы сюда",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "Файл: «{{fileName}}», нажмите «Удалить» для удаления",
	"cph-theme-ticket-fields.attachments.remove-file": "Удалить файл",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Удалить файл: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Остановить выкладывание",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Остановить выкладывание {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "Ошибка при выкладывании {{fileName}}. Повторите попытку или выложите другой файл.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Ошибка выкладывания",
	"cph-theme-ticket-fields.attachments.uploading": "Выкладывание {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(последние 4 цифры)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Назад",
	"cph-theme-ticket-fields.dropdown.empty-option": "Выберите вариант",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Загрузка элементов...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Соответствия не найдены",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Поиск: {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "Соответствия не найдены",
	"cph-theme-ticket-fields.search-field.placeholder": "Поиск {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "Не удалось выложить {{fileName}}"
};

var be$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: be
});

var bg = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Изберете файл или го плъзнете и пуснете тук",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Пуснете файловете тук",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "Файл: {{fileName}}, натиснете „Delete“ за премахване",
	"cph-theme-ticket-fields.attachments.remove-file": "Премахване на файл",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Премахване на файл: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Спиране на качването",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Спиране на качването на {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "Възникна грешка при качването на {{fileName}}. Опитайте отново или качете друг файл.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Грешка при качването",
	"cph-theme-ticket-fields.attachments.uploading": "Качване на {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(последните 4 цифри)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Назад",
	"cph-theme-ticket-fields.dropdown.empty-option": "Изберете опция",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Зареждане на елементите…",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Няма открити съвпадения",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Търсене на {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "Няма открити съвпадения",
	"cph-theme-ticket-fields.search-field.placeholder": "Търсене на {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "Качването на {{fileName}} е неуспешно"
};

var bg$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: bg
});

var bn = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "একটি ফাইল বেছে নিন বা এখানে টেনে এনে ড্রপ করুন",
	"cph-theme-ticket-fields.attachments.drop-files-label": "এখানে ফাইল ড্রপ করুন",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "ফাইল: {{fileName}}, সরিয়ে দিতে ‘মুছুন’ টিপুন",
	"cph-theme-ticket-fields.attachments.remove-file": "ফাইল সরিয়ে দিন",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "ফাইল সরিয়ে দিন: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "আপলোড বন্ধ করুন",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "{{fileName}} আপলোড করা বন্ধ করুন",
	"cph-theme-ticket-fields.attachments.upload-error-description": "{{fileName}} আপলোড করার সময় একটি ত্রুটি হয়েছিল। আবার চেষ্টা করুন বা অন্য একটি ফাইল আপলোড করুন।",
	"cph-theme-ticket-fields.attachments.upload-error-title": "আপলোডের ত্রুটি",
	"cph-theme-ticket-fields.attachments.uploading": "{{fileName}} আপলোড করা হচ্ছে",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(শেষ 4টি সংখ্যা)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "ফিরে যান",
	"cph-theme-ticket-fields.dropdown.empty-option": "একটি বিকল্প নির্বাচন করুন",
	"cph-theme-ticket-fields.lookup-field.loading-options": "আইটেমগুলি লোড করা হচ্ছে...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "কোনও মিল খুঁজে পাওয়া যায়নি",
	"cph-theme-ticket-fields.lookup-field.placeholder": "{{label}} অনুসন্ধান করুন",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.search-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}} আপলোড করা যায়নি"
};

var bn$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: bn
});

var bs = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Choose a file or drag and drop here",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Drop files here",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "File: {{fileName}}, press delete to remove",
	"cph-theme-ticket-fields.attachments.remove-file": "Remove file",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Remove file: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Stop upload",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Stop uploading {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "There was an error uploading {{fileName}}. Try again or upload another file.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Upload error",
	"cph-theme-ticket-fields.attachments.uploading": "Uploading {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Back",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.search-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}} upload failed"
};

var bs$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: bs
});

var ca = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Elegir un archivo o arrastrar y soltar uno aquí",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Soltar los archivos aquí",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "Archivo: {{fileName}} presione Borrar para eliminar",
	"cph-theme-ticket-fields.attachments.remove-file": "Eliminar archivo",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Eliminar archivo: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Detener carga",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Dejar de cargar {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "Hubo un error al cargar {{fileName}}. Vuelva a intentarlo o cargue otro archivo.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Error de carga",
	"cph-theme-ticket-fields.attachments.uploading": "Cargando {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Últims 4 dígits)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Enrere",
	"cph-theme-ticket-fields.dropdown.empty-option": "Trieu una opció",
	"cph-theme-ticket-fields.lookup-field.loading-options": "S'estan carregant els elements...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No s'han trobat coincidències",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Cerca {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No se encontraron coincidencias",
	"cph-theme-ticket-fields.search-field.placeholder": "Buscar {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "Falló la carga de {{fileName}}"
};

var ca$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: ca
});

var cs = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Vyberte soubor nebo ho sem přetáhněte",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Sem přetáhněte soubory",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "Soubor: {{fileName}}, stisknutím klávesy delete jej smažete",
	"cph-theme-ticket-fields.attachments.remove-file": "Odstranit soubor",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Odstranit soubor: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Zastavit upload",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Zastavit uploading {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "Při uploadování souboru {{fileName}}došlo k chybě. Zkuste to znovu nebo uploadujte jiný soubor.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Chyba při uploadu",
	"cph-theme-ticket-fields.attachments.uploading": "Uploaduje se soubor {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Poslední 4 číslice)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Zpět",
	"cph-theme-ticket-fields.dropdown.empty-option": "Vyberte možnost",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Načítání položek…",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Nebyly nalezeny žádné shody",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Hledat {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "Nebyly nalezeny žádné shody",
	"cph-theme-ticket-fields.search-field.placeholder": "Hledat {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "Chyba při uploadování {{fileName}}"
};

var cs$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: cs
});

var cy = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Choose a file or drag and drop here",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Drop files here",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "File: {{fileName}}, press delete to remove",
	"cph-theme-ticket-fields.attachments.remove-file": "Remove file",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Remove file: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Stop upload",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Stop uploading {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "There was an error uploading {{fileName}}. Try again or upload another file.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Upload error",
	"cph-theme-ticket-fields.attachments.uploading": "Uploading {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Back",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.search-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}} upload failed"
};

var cy$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: cy
});

var da = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Vælg en fil eller træk og slip her",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Slip filerne her",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "Tryk på tasten Delete for at fjerne filen {{fileName}}",
	"cph-theme-ticket-fields.attachments.remove-file": "Fjern fil",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Fjern fil: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Stop upload",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Stop uploading af {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "Der opstod en fejl under upload af {{fileName}}. Prøv igen eller upload en anden fil.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Fejl under upload",
	"cph-theme-ticket-fields.attachments.uploading": "Uploader {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Sidste 4 cifre)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Tilbage",
	"cph-theme-ticket-fields.dropdown.empty-option": "Foretag et valg",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Indlæser elementer...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Ingen matchende resultater",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Søgning i {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "Ingen matchende resultater",
	"cph-theme-ticket-fields.search-field.placeholder": "Søgning i {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "Upload af {{fileName}} mislykkedes"
};

var da$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: da
});

var deDe = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Datei auswählen oder hierher ziehen",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Dateien hier ablegen",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "Datei: {{fileName}}, zum Entfernen die Löschtaste drücken",
	"cph-theme-ticket-fields.attachments.remove-file": "Datei entfernen",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Datei entfernen: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Upload anhalten",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "{{fileName}} nicht mehr hochladen",
	"cph-theme-ticket-fields.attachments.upload-error-description": "Fehler beim Hochladen von {{fileName}}. Versuchen Sie es erneut oder laden Sie eine andere Datei hoch.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Fehler beim Hochladen",
	"cph-theme-ticket-fields.attachments.uploading": "{{fileName}} wird hochgeladen",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Letzte vier Ziffern)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Zurück",
	"cph-theme-ticket-fields.dropdown.empty-option": "Wählen Sie eine Option aus",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Elemente werden geladen...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Keine Übereinstimmungen gefunden",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Suche {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "Keine Übereinstimmungen gefunden",
	"cph-theme-ticket-fields.search-field.placeholder": "{{label}} suchen",
	"cph-theme-ticket-fields.upload-failed-title": "Fehler beim Hochladen von {{fileName}}"
};

var deDe$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: deDe
});

var deXInformal = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Datei auswählen oder hierher ziehen",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Dateien hier ablegen",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "Datei: {{fileName}}, zum Entfernen die Löschtaste drücken",
	"cph-theme-ticket-fields.attachments.remove-file": "Datei entfernen",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Datei entfernen: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Upload anhalten",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "{{fileName}} nicht mehr hochladen",
	"cph-theme-ticket-fields.attachments.upload-error-description": "Fehler beim Hochladen von {{fileName}}. Versuchen Sie es erneut oder laden Sie eine andere Datei hoch.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Fehler beim Hochladen",
	"cph-theme-ticket-fields.attachments.uploading": "{{fileName}} wird hochgeladen",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Letzte vier Ziffern)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Zurück",
	"cph-theme-ticket-fields.dropdown.empty-option": "Wählen Sie eine Option aus",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Elemente werden geladen...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Keine Übereinstimmungen gefunden",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Suche {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "Keine Übereinstimmungen gefunden",
	"cph-theme-ticket-fields.search-field.placeholder": "{{label}} suchen",
	"cph-theme-ticket-fields.upload-failed-title": "Fehler beim Hochladen von {{fileName}}"
};

var deXInformal$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: deXInformal
});

var de = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Datei auswählen oder hierher ziehen",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Dateien hier ablegen",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "Datei: {{fileName}}, zum Entfernen die Löschtaste drücken",
	"cph-theme-ticket-fields.attachments.remove-file": "Datei entfernen",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Datei entfernen: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Upload anhalten",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "{{fileName}} nicht mehr hochladen",
	"cph-theme-ticket-fields.attachments.upload-error-description": "Fehler beim Hochladen von {{fileName}}. Versuchen Sie es erneut oder laden Sie eine andere Datei hoch.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Fehler beim Hochladen",
	"cph-theme-ticket-fields.attachments.uploading": "{{fileName}} wird hochgeladen",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Letzte vier Ziffern)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Zurück",
	"cph-theme-ticket-fields.dropdown.empty-option": "Wählen Sie eine Option aus",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Elemente werden geladen...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Keine Übereinstimmungen gefunden",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Suche {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "Keine Übereinstimmungen gefunden",
	"cph-theme-ticket-fields.search-field.placeholder": "{{label}} suchen",
	"cph-theme-ticket-fields.upload-failed-title": "Fehler beim Hochladen von {{fileName}}"
};

var de$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: de
});

var el = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Επιλέξτε ένα αρχείο ή σύρετε και αποθέστε εδώ",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Αποθέστε τα αρχεία εδώ",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "Αρχείο: {{fileName}}, πατήστε Διαγραφή για κατάργηση",
	"cph-theme-ticket-fields.attachments.remove-file": "Κατάργηση αρχείου",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Αφαίρεση αρχείου: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Διακοπή αποστολής",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Διακοπή αποστολής του {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "Υπήρξε σφάλμα κατά την αποστολή του {{fileName}}. Δοκιμάστε ξανά ή ανεβάστε άλλο αρχείο.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Σφάλμα αποστολής",
	"cph-theme-ticket-fields.attachments.uploading": "Γίνεται αποστολή {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(4 τελευταία ψηφία)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Προηγούμενο",
	"cph-theme-ticket-fields.dropdown.empty-option": "Ορίστε μια επιλογή",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Φόρτωση στοιχείων...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Δεν βρέθηκαν αποτελέσματα",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Αναζήτηση για {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "Δεν βρέθηκαν αποτελέσματα",
	"cph-theme-ticket-fields.search-field.placeholder": "Αναζήτηση για {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "Η αποστολή του {{fileName}} απέτυχε"
};

var el$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: el
});

var en001 = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Choose a file or drag and drop here",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Drop files here",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "File: {{fileName}}, press delete to remove",
	"cph-theme-ticket-fields.attachments.remove-file": "Remove file",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Remove file: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Stop upload",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Stop uploading {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "There was an error uploading {{fileName}}. Try again or upload another file.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Upload error",
	"cph-theme-ticket-fields.attachments.uploading": "Uploading {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Back",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.search-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}} upload failed"
};

var en001$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: en001
});

var en150 = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Choose a file or drag and drop here",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Drop files here",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "File: {{fileName}}, press delete to remove",
	"cph-theme-ticket-fields.attachments.remove-file": "Remove file",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Remove file: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Stop upload",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Stop uploading {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "There was an error uploading {{fileName}}. Try again or upload another file.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Upload error",
	"cph-theme-ticket-fields.attachments.uploading": "Uploading {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Back",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.search-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}} upload failed"
};

var en150$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: en150
});

var enAu = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Choose a file or drag and drop here",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Drop files here",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "File: {{fileName}}, press delete to remove",
	"cph-theme-ticket-fields.attachments.remove-file": "Remove file",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Remove file: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Stop upload",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Stop uploading {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "There was an error uploading {{fileName}}. Try again or upload another file.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Upload error",
	"cph-theme-ticket-fields.attachments.uploading": "Uploading {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Back",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.search-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}} upload failed"
};

var enAu$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: enAu
});

var enCa = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Choose a file or drag and drop here",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Drop files here",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "File: {{fileName}}, press delete to remove",
	"cph-theme-ticket-fields.attachments.remove-file": "Remove file",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Remove file: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Stop upload",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Stop uploading {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "There was an error uploading {{fileName}}. Try again or upload another file.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Upload error",
	"cph-theme-ticket-fields.attachments.uploading": "Uploading {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Back",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.search-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}} upload failed"
};

var enCa$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: enCa
});

var enGb = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Choose a file or drag and drop here",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Drop files here",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "File: {{fileName}}, press delete to remove",
	"cph-theme-ticket-fields.attachments.remove-file": "Remove file",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Remove file: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Stop upload",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Stop uploading {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "There was an error uploading {{fileName}}. Try again or upload another file.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Upload error",
	"cph-theme-ticket-fields.attachments.uploading": "Uploading {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Back",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.search-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}} upload failed"
};

var enGb$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: enGb
});

var enMy = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Choose a file or drag and drop here",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Drop files here",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "File: {{fileName}}, press delete to remove",
	"cph-theme-ticket-fields.attachments.remove-file": "Remove file",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Remove file: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Stop upload",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Stop uploading {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "There was an error uploading {{fileName}}. Try again or upload another file.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Upload error",
	"cph-theme-ticket-fields.attachments.uploading": "Uploading {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Back",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.search-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}} upload failed"
};

var enMy$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: enMy
});

var enPh = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Choose a file or drag and drop here",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Drop files here",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "File: {{fileName}}, press delete to remove",
	"cph-theme-ticket-fields.attachments.remove-file": "Remove file",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Remove file: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Stop upload",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Stop uploading {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "There was an error uploading {{fileName}}. Try again or upload another file.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Upload error",
	"cph-theme-ticket-fields.attachments.uploading": "Uploading {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Back",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.search-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}} upload failed"
};

var enPh$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: enPh
});

var enSe = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Choose a file or drag and drop here",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Drop files here",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "File: {{fileName}}, press delete to remove",
	"cph-theme-ticket-fields.attachments.remove-file": "Remove file",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Remove file: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Stop upload",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Stop uploading {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "There was an error uploading {{fileName}}. Try again or upload another file.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Upload error",
	"cph-theme-ticket-fields.attachments.uploading": "Uploading {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Back",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.search-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}} upload failed"
};

var enSe$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: enSe
});

var enUs = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Choose a file or drag and drop here",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Drop files here",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "File: {{fileName}}, press delete to remove",
	"cph-theme-ticket-fields.attachments.remove-file": "Remove file",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Remove file: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Stop upload",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Stop uploading {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "There was an error uploading {{fileName}}. Try again or upload another file.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Upload error",
	"cph-theme-ticket-fields.attachments.uploading": "Uploading {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Back",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.search-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}} upload failed"
};

var enUs$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: enUs
});

var enXDev = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Choose a file or drag and drop here",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Drop files here",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "File: {{fileName}}, press delete to remove",
	"cph-theme-ticket-fields.attachments.remove-file": "Remove file",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Remove file: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Stop upload",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Stop uploading {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "There was an error uploading {{fileName}}. Try again or upload another file.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Upload error",
	"cph-theme-ticket-fields.attachments.uploading": "Uploading {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Back",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.search-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}} upload failed"
};

var enXDev$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: enXDev
});

var enXKeys = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "cph-theme-ticket-fields.attachments.choose-file-label",
	"cph-theme-ticket-fields.attachments.drop-files-label": "cph-theme-ticket-fields.attachments.drop-files-label",
	"cph-theme-ticket-fields.attachments.error-separator": "cph-theme-ticket-fields.attachments.error-separator",
	"cph-theme-ticket-fields.attachments.file": "cph-theme-ticket-fields.attachments.file",
	"cph-theme-ticket-fields.attachments.remove-file": "cph-theme-ticket-fields.attachments.remove-file",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "cph-theme-ticket-fields.attachments.remove-file-aria-label",
	"cph-theme-ticket-fields.attachments.stop-upload": "cph-theme-ticket-fields.attachments.stop-upload",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "cph-theme-ticket-fields.attachments.stop-upload-aria-label",
	"cph-theme-ticket-fields.attachments.upload-error-description": "cph-theme-ticket-fields.attachments.upload-error-description",
	"cph-theme-ticket-fields.attachments.upload-error-title": "cph-theme-ticket-fields.attachments.upload-error-title",
	"cph-theme-ticket-fields.attachments.uploading": "cph-theme-ticket-fields.attachments.uploading",
	"cph-theme-ticket-fields.credit-card-digits-hint": "cph-theme-ticket-fields.credit-card-digits-hint",
	"cph-theme-ticket-fields.dropdown.back-option-label": "cph-theme-ticket-fields.dropdown.back-option-label",
	"cph-theme-ticket-fields.dropdown.empty-option": "cph-theme-ticket-fields.dropdown.empty-option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "cph-theme-ticket-fields.lookup-field.loading-options",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "cph-theme-ticket-fields.lookup-field.no-matches-found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "cph-theme-ticket-fields.lookup-field.placeholder",
	"cph-theme-ticket-fields.search-field.no-matches-found": "cph-theme-ticket-fields.search-field.no-matches-found",
	"cph-theme-ticket-fields.search-field.placeholder": "cph-theme-ticket-fields.search-field.placeholder",
	"cph-theme-ticket-fields.upload-failed-title": "cph-theme-ticket-fields.upload-failed-title"
};

var enXKeys$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: enXKeys
});

var enXObsolete = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Choose a file or drag and drop here",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Drop files here",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "File: {{fileName}}, press delete to remove",
	"cph-theme-ticket-fields.attachments.remove-file": "Remove file",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Remove file: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Stop upload",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Stop uploading {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "There was an error uploading {{fileName}}. Try again or upload another file.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Upload error",
	"cph-theme-ticket-fields.attachments.uploading": "Uploading {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Back",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.search-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}} upload failed"
};

var enXObsolete$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: enXObsolete
});

var enXPseudo = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "[ผู้龍Ḉḥṓṓṓṓṡḛḛ αα ϝḭḭḽḛḛ ṓṓṛ ḍṛααḡ ααṇḍ ḍṛṓṓṗ ḥḛḛṛḛḛ龍ผู้]",
	"cph-theme-ticket-fields.attachments.drop-files-label": "[ผู้龍Ḍṛṓṓṗ ϝḭḭḽḛḛṡ ḥḛḛṛḛḛ龍ผู้]",
	"cph-theme-ticket-fields.attachments.error-separator": "[ผู้龍; 龍ผู้]",
	"cph-theme-ticket-fields.attachments.file": "[ผู้龍Ḟḭḭḽḛḛ: {{fileName}}, ṗṛḛḛṡṡ ḍḛḛḽḛḛṭḛḛ ṭṓṓ ṛḛḛṃṓṓṽḛḛ龍ผู้]",
	"cph-theme-ticket-fields.attachments.remove-file": "[ผู้龍Ṛḛḛṃṓṓṽḛḛ ϝḭḭḽḛḛ龍ผู้]",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "[ผู้龍Ṛḛḛṃṓṓṽḛḛ ϝḭḭḽḛḛ: {{fileName}}龍ผู้]",
	"cph-theme-ticket-fields.attachments.stop-upload": "[ผู้龍Ṣṭṓṓṗ ṵṵṗḽṓṓααḍ龍ผู้]",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "[ผู้龍Ṣṭṓṓṗ ṵṵṗḽṓṓααḍḭḭṇḡ {{fileName}}龍ผู้]",
	"cph-theme-ticket-fields.attachments.upload-error-description": "[ผู้龍Ṫḥḛḛṛḛḛ ẁααṡ ααṇ ḛḛṛṛṓṓṛ ṵṵṗḽṓṓααḍḭḭṇḡ {{fileName}}. Ṫṛẏẏ ααḡααḭḭṇ ṓṓṛ ṵṵṗḽṓṓααḍ ααṇṓṓṭḥḛḛṛ ϝḭḭḽḛḛ.龍ผู้]",
	"cph-theme-ticket-fields.attachments.upload-error-title": "[ผู้龍ṲṲṗḽṓṓααḍ ḛḛṛṛṓṓṛ龍ผู้]",
	"cph-theme-ticket-fields.attachments.uploading": "[ผู้龍ṲṲṗḽṓṓααḍḭḭṇḡ {{fileName}}龍ผู้]",
	"cph-theme-ticket-fields.credit-card-digits-hint": "[ผู้龍(Ḻααṡṭ 4 ḍḭḭḡḭḭṭṡ)龍ผู้]",
	"cph-theme-ticket-fields.dropdown.back-option-label": "[ผู้龍Ḃααͼḳ龍ผู้]",
	"cph-theme-ticket-fields.dropdown.empty-option": "[ผู้龍Ṣḛḛḽḛḛͼṭ ααṇ ṓṓṗṭḭḭṓṓṇ龍ผู้]",
	"cph-theme-ticket-fields.lookup-field.loading-options": "[ผู้龍Ḻṓṓααḍḭḭṇḡ ḭḭṭḛḛṃṡ...龍ผู้]",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "[ผู้龍Ṅṓṓ ṃααṭͼḥḛḛṡ ϝṓṓṵṵṇḍ龍ผู้]",
	"cph-theme-ticket-fields.lookup-field.placeholder": "[ผู้龍Ṣḛḛααṛͼḥ {{label}}龍ผู้]",
	"cph-theme-ticket-fields.search-field.no-matches-found": "[ผู้龍Ṅṓṓ ṃααṭͼḥḛḛṡ ϝṓṓṵṵṇḍ龍ผู้]",
	"cph-theme-ticket-fields.search-field.placeholder": "[ผู้龍Ṣḛḛααṛͼḥ {{label}}龍ผู้]",
	"cph-theme-ticket-fields.upload-failed-title": "[ผู้龍{{fileName}} ṵṵṗḽṓṓααḍ ϝααḭḭḽḛḛḍ龍ผู้]"
};

var enXPseudo$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: enXPseudo
});

var enXTest = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Choose a file or drag and drop here",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Drop files here",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "File: {{fileName}}, press delete to remove",
	"cph-theme-ticket-fields.attachments.remove-file": "Remove file",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Remove file: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Stop upload",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Stop uploading {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "There was an error uploading {{fileName}}. Try again or upload another file.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Upload error",
	"cph-theme-ticket-fields.attachments.uploading": "Uploading {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Back",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.search-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}} upload failed"
};

var enXTest$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: enXTest
});

var es419 = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Elegir un archivo o arrastrar y soltar uno aquí",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Soltar los archivos aquí",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "Archivo: {{fileName}} presione Borrar para eliminar",
	"cph-theme-ticket-fields.attachments.remove-file": "Eliminar archivo",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Eliminar archivo: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Detener carga",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Dejar de cargar {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "Hubo un error al cargar {{fileName}}. Vuelva a intentarlo o cargue otro archivo.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Error de carga",
	"cph-theme-ticket-fields.attachments.uploading": "Cargando {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Últimos 4 dígitos)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Atrás",
	"cph-theme-ticket-fields.dropdown.empty-option": "Seleccione una opción",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Cargando elementos...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No se encontraron coincidencias",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Buscar {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No se encontraron coincidencias",
	"cph-theme-ticket-fields.search-field.placeholder": "Buscar {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "Falló la carga de {{fileName}}"
};

var es419$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: es419
});

var esAr = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Elegir un archivo o arrastrar y soltar uno aquí",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Soltar los archivos aquí",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "Archivo: {{fileName}} presione Borrar para eliminar",
	"cph-theme-ticket-fields.attachments.remove-file": "Eliminar archivo",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Eliminar archivo: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Detener carga",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Dejar de cargar {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "Hubo un error al cargar {{fileName}}. Vuelva a intentarlo o cargue otro archivo.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Error de carga",
	"cph-theme-ticket-fields.attachments.uploading": "Cargando {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Últimos 4 dígitos)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Atrás",
	"cph-theme-ticket-fields.dropdown.empty-option": "Seleccione una opción",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Cargando elementos...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No se encontraron coincidencias",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Buscar {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No se encontraron coincidencias",
	"cph-theme-ticket-fields.search-field.placeholder": "Buscar {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "Falló la carga de {{fileName}}"
};

var esAr$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: esAr
});

var esCl = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Elegir un archivo o arrastrar y soltar uno aquí",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Soltar los archivos aquí",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "Archivo: {{fileName}} presione Borrar para eliminar",
	"cph-theme-ticket-fields.attachments.remove-file": "Eliminar archivo",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Eliminar archivo: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Detener carga",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Dejar de cargar {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "Hubo un error al cargar {{fileName}}. Vuelva a intentarlo o cargue otro archivo.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Error de carga",
	"cph-theme-ticket-fields.attachments.uploading": "Cargando {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Últimos 4 dígitos)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Atrás",
	"cph-theme-ticket-fields.dropdown.empty-option": "Seleccione una opción",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Cargando elementos...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No se encontraron coincidencias",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Buscar {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No se encontraron coincidencias",
	"cph-theme-ticket-fields.search-field.placeholder": "Buscar {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "Falló la carga de {{fileName}}"
};

var esCl$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: esCl
});

var esEs = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Elegir un archivo o arrastrar y soltar uno aquí",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Soltar los archivos aquí",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "Archivo: {{fileName}} presione Borrar para eliminar",
	"cph-theme-ticket-fields.attachments.remove-file": "Eliminar archivo",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Eliminar archivo: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Detener carga",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Dejar de cargar {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "Hubo un error al cargar {{fileName}}. Vuelva a intentarlo o cargue otro archivo.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Error de carga",
	"cph-theme-ticket-fields.attachments.uploading": "Cargando {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Últimos 4 dígitos)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Atrás",
	"cph-theme-ticket-fields.dropdown.empty-option": "Seleccione una opción",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Cargando elementos...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No se encontraron coincidencias",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Buscar {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No se encontraron coincidencias",
	"cph-theme-ticket-fields.search-field.placeholder": "Buscar {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "Falló la carga de {{fileName}}"
};

var esEs$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: esEs
});

var esMx = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Elegir un archivo o arrastrar y soltar uno aquí",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Soltar los archivos aquí",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "Archivo: {{fileName}} presione Borrar para eliminar",
	"cph-theme-ticket-fields.attachments.remove-file": "Eliminar archivo",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Eliminar archivo: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Detener carga",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Dejar de cargar {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "Hubo un error al cargar {{fileName}}. Vuelva a intentarlo o cargue otro archivo.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Error de carga",
	"cph-theme-ticket-fields.attachments.uploading": "Cargando {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Últimos 4 dígitos)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Atrás",
	"cph-theme-ticket-fields.dropdown.empty-option": "Seleccione una opción",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Cargando elementos...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No se encontraron coincidencias",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Buscar {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No se encontraron coincidencias",
	"cph-theme-ticket-fields.search-field.placeholder": "Buscar {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "Falló la carga de {{fileName}}"
};

var esMx$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: esMx
});

var esPe = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Elegir un archivo o arrastrar y soltar uno aquí",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Soltar los archivos aquí",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "Archivo: {{fileName}} presione Borrar para eliminar",
	"cph-theme-ticket-fields.attachments.remove-file": "Eliminar archivo",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Eliminar archivo: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Detener carga",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Dejar de cargar {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "Hubo un error al cargar {{fileName}}. Vuelva a intentarlo o cargue otro archivo.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Error de carga",
	"cph-theme-ticket-fields.attachments.uploading": "Cargando {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Últimos 4 dígitos)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Atrás",
	"cph-theme-ticket-fields.dropdown.empty-option": "Seleccione una opción",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Cargando elementos...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No se encontraron coincidencias",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Buscar {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No se encontraron coincidencias",
	"cph-theme-ticket-fields.search-field.placeholder": "Buscar {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "Falló la carga de {{fileName}}"
};

var esPe$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: esPe
});

var es = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Elegir un archivo o arrastrar y soltar uno aquí",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Soltar los archivos aquí",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "Archivo: {{fileName}} presione Borrar para eliminar",
	"cph-theme-ticket-fields.attachments.remove-file": "Eliminar archivo",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Eliminar archivo: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Detener carga",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Dejar de cargar {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "Hubo un error al cargar {{fileName}}. Vuelva a intentarlo o cargue otro archivo.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Error de carga",
	"cph-theme-ticket-fields.attachments.uploading": "Cargando {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Últimos 4 dígitos)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Atrás",
	"cph-theme-ticket-fields.dropdown.empty-option": "Seleccione una opción",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Cargando elementos...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No se encontraron coincidencias",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Buscar {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No se encontraron coincidencias",
	"cph-theme-ticket-fields.search-field.placeholder": "Buscar {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "Falló la carga de {{fileName}}"
};

var es$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: es
});

var et = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Choose a file or drag and drop here",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Drop files here",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "File: {{fileName}}, press delete to remove",
	"cph-theme-ticket-fields.attachments.remove-file": "Remove file",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Remove file: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Stop upload",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Stop uploading {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "There was an error uploading {{fileName}}. Try again or upload another file.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Upload error",
	"cph-theme-ticket-fields.attachments.uploading": "Uploading {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Back",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.search-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}} upload failed"
};

var et$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: et
});

var eu = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Elegir un archivo o arrastrar y soltar uno aquí",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Soltar los archivos aquí",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "Archivo: {{fileName}} presione Borrar para eliminar",
	"cph-theme-ticket-fields.attachments.remove-file": "Eliminar archivo",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Eliminar archivo: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Detener carga",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Dejar de cargar {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "Hubo un error al cargar {{fileName}}. Vuelva a intentarlo o cargue otro archivo.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Error de carga",
	"cph-theme-ticket-fields.attachments.uploading": "Cargando {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Últimos 4 dígitos)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Atrás",
	"cph-theme-ticket-fields.dropdown.empty-option": "Seleccione una opción",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Cargando elementos...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No se encontraron coincidencias",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Buscar {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No se encontraron coincidencias",
	"cph-theme-ticket-fields.search-field.placeholder": "Buscar {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "Falló la carga de {{fileName}}"
};

var eu$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: eu
});

var faAf = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Choose a file or drag and drop here",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Drop files here",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "File: {{fileName}}, press delete to remove",
	"cph-theme-ticket-fields.attachments.remove-file": "Remove file",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Remove file: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Stop upload",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Stop uploading {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "There was an error uploading {{fileName}}. Try again or upload another file.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Upload error",
	"cph-theme-ticket-fields.attachments.uploading": "Uploading {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Back",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.search-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}} upload failed"
};

var faAf$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: faAf
});

var fa = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Choose a file or drag and drop here",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Drop files here",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "File: {{fileName}}, press delete to remove",
	"cph-theme-ticket-fields.attachments.remove-file": "Remove file",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Remove file: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Stop upload",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Stop uploading {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "There was an error uploading {{fileName}}. Try again or upload another file.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Upload error",
	"cph-theme-ticket-fields.attachments.uploading": "Uploading {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Back",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.search-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}} upload failed"
};

var fa$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: fa
});

var fi = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Valitse tiedosto tai vedä ja pudota se tähän",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Pudota tiedostot tähän",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "Tiedosto: {{fileName}}, poista painamalla Poista-painiketta",
	"cph-theme-ticket-fields.attachments.remove-file": "Poista tiedosto",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Poista tiedosto: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Lopeta lataaminen",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Lopeta tiedoston {{fileName}} lataaminen",
	"cph-theme-ticket-fields.attachments.upload-error-description": "Virhe ladattaessa tiedostoa {{fileName}}. Yritä uudelleen tai lataa toinen tiedosto.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Latausvirhe",
	"cph-theme-ticket-fields.attachments.uploading": "Ladataan tiedostoa {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(4 viimeistä numeroa)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Takaisin",
	"cph-theme-ticket-fields.dropdown.empty-option": "Valitse vaihtoehto",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Ladataan kohteita...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Vastineita ei löytynyt",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Hae {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "Vastineita ei löytynyt",
	"cph-theme-ticket-fields.search-field.placeholder": "Hae {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "Tiedoston {{fileName}} lataus epäonnistui"
};

var fi$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: fi
});

var fil = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Choose a file or drag and drop here",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Drop files here",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "File: {{fileName}}, press delete to remove",
	"cph-theme-ticket-fields.attachments.remove-file": "Remove file",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Remove file: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Stop upload",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Stop uploading {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "There was an error uploading {{fileName}}. Try again or upload another file.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Upload error",
	"cph-theme-ticket-fields.attachments.uploading": "Uploading {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Back",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.search-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}} upload failed"
};

var fil$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: fil
});

var fo = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Choose a file or drag and drop here",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Drop files here",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "File: {{fileName}}, press delete to remove",
	"cph-theme-ticket-fields.attachments.remove-file": "Remove file",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Remove file: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Stop upload",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Stop uploading {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "There was an error uploading {{fileName}}. Try again or upload another file.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Upload error",
	"cph-theme-ticket-fields.attachments.uploading": "Uploading {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Back",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.search-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}} upload failed"
};

var fo$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: fo
});

var frCa = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Choisissez un fichier ou faites glisser et déposez ici",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Déposez les fichiers ici",
	"cph-theme-ticket-fields.attachments.error-separator": ";",
	"cph-theme-ticket-fields.attachments.file": "Fichier : {{fileName}}, appuyez sur supprimer pour le retirer",
	"cph-theme-ticket-fields.attachments.remove-file": "Supprimer le fichier",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Supprimer le fichier : {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Arrêter le chargement",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Arrêter le téléversement de {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "Une erreur est survenue lors du téléversement de {{fileName}}. Réessayez ou téléversez un autre fichier.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Erreur de téléversement",
	"cph-theme-ticket-fields.attachments.uploading": "Téléversement de {{fileName}} en cours…",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(4 derniers chiffres)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Retour",
	"cph-theme-ticket-fields.dropdown.empty-option": "Sélectionnez une option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Chargement des éléments en cours...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Aucun résultat",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Rechercher {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "Aucun résultat",
	"cph-theme-ticket-fields.search-field.placeholder": "Rechercher {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "Échec du téléversement de {{fileName}}"
};

var frCa$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: frCa
});

var frDz = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Choisir un fichier ou glisser-déposer ici",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Déposer les fichiers ici",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "Fichier : {{fileName}}, appuyez sur Supprimer pour le supprimer",
	"cph-theme-ticket-fields.attachments.remove-file": "Supprimer le fichier",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Supprimer le fichier : {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Arrêter le chargement",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Arrêter le chargement de {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "Une erreur est survenue lors du chargement de {{fileName}}. Réessayez ou chargez un autre fichier.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Erreur de chargement",
	"cph-theme-ticket-fields.attachments.uploading": "Chargement du fichier {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(4 derniers chiffres)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Retour",
	"cph-theme-ticket-fields.dropdown.empty-option": "Sélectionner une option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Chargement des éléments...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Aucun résultat",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Rechercher {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "Aucune correspondance trouvée",
	"cph-theme-ticket-fields.search-field.placeholder": "Rechercher {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "Échec du chargement de {{fileName}}"
};

var frDz$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: frDz
});

var frMu = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Choisir un fichier ou glisser-déposer ici",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Déposer les fichiers ici",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "Fichier : {{fileName}}, appuyez sur Supprimer pour le supprimer",
	"cph-theme-ticket-fields.attachments.remove-file": "Supprimer le fichier",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Supprimer le fichier : {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Arrêter le chargement",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Arrêter le chargement de {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "Une erreur est survenue lors du chargement de {{fileName}}. Réessayez ou chargez un autre fichier.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Erreur de chargement",
	"cph-theme-ticket-fields.attachments.uploading": "Chargement du fichier {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(4 derniers chiffres)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Retour",
	"cph-theme-ticket-fields.dropdown.empty-option": "Sélectionner une option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Chargement des éléments...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Aucun résultat",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Rechercher {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "Aucune correspondance trouvée",
	"cph-theme-ticket-fields.search-field.placeholder": "Rechercher {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "Échec du chargement de {{fileName}}"
};

var frMu$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: frMu
});

var fr = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Choisir un fichier ou glisser-déposer ici",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Déposer les fichiers ici",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "Fichier : {{fileName}}, appuyez sur Supprimer pour le supprimer",
	"cph-theme-ticket-fields.attachments.remove-file": "Supprimer le fichier",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Supprimer le fichier : {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Arrêter le chargement",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Arrêter le chargement de {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "Une erreur est survenue lors du chargement de {{fileName}}. Réessayez ou chargez un autre fichier.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Erreur de chargement",
	"cph-theme-ticket-fields.attachments.uploading": "Chargement du fichier {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(4 derniers chiffres)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Retour",
	"cph-theme-ticket-fields.dropdown.empty-option": "Sélectionner une option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Chargement des éléments...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Aucun résultat",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Rechercher {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "Aucune correspondance trouvée",
	"cph-theme-ticket-fields.search-field.placeholder": "Rechercher {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "Échec du chargement de {{fileName}}"
};

var fr$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: fr
});

var ga = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Choose a file or drag and drop here",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Drop files here",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "File: {{fileName}}, press delete to remove",
	"cph-theme-ticket-fields.attachments.remove-file": "Remove file",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Remove file: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Stop upload",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Stop uploading {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "There was an error uploading {{fileName}}. Try again or upload another file.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Upload error",
	"cph-theme-ticket-fields.attachments.uploading": "Uploading {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Back",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.search-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}} upload failed"
};

var ga$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: ga
});

var he = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "בחר קובץ או גרור ושחרר כאן",
	"cph-theme-ticket-fields.attachments.drop-files-label": "שחרר את הקבצים כאן",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "קובץ: {{fileName}}, הקש Delete כדי להסיר",
	"cph-theme-ticket-fields.attachments.remove-file": "הסר קובץ",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "הסר קובץ: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "עצור העלאה",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "הפסק את ההעלאה של {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "אירעה שגיאה בהעלאת הקובץ {{fileName}}. נסה שוב או העלה קובץ אחר.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "שגיאת העלאה",
	"cph-theme-ticket-fields.attachments.uploading": "מעלה את {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(4 הספרות האחרונות)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "הקודם",
	"cph-theme-ticket-fields.dropdown.empty-option": "בחר אפשרות",
	"cph-theme-ticket-fields.lookup-field.loading-options": "טוען פריטים...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "לא נמצאו התאמות",
	"cph-theme-ticket-fields.lookup-field.placeholder": "חיפוש {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "לא נמצאו התאמות",
	"cph-theme-ticket-fields.search-field.placeholder": "חיפוש {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "ההעלאה של {{fileName}} נכשלה"
};

var he$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: he
});

var hi = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "कोई फ़ाइल चुनें या यहां खींचें और छोड़ें",
	"cph-theme-ticket-fields.attachments.drop-files-label": "फाइलों को यहां छोड़ें",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "फ़ाइल: {{fileName}}, हटाने के लिए डिलीट दबाएँ",
	"cph-theme-ticket-fields.attachments.remove-file": "फ़ाइल हटाएँ",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "फ़ाइल हटाएँ: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "अपलोड बंद करें",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "{{fileName}} को अपलोड करना बंद करें",
	"cph-theme-ticket-fields.attachments.upload-error-description": "{{fileName}}अपलोड करने में कोई त्रुटि थी। पुनः प्रयास करें या कोई अन्य फ़ाइल अपलोड करें।",
	"cph-theme-ticket-fields.attachments.upload-error-title": "त्रुटि अपलोड करें",
	"cph-theme-ticket-fields.attachments.uploading": "{{fileName}} अपलोड हो रहा है",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(आखिरी 4 अक्षर)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "पीछे",
	"cph-theme-ticket-fields.dropdown.empty-option": "कोई विकल्प चुनें",
	"cph-theme-ticket-fields.lookup-field.loading-options": "आइटम लोड हो रहे हैं...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "कोई मिलान नहीं मिले",
	"cph-theme-ticket-fields.lookup-field.placeholder": "खोज {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "कोई मिलान नहीं मिले",
	"cph-theme-ticket-fields.search-field.placeholder": "{{label}} खोजें",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}} को अपलोड करना विफ़ल रहा"
};

var hi$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: hi
});

var hr = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Choose a file or drag and drop here",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Drop files here",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "File: {{fileName}}, press delete to remove",
	"cph-theme-ticket-fields.attachments.remove-file": "Remove file",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Remove file: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Stop upload",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Stop uploading {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "There was an error uploading {{fileName}}. Try again or upload another file.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Upload error",
	"cph-theme-ticket-fields.attachments.uploading": "Uploading {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Back",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.search-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}} upload failed"
};

var hr$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: hr
});

var hu = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Válassza ki vagy húzza ide a kívánt fájlt",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Húzza ide a fájlokat",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "Fájl: {{fileName}}, az eltávolításához nyomja meg a Delete billentyűt",
	"cph-theme-ticket-fields.attachments.remove-file": "Fájl eltávolítása",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Fájl eltávolítása: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Feltöltés leállítása",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "{{fileName}} feltöltésének leállítása",
	"cph-theme-ticket-fields.attachments.upload-error-description": "Hiba történt a(z) {{fileName}} feltöltése során. Próbálja meg újra, vagy töltsön fel egy másik fájlt.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Feltöltési hiba",
	"cph-theme-ticket-fields.attachments.uploading": "{{fileName}} feltöltése folyamatban",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Utolsó négy számjegy)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Vissza",
	"cph-theme-ticket-fields.dropdown.empty-option": "Lehetőség kiválasztása",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Elemek betöltése…",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Nincs találat",
	"cph-theme-ticket-fields.lookup-field.placeholder": "{{label}} keresése",
	"cph-theme-ticket-fields.search-field.no-matches-found": "Nincs találat",
	"cph-theme-ticket-fields.search-field.placeholder": "{{label}} keresése",
	"cph-theme-ticket-fields.upload-failed-title": "A(z) {{fileName}} feltöltése sikertelen volt"
};

var hu$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: hu
});

var hy = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Choose a file or drag and drop here",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Drop files here",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "File: {{fileName}}, press delete to remove",
	"cph-theme-ticket-fields.attachments.remove-file": "Remove file",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Remove file: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Stop upload",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Stop uploading {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "There was an error uploading {{fileName}}. Try again or upload another file.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Upload error",
	"cph-theme-ticket-fields.attachments.uploading": "Uploading {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Back",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.search-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}} upload failed"
};

var hy$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: hy
});

var id = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Pilih file atau tarik dan letakkan di sini",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Letakkan file di sini",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "File: {{fileName}}, tekan hapus untuk menghapus",
	"cph-theme-ticket-fields.attachments.remove-file": "Hapus file",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Hapus File: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Berhenti mengunggah",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Berhenti mengunggah {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "Terjadi kesalahan saat mengunggah {{fileName}}. Cobalah lagi atau unggah file lain.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Kesalahan Mengunggah",
	"cph-theme-ticket-fields.attachments.uploading": "Mengunggah {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(4 digit terakhir)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Kembali",
	"cph-theme-ticket-fields.dropdown.empty-option": "Pilih opsi",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Memuat item...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Tidak ditemukan kecocokan",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Cari {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "Tidak ditemukan kecocokan",
	"cph-theme-ticket-fields.search-field.placeholder": "Cari {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}} unggahan gagal"
};

var id$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: id
});

var is = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Choose a file or drag and drop here",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Drop files here",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "File: {{fileName}}, press delete to remove",
	"cph-theme-ticket-fields.attachments.remove-file": "Remove file",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Remove file: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Stop upload",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Stop uploading {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "There was an error uploading {{fileName}}. Try again or upload another file.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Upload error",
	"cph-theme-ticket-fields.attachments.uploading": "Uploading {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Back",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.search-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}} upload failed"
};

var is$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: is
});

var itCh = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Scegli un file o trascinalo qui",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Trascina qui i file",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "File: {{fileName}}, premi Canc per rimuoverlo",
	"cph-theme-ticket-fields.attachments.remove-file": "Rimuovi file",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Rimuovi file: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Interrompi caricamento",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Interrompi il caricamento di {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "Errore durante il caricamento di {{fileName}}. Riprova o carica un altro file.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Errore nel caricamento",
	"cph-theme-ticket-fields.attachments.uploading": "Caricamento di {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Ultime 4 cifre)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Indietro",
	"cph-theme-ticket-fields.dropdown.empty-option": "Seleziona un’opzione",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Caricamento elementi in corso...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Nessuna corrispondenza trovata",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Cerca {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "Nessuna corrispondenza trovata",
	"cph-theme-ticket-fields.search-field.placeholder": "Cerca {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "Caricamento di {{fileName}} non riuscito"
};

var itCh$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: itCh
});

var it = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Scegli un file o trascinalo qui",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Trascina qui i file",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "File: {{fileName}}, premi Canc per rimuoverlo",
	"cph-theme-ticket-fields.attachments.remove-file": "Rimuovi file",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Rimuovi file: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Interrompi caricamento",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Interrompi il caricamento di {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "Errore durante il caricamento di {{fileName}}. Riprova o carica un altro file.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Errore nel caricamento",
	"cph-theme-ticket-fields.attachments.uploading": "Caricamento di {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Ultime 4 cifre)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Indietro",
	"cph-theme-ticket-fields.dropdown.empty-option": "Seleziona un’opzione",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Caricamento elementi in corso...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Nessuna corrispondenza trovata",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Cerca {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "Nessuna corrispondenza trovata",
	"cph-theme-ticket-fields.search-field.placeholder": "Cerca {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "Caricamento di {{fileName}} non riuscito"
};

var it$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: it
});

var ja = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "ファイルを選択するか、ここにドラッグ＆ドロップします",
	"cph-theme-ticket-fields.attachments.drop-files-label": "ファイルをここにドロップ",
	"cph-theme-ticket-fields.attachments.error-separator": "また、 ",
	"cph-theme-ticket-fields.attachments.file": "ファイル：{{fileName}}、Deleteキーを押して削除",
	"cph-theme-ticket-fields.attachments.remove-file": "ファイルを削除",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "ファイルを削除：{{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "アップロードを停止",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "{{fileName}}のアップロードを停止",
	"cph-theme-ticket-fields.attachments.upload-error-description": "{{fileName}}のアップロード中にエラーが発生しました。もう一度やり直すか、別のファイルをアップロードしてください。",
	"cph-theme-ticket-fields.attachments.upload-error-title": "アップロードエラー",
	"cph-theme-ticket-fields.attachments.uploading": "{{fileName}}をアップロード中",
	"cph-theme-ticket-fields.credit-card-digits-hint": "（下4桁）",
	"cph-theme-ticket-fields.dropdown.back-option-label": "戻る",
	"cph-theme-ticket-fields.dropdown.empty-option": "オプションを選択",
	"cph-theme-ticket-fields.lookup-field.loading-options": "アイテムを読み込んでいます...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "一致するものが見つかりません",
	"cph-theme-ticket-fields.lookup-field.placeholder": "{{label}}を検索",
	"cph-theme-ticket-fields.search-field.no-matches-found": "一致するものがありません",
	"cph-theme-ticket-fields.search-field.placeholder": "{{label}}を検索",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}}をアップロードできませんでした"
};

var ja$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: ja
});

var ka = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Choose a file or drag and drop here",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Drop files here",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "File: {{fileName}}, press delete to remove",
	"cph-theme-ticket-fields.attachments.remove-file": "Remove file",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Remove file: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Stop upload",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Stop uploading {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "There was an error uploading {{fileName}}. Try again or upload another file.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Upload error",
	"cph-theme-ticket-fields.attachments.uploading": "Uploading {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Back",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.search-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}} upload failed"
};

var ka$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: ka
});

var kk = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Choose a file or drag and drop here",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Drop files here",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "File: {{fileName}}, press delete to remove",
	"cph-theme-ticket-fields.attachments.remove-file": "Remove file",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Remove file: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Stop upload",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Stop uploading {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "There was an error uploading {{fileName}}. Try again or upload another file.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Upload error",
	"cph-theme-ticket-fields.attachments.uploading": "Uploading {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Back",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.search-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}} upload failed"
};

var kk$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: kk
});

var klDk = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Choose a file or drag and drop here",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Drop files here",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "File: {{fileName}}, press delete to remove",
	"cph-theme-ticket-fields.attachments.remove-file": "Remove file",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Remove file: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Stop upload",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Stop uploading {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "There was an error uploading {{fileName}}. Try again or upload another file.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Upload error",
	"cph-theme-ticket-fields.attachments.uploading": "Uploading {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Back",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.search-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}} upload failed"
};

var klDk$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: klDk
});

var km = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Choose a file or drag and drop here",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Drop files here",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "File: {{fileName}}, press delete to remove",
	"cph-theme-ticket-fields.attachments.remove-file": "Remove file",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Remove file: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Stop upload",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Stop uploading {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "There was an error uploading {{fileName}}. Try again or upload another file.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Upload error",
	"cph-theme-ticket-fields.attachments.uploading": "Uploading {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Back",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.search-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}} upload failed"
};

var km$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: km
});

var ko = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "파일을 선택하거나 여기에 드래그 앤 드롭하세요",
	"cph-theme-ticket-fields.attachments.drop-files-label": "파일을 여기에 드롭하세요",
	"cph-theme-ticket-fields.attachments.error-separator": ". ",
	"cph-theme-ticket-fields.attachments.file": "파일: {{fileName}}, 제거하려면 delete 키를 누르세요.",
	"cph-theme-ticket-fields.attachments.remove-file": "파일 제거",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "파일 제거: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "업로드 중지",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "{{fileName}} 업로드 중지",
	"cph-theme-ticket-fields.attachments.upload-error-description": "{{fileName}}을(를) 업로드하는 중 오류가 발생했습니다. 다시 시도하거나 다른 파일을 업로드하세요.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "업로드 오류",
	"cph-theme-ticket-fields.attachments.uploading": "{{fileName}} 업로드 중",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(마지막 4자리)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "뒤로",
	"cph-theme-ticket-fields.dropdown.empty-option": "옵션 선택",
	"cph-theme-ticket-fields.lookup-field.loading-options": "항목 로드 중...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "일치 항목을 찾지 못함",
	"cph-theme-ticket-fields.lookup-field.placeholder": "{{label}} 검색",
	"cph-theme-ticket-fields.search-field.no-matches-found": "일치하는 항목 없음",
	"cph-theme-ticket-fields.search-field.placeholder": "{{label}} 검색",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}} 업로드 실패"
};

var ko$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: ko
});

var ku = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Choose a file or drag and drop here",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Drop files here",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "File: {{fileName}}, press delete to remove",
	"cph-theme-ticket-fields.attachments.remove-file": "Remove file",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Remove file: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Stop upload",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Stop uploading {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "There was an error uploading {{fileName}}. Try again or upload another file.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Upload error",
	"cph-theme-ticket-fields.attachments.uploading": "Uploading {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Back",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.search-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}} upload failed"
};

var ku$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: ku
});

var ky = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Choose a file or drag and drop here",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Drop files here",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "File: {{fileName}}, press delete to remove",
	"cph-theme-ticket-fields.attachments.remove-file": "Remove file",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Remove file: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Stop upload",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Stop uploading {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "There was an error uploading {{fileName}}. Try again or upload another file.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Upload error",
	"cph-theme-ticket-fields.attachments.uploading": "Uploading {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Back",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.search-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}} upload failed"
};

var ky$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: ky
});

var lt = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Choose a file or drag and drop here",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Drop files here",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "File: {{fileName}}, press delete to remove",
	"cph-theme-ticket-fields.attachments.remove-file": "Remove file",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Remove file: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Stop upload",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Stop uploading {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "There was an error uploading {{fileName}}. Try again or upload another file.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Upload error",
	"cph-theme-ticket-fields.attachments.uploading": "Uploading {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Paskutiniai 4 skaitmenys)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Back",
	"cph-theme-ticket-fields.dropdown.empty-option": "Pasirinkti parinktį",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Įkeliami elementai...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Rungtynių nerasta",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Ieškoti {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.search-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}} upload failed"
};

var lt$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: lt
});

var lv = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Choose a file or drag and drop here",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Drop files here",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "File: {{fileName}}, press delete to remove",
	"cph-theme-ticket-fields.attachments.remove-file": "Remove file",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Remove file: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Stop upload",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Stop uploading {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "There was an error uploading {{fileName}}. Try again or upload another file.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Upload error",
	"cph-theme-ticket-fields.attachments.uploading": "Uploading {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Back",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.search-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}} upload failed"
};

var lv$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: lv
});

var mk = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Choose a file or drag and drop here",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Drop files here",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "File: {{fileName}}, press delete to remove",
	"cph-theme-ticket-fields.attachments.remove-file": "Remove file",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Remove file: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Stop upload",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Stop uploading {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "There was an error uploading {{fileName}}. Try again or upload another file.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Upload error",
	"cph-theme-ticket-fields.attachments.uploading": "Uploading {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Back",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.search-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}} upload failed"
};

var mk$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: mk
});

var mn = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Choose a file or drag and drop here",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Drop files here",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "File: {{fileName}}, press delete to remove",
	"cph-theme-ticket-fields.attachments.remove-file": "Remove file",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Remove file: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Stop upload",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Stop uploading {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "There was an error uploading {{fileName}}. Try again or upload another file.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Upload error",
	"cph-theme-ticket-fields.attachments.uploading": "Uploading {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Back",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.search-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}} upload failed"
};

var mn$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: mn
});

var ms = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Choose a file or drag and drop here",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Drop files here",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "File: {{fileName}}, press delete to remove",
	"cph-theme-ticket-fields.attachments.remove-file": "Remove file",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Remove file: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Stop upload",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Stop uploading {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "There was an error uploading {{fileName}}. Try again or upload another file.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Upload error",
	"cph-theme-ticket-fields.attachments.uploading": "Uploading {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Back",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.search-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}} upload failed"
};

var ms$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: ms
});

var mt = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Choose a file or drag and drop here",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Drop files here",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "File: {{fileName}}, press delete to remove",
	"cph-theme-ticket-fields.attachments.remove-file": "Remove file",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Remove file: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Stop upload",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Stop uploading {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "There was an error uploading {{fileName}}. Try again or upload another file.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Upload error",
	"cph-theme-ticket-fields.attachments.uploading": "Uploading {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Back",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.search-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}} upload failed"
};

var mt$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: mt
});

var my = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Choose a file or drag and drop here",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Drop files here",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "File: {{fileName}}, press delete to remove",
	"cph-theme-ticket-fields.attachments.remove-file": "Remove file",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Remove file: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Stop upload",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Stop uploading {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "There was an error uploading {{fileName}}. Try again or upload another file.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Upload error",
	"cph-theme-ticket-fields.attachments.uploading": "Uploading {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Back",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.search-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}} upload failed"
};

var my$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: my
});

var ne = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Choose a file or drag and drop here",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Drop files here",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "File: {{fileName}}, press delete to remove",
	"cph-theme-ticket-fields.attachments.remove-file": "Remove file",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Remove file: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Stop upload",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Stop uploading {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "There was an error uploading {{fileName}}. Try again or upload another file.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Upload error",
	"cph-theme-ticket-fields.attachments.uploading": "Uploading {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Back",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.search-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}} upload failed"
};

var ne$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: ne
});

var nlBe = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Kies een bestand of sleep en zet het hier neer",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Zet bestanden hier neer",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "Bestand: {{fileName}}, druk op Delete om te verwijderen",
	"cph-theme-ticket-fields.attachments.remove-file": "Bestand verwijderen",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Bestand {{fileName}} verwijderen",
	"cph-theme-ticket-fields.attachments.stop-upload": "Upload stoppen",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Stoppen met uploaden van {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "Fout tijdens uploaden van {{fileName}}. Probeer het opnieuw of upload een ander bestand.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Fout bij uploaden",
	"cph-theme-ticket-fields.attachments.uploading": "{{fileName}} wordt geüpload",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Laatste 4 cijfers)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Terug",
	"cph-theme-ticket-fields.dropdown.empty-option": "Selecteer een optie",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Items laden...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Geen overeenkomsten gevonden",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Zoek in {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "Geen overeenkomsten gevonden",
	"cph-theme-ticket-fields.search-field.placeholder": "Zoek in {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "Upload van {{fileName}} mislukt"
};

var nlBe$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: nlBe
});

var nl = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Kies een bestand of sleep en zet het hier neer",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Zet bestanden hier neer",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "Bestand: {{fileName}}, druk op Delete om te verwijderen",
	"cph-theme-ticket-fields.attachments.remove-file": "Bestand verwijderen",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Bestand {{fileName}} verwijderen",
	"cph-theme-ticket-fields.attachments.stop-upload": "Upload stoppen",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Stoppen met uploaden van {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "Fout tijdens uploaden van {{fileName}}. Probeer het opnieuw of upload een ander bestand.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Fout bij uploaden",
	"cph-theme-ticket-fields.attachments.uploading": "{{fileName}} wordt geüpload",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Laatste 4 cijfers)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Terug",
	"cph-theme-ticket-fields.dropdown.empty-option": "Selecteer een optie",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Items laden...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Geen overeenkomsten gevonden",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Zoek in {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "Geen overeenkomsten gevonden",
	"cph-theme-ticket-fields.search-field.placeholder": "Zoek in {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "Upload van {{fileName}} mislukt"
};

var nl$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: nl
});

var no = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Velg en fil eller dra og slipp her",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Slipp filer her",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "Fil: {{fileName}}, trykk på Slett for å fjerne",
	"cph-theme-ticket-fields.attachments.remove-file": "Fjern fil",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Fjern fil: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Stopp opplasting",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Stopp opplasting av {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "Det oppsto en feil under opplasting av {{fileName}}. Prøv på nytt, eller last opp en annen fil.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Opplastingsfeil",
	"cph-theme-ticket-fields.attachments.uploading": "Laster opp {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(4 siste sifre)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Tilbake",
	"cph-theme-ticket-fields.dropdown.empty-option": "Velg et alternativ",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Laster inn elementer ...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Fant ingen samsvarende",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Søk {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "Fant ingen samsvar",
	"cph-theme-ticket-fields.search-field.placeholder": "Søk etter {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "Opplasting av {{fileName}} mislyktes"
};

var no$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: no
});

var pl = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Wybierz plik lub przeciągnij i upuść go tutaj",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Upuść pliki tutaj",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "Plik: {{fileName}}, naciśnij Usuń, aby go usunąć",
	"cph-theme-ticket-fields.attachments.remove-file": "Usuń plik",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Usuń plik: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Zatrzymaj przesyłanie",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Zatrzymaj przesyłanie {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "Podczas przesyłania wystąpił błąd {{fileName}}. Spróbuj ponownie lub prześlij inny plik.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Błąd przesyłania",
	"cph-theme-ticket-fields.attachments.uploading": "Przesyłanie {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(ostatnie 4 cyfry)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Wstecz",
	"cph-theme-ticket-fields.dropdown.empty-option": "Wybierz opcję",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Ładowanie elementów...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Nie znaleziono dopasowań",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Szukaj {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "Nie znaleziono dopasowań",
	"cph-theme-ticket-fields.search-field.placeholder": "Szukaj {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "Nie udało się przesłać {{fileName}}"
};

var pl$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: pl
});

var ptBr = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Escolha um arquivo ou arraste e solte aqui",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Solte os arquivos aqui",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "Pressione Delete para remover o arquivo {{fileName}}",
	"cph-theme-ticket-fields.attachments.remove-file": "Remover arquivo",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Remover arquivo: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Interromper carregamento",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Interromper carregamento do arquivo {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "Erro ao carregar {{fileName}}. Tente novamente ou carregue outro arquivo.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Erro de carregamento",
	"cph-theme-ticket-fields.attachments.uploading": "Carregando {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Últimos 4 dígitos)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Voltar",
	"cph-theme-ticket-fields.dropdown.empty-option": "Selecionar uma opção",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Carregando itens...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Nenhuma correspondência encontrada",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Pesquisar {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "Nenhuma correspondência encontrada",
	"cph-theme-ticket-fields.search-field.placeholder": "Pesquisar {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "Erro ao carregar {{fileName}}"
};

var ptBr$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: ptBr
});

var pt = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Escolha um arquivo ou arraste e solte aqui",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Solte os arquivos aqui",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "Pressione Delete para remover o arquivo {{fileName}}",
	"cph-theme-ticket-fields.attachments.remove-file": "Remover arquivo",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Remover arquivo: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Interromper carregamento",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Interromper carregamento do arquivo {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "Erro ao carregar {{fileName}}. Tente novamente ou carregue outro arquivo.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Erro de carregamento",
	"cph-theme-ticket-fields.attachments.uploading": "Carregando {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Últimos 4 dígitos)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Voltar",
	"cph-theme-ticket-fields.dropdown.empty-option": "Selecione uma opção",
	"cph-theme-ticket-fields.lookup-field.loading-options": "A carregar itens...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Nenhuma correspondência encontrada",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Pesquisar {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "Nenhuma correspondência encontrada",
	"cph-theme-ticket-fields.search-field.placeholder": "Pesquisar {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "Erro ao carregar {{fileName}}"
};

var pt$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: pt
});

var roMd = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Alegeți un fișier sau glisați și fixați aici",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Glisați fișierele aici",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "Fișier: {{fileName}}, apăsați pe Ștergere pentru a elimina",
	"cph-theme-ticket-fields.attachments.remove-file": "Eliminare fișier",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Eliminare fișier: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Oprire încărcare",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Opriți încărcarea {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "A apărut o eroare la încărcarea {{fileName}}. Încercați din nou sau încărcați un alt fișier.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Eroare de încărcare",
	"cph-theme-ticket-fields.attachments.uploading": "Se încarcă {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Ultimele 4 cifre)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Înapoi",
	"cph-theme-ticket-fields.dropdown.empty-option": "Selectați o opțiune",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Se încarcă articolele...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Nu s-au găsit corespondențe",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Căutare {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "Nu s-au găsit corespondențe",
	"cph-theme-ticket-fields.search-field.placeholder": "Căutare {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "Încărcarea {{fileName}} a eșuat"
};

var roMd$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: roMd
});

var ro = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Alegeți un fișier sau glisați și fixați aici",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Glisați fișierele aici",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "Fișier: {{fileName}}, apăsați pe Ștergere pentru a elimina",
	"cph-theme-ticket-fields.attachments.remove-file": "Eliminare fișier",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Eliminare fișier: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Oprire încărcare",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Opriți încărcarea {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "A apărut o eroare la încărcarea {{fileName}}. Încercați din nou sau încărcați un alt fișier.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Eroare de încărcare",
	"cph-theme-ticket-fields.attachments.uploading": "Se încarcă {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Ultimele 4 cifre)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Înapoi",
	"cph-theme-ticket-fields.dropdown.empty-option": "Selectați o opțiune",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Se încarcă articolele...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Nu s-au găsit corespondențe",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Căutare {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "Nu s-au găsit corespondențe",
	"cph-theme-ticket-fields.search-field.placeholder": "Căutare {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "Încărcarea {{fileName}} a eșuat"
};

var ro$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: ro
});

var ru = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Выберите файл или перетащите его сюда",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Перетащите файлы сюда",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "Файл: «{{fileName}}», нажмите «Удалить» для удаления",
	"cph-theme-ticket-fields.attachments.remove-file": "Удалить файл",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Удалить файл: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Остановить выкладывание",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Остановить выкладывание {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "Ошибка при выкладывании {{fileName}}. Повторите попытку или выложите другой файл.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Ошибка выкладывания",
	"cph-theme-ticket-fields.attachments.uploading": "Выкладывание {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(последние 4 цифры)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Назад",
	"cph-theme-ticket-fields.dropdown.empty-option": "Выберите вариант",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Загрузка элементов...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Соответствия не найдены",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Поиск: {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "Соответствия не найдены",
	"cph-theme-ticket-fields.search-field.placeholder": "Поиск {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "Не удалось выложить {{fileName}}"
};

var ru$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: ru
});

var si = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Choose a file or drag and drop here",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Drop files here",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "File: {{fileName}}, press delete to remove",
	"cph-theme-ticket-fields.attachments.remove-file": "Remove file",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Remove file: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Stop upload",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Stop uploading {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "There was an error uploading {{fileName}}. Try again or upload another file.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Upload error",
	"cph-theme-ticket-fields.attachments.uploading": "Uploading {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Back",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.search-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}} upload failed"
};

var si$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: si
});

var sk = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Vyberte súbor alebo ho presuňte a pustite sem",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Súbory pustite sem",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "Súbor: {{fileName}}, stlačením klávesu Delete odoberte",
	"cph-theme-ticket-fields.attachments.remove-file": "Odobrať súbor",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Odobratie súboru: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Zastaviť nahrávanie",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Zastavenie nahrávania {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "Pri nahrávaní súboru {{fileName}} sa vyskytla chyba. Skúste to znova alebo nahrajte iný súbor.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Chyba pri nahrávaní",
	"cph-theme-ticket-fields.attachments.uploading": "Nahráva sa súbor {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(posledné 4 číslice)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Späť",
	"cph-theme-ticket-fields.dropdown.empty-option": "Vyberte možnosť",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Načítavajú sa položky…",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Nenašli sa žiadne zhody",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Vyhľadávať {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "Nenašli sa žiadne zhody",
	"cph-theme-ticket-fields.search-field.placeholder": "Vyhľadávať {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "Nahrávanie súboru {{fileName}} zlyhalo"
};

var sk$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: sk
});

var sl = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Choose a file or drag and drop here",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Drop files here",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "File: {{fileName}}, press delete to remove",
	"cph-theme-ticket-fields.attachments.remove-file": "Remove file",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Remove file: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Stop upload",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Stop uploading {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "There was an error uploading {{fileName}}. Try again or upload another file.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Upload error",
	"cph-theme-ticket-fields.attachments.uploading": "Uploading {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(zadnje 4 števke)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Back",
	"cph-theme-ticket-fields.dropdown.empty-option": "Izberite možnost",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Nalaganje predmetov ...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Ni najdenih tekem",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Iskanje {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.search-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}} upload failed"
};

var sl$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: sl
});

var sq = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Choose a file or drag and drop here",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Drop files here",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "File: {{fileName}}, press delete to remove",
	"cph-theme-ticket-fields.attachments.remove-file": "Remove file",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Remove file: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Stop upload",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Stop uploading {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "There was an error uploading {{fileName}}. Try again or upload another file.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Upload error",
	"cph-theme-ticket-fields.attachments.uploading": "Uploading {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Back",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.search-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}} upload failed"
};

var sq$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: sq
});

var srMe = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Choose a file or drag and drop here",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Drop files here",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "File: {{fileName}}, press delete to remove",
	"cph-theme-ticket-fields.attachments.remove-file": "Remove file",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Remove file: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Stop upload",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Stop uploading {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "There was an error uploading {{fileName}}. Try again or upload another file.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Upload error",
	"cph-theme-ticket-fields.attachments.uploading": "Uploading {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Back",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.search-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}} upload failed"
};

var srMe$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: srMe
});

var sr = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Choose a file or drag and drop here",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Drop files here",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "File: {{fileName}}, press delete to remove",
	"cph-theme-ticket-fields.attachments.remove-file": "Remove file",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Remove file: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Stop upload",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Stop uploading {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "There was an error uploading {{fileName}}. Try again or upload another file.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Upload error",
	"cph-theme-ticket-fields.attachments.uploading": "Uploading {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Back",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.search-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}} upload failed"
};

var sr$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: sr
});

var sv = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Välj en fil eller dra och släpp den här",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Släpp filer här",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "Fil: {{fileName}}, tryck på delete-tangenten för att ta bort",
	"cph-theme-ticket-fields.attachments.remove-file": "Ta bort fil",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Ta bort fil: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Stoppa uppladdning",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Stoppa uppladdning av {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "Ett fel inträffade vid uppladdning av {{fileName}}. Försök igen eller ladda upp en annan fil.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Uppladdningsfel",
	"cph-theme-ticket-fields.attachments.uploading": "Uppladdning av {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(4 sista siffror)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Tillbaka",
	"cph-theme-ticket-fields.dropdown.empty-option": "Välj ett alternativ",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Läser in objekt...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Inga träffar hittades",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Sök {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "Inga träffar hittades",
	"cph-theme-ticket-fields.search-field.placeholder": "Sök {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "Det gick inte att ladda upp {{fileName}}"
};

var sv$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: sv
});

var swKe = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Choose a file or drag and drop here",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Drop files here",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "File: {{fileName}}, press delete to remove",
	"cph-theme-ticket-fields.attachments.remove-file": "Remove file",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Remove file: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Stop upload",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Stop uploading {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "There was an error uploading {{fileName}}. Try again or upload another file.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Upload error",
	"cph-theme-ticket-fields.attachments.uploading": "Uploading {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Back",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.search-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}} upload failed"
};

var swKe$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: swKe
});

var ta = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Choose a file or drag and drop here",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Drop files here",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "File: {{fileName}}, press delete to remove",
	"cph-theme-ticket-fields.attachments.remove-file": "Remove file",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Remove file: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Stop upload",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Stop uploading {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "There was an error uploading {{fileName}}. Try again or upload another file.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Upload error",
	"cph-theme-ticket-fields.attachments.uploading": "Uploading {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Back",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.search-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}} upload failed"
};

var ta$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: ta
});

var th = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "เลือกไฟล์หรือลากแล้ววางที่นี่",
	"cph-theme-ticket-fields.attachments.drop-files-label": "วางไฟล์ที่นี่",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "ไฟล์: {{fileName}} กดลบเพื่อนำออก",
	"cph-theme-ticket-fields.attachments.remove-file": "ลบไฟล์ออก",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "ลบไฟล์ออก: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "หยุดการอัปโหลด",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "หยุดการอัปโหลด {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "เกิดข้อผิดพลาดในการอัปโหลด {{fileName}} ลองอีกครั้งหรืออัปโหลดไฟล์อื่น",
	"cph-theme-ticket-fields.attachments.upload-error-title": "เกิดข้อผิดพลาดในการอัปโหลด",
	"cph-theme-ticket-fields.attachments.uploading": "กำลังอัปโหลด {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(เลข 4 หลักสุดท้าย)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "ย้อนกลับ",
	"cph-theme-ticket-fields.dropdown.empty-option": "เลือกตัวเลือก",
	"cph-theme-ticket-fields.lookup-field.loading-options": "กำลังโหลดรายการ...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "ไม่พบรายการที่ตรงกัน",
	"cph-theme-ticket-fields.lookup-field.placeholder": "ค้นหา {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "ไม่พบรายการที่ตรงกัน",
	"cph-theme-ticket-fields.search-field.placeholder": "ค้นหา {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "อัปโหลด {{fileName}} ไม่สำเร็จ"
};

var th$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: th
});

var tr = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Bir dosya seçin veya buraya sürükleyip bırakın",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Dosyaları buraya bırakın",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "Dosya:{{fileName}}, kaldırmak için Sil tuşuna basın",
	"cph-theme-ticket-fields.attachments.remove-file": "Dosyayı kaldır",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Dosyayı kaldır: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Karşıya yüklemeyi durdur",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "{{fileName}} dosyasını karşıya yüklemeyi durdur",
	"cph-theme-ticket-fields.attachments.upload-error-description": "{{fileName}} karşıya yüklenirken bir hata oluştu. Yeniden deneyin veya başka bir dosya yükleyin.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Karşıya yükleme hatası",
	"cph-theme-ticket-fields.attachments.uploading": "{{fileName}} karşıya yükleniyor",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Son 4 hane)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Geri",
	"cph-theme-ticket-fields.dropdown.empty-option": "Bir seçim yapın",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Öğeler yükleniyor...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Eşleşme bulunamadı",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Ara {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "Eşleşme bulunamadı",
	"cph-theme-ticket-fields.search-field.placeholder": "{{label}} ara",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}} karşıya yüklemesi başarısız oldu"
};

var tr$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: tr
});

var uk = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Виберіть файл або перетягніть його сюди",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Перетягніть файли сюди",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "Файл: {{fileName}}, натисніть «Видалити» для вилучення",
	"cph-theme-ticket-fields.attachments.remove-file": "Видалити файл",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Видалити файл: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Зупинити передавання",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Зупинити передавання {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "Під час передавання {{fileName}} виникла помилка. Спробуйте ще раз або завантажте інший файл.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Помилка передавання",
	"cph-theme-ticket-fields.attachments.uploading": "Передавання {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Останні 4 цифри)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Назад",
	"cph-theme-ticket-fields.dropdown.empty-option": "Виберіть варіант",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Завантаження елементів...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Збігів не знайдено",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Пошук {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "Немає збігів",
	"cph-theme-ticket-fields.search-field.placeholder": "Пошук у розділі {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "Не вдалося передати {{fileName}}"
};

var uk$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: uk
});

var urPk = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Choose a file or drag and drop here",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Drop files here",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "File: {{fileName}}, press delete to remove",
	"cph-theme-ticket-fields.attachments.remove-file": "Remove file",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Remove file: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Stop upload",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Stop uploading {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "There was an error uploading {{fileName}}. Try again or upload another file.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Upload error",
	"cph-theme-ticket-fields.attachments.uploading": "Uploading {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Back",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.search-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}} upload failed"
};

var urPk$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: urPk
});

var ur = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Choose a file or drag and drop here",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Drop files here",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "File: {{fileName}}, press delete to remove",
	"cph-theme-ticket-fields.attachments.remove-file": "Remove file",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Remove file: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Stop upload",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Stop uploading {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "There was an error uploading {{fileName}}. Try again or upload another file.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Upload error",
	"cph-theme-ticket-fields.attachments.uploading": "Uploading {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Back",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.search-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}} upload failed"
};

var ur$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: ur
});

var uz = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Choose a file or drag and drop here",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Drop files here",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "File: {{fileName}}, press delete to remove",
	"cph-theme-ticket-fields.attachments.remove-file": "Remove file",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Remove file: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Stop upload",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Stop uploading {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "There was an error uploading {{fileName}}. Try again or upload another file.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Upload error",
	"cph-theme-ticket-fields.attachments.uploading": "Uploading {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(Last 4 digits)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Back",
	"cph-theme-ticket-fields.dropdown.empty-option": "Select an option",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Loading items...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "No matches found",
	"cph-theme-ticket-fields.search-field.placeholder": "Search {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}} upload failed"
};

var uz$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: uz
});

var vi = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "Chọn một tập tin hoặc kéo và thả ở đây",
	"cph-theme-ticket-fields.attachments.drop-files-label": "Thả tập tin vào đây",
	"cph-theme-ticket-fields.attachments.error-separator": "; ",
	"cph-theme-ticket-fields.attachments.file": "Tập tin: {{fileName}}, nhấn xóa để xóa",
	"cph-theme-ticket-fields.attachments.remove-file": "Xóa tập tin",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "Xóa tập tin: {{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "Dừng tải lên",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "Dừng tải lên {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "Đã xảy ra lỗi khi tải lên {{fileName}}. Hãy thử lại hoặc tải lên một tập tin khác.",
	"cph-theme-ticket-fields.attachments.upload-error-title": "Lỗi tải lên",
	"cph-theme-ticket-fields.attachments.uploading": "Đang tải lên {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "(4 chữ số cuối)",
	"cph-theme-ticket-fields.dropdown.back-option-label": "Quay lại",
	"cph-theme-ticket-fields.dropdown.empty-option": "Chọn một tùy chọn",
	"cph-theme-ticket-fields.lookup-field.loading-options": "Đang tải các mục...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "Không tìm thấy kết quả phù hợp",
	"cph-theme-ticket-fields.lookup-field.placeholder": "Tìm kiếm {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "Không tìm thấy kết quả trùng khớp",
	"cph-theme-ticket-fields.search-field.placeholder": "Tìm kiếm {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "Tải lên {{fileName}} không thành công"
};

var vi$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: vi
});

var zhCn = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "选择文件或拖放到此处",
	"cph-theme-ticket-fields.attachments.drop-files-label": "将文件放在此处",
	"cph-theme-ticket-fields.attachments.error-separator": "； ",
	"cph-theme-ticket-fields.attachments.file": "文件：{{fileName}}，按删除键移除",
	"cph-theme-ticket-fields.attachments.remove-file": "移除文件",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "移除文件：{{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "停止上传",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "停止上传 {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "上传 {{fileName}} 时出错。请重试或上传另一个文件。",
	"cph-theme-ticket-fields.attachments.upload-error-title": "上传错误",
	"cph-theme-ticket-fields.attachments.uploading": "正在上传 {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "（最后 4 位数）",
	"cph-theme-ticket-fields.dropdown.back-option-label": "返回",
	"cph-theme-ticket-fields.dropdown.empty-option": "选择一个选项",
	"cph-theme-ticket-fields.lookup-field.loading-options": "正在加载项目…",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "未找到匹配项",
	"cph-theme-ticket-fields.lookup-field.placeholder": "搜索 {{label}}",
	"cph-theme-ticket-fields.search-field.no-matches-found": "未找到匹配项",
	"cph-theme-ticket-fields.search-field.placeholder": "搜索 {{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}} 上传失败"
};

var zhCn$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: zhCn
});

var zhTw = {
	"cph-theme-ticket-fields.attachments.choose-file-label": "選擇檔案或拖放至此處",
	"cph-theme-ticket-fields.attachments.drop-files-label": "將檔案放置在此處",
	"cph-theme-ticket-fields.attachments.error-separator": "； ",
	"cph-theme-ticket-fields.attachments.file": "檔案：{{fileName}}，按一下 Delete 即可移除",
	"cph-theme-ticket-fields.attachments.remove-file": "移除檔案",
	"cph-theme-ticket-fields.attachments.remove-file-aria-label": "移除檔案：{{fileName}}",
	"cph-theme-ticket-fields.attachments.stop-upload": "停止上傳",
	"cph-theme-ticket-fields.attachments.stop-upload-aria-label": "停止上傳 {{fileName}}",
	"cph-theme-ticket-fields.attachments.upload-error-description": "上傳 {{fileName}} 時發生錯誤。請再試一次，或上傳另一個檔案。",
	"cph-theme-ticket-fields.attachments.upload-error-title": "上傳錯誤",
	"cph-theme-ticket-fields.attachments.uploading": "正在上傳 {{fileName}}",
	"cph-theme-ticket-fields.credit-card-digits-hint": "（最後 4 位數）",
	"cph-theme-ticket-fields.dropdown.back-option-label": "返回",
	"cph-theme-ticket-fields.dropdown.empty-option": "請選取一項",
	"cph-theme-ticket-fields.lookup-field.loading-options": "項目載入中...",
	"cph-theme-ticket-fields.lookup-field.no-matches-found": "找不到符合項目",
	"cph-theme-ticket-fields.lookup-field.placeholder": "搜尋「{{label}}」",
	"cph-theme-ticket-fields.search-field.no-matches-found": "找不到符合項目",
	"cph-theme-ticket-fields.search-field.placeholder": "搜尋{{label}}",
	"cph-theme-ticket-fields.upload-failed-title": "{{fileName}} 上傳失敗"
};

var zhTw$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: zhTw
});

export { frMu$1 as $, Attachments as A, enUs$1 as B, enXDev$1 as C, DropDown as D, enXKeys$1 as E, enXObsolete$1 as F, enXPseudo$1 as G, enXTest$1 as H, Input as I, es419$1 as J, esAr$1 as K, esCl$1 as L, esEs$1 as M, esMx$1 as N, esPe$1 as O, es$1 as P, et$1 as Q, RequestFormField as R, eu$1 as S, TextArea as T, faAf$1 as U, fa$1 as V, fi$1 as W, fil$1 as X, fo$1 as Y, frCa$1 as Z, frDz$1 as _, getCustomObjectKey as a, fr$1 as a0, ga$1 as a1, he$1 as a2, hi$1 as a3, hr$1 as a4, hu$1 as a5, hy$1 as a6, id$1 as a7, is$1 as a8, itCh$1 as a9, si$1 as aA, sk$1 as aB, sl$1 as aC, sq$1 as aD, srMe$1 as aE, sr$1 as aF, sv$1 as aG, swKe$1 as aH, ta$1 as aI, th$1 as aJ, tr$1 as aK, uk$1 as aL, urPk$1 as aM, ur$1 as aN, uz$1 as aO, vi$1 as aP, zhCn$1 as aQ, zhTw$1 as aR, it$1 as aa, ja$1 as ab, ka$1 as ac, kk$1 as ad, klDk$1 as ae, km$1 as af, ko$1 as ag, ku$1 as ah, ky$1 as ai, lt$1 as aj, lv$1 as ak, mk$1 as al, mn$1 as am, ms$1 as an, mt$1 as ao, my$1 as ap, ne$1 as aq, nlBe$1 as ar, nl$1 as as, no$1 as at, pl$1 as au, ptBr$1 as av, pt$1 as aw, roMd$1 as ax, ro$1 as ay, ru$1 as az, af$1 as b, arXPseudo$1 as c, ar$1 as d, az$1 as e, be$1 as f, getVisibleFields as g, bg$1 as h, bn$1 as i, bs$1 as j, ca$1 as k, cs$1 as l, cy$1 as m, da$1 as n, deDe$1 as o, deXInformal$1 as p, de$1 as q, el$1 as r, en001$1 as s, en150$1 as t, enAu$1 as u, enCa$1 as v, enGb$1 as w, enMy$1 as x, enPh$1 as y, enSe$1 as z };
