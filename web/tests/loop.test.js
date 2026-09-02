/*
  The loop itself, walked end to end.

  Betr has no framework and no test browser, so this file carries about eighty lines of the
  smallest possible fake DOM: enough to hold an innerHTML string, find the elements the app
  wires handlers to, and click them. It is not a browser and does not pretend to be one — it
  cannot see layout, CSS, or anything a person would look at. What it can do is catch a
  crashing screen, a dead button and a broken guard, which is worth having between phone walks.

  The real walk is docs/journeys.md, on a phone, and this does not replace it.
*/
const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const WEB = path.join(__dirname, '..');
const FILES = ['lib/guards.js', 'lib/rate.js', 'lib/store.js', 'lib/content.js',
               'content/worries.js', 'content/whats-going-on.js', 'app.js'];

/* ------------------------------------------------------- the smallest possible DOM */

function makeEl() {
  return {
    _html: '', _attrs: null, value: '', textContent: '', onclick: null, children: {},
    get innerHTML() { return this._html; },
    set innerHTML(h) { this._html = h; this.children = parse(h); },
    focus() {}, select() {}, setSelectionRange() {},
    getAttribute(n) { return this._attrs ? this._attrs[n] : null; },
    querySelector(sel) { return find(this, sel); },
    querySelectorAll(sel) { return findAll(this, sel); }
  };
}

/* The app only ever reaches for elements by id or by a data- attribute, so that is all we index. */
function parse(html) {
  const kids = {};
  for (const m of html.matchAll(/id="([^"]+)"/g)) kids['#' + m[1]] = makeEl();
  for (const m of html.matchAll(/data-([a-z]+)="([^"]+)"/g)) {
    const el = makeEl();
    el._attrs = { ['data-' + m[1]]: m[2] };
    const key = '[data-' + m[1] + ']';
    (kids[key] = kids[key] || []).push(el);
  }
  return kids;
}

function findAll(el, sel) {
  let out = [];
  const direct = el.children[sel];
  if (direct) out = out.concat(direct);
  for (const key of Object.keys(el.children)) {
    const kids = Array.isArray(el.children[key]) ? el.children[key] : [el.children[key]];
    for (const kid of kids) if (kid && kid.children) out = out.concat(findAll(kid, sel));
  }
  return out;
}
function find(el, sel) { return findAll(el, sel)[0] || null; }

/* ------------------------------------------------------- a running copy of the app */

function boot(seed) {
  const root = makeEl();
  const mem = seed ? Object.assign({}, seed) : {};
  const box = {
    localStorage: {
      getItem: (k) => (k in mem ? mem[k] : null),
      setItem: (k, v) => { mem[k] = String(v); },
      removeItem: (k) => { delete mem[k]; }
    },
    navigator: { storage: { persist() {} } },
    document: {
      getElementById: () => root,
      querySelector: (s) => (s.indexOf('betr-build') !== -1 ? { getAttribute: () => 'dev' } : null)
    },
    Date, JSON, Math, String, Array, Object, RegExp, Error
  };
  box.self = box;
  box.window = box;
  box.window.scrollTo = () => {};
  box.window.addEventListener = () => {};
  box.window.matchMedia = () => ({ matches: false });
  vm.createContext(box);
  for (const f of FILES) {
    vm.runInContext(fs.readFileSync(path.join(WEB, f), 'utf8'), box, { filename: f });
  }

  const api = {
    mem,
    /* Everything currently on screen, including anything written into a child element. */
    html() {
      let h = root._html;
      for (const key of Object.keys(root.children)) {
        const kids = Array.isArray(root.children[key]) ? root.children[key] : [root.children[key]];
        for (const kid of kids) if (kid && kid._html) h += kid._html;
      }
      return h;
    },
    tap(sel, i) {
      const els = findAll(root, sel);
      const el = els[i || 0];
      assert.ok(el, 'no such control: ' + sel + '\non: ' + api.html().slice(0, 200));
      assert.ok(el.onclick, 'dead control: ' + sel + '\non: ' + api.html().slice(0, 200));
      el.onclick();
      return api;
    },
    type(sel, text) { find(root, sel).value = text; return api; },
    /* Read a box back. The export lands in a textarea's value, not in the markup. */
    valueOf(sel) { const el = find(root, sel); assert.ok(el, 'no such box: ' + sel); return el.value; },
    shows(s) { assert.ok(api.html().indexOf(s) !== -1, 'not on screen: ' + s + '\non: ' + api.html().slice(0, 300)); return api; },
    hides(s) { assert.ok(api.html().indexOf(s) === -1, 'still on screen: ' + s); return api; }
  };
  return api;
}

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

test('"what this is" carries the sentences, the crisis lines and the lineage', () => {
  const a = boot();
  a.tap('#about');
  a.shows('Turn on airplane mode');
  a.shows('not a medical device');
  a.shows('It does not diagnose, treat, cure or prevent any condition');
  a.shows('116 123').shows('988').shows('findahelpline.com');
  a.shows('made by the people behind TrybeUP');
  a.shows('dev build — not published');
});

test('none of the phrases that are never used appears anywhere in the app', () => {
  const a = boot();
  const screens = ['#about'];
  a.tap('#about');
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
  seen += b.tap('#mine').html();
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
  a.tap('#about').tap('#export');
  const dump = JSON.parse(a.valueOf('#dump'));
  assert.strictEqual(dump.app, 'Betr');
  assert.strictEqual(dump.results.length, 1);
  assert.strictEqual(dump.results[0].happened, 'He said fair enough.');
  assert.strictEqual(dump.results[0].worry, 'Saying no without an excuse');
  a.tap('#wipe').shows('There is no copy anywhere else');
  a.tap('#yes').shows('Sure it’ll go badly?');
  a.hides('He said fair enough');
  a.tap('#about');
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
  a.hides('not quite? change it');
  a.tap('#nothanks').tap('#done').type('#o', 'She said yes.').tap('#next').tap('[data-key]', 1);
  a.hides('not quite? change it');
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
  a.tap('#mine').shows('Your worries').shows('3 tests across 1 worry');
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

  a.tap('#mine').shows('2 tests across 2 worries');
  a.shows('Asking for help').shows('Saying no without an excuse');

  /* the older one is the second card, and going again keeps its rung rather than starting over */
  a.tap('[data-again]', 1).shows('No, I can’t this time');
  a.tap('#lock').tap('#done').type('#o', 'Nothing happened.').tap('#next');
  a.shows('Last time').shows('>7<');
  a.tap('[data-key]', 1).shows('>6<');
});

test('your worries is reachable from the front screen, and only once there is one', () => {
  const a = boot();
  a.hides('your worries');
  loop(a, 0, 'He said fair enough.', 1);
  a.tap('#home').shows('your worries');
  a.tap('#hist').shows('Your worries');
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
  a.tap('#hist').shows('Your worries').shows('>6<').shows('He said fair enough.');
});
