ToDo: add notes about dev process

`npm install -g` will install this package globally, so if you make changes and want to quickly install and test them, run that. You could then run `npm link` to symlink the global version to this dev folder. I can't figure out how to do the same with yarn.

Once it's installed: run `js_safe_update` on a git repository, and it will:

a) look at all outdated packages (based on `yarn outdated`)
b) upgrade them one at a time
c) do one git commit per upgraded package, so it's easy to find the culprit if anything breaks

Note that although some isolated bits of code are TDD'd, the only real way to test is to install the package and run it on a repository that has packages that need upgrading.

# Ideas for future:

* make output WAY better - see https://www.npmjs.com/package/terminal-kit

* have some options - see https://developer.atlassian.com/blog/2015/11/scripting-with-node/#parsing-command-line-options for example

Example options to build in:

* push to git every `n` commits, so CI can run (eg. js_safe_update -p 2, to push every 2 commits)
* run a test command locally between each commit (eg. js_safe_update -t 'yarn test'), and skip the commit / discard changes if one fails
* upgrade only dev dependencies (eg. js_safe_update --dev-only)
