/*
  How v2-phone.json was made, kept so it can be made again.

  It is a genuine v2 file, written by the code that shipped before B9 — not a hand-typed
  guess at its shape. That matters: the thing the fixture has to prove is that a real phone's
  history draws the same ladders after the change as it drew before, and a fixture typed out
  by hand only proves it about what we remembered to type.

  The clock is pinned, so the same walk gives the same file every time. To remake it:

    mkdir /tmp/old && git archive f9e8421 web | tar -x -C /tmp/old
    node web/tests/fixtures/make-v2-phone.js /tmp/old > web/tests/fixtures/v2-phone.json

  f9e8421 is the last commit before B9. Nothing runs this on its own — node --test only picks
  up *.test.js — and nothing in the app or the tests reads it.
*/
const path = require('node:path');
const fs = require('node:fs');
const OLD = process.argv[2];
const Real = Date;
let tick = Real.parse('2026-08-24T18:12:04.000Z');
class Fixed extends Real {
  constructor(...a) { if (!a.length) { super(tick); tick += 3 * 3600 * 1000; } else super(...a); }
  static now() { const n = tick; tick += 3 * 3600 * 1000; return n; }
}
global.Date = Fixed;
const { boot } = require(path.join(OLD, 'web/tests/harness.js'));
global.Date = Real;

const finish = (a, said, key) => {
  global.Date = Fixed;
  a.tap('#lock').tap('#done');
  a.type('#o', said).tap('#next').tap('[data-key]', key);
  global.Date = Real;
};

global.Date = Fixed;
const a = boot();
global.Date = Real;

/* Worry 0, tested three times: still sure, a bit less, a lot less. */
a.tap('#go').tap('[data-id]', 0);
finish(a, 'He said fair enough and got his own coffee.', 0);
a.tap('#again');
finish(a, 'Nobody said anything at all.\n\nI kept waiting for it.', 1);
a.tap('#again');
finish(a, 'She said she was glad I asked.', 2);

/* A second worry, tested once. */
a.tap('#m-new').tap('[data-id]', 3);
finish(a, 'They just nodded.', 1);

/* And one locked in and left waiting. */
a.tap('#m-new').tap('[data-id]', 5);
global.Date = Fixed;
a.tap('#lock');
a.tap('#m-mine');
global.Date = Real;

const raw = JSON.parse(a.mem['betr.v1']);
raw.country = 'GB';
console.log(JSON.stringify(raw, null, 2));
