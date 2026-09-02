/* Four words, four numbers, and nothing else. No score, no total, no trend. */
const { test } = require('node:test');
const assert = require('node:assert');
const rate = require('../lib/rate.js');

test('the four choices map to 80, 55, 30 and 10', () => {
  assert.deepStrictEqual(rate.CHOICES.map((c) => c.value), [80, 55, 30, 10]);
});

test('the labels are the ones the founder approved', () => {
  assert.deepStrictEqual(
    rate.CHOICES.map((c) => c.label),
    ['Still sure', 'A bit less sure', 'A lot less sure', 'Not sure at all']
  );
});

test('there are exactly four, and no slider anywhere', () => {
  assert.strictEqual(rate.CHOICES.length, 4);
});

test('an unknown key gets nothing back rather than a default', () => {
  assert.strictEqual(rate.valueOf('nope'), null);
  assert.strictEqual(rate.byKey('nope'), null);
});
