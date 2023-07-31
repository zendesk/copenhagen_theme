import { j as jsxRuntimeExports, F as Field, L as Label$1, H as Hint, I as Input, M as Message, T as Textarea, a as Field$1, b as Label, c as Hint$1, C as Combobox, O as Option, d as Message$1, r as reactDomExports } from 'vendor';
import { ComponentProviders } from 'shared';

function TextInput({ field }) {
    const { label, error, value, name, required, description } = field;
    return (jsxRuntimeExports.jsxs(Field, { children: [jsxRuntimeExports.jsx(Label$1, { children: label }), description && jsxRuntimeExports.jsx(Hint, { children: description }), jsxRuntimeExports.jsx(Input, { name: name, value: value, validation: error ? "error" : undefined, required: required }), error && jsxRuntimeExports.jsx(Message, { validation: "error", children: error })] }));
}

function TextArea({ field }) {
    const { label, error, value, name, required, description } = field;
    return (jsxRuntimeExports.jsxs(Field, { children: [jsxRuntimeExports.jsx(Label$1, { children: label }), description && jsxRuntimeExports.jsx(Hint, { children: description }), jsxRuntimeExports.jsx(Textarea, { name: name, value: value, validation: error ? "error" : undefined, required: required }), error && jsxRuntimeExports.jsx(Message, { validation: "error", children: error })] }));
}

function DropDown({ field }) {
    const { label, options, error, value, name, required, description } = field;
    return (jsxRuntimeExports.jsxs(Field$1, { children: [jsxRuntimeExports.jsx(Label, { children: label }), description && jsxRuntimeExports.jsx(Hint$1, { children: description }), jsxRuntimeExports.jsx(Combobox, { inputProps: { name, required }, isEditable: false, validation: error ? "error" : undefined, children: options.map((option) => (jsxRuntimeExports.jsx(Option, { value: option.value, isSelected: option.value === value, children: option.name }, option.value))) }), error && jsxRuntimeExports.jsx(Message$1, { validation: "error", children: error })] }));
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

function NewRequestForm({ ticketForms, requestForm, }) {
    const { fields, action, http_method, accept_charset, ticket_form_field, ticket_forms_instructions, } = requestForm;
    return (jsxRuntimeExports.jsxs("form", { action: action, method: http_method, acceptCharset: accept_charset, children: [jsxRuntimeExports.jsx(TicketFormField, { label: ticket_forms_instructions, ticketFormField: ticket_form_field, ticketForms: ticketForms }), fields.map((field) => {
                switch (field.type) {
                    case "anonymous_requester_email":
                    case "subject":
                        return jsxRuntimeExports.jsx(TextInput, { field: field });
                    case "description":
                    case "textarea":
                        return jsxRuntimeExports.jsx(TextArea, { field: field });
                    case "priority":
                        return jsxRuntimeExports.jsx(DropDown, { field: field });
                    default:
                        return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {});
                }
            })] }));
}

function renderNewRequestForm(props, container) {
    reactDomExports.render(jsxRuntimeExports.jsx(ComponentProviders, { children: jsxRuntimeExports.jsx(NewRequestForm, { ...props }) }), container);
}

export { renderNewRequestForm };
