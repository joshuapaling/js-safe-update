#!/usr/bin/env node
const ChildProcess = require('child_process');
const GitRepo = require('./gitRepo');
const parseYarnOutdated = require('./parseYarnOutdated');

GitRepo.failIfRepoHasChanges();

const outdatedPackages = parseYarnOutdated();
outdatedPackages.forEach(pkg => {
  console.log(`updating: ${pkg.package}...`);
  const result = ChildProcess.execSync(
    `yarn upgrade ${pkg.package} --ignore-engines`
  ).toString();
  console.log('result: ', result);
  console.log(`commiting: update ${pkg.package}...`);
  ChildProcess.execSync(`git add yarn.lock`).toString();
  let commitResult;
  try {
    commitResult = ChildProcess.execSync(
      `git commit -m 'update ${pkg.package}'`
    ).toString();
  } catch (e) {
    commitResult = e.stdout.toString();
  }
  console.log('commitResult: ', commitResult);
});
