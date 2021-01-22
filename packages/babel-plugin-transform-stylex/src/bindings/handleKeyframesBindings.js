/**
 * Copyright (c) Ladifire, Inc. And its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const chalk = require("chalk");
const t = require("@babel/types");

const injectStyles = require("../utils/injectStyles");
const stylesUtils = require("../utils/styles");
const keyframesUtils = require("../utils/keyframes");

module.exports = function handleKeyframesBindings(identifier, opts, path) {
  const callExpr = identifier.parentPath.parentPath;
  const objExpr = callExpr.get("arguments.0");
  let rules;
  let declaration = "";
  try {
    rules = stylesUtils.getStyles(objExpr);
    const {name, declaration: _declaration} = keyframesUtils.getKeyframes(rules);
    declaration = _declaration;
    callExpr.replaceWith(t.stringLiteral(name));
  } catch (e) {
    console.log(chalk.red(`\nAn error occur: ${e}`));
  }

  // only inject this to js, if there's an option {inject: true}
  if (opts && opts.inject) {
    injectStyles([declaration], path);
  }

  return declaration;
};
