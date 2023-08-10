import { h, y, k as klona, r as reactExports, p, g as a, R as ReactExports, j as jsxRuntimeExports, F as Field, L as Label$1, H as Hint, i as Tag, M as Message, s as styled, l as focusStyles, m as FauxInput, I as Input } from 'vendor';

// src/create-anatomy.ts
var createAnatomy = (name, parts = []) => ({
  parts: (...values) => {
    if (isEmpty(parts)) {
      return createAnatomy(name, values);
    }
    throw new Error("createAnatomy().parts(...) should only be called once. Did you mean to use .extendWith(...) ?");
  },
  extendWith: (...values) => createAnatomy(name, [...parts, ...values]),
  rename: (newName) => createAnatomy(newName, parts),
  keys: () => parts,
  build: () => [...new Set(parts)].reduce(
    (prev, part) => Object.assign(prev, {
      [part]: {
        selector: [
          `&[data-scope="${toKebabCase(name)}"][data-part="${toKebabCase(part)}"]`,
          `& [data-scope="${toKebabCase(name)}"][data-part="${toKebabCase(part)}"]`
        ].join(", "),
        attrs: { "data-scope": toKebabCase(name), "data-part": toKebabCase(part) }
      }
    }),
    {}
  )
});
var toKebabCase = (value) => value.replace(/([A-Z])([A-Z])/g, "$1-$2").replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[\s_]+/g, "-").toLowerCase();
var isEmpty = (v) => v.length === 0;

// src/attrs.ts
var dataAttr = (guard) => {
  return guard ? "" : void 0;
};
var ariaAttr = (guard) => {
  return guard ? "true" : void 0;
};

// src/is-html-element.ts
function isHTMLElement$1(value) {
  return typeof value === "object" && value?.nodeType === Node.ELEMENT_NODE && typeof value?.nodeName === "string";
}

// src/contains.ts
function contains(parent, child) {
  if (!parent || !child)
    return false;
  if (!isHTMLElement$1(parent) || !isHTMLElement$1(child))
    return false;
  return parent === child || parent.contains(child);
}

// src/create-scope.ts
var getDocument = (node) => {
  if (node.nodeType === Node.DOCUMENT_NODE)
    return node;
  return node.ownerDocument ?? document;
};
function createScope(methods) {
  const screen = {
    getRootNode: (ctx) => ctx.getRootNode?.() ?? document,
    getDoc: (ctx) => getDocument(screen.getRootNode(ctx)),
    getWin: (ctx) => screen.getDoc(ctx).defaultView ?? window,
    getActiveElement: (ctx) => screen.getDoc(ctx).activeElement,
    getById: (ctx, id) => screen.getRootNode(ctx).getElementById(id)
  };
  return { ...screen, ...methods };
}

// src/env.ts
var isDocument = (el) => el.nodeType === Node.DOCUMENT_NODE;
function getDocument2(el) {
  if (isDocument(el))
    return el;
  return el?.ownerDocument ?? document;
}
function getWindow$1(el) {
  return el?.ownerDocument.defaultView ?? window;
}

// src/get-by-id.ts
function itemById(v, id) {
  return v.find((node) => node.id === id);
}
function indexOfId(v, id) {
  const item = itemById(v, id);
  return item ? v.indexOf(item) : -1;
}
function nextById(v, id, loop = true) {
  let idx = indexOfId(v, id);
  idx = loop ? (idx + 1) % v.length : Math.min(idx + 1, v.length - 1);
  return v[idx];
}
function prevById(v, id, loop = true) {
  let idx = indexOfId(v, id);
  if (idx === -1)
    return loop ? v[v.length - 1] : null;
  idx = loop ? (idx - 1 + v.length) % v.length : Math.max(0, idx - 1);
  return v[idx];
}

// src/get-event-target.ts
function getEventTarget(event) {
  return event.composedPath?.()[0] ?? event.target;
}

// src/query.ts
function queryAll(root, selector) {
  return Array.from(root?.querySelectorAll(selector) ?? []);
}
function raf(fn) {
  const id = globalThis.requestAnimationFrame(fn);
  return () => {
    globalThis.cancelAnimationFrame(id);
  };
}

// src/add-dom-event.ts
var addDomEvent = (target, eventName, handler, options) => {
  const node = typeof target === "function" ? target() : target;
  node?.addEventListener(eventName, handler, options);
  return () => {
    node?.removeEventListener(eventName, handler, options);
  };
};
var isContextMenuEvent = (e) => {
  return e.button === 2 || isCtrlKey(e) && e.button === 0;
};
var isMac = () => /Mac|iPod|iPhone|iPad/.test(window.navigator.platform);
var isCtrlKey = (e) => isMac() ? e.metaKey && !e.ctrlKey : e.ctrlKey && !e.metaKey;

// src/fire-event.ts
function fireCustomEvent(el, type, init) {
  if (!el)
    return;
  const win = el.ownerDocument.defaultView || window;
  const event = new win.CustomEvent(type, init);
  return el.dispatchEvent(event);
}

// src/get-event-key.ts
var keyMap = {
  Up: "ArrowUp",
  Down: "ArrowDown",
  Esc: "Escape",
  " ": "Space",
  ",": "Comma",
  Left: "ArrowLeft",
  Right: "ArrowRight"
};
var rtlKeyMap = {
  ArrowLeft: "ArrowRight",
  ArrowRight: "ArrowLeft"
};
function getEventKey(event, options = {}) {
  const { dir = "ltr", orientation = "horizontal" } = options;
  let { key } = event;
  key = keyMap[key] ?? key;
  const isRtl = dir === "rtl" && orientation === "horizontal";
  if (isRtl && key in rtlKeyMap) {
    key = rtlKeyMap[key];
  }
  return key;
}

// src/get-native-event.ts
function getNativeEvent(event) {
  return event.nativeEvent ?? event;
}

// src/observe-attributes.ts
function observeAttributes(node, attributes, fn) {
  if (!node)
    return;
  const win = node.ownerDocument.defaultView || window;
  const obs = new win.MutationObserver((changes) => {
    for (const change of changes) {
      if (change.type === "attributes" && change.attributeName && attributes.includes(change.attributeName)) {
        fn(change);
      }
    }
  });
  obs.observe(node, { attributes: true, attributeFilter: attributes });
  return () => obs.disconnect();
}

// src/input-event.ts
var getWindow = (el) => el.ownerDocument.defaultView || window;
function getDescriptor(el, options) {
  const { type, property = "value" } = options;
  const proto = getWindow(el)[type].prototype;
  return Object.getOwnPropertyDescriptor(proto, property) ?? {};
}
function dispatchInputValueEvent(el, options) {
  if (!el)
    return;
  const win = getWindow(el);
  if (!(el instanceof win.HTMLInputElement))
    return;
  const { value, bubbles = true } = options;
  const descriptor = getDescriptor(el, {
    type: "HTMLInputElement",
    property: "value"
  });
  descriptor.set?.call(el, value);
  const event = new win.Event("input", { bubbles });
  el.dispatchEvent(event);
}
function getClosestForm(el) {
  if (isFormElement(el))
    return el.form;
  else
    return el.closest("form");
}
function isFormElement(el) {
  return el.matches("textarea, input, select, button");
}
function trackFormReset(el, callback) {
  if (!el)
    return;
  const form = getClosestForm(el);
  form?.addEventListener("reset", callback, { passive: true });
  return () => {
    form?.removeEventListener("reset", callback);
  };
}
function trackFieldsetDisabled(el, callback) {
  const fieldset = el?.closest("fieldset");
  if (!fieldset)
    return;
  callback(fieldset.disabled);
  return observeAttributes(fieldset, ["disabled"], () => callback(fieldset.disabled));
}
function trackFormControl(el, options) {
  if (!el)
    return;
  const { onFieldsetDisabled, onFormReset } = options;
  const cleanups = [
    trackFormReset(el, onFormReset),
    trackFieldsetDisabled(el, (disabled) => {
      if (disabled)
        onFieldsetDisabled();
    })
  ];
  return () => {
    cleanups.forEach((cleanup) => cleanup?.());
  };
}

// src/index.ts
function copyVisualStyles(fromEl, toEl) {
  if (!fromEl)
    return;
  const win = getWindow$1(fromEl);
  const el = win.getComputedStyle(fromEl);
  const cssText = "box-sizing:" + el.boxSizing + ";border-left:" + el.borderLeftWidth + " solid red;border-right:" + el.borderRightWidth + " solid red;font-family:" + el.fontFamily + ";font-feature-settings:" + el.fontFeatureSettings + ";font-kerning:" + el.fontKerning + ";font-size:" + el.fontSize + ";font-stretch:" + el.fontStretch + ";font-style:" + el.fontStyle + ";font-variant:" + el.fontVariant + ";font-variant-caps:" + el.fontVariantCaps + ";font-variant-ligatures:" + el.fontVariantLigatures + ";font-variant-numeric:" + el.fontVariantNumeric + ";font-weight:" + el.fontWeight + ";letter-spacing:" + el.letterSpacing + ";margin-left:" + el.marginLeft + ";margin-right:" + el.marginRight + ";padding-left:" + el.paddingLeft + ";padding-right:" + el.paddingRight + ";text-indent:" + el.textIndent + ";text-transform:" + el.textTransform;
  toEl.style.cssText += cssText;
}
function createGhostElement(doc) {
  var el = doc.createElement("div");
  el.id = "ghost";
  el.style.cssText = "display:inline-block;height:0;overflow:hidden;position:absolute;top:0;visibility:hidden;white-space:nowrap;";
  doc.body.appendChild(el);
  return el;
}
function autoResizeInput(input) {
  if (!input)
    return;
  const doc = getDocument2(input);
  const win = getWindow$1(input);
  const ghost = createGhostElement(doc);
  copyVisualStyles(input, ghost);
  function resize() {
    win.requestAnimationFrame(() => {
      ghost.innerHTML = input.value;
      const rect = win.getComputedStyle(ghost);
      input?.style.setProperty("width", rect.width);
    });
  }
  resize();
  input?.addEventListener("input", resize);
  input?.addEventListener("change", resize);
  return () => {
    doc.body.removeChild(ghost);
    input?.removeEventListener("input", resize);
    input?.removeEventListener("change", resize);
  };
}

// src/proxy.ts
var isObject$1 = (x) => typeof x === "object" && x !== null;
var proxyStateMap = /* @__PURE__ */ new WeakMap();
var refSet = /* @__PURE__ */ new WeakSet();
var buildProxyFunction = (objectIs = Object.is, newProxy = (target, handler) => new Proxy(target, handler), canProxy = (x) => isObject$1(x) && !refSet.has(x) && (Array.isArray(x) || !(Symbol.iterator in x)) && !(x instanceof WeakMap) && !(x instanceof WeakSet) && !(x instanceof Error) && !(x instanceof Number) && !(x instanceof Date) && !(x instanceof String) && !(x instanceof RegExp) && !(x instanceof ArrayBuffer), defaultHandlePromise = (promise) => {
  switch (promise.status) {
    case "fulfilled":
      return promise.value;
    case "rejected":
      throw promise.reason;
    default:
      throw promise;
  }
}, snapCache = /* @__PURE__ */ new WeakMap(), createSnapshot = (target, version, handlePromise = defaultHandlePromise) => {
  const cache = snapCache.get(target);
  if (cache?.[0] === version) {
    return cache[1];
  }
  const snap = Array.isArray(target) ? [] : Object.create(Object.getPrototypeOf(target));
  h(snap, true);
  snapCache.set(target, [version, snap]);
  Reflect.ownKeys(target).forEach((key) => {
    const value = Reflect.get(target, key);
    if (refSet.has(value)) {
      h(value, false);
      snap[key] = value;
    } else if (value instanceof Promise) {
      Object.defineProperty(snap, key, {
        get() {
          return handlePromise(value);
        }
      });
    } else if (proxyStateMap.has(value)) {
      snap[key] = snapshot(value, handlePromise);
    } else {
      snap[key] = value;
    }
  });
  return Object.freeze(snap);
}, proxyCache = /* @__PURE__ */ new WeakMap(), versionHolder = [1, 1], proxyFunction2 = (initialObject) => {
  if (!isObject$1(initialObject)) {
    throw new Error("object required");
  }
  const found = proxyCache.get(initialObject);
  if (found) {
    return found;
  }
  let version = versionHolder[0];
  const listeners = /* @__PURE__ */ new Set();
  const notifyUpdate = (op, nextVersion = ++versionHolder[0]) => {
    if (version !== nextVersion) {
      version = nextVersion;
      listeners.forEach((listener) => listener(op, nextVersion));
    }
  };
  let checkVersion = versionHolder[1];
  const ensureVersion = (nextCheckVersion = ++versionHolder[1]) => {
    if (checkVersion !== nextCheckVersion && !listeners.size) {
      checkVersion = nextCheckVersion;
      propProxyStates.forEach(([propProxyState]) => {
        const propVersion = propProxyState[1](nextCheckVersion);
        if (propVersion > version) {
          version = propVersion;
        }
      });
    }
    return version;
  };
  const createPropListener = (prop) => (op, nextVersion) => {
    const newOp = [...op];
    newOp[1] = [prop, ...newOp[1]];
    notifyUpdate(newOp, nextVersion);
  };
  const propProxyStates = /* @__PURE__ */ new Map();
  const addPropListener = (prop, propProxyState) => {
    if (listeners.size) {
      const remove = propProxyState[3](createPropListener(prop));
      propProxyStates.set(prop, [propProxyState, remove]);
    } else {
      propProxyStates.set(prop, [propProxyState]);
    }
  };
  const removePropListener = (prop) => {
    const entry = propProxyStates.get(prop);
    if (entry) {
      propProxyStates.delete(prop);
      entry[1]?.();
    }
  };
  const addListener = (listener) => {
    listeners.add(listener);
    if (listeners.size === 1) {
      propProxyStates.forEach(([propProxyState, prevRemove], prop) => {
        const remove = propProxyState[3](createPropListener(prop));
        propProxyStates.set(prop, [propProxyState, remove]);
      });
    }
    const removeListener = () => {
      listeners.delete(listener);
      if (listeners.size === 0) {
        propProxyStates.forEach(([propProxyState, remove], prop) => {
          if (remove) {
            remove();
            propProxyStates.set(prop, [propProxyState]);
          }
        });
      }
    };
    return removeListener;
  };
  const baseObject = Array.isArray(initialObject) ? [] : Object.create(Object.getPrototypeOf(initialObject));
  const handler = {
    deleteProperty(target, prop) {
      const prevValue = Reflect.get(target, prop);
      removePropListener(prop);
      const deleted = Reflect.deleteProperty(target, prop);
      if (deleted) {
        notifyUpdate(["delete", [prop], prevValue]);
      }
      return deleted;
    },
    set(target, prop, value, receiver) {
      const hasPrevValue = Reflect.has(target, prop);
      const prevValue = Reflect.get(target, prop, receiver);
      if (hasPrevValue && (objectIs(prevValue, value) || proxyCache.has(value) && objectIs(prevValue, proxyCache.get(value)))) {
        return true;
      }
      removePropListener(prop);
      if (isObject$1(value)) {
        value = y(value) || value;
      }
      let nextValue = value;
      if (Object.getOwnPropertyDescriptor(target, prop)?.set) ; else if (value instanceof Promise) {
        value.then((v) => {
          value.status = "fulfilled";
          value.value = v;
          notifyUpdate(["resolve", [prop], v]);
        }).catch((e) => {
          value.status = "rejected";
          value.reason = e;
          notifyUpdate(["reject", [prop], e]);
        });
      } else {
        if (!proxyStateMap.has(value) && canProxy(value)) {
          nextValue = proxy(value);
        }
        const childProxyState = !refSet.has(nextValue) && proxyStateMap.get(nextValue);
        if (childProxyState) {
          addPropListener(prop, childProxyState);
        }
      }
      Reflect.set(target, prop, nextValue, receiver);
      notifyUpdate(["set", [prop], value, prevValue]);
      return true;
    }
  };
  const proxyObject = newProxy(baseObject, handler);
  proxyCache.set(initialObject, proxyObject);
  const proxyState = [baseObject, ensureVersion, createSnapshot, addListener];
  proxyStateMap.set(proxyObject, proxyState);
  Reflect.ownKeys(initialObject).forEach((key) => {
    const desc = Object.getOwnPropertyDescriptor(initialObject, key);
    if (desc.get || desc.set) {
      Object.defineProperty(baseObject, key, desc);
    } else {
      proxyObject[key] = initialObject[key];
    }
  });
  return proxyObject;
}) => [
  // public functions
  proxyFunction2,
  // shared state
  proxyStateMap,
  refSet,
  // internal things
  objectIs,
  newProxy,
  canProxy,
  defaultHandlePromise,
  snapCache,
  createSnapshot,
  proxyCache,
  versionHolder
];
var [proxyFunction] = buildProxyFunction();
function proxy(initialObject = {}) {
  return proxyFunction(initialObject);
}
function subscribe(proxyObject, callback, notifyInSync) {
  const proxyState = proxyStateMap.get(proxyObject);
  let promise;
  const ops = [];
  const addListener = proxyState[3];
  let isListenerActive = false;
  const listener = (op) => {
    ops.push(op);
    if (notifyInSync) {
      callback(ops.splice(0));
      return;
    }
    if (!promise) {
      promise = Promise.resolve().then(() => {
        promise = void 0;
        if (isListenerActive) {
          callback(ops.splice(0));
        }
      });
    }
  };
  const removeListener = addListener(listener);
  isListenerActive = true;
  return () => {
    isListenerActive = false;
    removeListener();
  };
}
function snapshot(proxyObject, handlePromise) {
  const proxyState = proxyStateMap.get(proxyObject);
  const [target, ensureVersion, createSnapshot] = proxyState;
  return createSnapshot(target, ensureVersion(), handlePromise);
}
function ref(obj) {
  refSet.add(obj);
  return obj;
}

// src/proxy-computed.ts
function proxyWithComputed(initialObject, computedFns) {
  const keys = Object.keys(computedFns);
  keys.forEach((key) => {
    if (Object.getOwnPropertyDescriptor(initialObject, key)) {
      throw new Error("object property already defined");
    }
    const computedFn = computedFns[key];
    const { get, set } = typeof computedFn === "function" ? { get: computedFn } : computedFn;
    const desc = {};
    desc.get = () => get(snapshot(proxyObject));
    if (set) {
      desc.set = (newValue) => set(proxyObject, newValue);
    }
    Object.defineProperty(initialObject, key, desc);
  });
  const proxyObject = proxy(initialObject);
  return proxyObject;
}

// src/subscribe-key.ts
var defaultCompareFn = (prev, next) => Object.is(prev, next);
function subscribeKey(obj, key, fn, sync, compareFn) {
  let prev = Reflect.get(snapshot(obj), key);
  const isEqual = compareFn || defaultCompareFn;
  function onSnapshotChange() {
    const snap = snapshot(obj);
    if (isEqual(prev, snap[key]))
      return;
    fn(snap[key]);
    prev = Reflect.get(snap, key);
  }
  return subscribe(obj, onSnapshotChange, sync);
}

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// ../utilities/core/src/array.ts
function clear(v) {
  while (v.length > 0)
    v.pop();
  return v;
}

// ../utilities/core/src/functions.ts
var runIfFn = (v, ...a) => {
  const res = typeof v === "function" ? v(...a) : v;
  return res ?? void 0;
};
var cast = (v) => v;
var noop = () => {
};
var uuid = /* @__PURE__ */ (() => {
  let id = 0;
  return () => {
    id++;
    return id.toString(36);
  };
})();
var isArray = (v) => Array.isArray(v);
var isObject = (v) => !(v == null || typeof v !== "object" || isArray(v));
var isNumber = (v) => typeof v === "number" && !Number.isNaN(v);
var isString = (v) => typeof v === "string";
var isFunction = (v) => typeof v === "function";

// ../utilities/core/src/object.ts
function compact$1(obj) {
  if (!isPlainObject$1(obj) || obj === void 0) {
    return obj;
  }
  const keys = Reflect.ownKeys(obj).filter((key) => typeof key === "string");
  const filtered = {};
  for (const key of keys) {
    const value = obj[key];
    if (value !== void 0) {
      filtered[key] = compact$1(value);
    }
  }
  return filtered;
}
var isPlainObject$1 = (value) => {
  return value && typeof value === "object" && value.constructor === Object;
};

// ../utilities/core/src/warning.ts
function warn$1(...a) {
  const m = a.length === 1 ? a[0] : a[1];
  const c = a.length === 2 ? a[0] : true;
  if (c && "production" !== "production") {
    console.warn(m);
  }
}
function invariant(...a) {
  const m = a.length === 1 ? a[0] : a[1];
  const c = a.length === 2 ? a[0] : true;
  if (c && "production" !== "production") {
    throw new Error(m);
  }
}

// src/deep-merge.ts
function deepMerge(source, ...objects) {
  for (const obj of objects) {
    const target = compact$1(obj);
    for (const key in target) {
      if (isObject(obj[key])) {
        if (!source[key]) {
          source[key] = {};
        }
        deepMerge(source[key], obj[key]);
      } else {
        source[key] = obj[key];
      }
    }
  }
  return source;
}
function structuredClone(v) {
  return klona(v);
}
function toEvent(event) {
  const obj = isString(event) ? { type: event } : event;
  return obj;
}
function toArray(value) {
  if (!value)
    return [];
  return isArray(value) ? value.slice() : [value];
}
function isGuardHelper(value) {
  return isObject(value) && value.predicate != null;
}

// src/guard-utils.ts
var Truthy = () => true;
function exec(guardMap, ctx, event, meta) {
  return (guard) => {
    if (isString(guard)) {
      return !!guardMap[guard]?.(ctx, event, meta);
    }
    if (isFunction(guard)) {
      return guard(ctx, event, meta);
    }
    return guard.predicate(guardMap)(ctx, event, meta);
  };
}
function or$1(...conditions) {
  return {
    predicate: (guardMap) => (ctx, event, meta) => conditions.map(exec(guardMap, ctx, event, meta)).some(Boolean)
  };
}
function and$1(...conditions) {
  return {
    predicate: (guardMap) => (ctx, event, meta) => conditions.map(exec(guardMap, ctx, event, meta)).every(Boolean)
  };
}
function not$1(condition) {
  return {
    predicate: (guardMap) => (ctx, event, meta) => {
      return !exec(guardMap, ctx, event, meta)(condition);
    }
  };
}
function stateIn(...values) {
  return (_ctx, _evt, meta) => meta.state.matches(...values);
}
var guards = { or: or$1, and: and$1, not: not$1, stateIn };
function determineGuardFn(guard, guardMap) {
  guard = guard ?? Truthy;
  return (context, event, meta) => {
    if (isString(guard)) {
      const value = guardMap[guard];
      return isFunction(value) ? value(context, event, meta) : value;
    }
    if (isGuardHelper(guard)) {
      return guard.predicate(guardMap)(context, event, meta);
    }
    return guard?.(context, event, meta);
  };
}
function determineActionsFn(values, guardMap) {
  return (context, event, meta) => {
    if (isGuardHelper(values)) {
      return values.predicate(guardMap)(context, event, meta);
    }
    return values;
  };
}
function createProxy(config) {
  const computedContext = config.computed ?? cast({});
  const initialContext = config.context ?? cast({});
  const state = proxy({
    value: config.initial ?? "",
    previousValue: "",
    event: cast({}),
    previousEvent: cast({}),
    context: proxyWithComputed(initialContext, computedContext),
    done: false,
    tags: [],
    hasTag(tag) {
      return this.tags.includes(tag);
    },
    matches(...value) {
      return value.includes(this.value);
    },
    can(event) {
      return cast(this).nextEvents.includes(event);
    },
    get nextEvents() {
      const stateEvents = config.states?.[this.value]?.["on"] ?? {};
      const globalEvents = config?.on ?? {};
      return Object.keys({ ...stateEvents, ...globalEvents });
    },
    get changed() {
      if (this.event.value === "machine.init" /* Init */ || !this.previousValue)
        return false;
      return this.value !== this.previousValue;
    }
  });
  return cast(state);
}

// src/delay-utils.ts
function determineDelayFn(delay, delaysMap) {
  return (context, event) => {
    if (isNumber(delay))
      return delay;
    if (isFunction(delay)) {
      return delay(context, event);
    }
    if (isString(delay)) {
      const value = Number.parseFloat(delay);
      if (!Number.isNaN(value)) {
        return value;
      }
      if (delaysMap) {
        const valueOrFn = delaysMap?.[delay];
        invariant(
          valueOrFn == null,
          `[@zag-js/core > determine-delay] Cannot determine delay for \`${delay}\`. It doesn't exist in \`options.delays\``
        );
        return isFunction(valueOrFn) ? valueOrFn(context, event) : valueOrFn;
      }
    }
  };
}

// src/transition-utils.ts
function toTarget(target) {
  return isString(target) ? { target } : target;
}
function determineTransitionFn(transitions, guardMap) {
  return (context, event, meta) => {
    return toArray(transitions).map(toTarget).find((transition) => {
      const determineGuard = determineGuardFn(transition.guard, guardMap);
      const guard = determineGuard(context, event, meta);
      return guard ?? transition.target ?? transition.actions;
    });
  };
}

// src/machine.ts
var Machine = class _Machine {
  // Let's get started!
  constructor(config, options) {
    __publicField(this, "status", "Not Started" /* NotStarted */);
    __publicField(this, "state");
    __publicField(this, "initialState");
    __publicField(this, "initialContext");
    __publicField(this, "id");
    __publicField(this, "type", "machine" /* Machine */);
    // Cleanup function map (per state)
    __publicField(this, "activityEvents", /* @__PURE__ */ new Map());
    __publicField(this, "delayedEvents", /* @__PURE__ */ new Map());
    // state update listeners the user can opt-in for
    __publicField(this, "stateListeners", /* @__PURE__ */ new Set());
    __publicField(this, "contextListeners", /* @__PURE__ */ new Set());
    __publicField(this, "eventListeners", /* @__PURE__ */ new Set());
    __publicField(this, "doneListeners", /* @__PURE__ */ new Set());
    __publicField(this, "contextWatchers", /* @__PURE__ */ new Set());
    // Cleanup functions (for `subscribe`)
    __publicField(this, "removeStateListener", noop);
    __publicField(this, "removeEventListener", noop);
    __publicField(this, "removeContextListener", noop);
    // For Parent <==> Spawned Actor relationship
    __publicField(this, "parent");
    __publicField(this, "children", /* @__PURE__ */ new Map());
    // A map of guard, action, delay implementations
    __publicField(this, "guardMap");
    __publicField(this, "actionMap");
    __publicField(this, "delayMap");
    __publicField(this, "activityMap");
    __publicField(this, "sync");
    __publicField(this, "options");
    __publicField(this, "config");
    // Starts the interpreted machine.
    __publicField(this, "start", (init) => {
      this.state.value = "";
      if (this.status === "Running" /* Running */) {
        return this;
      }
      this.status = "Running" /* Running */;
      this.removeStateListener = subscribe(
        this.state,
        () => {
          this.stateListeners.forEach((listener) => {
            listener(this.stateSnapshot);
          });
        },
        this.sync
      );
      this.removeEventListener = subscribeKey(
        this.state,
        "event",
        (event2) => {
          this.executeActions(this.config.onEvent, event2);
          this.eventListeners.forEach((listener) => {
            listener(event2);
          });
        },
        this.sync
      );
      this.removeContextListener = subscribe(
        this.state.context,
        () => {
          this.log("Context:", this.contextSnapshot);
          this.contextListeners.forEach((listener) => {
            listener(this.contextSnapshot);
          });
        },
        this.sync || this.options.debug
      );
      this.setupContextWatchers();
      this.executeActivities(toEvent("machine.start" /* Start */), toArray(this.config.activities), "machine.start" /* Start */);
      this.executeActions(this.config.entry, toEvent("machine.start" /* Start */));
      const event = toEvent("machine.init" /* Init */);
      const target = isObject(init) ? init.value : init;
      const context = isObject(init) ? init.context : void 0;
      if (context) {
        this.setContext(context);
      }
      const transition = {
        target: target ?? this.config.initial
      };
      const next = this.getNextStateInfo(transition, event);
      this.initialState = next;
      this.performStateChangeEffects(this.state.value, next, event);
      return this;
    });
    __publicField(this, "setupContextWatchers", () => {
      for (const [key, fn] of Object.entries(this.config.watch ?? {})) {
        const compareFn = this.options.compareFns?.[key];
        const cleanup = subscribeKey(
          this.state.context,
          key,
          () => {
            this.executeActions(fn, this.state.event);
          },
          this.sync,
          compareFn
        );
        this.contextWatchers.add(cleanup);
      }
    });
    // Stops the interpreted machine
    __publicField(this, "stop", () => {
      if (this.status === "Stopped" /* Stopped */)
        return;
      this.performExitEffects(this.state.value, toEvent("machine.stop" /* Stop */));
      this.executeActions(this.config.exit, toEvent("machine.stop" /* Stop */));
      this.setState("");
      this.setEvent("machine.stop" /* Stop */);
      this.stopStateListeners();
      this.stopChildren();
      this.stopActivities();
      this.stopDelayedEvents();
      this.stopContextWatchers();
      this.stopEventListeners();
      this.stopContextListeners();
      this.status = "Stopped" /* Stopped */;
      return this;
    });
    __publicField(this, "stopEventListeners", () => {
      this.eventListeners.clear();
      this.removeEventListener();
    });
    __publicField(this, "stopContextListeners", () => {
      this.contextListeners.clear();
      this.removeContextListener();
    });
    __publicField(this, "stopStateListeners", () => {
      this.removeStateListener();
      this.stateListeners.clear();
    });
    __publicField(this, "stopContextWatchers", () => {
      this.contextWatchers.forEach((fn) => fn());
      this.contextWatchers.clear();
    });
    __publicField(this, "stopDelayedEvents", () => {
      this.delayedEvents.forEach((state) => {
        state.forEach((stop) => stop());
      });
      this.delayedEvents.clear();
    });
    // Cleanup running activities (e.g `setInterval`, invoked callbacks, promises)
    __publicField(this, "stopActivities", (state) => {
      if (state) {
        this.activityEvents.get(state)?.forEach((stop) => stop());
        this.activityEvents.get(state)?.clear();
        this.activityEvents.delete(state);
      } else {
        this.activityEvents.forEach((state2) => {
          state2.forEach((stop) => stop());
          state2.clear();
        });
        this.activityEvents.clear();
      }
    });
    /**
     * Function to send event to spawned child machine or actor
     */
    __publicField(this, "sendChild", (evt, to) => {
      const event = toEvent(evt);
      const id = runIfFn(to, this.contextSnapshot);
      const child = this.children.get(id);
      if (!child) {
        invariant(`[@zag-js/core] Cannot send '${event.type}' event to unknown child`);
      }
      child.send(event);
    });
    /**
     * Function to stop a running child machine or actor
     */
    __publicField(this, "stopChild", (id) => {
      if (!this.children.has(id)) {
        invariant(`[@zag-js/core > stop-child] Cannot stop unknown child ${id}`);
      }
      this.children.get(id).stop();
      this.children.delete(id);
    });
    __publicField(this, "removeChild", (id) => {
      this.children.delete(id);
    });
    // Stop and delete spawned actors
    __publicField(this, "stopChildren", () => {
      this.children.forEach((child) => child.stop());
      this.children.clear();
    });
    __publicField(this, "setParent", (parent) => {
      this.parent = parent;
    });
    __publicField(this, "spawn", (src, id) => {
      const actor = runIfFn(src);
      if (id)
        actor.id = id;
      actor.type = "machine.actor" /* Actor */;
      actor.setParent(this);
      this.children.set(actor.id, cast(actor));
      actor.onDone(() => {
        this.removeChild(actor.id);
      }).start();
      return cast(ref(actor));
    });
    __publicField(this, "addActivityCleanup", (state, cleanup) => {
      if (!state)
        return;
      if (!this.activityEvents.has(state)) {
        this.activityEvents.set(state, /* @__PURE__ */ new Set([cleanup]));
      } else {
        this.activityEvents.get(state)?.add(cleanup);
      }
    });
    __publicField(this, "setState", (target) => {
      this.state.previousValue = this.state.value;
      this.state.value = target;
      const stateNode = this.getStateNode(target);
      if (target == null) {
        clear(this.state.tags);
      } else {
        this.state.tags = toArray(stateNode?.tags);
      }
    });
    __publicField(this, "transformContext", (context) => {
      this.options?.transformContext?.(context);
      return context;
    });
    /**
     * To used within side effects for React or Vue to update context
     */
    __publicField(this, "setContext", (context) => {
      if (!context)
        return;
      deepMerge(this.state.context, this.transformContext(context));
    });
    __publicField(this, "withContext", (context) => {
      const transformed = this.transformContext(context);
      const newContext = { ...this.config.context, ...compact$1(transformed) };
      return new _Machine({ ...this.config, context: newContext }, this.options);
    });
    __publicField(this, "setOptions", (options) => {
      const opts = compact$1(options);
      this.actionMap = { ...this.actionMap, ...opts.actions };
      this.delayMap = { ...this.delayMap, ...opts.delays };
      this.activityMap = { ...this.activityMap, ...opts.activities };
      this.guardMap = { ...this.guardMap, ...opts.guards };
    });
    __publicField(this, "getStateNode", (state) => {
      if (!state)
        return;
      return this.config.states?.[state];
    });
    __publicField(this, "getNextStateInfo", (transitions, event) => {
      const transition = this.determineTransition(transitions, event);
      const isTargetless = !transition?.target;
      const target = transition?.target ?? this.state.value;
      const changed = this.state.value !== target;
      const stateNode = this.getStateNode(target);
      const reenter = !isTargetless && !changed && !transition?.internal;
      const info = {
        reenter,
        transition,
        stateNode,
        target,
        changed
      };
      this.log("NextState:", `[${event.type}]`, this.state.value, "---->", info.target);
      return info;
    });
    __publicField(this, "getActionFromDelayedTransition", (transition) => {
      const event = toEvent("machine.after" /* After */);
      const determineDelay = determineDelayFn(transition.delay, this.delayMap);
      const delay = determineDelay(this.contextSnapshot, event);
      let id;
      return {
        entry: () => {
          id = globalThis.setTimeout(() => {
            const next = this.getNextStateInfo(transition, event);
            this.performStateChangeEffects(this.state.value, next, event);
          }, delay);
        },
        exit: () => {
          globalThis.clearTimeout(id);
        }
      };
    });
    /**
     * All `after` events leverage `setTimeout` and `clearTimeout`,
     * we invoke the `clearTimeout` on exit and `setTimeout` on entry.
     *
     * To achieve this, we split the `after` defintion into `entry` and `exit`
     *  functions and append them to the state's `entry` and `exit` actions
     */
    __publicField(this, "getDelayedEventActions", (state) => {
      const stateNode = this.getStateNode(state);
      const event = toEvent("machine.after" /* After */);
      if (!stateNode || !stateNode.after)
        return;
      const entries = [];
      const exits = [];
      if (isArray(stateNode.after)) {
        const transition = this.determineTransition(stateNode.after, event);
        if (!transition)
          return;
        const actions = this.getActionFromDelayedTransition(transition);
        entries.push(actions.entry);
        exits.push(actions.exit);
      } else if (isObject(stateNode.after)) {
        for (const delay in stateNode.after) {
          const transition = stateNode.after[delay];
          let resolvedTransition = {};
          if (isArray(transition)) {
            const picked = this.determineTransition(transition, event);
            if (picked)
              resolvedTransition = picked;
          } else if (isString(transition)) {
            resolvedTransition = { target: transition, delay };
          } else {
            resolvedTransition = { ...transition, delay };
          }
          const actions = this.getActionFromDelayedTransition(resolvedTransition);
          entries.push(actions.entry);
          exits.push(actions.exit);
        }
      }
      return { entries, exits };
    });
    /**
     * Function to executes defined actions. It can accept actions as string
     * (referencing `options.actions`) or actual functions.
     */
    __publicField(this, "executeActions", (actions, event) => {
      const pickedActions = determineActionsFn(actions, this.guardMap)(this.contextSnapshot, event, this.guardMeta);
      for (const action of toArray(pickedActions)) {
        const fn = isString(action) ? this.actionMap?.[action] : action;
        warn$1(
          isString(action) && !fn,
          `[@zag-js/core > execute-actions] No implementation found for action: \`${action}\``
        );
        fn?.(this.state.context, event, this.meta);
      }
    });
    /**
     * Function to execute running activities and registers
     * their cleanup function internally (to be called later on when we exit the state)
     */
    __publicField(this, "executeActivities", (event, activities, state) => {
      for (const activity of activities) {
        const fn = isString(activity) ? this.activityMap?.[activity] : activity;
        if (!fn) {
          warn$1(`[@zag-js/core > execute-activity] No implementation found for activity: \`${activity}\``);
          continue;
        }
        const cleanup = fn(this.state.context, event, this.meta);
        if (cleanup) {
          this.addActivityCleanup(state ?? this.state.value, cleanup);
        }
      }
    });
    /**
     * Normalizes the `every` definition to transition. `every` can be:
     * - An array of possible actions to run (we need to pick the first match based on guard)
     * - An object of intervals and actions
     */
    __publicField(this, "createEveryActivities", (every, callbackfn) => {
      if (!every)
        return;
      const event = toEvent("machine.every" /* Every */);
      if (isArray(every)) {
        const picked = toArray(every).find((transition) => {
          const delayOrFn = transition.delay;
          const determineDelay2 = determineDelayFn(delayOrFn, this.delayMap);
          const delay2 = determineDelay2(this.contextSnapshot, event);
          const determineGuard = determineGuardFn(transition.guard, this.guardMap);
          const guard = determineGuard(this.contextSnapshot, event, this.guardMeta);
          return guard ?? delay2 != null;
        });
        if (!picked)
          return;
        const determineDelay = determineDelayFn(picked.delay, this.delayMap);
        const delay = determineDelay(this.contextSnapshot, event);
        const activity = () => {
          const id = globalThis.setInterval(() => {
            this.executeActions(picked.actions, event);
          }, delay);
          return () => {
            globalThis.clearInterval(id);
          };
        };
        callbackfn(activity);
      } else {
        for (const interval in every) {
          const actions = every?.[interval];
          const determineDelay = determineDelayFn(interval, this.delayMap);
          const delay = determineDelay(this.contextSnapshot, event);
          const activity = () => {
            const id = globalThis.setInterval(() => {
              this.executeActions(actions, event);
            }, delay);
            return () => {
              globalThis.clearInterval(id);
            };
          };
          callbackfn(activity);
        }
      }
    });
    __publicField(this, "setEvent", (event) => {
      this.state.previousEvent = this.state.event;
      this.state.event = ref(toEvent(event));
    });
    __publicField(this, "performExitEffects", (current, event) => {
      const currentState = this.state.value;
      if (currentState === "")
        return;
      const stateNode = current ? this.getStateNode(current) : void 0;
      this.stopActivities(currentState);
      const _exit = determineActionsFn(stateNode?.exit, this.guardMap)(this.contextSnapshot, event, this.guardMeta);
      const exitActions = toArray(_exit);
      const afterExitActions = this.delayedEvents.get(currentState);
      if (afterExitActions) {
        exitActions.push(...afterExitActions);
      }
      this.executeActions(exitActions, event);
      this.eventListeners.clear();
    });
    __publicField(this, "performEntryEffects", (next, event) => {
      const stateNode = this.getStateNode(next);
      const activities = toArray(stateNode?.activities);
      this.createEveryActivities(stateNode?.every, (activity) => {
        activities.unshift(activity);
      });
      if (activities.length > 0) {
        this.executeActivities(event, activities);
      }
      const pickedActions = determineActionsFn(stateNode?.entry, this.guardMap)(
        this.contextSnapshot,
        event,
        this.guardMeta
      );
      const entryActions = toArray(pickedActions);
      const afterActions = this.getDelayedEventActions(next);
      if (stateNode?.after && afterActions) {
        this.delayedEvents.set(next, afterActions?.exits);
        entryActions.push(...afterActions.entries);
      }
      this.executeActions(entryActions, event);
      if (stateNode?.type === "final") {
        this.state.done = true;
        this.doneListeners.forEach((listener) => {
          listener(this.stateSnapshot);
        });
        this.stop();
      }
    });
    __publicField(this, "performTransitionEffects", (transitions, event) => {
      const transition = this.determineTransition(transitions, event);
      this.executeActions(transition?.actions, event);
    });
    /**
     * Performs all the requires side-effects or reactions when
     * we move from state A => state B.
     *
     * The Effect order:
     * Exit actions (current state) => Transition actions  => Go to state => Entry actions (next state)
     */
    __publicField(this, "performStateChangeEffects", (current, next, event) => {
      this.setEvent(event);
      const changed = next.changed || next.reenter;
      if (changed) {
        this.performExitEffects(current, event);
      }
      this.performTransitionEffects(next.transition, event);
      this.setState(next.target);
      if (changed) {
        this.performEntryEffects(next.target, event);
      }
    });
    __publicField(this, "determineTransition", (transition, event) => {
      const fn = determineTransitionFn(transition, this.guardMap);
      return fn?.(this.contextSnapshot, event, this.guardMeta);
    });
    /**
     * Function to send event to parent machine from spawned child
     */
    __publicField(this, "sendParent", (evt) => {
      if (!this.parent) {
        invariant("[@zag-js/core > send-parent] Cannot send event to an unknown parent");
      }
      const event = toEvent(evt);
      this.parent?.send(event);
    });
    __publicField(this, "log", (...args) => {
    });
    /**
     * Function to send an event to current machine
     */
    __publicField(this, "send", (evt) => {
      const event = toEvent(evt);
      this.transition(this.state.value, event);
    });
    __publicField(this, "transition", (state, evt) => {
      const stateNode = isString(state) ? this.getStateNode(state) : state?.stateNode;
      const event = toEvent(evt);
      if (!stateNode && !this.config.on) {
        const msg = this.status === "Stopped" /* Stopped */ ? "[@zag-js/core > transition] Cannot transition a stopped machine" : `[@zag-js/core > transition] State does not have a definition for \`state\`: ${state}, \`event\`: ${event.type}`;
        warn$1(msg);
        return;
      }
      const transitions = stateNode?.on?.[event.type] ?? this.config.on?.[event.type];
      const next = this.getNextStateInfo(transitions, event);
      this.performStateChangeEffects(this.state.value, next, event);
      return next.stateNode;
    });
    __publicField(this, "subscribe", (listener) => {
      this.stateListeners.add(listener);
      if (this.status === "Running" /* Running */) {
        listener(this.stateSnapshot);
      }
      return () => {
        this.stateListeners.delete(listener);
      };
    });
    __publicField(this, "onDone", (listener) => {
      this.doneListeners.add(listener);
      return this;
    });
    __publicField(this, "onTransition", (listener) => {
      this.stateListeners.add(listener);
      if (this.status === "Running" /* Running */) {
        listener(this.stateSnapshot);
      }
      return this;
    });
    __publicField(this, "onChange", (listener) => {
      this.contextListeners.add(listener);
      return this;
    });
    __publicField(this, "onEvent", (listener) => {
      this.eventListeners.add(listener);
      return this;
    });
    this.config = structuredClone(config);
    this.options = structuredClone(options ?? {});
    this.id = this.config.id ?? `machine-${uuid()}`;
    this.guardMap = this.options?.guards ?? {};
    this.actionMap = this.options?.actions ?? {};
    this.delayMap = this.options?.delays ?? {};
    this.activityMap = this.options?.activities ?? {};
    this.sync = this.options?.sync ?? false;
    this.state = createProxy(this.config);
    this.initialContext = snapshot(this.state.context);
    this.transformContext(this.state.context);
    const event = toEvent("machine.created" /* Created */);
    this.executeActions(this.config?.created, event);
  }
  // immutable state value
  get stateSnapshot() {
    return cast(snapshot(this.state));
  }
  getState() {
    return this.stateSnapshot;
  }
  // immutable context value
  get contextSnapshot() {
    return this.stateSnapshot.context;
  }
  /**
   * A reference to the instance methods of the machine.
   * Useful when spawning child machines and managing the communication between them.
   */
  get self() {
    const self = this;
    return {
      id: this.id,
      send: this.send.bind(this),
      sendParent: this.sendParent.bind(this),
      sendChild: this.sendChild.bind(this),
      stop: this.stop.bind(this),
      stopChild: this.stopChild.bind(this),
      spawn: this.spawn.bind(this),
      get state() {
        return self.stateSnapshot;
      },
      get initialContext() {
        return self.initialContext;
      },
      get initialState() {
        return self.initialState?.target ?? "";
      }
    };
  }
  get meta() {
    return {
      state: this.stateSnapshot,
      guards: this.guardMap,
      send: this.send.bind(this),
      self: this.self,
      initialContext: this.initialContext,
      initialState: this.initialState?.target ?? "",
      getState: () => this.stateSnapshot,
      getAction: (key) => this.actionMap[key],
      getGuard: (key) => this.guardMap[key]
    };
  }
  get guardMeta() {
    return {
      state: this.stateSnapshot
    };
  }
  get [Symbol.toStringTag]() {
    return "Machine";
  }
};
var createMachine = (config, options) => new Machine(config, options);

// src/proxy-tab-focus.ts

// src/shared.ts
var isHTMLElement = (element) => typeof element === "object" && element !== null && element.nodeType === 1;
function isVisible(el) {
  if (!isHTMLElement(el))
    return false;
  return el.offsetWidth > 0 || el.offsetHeight > 0 || el.getClientRects().length > 0;
}
var focusableSelector = "input:not([type='hidden']):not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], button:not([disabled]), [tabindex], iframe, object, embed, area[href], audio[controls], video[controls], [contenteditable]:not([contenteditable='false']), details > summary:first-of-type";
function isFocusable(element) {
  if (!element || element.closest("[inert]"))
    return false;
  return element.matches(focusableSelector) && isVisible(element);
}

// src/array.ts
var callAll = (...fns) => (...a) => {
  fns.forEach(function(fn) {
    fn?.(...a);
  });
};

// src/object.ts
function compact(obj) {
  if (!isPlainObject(obj) || obj === void 0) {
    return obj;
  }
  const keys = Reflect.ownKeys(obj).filter((key) => typeof key === "string");
  const filtered = {};
  for (const key of keys) {
    const value = obj[key];
    if (value !== void 0) {
      filtered[key] = compact(value);
    }
  }
  return filtered;
}
var isPlainObject = (value) => {
  return value && typeof value === "object" && value.constructor === Object;
};

// src/warning.ts
function warn(...a) {
  const m = a.length === 1 ? a[0] : a[1];
  const c = a.length === 2 ? a[0] : true;
  if (c && "production" !== "production") {
    console.warn(m);
  }
}

// src/index.ts

// src/get-window-frames.ts
function getWindowFrames(win) {
  const frames = {
    each(cb) {
      for (let i = 0; i < win.frames?.length; i += 1) {
        const frame = win.frames[i];
        if (frame)
          cb(frame);
      }
    },
    addEventListener(event, listener, options) {
      frames.each((frame) => {
        try {
          frame.document.addEventListener(event, listener, options);
        } catch (err) {
          console.warn(err);
        }
      });
      return () => {
        try {
          frames.removeEventListener(event, listener, options);
        } catch (err) {
          console.warn(err);
        }
      };
    },
    removeEventListener(event, listener, options) {
      frames.each((frame) => {
        try {
          frame.document.removeEventListener(event, listener, options);
        } catch (err) {
          console.warn(err);
        }
      });
    }
  };
  return frames;
}

// src/index.ts
var POINTER_OUTSIDE_EVENT = "pointerdown.outside";
var FOCUS_OUTSIDE_EVENT = "focus.outside";
function isComposedPathFocusable(event) {
  const composedPath = event.composedPath() ?? [event.target];
  for (const node of composedPath) {
    if (isHTMLElement$1(node) && isFocusable(node))
      return true;
  }
  return false;
}
var isPointerEvent = (event) => "clientY" in event;
function isEventPointWithin(node, event) {
  if (!isPointerEvent(event) || !node)
    return false;
  const rect = node.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0)
    return false;
  return rect.top <= event.clientY && event.clientY <= rect.top + rect.height && rect.left <= event.clientX && event.clientX <= rect.left + rect.width;
}
function trackInteractOutsideImpl(node, options) {
  const { exclude, onFocusOutside, onPointerDownOutside, onInteractOutside } = options;
  if (!node)
    return;
  const doc = getDocument2(node);
  const win = getWindow$1(node);
  const frames = getWindowFrames(win);
  function isEventOutside(event) {
    const target = getEventTarget(event);
    if (!isHTMLElement$1(target))
      return false;
    if (contains(node, target))
      return false;
    if (isEventPointWithin(node, event))
      return false;
    return !exclude?.(target);
  }
  let clickHandler;
  function onPointerDown(event) {
    function handler() {
      if (!node || !isEventOutside(event))
        return;
      if (onPointerDownOutside || onInteractOutside) {
        const handler2 = callAll(onPointerDownOutside, onInteractOutside);
        node.addEventListener(POINTER_OUTSIDE_EVENT, handler2, { once: true });
      }
      fireCustomEvent(node, POINTER_OUTSIDE_EVENT, {
        bubbles: false,
        cancelable: true,
        detail: {
          originalEvent: event,
          contextmenu: isContextMenuEvent(event),
          focusable: isComposedPathFocusable(event)
        }
      });
    }
    if (event.pointerType === "touch") {
      frames.removeEventListener("click", handler);
      doc.removeEventListener("click", handler);
      clickHandler = handler;
      doc.addEventListener("click", handler, { once: true });
      frames.addEventListener("click", handler, { once: true });
    } else {
      handler();
    }
  }
  const cleanups = /* @__PURE__ */ new Set();
  const timer = setTimeout(() => {
    cleanups.add(frames.addEventListener("pointerdown", onPointerDown, true));
    cleanups.add(addDomEvent(doc, "pointerdown", onPointerDown, true));
  }, 0);
  function onFocusin(event) {
    if (!node || !isEventOutside(event))
      return;
    if (onFocusOutside || onInteractOutside) {
      const handler = callAll(onFocusOutside, onInteractOutside);
      node.addEventListener(FOCUS_OUTSIDE_EVENT, handler, { once: true });
    }
    fireCustomEvent(node, FOCUS_OUTSIDE_EVENT, {
      bubbles: false,
      cancelable: true,
      detail: {
        originalEvent: event,
        contextmenu: false,
        focusable: isFocusable(getEventTarget(event))
      }
    });
  }
  cleanups.add(addDomEvent(doc, "focusin", onFocusin, true));
  cleanups.add(frames.addEventListener("focusin", onFocusin, true));
  return () => {
    clearTimeout(timer);
    if (clickHandler) {
      frames.removeEventListener("click", clickHandler);
      doc.removeEventListener("click", clickHandler);
    }
    cleanups.forEach((fn) => fn());
  };
}
function trackInteractOutside(nodeOrFn, options) {
  const { defer } = options;
  const func = defer ? raf : (v) => v();
  const cleanups = [];
  cleanups.push(
    func(() => {
      const node = typeof nodeOrFn === "function" ? nodeOrFn() : nodeOrFn;
      cleanups.push(trackInteractOutsideImpl(node, options));
    })
  );
  return () => {
    cleanups.forEach((fn) => fn?.());
  };
}

// src/index.ts
var visuallyHiddenStyle = {
  border: "0",
  clip: "rect(0 0 0 0)",
  height: "1px",
  margin: "-1px",
  overflow: "hidden",
  padding: "0",
  position: "absolute",
  width: "1px",
  whiteSpace: "nowrap",
  wordWrap: "normal"
};
function setVisuallyHidden(el) {
  Object.assign(el.style, visuallyHiddenStyle);
}

// src/index.ts
var ID = "__live-region__";
function createLiveRegion(opts = {}) {
  const { level = "polite", document: doc = document, root, delay: _delay = 0 } = opts;
  const win = doc.defaultView ?? window;
  const parent = root ?? doc.body;
  function announce(message, delay) {
    const oldRegion = doc.getElementById(ID);
    oldRegion?.remove();
    delay = delay ?? _delay;
    const region = doc.createElement("span");
    region.id = ID;
    region.dataset.liveAnnouncer = "true";
    const role = level !== "assertive" ? "status" : "alert";
    region.setAttribute("aria-live", level);
    region.setAttribute("role", role);
    setVisuallyHidden(region);
    parent.appendChild(region);
    win.setTimeout(() => {
      region.textContent = message;
    }, delay);
  }
  function destroy() {
    const oldRegion = doc.getElementById(ID);
    oldRegion?.remove();
  }
  return {
    announce,
    destroy,
    toJSON() {
      return ID;
    }
  };
}

// src/tags-input.anatomy.ts
var anatomy = createAnatomy("tagsInput").parts(
  "root",
  "label",
  "control",
  "input",
  "clearTrigger",
  "tag",
  "tagInput",
  "tagDeleteTrigger"
);
var parts = anatomy.build();
var dom = createScope({
  getRootId: (ctx) => ctx.ids?.root ?? `tags-input:${ctx.id}`,
  getInputId: (ctx) => ctx.ids?.input ?? `tags-input:${ctx.id}:input`,
  getClearTriggerId: (ctx) => ctx.ids?.clearBtn ?? `tags-input:${ctx.id}:clear-btn`,
  getHiddenInputId: (ctx) => `tags-input:${ctx.id}:hidden-input`,
  getLabelId: (ctx) => ctx.ids?.label ?? `tags-input:${ctx.id}:label`,
  getControlId: (ctx) => ctx.ids?.control ?? `tags-input:${ctx.id}:control`,
  getTagId: (ctx, opt) => ctx.ids?.tag?.(opt) ?? `tags-input:${ctx.id}:tag:${opt.value}:${opt.index}`,
  getTagDeleteTriggerId: (ctx, opt) => ctx.ids?.tagDeleteTrigger?.(opt) ?? `${dom.getTagId(ctx, opt)}:delete-btn`,
  getTagInputId: (ctx, opt) => ctx.ids?.tagInput?.(opt) ?? `${dom.getTagId(ctx, opt)}:input`,
  getEditInputId: (ctx) => `${ctx.editedId}:input`,
  getTagInputEl: (ctx, opt) => dom.getById(ctx, dom.getTagInputId(ctx, opt)),
  getRootEl: (ctx) => dom.getById(ctx, dom.getRootId(ctx)),
  getInputEl: (ctx) => dom.getById(ctx, dom.getInputId(ctx)),
  getHiddenInputEl: (ctx) => dom.getById(ctx, dom.getHiddenInputId(ctx)),
  getEditInputEl: (ctx) => dom.getById(ctx, dom.getEditInputId(ctx)),
  getElements: (ctx) => queryAll(dom.getRootEl(ctx), `[data-part=tag]:not([data-disabled])`),
  getFirstEl: (ctx) => dom.getElements(ctx)[0],
  getLastEl: (ctx) => dom.getElements(ctx)[dom.getElements(ctx).length - 1],
  getPrevEl: (ctx, id) => prevById(dom.getElements(ctx), id, false),
  getNextEl: (ctx, id) => nextById(dom.getElements(ctx), id, false),
  getElAtIndex: (ctx, index) => dom.getElements(ctx)[index],
  getIndexOfId: (ctx, id) => indexOfId(dom.getElements(ctx), id),
  isInputFocused: (ctx) => dom.getDoc(ctx).activeElement === dom.getInputEl(ctx),
  getFocusedTagValue: (ctx) => {
    if (!ctx.focusedId)
      return null;
    const idx = dom.getIndexOfId(ctx, ctx.focusedId);
    if (idx === -1)
      return null;
    return dom.getElements(ctx)[idx].dataset.value ?? null;
  },
  setHoverIntent: (el) => {
    const tag = el.closest("[data-part=tag]");
    if (!tag)
      return;
    tag.dataset.deleteIntent = "";
  },
  clearHoverIntent: (el) => {
    const tag = el.closest("[data-part=tag]");
    if (!tag)
      return;
    delete tag.dataset.deleteIntent;
  },
  dispatchInputEvent(ctx) {
    const inputEl = dom.getHiddenInputEl(ctx);
    if (!inputEl)
      return;
    dispatchInputValueEvent(inputEl, { value: ctx.valueAsString });
  }
});

// src/tags-input.connect.ts
function connect(state, send, normalize) {
  const isInteractive = state.context.isInteractive;
  const isDisabled = state.context.disabled;
  const isReadOnly = state.context.readOnly;
  const isInvalid = state.context.invalid || state.context.isOverflowing;
  const translations = state.context.translations;
  const isInputFocused = state.hasTag("focused");
  const isEditingTag = state.matches("editing:tag");
  const isEmpty = state.context.count === 0;
  return {
    isEmpty,
    inputValue: state.context.trimmedInputValue,
    value: state.context.value,
    valueAsString: state.context.valueAsString,
    count: state.context.count,
    isAtMax: state.context.isAtMax,
    setValue(value) {
      send({ type: "SET_VALUE", value });
    },
    clearValue(id) {
      if (id) {
        send({ type: "CLEAR_TAG", id });
      } else {
        send("CLEAR_VALUE");
      }
    },
    addValue(value) {
      send({ type: "ADD_TAG", value });
    },
    setValueAtIndex(index, value) {
      send({ type: "SET_VALUE_AT_INDEX", index, value });
    },
    setInputValue(value) {
      send({ type: "SET_INPUT_VALUE", value });
    },
    clearInputValue() {
      send({ type: "SET_INPUT_VALUE", value: "" });
    },
    focus() {
      dom.getInputEl(state.context)?.focus();
    },
    rootProps: normalize.element({
      dir: state.context.dir,
      ...parts.root.attrs,
      "data-invalid": dataAttr(isInvalid),
      "data-readonly": dataAttr(isReadOnly),
      "data-disabled": dataAttr(isDisabled),
      "data-focus": dataAttr(isInputFocused),
      "data-empty": dataAttr(isEmpty),
      id: dom.getRootId(state.context),
      onPointerDown() {
        if (!isInteractive)
          return;
        send("POINTER_DOWN");
      }
    }),
    labelProps: normalize.label({
      ...parts.label.attrs,
      "data-disabled": dataAttr(isDisabled),
      "data-invalid": dataAttr(isInvalid),
      "data-readonly": dataAttr(isReadOnly),
      id: dom.getLabelId(state.context),
      htmlFor: dom.getInputId(state.context)
    }),
    controlProps: normalize.element({
      id: dom.getControlId(state.context),
      ...parts.control.attrs,
      tabIndex: isReadOnly ? 0 : void 0,
      "data-disabled": dataAttr(isDisabled),
      "data-readonly": dataAttr(isReadOnly),
      "data-invalid": dataAttr(isInvalid),
      "data-focus": dataAttr(isInputFocused)
    }),
    inputProps: normalize.input({
      ...parts.input.attrs,
      "data-invalid": dataAttr(isInvalid),
      "aria-invalid": ariaAttr(isInvalid),
      "data-readonly": dataAttr(isReadOnly),
      maxLength: state.context.maxLength,
      id: dom.getInputId(state.context),
      defaultValue: state.context.inputValue,
      autoComplete: "off",
      autoCorrect: "off",
      autoCapitalize: "none",
      disabled: isDisabled || isReadOnly,
      onChange(event) {
        const evt = getNativeEvent(event);
        if (evt.inputType === "insertFromPaste")
          return;
        let value = event.target.value;
        if (value.endsWith(state.context.delimiter)) {
          send("DELIMITER_KEY");
        } else {
          send({ type: "TYPE", value, key: evt.inputType });
        }
      },
      onFocus() {
        send("FOCUS");
      },
      onPaste(event) {
        const value = event.clipboardData.getData("text/plain");
        send({ type: "PASTE", value });
      },
      onKeyDown(event) {
        const target = event.currentTarget;
        const isCombobox = target.getAttribute("role") === "combobox";
        const isExpanded = target.ariaExpanded === "true";
        const keyMap = {
          ArrowDown() {
            send("ARROW_DOWN");
          },
          ArrowLeft() {
            if (isCombobox && isExpanded)
              return;
            send("ARROW_LEFT");
          },
          ArrowRight() {
            if (state.context.focusedId) {
              event.preventDefault();
            }
            if (isCombobox && isExpanded)
              return;
            send("ARROW_RIGHT");
          },
          Escape(event2) {
            event2.preventDefault();
            send("ESCAPE");
          },
          Backspace() {
            send("BACKSPACE");
          },
          Delete() {
            send("DELETE");
          },
          Enter(event2) {
            event2.preventDefault();
            send("ENTER");
          }
        };
        const key = getEventKey(event, state.context);
        const exec = keyMap[key];
        if (exec) {
          exec(event);
          return;
        }
      }
    }),
    hiddenInputProps: normalize.input({
      type: "text",
      hidden: true,
      name: state.context.name,
      form: state.context.form,
      id: dom.getHiddenInputId(state.context),
      defaultValue: state.context.valueAsString
    }),
    getTagProps(options) {
      const { value } = options;
      const id = dom.getTagId(state.context, options);
      return normalize.element({
        ...parts.tag.attrs,
        id,
        hidden: isEditingTag ? state.context.editedId === id : false,
        "data-value": value,
        "data-disabled": dataAttr(isDisabled),
        "data-highlighted": dataAttr(id === state.context.focusedId),
        onPointerDown(event) {
          if (!isInteractive)
            return;
          event.preventDefault();
          send({ type: "POINTER_DOWN_TAG", id });
        },
        onDoubleClick() {
          if (!isInteractive)
            return;
          send({ type: "DOUBLE_CLICK_TAG", id });
        }
      });
    },
    getTagInputProps(options) {
      const id = dom.getTagId(state.context, options);
      const active = state.context.editedId === id;
      return normalize.input({
        ...parts.tagInput.attrs,
        "aria-label": translations.tagEdited(options.value),
        "aria-hidden": true,
        disabled: isDisabled,
        id: dom.getTagInputId(state.context, options),
        type: "text",
        tabIndex: -1,
        hidden: isEditingTag ? !active : true,
        defaultValue: active ? state.context.editedTagValue : "",
        onChange(event) {
          send({ type: "TAG_INPUT_TYPE", value: event.target.value });
        },
        onBlur(event) {
          send({ type: "TAG_INPUT_BLUR", target: event.relatedTarget, id });
        },
        onKeyDown(event) {
          const keyMap = {
            Enter() {
              send("TAG_INPUT_ENTER");
            },
            Escape() {
              send("TAG_INPUT_ESCAPE");
            }
          };
          const exec = keyMap[event.key];
          if (exec) {
            event.preventDefault();
            exec(event);
          }
        }
      });
    },
    getTagDeleteTriggerProps(options) {
      const id = dom.getTagId(state.context, options);
      return normalize.button({
        ...parts.tagDeleteTrigger.attrs,
        id: dom.getTagDeleteTriggerId(state.context, options),
        type: "button",
        disabled: isDisabled,
        "aria-label": translations.deleteTagTriggerLabel(options.value),
        tabIndex: -1,
        onPointerDown(event) {
          if (!isInteractive) {
            event.preventDefault();
          }
        },
        onPointerMove(event) {
          if (!isInteractive)
            return;
          dom.setHoverIntent(event.currentTarget);
        },
        onPointerLeave(event) {
          if (!isInteractive)
            return;
          dom.clearHoverIntent(event.currentTarget);
        },
        onClick() {
          if (!isInteractive)
            return;
          send({ type: "CLEAR_TAG", id });
        }
      });
    },
    clearTriggerProps: normalize.button({
      ...parts.clearTrigger.attrs,
      id: dom.getClearTriggerId(state.context),
      type: "button",
      "data-readonly": dataAttr(isReadOnly),
      disabled: isDisabled,
      "aria-label": translations.clearTriggerLabel,
      hidden: isEmpty,
      onClick() {
        if (!isInteractive)
          return;
        send("CLEAR_VALUE");
      }
    })
  };
}
var { and, not, or } = guards;
function machine(userContext) {
  const ctx = compact(userContext);
  return createMachine(
    {
      id: "tags-input",
      initial: ctx.autoFocus ? "focused:input" : "idle",
      context: {
        log: { current: null, prev: null },
        inputValue: "",
        editedTagValue: "",
        focusedId: null,
        editedId: null,
        initialValue: [],
        value: [],
        dir: "ltr",
        max: Infinity,
        liveRegion: null,
        blurBehavior: void 0,
        addOnPaste: false,
        allowEditTag: true,
        validate: () => true,
        delimiter: ",",
        ...ctx,
        translations: {
          clearTriggerLabel: "Clear all tags",
          deleteTagTriggerLabel: (value) => `Delete tag ${value}`,
          tagAdded: (value) => `Added tag ${value}`,
          tagsPasted: (values) => `Pasted ${values.length} tags`,
          tagEdited: (value) => `Editing tag ${value}. Press enter to save or escape to cancel.`,
          tagUpdated: (value) => `Tag update to ${value}`,
          tagDeleted: (value) => `Tag ${value} deleted`,
          tagSelected: (value) => `Tag ${value} selected. Press enter to edit, delete or backspace to remove.`,
          ...ctx.translations
        }
      },
      computed: {
        count: (ctx2) => ctx2.value.length,
        valueAsString: (ctx2) => JSON.stringify(ctx2.value),
        trimmedInputValue: (ctx2) => ctx2.inputValue.trim(),
        isInteractive: (ctx2) => !(ctx2.readOnly || ctx2.disabled),
        isAtMax: (ctx2) => ctx2.count === ctx2.max,
        isOverflowing: (ctx2) => ctx2.count > ctx2.max
      },
      watch: {
        focusedId: ["invokeOnHighlight", "logFocused"],
        isOverflowing: "invokeOnInvalid",
        value: ["invokeOnChange", "dispatchChangeEvent"],
        log: "announceLog",
        inputValue: "syncInputValue",
        editedTagValue: "syncEditedTagValue"
      },
      activities: ["trackFormControlState"],
      exit: ["removeLiveRegion", "clearLog"],
      on: {
        DOUBLE_CLICK_TAG: {
          internal: true,
          guard: "allowEditTag",
          target: "editing:tag",
          actions: ["setEditedId", "initializeEditedTagValue"]
        },
        POINTER_DOWN_TAG: {
          internal: true,
          guard: not("isTagFocused"),
          target: "navigating:tag",
          actions: ["focusTag", "focusInput"]
        },
        SET_INPUT_VALUE: {
          actions: ["setInputValue"]
        },
        SET_VALUE: {
          actions: ["setValue"]
        },
        CLEAR_TAG: {
          actions: ["deleteTag"]
        },
        SET_VALUE_AT_INDEX: {
          actions: ["setValueAtIndex"]
        },
        CLEAR_VALUE: {
          actions: ["clearTags", "clearInputValue", "focusInput"]
        },
        ADD_TAG: {
          // (!isAtMax || allowOverflow) && !inputValueIsEmpty
          guard: and(or(not("isAtMax"), "allowOverflow"), not("isInputValueEmpty")),
          actions: ["addTag", "clearInputValue"]
        },
        EXTERNAL_BLUR: [
          { guard: "addOnBlur", actions: "raiseAddTagEvent" },
          { guard: "clearOnBlur", actions: "clearInputValue" }
        ]
      },
      entry: ["setupDocument", "checkValue"],
      states: {
        idle: {
          on: {
            FOCUS: "focused:input",
            POINTER_DOWN: {
              guard: not("hasFocusedId"),
              target: "focused:input"
            }
          }
        },
        "focused:input": {
          tags: ["focused"],
          entry: ["focusInput", "clearFocusedId"],
          activities: ["trackInteractOutside"],
          on: {
            TYPE: {
              actions: "setInputValue"
            },
            BLUR: [
              {
                guard: "addOnBlur",
                target: "idle",
                actions: "raiseAddTagEvent"
              },
              {
                guard: "clearOnBlur",
                target: "idle",
                actions: "clearInputValue"
              },
              { target: "idle" }
            ],
            ENTER: {
              actions: ["raiseAddTagEvent"]
            },
            DELIMITER_KEY: {
              actions: ["raiseAddTagEvent"]
            },
            ARROW_LEFT: {
              guard: and("hasTags", "isInputCaretAtStart"),
              target: "navigating:tag",
              actions: "focusLastTag"
            },
            BACKSPACE: {
              target: "navigating:tag",
              guard: and("hasTags", "isInputCaretAtStart"),
              actions: "focusLastTag"
            },
            PASTE: {
              guard: "addOnPaste",
              actions: ["setInputValue", "addTagFromPaste"]
            }
          }
        },
        "navigating:tag": {
          tags: ["focused"],
          activities: ["trackInteractOutside"],
          on: {
            ARROW_RIGHT: [
              {
                guard: and("hasTags", "isInputCaretAtStart", not("isLastTagFocused")),
                actions: "focusNextTag"
              },
              { target: "focused:input" }
            ],
            ARROW_LEFT: {
              actions: "focusPrevTag"
            },
            BLUR: {
              target: "idle",
              actions: "clearFocusedId"
            },
            ENTER: {
              guard: and("allowEditTag", "hasFocusedId"),
              target: "editing:tag",
              actions: ["setEditedId", "initializeEditedTagValue", "focusEditedTagInput"]
            },
            ARROW_DOWN: "focused:input",
            ESCAPE: "focused:input",
            TYPE: {
              target: "focused:input",
              actions: "setInputValue"
            },
            BACKSPACE: [
              {
                guard: "isFirstTagFocused",
                actions: ["deleteFocusedTag", "focusFirstTag"]
              },
              {
                actions: ["deleteFocusedTag", "focusPrevTag"]
              }
            ],
            DELETE: {
              actions: ["deleteFocusedTag", "focusTagAtIndex"]
            }
          }
        },
        "editing:tag": {
          tags: ["editing", "focused"],
          entry: "focusEditedTagInput",
          activities: ["autoResize"],
          on: {
            TAG_INPUT_TYPE: {
              actions: "setEditedTagValue"
            },
            TAG_INPUT_ESCAPE: {
              target: "navigating:tag",
              actions: ["clearEditedTagValue", "focusInput", "clearEditedId", "focusTagAtIndex"]
            },
            TAG_INPUT_BLUR: [
              {
                guard: "isInputRelatedTarget",
                target: "navigating:tag",
                actions: ["clearEditedTagValue", "clearFocusedId", "clearEditedId"]
              },
              {
                target: "idle",
                actions: ["clearEditedTagValue", "clearFocusedId", "clearEditedId", "raiseExternalBlurEvent"]
              }
            ],
            TAG_INPUT_ENTER: {
              target: "navigating:tag",
              actions: ["submitEditedTagValue", "focusInput", "clearEditedId", "focusTagAtIndex", "invokeOnTagUpdate"]
            }
          }
        }
      }
    },
    {
      guards: {
        isInputRelatedTarget: (ctx2, evt) => evt.relatedTarget === dom.getInputEl(ctx2),
        isAtMax: (ctx2) => ctx2.isAtMax,
        hasFocusedId: (ctx2) => ctx2.focusedId !== null,
        isTagFocused: (ctx2, evt) => ctx2.focusedId === evt.id,
        isFirstTagFocused: (ctx2) => dom.getFirstEl(ctx2)?.id === ctx2.focusedId,
        isLastTagFocused: (ctx2) => dom.getLastEl(ctx2)?.id === ctx2.focusedId,
        isInputValueEmpty: (ctx2) => ctx2.trimmedInputValue.length === 0,
        hasTags: (ctx2) => ctx2.value.length > 0,
        allowOverflow: (ctx2) => !!ctx2.allowOverflow,
        autoFocus: (ctx2) => !!ctx2.autoFocus,
        addOnBlur: (ctx2) => ctx2.blurBehavior === "add",
        clearOnBlur: (ctx2) => ctx2.blurBehavior === "clear",
        addOnPaste: (ctx2) => !!ctx2.addOnPaste,
        allowEditTag: (ctx2) => !!ctx2.allowEditTag,
        isInputCaretAtStart(ctx2) {
          const input = dom.getInputEl(ctx2);
          if (!input)
            return false;
          try {
            return input.selectionStart === 0 && input.selectionEnd === 0;
          } catch (e) {
            return input.value === "";
          }
        }
      },
      activities: {
        trackInteractOutside(ctx2, _evt, { send }) {
          return trackInteractOutside(dom.getInputEl(ctx2), {
            exclude(target) {
              return contains(dom.getRootEl(ctx2), target);
            },
            onFocusOutside: ctx2.onFocusOutside,
            onPointerDownOutside: ctx2.onPointerDownOutside,
            onInteractOutside(event) {
              ctx2.onInteractOutside?.(event);
              if (event.defaultPrevented)
                return;
              send({ type: "BLUR", src: "interact-outside" });
            }
          });
        },
        trackFormControlState(ctx2) {
          return trackFormControl(dom.getHiddenInputEl(ctx2), {
            onFieldsetDisabled() {
              ctx2.disabled = true;
            },
            onFormReset() {
              ctx2.value = ctx2.initialValue;
            }
          });
        },
        autoResize(ctx2) {
          if (!ctx2.editedTagValue || ctx2.idx == null || !ctx2.allowEditTag)
            return;
          const input = dom.getTagInputEl(ctx2, { value: ctx2.editedTagValue, index: ctx2.idx });
          return autoResizeInput(input);
        }
      },
      actions: {
        raiseAddTagEvent(_, __, { self }) {
          self.send("ADD_TAG");
        },
        raiseExternalBlurEvent(_, evt, { self }) {
          self.send({ type: "EXTERNAL_BLUR", id: evt.id });
        },
        invokeOnHighlight(ctx2) {
          const value = dom.getFocusedTagValue(ctx2);
          ctx2.onHighlight?.({ value });
        },
        invokeOnTagUpdate(ctx2) {
          if (!ctx2.idx)
            return;
          const value = ctx2.value[ctx2.idx];
          ctx2.onTagUpdate?.({ value, index: ctx2.idx });
        },
        invokeOnChange(ctx2) {
          ctx2.onChange?.({ values: ctx2.value });
        },
        dispatchChangeEvent(ctx2) {
          dom.dispatchInputEvent(ctx2);
        },
        setupDocument(ctx2) {
          ctx2.liveRegion = createLiveRegion({
            level: "assertive",
            document: dom.getDoc(ctx2)
          });
        },
        focusNextTag(ctx2) {
          if (!ctx2.focusedId)
            return;
          const next = dom.getNextEl(ctx2, ctx2.focusedId);
          if (next)
            ctx2.focusedId = next.id;
        },
        focusFirstTag(ctx2) {
          raf(() => {
            const first = dom.getFirstEl(ctx2)?.id;
            if (first)
              ctx2.focusedId = first;
          });
        },
        focusLastTag(ctx2) {
          const last = dom.getLastEl(ctx2);
          if (last)
            ctx2.focusedId = last.id;
        },
        focusPrevTag(ctx2) {
          if (!ctx2.focusedId)
            return;
          const prev = dom.getPrevEl(ctx2, ctx2.focusedId);
          ctx2.focusedId = prev?.id || null;
        },
        focusTag(ctx2, evt) {
          ctx2.focusedId = evt.id;
        },
        focusTagAtIndex(ctx2) {
          raf(() => {
            if (ctx2.idx == null)
              return;
            const el = dom.getElAtIndex(ctx2, ctx2.idx);
            if (el) {
              ctx2.focusedId = el.id;
              ctx2.idx = void 0;
            }
          });
        },
        deleteTag(ctx2, evt) {
          const index = dom.getIndexOfId(ctx2, evt.id);
          const value = ctx2.value[index];
          ctx2.log.prev = ctx2.log.current;
          ctx2.log.current = { type: "delete", value };
          ctx2.value.splice(index, 1);
        },
        deleteFocusedTag(ctx2) {
          if (!ctx2.focusedId)
            return;
          const index = dom.getIndexOfId(ctx2, ctx2.focusedId);
          ctx2.idx = index;
          const value = ctx2.value[index];
          ctx2.log.prev = ctx2.log.current;
          ctx2.log.current = { type: "delete", value };
          ctx2.value.splice(index, 1);
        },
        setEditedId(ctx2, evt) {
          ctx2.editedId = evt.id ?? ctx2.focusedId;
          ctx2.idx = dom.getIndexOfId(ctx2, ctx2.editedId);
        },
        clearEditedId(ctx2) {
          ctx2.editedId = null;
        },
        clearEditedTagValue(ctx2) {
          ctx2.editedTagValue = "";
        },
        setEditedTagValue(ctx2, evt) {
          ctx2.editedTagValue = evt.value;
        },
        submitEditedTagValue(ctx2) {
          if (!ctx2.editedId)
            return;
          const index = dom.getIndexOfId(ctx2, ctx2.editedId);
          ctx2.value[index] = ctx2.editedTagValue ?? "";
          ctx2.log.prev = ctx2.log.current;
          ctx2.log.current = { type: "update", value: ctx2.editedTagValue };
        },
        setValueAtIndex(ctx2, evt) {
          if (evt.value) {
            ctx2.value[evt.index] = evt.value;
            ctx2.log.prev = ctx2.log.current;
            ctx2.log.current = { type: "update", value: evt.value };
          } else {
            warn("You need to provide a value for the tag");
          }
        },
        initializeEditedTagValue(ctx2) {
          if (!ctx2.editedId)
            return;
          const index = dom.getIndexOfId(ctx2, ctx2.editedId);
          ctx2.editedTagValue = ctx2.value[index];
        },
        focusEditedTagInput(ctx2) {
          raf(() => {
            dom.getEditInputEl(ctx2)?.select();
          });
        },
        setInputValue(ctx2, evt) {
          ctx2.inputValue = evt.value;
        },
        clearFocusedId(ctx2) {
          ctx2.focusedId = null;
        },
        focusInput(ctx2) {
          raf(() => {
            dom.getInputEl(ctx2)?.focus();
          });
        },
        clearInputValue(ctx2) {
          ctx2.inputValue = "";
        },
        syncInputValue(ctx2) {
          const input = dom.getInputEl(ctx2);
          if (!input)
            return;
          input.value = ctx2.inputValue;
        },
        syncEditedTagValue(ctx2, evt) {
          const id = ctx2.editedId || ctx2.focusedId || evt.id;
          if (!id)
            return;
          const el = dom.getById(ctx2, `${id}:input`);
          if (!el)
            return;
          el.value = ctx2.editedTagValue;
        },
        addTag(ctx2, evt) {
          const value = evt.value ?? ctx2.trimmedInputValue;
          const guard = ctx2.validate?.({ inputValue: value, values: ctx2.value });
          if (guard) {
            ctx2.value.push(value);
            ctx2.log.prev = ctx2.log.current;
            ctx2.log.current = { type: "add", value };
          } else {
            ctx2.onInvalid?.({ reason: "invalidTag" });
          }
        },
        addTagFromPaste(ctx2) {
          raf(() => {
            const value = ctx2.trimmedInputValue;
            const guard = ctx2.validate?.({ inputValue: value, values: ctx2.value });
            if (guard) {
              const trimmedValue = ctx2.delimiter ? value.split(ctx2.delimiter).map((v) => v.trim()) : [value];
              ctx2.value.push(...trimmedValue);
              ctx2.log.prev = ctx2.log.current;
              ctx2.log.current = { type: "paste", values: trimmedValue };
            } else {
              ctx2.onInvalid?.({ reason: "invalidTag" });
            }
            ctx2.inputValue = "";
          });
        },
        clearTags(ctx2) {
          ctx2.value = [];
          ctx2.log.prev = ctx2.log.current;
          ctx2.log.current = { type: "clear" };
        },
        checkValue(ctx2) {
          ctx2.initialValue = ctx2.value.slice();
        },
        setValue(ctx2, evt) {
          ctx2.value = evt.value;
        },
        removeLiveRegion(ctx2) {
          ctx2.liveRegion?.destroy();
        },
        invokeOnInvalid(ctx2) {
          if (ctx2.isOverflowing) {
            ctx2.onInvalid?.({ reason: "rangeOverflow" });
          }
        },
        clearLog(ctx2) {
          ctx2.log = { prev: null, current: null };
        },
        logFocused(ctx2) {
          if (!ctx2.focusedId)
            return;
          const index = dom.getIndexOfId(ctx2, ctx2.focusedId);
          ctx2.log.prev = ctx2.log.current;
          ctx2.log.current = { type: "select", value: ctx2.value[index] };
        },
        // queue logs with screen reader and get it announced
        announceLog(ctx2) {
          if (!ctx2.log.current || ctx2.liveRegion == null)
            return;
          const region = ctx2.liveRegion;
          const { current, prev } = ctx2.log;
          let msg;
          switch (current.type) {
            case "add":
              msg = ctx2.translations.tagAdded(current.value);
              break;
            case "delete":
              msg = ctx2.translations.tagDeleted(current.value);
              break;
            case "update":
              msg = ctx2.translations.tagUpdated(current.value);
              break;
            case "paste":
              msg = ctx2.translations.tagsPasted(current.values);
              break;
            case "select":
              msg = ctx2.translations.tagSelected(current.value);
              if (prev?.type === "delete") {
                msg = `${ctx2.translations.tagDeleted(prev.value)}. ${msg}`;
              } else if (prev?.type === "update") {
                msg = `${ctx2.translations.tagUpdated(prev.value)}. ${msg}`;
              }
              break;
          }
          if (msg)
            region.announce(msg);
        }
      }
    }
  );
}

// src/prop-types.ts
function createNormalizer(fn) {
  return new Proxy({}, {
    get() {
      return fn;
    }
  });
}

var normalizeProps = createNormalizer((v) => v);
var useSafeLayoutEffect = typeof document !== "undefined" ? reactExports.useLayoutEffect : reactExports.useEffect;
var { use } = ReactExports;
function useSnapshot(proxyObject, options) {
  const notifyInSync = options?.sync;
  const lastSnapshot = reactExports.useRef();
  const lastAffected = reactExports.useRef();
  const currSnapshot = reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (callback) => {
        const unsub = subscribe(proxyObject, callback, notifyInSync);
        callback();
        return unsub;
      },
      [proxyObject, notifyInSync]
    ),
    () => {
      const nextSnapshot = snapshot(proxyObject, use);
      try {
        if (lastSnapshot.current && lastAffected.current && !p(lastSnapshot.current, nextSnapshot, lastAffected.current, /* @__PURE__ */ new WeakMap())) {
          return lastSnapshot.current;
        }
      } catch (e) {
      }
      return nextSnapshot;
    },
    () => snapshot(proxyObject, use)
  );
  const currAffected = /* @__PURE__ */ new WeakMap();
  reactExports.useEffect(() => {
    lastSnapshot.current = currSnapshot;
    lastAffected.current = currAffected;
  });
  const proxyCache = reactExports.useMemo(() => /* @__PURE__ */ new WeakMap(), []);
  return a(currSnapshot, currAffected, proxyCache);
}
function useConstant(fn) {
  const ref = reactExports.useRef();
  if (!ref.current)
    ref.current = { v: fn() };
  return ref.current.v;
}

// src/use-machine.ts
function useService(machine, options) {
  const { actions, state: hydratedState, context } = options ?? {};
  const service = useConstant(() => {
    const instance = typeof machine === "function" ? machine() : machine;
    return context ? instance.withContext(context) : instance;
  });
  useSafeLayoutEffect(() => {
    service.start(hydratedState);
    if (service.state.can("SETUP")) {
      service.send("SETUP");
    }
    return () => {
      service.stop();
    };
  }, []);
  service.setOptions({ actions });
  service.setContext(context);
  return service;
}
function useMachine(machine, options) {
  const service = useService(machine, options);
  const state = useSnapshot(service.state);
  const typedState = state;
  return [typedState, service.send, service];
}

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
function CcField({ field }) {
    const { label, value, name, error, description, id } = field;
    const initialValue = value
        ? value.split(",").map((email) => email.trim())
        : [];
    const [state, send] = useMachine(machine({
        id,
        value: initialValue,
        allowEditTag: false,
    }));
    const api = connect(state, send, normalizeProps);
    return (jsxRuntimeExports.jsxs(Field, { ...api.rootProps, children: [jsxRuntimeExports.jsx(Label$1, { ...api.labelProps, children: label }), description && jsxRuntimeExports.jsx(Hint, { children: description }), jsxRuntimeExports.jsxs(Control, { ...api.controlProps, validation: error ? "error" : undefined, children: [api.value.map((email, index) => (jsxRuntimeExports.jsxs("span", { children: [jsxRuntimeExports.jsxs(StyledTag, { ...api.getTagProps({ index, value: email }), size: "large", hue: EMAIL_REGEX.test(email) ? undefined : "red", children: [jsxRuntimeExports.jsx("span", { children: email }), jsxRuntimeExports.jsx(Tag.Close, { ...api.getTagDeleteTriggerProps({
                                            index,
                                            value: email,
                                        }) })] }), jsxRuntimeExports.jsx("input", { ...api.getTagInputProps({ index, value }) })] }, index))), jsxRuntimeExports.jsx(StyledInput, { isBare: true, ...api.inputProps })] }), error && jsxRuntimeExports.jsx(Message, { validation: "error", children: error }), api.value.map((email) => (jsxRuntimeExports.jsx("input", { type: "hidden", name: name, value: email }, email)))] }));
}
const Control = styled(FauxInput) `
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${(p) => p.theme.space.sm};
`;
const StyledInput = styled(Input) `
  width: revert;
  flex: 1;
`;
const StyledTag = styled(Tag) `
  ${(props) => focusStyles({
    theme: props.theme,
    shadowWidth: "sm",
    selector: "&[data-highlighted]",
})}
`;

export { CcField as default };
