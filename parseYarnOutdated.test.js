const parseYarnOutdated = require('./parseYarnOutdated');

test('works when nothing is outdated', () => {
  const output = `yarn outdated v1.3.2
✨  Done in 0.26s.
`;
  const result = parseYarnOutdated(output);
  expect(result).toEqual([]);
});

test('works when packages are outdated', () => {
  const output = `yarn outdated v1.3.2
info Color legend :
 "<red>"    : Major Update backward-incompatible updates
 "<yellow>" : Minor Update backward-compatible features
 "<green>"  : Patch Update backward-compatible bug fixes
Package                    Current Wanted Latest  Package Type    URL
babel-eslint               6.1.2   6.1.3  8.2.1   devDependencies https://github.com/babel/babel-eslint
body-parser                1.15.2  1.15.2 1.18.2  dependencies    https://github.com/expressjs/body-parser#readme
cls-bluebird               2.0.1   2.1.0  2.1.0   dependencies    https://github.com/TimBeyer/cls-bluebird#readme
✨  Done in 1.79s.
`;
  const result = parseYarnOutdated(output);
  expect(result.length).toEqual(3);
  expect(result[0].package).toEqual('babel-eslint');
  expect(result[0].current).toEqual('6.1.2');
  expect(result[0].wanted).toEqual('6.1.3');
  expect(result[0].latest).toEqual('8.2.1');
});
