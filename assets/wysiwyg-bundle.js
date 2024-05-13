import { g as getDefaultExportFromCjs, c as commonjsGlobal } from 'shared';

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

var main$2 = {exports: {}};

main$2.exports;

(function (module, exports) {
} (main$2, main$2.exports));

var mainExports = main$2.exports;
var main = /*@__PURE__*/getDefaultExportFromCjs(mainExports);

var main$1 = /*#__PURE__*/_mergeNamespaces({
	__proto__: null,
	default: main
}, [mainExports]);

export { main$1 as m };