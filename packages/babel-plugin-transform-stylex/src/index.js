/**
 * Copyright (c) Ladifire, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const handleBindings = require("./bindings");

const NAME = "@ladifire-opensource/stylex";

module.exports = function plugin({inject = true}) {
  let root;

  return {
    name: NAME,
    visitor: {
      Program(path) {
        root = path;
      },
      ImportDefaultSpecifier(path, state) {
        if (path.parent.source.value !== NAME) return;

        const importName = path.node.local.name;
        const bindings = path.scope.bindings[importName].referencePaths;

        // inject the result to metadata
        state.file.metadata.stylex = handleBindings(bindings, state.opts, root)
          // Remove duplicates
          .filter((e, i, a) => a.indexOf(e) === i)
          .join('');
      }
    },
  }
};
