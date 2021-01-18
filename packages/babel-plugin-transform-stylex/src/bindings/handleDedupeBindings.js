/**
 * Copyright (c) Ladifire, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const injectStyles = require("../utils/injectStyles");
const replaceDeclaration = require("../utils/replaceDeclaration");
const stylesUtils = require("../utils/styles");
const minifyProperties = require("../utils/minifyProperties");
const classNamesUtils = require("../utils/classNames");

// return a string[] of css
function doDedupe(path, opts, root) {
  let styles = stylesUtils.getStyles(path);
  let classes = classNamesUtils.getClassesForDedupe(styles);

  if (opts.minifyProperties) {
    const minifiedClasses = Object.fromEntries(
      Object.entries(classes)
        .map(([key, value]) => [key, minifyProperties(value)])
    );
    replaceDeclaration(path, minifiedClasses);
  } else {
    replaceDeclaration(path, classes);
  }

  const _styles = stylesUtils.generateStylesForDedupe(styles);
  injectStyles(_styles, root);

  return _styles;
}

module.exports = function handleDedupeBindings(identifier, opts, path) {
  const callExpr = identifier.parentPath.parentPath;
  const objsExpr = callExpr.get('arguments');

  let _finalStyles = [];

  if (objsExpr && objsExpr.length > 0) {
    objsExpr.forEach(function(objExpr) {
      // check if objExpr is style Object or Ternary operator
      if (objExpr.isObjectExpression()) {
        const _styles = doDedupe(objExpr, opts, path);
        _finalStyles = _finalStyles.concat(_styles);
      } else if (objExpr.isConditionalExpression()) {
        // test if ternary operator
        const consequent = objExpr.get("consequent");
        const alternate = objExpr.get("alternate");

        if (consequent && consequent.isObjectExpression()) {
          const _consequentStyles = doDedupe(consequent, opts, path);
          if (_consequentStyles && _consequentStyles.length > 0) {
            _finalStyles = _finalStyles.concat(_consequentStyles);
          }
        }

        if (alternate && alternate.isObjectExpression()) {
          const _alternateStyles = doDedupe(alternate, opts, path);
          if (_alternateStyles && _alternateStyles.length > 0) {
            _finalStyles = _finalStyles.concat(_alternateStyles);
          }
        }

      } else {
        // TODO:
      }
    })
  }

  // only inject this to js, if there's an option {inject: true}
  if (opts && opts.inject) {
    injectStyles(_finalStyles, path);
  }

  // always return cssString to stream
  return _finalStyles;
};
