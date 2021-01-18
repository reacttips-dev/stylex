/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/App.tsx":
/*!*********************!*\
  !*** ./src/App.tsx ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"../../node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nvar _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ \"../../node_modules/@babel/runtime/helpers/interopRequireWildcard.js\");\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.default = void 0;\n\nvar React = _interopRequireWildcard(__webpack_require__(/*! react */ \"../../node_modules/react/index.js\"));\n\nvar _stylex = _interopRequireDefault(__webpack_require__(/*! @ladifire-opensource/stylex */ \"../stylex/index.js\"));\n\n/**\n * Copyright (c) Ladifire, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\nvar styles = _stylex[\"default\"].create({\n  root: {\n    color: \"red\"\n  }\n});\n\nvar _default = function _default() {\n  return /*#__PURE__*/React.createElement(\"div\", null, \"Wellcome to Stylex\");\n};\n\nexports.default = _default;\n\n//# sourceURL=webpack://@ladifire-opensource/stylex-reactjs-examples/./src/App.tsx?");

/***/ }),

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"../../node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nvar _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ \"../../node_modules/@babel/runtime/helpers/interopRequireWildcard.js\");\n\nvar React = _interopRequireWildcard(__webpack_require__(/*! react */ \"../../node_modules/react/index.js\"));\n\nvar ReactDOM = _interopRequireWildcard(__webpack_require__(/*! react-dom */ \"../../node_modules/react-dom/index.js\"));\n\nvar _App = _interopRequireDefault(__webpack_require__(/*! ./App */ \"./src/App.tsx\"));\n\n/**\n * Copyright (c) Ladifire, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\nfunction renderRootComponent() {\n  ReactDOM.render( /*#__PURE__*/React.createElement(_App[\"default\"], null), document.getElementById('root'));\n} // This is for anything that needs to be done for ALL react components.\n// This runs before we start to render anything.\n\n\nfunction preRenderSetup(callwhendone) {\n  window.onerror = function (msg, url, line, column, stack) {\n    if (msg === 'ResizeObserver loop limit exceeded') {\n      return;\n    }\n\n    var l = {};\n    l.level = 'ERROR';\n    l.message = 'msg: ' + msg + ' row: ' + line + ' col: ' + column + ' stack: ' + stack + ' url: ' + url;\n    var req = new XMLHttpRequest();\n    req.open('POST', '/api/v1/logs');\n    req.setRequestHeader('Content-Type', 'application/json');\n    req.send(JSON.stringify(l));\n  };\n\n  callwhendone();\n}\n/**\n * Adds a function to be invoked onload appended to any existing onload\n * event handlers.\n *\n * @param   {function} fn onload event handler\n *\n */\n\n\nfunction appendOnLoadEvent(fn) {\n  // @ts-ignore\n  if (window.attachEvent) {\n    // @ts-ignore\n    window.attachEvent('onload', fn);\n  } else if (window.onload) {\n    var curronload = window.onload;\n\n    window.onload = function (evt) {\n      // @ts-ignore\n      curronload(evt);\n      fn(evt);\n    };\n  } else {\n    window.onload = fn;\n  }\n}\n\nappendOnLoadEvent(function () {\n  // Do the pre-render setup and call renderRootComponent when done\n  preRenderSetup(renderRootComponent);\n});\n\n//# sourceURL=webpack://@ladifire-opensource/stylex-reactjs-examples/./src/index.tsx?");

/***/ }),

/***/ "../stylex/index.js":
/*!**************************!*\
  !*** ../stylex/index.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/*\n * Copyright 2020-present Ladifire & Ladifire open source team. All rights reserved.\n * This file is licensed to you under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License. You may obtain a copy\n * of the License at http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software distributed under\n * the License is distributed on an \"AS IS\" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS\n * OF ANY KIND, either express or implied. See the License for the specific language\n * governing permissions and limitations under the License.\n */\n\nmodule.exports = __webpack_require__(/*! ./stylex.js */ \"../stylex/stylex.js\");\n\n\n//# sourceURL=webpack://@ladifire-opensource/stylex-reactjs-examples/../stylex/index.js?");

/***/ }),

/***/ "../stylex/stylex.js":
/*!***************************!*\
  !*** ../stylex/stylex.js ***!
  \***************************/
/***/ ((module) => {

eval("/**\n * Copyright (c) Ladifire, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\nvar g = false;\n\nfunction h(a) {\n    a = a.reverse();\n    const b = {};\n    while (a.length) {\n        var c = a.pop();\n        if (Array.isArray(c)) {\n            for (var d = c.length - 1; d >= 0; d--) a.push(c[d]);\n            continue\n        }\n        d = c;\n        if (d != null && typeof d === \"object\")\n            for (var e in d) {\n                c = d[e];\n                if (typeof c === \"string\") b[e] = c;\n                else if (typeof c === \"object\") {\n                    var f;\n                    b[e] = (f = b[e]) != null ? f : {};\n                    Object.assign(b[e], c)\n                }\n            }\n    }\n    return b\n}\n\nfunction stylex(...args) {\n    for (var a = arguments.length, b = new Array(a), c = 0; c < a; c++) b[c] = arguments[c];\n    var d = h(b),\n        e = \"\";\n    for (var f in d)\n        if (Boolean(d[f]))\n            if (typeof d[f] === \"string\") e += e ? \" \" + d[f] : d[f];\n            else if (typeof d[f] === \"object\") {\n                var g = d[f];\n                for (var i in g) {\n                    var j = g[i];\n                    e += e ? \" \" + j : j\n                }\n            }\n    return e\n}\n\n/**\n * Create an stylex object, this is done by compiled and will caused error\n * if it exits in runtime code\n *\n * e.g:\n * const styles = stylex.create({\n *     button: {\n *         color: \"var(--accent)\",\n *         backgroundColor: \"var(--secondary-color)\",\n *         ...\n *     },\n * })\n *\n * */\nstylex.create = function(...args) {\n    throw new Error(\"stylex.create should never be called. It should be compiled away.\")\n};\n\n/**\n * Override a style property of style object, given by logic condition\n * It's mean: If true => color = \"red\", otherwise color = \"blue\"\n *\n * e.g:\n *\n * const {color} = props;\n *\n * return (\n *      <div\n *          className={stylex.dedupe(\n *              {\n *                  position: \"relative\",\n *                  color: \"red\",\n *              },\n *              color === \"blue\" ? {\n *                  color: \"red\",\n *              } : {},\n *          )}\n *      >\n *          Component\n *      </div>\n * )\n * */\nstylex.dedupe = function() {\n    return stylex.apply(undefined, arguments)\n};\n\n/**\n * Compose multiple styles object into one\n * */\nstylex.compose = function () {\n    for (var a = arguments.length, b = new Array(a), c = 0; c < a; c++) b[c] = arguments[c];\n    return h(b)\n};\n\n/**\n * Create a keyframes animation\n * e.g:\n * const styles = stylex.create({\n *     root: {\n *         position: \"relative\",\n *         animationName: stylex.keyframes({\n *               '0%': {\n *                   transform: 'translateY(0)'\n *               },\n *               '28%': {\n *                   transform: 'translateY(-5px)'\n *               },\n *               '44%': {\n *                   transform: 'translateY(0)',\n *               },\n *           })\n *     }\n * })\n * => will be transformed to:\n * ...animationName: \"sdert25s\", <== animation name\n * and an keyframes animation with name \"sdert25s\"\n * */\nstylex.keyframes = function (a) {\n    throw new Error(\"stylex.keyframes should never be called. It should be compiled away.\")\n};\n\n/**\n * Inject compiled styles to css stylesheet if need (if it's never injected before)\n * */\nstylex.inject = function (a, c, d) {\n\n};\n\n/**\n * For quick uses\n * */\nstylex.absoluteFill = {\n    bottom: 0,\n    boxSizing: \"border-box\",\n    right: 0,\n    position: \"absolute\",\n    left: 0,\n    top: 0\n};\n\n/**\n * For quick uses\n * */\nstylex.absoluteCenter = {\n    boxSizing: \"border-box\",\n    left: \"50%\",\n    position: \"absolute\",\n    top: \"50%\",\n    transform: \"translate(-50%, -50%)\"\n};\n\n/**\n * For quick uses\n * */\nstylex.blockBase = {\n    borderStyle: \"solid\",\n    borderWidth: 0,\n    boxSizing: \"border-box\",\n    display: \"block\",\n    flexGrow: 1,\n    flexShrink: 1,\n    margin: 0,\n    padding: 0,\n    position: \"relative\",\n    zIndex: 0\n};\n\n/**\n * For quick uses\n * */\nstylex.inlineBase = Object.assign({}, stylex.blockBase, {\n    display: \"inline\"\n});\n\n/**\n * For quick uses\n * */\nstylex.buttonBase = {\n    appearance: \"none\",\n    backgroundColor: \"transparent\",\n    borderStyle: \"solid\",\n    borderWidth: 0,\n    boxSizing: \"border-box\",\n    margin: 0,\n    padding: 0,\n    position: \"relative\",\n    textAlign: \"inherit\",\n    zIndex: 0\n};\n\n/**\n * For quick uses\n * */\nstylex.flexBase = {\n    alignItems: \"stretch\",\n    borderStyle: \"solid\",\n    borderWidth: 0,\n    boxSizing: \"border-box\",\n    display: \"flex\",\n    flexDirection: \"column\",\n    flexGrow: 1,\n    flexShrink: 1,\n    justifyContent: \"space-between\",\n    margin: 0,\n    minHeight: 0,\n    minWidth: 0,\n    padding: 0,\n    position: \"relative\",\n    zIndex: 0\n};\n\n/**\n * For quick uses\n * */\nstylex.flexInlineBase = Object.assign({}, stylex.flexBase, {\n    display: \"inline-flex\"\n});\n\n/**\n * For quick uses\n * */\nstylex.linkBase = {\n    backgroundColor: \"transparent\",\n    backgroundImage: \"none\",\n    boxSizing: \"border-box\",\n    color: \"inherit\",\n    cursor: \"pointer\",\n    position: \"relative\",\n    textDecoration: \"none\",\n    zIndex: 0\n};\n\n/**\n * For quick uses\n * */\nstylex.listBase = {\n    boxSizing: \"border-box\",\n    listStyle: \"none\",\n    marginBottom: 0,\n    marginTop: 0,\n    paddingLeft: 0\n};\n\n/**\n * For quick uses\n * */\nstylex.visuallyHidden = {\n    clip: \"rect(0, 0, 0, 0)\",\n    clipPath: \"inset(50%)\",\n    height: 1,\n    overflow: \"hidden\",\n    position: \"absolute\",\n    width: 1\n};\n\nmodule.exports = stylex;\n\n\n//# sourceURL=webpack://@ladifire-opensource/stylex-reactjs-examples/../stylex/stylex.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// the startup function
/******/ 	// It's empty as some runtime module handles the default behavior
/******/ 	__webpack_require__.x = x => {}
/************************************************************************/
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// Promise = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0
/******/ 		};
/******/ 		
/******/ 		var deferredModules = [
/******/ 			["./src/index.tsx","vendors-node_modules_babel_runtime_helpers_interopRequireDefault_js-node_modules_babel_runtim-834677"]
/******/ 		];
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		var checkDeferredModules = x => {};
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime, executeModules] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0, resolves = [];
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					resolves.push(installedChunks[chunkId][0]);
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			while(resolves.length) {
/******/ 				resolves.shift()();
/******/ 			}
/******/ 		
/******/ 			// add entry modules from loaded chunk to deferred list
/******/ 			if(executeModules) deferredModules.push.apply(deferredModules, executeModules);
/******/ 		
/******/ 			// run deferred modules when all chunks ready
/******/ 			return checkDeferredModules();
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk_ladifire_opensource_stylex_reactjs_examples"] = self["webpackChunk_ladifire_opensource_stylex_reactjs_examples"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 		
/******/ 		function checkDeferredModulesImpl() {
/******/ 			var result;
/******/ 			for(var i = 0; i < deferredModules.length; i++) {
/******/ 				var deferredModule = deferredModules[i];
/******/ 				var fulfilled = true;
/******/ 				for(var j = 1; j < deferredModule.length; j++) {
/******/ 					var depId = deferredModule[j];
/******/ 					if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferredModules.splice(i--, 1);
/******/ 					result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 				}
/******/ 			}
/******/ 			if(deferredModules.length === 0) {
/******/ 				__webpack_require__.x();
/******/ 				__webpack_require__.x = x => {};
/******/ 			}
/******/ 			return result;
/******/ 		}
/******/ 		var startup = __webpack_require__.x;
/******/ 		__webpack_require__.x = () => {
/******/ 			// reset startup function so it can be called again when more startup code is added
/******/ 			__webpack_require__.x = startup || (x => {});
/******/ 			return (checkDeferredModules = checkDeferredModulesImpl)();
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// run startup
/******/ 	return __webpack_require__.x();
/******/ })()
;