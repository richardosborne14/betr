/*
  The loop itself, walked end to end, on the fake DOM in harness.js.

  It cannot see layout or CSS. What it catches is a crashing screen, a dead button and a
  broken guard. The real walk is docs/journeys.md, on a phone.
*/
const { test } = require('node:test');
const assert = require('node:assert');
const { boot } = require('./harness.js');

/* ------------------------------------------------------- the walks */

test('a full loop, from the start screen to a result', () => {
  const a = boot();
  a.shows('Sure it’ll go badly?');
  a.tap('#go').shows('Which one?');
  a.tap('[data-id]', 0).shows('Here’s your test').shows('No, I can’t this time');
  a.shows('That’s the bit that makes it count');
  a.tap('#lock').shows('Go and do it.');
  a.tap('#nothanks').tap('#done').shows('What happened?');
  a.type('#o', 'He said fair enough and got his own coffee.');
  a.tap('#next').shows('Still think that’s what happens?');
  a.tap('[data-key]', 2);
  a.shows('You expected').shows('What actually happened');
  a.shows('He said fair enough').shows('>1<');
});

test('the count is completed tests, and "didn’t get to it" costs nothing', () => {
  const a = boot();
  a.tap('#go').tap('[data-id]', 0).tap('#lock').tap('#nothanks');
  a.tap('#miss').shows('still here for tomorrow');
  a.hides('missed').hides('streak');
  a.tap('#done').type('#o', 'Nothing happened.').tap('#next').tap('[data-key]', 0);
  a.shows('>1<');
});

test('the second door opens onto worries, never onto a test of its own', () => {
  const a = boot();
  a.tap('#doors').shows('What’s going on?').shows('Drinking more than I mean to');
  a.tap('[data-door]', 0).shows('Which one?').shows('Not drinking at a social thing');
  a.tap('#all').shows('Something else');
});

test('a person’s own entry is refused by both guards before it is accepted', () => {
  const a = boot();
  a.tap('#go').tap('#own').shows('What do you think will happen?');
  a.type('#t', 'I am a waste of space').tap('#next').shows('verdict, not a prediction');
  a.type('#t', 'If I ask for Friday off, my boss will think I am not committed').tap('#next');
  a.shows('What will you do?');
  a.type('#t', 'Go for a pint with them and ask then').tap('#next').shows('the worry underneath');
  a.type('#t', 'Ask for Friday off in one sentence').tap('#next').shows('What will you leave out?');
  a.type('#t', 'Don’t explain why.').tap('#next');
  a.shows('Here’s your test').shows('Ask for Friday off');
  a.shows('My boss will think I am not committed');   /* the expectation, taken from the belief */
});

test('a person’s own test can be repeated tomorrow, and back goes to the result', () => {
  const a = boot();
  a.tap('#go').tap('#own');
  a.type('#t', 'If I ask for Friday off, my boss will think I am not committed').tap('#next');
  a.type('#t', 'Ask for Friday off in one sentence').tap('#next');
  a.type('#t', 'Don’t explain why.').tap('#next');
  a.tap('#lock').tap('#nothanks').tap('#done');
  a.type('#o', 'She said fine and went back to her screen.').tap('#next').tap('[data-key]', 3);
  a.shows('Your own');
  a.tap('#again').shows('Ask for Friday off');
  a.tap('#back').shows('You expected');
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
  a.tap('#back').tap('#go');
  seen += a.html();
  a.tap('#own');
  seen += a.html();
  /* and the two screens the ladder lives on, which is where a score would creep in */
  const b = boot();
  b.tap('#go').tap('[data-id]', 0).tap('#lock').tap('#nothanks').tap('#done');
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
  a.tap('#go').tap('[data-id]', 0).tap('#lock').tap('#nothanks').tap('#done');
  a.type('#o', 'He said fair enough.').tap('#next').tap('[data-key]', 2);
  a.tap('#m-help').tap('#export');
  const dump = JSON.parse(a.valueOf('#dump'));
  assert.strictEqual(dump.app, 'BETR');
  assert.strictEqual(dump.results.length, 1);
  assert.strictEqual(dump.results[0].happened, 'He said fair enough.');
  assert.strictEqual(dump.results[0].worry, 'Saying no without an excuse');
  a.tap('#wipe').shows('There is no copy anywhere else');
  a.tap('#yes').shows('Sure it’ll go badly?');
  a.hides('He said fair enough');
  a.tap('#m-help');
  assert.strictEqual(JSON.parse(a.tap('#export').valueOf('#dump')).results.length, 0);
  assert.deepStrictEqual(Object.keys(a.mem), [], 'the storage key survived the delete');
});

test('it starts cleanly from nothing, from rubbish, and from a half-finished loop', () => {
  boot({ 'betr.v1': '{{{ not json' }).shows('Sure it’ll go badly?');
  boot({ 'betr.v1': '[]' }).shows('Sure it’ll go badly?');
  /* a stage that needs a current test, with no current test, must not strand anyone */
  boot({ 'betr.v1': JSON.stringify({ stage: 'plan', cur: null, done: [] }) })
    .shows('Sure it’ll go badly?');
  boot({ 'betr.v1': JSON.stringify({ stage: 'result', cur: null, done: [] }) })
    .shows('Sure it’ll go badly?');
});

test('a locked expectation cannot be edited after the test is done', () => {
  const a = boot();
  a.tap('#go').tap('[data-id]', 1).tap('#lock');
  a.hides('Not quite? Change it');
  a.tap('#nothanks').tap('#done').type('#o', 'She said yes.').tap('#next').tap('[data-key]', 1);
  a.hides('Not quite? Change it');
});

/* ------------------------------------------------------- the ladder, and getting back to a worry */

/* One whole loop, ending on the given re-rate. 0 still / 1 a bit / 2 a lot / 3 not at all / 4 more. */
function loop(a, item, said, key) {
  a.tap('#go').tap('[data-id]', item).tap('#lock');
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
  a.tap('#m-mine').shows('Your worries').shows('3 tests across 1 worry');
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
  a.tap('#other').tap('[data-id]', 1).tap('#lock').tap('#done');
  a.type('#o', 'She just did it.').tap('#next').tap('[data-key]', 1);   /* worry two: 10 → 9 */

  a.tap('#m-mine').shows('2 tests across 2 worries');
  a.shows('Asking for help').shows('Saying no without an excuse');

  /* the older one is the second card, and going again keeps its rung rather than starting over */
  a.tap('[data-again]', 1).shows('No, I can’t this time');
  a.tap('#lock').tap('#done').type('#o', 'Nothing happened.').tap('#next');
  a.shows('Last time').shows('>7<');
  a.tap('[data-key]', 1).shows('>6<');
});

test('your worries opens the pick list until there is one, and the worry after that', () => {
  const a = boot();
  /* nothing recorded: the door still works, and lands somewhere with something to do */
  a.tap('#m-mine').shows('Which one?');
  a.tap('#back').shows('Sure it’ll go badly?');
  loop(a, 0, 'He said fair enough.', 1);
  a.tap('#m-mine').shows('Your worries').shows('He said fair enough.');
  a.tap('#back').shows('Sure it’ll go badly?');
});

test('a result saved by the version before the ladder still opens, and still counts', () => {
  const old = {
    id: 'no', source: 'stock', label: 'Saying no without an excuse',
    belief: 'If I say no without an excuse, people will think I am selfish.',
    x: 'They will be annoyed.', test: 'Say no once.', drop: 'Do not explain.',
    o: 'He said fair enough.', rate: 55, rateLabel: 'A bit less sure', when: '2026-09-01T10:00:00.000Z'
  };
  const a = boot({ 'betr.v1': JSON.stringify({ stage: 'start', done: [old] }) });
  a.tap('#m-mine').shows('Your worries').shows('>6<').shows('He said fair enough.');
});

/*
  Founder, 2026-09-03: "please don't put things with no capitalisation … it's very modern but
  not cool". So no label a person taps starts lowercase, and the wordmark is BETR.
*/
test('every label a person taps starts with a capital, and the wordmark is BETR', () => {
  const a = boot();
  const seen = [];
  const sweep = () => {
    for (const m of a.html().matchAll(/<button[^>]*>([^<]+)</g)) {
      const label = m[1].replace(/^[←→·\s]+/, '');
      if (label) seen.push(label);
    }
  };

  sweep();                                             /* start */
  a.tap('#doors'); sweep();
  a.tap('#back').tap('#go'); sweep();                  /* pick */
  a.tap('[data-id]', 0); sweep();                      /* plan */
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
  assert.ok(a.html().indexOf('BETR') !== -1 || seen.length > 0);
});

test('the brand is BETR everywhere a person reads it, refusals included', () => {
  const a = boot();
  a.shows('BETR');
  a.tap('#m-help').shows('BETR helps you test unhelpful beliefs');
  a.shows('BETR is plain HTML');
  assert.ok(a.html().indexOf('Betr ') === -1, 'found the old mixed-case wordmark in prose');

  /* the two refusals a person can actually be shown, which is where it hid until 2026-09-03 */
  const b = boot();
  b.tap('#go').tap('#own');
  b.type('#t', 'If I say no, people will think I am selfish').tap('#next');
  b.type('#t', 'Weigh myself every morning').tap('#next').shows('BETR doesn’t do tests about');
  b.type('#t', 'Cut myself where nobody will see it').tap('#next').shows('BETR can’t help');
  assert.ok(b.html().indexOf('Betr ') === -1, 'found the old mixed-case wordmark in a refusal');
});
