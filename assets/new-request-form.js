import { j as jsxRuntimeExports, F as Field, L as Label$1, H as Hint, I as Input, M as Message, T as Textarea, a as Field$1, b as Label, c as Hint$1, C as Combobox, O as Option, d as Message$1, r as reactExports, s as styled, A as Alert, B as Button, e as reactDomExports } from 'vendor';
import { ComponentProviders } from 'shared';

function TextInput({ field }) {
    const { label, error, value, name, required, description } = field;
    return (jsxRuntimeExports.jsxs(Field, { children: [jsxRuntimeExports.jsx(Label$1, { children: label }), description && jsxRuntimeExports.jsx(Hint, { children: description }), jsxRuntimeExports.jsx(Input, { name: name, defaultValue: value, validation: error ? "error" : undefined, required: required }), error && jsxRuntimeExports.jsx(Message, { validation: "error", children: error })] }));
}

function TextArea({ field }) {
    const { label, error, value, name, required, description } = field;
    return (jsxRuntimeExports.jsxs(Field, { children: [jsxRuntimeExports.jsx(Label$1, { children: label }), description && jsxRuntimeExports.jsx(Hint, { children: description }), jsxRuntimeExports.jsx(Textarea, { name: name, defaultValue: value, validation: error ? "error" : undefined, required: required }), error && jsxRuntimeExports.jsx(Message, { validation: "error", children: error })] }));
}

function DropDown({ field }) {
    const { label, options, error, value, name, required, description } = field;
    return (jsxRuntimeExports.jsxs(Field$1, { children: [jsxRuntimeExports.jsx(Label, { children: label }), description && jsxRuntimeExports.jsx(Hint$1, { children: description }), jsxRuntimeExports.jsx(Combobox, { inputProps: { name, required }, isEditable: false, validation: error ? "error" : undefined, renderValue: ({ selection }) => selection && "value" in selection
                    ? options.find((option) => option.value === selection.value)?.name
                    : "-", children: options.map((option) => (jsxRuntimeExports.jsx(Option, { value: option.value, isSelected: option.value?.toString() === value?.toString(), children: option.name }, option.value))) }), error && jsxRuntimeExports.jsx(Message$1, { validation: "error", children: error })] }));
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

function ParentTicketField({ field }) {
    const { value, name } = field;
    return (jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: jsxRuntimeExports.jsx("input", { type: "hidden", name: name, value: value }) }));
}

// NOTE: This is a temporary handling of the CSRF token
const fetchCsrfToken = async () => {
    const response = await fetch("/hc/api/internal/csrf_token.json");
    const { current_session } = await response.json();
    return current_session.csrf_token;
};
/**
 * This hook creates an event handler for form submits, fetching the CSRF token
 * from the backend and appending it to the form
 * @returns a Submit Event Handler function
 */
function useSubmitHandler() {
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
            const token = await fetchCsrfToken();
            const hiddenInput = document.createElement("input");
            hiddenInput.type = "hidden";
            hiddenInput.name = "authenticity_token";
            hiddenInput.value = token;
            form.appendChild(hiddenInput);
            form.submit();
        }
    };
}

const Form = styled.form `
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space.md};
`;
const Footer = styled.div `
  margin-top: ${(props) => props.theme.space.md};
`;
function NewRequestForm({ ticketForms, requestForm, parentId }) {
    const { fields, action, http_method, accept_charset, errors, ticket_form_field, ticket_forms_instructions, parent_id_field, } = requestForm;
    const handleSubmit = useSubmitHandler();
    return (jsxRuntimeExports.jsxs(Form, { action: action, method: http_method, acceptCharset: accept_charset, noValidate: true, onSubmit: handleSubmit, children: [errors && jsxRuntimeExports.jsx(Alert, { type: "error", children: errors }), parentId && (jsxRuntimeExports.jsx(ParentTicketField, { field: parent_id_field })), ticketForms.length > 0 && (jsxRuntimeExports.jsx(TicketFormField, { label: ticket_forms_instructions, ticketFormField: ticket_form_field, ticketForms: ticketForms })), fields.map((field) => {
                switch (field.type) {
                    case "anonymous_requester_email":
                    case "subject":
                    case "regexp":
                        return jsxRuntimeExports.jsx(TextInput, { field: field });
                    case "description":
                    case "textarea":
                        return jsxRuntimeExports.jsx(TextArea, { field: field });
                    case "priority":
                    case "organization_id":
                    case "tickettype":
                        return jsxRuntimeExports.jsx(DropDown, { field: field });
                    default:
                        return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {});
                }
            }), jsxRuntimeExports.jsx(Footer, { children: (ticketForms.length === 0 || ticket_form_field.value) && (jsxRuntimeExports.jsx(Button, { isPrimary: true, type: "submit", children: "Submit" })) })] }));
}

function renderNewRequestForm(props, container) {
    reactDomExports.render(jsxRuntimeExports.jsx(ComponentProviders, { children: jsxRuntimeExports.jsx(NewRequestForm, { ...props }) }), container);
}

export { renderNewRequestForm };
