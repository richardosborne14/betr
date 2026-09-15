/*
  Every word BETR can put in front of a person, in one document the founder can read and
  mark up. Run it from the repo root:

      node tools/copy-sheet.js

  It rewrites docs/COPY.md from the source files and nothing else. It is a reader, never a
  writer: editing COPY.md changes nothing in the app. The point of generating it rather than
  keeping a hand-written copy deck is that a hand-written one is wrong within a week.

  Where a word actually lives, since the redesign (B56, 2026-09-15):
    web/content/strings-en.js      every sentence of the interface
    web/content/places.js          every link on the Help screen

  The stock list, the doors, the examples and "Why this one sticks" went with the old app, and
  so did their sections here.

  Some of it cannot be changed by anybody in this repo: the purpose statement and the nine
  sentences are verbatim from docs/research/10-cbt-gateway-approach.md §10 (CLAUDE.md rule 7).
  They are printed first, and marked, so nobody spends an afternoon rewording one.
*/
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const strings = require(path.join(ROOT, 'web/content/strings-en.js')).s;
const places = require(path.join(ROOT, 'web/content/places.js'));

/*
  The order a person meets the screens, with the name the founder would use for each. Any key
  in strings-en.js that is not named here still gets printed, at the bottom, under "Not yet
  grouped" — so a new screen can never quietly go missing from this document.
*/
const SCREENS = [
  ['brand', 'The wordmark', 'BETR, all caps, everywhere a person reads it (rule 7).'],
  ['foot', 'The three grey words at the foot of every screen',
    'Plain words, no icons, no counts, never a fourth. `label` is what a screen reader calls ' +
    'the row; it is never shown.'],
  ['front', 'Screen 1 — the front: What do you think will happen?',
    'The first thing anybody sees, and also where New prediction goes. The sentence a person ' +
    'locks in is built from four of these pieces — `ifWords`, the first blank, `thenWords`, the ' +
    'second blank, and `stop` — so changing them changes how every new prediction reads. ' +
    '`noteLocked` replaces `note` once both blanks have words in them.'],
  ['on', 'Screen 3 — locked in: Go and find out.',
    'The prediction sits above these words. `kicker` is shown in capitals. Not today records ' +
    'nothing and says nothing about missing it (rule 5).'],
  ['go', 'Screen 4 — Did it go how you expected?',
    'The three answers. They also label every result afterwards, in capitals, on the results ' +
    'and on Your predictions — change one here and the label changes everywhere.'],
  ['happened', 'Screen 5 — What happened?',
    'One box, and it cannot be skipped. `empty` is read out, not shown, if Keep it is tapped ' +
    'with nothing written.'],
  ['log', 'Screen 6 — your results',
    'The prediction, then every result in the person’s own words, newest first. No number ' +
    'anywhere. `list` is what a screen reader calls the list.'],
  ['mine', 'Screen 7 — Your predictions',
    'One card per prediction. `locked` is the label on one waiting to be done, in capitals. ' +
    'Export and Delete on this screen use the words under “Export and delete” below.'],
  ['why', 'Screen 8 — How it works', 'Reached from the foot. Fresh wording (rule 8).'],
  ['refusal', 'When BETR says no',
    'On the front screen only `harm` is ever shown, with the crisis block under it; the two ' +
    '`empty…` lines are read out rather than shown. The rest can still be returned by the ' +
    'safety check but nothing in the app draws them.'],
  ['nudge', 'A line nothing draws', 'Kept because the safety check can still return it.'],
  ['install', 'Add to home screen',
    'A small card on Your predictions, once there is something there to lose.'],
  ['crisis', 'The crisis block',
    'At the top of Help and under a refusal about self-harm. No phone number is ever written ' +
    'here — numbers live in helplines.js with the page and the day somebody read them.'],
  ['where', 'Where are you?', 'Changes which helpline number shows, and nothing else.'],
  ['help', 'Help', 'Unchanged in substance by the redesign. *Who made this* is rewritten by B57.'],
  ['io', 'Export and delete', 'On Your predictions and on Help.'],
  ['a11y', 'Said out loud, never shown',
    'What a screen reader reads where the screen alone would not say it.'],
  ['back', 'The back button', 'On Help and on Where are you?']
];

const out = [];
function w(line) { out.push(line === undefined ? '' : line); }

/* A value is a sentence, a list of sentences, or a plural form. Print all three the same way. */
function value(v, indent) {
  const pad = indent || '';
  if (typeof v === 'string') return [pad + '> ' + v.replace(/\n/g, ' ')];
  if (Array.isArray(v)) {
    const lines = [];
    v.forEach((item, i) => {
      /* A list entry can be a row of named fields rather than a bare sentence. */
      const said = (item && typeof item === 'object')
        ? Object.keys(item).map((k) => item[k]).join(' — ')
        : item;
      lines.push(pad + '> **' + (i + 1) + '.** ' + said);
      if (i < v.length - 1) lines.push(pad + '>');
    });
    return lines;
  }
  return [];
}

function isLeaf(v) { return typeof v === 'string' || Array.isArray(v); }

function block(obj, prefix) {
  Object.keys(obj).forEach((k) => {
    const v = obj[k];
    const key = prefix ? prefix + '.' + k : k;
    if (isLeaf(v)) {
      w('**`' + key + '`**');
      w();
      value(v, '').forEach(w);
      w();
    } else if (v && typeof v === 'object') {
      /* A plural: one/two/few/other. Printed as one entry, because it is one sentence. */
      const plural = Object.keys(v).every((f) => ['one', 'two', 'few', 'many', 'other', 'zero'].indexOf(f) !== -1);
      if (plural) {
        w('**`' + key + '`** — one sentence with a number in it. `{n}` is filled in by the app.');
        w();
        Object.keys(v).forEach((f) => w('> *' + f + ':* ' + v[f]));
        w();
      } else {
        block(v, key);
      }
    }
  });
}

/* How many separate pieces of wording there are, so the document can say so. */
function countLeaves(node) {
  if (isLeaf(node)) return 1;
  if (node && typeof node === 'object') return Object.keys(node).reduce((n, k) => n + countLeaves(node[k]), 0);
  return 0;
}

/* ---------------------------------------------------------------- the document */

const stamp = new Date().toISOString().slice(0, 10);
const pieces = Object.keys(strings).filter((k) => k !== 'frozen').reduce((n, k) => n + countLeaves(strings[k]), 0);
const links = places.reading.length + places.groups.reduce((n, g) => n + g.items.length, 0);

w('# BETR — every word, in one place');
w();
w('**Generated ' + stamp + ' by `node tools/copy-sheet.js`. Do not edit this file** — it is');
w('rewritten from the source every time that command runs, so anything typed here is lost.');
w('Mark it up, send it back, and the change gets made in the file named next to each section.');
w();
w('This build has ' + pieces + ' pieces of wording on the screens and ' + links +
  ' links on Help, as well as the frozen block.');
w();
w('| Part | What it is | Which file |');
w('| --- | --- | --- |');
w('| [Frozen](#frozen) | Cannot be changed by anyone here | `strings-en.js` |');
w('| [The screens](#the-screens) | Every sentence of the interface, in the order a person meets it | `strings-en.js` |');
w('| [Places on Help](#places-on-help) | Every link in BETR | `places.js` |');
w();
w('---');
w();
w('<a id="frozen"></a>');
w();
w('## Frozen — nobody rewords these');
w();
w('The purpose statement and the nine sentences are verbatim from the research');
w('(`docs/research/10-cbt-gateway-approach.md` §10). Google Play requires the "not a medical');
w('device" one and Apple requires the "check with a doctor" one; the rest are what keeps BETR');
w('a worksheet rather than a regulated device. The purpose statement is also the app store');
w('listing, the page description and every post, word for word. Changing one is a decision');
w('taken with the research open, not a wording pass.');
w();
w('### The purpose statement');
w();
value(strings.frozen.purpose).forEach(w);
w();
w('### The nine sentences');
w();
value(strings.frozen.sentences).forEach(w);
w();
w('---');
w();
w('<a id="the-screens"></a>');
w();
w('## The screens');
w();
w('Everything below is in `web/content/strings-en.js` and can be changed. The name in');
w('`code` is where it lives in that file. A word in `{braces}` is filled in by the app —');
w('keep it, and put it wherever the sentence needs it.');
w();
w('Screen 2 of the design is the front screen with words in the blanks, so it has no');
w('section of its own: its one change is `front.noteLocked`.');
w();

const covered = {};
SCREENS.forEach(([key, title, note]) => {
  if (!(key in strings)) return;
  covered[key] = true;
  w('### ' + title);
  if (note) { w(); w('*' + note + '*'); }
  w();
  if (isLeaf(strings[key])) {
    w('**`' + key + '`**');
    w();
    value(strings[key]).forEach(w);
    w();
  } else {
    block(strings[key], key);
  }
});

const missed = Object.keys(strings).filter((k) => k !== 'frozen' && !covered[k]);
if (missed.length) {
  w('### Not yet grouped');
  w();
  w('*New since this document was last given a home for them. Say where they belong.*');
  w();
  missed.forEach((k) => {
    if (isLeaf(strings[k])) {
      w('**`' + k + '`**');
      w();
      value(strings[k]).forEach(w);
      w();
    } else block(strings[k], k);
  });
}

w('---');
w();
w('<a id="places-on-help"></a>');
w();
w('## Places on Help');
w();
w('`web/content/places.js`. Every link in BETR, and the only place a link may be added. Plain');
w('`https`, no tracking of any kind, and nothing is ever fetched to support one. Signed off:');
w('**' + (places.signedOff ? 'yes' : 'not yet') + '**.');
w();
w('**`intro`**');
w();
value(places.intro).forEach(w);
w();
w('### Reading about CBT');
w();
w('| Name | What we say about it | Link |');
w('| --- | --- | --- |');
places.reading.forEach((p) => w('| ' + p.name + ' | ' + p.what + ' | `' + p.url + '` |'));
w();
places.groups.forEach((g) => {
  w('### ' + g.title);
  w();
  /* A group may carry one line of its own, above its list. */
  if (g.note) { w(g.note); w(); }
  w('| Name | What we say about it | Link |');
  w('| --- | --- | --- |');
  g.items.forEach((p) => w('| ' + p.name + ' | ' + p.what + ' | `' + p.url + '` |'));
  w();
});

w('---');
w();
w('## What is not in this document');
w();
w('- **Crisis phone numbers** (`web/content/helplines.js`). Every one was read off the');
w('  provider’s own website on the day recorded next to it. A number is never a wording');
w('  decision, and never written from memory. The words *around* a number are under');
w('  "The crisis block" above.');
w('- **Time zones** (`web/content/zones.js`), which are generated and hold no words.');
w('- **What a person writes.** Their prediction and what happened are theirs, stay on their');
w('  phone, and are never in the app’s files.');
w('- **Anything in a second language.** English is the only one built. A translation copies');
w('  `strings-en.js`, keeps every key, and the nine sentences are approved once by a named');
w('  person and then frozen the same way.');
w();

fs.writeFileSync(path.join(ROOT, 'docs/COPY.md'), out.join('\n').replace(/\n{3,}/g, '\n\n') + '\n');
console.log('docs/COPY.md — ' + out.length + ' lines, ' + pieces + ' pieces of wording, ' + links + ' links');
