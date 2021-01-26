/**
 * Copyright (c) Ladifire, Inc. And its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Resolve the value of a node path.
 */
module.exports = function resolvePathValue(path) {
  const {value, confident, deopt} = path.evaluate();
  if (confident) {return value;}
  throw deopt.buildCodeFrameError('Could not evaluate value');
};
