import { r as reactExports, j as jsxRuntimeExports, g as Field, h as Combobox, O as Option, p as purify, l as useGrid, K as KEYS, s as styled, m as focusStyles, o as FauxInput, q as Tag, I as Input, u as useTranslation, b as Field$1, T as Tooltip, S as Span, t as SvgAlertWarningStroke, $ as $e, A as Anchor, v as Modal, w as getColor, x as SvgCheckCircleStroke, y as useModalContainer, z as Accordion, B as Paragraph, E as Button, G as addFlashNotification, H as getColorV8, J as SvgSparkleFill, L as Avatar, N as Dots, Q as FooterItem, R as Header, U as Body, V as Footer$1, W as Close, n as notify, X as Alert, Y as initI18next, Z as loadTranslations, _ as reactDomExports, a0 as ThemeProviders, a1 as createTheme } from 'shared';
import { g as getVisibleFields, I as Input$1, D as DropDown, T as TextArea, R as RequestFormField, A as Attachments } from 'ticket-fields';

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
    return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx("input", { type: "hidden", name: field.name, value: field.value }), field.options.length > 1 && (jsxRuntimeExports.jsxs(Field, { children: [jsxRuntimeExports.jsx(Field.Label, { children: field.label }), jsxRuntimeExports.jsx(Combobox, { isEditable: false, onChange: handleChange, ref: ref, children: field.options.map((option) => (jsxRuntimeExports.jsx(Option, { value: option.value, label: option.name, isSelected: field.value === option.value, children: option.name }, option.value))) })] }))] }));
}

function ParentTicketField({ field, }) {
    const { value, name } = field;
    return jsxRuntimeExports.jsx("input", { type: "hidden", name: name, value: value });
}

async function fetchCsrfToken() {
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
                    const token = await fetchCsrfToken();
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
            (e.key === KEYS.SPACE ||
                e.key === KEYS.ENTER ||
                e.key === KEYS.TAB ||
                e.key === KEYS.COMMA)) {
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
    const handleInputOnBlur = (e) => {
        const target = e.target;
        const tag = target.value;
        if (tag) {
            if (!hasTag(tag)) {
                addTag(tag);
            }
            onInputValueChange("");
        }
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
        onBlur: handleInputOnBlur,
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
  margin-inline-end: ${(props) => props.theme.space.sm};
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
    return (jsxRuntimeExports.jsxs(Field$1, { children: [jsxRuntimeExports.jsx(Field$1.Label, { children: label }), description && jsxRuntimeExports.jsx(Field$1.Hint, { children: description }), jsxRuntimeExports.jsxs(Container$1, { ...getContainerProps(), children: [tags.length > 0 && (jsxRuntimeExports.jsx("span", { ...getGridProps({
                            "aria-label": t("new-request-form.cc-field.container-label", "Selected CC emails"),
                        }), children: jsxRuntimeExports.jsx("span", { ref: gridRowRef, ...getGridRowProps(), children: tags.map((email, index) => {
                                const isValid = EMAIL_REGEX.test(email);
                                return isValid ? (jsxRuntimeExports.jsx(GridCell, { ...getGridCellProps(index), children: renderTag(index, isValid, email) }, index)) : (jsxRuntimeExports.jsx(Tooltip, { content: t("new-request-form.cc-field.invalid-email", "Invalid email address"), children: jsxRuntimeExports.jsx(GridCell, { ...getGridCellProps(index), children: renderTag(index, isValid, email) }) }, index));
                            }) }) })), jsxRuntimeExports.jsxs(InputWrapper, { children: [jsxRuntimeExports.jsx(InputMirror, { isBare: true, "aria-hidden": "true", tabIndex: -1, children: inputValue }), jsxRuntimeExports.jsx(StyledInput, { ref: inputRef, isBare: true, ...getInputProps() })] })] }), error && (jsxRuntimeExports.jsx(Field$1.Message, { validation: "error", children: error })), tags.map((email) => (jsxRuntimeExports.jsx("input", { type: "hidden", name: name, value: email }, email))), jsxRuntimeExports.jsx(Span, { hidden: true, ...getAnnouncementProps(), children: announcement })] }));
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
    return articles.length > 0 ? (jsxRuntimeExports.jsx(Container, { "data-test-id": "suggested-articles", children: jsxRuntimeExports.jsxs(InnerContainer, { children: [jsxRuntimeExports.jsx("h2", { children: t("new-request-form.suggested-articles", "Suggested articles") }), jsxRuntimeExports.jsx(UnstyledList, { children: articles.map((article) => (jsxRuntimeExports.jsx(ListItem, { children: jsxRuntimeExports.jsx(Anchor, { isExternal: true, rel: "noopener", externalIconLabel: t("new-request-form.suggested-articles-external-link-label", "(Opens in a new tab)"), href: article.html_url, children: article.name }) }, article.html_url))) })] }) })) : null;
}

const H3 = styled.h3 `
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;
const StyledHeader = styled(Modal.Header) `
  color: ${({ theme }) => getColor({ theme, hue: "successHue", shade: 700 })};
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
        }, children: [jsxRuntimeExports.jsxs(StyledHeader, { tag: "h2", children: [jsxRuntimeExports.jsx(StyledSuccessIcon, {}), t("new-request-form.answer-bot-modal.request-submitted", "Your request was successfully submitted")] }), jsxRuntimeExports.jsxs(Modal.Body, { children: [jsxRuntimeExports.jsx(H3, { children: t("new-request-form.answer-bot-modal.title", "While you wait, do any of these articles answer your question?") }), jsxRuntimeExports.jsx("p", { children: t("new-request-form.answer-bot-modal.footer-content", "If it does, we can close your recent request {{requestId}}", {
                            requestId: `\u202D#${requestId}\u202C`,
                        }) }), jsxRuntimeExports.jsx(Accordion, { level: 4, expandedSections: [expandedIndex], onChange: (index) => {
                            setExpandedIndex(index);
                        }, children: articles.map(({ article_id, html_url, snippet, title }) => (jsxRuntimeExports.jsxs(Accordion.Section, { children: [jsxRuntimeExports.jsx(Accordion.Header, { children: jsxRuntimeExports.jsx(Accordion.Label, { children: title }) }), jsxRuntimeExports.jsxs(Accordion.Panel, { children: [jsxRuntimeExports.jsx(Paragraph, { dangerouslySetInnerHTML: { __html: snippet } }), jsxRuntimeExports.jsx(ArticleLink, { isExternal: true, href: `${html_url}?auth_token=${authToken}`, target: "_blank", children: t("new-request-form.answer-bot-modal.view-article", "View article") })] })] }, article_id))) })] }), jsxRuntimeExports.jsxs(Modal.Footer, { children: [jsxRuntimeExports.jsx(Modal.FooterItem, { children: jsxRuntimeExports.jsx(Button, { onClick: () => {
                                markArticleAsIrrelevant();
                            }, children: t("new-request-form.answer-bot-modal.mark-irrelevant", "No, I need help") }) }), jsxRuntimeExports.jsx(Modal.FooterItem, { children: jsxRuntimeExports.jsx(Button, { isPrimary: true, onClick: () => {
                                solveRequest();
                            }, children: t("new-request-form.answer-bot-modal.solve-request", "Yes, close my request") }) })] }), jsxRuntimeExports.jsx(Modal.Close, { "aria-label": t("new-request-form.close-label", "Close") })] }));
}

var FeedbackType;
(function (FeedbackType) {
    FeedbackType["POSITIVE"] = "resolution";
    FeedbackType["NEGATIVE"] = "rejection";
})(FeedbackType || (FeedbackType = {}));

const SourcesContainer = styled.div `
  border-top: 1px solid ${(props) => getColorV8("neutralHue", 300, props.theme)};
  padding: ${(props) => props.theme.space.sm}
    calc(2 * ${(props) => props.theme.space.sm});
  font-size: ${(props) => props.theme.fontSizes.sm};
`;
const CitationsLinksContainer = styled.div `
  margin-top: ${(props) => props.theme.space.sm};
`;
const CitationsLinksWrapper = styled.div `
  margin-top: ${(props) => props.theme.space.sm};
  padding-bottom: ${(props) => props.theme.space.sm};
`;
const CitationLink = styled(Span) `
  color: ${(props) => getColorV8("blue", 600, props.theme)};
  a {
    text-decoration: underline;
  }
`;
const SourcesButtonsContainer = styled.div `
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
function GenerativeAnswerSourcesList({ citations, testId, }) {
    const { t } = useTranslation();
    const [areCitationsVisible, setAreCitationsVisible] = reactExports.useState(false);
    return (jsxRuntimeExports.jsx(SourcesContainer, { children: areCitationsVisible ? (jsxRuntimeExports.jsxs(CitationsLinksContainer, { children: [jsxRuntimeExports.jsx(Paragraph, { size: "small", children: t("new-request-form.answer-bot-generative-modal.sources_description", "This message was automatically generated using AI and the following article sources:") }), jsxRuntimeExports.jsx(CitationsLinksWrapper, { children: citations.map((citation, index) => (jsxRuntimeExports.jsxs(CitationLink, { children: [jsxRuntimeExports.jsx(Anchor, { id: `${testId}-source-link-${index}`, href: citation.html_url, target: "_blank", children: citation.title }), index < citations.length - 1 && ", "] }, citation.article_id))) })] })) : (jsxRuntimeExports.jsxs(SourcesButtonsContainer, { children: [jsxRuntimeExports.jsxs(Span, { children: [jsxRuntimeExports.jsx(Span.StartIcon, { children: jsxRuntimeExports.jsx(SvgSparkleFill, {}) }), t("new-request-form.answer-bot-generative-modal.generated_by_ai", "Generated by AI")] }), jsxRuntimeExports.jsx(Button, { size: "small", isBasic: true, onClick: () => setAreCitationsVisible(true), id: `${testId}-show-sources-button`, children: t("new-request-form.answer-bot-generative-modal.view_sources", "View Sources") })] })) }));
}

const GeneratedAnswerContainer = styled.div `
  background-color: #f4f6f8;
  border-radius: 10px;
`;
const GeneratedAnswerContent = styled.div `
  margin-top: ${(props) => props.theme.space.xs};
  padding: calc(2 * ${(props) => props.theme.space.sm});
  white-space: break-spaces;
`;
function GenerativeAnswerContent({ generatedAnswer, citations, testId, }) {
    return (jsxRuntimeExports.jsxs(GeneratedAnswerContainer, { children: [jsxRuntimeExports.jsx(GeneratedAnswerContent, { id: `${testId}-generated-answer-content`, children: generatedAnswer }), jsxRuntimeExports.jsx(GenerativeAnswerSourcesList, { citations: citations, testId: testId })] }));
}

const AgentMessageContainer = styled.div `
  display: flex;
  gap: ${(props) => props.theme.space.xs};
  margin-top: ${(props) => props.theme.space.md};
  align-items: end;
`;
const AgentMessage = styled.div `
  max-height: 40px; /* specific height, avatar size plus a small difference */
  display: flex;
  padding: ${(props) => props.theme.space.sm};
  border-radius: ${(props) => props.theme.rtl ? "16px 16px 0px 16px" : "16px 16px 16px 0px"};
  gap: ${(props) => props.theme.space.sm};
  align-items: center;
  background-color: #f4f6f8;
`;
function GenerativeAnswerBotModalBody({ isLoading, isError, generatedAnswer, citations, testId, }) {
    const { t } = useTranslation();
    if (isError) {
        return (jsxRuntimeExports.jsx(Span, { children: t("new-request-form.answer-bot-generative-modal.error.subtitle", "The AI wasn’t able to find an answer this time. Don't worry, a human agent will get back to you by email shortly.") }));
    }
    return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(Span, { children: isLoading
                    ? t("new-request-form.answer-bot-generative-modal.loading.subtitle", "While you wait, an AI agent will try to find an answer to your request. If you close this window, you'll receive an email follow-up.")
                    : t("new-request-form.answer-bot-generative-modal.default.subtitle", "If the following information resolves your request and you no longer require assistance, you can inform us by clicking 'This helped, solve my request'.") }), jsxRuntimeExports.jsxs(AgentMessageContainer, { children: [jsxRuntimeExports.jsx(Avatar, { size: "small", isSystem: true, children: jsxRuntimeExports.jsx("img", { src: "https://accounts.zendesk.com/flow_director/assets/default_avatar.png", alt: t("new-request-form.answer-bot-generative-modal.ai_agent_avatar_alt", "AI Agent Avatar") }) }), jsxRuntimeExports.jsxs(AgentMessage, { children: [jsxRuntimeExports.jsx(Span, { children: isLoading
                                    ? t("new-request-form.answer-bot-generative-modal.loading.start", "Thinking")
                                    : t("new-request-form.answer-bot-generative-modal.loading.finished", "I found something that might help...") }), isLoading && jsxRuntimeExports.jsx(Dots, { size: 16 })] })] }), generatedAnswer && (jsxRuntimeExports.jsx(GenerativeAnswerContent, { generatedAnswer: generatedAnswer, citations: citations, testId: testId }))] }));
}

function GenerativeAnswerBotModalFooter({ isLoading, isError, isSubmittingFeedback, testId, onClose, onReject, onResolve, }) {
    const { t } = useTranslation();
    if (isError) {
        return (jsxRuntimeExports.jsx(Button, { isPrimary: true, onClick: onClose, children: t("new-request-form.answer-bot-generative-modal.buttons.ok", "Ok") }));
    }
    if (isLoading) {
        return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(FooterItem, { children: jsxRuntimeExports.jsx(Button, { onClick: onClose, id: `${testId}-discard-button`, isBasic: true, children: t("new-request-form.answer-bot-generative-modal.buttons.close", "Close") }) }), jsxRuntimeExports.jsx(FooterItem, { children: jsxRuntimeExports.jsx(Button, { isPrimary: true, disabled: true, children: jsxRuntimeExports.jsx(Dots, { size: 24, color: "white" }) }) })] }));
    }
    return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(FooterItem, { children: jsxRuntimeExports.jsx(Button, { onClick: onReject, id: `${testId}-reject-button`, isBasic: true, disabled: isSubmittingFeedback, children: t("new-request-form.answer-bot-generative-modal.buttons.still_need_help", "I still need help") }) }), jsxRuntimeExports.jsx(FooterItem, { children: jsxRuntimeExports.jsx(Button, { isPrimary: true, onClick: onResolve, id: `${testId}-resolve-button`, disabled: isSubmittingFeedback, children: t("new-request-form.answer-bot-generative-modal.buttons.this_helped", "This helped, solve my request") }) })] }));
}

const testId = "ab-generative-modal";
const fetchGenerateReplyStatusEndpoint = (requestId) => `/hc/answer_bot/generate_reply_status/${requestId}`;
const generateReplyEndpoint = (requestId) => `/hc/answer_bot/generate_reply_v2/${requestId}`;
const fetchGeneratedResponseEndpoint = (requestId) => `/hc/answer_bot/generated_response/${requestId}`;
const submitFeedbackEndpoint = (feedbackType, token) => `/api/v2/answer_bot/generative_deflection/${feedbackType}?auth_token=${token}`;
function GenerativeAnswerBotModal({ requestId, hasRequestManagement, isSignedIn, helpCenterPath, requestsPath, requestPath, }) {
    const modalContainer = useModalContainer();
    const { t } = useTranslation();
    const [modalState, setModalState] = reactExports.useState({
        generatedAnswer: "",
        citations: [],
        authToken: "",
        isLoading: true,
        isError: false,
        isSubmittingFeedback: false,
    });
    const intervalIdRef = reactExports.useRef(null);
    reactExports.useEffect(() => {
        let isMounted = true;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const pendingCallback = async (_requestId) => {
            return false;
        };
        const completedCallback = async (requestId) => {
            try {
                const response = await fetch(fetchGeneratedResponseEndpoint(requestId), {
                    credentials: "same-origin",
                });
                const { generated_answer, citations, ticket_deflection } = await response.json();
                setModalState((prev) => ({
                    ...prev,
                    generatedAnswer: generated_answer,
                    citations,
                    authToken: ticket_deflection.auth_token,
                    isLoading: false,
                    isError: !generated_answer,
                }));
                return true;
            }
            catch (error) {
                setModalState((prev) => ({
                    ...prev,
                    isError: true,
                    isLoading: false,
                }));
                return true;
            }
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const failedCallback = async (_requestId) => {
            setModalState((prev) => ({
                ...prev,
                isError: true,
                isLoading: false,
            }));
            return true;
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const notFoundCallback = async (_requestId) => {
            setModalState((prev) => ({
                ...prev,
                isError: true,
                isLoading: false,
            }));
            return true;
        };
        const jobMapping = {
            pending: pendingCallback,
            completed: completedCallback,
            failed: failedCallback,
            not_found: notFoundCallback,
        };
        async function generateReply() {
            try {
                await fetch(generateReplyEndpoint(requestId), {
                    credentials: "same-origin",
                });
            }
            catch (error) {
                if (isMounted) {
                    setModalState((prev) => ({
                        ...prev,
                        isError: true,
                        isLoading: false,
                    }));
                }
            }
            const fetchGenerateReply = async () => {
                try {
                    const response = await fetch(fetchGenerateReplyStatusEndpoint(requestId), { credentials: "same-origin" });
                    const { status } = await response.json();
                    if (!jobMapping[status])
                        throw new Error(`Unknown job status: ${status}`);
                    return await jobMapping[status]?.(requestId);
                }
                catch (error) {
                    setModalState((prev) => ({
                        ...prev,
                        isError: true,
                        isLoading: false,
                    }));
                    return true;
                }
            };
            if (await fetchGenerateReply())
                return;
            intervalIdRef.current = setInterval(async () => {
                if (await fetchGenerateReply()) {
                    if (intervalIdRef.current) {
                        clearInterval(intervalIdRef.current);
                        intervalIdRef.current = null;
                    }
                }
            }, 2000);
        }
        generateReply();
        return () => {
            isMounted = false;
            if (intervalIdRef.current) {
                clearInterval(intervalIdRef.current);
                intervalIdRef.current = null;
            }
        };
    }, [requestId]);
    const getRedirectUrl = () => {
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
    const addFlashNotificationAndRedirect = (message) => {
        addFlashNotification({
            type: "success",
            message,
        });
        window.location.assign(getRedirectUrl());
    };
    const onClose = () => {
        addFlashNotificationAndRedirect(t("new-request-form.answer-bot-generative-modal.request-submitted", "Your request was successfully submitted"));
    };
    const onReject = async () => await sendFeedback(FeedbackType.NEGATIVE);
    const onResolve = async () => await sendFeedback(FeedbackType.POSITIVE);
    const handleFeedbackError = () => {
        notify({
            type: "error",
            message: t("new-request-form.answer-bot-generative-modal.feedback-error", "There was an error submitting your feedback"),
        });
        setModalState((prev) => ({ ...prev, isSubmittingFeedback: false }));
    };
    const sendFeedback = async (feedbackType) => {
        const { authToken } = modalState;
        if (!authToken) {
            handleFeedbackError();
            console.error("[GenerativeAnswerBotModal][sendFeedback]: Auth token is missing");
            return;
        }
        setModalState((prev) => ({ ...prev, isSubmittingFeedback: true }));
        try {
            const csrfToken = await fetchCsrfToken();
            const response = await fetch(submitFeedbackEndpoint(feedbackType, authToken), {
                headers: {
                    ...(csrfToken && { "X-CSRF-Token": csrfToken }),
                },
            });
            if (!response.ok) {
                handleFeedbackError();
            }
            else {
                addFlashNotificationAndRedirect(feedbackType === FeedbackType.POSITIVE
                    ? t("new-request-form.answer-bot-generative-modal.request-closed", "Your request has been solved")
                    : t("new-request-form.answer-bot-generative-modal.request-submitted", "Your request was successfully submitted"));
            }
        }
        catch (error) {
            handleFeedbackError();
        }
    };
    return (jsxRuntimeExports.jsxs(Modal, { appendToNode: modalContainer, onClose: onClose, isLarge: true, children: [jsxRuntimeExports.jsx(Header, { children: modalState.isError
                    ? t("new-request-form.answer-bot-generative-modal.error.title", "An agent will be in touch soon")
                    : t("new-request-form.answer-bot-generative-modal.default.title", "Your request was submitted successfully") }), jsxRuntimeExports.jsx(Body, { children: jsxRuntimeExports.jsx(GenerativeAnswerBotModalBody, { isLoading: modalState.isLoading, isError: modalState.isError, generatedAnswer: modalState.generatedAnswer, citations: modalState.citations, testId: testId }) }), jsxRuntimeExports.jsx(Footer$1, { children: jsxRuntimeExports.jsx(GenerativeAnswerBotModalFooter, { isLoading: modalState.isLoading, isError: modalState.isError, isSubmittingFeedback: modalState.isSubmittingFeedback, testId: testId, onClose: onClose, onReject: onReject, onResolve: onResolve }) }), jsxRuntimeExports.jsx(Close, { "aria-label": t("new-request-form.answer-bot-generative-modal.close_modal_aria_label", "Close modal") })] }));
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
function NewRequestForm({ requestForm, wysiwyg, newRequestPath, parentId, parentIdPath, locale, baseLocale, hasAtMentions, userRole, userId, brandId, organizations, answerBotModal, }) {
    const { ticket_fields, action, http_method, accept_charset, errors, parent_id_field, ticket_form_field, email_field, cc_field, organization_field, due_date_field, end_user_conditions, attachments_field, inline_attachments_fields, description_mimetype_field, } = requestForm;
    const { answerBot, answerBotGenerativeExperience } = answerBotModal;
    const { ticketFields: prefilledTicketFields, emailField, ccField, organizationField: prefilledOrganizationField, dueDateField: prefilledDueDateField, } = usePrefilledTicketFields({
        ticketFields: ticket_fields,
        emailField: email_field,
        ccField: cc_field,
        organizationField: organization_field,
        dueDateField: due_date_field,
    });
    const [ticketFields, setTicketFields] = reactExports.useState(prefilledTicketFields);
    const [organizationField, setOrganizationField] = reactExports.useState(prefilledOrganizationField);
    const [dueDateField, setDueDateField] = reactExports.useState(prefilledDueDateField);
    const visibleFields = getVisibleFields(ticketFields, end_user_conditions);
    const { formRefCallback, handleSubmit } = useFormSubmit(ticketFields);
    const { t } = useTranslation();
    const defaultOrganizationId = organizations.length > 0 && organizations[0]?.id
        ? organizations[0]?.id?.toString()
        : null;
    const handleChange = reactExports.useCallback((field, value) => {
        setTicketFields(ticketFields.map((ticketField) => ticketField.name === field.name
            ? { ...ticketField, value }
            : ticketField));
    }, [ticketFields]);
    function handleOrganizationChange(value) {
        if (organizationField === null) {
            return;
        }
        setOrganizationField({ ...organizationField, value });
    }
    const handleDueDateChange = reactExports.useCallback((value) => {
        if (dueDateField === null) {
            return;
        }
        setDueDateField({ ...dueDateField, value });
    }, [dueDateField]);
    const answerBotModalEnabled = !!answerBot?.auth_token &&
        !!answerBot?.interaction_access_token &&
        !!answerBot?.articles?.length &&
        !!answerBot?.request_id;
    const answerBotGenerativeModalEnabled = answerBotGenerativeExperience &&
        Boolean(answerBotGenerativeExperience.request_id);
    return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [parentId && (jsxRuntimeExports.jsx(StyledParagraph, { children: jsxRuntimeExports.jsx(Anchor, { href: parentIdPath, children: t("new-request-form.parent-request-link", "Follow-up to request {{parentId}}", {
                        parentId: `\u202D#${parentId}\u202C`,
                    }) }) })), jsxRuntimeExports.jsx(StyledParagraph, { "aria-hidden": "true", children: t("new-request-form.required-fields-info", "Fields marked with an asterisk (*) are required.") }), jsxRuntimeExports.jsxs(Form, { ref: formRefCallback, action: action, method: http_method, acceptCharset: accept_charset, noValidate: true, onSubmit: handleSubmit, children: [errors && jsxRuntimeExports.jsx(Alert, { type: "error", children: errors }), parent_id_field && jsxRuntimeExports.jsx(ParentTicketField, { field: parent_id_field }), ticket_form_field.options.length > 0 && (jsxRuntimeExports.jsx(TicketFormField, { field: ticket_form_field, newRequestPath: newRequestPath })), emailField && jsxRuntimeExports.jsx(Input$1, { field: emailField }, emailField.name), ccField && jsxRuntimeExports.jsx(CcField, { field: ccField }), organizationField && (jsxRuntimeExports.jsx(DropDown, { field: organizationField, onChange: (value) => {
                            handleOrganizationChange(value);
                        } }, organizationField.name)), visibleFields.map((field) => {
                        if (field.type === "subject") {
                            return (jsxRuntimeExports.jsxs(reactExports.Fragment, { children: [jsxRuntimeExports.jsx(Input$1, { field: field, onChange: (value) => handleChange(field, value) }), jsxRuntimeExports.jsx(SuggestedArticles, { query: field.value, locale: locale })] }, field.name));
                        }
                        else if (field.type === "description") {
                            return (jsxRuntimeExports.jsxs(reactExports.Fragment, { children: [jsxRuntimeExports.jsx(TextArea, { field: field, hasWysiwyg: wysiwyg, baseLocale: baseLocale, hasAtMentions: hasAtMentions, userRole: userRole, brandId: brandId, onChange: (value) => handleChange(field, value) }), jsxRuntimeExports.jsx("input", { type: "hidden", name: description_mimetype_field.name, value: wysiwyg ? "text/html" : "text/plain" })] }, field.name));
                        }
                        else {
                            return (jsxRuntimeExports.jsx(RequestFormField, { field: field, baseLocale: baseLocale, hasAtMentions: hasAtMentions, userRole: userRole, userId: userId, brandId: brandId, dueDateField: dueDateField, handleDueDateChange: handleDueDateChange, organizationField: organizationField, defaultOrganizationId: defaultOrganizationId, visibleFields: visibleFields, handleChange: handleChange }, field.name));
                        }
                    }), attachments_field && (jsxRuntimeExports.jsx(Attachments, { field: attachments_field, baseLocale: baseLocale })), inline_attachments_fields.map(({ type, name, value }, index) => (jsxRuntimeExports.jsx("input", { type: type, name: name, value: value }, index))), jsxRuntimeExports.jsx(Footer, { children: (ticket_form_field.options.length === 0 ||
                            ticket_form_field.value) && (jsxRuntimeExports.jsx(Button, { isPrimary: true, type: "submit", children: t("new-request-form.submit", "Submit") })) })] }), answerBotModalEnabled && (jsxRuntimeExports.jsx(AnswerBotModal, { authToken: answerBot.auth_token, interactionAccessToken: answerBot.interaction_access_token, articles: answerBot.articles, requestId: answerBot.request_id, ...answerBotModal })), answerBotGenerativeModalEnabled && (jsxRuntimeExports.jsx(GenerativeAnswerBotModal, { requestId: Number(answerBotGenerativeExperience.request_id), ...answerBotModal }))] }));
}

function __variableDynamicImportRuntime2__(path) {
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
    case './translations/locales/af.json': return import('new-request-form-translations').then(function (n) { return n.a; });
    case './translations/locales/ar-x-pseudo.json': return import('new-request-form-translations').then(function (n) { return n.b; });
    case './translations/locales/ar.json': return import('new-request-form-translations').then(function (n) { return n.c; });
    case './translations/locales/az.json': return import('new-request-form-translations').then(function (n) { return n.d; });
    case './translations/locales/be.json': return import('new-request-form-translations').then(function (n) { return n.e; });
    case './translations/locales/bg.json': return import('new-request-form-translations').then(function (n) { return n.f; });
    case './translations/locales/bn.json': return import('new-request-form-translations').then(function (n) { return n.g; });
    case './translations/locales/bs.json': return import('new-request-form-translations').then(function (n) { return n.h; });
    case './translations/locales/ca.json': return import('new-request-form-translations').then(function (n) { return n.i; });
    case './translations/locales/cs.json': return import('new-request-form-translations').then(function (n) { return n.j; });
    case './translations/locales/cy.json': return import('new-request-form-translations').then(function (n) { return n.k; });
    case './translations/locales/da.json': return import('new-request-form-translations').then(function (n) { return n.l; });
    case './translations/locales/de-de.json': return import('new-request-form-translations').then(function (n) { return n.m; });
    case './translations/locales/de-x-informal.json': return import('new-request-form-translations').then(function (n) { return n.n; });
    case './translations/locales/de.json': return import('new-request-form-translations').then(function (n) { return n.o; });
    case './translations/locales/el.json': return import('new-request-form-translations').then(function (n) { return n.p; });
    case './translations/locales/en-001.json': return import('new-request-form-translations').then(function (n) { return n.q; });
    case './translations/locales/en-150.json': return import('new-request-form-translations').then(function (n) { return n.r; });
    case './translations/locales/en-au.json': return import('new-request-form-translations').then(function (n) { return n.s; });
    case './translations/locales/en-ca.json': return import('new-request-form-translations').then(function (n) { return n.t; });
    case './translations/locales/en-gb.json': return import('new-request-form-translations').then(function (n) { return n.u; });
    case './translations/locales/en-my.json': return import('new-request-form-translations').then(function (n) { return n.v; });
    case './translations/locales/en-ph.json': return import('new-request-form-translations').then(function (n) { return n.w; });
    case './translations/locales/en-se.json': return import('new-request-form-translations').then(function (n) { return n.x; });
    case './translations/locales/en-us.json': return import('new-request-form-translations').then(function (n) { return n.y; });
    case './translations/locales/en-x-dev.json': return import('new-request-form-translations').then(function (n) { return n.z; });
    case './translations/locales/en-x-keys.json': return import('new-request-form-translations').then(function (n) { return n.A; });
    case './translations/locales/en-x-obsolete.json': return import('new-request-form-translations').then(function (n) { return n.B; });
    case './translations/locales/en-x-pseudo.json': return import('new-request-form-translations').then(function (n) { return n.C; });
    case './translations/locales/en-x-test.json': return import('new-request-form-translations').then(function (n) { return n.D; });
    case './translations/locales/es-419.json': return import('new-request-form-translations').then(function (n) { return n.E; });
    case './translations/locales/es-ar.json': return import('new-request-form-translations').then(function (n) { return n.F; });
    case './translations/locales/es-cl.json': return import('new-request-form-translations').then(function (n) { return n.G; });
    case './translations/locales/es-es.json': return import('new-request-form-translations').then(function (n) { return n.H; });
    case './translations/locales/es-mx.json': return import('new-request-form-translations').then(function (n) { return n.I; });
    case './translations/locales/es-pe.json': return import('new-request-form-translations').then(function (n) { return n.J; });
    case './translations/locales/es.json': return import('new-request-form-translations').then(function (n) { return n.K; });
    case './translations/locales/et.json': return import('new-request-form-translations').then(function (n) { return n.L; });
    case './translations/locales/eu.json': return import('new-request-form-translations').then(function (n) { return n.M; });
    case './translations/locales/fa-af.json': return import('new-request-form-translations').then(function (n) { return n.N; });
    case './translations/locales/fa.json': return import('new-request-form-translations').then(function (n) { return n.O; });
    case './translations/locales/fi.json': return import('new-request-form-translations').then(function (n) { return n.P; });
    case './translations/locales/fil.json': return import('new-request-form-translations').then(function (n) { return n.Q; });
    case './translations/locales/fo.json': return import('new-request-form-translations').then(function (n) { return n.R; });
    case './translations/locales/fr-ca.json': return import('new-request-form-translations').then(function (n) { return n.S; });
    case './translations/locales/fr-dz.json': return import('new-request-form-translations').then(function (n) { return n.T; });
    case './translations/locales/fr-mu.json': return import('new-request-form-translations').then(function (n) { return n.U; });
    case './translations/locales/fr.json': return import('new-request-form-translations').then(function (n) { return n.V; });
    case './translations/locales/ga.json': return import('new-request-form-translations').then(function (n) { return n.W; });
    case './translations/locales/he.json': return import('new-request-form-translations').then(function (n) { return n.X; });
    case './translations/locales/hi.json': return import('new-request-form-translations').then(function (n) { return n.Y; });
    case './translations/locales/hr.json': return import('new-request-form-translations').then(function (n) { return n.Z; });
    case './translations/locales/hu.json': return import('new-request-form-translations').then(function (n) { return n._; });
    case './translations/locales/hy.json': return import('new-request-form-translations').then(function (n) { return n.$; });
    case './translations/locales/id.json': return import('new-request-form-translations').then(function (n) { return n.a0; });
    case './translations/locales/is.json': return import('new-request-form-translations').then(function (n) { return n.a1; });
    case './translations/locales/it-ch.json': return import('new-request-form-translations').then(function (n) { return n.a2; });
    case './translations/locales/it.json': return import('new-request-form-translations').then(function (n) { return n.a3; });
    case './translations/locales/ja.json': return import('new-request-form-translations').then(function (n) { return n.a4; });
    case './translations/locales/ka.json': return import('new-request-form-translations').then(function (n) { return n.a5; });
    case './translations/locales/kk.json': return import('new-request-form-translations').then(function (n) { return n.a6; });
    case './translations/locales/kl-dk.json': return import('new-request-form-translations').then(function (n) { return n.a7; });
    case './translations/locales/km.json': return import('new-request-form-translations').then(function (n) { return n.a8; });
    case './translations/locales/ko.json': return import('new-request-form-translations').then(function (n) { return n.a9; });
    case './translations/locales/ku.json': return import('new-request-form-translations').then(function (n) { return n.aa; });
    case './translations/locales/ky.json': return import('new-request-form-translations').then(function (n) { return n.ab; });
    case './translations/locales/lt.json': return import('new-request-form-translations').then(function (n) { return n.ac; });
    case './translations/locales/lv.json': return import('new-request-form-translations').then(function (n) { return n.ad; });
    case './translations/locales/mk.json': return import('new-request-form-translations').then(function (n) { return n.ae; });
    case './translations/locales/mn.json': return import('new-request-form-translations').then(function (n) { return n.af; });
    case './translations/locales/ms.json': return import('new-request-form-translations').then(function (n) { return n.ag; });
    case './translations/locales/mt.json': return import('new-request-form-translations').then(function (n) { return n.ah; });
    case './translations/locales/my.json': return import('new-request-form-translations').then(function (n) { return n.ai; });
    case './translations/locales/ne.json': return import('new-request-form-translations').then(function (n) { return n.aj; });
    case './translations/locales/nl-be.json': return import('new-request-form-translations').then(function (n) { return n.ak; });
    case './translations/locales/nl.json': return import('new-request-form-translations').then(function (n) { return n.al; });
    case './translations/locales/no.json': return import('new-request-form-translations').then(function (n) { return n.am; });
    case './translations/locales/pl.json': return import('new-request-form-translations').then(function (n) { return n.an; });
    case './translations/locales/pt-br.json': return import('new-request-form-translations').then(function (n) { return n.ao; });
    case './translations/locales/pt.json': return import('new-request-form-translations').then(function (n) { return n.ap; });
    case './translations/locales/ro-md.json': return import('new-request-form-translations').then(function (n) { return n.aq; });
    case './translations/locales/ro.json': return import('new-request-form-translations').then(function (n) { return n.ar; });
    case './translations/locales/ru.json': return import('new-request-form-translations').then(function (n) { return n.as; });
    case './translations/locales/si.json': return import('new-request-form-translations').then(function (n) { return n.at; });
    case './translations/locales/sk.json': return import('new-request-form-translations').then(function (n) { return n.au; });
    case './translations/locales/sl.json': return import('new-request-form-translations').then(function (n) { return n.av; });
    case './translations/locales/sq.json': return import('new-request-form-translations').then(function (n) { return n.aw; });
    case './translations/locales/sr-me.json': return import('new-request-form-translations').then(function (n) { return n.ax; });
    case './translations/locales/sr.json': return import('new-request-form-translations').then(function (n) { return n.ay; });
    case './translations/locales/sv.json': return import('new-request-form-translations').then(function (n) { return n.az; });
    case './translations/locales/sw-ke.json': return import('new-request-form-translations').then(function (n) { return n.aA; });
    case './translations/locales/ta.json': return import('new-request-form-translations').then(function (n) { return n.aB; });
    case './translations/locales/th.json': return import('new-request-form-translations').then(function (n) { return n.aC; });
    case './translations/locales/tr.json': return import('new-request-form-translations').then(function (n) { return n.aD; });
    case './translations/locales/uk.json': return import('new-request-form-translations').then(function (n) { return n.aE; });
    case './translations/locales/ur-pk.json': return import('new-request-form-translations').then(function (n) { return n.aF; });
    case './translations/locales/ur.json': return import('new-request-form-translations').then(function (n) { return n.aG; });
    case './translations/locales/uz.json': return import('new-request-form-translations').then(function (n) { return n.aH; });
    case './translations/locales/vi.json': return import('new-request-form-translations').then(function (n) { return n.aI; });
    case './translations/locales/zh-cn.json': return import('new-request-form-translations').then(function (n) { return n.aJ; });
    case './translations/locales/zh-tw.json': return import('new-request-form-translations').then(function (n) { return n.aK; });
    default: return new Promise(function(resolve, reject) {
      (typeof queueMicrotask === 'function' ? queueMicrotask : setTimeout)(
        reject.bind(null, new Error("Unknown variable dynamic import: " + path))
      );
    })
   }
 }
async function renderNewRequestForm(settings, props, container) {
    const { baseLocale } = props;
    initI18next(baseLocale);
    await loadTranslations(baseLocale, [
        () => __variableDynamicImportRuntime0__(`./translations/locales/${baseLocale}.json`),
        () => __variableDynamicImportRuntime1__(`../ticket-fields/translations/locales/${baseLocale}.json`),
        () => __variableDynamicImportRuntime2__(`../shared/translations/locales/${baseLocale}.json`),
    ]);
    reactDomExports.render(jsxRuntimeExports.jsx(ThemeProviders, { theme: createTheme(settings), children: jsxRuntimeExports.jsx(NewRequestForm, { ...props }) }), container);
}

export { renderNewRequestForm };
