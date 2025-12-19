"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useShadowRoot = void 0;
const react_1 = require("react");
const ShadowRootContext_1 = require("./ShadowRootContext");
function useShadowRoot() {
    const shadowRoot = (0, react_1.useContext)(ShadowRootContext_1.ShadowRootContext);
    return shadowRoot;
}
exports.useShadowRoot = useShadowRoot;
