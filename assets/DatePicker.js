import { r as reactExports, j as jsxRuntimeExports, F as Field, L as Label$1, H as Hint, h as Datepicker, I as Input, M as Message } from 'vendor';

function DatePicker({ field, locale, }) {
    const { label, error, value, name, required, description } = field;
    const [date, setDate] = reactExports.useState(value ? new Date(value) : undefined);
    const handleChange = (date) => {
        // Set the time to 12:00:00 as this is also the expected behavior behavior across Support and the API
        setDate(new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0)));
    };
    return (jsxRuntimeExports.jsxs(Field, { children: [jsxRuntimeExports.jsx(Label$1, { children: label }), description && jsxRuntimeExports.jsx(Hint, { children: description }), jsxRuntimeExports.jsx(Datepicker, { value: date, onChange: handleChange, locale: locale, children: jsxRuntimeExports.jsx(Input, { required: required, lang: locale }) }), error && jsxRuntimeExports.jsx(Message, { validation: "error", children: error }), jsxRuntimeExports.jsx("input", { type: "hidden", name: name, value: date ? date.toISOString() : "" })] }));
}

export { DatePicker as default };
