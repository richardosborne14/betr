/*
  The content is the product, so it is the thing most worth a test. B1 will rewrite the words
  in web/content/*.js; these rules travel with them.
*/
const { test } = require('node:test');
const assert = require('node:assert');

const worries = require('../content/worries.js');
const doors = require('../content/whats-going-on.js');
const places = require('../content/places.js');
const why = require('../content/why.js');
const content = require('../lib/content.js');
const guards = require('../lib/guards.js');

test('every worry has its six parts, a lane, and a conditional belief', () => {
  assert.deepStrictEqual(content.validateWorries(worries), []);
});

test('the second door points only at worries that exist', () => {
  assert.deepStrictEqual(content.validateDoors(doors, worries), []);
});

test('every place on the Help screen is a plain https link with nothing attached', () => {
  assert.deepStrictEqual(content.validatePlaces(places), []);
});

/*
  A place has three fields and no fourth. That is what makes it impossible for the Help list
  to be chosen, ordered or filtered by anything the person entered — there is nowhere to hang
  the wiring off (research §5.2, B8).
*/
test('nothing on the Help list can ever be aimed at a person', () => {
  const fields = new Set();
  const every = places.reading.concat(...places.groups.map((g) => g.items));
  for (const place of every) Object.keys(place).forEach((k) => fields.add(k));
  assert.deepStrictEqual([...fields].sort(), ['name', 'url', 'what']);
  assert.ok(!/\blane\b|\bdoor\b|\bworr/i.test(Object.keys(places).join(' ')));
});

/*
  B18. The explanation behind "Why this one sticks" is fixed content keyed by a worry id, and
  the second and third assertions here are what keep it that way: no entry may survive the
  worry it explains, and an entry has two fields, so there is nowhere to put a rule that would
  show one person different words from another (research §5.2).
*/
test('every worry has an explanation, and nothing explains a worry that is gone', () => {
  assert.deepStrictEqual(content.validateWhy(why, worries), []);
});

test('an explanation can never be aimed at a person', () => {
  const fields = new Set();
  for (const id of Object.keys(why)) Object.keys(why[id]).forEach((k) => fields.add(k));
  assert.deepStrictEqual([...fields].sort(), ['what', 'why']);
  assert.deepStrictEqual(content.validateWhy({ no: { what: 'a', why: 'b', lane: 'social' } },
    [{ id: 'no' }]).length, 1);
});

/*
  It explains the loop; it never tells somebody how their own test will turn out. A worry that
  came true is data too, and pre-empting the answer would settle the experiment before it is
  run (CLAUDE.md rule 6).
*/
test('no explanation predicts the outcome of a test', () => {
  const foretelling = /\b(you|they|it|nobody|no one)\s+(will|won'’?t|will not)\b/i;
  for (const id of Object.keys(why)) {
    for (const field of ['what', 'why']) {
      assert.ok(!foretelling.test(why[id][field]), id + '.' + field + ' says what will happen');
    }
  }
});

test('no more than twelve are visible without a "more" screen', () => {
  assert.ok(worries.length <= content.MAX_VISIBLE, worries.length + ' items');
});

test('no test and no drop line touches the habit itself', () => {
  for (const f of worries) {
    assert.ok(guards.checkTest(f.test).ok, f.id + ' test: ' + f.test);
    assert.ok(guards.checkTest(f.drop).ok, f.id + ' drop: ' + f.drop);
  }
});

test('the easiest and most universal three come first (scope §5.3c)', () => {
  assert.deepStrictEqual(worries.slice(0, 3).map((f) => f.id), ['no', 'help', 'reply']);
});

test('ids are stable: stored results point at them and they are never reused', () => {
  const ids = worries.map((f) => f.id);
  assert.strictEqual(new Set(ids).size, ids.length);
});

test('nothing in the content says any of the phrases that are never used', () => {
  const banned = [
    'digital cbt', 'improve your mental health', 'treats', 'reduces symptoms',
    'tracks your anxiety', 'irrational', 'streak'
  ];
  const all = JSON.stringify(worries) + JSON.stringify(doors) + JSON.stringify(places) +
    JSON.stringify(why);
  for (const phrase of banned) {
    assert.ok(all.toLowerCase().indexOf(phrase) === -1, 'content contains "' + phrase + '"');
  }
});
