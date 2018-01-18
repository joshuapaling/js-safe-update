const ChildProcess = require('child_process');
const chalk = require('chalk');

module.exports = {
  failIfRepoHasChanges() {
    const result = ChildProcess.execSync('git status --porcelain').toString();

    if (result.trim().length > 0) {
      console.error(
        chalk.red(
          'Commit or stash any outstanding changes before running js_safe_update'
        )
      );
      process.exit(1);
    }
  },

  yarnLockHasChanges() {
    const result = ChildProcess.execSync('git diff --name-only');
    return result.includes('yarn.lock');
  },

  commitYarnLock(message) {
    ChildProcess.execSync('git add Gemfile.lock');
    ChildProcess.execSync(`git commit -m ${message}`);
  },

  discardLocalChanges() {
    ChildProcess.execSync('git reset HEAD --hard');
  },

  push() {
    ChildProcess.execSync('git push');
  },
};
