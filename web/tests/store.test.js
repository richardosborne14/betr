/*
  Persistence. The app has to render correctly with nothing stored, with rubbish stored, and
  in a browser that throws on every storage call — that last one is Safari in private mode,
  and a person using it is exactly the person Betr is for.
*/
const { test } = require('node:test');
const assert = require('node:assert');
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

/*
  A result as the app writes one since B9: `rid` is this result's own id and `id` is the
  worry's, shared by every test of that worry. `move` is the word that was tapped and `level`
  is where that landed — a lot less sure, from the top, is seven.
*/
const RESULT = {
  rid: 'a0d6f1c2-0e40-4a2b-9d1e-6f0b5c7a3311',
  id: 'no', source: 'stock', label: 'Saying no without an excuse',
  belief: 'If I say no without an excuse, people will think I am selfish.',
  x: 'They will be annoyed.', test: 'Say no once.', drop: 'Do not explain.',
  o: 'He said fair enough.', move: 'lot', level: 7, rateLabel: 'A lot less sure',
  when: '2026-09-02T10:00:00.000Z'
};

test('nothing stored gives the start screen, not a crash', () => {
  const s = store.create(stub()).load();
  assert.strictEqual(s.stage, 'start');
  assert.deepStrictEqual(s.done, []);
  assert.strictEqual(s.cur, null);
});

test('a result survives a round trip', () => {
  const st = store.create(stub());
  const s = store.blank();
  s.done.push(RESULT);
  s.stage = 'result';
  assert.strictEqual(st.save(s), true);
  const back = st.load();
  assert.strictEqual(back.stage, 'result');
  assert.deepStrictEqual(back.done, [RESULT]);
});

test('it writes under one versioned key and no other', () => {
  const s = stub();
  const state = store.blank();
  state.done.push(RESULT);
  store.create(s).save(state);
  assert.deepStrictEqual(Object.keys(s.mem), ['betr.v1']);
});

test('a Betr with nothing in it leaves nothing in storage at all', () => {
  const s = stub();
  const st = store.create(s);
  assert.strictEqual(st.save(store.blank()), true);
  assert.deepStrictEqual(Object.keys(s.mem), [], 'an untouched app should store nothing');

  const used = store.blank();
  used.done.push(RESULT);
  st.save(used);
  assert.deepStrictEqual(Object.keys(s.mem), ['betr.v1']);

  /* and wiping it takes the key away again, rather than leaving an empty record */
  st.save(store.blank());
  assert.deepStrictEqual(Object.keys(s.mem), []);
});

test('rubbish in storage is replaced, not repaired halfway', () => {
  for (const junk of ['not json at all', '[]', '"a string"', 'null', '{"done":"nope"}']) {
    const s = store.create(stub({ 'betr.v1': junk })).load();
    assert.strictEqual(s.stage, 'start', junk);
    assert.deepStrictEqual(s.done, [], junk);
  }
});

test('half-written results are dropped, whole ones kept', () => {
  const s = store.create(stub({
    'betr.v1': JSON.stringify({ done: [RESULT, { id: 'no' }, null, 7] })
  })).load();
  assert.deepStrictEqual(s.done, [RESULT]);
});

/*
  Version 1 stored one of 80/55/30/10 in `rate`. Those results are somebody's real week, so
  they come across onto the nearest rung rather than being thrown away or left blank.
*/
test('a result saved before the ladder existed lands on the nearest rung', () => {
  const old = { o: 'She said fine.', rate: 55, rateLabel: 'A bit less sure' };
  const s = store.create(stub({ 'betr.v1': JSON.stringify({ done: [old] }) })).load();
  assert.strictEqual(s.done[0].level, 6);
  assert.strictEqual(s.done[0].o, 'She said fine.');
});

test('a result with no rating at all sits at the top rather than at nothing', () => {
  const s = store.create(stub({ 'betr.v1': JSON.stringify({ done: [{ o: 'Nothing happened.' }] }) })).load();
  assert.strictEqual(s.done[0].level, 10);
});

test('a storage that throws leaves the app in the start state and says so', () => {
  const st = store.create(throwing);
  assert.deepStrictEqual(st.load(), store.blank());
  assert.strictEqual(st.save(store.blank()), false);
  assert.strictEqual(st.clear(), false);
});

test('delete removes the key entirely', () => {
  const s = stub();
  const st = store.create(s);
  const state = store.blank();
  state.done.push(RESULT);
  st.save(state);
  assert.deepStrictEqual(Object.keys(s.mem), ['betr.v1']);
  st.clear();
  assert.deepStrictEqual(Object.keys(s.mem), []);
});

test('the export is readable, stable, and holds every result', () => {
  const s = store.blank();
  s.done.push(RESULT);
  const out = JSON.parse(store.exportJSON(s));
  assert.strictEqual(out.app, 'BETR');
  assert.strictEqual(out.version, store.VERSION);
  assert.strictEqual(out.results.length, 1);
  assert.deepStrictEqual(Object.keys(out.results[0]), [
    'id', 'when', 'worry', 'belief', 'expected', 'test', 'leftOut',
    'happened', 'stillSure', 'stillSureKey', 'sureOutOfTen'
  ]);
  assert.strictEqual(out.results[0].happened, 'He said fair enough.');
  assert.strictEqual(out.results[0].sureOutOfTen, 7);
});

/*
  B40's three, and the two halves of what they have to do in a file somebody opens.

  A free-text result has none of them, and its entry has to look EXACTLY as it looked before
  today — which the key list above is what proves. A templated one carries all three, counted
  the way a person counts: the second of three predictions is 2, not 1. Nobody outside a
  program counts from nought, and this file is meant to be read.
*/
test('a templated result exports which one it was, what was typed in, and how big', () => {
  const s = store.blank();
  s.done.push(Object.assign({}, RESULT, {
    prediction: 1, slots: { person: 'my sister' }, size: 'A small go'
  }));
  s.open.push({
    rid: 'w1', locked: '2026-09-09T09:00:00.000Z', label: 'Saying no', belief: 'If I say no…',
    test: 'Say no once.', prediction: 2, slots: { person: 'my boss' }, size: 'The whole thing'
  });
  const out = JSON.parse(store.exportJSON(s));
  assert.strictEqual(out.results[0].prediction, 2);
  assert.deepStrictEqual(out.results[0].filledIn, { person: 'my sister' });
  assert.strictEqual(out.results[0].size, 'A small go');
  assert.strictEqual(out.waiting[0].prediction, 3);
  assert.deepStrictEqual(out.waiting[0].filledIn, { person: 'my boss' });
  assert.strictEqual(out.waiting[0].size, 'The whole thing');
});

/*
  And the other half: an empty set of holes is not a set of holes. A record whose `slots` is an
  empty object — which every free-text test has carried since B40 — must not put an empty one
  into the file, or every export gains a line that means nothing.
*/
test('a test with nothing typed into it exports no holes at all', () => {
  const s = store.blank();
  s.done.push(Object.assign({}, RESULT, { prediction: null, slots: {}, size: null }));
  const out = JSON.parse(store.exportJSON(s));
  assert.ok(!('filledIn' in out.results[0]), 'an empty set of holes reached the file');
  assert.ok(!('prediction' in out.results[0]));
  assert.ok(!('size' in out.results[0]));
});

test('exporting nothing is still valid, readable JSON', () => {
  const out = JSON.parse(store.exportJSON(store.blank()));
  assert.deepStrictEqual(out.results, []);
});

/*
  B53's one new field: a list of ladder keys, and nothing else in the record moves.

  It carries no version bump, for the same reason `open` never needed one — a state written
  before today simply has no `archived`, and normalise hands back an empty list. An older BETR
  handed a newer file ignores the field and draws the list it always drew.
*/
test('archived is a list of keys, and anything else in it is dropped', () => {
  assert.deepStrictEqual(store.blank().archived, []);
  /* the state everybody's phone is holding today */
  assert.deepStrictEqual(store.normalise({ done: [] }).archived, []);
  assert.deepStrictEqual(store.normalise({ archived: 'stock:no' }).archived, []);
  assert.deepStrictEqual(
    store.normalise({ archived: ['stock:no', 'stock:no', '', 7, null, { k: 1 }, 'own:a1'] }).archived,
    ['stock:no', 'own:a1'], 'a duplicate, a blank or a non-string reached the list');
});

/*
  A phone holding nothing but an archive is not empty, and forgetting that is the exact bug
  B17 shipped with `country` and B31 shipped with `seen`: save() removes the key for an empty
  state, so a field isEmpty() does not know about is written and thrown away on the next save.
*/
test('a state with something archived is not an empty state', () => {
  const s = store.blank();
  s.archived.push('stock:no');
  assert.strictEqual(store.isEmpty(s), false);
  assert.strictEqual(store.isEmpty(store.blank()), true);
});
