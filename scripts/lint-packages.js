/**
 * Copyright (c) Ladifire, Inc. And its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const glob = require('fast-glob');
const fs = require('fs');
const assert = require('assert');
const chalk = require('chalk');
let path = require('path');
let packages = glob.sync(path.resolve(__dirname, '../packages/{stylex,stylex-webpack-plugin,stylex-nextjs-plugin,stylex-theme,babel-plugin-transform-stylex}/package.json'));
let errors = false;

// soft assert won't fail the whole thing, allowing us to accumulate all errors at once
// there's probably a nicer way to do this, but well... sometimes it's good enough. feel free to update me :)
// maybe turn me into an actual eslint plugin so we get their format for styling
function softAssert(val, message) {
  try {
    assert(val, message);
  } catch {
    console.error(chalk.red(message));
    errors = true;
  }
}
softAssert.deepEqual = function (val, val2, message) {
  try {
    assert.deepEqual(val, val2, message);
  } catch {
    console.error(chalk.red(message));
    errors = true;
  }
};
softAssert.equal = function (val, val2, message) {
  try {
    assert.equal(val, val2, message);
  } catch {
    console.error(chalk.red(message));
    errors = true;
  }
};

let pkgNames = {};
for (let pkg of packages) {
  let json = JSON.parse(fs.readFileSync(pkg));
  pkgNames[json.name] = true;

  softAssert(json.publishConfig && json.publishConfig.access === 'public', `${pkg} has missing or incorrect publishConfig`);
  softAssert.equal(json.license, 'MIT', `${pkg} has an incorrect license`);
  softAssert.deepEqual(json.repository, {type: 'git', url: 'https://github.com/ladifire-opensource/stylex'}, `${pkg} has incorrect or missing repository url`);

  let readme = path.join(path.dirname(pkg), 'README.md');
  if (!fs.existsSync(readme)) {
    fs.writeFileSync(readme, `# ${json.name}\n\nThis package is part of [stylex](https://github.com/ladifire-opensource/stylex). See the repo for more details.`);
  }
}

if (errors) {
  return process.exit(1);
}
