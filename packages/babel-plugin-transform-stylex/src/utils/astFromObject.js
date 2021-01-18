const t = require('@babel/types');

module.exports = function astFromObject(obj) {
  const ast = [];

  for (const name in obj) {
    const astValue = typeof obj[name] === 'object' ?
      astFromObject(obj[name]) :
      t.stringLiteral(obj[name]);
    const key = t.isValidIdentifier(name, false) ?
      t.identifier(name) :
      t.stringLiteral(name);

    ast.push(t.objectProperty(key, astValue));
  }

  return t.objectExpression(ast);
};
