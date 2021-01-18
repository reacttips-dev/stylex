/**
 * Copyright (c) Ladifire, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

class StylexPlugin {
  constructor() {
    console.log("xsdfsdfasf");
  }

  apply(compiler) {

  }
}

module.exports = StylexPlugin;
module.exports.loader = require.resolve('./webpack-loader.js');
