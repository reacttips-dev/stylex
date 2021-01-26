const t = require('@babel/types');/*

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
