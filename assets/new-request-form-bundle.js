import { r as reactExports, j as jsxRuntimeExports, d as Field, e as Label, g as Combobox, O as Option, p as purify, s as styled, u as useTranslation, n as FileList, o as File, q as Tooltip, P as Progress, A as Anchor, c as useNotify, t as mime, v as useDropzone, F as Field$1, L as Label$1, M as Message, w as FileUpload, I as Input, x as useGrid, K as KEYS, y as focusStyles, z as FauxInput, B as Tag, H as Hint, S as Span, E as SvgAlertWarningStroke, $ as $e, G as getColorV8, J as Header, N as SvgCheckCircleStroke, Q as useModalContainer, R as Modal, U as Body, V as Accordion, W as Paragraph, X as Footer$1, Y as FooterItem, Z as Button, _ as Close, a0 as addFlashNotification, a1 as Alert, a2 as initI18next, a3 as loadTranslations, a4 as reactDomExports, a5 as ThemeProviders, a6 as createTheme } from 'shared';
import { I as Input$1, D as DropDown, T as TextArea, a as TicketField } from 'ticket-fields';

const key = "return-focus-to-ticket-form-field";
function TicketFormField({ field, newRequestPath, }) {
    const ref = reactExports.createRef();
    const handleChange = ({ selectionValue }) => {
        if (selectionValue && typeof selectionValue === "number") {
            const url = new URL(window.location.href);
            const searchParams = url.searchParams;
            searchParams.set("ticket_form_id", selectionValue);
            sessionStorage.setItem(key, "true");
            window.location.assign(`${newRequestPath}${url.search}`);
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
    return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx("input", { type: "hidden", name: field.name, value: field.value }), field.options.length > 1 && (jsxRuntimeExports.jsxs(Field, { children: [jsxRuntimeExports.jsx(Label, { children: field.label }), jsxRuntimeExports.jsx(Combobox, { isEditable: false, onChange: handleChange, ref: ref, children: field.options.map((option) => (jsxRuntimeExports.jsx(Option, { value: option.value, label: option.name, isSelected: field.value === option.value, children: option.name }, option.value))) })] }))] }));
}

function ParentTicketField({ field, }) {
    const { value, name } = field;
    return jsxRuntimeExports.jsx("input", { type: "hidden", name: name, value: value });
}

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
                    // The backend expects the credit card field to have a length at least of 13 characters.
                    // We are prefixing the 4 digits with 9 Xs to make sure the value has the expected length
                    const creditCardFields = ticketFields.filter((field) => field.type === "partialcreditcard");
                    for (const creditCardField of creditCardFields) {
                        const creditCardInput = ref.querySelector(`input[name="${creditCardField.name}"]`);
                        if (creditCardInput &&
                            creditCardInput instanceof HTMLInputElement &&
                            creditCardInput.value.length === 4) {
                            creditCardInput.value = `XXXXXXXXX${creditCardInput.value}`;
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
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
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
function getFieldFromId(id, prefilledTicketFields) {
    const isCustomField = !Number.isNaN(Number(id));
    if (isCustomField) {
        const name = `request[custom_fields][${id}]`;
        return prefilledTicketFields.ticketFields.find((field) => field.name === name);
    }
    switch (id) {
        case "anonymous_requester_email":
            return prefilledTicketFields.emailField;
        case "due_at":
            return prefilledTicketFields.dueDateField;
        case "collaborators":
            return prefilledTicketFields.ccField;
        case "organization_id":
            return prefilledTicketFields.organizationField;
        default:
            return prefilledTicketFields.ticketFields.find((field) => field.name === `request[${id}]`);
    }
}
function isValidDate(dateString) {
    if (!DATE_REGEX.test(dateString)) {
        return false;
    }
    const date = new Date(dateString);
    const [year, month, day] = dateString.split("-").map(Number);
    return (date.getUTCFullYear() === year &&
        date.getUTCMonth() + 1 === month &&
        date.getUTCDate() === day);
}
function getPrefilledTicketFields(fields) {
    const { href } = location;
    const params = new URL(href).searchParams;
    const prefilledFields = {
        ...fields,
        ticketFields: [...fields.ticketFields],
    };
    if (href.length > MAX_URL_LENGTH)
        return fields;
    if (params.get("parent_id"))
        return fields;
    for (const [key, value] of params) {
        if (!key.startsWith(TICKET_FIELD_PREFIX))
            continue;
        const ticketFieldId = key.substring(TICKET_FIELD_PREFIX.length);
        const field = getFieldFromId(ticketFieldId, prefilledFields);
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
            case "due_at":
            case "date":
                if (isValidDate(sanitizedValue)) {
                    field.value = sanitizedValue;
                }
                break;
            default:
                field.value = sanitizedValue;
        }
    }
    return prefilledFields;
}
function usePrefilledTicketFields({ ticketFields, ccField, dueDateField, emailField, organizationField, }) {
    return reactExports.useMemo(() => getPrefilledTicketFields({
        ticketFields,
        ccField,
        dueDateField,
        emailField,
        organizationField,
    }), [ticketFields, ccField, dueDateField, emailField, organizationField]);
}

const FileNameWrapper = styled.div `
  flex: 1;
`;function he({file:e,onRemove:t}){const{t:s}=l(),r=e=>{"Enter"!==e.code&&"Space"!==e.code&&"Delete"!==e.code&&"Backspace"!==e.code||(e.preventDefault(),t())},a="pending"===e.status?e.file_name:e.value.file_name,o=s("new-request-form.attachments.stop-upload","Stop upload"),i=s("new-request-form.attachments.remove-file","Remove file");return n.jsx(u.Item,{children:n.jsx(c,{type:"generic",tabIndex:0,"aria-label":s("new-request-form.attachments.file","File: {{fileName}}, press delete to remove",{fileName:a}),onKeyDown:e=>{"Delete"!==e.code&&"Backspace"!==e.code||(e.preventDefault(),t())},children:"pending"===e.status?n.jsxs(n.Fragment,{children:[n.jsx(fe,{children:a}),n.jsx(d,{content:o,children:n.jsx(c.Close,{"aria-label":s("new-request-form.attachments.stop-upload-aria-label","Stop uploading {{fileName}}",{fileName:a}),"aria-describedby":void 0,onClick:()=>{t()},onKeyDown:r})}),n.jsx(f,{value:e.progress,"aria-label":s("new-request-form.attachments.uploading","Uploading {{fileName}}",{fileName:a})})]}):n.jsxs(n.Fragment,{children:[n.jsx(fe,{children:n.jsx(h,{isExternal:!0,href:e.value.url,target:"_blank",children:a})}),n.jsx(d,{content:i,children:n.jsx(c.Delete,{"aria-label":s("new-request-form.attachments.remove-file-aria-label","Remove file: {{fileName}}",{fileName:a}),"aria-describedby":void 0,onClick:()=>{t()},onKeyDown:r})}),n.jsx(f,{value:100,"aria-hidden":"true"})]})})})}async function me(){const e=await fetch("/api/v2/users/me.json"),{user:{authenticity_token:n}}=await e.json();return n}function je({field:t}){const{label:s,error:r,name:a,attachments:o}=t,{files:i,addPendingFile:c,setPendingFileProgress:d,setUploaded:f,removePendingFile:h,removeUploadedFile:x}=function(n){const[t,s]=e.useState(n);return{files:t,addPendingFile:e.useCallback(((e,n,t)=>{s((s=>[...s,{status:"pending",id:e,file_name:n,progress:0,xhr:t}]))}),[]),setPendingFileProgress:e.useCallback(((e,n)=>{s((t=>t.map((t=>"pending"===t.status&&t.id===e?{...t,progress:n}:t))))}),[]),removePendingFile:e.useCallback((e=>{s((n=>n.filter((n=>"pending"!==n.status||n.id!==e))))}),[]),removeUploadedFile:e.useCallback((e=>{s((n=>n.filter((n=>"uploaded"!==n.status||n.value.id!==e))))}),[]),setUploaded:e.useCallback(((e,n)=>{s((t=>t.map((t=>"pending"===t.status&&t.id===e?{status:"uploaded",value:n}:t))))}),[])}}(o.map((e=>({status:"uploaded",value:e})))??[]),v=m(),{t:y}=l(),_=e.useCallback((e=>{v({title:y("new-request-form.attachments.upload-error-title","Upload error"),message:y("new-request-form.attachments.upload-error-description","There was an error uploading {{fileName}}. Try again or upload another file.",{fileName:e}),type:"error"})}),[v,y]),C=e.useCallback((async e=>{const n=await me();for(const t of e){const e=new XMLHttpRequest,s=new URL(`${window.location.origin}/api/v2/uploads.json`);if(s.searchParams.append("filename",t.name),e.open("POST",s),t.type)e.setRequestHeader("Content-Type",t.type);else{const n=j.getType(t.name);e.setRequestHeader("Content-Type",n||"application/octet-stream")}e.setRequestHeader("X-CSRF-Token",n),e.responseType="json";const r=crypto.randomUUID();c(r,t.name,e),e.upload.addEventListener("progress",(({loaded:e,total:n})=>{const t=Math.round(e/n*100);t<=90&&d(r,t)})),e.addEventListener("load",(()=>{if(e.status>=200&&e.status<300){const{upload:{attachment:{file_name:n,content_url:t},token:s}}=e.response;f(r,{id:s,file_name:n,url:t})}else _(t.name),h(r)})),e.addEventListener("error",(()=>{_(t.name),h(r)})),e.send(t)}}),[c,h,d,f,_]),{getRootProps:F,getInputProps:P,isDragActive:S}=p({onDrop:C});return n.jsxs(b,{children:[n.jsx(k,{children:s}),r&&n.jsx(w,{validation:"error",children:r}),n.jsxs(g,{...F(),isDragging:S,children:[S?n.jsx("span",{children:y("new-request-form.attachments.drop-files-label","Drop files here")}):n.jsx("span",{children:y("new-request-form.attachments.choose-file-label","Choose a file or drag and drop here")}),n.jsx(q,{...P()})]}),n.jsx(u,{children:i.map((e=>n.jsx(he,{file:e,onRemove:()=>{(async e=>{if("pending"===e.status)e.xhr.abort(),h(e.id);else{const n=await me(),t=e.value.id;x(e.value.id),await fetch(`/api/v2/uploads/${t}.json`,{method:"DELETE",headers:{"X-CSRF-Token":n}})}})(e)}},"pending"===e.status?e.id:e.value.id)))}),i.map((e=>"uploaded"===e.status&&n.jsx("input",{type:"hidden",name:a,value:JSON.stringify(e.value)},e.value.id)))]})}function pe(e,n){return n.filter((n=>n.child_fields.some((n=>n.id===e))))}function be(e,n,t){return e.filter((e=>{const s=t.find((n=>n.id===e.parent_field_id));if(!s)return!1;const r=pe(s.id,n);return function(e,n){return"checkbox"===n.parent_field_type&&!1===n.value?!1===e||null===e:e===n.value}(s.value,e)&&(0===r.length||be(r,n,t).length>0)}))}function ke(e,n){return 0===n.length?e:e.reduce(((t,s)=>{const r=pe(s.id,n);if(0===r.length)return[...t,s];const a=be(r,n,e);return a.length>0?[...t,{...s,required:a.some((e=>e.child_fields.some((e=>e.id==s.id&&e.is_required))))}]:t}),[])}const we=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,ge=i(_)`
  padding: ${e=>`${e.theme.space.xxs} ${e.theme.space.sm}`};

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
const StyledInput = styled(Input) `
  position: absolute;
  top: 0;
  left: 0;
  height: var(--line-height);
  line-height: var(--line-height);
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
    return (jsxRuntimeExports.jsxs(Field$1, { children: [jsxRuntimeExports.jsx(Label$1, { children: label }), description && jsxRuntimeExports.jsx(Hint, { children: description }), jsxRuntimeExports.jsxs(Container$1, { ...getContainerProps(), children: [tags.length > 0 && (jsxRuntimeExports.jsx("span", { ...getGridProps({
                            "aria-label": t("new-request-form.cc-field.container-label", "Selected CC emails"),
                        }), children: jsxRuntimeExports.jsx("span", { ref: gridRowRef, ...getGridRowProps(), children: tags.map((email, index) => {
                                const isValid = EMAIL_REGEX.test(email);
                                return isValid ? (jsxRuntimeExports.jsx(GridCell, { ...getGridCellProps(index), children: renderTag(index, isValid, email) }, index)) : (jsxRuntimeExports.jsx(Tooltip, { content: t("new-request-form.cc-field.invalid-email", "Invalid email address"), children: jsxRuntimeExports.jsx(GridCell, { ...getGridCellProps(index), children: renderTag(index, isValid, email) }) }, index));
                            }) }) })), jsxRuntimeExports.jsxs(InputWrapper, { children: [jsxRuntimeExports.jsx(InputMirror, { isBare: true, "aria-hidden": "true", tabIndex: -1, children: inputValue }), jsxRuntimeExports.jsx(StyledInput, { ref: inputRef, isBare: true, ...getInputProps() })] })] }), error && jsxRuntimeExports.jsx(Message, { validation: "error", children: error }), tags.map((email) => (jsxRuntimeExports.jsx("input", { type: "hidden", name: name, value: email }, email))), jsxRuntimeExports.jsx(Span, { hidden: true, ...getAnnouncementProps(), children: announcement })] }));
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
    return articles.length > 0 ? (jsxRuntimeExports.jsx(Container, { "data-test-id": "suggested-articles", children: jsxRuntimeExports.jsxs(InnerContainer, { children: [jsxRuntimeExports.jsx("h2", { children: t("new-request-form.suggested-articles", "Suggested articles") }), jsxRuntimeExports.jsx(UnstyledList, { children: articles.map((article) => (jsxRuntimeExports.jsx(ListItem, { children: jsxRuntimeExports.jsx(Anchor, { href: article.html_url, children: article.name }) }, article.html_url))) })] }) })) : null;
}

const H3 = styled.h3 `
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;
const StyledHeader = styled(Header) `
  color: ${(props) => getColorV8("successHue", 700, props.theme)};
`;
const StyledSuccessIcon = styled(SvgCheckCircleStroke) `
  position: absolute;
  top: ${(props) => props.theme.space.base * 5.5}px;
  inset-inline-start: ${(props) => `${props.theme.space.base * 4}px`};
`;
const ArticleLink = styled(Anchor) `
  display: inline-block;
  margin-top: ${(props) => props.theme.space.sm};
`;
function AnswerBotModal({ authToken, interactionAccessToken, articles, requestId, hasRequestManagement, isSignedIn, helpCenterPath, requestsPath, requestPath, }) {
    const [expandedIndex, setExpandedIndex] = reactExports.useState(0);
    const modalContainer = useModalContainer();
    const { t } = useTranslation();
    const getExpandedArticleId = () => {
        return String(articles[expandedIndex]?.article_id);
    };
    const getUnsolvedRedirectUrl = () => {
        if (!isSignedIn) {
            const searchParams = new URLSearchParams();
            searchParams.set("return_to", requestsPath);
            return `${helpCenterPath}?${searchParams.toString()}`;
        }
        else if (hasRequestManagement) {
            return requestPath;
        }
        else {
            return helpCenterPath;
        }
    };
    const addUnsolvedNotificationAndRedirect = () => {
        addFlashNotification({
            type: "success",
            message: t("new-request-form.answer-bot-modal.request-submitted", "Your request was successfully submitted"),
        });
        window.location.assign(getUnsolvedRedirectUrl());
    };
    const solveRequest = async () => {
        const response = await fetch("/api/v2/answer_bot/resolution", {
            method: "POST",
            body: JSON.stringify({
                article_id: getExpandedArticleId(),
                interaction_access_token: interactionAccessToken,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            addFlashNotification({
                type: "success",
                message: t("new-request-form.answer-bot-modal.request-closed", "Nice. Your request has been closed."),
            });
        }
        else {
            addFlashNotification({
                type: "error",
                message: t("new-request-form.answer-bot-modal.solve-error", "There was an error closing your request"),
            });
        }
        window.location.href = helpCenterPath;
    };
    const markArticleAsIrrelevant = async () => {
        await fetch("/api/v2/answer_bot/rejection", {
            method: "POST",
            body: JSON.stringify({
                article_id: getExpandedArticleId(),
                interaction_access_token: interactionAccessToken,
                reason_id: 0,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        addUnsolvedNotificationAndRedirect();
    };
    return (jsxRuntimeExports.jsxs(Modal, { appendToNode: modalContainer, onClose: () => {
            addUnsolvedNotificationAndRedirect();
        }, children: [jsxRuntimeExports.jsxs(StyledHeader, { tag: "h2", children: [jsxRuntimeExports.jsx(StyledSuccessIcon, {}), t("new-request-form.answer-bot-modal.request-submitted", "Your request was successfully submitted")] }), jsxRuntimeExports.jsxs(Body, { children: [jsxRuntimeExports.jsx(H3, { children: t("new-request-form.answer-bot-modal.title", "While you wait, do any of these articles answer your question?") }), jsxRuntimeExports.jsx("p", { children: t("new-request-form.answer-bot-modal.footer-content", "If it does, we can close your recent request {{requestId}}", {
                            requestId: `\u202D#${requestId}\u202C`,
                        }) }), jsxRuntimeExports.jsx(Accordion, { level: 4, expandedSections: [expandedIndex], onChange: (index) => {
                            setExpandedIndex(index);
                        }, children: articles.map(({ article_id, html_url, snippet, title }) => (jsxRuntimeExports.jsxs(Accordion.Section, { children: [jsxRuntimeExports.jsx(Accordion.Header, { children: jsxRuntimeExports.jsx(Accordion.Label, { children: title }) }), jsxRuntimeExports.jsxs(Accordion.Panel, { children: [jsxRuntimeExports.jsx(Paragraph, { dangerouslySetInnerHTML: { __html: snippet } }), jsxRuntimeExports.jsx(ArticleLink, { isExternal: true, href: `${html_url}?auth_token=${authToken}`, target: "_blank", children: t("new-request-form.answer-bot-modal.view-article", "View article") })] })] }, article_id))) })] }), jsxRuntimeExports.jsxs(Footer$1, { children: [jsxRuntimeExports.jsx(FooterItem, { children: jsxRuntimeExports.jsx(Button, { onClick: () => {
                                markArticleAsIrrelevant();
                            }, children: t("new-request-form.answer-bot-modal.mark-irrelevant", "No, I need help") }) }), jsxRuntimeExports.jsx(FooterItem, { children: jsxRuntimeExports.jsx(Button, { isPrimary: true, onClick: () => {
                                solveRequest();
                            }, children: t("new-request-form.answer-bot-modal.solve-request", "Yes, close my request") }) })] }), jsxRuntimeExports.jsx(Close, { "aria-label": t("new-request-form.close-label", "Close") })] }));
}

const StyledParagraph = styled(Paragraph) `
  margin: ${(props) => props.theme.space.md} 0;
`;
const Form = styled.form `
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.md};
`,Ae=i.div`
  margin-top: ${e=>e.theme.space.md};
`;function Ue({requestForm:t,wysiwyg:s,newRequestPath:r,parentId:a,parentIdPath:o,locale:i,baseLocale:u,hasAtMentions:c,userRole:d,userId:f,brandId:m,organizations:j,answerBotModal:p}){const{ticket_fields:b,action:k,http_method:w,accept_charset:g,errors:q,parent_id_field:x,ticket_form_field:v,email_field:y,cc_field:_,organization_field:C,due_date_field:F,end_user_conditions:P,attachments_field:S,inline_attachments_fields:T,description_mimetype_field:R}=t,{answerBot:I}=p,{ticketFields:$,emailField:D,ccField:z,organizationField:E,dueDateField:L}=de({ticketFields:b,emailField:y,ccField:_,organizationField:C,dueDateField:F}),[N,M]=e.useState($),[A,B]=e.useState(E),[X,H]=e.useState(L),O=ke(N,P),{formRefCallback:V,handleSubmit:W}=se(N),{t:K}=l(),ee=j.length>0&&j[0]?.id?j[0]?.id?.toString():null,re=e.useCallback(((e,n)=>{M(N.map((t=>t.name===e.name?{...t,value:n}:t)))}),[N]);const ae=e.useCallback((e=>{null!==X&&H({...X,value:e})}),[X]);return n.jsxs(n.Fragment,{children:[a&&n.jsx(Ne,{children:n.jsx(h,{href:o,children:K("new-request-form.parent-request-link","Follow-up to request {{parentId}}",{parentId:`‭#${a}‬`})})}),n.jsx(Ne,{"aria-hidden":"true",children:K("new-request-form.required-fields-info","Fields marked with an asterisk (*) are required.")}),n.jsxs(Me,{ref:V,action:k,method:w,acceptCharset:g,noValidate:!0,onSubmit:W,children:[q&&n.jsx(G,{type:"error",children:q}),x&&n.jsx(te,{field:x}),v.options.length>0&&n.jsx(ne,{field:v,newRequestPath:r}),D&&n.jsx(Y,{field:D},D.name),z&&n.jsx(Ce,{field:z}),A&&n.jsx(J,{field:A,onChange:e=>{!function(e){null!==A&&B({...A,value:e})}(e)}},A.name),O.map((e=>"subject"===e.type?n.jsxs(n.Fragment,{children:[n.jsx(Y,{field:e,onChange:n=>re(e,n)},e.name),n.jsx(Ie,{query:e.value,locale:i})]}):"description"===e.type?n.jsxs(n.Fragment,{children:[n.jsx(Z,{field:e,hasWysiwyg:s,baseLocale:u,hasAtMentions:c,userRole:d,brandId:m,onChange:n=>re(e,n)},e.name),n.jsx("input",{type:"hidden",name:R.name,value:s?"text/html":"text/plain"})]}):n.jsx(Q,{field:e,baseLocale:u,hasAtMentions:c,userRole:d,userId:f,brandId:m,dueDateField:X,handleDueDateChange:ae,organizationField:A,defaultOrganizationId:ee,handleChange:re},e.name))),S&&n.jsx(je,{field:S}),T.map((({type:e,name:t,value:s},r)=>n.jsx("input",{type:e,name:t,value:s},r))),n.jsx(Ae,{children:(0===v.options.length||v.value)&&n.jsx(U,{isPrimary:!0,type:"submit",children:K("new-request-form.submit","Submit")})})]}),I.auth_token&&I.interaction_access_token&&I.articles.length>0&&I.request_id&&n.jsx(Le,{authToken:I.auth_token,interactionAccessToken:I.interaction_access_token,articles:I.articles,requestId:I.request_id,...p})]})}async function Be(e,t,s){const{baseLocale:r}=t;H(r),await O(r,[()=>function(e){switch(e){case"./translations/locales/af.json":return import("new-request-form-translations").then((function(e){return e.a}));case"./translations/locales/ar-x-pseudo.json":return import("new-request-form-translations").then((function(e){return e.b}));case"./translations/locales/ar.json":return import("new-request-form-translations").then((function(e){return e.c}));case"./translations/locales/az.json":return import("new-request-form-translations").then((function(e){return e.d}));case"./translations/locales/be.json":return import("new-request-form-translations").then((function(e){return e.e}));case"./translations/locales/bg.json":return import("new-request-form-translations").then((function(e){return e.f}));case"./translations/locales/bn.json":return import("new-request-form-translations").then((function(e){return e.g}));case"./translations/locales/bs.json":return import("new-request-form-translations").then((function(e){return e.h}));case"./translations/locales/ca.json":return import("new-request-form-translations").then((function(e){return e.i}));case"./translations/locales/cs.json":return import("new-request-form-translations").then((function(e){return e.j}));case"./translations/locales/cy.json":return import("new-request-form-translations").then((function(e){return e.k}));case"./translations/locales/da.json":return import("new-request-form-translations").then((function(e){return e.l}));case"./translations/locales/de-de.json":return import("new-request-form-translations").then((function(e){return e.m}));case"./translations/locales/de-x-informal.json":return import("new-request-form-translations").then((function(e){return e.n}));case"./translations/locales/de.json":return import("new-request-form-translations").then((function(e){return e.o}));case"./translations/locales/el.json":return import("new-request-form-translations").then((function(e){return e.p}));case"./translations/locales/en-001.json":return import("new-request-form-translations").then((function(e){return e.q}));case"./translations/locales/en-150.json":return import("new-request-form-translations").then((function(e){return e.r}));case"./translations/locales/en-au.json":return import("new-request-form-translations").then((function(e){return e.s}));case"./translations/locales/en-ca.json":return import("new-request-form-translations").then((function(e){return e.t}));case"./translations/locales/en-gb.json":return import("new-request-form-translations").then((function(e){return e.u}));case"./translations/locales/en-my.json":return import("new-request-form-translations").then((function(e){return e.v}));case"./translations/locales/en-ph.json":return import("new-request-form-translations").then((function(e){return e.w}));case"./translations/locales/en-se.json":return import("new-request-form-translations").then((function(e){return e.x}));case"./translations/locales/en-us.json":return import("new-request-form-translations").then((function(e){return e.y}));case"./translations/locales/en-x-dev.json":return import("new-request-form-translations").then((function(e){return e.z}));case"./translations/locales/en-x-keys.json":return import("new-request-form-translations").then((function(e){return e.A}));case"./translations/locales/en-x-obsolete.json":return import("new-request-form-translations").then((function(e){return e.B}));case"./translations/locales/en-x-pseudo.json":return import("new-request-form-translations").then((function(e){return e.C}));case"./translations/locales/en-x-test.json":return import("new-request-form-translations").then((function(e){return e.D}));case"./translations/locales/es-419.json":return import("new-request-form-translations").then((function(e){return e.E}));case"./translations/locales/es-es.json":return import("new-request-form-translations").then((function(e){return e.F}));case"./translations/locales/es.json":return import("new-request-form-translations").then((function(e){return e.G}));case"./translations/locales/et.json":return import("new-request-form-translations").then((function(e){return e.H}));case"./translations/locales/eu.json":return import("new-request-form-translations").then((function(e){return e.I}));case"./translations/locales/fa-af.json":return import("new-request-form-translations").then((function(e){return e.J}));case"./translations/locales/fa.json":return import("new-request-form-translations").then((function(e){return e.K}));case"./translations/locales/fi.json":return import("new-request-form-translations").then((function(e){return e.L}));case"./translations/locales/fil.json":return import("new-request-form-translations").then((function(e){return e.M}));case"./translations/locales/fo.json":return import("new-request-form-translations").then((function(e){return e.N}));case"./translations/locales/fr-ca.json":return import("new-request-form-translations").then((function(e){return e.O}));case"./translations/locales/fr.json":return import("new-request-form-translations").then((function(e){return e.P}));case"./translations/locales/ga.json":return import("new-request-form-translations").then((function(e){return e.Q}));case"./translations/locales/he.json":return import("new-request-form-translations").then((function(e){return e.R}));case"./translations/locales/hi.json":return import("new-request-form-translations").then((function(e){return e.S}));case"./translations/locales/hr.json":return import("new-request-form-translations").then((function(e){return e.T}));case"./translations/locales/hu.json":return import("new-request-form-translations").then((function(e){return e.U}));case"./translations/locales/hy.json":return import("new-request-form-translations").then((function(e){return e.V}));case"./translations/locales/id.json":return import("new-request-form-translations").then((function(e){return e.W}));case"./translations/locales/is.json":return import("new-request-form-translations").then((function(e){return e.X}));case"./translations/locales/it-ch.json":return import("new-request-form-translations").then((function(e){return e.Y}));case"./translations/locales/it.json":return import("new-request-form-translations").then((function(e){return e.Z}));case"./translations/locales/ja.json":return import("new-request-form-translations").then((function(e){return e._}));case"./translations/locales/ka.json":return import("new-request-form-translations").then((function(e){return e.$}));case"./translations/locales/kk.json":return import("new-request-form-translations").then((function(e){return e.a0}));case"./translations/locales/kl-dk.json":return import("new-request-form-translations").then((function(e){return e.a1}));case"./translations/locales/ko.json":return import("new-request-form-translations").then((function(e){return e.a2}));case"./translations/locales/ku.json":return import("new-request-form-translations").then((function(e){return e.a3}));case"./translations/locales/lt.json":return import("new-request-form-translations").then((function(e){return e.a4}));case"./translations/locales/lv.json":return import("new-request-form-translations").then((function(e){return e.a5}));case"./translations/locales/mk.json":return import("new-request-form-translations").then((function(e){return e.a6}));case"./translations/locales/mn.json":return import("new-request-form-translations").then((function(e){return e.a7}));case"./translations/locales/ms.json":return import("new-request-form-translations").then((function(e){return e.a8}));case"./translations/locales/mt.json":return import("new-request-form-translations").then((function(e){return e.a9}));case"./translations/locales/my.json":return import("new-request-form-translations").then((function(e){return e.aa}));case"./translations/locales/nl-be.json":return import("new-request-form-translations").then((function(e){return e.ab}));case"./translations/locales/nl.json":return import("new-request-form-translations").then((function(e){return e.ac}));case"./translations/locales/no.json":return import("new-request-form-translations").then((function(e){return e.ad}));case"./translations/locales/pl.json":return import("new-request-form-translations").then((function(e){return e.ae}));case"./translations/locales/pt-br.json":return import("new-request-form-translations").then((function(e){return e.af}));case"./translations/locales/pt.json":return import("new-request-form-translations").then((function(e){return e.ag}));case"./translations/locales/ro.json":return import("new-request-form-translations").then((function(e){return e.ah}));case"./translations/locales/ru.json":return import("new-request-form-translations").then((function(e){return e.ai}));case"./translations/locales/sk.json":return import("new-request-form-translations").then((function(e){return e.aj}));case"./translations/locales/sl.json":return import("new-request-form-translations").then((function(e){return e.ak}));case"./translations/locales/sq.json":return import("new-request-form-translations").then((function(e){return e.al}));case"./translations/locales/sr-me.json":return import("new-request-form-translations").then((function(e){return e.am}));case"./translations/locales/sr.json":return import("new-request-form-translations").then((function(e){return e.an}));case"./translations/locales/sv.json":return import("new-request-form-translations").then((function(e){return e.ao}));case"./translations/locales/th.json":return import("new-request-form-translations").then((function(e){return e.ap}));case"./translations/locales/tr.json":return import("new-request-form-translations").then((function(e){return e.aq}));case"./translations/locales/uk.json":return import("new-request-form-translations").then((function(e){return e.ar}));case"./translations/locales/ur.json":return import("new-request-form-translations").then((function(e){return e.as}));case"./translations/locales/uz.json":return import("new-request-form-translations").then((function(e){return e.at}));case"./translations/locales/vi.json":return import("new-request-form-translations").then((function(e){return e.au}));case"./translations/locales/zh-cn.json":return import("new-request-form-translations").then((function(e){return e.av}));case"./translations/locales/zh-tw.json":return import("new-request-form-translations").then((function(e){return e.aw}));default:return new Promise((function(n,t){("function"==typeof queueMicrotask?queueMicrotask:setTimeout)(t.bind(null,new Error("Unknown variable dynamic import: "+e)))}))}}(`./translations/locales/${r}.json`),()=>function(e){switch(e){case"../ticket-fields/translations/locales/af.json":return import("ticket-fields").then((function(e){return e.b}));case"../ticket-fields/translations/locales/ar-x-pseudo.json":return import("ticket-fields").then((function(e){return e.c}));case"../ticket-fields/translations/locales/ar.json":return import("ticket-fields").then((function(e){return e.d}));case"../ticket-fields/translations/locales/az.json":return import("ticket-fields").then((function(e){return e.e}));case"../ticket-fields/translations/locales/be.json":return import("ticket-fields").then((function(e){return e.f}));case"../ticket-fields/translations/locales/bg.json":return import("ticket-fields").then((function(e){return e.h}));case"../ticket-fields/translations/locales/bn.json":return import("ticket-fields").then((function(e){return e.i}));case"../ticket-fields/translations/locales/bs.json":return import("ticket-fields").then((function(e){return e.j}));case"../ticket-fields/translations/locales/ca.json":return import("ticket-fields").then((function(e){return e.k}));case"../ticket-fields/translations/locales/cs.json":return import("ticket-fields").then((function(e){return e.l}));case"../ticket-fields/translations/locales/cy.json":return import("ticket-fields").then((function(e){return e.m}));case"../ticket-fields/translations/locales/da.json":return import("ticket-fields").then((function(e){return e.n}));case"../ticket-fields/translations/locales/de-de.json":return import("ticket-fields").then((function(e){return e.o}));case"../ticket-fields/translations/locales/de-x-informal.json":return import("ticket-fields").then((function(e){return e.p}));case"../ticket-fields/translations/locales/de.json":return import("ticket-fields").then((function(e){return e.q}));case"../ticket-fields/translations/locales/el.json":return import("ticket-fields").then((function(e){return e.r}));case"../ticket-fields/translations/locales/en-001.json":return import("ticket-fields").then((function(e){return e.s}));case"../ticket-fields/translations/locales/en-150.json":return import("ticket-fields").then((function(e){return e.t}));case"../ticket-fields/translations/locales/en-au.json":return import("ticket-fields").then((function(e){return e.u}));case"../ticket-fields/translations/locales/en-ca.json":return import("ticket-fields").then((function(e){return e.v}));case"../ticket-fields/translations/locales/en-gb.json":return import("ticket-fields").then((function(e){return e.w}));case"../ticket-fields/translations/locales/en-my.json":return import("ticket-fields").then((function(e){return e.x}));case"../ticket-fields/translations/locales/en-ph.json":return import("ticket-fields").then((function(e){return e.y}));case"../ticket-fields/translations/locales/en-se.json":return import("ticket-fields").then((function(e){return e.z}));case"../ticket-fields/translations/locales/en-us.json":return import("ticket-fields").then((function(e){return e.A}));case"../ticket-fields/translations/locales/en-x-dev.json":return import("ticket-fields").then((function(e){return e.B}));case"../ticket-fields/translations/locales/en-x-keys.json":return import("ticket-fields").then((function(e){return e.C}));case"../ticket-fields/translations/locales/en-x-obsolete.json":return import("ticket-fields").then((function(e){return e.E}));case"../ticket-fields/translations/locales/en-x-pseudo.json":return import("ticket-fields").then((function(e){return e.F}));case"../ticket-fields/translations/locales/en-x-test.json":return import("ticket-fields").then((function(e){return e.G}));case"../ticket-fields/translations/locales/es-419.json":return import("ticket-fields").then((function(e){return e.H}));case"../ticket-fields/translations/locales/es-es.json":return import("ticket-fields").then((function(e){return e.J}));case"../ticket-fields/translations/locales/es.json":return import("ticket-fields").then((function(e){return e.K}));case"../ticket-fields/translations/locales/et.json":return import("ticket-fields").then((function(e){return e.L}));case"../ticket-fields/translations/locales/eu.json":return import("ticket-fields").then((function(e){return e.M}));case"../ticket-fields/translations/locales/fa-af.json":return import("ticket-fields").then((function(e){return e.N}));case"../ticket-fields/translations/locales/fa.json":return import("ticket-fields").then((function(e){return e.O}));case"../ticket-fields/translations/locales/fi.json":return import("ticket-fields").then((function(e){return e.P}));case"../ticket-fields/translations/locales/fil.json":return import("ticket-fields").then((function(e){return e.Q}));case"../ticket-fields/translations/locales/fo.json":return import("ticket-fields").then((function(e){return e.R}));case"../ticket-fields/translations/locales/fr-ca.json":return import("ticket-fields").then((function(e){return e.S}));case"../ticket-fields/translations/locales/fr.json":return import("ticket-fields").then((function(e){return e.U}));case"../ticket-fields/translations/locales/ga.json":return import("ticket-fields").then((function(e){return e.V}));case"../ticket-fields/translations/locales/he.json":return import("ticket-fields").then((function(e){return e.W}));case"../ticket-fields/translations/locales/hi.json":return import("ticket-fields").then((function(e){return e.X}));case"../ticket-fields/translations/locales/hr.json":return import("ticket-fields").then((function(e){return e.Y}));case"../ticket-fields/translations/locales/hu.json":return import("ticket-fields").then((function(e){return e.Z}));case"../ticket-fields/translations/locales/hy.json":return import("ticket-fields").then((function(e){return e._}));case"../ticket-fields/translations/locales/id.json":return import("ticket-fields").then((function(e){return e.$}));case"../ticket-fields/translations/locales/is.json":return import("ticket-fields").then((function(e){return e.a0}));case"../ticket-fields/translations/locales/it-ch.json":return import("ticket-fields").then((function(e){return e.a1}));case"../ticket-fields/translations/locales/it.json":return import("ticket-fields").then((function(e){return e.a2}));case"../ticket-fields/translations/locales/ja.json":return import("ticket-fields").then((function(e){return e.a3}));case"../ticket-fields/translations/locales/ka.json":return import("ticket-fields").then((function(e){return e.a4}));case"../ticket-fields/translations/locales/kk.json":return import("ticket-fields").then((function(e){return e.a5}));case"../ticket-fields/translations/locales/kl-dk.json":return import("ticket-fields").then((function(e){return e.a6}));case"../ticket-fields/translations/locales/ko.json":return import("ticket-fields").then((function(e){return e.a7}));case"../ticket-fields/translations/locales/ku.json":return import("ticket-fields").then((function(e){return e.a8}));case"../ticket-fields/translations/locales/lt.json":return import("ticket-fields").then((function(e){return e.a9}));case"../ticket-fields/translations/locales/lv.json":return import("ticket-fields").then((function(e){return e.aa}));case"../ticket-fields/translations/locales/mk.json":return import("ticket-fields").then((function(e){return e.ab}));case"../ticket-fields/translations/locales/mn.json":return import("ticket-fields").then((function(e){return e.ac}));case"../ticket-fields/translations/locales/ms.json":return import("ticket-fields").then((function(e){return e.ad}));case"../ticket-fields/translations/locales/mt.json":return import("ticket-fields").then((function(e){return e.ae}));case"../ticket-fields/translations/locales/my.json":return import("ticket-fields").then((function(e){return e.af}));case"../ticket-fields/translations/locales/nl-be.json":return import("ticket-fields").then((function(e){return e.ag}));case"../ticket-fields/translations/locales/nl.json":return import("ticket-fields").then((function(e){return e.ah}));case"../ticket-fields/translations/locales/no.json":return import("ticket-fields").then((function(e){return e.ai}));case"../ticket-fields/translations/locales/pl.json":return import("ticket-fields").then((function(e){return e.aj}));case"../ticket-fields/translations/locales/pt-br.json":return import("ticket-fields").then((function(e){return e.ak}));case"../ticket-fields/translations/locales/pt.json":return import("ticket-fields").then((function(e){return e.al}));case"../ticket-fields/translations/locales/ro.json":return import("ticket-fields").then((function(e){return e.am}));case"../ticket-fields/translations/locales/ru.json":return import("ticket-fields").then((function(e){return e.an}));case"../ticket-fields/translations/locales/sk.json":return import("ticket-fields").then((function(e){return e.ao}));case"../ticket-fields/translations/locales/sl.json":return import("ticket-fields").then((function(e){return e.ap}));case"../ticket-fields/translations/locales/sq.json":return import("ticket-fields").then((function(e){return e.aq}));case"../ticket-fields/translations/locales/sr-me.json":return import("ticket-fields").then((function(e){return e.ar}));case"../ticket-fields/translations/locales/sr.json":return import("ticket-fields").then((function(e){return e.as}));case"../ticket-fields/translations/locales/sv.json":return import("ticket-fields").then((function(e){return e.at}));case"../ticket-fields/translations/locales/th.json":return import("ticket-fields").then((function(e){return e.au}));case"../ticket-fields/translations/locales/tr.json":return import("ticket-fields").then((function(e){return e.av}));case"../ticket-fields/translations/locales/uk.json":return import("ticket-fields").then((function(e){return e.aw}));case"../ticket-fields/translations/locales/ur.json":return import("ticket-fields").then((function(e){return e.ax}));case"../ticket-fields/translations/locales/uz.json":return import("ticket-fields").then((function(e){return e.ay}));case"../ticket-fields/translations/locales/vi.json":return import("ticket-fields").then((function(e){return e.az}));case"../ticket-fields/translations/locales/zh-cn.json":return import("ticket-fields").then((function(e){return e.aA}));case"../ticket-fields/translations/locales/zh-tw.json":return import("ticket-fields").then((function(e){return e.aB}));default:return new Promise((function(n,t){("function"==typeof queueMicrotask?queueMicrotask:setTimeout)(t.bind(null,new Error("Unknown variable dynamic import: "+e)))}))}}(`../ticket-fields/translations/locales/${r}.json`),()=>function(e){switch(e){case"../shared/translations/locales/af.json":return import("shared").then((function(e){return e.ak}));case"../shared/translations/locales/ar-x-pseudo.json":return import("shared").then((function(e){return e.al}));case"../shared/translations/locales/ar.json":return import("shared").then((function(e){return e.am}));case"../shared/translations/locales/az.json":return import("shared").then((function(e){return e.an}));case"../shared/translations/locales/be.json":return import("shared").then((function(e){return e.ao}));case"../shared/translations/locales/bg.json":return import("shared").then((function(e){return e.ap}));case"../shared/translations/locales/bn.json":return import("shared").then((function(e){return e.aq}));case"../shared/translations/locales/bs.json":return import("shared").then((function(e){return e.ar}));case"../shared/translations/locales/ca.json":return import("shared").then((function(e){return e.as}));case"../shared/translations/locales/cs.json":return import("shared").then((function(e){return e.at}));case"../shared/translations/locales/cy.json":return import("shared").then((function(e){return e.au}));case"../shared/translations/locales/da.json":return import("shared").then((function(e){return e.av}));case"../shared/translations/locales/de-de.json":return import("shared").then((function(e){return e.aw}));case"../shared/translations/locales/de-x-informal.json":return import("shared").then((function(e){return e.ax}));case"../shared/translations/locales/de.json":return import("shared").then((function(e){return e.ay}));case"../shared/translations/locales/el.json":return import("shared").then((function(e){return e.az}));case"../shared/translations/locales/en-001.json":return import("shared").then((function(e){return e.aA}));case"../shared/translations/locales/en-150.json":return import("shared").then((function(e){return e.aB}));case"../shared/translations/locales/en-au.json":return import("shared").then((function(e){return e.aC}));case"../shared/translations/locales/en-ca.json":return import("shared").then((function(e){return e.aD}));case"../shared/translations/locales/en-gb.json":return import("shared").then((function(e){return e.aE}));case"../shared/translations/locales/en-my.json":return import("shared").then((function(e){return e.aF}));case"../shared/translations/locales/en-ph.json":return import("shared").then((function(e){return e.aG}));case"../shared/translations/locales/en-se.json":return import("shared").then((function(e){return e.aH}));case"../shared/translations/locales/en-us.json":return import("shared").then((function(e){return e.aI}));case"../shared/translations/locales/en-x-dev.json":return import("shared").then((function(e){return e.aJ}));case"../shared/translations/locales/en-x-keys.json":return import("shared").then((function(e){return e.aK}));case"../shared/translations/locales/en-x-obsolete.json":return import("shared").then((function(e){return e.aL}));case"../shared/translations/locales/en-x-pseudo.json":return import("shared").then((function(e){return e.aM}));case"../shared/translations/locales/en-x-test.json":return import("shared").then((function(e){return e.aN}));case"../shared/translations/locales/es-419.json":return import("shared").then((function(e){return e.aO}));case"../shared/translations/locales/es-es.json":return import("shared").then((function(e){return e.aP}));case"../shared/translations/locales/es.json":return import("shared").then((function(e){return e.aQ}));case"../shared/translations/locales/et.json":return import("shared").then((function(e){return e.aR}));case"../shared/translations/locales/eu.json":return import("shared").then((function(e){return e.aS}));case"../shared/translations/locales/fa-af.json":return import("shared").then((function(e){return e.aT}));case"../shared/translations/locales/fa.json":return import("shared").then((function(e){return e.aU}));case"../shared/translations/locales/fi.json":return import("shared").then((function(e){return e.aV}));case"../shared/translations/locales/fil.json":return import("shared").then((function(e){return e.aW}));case"../shared/translations/locales/fo.json":return import("shared").then((function(e){return e.aX}));case"../shared/translations/locales/fr-ca.json":return import("shared").then((function(e){return e.aY}));case"../shared/translations/locales/fr.json":return import("shared").then((function(e){return e.aZ}));case"../shared/translations/locales/ga.json":return import("shared").then((function(e){return e.a_}));case"../shared/translations/locales/he.json":return import("shared").then((function(e){return e.a$}));case"../shared/translations/locales/hi.json":return import("shared").then((function(e){return e.b0}));case"../shared/translations/locales/hr.json":return import("shared").then((function(e){return e.b1}));case"../shared/translations/locales/hu.json":return import("shared").then((function(e){return e.b2}));case"../shared/translations/locales/hy.json":return import("shared").then((function(e){return e.b3}));case"../shared/translations/locales/id.json":return import("shared").then((function(e){return e.b4}));case"../shared/translations/locales/is.json":return import("shared").then((function(e){return e.b5}));case"../shared/translations/locales/it-ch.json":return import("shared").then((function(e){return e.b6}));case"../shared/translations/locales/it.json":return import("shared").then((function(e){return e.b7}));case"../shared/translations/locales/ja.json":return import("shared").then((function(e){return e.b8}));case"../shared/translations/locales/ka.json":return import("shared").then((function(e){return e.b9}));case"../shared/translations/locales/kk.json":return import("shared").then((function(e){return e.ba}));case"../shared/translations/locales/kl-dk.json":return import("shared").then((function(e){return e.bb}));case"../shared/translations/locales/ko.json":return import("shared").then((function(e){return e.bc}));case"../shared/translations/locales/ku.json":return import("shared").then((function(e){return e.bd}));case"../shared/translations/locales/lt.json":return import("shared").then((function(e){return e.be}));case"../shared/translations/locales/lv.json":return import("shared").then((function(e){return e.bf}));case"../shared/translations/locales/mk.json":return import("shared").then((function(e){return e.bg}));case"../shared/translations/locales/mn.json":return import("shared").then((function(e){return e.bh}));case"../shared/translations/locales/ms.json":return import("shared").then((function(e){return e.bi}));case"../shared/translations/locales/mt.json":return import("shared").then((function(e){return e.bj}));case"../shared/translations/locales/my.json":return import("shared").then((function(e){return e.bk}));case"../shared/translations/locales/nl-be.json":return import("shared").then((function(e){return e.bl}));case"../shared/translations/locales/nl.json":return import("shared").then((function(e){return e.bm}));case"../shared/translations/locales/no.json":return import("shared").then((function(e){return e.bn}));case"../shared/translations/locales/pl.json":return import("shared").then((function(e){return e.bo}));case"../shared/translations/locales/pt-br.json":return import("shared").then((function(e){return e.bp}));case"../shared/translations/locales/pt.json":return import("shared").then((function(e){return e.bq}));case"../shared/translations/locales/ro.json":return import("shared").then((function(e){return e.br}));case"../shared/translations/locales/ru.json":return import("shared").then((function(e){return e.bs}));case"../shared/translations/locales/sk.json":return import("shared").then((function(e){return e.bt}));case"../shared/translations/locales/sl.json":return import("shared").then((function(e){return e.bu}));case"../shared/translations/locales/sq.json":return import("shared").then((function(e){return e.bv}));case"../shared/translations/locales/sr-me.json":return import("shared").then((function(e){return e.bw}));case"../shared/translations/locales/sr.json":return import("shared").then((function(e){return e.bx}));case"../shared/translations/locales/sv.json":return import("shared").then((function(e){return e.by}));case"../shared/translations/locales/th.json":return import("shared").then((function(e){return e.bz}));case"../shared/translations/locales/tr.json":return import("shared").then((function(e){return e.bA}));case"../shared/translations/locales/uk.json":return import("shared").then((function(e){return e.bB}));case"../shared/translations/locales/ur.json":return import("shared").then((function(e){return e.bC}));case"../shared/translations/locales/uz.json":return import("shared").then((function(e){return e.bD}));case"../shared/translations/locales/vi.json":return import("shared").then((function(e){return e.bE}));case"../shared/translations/locales/zh-cn.json":return import("shared").then((function(e){return e.bF}));case"../shared/translations/locales/zh-tw.json":return import("shared").then((function(e){return e.bG}));default:return new Promise((function(n,t){("function"==typeof queueMicrotask?queueMicrotask:setTimeout)(t.bind(null,new Error("Unknown variable dynamic import: "+e)))}))}}(`../shared/translations/locales/${r}.json`)]),V.render(n.jsx(W,{theme:K(e),children:n.jsx(Ue,{...t})}),s)}export{Be as renderNewRequestForm};
