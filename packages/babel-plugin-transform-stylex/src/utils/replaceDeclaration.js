const astFromObject = require("./astFromObject");

module.exports = function replaceDeclaration(node, classes) {
  node.replaceWith(astFromObject(classes));
};
