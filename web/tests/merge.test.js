/*
  B9: whether the record BETR writes can survive being joined to another one.

  Nothing in the app does that yet, and it may never — B10 to B14 are all on the shelf, and
  the low-tech version is two exported files put together by hand. The reason this is tested
  now rather than then is that all three of the things a join needs are free to add to an
  empty file and cost a migration of somebody's real history to add later:

    - every result has an id of its own, so the same result seen twice is one result
    - every result says which word was tapped, so the ladder is the taps replayed and comes
      out the same however the results arrived
    - the order is the clock, not where a result happens to sit in the array

  The hardest thing here is the one that has nothing to do with merging: A PHONE THAT HAS
  BEEN USED SINCE BEFORE THIS CHANGE MUST DRAW EXACTLY THE LADDERS IT DREW YESTERDAY. That is
  what fixtures/v2-phone.json is for, and it is a real v2 file written by the code that
  shipped the day before, not a guess at its shape.
*/
const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const { boot } = require('./harness.js');
const store = require('../lib/store.js');
const worries = require('../content/worries.js');
const allDoors = require('../content/whats-going-on.js');
const firstBehind = () => allDoors.items[0].worries[0];
const rate = require('../lib/rate.js');

const V2 = fs.readFileSync(path.join(__dirname, 'fixtures', 'v2-phone.json'), 'utf8');
const v2 = () => ({ 'betr.v1': V2 });

/* ------------------------------------------------- a phone that was already in use */

/*
  What the old code drew, stated as the old code drew it: one rung per result, in the order
  the results sit in the array, straight off the `level` each one stored at the time. If this
  and series() ever disagree, somebody's history has been redrawn behind their back.
*/
function asItWasDrawn(done) {
  const groups = [];
  const index = {};
  done.forEach((d) => {
    const k = rate.keyOf(d);
    if (!index[k]) groups.push((index[k] = { key: k, rungs: [] }));
    index[k].rungs.push(d.level);
  });
  return groups;
}

test('a real v2 file loads, and every ladder draws exactly what it drew before', () => {
  const raw = JSON.parse(V2);
  assert.strictEqual(raw.v, 2, 'the fixture is not a v2 file any more');
  assert.ok(raw.done.every((d) => !d.rid && !d.move), 'the fixture already has B9 in it');

  const loaded = store.normalise(raw);
  const before = asItWasDrawn(raw.done);
  const after = rate.series(loaded.done);

  /* same beliefs, same rungs, in the same order inside each ladder */
  assert.deepStrictEqual(
    after.map((g) => g.key).sort(),
    before.map((g) => g.key).sort()
  );
  before.forEach((b) => {
    const g = after.filter((x) => x.key === b.key)[0];
    assert.deepStrictEqual(g.rungs, b.rungs, b.key + ' draws a different ladder than it did');
    assert.strictEqual(g.level, b.rungs[b.rungs.length - 1]);
  });

  /* and the actual numbers off that phone, so a reader can see what is being protected */
  const no = after.filter((g) => g.id === 'no')[0];
  assert.deepStrictEqual(no.rungs, [10, 9, 6]);
  assert.strictEqual(no.tests, 3);
});

test('every screen that phone can reach still shows the same rungs', () => {
  const a = boot(v2());
  /* it was left on Your worries, which is where its ladders are */
  a.shows('Your worries').shows('>6<').shows('She said she was glad I asked.');
  a.shows('Nobody said anything at all.');
  /* the one it locked in and never finished is still waiting, and still says so */
  a.shows('Say one thing that annoyed you');
  a.tap('#back').shows('Sure it’ll go badly?');
});

test('normalising the same v2 file twice gives every record the same id', () => {
  const once = store.normalise(JSON.parse(V2));
  const twice = store.normalise(JSON.parse(V2));
  assert.deepStrictEqual(once.done.map((d) => d.rid), twice.done.map((d) => d.rid));
  assert.deepStrictEqual(once.open.map((t) => t.rid), twice.open.map((t) => t.rid));

  /* and they are ids, all different from each other, on the results and on what is waiting */
  const all = once.done.map((d) => d.rid).concat(once.open.map((t) => t.rid));
  assert.ok(all.every((id) => /^[0-9a-f]{16}$/.test(id)), 'a derived id is not an id: ' + all);
  assert.strictEqual(new Set(all).size, all.length, 'two records were given the same id');
});

test('an old record keeps its stored rung, and is not given a word it never tapped', () => {
  const loaded = store.normalise(JSON.parse(V2));
  assert.ok(loaded.done.every((d) => !('move' in d)), 'a tap was invented for an old record');
  assert.deepStrictEqual(loaded.done.map((d) => d.level), JSON.parse(V2).done.map((d) => d.level));
});

/* ------------------------------------------------- the order is the clock */

const done = (when, move, extra) => Object.assign({
  rid: 'r-' + when + '-' + move, id: 'no', source: 'stock', label: 'Saying no',
  belief: 'If I say no, then people will think I’m selfish.', o: 'Nothing much.',
  move: move, level: 0, when: when
}, extra || {});

/* Where the app's own arithmetic would have put each one, so `level` is not a lie. */
function withLevels(list) {
  let at = rate.TOP;
  return rate.inTimeOrder(list).map((d) => Object.assign({}, d, { level: (at = rate.next(at, d.move)) }));
}

test('results shuffled out of clock order draw the same ladder as in order', () => {
  const inOrder = withLevels([
    done('2026-09-01T09:00:00.000Z', 'bit'),
    done('2026-09-02T09:00:00.000Z', 'bit'),
    done('2026-09-03T09:00:00.000Z', 'lot'),
    done('2026-09-04T09:00:00.000Z', 'still')
  ]);
  const shuffled = [inOrder[2], inOrder[0], inOrder[3], inOrder[1]];

  assert.deepStrictEqual(rate.series(inOrder)[0].rungs, [9, 8, 5, 5]);
  assert.deepStrictEqual(rate.series(shuffled)[0].rungs, rate.series(inOrder)[0].rungs);
  assert.deepStrictEqual(
    rate.series(shuffled)[0].results.map((r) => r.when),
    rate.series(inOrder)[0].results.map((r) => r.when)
  );
  assert.strictEqual(rate.levelFor(shuffled, { source: 'stock', id: 'no' }), 5);
});

test('two results in the same millisecond keep the order they were made in', () => {
  const a = done('2026-09-01T09:00:00.000Z', 'bit');
  const b = done('2026-09-01T09:00:00.000Z', 'lot');
  assert.deepStrictEqual(rate.inTimeOrder([a, b]).map((d) => d.move), ['bit', 'lot']);
  assert.deepStrictEqual(rate.inTimeOrder([b, a]).map((d) => d.move), ['lot', 'bit']);
});

/* ------------------------------------------------- two devices, joined */

test('two devices’ histories, joined, are one ladder with every result in it', () => {
  /* one phone: Tuesday and Thursday. The other: Wednesday, and again on Thursday. */
  const phone = withLevels([
    done('2026-09-01T08:00:00.000Z', 'bit'),
    done('2026-09-03T08:00:00.000Z', 'lot')
  ]);
  const laptop = withLevels([
    done('2026-09-02T20:00:00.000Z', 'bit'),
    done('2026-09-03T21:00:00.000Z', 'still')
  ]);

  const joined = store.normalise({ done: phone.concat(laptop) });
  const g = rate.series(joined.done)[0];

  assert.strictEqual(g.tests, 4, 'a result was lost or duplicated in the join');
  assert.deepStrictEqual(g.results.map((r) => r.when), [
    '2026-09-01T08:00:00.000Z', '2026-09-02T20:00:00.000Z',
    '2026-09-03T08:00:00.000Z', '2026-09-03T21:00:00.000Z'
  ]);
  /* 10, a bit less, a bit less, a lot less, still sure — replayed in the order they happened */
  assert.deepStrictEqual(g.rungs, [9, 8, 5, 5]);
  assert.strictEqual(g.level, 5);

  /* neither device on its own would have got there, which is the whole point */
  assert.strictEqual(rate.series(phone)[0].level, 6);
  assert.strictEqual(rate.series(laptop)[0].level, 9);
});

test('both devices tapping on the same day is four results, not two', () => {
  const same = '2026-09-03T12:00:00.000Z';
  const phone = withLevels([done('2026-09-01T08:00:00.000Z', 'bit'), done(same, 'lot', { rid: 'phone-thu' })]);
  const laptop = withLevels([done('2026-09-02T08:00:00.000Z', 'bit'), done(same, 'bit', { rid: 'laptop-thu' })]);

  const g = rate.series(store.normalise({ done: phone.concat(laptop) }).done)[0];
  assert.strictEqual(g.tests, 4);
  assert.deepStrictEqual(g.rungs, [9, 8, 5, 4]);
});

test('the same result seen twice is one result', () => {
  const week = withLevels([
    done('2026-09-01T08:00:00.000Z', 'bit'),
    done('2026-09-02T08:00:00.000Z', 'lot')
  ]);
  const joined = store.normalise({ done: week.concat(week) });
  assert.strictEqual(joined.done.length, 2, 'the same two results came through twice');
  assert.deepStrictEqual(rate.series(joined.done)[0].rungs, [9, 6]);
});

test('two waiting tests with the same id are one waiting test', () => {
  const waiting = {
    rid: 'w-1', source: 'stock', id: 'no', label: 'Saying no',
    test: 'Say no once, with no reason.', locked: '2026-09-01T08:00:00.000Z'
  };
  const joined = store.normalise({ open: [waiting, waiting] });
  assert.strictEqual(joined.open.length, 1);
});

/* ------------------------------------------------- old records and new ones together */

test('a ladder of old records then new ones draws the old ladder, then continues from it', () => {
  const raw = JSON.parse(V2);
  const old = raw.done.filter((d) => d.id === 'no');
  const before = old.map((d) => d.level);
  assert.deepStrictEqual(before, [10, 9, 6]);

  const mixed = store.normalise({
    done: raw.done.concat([done('2026-09-01T08:00:00.000Z', 'bit', { level: 5 })])
  });
  const g = rate.series(mixed.done).filter((x) => x.id === 'no')[0];

  assert.deepStrictEqual(g.rungs, [10, 9, 6, 5], 'the old rungs moved, or the new one did not follow');
  assert.strictEqual(g.level, 5);
});

test('and the app itself continues an old phone’s ladder from where it was', () => {
  const a = boot(v2());
  a.shows('>6<');
  /* the second card with a ladder on it: the first is the worry tested most recently */
  a.tap('[data-again]', 1).shows('Here’s your test');
  a.tap('#lock').tap('#done');
  a.type('#o', 'He shrugged and said no problem.').tap('#next');
  /* the re-rate is offered from 6, where that belief actually sits */
  a.shows('>6<');
  a.tap('[data-key]', 1);
  /* a bit less sure, from 6, is 5 */
  a.shows('>5<');
  a.tap('#m-mine').shows('>10<').shows('>9<').shows('>6<').shows('>5<');
});

/* ------------------------------------------------- what the app writes now */

test('every result the app writes has its own id and the word that was tapped', () => {
  const a = boot();
  a.tap('#go').tap('[data-door]', 0).tap('[data-id]', 0).tap('#lock').tap('#done');
  a.type('#o', 'He said fair enough.').tap('#next').tap('[data-key]', 1);
  a.tap('#again').tap('#lock').tap('#done');
  a.type('#o', 'Nobody minded.').tap('#next').tap('[data-key]', 2);

  const saved = JSON.parse(a.mem['betr.v1']);
  assert.strictEqual(saved.v, 3);
  assert.strictEqual(saved.done.length, 2);
  assert.deepStrictEqual(saved.done.map((d) => d.move), ['bit', 'lot']);
  assert.deepStrictEqual(saved.done.map((d) => d.level), [9, 6]);
  /* the worry's id is shared; the result's id is not */
  assert.deepStrictEqual(saved.done.map((d) => d.id), [firstBehind(), firstBehind()]);
  assert.notStrictEqual(saved.done[0].rid, saved.done[1].rid);
  assert.ok(saved.done.every((d) => typeof d.rid === 'string' && d.rid.length > 15));
});

test('a test locked in and finished later is one thing with one id all the way through', () => {
  const a = boot();
  a.tap('#go').tap('[data-door]', 0).tap('[data-id]', 0).tap('#lock');
  /* leave it waiting and go and start something else, which is what B8 made possible */
  a.tap('#m-new').tap('[data-door]', 0).tap('[data-id]', 2);
  const waiting = JSON.parse(a.mem['betr.v1']).open;
  assert.strictEqual(waiting.length, 1);
  const id = waiting[0].rid;
  assert.ok(typeof id === 'string' && id.length > 15, 'a waiting test has no id');

  a.tap('#m-mine').tap('[data-did]', 0);
  a.type('#o', 'She said that was fine.').tap('#next').tap('[data-key]', 1);
  const saved = JSON.parse(a.mem['betr.v1']);
  assert.strictEqual(saved.done.length, 1);
  assert.strictEqual(saved.done[0].rid, id, 'the result was given a new id instead of keeping its own');
  assert.strictEqual(saved.open.length, 0);
});

test('two waiting tests at once have two different ids', () => {
  const a = boot();
  a.tap('#go').tap('[data-door]', 0).tap('[data-id]', 0).tap('#lock');
  a.tap('#m-new').tap('[data-door]', 0).tap('[data-id]', 2).tap('#lock');
  a.tap('#m-new').tap('[data-door]', 1).tap('[data-id]', 0).tap('#lock');
  a.tap('#m-mine');
  const open = JSON.parse(a.mem['betr.v1']).open;
  assert.strictEqual(open.length, 3);
  assert.strictEqual(new Set(open.map((t) => t.rid)).size, 3);
});

test('testing the same worry again is a new id, not the old result’s', () => {
  const a = boot();
  a.tap('#go').tap('[data-door]', 0).tap('[data-id]', 0).tap('#lock').tap('#done');
  a.type('#o', 'Fine.').tap('#next').tap('[data-key]', 1);
  a.tap('#again');
  const s = JSON.parse(a.mem['betr.v1']);
  assert.notStrictEqual(s.cur.rid, s.done[0].rid);
});

/* ------------------------------------------------- an id is an id */

test('ids do not repeat, in a browser with crypto and in one without', () => {
  const seen = new Set();
  for (let i = 0; i < 2000; i++) seen.add(store.rid());
  assert.strictEqual(seen.size, 2000);
  assert.ok([...seen].every((id) => /^[0-9a-f-]{32,36}$/.test(id)), 'that is not an id');
});

/* ------------------------------------------------- the export can be joined, not just read */

test('an exported file carries the id and the tapped word, so two of them can be joined', () => {
  const a = boot();
  a.tap('#go').tap('[data-door]', 0).tap('[data-id]', 0).tap('#lock').tap('#done');
  a.type('#o', 'He said fair enough.').tap('#next').tap('[data-key]', 1);
  a.tap('#m-help').tap('#export');

  const out = JSON.parse(a.valueOf('#dump'));
  assert.strictEqual(out.version, 3);
  assert.strictEqual(out.results.length, 1);
  const r = out.results[0];
  assert.ok(typeof r.id === 'string' && r.id.length > 15, 'the export has no id on a result');
  assert.strictEqual(r.stillSureKey, 'bit');
  /* and the sentence they tapped is still there, because this file is meant to be readable */
  assert.strictEqual(r.stillSure, 'A bit less sure');
  assert.strictEqual(r.sureOutOfTen, 9);
});

test('a waiting test in an export has an id too', () => {
  const a = boot();
  a.tap('#go').tap('[data-door]', 0).tap('[data-id]', 0).tap('#lock');
  a.tap('#m-help').tap('#export');
  const out = JSON.parse(a.valueOf('#dump'));
  assert.strictEqual(out.waiting.length, 1);
  assert.ok(typeof out.waiting[0].id === 'string' && out.waiting[0].id.length > 15);
});

/* ------------------------------------------------- and none of it is a score */

test('nothing about this adds anything up across two beliefs', () => {
  const src = fs.readFileSync(require.resolve('../lib/store.js'), 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '').toLowerCase();
  for (const banned of ['average', 'total', 'score', 'streak', 'target']) {
    assert.ok(src.indexOf(banned) === -1, 'found "' + banned + '" in store.js');
  }
  /* two beliefs, four results, and two ladders that know nothing about each other */
  const mine = withLevels([done('2026-09-01T08:00:00.000Z', 'lot'), done('2026-09-02T08:00:00.000Z', 'lot')]);
  const other = mine.map((d) => Object.assign({}, d, { id: 'help', rid: d.rid + '-help' }));
  const groups = rate.series(store.normalise({ done: mine.concat(other) }).done);
  assert.strictEqual(groups.length, 2);
  assert.deepStrictEqual(groups.map((g) => g.level), [4, 4]);
  assert.ok(groups.every((g) => !('overall' in g) && !('sum' in g)));
});
