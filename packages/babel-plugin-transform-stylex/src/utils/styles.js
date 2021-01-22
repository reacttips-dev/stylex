/**
 * Copyright (c) Ladifire, Inc. And its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const expandProperty = require("./expandProperty");
const resolvePathValue = require("./resolvePathValue");
const getDeclaration = require("./getDeclaration");
const isNestedObjects = require("./isNestedObjects");
const flattenStyles = require("./flattenStyles");

function expandProperties(obj) {
  const expanded = {};

  for (const key in obj) {
    const value = obj[key];

    if (isNestedObjects(value)) {
      expanded[key] = expandProperties(value);
    } else {
      for (const prop of expandProperty(key)) {
        if (prop in obj && prop !== key) {continue;}

        expanded[prop] = value;
      }
    }
  }

  return expanded;
}

function getStyles(binding) {
  return expandProperties(resolvePathValue(binding));
}

function generateStyles(styles) {
  return Object.values(styles)
    .flatMap(props => flattenStyles(props).map(getDeclaration));
}

function generateStylesForDedupe(styles) {
  return flattenStyles(styles).map(getDeclaration);
}

module.exports = {
  expandProperties,
  getStyles,
  generateStyles,
  generateStylesForDedupe
};
