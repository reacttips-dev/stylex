const testASTShape = require('./testASTShape.js');

module.exports = function isPropertyCall(node, name) {
  return testASTShape(node, {
    parent: {
      type: 'MemberExpression',
      parent: {
        type: 'CallExpression',
        callee: {
          property: {
            name
          }
        }
      }
    }
  });
};
