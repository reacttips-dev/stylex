/**
 * Copyright (c) Ladifire, Inc. And its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const cssProperties = require("known-css-properties").all;

const normalizePseudoElements = require("./normalizePseudoElements");
const getClassHash = require("./getClassHash");
const isNestedObjects = require("./isNestedObjects");
const flattenStyles = require("./flattenStyles");
const camelToHyphen = require("./camelToHyphen");

function getClass(...args) {
  return getClassHash(JSON.stringify(args));
}

function getClassValues(styles, {atRules = [], pseudoSelectors = []} = {}) {
  const classes = {};

  for (const name in styles) {
    const value = styles[name];

    if (isNestedObjects(value)) {
      if (name.startsWith("@")) {
        classes[name] = getClassValues(value, {
          atRules: [...atRules, name],
          pseudoSelectors
        });
      } else if (name.startsWith(":")) {
        const normalizedName = normalizePseudoElements(name);
        classes[normalizedName] = getClassValues(value, {
          pseudoSelectors: [...pseudoSelectors, normalizedName],
          atRules
        });
      } else {
        throw new Error(`Invalid key ${name}`);
      }
    } else {
      classes[name] = getClass({name, value, atRules, pseudoSelectors});
    }
  }

  return classes;
}

function getClasses(obj) {
  const newObj = {};

  for (const key in obj) {
    newObj[key] = getClassValues(obj[key]);
  }

  return newObj;
}

function getClassesForDedupe(obj) {
  return getClassValues(obj);
}

function flattenClasses(classes) {
  return Object.fromEntries(
    Object.entries(classes)
      .map(([key, value]) => {
        const objValues = Object.fromEntries(
          flattenStyles(value)
            .map(({value, ...rest}) => [JSON.stringify(rest), value])
        );
        return [key, objValues];
      })
  );
}

function minifyProperty(name) {
  const hyphenName = camelToHyphen(name);
  if (cssProperties.includes(hyphenName)) {
    return cssProperties.indexOf(hyphenName).toString(36);
  }

  return getClassHash(hyphenName);
}

module.exports = {
  getClass,
  getClasses,
  getClassesForDedupe,
  flattenClasses,
  minifyProperty
};
