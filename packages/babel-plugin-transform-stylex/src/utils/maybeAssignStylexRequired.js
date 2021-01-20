/**
 * Copyright (c) Ladifire, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const t = require('@babel/types');

module.exports = function maybeAssignStylexRequired(path, state) {
  if (
    t.isCallExpression(path.node.init) &&
    t.isIdentifier(path.node.init.callee) &&
    path.node.init.callee.name === 'require' &&
    path.node.init.arguments &&
    path.node.init.arguments[0] &&
    t.isLiteral(path.node.init.arguments[0]) &&
    path.node.init.arguments[0].value === "@ladifire-opensource/stylex"
  ) {
    state.stylexRequired = path.node.id.name
  }
};
