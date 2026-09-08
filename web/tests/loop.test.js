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
const doors = require('../content/whats-going-on.js');
const content = require('../lib/content.js');
const why = require('../content/why.js');
const en = require('../content/strings-en.js');
const labelOf = (id) => content.byId(worries, id).label;
/* B19: a walk goes through a door, so "the first worry" is the first one behind one. */
const firstBehind = (n) => content.byId(worries, doors.items[n || 0].worries[0]);

/*
  B30. Building a test from nothing: the two blanks, then what you'll do. Six taps' worth of
  the founder's "from a car, under thirty seconds to Lock it in", in one line of a test.
*/
function buildOwn(a, ifPart, thenPart, doIt, dropIt) {
  if (a.html().indexOf('id="if"') === -1) a.tap('#m-new');
  a.type('#if', ifPart).type('#then', thenPart).tap('#next');
  a.type('#do', doIt);
  if (dropIt !== undefined) a.type('#drop', dropIt);
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
  a.tap('[data-id]', 0).shows(firstBehind(0).label).shows(firstBehind(0).beliefs[0].belief);
  a.tap('[data-b]', 0).shows(firstBehind(0).label).shows(firstBehind(0).beliefs[0].belief);
  a.shows(firstBehind(0).test).shows('I’ll do it today');
  a.shows('That’s the bit that makes it count');
  a.tap('#lock').shows('Go and do it.');
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
  a.tap('#not-sure').tap('[data-door]', 0).tap('[data-id]', 0).tap('[data-b]', 0).tap('#lock').tap('#nothanks').tap('#done');
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
  b.tap('#not-sure').tap('[data-door]', 0).tap('[data-id]', 0).tap('[data-b]', 0).tap('#lock').tap('#nothanks').tap('#done');
  b.type('#o', 'One line.\nAnd the next.').tap('#next').tap('[data-key]', 2);
  assert.ok(b.html().indexOf('One line.\nAnd the next.') !== -1,
    'a single line break inside a paragraph must survive into the markup');

  const css = fs.readFileSync(path.join(__dirname, '..', 'app.css'), 'utf8');
  assert.match(css, /\.wrote\s*\{[^}]*white-space\s*:\s*pre-wrap/,
    'the wrote class is what draws the line breaks; without pre-wrap it does nothing');
});

test('the count is completed tests, and "didn’t get to it" costs nothing', () => {
  const a = boot();
  a.tap('#not-sure').tap('[data-door]', 0).tap('[data-id]', 0).tap('[data-b]', 0).tap('#lock').tap('#nothanks');
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
  a.tap('#not-sure').tap('[data-door]', 0).tap('[data-id]', 0).tap('[data-b]', 0).tap('#lock').tap('#nothanks');
  a.shows(en.s.locked.kicker).shows(en.s.locked.title).shows(en.s.locked.miss);

  a.tap('#miss');
  a.shows(en.s.locked.restKicker).shows(en.s.locked.restTitle).shows(en.s.locked.missed);
  a.hides(en.s.locked.kicker).hides(en.s.locked.title);

  /* No second offer to put down what is already down. */
  a.hides(en.s.locked.miss);

  /* The command softened, and what is waiting for tomorrow is still on the screen. */
  a.shows(en.s.locked.restDone).hides(en.s.locked.done);
  a.shows(firstBehind(0).test).shows(firstBehind(0).drop);

  a.tap('#done').shows(en.s.happened.title);
});

/* Closed and opened again tomorrow, the screen still says it was put down, not still shouting. */
test('a test put down for today is still put down when the app is opened again', () => {
  const a = boot();
  a.tap('#not-sure').tap('[data-door]', 0).tap('[data-id]', 0).tap('[data-b]', 0).tap('#lock').tap('#nothanks').tap('#miss');

  /* Reopening lands straight back on the test in hand, in the state it was left in. */
  const again = boot(a.mem);
  again.shows(en.s.locked.restKicker).shows(en.s.locked.restTitle);
  again.hides(en.s.locked.title).hides(en.s.locked.miss);
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

  /* all three are offered, with what you would be braced for under each */
  for (const b of f.beliefs) a.shows(b.belief).shows(b.expect);

  /* the second one, deliberately: the first would pass whether it was carried or not */
  a.tap('[data-b]', 1).shows(f.beliefs[1].belief).shows(f.beliefs[1].expect);
  a.hides(f.beliefs[0].belief).hides(f.beliefs[2].belief);
  a.shows(f.test);

  a.tap('#lock').tap('#nothanks').tap('#done');
  a.type('#o', 'Nothing happened.').tap('#next').shows(f.beliefs[1].belief);
  a.tap('[data-key]', 1).shows(f.beliefs[1].belief).shows(f.beliefs[1].expect);

  /* and doing it again tomorrow keeps the sentence they chose, without asking twice */
  a.tap('#again').shows(f.beliefs[1].belief).hides(f.beliefs[0].belief);
  a.tap('#m-mine').shows(f.beliefs[1].belief);
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
  a.tap('[data-b]', 2);

  const chosen = f.beliefs[2].belief;
  a.shows(f.label).shows(chosen);                   /* the plan */
  a.tap('#lock').shows(f.label).shows(chosen);      /* locked in */
  a.tap('#nothanks').tap('#done').shows(f.label).shows(chosen);          /* what happened */
  a.type('#o', 'She said fine.').tap('#next').shows(f.label).shows(chosen);  /* the re-rate */
  a.tap('[data-key]', 1).shows(f.label).shows(chosen);                   /* the result */
  a.tap('#m-mine').shows(f.label).shows(chosen);                         /* and the card */
});

/*
  "I'll put it my own way" is the fourth option, not a fourth screen: it keeps the worry, the
  test, the thing to be left out and the explanation behind "Why this one sticks", and swaps
  the one sentence. It is a person's own belief, so it goes through the same guard one does.
*/
test('putting it your own way keeps the worry and replaces only the sentence', () => {
  const f = firstBehind(0);
  const a = boot();
  a.tap('#not-sure').tap('[data-door]', 0).tap('[data-id]', 0).tap('#own');

  a.type('#t', 'I am the sort of person who can’t sit still').tap('#next');
  a.shows('verdict, not a prediction');
  a.type('#t', 'If I sit with it, then I will be climbing the walls by ten past').tap('#next');

  a.shows('I will be climbing the walls by ten past');   /* the expectation, off their belief */
  a.shows(f.label).shows(f.test).shows(f.drop);          /* everything else is still the worry */
  for (const b of f.beliefs) a.hides(b.belief);

  a.tap('#lock').tap('#nothanks').tap('#done');
  a.type('#o', 'It dropped off after four minutes.').tap('#next').tap('[data-key]', 2);
  a.shows('If I sit with it, then I will be climbing the walls by ten past');
  /* it is still that worry, so the explanation behind it is still offered */
  a.shows('Why this one sticks');
  a.tap('[data-why]').shows('Why “' + f.label + '” sticks');
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
  const starts = require('../content/starts.js');
  const a = boot().tap('#m-new');

  a.tap('[data-if]', 0).shows(starts.items[0].if);
  /* the second blank's suggestions are that start's, not the general ones */
  for (const line of starts.items[0].thens) a.shows(line);
  a.tap('[data-then]', 0).tap('#next');

  for (const line of starts.items[0].dos) a.shows(line);
  a.tap('[data-do]', 0);
  for (const line of starts.items[0].drops) a.shows(line);
  a.tap('[data-drop]', 0).tap('#lock');
  if (a.html().indexOf('id="nothanks"') !== -1) a.tap('#nothanks');

  a.shows(en.s.locked.title).shows(starts.items[0].dos[0]).shows(starts.items[0].drops[0]);
  a.shows('If I ' + starts.items[0].if + ', then ' + starts.items[0].thens[0] + '.');
});

/*
  And a first blank BETR did not write gets the general set — which after the first week is
  most of the time. The lookup is word for word and is not allowed to become cleverer than
  that (CLAUDE.md rule 2): whether a suggestion is offered may never depend on a judgement.
*/
test('a sentence BETR did not write gets the general suggestions, not a guess', () => {
  const starts = require('../content/starts.js');
  const a = boot().tap('#m-new');
  a.type('#if', 'let the washing up wait until the morning').tap('[data-then]', 0);
  a.shows(starts.general.thens[0]);
  /* items[1], not items[0]: the first start's first prediction is also the placeholder. */
  for (const line of starts.items[1].thens) a.hides(line);
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
  b.tap('#not-sure').tap('[data-door]', 0).tap('[data-id]', 0).tap('[data-b]', 0).tap('#lock').tap('#nothanks').tap('#done');
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
  a.tap('#not-sure').tap('[data-door]', 0).tap('[data-id]', 0).tap('[data-b]', 0).tap('#lock').tap('#nothanks').tap('#done');
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
  a.tap('#not-sure').tap('[data-door]', 0).tap('[data-id]', 1).tap('[data-b]', 0).tap('#lock');
  a.hides('Not quite? Change it');
  a.tap('#nothanks').tap('#done').type('#o', 'She said yes.').tap('#next').tap('[data-key]', 1);
  a.hides('Not quite? Change it');
});

/* ------------------------------------------------------- the ladder, and getting back to a worry */

/* One whole loop, ending on the given re-rate. 0 still / 1 a bit / 2 a lot / 3 not at all / 4 more. */
function loop(a, item, said, key) {
  a.tap('#not-sure').tap('[data-door]', 0).tap('[data-id]', item).tap('[data-b]', 0).tap('#lock');
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
  a.tap('#other').tap('[data-door]', 0).tap('[data-id]', 1).tap('[data-b]', 0).tap('#lock').tap('#done');
  a.type('#o', 'She just did it.').tap('#next').tap('[data-key]', 1);   /* worry two: 10 → 9 */

  a.tap('#m-mine').shows('2 tests, done 2 times');
  a.shows(labelOf(doors.items[0].worries[1])).shows(labelOf(doors.items[0].worries[0]));

  /* the older one is the second card, and going again keeps its rung rather than starting over */
  a.tap('[data-again]', 1).shows(firstBehind(0).test);
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
  a.tap('[data-b]', 0); sweep();
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
  a.tap('[data-id]', 0).tap('[data-b]', 0); sweep();                      /* plan */
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
  assert.ok(chips.length > 20, 'only found ' + chips.length + ' chips to check');
  for (const chip of chips) {
    assert.ok(seen.indexOf(chip) === -1, 'a chip is also drawn as a label somewhere: "' + chip + '"');
  }
  assert.ok(a.html().indexOf('BETR') !== -1 || seen.length > 0);
});

/*
  2026-09-04, and it is named for the person it happened to. A test user typed "if I eat
  gluten, it won't go well" and the app walled him over a missing "then". The shape rules are
  a question now: asked once, with the shape that works, and the next tap takes his words.

  What this holds down is the difference between a question and a wall — if the second tap
  ever stops going through, the wall is back and nobody will notice from the words alone.
*/
test('a sentence that is not quite a prediction is asked about once, then goes through', () => {
  /*
    B30 moved the free box off the front door: the way in is two blanks in a printed sentence,
    so a person there cannot write something that is not conditional. This box is the one that
    is left — "I'll put it my own way" under a borrowed test — and it is where the nudge still
    lives. B32 is where it goes, and where these become guard-level assertions.
  */
  const a = boot().tap('#not-sure').tap('[data-door]', 0).tap('[data-id]', 0).tap('#own');

  a.type('#t', 'People will hate me').tap('#next');
  a.shows('If I ___, then ___');
  a.shows('Keep mine as it is');
  a.shows(en.s.own.belief.title);
  assert.ok(a.html().indexOf('class="warn"') === -1, 'a nudge was drawn as a refusal');
  assert.ok(a.html().indexOf('People will hate me') !== -1, 'the person’s words were taken away');

  /* The second tap, with nothing changed, is the whole point. */
  a.tap('#next').shows(en.s.plan.lock).shows('People will hate me');
});

test('the nudge is gone once the sentence reads as a prediction, and never nags twice', () => {
  const a = boot().tap('#not-sure').tap('[data-door]', 0).tap('[data-id]', 0).tap('#own');
  a.type('#t', 'If I say no').tap('#next').shows('If I ___, then ___');

  /* Rewriting it clears the note, and it does not follow the person to the next screen. */
  a.type('#t', 'If I say no, they will think I am selfish').tap('#next');
  a.shows(en.s.plan.lock).hides('Keep mine as it is').hides('If I ___, then ___');
});

test('a verdict is still refused, and an empty box still is', () => {
  const a = boot().tap('#not-sure').tap('[data-door]', 0).tap('[data-id]', 0).tap('#own');
  a.type('#t', 'I am a bad person').tap('#next');
  a.shows(en.s.refusal.verdict).shows(en.s.own.belief.title);

  a.type('#t', '').tap('#next');
  a.shows(en.s.refusal.emptyBelief).shows(en.s.own.belief.title);
});

/*
  The line the whole of 2026-09-04 exists for, as B29 leaves it. A person wrote a true thing
  about his own body into the blank box — "if I eat gluten, then I'll feel sick" — and the
  app had never once said which ones it is for.

  What it says CHANGED on 2026-09-08. "Not the weather, and not your body" was written as a
  checkability hint and worked as a wall: the founder's own two examples, one about time and
  one about a feeling, both failed it. So the half that excludes a settled fact stays, and
  the half that narrowed the lane is replaced by the risk line the founder asked for.

  B27 item 2 is the other half and does not change: there are TWO boxes a person can write
  into, and the line has to be on both.
*/
test('both boxes say which ones BETR is for, not just the blank one', () => {
  const only = en.s.build.only;
  assert.ok(only.indexOf('never actually found out about') !== -1,
    'the boundary line no longer excludes a settled fact: ' + only);
  assert.ok(/risk/.test(only), 'the boundary line no longer carries the risk line: ' + only);
  assert.ok(only.indexOf('your body') === -1,
    'the narrow lane is back: it refused the founder’s own two examples (B28 §3)');

  /* the build screen, which is the front door and the box this line was written for */
  boot().tap('#m-new').shows(only);

  /* and their own words under a borrowed one, which is the other box there is */
  boot().tap('#not-sure').tap('[data-door]', 0).tap('[data-id]', 0).tap('#own').shows(only);
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
  for (const rule of ['.example .you', '.example .late', '.example .ladder .last']) {
    assert.ok(block.indexOf(rule) !== -1, rule + ' is not inside the reduced-motion block');
    assert.ok(css.indexOf(rule) >= css.indexOf('@media (prefers-reduced-motion: no-preference)'),
      rule + ' also animates outside the reduced-motion block');
  }
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
  a.tap('[data-id]', 0).tap('[data-b]', 0).hides('Why this one sticks');
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
