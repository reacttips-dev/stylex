/**
 * Copyright (c) Ladifire, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const babel = require("@babel/core");
const transform = require("@ladifire-opensource/babel-plugin-transform-stylex");

module.exports = function babelCliTransform(input, opts = {}) {
  const {
    code,
    ast,
    metadata: {stylex: styles}
  } = babel.transformSync(input, {plugins: [[transform, opts]]});

  return {
    code,
    ast,
    styles,
  };
};
