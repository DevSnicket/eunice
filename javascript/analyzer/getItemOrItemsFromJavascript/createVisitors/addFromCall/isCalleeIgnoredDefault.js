/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

// cSpell:ignore microtask

const
	browser =
		[
			"AbortController",
			"alert",
			"clearInterval",
			"clearTimeout",
			"Comment",
			"console",
			"CustomEvent",
			"Document",
			"DocumentFragment",
			"DocumentType",
			"DOMError",
			"DOMException",
			"DOMImplementation",
			"DOMParser",
			"DOMPoint",
			"DOMPointReadOnly",
			"DOMRect",
			"Event",
			"EventTarget",
			"MutationObserver",
			"queueMicrotask",
			"Range",
			"setInterval",
			"setTimeout",
			"Text",
			"TextDecoder",
			"TextEncoder",
			"URL",
			"URLSearchParams",
			"window",
		],
	commonjs =
		[
			"__dirname",
			"__filename",
			"module",
			"require",
		],
	nodejs =
		[
			"Buffer",
			"clearImmediate",
			"clearInterval",
			"clearTimeout",
			"console",
			"process",
			"queueMicrotask",
			"setImmediate",
			"setInterval",
			"setTimeout",
			"TextDecoder",
			"TextEncoder",
			"URL",
			"URLSearchParams",
		],
	standard =
		[
			"arguments",
			"Array",
			"ArrayBuffer",
			"AsyncFunction",
			"Atomics",
			"BigInt",
			"BigInt64Array",
			"BigUint64Array",
			"Boolean",
			"DataView",
			"Date",
			"decodeURI",
			"decodeURIComponent",
			"encodeURI",
			"encodeURIComponent",
			"Error",
			"escape",
			"eval",
			"EvalError",
			"Float32Array",
			"Float64Array",
			"Function",
			"GeneratorFunction",
			"Int16Array",
			"Int32Array",
			"Int8Array",
			"Intl",
			"isFinite",
			"isNaN",
			"JSON",
			"Map",
			"Math",
			"Number",
			"Object",
			"parseFloat",
			"parseInt",
			"Promise",
			"Proxy",
			"RangeError",
			"ReferenceError",
			"Reflect",
			"RegExp",
			"Set",
			"SharedArrayBuffer",
			"String",
			"Symbol",
			"SyntaxError",
			"TypeError",
			"Uint16Array",
			"Uint32Array",
			"Uint8Array",
			"Uint8ClampedArray",
			"unescape",
			"URIError",
			"WeakMap",
			"WeakSet",
			"WebAssembly",
		];

export default
callee =>
	new Set([ ...browser, ...commonjs, ...nodejs, ...standard ])
	.has(callee);