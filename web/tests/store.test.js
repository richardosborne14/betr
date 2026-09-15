/*
  Persistence. The app has to render correctly with nothing stored, with rubbish stored, and
  in a browser that throws on every storage call — that last one is Safari in private mode,
  and a person using it is exactly the person BETR is for.

  B56 added the second half of this file: the one-time carry-over from the old app. Every phone
  that used BETR before 2026-09-15 has its history under `betr.v1`, in a shape the new app does
  not draw, and NONE OF WHAT A PERSON WROTE MAY BE LOST TO THE REDESIGN. Two real phones are the
  evidence, both written by the old app's own code rather than guessed at:

    fixtures/v2-phone.json   from before results had ids or tapped words (B9)
    fixtures/v5-phone.json   the last shape the old app wrote — see make-v5-phone.js
*/
const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const store = require('../lib/store.js');

function stub(seed) {
  const mem = Object.assign({}, seed);
  return {
    mem,
    getItem: (k) => (k in mem ? mem[k] : null),
    setItem: (k, v) => { mem[k] = String(v); },
    removeItem: (k) => { delete mem[k]; }
  };
}

const throwing = {
  getItem() { throw new Error('denied'); },
  setItem() { throw new Error('denied'); },
  removeItem() { throw new Error('denied'); }
};

const PREDICTION = {
  id: 'a0d6f1c2-0e40-4a2b-9d1e-6f0b5c7a3311',
  sentence: 'If I tell my best friend how I’ve really been, then it’ll bring us closer.',
  made: '2026-09-12',
  locked: null,
  away: false,
  results: [
    { tag: 'yeah', text: 'Told her on the walk home.', day: '2026-09-12' },
    { tag: 'not', text: 'Tried on the phone. Bad line.', day: '2026-09-14' }
  ]
};
const withOne = (extra) => Object.assign(store.blank(), { predictions: [Object.assign({}, PREDICTION, extra)] });

/* ------------------------------------------------------------------ the new record */

test('nothing stored gives the front screen, not a crash', () => {
  const s = store.create(stub()).load();
  assert.strictEqual(s.stage, 'front');
  assert.deepStrictEqual(s.predictions, []);
  assert.strictEqual(s.v, store.VERSION);
});

test('a prediction and its results survive a round trip', () => {
  const box = stub();
  const st = store.create(box);
  assert.strictEqual(st.save(withOne()), true);
  const back = st.load();
  assert.deepStrictEqual(back.predictions, [PREDICTION]);
});

test('it writes under one versioned key and no other', () => {
  const box = stub();
  store.create(box).save(withOne());
  assert.deepStrictEqual(Object.keys(box.mem), ['betr.v2']);
  assert.strictEqual(store.KEY, 'betr.v2');
});

test('a BETR with nothing in it leaves nothing in storage at all', () => {
  const box = stub({ 'betr.v2': JSON.stringify(withOne()), 'betr.v1': '{"done":[]}' });
  store.create(box).save(store.blank());
  assert.deepStrictEqual(Object.keys(box.mem), [], 'an empty BETR left something behind');
  assert.strictEqual(store.isEmpty(store.blank()), true);
  assert.strictEqual(store.isEmpty(withOne()), false);
  /* a country they chose is something they would miss */
  assert.strictEqual(store.isEmpty(Object.assign(store.blank(), { country: 'GB' })), false);
});

test('rubbish in storage is replaced, not repaired halfway', () => {
  for (const junk of ['{not json', '[1,2,3]', '"a string"', 'null']) {
    const s = store.create(stub({ 'betr.v2': junk })).load();
    assert.deepStrictEqual(s, store.blank(), junk + ' was not replaced with a blank BETR');
  }
  /* rubbish under the NEW key is never "rescued" from the old one */
  const s = store.create(stub({ 'betr.v2': '{nope', 'betr.v1': fs.readFileSync(path.join(__dirname, 'fixtures', 'v2-phone.json'), 'utf8') })).load();
  assert.deepStrictEqual(s.predictions, []);
});

test('half-written predictions and results are dropped, whole ones kept', () => {
  const s = store.normalise({
    predictions: [
      PREDICTION,
      Object.assign({}, PREDICTION),                                      /* the same one twice */
      { id: 'no-sentence', results: [] },
      { sentence: 'If I have no id, then I am dropped.' },
      {
        id: 'b', sentence: 'If I rest, then I will feel guilty.', made: 'yesterday', locked: 'today', away: 'yes',
        results: [
          { tag: 'yeah', text: '   ', day: '2026-09-13' },               /* no words: dropped */
          { tag: 'maybe', text: 'I did not.', day: '13/09/2026' },       /* kept, with no tag and no day */
          'not a result'
        ]
      }
    ]
  });
  assert.deepStrictEqual(s.predictions.map((p) => p.id), [PREDICTION.id, 'b']);
  const b = s.predictions[1];
  assert.strictEqual(b.made, null);
  assert.strictEqual(b.locked, null);
  assert.strictEqual(b.away, false);
  assert.deepStrictEqual(b.results, [{ tag: null, text: 'I did not.', day: null }]);
});

test('a storage that throws leaves the app on the front screen, and says it did not save', () => {
  const st = store.create(throwing);
  assert.deepStrictEqual(st.load(), store.blank());
  assert.strictEqual(st.save(withOne()), false);
  assert.strictEqual(st.clear(), false);
});

test('delete removes both keys entirely', () => {
  const box = stub({ 'betr.v2': JSON.stringify(withOne()), 'betr.v1': '{"done":[]}' });
  assert.strictEqual(store.create(box).clear(), true);
  assert.deepStrictEqual(Object.keys(box.mem), []);
});

test('the export is readable, holds a prediction that is put away, and adds nothing up', () => {
  const dump = JSON.parse(store.exportJSON(withOne({ away: true, locked: '2026-09-15' }), 'A note.'));
  assert.strictEqual(dump.app, 'BETR');
  assert.strictEqual(dump.version, store.VERSION);
  assert.strictEqual(dump.note, 'A note.');
  assert.strictEqual(dump.predictions.length, 1);
  const p = dump.predictions[0];
  assert.strictEqual(p.prediction, PREDICTION.sentence);
  assert.strictEqual(p.putAway, true, 'a prediction that is put away is missing from the export');
  assert.strictEqual(p.lockedIn, '2026-09-15');
  /* oldest first, the order they happened in, each in the person's own words */
  assert.deepStrictEqual(p.results.map((r) => [r.day, r.howItWent, r.happened]), [
    ['2026-09-12', 'yeah', 'Told her on the walk home.'],
    ['2026-09-14', 'not', 'Tried on the phone. Bad line.']
  ]);
  for (const never of ['total', 'count', 'score', 'streak', 'level']) {
    assert.ok(!(never in dump) && !(never in p), 'the export carries a "' + never + '"');
  }
});

test('exporting nothing is still valid, readable JSON', () => {
  const dump = JSON.parse(store.exportJSON(store.blank()));
  assert.deepStrictEqual(dump.predictions, []);
  assert.strictEqual(dump.country, null);
});

test('a day is the local date and never a clock time', () => {
  assert.match(store.today(), /^\d{4}-\d{2}-\d{2}$/);
  assert.strictEqual(store.dayOf(new Date(2026, 8, 5, 23, 59)), '2026-09-05');
  assert.strictEqual(store.dayOf('not a date'), null);
});

/* ------------------------------------------------------------------ the old phones */

const PHONES = {
  v2: fs.readFileSync(path.join(__dirname, 'fixtures', 'v2-phone.json'), 'utf8'),
  v5: fs.readFileSync(path.join(__dirname, 'fixtures', 'v5-phone.json'), 'utf8')
};
const carried = (raw) => store.create(stub({ 'betr.v1': raw })).load();
const oneLine = (s) => String(s).replace(/\s+/g, ' ').trim();

test('a real phone from the old app keeps every word anybody wrote', () => {
  for (const name of Object.keys(PHONES)) {
    const old = JSON.parse(PHONES[name]);
    const s = carried(PHONES[name]);

    const wrote = old.done.filter((d) => d.o && d.o.trim()).map((d) => d.o).sort();
    assert.ok(wrote.length >= 3, name + ' has too few results to prove anything');
    const kept = [].concat(...s.predictions.map((p) => p.results.map((r) => r.text))).sort();
    assert.deepStrictEqual(kept, wrote, name + ': what happened did not come across word for word');

    /* one prediction per sentence tested, and every one of them */
    const sentences = [...new Set(old.done.concat(old.open || []).map((d) => oneLine(d.belief)))].sort();
    assert.deepStrictEqual(s.predictions.map((p) => p.sentence).sort(), sentences, name);

    /* what they expected, did and left out rides along, so the export still has it */
    const withPlans = old.done.filter((d) => d.x).length;
    const keptPlans = [].concat(...s.predictions.map((p) => p.results)).filter((r) => r.was && r.was.expected).length;
    assert.strictEqual(keptPlans, withPlans, name + ': an expectation was lost');
  }
});

/*
  B56 §5 proposed reading a tag off the old re-rate, and marked it as a guess. It is the wrong
  way round for "Did it go how you expected?", and the re-rate was never about what happened
  anyway — see fromOld() in lib/store.js. So an old result carries no tag, and keeps the word
  that was tapped in case the founder decides otherwise.
*/
test('an old result is not given an answer to a question nobody asked it', () => {
  for (const name of Object.keys(PHONES)) {
    const old = JSON.parse(PHONES[name]);
    const results = [].concat(...carried(PHONES[name]).predictions.map((p) => p.results));
    for (const r of results) assert.strictEqual(r.tag, null, name + ': an old result was given a tag');
    const moves = old.done.filter((d) => d.move).map((d) => d.move).sort();
    assert.deepStrictEqual(results.filter((r) => r.was && r.was.move).map((r) => r.was.move).sort(), moves,
      name + ': the tapped word was not kept');
  }
  /* the v5 phone has all three of the words that matter, so the test above is not vacuous */
  const moves = JSON.parse(PHONES.v5).done.map((d) => d.move);
  for (const m of ['lot', 'still', 'more']) assert.ok(moves.indexOf(m) !== -1, 'the v5 phone has no ' + m);
});

test('a test that was waiting comes across locked in, and one that was put away comes across put away', () => {
  const old = JSON.parse(PHONES.v5);
  assert.ok(old.open.length >= 1 && old.archived.length >= 1, 'the fixture has nothing waiting or nothing put away');
  const s = carried(PHONES.v5);
  const find = (belief) => s.predictions.find((p) => p.sentence === oneLine(belief));

  for (const w of old.open) {
    const p = find(w.belief);
    assert.ok(p && p.locked, 'a waiting test did not come across locked in: ' + w.belief);
    assert.deepStrictEqual(p.results, []);
  }
  const keyOf = (d) => (d.source === 'own' ? 'own:' + (d.id || d.belief || '') : 'stock:' + (d.id || d.label || ''));
  for (const d of old.done.concat(old.open)) {
    assert.strictEqual(find(d.belief).away, old.archived.indexOf(keyOf(d)) !== -1,
      'put away did not come across for: ' + d.belief);
  }
  /* and results are oldest first within each prediction */
  for (const p of s.predictions) {
    const days = p.results.map((r) => r.day);
    assert.deepStrictEqual(days, days.slice().sort(), 'results out of order in: ' + p.sentence);
    assert.ok(p.made, 'a carried-over prediction has no day it was made');
  }
});

test('carrying the same phone across twice gives the same ids', () => {
  for (const name of Object.keys(PHONES)) {
    assert.deepStrictEqual(carried(PHONES[name]).predictions.map((p) => p.id),
      carried(PHONES[name]).predictions.map((p) => p.id), name);
  }
});

test('the old key goes only once the new one is safely written', () => {
  const box = stub({ 'betr.v1': PHONES.v5 });
  const st = store.create(box);
  const s = st.load();
  assert.ok('betr.v1' in box.mem, 'loading alone threw the old record away');
  assert.strictEqual(st.save(s), true);
  assert.deepStrictEqual(Object.keys(box.mem), ['betr.v2']);
  assert.deepStrictEqual(st.load().predictions, s.predictions, 'the saved copy is not what was carried across');

  /* a write that fails leaves the old record where it was, to be carried across next time */
  const full = stub({ 'betr.v1': PHONES.v5 });
  full.setItem = () => { throw new Error('quota'); };
  const st2 = store.create(full);
  assert.strictEqual(st2.save(st2.load()), false);
  assert.ok('betr.v1' in full.mem, 'a failed write lost the old record');
});

test('the old app’s draft, example counter and screen do not come across', () => {
  const old = JSON.parse(PHONES.v2);
  old.stage = 'result';
  old.cur = { belief: 'If I half-write something, then it will not matter.' };
  old.seen = 7;
  const s = carried(JSON.stringify(old));
  assert.strictEqual(s.stage, 'front');
  assert.ok(!('cur' in s) && !('seen' in s) && !('done' in s) && !('open' in s));
  assert.ok(!s.predictions.some((p) => p.sentence === old.cur.belief), 'a draft became a prediction');
  assert.strictEqual(s.country, old.country, 'the country they chose was lost');
});
