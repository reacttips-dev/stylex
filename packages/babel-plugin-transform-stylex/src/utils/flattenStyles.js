// some parts of this file is reference from: https://github.com/johanholmerin/style9
// thanks to: @johanholmerin

const normalizePseudoElements = require('./normalizePseudoElements');
const isNestedObjects = require('./isNestedObjects');

module.exports = function flattenStyles(styles, {atRules = [], pseudoSelectors = []} = {}) {
  const flatStyles = [];

  for (const name in styles) {
    const value = styles[name];

    if (isNestedObjects(value)) {
      if (name.startsWith('@')) {
        flatStyles.push(...flattenStyles(value, {
          atRules: [...atRules, name],
          pseudoSelectors
        }));
      } else if (name.startsWith(':')) {
        const normalizedName = normalizePseudoElements(name);
        flatStyles.push(...flattenStyles(value, {
          pseudoSelectors: [...pseudoSelectors, normalizedName],
          atRules
        }));
      } else {
        throw new Error(`Invalid key ${name}`);
      }
    } else {
      flatStyles.push({name, value, atRules, pseudoSelectors});
    }
  }

  return flatStyles;
};
