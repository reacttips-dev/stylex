/**
 * Copyright (c) Ladifire, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const ExecutionEnvironment = require("./utils");

const _DEFAULT_THEME_CLASS_NAME = "__base";
const _CUSTOM_THEME_CLASS_NAME = "__custom";

function buildThemeVariables(themeKey, themeObj) {
  const variables = [];
  variables.push(themeKey + " {");
  for (const variable in themeObj) {
    const value = themeObj[variable];
    variables.push("  --" + variable + ": " + value + ";")
  }
  variables.push("}");
  return variables.join("\n")
}

function injectStyleSheet() {
  const style = document.createElement("style");
  style.setAttribute("type", "text/css");
  style.setAttribute("data-styled", "true");
  const head = document.head || document.getElementsByTagName("head")[0];
  head || console.error("Can not find head in html document!");
  head.appendChild(style);
  return style
}

function isSupportCSS() {
  return typeof window !== "undefined" && window.CSS != null && window.CSS.supports != null && window.CSS.supports("--fake-var:0")
}

function toggleClassName(doc, className, add) {
  add ? doc.classList.add(className) : doc.classList.remove(className)
}

const VARIABLE_REGEX = /var\(--(.*?)\)/g;

class StyleXSheet {
  constructor(props = {}) {
    let _supportVariables;
    let _isSlow;
    this.tag = null;
    this.injected = false;
    this.ruleForPriority = new Map();
    this.rules = [];
    this.rootTheme = props.rootTheme;
    this.customTheme = props.customTheme;
    this.isSlow = (_isSlow = props.isSlow) != null ? _isSlow : typeof location === "object" && typeof location.search === "string" ? location.search.includes("stylex-slow") : false;
    this.supportsVariables = (_supportVariables = props.supportsVariables) != null ? _supportVariables : isSupportCSS();
    this._isRTL = false; // TODO: need RTL from runtime
    this.externalRules = new Set()
  }

  setRootTheme(theme) {
    this.rootTheme = theme;
    this.injectTheme();
  }

  setCustomTheme(theme) {
    this.customTheme = theme;
    this.injectTheme();
  }

  getVariableMatch() {
    return VARIABLE_REGEX
  }

  isHeadless() {
    return this.tag == null || !ExecutionEnvironment.canUseDOM
  }

  getTag() {
    let _tag = this.tag;
    _tag != null || console.error("Tag is not found!");
    return _tag
  }

  getCSS() {
    return this.rules.join("\n")
  }

  getRulePosition(rule) {
    return this.rules.indexOf(rule)
  }

  getRuleCount() {
    return this.rules.length
  }

  inject() {
    if (this.injected) return;
    this.injected = true;
    if (!ExecutionEnvironment.canUseDOM) {
      this.injectTheme();
      return
    }
    this.tag = injectStyleSheet();
    this.injectTheme()
  }

  injectVariables(data, themeKey = "root") {
    if (themeKey === "root") {
      this.rootTheme = Object.assign(this.rootTheme, data);
    } else {
      this.customTheme = Object.assign(this.customTheme, data);
    }

    this.injectTheme()
  }

  toggleDocumentClassName(className, add) {
    if (!ExecutionEnvironment.canUseDOM) {
      return
    }

    const doc = window.document.documentElement;
    toggleClassName(doc, className, add)
  }

  toggleCustomTheme(active) {
    return this.toggleDocumentClassName("__custom", active)
  }

  injectTheme() {
    this.rootTheme != null && this.insert(buildThemeVariables(":root, ." + _DEFAULT_THEME_CLASS_NAME, this.rootTheme), 0);
    this.customTheme != null && this.insert(buildThemeVariables("." + _CUSTOM_THEME_CLASS_NAME + ":root, ." + _CUSTOM_THEME_CLASS_NAME, this.customTheme), 0)
  }

  __injectCustomThemeForTesting(themeKey, themeObject) {
    themeObject != null && this.insert(buildThemeVariables(themeKey, themeObject), 0)
  }

  delete(rule) {
    const ruleIndex = this.rules.indexOf(rule);
    ruleIndex >= 0 || console.error("TODO: ???");
    this.rules.splice(ruleIndex, 1);
    if (this.isHeadless()) return;
    const tag = this.getTag();
    if (this.isSlow) tag.removeChild(tag.childNodes[ruleIndex + 1]);
    else {
      const sheet = tag.sheet;
      sheet || console.error("Sheet not found!");
      sheet.deleteRule(ruleIndex)
    }
  }

  normalizeRule(rule) {
    const theme = this.rootTheme;
    return this.supportsVariables || theme == null ? rule : rule.replace(VARIABLE_REGEX, function (a, c) {
      return theme[c]
    })
  }

  getInsertPositionForPriority(priority) {
    const rule = this.ruleForPriority.get(priority);
    if (rule != null) return this.rules.indexOf(rule) + 1;
    let b = Array.from(this.ruleForPriority.keys()).sort(function (a, b) {
      return b - a
    }).filter(function (b) {
      return b > priority ? 1 : 0
    });
    if (b.length === 0) return this.getRuleCount();
    b = b.pop();
    return this.rules.indexOf(this.ruleForPriority.get(b))
  }

  insert(themeVariables, priority, c) {
    // ensure stylesheet was injected
    this.injected === false && this.inject();
    c = this._isRTL && c != null ? c : themeVariables;
    if (this.externalRules.has(c.slice(0, c.indexOf("{")).trim())) return;
    if (this.rules.includes(c)) return;
    const a = this.normalizeRule(c);
    if (this.externalRules.has(a.slice(0, a.indexOf("{")).trim())) return;
    c = this.getInsertPositionForPriority(priority);
    this.rules.splice(c, 0, a);
    this.ruleForPriority.set(priority, a);
    if (this.isHeadless()) return;
    const b = this.getTag();
    let d;
    if (this.isSlow) {
      d = document.createTextNode(a);
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
