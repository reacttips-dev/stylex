/**
 * Copyright (c) Ladifire, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const ExecutionEnvironment = require("./utils");

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
