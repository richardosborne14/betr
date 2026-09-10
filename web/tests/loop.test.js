/*
  The loop itself, walked end to end, on the fake DOM in harness.js.

  It cannot see layout or CSS. What it catches is a crashing screen, a dead button and a
  broken guard. The real walk is docs/journeys.md, on a phone.
*/
const { test } = require('node:test');
const assert = require('node:assert');
const { boot } = require('./harness.js');
const fs = require('node:fs');
const path = require('node:path');

/*
  Labels and tests come from web/content/, never from a literal here. B1 rewrote every one of
  them and three assertions in this file broke on the words rather than on the behaviour;
  what these walks are actually about is that the right worry is on the right screen.
*/
const worries = require('../content/worries.js');
/*
  B45 §5c, 2026-09-10. THE TWO CONTENT FILES ARE ONE, and these three are what starts.js used
  to hand a test for free. A worry is stored with `{holes}` in it; what the front door prints
  is the same sentence with every hole at its own default word, because on that road there is
  no blank to have typed one into.
*/
const general = worries.general;
const front = worries.front.map((id) => worries.find((w) => w.id === id));
const plainly = (f) => f.skeleton.if.replace(/\{([a-z]+)\}/g, (_, h) => f.skeleton.holes[h]);
const filled = (f, text) => text.replace(/\{([a-z]+)\}/g, (_, h) => f.skeleton.holes[h]);
const thensOf = (f) => f.beliefs.map((b) => filled(f, b.belief).match(/, then ([\s\S]*)\.$/)[1]);
const sizesOf = (f) => f.sizes.map((z) => ({
  name: z.name, do: filled(f, z.do), drop: filled(f, z.drop)
}));
const doors = require('../content/whats-going-on.js');
const content = require('../lib/content.js');
const why = require('../content/why.js');
const en = require('../content/strings-en.js');
/* B42: the three sizes on the free-text road live here, and every road with none of its own
   falls through to them. Required at the top because more than one walk below reads them. */
const labelOf = (id) => content.byId(worries, id).label;
/* B19: a walk goes through a door, so "the first worry" is the first one behind one. */
const firstBehind = (n) => content.byId(worries, doors.items[n || 0].worries[0]);
/*
  B46. Every worry has a printed verb and most have a hole, so what a SCREEN shows is never the
  raw sentence out of the file — it is that sentence with the holes filled. With nothing typed
  they fill with their own default word, which is what these tests see.
*/
const said = (f, text) => content.fill(text, {}, (f.skeleton || { holes: {} }).holes);

/*
  B30. Building a test from nothing: the two blanks, then what you'll do. Six taps' worth of
  the founder's "from a car, under thirty seconds to Lock it in", in one line of a test.
*/
function buildOwn(a, ifPart, thenPart, doIt, dropIt) {
  if (a.html().indexOf('id="if"') === -1) a.tap('#m-new');
  a.type('#if', ifPart).type('#then', thenPart).tap('#next');
  a.type('#do', doIt);
  /* B39: the leave-out half is one row until it is tapped, and then it is the box. */
  if (dropIt !== undefined) a.tap('#dropopen').type('#drop', dropIt);
  a.tap('#lock');
  if (a.html().indexOf('id="nothanks"') !== -1) a.tap('#nothanks');
  return a;
}

/* ------------------------------------------------------- the walks */

test('a full loop, from the start screen to a result', () => {
  const a = boot();
  a.shows(en.s.start.caption);
  a.tap('#not-sure').shows('What’s going on?');
  a.tap('[data-door]', 0).shows('Which one?');
  /*
    B20. Tapping a worry opens the three predictions under it; tapping one of those starts
    the test. What the plan screen has to carry is the worry's own label and the exact
    sentence that was chosen, because that is what a person checks they are still inside.
  */
  /*
    B32. Tapping one opens the build screen with the sentence half written and its three
    predictions as chips; tapping one of those fills both blanks. What has to carry from here
    to the result is the label it is filed under and the exact sentence being tested.
  */
  a.tap('[data-id]', 0).shows(firstBehind(0).label).shows(said(firstBehind(0), firstBehind(0).beliefs[0].belief));
  a.tap('[data-b]', 0).tap('#next').shows(firstBehind(0).label).shows(said(firstBehind(0), firstBehind(0).beliefs[0].belief));
  /*
    B45 §5b, 2026-09-09: every worry has three sizes now, so nothing is in the boxes until
    one is tapped. A small go IS the worry's own `test` and `drop` — that is the invariant
    content.test.js holds — so tapping the first one puts exactly those two on screen.
  */
  a.shows(en.s.build.lock).shows(said(firstBehind(0), firstBehind(0).sizes[0].do));
  a.tap('[data-size]', 0);
  a.shows(said(firstBehind(0), firstBehind(0).test));
  a.shows(said(firstBehind(0), firstBehind(0).drop));
  a.tap('#lock').shows(en.s.locked.title);
  a.tap('#nothanks').tap('#done').shows('What happened?');
  a.type('#o', 'He said fair enough and got his own coffee.');
  a.tap('#next').shows('Still think that’s what happens?');
  a.tap('[data-key]', 2);
  a.shows('You expected').shows('What actually happened');
  a.shows('He said fair enough').shows('>1<');
});

/*
  Founder, 2026-09-03: what happened, typed as two paragraphs, came back out as one line —
  in the highlighted text on the result screen, and again on the card in Your tests. The
  breaks were never lost from the stored text; nothing was telling the browser to draw them.
  The class is the fix, so the class is what this asserts, on both screens, plus the one line
  of CSS that gives it its meaning.
*/
test('what happened keeps the line breaks a person typed, on the result and on the card', () => {
  const written = 'He said fair enough.\n\nThen he made me one as well.';
  const a = boot();
  a.tap('#not-sure').tap('[data-door]', 0).tap('[data-id]', 0).tap('[data-b]', 0).tap('#next').tap('[data-size]', 0).tap('#lock').tap('#nothanks').tap('#done');
  a.type('#o', written).tap('#next').tap('[data-key]', 2);

  /* One paragraph per paragraph, and the class that lets a browser draw a line break. */
  const onResult = a.html();
  assert.match(onResult, /<p class="real"><span class="wrote">He said fair enough\.<\/span>/);
  assert.match(onResult, /<p class="real"><span class="wrote">Then he made me one as well\.<\/span>/);

  a.tap('#m-mine');
  const onCard = a.html();
  assert.match(onCard, /<p class="said"><span class="wrote">He said fair enough\.<\/span>/);
  assert.match(onCard, /<p class="said"><span class="wrote">Then he made me one as well\.<\/span>/);

  /* A single line break inside one paragraph is the stylesheet's job, and stays in the text. */
  const b = boot();
  b.tap('#not-sure').tap('[data-door]', 0).tap('[data-id]', 0).tap('[data-b]', 0).tap('#next').tap('[data-size]', 0).tap('#lock').tap('#nothanks').tap('#done');
  b.type('#o', 'One line.\nAnd the next.').tap('#next').tap('[data-key]', 2);
  assert.ok(b.html().indexOf('One line.\nAnd the next.') !== -1,
    'a single line break inside a paragraph must survive into the markup');

  const css = fs.readFileSync(path.join(__dirname, '..', 'app.css'), 'utf8');
  assert.match(css, /\.wrote\s*\{[^}]*white-space\s*:\s*pre-wrap/,
    'the wrote class is what draws the line breaks; without pre-wrap it does nothing');
});

test('the count is completed tests, and "didn’t get to it" costs nothing', () => {
  const a = boot();
  a.tap('#not-sure').tap('[data-door]', 0).tap('[data-id]', 0).tap('[data-b]', 0).tap('#next').tap('[data-size]', 0).tap('#lock').tap('#nothanks');
  a.tap('#miss').shows('still here for tomorrow');
  /* not bare "missed": a worry's own test may ask you to write down what you missed. */
  a.hides('you missed').hides('missed a').hides('streak').hides('failed');
  a.tap('#done').type('#o', 'Nothing happened.').tap('#next').tap('[data-key]', 0);
  a.shows('>1<');
});

/*
  B27 item 1. The words were already right and the screen was not: after "Didn’t get to it"
  the kicker still read LOCKED IN and the heading still said GO AND DO IT, so a person closing
  the app for the day carried away an instruction they had just declined.

  What this holds down is that a miss is a STATE. The heading has to change, the command has
  to stop being a command, and the offer to put it down must not be made a second time — while
  the test and the drop stay exactly where they are, because they are what is waiting for
  tomorrow. And it must still be the way back in: a test put down is not a test taken away.
*/
test('putting a test down for the day changes the screen, not just adds a sentence', () => {
  const a = boot();
  a.tap('#not-sure').tap('[data-door]', 0).tap('[data-id]', 0).tap('[data-b]', 0).tap('#next').tap('[data-size]', 0).tap('#lock').tap('#nothanks');
  a.shows(en.s.locked.kicker).shows(en.s.locked.title).shows(en.s.locked.miss);

  a.tap('#miss');
  a.shows(en.s.locked.restKicker).shows(en.s.locked.restTitle).shows(en.s.locked.missed);
  a.hides(en.s.locked.kicker).hides(en.s.locked.title);

  /* No second offer to put down what is already down. */
  a.hides(en.s.locked.miss);

  /* The command softened, and what is waiting for tomorrow is still on the screen. */
  a.shows(en.s.locked.restDone).hides(en.s.locked.done);
  a.shows(said(firstBehind(0), firstBehind(0).test)).shows(said(firstBehind(0), firstBehind(0).drop));

  a.tap('#done').shows(en.s.happened.title);
});

/* Closed and opened again tomorrow, the screen still says it was put down, not still shouting. */
test('a test put down for today is still put down when the app is opened again', () => {
  const a = boot();
  a.tap('#not-sure').tap('[data-door]', 0).tap('[data-id]', 0).tap('[data-b]', 0).tap('#next').tap('[data-size]', 0).tap('#lock').tap('#nothanks').tap('#miss');

  /* Reopening lands straight back on the test in hand, in the state it was left in. */
  const again = boot(a.mem);
  again.shows(en.s.locked.restKicker).shows(en.s.locked.restTitle);
  again.hides(en.s.locked.title).hides(en.s.locked.miss);
});

/*
  B32. The doors stopped being the way in and became things to borrow — and the two lines on
  them that were never about routing had to survive the demotion: door one's safety note, and
  the footer saying none of these is a diagnosis. Both are still drawn, in the new word.
*/
test('the doors still carry the safety note and the footer, one tap aside', () => {
  const a = boot().shows(en.s.start.borrow);
  a.tap('#not-sure').shows(en.s.doors.title).shows(doors.intro);
  a.shows(doors.foot).shows(en.s.doors.foot);
  /*
    One intro line, not two. B23 bought the safety note a hundred pixels of clearance and a
    second sentence above it spent fifty-eight of them; the note has to stay above the fold.
    A test cannot see pixels, so what it holds is the thing that caused it: one line.
  */
  assert.ok(doors.intro.length < 140, 'the doors intro has grown; re-measure the safety note');
  assert.strictEqual(en.s.doors.sub, undefined, 'a second intro line is back above the note');

  const note = doors.items.filter((d) => d.note)[0];
  assert.ok(note, 'no door carries the safety note any more');
  a.shows(note.note);
  a.shows('data-note=');

  /* and nothing on the screen calls one of them a worry */
  for (const bit of [en.s.doors.title, en.s.doors.sub, en.s.doors.foot, doors.foot, doors.intro]) {
    assert.ok(!/\bworr(y|ies)\b/i.test(bit), 'the doors still say worry: ' + bit);
  }
});

test('the second door opens onto worries, never onto a test of its own', () => {
  const a = boot();
  a.tap('#not-sure').shows('What’s going on?').shows(doors.items[0].label);
  a.tap('[data-door]', 0).shows('Which one?').shows(labelOf(doors.items[0].worries[0]));
  /* B19: and the worry's own sentence is on the button, which is the whole point of it. */
  a.shows(content.byId(worries, doors.items[0].worries[0]).belief);
  a.shows('Something else');
});

/* ------------------------------------------------- B20: which of the three is yours */

/*
  The screen the task exists for. A worry is a situation; the thing an experiment tests is the
  prediction underneath it, and there is more than one under every situation on the list. The
  one a person taps is the one that has to travel — onto the plan, into the record, and back
  out onto the result and the card. It used to be whichever single sentence the file happened
  to carry, which is why test users said it sort of matched and not really.
*/
test('the prediction a person picks is the one that gets tested, not the first one', () => {
  const f = firstBehind(0);
  const a = boot();
  a.tap('#not-sure').tap('[data-door]', 0).tap('[data-id]', 0);

  /*
    B32: all three are still offered and the person still says which is theirs — as a row of
    chips on the screen where the sentence is being written, rather than on a screen of its
    own. What they are braced for is no longer printed under each, because the sentence is
    assembled above them as they choose; it still travels, and the last lines prove it.
  */
  for (const b of f.beliefs) a.showsText(said(f, b.belief));

  /* the second one, deliberately: the first would pass whether it was carried or not */
  a.tap('[data-b]', 1).tap('#next').shows(said(f, f.beliefs[1].belief));
  a.hides(said(f, f.beliefs[0].belief)).hides(said(f, f.beliefs[2].belief));
  /* B45 §5b: three sizes on every worry, so the plan arrives when one is tapped — and the
     smallest of the three IS this worry's own `test`. */
  a.tap('[data-size]', 0).shows(said(f, f.test));

  a.tap('#lock').tap('#nothanks').tap('#done');
  a.type('#o', 'Nothing happened.').tap('#next').shows(said(f, f.beliefs[1].belief));
  a.tap('[data-key]', 1).shows(said(f, f.beliefs[1].belief)).shows(said(f, f.beliefs[1].expect));

  /* and doing it again tomorrow keeps the sentence they chose, without asking twice */
  a.tap('#again').shows(said(f, f.beliefs[1].belief)).hides(said(f, f.beliefs[0].belief));
  a.tap('#m-mine').shows(said(f, f.beliefs[1].belief));
});

/*
  The founder's own complaint, and the reason this is a test rather than a look: the list said
  one sentence, the test screen said another, and the result screen said a third, so a person
  four screens in could not tell whether they were still in the worry they had picked. The
  label and the exact sentence being tested are on every screen from the choice to the result.
*/
test('the worry and the sentence being tested are on every screen in between', () => {
  const f = firstBehind(0);
  const a = boot();
  a.tap('#not-sure').tap('[data-door]', 0);
  a.shows(f.label).shows(f.belief);                 /* the list: the loose one */
  a.tap('[data-id]', 0).shows(f.label);             /* choosing which prediction */
  a.tap('[data-b]', 2).tap('#next').tap('[data-size]', 0);

  const chosen = said(f, f.beliefs[2].belief);
  a.shows(f.label).shows(chosen);                   /* the plan */
  a.tap('#lock').shows(f.label).shows(chosen);      /* locked in */
  a.tap('#nothanks').tap('#done').shows(f.label).shows(chosen);          /* what happened */
  a.type('#o', 'She said fine.').tap('#next').shows(f.label).shows(chosen);  /* the re-rate */
  a.tap('[data-key]', 1).shows(f.label).shows(chosen);                   /* the result */
  a.tap('#m-mine').shows(f.label).shows(chosen);                         /* and the card */
});

/*
  B41, 2026-09-09. THE SKELETON, AND THE ONE THING IT EXISTS TO DO.

  A worry may carry a skeleton — the if-half as printed words with named holes in it — and what
  the person types into a hole arrives in ALL THREE predictions before she has finished reading
  them. Nothing chose anything, nothing was ranked, no model ran (rule 2). It is a string
  substitution, and it is the closest thing to intelligence this product is allowed to have.

  The carry-through is asserted through a REPAINT here rather than through the keystroke, for
  the reason every other live behaviour on this screen is: the fake DOM fires no events, so what
  a test sees is whatever the paint decided (see refreshBorrow, and refreshThens before it). What
  is proved here is the invariant that matters — the words on a chip are the words in the box.
*/
test('a skeleton carries what she types into all three predictions', () => {
  const f = content.byId(worries, 'no');
  assert.ok(f.skeleton, 'the "no" worry lost its skeleton');
  const a = boot();
  a.tap('#not-sure').tap('[data-door="yes"]').tap('[data-id="no"]');

  /* before she types anything, the sentence still reads — the hole's own word stands in */
  a.shows(f.skeleton.holes.person);
  a.showsText('If I say no to somebody without giving a reason, then somebody will think I’m selfish.');
  /* and NOTHING is marked, because she has not typed anything yet (B46) */
  assert.strictEqual(a.html().indexOf('class="carried"'), -1,
    'a default word was marked as if she had typed it');

  /* one hole, typed once, and it is in every one of the three */
  a.type('#h-person', 'my sister').tap('[data-b]', 0);
  for (const b of f.beliefs) {
    a.showsText(content.fill(b.belief, { person: 'my sister' }, f.skeleton.holes));
  }
  a.hidesText('{person}');
  a.hidesText('If I say no to somebody');
});

/*
  B46, 2026-09-09, AND IT IS THE HALF OF B37 THAT WAS NEVER BUILT.

  The substitution above has worked since B41 and it worked in silence: she filled one blank,
  three sentences underneath became sentences about her sister, and nothing on screen said so.
  The founder's canvas calls the substitution "the closest thing to intelligence BETR is allowed
  to have" and marks every landing with a highlight. This is that.

  Two halves, and the second is the one that matters: BETR's own default word is NEVER marked.
  Highlighting "somebody" would tell a person she had said something she had not, on the one
  screen whose whole job is to show her her own words coming back.
*/
test('the word she typed is marked wherever it lands, and a default word never is', () => {
  const a = boot();
  a.tap('#not-sure').tap('[data-door="yes"]').tap('[data-id="no"]');

  const marks = () => (a.html().match(/<span class="carried">([^<]*)<\/span>/g) || [])
    .map((m) => m.replace(/<[^>]*>/g, ''));

  assert.deepStrictEqual(marks(), [], 'nothing is hers yet, so nothing may be marked');

  /*
    Typed, then a tap to repaint. In a real browser the row is reprinted on the keystroke
    (refreshBorrow); the fake DOM fires no events at all, so the tap is what stands in for one
    — docs/learnings.md, "never depend on an event".
  */
  a.type('#h-person', 'my sister').tap('[data-b]', 0);
  const onBuild = marks();
  assert.ok(onBuild.length >= 3, 'only ' + onBuild.length + ' marks across three predictions');
  for (const m of onBuild) assert.strictEqual(m, 'my sister');

  /* and again on the next screen, in three sizes she has not read yet */
  a.tap('#next');
  const onDo = marks();
  assert.ok(onDo.length >= 3, 'her word is not marked in the sizes');
  for (const m of onDo) assert.strictEqual(m, 'my sister');
});

/*
  B34 D1 through B46's change: a chip may only insert the words printed on it. Marking splits
  the printed sentence across three nodes, so the guarantee is now "the text of the button",
  and this is what holds those two together.
*/
test('a marked chip still inserts exactly the words drawn on it', () => {
  const a = boot();
  a.tap('#not-sure').tap('[data-door="yes"]').tap('[data-id="no"]');
  /* typed, then repainted by a tap, so the row on screen carries her word and its marks */
  a.type('#h-person', 'my sister').tap('[data-b]', 0);

  const drawn = (a.html().match(/<button class="chip" data-b="1">([\s\S]*?)<\/button>/) || [])[1];
  assert.ok(drawn, 'could not find the second prediction chip');
  const asText = drawn.replace(/<[^>]*>/g, '');
  assert.ok(asText.indexOf('<') === -1 && asText.indexOf('my sister') !== -1);

  a.tap('[data-b]', 1);
  /* the printed sentence is "If I <ifPart>, then <thenPart>" — both halves came off that
     button and nothing else did */
  assert.ok(asText.indexOf(a.valueOf('#then')) !== -1,
    'the chip inserted a second half it did not print: ' + asText + ' → ' + a.valueOf('#then'));
});

/*
  And what a filled-in skeleton locks in as. THIS IS WHAT B40 WAS FOR: the words differ from the
  skeleton every time, by design, and the test is still that worry — same id, same label, same
  ladder — with her words in the record and the hole she filled recorded beside them.

  B20's hand-written expectation travels too, and it very nearly did not: `sameAsStock` compares
  against the item's three, and on this road every one of them has a `{person}` in it, so it
  matched nothing until it was taught to compare the FILLED sentences. The cost of missing that
  would not have been a crash — it is that the thing she is braced for, written by a person to
  go with that exact prediction, quietly stops travelling on the road most people are on.
*/
test('a filled-in skeleton locks in as that worry, with her words and her hole recorded', () => {
  const f = content.byId(worries, 'no');
  const a = boot();
  a.tap('#not-sure').tap('[data-door="yes"]').tap('[data-id="no"]');
  /* B42: the plan box arrives empty on a worry that carries three sizes, and one of the
     three is the tap that fills it. Nothing is pre-filled, because a pre-filled box would be
     BETR having picked a rung. */
  a.type('#h-person', 'my sister').tap('[data-b]', 1).tap('#next').tap('[data-size]', 0).tap('#lock');
  if (a.html().indexOf('id="nothanks"') !== -1) a.tap('#nothanks');

  const cur = JSON.parse(a.mem['betr.v1']).cur;
  assert.strictEqual(cur.source, 'stock');
  assert.strictEqual(cur.id, 'no');
  assert.strictEqual(cur.label, f.label);
  assert.strictEqual(cur.prediction, 1);
  assert.deepStrictEqual(cur.slots, { person: 'my sister' });
  assert.strictEqual(cur.belief, content.fill(f.beliefs[1].belief, { person: 'my sister' }, f.skeleton.holes));
  assert.strictEqual(cur.x, content.fill(f.beliefs[1].expect, { person: 'my sister' }, f.skeleton.holes),
    'B20’s expectation did not travel through the holes');

  /*
    And an expectation that BEGINS with a hole begins with a capital. Hers is lowercase far
    more often than not, and "my brother will go quiet, change the subject" is a sentence that
    starts in the middle of itself — on the result screen, in 800 weight, next to what actually
    happened. `guards.expectationFrom` has capitalised a DERIVED expectation since the day it
    was written; this is the same rule on a hand-written one.
  */
  const leads = content.byId(worries, 'strug');
  assert.match(leads.beliefs[0].expect, /^\{person\}/, 'this test needs an expect that leads with a hole');
  const c = boot();
  c.tap('#not-sure').tap('[data-door="secret"]').tap('[data-id="strug"]');
  c.type('#h-person', 'my brother').tap('[data-b]', 0).tap('#next').tap('[data-size]', 0).tap('#lock');
  if (c.html().indexOf('id="nothanks"') !== -1) c.tap('#nothanks');
  assert.match(JSON.parse(c.mem['betr.v1']).cur.x, /^My brother will go quiet/);
  a.shows('my sister').hides('{person}');
});

/*
  Three runs of one skeleton with three different names draw ONE ladder. This is B40's picture
  taken on the road it was built for, and the thing that would have failed silently: each of
  these sentences differs from the last, and all three are the same belief.
*/
test('three fills of one skeleton draw one ladder, and it is the worry’s', () => {
  const a = boot();
  const run = (name, first) => {
    if (!first) a.tap('#m-new').tap('#back');
    a.tap('#not-sure').tap('[data-door="yes"]').tap('[data-id="no"]');
    a.type('#h-person', name).tap('[data-b]', 0).tap('#next').tap('[data-size]', 0).tap('#lock');
    if (a.html().indexOf('id="nothanks"') !== -1) a.tap('#nothanks');
    a.tap('#done').type('#o', 'Nothing much.').tap('#next').tap('[data-key]', 1);
  };
  run('my sister', true);
  run('my boss', false);
  run('my neighbour', false);

  a.shows('>7<');
  a.tap('#m-mine').shows('1 test, done 3 times');
  const done = JSON.parse(a.mem['betr.v1']).done;
  const groups = require('../lib/rate.js').series(done);
  assert.strictEqual(groups.length, 1, 'three names drew ' + groups.length + ' ladders');
  assert.deepStrictEqual(groups[0].rungs, [9, 8, 7]);
  assert.deepStrictEqual(done.map((d) => d.slots.person), ['my sister', 'my boss', 'my neighbour']);
});

/*
  B40's link, on the road it was actually specified for: it COLLAPSES the printed skeleton into
  one blank holding the assembled sentence. She keeps every word, including the one she typed
  into the hole, and from that tap it is hers.
*/
test('write the whole thing myself collapses a skeleton into one blank, words and all', () => {
  const a = boot();
  a.tap('#not-sure').tap('[data-door="yes"]').tap('[data-id="no"]');
  a.type('#h-person', 'my father-in-law').tap('#ownit');
  a.shows(en.s.build.title).hides(en.s.build.borrowTitle);
  assert.strictEqual(a.valueOf('#if'), 'say no to my father-in-law without giving a reason');
  assert.strictEqual(a.html().indexOf('id="h-person"'), -1, 'the holes are still on screen');
});

/*
  And the road most people are on did not change. A worry with no skeleton draws the one big
  blank it always drew, and so does the free-text road — same screen, boxes empty. B41 is more
  printed words and smaller blanks where there is a skeleton, and nothing at all where there is
  not; there is no mode, no toggle and no second code path (B37 §3).
*/
/*
  B46, 2026-09-09, AND THIS TEST USED TO ASSERT THE OPPOSITE.

  It was called "a worry with no skeleton, and the free-text road, are exactly as they were",
  and it held down the promise that B41 changed only two of the twenty-one. That promise is what
  the founder opened the app and could not find: nineteen worries handed a person a screen headed
  *Make it yours* with two empty blanks and nothing in them.

  So it is now the other way round. THE PRINTED VERB IS THE DEFAULT, and the one wide blank is
  the exit — the screen you get when you have said none of these fits, and nowhere else.
*/
test('every worry prints a verb, and only the write-your-own road has one wide blank', () => {
  /* the write-your-own road, and it is the only place a wide blank is left */
  const own = boot().tap('#m-new');
  own.shows('id="if"').hides('data-hole');

  for (const door of doors.items) {
    for (const id of door.worries) {
      const f = content.byId(worries, id);
      const a = boot().tap('#not-sure').tap('[data-door="' + door.id + '"]').tap('[data-id="' + id + '"]');
      a.hides('id="if"');
      assert.ok(a.html().indexOf('class="part skel"') !== -1, id + ' has no printed verb');
      /* the first prediction, printed with the holes standing on their own words */
      a.showsText(said(f, f.beliefs[0].belief));
    }
  }

  /* and the wide-blank road still walks all the way through */
  const b = boot().tap('#m-new');
  b.type('#if', 'say no').type('#then', 'they will mind').tap('#next');
  b.shows(en.s.build.doTitle);
});

/* ------------------------------------------------------- B42: three sizes, the dial as content */

/*
  THE DIAL, ON BOTH ROADS. Three named steps, small to big, each a sentence a person can read
  before they pick it — the founder's small / medium / big arriving as content rather than as a
  control (B36 item 8, B37 §8).

  Tapping one fills BOTH boxes, because a size is a step and the leave-out that belongs to it:
  a big go with a small leave-out is not a bigger test, it is a different one.
*/
test('three sizes are on the worry road and the free-text road, and one fills both boxes', () => {
  const f = content.byId(worries, 'no');
  assert.strictEqual(f.sizes.length, 3, 'this test needs a worry with three sizes');

  const a = boot();
  a.tap('#not-sure').tap('[data-door="yes"]').tap('[data-id="no"]');
  a.type('#h-person', 'my sister').tap('[data-b]', 0).tap('#next');
  a.shows(en.s.build.sizeChips);
  /* all three, in the file's order, with her word already in every one of them */
  for (const z of f.sizes) {
    a.shows(z.name).showsText(content.fill(z.do, { person: 'my sister' }, f.skeleton.holes));
  }
  a.hidesText('{person}');
  /* the box is empty until she picks: a pre-filled one would be BETR having picked a rung */
  assert.strictEqual(a.valueOf('#do'), '');

  a.tap('[data-size]', 1);
  assert.strictEqual(a.valueOf('#do'), content.fill(f.sizes[1].do, { person: 'my sister' }, f.skeleton.holes));
  a.showsText(content.fill(f.sizes[1].drop, { person: 'my sister' }, f.skeleton.holes));

  /* and the free-text road gets the general three, on a sentence BETR did not write */
  const b = boot().tap('#m-new');
  b.type('#if', 'leave the washing up until the morning').type('#then', 'it will still be there');
  b.tap('#next').shows(en.s.build.sizeChips);
  for (const z of general.sizes) b.shows(z.name).shows(z.do);
  b.tap('[data-size]', 0);
  assert.strictEqual(b.valueOf('#do'), general.sizes[0].do);
});

/*
  B42's rules, and every one of them is a rule because some other product broke it.

  Three, always, from the first screen to the fiftieth: no rung appears BECAUSE the last one
  went well, none is taken away, none is greyed out, none is numbered, and none is marked as
  the one to pick. A rung that depends on history is the app choosing (rule 2); a number on a
  size is a level and a level is a point (B36 §9 — 38 studies, 8,110 people, and gamification
  predicted neither the outcome nor whether anybody kept going).
*/
test('no size is ever hidden, greyed, numbered or recommended, however many are done', () => {
  const f = content.byId(worries, 'no');
  const a = boot();
  const run = (which, first) => {
    if (!first) a.tap('#m-new').tap('#back');
    a.tap('#not-sure').tap('[data-door="yes"]').tap('[data-id="no"]');
    a.type('#h-person', 'my sister').tap('[data-b]', 0).tap('#next');
    /* the same three, in the same order, on every one of these runs */
    for (const z of f.sizes) a.shows(z.name);
    const row = a.html().match(/data-chiplist="data-size">([\s\S]*?)<\/div>/);
    assert.ok(row, 'no size row on run');
    assert.strictEqual((row[1].match(/<button/g) || []).length, 3, 'not three sizes');
    assert.ok(!/disabled|aria-disabled|aria-pressed|recommended|suggested/.test(row[1]),
      'a size was marked or taken away: ' + row[1]);
    assert.ok(!/[0-9]/.test(row[1].replace(/data-size="[0-9]"/g, '')), 'a number reached a size');
    a.tap('[data-size]', which).tap('#lock');
    if (a.html().indexOf('id="nothanks"') !== -1) a.tap('#nothanks');
    a.tap('#done').type('#o', 'Nothing much.').tap('#next').tap('[data-key]', 1);
  };
  run(2, true);
  run(0, false);
  run(0, false);
  /* three tests of one worry, one ladder, and picking the small one twice cost nothing */
  a.tap('#m-mine').shows('1 test, done 3 times').shows('>7<');
});

/*
  What is recorded is WHICH SIZE IT WAS DONE AT, and that is a fact about the test rather than
  a grade of the person. It shows on that test's ladder row and in the export, it keys nothing
  — rate.keyOf still groups a ladder by the worry's id, so three sizes of one worry are one
  ladder (rule 5) — and it is never totalled, averaged or compared with another row's.
*/
test('the size is on the ladder row and in the export, and it keys nothing', () => {
  const f = content.byId(worries, 'no');
  const a = boot();
  a.tap('#not-sure').tap('[data-door="yes"]').tap('[data-id="no"]');
  a.type('#h-person', 'my sister').tap('[data-b]', 0).tap('#next').tap('[data-size]', 0).tap('#lock');
  if (a.html().indexOf('id="nothanks"') !== -1) a.tap('#nothanks');
  a.tap('#done').type('#o', 'She said fine.').tap('#next').tap('[data-key]', 1);

  /* the result screen's ladder says it, and says it out loud */
  a.shows(f.sizes[0].name);
  assert.match(a.html(), new RegExp(en.s.a11y.rungSize.replace('{size}', f.sizes[0].name)));
  a.tap('#m-mine').shows(f.sizes[0].name);

  const saved = JSON.parse(a.mem['betr.v1']);
  assert.strictEqual(saved.done[0].size, f.sizes[0].name);
  const out = JSON.parse(require('../lib/store.js').exportJSON(saved));
  assert.strictEqual(out.results[0].size, f.sizes[0].name);

  /* and a test written from nothing carries none, so its ladder looks exactly as it did */
  const b = boot();
  buildOwn(b, 'ask for Friday off', 'my boss will mind', 'Ask once.', 'Don’t explain.');
  b.tap('#done').type('#o', 'She said fine.').tap('#next').tap('[data-key]', 1);
  assert.strictEqual(JSON.parse(b.mem['betr.v1']).done[0].size, null);
  b.hides(en.s.a11y.rungSize.split('{size}')[0]);
});

/*
  ON A REPEAT: the same three, with last time marked, and no nudge upward.

  Same again is a real answer and the screen has to let it be one — doing something once and
  getting away with it is easy to put down to luck. So the mark says what was done last time
  rather than what to do next, the order never changes, and picking the same one again is one
  tap and costs nothing.
*/
test('test this again offers the same three with last time marked, and same again is an answer', () => {
  const f = content.byId(worries, 'no');
  const a = boot();
  a.tap('#not-sure').tap('[data-door="yes"]').tap('[data-id="no"]');
  a.type('#h-person', 'my sister').tap('[data-b]', 0).tap('#next').tap('[data-size]', 2).tap('#lock');
  if (a.html().indexOf('id="nothanks"') !== -1) a.tap('#nothanks');
  a.tap('#done').type('#o', 'Nothing much.').tap('#next').tap('[data-key]', 1);

  /*
    Folded onto last time's answer to begin with — this screen always has one, and open it put
    the button that ends it 134px below the fold. Change opens all three, marked.
  */
  a.tap('#again').shows(en.s.build.sizeLabel).shows(f.sizes[2].name).hides(en.s.plan.sizeChips);
  a.tap('#sizeopen').shows(en.s.plan.sizeChips).shows(en.s.build.sizeLast);
  /* all three, in the same order, and her word still in them */
  for (const z of f.sizes) a.shows(z.name).shows(content.fill(z.do, { person: 'my sister' }, f.skeleton.holes));
  /* the mark is on the one she did, and on no other */
  const row = a.html().match(/<div class="chips">([\s\S]*?)<\/div><\/div>/);
  assert.ok(row, 'no size row on the repeat screen');
  assert.strictEqual((row[1].match(new RegExp(en.s.build.sizeLast, 'g')) || []).length, 1);
  assert.ok(row[1].indexOf(f.sizes[2].name) < row[1].indexOf(en.s.build.sizeLast));

  /* same again is one tap, and a smaller one is the same one tap: neither is nudged */
  a.tap('[data-size]', 0).shows(content.fill(f.sizes[0].do, { person: 'my sister' }, f.skeleton.holes));
  a.shows(en.s.build.sizeLabel).shows(f.sizes[0].name).hides(en.s.plan.sizeChips);
  a.tap('#lock').tap('#done').type('#o', 'Fine again.').tap('#next').tap('[data-key]', 0);
  const done = JSON.parse(a.mem['betr.v1']).done;
  assert.deepStrictEqual(done.map((d) => d.size), [f.sizes[2].name, f.sizes[0].name]);
  assert.strictEqual(require('../lib/rate.js').series(done).length, 1, 'two sizes drew two ladders');
});

/*
  A size is BETR's content and may replace BETR's content. It may never quietly delete a
  sentence a person wrote — which on this screen is the leave-out, the one box somebody is
  most likely to have put their own words in before picking how big a go to have.
*/
test('picking a size never deletes a leave-out somebody wrote themselves', () => {
  const a = boot();
  a.tap('#not-sure').tap('[data-door="yes"]').tap('[data-id="no"]');
  a.type('#h-person', 'my sister').tap('[data-b]', 0).tap('#next');
  a.tap('#dropopen').type('#drop', 'Don’t text her about it afterwards.');
  a.tap('[data-size]', 0);
  assert.strictEqual(a.valueOf('#drop'), 'Don’t text her about it afterwards.');
  /* and one of BETR's own is replaced, because that is BETR's to change */
  const f = content.byId(worries, 'no');
  a.tap('#sizeopen').tap('[data-size]', 2);
  assert.strictEqual(a.valueOf('#drop'), 'Don’t text her about it afterwards.');
  a.type('#drop', content.fill(f.sizes[2].drop, { person: 'my sister' }, f.skeleton.holes));
  a.tap('#sizeopen').tap('[data-size]', 0);
  assert.strictEqual(a.valueOf('#drop'), content.fill(f.sizes[0].drop, { person: 'my sister' }, f.skeleton.holes));
});

/*
  B49, 2026-09-10. A SIZE'S OWN HOLE, FILLED ON THE PLAN SCREEN.

  The founder's canvas row 3, and B45 §5b left it open with the reason written down: `holeRow`
  draws blanks by scanning the skeleton's if-half, so a hole used ONLY inside a size was
  declared, validated, and then printed its own default word for ever. `no`'s small go carries
  {thing} — "about something small" made tappable, not a sentence anybody rewrote — and this is
  the one worry it is built on before it goes on twenty.

  What has to hold: the blank is there, it is EMPTY (a pre-filled one reads as her words), the
  sentence still reads with nothing in it, what she types comes through to the locked-in test,
  and the nineteen worries with no such hole still get the box they always had.
*/
test('a size with a hole of its own is filled in the plan, and the plan is a sentence', () => {
  const f = content.byId(worries, 'no');
  const small = f.sizes[0];
  assert.ok(content.holesIn(small.do).indexOf('thing') !== -1,
    'this test needs a size with a hole the if-half does not have');
  assert.strictEqual(content.holesIn(f.skeleton.if).indexOf('thing'), -1,
    '{thing} is in the if-half now, and this is testing the other kind of hole');

  const a = boot().tap('#not-sure').tap('[data-door="yes"]').tap('[data-id="no"]');
  a.type('#h-person', 'my sister').tap('[data-b]', 0).tap('#next');

  /* while the three are open there is no blank: the question on the screen is still which size */
  a.hides('data-plan="thing"');
  a.tap('[data-size]', 0);

  /* picked, and the plan is the sentence with a gap in it rather than a box */
  a.shows('data-plan="thing"').hides('id="do"');
  assert.strictEqual(a.valueOf('#p-thing'), '', 'the hole arrived with a word already in it');
  /* the word she typed a screen ago is printed, and marked, and not editable here */
  a.shows('class="carried">my sister');
  /* and the hole's own word stands in, as an example, so the sentence reads untouched */
  a.shows('placeholder="' + f.skeleton.holes.thing + '"');

  /* what she puts in it is what gets locked in */
  a.type('#p-thing', 'the Saturday thing').tap('#lock');
  if (a.html().indexOf('id="nothanks"') !== -1) a.tap('#nothanks');
  const cur = JSON.parse(a.mem['betr.v1']).cur;
  assert.strictEqual(cur.test, 'Say no to my sister once today, about the Saturday thing.');
  assert.strictEqual(cur.slots.thing, 'the Saturday thing', 'the word did not travel with the test');
  assert.strictEqual(cur.size, small.name);
});

test('a size with no hole of its own is still the box it always was', () => {
  const f = content.byId(worries, 'no');
  const a = boot().tap('#not-sure').tap('[data-door="yes"]').tap('[data-id="no"]');
  a.type('#h-person', 'my sister').tap('[data-b]', 0).tap('#next').tap('[data-size]', 1);
  a.shows('id="do"').hides('data-plan=');
  assert.strictEqual(a.valueOf('#do'), content.fill(f.sizes[1].do, { person: 'my sister' }, f.skeleton.holes));

  /* and the nineteen with no hole anywhere in their sizes are untouched on every size */
  const b = boot().tap('#not-sure').tap('[data-door="work"]').tap('[data-id="rest"]');
  b.tap('[data-b]', 0).tap('#next');
  for (let i = 0; i < 3; i += 1) {
    if (i) b.tap('#sizeopen');
    b.tap('[data-size]', i).shows('id="do"').hides('data-plan=');
  }
});

test('Change gives back the box, with the words she filled in still in it', () => {
  const a = boot().tap('#not-sure').tap('[data-door="yes"]').tap('[data-id="no"]');
  a.type('#h-person', 'my sister').tap('[data-b]', 0).tap('#next').tap('[data-size]', 0);
  a.type('#p-thing', 'the Saturday thing').tap('#sizeopen');
  /* the way back to writing the whole thing herself, and nothing of hers was lost getting there */
  a.shows('id="do"');
  assert.strictEqual(a.valueOf('#do'), 'Say no to my sister once today, about the Saturday thing.');
});

/*
  The hard stop is the one line BETR refuses, and it has to run on every way of getting words
  into the plan. This one is new, so it is the newest way round it.
*/
test('the one hard stop runs on a size’s own hole', () => {
  const a = boot().tap('#not-sure').tap('[data-door="yes"]').tap('[data-id="no"]');
  a.type('#h-person', 'my sister').tap('[data-b]', 0).tap('#next').tap('[data-size]', 0);
  a.type('#p-thing', 'the night I wanted to kill myself').tap('#lock');
  a.shows(en.s.refusal.harm);
  a.hides(en.s.locked.kicker);
});

/*
  B49, the canvas's row 8. Three rungs all reading "A small go" are three rows that look like
  the same test done three times, and they were not — the word she put in the hole is the thing
  that told them apart, and it was only ever in the plan.
*/
test('a rung carries the word she put in the size’s own hole', () => {
  const a = boot().tap('#not-sure').tap('[data-door="yes"]').tap('[data-id="no"]');
  a.type('#h-person', 'my sister').tap('[data-b]', 0).tap('#next').tap('[data-size]', 0);
  a.type('#p-thing', 'the Saturday thing').tap('#lock');
  if (a.html().indexOf('id="nothanks"') !== -1) a.tap('#nothanks');
  a.tap('#done').type('#o', 'She said fine and asked somebody else.').tap('#next').tap('[data-key]', 1);
  a.shows('A small go · the Saturday thing');
  /* and the ear gets it too, without a middle dot read out in the middle of her own words */
  a.shows(en.s.a11y.rungSize.split('{size}').join('A small go, the Saturday thing'));
});

/*
  B42, AND IT IS B39'S ROW ON THE OTHER HALF OF THE SAME SCREEN. Open, the three cost 257px at
  100% text and put *Lock it in* at 925 on a phone whose fold is 780. Once one of them is in
  the box the row says which, and *Change* opens all three again — folded, not gone, which is
  the difference between a rung one tap away and a rung the app has decided somebody is past.
*/
test('the size row folds to say which one is picked, and Change opens all three again', () => {
  const f = content.byId(worries, 'no');
  const a = boot();
  a.tap('#not-sure').tap('[data-door="yes"]').tap('[data-id="no"]');
  a.type('#h-person', 'my sister').tap('[data-b]', 0).tap('#next');
  /* open to begin with: nothing has been answered yet */
  a.shows(en.s.build.sizeChips).showsText(content.fill(f.sizes[2].do, { person: 'my sister' }, f.skeleton.holes));

  a.tap('[data-size]', 1);
  a.shows('id="sizeopen"').shows(f.sizes[1].name).hides(en.s.build.sizeChips);
  /* and the one it says is the one in the box */
  assert.strictEqual(a.valueOf('#do'), content.fill(f.sizes[1].do, { person: 'my sister' }, f.skeleton.holes));
  /* the other two are one tap away, in the order they were always in */
  a.tap('#sizeopen').shows(en.s.build.sizeChips);
  for (const z of f.sizes) a.shows(z.name);
  a.tap('[data-size]', 0).shows(f.sizes[0].name).hides(en.s.build.sizeChips);
  a.shows(en.s.build.sizeLabel);

  /*
    And words of her own take the row out of the way: it is not folded, because there is no
    size in the box to name, and it is not open, because it has nothing to say about a sentence
    she wrote. It carries `hidden`, which is how every suggestion row on this screen gets out
    of the way — the fake DOM here is flat and ignores it, so this reads the attribute.
  */
  a.tap('#sizeopen').type('#do', 'Say no to her about the car.').tap('#dropopen');
  a.hides('id="sizeopen"');
  assert.match(a.html(), /data-chips="data-size"[^>]* hidden/, 'the row is still on screen');
});

/*
  The hard stop runs on what is typed into a hole, exactly as it runs on both boxes — and it has
  to, because the if-half of a skeleton test is assembled FROM the holes and is never typed
  anywhere else. If this ever stops firing, the one line BETR refuses has a way round it.
*/
test('the one hard stop runs on a hole, the same as on a box', () => {
  const a = boot();
  a.tap('#not-sure').tap('[data-door="yes"]').tap('[data-id="no"]');
  a.type('#h-person', 'the person I told I want to kill myself').tap('#next');
  a.shows(en.s.refusal.harm);
  a.hides(en.s.build.doTitle);
});

/*
  B40, 2026-09-09, AND IT REVERSES WHAT THE TEST HERE ASSERTED FOUR DAYS AGO.

  B32's rule was that the WORDS decide which kind of test comes out: keep a borrowed item's
  prediction letter for letter and it is that item, change one word and it is yours, with a
  ladder of its own. B40's rule is that the ROAD decides. Stay on a worry's road and the test is
  that worry's, whatever you type over it.

  The reason is B41, and it is not a preference. A sentence with holes in it — "If I say no to
  {person} without giving a reason" — differs from its skeleton the moment somebody fills it in,
  which is the entire point of it. Under the old rule every filled-in test would have been a
  stranger to itself, every one would have started at the top of the ladder, and the one number
  in the product would never have moved off its first rung. With every test still passing.

  So the two halves of the old decision are now these two tests, and the second one is the price
  of the first: because editing no longer takes you out, there has to be a door that does.
*/
test('editing a borrowed sentence keeps it inside the worry, and the ladder goes on moving', () => {
  const f = firstBehind(0);
  const a = boot();

  /* first, one of the item's three, word for word */
  a.tap('#not-sure').tap('[data-door]', 0).tap('[data-id]', 0).tap('[data-b]', 0).tap('#next').tap('[data-size]', 0);
  a.tap('#lock').tap('#nothanks').tap('#done').type('#o', 'Nothing happened.').tap('#next').tap('[data-key]', 2);
  a.shows('>7<');

  /* now the same worry again, with the prediction put in their own words */
  a.tap('#m-new').tap('#back').tap('#not-sure').tap('[data-door]', 0).tap('[data-id]', 0);
  a.type('#then', 'nobody will even notice I was gone').tap('#next').tap('[data-size]', 0);
  a.tap('#lock').tap('#done');
  a.type('#o', 'Two people asked where I’d been.').tap('#next');
  /* the same belief, so the ladder carries on from 7 rather than starting again at ten */
  a.shows(en.s.ladder.lastTime).tap('[data-key]', 1).shows('>6<');
  a.shows('nobody will even notice I was gone');

  /* one worry, one card, one ladder — and the card quotes the newest wording */
  a.tap('#m-mine').shows('1 test, done 2 times');
  a.shows(f.label).shows('nobody will even notice I was gone').shows('>6<');

  const done = JSON.parse(a.mem['betr.v1']).done;
  assert.ok(done.every((d) => d.source === 'stock' && d.id === f.id), 'an edit left the worry');
  /*
    Their sentence, assembled from the half that was already there and the half they wrote —
    and the space after "If I" is dropped where the first half opens with an apostrophe, which
    half the stock sentences do ("If I'm not reachable for an evening").
  */
  assert.strictEqual(done[1].belief,
    said(f, 'If I ' + f.skeleton.if + ', then nobody will even notice I was gone.'));
  /* which of the three it started from is recorded, and the second run started from none */
  assert.strictEqual(done[0].prediction, 0);
  assert.strictEqual(done[1].prediction, null);
  /*
    And an empty set of holes is null rather than an empty object, on every record, so that
    "no holes" and "older than holes" are one shape to everything that reads it (see filled()).
  */
  assert.ok(done.every((d) => d.slots === null), 'an empty set of holes reached a record');
  /*
    And the half of B32 that B40 did NOT change: sameAsStock() decides the WORDING still, so a
    sentence kept letter for letter carries B20's hand-written expectation — what you would be
    braced for, which is not the same words as the prediction and is better than anything read
    off it — while one the person has rewritten carries an expectation read off their own words.
  */
  assert.strictEqual(done[0].x, said(f, f.beliefs[0].expect), 'B20’s expectation did not travel');
  assert.notStrictEqual(done[1].x, said(f, f.beliefs[0].expect));
});

/*
  B40's picture, and the one thing it exists to make true: THREE RUNS OF ONE WORRY IN THREE
  DIFFERENT SETS OF WORDS DRAW ONE LADDER. This is what B41's skeletons produce every time
  somebody fills the same hole with a different name, and it is what silently would not have
  worked. Three rungs going down, on one card, under one label.
*/
test('three runs of one worry in different words draw one ladder, not three', () => {
  const f = firstBehind(0);
  const a = boot();
  const run = (words, first) => {
    if (!first) a.tap('#m-new').tap('#back');
    a.tap('#not-sure').tap('[data-door]', 0).tap('[data-id]', 0);
    a.type('#then', words).tap('#next').tap('[data-size]', 0).tap('#lock');
    if (a.html().indexOf('id="nothanks"') !== -1) a.tap('#nothanks');
    a.tap('#done').type('#o', 'Nothing much.').tap('#next').tap('[data-key]', 1);
  };
  run('my sister will think I’m being difficult', true);
  run('my boss will think I’m being difficult', false);
  run('my neighbour will think I’m being difficult', false);

  a.shows('>7<');
  a.tap('#m-mine').shows('1 test, done 3 times').shows(f.label);

  const done = JSON.parse(a.mem['betr.v1']).done;
  const rate = require('../lib/rate.js');
  const groups = rate.series(done);
  assert.strictEqual(groups.length, 1, 'one worry drew ' + groups.length + ' ladders');
  assert.deepStrictEqual(groups[0].rungs, [9, 8, 7]);
  assert.ok(done.every((d) => d.id === f.id && d.source === 'stock'));
});

/*
  And the door out, which B40 had to build because editing stopped being one. One plain link,
  on the borrowed road only, and from that tap the test is theirs: its own id, its own ladder,
  starting at the top — and the worry's own card sitting where it was with its rungs untouched.
  That is the one place a person could feel they had lost something, which is why both halves
  are asserted here.
*/
test('write the whole thing myself hands over a genuinely own test, and leaves the worry alone', () => {
  const f = firstBehind(0);
  const a = boot();

  /* the worry, once, so it has a ladder that must not move */
  a.tap('#not-sure').tap('[data-door]', 0).tap('[data-id]', 0).tap('[data-b]', 0).tap('#next').tap('[data-size]', 0);
  a.tap('#lock').tap('#nothanks').tap('#done').type('#o', 'Nothing happened.').tap('#next').tap('[data-key]', 2);
  a.shows('>7<');

  /* now borrow it and leave */
  a.tap('#m-new').tap('#back').tap('#not-sure').tap('[data-door]', 0).tap('[data-id]', 0);
  a.shows(en.s.build.borrowTitle).shows(en.s.build.own);
  a.tap('#ownit');
  /* it is the plain build screen now: no worry above it, no three to pick from, no way back in */
  a.shows(en.s.build.title).hides(en.s.build.borrowTitle);
  a.hides(en.s.build.borrowChips).hides(en.s.build.own).hides(f.label);

  /* B42: and the plan does not come with her. Leaving the worry's road leaves BETR's plan
     for it behind, exactly as the free-text road has always started empty — so this is one of
     the general three, not that worry's. */
  a.type('#then', 'the whole evening will be ruined').tap('#next').tap('[data-size]', 0).tap('#lock').tap('#done');
  a.type('#o', 'It was fine.').tap('#next');
  a.shows(en.s.ladder.started).tap('[data-key]', 1).shows('>9<');

  const done = JSON.parse(a.mem['betr.v1']).done;
  assert.strictEqual(done[1].source, 'own');
  assert.notStrictEqual(done[1].id, f.id);
  /* nothing of the worry's rides along on a test that is nobody's but theirs */
  assert.strictEqual(done[1].label, null);
  assert.strictEqual(done[1].prediction, null);
  assert.strictEqual(done[1].slots, null);

  /* two cards, and the worry is on the rung it was left on */
  a.tap('#m-mine').shows('2 tests, done 2 times');
  a.shows(f.label).shows('>7<').shows('the whole evening will be ruined');
});

/*
  THE SECOND END OF B40'S IDENTITY CHANGE, and it is the one that would have gone unnoticed.

  "Test this again" looks a stock item's plan up fresh rather than replaying it out of the
  record, so that a corrected wording in worries.js reaches everyone who repeats it. That was
  safe while a rewritten plan belonged to an OWN test with no item to look up. Under B40 a test
  can be filed under a worry with a plan the person typed over — and looking it up fresh would
  hand BETR's sentence back on the one screen whose entire job is to bring hers back.

  Both halves are asserted here, because fixing one by breaking the other is the easy mistake.
*/
test('test this again brings back the plan she wrote, and BETR’s where she wrote none', () => {
  const f = firstBehind(0);
  const a = boot();

  /* hers: borrowed, then the plan typed over */
  a.tap('#not-sure').tap('[data-door]', 0).tap('[data-id]', 0).tap('[data-b]', 0).tap('#next');
  a.type('#do', 'Leave it in the kitchen from seven.');
  a.tap('#dropopen').type('#drop', 'Don’t tell anyone I’m doing it.');
  a.tap('#lock').tap('#nothanks').tap('#done');
  a.type('#o', 'Nothing happened.').tap('#next').tap('[data-key]', 1);
  a.tap('#again');
  a.shows('Leave it in the kitchen from seven.').shows('Don’t tell anyone I’m doing it.');
  a.hides(said(f, f.test));

  /* BETR's: the same worry, plan untouched, so a correction in the list still reaches her */
  a.tap('#m-new').tap('#back').tap('#not-sure').tap('[data-door]', 0).tap('[data-id]', 0);
  a.tap('[data-b]', 1).tap('#next').tap('[data-size]', 0).tap('#lock').tap('#done');
  a.type('#o', 'Nothing again.').tap('#next').tap('[data-key]', 1);
  a.tap('#again').shows(said(f, f.test));
});

/*
  The free-text road has no way out because it is already out, and offering one would be a
  puzzle: nothing to leave, nothing to write that you are not already writing.
*/
test('the way out is only ever offered on the road that has something to leave', () => {
  const a = boot().tap('#m-new');
  a.shows(en.s.build.title).hides(en.s.build.own);
  a.type('#if', 'say no').type('#then', 'they will mind').tap('#next');
  a.hides(en.s.build.own);
});

/*
  Founder, 2026-09-03: the yellow at the end of a report "looks weird, the lines look like
  they're too tightly packed". The highlight is drawn round each line of the inline span with
  6px of padding above and below, so two bands stay apart only while the line height is bigger
  than the text plus both paddings — 1.44 at the largest size in the clamp. It was 1.2, so
  every band overlapped the one below it. This pins the fix the same way the pre-wrap
  assertion above pins the line breaks.
*/
test('the highlight on the result screen has room between its lines', () => {
  const css = fs.readFileSync(path.join(__dirname, '..', 'app.css'), 'utf8');
  const rule = css.match(/\.result \.real \{([^}]*)\}/);
  assert.ok(rule, 'the highlighted paragraph has no rule of its own any more');
  const lh = Number((rule[1].match(/line-height\s*:\s*([\d.]+)/) || [])[1]);
  assert.ok(lh >= 1.5, 'line-height is ' + lh + ': the yellow bands will touch or overlap');

  const pad = css.match(/\.result \.real \.wrote \{[^}]*padding\s*:\s*(\d+)px/);
  assert.ok(pad && Number(pad[1]) <= 8, 'the padding grew without the line-height growing with it');
});

/*
  B29, 2026-09-08, and the walk changed shape with the rule. A verdict is still reframed and
  a sentence about anyone's safety is still refused; a test naming the habit now goes
  through, because the founder moved that line out of the app and onto Help.
*/
test('the build screen refuses an empty blank and anyone’s safety, and nothing else', () => {
  const a = boot().tap('#m-new').shows(en.s.build.title);

  /* An empty first blank has its own line, because the second one's would read as nonsense. */
  a.tap('#next').shows(en.s.refusal.emptyIf).shows(en.s.build.title);
  a.type('#if', 'ask for Friday off').tap('#next').shows(en.s.refusal.emptyBelief);

  /* The one hard stop, on the second blank, with the crisis lines under it. */
  a.type('#then', 'they’ll know I want to kill myself').tap('#next');
  a.shows('can’t help with that one').shows('call your local emergency number');
  /* and the person's own words are still in the blanks, not taken away */
  assert.strictEqual(a.valueOf('#if'), 'ask for Friday off');

  a.type('#then', 'my boss will think I am not committed').tap('#next');
  a.shows(en.s.build.doTitle);

  /* and again on the plan, where it is a thing to do rather than a thing to expect */
  a.type('#do', 'Cut myself where nobody will see it').tap('#lock').shows('can’t help with that one');
  /* the habit, which used to be a wall here and is not one any more */
  a.type('#do', 'Go for a pint with them and ask then').tap('#lock').shows(en.s.locked.title);
});

/*
  B30, and it is the founder's bar written down: from a car, under thirty seconds to Lock it
  in. Nothing between the two blanks and the locked screen may grow into another question.
*/
test('a test built from nothing goes straight from the sentence to locked in', () => {
  const a = boot();
  buildOwn(a, 'ask for Friday off', 'my boss will think I am not committed',
    'Ask for Friday off in one sentence.', 'Don’t explain why.');
  a.shows(en.s.locked.title).shows('Ask for Friday off in one sentence.').shows('Don’t explain why.');
  /* the sentence is its own title, assembled from the two halves and the printed words */
  a.shows('If I ask for Friday off, then my boss will think I am not committed.');

  a.tap('#done').type('#o', 'She said fine.').tap('#next').tap('[data-key]', 1);
  a.shows('You expected').shows('My boss will think I am not committed');
  a.shows('If I ask for Friday off, then my boss will think I am not committed.');
});

/*
  The chips, which are the Practice half: everything typed above can also be tapped, and a
  person who taps their way through never sees a box they had to think of words for.
*/
test('the whole thing can be built from the suggestions, with nothing typed', () => {
  const a = boot().tap('#m-new');

  a.tap('[data-if]', 0).shows(plainly(front[0]));
  /* B45 §5c: the second blank's suggestions are that WORRY's three predictions, not the
     general ones — the first chip is the worry `no`, which the front door used to describe
     a second time in its own words. */
  for (const line of thensOf(front[0])) a.shows(line);
  a.tap('[data-then]', 0).tap('#next');

  /*
    B45 §5e: three named sizes here, not the two loose lines a start used to carry. B45 §5c:
    and they are this worry's OWN three, because the words in the blank are its words. One tap
    fills BOTH boxes, so the leave-out never has to be opened by somebody tapping through.
  */
  const zs = sizesOf(front[0]);
  for (const z of zs) a.showsText(z.name).showsText(z.do);
  a.tap('[data-size]', 0);
  a.tap('#lock');
  if (a.html().indexOf('id="nothanks"') !== -1) a.tap('#nothanks');

  a.shows(en.s.locked.title).showsText(zs[0].do).showsText(zs[0].drop);
  a.showsText('If I ' + plainly(front[0]) + ', then ' + thensOf(front[0])[0] + '.');
});

/*
  B45 §5e, 2026-09-10, AND IT IS B45 §2's "WORST SINGLE FACT" NAILED DOWN SO IT CANNOT COME
  BACK.

  The do screen had two shapes and the invisible thing that chose between them was a word-for-
  word lookup into starts.js. Every start had a hand-written pair of loose `dos`; none had
  three sizes. So sizesFor() stopped at a matched start, found no sizes, and drew the OLD
  screen — while a sentence BETR had never seen fell through to `general` and drew the new one.

    TAPPING ONE OF BETR'S OWN SUGGESTIONS GOT THE OLD SCREEN.
    TYPING SOMETHING BETR HAD NEVER SEEN GOT THE NEW ONE.

  Exactly backwards, on the front door, and the same act had a dial on the worry road and none
  here: start #01 IS the worry `no`, which has carried three sizes since B42.

  This walks all three roads into the same screen and holds them to the same shape. It is the
  §9 acceptance test in miniature: a person cannot tell, from this screen, which road they came
  in on.
*/
test('the do screen has the same three sizes whether a suggestion was tapped, typed or borrowed', () => {
  const sizeRow = (a) => {
    const row = a.html().match(/data-chiplist="data-size">([\s\S]*?)<\/div>/);
    assert.ok(row, 'no size row on this road at all');
    assert.strictEqual((row[1].match(/<button/g) || []).length, 3, 'not three sizes');
    return row[1];
  };

  /*
    B45 §5c, AND IT IS THE SAME WORRY DOWN ALL THREE. The front door's first suggestion IS the
    worry `no`; until the merge it was a second description of it in another file, with its own
    predictions and no sizes at all. So all three roads below now hand back `no`'s own three
    steps — the first two with the hole at its default word, the third with hers in it.
  */
  const f = content.byId(worries, 'no');
  const own = sizesOf(f);

  /* 1. tapped: BETR's own first suggestion, word for word */
  const a = boot().tap('#m-new').tap('[data-if]', 0).tap('[data-then]', 0).tap('#next');
  for (const z of own) a.showsText(z.name).showsText(z.do);
  sizeRow(a);
  /* and the loose row that used to be this screen is nowhere on it */
  assert.strictEqual(a.html().indexOf('data-do='), -1, 'the old loose row is still being drawn');

  /* 2. typed: the same words, typed out rather than tapped (B34 D1's case) */
  const b = boot().tap('#m-new');
  b.type('#if', plainly(f)).type('#then', 'they will be off with me').tap('#next');
  for (const z of own) b.showsText(z.name).showsText(z.do);
  sizeRow(b);

  /* 3. borrowed: the same worry through the door, with her word in the hole */
  const c = boot().tap('#not-sure').tap('[data-door="yes"]').tap('[data-id="no"]');
  c.type('#h-person', 'my sister').tap('[data-b]', 0).tap('#next');
  for (const z of f.sizes) c.shows(z.name).showsText(content.fill(z.do, { person: 'my sister' }, f.skeleton.holes));
  sizeRow(c);

  /* every road: three named steps, and an empty box, because BETR has not picked one */
  for (const road of [a, b, c]) {
    road.shows(en.s.build.sizeChips);
    assert.strictEqual(road.valueOf('#do'), '', 'a box arrived with a plan already in it');
  }
});

/*
  And a first blank BETR did not write gets the general set — which after the first week is
  most of the time. The lookup is word for word and is not allowed to become cleverer than
  that (CLAUDE.md rule 2): whether a suggestion is offered may never depend on a judgement.
*/
test('a sentence BETR did not write gets the general suggestions, not a guess', () => {
  const a = boot().tap('#m-new');
  a.type('#if', 'let the washing up wait until the morning').tap('[data-then]', 0);
  a.shows(general.thens[0]);
  /* front[1], not front[0]: the first suggestion's first prediction is also the placeholder. */
  for (const line of thensOf(front[1])) a.hides(line);
});

test('a person’s own test can be repeated tomorrow, and back goes to the result', () => {
  const a = boot();
  buildOwn(a, 'ask for Friday off', 'my boss will think I am not committed',
    'Ask for Friday off in one sentence.', 'Don’t explain why.');
  a.tap('#done');
  a.type('#o', 'She said fine and went back to her screen.').tap('#next').tap('[data-key]', 3);
  /* B30: a test a person built has no label. Its own sentence is its title, everywhere. */
  a.shows('If I ask for Friday off, then my boss will think I am not committed.');
  a.hides('Your own');
  a.tap('#again').shows('Ask for Friday off in one sentence.');
  a.tap('#back').shows('You expected');
});

/*
  B30, and it is a bug fixed rather than a feature added. An own ladder used to be grouped by
  the SENTENCE, so correcting three words of your own wording the next day started a new
  ladder and the old one looked lost. It gets an id of its own at the moment it is built.
*/
test('a test you built keeps its ladder, and the ladder is not keyed by the sentence', () => {
  const rate = require('../lib/rate.js');
  const a = boot();
  buildOwn(a, 'ask for Friday off', 'my boss will think I am not committed',
    'Ask for Friday off in one sentence.', 'Don’t explain why.');
  a.tap('#done').type('#o', 'She said fine.').tap('#next').tap('[data-key]', 1);
  a.tap('#again').tap('#lock').tap('#done').type('#o', 'Nobody minded.').tap('#next').tap('[data-key]', 1);
  a.shows('>8<');
  a.tap('#m-mine').shows('1 test, done 2 times');

  const done = JSON.parse(a.mem['betr.v1']).done;
  assert.strictEqual(done.length, 2);
  assert.ok(done[0].id && done[0].id === done[1].id, 'the two runs are not the same test');
  assert.strictEqual(rate.keyOf(done[0]), 'own:' + done[0].id, 'an own ladder is keyed by its sentence again');

  /* a record made before B30 has no id, and still groups by its sentence, exactly as it did */
  const old = { source: 'own', id: null, belief: 'If I rest, then I will feel guilty.' };
  assert.strictEqual(rate.keyOf(old), 'own:If I rest, then I will feel guilty.');
});

test('Help carries the sentences, the crisis lines and the lineage', () => {
  const a = boot();
  a.tap('#m-help');
  a.shows('Turn on airplane mode');
  a.shows('not a medical device');
  a.shows('It does not diagnose, treat, cure or prevent any condition');
  a.shows('116 123').shows('988').shows('findahelpline.com');
  a.shows('made by the people behind TrybeUP');
  a.shows('Dev build — not published');
});

test('none of the phrases that are never used appears anywhere in the app', () => {
  const a = boot();
  const screens = ['#m-help'];
  a.tap('#m-help');
  let seen = a.html();
  a.tap('#back').tap('#not-sure').tap('[data-door]', 0);
  seen += a.html();
  a.tap('#own');
  seen += a.html();
  seen += a.type('#if', 'say no').type('#then', 'they will mind').tap('#next').html();
  /* and the two screens the ladder lives on, which is where a score would creep in */
  const b = boot();
  b.tap('#not-sure').tap('[data-door]', 0).tap('[data-id]', 0).tap('[data-b]', 0).tap('#next').tap('[data-size]', 0).tap('#lock').tap('#nothanks').tap('#done');
  b.type('#o', 'He said fair enough.').tap('#next').tap('[data-key]', 1);
  seen += b.html();
  seen += b.tap('#m-mine').html();
  for (const phrase of ['digital CBT', 'improve your mental health', 'irrational',
                        'streak', 'you missed', 'tracks your anxiety']) {
    assert.ok(seen.toLowerCase().indexOf(phrase.toLowerCase()) === -1, 'found "' + phrase + '"');
  }
  assert.ok(screens.length === 1);
});

test('export holds every result, and delete leaves nothing behind', () => {
  const a = boot();
  a.tap('#not-sure').tap('[data-door]', 0).tap('[data-id]', 0).tap('[data-b]', 0).tap('#next').tap('[data-size]', 0).tap('#lock').tap('#nothanks').tap('#done');
  a.type('#o', 'He said fair enough.').tap('#next').tap('[data-key]', 2);
  a.tap('#m-help').tap('#export');
  const dump = JSON.parse(a.valueOf('#dump'));
  assert.strictEqual(dump.app, 'BETR');
  assert.strictEqual(dump.results.length, 1);
  assert.strictEqual(dump.results[0].happened, 'He said fair enough.');
  assert.strictEqual(dump.results[0].worry, firstBehind().label);
  a.tap('#wipe').shows('There is no copy anywhere else');
  a.tap('#yes').shows(en.s.start.caption);
  a.hides('He said fair enough');
  a.tap('#m-help');
  assert.strictEqual(JSON.parse(a.tap('#export').valueOf('#dump')).results.length, 0);
  assert.deepStrictEqual(Object.keys(a.mem), [], 'the storage key survived the delete');
});

test('it starts cleanly from nothing, from rubbish, and from a half-finished loop', () => {
  boot({ 'betr.v1': '{{{ not json' }).shows(en.s.start.caption);
  boot({ 'betr.v1': '[]' }).shows(en.s.start.caption);
  /* a stage that needs a current test, with no current test, must not strand anyone */
  boot({ 'betr.v1': JSON.stringify({ stage: 'plan', cur: null, done: [] }) })
    .shows(en.s.start.caption);
  boot({ 'betr.v1': JSON.stringify({ stage: 'result', cur: null, done: [] }) })
    .shows(en.s.start.caption);
});

test('a locked expectation cannot be edited after the test is done', () => {
  const a = boot();
  a.tap('#not-sure').tap('[data-door]', 0).tap('[data-id]', 1).tap('[data-b]', 0).tap('#next').tap('[data-size]', 0).tap('#lock');
  a.hides('Not quite? Change it');
  a.tap('#nothanks').tap('#done').type('#o', 'She said yes.').tap('#next').tap('[data-key]', 1);
  a.hides('Not quite? Change it');
});

/* ------------------------------------------------------- the ladder, and getting back to a worry */

/* One whole loop, ending on the given re-rate. 0 still / 1 a bit / 2 a lot / 3 not at all / 4 more. */
function loop(a, item, said, key) {
  a.tap('#not-sure').tap('[data-door]', 0).tap('[data-id]', item).tap('[data-b]', 0).tap('#next').tap('[data-size]', 0).tap('#lock');
  if (a.html().indexOf('id="nothanks"') !== -1) a.tap('#nothanks');
  a.tap('#done').type('#o', said).tap('#next').tap('[data-key]', key);
  return a;
}

test('the same worry three days running comes down the ladder, one rung at a time', () => {
  const a = boot();
  loop(a, 0, 'He said fair enough.', 1);
  a.shows('How sure you are it goes badly').shows('>10<').shows('>9<');

  a.tap('#again').tap('#lock').tap('#done').type('#o', 'Nobody minded.').tap('#next').tap('[data-key]', 1);
  a.shows('>8<');
  a.tap('#again').tap('#lock').tap('#done').type('#o', 'She said no problem.').tap('#next').tap('[data-key]', 1);
  a.shows('>7<').shows('Down 3 since you started');

  /* three taps of the same words, three different rungs: the thing that used to be impossible */
  a.tap('#m-mine').shows('Your tests').shows('1 test, done 3 times');
  a.shows('He said fair enough.').shows('She said no problem.');
});

test('a bad day can go back up, and it is not a red day', () => {
  const a = boot();
  loop(a, 0, 'He went quiet.', 2);          /* a lot less sure: 10 → 7 */
  a.shows('>7<');
  a.tap('#again').tap('#lock').tap('#done').type('#o', 'He brought it up again.').tap('#next');
  a.tap('[data-key]', 4);                    /* more sure than before: 7 → 8 */
  a.shows('>8<');
  a.hides('missed').hides('streak').hides('failed');
});

test('an earlier worry is one tap away, and picks up where its ladder left off', () => {
  const a = boot();
  loop(a, 0, 'He said fair enough.', 2);     /* worry one: 10 → 7 */
  a.tap('#other').tap('[data-door]', 0).tap('[data-id]', 1).tap('[data-b]', 0).tap('#next').tap('[data-size]', 0).tap('#lock').tap('#done');
  a.type('#o', 'She just did it.').tap('#next').tap('[data-key]', 1);   /* worry two: 10 → 9 */

  a.tap('#m-mine').shows('2 tests, done 2 times');
  a.shows(labelOf(doors.items[0].worries[1])).shows(labelOf(doors.items[0].worries[0]));

  /* the older one is the second card, and going again keeps its rung rather than starting over */
  a.tap('[data-again]', 1).shows(said(firstBehind(0), firstBehind(0).test));
  a.tap('#lock').tap('#done').type('#o', 'Nothing happened.').tap('#next');
  a.shows('Last time').shows('>7<');
  a.tap('[data-key]', 1).shows('>6<');
});

test('your worries opens the pick list until there is one, and the worry after that', () => {
  const a = boot();
  /* nothing recorded: the door still works, and lands somewhere with something to do */
  a.tap('#m-mine').shows('What’s going on?');
  a.tap('#back').shows(en.s.start.caption);
  loop(a, 0, 'He said fair enough.', 1);
  a.tap('#m-mine').shows('Your tests').shows('He said fair enough.');
  a.tap('#back').shows(en.s.start.caption);
});

/*
  B40's own migration question, and the answer is that there isn't one. A v4 record — written
  yesterday, by the code that shipped the day before this — has no `prediction`, no `slots` and
  no `size`, and nothing reads any of the three to draw a ladder. So it draws the rungs it drew
  yesterday, and it goes on drawing them next to a v5 record of the same worry: ONE ladder, the
  old result first. If these two ever stopped joining, somebody's history would appear to have
  restarted the day they updated.
*/
test('a v4 record needs no migration, and joins a v5 one on the same ladder', () => {
  const f = firstBehind(0);
  const v4 = {
    v: 4, stage: 'start',
    done: [{
      rid: 'a-real-id-from-yesterday-0001', id: f.id, source: 'stock', label: f.label,
      belief: said(f, f.beliefs[0].belief), x: said(f, f.beliefs[0].expect), test: said(f, f.test), drop: said(f, f.drop),
      o: 'Nothing happened.', move: 'lot', level: 7, rateLabel: 'A lot less sure',
      when: '2026-09-08T10:00:00.000Z'
    }]
  };
  const a = boot({ 'betr.v1': JSON.stringify(v4) });
  a.tap('#m-mine').shows('Your tests').shows(f.label).shows('>7<');

  /* the same worry again, today, under the new rule and in words of their own */
  a.tap('#back').tap('#not-sure').tap('[data-door]', 0).tap('[data-id]', 0);
  a.type('#then', 'my sister will think I’m being difficult').tap('#next').tap('[data-size]', 0).tap('#lock');
  if (a.html().indexOf('id="nothanks"') !== -1) a.tap('#nothanks');
  a.tap('#done').type('#o', 'She laughed.').tap('#next');
  a.shows(en.s.ladder.lastTime).tap('[data-key]', 1).shows('>6<');

  a.tap('#m-mine').shows('1 test, done 2 times');
  const done = JSON.parse(a.mem['betr.v1']).done;
  assert.strictEqual(done[0].prediction, undefined, 'a v4 record was rewritten on the way in');
  const groups = require('../lib/rate.js').series(done);
  assert.strictEqual(groups.length, 1, 'the update started a second ladder');
  assert.deepStrictEqual(groups[0].rungs, [7, 6]);
});

test('a result saved by the version before the ladder still opens, and still counts', () => {
  const old = {
    id: 'no', source: 'stock', label: 'Saying no without an excuse',
    belief: 'If I say no without an excuse, people will think I am selfish.',
    x: 'They will be annoyed.', test: 'Say no once.', drop: 'Do not explain.',
    o: 'He said fair enough.', rate: 55, rateLabel: 'A bit less sure', when: '2026-09-01T10:00:00.000Z'
  };
  const a = boot({ 'betr.v1': JSON.stringify({ stage: 'start', done: [old] }) });
  a.tap('#m-mine').shows('Your tests').shows('>6<').shows('He said fair enough.');
});

/*
  B29, 2026-09-08, founder: the word is TEST. "Nobody has to say they have worries to set up
  a test." So nothing a person taps, and no heading they land on, calls the thing a worry.

  The line this draws, and it is deliberate: the OBJECT is renamed, the ordinary English word
  is not. "Worry" survives in exactly the places it means the feeling rather than the thing —
  frozen sentence 3 ("manage everyday worry"), the two paragraphs of "Why this one sticks",
  the NHS entry on the Help list. Those are prose about a mechanism, and B29 §1 exempts the
  frozen sentence for the same reason. Buttons and headings are the interface, and this is
  what stops "New worry" walking back onto the bottom row.
*/
test('nothing a person taps, and no heading, calls it a worry', () => {
  const a = boot();
  const bits = [];
  const sweep = () => {
    const h = a.html();
    for (const m of h.matchAll(/<button[^>]*>([^<]+)</g)) bits.push(m[1]);
    for (const m of h.matchAll(/<h[1-3][^>]*>([^<]+)</g)) bits.push(m[1]);
    for (const m of h.matchAll(/aria-label="([^"]+)"/g)) bits.push(m[1]);
  };

  sweep();
  a.tap('#not-sure'); sweep();
  a.tap('[data-door]', 0); sweep();
  a.tap('[data-id]', 0); sweep();
  a.tap('[data-b]', 0).tap('#next').tap('[data-size]', 0); sweep();
  a.tap('#lock'); sweep();
  a.tap('#nothanks').tap('#done'); sweep();
  a.type('#o', 'He said fair enough.').tap('#next'); sweep();
  a.tap('[data-key]', 1); sweep();
  a.tap('#m-mine'); sweep();
  a.tap('#back').tap('#m-new'); sweep();
  a.type('#if', 'say no').type('#then', 'they will mind').tap('#next'); sweep();
  a.tap('#m-help'); sweep();

  assert.ok(bits.length > 40, 'only found ' + bits.length + ' labels and headings to check');
  for (const bit of bits) {
    assert.ok(!/\bworr(y|ies)\b/i.test(bit),
      'a button or heading still says worry: "' + bit + '"');
  }

  /* And the bottom row, which is the one a person reads on every screen there is. */
  assert.strictEqual(en.s.nav.mine, 'Your tests');
  assert.strictEqual(en.s.nav.new, 'New test');
});

/*
  Founder, 2026-09-03: "please don't put things with no capitalisation … it's very modern but
  not cool". So no label a person taps starts lowercase, and the wordmark is BETR.
*/
test('every label a person taps starts with a capital, and the wordmark is BETR', () => {
  const a = boot();
  const seen = [];
  /* Chips are swept separately, below, and held to the opposite rule — see the note there. */
  const sweep = () => {
    for (const m of a.html().matchAll(/<button([^>]*)>([^<]+)</g)) {
      if (/class="chip"/.test(m[1])) continue;
      const label = m[2].replace(/^[←→·\s]+/, '');
      if (label) seen.push(label);
    }
  };

  sweep();                                             /* start */
  a.tap('#m-new'); sweep();                            /* the build screen */
  a.type('#if', 'say no').type('#then', 'they will mind').tap('#next'); sweep();
  a.tap('#back').tap('#back');
  a.tap('#not-sure'); sweep();                               /* what's going on */
  a.tap('[data-door]', 0); sweep();                    /* pick */
  a.tap('[data-id]', 0).tap('[data-b]', 0).tap('#next'); sweep();                      /* plan */
  a.tap('[data-size]', 0); sweep();                    /* a size picked, which fills the boxes */
  a.tap('#lock'); sweep();                             /* locked, with the install card */
  a.tap('#nothanks').tap('#done'); sweep();            /* happened */
  a.type('#o', 'He said fair enough.').tap('#next'); sweep();   /* sure */
  a.tap('[data-key]', 1); sweep();                     /* result */
  a.tap('#m-mine'); sweep();                             /* your worries */
  a.tap('#back').tap('#m-help'); sweep();               /* what this is */
  a.tap('#export'); sweep();

  assert.ok(seen.length > 20, 'only found ' + seen.length + ' labels to check');
  for (const label of seen) {
    assert.ok(!/^[a-z]/.test(label), 'lowercase label: "' + label + '"');
  }

  /*
    THE ONE EXEMPTION, AND IT IS NARROW ON PURPOSE (B30, 2026-09-08).

    A suggestion chip is not a label. It is a fragment of the sentence printed above it — the
    screen says "If I" and the chip says "say no without giving a reason", and capitalising it
    would put a capital in the middle of somebody's sentence. So chips are swept separately
    and held to the opposite rule, which is the only way the founder's rule stays enforced on
    everything that IS a label: if a chip class ever lands on a real button, this fails.

    A `dos` or a `drops` chip is a whole sentence and starts with a capital either way, which
    is checked in content.test.js, not here.
  */
  const chips = [];
  const chipSweep = (h) => {
    for (const m of h.matchAll(/<button class="chip"[^>]*>([^<]+)</g)) chips.push(m[1]);
  };
  const c = boot().tap('#m-new');
  chipSweep(c.html());
  c.type('#if', 'say no').type('#then', 'they will mind').tap('#next');
  chipSweep(c.html());
  /*
    B47, 2026-09-09: twenty-four until the cull, fifteen after it — twelve `if` chips and the
    general set's three `thens`. Same canary as the one in content.test.js, same rule about
    moving it.
  */
  assert.ok(chips.length > 12, 'only found ' + chips.length + ' chips to check');
  for (const chip of chips) {
    assert.ok(seen.indexOf(chip) === -1, 'a chip is also drawn as a label somewhere: "' + chip + '"');
  }
  assert.ok(a.html().indexOf('BETR') !== -1 || seen.length > 0);
});

/*
  2026-09-04, AND THE WALL THAT STOPPED BEING POSSIBLE ON 2026-09-08.

  A test user typed "if I eat gluten, it won't go well" and the app walled him over a missing
  "then". The answer that day was a nudge: ask once, show the shape that works, and take his
  words on the next tap. The answer now is that the shape is PRINTED — the screen says "If I"
  and ", then" and a person fills the gaps — so a sentence that is not a prediction cannot be
  made at all, and there is nothing left to ask about.

  This is what replaced the three tests that held the nudge down. It is the same guarantee
  said the other way round: whatever anybody types, the sentence that gets stored is a
  conditional with both halves in it, and no screen ever hands their words back to them.
*/
test('the shape is printed, so a sentence that is not a prediction cannot be made', () => {
  const typed = ['I am a waste of space', 'people will hate me', 'it won’t go well',
                 'say no', 'gluten'];
  for (const words of typed) {
    const a = boot().tap('#m-new');
    a.type('#if', words).type('#then', words).tap('#next');
    a.shows(en.s.build.doTitle);
    a.type('#do', 'Do the smallest version of it today.').tap('#lock');
    if (a.html().indexOf('id="nothanks"') !== -1) a.tap('#nothanks');
    a.shows(en.s.locked.title);

    const stored = JSON.parse(a.mem['betr.v1']).cur.belief;
    assert.match(stored, /^If I/, 'a stored sentence is not conditional: ' + stored);
    assert.match(stored, /, then \S/, 'a stored sentence has no consequence: ' + stored);
  }
});

/*
  And the three things that used to be said on the way through are said nowhere, because
  nothing can reach them: the shape nudge, and the two shape refusals it replaced in 2026-09-04.
  They are still in lib/guards.js and guards.test.js still proves every branch fires — this is
  about the app, not the guard, and it is what would fail if a screen brought one back.
*/
test('the nudge and the two shape refusals are unreachable from every screen there is', () => {
  const a = boot();
  let seen = a.html();
  a.tap('#m-new'); seen += a.html();
  a.tap('#next'); seen += a.html();
  a.type('#if', 'say no').type('#then', 'they will mind').tap('#next'); seen += a.html();
  a.tap('#back').tap('#back').tap('#not-sure'); seen += a.html();
  a.tap('[data-door]', 0); seen += a.html();
  a.tap('[data-id]', 0); seen += a.html();
  a.tap('#next'); seen += a.html();
  a.tap('[data-b]', 0).tap('#next'); seen += a.html();
  a.tap('#lock'); seen += a.html();
  seen += a.tap('#m-help').html();

  for (const gone of [en.s.nudge.shape, en.s.refusal.notConditional, en.s.refusal.noConsequence]) {
    assert.ok(seen.indexOf(gone) === -1, 'a shape wall is back on a screen: ' + gone);
  }
  /* and the guard still has all three, for the day somebody puts one back on purpose */
  const guards = require('../lib/guards.js');
  assert.strictEqual(guards.checkBelief('People will hate me').soft, 'nudge.shape');
  assert.strictEqual(guards.checkBelief('I am a bad person').reason, 'refusal.verdict');
});

/*
  What CAN still refuse a person on the way in, and it is two things. An empty blank, which is
  not a judgement about anything, and the one hard stop. The verdict guard is unreachable by
  shape — "I am a bad person" in the first blank comes out as a conditional — and it is kept
  and unit-tested anyway, because the day somebody pastes a sentence in is not the day to find
  out it was deleted.
*/
test('an empty blank is refused on both roads, and the words are not taken away', () => {
  const a = boot().tap('#m-new');
  a.tap('#next').shows(en.s.refusal.emptyIf);
  a.type('#if', 'say no without giving a reason').tap('#next').shows(en.s.refusal.emptyBelief);
  assert.strictEqual(a.valueOf('#if'), 'say no without giving a reason');

  /*
    And on the worry road, where B46 means the first half is not a blank at all: it is printed
    words with small holes in them, and the sentence already reads with nothing typed. So the
    refusal is only ever about the SECOND half — and it must not take a hole she has filled.
  */
  const f = firstBehind(0);
  const hole = Object.keys(f.skeleton.holes)[0];
  const b = boot().tap('#not-sure').tap('[data-door]', 0).tap('[data-id]', 0);
  b.hides('id="if"').shows('class="part skel"');
  b.type('#h-' + hole, 'my brother').tap('#next').shows(en.s.refusal.emptyBelief);
  assert.strictEqual(b.valueOf('#h-' + hole), 'my brother',
    'the refusal took back the word she put in the hole');

  /* the second half's box, which is a plan rather than a prediction */
  b.tap('[data-b]', 0).tap('#next').type('#do', '').tap('#lock').shows(en.s.refusal.emptyTest);
});

/*
  The line the whole of 2026-09-04 exists for, as B30 and B32 leave it. A person wrote a true
  thing about his own body into the blank box — "if I eat gluten, then I'll feel sick" — and
  the app had never once said which ones it is for.

  What it SAYS changed on 2026-09-08: "Not the weather, and not your body" was a checkability
  hint working as a wall, and the founder's own two examples both failed it. What is left is
  the half that excludes a settled fact, plus the risk line the founder asked for.

  WHERE it is has changed too, and B27 item 2's rule travels with it: it belongs on every
  screen a person can write one on. There are two, and they are the same screen twice — blank,
  and opened from the borrow list.
*/
test('every screen a person writes one on says which ones BETR is for', () => {
  const only = en.s.build.only;
  assert.ok(only.indexOf('never actually found out about') !== -1,
    'the boundary line no longer excludes a settled fact: ' + only);
  assert.ok(/risk/.test(only), 'the boundary line no longer carries the risk line: ' + only);
  assert.ok(only.indexOf('your body') === -1,
    'the narrow lane is back: it refused the founder’s own two examples (B28 §3)');

  boot().tap('#m-new').shows(only);
  boot().tap('#not-sure').tap('[data-door]', 0).tap('[data-id]', 0).shows(only);
});

/*
  B25, as B31 leaves it. Scope §3 says the front screen is where "everything starts at 10" is
  said, and on 2026-09-04 a headline change quietly took the sentence away — nobody noticed
  until a walker finished his first test, saw 10 → 9, and had no idea whether that was good.

  On 2026-09-08 the sentence went again, on purpose: the front screen SHOWS a ladder starting
  at ten instead of saying so. That is a better answer to the same problem and it is a more
  fragile one, because a card is easy to change without noticing what it was carrying. So the
  rule moved onto the card: the first rung reads ten, before anything is tapped.

  And the promise half is unchanged and is the more important half. Rule 5 and research §5.4:
  the screen may say what happened in ONE example and may never say what will happen to
  anybody else — no "most people", no average, no pace, no target.
*/
test('the front screen still shows a ladder that starts at ten', () => {
  const examples = require('../content/examples.js');
  const a = boot();

  /* the card is there before anything is tapped, and its first rung is ten */
  a.shows(en.s.start.caption);
  a.shows(examples[0].prediction).shows(examples[0].happened);
  a.shows('Started: 10 out of 10.');
  assert.match(a.html(), /class="result example"/, 'the front screen has no worked example on it');

  /* it moved, and it says by how much for THIS example only */
  a.shows('>' + examples[0].to + '<');

  /* No claim about anybody else. */
  const words = a.html().replace(/<[^>]*>/g, ' ');
  for (const bad of [/most people/i, /on average/i, /within \d/i, /in (a|two|three) (day|week|month)/i,
                     /people who/i, /users/i]) {
    assert.ok(!bad.test(words), 'the front screen has grown a promise: ' + (words.match(bad) || [])[0]);
  }
});

/*
  B31. It is an example and it is captioned as one, which is the whole of what keeps it a page
  in a book rather than a testimonial — and the MHRA reads a testimonial as an implied claim
  (research §5.2). If the founder ever chooses to show a real result of their own, this test
  is what makes changing the caption a deliberate act rather than an oversight.
*/
test('the worked example says it is an example, and names nobody', () => {
  const a = boot();
  a.shows(en.s.start.caption);
  const h = a.html();
  const at = h.indexOf(en.s.start.caption);
  assert.ok(at !== -1 && at < h.indexOf('class="result example"'),
    'the card is drawn above the line that says what it is');
  /* first-person plural, a name, or a quotation mark round the whole thing would all be a claim */
  for (const bad of [/\bsaid one\b/i, /\bone of our\b/i, /\breal person\b/i, /\btestimonial\b/i]) {
    assert.ok(!bad.test(h), 'the example is presented as somebody’s result');
  }
});

/*
  The reveal is polish and nothing depends on it: the finished card is in the markup, and the
  stylesheet only delays parts of it, inside the reduced-motion block where every other piece
  of movement in BETR lives. A person who asked for nothing to move gets the finished thing.
*/
test('the worked example is complete in the markup, and only delayed by the stylesheet', () => {
  const examples = require('../content/examples.js');
  const h = boot().html();
  assert.ok(h.indexOf(examples[0].prediction) !== -1);
  assert.ok(h.indexOf(examples[0].happened) !== -1, 'what happened is not in the markup at all');
  assert.ok(h.indexOf('Now: ' + examples[0].to + ' out of 10.') !== -1, 'the rung it moved to is not drawn');

  const css = fs.readFileSync(path.join(__dirname, '..', 'app.css'), 'utf8');
  const block = css.slice(css.indexOf('@media (prefers-reduced-motion: no-preference)'));
  assert.ok(h.indexOf(examples[0].did) !== -1, 'what they did is not in the markup at all');
  for (const rule of ['.example .you', '.example .mid', '.example .late', '.example .ladder .last']) {
    assert.ok(block.indexOf(rule) !== -1, rule + ' is not inside the reduced-motion block');
    assert.ok(css.indexOf(rule) >= css.indexOf('@media (prefers-reduced-motion: no-preference)'),
      rule + ' also animates outside the reduced-motion block');
  }
});

/*
  B38, 2026-09-09. THE BEAT THE CARD USED TO SKIP.

  The founder walked the build screen with their eldest daughter. She reached "What will you do
  today?" with no idea what was expected of her, and when it was explained said "OH NO I can't
  actually give her a criticism" and left. The one screen in BETR that teaches by showing went
  prediction → what happened, skipping the exact beat she stalled on: what somebody actually
  did, and how small it was.

  This holds the beat down and holds its SIZE down, because the size is the lesson. A `did`
  that grows into a paragraph would teach the opposite of what it is here to teach.
*/
test('the worked example shows what they actually did, and it is one small line', () => {
  const examples = require('../content/examples.js');
  const a = boot();
  const ex = examples[0];

  a.shows(en.s.example.did).shows(ex.did);
  if (ex.dropped) a.shows(ex.dropped);

  /* The order is the order it happened: the prediction, the doing, then what happened. */
  const h = a.html();
  assert.ok(h.indexOf(ex.prediction) < h.indexOf(ex.did),
    'the doing is drawn above the prediction it belongs to');
  assert.ok(h.indexOf(ex.did) < h.indexOf(ex.happened),
    'the doing is drawn after what happened, which is not the order anybody lived it');
});

/*
  B36 §12a, made into a test on 2026-09-09. The card borrowed `result.*` for its labels, and
  with two of them that read fine. A third makes the card say YOU, then THEY. Either voice is
  a decision Misha owns; two voices in one card is not a decision, it is a bug. This does not
  say which way round it goes — it says the card picks one and keeps it all the way down.
*/
test('the worked example is in one voice from top to bottom', () => {
  const labels = [en.s.example.expected, en.s.example.did, en.s.result.happened,
                  en.s.example.ladderLabel, en.s.a11y.ladderPlainExample];
  for (const label of labels) {
    assert.ok(!/\b(you|your|you’re|you've|you’ve)\b/i.test(label),
      'the example card says "' + label + '" over somebody else’s test, next to a "they" label');
  }
  /* And the person's own result screen keeps the second person, which is right there. */
  assert.match(en.s.result.expected, /\byou\b/i,
    'a person’s own result stopped being about them');
});

/*
  B38, item 7, and research/12 §9.1. BETR NEVER ASKS ANYBODY TO BE BRAVE. IT ASKS THEM TO FIND
  SOMETHING OUT.

  A dare needs permission from somebody with authority, which BETR has not got and must not
  fake — the founder's own words were that a therapist gives "the feeling of a safety net, of
  someone of authority and knowledge told me to". A question needs no permission from anyone.
  That is the one structural advantage a behavioural-experiment app has over an exposure app,
  and the loop was not using it: it said "Go and do it."

  This sweeps the words a person reads at the two moments they are being asked for something.
*/
test('the loop asks somebody to find out, and never dares them', () => {
  const dares = [/^go and do it/i, /^do it\b/i, /\bbe brave\b/i, /\bpush yourself\b/i,
                 /\bface your\b/i, /\bconfront\b/i, /\bchallenge yourself\b/i, /\byou must\b/i];
  for (const said of [en.s.locked.title, en.s.plan.lock, en.s.locked.done, en.s.locked.restDone,
                      en.s.build.lock, en.s.build.doTitle, en.s.build.doOwnPlaceholder]) {
    for (const dare of dares) {
      assert.ok(!dare.test(said), 'the loop dares somebody: “' + said + '”');
    }
  }
});

/*
  B36 §10a. The therapist's safety net is not their authority — Bandura ranks verbal
  persuasion third of four — it is that a bad outcome has already been thought about and is
  not a disaster. That is a thing an app can hold, and it is one sentence said at the moment
  it matters: on the screen where somebody has just locked a test in.

  It is NOT on the rest screen. B27 item 1: once a person has said they didn't get to it, this
  screen stops asking them for things, and a promise about tomorrow's outcome is a thing.
*/
test('the safety net is said at the lock, and not to somebody who has set it down', () => {
  const a = boot();
  a.tap('#not-sure').tap('[data-door]', 0).tap('[data-id]', 0).tap('[data-b]', 0);
  a.tap('#next').tap('[data-size]', 0).tap('#lock').shows(en.s.locked.title);
  a.shows(en.s.locked.net);
  /* rule 6, out loud, at the moment it matters */
  assert.match(en.s.locked.net, /bad one counts the same/i,
    'the net stopped saying the thing that makes it a net');

  a.tap('#nothanks').tap('#miss').shows(en.s.locked.restTitle);
  assert.ok(a.html().indexOf(en.s.locked.net) === -1,
    'the net is still on the screen after somebody set the test down for today');
});

/*
  B39, 2026-09-09. THE FOLD BUDGET ON THE DO SCREEN, WRITTEN DOWN SO IT CANNOT BE SPENT BY
  ACCIDENT.

  `What will you do today?` is the most crowded screen in BETR and the one B42 wants to put
  three more rows on. Measured on the walker at 390×844: at 125% text every road overflows,
  and *Lock it in* starts below the fold on the free-text road at 100% — the main road since
  B32. The two explanatory lines on it were each running to TWO lines at 125% and cost 74px
  between them; one line each got that back.

  This is the same guard `doors.intro` has had since B23, for the same reason: the sentence is
  the cheapest thing to change and it is also the easiest thing to lengthen without measuring.
  28 characters is one line at 125% text in a 350px column at `.sub`'s 1.25rem. If you need
  more than that, MEASURE the screen — do not just raise the number.
*/
test('the lines on the do screen each stay one line at 125% text', () => {
  /*
    B45 §5e: `doSub` was the other one and it is gone with the screen shape it belonged to.
    The budget it was measured against has NOT gone — if a line comes back under this heading
    (the founder's mockup has one), it comes in here and is measured the same way.
  */
  for (const key of ['dropSub']) {
    assert.ok(en.s.build[key].length <= 28,
      'build.' + key + ' is ' + en.s.build[key].length + ' characters and will wrap at 125%: ' +
      en.s.build[key]);
  }
});

/*
  B39, 2026-09-09, the founder's call. THE LEAVE-OUT HALF IS ONE ROW UNTIL IT IS TOUCHED — AND
  THE ROW SHOWS THE WORDS.

  This is the one that matters, and it is a trust test rather than a layout test. On the
  borrowed road what sits in that box is BETR's, put there by BETR. Folding it behind a plain
  "add something to leave out" link would let somebody lock in a sentence of ours they had
  never read, which is a worse thing than a screen that scrolls. So the row carries the words
  themselves, at full size, above the button that commits them.
*/
test('the folded leave-out row shows the words it is holding, and BETR’s are BETR’s', () => {
  const a = boot();
  a.tap('#not-sure').tap('[data-door]', 0).tap('[data-id]', 0).tap('[data-b]', 0).tap('#next');
  /* B45 §5b: nothing is in either box until a size is tapped, and A small go is this worry's
     own `test` and `drop` — so this is the tap that puts BETR's words in the folded row. */
  a.tap('[data-size]', 0);
  const stock = said(firstBehind(0), firstBehind(0).drop);

  /* folded, and the stock sentence is on the screen in full before anything is locked in */
  assert.strictEqual(a.html().indexOf('id="drop"'), -1, 'the box is drawn as well as the row');
  a.shows(en.s.build.dropLabel).shows(stock).shows(en.s.build.dropChange);
  const h = a.html();
  assert.ok(h.indexOf(stock) < h.indexOf('id="lock"'),
    'the words are drawn below the button that commits them');

  /* and opening it is the box, holding the same words, with nothing lost */
  a.tap('#dropopen');
  assert.strictEqual(a.valueOf('#drop'), stock, 'opening the row lost what was in it');
  a.shows(en.s.build.dropSub);
});

test('the folded row says what the half is for when there is nothing in it yet', () => {
  const a = boot();
  a.tap('#m-new').type('#if', 'say no without giving a reason')
    .type('#then', 'they’ll think I’m being difficult').tap('#next');
  /* no value, so the row says what this half is and offers the way in */
  a.shows(en.s.build.dropLabel).shows(en.s.build.dropSub).shows(en.s.build.dropAdd);
  assert.strictEqual(a.html().indexOf(en.s.build.dropChange), -1,
    'an empty row offers to change something that is not there');

  a.tap('#dropopen').type('#drop', 'Don’t explain myself.').tap('#lock');
  if (a.html().indexOf('id="nothanks"') !== -1) a.tap('#nothanks');
  a.shows('Don’t explain myself.');
});

/*
  A refusal about words a person cannot see is not a refusal, it is a wall. The refusal block
  is at the top of the screen and the folded row is not a box, so the guard opens it first.
*/
test('a leave-out that is refused opens itself, so the words can be changed', () => {
  const a = boot();
  a.tap('#m-new').type('#if', 'say no without giving a reason')
    .type('#then', 'they’ll think I’m being difficult').tap('#next');
  a.type('#do', 'Say no to one thing today.');
  a.tap('#dropopen').type('#drop', 'Don’t tell anyone I want to end it.').tap('#lock');
  a.shows(en.s.refusal.harm);
  assert.notStrictEqual(a.html().indexOf('id="drop"'), -1,
    'the box a person is being refused over is folded away');
});

test('the brand is BETR everywhere a person reads it, refusals included', () => {
  const a = boot();
  a.shows('BETR');
  a.tap('#m-help').shows('BETR helps you test unhelpful beliefs');
  a.shows('BETR is plain HTML');
  assert.ok(a.html().indexOf('Betr ') === -1, 'found the old mixed-case wordmark in prose');

  /*
    The refusal a person can actually be shown, which is where the wordmark hid until
    2026-09-03. There used to be three of them here; since B29 the habit and body refusals
    are unreachable and this is the one hard stop that is left.
  */
  const b = boot().tap('#m-new');
  b.type('#if', 'say no').type('#then', 'people will think I am selfish').tap('#next');
  b.type('#do', 'Weigh myself every morning').tap('#lock').shows(en.s.locked.title);
  b.tap('#nothanks');
  const c = boot().tap('#m-new');
  c.type('#if', 'say no').type('#then', 'people will think I am selfish').tap('#next');
  c.type('#do', 'Cut myself where nobody will see it').tap('#lock').shows('BETR can’t help');
  assert.ok(c.html().indexOf('Betr ') === -1, 'found the old mixed-case wordmark in a refusal');
});

/*
  B18, "Why this one sticks". Three things about it are the design, not decoration, and each
  one is a line below:

    - it is offered after a person has evidence of their own, never before. A worry sitting
      on the pick list, or locked in and waiting, has nothing to explain yet
    - it is a screen, so Back works and it goes to whichever of the two places opened it
    - a person's own worry has no explanation and gets no link. That is also the answer for
      custom worries if Q3 ever admits them: no entry, no link, no code to write
*/
test('why a worry sticks is offered after a result, on both screens, and never before', () => {
  const a = boot();

  /* Not on the doors, not on the pick list, and not while a test is waiting. */
  a.tap('#not-sure').hides('Why this one sticks');
  a.tap('[data-door]', 0).hides('Why this one sticks');
  a.tap('[data-id]', 0).tap('[data-b]', 0).tap('#next').hides('Why this one sticks');
  a.tap('[data-size]', 0).hides('Why this one sticks');
  a.tap('#lock').hides('Why this one sticks');

  a.tap('#nothanks').tap('#done').type('#o', 'He said fair enough.').tap('#next');
  a.hides('Why this one sticks');

  /* From the result: it opens, it names the worry, and Back comes back to the result. */
  a.tap('[data-key]', 1).shows('Why this one sticks');
  a.tap('[data-why]').shows('Why “' + firstBehind(0).label + '” sticks');
  a.shows(why[firstBehind(0).id].what);
  a.shows('that is what a CBT therapist is for');
  a.tap('#back').shows('You expected');

  /* And from the card in Your tests, where Back comes back to Your tests. */
  a.tap('#m-mine').shows('Why this one sticks');
  a.tap('[data-why]').shows('Why “' + firstBehind(0).label + '” sticks');
  a.tap('#back').shows('Your tests');
});

test('a test a person built has nothing to explain, so it offers nothing', () => {
  const a = boot();
  buildOwn(a, 'ask for Friday off', 'my boss will think I am not committed',
    'Ask for Friday off in one sentence.', 'Don’t explain why.');
  a.tap('#done');
  a.type('#o', 'She said fine and went back to her screen.').tap('#next').tap('[data-key]', 3);
  a.shows('You expected').hides('Why this one sticks');
  a.tap('#m-mine').hides('Why this one sticks');
});

/* ------------------------------------------------------- the sentence with no label (B35) */

/*
  The founder's own words, 2026-09-08: "why is it small and left aligned when the rest is big
  and centred?" A borrowed test has a label with the sentence quoted under it, and that strip
  is drawn small and left-aligned so the label sits on top of its quote rule. A test somebody
  WROTE has no label, so its sentence was being drawn in that same label type — a caption on a
  screen where the heading below it is large and centred.

  worryHead() now marks the one-part case `solo`, and the stylesheet draws it as the sentence
  it is: quoted, centred, a size up rather than a size down. This holds the markup, because
  the markup is the half a test can see; the type is in app.css, where the comment says why.
*/
test('a test with no label draws its sentence as a sentence, not as a caption', () => {
  const a = boot();
  a.tap('#m-new').type('#if', 'ask for Friday off')
   .type('#then', 'my boss will think I am not committed').tap('#next');

  const h = a.html();
  /* the one-part case: quoted, and marked so the stylesheet can centre it */
  assert.match(h, /<div class="worry quiet solo">/);
  assert.match(h, /<p class="worry-label">“If I ask for Friday off, then my boss will think I am not committed\.”<\/p>/);
  /* and there is no empty label above it, which is what `solo` exists to prevent */
  assert.ok(!/class="worry-belief/.test(h.slice(h.indexOf('worry quiet solo'), h.indexOf('worry quiet solo') + 400)),
    'the sentence was drawn twice, as a title and as a quote');
});

test('a borrowed test keeps the label-and-quote strip it was drawn for', () => {
  const f = firstBehind(0);
  const a = boot();
  a.tap('#not-sure').tap('[data-door]', 0).tap('[data-id]', 0).tap('[data-b]', 0).tap('#next');

  const h = a.html();
  assert.match(h, /<div class="worry quiet">/);
  assert.ok(h.indexOf('worry quiet solo') === -1, 'a labelled test was drawn as the solo one');
  assert.ok(h.indexOf('<p class="worry-label">' + f.label + '</p>') !== -1, 'the label went missing');
  assert.ok(h.indexOf('class="worry-belief wrote">“' + said(f, f.beliefs[0].belief)) !== -1);
});

/* ------------------------------------------------------- light and dark (B35) */

/*
  Founder, 2026-09-08, in two steps. They asked whether light could be the default; it was
  built that way, and once the cost was next to it — a dark-mode phone opening white at eleven
  at night — they chose the other answer: **BETR opens as the phone is set, and from the moment
  somebody touches the chip their choice wins and the phone is never consulted again.**

  What these hold is the four things that would be quiet if they broke: the opening position,
  the switch, the remembering, and the fact that an untouched BETR still stores nothing at all.
*/
test('BETR opens as the phone is set, and the chip is on every screen', () => {
  const a = boot();
  assert.strictEqual(a.look(), 'light');
  assert.strictEqual(boot(null, { dark: true }).look(), 'dark', 'a dark phone opened light');
  assert.deepStrictEqual(Object.keys(a.mem), [], 'the look was written before anybody chose one');

  /* the chip is drawn by paint(), so it is on the screens a walk passes through */
  const screens = [() => a.tap('#m-new'), () => a.tap('#back').tap('#not-sure'),
                   () => a.tap('[data-door]', 0), () => a.tap('#m-mine'), () => a.tap('#m-help')];
  assert.match(a.html(), /<button class="look" id="look"/);
  for (const step of screens) { step(); assert.match(a.html(), /<button class="look" id="look"/); }
});

test('the chip says the look you would get, switches it, and remembers', () => {
  const a = boot();
  a.shows('Switch to dark colours').shows('</span> Dark</button>').hides('Switch to light colours');

  a.tap('#look');
  assert.strictEqual(a.look(), 'dark');
  assert.strictEqual(a.mem['betr.look'], 'dark');
  /* and the chip turned round in place, without repainting the screen under it */
  a.shows('</span> Light');

  /* a second phone-load with that storage comes up dark, before anything is drawn */
  const b = boot(a.mem);
  assert.strictEqual(b.look(), 'dark');
  b.shows('Switch to light colours').shows('</span> Light</button>').hides('Switch to dark colours');

  a.tap('#look');
  assert.strictEqual(a.look(), 'light');
  assert.strictEqual(a.mem['betr.look'], 'light');
});

/*
  The half the founder actually decided. Following the phone is only the OPENING position: a
  person who has said what they want has said it, and the phone does not get to overrule them
  tomorrow morning. Both directions, because only testing the easy one is how this breaks.
*/
test('once somebody has chosen, their choice beats the phone in both directions', () => {
  /* a dark phone, and somebody who wants light */
  const d = boot(null, { dark: true });
  assert.strictEqual(d.look(), 'dark');
  d.tap('#look');
  assert.strictEqual(d.look(), 'light');
  assert.strictEqual(boot(d.mem, { dark: true }).look(), 'light', 'the phone overruled a choice');

  /* a light phone, and somebody who wants dark */
  const l = boot();
  l.tap('#look');
  assert.strictEqual(boot(l.mem).look(), 'dark');

  /* and deleting everything hands them back to the phone, wherever it is pointing */
  const w = boot(null, { dark: true });
  w.tap('#look');
  assert.strictEqual(w.mem['betr.look'], 'light');
  w.tap('#m-help').tap('#wipe').tap('#yes');
  assert.deepStrictEqual(Object.keys(w.mem), []);
  assert.strictEqual(w.look(), 'dark', 'a wiped phone did not go back to following the phone');
});

test('switching the look does not throw away a sentence somebody is half way through', () => {
  const a = boot();
  a.tap('#m-new').type('#if', 'say no without giving a reason');
  a.tap('#look');
  assert.strictEqual(a.valueOf('#if'), 'say no without giving a reason');
  assert.strictEqual(a.look(), 'dark');
});

test('delete everything takes the look with it, so a wiped phone is a fresh phone', () => {
  const a = boot();
  buildOwn(a, 'ask for Friday off', 'my boss will think I am not committed',
    'Ask for Friday off in one sentence.');
  a.tap('#look');
  assert.deepStrictEqual(Object.keys(a.mem).sort(), ['betr.look', 'betr.v1']);

  a.tap('#m-help').tap('#wipe').tap('#yes');
  assert.deepStrictEqual(Object.keys(a.mem), [], 'something survived the delete');
  assert.strictEqual(a.look(), 'light');
});

/* ------------------------------------------------- B34: the suggestions say what they do */

/*
  The sentence printed on one size, read back off the screen. A size button is a name, an
  optional "Last time" mark and the sentence, each in its own span, so chipText's "everything
  up to the closing tag" cannot be used on it.
*/
function sizeText(a, i) {
  const m = a.html().match(new RegExp('data-size="' + i + '">[\\s\\S]*?size-do">([^<]*)<'));
  assert.ok(m, 'no size ' + i + ' on screen');
  return m[1].replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'");
}

/* The words printed on one chip, read back off the screen. */
function chipText(a, attr, i) {
  const m = a.html().match(new RegExp(attr + '="' + i + '">([^<]*)</button>'));
  assert.ok(m, 'no ' + attr + ' chip ' + i + ' on screen');
  return m[1].replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'");
}

/*
  B34 D1. The lookup that decides which suggestions appear runs at paint. Typing does not
  repaint — a repaint would move the caret — so a person who TYPED the words of a start saw
  the general three, while the tap handler ran the lookup AGAIN and handed back the start's
  three. The chip said one thing and put another in the box.

  The placeholder in the first blank is the first suggestion word for word, so typing it is not
  a contrived case; it is the case. Whichever three are on screen, a chip inserts its own words.
*/
/*
  B45 §5c, 2026-09-10. THE GREYED-OUT WORDS AND THE FIRST CHIP ARE ONE SENTENCE.

  A placeholder is an example of what goes in the blank, and somebody types it out rather than
  tapping it. If it is not word for word one of BETR's own, the lookup underneath it answers
  differently for two people who put the same sentence in the same box — which is B34 D1 with
  the content, rather than the code, as the cause. Both files can move; they cannot move apart.
*/
/*
  B48, 2026-09-10. AND THE SECOND HALF IS NO LONGER A STRING TO CHECK, IT IS A SCREEN TO READ.

  `build.thenPlaceholder` is deleted. A frozen second half is only ever right beside a frozen
  first half, and the first half stops being frozen the moment anybody taps a chip or opens a
  worry — so on nineteen worries and on eleven of the twelve front-door chips, the greyed
  example in the second blank was a prediction written for a different act and offered by
  nothing on the screen. This asserts what a person actually sees, on all three roads.
*/
test('the first blank suggests a sentence a chip offers', () => {
  assert.strictEqual(en.s.build.ifPlaceholder, plainly(front[0]),
    'the first blank suggests a sentence no chip offers');
});

const hintOf = (a) => {
  const m = a.html().match(/<input[^>]*\bid="then"[^>]*>/);
  assert.ok(m, 'no second blank on screen');
  const p = m[0].match(/placeholder="([^"]*)"/);
  assert.ok(p, 'the second blank has no example in it');
  return p[1].replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
};

test('the greyed example in the second blank is one of the three under it', () => {
  /* Arriving at the front door, nothing typed: the two greyed halves are one sentence, and
     it is the first chip's — which is what the deleted string used to say by hand. */
  const a = boot().tap('#m-new');
  assert.strictEqual(hintOf(a), thensOf(front[0])[0],
    'the two greyed halves are not the same sentence');

  /* Tapping any other one of the twelve. This is where the frozen string was wrong: the row
     below became that worry's three and the example in the box did not move. */
  const b = boot().tap('#m-new').tap('[data-if]', 4);
  assert.strictEqual(hintOf(b), thensOf(front[4])[0],
    'the example is a prediction the sentence above it does not carry');

  /* And the worry road, where nineteen of twenty were showing `no`'s. */
  const c = boot().tap('#not-sure').tap('[data-door="yes"]').tap('[data-id="think"]');
  const think = worries.find((w) => w.id === 'think');
  assert.strictEqual(hintOf(c), thensOf(think)[0],
    'a borrowed worry offers an example belonging to another worry');
  for (const line of thensOf(front[0])) {
    assert.notStrictEqual(hintOf(c), line, 'the example is still the old frozen one');
  }
});

/*
  B49, 2026-09-10. THE SAME FAULT, ONE SCREEN LATER, AND IT LIVED IN THE LEAVE-OUT BOX.

  `build.dropPlaceholder` was "Don’t give a reason." — the worry `no`'s own leave-out, word for
  word, greyed into that box on all twenty worries and on the free-text road. B48's argument
  applies unchanged: a person types the greyed words out rather than tapping the three under
  them, so a frozen example belonging to one worry is a wrong answer offered to nineteen.

  It is not fixed the way B48 fixed the second blank. That was a blank inside a sentence, where
  an example shows the SHAPE of what goes in it; this is a textarea sitting on three whole
  sentences, and B42 already ruled on that shape for the plan box above it — over three named
  suggestions a worked example reads as a fourth one. So both boxes name themselves and point
  down at the three, and this holds them to it.
*/
const greyOf = (a, id) => {
  const m = a.html().match(new RegExp('<textarea[^>]*\\bid="' + id + '"[^>]*>'));
  assert.ok(m, 'no ' + id + ' box on screen');
  const p = m[0].match(/placeholder="([^"]*)"/);
  assert.ok(p, 'the ' + id + ' box has no example in it');
  return p[1].replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
};

test('neither grey line on the plan screen is a sentence BETR wrote for one worry', () => {
  const ours = [];
  for (const w of worries) for (const z of w.sizes) ours.push(said(w, z.do), said(w, z.drop));
  for (const z of general.sizes) ours.push(z.do, z.drop);
  for (const grey of [en.s.build.doOwnPlaceholder, en.s.build.dropPlaceholder]) {
    for (const line of ours) {
      assert.notStrictEqual(grey, line,
        'a grey example on the plan screen is one worry’s own sentence, shown on all of them');
    }
  }
  /* Two boxes, one screen: they have to ask for the same thing in the same shape, or the
     second one reads as a different kind of question from the first. */
  for (const grey of [en.s.build.doOwnPlaceholder, en.s.build.dropPlaceholder]) {
    assert.match(grey, /^Write what you’ll .*below\.$/,
      'the two boxes on the plan screen no longer say it in the same shape');
  }
});

test('the leave-out box on one worry does not grey out another worry’s leave-out', () => {
  const no = worries.find((w) => w.id === 'no');
  /* A worry that is not `no`, reached the way a person reaches it, with the leave-out opened
     before a size is picked — which is the one state where that box is empty enough to read. */
  const a = boot().tap('#not-sure').tap('[data-door="work"]').tap('[data-id="rest"]')
    .tap('[data-b]', 0).tap('#next').tap('#dropopen');
  const grey = greyOf(a, 'drop');
  for (const z of no.sizes) {
    assert.notStrictEqual(grey, said(no, z.drop),
      'the leave-out box still shows the worry `no`’s own words on another worry');
  }
  assert.strictEqual(grey, en.s.build.dropPlaceholder, 'the leave-out box lost its example');
  /* And the plan box beside it says the same thing in the same shape. */
  assert.strictEqual(greyOf(a, 'do'), en.s.build.doOwnPlaceholder, 'the plan box lost its example');
});

test('a suggestion puts in the box exactly the words printed on it', () => {
  const a = boot();
  a.tap('#m-new').type('#if', plainly(front[0]));
  const said = chipText(a, 'data-then', 0);
  a.tap('[data-then]', 0).tap('#next');
  a.shows(said);
});

/*
  The same invariant on the second screen, where the plan and the drop are chosen. Since B45
  §5e that row is the three named sizes on every road, so the words are read out of the size's
  own `.size-do` span rather than off a plain chip.
*/
test('a plan suggestion puts in the box exactly the words printed on it', () => {
  const a = boot();
  a.tap('#m-new').type('#if', plainly(front[0])).type('#then', 'they will be off with me').tap('#next');
  const plan = sizeText(a, 0);
  a.tap('[data-size]', 0);
  assert.strictEqual(a.valueOf('#do'), plan);
});

/*
  B34 D2. Back was the one way off "What will you do today?" that did not read the boxes
  first, so a person who typed a plan, stepped back to fix a word of the sentence and came
  forward again found the plan gone.
*/
test('going back to fix the sentence keeps the plan already typed', () => {
  const a = boot();
  a.tap('#m-new').type('#if', 'ask for Friday off')
    .type('#then', 'my boss will think I am not committed').tap('#next');
  a.type('#do', 'Ask for Friday off in one sentence.');
  a.tap('#dropopen').type('#drop', 'No explaining why.');
  a.tap('#back').tap('#next');
  assert.strictEqual(a.valueOf('#do'), 'Ask for Friday off in one sentence.');
  assert.strictEqual(a.valueOf('#drop'), 'No explaining why.');
});

/*
  The same, borrowed — and this is the damaging one. The boxes arrive holding the stock item's
  own plan, so a plan thrown away on Back does not come back empty: it comes back as BETR's
  words sitting where the person's were, which reads as having been overwritten.
*/
test('going back does not put the stock plan back over one somebody wrote', () => {
  const a = boot();
  a.tap('#not-sure').tap('[data-door]', 0).tap('[data-id]', 0).tap('[data-b]', 0).tap('#next');
  /*
    B45 §5b, 2026-09-09, and the first assertion is the one that changed. It used to read
    "the borrowed plan should arrive in the box", because BETR pre-filled it. Every worry
    carries three sizes now, so the box arrives EMPTY and the plan is one tap — which is the
    dial B46 found nineteen worries did not have. What the walk is actually about is
    unchanged and is below: her words survive going back and coming forward again.
  */
  assert.strictEqual(a.valueOf('#do'), '', 'the box should arrive empty, with the three beside it');
  const stock = said(firstBehind(0), firstBehind(0).test);
  a.tap('[data-size]', 0);
  assert.strictEqual(a.valueOf('#do'), stock, 'A small go should put this worry’s own test in the box');
  a.type('#do', 'My own plan, in my own words.');
  a.tap('#back').tap('#next');
  assert.strictEqual(a.valueOf('#do'), 'My own plan, in my own words.');
});

/*
  ---------------------------------------------------------------- B44, the two guide screens

  "Too big? Make it smaller" and "Why it's written like this". What these hold down is not the
  wording — that is Misha's and the reviewer's — but the four things that make them legal and
  make them stay a book rather than a device.
*/

/* The whole of B44 in one walk: three links, three journeys, and Back to where you were. */
test('both guide screens open from a link and go back to the screen that opened them', () => {
  const g = en.s.guide;

  /* 1 — the build screen, free-text road, with half a sentence typed. */
  const a = boot().tap('#m-new');
  a.shows(g.writtenLink);
  a.type('#if', 'say no to Sam').tap('#written');
  a.shows(g.writtenTitle).shows(g.smallest);
  a.tap('#back');
  assert.strictEqual(a.valueOf('#if'), 'say no to Sam',
    'the guide screen threw away a sentence somebody was half way through');

  /* 2 — the do screen, with half a plan typed. */
  a.type('#then', 'he will be off with me').tap('#next');
  a.shows(g.smallerLink);
  a.type('#do', 'Say no to Sam about Friday.').tap('#smaller');
  a.shows(g.smallerTitle).shows(g.shrinkSaid);
  a.tap('#back');
  assert.strictEqual(a.valueOf('#do'), 'Say no to Sam about Friday.',
    'the guide screen threw away a plan somebody was half way through');

  /* 3 — Help, for the person who has finished a test and wants to know why it is shaped so. */
  a.tap('#m-help').shows(g.writtenLink);
  a.tap('#written').shows(g.writtenTitle);
  a.tap('#back').shows(en.s.help.cbtTitle);
});

/*
  THE REGULATORY LINE, AND IT IS THE ONE TEST HERE THAT IS NOT ABOUT CONVENIENCE.

  A screen that arrives BECAUSE of what somebody typed, rated, refused or repeated is BETR
  deciding something about that person (research §6) — rule 2, and a medical device. So the
  only way to either of these is a link somebody chooses to tap, and nothing else: not a
  refusal, not a second go, not an empty box, not a big number on the ladder.
*/
test('neither guide screen ever arrives on its own, whatever a person does', () => {
  const g = en.s.guide;
  const a = boot();
  /*
    Named by a sentence only the screen itself carries, NOT by its title: the link and the
    title are the same words, so a title check can never be false while the link is drawn
    (shows/hides are substring checks — docs/learnings.md).
  */
  const clear = () => {
    assert.ok(a.html().indexOf(g.smallerOpen) === -1 && a.html().indexOf(g.written[0].a) === -1,
      'a guide screen appeared without anybody asking for it');
  };

  clear();
  a.tap('#m-new'); clear();
  /* Refused: the one thing on this screen that judges anything a person wrote. */
  a.type('#if', 'kill myself').type('#then', 'everyone will be better off').tap('#next'); clear();
  a.type('#if', 'say no').type('#then', 'they will mind').tap('#next'); clear();
  /* An empty plan, which is the moment a rescue screen would most want to fire. */
  a.tap('#lock'); clear();
  a.type('#do', 'Say no to one thing today.').tap('#lock'); clear();
  a.tap('#nothanks').tap('#done').type('#o', 'He said fine.').tap('#next'); clear();
  a.tap('[data-key]', 4); clear();          /* more sure than before — the worst outcome there is */
  a.tap('#again'); clear();
  a.tap('#m-mine'); clear();
  a.tap('#back').tap('#not-sure').tap('[data-door]', 0).tap('[data-id]', 0); clear();
  a.tap('[data-b]', 0).tap('#next'); clear();
});

/*
  Rule 10. The bottom row is three plain words and B8's amendment says so; a guide screen is a
  link inside a screen, and a fourth door is the shape the founder overruled their own rule to
  allow exactly once.
*/
test('neither guide screen becomes a fourth door', () => {
  const a = boot();
  const row = () => (a.html().match(/id="m-[a-z]+"/g) || []).sort();
  const before = row();
  assert.deepStrictEqual(before, ['id="m-help"', 'id="m-mine"', 'id="m-new"']);
  a.tap('#m-new').tap('#written');
  assert.deepStrictEqual(row(), before, 'the bottom row changed on a guide screen');
  a.tap('#back').type('#if', 'say no').type('#then', 'they will mind').tap('#next').tap('#smaller');
  assert.deepStrictEqual(row(), before, 'the bottom row changed on a guide screen');
});

/*
  RULE 4, AND IT DID NOT LOOSEN FOR BETR. The 2026-09-08 amendment freed a PERSON's own test
  from the habit and body lists; every sentence BETR writes is still held to them, and these
  two screens are BETR proposing in a way nothing else outside worries.js is.
*/
test('nothing on either guide screen names the habit, the body or anyone’s safety', () => {
  const guards = require('../lib/guards.js');
  const lines = [];
  const walk = (node) => {
    if (typeof node === 'string') lines.push(node);
    else if (node && typeof node === 'object') Object.keys(node).forEach((k) => walk(node[k]));
  };
  walk(en.s.guide);

  assert.ok(lines.length >= 20, 'only found ' + lines.length + ' sentences to check');
  for (const line of lines) {
    for (const [kind, list] of [['harm', guards.HARM], ['habit', guards.HABIT], ['body', guards.BODY]]) {
      assert.strictEqual(guards.hit(line, list), null, kind + ' word in "' + line + '"');
    }
  }
});

/*
  B36 item 3's own instruction: "why you start small" is said once, in one place. Two screens
  read it and neither carries a second version, so they cannot drift apart by a word.
*/
test('the sentence about starting small is one string, read by both screens', () => {
  const g = en.s.guide;
  const fifth = g.written[g.written.length - 1];
  assert.strictEqual(fifth.a, undefined, 'the fifth answer grew a copy of the sentence');
  assert.strictEqual(fifth.same, 'smallest');

  const a = boot().tap('#m-new');
  a.tap('#written').shows(g.smallest);
  a.tap('#back').type('#if', 'say no').type('#then', 'they will mind').tap('#next');
  a.tap('#smaller').shows(g.smallest);
});

/*
  The worked shrink teaches THE CONTROL THE PERSON IS ALREADY HOLDING, so its three steps are
  B42's three names and not a fourth vocabulary. It is read big to small — the row is drawn
  small to big, because that is the order somebody chooses in; this is the same dial turned
  the other way, which is what shrinking is.
*/
test('the worked shrink uses the three size names, biggest first', () => {
  const names = general.sizes.map((z) => z.name);
  const shrink = en.s.guide.shrink.map((r) => r.name);
  assert.deepStrictEqual(shrink, names.slice().reverse(),
    'the shrink invented its own words for the dial, or read it the wrong way round');
});
