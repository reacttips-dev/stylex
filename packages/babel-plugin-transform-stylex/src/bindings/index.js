/**
 * Copyright (c) Ladifire, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const {
  isPropertyCall,
} = require("../utils");
const handleCreateBindings = require("./handleCreateBindings");
const handleDedupeBindings = require("./handleDedupeBindings");
const handleKeyframesBindings = require("./handleKeyframesBindings");
const handleComposeBindings = require("./handleComposeBindings");

require("../utils/pollyfils.js");

function handleBinding(node, opts, path) {
  if (node.parentPath.isCallExpression()) return [];

  if (isPropertyCall(node, 'create')) {
    return handleCreateBindings(node, opts, path);
  }

  if (isPropertyCall(node, 'dedupe')) {
    return handleDedupeBindings(node, opts, path);
  }

  if (isPropertyCall(node, 'keyframes')) {
    return handleKeyframesBindings(node);
  }

  if (isPropertyCall(node, 'compose')) {
    return handleComposeBindings(node);
  }

  // TODO: throw an error if there're nothing match
  return ".aaa{color: red;}"
}

module.exports = function (bindings, opts, path) {
  return bindings
    // sort to process keyframes first
    .sort(function(binding) {
      return isPropertyCall(binding, 'keyframes') ? -1 : 1;
    })
    .flatMap(function(node) {
      return handleBinding(node, opts, path)
    });
};
