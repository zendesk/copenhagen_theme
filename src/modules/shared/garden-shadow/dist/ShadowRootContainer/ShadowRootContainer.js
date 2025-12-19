"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShadowRootContainer = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_dom_1 = require("react-dom");
const styled_components_1 = require("styled-components");
const ShadowRootContext_1 = require("./ShadowRootContext");
function ShadowContent({ container, children, }) {
    return (0, react_dom_1.createPortal)(children, container);
}
function ShadowRootContainer({ mode, children, ...divProps }) {
    const [container, setContainer] = (0, react_1.useState)(null);
    const [shadowRoot, setShadowRoot] = (0, react_1.useState)(null);
    const innerContainer = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        if (container != null) {
            const shadowRoot = container.attachShadow({ mode });
            innerContainer.current = shadowRoot.ownerDocument.createElement("div");
            shadowRoot.appendChild(innerContainer.current);
            setShadowRoot(shadowRoot);
        }
    }, [container, mode]);
    return ((0, jsx_runtime_1.jsx)("div", { ref: setContainer, ...divProps, children: shadowRoot && innerContainer.current && ((0, jsx_runtime_1.jsx)(ShadowContent, { container: innerContainer.current, children: (0, jsx_runtime_1.jsx)(ShadowRootContext_1.ShadowRootContext.Provider, { value: shadowRoot, children: (0, jsx_runtime_1.jsx)(styled_components_1.StyleSheetManager, { target: innerContainer.current, children: children }) }) })) }));
}
exports.ShadowRootContainer = ShadowRootContainer;
