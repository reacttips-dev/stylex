/**
 * Copyright (c) Ladifire, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const getClass = require("./classNames").getClass;
const camelToHyphen = require("./camelToHyphen");
const normalizeValue = require("./normalizeValue");

module.exports = function getDeclaration({ name, value, atRules, pseudoSelectors }) {
  const cls = getClass({ name, value, atRules, pseudoSelectors });

  return (
    atRules.map(rule => rule + '{').join('') +
    '.' +
    cls +
    pseudoSelectors.join('') +
    '{' +
    camelToHyphen(name) +
    ':' +
    normalizeValue(name, value) +
    '}' +
    atRules.map(() => '}').join('')
  );
};
