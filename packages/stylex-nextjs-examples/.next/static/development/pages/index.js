(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["static/development/pages/index.js"],{

/***/ "../../node_modules/@ladifire-opensource/stylex-theme/index.js":
/*!****************************************************************************************!*\
  !*** /home/cong/Github/stylex/node_modules/@ladifire-opensource/stylex-theme/index.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Ladifire, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = __webpack_require__(/*! ./src */ "../../node_modules/@ladifire-opensource/stylex-theme/src/index.js");


/***/ }),

/***/ "../../node_modules/@ladifire-opensource/stylex-theme/src/CometStyleXSheet.js":
/*!*******************************************************************************************************!*\
  !*** /home/cong/Github/stylex/node_modules/@ladifire-opensource/stylex-theme/src/CometStyleXSheet.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Ladifire, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const StylexSheet = __webpack_require__(/*! ./StyleXSheet */ "../../node_modules/@ladifire-opensource/stylex-theme/src/StyleXSheet.js");

class _CometStyleXSheet extends StylexSheet {
  constructor(props = {}) {
    super(props);

    this.rootTheme = props.rootTheme || {};
    this.rootDarkTheme = props.rootDarkTheme || {};

    this.injectThemeVariables = function(data, themeKey = "root") {
      if (themeKey === "root") {
        this.rootTheme = Object.assign(this.rootTheme, data);
      } else {

      }
    }
  }
}

module.exports = {
  CometStyleXSheet: _CometStyleXSheet,
  rootStyleSheet: new _CometStyleXSheet(),
};


/***/ }),

/***/ "../../node_modules/@ladifire-opensource/stylex-theme/src/StyleXSheet.js":
/*!**************************************************************************************************!*\
  !*** /home/cong/Github/stylex/node_modules/@ladifire-opensource/stylex-theme/src/StyleXSheet.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Ladifire, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const ExecutionEnvironment = __webpack_require__(/*! ./utils */ "../../node_modules/@ladifire-opensource/stylex-theme/src/utils.js");

const _LIGHT_MODE_CLASS_NAME = "light";
const _DARK_MODE_CLASS_NAME = "dark";

function j(a, b) {
  const c = [];
  c.push(a + " {");
  for (const d in b) {
    a = b[d];
    c.push("  --" + d + ": " + a + ";")
  }
  c.push("}");
  return c.join("\n")
}

function k() {
  const a = document.createElement("style");
  a.setAttribute("type", "text/css");
  a.setAttribute("data-styled", "true");
  var b = document.head || document.getElementsByTagName("head")[0];
  b || console.warn("Error here!");
  b.appendChild(a);
  return a
}

function l() {
  return typeof window !== "undefined" && window.CSS != null && window.CSS.supports != null && window.CSS.supports("--fake-var:0")
}
const m = /var\(--(.*?)\)/g;

class StyleXSheet {
  constructor(props = {}) {
    let c;
    this.tag = null;
    this.injected = false;
    this.ruleForPriority = new Map();
    this.rules = [];
    this.rootTheme = props.rootTheme;
    this.rootDarkTheme = props.rootDarkTheme;
    this.isSlow = (c = props.isSlow) != null ? c : typeof location === "object" && typeof location.search === "string" ? location.search.includes("stylex-slow") : !1;
    this.supportsVariables = (c = props.supportsVariables) != null ? c : l();
    this._isRTL = false; // TODO: need RTL from runtime
    this.externalRules = new Set()
  }

  getVariableMatch() {
    return m
  }

  isHeadless() {
    return this.tag == null || !ExecutionEnvironment.canUseDOM
  }

  getTag() {
    let a = this.tag;
    a != null || console.warn("TODO: ???");
    return a
  }

  getCSS() {
    return this.rules.join("\n")
  }

  getRulePosition(a) {
    return this.rules.indexOf(a)
  }

  getRuleCount() {
    return this.rules.length
  }

  inject() {
    if (this.injected) return;
    this.injected = !0;
    if (!ExecutionEnvironment.canUseDOM) {
      this.injectTheme();
      return
    }
    this.tag = k();
    this.injectTheme()
  }

  injectTheme() {
    this.rootTheme != null && this.insert(j(":root, ." + _LIGHT_MODE_CLASS_NAME, this.rootTheme), 0), this.rootDarkTheme != null && this.insert(j("." + _DARK_MODE_CLASS_NAME + ":root, ." + _DARK_MODE_CLASS_NAME, this.rootDarkTheme), 0)
  }

  __injectCustomThemeForTesting(a, b) {
    b != null && this.insert(j(a, b), 0)
  }

  delete(a) {
    var b = this.rules.indexOf(a);
    b >= 0 || console.warn("TODO: ???");
    this.rules.splice(b, 1);
    if (this.isHeadless()) return;
    a = this.getTag();
    if (this.isSlow) a.removeChild(a.childNodes[b + 1]);
    else {
      a = a.sheet;
      a || console.warn("TODO: ???");
      a.deleteRule(b)
    }
  }

  normalizeRule(a) {
    var b = this.rootTheme;
    return this.supportsVariables || b == null ? a : a.replace(m, function (a, c) {
      return b[c]
    })
  }

  getInsertPositionForPriority(a) {
    var b = this.ruleForPriority.get(a);
    if (b != null) return this.rules.indexOf(b) + 1;
    b = Array.from(this.ruleForPriority.keys()).sort(function (a, b) {
      return b - a
    }).filter(function (b) {
      return b > a ? 1 : 0
    });
    if (b.length === 0) return this.getRuleCount();
    b = b.pop();
    return this.rules.indexOf(this.ruleForPriority.get(b))
  }

  insert(a, b, c) {
    this.injected === !1 && this.inject();
    c = this._isRTL && c != null ? c : a;
    if (this.externalRules.has(c.slice(0, c.indexOf("{")).trim())) return;
    if (this.rules.includes(c)) return;
    a = this.normalizeRule(c);
    if (this.externalRules.has(a.slice(0, a.indexOf("{")).trim())) return;
    c = this.getInsertPositionForPriority(b);
    this.rules.splice(c, 0, a);
    this.ruleForPriority.set(b, a);
    if (this.isHeadless()) return;
    b = this.getTag();
    if (this.isSlow) {
      var d = document.createTextNode(a);
      b.insertBefore(d, b.childNodes[c])
    } else {
      d = b.sheet;
      if (d != null) try {
        d.insertRule(a, c)
      } catch (a) {}
    }
  }
}

module.exports = StyleXSheet;


/***/ }),

/***/ "../../node_modules/@ladifire-opensource/stylex-theme/src/index.js":
/*!********************************************************************************************!*\
  !*** /home/cong/Github/stylex/node_modules/@ladifire-opensource/stylex-theme/src/index.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) Ladifire, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const CometStylexSheet = __webpack_require__(/*! ./CometStyleXSheet */ "../../node_modules/@ladifire-opensource/stylex-theme/src/CometStyleXSheet.js");
const StyleXSheet = __webpack_require__(/*! ./StyleXSheet */ "../../node_modules/@ladifire-opensource/stylex-theme/src/StyleXSheet.js");

module.exports = CometStylexSheet;


/***/ }),

/***/ "../../node_modules/@ladifire-opensource/stylex-theme/src/utils.js":
/*!********************************************************************************************!*\
  !*** /home/cong/Github/stylex/node_modules/@ladifire-opensource/stylex-theme/src/utils.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) Ladifire, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

const ExecutionEnvironment = {
  canUseDOM: canUseDOM,
  canUseWorkers: typeof Worker !== 'undefined',
  canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),
  canUseViewport: canUseDOM && !!window.screen
};

module.exports = ExecutionEnvironment;


/***/ }),

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
var CometStyleXSheet = __webpack_require__(/*! @ladifire-opensource/stylex-theme */ "../../node_modules/@ladifire-opensource/stylex-theme/index.js");

CometStyleXSheet.rootStyleSheet.injectTheme();
var g = false;

function h(a) {
  a = a.reverse();
  var b = {};

  while (a.length) {
    var c = a.pop();

    if (Array.isArray(c)) {
      for (var d = c.length - 1; d >= 0; d--) {
        a.push(c[d]);
      }

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

function stylex() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  for (var a = arguments.length, b = new Array(a), c = 0; c < a; c++) {
    b[c] = arguments[c];
  }

  var d = h(b),
      e = "";

  for (var f in d) {
    if (Boolean(d[f])) if (typeof d[f] === "string") e += e ? " " + d[f] : d[f];else if (typeof d[f] === "object") {
      var g = d[f];

      for (var i in g) {
        var j = g[i];
        e += e ? " " + j : j;
      }
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


stylex.create = function () {
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
  for (var a = arguments.length, b = new Array(a), c = 0; c < a; c++) {
    b[c] = arguments[c];
  }

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


stylex.inject = function (a, c) {
  var d = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
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

/***/ "../../node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?page=%2F&absolutePagePath=%2Fhome%2Fcong%2FGithub%2Fstylex%2Fpackages%2Fstylex-nextjs-examples%2Fpages%2Findex.tsx!./":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** /home/cong/Github/stylex/node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?page=%2F&absolutePagePath=%2Fhome%2Fcong%2FGithub%2Fstylex%2Fpackages%2Fstylex-nextjs-examples%2Fpages%2Findex.tsx ***!
  \****************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


    (window.__NEXT_P=window.__NEXT_P||[]).push(["/", function() {
      var mod = __webpack_require__(/*! ./pages/index.tsx */ "./pages/index.tsx")
      if(true) {
        module.hot.accept(/*! ./pages/index.tsx */ "./pages/index.tsx", function() {
          if(!next.router.components["/"]) return
          var updatedPage = __webpack_require__(/*! ./pages/index.tsx */ "./pages/index.tsx")
          next.router.update("/", updatedPage)
        })
      }
      return mod
    }]);
  

/***/ }),

/***/ "../../node_modules/react/index.js":
/*!***********************************************************************************************!*\
  !*** delegated ../../node_modules/react/index.js from dll-reference dll_6a8b4ec29c638404fa17 ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! dll-reference dll_6a8b4ec29c638404fa17 */ "dll-reference dll_6a8b4ec29c638404fa17"))("../../node_modules/react/index.js");

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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
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



var styles = {
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

/***/ 1:
/*!*********************************************************************************************************************************************************!*\
  !*** multi next-client-pages-loader?page=%2F&absolutePagePath=%2Fhome%2Fcong%2FGithub%2Fstylex%2Fpackages%2Fstylex-nextjs-examples%2Fpages%2Findex.tsx ***!
  \*********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! next-client-pages-loader?page=%2F&absolutePagePath=%2Fhome%2Fcong%2FGithub%2Fstylex%2Fpackages%2Fstylex-nextjs-examples%2Fpages%2Findex.tsx! */"../../node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?page=%2F&absolutePagePath=%2Fhome%2Fcong%2FGithub%2Fstylex%2Fpackages%2Fstylex-nextjs-examples%2Fpages%2Findex.tsx!./");


/***/ }),

/***/ "dll-reference dll_6a8b4ec29c638404fa17":
/*!*******************************************!*\
  !*** external "dll_6a8b4ec29c638404fa17" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = dll_6a8b4ec29c638404fa17;

/***/ })

},[[1,"static/runtime/webpack.js"]]]);
//# sourceMappingURL=index.js.map