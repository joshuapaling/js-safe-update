// This module runs `yarn outdated` and parses the output
// into a workable data structure in Ruby.
const ChildProcess = require('child_process');

function parseSingleLine(line) {
  const tokens = line.split(' ').filter(s => s !== '');
  return {
    package: tokens[0],
    current: tokens[1],
    wanted: tokens[2],
    latest: tokens[3],
  };
}

module.exports = function(output) {
  if (output) {
    // Output has been passed in - we do this for tests so we don't
    // have to actually execute `yarn outdated`.
  } else {
    try {
      output = ChildProcess.execSync('yarn outdated').toString();
    } catch (e) {
      // It is expected behaviour that if there are outdated dependencies,
      // `yarn outdated` returns a non-zero exit code, which makes
      // `ChildProcess.execSync` throw.
      // See https://github.com/yarnpkg/yarn/issues/3822
      output = e.stdout.toString();
    }
  }
  const lines = output.split('\n');

  const outdatedPackages = [];
  let finishedIntro = false;
  let reachedOutro = false;
  lines.forEach(line => {
    if (line.indexOf('Done in ') >= 0) {
      reachedOutro = true;
    }

    if (finishedIntro && !reachedOutro) {
      outdatedPackages.push(parseSingleLine(line));
    }

    if (line.indexOf('Package ') === 0) {
      finishedIntro = true;
    }
  });

  return outdatedPackages;
};
