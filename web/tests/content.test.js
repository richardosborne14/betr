/*
  The content is the product, so it is the thing most worth a test. B1 will rewrite the words
  in web/content/*.js; these rules travel with them.
*/
const { test } = require('node:test');
const assert = require('node:assert');

const worries = require('../content/worries.js');
const starts = require('../content/starts.js');
const examples = require('../content/examples.js');
const doors = require('../content/whats-going-on.js');
const places = require('../content/places.js');
const why = require('../content/why.js');
const content = require('../lib/content.js');
const guards = require('../lib/guards.js');

test('every worry has its six parts, a lane, and a conditional belief', () => {
  assert.deepStrictEqual(content.validateWorries(worries), []);
});

/* ------------------------------------------------- B30: the suggestions under the blanks */

test('every suggestion under a blank reads as part of the sentence and is safe to propose', () => {
  assert.deepStrictEqual(content.validateStarts(starts), []);
});

/*
  A start has four fields and no fifth, the way a place on Help has three and an explanation
  has two. The missing fifth is the point: with nowhere to hang a lane, a condition or a
  second version, which suggestions a person is offered can never be decided by anything they
  entered. It is decided by whether the first blank matches a start word for word, and if a
  future session adds fuzzy matching, that is the rule it would be breaking (research §5.2).
*/
test('a suggestion can never be aimed at a person', () => {
  const fields = new Set();
  for (const it of starts.items) Object.keys(it).forEach((k) => fields.add(k));
  assert.deepStrictEqual([...fields].sort(), ['dos', 'drops', 'if', 'thens']);
  assert.deepStrictEqual(Object.keys(starts.general).sort(), ['dos', 'drops', 'thens']);
  assert.ok(!/\blane\b|\bwhen\b|\bscore\b|\bif_?match/i.test(Object.keys(starts).join(' ')));
});

/*
  The chips are BETR proposing something, so rule 4 applies to them in full — the version of
  rule 4 that did NOT loosen on 2026-09-08. validateStarts checks every line; this checks that
  it is actually checking, because a word list that has stopped matching fails silently.
*/
test('nothing BETR suggests names the habit, the body, or anyone’s safety', () => {
  const lines = [];
  for (const it of starts.items.concat([starts.general])) {
    for (const f of ['thens', 'dos', 'drops']) lines.push(...it[f]);
    if (it.if) lines.push(it.if);
  }
  assert.ok(lines.length > 150, 'only ' + lines.length + ' suggestions: the file has shrunk');
  for (const line of lines) {
    for (const [kind, list] of [['harm', guards.HARM], ['habit', guards.HABIT], ['body', guards.BODY]]) {
      assert.strictEqual(guards.hit(line, list), null, kind + ' word in "' + line + '"');
    }
  }
  /* and the check itself still bites */
  assert.strictEqual(guards.hit('Have one beer', guards.HABIT), 'beer');
});

/* Every start has to make a sentence a person would actually say out loud. */
test('every start makes a whole sentence with the words the screen prints', () => {
  const en = require('../content/strings-en.js').s;
  for (const it of starts.items) {
    for (const then of it.thens) {
      const said = en.build.ifWord + ' ' + it.if + en.build.thenWord + ' ' + then + '.';
      assert.match(said, /^If I \S/, said);
      assert.match(said, /, then \S/, said);
      assert.ok(said.split(' ').length >= 8, 'too short to be a prediction: ' + said);
      assert.ok(!/  /.test(said), 'a doubled space in: ' + said);
    }
  }
});

/* ------------------------------------------------- B31: the worked example on the front */

/*
  The first thing anybody sees, and the one piece of content in BETR that is read before a
  person has agreed to anything. Three things are being held down and they are in order of
  what they would cost if they went.

  1. IT IS AN EXAMPLE, NOT A CLAIM. Shown as a real person's result it is a testimonial, and
     the MHRA reads a testimonial as an implied claim (research §5.2). So no name, nobody
     else's number, and none of the phrases that never appear anywhere.
  2. IT IS THE SAME SHAPE a person's own result will be, or it is an advert for something
     else: a conditional prediction, what actually happened, and a ladder from ten.
  3. IT IS BETR PROPOSING SOMETHING, so rule 4 applies in full — the version of rule 4 that
     did not loosen on 2026-09-08.
*/
test('every worked example is the same shape a person’s own result will be', () => {
  assert.ok(examples.length >= 1 && examples.length <= 4,
    'up to four: more is a gallery, and one per open stops being predictable');
  for (const ex of examples) {
    const keys = Object.keys(ex).sort().filter((k) => k !== 'dropped');
    assert.deepStrictEqual(keys, ['did', 'from', 'happened', 'prediction', 'to'],
      'an example is five fields and an optional sixth, so there is nowhere to aim one at a person');

    assert.match(ex.prediction, /^If I .+, then .+\.$/,
      'the prediction is not the shape the build screen makes: ' + ex.prediction);
    assert.strictEqual((ex.prediction.match(/[.!?]/g) || []).length, 1,
      'the prediction is more than one sentence: ' + ex.prediction);

    /*
      B38, and this is the assertion the whole beat exists for. The founder's daughter stalled
      at "What will you do today?" because nothing had shown her how small the doing is. A
      `did` that runs to two sentences teaches the opposite of what it is here to teach, and
      it is also 26px of a card that has 32px of clearance at 125% text.
    */
    for (const field of ['did'].concat(ex.dropped ? ['dropped'] : [])) {
      assert.strictEqual((ex[field].match(/[.!?](\s|$)/g) || []).length, 1,
        field + ' is more than one sentence: ' + ex[field]);
      assert.ok(ex[field].length <= 60, field + ' is not a small step said small: ' + ex[field]);
      assert.ok(!/^If I /.test(ex[field]), field + ' is another prediction, not a doing: ' + ex[field]);
    }

    /* Two is allowed here and only here: the beat between them is most of the effect. */
    assert.ok((ex.happened.match(/[.!?”]\s/g) || []).length <= 1,
      'what happened is more than two sentences: ' + ex.happened);
    assert.ok(ex.happened.length <= 90, 'what happened is not a handful of words: ' + ex.happened);

    /* Scope §3: everything starts at ten. It moved, and it is this example's number. */
    assert.strictEqual(ex.from, 10, 'an example does not start at ten');
    assert.ok(ex.to >= 1 && ex.to <= 9, 'an example did not move, or went below the floor');
  }
});

test('nothing in a worked example names the habit, the body, anyone’s safety, or a diagnosis', () => {
  const DIAGNOSIS = ['anxiety', 'anxious', 'depression', 'depressed', 'disorder', 'ocd', 'ptsd',
                     'bipolar', 'psychosis', 'addiction', 'addict', 'therapy', 'therapist',
                     'symptom', 'symptoms', 'condition', 'diagnosis', 'mental health'];
  const BANNED = ['digital cbt', 'improve your mental health', 'treats', 'reduces symptoms',
                  'tracks your anxiety', 'irrational', 'streak', 'most people', 'on average'];
  for (const ex of examples) {
    for (const field of ['prediction', 'did', 'dropped', 'happened']) {
      if (!ex[field]) continue;
      const said = ex[field];
      for (const [kind, list] of [['harm', guards.HARM], ['habit', guards.HABIT], ['body', guards.BODY]]) {
        assert.strictEqual(guards.hit(said, list), null, kind + ' word in the example: ' + said);
      }
      assert.strictEqual(guards.hit(said, DIAGNOSIS), null, 'a diagnosis word in the example: ' + said);
      for (const phrase of BANNED) {
        assert.ok(said.toLowerCase().indexOf(phrase) === -1, said + ' contains "' + phrase + '"');
      }
    }
  }
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

/*
  B23, 2026-09-04. The first door is the only one everybody reads. For two days it was `habit`,
  whose line names four substances, and in B21 that cost a person who had no habit and no
  business reading them: four words in, "is this a recovery app? That's not me at all", and she
  nearly closed the tab on screen two. Her door was sixth.

  So this is the rule the reorder bought, and it is written here because the order lives in a
  data file a well-meaning edit can shuffle back. It does not pin the six in place — Misha and
  the founder own the order (B0 Q2a) and may change it — it pins the one thing that must not
  come back: the screen may not open on a substance. If the four nouns are ever deleted from
  `habit` (B23 option b, Misha's casting vote), this passes wherever the door sits, which is
  correct: the harm was the words, not the door.
*/
test('the first door a person reads does not name a substance', () => {
  const first = doors.items[0];
  const words = (first.label + ' ' + first.under + ' ' + (first.note || '')).toLowerCase();
  for (const w of guards.HABIT) {
    assert.ok(!new RegExp('\\b' + w + '\\b').test(words),
      'door 1 is "' + first.id + '" and its line says "' + w + '". That is the first thing ' +
      'everybody reads, and in B21 it was four words into a tab somebody nearly closed.');
  }
});

/*
  The other half of the same trade, and it was bought with a measurement rather than a guess.
  The door that names substances is the only one carrying a `note` — the line telling somebody
  who is dependent to go somewhere else — and that line may not be the thing that scrolls off.

  On 2026-09-04 the reorder put `habit` third and the note landed at 800–842px. The menu is
  `position: fixed` and covers 785–844, so the note was behind it: on screen in the markup,
  invisible on the phone. Marcus read that note twice in B21. Moving `habit` to second put the
  note at 643–685, a hundred pixels clear. Hence TWO, and hence this test is about the note's
  door rather than about `habit` by name — if the note ever moves to another door, the rule
  travels with it.

  Re-measure with `node tools/walk.js tap '#go'`, then `eval` the note's bounding rect against
  the menu's. Anything that makes this screen taller above the note — the intro included —
  spends the margin.
*/
test('the door carrying the safety note is high enough for the note to be seen', () => {
  const at = doors.items.findIndex((d) => d.note);
  assert.notStrictEqual(at, -1, 'no door carries the safety note any more');
  assert.ok(at < 2, 'the door with the safety note is door ' + (at + 1) + '. The menu is fixed ' +
    'over the bottom 59px, so from door three down the note renders behind it and the one ' +
    'line telling a dependent person to go elsewhere is invisible until somebody scrolls.');
  assert.strictEqual(doors.items.filter((d) => d.note).length, 1,
    'more than one door has a note, so "the door with the note" no longer names one thing');
});

/*
  B35, 2026-09-08, and it is here because a checker found it and no reader ever would.

  723 strings across the six content files a person writes prose in, and **not one of them**
  contains a straight apostrophe or a straight double quote. 116 lines in `starts.js` alone use
  `’`, and ten use `“ ”`. The convention is absolute — and until this test it was completely
  unenforced, so the first line that broke it would ship, and nothing would go red.

  IT WOULD NOT LOOK LIKE A TYPO. It would look like two different apps on one screen: a chip
  reading `Don't rehearse it beforehand.` directly under one reading `Don’t explain yourself.`

  THE PERSON THIS PROTECTS IS THE FOUNDER. `docs/changing-the-words.md` tells them to edit
  these files by hand on github.com, which is a plain textarea on a keyboard that types `'`.
  They would break this on their first edit, every time, and nothing would tell them. Now
  something does, before the change is published rather than after.

  Batch 1 of the offline suggestions (`docs/candidates-suggestions-batch-1.md`) came back from
  that checker with sixty of them, which is what prompted this — a reminder that anything
  written outside these files is drafted somewhere with no typographic quotes.

  `zones.js` and `helplines.js` are deliberately not swept: both are transcribed from outside
  sources — IANA, and a provider's own website — and their words are not ours to restyle.
  `places.js` is not swept for the same reason: it carries other organisations' names.
*/
test('every word a person reads uses the typographic apostrophe, not the typewriter one', () => {
  const files = { 'strings-en.js': require('../content/strings-en.js'), 'worries.js': worries,
                  'starts.js': starts, 'why.js': why, 'whats-going-on.js': doors,
                  'examples.js': examples };
  const found = [];
  let swept = 0;
  const walk = (node, path) => {
    if (typeof node === 'string') {
      swept++;
      if (/['"]/.test(node)) found.push(path + ' — ' + node);
      return;
    }
    if (node && typeof node === 'object') for (const k of Object.keys(node)) walk(node[k], path + '.' + k);
  };
  for (const name of Object.keys(files)) walk(files[name], name);

  assert.ok(swept > 600, 'only swept ' + swept + ' strings: this check has stopped working');
  assert.deepStrictEqual(found, [],
    'use ’ and “ ” — every other line in web/content/ does, and a screen with both looks broken');
});

/* ------------------------------------------------------- B41: skeletons and their holes */

/*
  A SKELETON IS BETR'S OWN CONTENT, so the rules that hold the twenty-one stock tests hold it
  too — and two more besides, because a skeleton is the first thing in this product whose final
  wording is decided partly by somebody else.

  The rule this file CANNOT check is the one the reviewer holds: BETR owns the verb, the person
  owns the nouns. A hole takes a person, a thing, a place and never a verb, or somebody can
  compose a sentence BETR appears to be proposing, which is the single thing rule 4 exists to
  prevent. It is stated in web/lib/content.js and in worries.js, and it is on the reviewer's list.
*/
const shipped = () => JSON.parse(JSON.stringify(worries));

test('the skeletons that ship pass every rule, and the two that have one are the two B37 named', () => {
  assert.deepStrictEqual(content.validateWorries(worries), []);
  const withHoles = worries.filter((f) => f.skeleton).map((f) => f.id);
  assert.deepStrictEqual(withHoles, ['no', 'strug'],
    'a skeleton was added or removed without the reviewer being told');
});

/*
  The sentence has to read with NOTHING typed in. Nobody is walled for leaving a blank alone —
  an empty hole falls back to its own word — so that word is part of the shipped sentence and is
  held to the same standard as the rest of it: it has to work in every place its hole appears.
  "somebody" survives both "say no to somebody" and "somebody will think I’m selfish".
*/
test('every skeleton reads as a whole sentence before anybody types anything', () => {
  for (const f of worries.filter((w) => w.skeleton)) {
    const holes = f.skeleton.holes;
    for (const b of f.beliefs) {
      const said = content.fill(b.belief, {}, holes);
      assert.ok(said.indexOf('{') === -1, f.id + ' leaves a hole showing: ' + said);
      assert.match(said, /^If I .+, then .+\.$/, f.id + ' does not read as a sentence: ' + said);
      assert.ok(content.fill(b.expect, {}, holes).indexOf('{') === -1, f.id + ' expect leaves a hole showing');
    }
  }
});

test('a hole used and never declared is refused, and so is one declared and never used', () => {
  const a = shipped();
  a.find((f) => f.id === 'no').beliefs[0].belief =
    'If I say no to {person} without giving a reason, then {nobody} will mind.';
  assert.ok(content.validateWorries(a).some((p) => /uses a hole "\{nobody\}"/.test(p)));

  const b = shipped();
  b.find((f) => f.id === 'no').skeleton.holes.thing = 'a thing';
  assert.ok(content.validateWorries(b).some((p) => /declares a hole "\{thing\}"/.test(p)));
});

/*
  The carry-through is only honest while all three predictions start from the SAME action. Let
  one drift and filling in a hole changes the words above it without changing that prediction —
  which is a chip that no longer says what it will do.
*/
test('a prediction that does not start from the skeleton is refused', () => {
  const a = shipped();
  a.find((f) => f.id === 'no').beliefs[1].belief =
    'If I turn something down, then {person} will stop asking me.';
  assert.ok(content.validateWorries(a).some((p) => /does not start from the skeleton/.test(p)));
});

/* B42 owns the plan. A hole there today would print as itself on somebody's phone. */
test('a hole in the plan is refused until B42 can carry one', () => {
  const a = shipped();
  a.find((f) => f.id === 'no').test = 'Say no to {person} once today.';
  assert.ok(content.validateWorries(a).some((p) => /puts a hole in test/.test(p)));
});

/* A skeleton is four things and no fifth, for the reason a belief is two and a place is three. */
test('a skeleton has nowhere to hang a lane, a condition or a second version', () => {
  const a = shipped();
  a.find((f) => f.id === 'no').skeleton.lane = 'assertiveness';
  assert.ok(content.validateWorries(a).some((p) => /skeleton has an extra field/.test(p)));

  const b = shipped();
  b.find((f) => f.id === 'no').skeleton.holes.person = '';
  assert.ok(content.validateWorries(b).some((p) => /has no word to fall back on/.test(p)));
});
