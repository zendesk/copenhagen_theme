import { r as reactExports, j as jsxRuntimeExports, F as Field, L as Label$1, H as Hint, g as Tag, M as Message, s as styled, h as focusStyles, i as FauxInput, I as Input } from 'vendor';

function useTagsInputContainer({ initialValue, }) {
    const [tags, setTags] = reactExports.useState(initialValue);
    const [selectedIndex, setSelectedIndex] = reactExports.useState(null);
    const inputRef = reactExports.useRef(null);
    const listRef = reactExports.useRef(null);
    const setSelectedIndexAndFocus = (index) => {
        setSelectedIndex(index);
        const tagElements = listRef.current?.querySelectorAll("[data-tag]");
        if (index !== null && tagElements !== null) {
            tagElements.item(index).focus();
        }
        else {
            inputRef.current?.focus();
        }
    };
    const hasTag = (tag) => {
        return tags.includes(tag);
    };
    const addTag = (tag) => {
        setTags([...tags, tag]);
    };
    const removeTagAt = (at) => {
        setTags(tags.filter((_, index) => index !== at));
        setSelectedIndexAndFocus(null);
    };
    const selectPrevious = () => {
        if (tags.length === 0) {
            return;
        }
        if (selectedIndex === null) {
            setSelectedIndexAndFocus(tags.length - 1);
        }
        else {
            const newIndex = selectedIndex - 1;
            setSelectedIndexAndFocus(newIndex >= 0 ? newIndex : 0);
        }
    };
    const selectNext = () => {
        if (tags.length === 0 || selectedIndex === null) {
            return;
        }
        const newIndex = selectedIndex + 1;
        setSelectedIndexAndFocus(newIndex <= tags.length - 1 ? newIndex : null);
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
                e.preventDefault();
                return;
            case nextCode:
                selectNext();
                e.preventDefault();
                return;
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
            (e.code === "Space" ||
                e.code === "Enter" ||
                e.code === "Comma" ||
                e.code === "Tab")) {
            e.preventDefault();
            if (!hasTag(tag)) {
                addTag(tag);
            }
            target.value = "";
        }
    };
    const handleInputPaste = (e) => {
        e.preventDefault();
        const data = e.clipboardData.getData("text");
        const values = new Set(data.split(/[\s,;]+/).filter((value) => !tags.includes(value)));
        setTags([...tags, ...values]);
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
        ref: listRef,
    });
    const getTagProps = (index) => ({
        onKeyDown: handleTagKeyDown(index),
        tabIndex: -1,
        "data-tag": "",
    });
    const getTagCloseProps = (index) => ({
        onClick: handleTagCloseClick(index),
    });
    const getInputProps = () => ({
        onKeyDown: handleInputKeyDown,
        onPaste: handleInputPaste,
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
    return (jsxRuntimeExports.jsxs(Field, { children: [jsxRuntimeExports.jsx(Label$1, { children: label }), description && jsxRuntimeExports.jsx(Hint, { children: description }), jsxRuntimeExports.jsxs(Container, { ...getContainerProps(), children: [jsxRuntimeExports.jsx(List, { "aria-label": "Selected e-mails", ...getListProps(), children: tags.map((email, index) => {
                            const isValid = EMAIL_REGEX.test(email);
                            return (jsxRuntimeExports.jsx(ListItem, { children: jsxRuntimeExports.jsxs(StyledTag, { size: "large", "aria-invalid": !isValid, "aria-label": `${email} - Press Backspace to remove`, hue: isValid ? undefined : "red", ...getTagProps(index), children: [jsxRuntimeExports.jsx("span", { children: email }), jsxRuntimeExports.jsx(Tag.Close, { ...getTagCloseProps(index) })] }) }, index));
                        }) }), jsxRuntimeExports.jsx(StyledInput, { isBare: true, ...getInputProps() })] }), error && jsxRuntimeExports.jsx(Message, { validation: "error", children: error }), tags.map((email) => (jsxRuntimeExports.jsx("input", { type: "hidden", name: name, value: email }, email)))] }));
}
const Container = styled(FauxInput) `
  padding: ${(props) => `${props.theme.space.xxs} ${props.theme.space.sm}`};
`;
const List = styled.ul `
  display: inline;
  list-style-type: none;
  margin: 0;
`;
const ListItem = styled.li `
  display: inline;
  margin: 0;
  margin-right: ${(props) => props.theme.space.sm};
`;
const StyledTag = styled(Tag) `
  ${(props) => focusStyles({
    theme: props.theme,
    shadowWidth: "sm",
    selector: "&:focus",
})}
`;
const StyledInput = styled(Input) `
  width: revert;
  margin-top: ${(props) => props.theme.space.xs};
  margin-bottom: ${(props) => props.theme.space.xs};

  // override CPH default style. Can be removed once global styles are removed
  &:focus {
    border: none !important;
  }
`;

export { CcField as default };
