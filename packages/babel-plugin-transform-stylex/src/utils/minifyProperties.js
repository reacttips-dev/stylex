// some parts of this file is reference from: https://github.com/johanholmerin/style9
// thanks to: @johanholmerin

const classNamesUtils = require("./classNames");

module.exports = function minifyProperties(classes) {
  const minified = {};

  for (const key in classes) {
    const minifiedName = classNamesUtils.minifyProperty(key);
    const value = classes[key];

    minified[minifiedName] = typeof value === 'object' ?
      minifyProperties(value) :
      value;
  }

  return minified;
};
