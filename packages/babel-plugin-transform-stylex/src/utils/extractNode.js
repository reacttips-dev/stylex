const t = require('@babel/types');/*
 * Copyright 2020-present Ladifire. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/**
 * Move node to a constant and return an identifier.
 */
module.exports = function extractNode(path, node) {
  if (t.isIdentifier(node)) {return node;}

  const name = path.scope.generateUidBasedOnNode(node);

  if (path.scope.path.type !== 'Program') {
    path.scope.path.ensureBlock();
  }

  path.getStatementParent().insertBefore(
    t.variableDeclaration('const', [
      t.variableDeclarator(t.identifier(name), node)
    ])
  );

  return t.identifier(name);
};
