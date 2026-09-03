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

/*
  B19. The cap moved off the list and onto the door, because the door is the way in now. What
  has to fit on a phone is the four to six worries behind whichever one was tapped — and each
  of those now carries its own sentence, so six is already a screenful. The whole list is only
  ever seen by somebody who reached the pick screen without going through a door.
*/
test('no door opens onto more than a phone screen of worries', () => {
  for (const d of doors.items) {
    assert.ok(d.worries.length <= content.MAX_PER_DOOR,
      d.id + ' opens onto ' + d.worries.length + ', and ' + content.MAX_PER_DOOR + ' is the cap');
  }
});

/*
  A worry behind no door is a worry almost nobody reaches. This is not a crash; it is an item
  quietly falling out of the product the next time a door is reworded, which is exactly the
  kind of thing that goes unnoticed until somebody asks where it went.
*/
test('every worry is behind at least one door, so something leads to all of them', () => {
  assert.deepStrictEqual(content.validateDoors(doors, worries), []);
});

test('no test and no drop line touches the habit itself', () => {
  for (const f of worries) {
    assert.ok(guards.checkTest(f.test).ok, f.id + ' test: ' + f.test);
    assert.ok(guards.checkTest(f.drop).ok, f.id + ' drop: ' + f.drop);
  }
});

/*
  Scope §5.3c, as B19 leaves it. The rule has not changed and the shape it applies to has: it
  used to be "the easiest three come first" on one flat list, and a flat list is no longer what
  anybody sees. So it is now per door — the first worry behind every one of them has to be
  startable on the day it is tapped.

  Why it matters more than it sounds: most worries here wait on the world. Somebody has to ask
  you for something, a mistake has to exist, an evening has to be happening. If the first item
  behind a door is one of those, a person's first loop ends in "Didn't get to it" and they
  learn nothing on the one day they were certain to open this.

  The list below is held by hand, and deliberately: it is a judgement about each test, not
  something derivable from the file, so a reordering that breaks the rule shows up in a diff
  rather than passing quietly. A worry belongs here only if it can be started today by
  somebody who has nobody free and nothing in the diary.
*/
const STARTS_TODAY = ['sit', 'phone', 'feed', 'check', 'enough', 'rest', 'reply', 'praise', 'care'];

test('the first worry behind every door can be started on the day it is tapped', () => {
  for (const d of doors.items) {
    assert.ok(STARTS_TODAY.indexOf(d.worries[0]) !== -1,
      d.id + ' opens on "' + d.worries[0] + '", which waits on somebody else or on the day ' +
      '(scope §5.3c). Put one of these first: ' + STARTS_TODAY.join(', '));
  }
});

/* Every id on that list has to still be a worry, or the rule above is checking nothing. */
test('the starts-today list has not outlived the worries in it', () => {
  for (const id of STARTS_TODAY) {
    assert.ok(content.byId(worries, id), '"' + id + '" is on the starts-today list and is not a worry');
  }
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
