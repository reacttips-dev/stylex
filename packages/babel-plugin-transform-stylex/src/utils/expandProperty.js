const constants = require('../utils/constants');

module.exports = function expandProperty(prop) {
  return constants.SHORTHAND_EXPANSIONS[prop] || [prop];
};
