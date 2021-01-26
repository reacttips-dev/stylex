/**
 * Copyright (c) Ladifire, Inc. And its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const template = require('@babel/template').default;

module.exports = function injectStyles(_styles, path) {
  if (_styles && _styles.length > 0) {
    _styles.map((styleObject) => {
      if (styleObject) {
        const append = template('stylex.inject("' + `${styleObject.toString().replace(/"/g, '\\"')}` + '");');
        path.pushContainer('body', append());
      }
    });
  }
};
