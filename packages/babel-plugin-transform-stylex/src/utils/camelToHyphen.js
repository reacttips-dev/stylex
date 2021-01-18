const isCustomProperty = require("./isCustomProperty");

module.exports = function camelToHyphen(string) {
  if (isCustomProperty(string)) return string;
  return string.replace(/[A-Z]/g, c => `-${c.toLowerCase()}`);
};
