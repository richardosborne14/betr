/*
  How fixtures/v5-phone.json was made (B56, 2026-09-15), kept so nobody has to take the file on
  trust. It is the last record the OLD app ever wrote — `betr.v1`, record version 5 — produced
  by the old app's own code driven through the old harness, not typed out by hand as a guess at
  its shape. B56 §5 asks for exactly that: "a fixture of a real v4 record".

  It cannot run against this tree any more, because the old app is gone from it. To make it
  again, check out the commit before the redesign beside this one and point OLD at it:

    git worktree add /tmp/betr-old 141de4f
    OLD=/tmp/betr-old node web/tests/fixtures/make-v5-phone.js

  What it does, in order, so the file has one of everything the migration has to carry:
    - borrows a stock worry, tests it, re-rates "A lot less sure"
    - tests the same worry again and re-rates "Still sure", with two paragraphs of words
    - borrows a second worry, tests it, re-rates "More sure than before", then puts it away
    - writes a test of its own and leaves it locked in and waiting
*/
const fs = require('node:fs');
const path = require('node:path');
const OLD = process.env.OLD;
if (!OLD) throw new Error('set OLD to a checkout of the commit before the redesign');
const { boot } = require(path.join(OLD, 'web/tests/harness.js'));

const a = boot(null, { timeZone: 'Europe/London' });
const nothanks = () => { if (a.html().indexOf('id="nothanks"') !== -1) a.tap('#nothanks'); };

a.tap('#pick').tap('[data-door]', 0).tap('[data-id]', 0).tap('[data-b]', 0).tap('#next').tap('[data-size]', 0).tap('#lock');
nothanks();
a.tap('#done').type('#o', 'He said fair enough and got his own coffee.').tap('#next').tap('[data-key="lot"]');

a.tap('#again').tap('#lock');
nothanks();
a.tap('#done').type('#o', 'She sighed.\n\nThen she said it was fine, and it was.').tap('#next').tap('[data-key="still"]');

a.tap('#m-new').tap('#back').tap('#pick').tap('[data-door]', 1).tap('[data-id]', 0).tap('[data-b]', 1)
  .tap('#next').tap('[data-size]', 1).tap('#lock');
nothanks();
a.tap('#done').type('#o', 'Nobody noticed at all.').tap('#next').tap('[data-key="more"]');

a.tap('#m-new').type('#if', 'ask my brother to help me move').type('#then', 'he’ll say he’s busy')
  .tap('#next').type('#do', 'Text him and ask, in one line.').tap('#lock');
nothanks();

a.tap('#m-mine');
const keys = [...a.html().matchAll(/data-away="([^"]+)"/g)].map((m) => m[1]).filter((k) => k.indexOf('stock:') === 0);
const record = JSON.parse(a.mem['betr.v1']);
const second = 'stock:' + record.done[record.done.length - 1].id;
if (keys.indexOf(second) === -1) throw new Error('no card to put away for ' + second + ' in ' + keys);
a.tap('[data-away="' + second + '"]');

const out = path.join(__dirname, 'v5-phone.json');
fs.writeFileSync(out, JSON.stringify(JSON.parse(a.mem['betr.v1']), null, 2) + '\n');
process.stdout.write('wrote ' + out + '\n');
