/**
 * Copyright (c) Ladifire, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const template = require('@babel/template').default;

module.exports = function injectStyles(styles, path) {
  if (styles && styles.length > 0) {
    styles.map((styleObject) => {
      console.log("styleObject: ", styleObject);
      if (styleObject) {
        const append = template(`stylex.inject("` + `${styleObject.toString().replace(/"/g, '\\"')}` + `");`);
        path.pushContainer('body', append())
      }
    });
  }
};
