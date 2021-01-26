/**
 * Copyright (c) Ladifire, Inc. And its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const constants = require('../utils/constants');

module.exports = function expandProperty(prop) {
  return constants.SHORTHAND_EXPANSIONS[prop] || [prop];
};
