const isCustomProperty = require('./isCustomProperty');
const BASE_FONT_SIZE_PX = require('./constants').BASE_FONT_SIZE_PX;
const UNITLESS_NUMBERS = require('./constants').UNITLESS_NUMBERS;

module.exports = function normalizeValue(prop, value) {
  if (isCustomProperty(prop)) {return value;}

  if (typeof value === 'number') {
    if (prop === 'fontSize') {return `${value / BASE_FONT_SIZE_PX}rem`;}
    if (!UNITLESS_NUMBERS.includes(prop)) {return `${value}px`;}
  }

  if (Array.isArray(value)) {return value.slice().join(' ');}

  return value;
};
