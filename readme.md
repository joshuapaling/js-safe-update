ToDo: add notes about dev process

`npm install -g` will install this package globally, so if you make changes and want to quickly install and test them, run that. I can't figure out how to do the same with yarn.

Once it's installed: run `js_safe_update` on a git repository, and it will:

a) look at all outdated packages (based on `yarn outdated`)
b) upgrade them one at a time
c) do one git commit per upgraded package, so it's easy to find the culprit if anything breaks

Note that although some isolated bits of code are TDD'd, the only real way to test is to install the package and run it on a repository that has packages that need upgrading.
