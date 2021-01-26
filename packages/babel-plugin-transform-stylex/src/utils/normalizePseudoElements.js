const LEGACY_PSEUDO_ELEMENTS = require('../utils/constants').LEGACY_PSEUDO_ELEMENTS;

module.exports = function normalizePseudoElements(string) {
  if (LEGACY_PSEUDO_ELEMENTS.includes(string)) {
    return ':' + string;
  }

  return string;
};
