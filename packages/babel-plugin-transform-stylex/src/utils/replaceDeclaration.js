const astFromObject = require('./astFromObject');

module.exports = function replaceDeclaration(node, classes) {
  try {
    node.replaceWith(astFromObject(classes));
  } catch (e) {
    console.log('ssss', e);
  }
};
