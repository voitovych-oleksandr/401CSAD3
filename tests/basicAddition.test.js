const { add } = require('../src/index.js');

test('BasicAddition', () => {
  expect(add(2, 3)).toBe(5);
});
