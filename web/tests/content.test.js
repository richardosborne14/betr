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

/*
  B20. The three predictions under a worry, and the two rules that keep them worth the tap.

  The field sweep is the same one a place on the Help screen and an explanation get, and it
  is here for the same reason: with two fields and no third there is nowhere to hang a lane,
  a condition or a second version, so which of the three a person reads can never be decided
  for them by anything they entered (research §5.2). The three are on the screen together,
  in a fixed order, always.
*/
test('a belief a person chooses between can never be aimed at them', () => {
  const fields = new Set();
  for (const f of worries) for (const b of f.beliefs) Object.keys(b).forEach((k) => fields.add(k));
  assert.deepStrictEqual([...fields].sort(), ['belief', 'expect']);
});

/*
  Three that predict the same thing are one prediction and two wasted taps, and that is the
  easy mistake to make writing sixty-three sentences in an evening. validateWorries catches
  two that are word for word; this catches two that are the same sentence with the ends
  swapped, which is what it actually looks like when it happens.
*/
test('the three under one worry are three different predictions', () => {
  for (const f of worries) {
    const shapes = f.beliefs.map((b) =>
      b.belief.toLowerCase().replace(/[^a-z ]+/g, ' ').split(/\s+/).filter(Boolean).sort().join(' '));
    assert.strictEqual(new Set(shapes).size, 3, f.id + ' offers the same prediction twice');
    for (const b of f.beliefs) {
      assert.match(b.belief, /^If /, f.id + ': "' + b.belief + '" is not conditional');
      assert.match(b.belief, /, then /, f.id + ': "' + b.belief + '" does not say what then');
    }
  }
});

/*
  The one on the card is the loose one, and it has a different job: it is read on a list of
  four to six, to work out which worry this is. The three inside are read one screen later,
  one at a time, to work out which prediction is yours. If the card sentence is word for word
  one of the three, the second screen has a right answer already ticked on the first, and
  that is the guess B20 exists to stop making.
*/
test('the sentence on the card is the loose one, not one of the three', () => {
  for (const f of worries) {
    for (const b of f.beliefs) {
      assert.notStrictEqual(b.belief, f.belief,
        f.id + ' puts one of its three on the card, which pre-answers the next screen');
    }
  }
});

/*
  B27 item 3, 2026-09-04, and it came out of a walk rather than a read.

  Behind door one, one above the other on the same screen: `early` — "If I leave early, then it
  costs me something with them" — and `strug` — "If I let someone see I'm struggling, then it
  costs me something with them". The consequence clause is word for word the same. The test
  above catches two of the THREE under one worry repeating each other; nothing looked across
  worries, and nothing looked at the card sentence at all, which is the one drawn on a list of
  four to six where a person is choosing between them.

  Two worries that end the same way are, on that screen, one worry with two beginnings.

  KNOWN is held by hand, like STARTS_TODAY below, and for the same reason: whether two worries
  are really one is a judgement about the words, and it belongs to the paid CBT reviewer and to
  Misha, not to a session. Until they read it, the pair is written down here so it shows in a
  diff and so nothing NEW joins it quietly. The test under it fails once the pair stops being a
  duplicate — which is what forces the exemption out of this file on the day it is fixed.
*/
const KNOWN_SHARED_CONSEQUENCE = [
  /* door `habit`, waiting on the CBT reviewer beside `strug`/`low` and `care`/`praise` (B1) */
  ['early', 'strug']
];

const consequenceOf = (sentence) => {
  const at = sentence.toLowerCase().indexOf(', then ');
  if (at === -1) return null;
  return sentence.slice(at + 7).toLowerCase().replace(/[^a-z ]+/g, ' ').replace(/\s+/g, ' ').trim();
};

const knownPair = (a, b) => KNOWN_SHARED_CONSEQUENCE.some((p) =>
  (p[0] === a && p[1] === b) || (p[0] === b && p[1] === a));

test('no two worries behind one door end the same way', () => {
  for (const d of doors.items) {
    const byEnding = new Map();
    for (const id of d.worries) {
      const ending = consequenceOf(content.byId(worries, id).belief);
      if (!ending) continue;
      const first = byEnding.get(ending);
      if (first && !knownPair(first, id)) {
        assert.fail('behind "' + d.id + '", "' + first + '" and "' + id + '" both end "' +
          ending + '". On that screen they are one worry with two beginnings.');
      }
      if (!first) byEnding.set(ending, id);
    }
  }
});

/*
  The other half of holding a list by hand: an exemption that has outlived what it exempts is
  an exemption nobody will ever remove. This fails the day the reviewer's answer is written
  into worries.js, and the fix is to delete the pair from the list above.
*/
test('every pair excused above is still the duplicate it was excused for', () => {
  for (const pair of KNOWN_SHARED_CONSEQUENCE) {
    const a = content.byId(worries, pair[0]);
    const b = content.byId(worries, pair[1]);
    assert.ok(a && b, pair.join('/') + ' is excused above and one of them is not a worry');
    assert.ok(doors.items.some((d) =>
      d.worries.indexOf(pair[0]) !== -1 && d.worries.indexOf(pair[1]) !== -1),
    pair.join('/') + ' is excused above and no door shows them together any more');
    assert.strictEqual(consequenceOf(a.belief), consequenceOf(b.belief),
      pair.join('/') + ' no longer share a consequence. Delete the pair from ' +
      'KNOWN_SHARED_CONSEQUENCE — the exemption has outlived the problem.');
  }
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
