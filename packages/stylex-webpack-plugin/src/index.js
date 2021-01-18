/**
 * Copyright (c) Ladifire, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { SourceMapSource, RawSource } = require('webpack-sources');

const processCSS = require("./processCSS");
const virtualModules = require('./virtualModules');

// TODO: get it from package.json
const NAME = "@ladifire-opensource/stylex";

const flatMap = (arr, cb) => arr.flatMap ? arr.flatMap(cb) : [].concat(...arr.map(cb));

class StylexPlugin {
  constructor({ test = /\.css$/ } = {}) {
    this.test = test;
  }

  apply(compiler) {
    virtualModules.apply(compiler);

    compiler.hooks.compilation.tap(NAME, (compilation, callback) => {
      compilation.hooks.optimizeChunkAssets.tapPromise(NAME, async chunks => {

        const transforms = flatMap(chunks, (chunk) => {
          return chunk.files.filter(path => path.match(this.test));
        });

        if (transforms && transforms.length > 0) {
          for (const path of transforms) {
            const asset = compilation.assets[path];
            const { source, map } = asset.sourceAndMap();
            const postcssOpts = {
              to: path,
              from: path,
              map: { prev: map || false }
            };
            const result = processCSS(source, postcssOpts);

            if (result.map) {
              compilation.assets[path] = new SourceMapSource(
                result.css,
                path,
                JSON.parse(result.map),
                source,
                map,
                true
              );
            } else {
              compilation.assets[path] = new RawSource(result.css);
            }
          }
        }
      });
    });
  }
}

module.exports = StylexPlugin;
module.exports.loader = require.resolve('./webpack-loader.js');
