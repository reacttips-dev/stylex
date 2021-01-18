/**
 * Copyright (c) Ladifire, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const stylesUtils = require("../utils").styles;
const classNames = require("../utils").classNames;
const filterObject = require("../utils").filterObject;
const replaceUseCalls = require("../utils").replaceUseCalls;
const replaceDeclaration = require("../utils").replaceDeclaration;
const injectStyles = require("../utils").injectStyles;

module.exports = function handleCreateBindings(identifier, opts, path) {
  const callExpr = identifier.parentPath.parentPath;
  const objExpr = callExpr.get('arguments.0');

  let styles = stylesUtils.getStyles(objExpr);
  let classes = classNames.getClasses(styles);

  const usedProperties = replaceUseCalls(callExpr.parentPath, classes);
  styles = filterObject(styles, usedProperties);
  classes = filterObject(classes, usedProperties);

  console.log("classes===", classes);

  replaceDeclaration(callExpr, classes);
  const stylesString = stylesUtils.generateStyles(styles);
  if (opts && opts.inject) {
    injectStyles(stylesString, path);
  }
  return stylesString

  //
  // if (opts.minifyProperties) {
  //   const minifiedClasses = Object.fromEntries(
  //     Object.entries(classes)
  //       .map(([key, value]) => [key, minifyProperties(value)])
  //   );
  //   replaceDeclaration(callExpr, minifiedClasses);
  // } else {
  //   replaceDeclaration(callExpr, classes);
  // }
  //
  // const _styles = generateStyles(styles);
  // injectStyles(_styles, path);
  // return _styles
};
