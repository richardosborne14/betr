/*
  B17: the right helpline for the country a person is actually in.

  What these are guarding, hardest first:

    - a country nobody has checked a number for shows NO NUMBER AT ALL. Not a neighbour's,
      not 988 because it is the one we have. That is the test that stops a well-meaning
      fallback being added later by somebody who thinks a number is better than none. It
      isn't: a person tries a wrong number, and they may only be going to try once
    - every number in content/helplines.js carries the page it was read on and the day a
      person read it there, and that day is not in the future
    - language and country never touch each other. Picking Spanish must not send somebody in
      Texas to a Madrid number
    - a choice the person made beats the guess, and survives a reload
    - nothing is fetched to work any of it out. There is no network here and there is no
      code that wants one

  The stubbed phone lives in harness.js: boot(seed, { timeZone, languages }).
*/
const { test } = require('node:test');
const assert = require('node:assert');
const { boot } = require('./harness.js');

const HELPLINES = require('../content/helplines.js');
const ZONES = require('../content/zones.js');
const where = require('../lib/where.js').create(ZONES, HELPLINES);

const EVERY_NUMBER = Object.keys(HELPLINES.countries).reduce(
  (all, code) => all.concat(HELPLINES.countries[code].lines.map((l) => l.number)), []);

/* Open Help and hand back just the crisis block, which runs to the "how we work it out" note. */
function crisisBlock(a) {
  const h = a.tap('#m-help').html();
  const from = h.indexOf('If you are in danger or in crisis');
  const to = h.indexOf('How we work out the country', from);
  assert.ok(from !== -1 && to > from, 'the crisis block is not at the top of Help');
  return h.slice(from, to);
}

/* --------------------------------------------------------------- reading the time zone */

test('a time zone says which country, and an unrecognised one says nothing', () => {
  assert.strictEqual(where.fromTimeZone('America/Mexico_City'), 'MX');
  assert.strictEqual(where.fromTimeZone('Europe/Madrid'), 'ES');
  assert.strictEqual(where.fromTimeZone('Africa/Nairobi'), 'KE');
  assert.strictEqual(where.fromTimeZone('Africa/Lagos'), 'NG');

  /* legacy names a browser can still hand us */
  assert.strictEqual(where.fromTimeZone('Asia/Calcutta'), 'IN');
  assert.strictEqual(where.fromTimeZone('Europe/Kiev'), 'UA');

  /* an abbreviation is genuinely ambiguous, and an unknown answer is a valid answer */
  for (const bad of ['EST', 'CET', 'UTC', 'Mars/Olympus', '', null, undefined, 42, {}]) {
    assert.strictEqual(where.fromTimeZone(bad), null, String(bad) + ' guessed a country');
  }
});

test('a phone that will not say where it is does not throw, and guesses nothing', () => {
  assert.strictEqual(where.guess({}), null);
  assert.strictEqual(where.guess(), null);
  assert.strictEqual(where.guess({ timeZone: null, languages: null }), null);
  const a = boot(null, { timeZone: null, languages: [] });
  a.shows('BETR');
  assert.ok(crisisBlock(a).indexOf('can’t tell which country') !== -1);
});

/* --------------------------------------------- the country nobody has checked a number for */

test('a country with no checked line shows no phone number at all', () => {
  const a = boot(null, { timeZone: 'Africa/Nairobi' });
  const block = crisisBlock(a);

  /* layer 1, layer 4, layer 3 — and nothing that dials */
  assert.ok(block.indexOf('call your local emergency number') !== -1, 'the always-true line is gone');
  assert.ok(block.indexOf('Kenya') !== -1, 'it does not say which country it means');
  assert.ok(block.indexOf('Nobody has checked a helpline number for it') !== -1, 'it is not honest about it');
  assert.ok(block.indexOf('findahelpline.com') !== -1, 'the directory is gone');
  assert.ok(block.indexOf('needs the internet') !== -1, 'the directory is not labelled honestly');

  assert.ok(block.indexOf('tel:') === -1, 'a phone number turned up for a country with no checked line');
  for (const n of EVERY_NUMBER) {
    assert.ok(block.indexOf('>' + n + '<') === -1, n + ' was shown to somebody in Kenya');
  }
});

test('a self-harm refusal in a country with no checked line also shows no number', () => {
  const a = boot(null, { timeZone: 'Africa/Lagos' });
  a.tap('#go').tap('#own');
  a.type('#t', 'If I ask for help, people will think less of me').tap('#next');
  a.type('#t', 'Find out how long I can go without wanting to hurt myself').tap('#next');
  a.shows('can’t help with that one');
  a.shows('call your local emergency number');
  a.shows('Nigeria');
  a.hides('tel:');
});

/* ------------------------------------------------------------ the country that has a line */

test('a country with a checked line names it, dials it, and says what it costs', () => {
  const block = crisisBlock(boot(null, { timeZone: 'Australia/Sydney' }));
  assert.ok(block.indexOf('In Australia') !== -1);
  assert.ok(block.indexOf('href="tel:131114"') !== -1, 'Lifeline does not dial');
  assert.ok(block.indexOf('13 11 14') !== -1);
  assert.ok(block.indexOf('Lifeline') !== -1);
  assert.ok(block.indexOf('Free, 24 hours') !== -1);
  assert.ok(block.indexOf('988') === -1, 'a US number turned up in Australia');
});

test('a country that answers in two languages gets both its lines', () => {
  const block = crisisBlock(boot(null, { timeZone: 'Europe/Brussels' }));
  assert.ok(block.indexOf('href="tel:1813"') !== -1);
  assert.ok(block.indexOf('href="tel:080032123"') !== -1);
  assert.ok(block.indexOf('in Dutch') !== -1 && block.indexOf('in French') !== -1);
});

/* ------------------------------------------------------- language is not country, ever */

test('the language a phone is set to never decides the country', () => {
  /* Spanish-speaking, in Texas. The time zone wins and Spain is not mentioned. */
  const block = crisisBlock(boot(null, { timeZone: 'America/Chicago', languages: ['es-ES', 'es'] }));
  assert.ok(block.indexOf('In the United States') !== -1, 'a Spanish speaker in Texas was sent abroad');
  assert.ok(block.indexOf('href="tel:988"') !== -1);
  assert.ok(block.indexOf('024') === -1, 'the Spanish line turned up in the United States');

  /* and the other way: the region on a language tag is read, the language itself never is */
  assert.strictEqual(where.fromLanguages(['es-MX', 'es']), 'MX');
  assert.strictEqual(where.fromLanguages(['es', 'fr', 'de']), null, 'a bare language named a country');
  assert.strictEqual(where.fromLanguages([]), null);
  assert.strictEqual(where.fromLanguages(null), null);

  /* the time zone always beats it, so a region subtag can never override where you are */
  assert.strictEqual(where.guess({ timeZone: 'Africa/Nairobi', languages: ['en-US'] }), 'KE');
  assert.strictEqual(where.guess({ timeZone: 'Nowhere/Real', languages: ['en-US'] }), 'US');
});

/* ------------------------------------------------------------------ what the person chose */

test('the country a person picks beats the time zone and survives a reload', () => {
  const a = boot(null, { timeZone: 'Europe/London' });
  assert.ok(crisisBlock(a).indexOf('116 123') !== -1, 'the time zone was not used to start with');

  a.tap('#where');
  a.shows('Where are you?').shows('Australia');
  a.tap('[data-cc="AU"]');

  /* straight back to the screen it was opened from, now showing the chosen country */
  assert.ok(a.html().indexOf('If you are in danger or in crisis') !== -1, 'it did not come back to Help');
  assert.ok(a.html().indexOf('href="tel:131114"') !== -1, 'the choice was not used');

  /* the phone is still in London and the choice still wins */
  const b = boot(a.mem, { timeZone: 'Europe/London' });
  const block = crisisBlock(b);
  assert.ok(block.indexOf('In Australia') !== -1, 'the choice did not survive a reload');
  assert.ok(block.indexOf('116 123') === -1, 'the time zone came back and overrode the choice');

  /* and it can be handed back to the time zone */
  b.tap('#where').tap('#unset');
  assert.ok(b.html().indexOf('guessing from your phone’s time zone') !== -1);
  b.tap('#back');
  assert.ok(crisisBlock(b).indexOf('116 123') !== -1, 'unsetting did not go back to guessing');
});

test('the country list is every country, alphabetical, and nothing else varies by country', () => {
  const list = where.list();
  assert.ok(list.length > 200, 'only ' + list.length + ' countries to choose from');
  const names = list.map((c) => c.name);
  assert.deepStrictEqual(names, names.slice().sort(), 'the list is not alphabetical');
  assert.ok(names.indexOf('Kenya') !== -1 && names.indexOf('Nigeria') !== -1);

  /* the picker changes the helpline and not one other thing a person reads */
  const uk = boot(null, { timeZone: 'Europe/London' });
  const ke = boot(null, { timeZone: 'Africa/Nairobi' });
  assert.strictEqual(uk.html(), ke.html(), 'the front screen is different in a different country');
  const strip = (s) => s.slice(s.indexOf('How we work out the country'));
  assert.strictEqual(strip(uk.tap('#m-help').html()), strip(ke.tap('#m-help').html()),
    'something other than the helpline varies by country');
});

/* ------------------------------------------------------------- the data, and its provenance */

test('every helpline carries the page it was read on and the day it was read', () => {
  const today = new Date().toISOString().slice(0, 10);
  const stale = [];
  let lines = 0;

  for (const code of Object.keys(HELPLINES.countries)) {
    const entry = HELPLINES.countries[code];
    assert.ok(/^[A-Z]{2}$/.test(code), code + ' is not a two-letter country code');
    assert.ok(ZONES[code], code + ' is not a country any time zone is in');
    assert.ok(entry.country && entry.country.trim(), code + ' has no name to put in a sentence');
    assert.ok(Array.isArray(entry.lines) && entry.lines.length, code + ' has no lines');

    for (const l of entry.lines) {
      lines++;
      const at = code + ' / ' + l.name;
      assert.ok(l.name && l.name.trim(), at + ' has no name');
      assert.ok(l.number && l.number.trim(), at + ' has no number');

      /* a tel: link is digits and nothing else — national form, because that is where they are */
      assert.ok(/^tel:[0-9]+$/.test(l.tel), at + ' tel is not a plain national number: ' + l.tel);
      assert.strictEqual(l.tel, 'tel:' + l.number.replace(/[^0-9]/g, ''),
        at + ' dials something other than the number printed next to it');

      /* provenance. Without both of these the number is somebody's memory, which is the one
         thing this file is not allowed to be */
      assert.ok(/^https:\/\/[^?#]+$/.test(l.source), at + ' has no plain https source page');
      assert.ok(/^\d{4}-\d{2}-\d{2}$/.test(l.checked), at + ' has no date it was checked');
      assert.ok(l.checked <= today, at + ' was checked in the future: ' + l.checked);

      /* free and allHours are only ever true when the provider's own page said so */
      for (const field of ['free', 'allHours']) {
        assert.ok(l[field] === true || l[field] === null,
          at + ' ' + field + ' must be true or null, never a guess');
      }
      if (before(l.checked, 180)) stale.push(at + ' last checked ' + l.checked);
    }
  }

  assert.ok(lines >= 10, 'only ' + lines + ' helplines: the list has shrunk');

  /*
    Not a failure. A stale number is a release-gate problem for the person who owns the
    re-checking, and failing the build would only teach somebody to delete the check.
  */
  if (stale.length) console.error('\n  HELPLINES NEEDING A RE-CHECK BEFORE RELEASE:\n    ' + stale.join('\n    ') + '\n');
  if (!HELPLINES.owner) console.error('  helplines.js has no owner: nobody is re-checking these numbers.\n');
});

function before(date, days) {
  return (Date.now() - Date.parse(date + 'T00:00:00Z')) > days * 86400000;
}

test('working out where somebody is fetches nothing and stores nothing but their choice', () => {
  const a = boot(null, { timeZone: 'Europe/London' });
  a.tap('#m-help');

  /* nothing about a country is written down until the person picks one themselves */
  const stored = () => Object.keys(a.mem).map((k) => a.mem[k]).join(' ');
  assert.ok(stored().indexOf('Europe/London') === -1, 'the time zone was written to storage');
  assert.ok(stored().indexOf('"GB"') === -1, 'a guessed country was written to storage');

  a.tap('#where').tap('[data-cc="IE"]');
  assert.ok(stored().indexOf('"country":"IE"') !== -1, 'the choice was not kept');

  /* and there is nothing in any of it that could make a request */
  const fs = require('node:fs');
  const path = require('node:path');
  for (const f of ['lib/where.js', 'content/zones.js', 'content/helplines.js']) {
    const src = fs.readFileSync(path.join(__dirname, '..', f), 'utf8');
    for (const bad of ['fetch(', 'XMLHttpRequest', 'geolocation', 'navigator.geo', 'import(']) {
      assert.ok(src.indexOf(bad) === -1, f + ' contains ' + bad);
    }
  }
});
