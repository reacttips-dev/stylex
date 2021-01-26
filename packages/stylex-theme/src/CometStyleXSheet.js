/**
 * Copyright (c) Ladifire, Inc. And its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const StylexSheet = require('./StyleXSheet');

class _CometStyleXSheet extends StylexSheet {
  constructor(props = {}) {
    super(props);

    this.rootTheme = props.rootTheme || {};
    this.customTheme = props.customTheme || {};

    this.injectThemeVariables = function (data, themeKey = 'root') {
      if (themeKey === 'root') {
        this.rootTheme = Object.assign(this.rootTheme, data);
      } else {
        this.customTheme = Object.assign(this.customTheme, data);
      }
    };
  }
}

const _rootStyleSheet = new _CometStyleXSheet();

module.exports = {
  CometStyleXSheet: _CometStyleXSheet,
  rootStyleSheet: _rootStyleSheet
};
