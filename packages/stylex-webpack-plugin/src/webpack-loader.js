/**
 * Copyright (c) Ladifire, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const chalk = require("chalk");
const babel = require('@babel/core');
const loaderUtils = require('loader-utils');
const path = require('path');

const babelPlugin = require("@ladifire-opensource/babel-plugin-transform-stylex");
const virtualModules = require('./virtualModules');

async function stylexLoader(input, inputSourceMap) {
  const {
    inlineLoader = '',
    inject = true,
    ...options
  } = loaderUtils.getOptions(this) || {};

  this.async();

  const { code, map, metadata } = await babel.transformAsync(input, {
    plugins: [[babelPlugin, Object.assign({}, options, {inject})]],
    inputSourceMap: inputSourceMap || true,
    sourceFileName: this.resourcePath,
    filename: path.basename(this.resourcePath),
    sourceMaps: true
  });

  try {
    if (metadata.stylex === undefined) {
      this.callback(null, input, inputSourceMap);
    } else if (inject) {
      this.callback(null, code, map);
    } else {
      const cssPath = loaderUtils.interpolateName(
        this,
        '[path][name].[hash:base64:7].css',
        {
          content: metadata.stylex
        }
      );

      virtualModules.writeModule(cssPath, metadata.stylex);

      const postfix = `import '${inlineLoader + cssPath}';`;
      this.callback(null, code + postfix, map);
    }
  } catch(e) {
    console.log(chalk.red(`\nAn error occur: ${e}`));
  }
}

module.exports = stylexLoader;
