/*
  The content is the product, so it is the thing most worth a test. B1 will rewrite the words
  in web/content/*.js; these rules travel with them.
*/
const { test } = require('node:test');
const assert = require('node:assert');

const worries = require('../content/worries.js');
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

/*
  B45 §5c, 2026-09-10. THERE WAS A SECOND CONTENT FILE HERE AND THERE IS NOT ANY MORE.

  starts.js held twelve items — an `if`, three `thens`, two `dos`, two `drops` — and nine of
  the twelve described an act that was already a worry, in different words, with its own
  predictions and no sizes at all. Two answers to every question, reviewed twice, free to
  drift apart on any day either file was edited.

  What is left is the two things that were never a worry: the general set a sentence BETR did
  not write falls through to, and the ORDER of the twelve suggestions under the first blank,
  which is now a list of worry ids and nothing else. Everything a person reads through them is
  validated as a worry, above.
*/
test('every suggestion under a blank reads as part of the sentence and is safe to propose', () => {
  assert.deepStrictEqual(content.validateGeneral(worries.general), []);
});

test('the front door’s suggestions are worries that exist, each with a sentence to print', () => {
  assert.deepStrictEqual(content.validateFront(worries.front, worries), []);
});

/*
  The general set is three predictions and three sizes, the way a place on Help is three
  fields and a belief is two. What is missing is the point: with nowhere to hang a lane, a
  condition or a second version, which suggestions a person is offered can never be decided by
  anything they entered. It is decided by whether the first blank matches a worry word for
  word, and if a future session adds fuzzy matching, that is the rule it would be breaking
  (research §5.2).
*/
test('a suggestion can never be aimed at a person', () => {
  assert.deepStrictEqual(Object.keys(worries.general).sort(), ['sizes', 'thens']);
  assert.ok(!/\blane\b|\bwhen\b|\bscore\b|\bif_?match/i.test(Object.keys(worries.general).join(' ')));
  /* and the front-door list is ids, not sentences: there is nowhere in it to put a rule */
  for (const id of worries.front) assert.strictEqual(typeof id, 'string');

  const g = JSON.parse(JSON.stringify(worries.general));
  g.lane = 'assertiveness';
  assert.ok(content.validateGeneral(g).some((p) => /extra field/.test(p)));
});

/*
  THE FRONT DOOR'S TWELVE, HELD BY HAND, so that a reordering or a quiet swap shows up in a
  diff rather than as nothing. It is the same twelve starts.js shipped after B47's cull, in
  the same order — nine of them are the worry the start duplicated, and `want`, `think` and
  `ontime` are the three that had no worry until the merge and now do.

  TWELVE AND NOT TWENTY, and that is a measurement rather than a taste: the row is 353–998px
  with twelve chips on a 390px phone, and the founder's canvas draws three. Which twelve is
  the founder's and Misha's. Move this list only when one of them says so, and say which.
*/
test('the front door offers the same twelve, in the same order', () => {
  assert.deepStrictEqual(worries.front, [
    'no', 'want', 'strug', 'enough', 'sit', 'rest',
    'think', 'right', 'ontime', 'praise', 'help', 'early'
  ]);
});

/*
  The chips are BETR proposing something, so rule 4 applies to them in full — the version of
  rule 4 that did NOT loosen on 2026-09-08. validateWorries and validateGeneral check every
  line; this checks that they are actually checking, because a word list that has stopped
  matching fails silently.

  B45 §5c WIDENED IT, and the widening caught something. It used to sweep the twelve starts
  and the general set. It now sweeps every sentence BETR proposes anywhere: each worry's
  skeleton, its three predictions, the three things a person is braced for, its three sizes,
  and the general set. The first run found "not pulling my weight" in `rest` — an idiom about
  workload reading as a sentence about a body, because "weight" is on the BODY list. It was
  reworded to the wording starts.js already had for the same act (see worries.js).
*/
test('nothing BETR suggests names the habit, the body, or anyone’s safety', () => {
  const lines = [];
  for (const f of worries) {
    lines.push(f.skeleton.if, f.test, f.drop);
    for (const b of f.beliefs) lines.push(b.belief, b.expect);
    for (const z of f.sizes) lines.push(z.do, z.drop);
  }
  lines.push(...worries.general.thens);
  for (const z of worries.general.sizes) lines.push(z.do, z.drop);
  /*
    B47, 2026-09-09: this said 150 until the cull, when twenty-one starts became twelve, and
    it dropped to 102. B45 §5c, 2026-09-10: starts.js is gone and the sweep is over the
    worries themselves, so the floor is 300 — twenty worries carrying thirteen lines each,
    plus nine on the general set. The number is a canary, not a target: it is here so that
    content quietly disappearing shows up as a failure rather than as nothing. Move it only
    when a cull is the reason, and say which one.
  */
  assert.ok(lines.length > 300, 'only ' + lines.length + ' suggestions: the content has shrunk');
  for (const line of lines) {
    for (const [kind, list] of [['harm', guards.HARM], ['habit', guards.HABIT], ['body', guards.BODY]]) {
      assert.strictEqual(guards.hit(line, list), null, kind + ' word in "' + line + '"');
    }
  }
  /* and the check itself still bites */
  assert.strictEqual(guards.hit('Have one beer', guards.HABIT), 'beer');
});

/*
  Every suggestion under the first blank has to make a sentence a person would actually say
  out loud, with the words the screen prints either side of it — and so does every prediction
  offered under the second blank once that chip has been tapped.

  On this road the holes are at their own default words, because there is no blank to have
  typed one into. That is the sentence matchFor() will recognise if she taps it, so it is the
  sentence checked here.
*/
test('every front-door suggestion makes a whole sentence with the words the screen prints', () => {
  const en = require('../content/strings-en.js').s;
  for (const id of worries.front) {
    const f = content.byId(worries, id);
    const ifHalf = content.fill(f.skeleton.if, {}, f.skeleton.holes);
    assert.ok(!/[{}]/.test(ifHalf), 'a hole with no default word in: ' + ifHalf);
    for (const b of f.beliefs) {
      const whole = content.fill(b.belief, {}, f.skeleton.holes);
      assert.ok(!/[{}]/.test(whole), 'a hole with no default word in: ' + whole);
      const then = whole.match(/, then ([\s\S]*)\.$/);
      assert.ok(then, 'a prediction that does not split into two halves: ' + whole);
      const said = en.build.ifWord + ' ' + ifHalf + en.build.thenWord + ' ' + then[1] + '.';
      assert.strictEqual(said, whole, 'the two halves do not reassemble into the sentence');
      assert.match(said, /^If I \S/, said);
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
/*
  B47, 2026-09-09. `phone`, `check` and `reply` came off it with the cull. `help` went on the
  same day, and that is a judgement, not a tidy-up: the cull left the `yes` door leading on
  "Saying no without giving a reason", which waits on somebody asking you for something, and
  the founder's call was to lead on "Asking someone for help" instead. It belongs here for the
  reason `care` and `praise` already do — the person starts it. Nobody has to do anything first.
*/
const STARTS_TODAY = ['sit', 'feed', 'enough', 'rest', 'praise', 'care', 'help'];

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

/*
  B47, 2026-09-09. THE FLOOR THE FILE ALWAYS CLAIMED AND NEVER HAD.

  whats-going-on.js has said "four to six worries" since B19 and lib/content.js has only ever
  held the six. There was no floor at all, so a door could quietly fall to two and the build
  would pass — and the cull did exactly that to one of them. A thin door is not a crash; it is
  a screen a person opens onto almost nothing, which is the failure B19 built doors to fix.

  The two below the floor are named here rather than allowed everywhere, so each one is a line
  in a diff with a date and a reason on it, and so that clearing them is a job somebody can
  see. Do not add a third without the founder: door composition is theirs and Misha's.
*/
const MIN_PER_DOOR = 4;
const THIN_DOORS = {
  /*
    Lost `phone` and `reply` in the cull, and there is nothing among the seventeen survivors
    that belongs behind "On my phone more than I want to be". B47 §6b: the #07 split takes it
    back to three by turning `sit` into two worries — sitting alone in silence, and not
    distracting yourself from a feeling — and that draft is with the founder and Misha. This
    entry goes when the split lands.
  */
  phone: 2,
  /*
    `yes` WAS HERE AND IS NOT ANY MORE. It lost `reply` in the cull and the founder's call on
    2026-09-09 was to leave it at three rather than borrow two from the habit door. B45 §5c,
    2026-09-10, gave it two that are not borrowed from anywhere: `want` and `think` had lived
    in starts.js with no worry behind them, and "Going along with things I don't want to do"
    is the door both of them describe. Five, from its own content, and off the list.

    THE DOOR'S OWN LINE STILL NAMES THREE and Misha has not read it since B47 rewrote it. It
    is one of the asks in docs/COPY.md.
  */
};

test('no door opens onto fewer than four worries, except the ones we have named', () => {
  for (const d of doors.items) {
    const n = d.worries.length;
    if (d.id in THIN_DOORS) {
      assert.strictEqual(n, THIN_DOORS[d.id], 'the "' + d.id + '" door is a named exception to ' +
        'the floor and it has changed size: say why, or take it off the list');
      continue;
    }
    assert.ok(n >= MIN_PER_DOOR, 'the "' + d.id + '" door opens onto ' + n + ' worries. A door ' +
      'is four to six (B19). Refill it, or name it in THIN_DOORS with the reason and the date');
  }
});

/* An exception that has outlived its door is a rule nobody is checking any more. */
test('every named thin door is still a door', () => {
  for (const id of Object.keys(THIN_DOORS)) {
    assert.ok(doors.items.some((d) => d.id === id),
      '"' + id + '" is listed as a thin door and is not a door');
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
                  'why.js': why, 'whats-going-on.js': doors,
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

test('every worry that ships has a skeleton, and all of them pass every rule', () => {
  assert.deepStrictEqual(content.validateWorries(worries), []);
  const without = worries.filter((f) => !f.skeleton).map((f) => f.id);
  /*
    B46, 2026-09-09. This used to assert exactly ['no', 'strug'] — the two B37 named — because a
    skeleton was the exception. THE VERB CONSTRUCTOR IS THE DEFAULT NOW (the founder's ask), so
    the assertion is the other way round: not one worry may ship without one, or nineteen people
    out of twenty-one get the screen this task existed to delete.
  */
  assert.deepStrictEqual(without, [],
    'a worry shipped with no printed verb: ' + without.join(', '));
  /* And a hole is optional — some actions have no noun anybody could supply (see lib/content.js). */
  const holeless = worries.filter((f) => !Object.keys(f.skeleton.holes).length).map((f) => f.id);
  assert.deepStrictEqual(holeless, ['early'],
    'a skeleton gained or lost its holes without the reviewer being told: ' + holeless.join(', '));
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

  /* `no` uses {person} and, since B49, {thing} — so the never-used example has to be a third. */
  const b = shipped();
  b.find((f) => f.id === 'no').skeleton.holes.place = 'a place';
  assert.ok(content.validateWorries(b).some((p) => /declares a hole "\{place\}"/.test(p)));
});

/*
  B49, 2026-09-10. WHERE A HOLE MAY BE USED, AND IT IS NOT ANYWHERE.

  Every hole in the if-half gets a blank on the build screen. A hole that is NOT in the if-half
  gets one on the plan screen, in the sentence of the size that uses it — and that is the only
  other blank there is. Put one in a prediction, an expectation or a size's leave-out and it is
  declared, validated, and then prints its own default word for ever with nowhere to change it.
  That is B45 §5b's finding, and it is a rule now rather than a paragraph.
*/
test('a hole outside the if-half may only be used in a size’s plan sentence', () => {
  const no = 'without putting it in the if-half';

  const a = shipped();
  const w = a.find((f) => f.id === 'no');
  w.skeleton.holes.mood = 'a mood';
  w.beliefs[0].expect = 'There’ll be a pause, and {person} will be {mood} with me afterwards.';
  assert.ok(content.validateWorries(a).some((p) => p.indexOf(no) !== -1),
    'a hole in an expectation with no blank anywhere was allowed');

  const b = shipped();
  const x = b.find((f) => f.id === 'no');
  x.skeleton.holes.mood = 'a mood';
  x.sizes[1].drop = 'Don’t give a reason, and don’t be {mood} about it.';
  assert.ok(content.validateWorries(b).some((p) => p.indexOf(no) !== -1),
    'a hole in a size’s leave-out with no blank anywhere was allowed');

  /* And the one place it IS allowed stays allowed: `no`'s own {thing}, in its small go. */
  assert.deepStrictEqual(content.validateWorries(shipped()), []);
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

/*
  B42 lifted the ban and put a narrower one in its place. A hole in the plan is fine now — the
  prefill moved to the screen where the holes are known — but a hole in a worry with NO
  skeleton is the same bug the old ban was really about: there is nothing to fill it from, so
  it prints as itself on somebody's phone.
*/
test('a hole in a worry with no skeleton is refused, because nothing can fill it', () => {
  const a = shipped();
  /* B46: every worry ships with a skeleton now, so one is taken away to make the case. */
  const f = a.find((x) => x.id === 'help');
  delete f.skeleton;
  f.beliefs = f.beliefs.map((b) => ({
    belief: b.belief.split('{person}').join('somebody'),
    expect: b.expect.split('{person}').join('somebody')
  }));
  f.test = 'Ask {person} for one thing today.';
  assert.ok(content.validateWorries(a).some((p) => /no skeleton to fill it from/.test(p)));

  /* and a hole in the plan of a worry that HAS one is accepted, which is what shipped today */
  assert.deepStrictEqual(content.validateWorries(shipped()), []);
  assert.ok(/\{person\}/.test(shipped().find((f) => f.id === 'no').test));

  /* an undeclared one is still refused wherever it appears, plan included */
  const b = shipped();
  b.find((f) => f.id === 'no').drop = 'Don’t explain it to {stranger}.';
  assert.ok(content.validateWorries(b).some((p) => /never declares/.test(p)));
});

/* ------------------------------------------------- B42: three sizes, and the rules on them */

/*
  Three, always. Not two because one was hard to write, not four because a fourth occurred to
  somebody, and never a number that depends on what a person has already done — availability
  that changed with history would be the app choosing (rule 2) and a score of the person
  besides. checkSizes counts them; this checks that it counts.
*/
test('every worry offers three sizes, and never some other number', () => {
  const a = shipped();
  const f = a.find((z) => z.id === 'no');
  assert.strictEqual(f.sizes.length, 3);
  f.sizes.push({ name: 'One more', do: 'Do it twice.', drop: 'Don’t explain.' });
  assert.ok(content.validateWorries(a).some((p) => /offers 4 sizes/.test(p)));

  const b = shipped();
  b.find((z) => z.id === 'no').sizes.pop();
  assert.ok(content.validateWorries(b).some((p) => /offers 2 sizes/.test(p)));

  /*
    B45 §5b, 2026-09-09, and this assertion used to say the opposite. It read "most worries
    have none at all, which is not a problem — they fall through to the three generic ones in
    starts.js". Fifteen of the seventeen did, which meant the road most people are on had the
    generic dial rather than one about the worry in front of them. Every worry has its own
    three now, and none may lose them.
  */
  for (const f of shipped()) {
    assert.ok(Array.isArray(f.sizes) && f.sizes.length === 3, f.id + ' has no three sizes');
  }
  const c = shipped();
  delete c.find((z) => z.id === 'no').sizes;
  assert.ok(content.validateWorries(c).some((p) => /has no sizes/.test(p)));
});

/*
  B45 §5b. THE SMALLEST OF THE THREE IS THE WORRY'S OWN test AND drop, WORD FOR WORD.

  Nothing reads test/drop any more — prefillPlan() returns the moment a worry has sizes, and
  every worry has them — so a small go that drifted from its own test would leave one file
  holding two answers to one question, one of them unreachable and both of them being
  reviewed. Held equal, there is one wording, and B45 §5c can delete the pair without
  deciding anything.
*/
test('a worry’s small go is its own test and its own leave-out, word for word', () => {
  for (const f of shipped()) {
    assert.strictEqual(f.sizes[0].do, f.test, f.id + ': the small go is not its own test');
    assert.strictEqual(f.sizes[0].drop, f.drop, f.id + ': the small go is not its own drop');
  }
  const a = shipped();
  a.find((z) => z.id === 'no').sizes[0].do = 'Say no to {person} once today, about anything.';
  assert.ok(content.validateWorries(a).some((p) => /small go that is not its own test/.test(p)));

  const b = shipped();
  b.find((z) => z.id === 'no').drop = 'Don’t give them a reason.';
  assert.ok(content.validateWorries(b).some((p) => /small go that is not its own drop/.test(p)));
});

/*
  NO NUMBER ON A SIZE, EVER, and it is checked rather than left to good manners. "Level 2" and
  "Step 3 of 3" are the same object as a badge: they turn a dial into a ladder with a top, and
  the top of a ladder is somewhere a person can fail to reach. B36 §9 — 38 studies and 8,110
  people, and gamification predicted neither the outcome nor whether anybody kept going.
*/
test('a size is never numbered, and its name is a label rather than a sentence fragment', () => {
  const a = shipped();
  a.find((z) => z.id === 'no').sizes[0].name = 'Level 1';
  assert.ok(content.validateWorries(a).some((p) => /number in its name/.test(p)));

  /* founder, 2026-09-03: nothing a person taps is all-lowercase, and a size name is a label */
  const b = shipped();
  b.find((z) => z.id === 'no').sizes[0].name = 'a small go';
  assert.ok(content.validateWorries(b).some((p) => /name starts lowercase/.test(p)));

  /* a person's word belongs in the sentence, never on the button */
  const c = shipped();
  c.find((z) => z.id === 'no').sizes[0].name = 'A small go with {person}';
  assert.ok(content.validateWorries(c).some((p) => /hole in a size name/.test(p)));

  /* and nothing shipped is numbered */
  for (const f of shipped()) {
    for (const z of f.sizes || []) assert.ok(!/[0-9]/.test(z.name), 'numbered size: ' + z.name);
  }
  for (const z of worries.general.sizes) assert.ok(!/[0-9]/.test(z.name), 'numbered size: ' + z.name);
});

/*
  A size is a name and the two sentences that go with it, and no fourth field — the same rule
  a belief has two, a place three and a skeleton two, and for the same reason: with nowhere to
  hang a lane or a condition, which size a person is offered can never be decided for them by
  anything they entered or did (research §5.2).
*/
test('a size has nowhere to hang a condition, and both halves are BETR proposing something', () => {
  const a = shipped();
  a.find((z) => z.id === 'no').sizes[0].after = 'two tests';
  assert.ok(content.validateWorries(a).some((p) => /has an extra field "after"/.test(p)));

  /* both halves go through the three word lists exactly as a stock test does */
  const b = shipped();
  b.find((z) => z.id === 'no').sizes[0].do = 'Have one drink first.';
  assert.ok(content.validateWorries(b).some((p) => /may never propose/.test(p)));

  /* two that say the same thing are one size and a wasted tap */
  const c = shipped();
  c.find((z) => z.id === 'no').sizes[1].do = c.find((z) => z.id === 'no').sizes[0].do;
  assert.ok(content.validateWorries(c).some((p) => /says the same thing as size 0/.test(p)));
});

/*
  The general set is where a sentence BETR did not write lands, so it must have three. B42
  replaced its two loose `dos` and two loose `drops` with them; B45 §5c left it as the only
  part of starts.js that was never a worry, and it is now the ONLY road that reaches these —
  a first blank matching a worry word for word gets that worry's own three.
*/
test('the general set carries the three sizes every other road falls through to', () => {
  assert.strictEqual(worries.general.sizes.length, 3);
  assert.ok(!('dos' in worries.general) && !('drops' in worries.general));
  for (const z of worries.general.sizes) {
    assert.match(z.name, /^[A-Z]/);
    assert.match(z.do, /^[A-Z\u201C]/);
    assert.match(z.drop, /^[A-Z\u201C]/);
  }
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
