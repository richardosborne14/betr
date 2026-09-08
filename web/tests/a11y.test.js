/*
  B15: what BETR does for somebody who cannot see it.

  The audit in docs/tasks/B15-words-out-of-the-code.md ranked these, and the order here is
  that order. The first one is the difference between awkward and unusable:

    1. tapping the big button used to do nothing at all, out loud. #app's markup was replaced,
       focus was never moved, and the focus ring was left on a button that no longer existed.
       Now focus lands on the new screen's heading, so a screen reader reads it
    2. the ladder was a picture. Ten circles say nothing; now one sentence says the rung, out
       of ten, and which way it moved — and, per CLAUDE.md rule 5, no total and no average
    3. <html lang> and dir follow the language, or every assistive technology mispronounces
       every word on the screen
    4. the accessible name of the menu says BETR, not "Betr" (rule 7)

  This is a fake DOM and it cannot see layout, contrast or what a real screen reader does with
  any of it. It catches the things that would silently stop working. The real check is one
  pass on a real phone by somebody who uses VoiceOver or TalkBack every day, and that is
  written down as a release condition in the B15 task file, not as a test.
*/
const { test } = require('node:test');
const assert = require('node:assert');
const { boot } = require('./harness.js');

const en = require('../content/strings-en.js');

/* Every screen there is, and the taps that get to it from a fresh start. */
const SCREENS = {
  start: (a) => a,
  doors: (a) => a.tap('#go'),
  pick: (a) => a.tap('#go').tap('[data-door]', 0),
  /* B20: the two screens between the list and a test, where the person says which one it is */
  belief: (a) => a.tap('#go').tap('[data-door]', 0).tap('[data-id]', 0),
  'belief-own': (a) => a.tap('#go').tap('[data-door]', 0).tap('[data-id]', 0).tap('#own'),
  /* B30: the way in, and the two halves of it */
  build: (a) => a.tap('#m-new'),
  'build-do': (a) => a.tap('#m-new')
    .type('#if', 'say no without giving a reason')
    .type('#then', 'they’ll think I’m being difficult').tap('#next'),
  plan: (a) => a.tap('#go').tap('[data-door]', 0).tap('[data-id]', 0).tap('[data-b]', 0),
  locked: (a) => a.tap('#go').tap('[data-door]', 0).tap('[data-id]', 0).tap('[data-b]', 0).tap('#lock'),
  happened: (a) => a.tap('#go').tap('[data-door]', 0).tap('[data-id]', 0).tap('[data-b]', 0).tap('#lock').tap('#nothanks').tap('#done'),
  sure: (a) => a.tap('#go').tap('[data-door]', 0).tap('[data-id]', 0).tap('[data-b]', 0).tap('#lock').tap('#nothanks').tap('#done')
    .type('#o', 'He said fair enough.').tap('#next'),
  result: (a) => a.tap('#go').tap('[data-door]', 0).tap('[data-id]', 0).tap('[data-b]', 0).tap('#lock').tap('#nothanks').tap('#done')
    .type('#o', 'He said fair enough.').tap('#next').tap('[data-key]', 1),
  mine: (a) => a.tap('#go').tap('[data-door]', 0).tap('[data-id]', 0).tap('[data-b]', 0).tap('#lock').tap('#nothanks').tap('#done')
    .type('#o', 'He said fair enough.').tap('#next').tap('[data-key]', 1).tap('#m-mine'),
  why: (a) => a.tap('#go').tap('[data-door]', 0).tap('[data-id]', 0).tap('[data-b]', 0).tap('#lock').tap('#nothanks').tap('#done')
    .type('#o', 'He said fair enough.').tap('#next').tap('[data-key]', 1).tap('[data-why]'),
  help: (a) => a.tap('#m-help'),
  where: (a) => a.tap('#m-help').tap('#where')
};

/* ------------------------------------------------- focus, on every screen there is */

test('every screen has one heading, and focus lands on it when the screen changes', () => {
  for (const name of Object.keys(SCREENS)) {
    const a = SCREENS[name](boot());
    const tops = a.html().match(/id="top"/g) || [];
    assert.strictEqual(tops.length, 1, name + ' has ' + tops.length + ' headings to land on');
    assert.match(a.html(), /<h[123][^>]*id="top" tabindex="-1"/,
      name + '’s landing point is not a heading that can take focus');
    /* the two screens that are a box to type in take the box instead, and name it — below */
    const wanted = { 'belief-own': 't', build: 'if', 'build-do': 'do', happened: 'o' }[name] || 'top';
    assert.strictEqual(a.focusedId(), wanted, 'focus did not move on the way to ' + name);
  }
});

/*
  The two screens that are a box to type in take focus off the heading on purpose — and pay
  for it by naming the box with the heading, so a screen reader still reads the question.
*/
test('a screen that grabs a box instead of the heading still says what the box is for', () => {
  const a = boot().tap('#m-new');
  /*
    B30. The build screen is two gaps in a sentence, so focus goes to the first gap and the
    heading cannot name it — there are two of them. Each blank carries its own name instead,
    and those names have to work read alone, out of order, with no sentence around them.
  */
  assert.strictEqual(a.focusedId(), 'if');
  assert.match(a.html(), /<input[^>]*aria-label="If I[^"]*"[^>]*id="if"|<input[^>]*id="if"[^>]*aria-label="[^"]+"/);
  const blanks = [...a.html().matchAll(/<input[^>]*>/g)].map((m) => m[0]);
  assert.strictEqual(blanks.length, 2, 'the sentence does not have two blanks in it');
  for (const b of blanks) assert.match(b, /aria-label="[^"]{8,}"/, 'an unnamed blank: ' + b);

  a.type('#if', 'say no without giving a reason');
  a.type('#then', 'they’ll think I’m being difficult').tap('#next');
  assert.strictEqual(a.focusedId(), 'do');
  assert.match(a.html(), /<textarea id="do"[^>]*aria-labelledby="top"/);
  a.type('#do', 'Say no to one thing today.').tap('#lock').tap('#nothanks').tap('#done');
  assert.strictEqual(a.focusedId(), 'o');
  assert.match(a.html(), /<textarea id="o"[^>]*aria-labelledby="top"/);
});

test('focus moves again on the way back out of a screen, from every door', () => {
  /* "New test" opens the build screen, which takes the first blank rather than the heading. */
  const lands = { '#m-mine': 'top', '#m-new': 'if', '#m-help': 'top' };
  for (const door of Object.keys(lands)) {
    const a = SCREENS.result(boot());
    a.tap(door);
    assert.strictEqual(a.focusedId(), lands[door], door + ' left focus behind');
  }
});

/* ------------------------------------------------- what is said out loud */

test('a refusal is read out, because the heading has not changed', () => {
  /*
    B29 and B30. The refusals a person can still meet are the empty blank and the one hard
    stop, and both land on a screen whose heading has not changed — so neither is announced
    by the focus move, and both have to be read into the live region by hand.
  */
  const a = boot().tap('#m-new');
  a.tap('#next');
  assert.strictEqual(a.said(), en.s.refusal.emptyIf);

  a.type('#if', 'tell them how I really feel');
  a.type('#then', 'they’ll know I want to kill myself').tap('#next');
  assert.strictEqual(a.said(), en.s.refusal.harm);

  /* And on the second half, where it is a plan rather than a prediction. */
  const b = boot().tap('#m-new');
  b.type('#if', 'say no without giving a reason');
  b.type('#then', 'they’ll think I’m being difficult').tap('#next');
  b.type('#do', 'See how long I can go without wanting to hurt myself').tap('#lock');
  assert.strictEqual(b.said(), en.s.refusal.harm);

  /* The verdict guard is unreachable by shape now, and still fires on a bare sentence. */
  const c = boot().tap('#go').tap('[data-door]', 0).tap('[data-id]', 0).tap('#own');
  c.type('#t', 'I am a waste of space').tap('#next');
  assert.strictEqual(c.said(), en.s.refusal.verdict);
});

test('the result screen is read as a sentence, because a shape is not readable', () => {
  const a = SCREENS.result(boot());
  const said = a.said();
  assert.ok(said.indexOf('He said fair enough.') !== -1, 'what happened was not read out');
  assert.ok(/9 out of 10/.test(said), 'the rung was not read out: ' + said);
  for (const never of ['total', 'average', 'score', 'streak']) {
    assert.ok(said.toLowerCase().indexOf(never) === -1, 'the result was read out as a "' + never + '"');
  }
});

test('a note that appears in place is read out, and costs nothing either way', () => {
  const a = SCREENS.locked(boot());
  a.tap('#miss');
  assert.strictEqual(a.said(), en.s.locked.missed);
  a.hides('streak');
});

test('the live region is empty on an ordinary screen change, so nothing is said twice', () => {
  const a = boot();
  a.tap('#go');
  assert.strictEqual(a.said(), '', 'the heading was announced as well as focused');
});

/* ------------------------------------------------- the ladder, out loud */

test('a rung says the rung, out of ten, and which way it moved — and no total', () => {
  const a = boot();
  const loop = (said, key) => {
    a.tap('#lock');
    if (a.html().indexOf('id="nothanks"') !== -1) a.tap('#nothanks');
    a.tap('#done').type('#o', said).tap('#next').tap('[data-key]', key);
  };
  a.tap('#go').tap('[data-door]', 0).tap('[data-id]', 0).tap('[data-b]', 0);
  loop('He said fair enough.', 1);          /* 10 -> 9 */
  a.tap('#again');
  loop('Nobody minded.', 2);                 /* 9 -> 6 */

  const h = a.html();
  assert.ok(h.indexOf('9 out of 10. Down one rung.') !== -1, 'a one-rung fall was not said: ' + h);
  assert.ok(h.indexOf('6 out of 10. Down 3 rungs.') !== -1, 'a three-rung fall was not said');
  assert.ok(h.indexOf('Started: 10 out of 10.') !== -1, 'where it started was not said');

  /* the picture is hidden from a screen reader, because ten circles say nothing */
  assert.match(h, /<span class="dots" aria-hidden="true">/);
  assert.match(h, /<span class="num" aria-hidden="true">/);

  /* the belief it belongs to, once, on the ladder as a whole — never on every rung */
  const labels = h.match(/role="group" aria-label="[^"]*"/g) || [];
  assert.ok(labels.length >= 1, 'the ladder has no name at all');
  for (const l of labels) {
    assert.ok(/out of ten|Ten is completely sure/.test(l) || l.indexOf('How sure') !== -1, l);
    for (const never of ['total', 'average', 'target', 'compared']) {
      assert.ok(l.toLowerCase().indexOf(never) === -1, 'the ladder is named as a "' + never + '"');
    }
  }
});

test('a bad day is said as a rise, not as a failure', () => {
  const a = boot();
  a.tap('#go').tap('[data-door]', 0).tap('[data-id]', 0).tap('[data-b]', 0).tap('#lock').tap('#nothanks').tap('#done');
  a.type('#o', 'He went quiet.').tap('#next').tap('[data-key]', 2);       /* 10 -> 7 */
  a.tap('#again').tap('#lock').tap('#done').type('#o', 'He brought it up again.').tap('#next');
  a.tap('[data-key]', 4);                                                 /* 7 -> 8 */
  const h = a.html();
  assert.ok(h.indexOf('8 out of 10. Up one rung.') !== -1, 'a rise was not said plainly: ' + h);
  for (const never of ['failed', 'missed', 'streak', 'wrong', 'worse']) {
    assert.ok(h.toLowerCase().indexOf(never) === -1, 'a bad day was called "' + never + '"');
  }
});

/* ------------------------------------------------- the language on the page itself */

test('lang and dir follow the language, and survive a reload', () => {
  const a = boot();
  assert.strictEqual(a.lang(), 'en');
  assert.strictEqual(a.dir(), 'ltr');

  /* a browser asking for something we do not have gets English, and says so honestly */
  const b = boot(null, { languages: ['de-DE', 'de'] });
  assert.strictEqual(b.lang(), 'en');

  /* a stored choice is read back on the next open, exactly as the country is */
  const c = boot({ 'betr.v1': JSON.stringify({ stage: 'start', lang: 'en', done: [] }) });
  assert.strictEqual(c.lang(), 'en');
  c.shows(en.s.start.title);
});

/* ------------------------------------------------- names, and things with no name */

test('the one accessible name in the app says BETR, and the arrows say nothing', () => {
  const a = boot();
  let h = a.html();
  h += a.tap('#go').html();
  h += a.tap('[data-door]', 0).html();
  h += a.tap('[data-id]', 0).tap('[data-b]', 0).html();
  h += a.tap('#m-help').html();

  assert.match(h, /<nav class="menu" aria-label="BETR">/);
  assert.ok(!/aria-label="Betr"/.test(h), 'the menu is named with the old mixed-case wordmark');

  /* every arrow and tick is decoration and is hidden; nothing else in the app is */
  for (const m of h.matchAll(/<span([^>]*)>([←→✓])</g)) {
    assert.ok(m[1].indexOf('aria-hidden="true"') !== -1, 'a bare "' + m[2] + '" is read aloud');
  }
});

test('every box a person types into has a name', () => {
  const a = boot();
  let h = SCREENS['build-do'](boot()).html();
  h += SCREENS['belief-own'](boot()).html();
  h += SCREENS.happened(boot()).html();
  h += a.tap('#go').tap('[data-door]', 0).tap('[data-id]', 0).tap('[data-b]', 0).tap('#xedit').html();
  h += boot().tap('#m-help').tap('#export').html();

  h += SCREENS.build(boot()).html();
  /* B30 added two <input> blanks, which are boxes a person types into like any other. */
  const boxes = [...h.matchAll(/<(?:textarea|input)([^>]*)>/g)].map((m) => m[1]);
  assert.ok(boxes.length >= 6, 'only found ' + boxes.length + ' boxes to check');
  for (const box of boxes) {
    assert.ok(/aria-label(ledby)?="/.test(box), 'an unnamed box: <textarea' + box + '>');
  }
});

test('the heading order on Help starts at the top and does not skip', () => {
  const h = boot().tap('#m-help').html();
  const levels = [...h.matchAll(/<h([123])[ >]/g)].map((m) => Number(m[1]));
  assert.ok(levels.length > 6, 'only found ' + levels.length + ' headings on Help');
  assert.strictEqual(levels[0], 2, 'Help does not start at its own top level');
  for (let i = 1; i < levels.length; i++) {
    assert.ok(levels[i] <= levels[i - 1] + 1,
      'the heading order jumps from h' + levels[i - 1] + ' to h' + levels[i]);
  }
});
