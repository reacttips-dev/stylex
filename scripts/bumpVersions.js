/**
 * Copyright (c) Ladifire, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const fetch = require('node-fetch');
const exec = require('child_process').execSync;
const fs = require('fs');
const semver = require('semver');
const readline = require("readline");
const chalk = require('chalk');

let levels = {
  alpha: 1,
  beta: 2,
  rc: 3,
  released: 4
};

// Packages to release
let publicPackages = {
  '@ladifire-opensource/babel-plugin-transform-stylex': 'beta',
  '@ladifire-opensource/stylex': 'beta',
  '@ladifire-opensource/stylex-theme': 'beta',
  '@ladifire-opensource/stylex-webpack-plugin': 'beta',
  '@ladifire-opensource/stylex-nextjs-plugin': 'beta',
};

// Packages never to release
let excludedPackages = new Set([
  "@ladifire-opensource/stylex-angular-examples",
  "@ladifire-opensource/stylex-nextjs-examples",
  "@ladifire-opensource/stylex-reactjs-examples",
  "@ladifire-opensource/stylex-vuejs-examples",
]);

// Get dependency tree from yarn workspaces, and build full list of packages to release
// based on dependencies of the public packages.
let infoStr = "{\n";
infoStr += exec('yarn workspaces info --json').toString().split('\\n').slice(1, -2).join('\n').replace(/\\"/g, '"');
infoStr += "\n}";
infoStr += "\n}";
let info = JSON.parse(infoStr);
let releasedPackages = new Map();

let addPackage = (pkg, status) => {
  if (excludedPackages.has(pkg)) {
    return;
  }

  if (releasedPackages.has(pkg)) {
    let cur = releasedPackages.get(pkg);
    if (levels[status] > levels[cur.level] && !publicPackages[pkg]) {
      cur.status = status;
    }

    return;
  }

  releasedPackages.set(pkg, {
    location: info[pkg].location,
    status: publicPackages[pkg] || status
  });

  for (let dep of info[pkg].workspaceDependencies) {
    addPackage(dep, status);
  }
};

for (let pkg in publicPackages) {
  addPackage(pkg, publicPackages[pkg]);
}

run();

async function getExistingPackages() {
  // Find what packages already exist on npm
  let existing = new Set();
  let promises = [];
  for (let [name, {location}] of releasedPackages) {
    promises.push(
      fetch(`https://registry.npmjs.com/${name}`, {method: 'HEAD'})
        .then(res => {
          if (res.ok) {
            existing.add(name);
          }
        })
    );
  }

  await Promise.all(promises);
  return existing;
}

async function run() {
  let existingPackages = await getExistingPackages();
  let versions = getVersions(existingPackages);
  await promptVersions(versions);
  bumpVersions(versions);
  commit(versions);
}

function getVersions(existingPackages) {
  let versions = new Map();
  if (existingPackages.length > 0) {
    for (let [name, {location, status}] of releasedPackages) {
      let filePath = location + '/package.json';
      let pkg = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      // If the package already exists on npm, then increment the version
      // number to the correct status. If it's a new package, then ensure
      // the package.json version is correct according to the status.
      if (existingPackages.has(name)) {
        let newVersion = status === 'released'
          ? semver.inc(pkg.version, 'patch')
          : semver.inc(pkg.version, 'prerelease', status)
        versions.set(name, [pkg.version, newVersion, pkg.private]);
      } else {
        let parsed = semver.parse(pkg.version);
        let newVersion = pkg.version;
        if (parsed.prerelease.length > 0) {
          if (status === 'released') {
            newVersion = semver.inc(pkg.version, 'patch');
          } else if (parsed.prerelease[0] !== status) {
            newVersion = semver.inc(pkg.version, 'prerelease', status);
          } else {
            parsed.prerelease[1] = 0;
            newVersion = parsed.format();
          }
        } else {
          if (status === 'released') {
            newVersion = '3.0.0';
          } else {
            newVersion = semver.inc(pkg.version, 'prerelease', status);
          }
        }

        versions.set(name, [pkg.version, newVersion, pkg.private]);
      }
    }
  } else {
    for (let [name, {location, status}] of releasedPackages) {
      console.log("___status", status);
      let filePath = location + '/package.json';
      let pkg = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      let parsed = semver.parse(pkg.version);
      let newVersion = pkg.version;
      if (parsed.prerelease.length > 0) {
        if (status === 'released') {
          newVersion = semver.inc(pkg.version, 'patch');
        } else if (parsed.prerelease[0] !== status) {
          newVersion = semver.inc(pkg.version, 'prerelease', status);
        } else {
          parsed.prerelease[1] = 0;
          newVersion = parsed.format();
        }
      } else {
        if (status === 'released') {
          newVersion = '1.0.0';
        } else {
          newVersion = semver.inc(pkg.version, 'prerelease', status);
        }
      }

      versions.set(name, [pkg.version, newVersion, pkg.private]);
    }
  }

  return versions;
}

async function promptVersions(versions) {
  console.log('');
  for (let [name, [oldVersion, newVersion, private]] of versions) {
    if (newVersion !== oldVersion || private) {
      console.log(`${name}: ${chalk.blue(oldVersion)}${private ? chalk.red(' (private)') : ''} => ${chalk.green(newVersion)}`);
    }
  }

  let loggedSpace = false;
  for (let name in info) {
    if (!releasedPackages.has(name) && !excludedPackages.has(name)) {
      let filePath = info[name].location + '/package.json';
      let pkg = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      if (!pkg.private) {
        if (!loggedSpace) {
          console.log('');
          loggedSpace = true;
        }

        console.warn(chalk.red(`${name} will change from public to private`));
      }
    }
  }

  console.log('');

  let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve, reject) => {
    rl.question('Do you want to continue? (y/n) ', function(c) {
      rl.close();
      if (c === 'n') {
        reject('Not continuing');
      } else if (c === 'y') {
        resolve();
      } else {
        reject('Invalid answer');
      }
    });
  });
}

function bumpVersions(versions) {
  for (let [name, {location}] of releasedPackages) {
    let filePath = location + '/package.json';
    let pkg = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    pkg.version = versions.get(name)[1];

    if (pkg.private) {
      delete pkg.private;
    }

    for (let dep in pkg.dependencies) {
      if (versions.has(dep)) {
        let {status} = releasedPackages.get(dep);
        pkg.dependencies[dep] = (status === 'released' ? '^' : '') + versions.get(dep)[1];
      }
    }

    fs.writeFileSync(filePath, JSON.stringify(pkg, false, 2) + '\n');
  }

  for (let name in info) {
    if (!releasedPackages.has(name) && !excludedPackages.has(name)) {
      let filePath = info[name].location + '/package.json';
      let pkg = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      if (!pkg.private) {
        pkg = insertKey(pkg, 'license', 'private', true);
      }

      for (let dep in pkg.dependencies) {
        if (versions.has(dep)) {
          let {status} = releasedPackages.get(dep);
          pkg.dependencies[dep] = (status === 'released' ? '^' : '') + versions.get(dep)[1];
        }
      }

      fs.writeFileSync(filePath, JSON.stringify(pkg, false, 2) + '\n');
    }
  }
}

function commit(versions) {
  exec('git commit -a -m "Publish"', {stdio: 'inherit'});
  for (let [name, [, newVersion]] of versions) {
    exec(`git tag ${name}@${newVersion}`, {stdio: 'inherit'});
  }
}

function insertKey(obj, afterKey, key, value) {
  let res = {};
  for (let k in obj) {
    res[k] = obj[k];
    if (k === afterKey) {
      res[key] = value;
    }
  }

  return res;
}
