import { r as reactExports, j as jsxRuntimeExports, F as Field, L as Label$1, H as Hint, g as FauxInput, h as Tag, M as Message, s as styled, i as focusStyles, I as Input } from 'vendor';

function useTagsInputContainer({ initialValue, }) {
    const [tags, setTags] = reactExports.useState(initialValue);
    const [selectedIndex, setSelectedIndex] = reactExports.useState(null);
    const inputRef = reactExports.useRef(null);
    const listRef = reactExports.useRef(null);
    reactExports.useEffect(() => {
        const tagElements = listRef.current?.querySelectorAll("[role=option]");
        if (selectedIndex !== null && tagElements !== null) {
            tagElements.item(selectedIndex).focus();
        }
        else {
            inputRef.current?.focus();
        }
    }, [selectedIndex, inputRef, listRef]);
    const hasTag = (tag) => {
        return tags.includes(tag);
    };
    const addTag = (tag) => {
        setTags([...tags, tag]);
    };
    const removeTagAt = (at) => {
        setTags(tags.filter((_, index) => index !== at));
        setSelectedIndex(null);
    };
    const selectPrevious = () => {
        if (tags.length === 0) {
            return;
        }
        if (selectedIndex === null) {
            setSelectedIndex(tags.length - 1);
        }
        else {
            const newIndex = selectedIndex - 1;
            setSelectedIndex(newIndex >= 0 ? newIndex : 0);
        }
    };
    const selectNext = () => {
        if (tags.length === 0 || selectedIndex === null) {
            return;
        }
        const newIndex = selectedIndex + 1;
        setSelectedIndex(newIndex <= tags.length - 1 ? newIndex : null);
    };
    const getPrevNextCodes = () => {
        const isRTL = window.document.documentElement.dir.toLowerCase() === "rtl";
        return isRTL
            ? { prevCode: "ArrowRight", nextCode: "ArrowLeft" }
            : { prevCode: "ArrowLeft", nextCode: "ArrowRight" };
    };
    const handleContainerKeyDown = (e) => {
        const { prevCode, nextCode } = getPrevNextCodes();
        const inputHasValue = inputRef.current?.value !== "" && inputRef.current?.value !== undefined;
        if (tags.length === 0 || inputHasValue) {
            return;
        }
        switch (e.code) {
            case prevCode:
                selectPrevious();
                return;
            case nextCode:
                selectNext();
                return;
            case "Backspace": {
                if (selectedIndex) {
                    removeTagAt(selectedIndex);
                }
                return;
            }
        }
    };
    const handleContainerFocus = (e) => {
        if (e.target === e.currentTarget) {
            inputRef.current?.focus();
        }
    };
    const handleInputKeyDown = (e) => {
        const target = e.target;
        const tag = target.value;
        if (tag &&
            !hasTag(tag) &&
            (e.code === "Space" ||
                e.code === "Enter" ||
                e.code === "Comma" ||
                e.code === "Tab")) {
            e.preventDefault();
            addTag(tag);
            target.value = "";
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
        onKeyDown: handleContainerKeyDown,
        onFocus: handleContainerFocus,
        tabIndex: -1,
    });
    const getListProps = () => ({
        role: "listbox",
        "aria-orientation": "horizontal",
        ref: listRef,
    });
    const getTagProps = (index) => ({
        role: "option",
        onKeyDown: handleTagKeyDown(index),
        tabIndex: -1,
    });
    const getTagCloseProps = (index) => ({
        onClick: handleTagCloseClick(index),
    });
    const getInputProps = () => ({
        onKeyDown: handleInputKeyDown,
        ref: inputRef,
    });
    return {
        tags,
        getContainerProps,
        getListProps,
        getTagProps,
        getTagCloseProps,
        getInputProps,
    };
}

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
function CcField({ field }) {
    const { label, value, name, error, description } = field;
    const initialValue = value
        ? value.split(",").map((email) => email.trim())
        : [];
    const { tags, getContainerProps, getListProps, getTagProps, getTagCloseProps, getInputProps, } = useTagsInputContainer({ initialValue });
    return (jsxRuntimeExports.jsxs(Field, { children: [jsxRuntimeExports.jsx(Label$1, { children: label }), description && jsxRuntimeExports.jsx(Hint, { children: description }), jsxRuntimeExports.jsxs(FauxInput, { ...getContainerProps(), children: [jsxRuntimeExports.jsx("span", { "aria-label": "Selected e-mails", ...getListProps(), children: tags.map((email, index) => (jsxRuntimeExports.jsxs(reactExports.Fragment, { children: [jsxRuntimeExports.jsxs(StyledTag, { size: "large", "aria-invalid": !EMAIL_REGEX.test(email), "aria-label": `${email} - Press Backspace to remove`, ...getTagProps(index), children: [jsxRuntimeExports.jsx("span", { children: email }), jsxRuntimeExports.jsx(Tag.Close, { ...getTagCloseProps(index) })] }), jsxRuntimeExports.jsx("input", { type: "hidden", name: name, value: email })] }, email))) }), jsxRuntimeExports.jsx(StyledInput, { isBare: true, ...getInputProps() })] }), error && jsxRuntimeExports.jsx(Message, { validation: "error", children: error })] }));
}
const StyledInput = styled(Input) `
  width: revert;
`;
const StyledTag = styled(Tag) `
  margin-right: ${(props) => props.theme.space.sm};

  ${(props) => focusStyles({
    theme: props.theme,
    shadowWidth: "sm",
    selector: "&:focus",
})}
`;

export { CcField as default };
