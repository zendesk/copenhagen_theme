function _mergeNamespaces(n, m) {
	m.forEach(function (e) {
		e && typeof e !== 'string' && !Array.isArray(e) && Object.keys(e).forEach(function (k) {
			if (k !== 'default' && !(k in n)) {
				var d = Object.getOwnPropertyDescriptor(e, k);
				Object.defineProperty(n, k, d.get ? d : {
					enumerable: true,
					get: function () { return e[k]; }
				});
			}
		});
	});
	return Object.freeze(n);
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production_min = {};

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

var objectAssign;
var hasRequiredObjectAssign;

function requireObjectAssign () {
	if (hasRequiredObjectAssign) return objectAssign;
	hasRequiredObjectAssign = 1;
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};
	return objectAssign;
}

var react = {exports: {}};

var react_production_min = {};

/** @license React v17.0.2
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReact_production_min;

function requireReact_production_min () {
	if (hasRequiredReact_production_min) return react_production_min;
	hasRequiredReact_production_min = 1;
var l=requireObjectAssign(),n=60103,p=60106;react_production_min.Fragment=60107;react_production_min.StrictMode=60108;react_production_min.Profiler=60114;var q=60109,r=60110,t=60112;react_production_min.Suspense=60113;var u=60115,v=60116;
	if("function"===typeof Symbol&&Symbol.for){var w=Symbol.for;n=w("react.element");p=w("react.portal");react_production_min.Fragment=w("react.fragment");react_production_min.StrictMode=w("react.strict_mode");react_production_min.Profiler=w("react.profiler");q=w("react.provider");r=w("react.context");t=w("react.forward_ref");react_production_min.Suspense=w("react.suspense");u=w("react.memo");v=w("react.lazy");}var x="function"===typeof Symbol&&Symbol.iterator;
	function y(a){if(null===a||"object"!==typeof a)return null;a=x&&a[x]||a["@@iterator"];return "function"===typeof a?a:null}function z(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return "Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}
	var A={isMounted:function(){return !1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},B={};function C(a,b,c){this.props=a;this.context=b;this.refs=B;this.updater=c||A;}C.prototype.isReactComponent={};C.prototype.setState=function(a,b){if("object"!==typeof a&&"function"!==typeof a&&null!=a)throw Error(z(85));this.updater.enqueueSetState(this,a,b,"setState");};C.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate");};
	function D(){}D.prototype=C.prototype;function E(a,b,c){this.props=a;this.context=b;this.refs=B;this.updater=c||A;}var F=E.prototype=new D;F.constructor=E;l(F,C.prototype);F.isPureReactComponent=!0;var G={current:null},H=Object.prototype.hasOwnProperty,I={key:!0,ref:!0,__self:!0,__source:!0};
	function J(a,b,c){var e,d={},k=null,h=null;if(null!=b)for(e in void 0!==b.ref&&(h=b.ref),void 0!==b.key&&(k=""+b.key),b)H.call(b,e)&&!I.hasOwnProperty(e)&&(d[e]=b[e]);var g=arguments.length-2;if(1===g)d.children=c;else if(1<g){for(var f=Array(g),m=0;m<g;m++)f[m]=arguments[m+2];d.children=f;}if(a&&a.defaultProps)for(e in g=a.defaultProps,g)void 0===d[e]&&(d[e]=g[e]);return {$$typeof:n,type:a,key:k,ref:h,props:d,_owner:G.current}}
	function K(a,b){return {$$typeof:n,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}}function L(a){return "object"===typeof a&&null!==a&&a.$$typeof===n}function escape(a){var b={"=":"=0",":":"=2"};return "$"+a.replace(/[=:]/g,function(a){return b[a]})}var M=/\/+/g;function N(a,b){return "object"===typeof a&&null!==a&&null!=a.key?escape(""+a.key):b.toString(36)}
	function O(a,b,c,e,d){var k=typeof a;if("undefined"===k||"boolean"===k)a=null;var h=!1;if(null===a)h=!0;else switch(k){case "string":case "number":h=!0;break;case "object":switch(a.$$typeof){case n:case p:h=!0;}}if(h)return h=a,d=d(h),a=""===e?"."+N(h,0):e,Array.isArray(d)?(c="",null!=a&&(c=a.replace(M,"$&/")+"/"),O(d,b,c,"",function(a){return a})):null!=d&&(L(d)&&(d=K(d,c+(!d.key||h&&h.key===d.key?"":(""+d.key).replace(M,"$&/")+"/")+a)),b.push(d)),1;h=0;e=""===e?".":e+":";if(Array.isArray(a))for(var g=
	0;g<a.length;g++){k=a[g];var f=e+N(k,g);h+=O(k,b,c,f,d);}else if(f=y(a),"function"===typeof f)for(a=f.call(a),g=0;!(k=a.next()).done;)k=k.value,f=e+N(k,g++),h+=O(k,b,c,f,d);else if("object"===k)throw b=""+a,Error(z(31,"[object Object]"===b?"object with keys {"+Object.keys(a).join(", ")+"}":b));return h}function P(a,b,c){if(null==a)return a;var e=[],d=0;O(a,e,"","",function(a){return b.call(c,a,d++)});return e}
	function Q(a){if(-1===a._status){var b=a._result;b=b();a._status=0;a._result=b;b.then(function(b){0===a._status&&(b=b.default,a._status=1,a._result=b);},function(b){0===a._status&&(a._status=2,a._result=b);});}if(1===a._status)return a._result;throw a._result;}var R={current:null};function S(){var a=R.current;if(null===a)throw Error(z(321));return a}var T={ReactCurrentDispatcher:R,ReactCurrentBatchConfig:{transition:0},ReactCurrentOwner:G,IsSomeRendererActing:{current:!1},assign:l};
	react_production_min.Children={map:P,forEach:function(a,b,c){P(a,function(){b.apply(this,arguments);},c);},count:function(a){var b=0;P(a,function(){b++;});return b},toArray:function(a){return P(a,function(a){return a})||[]},only:function(a){if(!L(a))throw Error(z(143));return a}};react_production_min.Component=C;react_production_min.PureComponent=E;react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=T;
	react_production_min.cloneElement=function(a,b,c){if(null===a||void 0===a)throw Error(z(267,a));var e=l({},a.props),d=a.key,k=a.ref,h=a._owner;if(null!=b){void 0!==b.ref&&(k=b.ref,h=G.current);void 0!==b.key&&(d=""+b.key);if(a.type&&a.type.defaultProps)var g=a.type.defaultProps;for(f in b)H.call(b,f)&&!I.hasOwnProperty(f)&&(e[f]=void 0===b[f]&&void 0!==g?g[f]:b[f]);}var f=arguments.length-2;if(1===f)e.children=c;else if(1<f){g=Array(f);for(var m=0;m<f;m++)g[m]=arguments[m+2];e.children=g;}return {$$typeof:n,type:a.type,
	key:d,ref:k,props:e,_owner:h}};react_production_min.createContext=function(a,b){void 0===b&&(b=null);a={$$typeof:r,_calculateChangedBits:b,_currentValue:a,_currentValue2:a,_threadCount:0,Provider:null,Consumer:null};a.Provider={$$typeof:q,_context:a};return a.Consumer=a};react_production_min.createElement=J;react_production_min.createFactory=function(a){var b=J.bind(null,a);b.type=a;return b};react_production_min.createRef=function(){return {current:null}};react_production_min.forwardRef=function(a){return {$$typeof:t,render:a}};react_production_min.isValidElement=L;
	react_production_min.lazy=function(a){return {$$typeof:v,_payload:{_status:-1,_result:a},_init:Q}};react_production_min.memo=function(a,b){return {$$typeof:u,type:a,compare:void 0===b?null:b}};react_production_min.useCallback=function(a,b){return S().useCallback(a,b)};react_production_min.useContext=function(a,b){return S().useContext(a,b)};react_production_min.useDebugValue=function(){};react_production_min.useEffect=function(a,b){return S().useEffect(a,b)};react_production_min.useImperativeHandle=function(a,b,c){return S().useImperativeHandle(a,b,c)};
	react_production_min.useLayoutEffect=function(a,b){return S().useLayoutEffect(a,b)};react_production_min.useMemo=function(a,b){return S().useMemo(a,b)};react_production_min.useReducer=function(a,b,c){return S().useReducer(a,b,c)};react_production_min.useRef=function(a){return S().useRef(a)};react_production_min.useState=function(a){return S().useState(a)};react_production_min.version="17.0.2";
	return react_production_min;
}

{
  react.exports = requireReact_production_min();
}

var reactExports = react.exports;
var React__default = /*@__PURE__*/getDefaultExportFromCjs(reactExports);

var React = /*#__PURE__*/_mergeNamespaces({
	__proto__: null,
	default: React__default
}, [reactExports]);

/** @license React v17.0.2
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_production_min;

function requireReactJsxRuntime_production_min () {
	if (hasRequiredReactJsxRuntime_production_min) return reactJsxRuntime_production_min;
	hasRequiredReactJsxRuntime_production_min = 1;
requireObjectAssign();var f=reactExports,g=60103;reactJsxRuntime_production_min.Fragment=60107;if("function"===typeof Symbol&&Symbol.for){var h=Symbol.for;g=h("react.element");reactJsxRuntime_production_min.Fragment=h("react.fragment");}var m=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,n=Object.prototype.hasOwnProperty,p={key:!0,ref:!0,__self:!0,__source:!0};
	function q(c,a,k){var b,d={},e=null,l=null;void 0!==k&&(e=""+k);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(l=a.ref);for(b in a)n.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a)void 0===d[b]&&(d[b]=a[b]);return {$$typeof:g,type:c,key:e,ref:l,props:d,_owner:m.current}}reactJsxRuntime_production_min.jsx=q;reactJsxRuntime_production_min.jsxs=q;
	return reactJsxRuntime_production_min;
}

{
  jsxRuntime.exports = requireReactJsxRuntime_production_min();
}

var jsxRuntimeExports = jsxRuntime.exports;

var reactDom = {exports: {}};

var reactDom_production_min = {};

var scheduler = {exports: {}};

var scheduler_production_min = {};

/** @license React v0.20.2
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredScheduler_production_min;

function requireScheduler_production_min () {
	if (hasRequiredScheduler_production_min) return scheduler_production_min;
	hasRequiredScheduler_production_min = 1;
	(function (exports) {
var f,g,h,k;if("object"===typeof performance&&"function"===typeof performance.now){var l=performance;exports.unstable_now=function(){return l.now()};}else {var p=Date,q=p.now();exports.unstable_now=function(){return p.now()-q};}
		if("undefined"===typeof window||"function"!==typeof MessageChannel){var t=null,u=null,w=function(){if(null!==t)try{var a=exports.unstable_now();t(!0,a);t=null;}catch(b){throw setTimeout(w,0),b;}};f=function(a){null!==t?setTimeout(f,0,a):(t=a,setTimeout(w,0));};g=function(a,b){u=setTimeout(a,b);};h=function(){clearTimeout(u);};exports.unstable_shouldYield=function(){return !1};k=exports.unstable_forceFrameRate=function(){};}else {var x=window.setTimeout,y=window.clearTimeout;if("undefined"!==typeof console){var z=
		window.cancelAnimationFrame;"function"!==typeof window.requestAnimationFrame&&console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills");"function"!==typeof z&&console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills");}var A=!1,B=null,C=-1,D=5,E=0;exports.unstable_shouldYield=function(){return exports.unstable_now()>=
		E};k=function(){};exports.unstable_forceFrameRate=function(a){0>a||125<a?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):D=0<a?Math.floor(1E3/a):5;};var F=new MessageChannel,G=F.port2;F.port1.onmessage=function(){if(null!==B){var a=exports.unstable_now();E=a+D;try{B(!0,a)?G.postMessage(null):(A=!1,B=null);}catch(b){throw G.postMessage(null),b;}}else A=!1;};f=function(a){B=a;A||(A=!0,G.postMessage(null));};g=function(a,b){C=
		x(function(){a(exports.unstable_now());},b);};h=function(){y(C);C=-1;};}function H(a,b){var c=a.length;a.push(b);a:for(;;){var d=c-1>>>1,e=a[d];if(void 0!==e&&0<I(e,b))a[d]=b,a[c]=e,c=d;else break a}}function J(a){a=a[0];return void 0===a?null:a}
		function K(a){var b=a[0];if(void 0!==b){var c=a.pop();if(c!==b){a[0]=c;a:for(var d=0,e=a.length;d<e;){var m=2*(d+1)-1,n=a[m],v=m+1,r=a[v];if(void 0!==n&&0>I(n,c))void 0!==r&&0>I(r,n)?(a[d]=r,a[v]=c,d=v):(a[d]=n,a[m]=c,d=m);else if(void 0!==r&&0>I(r,c))a[d]=r,a[v]=c,d=v;else break a}}return b}return null}function I(a,b){var c=a.sortIndex-b.sortIndex;return 0!==c?c:a.id-b.id}var L=[],M=[],N=1,O=null,P=3,Q=!1,R=!1,S=!1;
		function T(a){for(var b=J(M);null!==b;){if(null===b.callback)K(M);else if(b.startTime<=a)K(M),b.sortIndex=b.expirationTime,H(L,b);else break;b=J(M);}}function U(a){S=!1;T(a);if(!R)if(null!==J(L))R=!0,f(V);else {var b=J(M);null!==b&&g(U,b.startTime-a);}}
		function V(a,b){R=!1;S&&(S=!1,h());Q=!0;var c=P;try{T(b);for(O=J(L);null!==O&&(!(O.expirationTime>b)||a&&!exports.unstable_shouldYield());){var d=O.callback;if("function"===typeof d){O.callback=null;P=O.priorityLevel;var e=d(O.expirationTime<=b);b=exports.unstable_now();"function"===typeof e?O.callback=e:O===J(L)&&K(L);T(b);}else K(L);O=J(L);}if(null!==O)var m=!0;else {var n=J(M);null!==n&&g(U,n.startTime-b);m=!1;}return m}finally{O=null,P=c,Q=!1;}}var W=k;exports.unstable_IdlePriority=5;
		exports.unstable_ImmediatePriority=1;exports.unstable_LowPriority=4;exports.unstable_NormalPriority=3;exports.unstable_Profiling=null;exports.unstable_UserBlockingPriority=2;exports.unstable_cancelCallback=function(a){a.callback=null;};exports.unstable_continueExecution=function(){R||Q||(R=!0,f(V));};exports.unstable_getCurrentPriorityLevel=function(){return P};exports.unstable_getFirstCallbackNode=function(){return J(L)};
		exports.unstable_next=function(a){switch(P){case 1:case 2:case 3:var b=3;break;default:b=P;}var c=P;P=b;try{return a()}finally{P=c;}};exports.unstable_pauseExecution=function(){};exports.unstable_requestPaint=W;exports.unstable_runWithPriority=function(a,b){switch(a){case 1:case 2:case 3:case 4:case 5:break;default:a=3;}var c=P;P=a;try{return b()}finally{P=c;}};
		exports.unstable_scheduleCallback=function(a,b,c){var d=exports.unstable_now();"object"===typeof c&&null!==c?(c=c.delay,c="number"===typeof c&&0<c?d+c:d):c=d;switch(a){case 1:var e=-1;break;case 2:e=250;break;case 5:e=1073741823;break;case 4:e=1E4;break;default:e=5E3;}e=c+e;a={id:N++,callback:b,priorityLevel:a,startTime:c,expirationTime:e,sortIndex:-1};c>d?(a.sortIndex=c,H(M,a),null===J(L)&&a===J(M)&&(S?h():S=!0,g(U,c-d))):(a.sortIndex=e,H(L,a),R||Q||(R=!0,f(V)));return a};
		exports.unstable_wrapCallback=function(a){var b=P;return function(){var c=P;P=b;try{return a.apply(this,arguments)}finally{P=c;}}}; 
	} (scheduler_production_min));
	return scheduler_production_min;
}

var hasRequiredScheduler;

function requireScheduler () {
	if (hasRequiredScheduler) return scheduler.exports;
	hasRequiredScheduler = 1;

	{
	  scheduler.exports = requireScheduler_production_min();
	}
	return scheduler.exports;
}

/** @license React v17.0.2
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactDom_production_min;

function requireReactDom_production_min () {
	if (hasRequiredReactDom_production_min) return reactDom_production_min;
	hasRequiredReactDom_production_min = 1;
var aa=reactExports,m=requireObjectAssign(),r=requireScheduler();function y(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return "Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}if(!aa)throw Error(y(227));var ba=new Set,ca={};function da(a,b){ea(a,b);ea(a+"Capture",b);}
	function ea(a,b){ca[a]=b;for(a=0;a<b.length;a++)ba.add(b[a]);}
	var fa=!("undefined"===typeof window||"undefined"===typeof window.document||"undefined"===typeof window.document.createElement),ha=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,ia=Object.prototype.hasOwnProperty,
	ja={},ka={};function la(a){if(ia.call(ka,a))return !0;if(ia.call(ja,a))return !1;if(ha.test(a))return ka[a]=!0;ja[a]=!0;return !1}function ma(a,b,c,d){if(null!==c&&0===c.type)return !1;switch(typeof b){case "function":case "symbol":return !0;case "boolean":if(d)return !1;if(null!==c)return !c.acceptsBooleans;a=a.toLowerCase().slice(0,5);return "data-"!==a&&"aria-"!==a;default:return !1}}
	function na(a,b,c,d){if(null===b||"undefined"===typeof b||ma(a,b,c,d))return !0;if(d)return !1;if(null!==c)switch(c.type){case 3:return !b;case 4:return !1===b;case 5:return isNaN(b);case 6:return isNaN(b)||1>b}return !1}function B(a,b,c,d,e,f,g){this.acceptsBooleans=2===b||3===b||4===b;this.attributeName=d;this.attributeNamespace=e;this.mustUseProperty=c;this.propertyName=a;this.type=b;this.sanitizeURL=f;this.removeEmptyString=g;}var D={};
	"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a){D[a]=new B(a,0,!1,a,null,!1,!1);});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(a){var b=a[0];D[b]=new B(b,1,!1,a[1],null,!1,!1);});["contentEditable","draggable","spellCheck","value"].forEach(function(a){D[a]=new B(a,2,!1,a.toLowerCase(),null,!1,!1);});
	["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(a){D[a]=new B(a,2,!1,a,null,!1,!1);});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a){D[a]=new B(a,3,!1,a.toLowerCase(),null,!1,!1);});
	["checked","multiple","muted","selected"].forEach(function(a){D[a]=new B(a,3,!0,a,null,!1,!1);});["capture","download"].forEach(function(a){D[a]=new B(a,4,!1,a,null,!1,!1);});["cols","rows","size","span"].forEach(function(a){D[a]=new B(a,6,!1,a,null,!1,!1);});["rowSpan","start"].forEach(function(a){D[a]=new B(a,5,!1,a.toLowerCase(),null,!1,!1);});var oa=/[\-:]([a-z])/g;function pa(a){return a[1].toUpperCase()}
	"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a){var b=a.replace(oa,
	pa);D[b]=new B(b,1,!1,a,null,!1,!1);});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a){var b=a.replace(oa,pa);D[b]=new B(b,1,!1,a,"http://www.w3.org/1999/xlink",!1,!1);});["xml:base","xml:lang","xml:space"].forEach(function(a){var b=a.replace(oa,pa);D[b]=new B(b,1,!1,a,"http://www.w3.org/XML/1998/namespace",!1,!1);});["tabIndex","crossOrigin"].forEach(function(a){D[a]=new B(a,1,!1,a.toLowerCase(),null,!1,!1);});
	D.xlinkHref=new B("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(a){D[a]=new B(a,1,!1,a.toLowerCase(),null,!0,!0);});
	function qa(a,b,c,d){var e=D.hasOwnProperty(b)?D[b]:null;var f=null!==e?0===e.type:d?!1:!(2<b.length)||"o"!==b[0]&&"O"!==b[0]||"n"!==b[1]&&"N"!==b[1]?!1:!0;f||(na(b,c,e,d)&&(c=null),d||null===e?la(b)&&(null===c?a.removeAttribute(b):a.setAttribute(b,""+c)):e.mustUseProperty?a[e.propertyName]=null===c?3===e.type?!1:"":c:(b=e.attributeName,d=e.attributeNamespace,null===c?a.removeAttribute(b):(e=e.type,c=3===e||4===e&&!0===c?"":""+c,d?a.setAttributeNS(d,b,c):a.setAttribute(b,c))));}
	var ra=aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,sa=60103,ta=60106,ua=60107,wa=60108,xa=60114,ya=60109,za=60110,Aa=60112,Ba=60113,Ca=60120,Da=60115,Ea=60116,Fa=60121,Ga=60128,Ha=60129,Ia=60130,Ja=60131;
	if("function"===typeof Symbol&&Symbol.for){var E=Symbol.for;sa=E("react.element");ta=E("react.portal");ua=E("react.fragment");wa=E("react.strict_mode");xa=E("react.profiler");ya=E("react.provider");za=E("react.context");Aa=E("react.forward_ref");Ba=E("react.suspense");Ca=E("react.suspense_list");Da=E("react.memo");Ea=E("react.lazy");Fa=E("react.block");E("react.scope");Ga=E("react.opaque.id");Ha=E("react.debug_trace_mode");Ia=E("react.offscreen");Ja=E("react.legacy_hidden");}
	var Ka="function"===typeof Symbol&&Symbol.iterator;function La(a){if(null===a||"object"!==typeof a)return null;a=Ka&&a[Ka]||a["@@iterator"];return "function"===typeof a?a:null}var Ma;function Na(a){if(void 0===Ma)try{throw Error();}catch(c){var b=c.stack.trim().match(/\n( *(at )?)/);Ma=b&&b[1]||"";}return "\n"+Ma+a}var Oa=!1;
	function Pa(a,b){if(!a||Oa)return "";Oa=!0;var c=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(b)if(b=function(){throw Error();},Object.defineProperty(b.prototype,"props",{set:function(){throw Error();}}),"object"===typeof Reflect&&Reflect.construct){try{Reflect.construct(b,[]);}catch(k){var d=k;}Reflect.construct(a,[],b);}else {try{b.call();}catch(k){d=k;}a.call(b.prototype);}else {try{throw Error();}catch(k){d=k;}a();}}catch(k){if(k&&d&&"string"===typeof k.stack){for(var e=k.stack.split("\n"),
	f=d.stack.split("\n"),g=e.length-1,h=f.length-1;1<=g&&0<=h&&e[g]!==f[h];)h--;for(;1<=g&&0<=h;g--,h--)if(e[g]!==f[h]){if(1!==g||1!==h){do if(g--,h--,0>h||e[g]!==f[h])return "\n"+e[g].replace(" at new "," at ");while(1<=g&&0<=h)}break}}}finally{Oa=!1,Error.prepareStackTrace=c;}return (a=a?a.displayName||a.name:"")?Na(a):""}
	function Qa(a){switch(a.tag){case 5:return Na(a.type);case 16:return Na("Lazy");case 13:return Na("Suspense");case 19:return Na("SuspenseList");case 0:case 2:case 15:return a=Pa(a.type,!1),a;case 11:return a=Pa(a.type.render,!1),a;case 22:return a=Pa(a.type._render,!1),a;case 1:return a=Pa(a.type,!0),a;default:return ""}}
	function Ra(a){if(null==a)return null;if("function"===typeof a)return a.displayName||a.name||null;if("string"===typeof a)return a;switch(a){case ua:return "Fragment";case ta:return "Portal";case xa:return "Profiler";case wa:return "StrictMode";case Ba:return "Suspense";case Ca:return "SuspenseList"}if("object"===typeof a)switch(a.$$typeof){case za:return (a.displayName||"Context")+".Consumer";case ya:return (a._context.displayName||"Context")+".Provider";case Aa:var b=a.render;b=b.displayName||b.name||"";
	return a.displayName||(""!==b?"ForwardRef("+b+")":"ForwardRef");case Da:return Ra(a.type);case Fa:return Ra(a._render);case Ea:b=a._payload;a=a._init;try{return Ra(a(b))}catch(c){}}return null}function Sa(a){switch(typeof a){case "boolean":case "number":case "object":case "string":case "undefined":return a;default:return ""}}function Ta(a){var b=a.type;return (a=a.nodeName)&&"input"===a.toLowerCase()&&("checkbox"===b||"radio"===b)}
	function Ua(a){var b=Ta(a)?"checked":"value",c=Object.getOwnPropertyDescriptor(a.constructor.prototype,b),d=""+a[b];if(!a.hasOwnProperty(b)&&"undefined"!==typeof c&&"function"===typeof c.get&&"function"===typeof c.set){var e=c.get,f=c.set;Object.defineProperty(a,b,{configurable:!0,get:function(){return e.call(this)},set:function(a){d=""+a;f.call(this,a);}});Object.defineProperty(a,b,{enumerable:c.enumerable});return {getValue:function(){return d},setValue:function(a){d=""+a;},stopTracking:function(){a._valueTracker=
	null;delete a[b];}}}}function Va(a){a._valueTracker||(a._valueTracker=Ua(a));}function Wa(a){if(!a)return !1;var b=a._valueTracker;if(!b)return !0;var c=b.getValue();var d="";a&&(d=Ta(a)?a.checked?"true":"false":a.value);a=d;return a!==c?(b.setValue(a),!0):!1}function Xa(a){a=a||("undefined"!==typeof document?document:void 0);if("undefined"===typeof a)return null;try{return a.activeElement||a.body}catch(b){return a.body}}
	function Ya(a,b){var c=b.checked;return m({},b,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:null!=c?c:a._wrapperState.initialChecked})}function Za(a,b){var c=null==b.defaultValue?"":b.defaultValue,d=null!=b.checked?b.checked:b.defaultChecked;c=Sa(null!=b.value?b.value:c);a._wrapperState={initialChecked:d,initialValue:c,controlled:"checkbox"===b.type||"radio"===b.type?null!=b.checked:null!=b.value};}function $a(a,b){b=b.checked;null!=b&&qa(a,"checked",b,!1);}
	function ab(a,b){$a(a,b);var c=Sa(b.value),d=b.type;if(null!=c)if("number"===d){if(0===c&&""===a.value||a.value!=c)a.value=""+c;}else a.value!==""+c&&(a.value=""+c);else if("submit"===d||"reset"===d){a.removeAttribute("value");return}b.hasOwnProperty("value")?bb(a,b.type,c):b.hasOwnProperty("defaultValue")&&bb(a,b.type,Sa(b.defaultValue));null==b.checked&&null!=b.defaultChecked&&(a.defaultChecked=!!b.defaultChecked);}
	function cb(a,b,c){if(b.hasOwnProperty("value")||b.hasOwnProperty("defaultValue")){var d=b.type;if(!("submit"!==d&&"reset"!==d||void 0!==b.value&&null!==b.value))return;b=""+a._wrapperState.initialValue;c||b===a.value||(a.value=b);a.defaultValue=b;}c=a.name;""!==c&&(a.name="");a.defaultChecked=!!a._wrapperState.initialChecked;""!==c&&(a.name=c);}
	function bb(a,b,c){if("number"!==b||Xa(a.ownerDocument)!==a)null==c?a.defaultValue=""+a._wrapperState.initialValue:a.defaultValue!==""+c&&(a.defaultValue=""+c);}function db(a){var b="";aa.Children.forEach(a,function(a){null!=a&&(b+=a);});return b}function eb(a,b){a=m({children:void 0},b);if(b=db(b.children))a.children=b;return a}
	function fb(a,b,c,d){a=a.options;if(b){b={};for(var e=0;e<c.length;e++)b["$"+c[e]]=!0;for(c=0;c<a.length;c++)e=b.hasOwnProperty("$"+a[c].value),a[c].selected!==e&&(a[c].selected=e),e&&d&&(a[c].defaultSelected=!0);}else {c=""+Sa(c);b=null;for(e=0;e<a.length;e++){if(a[e].value===c){a[e].selected=!0;d&&(a[e].defaultSelected=!0);return}null!==b||a[e].disabled||(b=a[e]);}null!==b&&(b.selected=!0);}}
	function gb(a,b){if(null!=b.dangerouslySetInnerHTML)throw Error(y(91));return m({},b,{value:void 0,defaultValue:void 0,children:""+a._wrapperState.initialValue})}function hb(a,b){var c=b.value;if(null==c){c=b.children;b=b.defaultValue;if(null!=c){if(null!=b)throw Error(y(92));if(Array.isArray(c)){if(!(1>=c.length))throw Error(y(93));c=c[0];}b=c;}null==b&&(b="");c=b;}a._wrapperState={initialValue:Sa(c)};}
	function ib(a,b){var c=Sa(b.value),d=Sa(b.defaultValue);null!=c&&(c=""+c,c!==a.value&&(a.value=c),null==b.defaultValue&&a.defaultValue!==c&&(a.defaultValue=c));null!=d&&(a.defaultValue=""+d);}function jb(a){var b=a.textContent;b===a._wrapperState.initialValue&&""!==b&&null!==b&&(a.value=b);}var kb={html:"http://www.w3.org/1999/xhtml",mathml:"http://www.w3.org/1998/Math/MathML",svg:"http://www.w3.org/2000/svg"};
	function lb(a){switch(a){case "svg":return "http://www.w3.org/2000/svg";case "math":return "http://www.w3.org/1998/Math/MathML";default:return "http://www.w3.org/1999/xhtml"}}function mb(a,b){return null==a||"http://www.w3.org/1999/xhtml"===a?lb(b):"http://www.w3.org/2000/svg"===a&&"foreignObject"===b?"http://www.w3.org/1999/xhtml":a}
	var nb,ob=function(a){return "undefined"!==typeof MSApp&&MSApp.execUnsafeLocalFunction?function(b,c,d,e){MSApp.execUnsafeLocalFunction(function(){return a(b,c,d,e)});}:a}(function(a,b){if(a.namespaceURI!==kb.svg||"innerHTML"in a)a.innerHTML=b;else {nb=nb||document.createElement("div");nb.innerHTML="<svg>"+b.valueOf().toString()+"</svg>";for(b=nb.firstChild;a.firstChild;)a.removeChild(a.firstChild);for(;b.firstChild;)a.appendChild(b.firstChild);}});
	function pb(a,b){if(b){var c=a.firstChild;if(c&&c===a.lastChild&&3===c.nodeType){c.nodeValue=b;return}}a.textContent=b;}
	var qb={animationIterationCount:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,
	floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},rb=["Webkit","ms","Moz","O"];Object.keys(qb).forEach(function(a){rb.forEach(function(b){b=b+a.charAt(0).toUpperCase()+a.substring(1);qb[b]=qb[a];});});function sb(a,b,c){return null==b||"boolean"===typeof b||""===b?"":c||"number"!==typeof b||0===b||qb.hasOwnProperty(a)&&qb[a]?(""+b).trim():b+"px"}
	function tb(a,b){a=a.style;for(var c in b)if(b.hasOwnProperty(c)){var d=0===c.indexOf("--"),e=sb(c,b[c],d);"float"===c&&(c="cssFloat");d?a.setProperty(c,e):a[c]=e;}}var ub=m({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});
	function vb(a,b){if(b){if(ub[a]&&(null!=b.children||null!=b.dangerouslySetInnerHTML))throw Error(y(137,a));if(null!=b.dangerouslySetInnerHTML){if(null!=b.children)throw Error(y(60));if(!("object"===typeof b.dangerouslySetInnerHTML&&"__html"in b.dangerouslySetInnerHTML))throw Error(y(61));}if(null!=b.style&&"object"!==typeof b.style)throw Error(y(62));}}
	function wb(a,b){if(-1===a.indexOf("-"))return "string"===typeof b.is;switch(a){case "annotation-xml":case "color-profile":case "font-face":case "font-face-src":case "font-face-uri":case "font-face-format":case "font-face-name":case "missing-glyph":return !1;default:return !0}}function xb(a){a=a.target||a.srcElement||window;a.correspondingUseElement&&(a=a.correspondingUseElement);return 3===a.nodeType?a.parentNode:a}var yb=null,zb=null,Ab=null;
	function Bb(a){if(a=Cb(a)){if("function"!==typeof yb)throw Error(y(280));var b=a.stateNode;b&&(b=Db(b),yb(a.stateNode,a.type,b));}}function Eb(a){zb?Ab?Ab.push(a):Ab=[a]:zb=a;}function Fb(){if(zb){var a=zb,b=Ab;Ab=zb=null;Bb(a);if(b)for(a=0;a<b.length;a++)Bb(b[a]);}}function Gb(a,b){return a(b)}function Hb(a,b,c,d,e){return a(b,c,d,e)}function Ib(){}var Jb=Gb,Kb=!1,Lb=!1;function Mb(){if(null!==zb||null!==Ab)Ib(),Fb();}
	function Nb(a,b,c){if(Lb)return a(b,c);Lb=!0;try{return Jb(a,b,c)}finally{Lb=!1,Mb();}}
	function Ob(a,b){var c=a.stateNode;if(null===c)return null;var d=Db(c);if(null===d)return null;c=d[b];a:switch(b){case "onClick":case "onClickCapture":case "onDoubleClick":case "onDoubleClickCapture":case "onMouseDown":case "onMouseDownCapture":case "onMouseMove":case "onMouseMoveCapture":case "onMouseUp":case "onMouseUpCapture":case "onMouseEnter":(d=!d.disabled)||(a=a.type,d=!("button"===a||"input"===a||"select"===a||"textarea"===a));a=!d;break a;default:a=!1;}if(a)return null;if(c&&"function"!==
	typeof c)throw Error(y(231,b,typeof c));return c}var Pb=!1;if(fa)try{var Qb={};Object.defineProperty(Qb,"passive",{get:function(){Pb=!0;}});window.addEventListener("test",Qb,Qb);window.removeEventListener("test",Qb,Qb);}catch(a){Pb=!1;}function Rb(a,b,c,d,e,f,g,h,k){var l=Array.prototype.slice.call(arguments,3);try{b.apply(c,l);}catch(n){this.onError(n);}}var Sb=!1,Tb=null,Ub=!1,Vb=null,Wb={onError:function(a){Sb=!0;Tb=a;}};function Xb(a,b,c,d,e,f,g,h,k){Sb=!1;Tb=null;Rb.apply(Wb,arguments);}
	function Yb(a,b,c,d,e,f,g,h,k){Xb.apply(this,arguments);if(Sb){if(Sb){var l=Tb;Sb=!1;Tb=null;}else throw Error(y(198));Ub||(Ub=!0,Vb=l);}}function Zb(a){var b=a,c=a;if(a.alternate)for(;b.return;)b=b.return;else {a=b;do b=a,0!==(b.flags&1026)&&(c=b.return),a=b.return;while(a)}return 3===b.tag?c:null}function $b(a){if(13===a.tag){var b=a.memoizedState;null===b&&(a=a.alternate,null!==a&&(b=a.memoizedState));if(null!==b)return b.dehydrated}return null}function ac(a){if(Zb(a)!==a)throw Error(y(188));}
	function bc(a){var b=a.alternate;if(!b){b=Zb(a);if(null===b)throw Error(y(188));return b!==a?null:a}for(var c=a,d=b;;){var e=c.return;if(null===e)break;var f=e.alternate;if(null===f){d=e.return;if(null!==d){c=d;continue}break}if(e.child===f.child){for(f=e.child;f;){if(f===c)return ac(e),a;if(f===d)return ac(e),b;f=f.sibling;}throw Error(y(188));}if(c.return!==d.return)c=e,d=f;else {for(var g=!1,h=e.child;h;){if(h===c){g=!0;c=e;d=f;break}if(h===d){g=!0;d=e;c=f;break}h=h.sibling;}if(!g){for(h=f.child;h;){if(h===
	c){g=!0;c=f;d=e;break}if(h===d){g=!0;d=f;c=e;break}h=h.sibling;}if(!g)throw Error(y(189));}}if(c.alternate!==d)throw Error(y(190));}if(3!==c.tag)throw Error(y(188));return c.stateNode.current===c?a:b}function cc(a){a=bc(a);if(!a)return null;for(var b=a;;){if(5===b.tag||6===b.tag)return b;if(b.child)b.child.return=b,b=b.child;else {if(b===a)break;for(;!b.sibling;){if(!b.return||b.return===a)return null;b=b.return;}b.sibling.return=b.return;b=b.sibling;}}return null}
	function dc(a,b){for(var c=a.alternate;null!==b;){if(b===a||b===c)return !0;b=b.return;}return !1}var ec,fc,gc,hc,ic=!1,jc=[],kc=null,lc=null,mc=null,nc=new Map,oc=new Map,pc=[],qc="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
	function rc(a,b,c,d,e){return {blockedOn:a,domEventName:b,eventSystemFlags:c|16,nativeEvent:e,targetContainers:[d]}}function sc(a,b){switch(a){case "focusin":case "focusout":kc=null;break;case "dragenter":case "dragleave":lc=null;break;case "mouseover":case "mouseout":mc=null;break;case "pointerover":case "pointerout":nc.delete(b.pointerId);break;case "gotpointercapture":case "lostpointercapture":oc.delete(b.pointerId);}}
	function tc(a,b,c,d,e,f){if(null===a||a.nativeEvent!==f)return a=rc(b,c,d,e,f),null!==b&&(b=Cb(b),null!==b&&fc(b)),a;a.eventSystemFlags|=d;b=a.targetContainers;null!==e&&-1===b.indexOf(e)&&b.push(e);return a}
	function uc(a,b,c,d,e){switch(b){case "focusin":return kc=tc(kc,a,b,c,d,e),!0;case "dragenter":return lc=tc(lc,a,b,c,d,e),!0;case "mouseover":return mc=tc(mc,a,b,c,d,e),!0;case "pointerover":var f=e.pointerId;nc.set(f,tc(nc.get(f)||null,a,b,c,d,e));return !0;case "gotpointercapture":return f=e.pointerId,oc.set(f,tc(oc.get(f)||null,a,b,c,d,e)),!0}return !1}
	function vc(a){var b=wc(a.target);if(null!==b){var c=Zb(b);if(null!==c)if(b=c.tag,13===b){if(b=$b(c),null!==b){a.blockedOn=b;hc(a.lanePriority,function(){r.unstable_runWithPriority(a.priority,function(){gc(c);});});return}}else if(3===b&&c.stateNode.hydrate){a.blockedOn=3===c.tag?c.stateNode.containerInfo:null;return}}a.blockedOn=null;}
	function xc(a){if(null!==a.blockedOn)return !1;for(var b=a.targetContainers;0<b.length;){var c=yc(a.domEventName,a.eventSystemFlags,b[0],a.nativeEvent);if(null!==c)return b=Cb(c),null!==b&&fc(b),a.blockedOn=c,!1;b.shift();}return !0}function zc(a,b,c){xc(a)&&c.delete(b);}
	function Ac(){for(ic=!1;0<jc.length;){var a=jc[0];if(null!==a.blockedOn){a=Cb(a.blockedOn);null!==a&&ec(a);break}for(var b=a.targetContainers;0<b.length;){var c=yc(a.domEventName,a.eventSystemFlags,b[0],a.nativeEvent);if(null!==c){a.blockedOn=c;break}b.shift();}null===a.blockedOn&&jc.shift();}null!==kc&&xc(kc)&&(kc=null);null!==lc&&xc(lc)&&(lc=null);null!==mc&&xc(mc)&&(mc=null);nc.forEach(zc);oc.forEach(zc);}
	function Bc(a,b){a.blockedOn===b&&(a.blockedOn=null,ic||(ic=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,Ac)));}
	function Cc(a){function b(b){return Bc(b,a)}if(0<jc.length){Bc(jc[0],a);for(var c=1;c<jc.length;c++){var d=jc[c];d.blockedOn===a&&(d.blockedOn=null);}}null!==kc&&Bc(kc,a);null!==lc&&Bc(lc,a);null!==mc&&Bc(mc,a);nc.forEach(b);oc.forEach(b);for(c=0;c<pc.length;c++)d=pc[c],d.blockedOn===a&&(d.blockedOn=null);for(;0<pc.length&&(c=pc[0],null===c.blockedOn);)vc(c),null===c.blockedOn&&pc.shift();}
	function Dc(a,b){var c={};c[a.toLowerCase()]=b.toLowerCase();c["Webkit"+a]="webkit"+b;c["Moz"+a]="moz"+b;return c}var Ec={animationend:Dc("Animation","AnimationEnd"),animationiteration:Dc("Animation","AnimationIteration"),animationstart:Dc("Animation","AnimationStart"),transitionend:Dc("Transition","TransitionEnd")},Fc={},Gc={};
	fa&&(Gc=document.createElement("div").style,"AnimationEvent"in window||(delete Ec.animationend.animation,delete Ec.animationiteration.animation,delete Ec.animationstart.animation),"TransitionEvent"in window||delete Ec.transitionend.transition);function Hc(a){if(Fc[a])return Fc[a];if(!Ec[a])return a;var b=Ec[a],c;for(c in b)if(b.hasOwnProperty(c)&&c in Gc)return Fc[a]=b[c];return a}
	var Ic=Hc("animationend"),Jc=Hc("animationiteration"),Kc=Hc("animationstart"),Lc=Hc("transitionend"),Mc=new Map,Nc=new Map,Oc=["abort","abort",Ic,"animationEnd",Jc,"animationIteration",Kc,"animationStart","canplay","canPlay","canplaythrough","canPlayThrough","durationchange","durationChange","emptied","emptied","encrypted","encrypted","ended","ended","error","error","gotpointercapture","gotPointerCapture","load","load","loadeddata","loadedData","loadedmetadata","loadedMetadata","loadstart","loadStart",
	"lostpointercapture","lostPointerCapture","playing","playing","progress","progress","seeking","seeking","stalled","stalled","suspend","suspend","timeupdate","timeUpdate",Lc,"transitionEnd","waiting","waiting"];function Pc(a,b){for(var c=0;c<a.length;c+=2){var d=a[c],e=a[c+1];e="on"+(e[0].toUpperCase()+e.slice(1));Nc.set(d,b);Mc.set(d,e);da(e,[d]);}}var Qc=r.unstable_now;Qc();var F=8;
	function Rc(a){if(0!==(1&a))return F=15,1;if(0!==(2&a))return F=14,2;if(0!==(4&a))return F=13,4;var b=24&a;if(0!==b)return F=12,b;if(0!==(a&32))return F=11,32;b=192&a;if(0!==b)return F=10,b;if(0!==(a&256))return F=9,256;b=3584&a;if(0!==b)return F=8,b;if(0!==(a&4096))return F=7,4096;b=4186112&a;if(0!==b)return F=6,b;b=62914560&a;if(0!==b)return F=5,b;if(a&67108864)return F=4,67108864;if(0!==(a&134217728))return F=3,134217728;b=805306368&a;if(0!==b)return F=2,b;if(0!==(1073741824&a))return F=1,1073741824;
	F=8;return a}function Sc(a){switch(a){case 99:return 15;case 98:return 10;case 97:case 96:return 8;case 95:return 2;default:return 0}}function Tc(a){switch(a){case 15:case 14:return 99;case 13:case 12:case 11:case 10:return 98;case 9:case 8:case 7:case 6:case 4:case 5:return 97;case 3:case 2:case 1:return 95;case 0:return 90;default:throw Error(y(358,a));}}
	function Uc(a,b){var c=a.pendingLanes;if(0===c)return F=0;var d=0,e=0,f=a.expiredLanes,g=a.suspendedLanes,h=a.pingedLanes;if(0!==f)d=f,e=F=15;else if(f=c&134217727,0!==f){var k=f&~g;0!==k?(d=Rc(k),e=F):(h&=f,0!==h&&(d=Rc(h),e=F));}else f=c&~g,0!==f?(d=Rc(f),e=F):0!==h&&(d=Rc(h),e=F);if(0===d)return 0;d=31-Vc(d);d=c&((0>d?0:1<<d)<<1)-1;if(0!==b&&b!==d&&0===(b&g)){Rc(b);if(e<=F)return b;F=e;}b=a.entangledLanes;if(0!==b)for(a=a.entanglements,b&=d;0<b;)c=31-Vc(b),e=1<<c,d|=a[c],b&=~e;return d}
	function Wc(a){a=a.pendingLanes&-1073741825;return 0!==a?a:a&1073741824?1073741824:0}function Xc(a,b){switch(a){case 15:return 1;case 14:return 2;case 12:return a=Yc(24&~b),0===a?Xc(10,b):a;case 10:return a=Yc(192&~b),0===a?Xc(8,b):a;case 8:return a=Yc(3584&~b),0===a&&(a=Yc(4186112&~b),0===a&&(a=512)),a;case 2:return b=Yc(805306368&~b),0===b&&(b=268435456),b}throw Error(y(358,a));}function Yc(a){return a&-a}function Zc(a){for(var b=[],c=0;31>c;c++)b.push(a);return b}
	function $c(a,b,c){a.pendingLanes|=b;var d=b-1;a.suspendedLanes&=d;a.pingedLanes&=d;a=a.eventTimes;b=31-Vc(b);a[b]=c;}var Vc=Math.clz32?Math.clz32:ad,bd=Math.log,cd=Math.LN2;function ad(a){return 0===a?32:31-(bd(a)/cd|0)|0}var dd=r.unstable_UserBlockingPriority,ed=r.unstable_runWithPriority,fd=!0;function gd(a,b,c,d){Kb||Ib();var e=hd,f=Kb;Kb=!0;try{Hb(e,a,b,c,d);}finally{(Kb=f)||Mb();}}function id(a,b,c,d){ed(dd,hd.bind(null,a,b,c,d));}
	function hd(a,b,c,d){if(fd){var e;if((e=0===(b&4))&&0<jc.length&&-1<qc.indexOf(a))a=rc(null,a,b,c,d),jc.push(a);else {var f=yc(a,b,c,d);if(null===f)e&&sc(a,d);else {if(e){if(-1<qc.indexOf(a)){a=rc(f,a,b,c,d);jc.push(a);return}if(uc(f,a,b,c,d))return;sc(a,d);}jd(a,b,d,null,c);}}}}
	function yc(a,b,c,d){var e=xb(d);e=wc(e);if(null!==e){var f=Zb(e);if(null===f)e=null;else {var g=f.tag;if(13===g){e=$b(f);if(null!==e)return e;e=null;}else if(3===g){if(f.stateNode.hydrate)return 3===f.tag?f.stateNode.containerInfo:null;e=null;}else f!==e&&(e=null);}}jd(a,b,d,e,c);return null}var kd=null,ld=null,md=null;
	function nd(){if(md)return md;var a,b=ld,c=b.length,d,e="value"in kd?kd.value:kd.textContent,f=e.length;for(a=0;a<c&&b[a]===e[a];a++);var g=c-a;for(d=1;d<=g&&b[c-d]===e[f-d];d++);return md=e.slice(a,1<d?1-d:void 0)}function od(a){var b=a.keyCode;"charCode"in a?(a=a.charCode,0===a&&13===b&&(a=13)):a=b;10===a&&(a=13);return 32<=a||13===a?a:0}function pd(){return !0}function qd(){return !1}
	function rd(a){function b(b,d,e,f,g){this._reactName=b;this._targetInst=e;this.type=d;this.nativeEvent=f;this.target=g;this.currentTarget=null;for(var c in a)a.hasOwnProperty(c)&&(b=a[c],this[c]=b?b(f):f[c]);this.isDefaultPrevented=(null!=f.defaultPrevented?f.defaultPrevented:!1===f.returnValue)?pd:qd;this.isPropagationStopped=qd;return this}m(b.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():"unknown"!==typeof a.returnValue&&
	(a.returnValue=!1),this.isDefaultPrevented=pd);},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():"unknown"!==typeof a.cancelBubble&&(a.cancelBubble=!0),this.isPropagationStopped=pd);},persist:function(){},isPersistent:pd});return b}
	var sd={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(a){return a.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},td=rd(sd),ud=m({},sd,{view:0,detail:0}),vd=rd(ud),wd,xd,yd,Ad=m({},ud,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:zd,button:0,buttons:0,relatedTarget:function(a){return void 0===a.relatedTarget?a.fromElement===a.srcElement?a.toElement:a.fromElement:a.relatedTarget},movementX:function(a){if("movementX"in
	a)return a.movementX;a!==yd&&(yd&&"mousemove"===a.type?(wd=a.screenX-yd.screenX,xd=a.screenY-yd.screenY):xd=wd=0,yd=a);return wd},movementY:function(a){return "movementY"in a?a.movementY:xd}}),Bd=rd(Ad),Cd=m({},Ad,{dataTransfer:0}),Dd=rd(Cd),Ed=m({},ud,{relatedTarget:0}),Fd=rd(Ed),Gd=m({},sd,{animationName:0,elapsedTime:0,pseudoElement:0}),Hd=rd(Gd),Id=m({},sd,{clipboardData:function(a){return "clipboardData"in a?a.clipboardData:window.clipboardData}}),Jd=rd(Id),Kd=m({},sd,{data:0}),Ld=rd(Kd),Md={Esc:"Escape",
	Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Nd={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",
	119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Od={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Pd(a){var b=this.nativeEvent;return b.getModifierState?b.getModifierState(a):(a=Od[a])?!!b[a]:!1}function zd(){return Pd}
	var Qd=m({},ud,{key:function(a){if(a.key){var b=Md[a.key]||a.key;if("Unidentified"!==b)return b}return "keypress"===a.type?(a=od(a),13===a?"Enter":String.fromCharCode(a)):"keydown"===a.type||"keyup"===a.type?Nd[a.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:zd,charCode:function(a){return "keypress"===a.type?od(a):0},keyCode:function(a){return "keydown"===a.type||"keyup"===a.type?a.keyCode:0},which:function(a){return "keypress"===
	a.type?od(a):"keydown"===a.type||"keyup"===a.type?a.keyCode:0}}),Rd=rd(Qd),Sd=m({},Ad,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Td=rd(Sd),Ud=m({},ud,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:zd}),Vd=rd(Ud),Wd=m({},sd,{propertyName:0,elapsedTime:0,pseudoElement:0}),Xd=rd(Wd),Yd=m({},Ad,{deltaX:function(a){return "deltaX"in a?a.deltaX:"wheelDeltaX"in a?-a.wheelDeltaX:0},
	deltaY:function(a){return "deltaY"in a?a.deltaY:"wheelDeltaY"in a?-a.wheelDeltaY:"wheelDelta"in a?-a.wheelDelta:0},deltaZ:0,deltaMode:0}),Zd=rd(Yd),$d=[9,13,27,32],ae=fa&&"CompositionEvent"in window,be=null;fa&&"documentMode"in document&&(be=document.documentMode);var ce=fa&&"TextEvent"in window&&!be,de=fa&&(!ae||be&&8<be&&11>=be),ee=String.fromCharCode(32),fe=!1;
	function ge(a,b){switch(a){case "keyup":return -1!==$d.indexOf(b.keyCode);case "keydown":return 229!==b.keyCode;case "keypress":case "mousedown":case "focusout":return !0;default:return !1}}function he(a){a=a.detail;return "object"===typeof a&&"data"in a?a.data:null}var ie=!1;function je(a,b){switch(a){case "compositionend":return he(b);case "keypress":if(32!==b.which)return null;fe=!0;return ee;case "textInput":return a=b.data,a===ee&&fe?null:a;default:return null}}
	function ke(a,b){if(ie)return "compositionend"===a||!ae&&ge(a,b)?(a=nd(),md=ld=kd=null,ie=!1,a):null;switch(a){case "paste":return null;case "keypress":if(!(b.ctrlKey||b.altKey||b.metaKey)||b.ctrlKey&&b.altKey){if(b.char&&1<b.char.length)return b.char;if(b.which)return String.fromCharCode(b.which)}return null;case "compositionend":return de&&"ko"!==b.locale?null:b.data;default:return null}}
	var le={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function me(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return "input"===b?!!le[a.type]:"textarea"===b?!0:!1}function ne(a,b,c,d){Eb(d);b=oe(b,"onChange");0<b.length&&(c=new td("onChange","change",null,c,d),a.push({event:c,listeners:b}));}var pe=null,qe=null;function re(a){se(a,0);}function te(a){var b=ue(a);if(Wa(b))return a}
	function ve(a,b){if("change"===a)return b}var we=!1;if(fa){var xe;if(fa){var ye="oninput"in document;if(!ye){var ze=document.createElement("div");ze.setAttribute("oninput","return;");ye="function"===typeof ze.oninput;}xe=ye;}else xe=!1;we=xe&&(!document.documentMode||9<document.documentMode);}function Ae(){pe&&(pe.detachEvent("onpropertychange",Be),qe=pe=null);}function Be(a){if("value"===a.propertyName&&te(qe)){var b=[];ne(b,qe,a,xb(a));a=re;if(Kb)a(b);else {Kb=!0;try{Gb(a,b);}finally{Kb=!1,Mb();}}}}
	function Ce(a,b,c){"focusin"===a?(Ae(),pe=b,qe=c,pe.attachEvent("onpropertychange",Be)):"focusout"===a&&Ae();}function De(a){if("selectionchange"===a||"keyup"===a||"keydown"===a)return te(qe)}function Ee(a,b){if("click"===a)return te(b)}function Fe(a,b){if("input"===a||"change"===a)return te(b)}function Ge(a,b){return a===b&&(0!==a||1/a===1/b)||a!==a&&b!==b}var He="function"===typeof Object.is?Object.is:Ge,Ie=Object.prototype.hasOwnProperty;
	function Je(a,b){if(He(a,b))return !0;if("object"!==typeof a||null===a||"object"!==typeof b||null===b)return !1;var c=Object.keys(a),d=Object.keys(b);if(c.length!==d.length)return !1;for(d=0;d<c.length;d++)if(!Ie.call(b,c[d])||!He(a[c[d]],b[c[d]]))return !1;return !0}function Ke(a){for(;a&&a.firstChild;)a=a.firstChild;return a}
	function Le(a,b){var c=Ke(a);a=0;for(var d;c;){if(3===c.nodeType){d=a+c.textContent.length;if(a<=b&&d>=b)return {node:c,offset:b-a};a=d;}a:{for(;c;){if(c.nextSibling){c=c.nextSibling;break a}c=c.parentNode;}c=void 0;}c=Ke(c);}}function Me(a,b){return a&&b?a===b?!0:a&&3===a.nodeType?!1:b&&3===b.nodeType?Me(a,b.parentNode):"contains"in a?a.contains(b):a.compareDocumentPosition?!!(a.compareDocumentPosition(b)&16):!1:!1}
	function Ne(){for(var a=window,b=Xa();b instanceof a.HTMLIFrameElement;){try{var c="string"===typeof b.contentWindow.location.href;}catch(d){c=!1;}if(c)a=b.contentWindow;else break;b=Xa(a.document);}return b}function Oe(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return b&&("input"===b&&("text"===a.type||"search"===a.type||"tel"===a.type||"url"===a.type||"password"===a.type)||"textarea"===b||"true"===a.contentEditable)}
	var Pe=fa&&"documentMode"in document&&11>=document.documentMode,Qe=null,Re=null,Se=null,Te=!1;
	function Ue(a,b,c){var d=c.window===c?c.document:9===c.nodeType?c:c.ownerDocument;Te||null==Qe||Qe!==Xa(d)||(d=Qe,"selectionStart"in d&&Oe(d)?d={start:d.selectionStart,end:d.selectionEnd}:(d=(d.ownerDocument&&d.ownerDocument.defaultView||window).getSelection(),d={anchorNode:d.anchorNode,anchorOffset:d.anchorOffset,focusNode:d.focusNode,focusOffset:d.focusOffset}),Se&&Je(Se,d)||(Se=d,d=oe(Re,"onSelect"),0<d.length&&(b=new td("onSelect","select",null,b,c),a.push({event:b,listeners:d}),b.target=Qe)));}
	Pc("cancel cancel click click close close contextmenu contextMenu copy copy cut cut auxclick auxClick dblclick doubleClick dragend dragEnd dragstart dragStart drop drop focusin focus focusout blur input input invalid invalid keydown keyDown keypress keyPress keyup keyUp mousedown mouseDown mouseup mouseUp paste paste pause pause play play pointercancel pointerCancel pointerdown pointerDown pointerup pointerUp ratechange rateChange reset reset seeked seeked submit submit touchcancel touchCancel touchend touchEnd touchstart touchStart volumechange volumeChange".split(" "),
	0);Pc("drag drag dragenter dragEnter dragexit dragExit dragleave dragLeave dragover dragOver mousemove mouseMove mouseout mouseOut mouseover mouseOver pointermove pointerMove pointerout pointerOut pointerover pointerOver scroll scroll toggle toggle touchmove touchMove wheel wheel".split(" "),1);Pc(Oc,2);for(var Ve="change selectionchange textInput compositionstart compositionend compositionupdate".split(" "),We=0;We<Ve.length;We++)Nc.set(Ve[We],0);ea("onMouseEnter",["mouseout","mouseover"]);
	ea("onMouseLeave",["mouseout","mouseover"]);ea("onPointerEnter",["pointerout","pointerover"]);ea("onPointerLeave",["pointerout","pointerover"]);da("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));da("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));da("onBeforeInput",["compositionend","keypress","textInput","paste"]);da("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));
	da("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));da("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Xe="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Ye=new Set("cancel close invalid load scroll toggle".split(" ").concat(Xe));
	function Ze(a,b,c){var d=a.type||"unknown-event";a.currentTarget=c;Yb(d,b,void 0,a);a.currentTarget=null;}
	function se(a,b){b=0!==(b&4);for(var c=0;c<a.length;c++){var d=a[c],e=d.event;d=d.listeners;a:{var f=void 0;if(b)for(var g=d.length-1;0<=g;g--){var h=d[g],k=h.instance,l=h.currentTarget;h=h.listener;if(k!==f&&e.isPropagationStopped())break a;Ze(e,h,l);f=k;}else for(g=0;g<d.length;g++){h=d[g];k=h.instance;l=h.currentTarget;h=h.listener;if(k!==f&&e.isPropagationStopped())break a;Ze(e,h,l);f=k;}}}if(Ub)throw a=Vb,Ub=!1,Vb=null,a;}
	function G(a,b){var c=$e(b),d=a+"__bubble";c.has(d)||(af(b,a,2,!1),c.add(d));}var bf="_reactListening"+Math.random().toString(36).slice(2);function cf(a){a[bf]||(a[bf]=!0,ba.forEach(function(b){Ye.has(b)||df(b,!1,a,null);df(b,!0,a,null);}));}
	function df(a,b,c,d){var e=4<arguments.length&&void 0!==arguments[4]?arguments[4]:0,f=c;"selectionchange"===a&&9!==c.nodeType&&(f=c.ownerDocument);if(null!==d&&!b&&Ye.has(a)){if("scroll"!==a)return;e|=2;f=d;}var g=$e(f),h=a+"__"+(b?"capture":"bubble");g.has(h)||(b&&(e|=4),af(f,a,e,b),g.add(h));}
	function af(a,b,c,d){var e=Nc.get(b);switch(void 0===e?2:e){case 0:e=gd;break;case 1:e=id;break;default:e=hd;}c=e.bind(null,b,c,a);e=void 0;!Pb||"touchstart"!==b&&"touchmove"!==b&&"wheel"!==b||(e=!0);d?void 0!==e?a.addEventListener(b,c,{capture:!0,passive:e}):a.addEventListener(b,c,!0):void 0!==e?a.addEventListener(b,c,{passive:e}):a.addEventListener(b,c,!1);}
	function jd(a,b,c,d,e){var f=d;if(0===(b&1)&&0===(b&2)&&null!==d)a:for(;;){if(null===d)return;var g=d.tag;if(3===g||4===g){var h=d.stateNode.containerInfo;if(h===e||8===h.nodeType&&h.parentNode===e)break;if(4===g)for(g=d.return;null!==g;){var k=g.tag;if(3===k||4===k)if(k=g.stateNode.containerInfo,k===e||8===k.nodeType&&k.parentNode===e)return;g=g.return;}for(;null!==h;){g=wc(h);if(null===g)return;k=g.tag;if(5===k||6===k){d=f=g;continue a}h=h.parentNode;}}d=d.return;}Nb(function(){var d=f,e=xb(c),g=[];
	a:{var h=Mc.get(a);if(void 0!==h){var k=td,x=a;switch(a){case "keypress":if(0===od(c))break a;case "keydown":case "keyup":k=Rd;break;case "focusin":x="focus";k=Fd;break;case "focusout":x="blur";k=Fd;break;case "beforeblur":case "afterblur":k=Fd;break;case "click":if(2===c.button)break a;case "auxclick":case "dblclick":case "mousedown":case "mousemove":case "mouseup":case "mouseout":case "mouseover":case "contextmenu":k=Bd;break;case "drag":case "dragend":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "dragstart":case "drop":k=
	Dd;break;case "touchcancel":case "touchend":case "touchmove":case "touchstart":k=Vd;break;case Ic:case Jc:case Kc:k=Hd;break;case Lc:k=Xd;break;case "scroll":k=vd;break;case "wheel":k=Zd;break;case "copy":case "cut":case "paste":k=Jd;break;case "gotpointercapture":case "lostpointercapture":case "pointercancel":case "pointerdown":case "pointermove":case "pointerout":case "pointerover":case "pointerup":k=Td;}var w=0!==(b&4),z=!w&&"scroll"===a,u=w?null!==h?h+"Capture":null:h;w=[];for(var t=d,q;null!==
	t;){q=t;var v=q.stateNode;5===q.tag&&null!==v&&(q=v,null!==u&&(v=Ob(t,u),null!=v&&w.push(ef(t,v,q))));if(z)break;t=t.return;}0<w.length&&(h=new k(h,x,null,c,e),g.push({event:h,listeners:w}));}}if(0===(b&7)){a:{h="mouseover"===a||"pointerover"===a;k="mouseout"===a||"pointerout"===a;if(h&&0===(b&16)&&(x=c.relatedTarget||c.fromElement)&&(wc(x)||x[ff]))break a;if(k||h){h=e.window===e?e:(h=e.ownerDocument)?h.defaultView||h.parentWindow:window;if(k){if(x=c.relatedTarget||c.toElement,k=d,x=x?wc(x):null,null!==
	x&&(z=Zb(x),x!==z||5!==x.tag&&6!==x.tag))x=null;}else k=null,x=d;if(k!==x){w=Bd;v="onMouseLeave";u="onMouseEnter";t="mouse";if("pointerout"===a||"pointerover"===a)w=Td,v="onPointerLeave",u="onPointerEnter",t="pointer";z=null==k?h:ue(k);q=null==x?h:ue(x);h=new w(v,t+"leave",k,c,e);h.target=z;h.relatedTarget=q;v=null;wc(e)===d&&(w=new w(u,t+"enter",x,c,e),w.target=q,w.relatedTarget=z,v=w);z=v;if(k&&x)b:{w=k;u=x;t=0;for(q=w;q;q=gf(q))t++;q=0;for(v=u;v;v=gf(v))q++;for(;0<t-q;)w=gf(w),t--;for(;0<q-t;)u=
	gf(u),q--;for(;t--;){if(w===u||null!==u&&w===u.alternate)break b;w=gf(w);u=gf(u);}w=null;}else w=null;null!==k&&hf(g,h,k,w,!1);null!==x&&null!==z&&hf(g,z,x,w,!0);}}}a:{h=d?ue(d):window;k=h.nodeName&&h.nodeName.toLowerCase();if("select"===k||"input"===k&&"file"===h.type)var J=ve;else if(me(h))if(we)J=Fe;else {J=De;var K=Ce;}else (k=h.nodeName)&&"input"===k.toLowerCase()&&("checkbox"===h.type||"radio"===h.type)&&(J=Ee);if(J&&(J=J(a,d))){ne(g,J,c,e);break a}K&&K(a,h,d);"focusout"===a&&(K=h._wrapperState)&&
	K.controlled&&"number"===h.type&&bb(h,"number",h.value);}K=d?ue(d):window;switch(a){case "focusin":if(me(K)||"true"===K.contentEditable)Qe=K,Re=d,Se=null;break;case "focusout":Se=Re=Qe=null;break;case "mousedown":Te=!0;break;case "contextmenu":case "mouseup":case "dragend":Te=!1;Ue(g,c,e);break;case "selectionchange":if(Pe)break;case "keydown":case "keyup":Ue(g,c,e);}var Q;if(ae)b:{switch(a){case "compositionstart":var L="onCompositionStart";break b;case "compositionend":L="onCompositionEnd";break b;
	case "compositionupdate":L="onCompositionUpdate";break b}L=void 0;}else ie?ge(a,c)&&(L="onCompositionEnd"):"keydown"===a&&229===c.keyCode&&(L="onCompositionStart");L&&(de&&"ko"!==c.locale&&(ie||"onCompositionStart"!==L?"onCompositionEnd"===L&&ie&&(Q=nd()):(kd=e,ld="value"in kd?kd.value:kd.textContent,ie=!0)),K=oe(d,L),0<K.length&&(L=new Ld(L,a,null,c,e),g.push({event:L,listeners:K}),Q?L.data=Q:(Q=he(c),null!==Q&&(L.data=Q))));if(Q=ce?je(a,c):ke(a,c))d=oe(d,"onBeforeInput"),0<d.length&&(e=new Ld("onBeforeInput",
	"beforeinput",null,c,e),g.push({event:e,listeners:d}),e.data=Q);}se(g,b);});}function ef(a,b,c){return {instance:a,listener:b,currentTarget:c}}function oe(a,b){for(var c=b+"Capture",d=[];null!==a;){var e=a,f=e.stateNode;5===e.tag&&null!==f&&(e=f,f=Ob(a,c),null!=f&&d.unshift(ef(a,f,e)),f=Ob(a,b),null!=f&&d.push(ef(a,f,e)));a=a.return;}return d}function gf(a){if(null===a)return null;do a=a.return;while(a&&5!==a.tag);return a?a:null}
	function hf(a,b,c,d,e){for(var f=b._reactName,g=[];null!==c&&c!==d;){var h=c,k=h.alternate,l=h.stateNode;if(null!==k&&k===d)break;5===h.tag&&null!==l&&(h=l,e?(k=Ob(c,f),null!=k&&g.unshift(ef(c,k,h))):e||(k=Ob(c,f),null!=k&&g.push(ef(c,k,h))));c=c.return;}0!==g.length&&a.push({event:b,listeners:g});}function jf(){}var kf=null,lf=null;function mf(a,b){switch(a){case "button":case "input":case "select":case "textarea":return !!b.autoFocus}return !1}
	function nf(a,b){return "textarea"===a||"option"===a||"noscript"===a||"string"===typeof b.children||"number"===typeof b.children||"object"===typeof b.dangerouslySetInnerHTML&&null!==b.dangerouslySetInnerHTML&&null!=b.dangerouslySetInnerHTML.__html}var of="function"===typeof setTimeout?setTimeout:void 0,pf="function"===typeof clearTimeout?clearTimeout:void 0;function qf(a){1===a.nodeType?a.textContent="":9===a.nodeType&&(a=a.body,null!=a&&(a.textContent=""));}
	function rf(a){for(;null!=a;a=a.nextSibling){var b=a.nodeType;if(1===b||3===b)break}return a}function sf(a){a=a.previousSibling;for(var b=0;a;){if(8===a.nodeType){var c=a.data;if("$"===c||"$!"===c||"$?"===c){if(0===b)return a;b--;}else "/$"===c&&b++;}a=a.previousSibling;}return null}var tf=0;function uf(a){return {$$typeof:Ga,toString:a,valueOf:a}}var vf=Math.random().toString(36).slice(2),wf="__reactFiber$"+vf,xf="__reactProps$"+vf,ff="__reactContainer$"+vf,yf="__reactEvents$"+vf;
	function wc(a){var b=a[wf];if(b)return b;for(var c=a.parentNode;c;){if(b=c[ff]||c[wf]){c=b.alternate;if(null!==b.child||null!==c&&null!==c.child)for(a=sf(a);null!==a;){if(c=a[wf])return c;a=sf(a);}return b}a=c;c=a.parentNode;}return null}function Cb(a){a=a[wf]||a[ff];return !a||5!==a.tag&&6!==a.tag&&13!==a.tag&&3!==a.tag?null:a}function ue(a){if(5===a.tag||6===a.tag)return a.stateNode;throw Error(y(33));}function Db(a){return a[xf]||null}
	function $e(a){var b=a[yf];void 0===b&&(b=a[yf]=new Set);return b}var zf=[],Af=-1;function Bf(a){return {current:a}}function H(a){0>Af||(a.current=zf[Af],zf[Af]=null,Af--);}function I(a,b){Af++;zf[Af]=a.current;a.current=b;}var Cf={},M=Bf(Cf),N=Bf(!1),Df=Cf;
	function Ef(a,b){var c=a.type.contextTypes;if(!c)return Cf;var d=a.stateNode;if(d&&d.__reactInternalMemoizedUnmaskedChildContext===b)return d.__reactInternalMemoizedMaskedChildContext;var e={},f;for(f in c)e[f]=b[f];d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=b,a.__reactInternalMemoizedMaskedChildContext=e);return e}function Ff(a){a=a.childContextTypes;return null!==a&&void 0!==a}function Gf(){H(N);H(M);}function Hf(a,b,c){if(M.current!==Cf)throw Error(y(168));I(M,b);I(N,c);}
	function If(a,b,c){var d=a.stateNode;a=b.childContextTypes;if("function"!==typeof d.getChildContext)return c;d=d.getChildContext();for(var e in d)if(!(e in a))throw Error(y(108,Ra(b)||"Unknown",e));return m({},c,d)}function Jf(a){a=(a=a.stateNode)&&a.__reactInternalMemoizedMergedChildContext||Cf;Df=M.current;I(M,a);I(N,N.current);return !0}function Kf(a,b,c){var d=a.stateNode;if(!d)throw Error(y(169));c?(a=If(a,b,Df),d.__reactInternalMemoizedMergedChildContext=a,H(N),H(M),I(M,a)):H(N);I(N,c);}
	var Lf=null,Mf=null,Nf=r.unstable_runWithPriority,Of=r.unstable_scheduleCallback,Pf=r.unstable_cancelCallback,Qf=r.unstable_shouldYield,Rf=r.unstable_requestPaint,Sf=r.unstable_now,Tf=r.unstable_getCurrentPriorityLevel,Uf=r.unstable_ImmediatePriority,Vf=r.unstable_UserBlockingPriority,Wf=r.unstable_NormalPriority,Xf=r.unstable_LowPriority,Yf=r.unstable_IdlePriority,Zf={},$f=void 0!==Rf?Rf:function(){},ag=null,bg=null,cg=!1,dg=Sf(),O=1E4>dg?Sf:function(){return Sf()-dg};
	function eg(){switch(Tf()){case Uf:return 99;case Vf:return 98;case Wf:return 97;case Xf:return 96;case Yf:return 95;default:throw Error(y(332));}}function fg(a){switch(a){case 99:return Uf;case 98:return Vf;case 97:return Wf;case 96:return Xf;case 95:return Yf;default:throw Error(y(332));}}function gg(a,b){a=fg(a);return Nf(a,b)}function hg(a,b,c){a=fg(a);return Of(a,b,c)}function ig(){if(null!==bg){var a=bg;bg=null;Pf(a);}jg();}
	function jg(){if(!cg&&null!==ag){cg=!0;var a=0;try{var b=ag;gg(99,function(){for(;a<b.length;a++){var c=b[a];do c=c(!0);while(null!==c)}});ag=null;}catch(c){throw null!==ag&&(ag=ag.slice(a+1)),Of(Uf,ig),c;}finally{cg=!1;}}}var kg=ra.ReactCurrentBatchConfig;function lg(a,b){if(a&&a.defaultProps){b=m({},b);a=a.defaultProps;for(var c in a)void 0===b[c]&&(b[c]=a[c]);return b}return b}var mg=Bf(null),ng=null,og=null,pg=null;function qg(){pg=og=ng=null;}
	function rg(a){var b=mg.current;H(mg);a.type._context._currentValue=b;}function sg(a,b){for(;null!==a;){var c=a.alternate;if((a.childLanes&b)===b)if(null===c||(c.childLanes&b)===b)break;else c.childLanes|=b;else a.childLanes|=b,null!==c&&(c.childLanes|=b);a=a.return;}}function tg(a,b){ng=a;pg=og=null;a=a.dependencies;null!==a&&null!==a.firstContext&&(0!==(a.lanes&b)&&(ug=!0),a.firstContext=null);}
	function vg(a,b){if(pg!==a&&!1!==b&&0!==b){if("number"!==typeof b||1073741823===b)pg=a,b=1073741823;b={context:a,observedBits:b,next:null};if(null===og){if(null===ng)throw Error(y(308));og=b;ng.dependencies={lanes:0,firstContext:b,responders:null};}else og=og.next=b;}return a._currentValue}var wg=!1;function xg(a){a.updateQueue={baseState:a.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null},effects:null};}
	function yg(a,b){a=a.updateQueue;b.updateQueue===a&&(b.updateQueue={baseState:a.baseState,firstBaseUpdate:a.firstBaseUpdate,lastBaseUpdate:a.lastBaseUpdate,shared:a.shared,effects:a.effects});}function zg(a,b){return {eventTime:a,lane:b,tag:0,payload:null,callback:null,next:null}}function Ag(a,b){a=a.updateQueue;if(null!==a){a=a.shared;var c=a.pending;null===c?b.next=b:(b.next=c.next,c.next=b);a.pending=b;}}
	function Bg(a,b){var c=a.updateQueue,d=a.alternate;if(null!==d&&(d=d.updateQueue,c===d)){var e=null,f=null;c=c.firstBaseUpdate;if(null!==c){do{var g={eventTime:c.eventTime,lane:c.lane,tag:c.tag,payload:c.payload,callback:c.callback,next:null};null===f?e=f=g:f=f.next=g;c=c.next;}while(null!==c);null===f?e=f=b:f=f.next=b;}else e=f=b;c={baseState:d.baseState,firstBaseUpdate:e,lastBaseUpdate:f,shared:d.shared,effects:d.effects};a.updateQueue=c;return}a=c.lastBaseUpdate;null===a?c.firstBaseUpdate=b:a.next=
	b;c.lastBaseUpdate=b;}
	function Cg(a,b,c,d){var e=a.updateQueue;wg=!1;var f=e.firstBaseUpdate,g=e.lastBaseUpdate,h=e.shared.pending;if(null!==h){e.shared.pending=null;var k=h,l=k.next;k.next=null;null===g?f=l:g.next=l;g=k;var n=a.alternate;if(null!==n){n=n.updateQueue;var A=n.lastBaseUpdate;A!==g&&(null===A?n.firstBaseUpdate=l:A.next=l,n.lastBaseUpdate=k);}}if(null!==f){A=e.baseState;g=0;n=l=k=null;do{h=f.lane;var p=f.eventTime;if((d&h)===h){null!==n&&(n=n.next={eventTime:p,lane:0,tag:f.tag,payload:f.payload,callback:f.callback,
	next:null});a:{var C=a,x=f;h=b;p=c;switch(x.tag){case 1:C=x.payload;if("function"===typeof C){A=C.call(p,A,h);break a}A=C;break a;case 3:C.flags=C.flags&-4097|64;case 0:C=x.payload;h="function"===typeof C?C.call(p,A,h):C;if(null===h||void 0===h)break a;A=m({},A,h);break a;case 2:wg=!0;}}null!==f.callback&&(a.flags|=32,h=e.effects,null===h?e.effects=[f]:h.push(f));}else p={eventTime:p,lane:h,tag:f.tag,payload:f.payload,callback:f.callback,next:null},null===n?(l=n=p,k=A):n=n.next=p,g|=h;f=f.next;if(null===
	f)if(h=e.shared.pending,null===h)break;else f=h.next,h.next=null,e.lastBaseUpdate=h,e.shared.pending=null;}while(1);null===n&&(k=A);e.baseState=k;e.firstBaseUpdate=l;e.lastBaseUpdate=n;Dg|=g;a.lanes=g;a.memoizedState=A;}}function Eg(a,b,c){a=b.effects;b.effects=null;if(null!==a)for(b=0;b<a.length;b++){var d=a[b],e=d.callback;if(null!==e){d.callback=null;d=c;if("function"!==typeof e)throw Error(y(191,e));e.call(d);}}}var Fg=(new aa.Component).refs;
	function Gg(a,b,c,d){b=a.memoizedState;c=c(d,b);c=null===c||void 0===c?b:m({},b,c);a.memoizedState=c;0===a.lanes&&(a.updateQueue.baseState=c);}
	var Kg={isMounted:function(a){return (a=a._reactInternals)?Zb(a)===a:!1},enqueueSetState:function(a,b,c){a=a._reactInternals;var d=Hg(),e=Ig(a),f=zg(d,e);f.payload=b;void 0!==c&&null!==c&&(f.callback=c);Ag(a,f);Jg(a,e,d);},enqueueReplaceState:function(a,b,c){a=a._reactInternals;var d=Hg(),e=Ig(a),f=zg(d,e);f.tag=1;f.payload=b;void 0!==c&&null!==c&&(f.callback=c);Ag(a,f);Jg(a,e,d);},enqueueForceUpdate:function(a,b){a=a._reactInternals;var c=Hg(),d=Ig(a),e=zg(c,d);e.tag=2;void 0!==b&&null!==b&&(e.callback=
	b);Ag(a,e);Jg(a,d,c);}};function Lg(a,b,c,d,e,f,g){a=a.stateNode;return "function"===typeof a.shouldComponentUpdate?a.shouldComponentUpdate(d,f,g):b.prototype&&b.prototype.isPureReactComponent?!Je(c,d)||!Je(e,f):!0}
	function Mg(a,b,c){var d=!1,e=Cf;var f=b.contextType;"object"===typeof f&&null!==f?f=vg(f):(e=Ff(b)?Df:M.current,d=b.contextTypes,f=(d=null!==d&&void 0!==d)?Ef(a,e):Cf);b=new b(c,f);a.memoizedState=null!==b.state&&void 0!==b.state?b.state:null;b.updater=Kg;a.stateNode=b;b._reactInternals=a;d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=e,a.__reactInternalMemoizedMaskedChildContext=f);return b}
	function Ng(a,b,c,d){a=b.state;"function"===typeof b.componentWillReceiveProps&&b.componentWillReceiveProps(c,d);"function"===typeof b.UNSAFE_componentWillReceiveProps&&b.UNSAFE_componentWillReceiveProps(c,d);b.state!==a&&Kg.enqueueReplaceState(b,b.state,null);}
	function Og(a,b,c,d){var e=a.stateNode;e.props=c;e.state=a.memoizedState;e.refs=Fg;xg(a);var f=b.contextType;"object"===typeof f&&null!==f?e.context=vg(f):(f=Ff(b)?Df:M.current,e.context=Ef(a,f));Cg(a,c,e,d);e.state=a.memoizedState;f=b.getDerivedStateFromProps;"function"===typeof f&&(Gg(a,b,f,c),e.state=a.memoizedState);"function"===typeof b.getDerivedStateFromProps||"function"===typeof e.getSnapshotBeforeUpdate||"function"!==typeof e.UNSAFE_componentWillMount&&"function"!==typeof e.componentWillMount||
	(b=e.state,"function"===typeof e.componentWillMount&&e.componentWillMount(),"function"===typeof e.UNSAFE_componentWillMount&&e.UNSAFE_componentWillMount(),b!==e.state&&Kg.enqueueReplaceState(e,e.state,null),Cg(a,c,e,d),e.state=a.memoizedState);"function"===typeof e.componentDidMount&&(a.flags|=4);}var Pg=Array.isArray;
	function Qg(a,b,c){a=c.ref;if(null!==a&&"function"!==typeof a&&"object"!==typeof a){if(c._owner){c=c._owner;if(c){if(1!==c.tag)throw Error(y(309));var d=c.stateNode;}if(!d)throw Error(y(147,a));var e=""+a;if(null!==b&&null!==b.ref&&"function"===typeof b.ref&&b.ref._stringRef===e)return b.ref;b=function(a){var b=d.refs;b===Fg&&(b=d.refs={});null===a?delete b[e]:b[e]=a;};b._stringRef=e;return b}if("string"!==typeof a)throw Error(y(284));if(!c._owner)throw Error(y(290,a));}return a}
	function Rg(a,b){if("textarea"!==a.type)throw Error(y(31,"[object Object]"===Object.prototype.toString.call(b)?"object with keys {"+Object.keys(b).join(", ")+"}":b));}
	function Sg(a){function b(b,c){if(a){var d=b.lastEffect;null!==d?(d.nextEffect=c,b.lastEffect=c):b.firstEffect=b.lastEffect=c;c.nextEffect=null;c.flags=8;}}function c(c,d){if(!a)return null;for(;null!==d;)b(c,d),d=d.sibling;return null}function d(a,b){for(a=new Map;null!==b;)null!==b.key?a.set(b.key,b):a.set(b.index,b),b=b.sibling;return a}function e(a,b){a=Tg(a,b);a.index=0;a.sibling=null;return a}function f(b,c,d){b.index=d;if(!a)return c;d=b.alternate;if(null!==d)return d=d.index,d<c?(b.flags=2,
	c):d;b.flags=2;return c}function g(b){a&&null===b.alternate&&(b.flags=2);return b}function h(a,b,c,d){if(null===b||6!==b.tag)return b=Ug(c,a.mode,d),b.return=a,b;b=e(b,c);b.return=a;return b}function k(a,b,c,d){if(null!==b&&b.elementType===c.type)return d=e(b,c.props),d.ref=Qg(a,b,c),d.return=a,d;d=Vg(c.type,c.key,c.props,null,a.mode,d);d.ref=Qg(a,b,c);d.return=a;return d}function l(a,b,c,d){if(null===b||4!==b.tag||b.stateNode.containerInfo!==c.containerInfo||b.stateNode.implementation!==c.implementation)return b=
	Wg(c,a.mode,d),b.return=a,b;b=e(b,c.children||[]);b.return=a;return b}function n(a,b,c,d,f){if(null===b||7!==b.tag)return b=Xg(c,a.mode,d,f),b.return=a,b;b=e(b,c);b.return=a;return b}function A(a,b,c){if("string"===typeof b||"number"===typeof b)return b=Ug(""+b,a.mode,c),b.return=a,b;if("object"===typeof b&&null!==b){switch(b.$$typeof){case sa:return c=Vg(b.type,b.key,b.props,null,a.mode,c),c.ref=Qg(a,null,b),c.return=a,c;case ta:return b=Wg(b,a.mode,c),b.return=a,b}if(Pg(b)||La(b))return b=Xg(b,
	a.mode,c,null),b.return=a,b;Rg(a,b);}return null}function p(a,b,c,d){var e=null!==b?b.key:null;if("string"===typeof c||"number"===typeof c)return null!==e?null:h(a,b,""+c,d);if("object"===typeof c&&null!==c){switch(c.$$typeof){case sa:return c.key===e?c.type===ua?n(a,b,c.props.children,d,e):k(a,b,c,d):null;case ta:return c.key===e?l(a,b,c,d):null}if(Pg(c)||La(c))return null!==e?null:n(a,b,c,d,null);Rg(a,c);}return null}function C(a,b,c,d,e){if("string"===typeof d||"number"===typeof d)return a=a.get(c)||
	null,h(b,a,""+d,e);if("object"===typeof d&&null!==d){switch(d.$$typeof){case sa:return a=a.get(null===d.key?c:d.key)||null,d.type===ua?n(b,a,d.props.children,e,d.key):k(b,a,d,e);case ta:return a=a.get(null===d.key?c:d.key)||null,l(b,a,d,e)}if(Pg(d)||La(d))return a=a.get(c)||null,n(b,a,d,e,null);Rg(b,d);}return null}function x(e,g,h,k){for(var l=null,t=null,u=g,z=g=0,q=null;null!==u&&z<h.length;z++){u.index>z?(q=u,u=null):q=u.sibling;var n=p(e,u,h[z],k);if(null===n){null===u&&(u=q);break}a&&u&&null===
	n.alternate&&b(e,u);g=f(n,g,z);null===t?l=n:t.sibling=n;t=n;u=q;}if(z===h.length)return c(e,u),l;if(null===u){for(;z<h.length;z++)u=A(e,h[z],k),null!==u&&(g=f(u,g,z),null===t?l=u:t.sibling=u,t=u);return l}for(u=d(e,u);z<h.length;z++)q=C(u,e,z,h[z],k),null!==q&&(a&&null!==q.alternate&&u.delete(null===q.key?z:q.key),g=f(q,g,z),null===t?l=q:t.sibling=q,t=q);a&&u.forEach(function(a){return b(e,a)});return l}function w(e,g,h,k){var l=La(h);if("function"!==typeof l)throw Error(y(150));h=l.call(h);if(null==
	h)throw Error(y(151));for(var t=l=null,u=g,z=g=0,q=null,n=h.next();null!==u&&!n.done;z++,n=h.next()){u.index>z?(q=u,u=null):q=u.sibling;var w=p(e,u,n.value,k);if(null===w){null===u&&(u=q);break}a&&u&&null===w.alternate&&b(e,u);g=f(w,g,z);null===t?l=w:t.sibling=w;t=w;u=q;}if(n.done)return c(e,u),l;if(null===u){for(;!n.done;z++,n=h.next())n=A(e,n.value,k),null!==n&&(g=f(n,g,z),null===t?l=n:t.sibling=n,t=n);return l}for(u=d(e,u);!n.done;z++,n=h.next())n=C(u,e,z,n.value,k),null!==n&&(a&&null!==n.alternate&&
	u.delete(null===n.key?z:n.key),g=f(n,g,z),null===t?l=n:t.sibling=n,t=n);a&&u.forEach(function(a){return b(e,a)});return l}return function(a,d,f,h){var k="object"===typeof f&&null!==f&&f.type===ua&&null===f.key;k&&(f=f.props.children);var l="object"===typeof f&&null!==f;if(l)switch(f.$$typeof){case sa:a:{l=f.key;for(k=d;null!==k;){if(k.key===l){switch(k.tag){case 7:if(f.type===ua){c(a,k.sibling);d=e(k,f.props.children);d.return=a;a=d;break a}break;default:if(k.elementType===f.type){c(a,k.sibling);
	d=e(k,f.props);d.ref=Qg(a,k,f);d.return=a;a=d;break a}}c(a,k);break}else b(a,k);k=k.sibling;}f.type===ua?(d=Xg(f.props.children,a.mode,h,f.key),d.return=a,a=d):(h=Vg(f.type,f.key,f.props,null,a.mode,h),h.ref=Qg(a,d,f),h.return=a,a=h);}return g(a);case ta:a:{for(k=f.key;null!==d;){if(d.key===k)if(4===d.tag&&d.stateNode.containerInfo===f.containerInfo&&d.stateNode.implementation===f.implementation){c(a,d.sibling);d=e(d,f.children||[]);d.return=a;a=d;break a}else {c(a,d);break}else b(a,d);d=d.sibling;}d=
	Wg(f,a.mode,h);d.return=a;a=d;}return g(a)}if("string"===typeof f||"number"===typeof f)return f=""+f,null!==d&&6===d.tag?(c(a,d.sibling),d=e(d,f),d.return=a,a=d):(c(a,d),d=Ug(f,a.mode,h),d.return=a,a=d),g(a);if(Pg(f))return x(a,d,f,h);if(La(f))return w(a,d,f,h);l&&Rg(a,f);if("undefined"===typeof f&&!k)switch(a.tag){case 1:case 22:case 0:case 11:case 15:throw Error(y(152,Ra(a.type)||"Component"));}return c(a,d)}}var Yg=Sg(!0),Zg=Sg(!1),$g={},ah=Bf($g),bh=Bf($g),ch=Bf($g);
	function dh(a){if(a===$g)throw Error(y(174));return a}function eh(a,b){I(ch,b);I(bh,a);I(ah,$g);a=b.nodeType;switch(a){case 9:case 11:b=(b=b.documentElement)?b.namespaceURI:mb(null,"");break;default:a=8===a?b.parentNode:b,b=a.namespaceURI||null,a=a.tagName,b=mb(b,a);}H(ah);I(ah,b);}function fh(){H(ah);H(bh);H(ch);}function gh(a){dh(ch.current);var b=dh(ah.current);var c=mb(b,a.type);b!==c&&(I(bh,a),I(ah,c));}function hh(a){bh.current===a&&(H(ah),H(bh));}var P=Bf(0);
	function ih(a){for(var b=a;null!==b;){if(13===b.tag){var c=b.memoizedState;if(null!==c&&(c=c.dehydrated,null===c||"$?"===c.data||"$!"===c.data))return b}else if(19===b.tag&&void 0!==b.memoizedProps.revealOrder){if(0!==(b.flags&64))return b}else if(null!==b.child){b.child.return=b;b=b.child;continue}if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return null;b=b.return;}b.sibling.return=b.return;b=b.sibling;}return null}var jh=null,kh=null,lh=!1;
	function mh(a,b){var c=nh(5,null,null,0);c.elementType="DELETED";c.type="DELETED";c.stateNode=b;c.return=a;c.flags=8;null!==a.lastEffect?(a.lastEffect.nextEffect=c,a.lastEffect=c):a.firstEffect=a.lastEffect=c;}function oh(a,b){switch(a.tag){case 5:var c=a.type;b=1!==b.nodeType||c.toLowerCase()!==b.nodeName.toLowerCase()?null:b;return null!==b?(a.stateNode=b,!0):!1;case 6:return b=""===a.pendingProps||3!==b.nodeType?null:b,null!==b?(a.stateNode=b,!0):!1;case 13:return !1;default:return !1}}
	function ph(a){if(lh){var b=kh;if(b){var c=b;if(!oh(a,b)){b=rf(c.nextSibling);if(!b||!oh(a,b)){a.flags=a.flags&-1025|2;lh=!1;jh=a;return}mh(jh,c);}jh=a;kh=rf(b.firstChild);}else a.flags=a.flags&-1025|2,lh=!1,jh=a;}}function qh(a){for(a=a.return;null!==a&&5!==a.tag&&3!==a.tag&&13!==a.tag;)a=a.return;jh=a;}
	function rh(a){if(a!==jh)return !1;if(!lh)return qh(a),lh=!0,!1;var b=a.type;if(5!==a.tag||"head"!==b&&"body"!==b&&!nf(b,a.memoizedProps))for(b=kh;b;)mh(a,b),b=rf(b.nextSibling);qh(a);if(13===a.tag){a=a.memoizedState;a=null!==a?a.dehydrated:null;if(!a)throw Error(y(317));a:{a=a.nextSibling;for(b=0;a;){if(8===a.nodeType){var c=a.data;if("/$"===c){if(0===b){kh=rf(a.nextSibling);break a}b--;}else "$"!==c&&"$!"!==c&&"$?"!==c||b++;}a=a.nextSibling;}kh=null;}}else kh=jh?rf(a.stateNode.nextSibling):null;return !0}
	function sh(){kh=jh=null;lh=!1;}var th=[];function uh(){for(var a=0;a<th.length;a++)th[a]._workInProgressVersionPrimary=null;th.length=0;}var vh=ra.ReactCurrentDispatcher,wh=ra.ReactCurrentBatchConfig,xh=0,R=null,S=null,T=null,yh=!1,zh=!1;function Ah(){throw Error(y(321));}function Bh(a,b){if(null===b)return !1;for(var c=0;c<b.length&&c<a.length;c++)if(!He(a[c],b[c]))return !1;return !0}
	function Ch(a,b,c,d,e,f){xh=f;R=b;b.memoizedState=null;b.updateQueue=null;b.lanes=0;vh.current=null===a||null===a.memoizedState?Dh:Eh;a=c(d,e);if(zh){f=0;do{zh=!1;if(!(25>f))throw Error(y(301));f+=1;T=S=null;b.updateQueue=null;vh.current=Fh;a=c(d,e);}while(zh)}vh.current=Gh;b=null!==S&&null!==S.next;xh=0;T=S=R=null;yh=!1;if(b)throw Error(y(300));return a}function Hh(){var a={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};null===T?R.memoizedState=T=a:T=T.next=a;return T}
	function Ih(){if(null===S){var a=R.alternate;a=null!==a?a.memoizedState:null;}else a=S.next;var b=null===T?R.memoizedState:T.next;if(null!==b)T=b,S=a;else {if(null===a)throw Error(y(310));S=a;a={memoizedState:S.memoizedState,baseState:S.baseState,baseQueue:S.baseQueue,queue:S.queue,next:null};null===T?R.memoizedState=T=a:T=T.next=a;}return T}function Jh(a,b){return "function"===typeof b?b(a):b}
	function Kh(a){var b=Ih(),c=b.queue;if(null===c)throw Error(y(311));c.lastRenderedReducer=a;var d=S,e=d.baseQueue,f=c.pending;if(null!==f){if(null!==e){var g=e.next;e.next=f.next;f.next=g;}d.baseQueue=e=f;c.pending=null;}if(null!==e){e=e.next;d=d.baseState;var h=g=f=null,k=e;do{var l=k.lane;if((xh&l)===l)null!==h&&(h=h.next={lane:0,action:k.action,eagerReducer:k.eagerReducer,eagerState:k.eagerState,next:null}),d=k.eagerReducer===a?k.eagerState:a(d,k.action);else {var n={lane:l,action:k.action,eagerReducer:k.eagerReducer,
	eagerState:k.eagerState,next:null};null===h?(g=h=n,f=d):h=h.next=n;R.lanes|=l;Dg|=l;}k=k.next;}while(null!==k&&k!==e);null===h?f=d:h.next=g;He(d,b.memoizedState)||(ug=!0);b.memoizedState=d;b.baseState=f;b.baseQueue=h;c.lastRenderedState=d;}return [b.memoizedState,c.dispatch]}
	function Lh(a){var b=Ih(),c=b.queue;if(null===c)throw Error(y(311));c.lastRenderedReducer=a;var d=c.dispatch,e=c.pending,f=b.memoizedState;if(null!==e){c.pending=null;var g=e=e.next;do f=a(f,g.action),g=g.next;while(g!==e);He(f,b.memoizedState)||(ug=!0);b.memoizedState=f;null===b.baseQueue&&(b.baseState=f);c.lastRenderedState=f;}return [f,d]}
	function Mh(a,b,c){var d=b._getVersion;d=d(b._source);var e=b._workInProgressVersionPrimary;if(null!==e)a=e===d;else if(a=a.mutableReadLanes,a=(xh&a)===a)b._workInProgressVersionPrimary=d,th.push(b);if(a)return c(b._source);th.push(b);throw Error(y(350));}
	function Nh(a,b,c,d){var e=U;if(null===e)throw Error(y(349));var f=b._getVersion,g=f(b._source),h=vh.current,k=h.useState(function(){return Mh(e,b,c)}),l=k[1],n=k[0];k=T;var A=a.memoizedState,p=A.refs,C=p.getSnapshot,x=A.source;A=A.subscribe;var w=R;a.memoizedState={refs:p,source:b,subscribe:d};h.useEffect(function(){p.getSnapshot=c;p.setSnapshot=l;var a=f(b._source);if(!He(g,a)){a=c(b._source);He(n,a)||(l(a),a=Ig(w),e.mutableReadLanes|=a&e.pendingLanes);a=e.mutableReadLanes;e.entangledLanes|=a;for(var d=
	e.entanglements,h=a;0<h;){var k=31-Vc(h),v=1<<k;d[k]|=a;h&=~v;}}},[c,b,d]);h.useEffect(function(){return d(b._source,function(){var a=p.getSnapshot,c=p.setSnapshot;try{c(a(b._source));var d=Ig(w);e.mutableReadLanes|=d&e.pendingLanes;}catch(q){c(function(){throw q;});}})},[b,d]);He(C,c)&&He(x,b)&&He(A,d)||(a={pending:null,dispatch:null,lastRenderedReducer:Jh,lastRenderedState:n},a.dispatch=l=Oh.bind(null,R,a),k.queue=a,k.baseQueue=null,n=Mh(e,b,c),k.memoizedState=k.baseState=n);return n}
	function Ph(a,b,c){var d=Ih();return Nh(d,a,b,c)}function Qh(a){var b=Hh();"function"===typeof a&&(a=a());b.memoizedState=b.baseState=a;a=b.queue={pending:null,dispatch:null,lastRenderedReducer:Jh,lastRenderedState:a};a=a.dispatch=Oh.bind(null,R,a);return [b.memoizedState,a]}
	function Rh(a,b,c,d){a={tag:a,create:b,destroy:c,deps:d,next:null};b=R.updateQueue;null===b?(b={lastEffect:null},R.updateQueue=b,b.lastEffect=a.next=a):(c=b.lastEffect,null===c?b.lastEffect=a.next=a:(d=c.next,c.next=a,a.next=d,b.lastEffect=a));return a}function Sh(a){var b=Hh();a={current:a};return b.memoizedState=a}function Th(){return Ih().memoizedState}function Uh(a,b,c,d){var e=Hh();R.flags|=a;e.memoizedState=Rh(1|b,c,void 0,void 0===d?null:d);}
	function Vh(a,b,c,d){var e=Ih();d=void 0===d?null:d;var f=void 0;if(null!==S){var g=S.memoizedState;f=g.destroy;if(null!==d&&Bh(d,g.deps)){Rh(b,c,f,d);return}}R.flags|=a;e.memoizedState=Rh(1|b,c,f,d);}function Wh(a,b){return Uh(516,4,a,b)}function Xh(a,b){return Vh(516,4,a,b)}function Yh(a,b){return Vh(4,2,a,b)}function Zh(a,b){if("function"===typeof b)return a=a(),b(a),function(){b(null);};if(null!==b&&void 0!==b)return a=a(),b.current=a,function(){b.current=null;}}
	function $h(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return Vh(4,2,Zh.bind(null,b,a),c)}function ai(){}function bi(a,b){var c=Ih();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&Bh(b,d[1]))return d[0];c.memoizedState=[a,b];return a}function ci(a,b){var c=Ih();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&Bh(b,d[1]))return d[0];a=a();c.memoizedState=[a,b];return a}
	function di(a,b){var c=eg();gg(98>c?98:c,function(){a(!0);});gg(97<c?97:c,function(){var c=wh.transition;wh.transition=1;try{a(!1),b();}finally{wh.transition=c;}});}
	function Oh(a,b,c){var d=Hg(),e=Ig(a),f={lane:e,action:c,eagerReducer:null,eagerState:null,next:null},g=b.pending;null===g?f.next=f:(f.next=g.next,g.next=f);b.pending=f;g=a.alternate;if(a===R||null!==g&&g===R)zh=yh=!0;else {if(0===a.lanes&&(null===g||0===g.lanes)&&(g=b.lastRenderedReducer,null!==g))try{var h=b.lastRenderedState,k=g(h,c);f.eagerReducer=g;f.eagerState=k;if(He(k,h))return}catch(l){}finally{}Jg(a,e,d);}}
	var Gh={readContext:vg,useCallback:Ah,useContext:Ah,useEffect:Ah,useImperativeHandle:Ah,useLayoutEffect:Ah,useMemo:Ah,useReducer:Ah,useRef:Ah,useState:Ah,useDebugValue:Ah,useDeferredValue:Ah,useTransition:Ah,useMutableSource:Ah,useOpaqueIdentifier:Ah,unstable_isNewReconciler:!1},Dh={readContext:vg,useCallback:function(a,b){Hh().memoizedState=[a,void 0===b?null:b];return a},useContext:vg,useEffect:Wh,useImperativeHandle:function(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return Uh(4,2,Zh.bind(null,
	b,a),c)},useLayoutEffect:function(a,b){return Uh(4,2,a,b)},useMemo:function(a,b){var c=Hh();b=void 0===b?null:b;a=a();c.memoizedState=[a,b];return a},useReducer:function(a,b,c){var d=Hh();b=void 0!==c?c(b):b;d.memoizedState=d.baseState=b;a=d.queue={pending:null,dispatch:null,lastRenderedReducer:a,lastRenderedState:b};a=a.dispatch=Oh.bind(null,R,a);return [d.memoizedState,a]},useRef:Sh,useState:Qh,useDebugValue:ai,useDeferredValue:function(a){var b=Qh(a),c=b[0],d=b[1];Wh(function(){var b=wh.transition;
	wh.transition=1;try{d(a);}finally{wh.transition=b;}},[a]);return c},useTransition:function(){var a=Qh(!1),b=a[0];a=di.bind(null,a[1]);Sh(a);return [a,b]},useMutableSource:function(a,b,c){var d=Hh();d.memoizedState={refs:{getSnapshot:b,setSnapshot:null},source:a,subscribe:c};return Nh(d,a,b,c)},useOpaqueIdentifier:function(){if(lh){var a=!1,b=uf(function(){a||(a=!0,c("r:"+(tf++).toString(36)));throw Error(y(355));}),c=Qh(b)[1];0===(R.mode&2)&&(R.flags|=516,Rh(5,function(){c("r:"+(tf++).toString(36));},
	void 0,null));return b}b="r:"+(tf++).toString(36);Qh(b);return b},unstable_isNewReconciler:!1},Eh={readContext:vg,useCallback:bi,useContext:vg,useEffect:Xh,useImperativeHandle:$h,useLayoutEffect:Yh,useMemo:ci,useReducer:Kh,useRef:Th,useState:function(){return Kh(Jh)},useDebugValue:ai,useDeferredValue:function(a){var b=Kh(Jh),c=b[0],d=b[1];Xh(function(){var b=wh.transition;wh.transition=1;try{d(a);}finally{wh.transition=b;}},[a]);return c},useTransition:function(){var a=Kh(Jh)[0];return [Th().current,
	a]},useMutableSource:Ph,useOpaqueIdentifier:function(){return Kh(Jh)[0]},unstable_isNewReconciler:!1},Fh={readContext:vg,useCallback:bi,useContext:vg,useEffect:Xh,useImperativeHandle:$h,useLayoutEffect:Yh,useMemo:ci,useReducer:Lh,useRef:Th,useState:function(){return Lh(Jh)},useDebugValue:ai,useDeferredValue:function(a){var b=Lh(Jh),c=b[0],d=b[1];Xh(function(){var b=wh.transition;wh.transition=1;try{d(a);}finally{wh.transition=b;}},[a]);return c},useTransition:function(){var a=Lh(Jh)[0];return [Th().current,
	a]},useMutableSource:Ph,useOpaqueIdentifier:function(){return Lh(Jh)[0]},unstable_isNewReconciler:!1},ei=ra.ReactCurrentOwner,ug=!1;function fi(a,b,c,d){b.child=null===a?Zg(b,null,c,d):Yg(b,a.child,c,d);}function gi(a,b,c,d,e){c=c.render;var f=b.ref;tg(b,e);d=Ch(a,b,c,d,f,e);if(null!==a&&!ug)return b.updateQueue=a.updateQueue,b.flags&=-517,a.lanes&=~e,hi(a,b,e);b.flags|=1;fi(a,b,d,e);return b.child}
	function ii(a,b,c,d,e,f){if(null===a){var g=c.type;if("function"===typeof g&&!ji(g)&&void 0===g.defaultProps&&null===c.compare&&void 0===c.defaultProps)return b.tag=15,b.type=g,ki(a,b,g,d,e,f);a=Vg(c.type,null,d,b,b.mode,f);a.ref=b.ref;a.return=b;return b.child=a}g=a.child;if(0===(e&f)&&(e=g.memoizedProps,c=c.compare,c=null!==c?c:Je,c(e,d)&&a.ref===b.ref))return hi(a,b,f);b.flags|=1;a=Tg(g,d);a.ref=b.ref;a.return=b;return b.child=a}
	function ki(a,b,c,d,e,f){if(null!==a&&Je(a.memoizedProps,d)&&a.ref===b.ref)if(ug=!1,0!==(f&e))0!==(a.flags&16384)&&(ug=!0);else return b.lanes=a.lanes,hi(a,b,f);return li(a,b,c,d,f)}
	function mi(a,b,c){var d=b.pendingProps,e=d.children,f=null!==a?a.memoizedState:null;if("hidden"===d.mode||"unstable-defer-without-hiding"===d.mode)if(0===(b.mode&4))b.memoizedState={baseLanes:0},ni(b,c);else if(0!==(c&1073741824))b.memoizedState={baseLanes:0},ni(b,null!==f?f.baseLanes:c);else return a=null!==f?f.baseLanes|c:c,b.lanes=b.childLanes=1073741824,b.memoizedState={baseLanes:a},ni(b,a),null;else null!==f?(d=f.baseLanes|c,b.memoizedState=null):d=c,ni(b,d);fi(a,b,e,c);return b.child}
	function oi(a,b){var c=b.ref;if(null===a&&null!==c||null!==a&&a.ref!==c)b.flags|=128;}function li(a,b,c,d,e){var f=Ff(c)?Df:M.current;f=Ef(b,f);tg(b,e);c=Ch(a,b,c,d,f,e);if(null!==a&&!ug)return b.updateQueue=a.updateQueue,b.flags&=-517,a.lanes&=~e,hi(a,b,e);b.flags|=1;fi(a,b,c,e);return b.child}
	function pi(a,b,c,d,e){if(Ff(c)){var f=!0;Jf(b);}else f=!1;tg(b,e);if(null===b.stateNode)null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2),Mg(b,c,d),Og(b,c,d,e),d=!0;else if(null===a){var g=b.stateNode,h=b.memoizedProps;g.props=h;var k=g.context,l=c.contextType;"object"===typeof l&&null!==l?l=vg(l):(l=Ff(c)?Df:M.current,l=Ef(b,l));var n=c.getDerivedStateFromProps,A="function"===typeof n||"function"===typeof g.getSnapshotBeforeUpdate;A||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&
	"function"!==typeof g.componentWillReceiveProps||(h!==d||k!==l)&&Ng(b,g,d,l);wg=!1;var p=b.memoizedState;g.state=p;Cg(b,d,g,e);k=b.memoizedState;h!==d||p!==k||N.current||wg?("function"===typeof n&&(Gg(b,c,n,d),k=b.memoizedState),(h=wg||Lg(b,c,h,d,p,k,l))?(A||"function"!==typeof g.UNSAFE_componentWillMount&&"function"!==typeof g.componentWillMount||("function"===typeof g.componentWillMount&&g.componentWillMount(),"function"===typeof g.UNSAFE_componentWillMount&&g.UNSAFE_componentWillMount()),"function"===
	typeof g.componentDidMount&&(b.flags|=4)):("function"===typeof g.componentDidMount&&(b.flags|=4),b.memoizedProps=d,b.memoizedState=k),g.props=d,g.state=k,g.context=l,d=h):("function"===typeof g.componentDidMount&&(b.flags|=4),d=!1);}else {g=b.stateNode;yg(a,b);h=b.memoizedProps;l=b.type===b.elementType?h:lg(b.type,h);g.props=l;A=b.pendingProps;p=g.context;k=c.contextType;"object"===typeof k&&null!==k?k=vg(k):(k=Ff(c)?Df:M.current,k=Ef(b,k));var C=c.getDerivedStateFromProps;(n="function"===typeof C||
	"function"===typeof g.getSnapshotBeforeUpdate)||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&"function"!==typeof g.componentWillReceiveProps||(h!==A||p!==k)&&Ng(b,g,d,k);wg=!1;p=b.memoizedState;g.state=p;Cg(b,d,g,e);var x=b.memoizedState;h!==A||p!==x||N.current||wg?("function"===typeof C&&(Gg(b,c,C,d),x=b.memoizedState),(l=wg||Lg(b,c,l,d,p,x,k))?(n||"function"!==typeof g.UNSAFE_componentWillUpdate&&"function"!==typeof g.componentWillUpdate||("function"===typeof g.componentWillUpdate&&g.componentWillUpdate(d,
	x,k),"function"===typeof g.UNSAFE_componentWillUpdate&&g.UNSAFE_componentWillUpdate(d,x,k)),"function"===typeof g.componentDidUpdate&&(b.flags|=4),"function"===typeof g.getSnapshotBeforeUpdate&&(b.flags|=256)):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&p===a.memoizedState||(b.flags|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&p===a.memoizedState||(b.flags|=256),b.memoizedProps=d,b.memoizedState=x),g.props=d,g.state=x,g.context=k,d=l):("function"!==typeof g.componentDidUpdate||
	h===a.memoizedProps&&p===a.memoizedState||(b.flags|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&p===a.memoizedState||(b.flags|=256),d=!1);}return qi(a,b,c,d,f,e)}
	function qi(a,b,c,d,e,f){oi(a,b);var g=0!==(b.flags&64);if(!d&&!g)return e&&Kf(b,c,!1),hi(a,b,f);d=b.stateNode;ei.current=b;var h=g&&"function"!==typeof c.getDerivedStateFromError?null:d.render();b.flags|=1;null!==a&&g?(b.child=Yg(b,a.child,null,f),b.child=Yg(b,null,h,f)):fi(a,b,h,f);b.memoizedState=d.state;e&&Kf(b,c,!0);return b.child}function ri(a){var b=a.stateNode;b.pendingContext?Hf(a,b.pendingContext,b.pendingContext!==b.context):b.context&&Hf(a,b.context,!1);eh(a,b.containerInfo);}
	var si={dehydrated:null,retryLane:0};
	function ti(a,b,c){var d=b.pendingProps,e=P.current,f=!1,g;(g=0!==(b.flags&64))||(g=null!==a&&null===a.memoizedState?!1:0!==(e&2));g?(f=!0,b.flags&=-65):null!==a&&null===a.memoizedState||void 0===d.fallback||!0===d.unstable_avoidThisFallback||(e|=1);I(P,e&1);if(null===a){void 0!==d.fallback&&ph(b);a=d.children;e=d.fallback;if(f)return a=ui(b,a,e,c),b.child.memoizedState={baseLanes:c},b.memoizedState=si,a;if("number"===typeof d.unstable_expectedLoadTime)return a=ui(b,a,e,c),b.child.memoizedState={baseLanes:c},
	b.memoizedState=si,b.lanes=33554432,a;c=vi({mode:"visible",children:a},b.mode,c,null);c.return=b;return b.child=c}if(null!==a.memoizedState){if(f)return d=wi(a,b,d.children,d.fallback,c),f=b.child,e=a.child.memoizedState,f.memoizedState=null===e?{baseLanes:c}:{baseLanes:e.baseLanes|c},f.childLanes=a.childLanes&~c,b.memoizedState=si,d;c=xi(a,b,d.children,c);b.memoizedState=null;return c}if(f)return d=wi(a,b,d.children,d.fallback,c),f=b.child,e=a.child.memoizedState,f.memoizedState=null===e?{baseLanes:c}:
	{baseLanes:e.baseLanes|c},f.childLanes=a.childLanes&~c,b.memoizedState=si,d;c=xi(a,b,d.children,c);b.memoizedState=null;return c}function ui(a,b,c,d){var e=a.mode,f=a.child;b={mode:"hidden",children:b};0===(e&2)&&null!==f?(f.childLanes=0,f.pendingProps=b):f=vi(b,e,0,null);c=Xg(c,e,d,null);f.return=a;c.return=a;f.sibling=c;a.child=f;return c}
	function xi(a,b,c,d){var e=a.child;a=e.sibling;c=Tg(e,{mode:"visible",children:c});0===(b.mode&2)&&(c.lanes=d);c.return=b;c.sibling=null;null!==a&&(a.nextEffect=null,a.flags=8,b.firstEffect=b.lastEffect=a);return b.child=c}
	function wi(a,b,c,d,e){var f=b.mode,g=a.child;a=g.sibling;var h={mode:"hidden",children:c};0===(f&2)&&b.child!==g?(c=b.child,c.childLanes=0,c.pendingProps=h,g=c.lastEffect,null!==g?(b.firstEffect=c.firstEffect,b.lastEffect=g,g.nextEffect=null):b.firstEffect=b.lastEffect=null):c=Tg(g,h);null!==a?d=Tg(a,d):(d=Xg(d,f,e,null),d.flags|=2);d.return=b;c.return=b;c.sibling=d;b.child=c;return d}function yi(a,b){a.lanes|=b;var c=a.alternate;null!==c&&(c.lanes|=b);sg(a.return,b);}
	function zi(a,b,c,d,e,f){var g=a.memoizedState;null===g?a.memoizedState={isBackwards:b,rendering:null,renderingStartTime:0,last:d,tail:c,tailMode:e,lastEffect:f}:(g.isBackwards=b,g.rendering=null,g.renderingStartTime=0,g.last=d,g.tail=c,g.tailMode=e,g.lastEffect=f);}
	function Ai(a,b,c){var d=b.pendingProps,e=d.revealOrder,f=d.tail;fi(a,b,d.children,c);d=P.current;if(0!==(d&2))d=d&1|2,b.flags|=64;else {if(null!==a&&0!==(a.flags&64))a:for(a=b.child;null!==a;){if(13===a.tag)null!==a.memoizedState&&yi(a,c);else if(19===a.tag)yi(a,c);else if(null!==a.child){a.child.return=a;a=a.child;continue}if(a===b)break a;for(;null===a.sibling;){if(null===a.return||a.return===b)break a;a=a.return;}a.sibling.return=a.return;a=a.sibling;}d&=1;}I(P,d);if(0===(b.mode&2))b.memoizedState=
	null;else switch(e){case "forwards":c=b.child;for(e=null;null!==c;)a=c.alternate,null!==a&&null===ih(a)&&(e=c),c=c.sibling;c=e;null===c?(e=b.child,b.child=null):(e=c.sibling,c.sibling=null);zi(b,!1,e,c,f,b.lastEffect);break;case "backwards":c=null;e=b.child;for(b.child=null;null!==e;){a=e.alternate;if(null!==a&&null===ih(a)){b.child=e;break}a=e.sibling;e.sibling=c;c=e;e=a;}zi(b,!0,c,null,f,b.lastEffect);break;case "together":zi(b,!1,null,null,void 0,b.lastEffect);break;default:b.memoizedState=null;}return b.child}
	function hi(a,b,c){null!==a&&(b.dependencies=a.dependencies);Dg|=b.lanes;if(0!==(c&b.childLanes)){if(null!==a&&b.child!==a.child)throw Error(y(153));if(null!==b.child){a=b.child;c=Tg(a,a.pendingProps);b.child=c;for(c.return=b;null!==a.sibling;)a=a.sibling,c=c.sibling=Tg(a,a.pendingProps),c.return=b;c.sibling=null;}return b.child}return null}var Bi,Ci,Di,Ei;
	Bi=function(a,b){for(var c=b.child;null!==c;){if(5===c.tag||6===c.tag)a.appendChild(c.stateNode);else if(4!==c.tag&&null!==c.child){c.child.return=c;c=c.child;continue}if(c===b)break;for(;null===c.sibling;){if(null===c.return||c.return===b)return;c=c.return;}c.sibling.return=c.return;c=c.sibling;}};Ci=function(){};
	Di=function(a,b,c,d){var e=a.memoizedProps;if(e!==d){a=b.stateNode;dh(ah.current);var f=null;switch(c){case "input":e=Ya(a,e);d=Ya(a,d);f=[];break;case "option":e=eb(a,e);d=eb(a,d);f=[];break;case "select":e=m({},e,{value:void 0});d=m({},d,{value:void 0});f=[];break;case "textarea":e=gb(a,e);d=gb(a,d);f=[];break;default:"function"!==typeof e.onClick&&"function"===typeof d.onClick&&(a.onclick=jf);}vb(c,d);var g;c=null;for(l in e)if(!d.hasOwnProperty(l)&&e.hasOwnProperty(l)&&null!=e[l])if("style"===
	l){var h=e[l];for(g in h)h.hasOwnProperty(g)&&(c||(c={}),c[g]="");}else "dangerouslySetInnerHTML"!==l&&"children"!==l&&"suppressContentEditableWarning"!==l&&"suppressHydrationWarning"!==l&&"autoFocus"!==l&&(ca.hasOwnProperty(l)?f||(f=[]):(f=f||[]).push(l,null));for(l in d){var k=d[l];h=null!=e?e[l]:void 0;if(d.hasOwnProperty(l)&&k!==h&&(null!=k||null!=h))if("style"===l)if(h){for(g in h)!h.hasOwnProperty(g)||k&&k.hasOwnProperty(g)||(c||(c={}),c[g]="");for(g in k)k.hasOwnProperty(g)&&h[g]!==k[g]&&(c||
	(c={}),c[g]=k[g]);}else c||(f||(f=[]),f.push(l,c)),c=k;else "dangerouslySetInnerHTML"===l?(k=k?k.__html:void 0,h=h?h.__html:void 0,null!=k&&h!==k&&(f=f||[]).push(l,k)):"children"===l?"string"!==typeof k&&"number"!==typeof k||(f=f||[]).push(l,""+k):"suppressContentEditableWarning"!==l&&"suppressHydrationWarning"!==l&&(ca.hasOwnProperty(l)?(null!=k&&"onScroll"===l&&G("scroll",a),f||h===k||(f=[])):"object"===typeof k&&null!==k&&k.$$typeof===Ga?k.toString():(f=f||[]).push(l,k));}c&&(f=f||[]).push("style",
	c);var l=f;if(b.updateQueue=l)b.flags|=4;}};Ei=function(a,b,c,d){c!==d&&(b.flags|=4);};function Fi(a,b){if(!lh)switch(a.tailMode){case "hidden":b=a.tail;for(var c=null;null!==b;)null!==b.alternate&&(c=b),b=b.sibling;null===c?a.tail=null:c.sibling=null;break;case "collapsed":c=a.tail;for(var d=null;null!==c;)null!==c.alternate&&(d=c),c=c.sibling;null===d?b||null===a.tail?a.tail=null:a.tail.sibling=null:d.sibling=null;}}
	function Gi(a,b,c){var d=b.pendingProps;switch(b.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return null;case 1:return Ff(b.type)&&Gf(),null;case 3:fh();H(N);H(M);uh();d=b.stateNode;d.pendingContext&&(d.context=d.pendingContext,d.pendingContext=null);if(null===a||null===a.child)rh(b)?b.flags|=4:d.hydrate||(b.flags|=256);Ci(b);return null;case 5:hh(b);var e=dh(ch.current);c=b.type;if(null!==a&&null!=b.stateNode)Di(a,b,c,d,e),a.ref!==b.ref&&(b.flags|=128);else {if(!d){if(null===
	b.stateNode)throw Error(y(166));return null}a=dh(ah.current);if(rh(b)){d=b.stateNode;c=b.type;var f=b.memoizedProps;d[wf]=b;d[xf]=f;switch(c){case "dialog":G("cancel",d);G("close",d);break;case "iframe":case "object":case "embed":G("load",d);break;case "video":case "audio":for(a=0;a<Xe.length;a++)G(Xe[a],d);break;case "source":G("error",d);break;case "img":case "image":case "link":G("error",d);G("load",d);break;case "details":G("toggle",d);break;case "input":Za(d,f);G("invalid",d);break;case "select":d._wrapperState=
	{wasMultiple:!!f.multiple};G("invalid",d);break;case "textarea":hb(d,f),G("invalid",d);}vb(c,f);a=null;for(var g in f)f.hasOwnProperty(g)&&(e=f[g],"children"===g?"string"===typeof e?d.textContent!==e&&(a=["children",e]):"number"===typeof e&&d.textContent!==""+e&&(a=["children",""+e]):ca.hasOwnProperty(g)&&null!=e&&"onScroll"===g&&G("scroll",d));switch(c){case "input":Va(d);cb(d,f,!0);break;case "textarea":Va(d);jb(d);break;case "select":case "option":break;default:"function"===typeof f.onClick&&(d.onclick=
	jf);}d=a;b.updateQueue=d;null!==d&&(b.flags|=4);}else {g=9===e.nodeType?e:e.ownerDocument;a===kb.html&&(a=lb(c));a===kb.html?"script"===c?(a=g.createElement("div"),a.innerHTML="<script>\x3c/script>",a=a.removeChild(a.firstChild)):"string"===typeof d.is?a=g.createElement(c,{is:d.is}):(a=g.createElement(c),"select"===c&&(g=a,d.multiple?g.multiple=!0:d.size&&(g.size=d.size))):a=g.createElementNS(a,c);a[wf]=b;a[xf]=d;Bi(a,b,!1,!1);b.stateNode=a;g=wb(c,d);switch(c){case "dialog":G("cancel",a);G("close",a);
	e=d;break;case "iframe":case "object":case "embed":G("load",a);e=d;break;case "video":case "audio":for(e=0;e<Xe.length;e++)G(Xe[e],a);e=d;break;case "source":G("error",a);e=d;break;case "img":case "image":case "link":G("error",a);G("load",a);e=d;break;case "details":G("toggle",a);e=d;break;case "input":Za(a,d);e=Ya(a,d);G("invalid",a);break;case "option":e=eb(a,d);break;case "select":a._wrapperState={wasMultiple:!!d.multiple};e=m({},d,{value:void 0});G("invalid",a);break;case "textarea":hb(a,d);e=
	gb(a,d);G("invalid",a);break;default:e=d;}vb(c,e);var h=e;for(f in h)if(h.hasOwnProperty(f)){var k=h[f];"style"===f?tb(a,k):"dangerouslySetInnerHTML"===f?(k=k?k.__html:void 0,null!=k&&ob(a,k)):"children"===f?"string"===typeof k?("textarea"!==c||""!==k)&&pb(a,k):"number"===typeof k&&pb(a,""+k):"suppressContentEditableWarning"!==f&&"suppressHydrationWarning"!==f&&"autoFocus"!==f&&(ca.hasOwnProperty(f)?null!=k&&"onScroll"===f&&G("scroll",a):null!=k&&qa(a,f,k,g));}switch(c){case "input":Va(a);cb(a,d,!1);
	break;case "textarea":Va(a);jb(a);break;case "option":null!=d.value&&a.setAttribute("value",""+Sa(d.value));break;case "select":a.multiple=!!d.multiple;f=d.value;null!=f?fb(a,!!d.multiple,f,!1):null!=d.defaultValue&&fb(a,!!d.multiple,d.defaultValue,!0);break;default:"function"===typeof e.onClick&&(a.onclick=jf);}mf(c,d)&&(b.flags|=4);}null!==b.ref&&(b.flags|=128);}return null;case 6:if(a&&null!=b.stateNode)Ei(a,b,a.memoizedProps,d);else {if("string"!==typeof d&&null===b.stateNode)throw Error(y(166));
	c=dh(ch.current);dh(ah.current);rh(b)?(d=b.stateNode,c=b.memoizedProps,d[wf]=b,d.nodeValue!==c&&(b.flags|=4)):(d=(9===c.nodeType?c:c.ownerDocument).createTextNode(d),d[wf]=b,b.stateNode=d);}return null;case 13:H(P);d=b.memoizedState;if(0!==(b.flags&64))return b.lanes=c,b;d=null!==d;c=!1;null===a?void 0!==b.memoizedProps.fallback&&rh(b):c=null!==a.memoizedState;if(d&&!c&&0!==(b.mode&2))if(null===a&&!0!==b.memoizedProps.unstable_avoidThisFallback||0!==(P.current&1))0===V&&(V=3);else {if(0===V||3===V)V=
	4;null===U||0===(Dg&134217727)&&0===(Hi&134217727)||Ii(U,W);}if(d||c)b.flags|=4;return null;case 4:return fh(),Ci(b),null===a&&cf(b.stateNode.containerInfo),null;case 10:return rg(b),null;case 17:return Ff(b.type)&&Gf(),null;case 19:H(P);d=b.memoizedState;if(null===d)return null;f=0!==(b.flags&64);g=d.rendering;if(null===g)if(f)Fi(d,!1);else {if(0!==V||null!==a&&0!==(a.flags&64))for(a=b.child;null!==a;){g=ih(a);if(null!==g){b.flags|=64;Fi(d,!1);f=g.updateQueue;null!==f&&(b.updateQueue=f,b.flags|=4);
	null===d.lastEffect&&(b.firstEffect=null);b.lastEffect=d.lastEffect;d=c;for(c=b.child;null!==c;)f=c,a=d,f.flags&=2,f.nextEffect=null,f.firstEffect=null,f.lastEffect=null,g=f.alternate,null===g?(f.childLanes=0,f.lanes=a,f.child=null,f.memoizedProps=null,f.memoizedState=null,f.updateQueue=null,f.dependencies=null,f.stateNode=null):(f.childLanes=g.childLanes,f.lanes=g.lanes,f.child=g.child,f.memoizedProps=g.memoizedProps,f.memoizedState=g.memoizedState,f.updateQueue=g.updateQueue,f.type=g.type,a=g.dependencies,
	f.dependencies=null===a?null:{lanes:a.lanes,firstContext:a.firstContext}),c=c.sibling;I(P,P.current&1|2);return b.child}a=a.sibling;}null!==d.tail&&O()>Ji&&(b.flags|=64,f=!0,Fi(d,!1),b.lanes=33554432);}else {if(!f)if(a=ih(g),null!==a){if(b.flags|=64,f=!0,c=a.updateQueue,null!==c&&(b.updateQueue=c,b.flags|=4),Fi(d,!0),null===d.tail&&"hidden"===d.tailMode&&!g.alternate&&!lh)return b=b.lastEffect=d.lastEffect,null!==b&&(b.nextEffect=null),null}else 2*O()-d.renderingStartTime>Ji&&1073741824!==c&&(b.flags|=
	64,f=!0,Fi(d,!1),b.lanes=33554432);d.isBackwards?(g.sibling=b.child,b.child=g):(c=d.last,null!==c?c.sibling=g:b.child=g,d.last=g);}return null!==d.tail?(c=d.tail,d.rendering=c,d.tail=c.sibling,d.lastEffect=b.lastEffect,d.renderingStartTime=O(),c.sibling=null,b=P.current,I(P,f?b&1|2:b&1),c):null;case 23:case 24:return Ki(),null!==a&&null!==a.memoizedState!==(null!==b.memoizedState)&&"unstable-defer-without-hiding"!==d.mode&&(b.flags|=4),null}throw Error(y(156,b.tag));}
	function Li(a){switch(a.tag){case 1:Ff(a.type)&&Gf();var b=a.flags;return b&4096?(a.flags=b&-4097|64,a):null;case 3:fh();H(N);H(M);uh();b=a.flags;if(0!==(b&64))throw Error(y(285));a.flags=b&-4097|64;return a;case 5:return hh(a),null;case 13:return H(P),b=a.flags,b&4096?(a.flags=b&-4097|64,a):null;case 19:return H(P),null;case 4:return fh(),null;case 10:return rg(a),null;case 23:case 24:return Ki(),null;default:return null}}
	function Mi(a,b){try{var c="",d=b;do c+=Qa(d),d=d.return;while(d);var e=c;}catch(f){e="\nError generating stack: "+f.message+"\n"+f.stack;}return {value:a,source:b,stack:e}}function Ni(a,b){try{console.error(b.value);}catch(c){setTimeout(function(){throw c;});}}var Oi="function"===typeof WeakMap?WeakMap:Map;function Pi(a,b,c){c=zg(-1,c);c.tag=3;c.payload={element:null};var d=b.value;c.callback=function(){Qi||(Qi=!0,Ri=d);Ni(a,b);};return c}
	function Si(a,b,c){c=zg(-1,c);c.tag=3;var d=a.type.getDerivedStateFromError;if("function"===typeof d){var e=b.value;c.payload=function(){Ni(a,b);return d(e)};}var f=a.stateNode;null!==f&&"function"===typeof f.componentDidCatch&&(c.callback=function(){"function"!==typeof d&&(null===Ti?Ti=new Set([this]):Ti.add(this),Ni(a,b));var c=b.stack;this.componentDidCatch(b.value,{componentStack:null!==c?c:""});});return c}var Ui="function"===typeof WeakSet?WeakSet:Set;
	function Vi(a){var b=a.ref;if(null!==b)if("function"===typeof b)try{b(null);}catch(c){Wi(a,c);}else b.current=null;}function Xi(a,b){switch(b.tag){case 0:case 11:case 15:case 22:return;case 1:if(b.flags&256&&null!==a){var c=a.memoizedProps,d=a.memoizedState;a=b.stateNode;b=a.getSnapshotBeforeUpdate(b.elementType===b.type?c:lg(b.type,c),d);a.__reactInternalSnapshotBeforeUpdate=b;}return;case 3:b.flags&256&&qf(b.stateNode.containerInfo);return;case 5:case 6:case 4:case 17:return}throw Error(y(163));}
	function Yi(a,b,c){switch(c.tag){case 0:case 11:case 15:case 22:b=c.updateQueue;b=null!==b?b.lastEffect:null;if(null!==b){a=b=b.next;do{if(3===(a.tag&3)){var d=a.create;a.destroy=d();}a=a.next;}while(a!==b)}b=c.updateQueue;b=null!==b?b.lastEffect:null;if(null!==b){a=b=b.next;do{var e=a;d=e.next;e=e.tag;0!==(e&4)&&0!==(e&1)&&(Zi(c,a),$i(c,a));a=d;}while(a!==b)}return;case 1:a=c.stateNode;c.flags&4&&(null===b?a.componentDidMount():(d=c.elementType===c.type?b.memoizedProps:lg(c.type,b.memoizedProps),a.componentDidUpdate(d,
	b.memoizedState,a.__reactInternalSnapshotBeforeUpdate)));b=c.updateQueue;null!==b&&Eg(c,b,a);return;case 3:b=c.updateQueue;if(null!==b){a=null;if(null!==c.child)switch(c.child.tag){case 5:a=c.child.stateNode;break;case 1:a=c.child.stateNode;}Eg(c,b,a);}return;case 5:a=c.stateNode;null===b&&c.flags&4&&mf(c.type,c.memoizedProps)&&a.focus();return;case 6:return;case 4:return;case 12:return;case 13:null===c.memoizedState&&(c=c.alternate,null!==c&&(c=c.memoizedState,null!==c&&(c=c.dehydrated,null!==c&&Cc(c))));
	return;case 19:case 17:case 20:case 21:case 23:case 24:return}throw Error(y(163));}
	function aj(a,b){for(var c=a;;){if(5===c.tag){var d=c.stateNode;if(b)d=d.style,"function"===typeof d.setProperty?d.setProperty("display","none","important"):d.display="none";else {d=c.stateNode;var e=c.memoizedProps.style;e=void 0!==e&&null!==e&&e.hasOwnProperty("display")?e.display:null;d.style.display=sb("display",e);}}else if(6===c.tag)c.stateNode.nodeValue=b?"":c.memoizedProps;else if((23!==c.tag&&24!==c.tag||null===c.memoizedState||c===a)&&null!==c.child){c.child.return=c;c=c.child;continue}if(c===
	a)break;for(;null===c.sibling;){if(null===c.return||c.return===a)return;c=c.return;}c.sibling.return=c.return;c=c.sibling;}}
	function bj(a,b){if(Mf&&"function"===typeof Mf.onCommitFiberUnmount)try{Mf.onCommitFiberUnmount(Lf,b);}catch(f){}switch(b.tag){case 0:case 11:case 14:case 15:case 22:a=b.updateQueue;if(null!==a&&(a=a.lastEffect,null!==a)){var c=a=a.next;do{var d=c,e=d.destroy;d=d.tag;if(void 0!==e)if(0!==(d&4))Zi(b,c);else {d=b;try{e();}catch(f){Wi(d,f);}}c=c.next;}while(c!==a)}break;case 1:Vi(b);a=b.stateNode;if("function"===typeof a.componentWillUnmount)try{a.props=b.memoizedProps,a.state=b.memoizedState,a.componentWillUnmount();}catch(f){Wi(b,
	f);}break;case 5:Vi(b);break;case 4:cj(a,b);}}function dj(a){a.alternate=null;a.child=null;a.dependencies=null;a.firstEffect=null;a.lastEffect=null;a.memoizedProps=null;a.memoizedState=null;a.pendingProps=null;a.return=null;a.updateQueue=null;}function ej(a){return 5===a.tag||3===a.tag||4===a.tag}
	function fj(a){a:{for(var b=a.return;null!==b;){if(ej(b))break a;b=b.return;}throw Error(y(160));}var c=b;b=c.stateNode;switch(c.tag){case 5:var d=!1;break;case 3:b=b.containerInfo;d=!0;break;case 4:b=b.containerInfo;d=!0;break;default:throw Error(y(161));}c.flags&16&&(pb(b,""),c.flags&=-17);a:b:for(c=a;;){for(;null===c.sibling;){if(null===c.return||ej(c.return)){c=null;break a}c=c.return;}c.sibling.return=c.return;for(c=c.sibling;5!==c.tag&&6!==c.tag&&18!==c.tag;){if(c.flags&2)continue b;if(null===
	c.child||4===c.tag)continue b;else c.child.return=c,c=c.child;}if(!(c.flags&2)){c=c.stateNode;break a}}d?gj(a,c,b):hj(a,c,b);}
	function gj(a,b,c){var d=a.tag,e=5===d||6===d;if(e)a=e?a.stateNode:a.stateNode.instance,b?8===c.nodeType?c.parentNode.insertBefore(a,b):c.insertBefore(a,b):(8===c.nodeType?(b=c.parentNode,b.insertBefore(a,c)):(b=c,b.appendChild(a)),c=c._reactRootContainer,null!==c&&void 0!==c||null!==b.onclick||(b.onclick=jf));else if(4!==d&&(a=a.child,null!==a))for(gj(a,b,c),a=a.sibling;null!==a;)gj(a,b,c),a=a.sibling;}
	function hj(a,b,c){var d=a.tag,e=5===d||6===d;if(e)a=e?a.stateNode:a.stateNode.instance,b?c.insertBefore(a,b):c.appendChild(a);else if(4!==d&&(a=a.child,null!==a))for(hj(a,b,c),a=a.sibling;null!==a;)hj(a,b,c),a=a.sibling;}
	function cj(a,b){for(var c=b,d=!1,e,f;;){if(!d){d=c.return;a:for(;;){if(null===d)throw Error(y(160));e=d.stateNode;switch(d.tag){case 5:f=!1;break a;case 3:e=e.containerInfo;f=!0;break a;case 4:e=e.containerInfo;f=!0;break a}d=d.return;}d=!0;}if(5===c.tag||6===c.tag){a:for(var g=a,h=c,k=h;;)if(bj(g,k),null!==k.child&&4!==k.tag)k.child.return=k,k=k.child;else {if(k===h)break a;for(;null===k.sibling;){if(null===k.return||k.return===h)break a;k=k.return;}k.sibling.return=k.return;k=k.sibling;}f?(g=e,h=c.stateNode,
	8===g.nodeType?g.parentNode.removeChild(h):g.removeChild(h)):e.removeChild(c.stateNode);}else if(4===c.tag){if(null!==c.child){e=c.stateNode.containerInfo;f=!0;c.child.return=c;c=c.child;continue}}else if(bj(a,c),null!==c.child){c.child.return=c;c=c.child;continue}if(c===b)break;for(;null===c.sibling;){if(null===c.return||c.return===b)return;c=c.return;4===c.tag&&(d=!1);}c.sibling.return=c.return;c=c.sibling;}}
	function ij(a,b){switch(b.tag){case 0:case 11:case 14:case 15:case 22:var c=b.updateQueue;c=null!==c?c.lastEffect:null;if(null!==c){var d=c=c.next;do 3===(d.tag&3)&&(a=d.destroy,d.destroy=void 0,void 0!==a&&a()),d=d.next;while(d!==c)}return;case 1:return;case 5:c=b.stateNode;if(null!=c){d=b.memoizedProps;var e=null!==a?a.memoizedProps:d;a=b.type;var f=b.updateQueue;b.updateQueue=null;if(null!==f){c[xf]=d;"input"===a&&"radio"===d.type&&null!=d.name&&$a(c,d);wb(a,e);b=wb(a,d);for(e=0;e<f.length;e+=
	2){var g=f[e],h=f[e+1];"style"===g?tb(c,h):"dangerouslySetInnerHTML"===g?ob(c,h):"children"===g?pb(c,h):qa(c,g,h,b);}switch(a){case "input":ab(c,d);break;case "textarea":ib(c,d);break;case "select":a=c._wrapperState.wasMultiple,c._wrapperState.wasMultiple=!!d.multiple,f=d.value,null!=f?fb(c,!!d.multiple,f,!1):a!==!!d.multiple&&(null!=d.defaultValue?fb(c,!!d.multiple,d.defaultValue,!0):fb(c,!!d.multiple,d.multiple?[]:"",!1));}}}return;case 6:if(null===b.stateNode)throw Error(y(162));b.stateNode.nodeValue=
	b.memoizedProps;return;case 3:c=b.stateNode;c.hydrate&&(c.hydrate=!1,Cc(c.containerInfo));return;case 12:return;case 13:null!==b.memoizedState&&(jj=O(),aj(b.child,!0));kj(b);return;case 19:kj(b);return;case 17:return;case 23:case 24:aj(b,null!==b.memoizedState);return}throw Error(y(163));}function kj(a){var b=a.updateQueue;if(null!==b){a.updateQueue=null;var c=a.stateNode;null===c&&(c=a.stateNode=new Ui);b.forEach(function(b){var d=lj.bind(null,a,b);c.has(b)||(c.add(b),b.then(d,d));});}}
	function mj(a,b){return null!==a&&(a=a.memoizedState,null===a||null!==a.dehydrated)?(b=b.memoizedState,null!==b&&null===b.dehydrated):!1}var nj=Math.ceil,oj=ra.ReactCurrentDispatcher,pj=ra.ReactCurrentOwner,X=0,U=null,Y=null,W=0,qj=0,rj=Bf(0),V=0,sj=null,tj=0,Dg=0,Hi=0,uj=0,vj=null,jj=0,Ji=Infinity;function wj(){Ji=O()+500;}var Z=null,Qi=!1,Ri=null,Ti=null,xj=!1,yj=null,zj=90,Aj=[],Bj=[],Cj=null,Dj=0,Ej=null,Fj=-1,Gj=0,Hj=0,Ij=null,Jj=!1;function Hg(){return 0!==(X&48)?O():-1!==Fj?Fj:Fj=O()}
	function Ig(a){a=a.mode;if(0===(a&2))return 1;if(0===(a&4))return 99===eg()?1:2;0===Gj&&(Gj=tj);if(0!==kg.transition){0!==Hj&&(Hj=null!==vj?vj.pendingLanes:0);a=Gj;var b=4186112&~Hj;b&=-b;0===b&&(a=4186112&~a,b=a&-a,0===b&&(b=8192));return b}a=eg();0!==(X&4)&&98===a?a=Xc(12,Gj):(a=Sc(a),a=Xc(a,Gj));return a}
	function Jg(a,b,c){if(50<Dj)throw Dj=0,Ej=null,Error(y(185));a=Kj(a,b);if(null===a)return null;$c(a,b,c);a===U&&(Hi|=b,4===V&&Ii(a,W));var d=eg();1===b?0!==(X&8)&&0===(X&48)?Lj(a):(Mj(a,c),0===X&&(wj(),ig())):(0===(X&4)||98!==d&&99!==d||(null===Cj?Cj=new Set([a]):Cj.add(a)),Mj(a,c));vj=a;}function Kj(a,b){a.lanes|=b;var c=a.alternate;null!==c&&(c.lanes|=b);c=a;for(a=a.return;null!==a;)a.childLanes|=b,c=a.alternate,null!==c&&(c.childLanes|=b),c=a,a=a.return;return 3===c.tag?c.stateNode:null}
	function Mj(a,b){for(var c=a.callbackNode,d=a.suspendedLanes,e=a.pingedLanes,f=a.expirationTimes,g=a.pendingLanes;0<g;){var h=31-Vc(g),k=1<<h,l=f[h];if(-1===l){if(0===(k&d)||0!==(k&e)){l=b;Rc(k);var n=F;f[h]=10<=n?l+250:6<=n?l+5E3:-1;}}else l<=b&&(a.expiredLanes|=k);g&=~k;}d=Uc(a,a===U?W:0);b=F;if(0===d)null!==c&&(c!==Zf&&Pf(c),a.callbackNode=null,a.callbackPriority=0);else {if(null!==c){if(a.callbackPriority===b)return;c!==Zf&&Pf(c);}15===b?(c=Lj.bind(null,a),null===ag?(ag=[c],bg=Of(Uf,jg)):ag.push(c),
	c=Zf):14===b?c=hg(99,Lj.bind(null,a)):(c=Tc(b),c=hg(c,Nj.bind(null,a)));a.callbackPriority=b;a.callbackNode=c;}}
	function Nj(a){Fj=-1;Hj=Gj=0;if(0!==(X&48))throw Error(y(327));var b=a.callbackNode;if(Oj()&&a.callbackNode!==b)return null;var c=Uc(a,a===U?W:0);if(0===c)return null;var d=c;var e=X;X|=16;var f=Pj();if(U!==a||W!==d)wj(),Qj(a,d);do try{Rj();break}catch(h){Sj(a,h);}while(1);qg();oj.current=f;X=e;null!==Y?d=0:(U=null,W=0,d=V);if(0!==(tj&Hi))Qj(a,0);else if(0!==d){2===d&&(X|=64,a.hydrate&&(a.hydrate=!1,qf(a.containerInfo)),c=Wc(a),0!==c&&(d=Tj(a,c)));if(1===d)throw b=sj,Qj(a,0),Ii(a,c),Mj(a,O()),b;a.finishedWork=
	a.current.alternate;a.finishedLanes=c;switch(d){case 0:case 1:throw Error(y(345));case 2:Uj(a);break;case 3:Ii(a,c);if((c&62914560)===c&&(d=jj+500-O(),10<d)){if(0!==Uc(a,0))break;e=a.suspendedLanes;if((e&c)!==c){Hg();a.pingedLanes|=a.suspendedLanes&e;break}a.timeoutHandle=of(Uj.bind(null,a),d);break}Uj(a);break;case 4:Ii(a,c);if((c&4186112)===c)break;d=a.eventTimes;for(e=-1;0<c;){var g=31-Vc(c);f=1<<g;g=d[g];g>e&&(e=g);c&=~f;}c=e;c=O()-c;c=(120>c?120:480>c?480:1080>c?1080:1920>c?1920:3E3>c?3E3:4320>
	c?4320:1960*nj(c/1960))-c;if(10<c){a.timeoutHandle=of(Uj.bind(null,a),c);break}Uj(a);break;case 5:Uj(a);break;default:throw Error(y(329));}}Mj(a,O());return a.callbackNode===b?Nj.bind(null,a):null}function Ii(a,b){b&=~uj;b&=~Hi;a.suspendedLanes|=b;a.pingedLanes&=~b;for(a=a.expirationTimes;0<b;){var c=31-Vc(b),d=1<<c;a[c]=-1;b&=~d;}}
	function Lj(a){if(0!==(X&48))throw Error(y(327));Oj();if(a===U&&0!==(a.expiredLanes&W)){var b=W;var c=Tj(a,b);0!==(tj&Hi)&&(b=Uc(a,b),c=Tj(a,b));}else b=Uc(a,0),c=Tj(a,b);0!==a.tag&&2===c&&(X|=64,a.hydrate&&(a.hydrate=!1,qf(a.containerInfo)),b=Wc(a),0!==b&&(c=Tj(a,b)));if(1===c)throw c=sj,Qj(a,0),Ii(a,b),Mj(a,O()),c;a.finishedWork=a.current.alternate;a.finishedLanes=b;Uj(a);Mj(a,O());return null}
	function Vj(){if(null!==Cj){var a=Cj;Cj=null;a.forEach(function(a){a.expiredLanes|=24&a.pendingLanes;Mj(a,O());});}ig();}function Wj(a,b){var c=X;X|=1;try{return a(b)}finally{X=c,0===X&&(wj(),ig());}}function Xj(a,b){var c=X;X&=-2;X|=8;try{return a(b)}finally{X=c,0===X&&(wj(),ig());}}function ni(a,b){I(rj,qj);qj|=b;tj|=b;}function Ki(){qj=rj.current;H(rj);}
	function Qj(a,b){a.finishedWork=null;a.finishedLanes=0;var c=a.timeoutHandle;-1!==c&&(a.timeoutHandle=-1,pf(c));if(null!==Y)for(c=Y.return;null!==c;){var d=c;switch(d.tag){case 1:d=d.type.childContextTypes;null!==d&&void 0!==d&&Gf();break;case 3:fh();H(N);H(M);uh();break;case 5:hh(d);break;case 4:fh();break;case 13:H(P);break;case 19:H(P);break;case 10:rg(d);break;case 23:case 24:Ki();}c=c.return;}U=a;Y=Tg(a.current,null);W=qj=tj=b;V=0;sj=null;uj=Hi=Dg=0;}
	function Sj(a,b){do{var c=Y;try{qg();vh.current=Gh;if(yh){for(var d=R.memoizedState;null!==d;){var e=d.queue;null!==e&&(e.pending=null);d=d.next;}yh=!1;}xh=0;T=S=R=null;zh=!1;pj.current=null;if(null===c||null===c.return){V=1;sj=b;Y=null;break}a:{var f=a,g=c.return,h=c,k=b;b=W;h.flags|=2048;h.firstEffect=h.lastEffect=null;if(null!==k&&"object"===typeof k&&"function"===typeof k.then){var l=k;if(0===(h.mode&2)){var n=h.alternate;n?(h.updateQueue=n.updateQueue,h.memoizedState=n.memoizedState,h.lanes=n.lanes):
	(h.updateQueue=null,h.memoizedState=null);}var A=0!==(P.current&1),p=g;do{var C;if(C=13===p.tag){var x=p.memoizedState;if(null!==x)C=null!==x.dehydrated?!0:!1;else {var w=p.memoizedProps;C=void 0===w.fallback?!1:!0!==w.unstable_avoidThisFallback?!0:A?!1:!0;}}if(C){var z=p.updateQueue;if(null===z){var u=new Set;u.add(l);p.updateQueue=u;}else z.add(l);if(0===(p.mode&2)){p.flags|=64;h.flags|=16384;h.flags&=-2981;if(1===h.tag)if(null===h.alternate)h.tag=17;else {var t=zg(-1,1);t.tag=2;Ag(h,t);}h.lanes|=1;break a}k=
	void 0;h=b;var q=f.pingCache;null===q?(q=f.pingCache=new Oi,k=new Set,q.set(l,k)):(k=q.get(l),void 0===k&&(k=new Set,q.set(l,k)));if(!k.has(h)){k.add(h);var v=Yj.bind(null,f,l,h);l.then(v,v);}p.flags|=4096;p.lanes=b;break a}p=p.return;}while(null!==p);k=Error((Ra(h.type)||"A React component")+" suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display.");}5!==V&&(V=2);k=Mi(k,h);p=
	g;do{switch(p.tag){case 3:f=k;p.flags|=4096;b&=-b;p.lanes|=b;var J=Pi(p,f,b);Bg(p,J);break a;case 1:f=k;var K=p.type,Q=p.stateNode;if(0===(p.flags&64)&&("function"===typeof K.getDerivedStateFromError||null!==Q&&"function"===typeof Q.componentDidCatch&&(null===Ti||!Ti.has(Q)))){p.flags|=4096;b&=-b;p.lanes|=b;var L=Si(p,f,b);Bg(p,L);break a}}p=p.return;}while(null!==p)}Zj(c);}catch(va){b=va;Y===c&&null!==c&&(Y=c=c.return);continue}break}while(1)}
	function Pj(){var a=oj.current;oj.current=Gh;return null===a?Gh:a}function Tj(a,b){var c=X;X|=16;var d=Pj();U===a&&W===b||Qj(a,b);do try{ak();break}catch(e){Sj(a,e);}while(1);qg();X=c;oj.current=d;if(null!==Y)throw Error(y(261));U=null;W=0;return V}function ak(){for(;null!==Y;)bk(Y);}function Rj(){for(;null!==Y&&!Qf();)bk(Y);}function bk(a){var b=ck(a.alternate,a,qj);a.memoizedProps=a.pendingProps;null===b?Zj(a):Y=b;pj.current=null;}
	function Zj(a){var b=a;do{var c=b.alternate;a=b.return;if(0===(b.flags&2048)){c=Gi(c,b,qj);if(null!==c){Y=c;return}c=b;if(24!==c.tag&&23!==c.tag||null===c.memoizedState||0!==(qj&1073741824)||0===(c.mode&4)){for(var d=0,e=c.child;null!==e;)d|=e.lanes|e.childLanes,e=e.sibling;c.childLanes=d;}null!==a&&0===(a.flags&2048)&&(null===a.firstEffect&&(a.firstEffect=b.firstEffect),null!==b.lastEffect&&(null!==a.lastEffect&&(a.lastEffect.nextEffect=b.firstEffect),a.lastEffect=b.lastEffect),1<b.flags&&(null!==
	a.lastEffect?a.lastEffect.nextEffect=b:a.firstEffect=b,a.lastEffect=b));}else {c=Li(b);if(null!==c){c.flags&=2047;Y=c;return}null!==a&&(a.firstEffect=a.lastEffect=null,a.flags|=2048);}b=b.sibling;if(null!==b){Y=b;return}Y=b=a;}while(null!==b);0===V&&(V=5);}function Uj(a){var b=eg();gg(99,dk.bind(null,a,b));return null}
	function dk(a,b){do Oj();while(null!==yj);if(0!==(X&48))throw Error(y(327));var c=a.finishedWork;if(null===c)return null;a.finishedWork=null;a.finishedLanes=0;if(c===a.current)throw Error(y(177));a.callbackNode=null;var d=c.lanes|c.childLanes,e=d,f=a.pendingLanes&~e;a.pendingLanes=e;a.suspendedLanes=0;a.pingedLanes=0;a.expiredLanes&=e;a.mutableReadLanes&=e;a.entangledLanes&=e;e=a.entanglements;for(var g=a.eventTimes,h=a.expirationTimes;0<f;){var k=31-Vc(f),l=1<<k;e[k]=0;g[k]=-1;h[k]=-1;f&=~l;}null!==
	Cj&&0===(d&24)&&Cj.has(a)&&Cj.delete(a);a===U&&(Y=U=null,W=0);1<c.flags?null!==c.lastEffect?(c.lastEffect.nextEffect=c,d=c.firstEffect):d=c:d=c.firstEffect;if(null!==d){e=X;X|=32;pj.current=null;kf=fd;g=Ne();if(Oe(g)){if("selectionStart"in g)h={start:g.selectionStart,end:g.selectionEnd};else a:if(h=(h=g.ownerDocument)&&h.defaultView||window,(l=h.getSelection&&h.getSelection())&&0!==l.rangeCount){h=l.anchorNode;f=l.anchorOffset;k=l.focusNode;l=l.focusOffset;try{h.nodeType,k.nodeType;}catch(va){h=null;
	break a}var n=0,A=-1,p=-1,C=0,x=0,w=g,z=null;b:for(;;){for(var u;;){w!==h||0!==f&&3!==w.nodeType||(A=n+f);w!==k||0!==l&&3!==w.nodeType||(p=n+l);3===w.nodeType&&(n+=w.nodeValue.length);if(null===(u=w.firstChild))break;z=w;w=u;}for(;;){if(w===g)break b;z===h&&++C===f&&(A=n);z===k&&++x===l&&(p=n);if(null!==(u=w.nextSibling))break;w=z;z=w.parentNode;}w=u;}h=-1===A||-1===p?null:{start:A,end:p};}else h=null;h=h||{start:0,end:0};}else h=null;lf={focusedElem:g,selectionRange:h};fd=!1;Ij=null;Jj=!1;Z=d;do try{ek();}catch(va){if(null===
	Z)throw Error(y(330));Wi(Z,va);Z=Z.nextEffect;}while(null!==Z);Ij=null;Z=d;do try{for(g=a;null!==Z;){var t=Z.flags;t&16&&pb(Z.stateNode,"");if(t&128){var q=Z.alternate;if(null!==q){var v=q.ref;null!==v&&("function"===typeof v?v(null):v.current=null);}}switch(t&1038){case 2:fj(Z);Z.flags&=-3;break;case 6:fj(Z);Z.flags&=-3;ij(Z.alternate,Z);break;case 1024:Z.flags&=-1025;break;case 1028:Z.flags&=-1025;ij(Z.alternate,Z);break;case 4:ij(Z.alternate,Z);break;case 8:h=Z;cj(g,h);var J=h.alternate;dj(h);null!==
	J&&dj(J);}Z=Z.nextEffect;}}catch(va){if(null===Z)throw Error(y(330));Wi(Z,va);Z=Z.nextEffect;}while(null!==Z);v=lf;q=Ne();t=v.focusedElem;g=v.selectionRange;if(q!==t&&t&&t.ownerDocument&&Me(t.ownerDocument.documentElement,t)){null!==g&&Oe(t)&&(q=g.start,v=g.end,void 0===v&&(v=q),"selectionStart"in t?(t.selectionStart=q,t.selectionEnd=Math.min(v,t.value.length)):(v=(q=t.ownerDocument||document)&&q.defaultView||window,v.getSelection&&(v=v.getSelection(),h=t.textContent.length,J=Math.min(g.start,h),g=void 0===
	g.end?J:Math.min(g.end,h),!v.extend&&J>g&&(h=g,g=J,J=h),h=Le(t,J),f=Le(t,g),h&&f&&(1!==v.rangeCount||v.anchorNode!==h.node||v.anchorOffset!==h.offset||v.focusNode!==f.node||v.focusOffset!==f.offset)&&(q=q.createRange(),q.setStart(h.node,h.offset),v.removeAllRanges(),J>g?(v.addRange(q),v.extend(f.node,f.offset)):(q.setEnd(f.node,f.offset),v.addRange(q))))));q=[];for(v=t;v=v.parentNode;)1===v.nodeType&&q.push({element:v,left:v.scrollLeft,top:v.scrollTop});"function"===typeof t.focus&&t.focus();for(t=
	0;t<q.length;t++)v=q[t],v.element.scrollLeft=v.left,v.element.scrollTop=v.top;}fd=!!kf;lf=kf=null;a.current=c;Z=d;do try{for(t=a;null!==Z;){var K=Z.flags;K&36&&Yi(t,Z.alternate,Z);if(K&128){q=void 0;var Q=Z.ref;if(null!==Q){var L=Z.stateNode;switch(Z.tag){case 5:q=L;break;default:q=L;}"function"===typeof Q?Q(q):Q.current=q;}}Z=Z.nextEffect;}}catch(va){if(null===Z)throw Error(y(330));Wi(Z,va);Z=Z.nextEffect;}while(null!==Z);Z=null;$f();X=e;}else a.current=c;if(xj)xj=!1,yj=a,zj=b;else for(Z=d;null!==Z;)b=
	Z.nextEffect,Z.nextEffect=null,Z.flags&8&&(K=Z,K.sibling=null,K.stateNode=null),Z=b;d=a.pendingLanes;0===d&&(Ti=null);1===d?a===Ej?Dj++:(Dj=0,Ej=a):Dj=0;c=c.stateNode;if(Mf&&"function"===typeof Mf.onCommitFiberRoot)try{Mf.onCommitFiberRoot(Lf,c,void 0,64===(c.current.flags&64));}catch(va){}Mj(a,O());if(Qi)throw Qi=!1,a=Ri,Ri=null,a;if(0!==(X&8))return null;ig();return null}
	function ek(){for(;null!==Z;){var a=Z.alternate;Jj||null===Ij||(0!==(Z.flags&8)?dc(Z,Ij)&&(Jj=!0):13===Z.tag&&mj(a,Z)&&dc(Z,Ij)&&(Jj=!0));var b=Z.flags;0!==(b&256)&&Xi(a,Z);0===(b&512)||xj||(xj=!0,hg(97,function(){Oj();return null}));Z=Z.nextEffect;}}function Oj(){if(90!==zj){var a=97<zj?97:zj;zj=90;return gg(a,fk)}return !1}function $i(a,b){Aj.push(b,a);xj||(xj=!0,hg(97,function(){Oj();return null}));}function Zi(a,b){Bj.push(b,a);xj||(xj=!0,hg(97,function(){Oj();return null}));}
	function fk(){if(null===yj)return !1;var a=yj;yj=null;if(0!==(X&48))throw Error(y(331));var b=X;X|=32;var c=Bj;Bj=[];for(var d=0;d<c.length;d+=2){var e=c[d],f=c[d+1],g=e.destroy;e.destroy=void 0;if("function"===typeof g)try{g();}catch(k){if(null===f)throw Error(y(330));Wi(f,k);}}c=Aj;Aj=[];for(d=0;d<c.length;d+=2){e=c[d];f=c[d+1];try{var h=e.create;e.destroy=h();}catch(k){if(null===f)throw Error(y(330));Wi(f,k);}}for(h=a.current.firstEffect;null!==h;)a=h.nextEffect,h.nextEffect=null,h.flags&8&&(h.sibling=
	null,h.stateNode=null),h=a;X=b;ig();return !0}function gk(a,b,c){b=Mi(c,b);b=Pi(a,b,1);Ag(a,b);b=Hg();a=Kj(a,1);null!==a&&($c(a,1,b),Mj(a,b));}
	function Wi(a,b){if(3===a.tag)gk(a,a,b);else for(var c=a.return;null!==c;){if(3===c.tag){gk(c,a,b);break}else if(1===c.tag){var d=c.stateNode;if("function"===typeof c.type.getDerivedStateFromError||"function"===typeof d.componentDidCatch&&(null===Ti||!Ti.has(d))){a=Mi(b,a);var e=Si(c,a,1);Ag(c,e);e=Hg();c=Kj(c,1);if(null!==c)$c(c,1,e),Mj(c,e);else if("function"===typeof d.componentDidCatch&&(null===Ti||!Ti.has(d)))try{d.componentDidCatch(b,a);}catch(f){}break}}c=c.return;}}
	function Yj(a,b,c){var d=a.pingCache;null!==d&&d.delete(b);b=Hg();a.pingedLanes|=a.suspendedLanes&c;U===a&&(W&c)===c&&(4===V||3===V&&(W&62914560)===W&&500>O()-jj?Qj(a,0):uj|=c);Mj(a,b);}function lj(a,b){var c=a.stateNode;null!==c&&c.delete(b);b=0;0===b&&(b=a.mode,0===(b&2)?b=1:0===(b&4)?b=99===eg()?1:2:(0===Gj&&(Gj=tj),b=Yc(62914560&~Gj),0===b&&(b=4194304)));c=Hg();a=Kj(a,b);null!==a&&($c(a,b,c),Mj(a,c));}var ck;
	ck=function(a,b,c){var d=b.lanes;if(null!==a)if(a.memoizedProps!==b.pendingProps||N.current)ug=!0;else if(0!==(c&d))ug=0!==(a.flags&16384)?!0:!1;else {ug=!1;switch(b.tag){case 3:ri(b);sh();break;case 5:gh(b);break;case 1:Ff(b.type)&&Jf(b);break;case 4:eh(b,b.stateNode.containerInfo);break;case 10:d=b.memoizedProps.value;var e=b.type._context;I(mg,e._currentValue);e._currentValue=d;break;case 13:if(null!==b.memoizedState){if(0!==(c&b.child.childLanes))return ti(a,b,c);I(P,P.current&1);b=hi(a,b,c);return null!==
	b?b.sibling:null}I(P,P.current&1);break;case 19:d=0!==(c&b.childLanes);if(0!==(a.flags&64)){if(d)return Ai(a,b,c);b.flags|=64;}e=b.memoizedState;null!==e&&(e.rendering=null,e.tail=null,e.lastEffect=null);I(P,P.current);if(d)break;else return null;case 23:case 24:return b.lanes=0,mi(a,b,c)}return hi(a,b,c)}else ug=!1;b.lanes=0;switch(b.tag){case 2:d=b.type;null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2);a=b.pendingProps;e=Ef(b,M.current);tg(b,c);e=Ch(null,b,d,a,e,c);b.flags|=1;if("object"===
	typeof e&&null!==e&&"function"===typeof e.render&&void 0===e.$$typeof){b.tag=1;b.memoizedState=null;b.updateQueue=null;if(Ff(d)){var f=!0;Jf(b);}else f=!1;b.memoizedState=null!==e.state&&void 0!==e.state?e.state:null;xg(b);var g=d.getDerivedStateFromProps;"function"===typeof g&&Gg(b,d,g,a);e.updater=Kg;b.stateNode=e;e._reactInternals=b;Og(b,d,a,c);b=qi(null,b,d,!0,f,c);}else b.tag=0,fi(null,b,e,c),b=b.child;return b;case 16:e=b.elementType;a:{null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2);
	a=b.pendingProps;f=e._init;e=f(e._payload);b.type=e;f=b.tag=hk(e);a=lg(e,a);switch(f){case 0:b=li(null,b,e,a,c);break a;case 1:b=pi(null,b,e,a,c);break a;case 11:b=gi(null,b,e,a,c);break a;case 14:b=ii(null,b,e,lg(e.type,a),d,c);break a}throw Error(y(306,e,""));}return b;case 0:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:lg(d,e),li(a,b,d,e,c);case 1:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:lg(d,e),pi(a,b,d,e,c);case 3:ri(b);d=b.updateQueue;if(null===a||null===d)throw Error(y(282));
	d=b.pendingProps;e=b.memoizedState;e=null!==e?e.element:null;yg(a,b);Cg(b,d,null,c);d=b.memoizedState.element;if(d===e)sh(),b=hi(a,b,c);else {e=b.stateNode;if(f=e.hydrate)kh=rf(b.stateNode.containerInfo.firstChild),jh=b,f=lh=!0;if(f){a=e.mutableSourceEagerHydrationData;if(null!=a)for(e=0;e<a.length;e+=2)f=a[e],f._workInProgressVersionPrimary=a[e+1],th.push(f);c=Zg(b,null,d,c);for(b.child=c;c;)c.flags=c.flags&-3|1024,c=c.sibling;}else fi(a,b,d,c),sh();b=b.child;}return b;case 5:return gh(b),null===a&&
	ph(b),d=b.type,e=b.pendingProps,f=null!==a?a.memoizedProps:null,g=e.children,nf(d,e)?g=null:null!==f&&nf(d,f)&&(b.flags|=16),oi(a,b),fi(a,b,g,c),b.child;case 6:return null===a&&ph(b),null;case 13:return ti(a,b,c);case 4:return eh(b,b.stateNode.containerInfo),d=b.pendingProps,null===a?b.child=Yg(b,null,d,c):fi(a,b,d,c),b.child;case 11:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:lg(d,e),gi(a,b,d,e,c);case 7:return fi(a,b,b.pendingProps,c),b.child;case 8:return fi(a,b,b.pendingProps.children,
	c),b.child;case 12:return fi(a,b,b.pendingProps.children,c),b.child;case 10:a:{d=b.type._context;e=b.pendingProps;g=b.memoizedProps;f=e.value;var h=b.type._context;I(mg,h._currentValue);h._currentValue=f;if(null!==g)if(h=g.value,f=He(h,f)?0:("function"===typeof d._calculateChangedBits?d._calculateChangedBits(h,f):1073741823)|0,0===f){if(g.children===e.children&&!N.current){b=hi(a,b,c);break a}}else for(h=b.child,null!==h&&(h.return=b);null!==h;){var k=h.dependencies;if(null!==k){g=h.child;for(var l=
	k.firstContext;null!==l;){if(l.context===d&&0!==(l.observedBits&f)){1===h.tag&&(l=zg(-1,c&-c),l.tag=2,Ag(h,l));h.lanes|=c;l=h.alternate;null!==l&&(l.lanes|=c);sg(h.return,c);k.lanes|=c;break}l=l.next;}}else g=10===h.tag?h.type===b.type?null:h.child:h.child;if(null!==g)g.return=h;else for(g=h;null!==g;){if(g===b){g=null;break}h=g.sibling;if(null!==h){h.return=g.return;g=h;break}g=g.return;}h=g;}fi(a,b,e.children,c);b=b.child;}return b;case 9:return e=b.type,f=b.pendingProps,d=f.children,tg(b,c),e=vg(e,
	f.unstable_observedBits),d=d(e),b.flags|=1,fi(a,b,d,c),b.child;case 14:return e=b.type,f=lg(e,b.pendingProps),f=lg(e.type,f),ii(a,b,e,f,d,c);case 15:return ki(a,b,b.type,b.pendingProps,d,c);case 17:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:lg(d,e),null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2),b.tag=1,Ff(d)?(a=!0,Jf(b)):a=!1,tg(b,c),Mg(b,d,e),Og(b,d,e,c),qi(null,b,d,!0,a,c);case 19:return Ai(a,b,c);case 23:return mi(a,b,c);case 24:return mi(a,b,c)}throw Error(y(156,b.tag));
	};function ik(a,b,c,d){this.tag=a;this.key=c;this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null;this.index=0;this.ref=null;this.pendingProps=b;this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null;this.mode=d;this.flags=0;this.lastEffect=this.firstEffect=this.nextEffect=null;this.childLanes=this.lanes=0;this.alternate=null;}function nh(a,b,c,d){return new ik(a,b,c,d)}function ji(a){a=a.prototype;return !(!a||!a.isReactComponent)}
	function hk(a){if("function"===typeof a)return ji(a)?1:0;if(void 0!==a&&null!==a){a=a.$$typeof;if(a===Aa)return 11;if(a===Da)return 14}return 2}
	function Tg(a,b){var c=a.alternate;null===c?(c=nh(a.tag,b,a.key,a.mode),c.elementType=a.elementType,c.type=a.type,c.stateNode=a.stateNode,c.alternate=a,a.alternate=c):(c.pendingProps=b,c.type=a.type,c.flags=0,c.nextEffect=null,c.firstEffect=null,c.lastEffect=null);c.childLanes=a.childLanes;c.lanes=a.lanes;c.child=a.child;c.memoizedProps=a.memoizedProps;c.memoizedState=a.memoizedState;c.updateQueue=a.updateQueue;b=a.dependencies;c.dependencies=null===b?null:{lanes:b.lanes,firstContext:b.firstContext};
	c.sibling=a.sibling;c.index=a.index;c.ref=a.ref;return c}
	function Vg(a,b,c,d,e,f){var g=2;d=a;if("function"===typeof a)ji(a)&&(g=1);else if("string"===typeof a)g=5;else a:switch(a){case ua:return Xg(c.children,e,f,b);case Ha:g=8;e|=16;break;case wa:g=8;e|=1;break;case xa:return a=nh(12,c,b,e|8),a.elementType=xa,a.type=xa,a.lanes=f,a;case Ba:return a=nh(13,c,b,e),a.type=Ba,a.elementType=Ba,a.lanes=f,a;case Ca:return a=nh(19,c,b,e),a.elementType=Ca,a.lanes=f,a;case Ia:return vi(c,e,f,b);case Ja:return a=nh(24,c,b,e),a.elementType=Ja,a.lanes=f,a;default:if("object"===
	typeof a&&null!==a)switch(a.$$typeof){case ya:g=10;break a;case za:g=9;break a;case Aa:g=11;break a;case Da:g=14;break a;case Ea:g=16;d=null;break a;case Fa:g=22;break a}throw Error(y(130,null==a?a:typeof a,""));}b=nh(g,c,b,e);b.elementType=a;b.type=d;b.lanes=f;return b}function Xg(a,b,c,d){a=nh(7,a,d,b);a.lanes=c;return a}function vi(a,b,c,d){a=nh(23,a,d,b);a.elementType=Ia;a.lanes=c;return a}function Ug(a,b,c){a=nh(6,a,null,b);a.lanes=c;return a}
	function Wg(a,b,c){b=nh(4,null!==a.children?a.children:[],a.key,b);b.lanes=c;b.stateNode={containerInfo:a.containerInfo,pendingChildren:null,implementation:a.implementation};return b}
	function jk(a,b,c){this.tag=b;this.containerInfo=a;this.finishedWork=this.pingCache=this.current=this.pendingChildren=null;this.timeoutHandle=-1;this.pendingContext=this.context=null;this.hydrate=c;this.callbackNode=null;this.callbackPriority=0;this.eventTimes=Zc(0);this.expirationTimes=Zc(-1);this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0;this.entanglements=Zc(0);this.mutableSourceEagerHydrationData=null;}
	function kk(a,b,c){var d=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return {$$typeof:ta,key:null==d?null:""+d,children:a,containerInfo:b,implementation:c}}
	function lk(a,b,c,d){var e=b.current,f=Hg(),g=Ig(e);a:if(c){c=c._reactInternals;b:{if(Zb(c)!==c||1!==c.tag)throw Error(y(170));var h=c;do{switch(h.tag){case 3:h=h.stateNode.context;break b;case 1:if(Ff(h.type)){h=h.stateNode.__reactInternalMemoizedMergedChildContext;break b}}h=h.return;}while(null!==h);throw Error(y(171));}if(1===c.tag){var k=c.type;if(Ff(k)){c=If(c,k,h);break a}}c=h;}else c=Cf;null===b.context?b.context=c:b.pendingContext=c;b=zg(f,g);b.payload={element:a};d=void 0===d?null:d;null!==
	d&&(b.callback=d);Ag(e,b);Jg(e,g,f);return g}function mk(a){a=a.current;if(!a.child)return null;switch(a.child.tag){case 5:return a.child.stateNode;default:return a.child.stateNode}}function nk(a,b){a=a.memoizedState;if(null!==a&&null!==a.dehydrated){var c=a.retryLane;a.retryLane=0!==c&&c<b?c:b;}}function ok(a,b){nk(a,b);(a=a.alternate)&&nk(a,b);}function pk(){return null}
	function qk(a,b,c){var d=null!=c&&null!=c.hydrationOptions&&c.hydrationOptions.mutableSources||null;c=new jk(a,b,null!=c&&!0===c.hydrate);b=nh(3,null,null,2===b?7:1===b?3:0);c.current=b;b.stateNode=c;xg(b);a[ff]=c.current;cf(8===a.nodeType?a.parentNode:a);if(d)for(a=0;a<d.length;a++){b=d[a];var e=b._getVersion;e=e(b._source);null==c.mutableSourceEagerHydrationData?c.mutableSourceEagerHydrationData=[b,e]:c.mutableSourceEagerHydrationData.push(b,e);}this._internalRoot=c;}
	qk.prototype.render=function(a){lk(a,this._internalRoot,null,null);};qk.prototype.unmount=function(){var a=this._internalRoot,b=a.containerInfo;lk(null,a,null,function(){b[ff]=null;});};function rk(a){return !(!a||1!==a.nodeType&&9!==a.nodeType&&11!==a.nodeType&&(8!==a.nodeType||" react-mount-point-unstable "!==a.nodeValue))}
	function sk(a,b){b||(b=a?9===a.nodeType?a.documentElement:a.firstChild:null,b=!(!b||1!==b.nodeType||!b.hasAttribute("data-reactroot")));if(!b)for(var c;c=a.lastChild;)a.removeChild(c);return new qk(a,0,b?{hydrate:!0}:void 0)}
	function tk(a,b,c,d,e){var f=c._reactRootContainer;if(f){var g=f._internalRoot;if("function"===typeof e){var h=e;e=function(){var a=mk(g);h.call(a);};}lk(b,g,a,e);}else {f=c._reactRootContainer=sk(c,d);g=f._internalRoot;if("function"===typeof e){var k=e;e=function(){var a=mk(g);k.call(a);};}Xj(function(){lk(b,g,a,e);});}return mk(g)}ec=function(a){if(13===a.tag){var b=Hg();Jg(a,4,b);ok(a,4);}};fc=function(a){if(13===a.tag){var b=Hg();Jg(a,67108864,b);ok(a,67108864);}};
	gc=function(a){if(13===a.tag){var b=Hg(),c=Ig(a);Jg(a,c,b);ok(a,c);}};hc=function(a,b){return b()};
	yb=function(a,b,c){switch(b){case "input":ab(a,c);b=c.name;if("radio"===c.type&&null!=b){for(c=a;c.parentNode;)c=c.parentNode;c=c.querySelectorAll("input[name="+JSON.stringify(""+b)+'][type="radio"]');for(b=0;b<c.length;b++){var d=c[b];if(d!==a&&d.form===a.form){var e=Db(d);if(!e)throw Error(y(90));Wa(d);ab(d,e);}}}break;case "textarea":ib(a,c);break;case "select":b=c.value,null!=b&&fb(a,!!c.multiple,b,!1);}};Gb=Wj;
	Hb=function(a,b,c,d,e){var f=X;X|=4;try{return gg(98,a.bind(null,b,c,d,e))}finally{X=f,0===X&&(wj(),ig());}};Ib=function(){0===(X&49)&&(Vj(),Oj());};Jb=function(a,b){var c=X;X|=2;try{return a(b)}finally{X=c,0===X&&(wj(),ig());}};function uk(a,b){var c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!rk(b))throw Error(y(200));return kk(a,b,null,c)}var vk={Events:[Cb,ue,Db,Eb,Fb,Oj,{current:!1}]},wk={findFiberByHostInstance:wc,bundleType:0,version:"17.0.2",rendererPackageName:"react-dom"};
	var xk={bundleType:wk.bundleType,version:wk.version,rendererPackageName:wk.rendererPackageName,rendererConfig:wk.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ra.ReactCurrentDispatcher,findHostInstanceByFiber:function(a){a=cc(a);return null===a?null:a.stateNode},findFiberByHostInstance:wk.findFiberByHostInstance||
	pk,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null};if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__){var yk=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!yk.isDisabled&&yk.supportsFiber)try{Lf=yk.inject(xk),Mf=yk;}catch(a){}}reactDom_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=vk;reactDom_production_min.createPortal=uk;
	reactDom_production_min.findDOMNode=function(a){if(null==a)return null;if(1===a.nodeType)return a;var b=a._reactInternals;if(void 0===b){if("function"===typeof a.render)throw Error(y(188));throw Error(y(268,Object.keys(a)));}a=cc(b);a=null===a?null:a.stateNode;return a};reactDom_production_min.flushSync=function(a,b){var c=X;if(0!==(c&48))return a(b);X|=1;try{if(a)return gg(99,a.bind(null,b))}finally{X=c,ig();}};reactDom_production_min.hydrate=function(a,b,c){if(!rk(b))throw Error(y(200));return tk(null,a,b,!0,c)};
	reactDom_production_min.render=function(a,b,c){if(!rk(b))throw Error(y(200));return tk(null,a,b,!1,c)};reactDom_production_min.unmountComponentAtNode=function(a){if(!rk(a))throw Error(y(40));return a._reactRootContainer?(Xj(function(){tk(null,null,a,!1,function(){a._reactRootContainer=null;a[ff]=null;});}),!0):!1};reactDom_production_min.unstable_batchedUpdates=Wj;reactDom_production_min.unstable_createPortal=function(a,b){return uk(a,b,2<arguments.length&&void 0!==arguments[2]?arguments[2]:null)};
	reactDom_production_min.unstable_renderSubtreeIntoContainer=function(a,b,c,d){if(!rk(c))throw Error(y(200));if(null==a||void 0===a._reactInternals)throw Error(y(38));return tk(a,b,c,!1,d)};reactDom_production_min.version="17.0.2";
	return reactDom_production_min;
}

function checkDCE() {
  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
  if (
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' ||
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function'
  ) {
    return;
  }
  try {
    // Verify that the code above has been dead code eliminated (DCE'd).
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    // DevTools shouldn't crash React, no matter what.
    // We should still report in case we break this code.
    console.error(err);
  }
}

{
  // DCE check should happen before ReactDOM bundle executes so that
  // DevTools can report bad minification during injection.
  checkDCE();
  reactDom.exports = requireReactDom_production_min();
}

var reactDomExports = reactDom.exports;
var ReactDOM = /*@__PURE__*/getDefaultExportFromCjs(reactDomExports);

const FLASH_NOTIFICATIONS_KEY = "HC_FLASH_NOTIFICATIONS";

//These notifications are shown only on the next page when the user is redirected.
function addFlashNotification(notification) {
    try {
        const currentValue = window.sessionStorage.getItem(FLASH_NOTIFICATIONS_KEY);
        const notifications = currentValue
            ? JSON.parse(currentValue)
            : [];
        notifications.push(notification);
        window.sessionStorage.setItem(FLASH_NOTIFICATIONS_KEY, JSON.stringify(notifications));
    }
    catch (e) {
        console.error("Cannot add flash notification", e);
    }
}

const consoleLogger = {
  type: 'logger',
  log(args) {
    this.output('log', args);
  },
  warn(args) {
    this.output('warn', args);
  },
  error(args) {
    this.output('error', args);
  },
  output(type, args) {
    if (console && console[type]) console[type].apply(console, args);
  }
};
class Logger {
  constructor(concreteLogger) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    this.init(concreteLogger, options);
  }
  init(concreteLogger) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    this.prefix = options.prefix || 'i18next:';
    this.logger = concreteLogger || consoleLogger;
    this.options = options;
    this.debug = options.debug;
  }
  log() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return this.forward(args, 'log', '', true);
  }
  warn() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    return this.forward(args, 'warn', '', true);
  }
  error() {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }
    return this.forward(args, 'error', '');
  }
  deprecate() {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }
    return this.forward(args, 'warn', 'WARNING DEPRECATED: ', true);
  }
  forward(args, lvl, prefix, debugOnly) {
    if (debugOnly && !this.debug) return null;
    if (typeof args[0] === 'string') args[0] = `${prefix}${this.prefix} ${args[0]}`;
    return this.logger[lvl](args);
  }
  create(moduleName) {
    return new Logger(this.logger, {
      ...{
        prefix: `${this.prefix}:${moduleName}:`
      },
      ...this.options
    });
  }
  clone(options) {
    options = options || this.options;
    options.prefix = options.prefix || this.prefix;
    return new Logger(this.logger, options);
  }
}
var baseLogger = new Logger();

class EventEmitter {
  constructor() {
    this.observers = {};
  }
  on(events, listener) {
    events.split(' ').forEach(event => {
      if (!this.observers[event]) this.observers[event] = new Map();
      const numListeners = this.observers[event].get(listener) || 0;
      this.observers[event].set(listener, numListeners + 1);
    });
    return this;
  }
  off(event, listener) {
    if (!this.observers[event]) return;
    if (!listener) {
      delete this.observers[event];
      return;
    }
    this.observers[event].delete(listener);
  }
  emit(event) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    if (this.observers[event]) {
      const cloned = Array.from(this.observers[event].entries());
      cloned.forEach(_ref => {
        let [observer, numTimesAdded] = _ref;
        for (let i = 0; i < numTimesAdded; i++) {
          observer(...args);
        }
      });
    }
    if (this.observers['*']) {
      const cloned = Array.from(this.observers['*'].entries());
      cloned.forEach(_ref2 => {
        let [observer, numTimesAdded] = _ref2;
        for (let i = 0; i < numTimesAdded; i++) {
          observer.apply(observer, [event, ...args]);
        }
      });
    }
  }
}

function defer() {
  let res;
  let rej;
  const promise = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });
  promise.resolve = res;
  promise.reject = rej;
  return promise;
}
function makeString(object) {
  if (object == null) return '';
  return '' + object;
}
function copy(a, s, t) {
  a.forEach(m => {
    if (s[m]) t[m] = s[m];
  });
}
const lastOfPathSeparatorRegExp = /###/g;
function getLastOfPath(object, path, Empty) {
  function cleanKey(key) {
    return key && key.indexOf('###') > -1 ? key.replace(lastOfPathSeparatorRegExp, '.') : key;
  }
  function canNotTraverseDeeper() {
    return !object || typeof object === 'string';
  }
  const stack = typeof path !== 'string' ? path : path.split('.');
  let stackIndex = 0;
  while (stackIndex < stack.length - 1) {
    if (canNotTraverseDeeper()) return {};
    const key = cleanKey(stack[stackIndex]);
    if (!object[key] && Empty) object[key] = new Empty();
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      object = object[key];
    } else {
      object = {};
    }
    ++stackIndex;
  }
  if (canNotTraverseDeeper()) return {};
  return {
    obj: object,
    k: cleanKey(stack[stackIndex])
  };
}
function setPath(object, path, newValue) {
  const {
    obj,
    k
  } = getLastOfPath(object, path, Object);
  if (obj !== undefined || path.length === 1) {
    obj[k] = newValue;
    return;
  }
  let e = path[path.length - 1];
  let p = path.slice(0, path.length - 1);
  let last = getLastOfPath(object, p, Object);
  while (last.obj === undefined && p.length) {
    e = `${p[p.length - 1]}.${e}`;
    p = p.slice(0, p.length - 1);
    last = getLastOfPath(object, p, Object);
    if (last && last.obj && typeof last.obj[`${last.k}.${e}`] !== 'undefined') {
      last.obj = undefined;
    }
  }
  last.obj[`${last.k}.${e}`] = newValue;
}
function pushPath(object, path, newValue, concat) {
  const {
    obj,
    k
  } = getLastOfPath(object, path, Object);
  obj[k] = obj[k] || [];
  if (concat) obj[k] = obj[k].concat(newValue);
  if (!concat) obj[k].push(newValue);
}
function getPath(object, path) {
  const {
    obj,
    k
  } = getLastOfPath(object, path);
  if (!obj) return undefined;
  return obj[k];
}
function getPathWithDefaults(data, defaultData, key) {
  const value = getPath(data, key);
  if (value !== undefined) {
    return value;
  }
  return getPath(defaultData, key);
}
function deepExtend(target, source, overwrite) {
  for (const prop in source) {
    if (prop !== '__proto__' && prop !== 'constructor') {
      if (prop in target) {
        if (typeof target[prop] === 'string' || target[prop] instanceof String || typeof source[prop] === 'string' || source[prop] instanceof String) {
          if (overwrite) target[prop] = source[prop];
        } else {
          deepExtend(target[prop], source[prop], overwrite);
        }
      } else {
        target[prop] = source[prop];
      }
    }
  }
  return target;
}
function regexEscape(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}
var _entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;'
};
function escape(data) {
  if (typeof data === 'string') {
    return data.replace(/[&<>"'\/]/g, s => _entityMap[s]);
  }
  return data;
}
class RegExpCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.regExpMap = new Map();
    this.regExpQueue = [];
  }
  getRegExp(pattern) {
    const regExpFromCache = this.regExpMap.get(pattern);
    if (regExpFromCache !== undefined) {
      return regExpFromCache;
    }
    const regExpNew = new RegExp(pattern);
    if (this.regExpQueue.length === this.capacity) {
      this.regExpMap.delete(this.regExpQueue.shift());
    }
    this.regExpMap.set(pattern, regExpNew);
    this.regExpQueue.push(pattern);
    return regExpNew;
  }
}
const chars = [' ', ',', '?', '!', ';'];
const looksLikeObjectPathRegExpCache = new RegExpCache(20);
function looksLikeObjectPath(key, nsSeparator, keySeparator) {
  nsSeparator = nsSeparator || '';
  keySeparator = keySeparator || '';
  const possibleChars = chars.filter(c => nsSeparator.indexOf(c) < 0 && keySeparator.indexOf(c) < 0);
  if (possibleChars.length === 0) return true;
  const r = looksLikeObjectPathRegExpCache.getRegExp(`(${possibleChars.map(c => c === '?' ? '\\?' : c).join('|')})`);
  let matched = !r.test(key);
  if (!matched) {
    const ki = key.indexOf(keySeparator);
    if (ki > 0 && !r.test(key.substring(0, ki))) {
      matched = true;
    }
  }
  return matched;
}
function deepFind(obj, path) {
  let keySeparator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '.';
  if (!obj) return undefined;
  if (obj[path]) return obj[path];
  const tokens = path.split(keySeparator);
  let current = obj;
  for (let i = 0; i < tokens.length;) {
    if (!current || typeof current !== 'object') {
      return undefined;
    }
    let next;
    let nextPath = '';
    for (let j = i; j < tokens.length; ++j) {
      if (j !== i) {
        nextPath += keySeparator;
      }
      nextPath += tokens[j];
      next = current[nextPath];
      if (next !== undefined) {
        if (['string', 'number', 'boolean'].indexOf(typeof next) > -1 && j < tokens.length - 1) {
          continue;
        }
        i += j - i + 1;
        break;
      }
    }
    current = next;
  }
  return current;
}
function getCleanedCode(code) {
  if (code && code.indexOf('_') > 0) return code.replace('_', '-');
  return code;
}

class ResourceStore extends EventEmitter {
  constructor(data) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      ns: ['translation'],
      defaultNS: 'translation'
    };
    super();
    this.data = data || {};
    this.options = options;
    if (this.options.keySeparator === undefined) {
      this.options.keySeparator = '.';
    }
    if (this.options.ignoreJSONStructure === undefined) {
      this.options.ignoreJSONStructure = true;
    }
  }
  addNamespaces(ns) {
    if (this.options.ns.indexOf(ns) < 0) {
      this.options.ns.push(ns);
    }
  }
  removeNamespaces(ns) {
    const index = this.options.ns.indexOf(ns);
    if (index > -1) {
      this.options.ns.splice(index, 1);
    }
  }
  getResource(lng, ns, key) {
    let options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    const keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;
    const ignoreJSONStructure = options.ignoreJSONStructure !== undefined ? options.ignoreJSONStructure : this.options.ignoreJSONStructure;
    let path;
    if (lng.indexOf('.') > -1) {
      path = lng.split('.');
    } else {
      path = [lng, ns];
      if (key) {
        if (Array.isArray(key)) {
          path.push(...key);
        } else if (typeof key === 'string' && keySeparator) {
          path.push(...key.split(keySeparator));
        } else {
          path.push(key);
        }
      }
    }
    const result = getPath(this.data, path);
    if (!result && !ns && !key && lng.indexOf('.') > -1) {
      lng = path[0];
      ns = path[1];
      key = path.slice(2).join('.');
    }
    if (result || !ignoreJSONStructure || typeof key !== 'string') return result;
    return deepFind(this.data && this.data[lng] && this.data[lng][ns], key, keySeparator);
  }
  addResource(lng, ns, key, value) {
    let options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {
      silent: false
    };
    const keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;
    let path = [lng, ns];
    if (key) path = path.concat(keySeparator ? key.split(keySeparator) : key);
    if (lng.indexOf('.') > -1) {
      path = lng.split('.');
      value = ns;
      ns = path[1];
    }
    this.addNamespaces(ns);
    setPath(this.data, path, value);
    if (!options.silent) this.emit('added', lng, ns, key, value);
  }
  addResources(lng, ns, resources) {
    let options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {
      silent: false
    };
    for (const m in resources) {
      if (typeof resources[m] === 'string' || Object.prototype.toString.apply(resources[m]) === '[object Array]') this.addResource(lng, ns, m, resources[m], {
        silent: true
      });
    }
    if (!options.silent) this.emit('added', lng, ns, resources);
  }
  addResourceBundle(lng, ns, resources, deep, overwrite) {
    let options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {
      silent: false,
      skipCopy: false
    };
    let path = [lng, ns];
    if (lng.indexOf('.') > -1) {
      path = lng.split('.');
      deep = resources;
      resources = ns;
      ns = path[1];
    }
    this.addNamespaces(ns);
    let pack = getPath(this.data, path) || {};
    if (!options.skipCopy) resources = JSON.parse(JSON.stringify(resources));
    if (deep) {
      deepExtend(pack, resources, overwrite);
    } else {
      pack = {
        ...pack,
        ...resources
      };
    }
    setPath(this.data, path, pack);
    if (!options.silent) this.emit('added', lng, ns, resources);
  }
  removeResourceBundle(lng, ns) {
    if (this.hasResourceBundle(lng, ns)) {
      delete this.data[lng][ns];
    }
    this.removeNamespaces(ns);
    this.emit('removed', lng, ns);
  }
  hasResourceBundle(lng, ns) {
    return this.getResource(lng, ns) !== undefined;
  }
  getResourceBundle(lng, ns) {
    if (!ns) ns = this.options.defaultNS;
    if (this.options.compatibilityAPI === 'v1') return {
      ...{},
      ...this.getResource(lng, ns)
    };
    return this.getResource(lng, ns);
  }
  getDataByLanguage(lng) {
    return this.data[lng];
  }
  hasLanguageSomeTranslations(lng) {
    const data = this.getDataByLanguage(lng);
    const n = data && Object.keys(data) || [];
    return !!n.find(v => data[v] && Object.keys(data[v]).length > 0);
  }
  toJSON() {
    return this.data;
  }
}

var postProcessor = {
  processors: {},
  addPostProcessor(module) {
    this.processors[module.name] = module;
  },
  handle(processors, value, key, options, translator) {
    processors.forEach(processor => {
      if (this.processors[processor]) value = this.processors[processor].process(value, key, options, translator);
    });
    return value;
  }
};

const checkedLoadedFor = {};
class Translator extends EventEmitter {
  constructor(services) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    super();
    copy(['resourceStore', 'languageUtils', 'pluralResolver', 'interpolator', 'backendConnector', 'i18nFormat', 'utils'], services, this);
    this.options = options;
    if (this.options.keySeparator === undefined) {
      this.options.keySeparator = '.';
    }
    this.logger = baseLogger.create('translator');
  }
  changeLanguage(lng) {
    if (lng) this.language = lng;
  }
  exists(key) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      interpolation: {}
    };
    if (key === undefined || key === null) {
      return false;
    }
    const resolved = this.resolve(key, options);
    return resolved && resolved.res !== undefined;
  }
  extractFromKey(key, options) {
    let nsSeparator = options.nsSeparator !== undefined ? options.nsSeparator : this.options.nsSeparator;
    if (nsSeparator === undefined) nsSeparator = ':';
    const keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;
    let namespaces = options.ns || this.options.defaultNS || [];
    const wouldCheckForNsInKey = nsSeparator && key.indexOf(nsSeparator) > -1;
    const seemsNaturalLanguage = !this.options.userDefinedKeySeparator && !options.keySeparator && !this.options.userDefinedNsSeparator && !options.nsSeparator && !looksLikeObjectPath(key, nsSeparator, keySeparator);
    if (wouldCheckForNsInKey && !seemsNaturalLanguage) {
      const m = key.match(this.interpolator.nestingRegexp);
      if (m && m.length > 0) {
        return {
          key,
          namespaces
        };
      }
      const parts = key.split(nsSeparator);
      if (nsSeparator !== keySeparator || nsSeparator === keySeparator && this.options.ns.indexOf(parts[0]) > -1) namespaces = parts.shift();
      key = parts.join(keySeparator);
    }
    if (typeof namespaces === 'string') namespaces = [namespaces];
    return {
      key,
      namespaces
    };
  }
  translate(keys, options, lastKey) {
    if (typeof options !== 'object' && this.options.overloadTranslationOptionHandler) {
      options = this.options.overloadTranslationOptionHandler(arguments);
    }
    if (typeof options === 'object') options = {
      ...options
    };
    if (!options) options = {};
    if (keys === undefined || keys === null) return '';
    if (!Array.isArray(keys)) keys = [String(keys)];
    const returnDetails = options.returnDetails !== undefined ? options.returnDetails : this.options.returnDetails;
    const keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;
    const {
      key,
      namespaces
    } = this.extractFromKey(keys[keys.length - 1], options);
    const namespace = namespaces[namespaces.length - 1];
    const lng = options.lng || this.language;
    const appendNamespaceToCIMode = options.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
    if (lng && lng.toLowerCase() === 'cimode') {
      if (appendNamespaceToCIMode) {
        const nsSeparator = options.nsSeparator || this.options.nsSeparator;
        if (returnDetails) {
          return {
            res: `${namespace}${nsSeparator}${key}`,
            usedKey: key,
            exactUsedKey: key,
            usedLng: lng,
            usedNS: namespace,
            usedParams: this.getUsedParamsDetails(options)
          };
        }
        return `${namespace}${nsSeparator}${key}`;
      }
      if (returnDetails) {
        return {
          res: key,
          usedKey: key,
          exactUsedKey: key,
          usedLng: lng,
          usedNS: namespace,
          usedParams: this.getUsedParamsDetails(options)
        };
      }
      return key;
    }
    const resolved = this.resolve(keys, options);
    let res = resolved && resolved.res;
    const resUsedKey = resolved && resolved.usedKey || key;
    const resExactUsedKey = resolved && resolved.exactUsedKey || key;
    const resType = Object.prototype.toString.apply(res);
    const noObject = ['[object Number]', '[object Function]', '[object RegExp]'];
    const joinArrays = options.joinArrays !== undefined ? options.joinArrays : this.options.joinArrays;
    const handleAsObjectInI18nFormat = !this.i18nFormat || this.i18nFormat.handleAsObject;
    const handleAsObject = typeof res !== 'string' && typeof res !== 'boolean' && typeof res !== 'number';
    if (handleAsObjectInI18nFormat && res && handleAsObject && noObject.indexOf(resType) < 0 && !(typeof joinArrays === 'string' && resType === '[object Array]')) {
      if (!options.returnObjects && !this.options.returnObjects) {
        if (!this.options.returnedObjectHandler) {
          this.logger.warn('accessing an object - but returnObjects options is not enabled!');
        }
        const r = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(resUsedKey, res, {
          ...options,
          ns: namespaces
        }) : `key '${key} (${this.language})' returned an object instead of string.`;
        if (returnDetails) {
          resolved.res = r;
          resolved.usedParams = this.getUsedParamsDetails(options);
          return resolved;
        }
        return r;
      }
      if (keySeparator) {
        const resTypeIsArray = resType === '[object Array]';
        const copy = resTypeIsArray ? [] : {};
        const newKeyToUse = resTypeIsArray ? resExactUsedKey : resUsedKey;
        for (const m in res) {
          if (Object.prototype.hasOwnProperty.call(res, m)) {
            const deepKey = `${newKeyToUse}${keySeparator}${m}`;
            copy[m] = this.translate(deepKey, {
              ...options,
              ...{
                joinArrays: false,
                ns: namespaces
              }
            });
            if (copy[m] === deepKey) copy[m] = res[m];
          }
        }
        res = copy;
      }
    } else if (handleAsObjectInI18nFormat && typeof joinArrays === 'string' && resType === '[object Array]') {
      res = res.join(joinArrays);
      if (res) res = this.extendTranslation(res, keys, options, lastKey);
    } else {
      let usedDefault = false;
      let usedKey = false;
      const needsPluralHandling = options.count !== undefined && typeof options.count !== 'string';
      const hasDefaultValue = Translator.hasDefaultValue(options);
      const defaultValueSuffix = needsPluralHandling ? this.pluralResolver.getSuffix(lng, options.count, options) : '';
      const defaultValueSuffixOrdinalFallback = options.ordinal && needsPluralHandling ? this.pluralResolver.getSuffix(lng, options.count, {
        ordinal: false
      }) : '';
      const needsZeroSuffixLookup = needsPluralHandling && !options.ordinal && options.count === 0 && this.pluralResolver.shouldUseIntlApi();
      const defaultValue = needsZeroSuffixLookup && options[`defaultValue${this.options.pluralSeparator}zero`] || options[`defaultValue${defaultValueSuffix}`] || options[`defaultValue${defaultValueSuffixOrdinalFallback}`] || options.defaultValue;
      if (!this.isValidLookup(res) && hasDefaultValue) {
        usedDefault = true;
        res = defaultValue;
      }
      if (!this.isValidLookup(res)) {
        usedKey = true;
        res = key;
      }
      const missingKeyNoValueFallbackToKey = options.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey;
      const resForMissing = missingKeyNoValueFallbackToKey && usedKey ? undefined : res;
      const updateMissing = hasDefaultValue && defaultValue !== res && this.options.updateMissing;
      if (usedKey || usedDefault || updateMissing) {
        this.logger.log(updateMissing ? 'updateKey' : 'missingKey', lng, namespace, key, updateMissing ? defaultValue : res);
        if (keySeparator) {
          const fk = this.resolve(key, {
            ...options,
            keySeparator: false
          });
          if (fk && fk.res) this.logger.warn('Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.');
        }
        let lngs = [];
        const fallbackLngs = this.languageUtils.getFallbackCodes(this.options.fallbackLng, options.lng || this.language);
        if (this.options.saveMissingTo === 'fallback' && fallbackLngs && fallbackLngs[0]) {
          for (let i = 0; i < fallbackLngs.length; i++) {
            lngs.push(fallbackLngs[i]);
          }
        } else if (this.options.saveMissingTo === 'all') {
          lngs = this.languageUtils.toResolveHierarchy(options.lng || this.language);
        } else {
          lngs.push(options.lng || this.language);
        }
        const send = (l, k, specificDefaultValue) => {
          const defaultForMissing = hasDefaultValue && specificDefaultValue !== res ? specificDefaultValue : resForMissing;
          if (this.options.missingKeyHandler) {
            this.options.missingKeyHandler(l, namespace, k, defaultForMissing, updateMissing, options);
          } else if (this.backendConnector && this.backendConnector.saveMissing) {
            this.backendConnector.saveMissing(l, namespace, k, defaultForMissing, updateMissing, options);
          }
          this.emit('missingKey', l, namespace, k, res);
        };
        if (this.options.saveMissing) {
          if (this.options.saveMissingPlurals && needsPluralHandling) {
            lngs.forEach(language => {
              const suffixes = this.pluralResolver.getSuffixes(language, options);
              if (needsZeroSuffixLookup && options[`defaultValue${this.options.pluralSeparator}zero`] && suffixes.indexOf(`${this.options.pluralSeparator}zero`) < 0) {
                suffixes.push(`${this.options.pluralSeparator}zero`);
              }
              suffixes.forEach(suffix => {
                send([language], key + suffix, options[`defaultValue${suffix}`] || defaultValue);
              });
            });
          } else {
            send(lngs, key, defaultValue);
          }
        }
      }
      res = this.extendTranslation(res, keys, options, resolved, lastKey);
      if (usedKey && res === key && this.options.appendNamespaceToMissingKey) res = `${namespace}:${key}`;
      if ((usedKey || usedDefault) && this.options.parseMissingKeyHandler) {
        if (this.options.compatibilityAPI !== 'v1') {
          res = this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? `${namespace}:${key}` : key, usedDefault ? res : undefined);
        } else {
          res = this.options.parseMissingKeyHandler(res);
        }
      }
    }
    if (returnDetails) {
      resolved.res = res;
      resolved.usedParams = this.getUsedParamsDetails(options);
      return resolved;
    }
    return res;
  }
  extendTranslation(res, key, options, resolved, lastKey) {
    var _this = this;
    if (this.i18nFormat && this.i18nFormat.parse) {
      res = this.i18nFormat.parse(res, {
        ...this.options.interpolation.defaultVariables,
        ...options
      }, options.lng || this.language || resolved.usedLng, resolved.usedNS, resolved.usedKey, {
        resolved
      });
    } else if (!options.skipInterpolation) {
      if (options.interpolation) this.interpolator.init({
        ...options,
        ...{
          interpolation: {
            ...this.options.interpolation,
            ...options.interpolation
          }
        }
      });
      const skipOnVariables = typeof res === 'string' && (options && options.interpolation && options.interpolation.skipOnVariables !== undefined ? options.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables);
      let nestBef;
      if (skipOnVariables) {
        const nb = res.match(this.interpolator.nestingRegexp);
        nestBef = nb && nb.length;
      }
      let data = options.replace && typeof options.replace !== 'string' ? options.replace : options;
      if (this.options.interpolation.defaultVariables) data = {
        ...this.options.interpolation.defaultVariables,
        ...data
      };
      res = this.interpolator.interpolate(res, data, options.lng || this.language, options);
      if (skipOnVariables) {
        const na = res.match(this.interpolator.nestingRegexp);
        const nestAft = na && na.length;
        if (nestBef < nestAft) options.nest = false;
      }
      if (!options.lng && this.options.compatibilityAPI !== 'v1' && resolved && resolved.res) options.lng = resolved.usedLng;
      if (options.nest !== false) res = this.interpolator.nest(res, function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        if (lastKey && lastKey[0] === args[0] && !options.context) {
          _this.logger.warn(`It seems you are nesting recursively key: ${args[0]} in key: ${key[0]}`);
          return null;
        }
        return _this.translate(...args, key);
      }, options);
      if (options.interpolation) this.interpolator.reset();
    }
    const postProcess = options.postProcess || this.options.postProcess;
    const postProcessorNames = typeof postProcess === 'string' ? [postProcess] : postProcess;
    if (res !== undefined && res !== null && postProcessorNames && postProcessorNames.length && options.applyPostProcessor !== false) {
      res = postProcessor.handle(postProcessorNames, res, key, this.options && this.options.postProcessPassResolved ? {
        i18nResolved: {
          ...resolved,
          usedParams: this.getUsedParamsDetails(options)
        },
        ...options
      } : options, this);
    }
    return res;
  }
  resolve(keys) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let found;
    let usedKey;
    let exactUsedKey;
    let usedLng;
    let usedNS;
    if (typeof keys === 'string') keys = [keys];
    keys.forEach(k => {
      if (this.isValidLookup(found)) return;
      const extracted = this.extractFromKey(k, options);
      const key = extracted.key;
      usedKey = key;
      let namespaces = extracted.namespaces;
      if (this.options.fallbackNS) namespaces = namespaces.concat(this.options.fallbackNS);
      const needsPluralHandling = options.count !== undefined && typeof options.count !== 'string';
      const needsZeroSuffixLookup = needsPluralHandling && !options.ordinal && options.count === 0 && this.pluralResolver.shouldUseIntlApi();
      const needsContextHandling = options.context !== undefined && (typeof options.context === 'string' || typeof options.context === 'number') && options.context !== '';
      const codes = options.lngs ? options.lngs : this.languageUtils.toResolveHierarchy(options.lng || this.language, options.fallbackLng);
      namespaces.forEach(ns => {
        if (this.isValidLookup(found)) return;
        usedNS = ns;
        if (!checkedLoadedFor[`${codes[0]}-${ns}`] && this.utils && this.utils.hasLoadedNamespace && !this.utils.hasLoadedNamespace(usedNS)) {
          checkedLoadedFor[`${codes[0]}-${ns}`] = true;
          this.logger.warn(`key "${usedKey}" for languages "${codes.join(', ')}" won't get resolved as namespace "${usedNS}" was not yet loaded`, 'This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!');
        }
        codes.forEach(code => {
          if (this.isValidLookup(found)) return;
          usedLng = code;
          const finalKeys = [key];
          if (this.i18nFormat && this.i18nFormat.addLookupKeys) {
            this.i18nFormat.addLookupKeys(finalKeys, key, code, ns, options);
          } else {
            let pluralSuffix;
            if (needsPluralHandling) pluralSuffix = this.pluralResolver.getSuffix(code, options.count, options);
            const zeroSuffix = `${this.options.pluralSeparator}zero`;
            const ordinalPrefix = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
            if (needsPluralHandling) {
              finalKeys.push(key + pluralSuffix);
              if (options.ordinal && pluralSuffix.indexOf(ordinalPrefix) === 0) {
                finalKeys.push(key + pluralSuffix.replace(ordinalPrefix, this.options.pluralSeparator));
              }
              if (needsZeroSuffixLookup) {
                finalKeys.push(key + zeroSuffix);
              }
            }
            if (needsContextHandling) {
              const contextKey = `${key}${this.options.contextSeparator}${options.context}`;
              finalKeys.push(contextKey);
              if (needsPluralHandling) {
                finalKeys.push(contextKey + pluralSuffix);
                if (options.ordinal && pluralSuffix.indexOf(ordinalPrefix) === 0) {
                  finalKeys.push(contextKey + pluralSuffix.replace(ordinalPrefix, this.options.pluralSeparator));
                }
                if (needsZeroSuffixLookup) {
                  finalKeys.push(contextKey + zeroSuffix);
                }
              }
            }
          }
          let possibleKey;
          while (possibleKey = finalKeys.pop()) {
            if (!this.isValidLookup(found)) {
              exactUsedKey = possibleKey;
              found = this.getResource(code, ns, possibleKey, options);
            }
          }
        });
      });
    });
    return {
      res: found,
      usedKey,
      exactUsedKey,
      usedLng,
      usedNS
    };
  }
  isValidLookup(res) {
    return res !== undefined && !(!this.options.returnNull && res === null) && !(!this.options.returnEmptyString && res === '');
  }
  getResource(code, ns, key) {
    let options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    if (this.i18nFormat && this.i18nFormat.getResource) return this.i18nFormat.getResource(code, ns, key, options);
    return this.resourceStore.getResource(code, ns, key, options);
  }
  getUsedParamsDetails() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const optionsKeys = ['defaultValue', 'ordinal', 'context', 'replace', 'lng', 'lngs', 'fallbackLng', 'ns', 'keySeparator', 'nsSeparator', 'returnObjects', 'returnDetails', 'joinArrays', 'postProcess', 'interpolation'];
    const useOptionsReplaceForData = options.replace && typeof options.replace !== 'string';
    let data = useOptionsReplaceForData ? options.replace : options;
    if (useOptionsReplaceForData && typeof options.count !== 'undefined') {
      data.count = options.count;
    }
    if (this.options.interpolation.defaultVariables) {
      data = {
        ...this.options.interpolation.defaultVariables,
        ...data
      };
    }
    if (!useOptionsReplaceForData) {
      data = {
        ...data
      };
      for (const key of optionsKeys) {
        delete data[key];
      }
    }
    return data;
  }
  static hasDefaultValue(options) {
    const prefix = 'defaultValue';
    for (const option in options) {
      if (Object.prototype.hasOwnProperty.call(options, option) && prefix === option.substring(0, prefix.length) && undefined !== options[option]) {
        return true;
      }
    }
    return false;
  }
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
class LanguageUtil {
  constructor(options) {
    this.options = options;
    this.supportedLngs = this.options.supportedLngs || false;
    this.logger = baseLogger.create('languageUtils');
  }
  getScriptPartFromCode(code) {
    code = getCleanedCode(code);
    if (!code || code.indexOf('-') < 0) return null;
    const p = code.split('-');
    if (p.length === 2) return null;
    p.pop();
    if (p[p.length - 1].toLowerCase() === 'x') return null;
    return this.formatLanguageCode(p.join('-'));
  }
  getLanguagePartFromCode(code) {
    code = getCleanedCode(code);
    if (!code || code.indexOf('-') < 0) return code;
    const p = code.split('-');
    return this.formatLanguageCode(p[0]);
  }
  formatLanguageCode(code) {
    if (typeof code === 'string' && code.indexOf('-') > -1) {
      const specialCases = ['hans', 'hant', 'latn', 'cyrl', 'cans', 'mong', 'arab'];
      let p = code.split('-');
      if (this.options.lowerCaseLng) {
        p = p.map(part => part.toLowerCase());
      } else if (p.length === 2) {
        p[0] = p[0].toLowerCase();
        p[1] = p[1].toUpperCase();
        if (specialCases.indexOf(p[1].toLowerCase()) > -1) p[1] = capitalize(p[1].toLowerCase());
      } else if (p.length === 3) {
        p[0] = p[0].toLowerCase();
        if (p[1].length === 2) p[1] = p[1].toUpperCase();
        if (p[0] !== 'sgn' && p[2].length === 2) p[2] = p[2].toUpperCase();
        if (specialCases.indexOf(p[1].toLowerCase()) > -1) p[1] = capitalize(p[1].toLowerCase());
        if (specialCases.indexOf(p[2].toLowerCase()) > -1) p[2] = capitalize(p[2].toLowerCase());
      }
      return p.join('-');
    }
    return this.options.cleanCode || this.options.lowerCaseLng ? code.toLowerCase() : code;
  }
  isSupportedCode(code) {
    if (this.options.load === 'languageOnly' || this.options.nonExplicitSupportedLngs) {
      code = this.getLanguagePartFromCode(code);
    }
    return !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.indexOf(code) > -1;
  }
  getBestMatchFromCodes(codes) {
    if (!codes) return null;
    let found;
    codes.forEach(code => {
      if (found) return;
      const cleanedLng = this.formatLanguageCode(code);
      if (!this.options.supportedLngs || this.isSupportedCode(cleanedLng)) found = cleanedLng;
    });
    if (!found && this.options.supportedLngs) {
      codes.forEach(code => {
        if (found) return;
        const lngOnly = this.getLanguagePartFromCode(code);
        if (this.isSupportedCode(lngOnly)) return found = lngOnly;
        found = this.options.supportedLngs.find(supportedLng => {
          if (supportedLng === lngOnly) return supportedLng;
          if (supportedLng.indexOf('-') < 0 && lngOnly.indexOf('-') < 0) return;
          if (supportedLng.indexOf('-') > 0 && lngOnly.indexOf('-') < 0 && supportedLng.substring(0, supportedLng.indexOf('-')) === lngOnly) return supportedLng;
          if (supportedLng.indexOf(lngOnly) === 0 && lngOnly.length > 1) return supportedLng;
        });
      });
    }
    if (!found) found = this.getFallbackCodes(this.options.fallbackLng)[0];
    return found;
  }
  getFallbackCodes(fallbacks, code) {
    if (!fallbacks) return [];
    if (typeof fallbacks === 'function') fallbacks = fallbacks(code);
    if (typeof fallbacks === 'string') fallbacks = [fallbacks];
    if (Object.prototype.toString.apply(fallbacks) === '[object Array]') return fallbacks;
    if (!code) return fallbacks.default || [];
    let found = fallbacks[code];
    if (!found) found = fallbacks[this.getScriptPartFromCode(code)];
    if (!found) found = fallbacks[this.formatLanguageCode(code)];
    if (!found) found = fallbacks[this.getLanguagePartFromCode(code)];
    if (!found) found = fallbacks.default;
    return found || [];
  }
  toResolveHierarchy(code, fallbackCode) {
    const fallbackCodes = this.getFallbackCodes(fallbackCode || this.options.fallbackLng || [], code);
    const codes = [];
    const addCode = c => {
      if (!c) return;
      if (this.isSupportedCode(c)) {
        codes.push(c);
      } else {
        this.logger.warn(`rejecting language code not found in supportedLngs: ${c}`);
      }
    };
    if (typeof code === 'string' && (code.indexOf('-') > -1 || code.indexOf('_') > -1)) {
      if (this.options.load !== 'languageOnly') addCode(this.formatLanguageCode(code));
      if (this.options.load !== 'languageOnly' && this.options.load !== 'currentOnly') addCode(this.getScriptPartFromCode(code));
      if (this.options.load !== 'currentOnly') addCode(this.getLanguagePartFromCode(code));
    } else if (typeof code === 'string') {
      addCode(this.formatLanguageCode(code));
    }
    fallbackCodes.forEach(fc => {
      if (codes.indexOf(fc) < 0) addCode(this.formatLanguageCode(fc));
    });
    return codes;
  }
}

let sets = [{
  lngs: ['ach', 'ak', 'am', 'arn', 'br', 'fil', 'gun', 'ln', 'mfe', 'mg', 'mi', 'oc', 'pt', 'pt-BR', 'tg', 'tl', 'ti', 'tr', 'uz', 'wa'],
  nr: [1, 2],
  fc: 1
}, {
  lngs: ['af', 'an', 'ast', 'az', 'bg', 'bn', 'ca', 'da', 'de', 'dev', 'el', 'en', 'eo', 'es', 'et', 'eu', 'fi', 'fo', 'fur', 'fy', 'gl', 'gu', 'ha', 'hi', 'hu', 'hy', 'ia', 'it', 'kk', 'kn', 'ku', 'lb', 'mai', 'ml', 'mn', 'mr', 'nah', 'nap', 'nb', 'ne', 'nl', 'nn', 'no', 'nso', 'pa', 'pap', 'pms', 'ps', 'pt-PT', 'rm', 'sco', 'se', 'si', 'so', 'son', 'sq', 'sv', 'sw', 'ta', 'te', 'tk', 'ur', 'yo'],
  nr: [1, 2],
  fc: 2
}, {
  lngs: ['ay', 'bo', 'cgg', 'fa', 'ht', 'id', 'ja', 'jbo', 'ka', 'km', 'ko', 'ky', 'lo', 'ms', 'sah', 'su', 'th', 'tt', 'ug', 'vi', 'wo', 'zh'],
  nr: [1],
  fc: 3
}, {
  lngs: ['be', 'bs', 'cnr', 'dz', 'hr', 'ru', 'sr', 'uk'],
  nr: [1, 2, 5],
  fc: 4
}, {
  lngs: ['ar'],
  nr: [0, 1, 2, 3, 11, 100],
  fc: 5
}, {
  lngs: ['cs', 'sk'],
  nr: [1, 2, 5],
  fc: 6
}, {
  lngs: ['csb', 'pl'],
  nr: [1, 2, 5],
  fc: 7
}, {
  lngs: ['cy'],
  nr: [1, 2, 3, 8],
  fc: 8
}, {
  lngs: ['fr'],
  nr: [1, 2],
  fc: 9
}, {
  lngs: ['ga'],
  nr: [1, 2, 3, 7, 11],
  fc: 10
}, {
  lngs: ['gd'],
  nr: [1, 2, 3, 20],
  fc: 11
}, {
  lngs: ['is'],
  nr: [1, 2],
  fc: 12
}, {
  lngs: ['jv'],
  nr: [0, 1],
  fc: 13
}, {
  lngs: ['kw'],
  nr: [1, 2, 3, 4],
  fc: 14
}, {
  lngs: ['lt'],
  nr: [1, 2, 10],
  fc: 15
}, {
  lngs: ['lv'],
  nr: [1, 2, 0],
  fc: 16
}, {
  lngs: ['mk'],
  nr: [1, 2],
  fc: 17
}, {
  lngs: ['mnk'],
  nr: [0, 1, 2],
  fc: 18
}, {
  lngs: ['mt'],
  nr: [1, 2, 11, 20],
  fc: 19
}, {
  lngs: ['or'],
  nr: [2, 1],
  fc: 2
}, {
  lngs: ['ro'],
  nr: [1, 2, 20],
  fc: 20
}, {
  lngs: ['sl'],
  nr: [5, 1, 2, 3],
  fc: 21
}, {
  lngs: ['he', 'iw'],
  nr: [1, 2, 20, 21],
  fc: 22
}];
let _rulesPluralsTypes = {
  1: function (n) {
    return Number(n > 1);
  },
  2: function (n) {
    return Number(n != 1);
  },
  3: function (n) {
    return 0;
  },
  4: function (n) {
    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
  },
  5: function (n) {
    return Number(n == 0 ? 0 : n == 1 ? 1 : n == 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5);
  },
  6: function (n) {
    return Number(n == 1 ? 0 : n >= 2 && n <= 4 ? 1 : 2);
  },
  7: function (n) {
    return Number(n == 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
  },
  8: function (n) {
    return Number(n == 1 ? 0 : n == 2 ? 1 : n != 8 && n != 11 ? 2 : 3);
  },
  9: function (n) {
    return Number(n >= 2);
  },
  10: function (n) {
    return Number(n == 1 ? 0 : n == 2 ? 1 : n < 7 ? 2 : n < 11 ? 3 : 4);
  },
  11: function (n) {
    return Number(n == 1 || n == 11 ? 0 : n == 2 || n == 12 ? 1 : n > 2 && n < 20 ? 2 : 3);
  },
  12: function (n) {
    return Number(n % 10 != 1 || n % 100 == 11);
  },
  13: function (n) {
    return Number(n !== 0);
  },
  14: function (n) {
    return Number(n == 1 ? 0 : n == 2 ? 1 : n == 3 ? 2 : 3);
  },
  15: function (n) {
    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
  },
  16: function (n) {
    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n !== 0 ? 1 : 2);
  },
  17: function (n) {
    return Number(n == 1 || n % 10 == 1 && n % 100 != 11 ? 0 : 1);
  },
  18: function (n) {
    return Number(n == 0 ? 0 : n == 1 ? 1 : 2);
  },
  19: function (n) {
    return Number(n == 1 ? 0 : n == 0 || n % 100 > 1 && n % 100 < 11 ? 1 : n % 100 > 10 && n % 100 < 20 ? 2 : 3);
  },
  20: function (n) {
    return Number(n == 1 ? 0 : n == 0 || n % 100 > 0 && n % 100 < 20 ? 1 : 2);
  },
  21: function (n) {
    return Number(n % 100 == 1 ? 1 : n % 100 == 2 ? 2 : n % 100 == 3 || n % 100 == 4 ? 3 : 0);
  },
  22: function (n) {
    return Number(n == 1 ? 0 : n == 2 ? 1 : (n < 0 || n > 10) && n % 10 == 0 ? 2 : 3);
  }
};
const nonIntlVersions = ['v1', 'v2', 'v3'];
const intlVersions = ['v4'];
const suffixesOrder = {
  zero: 0,
  one: 1,
  two: 2,
  few: 3,
  many: 4,
  other: 5
};
function createRules() {
  const rules = {};
  sets.forEach(set => {
    set.lngs.forEach(l => {
      rules[l] = {
        numbers: set.nr,
        plurals: _rulesPluralsTypes[set.fc]
      };
    });
  });
  return rules;
}
class PluralResolver {
  constructor(languageUtils) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    this.languageUtils = languageUtils;
    this.options = options;
    this.logger = baseLogger.create('pluralResolver');
    if ((!this.options.compatibilityJSON || intlVersions.includes(this.options.compatibilityJSON)) && (typeof Intl === 'undefined' || !Intl.PluralRules)) {
      this.options.compatibilityJSON = 'v3';
      this.logger.error('Your environment seems not to be Intl API compatible, use an Intl.PluralRules polyfill. Will fallback to the compatibilityJSON v3 format handling.');
    }
    this.rules = createRules();
  }
  addRule(lng, obj) {
    this.rules[lng] = obj;
  }
  getRule(code) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (this.shouldUseIntlApi()) {
      try {
        return new Intl.PluralRules(getCleanedCode(code === 'dev' ? 'en' : code), {
          type: options.ordinal ? 'ordinal' : 'cardinal'
        });
      } catch (err) {
        return;
      }
    }
    return this.rules[code] || this.rules[this.languageUtils.getLanguagePartFromCode(code)];
  }
  needsPlural(code) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const rule = this.getRule(code, options);
    if (this.shouldUseIntlApi()) {
      return rule && rule.resolvedOptions().pluralCategories.length > 1;
    }
    return rule && rule.numbers.length > 1;
  }
  getPluralFormsOfKey(code, key) {
    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return this.getSuffixes(code, options).map(suffix => `${key}${suffix}`);
  }
  getSuffixes(code) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const rule = this.getRule(code, options);
    if (!rule) {
      return [];
    }
    if (this.shouldUseIntlApi()) {
      return rule.resolvedOptions().pluralCategories.sort((pluralCategory1, pluralCategory2) => suffixesOrder[pluralCategory1] - suffixesOrder[pluralCategory2]).map(pluralCategory => `${this.options.prepend}${options.ordinal ? `ordinal${this.options.prepend}` : ''}${pluralCategory}`);
    }
    return rule.numbers.map(number => this.getSuffix(code, number, options));
  }
  getSuffix(code, count) {
    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    const rule = this.getRule(code, options);
    if (rule) {
      if (this.shouldUseIntlApi()) {
        return `${this.options.prepend}${options.ordinal ? `ordinal${this.options.prepend}` : ''}${rule.select(count)}`;
      }
      return this.getSuffixRetroCompatible(rule, count);
    }
    this.logger.warn(`no plural rule found for: ${code}`);
    return '';
  }
  getSuffixRetroCompatible(rule, count) {
    const idx = rule.noAbs ? rule.plurals(count) : rule.plurals(Math.abs(count));
    let suffix = rule.numbers[idx];
    if (this.options.simplifyPluralSuffix && rule.numbers.length === 2 && rule.numbers[0] === 1) {
      if (suffix === 2) {
        suffix = 'plural';
      } else if (suffix === 1) {
        suffix = '';
      }
    }
    const returnSuffix = () => this.options.prepend && suffix.toString() ? this.options.prepend + suffix.toString() : suffix.toString();
    if (this.options.compatibilityJSON === 'v1') {
      if (suffix === 1) return '';
      if (typeof suffix === 'number') return `_plural_${suffix.toString()}`;
      return returnSuffix();
    } else if (this.options.compatibilityJSON === 'v2') {
      return returnSuffix();
    } else if (this.options.simplifyPluralSuffix && rule.numbers.length === 2 && rule.numbers[0] === 1) {
      return returnSuffix();
    }
    return this.options.prepend && idx.toString() ? this.options.prepend + idx.toString() : idx.toString();
  }
  shouldUseIntlApi() {
    return !nonIntlVersions.includes(this.options.compatibilityJSON);
  }
}

function deepFindWithDefaults(data, defaultData, key) {
  let keySeparator = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '.';
  let ignoreJSONStructure = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
  let path = getPathWithDefaults(data, defaultData, key);
  if (!path && ignoreJSONStructure && typeof key === 'string') {
    path = deepFind(data, key, keySeparator);
    if (path === undefined) path = deepFind(defaultData, key, keySeparator);
  }
  return path;
}
class Interpolator {
  constructor() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this.logger = baseLogger.create('interpolator');
    this.options = options;
    this.format = options.interpolation && options.interpolation.format || (value => value);
    this.init(options);
  }
  init() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (!options.interpolation) options.interpolation = {
      escapeValue: true
    };
    const iOpts = options.interpolation;
    this.escape = iOpts.escape !== undefined ? iOpts.escape : escape;
    this.escapeValue = iOpts.escapeValue !== undefined ? iOpts.escapeValue : true;
    this.useRawValueToEscape = iOpts.useRawValueToEscape !== undefined ? iOpts.useRawValueToEscape : false;
    this.prefix = iOpts.prefix ? regexEscape(iOpts.prefix) : iOpts.prefixEscaped || '{{';
    this.suffix = iOpts.suffix ? regexEscape(iOpts.suffix) : iOpts.suffixEscaped || '}}';
    this.formatSeparator = iOpts.formatSeparator ? iOpts.formatSeparator : iOpts.formatSeparator || ',';
    this.unescapePrefix = iOpts.unescapeSuffix ? '' : iOpts.unescapePrefix || '-';
    this.unescapeSuffix = this.unescapePrefix ? '' : iOpts.unescapeSuffix || '';
    this.nestingPrefix = iOpts.nestingPrefix ? regexEscape(iOpts.nestingPrefix) : iOpts.nestingPrefixEscaped || regexEscape('$t(');
    this.nestingSuffix = iOpts.nestingSuffix ? regexEscape(iOpts.nestingSuffix) : iOpts.nestingSuffixEscaped || regexEscape(')');
    this.nestingOptionsSeparator = iOpts.nestingOptionsSeparator ? iOpts.nestingOptionsSeparator : iOpts.nestingOptionsSeparator || ',';
    this.maxReplaces = iOpts.maxReplaces ? iOpts.maxReplaces : 1000;
    this.alwaysFormat = iOpts.alwaysFormat !== undefined ? iOpts.alwaysFormat : false;
    this.resetRegExp();
  }
  reset() {
    if (this.options) this.init(this.options);
  }
  resetRegExp() {
    const getOrResetRegExp = (existingRegExp, pattern) => {
      if (existingRegExp && existingRegExp.source === pattern) {
        existingRegExp.lastIndex = 0;
        return existingRegExp;
      }
      return new RegExp(pattern, 'g');
    };
    this.regexp = getOrResetRegExp(this.regexp, `${this.prefix}(.+?)${this.suffix}`);
    this.regexpUnescape = getOrResetRegExp(this.regexpUnescape, `${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`);
    this.nestingRegexp = getOrResetRegExp(this.nestingRegexp, `${this.nestingPrefix}(.+?)${this.nestingSuffix}`);
  }
  interpolate(str, data, lng, options) {
    let match;
    let value;
    let replaces;
    const defaultData = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {};
    function regexSafe(val) {
      return val.replace(/\$/g, '$$$$');
    }
    const handleFormat = key => {
      if (key.indexOf(this.formatSeparator) < 0) {
        const path = deepFindWithDefaults(data, defaultData, key, this.options.keySeparator, this.options.ignoreJSONStructure);
        return this.alwaysFormat ? this.format(path, undefined, lng, {
          ...options,
          ...data,
          interpolationkey: key
        }) : path;
      }
      const p = key.split(this.formatSeparator);
      const k = p.shift().trim();
      const f = p.join(this.formatSeparator).trim();
      return this.format(deepFindWithDefaults(data, defaultData, k, this.options.keySeparator, this.options.ignoreJSONStructure), f, lng, {
        ...options,
        ...data,
        interpolationkey: k
      });
    };
    this.resetRegExp();
    const missingInterpolationHandler = options && options.missingInterpolationHandler || this.options.missingInterpolationHandler;
    const skipOnVariables = options && options.interpolation && options.interpolation.skipOnVariables !== undefined ? options.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables;
    const todos = [{
      regex: this.regexpUnescape,
      safeValue: val => regexSafe(val)
    }, {
      regex: this.regexp,
      safeValue: val => this.escapeValue ? regexSafe(this.escape(val)) : regexSafe(val)
    }];
    todos.forEach(todo => {
      replaces = 0;
      while (match = todo.regex.exec(str)) {
        const matchedVar = match[1].trim();
        value = handleFormat(matchedVar);
        if (value === undefined) {
          if (typeof missingInterpolationHandler === 'function') {
            const temp = missingInterpolationHandler(str, match, options);
            value = typeof temp === 'string' ? temp : '';
          } else if (options && Object.prototype.hasOwnProperty.call(options, matchedVar)) {
            value = '';
          } else if (skipOnVariables) {
            value = match[0];
            continue;
          } else {
            this.logger.warn(`missed to pass in variable ${matchedVar} for interpolating ${str}`);
            value = '';
          }
        } else if (typeof value !== 'string' && !this.useRawValueToEscape) {
          value = makeString(value);
        }
        const safeValue = todo.safeValue(value);
        str = str.replace(match[0], safeValue);
        if (skipOnVariables) {
          todo.regex.lastIndex += value.length;
          todo.regex.lastIndex -= match[0].length;
        } else {
          todo.regex.lastIndex = 0;
        }
        replaces++;
        if (replaces >= this.maxReplaces) {
          break;
        }
      }
    });
    return str;
  }
  nest(str, fc) {
    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    let match;
    let value;
    let clonedOptions;
    function handleHasOptions(key, inheritedOptions) {
      const sep = this.nestingOptionsSeparator;
      if (key.indexOf(sep) < 0) return key;
      const c = key.split(new RegExp(`${sep}[ ]*{`));
      let optionsString = `{${c[1]}`;
      key = c[0];
      optionsString = this.interpolate(optionsString, clonedOptions);
      const matchedSingleQuotes = optionsString.match(/'/g);
      const matchedDoubleQuotes = optionsString.match(/"/g);
      if (matchedSingleQuotes && matchedSingleQuotes.length % 2 === 0 && !matchedDoubleQuotes || matchedDoubleQuotes.length % 2 !== 0) {
        optionsString = optionsString.replace(/'/g, '"');
      }
      try {
        clonedOptions = JSON.parse(optionsString);
        if (inheritedOptions) clonedOptions = {
          ...inheritedOptions,
          ...clonedOptions
        };
      } catch (e) {
        this.logger.warn(`failed parsing options string in nesting for key ${key}`, e);
        return `${key}${sep}${optionsString}`;
      }
      delete clonedOptions.defaultValue;
      return key;
    }
    while (match = this.nestingRegexp.exec(str)) {
      let formatters = [];
      clonedOptions = {
        ...options
      };
      clonedOptions = clonedOptions.replace && typeof clonedOptions.replace !== 'string' ? clonedOptions.replace : clonedOptions;
      clonedOptions.applyPostProcessor = false;
      delete clonedOptions.defaultValue;
      let doReduce = false;
      if (match[0].indexOf(this.formatSeparator) !== -1 && !/{.*}/.test(match[1])) {
        const r = match[1].split(this.formatSeparator).map(elem => elem.trim());
        match[1] = r.shift();
        formatters = r;
        doReduce = true;
      }
      value = fc(handleHasOptions.call(this, match[1].trim(), clonedOptions), clonedOptions);
      if (value && match[0] === str && typeof value !== 'string') return value;
      if (typeof value !== 'string') value = makeString(value);
      if (!value) {
        this.logger.warn(`missed to resolve ${match[1]} for nesting ${str}`);
        value = '';
      }
      if (doReduce) {
        value = formatters.reduce((v, f) => this.format(v, f, options.lng, {
          ...options,
          interpolationkey: match[1].trim()
        }), value.trim());
      }
      str = str.replace(match[0], value);
      this.regexp.lastIndex = 0;
    }
    return str;
  }
}

function parseFormatStr(formatStr) {
  let formatName = formatStr.toLowerCase().trim();
  const formatOptions = {};
  if (formatStr.indexOf('(') > -1) {
    const p = formatStr.split('(');
    formatName = p[0].toLowerCase().trim();
    const optStr = p[1].substring(0, p[1].length - 1);
    if (formatName === 'currency' && optStr.indexOf(':') < 0) {
      if (!formatOptions.currency) formatOptions.currency = optStr.trim();
    } else if (formatName === 'relativetime' && optStr.indexOf(':') < 0) {
      if (!formatOptions.range) formatOptions.range = optStr.trim();
    } else {
      const opts = optStr.split(';');
      opts.forEach(opt => {
        if (!opt) return;
        const [key, ...rest] = opt.split(':');
        const val = rest.join(':').trim().replace(/^'+|'+$/g, '');
        if (!formatOptions[key.trim()]) formatOptions[key.trim()] = val;
        if (val === 'false') formatOptions[key.trim()] = false;
        if (val === 'true') formatOptions[key.trim()] = true;
        if (!isNaN(val)) formatOptions[key.trim()] = parseInt(val, 10);
      });
    }
  }
  return {
    formatName,
    formatOptions
  };
}
function createCachedFormatter(fn) {
  const cache = {};
  return function invokeFormatter(val, lng, options) {
    const key = lng + JSON.stringify(options);
    let formatter = cache[key];
    if (!formatter) {
      formatter = fn(getCleanedCode(lng), options);
      cache[key] = formatter;
    }
    return formatter(val);
  };
}
class Formatter {
  constructor() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this.logger = baseLogger.create('formatter');
    this.options = options;
    this.formats = {
      number: createCachedFormatter((lng, opt) => {
        const formatter = new Intl.NumberFormat(lng, {
          ...opt
        });
        return val => formatter.format(val);
      }),
      currency: createCachedFormatter((lng, opt) => {
        const formatter = new Intl.NumberFormat(lng, {
          ...opt,
          style: 'currency'
        });
        return val => formatter.format(val);
      }),
      datetime: createCachedFormatter((lng, opt) => {
        const formatter = new Intl.DateTimeFormat(lng, {
          ...opt
        });
        return val => formatter.format(val);
      }),
      relativetime: createCachedFormatter((lng, opt) => {
        const formatter = new Intl.RelativeTimeFormat(lng, {
          ...opt
        });
        return val => formatter.format(val, opt.range || 'day');
      }),
      list: createCachedFormatter((lng, opt) => {
        const formatter = new Intl.ListFormat(lng, {
          ...opt
        });
        return val => formatter.format(val);
      })
    };
    this.init(options);
  }
  init(services) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      interpolation: {}
    };
    const iOpts = options.interpolation;
    this.formatSeparator = iOpts.formatSeparator ? iOpts.formatSeparator : iOpts.formatSeparator || ',';
  }
  add(name, fc) {
    this.formats[name.toLowerCase().trim()] = fc;
  }
  addCached(name, fc) {
    this.formats[name.toLowerCase().trim()] = createCachedFormatter(fc);
  }
  format(value, format, lng) {
    let options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    const formats = format.split(this.formatSeparator);
    const result = formats.reduce((mem, f) => {
      const {
        formatName,
        formatOptions
      } = parseFormatStr(f);
      if (this.formats[formatName]) {
        let formatted = mem;
        try {
          const valOptions = options && options.formatParams && options.formatParams[options.interpolationkey] || {};
          const l = valOptions.locale || valOptions.lng || options.locale || options.lng || lng;
          formatted = this.formats[formatName](mem, l, {
            ...formatOptions,
            ...options,
            ...valOptions
          });
        } catch (error) {
          this.logger.warn(error);
        }
        return formatted;
      } else {
        this.logger.warn(`there was no format function for ${formatName}`);
      }
      return mem;
    }, value);
    return result;
  }
}

function removePending(q, name) {
  if (q.pending[name] !== undefined) {
    delete q.pending[name];
    q.pendingCount--;
  }
}
class Connector extends EventEmitter {
  constructor(backend, store, services) {
    let options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    super();
    this.backend = backend;
    this.store = store;
    this.services = services;
    this.languageUtils = services.languageUtils;
    this.options = options;
    this.logger = baseLogger.create('backendConnector');
    this.waitingReads = [];
    this.maxParallelReads = options.maxParallelReads || 10;
    this.readingCalls = 0;
    this.maxRetries = options.maxRetries >= 0 ? options.maxRetries : 5;
    this.retryTimeout = options.retryTimeout >= 1 ? options.retryTimeout : 350;
    this.state = {};
    this.queue = [];
    if (this.backend && this.backend.init) {
      this.backend.init(services, options.backend, options);
    }
  }
  queueLoad(languages, namespaces, options, callback) {
    const toLoad = {};
    const pending = {};
    const toLoadLanguages = {};
    const toLoadNamespaces = {};
    languages.forEach(lng => {
      let hasAllNamespaces = true;
      namespaces.forEach(ns => {
        const name = `${lng}|${ns}`;
        if (!options.reload && this.store.hasResourceBundle(lng, ns)) {
          this.state[name] = 2;
        } else if (this.state[name] < 0) ; else if (this.state[name] === 1) {
          if (pending[name] === undefined) pending[name] = true;
        } else {
          this.state[name] = 1;
          hasAllNamespaces = false;
          if (pending[name] === undefined) pending[name] = true;
          if (toLoad[name] === undefined) toLoad[name] = true;
          if (toLoadNamespaces[ns] === undefined) toLoadNamespaces[ns] = true;
        }
      });
      if (!hasAllNamespaces) toLoadLanguages[lng] = true;
    });
    if (Object.keys(toLoad).length || Object.keys(pending).length) {
      this.queue.push({
        pending,
        pendingCount: Object.keys(pending).length,
        loaded: {},
        errors: [],
        callback
      });
    }
    return {
      toLoad: Object.keys(toLoad),
      pending: Object.keys(pending),
      toLoadLanguages: Object.keys(toLoadLanguages),
      toLoadNamespaces: Object.keys(toLoadNamespaces)
    };
  }
  loaded(name, err, data) {
    const s = name.split('|');
    const lng = s[0];
    const ns = s[1];
    if (err) this.emit('failedLoading', lng, ns, err);
    if (data) {
      this.store.addResourceBundle(lng, ns, data, undefined, undefined, {
        skipCopy: true
      });
    }
    this.state[name] = err ? -1 : 2;
    const loaded = {};
    this.queue.forEach(q => {
      pushPath(q.loaded, [lng], ns);
      removePending(q, name);
      if (err) q.errors.push(err);
      if (q.pendingCount === 0 && !q.done) {
        Object.keys(q.loaded).forEach(l => {
          if (!loaded[l]) loaded[l] = {};
          const loadedKeys = q.loaded[l];
          if (loadedKeys.length) {
            loadedKeys.forEach(n => {
              if (loaded[l][n] === undefined) loaded[l][n] = true;
            });
          }
        });
        q.done = true;
        if (q.errors.length) {
          q.callback(q.errors);
        } else {
          q.callback();
        }
      }
    });
    this.emit('loaded', loaded);
    this.queue = this.queue.filter(q => !q.done);
  }
  read(lng, ns, fcName) {
    let tried = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    let wait = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : this.retryTimeout;
    let callback = arguments.length > 5 ? arguments[5] : undefined;
    if (!lng.length) return callback(null, {});
    if (this.readingCalls >= this.maxParallelReads) {
      this.waitingReads.push({
        lng,
        ns,
        fcName,
        tried,
        wait,
        callback
      });
      return;
    }
    this.readingCalls++;
    const resolver = (err, data) => {
      this.readingCalls--;
      if (this.waitingReads.length > 0) {
        const next = this.waitingReads.shift();
        this.read(next.lng, next.ns, next.fcName, next.tried, next.wait, next.callback);
      }
      if (err && data && tried < this.maxRetries) {
        setTimeout(() => {
          this.read.call(this, lng, ns, fcName, tried + 1, wait * 2, callback);
        }, wait);
        return;
      }
      callback(err, data);
    };
    const fc = this.backend[fcName].bind(this.backend);
    if (fc.length === 2) {
      try {
        const r = fc(lng, ns);
        if (r && typeof r.then === 'function') {
          r.then(data => resolver(null, data)).catch(resolver);
        } else {
          resolver(null, r);
        }
      } catch (err) {
        resolver(err);
      }
      return;
    }
    return fc(lng, ns, resolver);
  }
  prepareLoading(languages, namespaces) {
    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    let callback = arguments.length > 3 ? arguments[3] : undefined;
    if (!this.backend) {
      this.logger.warn('No backend was added via i18next.use. Will not load resources.');
      return callback && callback();
    }
    if (typeof languages === 'string') languages = this.languageUtils.toResolveHierarchy(languages);
    if (typeof namespaces === 'string') namespaces = [namespaces];
    const toLoad = this.queueLoad(languages, namespaces, options, callback);
    if (!toLoad.toLoad.length) {
      if (!toLoad.pending.length) callback();
      return null;
    }
    toLoad.toLoad.forEach(name => {
      this.loadOne(name);
    });
  }
  load(languages, namespaces, callback) {
    this.prepareLoading(languages, namespaces, {}, callback);
  }
  reload(languages, namespaces, callback) {
    this.prepareLoading(languages, namespaces, {
      reload: true
    }, callback);
  }
  loadOne(name) {
    let prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    const s = name.split('|');
    const lng = s[0];
    const ns = s[1];
    this.read(lng, ns, 'read', undefined, undefined, (err, data) => {
      if (err) this.logger.warn(`${prefix}loading namespace ${ns} for language ${lng} failed`, err);
      if (!err && data) this.logger.log(`${prefix}loaded namespace ${ns} for language ${lng}`, data);
      this.loaded(name, err, data);
    });
  }
  saveMissing(languages, namespace, key, fallbackValue, isUpdate) {
    let options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
    let clb = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : () => {};
    if (this.services.utils && this.services.utils.hasLoadedNamespace && !this.services.utils.hasLoadedNamespace(namespace)) {
      this.logger.warn(`did not save key "${key}" as the namespace "${namespace}" was not yet loaded`, 'This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!');
      return;
    }
    if (key === undefined || key === null || key === '') return;
    if (this.backend && this.backend.create) {
      const opts = {
        ...options,
        isUpdate
      };
      const fc = this.backend.create.bind(this.backend);
      if (fc.length < 6) {
        try {
          let r;
          if (fc.length === 5) {
            r = fc(languages, namespace, key, fallbackValue, opts);
          } else {
            r = fc(languages, namespace, key, fallbackValue);
          }
          if (r && typeof r.then === 'function') {
            r.then(data => clb(null, data)).catch(clb);
          } else {
            clb(null, r);
          }
        } catch (err) {
          clb(err);
        }
      } else {
        fc(languages, namespace, key, fallbackValue, clb, opts);
      }
    }
    if (!languages || !languages[0]) return;
    this.store.addResource(languages[0], namespace, key, fallbackValue);
  }
}

function get() {
  return {
    debug: false,
    initImmediate: true,
    ns: ['translation'],
    defaultNS: ['translation'],
    fallbackLng: ['dev'],
    fallbackNS: false,
    supportedLngs: false,
    nonExplicitSupportedLngs: false,
    load: 'all',
    preload: false,
    simplifyPluralSuffix: true,
    keySeparator: '.',
    nsSeparator: ':',
    pluralSeparator: '_',
    contextSeparator: '_',
    partialBundledLanguages: false,
    saveMissing: false,
    updateMissing: false,
    saveMissingTo: 'fallback',
    saveMissingPlurals: true,
    missingKeyHandler: false,
    missingInterpolationHandler: false,
    postProcess: false,
    postProcessPassResolved: false,
    returnNull: false,
    returnEmptyString: true,
    returnObjects: false,
    joinArrays: false,
    returnedObjectHandler: false,
    parseMissingKeyHandler: false,
    appendNamespaceToMissingKey: false,
    appendNamespaceToCIMode: false,
    overloadTranslationOptionHandler: function handle(args) {
      let ret = {};
      if (typeof args[1] === 'object') ret = args[1];
      if (typeof args[1] === 'string') ret.defaultValue = args[1];
      if (typeof args[2] === 'string') ret.tDescription = args[2];
      if (typeof args[2] === 'object' || typeof args[3] === 'object') {
        const options = args[3] || args[2];
        Object.keys(options).forEach(key => {
          ret[key] = options[key];
        });
      }
      return ret;
    },
    interpolation: {
      escapeValue: true,
      format: value => value,
      prefix: '{{',
      suffix: '}}',
      formatSeparator: ',',
      unescapePrefix: '-',
      nestingPrefix: '$t(',
      nestingSuffix: ')',
      nestingOptionsSeparator: ',',
      maxReplaces: 1000,
      skipOnVariables: true
    }
  };
}
function transformOptions(options) {
  if (typeof options.ns === 'string') options.ns = [options.ns];
  if (typeof options.fallbackLng === 'string') options.fallbackLng = [options.fallbackLng];
  if (typeof options.fallbackNS === 'string') options.fallbackNS = [options.fallbackNS];
  if (options.supportedLngs && options.supportedLngs.indexOf('cimode') < 0) {
    options.supportedLngs = options.supportedLngs.concat(['cimode']);
  }
  return options;
}

function noop$3() {}
function bindMemberFunctions(inst) {
  const mems = Object.getOwnPropertyNames(Object.getPrototypeOf(inst));
  mems.forEach(mem => {
    if (typeof inst[mem] === 'function') {
      inst[mem] = inst[mem].bind(inst);
    }
  });
}
class I18n extends EventEmitter {
  constructor() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    let callback = arguments.length > 1 ? arguments[1] : undefined;
    super();
    this.options = transformOptions(options);
    this.services = {};
    this.logger = baseLogger;
    this.modules = {
      external: []
    };
    bindMemberFunctions(this);
    if (callback && !this.isInitialized && !options.isClone) {
      if (!this.options.initImmediate) {
        this.init(options, callback);
        return this;
      }
      setTimeout(() => {
        this.init(options, callback);
      }, 0);
    }
  }
  init() {
    var _this = this;
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    let callback = arguments.length > 1 ? arguments[1] : undefined;
    this.isInitializing = true;
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    if (!options.defaultNS && options.defaultNS !== false && options.ns) {
      if (typeof options.ns === 'string') {
        options.defaultNS = options.ns;
      } else if (options.ns.indexOf('translation') < 0) {
        options.defaultNS = options.ns[0];
      }
    }
    const defOpts = get();
    this.options = {
      ...defOpts,
      ...this.options,
      ...transformOptions(options)
    };
    if (this.options.compatibilityAPI !== 'v1') {
      this.options.interpolation = {
        ...defOpts.interpolation,
        ...this.options.interpolation
      };
    }
    if (options.keySeparator !== undefined) {
      this.options.userDefinedKeySeparator = options.keySeparator;
    }
    if (options.nsSeparator !== undefined) {
      this.options.userDefinedNsSeparator = options.nsSeparator;
    }
    function createClassOnDemand(ClassOrObject) {
      if (!ClassOrObject) return null;
      if (typeof ClassOrObject === 'function') return new ClassOrObject();
      return ClassOrObject;
    }
    if (!this.options.isClone) {
      if (this.modules.logger) {
        baseLogger.init(createClassOnDemand(this.modules.logger), this.options);
      } else {
        baseLogger.init(null, this.options);
      }
      let formatter;
      if (this.modules.formatter) {
        formatter = this.modules.formatter;
      } else if (typeof Intl !== 'undefined') {
        formatter = Formatter;
      }
      const lu = new LanguageUtil(this.options);
      this.store = new ResourceStore(this.options.resources, this.options);
      const s = this.services;
      s.logger = baseLogger;
      s.resourceStore = this.store;
      s.languageUtils = lu;
      s.pluralResolver = new PluralResolver(lu, {
        prepend: this.options.pluralSeparator,
        compatibilityJSON: this.options.compatibilityJSON,
        simplifyPluralSuffix: this.options.simplifyPluralSuffix
      });
      if (formatter && (!this.options.interpolation.format || this.options.interpolation.format === defOpts.interpolation.format)) {
        s.formatter = createClassOnDemand(formatter);
        s.formatter.init(s, this.options);
        this.options.interpolation.format = s.formatter.format.bind(s.formatter);
      }
      s.interpolator = new Interpolator(this.options);
      s.utils = {
        hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
      };
      s.backendConnector = new Connector(createClassOnDemand(this.modules.backend), s.resourceStore, s, this.options);
      s.backendConnector.on('*', function (event) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }
        _this.emit(event, ...args);
      });
      if (this.modules.languageDetector) {
        s.languageDetector = createClassOnDemand(this.modules.languageDetector);
        if (s.languageDetector.init) s.languageDetector.init(s, this.options.detection, this.options);
      }
      if (this.modules.i18nFormat) {
        s.i18nFormat = createClassOnDemand(this.modules.i18nFormat);
        if (s.i18nFormat.init) s.i18nFormat.init(this);
      }
      this.translator = new Translator(this.services, this.options);
      this.translator.on('*', function (event) {
        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }
        _this.emit(event, ...args);
      });
      this.modules.external.forEach(m => {
        if (m.init) m.init(this);
      });
    }
    this.format = this.options.interpolation.format;
    if (!callback) callback = noop$3;
    if (this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
      const codes = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
      if (codes.length > 0 && codes[0] !== 'dev') this.options.lng = codes[0];
    }
    if (!this.services.languageDetector && !this.options.lng) {
      this.logger.warn('init: no languageDetector is used and no lng is defined');
    }
    const storeApi = ['getResource', 'hasResourceBundle', 'getResourceBundle', 'getDataByLanguage'];
    storeApi.forEach(fcName => {
      this[fcName] = function () {
        return _this.store[fcName](...arguments);
      };
    });
    const storeApiChained = ['addResource', 'addResources', 'addResourceBundle', 'removeResourceBundle'];
    storeApiChained.forEach(fcName => {
      this[fcName] = function () {
        _this.store[fcName](...arguments);
        return _this;
      };
    });
    const deferred = defer();
    const load = () => {
      const finish = (err, t) => {
        this.isInitializing = false;
        if (this.isInitialized && !this.initializedStoreOnce) this.logger.warn('init: i18next is already initialized. You should call init just once!');
        this.isInitialized = true;
        if (!this.options.isClone) this.logger.log('initialized', this.options);
        this.emit('initialized', this.options);
        deferred.resolve(t);
        callback(err, t);
      };
      if (this.languages && this.options.compatibilityAPI !== 'v1' && !this.isInitialized) return finish(null, this.t.bind(this));
      this.changeLanguage(this.options.lng, finish);
    };
    if (this.options.resources || !this.options.initImmediate) {
      load();
    } else {
      setTimeout(load, 0);
    }
    return deferred;
  }
  loadResources(language) {
    let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop$3;
    let usedCallback = callback;
    const usedLng = typeof language === 'string' ? language : this.language;
    if (typeof language === 'function') usedCallback = language;
    if (!this.options.resources || this.options.partialBundledLanguages) {
      if (usedLng && usedLng.toLowerCase() === 'cimode' && (!this.options.preload || this.options.preload.length === 0)) return usedCallback();
      const toLoad = [];
      const append = lng => {
        if (!lng) return;
        if (lng === 'cimode') return;
        const lngs = this.services.languageUtils.toResolveHierarchy(lng);
        lngs.forEach(l => {
          if (l === 'cimode') return;
          if (toLoad.indexOf(l) < 0) toLoad.push(l);
        });
      };
      if (!usedLng) {
        const fallbacks = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
        fallbacks.forEach(l => append(l));
      } else {
        append(usedLng);
      }
      if (this.options.preload) {
        this.options.preload.forEach(l => append(l));
      }
      this.services.backendConnector.load(toLoad, this.options.ns, e => {
        if (!e && !this.resolvedLanguage && this.language) this.setResolvedLanguage(this.language);
        usedCallback(e);
      });
    } else {
      usedCallback(null);
    }
  }
  reloadResources(lngs, ns, callback) {
    const deferred = defer();
    if (!lngs) lngs = this.languages;
    if (!ns) ns = this.options.ns;
    if (!callback) callback = noop$3;
    this.services.backendConnector.reload(lngs, ns, err => {
      deferred.resolve();
      callback(err);
    });
    return deferred;
  }
  use(module) {
    if (!module) throw new Error('You are passing an undefined module! Please check the object you are passing to i18next.use()');
    if (!module.type) throw new Error('You are passing a wrong module! Please check the object you are passing to i18next.use()');
    if (module.type === 'backend') {
      this.modules.backend = module;
    }
    if (module.type === 'logger' || module.log && module.warn && module.error) {
      this.modules.logger = module;
    }
    if (module.type === 'languageDetector') {
      this.modules.languageDetector = module;
    }
    if (module.type === 'i18nFormat') {
      this.modules.i18nFormat = module;
    }
    if (module.type === 'postProcessor') {
      postProcessor.addPostProcessor(module);
    }
    if (module.type === 'formatter') {
      this.modules.formatter = module;
    }
    if (module.type === '3rdParty') {
      this.modules.external.push(module);
    }
    return this;
  }
  setResolvedLanguage(l) {
    if (!l || !this.languages) return;
    if (['cimode', 'dev'].indexOf(l) > -1) return;
    for (let li = 0; li < this.languages.length; li++) {
      const lngInLngs = this.languages[li];
      if (['cimode', 'dev'].indexOf(lngInLngs) > -1) continue;
      if (this.store.hasLanguageSomeTranslations(lngInLngs)) {
        this.resolvedLanguage = lngInLngs;
        break;
      }
    }
  }
  changeLanguage(lng, callback) {
    var _this2 = this;
    this.isLanguageChangingTo = lng;
    const deferred = defer();
    this.emit('languageChanging', lng);
    const setLngProps = l => {
      this.language = l;
      this.languages = this.services.languageUtils.toResolveHierarchy(l);
      this.resolvedLanguage = undefined;
      this.setResolvedLanguage(l);
    };
    const done = (err, l) => {
      if (l) {
        setLngProps(l);
        this.translator.changeLanguage(l);
        this.isLanguageChangingTo = undefined;
        this.emit('languageChanged', l);
        this.logger.log('languageChanged', l);
      } else {
        this.isLanguageChangingTo = undefined;
      }
      deferred.resolve(function () {
        return _this2.t(...arguments);
      });
      if (callback) callback(err, function () {
        return _this2.t(...arguments);
      });
    };
    const setLng = lngs => {
      if (!lng && !lngs && this.services.languageDetector) lngs = [];
      const l = typeof lngs === 'string' ? lngs : this.services.languageUtils.getBestMatchFromCodes(lngs);
      if (l) {
        if (!this.language) {
          setLngProps(l);
        }
        if (!this.translator.language) this.translator.changeLanguage(l);
        if (this.services.languageDetector && this.services.languageDetector.cacheUserLanguage) this.services.languageDetector.cacheUserLanguage(l);
      }
      this.loadResources(l, err => {
        done(err, l);
      });
    };
    if (!lng && this.services.languageDetector && !this.services.languageDetector.async) {
      setLng(this.services.languageDetector.detect());
    } else if (!lng && this.services.languageDetector && this.services.languageDetector.async) {
      if (this.services.languageDetector.detect.length === 0) {
        this.services.languageDetector.detect().then(setLng);
      } else {
        this.services.languageDetector.detect(setLng);
      }
    } else {
      setLng(lng);
    }
    return deferred;
  }
  getFixedT(lng, ns, keyPrefix) {
    var _this3 = this;
    const fixedT = function (key, opts) {
      let options;
      if (typeof opts !== 'object') {
        for (var _len3 = arguments.length, rest = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
          rest[_key3 - 2] = arguments[_key3];
        }
        options = _this3.options.overloadTranslationOptionHandler([key, opts].concat(rest));
      } else {
        options = {
          ...opts
        };
      }
      options.lng = options.lng || fixedT.lng;
      options.lngs = options.lngs || fixedT.lngs;
      options.ns = options.ns || fixedT.ns;
      options.keyPrefix = options.keyPrefix || keyPrefix || fixedT.keyPrefix;
      const keySeparator = _this3.options.keySeparator || '.';
      let resultKey;
      if (options.keyPrefix && Array.isArray(key)) {
        resultKey = key.map(k => `${options.keyPrefix}${keySeparator}${k}`);
      } else {
        resultKey = options.keyPrefix ? `${options.keyPrefix}${keySeparator}${key}` : key;
      }
      return _this3.t(resultKey, options);
    };
    if (typeof lng === 'string') {
      fixedT.lng = lng;
    } else {
      fixedT.lngs = lng;
    }
    fixedT.ns = ns;
    fixedT.keyPrefix = keyPrefix;
    return fixedT;
  }
  t() {
    return this.translator && this.translator.translate(...arguments);
  }
  exists() {
    return this.translator && this.translator.exists(...arguments);
  }
  setDefaultNamespace(ns) {
    this.options.defaultNS = ns;
  }
  hasLoadedNamespace(ns) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (!this.isInitialized) {
      this.logger.warn('hasLoadedNamespace: i18next was not initialized', this.languages);
      return false;
    }
    if (!this.languages || !this.languages.length) {
      this.logger.warn('hasLoadedNamespace: i18n.languages were undefined or empty', this.languages);
      return false;
    }
    const lng = options.lng || this.resolvedLanguage || this.languages[0];
    const fallbackLng = this.options ? this.options.fallbackLng : false;
    const lastLng = this.languages[this.languages.length - 1];
    if (lng.toLowerCase() === 'cimode') return true;
    const loadNotPending = (l, n) => {
      const loadState = this.services.backendConnector.state[`${l}|${n}`];
      return loadState === -1 || loadState === 2;
    };
    if (options.precheck) {
      const preResult = options.precheck(this, loadNotPending);
      if (preResult !== undefined) return preResult;
    }
    if (this.hasResourceBundle(lng, ns)) return true;
    if (!this.services.backendConnector.backend || this.options.resources && !this.options.partialBundledLanguages) return true;
    if (loadNotPending(lng, ns) && (!fallbackLng || loadNotPending(lastLng, ns))) return true;
    return false;
  }
  loadNamespaces(ns, callback) {
    const deferred = defer();
    if (!this.options.ns) {
      if (callback) callback();
      return Promise.resolve();
    }
    if (typeof ns === 'string') ns = [ns];
    ns.forEach(n => {
      if (this.options.ns.indexOf(n) < 0) this.options.ns.push(n);
    });
    this.loadResources(err => {
      deferred.resolve();
      if (callback) callback(err);
    });
    return deferred;
  }
  loadLanguages(lngs, callback) {
    const deferred = defer();
    if (typeof lngs === 'string') lngs = [lngs];
    const preloaded = this.options.preload || [];
    const newLngs = lngs.filter(lng => preloaded.indexOf(lng) < 0);
    if (!newLngs.length) {
      if (callback) callback();
      return Promise.resolve();
    }
    this.options.preload = preloaded.concat(newLngs);
    this.loadResources(err => {
      deferred.resolve();
      if (callback) callback(err);
    });
    return deferred;
  }
  dir(lng) {
    if (!lng) lng = this.resolvedLanguage || (this.languages && this.languages.length > 0 ? this.languages[0] : this.language);
    if (!lng) return 'rtl';
    const rtlLngs = ['ar', 'shu', 'sqr', 'ssh', 'xaa', 'yhd', 'yud', 'aao', 'abh', 'abv', 'acm', 'acq', 'acw', 'acx', 'acy', 'adf', 'ads', 'aeb', 'aec', 'afb', 'ajp', 'apc', 'apd', 'arb', 'arq', 'ars', 'ary', 'arz', 'auz', 'avl', 'ayh', 'ayl', 'ayn', 'ayp', 'bbz', 'pga', 'he', 'iw', 'ps', 'pbt', 'pbu', 'pst', 'prp', 'prd', 'ug', 'ur', 'ydd', 'yds', 'yih', 'ji', 'yi', 'hbo', 'men', 'xmn', 'fa', 'jpr', 'peo', 'pes', 'prs', 'dv', 'sam', 'ckb'];
    const languageUtils = this.services && this.services.languageUtils || new LanguageUtil(get());
    return rtlLngs.indexOf(languageUtils.getLanguagePartFromCode(lng)) > -1 || lng.toLowerCase().indexOf('-arab') > 1 ? 'rtl' : 'ltr';
  }
  static createInstance() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    let callback = arguments.length > 1 ? arguments[1] : undefined;
    return new I18n(options, callback);
  }
  cloneInstance() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop$3;
    const forkResourceStore = options.forkResourceStore;
    if (forkResourceStore) delete options.forkResourceStore;
    const mergedOptions = {
      ...this.options,
      ...options,
      ...{
        isClone: true
      }
    };
    const clone = new I18n(mergedOptions);
    if (options.debug !== undefined || options.prefix !== undefined) {
      clone.logger = clone.logger.clone(options);
    }
    const membersToCopy = ['store', 'services', 'language'];
    membersToCopy.forEach(m => {
      clone[m] = this[m];
    });
    clone.services = {
      ...this.services
    };
    clone.services.utils = {
      hasLoadedNamespace: clone.hasLoadedNamespace.bind(clone)
    };
    if (forkResourceStore) {
      clone.store = new ResourceStore(this.store.data, mergedOptions);
      clone.services.resourceStore = clone.store;
    }
    clone.translator = new Translator(clone.services, mergedOptions);
    clone.translator.on('*', function (event) {
      for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
      }
      clone.emit(event, ...args);
    });
    clone.init(mergedOptions, callback);
    clone.translator.options = mergedOptions;
    clone.translator.backendConnector.services.utils = {
      hasLoadedNamespace: clone.hasLoadedNamespace.bind(clone)
    };
    return clone;
  }
  toJSON() {
    return {
      options: this.options,
      store: this.store,
      language: this.language,
      languages: this.languages,
      resolvedLanguage: this.resolvedLanguage
    };
  }
}
const instance = I18n.createInstance();
instance.createInstance = I18n.createInstance;

instance.createInstance;
instance.dir;
instance.init;
instance.loadResources;
instance.reloadResources;
instance.use;
instance.changeLanguage;
instance.getFixedT;
instance.t;
instance.exists;
instance.setDefaultNamespace;
instance.hasLoadedNamespace;
instance.loadNamespaces;
instance.loadLanguages;

async function loadTranslations(locale, dynamicImports) {
    try {
        const translationsArray = await Promise.all(dynamicImports.map((importFunc) => importFunc()));
        translationsArray.forEach(({ default: translations }) => {
            instance.addResourceBundle(locale, "translation", translations);
        });
    }
    catch (e) {
        console.error(`Cannot load translations for ${locale}`, e);
    }
}

function warn() {
  if (console && console.warn) {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (typeof args[0] === 'string') args[0] = `react-i18next:: ${args[0]}`;
    console.warn(...args);
  }
}
const alreadyWarned = {};
function warnOnce() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }
  if (typeof args[0] === 'string' && alreadyWarned[args[0]]) return;
  if (typeof args[0] === 'string') alreadyWarned[args[0]] = new Date();
  warn(...args);
}
const loadedClb = (i18n, cb) => () => {
  if (i18n.isInitialized) {
    cb();
  } else {
    const initialized = () => {
      setTimeout(() => {
        i18n.off('initialized', initialized);
      }, 0);
      cb();
    };
    i18n.on('initialized', initialized);
  }
};
function loadNamespaces(i18n, ns, cb) {
  i18n.loadNamespaces(ns, loadedClb(i18n, cb));
}
function loadLanguages(i18n, lng, ns, cb) {
  if (typeof ns === 'string') ns = [ns];
  ns.forEach(n => {
    if (i18n.options.ns.indexOf(n) < 0) i18n.options.ns.push(n);
  });
  i18n.loadLanguages(lng, loadedClb(i18n, cb));
}
function oldI18nextHasLoadedNamespace(ns, i18n) {
  let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  const lng = i18n.languages[0];
  const fallbackLng = i18n.options ? i18n.options.fallbackLng : false;
  const lastLng = i18n.languages[i18n.languages.length - 1];
  if (lng.toLowerCase() === 'cimode') return true;
  const loadNotPending = (l, n) => {
    const loadState = i18n.services.backendConnector.state[`${l}|${n}`];
    return loadState === -1 || loadState === 2;
  };
  if (options.bindI18n && options.bindI18n.indexOf('languageChanging') > -1 && i18n.services.backendConnector.backend && i18n.isLanguageChangingTo && !loadNotPending(i18n.isLanguageChangingTo, ns)) return false;
  if (i18n.hasResourceBundle(lng, ns)) return true;
  if (!i18n.services.backendConnector.backend || i18n.options.resources && !i18n.options.partialBundledLanguages) return true;
  if (loadNotPending(lng, ns) && (!fallbackLng || loadNotPending(lastLng, ns))) return true;
  return false;
}
function hasLoadedNamespace(ns, i18n) {
  let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  if (!i18n.languages || !i18n.languages.length) {
    warnOnce('i18n.languages were undefined or empty', i18n.languages);
    return true;
  }
  const isNewerI18next = i18n.options.ignoreJSONStructure !== undefined;
  if (!isNewerI18next) {
    return oldI18nextHasLoadedNamespace(ns, i18n, options);
  }
  return i18n.hasLoadedNamespace(ns, {
    lng: options.lng,
    precheck: (i18nInstance, loadNotPending) => {
      if (options.bindI18n && options.bindI18n.indexOf('languageChanging') > -1 && i18nInstance.services.backendConnector.backend && i18nInstance.isLanguageChangingTo && !loadNotPending(i18nInstance.isLanguageChangingTo, ns)) return false;
    }
  });
}

const matchHtmlEntity = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g;
const htmlEntities = {
  '&amp;': '&',
  '&#38;': '&',
  '&lt;': '<',
  '&#60;': '<',
  '&gt;': '>',
  '&#62;': '>',
  '&apos;': "'",
  '&#39;': "'",
  '&quot;': '"',
  '&#34;': '"',
  '&nbsp;': ' ',
  '&#160;': ' ',
  '&copy;': '©',
  '&#169;': '©',
  '&reg;': '®',
  '&#174;': '®',
  '&hellip;': '…',
  '&#8230;': '…',
  '&#x2F;': '/',
  '&#47;': '/'
};
const unescapeHtmlEntity = m => htmlEntities[m];
const unescape = text => text.replace(matchHtmlEntity, unescapeHtmlEntity);

let defaultOptions$1 = {
  bindI18n: 'languageChanged',
  bindI18nStore: '',
  transEmptyNodeValue: '',
  transSupportBasicHtmlNodes: true,
  transWrapTextNodes: '',
  transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p'],
  useSuspense: true,
  unescape
};
function setDefaults() {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  defaultOptions$1 = {
    ...defaultOptions$1,
    ...options
  };
}
function getDefaults() {
  return defaultOptions$1;
}

let i18nInstance;
function setI18n(instance) {
  i18nInstance = instance;
}
function getI18n() {
  return i18nInstance;
}

const initReactI18next = {
  type: '3rdParty',
  init(instance) {
    setDefaults(instance.options.react);
    setI18n(instance);
  }
};

const I18nContext = reactExports.createContext();
class ReportNamespaces {
  constructor() {
    this.usedNamespaces = {};
  }
  addUsedNamespaces(namespaces) {
    namespaces.forEach(ns => {
      if (!this.usedNamespaces[ns]) this.usedNamespaces[ns] = true;
    });
  }
  getUsedNamespaces() {
    return Object.keys(this.usedNamespaces);
  }
}

const usePrevious = (value, ignore) => {
  const ref = reactExports.useRef();
  reactExports.useEffect(() => {
    ref.current = ignore ? ref.current : value;
  }, [value, ignore]);
  return ref.current;
};
function alwaysNewT(i18n, language, namespace, keyPrefix) {
  return i18n.getFixedT(language, namespace, keyPrefix);
}
function useMemoizedT(i18n, language, namespace, keyPrefix) {
  return reactExports.useCallback(alwaysNewT(i18n, language, namespace, keyPrefix), [i18n, language, namespace, keyPrefix]);
}
function useTranslation(ns) {
  let props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const {
    i18n: i18nFromProps
  } = props;
  const {
    i18n: i18nFromContext,
    defaultNS: defaultNSFromContext
  } = reactExports.useContext(I18nContext) || {};
  const i18n = i18nFromProps || i18nFromContext || getI18n();
  if (i18n && !i18n.reportNamespaces) i18n.reportNamespaces = new ReportNamespaces();
  if (!i18n) {
    warnOnce('You will need to pass in an i18next instance by using initReactI18next');
    const notReadyT = (k, optsOrDefaultValue) => {
      if (typeof optsOrDefaultValue === 'string') return optsOrDefaultValue;
      if (optsOrDefaultValue && typeof optsOrDefaultValue === 'object' && typeof optsOrDefaultValue.defaultValue === 'string') return optsOrDefaultValue.defaultValue;
      return Array.isArray(k) ? k[k.length - 1] : k;
    };
    const retNotReady = [notReadyT, {}, false];
    retNotReady.t = notReadyT;
    retNotReady.i18n = {};
    retNotReady.ready = false;
    return retNotReady;
  }
  if (i18n.options.react && i18n.options.react.wait !== undefined) warnOnce('It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.');
  const i18nOptions = {
    ...getDefaults(),
    ...i18n.options.react,
    ...props
  };
  const {
    useSuspense,
    keyPrefix
  } = i18nOptions;
  let namespaces = ns || defaultNSFromContext || i18n.options && i18n.options.defaultNS;
  namespaces = typeof namespaces === 'string' ? [namespaces] : namespaces || ['translation'];
  if (i18n.reportNamespaces.addUsedNamespaces) i18n.reportNamespaces.addUsedNamespaces(namespaces);
  const ready = (i18n.isInitialized || i18n.initializedStoreOnce) && namespaces.every(n => hasLoadedNamespace(n, i18n, i18nOptions));
  const memoGetT = useMemoizedT(i18n, props.lng || null, i18nOptions.nsMode === 'fallback' ? namespaces : namespaces[0], keyPrefix);
  const getT = () => memoGetT;
  const getNewT = () => alwaysNewT(i18n, props.lng || null, i18nOptions.nsMode === 'fallback' ? namespaces : namespaces[0], keyPrefix);
  const [t, setT] = reactExports.useState(getT);
  let joinedNS = namespaces.join();
  if (props.lng) joinedNS = `${props.lng}${joinedNS}`;
  const previousJoinedNS = usePrevious(joinedNS);
  const isMounted = reactExports.useRef(true);
  reactExports.useEffect(() => {
    const {
      bindI18n,
      bindI18nStore
    } = i18nOptions;
    isMounted.current = true;
    if (!ready && !useSuspense) {
      if (props.lng) {
        loadLanguages(i18n, props.lng, namespaces, () => {
          if (isMounted.current) setT(getNewT);
        });
      } else {
        loadNamespaces(i18n, namespaces, () => {
          if (isMounted.current) setT(getNewT);
        });
      }
    }
    if (ready && previousJoinedNS && previousJoinedNS !== joinedNS && isMounted.current) {
      setT(getNewT);
    }
    function boundReset() {
      if (isMounted.current) setT(getNewT);
    }
    if (bindI18n && i18n) i18n.on(bindI18n, boundReset);
    if (bindI18nStore && i18n) i18n.store.on(bindI18nStore, boundReset);
    return () => {
      isMounted.current = false;
      if (bindI18n && i18n) bindI18n.split(' ').forEach(e => i18n.off(e, boundReset));
      if (bindI18nStore && i18n) bindI18nStore.split(' ').forEach(e => i18n.store.off(e, boundReset));
    };
  }, [i18n, joinedNS]);
  reactExports.useEffect(() => {
    if (isMounted.current && ready) {
      setT(getT);
    }
  }, [i18n, keyPrefix, ready]);
  const ret = [t, i18n, ready];
  ret.t = t;
  ret.i18n = i18n;
  ret.ready = ready;
  if (ready) return ret;
  if (!ready && !useSuspense) return ret;
  throw new Promise(resolve => {
    if (props.lng) {
      loadLanguages(i18n, props.lng, namespaces, () => resolve());
    } else {
      loadNamespaces(i18n, namespaces, () => resolve());
    }
  });
}

function initI18next(locale) {
    instance.use(initReactI18next).init({
        resources: {
            [`${locale}`]: {},
        },
        lng: locale,
        lowerCaseLng: true,
        interpolation: {
            escapeValue: false,
        },
        keySeparator: false,
        pluralSeparator: ".",
    });
}

var reactIs$2 = {exports: {}};

var reactIs_production_min$1 = {};

/** @license React v17.0.2
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactIs_production_min$1;

function requireReactIs_production_min$1 () {
	if (hasRequiredReactIs_production_min$1) return reactIs_production_min$1;
	hasRequiredReactIs_production_min$1 = 1;
var b=60103,c=60106,d=60107,e=60108,f=60114,g=60109,h=60110,k=60112,l=60113,m=60120,n=60115,p=60116,q=60121,r=60122,u=60117,v=60129,w=60131;
	if("function"===typeof Symbol&&Symbol.for){var x=Symbol.for;b=x("react.element");c=x("react.portal");d=x("react.fragment");e=x("react.strict_mode");f=x("react.profiler");g=x("react.provider");h=x("react.context");k=x("react.forward_ref");l=x("react.suspense");m=x("react.suspense_list");n=x("react.memo");p=x("react.lazy");q=x("react.block");r=x("react.server.block");u=x("react.fundamental");v=x("react.debug_trace_mode");w=x("react.legacy_hidden");}
	function y(a){if("object"===typeof a&&null!==a){var t=a.$$typeof;switch(t){case b:switch(a=a.type,a){case d:case f:case e:case l:case m:return a;default:switch(a=a&&a.$$typeof,a){case h:case k:case p:case n:case g:return a;default:return t}}case c:return t}}}var z=g,A=b,B=k,C=d,D=p,E=n,F=c,G=f,H=e,I=l;reactIs_production_min$1.ContextConsumer=h;reactIs_production_min$1.ContextProvider=z;reactIs_production_min$1.Element=A;reactIs_production_min$1.ForwardRef=B;reactIs_production_min$1.Fragment=C;reactIs_production_min$1.Lazy=D;reactIs_production_min$1.Memo=E;reactIs_production_min$1.Portal=F;reactIs_production_min$1.Profiler=G;reactIs_production_min$1.StrictMode=H;
	reactIs_production_min$1.Suspense=I;reactIs_production_min$1.isAsyncMode=function(){return !1};reactIs_production_min$1.isConcurrentMode=function(){return !1};reactIs_production_min$1.isContextConsumer=function(a){return y(a)===h};reactIs_production_min$1.isContextProvider=function(a){return y(a)===g};reactIs_production_min$1.isElement=function(a){return "object"===typeof a&&null!==a&&a.$$typeof===b};reactIs_production_min$1.isForwardRef=function(a){return y(a)===k};reactIs_production_min$1.isFragment=function(a){return y(a)===d};reactIs_production_min$1.isLazy=function(a){return y(a)===p};reactIs_production_min$1.isMemo=function(a){return y(a)===n};
	reactIs_production_min$1.isPortal=function(a){return y(a)===c};reactIs_production_min$1.isProfiler=function(a){return y(a)===f};reactIs_production_min$1.isStrictMode=function(a){return y(a)===e};reactIs_production_min$1.isSuspense=function(a){return y(a)===l};reactIs_production_min$1.isValidElementType=function(a){return "string"===typeof a||"function"===typeof a||a===d||a===f||a===v||a===e||a===l||a===m||a===w||"object"===typeof a&&null!==a&&(a.$$typeof===p||a.$$typeof===n||a.$$typeof===g||a.$$typeof===h||a.$$typeof===k||a.$$typeof===u||a.$$typeof===q||a[0]===r)?!0:!1};
	reactIs_production_min$1.typeOf=y;
	return reactIs_production_min$1;
}

{
  reactIs$2.exports = requireReactIs_production_min$1();
}

var reactIsExports$1 = reactIs$2.exports;

function stylis_min (W) {
  function M(d, c, e, h, a) {
    for (var m = 0, b = 0, v = 0, n = 0, q, g, x = 0, K = 0, k, u = k = q = 0, l = 0, r = 0, I = 0, t = 0, B = e.length, J = B - 1, y, f = '', p = '', F = '', G = '', C; l < B;) {
      g = e.charCodeAt(l);
      l === J && 0 !== b + n + v + m && (0 !== b && (g = 47 === b ? 10 : 47), n = v = m = 0, B++, J++);

      if (0 === b + n + v + m) {
        if (l === J && (0 < r && (f = f.replace(N, '')), 0 < f.trim().length)) {
          switch (g) {
            case 32:
            case 9:
            case 59:
            case 13:
            case 10:
              break;

            default:
              f += e.charAt(l);
          }

          g = 59;
        }

        switch (g) {
          case 123:
            f = f.trim();
            q = f.charCodeAt(0);
            k = 1;

            for (t = ++l; l < B;) {
              switch (g = e.charCodeAt(l)) {
                case 123:
                  k++;
                  break;

                case 125:
                  k--;
                  break;

                case 47:
                  switch (g = e.charCodeAt(l + 1)) {
                    case 42:
                    case 47:
                      a: {
                        for (u = l + 1; u < J; ++u) {
                          switch (e.charCodeAt(u)) {
                            case 47:
                              if (42 === g && 42 === e.charCodeAt(u - 1) && l + 2 !== u) {
                                l = u + 1;
                                break a;
                              }

                              break;

                            case 10:
                              if (47 === g) {
                                l = u + 1;
                                break a;
                              }

                          }
                        }

                        l = u;
                      }

                  }

                  break;

                case 91:
                  g++;

                case 40:
                  g++;

                case 34:
                case 39:
                  for (; l++ < J && e.charCodeAt(l) !== g;) {
                  }

              }

              if (0 === k) break;
              l++;
            }

            k = e.substring(t, l);
            0 === q && (q = (f = f.replace(ca, '').trim()).charCodeAt(0));

            switch (q) {
              case 64:
                0 < r && (f = f.replace(N, ''));
                g = f.charCodeAt(1);

                switch (g) {
                  case 100:
                  case 109:
                  case 115:
                  case 45:
                    r = c;
                    break;

                  default:
                    r = O;
                }

                k = M(c, r, k, g, a + 1);
                t = k.length;
                0 < A && (r = X(O, f, I), C = H(3, k, r, c, D, z, t, g, a, h), f = r.join(''), void 0 !== C && 0 === (t = (k = C.trim()).length) && (g = 0, k = ''));
                if (0 < t) switch (g) {
                  case 115:
                    f = f.replace(da, ea);

                  case 100:
                  case 109:
                  case 45:
                    k = f + '{' + k + '}';
                    break;

                  case 107:
                    f = f.replace(fa, '$1 $2');
                    k = f + '{' + k + '}';
                    k = 1 === w || 2 === w && L('@' + k, 3) ? '@-webkit-' + k + '@' + k : '@' + k;
                    break;

                  default:
                    k = f + k, 112 === h && (k = (p += k, ''));
                } else k = '';
                break;

              default:
                k = M(c, X(c, f, I), k, h, a + 1);
            }

            F += k;
            k = I = r = u = q = 0;
            f = '';
            g = e.charCodeAt(++l);
            break;

          case 125:
          case 59:
            f = (0 < r ? f.replace(N, '') : f).trim();
            if (1 < (t = f.length)) switch (0 === u && (q = f.charCodeAt(0), 45 === q || 96 < q && 123 > q) && (t = (f = f.replace(' ', ':')).length), 0 < A && void 0 !== (C = H(1, f, c, d, D, z, p.length, h, a, h)) && 0 === (t = (f = C.trim()).length) && (f = '\x00\x00'), q = f.charCodeAt(0), g = f.charCodeAt(1), q) {
              case 0:
                break;

              case 64:
                if (105 === g || 99 === g) {
                  G += f + e.charAt(l);
                  break;
                }

              default:
                58 !== f.charCodeAt(t - 1) && (p += P(f, q, g, f.charCodeAt(2)));
            }
            I = r = u = q = 0;
            f = '';
            g = e.charCodeAt(++l);
        }
      }

      switch (g) {
        case 13:
        case 10:
          47 === b ? b = 0 : 0 === 1 + q && 107 !== h && 0 < f.length && (r = 1, f += '\x00');
          0 < A * Y && H(0, f, c, d, D, z, p.length, h, a, h);
          z = 1;
          D++;
          break;

        case 59:
        case 125:
          if (0 === b + n + v + m) {
            z++;
            break;
          }

        default:
          z++;
          y = e.charAt(l);

          switch (g) {
            case 9:
            case 32:
              if (0 === n + m + b) switch (x) {
                case 44:
                case 58:
                case 9:
                case 32:
                  y = '';
                  break;

                default:
                  32 !== g && (y = ' ');
              }
              break;

            case 0:
              y = '\\0';
              break;

            case 12:
              y = '\\f';
              break;

            case 11:
              y = '\\v';
              break;

            case 38:
              0 === n + b + m && (r = I = 1, y = '\f' + y);
              break;

            case 108:
              if (0 === n + b + m + E && 0 < u) switch (l - u) {
                case 2:
                  112 === x && 58 === e.charCodeAt(l - 3) && (E = x);

                case 8:
                  111 === K && (E = K);
              }
              break;

            case 58:
              0 === n + b + m && (u = l);
              break;

            case 44:
              0 === b + v + n + m && (r = 1, y += '\r');
              break;

            case 34:
            case 39:
              0 === b && (n = n === g ? 0 : 0 === n ? g : n);
              break;

            case 91:
              0 === n + b + v && m++;
              break;

            case 93:
              0 === n + b + v && m--;
              break;

            case 41:
              0 === n + b + m && v--;
              break;

            case 40:
              if (0 === n + b + m) {
                if (0 === q) switch (2 * x + 3 * K) {
                  case 533:
                    break;

                  default:
                    q = 1;
                }
                v++;
              }

              break;

            case 64:
              0 === b + v + n + m + u + k && (k = 1);
              break;

            case 42:
            case 47:
              if (!(0 < n + m + v)) switch (b) {
                case 0:
                  switch (2 * g + 3 * e.charCodeAt(l + 1)) {
                    case 235:
                      b = 47;
                      break;

                    case 220:
                      t = l, b = 42;
                  }

                  break;

                case 42:
                  47 === g && 42 === x && t + 2 !== l && (33 === e.charCodeAt(t + 2) && (p += e.substring(t, l + 1)), y = '', b = 0);
              }
          }

          0 === b && (f += y);
      }

      K = x;
      x = g;
      l++;
    }

    t = p.length;

    if (0 < t) {
      r = c;
      if (0 < A && (C = H(2, p, r, d, D, z, t, h, a, h), void 0 !== C && 0 === (p = C).length)) return G + p + F;
      p = r.join(',') + '{' + p + '}';

      if (0 !== w * E) {
        2 !== w || L(p, 2) || (E = 0);

        switch (E) {
          case 111:
            p = p.replace(ha, ':-moz-$1') + p;
            break;

          case 112:
            p = p.replace(Q, '::-webkit-input-$1') + p.replace(Q, '::-moz-$1') + p.replace(Q, ':-ms-input-$1') + p;
        }

        E = 0;
      }
    }

    return G + p + F;
  }

  function X(d, c, e) {
    var h = c.trim().split(ia);
    c = h;
    var a = h.length,
        m = d.length;

    switch (m) {
      case 0:
      case 1:
        var b = 0;

        for (d = 0 === m ? '' : d[0] + ' '; b < a; ++b) {
          c[b] = Z(d, c[b], e).trim();
        }

        break;

      default:
        var v = b = 0;

        for (c = []; b < a; ++b) {
          for (var n = 0; n < m; ++n) {
            c[v++] = Z(d[n] + ' ', h[b], e).trim();
          }
        }

    }

    return c;
  }

  function Z(d, c, e) {
    var h = c.charCodeAt(0);
    33 > h && (h = (c = c.trim()).charCodeAt(0));

    switch (h) {
      case 38:
        return c.replace(F, '$1' + d.trim());

      case 58:
        return d.trim() + c.replace(F, '$1' + d.trim());

      default:
        if (0 < 1 * e && 0 < c.indexOf('\f')) return c.replace(F, (58 === d.charCodeAt(0) ? '' : '$1') + d.trim());
    }

    return d + c;
  }

  function P(d, c, e, h) {
    var a = d + ';',
        m = 2 * c + 3 * e + 4 * h;

    if (944 === m) {
      d = a.indexOf(':', 9) + 1;
      var b = a.substring(d, a.length - 1).trim();
      b = a.substring(0, d).trim() + b + ';';
      return 1 === w || 2 === w && L(b, 1) ? '-webkit-' + b + b : b;
    }

    if (0 === w || 2 === w && !L(a, 1)) return a;

    switch (m) {
      case 1015:
        return 97 === a.charCodeAt(10) ? '-webkit-' + a + a : a;

      case 951:
        return 116 === a.charCodeAt(3) ? '-webkit-' + a + a : a;

      case 963:
        return 110 === a.charCodeAt(5) ? '-webkit-' + a + a : a;

      case 1009:
        if (100 !== a.charCodeAt(4)) break;

      case 969:
      case 942:
        return '-webkit-' + a + a;

      case 978:
        return '-webkit-' + a + '-moz-' + a + a;

      case 1019:
      case 983:
        return '-webkit-' + a + '-moz-' + a + '-ms-' + a + a;

      case 883:
        if (45 === a.charCodeAt(8)) return '-webkit-' + a + a;
        if (0 < a.indexOf('image-set(', 11)) return a.replace(ja, '$1-webkit-$2') + a;
        break;

      case 932:
        if (45 === a.charCodeAt(4)) switch (a.charCodeAt(5)) {
          case 103:
            return '-webkit-box-' + a.replace('-grow', '') + '-webkit-' + a + '-ms-' + a.replace('grow', 'positive') + a;

          case 115:
            return '-webkit-' + a + '-ms-' + a.replace('shrink', 'negative') + a;

          case 98:
            return '-webkit-' + a + '-ms-' + a.replace('basis', 'preferred-size') + a;
        }
        return '-webkit-' + a + '-ms-' + a + a;

      case 964:
        return '-webkit-' + a + '-ms-flex-' + a + a;

      case 1023:
        if (99 !== a.charCodeAt(8)) break;
        b = a.substring(a.indexOf(':', 15)).replace('flex-', '').replace('space-between', 'justify');
        return '-webkit-box-pack' + b + '-webkit-' + a + '-ms-flex-pack' + b + a;

      case 1005:
        return ka.test(a) ? a.replace(aa, ':-webkit-') + a.replace(aa, ':-moz-') + a : a;

      case 1e3:
        b = a.substring(13).trim();
        c = b.indexOf('-') + 1;

        switch (b.charCodeAt(0) + b.charCodeAt(c)) {
          case 226:
            b = a.replace(G, 'tb');
            break;

          case 232:
            b = a.replace(G, 'tb-rl');
            break;

          case 220:
            b = a.replace(G, 'lr');
            break;

          default:
            return a;
        }

        return '-webkit-' + a + '-ms-' + b + a;

      case 1017:
        if (-1 === a.indexOf('sticky', 9)) break;

      case 975:
        c = (a = d).length - 10;
        b = (33 === a.charCodeAt(c) ? a.substring(0, c) : a).substring(d.indexOf(':', 7) + 1).trim();

        switch (m = b.charCodeAt(0) + (b.charCodeAt(7) | 0)) {
          case 203:
            if (111 > b.charCodeAt(8)) break;

          case 115:
            a = a.replace(b, '-webkit-' + b) + ';' + a;
            break;

          case 207:
          case 102:
            a = a.replace(b, '-webkit-' + (102 < m ? 'inline-' : '') + 'box') + ';' + a.replace(b, '-webkit-' + b) + ';' + a.replace(b, '-ms-' + b + 'box') + ';' + a;
        }

        return a + ';';

      case 938:
        if (45 === a.charCodeAt(5)) switch (a.charCodeAt(6)) {
          case 105:
            return b = a.replace('-items', ''), '-webkit-' + a + '-webkit-box-' + b + '-ms-flex-' + b + a;

          case 115:
            return '-webkit-' + a + '-ms-flex-item-' + a.replace(ba, '') + a;

          default:
            return '-webkit-' + a + '-ms-flex-line-pack' + a.replace('align-content', '').replace(ba, '') + a;
        }
        break;

      case 973:
      case 989:
        if (45 !== a.charCodeAt(3) || 122 === a.charCodeAt(4)) break;

      case 931:
      case 953:
        if (!0 === la.test(d)) return 115 === (b = d.substring(d.indexOf(':') + 1)).charCodeAt(0) ? P(d.replace('stretch', 'fill-available'), c, e, h).replace(':fill-available', ':stretch') : a.replace(b, '-webkit-' + b) + a.replace(b, '-moz-' + b.replace('fill-', '')) + a;
        break;

      case 962:
        if (a = '-webkit-' + a + (102 === a.charCodeAt(5) ? '-ms-' + a : '') + a, 211 === e + h && 105 === a.charCodeAt(13) && 0 < a.indexOf('transform', 10)) return a.substring(0, a.indexOf(';', 27) + 1).replace(ma, '$1-webkit-$2') + a;
    }

    return a;
  }

  function L(d, c) {
    var e = d.indexOf(1 === c ? ':' : '{'),
        h = d.substring(0, 3 !== c ? e : 10);
    e = d.substring(e + 1, d.length - 1);
    return R(2 !== c ? h : h.replace(na, '$1'), e, c);
  }

  function ea(d, c) {
    var e = P(c, c.charCodeAt(0), c.charCodeAt(1), c.charCodeAt(2));
    return e !== c + ';' ? e.replace(oa, ' or ($1)').substring(4) : '(' + c + ')';
  }

  function H(d, c, e, h, a, m, b, v, n, q) {
    for (var g = 0, x = c, w; g < A; ++g) {
      switch (w = S[g].call(B, d, x, e, h, a, m, b, v, n, q)) {
        case void 0:
        case !1:
        case !0:
        case null:
          break;

        default:
          x = w;
      }
    }

    if (x !== c) return x;
  }

  function T(d) {
    switch (d) {
      case void 0:
      case null:
        A = S.length = 0;
        break;

      default:
        if ('function' === typeof d) S[A++] = d;else if ('object' === typeof d) for (var c = 0, e = d.length; c < e; ++c) {
          T(d[c]);
        } else Y = !!d | 0;
    }

    return T;
  }

  function U(d) {
    d = d.prefix;
    void 0 !== d && (R = null, d ? 'function' !== typeof d ? w = 1 : (w = 2, R = d) : w = 0);
    return U;
  }

  function B(d, c) {
    var e = d;
    33 > e.charCodeAt(0) && (e = e.trim());
    V = e;
    e = [V];

    if (0 < A) {
      var h = H(-1, c, e, e, D, z, 0, 0, 0, 0);
      void 0 !== h && 'string' === typeof h && (c = h);
    }

    var a = M(O, e, c, 0, 0);
    0 < A && (h = H(-2, a, e, e, D, z, a.length, 0, 0, 0), void 0 !== h && (a = h));
    V = '';
    E = 0;
    z = D = 1;
    return a;
  }

  var ca = /^\0+/g,
      N = /[\0\r\f]/g,
      aa = /: */g,
      ka = /zoo|gra/,
      ma = /([,: ])(transform)/g,
      ia = /,\r+?/g,
      F = /([\t\r\n ])*\f?&/g,
      fa = /@(k\w+)\s*(\S*)\s*/,
      Q = /::(place)/g,
      ha = /:(read-only)/g,
      G = /[svh]\w+-[tblr]{2}/,
      da = /\(\s*(.*)\s*\)/g,
      oa = /([\s\S]*?);/g,
      ba = /-self|flex-/g,
      na = /[^]*?(:[rp][el]a[\w-]+)[^]*/,
      la = /stretch|:\s*\w+\-(?:conte|avail)/,
      ja = /([^-])(image-set\()/,
      z = 1,
      D = 1,
      E = 0,
      w = 1,
      O = [],
      S = [],
      A = 0,
      R = null,
      Y = 0,
      V = '';
  B.use = T;
  B.set = U;
  void 0 !== W && U(W);
  return B;
}

var unitlessKeys = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};

function memoize$2(fn) {
  var cache = Object.create(null);
  return function (arg) {
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    return cache[arg];
  };
}

var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/; // https://esbench.com/bench/5bfee68a4cd7e6009ef61d23

var isPropValid = /* #__PURE__ */memoize$2(function (prop) {
  return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111
  /* o */
  && prop.charCodeAt(1) === 110
  /* n */
  && prop.charCodeAt(2) < 91;
}
/* Z+1 */
);

var reactIs$1 = {exports: {}};

var reactIs_production_min = {};

/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactIs_production_min;

function requireReactIs_production_min () {
	if (hasRequiredReactIs_production_min) return reactIs_production_min;
	hasRequiredReactIs_production_min = 1;
var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?
	Symbol.for("react.suspense_list"):60120,r=b?Symbol.for("react.memo"):60115,t=b?Symbol.for("react.lazy"):60116,v=b?Symbol.for("react.block"):60121,w=b?Symbol.for("react.fundamental"):60117,x=b?Symbol.for("react.responder"):60118,y=b?Symbol.for("react.scope"):60119;
	function z(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case t:case r:case h:return a;default:return u}}case d:return u}}}function A(a){return z(a)===m}reactIs_production_min.AsyncMode=l;reactIs_production_min.ConcurrentMode=m;reactIs_production_min.ContextConsumer=k;reactIs_production_min.ContextProvider=h;reactIs_production_min.Element=c;reactIs_production_min.ForwardRef=n;reactIs_production_min.Fragment=e;reactIs_production_min.Lazy=t;reactIs_production_min.Memo=r;reactIs_production_min.Portal=d;
	reactIs_production_min.Profiler=g;reactIs_production_min.StrictMode=f;reactIs_production_min.Suspense=p;reactIs_production_min.isAsyncMode=function(a){return A(a)||z(a)===l};reactIs_production_min.isConcurrentMode=A;reactIs_production_min.isContextConsumer=function(a){return z(a)===k};reactIs_production_min.isContextProvider=function(a){return z(a)===h};reactIs_production_min.isElement=function(a){return "object"===typeof a&&null!==a&&a.$$typeof===c};reactIs_production_min.isForwardRef=function(a){return z(a)===n};reactIs_production_min.isFragment=function(a){return z(a)===e};reactIs_production_min.isLazy=function(a){return z(a)===t};
	reactIs_production_min.isMemo=function(a){return z(a)===r};reactIs_production_min.isPortal=function(a){return z(a)===d};reactIs_production_min.isProfiler=function(a){return z(a)===g};reactIs_production_min.isStrictMode=function(a){return z(a)===f};reactIs_production_min.isSuspense=function(a){return z(a)===p};
	reactIs_production_min.isValidElementType=function(a){return "string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||a===q||"object"===typeof a&&null!==a&&(a.$$typeof===t||a.$$typeof===r||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n||a.$$typeof===w||a.$$typeof===x||a.$$typeof===y||a.$$typeof===v)};reactIs_production_min.typeOf=z;
	return reactIs_production_min;
}

{
  reactIs$1.exports = requireReactIs_production_min();
}

var reactIsExports = reactIs$1.exports;

var reactIs = reactIsExports;

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var REACT_STATICS = {
  childContextTypes: true,
  contextType: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDefaultProps: true,
  getDerivedStateFromError: true,
  getDerivedStateFromProps: true,
  mixins: true,
  propTypes: true,
  type: true
};
var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};
var FORWARD_REF_STATICS = {
  '$$typeof': true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  '$$typeof': true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;

function getStatics(component) {
  // React v16.11 and below
  if (reactIs.isMemo(component)) {
    return MEMO_STATICS;
  } // React v16.12 and above


  return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
}

var defineProperty$3 = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
var getPrototypeOf$1 = Object.getPrototypeOf;
var objectPrototype = Object.prototype;
function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
  if (typeof sourceComponent !== 'string') {
    // don't hoist over string (html) components
    if (objectPrototype) {
      var inheritedComponent = getPrototypeOf$1(sourceComponent);

      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
      }
    }

    var keys = getOwnPropertyNames(sourceComponent);

    if (getOwnPropertySymbols) {
      keys = keys.concat(getOwnPropertySymbols(sourceComponent));
    }

    var targetStatics = getStatics(targetComponent);
    var sourceStatics = getStatics(sourceComponent);

    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i];

      if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
        var descriptor = getOwnPropertyDescriptor$1(sourceComponent, key);

        try {
          // Avoid failures from read-only properties
          defineProperty$3(targetComponent, key, descriptor);
        } catch (e) {}
      }
    }
  }

  return targetComponent;
}

var hoistNonReactStatics_cjs = hoistNonReactStatics;

var f = /*@__PURE__*/getDefaultExportFromCjs(hoistNonReactStatics_cjs);

function m$2(){return (m$2=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r]);}return e}).apply(this,arguments)}var y=function(e,t){for(var n=[e[0]],r=0,o=t.length;r<o;r+=1)n.push(t[r],e[r+1]);return n},v=function(t){return null!==t&&"object"==typeof t&&"[object Object]"===(t.toString?t.toString():Object.prototype.toString.call(t))&&!reactIsExports$1.typeOf(t)},g=Object.freeze([]),S=Object.freeze({});function w(e){return "function"==typeof e}function E(e){return e.displayName||e.name||"Component"}function b(e){return e&&"string"==typeof e.styledComponentId}var _="undefined"!=typeof process&&void 0!==process.env&&(process.env.REACT_APP_SC_ATTR||process.env.SC_ATTR)||"data-styled",A="undefined"!=typeof window&&"HTMLElement"in window,C=Boolean("boolean"==typeof SC_DISABLE_SPEEDY?SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!==process.env&&(void 0!==process.env.REACT_APP_SC_DISABLE_SPEEDY&&""!==process.env.REACT_APP_SC_DISABLE_SPEEDY?"false"!==process.env.REACT_APP_SC_DISABLE_SPEEDY&&process.env.REACT_APP_SC_DISABLE_SPEEDY:void 0!==process.env.SC_DISABLE_SPEEDY&&""!==process.env.SC_DISABLE_SPEEDY?"false"!==process.env.SC_DISABLE_SPEEDY&&process.env.SC_DISABLE_SPEEDY:"production"!=="production"));function R(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];throw new Error("An error occurred. See https://git.io/JUIaE#"+e+" for more information."+(n.length>0?" Args: "+n.join(", "):""))}var D=function(){function e(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e;}var t=e.prototype;return t.indexOfGroup=function(e){for(var t=0,n=0;n<e;n++)t+=this.groupSizes[n];return t},t.insertRules=function(e,t){if(e>=this.groupSizes.length){for(var n=this.groupSizes,r=n.length,o=r;e>=o;)(o<<=1)<0&&R(16,""+e);this.groupSizes=new Uint32Array(o),this.groupSizes.set(n),this.length=o;for(var s=r;s<o;s++)this.groupSizes[s]=0;}for(var i=this.indexOfGroup(e+1),a=0,c=t.length;a<c;a++)this.tag.insertRule(i,t[a])&&(this.groupSizes[e]++,i++);},t.clearGroup=function(e){if(e<this.length){var t=this.groupSizes[e],n=this.indexOfGroup(e),r=n+t;this.groupSizes[e]=0;for(var o=n;o<r;o++)this.tag.deleteRule(n);}},t.getGroup=function(e){var t="";if(e>=this.length||0===this.groupSizes[e])return t;for(var n=this.groupSizes[e],r=this.indexOfGroup(e),o=r+n,s=r;s<o;s++)t+=this.tag.getRule(s)+"/*!sc*/\n";return t},e}(),j=new Map,T=new Map,x=1,k=function(e){if(j.has(e))return j.get(e);for(;T.has(x);)x++;var t=x++;return j.set(e,t),T.set(t,e),t},V=function(e){return T.get(e)},z=function(e,t){t>=x&&(x=t+1),j.set(e,t),T.set(t,e);},B="style["+_+'][data-styled-version="5.3.11"]',M=new RegExp("^"+_+'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)'),G=function(e,t,n){for(var r,o=n.split(","),s=0,i=o.length;s<i;s++)(r=o[s])&&e.registerName(t,r);},L=function(e,t){for(var n=(t.textContent||"").split("/*!sc*/\n"),r=[],o=0,s=n.length;o<s;o++){var i=n[o].trim();if(i){var a=i.match(M);if(a){var c=0|parseInt(a[1],10),u=a[2];0!==c&&(z(u,c),G(e,u,a[3]),e.getTag().insertRules(c,r)),r.length=0;}else r.push(i);}}},F=function(){return "undefined"!=typeof __webpack_nonce__?__webpack_nonce__:null},Y=function(e){var t=document.head,n=e||t,r=document.createElement("style"),o=function(e){for(var t=e.childNodes,n=t.length;n>=0;n--){var r=t[n];if(r&&1===r.nodeType&&r.hasAttribute(_))return r}}(n),s=void 0!==o?o.nextSibling:null;r.setAttribute(_,"active"),r.setAttribute("data-styled-version","5.3.11");var i=F();return i&&r.setAttribute("nonce",i),n.insertBefore(r,s),r},q=function(){function e(e){var t=this.element=Y(e);t.appendChild(document.createTextNode("")),this.sheet=function(e){if(e.sheet)return e.sheet;for(var t=document.styleSheets,n=0,r=t.length;n<r;n++){var o=t[n];if(o.ownerNode===e)return o}R(17);}(t),this.length=0;}var t=e.prototype;return t.insertRule=function(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch(e){return !1}},t.deleteRule=function(e){this.sheet.deleteRule(e),this.length--;},t.getRule=function(e){var t=this.sheet.cssRules[e];return void 0!==t&&"string"==typeof t.cssText?t.cssText:""},e}(),H=function(){function e(e){var t=this.element=Y(e);this.nodes=t.childNodes,this.length=0;}var t=e.prototype;return t.insertRule=function(e,t){if(e<=this.length&&e>=0){var n=document.createTextNode(t),r=this.nodes[e];return this.element.insertBefore(n,r||null),this.length++,!0}return !1},t.deleteRule=function(e){this.element.removeChild(this.nodes[e]),this.length--;},t.getRule=function(e){return e<this.length?this.nodes[e].textContent:""},e}(),$=function(){function e(e){this.rules=[],this.length=0;}var t=e.prototype;return t.insertRule=function(e,t){return e<=this.length&&(this.rules.splice(e,0,t),this.length++,!0)},t.deleteRule=function(e){this.rules.splice(e,1),this.length--;},t.getRule=function(e){return e<this.length?this.rules[e]:""},e}(),W=A,U={isServer:!A,useCSSOMInjection:!C},J=function(){function e(e,t,n){void 0===e&&(e=S),void 0===t&&(t={}),this.options=m$2({},U,{},e),this.gs=t,this.names=new Map(n),this.server=!!e.isServer,!this.server&&A&&W&&(W=!1,function(e){for(var t=document.querySelectorAll(B),n=0,r=t.length;n<r;n++){var o=t[n];o&&"active"!==o.getAttribute(_)&&(L(e,o),o.parentNode&&o.parentNode.removeChild(o));}}(this));}e.registerId=function(e){return k(e)};var t=e.prototype;return t.reconstructWithOptions=function(t,n){return void 0===n&&(n=!0),new e(m$2({},this.options,{},t),this.gs,n&&this.names||void 0)},t.allocateGSInstance=function(e){return this.gs[e]=(this.gs[e]||0)+1},t.getTag=function(){return this.tag||(this.tag=(n=(t=this.options).isServer,r=t.useCSSOMInjection,o=t.target,e=n?new $(o):r?new q(o):new H(o),new D(e)));var e,t,n,r,o;},t.hasNameForId=function(e,t){return this.names.has(e)&&this.names.get(e).has(t)},t.registerName=function(e,t){if(k(e),this.names.has(e))this.names.get(e).add(t);else {var n=new Set;n.add(t),this.names.set(e,n);}},t.insertRules=function(e,t,n){this.registerName(e,t),this.getTag().insertRules(k(e),n);},t.clearNames=function(e){this.names.has(e)&&this.names.get(e).clear();},t.clearRules=function(e){this.getTag().clearGroup(k(e)),this.clearNames(e);},t.clearTag=function(){this.tag=void 0;},t.toString=function(){return function(e){for(var t=e.getTag(),n=t.length,r="",o=0;o<n;o++){var s=V(o);if(void 0!==s){var i=e.names.get(s),a=t.getGroup(o);if(i&&a&&i.size){var c=_+".g"+o+'[id="'+s+'"]',u="";void 0!==i&&i.forEach((function(e){e.length>0&&(u+=e+",");})),r+=""+a+c+'{content:"'+u+'"}/*!sc*/\n';}}}return r}(this)},e}(),X=/(a)(d)/gi,Z=function(e){return String.fromCharCode(e+(e>25?39:97))};function K(e){var t,n="";for(t=Math.abs(e);t>52;t=t/52|0)n=Z(t%52)+n;return (Z(t%52)+n).replace(X,"$1-$2")}var Q=function(e,t){for(var n=t.length;n;)e=33*e^t.charCodeAt(--n);return e},ee=function(e){return Q(5381,e)};function te(e){for(var t=0;t<e.length;t+=1){var n=e[t];if(w(n)&&!b(n))return !1}return !0}var ne=ee("5.3.11"),re=function(){function e(e,t,n){this.rules=e,this.staticRulesId="",this.isStatic=(void 0===n||n.isStatic)&&te(e),this.componentId=t,this.baseHash=Q(ne,t),this.baseStyle=n,J.registerId(t);}return e.prototype.generateAndInjectStyles=function(e,t,n){var r=this.componentId,o=[];if(this.baseStyle&&o.push(this.baseStyle.generateAndInjectStyles(e,t,n)),this.isStatic&&!n.hash)if(this.staticRulesId&&t.hasNameForId(r,this.staticRulesId))o.push(this.staticRulesId);else {var s=be$2(this.rules,e,t,n).join(""),i=K(Q(this.baseHash,s)>>>0);if(!t.hasNameForId(r,i)){var a=n(s,"."+i,void 0,r);t.insertRules(r,i,a);}o.push(i),this.staticRulesId=i;}else {for(var c=this.rules.length,u=Q(this.baseHash,n.hash),l="",d=0;d<c;d++){var h=this.rules[d];if("string"==typeof h)l+=h;else if(h){var p=be$2(h,e,t,n),f=Array.isArray(p)?p.join(""):p;u=Q(u,f+d),l+=f;}}if(l){var m=K(u>>>0);if(!t.hasNameForId(r,m)){var y=n(l,"."+m,void 0,r);t.insertRules(r,m,y);}o.push(m);}}return o.join(" ")},e}(),oe=/^\s*\/\/.*$/gm,se=[":","[",".","#"];function ie(e){var t,n,r,o,s=void 0===e?S:e,i=s.options,a=void 0===i?S:i,c=s.plugins,u=void 0===c?g:c,l=new stylis_min(a),h=[],p=function(e){function t(t){if(t)try{e(t+"}");}catch(e){}}return function(n,r,o,s,i,a,c,u,l,d){switch(n){case 1:if(0===l&&64===r.charCodeAt(0))return e(r+";"),"";break;case 2:if(0===u)return r+"/*|*/";break;case 3:switch(u){case 102:case 112:return e(o[0]+r),"";default:return r+(0===d?"/*|*/":"")}case-2:r.split("/*|*/}").forEach(t);}}}((function(e){h.push(e);})),f=function(e,r,s){return 0===r&&-1!==se.indexOf(s[n.length])||s.match(o)?e:"."+t};function m(e,s,i,a){void 0===a&&(a="&");var c=e.replace(oe,""),u=s&&i?i+" "+s+" { "+c+" }":c;return t=a,n=s,r=new RegExp("\\"+n+"\\b","g"),o=new RegExp("(\\"+n+"\\b){2,}"),l(i||!s?"":s,u)}return l.use([].concat(u,[function(e,t,o){2===e&&o.length&&o[0].lastIndexOf(n)>0&&(o[0]=o[0].replace(r,f));},p,function(e){if(-2===e){var t=h;return h=[],t}}])),m.hash=u.length?u.reduce((function(e,t){return t.name||R(15),Q(e,t.name)}),5381).toString():"",m}var ae=React__default.createContext();ae.Consumer;var ue=React__default.createContext(),le=(ue.Consumer,new J),de$2=ie();function he$2(){return reactExports.useContext(ae)||le}function pe(){return reactExports.useContext(ue)||de$2}var me=function(){function e(e,t){var n=this;this.inject=function(e,t){void 0===t&&(t=de$2);var r=n.name+t.hash;e.hasNameForId(n.id,r)||e.insertRules(n.id,r,t(n.rules,r,"@keyframes"));},this.toString=function(){return R(12,String(n.name))},this.name=e,this.id="sc-keyframes-"+e,this.rules=t;}return e.prototype.getName=function(e){return void 0===e&&(e=de$2),this.name+e.hash},e}(),ye=/([A-Z])/,ve=/([A-Z])/g,ge=/^ms-/,Se=function(e){return "-"+e.toLowerCase()};function we(e){return ye.test(e)?e.replace(ve,Se).replace(ge,"-ms-"):e}var Ee=function(e){return null==e||!1===e||""===e};function be$2(e,n,r,o){if(Array.isArray(e)){for(var s,i=[],a=0,c=e.length;a<c;a+=1)""!==(s=be$2(e[a],n,r,o))&&(Array.isArray(s)?i.push.apply(i,s):i.push(s));return i}if(Ee(e))return "";if(b(e))return "."+e.styledComponentId;if(w(e)){if("function"!=typeof(l=e)||l.prototype&&l.prototype.isReactComponent||!n)return e;var u=e(n);return be$2(u,n,r,o)}var l;return e instanceof me?r?(e.inject(r,o),e.getName(o)):e:v(e)?function e(t,n){var r,o,s=[];for(var i in t)t.hasOwnProperty(i)&&!Ee(t[i])&&(Array.isArray(t[i])&&t[i].isCss||w(t[i])?s.push(we(i)+":",t[i],";"):v(t[i])?s.push.apply(s,e(t[i],i)):s.push(we(i)+": "+(r=i,null==(o=t[i])||"boolean"==typeof o||""===o?"":"number"!=typeof o||0===o||r in unitlessKeys||r.startsWith("--")?String(o).trim():o+"px")+";"));return n?[n+" {"].concat(s,["}"]):s}(e):e.toString()}var _e=function(e){return Array.isArray(e)&&(e.isCss=!0),e};function Ne(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return w(e)||v(e)?_e(be$2(y(g,[e].concat(n)))):0===n.length&&1===e.length&&"string"==typeof e[0]?e:_e(be$2(y(e,n)))}var Pe=function(e,t,n){return void 0===n&&(n=S),e.theme!==n.theme&&e.theme||t||n.theme},Oe=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,Re=/(^-|-$)/g;function De(e){return e.replace(Oe,"-").replace(Re,"")}var je=function(e){return K(ee(e)>>>0)};function Te(e){return "string"==typeof e&&("production"==="production")}var xe=function(e){return "function"==typeof e||"object"==typeof e&&null!==e&&!Array.isArray(e)},ke=function(e){return "__proto__"!==e&&"constructor"!==e&&"prototype"!==e};function Ve(e,t,n){var r=e[n];xe(t)&&xe(r)?ze(r,t):e[n]=t;}function ze(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];for(var o=0,s=n;o<s.length;o++){var i=s[o];if(xe(i))for(var a in i)ke(a)&&Ve(e,i[a],a);}return e}var Be=React__default.createContext();Be.Consumer;function Ge(e){var t=reactExports.useContext(Be),n=reactExports.useMemo((function(){return function(e,t){if(!e)return R(14);if(w(e)){var n=e(t);return n}return Array.isArray(e)||"object"!=typeof e?R(8):t?m$2({},t,{},e):e}(e.theme,t)}),[e.theme,t]);return e.children?React__default.createElement(Be.Provider,{value:n},e.children):null}var Le={};function Fe(e,t,n){var o=b(e),i=!Te(e),a=t.attrs,c=void 0===a?g:a,l=t.componentId,d=void 0===l?function(e,t){var n="string"!=typeof e?"sc":De(e);Le[n]=(Le[n]||0)+1;var r=n+"-"+je("5.3.11"+n+Le[n]);return t?t+"-"+r:r}(t.displayName,t.parentComponentId):l,h=t.displayName,y=void 0===h?function(e){return Te(e)?"styled."+e:"Styled("+E(e)+")"}(e):h,v=t.displayName&&t.componentId?De(t.displayName)+"-"+t.componentId:t.componentId||d,_=o&&e.attrs?Array.prototype.concat(e.attrs,c).filter(Boolean):c,N=t.shouldForwardProp;o&&e.shouldForwardProp&&(N=t.shouldForwardProp?function(n,r,o){return e.shouldForwardProp(n,r,o)&&t.shouldForwardProp(n,r,o)}:e.shouldForwardProp);var A,C=new re(n,v,o?e.componentStyle:void 0),I=C.isStatic&&0===c.length,P=function(e,t){return function(e,t,n,r){var o=e.attrs,i=e.componentStyle,a=e.defaultProps,c=e.foldedComponentIds,l=e.shouldForwardProp,d=e.styledComponentId,h=e.target,f=function(e,t,n){void 0===e&&(e=S);var r=m$2({},t,{theme:e}),o={};return n.forEach((function(e){var t,n,s,i=e;for(t in w(i)&&(i=i(r)),i)r[t]=o[t]="className"===t?(n=o[t],s=i[t],n&&s?n+" "+s:n||s):i[t];})),[r,o]}(Pe(t,reactExports.useContext(Be),a)||S,t,o),y=f[0],v=f[1],g=function(e,t,n,r){var o=he$2(),s=pe(),i=t?e.generateAndInjectStyles(S,o,s):e.generateAndInjectStyles(n,o,s);return i}(i,r,y),E=n,b=v.$as||t.$as||v.as||t.as||h,_=Te(b),N=v!==t?m$2({},t,{},v):t,A={};for(var C in N)"$"!==C[0]&&"as"!==C&&("forwardedAs"===C?A.as=N[C]:(l?l(C,isPropValid,b):!_||isPropValid(C))&&(A[C]=N[C]));return t.style&&v.style!==t.style&&(A.style=m$2({},t.style,{},v.style)),A.className=Array.prototype.concat(c,d,g!==d?g:null,t.className,v.className).filter(Boolean).join(" "),A.ref=E,reactExports.createElement(b,A)}(A,e,t,I)};return P.displayName=y,(A=React__default.forwardRef(P)).attrs=_,A.componentStyle=C,A.displayName=y,A.shouldForwardProp=N,A.foldedComponentIds=o?Array.prototype.concat(e.foldedComponentIds,e.styledComponentId):g,A.styledComponentId=v,A.target=o?e.target:e,A.withComponent=function(e){var r=t.componentId,o=function(e,t){if(null==e)return {};var n,r,o={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(t,["componentId"]),s=r&&r+"-"+(Te(e)?e:De(E(e)));return Fe(e,m$2({},o,{attrs:_,componentId:s}),n)},Object.defineProperty(A,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(t){this._foldedDefaultProps=o?ze({},e.defaultProps,t):t;}}),Object.defineProperty(A,"toString",{value:function(){return "."+A.styledComponentId}}),i&&f(A,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0,withComponent:!0}),A}var Ye=function(e){return function e(t,r,o){if(void 0===o&&(o=S),!reactIsExports$1.isValidElementType(r))return R(1,String(r));var s=function(){return t(r,o,Ne.apply(void 0,arguments))};return s.withConfig=function(n){return e(t,r,m$2({},o,{},n))},s.attrs=function(n){return e(t,r,m$2({},o,{attrs:Array.prototype.concat(o.attrs,n).filter(Boolean)}))},s}(Fe,e)};["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","textPath","tspan"].forEach((function(e){Ye[e]=Ye(e);}));function $e(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];var o=Ne.apply(void 0,[e].concat(n)).join(""),s=je(o);return new me(s,o)}var styled = Ye;

var propTypes = {exports: {}};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret_1;
var hasRequiredReactPropTypesSecret;

function requireReactPropTypesSecret () {
	if (hasRequiredReactPropTypesSecret) return ReactPropTypesSecret_1;
	hasRequiredReactPropTypesSecret = 1;

	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

	ReactPropTypesSecret_1 = ReactPropTypesSecret;
	return ReactPropTypesSecret_1;
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var factoryWithThrowingShims;
var hasRequiredFactoryWithThrowingShims;

function requireFactoryWithThrowingShims () {
	if (hasRequiredFactoryWithThrowingShims) return factoryWithThrowingShims;
	hasRequiredFactoryWithThrowingShims = 1;

	var ReactPropTypesSecret = requireReactPropTypesSecret();

	function emptyFunction() {}
	function emptyFunctionWithReset() {}
	emptyFunctionWithReset.resetWarningCache = emptyFunction;

	factoryWithThrowingShims = function() {
	  function shim(props, propName, componentName, location, propFullName, secret) {
	    if (secret === ReactPropTypesSecret) {
	      // It is still safe when called from React.
	      return;
	    }
	    var err = new Error(
	      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	      'Use PropTypes.checkPropTypes() to call them. ' +
	      'Read more at http://fb.me/use-check-prop-types'
	    );
	    err.name = 'Invariant Violation';
	    throw err;
	  }	  shim.isRequired = shim;
	  function getShim() {
	    return shim;
	  }	  // Important!
	  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
	  var ReactPropTypes = {
	    array: shim,
	    bigint: shim,
	    bool: shim,
	    func: shim,
	    number: shim,
	    object: shim,
	    string: shim,
	    symbol: shim,

	    any: shim,
	    arrayOf: getShim,
	    element: shim,
	    elementType: shim,
	    instanceOf: getShim,
	    node: shim,
	    objectOf: getShim,
	    oneOf: getShim,
	    oneOfType: getShim,
	    shape: getShim,
	    exact: getShim,

	    checkPropTypes: emptyFunctionWithReset,
	    resetWarningCache: emptyFunction
	  };

	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};
	return factoryWithThrowingShims;
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

{
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  propTypes.exports = requireFactoryWithThrowingShims()();
}

var propTypesExports = propTypes.exports;
var PropTypes = /*@__PURE__*/getDefaultExportFromCjs(propTypesExports);

/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

const INPUT_TYPES_WHITE_LIST = {
  text: true,
  search: true,
  url: true,
  tel: true,
  email: true,
  password: true,
  number: true,
  date: true,
  month: true,
  week: true,
  time: true,
  datetime: true,
  'datetime-local': true
};
function useFocusVisible(_temp) {
  let {
    scope,
    relativeDocument,
    className = 'garden-focus-visible',
    dataAttribute = 'data-garden-focus-visible'
  } = _temp === void 0 ? {} : _temp;
  if (!scope) {
    throw new Error('Error: the useFocusVisible() hook requires a "scope" property');
  }
  const hadKeyboardEvent = reactExports.useRef(false);
  const hadFocusVisibleRecently = reactExports.useRef(false);
  const hadFocusVisibleRecentlyTimeout = reactExports.useRef();
  reactExports.useEffect(() => {
    let environment = relativeDocument;
    if (!environment) {
      environment = document;
    }
    const isValidFocusTarget = el => {
      if (el && el !== scope.current && el.nodeName !== 'HTML' && el.nodeName !== 'BODY' && 'classList' in el && 'contains' in el.classList) {
        return true;
      }
      return false;
    };
    const focusTriggersKeyboardModality = el => {
      const type = el.type;
      const tagName = el.tagName;
      if (tagName === 'INPUT' && INPUT_TYPES_WHITE_LIST[type] && !el.readOnly) {
        return true;
      }
      if (tagName === 'TEXTAREA' && !el.readOnly) {
        return true;
      }
      if (el.isContentEditable) {
        return true;
      }
      return false;
    };
    const isFocused = el => {
      if (el && (el.classList.contains(className) || el.hasAttribute(dataAttribute))) {
        return true;
      }
      return false;
    };
    const addFocusVisibleClass = el => {
      if (isFocused(el)) {
        return;
      }
      el && el.classList.add(className);
      el && el.setAttribute(dataAttribute, 'true');
    };
    const removeFocusVisibleClass = el => {
      el.classList.remove(className);
      el.removeAttribute(dataAttribute);
    };
    const onKeyDown = e => {
      if (e.metaKey || e.altKey || e.ctrlKey) {
        return;
      }
      if (isValidFocusTarget(environment.activeElement)) {
        addFocusVisibleClass(environment.activeElement);
      }
      hadKeyboardEvent.current = true;
    };
    const onPointerDown = () => {
      hadKeyboardEvent.current = false;
    };
    const onFocus = e => {
      if (!isValidFocusTarget(e.target)) {
        return;
      }
      if (hadKeyboardEvent.current || focusTriggersKeyboardModality(e.target)) {
        addFocusVisibleClass(e.target);
      }
    };
    const onBlur = e => {
      if (!isValidFocusTarget(e.target)) {
        return;
      }
      if (isFocused(e.target)) {
        hadFocusVisibleRecently.current = true;
        clearTimeout(hadFocusVisibleRecentlyTimeout.current);
        const timeoutId = setTimeout(() => {
          hadFocusVisibleRecently.current = false;
          clearTimeout(hadFocusVisibleRecentlyTimeout.current);
        }, 100);
        hadFocusVisibleRecentlyTimeout.current = Number(timeoutId);
        removeFocusVisibleClass(e.target);
      }
    };
    const onInitialPointerMove = e => {
      const nodeName = e.target.nodeName;
      if (nodeName && nodeName.toLowerCase() === 'html') {
        return;
      }
      hadKeyboardEvent.current = false;
      removeInitialPointerMoveListeners();
    };
    const addInitialPointerMoveListeners = () => {
      environment.addEventListener('mousemove', onInitialPointerMove);
      environment.addEventListener('mousedown', onInitialPointerMove);
      environment.addEventListener('mouseup', onInitialPointerMove);
      environment.addEventListener('pointermove', onInitialPointerMove);
      environment.addEventListener('pointerdown', onInitialPointerMove);
      environment.addEventListener('pointerup', onInitialPointerMove);
      environment.addEventListener('touchmove', onInitialPointerMove);
      environment.addEventListener('touchstart', onInitialPointerMove);
      environment.addEventListener('touchend', onInitialPointerMove);
    };
    const removeInitialPointerMoveListeners = () => {
      environment.removeEventListener('mousemove', onInitialPointerMove);
      environment.removeEventListener('mousedown', onInitialPointerMove);
      environment.removeEventListener('mouseup', onInitialPointerMove);
      environment.removeEventListener('pointermove', onInitialPointerMove);
      environment.removeEventListener('pointerdown', onInitialPointerMove);
      environment.removeEventListener('pointerup', onInitialPointerMove);
      environment.removeEventListener('touchmove', onInitialPointerMove);
      environment.removeEventListener('touchstart', onInitialPointerMove);
      environment.removeEventListener('touchend', onInitialPointerMove);
    };
    const onVisibilityChange = () => {
      if (environment.visibilityState === 'hidden') {
        if (hadFocusVisibleRecently.current) {
          hadKeyboardEvent.current = true;
        }
      }
    };
    const currentScope = scope.current;
    if (!environment || !currentScope) {
      return;
    }
    environment.addEventListener('keydown', onKeyDown, true);
    environment.addEventListener('mousedown', onPointerDown, true);
    environment.addEventListener('pointerdown', onPointerDown, true);
    environment.addEventListener('touchstart', onPointerDown, true);
    environment.addEventListener('visibilitychange', onVisibilityChange, true);
    addInitialPointerMoveListeners();
    currentScope && currentScope.addEventListener('focus', onFocus, true);
    currentScope && currentScope.addEventListener('blur', onBlur, true);
    return () => {
      environment.removeEventListener('keydown', onKeyDown);
      environment.removeEventListener('mousedown', onPointerDown);
      environment.removeEventListener('pointerdown', onPointerDown);
      environment.removeEventListener('touchstart', onPointerDown);
      environment.removeEventListener('visibilityChange', onVisibilityChange);
      removeInitialPointerMoveListeners();
      currentScope && currentScope.removeEventListener('focus', onFocus);
      currentScope && currentScope.removeEventListener('blur', onBlur);
      clearTimeout(hadFocusVisibleRecentlyTimeout.current);
    };
  }, [relativeDocument, scope, className, dataAttribute]);
}
({
  children: PropTypes.func,
  render: PropTypes.func,
  relativeDocument: PropTypes.object,
  className: PropTypes.string,
  dataAttribute: PropTypes.string
});

/**
  * @reach/utils v0.18.0
  *
  * Copyright (c) 2018-2022, React Training LLC
  *
  * This source code is licensed under the MIT license found in the
  * LICENSE.md file in the root directory of this source tree.
  *
  * @license MIT
  */


// src/can-use-dom.ts
function canUseDOM$1() {
  return !!(typeof window !== "undefined" && window.document && window.document.createElement);
}
var useIsomorphicLayoutEffect$1 = canUseDOM$1() ? reactExports.useLayoutEffect : reactExports.useEffect;

var serverHandoffComplete = false;
var id$2 = 0;
function genId() {
  return ++id$2;
}
var maybeReactUseId = React["useId".toString()];
function useId$5(providedId) {
  if (maybeReactUseId !== void 0) {
    let generatedId = maybeReactUseId();
    return providedId ?? generatedId;
  }
  let initialId = providedId ?? (serverHandoffComplete ? genId() : null);
  let [id2, setId] = reactExports.useState(initialId);
  useIsomorphicLayoutEffect$1(() => {
    if (id2 === null) {
      setId(genId());
    }
  }, []);
  reactExports.useEffect(() => {
    if (serverHandoffComplete === false) {
      serverHandoffComplete = true;
    }
  }, []);
  return providedId ?? id2 ?? void 0;
}

/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

function getControlledValue$2() {
  for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
    values[_key] = arguments[_key];
  }
  for (const value of values) {
    if (value !== undefined) {
      return value;
    }
  }
  return undefined;
}

/**
* Copyright Zendesk, Inc.
*
* Use of this source code is governed under the Apache License, Version 2.0
* found at http://www.apache.org/licenses/LICENSE-2.0.
*/
const PALETTE = {
  black: '#000',
  white: '#fff',
  product: {
    support: '#00a656',
    message: '#37b8af',
    explore: '#30aabc',
    gather: '#f6c8be',
    guide: '#eb4962',
    connect: '#ff6224',
    chat: '#f79a3e',
    talk: '#efc93d',
    sell: '#c38f00'
  },
  grey: {
    100: '#f8f9f9',
    200: '#e9ebed',
    300: '#d8dcde',
    400: '#c2c8cc',
    500: '#87929d',
    600: '#68737d',
    700: '#49545c',
    800: '#2f3941'
  },
  blue: {
    100: '#edf7ff',
    200: '#cee2f2',
    300: '#adcce4',
    400: '#5293c7',
    500: '#337fbd',
    600: '#1f73b7',
    700: '#144a75',
    800: '#0f3554'
  },
  red: {
    100: '#fff0f1',
    200: '#f5d5d8',
    300: '#f5b5ba',
    400: '#e35b66',
    500: '#d93f4c',
    600: '#cc3340',
    700: '#8c232c',
    800: '#681219'
  },
  yellow: {
    100: '#fff7ed',
    200: '#ffeedb',
    300: '#fed6a8',
    400: '#ffb057',
    500: '#f79a3e',
    600: '#ed8f1c',
    700: '#ad5918',
    800: '#703815'
  },
  green: {
    100: '#edf8f4',
    200: '#d1e8df',
    300: '#aecfc2',
    400: '#5eae91',
    500: '#228f67',
    600: '#038153',
    700: '#186146',
    800: '#0b3b29'
  },
  kale: {
    100: '#f5fcfc',
    200: '#daeded',
    300: '#bdd9d7',
    400: '#90bbbb',
    500: '#498283',
    600: '#17494d',
    700: '#03363d',
    800: '#012b30'
  },
  fuschia: {
    400: '#d653c2',
    600: '#a81897',
    M400: '#cf62a8',
    M600: '#a8458c'
  },
  pink: {
    400: '#ec4d63',
    600: '#d42054',
    M400: '#d57287',
    M600: '#b23a5d'
  },
  crimson: {
    400: '#e34f32',
    600: '#c72a1c',
    M400: '#cc6c5b',
    M600: '#b24a3c'
  },
  orange: {
    400: '#de701d',
    600: '#bf5000',
    M400: '#d4772c',
    M600: '#b35827'
  },
  lemon: {
    400: '#ffd424',
    600: '#ffbb10',
    M400: '#e7a500',
    M600: '#c38f00'
  },
  lime: {
    400: '#43b324',
    600: '#2e8200',
    M400: '#519e2d',
    M600: '#47782c'
  },
  mint: {
    400: '#00a656',
    600: '#058541',
    M400: '#299c66',
    M600: '#2e8057'
  },
  teal: {
    400: '#02a191',
    600: '#028079',
    M400: '#2d9e8f',
    M600: '#3c7873'
  },
  azure: {
    400: '#3091ec',
    600: '#1371d6',
    M400: '#5f8dcf',
    M600: '#3a70b2'
  },
  royal: {
    400: '#5d7df5',
    600: '#3353e2',
    M400: '#7986d8',
    M600: '#4b61c3'
  },
  purple: {
    400: '#b552e2',
    600: '#6a27b8',
    M400: '#b072cc',
    M600: '#9358b0'
  }
};

/**
* Copyright Zendesk, Inc.
*
* Use of this source code is governed under the Apache License, Version 2.0
* found at http://www.apache.org/licenses/LICENSE-2.0.
*/

const BASE = 4;
const borderRadii = {
  sm: `${BASE / 2}px`,
  md: `${BASE}px`
};
const borderStyles = {
  solid: 'solid'
};
const borderWidths = {
  sm: '1px',
  md: '3px'
};
const borders = {
  sm: `${borderWidths.sm} ${borderStyles.solid}`,
  md: `${borderWidths.md} ${borderStyles.solid}`
};
const breakpoints = {
  xs: '0px',
  sm: `${BASE * 144}px`,
  md: `${BASE * 192}px`,
  lg: `${BASE * 248}px`,
  xl: `${BASE * 300}px`
};
const colors = {
  background: PALETTE.white,
  foreground: PALETTE.grey[800],
  primaryHue: 'blue',
  dangerHue: 'red',
  warningHue: 'yellow',
  successHue: 'green',
  neutralHue: 'grey',
  chromeHue: 'kale'
};
const fonts = {
  mono: ['SFMono-Regular' , 'Consolas' , '"Liberation Mono"' , 'Menlo', 'Courier', 'monospace'].join(','),
  system: ['system-ui' , '-apple-system' , 'BlinkMacSystemFont' , '"Segoe UI"' , 'Roboto' , 'Oxygen-Sans' , 'Ubuntu' , 'Cantarell' , '"Helvetica Neue"', 'Arial', 'sans-serif'].join(',')
};
const fontSizes = {
  xs: '10px',
  sm: '12px',
  md: '14px',
  lg: '18px',
  xl: '22px',
  xxl: '26px',
  xxxl: '36px'
};
const fontWeights = {
  thin: 100,
  extralight: 200,
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900
};
const iconSizes = {
  sm: '12px',
  md: '16px',
  lg: '26px'
};
const lineHeights = {
  sm: `${BASE * 4}px`,
  md: `${BASE * 5}px`,
  lg: `${BASE * 6}px`,
  xl: `${BASE * 7}px`,
  xxl: `${BASE * 8}px`,
  xxxl: `${BASE * 11}px`
};
const palette = {
  ...PALETTE
};
delete palette.product;
const shadowWidths = {
  xs: '1px',
  sm: '2px',
  md: '3px'
};
const shadows = {
  xs: color => `0 0 0 ${shadowWidths.xs} ${color}`,
  sm: color => `0 0 0 ${shadowWidths.sm} ${color}`,
  md: color => `0 0 0 ${shadowWidths.md} ${color}`,
  lg: (offsetY, blurRadius, color) => `0 ${offsetY} ${blurRadius} 0 ${color}`
};
const space = {
  base: BASE,
  xxs: `${BASE}px`,
  xs: `${BASE * 2}px`,
  sm: `${BASE * 3}px`,
  md: `${BASE * 5}px`,
  lg: `${BASE * 8}px`,
  xl: `${BASE * 10}px`,
  xxl: `${BASE * 12}px`
};
const DEFAULT_THEME = {
  borders,
  borderRadii,
  borderStyles,
  borderWidths,
  breakpoints,
  colors: {
    base: 'light',
    ...colors
  },
  components: {},
  fonts,
  fontSizes,
  fontWeights,
  iconSizes,
  lineHeights,
  palette,
  rtl: false,
  shadowWidths,
  shadows,
  space
};

/**
* Copyright Zendesk, Inc.
*
* Use of this source code is governed under the Apache License, Version 2.0
* found at http://www.apache.org/licenses/LICENSE-2.0.
*/

const useDocument = theme => {
  const [controlledDocument, setControlledDocument] = reactExports.useState();
  reactExports.useEffect(() => {
    if (theme && theme.document) {
      setControlledDocument(theme.document);
    } else {
      setControlledDocument(document);
    }
  }, [theme]);
  return controlledDocument;
};

/**
* Copyright Zendesk, Inc.
*
* Use of this source code is governed under the Apache License, Version 2.0
* found at http://www.apache.org/licenses/LICENSE-2.0.
*/

const ThemeProvider = _ref => {
  let {
    theme,
    focusVisibleRef,
    children,
    ...other
  } = _ref;
  const scopeRef = reactExports.useRef(null);
  const relativeDocument = useDocument(theme);
  const controlledScopeRef = focusVisibleRef === null ? React__default.createRef() : getControlledValue$2(focusVisibleRef, scopeRef);
  useFocusVisible({
    scope: controlledScopeRef,
    relativeDocument
  });
  return React__default.createElement(Ge, Object.assign({
    theme: theme
  }, other), focusVisibleRef === undefined ? React__default.createElement("div", {
    ref: scopeRef
  }, children) : children);
};
ThemeProvider.defaultProps = {
  theme: DEFAULT_THEME
};

/**
* Copyright Zendesk, Inc.
*
* Use of this source code is governed under the Apache License, Version 2.0
* found at http://www.apache.org/licenses/LICENSE-2.0.
*/
function retrieveComponentStyles(componentId, props) {
  const components = props.theme && props.theme.components;
  if (!components) {
    return undefined;
  }
  const componentStyles = components[componentId];
  if (typeof componentStyles === 'function') {
    return componentStyles(props);
  }
  return componentStyles;
}

function _extends$10() {
  _extends$10 = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$10.apply(this, arguments);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct.bind();
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }
  return _construct.apply(null, arguments);
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;
  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;
    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }
    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);
      _cache.set(Class, Wrapper);
    }
    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }
    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };
  return _wrapNativeSuper(Class);
}

function last() {
  var _ref;
  return _ref = arguments.length - 1, _ref < 0 || arguments.length <= _ref ? undefined : arguments[_ref];
}
function negation(a) {
  return -a;
}
function addition(a, b) {
  return a + b;
}
function subtraction(a, b) {
  return a - b;
}
function multiplication(a, b) {
  return a * b;
}
function division(a, b) {
  return a / b;
}
function max$1() {
  return Math.max.apply(Math, arguments);
}
function min$1() {
  return Math.min.apply(Math, arguments);
}
function comma() {
  return Array.of.apply(Array, arguments);
}
var defaultSymbols = {
  symbols: {
    '*': {
      infix: {
        symbol: '*',
        f: multiplication,
        notation: 'infix',
        precedence: 4,
        rightToLeft: 0,
        argCount: 2
      },
      symbol: '*',
      regSymbol: '\\*'
    },
    '/': {
      infix: {
        symbol: '/',
        f: division,
        notation: 'infix',
        precedence: 4,
        rightToLeft: 0,
        argCount: 2
      },
      symbol: '/',
      regSymbol: '/'
    },
    '+': {
      infix: {
        symbol: '+',
        f: addition,
        notation: 'infix',
        precedence: 2,
        rightToLeft: 0,
        argCount: 2
      },
      prefix: {
        symbol: '+',
        f: last,
        notation: 'prefix',
        precedence: 3,
        rightToLeft: 0,
        argCount: 1
      },
      symbol: '+',
      regSymbol: '\\+'
    },
    '-': {
      infix: {
        symbol: '-',
        f: subtraction,
        notation: 'infix',
        precedence: 2,
        rightToLeft: 0,
        argCount: 2
      },
      prefix: {
        symbol: '-',
        f: negation,
        notation: 'prefix',
        precedence: 3,
        rightToLeft: 0,
        argCount: 1
      },
      symbol: '-',
      regSymbol: '-'
    },
    ',': {
      infix: {
        symbol: ',',
        f: comma,
        notation: 'infix',
        precedence: 1,
        rightToLeft: 0,
        argCount: 2
      },
      symbol: ',',
      regSymbol: ','
    },
    '(': {
      prefix: {
        symbol: '(',
        f: last,
        notation: 'prefix',
        precedence: 0,
        rightToLeft: 0,
        argCount: 1
      },
      symbol: '(',
      regSymbol: '\\('
    },
    ')': {
      postfix: {
        symbol: ')',
        f: undefined,
        notation: 'postfix',
        precedence: 0,
        rightToLeft: 0,
        argCount: 1
      },
      symbol: ')',
      regSymbol: '\\)'
    },
    min: {
      func: {
        symbol: 'min',
        f: min$1,
        notation: 'func',
        precedence: 0,
        rightToLeft: 0,
        argCount: 1
      },
      symbol: 'min',
      regSymbol: 'min\\b'
    },
    max: {
      func: {
        symbol: 'max',
        f: max$1,
        notation: 'func',
        precedence: 0,
        rightToLeft: 0,
        argCount: 1
      },
      symbol: 'max',
      regSymbol: 'max\\b'
    }
  }
};
var defaultSymbolMap = defaultSymbols;

/**
 * Create an error file out of errors.md for development and a simple web link to the full errors
 * in production mode.
 * @private
 */
var PolishedError = /*#__PURE__*/function (_Error) {
  _inheritsLoose(PolishedError, _Error);
  function PolishedError(code) {
    var _this;
    {
      _this = _Error.call(this, "An error occurred. See https://github.com/styled-components/polished/blob/main/src/internalHelpers/errors.md#" + code + " for more information.") || this;
    }
    return _assertThisInitialized(_this);
  }
  return PolishedError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

var unitRegExp = /((?!\w)a|na|hc|mc|dg|me[r]?|xe|ni(?![a-zA-Z])|mm|cp|tp|xp|q(?!s)|hv|xamv|nimv|wv|sm|s(?!\D|$)|ged|darg?|nrut)/g;

// Merges additional math functionality into the defaults.
function mergeSymbolMaps(additionalSymbols) {
  var symbolMap = {};
  symbolMap.symbols = additionalSymbols ? _extends$10({}, defaultSymbolMap.symbols, additionalSymbols.symbols) : _extends$10({}, defaultSymbolMap.symbols);
  return symbolMap;
}
function exec(operators, values) {
  var _ref;
  var op = operators.pop();
  values.push(op.f.apply(op, (_ref = []).concat.apply(_ref, values.splice(-op.argCount))));
  return op.precedence;
}
function calculate(expression, additionalSymbols) {
  var symbolMap = mergeSymbolMaps(additionalSymbols);
  var match;
  var operators = [symbolMap.symbols['('].prefix];
  var values = [];
  var pattern = new RegExp( // Pattern for numbers
  "\\d+(?:\\.\\d+)?|" +
  // ...and patterns for individual operators/function names
  Object.keys(symbolMap.symbols).map(function (key) {
    return symbolMap.symbols[key];
  })
  // longer symbols should be listed first
  // $FlowFixMe
  .sort(function (a, b) {
    return b.symbol.length - a.symbol.length;
  })
  // $FlowFixMe
  .map(function (val) {
    return val.regSymbol;
  }).join('|') + "|(\\S)", 'g');
  pattern.lastIndex = 0; // Reset regular expression object

  var afterValue = false;
  do {
    match = pattern.exec(expression);
    var _ref2 = match || [')', undefined],
      token = _ref2[0],
      bad = _ref2[1];
    var notNumber = symbolMap.symbols[token];
    var notNewValue = notNumber && !notNumber.prefix && !notNumber.func;
    var notAfterValue = !notNumber || !notNumber.postfix && !notNumber.infix;

    // Check for syntax errors:
    if (bad || (afterValue ? notAfterValue : notNewValue)) {
      throw new PolishedError(37, match ? match.index : expression.length, expression);
    }
    if (afterValue) {
      // We either have an infix or postfix operator (they should be mutually exclusive)
      var curr = notNumber.postfix || notNumber.infix;
      do {
        var prev = operators[operators.length - 1];
        if ((curr.precedence - prev.precedence || prev.rightToLeft) > 0) break;
        // Apply previous operator, since it has precedence over current one
      } while (exec(operators, values)); // Exit loop after executing an opening parenthesis or function
      afterValue = curr.notation === 'postfix';
      if (curr.symbol !== ')') {
        operators.push(curr);
        // Postfix always has precedence over any operator that follows after it
        if (afterValue) exec(operators, values);
      }
    } else if (notNumber) {
      // prefix operator or function
      operators.push(notNumber.prefix || notNumber.func);
      if (notNumber.func) {
        // Require an opening parenthesis
        match = pattern.exec(expression);
        if (!match || match[0] !== '(') {
          throw new PolishedError(38, match ? match.index : expression.length, expression);
        }
      }
    } else {
      // number
      values.push(+token);
      afterValue = true;
    }
  } while (match && operators.length);
  if (operators.length) {
    throw new PolishedError(39, match ? match.index : expression.length, expression);
  } else if (match) {
    throw new PolishedError(40, match ? match.index : expression.length, expression);
  } else {
    return values.pop();
  }
}
function reverseString(str) {
  return str.split('').reverse().join('');
}

/**
 * Helper for doing math with CSS Units. Accepts a formula as a string. All values in the formula must have the same unit (or be unitless). Supports complex formulas utliziing addition, subtraction, multiplication, division, square root, powers, factorial, min, max, as well as parentheses for order of operation.
 *
 *In cases where you need to do calculations with mixed units where one unit is a [relative length unit](https://developer.mozilla.org/en-US/docs/Web/CSS/length#Relative_length_units), you will want to use [CSS Calc](https://developer.mozilla.org/en-US/docs/Web/CSS/calc).
 *
 * *warning* While we've done everything possible to ensure math safely evalutes formulas expressed as strings, you should always use extreme caution when passing `math` user provided values.
 * @example
 * // Styles as object usage
 * const styles = {
 *   fontSize: math('12rem + 8rem'),
 *   fontSize: math('(12px + 2px) * 3'),
 *   fontSize: math('3px^2 + sqrt(4)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   fontSize: ${math('12rem + 8rem')};
 *   fontSize: ${math('(12px + 2px) * 3')};
 *   fontSize: ${math('3px^2 + sqrt(4)')};
 * `
 *
 * // CSS as JS Output
 *
 * div: {
 *   fontSize: '20rem',
 *   fontSize: '42px',
 *   fontSize: '11px',
 * }
 */
function math(formula, additionalSymbols) {
  var reversedFormula = reverseString(formula);
  var formulaMatch = reversedFormula.match(unitRegExp);

  // Check that all units are the same
  if (formulaMatch && !formulaMatch.every(function (unit) {
    return unit === formulaMatch[0];
  })) {
    throw new PolishedError(41);
  }
  var cleanFormula = reverseString(reversedFormula.replace(unitRegExp, ''));
  return "" + calculate(cleanFormula, additionalSymbols) + (formulaMatch ? reverseString(formulaMatch[0]) : '');
}

/**
 * Check if a string ends with something
 * @private
 */
function endsWith(string, suffix) {
  return string.substr(-suffix.length) === suffix;
}

var cssRegex$1 = /^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/;

/**
 * Returns a given CSS value minus its unit of measure.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   '--dimension': stripUnit('100px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   --dimension: ${stripUnit('100px')};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   '--dimension': 100
 * }
 */
function stripUnit(value) {
  if (typeof value !== 'string') return value;
  var matchedValue = value.match(cssRegex$1);
  return matchedValue ? parseFloat(value) : value;
}

/**
 * Factory function that creates pixel-to-x converters
 * @private
 */
var pxtoFactory = function pxtoFactory(to) {
  return function (pxval, base) {
    if (base === void 0) {
      base = '16px';
    }
    var newPxval = pxval;
    var newBase = base;
    if (typeof pxval === 'string') {
      if (!endsWith(pxval, 'px')) {
        throw new PolishedError(69, to, pxval);
      }
      newPxval = stripUnit(pxval);
    }
    if (typeof base === 'string') {
      if (!endsWith(base, 'px')) {
        throw new PolishedError(70, to, base);
      }
      newBase = stripUnit(base);
    }
    if (typeof newPxval === 'string') {
      throw new PolishedError(71, pxval, to);
    }
    if (typeof newBase === 'string') {
      throw new PolishedError(72, base, to);
    }
    return "" + newPxval / newBase + to;
  };
};
var pixelsto = pxtoFactory;

/**
 * Convert pixel value to ems. The default base value is 16px, but can be changed by passing a
 * second argument to the function.
 * @function
 * @param {string|number} pxval
 * @param {string|number} [base='16px']
 * @example
 * // Styles as object usage
 * const styles = {
 *   'height': em('16px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   height: ${em('16px')}
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   'height': '1em'
 * }
 */
var em = pixelsto('em');
var em$1 = em;

var cssRegex = /^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/;

/**
 * Returns a given CSS value and its unit as elements of an array.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   '--dimension': getValueAndUnit('100px')[0],
 *   '--unit': getValueAndUnit('100px')[1],
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   --dimension: ${getValueAndUnit('100px')[0]};
 *   --unit: ${getValueAndUnit('100px')[1]};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   '--dimension': 100,
 *   '--unit': 'px',
 * }
 */
function getValueAndUnit(value) {
  if (typeof value !== 'string') return [value, ''];
  var matchedValue = value.match(cssRegex);
  if (matchedValue) return [parseFloat(value), matchedValue[2]];
  return [value, undefined];
}

/**
 * CSS to hide content visually but remain accessible to screen readers.
 * from [HTML5 Boilerplate](https://github.com/h5bp/html5-boilerplate/blob/9a176f57af1cfe8ec70300da4621fb9b07e5fa31/src/css/main.css#L121)
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...hideVisually(),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${hideVisually()};
 * `
 *
 * // CSS as JS Output
 *
 * 'div': {
 *   'border': '0',
 *   'clip': 'rect(0 0 0 0)',
 *   'height': '1px',
 *   'margin': '-1px',
 *   'overflow': 'hidden',
 *   'padding': '0',
 *   'position': 'absolute',
 *   'whiteSpace': 'nowrap',
 *   'width': '1px',
 * }
 */
function hideVisually() {
  return {
    border: '0',
    clip: 'rect(0 0 0 0)',
    height: '1px',
    margin: '-1px',
    overflow: 'hidden',
    padding: '0',
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: '1px'
  };
}

function colorToInt(color) {
  return Math.round(color * 255);
}
function convertToInt(red, green, blue) {
  return colorToInt(red) + "," + colorToInt(green) + "," + colorToInt(blue);
}
function hslToRgb(hue, saturation, lightness, convert) {
  if (convert === void 0) {
    convert = convertToInt;
  }
  if (saturation === 0) {
    // achromatic
    return convert(lightness, lightness, lightness);
  }

  // formulae from https://en.wikipedia.org/wiki/HSL_and_HSV
  var huePrime = (hue % 360 + 360) % 360 / 60;
  var chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  var secondComponent = chroma * (1 - Math.abs(huePrime % 2 - 1));
  var red = 0;
  var green = 0;
  var blue = 0;
  if (huePrime >= 0 && huePrime < 1) {
    red = chroma;
    green = secondComponent;
  } else if (huePrime >= 1 && huePrime < 2) {
    red = secondComponent;
    green = chroma;
  } else if (huePrime >= 2 && huePrime < 3) {
    green = chroma;
    blue = secondComponent;
  } else if (huePrime >= 3 && huePrime < 4) {
    green = secondComponent;
    blue = chroma;
  } else if (huePrime >= 4 && huePrime < 5) {
    red = secondComponent;
    blue = chroma;
  } else if (huePrime >= 5 && huePrime < 6) {
    red = chroma;
    blue = secondComponent;
  }
  var lightnessModification = lightness - chroma / 2;
  var finalRed = red + lightnessModification;
  var finalGreen = green + lightnessModification;
  var finalBlue = blue + lightnessModification;
  return convert(finalRed, finalGreen, finalBlue);
}

var namedColorMap = {
  aliceblue: 'f0f8ff',
  antiquewhite: 'faebd7',
  aqua: '00ffff',
  aquamarine: '7fffd4',
  azure: 'f0ffff',
  beige: 'f5f5dc',
  bisque: 'ffe4c4',
  black: '000',
  blanchedalmond: 'ffebcd',
  blue: '0000ff',
  blueviolet: '8a2be2',
  brown: 'a52a2a',
  burlywood: 'deb887',
  cadetblue: '5f9ea0',
  chartreuse: '7fff00',
  chocolate: 'd2691e',
  coral: 'ff7f50',
  cornflowerblue: '6495ed',
  cornsilk: 'fff8dc',
  crimson: 'dc143c',
  cyan: '00ffff',
  darkblue: '00008b',
  darkcyan: '008b8b',
  darkgoldenrod: 'b8860b',
  darkgray: 'a9a9a9',
  darkgreen: '006400',
  darkgrey: 'a9a9a9',
  darkkhaki: 'bdb76b',
  darkmagenta: '8b008b',
  darkolivegreen: '556b2f',
  darkorange: 'ff8c00',
  darkorchid: '9932cc',
  darkred: '8b0000',
  darksalmon: 'e9967a',
  darkseagreen: '8fbc8f',
  darkslateblue: '483d8b',
  darkslategray: '2f4f4f',
  darkslategrey: '2f4f4f',
  darkturquoise: '00ced1',
  darkviolet: '9400d3',
  deeppink: 'ff1493',
  deepskyblue: '00bfff',
  dimgray: '696969',
  dimgrey: '696969',
  dodgerblue: '1e90ff',
  firebrick: 'b22222',
  floralwhite: 'fffaf0',
  forestgreen: '228b22',
  fuchsia: 'ff00ff',
  gainsboro: 'dcdcdc',
  ghostwhite: 'f8f8ff',
  gold: 'ffd700',
  goldenrod: 'daa520',
  gray: '808080',
  green: '008000',
  greenyellow: 'adff2f',
  grey: '808080',
  honeydew: 'f0fff0',
  hotpink: 'ff69b4',
  indianred: 'cd5c5c',
  indigo: '4b0082',
  ivory: 'fffff0',
  khaki: 'f0e68c',
  lavender: 'e6e6fa',
  lavenderblush: 'fff0f5',
  lawngreen: '7cfc00',
  lemonchiffon: 'fffacd',
  lightblue: 'add8e6',
  lightcoral: 'f08080',
  lightcyan: 'e0ffff',
  lightgoldenrodyellow: 'fafad2',
  lightgray: 'd3d3d3',
  lightgreen: '90ee90',
  lightgrey: 'd3d3d3',
  lightpink: 'ffb6c1',
  lightsalmon: 'ffa07a',
  lightseagreen: '20b2aa',
  lightskyblue: '87cefa',
  lightslategray: '789',
  lightslategrey: '789',
  lightsteelblue: 'b0c4de',
  lightyellow: 'ffffe0',
  lime: '0f0',
  limegreen: '32cd32',
  linen: 'faf0e6',
  magenta: 'f0f',
  maroon: '800000',
  mediumaquamarine: '66cdaa',
  mediumblue: '0000cd',
  mediumorchid: 'ba55d3',
  mediumpurple: '9370db',
  mediumseagreen: '3cb371',
  mediumslateblue: '7b68ee',
  mediumspringgreen: '00fa9a',
  mediumturquoise: '48d1cc',
  mediumvioletred: 'c71585',
  midnightblue: '191970',
  mintcream: 'f5fffa',
  mistyrose: 'ffe4e1',
  moccasin: 'ffe4b5',
  navajowhite: 'ffdead',
  navy: '000080',
  oldlace: 'fdf5e6',
  olive: '808000',
  olivedrab: '6b8e23',
  orange: 'ffa500',
  orangered: 'ff4500',
  orchid: 'da70d6',
  palegoldenrod: 'eee8aa',
  palegreen: '98fb98',
  paleturquoise: 'afeeee',
  palevioletred: 'db7093',
  papayawhip: 'ffefd5',
  peachpuff: 'ffdab9',
  peru: 'cd853f',
  pink: 'ffc0cb',
  plum: 'dda0dd',
  powderblue: 'b0e0e6',
  purple: '800080',
  rebeccapurple: '639',
  red: 'f00',
  rosybrown: 'bc8f8f',
  royalblue: '4169e1',
  saddlebrown: '8b4513',
  salmon: 'fa8072',
  sandybrown: 'f4a460',
  seagreen: '2e8b57',
  seashell: 'fff5ee',
  sienna: 'a0522d',
  silver: 'c0c0c0',
  skyblue: '87ceeb',
  slateblue: '6a5acd',
  slategray: '708090',
  slategrey: '708090',
  snow: 'fffafa',
  springgreen: '00ff7f',
  steelblue: '4682b4',
  tan: 'd2b48c',
  teal: '008080',
  thistle: 'd8bfd8',
  tomato: 'ff6347',
  turquoise: '40e0d0',
  violet: 'ee82ee',
  wheat: 'f5deb3',
  white: 'fff',
  whitesmoke: 'f5f5f5',
  yellow: 'ff0',
  yellowgreen: '9acd32'
};

/**
 * Checks if a string is a CSS named color and returns its equivalent hex value, otherwise returns the original color.
 * @private
 */
function nameToHex(color) {
  if (typeof color !== 'string') return color;
  var normalizedColorName = color.toLowerCase();
  return namedColorMap[normalizedColorName] ? "#" + namedColorMap[normalizedColorName] : color;
}

var hexRegex = /^#[a-fA-F0-9]{6}$/;
var hexRgbaRegex = /^#[a-fA-F0-9]{8}$/;
var reducedHexRegex = /^#[a-fA-F0-9]{3}$/;
var reducedRgbaHexRegex = /^#[a-fA-F0-9]{4}$/;
var rgbRegex = /^rgb\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*\)$/i;
var rgbaRegex = /^rgb(?:a)?\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i;
var hslRegex = /^hsl\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*\)$/i;
var hslaRegex = /^hsl(?:a)?\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i;

/**
 * Returns an RgbColor or RgbaColor object. This utility function is only useful
 * if want to extract a color component. With the color util `toColorString` you
 * can convert a RgbColor or RgbaColor object back to a string.
 *
 * @example
 * // Assigns `{ red: 255, green: 0, blue: 0 }` to color1
 * const color1 = parseToRgb('rgb(255, 0, 0)');
 * // Assigns `{ red: 92, green: 102, blue: 112, alpha: 0.75 }` to color2
 * const color2 = parseToRgb('hsla(210, 10%, 40%, 0.75)');
 */
function parseToRgb(color) {
  if (typeof color !== 'string') {
    throw new PolishedError(3);
  }
  var normalizedColor = nameToHex(color);
  if (normalizedColor.match(hexRegex)) {
    return {
      red: parseInt("" + normalizedColor[1] + normalizedColor[2], 16),
      green: parseInt("" + normalizedColor[3] + normalizedColor[4], 16),
      blue: parseInt("" + normalizedColor[5] + normalizedColor[6], 16)
    };
  }
  if (normalizedColor.match(hexRgbaRegex)) {
    var alpha = parseFloat((parseInt("" + normalizedColor[7] + normalizedColor[8], 16) / 255).toFixed(2));
    return {
      red: parseInt("" + normalizedColor[1] + normalizedColor[2], 16),
      green: parseInt("" + normalizedColor[3] + normalizedColor[4], 16),
      blue: parseInt("" + normalizedColor[5] + normalizedColor[6], 16),
      alpha: alpha
    };
  }
  if (normalizedColor.match(reducedHexRegex)) {
    return {
      red: parseInt("" + normalizedColor[1] + normalizedColor[1], 16),
      green: parseInt("" + normalizedColor[2] + normalizedColor[2], 16),
      blue: parseInt("" + normalizedColor[3] + normalizedColor[3], 16)
    };
  }
  if (normalizedColor.match(reducedRgbaHexRegex)) {
    var _alpha = parseFloat((parseInt("" + normalizedColor[4] + normalizedColor[4], 16) / 255).toFixed(2));
    return {
      red: parseInt("" + normalizedColor[1] + normalizedColor[1], 16),
      green: parseInt("" + normalizedColor[2] + normalizedColor[2], 16),
      blue: parseInt("" + normalizedColor[3] + normalizedColor[3], 16),
      alpha: _alpha
    };
  }
  var rgbMatched = rgbRegex.exec(normalizedColor);
  if (rgbMatched) {
    return {
      red: parseInt("" + rgbMatched[1], 10),
      green: parseInt("" + rgbMatched[2], 10),
      blue: parseInt("" + rgbMatched[3], 10)
    };
  }
  var rgbaMatched = rgbaRegex.exec(normalizedColor.substring(0, 50));
  if (rgbaMatched) {
    return {
      red: parseInt("" + rgbaMatched[1], 10),
      green: parseInt("" + rgbaMatched[2], 10),
      blue: parseInt("" + rgbaMatched[3], 10),
      alpha: parseFloat("" + rgbaMatched[4]) > 1 ? parseFloat("" + rgbaMatched[4]) / 100 : parseFloat("" + rgbaMatched[4])
    };
  }
  var hslMatched = hslRegex.exec(normalizedColor);
  if (hslMatched) {
    var hue = parseInt("" + hslMatched[1], 10);
    var saturation = parseInt("" + hslMatched[2], 10) / 100;
    var lightness = parseInt("" + hslMatched[3], 10) / 100;
    var rgbColorString = "rgb(" + hslToRgb(hue, saturation, lightness) + ")";
    var hslRgbMatched = rgbRegex.exec(rgbColorString);
    if (!hslRgbMatched) {
      throw new PolishedError(4, normalizedColor, rgbColorString);
    }
    return {
      red: parseInt("" + hslRgbMatched[1], 10),
      green: parseInt("" + hslRgbMatched[2], 10),
      blue: parseInt("" + hslRgbMatched[3], 10)
    };
  }
  var hslaMatched = hslaRegex.exec(normalizedColor.substring(0, 50));
  if (hslaMatched) {
    var _hue = parseInt("" + hslaMatched[1], 10);
    var _saturation = parseInt("" + hslaMatched[2], 10) / 100;
    var _lightness = parseInt("" + hslaMatched[3], 10) / 100;
    var _rgbColorString = "rgb(" + hslToRgb(_hue, _saturation, _lightness) + ")";
    var _hslRgbMatched = rgbRegex.exec(_rgbColorString);
    if (!_hslRgbMatched) {
      throw new PolishedError(4, normalizedColor, _rgbColorString);
    }
    return {
      red: parseInt("" + _hslRgbMatched[1], 10),
      green: parseInt("" + _hslRgbMatched[2], 10),
      blue: parseInt("" + _hslRgbMatched[3], 10),
      alpha: parseFloat("" + hslaMatched[4]) > 1 ? parseFloat("" + hslaMatched[4]) / 100 : parseFloat("" + hslaMatched[4])
    };
  }
  throw new PolishedError(5);
}

function rgbToHsl(color) {
  // make sure rgb are contained in a set of [0, 255]
  var red = color.red / 255;
  var green = color.green / 255;
  var blue = color.blue / 255;
  var max = Math.max(red, green, blue);
  var min = Math.min(red, green, blue);
  var lightness = (max + min) / 2;
  if (max === min) {
    // achromatic
    if (color.alpha !== undefined) {
      return {
        hue: 0,
        saturation: 0,
        lightness: lightness,
        alpha: color.alpha
      };
    } else {
      return {
        hue: 0,
        saturation: 0,
        lightness: lightness
      };
    }
  }
  var hue;
  var delta = max - min;
  var saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
  switch (max) {
    case red:
      hue = (green - blue) / delta + (green < blue ? 6 : 0);
      break;
    case green:
      hue = (blue - red) / delta + 2;
      break;
    default:
      // blue case
      hue = (red - green) / delta + 4;
      break;
  }
  hue *= 60;
  if (color.alpha !== undefined) {
    return {
      hue: hue,
      saturation: saturation,
      lightness: lightness,
      alpha: color.alpha
    };
  }
  return {
    hue: hue,
    saturation: saturation,
    lightness: lightness
  };
}

/**
 * Returns an HslColor or HslaColor object. This utility function is only useful
 * if want to extract a color component. With the color util `toColorString` you
 * can convert a HslColor or HslaColor object back to a string.
 *
 * @example
 * // Assigns `{ hue: 0, saturation: 1, lightness: 0.5 }` to color1
 * const color1 = parseToHsl('rgb(255, 0, 0)');
 * // Assigns `{ hue: 128, saturation: 1, lightness: 0.5, alpha: 0.75 }` to color2
 * const color2 = parseToHsl('hsla(128, 100%, 50%, 0.75)');
 */
function parseToHsl(color) {
  // Note: At a later stage we can optimize this function as right now a hsl
  // color would be parsed converted to rgb values and converted back to hsl.
  return rgbToHsl(parseToRgb(color));
}

/**
 * Reduces hex values if possible e.g. #ff8866 to #f86
 * @private
 */
var reduceHexValue = function reduceHexValue(value) {
  if (value.length === 7 && value[1] === value[2] && value[3] === value[4] && value[5] === value[6]) {
    return "#" + value[1] + value[3] + value[5];
  }
  return value;
};
var reduceHexValue$1 = reduceHexValue;

function numberToHex(value) {
  var hex = value.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

function colorToHex(color) {
  return numberToHex(Math.round(color * 255));
}
function convertToHex(red, green, blue) {
  return reduceHexValue$1("#" + colorToHex(red) + colorToHex(green) + colorToHex(blue));
}
function hslToHex(hue, saturation, lightness) {
  return hslToRgb(hue, saturation, lightness, convertToHex);
}

/**
 * Returns a string value for the color. The returned result is the smallest possible hex notation.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: hsl(359, 0.75, 0.4),
 *   background: hsl({ hue: 360, saturation: 0.75, lightness: 0.4 }),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${hsl(359, 0.75, 0.4)};
 *   background: ${hsl({ hue: 360, saturation: 0.75, lightness: 0.4 })};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#b3191c";
 *   background: "#b3191c";
 * }
 */
function hsl(value, saturation, lightness) {
  if (typeof value === 'number' && typeof saturation === 'number' && typeof lightness === 'number') {
    return hslToHex(value, saturation, lightness);
  } else if (typeof value === 'object' && saturation === undefined && lightness === undefined) {
    return hslToHex(value.hue, value.saturation, value.lightness);
  }
  throw new PolishedError(1);
}

/**
 * Returns a string value for the color. The returned result is the smallest possible rgba or hex notation.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: hsla(359, 0.75, 0.4, 0.7),
 *   background: hsla({ hue: 360, saturation: 0.75, lightness: 0.4, alpha: 0,7 }),
 *   background: hsla(359, 0.75, 0.4, 1),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${hsla(359, 0.75, 0.4, 0.7)};
 *   background: ${hsla({ hue: 360, saturation: 0.75, lightness: 0.4, alpha: 0,7 })};
 *   background: ${hsla(359, 0.75, 0.4, 1)};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "rgba(179,25,28,0.7)";
 *   background: "rgba(179,25,28,0.7)";
 *   background: "#b3191c";
 * }
 */
function hsla(value, saturation, lightness, alpha) {
  if (typeof value === 'number' && typeof saturation === 'number' && typeof lightness === 'number' && typeof alpha === 'number') {
    return alpha >= 1 ? hslToHex(value, saturation, lightness) : "rgba(" + hslToRgb(value, saturation, lightness) + "," + alpha + ")";
  } else if (typeof value === 'object' && saturation === undefined && lightness === undefined && alpha === undefined) {
    return value.alpha >= 1 ? hslToHex(value.hue, value.saturation, value.lightness) : "rgba(" + hslToRgb(value.hue, value.saturation, value.lightness) + "," + value.alpha + ")";
  }
  throw new PolishedError(2);
}

/**
 * Returns a string value for the color. The returned result is the smallest possible hex notation.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: rgb(255, 205, 100),
 *   background: rgb({ red: 255, green: 205, blue: 100 }),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${rgb(255, 205, 100)};
 *   background: ${rgb({ red: 255, green: 205, blue: 100 })};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#ffcd64";
 *   background: "#ffcd64";
 * }
 */
function rgb(value, green, blue) {
  if (typeof value === 'number' && typeof green === 'number' && typeof blue === 'number') {
    return reduceHexValue$1("#" + numberToHex(value) + numberToHex(green) + numberToHex(blue));
  } else if (typeof value === 'object' && green === undefined && blue === undefined) {
    return reduceHexValue$1("#" + numberToHex(value.red) + numberToHex(value.green) + numberToHex(value.blue));
  }
  throw new PolishedError(6);
}

/**
 * Returns a string value for the color. The returned result is the smallest possible rgba or hex notation.
 *
 * Can also be used to fade a color by passing a hex value or named CSS color along with an alpha value.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: rgba(255, 205, 100, 0.7),
 *   background: rgba({ red: 255, green: 205, blue: 100, alpha: 0.7 }),
 *   background: rgba(255, 205, 100, 1),
 *   background: rgba('#ffffff', 0.4),
 *   background: rgba('black', 0.7),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${rgba(255, 205, 100, 0.7)};
 *   background: ${rgba({ red: 255, green: 205, blue: 100, alpha: 0.7 })};
 *   background: ${rgba(255, 205, 100, 1)};
 *   background: ${rgba('#ffffff', 0.4)};
 *   background: ${rgba('black', 0.7)};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "rgba(255,205,100,0.7)";
 *   background: "rgba(255,205,100,0.7)";
 *   background: "#ffcd64";
 *   background: "rgba(255,255,255,0.4)";
 *   background: "rgba(0,0,0,0.7)";
 * }
 */
function rgba(firstValue, secondValue, thirdValue, fourthValue) {
  if (typeof firstValue === 'string' && typeof secondValue === 'number') {
    var rgbValue = parseToRgb(firstValue);
    return "rgba(" + rgbValue.red + "," + rgbValue.green + "," + rgbValue.blue + "," + secondValue + ")";
  } else if (typeof firstValue === 'number' && typeof secondValue === 'number' && typeof thirdValue === 'number' && typeof fourthValue === 'number') {
    return fourthValue >= 1 ? rgb(firstValue, secondValue, thirdValue) : "rgba(" + firstValue + "," + secondValue + "," + thirdValue + "," + fourthValue + ")";
  } else if (typeof firstValue === 'object' && secondValue === undefined && thirdValue === undefined && fourthValue === undefined) {
    return firstValue.alpha >= 1 ? rgb(firstValue.red, firstValue.green, firstValue.blue) : "rgba(" + firstValue.red + "," + firstValue.green + "," + firstValue.blue + "," + firstValue.alpha + ")";
  }
  throw new PolishedError(7);
}

var isRgb = function isRgb(color) {
  return typeof color.red === 'number' && typeof color.green === 'number' && typeof color.blue === 'number' && (typeof color.alpha !== 'number' || typeof color.alpha === 'undefined');
};
var isRgba = function isRgba(color) {
  return typeof color.red === 'number' && typeof color.green === 'number' && typeof color.blue === 'number' && typeof color.alpha === 'number';
};
var isHsl = function isHsl(color) {
  return typeof color.hue === 'number' && typeof color.saturation === 'number' && typeof color.lightness === 'number' && (typeof color.alpha !== 'number' || typeof color.alpha === 'undefined');
};
var isHsla = function isHsla(color) {
  return typeof color.hue === 'number' && typeof color.saturation === 'number' && typeof color.lightness === 'number' && typeof color.alpha === 'number';
};

/**
 * Converts a RgbColor, RgbaColor, HslColor or HslaColor object to a color string.
 * This util is useful in case you only know on runtime which color object is
 * used. Otherwise we recommend to rely on `rgb`, `rgba`, `hsl` or `hsla`.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: toColorString({ red: 255, green: 205, blue: 100 }),
 *   background: toColorString({ red: 255, green: 205, blue: 100, alpha: 0.72 }),
 *   background: toColorString({ hue: 240, saturation: 1, lightness: 0.5 }),
 *   background: toColorString({ hue: 360, saturation: 0.75, lightness: 0.4, alpha: 0.72 }),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${toColorString({ red: 255, green: 205, blue: 100 })};
 *   background: ${toColorString({ red: 255, green: 205, blue: 100, alpha: 0.72 })};
 *   background: ${toColorString({ hue: 240, saturation: 1, lightness: 0.5 })};
 *   background: ${toColorString({ hue: 360, saturation: 0.75, lightness: 0.4, alpha: 0.72 })};
 * `
 *
 * // CSS in JS Output
 * element {
 *   background: "#ffcd64";
 *   background: "rgba(255,205,100,0.72)";
 *   background: "#00f";
 *   background: "rgba(179,25,25,0.72)";
 * }
 */

function toColorString(color) {
  if (typeof color !== 'object') throw new PolishedError(8);
  if (isRgba(color)) return rgba(color);
  if (isRgb(color)) return rgb(color);
  if (isHsla(color)) return hsla(color);
  if (isHsl(color)) return hsl(color);
  throw new PolishedError(8);
}

// Type definitions taken from https://github.com/gcanti/flow-static-land/blob/master/src/Fun.js
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-redeclare
function curried(f, length, acc) {
  return function fn() {
    // eslint-disable-next-line prefer-rest-params
    var combined = acc.concat(Array.prototype.slice.call(arguments));
    return combined.length >= length ? f.apply(this, combined) : curried(f, length, combined);
  };
}

// eslint-disable-next-line no-redeclare
function curry(f) {
  // eslint-disable-line no-redeclare
  return curried(f, f.length, []);
}

/**
 * Changes the hue of the color. Hue is a number between 0 to 360. The first
 * argument for adjustHue is the amount of degrees the color is rotated around
 * the color wheel, always producing a positive hue value.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: adjustHue(180, '#448'),
 *   background: adjustHue('180', 'rgba(101,100,205,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${adjustHue(180, '#448')};
 *   background: ${adjustHue('180', 'rgba(101,100,205,0.7)')};
 * `
 *
 * // CSS in JS Output
 * element {
 *   background: "#888844";
 *   background: "rgba(136,136,68,0.7)";
 * }
 */
function adjustHue(degree, color) {
  if (color === 'transparent') return color;
  var hslColor = parseToHsl(color);
  return toColorString(_extends$10({}, hslColor, {
    hue: hslColor.hue + parseFloat(degree)
  }));
}

// prettier-ignore
curry /* ::<number | string, string, string> */(adjustHue);

function guard(lowerBoundary, upperBoundary, value) {
  return Math.max(lowerBoundary, Math.min(upperBoundary, value));
}

/**
 * Returns a string value for the darkened color.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: darken(0.2, '#FFCD64'),
 *   background: darken('0.2', 'rgba(255,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${darken(0.2, '#FFCD64')};
 *   background: ${darken('0.2', 'rgba(255,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#ffbd31";
 *   background: "rgba(255,189,49,0.7)";
 * }
 */
function darken(amount, color) {
  if (color === 'transparent') return color;
  var hslColor = parseToHsl(color);
  return toColorString(_extends$10({}, hslColor, {
    lightness: guard(0, 1, hslColor.lightness - parseFloat(amount))
  }));
}

// prettier-ignore
var curriedDarken = curry /* ::<number | string, string, string> */(darken);
var curriedDarken$1 = curriedDarken;

/**
 * Decreases the intensity of a color. Its range is between 0 to 1. The first
 * argument of the desaturate function is the amount by how much the color
 * intensity should be decreased.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: desaturate(0.2, '#CCCD64'),
 *   background: desaturate('0.2', 'rgba(204,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${desaturate(0.2, '#CCCD64')};
 *   background: ${desaturate('0.2', 'rgba(204,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 * element {
 *   background: "#b8b979";
 *   background: "rgba(184,185,121,0.7)";
 * }
 */
function desaturate(amount, color) {
  if (color === 'transparent') return color;
  var hslColor = parseToHsl(color);
  return toColorString(_extends$10({}, hslColor, {
    saturation: guard(0, 1, hslColor.saturation - parseFloat(amount))
  }));
}

// prettier-ignore
curry /* ::<number | string, string, string> */(desaturate);

/**
 * Returns a number (float) representing the luminance of a color.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: getLuminance('#CCCD64') >= getLuminance('#0000ff') ? '#CCCD64' : '#0000ff',
 *   background: getLuminance('rgba(58, 133, 255, 1)') >= getLuminance('rgba(255, 57, 149, 1)') ?
 *                             'rgba(58, 133, 255, 1)' :
 *                             'rgba(255, 57, 149, 1)',
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${getLuminance('#CCCD64') >= getLuminance('#0000ff') ? '#CCCD64' : '#0000ff'};
 *   background: ${getLuminance('rgba(58, 133, 255, 1)') >= getLuminance('rgba(255, 57, 149, 1)') ?
 *                             'rgba(58, 133, 255, 1)' :
 *                             'rgba(255, 57, 149, 1)'};
 *
 * // CSS in JS Output
 *
 * div {
 *   background: "#CCCD64";
 *   background: "rgba(58, 133, 255, 1)";
 * }
 */
function getLuminance(color) {
  if (color === 'transparent') return 0;
  var rgbColor = parseToRgb(color);
  var _Object$keys$map = Object.keys(rgbColor).map(function (key) {
      var channel = rgbColor[key] / 255;
      return channel <= 0.03928 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4);
    }),
    r = _Object$keys$map[0],
    g = _Object$keys$map[1],
    b = _Object$keys$map[2];
  return parseFloat((0.2126 * r + 0.7152 * g + 0.0722 * b).toFixed(3));
}

/**
 * Returns the contrast ratio between two colors based on
 * [W3's recommended equation for calculating contrast](http://www.w3.org/TR/WCAG20/#contrast-ratiodef).
 *
 * @example
 * const contrastRatio = getContrast('#444', '#fff');
 */
function getContrast(color1, color2) {
  var luminance1 = getLuminance(color1);
  var luminance2 = getLuminance(color2);
  return parseFloat((luminance1 > luminance2 ? (luminance1 + 0.05) / (luminance2 + 0.05) : (luminance2 + 0.05) / (luminance1 + 0.05)).toFixed(2));
}

/**
 * Returns a string value for the lightened color.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: lighten(0.2, '#CCCD64'),
 *   background: lighten('0.2', 'rgba(204,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${lighten(0.2, '#FFCD64')};
 *   background: ${lighten('0.2', 'rgba(204,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#e5e6b1";
 *   background: "rgba(229,230,177,0.7)";
 * }
 */
function lighten(amount, color) {
  if (color === 'transparent') return color;
  var hslColor = parseToHsl(color);
  return toColorString(_extends$10({}, hslColor, {
    lightness: guard(0, 1, hslColor.lightness + parseFloat(amount))
  }));
}

// prettier-ignore
var curriedLighten = curry /* ::<number | string, string, string> */(lighten);
var curriedLighten$1 = curriedLighten;

/**
 * Mixes the two provided colors together by calculating the average of each of the RGB components weighted to the first color by the provided weight.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: mix(0.5, '#f00', '#00f')
 *   background: mix(0.25, '#f00', '#00f')
 *   background: mix('0.5', 'rgba(255, 0, 0, 0.5)', '#00f')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${mix(0.5, '#f00', '#00f')};
 *   background: ${mix(0.25, '#f00', '#00f')};
 *   background: ${mix('0.5', 'rgba(255, 0, 0, 0.5)', '#00f')};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#7f007f";
 *   background: "#3f00bf";
 *   background: "rgba(63, 0, 191, 0.75)";
 * }
 */
function mix(weight, color, otherColor) {
  if (color === 'transparent') return otherColor;
  if (otherColor === 'transparent') return color;
  if (weight === 0) return otherColor;
  var parsedColor1 = parseToRgb(color);
  var color1 = _extends$10({}, parsedColor1, {
    alpha: typeof parsedColor1.alpha === 'number' ? parsedColor1.alpha : 1
  });
  var parsedColor2 = parseToRgb(otherColor);
  var color2 = _extends$10({}, parsedColor2, {
    alpha: typeof parsedColor2.alpha === 'number' ? parsedColor2.alpha : 1
  });

  // The formula is copied from the original Sass implementation:
  // http://sass-lang.com/documentation/Sass/Script/Functions.html#mix-instance_method
  var alphaDelta = color1.alpha - color2.alpha;
  var x = parseFloat(weight) * 2 - 1;
  var y = x * alphaDelta === -1 ? x : x + alphaDelta;
  var z = 1 + x * alphaDelta;
  var weight1 = (y / z + 1) / 2.0;
  var weight2 = 1 - weight1;
  var mixedColor = {
    red: Math.floor(color1.red * weight1 + color2.red * weight2),
    green: Math.floor(color1.green * weight1 + color2.green * weight2),
    blue: Math.floor(color1.blue * weight1 + color2.blue * weight2),
    alpha: color1.alpha * parseFloat(weight) + color2.alpha * (1 - parseFloat(weight))
  };
  return rgba(mixedColor);
}

// prettier-ignore
var curriedMix = curry /* ::<number | string, string, string, string> */(mix);
var mix$1 = curriedMix;

/**
 * Increases the opacity of a color. Its range for the amount is between 0 to 1.
 *
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: opacify(0.1, 'rgba(255, 255, 255, 0.9)');
 *   background: opacify(0.2, 'hsla(0, 0%, 100%, 0.5)'),
 *   background: opacify('0.5', 'rgba(255, 0, 0, 0.2)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${opacify(0.1, 'rgba(255, 255, 255, 0.9)')};
 *   background: ${opacify(0.2, 'hsla(0, 0%, 100%, 0.5)')},
 *   background: ${opacify('0.5', 'rgba(255, 0, 0, 0.2)')},
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#fff";
 *   background: "rgba(255,255,255,0.7)";
 *   background: "rgba(255,0,0,0.7)";
 * }
 */
function opacify(amount, color) {
  if (color === 'transparent') return color;
  var parsedColor = parseToRgb(color);
  var alpha = typeof parsedColor.alpha === 'number' ? parsedColor.alpha : 1;
  var colorWithAlpha = _extends$10({}, parsedColor, {
    alpha: guard(0, 1, (alpha * 100 + parseFloat(amount) * 100) / 100)
  });
  return rgba(colorWithAlpha);
}

// prettier-ignore
curry /* ::<number | string, string, string> */(opacify);

var defaultReturnIfLightColor = '#000';
var defaultReturnIfDarkColor = '#fff';

/**
 * Returns black or white (or optional passed colors) for best
 * contrast depending on the luminosity of the given color.
 * When passing custom return colors, strict mode ensures that the
 * return color always meets or exceeds WCAG level AA or greater. If this test
 * fails, the default return color (black or white) is returned in place of the
 * custom return color. You can optionally turn off strict mode.
 *
 * Follows [W3C specs for readability](https://www.w3.org/TR/WCAG20-TECHS/G18.html).
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   color: readableColor('#000'),
 *   color: readableColor('black', '#001', '#ff8'),
 *   color: readableColor('white', '#001', '#ff8'),
 *   color: readableColor('red', '#333', '#ddd', true)
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   color: ${readableColor('#000')};
 *   color: ${readableColor('black', '#001', '#ff8')};
 *   color: ${readableColor('white', '#001', '#ff8')};
 *   color: ${readableColor('red', '#333', '#ddd', true)};
 * `
 *
 * // CSS in JS Output
 * element {
 *   color: "#fff";
 *   color: "#ff8";
 *   color: "#001";
 *   color: "#000";
 * }
 */
function readableColor(color, returnIfLightColor, returnIfDarkColor, strict) {
  if (returnIfLightColor === void 0) {
    returnIfLightColor = defaultReturnIfLightColor;
  }
  if (returnIfDarkColor === void 0) {
    returnIfDarkColor = defaultReturnIfDarkColor;
  }
  if (strict === void 0) {
    strict = true;
  }
  var isColorLight = getLuminance(color) > 0.179;
  var preferredReturnColor = isColorLight ? returnIfLightColor : returnIfDarkColor;
  if (!strict || getContrast(color, preferredReturnColor) >= 4.5) {
    return preferredReturnColor;
  }
  return isColorLight ? defaultReturnIfLightColor : defaultReturnIfDarkColor;
}

/**
 * Increases the intensity of a color. Its range is between 0 to 1. The first
 * argument of the saturate function is the amount by how much the color
 * intensity should be increased.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: saturate(0.2, '#CCCD64'),
 *   background: saturate('0.2', 'rgba(204,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${saturate(0.2, '#FFCD64')};
 *   background: ${saturate('0.2', 'rgba(204,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#e0e250";
 *   background: "rgba(224,226,80,0.7)";
 * }
 */
function saturate(amount, color) {
  if (color === 'transparent') return color;
  var hslColor = parseToHsl(color);
  return toColorString(_extends$10({}, hslColor, {
    saturation: guard(0, 1, hslColor.saturation + parseFloat(amount))
  }));
}

// prettier-ignore
curry /* ::<number | string, string, string> */(saturate);

/**
 * Sets the hue of a color to the provided value. The hue range can be
 * from 0 and 359.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: setHue(42, '#CCCD64'),
 *   background: setHue('244', 'rgba(204,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${setHue(42, '#CCCD64')};
 *   background: ${setHue('244', 'rgba(204,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 * element {
 *   background: "#cdae64";
 *   background: "rgba(107,100,205,0.7)";
 * }
 */
function setHue(hue, color) {
  if (color === 'transparent') return color;
  return toColorString(_extends$10({}, parseToHsl(color), {
    hue: parseFloat(hue)
  }));
}

// prettier-ignore
curry /* ::<number | string, string, string> */(setHue);

/**
 * Sets the lightness of a color to the provided value. The lightness range can be
 * from 0 and 1.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: setLightness(0.2, '#CCCD64'),
 *   background: setLightness('0.75', 'rgba(204,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${setLightness(0.2, '#CCCD64')};
 *   background: ${setLightness('0.75', 'rgba(204,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 * element {
 *   background: "#4d4d19";
 *   background: "rgba(223,224,159,0.7)";
 * }
 */
function setLightness(lightness, color) {
  if (color === 'transparent') return color;
  return toColorString(_extends$10({}, parseToHsl(color), {
    lightness: parseFloat(lightness)
  }));
}

// prettier-ignore
curry /* ::<number | string, string, string> */(setLightness);

/**
 * Sets the saturation of a color to the provided value. The saturation range can be
 * from 0 and 1.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: setSaturation(0.2, '#CCCD64'),
 *   background: setSaturation('0.75', 'rgba(204,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${setSaturation(0.2, '#CCCD64')};
 *   background: ${setSaturation('0.75', 'rgba(204,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 * element {
 *   background: "#adad84";
 *   background: "rgba(228,229,76,0.7)";
 * }
 */
function setSaturation(saturation, color) {
  if (color === 'transparent') return color;
  return toColorString(_extends$10({}, parseToHsl(color), {
    saturation: parseFloat(saturation)
  }));
}

// prettier-ignore
curry /* ::<number | string, string, string> */(setSaturation);

/**
 * Shades a color by mixing it with black. `shade` can produce
 * hue shifts, where as `darken` manipulates the luminance channel and therefore
 * doesn't produce hue shifts.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: shade(0.25, '#00f')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${shade(0.25, '#00f')};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#00003f";
 * }
 */

function shade(percentage, color) {
  if (color === 'transparent') return color;
  return mix$1(parseFloat(percentage), 'rgb(0, 0, 0)', color);
}

// prettier-ignore
curry /* ::<number | string, string, string> */(shade);

/**
 * Tints a color by mixing it with white. `tint` can produce
 * hue shifts, where as `lighten` manipulates the luminance channel and therefore
 * doesn't produce hue shifts.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: tint(0.25, '#00f')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${tint(0.25, '#00f')};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#bfbfff";
 * }
 */

function tint(percentage, color) {
  if (color === 'transparent') return color;
  return mix$1(parseFloat(percentage), 'rgb(255, 255, 255)', color);
}

// prettier-ignore
curry /* ::<number | string, string, string> */(tint);

/**
 * Decreases the opacity of a color. Its range for the amount is between 0 to 1.
 *
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: transparentize(0.1, '#fff'),
 *   background: transparentize(0.2, 'hsl(0, 0%, 100%)'),
 *   background: transparentize('0.5', 'rgba(255, 0, 0, 0.8)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${transparentize(0.1, '#fff')};
 *   background: ${transparentize(0.2, 'hsl(0, 0%, 100%)')};
 *   background: ${transparentize('0.5', 'rgba(255, 0, 0, 0.8)')};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "rgba(255,255,255,0.9)";
 *   background: "rgba(255,255,255,0.8)";
 *   background: "rgba(255,0,0,0.3)";
 * }
 */
function transparentize(amount, color) {
  if (color === 'transparent') return color;
  var parsedColor = parseToRgb(color);
  var alpha = typeof parsedColor.alpha === 'number' ? parsedColor.alpha : 1;
  var colorWithAlpha = _extends$10({}, parsedColor, {
    alpha: guard(0, 1, +(alpha * 100 - parseFloat(amount) * 100).toFixed(2) / 100)
  });
  return rgba(colorWithAlpha);
}

// prettier-ignore
curry /* ::<number | string, string, string> */(transparentize);

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT$1 = 'Expected a function';

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** `Object#toString` result references. */
var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Detect free variable `global` from Node.js. */
var freeGlobal$1 = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

/** Detect free variable `self`. */
var freeSelf$1 = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root$1 = freeGlobal$1 || freeSelf$1 || Function('return this')();

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto$1 = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root$1['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto$1.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString$1 = objectProto$1.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var splice = arrayProto.splice;

/* Built-in method references that are verified to be native. */
var Map$1 = getNative(root$1, 'Map'),
    nativeCreate = getNative(Object, 'create');

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map$1 || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject$2(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction$2(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT$1);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result);
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Assign cache to `_.memoize`.
memoize.Cache = MapCache;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction$2(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject$2(value) ? objectToString$1.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject$2(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

var lodash_memoize = memoize;

var memoize$1 = /*@__PURE__*/getDefaultExportFromCjs(lodash_memoize);

/**
* Copyright Zendesk, Inc.
*
* Use of this source code is governed under the Apache License, Version 2.0
* found at http://www.apache.org/licenses/LICENSE-2.0.
*/

const DEFAULT_SHADE = 600;
const adjust = (color, expected, actual) => {
  if (expected !== actual) {
    const amount = Math.abs(expected - actual) / 100 * 0.05;
    return expected > actual ? curriedDarken$1(amount, color) : curriedLighten$1(amount, color);
  }
  return color;
};
const getColorV8 = memoize$1(function (hue) {
  let shade = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_SHADE;
  let theme = arguments.length > 2 ? arguments[2] : undefined;
  let transparency = arguments.length > 3 ? arguments[3] : undefined;
  let retVal;
  if (isNaN(shade)) {
    return undefined;
  }
  const palette = theme && theme.palette ? theme.palette : DEFAULT_THEME.palette;
  const colors = theme && theme.colors ? theme.colors : DEFAULT_THEME.colors;
  let _hue;
  if (typeof hue === 'string') {
    _hue = colors[hue] || hue;
  } else {
    _hue = hue;
  }
  if (Object.prototype.hasOwnProperty.call(palette, _hue)) {
    _hue = palette[_hue];
  }
  if (typeof _hue === 'object') {
    retVal = _hue[shade];
    if (!retVal) {
      const _shade = Object.keys(_hue).map(hueKey => parseInt(hueKey, 10)).reduce((previous, current) => {
        return Math.abs(current - shade) < Math.abs(previous - shade) ? current : previous;
      });
      retVal = adjust(_hue[_shade], shade, _shade);
    }
  } else {
    retVal = adjust(_hue, shade, DEFAULT_SHADE);
  }
  if (transparency) {
    retVal = rgba(retVal, transparency);
  }
  return retVal;
}, (hue, shade, theme, transparency) => JSON.stringify({
  hue,
  shade,
  palette: theme?.palette,
  colors: theme?.colors,
  transparency
}));

/**
* Copyright Zendesk, Inc.
*
* Use of this source code is governed under the Apache License, Version 2.0
* found at http://www.apache.org/licenses/LICENSE-2.0.
*/

const getFocusBoxShadow = _ref => {
  let {
    boxShadow,
    inset = false,
    hue = 'primaryHue',
    shade = DEFAULT_SHADE,
    shadowWidth = 'md',
    spacerHue = 'background',
    spacerShade = DEFAULT_SHADE,
    spacerWidth = 'xs',
    theme = DEFAULT_THEME
  } = _ref;
  const color = getColorV8(hue, shade, theme);
  const shadow = theme.shadows[shadowWidth](color);
  if (spacerWidth === null) {
    return `${inset ? 'inset' : ''} ${shadow}`;
  }
  const spacerColor = getColorV8(spacerHue, spacerShade, theme);
  const retVal = `
    ${inset ? 'inset' : ''} ${theme.shadows[spacerWidth](spacerColor)},
    ${inset ? 'inset' : ''} ${shadow}`;
  return boxShadow ? `${retVal}, ${boxShadow}` : retVal;
};

/**
* Copyright Zendesk, Inc.
*
* Use of this source code is governed under the Apache License, Version 2.0
* found at http://www.apache.org/licenses/LICENSE-2.0.
*/

function getLineHeight$1(height, fontSize) {
  const [heightValue, heightUnit] = getValueAndUnit(height.toString());
  const [fontSizeValue, fontSizeUnit] = getValueAndUnit(fontSize.toString());
  const PIXELS = 'px';
  if (heightUnit && heightUnit !== PIXELS) {
    throw new Error(`Unexpected \`height\` with '${heightUnit}' units.`);
  }
  if (fontSizeUnit && fontSizeUnit !== PIXELS) {
    throw new Error(`Unexpected \`fontSize\` with '${fontSizeUnit}' units.`);
  }
  return heightValue / fontSizeValue;
}

/**
* Copyright Zendesk, Inc.
*
* Use of this source code is governed under the Apache License, Version 2.0
* found at http://www.apache.org/licenses/LICENSE-2.0.
*/

const maxWidth = (breakpoints, breakpoint) => {
  const keys = Object.keys(breakpoints);
  const index = keys.indexOf(breakpoint) + 1;
  if (keys[index]) {
    const dimension = getValueAndUnit(breakpoints[keys[index]]);
    const value = dimension[0] - 0.02;
    const unit = dimension[1];
    return `${value}${unit}`;
  }
  return undefined;
};
function mediaQuery(query, breakpoint, theme) {
  let retVal;
  let min;
  let max;
  const breakpoints = theme && theme.breakpoints ? theme.breakpoints : DEFAULT_THEME.breakpoints;
  if (typeof breakpoint === 'string') {
    if (query === 'up') {
      min = breakpoints[breakpoint];
    } else if (query === 'down') {
      if (breakpoint === 'xl') {
        min = DEFAULT_THEME.breakpoints.xs;
      } else {
        max = maxWidth(breakpoints, breakpoint);
      }
    } else if (query === 'only') {
      min = breakpoints[breakpoint];
      max = maxWidth(breakpoints, breakpoint);
    }
  } else if (query === 'between') {
    min = breakpoints[breakpoint[0]];
    max = maxWidth(breakpoints, breakpoint[1]);
  }
  if (min) {
    retVal = `@media (min-width: ${min})`;
    if (max) {
      retVal = `${retVal} and (max-width: ${max})`;
    }
  } else if (max) {
    retVal = `@media (max-width: ${max})`;
  } else {
    throw new Error(`Unexpected query and breakpoint combination: '${query}', '${breakpoint}'.`);
  }
  return retVal;
}

/**
* Copyright Zendesk, Inc.
*
* Use of this source code is governed under the Apache License, Version 2.0
* found at http://www.apache.org/licenses/LICENSE-2.0.
*/

const exponentialSymbols = {
  symbols: {
    sqrt: {
      func: {
        symbol: 'sqrt',
        f: a => Math.sqrt(a),
        notation: 'func',
        precedence: 0,
        rightToLeft: 0,
        argCount: 1
      },
      symbol: 'sqrt',
      regSymbol: 'sqrt\\b'
    }
  }
};
const animationStyles$3 = (position, modifier) => {
  const property = position.split('-')[0];
  const animationName = $e(["0%,66%{", ":2px;border:transparent;}"], property);
  return Ne(["&", "::before,&", "::after{animation:0.3s ease-in-out ", ";}"], modifier, modifier, animationName);
};
const positionStyles = (position, size, inset) => {
  const margin = math(`${size} / -2`);
  const placement = math(`${margin} + ${inset}`);
  let clipPath;
  let positionCss;
  let propertyRadius;
  if (position.startsWith('top')) {
    propertyRadius = 'border-bottom-right-radius';
    clipPath = 'polygon(100% 0, 100% 1px, 1px 100%, 0 100%, 0 0)';
    positionCss = Ne(["top:", ";right:", ";left:", ";margin-left:", ";"], placement, position === 'top-right' && size, position === 'top' ? '50%' : position === 'top-left' && size, position === 'top' && margin);
  } else if (position.startsWith('right')) {
    propertyRadius = 'border-bottom-left-radius';
    clipPath = 'polygon(100% 0, 100% 100%, calc(100% - 1px) 100%, 0 1px, 0 0)';
    positionCss = Ne(["top:", ";right:", ";bottom:", ";margin-top:", ";"], position === 'right' ? '50%' : position === 'right-top' && size, placement, position === 'right-bottom' && size, position === 'right' && margin);
  } else if (position.startsWith('bottom')) {
    propertyRadius = 'border-top-left-radius';
    clipPath = 'polygon(100% 0, calc(100% - 1px) 0, 0 calc(100% - 1px), 0 100%, 100% 100%)';
    positionCss = Ne(["right:", ";bottom:", ";left:", ";margin-left:", ";"], position === 'bottom-right' && size, placement, position === 'bottom' ? '50%' : position === 'bottom-left' && size, position === 'bottom' && margin);
  } else if (position.startsWith('left')) {
    propertyRadius = 'border-top-right-radius';
    clipPath = 'polygon(0 100%, 100% 100%, 100% calc(100% - 1px), 1px 0, 0 0)';
    positionCss = Ne(["top:", ";bottom:", ";left:", ";margin-top:", ";"], position === 'left' ? '50%' : position === 'left-top' && size, size, placement, position === 'left' && margin);
  }
  return Ne(["&::before{", ":100%;clip-path:", ";}&::before,&::after{", "}"], propertyRadius, clipPath, positionCss);
};
function arrowStyles(position) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const size = options.size || '6px';
  const inset = options.inset || '0';
  const squareSize = math(`${size} * 2 / sqrt(2)`, exponentialSymbols);
  return Ne(["position:relative;&::before{border-width:inherit;border-style:inherit;border-color:transparent;background-clip:content-box;}&::after{z-index:-1;border:inherit;box-shadow:inherit;}&::before,&::after{position:absolute;transform:rotate(45deg);background-color:inherit;box-sizing:inherit;width:", ";height:", ";content:'';}", ";", ";"], squareSize, squareSize, positionStyles(position, squareSize, inset), options.animationModifier && animationStyles$3(position, options.animationModifier));
}

/**
* Copyright Zendesk, Inc.
*
* Use of this source code is governed under the Apache License, Version 2.0
* found at http://www.apache.org/licenses/LICENSE-2.0.
*/

const useWindow = theme => {
  const [controlledWindow, setControlledWindow] = reactExports.useState();
  reactExports.useEffect(() => {
    if (theme && theme.window) {
      setControlledWindow(theme.window);
    } else {
      setControlledWindow(window);
    }
  }, [theme]);
  return controlledWindow;
};

/**
* Copyright Zendesk, Inc.
*
* Use of this source code is governed under the Apache License, Version 2.0
* found at http://www.apache.org/licenses/LICENSE-2.0.
*/

const useText = function (component, props, name, text) {
  let condition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
  const value = condition ? props[name] : undefined;
  return reactExports.useMemo(() => {
    if (condition) {
      if (name === 'children') {
        throw new Error('Error: `children` is not a valid `useText` prop.');
      } else if (value === null || value === '') {
        throw new Error(component.displayName ? `Error: you must provide a valid \`${name}\` text value for <${component.displayName}>.` : `Error: you must provide a valid \`${name}\` text value.`);
      } else if (value === undefined) {
        return text;
      }
    }
    return value;
  }, [component.displayName, value, name, text, condition]);
};

/**
* Copyright Zendesk, Inc.
*
* Use of this source code is governed under the Apache License, Version 2.0
* found at http://www.apache.org/licenses/LICENSE-2.0.
*/

const animationStyles$2 = (position, options) => {
  const theme = options.theme || DEFAULT_THEME;
  let translateValue = `${theme.space.base * 5}px`;
  let transformFunction;
  if (position === 'top') {
    transformFunction = 'translateY';
  } else if (position === 'right') {
    transformFunction = 'translateX';
    translateValue = `-${translateValue}`;
  } else if (position === 'bottom') {
    transformFunction = 'translateY';
    translateValue = `-${translateValue}`;
  } else {
    transformFunction = 'translateX';
  }
  const animationName = $e(["0%{transform:", "(", ");}"], transformFunction, translateValue);
  return Ne(["&", " ", "{animation:0.2s cubic-bezier(0.15,0.85,0.35,1.2) ", ";}"], options.animationModifier, options.childSelector || '> *', animationName);
};
const hiddenStyles$1 = options => {
  const transition = 'opacity 0.2s ease-in-out, 0.2s visibility 0s linear';
  return Ne(["transition:", ";visibility:hidden;opacity:0;"], options.animationModifier && transition);
};
function menuStyles(position) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const theme = options.theme || DEFAULT_THEME;
  let marginProperty;
  if (position === 'top') {
    marginProperty = 'margin-bottom';
  } else if (position === 'right') {
    marginProperty = 'margin-left';
  } else if (position === 'bottom') {
    marginProperty = 'margin-top';
  } else {
    marginProperty = 'margin-right';
  }
  return Ne(["position:absolute;z-index:", ";", ":", ";line-height:0;font-size:0.01px;& ", "{display:inline-block;position:relative;margin:0;box-sizing:border-box;border:", " ", ";border-radius:", ";box-shadow:", ";background-color:", ";cursor:default;padding:0;text-align:", ";white-space:normal;font-size:", ";font-weight:", ";direction:", ";:focus{outline:none;}}", ";", ";"], options.zIndex || 0, marginProperty, options.margin, options.childSelector || '> *', theme.borders.sm, getColorV8('neutralHue', 300, theme), theme.borderRadii.md, theme.shadows.lg(`${theme.space.base * 5}px`, `${theme.space.base * 7.5}px`, getColorV8('chromeHue', 600, theme, 0.15)), getColorV8('background', 600 , theme), theme.rtl ? 'right' : 'left', theme.fontSizes.md, theme.fontWeights.regular, theme.rtl && 'rtl', options.animationModifier && animationStyles$2(position, options), options.hidden && hiddenStyles$1(options));
}

/**
* Copyright Zendesk, Inc.
*
* Use of this source code is governed under the Apache License, Version 2.0
* found at http://www.apache.org/licenses/LICENSE-2.0.
*/

const SELECTOR_FOCUS_VISIBLE = '&:focus-visible, &[data-garden-focus-visible="true"]';
const focusStyles = _ref => {
  let {
    condition = true,
    selector = SELECTOR_FOCUS_VISIBLE,
    shadowWidth = 'md',
    spacerWidth = 'xs',
    styles: {
      boxShadow,
      ...styles
    } = {},
    theme,
    ...options
  } = _ref;
  const _boxShadow = condition ? getFocusBoxShadow({
    boxShadow,
    shadowWidth,
    spacerWidth,
    theme,
    ...options
  }) : boxShadow;
  let outline;
  let outlineOffset;
  if (spacerWidth === null) {
    outline = theme.shadowWidths[shadowWidth];
  } else {
    outline = `${math(`${theme.shadowWidths[shadowWidth]} - ${theme.shadowWidths[spacerWidth]}`)} solid transparent`;
    outlineOffset = theme.shadowWidths[spacerWidth];
  }
  return Ne(["&:focus{outline:none;}", "{outline:", ";outline-offset:", ";box-shadow:", ";", "}"], selector, outline, outlineOffset, _boxShadow, styles);
};

function createTheme(settings) {
    return {
        ...DEFAULT_THEME,
        rtl: document.dir === "rtl",
        colors: {
            ...DEFAULT_THEME.colors,
            background: settings.background_color,
            foreground: settings.text_color,
            primaryHue: settings.brand_color,
        },
        components: {
            "buttons.anchor": Ne `
        color: ${settings.link_color};

        :hover,
        :active,
        :focus {
          color: ${settings.hover_link_color};
        }

        &:visited {
          color: ${settings.visited_link_color};
        }
      `,
            "buttons.button": Ne `
        ${(props) => props.isPrimary &&
                Ne `
            color: ${settings.brand_text_color};
          `}
      `,
        },
    };
}

/**
* Copyright Zendesk, Inc.
*
* Use of this source code is governed under the Apache License, Version 2.0
* found at http://www.apache.org/licenses/LICENSE-2.0.
*/
const TYPE$1 = ['success', 'warning', 'error', 'info'];

/**
* Copyright Zendesk, Inc.
*
* Use of this source code is governed under the Apache License, Version 2.0
* found at http://www.apache.org/licenses/LICENSE-2.0.
*/

const COMPONENT_ID$1W = 'notifications.close';
const StyledClose$2 = styled.button.attrs({
  'data-garden-id': COMPONENT_ID$1W,
  'data-garden-version': '8.76.9'
}).withConfig({
  displayName: "StyledClose",
  componentId: "sc-1mr9nx1-0"
})(["display:block;position:absolute;top:", "px;", ":", ";transition:background-color 0.1s ease-in-out,color 0.25s ease-in-out,box-shadow 0.1s ease-in-out;border:none;border-radius:50%;background-color:transparent;cursor:pointer;padding:0;width:", "px;height:", "px;overflow:hidden;color:", ";font-size:0;user-select:none;&::-moz-focus-inner{border:0;}&:hover{color:", ";}", " ", ";"], props => props.theme.space.base, props => props.theme.rtl ? 'left' : 'right', props => `${props.theme.space.base}px`, props => props.theme.space.base * 7, props => props.theme.space.base * 7, props => props.hue ? getColorV8(props.hue, props.hue === 'warningHue' ? 700 : 600, props.theme) : getColorV8('neutralHue', 600, props.theme), props => props.hue ? getColorV8(props.hue, 800, props.theme) : getColorV8('neutralHue', 800, props.theme), props => focusStyles({
  theme: props.theme,
  inset: true
}), props => retrieveComponentStyles(COMPONENT_ID$1W, props));
StyledClose$2.defaultProps = {
  theme: DEFAULT_THEME
};

/**
* Copyright Zendesk, Inc.
*
* Use of this source code is governed under the Apache License, Version 2.0
* found at http://www.apache.org/licenses/LICENSE-2.0.
*/

const COMPONENT_ID$1V = 'notifications.title';
const StyledTitle$1 = styled.div.attrs({
  'data-garden-id': COMPONENT_ID$1V,
  'data-garden-version': '8.76.9'
}).withConfig({
  displayName: "StyledTitle",
  componentId: "sc-xx4jsv-0"
})(["margin:0;color:", ";font-weight:", ";", ";"], props => getColorV8('foreground', 600 , props.theme), props => props.isRegular ? props.theme.fontWeights.regular : props.theme.fontWeights.semibold, props => retrieveComponentStyles(COMPONENT_ID$1V, props));
StyledTitle$1.defaultProps = {
  theme: DEFAULT_THEME
};

/**
* Copyright Zendesk, Inc.
*
* Use of this source code is governed under the Apache License, Version 2.0
* found at http://www.apache.org/licenses/LICENSE-2.0.
*/

const boxShadow$1 = props => {
  const {
    theme
  } = props;
  const {
    space,
    shadows
  } = theme;
  const offsetY = `${space.base * 5}px`;
  const blurRadius = `${space.base * 7}px`;
  const color = getColorV8('chromeHue', 600, theme, 0.15);
  return shadows.lg(offsetY, blurRadius, color);
};
const colorStyles$y = props => {
  let backgroundColor;
  let borderColor;
  let foregroundColor;
  if (props.hue) {
    backgroundColor = getColorV8(props.hue, 100, props.theme);
    borderColor = getColorV8(props.hue, 300, props.theme);
    foregroundColor = getColorV8(props.hue, props.type === 'info' ? 600 : 700, props.theme);
  } else {
    backgroundColor = getColorV8('background', 600 , props.theme);
    borderColor = getColorV8('neutralHue', 300, props.theme);
    foregroundColor = getColorV8('neutralHue', 800, props.theme);
  }
  return Ne(["border-color:", ";background-color:", ";color:", ";"], borderColor, backgroundColor, foregroundColor);
};
const padding = props => {
  const {
    space
  } = props.theme;
  const paddingVertical = `${space.base * 5}px`;
  const paddingHorizontal = `${space.base * 10}px`;
  return `${paddingVertical} ${paddingHorizontal}`;
};
const StyledBase = styled.div.withConfig({
  displayName: "StyledBase",
  componentId: "sc-14syaqw-0"
})(["position:relative;border:", ";border-radius:", ";box-shadow:", ";padding:", ";line-height:", ";font-size:", ";direction:", ";", ";"], props => props.theme.borders.sm, props => props.theme.borderRadii.md, props => props.isFloating && boxShadow$1, padding, props => getLineHeight$1(props.theme.space.base * 5, props.theme.fontSizes.md), props => props.theme.fontSizes.md, props => props.theme.rtl && 'rtl', colorStyles$y);
StyledBase.defaultProps = {
  theme: DEFAULT_THEME
};

/**
* Copyright Zendesk, Inc.
*
* Use of this source code is governed under the Apache License, Version 2.0
* found at http://www.apache.org/licenses/LICENSE-2.0.
*/

const COMPONENT_ID$1U = 'notifications.alert';
const colorStyles$x = props => Ne(["", "{color:", ";}"], StyledTitle$1, props.hue && getColorV8(props.hue, 800, props.theme));
const StyledAlert = styled(StyledBase).attrs({
  'data-garden-id': COMPONENT_ID$1U,
  'data-garden-version': '8.76.9'
}).withConfig({
  displayName: "StyledAlert",
  componentId: "sc-fyn8jp-0"
})(["", " ", ";"], colorStyles$x, props => retrieveComponentStyles(COMPONENT_ID$1U, props));
StyledAlert.defaultProps = {
  theme: DEFAULT_THEME
};

/**
* Copyright Zendesk, Inc.
*
* Use of this source code is governed under the Apache License, Version 2.0
* found at http://www.apache.org/licenses/LICENSE-2.0.
*/

const COMPONENT_ID$1T = 'notifications.notification';
const colorStyles$w = props => {
  const {
    type,
    theme
  } = props;
  const {
    colors
  } = theme;
  const {
    successHue,
    dangerHue,
    warningHue
  } = colors;
  let color;
  switch (type) {
    case 'success':
      color = getColorV8(successHue, 600, theme);
      break;
    case 'error':
      color = getColorV8(dangerHue, 600, theme);
      break;
    case 'warning':
      color = getColorV8(warningHue, 700, theme);
      break;
    case 'info':
      color = getColorV8('foreground', 600 , theme);
      break;
    default:
      color = 'inherit';
      break;
  }
  return Ne(["", "{color:", ";}"], StyledTitle$1, color);
};
const StyledNotification = styled(StyledBase).attrs({
  'data-garden-id': COMPONENT_ID$1T,
  'data-garden-version': '8.76.9'
}).withConfig({
  displayName: "StyledNotification",
  componentId: "sc-uf6jh-0"
})(["", " ", ";"], colorStyles$w, props => retrieveComponentStyles(COMPONENT_ID$1T, props));
StyledNotification.propTypes = {
  type: PropTypes.oneOf(TYPE$1)
};
StyledNotification.defaultProps = {
  theme: DEFAULT_THEME
};

/**
* Copyright Zendesk, Inc.
*
* Use of this source code is governed under the Apache License, Version 2.0
* found at http://www.apache.org/licenses/LICENSE-2.0.
*/

const StyledIcon$3 = styled(_ref => {
  let {
    children,
    ...props
  } = _ref;
  return React__default.cloneElement(reactExports.Children.only(children), props);
}).withConfig({
  displayName: "StyledIcon",
  componentId: "sc-msklws-0"
})(["position:absolute;right:", ";left:", ";margin-top:", "px;color:", ";"], props => props.theme.rtl && `${props.theme.space.base * 4}px`, props => !props.theme.rtl && `${props.theme.space.base * 4}px`, props => props.theme.space.base / 2, props => props.hue && getColorV8(props.hue, props.hue === 'warningHue' ? 700 : 600, props.theme));
StyledIcon$3.defaultProps = {
  theme: DEFAULT_THEME
};

function mergeRefs(refs) {
  return function (value) {
    refs.forEach(function (ref) {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        ref.current = value;
      }
    });
  };
}

/**
* Copyright Zendesk, Inc.
*
* Use of this source code is governed under the Apache License, Version 2.0
* found at http://www.apache.org/licenses/LICENSE-2.0.
*/
const SIZE$6 = ['small', 'medium', 'large'];

/**
* Copyright Zendesk, Inc.
*
* Use of this source code is governed under the Apache License, Version 2.0
* found at http://www.apache.org/licenses/LICENSE-2.0.
*/

const COMPONENT_ID$1S = 'buttons.button_group_view';
const StyledButtonGroup = styled.div.attrs({
  'data-garden-id': COMPONENT_ID$1S,
  'data-garden-version': '8.76.9'
}).withConfig({
  displayName: "StyledButtonGroup",
  componentId: "sc-1fbpzef-0"
})(["display:inline-flex;position:relative;z-index:0;direction:", ";white-space:nowrap;", ";"], props => props.theme.rtl && 'rtl', props => retrieveComponentStyles(COMPONENT_ID$1S, props));
StyledButtonGroup.defaultProps = {
  theme: DEFAULT_THEME
};

/**
* Copyright Zendesk, Inc.
*
* Use of this source code is governed under the Apache License, Version 2.0
* found at http://www.apache.org/licenses/LICENSE-2.0.
*/

const COMPONENT_ID$1R = 'buttons.icon';
const sizeStyles$w = props => {
  let marginProperty;
  if (props.position === 'start') {
    marginProperty = `margin-${props.theme.rtl ? 'left' : 'right'}`;
  } else if (props.position === 'end') {
    marginProperty = `margin-${props.theme.rtl ? 'right' : 'left'}`;
  }
  return marginProperty && Ne(["", ":", "px;"], marginProperty, props.theme.space.base * 2);
};
const StyledIcon$2 = styled(_ref => {
  let {
    children,
    isRotated,
    theme,
    ...props
  } = _ref;
  return React__default.cloneElement(reactExports.Children.only(children), props);
}).attrs({
  'data-garden-id': COMPONENT_ID$1R,
  'data-garden-version': '8.76.9'
}).withConfig({
  displayName: "StyledIcon",
  componentId: "sc-19meqgg-0"
})(["transform:", ";transition:transform 0.25s ease-in-out,color 0.25s ease-in-out;", ";", ";"], props => props.isRotated && `rotate(${props.theme.rtl ? '-' : '+'}180deg)`, props => sizeStyles$w(props), props => retrieveComponentStyles(COMPONENT_ID$1R, props));
StyledIcon$2.defaultProps = {
  theme: DEFAULT_THEME
};

/**
* Copyright Zendesk, Inc.
*
* Use of this source code is governed under the Apache License, Version 2.0
* found at http://www.apache.org/licenses/LICENSE-2.0.
*/

const COMPONENT_ID$1Q = 'buttons.button';
const getBorderRadius = props => {
  if (props.isPill) {
    return '100px';
  }
  return props.theme.borderRadii.md;
};
const getDisabledBackgroundColor = props => {
  return getColorV8('neutralHue', 200, props.theme);
};
const getHeight$1 = props => {
  if (props.size === 'small') {
    return `${props.theme.space.base * 8}px`;
  } else if (props.size === 'large') {
    return `${props.theme.space.base * 12}px`;
  }
  return `${props.theme.space.base * 10}px`;
};
const colorStyles$v = props => {
  let retVal;
  let hue;
  if (props.disabled || props.isNeutral && (props.isPrimary || props.isSelected) && !props.isDanger) {
    hue = 'neutralHue';
  } else if (props.isDanger) {
    hue = 'dangerHue';
  } else {
    hue = 'primaryHue';
  }
  const shade = 600;
  const baseColor = getColorV8(hue, shade, props.theme);
  const hoverColor = getColorV8(hue, shade + 100, props.theme);
  const activeColor = getColorV8(hue, shade + 200, props.theme);
  const focusColor = getColorV8('primaryHue', shade, props.theme);
  const disabledBackgroundColor = getDisabledBackgroundColor(props);
  const disabledForegroundColor = getColorV8(hue, shade - 200, props.theme);
  if (props.isLink) {
    retVal = Ne(["outline-color:transparent;background-color:transparent;color:", ";", " &:hover{color:", ";}&:active,&[aria-pressed='true'],&[aria-pressed='mixed']{color:", ";}&:disabled{color:", ";}"], baseColor, focusStyles({
      theme: props.theme,
      condition: false,
      styles: {
        color: baseColor,
        outlineColor: focusColor
      }
    }), hoverColor, activeColor, disabledForegroundColor);
  } else if (props.isPrimary || props.isSelected) {
    retVal = Ne(["outline-color:transparent;background-color:", ";color:", ";&:hover{background-color:", ";}", " &:active{background-color:", ";}&[aria-pressed='true'],&[aria-pressed='mixed']{background-color:", ";}&:disabled{background-color:", ";color:", ";}"], props.isPrimary && props.isSelected ? activeColor : baseColor, props.theme.palette.white, hoverColor, focusStyles({
      theme: props.theme,
      inset: props.focusInset,
      shadowWidth: props.focusInset ? 'sm' : 'md',
      spacerWidth: props.focusInset ? 'sm' : 'xs',
      styles: props.isDanger && props.focusInset ? {
        borderColor: focusColor
      } : undefined
    }), activeColor, props.isPrimary && activeColor, disabledBackgroundColor, disabledForegroundColor);
  } else {
    const borderColor = props.isNeutral && !props.isDanger ? getColorV8('neutralHue', 300, props.theme) : baseColor;
    const foregroundColor = props.isNeutral ? getColorV8('foreground', 600 , props.theme) : baseColor;
    const hoverBorderColor = props.isNeutral && !props.isDanger ? baseColor : hoverColor;
    const hoverForegroundColor = props.isNeutral ? foregroundColor : hoverColor;
    retVal = Ne(["outline-color:transparent;border-color:", ";background-color:transparent;color:", ";&:hover{border-color:", ";background-color:", ";color:", ";}", " &:active,&[aria-pressed='true'],&[aria-pressed='mixed']{border-color:", ";background-color:", ";color:", ";}&:disabled{border-color:transparent;background-color:", ";color:", ";}& ", "{color:", ";}&:hover ", ",&:focus-visible ", ",&[data-garden-focus-visible] ", "{color:", ";}&:active ", "{color:", ";}&:disabled ", "{color:", ";}"], !props.isBasic && borderColor, foregroundColor, !props.isBasic && hoverBorderColor, rgba(baseColor, 0.08), hoverForegroundColor, focusStyles({
      theme: props.theme,
      inset: props.focusInset,
      styles: props.isNeutral ? {
        borderColor: baseColor
      } : undefined
    }), !props.isBasic && activeColor, rgba(baseColor, 0.2), !props.isNeutral && activeColor, disabledBackgroundColor, disabledForegroundColor, StyledIcon$2, props.isNeutral && getColorV8('neutralHue', shade, props.theme), StyledIcon$2, StyledIcon$2, StyledIcon$2, props.isNeutral && getColorV8('neutralHue', shade + 100, props.theme), StyledIcon$2, props.isNeutral && foregroundColor, StyledIcon$2, disabledForegroundColor);
  }
  return retVal;
};
const groupStyles = props => {
  const {
    theme,
    isPrimary,
    isBasic,
    isSelected,
    isPill,
    focusInset
  } = props;
  const {
    rtl,
    borderWidths,
    borders
  } = theme;
  const startPosition = rtl ? 'right' : 'left';
  const endPosition = rtl ? 'left' : 'right';
  const marginOffset = borderWidths.sm;
  const marginDisplacement = `${isPrimary || isBasic ? '' : '-'}${marginOffset}`;
  const iconMarginDisplacement = isPill && '-2px';
  const disabledBackgroundColor = !isPrimary && getDisabledBackgroundColor(props);
  const borderColor = isBasic ? 'transparent' : 'revert';
  const focusColor = getColorV8('primaryHue', 600, theme);
  const focusBoxShadow = isBasic && !isSelected && !isPrimary && getFocusBoxShadow({
    theme,
    inset: focusInset,
    spacerHue: focusColor,
    hue: 'transparent'
  });
  return Ne(["position:relative;transition:border-color 0.1s ease-in-out,background-color 0.1s ease-in-out,box-shadow 0.1s ease-in-out,color 0.1s ease-in-out,margin-", " 0.1s ease-in-out,outline-color 0.1s ease-in-out,z-index 0.25s ease-in-out;border:", " ", ";", "{border-color:", ";box-shadow:", ";}&:hover,&:active,", "{z-index:1;}&:disabled{z-index:-1;background-color:", ";}&:not(:first-of-type){margin-", ":", ";}&:not(:first-of-type):disabled{margin-", ":", ";}&:not(:first-of-type):not(:last-of-type){border-radius:0;}&:first-of-type:not(:last-of-type){border-top-", "-radius:0;border-bottom-", "-radius:0;}&:last-of-type:not(:first-of-type){border-top-", "-radius:0;border-bottom-", "-radius:0;}&:first-of-type:not(:last-of-type) ", "{margin-", ":", ";}&:last-of-type:not(:first-of-type) ", "{margin-", ":", ";}"], startPosition, borders.sm, borderColor, SELECTOR_FOCUS_VISIBLE, focusColor, focusBoxShadow, SELECTOR_FOCUS_VISIBLE, disabledBackgroundColor, startPosition, marginDisplacement, startPosition, marginOffset, endPosition, endPosition, startPosition, startPosition, StyledIcon$2, endPosition, iconMarginDisplacement, StyledIcon$2, startPosition, iconMarginDisplacement);
};
const iconStyles = props => {
  const size = props.size === 'small' ? props.theme.iconSizes.sm : props.theme.iconSizes.md;
  return Ne(["width:", ";min-width:", ";height:", ";vertical-align:", ";"], size, size, size, props.isLink && 'middle');
};
const sizeStyles$v = props => {
  let retVal;
  if (props.isLink) {
    retVal = Ne(["padding:0;font-size:inherit;"]);
  } else {
    const height = getHeight$1(props);
    const lineHeight = math(`${height} - (${props.theme.borderWidths.sm} * 2)`);
    let padding;
    let fontSize;
    if (props.size === 'small') {
      fontSize = props.theme.fontSizes.sm;
      padding = `${props.theme.space.base * 3}px`;
    } else {
      fontSize = props.theme.fontSizes.md;
      if (props.size === 'large') {
        padding = `${props.theme.space.base * 5}px`;
      } else {
        padding = `${props.theme.space.base * 4}px`;
      }
    }
    retVal = Ne(["padding:0 ", ";height:", ";line-height:", ";font-size:", ";"], em$1(math(`${padding} - ${props.theme.borderWidths.sm}`), fontSize), height, lineHeight, fontSize);
  }
  return retVal;
};
const StyledButton$1 = styled.button.attrs(props => ({
  'data-garden-id': COMPONENT_ID$1Q,
  'data-garden-version': '8.76.9',
  type: props.type || 'button'
})).withConfig({
  displayName: "StyledButton",
  componentId: "sc-qe3ace-0"
})(["display:", ";align-items:", ";justify-content:", ";transition:border-color 0.25s ease-in-out,box-shadow 0.1s ease-in-out,background-color 0.25s ease-in-out,color 0.25s ease-in-out,outline-color 0.1s ease-in-out,z-index 0.25s ease-in-out;margin:0;border:", ";border-radius:", ";cursor:pointer;width:", ";overflow:hidden;text-decoration:none;text-overflow:ellipsis;white-space:", ";font-family:inherit;font-weight:", ";-webkit-font-smoothing:subpixel-antialiased;box-sizing:border-box;user-select:", ";-webkit-touch-callout:none;", ";&::-moz-focus-inner{border:0;padding:0;}", "{text-decoration:none;}&:hover{text-decoration:", ";}&:active,&[aria-pressed='true'],&[aria-pressed='mixed']{transition:border-color 0.1s ease-in-out,background-color 0.1s ease-in-out,box-shadow 0.1s ease-in-out,color 0.1s ease-in-out,outline-color 0.1s ease-in-out,z-index 0.25s ease-in-out;text-decoration:", ";}", ";&:disabled{cursor:default;text-decoration:", ";}& ", "{", "}", " &&{", "}", ""], props => props.isLink ? 'inline' : 'inline-flex', props => !props.isLink && 'center', props => !props.isLink && 'center', props => `${props.isLink ? `0px solid` : props.theme.borders.sm} transparent`, props => getBorderRadius(props), props => props.isStretched ? '100%' : '', props => !props.isLink && 'nowrap', props => props.isLink ? 'inherit' : props.theme.fontWeights.regular, props => !props.isLink && 'none', props => sizeStyles$v(props), SELECTOR_FOCUS_VISIBLE, props => props.isLink ? 'underline' : 'none', props => props.isLink ? 'underline' : 'none', props => colorStyles$v(props), props => props.isLink && 'none', StyledIcon$2, props => iconStyles(props), StyledButtonGroup, props => groupStyles(props), props => retrieveComponentStyles(COMPONENT_ID$1Q, props));
StyledButton$1.defaultProps = {
  theme: DEFAULT_THEME
};

/**
* Copyright Zendesk, Inc.
*
* Use of this source code is governed under the Apache License, Version 2.0
* found at http://www.apache.org/licenses/LICENSE-2.0.
*/

const COMPONENT_ID$1P = 'buttons.anchor';
const StyledAnchor = styled(StyledButton$1).attrs(props => ({
  'data-garden-id': COMPONENT_ID$1P,
  'data-garden-version': '8.76.9',
  as: 'a',
  dir: props.theme.rtl ? 'rtl' : undefined,
  isLink: true,
  type: undefined
})).withConfig({
  displayName: "StyledAnchor",
  componentId: "sc-xshgmo-0"
})(["direction:", ";", ";"], props => props.theme.rtl && 'rtl', props => retrieveComponentStyles(COMPONENT_ID$1P, props));
StyledAnchor.defaultProps = {
  theme: DEFAULT_THEME
};

/**
* Copyright Zendesk, Inc.
*
* Use of this source code is governed under the Apache License, Version 2.0
* found at http://www.apache.org/licenses/LICENSE-2.0.
*/

var _path$O;
function _extends$$() { return _extends$$ = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$$.apply(null, arguments); }
var SvgNewWindowStroke = function SvgNewWindowStroke(props) {
  return /*#__PURE__*/reactExports.createElement("svg", _extends$$({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12,
    focusable: "false",
    viewBox: "0 0 12 12",
    "aria-hidden": "true"
  }, props), _path$O || (_path$O = /*#__PURE__*/reactExports.createElement("path", {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    d: "M10.5 8.5V10c0 .3-.2.5-.5.5H2c-.3 0-.5-.2-.5-.5V2c0-.3.2-.5.5-.5h1.5M6 6l4-4m-3.5-.5H10c.3 0 .5.2.5.5v3.5"
  })));
};

/**
* Copyright Zendesk, Inc.
*
* Use of this source code is governed under the Apache License, Version 2.0
* found at http://www.apache.org/licenses/LICENSE-2.0.
*/

const COMPONENT_ID$1O = 'buttons.external_icon';
const StyledExternalIcon = styled(SvgNewWindowStroke).attrs({
  'data-garden-id': COMPONENT_ID$1O,
  'data-garden-version': '8.76.9'
}).withConfig({
  displayName: "StyledExternalIcon",
  componentId: "sc-16oz07e-0"
})(["transform:", ";margin-bottom:-0.085em;padding-left:0.25em;box-sizing:content-box;width:0.85em;height:0.85em;", ";"], props => props.theme.rtl && 'scaleX(-1)', props => retrieveComponentStyles(COMPONENT_ID$1O, props));
StyledExternalIcon.defaultProps = {
  theme: DEFAULT_THEME
};

/**
* Copyright Zendesk, Inc.
*
* Use of this source code is governed under the Apache License, Version 2.0
* found at http://www.apache.org/licenses/LICENSE-2.0.
*/

const ButtonGroupContext = reactExports.createContext(undefined);
const useButtonGroupContext = () => {
  return reactExports.useContext(ButtonGroupContext);
};

/**
* Copyright Zendesk, Inc.
*
* Use of this source code is governed under the Apache License, Version 2.0
* found at http://www.apache.org/licenses/LICENSE-2.0.
*/

const SplitButtonContext = reactExports.createContext(undefined);
const useSplitButtonContext = () => {
  return reactExports.useContext(SplitButtonContext);
};

/**
* Copyright Zendesk, Inc.
*
* Use of this source code is governed under the Apache License, Version 2.0
* found at http://www.apache.org/licenses/LICENSE-2.0.
*/

const StartIconComponent$2 = props => React__default.createElement(StyledIcon$2, Object.assign({
  position: "start"
}, props));
StartIconComponent$2.displayName = 'Button.StartIcon';
const StartIcon$2 = StartIconComponent$2;

/**
* Copyright Zendesk, Inc.
*
* Use of this source code is governed under the Apache License, Version 2.0
* found at http://www.apache.org/licenses/LICENSE-2.0.
*/

const EndIconComponent$1 = props => React__default.createElement(StyledIcon$2, Object.assign({
  position: "end"
}, props));
EndIconComponent$1.displayName = 'Button.EndIcon';
const EndIcon$1 = EndIconComponent$1;

/**
* Copyright Zendesk, Inc.
*
* Use of this source code is governed under the Apache License, Version 2.0
* found at http://www.apache.org/licenses/LICENSE-2.0.
*/

const ButtonComponent = reactExports.forwardRef((props, ref) => {
  const buttonGroupContext = useButtonGroupContext();
  const splitButtonContext = useSplitButtonContext();
  let computedRef = ref;
  let computedProps = {
    ...props,
    focusInset: props.focusInset || buttonGroupContext !== undefined || splitButtonContext
  };
  if (buttonGroupContext && !props.disabled) {
    if (!props.value) {
      throw new Error('"value" prop must be provided to Button when used within a ButtonGroup');
    }
    computedProps = buttonGroupContext.getButtonProps({
      isSelected: props.value === buttonGroupContext.selectedItem,
      ...computedProps
    });
    computedRef = mergeRefs([
    computedProps.ref, ref]);
  }
  return React__default.createElement(StyledButton$1, Object.assign({}, computedProps, {
    ref: computedRef
  }));
});
ButtonComponent.displayName = 'Button';
ButtonComponent.propTypes = {
  isNeutral: PropTypes.bool,
  isPrimary: PropTypes.bool,
  isDanger: PropTypes.bool,
  isPill: PropTypes.bool,
  isBasic: PropTypes.bool,
  focusInset: PropTypes.bool,
  isLink: PropTypes.bool,
  isStretched: PropTypes.bool,
  isSelected: PropTypes.bool,
  size: PropTypes.oneOf(SIZE$6)
};
ButtonComponent.defaultProps = {
  size: 'medium'
};
const Button = ButtonComponent;
Button.EndIcon = EndIcon$1;
Button.StartIcon = StartIcon$2;

/**
* Copyright Zendesk, Inc.
*
* Use of this source code is governed under the Apache License, Version 2.0
* found at http://www.apache.org/licenses/LICENSE-2.0.
*/

const Anchor = reactExports.forwardRef((_ref, ref) => {
  let {
    children,
    isExternal,
    externalIconLabel,
    ...otherProps
  } = _ref;
  let anchorProps = otherProps;
  if (isExternal) {
    anchorProps = {
      target: '_blank',
      rel: 'noopener noreferrer',
      ...anchorProps
    };
  }
  const checkProps = isExternal ? {
    externalIconLabel
  } : {
    noIconLabel: 'true'
  };
  const iconAriaLabel = useText(Anchor, checkProps, isExternal ? 'externalIconLabel' : 'noIconLabel', '(opens in a new tab)');
  return React__default.createElement(StyledAnchor, Object.assign({
    ref: ref
  }, anchorProps), children, isExternal &&
  React__default.createElement(StyledExternalIcon, {
    role: "img",
    "aria-label": iconAriaLabel,
    "aria-hidden": undefined
  }));
});
Anchor.displayName = 'Anchor';
Anchor.propTypes = {
  isExternal: PropTypes.bool,
  isDanger: PropTypes.bool,
  externalIconLabel: PropTypes.string
};

/**
* Copyright Zendesk, Inc.
*
* Use of this source code is governed under the Apache License, Version 2.0
* found at http://www.apache.org/licenses/LICENSE-2.0.
*/

var _g$9, _circle$b;
function _extends$_() { return _extends$_ = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$_.apply(null, arguments); }
var SvgAlertErrorStroke$2 = function SvgAlertErrorStroke(props) {
  return /*#__PURE__*/reactExports.createElement("svg", _extends$_({
    xmlns: "http://www.w3.org/2000/svg",
    width: 16,
    height: 16,
    focusable: "false",
    viewBox: "0 0 16 16",
    "aria-hidden": "true"
  }, props), _g$9 || (_g$9 = /*#__PURE__*/reactExports.createElement("g", {
    fill: "none",
    stroke: "currentColor"
  }, /*#__PURE__*/reactExports.createElement("circle", {
    cx: 7.5,
    cy: 8.5,
    r: 7
  }), /*#__PURE__*/reactExports.createElement("path", {
    strokeLinecap: "round",
    d: "M7.5 4.5V9"
  }))), _circle$b || (_circle$b = /*#__PURE__*/reactExports.createElement("circle", {
    cx: 7.5,
    cy: 12,
    r: 1,
    fill: "currentColor"
  })));
};

/**
* Copyright Zendesk, Inc.
*
* Use of this source code is governed under the Apache License, Version 2.0
* found at http://www.apache.org/licenses/LICENSE-2.0.
*/

var _g$8;
function _extends$Z() { return _extends$Z = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$Z.apply(null, arguments); }
var SvgCheckCircleStroke$3 = function SvgCheckCircleStroke(props) {
  return /*#__PURE__*/reactExports.createElement("svg", _extends$Z({
    xmlns: "http://www.w3.org/2000/svg",
    width: 16,
    height: 16,
    focusable: "false",
    viewBox: "0 0 16 16",
    "aria-hidden": "true"
  }, props), _g$8 || (_g$8 = /*#__PURE__*/reactExports.createElement("g", {
    fill: "none",
    stroke: "currentColor"
  }, /*#__PURE__*/reactExports.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M4 9l2.5 2.5 5-5"
  }), /*#__PURE__*/reactExports.createElement("circle", {
    cx: 7.5,
    cy: 8.5,
    r: 7
  }))));
};

/**
* Copyright Zendesk, Inc.
*
* Use of this source code is governed under the Apache License, Version 2.0
* found at http://www.apache.org/licenses/LICENSE-2.0.
*/

var _path$N, _circle$a;
function _extends$Y() { return _extends$Y = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$Y.apply(null, arguments); }
var SvgAlertWarningStroke$2 = function SvgAlertWarningStroke(props) {
  return /*#__PURE__*/reactExports.createElement("svg", _extends$Y({
    xmlns: "http://www.w3.org/2000/svg",
    width: 16,
    height: 16,
    focusable: "false",
    viewBox: "0 0 16 16",
    "aria-hidden": "true"
  }, props), _path$N || (_path$N = /*#__PURE__*/reactExports.createElement("path", {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    d: "M.88 13.77L7.06 1.86c.19-.36.7-.36.89 0l6.18 11.91c.17.33-.07.73-.44.73H1.32c-.37 0-.61-.4-.44-.73zM7.5 6v3.5"
  })), _circle$a || (_circle$a = /*#__PURE__*/reactExports.createElement("circle", {
    cx: 7.5,
    cy: 12,
    r: 1,
    fill: "currentColor"
  })));
};

/**
* Copyright Zendesk, Inc.
*
* Use of this source code is governed under the Apache License, Version 2.0
* found at http://www.apache.org/licenses/LICENSE-2.0.
*/

var _g$7, _circle$9;
function _extends$X() { return _extends$X = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$X.apply(null, arguments); }
var SvgInfoStroke = function SvgInfoStroke(props) {
  return /*#__PURE__*/reactExports.createElement("svg", _extends$X({
    xmlns: "http://www.w3.org/2000/svg",
    width: 16,
    height: 16,
    focusable: "false",
    viewBox: "0 0 16 16",
    "aria-hidden": "true"
  }, props), _g$7 || (_g$7 = /*#__PURE__*/reactExports.createElement("g", {
    stroke: "currentColor"
  }, /*#__PURE__*/reactExports.createElement("circle", {
    cx: 7.5,
    cy: 8.5,
    r: 7,
    fill: "none"
  }), /*#__PURE__*/reactExports.createElement("path", {
    strokeLinecap: "round",
    d: "M7.5 12.5V8"
  }))), _circle$9 || (_circle$9 = /*#__PURE__*/reactExports.createElement("circle", {
    cx: 7.5,
    cy: 5,
    r: 1,
    fill: "currentColor"
  })));
};

/**
* Copyright Zendesk, Inc.
*
* Use of this source code is governed under the Apache License, Version 2.0
* found at http://www.apache.org/licenses/LICENSE-2.0.
*/

const validationIcons = {
  success: SvgCheckCircleStroke$3,
  error: SvgAlertErrorStroke$2,
  warning: SvgAlertWarningStroke$2,
  info: SvgInfoStroke
};
const validationHues = {
  success: 'successHue',
  error: 'dangerHue',
  warning: 'warningHue',
  info: 'neutralHue'
};

/**
* Copyright Zendesk, Inc.
*
* Use of this source code is governed under the Apache License, Version 2.0
* found at http://www.apache.org/licenses/LICENSE-2.0.
*/

const NotificationsContext = reactExports.createContext(undefined);
const useNotificationsContext = () => {
  return reactExports.useContext(NotificationsContext);
};

/**
* Copyright Zendesk, Inc.
*
* Use of this source code is governed under the Apache License, Version 2.0
* found at http://www.apache.org/licenses/LICENSE-2.0.
*/

const Alert = React__default.forwardRef((_ref, ref) => {
  let {
    role,
    ...props
  } = _ref;
  const hue = validationHues[props.type];
  const Icon = validationIcons[props.type];
  return React__default.createElement(NotificationsContext.Provider, {
    value: hue
  }, React__default.createElement(StyledAlert, Object.assign({
    ref: ref,
    hue: hue,
    role: role === undefined ? 'alert' : role
  }, props), React__default.createElement(StyledIcon$3, {
    hue: hue
  }, React__default.createElement(Icon, null)), props.children));
});
Alert.displayName = 'Alert';
Alert.propTypes = {
  type: PropTypes.oneOf(TYPE$1).isRequired
};

/**
* Copyright Zendesk, Inc.
*
* Use of this source code is governed under the Apache License, Version 2.0
* found at http://www.apache.org/licenses/LICENSE-2.0.
*/

const Notification = reactExports.forwardRef((_ref, ref) => {
  let {
    children,
    type,
    ...props
  } = _ref;
  const Icon = type ? validationIcons[type] : SvgInfoStroke;
  const hue = type && validationHues[type];
  return React__default.createElement(StyledNotification, Object.assign({
    ref: ref,
    type: type,
    isFloating: true,
    role: "alert"
  }, props), type && React__default.createElement(StyledIcon$3, {
    hue: hue
  }, React__default.createElement(Icon, null)), children);
});
Notification.displayName = 'Notification';
Notification.propTypes = {
  type: PropTypes.oneOf(TYPE$1)
};

/**
* Copyright Zendesk, Inc.
*
* Use of this source code is governed under the Apache License, Version 2.0
* found at http://www.apache.org/licenses/LICENSE-2.0.
*/

var _path$M;
function _extends$W() { return _extends$W = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$W.apply(null, arguments); }
var SvgXStroke$4 = function SvgXStroke(props) {
  return /*#__PURE__*/reactExports.createElement("svg", _extends$W({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12,
    focusable: "false",
    viewBox: "0 0 12 12",
    "aria-hidden": "true"
  }, props), _path$M || (_path$M = /*#__PURE__*/reactExports.createElement("path", {
    stroke: "currentColor",
    strokeLinecap: "round",
    d: "M3 9l6-6m0 6L3 3"
  })));
};

/**
* Copyright Zendesk, Inc.
*
* Use of this source code is governed under the Apache License, Version 2.0
* found at http://www.apache.org/licenses/LICENSE-2.0.
*/

const Close$3 = React__default.forwardRef((props, ref) => {
  const ariaLabel = useText(Close$3, props, 'aria-label', 'Close');
  const hue = useNotificationsContext();
  return React__default.createElement(StyledClose$2, Object.assign({
    ref: ref,
    hue: hue,
    "aria-label": ariaLabel
  }, props), React__default.createElement(SvgXStroke$4, null));
});
Close$3.displayName = 'Close';

/**
* Copyright Zendesk, Inc.
*
* Use of this source code is governed under the Apache License, Version 2.0
* found at http://www.apache.org/licenses/LICENSE-2.0.
*/

const Title = React__default.forwardRef((props, ref) => React__default.createElement(StyledTitle$1, Object.assign({
  ref: ref
}, props)));
Title.displayName = 'Title';

/**
* Copyright Zendesk, Inc.
*
* Use of this source code is governed under the Apache License, Version 2.0
* found at http://www.apache.org/licenses/LICENSE-2.0.
*/
const getInitialState = () => {
  return {
    toasts: []
  };
};
const toasterReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TOAST':
      {
        return {
          ...state,
          toasts: [...state.toasts, action.payload]
        };
      }
    case 'REMOVE_TOAST':
      {
        const filteredToasts = state.toasts.filter(toast => toast.id !== action.payload);
        return {
          ...state,
          toasts: filteredToasts
        };
      }
    case 'UPDATE_TOAST':
      {
        const updatedToasts = state.toasts.map(toast => {
          if (toast.id !== action.payload.id) {
            return toast;
          }
          const updatedToast = toast;
          const {
            content,
            ...newOptions
          } = action.payload.options;
          if (content) {
            updatedToast.content = content;
          }
          updatedToast.options = {
            ...updatedToast.options,
            ...newOptions
          };
          return updatedToast;
        });
        return {
          ...state,
          toasts: updatedToasts
        };
      }
    case 'REMOVE_ALL_TOASTS':
      {
        return {
          ...state,
          toasts: []
        };
      }
    default:
      throw new Error('Invalid toaster reducer action');
  }
};

/**
* Copyright Zendesk, Inc.
*
* Use of this source code is governed under the Apache License, Version 2.0
* found at http://www.apache.org/licenses/LICENSE-2.0.
*/

const ToastContext = reactExports.createContext(undefined);

function _objectWithoutPropertiesLoose$1(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

/**
 * Checks if a given element has a CSS class.
 * 
 * @param element the element
 * @param className the CSS class name
 */
function hasClass(element, className) {
  if (element.classList) return !!className && element.classList.contains(className);
  return (" " + (element.className.baseVal || element.className) + " ").indexOf(" " + className + " ") !== -1;
}

/**
 * Adds a CSS class to a given element.
 * 
 * @param element the element
 * @param className the CSS class name
 */

function addClass(element, className) {
  if (element.classList) element.classList.add(className);else if (!hasClass(element, className)) if (typeof element.className === 'string') element.className = element.className + " " + className;else element.setAttribute('class', (element.className && element.className.baseVal || '') + " " + className);
}

function replaceClassName(origClass, classToRemove) {
  return origClass.replace(new RegExp("(^|\\s)" + classToRemove + "(?:\\s|$)", 'g'), '$1').replace(/\s+/g, ' ').replace(/^\s*|\s*$/g, '');
}
/**
 * Removes a CSS class from a given element.
 * 
 * @param element the element
 * @param className the CSS class name
 */


function removeClass$1(element, className) {
  if (element.classList) {
    element.classList.remove(className);
  } else if (typeof element.className === 'string') {
    element.className = replaceClassName(element.className, className);
  } else {
    element.setAttribute('class', replaceClassName(element.className && element.className.baseVal || '', className));
  }
}

var config = {
  disabled: false
};

var TransitionGroupContext = React__default.createContext(null);

var forceReflow = function forceReflow(node) {
  return node.scrollTop;
};

var UNMOUNTED = 'unmounted';
var EXITED = 'exited';
var ENTERING = 'entering';
var ENTERED = 'entered';
var EXITING = 'exiting';
/**
 * The Transition component lets you describe a transition from one component
 * state to another _over time_ with a simple declarative API. Most commonly
 * it's used to animate the mounting and unmounting of a component, but can also
 * be used to describe in-place transition states as well.
 *
 * ---
 *
 * **Note**: `Transition` is a platform-agnostic base component. If you're using
 * transitions in CSS, you'll probably want to use
 * [`CSSTransition`](https://reactcommunity.org/react-transition-group/css-transition)
 * instead. It inherits all the features of `Transition`, but contains
 * additional features necessary to play nice with CSS transitions (hence the
 * name of the component).
 *
 * ---
 *
 * By default the `Transition` component does not alter the behavior of the
 * component it renders, it only tracks "enter" and "exit" states for the
 * components. It's up to you to give meaning and effect to those states. For
 * example we can add styles to a component when it enters or exits:
 *
 * ```jsx
 * import { Transition } from 'react-transition-group';
 *
 * const duration = 300;
 *
 * const defaultStyle = {
 *   transition: `opacity ${duration}ms ease-in-out`,
 *   opacity: 0,
 * }
 *
 * const transitionStyles = {
 *   entering: { opacity: 1 },
 *   entered:  { opacity: 1 },
 *   exiting:  { opacity: 0 },
 *   exited:  { opacity: 0 },
 * };
 *
 * const Fade = ({ in: inProp }) => (
 *   <Transition in={inProp} timeout={duration}>
 *     {state => (
 *       <div style={{
 *         ...defaultStyle,
 *         ...transitionStyles[state]
 *       }}>
 *         I'm a fade Transition!
 *       </div>
 *     )}
 *   </Transition>
 * );
 * ```
 *
 * There are 4 main states a Transition can be in:
 *  - `'entering'`
 *  - `'entered'`
 *  - `'exiting'`
 *  - `'exited'`
 *
 * Transition state is toggled via the `in` prop. When `true` the component
 * begins the "Enter" stage. During this stage, the component will shift from
 * its current transition state, to `'entering'` for the duration of the
 * transition and then to the `'entered'` stage once it's complete. Let's take
 * the following example (we'll use the
 * [useState](https://reactjs.org/docs/hooks-reference.html#usestate) hook):
 *
 * ```jsx
 * function App() {
 *   const [inProp, setInProp] = useState(false);
 *   return (
 *     <div>
 *       <Transition in={inProp} timeout={500}>
 *         {state => (
 *           // ...
 *         )}
 *       </Transition>
 *       <button onClick={() => setInProp(true)}>
 *         Click to Enter
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 *
 * When the button is clicked the component will shift to the `'entering'` state
 * and stay there for 500ms (the value of `timeout`) before it finally switches
 * to `'entered'`.
 *
 * When `in` is `false` the same thing happens except the state moves from
 * `'exiting'` to `'exited'`.
 */

var Transition = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Transition, _React$Component);

  function Transition(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;
    var parentGroup = context; // In the context of a TransitionGroup all enters are really appears

    var appear = parentGroup && !parentGroup.isMounting ? props.enter : props.appear;
    var initialStatus;
    _this.appearStatus = null;

    if (props.in) {
      if (appear) {
        initialStatus = EXITED;
        _this.appearStatus = ENTERING;
      } else {
        initialStatus = ENTERED;
      }
    } else {
      if (props.unmountOnExit || props.mountOnEnter) {
        initialStatus = UNMOUNTED;
      } else {
        initialStatus = EXITED;
      }
    }

    _this.state = {
      status: initialStatus
    };
    _this.nextCallback = null;
    return _this;
  }

  Transition.getDerivedStateFromProps = function getDerivedStateFromProps(_ref, prevState) {
    var nextIn = _ref.in;

    if (nextIn && prevState.status === UNMOUNTED) {
      return {
        status: EXITED
      };
    }

    return null;
  } // getSnapshotBeforeUpdate(prevProps) {
  //   let nextStatus = null
  //   if (prevProps !== this.props) {
  //     const { status } = this.state
  //     if (this.props.in) {
  //       if (status !== ENTERING && status !== ENTERED) {
  //         nextStatus = ENTERING
  //       }
  //     } else {
  //       if (status === ENTERING || status === ENTERED) {
  //         nextStatus = EXITING
  //       }
  //     }
  //   }
  //   return { nextStatus }
  // }
  ;

  var _proto = Transition.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.updateStatus(true, this.appearStatus);
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var nextStatus = null;

    if (prevProps !== this.props) {
      var status = this.state.status;

      if (this.props.in) {
        if (status !== ENTERING && status !== ENTERED) {
          nextStatus = ENTERING;
        }
      } else {
        if (status === ENTERING || status === ENTERED) {
          nextStatus = EXITING;
        }
      }
    }

    this.updateStatus(false, nextStatus);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.cancelNextCallback();
  };

  _proto.getTimeouts = function getTimeouts() {
    var timeout = this.props.timeout;
    var exit, enter, appear;
    exit = enter = appear = timeout;

    if (timeout != null && typeof timeout !== 'number') {
      exit = timeout.exit;
      enter = timeout.enter; // TODO: remove fallback for next major

      appear = timeout.appear !== undefined ? timeout.appear : enter;
    }

    return {
      exit: exit,
      enter: enter,
      appear: appear
    };
  };

  _proto.updateStatus = function updateStatus(mounting, nextStatus) {
    if (mounting === void 0) {
      mounting = false;
    }

    if (nextStatus !== null) {
      // nextStatus will always be ENTERING or EXITING.
      this.cancelNextCallback();

      if (nextStatus === ENTERING) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var node = this.props.nodeRef ? this.props.nodeRef.current : ReactDOM.findDOMNode(this); // https://github.com/reactjs/react-transition-group/pull/749
          // With unmountOnExit or mountOnEnter, the enter animation should happen at the transition between `exited` and `entering`.
          // To make the animation happen,  we have to separate each rendering and avoid being processed as batched.

          if (node) forceReflow(node);
        }

        this.performEnter(mounting);
      } else {
        this.performExit();
      }
    } else if (this.props.unmountOnExit && this.state.status === EXITED) {
      this.setState({
        status: UNMOUNTED
      });
    }
  };

  _proto.performEnter = function performEnter(mounting) {
    var _this2 = this;

    var enter = this.props.enter;
    var appearing = this.context ? this.context.isMounting : mounting;

    var _ref2 = this.props.nodeRef ? [appearing] : [ReactDOM.findDOMNode(this), appearing],
        maybeNode = _ref2[0],
        maybeAppearing = _ref2[1];

    var timeouts = this.getTimeouts();
    var enterTimeout = appearing ? timeouts.appear : timeouts.enter; // no enter animation skip right to ENTERED
    // if we are mounting and running this it means appear _must_ be set

    if (!mounting && !enter || config.disabled) {
      this.safeSetState({
        status: ENTERED
      }, function () {
        _this2.props.onEntered(maybeNode);
      });
      return;
    }

    this.props.onEnter(maybeNode, maybeAppearing);
    this.safeSetState({
      status: ENTERING
    }, function () {
      _this2.props.onEntering(maybeNode, maybeAppearing);

      _this2.onTransitionEnd(enterTimeout, function () {
        _this2.safeSetState({
          status: ENTERED
        }, function () {
          _this2.props.onEntered(maybeNode, maybeAppearing);
        });
      });
    });
  };

  _proto.performExit = function performExit() {
    var _this3 = this;

    var exit = this.props.exit;
    var timeouts = this.getTimeouts();
    var maybeNode = this.props.nodeRef ? undefined : ReactDOM.findDOMNode(this); // no exit animation skip right to EXITED

    if (!exit || config.disabled) {
      this.safeSetState({
        status: EXITED
      }, function () {
        _this3.props.onExited(maybeNode);
      });
      return;
    }

    this.props.onExit(maybeNode);
    this.safeSetState({
      status: EXITING
    }, function () {
      _this3.props.onExiting(maybeNode);

      _this3.onTransitionEnd(timeouts.exit, function () {
        _this3.safeSetState({
          status: EXITED
        }, function () {
          _this3.props.onExited(maybeNode);
        });
      });
    });
  };

  _proto.cancelNextCallback = function cancelNextCallback() {
    if (this.nextCallback !== null) {
      this.nextCallback.cancel();
      this.nextCallback = null;
    }
  };

  _proto.safeSetState = function safeSetState(nextState, callback) {
    // This shouldn't be necessary, but there are weird race conditions with
    // setState callbacks and unmounting in testing, so always make sure that
    // we can cancel any pending setState callbacks after we unmount.
    callback = this.setNextCallback(callback);
    this.setState(nextState, callback);
  };

  _proto.setNextCallback = function setNextCallback(callback) {
    var _this4 = this;

    var active = true;

    this.nextCallback = function (event) {
      if (active) {
        active = false;
        _this4.nextCallback = null;
        callback(event);
      }
    };

    this.nextCallback.cancel = function () {
      active = false;
    };

    return this.nextCallback;
  };

  _proto.onTransitionEnd = function onTransitionEnd(timeout, handler) {
    this.setNextCallback(handler);
    var node = this.props.nodeRef ? this.props.nodeRef.current : ReactDOM.findDOMNode(this);
    var doesNotHaveTimeoutOrListener = timeout == null && !this.props.addEndListener;

    if (!node || doesNotHaveTimeoutOrListener) {
      setTimeout(this.nextCallback, 0);
      return;
    }

    if (this.props.addEndListener) {
      var _ref3 = this.props.nodeRef ? [this.nextCallback] : [node, this.nextCallback],
          maybeNode = _ref3[0],
          maybeNextCallback = _ref3[1];

      this.props.addEndListener(maybeNode, maybeNextCallback);
    }

    if (timeout != null) {
      setTimeout(this.nextCallback, timeout);
    }
  };

  _proto.render = function render() {
    var status = this.state.status;

    if (status === UNMOUNTED) {
      return null;
    }

    var _this$props = this.props,
        children = _this$props.children;
        _this$props.in;
        _this$props.mountOnEnter;
        _this$props.unmountOnExit;
        _this$props.appear;
        _this$props.enter;
        _this$props.exit;
        _this$props.timeout;
        _this$props.addEndListener;
        _this$props.onEnter;
        _this$props.onEntering;
        _this$props.onEntered;
        _this$props.onExit;
        _this$props.onExiting;
        _this$props.onExited;
        _this$props.nodeRef;
        var childProps = _objectWithoutPropertiesLoose$1(_this$props, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);

    return (
      /*#__PURE__*/
      // allows for nested Transitions
      React__default.createElement(TransitionGroupContext.Provider, {
        value: null
      }, typeof children === 'function' ? children(status, childProps) : React__default.cloneElement(React__default.Children.only(children), childProps))
    );
  };

  return Transition;
}(React__default.Component);

Transition.contextType = TransitionGroupContext;
Transition.propTypes = {}; // Name the function so it is clearer in the documentation

function noop$2() {}

Transition.defaultProps = {
  in: false,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
  enter: true,
  exit: true,
  onEnter: noop$2,
  onEntering: noop$2,
  onEntered: noop$2,
  onExit: noop$2,
  onExiting: noop$2,
  onExited: noop$2
};
Transition.UNMOUNTED = UNMOUNTED;
Transition.EXITED = EXITED;
Transition.ENTERING = ENTERING;
Transition.ENTERED = ENTERED;
Transition.EXITING = EXITING;
var Transition$1 = Transition;

var _addClass = function addClass$1(node, classes) {
  return node && classes && classes.split(' ').forEach(function (c) {
    return addClass(node, c);
  });
};

var removeClass = function removeClass(node, classes) {
  return node && classes && classes.split(' ').forEach(function (c) {
    return removeClass$1(node, c);
  });
};
/**
 * A transition component inspired by the excellent
 * [ng-animate](https://docs.angularjs.org/api/ngAnimate) library, you should
 * use it if you're using CSS transitions or animations. It's built upon the
 * [`Transition`](https://reactcommunity.org/react-transition-group/transition)
 * component, so it inherits all of its props.
 *
 * `CSSTransition` applies a pair of class names during the `appear`, `enter`,
 * and `exit` states of the transition. The first class is applied and then a
 * second `*-active` class in order to activate the CSS transition. After the
 * transition, matching `*-done` class names are applied to persist the
 * transition state.
 *
 * ```jsx
 * function App() {
 *   const [inProp, setInProp] = useState(false);
 *   return (
 *     <div>
 *       <CSSTransition in={inProp} timeout={200} classNames="my-node">
 *         <div>
 *           {"I'll receive my-node-* classes"}
 *         </div>
 *       </CSSTransition>
 *       <button type="button" onClick={() => setInProp(true)}>
 *         Click to Enter
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 *
 * When the `in` prop is set to `true`, the child component will first receive
 * the class `example-enter`, then the `example-enter-active` will be added in
 * the next tick. `CSSTransition` [forces a
 * reflow](https://github.com/reactjs/react-transition-group/blob/5007303e729a74be66a21c3e2205e4916821524b/src/CSSTransition.js#L208-L215)
 * between before adding the `example-enter-active`. This is an important trick
 * because it allows us to transition between `example-enter` and
 * `example-enter-active` even though they were added immediately one after
 * another. Most notably, this is what makes it possible for us to animate
 * _appearance_.
 *
 * ```css
 * .my-node-enter {
 *   opacity: 0;
 * }
 * .my-node-enter-active {
 *   opacity: 1;
 *   transition: opacity 200ms;
 * }
 * .my-node-exit {
 *   opacity: 1;
 * }
 * .my-node-exit-active {
 *   opacity: 0;
 *   transition: opacity 200ms;
 * }
 * ```
 *
 * `*-active` classes represent which styles you want to animate **to**, so it's
 * important to add `transition` declaration only to them, otherwise transitions
 * might not behave as intended! This might not be obvious when the transitions
 * are symmetrical, i.e. when `*-enter-active` is the same as `*-exit`, like in
 * the example above (minus `transition`), but it becomes apparent in more
 * complex transitions.
 *
 * **Note**: If you're using the
 * [`appear`](http://reactcommunity.org/react-transition-group/transition#Transition-prop-appear)
 * prop, make sure to define styles for `.appear-*` classes as well.
 */


var CSSTransition = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(CSSTransition, _React$Component);

  function CSSTransition() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.appliedClasses = {
      appear: {},
      enter: {},
      exit: {}
    };

    _this.onEnter = function (maybeNode, maybeAppearing) {
      var _this$resolveArgument = _this.resolveArguments(maybeNode, maybeAppearing),
          node = _this$resolveArgument[0],
          appearing = _this$resolveArgument[1];

      _this.removeClasses(node, 'exit');

      _this.addClass(node, appearing ? 'appear' : 'enter', 'base');

      if (_this.props.onEnter) {
        _this.props.onEnter(maybeNode, maybeAppearing);
      }
    };

    _this.onEntering = function (maybeNode, maybeAppearing) {
      var _this$resolveArgument2 = _this.resolveArguments(maybeNode, maybeAppearing),
          node = _this$resolveArgument2[0],
          appearing = _this$resolveArgument2[1];

      var type = appearing ? 'appear' : 'enter';

      _this.addClass(node, type, 'active');

      if (_this.props.onEntering) {
        _this.props.onEntering(maybeNode, maybeAppearing);
      }
    };

    _this.onEntered = function (maybeNode, maybeAppearing) {
      var _this$resolveArgument3 = _this.resolveArguments(maybeNode, maybeAppearing),
          node = _this$resolveArgument3[0],
          appearing = _this$resolveArgument3[1];

      var type = appearing ? 'appear' : 'enter';

      _this.removeClasses(node, type);

      _this.addClass(node, type, 'done');

      if (_this.props.onEntered) {
        _this.props.onEntered(maybeNode, maybeAppearing);
      }
    };

    _this.onExit = function (maybeNode) {
      var _this$resolveArgument4 = _this.resolveArguments(maybeNode),
          node = _this$resolveArgument4[0];

      _this.removeClasses(node, 'appear');

      _this.removeClasses(node, 'enter');

      _this.addClass(node, 'exit', 'base');

      if (_this.props.onExit) {
        _this.props.onExit(maybeNode);
      }
    };

    _this.onExiting = function (maybeNode) {
      var _this$resolveArgument5 = _this.resolveArguments(maybeNode),
          node = _this$resolveArgument5[0];

      _this.addClass(node, 'exit', 'active');

      if (_this.props.onExiting) {
        _this.props.onExiting(maybeNode);
      }
    };

    _this.onExited = function (maybeNode) {
      var _this$resolveArgument6 = _this.resolveArguments(maybeNode),
          node = _this$resolveArgument6[0];

      _this.removeClasses(node, 'exit');

      _this.addClass(node, 'exit', 'done');

      if (_this.props.onExited) {
        _this.props.onExited(maybeNode);
      }
    };

    _this.resolveArguments = function (maybeNode, maybeAppearing) {
      return _this.props.nodeRef ? [_this.props.nodeRef.current, maybeNode] // here `maybeNode` is actually `appearing`
      : [maybeNode, maybeAppearing];
    };

    _this.getClassNames = function (type) {
      var classNames = _this.props.classNames;
      var isStringClassNames = typeof classNames === 'string';
      var prefix = isStringClassNames && classNames ? classNames + "-" : '';
      var baseClassName = isStringClassNames ? "" + prefix + type : classNames[type];
      var activeClassName = isStringClassNames ? baseClassName + "-active" : classNames[type + "Active"];
      var doneClassName = isStringClassNames ? baseClassName + "-done" : classNames[type + "Done"];
      return {
        baseClassName: baseClassName,
        activeClassName: activeClassName,
        doneClassName: doneClassName
      };
    };

    return _this;
  }

  var _proto = CSSTransition.prototype;

  _proto.addClass = function addClass(node, type, phase) {
    var className = this.getClassNames(type)[phase + "ClassName"];

    var _this$getClassNames = this.getClassNames('enter'),
        doneClassName = _this$getClassNames.doneClassName;

    if (type === 'appear' && phase === 'done' && doneClassName) {
      className += " " + doneClassName;
    } // This is to force a repaint,
    // which is necessary in order to transition styles when adding a class name.


    if (phase === 'active') {
      if (node) forceReflow(node);
    }

    if (className) {
      this.appliedClasses[type][phase] = className;

      _addClass(node, className);
    }
  };

  _proto.removeClasses = function removeClasses(node, type) {
    var _this$appliedClasses$ = this.appliedClasses[type],
        baseClassName = _this$appliedClasses$.base,
        activeClassName = _this$appliedClasses$.active,
        doneClassName = _this$appliedClasses$.done;
    this.appliedClasses[type] = {};

    if (baseClassName) {
      removeClass(node, baseClassName);
    }

    if (activeClassName) {
      removeClass(node, activeClassName);
    }

    if (doneClassName) {
      removeClass(node, doneClassName);
    }
  };

  _proto.render = function render() {
    var _this$props = this.props;
        _this$props.classNames;
        var props = _objectWithoutPropertiesLoose$1(_this$props, ["classNames"]);

    return /*#__PURE__*/React__default.createElement(Transition$1, _extends$10({}, props, {
      onEnter: this.onEnter,
      onEntered: this.onEntered,
      onEntering: this.onEntering,
      onExit: this.onExit,
      onExiting: this.onExiting,
      onExited: this.onExited
    }));
  };

  return CSSTransition;
}(React__default.Component);

CSSTransition.defaultProps = {
  classNames: ''
};
CSSTransition.propTypes = {};
var CSSTransition$1 = CSSTransition;

/**
 * Given `this.props.children`, return an object mapping key to child.
 *
 * @param {*} children `this.props.children`
 * @return {object} Mapping of key to child
 */

function getChildMapping(children, mapFn) {
  var mapper = function mapper(child) {
    return mapFn && reactExports.isValidElement(child) ? mapFn(child) : child;
  };

  var result = Object.create(null);
  if (children) reactExports.Children.map(children, function (c) {
    return c;
  }).forEach(function (child) {
    // run the map function here instead so that the key is the computed one
    result[child.key] = mapper(child);
  });
  return result;
}
/**
 * When you're adding or removing children some may be added or removed in the
 * same render pass. We want to show *both* since we want to simultaneously
 * animate elements in and out. This function takes a previous set of keys
 * and a new set of keys and merges them with its best guess of the correct
 * ordering. In the future we may expose some of the utilities in
 * ReactMultiChild to make this easy, but for now React itself does not
 * directly have this concept of the union of prevChildren and nextChildren
 * so we implement it here.
 *
 * @param {object} prev prev children as returned from
 * `ReactTransitionChildMapping.getChildMapping()`.
 * @param {object} next next children as returned from
 * `ReactTransitionChildMapping.getChildMapping()`.
 * @return {object} a key set that contains all keys in `prev` and all keys
 * in `next` in a reasonable order.
 */

function mergeChildMappings(prev, next) {
  prev = prev || {};
  next = next || {};

  function getValueForKey(key) {
    return key in next ? next[key] : prev[key];
  } // For each key of `next`, the list of keys to insert before that key in
  // the combined list


  var nextKeysPending = Object.create(null);
  var pendingKeys = [];

  for (var prevKey in prev) {
    if (prevKey in next) {
      if (pendingKeys.length) {
        nextKeysPending[prevKey] = pendingKeys;
        pendingKeys = [];
      }
    } else {
      pendingKeys.push(prevKey);
    }
  }

  var i;
  var childMapping = {};

  for (var nextKey in next) {
    if (nextKeysPending[nextKey]) {
      for (i = 0; i < nextKeysPending[nextKey].length; i++) {
        var pendingNextKey = nextKeysPending[nextKey][i];
        childMapping[nextKeysPending[nextKey][i]] = getValueForKey(pendingNextKey);
      }
    }

    childMapping[nextKey] = getValueForKey(nextKey);
  } // Finally, add the keys which didn't appear before any key in `next`


  for (i = 0; i < pendingKeys.length; i++) {
    childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
  }

  return childMapping;
}

function getProp(child, prop, props) {
  return props[prop] != null ? props[prop] : child.props[prop];
}

function getInitialChildMapping(props, onExited) {
  return getChildMapping(props.children, function (child) {
    return reactExports.cloneElement(child, {
      onExited: onExited.bind(null, child),
      in: true,
      appear: getProp(child, 'appear', props),
      enter: getProp(child, 'enter', props),
      exit: getProp(child, 'exit', props)
    });
  });
}
function getNextChildMapping(nextProps, prevChildMapping, onExited) {
  var nextChildMapping = getChildMapping(nextProps.children);
  var children = mergeChildMappings(prevChildMapping, nextChildMapping);
  Object.keys(children).forEach(function (key) {
    var child = children[key];
    if (!reactExports.isValidElement(child)) return;
    var hasPrev = (key in prevChildMapping);
    var hasNext = (key in nextChildMapping);
    var prevChild = prevChildMapping[key];
    var isLeaving = reactExports.isValidElement(prevChild) && !prevChild.props.in; // item is new (entering)

    if (hasNext && (!hasPrev || isLeaving)) {
      // console.log('entering', key)
      children[key] = reactExports.cloneElement(child, {
        onExited: onExited.bind(null, child),
        in: true,
        exit: getProp(child, 'exit', nextProps),
        enter: getProp(child, 'enter', nextProps)
      });
    } else if (!hasNext && hasPrev && !isLeaving) {
      // item is old (exiting)
      // console.log('leaving', key)
      children[key] = reactExports.cloneElement(child, {
        in: false
      });
    } else if (hasNext && hasPrev && reactExports.isValidElement(prevChild)) {
      // item hasn't changed transition states
      // copy over the last transition props;
      // console.log('unchanged', key)
      children[key] = reactExports.cloneElement(child, {
        onExited: onExited.bind(null, child),
        in: prevChild.props.in,
        exit: getProp(child, 'exit', nextProps),
        enter: getProp(child, 'enter', nextProps)
      });
    }
  });
  return children;
}

var values = Object.values || function (obj) {
  return Object.keys(obj).map(function (k) {
    return obj[k];
  });
};

var defaultProps$2 = {
  component: 'div',
  childFactory: function childFactory(child) {
    return child;
  }
};
/**
 * The `<TransitionGroup>` component manages a set of transition components
 * (`<Transition>` and `<CSSTransition>`) in a list. Like with the transition
 * components, `<TransitionGroup>` is a state machine for managing the mounting
 * and unmounting of components over time.
 *
 * Consider the example below. As items are removed or added to the TodoList the
 * `in` prop is toggled automatically by the `<TransitionGroup>`.
 *
 * Note that `<TransitionGroup>`  does not define any animation behavior!
 * Exactly _how_ a list item animates is up to the individual transition
 * component. This means you can mix and match animations across different list
 * items.
 */

var TransitionGroup = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(TransitionGroup, _React$Component);

  function TransitionGroup(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;

    var handleExited = _this.handleExited.bind(_assertThisInitialized(_this)); // Initial children should all be entering, dependent on appear


    _this.state = {
      contextValue: {
        isMounting: true
      },
      handleExited: handleExited,
      firstRender: true
    };
    return _this;
  }

  var _proto = TransitionGroup.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.mounted = true;
    this.setState({
      contextValue: {
        isMounting: false
      }
    });
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.mounted = false;
  };

  TransitionGroup.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, _ref) {
    var prevChildMapping = _ref.children,
        handleExited = _ref.handleExited,
        firstRender = _ref.firstRender;
    return {
      children: firstRender ? getInitialChildMapping(nextProps, handleExited) : getNextChildMapping(nextProps, prevChildMapping, handleExited),
      firstRender: false
    };
  } // node is `undefined` when user provided `nodeRef` prop
  ;

  _proto.handleExited = function handleExited(child, node) {
    var currentChildMapping = getChildMapping(this.props.children);
    if (child.key in currentChildMapping) return;

    if (child.props.onExited) {
      child.props.onExited(node);
    }

    if (this.mounted) {
      this.setState(function (state) {
        var children = _extends$10({}, state.children);

        delete children[child.key];
        return {
          children: children
        };
      });
    }
  };

  _proto.render = function render() {
    var _this$props = this.props,
        Component = _this$props.component,
        childFactory = _this$props.childFactory,
        props = _objectWithoutPropertiesLoose$1(_this$props, ["component", "childFactory"]);

    var contextValue = this.state.contextValue;
    var children = values(this.state.children).map(childFactory);
    delete props.appear;
    delete props.enter;
    delete props.exit;

    if (Component === null) {
      return /*#__PURE__*/React__default.createElement(TransitionGroupContext.Provider, {
        value: contextValue
      }, children);
    }

    return /*#__PURE__*/React__default.createElement(TransitionGroupContext.Provider, {
      value: contextValue
    }, /*#__PURE__*/React__default.createElement(Component, props, children));
  };

  return TransitionGroup;
}(React__default.Component);

TransitionGroup.propTypes = {};
TransitionGroup.defaultProps = defaultProps$2;
var TransitionGroup$1 = TransitionGroup;

/**
 * generates a UID factory
 * @internal
 * @example
 * const uid = generateUID();
 * uid(object) = 1;
 * uid(object) = 1;
 * uid(anotherObject) = 2;
 */
var generateUID$1 = function () {
    var counter = 1;
    var map = new WeakMap();
    /**
     * @borrows {uid}
     */
    var uid = function (item, index) {
        if (typeof item === 'number' || typeof item === 'string') {
            return index ? "idx-".concat(index) : "val-".concat(item);
        }
        if (!map.has(item)) {
            map.set(item, counter++);
            return uid(item);
        }
        return 'uid' + map.get(item);
    };
    return uid;
};
/**
 * @name uid
 * returns an UID associated with {item}
 * @param {Object} item - object to generate UID for
 * @param {Number} index, a fallback index
 * @example
 * uid(object) == 1;
 * uid(object) == 1;
 * uid(anotherObject) == 2;
 * uid("not object", 42) == 42
 *
 * @see {@link useUID}
 */
var uid = generateUID$1();

var createSource = function (prefix) {
    if (prefix === void 0) { prefix = ''; }
    return ({
        value: 1,
        prefix: prefix,
        uid: generateUID$1(),
    });
};
var counter = createSource();
var source = reactExports.createContext(createSource());
var getId$1 = function (source) { return source.value++; };
var getPrefix = function (source) { return (source ? source.prefix : ''); };

var generateUID = function (context) {
    var quartz = context || counter;
    var prefix = getPrefix(quartz);
    var id = getId$1(quartz);
    var uid = prefix + id;
    var gen = function (item) { return uid + quartz.uid(item); };
    return { uid: uid, gen: gen };
};
var useUIDState = function () {
    var context = reactExports.useContext(source);
    var uid = reactExports.useState(function () { return generateUID(context); })[0];
    return uid;
};
/**
 * returns an uid generator
 * @see {@link UIDConsumer}
 * @see https://github.com/thearnica/react-uid#hooks-168
 * @example
 * const uid = useUIDSeed();
 * return (
 *  <>
 *    <label for={seed('email')}>Email: </label>
 *    <input id={seed('email')} name="email" />
 *    {data.map(item => <div key={seed(item)}>...</div>
 *  </>
 * )
 */
var useUIDSeed = function () {
    var gen = useUIDState().gen;
    return gen;
};

/**
* Copyright Zendesk, Inc.
*
* Use of this source code is governed under the Apache License, Version 2.0
* found at http://www.apache.org/licenses/LICENSE-2.0.
*/

const DEFAULT_TOAST_OPTIONS = {
  autoDismiss: 5000,
  placement: 'top-end'
};
const useToast = () => {
  const context = reactExports.useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast() must be used within a "ToastProvider"');
  }
  const {
    dispatch,
    state
  } = context;
  const addToast = reactExports.useCallback(function (content) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const mergedOptions = {
      ...DEFAULT_TOAST_OPTIONS,
      ...options
    };
    const newToast = {
      id: mergedOptions.id || uid(content),
      content,
      options: mergedOptions
    };
    dispatch({
      type: 'ADD_TOAST',
      payload: newToast
    });
    return newToast.id;
  }, [dispatch]);
  const removeToast = reactExports.useCallback(id => {
    dispatch({
      type: 'REMOVE_TOAST',
      payload: id
    });
  }, [dispatch]);
  const updateToast = reactExports.useCallback((id, options) => {
    dispatch({
      type: 'UPDATE_TOAST',
      payload: {
        id,
        options
      }
    });
  }, [dispatch]);
  const removeAllToasts = reactExports.useCallback(() => {
    dispatch({
      type: 'REMOVE_ALL_TOASTS'
    });
  }, [dispatch]);
  return {
    addToast,
    removeToast,
    updateToast,
    removeAllToasts,
    toasts: state.toasts
  };
};

/**
* Copyright Zendesk, Inc.
*
* Use of this source code is governed under the Apache License, Version 2.0
* found at http://www.apache.org/licenses/LICENSE-2.0.
*/

const Toast = _ref => {
  let {
    toast,
    pauseTimers
  } = _ref;
  const {
    removeToast
  } = useToast();
  const {
    id
  } = toast;
  const {
    autoDismiss
  } = toast.options;
  const [remainingTime, setRemainingTime] = reactExports.useState(NaN);
  const startTimeRef = reactExports.useRef(Date.now());
  const previousRemainingTimeRef = reactExports.useRef(remainingTime);
  reactExports.useEffect(() => {
    if (typeof autoDismiss === 'number') {
      setRemainingTime(autoDismiss);
    } else {
      setRemainingTime(NaN);
    }
  }, [autoDismiss]);
  reactExports.useEffect(() => {
    if (pauseTimers && !isNaN(remainingTime)) {
      previousRemainingTimeRef.current = remainingTime - (Date.now() - startTimeRef.current);
      setRemainingTime(NaN);
    } else if (!pauseTimers && isNaN(remainingTime) && !isNaN(previousRemainingTimeRef.current)) {
      setRemainingTime(previousRemainingTimeRef.current);
    }
  }, [pauseTimers, remainingTime]);
  reactExports.useEffect(() => {
    let timeout;
    if (!isNaN(remainingTime)) {
      startTimeRef.current = Date.now();
      timeout = setTimeout(() => {
        removeToast(id);
      }, remainingTime);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [id, pauseTimers, remainingTime, removeToast]);
  const close = reactExports.useCallback(() => {
    removeToast(toast.id);
  }, [removeToast, toast.id]);
  return toast.content({
    close
  });
};

/**
* Copyright Zendesk, Inc.
*
* Use of this source code is governed under the Apache License, Version 2.0
* found at http://www.apache.org/licenses/LICENSE-2.0.
*/

const TRANSITION_CLASS = 'garden-toast-transition';
const DEFAULT_DURATION = '400ms';
const StyledFadeInTransition = styled.div.withConfig({
  displayName: "styled__StyledFadeInTransition",
  componentId: "sc-nq0usb-0"
})(["transition:opacity ", " ease-in 300ms;opacity:", ";margin-bottom:", "px;", " &.", "-enter{transform:translateY( ", " );opacity:0;max-height:0;}&.", "-enter-active{transform:translateY(0);transition:opacity ", " ease-in,transform ", " cubic-bezier(0.15,0.85,0.35,1.2),max-height ", ";opacity:1;max-height:500px;}&.", "-exit{opacity:1;max-height:500px;}&.", "-exit-active{transition:opacity 550ms ease-out,max-height ", " linear 150ms;opacity:0;max-height:0;}"], DEFAULT_DURATION, p => p.isHidden ? '0 !important' : 1, p => p.theme.space.base * 2, p => p.isHidden && hideVisually(), TRANSITION_CLASS, props => {
  if (props.placement === 'bottom-start' || props.placement === 'bottom' || props.placement === 'bottom-end') {
    return '100px';
  }
  return '-100px';
}, TRANSITION_CLASS, DEFAULT_DURATION, DEFAULT_DURATION, DEFAULT_DURATION, TRANSITION_CLASS, TRANSITION_CLASS, DEFAULT_DURATION);
StyledFadeInTransition.defaultProps = {
  theme: DEFAULT_THEME
};
const placementStyles = props => {
  const verticalDistance = `${props.theme.space.base * 16}px`;
  const horizontalDistance = `${props.theme.space.base * 3}px`;
  const topLeftStyles = Ne(["top:", ";left:", ";"], verticalDistance, horizontalDistance);
  const topStyles = Ne(["top:", ";left:50%;transform:translate(-50%,0);"], verticalDistance);
  const topRightStyles = Ne(["top:", ";right:", ";"], verticalDistance, horizontalDistance);
  const bottomLeftStyles = Ne(["bottom:", ";left:", ";"], verticalDistance, horizontalDistance);
  const bottomStyles = Ne(["bottom:", ";left:50%;transform:translate(-50%,0);"], verticalDistance);
  const bottomRightStyles = Ne(["right:", ";bottom:", ";"], horizontalDistance, verticalDistance);
  switch (props.toastPlacement) {
    case 'top-start':
      if (props.theme.rtl) {
        return topRightStyles;
      }
      return topLeftStyles;
    case 'top':
      return topStyles;
    case 'top-end':
      if (props.theme.rtl) {
        return topLeftStyles;
      }
      return topRightStyles;
    case 'bottom-start':
      if (props.theme.rtl) {
        return bottomRightStyles;
      }
      return bottomLeftStyles;
    case 'bottom':
      return bottomStyles;
    case 'bottom-end':
      if (props.theme.rtl) {
        return bottomLeftStyles;
      }
      return bottomRightStyles;
    default:
      return '';
  }
};
const StyledTransitionContainer = styled.div.withConfig({
  displayName: "styled__StyledTransitionContainer",
  componentId: "sc-nq0usb-1"
})(["position:fixed;z-index:", ";", ";"], props => props.toastZIndex, placementStyles);
StyledTransitionContainer.defaultProps = {
  theme: DEFAULT_THEME
};

/**
* Copyright Zendesk, Inc.
*
* Use of this source code is governed under the Apache License, Version 2.0
* found at http://www.apache.org/licenses/LICENSE-2.0.
*/

const ToastSlot = _ref => {
  let {
    toasts,
    placement,
    zIndex,
    limit,
    ...props
  } = _ref;
  const [pauseTimers, setPauseTimers] = reactExports.useState(false);
  const theme = reactExports.useContext(Be);
  const environment = useDocument(theme);
  const handleVisibilityChange = reactExports.useCallback(e => {
    if (e.target.visibilityState === 'visible') {
      setPauseTimers(false);
    } else {
      setPauseTimers(true);
    }
  }, []);
  reactExports.useEffect(() => {
    if (environment) {
      environment.addEventListener('visibilitychange', handleVisibilityChange);
    }
    return () => {
      if (environment) {
        environment.removeEventListener('visibilitychange', handleVisibilityChange);
      }
    };
  }, [environment, handleVisibilityChange]);
  const handleMouseEnter = reactExports.useCallback(() => {
    setPauseTimers(true);
  }, []);
  const handleMouseLeave = reactExports.useCallback(() => {
    setPauseTimers(false);
  }, []);
  const isHidden = reactExports.useCallback(index => {
    if (placement === 'bottom' || placement === 'bottom-start' || placement === 'bottom-end') {
      return index < toasts.length - limit;
    }
    return index >= limit;
  }, [limit, placement, toasts.length]);
  return React__default.createElement(StyledTransitionContainer, Object.assign({
    key: placement,
    toastPlacement: placement,
    toastZIndex: zIndex,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave
  }, props), React__default.createElement(TransitionGroup$1, null, toasts.map((toast, index) => {
    const transitionRef = React__default.createRef();
    return React__default.createElement(CSSTransition$1, {
      key: toast.id,
      timeout: {
        enter: 400,
        exit: 550
      },
      unmountOnExit: true,
      classNames: TRANSITION_CLASS,
      nodeRef: transitionRef
    }, React__default.createElement(StyledFadeInTransition, {
      ref: transitionRef,
      placement: placement,
      isHidden: isHidden(index)
    }, React__default.createElement(Toast, {
      toast: toast,
      pauseTimers: pauseTimers || isHidden(index)
    })));
  })));
};

/**
* Copyright Zendesk, Inc.
*
* Use of this source code is governed under the Apache License, Version 2.0
* found at http://www.apache.org/licenses/LICENSE-2.0.
*/

const ToastProvider = _ref => {
  let {
    limit,
    zIndex,
    placementProps = {},
    children
  } = _ref;
  const [state, dispatch] = reactExports.useReducer(toasterReducer, getInitialState());
  const contextValue = reactExports.useMemo(() => ({
    state,
    dispatch
  }), [state, dispatch]);
  const toastsByPlacement = reactExports.useCallback(placement => {
    let matchingToasts = state.toasts.filter(toast => toast.options.placement === placement);
    if (placement === 'bottom' || placement === 'bottom-start' || placement === 'bottom-end') {
      matchingToasts = matchingToasts.reverse();
    }
    return React__default.createElement(ToastSlot, Object.assign({
      placement: placement,
      toasts: matchingToasts,
      zIndex: zIndex,
      limit: limit
    }, placementProps[placement]));
  }, [limit, state.toasts, zIndex, placementProps]);
  return React__default.createElement(ToastContext.Provider, {
    value: contextValue
  }, toastsByPlacement('top-start'), toastsByPlacement('top'), toastsByPlacement('top-end'), children, toastsByPlacement('bottom-start'), toastsByPlacement('bottom'), toastsByPlacement('bottom-end'));
};
ToastProvider.displayName = 'ToastProvider';
ToastProvider.defaultProps = {
  limit: 4
};
ToastProvider.propTypes = {
  limit: PropTypes.number,
  zIndex: PropTypes.number,
  placementProps: PropTypes.object
};

const ModalContainerContext = reactExports.createContext(null);

// z-index needs to be higher than the z-index of the navbar,
const ModalContainer = styled.div `
  z-index: 2147483647;
  position: fixed;
`;function Ai({children:e}){const[t,n]=p.useState();return v.jsxs(v.Fragment,{children:[v.jsx(ji,{ref:e=>{n(e)}}),t&&v.jsx(Ni.Provider,{value:t,children:e})]})}function Ri({theme:e,children:t}){return v.jsx(Gn,{theme:e,children:v.jsx(Ti,{zIndex:2147483647,children:v.jsx(Ai,{children:t})})})}function Li(){const e=p.useContext(Ni);if(null===e)throw new Error("useModalContainer should be used inside a ModalContainerProvider");return e}const Mi=["small","medium","large"],Di="typography.font",zi={small:"sm",medium:"md",large:"lg",extralarge:"xl","2xlarge":"xxl","3xlarge":"xxxl"},Fi=kn.div.attrs({"data-garden-id":Di,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledFont",componentId:"sc-1iildbo-0"})(["",";&[hidden]{display:inline;",";}",";"],(e=>!e.hidden&&(e=>{const t=e.isMonospace&&-1!==["inherit","small","medium","large"].indexOf(e.size),n=t&&e.theme.fonts.mono,r=e.theme.rtl?"rtl":"ltr";let o,a,i,s;if(t)if("inherit"===e.size)o="calc(1em - 1px)",i="normal";else{const t=zi[e.size];o=ur(`${e.theme.fontSizes[t]} - 1px`),i=ur(`${e.theme.lineHeights[t]} - 1px`)}else if("inherit"!==e.size){const t=zi[e.size];o=e.theme.fontSizes[t],i=e.theme.lineHeights[t]}if(!0===e.isBold?a=e.theme.fontWeights.semibold:!1!==e.isBold&&"inherit"===e.size||(a=e.theme.fontWeights.regular),e.hue){const t="yellow"===e.hue?700:600;s=No(e.hue,t,e.theme)}return tn(["line-height:",";color:",";font-family:",";font-size:",";font-weight:",";direction:",";"],i,s,n,o,a,r)})(e)),{border:"0",clip:"rect(0 0 0 0)",height:"1px",margin:"-1px",overflow:"hidden",padding:"0",position:"absolute",whiteSpace:"nowrap",width:"1px"},(e=>Kn(Di,e)));Fi.defaultProps={theme:Wn,size:"inherit"};const Hi="typography.icon",$i=kn((e=>{let{children:t,isStart:n,...r}=e;return f.cloneElement(p.Children.only(t),r)})).attrs({"data-garden-id":Hi,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledIcon",componentId:"sc-10rfb5b-0"})(["position:relative;top:-1px;vertical-align:middle;",";",";"],(e=>(e=>{const t=e.isStart&&2*e.theme.space.base+"px",n=e.theme.iconSizes.md;return tn(["margin-",":",";width:",";height:",";"],e.theme.rtl?"left":"right",t,n,n)})(e)),(e=>Kn(Hi,e)));$i.defaultProps={theme:Wn};const Bi="typography.paragraph",Vi=kn.p.attrs({"data-garden-id":Bi,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledParagraph",componentId:"sc-zkuftz-0"})(["margin:0;padding:0;direction:",";& + &,blockquote + &{margin-top:",";}",";"],(e=>e.theme.rtl?"rtl":"ltr"),(e=>e.theme.lineHeights[zi[e.size]]),(e=>Kn(Bi,e)));Vi.defaultProps={theme:Wn};const Ui=p.forwardRef(((e,t)=>{let{tag:n,...r}=e;return f.createElement(Fi,Object.assign({as:n,ref:t,size:"medium"},r))}));Ui.displayName="MD",Ui.propTypes={tag:Cn.any,isBold:Cn.bool,isMonospace:Cn.bool},Ui.defaultProps={tag:"div"};const Wi=p.forwardRef(((e,t)=>{let{tag:n,...r}=e;return f.createElement(Fi,Object.assign({as:n,ref:t,size:"large"},r))}));Wi.displayName="LG",Wi.propTypes={tag:Cn.any,isBold:Cn.bool,isMonospace:Cn.bool},Wi.defaultProps={tag:"div"};const qi=p.forwardRef(((e,t)=>{let{tag:n,...r}=e;return f.createElement(Fi,Object.assign({as:n,ref:t,size:"3xlarge"},r))}));qi.displayName="XXXL",qi.propTypes={tag:Cn.any,isBold:Cn.bool},qi.defaultProps={tag:"div"};var Gi=NaN,Ki="[object Symbol]",Yi=/^\s+|\s+$/g,Xi=/^[-+]0x[0-9a-f]+$/i,Qi=/^0b[01]+$/i,Ji=/^0o[0-7]+$/i,Zi=parseInt,es="object"==typeof t&&t&&t.Object===Object&&t,ts="object"==typeof self&&self&&self.Object===Object&&self,ns=es||ts||Function("return this")(),rs=Object.prototype.toString,os=Math.max,as=Math.min,is=function(){return ns.Date.now()};function ss(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function ls(e){if("number"==typeof e)return e;if(function(e){return"symbol"==typeof e||function(e){return!!e&&"object"==typeof e}(e)&&rs.call(e)==Ki}(e))return Gi;if(ss(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=ss(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(Yi,"");var n=Qi.test(e);return n||Ji.test(e)?Zi(e.slice(2),n?2:8):Xi.test(e)?Gi:+e}var cs=function(e,t,n){var r,o,a,i,s,l,c=0,u=!1,d=!1,p=!0;if("function"!=typeof e)throw new TypeError("Expected a function");function f(t){var n=r,a=o;return r=o=void 0,c=t,i=e.apply(a,n)}function m(e){var n=e-l;return void 0===l||n>=t||n<0||d&&e-c>=a}function h(){var e=is();if(m(e))return g(e);s=setTimeout(h,function(e){var n=t-(e-l);return d?as(n,a-(e-c)):n}(e))}function g(e){return s=void 0,p&&r?f(e):(r=o=void 0,i)}function b(){var e=is(),n=m(e);if(r=arguments,o=this,l=e,n){if(void 0===s)return function(e){return c=e,s=setTimeout(h,t),u?f(e):i}(l);if(d)return s=setTimeout(h,t),f(l)}return void 0===s&&(s=setTimeout(h,t)),i}return t=ls(t)||0,ss(n)&&(u=!!n.leading,a=(d="maxWait"in n)?os(ls(n.maxWait)||0,t):a,p="trailing"in n?!!n.trailing:p),b.cancel=function(){void 0!==s&&clearTimeout(s),c=0,r=l=o=s=void 0},b.flush=function(){return void 0===s?i:g(is())},b},us=n(cs);const ds=p.forwardRef(((e,t)=>f.createElement(Vi,Object.assign({ref:t},e))));ds.displayName="Paragraph",ds.propTypes={size:Cn.oneOf(Mi)},ds.defaultProps={size:"medium"};const ps=e=>f.createElement($i,Object.assign({isStart:!0},e));ps.displayName="Span.StartIcon";const fs=ps,ms=e=>f.createElement($i,e);ms.displayName="Span.Icon";const hs=ms,gs=p.forwardRef(((e,t)=>{let{tag:n,...r}=e;return f.createElement(Fi,Object.assign({as:n,ref:t,size:"inherit"},r))}));gs.displayName="Span",gs.propTypes={tag:Cn.any,isBold:Cn.bool,isMonospace:Cn.bool,hue:Cn.string},gs.defaultProps={tag:"span"};const bs=gs;bs.Icon=hs,bs.StartIcon=fs;const vs=kn.div`
  padding: ${e=>e.theme.space.xl} 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${e=>e.theme.space.md};
`,ys=kn.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${e=>e.theme.space.xxs};
`,ws=({helpCenterPath:e})=>{const{t:t}=_e();return v.jsxs(vs,{children:[v.jsxs(ys,{children:[v.jsx(Wi,{children:t("cph-theme-error-boundary.title","Something went wrong.")}),v.jsx(Ui,{children:t("cph-theme-error-boundary.message","Give it a moment and try again later")})]}),e&&v.jsx(xa,{isPrimary:!0,onClick:()=>{e&&(window.location.href=e)},children:t("cph-theme-error-boundary.go-to-homepage","Go to the homepage")})]})};class xs extends p.Component{constructor(e){super(e),this.state={error:null}}static getDerivedStateFromError(e){return{error:e}}render(){return this.state.error?this.props.fallback||v.jsx(ws,{helpCenterPath:this.props.helpCenterPath}):this.props.children}}let ks=0;const Es=e=>{let{idPrefix:t,hasHint:n,hasMessage:r}=e;const o=(e=>An(e)||"id:"+ks++)(t),a=`${o}--input`,i=`${o}--label`,s=`${o}--hint`,l=`${o}--message`,c=p.useCallback((function(e){let{id:t=i,htmlFor:n=a,...r}=void 0===e?{}:e;return{"data-garden-container-id":"containers.field.label","data-garden-container-version":"3.0.15",id:t,htmlFor:n,...r}}),[i,a]),u=p.useCallback((function(e){let{id:t=s,...n}=void 0===e?{}:e;return{"data-garden-container-id":"containers.field.hint","data-garden-container-version":"3.0.15",id:t,...n}}),[s]),d=p.useCallback((function(e){let{id:t=a,"aria-describedby":o,...c}=void 0===e?{}:e;return{"data-garden-container-id":"containers.field.input","data-garden-container-version":"3.0.15",id:t,"aria-labelledby":i,"aria-describedby":(()=>{if(o)return o;const e=[];return n&&e.push(s),r&&e.push(l),e.length>0?e.join(" "):void 0})(),...c}}),[a,i,s,l,n,r]),f=p.useCallback((function(e){let{id:t=l,role:n="alert",...r}=void 0===e?{}:e;return{"data-garden-container-id":"containers.field.message","data-garden-container-version":"3.0.15",role:null===n?void 0:n,id:t,...r}}),[l]);return p.useMemo((()=>({getLabelProps:c,getHintProps:u,getInputProps:d,getMessageProps:f})),[c,u,d,f])};function Ss(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(e){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return t.some((t=>(t&&t(e,...r),e&&e.defaultPrevented)))}}Cn.func,Cn.func,Cn.string,Cn.bool,Cn.bool;const Cs="Backspace",Os="Delete",Ps="ArrowDown",Is="End",_s="Enter",Ts="Escape",Ns="Home",js="PageDown",As="PageUp",Rs=" ",Ls="ArrowUp";let Ms=0;let Ds=e=>"object"==typeof e&&null!=e&&1===e.nodeType,zs=(e,t)=>(!t||"hidden"!==e)&&"visible"!==e&&"clip"!==e,Fs=(e,t)=>{if(e.clientHeight<e.scrollHeight||e.clientWidth<e.scrollWidth){let n=getComputedStyle(e,null);return zs(n.overflowY,t)||zs(n.overflowX,t)||(e=>{let t=(e=>{if(!e.ownerDocument||!e.ownerDocument.defaultView)return null;try{return e.ownerDocument.defaultView.frameElement}catch(e){return null}})(e);return!!t&&(t.clientHeight<e.scrollHeight||t.clientWidth<e.scrollWidth)})(e)}return!1},Hs=(e,t,n,r,o,a,i,s)=>a<e&&i>t||a>e&&i<t?0:a<=e&&s<=n||i>=t&&s>=n?a-e-r:i>t&&s<n||a<e&&s>n?i-t+o:0,$s=e=>{let t=e.parentElement;return null==t?e.getRootNode().host||null:t};var Bs=function(){return Bs=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},Bs.apply(this,arguments)};function Vs(e,t,n,r){return new(n||(n=Promise))((function(o,a){function i(e){try{l(r.next(e))}catch(e){a(e)}}function s(e){try{l(r.throw(e))}catch(e){a(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,s)}l((r=r.apply(e,t||[])).next())}))}function Us(e,t){var n,r,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function s(s){return function(l){return function(s){if(n)throw new TypeError("Generator is already executing.");for(;a&&(a=0,s[0]&&(i=0)),i;)try{if(n=1,r&&(o=2&s[0]?r.return:s[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,s[1])).done)return o;switch(r=0,o&&(s=[2&s[0],o.value]),s[0]){case 0:case 1:o=s;break;case 4:return i.label++,{value:s[1],done:!1};case 5:i.label++,r=s[1],s=[0];continue;case 7:s=i.ops.pop(),i.trys.pop();continue;default:if(!(o=i.trys,(o=o.length>0&&o[o.length-1])||6!==s[0]&&2!==s[0])){i=0;continue}if(3===s[0]&&(!o||s[1]>o[0]&&s[1]<o[3])){i.label=s[1];break}if(6===s[0]&&i.label<o[1]){i.label=o[1],o=s;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(s);break}o[2]&&i.ops.pop(),i.trys.pop();continue}s=t.call(e,i)}catch(e){s=[6,e],r=0}finally{n=o=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,l])}}}function Ws(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,a=n.call(e),i=[];try{for(;(void 0===t||t-- >0)&&!(r=a.next()).done;)i.push(r.value)}catch(e){o={error:e}}finally{try{r&&!r.done&&(n=a.return)&&n.call(a)}finally{if(o)throw o.error}}return i}function qs(e,t,n){if(n||2===arguments.length)for(var r,o=0,a=t.length;o<a;o++)!r&&o in t||(r||(r=Array.prototype.slice.call(t,0,o)),r[o]=t[o]);return e.concat(r||Array.prototype.slice.call(t))}"function"==typeof SuppressedError&&SuppressedError;var Gs=0;function Ks(){}function Ys(e,t,n){return e===t||t instanceof n.Node&&e.contains&&e.contains(t)}function Xs(e,t){var n;function r(){n&&clearTimeout(n)}function o(){for(var o=arguments.length,a=new Array(o),i=0;i<o;i++)a[i]=arguments[i];r(),n=setTimeout((function(){n=null,e.apply(void 0,a)}),t)}return o.cancel=r,o}function Qs(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(e){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return t.some((function(t){return t&&t.apply(void 0,[e].concat(r)),e.preventDownshiftDefault||e.hasOwnProperty("nativeEvent")&&e.nativeEvent.preventDownshiftDefault}))}}function Js(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(e){t.forEach((function(t){"function"==typeof t?t(e):t&&(t.current=e)}))}}function Zs(e,t){return Object.keys(e).reduce((function(n,r){return n[r]=el(t,r)?t[r]:e[r],n}),{})}function el(e,t){return void 0!==e[t]}function tl(e,t,n,r,o){void 0===o&&(o=!1);var a=n.length;if(0===a)return-1;var i=a-1;("number"!=typeof e||e<0||e>i)&&(e=t>0?-1:i+1);var s=e+t;s<0?s=o?i:0:s>i&&(s=o?0:i);var l=nl(s,t<0,n,r,o);return-1===l?e>=a?-1:e:l}function nl(e,t,n,r,o){void 0===o&&(o=!1);var a=n.length;if(t){for(var i=e;i>=0;i--)if(!r(n[i],i))return i}else for(var s=e;s<a;s++)if(!r(n[s],s))return s;return o?nl(t?a-1:0,t,n,r):-1}function rl(e,t,n,r){return void 0===r&&(r=!0),t.some((function(t){return t&&(Ys(t,e,n)||r&&Ys(t,n.document.activeElement,n))}))}var ol=Xs((function(e){al(e).textContent=""}),500);function al(e){void 0===e&&(e=document);var t=e.getElementById("a11y-status-message");return t||((t=e.createElement("div")).setAttribute("id","a11y-status-message"),t.setAttribute("role","status"),t.setAttribute("aria-live","polite"),t.setAttribute("aria-relevant","additions text"),Object.assign(t.style,{border:"0",clip:"rect(0 0 0 0)",height:"1px",margin:"-1px",overflow:"hidden",padding:"0",position:"absolute",width:"1px"}),e.body.appendChild(t),t)}var il=["isInitialMount","highlightedIndex","items","environment"],sl={highlightedIndex:-1,isOpen:!1,selectedItem:null,inputValue:""};function ll(e,t,n){var r=e.props,o=e.type,a={};Object.keys(t).forEach((function(r){!function(e,t,n,r){var o=t.props,a=t.type,i="on"+pl(e)+"Change";o[i]&&void 0!==r[e]&&r[e]!==n[e]&&o[i](Yn({type:a},r))}(r,e,t,n),n[r]!==t[r]&&(a[r]=n[r])})),r.onStateChange&&Object.keys(a).length&&r.onStateChange(Yn({type:o},a))}var cl=Xs((function(e,t){var n,r,o;n=e(),o=al(r=t),n&&(o.textContent=n,ol(r))}),200),ul="undefined"!=typeof window&&void 0!==window.document&&void 0!==window.document.createElement?p.useLayoutEffect:p.useEffect,dl="useId"in f?function(e){var t=e.id,n=e.labelId,r=e.menuId,o=e.getItemId,a=e.toggleButtonId,i=e.inputId,s="downshift-"+f.useId();t||(t=s);var l=p.useRef({labelId:n||t+"-label",menuId:r||t+"-menu",getItemId:o||function(e){return t+"-item-"+e},toggleButtonId:a||t+"-toggle-button",inputId:i||t+"-input"});return l.current}:function(e){var t=e.id,n=void 0===t?"downshift-"+String(Gs++):t,r=e.labelId,o=e.menuId,a=e.getItemId,i=e.toggleButtonId,s=e.inputId,l=p.useRef({labelId:r||n+"-label",menuId:o||n+"-menu",getItemId:a||function(e){return n+"-item-"+e},toggleButtonId:i||n+"-toggle-button",inputId:s||n+"-input"});return l.current};function pl(e){return""+e.slice(0,1).toUpperCase()+e.slice(1)}function fl(e){var t=p.useRef(e);return t.current=e,t}var ml={itemToString:function(e){return e?String(e):""},stateReducer:function(e,t){return t.changes},getA11ySelectionMessage:function(e){var t=e.selectedItem,n=e.itemToString;return t?n(t)+" has been selected.":""},scrollIntoView:function(e,t){if(e){var n=((e,t)=>{var n,r,o,a,i,s;if("undefined"==typeof document)return[];let{scrollMode:l,block:c,inline:u,boundary:d,skipOverflowHiddenElements:p}=t,f="function"==typeof d?d:e=>e!==d;if(!Ds(e))throw new TypeError("Invalid target");let m=document.scrollingElement||document.documentElement,h=[],g=e;for(;Ds(g)&&f(g);){if(g=$s(g),g===m){h.push(g);break}null!=g&&g===document.body&&Fs(g)&&!Fs(document.documentElement)||null!=g&&Fs(g,p)&&h.push(g)}let b=null!=(r=null==(n=window.visualViewport)?void 0:n.width)?r:innerWidth,v=null!=(a=null==(o=window.visualViewport)?void 0:o.height)?a:innerHeight,y=null!=(i=window.scrollX)?i:pageXOffset,w=null!=(s=window.scrollY)?s:pageYOffset,{height:x,width:k,top:E,right:S,bottom:C,left:O}=e.getBoundingClientRect(),P="start"===c||"nearest"===c?E:"end"===c?C:E+x/2,I="center"===u?O+k/2:"end"===u?S:O,_=[];for(let e=0;e<h.length;e++){let t=h[e],{height:n,width:r,top:o,right:a,bottom:i,left:s}=t.getBoundingClientRect();if("if-needed"===l&&E>=0&&O>=0&&C<=v&&S<=b&&E>=o&&C<=i&&O>=s&&S<=a)return _;let d=getComputedStyle(t),p=parseInt(d.borderLeftWidth,10),f=parseInt(d.borderTopWidth,10),g=parseInt(d.borderRightWidth,10),T=parseInt(d.borderBottomWidth,10),N=0,j=0,A="offsetWidth"in t?t.offsetWidth-t.clientWidth-p-g:0,R="offsetHeight"in t?t.offsetHeight-t.clientHeight-f-T:0,L="offsetWidth"in t?0===t.offsetWidth?0:r/t.offsetWidth:0,M="offsetHeight"in t?0===t.offsetHeight?0:n/t.offsetHeight:0;if(m===t)N="start"===c?P:"end"===c?P-v:"nearest"===c?Hs(w,w+v,v,f,T,w+P,w+P+x,x):P-v/2,j="start"===u?I:"center"===u?I-b/2:"end"===u?I-b:Hs(y,y+b,b,p,g,y+I,y+I+k,k),N=Math.max(0,N+w),j=Math.max(0,j+y);else{N="start"===c?P-o-f:"end"===c?P-i+T+R:"nearest"===c?Hs(o,i,n,f,T+R,P,P+x,x):P-(o+n/2)+R/2,j="start"===u?I-s-p:"center"===u?I-(s+r/2)+A/2:"end"===u?I-a+g+A:Hs(s,a,r,p,g+A,I,I+k,k);let{scrollLeft:e,scrollTop:l}=t;N=Math.max(0,Math.min(l+N/M,t.scrollHeight-n/M+R)),j=Math.max(0,Math.min(e+j/L,t.scrollWidth-r/L+A)),P+=l-N,I+=e-j}_.push({el:t,top:N,left:j})}return _})(e,{boundary:t,block:"nearest",scrollMode:"if-needed"});n.forEach((function(e){var t=e.el,n=e.top,r=e.left;t.scrollTop=n,t.scrollLeft=r}))}},environment:"undefined"==typeof window?{}:window};function hl(e,t,n){void 0===n&&(n=sl);var r=e["default"+pl(t)];return void 0!==r?r:n[t]}function gl(e,t,n){void 0===n&&(n=sl);var r=e[t];if(void 0!==r)return r;var o=e["initial"+pl(t)];return void 0!==o?o:hl(e,t,n)}function bl(e,t,n){var r=e.items,o=e.initialHighlightedIndex,a=e.defaultHighlightedIndex,i=t.selectedItem,s=t.highlightedIndex;return 0===r.length?-1:void 0!==o&&s===o?o:void 0!==a?a:i?r.indexOf(i):0===n?-1:n<0?r.length-1:0}function vl(e,t,n){var r=n.isInitialMount,o=n.highlightedIndex,a=n.items,i=n.environment,s=Ga(n,il);p.useEffect((function(){r||cl((function(){return e(Yn({highlightedIndex:o,highlightedItem:a[o],resultCount:a.length},s))}),i.document)}),t)}var yl=Ks;function wl(e,t,n){var r;return void 0===n&&(n=!0),Yn({isOpen:!1,highlightedIndex:-1},(null==(r=e.items)?void 0:r.length)&&t>=0&&Yn({selectedItem:e.items[t],isOpen:hl(e,"isOpen"),highlightedIndex:hl(e,"highlightedIndex")},n&&{inputValue:e.itemToString(e.items[t])}))}var xl={environment:Cn.shape({addEventListener:Cn.func.isRequired,removeEventListener:Cn.func.isRequired,document:Cn.shape({createElement:Cn.func.isRequired,getElementById:Cn.func.isRequired,activeElement:Cn.any.isRequired,body:Cn.any.isRequired}).isRequired,Node:Cn.func.isRequired}),itemToString:Cn.func,stateReducer:Cn.func},kl=Yn({},xl,{getA11yStatusMessage:Cn.func,highlightedIndex:Cn.number,defaultHighlightedIndex:Cn.number,initialHighlightedIndex:Cn.number,isOpen:Cn.bool,defaultIsOpen:Cn.bool,initialIsOpen:Cn.bool,selectedItem:Cn.any,initialSelectedItem:Cn.any,defaultSelectedItem:Cn.any,id:Cn.string,labelId:Cn.string,menuId:Cn.string,getItemId:Cn.func,toggleButtonId:Cn.string,onSelectedItemChange:Cn.func,onHighlightedIndexChange:Cn.func,onStateChange:Cn.func,onIsOpenChange:Cn.func,scrollIntoView:Cn.func});Bs(Bs({},kl),{items:Cn.array.isRequired,isItemDisabled:Cn.func,getA11ySelectionMessage:Cn.func}),Bs(Bs({},ml),{getA11yStatusMessage:function(e){var t=e.isOpen,n=e.resultCount,r=e.previousResultCount;return t?n?n!==r?"".concat(n," result").concat(1===n?" is":"s are"," available, use up and down arrow keys to navigate. Press Enter or Space Bar keys to select."):"":"No results are available.":""},isItemDisabled:function(){return!1}});var El=0,Sl=1,Cl=2,Ol=3,Pl=4,Il=5,_l=6,Tl=7,Nl=8,jl=9,Al=10,Rl=13,Ll=19,Ml=22,Dl=Object.freeze({__proto__:null,InputKeyDownArrowDown:El,InputKeyDownArrowUp:Sl,InputKeyDownEscape:Cl,InputKeyDownHome:Ol,InputKeyDownEnd:Pl,InputKeyDownPageUp:Il,InputKeyDownPageDown:_l,InputKeyDownEnter:Tl,InputChange:Nl,InputBlur:jl,InputClick:Al,MenuMouseLeave:11,ItemMouseMove:12,ItemClick:Rl,ToggleButtonClick:14,FunctionToggleMenu:15,FunctionOpenMenu:16,FunctionCloseMenu:17,FunctionSetHighlightedIndex:18,FunctionSelectItem:Ll,FunctionSetInputValue:20,FunctionReset:21,ControlledPropUpdatedSelectedItem:Ml});function zl(e){var t=function(e){var t=gl(e,"selectedItem"),n=gl(e,"isOpen"),r=gl(e,"highlightedIndex"),o=gl(e,"inputValue");return{highlightedIndex:r<0&&t&&n?e.items.indexOf(t):r,isOpen:n,selectedItem:t,inputValue:o}}(e),n=t.selectedItem,r=t.inputValue;return""===r&&n&&void 0===e.defaultInputValue&&void 0===e.initialInputValue&&void 0===e.inputValue&&(r=e.itemToString(n)),Yn({},t,{inputValue:r})}function Fl(e,t,n){var r=p.useRef(),o=function(e,t,n){var r=p.useRef(),o=p.useRef(),a=p.useCallback((function(t,n){o.current=n,t=Zs(t,n.props);var r=e(t,n);return n.props.stateReducer(t,Yn({},n,{changes:r}))}),[e]),i=p.useReducer(a,t),s=i[0],l=i[1],c=fl(n),u=p.useCallback((function(e){return l(Yn({props:c.current},e))}),[c]),d=o.current;return p.useEffect((function(){d&&r.current&&r.current!==s&&ll(d,Zs(r.current,d.props),s),r.current=s}),[s,n,d]),[s,u]}(e,t,n),a=o[0],i=o[1];return p.useEffect((function(){el(n,"selectedItem")&&(n.selectedItemChanged(r.current,n.selectedItem)&&i({type:Ml,inputValue:n.itemToString(n.selectedItem)}),r.current=a.selectedItem===r.current?n.selectedItem:a.selectedItem)}),[a.selectedItem,n.selectedItem]),[Zs(a,n),i]}Yn({},kl,{items:Cn.array.isRequired,isItemDisabled:Cn.func,selectedItemChanged:Cn.func,getA11ySelectionMessage:Cn.func,inputValue:Cn.string,defaultInputValue:Cn.string,initialInputValue:Cn.string,inputId:Cn.string,onInputValueChange:Cn.func});var Hl=Yn({},ml,{selectedItemChanged:function(e,t){return e!==t},getA11yStatusMessage:function(e){var t=e.isOpen,n=e.resultCount,r=e.previousResultCount;return t?n?n!==r?n+" result"+(1===n?" is":"s are")+" available, use up and down arrow keys to navigate. Press Enter key to select.":"":"No results are available.":""},isItemDisabled:function(){return!1}});function $l(e,t){var n,r,o=t.type,a=t.props,i=t.altKey;switch(o){case Rl:r={isOpen:hl(a,"isOpen"),highlightedIndex:hl(a,"highlightedIndex"),selectedItem:a.items[t.index],inputValue:a.itemToString(a.items[t.index])};break;case El:r=e.isOpen?{highlightedIndex:tl(e.highlightedIndex,1,a.items,a.isItemDisabled,!0)}:{highlightedIndex:i&&null==e.selectedItem?-1:bl(a,e,1),isOpen:a.items.length>=0};break;case Sl:r=e.isOpen?i?wl(a,e.highlightedIndex):{highlightedIndex:tl(e.highlightedIndex,-1,a.items,a.isItemDisabled,!0)}:{highlightedIndex:bl(a,e,-1),isOpen:a.items.length>=0};break;case Tl:r=wl(a,e.highlightedIndex);break;case Cl:r=Yn({isOpen:!1,highlightedIndex:-1},!e.isOpen&&{selectedItem:null,inputValue:""});break;case Il:r={highlightedIndex:tl(e.highlightedIndex,-10,a.items,a.isItemDisabled,!0)};break;case _l:r={highlightedIndex:tl(e.highlightedIndex,10,a.items,a.isItemDisabled,!0)};break;case Ol:r={highlightedIndex:nl(0,!1,a.items,a.isItemDisabled)};break;case Pl:r={highlightedIndex:nl(a.items.length-1,!0,a.items,a.isItemDisabled)};break;case jl:r=Yn({isOpen:!1,highlightedIndex:-1},e.highlightedIndex>=0&&(null==(n=a.items)?void 0:n.length)&&t.selectItem&&{selectedItem:a.items[e.highlightedIndex],inputValue:a.itemToString(a.items[e.highlightedIndex])});break;case Nl:r={isOpen:!0,highlightedIndex:hl(a,"highlightedIndex"),inputValue:t.inputValue};break;case Al:r={isOpen:!e.isOpen,highlightedIndex:e.isOpen?-1:bl(a,e,0)};break;case Ll:r={selectedItem:t.selectedItem,inputValue:a.itemToString(t.selectedItem)};break;case Ml:r={inputValue:t.inputValue};break;default:return function(e,t,n){var r,o=t.type,a=t.props;switch(o){case n.ItemMouseMove:r={highlightedIndex:t.disabled?-1:t.index};break;case n.MenuMouseLeave:r={highlightedIndex:-1};break;case n.ToggleButtonClick:case n.FunctionToggleMenu:r={isOpen:!e.isOpen,highlightedIndex:e.isOpen?-1:bl(a,e,0)};break;case n.FunctionOpenMenu:r={isOpen:!0,highlightedIndex:bl(a,e,0)};break;case n.FunctionCloseMenu:r={isOpen:!1};break;case n.FunctionSetHighlightedIndex:r={highlightedIndex:t.highlightedIndex};break;case n.FunctionSetInputValue:r={inputValue:t.inputValue};break;case n.FunctionReset:r={highlightedIndex:hl(a,"highlightedIndex"),isOpen:hl(a,"isOpen"),selectedItem:hl(a,"selectedItem"),inputValue:hl(a,"inputValue")};break;default:throw new Error("Reducer called without proper action type.")}return Yn({},e,r)}(e,t,Dl)}return Yn({},e,r)}var Bl=["onMouseLeave","refKey","ref"],Vl=["item","index","refKey","ref","onMouseMove","onMouseDown","onClick","onPress","disabled"],Ul=["onClick","onPress","refKey","ref"],Wl=["onKeyDown","onChange","onInput","onBlur","onChangeText","onClick","refKey","ref"];function ql(e){void 0===e&&(e={});var t=Yn({},Hl,e),n=t.items,r=t.scrollIntoView,o=t.environment,a=t.getA11yStatusMessage,i=t.getA11ySelectionMessage,s=t.itemToString,l=Fl($l,zl(t),t),c=l[0],u=l[1],d=c.isOpen,f=c.highlightedIndex,m=c.selectedItem,h=c.inputValue,g=p.useRef(null),b=p.useRef({}),v=p.useRef(null),y=p.useRef(null),w=p.useRef(!0),x=dl(t),k=p.useRef(),E=fl({state:c,props:t}),S=p.useCallback((function(e){return b.current[x.getItemId(e)]}),[x]);vl(a,[d,f,h,n],Yn({isInitialMount:w.current,previousResultCount:k.current,items:n,environment:o,itemToString:s},c)),vl(i,[m],Yn({isInitialMount:w.current,previousResultCount:k.current,items:n,environment:o,itemToString:s},c));var C=function(e){var t=e.highlightedIndex,n=e.isOpen,r=e.itemRefs,o=e.getItemNodeFromIndex,a=e.menuElement,i=e.scrollIntoView,s=p.useRef(!0);return ul((function(){t<0||!n||!Object.keys(r.current).length||(!1===s.current?s.current=!0:i(o(t),a))}),[t]),s}({menuElement:g.current,highlightedIndex:f,isOpen:d,itemRefs:b,scrollIntoView:r,getItemNodeFromIndex:S});yl({isInitialMount:w.current,props:t,state:c}),p.useEffect((function(){gl(t,"isOpen")&&v.current&&v.current.focus()}),[]),p.useEffect((function(){w.current||(k.current=n.length)}));var O=function(e,t,n,r){var o=p.useRef({isMouseDown:!1,isTouchMove:!1});return p.useEffect((function(){if(null!=(null==n?void 0:n.addEventListener)){var a=function(){o.current.isMouseDown=!0},i=function(a){o.current.isMouseDown=!1,e&&!rl(a.target,t.map((function(e){return e.current})),n)&&r()},s=function(){o.current.isTouchMove=!1},l=function(){o.current.isTouchMove=!0},c=function(a){!e||o.current.isTouchMove||rl(a.target,t.map((function(e){return e.current})),n,!1)||r()};return n.addEventListener("mousedown",a),n.addEventListener("mouseup",i),n.addEventListener("touchstart",s),n.addEventListener("touchmove",l),n.addEventListener("touchend",c),function(){n.removeEventListener("mousedown",a),n.removeEventListener("mouseup",i),n.removeEventListener("touchstart",s),n.removeEventListener("touchmove",l),n.removeEventListener("touchend",c)}}}),[e,n]),o}(d,[v,g,y],o,(function(){u({type:jl,selectItem:!1})})),P=Ks;p.useEffect((function(){return w.current=!1,function(){w.current=!0}}),[]),p.useEffect((function(){var e;if(d){if((null==(e=o.document)?void 0:e.activeElement)!==v.current){var t;null==v||null==(t=v.current)||t.focus()}}else b.current={}}),[d,o]);var I=p.useMemo((function(){return{ArrowDown:function(e){e.preventDefault(),u({type:El,altKey:e.altKey})},ArrowUp:function(e){e.preventDefault(),u({type:Sl,altKey:e.altKey})},Home:function(e){E.current.state.isOpen&&(e.preventDefault(),u({type:Ol}))},End:function(e){E.current.state.isOpen&&(e.preventDefault(),u({type:Pl}))},Escape:function(e){var t=E.current.state;(t.isOpen||t.inputValue||t.selectedItem||t.highlightedIndex>-1)&&(e.preventDefault(),u({type:Cl}))},Enter:function(e){E.current.state.isOpen&&229!==e.which&&(e.preventDefault(),u({type:Tl}))},PageUp:function(e){E.current.state.isOpen&&(e.preventDefault(),u({type:Il}))},PageDown:function(e){E.current.state.isOpen&&(e.preventDefault(),u({type:_l}))}}}),[u,E]),_=p.useCallback((function(e){return Yn({id:x.labelId,htmlFor:x.inputId},e)}),[x]),T=p.useCallback((function(e,t){var n,r=void 0===e?{}:e,o=r.onMouseLeave,a=r.refKey,i=void 0===a?"ref":a,s=r.ref,l=Ga(r,Bl);return(void 0===t?{}:t).suppressRefError,Yn(((n={})[i]=Js(s,(function(e){g.current=e})),n.id=x.menuId,n.role="listbox",n["aria-labelledby"]=l&&l["aria-label"]?void 0:""+x.labelId,n.onMouseLeave=Qs(o,(function(){u({type:11})})),n),l)}),[u,P,x]),N=p.useCallback((function(e){var t,n,r=void 0===e?{}:e,o=r.item,a=r.index,i=r.refKey,s=void 0===i?"ref":i,l=r.ref,c=r.onMouseMove,d=r.onMouseDown,p=r.onClick;r.onPress;var f=r.disabled,m=Ga(r,Vl);void 0!==f&&console.warn('Passing "disabled" as an argument to getItemProps is not supported anymore. Please use the isItemDisabled prop from useCombobox.');var h=E.current,g=h.props,v=h.state,y=function(e,t,n,r){var o,a;if(void 0===e){if(void 0===t)throw new Error(r);o=n[t],a=t}else a=void 0===t?n.indexOf(e):t,o=e;return[o,a]}(o,a,g.items,"Pass either item or index to getItemProps!"),w=y[0],k=y[1],S=g.isItemDisabled(w,k),O=p;return Yn(((t={})[s]=Js(l,(function(e){e&&(b.current[x.getItemId(k)]=e)})),t["aria-disabled"]=S,t["aria-selected"]=""+(k===v.highlightedIndex),t.id=x.getItemId(k),t.role="option",t),!S&&((n={}).onClick=Qs(O,(function(){u({type:Rl,index:k})})),n),{onMouseMove:Qs(c,(function(){k!==v.highlightedIndex&&(C.current=!1,u({type:12,index:k,disabled:S}))})),onMouseDown:Qs(d,(function(e){return e.preventDefault()}))},m)}),[u,E,C,x]),j=p.useCallback((function(e){var t,n=void 0===e?{}:e,r=n.onClick;n.onPress;var o=n.refKey,a=void 0===o?"ref":o,i=n.ref,s=Ga(n,Ul),l=E.current.state;return Yn(((t={})[a]=Js(i,(function(e){y.current=e})),t["aria-controls"]=x.menuId,t["aria-expanded"]=l.isOpen,t.id=x.toggleButtonId,t.tabIndex=-1,t),!s.disabled&&Yn({},{onClick:Qs(r,(function(){u({type:14})}))}),s)}),[u,E,x]),A=p.useCallback((function(e,t){var n,r=void 0===e?{}:e,a=r.onKeyDown,i=r.onChange,s=r.onInput,l=r.onBlur;r.onChangeText;var c=r.onClick,d=r.refKey,p=void 0===d?"ref":d,f=r.ref,m=Ga(r,Wl);(void 0===t?{}:t).suppressRefError;var h,g=E.current.state,b={};m.disabled||((h={}).onChange=Qs(i,s,(function(e){u({type:Nl,inputValue:e.target.value})})),h.onKeyDown=Qs(a,(function(e){var t=function(e){var t=e.key,n=e.keyCode;return n>=37&&n<=40&&0!==t.indexOf("Arrow")?"Arrow"+t:t}(e);t&&I[t]&&I[t](e)})),h.onBlur=Qs(l,(function(e){if(g.isOpen&&!O.current.isMouseDown){var t=null===e.relatedTarget&&o.document.activeElement!==o.document.body;u({type:jl,selectItem:!t})}})),h.onClick=Qs(c,(function(){u({type:Al})})),b=h);return Yn(((n={})[p]=Js(f,(function(e){v.current=e})),n["aria-activedescendant"]=g.isOpen&&g.highlightedIndex>-1?x.getItemId(g.highlightedIndex):"",n["aria-autocomplete"]="list",n["aria-controls"]=x.menuId,n["aria-expanded"]=g.isOpen,n["aria-labelledby"]=m&&m["aria-label"]?void 0:x.labelId,n.autoComplete="off",n.id=x.inputId,n.role="combobox",n.value=g.inputValue,n),b,m)}),[P,E,x,I,u,O,o]),R=p.useCallback((function(){u({type:15})}),[u]),L=p.useCallback((function(){u({type:17})}),[u]),M=p.useCallback((function(){u({type:16})}),[u]),D=p.useCallback((function(e){u({type:18,highlightedIndex:e})}),[u]),z=p.useCallback((function(e){u({type:Ll,selectedItem:e})}),[u]);return{getItemProps:N,getLabelProps:_,getMenuProps:T,getInputProps:A,getToggleButtonProps:j,toggleMenu:R,openMenu:M,closeMenu:L,setHighlightedIndex:D,setInputValue:p.useCallback((function(e){u({type:20,inputValue:e})}),[u]),selectItem:z,reset:p.useCallback((function(){u({type:21})}),[u]),highlightedIndex:f,isOpen:d,selectedItem:m,inputValue:h}}ql.stateChangeTypes=Dl,Yn({},xl,{selectedItems:Cn.array,initialSelectedItems:Cn.array,defaultSelectedItems:Cn.array,getA11yRemovalMessage:Cn.func,activeIndex:Cn.number,initialActiveIndex:Cn.number,defaultActiveIndex:Cn.number,onActiveIndexChange:Cn.func,onSelectedItemsChange:Cn.func,keyNavigationNext:Cn.string,keyNavigationPrevious:Cn.string});const Gl={[ql.stateChangeTypes.FunctionCloseMenu]:"fn:setExpansion",[ql.stateChangeTypes.FunctionOpenMenu]:"fn:setExpansion",[ql.stateChangeTypes.FunctionToggleMenu]:"fn:setExpansion",[ql.stateChangeTypes.FunctionReset]:"fn:reset",[ql.stateChangeTypes.FunctionSelectItem]:"fn:setSelectionValue",[ql.stateChangeTypes.FunctionSetHighlightedIndex]:"fn:setActiveIndex",[ql.stateChangeTypes.FunctionSetInputValue]:"fn:setInputValue",[ql.stateChangeTypes.InputBlur]:"input:blur",[ql.stateChangeTypes.InputChange]:"input:change",[ql.stateChangeTypes.InputClick]:"input:click",[ql.stateChangeTypes.InputKeyDownArrowDown]:`input:keyDown:${Ps}`,[ql.stateChangeTypes.InputKeyDownArrowUp]:`input:keyDown:${Ls}`,[ql.stateChangeTypes.InputKeyDownEnd]:`input:keyDown:${Is}`,[ql.stateChangeTypes.InputKeyDownEnter]:`input:keyDown:${_s}`,[ql.stateChangeTypes.InputKeyDownEscape]:`input:keyDown:${Ts}`,[ql.stateChangeTypes.InputKeyDownHome]:`input:keyDown:${Ns}`,[ql.stateChangeTypes.InputKeyDownPageDown]:`input:keyDown:${js}`,[ql.stateChangeTypes.InputKeyDownPageUp]:`input:keyDown:${As}`,[ql.stateChangeTypes.ItemClick]:"option:click",[ql.stateChangeTypes.ItemMouseMove]:"option:mouseMove",[ql.stateChangeTypes.MenuMouseLeave]:"listbox:mouseLeave",[ql.stateChangeTypes.ToggleButtonClick]:"toggle:click"},Kl=e=>Gl[e]||e,Yl=(e,t)=>{if(void 0===t)return"";return e["string"==typeof t?t:JSON.stringify(t)]},Xl=e=>{let{idPrefix:t,triggerRef:n,inputRef:r,listboxRef:o,isAutocomplete:a,isMultiselectable:i,isEditable:s=!0,disabled:l,hasHint:c,hasMessage:u,options:d=[],inputValue:f,selectionValue:m,isExpanded:h,defaultExpanded:g,initialExpanded:b,activeIndex:v,defaultActiveIndex:y,initialActiveIndex:w,onChange:x=(()=>{}),environment:k}=e;const E=k||window,[S,C]=p.useState(),[O,P]=p.useState(f),[I,_]=p.useState(""),T=p.useRef(!0),N=p.useRef(),j=p.useRef(),A=(e=>An(e)||"id:"+Ms++)(t),R=p.useRef({label:`${A}--label`,hint:`${A}--hint`,trigger:`${A}--trigger`,input:`${A}--input`,listbox:`${A}--listbox`,message:`${A}--message`,getOptionId:(e,t,n)=>`${A}--option${t?"-disabled":""}${n?"-hidden":""}-${e}`}),L=p.useMemo((()=>({})),[]),M=p.useMemo((()=>[]),[]),D=p.useMemo((()=>[]),[]),z=p.useMemo((()=>[]),[]),F=p.useMemo((()=>{const e=[],t=t=>{if(t.disabled||t.hidden)t.disabled&&!D.includes(t.value)&&D.push(t.value),t.hidden&&!z.includes(t.value)&&z.push(t.value);else{e.push(t.value);const n=D.indexOf(t.value);-1!==n&&D.splice(n,1);const r=z.indexOf(t.value);-1!==r&&z.splice(r,1)}t.selected&&!M.includes(t.value)&&M.push(t.value);const n="string"==typeof t.value?t.value:JSON.stringify(t.value);L[n]=t.label||n};return d.forEach((e=>{"options"in e?e.options.forEach(t):t(e)})),e}),[d,D,z,M,L]),H=i?M:M[0],$=i?"":Yl(L,H),B=p.useMemo((()=>void 0===y?a&&s?0:void 0:y),[y,a,s]);if(T.current&&f!==O?P(f):T.current=!0,null==m&&!i&&M.length>1)throw new Error("Error: expected useCombobox `options` to have no more than one selected.");if(null!=m){if(i&&!Array.isArray(m))throw new Error("Error: expected multiselectable useCombobox `selectionValue` to be an array.");if(!i&&Array.isArray(m))throw new Error("Error: expected useCombobox `selectionValue` not to be an array.")}const V=p.useCallback((e=>{let{type:t,isOpen:n,selectedItem:r,inputValue:o,highlightedIndex:a}=e;return x({type:Kl(t),...void 0!==n&&{isExpanded:n},...void 0!==r&&{selectionValue:r},...void 0!==o&&{inputValue:o},...void 0!==a&&{activeIndex:a}})}),[x]),{selectedItem:U,isOpen:W,highlightedIndex:q,inputValue:G,getToggleButtonProps:K,getInputProps:Y,getMenuProps:X,getItemProps:Q,closeMenu:J,openMenu:Z,setHighlightedIndex:ee,selectItem:te}=ql({toggleButtonId:R.current.trigger,menuId:R.current.listbox,getItemId:R.current.getOptionId,items:F,inputValue:O,initialInputValue:$,itemToString:e=>e?Yl(L,e):"",selectedItem:m,initialSelectedItem:H,isOpen:h,defaultIsOpen:g,initialIsOpen:b,highlightedIndex:v,defaultHighlightedIndex:B,initialHighlightedIndex:w,onStateChange:V,stateReducer:(e,t)=>{let{type:n,changes:r,altKey:o}=t;switch(n){case ql.stateChangeTypes.ControlledPropUpdatedSelectedItem:return e;case ql.stateChangeTypes.FunctionSetHighlightedIndex:j.current?.altKey&&(r.highlightedIndex=-1);break;case ql.stateChangeTypes.FunctionCloseMenu:case ql.stateChangeTypes.InputBlur:return{...e,isOpen:n===ql.stateChangeTypes.InputBlur&&S&&i&&e.isOpen||!1};case ql.stateChangeTypes.InputClick:a||(r.isOpen=e.isOpen);break;case ql.stateChangeTypes.InputKeyDownArrowDown:case ql.stateChangeTypes.FunctionOpenMenu:e.isOpen===r.isOpen||o||(r.highlightedIndex=0);break;case ql.stateChangeTypes.InputKeyDownArrowUp:e.isOpen!==r.isOpen&&(r.highlightedIndex=F.length-1);break;case ql.stateChangeTypes.InputKeyDownEnter:case ql.stateChangeTypes.FunctionSelectItem:case ql.stateChangeTypes.ItemClick:r.highlightedIndex=e.highlightedIndex,i&&(r.isOpen=e.isOpen,r.inputValue="");break;case ql.stateChangeTypes.InputKeyDownEscape:return{...e,isOpen:!1};case ql.stateChangeTypes.InputKeyDownPageDown:case ql.stateChangeTypes.InputKeyDownPageUp:return e}return i&&e.selectedItem!==r.selectedItem&&(void 0!==e.selectedItem&&null!==e.selectedItem&&void 0!==r.selectedItem&&null!==r.selectedItem?e.selectedItem.includes(r.selectedItem)?r.selectedItem=e.selectedItem.filter((e=>e!==r.selectedItem)):r.selectedItem=[...e.selectedItem,r.selectedItem]:void 0!==r.selectedItem&&null!==r.selectedItem?r.selectedItem=[r.selectedItem]:r.selectedItem=[]),j.current={type:n,altKey:o,...e},r},environment:E}),ne=p.useCallback((()=>{J(),x({type:Kl(ql.stateChangeTypes.FunctionCloseMenu),isExpanded:!1})}),[J,x]),re=p.useCallback((()=>{Z(),x({type:Kl(ql.stateChangeTypes.FunctionOpenMenu),isExpanded:!0})}),[Z,x]),oe=p.useCallback((e=>{ee(e),x({type:Kl(ql.stateChangeTypes.FunctionSetHighlightedIndex),activeIndex:e})}),[x,ee]),ae=p.useCallback((e=>{te(e),x({type:Kl(ql.stateChangeTypes.FunctionSelectItem),selectionValue:e})}),[x,te]),{getLabelProps:ie,getHintProps:se,getInputProps:le,getMessageProps:ce}=Es({hasHint:c,hasMessage:u});p.useLayoutEffect((()=>{if((a||!s)&&W&&!j.current?.isOpen&&U&&!I){const e=Array.isArray(U)?U[U.length-1]:U,t=F.findIndex((t=>t===e));-1!==t?oe(t):void 0!==B&&oe(B)}}),[a,s,W,U,G,F,B,oe]),p.useEffect((()=>C(n.current?.contains(r.current))),[n,r]),p.useEffect((()=>(clearTimeout(N.current),N.current=window.setTimeout((()=>_("")),500),()=>clearTimeout(N.current))),[I]),p.useEffect((()=>{j.current?.type===ql.stateChangeTypes.FunctionSelectItem&&(s?r.current?.focus():n.current?.focus(),j.current={...j.current,type:ql.stateChangeTypes.InputClick})})),p.useEffect((()=>{s&&r.current===E.document.activeElement&&r.current?.scrollIntoView&&r.current?.scrollIntoView({block:"nearest"})}),[r,s,E.document.activeElement]);const ue=p.useCallback((function(e){let{onBlur:t,onClick:o,onKeyDown:c,...u}=void 0===e?{}:e;const d=K({"data-garden-container-id":"containers.combobox","data-garden-container-version":"1.1.4",onBlur:t,onClick:o,onKeyDown:c,ref:n,disabled:l,...u}),p=e=>{null!==e.relatedTarget&&e.currentTarget?.contains(e.relatedTarget)||ne()};if(s&&S){const e=e=>{l?e.preventDefault():a?d.onClick&&d.onClick(e):r.current?.focus()};return{...d,onBlur:Ss(t,p),onClick:Ss(o,e),"aria-controls":a?d["aria-controls"]:void 0,"aria-expanded":void 0,"aria-disabled":l||void 0,disabled:void 0}}if(!s){const{"aria-activedescendant":e,onKeyDown:n}=Y({},{suppressRefError:!0}),r=e=>{if(e.stopPropagation(),W||e.key!==Rs&&e.key!==_s)if(!W||I||e.key!==Rs&&e.key!==_s){if(/^(?:\S| ){1}$/u.test(e.key)){const t=`${I}${e.key}`;_(t);let n=0;if(W)-1!==q&&(n=1===t.length?q+1:q);else{re();const e=Array.isArray(U)?U[U.length-1]:U;null!==e&&(n=F.findIndex((t=>t===e)))}for(let e=0;e<F.length;e++){const r=(e+n)%F.length,o=F[r];if(Yl(L,o).toLowerCase().startsWith(t.toLowerCase())){oe(r);break}}}}else e.preventDefault(),-1!==q&&ae(F[q]),i||ne();else e.preventDefault(),re()};return{...d,"aria-activedescendant":e,"aria-haspopup":"listbox","aria-labelledby":R.current.label,"aria-disabled":l||void 0,disabled:void 0,role:"combobox",onBlur:Ss(t,p),onKeyDown:Ss(c,n,r),tabIndex:l?-1:0}}return d}),[K,Y,n,l,U,W,q,ne,re,oe,ae,I,F,L,S,a,s,i,r]),de=p.useCallback((function(e){let{onClick:t,...r}=void 0===e?{}:e;const{htmlFor:o,...a}=ie({id:R.current.label,htmlFor:R.current.input,...r});return{...a,onClick:Ss(t,(()=>!s&&n.current?.focus())),htmlFor:s?o:void 0}}),[ie,s,n]),pe=p.useCallback((e=>se({id:R.current.hint,...e})),[se]),fe=p.useCallback((function(e){let{role:t=(s?"combobox":null),onChange:o,onClick:i,onFocus:d,...p}=void 0===e?{}:e;const m={"data-garden-container-id":"containers.combobox.input","data-garden-container-version":"1.1.4",ref:r,role:null===t?void 0:t,onChange:o,onClick:i,onFocus:d};if(s){const e=e=>{void 0!==f&&(P(e.target.value),T.current=!1,e.nativeEvent.isComposing&&V({type:ql.stateChangeTypes.InputChange,inputValue:e.target.value}))},r=e=>e.target instanceof Element&&n.current?.contains(e.target)&&e.stopPropagation(),s=[];return c&&s.push(R.current.hint),u&&s.push(R.current.message),Y({...m,disabled:l,role:t,"aria-autocomplete":a?"list":void 0,onChange:Ss(o,e),onClick:Ss(i,r),...le({id:R.current.input,"aria-labelledby":R.current.label,"aria-describedby":s.length>0?s.join(" "):void 0}),...p})}return{...Y({...m,disabled:!0,"aria-autocomplete":void 0,"aria-activedescendant":void 0,"aria-controls":void 0,"aria-expanded":void 0,"aria-hidden":!0,"aria-labelledby":void 0}),disabled:l,readOnly:!0,tabIndex:-1,onFocus:Ss(d,(()=>{s||n.current?.focus()})),...p}}),[Y,le,V,c,u,f,r,n,l,a,s]),me=p.useCallback((e=>{let{option:t,onClick:o,onKeyDown:a,...i}=e;return{"data-garden-container-id":"containers.combobox.tag","data-garden-container-version":"1.1.4",onClick:Ss(o,(e=>e.target instanceof Element&&n.current?.contains(e.target)&&e.stopPropagation())),onKeyDown:Ss(a,(e=>{if(e.key===Cs||e.key===Os)ae(t.value);else{const t=e.target instanceof Element&&n.current?.contains(e.target);if(t&&!s&&e.stopPropagation(),t&&(e.key===Ps||e.key===Ls||e.key===Ts||!s&&(e.key===_s||e.key===Rs))){const t=Y();s?r.current?.focus():(e.preventDefault(),n.current?.focus()),t.onKeyDown&&t.onKeyDown(e)}}})),...i}}),[n,ae,Y,s,r]),he=p.useCallback((e=>{let{role:t="listbox",...n}=e;return X({"data-garden-container-id":"containers.combobox.listbox","data-garden-container-version":"1.1.4",ref:o,role:t,"aria-multiselectable":!!i||void 0,...n})}),[X,o,i]),ge=p.useCallback((e=>{let{role:t="group",...n}=e;return{"data-garden-container-id":"containers.combobox.optgroup","data-garden-container-version":"1.1.4",role:null===t?void 0:t,...n}}),[]),be=p.useCallback((function(e){let{role:t="option",option:n,onMouseDown:r,...o}=void 0===e?{}:e;const a={"data-garden-container-id":"containers.combobox.option","data-garden-container-version":"1.1.4",role:t,onMouseDown:r,...o};let i=!1;if(void 0!==n?.value&&(i=Array.isArray(U)?U?.includes(n?.value):U===n?.value),n?.hidden)return{"aria-disabled":!!n.disabled||void 0,"aria-hidden":!0,"aria-selected":i,id:n?R.current.getOptionId(z.indexOf(n.value),n.disabled,n.hidden):void 0,...a};if(void 0===n||n.disabled){const e=e=>e.preventDefault();return{"aria-disabled":!0,"aria-selected":i,id:n?R.current.getOptionId(D.indexOf(n.value),n.disabled,n.hidden):void 0,...a,onMouseDown:Ss(r,e)}}return Q({item:n.value,index:F.indexOf(n.value),"aria-disabled":void 0,"aria-hidden":void 0,"aria-selected":i,...a})}),[Q,D,z,F,U]),ve=p.useCallback((e=>ce({id:R.current.message,...e})),[ce]),ye=p.useCallback((e=>{if(void 0===e)ae(null);else{const t="object"==typeof e&&"value"in e?e.value:e;Array.isArray(U)&&U.includes(t)?ae(t):U===t&&ae(null)}}),[U,ae]),we=p.useMemo((()=>Array.isArray(U)?U.map((e=>({value:e,label:L[e],disabled:D.includes(e),hidden:z.includes(e)}))):U?{value:U,label:Yl(L,U),disabled:D.includes(U),hidden:z.includes(U)}:null),[U,D,z,L]);return p.useMemo((()=>({getLabelProps:de,getHintProps:pe,getTriggerProps:ue,getInputProps:fe,getTagProps:me,getListboxProps:he,getOptGroupProps:ge,getOptionProps:be,getMessageProps:ve,selection:we,isExpanded:W,activeValue:F[q],inputValue:G,removeSelection:ye})),[F,we,W,q,G,de,pe,ue,fe,me,he,ge,be,ve,ye])};Cn.func,Cn.func,Cn.string,Cn.any.isRequired,Cn.any.isRequired,Cn.any.isRequired,Cn.bool,Cn.bool,Cn.bool,Cn.bool,Cn.bool,Cn.bool,Cn.arrayOf(Cn.any).isRequired,Cn.string,Cn.oneOfType([Cn.string,Cn.arrayOf(Cn.string)]),Cn.bool,Cn.bool,Cn.bool,Cn.number,Cn.number,Cn.number,Cn.func,Cn.any;const Ql=p.createContext(void 0),Jl=()=>p.useContext(Ql),Zl="forms.field",ec=kn.div.attrs({"data-garden-id":Zl,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledField",componentId:"sc-12gzfsu-0"})(["position:relative;direction:",";margin:0;border:0;padding:0;font-size:0;",";"],(e=>e.theme.rtl?"rtl":"ltr"),(e=>Kn(Zl,e)));ec.defaultProps={theme:Wn};const tc="forms.input_label",nc=kn.label.attrs((e=>({"data-garden-id":e["data-garden-id"]||tc,"data-garden-version":e["data-garden-version"]||"8.76.9"}))).withConfig({displayName:"StyledLabel",componentId:"sc-2utmsz-0"})(["direction:",";vertical-align:middle;line-height:",";color:",";font-size:",";font-weight:",";&[hidden]{display:",";vertical-align:",";text-indent:",";font-size:",";",";}",";"],(e=>e.theme.rtl&&"rtl"),(e=>Ao(5*e.theme.space.base,e.theme.fontSizes.md)),(e=>No("foreground",600,e.theme)),(e=>e.theme.fontSizes.md),(e=>e.isRegular?e.theme.fontWeights.regular:e.theme.fontWeights.semibold),(e=>e.isRadio?"inline-block":"inline"),(e=>e.isRadio&&"top"),(e=>e.isRadio&&"-100%"),(e=>e.isRadio&&"0"),(e=>!e.isRadio&&{border:"0",clip:"rect(0 0 0 0)",height:"1px",margin:"-1px",overflow:"hidden",padding:"0",position:"absolute",whiteSpace:"nowrap",width:"1px"}),(e=>Kn(tc,e)));nc.defaultProps={theme:Wn};const rc="forms.input_hint",oc=kn.div.attrs((e=>({"data-garden-id":e["data-garden-id"]||rc,"data-garden-version":e["data-garden-version"]||"8.76.9"}))).withConfig({displayName:"StyledHint",componentId:"sc-17c2wu8-0"})(["direction:",";display:block;vertical-align:middle;line-height:",";color:",";font-size:",";",";"],(e=>e.theme.rtl&&"rtl"),(e=>Ao(5*e.theme.space.base,e.theme.fontSizes.md)),(e=>No("neutralHue",600,e.theme)),(e=>e.theme.fontSizes.md),(e=>Kn(rc,e)));var ac,ic;function sc(){return sc=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},sc.apply(null,arguments)}oc.defaultProps={theme:Wn};var lc,cc,uc=function(e){return p.createElement("svg",sc({xmlns:"http://www.w3.org/2000/svg",width:16,height:16,focusable:"false",viewBox:"0 0 16 16","aria-hidden":"true"},e),ac||(ac=p.createElement("g",{fill:"none",stroke:"currentColor"},p.createElement("circle",{cx:7.5,cy:8.5,r:7}),p.createElement("path",{strokeLinecap:"round",d:"M7.5 4.5V9"}))),ic||(ic=p.createElement("circle",{cx:7.5,cy:12,r:1,fill:"currentColor"})))};function dc(){return dc=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},dc.apply(null,arguments)}var pc,fc=function(e){return p.createElement("svg",dc({xmlns:"http://www.w3.org/2000/svg",width:16,height:16,focusable:"false",viewBox:"0 0 16 16","aria-hidden":"true"},e),lc||(lc=p.createElement("path",{fill:"none",stroke:"currentColor",strokeLinecap:"round",d:"M.88 13.77L7.06 1.86c.19-.36.7-.36.89 0l6.18 11.91c.17.33-.07.73-.44.73H1.32c-.37 0-.61-.4-.44-.73zM7.5 6v3.5"})),cc||(cc=p.createElement("circle",{cx:7.5,cy:12,r:1,fill:"currentColor"})))};function mc(){return mc=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},mc.apply(null,arguments)}var hc=function(e){return p.createElement("svg",mc({xmlns:"http://www.w3.org/2000/svg",width:16,height:16,focusable:"false",viewBox:"0 0 16 16","aria-hidden":"true"},e),pc||(pc=p.createElement("g",{fill:"none",stroke:"currentColor"},p.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4 9l2.5 2.5 5-5"}),p.createElement("circle",{cx:7.5,cy:8.5,r:7}))))};const gc="forms.input_message_icon",bc=kn((e=>{let t,{children:n,validation:r,...o}=e;return t="error"===r?f.createElement(uc,o):"success"===r?f.createElement(hc,o):"warning"===r?f.createElement(fc,o):f.cloneElement(p.Children.only(n)),t})).attrs({"data-garden-id":gc,"data-garden-version":"8.76.9","aria-hidden":null,role:"img"}).withConfig({displayName:"StyledMessageIcon",componentId:"sc-1ph2gba-0"})(["width:",";height:",";",";"],(e=>e.theme.iconSizes.md),(e=>e.theme.iconSizes.md),(e=>Kn(gc,e)));bc.defaultProps={theme:Wn};const vc="forms.input_message",yc=kn.div.attrs((e=>({"data-garden-id":e["data-garden-id"]||vc,"data-garden-version":e["data-garden-version"]||"8.76.9"}))).withConfig({displayName:"StyledMessage",componentId:"sc-30hgg7-0"})(["direction:",";display:inline-block;position:relative;vertical-align:middle;line-height:",";font-size:",";",";& ","{position:absolute;top:-1px;",":0;}",":not([hidden]) + &{display:block;margin-top:",";}",";"],(e=>e.theme.rtl&&"rtl"),(e=>Ao(e.theme.iconSizes.md,e.theme.fontSizes.sm)),(e=>e.theme.fontSizes.sm),(e=>(e=>{const t=e.theme.rtl,n=ur(`${e.theme.space.base} * 2px + ${e.theme.iconSizes.md}`);let r;return r="error"===e.validation?No("dangerHue",600,e.theme):"success"===e.validation?No("successHue",600,e.theme):"warning"===e.validation?No("warningHue",700,e.theme):No("neutralHue",700,e.theme),tn(["padding-",":",";color:",";"],t?"right":"left",e.validation&&n,r)})(e)),bc,(e=>e.theme.rtl?"right":"left"),nc,(e=>ur(`${e.theme.space.base} * 1px`)),(e=>Kn(vc,e)));yc.defaultProps={theme:Wn};const wc="forms.input",xc=kn.input.attrs((e=>{return{"data-garden-id":wc,"data-garden-version":"8.76.9","aria-invalid":(t=e.validation,"warning"===t||"error"===t)};var t})).withConfig({displayName:"StyledTextInput",componentId:"sc-k12n8x-0"})(["appearance:none;transition:border-color 0.25s ease-in-out,box-shadow 0.1s ease-in-out,background-color 0.25s ease-in-out,color 0.25s ease-in-out,z-index 0.25s ease-in-out;direction:",";border:",";border-radius:",";width:100%;box-sizing:border-box;vertical-align:middle;font-family:inherit;&::-ms-browse{border-radius:",";}&::-ms-clear,&::-ms-reveal{display:none;}&::-moz-color-swatch{border:none;border-radius:",";}&::-webkit-color-swatch{border:none;border-radius:",";}&::-webkit-color-swatch-wrapper{padding:0;}&::-webkit-clear-button,&::-webkit-inner-spin-button,&::-webkit-search-cancel-button,&::-webkit-search-results-button{display:none;}&::-webkit-datetime-edit{direction:",";line-height:1;}&::placeholder{opacity:1;}&:invalid{box-shadow:none;}&[type='file']::-ms-value{display:none;}@media screen and (min--moz-device-pixel-ratio:0){&[type='number']{appearance:textfield;}}",";",";&:disabled{cursor:default;}",";"],(e=>e.theme.rtl&&"rtl"),(e=>e.isBare?"none":e.theme.borders.sm),(e=>e.isBare?"0":e.theme.borderRadii.md),(e=>e.theme.borderRadii.sm),(e=>e.theme.borderRadii.sm),(e=>e.theme.borderRadii.sm),(e=>e.theme.rtl&&"rtl"),(e=>(e=>{const t=e.theme.fontSizes.md,n=3*e.theme.space.base+"px";let r,o,a,i;e.isCompact?(r=8*e.theme.space.base+"px",o=1.5*e.theme.space.base+"px",a=ur(`${e.theme.fontSizes.sm} - 1`),i=6*e.theme.space.base+"px"):(r=10*e.theme.space.base+"px",o=2.5*e.theme.space.base+"px",a=e.theme.fontSizes.sm,i=7*e.theme.space.base+"px");const s=ur(`${r} - (${o} * 2) - (${e.theme.borderWidths.sm} * 2)`),l=e.isBare?"0":`${mr(o,t)} ${mr(n,t)}`,c=ur(`(${s} - ${i}) / 2`),u=ur(`${o} + ${c} - ${n}`);return tn(["padding:",";min-height:",";line-height:",";font-size:",";&::-ms-browse{font-size:",";}&[type='date'],&[type='datetime-local'],&[type='file'],&[type='month'],&[type='time'],&[type='week']{max-height:",";}&[type='file']{line-height:1;}@supports (-ms-ime-align:auto){&[type='color']{padding:",";}}&::-moz-color-swatch{margin-top:",";margin-left:",";width:calc(100% + ",");height:",";}&::-webkit-color-swatch{margin:"," ",";}",":not([hidden]) + &&,"," + &&,"," + &&,&& + ",",&& ~ ","{margin-top:","px;}"],l,e.isBare?"1em":r,Ao(s,t),t,a,r,e.isCompact?"0 2px":"1px 3px",c,u,ur(`${u} * -2`),i,c,u,nc,oc,yc,oc,yc,e.theme.space.base*(e.isCompact?1:2))})(e)),(e=>(e=>{const t="primaryHue",n=600,r=No("neutralHue",400,e.theme);let o,a,i,s=t,l=n;if(e.validation){let r=t;"success"===e.validation?r="successHue":"warning"===e.validation?(r="warningHue",l=700):"error"===e.validation&&(r="dangerHue"),o=No(r,n,e.theme),a=o,i=o,s=r}else o=No("neutralHue",300,e.theme),a=No("primaryHue",n,e.theme),i=a;const c=No("neutralHue",100,e.theme),u=No("neutralHue",300,e.theme),d=c,p=No("neutralHue",200,e.theme),f=No("neutralHue",400,e.theme);let m=o;return e.isFocused&&(m=i),e.isHovered&&(m=a),tn(["border-color:",";background-color:",";color:",";&::placeholder{color:",";}&[readonly],&[aria-readonly='true']{border-color:",";background-color:",";}&:hover{border-color:",";}"," &:disabled,&[aria-disabled='true']{border-color:",";background-color:",";color:",";}"],m,e.isBare?"transparent":No("background",600,e.theme),No("foreground",600,e.theme),r,u,!e.isBare&&c,a,Ho({theme:e.theme,inset:e.focusInset,condition:!e.isBare,hue:s,shade:l,styles:{borderColor:i}}),p,!e.isBare&&d,f)})(e)),(e=>Kn(wc,e)));xc.defaultProps={theme:Wn};const kc="forms.textarea",Ec=kn(xc).attrs({as:"textarea","data-garden-id":kc,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledTextarea",componentId:"sc-wxschl-0"})(["resize:",";overflow:auto;",";",";"],(e=>e.isResizable?"vertical":"none"),(e=>e.isHidden&&"\n  visibility: hidden;\n  position: absolute;\n  overflow: hidden;\n  height: 0;\n  top: 0;\n  left: 0;\n  transform: translateZ(0);\n"),(e=>Kn(kc,e)));Ec.defaultProps={theme:Wn};const Sc="forms.media_figure",Cc=kn((e=>{let{children:t,position:n,isHovered:r,isFocused:o,isDisabled:a,isRotated:i,theme:s,...l}=e;return f.cloneElement(p.Children.only(t),l)})).attrs({"data-garden-id":Sc,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledTextMediaFigure",componentId:"sc-1qepknj-0"})(["transform:",";transition:transform 0.25s ease-in-out,color 0.25s ease-in-out;",";"," ",";"],(e=>e.isRotated&&`rotate(${e.theme.rtl?"-":"+"}180deg)`),(e=>(e=>{let t=600;return e.isDisabled?t=400:(e.isHovered||e.isFocused)&&(t=700),tn(["color:",";"],No("neutralHue",t,e.theme))})(e)),(e=>(e=>{const t=e.theme.iconSizes.md,n=`1px ${2*e.theme.space.base}px auto 0`,r=`1px 0 auto ${2*e.theme.space.base}px`;let o;return o="start"===e.position?e.theme.rtl?r:n:e.theme.rtl?n:r,tn(["margin:",";width:",";height:",";"],o,t,t)})(e)),(e=>Kn(Sc,e)));Cc.defaultProps={theme:Wn};const Oc="forms.faux_input",Pc={success:"successHue",warning:"warningHue",error:"dangerHue"};function Ic(e){return e?Pc[e]:arguments.length>1&&void 0!==arguments[1]?arguments[1]:"primaryHue"}const _c=kn(xc).attrs((e=>({as:"div","aria-readonly":e.isReadOnly,"aria-disabled":e.isDisabled,"data-garden-id":Oc,"data-garden-version":"8.76.9"}))).withConfig({displayName:"StyledTextFauxInput",componentId:"sc-yqw7j9-0"})(["display:",";align-items:",";cursor:",";overflow:hidden;"," & > ","{vertical-align:",";","{box-shadow:unset;}}& > ","{flex-shrink:",";}",";"],(e=>e.mediaLayout?"inline-flex":"inline-block"),(e=>e.mediaLayout&&"baseline"),(e=>e.mediaLayout&&!e.isDisabled?"text":"default"),(e=>{const{theme:t,validation:n,focusInset:r,isBare:o,isFocused:a}=e;return tn(["",""],Ho({theme:t,inset:r,condition:!o,hue:Ic(n),shade:"warning"===n?700:600,selector:a?"&":"&:focus-within",styles:{borderColor:No(Ic(n),600,t)}}))}),xc,(e=>!e.mediaLayout&&"baseline"),Fo,Cc,(e=>e.mediaLayout&&"0"),(e=>Kn(Oc,e)));_c.defaultProps={theme:Wn};const Tc="forms.media_input",Nc=kn(xc).attrs({"data-garden-id":Tc,"data-garden-version":"8.76.9",isBare:!0}).withConfig({displayName:"StyledTextMediaInput",componentId:"sc-12i9xfi-0"})(["flex-grow:1;",";"],(e=>Kn(Tc,e)));Nc.defaultProps={theme:Wn};const jc="forms.radio_label",Ac=kn(nc).attrs({"data-garden-id":jc,"data-garden-version":"8.76.9",isRadio:!0}).withConfig({displayName:"StyledRadioLabel",componentId:"sc-1aq2e5t-0"})(["display:inline-block;position:relative;cursor:pointer;",";",";"],(e=>(e=>{const t=4*e.theme.space.base,n=t+2*e.theme.space.base,r=5*e.theme.space.base;return tn(["padding-",":","px;&[hidden]{padding-",":","px;line-height:","px;}"],e.theme.rtl?"right":"left",n,e.theme.rtl?"right":"left",t,r)})(e)),(e=>Kn(jc,e)));Ac.defaultProps={theme:Wn};const Rc="forms.checkbox_label",Lc=kn(Ac).attrs({"data-garden-id":Rc,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledCheckLabel",componentId:"sc-x7nr1-0"})(["",";"],(e=>Kn(Rc,e)));Lc.defaultProps={theme:Wn};const Mc="forms.radio_hint",Dc=kn(oc).attrs({"data-garden-id":Mc,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledRadioHint",componentId:"sc-eo8twg-0"})(["padding-",":",";",";"],(e=>e.theme.rtl?"right":"left"),(e=>ur(`${e.theme.space.base} * 6px`)),(e=>Kn(Mc,e)));Dc.defaultProps={theme:Wn};const zc="forms.checkbox_hint",Fc=kn(Dc).attrs({"data-garden-id":zc,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledCheckHint",componentId:"sc-1kl8e8c-0"})(["",";"],(e=>Kn(zc,e)));Fc.defaultProps={theme:Wn};const Hc="forms.radio",$c=kn.input.attrs({"data-garden-id":Hc,"data-garden-version":"8.76.9",type:"radio"}).withConfig({displayName:"StyledRadioInput",componentId:"sc-qsavpv-0"})(["position:absolute;opacity:0;margin:0;& ~ ","::before{position:absolute;",":0;transition:border-color .25s ease-in-out,box-shadow .1s ease-in-out,background-color .25s ease-in-out,color .25s ease-in-out;border:",";border-radius:50%;background-repeat:no-repeat;background-position:center;content:'';}& ~ "," > svg{position:absolute;}",";&:focus ~ ","::before{outline:none;}& ~ ",":active::before{transition:border-color 0.1s ease-in-out,background-color 0.1s ease-in-out,color 0.1s ease-in-out;}",";&:disabled ~ ","{cursor:default;}",";"],Ac,(e=>e.theme.rtl?"right":"left"),(e=>e.theme.borders.sm),Ac,(e=>(e=>{const t=5*e.theme.space.base+"px",n=4*e.theme.space.base+"px",r=ur(`(${t} - ${n}) / 2`),o=e.theme.iconSizes.sm,a=ur(`(${n} - ${o}) / 2`),i=ur(`${a} + ${r}`),s=e.theme.space.base*(e.isCompact?1:2)+"px";return tn(["top:",";width:",";height:",";& ~ ","::before{top:",";background-size:",";width:",";height:",";box-sizing:border-box;}& ~ "," > svg{top:",";",":",";width:",";height:",";}&& ~ "," ~ ","{margin-top:",";}"],r,n,n,Ac,r,e.theme.iconSizes.sm,n,n,Ac,i,e.theme.rtl?"right":"left",a,o,o,Ac,yc,s)})(e)),Ac,Ac,(e=>(e=>{const t=600,n=No("neutralHue",300,e.theme),r=No("background",600,e.theme),o=r,a=No("primaryHue",t,e.theme,.08),i=No("primaryHue",t,e.theme),s=i,l=No("primaryHue",t,e.theme,.2),c=s,u=s,d=u,p=No("primaryHue",700,e.theme),f=p,m=No("primaryHue",800,e.theme),h=m,g=No("neutralHue",200,e.theme);return tn(["& ~ ","::before{border-color:",";background-color:",";}& ~ "," > svg{color:",";}& ~ ",":hover::before{border-color:",";background-color:",";}"," & ~ ",":active::before{border-color:",";background-color:",";}&:checked ~ ","::before{border-color:",";background-color:",";}&:enabled:checked ~ ",":hover::before{border-color:",";background-color:",";}&:enabled:checked ~ ",":active::before{border-color:",";background-color:",";}&:disabled ~ ","::before{border-color:transparent;background-color:",";}"],Ac,n,r,Ac,o,Ac,i,a,Ho({theme:e.theme,styles:{borderColor:s},selector:`&:focus-visible ~ ${Ac}::before, &[data-garden-focus-visible='true'] ~ ${Ac}::before`}),Ac,c,l,Ac,u,d,Ac,p,f,Ac,m,h,Ac,g)})(e)),Ac,(e=>Kn(Hc,e)));$c.defaultProps={theme:Wn};const Bc="forms.checkbox",Vc=kn($c).attrs({"data-garden-id":Bc,"data-garden-version":"8.76.9",type:"checkbox"}).withConfig({displayName:"StyledCheckInput",componentId:"sc-176jxxe-0"})(["& ~ ","::before{border-radius:",";}",";",";"],Lc,(e=>e.theme.borderRadii.md),(e=>(e=>{const t=No("primaryHue",600,e.theme),n=t,r=No("primaryHue",700,e.theme),o=r,a=No("neutralHue",200,e.theme);return tn(["&:indeterminate ~ ","::before{border-color:",";background-color:",";}&:enabled:indeterminate ~ ",":active::before{border-color:",";background-color:",";}&:disabled:indeterminate ~ ","::before{border-color:transparent;background-color:",";}"],Lc,t,n,Lc,r,o,Lc,a)})(e)),(e=>Kn(Bc,e)));Vc.defaultProps={theme:Wn};const Uc="forms.radio_message",Wc=kn(yc).attrs({"data-garden-id":Uc,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledRadioMessage",componentId:"sc-1pmi0q8-0"})(["padding-",":",";",";"],(e=>e.theme.rtl?"right":"left"),(e=>ur(`${e.theme.space.base} * 6px`)),(e=>Kn(Uc,e)));Wc.defaultProps={theme:Wn};const qc="forms.checkbox_message",Gc=kn(Wc).attrs({"data-garden-id":qc,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledCheckMessage",componentId:"sc-s4p6kd-0"})(["",";"],(e=>Kn(qc,e)));var Kc;function Yc(){return Yc=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Yc.apply(null,arguments)}Gc.defaultProps={theme:Wn};const Xc="forms.check_svg",Qc=kn((function(e){return p.createElement("svg",Yc({xmlns:"http://www.w3.org/2000/svg",width:12,height:12,focusable:"false",viewBox:"0 0 12 12","aria-hidden":"true"},e),Kc||(Kc=p.createElement("path",{fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M3 6l2 2 4-4"})))})).attrs({"data-garden-id":Xc,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledCheckSvg",componentId:"sc-fvxetk-0"})(["transition:opacity 0.25s ease-in-out;opacity:0;pointer-events:none;",":checked ~ "," > &{opacity:1;}",":indeterminate ~ "," > &{opacity:0;}",";"],Vc,Lc,Vc,Lc,(e=>Kn(Xc,e)));var Jc;function Zc(){return Zc=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Zc.apply(null,arguments)}Qc.defaultProps={theme:Wn};const eu="forms.dash_svg",tu=kn((function(e){return p.createElement("svg",Zc({xmlns:"http://www.w3.org/2000/svg",width:12,height:12,focusable:"false",viewBox:"0 0 12 12","aria-hidden":"true"},e),Jc||(Jc=p.createElement("path",{stroke:"currentColor",strokeLinecap:"round",strokeWidth:2,d:"M3 6h6"})))})).attrs({"data-garden-id":eu,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledDashSvg",componentId:"sc-z3vq71-0"})(["transition:opacity 0.25s ease-in-out;opacity:0;pointer-events:none;",":indeterminate ~ "," > &{opacity:1;}",";"],Vc,Lc,(e=>Kn(eu,e)));tu.defaultProps={theme:Wn};const nu="forms.file_upload",ru=kn.div.attrs({"data-garden-id":nu,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledFileUpload",componentId:"sc-1rodjgn-0"})(["display:flex;align-items:center;justify-content:center;box-sizing:border-box;direction:",";transition:border-color 0.25s ease-in-out,box-shadow 0.1s ease-in-out,background-color 0.25s ease-in-out,color 0.25s ease-in-out;border:dashed ",";border-radius:",";cursor:pointer;text-align:center;user-select:none;",";&[aria-disabled='true']{cursor:default;}",";",";"],(e=>e.theme.rtl?"rtl":"ltr"),(e=>e.theme.borderWidths.sm),(e=>e.theme.borderRadii.md),(e=>{const t=e.theme.space.base*(e.isCompact?1:2)+"px",n=(e.isCompact?2:4)+"em",r=ur(`${e.theme.space.base*(e.isCompact?2.5:5)} - ${e.theme.borderWidths.sm}`),o=e.theme.fontSizes.md;return tn(["padding:"," ",";min-width:4em;line-height:",";font-size:",";",":not([hidden]) + &&,"," + &&,"," + &&,&& + ",",&& + ","{margin-top:",";}"],r,n,Ao(5*e.theme.space.base,o),o,nc,oc,yc,oc,yc,t)}),(e=>{const t=No("primaryHue",600,e.theme),n=No("primaryHue",700,e.theme),r=No("primaryHue",800,e.theme),o=No("neutralHue",200,e.theme),a=No("neutralHue",400,e.theme);return tn(["border-color:",";background-color:",";color:",";&:hover{border-color:",";background-color:",";color:",";}"," &:active{border-color:",";background-color:",";color:",";}&[aria-disabled='true']{border-color:",";background-color:",";color:",";}"],e.isDragging?r:No("neutralHue",600,e.theme),e.isDragging&&Dr(t,.2),e.isDragging?r:t,n,Dr(t,.08),n,Ho({theme:e.theme,hue:t}),r,Dr(t,.2),r,a,o,a)}),(e=>Kn(nu,e)));ru.defaultProps={theme:Wn};const ou="forms.file.close",au=kn.button.attrs({"data-garden-id":ou,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledFileClose",componentId:"sc-1m31jbf-0"})(["display:flex;flex-shrink:0;align-items:center;justify-content:center;transition:opacity 0.25s ease-in-out;opacity:0.8;border:none;background:transparent;cursor:pointer;color:",";appearance:none;&:hover{opacity:0.9;}&:focus{outline:none;}",";"],(e=>No("foreground",600,e.theme)),(e=>Kn(ou,e)));au.defaultProps={theme:Wn};const iu="forms.file",su=kn.div.attrs({"data-garden-id":iu,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledFile",componentId:"sc-195lzp1-0"})(["display:flex;position:relative;flex-wrap:nowrap;align-items:center;transition:box-shadow 0.1s ease-in-out;",";",";& > span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}& > [role='progressbar']{position:absolute;bottom:0;left:0;transition:opacity 0.2s ease-in-out;margin:0;border-top-left-radius:0;border-top-right-radius:0;width:100%;& > div{border-top-","-radius:0;}}& > [role='progressbar'][aria-valuenow='0'],& > [role='progressbar'][aria-valuenow='100']{opacity:0;}",";"],(e=>{const t=e.theme.space.base*(e.isCompact?7:10)+"px",n=e.theme.space.base*(e.isCompact?2:3)+"px",r=e.theme.fontSizes.md,o=Ao(5*e.theme.space.base,r);return`\n    box-sizing: border-box;\n    border: ${e.theme.borders.sm};\n    border-radius: ${e.theme.borderRadii.md};\n    padding: 0 ${n};\n    height: ${t};\n    line-height: ${o};\n    font-size: ${r};\n\n    & > span {\n      width: 100%;\n    }\n\n    & > ${au} {\n      width: ${t};\n      height: ${t};\n      margin-${e.theme.rtl?"left":"right"}: -${n};\n    }\n  `}),(e=>{let t,n,r;return"success"===e.validation?(t=No("successHue",600,e.theme),n=t,r=t):"error"===e.validation?(t=No("dangerHue",600,e.theme),n=t,r=t):(t=No("neutralHue",300,e.theme),n=No("primaryHue",600,e.theme),r=No("foreground",600,e.theme)),tn(["border-color:",";color:",";",""],t,r,Ho({theme:e.theme,inset:e.focusInset,hue:n,styles:{borderColor:n}}))}),(e=>e.theme.rtl?"right":"left"),(e=>Kn(iu,e)));su.defaultProps={theme:Wn};const lu="forms.file.delete",cu=kn(au).attrs({"data-garden-id":lu,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledFileDelete",componentId:"sc-a8nnhx-0"})(["color:",";",";"],(e=>No("dangerHue",600,e.theme)),(e=>Kn(lu,e)));cu.defaultProps={theme:Wn};const uu="forms.file.icon",du=kn((e=>{let{children:t,isCompact:n,theme:r,...o}=e;return f.cloneElement(p.Children.only(t),o)})).attrs({"data-garden-id":uu,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledFileIcon",componentId:"sc-7b3q0c-0"})(["flex-shrink:0;width:",";margin-",":","px;",";"],(e=>e.isCompact?e.theme.iconSizes.sm:e.theme.iconSizes.md),(e=>e.theme.rtl?"left":"right"),(e=>2*e.theme.space.base),(e=>Kn(uu,e)));du.defaultProps={theme:Wn};const pu="forms.file_list",fu=kn.ul.attrs({"data-garden-id":pu,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledFileList",componentId:"sc-gbahjg-0"})(["margin:0;padding:0;list-style:none;",";"],(e=>Kn(pu,e)));fu.defaultProps={theme:Wn};const mu="forms.file_list.item",hu=kn.li.attrs({"data-garden-id":mu,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledFileListItem",componentId:"sc-1ova3lo-0"})(["&:not(:first-child),"," ~ "," > &:first-child{margin-top:","px;}",";"],ru,fu,(e=>2*e.theme.space.base),(e=>Kn(mu,e)));var gu;function bu(){return bu=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},bu.apply(null,arguments)}hu.defaultProps={theme:Wn};const vu="forms.radio_svg",yu=kn((function(e){return p.createElement("svg",bu({xmlns:"http://www.w3.org/2000/svg",width:12,height:12,focusable:"false",viewBox:"0 0 12 12","aria-hidden":"true"},e),gu||(gu=p.createElement("circle",{cx:6,cy:6,r:2,fill:"currentColor"})))})).attrs({"data-garden-id":vu,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledRadioSvg",componentId:"sc-1r1qtr1-0"})(["transition:opacity 0.25s ease-in-out;opacity:0;",":checked ~ "," > &{opacity:1;}",";"],$c,Ac,(e=>Kn(vu,e)));yu.defaultProps={theme:Wn};const wu="forms.toggle_label",xu=kn(Lc).attrs({"data-garden-id":wu,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledToggleLabel",componentId:"sc-e0asdk-0"})(["",";",";"],(e=>(e=>{const t=10*e.theme.space.base,n=t+2*e.theme.space.base;return tn(["padding-",":","px;&[hidden]{padding-",":","px;}"],e.theme.rtl?"right":"left",n,e.theme.rtl?"right":"left",t)})(e)),(e=>Kn(wu,e)));xu.defaultProps={theme:Wn};const ku="forms.toggle_hint",Eu=kn(oc).attrs({"data-garden-id":ku,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledToggleHint",componentId:"sc-nziggu-0"})(["padding-",":",";",";"],(e=>e.theme.rtl?"right":"left"),(e=>ur(`${e.theme.space.base} * 12px`)),(e=>Kn(ku,e)));Eu.defaultProps={theme:Wn};const Su="forms.toggle_message",Cu=kn(yc).attrs({"data-garden-id":Su,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledToggleMessage",componentId:"sc-13vuvl1-0"})(["padding-",":",";& ","{",":",";}",";"],(e=>e.theme.rtl?"right":"left"),(e=>ur(`${e.theme.space.base} * 12px`)),bc,(e=>e.theme.rtl?"right":"left"),(e=>ur(`${e.theme.space.base} * 10px - ${e.theme.iconSizes.md}`)),(e=>Kn(Su,e)));var Ou;function Pu(){return Pu=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Pu.apply(null,arguments)}Cu.defaultProps={theme:Wn};const Iu="forms.toggle_svg",_u=kn((function(e){return p.createElement("svg",Pu({xmlns:"http://www.w3.org/2000/svg",width:16,height:16,focusable:"false",viewBox:"0 0 16 16","aria-hidden":"true"},e),Ou||(Ou=p.createElement("circle",{cx:8,cy:8,r:6,fill:"currentColor"})))})).attrs({"data-garden-id":Iu,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledToggleSvg",componentId:"sc-162xbyx-0"})(["transition:all 0.15s ease-in-out;",";"],(e=>Kn(Iu,e)));_u.defaultProps={theme:Wn};const Tu=f.forwardRef(((e,t)=>{const[n,r]=p.useState(!1),[o,a]=p.useState(!1),[i,s]=p.useState(!1),[l,c]=p.useState(!1),u=p.useRef(null),{getInputProps:d,getMessageProps:m,...h}=Es({idPrefix:e.id,hasHint:n,hasMessage:o}),g=p.useMemo((()=>({...h,getInputProps:d,getMessageProps:m,isLabelActive:i,setIsLabelActive:s,isLabelHovered:l,setIsLabelHovered:c,hasHint:n,setHasHint:r,hasMessage:o,setHasMessage:a,multiThumbRangeRef:u})),[h,d,m,i,l,n,o]);return f.createElement(Ql.Provider,{value:g},f.createElement(ec,Object.assign({},e,{ref:t})))}));Tu.displayName="Field";const Nu=p.createContext(void 0),ju=()=>p.useContext(Nu),Au=p.createContext(void 0),Ru=()=>p.useContext(Au),Lu=f.forwardRef(((e,t)=>{const{hasHint:n,setHasHint:r,getHintProps:o}=Jl()||{},a=Ru();let i;p.useEffect((()=>(!n&&r&&r(!0),()=>{n&&r&&r(!1)})),[n,r]),i="checkbox"===a?Fc:"radio"===a?Dc:"toggle"===a?Eu:oc;let s=e;return o&&(s=o(s)),f.createElement(i,Object.assign({ref:t},s))}));function Mu(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(e){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return t.some((t=>(t&&t(e,...r),e&&e.defaultPrevented)))}}Lu.displayName="Hint";const Du=f.forwardRef(((e,t)=>{const n=Jl(),r=ju(),o=Ru();let a=e;if(n&&(a=n.getLabelProps(a),void 0===o)){const{setIsLabelActive:t,setIsLabelHovered:r,multiThumbRangeRef:o}=n;a={...a,onMouseUp:Mu(e.onMouseUp,(()=>{t(!1)})),onMouseDown:Mu(e.onMouseDown,(()=>{t(!0)})),onMouseEnter:Mu(e.onMouseEnter,(()=>{r(!0)})),onMouseLeave:Mu(e.onMouseLeave,(()=>{r(!1)})),onClick:Mu(e.onClick,(()=>{o.current&&o.current.focus()}))}}if(r&&(a={...a,isRegular:void 0===a.isRegular||a.isRegular}),"radio"===o)return f.createElement(Ac,Object.assign({ref:t},a),f.createElement(yu,null),e.children);if("checkbox"===o){const r=e=>{const t=navigator?.userAgent.toLowerCase().indexOf("firefox")>-1;if(n&&t&&e.target instanceof Element){const t=e.target.getAttribute("for");if(!t)return;const n=document.getElementById(t);n&&"checkbox"===n.type&&(e.shiftKey&&(n.click(),n.checked=!0),n.focus())}};return a={...a,onClick:Mu(a.onClick,r)},f.createElement(Lc,Object.assign({ref:t},a),f.createElement(Qc,null),f.createElement(tu,null),e.children)}return"toggle"===o?f.createElement(xu,Object.assign({ref:t},a),f.createElement(_u,null),e.children):f.createElement(nc,Object.assign({ref:t},a))}));Du.displayName="Label",Du.propTypes={isRegular:Cn.bool};const zu=["success","warning","error"],Fu=f.forwardRef(((e,t)=>{let{validation:n,validationLabel:r,children:o,...a}=e;const{hasMessage:i,setHasMessage:s,getMessageProps:l}=Jl()||{},c=Ru();let u;p.useEffect((()=>(!i&&s&&s(!0),()=>{i&&s&&s(!1)})),[i,s]),u="checkbox"===c?Gc:"radio"===c?Wc:"toggle"===c?Cu:yc;let d={validation:n,validationLabel:r,...a};l&&(d=l(d));const m=Do(Fu,d,"validationLabel",n,void 0!==n);return f.createElement(u,Object.assign({ref:t},d),n&&f.createElement(bc,{validation:n,"aria-label":m}),o)}));Fu.displayName="Message",Fu.propTypes={validation:Cn.oneOf(zu),validationLabel:Cn.string};const Hu=f.forwardRef(((e,t)=>{let{indeterminate:n,children:r,...o}=e;const a=ju(),i=Jl(),s=e=>{e&&(e.indeterminate=n)};let l={ref:e=>{[s,t].forEach((t=>{t&&("function"==typeof t?t(e):t.current=e)}))},...o,...a};return i&&(l=i.getInputProps(l)),f.createElement(Au.Provider,{value:"checkbox"},f.createElement(Vc,l),r)}));Hu.displayName="Checkbox",Hu.propTypes={isCompact:Cn.bool,indeterminate:Cn.bool};const $u=p.createContext(void 0),Bu=f.forwardRef(((e,t)=>{let{onSelect:n,...r}=e;const o=Jl(),a=p.useContext($u);let i={ref:t,onSelect:r.readOnly?Mu(n,(e=>{e.currentTarget.select()})):n,...r};return a&&(i={...i,isCompact:a.isCompact||i.isCompact,focusInset:void 0===r.focusInset||r.focusInset}),o&&(i=o.getInputProps(i)),f.createElement(xc,i)}));Bu.propTypes={isCompact:Cn.bool,isBare:Cn.bool,focusInset:Cn.bool,validation:Cn.oneOf(zu)},Bu.displayName="Input";const Vu=e=>parseInt(e,10)||0,Uu=f.forwardRef(((e,t)=>{let{minRows:n,maxRows:r,style:o,onChange:a,onSelect:i,...s}=e;const l=Jl(),c=p.useRef(),u=p.useRef(null),[d,m]=p.useState({overflow:!1,height:0}),h=null!==s.value&&void 0!==s.value,g=(void 0!==n||void 0!==r)&&!s.isResizable,b=p.useCallback((()=>{if(!g)return;const e=c.current,t=window.getComputedStyle(e),o=u.current;o.style.width=t.width,o.value=e.value||e.placeholder||" ";const a=t.boxSizing,i=Vu(t.paddingBottom)+Vu(t.paddingTop),s=Vu(t.borderTopWidth)+Vu(t.borderBottomWidth),l=o.scrollHeight-i;o.value="x";const d=o.scrollHeight-i;let p=l;n&&(p=Math.max(Number(n)*d,p)),r&&(p=Math.min(Number(r)*d,p)),p=Math.max(p,d);const f=p+("border-box"===a?i+s:0),h=Math.abs(p-l)<=1;m((e=>f>0&&Math.abs((e.height||0)-f)>1||e.overflow!==h?{overflow:h,height:f}:e))}),[r,n,c,g]),v=p.useCallback((e=>{h||b(),a&&a(e)}),[b,h,a]);p.useLayoutEffect((()=>{b()}));const y={};g&&(y.height=d.height,y.overflow=d.overflow?"hidden":void 0);const w=s.readOnly?Mu(i,(e=>{e.currentTarget.select()})):i;let x={ref:ea([c,t]),rows:n,onChange:v,onSelect:w,style:{...y,...o},...s};return l&&(x=l.getInputProps(x)),f.createElement(f.Fragment,null,f.createElement(Ec,x),g&&f.createElement(Ec,{"aria-hidden":!0,readOnly:!0,isHidden:!0,className:s.className,ref:u,tabIndex:-1,isBare:s.isBare,isCompact:s.isCompact,style:o}))}));Uu.propTypes={isCompact:Cn.bool,isBare:Cn.bool,focusInset:Cn.bool,isResizable:Cn.bool,minRows:Cn.number,maxRows:Cn.number,validation:Cn.oneOf(zu)},Uu.displayName="Textarea";const Wu=e=>f.createElement(Cc,Object.assign({position:"start"},e));Wu.displayName="FauxInput.StartIcon";const qu=Wu,Gu=e=>f.createElement(Cc,Object.assign({position:"end"},e));Gu.displayName="FauxInput.EndIcon";const Ku=Gu,Yu=p.forwardRef(((e,t)=>{let{onFocus:n,onBlur:r,disabled:o,readOnly:a,isFocused:i,...s}=e;const[l,c]=p.useState(!1),u=Mu(n,(()=>{c(!0)})),d=Mu(r,(()=>{c(!1)}));return f.createElement(_c,Object.assign({onFocus:u,onBlur:d,isFocused:void 0===i?l:i,isReadOnly:a,isDisabled:o,tabIndex:o?void 0:0},s,{ref:t}))}));Yu.displayName="FauxInput",Yu.propTypes={isCompact:Cn.bool,isBare:Cn.bool,focusInset:Cn.bool,disabled:Cn.bool,readOnly:Cn.bool,validation:Cn.oneOf(zu),isFocused:Cn.bool,isHovered:Cn.bool};const Xu=Yu;function Qu(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(e){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return t.some((t=>(t&&t(e,...r),e&&e.defaultPrevented)))}}Xu.EndIcon=Ku,Xu.StartIcon=qu;const Ju={ALT:"Alt",ASTERISK:"*",BACKSPACE:"Backspace",COMMA:",",DELETE:"Delete",DOWN:"ArrowDown",END:"End",ENTER:"Enter",ESCAPE:"Escape",HOME:"Home",LEFT:"ArrowLeft",NUMPAD_ADD:"Add",NUMPAD_DECIMAL:"Decimal",NUMPAD_DIVIDE:"Divide",NUMPAD_ENTER:"Enter",NUMPAD_MULTIPLY:"Multiply",NUMPAD_SUBTRACT:"Subtract",PAGE_DOWN:"PageDown",PAGE_UP:"PageUp",PERIOD:".",RIGHT:"ArrowRight",SHIFT:"Shift",SPACE:" ",TAB:"Tab",UNIDENTIFIED:"Unidentified",UP:"ArrowUp"};let Zu=0;const ed=f.forwardRef(((e,t)=>{let{disabled:n,...r}=e;return f.createElement(ru,Object.assign({ref:t,"aria-disabled":n},r,{role:"button"}))}));ed.propTypes={isDragging:Cn.bool,isCompact:Cn.bool,disabled:Cn.bool},ed.displayName="FileUpload";const td=p.forwardRef(((e,t)=>{let{...n}=e;return f.createElement(hu,Object.assign({},n,{ref:t}))}));td.displayName="FileList.Item";const nd=td,rd=p.forwardRef(((e,t)=>{let{...n}=e;return f.createElement(fu,Object.assign({},n,{ref:t}))}));rd.displayName="FileList";const od=rd;var ad;function id(){return id=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},id.apply(null,arguments)}od.Item=nd;var sd,ld=function(e){return p.createElement("svg",id({xmlns:"http://www.w3.org/2000/svg",width:12,height:12,focusable:"false",viewBox:"0 0 12 12","aria-hidden":"true"},e),ad||(ad=p.createElement("path",{stroke:"currentColor",strokeLinecap:"round",d:"M3 9l6-6m0 6L3 3"})))};function cd(){return cd=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},cd.apply(null,arguments)}var ud=function(e){return p.createElement("svg",cd({xmlns:"http://www.w3.org/2000/svg",width:16,height:16,focusable:"false",viewBox:"0 0 16 16","aria-hidden":"true"},e),sd||(sd=p.createElement("path",{stroke:"currentColor",strokeLinecap:"round",d:"M3 13L13 3m0 10L3 3"})))};const dd=p.createContext(void 0),pd=()=>p.useContext(dd),fd=f.forwardRef(((e,t)=>{const n=pd(),r=Mu(e.onMouseDown,(e=>e.preventDefault())),o=Do(fd,e,"aria-label","Close");return f.createElement(au,Object.assign({ref:t,"aria-label":o},e,{type:"button",tabIndex:-1,onMouseDown:r}),n&&n.isCompact?f.createElement(ld,null):f.createElement(ud,null))}));fd.displayName="File.Close";const md=fd;var hd;function gd(){return gd=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},gd.apply(null,arguments)}var bd,vd=function(e){return p.createElement("svg",gd({xmlns:"http://www.w3.org/2000/svg",width:12,height:12,focusable:"false",viewBox:"0 0 12 12","aria-hidden":"true"},e),hd||(hd=p.createElement("path",{fill:"none",stroke:"currentColor",strokeLinecap:"round",d:"M4.5 2.5V1c0-.3.2-.5.5-.5h2c.3 0 .5.2.5.5v1.5M2 2.5h8m-5.5 7V5m3 4.5V5m-5-.5V11c0 .3.2.5.5.5h6c.3 0 .5-.2.5-.5V4.5"})))};function yd(){return yd=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},yd.apply(null,arguments)}var wd=function(e){return p.createElement("svg",yd({xmlns:"http://www.w3.org/2000/svg",width:16,height:16,focusable:"false",viewBox:"0 0 16 16","aria-hidden":"true"},e),bd||(bd=p.createElement("path",{fill:"none",stroke:"currentColor",strokeLinecap:"round",d:"M6.5 2.5V1c0-.3.2-.5.5-.5h2c.3 0 .5.2.5.5v1.5M3 2.5h10m-6.5 11v-8m3 8v-8m-6-1V15c0 .3.2.5.5.5h8c.3 0 .5-.2.5-.5V4.5"})))};const xd=f.forwardRef(((e,t)=>{const n=pd(),r=Mu(e.onMouseDown,(e=>e.preventDefault())),o=Do(xd,e,"aria-label","Delete");return f.createElement(cu,Object.assign({ref:t,"aria-label":o},e,{type:"button",tabIndex:-1,onMouseDown:r}),n&&n.isCompact?f.createElement(vd,null):f.createElement(wd,null))}));xd.displayName="File.Delete";const kd=xd;var Ed,Sd;function Cd(){return Cd=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Cd.apply(null,arguments)}var Od;function Pd(){return Pd=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Pd.apply(null,arguments)}var Id,_d;function Td(){return Td=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Td.apply(null,arguments)}var Nd;function jd(){return jd=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},jd.apply(null,arguments)}var Ad;function Rd(){return Rd=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Rd.apply(null,arguments)}var Ld;function Md(){return Md=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Md.apply(null,arguments)}var Dd;function zd(){return zd=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},zd.apply(null,arguments)}var Fd;function Hd(){return Hd=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Hd.apply(null,arguments)}var $d;function Bd(){return Bd=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Bd.apply(null,arguments)}var Vd,Ud;function Wd(){return Wd=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Wd.apply(null,arguments)}var qd;function Gd(){return Gd=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Gd.apply(null,arguments)}var Kd,Yd;function Xd(){return Xd=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Xd.apply(null,arguments)}var Qd;function Jd(){return Jd=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Jd.apply(null,arguments)}var Zd;function ep(){return ep=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},ep.apply(null,arguments)}var tp;function np(){return np=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},np.apply(null,arguments)}var rp;function op(){return op=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},op.apply(null,arguments)}var ap;function ip(){return ip=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},ip.apply(null,arguments)}const sp={pdf:f.createElement((function(e){return p.createElement("svg",Wd({xmlns:"http://www.w3.org/2000/svg",width:16,height:16,focusable:"false",viewBox:"0 0 16 16","aria-hidden":"true"},e),Vd||(Vd=p.createElement("path",{fill:"none",stroke:"currentColor",strokeLinecap:"round",d:"M14.5 4.2V15a.5.5 0 01-.5.5H2a.5.5 0 01-.5-.5V1A.5.5 0 012 .5h8.85a.5.5 0 01.36.15l3.15 3.2a.5.5 0 01.14.35zm-10 8.3h7m-7-2h7m-1-10V4a.5.5 0 00.5.5h3.5"})),Ud||(Ud=p.createElement("rect",{width:8,height:2,x:4,y:7,fill:"currentColor",rx:.5,ry:.5})))}),null),zip:f.createElement((function(e){return p.createElement("svg",Gd({xmlns:"http://www.w3.org/2000/svg",width:16,height:16,focusable:"false",viewBox:"0 0 16 16","aria-hidden":"true"},e),qd||(qd=p.createElement("path",{fill:"none",stroke:"currentColor",strokeLinecap:"round",d:"M6.5.5v11M5 2.5h1.5m0 1H8m-3 1h1.5m0 1H8m-3 1h1.5m0 1H8m-3 1h1.5m0 1H8m-3 1h1.5m8-6.3V15c0 .28-.22.5-.5.5H2c-.28 0-.5-.22-.5-.5V1c0-.28.22-.5.5-.5h8.85c.13 0 .26.05.36.15l3.15 3.2c.09.1.14.22.14.35zm-4-3.7V4c0 .28.22.5.5.5h3.5"})))}),null),image:f.createElement((function(e){return p.createElement("svg",Xd({xmlns:"http://www.w3.org/2000/svg",width:16,height:16,focusable:"false",viewBox:"0 0 16 16","aria-hidden":"true"},e),Kd||(Kd=p.createElement("path",{fill:"none",stroke:"currentColor",strokeLinecap:"round",d:"M14.5 4.2V15c0 .28-.22.5-.5.5H2c-.28 0-.5-.22-.5-.5V1c0-.28.22-.5.5-.5h8.85c.13 0 .26.05.36.15l3.15 3.2c.09.1.14.22.14.35zm-4-3.7V4c0 .28.22.5.5.5h3.5m-11 9l2.65-2.65c.2-.2.51-.2.71 0l1.79 1.79c.2.2.51.2.71 0l.79-.79c.2-.2.51-.2.71 0l1.65 1.65"})),Yd||(Yd=p.createElement("circle",{cx:10.5,cy:8.5,r:1.5,fill:"currentColor"})))}),null),document:f.createElement((function(e){return p.createElement("svg",Jd({xmlns:"http://www.w3.org/2000/svg",width:16,height:16,focusable:"false",viewBox:"0 0 16 16","aria-hidden":"true"},e),Qd||(Qd=p.createElement("path",{fill:"none",stroke:"currentColor",strokeLinecap:"round",d:"M4.5 7.5h7m-7 1.97h7m-7 2h7m3-7.27V15c0 .28-.22.5-.5.5H2c-.28 0-.5-.22-.5-.5V1c0-.28.22-.5.5-.5h8.85c.13 0 .26.05.36.15l3.15 3.2c.09.1.14.22.14.35zm-4-3.7V4c0 .28.22.5.5.5h3.5"})))}),null),spreadsheet:f.createElement((function(e){return p.createElement("svg",ep({xmlns:"http://www.w3.org/2000/svg",width:16,height:16,focusable:"false",viewBox:"0 0 16 16","aria-hidden":"true"},e),Zd||(Zd=p.createElement("path",{fill:"none",stroke:"currentColor",strokeLinecap:"round",d:"M4.5 7.5h2m-2 2h2m-2 2h2m2-4h3m-3 2h3m-3 2h3m3-7.3V15c0 .28-.22.5-.5.5H2c-.28 0-.5-.22-.5-.5V1c0-.28.22-.5.5-.5h8.85c.13 0 .26.05.36.15l3.15 3.2c.09.1.14.22.14.35zm-4-3.7V4c0 .28.22.5.5.5h3.5"})))}),null),presentation:f.createElement((function(e){return p.createElement("svg",np({xmlns:"http://www.w3.org/2000/svg",width:16,height:16,focusable:"false",viewBox:"0 0 16 16","aria-hidden":"true"},e),tp||(tp=p.createElement("path",{fill:"none",stroke:"currentColor",d:"M14.5 4.2V15c0 .28-.22.5-.5.5H2c-.28 0-.5-.22-.5-.5V1c0-.28.22-.5.5-.5h8.85c.13 0 .26.05.36.15l3.15 3.2c.09.1.14.22.14.35zm-4-3.7V4c0 .28.22.5.5.5h3.5M7 9.5h4c.28 0 .5.22.5.5v3c0 .28-.22.5-.5.5H7c-.28 0-.5-.22-.5-.5v-3c0-.28.22-.5.5-.5zm-.5 2H5c-.28 0-.5-.22-.5-.5V8c0-.28.22-.5.5-.5h4c.28 0 .5.22.5.5v1.5"})))}),null),generic:f.createElement((function(e){return p.createElement("svg",op({xmlns:"http://www.w3.org/2000/svg",width:16,height:16,focusable:"false",viewBox:"0 0 16 16","aria-hidden":"true"},e),rp||(rp=p.createElement("path",{fill:"none",stroke:"currentColor",d:"M14.5 4.2V15c0 .28-.22.5-.5.5H2c-.28 0-.5-.22-.5-.5V1c0-.28.22-.5.5-.5h8.85c.13 0 .26.05.36.15l3.15 3.2c.09.1.14.22.14.35zm-4-3.7V4c0 .28.22.5.5.5h3.5"})))}),null),success:f.createElement(hc,null),error:f.createElement((function(e){return p.createElement("svg",ip({xmlns:"http://www.w3.org/2000/svg",width:16,height:16,focusable:"false",viewBox:"0 0 16 16","aria-hidden":"true"},e),ap||(ap=p.createElement("path",{fill:"none",stroke:"currentColor",strokeLinecap:"round",d:"M14.5 4.205V15a.5.5 0 01-.5.5H2a.5.5 0 01-.5-.5V1A.5.5 0 012 .5h8.853a.5.5 0 01.356.15l3.148 3.204a.5.5 0 01.143.35zM10.5.5V4a.5.5 0 00.5.5h3.5m-9 8l5-5m0 5l-5-5"})))}),null)},lp={pdf:f.createElement((function(e){return p.createElement("svg",Cd({xmlns:"http://www.w3.org/2000/svg",width:12,height:12,focusable:"false",viewBox:"0 0 12 12","aria-hidden":"true"},e),Ed||(Ed=p.createElement("path",{fill:"none",stroke:"currentColor",strokeLinecap:"round",d:"M10.5 3.21V11a.5.5 0 01-.5.5H2a.5.5 0 01-.5-.5V1A.5.5 0 012 .5h5.79a.5.5 0 01.35.15l2.21 2.21a.5.5 0 01.15.35zM7.5.5V3a.5.5 0 00.5.5h2.5m-7 6h5"})),Sd||(Sd=p.createElement("rect",{width:6,height:3,x:3,y:5,fill:"currentColor",rx:.5,ry:.5})))}),null),zip:f.createElement((function(e){return p.createElement("svg",Pd({xmlns:"http://www.w3.org/2000/svg",width:12,height:12,focusable:"false",viewBox:"0 0 12 12","aria-hidden":"true"},e),Od||(Od=p.createElement("path",{fill:"none",stroke:"currentColor",strokeLinecap:"round",d:"M4.5.5v8m0-6h1m-2 1h1m0 1h1m-2 1h1m0 1h1m-2 1h1m6-4.29V11c0 .28-.22.5-.5.5H2c-.28 0-.5-.22-.5-.5V1c0-.28.22-.5.5-.5h5.79c.13 0 .26.05.35.15l2.21 2.21c.1.09.15.21.15.35zM7.5.5V3c0 .28.22.5.5.5h2.5"})))}),null),image:f.createElement((function(e){return p.createElement("svg",Td({xmlns:"http://www.w3.org/2000/svg",width:12,height:12,focusable:"false",viewBox:"0 0 12 12","aria-hidden":"true"},e),Id||(Id=p.createElement("path",{fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",d:"M10.5 3.21V11c0 .28-.22.5-.5.5H2c-.28 0-.5-.22-.5-.5V1c0-.28.22-.5.5-.5h5.79c.13 0 .26.05.35.15l2.21 2.21c.1.09.15.21.15.35zM7.5.5V3c0 .28.22.5.5.5h2.5m-7 6L5 8l1.5 1.5 1-1 1 1"})),_d||(_d=p.createElement("circle",{cx:8,cy:6,r:1,fill:"currentColor"})))}),null),document:f.createElement((function(e){return p.createElement("svg",jd({xmlns:"http://www.w3.org/2000/svg",width:12,height:12,focusable:"false",viewBox:"0 0 12 12","aria-hidden":"true"},e),Nd||(Nd=p.createElement("path",{fill:"none",stroke:"currentColor",strokeLinecap:"round",d:"M3.5 5.5h5m-5 2h5m-5 2h5m2-6.29V11c0 .28-.22.5-.5.5H2c-.28 0-.5-.22-.5-.5V1c0-.28.22-.5.5-.5h5.79c.13 0 .26.05.35.15l2.21 2.21c.1.09.15.21.15.35zM7.5.5V3c0 .28.22.5.5.5h2.5"})))}),null),spreadsheet:f.createElement((function(e){return p.createElement("svg",Rd({xmlns:"http://www.w3.org/2000/svg",width:12,height:12,focusable:"false",viewBox:"0 0 12 12","aria-hidden":"true"},e),Ad||(Ad=p.createElement("path",{fill:"none",stroke:"currentColor",strokeLinecap:"round",d:"M3.5 5.5h1m-1 2h1m-1 2h1m2-4h2m-2 2h2m-2 2h2m2-6.29V11c0 .28-.22.5-.5.5H2c-.28 0-.5-.22-.5-.5V1c0-.28.22-.5.5-.5h5.79c.13 0 .26.05.35.15l2.21 2.21c.1.09.15.21.15.35zM7.5.5V3c0 .28.22.5.5.5h2.5"})))}),null),presentation:f.createElement((function(e){return p.createElement("svg",Md({xmlns:"http://www.w3.org/2000/svg",width:12,height:12,focusable:"false",viewBox:"0 0 12 12","aria-hidden":"true"},e),Ld||(Ld=p.createElement("path",{fill:"none",stroke:"currentColor",d:"M10.5 3.21V11c0 .28-.22.5-.5.5H2c-.28 0-.5-.22-.5-.5V1c0-.28.22-.5.5-.5h5.79c.13 0 .26.05.35.15l2.21 2.21c.1.09.15.21.15.35zM6 9.5h2c.28 0 .5-.22.5-.5V8c0-.28-.22-.5-.5-.5H6c-.28 0-.5.22-.5.5v1c0 .28.22.5.5.5zm-2-2h2c.28 0 .5-.22.5-.5V6c0-.28-.22-.5-.5-.5H4c-.28 0-.5.22-.5.5v1c0 .28.22.5.5.5zm3.5-7V3c0 .28.22.5.5.5h2.5"})))}),null),generic:f.createElement((function(e){return p.createElement("svg",zd({xmlns:"http://www.w3.org/2000/svg",width:12,height:12,focusable:"false",viewBox:"0 0 12 12","aria-hidden":"true"},e),Dd||(Dd=p.createElement("path",{fill:"none",stroke:"currentColor",d:"M10.5 3.21V11c0 .28-.22.5-.5.5H2c-.28 0-.5-.22-.5-.5V1c0-.28.22-.5.5-.5h5.79c.13 0 .26.05.35.15l2.21 2.21c.1.09.15.21.15.35zM7.5.5V3c0 .28.22.5.5.5h2.5"})))}),null),success:f.createElement((function(e){return p.createElement("svg",Hd({xmlns:"http://www.w3.org/2000/svg",width:12,height:12,focusable:"false",viewBox:"0 0 12 12","aria-hidden":"true"},e),Fd||(Fd=p.createElement("g",{fill:"none",stroke:"currentColor"},p.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M3.5 6l2 2L9 4.5"}),p.createElement("circle",{cx:6,cy:6,r:5.5}))))}),null),error:f.createElement((function(e){return p.createElement("svg",Bd({xmlns:"http://www.w3.org/2000/svg",width:12,height:12,focusable:"false",viewBox:"0 0 12 12","aria-hidden":"true"},e),$d||($d=p.createElement("path",{fill:"none",stroke:"currentColor",strokeLinecap:"round",d:"M10.5 3.21V11c0 .28-.22.5-.5.5H2c-.28 0-.5-.22-.5-.5V1c0-.28.22-.5.5-.5h5.79c.13 0 .26.05.35.15l2.21 2.21c.1.09.15.21.15.35zM7.5.5V3c0 .28.22.5.5.5h2.5M4 9.5l4-4m0 4l-4-4"})))}),null)},cp=p.forwardRef(((e,t)=>{let{children:n,type:r,isCompact:o,focusInset:a,validation:i,...s}=e;const l=p.useMemo((()=>({isCompact:o})),[o]),c=i||r;return f.createElement(dd.Provider,{value:l},f.createElement(su,Object.assign({},s,{isCompact:o,focusInset:a,validation:i,ref:t}),c&&f.createElement(du,{isCompact:o},o?lp[c]:sp[c]),p.Children.map(n,(e=>"string"==typeof e?f.createElement("span",null,e):e))))}));cp.displayName="File",cp.propTypes={focusInset:Cn.bool,isCompact:Cn.bool,type:Cn.oneOf(["pdf","zip","image","document","spreadsheet","presentation","generic"]),validation:Cn.oneOf(["success","error"])};const up=cp;up.Close=md,up.Delete=kd;const dp=f.forwardRef(((e,t)=>{let{start:n,end:r,disabled:o,isCompact:a,isBare:i,focusInset:s,readOnly:l,validation:c,wrapperProps:u={},wrapperRef:d,onSelect:m,...h}=e;const g=Jl(),b=p.useRef(),[v,y]=p.useState(!1),[w,x]=p.useState(!1),{onClick:k,onFocus:E,onBlur:S,onMouseOver:C,onMouseOut:O,...P}=u,I=Mu(k,(()=>{b.current&&b.current.focus()})),_=Mu(E,(()=>{y(!0)})),T=Mu(S,(()=>{y(!1)})),N=Mu(C,(()=>{x(!0)})),j=Mu(O,(()=>{x(!1)})),A=l?Mu(m,(e=>{e.currentTarget.select()})):m;let R,L={disabled:o,readOnly:l,ref:ea([b,t]),onSelect:A,...h};return g&&(L=g.getInputProps(L),R=g.isLabelHovered),f.createElement(Xu,Object.assign({tabIndex:null,onClick:I,onFocus:_,onBlur:T,onMouseOver:N,onMouseOut:j,disabled:o,isFocused:v,isHovered:w||R,isCompact:a,isBare:i,focusInset:s,readOnly:l,validation:c,mediaLayout:!0},P,{ref:d}),n&&f.createElement(Xu.StartIcon,{isDisabled:o,isFocused:v,isHovered:w||R},n),f.createElement(Nc,L),r&&f.createElement(Xu.EndIcon,{isDisabled:o,isFocused:v,isHovered:w||R},r))}));var pp;function fp(){return fp=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},fp.apply(null,arguments)}dp.propTypes={isCompact:Cn.bool,isBare:Cn.bool,focusInset:Cn.bool,validation:Cn.oneOf(zu),start:Cn.node,end:Cn.node,wrapperProps:Cn.object,wrapperRef:Cn.any},dp.displayName="MediaInput";var mp=function(e){return p.createElement("svg",fp({xmlns:"http://www.w3.org/2000/svg",width:16,height:16,focusable:"false",viewBox:"0 0 16 16","aria-hidden":"true"},e),pp||(pp=p.createElement("path",{fill:"currentColor",d:"M12.688 5.61a.5.5 0 01.69.718l-.066.062-5 4a.5.5 0 01-.542.054l-.082-.054-5-4a.5.5 0 01.55-.83l.074.05L8 9.359l4.688-3.75z"})))};const hp=p.createContext(void 0),gp=()=>{const e=p.useContext(hp);if(!e)throw new Error("Error: this component must be rendered within a <Combobox>.");return e},bp=p.createContext(void 0),vp=()=>{const e=p.useContext(bp);if(!e)throw new Error("Error: this component must be rendered within a <Field>.");return e},yp="dropdowns.combobox.label",wp=kn(Du).attrs({"data-garden-id":yp,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledLabel",componentId:"sc-1889zee-0"})(["vertical-align:revert;",";"],(e=>Kn(yp,e)));wp.defaultProps={theme:Wn};const xp="dropdowns.combobox.hint",kp=kn(Lu).attrs({"data-garden-id":xp,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledHint",componentId:"sc-9kt30-0"})(["",";"],(e=>Kn(xp,e)));kp.defaultProps={theme:Wn};const Ep="dropdowns.combobox.message",Sp=kn(Fu).attrs({"data-garden-id":Ep,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledMessage",componentId:"sc-15eqzu4-0"})(["",";"],(e=>Kn(Ep,e)));Sp.defaultProps={theme:Wn};const Cp="dropdowns.combobox",Op=kn.div.attrs({"data-garden-id":Cp,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledCombobox",componentId:"sc-1hs98ew-0"})(["",";",";"],(e=>{const t=(e.isCompact?100:144)+"px",n=e.theme.space.base*(e.isCompact?1:2)+"px";return tn(["min-width:",";",":not([hidden]) + &&,"," + &&,"," + &&,&& + ",",&& + ","{margin-top:",";}"],t,wp,kp,Sp,kp,Sp,n)}),(e=>Kn(Cp,e)));Op.defaultProps={theme:Wn};const Pp="dropdowns.combobox.container",Ip=kn.div.attrs({"data-garden-id":Pp,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledContainer",componentId:"sc-18gcb1g-0"})(["display:flex;",";"],(e=>Kn(Pp,e)));Ip.defaultProps={theme:Wn};const _p="dropdowns.combobox.field",Tp=kn.div.attrs({"data-garden-id":_p,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledField",componentId:"sc-k7y10k-0"})(["direction:",";",";"],(e=>e.theme.rtl?"rtl":"ltr"),(e=>Kn(_p,e)));Tp.defaultProps={theme:Wn};const Np="dropdowns.combobox.floating",jp=kn.div.attrs({"data-garden-id":Np,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledFloatingListbox",componentId:"sc-xsp548-0"})(["top:0;left:0;",";",";"],(e=>zo(e.position,{theme:e.theme,hidden:e.isHidden,animationModifier:'[data-garden-animate="true"]',zIndex:e.zIndex})),(e=>Kn(Np,e)));jp.defaultProps={theme:Wn};const Ap="dropdowns.combobox.input",Rp=e=>e.isBare&&!e.isMultiselectable?5*e.theme.space.base:e.theme.space.base*(e.isCompact?5:8),Lp=e=>{const t=5*e.theme.space.base,n=e.theme.fontSizes.md,r=Ao(t,n),o=ur(`${e.theme.shadowWidths.sm} + ${(Rp(e)-t)/2}`);return tn(["min-width:",";height:","px;line-height:",";font-size:",";&&{margin-top:",";margin-bottom:",";}"],8*e.theme.space.base+"px",t,r,n,o,o)},Mp=kn.input.attrs({"data-garden-id":Ap,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledInput",componentId:"sc-m2m56e-0"})(["flex-basis:0;flex-grow:1;border:none;padding:0;font-family:inherit;&:focus{outline:none;}",";",";&[hidden]{display:revert;","}&[aria-hidden='true']{display:none;}",";"],Lp,(e=>tn(["background-color:inherit;color:inherit;&::placeholder{opacity:1;color:",";}"],No("neutralHue",400,e.theme))),(e=>e.isEditable&&{border:"0",clip:"rect(0 0 0 0)",height:"1px",margin:"-1px",overflow:"hidden",padding:"0",position:"absolute",whiteSpace:"nowrap",width:"1px"}),(e=>Kn(Ap,e)));Mp.defaultProps={theme:Wn};const Dp="dropdowns.combobox.input_group",zp=kn.div.attrs({"data-garden-id":Dp,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledInputGroup",componentId:"sc-2agt8f-0"})(["display:flex;flex-grow:1;flex-wrap:wrap;",";",";"],(e=>{const t=e.theme.shadowWidths.sm;return tn(["margin:-",";min-width:0;& > *{margin:",";}"],t,t)}),(e=>Kn(Dp,e)));zp.defaultProps={theme:Wn};const Fp="dropdowns.combobox.trigger",Hp=kn.div.attrs({"data-garden-id":Fp,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledTrigger",componentId:"sc-14t9k4c-0"})(["overflow-y:",";transition:border-color 0.25s ease-in-out,box-shadow 0.1s ease-in-out,background-color 0.25s ease-in-out,color 0.25s ease-in-out;border:",";border-radius:",";cursor:",";box-sizing:border-box;",";&:focus{outline:none;}",";&[aria-disabled='true']{cursor:default;}",";"],(e=>e.isBare&&!e.isMultiselectable?"visible":"auto"),(e=>e.isBare?"none":e.theme.borders.sm),(e=>e.isBare?"0":e.theme.borderRadii.md),(e=>!e.isAutocomplete&&e.isEditable?"text":"pointer"),(e=>{const t=Rp(e);let n,r;e.isBare?e.isMultiselectable?(n=ur(`${e.theme.shadowWidths.sm} * 2 + ${t}`),r=e.theme.shadowWidths.sm):(n=`${t}px`,r="0"):(n=`${e.theme.space.base*(e.isCompact?3:2)+t}px`,r=3*e.theme.space.base+"px");const o=e.maxHeight||n;return tn(["padding:"," ",";min-height:",";max-height:",";font-size:",";"],ur(`(${n} - ${t} - (${e.isBare?0:e.theme.borderWidths.sm} * 2)) / 2`),r,n,o,e.theme.fontSizes.md)}),(e=>{const t=600;let n="neutralHue";"success"===e.validation?n="successHue":"warning"===e.validation?n="warningHue":"error"===e.validation&&(n="dangerHue");const r=e.isBare?"transparent":No("background",600,e.theme);let o,a,i,s;e.validation?(o=No(n,t,e.theme),a=o,"warning"===e.validation?(i=No(n,700,e.theme),s=700):i=o):(o=No("neutralHue",300,e.theme),a=No("primaryHue",t,e.theme),i=a);const l=e.isBare?void 0:No("neutralHue",100,e.theme),c=No("neutralHue",200,e.theme),u=No("neutralHue",400,e.theme);return tn(["border-color:",";background-color:",";color:",";&:hover{border-color:",";}"," &[aria-disabled='true']{border-color:",";background-color:",";color:",";}"],e.isLabelHovered?a:o,r,No("foreground",600,e.theme),a,Ho({theme:e.theme,inset:e.focusInset,hue:i,shade:s,selector:"\n    &:focus-within:not([aria-disabled='true']),\n    &:focus-visible\n  ",styles:{borderColor:i},condition:!e.isBare}),c,l,u)}),(e=>Kn(Fp,e)));Hp.defaultProps={theme:Wn};const $p="dropdowns.combobox.input_icon",Bp=kn((e=>{let{children:t,isCompact:n,isDisabled:r,isEnd:o,isLabelHovered:a,isRotated:i,theme:s,...l}=e;return p.cloneElement(p.Children.only(t),l)})).attrs({"data-garden-id":$p,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledInputIcon",componentId:"sc-15ewmjl-0"})(["position:sticky;flex-shrink:0;transform:",";transition:transform 0.25s ease-in-out,color 0.25s ease-in-out;",";",";",";"],(e=>e.isRotated&&`rotate(${e.theme.rtl?"-":"+"}180deg)`),(e=>{const t=e.theme.iconSizes.md,n=ur(`(${Rp(e)} - ${t}) / 2`),r=2*e.theme.space.base+"px";let o;return o=e.isEnd?e.theme.rtl?"right":"left":e.theme.rtl?"left":"right",tn(["top:",";margin-",":",";width:",";height:",";"],n,o,r,t,t)}),(e=>{const t=No("neutralHue",600,e.theme),n=No("neutralHue",700,e.theme),r=No("neutralHue",400,e.theme);return tn(["color:",";",":hover &,",":focus-within &,",":focus &,","[data-garden-focus-visible='true'] &{color:",";}","[aria-disabled='true'] &{color:",";}"],e.isLabelHovered?n:t,Hp,Hp,Hp,Hp,n,Hp,r)}),(e=>Kn($p,e)));Bp.defaultProps={theme:Wn};const Vp="dropdowns.combobox.option",Up=e=>e.theme.space.base*(e.isCompact?7:9),Wp=kn.li.attrs({"data-garden-id":Vp,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledOption",componentId:"sc-1b5e09t-0"})(["display:flex;position:relative;transition:color 0.25s ease-in-out;cursor:",";overflow-wrap:anywhere;font-weight:",";user-select:none;&:focus{outline:none;}",";",";&[aria-disabled='true']{cursor:default;}&[aria-hidden='true']{",";}",";"],(e=>"group"===e.$type||"header"===e.$type?"default":"pointer"),(e=>"header"===e.$type||"previous"===e.$type?e.theme.fontWeights.semibold:e.theme.fontWeights.regular),(e=>{const t=e.theme.lineHeights.md,n=Up(e),r="group"===e.$type?0:9*e.theme.space.base+"px";return tn(["box-sizing:border-box;padding:"," ",";min-height:","px;line-height:",";"],"group"===e.$type?0:ur(`(${n} - ${t}) / 2`),r,n,t)}),(e=>{let t,n;if(e.isActive&&"group"!==e.$type&&"header"!==e.$type){const r="danger"===e.$type?"dangerHue":"primaryHue";t=No(r,600,e.theme,.08),n=`inset ${e.theme.rtl?`-${e.theme.shadowWidths.md}`:e.theme.shadowWidths.md} 0 ${No(r,600,e.theme)}`}const r=No("neutralHue",400,e.theme);let o=No("foreground",600,e.theme);return"add"===e.$type?o=No("primaryHue",600,e.theme):"danger"===e.$type&&(o=No("dangerHue",600,e.theme)),tn(["box-shadow:",";background-color:",";color:",";&[aria-disabled='true']{background-color:transparent;color:",";}"],n,t,o,r)}),{border:"0",clip:"rect(0 0 0 0)",height:"1px",margin:"-1px",overflow:"hidden",padding:"0",position:"absolute",whiteSpace:"nowrap",width:"1px"},(e=>Kn(Vp,e)));Wp.defaultProps={theme:Wn};const qp="dropdowns.combobox.option.content",Gp=kn.div.attrs({"data-garden-id":qp,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledOptionContent",componentId:"sc-536085-0"})(["display:flex;flex-direction:column;flex-grow:1;",";"],(e=>Kn(qp,e)));Gp.defaultProps={theme:Wn};const Kp="dropdowns.combobox.optgroup",Yp=kn.ul.attrs({"data-garden-id":Kp,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledOptGroup",componentId:"sc-12dbq5s-0"})(["margin:0;padding:0;list-style-type:none;",";"],(e=>Kn(Kp,e)));Yp.defaultProps={theme:Wn};const Xp="dropdowns.combobox.separator",Qp=kn.li.attrs({"data-garden-id":Xp,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledListboxSeparator",componentId:"sc-19umtmg-0"})(["cursor:default;",";",";",";"],(e=>tn(["margin:"," 0;height:",";"],`${e.theme.space.base}px`,e.theme.borderWidths.sm)),(e=>tn(["background-color:",";"],No("neutralHue",200,e.theme))),(e=>Kn(Xp,e)));Qp.defaultProps={theme:Wn};const Jp=kn.ul.attrs({"data-garden-id":"dropdowns.combobox.listbox","data-garden-version":"8.76.9"}).withConfig({displayName:"StyledListbox",componentId:"sc-4uxeym-0"})(["overflow-y:auto;list-style-type:none;",";&&&{display:block;}",":first-child "," ",":first-child ","[role='none']:first-child{display:none;}"],(e=>{const t=e.theme.space.base;return tn(["min-height:",";max-height:",";&&&{padding-top:","px;padding-bottom:","px;}"],void 0===e.minHeight?`${Up(e)+2*t}px`:e.minHeight,e.maxHeight,t,t)}),Wp,Gp,Yp,Qp);Jp.defaultProps={theme:Wn};const Zp="dropdowns.combobox.option.icon",ef=kn((e=>{let{children:t,theme:n,...r}=e;return p.cloneElement(p.Children.only(t),r)})).attrs({"data-garden-id":Zp,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledOptionIcon",componentId:"sc-3vecfi-0"})(["flex-shrink:0;",";",";"],(e=>{const t=e.theme.iconSizes.md,n=ur(`(${e.theme.lineHeights.md} - ${t}) / 2`),r=2*e.theme.space.base+"px";return tn(["margin-top:",";margin-",":",";width:",";height:",";"],n,e.theme.rtl?"left":"right",r,t,t)}),(e=>Kn(Zp,e)));ef.defaultProps={theme:Wn};const tf="dropdowns.combobox.option.meta",nf=kn.div.attrs({"data-garden-id":tf,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledOptionMeta",componentId:"sc-1nizjb3-0"})(["transition:color 0.25s ease-in-out;font-weight:",";",";",";",";"],(e=>e.theme.fontWeights.regular),(e=>tn(["line-height:",";font-size:",";"],e.theme.lineHeights.sm,e.theme.fontSizes.sm)),(e=>tn(["color:",";"],No("neutralHue",e.isDisabled?400:600,e.theme))),(e=>Kn(tf,e)));nf.defaultProps={theme:Wn};const rf="dropdowns.combobox.option.type_icon",of=kn((e=>{let{children:t,isCompact:n,theme:r,type:o,...a}=e;return p.cloneElement(p.Children.only(t),a)})).attrs({"data-garden-id":rf,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledOptionTypeIcon",componentId:"sc-vlhimu-0"})(["position:absolute;transform:",";transition:opacity 0.1s ease-in-out;",";",";",";"],(e=>e.theme.rtl&&("next"===e.type||"previous"===e.type)&&"rotate(180deg)"),(e=>{const t=e.theme.iconSizes.md,n=3*e.theme.space.base+"px",r=ur(`(${Up(e)} - ${t}) / 2`);let o;return o="next"===e.type?e.theme.rtl?"left":"right":e.theme.rtl?"right":"left",tn(["top:",";",":",";width:",";height:",";"],r,o,n,t,t)}),(e=>{const t=e.type&&"danger"!==e.type?1:0;let n;return n="add"===e.type||"danger"===e.type?"inherit":"header"===e.type||"next"===e.type||"previous"===e.type?No("neutralHue",600,e.theme):No("primaryHue",600,e.theme),tn(["opacity:",";color:",";","[aria-selected='true'] > &{opacity:1;}","[aria-disabled='true'] > &{color:inherit;}"],t,n,Wp,Wp)}),(e=>Kn(rf,e)));of.defaultProps={theme:Wn};const af="tags.avatar",sf=kn((e=>{let{children:t,...n}=e;return f.cloneElement(p.Children.only(t),n)})).attrs({"data-garden-id":af,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledAvatar",componentId:"sc-3kdmgt-0"})(["flex-shrink:0;font-size:0;",";"],(e=>Kn(af,e)));sf.defaultProps={theme:Wn};const lf="tags.close",cf=kn.button.attrs({"data-garden-id":lf,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledClose",componentId:"sc-d6lrpn-0"})(["display:flex;flex-shrink:0;align-items:center;justify-content:center;transition:opacity 0.25s ease-in-out;opacity:0.8;border:0;background:transparent;cursor:pointer;padding:0;color:inherit;font-size:0;appearance:none;&:hover{opacity:0.9;}&:focus{outline:none;}",";"],(e=>Kn(lf,e)));cf.defaultProps={theme:Wn};const uf="tags.tag_view",df=kn.div.attrs({"data-garden-id":uf,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledTag",componentId:"sc-1jvbe03-0"})(["display:inline-flex;flex-wrap:nowrap;align-items:center;justify-content:",";transition:box-shadow 0.1s ease-in-out;box-sizing:border-box;border:0;max-width:100%;overflow:hidden;vertical-align:middle;text-decoration:none;white-space:nowrap;font-weight:",";direction:",";",";&:hover{cursor:default;text-decoration:none;}&:link:hover,&:visited:hover{cursor:pointer;}&:any-link:hover{cursor:pointer;}","{text-decoration:none;}",";& > *{overflow:hidden;text-align:center;text-overflow:ellipsis;white-space:nowrap;}& b{font-weight:",";}& ","{display:",";}& ","{display:",";}",";"],(e=>e.isRound&&"center"),(e=>!e.isRegular&&e.theme.fontWeights.semibold),(e=>e.theme.rtl?"rtl":"ltr"),(e=>(e=>{let t,n,r,o,a,i;"small"===e.size?(t=e.theme.borderRadii.sm,n=e.theme.space.base,r=4*e.theme.space.base,o=e.theme.fontSizes.xs,i=0):"large"===e.size?(t=e.theme.borderRadii.md,n=3*e.theme.space.base,r=8*e.theme.space.base,o=e.theme.fontSizes.sm,i=6*e.theme.space.base):(t=e.theme.borderRadii.sm,n=2*e.theme.space.base,r=5*e.theme.space.base,o=e.theme.fontSizes.sm,i=4*e.theme.space.base);let s="large"===e.size?ur(`${t} - 1`):t;const l=(r-i)/2,c=e.isRound?l:2*l;return e.isRound?(t="50%",n=0,a=r,s="50%"):e.isPill&&(t="100px",s="50%","small"===e.size?(n=1.5*e.theme.space.base,a=6*e.theme.space.base):a="large"===e.size?12*e.theme.space.base:7.5*e.theme.space.base),tn(["border-radius:",";padding:0 ","px;min-width:",";height:","px;line-height:",";font-size:",";& > *{width:100%;min-width:",";}& ","{margin-",":-","px;margin-",":","px;border-radius:",";width:","px;min-width:","px;height:","px;}& ","{margin-",":-","px;border-radius:",";width:","px;height:","px;}"],t,n,a?`${a}px`:`calc(${2*n}px + 1ch)`,r,Ao(r,o),o,a?a-2*n+"px":"1ch",sf,e.theme.rtl?"right":"left",n-l,e.theme.rtl?"left":"right",c,s,i,i,i,cf,e.theme.rtl?"left":"right",n,t,r,r)})(e)),Fo,(e=>(e=>{let t,n,r;if(e.hue){const r="yellow"===e.hue?400:600;t=No(e.hue,r,e.theme),n="yellow"===e.hue||"lemon"===e.hue?No("yellow",800,e.theme):Zr(t,e.theme.palette.grey[800],e.theme.palette.white)}else t=No("neutralHue",200,e.theme),n=No("neutralHue",700,e.theme),r=No("neutralHue",600,e.theme);return tn(["background-color:",";color:",";&:hover{color:",";}"," & ","{color:",";}"],t,n,n,Ho({theme:e.theme,shadowWidth:"sm",selector:"&:focus"}),cf,r)})(e)),(e=>e.theme.fontWeights.semibold),sf,(e=>(e.isRound||"small"===e.size)&&"none"),cf,(e=>e.isRound&&"none"),(e=>Kn(uf,e)));var pf;function ff(){return ff=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},ff.apply(null,arguments)}df.defaultProps={size:"medium",theme:Wn};var mf=function(e){return p.createElement("svg",ff({xmlns:"http://www.w3.org/2000/svg",width:12,height:12,focusable:"false",viewBox:"0 0 12 12","aria-hidden":"true"},e),pf||(pf=p.createElement("path",{stroke:"currentColor",strokeLinecap:"round",d:"M3 9l6-6m0 6L3 3"})))};const hf=p.forwardRef(((e,t)=>{const n=Do(hf,e,"aria-label","Remove");return f.createElement(cf,Object.assign({ref:t,"aria-label":n},e,{type:"button",tabIndex:-1}),f.createElement(mf,null))}));hf.displayName="Tag.Close";const gf=hf,bf=e=>f.createElement(sf,e);bf.displayName="Tag.Avatar";const vf=bf,yf=p.forwardRef(((e,t)=>{let{size:n,hue:r,...o}=e;return f.createElement(df,Object.assign({ref:t,size:n,hue:r},o))}));yf.displayName="Tag",yf.propTypes={size:Cn.oneOf(["small","medium","large"]),hue:Cn.string,isPill:Cn.bool,isRound:Cn.bool,isRegular:Cn.bool},yf.defaultProps={size:"medium"};const wf=yf;wf.Avatar=vf,wf.Close=gf;const xf="dropdowns.combobox.tag",kf=kn(wf).attrs({"data-garden-id":xf,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledTag",componentId:"sc-1mrab0f-0"})(["&[aria-disabled='true']{color:",";}&[hidden]{display:revert;","}",";"],(e=>e.hue?void 0:No("neutralHue",400,e.theme)),{border:"0",clip:"rect(0 0 0 0)",height:"1px",margin:"-1px",overflow:"hidden",padding:"0",position:"absolute",whiteSpace:"nowrap",width:"1px"},(e=>Kn(xf,e)));kf.defaultProps={theme:Wn};const Ef="dropdowns.combobox.value",Sf=kn.div.attrs({"data-garden-id":Ef,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledValue",componentId:"sc-16gp0f-0"})(["flex-basis:0;flex-grow:1;cursor:",";overflow:hidden;text-overflow:ellipsis;white-space:pre;user-select:none;",";",";&[hidden]{display:none;}",";"],(e=>e.isDisabled?"default":e.isEditable&&!e.isAutocomplete?"text":"pointer"),Lp,(e=>tn(["color:",";"],e.isPlaceholder&&No("neutralHue",400,e.theme))),(e=>Kn(Ef,e)));Sf.defaultProps={theme:Wn};const Cf="dropdowns.combobox.tags_button",Of=kn(Sf).attrs({as:"button","data-garden-id":Cf,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledTagsButton",componentId:"sc-ewyffo-0"})(["display:inline-flex;flex:0 1 auto;align-items:center;border:none;background-color:transparent;cursor:pointer;min-width:auto;font-family:inherit;&:hover{text-decoration:underline;}",";&:disabled{cursor:default;text-decoration:none;}",";"],(e=>tn(["color:",";&:disabled{color:inherit;}"],No("primaryHue",600,e.theme))),(e=>Kn(Cf,e)));Of.defaultProps={theme:Wn};const Pf=Math.min,If=Math.max,_f=Math.round,Tf=Math.floor,Nf=e=>({x:e,y:e}),jf={left:"right",right:"left",bottom:"top",top:"bottom"},Af={start:"end",end:"start"};function Rf(e,t){return"function"==typeof e?e(t):e}function Lf(e){return e.split("-")[0]}function Mf(e){return e.split("-")[1]}function Df(e){return"y"===e?"height":"width"}function zf(e){return["top","bottom"].includes(Lf(e))?"y":"x"}function Ff(e){return"x"===zf(e)?"y":"x"}function Hf(e){return e.replace(/start|end/g,(e=>Af[e]))}function $f(e){return e.replace(/left|right|bottom|top/g,(e=>jf[e]))}function Bf(e){const{x:t,y:n,width:r,height:o}=e;return{width:r,height:o,top:n,left:t,right:t+r,bottom:n+o,x:t,y:n}}function Vf(e,t,n){let{reference:r,floating:o}=e;const a=zf(t),i=Ff(t),s=Df(i),l=Lf(t),c="y"===a,u=r.x+r.width/2-o.width/2,d=r.y+r.height/2-o.height/2,p=r[s]/2-o[s]/2;let f;switch(l){case"top":f={x:u,y:r.y-o.height};break;case"bottom":f={x:u,y:r.y+r.height};break;case"right":f={x:r.x+r.width,y:d};break;case"left":f={x:r.x-o.width,y:d};break;default:f={x:r.x,y:r.y}}switch(Mf(t)){case"start":f[i]-=p*(n&&c?-1:1);break;case"end":f[i]+=p*(n&&c?-1:1)}return f}async function Uf(e,t){var n;void 0===t&&(t={});const{x:r,y:o,platform:a,rects:i,elements:s,strategy:l}=e,{boundary:c="clippingAncestors",rootBoundary:u="viewport",elementContext:d="floating",altBoundary:p=!1,padding:f=0}=Rf(t,e),m=function(e){return"number"!=typeof e?function(e){return{top:0,right:0,bottom:0,left:0,...e}}(e):{top:e,right:e,bottom:e,left:e}}(f),h=s[p?"floating"===d?"reference":"floating":d],g=Bf(await a.getClippingRect({element:null==(n=await(null==a.isElement?void 0:a.isElement(h)))||n?h:h.contextElement||await(null==a.getDocumentElement?void 0:a.getDocumentElement(s.floating)),boundary:c,rootBoundary:u,strategy:l})),b="floating"===d?{x:r,y:o,width:i.floating.width,height:i.floating.height}:i.reference,v=await(null==a.getOffsetParent?void 0:a.getOffsetParent(s.floating)),y=await(null==a.isElement?void 0:a.isElement(v))&&await(null==a.getScale?void 0:a.getScale(v))||{x:1,y:1},w=Bf(a.convertOffsetParentRelativeRectToViewportRelativeRect?await a.convertOffsetParentRelativeRectToViewportRelativeRect({elements:s,rect:b,offsetParent:v,strategy:l}):b);return{top:(g.top-w.top+m.top)/y.y,bottom:(w.bottom-g.bottom+m.bottom)/y.y,left:(g.left-w.left+m.left)/y.x,right:(w.right-g.right+m.right)/y.x}}function Wf(){return"undefined"!=typeof window}function qf(e){return Yf(e)?(e.nodeName||"").toLowerCase():"#document"}function Gf(e){var t;return(null==e||null==(t=e.ownerDocument)?void 0:t.defaultView)||window}function Kf(e){var t;return null==(t=(Yf(e)?e.ownerDocument:e.document)||window.document)?void 0:t.documentElement}function Yf(e){return!!Wf()&&(e instanceof Node||e instanceof Gf(e).Node)}function Xf(e){return!!Wf()&&(e instanceof Element||e instanceof Gf(e).Element)}function Qf(e){return!!Wf()&&(e instanceof HTMLElement||e instanceof Gf(e).HTMLElement)}function Jf(e){return!(!Wf()||"undefined"==typeof ShadowRoot)&&(e instanceof ShadowRoot||e instanceof Gf(e).ShadowRoot)}function Zf(e){const{overflow:t,overflowX:n,overflowY:r,display:o}=am(e);return/auto|scroll|overlay|hidden|clip/.test(t+r+n)&&!["inline","contents"].includes(o)}function em(e){return["table","td","th"].includes(qf(e))}function tm(e){return[":popover-open",":modal"].some((t=>{try{return e.matches(t)}catch(e){return!1}}))}function nm(e){const t=rm(),n=Xf(e)?am(e):e;return"none"!==n.transform||"none"!==n.perspective||!!n.containerType&&"normal"!==n.containerType||!t&&!!n.backdropFilter&&"none"!==n.backdropFilter||!t&&!!n.filter&&"none"!==n.filter||["transform","perspective","filter"].some((e=>(n.willChange||"").includes(e)))||["paint","layout","strict","content"].some((e=>(n.contain||"").includes(e)))}function rm(){return!("undefined"==typeof CSS||!CSS.supports)&&CSS.supports("-webkit-backdrop-filter","none")}function om(e){return["html","body","#document"].includes(qf(e))}function am(e){return Gf(e).getComputedStyle(e)}function im(e){return Xf(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function sm(e){if("html"===qf(e))return e;const t=e.assignedSlot||e.parentNode||Jf(e)&&e.host||Kf(e);return Jf(t)?t.host:t}function lm(e){const t=sm(e);return om(t)?e.ownerDocument?e.ownerDocument.body:e.body:Qf(t)&&Zf(t)?t:lm(t)}function cm(e,t,n){var r;void 0===t&&(t=[]),void 0===n&&(n=!0);const o=lm(e),a=o===(null==(r=e.ownerDocument)?void 0:r.body),i=Gf(o);if(a){const e=um(i);return t.concat(i,i.visualViewport||[],Zf(o)?o:[],e&&n?cm(e):[])}return t.concat(o,cm(o,[],n))}function um(e){return e.parent&&Object.getPrototypeOf(e.parent)?e.frameElement:null}function dm(e){const t=am(e);let n=parseFloat(t.width)||0,r=parseFloat(t.height)||0;const o=Qf(e),a=o?e.offsetWidth:n,i=o?e.offsetHeight:r,s=_f(n)!==a||_f(r)!==i;return s&&(n=a,r=i),{width:n,height:r,$:s}}function pm(e){return Xf(e)?e:e.contextElement}function fm(e){const t=pm(e);if(!Qf(t))return Nf(1);const n=t.getBoundingClientRect(),{width:r,height:o,$:a}=dm(t);let i=(a?_f(n.width):n.width)/r,s=(a?_f(n.height):n.height)/o;return i&&Number.isFinite(i)||(i=1),s&&Number.isFinite(s)||(s=1),{x:i,y:s}}const mm=Nf(0);function hm(e){const t=Gf(e);return rm()&&t.visualViewport?{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}:mm}function gm(e,t,n,r){void 0===t&&(t=!1),void 0===n&&(n=!1);const o=e.getBoundingClientRect(),a=pm(e);let i=Nf(1);t&&(r?Xf(r)&&(i=fm(r)):i=fm(e));const s=function(e,t,n){return void 0===t&&(t=!1),!(!n||t&&n!==Gf(e))&&t}(a,n,r)?hm(a):Nf(0);let l=(o.left+s.x)/i.x,c=(o.top+s.y)/i.y,u=o.width/i.x,d=o.height/i.y;if(a){const e=Gf(a),t=r&&Xf(r)?Gf(r):r;let n=e,o=um(n);for(;o&&r&&t!==n;){const e=fm(o),t=o.getBoundingClientRect(),r=am(o),a=t.left+(o.clientLeft+parseFloat(r.paddingLeft))*e.x,i=t.top+(o.clientTop+parseFloat(r.paddingTop))*e.y;l*=e.x,c*=e.y,u*=e.x,d*=e.y,l+=a,c+=i,n=Gf(o),o=um(n)}}return Bf({width:u,height:d,x:l,y:c})}function bm(e,t){const n=im(e).scrollLeft;return t?t.left+n:gm(Kf(e)).left+n}function vm(e,t,n){void 0===n&&(n=!1);const r=e.getBoundingClientRect();return{x:r.left+t.scrollLeft-(n?0:bm(e,r)),y:r.top+t.scrollTop}}function ym(e,t,n){let r;if("viewport"===t)r=function(e,t){const n=Gf(e),r=Kf(e),o=n.visualViewport;let a=r.clientWidth,i=r.clientHeight,s=0,l=0;if(o){a=o.width,i=o.height;const e=rm();(!e||e&&"fixed"===t)&&(s=o.offsetLeft,l=o.offsetTop)}return{width:a,height:i,x:s,y:l}}(e,n);else if("document"===t)r=function(e){const t=Kf(e),n=im(e),r=e.ownerDocument.body,o=If(t.scrollWidth,t.clientWidth,r.scrollWidth,r.clientWidth),a=If(t.scrollHeight,t.clientHeight,r.scrollHeight,r.clientHeight);let i=-n.scrollLeft+bm(e);const s=-n.scrollTop;return"rtl"===am(r).direction&&(i+=If(t.clientWidth,r.clientWidth)-o),{width:o,height:a,x:i,y:s}}(Kf(e));else if(Xf(t))r=function(e,t){const n=gm(e,!0,"fixed"===t),r=n.top+e.clientTop,o=n.left+e.clientLeft,a=Qf(e)?fm(e):Nf(1);return{width:e.clientWidth*a.x,height:e.clientHeight*a.y,x:o*a.x,y:r*a.y}}(t,n);else{const n=hm(e);r={x:t.x-n.x,y:t.y-n.y,width:t.width,height:t.height}}return Bf(r)}function wm(e,t){const n=sm(e);return!(n===t||!Xf(n)||om(n))&&("fixed"===am(n).position||wm(n,t))}function xm(e,t,n){const r=Qf(t),o=Kf(t),a="fixed"===n,i=gm(e,!0,a,t);let s={scrollLeft:0,scrollTop:0};const l=Nf(0);if(r||!r&&!a)if(("body"!==qf(t)||Zf(o))&&(s=im(t)),r){const e=gm(t,!0,a,t);l.x=e.x+t.clientLeft,l.y=e.y+t.clientTop}else o&&(l.x=bm(o));const c=!o||r||a?Nf(0):vm(o,s);return{x:i.left+s.scrollLeft-l.x-c.x,y:i.top+s.scrollTop-l.y-c.y,width:i.width,height:i.height}}function km(e){return"static"===am(e).position}function Em(e,t){if(!Qf(e)||"fixed"===am(e).position)return null;if(t)return t(e);let n=e.offsetParent;return Kf(e)===n&&(n=n.ownerDocument.body),n}function Sm(e,t){const n=Gf(e);if(tm(e))return n;if(!Qf(e)){let t=sm(e);for(;t&&!om(t);){if(Xf(t)&&!km(t))return t;t=sm(t)}return n}let r=Em(e,t);for(;r&&em(r)&&km(r);)r=Em(r,t);return r&&om(r)&&km(r)&&!nm(r)?n:r||function(e){let t=sm(e);for(;Qf(t)&&!om(t);){if(nm(t))return t;if(tm(t))return null;t=sm(t)}return null}(e)||n}const Cm={convertOffsetParentRelativeRectToViewportRelativeRect:function(e){let{elements:t,rect:n,offsetParent:r,strategy:o}=e;const a="fixed"===o,i=Kf(r),s=!!t&&tm(t.floating);if(r===i||s&&a)return n;let l={scrollLeft:0,scrollTop:0},c=Nf(1);const u=Nf(0),d=Qf(r);if((d||!d&&!a)&&(("body"!==qf(r)||Zf(i))&&(l=im(r)),Qf(r))){const e=gm(r);c=fm(r),u.x=e.x+r.clientLeft,u.y=e.y+r.clientTop}const p=!i||d||a?Nf(0):vm(i,l,!0);return{width:n.width*c.x,height:n.height*c.y,x:n.x*c.x-l.scrollLeft*c.x+u.x+p.x,y:n.y*c.y-l.scrollTop*c.y+u.y+p.y}},getDocumentElement:Kf,getClippingRect:function(e){let{element:t,boundary:n,rootBoundary:r,strategy:o}=e;const a="clippingAncestors"===n?tm(t)?[]:function(e,t){const n=t.get(e);if(n)return n;let r=cm(e,[],!1).filter((e=>Xf(e)&&"body"!==qf(e))),o=null;const a="fixed"===am(e).position;let i=a?sm(e):e;for(;Xf(i)&&!om(i);){const t=am(i),n=nm(i);n||"fixed"!==t.position||(o=null),(a?!n&&!o:!n&&"static"===t.position&&o&&["absolute","fixed"].includes(o.position)||Zf(i)&&!n&&wm(e,i))?r=r.filter((e=>e!==i)):o=t,i=sm(i)}return t.set(e,r),r}(t,this._c):[].concat(n),i=[...a,r],s=i[0],l=i.reduce(((e,n)=>{const r=ym(t,n,o);return e.top=If(r.top,e.top),e.right=Pf(r.right,e.right),e.bottom=Pf(r.bottom,e.bottom),e.left=If(r.left,e.left),e}),ym(t,s,o));return{width:l.right-l.left,height:l.bottom-l.top,x:l.left,y:l.top}},getOffsetParent:Sm,getElementRects:async function(e){const t=this.getOffsetParent||Sm,n=this.getDimensions,r=await n(e.floating);return{reference:xm(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}},getClientRects:function(e){return Array.from(e.getClientRects())},getDimensions:function(e){const{width:t,height:n}=dm(e);return{width:t,height:n}},getScale:fm,isElement:Xf,isRTL:function(e){return"rtl"===am(e).direction}};function Om(e,t,n,r){void 0===r&&(r={});const{ancestorScroll:o=!0,ancestorResize:a=!0,elementResize:i="function"==typeof ResizeObserver,layoutShift:s="function"==typeof IntersectionObserver,animationFrame:l=!1}=r,c=pm(e),u=o||a?[...c?cm(c):[],...cm(t)]:[];u.forEach((e=>{o&&e.addEventListener("scroll",n,{passive:!0}),a&&e.addEventListener("resize",n)}));const d=c&&s?function(e,t){let n,r=null;const o=Kf(e);function a(){var e;clearTimeout(n),null==(e=r)||e.disconnect(),r=null}return function i(s,l){void 0===s&&(s=!1),void 0===l&&(l=1),a();const{left:c,top:u,width:d,height:p}=e.getBoundingClientRect();if(s||t(),!d||!p)return;const f={rootMargin:-Tf(u)+"px "+-Tf(o.clientWidth-(c+d))+"px "+-Tf(o.clientHeight-(u+p))+"px "+-Tf(c)+"px",threshold:If(0,Pf(1,l))||1};let m=!0;function h(e){const t=e[0].intersectionRatio;if(t!==l){if(!m)return i();t?i(!1,t):n=setTimeout((()=>{i(!1,1e-7)}),1e3)}m=!1}try{r=new IntersectionObserver(h,{...f,root:o.ownerDocument})}catch(e){r=new IntersectionObserver(h,f)}r.observe(e)}(!0),a}(c,n):null;let p,f=-1,m=null;i&&(m=new ResizeObserver((e=>{let[r]=e;r&&r.target===c&&m&&(m.unobserve(t),cancelAnimationFrame(f),f=requestAnimationFrame((()=>{var e;null==(e=m)||e.observe(t)}))),n()})),c&&!l&&m.observe(c),m.observe(t));let h=l?gm(e):null;return l&&function t(){const r=gm(e);!h||r.x===h.x&&r.y===h.y&&r.width===h.width&&r.height===h.height||n();h=r,p=requestAnimationFrame(t)}(),n(),()=>{var e;u.forEach((e=>{o&&e.removeEventListener("scroll",n),a&&e.removeEventListener("resize",n)})),null==d||d(),null==(e=m)||e.disconnect(),m=null,l&&cancelAnimationFrame(p)}}const Pm=function(e){return void 0===e&&(e=0),{name:"offset",options:e,async fn(t){var n,r;const{x:o,y:a,placement:i,middlewareData:s}=t,l=await async function(e,t){const{placement:n,platform:r,elements:o}=e,a=await(null==r.isRTL?void 0:r.isRTL(o.floating)),i=Lf(n),s=Mf(n),l="y"===zf(n),c=["left","top"].includes(i)?-1:1,u=a&&l?-1:1,d=Rf(t,e);let{mainAxis:p,crossAxis:f,alignmentAxis:m}="number"==typeof d?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:d.mainAxis||0,crossAxis:d.crossAxis||0,alignmentAxis:d.alignmentAxis};return s&&"number"==typeof m&&(f="end"===s?-1*m:m),l?{x:f*u,y:p*c}:{x:p*c,y:f*u}}(t,e);return i===(null==(n=s.offset)?void 0:n.placement)&&null!=(r=s.arrow)&&r.alignmentOffset?{}:{x:o+l.x,y:a+l.y,data:{...l,placement:i}}}}},Im=function(e){return void 0===e&&(e={}),{name:"flip",options:e,async fn(t){var n,r;const{placement:o,middlewareData:a,rects:i,initialPlacement:s,platform:l,elements:c}=t,{mainAxis:u=!0,crossAxis:d=!0,fallbackPlacements:p,fallbackStrategy:f="bestFit",fallbackAxisSideDirection:m="none",flipAlignment:h=!0,...g}=Rf(e,t);if(null!=(n=a.arrow)&&n.alignmentOffset)return{};const b=Lf(o),v=zf(s),y=Lf(s)===s,w=await(null==l.isRTL?void 0:l.isRTL(c.floating)),x=p||(y||!h?[$f(s)]:function(e){const t=$f(e);return[Hf(e),t,Hf(t)]}(s)),k="none"!==m;!p&&k&&x.push(...function(e,t,n,r){const o=Mf(e);let a=function(e,t,n){const r=["left","right"],o=["right","left"],a=["top","bottom"],i=["bottom","top"];switch(e){case"top":case"bottom":return n?t?o:r:t?r:o;case"left":case"right":return t?a:i;default:return[]}}(Lf(e),"start"===n,r);return o&&(a=a.map((e=>e+"-"+o)),t&&(a=a.concat(a.map(Hf)))),a}(s,h,m,w));const E=[s,...x],S=await Uf(t,g),C=[];let O=(null==(r=a.flip)?void 0:r.overflows)||[];if(u&&C.push(S[b]),d){const e=function(e,t,n){void 0===n&&(n=!1);const r=Mf(e),o=Ff(e),a=Df(o);let i="x"===o?r===(n?"end":"start")?"right":"left":"start"===r?"bottom":"top";return t.reference[a]>t.floating[a]&&(i=$f(i)),[i,$f(i)]}(o,i,w);C.push(S[e[0]],S[e[1]])}if(O=[...O,{placement:o,overflows:C}],!C.every((e=>e<=0))){var P,I;const e=((null==(P=a.flip)?void 0:P.index)||0)+1,t=E[e];if(t)return{data:{index:e,overflows:O},reset:{placement:t}};let n=null==(I=O.filter((e=>e.overflows[0]<=0)).sort(((e,t)=>e.overflows[1]-t.overflows[1]))[0])?void 0:I.placement;if(!n)switch(f){case"bestFit":{var _;const e=null==(_=O.filter((e=>{if(k){const t=zf(e.placement);return t===v||"y"===t}return!0})).map((e=>[e.placement,e.overflows.filter((e=>e>0)).reduce(((e,t)=>e+t),0)])).sort(((e,t)=>e[1]-t[1]))[0])?void 0:_[0];e&&(n=e);break}case"initialPlacement":n=s}if(o!==n)return{reset:{placement:n}}}return{}}}},_m=function(e){return void 0===e&&(e={}),{name:"size",options:e,async fn(t){var n,r;const{placement:o,rects:a,platform:i,elements:s}=t,{apply:l=(()=>{}),...c}=Rf(e,t),u=await Uf(t,c),d=Lf(o),p=Mf(o),f="y"===zf(o),{width:m,height:h}=a.floating;let g,b;"top"===d||"bottom"===d?(g=d,b=p===(await(null==i.isRTL?void 0:i.isRTL(s.floating))?"start":"end")?"left":"right"):(b=d,g="end"===p?"top":"bottom");const v=h-u.top-u.bottom,y=m-u.left-u.right,w=Pf(h-u[g],v),x=Pf(m-u[b],y),k=!t.middlewareData.shift;let E=w,S=x;if(null!=(n=t.middlewareData.shift)&&n.enabled.x&&(S=y),null!=(r=t.middlewareData.shift)&&r.enabled.y&&(E=v),k&&!p){const e=If(u.left,0),t=If(u.right,0),n=If(u.top,0),r=If(u.bottom,0);f?S=m-2*(0!==e||0!==t?e+t:If(u.left,u.right)):E=h-2*(0!==n||0!==r?n+r:If(u.top,u.bottom))}await l({...t,availableWidth:S,availableHeight:E});const C=await i.getDimensions(s.floating);return m!==C.width||h!==C.height?{reset:{rects:!0}}:{}}}},Tm=(e,t,n)=>{const r=new Map,o={platform:Cm,...n},a={...o.platform,_c:r};return(async(e,t,n)=>{const{placement:r="bottom",strategy:o="absolute",middleware:a=[],platform:i}=n,s=a.filter(Boolean),l=await(null==i.isRTL?void 0:i.isRTL(t));let c=await i.getElementRects({reference:e,floating:t,strategy:o}),{x:u,y:d}=Vf(c,r,l),p=r,f={},m=0;for(let n=0;n<s.length;n++){const{name:a,fn:h}=s[n],{x:g,y:b,data:v,reset:y}=await h({x:u,y:d,initialPlacement:r,placement:p,strategy:o,middlewareData:f,rects:c,platform:i,elements:{reference:e,floating:t}});u=null!=g?g:u,d=null!=b?b:d,f={...f,[a]:{...f[a],...v}},y&&m<=50&&(m++,"object"==typeof y&&(y.placement&&(p=y.placement),y.rects&&(c=!0===y.rects?await i.getElementRects({reference:e,floating:t,strategy:o}):y.rects),({x:u,y:d}=Vf(c,p,l))),n=-1)}return{x:u,y:d,placement:p,strategy:o,middlewareData:f}})(e,t,{...o,platform:a})};var Nm="undefined"!=typeof document?p.useLayoutEffect:p.useEffect;function jm(e,t){if(e===t)return!0;if(typeof e!=typeof t)return!1;if("function"==typeof e&&e.toString()===t.toString())return!0;let n,r,o;if(e&&t&&"object"==typeof e){if(Array.isArray(e)){if(n=e.length,n!==t.length)return!1;for(r=n;0!=r--;)if(!jm(e[r],t[r]))return!1;return!0}if(o=Object.keys(e),n=o.length,n!==Object.keys(t).length)return!1;for(r=n;0!=r--;)if(!{}.hasOwnProperty.call(t,o[r]))return!1;for(r=n;0!=r--;){const n=o[r];if(("_owner"!==n||!e.$$typeof)&&!jm(e[n],t[n]))return!1}return!0}return e!=e&&t!=t}function Am(e){if("undefined"==typeof window)return 1;return(e.ownerDocument.defaultView||window).devicePixelRatio||1}function Rm(e,t){const n=Am(e);return Math.round(t*n)/n}function Lm(e){const t=p.useRef(e);return Nm((()=>{t.current=e})),t}const Mm=(e,t)=>({...Im(e),options:[e,t]}),Dm=(e,t)=>({..._m(e),options:[e,t]});function zm(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(e){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return t.some((t=>(t&&t(e,...r),e&&e.defaultPrevented)))}}const Fm=p.forwardRef(((e,t)=>{let{appendToNode:n,children:r,isCompact:o,isExpanded:a,maxHeight:i,minHeight:s,onMouseDown:l,triggerRef:c,zIndex:u,...d}=e;const m=p.useRef(null),[h,g]=p.useState(!1),[b,v]=p.useState(),[y,w]=p.useState(),x=p.useContext(pn)||Wn,{refs:k,placement:E,update:C,floatingStyles:{transform:O}}=function(e){void 0===e&&(e={});const{placement:t="bottom",strategy:n="absolute",middleware:r=[],platform:o,elements:{reference:a,floating:i}={},transform:s=!0,whileElementsMounted:l,open:c}=e,[u,d]=p.useState({x:0,y:0,strategy:n,placement:t,middlewareData:{},isPositioned:!1}),[f,m]=p.useState(r);jm(f,r)||m(r);const[h,g]=p.useState(null),[b,v]=p.useState(null),y=p.useCallback((e=>{e!==E.current&&(E.current=e,g(e))}),[]),w=p.useCallback((e=>{e!==C.current&&(C.current=e,v(e))}),[]),x=a||h,k=i||b,E=p.useRef(null),C=p.useRef(null),O=p.useRef(u),P=null!=l,I=Lm(l),_=Lm(o),T=Lm(c),N=p.useCallback((()=>{if(!E.current||!C.current)return;const e={placement:t,strategy:n,middleware:f};_.current&&(e.platform=_.current),Tm(E.current,C.current,e).then((e=>{const t={...e,isPositioned:!1!==T.current};j.current&&!jm(O.current,t)&&(O.current=t,S.flushSync((()=>{d(t)})))}))}),[f,t,n,_,T]);Nm((()=>{!1===c&&O.current.isPositioned&&(O.current.isPositioned=!1,d((e=>({...e,isPositioned:!1}))))}),[c]);const j=p.useRef(!1);Nm((()=>(j.current=!0,()=>{j.current=!1})),[]),Nm((()=>{if(x&&(E.current=x),k&&(C.current=k),x&&k){if(I.current)return I.current(x,k,N);N()}}),[x,k,N,I,P]);const A=p.useMemo((()=>({reference:E,floating:C,setReference:y,setFloating:w})),[y,w]),R=p.useMemo((()=>({reference:x,floating:k})),[x,k]),L=p.useMemo((()=>{const e={position:n,left:0,top:0};if(!R.floating)return e;const t=Rm(R.floating,u.x),r=Rm(R.floating,u.y);return s?{...e,transform:"translate("+t+"px, "+r+"px)",...Am(R.floating)>=1.5&&{willChange:"transform"}}:{position:n,left:t,top:r}}),[n,s,R.floating,u.x,u.y]);return p.useMemo((()=>({...u,update:N,refs:A,elements:R,floatingStyles:L})),[u,N,A,R,L])}({elements:{reference:c?.current,floating:m?.current},placement:"bottom-start",middleware:[(P=x.space.base,{...Pm(P),options:[P,I]}),Mm(),Dm({apply:e=>{let{rects:t,availableHeight:n}=e;t.reference.width>0&&(w(t.reference.width),null!==s&&"fit-content"!==s&&t.floating.height>n&&v(n))}})]});var P,I;p.useEffect((()=>{let e;return a&&k.reference.current&&k.floating.current&&(e=Om(k.reference.current,k.floating.current,C,{elementResize:"function"==typeof ResizeObserver})),()=>e&&e()}),[a,k.reference,k.floating,C]),p.useEffect((()=>{let e;return a?g(!0):e=setTimeout((()=>{g(!1),v(void 0)}),200),()=>clearTimeout(e)}),[a]),p.useEffect((()=>{b&&(v(void 0),C())}),[r,C]);const _=f.createElement(jp,{"data-garden-animate":h?"true":"false",isHidden:!a,position:"bottom-start"===E?"bottom":"top",style:{transform:O,width:y},zIndex:u,ref:m},f.createElement(Jp,Object.assign({"aria-hidden":!a,isCompact:o,maxHeight:i,minHeight:s,onMouseDown:zm(l,(e=>e.preventDefault())),style:{height:b}},d,{ref:t}),h&&r));return n?S.createPortal(_,n):_}));Fm.displayName="Listbox",Fm.propTypes={appendToNode:Cn.any,isCompact:Cn.bool,isExpanded:Cn.bool,maxHeight:Cn.string,triggerRef:Cn.any.isRequired,zIndex:Cn.number};const Hm=e=>"string"==typeof e.value?e.value:JSON.stringify(e.value),$m=e=>({value:e.value,label:e.label,hidden:e.isHidden,disabled:e.isDisabled,selected:e.isSelected}),Bm=(e,t)=>p.Children.toArray(e).reduce(((e,n)=>{const r=e;if(p.isValidElement(n))if("value"in n.props)r.push($m(n.props)),t[Hm(n.props)]=n.props.tagProps;else{const e=n.props,o=Bm(e.children,t);r.push({label:e.label,options:o})}return r}),[]),Vm=function(e){let{delayMilliseconds:t=500,id:n,isVisible:r}=void 0===e?{}:e;const[o,a]=p.useState(r),i=xi().gen,s=p.useMemo((()=>n||i("tooltip_1.0.20")),[n,i]),l=p.useRef(!1),c=p.useRef(),u=p.useRef(),d=function(e){void 0===e&&(e=t),clearTimeout(u.current);const n=setTimeout((()=>{l.current&&a(!0)}),e);c.current=Number(n)},f=function(e){void 0===e&&(e=t),clearTimeout(c.current);const n=setTimeout((()=>{l.current&&a(!1)}),e);u.current=Number(n)};p.useEffect((()=>(l.current=!0,()=>{l.current=!1})),[]),p.useEffect((()=>()=>{clearTimeout(c.current),clearTimeout(u.current)}),[u,c]);return{isVisible:o,getTooltipProps:function(e){let{role:t="tooltip",onMouseEnter:n,onMouseLeave:r,...a}=void 0===e?{}:e;return{role:t,onMouseEnter:Qu(n,(()=>d())),onMouseLeave:Qu(r,(()=>f())),"aria-hidden":!o,id:s,...a}},getTriggerProps:function(e){let{tabIndex:t=0,onMouseEnter:n,onMouseLeave:r,onFocus:a,onBlur:i,onKeyDown:l,...c}=void 0===e?{}:e;return{tabIndex:t,onMouseEnter:Qu(n,(()=>d())),onMouseLeave:Qu(r,(()=>f())),onFocus:Qu(a,(()=>d())),onBlur:Qu(i,(()=>f(0))),onKeyDown:Qu(l,(e=>{e.key===Ju.ESCAPE&&o&&f(0)})),"aria-describedby":s,"data-garden-container-id":"containers.tooltip","data-garden-container-version":"1.0.20",...c}},openTooltip:d,closeTooltip:f}};function Um(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(e){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return t.some((t=>(t&&t(e,...r),e&&e.defaultPrevented)))}}function Wm(e){return Wm="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Wm(e)}function qm(e){var t=function(e,t){if("object"!==Wm(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,t||"default");if("object"!==Wm(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===Wm(t)?t:String(t)}function Gm(e,t,n){return(t=qm(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Cn.func,Cn.func,Cn.number,Cn.bool;var Km,Ym,Xm=Object.prototype.toString,Qm=function(e){var t=Xm.call(e),n="[object Arguments]"===t;return n||(n="[object Array]"!==t&&null!==e&&"object"==typeof e&&"number"==typeof e.length&&e.length>=0&&"[object Function]"===Xm.call(e.callee)),n};var Jm=Array.prototype.slice,Zm=Qm,eh=Object.keys,th=eh?function(e){return eh(e)}:function(){if(Ym)return Km;var e;if(Ym=1,!Object.keys){var t=Object.prototype.hasOwnProperty,n=Object.prototype.toString,r=Qm,o=Object.prototype.propertyIsEnumerable,a=!o.call({toString:null},"toString"),i=o.call((function(){}),"prototype"),s=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],l=function(e){var t=e.constructor;return t&&t.prototype===e},c={$applicationCache:!0,$console:!0,$external:!0,$frame:!0,$frameElement:!0,$frames:!0,$innerHeight:!0,$innerWidth:!0,$onmozfullscreenchange:!0,$onmozfullscreenerror:!0,$outerHeight:!0,$outerWidth:!0,$pageXOffset:!0,$pageYOffset:!0,$parent:!0,$scrollLeft:!0,$scrollTop:!0,$scrollX:!0,$scrollY:!0,$self:!0,$webkitIndexedDB:!0,$webkitStorageInfo:!0,$window:!0},u=function(){if("undefined"==typeof window)return!1;for(var e in window)try{if(!c["$"+e]&&t.call(window,e)&&null!==window[e]&&"object"==typeof window[e])try{l(window[e])}catch(e){return!0}}catch(e){return!0}return!1}();e=function(e){var o=null!==e&&"object"==typeof e,c="[object Function]"===n.call(e),d=r(e),p=o&&"[object String]"===n.call(e),f=[];if(!o&&!c&&!d)throw new TypeError("Object.keys called on a non-object");var m=i&&c;if(p&&e.length>0&&!t.call(e,0))for(var h=0;h<e.length;++h)f.push(String(h));if(d&&e.length>0)for(var g=0;g<e.length;++g)f.push(String(g));else for(var b in e)m&&"prototype"===b||!t.call(e,b)||f.push(String(b));if(a)for(var v=function(e){if("undefined"==typeof window||!u)return l(e);try{return l(e)}catch(e){return!1}}(e),y=0;y<s.length;++y)v&&"constructor"===s[y]||!t.call(e,s[y])||f.push(s[y]);return f}}return Km=e}(),nh=Object.keys;th.shim=function(){if(Object.keys){var e=function(){var e=Object.keys(arguments);return e&&e.length===arguments.length}(1,2);e||(Object.keys=function(e){return Zm(e)?nh(Jm.call(e)):nh(e)})}else Object.keys=th;return Object.keys||th};var rh,oh=th,ah=function(){if("function"!=typeof Symbol||"function"!=typeof Object.getOwnPropertySymbols)return!1;if("symbol"==typeof Symbol.iterator)return!0;var e={},t=Symbol("test"),n=Object(t);if("string"==typeof t)return!1;if("[object Symbol]"!==Object.prototype.toString.call(t))return!1;if("[object Symbol]"!==Object.prototype.toString.call(n))return!1;for(t in e[t]=42,e)return!1;if("function"==typeof Object.keys&&0!==Object.keys(e).length)return!1;if("function"==typeof Object.getOwnPropertyNames&&0!==Object.getOwnPropertyNames(e).length)return!1;var r=Object.getOwnPropertySymbols(e);if(1!==r.length||r[0]!==t)return!1;if(!Object.prototype.propertyIsEnumerable.call(e,t))return!1;if("function"==typeof Object.getOwnPropertyDescriptor){var o=Object.getOwnPropertyDescriptor(e,t);if(42!==o.value||!0!==o.enumerable)return!1}return!0},ih=ah,sh=function(){return ih()&&!!Symbol.toStringTag},lh="undefined"!=typeof Symbol&&Symbol,ch=ah,uh={foo:{}},dh=Object,ph=Array.prototype.slice,fh=Object.prototype.toString,mh=function(e){var t=this;if("function"!=typeof t||"[object Function]"!==fh.call(t))throw new TypeError("Function.prototype.bind called on incompatible "+t);for(var n,r=ph.call(arguments,1),o=Math.max(0,t.length-r.length),a=[],i=0;i<o;i++)a.push("$"+i);if(n=Function("binder","return function ("+a.join(",")+"){ return binder.apply(this,arguments); }")((function(){if(this instanceof n){var o=t.apply(this,r.concat(ph.call(arguments)));return Object(o)===o?o:this}return t.apply(e,r.concat(ph.call(arguments)))})),t.prototype){var s=function(){};s.prototype=t.prototype,n.prototype=new s,s.prototype=null}return n},hh=Function.prototype.bind||mh,gh=Array.prototype.slice,bh=Object.prototype.toString,vh=function(e){var t=this;if("function"!=typeof t||"[object Function]"!==bh.call(t))throw new TypeError("Function.prototype.bind called on incompatible "+t);for(var n,r=gh.call(arguments,1),o=Math.max(0,t.length-r.length),a=[],i=0;i<o;i++)a.push("$"+i);if(n=Function("binder","return function ("+a.join(",")+"){ return binder.apply(this,arguments); }")((function(){if(this instanceof n){var o=t.apply(this,r.concat(gh.call(arguments)));return Object(o)===o?o:this}return t.apply(e,r.concat(gh.call(arguments)))})),t.prototype){var s=function(){};s.prototype=t.prototype,n.prototype=new s,s.prototype=null}return n},yh=(Function.prototype.bind||vh).call(Function.call,Object.prototype.hasOwnProperty),wh=SyntaxError,xh=Function,kh=TypeError,Eh=function(e){try{return xh('"use strict"; return ('+e+").constructor;")()}catch(e){}},Sh=Object.getOwnPropertyDescriptor;if(Sh)try{Sh({},"")}catch(Ds){Sh=null}var Ch=function(){throw new kh},Oh=Sh?function(){try{return Ch}catch(e){try{return Sh(arguments,"callee").get}catch(e){return Ch}}}():Ch,Ph="function"==typeof lh&&"function"==typeof Symbol&&"symbol"==typeof lh("foo")&&"symbol"==typeof Symbol("bar")&&ch(),Ih={__proto__:uh}.foo===uh.foo&&!({__proto__:null}instanceof dh),_h=Object.getPrototypeOf||(Ih?function(e){return e.__proto__}:null),Th={},Nh="undefined"!=typeof Uint8Array&&_h?_h(Uint8Array):rh,jh={"%AggregateError%":"undefined"==typeof AggregateError?rh:AggregateError,"%Array%":Array,"%ArrayBuffer%":"undefined"==typeof ArrayBuffer?rh:ArrayBuffer,"%ArrayIteratorPrototype%":Ph&&_h?_h([][Symbol.iterator]()):rh,"%AsyncFromSyncIteratorPrototype%":rh,"%AsyncFunction%":Th,"%AsyncGenerator%":Th,"%AsyncGeneratorFunction%":Th,"%AsyncIteratorPrototype%":Th,"%Atomics%":"undefined"==typeof Atomics?rh:Atomics,"%BigInt%":"undefined"==typeof BigInt?rh:BigInt,"%BigInt64Array%":"undefined"==typeof BigInt64Array?rh:BigInt64Array,"%BigUint64Array%":"undefined"==typeof BigUint64Array?rh:BigUint64Array,"%Boolean%":Boolean,"%DataView%":"undefined"==typeof DataView?rh:DataView,"%Date%":Date,"%decodeURI%":decodeURI,"%decodeURIComponent%":decodeURIComponent,"%encodeURI%":encodeURI,"%encodeURIComponent%":encodeURIComponent,"%Error%":Error,"%eval%":eval,"%EvalError%":EvalError,"%Float32Array%":"undefined"==typeof Float32Array?rh:Float32Array,"%Float64Array%":"undefined"==typeof Float64Array?rh:Float64Array,"%FinalizationRegistry%":"undefined"==typeof FinalizationRegistry?rh:FinalizationRegistry,"%Function%":xh,"%GeneratorFunction%":Th,"%Int8Array%":"undefined"==typeof Int8Array?rh:Int8Array,"%Int16Array%":"undefined"==typeof Int16Array?rh:Int16Array,"%Int32Array%":"undefined"==typeof Int32Array?rh:Int32Array,"%isFinite%":isFinite,"%isNaN%":isNaN,"%IteratorPrototype%":Ph&&_h?_h(_h([][Symbol.iterator]())):rh,"%JSON%":"object"==typeof JSON?JSON:rh,"%Map%":"undefined"==typeof Map?rh:Map,"%MapIteratorPrototype%":"undefined"!=typeof Map&&Ph&&_h?_h((new Map)[Symbol.iterator]()):rh,"%Math%":Math,"%Number%":Number,"%Object%":Object,"%parseFloat%":parseFloat,"%parseInt%":parseInt,"%Promise%":"undefined"==typeof Promise?rh:Promise,"%Proxy%":"undefined"==typeof Proxy?rh:Proxy,"%RangeError%":RangeError,"%ReferenceError%":ReferenceError,"%Reflect%":"undefined"==typeof Reflect?rh:Reflect,"%RegExp%":RegExp,"%Set%":"undefined"==typeof Set?rh:Set,"%SetIteratorPrototype%":"undefined"!=typeof Set&&Ph&&_h?_h((new Set)[Symbol.iterator]()):rh,"%SharedArrayBuffer%":"undefined"==typeof SharedArrayBuffer?rh:SharedArrayBuffer,"%String%":String,"%StringIteratorPrototype%":Ph&&_h?_h(""[Symbol.iterator]()):rh,"%Symbol%":Ph?Symbol:rh,"%SyntaxError%":wh,"%ThrowTypeError%":Oh,"%TypedArray%":Nh,"%TypeError%":kh,"%Uint8Array%":"undefined"==typeof Uint8Array?rh:Uint8Array,"%Uint8ClampedArray%":"undefined"==typeof Uint8ClampedArray?rh:Uint8ClampedArray,"%Uint16Array%":"undefined"==typeof Uint16Array?rh:Uint16Array,"%Uint32Array%":"undefined"==typeof Uint32Array?rh:Uint32Array,"%URIError%":URIError,"%WeakMap%":"undefined"==typeof WeakMap?rh:WeakMap,"%WeakRef%":"undefined"==typeof WeakRef?rh:WeakRef,"%WeakSet%":"undefined"==typeof WeakSet?rh:WeakSet};if(_h)try{null.error}catch(Ds){var Ah=_h(_h(Ds));jh["%Error.prototype%"]=Ah}var Rh=function e(t){var n;if("%AsyncFunction%"===t)n=Eh("async function () {}");else if("%GeneratorFunction%"===t)n=Eh("function* () {}");else if("%AsyncGeneratorFunction%"===t)n=Eh("async function* () {}");else if("%AsyncGenerator%"===t){var r=e("%AsyncGeneratorFunction%");r&&(n=r.prototype)}else if("%AsyncIteratorPrototype%"===t){var o=e("%AsyncGenerator%");o&&_h&&(n=_h(o.prototype))}return jh[t]=n,n},Lh={"%ArrayBufferPrototype%":["ArrayBuffer","prototype"],"%ArrayPrototype%":["Array","prototype"],"%ArrayProto_entries%":["Array","prototype","entries"],"%ArrayProto_forEach%":["Array","prototype","forEach"],"%ArrayProto_keys%":["Array","prototype","keys"],"%ArrayProto_values%":["Array","prototype","values"],"%AsyncFunctionPrototype%":["AsyncFunction","prototype"],"%AsyncGenerator%":["AsyncGeneratorFunction","prototype"],"%AsyncGeneratorPrototype%":["AsyncGeneratorFunction","prototype","prototype"],"%BooleanPrototype%":["Boolean","prototype"],"%DataViewPrototype%":["DataView","prototype"],"%DatePrototype%":["Date","prototype"],"%ErrorPrototype%":["Error","prototype"],"%EvalErrorPrototype%":["EvalError","prototype"],"%Float32ArrayPrototype%":["Float32Array","prototype"],"%Float64ArrayPrototype%":["Float64Array","prototype"],"%FunctionPrototype%":["Function","prototype"],"%Generator%":["GeneratorFunction","prototype"],"%GeneratorPrototype%":["GeneratorFunction","prototype","prototype"],"%Int8ArrayPrototype%":["Int8Array","prototype"],"%Int16ArrayPrototype%":["Int16Array","prototype"],"%Int32ArrayPrototype%":["Int32Array","prototype"],"%JSONParse%":["JSON","parse"],"%JSONStringify%":["JSON","stringify"],"%MapPrototype%":["Map","prototype"],"%NumberPrototype%":["Number","prototype"],"%ObjectPrototype%":["Object","prototype"],"%ObjProto_toString%":["Object","prototype","toString"],"%ObjProto_valueOf%":["Object","prototype","valueOf"],"%PromisePrototype%":["Promise","prototype"],"%PromiseProto_then%":["Promise","prototype","then"],"%Promise_all%":["Promise","all"],"%Promise_reject%":["Promise","reject"],"%Promise_resolve%":["Promise","resolve"],"%RangeErrorPrototype%":["RangeError","prototype"],"%ReferenceErrorPrototype%":["ReferenceError","prototype"],"%RegExpPrototype%":["RegExp","prototype"],"%SetPrototype%":["Set","prototype"],"%SharedArrayBufferPrototype%":["SharedArrayBuffer","prototype"],"%StringPrototype%":["String","prototype"],"%SymbolPrototype%":["Symbol","prototype"],"%SyntaxErrorPrototype%":["SyntaxError","prototype"],"%TypedArrayPrototype%":["TypedArray","prototype"],"%TypeErrorPrototype%":["TypeError","prototype"],"%Uint8ArrayPrototype%":["Uint8Array","prototype"],"%Uint8ClampedArrayPrototype%":["Uint8ClampedArray","prototype"],"%Uint16ArrayPrototype%":["Uint16Array","prototype"],"%Uint32ArrayPrototype%":["Uint32Array","prototype"],"%URIErrorPrototype%":["URIError","prototype"],"%WeakMapPrototype%":["WeakMap","prototype"],"%WeakSetPrototype%":["WeakSet","prototype"]},Mh=hh,Dh=yh,zh=Mh.call(Function.call,Array.prototype.concat),Fh=Mh.call(Function.apply,Array.prototype.splice),Hh=Mh.call(Function.call,String.prototype.replace),$h=Mh.call(Function.call,String.prototype.slice),Bh=Mh.call(Function.call,RegExp.prototype.exec),Vh=/[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,Uh=/\\(\\)?/g,Wh=function(e,t){var n,r=e;if(Dh(Lh,r)&&(r="%"+(n=Lh[r])[0]+"%"),Dh(jh,r)){var o=jh[r];if(o===Th&&(o=Rh(r)),void 0===o&&!t)throw new kh("intrinsic "+e+" exists, but is not available. Please file an issue!");return{alias:n,name:r,value:o}}throw new wh("intrinsic "+e+" does not exist!")},qh=function(e,t){if("string"!=typeof e||0===e.length)throw new kh("intrinsic name must be a non-empty string");if(arguments.length>1&&"boolean"!=typeof t)throw new kh('"allowMissing" argument must be a boolean');if(null===Bh(/^%?[^%]*%?$/,e))throw new wh("`%` may not be present anywhere but at the beginning and end of the intrinsic name");var n=function(e){var t=$h(e,0,1),n=$h(e,-1);if("%"===t&&"%"!==n)throw new wh("invalid intrinsic syntax, expected closing `%`");if("%"===n&&"%"!==t)throw new wh("invalid intrinsic syntax, expected opening `%`");var r=[];return Hh(e,Vh,(function(e,t,n,o){r[r.length]=n?Hh(o,Uh,"$1"):t||e})),r}(e),r=n.length>0?n[0]:"",o=Wh("%"+r+"%",t),a=o.name,i=o.value,s=!1,l=o.alias;l&&(r=l[0],Fh(n,zh([0,1],l)));for(var c=1,u=!0;c<n.length;c+=1){var d=n[c],p=$h(d,0,1),f=$h(d,-1);if(('"'===p||"'"===p||"`"===p||'"'===f||"'"===f||"`"===f)&&p!==f)throw new wh("property names with quotes must have matching quotes");if("constructor"!==d&&u||(s=!0),Dh(jh,a="%"+(r+="."+d)+"%"))i=jh[a];else if(null!=i){if(!(d in i)){if(!t)throw new kh("base intrinsic for "+e+" exists, but the property is not available.");return}if(Sh&&c+1>=n.length){var m=Sh(i,d);i=(u=!!m)&&"get"in m&&!("originalValue"in m.get)?m.get:i[d]}else u=Dh(i,d),i=i[d];u&&!s&&(jh[a]=i)}}return i},Gh={exports:{}},Kh=Array.prototype.slice,Yh=Object.prototype.toString,Xh=function(e){var t=this;if("function"!=typeof t||"[object Function]"!==Yh.call(t))throw new TypeError("Function.prototype.bind called on incompatible "+t);for(var n,r=Kh.call(arguments,1),o=Math.max(0,t.length-r.length),a=[],i=0;i<o;i++)a.push("$"+i);if(n=Function("binder","return function ("+a.join(",")+"){ return binder.apply(this,arguments); }")((function(){if(this instanceof n){var o=t.apply(this,r.concat(Kh.call(arguments)));return Object(o)===o?o:this}return t.apply(e,r.concat(Kh.call(arguments)))})),t.prototype){var s=function(){};s.prototype=t.prototype,n.prototype=new s,s.prototype=null}return n},Qh=Function.prototype.bind||Xh;!function(e){var t=Qh,n=qh,r=n("%Function.prototype.apply%"),o=n("%Function.prototype.call%"),a=n("%Reflect.apply%",!0)||t.call(o,r),i=n("%Object.getOwnPropertyDescriptor%",!0),s=n("%Object.defineProperty%",!0),l=n("%Math.max%");if(s)try{s({},"a",{value:1})}catch(e){s=null}e.exports=function(e){var n=a(t,o,arguments);i&&s&&(i(n,"length").configurable&&s(n,"length",{value:1+l(0,e.length-(arguments.length-1))}));return n};var c=function(){return a(t,r,arguments)};s?s(e.exports,"apply",{value:c}):e.exports.apply=c}(Gh);var Jh=Gh.exports,Zh=qh,eg=Jh,tg=eg(Zh("String.prototype.indexOf")),ng=function(e,t){var n=Zh(e,!!t);return"function"==typeof n&&tg(e,".prototype.")>-1?eg(n):n},rg=sh(),og=ng("Object.prototype.toString"),ag=function(e){return!(rg&&e&&"object"==typeof e&&Symbol.toStringTag in e)&&"[object Arguments]"===og(e)},ig=function(e){return!!ag(e)||null!==e&&"object"==typeof e&&"number"==typeof e.length&&e.length>=0&&"[object Array]"!==og(e)&&"[object Function]"===og(e.callee)},sg=function(){return ag(arguments)}();ag.isLegacyArguments=ig;var lg=sg?ag:ig,cg=qh("%Object.defineProperty%",!0),ug=function(){if(cg)try{return cg({},"a",{value:1}),!0}catch(e){return!1}return!1};ug.hasArrayLengthDefineBug=function(){if(!ug())return null;try{return 1!==cg([],"length",{value:1}).length}catch(e){return!0}};var dg=ug,pg=oh,fg="function"==typeof Symbol&&"symbol"==typeof Symbol("foo"),mg=Object.prototype.toString,hg=Array.prototype.concat,gg=Object.defineProperty,bg=dg(),vg=gg&&bg,yg=function(e,t,n,r){if(t in e)if(!0===r){if(e[t]===n)return}else if("function"!=typeof(o=r)||"[object Function]"!==mg.call(o)||!r())return;var o;vg?gg(e,t,{configurable:!0,enumerable:!1,value:n,writable:!0}):e[t]=n},wg=function(e,t){var n=arguments.length>2?arguments[2]:{},r=pg(t);fg&&(r=hg.call(r,Object.getOwnPropertySymbols(t)));for(var o=0;o<r.length;o+=1)yg(e,r[o],t[r[o]],n[r[o]])};wg.supportsDescriptors=!!vg;var xg=wg,kg=function(e){return e!=e},Eg=function(e,t){return 0===e&&0===t?1/e==1/t:e===t||!(!kg(e)||!kg(t))},Sg=Eg,Cg=function(){return"function"==typeof Object.is?Object.is:Sg},Og=Cg,Pg=xg,Ig=xg,_g=Eg,Tg=Cg,Ng=function(){var e=Og();return Pg(Object,{is:e},{is:function(){return Object.is!==e}}),e},jg=Jh(Tg(),Object);Ig(jg,{getPolyfill:Tg,implementation:_g,shim:Ng});var Ag,Rg,Lg,Mg,Dg=jg,zg=ng,Fg=sh();if(Fg){Ag=zg("Object.prototype.hasOwnProperty"),Rg=zg("RegExp.prototype.exec"),Lg={};var Hg=function(){throw Lg};Mg={toString:Hg,valueOf:Hg},"symbol"==typeof Symbol.toPrimitive&&(Mg[Symbol.toPrimitive]=Hg)}var $g=zg("Object.prototype.toString"),Bg=Object.getOwnPropertyDescriptor,Vg=Fg?function(e){if(!e||"object"!=typeof e)return!1;var t=Bg(e,"lastIndex");if(!(t&&Ag(t,"value")))return!1;try{Rg(e,Mg)}catch(e){return e===Lg}}:function(e){return!(!e||"object"!=typeof e&&"function"!=typeof e)&&"[object RegExp]"===$g(e)},Ug={exports:{}},Wg=function(){return"string"==typeof function(){}.name},qg=Object.getOwnPropertyDescriptor;if(qg)try{qg([],"length")}catch(Ds){qg=null}Wg.functionsHaveConfigurableNames=function(){if(!Wg()||!qg)return!1;var e=qg((function(){}),"name");return!!e&&!!e.configurable};var Gg=Function.prototype.bind;Wg.boundFunctionsHaveNames=function(){return Wg()&&"function"==typeof Gg&&""!==function(){}.bind().name};var Kg=Wg;!function(e){var t=Kg.functionsHaveConfigurableNames(),n=Object,r=TypeError;e.exports=function(){if(null!=this&&this!==n(this))throw new r("RegExp.prototype.flags getter called on non-object");var e="";return this.hasIndices&&(e+="d"),this.global&&(e+="g"),this.ignoreCase&&(e+="i"),this.multiline&&(e+="m"),this.dotAll&&(e+="s"),this.unicode&&(e+="u"),this.unicodeSets&&(e+="v"),this.sticky&&(e+="y"),e},t&&Object.defineProperty&&Object.defineProperty(e.exports,"name",{value:"get flags"})}(Ug);var Yg=Ug.exports,Xg=Yg,Qg=xg.supportsDescriptors,Jg=Object.getOwnPropertyDescriptor,Zg=function(){if(Qg&&"gim"===/a/gim.flags){var e=Jg(RegExp.prototype,"flags");if(e&&"function"==typeof e.get&&"boolean"==typeof RegExp.prototype.dotAll&&"boolean"==typeof RegExp.prototype.hasIndices){var t="",n={};if(Object.defineProperty(n,"hasIndices",{get:function(){t+="d"}}),Object.defineProperty(n,"sticky",{get:function(){t+="y"}}),"dy"===t)return e.get}}return Xg},eb=xg.supportsDescriptors,tb=Zg,nb=Object.getOwnPropertyDescriptor,rb=Object.defineProperty,ob=TypeError,ab=Object.getPrototypeOf,ib=/a/,sb=xg,lb=Yg,cb=Zg,ub=function(){if(!eb||!ab)throw new ob("RegExp.prototype.flags requires a true ES5 environment that supports property descriptors");var e=tb(),t=ab(ib),n=nb(t,"flags");return n&&n.get===e||rb(t,"flags",{configurable:!0,enumerable:!1,get:e}),e},db=Jh(cb());sb(db,{getPolyfill:cb,implementation:lb,shim:ub});var pb=db,fb=Date.prototype.getDay,mb=Object.prototype.toString,hb=sh(),gb=oh,bb=lg,vb=Dg,yb=Vg,wb=pb,xb=function(e){return"object"==typeof e&&null!==e&&(hb?function(e){try{return fb.call(e),!0}catch(e){return!1}}(e):"[object Date]"===mb.call(e))},kb=Date.prototype.getTime;function Eb(e,t,n){var r=n||{};return!!(r.strict?vb(e,t):e===t)||(!e||!t||"object"!=typeof e&&"object"!=typeof t?r.strict?vb(e,t):e==t:function(e,t,n){var r,o;if(typeof e!=typeof t)return!1;if(Sb(e)||Sb(t))return!1;if(e.prototype!==t.prototype)return!1;if(bb(e)!==bb(t))return!1;var a=yb(e),i=yb(t);if(a!==i)return!1;if(a||i)return e.source===t.source&&wb(e)===wb(t);if(xb(e)&&xb(t))return kb.call(e)===kb.call(t);var s=Cb(e),l=Cb(t);if(s!==l)return!1;if(s||l){if(e.length!==t.length)return!1;for(r=0;r<e.length;r++)if(e[r]!==t[r])return!1;return!0}if(typeof e!=typeof t)return!1;try{var c=gb(e),u=gb(t)}catch(e){return!1}if(c.length!==u.length)return!1;for(c.sort(),u.sort(),r=c.length-1;r>=0;r--)if(c[r]!=u[r])return!1;for(r=c.length-1;r>=0;r--)if(!Eb(e[o=c[r]],t[o],n))return!1;return!0}(e,t,r))}function Sb(e){return null==e}function Cb(e){return!(!e||"object"!=typeof e||"number"!=typeof e.length)&&("function"==typeof e.copy&&"function"==typeof e.slice&&!(e.length>0&&"number"!=typeof e[0]))}var Ob=n(Eb),Pb="undefined"!=typeof window&&"undefined"!=typeof document&&"undefined"!=typeof navigator,Ib=function(){for(var e=["Edge","Trident","Firefox"],t=0;t<e.length;t+=1)if(Pb&&navigator.userAgent.indexOf(e[t])>=0)return 1;return 0}();var _b=Pb&&window.Promise?function(e){var t=!1;return function(){t||(t=!0,window.Promise.resolve().then((function(){t=!1,e()})))}}:function(e){var t=!1;return function(){t||(t=!0,setTimeout((function(){t=!1,e()}),Ib))}};function Tb(e){return e&&"[object Function]"==={}.toString.call(e)}function Nb(e,t){if(1!==e.nodeType)return[];var n=e.ownerDocument.defaultView.getComputedStyle(e,null);return t?n[t]:n}function jb(e){return"HTML"===e.nodeName?e:e.parentNode||e.host}function Ab(e){if(!e)return document.body;switch(e.nodeName){case"HTML":case"BODY":return e.ownerDocument.body;case"#document":return e.body}var t=Nb(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/(auto|scroll|overlay)/.test(n+o+r)?e:Ab(jb(e))}function Rb(e){return e&&e.referenceNode?e.referenceNode:e}var Lb=Pb&&!(!window.MSInputMethodContext||!document.documentMode),Mb=Pb&&/MSIE 10/.test(navigator.userAgent);function Db(e){return 11===e?Lb:10===e?Mb:Lb||Mb}function zb(e){if(!e)return document.documentElement;for(var t=Db(10)?document.body:null,n=e.offsetParent||null;n===t&&e.nextElementSibling;)n=(e=e.nextElementSibling).offsetParent;var r=n&&n.nodeName;return r&&"BODY"!==r&&"HTML"!==r?-1!==["TH","TD","TABLE"].indexOf(n.nodeName)&&"static"===Nb(n,"position")?zb(n):n:e?e.ownerDocument.documentElement:document.documentElement}function Fb(e){return null!==e.parentNode?Fb(e.parentNode):e}function Hb(e,t){if(!(e&&e.nodeType&&t&&t.nodeType))return document.documentElement;var n=e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING,r=n?e:t,o=n?t:e,a=document.createRange();a.setStart(r,0),a.setEnd(o,0);var i,s,l=a.commonAncestorContainer;if(e!==l&&t!==l||r.contains(o))return"BODY"===(s=(i=l).nodeName)||"HTML"!==s&&zb(i.firstElementChild)!==i?zb(l):l;var c=Fb(e);return c.host?Hb(c.host,t):Hb(e,Fb(t).host)}function $b(e){var t="top"===(arguments.length>1&&void 0!==arguments[1]?arguments[1]:"top")?"scrollTop":"scrollLeft",n=e.nodeName;if("BODY"===n||"HTML"===n){var r=e.ownerDocument.documentElement;return(e.ownerDocument.scrollingElement||r)[t]}return e[t]}function Bb(e,t){var n="x"===t?"Left":"Top",r="Left"===n?"Right":"Bottom";return parseFloat(e["border"+n+"Width"])+parseFloat(e["border"+r+"Width"])}function Vb(e,t,n,r){return Math.max(t["offset"+e],t["scroll"+e],n["client"+e],n["offset"+e],n["scroll"+e],Db(10)?parseInt(n["offset"+e])+parseInt(r["margin"+("Height"===e?"Top":"Left")])+parseInt(r["margin"+("Height"===e?"Bottom":"Right")]):0)}function Ub(e){var t=e.body,n=e.documentElement,r=Db(10)&&getComputedStyle(n);return{height:Vb("Height",t,n,r),width:Vb("Width",t,n,r)}}var Wb=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),qb=function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e},Gb=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};function Kb(e){return Gb({},e,{right:e.left+e.width,bottom:e.top+e.height})}function Yb(e){var t={};try{if(Db(10)){t=e.getBoundingClientRect();var n=$b(e,"top"),r=$b(e,"left");t.top+=n,t.left+=r,t.bottom+=n,t.right+=r}else t=e.getBoundingClientRect()}catch(e){}var o={left:t.left,top:t.top,width:t.right-t.left,height:t.bottom-t.top},a="HTML"===e.nodeName?Ub(e.ownerDocument):{},i=a.width||e.clientWidth||o.width,s=a.height||e.clientHeight||o.height,l=e.offsetWidth-i,c=e.offsetHeight-s;if(l||c){var u=Nb(e);l-=Bb(u,"x"),c-=Bb(u,"y"),o.width-=l,o.height-=c}return Kb(o)}function Xb(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=Db(10),o="HTML"===t.nodeName,a=Yb(e),i=Yb(t),s=Ab(e),l=Nb(t),c=parseFloat(l.borderTopWidth),u=parseFloat(l.borderLeftWidth);n&&o&&(i.top=Math.max(i.top,0),i.left=Math.max(i.left,0));var d=Kb({top:a.top-i.top-c,left:a.left-i.left-u,width:a.width,height:a.height});if(d.marginTop=0,d.marginLeft=0,!r&&o){var p=parseFloat(l.marginTop),f=parseFloat(l.marginLeft);d.top-=c-p,d.bottom-=c-p,d.left-=u-f,d.right-=u-f,d.marginTop=p,d.marginLeft=f}return(r&&!n?t.contains(s):t===s&&"BODY"!==s.nodeName)&&(d=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=$b(t,"top"),o=$b(t,"left"),a=n?-1:1;return e.top+=r*a,e.bottom+=r*a,e.left+=o*a,e.right+=o*a,e}(d,t)),d}function Qb(e){var t=e.nodeName;if("BODY"===t||"HTML"===t)return!1;if("fixed"===Nb(e,"position"))return!0;var n=jb(e);return!!n&&Qb(n)}function Jb(e){if(!e||!e.parentElement||Db())return document.documentElement;for(var t=e.parentElement;t&&"none"===Nb(t,"transform");)t=t.parentElement;return t||document.documentElement}function Zb(e,t,n,r){var o=arguments.length>4&&void 0!==arguments[4]&&arguments[4],a={top:0,left:0},i=o?Jb(e):Hb(e,Rb(t));if("viewport"===r)a=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=e.ownerDocument.documentElement,r=Xb(e,n),o=Math.max(n.clientWidth,window.innerWidth||0),a=Math.max(n.clientHeight,window.innerHeight||0),i=t?0:$b(n),s=t?0:$b(n,"left");return Kb({top:i-r.top+r.marginTop,left:s-r.left+r.marginLeft,width:o,height:a})}(i,o);else{var s=void 0;"scrollParent"===r?"BODY"===(s=Ab(jb(t))).nodeName&&(s=e.ownerDocument.documentElement):s="window"===r?e.ownerDocument.documentElement:r;var l=Xb(s,i,o);if("HTML"!==s.nodeName||Qb(i))a=l;else{var c=Ub(e.ownerDocument),u=c.height,d=c.width;a.top+=l.top-l.marginTop,a.bottom=u+l.top,a.left+=l.left-l.marginLeft,a.right=d+l.left}}var p="number"==typeof(n=n||0);return a.left+=p?n:n.left||0,a.top+=p?n:n.top||0,a.right-=p?n:n.right||0,a.bottom-=p?n:n.bottom||0,a}function ev(e,t,n,r,o){var a=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0;if(-1===e.indexOf("auto"))return e;var i=Zb(n,r,a,o),s={top:{width:i.width,height:t.top-i.top},right:{width:i.right-t.right,height:i.height},bottom:{width:i.width,height:i.bottom-t.bottom},left:{width:t.left-i.left,height:i.height}},l=Object.keys(s).map((function(e){return Gb({key:e},s[e],{area:(t=s[e],t.width*t.height)});var t})).sort((function(e,t){return t.area-e.area})),c=l.filter((function(e){var t=e.width,r=e.height;return t>=n.clientWidth&&r>=n.clientHeight})),u=c.length>0?c[0].key:l[0].key,d=e.split("-")[1];return u+(d?"-"+d:"")}function tv(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;return Xb(n,r?Jb(t):Hb(t,Rb(n)),r)}function nv(e){var t=e.ownerDocument.defaultView.getComputedStyle(e),n=parseFloat(t.marginTop||0)+parseFloat(t.marginBottom||0),r=parseFloat(t.marginLeft||0)+parseFloat(t.marginRight||0);return{width:e.offsetWidth+r,height:e.offsetHeight+n}}function rv(e){var t={left:"right",right:"left",bottom:"top",top:"bottom"};return e.replace(/left|right|bottom|top/g,(function(e){return t[e]}))}function ov(e,t,n){n=n.split("-")[0];var r=nv(e),o={width:r.width,height:r.height},a=-1!==["right","left"].indexOf(n),i=a?"top":"left",s=a?"left":"top",l=a?"height":"width",c=a?"width":"height";return o[i]=t[i]+t[l]/2-r[l]/2,o[s]=n===s?t[s]-r[c]:t[rv(s)],o}function av(e,t){return Array.prototype.find?e.find(t):e.filter(t)[0]}function iv(e,t,n){var r=void 0===n?e:e.slice(0,function(e,t,n){if(Array.prototype.findIndex)return e.findIndex((function(e){return e[t]===n}));var r=av(e,(function(e){return e[t]===n}));return e.indexOf(r)}(e,"name",n));return r.forEach((function(e){e.function&&console.warn("`modifier.function` is deprecated, use `modifier.fn`!");var n=e.function||e.fn;e.enabled&&Tb(n)&&(t.offsets.popper=Kb(t.offsets.popper),t.offsets.reference=Kb(t.offsets.reference),t=n(t,e))})),t}function sv(){if(!this.state.isDestroyed){var e={instance:this,styles:{},arrowStyles:{},attributes:{},flipped:!1,offsets:{}};e.offsets.reference=tv(this.state,this.popper,this.reference,this.options.positionFixed),e.placement=ev(this.options.placement,e.offsets.reference,this.popper,this.reference,this.options.modifiers.flip.boundariesElement,this.options.modifiers.flip.padding),e.originalPlacement=e.placement,e.positionFixed=this.options.positionFixed,e.offsets.popper=ov(this.popper,e.offsets.reference,e.placement),e.offsets.popper.position=this.options.positionFixed?"fixed":"absolute",e=iv(this.modifiers,e),this.state.isCreated?this.options.onUpdate(e):(this.state.isCreated=!0,this.options.onCreate(e))}}function lv(e,t){return e.some((function(e){var n=e.name;return e.enabled&&n===t}))}function cv(e){for(var t=[!1,"ms","Webkit","Moz","O"],n=e.charAt(0).toUpperCase()+e.slice(1),r=0;r<t.length;r++){var o=t[r],a=o?""+o+n:e;if(void 0!==document.body.style[a])return a}return null}function uv(){return this.state.isDestroyed=!0,lv(this.modifiers,"applyStyle")&&(this.popper.removeAttribute("x-placement"),this.popper.style.position="",this.popper.style.top="",this.popper.style.left="",this.popper.style.right="",this.popper.style.bottom="",this.popper.style.willChange="",this.popper.style[cv("transform")]=""),this.disableEventListeners(),this.options.removeOnDestroy&&this.popper.parentNode.removeChild(this.popper),this}function dv(e){var t=e.ownerDocument;return t?t.defaultView:window}function pv(e,t,n,r){var o="BODY"===e.nodeName,a=o?e.ownerDocument.defaultView:e;a.addEventListener(t,n,{passive:!0}),o||pv(Ab(a.parentNode),t,n,r),r.push(a)}function fv(e,t,n,r){n.updateBound=r,dv(e).addEventListener("resize",n.updateBound,{passive:!0});var o=Ab(e);return pv(o,"scroll",n.updateBound,n.scrollParents),n.scrollElement=o,n.eventsEnabled=!0,n}function mv(){this.state.eventsEnabled||(this.state=fv(this.reference,this.options,this.state,this.scheduleUpdate))}function hv(){var e,t;this.state.eventsEnabled&&(cancelAnimationFrame(this.scheduleUpdate),this.state=(e=this.reference,t=this.state,dv(e).removeEventListener("resize",t.updateBound),t.scrollParents.forEach((function(e){e.removeEventListener("scroll",t.updateBound)})),t.updateBound=null,t.scrollParents=[],t.scrollElement=null,t.eventsEnabled=!1,t))}function gv(e){return""!==e&&!isNaN(parseFloat(e))&&isFinite(e)}function bv(e,t){Object.keys(t).forEach((function(n){var r="";-1!==["width","height","top","right","bottom","left"].indexOf(n)&&gv(t[n])&&(r="px"),e.style[n]=t[n]+r}))}var vv=Pb&&/Firefox/i.test(navigator.userAgent);function yv(e,t,n){var r=av(e,(function(e){return e.name===t})),o=!!r&&e.some((function(e){return e.name===n&&e.enabled&&e.order<r.order}));if(!o){var a="`"+t+"`",i="`"+n+"`";console.warn(i+" modifier is required by "+a+" modifier in order to work, be sure to include it before "+a+"!")}return o}var wv=["auto-start","auto","auto-end","top-start","top","top-end","right-start","right","right-end","bottom-end","bottom","bottom-start","left-end","left","left-start"],xv=wv.slice(3);function kv(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=xv.indexOf(e),r=xv.slice(n+1).concat(xv.slice(0,n));return t?r.reverse():r}var Ev="flip",Sv="clockwise",Cv="counterclockwise";function Ov(e,t,n,r){var o=[0,0],a=-1!==["right","left"].indexOf(r),i=e.split(/(\+|\-)/).map((function(e){return e.trim()})),s=i.indexOf(av(i,(function(e){return-1!==e.search(/,|\s/)})));i[s]&&-1===i[s].indexOf(",")&&console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");var l=/\s*,\s*|\s+/,c=-1!==s?[i.slice(0,s).concat([i[s].split(l)[0]]),[i[s].split(l)[1]].concat(i.slice(s+1))]:[i];return c=c.map((function(e,r){var o=(1===r?!a:a)?"height":"width",i=!1;return e.reduce((function(e,t){return""===e[e.length-1]&&-1!==["+","-"].indexOf(t)?(e[e.length-1]=t,i=!0,e):i?(e[e.length-1]+=t,i=!1,e):e.concat(t)}),[]).map((function(e){return function(e,t,n,r){var o=e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),a=+o[1],i=o[2];if(!a)return e;if(0===i.indexOf("%")){return Kb("%p"===i?n:r)[t]/100*a}if("vh"===i||"vw"===i)return("vh"===i?Math.max(document.documentElement.clientHeight,window.innerHeight||0):Math.max(document.documentElement.clientWidth,window.innerWidth||0))/100*a;return a}(e,o,t,n)}))})),c.forEach((function(e,t){e.forEach((function(n,r){gv(n)&&(o[t]+=n*("-"===e[r-1]?-1:1))}))})),o}var Pv={shift:{order:100,enabled:!0,fn:function(e){var t=e.placement,n=t.split("-")[0],r=t.split("-")[1];if(r){var o=e.offsets,a=o.reference,i=o.popper,s=-1!==["bottom","top"].indexOf(n),l=s?"left":"top",c=s?"width":"height",u={start:qb({},l,a[l]),end:qb({},l,a[l]+a[c]-i[c])};e.offsets.popper=Gb({},i,u[r])}return e}},offset:{order:200,enabled:!0,fn:function(e,t){var n=t.offset,r=e.placement,o=e.offsets,a=o.popper,i=o.reference,s=r.split("-")[0],l=void 0;return l=gv(+n)?[+n,0]:Ov(n,a,i,s),"left"===s?(a.top+=l[0],a.left-=l[1]):"right"===s?(a.top+=l[0],a.left+=l[1]):"top"===s?(a.left+=l[0],a.top-=l[1]):"bottom"===s&&(a.left+=l[0],a.top+=l[1]),e.popper=a,e},offset:0},preventOverflow:{order:300,enabled:!0,fn:function(e,t){var n=t.boundariesElement||zb(e.instance.popper);e.instance.reference===n&&(n=zb(n));var r=cv("transform"),o=e.instance.popper.style,a=o.top,i=o.left,s=o[r];o.top="",o.left="",o[r]="";var l=Zb(e.instance.popper,e.instance.reference,t.padding,n,e.positionFixed);o.top=a,o.left=i,o[r]=s,t.boundaries=l;var c=t.priority,u=e.offsets.popper,d={primary:function(e){var n=u[e];return u[e]<l[e]&&!t.escapeWithReference&&(n=Math.max(u[e],l[e])),qb({},e,n)},secondary:function(e){var n="right"===e?"left":"top",r=u[n];return u[e]>l[e]&&!t.escapeWithReference&&(r=Math.min(u[n],l[e]-("right"===e?u.width:u.height))),qb({},n,r)}};return c.forEach((function(e){var t=-1!==["left","top"].indexOf(e)?"primary":"secondary";u=Gb({},u,d[t](e))})),e.offsets.popper=u,e},priority:["left","right","top","bottom"],padding:5,boundariesElement:"scrollParent"},keepTogether:{order:400,enabled:!0,fn:function(e){var t=e.offsets,n=t.popper,r=t.reference,o=e.placement.split("-")[0],a=Math.floor,i=-1!==["top","bottom"].indexOf(o),s=i?"right":"bottom",l=i?"left":"top",c=i?"width":"height";return n[s]<a(r[l])&&(e.offsets.popper[l]=a(r[l])-n[c]),n[l]>a(r[s])&&(e.offsets.popper[l]=a(r[s])),e}},arrow:{order:500,enabled:!0,fn:function(e,t){var n;if(!yv(e.instance.modifiers,"arrow","keepTogether"))return e;var r=t.element;if("string"==typeof r){if(!(r=e.instance.popper.querySelector(r)))return e}else if(!e.instance.popper.contains(r))return console.warn("WARNING: `arrow.element` must be child of its popper element!"),e;var o=e.placement.split("-")[0],a=e.offsets,i=a.popper,s=a.reference,l=-1!==["left","right"].indexOf(o),c=l?"height":"width",u=l?"Top":"Left",d=u.toLowerCase(),p=l?"left":"top",f=l?"bottom":"right",m=nv(r)[c];s[f]-m<i[d]&&(e.offsets.popper[d]-=i[d]-(s[f]-m)),s[d]+m>i[f]&&(e.offsets.popper[d]+=s[d]+m-i[f]),e.offsets.popper=Kb(e.offsets.popper);var h=s[d]+s[c]/2-m/2,g=Nb(e.instance.popper),b=parseFloat(g["margin"+u]),v=parseFloat(g["border"+u+"Width"]),y=h-e.offsets.popper[d]-b-v;return y=Math.max(Math.min(i[c]-m,y),0),e.arrowElement=r,e.offsets.arrow=(qb(n={},d,Math.round(y)),qb(n,p,""),n),e},element:"[x-arrow]"},flip:{order:600,enabled:!0,fn:function(e,t){if(lv(e.instance.modifiers,"inner"))return e;if(e.flipped&&e.placement===e.originalPlacement)return e;var n=Zb(e.instance.popper,e.instance.reference,t.padding,t.boundariesElement,e.positionFixed),r=e.placement.split("-")[0],o=rv(r),a=e.placement.split("-")[1]||"",i=[];switch(t.behavior){case Ev:i=[r,o];break;case Sv:i=kv(r);break;case Cv:i=kv(r,!0);break;default:i=t.behavior}return i.forEach((function(s,l){if(r!==s||i.length===l+1)return e;r=e.placement.split("-")[0],o=rv(r);var c=e.offsets.popper,u=e.offsets.reference,d=Math.floor,p="left"===r&&d(c.right)>d(u.left)||"right"===r&&d(c.left)<d(u.right)||"top"===r&&d(c.bottom)>d(u.top)||"bottom"===r&&d(c.top)<d(u.bottom),f=d(c.left)<d(n.left),m=d(c.right)>d(n.right),h=d(c.top)<d(n.top),g=d(c.bottom)>d(n.bottom),b="left"===r&&f||"right"===r&&m||"top"===r&&h||"bottom"===r&&g,v=-1!==["top","bottom"].indexOf(r),y=!!t.flipVariations&&(v&&"start"===a&&f||v&&"end"===a&&m||!v&&"start"===a&&h||!v&&"end"===a&&g),w=!!t.flipVariationsByContent&&(v&&"start"===a&&m||v&&"end"===a&&f||!v&&"start"===a&&g||!v&&"end"===a&&h),x=y||w;(p||b||x)&&(e.flipped=!0,(p||b)&&(r=i[l+1]),x&&(a=function(e){return"end"===e?"start":"start"===e?"end":e}(a)),e.placement=r+(a?"-"+a:""),e.offsets.popper=Gb({},e.offsets.popper,ov(e.instance.popper,e.offsets.reference,e.placement)),e=iv(e.instance.modifiers,e,"flip"))})),e},behavior:"flip",padding:5,boundariesElement:"viewport",flipVariations:!1,flipVariationsByContent:!1},inner:{order:700,enabled:!1,fn:function(e){var t=e.placement,n=t.split("-")[0],r=e.offsets,o=r.popper,a=r.reference,i=-1!==["left","right"].indexOf(n),s=-1===["top","left"].indexOf(n);return o[i?"left":"top"]=a[n]-(s?o[i?"width":"height"]:0),e.placement=rv(t),e.offsets.popper=Kb(o),e}},hide:{order:800,enabled:!0,fn:function(e){if(!yv(e.instance.modifiers,"hide","preventOverflow"))return e;var t=e.offsets.reference,n=av(e.instance.modifiers,(function(e){return"preventOverflow"===e.name})).boundaries;if(t.bottom<n.top||t.left>n.right||t.top>n.bottom||t.right<n.left){if(!0===e.hide)return e;e.hide=!0,e.attributes["x-out-of-boundaries"]=""}else{if(!1===e.hide)return e;e.hide=!1,e.attributes["x-out-of-boundaries"]=!1}return e}},computeStyle:{order:850,enabled:!0,fn:function(e,t){var n=t.x,r=t.y,o=e.offsets.popper,a=av(e.instance.modifiers,(function(e){return"applyStyle"===e.name})).gpuAcceleration;void 0!==a&&console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");var i=void 0!==a?a:t.gpuAcceleration,s=zb(e.instance.popper),l=Yb(s),c={position:o.position},u=function(e,t){var n=e.offsets,r=n.popper,o=n.reference,a=Math.round,i=Math.floor,s=function(e){return e},l=a(o.width),c=a(r.width),u=-1!==["left","right"].indexOf(e.placement),d=-1!==e.placement.indexOf("-"),p=t?u||d||l%2==c%2?a:i:s,f=t?a:s;return{left:p(l%2==1&&c%2==1&&!d&&t?r.left-1:r.left),top:f(r.top),bottom:f(r.bottom),right:p(r.right)}}(e,window.devicePixelRatio<2||!vv),d="bottom"===n?"top":"bottom",p="right"===r?"left":"right",f=cv("transform"),m=void 0,h=void 0;if(h="bottom"===d?"HTML"===s.nodeName?-s.clientHeight+u.bottom:-l.height+u.bottom:u.top,m="right"===p?"HTML"===s.nodeName?-s.clientWidth+u.right:-l.width+u.right:u.left,i&&f)c[f]="translate3d("+m+"px, "+h+"px, 0)",c[d]=0,c[p]=0,c.willChange="transform";else{var g="bottom"===d?-1:1,b="right"===p?-1:1;c[d]=h*g,c[p]=m*b,c.willChange=d+", "+p}var v={"x-placement":e.placement};return e.attributes=Gb({},v,e.attributes),e.styles=Gb({},c,e.styles),e.arrowStyles=Gb({},e.offsets.arrow,e.arrowStyles),e},gpuAcceleration:!0,x:"bottom",y:"right"},applyStyle:{order:900,enabled:!0,fn:function(e){var t,n;return bv(e.instance.popper,e.styles),t=e.instance.popper,n=e.attributes,Object.keys(n).forEach((function(e){!1!==n[e]?t.setAttribute(e,n[e]):t.removeAttribute(e)})),e.arrowElement&&Object.keys(e.arrowStyles).length&&bv(e.arrowElement,e.arrowStyles),e},onLoad:function(e,t,n,r,o){var a=tv(o,t,e,n.positionFixed),i=ev(n.placement,a,t,e,n.modifiers.flip.boundariesElement,n.modifiers.flip.padding);return t.setAttribute("x-placement",i),bv(t,{position:n.positionFixed?"fixed":"absolute"}),n},gpuAcceleration:void 0}},Iv={placement:"bottom",positionFixed:!1,eventsEnabled:!0,removeOnDestroy:!1,onCreate:function(){},onUpdate:function(){},modifiers:Pv},_v=function(){function e(t,n){var r=this,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.scheduleUpdate=function(){return requestAnimationFrame(r.update)},this.update=_b(this.update.bind(this)),this.options=Gb({},e.Defaults,o),this.state={isDestroyed:!1,isCreated:!1,scrollParents:[]},this.reference=t&&t.jquery?t[0]:t,this.popper=n&&n.jquery?n[0]:n,this.options.modifiers={},Object.keys(Gb({},e.Defaults.modifiers,o.modifiers)).forEach((function(t){r.options.modifiers[t]=Gb({},e.Defaults.modifiers[t]||{},o.modifiers?o.modifiers[t]:{})})),this.modifiers=Object.keys(this.options.modifiers).map((function(e){return Gb({name:e},r.options.modifiers[e])})).sort((function(e,t){return e.order-t.order})),this.modifiers.forEach((function(e){e.enabled&&Tb(e.onLoad)&&e.onLoad(r.reference,r.popper,r.options,e,r.state)})),this.update();var a=this.options.eventsEnabled;a&&this.enableEventListeners(),this.state.eventsEnabled=a}return Wb(e,[{key:"update",value:function(){return sv.call(this)}},{key:"destroy",value:function(){return uv.call(this)}},{key:"enableEventListeners",value:function(){return mv.call(this)}},{key:"disableEventListeners",value:function(){return hv.call(this)}}]),e}();_v.Utils=("undefined"!=typeof window?window:global).PopperUtils,_v.placements=wv,_v.Defaults=Iv;var Tv=_v,Nv={exports:{}},jv={exports:{}},Av="__global_unique_id__",Rv=function(){return t[Av]=(t[Av]||0)+1},Lv=function(){},Mv=n(Lv);!function(e,t){t.__esModule=!0;var n=p;a(n);var r=a(Sn),o=a(Rv);function a(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}a(Lv);var c=1073741823;t.default=function(e,t){var a,u,d="__create-react-context-"+(0,o.default)()+"__",p=function(e){function n(){var t,r,o,a;i(this,n);for(var l=arguments.length,c=Array(l),u=0;u<l;u++)c[u]=arguments[u];return t=r=s(this,e.call.apply(e,[this].concat(c))),r.emitter=(o=r.props.value,a=[],{on:function(e){a.push(e)},off:function(e){a=a.filter((function(t){return t!==e}))},get:function(){return o},set:function(e,t){o=e,a.forEach((function(e){return e(o,t)}))}}),s(r,t)}return l(n,e),n.prototype.getChildContext=function(){var e;return(e={})[d]=this.emitter,e},n.prototype.componentWillReceiveProps=function(e){if(this.props.value!==e.value){var n=this.props.value,r=e.value,o=void 0;!function(e,t){return e===t?0!==e||1/e==1/t:e!=e&&t!=t}(n,r)?(o="function"==typeof t?t(n,r):c,0!==(o|=0)&&this.emitter.set(e.value,o)):o=0}},n.prototype.render=function(){return this.props.children},n}(n.Component);p.childContextTypes=((a={})[d]=r.default.object.isRequired,a);var f=function(t){function n(){var e,r;i(this,n);for(var o=arguments.length,a=Array(o),l=0;l<o;l++)a[l]=arguments[l];return e=r=s(this,t.call.apply(t,[this].concat(a))),r.state={value:r.getValue()},r.onUpdate=function(e,t){(0|r.observedBits)&t&&r.setState({value:r.getValue()})},s(r,e)}return l(n,t),n.prototype.componentWillReceiveProps=function(e){var t=e.observedBits;this.observedBits=null==t?c:t},n.prototype.componentDidMount=function(){this.context[d]&&this.context[d].on(this.onUpdate);var e=this.props.observedBits;this.observedBits=null==e?c:e},n.prototype.componentWillUnmount=function(){this.context[d]&&this.context[d].off(this.onUpdate)},n.prototype.getValue=function(){return this.context[d]?this.context[d].get():e},n.prototype.render=function(){return(e=this.props.children,Array.isArray(e)?e[0]:e)(this.state.value);var e},n}(n.Component);return f.contextTypes=((u={})[d]=r.default.object,u),{Provider:p,Consumer:f}},e.exports=t.default}(jv,jv.exports);var Dv=jv.exports;!function(e,t){t.__esModule=!0;var n=o(p),r=o(Dv);function o(e){return e&&e.__esModule?e:{default:e}}t.default=n.default.createContext||r.default,e.exports=t.default}(Nv,Nv.exports);var zv=n(Nv.exports),Fv=zv(),Hv=zv(),$v=function(e){function t(){for(var t,n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return Gm(Xn(Xn(t=e.call.apply(e,[this].concat(r))||this)),"referenceNode",void 0),Gm(Xn(Xn(t)),"setReferenceNode",(function(e){e&&t.referenceNode!==e&&(t.referenceNode=e,t.forceUpdate())})),t}Jn(t,e);var n=t.prototype;return n.componentWillUnmount=function(){this.referenceNode=null},n.render=function(){return p.createElement(Fv.Provider,{value:this.referenceNode},p.createElement(Hv.Provider,{value:this.setReferenceNode},this.props.children))},t}(p.Component),Bv=function(e){return Array.isArray(e)?e[0]:e},Vv=function(e){if("function"==typeof e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return e.apply(void 0,n)}},Uv=function(e,t){if("function"==typeof e)return Vv(e,t);null!=e&&(e.current=t)},Wv={position:"absolute",top:0,left:0,opacity:0,pointerEvents:"none"},qv={},Gv=function(e){function t(){for(var t,n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return Gm(Xn(Xn(t=e.call.apply(e,[this].concat(r))||this)),"state",{data:void 0,placement:void 0}),Gm(Xn(Xn(t)),"popperInstance",void 0),Gm(Xn(Xn(t)),"popperNode",null),Gm(Xn(Xn(t)),"arrowNode",null),Gm(Xn(Xn(t)),"setPopperNode",(function(e){e&&t.popperNode!==e&&(Uv(t.props.innerRef,e),t.popperNode=e,t.updatePopperInstance())})),Gm(Xn(Xn(t)),"setArrowNode",(function(e){t.arrowNode=e})),Gm(Xn(Xn(t)),"updateStateModifier",{enabled:!0,order:900,fn:function(e){var n=e.placement;return t.setState({data:e,placement:n}),e}}),Gm(Xn(Xn(t)),"getOptions",(function(){return{placement:t.props.placement,eventsEnabled:t.props.eventsEnabled,positionFixed:t.props.positionFixed,modifiers:Yn({},t.props.modifiers,{arrow:Yn({},t.props.modifiers&&t.props.modifiers.arrow,{enabled:!!t.arrowNode,element:t.arrowNode}),applyStyle:{enabled:!1},updateStateModifier:t.updateStateModifier})}})),Gm(Xn(Xn(t)),"getPopperStyle",(function(){return t.popperNode&&t.state.data?Yn({position:t.state.data.offsets.popper.position},t.state.data.styles):Wv})),Gm(Xn(Xn(t)),"getPopperPlacement",(function(){return t.state.data?t.state.placement:void 0})),Gm(Xn(Xn(t)),"getArrowStyle",(function(){return t.arrowNode&&t.state.data?t.state.data.arrowStyles:qv})),Gm(Xn(Xn(t)),"getOutOfBoundariesState",(function(){return t.state.data?t.state.data.hide:void 0})),Gm(Xn(Xn(t)),"destroyPopperInstance",(function(){t.popperInstance&&(t.popperInstance.destroy(),t.popperInstance=null)})),Gm(Xn(Xn(t)),"updatePopperInstance",(function(){t.destroyPopperInstance();var e=Xn(Xn(t)).popperNode,n=t.props.referenceElement;n&&e&&(t.popperInstance=new Tv(n,e,t.getOptions()))})),Gm(Xn(Xn(t)),"scheduleUpdate",(function(){t.popperInstance&&t.popperInstance.scheduleUpdate()})),t}Jn(t,e);var n=t.prototype;return n.componentDidUpdate=function(e,t){this.props.placement===e.placement&&this.props.referenceElement===e.referenceElement&&this.props.positionFixed===e.positionFixed&&Ob(this.props.modifiers,e.modifiers,{strict:!0})?this.props.eventsEnabled!==e.eventsEnabled&&this.popperInstance&&(this.props.eventsEnabled?this.popperInstance.enableEventListeners():this.popperInstance.disableEventListeners()):this.updatePopperInstance(),t.placement!==this.state.placement&&this.scheduleUpdate()},n.componentWillUnmount=function(){Uv(this.props.innerRef,null),this.destroyPopperInstance()},n.render=function(){return Bv(this.props.children)({ref:this.setPopperNode,style:this.getPopperStyle(),placement:this.getPopperPlacement(),outOfBoundaries:this.getOutOfBoundariesState(),scheduleUpdate:this.scheduleUpdate,arrowProps:{ref:this.setArrowNode,style:this.getArrowStyle()}})},t}(p.Component);function Kv(e){var t=e.referenceElement,n=Ga(e,["referenceElement"]);return p.createElement(Fv.Consumer,null,(function(e){return p.createElement(Gv,Yn({referenceElement:void 0!==t?t:e},n))}))}Gm(Gv,"defaultProps",{placement:"bottom",eventsEnabled:!0,referenceElement:void 0,positionFixed:!1}),Tv.placements;var Yv=function(e){function t(){for(var t,n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return Gm(Xn(Xn(t=e.call.apply(e,[this].concat(r))||this)),"refHandler",(function(e){Uv(t.props.innerRef,e),Vv(t.props.setReferenceNode,e)})),t}Jn(t,e);var n=t.prototype;return n.componentWillUnmount=function(){Uv(this.props.innerRef,null)},n.render=function(){return Mv(Boolean(this.props.setReferenceNode),"`Reference` should not be used outside of a `Manager` component."),Bv(this.props.children)({ref:this.refHandler})},t}(p.Component);function Xv(e){return p.createElement(Hv.Consumer,null,(function(t){return p.createElement(Yv,Yn({setReferenceNode:t},e))}))}function Qv(e){return{auto:"auto",top:"top","top-start":"top-start","top-end":"top-end",bottom:"bottom","bottom-start":"bottom-start","bottom-end":"bottom-end",end:"right","end-top":"right-start","end-bottom":"right-end",start:"left","start-top":"left-start","start-bottom":"left-end"}[e]}const Jv="tooltip.paragraph",Zv=kn.p.attrs({"data-garden-id":Jv,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledParagraph",componentId:"sc-wuqkfc-0"})(["margin:0;",";"],(e=>Kn(Jv,e)));Zv.defaultProps={theme:Wn};const ey="tooltip.title",ty=kn.strong.attrs({"data-garden-id":ey,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledTitle",componentId:"sc-vnjcvz-0"})(["display:none;margin:0;font-weight:",";",";"],(e=>e.theme.fontWeights.semibold),(e=>Kn(ey,e)));ty.defaultProps={theme:Wn};const ny="tooltip.tooltip",ry=kn.div.attrs({"data-garden-id":ny,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledTooltip",componentId:"sc-gzzjq4-0"})(["display:inline-block;box-sizing:border-box;direction:",";text-align:",";font-weight:",";",";&[aria-hidden='true']{display:none;}",";",";"],(e=>e.theme.rtl&&"rtl"),(e=>e.theme.rtl?"right":"left"),(e=>e.theme.fontWeights.regular),(e=>(e=>{let t,n,r,o,a,i,s,{theme:l,size:c,type:u,placement:d,hasArrow:p}=e,f=1.5*l.space.base+"px",m=l.borderRadii.sm,h="0 1em",g="nowrap",b=Ao(5*l.space.base,l.fontSizes.sm),v=l.fontSizes.sm;return"small"!==c&&(m=l.borderRadii.md,n="break-word",g="normal",a="break-word"),"extra-large"===c?(h=10*l.space.base+"px",t="460px",b=Ao(5*l.space.base,l.fontSizes.md),o=2.5*l.space.base+"px"):"large"===c?(h=5*l.space.base+"px",t="270px",b=Ao(5*l.space.base,l.fontSizes.md),o=2*l.space.base+"px"):"medium"===c&&(h="1em",t="140px",b=Ao(4*l.space.base,l.fontSizes.sm)),"extra-large"!==c&&"large"!==c||(v=l.fontSizes.md,r="block"),p&&("small"===c||"medium"===c?(i=f,s="dark"===u?"1px":"0"):(s="dark"===u?"2px":"1px","large"===c?(f=2*l.space.base+"px",i=f):"extra-large"===c&&(f=3*l.space.base+"px",i=2.5*l.space.base+"px"))),tn(["margin:",";border-radius:",";padding:",";max-width:",";line-height:",";word-wrap:",";white-space:",";font-size:",";overflow-wrap:",";",";","{margin-top:",";}","{display:",";}"],f,m,h,t,b,a,g,v,n,p&&Mo({top:"bottom","top-start":"bottom-left","top-end":"bottom-right",right:"left","right-start":"left-top","right-end":"left-bottom",bottom:"top","bottom-start":"top-left","bottom-end":"top-right",left:"right","left-start":"right-top","left-end":"right-bottom"}[d]||"top",{size:i,inset:s}),Zv,o,ty,r)})(e)),(e=>{let t,n,{theme:r,type:o}=e,a=r.shadows.lg(`${r.space.base}px`,2*r.space.base+"px",No("chromeHue",600,r,.15)),i=No("chromeHue",700,r),s=No("background",600,r);return"light"===o&&(a=r.shadows.lg(3*r.space.base+"px",5*r.space.base+"px",No("chromeHue",600,r,.15)),t=`${r.borders.sm} ${No("neutralHue",300,r)}`,i=No("background",600,r),s=No("neutralHue",700,r),n=No("foreground",600,r)),tn(["border:",";box-shadow:",";background-color:",";color:",";","{color:",";}"],t,a,i,s,ty,n)}),(e=>Kn(ny,e)));ry.defaultProps={theme:Wn};const oy=kn.div.withConfig({displayName:"StyledTooltipWrapper",componentId:"sc-1b7q9q6-0"})(["transition:opacity 10ms;opacity:1;z-index:",";&[aria-hidden='true']{visibility:hidden;opacity:0;}"],(e=>e.zIndex));oy.defaultProps={theme:Wn};const ay=["auto","top","top-start","top-end","bottom","bottom-start","bottom-end","end","end-top","end-bottom","start","start-top","start-bottom"],iy=e=>{let{id:t,delayMS:n,isInitialVisible:r,content:o,refKey:a,placement:i,eventsEnabled:s,popperModifiers:l,children:c,hasArrow:u,size:d,type:m,appendToNode:h,zIndex:g,isVisible:b,...v}=e;const{rtl:y}=p.useContext(pn),w=p.useRef(),{isVisible:x,getTooltipProps:k,getTriggerProps:E,openTooltip:C,closeTooltip:O}=Vm({id:t,delayMilliseconds:n,isVisible:r}),P=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];for(const e of t)if(void 0!==e)return e}(b,x);p.useEffect((()=>{P&&w.current&&w.current()}),[P,o]);const I=y?function(e){const t=Qv(e);return{left:"right","left-start":"right-start","left-end":"right-end","top-start":"top-end","top-end":"top-start",right:"left","right-start":"left-start","right-end":"left-end","bottom-start":"bottom-end","bottom-end":"bottom-start"}[t]||t}(i):Qv(i),_=f.Children.only(c),T={preventOverflow:{boundariesElement:"window"},...l};return f.createElement($v,null,f.createElement(Xv,null,(e=>{let{ref:t}=e;return p.cloneElement(_,E({..._.props,[a]:ea([t,_.ref?_.ref:null])}))})),f.createElement(Kv,{placement:I,eventsEnabled:P&&s,modifiers:T},(e=>{let{ref:t,style:n,scheduleUpdate:r,placement:a}=e;w.current=r;const{onFocus:i,onBlur:s,...l}=v;let c=d;void 0===c&&(c="dark"===m?"small":"large");const p={hasArrow:u,placement:a,size:c,onFocus:Um(i,(()=>{C()})),onBlur:Um(s,(()=>{O(0)})),"aria-hidden":!P,type:m,...l},b=f.createElement(oy,{ref:P?t:null,style:n,zIndex:g,"aria-hidden":!P},f.createElement(ry,k(p),o));return h?S.createPortal(b,h):b})))};iy.displayName="Tooltip",iy.propTypes={appendToNode:Cn.any,hasArrow:Cn.bool,delayMS:Cn.number,eventsEnabled:Cn.bool,id:Cn.string,content:Cn.node.isRequired,placement:Cn.oneOf(ay),popperModifiers:Cn.any,size:Cn.oneOf(["small","medium","large","extra-large"]),type:Cn.oneOf(["light","dark"]),zIndex:Cn.oneOfType([Cn.number,Cn.string]),isInitialVisible:Cn.bool,refKey:Cn.string},iy.defaultProps={hasArrow:!0,eventsEnabled:!0,type:"dark",placement:"top",delayMS:500,refKey:"ref"};const sy=wf.Avatar;sy.displayName="Tag.Avatar";const ly=sy,cy=p.forwardRef(((e,t)=>{let{children:n,option:r,removeLabel:o,tooltipZIndex:a,...i}=e;const{getTagProps:s,isCompact:l,removeSelection:c}=gp(),u=r.label||Hm(r),d=Do(uy,i,"aria-label",`${u}, press delete or backspace to remove`,!r.disabled),m=s({option:r,"aria-label":d}),h=p.useContext(pn)||Wn,g=qn(h),b=()=>c(r.value);return f.createElement(kf,Object.assign({"aria-disabled":r.disabled,tabIndex:r.disabled?void 0:0},m,i,{size:l?"medium":"large",ref:t}),n||f.createElement("span",null,u),!r.disabled&&(o?f.createElement(iy,{appendToNode:g?.body,content:o,zIndex:a},f.createElement(kf.Close,{"aria-label":o,onClick:b})):f.createElement(kf.Close,{onClick:b})))}));cy.displayName="Tag",cy.propTypes={hue:Cn.string,isPill:Cn.bool,isRegular:Cn.bool,removeLabel:Cn.string};const uy=cy;uy.Avatar=ly;const dy=e=>{let{children:t,isDisabled:n,isExpanded:r,listboxZIndex:o,maxTags:a,optionTagProps:i,selection:s}=e;return f.createElement(f.Fragment,null,s.map(((e,t)=>{const s=Hm(e),l=n||e.disabled;return f.createElement(uy,Object.assign({key:s,hidden:!r&&t>=a,option:{...e,disabled:l},tooltipZIndex:o?o+1:void 0},i[s]))})),t)};dy.displayName="TagGroup";const py=4,fy=p.forwardRef(((e,t)=>{let{children:n,activeIndex:r,defaultActiveIndex:o,defaultExpanded:a,endIcon:i,focusInset:s,inputProps:l,inputValue:c,isAutocomplete:u,isBare:d,isCompact:m,isDisabled:h,isEditable:g,isExpanded:b,isMultiselectable:v,listboxAppendToNode:y,listboxAriaLabel:w,listboxMaxHeight:x,listboxMinHeight:k,listboxZIndex:E,maxHeight:S,maxTags:C=py,onChange:O,placeholder:P,renderExpandTags:I,renderValue:_,selectionValue:T,startIcon:N,validation:j,...A}=e;const{hasHint:R,hasMessage:L,labelProps:M,setLabelProps:D,hintProps:z,setHintProps:F,messageProps:H,setMessageProps:$}=vp(),[B,V]=p.useState(!0),[U,W]=p.useState(!1),[q,G]=p.useState(!1),[K,Y]=p.useState({}),X=p.useMemo((()=>{const e={},t=Bm(n,e);return v&&Y((t=>({...t,...e}))),t}),[n,v]),Q=p.useRef(null),J=p.useRef(null),Z=p.useRef(null),ee=(e=>{const[t,n]=p.useState();return p.useEffect((()=>{e&&e.window?n(e.window):n(window)}),[e]),t})(p.useContext(pn)||Wn),{activeValue:te,inputValue:ne,isExpanded:re,getTriggerProps:oe,getHintProps:ae,getInputProps:ie,getLabelProps:se,getListboxProps:le,getMessageProps:ce,getOptionProps:ue,getOptGroupProps:de,getTagProps:pe,removeSelection:fe,selection:me}=Xl({idPrefix:A.id,triggerRef:Q,inputRef:J,listboxRef:Z,options:X,environment:ee,hasHint:R,hasMessage:L,isAutocomplete:u,isEditable:g,isMultiselectable:v,disabled:h,inputValue:c,selectionValue:T,isExpanded:b,defaultExpanded:a,activeIndex:r,defaultActiveIndex:o,onChange:O}),he=p.useMemo((()=>({activeValue:te,getOptionProps:ue,getOptGroupProps:de,getTagProps:pe,isCompact:m,removeSelection:fe})),[te,ue,de,pe,m,fe]),ge=p.useMemo((()=>!d&&(u||!g)),[u,d,g]),be=Do(fy,{renderExpandTags:I},"renderExpandTags","+ {{value}} more",v||!1),ve=Do(fy,{listboxAriaLabel:w},"listboxAriaLabel","Options"),ye={isAutocomplete:u,isBare:d,isCompact:m,isEditable:g,isLabelHovered:U,isMultiselectable:v,maxHeight:S,focusInset:s,validation:j,...oe({onFocus:()=>{h||(g&&V(!1),v&&G(!0))},onBlur:e=>{null!==e.relatedTarget&&Q.current?.contains(e.relatedTarget)||(g&&V(!0),v&&G(!1))}})},we={"aria-invalid":"error"===j||"warning"===j,hidden:B,isBare:d,isCompact:m,isEditable:g,isMultiselectable:v,placeholder:P,...ie({...l})},xe=le({"aria-label":ve});return p.useEffect((()=>{if(!M){const e=se({onMouseEnter:()=>W(!0),onMouseLeave:()=>W(!1)});D(e)}return()=>M&&D(void 0)}),[se,M,D]),p.useEffect((()=>{if(!z){const e=ae();F(e)}return()=>z&&F(void 0)}),[ae,z,F]),p.useEffect((()=>{if(!H){const e=ce();$(e)}return()=>H&&$(void 0)}),[ce,H,$]),f.createElement(hp.Provider,{value:he},f.createElement(Op,Object.assign({isCompact:m,tabIndex:-1},A,{ref:t}),f.createElement(Hp,ye,f.createElement(Ip,null,N&&f.createElement(Bp,{isLabelHovered:U,isCompact:m},N),f.createElement(zp,null,v&&Array.isArray(me)&&f.createElement(dy,{isDisabled:h,isExpanded:q,maxTags:C,optionTagProps:K,selection:me},me.length>C&&f.createElement(Of,{disabled:h,hidden:q,isCompact:m,tabIndex:-1,type:"button"},(()=>{const e=me.length-C;return I?I(e):be?.replace("{{value}}",e.toString())})())),f.createElement(Sf,{hidden:!B,isAutocomplete:u,isBare:d,isCompact:m,isDisabled:h,isEditable:g,isMultiselectable:v,isPlaceholder:!(ne||_)},_?_({selection:me,inputValue:ne}):ne||P),f.createElement(Mp,we)),(ge||i)&&f.createElement(Bp,{isCompact:m,isEnd:!0,isLabelHovered:U,isRotated:ge&&re},ge?f.createElement(mp,null):i))),f.createElement(Fm,Object.assign({appendToNode:y,isCompact:m,isExpanded:re,maxHeight:x,minHeight:k,triggerRef:Q,zIndex:E},xe),n)))}));fy.displayName="Combobox",fy.propTypes={activeIndex:Cn.number,defaultActiveIndex:Cn.number,defaultExpanded:Cn.bool,endIcon:Cn.any,focusInset:Cn.bool,id:Cn.string,inputProps:Cn.object,inputValue:Cn.string,isAutocomplete:Cn.bool,isBare:Cn.bool,isCompact:Cn.bool,isDisabled:Cn.bool,isEditable:Cn.bool,isExpanded:Cn.bool,isMultiselectable:Cn.bool,listboxAppendToNode:Cn.any,listboxAriaLabel:Cn.string,listboxMaxHeight:Cn.string,listboxMinHeight:Cn.string,listboxZIndex:Cn.number,maxHeight:Cn.string,maxTags:Cn.number,onChange:Cn.func,placeholder:Cn.string,renderExpandTags:Cn.func,renderValue:Cn.func,selectionValue:Cn.any,startIcon:Cn.any,validation:Cn.oneOf(zu)},fy.defaultProps={isEditable:!0,listboxMaxHeight:"400px",listboxZIndex:1e3,maxTags:py};const my=p.forwardRef(((e,t)=>{const[n,r]=p.useState(void 0),[o,a]=p.useState(void 0),[i,s]=p.useState(void 0),[l,c]=p.useState(!1),[u,d]=p.useState(!1),m=p.useMemo((()=>({labelProps:n,setLabelProps:r,hasHint:l,setHasHint:c,hintProps:o,setHintProps:a,hasMessage:u,setHasMessage:d,messageProps:i,setMessageProps:s})),[n,r,l,c,o,a,u,d,i,s]);return f.createElement(bp.Provider,{value:m},f.createElement(Tp,Object.assign({},e,{ref:t})))}));my.displayName="Field";const hy=p.forwardRef(((e,t)=>{const{hintProps:n,setHasHint:r}=vp();return p.useEffect((()=>(r(!0),()=>r(!1))),[r]),f.createElement(kp,Object.assign({},n,e,{ref:t}))}));hy.displayName="Hint";const gy=p.forwardRef(((e,t)=>{let{onClick:n,onMouseEnter:r,onMouseLeave:o,...a}=e;const{labelProps:i}=vp();return f.createElement(wp,Object.assign({},i,{onClick:zm(n,i?.onClick),onMouseEnter:zm(r,i?.onMouseEnter),onMouseLeave:zm(o,i?.onMouseLeave)},a,{ref:t}))}));gy.displayName="Label",gy.propTypes={hidden:Cn.bool,isRegular:Cn.bool};const by=p.forwardRef(((e,t)=>{const{messageProps:n,setHasMessage:r}=vp();return p.useEffect((()=>(r(!0),()=>r(!1))),[r]),f.createElement(Sp,Object.assign({},n,e,{ref:t}))}));var vy;function yy(){return yy=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},yy.apply(null,arguments)}by.displayName="Message",by.propTypes={validation:Cn.oneOf(zu),validationLabel:Cn.string};var wy,xy=function(e){return p.createElement("svg",yy({xmlns:"http://www.w3.org/2000/svg",width:16,height:16,focusable:"false",viewBox:"0 0 16 16","aria-hidden":"true"},e),vy||(vy=p.createElement("path",{stroke:"currentColor",strokeLinecap:"round",d:"M7.5 2.5v12m6-6h-12"})))};function ky(){return ky=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},ky.apply(null,arguments)}var Ey,Sy=function(e){return p.createElement("svg",ky({xmlns:"http://www.w3.org/2000/svg",width:16,height:16,focusable:"false",viewBox:"0 0 16 16","aria-hidden":"true"},e),wy||(wy=p.createElement("path",{fill:"currentColor",d:"M5.61 3.312a.5.5 0 01.718-.69l.062.066 4 5a.5.5 0 01.054.542l-.054.082-4 5a.5.5 0 01-.83-.55l.05-.074L9.359 8l-3.75-4.688z"})))};function Cy(){return Cy=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Cy.apply(null,arguments)}var Oy,Py=function(e){return p.createElement("svg",Cy({xmlns:"http://www.w3.org/2000/svg",width:16,height:16,focusable:"false",viewBox:"0 0 16 16","aria-hidden":"true"},e),Ey||(Ey=p.createElement("path",{fill:"currentColor",d:"M10.39 12.688a.5.5 0 01-.718.69l-.062-.066-4-5a.5.5 0 01-.054-.542l.054-.082 4-5a.5.5 0 01.83.55l-.05.074L6.641 8l3.75 4.688z"})))};function Iy(){return Iy=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Iy.apply(null,arguments)}var _y=function(e){return p.createElement("svg",Iy({xmlns:"http://www.w3.org/2000/svg",width:16,height:16,focusable:"false",viewBox:"0 0 16 16","aria-hidden":"true"},e),Oy||(Oy=p.createElement("path",{fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",d:"M1 9l4 4L15 3"})))};const Ty=p.createContext(void 0),Ny=p.forwardRef(((e,t)=>{const{isDisabled:n}=(()=>{const e=p.useContext(Ty);if(!e)throw new Error("Error: this component must be rendered within an <Option>.");return e})();return f.createElement(nf,Object.assign({isDisabled:n},e,{ref:t}))}));Ny.displayName="Option.Meta";const jy=Ny,Ay=p.forwardRef(((e,t)=>{let{children:n,icon:r,isDisabled:o,isHidden:a,isSelected:i,label:s,type:l,value:c,...u}=e;const d=p.useMemo((()=>({isDisabled:o})),[o]),{activeValue:m,getOptionProps:h,isCompact:g}=gp(),b=c===m,v=p.useRef(null);p.useEffect((()=>{b&&setTimeout((()=>{v.current&&v.current.scrollIntoView&&v.current.scrollIntoView({block:"nearest"})}))}),[b]);const y=h({option:$m({value:c,label:s,isDisabled:o,isHidden:a,isSelected:i}),ref:ea([v,t])});return f.createElement(Ty.Provider,{value:d},f.createElement(Wp,Object.assign({isActive:b,isCompact:g,$type:l},u,y),f.createElement(of,{isCompact:g,type:l},(e=>{switch(e){case"add":return f.createElement(xy,null);case"next":return f.createElement(Sy,null);case"previous":return f.createElement(Py,null);default:return f.createElement(_y,null)}})(l)),r&&f.createElement(ef,null,r),f.createElement(Gp,null,n||s||Hm({value:c}))))}));Ay.displayName="Option",Ay.propTypes={icon:Cn.any,isDisabled:Cn.bool,isSelected:Cn.bool,isHidden:Cn.bool,label:Cn.string,tagProps:Cn.object,type:Cn.oneOf(["add","danger","next","previous"]),value:Cn.oneOfType([Cn.string,Cn.object]).isRequired};const Ry=Ay;Ry.Meta=jy;const Ly=p.forwardRef(((e,t)=>{let{children:n,content:r,icon:o,label:a,"aria-label":i,onMouseDown:s,...l}=e;const{getOptGroupProps:c,isCompact:u}=gp(),d=c({"aria-label":Do(Ly,{"aria-label":i},"aria-label","Group",!a)||a});return f.createElement(Wp,Object.assign({isCompact:u,$type:"group",onMouseDown:zm(s,(e=>e.preventDefault())),role:"none"},l,{ref:t}),f.createElement(Gp,null,(r||a)&&f.createElement(Wp,{as:"div",isCompact:u,$type:"header"},o&&f.createElement(of,{isCompact:u,type:"header"},o),r||a),f.createElement(Yp,Object.assign({isCompact:u},d),f.createElement(Qp,{role:"none"}),n)))}));Ly.displayName="OptGroup",Ly.propTypes={content:Cn.any,icon:Cn.any,label:Cn.string};
/*! @license DOMPurify 3.0.11 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.0.11/LICENSE */
const{entries:My,setPrototypeOf:Dy,isFrozen:zy,getPrototypeOf:Fy,getOwnPropertyDescriptor:Hy}=Object;let{freeze:$y,seal:By,create:Vy}=Object,{apply:Uy,construct:Wy}="undefined"!=typeof Reflect&&Reflect;$y||($y=function(e){return e}),By||(By=function(e){return e}),Uy||(Uy=function(e,t,n){return e.apply(t,n)}),Wy||(Wy=function(e,t){return new e(...t)});const qy=aw(Array.prototype.forEach),Gy=aw(Array.prototype.pop),Ky=aw(Array.prototype.push),Yy=aw(String.prototype.toLowerCase),Xy=aw(String.prototype.toString),Qy=aw(String.prototype.match),Jy=aw(String.prototype.replace),Zy=aw(String.prototype.indexOf),ew=aw(String.prototype.trim),tw=aw(Object.prototype.hasOwnProperty),nw=aw(RegExp.prototype.test),rw=(ow=TypeError,function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return Wy(ow,t)});var ow;function aw(e){return function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return Uy(e,t,r)}}function iw(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:Yy;Dy&&Dy(e,null);let r=t.length;for(;r--;){let o=t[r];if("string"==typeof o){const e=n(o);e!==o&&(zy(t)||(t[r]=e),o=e)}e[o]=!0}return e}function sw(e){for(let t=0;t<e.length;t++){tw(e,t)||(e[t]=null)}return e}function lw(e){const t=Vy(null);for(const[n,r]of My(e)){tw(e,n)&&(Array.isArray(r)?t[n]=sw(r):r&&"object"==typeof r&&r.constructor===Object?t[n]=lw(r):t[n]=r)}return t}function cw(e,t){for(;null!==e;){const n=Hy(e,t);if(n){if(n.get)return aw(n.get);if("function"==typeof n.value)return aw(n.value)}e=Fy(e)}return function(){return null}}const uw=$y(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),dw=$y(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),pw=$y(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),fw=$y(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),mw=$y(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),hw=$y(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),gw=$y(["#text"]),bw=$y(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","xmlns","slot"]),vw=$y(["accent-height","accumulate","additive","alignment-baseline","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),yw=$y(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),ww=$y(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),xw=By(/\{\{[\w\W]*|[\w\W]*\}\}/gm),kw=By(/<%[\w\W]*|[\w\W]*%>/gm),Ew=By(/\${[\w\W]*}/gm),Sw=By(/^data-[\-\w.\u00B7-\uFFFF]/),Cw=By(/^aria-[\-\w]+$/),Ow=By(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Pw=By(/^(?:\w+script|data):/i),Iw=By(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),_w=By(/^html$/i),Tw=By(/^[a-z][.\w]*(-[.\w]+)+$/i);var Nw=Object.freeze({__proto__:null,MUSTACHE_EXPR:xw,ERB_EXPR:kw,TMPLIT_EXPR:Ew,DATA_ATTR:Sw,ARIA_ATTR:Cw,IS_ALLOWED_URI:Ow,IS_SCRIPT_OR_DATA:Pw,ATTR_WHITESPACE:Iw,DOCTYPE_NAME:_w,CUSTOM_ELEMENT:Tw});const jw=function(){return"undefined"==typeof window?null:window};var Aw=function e(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:jw();const n=t=>e(t);if(n.version="3.0.11",n.removed=[],!t||!t.document||9!==t.document.nodeType)return n.isSupported=!1,n;let{document:r}=t;const o=r,a=o.currentScript,{DocumentFragment:i,HTMLTemplateElement:s,Node:l,Element:c,NodeFilter:u,NamedNodeMap:d=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:p,DOMParser:f,trustedTypes:m}=t,h=c.prototype,g=cw(h,"cloneNode"),b=cw(h,"nextSibling"),v=cw(h,"childNodes"),y=cw(h,"parentNode");if("function"==typeof s){const e=r.createElement("template");e.content&&e.content.ownerDocument&&(r=e.content.ownerDocument)}let w,x="";const{implementation:k,createNodeIterator:E,createDocumentFragment:S,getElementsByTagName:C}=r,{importNode:O}=o;let P={};n.isSupported="function"==typeof My&&"function"==typeof y&&k&&void 0!==k.createHTMLDocument;const{MUSTACHE_EXPR:I,ERB_EXPR:_,TMPLIT_EXPR:T,DATA_ATTR:N,ARIA_ATTR:j,IS_SCRIPT_OR_DATA:A,ATTR_WHITESPACE:R,CUSTOM_ELEMENT:L}=Nw;let{IS_ALLOWED_URI:M}=Nw,D=null;const z=iw({},[...uw,...dw,...pw,...mw,...gw]);let F=null;const H=iw({},[...bw,...vw,...yw,...ww]);let $=Object.seal(Vy(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),B=null,V=null,U=!0,W=!0,q=!1,G=!0,K=!1,Y=!1,X=!1,Q=!1,J=!1,Z=!1,ee=!1,te=!0,ne=!1,re=!0,oe=!1,ae={},ie=null;const se=iw({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let le=null;const ce=iw({},["audio","video","img","source","image","track"]);let ue=null;const de=iw({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),pe="http://www.w3.org/1998/Math/MathML",fe="http://www.w3.org/2000/svg",me="http://www.w3.org/1999/xhtml";let he=me,ge=!1,be=null;const ve=iw({},[pe,fe,me],Xy);let ye=null;const we=["application/xhtml+xml","text/html"];let xe=null,ke=null;const Ee=r.createElement("form"),Se=function(e){return e instanceof RegExp||e instanceof Function},Ce=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(!ke||ke!==e){if(e&&"object"==typeof e||(e={}),e=lw(e),ye=-1===we.indexOf(e.PARSER_MEDIA_TYPE)?"text/html":e.PARSER_MEDIA_TYPE,xe="application/xhtml+xml"===ye?Xy:Yy,D=tw(e,"ALLOWED_TAGS")?iw({},e.ALLOWED_TAGS,xe):z,F=tw(e,"ALLOWED_ATTR")?iw({},e.ALLOWED_ATTR,xe):H,be=tw(e,"ALLOWED_NAMESPACES")?iw({},e.ALLOWED_NAMESPACES,Xy):ve,ue=tw(e,"ADD_URI_SAFE_ATTR")?iw(lw(de),e.ADD_URI_SAFE_ATTR,xe):de,le=tw(e,"ADD_DATA_URI_TAGS")?iw(lw(ce),e.ADD_DATA_URI_TAGS,xe):ce,ie=tw(e,"FORBID_CONTENTS")?iw({},e.FORBID_CONTENTS,xe):se,B=tw(e,"FORBID_TAGS")?iw({},e.FORBID_TAGS,xe):{},V=tw(e,"FORBID_ATTR")?iw({},e.FORBID_ATTR,xe):{},ae=!!tw(e,"USE_PROFILES")&&e.USE_PROFILES,U=!1!==e.ALLOW_ARIA_ATTR,W=!1!==e.ALLOW_DATA_ATTR,q=e.ALLOW_UNKNOWN_PROTOCOLS||!1,G=!1!==e.ALLOW_SELF_CLOSE_IN_ATTR,K=e.SAFE_FOR_TEMPLATES||!1,Y=e.WHOLE_DOCUMENT||!1,J=e.RETURN_DOM||!1,Z=e.RETURN_DOM_FRAGMENT||!1,ee=e.RETURN_TRUSTED_TYPE||!1,Q=e.FORCE_BODY||!1,te=!1!==e.SANITIZE_DOM,ne=e.SANITIZE_NAMED_PROPS||!1,re=!1!==e.KEEP_CONTENT,oe=e.IN_PLACE||!1,M=e.ALLOWED_URI_REGEXP||Ow,he=e.NAMESPACE||me,$=e.CUSTOM_ELEMENT_HANDLING||{},e.CUSTOM_ELEMENT_HANDLING&&Se(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&($.tagNameCheck=e.CUSTOM_ELEMENT_HANDLING.tagNameCheck),e.CUSTOM_ELEMENT_HANDLING&&Se(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&($.attributeNameCheck=e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),e.CUSTOM_ELEMENT_HANDLING&&"boolean"==typeof e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements&&($.allowCustomizedBuiltInElements=e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),K&&(W=!1),Z&&(J=!0),ae&&(D=iw({},gw),F=[],!0===ae.html&&(iw(D,uw),iw(F,bw)),!0===ae.svg&&(iw(D,dw),iw(F,vw),iw(F,ww)),!0===ae.svgFilters&&(iw(D,pw),iw(F,vw),iw(F,ww)),!0===ae.mathMl&&(iw(D,mw),iw(F,yw),iw(F,ww))),e.ADD_TAGS&&(D===z&&(D=lw(D)),iw(D,e.ADD_TAGS,xe)),e.ADD_ATTR&&(F===H&&(F=lw(F)),iw(F,e.ADD_ATTR,xe)),e.ADD_URI_SAFE_ATTR&&iw(ue,e.ADD_URI_SAFE_ATTR,xe),e.FORBID_CONTENTS&&(ie===se&&(ie=lw(ie)),iw(ie,e.FORBID_CONTENTS,xe)),re&&(D["#text"]=!0),Y&&iw(D,["html","head","body"]),D.table&&(iw(D,["tbody"]),delete B.tbody),e.TRUSTED_TYPES_POLICY){if("function"!=typeof e.TRUSTED_TYPES_POLICY.createHTML)throw rw('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if("function"!=typeof e.TRUSTED_TYPES_POLICY.createScriptURL)throw rw('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');w=e.TRUSTED_TYPES_POLICY,x=w.createHTML("")}else void 0===w&&(w=function(e,t){if("object"!=typeof e||"function"!=typeof e.createPolicy)return null;let n=null;const r="data-tt-policy-suffix";t&&t.hasAttribute(r)&&(n=t.getAttribute(r));const o="dompurify"+(n?"#"+n:"");try{return e.createPolicy(o,{createHTML:e=>e,createScriptURL:e=>e})}catch(e){return console.warn("TrustedTypes policy "+o+" could not be created."),null}}(m,a)),null!==w&&"string"==typeof x&&(x=w.createHTML(""));$y&&$y(e),ke=e}},Oe=iw({},["mi","mo","mn","ms","mtext"]),Pe=iw({},["foreignobject","desc","title","annotation-xml"]),Ie=iw({},["title","style","font","a","script"]),_e=iw({},[...dw,...pw,...fw]),Te=iw({},[...mw,...hw]),Ne=function(e){Ky(n.removed,{element:e});try{e.parentNode.removeChild(e)}catch(t){e.remove()}},je=function(e,t){try{Ky(n.removed,{attribute:t.getAttributeNode(e),from:t})}catch(e){Ky(n.removed,{attribute:null,from:t})}if(t.removeAttribute(e),"is"===e&&!F[e])if(J||Z)try{Ne(t)}catch(e){}else try{t.setAttribute(e,"")}catch(e){}},Ae=function(e){let t=null,n=null;if(Q)e="<remove></remove>"+e;else{const t=Qy(e,/^[\r\n\t ]+/);n=t&&t[0]}"application/xhtml+xml"===ye&&he===me&&(e='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+e+"</body></html>");const o=w?w.createHTML(e):e;if(he===me)try{t=(new f).parseFromString(o,ye)}catch(e){}if(!t||!t.documentElement){t=k.createDocument(he,"template",null);try{t.documentElement.innerHTML=ge?x:o}catch(e){}}const a=t.body||t.documentElement;return e&&n&&a.insertBefore(r.createTextNode(n),a.childNodes[0]||null),he===me?C.call(t,Y?"html":"body")[0]:Y?t.documentElement:a},Re=function(e){return E.call(e.ownerDocument||e,e,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Le=function(e){return"function"==typeof l&&e instanceof l},Me=function(e,t,r){P[e]&&qy(P[e],(e=>{e.call(n,t,r,ke)}))},De=function(e){let t=null;if(Me("beforeSanitizeElements",e,null),(r=e)instanceof p&&("string"!=typeof r.nodeName||"string"!=typeof r.textContent||"function"!=typeof r.removeChild||!(r.attributes instanceof d)||"function"!=typeof r.removeAttribute||"function"!=typeof r.setAttribute||"string"!=typeof r.namespaceURI||"function"!=typeof r.insertBefore||"function"!=typeof r.hasChildNodes))return Ne(e),!0;var r;const o=xe(e.nodeName);if(Me("uponSanitizeElement",e,{tagName:o,allowedTags:D}),e.hasChildNodes()&&!Le(e.firstElementChild)&&nw(/<[/\w]/g,e.innerHTML)&&nw(/<[/\w]/g,e.textContent))return Ne(e),!0;if(7===e.nodeType)return Ne(e),!0;if(!D[o]||B[o]){if(!B[o]&&Fe(o)){if($.tagNameCheck instanceof RegExp&&nw($.tagNameCheck,o))return!1;if($.tagNameCheck instanceof Function&&$.tagNameCheck(o))return!1}if(re&&!ie[o]){const t=y(e)||e.parentNode,n=v(e)||e.childNodes;if(n&&t){for(let r=n.length-1;r>=0;--r)t.insertBefore(g(n[r],!0),b(e))}}return Ne(e),!0}return e instanceof c&&!function(e){let t=y(e);t&&t.tagName||(t={namespaceURI:he,tagName:"template"});const n=Yy(e.tagName),r=Yy(t.tagName);return!!be[e.namespaceURI]&&(e.namespaceURI===fe?t.namespaceURI===me?"svg"===n:t.namespaceURI===pe?"svg"===n&&("annotation-xml"===r||Oe[r]):Boolean(_e[n]):e.namespaceURI===pe?t.namespaceURI===me?"math"===n:t.namespaceURI===fe?"math"===n&&Pe[r]:Boolean(Te[n]):e.namespaceURI===me?!(t.namespaceURI===fe&&!Pe[r])&&!(t.namespaceURI===pe&&!Oe[r])&&!Te[n]&&(Ie[n]||!_e[n]):!("application/xhtml+xml"!==ye||!be[e.namespaceURI]))}(e)?(Ne(e),!0):"noscript"!==o&&"noembed"!==o&&"noframes"!==o||!nw(/<\/no(script|embed|frames)/i,e.innerHTML)?(K&&3===e.nodeType&&(t=e.textContent,qy([I,_,T],(e=>{t=Jy(t,e," ")})),e.textContent!==t&&(Ky(n.removed,{element:e.cloneNode()}),e.textContent=t)),Me("afterSanitizeElements",e,null),!1):(Ne(e),!0)},ze=function(e,t,n){if(te&&("id"===t||"name"===t)&&(n in r||n in Ee))return!1;if(W&&!V[t]&&nw(N,t));else if(U&&nw(j,t));else if(!F[t]||V[t]){if(!(Fe(e)&&($.tagNameCheck instanceof RegExp&&nw($.tagNameCheck,e)||$.tagNameCheck instanceof Function&&$.tagNameCheck(e))&&($.attributeNameCheck instanceof RegExp&&nw($.attributeNameCheck,t)||$.attributeNameCheck instanceof Function&&$.attributeNameCheck(t))||"is"===t&&$.allowCustomizedBuiltInElements&&($.tagNameCheck instanceof RegExp&&nw($.tagNameCheck,n)||$.tagNameCheck instanceof Function&&$.tagNameCheck(n))))return!1}else if(ue[t]);else if(nw(M,Jy(n,R,"")));else if("src"!==t&&"xlink:href"!==t&&"href"!==t||"script"===e||0!==Zy(n,"data:")||!le[e]){if(q&&!nw(A,Jy(n,R,"")));else if(n)return!1}else;return!0},Fe=function(e){return"annotation-xml"!==e&&Qy(e,L)},He=function(e){Me("beforeSanitizeAttributes",e,null);const{attributes:t}=e;if(!t)return;const r={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:F};let o=t.length;for(;o--;){const a=t[o],{name:i,namespaceURI:s,value:l}=a,c=xe(i);let u="value"===i?l:ew(l);if(r.attrName=c,r.attrValue=u,r.keepAttr=!0,r.forceKeepAttr=void 0,Me("uponSanitizeAttribute",e,r),u=r.attrValue,r.forceKeepAttr)continue;if(je(i,e),!r.keepAttr)continue;if(!G&&nw(/\/>/i,u)){je(i,e);continue}K&&qy([I,_,T],(e=>{u=Jy(u,e," ")}));const d=xe(e.nodeName);if(ze(d,c,u)){if(!ne||"id"!==c&&"name"!==c||(je(i,e),u="user-content-"+u),w&&"object"==typeof m&&"function"==typeof m.getAttributeType)if(s);else switch(m.getAttributeType(d,c)){case"TrustedHTML":u=w.createHTML(u);break;case"TrustedScriptURL":u=w.createScriptURL(u)}try{s?e.setAttributeNS(s,i,u):e.setAttribute(i,u),Gy(n.removed)}catch(e){}}}Me("afterSanitizeAttributes",e,null)},$e=function e(t){let n=null;const r=Re(t);for(Me("beforeSanitizeShadowDOM",t,null);n=r.nextNode();)Me("uponSanitizeShadowNode",n,null),De(n)||(n.content instanceof i&&e(n.content),He(n));Me("afterSanitizeShadowDOM",t,null)};return n.sanitize=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=null,a=null,s=null,c=null;if(ge=!e,ge&&(e="\x3c!--\x3e"),"string"!=typeof e&&!Le(e)){if("function"!=typeof e.toString)throw rw("toString is not a function");if("string"!=typeof(e=e.toString()))throw rw("dirty is not a string, aborting")}if(!n.isSupported)return e;if(X||Ce(t),n.removed=[],"string"==typeof e&&(oe=!1),oe){if(e.nodeName){const t=xe(e.nodeName);if(!D[t]||B[t])throw rw("root node is forbidden and cannot be sanitized in-place")}}else if(e instanceof l)r=Ae("\x3c!----\x3e"),a=r.ownerDocument.importNode(e,!0),1===a.nodeType&&"BODY"===a.nodeName||"HTML"===a.nodeName?r=a:r.appendChild(a);else{if(!J&&!K&&!Y&&-1===e.indexOf("<"))return w&&ee?w.createHTML(e):e;if(r=Ae(e),!r)return J?null:ee?x:""}r&&Q&&Ne(r.firstChild);const u=Re(oe?e:r);for(;s=u.nextNode();)De(s)||(s.content instanceof i&&$e(s.content),He(s));if(oe)return e;if(J){if(Z)for(c=S.call(r.ownerDocument);r.firstChild;)c.appendChild(r.firstChild);else c=r;return(F.shadowroot||F.shadowrootmode)&&(c=O.call(o,c,!0)),c}let d=Y?r.outerHTML:r.innerHTML;return Y&&D["!doctype"]&&r.ownerDocument&&r.ownerDocument.doctype&&r.ownerDocument.doctype.name&&nw(_w,r.ownerDocument.doctype.name)&&(d="<!DOCTYPE "+r.ownerDocument.doctype.name+">\n"+d),K&&qy([I,_,T],(e=>{d=Jy(d,e," ")})),w&&ee?w.createHTML(d):d},n.setConfig=function(){Ce(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}),X=!0},n.clearConfig=function(){ke=null,X=!1},n.isValidAttribute=function(e,t,n){ke||Ce({});const r=xe(e),o=xe(t);return ze(r,o,n)},n.addHook=function(e,t){"function"==typeof t&&(P[e]=P[e]||[],Ky(P[e],t))},n.removeHook=function(e){if(P[e])return Gy(P[e])},n.removeHooks=function(e){P[e]&&(P[e]=[])},n.removeAllHooks=function(){P={}},n}(),Rw=new Map([["aac","audio/aac"],["abw","application/x-abiword"],["arc","application/x-freearc"],["avif","image/avif"],["avi","video/x-msvideo"],["azw","application/vnd.amazon.ebook"],["bin","application/octet-stream"],["bmp","image/bmp"],["bz","application/x-bzip"],["bz2","application/x-bzip2"],["cda","application/x-cdf"],["csh","application/x-csh"],["css","text/css"],["csv","text/csv"],["doc","application/msword"],["docx","application/vnd.openxmlformats-officedocument.wordprocessingml.document"],["eot","application/vnd.ms-fontobject"],["epub","application/epub+zip"],["gz","application/gzip"],["gif","image/gif"],["heic","image/heic"],["heif","image/heif"],["htm","text/html"],["html","text/html"],["ico","image/vnd.microsoft.icon"],["ics","text/calendar"],["jar","application/java-archive"],["jpeg","image/jpeg"],["jpg","image/jpeg"],["js","text/javascript"],["json","application/json"],["jsonld","application/ld+json"],["mid","audio/midi"],["midi","audio/midi"],["mjs","text/javascript"],["mp3","audio/mpeg"],["mp4","video/mp4"],["mpeg","video/mpeg"],["mpkg","application/vnd.apple.installer+xml"],["odp","application/vnd.oasis.opendocument.presentation"],["ods","application/vnd.oasis.opendocument.spreadsheet"],["odt","application/vnd.oasis.opendocument.text"],["oga","audio/ogg"],["ogv","video/ogg"],["ogx","application/ogg"],["opus","audio/opus"],["otf","font/otf"],["png","image/png"],["pdf","application/pdf"],["php","application/x-httpd-php"],["ppt","application/vnd.ms-powerpoint"],["pptx","application/vnd.openxmlformats-officedocument.presentationml.presentation"],["rar","application/vnd.rar"],["rtf","application/rtf"],["sh","application/x-sh"],["svg","image/svg+xml"],["swf","application/x-shockwave-flash"],["tar","application/x-tar"],["tif","image/tiff"],["tiff","image/tiff"],["ts","video/mp2t"],["ttf","font/ttf"],["txt","text/plain"],["vsd","application/vnd.visio"],["wav","audio/wav"],["weba","audio/webm"],["webm","video/webm"],["webp","image/webp"],["woff","font/woff"],["woff2","font/woff2"],["xhtml","application/xhtml+xml"],["xls","application/vnd.ms-excel"],["xlsx","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],["xml","application/xml"],["xul","application/vnd.mozilla.xul+xml"],["zip","application/zip"],["7z","application/x-7z-compressed"],["mkv","video/x-matroska"],["mov","video/quicktime"],["msg","application/vnd.ms-outlook"]]);function Lw(e,t){var n=function(e){var t=e.name;if(t&&-1!==t.lastIndexOf(".")&&!e.type){var n=t.split(".").pop().toLowerCase(),r=Rw.get(n);r&&Object.defineProperty(e,"type",{value:r,writable:!1,configurable:!1,enumerable:!0})}return e}(e);if("string"!=typeof n.path){var r=e.webkitRelativePath;Object.defineProperty(n,"path",{value:"string"==typeof t?t:"string"==typeof r&&r.length>0?r:e.name,writable:!1,configurable:!1,enumerable:!0})}return n}var Mw=[".DS_Store","Thumbs.db"];function Dw(e){return"object"==typeof e&&null!==e}function zw(e){return Bw(e.target.files).map((function(e){return Lw(e)}))}function Fw(e){return Vs(this,void 0,void 0,(function(){return Us(this,(function(t){switch(t.label){case 0:return[4,Promise.all(e.map((function(e){return e.getFile()})))];case 1:return[2,t.sent().map((function(e){return Lw(e)}))]}}))}))}function Hw(e,t){return Vs(this,void 0,void 0,(function(){var n;return Us(this,(function(r){switch(r.label){case 0:return e.items?(n=Bw(e.items).filter((function(e){return"file"===e.kind})),"drop"!==t?[2,n]:[4,Promise.all(n.map(Vw))]):[3,2];case 1:return[2,$w(Uw(r.sent()))];case 2:return[2,$w(Bw(e.files).map((function(e){return Lw(e)})))]}}))}))}function $w(e){return e.filter((function(e){return-1===Mw.indexOf(e.name)}))}function Bw(e){if(null===e)return[];for(var t=[],n=0;n<e.length;n++){var r=e[n];t.push(r)}return t}function Vw(e){if("function"!=typeof e.webkitGetAsEntry)return Ww(e);var t=e.webkitGetAsEntry();return t&&t.isDirectory?Gw(t):Ww(e)}function Uw(e){return e.reduce((function(e,t){return qs(qs([],Ws(e),!1),Ws(Array.isArray(t)?Uw(t):[t]),!1)}),[])}function Ww(e){var t=e.getAsFile();if(!t)return Promise.reject("".concat(e," is not a File"));var n=Lw(t);return Promise.resolve(n)}function qw(e){return Vs(this,void 0,void 0,(function(){return Us(this,(function(t){return[2,e.isDirectory?Gw(e):Kw(e)]}))}))}function Gw(e){var t=e.createReader();return new Promise((function(e,n){var r=[];!function o(){var a=this;t.readEntries((function(t){return Vs(a,void 0,void 0,(function(){var a,i,s;return Us(this,(function(l){switch(l.label){case 0:if(t.length)return[3,5];l.label=1;case 1:return l.trys.push([1,3,,4]),[4,Promise.all(r)];case 2:return a=l.sent(),e(a),[3,4];case 3:return i=l.sent(),n(i),[3,4];case 4:return[3,6];case 5:s=Promise.all(t.map(qw)),r.push(s),o(),l.label=6;case 6:return[2]}}))}))}),(function(e){n(e)}))}()}))}function Kw(e){return Vs(this,void 0,void 0,(function(){return Us(this,(function(t){return[2,new Promise((function(t,n){e.file((function(n){var r=Lw(n,e.fullPath);t(r)}),(function(e){n(e)}))}))]}))}))}var Yw=function(e,t){if(e&&t){var n=Array.isArray(t)?t:t.split(","),r=e.name||"",o=(e.type||"").toLowerCase(),a=o.replace(/\/.*$/,"");return n.some((function(e){var t=e.trim().toLowerCase();return"."===t.charAt(0)?r.toLowerCase().endsWith(t):t.endsWith("/*")?a===t.replace(/\/.*$/,""):o===t}))}return!0};function Xw(e){return function(e){if(Array.isArray(e))return nx(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||tx(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Qw(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function Jw(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Qw(Object(n),!0).forEach((function(t){Zw(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Qw(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function Zw(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function ex(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var r,o,a=[],i=!0,s=!1;try{for(n=n.call(e);!(i=(r=n.next()).done)&&(a.push(r.value),!t||a.length!==t);i=!0);}catch(e){s=!0,o=e}finally{try{i||null==n.return||n.return()}finally{if(s)throw o}}return a}(e,t)||tx(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function tx(e,t){if(e){if("string"==typeof e)return nx(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?nx(e,t):void 0}}function nx(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var rx=function(e){e=Array.isArray(e)&&1===e.length?e[0]:e;var t=Array.isArray(e)?"one of ".concat(e.join(", ")):e;return{code:"file-invalid-type",message:"File type must be ".concat(t)}},ox=function(e){return{code:"file-too-large",message:"File is larger than ".concat(e," ").concat(1===e?"byte":"bytes")}},ax=function(e){return{code:"file-too-small",message:"File is smaller than ".concat(e," ").concat(1===e?"byte":"bytes")}},ix={code:"too-many-files",message:"Too many files"};function sx(e,t){var n="application/x-moz-file"===e.type||Yw(e,t);return[n,n?null:rx(t)]}function lx(e,t,n){if(cx(e.size))if(cx(t)&&cx(n)){if(e.size>n)return[!1,ox(n)];if(e.size<t)return[!1,ax(t)]}else{if(cx(t)&&e.size<t)return[!1,ax(t)];if(cx(n)&&e.size>n)return[!1,ox(n)]}return[!0,null]}function cx(e){return null!=e}function ux(e){return"function"==typeof e.isPropagationStopped?e.isPropagationStopped():void 0!==e.cancelBubble&&e.cancelBubble}function dx(e){return e.dataTransfer?Array.prototype.some.call(e.dataTransfer.types,(function(e){return"Files"===e||"application/x-moz-file"===e})):!!e.target&&!!e.target.files}function px(e){e.preventDefault()}function fx(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(e){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return t.some((function(t){return!ux(e)&&t&&t.apply(void 0,[e].concat(r)),ux(e)}))}}function mx(e){return"audio/*"===e||"video/*"===e||"image/*"===e||"text/*"===e||/\w+\/[-+.\w]+/g.test(e)}function hx(e){return/^.*\.[\w]+$/.test(e)}var gx=["children"],bx=["open"],vx=["refKey","role","onKeyDown","onFocus","onBlur","onClick","onDragEnter","onDragOver","onDragLeave","onDrop"],yx=["refKey","onChange","onClick"];function wx(e){return function(e){if(Array.isArray(e))return Ex(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||kx(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function xx(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var r,o,a=[],i=!0,s=!1;try{for(n=n.call(e);!(i=(r=n.next()).done)&&(a.push(r.value),!t||a.length!==t);i=!0);}catch(e){s=!0,o=e}finally{try{i||null==n.return||n.return()}finally{if(s)throw o}}return a}(e,t)||kx(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function kx(e,t){if(e){if("string"==typeof e)return Ex(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Ex(e,t):void 0}}function Ex(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function Sx(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function Cx(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Sx(Object(n),!0).forEach((function(t){Ox(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Sx(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function Ox(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Px(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var Ix=p.forwardRef((function(e,t){var n=e.children,r=Nx(Px(e,gx)),o=r.open,a=Px(r,bx);return p.useImperativeHandle(t,(function(){return{open:o}}),[o]),f.createElement(p.Fragment,null,n(Cx(Cx({},a),{},{open:o})))}));Ix.displayName="Dropzone";var _x={disabled:!1,getFilesFromEvent:function(e){return Vs(this,void 0,void 0,(function(){return Us(this,(function(t){return Dw(e)&&Dw(e.dataTransfer)?[2,Hw(e.dataTransfer,e.type)]:function(e){return Dw(e)&&Dw(e.target)}(e)?[2,zw(e)]:Array.isArray(e)&&e.every((function(e){return"getFile"in e&&"function"==typeof e.getFile}))?[2,Fw(e)]:[2,[]]}))}))},maxSize:1/0,minSize:0,multiple:!0,maxFiles:0,preventDropOnDocument:!0,noClick:!1,noKeyboard:!1,noDrag:!1,noDragEventsBubbling:!1,validator:null,useFsAccessApi:!0,autoFocus:!1};Ix.defaultProps=_x,Ix.propTypes={children:Cn.func,accept:Cn.objectOf(Cn.arrayOf(Cn.string)),multiple:Cn.bool,preventDropOnDocument:Cn.bool,noClick:Cn.bool,noKeyboard:Cn.bool,noDrag:Cn.bool,noDragEventsBubbling:Cn.bool,minSize:Cn.number,maxSize:Cn.number,maxFiles:Cn.number,disabled:Cn.bool,getFilesFromEvent:Cn.func,onFileDialogCancel:Cn.func,onFileDialogOpen:Cn.func,useFsAccessApi:Cn.bool,autoFocus:Cn.bool,onDragEnter:Cn.func,onDragLeave:Cn.func,onDragOver:Cn.func,onDrop:Cn.func,onDropAccepted:Cn.func,onDropRejected:Cn.func,onError:Cn.func,validator:Cn.func};var Tx={isFocused:!1,isFileDialogActive:!1,isDragActive:!1,isDragAccept:!1,isDragReject:!1,acceptedFiles:[],fileRejections:[]};function Nx(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=Cx(Cx({},_x),e),n=t.accept,r=t.disabled,o=t.getFilesFromEvent,a=t.maxSize,i=t.minSize,s=t.multiple,l=t.maxFiles,c=t.onDragEnter,u=t.onDragLeave,d=t.onDragOver,f=t.onDrop,m=t.onDropAccepted,h=t.onDropRejected,g=t.onFileDialogCancel,b=t.onFileDialogOpen,v=t.useFsAccessApi,y=t.autoFocus,w=t.preventDropOnDocument,x=t.noClick,k=t.noKeyboard,E=t.noDrag,S=t.noDragEventsBubbling,C=t.onError,O=t.validator,P=p.useMemo((function(){return function(e){if(cx(e))return Object.entries(e).reduce((function(e,t){var n=ex(t,2),r=n[0],o=n[1];return[].concat(Xw(e),[r],Xw(o))}),[]).filter((function(e){return mx(e)||hx(e)})).join(",")}(n)}),[n]),I=p.useMemo((function(){return function(e){return cx(e)?[{description:"Files",accept:Object.entries(e).filter((function(e){var t=ex(e,2),n=t[0],r=t[1],o=!0;return mx(n)||(console.warn('Skipped "'.concat(n,'" because it is not a valid MIME type. Check https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types for a list of valid MIME types.')),o=!1),Array.isArray(r)&&r.every(hx)||(console.warn('Skipped "'.concat(n,'" because an invalid file extension was provided.')),o=!1),o})).reduce((function(e,t){var n=ex(t,2),r=n[0],o=n[1];return Jw(Jw({},e),{},Zw({},r,o))}),{})}]:e}(n)}),[n]),_=p.useMemo((function(){return"function"==typeof b?b:Ax}),[b]),T=p.useMemo((function(){return"function"==typeof g?g:Ax}),[g]),N=p.useRef(null),j=p.useRef(null),A=xx(p.useReducer(jx,Tx),2),R=A[0],L=A[1],M=R.isFocused,D=R.isFileDialogActive,z=p.useRef("undefined"!=typeof window&&window.isSecureContext&&v&&"showOpenFilePicker"in window),F=function(){!z.current&&D&&setTimeout((function(){j.current&&(j.current.files.length||(L({type:"closeDialog"}),T()))}),300)};p.useEffect((function(){return window.addEventListener("focus",F,!1),function(){window.removeEventListener("focus",F,!1)}}),[j,D,T,z]);var H=p.useRef([]),$=function(e){N.current&&N.current.contains(e.target)||(e.preventDefault(),H.current=[])};p.useEffect((function(){return w&&(document.addEventListener("dragover",px,!1),document.addEventListener("drop",$,!1)),function(){w&&(document.removeEventListener("dragover",px),document.removeEventListener("drop",$))}}),[N,w]),p.useEffect((function(){return!r&&y&&N.current&&N.current.focus(),function(){}}),[N,y,r]);var B=p.useCallback((function(e){C?C(e):console.error(e)}),[C]),V=p.useCallback((function(e){e.preventDefault(),e.persist(),ne(e),H.current=[].concat(wx(H.current),[e.target]),dx(e)&&Promise.resolve(o(e)).then((function(t){if(!ux(e)||S){var n=t.length,r=n>0&&function(e){var t=e.files,n=e.accept,r=e.minSize,o=e.maxSize,a=e.multiple,i=e.maxFiles,s=e.validator;return!(!a&&t.length>1||a&&i>=1&&t.length>i)&&t.every((function(e){var t=ex(sx(e,n),1)[0],a=ex(lx(e,r,o),1)[0],i=s?s(e):null;return t&&a&&!i}))}({files:t,accept:P,minSize:i,maxSize:a,multiple:s,maxFiles:l,validator:O});L({isDragAccept:r,isDragReject:n>0&&!r,isDragActive:!0,type:"setDraggedFiles"}),c&&c(e)}})).catch((function(e){return B(e)}))}),[o,c,B,S,P,i,a,s,l,O]),U=p.useCallback((function(e){e.preventDefault(),e.persist(),ne(e);var t=dx(e);if(t&&e.dataTransfer)try{e.dataTransfer.dropEffect="copy"}catch(e){}return t&&d&&d(e),!1}),[d,S]),W=p.useCallback((function(e){e.preventDefault(),e.persist(),ne(e);var t=H.current.filter((function(e){return N.current&&N.current.contains(e)})),n=t.indexOf(e.target);-1!==n&&t.splice(n,1),H.current=t,t.length>0||(L({type:"setDraggedFiles",isDragActive:!1,isDragAccept:!1,isDragReject:!1}),dx(e)&&u&&u(e))}),[N,u,S]),q=p.useCallback((function(e,t){var n=[],r=[];e.forEach((function(e){var t=xx(sx(e,P),2),o=t[0],s=t[1],l=xx(lx(e,i,a),2),c=l[0],u=l[1],d=O?O(e):null;if(o&&c&&!d)n.push(e);else{var p=[s,u];d&&(p=p.concat(d)),r.push({file:e,errors:p.filter((function(e){return e}))})}})),(!s&&n.length>1||s&&l>=1&&n.length>l)&&(n.forEach((function(e){r.push({file:e,errors:[ix]})})),n.splice(0)),L({acceptedFiles:n,fileRejections:r,type:"setFiles"}),f&&f(n,r,t),r.length>0&&h&&h(r,t),n.length>0&&m&&m(n,t)}),[L,s,P,i,a,l,f,m,h,O]),G=p.useCallback((function(e){e.preventDefault(),e.persist(),ne(e),H.current=[],dx(e)&&Promise.resolve(o(e)).then((function(t){ux(e)&&!S||q(t,e)})).catch((function(e){return B(e)})),L({type:"reset"})}),[o,q,B,S]),K=p.useCallback((function(){if(z.current){L({type:"openDialog"}),_();var e={multiple:s,types:I};window.showOpenFilePicker(e).then((function(e){return o(e)})).then((function(e){q(e,null),L({type:"closeDialog"})})).catch((function(e){!function(e){return e instanceof DOMException&&("AbortError"===e.name||e.code===e.ABORT_ERR)}(e)?!function(e){return e instanceof DOMException&&("SecurityError"===e.name||e.code===e.SECURITY_ERR)}(e)?B(e):(z.current=!1,j.current?(j.current.value=null,j.current.click()):B(new Error("Cannot open the file picker because the https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API is not supported and no <input> was provided."))):(T(e),L({type:"closeDialog"}))}))}else j.current&&(L({type:"openDialog"}),_(),j.current.value=null,j.current.click())}),[L,_,T,v,q,B,I,s]),Y=p.useCallback((function(e){N.current&&N.current.isEqualNode(e.target)&&(" "!==e.key&&"Enter"!==e.key&&32!==e.keyCode&&13!==e.keyCode||(e.preventDefault(),K()))}),[N,K]),X=p.useCallback((function(){L({type:"focus"})}),[]),Q=p.useCallback((function(){L({type:"blur"})}),[]),J=p.useCallback((function(){x||(!function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:window.navigator.userAgent;return function(e){return-1!==e.indexOf("MSIE")||-1!==e.indexOf("Trident/")}(e)||function(e){return-1!==e.indexOf("Edge/")}(e)}()?K():setTimeout(K,0))}),[x,K]),Z=function(e){return r?null:e},ee=function(e){return k?null:Z(e)},te=function(e){return E?null:Z(e)},ne=function(e){S&&e.stopPropagation()},re=p.useMemo((function(){return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.refKey,n=void 0===t?"ref":t,o=e.role,a=e.onKeyDown,i=e.onFocus,s=e.onBlur,l=e.onClick,c=e.onDragEnter,u=e.onDragOver,d=e.onDragLeave,p=e.onDrop,f=Px(e,vx);return Cx(Cx(Ox({onKeyDown:ee(fx(a,Y)),onFocus:ee(fx(i,X)),onBlur:ee(fx(s,Q)),onClick:Z(fx(l,J)),onDragEnter:te(fx(c,V)),onDragOver:te(fx(u,U)),onDragLeave:te(fx(d,W)),onDrop:te(fx(p,G)),role:"string"==typeof o&&""!==o?o:"presentation"},n,N),r||k?{}:{tabIndex:0}),f)}}),[N,Y,X,Q,J,V,U,W,G,k,E,r]),oe=p.useCallback((function(e){e.stopPropagation()}),[]),ae=p.useMemo((function(){return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.refKey,n=void 0===t?"ref":t,r=e.onChange,o=e.onClick,a=Px(e,yx);return Cx(Cx({},Ox({accept:P,multiple:s,type:"file",style:{display:"none"},onChange:Z(fx(r,G)),onClick:Z(fx(o,oe)),tabIndex:-1},n,j)),a)}}),[j,n,s,G,r]);return Cx(Cx({},R),{},{isFocused:M&&!r,getRootProps:re,getInputProps:ae,rootRef:N,inputRef:j,open:Z(K)})}function jx(e,t){switch(t.type){case"focus":return Cx(Cx({},e),{},{isFocused:!0});case"blur":return Cx(Cx({},e),{},{isFocused:!1});case"openDialog":return Cx(Cx({},Tx),{},{isFileDialogActive:!0});case"closeDialog":return Cx(Cx({},e),{},{isFileDialogActive:!1});case"setDraggedFiles":return Cx(Cx({},e),{},{isDragActive:t.isDragActive,isDragAccept:t.isDragAccept,isDragReject:t.isDragReject});case"setFiles":return Cx(Cx({},e),{},{acceptedFiles:t.acceptedFiles,fileRejections:t.fileRejections});case"reset":return Cx({},Tx);default:return e}}function Ax(){}const Rx=(e,t)=>{switch(e){case"small":return t.space.base/2;case"medium":return 1.5*t.space.base;default:return 3*t.space.base}},Lx=(e,t)=>Rx(e,t)/2,Mx="loaders.progress_background",Dx=kn.div.attrs((e=>({"data-garden-id":Mx,"data-garden-version":"8.76.9",borderRadius:e.borderRadius||Lx(e.size,e.theme)}))).withConfig({displayName:"StyledProgress__StyledProgressBackground",componentId:"sc-2g8w4s-0"})(["margin:","px 0;border-radius:","px;background-color:",";color:",";",""],(e=>2*e.theme.space.base),(e=>e.borderRadius),(e=>No("neutralHue",200,e.theme)),(e=>e.color||No("successHue",600,e.theme)),(e=>Kn(Mx,e)));Dx.defaultProps={theme:Wn};const zx="loaders.progress_indicator",Fx=kn.div.attrs((e=>({"data-garden-id":zx,"data-garden-version":"8.76.9",height:e.height||Rx(e.size,e.theme),borderRadius:e.borderRadius||Lx(e.size,e.theme)}))).withConfig({displayName:"StyledProgress__StyledProgressIndicator",componentId:"sc-2g8w4s-1"})(["transition:width 0.1s ease-in-out;border-radius:","px;background:currentcolor;width:","%;height:","px;",""],(e=>e.borderRadius),(e=>e.value),(e=>e.height),(e=>Kn(zx,e)));Fx.defaultProps={theme:Wn};const Hx="loaders.skeleton",$x=bn(["0%,60%{opacity:0;}100%{opacity:1;}"]),Bx=bn(["0%{transform:translateX(-100%);}100%{transform:translateX(100%);}"]),Vx=bn(["0%{transform:translateX(100%);}100%{transform:translateX(-100%)}"]),Ux=kn.div.attrs({"data-garden-id":Hx,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledSkeleton",componentId:"sc-1raozze-0"})(["display:inline-block;position:relative;animation:"," 750ms linear;border-radius:",";width:",";height:",";overflow:hidden;line-height:",";"," &::before{position:absolute;top:0;width:1000px;height:100%;content:'';"," ","}",";"],$x,(e=>e.theme.borderRadii.md),(e=>e.customWidth),(e=>e.customHeight),(e=>Ao(e.theme.fontSizes.sm,5*e.theme.space.base)),(e=>{let{theme:t,isLight:n}=e;return tn(["background-color:",";"],n?Dr(No("background",600,t),.2):No("neutralHue",800,t,.1))}),(e=>{let{theme:t}=e;return t.rtl?tn(["animation:"," 1.5s ease-in-out 300ms infinite;"],Vx):tn(["animation:"," 1.5s ease-in-out 300ms infinite;"],Bx)}),(e=>{let{theme:t,isLight:n}=e;return tn(["background-image:linear-gradient( ",",transparent,",",transparent );"],t.rtl?"-45deg":"45deg",n?No("chromeHue",700,t,.4):Dr(No("background",600,t),.6))}),(e=>Kn(Hx,e)));Ux.defaultProps={theme:Wn};const Wx=f.forwardRef(((e,t)=>{let{value:n,size:r,"aria-label":o,...a}=e;const i=Math.max(0,Math.min(100,n)),s=Do(Wx,{"aria-label":o},"aria-label","Progress");return f.createElement(Dx,Object.assign({"data-garden-id":"loaders.progress","data-garden-version":"8.76.9","aria-valuemax":100,"aria-valuemin":0,"aria-valuenow":i,role:"progressbar",size:r,ref:t,"aria-label":s},a),f.createElement(Fx,{value:i,size:r}))}));Wx.displayName="Progress",Wx.propTypes={color:Cn.string,value:Cn.number.isRequired,size:Cn.oneOf(["small","medium","large"])},Wx.defaultProps={value:0,size:"medium"};const qx=p.forwardRef(((e,t)=>{let{width:n,height:r,isLight:o,...a}=e;return f.createElement(Ux,Object.assign({ref:t,isLight:o,customWidth:n,customHeight:r},a)," ")}));qx.displayName="Skeleton",qx.propTypes={width:Cn.string,height:Cn.string,isLight:Cn.bool},qx.defaultProps={width:"100%",height:"100%"};const Gx={"application/prs.cww":["cww"],"application/prs.xsf+xml":["xsf"],"application/vnd.1000minds.decision-model+xml":["1km"],"application/vnd.3gpp.pic-bw-large":["plb"],"application/vnd.3gpp.pic-bw-small":["psb"],"application/vnd.3gpp.pic-bw-var":["pvb"],"application/vnd.3gpp2.tcap":["tcap"],"application/vnd.3m.post-it-notes":["pwn"],"application/vnd.accpac.simply.aso":["aso"],"application/vnd.accpac.simply.imp":["imp"],"application/vnd.acucobol":["acu"],"application/vnd.acucorp":["atc","acutc"],"application/vnd.adobe.air-application-installer-package+zip":["air"],"application/vnd.adobe.formscentral.fcdt":["fcdt"],"application/vnd.adobe.fxp":["fxp","fxpl"],"application/vnd.adobe.xdp+xml":["xdp"],"application/vnd.adobe.xfdf":["*xfdf"],"application/vnd.age":["age"],"application/vnd.ahead.space":["ahead"],"application/vnd.airzip.filesecure.azf":["azf"],"application/vnd.airzip.filesecure.azs":["azs"],"application/vnd.amazon.ebook":["azw"],"application/vnd.americandynamics.acc":["acc"],"application/vnd.amiga.ami":["ami"],"application/vnd.android.package-archive":["apk"],"application/vnd.anser-web-certificate-issue-initiation":["cii"],"application/vnd.anser-web-funds-transfer-initiation":["fti"],"application/vnd.antix.game-component":["atx"],"application/vnd.apple.installer+xml":["mpkg"],"application/vnd.apple.keynote":["key"],"application/vnd.apple.mpegurl":["m3u8"],"application/vnd.apple.numbers":["numbers"],"application/vnd.apple.pages":["pages"],"application/vnd.apple.pkpass":["pkpass"],"application/vnd.aristanetworks.swi":["swi"],"application/vnd.astraea-software.iota":["iota"],"application/vnd.audiograph":["aep"],"application/vnd.balsamiq.bmml+xml":["bmml"],"application/vnd.blueice.multipass":["mpm"],"application/vnd.bmi":["bmi"],"application/vnd.businessobjects":["rep"],"application/vnd.chemdraw+xml":["cdxml"],"application/vnd.chipnuts.karaoke-mmd":["mmd"],"application/vnd.cinderella":["cdy"],"application/vnd.citationstyles.style+xml":["csl"],"application/vnd.claymore":["cla"],"application/vnd.cloanto.rp9":["rp9"],"application/vnd.clonk.c4group":["c4g","c4d","c4f","c4p","c4u"],"application/vnd.cluetrust.cartomobile-config":["c11amc"],"application/vnd.cluetrust.cartomobile-config-pkg":["c11amz"],"application/vnd.commonspace":["csp"],"application/vnd.contact.cmsg":["cdbcmsg"],"application/vnd.cosmocaller":["cmc"],"application/vnd.crick.clicker":["clkx"],"application/vnd.crick.clicker.keyboard":["clkk"],"application/vnd.crick.clicker.palette":["clkp"],"application/vnd.crick.clicker.template":["clkt"],"application/vnd.crick.clicker.wordbank":["clkw"],"application/vnd.criticaltools.wbs+xml":["wbs"],"application/vnd.ctc-posml":["pml"],"application/vnd.cups-ppd":["ppd"],"application/vnd.curl.car":["car"],"application/vnd.curl.pcurl":["pcurl"],"application/vnd.dart":["dart"],"application/vnd.data-vision.rdz":["rdz"],"application/vnd.dbf":["dbf"],"application/vnd.dece.data":["uvf","uvvf","uvd","uvvd"],"application/vnd.dece.ttml+xml":["uvt","uvvt"],"application/vnd.dece.unspecified":["uvx","uvvx"],"application/vnd.dece.zip":["uvz","uvvz"],"application/vnd.denovo.fcselayout-link":["fe_launch"],"application/vnd.dna":["dna"],"application/vnd.dolby.mlp":["mlp"],"application/vnd.dpgraph":["dpg"],"application/vnd.dreamfactory":["dfac"],"application/vnd.ds-keypoint":["kpxx"],"application/vnd.dvb.ait":["ait"],"application/vnd.dvb.service":["svc"],"application/vnd.dynageo":["geo"],"application/vnd.ecowin.chart":["mag"],"application/vnd.enliven":["nml"],"application/vnd.epson.esf":["esf"],"application/vnd.epson.msf":["msf"],"application/vnd.epson.quickanime":["qam"],"application/vnd.epson.salt":["slt"],"application/vnd.epson.ssf":["ssf"],"application/vnd.eszigno3+xml":["es3","et3"],"application/vnd.ezpix-album":["ez2"],"application/vnd.ezpix-package":["ez3"],"application/vnd.fdf":["*fdf"],"application/vnd.fdsn.mseed":["mseed"],"application/vnd.fdsn.seed":["seed","dataless"],"application/vnd.flographit":["gph"],"application/vnd.fluxtime.clip":["ftc"],"application/vnd.framemaker":["fm","frame","maker","book"],"application/vnd.frogans.fnc":["fnc"],"application/vnd.frogans.ltf":["ltf"],"application/vnd.fsc.weblaunch":["fsc"],"application/vnd.fujitsu.oasys":["oas"],"application/vnd.fujitsu.oasys2":["oa2"],"application/vnd.fujitsu.oasys3":["oa3"],"application/vnd.fujitsu.oasysgp":["fg5"],"application/vnd.fujitsu.oasysprs":["bh2"],"application/vnd.fujixerox.ddd":["ddd"],"application/vnd.fujixerox.docuworks":["xdw"],"application/vnd.fujixerox.docuworks.binder":["xbd"],"application/vnd.fuzzysheet":["fzs"],"application/vnd.genomatix.tuxedo":["txd"],"application/vnd.geogebra.file":["ggb"],"application/vnd.geogebra.tool":["ggt"],"application/vnd.geometry-explorer":["gex","gre"],"application/vnd.geonext":["gxt"],"application/vnd.geoplan":["g2w"],"application/vnd.geospace":["g3w"],"application/vnd.gmx":["gmx"],"application/vnd.google-apps.document":["gdoc"],"application/vnd.google-apps.presentation":["gslides"],"application/vnd.google-apps.spreadsheet":["gsheet"],"application/vnd.google-earth.kml+xml":["kml"],"application/vnd.google-earth.kmz":["kmz"],"application/vnd.grafeq":["gqf","gqs"],"application/vnd.groove-account":["gac"],"application/vnd.groove-help":["ghf"],"application/vnd.groove-identity-message":["gim"],"application/vnd.groove-injector":["grv"],"application/vnd.groove-tool-message":["gtm"],"application/vnd.groove-tool-template":["tpl"],"application/vnd.groove-vcard":["vcg"],"application/vnd.hal+xml":["hal"],"application/vnd.handheld-entertainment+xml":["zmm"],"application/vnd.hbci":["hbci"],"application/vnd.hhe.lesson-player":["les"],"application/vnd.hp-hpgl":["hpgl"],"application/vnd.hp-hpid":["hpid"],"application/vnd.hp-hps":["hps"],"application/vnd.hp-jlyt":["jlt"],"application/vnd.hp-pcl":["pcl"],"application/vnd.hp-pclxl":["pclxl"],"application/vnd.hydrostatix.sof-data":["sfd-hdstx"],"application/vnd.ibm.minipay":["mpy"],"application/vnd.ibm.modcap":["afp","listafp","list3820"],"application/vnd.ibm.rights-management":["irm"],"application/vnd.ibm.secure-container":["sc"],"application/vnd.iccprofile":["icc","icm"],"application/vnd.igloader":["igl"],"application/vnd.immervision-ivp":["ivp"],"application/vnd.immervision-ivu":["ivu"],"application/vnd.insors.igm":["igm"],"application/vnd.intercon.formnet":["xpw","xpx"],"application/vnd.intergeo":["i2g"],"application/vnd.intu.qbo":["qbo"],"application/vnd.intu.qfx":["qfx"],"application/vnd.ipunplugged.rcprofile":["rcprofile"],"application/vnd.irepository.package+xml":["irp"],"application/vnd.is-xpr":["xpr"],"application/vnd.isac.fcs":["fcs"],"application/vnd.jam":["jam"],"application/vnd.jcp.javame.midlet-rms":["rms"],"application/vnd.jisp":["jisp"],"application/vnd.joost.joda-archive":["joda"],"application/vnd.kahootz":["ktz","ktr"],"application/vnd.kde.karbon":["karbon"],"application/vnd.kde.kchart":["chrt"],"application/vnd.kde.kformula":["kfo"],"application/vnd.kde.kivio":["flw"],"application/vnd.kde.kontour":["kon"],"application/vnd.kde.kpresenter":["kpr","kpt"],"application/vnd.kde.kspread":["ksp"],"application/vnd.kde.kword":["kwd","kwt"],"application/vnd.kenameaapp":["htke"],"application/vnd.kidspiration":["kia"],"application/vnd.kinar":["kne","knp"],"application/vnd.koan":["skp","skd","skt","skm"],"application/vnd.kodak-descriptor":["sse"],"application/vnd.las.las+xml":["lasxml"],"application/vnd.llamagraphics.life-balance.desktop":["lbd"],"application/vnd.llamagraphics.life-balance.exchange+xml":["lbe"],"application/vnd.lotus-1-2-3":["123"],"application/vnd.lotus-approach":["apr"],"application/vnd.lotus-freelance":["pre"],"application/vnd.lotus-notes":["nsf"],"application/vnd.lotus-organizer":["org"],"application/vnd.lotus-screencam":["scm"],"application/vnd.lotus-wordpro":["lwp"],"application/vnd.macports.portpkg":["portpkg"],"application/vnd.mapbox-vector-tile":["mvt"],"application/vnd.mcd":["mcd"],"application/vnd.medcalcdata":["mc1"],"application/vnd.mediastation.cdkey":["cdkey"],"application/vnd.mfer":["mwf"],"application/vnd.mfmp":["mfm"],"application/vnd.micrografx.flo":["flo"],"application/vnd.micrografx.igx":["igx"],"application/vnd.mif":["mif"],"application/vnd.mobius.daf":["daf"],"application/vnd.mobius.dis":["dis"],"application/vnd.mobius.mbk":["mbk"],"application/vnd.mobius.mqy":["mqy"],"application/vnd.mobius.msl":["msl"],"application/vnd.mobius.plc":["plc"],"application/vnd.mobius.txf":["txf"],"application/vnd.mophun.application":["mpn"],"application/vnd.mophun.certificate":["mpc"],"application/vnd.mozilla.xul+xml":["xul"],"application/vnd.ms-artgalry":["cil"],"application/vnd.ms-cab-compressed":["cab"],"application/vnd.ms-excel":["xls","xlm","xla","xlc","xlt","xlw"],"application/vnd.ms-excel.addin.macroenabled.12":["xlam"],"application/vnd.ms-excel.sheet.binary.macroenabled.12":["xlsb"],"application/vnd.ms-excel.sheet.macroenabled.12":["xlsm"],"application/vnd.ms-excel.template.macroenabled.12":["xltm"],"application/vnd.ms-fontobject":["eot"],"application/vnd.ms-htmlhelp":["chm"],"application/vnd.ms-ims":["ims"],"application/vnd.ms-lrm":["lrm"],"application/vnd.ms-officetheme":["thmx"],"application/vnd.ms-outlook":["msg"],"application/vnd.ms-pki.seccat":["cat"],"application/vnd.ms-pki.stl":["*stl"],"application/vnd.ms-powerpoint":["ppt","pps","pot"],"application/vnd.ms-powerpoint.addin.macroenabled.12":["ppam"],"application/vnd.ms-powerpoint.presentation.macroenabled.12":["pptm"],"application/vnd.ms-powerpoint.slide.macroenabled.12":["sldm"],"application/vnd.ms-powerpoint.slideshow.macroenabled.12":["ppsm"],"application/vnd.ms-powerpoint.template.macroenabled.12":["potm"],"application/vnd.ms-project":["*mpp","mpt"],"application/vnd.ms-word.document.macroenabled.12":["docm"],"application/vnd.ms-word.template.macroenabled.12":["dotm"],"application/vnd.ms-works":["wps","wks","wcm","wdb"],"application/vnd.ms-wpl":["wpl"],"application/vnd.ms-xpsdocument":["xps"],"application/vnd.mseq":["mseq"],"application/vnd.musician":["mus"],"application/vnd.muvee.style":["msty"],"application/vnd.mynfc":["taglet"],"application/vnd.neurolanguage.nlu":["nlu"],"application/vnd.nitf":["ntf","nitf"],"application/vnd.noblenet-directory":["nnd"],"application/vnd.noblenet-sealer":["nns"],"application/vnd.noblenet-web":["nnw"],"application/vnd.nokia.n-gage.ac+xml":["*ac"],"application/vnd.nokia.n-gage.data":["ngdat"],"application/vnd.nokia.n-gage.symbian.install":["n-gage"],"application/vnd.nokia.radio-preset":["rpst"],"application/vnd.nokia.radio-presets":["rpss"],"application/vnd.novadigm.edm":["edm"],"application/vnd.novadigm.edx":["edx"],"application/vnd.novadigm.ext":["ext"],"application/vnd.oasis.opendocument.chart":["odc"],"application/vnd.oasis.opendocument.chart-template":["otc"],"application/vnd.oasis.opendocument.database":["odb"],"application/vnd.oasis.opendocument.formula":["odf"],"application/vnd.oasis.opendocument.formula-template":["odft"],"application/vnd.oasis.opendocument.graphics":["odg"],"application/vnd.oasis.opendocument.graphics-template":["otg"],"application/vnd.oasis.opendocument.image":["odi"],"application/vnd.oasis.opendocument.image-template":["oti"],"application/vnd.oasis.opendocument.presentation":["odp"],"application/vnd.oasis.opendocument.presentation-template":["otp"],"application/vnd.oasis.opendocument.spreadsheet":["ods"],"application/vnd.oasis.opendocument.spreadsheet-template":["ots"],"application/vnd.oasis.opendocument.text":["odt"],"application/vnd.oasis.opendocument.text-master":["odm"],"application/vnd.oasis.opendocument.text-template":["ott"],"application/vnd.oasis.opendocument.text-web":["oth"],"application/vnd.olpc-sugar":["xo"],"application/vnd.oma.dd2+xml":["dd2"],"application/vnd.openblox.game+xml":["obgx"],"application/vnd.openofficeorg.extension":["oxt"],"application/vnd.openstreetmap.data+xml":["osm"],"application/vnd.openxmlformats-officedocument.presentationml.presentation":["pptx"],"application/vnd.openxmlformats-officedocument.presentationml.slide":["sldx"],"application/vnd.openxmlformats-officedocument.presentationml.slideshow":["ppsx"],"application/vnd.openxmlformats-officedocument.presentationml.template":["potx"],"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":["xlsx"],"application/vnd.openxmlformats-officedocument.spreadsheetml.template":["xltx"],"application/vnd.openxmlformats-officedocument.wordprocessingml.document":["docx"],"application/vnd.openxmlformats-officedocument.wordprocessingml.template":["dotx"],"application/vnd.osgeo.mapguide.package":["mgp"],"application/vnd.osgi.dp":["dp"],"application/vnd.osgi.subsystem":["esa"],"application/vnd.palm":["pdb","pqa","oprc"],"application/vnd.pawaafile":["paw"],"application/vnd.pg.format":["str"],"application/vnd.pg.osasli":["ei6"],"application/vnd.picsel":["efif"],"application/vnd.pmi.widget":["wg"],"application/vnd.pocketlearn":["plf"],"application/vnd.powerbuilder6":["pbd"],"application/vnd.previewsystems.box":["box"],"application/vnd.proteus.magazine":["mgz"],"application/vnd.publishare-delta-tree":["qps"],"application/vnd.pvi.ptid1":["ptid"],"application/vnd.pwg-xhtml-print+xml":["xhtm"],"application/vnd.quark.quarkxpress":["qxd","qxt","qwd","qwt","qxl","qxb"],"application/vnd.rar":["rar"],"application/vnd.realvnc.bed":["bed"],"application/vnd.recordare.musicxml":["mxl"],"application/vnd.recordare.musicxml+xml":["musicxml"],"application/vnd.rig.cryptonote":["cryptonote"],"application/vnd.rim.cod":["cod"],"application/vnd.rn-realmedia":["rm"],"application/vnd.rn-realmedia-vbr":["rmvb"],"application/vnd.route66.link66+xml":["link66"],"application/vnd.sailingtracker.track":["st"],"application/vnd.seemail":["see"],"application/vnd.sema":["sema"],"application/vnd.semd":["semd"],"application/vnd.semf":["semf"],"application/vnd.shana.informed.formdata":["ifm"],"application/vnd.shana.informed.formtemplate":["itp"],"application/vnd.shana.informed.interchange":["iif"],"application/vnd.shana.informed.package":["ipk"],"application/vnd.simtech-mindmapper":["twd","twds"],"application/vnd.smaf":["mmf"],"application/vnd.smart.teacher":["teacher"],"application/vnd.software602.filler.form+xml":["fo"],"application/vnd.solent.sdkm+xml":["sdkm","sdkd"],"application/vnd.spotfire.dxp":["dxp"],"application/vnd.spotfire.sfs":["sfs"],"application/vnd.stardivision.calc":["sdc"],"application/vnd.stardivision.draw":["sda"],"application/vnd.stardivision.impress":["sdd"],"application/vnd.stardivision.math":["smf"],"application/vnd.stardivision.writer":["sdw","vor"],"application/vnd.stardivision.writer-global":["sgl"],"application/vnd.stepmania.package":["smzip"],"application/vnd.stepmania.stepchart":["sm"],"application/vnd.sun.wadl+xml":["wadl"],"application/vnd.sun.xml.calc":["sxc"],"application/vnd.sun.xml.calc.template":["stc"],"application/vnd.sun.xml.draw":["sxd"],"application/vnd.sun.xml.draw.template":["std"],"application/vnd.sun.xml.impress":["sxi"],"application/vnd.sun.xml.impress.template":["sti"],"application/vnd.sun.xml.math":["sxm"],"application/vnd.sun.xml.writer":["sxw"],"application/vnd.sun.xml.writer.global":["sxg"],"application/vnd.sun.xml.writer.template":["stw"],"application/vnd.sus-calendar":["sus","susp"],"application/vnd.svd":["svd"],"application/vnd.symbian.install":["sis","sisx"],"application/vnd.syncml+xml":["xsm"],"application/vnd.syncml.dm+wbxml":["bdm"],"application/vnd.syncml.dm+xml":["xdm"],"application/vnd.syncml.dmddf+xml":["ddf"],"application/vnd.tao.intent-module-archive":["tao"],"application/vnd.tcpdump.pcap":["pcap","cap","dmp"],"application/vnd.tmobile-livetv":["tmo"],"application/vnd.trid.tpt":["tpt"],"application/vnd.triscape.mxs":["mxs"],"application/vnd.trueapp":["tra"],"application/vnd.ufdl":["ufd","ufdl"],"application/vnd.uiq.theme":["utz"],"application/vnd.umajin":["umj"],"application/vnd.unity":["unityweb"],"application/vnd.uoml+xml":["uoml","uo"],"application/vnd.vcx":["vcx"],"application/vnd.visio":["vsd","vst","vss","vsw"],"application/vnd.visionary":["vis"],"application/vnd.vsf":["vsf"],"application/vnd.wap.wbxml":["wbxml"],"application/vnd.wap.wmlc":["wmlc"],"application/vnd.wap.wmlscriptc":["wmlsc"],"application/vnd.webturbo":["wtb"],"application/vnd.wolfram.player":["nbp"],"application/vnd.wordperfect":["wpd"],"application/vnd.wqd":["wqd"],"application/vnd.wt.stf":["stf"],"application/vnd.xara":["xar"],"application/vnd.xfdl":["xfdl"],"application/vnd.yamaha.hv-dic":["hvd"],"application/vnd.yamaha.hv-script":["hvs"],"application/vnd.yamaha.hv-voice":["hvp"],"application/vnd.yamaha.openscoreformat":["osf"],"application/vnd.yamaha.openscoreformat.osfpvg+xml":["osfpvg"],"application/vnd.yamaha.smaf-audio":["saf"],"application/vnd.yamaha.smaf-phrase":["spf"],"application/vnd.yellowriver-custom-menu":["cmp"],"application/vnd.zul":["zir","zirz"],"application/vnd.zzazz.deck+xml":["zaz"],"application/x-7z-compressed":["7z"],"application/x-abiword":["abw"],"application/x-ace-compressed":["ace"],"application/x-apple-diskimage":["*dmg"],"application/x-arj":["arj"],"application/x-authorware-bin":["aab","x32","u32","vox"],"application/x-authorware-map":["aam"],"application/x-authorware-seg":["aas"],"application/x-bcpio":["bcpio"],"application/x-bdoc":["*bdoc"],"application/x-bittorrent":["torrent"],"application/x-blorb":["blb","blorb"],"application/x-bzip":["bz"],"application/x-bzip2":["bz2","boz"],"application/x-cbr":["cbr","cba","cbt","cbz","cb7"],"application/x-cdlink":["vcd"],"application/x-cfs-compressed":["cfs"],"application/x-chat":["chat"],"application/x-chess-pgn":["pgn"],"application/x-chrome-extension":["crx"],"application/x-cocoa":["cco"],"application/x-conference":["nsc"],"application/x-cpio":["cpio"],"application/x-csh":["csh"],"application/x-debian-package":["*deb","udeb"],"application/x-dgc-compressed":["dgc"],"application/x-director":["dir","dcr","dxr","cst","cct","cxt","w3d","fgd","swa"],"application/x-doom":["wad"],"application/x-dtbncx+xml":["ncx"],"application/x-dtbook+xml":["dtb"],"application/x-dtbresource+xml":["res"],"application/x-dvi":["dvi"],"application/x-envoy":["evy"],"application/x-eva":["eva"],"application/x-font-bdf":["bdf"],"application/x-font-ghostscript":["gsf"],"application/x-font-linux-psf":["psf"],"application/x-font-pcf":["pcf"],"application/x-font-snf":["snf"],"application/x-font-type1":["pfa","pfb","pfm","afm"],"application/x-freearc":["arc"],"application/x-futuresplash":["spl"],"application/x-gca-compressed":["gca"],"application/x-glulx":["ulx"],"application/x-gnumeric":["gnumeric"],"application/x-gramps-xml":["gramps"],"application/x-gtar":["gtar"],"application/x-hdf":["hdf"],"application/x-httpd-php":["php"],"application/x-install-instructions":["install"],"application/x-iso9660-image":["*iso"],"application/x-iwork-keynote-sffkey":["*key"],"application/x-iwork-numbers-sffnumbers":["*numbers"],"application/x-iwork-pages-sffpages":["*pages"],"application/x-java-archive-diff":["jardiff"],"application/x-java-jnlp-file":["jnlp"],"application/x-keepass2":["kdbx"],"application/x-latex":["latex"],"application/x-lua-bytecode":["luac"],"application/x-lzh-compressed":["lzh","lha"],"application/x-makeself":["run"],"application/x-mie":["mie"],"application/x-mobipocket-ebook":["*prc","mobi"],"application/x-ms-application":["application"],"application/x-ms-shortcut":["lnk"],"application/x-ms-wmd":["wmd"],"application/x-ms-wmz":["wmz"],"application/x-ms-xbap":["xbap"],"application/x-msaccess":["mdb"],"application/x-msbinder":["obd"],"application/x-mscardfile":["crd"],"application/x-msclip":["clp"],"application/x-msdos-program":["*exe"],"application/x-msdownload":["*exe","*dll","com","bat","*msi"],"application/x-msmediaview":["mvb","m13","m14"],"application/x-msmetafile":["*wmf","*wmz","*emf","emz"],"application/x-msmoney":["mny"],"application/x-mspublisher":["pub"],"application/x-msschedule":["scd"],"application/x-msterminal":["trm"],"application/x-mswrite":["wri"],"application/x-netcdf":["nc","cdf"],"application/x-ns-proxy-autoconfig":["pac"],"application/x-nzb":["nzb"],"application/x-perl":["pl","pm"],"application/x-pilot":["*prc","*pdb"],"application/x-pkcs12":["p12","pfx"],"application/x-pkcs7-certificates":["p7b","spc"],"application/x-pkcs7-certreqresp":["p7r"],"application/x-rar-compressed":["*rar"],"application/x-redhat-package-manager":["rpm"],"application/x-research-info-systems":["ris"],"application/x-sea":["sea"],"application/x-sh":["sh"],"application/x-shar":["shar"],"application/x-shockwave-flash":["swf"],"application/x-silverlight-app":["xap"],"application/x-sql":["*sql"],"application/x-stuffit":["sit"],"application/x-stuffitx":["sitx"],"application/x-subrip":["srt"],"application/x-sv4cpio":["sv4cpio"],"application/x-sv4crc":["sv4crc"],"application/x-t3vm-image":["t3"],"application/x-tads":["gam"],"application/x-tar":["tar"],"application/x-tcl":["tcl","tk"],"application/x-tex":["tex"],"application/x-tex-tfm":["tfm"],"application/x-texinfo":["texinfo","texi"],"application/x-tgif":["*obj"],"application/x-ustar":["ustar"],"application/x-virtualbox-hdd":["hdd"],"application/x-virtualbox-ova":["ova"],"application/x-virtualbox-ovf":["ovf"],"application/x-virtualbox-vbox":["vbox"],"application/x-virtualbox-vbox-extpack":["vbox-extpack"],"application/x-virtualbox-vdi":["vdi"],"application/x-virtualbox-vhd":["vhd"],"application/x-virtualbox-vmdk":["vmdk"],"application/x-wais-source":["src"],"application/x-web-app-manifest+json":["webapp"],"application/x-x509-ca-cert":["der","crt","pem"],"application/x-xfig":["fig"],"application/x-xliff+xml":["*xlf"],"application/x-xpinstall":["xpi"],"application/x-xz":["xz"],"application/x-zmachine":["z1","z2","z3","z4","z5","z6","z7","z8"],"audio/vnd.dece.audio":["uva","uvva"],"audio/vnd.digital-winds":["eol"],"audio/vnd.dra":["dra"],"audio/vnd.dts":["dts"],"audio/vnd.dts.hd":["dtshd"],"audio/vnd.lucent.voice":["lvp"],"audio/vnd.ms-playready.media.pya":["pya"],"audio/vnd.nuera.ecelp4800":["ecelp4800"],"audio/vnd.nuera.ecelp7470":["ecelp7470"],"audio/vnd.nuera.ecelp9600":["ecelp9600"],"audio/vnd.rip":["rip"],"audio/x-aac":["*aac"],"audio/x-aiff":["aif","aiff","aifc"],"audio/x-caf":["caf"],"audio/x-flac":["flac"],"audio/x-m4a":["*m4a"],"audio/x-matroska":["mka"],"audio/x-mpegurl":["m3u"],"audio/x-ms-wax":["wax"],"audio/x-ms-wma":["wma"],"audio/x-pn-realaudio":["ram","ra"],"audio/x-pn-realaudio-plugin":["rmp"],"audio/x-realaudio":["*ra"],"audio/x-wav":["*wav"],"chemical/x-cdx":["cdx"],"chemical/x-cif":["cif"],"chemical/x-cmdf":["cmdf"],"chemical/x-cml":["cml"],"chemical/x-csml":["csml"],"chemical/x-xyz":["xyz"],"image/prs.btif":["btif","btf"],"image/prs.pti":["pti"],"image/vnd.adobe.photoshop":["psd"],"image/vnd.airzip.accelerator.azv":["azv"],"image/vnd.dece.graphic":["uvi","uvvi","uvg","uvvg"],"image/vnd.djvu":["djvu","djv"],"image/vnd.dvb.subtitle":["*sub"],"image/vnd.dwg":["dwg"],"image/vnd.dxf":["dxf"],"image/vnd.fastbidsheet":["fbs"],"image/vnd.fpx":["fpx"],"image/vnd.fst":["fst"],"image/vnd.fujixerox.edmics-mmr":["mmr"],"image/vnd.fujixerox.edmics-rlc":["rlc"],"image/vnd.microsoft.icon":["ico"],"image/vnd.ms-dds":["dds"],"image/vnd.ms-modi":["mdi"],"image/vnd.ms-photo":["wdp"],"image/vnd.net-fpx":["npx"],"image/vnd.pco.b16":["b16"],"image/vnd.tencent.tap":["tap"],"image/vnd.valve.source.texture":["vtf"],"image/vnd.wap.wbmp":["wbmp"],"image/vnd.xiff":["xif"],"image/vnd.zbrush.pcx":["pcx"],"image/x-3ds":["3ds"],"image/x-cmu-raster":["ras"],"image/x-cmx":["cmx"],"image/x-freehand":["fh","fhc","fh4","fh5","fh7"],"image/x-icon":["*ico"],"image/x-jng":["jng"],"image/x-mrsid-image":["sid"],"image/x-ms-bmp":["*bmp"],"image/x-pcx":["*pcx"],"image/x-pict":["pic","pct"],"image/x-portable-anymap":["pnm"],"image/x-portable-bitmap":["pbm"],"image/x-portable-graymap":["pgm"],"image/x-portable-pixmap":["ppm"],"image/x-rgb":["rgb"],"image/x-tga":["tga"],"image/x-xbitmap":["xbm"],"image/x-xpixmap":["xpm"],"image/x-xwindowdump":["xwd"],"message/vnd.wfa.wsc":["wsc"],"model/vnd.cld":["cld"],"model/vnd.collada+xml":["dae"],"model/vnd.dwf":["dwf"],"model/vnd.gdl":["gdl"],"model/vnd.gtw":["gtw"],"model/vnd.mts":["mts"],"model/vnd.opengex":["ogex"],"model/vnd.parasolid.transmit.binary":["x_b"],"model/vnd.parasolid.transmit.text":["x_t"],"model/vnd.pytha.pyox":["pyo","pyox"],"model/vnd.sap.vds":["vds"],"model/vnd.usda":["usda"],"model/vnd.usdz+zip":["usdz"],"model/vnd.valve.source.compiled-map":["bsp"],"model/vnd.vtu":["vtu"],"text/prs.lines.tag":["dsc"],"text/vnd.curl":["curl"],"text/vnd.curl.dcurl":["dcurl"],"text/vnd.curl.mcurl":["mcurl"],"text/vnd.curl.scurl":["scurl"],"text/vnd.dvb.subtitle":["sub"],"text/vnd.familysearch.gedcom":["ged"],"text/vnd.fly":["fly"],"text/vnd.fmi.flexstor":["flx"],"text/vnd.graphviz":["gv"],"text/vnd.in3d.3dml":["3dml"],"text/vnd.in3d.spot":["spot"],"text/vnd.sun.j2me.app-descriptor":["jad"],"text/vnd.wap.wml":["wml"],"text/vnd.wap.wmlscript":["wmls"],"text/x-asm":["s","asm"],"text/x-c":["c","cc","cxx","cpp","h","hh","dic"],"text/x-component":["htc"],"text/x-fortran":["f","for","f77","f90"],"text/x-handlebars-template":["hbs"],"text/x-java-source":["java"],"text/x-lua":["lua"],"text/x-markdown":["mkd"],"text/x-nfo":["nfo"],"text/x-opml":["opml"],"text/x-org":["*org"],"text/x-pascal":["p","pas"],"text/x-processing":["pde"],"text/x-sass":["sass"],"text/x-scss":["scss"],"text/x-setext":["etx"],"text/x-sfv":["sfv"],"text/x-suse-ymp":["ymp"],"text/x-uuencode":["uu"],"text/x-vcalendar":["vcs"],"text/x-vcard":["vcf"],"video/vnd.dece.hd":["uvh","uvvh"],"video/vnd.dece.mobile":["uvm","uvvm"],"video/vnd.dece.pd":["uvp","uvvp"],"video/vnd.dece.sd":["uvs","uvvs"],"video/vnd.dece.video":["uvv","uvvv"],"video/vnd.dvb.file":["dvb"],"video/vnd.fvt":["fvt"],"video/vnd.mpegurl":["mxu","m4u"],"video/vnd.ms-playready.media.pyv":["pyv"],"video/vnd.uvvu.mp4":["uvu","uvvu"],"video/vnd.vivo":["viv"],"video/x-f4v":["f4v"],"video/x-fli":["fli"],"video/x-flv":["flv"],"video/x-m4v":["m4v"],"video/x-matroska":["mkv","mk3d","mks"],"video/x-mng":["mng"],"video/x-ms-asf":["asf","asx"],"video/x-ms-vob":["vob"],"video/x-ms-wm":["wm"],"video/x-ms-wmv":["wmv"],"video/x-ms-wmx":["wmx"],"video/x-ms-wvx":["wvx"],"video/x-msvideo":["avi"],"video/x-sgi-movie":["movie"],"video/x-smv":["smv"],"x-conference/x-cooltalk":["ice"]};Object.freeze(Gx);const Kx={"application/andrew-inset":["ez"],"application/appinstaller":["appinstaller"],"application/applixware":["aw"],"application/appx":["appx"],"application/appxbundle":["appxbundle"],"application/atom+xml":["atom"],"application/atomcat+xml":["atomcat"],"application/atomdeleted+xml":["atomdeleted"],"application/atomsvc+xml":["atomsvc"],"application/atsc-dwd+xml":["dwd"],"application/atsc-held+xml":["held"],"application/atsc-rsat+xml":["rsat"],"application/automationml-aml+xml":["aml"],"application/automationml-amlx+zip":["amlx"],"application/bdoc":["bdoc"],"application/calendar+xml":["xcs"],"application/ccxml+xml":["ccxml"],"application/cdfx+xml":["cdfx"],"application/cdmi-capability":["cdmia"],"application/cdmi-container":["cdmic"],"application/cdmi-domain":["cdmid"],"application/cdmi-object":["cdmio"],"application/cdmi-queue":["cdmiq"],"application/cpl+xml":["cpl"],"application/cu-seeme":["cu"],"application/cwl":["cwl"],"application/dash+xml":["mpd"],"application/dash-patch+xml":["mpp"],"application/davmount+xml":["davmount"],"application/docbook+xml":["dbk"],"application/dssc+der":["dssc"],"application/dssc+xml":["xdssc"],"application/ecmascript":["ecma"],"application/emma+xml":["emma"],"application/emotionml+xml":["emotionml"],"application/epub+zip":["epub"],"application/exi":["exi"],"application/express":["exp"],"application/fdf":["fdf"],"application/fdt+xml":["fdt"],"application/font-tdpfr":["pfr"],"application/geo+json":["geojson"],"application/gml+xml":["gml"],"application/gpx+xml":["gpx"],"application/gxf":["gxf"],"application/gzip":["gz"],"application/hjson":["hjson"],"application/hyperstudio":["stk"],"application/inkml+xml":["ink","inkml"],"application/ipfix":["ipfix"],"application/its+xml":["its"],"application/java-archive":["jar","war","ear"],"application/java-serialized-object":["ser"],"application/java-vm":["class"],"application/javascript":["*js"],"application/json":["json","map"],"application/json5":["json5"],"application/jsonml+json":["jsonml"],"application/ld+json":["jsonld"],"application/lgr+xml":["lgr"],"application/lost+xml":["lostxml"],"application/mac-binhex40":["hqx"],"application/mac-compactpro":["cpt"],"application/mads+xml":["mads"],"application/manifest+json":["webmanifest"],"application/marc":["mrc"],"application/marcxml+xml":["mrcx"],"application/mathematica":["ma","nb","mb"],"application/mathml+xml":["mathml"],"application/mbox":["mbox"],"application/media-policy-dataset+xml":["mpf"],"application/mediaservercontrol+xml":["mscml"],"application/metalink+xml":["metalink"],"application/metalink4+xml":["meta4"],"application/mets+xml":["mets"],"application/mmt-aei+xml":["maei"],"application/mmt-usd+xml":["musd"],"application/mods+xml":["mods"],"application/mp21":["m21","mp21"],"application/mp4":["*mp4","*mpg4","mp4s","m4p"],"application/msix":["msix"],"application/msixbundle":["msixbundle"],"application/msword":["doc","dot"],"application/mxf":["mxf"],"application/n-quads":["nq"],"application/n-triples":["nt"],"application/node":["cjs"],"application/octet-stream":["bin","dms","lrf","mar","so","dist","distz","pkg","bpk","dump","elc","deploy","exe","dll","deb","dmg","iso","img","msi","msp","msm","buffer"],"application/oda":["oda"],"application/oebps-package+xml":["opf"],"application/ogg":["ogx"],"application/omdoc+xml":["omdoc"],"application/onenote":["onetoc","onetoc2","onetmp","onepkg"],"application/oxps":["oxps"],"application/p2p-overlay+xml":["relo"],"application/patch-ops-error+xml":["xer"],"application/pdf":["pdf"],"application/pgp-encrypted":["pgp"],"application/pgp-keys":["asc"],"application/pgp-signature":["sig","*asc"],"application/pics-rules":["prf"],"application/pkcs10":["p10"],"application/pkcs7-mime":["p7m","p7c"],"application/pkcs7-signature":["p7s"],"application/pkcs8":["p8"],"application/pkix-attr-cert":["ac"],"application/pkix-cert":["cer"],"application/pkix-crl":["crl"],"application/pkix-pkipath":["pkipath"],"application/pkixcmp":["pki"],"application/pls+xml":["pls"],"application/postscript":["ai","eps","ps"],"application/provenance+xml":["provx"],"application/pskc+xml":["pskcxml"],"application/raml+yaml":["raml"],"application/rdf+xml":["rdf","owl"],"application/reginfo+xml":["rif"],"application/relax-ng-compact-syntax":["rnc"],"application/resource-lists+xml":["rl"],"application/resource-lists-diff+xml":["rld"],"application/rls-services+xml":["rs"],"application/route-apd+xml":["rapd"],"application/route-s-tsid+xml":["sls"],"application/route-usd+xml":["rusd"],"application/rpki-ghostbusters":["gbr"],"application/rpki-manifest":["mft"],"application/rpki-roa":["roa"],"application/rsd+xml":["rsd"],"application/rss+xml":["rss"],"application/rtf":["rtf"],"application/sbml+xml":["sbml"],"application/scvp-cv-request":["scq"],"application/scvp-cv-response":["scs"],"application/scvp-vp-request":["spq"],"application/scvp-vp-response":["spp"],"application/sdp":["sdp"],"application/senml+xml":["senmlx"],"application/sensml+xml":["sensmlx"],"application/set-payment-initiation":["setpay"],"application/set-registration-initiation":["setreg"],"application/shf+xml":["shf"],"application/sieve":["siv","sieve"],"application/smil+xml":["smi","smil"],"application/sparql-query":["rq"],"application/sparql-results+xml":["srx"],"application/sql":["sql"],"application/srgs":["gram"],"application/srgs+xml":["grxml"],"application/sru+xml":["sru"],"application/ssdl+xml":["ssdl"],"application/ssml+xml":["ssml"],"application/swid+xml":["swidtag"],"application/tei+xml":["tei","teicorpus"],"application/thraud+xml":["tfi"],"application/timestamped-data":["tsd"],"application/toml":["toml"],"application/trig":["trig"],"application/ttml+xml":["ttml"],"application/ubjson":["ubj"],"application/urc-ressheet+xml":["rsheet"],"application/urc-targetdesc+xml":["td"],"application/voicexml+xml":["vxml"],"application/wasm":["wasm"],"application/watcherinfo+xml":["wif"],"application/widget":["wgt"],"application/winhlp":["hlp"],"application/wsdl+xml":["wsdl"],"application/wspolicy+xml":["wspolicy"],"application/xaml+xml":["xaml"],"application/xcap-att+xml":["xav"],"application/xcap-caps+xml":["xca"],"application/xcap-diff+xml":["xdf"],"application/xcap-el+xml":["xel"],"application/xcap-ns+xml":["xns"],"application/xenc+xml":["xenc"],"application/xfdf":["xfdf"],"application/xhtml+xml":["xhtml","xht"],"application/xliff+xml":["xlf"],"application/xml":["xml","xsl","xsd","rng"],"application/xml-dtd":["dtd"],"application/xop+xml":["xop"],"application/xproc+xml":["xpl"],"application/xslt+xml":["*xsl","xslt"],"application/xspf+xml":["xspf"],"application/xv+xml":["mxml","xhvml","xvml","xvm"],"application/yang":["yang"],"application/yin+xml":["yin"],"application/zip":["zip"],"audio/3gpp":["*3gpp"],"audio/aac":["adts","aac"],"audio/adpcm":["adp"],"audio/amr":["amr"],"audio/basic":["au","snd"],"audio/midi":["mid","midi","kar","rmi"],"audio/mobile-xmf":["mxmf"],"audio/mp3":["*mp3"],"audio/mp4":["m4a","mp4a"],"audio/mpeg":["mpga","mp2","mp2a","mp3","m2a","m3a"],"audio/ogg":["oga","ogg","spx","opus"],"audio/s3m":["s3m"],"audio/silk":["sil"],"audio/wav":["wav"],"audio/wave":["*wav"],"audio/webm":["weba"],"audio/xm":["xm"],"font/collection":["ttc"],"font/otf":["otf"],"font/ttf":["ttf"],"font/woff":["woff"],"font/woff2":["woff2"],"image/aces":["exr"],"image/apng":["apng"],"image/avci":["avci"],"image/avcs":["avcs"],"image/avif":["avif"],"image/bmp":["bmp","dib"],"image/cgm":["cgm"],"image/dicom-rle":["drle"],"image/dpx":["dpx"],"image/emf":["emf"],"image/fits":["fits"],"image/g3fax":["g3"],"image/gif":["gif"],"image/heic":["heic"],"image/heic-sequence":["heics"],"image/heif":["heif"],"image/heif-sequence":["heifs"],"image/hej2k":["hej2"],"image/hsj2":["hsj2"],"image/ief":["ief"],"image/jls":["jls"],"image/jp2":["jp2","jpg2"],"image/jpeg":["jpeg","jpg","jpe"],"image/jph":["jph"],"image/jphc":["jhc"],"image/jpm":["jpm","jpgm"],"image/jpx":["jpx","jpf"],"image/jxr":["jxr"],"image/jxra":["jxra"],"image/jxrs":["jxrs"],"image/jxs":["jxs"],"image/jxsc":["jxsc"],"image/jxsi":["jxsi"],"image/jxss":["jxss"],"image/ktx":["ktx"],"image/ktx2":["ktx2"],"image/png":["png"],"image/sgi":["sgi"],"image/svg+xml":["svg","svgz"],"image/t38":["t38"],"image/tiff":["tif","tiff"],"image/tiff-fx":["tfx"],"image/webp":["webp"],"image/wmf":["wmf"],"message/disposition-notification":["disposition-notification"],"message/global":["u8msg"],"message/global-delivery-status":["u8dsn"],"message/global-disposition-notification":["u8mdn"],"message/global-headers":["u8hdr"],"message/rfc822":["eml","mime"],"model/3mf":["3mf"],"model/gltf+json":["gltf"],"model/gltf-binary":["glb"],"model/iges":["igs","iges"],"model/jt":["jt"],"model/mesh":["msh","mesh","silo"],"model/mtl":["mtl"],"model/obj":["obj"],"model/prc":["prc"],"model/step+xml":["stpx"],"model/step+zip":["stpz"],"model/step-xml+zip":["stpxz"],"model/stl":["stl"],"model/u3d":["u3d"],"model/vrml":["wrl","vrml"],"model/x3d+binary":["*x3db","x3dbz"],"model/x3d+fastinfoset":["x3db"],"model/x3d+vrml":["*x3dv","x3dvz"],"model/x3d+xml":["x3d","x3dz"],"model/x3d-vrml":["x3dv"],"text/cache-manifest":["appcache","manifest"],"text/calendar":["ics","ifb"],"text/coffeescript":["coffee","litcoffee"],"text/css":["css"],"text/csv":["csv"],"text/html":["html","htm","shtml"],"text/jade":["jade"],"text/javascript":["js","mjs"],"text/jsx":["jsx"],"text/less":["less"],"text/markdown":["md","markdown"],"text/mathml":["mml"],"text/mdx":["mdx"],"text/n3":["n3"],"text/plain":["txt","text","conf","def","list","log","in","ini"],"text/richtext":["rtx"],"text/rtf":["*rtf"],"text/sgml":["sgml","sgm"],"text/shex":["shex"],"text/slim":["slim","slm"],"text/spdx":["spdx"],"text/stylus":["stylus","styl"],"text/tab-separated-values":["tsv"],"text/troff":["t","tr","roff","man","me","ms"],"text/turtle":["ttl"],"text/uri-list":["uri","uris","urls"],"text/vcard":["vcard"],"text/vtt":["vtt"],"text/wgsl":["wgsl"],"text/xml":["*xml"],"text/yaml":["yaml","yml"],"video/3gpp":["3gp","3gpp"],"video/3gpp2":["3g2"],"video/h261":["h261"],"video/h263":["h263"],"video/h264":["h264"],"video/iso.segment":["m4s"],"video/jpeg":["jpgv"],"video/jpm":["*jpm","*jpgm"],"video/mj2":["mj2","mjp2"],"video/mp2t":["ts"],"video/mp4":["mp4","mp4v","mpg4"],"video/mpeg":["mpeg","mpg","mpe","m1v","m2v"],"video/ogg":["ogv"],"video/quicktime":["qt","mov"],"video/webm":["webm"]};Object.freeze(Kx);var Yx,Xx,Qx,Jx=this&&this.__classPrivateFieldGet||function(e,t,n,r){if("a"===n&&!r)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof t?e!==t||!r:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?r:"a"===n?r.call(e):r?r.value:t.get(e)};Yx=new WeakMap,Xx=new WeakMap,Qx=new WeakMap;var Zx=new class{constructor(...e){Yx.set(this,new Map),Xx.set(this,new Map),Qx.set(this,new Map);for(const t of e)this.define(t)}define(e,t=!1){for(let[n,r]of Object.entries(e)){n=n.toLowerCase(),r=r.map((e=>e.toLowerCase())),Jx(this,Qx,"f").has(n)||Jx(this,Qx,"f").set(n,new Set);const e=Jx(this,Qx,"f").get(n);let o=!0;for(let a of r){const r=a.startsWith("*");if(a=r?a.slice(1):a,e?.add(a),o&&Jx(this,Xx,"f").set(n,a),o=!1,r)continue;const i=Jx(this,Yx,"f").get(a);if(i&&i!=n&&!t)throw new Error(`"${n} -> ${a}" conflicts with "${i} -> ${a}". Pass \`force=true\` to override this definition.`);Jx(this,Yx,"f").set(a,n)}}return this}getType(e){if("string"!=typeof e)return null;const t=e.replace(/^.*[/\\]/,"").toLowerCase(),n=t.replace(/^.*\./,"").toLowerCase(),r=t.length<e.length;return!(n.length<t.length-1)&&r?null:Jx(this,Yx,"f").get(n)??null}getExtension(e){return"string"!=typeof e?null:(e=e?.split?.(";")[0],(e&&Jx(this,Xx,"f").get(e.trim().toLowerCase()))??null)}getAllExtensions(e){return"string"!=typeof e?null:Jx(this,Qx,"f").get(e.toLowerCase())??null}_freeze(){this.define=()=>{throw new Error("define() not allowed for built-in Mime objects. See https://github.com/broofa/mime/blob/main/README.md#custom-mime-instances")},Object.freeze(this);for(const e of Jx(this,Qx,"f").values())Object.freeze(e);return this}_getTestState(){return{types:Jx(this,Yx,"f"),extensions:Jx(this,Xx,"f")}}}(Kx,Gx)._freeze();const ek=()=>{const{addToast:e}=Ei(),{t:t}=_e(),n=p.useCallback((({title:n,message:r,type:o})=>{e((({close:e})=>v.jsxs(Fa,{type:o,children:[n&&v.jsx(Ua,{children:n}),r,v.jsx(Va,{"aria-label":t("cph-theme-shared.close-label","Close"),onClick:e})]})))}),[e,t]);return n};function tk(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(e){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return t.some((t=>(t&&t(e,...r),e&&e.defaultPrevented)))}}const nk="ArrowDown",rk="End",ok="Home",ak="ArrowLeft",ik="ArrowRight",sk="ArrowUp";let lk=0;const ck=(e,t,n,r)=>{let o=[];const a=e[0].length;return 0===t&&0===n||(0===n?r&&(o=[t-1,a-1]):o=[t,n-1]),o},uk=(e,t,n,r)=>{let o=[];const a=e.length,i=e[0].length,s=a-1,l=e[s].length-1;return t===s&&n===l||(n===i-1?r&&(o=[t+1,0]):o=[t,n+1]),o},dk=(e,t,n)=>`${e}--R${t+1}C${n+1}`,pk=[ak,ik,sk,nk,ok,rk];function fk(e){let{rtl:t,wrap:n,matrix:r,idPrefix:o,onChange:a=(()=>{}),environment:i,rowIndex:s,colIndex:l,defaultRowIndex:c,defaultColIndex:u}=e;const d=i||document,f=(e=>An(e)||"id:"+lk++)(o),[m,h]=p.useState(null!=c?c:0),[g,b]=p.useState(null!=u?u:0),v=null!==s&&null!==l&&void 0!==s&&void 0!==l,y=v?s:m,w=v?l:g;p.useEffect((()=>{const e=r.length,t=r[0].length,n=y>=e,o=w>=t;if(n||o){let r=y,i=w;n&&(r=e>0?e-1:0),o&&(i=t>0?t-1:0),v||(h(r),b(i)),a(r,i)}}),[r,y,w,v,b,a]);const x=p.useCallback((e=>{let{role:t="grid",...n}=e;return{"data-garden-container-id":"containers.grid","data-garden-container-version":"3.0.14",role:null===t?void 0:t,...n}}),[]),k=p.useCallback((function(e){let{role:o="gridcell",rowIndex:i,colIndex:s,onFocus:l,onKeyDown:c,...u}=void 0===e?{rowIndex:0,colIndex:0}:e;return{"data-garden-container-id":"containers.grid.cell","data-garden-container-version":"3.0.14",id:dk(f,i,s),role:null===o?void 0:o,tabIndex:y===i&&w===s?0:-1,onFocus:tk(l,(()=>{v||(h(i),b(s)),a(i,s)})),onKeyDown:tk(c,(e=>{if(pk.includes(e.key)){e.preventDefault();let o=y,a=w;switch(e.key){case ik:[o,a]=t?ck(r,y,w,n):uk(r,y,w,n);break;case ak:[o,a]=t?uk(r,y,w,n):ck(r,y,w,n);break;case nk:[o,a]=((e,t,n,r)=>{let o=[];const a=e.length,i=e[0].length,s=e[a-1].length;return t===a-(i>s?2:1)&&n===i-1||(t===a-(n>=s?2:1)?r&&(o=[0,n+1]):o=[t+1,n]),o})(r,y,w,n);break;case sk:[o,a]=((e,t,n,r)=>{let o=[];const a=e.length;if(0!==t||0!==n)if(0===t){if(r){const t=n-1;o=[a-(t>=e[a-1].length?2:1),t]}}else o=[t-1,n];return o})(r,y,w,n);break;case ok:o=e.ctrlKey?0:y,a=0;break;case rk:{const t=r.length-1,n=r[t].length-1;o=e.ctrlKey?t:y,a=e.ctrlKey?n:r[y].length-1;break}}if(o!==y||a!==w){const e=dk(f,o,a),t=d.getElementById(e);t?.focus()}}})),...u}}),[r,y,w,d,f,v,a,t,n]);return p.useMemo((()=>({getGridProps:x,getGridCellProps:k})),[x,k])}var mk,hk;function gk(){return gk=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},gk.apply(this,arguments)}Cn.func,Cn.func,Cn.bool,Cn.bool,Cn.any,Cn.string,Cn.number,Cn.number,Cn.number,Cn.number,Cn.func,Cn.any;var bk=function(e){return p.createElement("svg",gk({xmlns:"http://www.w3.org/2000/svg",width:12,height:12,viewBox:"0 0 12 12"},e),mk||(mk=p.createElement("path",{fill:"none",stroke:"currentColor",strokeLinecap:"round",d:"M5.06 1.27l-4.5 8.5c-.18.33.06.73.44.73h9c.38 0 .62-.4.44-.73l-4.5-8.5a.494.494 0 00-.88 0zM5.5 4v2"})),hk||(hk=p.createElement("circle",{cx:5.5,cy:8,r:.8,fill:"currentColor"})))},vk=["input:not([inert])","select:not([inert])","textarea:not([inert])","a[href]:not([inert])","button:not([inert])","[tabindex]:not(slot):not([inert])","audio[controls]:not([inert])","video[controls]:not([inert])",'[contenteditable]:not([contenteditable="false"]):not([inert])',"details>summary:first-of-type:not([inert])","details:not([inert])"].join(","),yk="undefined"==typeof Element,wk=yk?function(){}:Element.prototype.matches||Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector,xk=!yk&&Element.prototype.getRootNode?function(e){var t;return null==e||null===(t=e.getRootNode)||void 0===t?void 0:t.call(e)}:function(e){return null==e?void 0:e.ownerDocument},kk=function e(t,n){var r;void 0===n&&(n=!0);var o=null==t||null===(r=t.getAttribute)||void 0===r?void 0:r.call(t,"inert");return""===o||"true"===o||n&&t&&e(t.parentNode)},Ek=function e(t,n,r){for(var o=[],a=Array.from(t);a.length;){var i=a.shift();if(!kk(i,!1))if("SLOT"===i.tagName){var s=i.assignedElements(),l=e(s.length?s:i.children,!0,r);r.flatten?o.push.apply(o,l):o.push({scopeParent:i,candidates:l})}else{wk.call(i,vk)&&r.filter(i)&&(n||!t.includes(i))&&o.push(i);var c=i.shadowRoot||"function"==typeof r.getShadowRoot&&r.getShadowRoot(i),u=!kk(c,!1)&&(!r.shadowRootFilter||r.shadowRootFilter(i));if(c&&u){var d=e(!0===c?i.children:c.children,!0,r);r.flatten?o.push.apply(o,d):o.push({scopeParent:i,candidates:d})}else a.unshift.apply(a,i.children)}}return o},Sk=function(e){return!isNaN(parseInt(e.getAttribute("tabindex"),10))},Ck=function(e){if(!e)throw new Error("No node provided");return e.tabIndex<0&&(/^(AUDIO|VIDEO|DETAILS)$/.test(e.tagName)||function(e){var t,n=null==e||null===(t=e.getAttribute)||void 0===t?void 0:t.call(e,"contenteditable");return""===n||"true"===n}(e))&&!Sk(e)?0:e.tabIndex},Ok=function(e,t){return e.tabIndex===t.tabIndex?e.documentOrder-t.documentOrder:e.tabIndex-t.tabIndex},Pk=function(e){return"INPUT"===e.tagName},Ik=function(e){return function(e){return Pk(e)&&"radio"===e.type}(e)&&!function(e){if(!e.name)return!0;var t,n=e.form||xk(e),r=function(e){return n.querySelectorAll('input[type="radio"][name="'+e+'"]')};if("undefined"!=typeof window&&void 0!==window.CSS&&"function"==typeof window.CSS.escape)t=r(window.CSS.escape(e.name));else try{t=r(e.name)}catch(e){return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s",e.message),!1}var o=function(e,t){for(var n=0;n<e.length;n++)if(e[n].checked&&e[n].form===t)return e[n]}(t,e.form);return!o||o===e}(e)},_k=function(e){var t=e.getBoundingClientRect(),n=t.width,r=t.height;return 0===n&&0===r},Tk=function(e,t){var n=t.displayCheck,r=t.getShadowRoot;if("hidden"===getComputedStyle(e).visibility)return!0;var o=wk.call(e,"details>summary:first-of-type")?e.parentElement:e;if(wk.call(o,"details:not([open]) *"))return!0;if(n&&"full"!==n&&"legacy-full"!==n){if("non-zero-area"===n)return _k(e)}else{if("function"==typeof r){for(var a=e;e;){var i=e.parentElement,s=xk(e);if(i&&!i.shadowRoot&&!0===r(i))return _k(e);e=e.assignedSlot?e.assignedSlot:i||s===e.ownerDocument?i:s.host}e=a}if(function(e){var t,n,r,o,a=e&&xk(e),i=null===(t=a)||void 0===t?void 0:t.host,s=!1;if(a&&a!==e)for(s=!!(null!==(n=i)&&void 0!==n&&null!==(r=n.ownerDocument)&&void 0!==r&&r.contains(i)||null!=e&&null!==(o=e.ownerDocument)&&void 0!==o&&o.contains(e));!s&&i;){var l,c,u;s=!(null===(c=i=null===(l=a=xk(i))||void 0===l?void 0:l.host)||void 0===c||null===(u=c.ownerDocument)||void 0===u||!u.contains(i))}return s}(e))return!e.getClientRects().length;if("legacy-full"!==n)return!0}return!1},Nk=function(e,t){return!(t.disabled||kk(t)||function(e){return Pk(e)&&"hidden"===e.type}(t)||Tk(t,e)||function(e){return"DETAILS"===e.tagName&&Array.prototype.slice.apply(e.children).some((function(e){return"SUMMARY"===e.tagName}))}(t)||function(e){if(/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(e.tagName))for(var t=e.parentElement;t;){if("FIELDSET"===t.tagName&&t.disabled){for(var n=0;n<t.children.length;n++){var r=t.children.item(n);if("LEGEND"===r.tagName)return!!wk.call(t,"fieldset[disabled] *")||!r.contains(e)}return!0}t=t.parentElement}return!1}(t))},jk=function(e,t){return!(Ik(t)||Ck(t)<0||!Nk(e,t))},Ak=function(e){var t=parseInt(e.getAttribute("tabindex"),10);return!!(isNaN(t)||t>=0)},Rk=function e(t){var n=[],r=[];return t.forEach((function(t,o){var a=!!t.scopeParent,i=a?t.scopeParent:t,s=function(e,t){var n=Ck(e);return n<0&&t&&!Sk(e)?0:n}(i,a),l=a?e(t.candidates):i;0===s?a?n.push.apply(n,l):n.push(i):r.push({documentOrder:o,tabIndex:s,item:t,isScope:a,content:l})})),r.sort(Ok).reduce((function(e,t){return t.isScope?e.push.apply(e,t.content):e.push(t.content),e}),[]).concat(n)},Lk=function(e,t){var n;return n=(t=t||{}).getShadowRoot?Ek([e],t.includeContainer,{filter:jk.bind(null,t),flatten:!1,getShadowRoot:t.getShadowRoot,shadowRootFilter:Ak}):function(e,t,n){if(kk(e))return[];var r=Array.prototype.slice.apply(e.querySelectorAll(vk));return t&&wk.call(e,vk)&&r.unshift(e),r.filter(n)}(e,t.includeContainer,jk.bind(null,t)),Rk(n)};
/*!
* tabbable 6.2.0
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/function Mk(e){var t;void 0===e&&(e=t&&t.ownerDocument||document);try{var n=e.activeElement;return n&&n.nodeName?n:null}catch(t){return e.body}}const Dk=function(e){let{focusOnMount:t=!0,restoreFocus:n=!0,environment:r,focusElem:o,containerRef:a}=void 0===e?{containerRef:p.createRef()}:e;const i=p.useRef(null),[s,l]=p.useState(a.current);p.useEffect((()=>{a.current!==s&&l(a.current)}));const c=p.useCallback((e=>{const t=e;o?o(t):t&&t.focus()}),[o]),u=()=>{const e=Mk(r||document),t=s;return t.contains(e)?e:t};return p.useEffect((()=>{const e=r||document;return i.current=Mk(e),t&&c(s),()=>{const t=i.current!==e.body,r=null!==i.current;t&&r&&n&&c(i.current)}}),[t,n,r,c,s]),{getContainerProps:function(e){let{onKeyDown:t,...n}=void 0===e?{}:e;return{onKeyDown:Qu(t,(e=>{if(e.key!==Ju.TAB)return;(()=>{if(!s)throw new Error("Accessibility Error: You must apply the ref prop to your containing element.")})();const t=(()=>{const e=Lk(s);return{firstItem:e[0]||u(),lastItem:e[e.length-1]||u()}})();!e.shiftKey||e.target!==t.firstItem&&e.target!==s||(c(t.lastItem),e.preventDefault()),e.shiftKey||e.target!==t.lastItem||(c(t.firstItem),e.preventDefault())})),"data-garden-container-id":"containers.focusjail","data-garden-container-version":"2.0.19",...n}},focusElement:c}};Cn.func,Cn.func,Cn.bool,Cn.bool,Cn.any,Cn.any.isRequired,Cn.func;const zk=e=>{let{onClose:t,modalRef:n,idPrefix:r,focusOnMount:o,restoreFocus:a,environment:i}=e;const s=(e=>An(e)||"id:"+Zu++)(r),l=`${s}__title`,c=`${s}__content`,u=p.useRef(!1),d=e=>{t&&t(e)},{getContainerProps:f}=Dk({containerRef:n,focusOnMount:o,restoreFocus:a,environment:i});return{getBackdropProps:function(e){let{onMouseUp:t,...n}=void 0===e?{}:e;const r="containers.modal";return{onMouseUp:Qu(t,(e=>{const t=e.target,n=r===t.getAttribute("data-garden-container-id");!u.current&&n&&d(e),u.current=!1})),"data-garden-container-id":r,"data-garden-container-version":"1.0.19",...n}},getModalProps:e=>f(function(e){let{role:t="dialog",onKeyDown:n,onMouseDown:r,...o}=void 0===e?{}:e;return{role:null===t?void 0:t,tabIndex:-1,"aria-modal":!0,"aria-labelledby":l,"aria-describedby":c,onMouseDown:Qu(r,(()=>{u.current=!0})),onKeyDown:Qu(n,(e=>{e.key===Ju.ESCAPE&&d(e)})),...o}}(e)),getTitleProps:function(e){let{id:t=l,...n}=void 0===e?{}:e;return{id:t,...n}},getContentProps:function(e){let{id:t=c,...n}=void 0===e?{}:e;return{id:t,...n}},getCloseProps:e=>{let{onClick:t,...n}=e;return{onClick:Qu(t,(e=>{d(e)})),...n}},closeModal:d}};function Fk(e){return"window"in e&&e.window===e?e:"nodeType"in(t=e)&&t.nodeType===document.DOCUMENT_NODE&&e.defaultView||!1;var t}function Hk(e){return e&&e.ownerDocument||document}function $k(e){var t=Hk(e);return t&&t.defaultView||window}Cn.func,Cn.func,Cn.func,Cn.any.isRequired,Cn.string,Cn.bool,Cn.bool,Cn.any;var Bk=/([A-Z])/g;var Vk=/^ms-/;function Uk(e){return function(e){return e.replace(Bk,"-$1").toLowerCase()}(e).replace(Vk,"-ms-")}var Wk=/^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i;function qk(e,t){var n="",r="";if("string"==typeof t)return e.style.getPropertyValue(Uk(t))||function(e,t){return $k(e).getComputedStyle(e,t)}(e).getPropertyValue(Uk(t));Object.keys(t).forEach((function(o){var a=t[o];a||0===a?!function(e){return!(!e||!Wk.test(e))}(o)?n+=Uk(o)+": "+a+";":r+=o+"("+a+") ":e.style.removeProperty(Uk(o))})),r&&(n+="transform: "+r+";"),e.style.cssText+=";"+n}var Gk,Kk=!("undefined"==typeof window||!window.document||!window.document.createElement);const Yk="modals.backdrop",Xk=bn(["0%{opacity:0;}100%{opacity:1;}"]),Qk=kn.div.attrs({"data-garden-id":Yk,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledBackdrop",componentId:"sc-mzdjpo-0"})(["display:flex;position:fixed;inset:0;align-items:",";justify-content:",";z-index:400;background-color:",";overflow:auto;-webkit-overflow-scrolling:touch;font-family:",";direction:",";",";",";"],(e=>e.isCentered&&"center"),(e=>e.isCentered&&"center"),(e=>No("neutralHue",800,e.theme,.85)),(e=>e.theme.fonts.system),(e=>e.theme.rtl&&"rtl"),(e=>e.isAnimated?tn(["animation:"," 0.15s ease-in;"],Xk):""),(e=>Kn(Yk,e)));Qk.defaultProps={theme:Wn},Qk.propTypes={isCentered:Cn.bool,isAnimated:Cn.bool};const Jk="modals.body",Zk=kn.div.attrs({"data-garden-id":Jk,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledBody",componentId:"sc-14rzecg-0"})(["display:block;margin:0;padding:",";height:100%;overflow:auto;line-height:",";color:",";font-size:",";",";"],(e=>`${5*e.theme.space.base}px ${10*e.theme.space.base}px`),(e=>Ao(e.theme.lineHeights.md,e.theme.fontSizes.md)),(e=>No("foreground",600,e.theme)),(e=>e.theme.fontSizes.md),(e=>Kn(Jk,e)));Zk.defaultProps={theme:Wn};const eE="modals.close",tE=2.5,nE=6.5,rE=10,oE=kn.button.attrs({"data-garden-id":eE,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledClose",componentId:"sc-iseudj-0"})(["display:block;position:absolute;top:","px;",":",";transition:box-shadow 0.1s ease-in-out,background-color 0.25s ease-in-out,color 0.25s ease-in-out;border:none;border-radius:50%;background-color:transparent;cursor:pointer;padding:0;width:","px;height:","px;overflow:hidden;text-decoration:none;font-size:0;user-select:none;&::-moz-focus-inner{border:0;}"," & > svg{vertical-align:middle;}",";"],(e=>e.theme.space.base*tE),(e=>e.theme.rtl?"left":"right"),(e=>e.theme.space.base*nE+"px"),(e=>e.theme.space.base*rE),(e=>e.theme.space.base*rE),(e=>(e=>{const t="primaryHue",n="neutralHue";return tn(["background-color:transparent;color:",";&:hover{background-color:",";color:",";}"," &:active{transition:background-color 0.1s ease-in-out,color 0.1s ease-in-out;background-color:",";color:",";}"],No(n,600,e.theme),No(t,600,e.theme,.08),No(n,700,e.theme),Ho({theme:e.theme,hue:t}),No(t,600,e.theme,.2),No(n,800,e.theme))})(e)),(e=>Kn(eE,e)));oE.defaultProps={theme:Wn};const aE="modals.footer",iE=kn.div.attrs({"data-garden-id":aE,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledFooter",componentId:"sc-d8pfdu-0"})(["display:flex;flex-shrink:0;align-items:center;justify-content:flex-end;border-top:",";padding:",";",";"],(e=>e.isLarge&&`${e.theme.borders.sm} ${No("neutralHue",200,e.theme)}`),(e=>e.isLarge?`${8*e.theme.space.base}px ${10*e.theme.space.base}px`:`${5*e.theme.space.base}px ${10*e.theme.space.base}px ${8*e.theme.space.base}px`),(e=>Kn(aE,e)));iE.defaultProps={theme:Wn};const sE="modals.footer_item",lE=kn.span.attrs({"data-garden-id":sE,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledFooterItem",componentId:"sc-1mb76hl-0"})(["display:flex;margin-",":","px;min-width:0;&:first-child{margin-",":0;}",";"],(e=>e.theme.rtl?"right":"left"),(e=>5*e.theme.space.base),(e=>e.theme.rtl?"right":"left"),(e=>Kn(sE,e)));lE.defaultProps={theme:Wn};const cE="modals.header",uE=kn.div.attrs({"data-garden-id":cE,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledHeader",componentId:"sc-1787r9v-0"})(["display:block;position:",";margin:0;border-bottom:"," ",";padding:",";","  line-height:",";color:",";font-size:",";font-weight:",";",";"],(e=>e.isDanger&&"relative"),(e=>e.theme.borders.sm),No("neutralHue",200),(e=>`${5*e.theme.space.base}px ${10*e.theme.space.base}px`),(e=>e.isCloseButtonPresent&&`padding-${e.theme.rtl?"left":"right"}: ${e.theme.space.base*(rE+nE+2)}px;`),(e=>Ao(e.theme.lineHeights.md,e.theme.fontSizes.md)),(e=>e.isDanger?No("dangerHue",600,e.theme):No("foreground",600,e.theme)),(e=>e.theme.fontSizes.md),(e=>e.theme.fontWeights.semibold),(e=>Kn(cE,e)));var dE,pE;function fE(){return fE=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},fE.apply(null,arguments)}uE.defaultProps={theme:Wn};const mE=kn((function(e){return p.createElement("svg",fE({xmlns:"http://www.w3.org/2000/svg",width:16,height:16,focusable:"false",viewBox:"0 0 16 16","aria-hidden":"true"},e),dE||(dE=p.createElement("g",{fill:"none",stroke:"currentColor"},p.createElement("circle",{cx:7.5,cy:8.5,r:7}),p.createElement("path",{strokeLinecap:"round",d:"M7.5 4.5V9"}))),pE||(pE=p.createElement("circle",{cx:7.5,cy:12,r:1,fill:"currentColor"})))})).withConfig({displayName:"StyledDangerIcon",componentId:"sc-1kwbb39-0"})(["position:absolute;top:","px;",":",";"],(e=>5.5*e.theme.space.base),(e=>e.theme.rtl?"right":"left"),(e=>4*e.theme.space.base+"px"));mE.defaultProps={theme:Wn};const hE="modals.modal",gE=bn(["0%{transform:scale(0);opacity:0;}50%{transform:scale(1.05);}100%{opacity:1;}"]),bE=kn.div.attrs({"data-garden-id":hE,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledModal",componentId:"sc-1pe1axu-0"})(["display:flex;position:fixed;flex-direction:column;animation-delay:0.01s;margin:",";border-radius:",";box-shadow:",";background-color:",";min-height:60px;max-height:calc(100vh - ","px);overflow:auto;direction:",";",";",";&:focus{outline:none;}@media (max-height:399px){top:","px;bottom:auto;margin-bottom:","px;max-height:none;}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){right:",";bottom:",";transform:",";}",";"],(e=>e.isCentered?"0":12*e.theme.space.base+"px"),(e=>e.theme.borderRadii.md),(e=>{const{theme:t}=e,{space:n,shadows:r}=t,o=5*n.base+"px",a=7*n.base+"px",i=No("neutralHue",800,t,.35);return r.lg(o,a,i)}),(e=>No("background",600,e.theme)),(e=>24*e.theme.space.base),(e=>e.theme.rtl&&"rtl"),(e=>e.isAnimated?tn(["animation:"," 0.3s ease-in;"],gE):""),(e=>tn(["","{width:",";}"],function(e,t,n){let r,o,a;const i=n&&n.breakpoints?n.breakpoints:Wn.breakpoints;if("string"==typeof t?"up"===e?o=i[t]:"down"===e?"xl"===t?o=Wn.breakpoints.xs:a=Ro(i,t):"only"===e&&(o=i[t],a=Ro(i,t)):"between"===e&&(o=i[t[0]],a=Ro(i,t[1])),o)r=`@media (min-width: ${o})`,a&&(r=`${r} and (max-width: ${a})`);else{if(!a)throw new Error(`Unexpected query and breakpoint combination: '${e}', '${t}'.`);r=`@media (max-width: ${a})`}return r}("up",e.isLarge?"md":"sm",e.theme),e.isLarge?e.theme.breakpoints.md:e.theme.breakpoints.sm)),(e=>6*e.theme.space.base),(e=>6*e.theme.space.base),(e=>e.isCentered&&"50%"),(e=>e.isCentered&&"50%"),(e=>e.isCentered&&"translate(50%, 50%)"),(e=>Kn(hE,e)));bE.propTypes={isLarge:Cn.bool,isAnimated:Cn.bool},bE.defaultProps={theme:Wn};const vE=p.createContext(void 0),yE=()=>{const e=p.useContext(vE);if(void 0===e)throw new Error("useModalContext must be used within a ModalsContext.Provider");return e},wE=p.forwardRef(((e,t)=>{let{backdropProps:n,children:r,onClose:o,isLarge:a,isCentered:i,isAnimated:s,id:l,appendToNode:c,focusOnMount:u,restoreFocus:d,...m}=e;const h=p.useContext(pn),g=p.useRef(null),b=qn(h),[v,y]=p.useState(!1),[w,x]=p.useState(!1),{getBackdropProps:k,getModalProps:E,getTitleProps:C,getContentProps:O,getCloseProps:P}=zk({idPrefix:l,onClose:o,modalRef:g,focusOnMount:u,restoreFocus:d});Pn({scope:g,relativeDocument:b}),p.useEffect((()=>{if(!b)return;const e=b.querySelector("html"),t=b.querySelector("body");let n,r;if(t){if((e=>{const t=Hk(e),n=$k(t),r=e&&"body"===e.tagName.toLowerCase();if(!Fk(t)&&!r)return e.scrollHeight>e.clientHeight;const o=n.getComputedStyle(t.body),a=parseInt(o.getPropertyValue("margin-left"),10),i=parseInt(o.getPropertyValue("margin-right"),10);return a+t.body.clientWidth+i<n.innerWidth})(t)){const e=function(e){if((!Gk&&0!==Gk||e)&&Kk){var t=document.createElement("div");t.style.position="absolute",t.style.top="-9999px",t.style.width="50px",t.style.height="50px",t.style.overflow="scroll",document.body.appendChild(t),Gk=t.offsetWidth-t.clientWidth,document.body.removeChild(t)}return Gk}(),n=parseInt(qk(t,"paddingRight")||"0",10);r=t.style.paddingRight,t.style.paddingRight=`${n+e}px`}return e&&(n=e.style.overflow,e.style.overflow="hidden"),()=>{e&&(e.style.overflow=n),t.style.paddingRight=r}}}),[b]);const I=p.useMemo((()=>c||(b?b.body:void 0)),[c,b]),_=p.useMemo((()=>({isLarge:a,isCloseButtonPresent:v,hasHeader:w,setHasHeader:x,getTitleProps:C,getContentProps:O,getCloseProps:P,setIsCloseButtonPresent:y})),[a,w,v,C,O,P]),T=E({"aria-describedby":void 0,...w?{}:{"aria-labelledby":void 0}}),N=w?"aria-labelledby":"aria-label",j=w?T["aria-labelledby"]:"Modal dialog",A=w?T["aria-labelledby"]:m["aria-label"],R={[N]:Do(wE,{[N]:A},N,j)};return I?S.createPortal(f.createElement(vE.Provider,{value:_},f.createElement(Qk,Object.assign({isCentered:i,isAnimated:s},k(n)),f.createElement(bE,Object.assign({isCentered:i,isAnimated:s,isLarge:a},T,R,m,{ref:ea([t,g])}),r))),I):null}));wE.displayName="Modal",wE.propTypes={backdropProps:Cn.object,isLarge:Cn.bool,isAnimated:Cn.bool,isCentered:Cn.bool,focusOnMount:Cn.bool,restoreFocus:Cn.bool,onClose:Cn.func,appendToNode:Cn.any},wE.defaultProps={isAnimated:!0,isCentered:!0};const xE=p.forwardRef(((e,t)=>{const{getContentProps:n}=yE();return f.createElement(Zk,Object.assign({},n(e),{ref:t}))}));var kE;function EE(){return EE=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},EE.apply(null,arguments)}xE.displayName="Body";var SE=function(e){return p.createElement("svg",EE({xmlns:"http://www.w3.org/2000/svg",width:16,height:16,focusable:"false",viewBox:"0 0 16 16","aria-hidden":"true"},e),kE||(kE=p.createElement("path",{stroke:"currentColor",strokeLinecap:"round",d:"M3 13L13 3m0 10L3 3"})))};const CE=p.forwardRef(((e,t)=>{const{getCloseProps:n,setIsCloseButtonPresent:r}=yE();p.useEffect((()=>(r(!0),()=>r(!1))));const o=Do(CE,e,"aria-label","Close modal");return f.createElement(oE,Object.assign({},n({...e,"aria-label":o}),{ref:t}),f.createElement(SE,null))}));CE.displayName="Close";const OE=f.forwardRef(((e,t)=>{const{isLarge:n}=yE();return f.createElement(iE,Object.assign({ref:t,isLarge:n},e))}));OE.displayName="Footer";const PE=f.forwardRef(((e,t)=>f.createElement(lE,Object.assign({ref:t},e))));PE.displayName="FooterItem";const IE=p.forwardRef(((e,t)=>{let{children:n,tag:r,...o}=e;const{isCloseButtonPresent:a,hasHeader:i,setHasHeader:s,getTitleProps:l}=yE();return p.useEffect((()=>(!i&&s&&s(!0),()=>{i&&s&&s(!1)})),[i,s]),f.createElement(uE,Object.assign({},l(o),{as:r,isCloseButtonPresent:a,ref:t}),o.isDanger&&f.createElement(mE,null),n)}));function _E(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(e){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return t.some((t=>(t&&t(e,...r),e&&e.defaultPrevented)))}}IE.displayName="Header",IE.propTypes={isDanger:Cn.bool,tag:Cn.any},IE.defaultProps={tag:"div"};const TE=13,NE=32;var jE;!function(e){e[e.DISCONNECTED=1]="DISCONNECTED",e[e.PRECEDING=2]="PRECEDING",e[e.FOLLOWING=4]="FOLLOWING",e[e.CONTAINS=8]="CONTAINS",e[e.CONTAINED_BY=16]="CONTAINED_BY",e[e.IMPLEMENTATION_SPECIFIC=32]="IMPLEMENTATION_SPECIFIC"}(jE||(jE={}));let AE=0;function RE(e){let{idPrefix:t,sections:n=[],expandedSections:r,defaultExpandedSections:o,onChange:a=(()=>{}),expandable:i=!0,collapsible:s=!0}=e;const l=(e=>An(e)||"id:"+AE++)(t),c=`${l}--trigger`,u=`${l}--panel`,d=null!=r,[f,m]=p.useState(o||n.slice(0,1)),[h,g]=p.useState(s?[]:f),b=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];for(const e of t)if(void 0!==e)return e}(r,f),v=p.useCallback((e=>{const t=[],r=[];n.forEach((n=>{let o=!1;n===e?o=!s||!1===b.includes(n):i&&(o=b.includes(n)),o&&(t.push(n),s||r.push(n))})),a(e),!1===d&&m(t),g(r)}),[n,b,s,i,d,a]),y=p.useCallback((e=>{let{role:t="heading","aria-level":n,...r}=e;return{role:null===t?void 0:t,"aria-level":n,"data-garden-container-id":"containers.accordion","data-garden-container-version":"3.0.4",...r}}),[]),w=p.useCallback((e=>{let{value:t,role:n="button",tabIndex:r=0,...o}=e;return{id:`${c}:${t}`,role:null===n?void 0:n,tabIndex:r,"aria-controls":`${u}:${t}`,"aria-disabled":h.includes(t)||void 0,"aria-expanded":b.includes(t),onClick:_E(o.onClick,(()=>v(t))),onKeyDown:_E(o.onKeyDown,(e=>{e.keyCode!==NE&&e.keyCode!==TE||(v(t),e.preventDefault())})),...o}}),[u,c,b,h,v]),x=p.useCallback((e=>{let{value:t,role:n="region",...r}=e;return{id:`${u}:${t}`,role:null===n?void 0:n,"aria-hidden":!b.includes(t),"aria-labelledby":`${c}:${t}`,...r}}),[u,c,b]);return p.useMemo((()=>({getHeaderProps:y,getTriggerProps:w,getPanelProps:x,expandedSections:b,disabledSections:h})),[y,w,x,b,h])}Cn.func,Cn.func,Cn.array.isRequired,Cn.array,Cn.array,Cn.bool,Cn.bool,Cn.string,Cn.func;const LE="accordions.accordion",ME=kn.div.attrs({"data-garden-id":LE,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledAccordion",componentId:"sc-niv9ic-0"})(["",";"],(e=>Kn(LE,e)));ME.defaultProps={theme:Wn};const DE="accordions.panel",zE=kn.section.attrs({"data-garden-id":DE,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledPanel",componentId:"sc-1piryze-0"})(["display:grid;transition:",";overflow:hidden;"," "," ",";"],(e=>e.isAnimated&&"padding 0.25s ease-in-out, grid-template-rows 0.25s ease-in-out"),(e=>{const{theme:t,isCompact:n,isExpanded:r}=e,{base:o}=t.space;let a=2*o,i=5*o,s=8*o;return n&&(a=2*o,i=3*o,s=4*o),!1===r&&(a=0,s=0),tn(["grid-template-rows:","fr;border-bottom:",";padding:","px ","px ","px;line-height:",";font-size:",";"],r?1:0,t.borders.sm,a,i,s,Ao(5*o,t.fontSizes.md),t.fontSizes.md)}),(e=>{const{theme:t,isBare:n}=e;return tn(["border-bottom-color:",";"],n?"transparent":No("neutralHue",300,t))}),(e=>Kn(DE,e)));zE.defaultProps={isAnimated:!0,theme:Wn};const FE="accordions.section",HE=kn.div.attrs({"data-garden-id":FE,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledSection",componentId:"sc-v2t9bd-0"})(["&:last-child ","{border:none;}",";"],zE,(e=>Kn(FE,e)));HE.defaultProps={theme:Wn};const $E="accordions.header",BE=kn.div.attrs({"data-garden-id":$E,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledHeader",componentId:"sc-2c6rbr-0"})(["display:flex;align-items:center;transition:box-shadow 0.1s ease-in-out;font-size:",";&:hover{cursor:",";}"," ",";"],(e=>e.theme.fontSizes.md),(e=>(e.isCollapsible||!e.isExpanded)&&"pointer"),(e=>Ho({theme:e.theme,inset:!0,condition:e.isFocused,selector:"&:focus-within"})),(e=>Kn($E,e)));BE.defaultProps={theme:Wn};const VE="accordions.button",UE=kn.button.attrs({"data-garden-id":VE,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledButton",componentId:"sc-xj3hy7-0"})(["transition:color 0.1s ease-in-out;outline:none;border:none;background:transparent;padding:",";width:100%;text-align:",";line-height:",";font-family:inherit;font-size:",";font-weight:",";"," &::-moz-focus-inner{border:0;}&:hover{cursor:",";}",";"],(e=>e.isCompact?`${2*e.theme.space.base}px ${3*e.theme.space.base}px`:5*e.theme.space.base+"px"),(e=>e.theme.rtl?"right":"left"),(e=>Ao(5*e.theme.space.base,e.theme.fontSizes.md)),(e=>e.theme.fontSizes.md),(e=>e.theme.fontWeights.semibold),(e=>{const t=e.isCollapsible||!e.isExpanded;let n=No("foreground",600,e.theme);return t&&e.isHovered&&(n=No("primaryHue",600,e.theme)),tn(["color:",";&:hover{cursor:",";color:",";}"],n,t&&"pointer",t&&n)}),(e=>(e.isCollapsible||!e.isExpanded)&&"pointer"),(e=>Kn(VE,e)));UE.defaultProps={theme:Wn};const WE="accordions.step_inner_panel",qE=kn.div.attrs({"data-garden-id":WE,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledInnerPanel",componentId:"sc-8nbueg-0"})(["overflow:hidden;line-height:inherit;font-size:inherit;","[aria-hidden='true'] > &{transition:",";visibility:hidden;}","[aria-hidden='false'] > &{visibility:visible;}",";"],zE,(e=>e.isAnimated&&"visibility 0s 0.25s"),zE,(e=>Kn(WE,e)));qE.defaultProps={theme:Wn};const GE="accordions.rotate_icon",KE=kn((e=>{let{children:t,isRotated:n,isHovered:r,isCompact:o,isCollapsible:a,...i}=e;return p.cloneElement(p.Children.only(t),i)})).attrs({"data-garden-id":GE,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledRotateIcon",componentId:"sc-hp435q-0"})(["transform:",";transition:transform 0.25s ease-in-out,color 0.1s ease-in-out;box-sizing:content-box;padding:",";width:",";min-width:",";height:",";vertical-align:middle;"," ",";"],(e=>e.isRotated&&`rotate(${e.theme.rtl?"-":"+"}180deg)`),(e=>e.isCompact?`${1.5*e.theme.space.base}px ${3*e.theme.space.base}px`:5*e.theme.space.base+"px"),(e=>e.theme.iconSizes.md),(e=>e.theme.iconSizes.md),(e=>e.theme.iconSizes.md),(e=>{const t=e.isCollapsible||!e.isRotated;let n=No("neutralHue",600,e.theme);return t&&e.isHovered&&(n=No("primaryHue",600,e.theme)),tn(["color:",";&:hover{color:",";}"],n,t&&n)}),(e=>Kn(GE,e)));KE.defaultProps={theme:Wn};const YE=p.createContext(void 0),XE=()=>{const e=p.useContext(YE);if(void 0===e)throw new Error("This component must be rendered within a Accordion component");return e},QE=p.createContext(void 0),JE=()=>{const e=p.useContext(QE);if(void 0===e)throw new Error("This component must be rendered within an Accordion component");return e},ZE=p.createContext(void 0),eS=p.forwardRef(((e,t)=>f.createElement(HE,Object.assign({ref:t},e))));eS.displayName="Accordion.Section";const tS=eS;function nS(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(e){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return t.some((t=>(t&&t(e,...r),e&&e.defaultPrevented)))}}var rS;function oS(){return oS=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},oS.apply(null,arguments)}var aS=function(e){return p.createElement("svg",oS({xmlns:"http://www.w3.org/2000/svg",width:16,height:16,focusable:"false",viewBox:"0 0 16 16","aria-hidden":"true"},e),rS||(rS=p.createElement("path",{fill:"currentColor",d:"M12.688 5.61a.5.5 0 01.69.718l-.066.062-5 4a.5.5 0 01-.542.054l-.082-.054-5-4a.5.5 0 01.55-.83l.074.05L8 9.359l4.688-3.75z"})))};const iS=p.forwardRef(((e,t)=>{const{onClick:n,onFocus:r,onBlur:o,onMouseOver:a,onMouseOut:i,role:s,children:l,...c}=e,{level:u,isCompact:d,isCollapsible:m,getHeaderProps:h,getTriggerProps:g,expandedSections:b}=XE(),v=JE(),[y,w]=p.useState(!1),[x,k]=p.useState(!1),E=b.includes(v),{onClick:S,onKeyDown:C,...O}=g({type:"button",value:v}),P=p.useMemo((()=>({isHovered:x,otherTriggerProps:O})),[x,O]);return f.createElement(ZE.Provider,{value:P},f.createElement(BE,Object.assign({isCollapsible:m,isExpanded:E,isFocused:y},h({ref:t,"aria-level":u,role:null==s?s:"heading",onClick:nS(n,S),onFocus:nS(r,(e=>{e.persist(),setTimeout((()=>{const t=e.target.getAttribute("data-garden-id")===VE,n=e.target.getAttribute("data-garden-focus-visible");t&&n&&w(!0)}),0)})),onBlur:nS(o,(()=>w(!1))),onMouseOver:nS(a,(()=>k(!0))),onMouseOut:nS(i,(()=>k(!1))),...c})),l,f.createElement(KE,{isCompact:d,isHovered:x,isRotated:E,isCollapsible:m,onMouseOver:nS(a,(()=>k(!0))),onMouseOut:nS(i,(()=>k(!1)))},f.createElement(aS,null))))}));iS.displayName="Accordion.Header";const sS=iS,lS=p.forwardRef(((e,t)=>{const n=JE(),{isCompact:r,isCollapsible:o,expandedSections:a}=XE(),i=a.includes(n),{isHovered:s,otherTriggerProps:l}=(()=>{const e=p.useContext(ZE);if(void 0===e)throw new Error("This component must be rendered within a Accordion.Header component");return e})();return f.createElement(UE,Object.assign({ref:t,isCompact:r,isHovered:s,isExpanded:i,isCollapsible:o},l,e))}));lS.displayName="Accordion.Label";const cS=lS,uS=p.forwardRef(((e,t)=>{let{role:n,children:r,...o}=e;const{isAnimated:a,isBare:i,isCompact:s,expandedSections:l,getPanelProps:c}=XE(),u=JE(),d=l.includes(u);return f.createElement(zE,Object.assign({inert:d?void 0:"",isAnimated:a,isBare:i,isCompact:s,isExpanded:d},c({role:void 0===n?null:"region",ref:t,value:u,...o})),f.createElement(qE,{isAnimated:a},r))}));uS.displayName="Accordion.Panel";const dS=uS,pS=p.forwardRef(((e,t)=>{let{children:n,isBare:r,isCompact:o,isAnimated:a,isExpandable:i,isCollapsible:s,level:l,onChange:c,defaultExpandedSections:u,expandedSections:d,...m}=e;const{sections:h,sectionChildren:g}=p.useMemo((()=>p.Children.toArray(n).filter(p.isValidElement).map(((e,t)=>f.createElement(QE.Provider,{key:t,value:t},e))).reduce(((e,t,n)=>(e.sectionChildren.push(t),e.sections.push(n),e)),{sectionChildren:[],sections:[]})),[n]),{expandedSections:b,getHeaderProps:v,getTriggerProps:y,getPanelProps:w}=RE({sections:h,defaultExpandedSections:u,expandedSections:d,collapsible:s,expandable:i||!1,onChange:c}),x=p.useMemo((()=>({level:l,isBare:r,isCompact:o,isAnimated:a,isCollapsible:s,getPanelProps:w,getHeaderProps:v,getTriggerProps:y,expandedSections:b})),[l,r,o,a,s,w,v,y,b]);return f.createElement(YE.Provider,{value:x},f.createElement(ME,Object.assign({ref:t},m),g))}));pS.displayName="Accordion",pS.defaultProps={isAnimated:!0,isCollapsible:!0};const fS=pS;var mS;function hS(){return hS=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},hS.apply(this,arguments)}fS.Header=sS,fS.Label=cS,fS.Panel=dS,fS.Section=tS;var gS,bS,vS=function(e){return p.createElement("svg",hS({xmlns:"http://www.w3.org/2000/svg",width:16,height:16,viewBox:"0 0 16 16"},e),mS||(mS=p.createElement("g",{fill:"none",stroke:"currentColor"},p.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4 9l2.5 2.5 5-5"}),p.createElement("circle",{cx:7.5,cy:8.5,r:7}))))};function yS(){return yS=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},yS.apply(this,arguments)}var wS=function(e){return p.createElement("svg",yS({xmlns:"http://www.w3.org/2000/svg",width:16,height:16,viewBox:"0 0 16 16"},e),gS||(gS=p.createElement("rect",{width:15,height:11,x:.5,y:2.5,fill:"none",stroke:"currentColor",rx:.5,ry:.5})),bS||(bS=p.createElement("path",{fill:"currentColor",d:"M.5 5h15v2H.5z"})))};function xS(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(e){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return t.some((t=>(t&&t(e,...r),e&&e.defaultPrevented)))}}const kS="ArrowDown",ES="Enter",SS="Escape",CS=" ",OS="ArrowUp",PS=["auto","top","top-start","top-end","bottom","bottom-start","bottom-end","end","end-top","end-bottom","start","start-top","start-bottom"];function IS(e){switch(e){case"end":return"right";case"end-top":return"right-start";case"end-bottom":return"right-end";case"start":return"left";case"start-top":return"left-start";case"start-bottom":return"left-end";default:return e}}function _S(e){const t=Object.prototype.toString.call(e);return e instanceof Date||"object"==typeof e&&"[object Date]"===t?new e.constructor(+e):"number"==typeof e||"[object Number]"===t||"string"==typeof e||"[object String]"===t?new Date(e):new Date(NaN)}let TS={};function NS(){return TS}function jS(e,t){const n=NS(),r=t?.weekStartsOn??t?.locale?.options?.weekStartsOn??n.weekStartsOn??n.locale?.options?.weekStartsOn??0,o=_S(e),a=o.getDay(),i=(a<r?7:0)+a-r;return o.setDate(o.getDate()-i),o.setHours(0,0,0,0),o}function AS(e,t){const n=_S(e.start),r=_S(e.end);let o=+n>+r;const a=o?+n:+r,i=o?r:n;i.setHours(0,0,0,0);let s=t?.step??1;if(!s)return[];s<0&&(s=-s,o=!o);const l=[];for(;+i<=a;)l.push(_S(i)),i.setDate(i.getDate()+s),i.setHours(0,0,0,0);return o?l.reverse():l}function RS(e,t){return e instanceof Date?new e.constructor(t):new Date(t)}function LS(e,t){const n=_S(e);return isNaN(t)?RS(e,NaN):t?(n.setDate(n.getDate()+t),n):n}function MS(e){const t=_S(e);return t.setHours(0,0,0,0),t}function DS(e,t){return+MS(e)==+MS(t)}function zS(e){return DS(e,function(e){return RS(e,Date.now())}(e))}function FS(e,t){return+_S(e)<+_S(t)}const HS="datepickers.menu",$S=kn.div.attrs({"data-garden-id":HS,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledMenu",componentId:"sc-1npbkk0-0"})(["",";"],(e=>Kn(HS,e)));$S.defaultProps={theme:Wn};const BS=kn.div.attrs((e=>({className:e.isAnimated&&"is-animated"}))).withConfig({displayName:"StyledMenuWrapper",componentId:"sc-6fowoz-0"})(["",";",";"],(e=>{return zo((t=e.placement)?t.split("-")[0]:"bottom",{theme:e.theme,hidden:e.isHidden,margin:`${e.theme.space.base}px`,zIndex:e.zIndex,animationModifier:e.isAnimated?".is-animated":void 0});var t}),(e=>Kn("datepickers.menu_wrapper",e)));BS.defaultProps={theme:Wn};const VS="datepickers.datepicker",US=kn.div.attrs({"data-garden-id":VS}).withConfig({displayName:"StyledDatepicker",componentId:"sc-w3zqsp-0"})(["direction:",";"," background-color:",";color:",";",";"],(e=>e.theme.rtl&&"rtl"),(e=>{let{isCompact:t,theme:n}=e,r=5*n.space.base;return t&&(r=4*n.space.base),`margin: ${r}px;`}),(e=>No("background",600,e.theme)),(e=>No("foreground",600,e.theme)),(e=>Kn(VS,e)));US.defaultProps={theme:Wn};const WS="datepickers.header",qS=kn.div.attrs({"data-garden-id":WS}).withConfig({displayName:"StyledHeader",componentId:"sc-upq318-0"})(["display:flex;width:","px;",";"],(e=>e.isCompact?56*e.theme.space.base:70*e.theme.space.base),(e=>Kn(WS,e)));qS.defaultProps={theme:Wn};const GS="datepickers.header_paddle",KS=kn.div.attrs({"data-garden-id":GS}).withConfig({displayName:"StyledHeaderPaddle",componentId:"sc-2oqh0g-0"})(["display:flex;align-items:center;justify-content:center;transform:",";visibility:",";border-radius:50%;cursor:pointer;"," "," svg{width:",";height:",";}",";"],(e=>e.theme.rtl&&"rotate(180deg)"),(e=>e.isHidden&&"hidden"),(e=>{let{isCompact:t,theme:n}=e,r=10*n.space.base;return t&&(r=8*n.space.base),tn(["width:","px;height:","px;"],r,r)}),(e=>{let{theme:t}=e;return tn([":hover{background-color:",";color:",";}:active{background-color:",";color:",";}color:",";"],No("primaryHue",600,t,.08),No("foreground",600,t),No("primaryHue",600,t,.2),No("foreground",600,t),No("neutralHue",600,t))}),(e=>`${e.theme.iconSizes.md}`),(e=>`${e.theme.iconSizes.md}`),(e=>Kn(GS,e)));KS.defaultProps={theme:Wn};const YS="datepickers.header_label",XS=kn.div.attrs({"data-garden-id":YS}).withConfig({displayName:"StyledHeaderLabel",componentId:"sc-1ryf5ub-0"})(["display:flex;flex-grow:1;align-items:center;justify-content:center;font-size:",";font-weight:",";",";"],(e=>e.isCompact?e.theme.fontSizes.sm:e.theme.fontSizes.md),(e=>e.theme.fontWeights.semibold),(e=>Kn(YS,e)));XS.defaultProps={theme:Wn};const QS="datepickers.calendar",JS=kn.div.attrs({"data-garden-id":QS}).withConfig({displayName:"StyledCalendar",componentId:"sc-g5hoe8-0"})(["width:","px;",";"],(e=>e.isCompact?56*e.theme.space.base:70*e.theme.space.base),(e=>Kn(QS,e)));JS.defaultProps={theme:Wn};const ZS="datepickers.calendar_item",eC=kn.div.attrs({"data-garden-id":ZS}).withConfig({displayName:"StyledCalendarItem",componentId:"sc-143w8wb-0"})(["display:inline-block;position:relative;vertical-align:top;"," ",";"],(e=>{let t,{isCompact:n,theme:r}=e;return t=n?8*r.space.base+"px":10*r.space.base+"px",tn(["width:",";height:",";"],t,t)}),(e=>Kn(ZS,e)));eC.defaultProps={theme:Wn};const tC="datepickers.day_label",nC=kn.div.attrs({"data-garden-id":tC}).withConfig({displayName:"StyledDayLabel",componentId:"sc-9bh1p7-0"})(["display:flex;align-items:center;justify-content:center;width:100%;height:100%;font-size:",";font-weight:",";",";"],(e=>e.isCompact?e.theme.fontSizes.sm:e.theme.fontSizes.md),(e=>e.theme.fontWeights.semibold),(e=>Kn(tC,e)));nC.defaultProps={theme:Wn};const rC="datepickers.day",oC=kn.div.attrs((e=>({"data-garden-id":rC,"aria-disabled":e.isDisabled?"true":"false"}))).withConfig({displayName:"StyledDay",componentId:"sc-v42uk5-0"})(["display:flex;position:absolute;align-items:center;justify-content:center;border-radius:50%;cursor:",";width:100%;height:100%;font-size:",";font-weight:",";"," ",";"],(e=>e.isDisabled?"inherit":"pointer"),(e=>e.isCompact?e.theme.fontSizes.sm:e.theme.fontSizes.md),(e=>e.isToday&&!e.isDisabled?e.theme.fontWeights.semibold:"inherit"),(e=>{let{isSelected:t,isDisabled:n,isToday:r,isPreviousMonth:o,theme:a}=e,i="inherit",s=No("primaryHue",600,a);return t&&!n?(i=No("primaryHue",600,a),s=No("background",600,a)):n?s=No("neutralHue",400,a):r?s="inherit":o&&(s=No("neutralHue",600,a)),tn(["background-color:",";color:",";",""],i,s,!t&&!n&&`\n      :hover {\n        background-color: ${No("primaryHue",600,a,.08)};\n        color: ${No("primaryHue",800,a)};\n      }\n\n      :active {\n        background-color: ${No("primaryHue",600,a,.2)};\n        color: ${No("primaryHue",800,a)};\n      }\n  `)}),(e=>Kn(rC,e)));oC.defaultProps={theme:Wn};const aC=p.createContext(void 0),iC=()=>p.useContext(aC),sC={"ar-DZ":0,"ar-SA":0,"en-CA":0,"en-GB":1,"en-US":0,"fa-IR":0,"fr-CH":1,"nl-BE":1,"pt-BR":0,"zh-CN":1,"zh-TW":1},lC={af:0,ar:6,be:1,bg:1,bn:0,ca:1,cs:1,da:1,de:1,el:1,en:0,eo:1,es:1,et:1,fa:0,fi:1,fil:0,fr:1,gl:1,he:0,hr:1,hu:1,id:1,is:1,it:1,ja:1,ka:1,ko:0,lt:1,lv:1,mk:1,ms:1,nb:1,nl:1,nn:1,pl:1,pt:0,ro:1,ru:1,sk:1,sl:1,sr:1,sv:1,th:1,tr:1,ug:0,uk:1,vi:1,zh:1};var cC;function uC(){return uC=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},uC.apply(null,arguments)}var dC,pC=function(e){return p.createElement("svg",uC({xmlns:"http://www.w3.org/2000/svg",width:16,height:16,focusable:"false",viewBox:"0 0 16 16","aria-hidden":"true"},e),cC||(cC=p.createElement("path",{fill:"currentColor",d:"M10.39 12.688a.5.5 0 01-.718.69l-.062-.066-4-5a.5.5 0 01-.054-.542l.054-.082 4-5a.5.5 0 01.83.55l-.05.074L6.641 8l3.75 4.688z"})))};function fC(){return fC=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},fC.apply(null,arguments)}var mC=function(e){return p.createElement("svg",fC({xmlns:"http://www.w3.org/2000/svg",width:16,height:16,focusable:"false",viewBox:"0 0 16 16","aria-hidden":"true"},e),dC||(dC=p.createElement("path",{fill:"currentColor",d:"M5.61 3.312a.5.5 0 01.718-.69l.062.066 4 5a.5.5 0 01.054.542l-.054.082-4 5a.5.5 0 01-.83-.55l.05-.074L9.359 8l-3.75-4.688z"})))};const hC=e=>{let{locale:t,isCompact:n}=e;const{state:r,dispatch:o}=iC(),a=p.useCallback((e=>new Intl.DateTimeFormat(t,{month:"long",year:"numeric"}).format(e)),[t]);return f.createElement(qS,{isCompact:n},f.createElement(KS,{isCompact:n,onClick:()=>{o({type:"PREVIEW_PREVIOUS_MONTH"})}},f.createElement(pC,null)),f.createElement(XS,{isCompact:n},a(r.previewDate)),f.createElement(KS,{isCompact:n,onClick:()=>{o({type:"PREVIEW_NEXT_MONTH"})}},f.createElement(mC,null)))},gC=p.forwardRef(((e,t)=>{let{value:n,minValue:r,maxValue:o,isCompact:a,locale:i,weekStartsOn:s}=e;const{state:l,dispatch:c}=iC(),u=s||function(e){if(!e)return 0;for(const t in sC)if(e.startsWith(t))return sC[t];for(const t in lC)if(e.startsWith(t))return lC[t];return 0}(i),d=function(e){const t=_S(e);return t.setDate(1),t.setHours(0,0,0,0),t}(l.previewDate),m=function(e){const t=_S(e),n=t.getMonth();return t.setFullYear(t.getFullYear(),n+1,0),t.setHours(23,59,59,999),t}(d),h=jS(d,{weekStartsOn:u}),g=function(e,t){const n=NS(),r=t?.weekStartsOn??t?.locale?.options?.weekStartsOn??n.weekStartsOn??n.locale?.options?.weekStartsOn??0,o=_S(e),a=o.getDay(),i=6+(a<r?-7:0)-(a-r);return o.setDate(o.getDate()+i),o.setHours(23,59,59,999),o}(m,{weekStartsOn:u}),b=p.useCallback((e=>new Intl.DateTimeFormat(i,{weekday:"short"}).format(e)),[i]),v=AS({start:h,end:LS(h,6)}).map((e=>{const t=b(e);return f.createElement(eC,{key:`day-label-${t}`,isCompact:a},f.createElement(nC,{isCompact:a},t))})),y=AS({start:h,end:g}).map(((e,t)=>{const i=function(e){return _S(e).getDate()}(e),s=zS(e),u=!function(e,t){const n=_S(e),r=_S(t);return n.getFullYear()===r.getFullYear()&&n.getMonth()===r.getMonth()}(e,l.previewDate),d=n&&DS(e,n);let p=!1;return void 0!==r&&(p=FS(e,r)&&!DS(e,r)),void 0!==o&&(p=p||function(e,t){const n=_S(e),r=_S(t);return n.getTime()>r.getTime()}(e,o)&&!DS(e,o)),f.createElement(eC,{key:`day-${t}`,isCompact:a},f.createElement(oC,{isToday:s,isPreviousMonth:u,isSelected:d,isDisabled:p,isCompact:a,onClick:()=>{p||c({type:"SELECT_DATE",value:e})}},i))}));return f.createElement(US,{ref:t,isCompact:a,onMouseDown:e=>{e.preventDefault()}},f.createElement(hC,{locale:i,isCompact:a}),f.createElement(JS,{isCompact:a},v,y))}));function bC(e,t){const n=_S(e);if(isNaN(t))return RS(e,NaN);if(!t)return n;const r=n.getDate(),o=RS(e,n.getTime());o.setMonth(n.getMonth()+t+1,0);return r>=o.getDate()?o:(n.setFullYear(o.getFullYear(),o.getMonth(),r),n)}function vC(e){if(!(t=e,t instanceof Date||"object"==typeof t&&"[object Date]"===Object.prototype.toString.call(t)||"number"==typeof e))return!1;var t;const n=_S(e);return!isNaN(Number(n))}gC.displayName="Calendar";const yC={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function wC(e){return(t={})=>{const n=t.width?String(t.width):e.defaultWidth;return e.formats[n]||e.formats[e.defaultWidth]}}const xC={date:wC({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:wC({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:wC({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},kC={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function EC(e){return(t,n)=>{let r;if("formatting"===(n?.context?String(n.context):"standalone")&&e.formattingValues){const t=e.defaultFormattingWidth||e.defaultWidth,o=n?.width?String(n.width):t;r=e.formattingValues[o]||e.formattingValues[t]}else{const t=e.defaultWidth,o=n?.width?String(n.width):e.defaultWidth;r=e.values[o]||e.values[t]}return r[e.argumentCallback?e.argumentCallback(t):t]}}const SC={ordinalNumber:(e,t)=>{const n=Number(e),r=n%100;if(r>20||r<10)switch(r%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:EC({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:EC({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:e=>e-1}),month:EC({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:EC({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:EC({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})};function CC(e){return(t,n={})=>{const r=n.width,o=r&&e.matchPatterns[r]||e.matchPatterns[e.defaultMatchWidth],a=t.match(o);if(!a)return null;const i=a[0],s=r&&e.parsePatterns[r]||e.parsePatterns[e.defaultParseWidth],l=Array.isArray(s)?function(e,t){for(let n=0;n<e.length;n++)if(t(e[n]))return n;return}(s,(e=>e.test(i))):function(e,t){for(const n in e)if(Object.prototype.hasOwnProperty.call(e,n)&&t(e[n]))return n;return}(s,(e=>e.test(i)));let c;c=e.valueCallback?e.valueCallback(l):l,c=n.valueCallback?n.valueCallback(c):c;return{value:c,rest:t.slice(i.length)}}}const OC={ordinalNumber:(PC={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:e=>parseInt(e,10)},(e,t={})=>{const n=e.match(PC.matchPattern);if(!n)return null;const r=n[0],o=e.match(PC.parsePattern);if(!o)return null;let a=PC.valueCallback?PC.valueCallback(o[0]):o[0];return a=t.valueCallback?t.valueCallback(a):a,{value:a,rest:e.slice(r.length)}}),era:CC({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:CC({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:e=>e+1}),month:CC({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:CC({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:CC({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})};var PC;const IC={code:"en-US",formatDistance:(e,t,n)=>{let r;const o=yC[e];return r="string"==typeof o?o:1===t?o.one:o.other.replace("{{count}}",t.toString()),n?.addSuffix?n.comparison&&n.comparison>0?"in "+r:r+" ago":r},formatLong:xC,formatRelative:(e,t,n,r)=>kC[e],localize:SC,match:OC,options:{weekStartsOn:0,firstWeekContainsDate:1}},_C=(e,t)=>{switch(e){case"P":return t.date({width:"short"});case"PP":return t.date({width:"medium"});case"PPP":return t.date({width:"long"});default:return t.date({width:"full"})}},TC=(e,t)=>{switch(e){case"p":return t.time({width:"short"});case"pp":return t.time({width:"medium"});case"ppp":return t.time({width:"long"});default:return t.time({width:"full"})}},NC={p:TC,P:(e,t)=>{const n=e.match(/(P+)(p+)?/)||[],r=n[1],o=n[2];if(!o)return _C(e,t);let a;switch(r){case"P":a=t.dateTime({width:"short"});break;case"PP":a=t.dateTime({width:"medium"});break;case"PPP":a=t.dateTime({width:"long"});break;default:a=t.dateTime({width:"full"})}return a.replace("{{date}}",_C(r,t)).replace("{{time}}",TC(o,t))}},jC=/^D+$/,AC=/^Y+$/,RC=["D","DD","YY","YYYY"];function LC(e){return jC.test(e)}function MC(e){return AC.test(e)}function DC(e,t,n){const r=function(e,t,n){const r="Y"===e[0]?"years":"days of the month";return`Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`}(e,t,n);if(console.warn(r),RC.includes(e))throw new RangeError(r)}class zC{subPriority=0;validate(e,t){return!0}}class FC extends zC{constructor(e,t,n,r,o){super(),this.value=e,this.validateValue=t,this.setValue=n,this.priority=r,o&&(this.subPriority=o)}validate(e,t){return this.validateValue(e,this.value,t)}set(e,t,n){return this.setValue(e,t,this.value,n)}}class HC extends zC{priority=10;subPriority=-1;set(e,t){return t.timestampIsSet?e:RS(e,function(e,t){const n=t instanceof Date?RS(t,0):new t(0);return n.setFullYear(e.getFullYear(),e.getMonth(),e.getDate()),n.setHours(e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds()),n}(e,Date))}}class $C{run(e,t,n,r){const o=this.parse(e,t,n,r);return o?{setter:new FC(o.value,this.validate,this.set,this.priority,this.subPriority),rest:o.rest}:null}validate(e,t,n){return!0}}const BC=6048e5,VC=/^(1[0-2]|0?\d)/,UC=/^(3[0-1]|[0-2]?\d)/,WC=/^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/,qC=/^(5[0-3]|[0-4]?\d)/,GC=/^(2[0-3]|[0-1]?\d)/,KC=/^(2[0-4]|[0-1]?\d)/,YC=/^(1[0-1]|0?\d)/,XC=/^(1[0-2]|0?\d)/,QC=/^[0-5]?\d/,JC=/^[0-5]?\d/,ZC=/^\d/,eO=/^\d{1,2}/,tO=/^\d{1,3}/,nO=/^\d{1,4}/,rO=/^-?\d+/,oO=/^-?\d/,aO=/^-?\d{1,2}/,iO=/^-?\d{1,3}/,sO=/^-?\d{1,4}/,lO=/^([+-])(\d{2})(\d{2})?|Z/,cO=/^([+-])(\d{2})(\d{2})|Z/,uO=/^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,dO=/^([+-])(\d{2}):(\d{2})|Z/,pO=/^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/;function fO(e,t){return e?{value:t(e.value),rest:e.rest}:e}function mO(e,t){const n=t.match(e);return n?{value:parseInt(n[0],10),rest:t.slice(n[0].length)}:null}function hO(e,t){const n=t.match(e);if(!n)return null;if("Z"===n[0])return{value:0,rest:t.slice(1)};return{value:("+"===n[1]?1:-1)*(36e5*(n[2]?parseInt(n[2],10):0)+6e4*(n[3]?parseInt(n[3],10):0)+1e3*(n[5]?parseInt(n[5],10):0)),rest:t.slice(n[0].length)}}function gO(e){return mO(rO,e)}function bO(e,t){switch(e){case 1:return mO(ZC,t);case 2:return mO(eO,t);case 3:return mO(tO,t);case 4:return mO(nO,t);default:return mO(new RegExp("^\\d{1,"+e+"}"),t)}}function vO(e,t){switch(e){case 1:return mO(oO,t);case 2:return mO(aO,t);case 3:return mO(iO,t);case 4:return mO(sO,t);default:return mO(new RegExp("^-?\\d{1,"+e+"}"),t)}}function yO(e){switch(e){case"morning":return 4;case"evening":return 17;case"pm":case"noon":case"afternoon":return 12;default:return 0}}function wO(e,t){const n=t>0,r=n?t:1-t;let o;if(r<=50)o=e||100;else{const t=r+50;o=e+100*Math.trunc(t/100)-(e>=t%100?100:0)}return n?o:1-o}function xO(e){return e%400==0||e%4==0&&e%100!=0}function kO(e,t){const n=_S(e),r=n.getFullYear(),o=NS(),a=t?.firstWeekContainsDate??t?.locale?.options?.firstWeekContainsDate??o.firstWeekContainsDate??o.locale?.options?.firstWeekContainsDate??1,i=RS(e,0);i.setFullYear(r+1,0,a),i.setHours(0,0,0,0);const s=jS(i,t),l=RS(e,0);l.setFullYear(r,0,a),l.setHours(0,0,0,0);const c=jS(l,t);return n.getTime()>=s.getTime()?r+1:n.getTime()>=c.getTime()?r:r-1}function EO(e){return jS(e,{weekStartsOn:1})}function SO(e,t){const n=_S(e),r=+jS(n,t)-+function(e,t){const n=NS(),r=t?.firstWeekContainsDate??t?.locale?.options?.firstWeekContainsDate??n.firstWeekContainsDate??n.locale?.options?.firstWeekContainsDate??1,o=kO(e,t),a=RS(e,0);return a.setFullYear(o,0,r),a.setHours(0,0,0,0),jS(a,t)}(n,t);return Math.round(r/BC)+1}function CO(e){const t=function(e){const t=_S(e),n=t.getFullYear(),r=RS(e,0);r.setFullYear(n+1,0,4),r.setHours(0,0,0,0);const o=EO(r),a=RS(e,0);a.setFullYear(n,0,4),a.setHours(0,0,0,0);const i=EO(a);return t.getTime()>=o.getTime()?n+1:t.getTime()>=i.getTime()?n:n-1}(e),n=RS(e,0);return n.setFullYear(t,0,4),n.setHours(0,0,0,0),EO(n)}function OO(e,t){const n=_S(e),r=function(e){const t=_S(e),n=+EO(t)-+CO(t);return Math.round(n/BC)+1}(n)-t;return n.setDate(n.getDate()-7*r),n}const PO=[31,28,31,30,31,30,31,31,30,31,30,31],IO=[31,29,31,30,31,30,31,31,30,31,30,31];function _O(e,t,n){const r=NS(),o=n?.weekStartsOn??n?.locale?.options?.weekStartsOn??r.weekStartsOn??r.locale?.options?.weekStartsOn??0,a=_S(e),i=a.getDay(),s=7-o;return LS(a,t<0||t>6?t-(i+s)%7:((t%7+7)%7+s)%7-(i+s)%7)}function TO(e,t){const n=_S(e),r=function(e){let t=_S(e).getDay();return 0===t&&(t=7),t}(n);return LS(n,t-r)}function NO(e){const t=_S(e),n=new Date(Date.UTC(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds(),t.getMilliseconds()));return n.setUTCFullYear(t.getFullYear()),+e-+n}const jO={G:new class extends $C{priority=140;parse(e,t,n){switch(t){case"G":case"GG":case"GGG":return n.era(e,{width:"abbreviated"})||n.era(e,{width:"narrow"});case"GGGGG":return n.era(e,{width:"narrow"});default:return n.era(e,{width:"wide"})||n.era(e,{width:"abbreviated"})||n.era(e,{width:"narrow"})}}set(e,t,n){return t.era=n,e.setFullYear(n,0,1),e.setHours(0,0,0,0),e}incompatibleTokens=["R","u","t","T"]},y:new class extends $C{priority=130;incompatibleTokens=["Y","R","u","w","I","i","e","c","t","T"];parse(e,t,n){const r=e=>({year:e,isTwoDigitYear:"yy"===t});switch(t){case"y":return fO(bO(4,e),r);case"yo":return fO(n.ordinalNumber(e,{unit:"year"}),r);default:return fO(bO(t.length,e),r)}}validate(e,t){return t.isTwoDigitYear||t.year>0}set(e,t,n){const r=e.getFullYear();if(n.isTwoDigitYear){const t=wO(n.year,r);return e.setFullYear(t,0,1),e.setHours(0,0,0,0),e}const o="era"in t&&1!==t.era?1-n.year:n.year;return e.setFullYear(o,0,1),e.setHours(0,0,0,0),e}},Y:new class extends $C{priority=130;parse(e,t,n){const r=e=>({year:e,isTwoDigitYear:"YY"===t});switch(t){case"Y":return fO(bO(4,e),r);case"Yo":return fO(n.ordinalNumber(e,{unit:"year"}),r);default:return fO(bO(t.length,e),r)}}validate(e,t){return t.isTwoDigitYear||t.year>0}set(e,t,n,r){const o=kO(e,r);if(n.isTwoDigitYear){const t=wO(n.year,o);return e.setFullYear(t,0,r.firstWeekContainsDate),e.setHours(0,0,0,0),jS(e,r)}const a="era"in t&&1!==t.era?1-n.year:n.year;return e.setFullYear(a,0,r.firstWeekContainsDate),e.setHours(0,0,0,0),jS(e,r)}incompatibleTokens=["y","R","u","Q","q","M","L","I","d","D","i","t","T"]},R:new class extends $C{priority=130;parse(e,t){return vO("R"===t?4:t.length,e)}set(e,t,n){const r=RS(e,0);return r.setFullYear(n,0,4),r.setHours(0,0,0,0),EO(r)}incompatibleTokens=["G","y","Y","u","Q","q","M","L","w","d","D","e","c","t","T"]},u:new class extends $C{priority=130;parse(e,t){return vO("u"===t?4:t.length,e)}set(e,t,n){return e.setFullYear(n,0,1),e.setHours(0,0,0,0),e}incompatibleTokens=["G","y","Y","R","w","I","i","e","c","t","T"]},Q:new class extends $C{priority=120;parse(e,t,n){switch(t){case"Q":case"QQ":return bO(t.length,e);case"Qo":return n.ordinalNumber(e,{unit:"quarter"});case"QQQ":return n.quarter(e,{width:"abbreviated",context:"formatting"})||n.quarter(e,{width:"narrow",context:"formatting"});case"QQQQQ":return n.quarter(e,{width:"narrow",context:"formatting"});default:return n.quarter(e,{width:"wide",context:"formatting"})||n.quarter(e,{width:"abbreviated",context:"formatting"})||n.quarter(e,{width:"narrow",context:"formatting"})}}validate(e,t){return t>=1&&t<=4}set(e,t,n){return e.setMonth(3*(n-1),1),e.setHours(0,0,0,0),e}incompatibleTokens=["Y","R","q","M","L","w","I","d","D","i","e","c","t","T"]},q:new class extends $C{priority=120;parse(e,t,n){switch(t){case"q":case"qq":return bO(t.length,e);case"qo":return n.ordinalNumber(e,{unit:"quarter"});case"qqq":return n.quarter(e,{width:"abbreviated",context:"standalone"})||n.quarter(e,{width:"narrow",context:"standalone"});case"qqqqq":return n.quarter(e,{width:"narrow",context:"standalone"});default:return n.quarter(e,{width:"wide",context:"standalone"})||n.quarter(e,{width:"abbreviated",context:"standalone"})||n.quarter(e,{width:"narrow",context:"standalone"})}}validate(e,t){return t>=1&&t<=4}set(e,t,n){return e.setMonth(3*(n-1),1),e.setHours(0,0,0,0),e}incompatibleTokens=["Y","R","Q","M","L","w","I","d","D","i","e","c","t","T"]},M:new class extends $C{incompatibleTokens=["Y","R","q","Q","L","w","I","D","i","e","c","t","T"];priority=110;parse(e,t,n){const r=e=>e-1;switch(t){case"M":return fO(mO(VC,e),r);case"MM":return fO(bO(2,e),r);case"Mo":return fO(n.ordinalNumber(e,{unit:"month"}),r);case"MMM":return n.month(e,{width:"abbreviated",context:"formatting"})||n.month(e,{width:"narrow",context:"formatting"});case"MMMMM":return n.month(e,{width:"narrow",context:"formatting"});default:return n.month(e,{width:"wide",context:"formatting"})||n.month(e,{width:"abbreviated",context:"formatting"})||n.month(e,{width:"narrow",context:"formatting"})}}validate(e,t){return t>=0&&t<=11}set(e,t,n){return e.setMonth(n,1),e.setHours(0,0,0,0),e}},L:new class extends $C{priority=110;parse(e,t,n){const r=e=>e-1;switch(t){case"L":return fO(mO(VC,e),r);case"LL":return fO(bO(2,e),r);case"Lo":return fO(n.ordinalNumber(e,{unit:"month"}),r);case"LLL":return n.month(e,{width:"abbreviated",context:"standalone"})||n.month(e,{width:"narrow",context:"standalone"});case"LLLLL":return n.month(e,{width:"narrow",context:"standalone"});default:return n.month(e,{width:"wide",context:"standalone"})||n.month(e,{width:"abbreviated",context:"standalone"})||n.month(e,{width:"narrow",context:"standalone"})}}validate(e,t){return t>=0&&t<=11}set(e,t,n){return e.setMonth(n,1),e.setHours(0,0,0,0),e}incompatibleTokens=["Y","R","q","Q","M","w","I","D","i","e","c","t","T"]},w:new class extends $C{priority=100;parse(e,t,n){switch(t){case"w":return mO(qC,e);case"wo":return n.ordinalNumber(e,{unit:"week"});default:return bO(t.length,e)}}validate(e,t){return t>=1&&t<=53}set(e,t,n,r){return jS(function(e,t,n){const r=_S(e),o=SO(r,n)-t;return r.setDate(r.getDate()-7*o),r}(e,n,r),r)}incompatibleTokens=["y","R","u","q","Q","M","L","I","d","D","i","t","T"]},I:new class extends $C{priority=100;parse(e,t,n){switch(t){case"I":return mO(qC,e);case"Io":return n.ordinalNumber(e,{unit:"week"});default:return bO(t.length,e)}}validate(e,t){return t>=1&&t<=53}set(e,t,n){return EO(OO(e,n))}incompatibleTokens=["y","Y","u","q","Q","M","L","w","d","D","e","c","t","T"]},d:new class extends $C{priority=90;subPriority=1;parse(e,t,n){switch(t){case"d":return mO(UC,e);case"do":return n.ordinalNumber(e,{unit:"date"});default:return bO(t.length,e)}}validate(e,t){const n=xO(e.getFullYear()),r=e.getMonth();return n?t>=1&&t<=IO[r]:t>=1&&t<=PO[r]}set(e,t,n){return e.setDate(n),e.setHours(0,0,0,0),e}incompatibleTokens=["Y","R","q","Q","w","I","D","i","e","c","t","T"]},D:new class extends $C{priority=90;subpriority=1;parse(e,t,n){switch(t){case"D":case"DD":return mO(WC,e);case"Do":return n.ordinalNumber(e,{unit:"date"});default:return bO(t.length,e)}}validate(e,t){return xO(e.getFullYear())?t>=1&&t<=366:t>=1&&t<=365}set(e,t,n){return e.setMonth(0,n),e.setHours(0,0,0,0),e}incompatibleTokens=["Y","R","q","Q","M","L","w","I","d","E","i","e","c","t","T"]},E:new class extends $C{priority=90;parse(e,t,n){switch(t){case"E":case"EE":case"EEE":return n.day(e,{width:"abbreviated",context:"formatting"})||n.day(e,{width:"short",context:"formatting"})||n.day(e,{width:"narrow",context:"formatting"});case"EEEEE":return n.day(e,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(e,{width:"short",context:"formatting"})||n.day(e,{width:"narrow",context:"formatting"});default:return n.day(e,{width:"wide",context:"formatting"})||n.day(e,{width:"abbreviated",context:"formatting"})||n.day(e,{width:"short",context:"formatting"})||n.day(e,{width:"narrow",context:"formatting"})}}validate(e,t){return t>=0&&t<=6}set(e,t,n,r){return(e=_O(e,n,r)).setHours(0,0,0,0),e}incompatibleTokens=["D","i","e","c","t","T"]},e:new class extends $C{priority=90;parse(e,t,n,r){const o=e=>{const t=7*Math.floor((e-1)/7);return(e+r.weekStartsOn+6)%7+t};switch(t){case"e":case"ee":return fO(bO(t.length,e),o);case"eo":return fO(n.ordinalNumber(e,{unit:"day"}),o);case"eee":return n.day(e,{width:"abbreviated",context:"formatting"})||n.day(e,{width:"short",context:"formatting"})||n.day(e,{width:"narrow",context:"formatting"});case"eeeee":return n.day(e,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(e,{width:"short",context:"formatting"})||n.day(e,{width:"narrow",context:"formatting"});default:return n.day(e,{width:"wide",context:"formatting"})||n.day(e,{width:"abbreviated",context:"formatting"})||n.day(e,{width:"short",context:"formatting"})||n.day(e,{width:"narrow",context:"formatting"})}}validate(e,t){return t>=0&&t<=6}set(e,t,n,r){return(e=_O(e,n,r)).setHours(0,0,0,0),e}incompatibleTokens=["y","R","u","q","Q","M","L","I","d","D","E","i","c","t","T"]},c:new class extends $C{priority=90;parse(e,t,n,r){const o=e=>{const t=7*Math.floor((e-1)/7);return(e+r.weekStartsOn+6)%7+t};switch(t){case"c":case"cc":return fO(bO(t.length,e),o);case"co":return fO(n.ordinalNumber(e,{unit:"day"}),o);case"ccc":return n.day(e,{width:"abbreviated",context:"standalone"})||n.day(e,{width:"short",context:"standalone"})||n.day(e,{width:"narrow",context:"standalone"});case"ccccc":return n.day(e,{width:"narrow",context:"standalone"});case"cccccc":return n.day(e,{width:"short",context:"standalone"})||n.day(e,{width:"narrow",context:"standalone"});default:return n.day(e,{width:"wide",context:"standalone"})||n.day(e,{width:"abbreviated",context:"standalone"})||n.day(e,{width:"short",context:"standalone"})||n.day(e,{width:"narrow",context:"standalone"})}}validate(e,t){return t>=0&&t<=6}set(e,t,n,r){return(e=_O(e,n,r)).setHours(0,0,0,0),e}incompatibleTokens=["y","R","u","q","Q","M","L","I","d","D","E","i","e","t","T"]},i:new class extends $C{priority=90;parse(e,t,n){const r=e=>0===e?7:e;switch(t){case"i":case"ii":return bO(t.length,e);case"io":return n.ordinalNumber(e,{unit:"day"});case"iii":return fO(n.day(e,{width:"abbreviated",context:"formatting"})||n.day(e,{width:"short",context:"formatting"})||n.day(e,{width:"narrow",context:"formatting"}),r);case"iiiii":return fO(n.day(e,{width:"narrow",context:"formatting"}),r);case"iiiiii":return fO(n.day(e,{width:"short",context:"formatting"})||n.day(e,{width:"narrow",context:"formatting"}),r);default:return fO(n.day(e,{width:"wide",context:"formatting"})||n.day(e,{width:"abbreviated",context:"formatting"})||n.day(e,{width:"short",context:"formatting"})||n.day(e,{width:"narrow",context:"formatting"}),r)}}validate(e,t){return t>=1&&t<=7}set(e,t,n){return(e=TO(e,n)).setHours(0,0,0,0),e}incompatibleTokens=["y","Y","u","q","Q","M","L","w","d","D","E","e","c","t","T"]},a:new class extends $C{priority=80;parse(e,t,n){switch(t){case"a":case"aa":case"aaa":return n.dayPeriod(e,{width:"abbreviated",context:"formatting"})||n.dayPeriod(e,{width:"narrow",context:"formatting"});case"aaaaa":return n.dayPeriod(e,{width:"narrow",context:"formatting"});default:return n.dayPeriod(e,{width:"wide",context:"formatting"})||n.dayPeriod(e,{width:"abbreviated",context:"formatting"})||n.dayPeriod(e,{width:"narrow",context:"formatting"})}}set(e,t,n){return e.setHours(yO(n),0,0,0),e}incompatibleTokens=["b","B","H","k","t","T"]},b:new class extends $C{priority=80;parse(e,t,n){switch(t){case"b":case"bb":case"bbb":return n.dayPeriod(e,{width:"abbreviated",context:"formatting"})||n.dayPeriod(e,{width:"narrow",context:"formatting"});case"bbbbb":return n.dayPeriod(e,{width:"narrow",context:"formatting"});default:return n.dayPeriod(e,{width:"wide",context:"formatting"})||n.dayPeriod(e,{width:"abbreviated",context:"formatting"})||n.dayPeriod(e,{width:"narrow",context:"formatting"})}}set(e,t,n){return e.setHours(yO(n),0,0,0),e}incompatibleTokens=["a","B","H","k","t","T"]},B:new class extends $C{priority=80;parse(e,t,n){switch(t){case"B":case"BB":case"BBB":return n.dayPeriod(e,{width:"abbreviated",context:"formatting"})||n.dayPeriod(e,{width:"narrow",context:"formatting"});case"BBBBB":return n.dayPeriod(e,{width:"narrow",context:"formatting"});default:return n.dayPeriod(e,{width:"wide",context:"formatting"})||n.dayPeriod(e,{width:"abbreviated",context:"formatting"})||n.dayPeriod(e,{width:"narrow",context:"formatting"})}}set(e,t,n){return e.setHours(yO(n),0,0,0),e}incompatibleTokens=["a","b","t","T"]},h:new class extends $C{priority=70;parse(e,t,n){switch(t){case"h":return mO(XC,e);case"ho":return n.ordinalNumber(e,{unit:"hour"});default:return bO(t.length,e)}}validate(e,t){return t>=1&&t<=12}set(e,t,n){const r=e.getHours()>=12;return r&&n<12?e.setHours(n+12,0,0,0):r||12!==n?e.setHours(n,0,0,0):e.setHours(0,0,0,0),e}incompatibleTokens=["H","K","k","t","T"]},H:new class extends $C{priority=70;parse(e,t,n){switch(t){case"H":return mO(GC,e);case"Ho":return n.ordinalNumber(e,{unit:"hour"});default:return bO(t.length,e)}}validate(e,t){return t>=0&&t<=23}set(e,t,n){return e.setHours(n,0,0,0),e}incompatibleTokens=["a","b","h","K","k","t","T"]},K:new class extends $C{priority=70;parse(e,t,n){switch(t){case"K":return mO(YC,e);case"Ko":return n.ordinalNumber(e,{unit:"hour"});default:return bO(t.length,e)}}validate(e,t){return t>=0&&t<=11}set(e,t,n){return e.getHours()>=12&&n<12?e.setHours(n+12,0,0,0):e.setHours(n,0,0,0),e}incompatibleTokens=["h","H","k","t","T"]},k:new class extends $C{priority=70;parse(e,t,n){switch(t){case"k":return mO(KC,e);case"ko":return n.ordinalNumber(e,{unit:"hour"});default:return bO(t.length,e)}}validate(e,t){return t>=1&&t<=24}set(e,t,n){const r=n<=24?n%24:n;return e.setHours(r,0,0,0),e}incompatibleTokens=["a","b","h","H","K","t","T"]},m:new class extends $C{priority=60;parse(e,t,n){switch(t){case"m":return mO(QC,e);case"mo":return n.ordinalNumber(e,{unit:"minute"});default:return bO(t.length,e)}}validate(e,t){return t>=0&&t<=59}set(e,t,n){return e.setMinutes(n,0,0),e}incompatibleTokens=["t","T"]},s:new class extends $C{priority=50;parse(e,t,n){switch(t){case"s":return mO(JC,e);case"so":return n.ordinalNumber(e,{unit:"second"});default:return bO(t.length,e)}}validate(e,t){return t>=0&&t<=59}set(e,t,n){return e.setSeconds(n,0),e}incompatibleTokens=["t","T"]},S:new class extends $C{priority=30;parse(e,t){return fO(bO(t.length,e),(e=>Math.trunc(e*Math.pow(10,3-t.length))))}set(e,t,n){return e.setMilliseconds(n),e}incompatibleTokens=["t","T"]},X:new class extends $C{priority=10;parse(e,t){switch(t){case"X":return hO(lO,e);case"XX":return hO(cO,e);case"XXXX":return hO(uO,e);case"XXXXX":return hO(pO,e);default:return hO(dO,e)}}set(e,t,n){return t.timestampIsSet?e:RS(e,e.getTime()-NO(e)-n)}incompatibleTokens=["t","T","x"]},x:new class extends $C{priority=10;parse(e,t){switch(t){case"x":return hO(lO,e);case"xx":return hO(cO,e);case"xxxx":return hO(uO,e);case"xxxxx":return hO(pO,e);default:return hO(dO,e)}}set(e,t,n){return t.timestampIsSet?e:RS(e,e.getTime()-NO(e)-n)}incompatibleTokens=["t","T","X"]},t:new class extends $C{priority=40;parse(e){return gO(e)}set(e,t,n){return[RS(e,1e3*n),{timestampIsSet:!0}]}incompatibleTokens="*"},T:new class extends $C{priority=20;parse(e){return gO(e)}set(e,t,n){return[RS(e,n),{timestampIsSet:!0}]}incompatibleTokens="*"}},AO=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,RO=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,LO=/^'([^]*?)'?$/,MO=/''/g,DO=/\S/,zO=/[a-zA-Z]/;function FO(e,t,n,r){const o=Object.assign({},NS()),a=r?.locale??o.locale??IC,i=r?.firstWeekContainsDate??r?.locale?.options?.firstWeekContainsDate??o.firstWeekContainsDate??o.locale?.options?.firstWeekContainsDate??1,s=r?.weekStartsOn??r?.locale?.options?.weekStartsOn??o.weekStartsOn??o.locale?.options?.weekStartsOn??0;if(""===t)return""===e?_S(n):RS(n,NaN);const l={firstWeekContainsDate:i,weekStartsOn:s,locale:a},c=[new HC],u=t.match(RO).map((e=>{const t=e[0];if(t in NC){return(0,NC[t])(e,a.formatLong)}return e})).join("").match(AO),d=[];for(let o of u){!r?.useAdditionalWeekYearTokens&&MC(o)&&DC(o,t,e),!r?.useAdditionalDayOfYearTokens&&LC(o)&&DC(o,t,e);const i=o[0],s=jO[i];if(s){const{incompatibleTokens:t}=s;if(Array.isArray(t)){const e=d.find((e=>t.includes(e.token)||e.token===i));if(e)throw new RangeError(`The format string mustn't contain \`${e.fullToken}\` and \`${o}\` at the same time`)}else if("*"===s.incompatibleTokens&&d.length>0)throw new RangeError(`The format string mustn't contain \`${o}\` and any other token at the same time`);d.push({token:i,fullToken:o});const r=s.run(e,o,a.match,l);if(!r)return RS(n,NaN);c.push(r.setter),e=r.rest}else{if(i.match(zO))throw new RangeError("Format string contains an unescaped latin alphabet character `"+i+"`");if("''"===o?o="'":"'"===i&&(o=o.match(LO)[1].replace(MO,"'")),0!==e.indexOf(o))return RS(n,NaN);e=e.slice(o.length)}}if(e.length>0&&DO.test(e))return RS(n,NaN);const p=c.map((e=>e.priority)).sort(((e,t)=>t-e)).filter(((e,t,n)=>n.indexOf(e)===t)).map((e=>c.filter((t=>t.priority===e)).sort(((e,t)=>t.subPriority-e.subPriority)))).map((e=>e[0]));let f=_S(n);if(isNaN(f.getTime()))return RS(n,NaN);const m={};for(const e of p){if(!e.validate(f,l))return RS(n,NaN);const t=e.set(f,m,l);Array.isArray(t)?(f=t[0],Object.assign(m,t[1])):f=t}return RS(n,f)}function HO(e){let{date:t,locale:n,formatDate:r}=e;return t?r?r(t):new Intl.DateTimeFormat(n,{month:"long",day:"numeric",year:"numeric"}).format(t):""}const $O=e=>{let{value:t,formatDate:n,locale:r,customParseDate:o,onChange:a}=e;return(e,i)=>{switch(i.type){case"OPEN":return{...e,isOpen:!0,previewDate:t||new Date};case"CLOSE":{const o=HO({date:t,locale:r,formatDate:n});return{...e,isOpen:!1,inputValue:o}}case"PREVIEW_NEXT_MONTH":{const t=bC(e.previewDate,1);return{...e,previewDate:t}}case"PREVIEW_PREVIOUS_MONTH":{const t=bC(e.previewDate,-1);return{...e,previewDate:t}}case"MANUALLY_UPDATE_INPUT":{const n=i.value,r=function(e){let{inputValue:t,customParseDate:n}=e;if(n)return n(t);const r=new Date(1001,0,0);let o=FO(t,"P",new Date);return vC(o)&&!FS(o,r)?o:(o=FO(t,"PP",new Date),vC(o)&&!FS(o,r)?o:(o=FO(t,"PPP",new Date),vC(o)&&!FS(o,r)?o:new Date(NaN)))}({inputValue:n,customParseDate:o});return a&&r&&vC(r)&&!DS(t,r)&&a(r),{...e,isOpen:!0,inputValue:n}}case"CONTROLLED_VALUE_CHANGE":{const t=i.value||new Date,o=HO({date:i.value,locale:r,formatDate:n});return{...e,previewDate:t,inputValue:o}}case"CONTROLLED_LOCALE_CHANGE":{const o=HO({date:t,locale:r,formatDate:n});return{...e,inputValue:o}}case"SELECT_DATE":{const o=HO({date:i.value,locale:r,formatDate:n});return a&&i.value&&vC(i.value)&&!DS(t,i.value)&&a(i.value),{...e,isOpen:!1,inputValue:o}}default:throw new Error}}};const BO=p.forwardRef(((e,t)=>{const{children:n,placement:r,popperModifiers:o,eventsEnabled:a,zIndex:i,isAnimated:s,refKey:l,value:c,isCompact:u,onChange:d,formatDate:m,minValue:h,maxValue:g,locale:b,weekStartsOn:v,customParseDate:y,...w}=e,x=p.useContext(pn),k=p.useCallback($O({value:c,formatDate:m,locale:b,customParseDate:y,onChange:d}),[c,m,b,d,y]),[E,S]=p.useReducer(k,function(e){let t=e.value;void 0!==t&&vC(t)||(t=new Date);let n="";return void 0!==e.value&&(n=e.formatDate?e.formatDate(e.value):new Intl.DateTimeFormat(e.locale,{month:"long",day:"numeric",year:"numeric"}).format(t)),{isOpen:!1,previewDate:t,inputValue:n}}(e)),C=p.useRef(void 0),O=p.useRef(null),P=p.useRef(!1);p.useEffect((()=>{E.isOpen&&C.current&&C.current()}));const[I,_]=p.useState(E.isOpen);p.useEffect((()=>{let e;return E.isOpen?_(!0):s?e=setTimeout((()=>_(!1)),200):_(!1),()=>clearTimeout(e)}),[E.isOpen,s]),p.useEffect((()=>{S({type:"CONTROLLED_VALUE_CHANGE",value:c})}),[c]),p.useEffect((()=>{S({type:"CONTROLLED_LOCALE_CHANGE"})}),[b]);const T=x.rtl?function(e){const t=IS(e);switch(t){case"left":return"right";case"left-start":return"right-start";case"left-end":return"right-end";case"top-start":return"top-end";case"top-end":return"top-start";case"right":return"left";case"right-start":return"left-start";case"right-end":return"left-end";case"bottom-start":return"bottom-end";case"bottom-end":return"bottom-start";default:return t}}(r):IS(r),N=p.useMemo((()=>({state:E,dispatch:S})),[E,S]);return f.createElement(aC.Provider,{value:N},f.createElement($v,null,f.createElement(Xv,null,(e=>{let{ref:t}=e;const r=f.Children.only(n);return f.cloneElement(r,{[l]:e=>{t(e),O.current=e},onMouseDown:xS(r.props.onMouseDown,(()=>{P.current=!0})),onMouseUp:xS(r.props.onMouseUp,(()=>{setTimeout((()=>{P.current=!1}),0)})),onClick:xS(r.props.onClick,(()=>{P.current&&!E.isOpen&&S({type:"OPEN"})})),onBlur:xS(r.props.onBlur,(()=>{S({type:"CLOSE"})})),onChange:xS(r.props.onChange,(e=>{S({type:"MANUALLY_UPDATE_INPUT",value:e.target.value})})),onKeyDown:xS(r.props.onKeyDown,(e=>{switch(e.key){case SS:case ES:S({type:"CLOSE"});break;case OS:case kS:case CS:S({type:"OPEN"})}})),autoComplete:"off",value:E.inputValue})})),f.createElement(Kv,{placement:T,modifiers:o,eventsEnabled:E.isOpen&&a},(e=>{let{ref:n,style:r,scheduleUpdate:o,placement:a}=e;return C.current=o,f.createElement(BS,{ref:n,style:r,isHidden:!E.isOpen,isAnimated:s&&(E.isOpen||I),placement:a,zIndex:i},(E.isOpen||I)&&f.createElement($S,w,f.createElement(gC,{ref:t,isCompact:u,value:c,minValue:h,maxValue:g,locale:b,weekStartsOn:v})))}))))}));var VO;function UO(){return UO=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},UO.apply(this,arguments)}BO.displayName="Datepicker",BO.propTypes={value:Cn.any,onChange:Cn.any,formatDate:Cn.func,locale:Cn.any,weekStartsOn:Cn.oneOf([0,1,2,3,4,5,6]),minValue:Cn.any,maxValue:Cn.any,isCompact:Cn.bool,customParseDate:Cn.any,refKey:Cn.string,placement:Cn.oneOf(PS),popperModifiers:Cn.any,isAnimated:Cn.bool,eventsEnabled:Cn.bool,zIndex:Cn.number},BO.defaultProps={placement:"bottom-start",refKey:"ref",isAnimated:!0,eventsEnabled:!0,zIndex:1e3,locale:"en-US"};var WO=function(e){return p.createElement("svg",UO({xmlns:"http://www.w3.org/2000/svg",width:16,height:16,viewBox:"0 0 16 16"},e),VO||(VO=p.createElement("path",{fill:"currentColor",d:"M6 9a1 1 0 011 1v5a1 1 0 01-1 1H1a1 1 0 01-1-1v-5a1 1 0 011-1h5zm6.25-.5a3.75 3.75 0 110 7.5 3.75 3.75 0 010-7.5zM8.857.486l3 5A1 1 0 0111 7H5a1 1 0 01-.857-1.514l3-5a1 1 0 011.714 0z"})))};const qO=["start","end","center","baseline","stretch"],GO=["auto",...qO],KO=["start","end","center","between","around"],YO=["start","end","center","justify"],XO=["nowrap","wrap","wrap-reverse"],QO="grid.col",JO=(e,t,n,r,o,a)=>{const i=r&&`${ur(`${r} / ${a.columns} * 100`)}%`;let s,l,c,u,d,p;return"boolean"==typeof e?(s=0,l=1,c="100%"):"auto"===e?(s="auto",l=0,c="100%",u="auto"):void 0!==e&&(s=`${ur(`${e} / ${a.columns} * 100`)}%`,l=0,c=s),d="start"===n?a.theme.rtl?"right":"left":"end"===n?a.theme.rtl?"left":"right":n,p="first"===o?-1:"last"===o?ur(`${a.columns} + 1`):o,tn(["flex-basis:",";flex-grow:",";flex-shrink:",";align-self:",";order:",";margin-",":",";width:",";max-width:",";text-align:",";"],s,l,e&&0,"start"===t||"end"===t?`flex-${t}`:t,p,a.theme.rtl?"right":"left",i,u,c,d)},ZO=(e,t,n,r,o,a,i)=>tn(["@media (min-width:","){",";}"],e,JO(t,n,r,o,a,i)),eP=kn.div.attrs({"data-garden-id":QO,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledCol",componentId:"sc-inuw62-0"})(["box-sizing:border-box;width:100%;",";",";",";",";",";",";",";",";",";"],(e=>JO(!e.sizeAll&&(e.xs||e.sm||e.md||e.lg||e.xl)?void 0:e.sizeAll||!1,e.alignSelf,e.textAlign,e.offset,e.order,e)),(e=>(e=>{const t=e.gutters?ur(`${e.theme.space[e.gutters]} / 2`):0;return tn(["padding-right:",";padding-left:",";"],t,t)})(e)),(e=>e.debug&&(e=>tn(["background-clip:content-box;background-color:",";"],No("primaryHue",600,e.theme,.1)))(e)),(e=>ZO(e.theme.breakpoints.xs,e.xs,e.alignSelfXs,e.textAlignXs,e.offsetXs,e.orderXs,e)),(e=>ZO(e.theme.breakpoints.sm,e.sm,e.alignSelfSm,e.textAlignSm,e.offsetSm,e.orderSm,e)),(e=>ZO(e.theme.breakpoints.md,e.md,e.alignSelfMd,e.textAlignMd,e.offsetMd,e.orderMd,e)),(e=>ZO(e.theme.breakpoints.lg,e.lg,e.alignSelfLg,e.textAlignLg,e.offsetLg,e.orderLg,e)),(e=>ZO(e.theme.breakpoints.xl,e.xl,e.alignSelfXl,e.textAlignXl,e.offsetXl,e.orderXl,e)),(e=>Kn(QO,e)));eP.defaultProps={columns:12,theme:Wn};const tP="grid.grid",nP=kn.div.attrs({"data-garden-id":tP,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledGrid",componentId:"sc-oxgg5i-0"})(["direction:",";margin-right:auto;margin-left:auto;width:100%;box-sizing:border-box;",";",";",";"],(e=>e.theme.rtl&&"rtl"),(e=>(e=>{const t=e.gutters?ur(`${e.theme.space[e.gutters]} / 2`):0;return tn(["padding-right:",";padding-left:",";"],t,t)})(e)),(e=>e.debug&&(e=>{const t=No(e.theme.palette.crimson,400,e.theme,.5),n=ur(`${e.theme.borderWidths.sm} * 2`);return tn(["box-shadow:-"," 0 0 0 ",","," 0 0 0 ",";"],n,t,n,t)})(e)),(e=>Kn(tP,e)));nP.defaultProps={gutters:"md",theme:Wn};const rP="grid.row",oP=(e,t,n)=>{let r,o;return r="start"===e||"end"===e?`flex-${e}`:e,o="start"===t||"end"===t?`flex-${t}`:"between"===t||"around"===t?`space-${t}`:t,tn(["flex-wrap:",";align-items:",";justify-content:",";"],n,r,o)},aP=(e,t,n,r)=>tn(["@media (min-width:","){",";}"],e,oP(t,n,r)),iP=kn.div.attrs({"data-garden-id":rP,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledRow",componentId:"sc-xjsdg1-0"})(["display:flex;box-sizing:border-box;"," ",";",";",";",";",";",";",";",";"],(e=>oP(e.alignItems,e.justifyContent,e.wrapAll)),(e=>(e=>{const t=e.gutters?ur(`${e.theme.space[e.gutters]} / 2`):0;return tn(["margin-right:-",";margin-left:-",";"],t,t)})(e)),(e=>e.debug&&(e=>{const t=No(e.theme.palette.mint,600,e.theme,.5),n=e.theme.borderWidths.sm;return tn(["box-shadow:inset 0 "," 0 0 ",",inset 0 -"," 0 0 ",";"],n,t,n,t)})(e)),(e=>aP(e.theme.breakpoints.xs,e.alignItemsXs,e.justifyContentXs,e.wrapXs)),(e=>aP(e.theme.breakpoints.sm,e.alignItemsSm,e.justifyContentSm,e.wrapSm)),(e=>aP(e.theme.breakpoints.md,e.alignItemsMd,e.justifyContentMd,e.wrapMd)),(e=>aP(e.theme.breakpoints.lg,e.alignItemsLg,e.justifyContentLg,e.wrapLg)),(e=>aP(e.theme.breakpoints.xl,e.alignItemsXl,e.justifyContentXl,e.wrapXl)),(e=>Kn(rP,e)));iP.defaultProps={wrapAll:"wrap",theme:Wn};const sP=p.createContext({gutters:"md"}),lP=()=>p.useContext(sP),cP=f.forwardRef(((e,t)=>{let{size:n,...r}=e;const{columns:o,gutters:a,debug:i}=lP();return f.createElement(eP,Object.assign({sizeAll:n,columns:o,gutters:a,debug:i,ref:t},r))}));cP.displayName="Col",cP.propTypes={size:Cn.oneOfType([Cn.number,Cn.string]),xs:Cn.oneOfType([Cn.number,Cn.string,Cn.bool]),sm:Cn.oneOfType([Cn.number,Cn.string,Cn.bool]),md:Cn.oneOfType([Cn.number,Cn.string,Cn.bool]),lg:Cn.oneOfType([Cn.number,Cn.string,Cn.bool]),xl:Cn.oneOfType([Cn.number,Cn.string,Cn.bool]),alignSelf:Cn.oneOf(GO),alignSelfXs:Cn.oneOf(GO),alignSelfSm:Cn.oneOf(GO),alignSelfMd:Cn.oneOf(GO),alignSelfLg:Cn.oneOf(GO),alignSelfXl:Cn.oneOf(GO),textAlign:Cn.oneOf(YO),textAlignXs:Cn.oneOf(YO),textAlignSm:Cn.oneOf(YO),textAlignMd:Cn.oneOf(YO),textAlignLg:Cn.oneOf(YO),textAlignXl:Cn.oneOf(YO),offset:Cn.oneOfType([Cn.number,Cn.string]),offsetXs:Cn.oneOfType([Cn.number,Cn.string]),offsetSm:Cn.oneOfType([Cn.number,Cn.string]),offsetMd:Cn.oneOfType([Cn.number,Cn.string]),offsetLg:Cn.oneOfType([Cn.number,Cn.string]),offsetXl:Cn.oneOfType([Cn.number,Cn.string]),order:Cn.oneOfType([Cn.number,Cn.string]),orderXs:Cn.oneOfType([Cn.number,Cn.string]),orderSm:Cn.oneOfType([Cn.number,Cn.string]),orderMd:Cn.oneOfType([Cn.number,Cn.string]),orderLg:Cn.oneOfType([Cn.number,Cn.string]),orderXl:Cn.oneOfType([Cn.number,Cn.string])};const uP=f.forwardRef(((e,t)=>{let{columns:n,debug:r,...o}=e;const a=p.useMemo((()=>({columns:n,gutters:o.gutters,debug:r})),[n,o.gutters,r]);return f.createElement(sP.Provider,{value:a},f.createElement(nP,Object.assign({debug:r,ref:t},o)))}));uP.displayName="Grid",uP.propTypes={columns:Cn.oneOfType([Cn.number,Cn.string]),gutters:Cn.oneOf([!1,"xxs","xs","sm","md","lg","xl","xxl"]),debug:Cn.bool},uP.defaultProps={columns:12,gutters:"md"};const dP=f.forwardRef(((e,t)=>{let{wrap:n,...r}=e;const{gutters:o,debug:a}=lP();return f.createElement(iP,Object.assign({gutters:o,debug:a,wrapAll:n,ref:t},r))}));dP.displayName="Row",dP.propTypes={alignItems:Cn.oneOf(qO),alignItemsXs:Cn.oneOf(qO),alignItemsSm:Cn.oneOf(qO),alignItemsMd:Cn.oneOf(qO),alignItemsLg:Cn.oneOf(qO),alignItemsXl:Cn.oneOf(qO),justifyContent:Cn.oneOf(KO),justifyContentXs:Cn.oneOf(KO),justifyContentSm:Cn.oneOf(KO),justifyContentMd:Cn.oneOf(KO),justifyContentLg:Cn.oneOf(KO),justifyContentXl:Cn.oneOf(KO),wrap:Cn.oneOf(XO),wrapXs:Cn.oneOf(XO),wrapSm:Cn.oneOf(XO),wrapMd:Cn.oneOf(XO),wrapLg:Cn.oneOf(XO),wrapXl:Cn.oneOf(XO)};const pP="pagination.page",fP=kn.li.attrs({"data-garden-id":pP,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledPageBase",componentId:"sc-lw1w9j-0"})(["box-sizing:border-box;display:inline-block;transition:box-shadow 0.1s ease-in-out,background-color 0.25s ease-in-out,color 0.25s ease-in-out;visibility:",";border-radius:",";cursor:pointer;overflow:hidden;text-align:center;text-overflow:ellipsis;user-select:none;",";&[aria-current='true']{font-weight:",";}:disabled,[aria-disabled='true']{cursor:default;}",";",";"],(e=>e.hidden&&"hidden"),(e=>e.theme.borderRadii.md),(e=>(e=>{const t=e.theme.fontSizes.md,n=8*e.theme.space.base+"px",r=Ao(n,t);return tn(["padding:0 ",";height:",";line-height:",";font-size:",";"],1.5*e.theme.space.base+"px",n,r,t)})(e)),(e=>e.theme.fontWeights.semibold),(e=>(e=>{const t=No("neutralHue",600,e.theme),n=No("neutralHue",700,e.theme),r=No("primaryHue",600,e.theme,.08),o=No("neutralHue",800,e.theme),a=No("primaryHue",600,e.theme,.2),i=o,s=r,l=No("primaryHue",600,e.theme,.16),c=No("primaryHue",600,e.theme,.28);return tn(["color:",";&:hover{background-color:",";color:",";}"," &:active,&:focus-visible:active,&[data-garden-focus-visible]:active{background-color:",";color:",";}&[aria-current='true']{background-color:",";color:",";}&[aria-current='true']:hover{background-color:",";}&[aria-current='true']:active{background-color:",";}:disabled,[aria-disabled='true']{background-color:transparent;color:",";}"],t,r,n,Ho({theme:e.theme,inset:!0}),a,o,s,i,l,c,No("grey",300,e.theme))})(e)),(e=>Kn(pP,e)));fP.defaultProps={theme:Wn};const mP="cursor_pagination",hP=kn.nav.attrs({"data-garden-id":mP,"data-garden-version":"8.76.9"}).withConfig({displayName:"StyledCursorPagination",componentId:"sc-qmfecg-0"})(["display:flex;justify-content:center;",";"],(e=>Kn(mP,e)));hP.defaultProps={theme:Wn};const gP="cursor_pagination.cursor",bP=kn(fP).attrs({"data-garden-id":gP,"data-garden-version":"8.76.9",as:"button"}).withConfig({displayName:"StyledCursor",componentId:"sc-507ee-0"})(["display:flex;align-items:center;border:none;background:transparent;padding:",";overflow:visible;&:not(","-of-type){margin-right:","px;}",";"],(e=>`0px ${2*e.theme.space.base}px`),(e=>e.theme.rtl?":first":":last"),(e=>e.theme.space.base),(e=>Kn(gP,e)));bP.defaultProps={theme:Wn};const vP=kn((e=>{let{children:t,...n}=e;return p.cloneElement(p.Children.only(t),n)})).withConfig({displayName:"StyledIcon",componentId:"sc-2vzk6e-0"})([""," transform:",";"],(e=>{const{type:t,theme:n}=e,r=n.space.base;return n.rtl?tn(["margin-",":","px;"],"last"===t||"next"===t?"right":"left",r):tn(["margin-",":","px;"],"first"===t||"previous"===t?"right":"left",r)}),(e=>e.theme.rtl&&"rotate(180deg)"));var yP;function wP(){return wP=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},wP.apply(null,arguments)}vP.defaultProps={theme:Wn};var xP,kP=function(e){return p.createElement("svg",wP({xmlns:"http://www.w3.org/2000/svg",width:16,height:16,focusable:"false",viewBox:"0 0 16 16","aria-hidden":"true"},e),yP||(yP=p.createElement("path",{fill:"currentColor",d:"M10.39 12.688a.5.5 0 01-.718.69l-.062-.066-4-5a.5.5 0 01-.054-.542l.054-.082 4-5a.5.5 0 01.83.55l-.05.074L6.641 8l3.75 4.688z"})))};function EP(){return EP=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},EP.apply(null,arguments)}var SP,CP=function(e){return p.createElement("svg",EP({xmlns:"http://www.w3.org/2000/svg",width:16,height:16,focusable:"false",viewBox:"0 0 16 16","aria-hidden":"true"},e),xP||(xP=p.createElement("path",{fill:"currentColor",d:"M5.61 3.312a.5.5 0 01.718-.69l.062.066 4 5a.5.5 0 01.054.542l-.054.082-4 5a.5.5 0 01-.83-.55l.05-.074L9.359 8l-3.75-4.688z"})))};function OP(){return OP=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},OP.apply(null,arguments)}var PP=function(e){return p.createElement("svg",OP({xmlns:"http://www.w3.org/2000/svg",width:16,height:16,focusable:"false",viewBox:"0 0 16 16","aria-hidden":"true"},e),SP||(SP=p.createElement("path",{fill:"currentColor",d:"M7.812 13.39a.5.5 0 01-.64-.012l-.062-.066-4-5a.5.5 0 01-.054-.542l.054-.082 4-5a.5.5 0 01.83.55l-.05.074L4.141 8l3.75 4.688a.5.5 0 01-.079.702zm5 0a.5.5 0 01-.64-.012l-.062-.066-4-5a.5.5 0 01-.054-.542l.054-.082 4-5a.5.5 0 01.83.55l-.05.074L9.141 8l3.75 4.688a.5.5 0 01-.079.702z"})))};const IP=p.forwardRef(((e,t)=>{let{children:n,...r}=e;return f.createElement(bP,Object.assign({ref:t},r),f.createElement(vP,{type:"first"},f.createElement(PP,null)),f.createElement("span",null,n))}));IP.displayName="CursorPagination.First";const _P=IP,TP=p.forwardRef(((e,t)=>{let{children:n,...r}=e;return f.createElement(bP,Object.assign({ref:t,as:"button"},r),f.createElement("span",null,n),f.createElement(vP,{type:"next"},f.createElement(CP,null)))}));TP.displayName="CursorPagination.Next";const NP=TP,jP=p.forwardRef(((e,t)=>{let{children:n,...r}=e;return f.createElement(bP,Object.assign({ref:t,as:"button"},r),f.createElement(vP,{type:"previous"},f.createElement(kP,null)),f.createElement("span",null,n))}));jP.displayName="CursorPagination.Previous";const AP=jP;var RP;function LP(){return LP=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},LP.apply(null,arguments)}var MP=function(e){return p.createElement("svg",LP({xmlns:"http://www.w3.org/2000/svg",width:16,height:16,focusable:"false",viewBox:"0 0 16 16","aria-hidden":"true"},e),RP||(RP=p.createElement("path",{fill:"currentColor",d:"M8.188 2.61a.5.5 0 01.64.013l.062.065 4 5a.5.5 0 01.054.542l-.054.082-4 5a.5.5 0 01-.83-.55l.05-.074L11.859 8l-3.75-4.688a.5.5 0 01.079-.702zm-5 0a.5.5 0 01.64.013l.062.065 4 5a.5.5 0 01.054.542l-.054.082-4 5a.5.5 0 01-.83-.55l.05-.074L6.859 8l-3.75-4.688a.5.5 0 01.079-.702z"})))};const DP=p.forwardRef(((e,t)=>{let{children:n,...r}=e;return f.createElement(bP,Object.assign({ref:t,as:"button"},r),f.createElement("span",null,n),f.createElement(vP,{type:"last"},f.createElement(MP,null)))}));DP.displayName="CursorPagination.Last";const zP=DP,FP=p.forwardRef(((e,t)=>f.createElement(hP,Object.assign({ref:t},e))));FP.displayName="CursorPagination";const HP=FP;var $P;function BP(){return BP=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},BP.apply(this,arguments)}HP.First=_P,HP.Next=NP,HP.Previous=AP,HP.Last=zP;var VP,UP=function(e){return p.createElement("svg",BP({xmlns:"http://www.w3.org/2000/svg",width:16,height:16,viewBox:"0 0 16 16"},e),$P||($P=p.createElement("path",{fill:"currentColor",d:"M3.625 10.78a1 1 0 01-1.343-1.476l.093-.085 5-4a1 1 0 011.147-.072l.103.072 5 4a1 1 0 01-1.147 1.634l-.103-.072L8 7.28l-4.375 3.5z"})))};function WP(){return WP=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},WP.apply(this,arguments)}var qP=function(e){return p.createElement("svg",WP({xmlns:"http://www.w3.org/2000/svg",width:16,height:16,viewBox:"0 0 16 16"},e),VP||(VP=p.createElement("path",{fill:"currentColor",d:"M12.375 5.22a1 1 0 011.343 1.476l-.093.085-5 4a1 1 0 01-1.147.072l-.103-.072-5-4a1 1 0 011.147-1.634l.103.072L8 8.72l4.375-3.5z"})))},GP=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Go to the homepage","cph-theme-error-boundary.message":"Give it a moment and try again later","cph-theme-error-boundary.title":"Something went wrong."}}),KP=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"[ผู้龍Ḡṓṓ ṭṓṓ ṭḥḛḛ ḥṓṓṃḛḛṗααḡḛḛ龍ผู้]","cph-theme-error-boundary.message":"[ผู้龍Ḡḭḭṽḛḛ ḭḭṭ αα ṃṓṓṃḛḛṇṭ ααṇḍ ṭṛẏẏ ααḡααḭḭṇ ḽααṭḛḛṛ龍ผู้]","cph-theme-error-boundary.title":"[ผู้龍Ṣṓṓṃḛḛṭḥḭḭṇḡ ẁḛḛṇṭ ẁṛṓṓṇḡ.龍ผู้]"}}),YP=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"انتقال إلى الصفحة الرئيسية","cph-theme-error-boundary.message":"انتظر لحظة وحاول مرة أخرى لاحقًا","cph-theme-error-boundary.title":"حدث خطأ."}}),XP=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Go to the homepage","cph-theme-error-boundary.message":"Give it a moment and try again later","cph-theme-error-boundary.title":"Something went wrong."}}),QP=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Перейти на главную страницу","cph-theme-error-boundary.message":"Подождите немного и повторите попытку позже","cph-theme-error-boundary.title":"Возникла неполадка."}}),JP=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Към началната страница","cph-theme-error-boundary.message":"Изчакайте малко и опитайте отново по-късно","cph-theme-error-boundary.title":"Възникна грешка."}}),ZP=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Go to the homepage","cph-theme-error-boundary.message":"Give it a moment and try again later","cph-theme-error-boundary.title":"Something went wrong."}}),eI=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Go to the homepage","cph-theme-error-boundary.message":"Give it a moment and try again later","cph-theme-error-boundary.title":"Something went wrong."}}),tI=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Ir a la página principal","cph-theme-error-boundary.message":"Espere un momento y vuelva a intentarlo más tarde","cph-theme-error-boundary.title":"Algo salió mal."}}),nI=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Přejít na domovskou stránku","cph-theme-error-boundary.message":"Chvilku počkejte a zkuste to znovu později.","cph-theme-error-boundary.title":"Něco se nepovedlo."}}),rI=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Go to the homepage","cph-theme-error-boundary.message":"Give it a moment and try again later","cph-theme-error-boundary.title":"Something went wrong."}}),oI=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Gå til startsiden","cph-theme-error-boundary.message":"Vent et øjeblik og prøv igen senere","cph-theme-error-boundary.title":"Noget gik galt."}}),aI=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Zur Homepage gehen","cph-theme-error-boundary.message":"Versuchen Sie es in Kürze erneut.","cph-theme-error-boundary.title":"Ein Fehler ist aufgetreten."}}),iI=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Zur Homepage gehen","cph-theme-error-boundary.message":"Versuchen Sie es in Kürze erneut.","cph-theme-error-boundary.title":"Ein Fehler ist aufgetreten."}}),sI=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Zur Homepage gehen","cph-theme-error-boundary.message":"Versuchen Sie es in Kürze erneut.","cph-theme-error-boundary.title":"Ein Fehler ist aufgetreten."}}),lI=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Μετάβαση στην αρχική σελίδα","cph-theme-error-boundary.message":"Περιμένετε λίγο και δοκιμάστε ξανά αργότερα","cph-theme-error-boundary.title":"Παρουσιάστηκε κάποιο πρόβλημα."}}),cI=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Go to the homepage","cph-theme-error-boundary.message":"Give it a moment and try again later","cph-theme-error-boundary.title":"Something went wrong."}}),uI=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Go to the homepage","cph-theme-error-boundary.message":"Give it a moment and try again later","cph-theme-error-boundary.title":"Something went wrong."}}),dI=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Go to the homepage","cph-theme-error-boundary.message":"Give it a moment and try again later","cph-theme-error-boundary.title":"Something went wrong."}}),pI=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Go to the homepage","cph-theme-error-boundary.message":"Give it a moment and try again later","cph-theme-error-boundary.title":"Something went wrong."}}),fI=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Go to the homepage","cph-theme-error-boundary.message":"Give it a moment and try again later","cph-theme-error-boundary.title":"Something went wrong."}}),mI=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Go to the homepage","cph-theme-error-boundary.message":"Give it a moment and try again later","cph-theme-error-boundary.title":"Something went wrong."}}),hI=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Go to the homepage","cph-theme-error-boundary.message":"Give it a moment and try again later","cph-theme-error-boundary.title":"Something went wrong."}}),gI=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Go to the homepage","cph-theme-error-boundary.message":"Give it a moment and try again later","cph-theme-error-boundary.title":"Something went wrong."}}),bI=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Go to the homepage","cph-theme-error-boundary.message":"Give it a moment and try again later","cph-theme-error-boundary.title":"Something went wrong."}}),vI=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Go to the homepage","cph-theme-error-boundary.message":"Give it a moment and try again later","cph-theme-error-boundary.title":"Something went wrong."}}),yI=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"cph-theme-error-boundary.go-to-homepage","cph-theme-error-boundary.message":"cph-theme-error-boundary.message","cph-theme-error-boundary.title":"cph-theme-error-boundary.title"}}),wI=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Go to the homepage","cph-theme-error-boundary.message":"Give it a moment and try again later","cph-theme-error-boundary.title":"Something went wrong."}}),xI=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"[ผู้龍Ḡṓṓ ṭṓṓ ṭḥḛḛ ḥṓṓṃḛḛṗααḡḛḛ龍ผู้]","cph-theme-error-boundary.message":"[ผู้龍Ḡḭḭṽḛḛ ḭḭṭ αα ṃṓṓṃḛḛṇṭ ααṇḍ ṭṛẏẏ ααḡααḭḭṇ ḽααṭḛḛṛ龍ผู้]","cph-theme-error-boundary.title":"[ผู้龍Ṣṓṓṃḛḛṭḥḭḭṇḡ ẁḛḛṇṭ ẁṛṓṓṇḡ.龍ผู้]"}}),kI=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Go to the homepage","cph-theme-error-boundary.message":"Give it a moment and try again later","cph-theme-error-boundary.title":"Something went wrong."}}),EI=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Ir a la página principal","cph-theme-error-boundary.message":"Espere un momento y vuelva a intentarlo más tarde","cph-theme-error-boundary.title":"Algo salió mal."}}),SI=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Ir a la página principal","cph-theme-error-boundary.message":"Espere un momento y vuelva a intentarlo más tarde","cph-theme-error-boundary.title":"Algo salió mal."}}),CI=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Ir a la página principal","cph-theme-error-boundary.message":"Espere un momento y vuelva a intentarlo más tarde","cph-theme-error-boundary.title":"Algo salió mal."}}),OI=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Go to the homepage","cph-theme-error-boundary.message":"Give it a moment and try again later","cph-theme-error-boundary.title":"Something went wrong."}}),PI=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Ir a la página principal","cph-theme-error-boundary.message":"Espere un momento y vuelva a intentarlo más tarde","cph-theme-error-boundary.title":"Algo salió mal."}}),II=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Go to the homepage","cph-theme-error-boundary.message":"Give it a moment and try again later","cph-theme-error-boundary.title":"Something went wrong."}}),_I=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Go to the homepage","cph-theme-error-boundary.message":"Give it a moment and try again later","cph-theme-error-boundary.title":"Something went wrong."}}),TI=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Siirry kotisivulle","cph-theme-error-boundary.message":"Odota hetki ja yritä myöhemmin uudelleen","cph-theme-error-boundary.title":"Jotain meni pieleen."}}),NI=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Go to the homepage","cph-theme-error-boundary.message":"Give it a moment and try again later","cph-theme-error-boundary.title":"Something went wrong."}}),jI=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Go to the homepage","cph-theme-error-boundary.message":"Give it a moment and try again later","cph-theme-error-boundary.title":"Something went wrong."}}),AI=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Aller à la page d’accueil","cph-theme-error-boundary.message":"Patientez quelques instants et réessayez ultérieurement","cph-theme-error-boundary.title":"Un problème est survenu."}}),RI=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Aller à la page d’accueil","cph-theme-error-boundary.message":"Patientez quelques instants et réessayez ultérieurement","cph-theme-error-boundary.title":"Un problème est survenu."}}),LI=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Go to the homepage","cph-theme-error-boundary.message":"Give it a moment and try again later","cph-theme-error-boundary.title":"Something went wrong."}}),MI=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"עבור לדף הבית","cph-theme-error-boundary.message":"המתן רגע ונסה שוב מאוחר יותר","cph-theme-error-boundary.title":"משהו השתבש."}}),DI=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"होमपेज पर जाएं","cph-theme-error-boundary.message":"थोड़ा ठहरकर पुनः प्रयास करें।","cph-theme-error-boundary.title":"कोई गड़बड़ी हुई है।"}}),zI=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Go to the homepage","cph-theme-error-boundary.message":"Give it a moment and try again later","cph-theme-error-boundary.title":"Something went wrong."}}),FI=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Ugrás a kezdőlapra","cph-theme-error-boundary.message":"Várjon egy percet, majd próbálkozzon újra később","cph-theme-error-boundary.title":"Hiba történt."}}),HI=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Go to the homepage","cph-theme-error-boundary.message":"Give it a moment and try again later","cph-theme-error-boundary.title":"Something went wrong."}}),$I=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Pergi ke beranda","cph-theme-error-boundary.message":"Tunggu sebentar dan coba lagi nanti","cph-theme-error-boundary.title":"Terjadi kesalahan."}}),BI=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Go to the homepage","cph-theme-error-boundary.message":"Give it a moment and try again later","cph-theme-error-boundary.title":"Something went wrong."}}),VI=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Vai alla home page","cph-theme-error-boundary.message":"Attendi un attimo e riprova più tardi","cph-theme-error-boundary.title":"Si è verificato un problema."}}),UI=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Vai alla home page","cph-theme-error-boundary.message":"Attendi un attimo e riprova più tardi","cph-theme-error-boundary.title":"Si è verificato un problema."}}),WI=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"ホームページに移動","cph-theme-error-boundary.message":"少し待ってからもう一度やり直してください","cph-theme-error-boundary.title":"問題が発生したようです。"}}),qI=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Go to the homepage","cph-theme-error-boundary.message":"Give it a moment and try again later","cph-theme-error-boundary.title":"Something went wrong."}}),GI=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Go to the homepage","cph-theme-error-boundary.message":"Give it a moment and try again later","cph-theme-error-boundary.title":"Something went wrong."}}),KI=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Go to the homepage","cph-theme-error-boundary.message":"Give it a moment and try again later","cph-theme-error-boundary.title":"Something went wrong."}}),YI=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"홈페이지로 이동","cph-theme-error-boundary.message":"잠시 후 다시 시도하세요.","cph-theme-error-boundary.title":"문제가 발생했습니다."}}),XI=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Go to the homepage","cph-theme-error-boundary.message":"Give it a moment and try again later","cph-theme-error-boundary.title":"Something went wrong."}}),QI=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Go to the homepage","cph-theme-error-boundary.message":"Give it a moment and try again later","cph-theme-error-boundary.title":"Something went wrong."}}),JI=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Go to the homepage","cph-theme-error-boundary.message":"Give it a moment and try again later","cph-theme-error-boundary.title":"Something went wrong."}}),ZI=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Go to the homepage","cph-theme-error-boundary.message":"Give it a moment and try again later","cph-theme-error-boundary.title":"Something went wrong."}}),e_=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Go to the homepage","cph-theme-error-boundary.message":"Give it a moment and try again later","cph-theme-error-boundary.title":"Something went wrong."}}),t_=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Go to the homepage","cph-theme-error-boundary.message":"Give it a moment and try again later","cph-theme-error-boundary.title":"Something went wrong."}}),n_=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Go to the homepage","cph-theme-error-boundary.message":"Give it a moment and try again later","cph-theme-error-boundary.title":"Something went wrong."}}),r_=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Go to the homepage","cph-theme-error-boundary.message":"Give it a moment and try again later","cph-theme-error-boundary.title":"Something went wrong."}}),o_=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Naar de startpagina","cph-theme-error-boundary.message":"Probeer het na korte tijd opnieuw","cph-theme-error-boundary.title":"Er is iets fout gegaan."}}),a_=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Naar de startpagina","cph-theme-error-boundary.message":"Probeer het na korte tijd opnieuw","cph-theme-error-boundary.title":"Er is iets fout gegaan."}}),i_=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Gå til hjemmesiden","cph-theme-error-boundary.message":"Vent et øyeblikk og prøv på nytt senere","cph-theme-error-boundary.title":"Noe gikk galt."}}),s_=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Przejdź do strony głównej","cph-theme-error-boundary.message":"Poczekaj chwilę i spróbuj ponownie później","cph-theme-error-boundary.title":"Wystąpił jakiś problem."}}),l_=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Ir para a página inicial","cph-theme-error-boundary.message":"Aguarde um momento e tente novamente mais tarde","cph-theme-error-boundary.title":"Algo deu errado."}}),c_=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Ir para a página inicial","cph-theme-error-boundary.message":"Aguarde um momento e tente novamente mais tarde","cph-theme-error-boundary.title":"Algo deu errado."}}),u_=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Mergeți la pagina de pornire","cph-theme-error-boundary.message":"Așteptați un moment, apoi încercați din nou mai târziu","cph-theme-error-boundary.title":"A apărut o problemă."}}),d_=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Перейти на главную страницу","cph-theme-error-boundary.message":"Подождите немного и повторите попытку позже","cph-theme-error-boundary.title":"Возникла неполадка."}}),p_=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Prejsť na domovskú stránku","cph-theme-error-boundary.message":"Chvíľu počkajte a skúste to znova neskôr","cph-theme-error-boundary.title":"Niekde sa stala chyba."}}),f_=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Go to the homepage","cph-theme-error-boundary.message":"Give it a moment and try again later","cph-theme-error-boundary.title":"Something went wrong."}}),m_=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Go to the homepage","cph-theme-error-boundary.message":"Give it a moment and try again later","cph-theme-error-boundary.title":"Something went wrong."}}),h_=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Go to the homepage","cph-theme-error-boundary.message":"Give it a moment and try again later","cph-theme-error-boundary.title":"Something went wrong."}}),g_=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Go to the homepage","cph-theme-error-boundary.message":"Give it a moment and try again later","cph-theme-error-boundary.title":"Something went wrong."}}),b_=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Gå till startsidan","cph-theme-error-boundary.message":"Vänta en stund och försök igen senare","cph-theme-error-boundary.title":"Något gick fel."}}),v_=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"ไปที่หน้าหลัก","cph-theme-error-boundary.message":"รอสักครู่แล้วลองอีกครั้งในภายหลัง","cph-theme-error-boundary.title":"มีบางอย่างผิดพลาด"}}),y_=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Ana sayfaya git","cph-theme-error-boundary.message":"Kısa bir süre bekleyip yeniden deneyin","cph-theme-error-boundary.title":"Bir sorun oluştu."}}),w_=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Перейти на домашню сторінку","cph-theme-error-boundary.message":"Зачекайте хвилину й спробуйте ще раз пізніше","cph-theme-error-boundary.title":"Сталася помилка."}}),x_=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Go to the homepage","cph-theme-error-boundary.message":"Give it a moment and try again later","cph-theme-error-boundary.title":"Something went wrong."}}),k_=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Go to the homepage","cph-theme-error-boundary.message":"Give it a moment and try again later","cph-theme-error-boundary.title":"Something went wrong."}}),E_=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"Đi đến trang chủ","cph-theme-error-boundary.message":"Hãy chờ một lát và thử lại sau","cph-theme-error-boundary.title":"Đã xảy ra sự cố."}}),S_=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"转到主页","cph-theme-error-boundary.message":"请稍候片刻再重试","cph-theme-error-boundary.title":"出错了。"}}),C_=Object.freeze({__proto__:null,default:{"cph-theme-error-boundary.go-to-homepage":"前往主頁","cph-theme-error-boundary.message":"請稍候片刻，然後再試一次","cph-theme-error-boundary.title":"發生問題。"}});export{bn as $,ka as A,wf as B,Hu as C,BO as D,bk as E,Tu as F,No as G,Lu as H,Bu as I,IE as J,Ju as K,Du as L,Fu as M,vS as N,Ry as O,Wx as P,Li as Q,wE as R,bs as S,Uu as T,xE as U,fS as V,ds as W,OE as X,PE as Y,xa as Z,CE as _,dp as a,MI as a$,P as a0,za as a1,Te as a2,me as a3,S as a4,Ri as a5,$o as a6,O as a7,WO as a8,uP as a9,cI as aA,uI as aB,dI as aC,pI as aD,fI as aE,mI as aF,hI as aG,gI as aH,bI as aI,vI as aJ,yI as aK,wI as aL,xI as aM,kI as aN,EI as aO,SI as aP,CI as aQ,OI as aR,PI as aS,II as aT,_I as aU,TI as aV,NI as aW,jI as aX,AI as aY,RI as aZ,LI as a_,cP as aa,dP as ab,qx as ac,Wi as ad,Ui as ae,HP as af,xs as ag,qi as ah,UP as ai,qP as aj,GP as ak,KP as al,YP as am,XP as an,QP as ao,JP as ap,ZP as aq,eI as ar,tI as as,nI as at,rI as au,oI as av,aI as aw,iI as ax,sI as ay,lI as az,wS as b,DI as b0,zI as b1,FI as b2,HI as b3,$I as b4,BI as b5,VI as b6,UI as b7,WI as b8,qI as b9,y_ as bA,w_ as bB,x_ as bC,k_ as bD,E_ as bE,S_ as bF,C_ as bG,GI as ba,KI as bb,YI as bc,XI as bd,QI as be,JI as bf,ZI as bg,e_ as bh,t_ as bi,n_ as bj,r_ as bk,o_ as bl,a_ as bm,i_ as bn,s_ as bo,l_ as bp,c_ as bq,u_ as br,d_ as bs,p_ as bt,f_ as bu,m_ as bv,h_ as bw,g_ as bx,b_ as by,v_ as bz,ek as c,my as d,gy as e,hy as f,fy as g,by as h,Ly as i,v as j,us as k,n as l,t as m,od as n,up as o,Aw as p,iy as q,p as r,kn as s,Zx as t,_e as u,Nx as v,ed as w,fk as x,Ho as y,Xu as z};
