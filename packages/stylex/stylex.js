/**
 * Copyright (c) Ladifire, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const CometStyleXSheet = require("@ladifire-opensource/stylex-theme");

CometStyleXSheet.rootStyleSheet.injectTheme();

var g = false;

function h(a) {
    a = a.reverse();
    const b = {};
    while (a.length) {
        var c = a.pop();
        if (Array.isArray(c)) {
            for (var d = c.length - 1; d >= 0; d--) a.push(c[d]);
            continue
        }
        d = c;
        if (d != null && typeof d === "object")
            for (var e in d) {
                c = d[e];
                if (typeof c === "string") b[e] = c;
                else if (typeof c === "object") {
                    var f;
                    b[e] = (f = b[e]) != null ? f : {};
                    Object.assign(b[e], c)
                }
            }
    }
    return b
}

function stylex(...args) {
    for (var a = arguments.length, b = new Array(a), c = 0; c < a; c++) b[c] = arguments[c];
    var d = h(b),
        e = "";
    for (var f in d)
        if (Boolean(d[f]))
            if (typeof d[f] === "string") e += e ? " " + d[f] : d[f];
            else if (typeof d[f] === "object") {
                var g = d[f];
                for (var i in g) {
                    var j = g[i];
                    e += e ? " " + j : j
                }
            }
    return e
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
stylex.create = function(...args) {
    throw new Error("stylex.create should never be called. It should be compiled away.")
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
stylex.dedupe = function() {
    return stylex.apply(undefined, arguments)
};

/**
 * Compose multiple styles object into one
 * */
stylex.compose = function () {
    for (var a = arguments.length, b = new Array(a), c = 0; c < a; c++) b[c] = arguments[c];
    return h(b)
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
    throw new Error("stylex.keyframes should never be called. It should be compiled away.")
};

/**
 * Inject compiled styles to css stylesheet if need (if it's never injected before)
 * */
stylex.inject = function (a, c, d = null) {
  d === void 0 && (d = null), !g && (g = !0), CometStyleXSheet.rootStyleSheet.insert(a, c, d)
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
