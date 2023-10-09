import { r as reactExports, U as useGrid, j as jsxRuntimeExports, F as Field, L as Label$1, H as Hint, k as Tooltip, M as Message, s as styled, V as focusStyles, h as hideVisually, W as Tag, X as SvgAlertWarningStroke, Y as FauxInput, I as Input } from 'vendor';

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
            (e.code === "Space" ||
                e.code === "Enter" ||
                e.code === "Comma" ||
                e.code === "Tab")) {
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
const Container = styled(FauxInput) `
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

  // override CPH default style. Can be removed once global styles are removed
  &:focus {
    border: none !important;
  }
`;
const AnnouncementMessage = styled.span `
  ${hideVisually()}
`;
function CcField({ field }) {
    const { label, value, name, error, description } = field;
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
            addedTag: (value) => `${value} has been added`,
            removedTag: (value) => `${value} has been removed`,
            addedTags: (values) => `${values.join(", ")} have been added`,
        },
    });
    const renderTag = (index, isValid, email) => (jsxRuntimeExports.jsxs(StyledTag, { size: "large", "aria-label": `${email} - Press Backspace to remove`, hue: isValid ? undefined : "red", children: [!isValid && (jsxRuntimeExports.jsx(Tag.Avatar, { children: jsxRuntimeExports.jsx(SvgAlertWarningStroke, {}) })), jsxRuntimeExports.jsx("span", { children: email }), jsxRuntimeExports.jsx(Tag.Close, { ...getTagCloseProps(index) })] }));
    return (jsxRuntimeExports.jsxs(Field, { children: [jsxRuntimeExports.jsx(Label$1, { children: label }), description && jsxRuntimeExports.jsx(Hint, { children: description }), jsxRuntimeExports.jsxs(Container, { ...getContainerProps(), children: [tags.length > 0 && (jsxRuntimeExports.jsx("span", { ...getGridProps({ "aria-label": "Selected CC e-mails" }), children: jsxRuntimeExports.jsx("span", { ref: gridRowRef, ...getGridRowProps(), children: tags.map((email, index) => {
                                const isValid = EMAIL_REGEX.test(email);
                                return isValid ? (jsxRuntimeExports.jsx(GridCell, { ...getGridCellProps(index), children: renderTag(index, isValid, email) }, index)) : (jsxRuntimeExports.jsx(Tooltip, { content: "Invalid e-mail address", children: jsxRuntimeExports.jsx(GridCell, { ...getGridCellProps(index), children: renderTag(index, isValid, email) }) }, index));
                            }) }) })), jsxRuntimeExports.jsxs(InputWrapper, { children: [jsxRuntimeExports.jsx(InputMirror, { isBare: true, "aria-hidden": "true", tabIndex: -1, children: inputValue }), jsxRuntimeExports.jsx(StyledInput, { ref: inputRef, isBare: true, ...getInputProps() })] })] }), error && jsxRuntimeExports.jsx(Message, { validation: "error", children: error }), tags.map((email) => (jsxRuntimeExports.jsx("input", { type: "hidden", name: name, value: email }, email))), jsxRuntimeExports.jsx(AnnouncementMessage, { ...getAnnouncementProps(), children: announcement })] }));
}

export { CcField as default };
