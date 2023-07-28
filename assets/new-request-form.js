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
    return (jsxRuntimeExports.jsxs(Field$1, { children: [jsxRuntimeExports.jsx(Label, { children: label }), description && jsxRuntimeExports.jsx(Hint$1, { children: description }), jsxRuntimeExports.jsx(Combobox, { inputProps: { name, required }, isEditable: false, children: options.map((option) => (jsxRuntimeExports.jsx(Option, { value: option.value, isSelected: option.value === value, children: option.name }, option.value))) }), error && jsxRuntimeExports.jsx(Message$1, { validation: "error", children: error })] }));
}

function TicketFormField({ ticketForms }) {
    const handleChange = ({ selectionValue }) => {
        if (selectionValue && typeof selectionValue === "string") {
            window.location.href = selectionValue;
        }
    };
    return (jsxRuntimeExports.jsxs(Field$1, { children: [jsxRuntimeExports.jsx(Label, { children: "Please choose your issue below" }), jsxRuntimeExports.jsx(Combobox, { isEditable: false, onChange: handleChange, children: ticketForms.map(({ id, url, name }) => (jsxRuntimeExports.jsx(Option, { value: url, label: name, children: name }, id))) })] }));
}

function NewRequestForm({ ticketForms, fields }) {
    return (jsxRuntimeExports.jsxs("form", { children: [jsxRuntimeExports.jsx(TicketFormField, { ticketForms: ticketForms }), fields.map((field) => {
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
