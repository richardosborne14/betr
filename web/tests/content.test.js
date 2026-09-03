/*
  The content is the product, so it is the thing most worth a test. B1 will rewrite the words
  in web/content/*.js; these rules travel with them.
*/
const { test } = require('node:test');
const assert = require('node:assert');

const worries = require('../content/worries.js');
const doors = require('../content/whats-going-on.js');
const places = require('../content/places.js');
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
  const all = JSON.stringify(worries) + JSON.stringify(doors) + JSON.stringify(places);
  for (const phrase of banned) {
    assert.ok(all.toLowerCase().indexOf(phrase) === -1, 'content contains "' + phrase + '"');
  }
});
