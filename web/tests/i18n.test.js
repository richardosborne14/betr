/*
  B15: every word out of the code, and the check that keeps it out.

  What these are guarding, hardest first:

    - NO SENTENCE A PERSON READS IS LEFT IN app.js. That is the test that stops the problem
      coming back, and it is the only reason the rest of B15 was worth doing: the words were
      not put in app.js on purpose, they arrived one screen at a time
    - a person never reads a key. A key that exists nowhere comes back blank and is recorded,
      and this file fails the build on it rather than letting "result.ladder.title" ship
    - every language has every key, or falls back to English one key at a time — a half
      finished translation is a working app, never a blank screen
    - the frozen sentences are still the frozen sentences, in every language there is
    - the phrases that never appear, per language, because a translator with good intentions
      is exactly who would put "improve your mental health" back in French
    - the language a person reads is never the country their helpline comes from (B17)
*/
const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const { boot } = require('./harness.js');
const i18n = require('../lib/i18n.js');
const guards = require('../lib/guards.js');
const store = require('../lib/store.js');
const en = require('../content/strings-en.js');
const fr = require('../content/strings-fr.js');

const WEB = path.join(__dirname, '..');

/* Every language file in the build. B16 adds one line here and the whole file starts testing it. */
const LOCALES = { en: en, fr: fr };

/*
  A language may deliberately have NO frozen block, and French does (B16, 2026-09-16). The
  frozen sentences and the purpose statement are approved once, by a named person, and then
  frozen; until that has happened a French reader falls back to the English ones, which is
  what lib/i18n.js does key by key. Naming the language here is how that stays a decision
  somebody made rather than something nobody noticed: the test below still fails on a
  half-written or stubbed frozen block, which is the thing worth catching.
*/
/* French left this list on 2026-09-16, with its frozen block in draft for the founder's sign-off (B16 §10g). */
const FROZEN_STILL_IN_ENGLISH = [];

const at = (tree, key) => key.split('.').reduce((node, part) => (node == null ? node : node[part]), tree);

/* Every key in a string file, flattened: 'help.primer.0', 'mine.tests.one'. */
function keysOf(node, prefix) {
  if (typeof node === 'string') return [prefix];
  if (node && typeof node === 'object') {
    return Object.keys(node).flatMap((k) => keysOf(node[k], prefix ? prefix + '.' + k : k));
  }
  return [];
}

/* ------------------------------------------------- no English left in the code */

/*
  One allowed exception, and it has to stay one. This is a CSS media query handed to
  matchMedia, not something anybody reads. Anything else that lands in this list is prose
  that belongs in content/strings-en.js.
*/
const NOT_PROSE = ['(display-mode: standalone)'];

/* Two runs of letters with a space between them. A dotted key or a hyphenated id is not that. */
const PROSE = /[A-Za-z]{3,}[^A-Za-z]{0,2}\s[^A-Za-z]{0,2}[A-Za-z]{2,}/;

/* Markup is not prose: whole tags, and the two halves of a tag split across a concatenation. */
const stripMarkup = (s) => s
  .replace(/<[^>]*>/g, ' ')
  .replace(/<[^>]*$/, ' ')
  .replace(/^[^<]*>/, ' ')
  .replace(/\[[^\]]*\]/g, ' ');

function literalsIn(file) {
  const src = fs.readFileSync(path.join(WEB, file), 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^\s*\/\/.*$/gm, '');
  return [...src.matchAll(/'((?:[^'\\]|\\.)*)'/g)].map((m) => m[1]);
}

test('no sentence a person can read is left in app.js', () => {
  const left = literalsIn('app.js').filter((l) =>
    l !== 'use strict' && NOT_PROSE.indexOf(l) === -1 && PROSE.test(stripMarkup(l)));
  assert.deepStrictEqual(left, [],
    'these belong in web/content/strings-en.js, not in app.js');
});

test('the guard and the store say nothing either — they decide, the string file speaks', () => {
  for (const file of ['lib/store.js', 'lib/where.js', 'lib/i18n.js']) {
    const left = literalsIn(file).filter((l) => PROSE.test(stripMarkup(l)));
    assert.deepStrictEqual(left, [], file + ' has words a person reads in it');
  }
  /* guards.js keeps word LISTS, which are not sentences; what it says is keys and nothing else. */
  for (const key of Object.keys(guards.REASON)) {
    assert.match(guards.REASON[key], /^refusal\.[a-zA-Z]+$/, key + ' is a sentence, not a key');
  }
});

/* ------------------------------------------------- every key the app asks for exists */

test('every key app.js asks for is in the string file', () => {
  const src = fs.readFileSync(path.join(WEB, 'app.js'), 'utf8');
  const asked = new Set();
  for (const m of src.matchAll(/\b(?:t|I\.plural|I\.list)\('([a-zA-Z0-9.]+)'/g)) asked.add(m[1]);

  assert.ok(asked.size > 50, 'only found ' + asked.size + ' keys: the sweep has stopped working');
  for (const key of asked) {
    /* 'go.' is a prefix the app finishes at the last moment (a result's tag); checked below. */
    if (key.slice(-1) === '.') continue;
    assert.ok(at(en.s, key) != null, 'app.js asks for "' + key + '", which is not in strings-en.js');
  }

  /* the ones built at the last moment, which the sweep above cannot see */
  for (const tag of store.TAGS) assert.ok(typeof en.s.go[tag] === 'string', 'no word for the ' + tag + ' tag');
  for (const k of Object.keys(guards.REASON)) {
    assert.ok(typeof at(en.s, guards.REASON[k]) === 'string', 'no words for the ' + k + ' refusal');
  }
});

test('a person never reads a key, and never reads an unfilled placeholder', () => {
  const a = boot();
  let seen = a.html();                                                  /* the front */
  a.tap('#lock'); seen += a.html();                                     /* an empty sentence */
  a.type('#if', 'tell them').type('#then', 'I’ll hurt myself').tap('#lock'); seen += a.html();
  a.type('#if', 'tell my best friend').type('#then', 'it’ll bring us closer').tap('#lock'); seen += a.html();
  a.tap('#done'); seen += a.html();
  a.tap('[data-tag="yeah"]'); seen += a.html();
  a.type('#x', 'She hugged me.').tap('#keep'); seen += a.html();
  a.tap('#away'); seen += a.html();
  a.tap('[data-p]'); seen += a.html();
  a.tap('#f-why'); seen += a.html();
  a.tap('#f-help'); seen += a.html();
  a.tap('#export'); seen += a.html();
  a.tap('#where'); seen += a.html();

  /* text between tags, which is the only part a person actually reads */
  const words = seen.replace(/<[^>]*>/g, ' ');
  assert.ok(!/\{[a-zA-Z]+\}/.test(words), 'an unfilled placeholder reached a screen: ' +
    (words.match(/\{[a-zA-Z]+\}/) || [])[0]);
  /*
    Dotted keys only: a one-word key like `back` is also an ordinary English word, and
    "come back and say what happened" is a sentence, not a bug.
  */
  for (const key of keysOf(en.s, '').filter((k) => k.indexOf('.') !== -1)) {
    assert.ok(words.indexOf(key) === -1, 'the key "' + key + '" was printed instead of its words');
  }
});

/* ------------------------------------------------- the module itself */

test('a language falls back to English one key at a time, not one file at a time', () => {
  const half = { lang: 'xx', dir: 'ltr', name: 'Halfish', s: { front: { title: 'Halfish title' } } };
  const I = i18n.create({ en: en, xx: half }, { chosen: 'xx' });

  assert.strictEqual(I.t('front.title'), 'Halfish title', 'the translated key was not used');
  assert.strictEqual(I.t('front.note'), en.s.front.note, 'a missing key did not fall back to English');
  assert.ok(I.gapKeys().indexOf('front.note') !== -1, 'the gap was not recorded for the translator');
  assert.deepStrictEqual(I.unknownKeys(), [], 'a key that exists was called unknown');
});

test('a key that exists nowhere is blank and is recorded, never printed', () => {
  const I = i18n.create({ en: en });
  assert.strictEqual(I.t('nothing.here.at.all'), '');
  assert.deepStrictEqual(I.unknownKeys(), ['nothing.here.at.all']);
});

test('the language is the person’s choice, then the browser’s, then English', () => {
  const two = { en: en, fr: { lang: 'fr', dir: 'ltr', name: 'Français', s: {} } };
  assert.strictEqual(i18n.pick(two, 'fr', ['en-GB']), 'fr', 'their own choice did not win');
  assert.strictEqual(i18n.pick(two, null, ['fr-CA', 'en']), 'fr', 'fr-CA did not find fr');
  assert.strictEqual(i18n.pick(two, null, ['de', 'fr']), 'fr', 'the second browser language was ignored');
  assert.strictEqual(i18n.pick(two, null, ['de']), 'en', 'an unknown language did not land on English');
  assert.strictEqual(i18n.pick(two, null, []), 'en');
  assert.strictEqual(i18n.pick(two, 'nonsense', []), 'en', 'a stored rubbish choice was used');
});

test('plurals and ordinals come from the browser, not from a table we wrote', () => {
  /* B56 took every number off the screens, so the app asks for no plural; the module still
     knows how, for the day a translation needs one, and is tested on a file of its own. */
  const I = i18n.create({ en: { lang: 'en', dir: 'ltr', name: 'English', s: {
    kept: { one: '{n} thing', other: '{n} things' },
    ordinal: { one: '{n}st', two: '{n}nd', few: '{n}rd', other: '{n}th' }
  } } });
  assert.strictEqual(I.plural('kept', 1), '1 thing');
  assert.strictEqual(I.plural('kept', 4), '4 things');
  assert.deepStrictEqual([1, 2, 3, 4, 11, 21].map((n) => I.ordinal(n)),
    ['1st', '2nd', '3rd', '4th', '11th', '21st']);
});

/* ------------------------------------------------- what is true of every language */

test('every language has every key, or falls back visibly', () => {
  const master = keysOf(en.s, '').sort();
  assert.ok(master.length > 100, 'only ' + master.length + ' keys: the string file has shrunk');

  for (const code of Object.keys(LOCALES)) {
    const file = LOCALES[code];
    assert.ok(file.lang && file.dir && file.name, code + ' has no lang, dir or name');
    assert.ok(file.dir === 'ltr' || file.dir === 'rtl', code + ' has a dir that is not ltr or rtl');

    const missing = master.filter((k) => typeof at(file.s, k) !== 'string');
    const extra = keysOf(file.s, '').filter((k) => master.indexOf(k) === -1);
    assert.deepStrictEqual(extra, [], code + ' has keys English does not, so nothing reads them');
    /* Missing is allowed — it falls back — but it is listed, so nobody ships one by accident. */
    if (missing.length) {
      console.error('\n  ' + code + ' is missing ' + missing.length + ' keys and will show English:\n    ' +
        missing.join('\n    ') + '\n');
    }
  }
});

test('the frozen sentences are frozen, in every language', () => {
  for (const code of Object.keys(LOCALES)) {
    const s = LOCALES[code].s.frozen;
    if (s === undefined && FROZEN_STILL_IN_ENGLISH.indexOf(code) !== -1) continue;
    assert.ok(s, code + ' has no frozen block and is not listed as still reading the English one');
    assert.strictEqual(s.sentences.length, 9, code + ' does not have nine sentences');
    for (const line of s.sentences) assert.ok(line.trim().length > 40, code + ' has a stub sentence');
    assert.ok(s.purpose.trim().length > 100, code + ' has no purpose statement');
  }
  /* English is the canonical one, and menu.test.js pins sentence 7 word for word on screen. */
  assert.match(en.s.frozen.sentences[0], /not a medical device/);
  assert.match(en.s.frozen.sentences[6], /^If you are in danger or in crisis, call your local emergency number\./);
  assert.match(en.s.frozen.sentences[8], /made by the people behind TrybeUP/);
});

test('none of the phrases that are never used appears in any language', () => {
  const banned = ['digital cbt', 'improve your mental health', 'reduces symptoms',
                  'tracks your anxiety', 'irrational', 'streak'];
  for (const code of Object.keys(LOCALES)) {
    const all = JSON.stringify(LOCALES[code]).toLowerCase();
    for (const phrase of banned) {
      assert.ok(all.indexOf(phrase) === -1, code + ' contains "' + phrase + '"');
    }
  }
});

test('the wordmark is BETR everywhere a person reads it', () => {
  for (const code of Object.keys(LOCALES)) {
    const file = LOCALES[code];
    for (const key of keysOf(file.s, '')) {
      const said = at(file.s, key);
      assert.ok(!/\bBetr\b/.test(said), code + '.' + key + ' says "Betr" rather than BETR: ' + said);
    }
  }
});

/* ------------------------------------------------- the picker at the top right (B16) */

/*
  Founder, 2026-09-16: a discreet language picker at the top right of every screen. Until then
  B15 had it in Help and nowhere else. These hold what makes it discreet and what makes it safe.
*/
test('the language picker is on every screen, top right, and outside the one question', () => {
  const a = boot();
  const front = a.html();
  const top = front.slice(front.indexOf('<div class="top">'), front.indexOf('<main'));
  assert.ok(top.indexOf('<p class="wordmark">BETR</p>') !== -1, 'the wordmark left its row');
  assert.ok(top.indexOf('<select id="lang"') !== -1, 'no picker on the wordmark row');
  assert.ok(top.indexOf('aria-label="' + en.s.help.langTitle + '"') !== -1, 'the picker has no name a screen reader can say');
  assert.ok(top.indexOf('>EN<') !== -1, 'the picker does not show which language this is');
  /* each language by its own name, so a person can find theirs */
  assert.ok(top.indexOf('<option value="fr" lang="fr">Fran\u00e7ais</option>') !== -1);
  assert.ok(top.indexOf('<option value="en" lang="en" selected>English</option>') !== -1);
  /* no flag: a flag is a country, and language is never country (B17) */
  assert.ok(!/[\u{1F1E6}-\u{1F1FF}]/u.test(top), 'a flag is on the picker');

  /* on a refusal too, where somebody who cannot read the crisis block needs it most */
  a.type('#if', 'tell them').type('#then', 'I\u2019ll kill myself').tap('#lock');
  assert.ok(a.html().indexOf('<select id="lang"') !== -1, 'no picker on the refusal');
});

test('picking French turns the screen French at once, remembers it, and loses nothing', () => {
  const a = boot();
  a.type('#if', 'ask for Friday off').type('#then', 'my boss will think I\u2019m slacking').tap('#lock');
  a.showsText(en.s.on.ask);

  a.pick('#lang', 'fr');
  assert.strictEqual(a.lang(), 'fr', '<html lang> did not change');
  a.showsText(fr.s.on.ask).showsText(fr.s.foot.mine);
  /* the prediction is the person's words and is not translated, or lost */
  a.showsText('If I ask for Friday off, then my boss will think I\u2019m slacking.');
  assert.ok(a.html().indexOf('>FR<') !== -1);
  assert.strictEqual(JSON.parse(a.mem['betr.v2']).lang, 'fr', 'the choice was not remembered');

  a.pick('#lang', 'en');
  a.showsText(en.s.on.ask);
});

/* ------------------------------------------------- language is not country */

test('choosing a language never changes which helpline a person is shown', () => {
  /* Spanish-speaking, in Texas: the time zone decides, exactly as it did before B15. */
  const a = boot(null, { timeZone: 'America/Chicago', languages: ['es-ES', 'es'] });
  const h = a.tap('#f-help').html();
  assert.ok(h.indexOf('In the United States') !== -1, 'a Spanish speaker in Texas was sent abroad');
  assert.ok(h.indexOf('href="tel:988"') !== -1);

  /* and the app is in English, because there is no Spanish yet — not in Spanish-for-Spain */
  assert.strictEqual(a.lang(), 'en');

  /* the other way round: the country picker changes the number and not one word of anything */
  const strip = (s) => s.slice(0, s.indexOf('If you are in danger or in crisis'));
  const uk = boot(null, { timeZone: 'Europe/London' });
  const ke = boot(null, { timeZone: 'Africa/Nairobi' });
  assert.strictEqual(strip(uk.tap('#f-help').html()), strip(ke.tap('#f-help').html()));
});

test('nothing is ever fetched to work out a language', () => {
  for (const f of ['lib/i18n.js', 'content/strings-en.js']) {
    const src = fs.readFileSync(path.join(WEB, f), 'utf8');
    for (const bad of ['fetch(', 'XMLHttpRequest', 'import(', 'geolocation', 'http://', 'src=']) {
      assert.ok(src.indexOf(bad) === -1, f + ' contains ' + bad);
    }
  }
  /* every language is in the page, so index.html loads them as plain scripts and nothing else */
  const html = fs.readFileSync(path.join(WEB, 'index.html'), 'utf8');
  for (const code of Object.keys(LOCALES)) {
    assert.ok(html.indexOf('content/strings-' + code + '.js') !== -1,
      code + ' is in the tests but not in index.html, so nobody would ever see it');
  }
});

/* ------------------------------------------------- ready for right-to-left */

/*
  No right-to-left language ships in B15 — that is B16 — and these two exist so that shipping
  one is a translation job rather than a rebuild. A physical property or a px font size added
  later would put the month back on it silently, which is exactly how it would happen.
*/
test('every layout property in the stylesheet is logical, not physical', () => {
  const css = fs.readFileSync(path.join(WEB, 'app.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  const physical = /(^|[\s;{])(left|right|margin-left|margin-right|padding-left|padding-right|border-left|border-right|inset-left|inset-right)\s*:/g;
  const found = [...css.matchAll(physical)].map((m) => m[2]);
  assert.deepStrictEqual(found, [],
    'use the logical property instead: margin-inline-start, inset-inline-start, and so on');
  assert.ok(!/text-align\s*:\s*(left|right)/.test(css), 'text-align must be start or end, not left or right');
});

test('every font size answers to a person’s text-size setting', () => {
  const css = fs.readFileSync(path.join(WEB, 'app.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  const px = [...css.matchAll(/font-size\s*:\s*([^;]+);/g)]
    .map((m) => m[1].trim())
    .filter((v) => /\d(\.\d+)?px/.test(v));
  assert.deepStrictEqual(px, [],
    'a px font size ignores the text size a person set in their browser; use rem');
});
