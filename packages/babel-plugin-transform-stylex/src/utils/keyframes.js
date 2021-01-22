// some parts of this file is reference from: https://github.com/johanholmerin/style9
// thanks to: @johanholmerin

const chalk = require("chalk");

const expandProperty = require("./expandProperty");
const camelToHyphen = require("./camelToHyphen");
const normalizeValue = require("./normalizeValue");
const getClass = require("./classNames").getClass;

function normalizeTime(time) {
  if (time === "from") {return "0%";}
  if (time === "to") {return "100%";}
  return time;
}

function stringifyKeyframes(rules) {
  let str = "";

  for (const time in rules) {
    if (!Object.keys(rules[time]).length) {continue;}

    str += `${normalizeTime(time)}{`;

    for (const key in rules[time]) {
      const value = rules[time][key];

      for (const prop of expandProperty(key)) {
        // Longhand takes precedent
        if (prop in rules[time] && prop !== key) {continue;}

        str += `${camelToHyphen(prop)}:${normalizeValue(prop, value)};`;
      }
    }

    // Remove last semicolon
    str = str.slice(0, -1) + "}";
  }

  return str;
}

function getKeyframes(rules) {
  const rulesString = stringifyKeyframes(rules);
  let name;
  try {
    name = getClass(rulesString);
  } catch (e) {
    console.log(chalk.red(`\nAn error occur: ${e}`));
  }
  const declaration = `@keyframes ${name}{${rulesString}}`;
  return {name, declaration};
}

module.exports = {
  getKeyframes,
  stringifyKeyframes
};
