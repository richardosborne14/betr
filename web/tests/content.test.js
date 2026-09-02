/*
  The content is the product, so it is the thing most worth a test. B1 will rewrite the words
  in web/content/*.js; these rules travel with them.
*/
const { test } = require('node:test');
const assert = require('node:assert');

const fears = require('../content/fears.js');
const doors = require('../content/whats-going-on.js');
const content = require('../lib/content.js');
const guards = require('../lib/guards.js');

test('every fear has its six parts, a lane, and a conditional belief', () => {
  assert.deepStrictEqual(content.validateFears(fears), []);
});

test('the second door points only at fears that exist', () => {
  assert.deepStrictEqual(content.validateDoors(doors, fears), []);
});

test('no more than twelve are visible without a "more" screen', () => {
  assert.ok(fears.length <= content.MAX_VISIBLE, fears.length + ' items');
});

test('no test and no drop line touches the habit itself', () => {
  for (const f of fears) {
    assert.ok(guards.checkTest(f.test).ok, f.id + ' test: ' + f.test);
    assert.ok(guards.checkTest(f.drop).ok, f.id + ' drop: ' + f.drop);
  }
});

test('the easiest and most universal three come first (scope §5.3c)', () => {
  assert.deepStrictEqual(fears.slice(0, 3).map((f) => f.id), ['no', 'help', 'strug']);
});

test('ids are stable: stored results point at them and they are never reused', () => {
  const ids = fears.map((f) => f.id);
  assert.strictEqual(new Set(ids).size, ids.length);
});

test('nothing in the content says any of the phrases that are never used', () => {
  const banned = [
    'digital cbt', 'improve your mental health', 'treats', 'reduces symptoms',
    'tracks your anxiety', 'irrational', 'streak'
  ];
  const all = JSON.stringify(fears) + JSON.stringify(doors);
  for (const phrase of banned) {
    assert.ok(all.toLowerCase().indexOf(phrase) === -1, 'content contains "' + phrase + '"');
  }
});
