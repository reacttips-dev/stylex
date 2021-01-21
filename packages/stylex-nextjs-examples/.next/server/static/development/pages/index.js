module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../node_modules/@ladifire-opensource/stylex/index.js":
/*!**********************************************************************************!*\
  !*** /home/cong/Github/stylex/node_modules/@ladifire-opensource/stylex/index.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
 * Copyright 2020-present Ladifire & Ladifire open source team. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
module.exports = __webpack_require__(/*! ./stylex.js */ "../../node_modules/@ladifire-opensource/stylex/stylex.js");

/***/ }),

/***/ "../../node_modules/@ladifire-opensource/stylex/stylex.js":
/*!***********************************************************************************!*\
  !*** /home/cong/Github/stylex/node_modules/@ladifire-opensource/stylex/stylex.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Ladifire, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const CometStyleXSheet = __webpack_require__(/*! @ladifire-opensource/stylex-theme */ "@ladifire-opensource/stylex-theme");

CometStyleXSheet.rootStyleSheet.injectTheme();
var g = false;

function h(a) {
  a = a.reverse();
  const b = {};

  while (a.length) {
    var c = a.pop();

    if (Array.isArray(c)) {
      for (var d = c.length - 1; d >= 0; d--) a.push(c[d]);

      continue;
    }

    d = c;
    if (d != null && typeof d === "object") for (var e in d) {
      c = d[e];
      if (typeof c === "string") b[e] = c;else if (typeof c === "object") {
        var f;
        b[e] = (f = b[e]) != null ? f : {};
        Object.assign(b[e], c);
      }
    }
  }

  return b;
}

function stylex(...args) {
  for (var a = arguments.length, b = new Array(a), c = 0; c < a; c++) b[c] = arguments[c];

  var d = h(b),
      e = "";

  for (var f in d) if (Boolean(d[f])) if (typeof d[f] === "string") e += e ? " " + d[f] : d[f];else if (typeof d[f] === "object") {
    var g = d[f];

    for (var i in g) {
      var j = g[i];
      e += e ? " " + j : j;
    }
  }

  return e;
}
/**
 * Create an stylex object, this is done by compiled and will caused error
 * if it exits in runtime code
 *
 * e.g:
 * const styles = stylex.create({
 *     button: {
 *         color: "var(--accent)",
 *         backgroundColor: "var(--secondary-color)",
 *         ...
 *     },
 * })
 *
 * */


stylex.create = function (...args) {
  throw new Error("stylex.create should never be called. It should be compiled away.");
};
/**
 * Override a style property of style object, given by logic condition
 * It's mean: If true => color = "red", otherwise color = "blue"
 *
 * e.g:
 *
 * const {color} = props;
 *
 * return (
 *      <div
 *          className={stylex.dedupe(
 *              {
 *                  position: "relative",
 *                  color: "red",
 *              },
 *              color === "blue" ? {
 *                  color: "red",
 *              } : {},
 *          )}
 *      >
 *          Component
 *      </div>
 * )
 * */


stylex.dedupe = function () {
  return stylex.apply(undefined, arguments);
};
/**
 * Compose multiple styles object into one
 * */


stylex.compose = function () {
  for (var a = arguments.length, b = new Array(a), c = 0; c < a; c++) b[c] = arguments[c];

  return h(b);
};
/**
 * Create a keyframes animation
 * e.g:
 * const styles = stylex.create({
 *     root: {
 *         position: "relative",
 *         animationName: stylex.keyframes({
 *               '0%': {
 *                   transform: 'translateY(0)'
 *               },
 *               '28%': {
 *                   transform: 'translateY(-5px)'
 *               },
 *               '44%': {
 *                   transform: 'translateY(0)',
 *               },
 *           })
 *     }
 * })
 * => will be transformed to:
 * ...animationName: "sdert25s", <== animation name
 * and an keyframes animation with name "sdert25s"
 * */


stylex.keyframes = function (a) {
  throw new Error("stylex.keyframes should never be called. It should be compiled away.");
};
/**
 * Inject compiled styles to css stylesheet if need (if it's never injected before)
 * */


stylex.inject = function (a, c, d = null) {
  d === void 0 && (d = null), !g && (g = !0), CometStyleXSheet.rootStyleSheet.insert(a, c, d);
};
/**
 * For quick uses
 * */


stylex.absoluteFill = {
  bottom: 0,
  boxSizing: "border-box",
  right: 0,
  position: "absolute",
  left: 0,
  top: 0
};
/**
 * For quick uses
 * */

stylex.absoluteCenter = {
  boxSizing: "border-box",
  left: "50%",
  position: "absolute",
  top: "50%",
  transform: "translate(-50%, -50%)"
};
/**
 * For quick uses
 * */

stylex.blockBase = {
  borderStyle: "solid",
  borderWidth: 0,
  boxSizing: "border-box",
  display: "block",
  flexGrow: 1,
  flexShrink: 1,
  margin: 0,
  padding: 0,
  position: "relative",
  zIndex: 0
};
/**
 * For quick uses
 * */

stylex.inlineBase = Object.assign({}, stylex.blockBase, {
  display: "inline"
});
/**
 * For quick uses
 * */

stylex.buttonBase = {
  appearance: "none",
  backgroundColor: "transparent",
  borderStyle: "solid",
  borderWidth: 0,
  boxSizing: "border-box",
  margin: 0,
  padding: 0,
  position: "relative",
  textAlign: "inherit",
  zIndex: 0
};
/**
 * For quick uses
 * */

stylex.flexBase = {
  alignItems: "stretch",
  borderStyle: "solid",
  borderWidth: 0,
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  flexShrink: 1,
  justifyContent: "space-between",
  margin: 0,
  minHeight: 0,
  minWidth: 0,
  padding: 0,
  position: "relative",
  zIndex: 0
};
/**
 * For quick uses
 * */

stylex.flexInlineBase = Object.assign({}, stylex.flexBase, {
  display: "inline-flex"
});
/**
 * For quick uses
 * */

stylex.linkBase = {
  backgroundColor: "transparent",
  backgroundImage: "none",
  boxSizing: "border-box",
  color: "inherit",
  cursor: "pointer",
  position: "relative",
  textDecoration: "none",
  zIndex: 0
};
/**
 * For quick uses
 * */

stylex.listBase = {
  boxSizing: "border-box",
  listStyle: "none",
  marginBottom: 0,
  marginTop: 0,
  paddingLeft: 0
};
/**
 * For quick uses
 * */

stylex.visuallyHidden = {
  clip: "rect(0, 0, 0, 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  width: 1
};
module.exports = stylex;

/***/ }),

/***/ "./pages/index.tsx":
/*!*************************!*\
  !*** ./pages/index.tsx ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Home; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ladifire_opensource_stylex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ladifire-opensource/stylex */ "../../node_modules/@ladifire-opensource/stylex/index.js");
/* harmony import */ var _ladifire_opensource_stylex__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ladifire_opensource_stylex__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/home/cong/Github/stylex/packages/stylex-nextjs-examples/pages/index.tsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0__["createElement"];
/**
 * Copyright (c) Ladifire, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



const styles = {
  root: {
    display: "jaadvfyp",
    justifyContent: "qaaoi2vu",
    alignItems: "qaagy2zg"
  },
  button: {
    borderTopLeftRadius: "y542mdzu",
    borderTopRightRadius: "r54534rx",
    borderBottomRightRadius: "raatxpe5",
    borderBottomLeftRadius: "a54ilwcm"
  }
};
function Home() {
  return __jsx("div", {
    className: _ladifire_opensource_stylex__WEBPACK_IMPORTED_MODULE_1___default()(styles.root),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 5
    }
  }, __jsx("button", {
    className: _ladifire_opensource_stylex__WEBPACK_IMPORTED_MODULE_1___default()(styles.button),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 7
    }
  }, "Stylex button!"));
}
_ladifire_opensource_stylex__WEBPACK_IMPORTED_MODULE_1___default.a.inject(".jaadvfyp{display:flex}");
_ladifire_opensource_stylex__WEBPACK_IMPORTED_MODULE_1___default.a.inject(".qaaoi2vu{justify-content:center}");
_ladifire_opensource_stylex__WEBPACK_IMPORTED_MODULE_1___default.a.inject(".qaagy2zg{align-items:center}");
_ladifire_opensource_stylex__WEBPACK_IMPORTED_MODULE_1___default.a.inject(".y542mdzu{border-top-left-radius:8px}");
_ladifire_opensource_stylex__WEBPACK_IMPORTED_MODULE_1___default.a.inject(".r54534rx{border-top-right-radius:8px}");
_ladifire_opensource_stylex__WEBPACK_IMPORTED_MODULE_1___default.a.inject(".raatxpe5{border-bottom-right-radius:8px}");
_ladifire_opensource_stylex__WEBPACK_IMPORTED_MODULE_1___default.a.inject(".a54ilwcm{border-bottom-left-radius:8px}");

/***/ }),

/***/ 4:
/*!*******************************!*\
  !*** multi ./pages/index.tsx ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/cong/Github/stylex/packages/stylex-nextjs-examples/pages/index.tsx */"./pages/index.tsx");


/***/ }),

/***/ "@ladifire-opensource/stylex-theme":
/*!****************************************************!*\
  !*** external "@ladifire-opensource/stylex-theme" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@ladifire-opensource/stylex-theme");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map