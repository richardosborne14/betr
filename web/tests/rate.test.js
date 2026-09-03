/*
  The ladder. Five words, ten rungs, one belief at a time — and nothing added up anywhere.

  The test that matters most here is "three days of a bit less sure actually moves three
  times". That was the bug: the words were relative, the stored numbers were fixed, and a
  person doing the same test all week saw the same number every day.
*/
const { test } = require('node:test');
const assert = require('node:assert');
const rate = require('../lib/rate.js');

/*
  B15 took the five words out of rate.js so they can be translated. This file still holds the
  founder's five to the order and the distance they move — that is the part that has to be the
  same in every language — and reads the words themselves out of the string file.
*/
const strings = require('../content/strings-en.js');

test('the words are the ones the founder approved, and "more sure" is the quiet one', () => {
  assert.deepStrictEqual(
    rate.CHOICES.map((c) => strings.s.rate[c.key]),
    ['Still sure', 'A bit less sure', 'A lot less sure', 'Not sure at all', 'More sure than before']
  );
  assert.deepStrictEqual(rate.CHOICES.filter((c) => c.quiet).map((c) => c.key), ['more']);
});

test('there are five words and no slider anywhere', () => {
  assert.strictEqual(rate.CHOICES.length, 5);
  assert.ok(rate.CHOICES.every((c) => typeof strings.s.rate[c.key] === 'string'),
    'a re-rate word has no entry in strings-en.js');
  /* and nothing a person reads is left in the file that decides how far each one moves */
  const src = require('node:fs').readFileSync(require.resolve('../lib/rate.js'), 'utf8');
  const code = src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');
  assert.ok(code.indexOf('label:') === -1, 'the words are back in rate.js');
});

test('every belief starts at 10 and nothing ever leaves the ladder', () => {
  assert.strictEqual(rate.TOP, 10);
  assert.strictEqual(rate.FLOOR, 1);
  assert.strictEqual(rate.next(10, 'more'), 10, 'nothing goes above where it started');
  assert.strictEqual(rate.next(2, 'lot'), 1, 'nothing goes below 1');
  assert.strictEqual(rate.clamp(99), 10);
  assert.strictEqual(rate.clamp(-4), 1);
  assert.strictEqual(rate.clamp('nonsense'), 10);
});

test('"a bit less sure" three days running moves three times', () => {
  let at = rate.TOP;
  for (let i = 0; i < 3; i++) at = rate.next(at, 'bit');
  assert.strictEqual(at, 7);
});

test('each word moves the belief the distance it says', () => {
  assert.strictEqual(rate.next(8, 'still'), 8);
  assert.strictEqual(rate.next(8, 'bit'), 7);
  assert.strictEqual(rate.next(8, 'lot'), 5);
  assert.strictEqual(rate.next(8, 'none'), 1);
  assert.strictEqual(rate.next(8, 'more'), 9);
});

test('an unknown key gets nothing back, and moves nothing', () => {
  assert.strictEqual(rate.byKey('nope'), null);
  assert.strictEqual(rate.next(6, 'nope'), 6);
});

const at = (id, level, extra) => Object.assign(
  { source: 'stock', id, label: id, belief: 'If I ' + id + ', then something.', level, o: 'said fine' },
  extra || {}
);

test('results group into one ladder per belief, most recently tested first', () => {
  const groups = rate.series([at('no', 9), at('help', 8), at('no', 6)]);
  assert.deepStrictEqual(groups.map((g) => g.id), ['no', 'help']);
  assert.deepStrictEqual(groups.map((g) => g.tests), [2, 1]);
  assert.deepStrictEqual(groups[0].rungs, [9, 6], 'oldest tap first inside a ladder');
  assert.strictEqual(groups[0].level, 6, 'where the belief sits now');
});

test('a stock item keeps its ladder when its wording is rewritten', () => {
  const groups = rate.series([at('no', 9, { label: 'Old words' }), at('no', 7, { label: 'New words' })]);
  assert.strictEqual(groups.length, 1);
  assert.strictEqual(groups[0].tests, 2);
  assert.strictEqual(groups[0].label, 'New words', 'the newest wording wins');
});

test('two of a person’s own beliefs are two ladders, not one', () => {
  const own = (belief, level) => ({ source: 'own', id: null, label: 'Your own', belief, level, o: 'x' });
  const groups = rate.series([own('If I ask, they will sigh.', 9), own('If I rest, I am worthless.', 8)]);
  assert.strictEqual(groups.length, 2);
});

test('a belief never tested is at the top, not at nothing', () => {
  assert.strictEqual(rate.levelFor([], { source: 'stock', id: 'no' }), 10);
  assert.strictEqual(rate.levelFor([at('no', 4)], { source: 'stock', id: 'no' }), 4);
  assert.strictEqual(rate.levelFor([at('no', 4)], { source: 'stock', id: 'help' }), 10);
});

test('nothing in here totals, averages or compares two beliefs', () => {
  const src = require('node:fs').readFileSync(require.resolve('../lib/rate.js'), 'utf8');
  /* comments say what this must never become; the code has to actually not do it */
  const code = src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '').toLowerCase();
  for (const banned of ['average', 'total', 'score', 'streak', 'target', 'reduce(']) {
    assert.ok(code.indexOf(banned) === -1, 'found "' + banned + '" in the code');
  }
});
