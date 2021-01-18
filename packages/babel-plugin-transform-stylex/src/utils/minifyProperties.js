/**
 * Copyright (c) Ladifire, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const classNamesUtils = require("./classNames");

module.exports = function minifyProperties(classes) {
  const minified = {};

  for (const key in classes) {
    const minifiedName = classNamesUtils.minifyProperty(key);
    const value = classes[key];

    minified[minifiedName] = typeof value === 'object' ?
      minifyProperties(value) :
      value;
  }

  return minified;
};
