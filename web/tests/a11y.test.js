/*
  B15, carried into B56: what BETR does for somebody who cannot see it.

    1. tapping a button used to do nothing at all, out loud: #app's markup was replaced and
       focus was left on a button that no longer existed. Focus lands on the new screen's
       heading, so a screen reader reads it — on every one of the redesign's screens
    2. what a sighted person sees without being told — a button drawn at 45%, an empty box —
       is said into the live region, because a screen reader cannot see 45%
    3. <html lang> and dir follow the language
    4. the spark on Yeah! is decoration and says nothing; the three answers are buttons that
       say their words

  This is a fake DOM and it cannot see layout, contrast or what a real screen reader does with
  any of it. The real check is one pass on a real phone by somebody who uses VoiceOver or
  TalkBack every day, written down as a release condition in B15, not as a test.
*/
const { test } = require('node:test');
const assert = require('node:assert');
const { boot } = require('./harness.js');
const s = require('../content/strings-en.js').s;

const IF = 'say no to my sister without a reason';
const THEN = 'she’ll take it as rude';
const locked = (a) => a.type('#if', IF).type('#then', THEN).tap('#lock');

/* Every screen there is, and the taps that get to it from a fresh start. */
const SCREENS = {
  front: (a) => a,
  on: (a) => locked(a),
  go: (a) => locked(a).tap('#done'),
  happened: (a) => locked(a).tap('#done').tap('[data-tag="sort"]'),
  log: (a) => locked(a).tap('#done').tap('[data-tag="sort"]').type('#x', 'She said fine.').tap('#keep'),
  mine: (a) => SCREENS.log(a).tap('#f-mine'),
  why: (a) => a.tap('#f-why'),
  help: (a) => a.tap('#f-help'),
  where: (a) => a.tap('#f-help').tap('#where')
};

test('every screen has one heading, and focus lands on it when the screen changes', () => {
  for (const name of Object.keys(SCREENS)) {
    const a = SCREENS[name](boot());
    const tops = a.html().match(/id="top"/g) || [];
    assert.strictEqual(tops.length, 1, name + ' has ' + tops.length + ' headings to land on');
    assert.match(a.html(), /<h[123][^>]*id="top" tabindex="-1"/, name + '’s landing point is not a heading');
    assert.strictEqual(a.focusedId(), 'top', 'focus did not move on the way to ' + name);
  }
});

test('focus moves again from every word on the foot, from every screen', () => {
  for (const name of Object.keys(SCREENS)) {
    for (const door of ['#f-mine', '#f-why', '#f-help']) {
      const a = SCREENS[name](boot());
      a.tap(door);
      assert.strictEqual(a.focusedId(), 'top', door + ' left focus behind on ' + name);
    }
  }
});

test('Lock it in says it is not ready in a way a screen reader hears', () => {
  const a = boot();
  assert.match(a.html(), /id="lock" aria-disabled="true"/);
  a.tap('#lock');
  assert.strictEqual(a.said(), s.refusal.emptyIf);
  assert.strictEqual(a.focusedId(), 'if');
  /* a repaint with both blanks written draws it ready */
  const b = boot();
  b.type('#if', 'hurt myself').type('#then', THEN).tap('#lock');
  assert.match(b.html(), /id="lock" aria-disabled="false"/);
});

test('a refusal is read out, because the heading has not changed', () => {
  const a = boot();
  a.type('#if', IF).type('#then', 'they’ll know I want to kill myself').tap('#lock');
  assert.strictEqual(a.said(), s.refusal.harm);
  assert.strictEqual(a.focusedId(), 'top');
});

test('an empty What happened? box is read out, and the box is where focus goes', () => {
  const a = SCREENS.happened(boot()).tap('#keep');
  assert.strictEqual(a.said(), s.happened.empty);
  assert.strictEqual(a.focusedId(), 'x');
});

test('the live region is empty on an ordinary screen change, so nothing is said twice', () => {
  for (const name of ['on', 'go', 'happened', 'log', 'mine', 'why', 'help']) {
    assert.strictEqual(SCREENS[name](boot()).said(), '', name + ' announced its heading as well as focusing it');
  }
});

test('the three answers are buttons that say their words, and the spark says nothing', () => {
  const h = SCREENS.go(boot()).html();
  for (const tag of ['yeah', 'sort', 'not']) {
    const m = h.match(new RegExp('<button class="pill ' + tag + '" data-tag="' + tag + '">([\\s\\S]*?)</button>'));
    assert.ok(m, tag + ' is not a button');
    assert.strictEqual(m[1].replace(/<svg[\s\S]*?<\/svg>/g, '').trim(), s.go[tag]);
  }
  assert.match(h, /<svg class="spark" viewBox="0 0 24 24" aria-hidden="true" focusable="false">/);
});

test('every blank and every box a person types into has a name', () => {
  let h = SCREENS.front(boot()).html();
  h += SCREENS.happened(boot()).html();
  h += boot().tap('#f-help').tap('#export').html();
  const boxes = [...h.matchAll(/<(?:textarea|input|span[^>]*role="textbox")([^>]*)>/g)].map((m) => m[0]);
  assert.ok(boxes.length >= 4, 'only found ' + boxes.length + ' boxes to check');
  for (const box of boxes) assert.match(box, /aria-label(ledby)?="[^"]{3,}"/, 'an unnamed box: ' + box);
  /* the two blanks are named well enough to be read alone, out of the sentence */
  assert.ok(h.indexOf('aria-label="' + s.front.ifLabel + '"') !== -1);
  assert.ok(h.indexOf('aria-label="' + s.front.thenLabel + '"') !== -1);
  assert.notStrictEqual(s.front.ifLabel, s.front.thenLabel);
});

test('the results are a named list, and the prediction is the heading of its own screen', () => {
  const h = SCREENS.log(boot()).html();
  assert.match(h, /<h2 class="paper small said" id="top" tabindex="-1">If I say no to my sister/);
  assert.ok(h.indexOf('<ol class="paper small results" aria-label="' + s.log.list + '">') !== -1);
  assert.match(h, /<li class="entry">/);
});

test('lang and dir follow the language, and survive a reload', () => {
  const a = boot();
  assert.strictEqual(a.lang(), 'en');
  assert.strictEqual(a.dir(), 'ltr');
  assert.strictEqual(boot(null, { languages: ['de-DE', 'de'] }).lang(), 'en');
  const c = boot({ 'betr.v2': JSON.stringify({ stage: 'front', lang: 'en', predictions: [] }) });
  assert.strictEqual(c.lang(), 'en');
  c.showsText(s.front.title);
});

test('the foot is named BETR, and the arrows and ticks say nothing', () => {
  let h = boot().html();
  h += boot().tap('#f-help').html();
  h += boot().tap('#f-help').tap('#where').html();
  assert.match(h, /<nav class="foot" aria-label="BETR">/);
  assert.ok(!/aria-label="Betr"/.test(h));
  for (const m of h.matchAll(/<span([^>]*)>([←→✓])</g)) {
    assert.ok(m[1].indexOf('aria-hidden="true"') !== -1, 'a bare "' + m[2] + '" is read aloud');
  }
});

test('the heading order on Help starts at the top and does not skip', () => {
  const h = boot().tap('#f-help').html();
  const levels = [...h.matchAll(/<h([123])[ >]/g)].map((m) => Number(m[1]));
  assert.ok(levels.length > 6, 'only found ' + levels.length + ' headings on Help');
  assert.strictEqual(levels[0], 2, 'Help does not start at its own top level');
  for (let i = 1; i < levels.length; i++) {
    assert.ok(levels[i] <= levels[i - 1] + 1, 'the heading order jumps from h' + levels[i - 1] + ' to h' + levels[i]);
  }
});
