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

const RESULT = {
  id: 'no', source: 'stock', label: 'Saying no without an excuse',
  belief: 'If I say no without an excuse, people will think I am selfish.',
  x: 'They will be annoyed.', test: 'Say no once.', drop: 'Do not explain.',
  o: 'He said fair enough.', level: 3, rateLabel: 'A lot less sure',
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
    'when', 'worry', 'belief', 'expected', 'test', 'leftOut', 'happened', 'stillSure', 'sureOutOfTen'
  ]);
  assert.strictEqual(out.results[0].happened, 'He said fair enough.');
  assert.strictEqual(out.results[0].sureOutOfTen, 3);
});

test('exporting nothing is still valid, readable JSON', () => {
  const out = JSON.parse(store.exportJSON(store.blank()));
  assert.deepStrictEqual(out.results, []);
});
