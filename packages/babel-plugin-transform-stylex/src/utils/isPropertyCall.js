/**
 * Copyright (c) Ladifire, Inc. And its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const testASTShape = require("./testASTShape.js");

module.exports = function isPropertyCall(node, name) {
  return testASTShape(node, {
    parent: {
      type: "MemberExpression",
      parent: {
        type: "CallExpression",
        callee: {
          property: {
            name
          }
        }
      }
    }
  });
};
