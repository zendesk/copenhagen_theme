"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDownshiftEnvironment = void 0;
const ShadowRootContainer_1 = require("./ShadowRootContainer");
function useDownshiftEnvironment() {
    const shadowRoot = (0, ShadowRootContainer_1.useShadowRoot)();
    if (shadowRoot === null) {
        return undefined;
    }
    /* This environment makes downshift work in a Shadow DOM context,
       proxying the window document and forwarding the `activeElement`
       prop to the shadow root. It also binds the events to the shadow root
       instead of using the window document. */
    const downshiftEnvironment = {
        document: new Proxy(document, {
            get: (target, prop, receiver) => {
                if (prop === "activeElement") {
                    return shadowRoot.activeElement;
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const value = target[prop];
                if (value instanceof Function) {
                    return function (...args) {
                        return value.apply(this === receiver ? target : this, args);
                    };
                }
                return value;
            },
        }),
        addEventListener: shadowRoot.addEventListener.bind(shadowRoot),
        removeEventListener: shadowRoot.removeEventListener.bind(shadowRoot),
        Node,
    };
    return downshiftEnvironment;
}
exports.useDownshiftEnvironment = useDownshiftEnvironment;
