/*
  Every word BETR can put in front of a person, in one document the founder can read and
  mark up. Run it from the repo root:

      node tools/copy-sheet.js

  It rewrites docs/COPY.md from the source files and nothing else. It is a reader, never a
  writer: editing COPY.md changes nothing in the app. The point of generating it rather than
  keeping a hand-written copy deck is that a hand-written one is wrong within a week.

  Where a word actually lives:
    web/content/strings-en.js      every sentence of the interface
    web/content/worries.js         the worry list — six parts each
    web/content/whats-going-on.js  the "what's going on" doors
    web/content/why.js             "Why this one sticks", one entry per worry
    web/content/places.js          every link on the Help screen

  Some of it cannot be changed by anybody in this repo: the purpose statement and the nine
  sentences are verbatim from docs/research/10-cbt-gateway-approach.md §10 (CLAUDE.md rule 7).
  They are printed first, and marked, so nobody spends an afternoon rewording one.
*/
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const strings = require(path.join(ROOT, 'web/content/strings-en.js')).s;
const worries = require(path.join(ROOT, 'web/content/worries.js'));
const doors = require(path.join(ROOT, 'web/content/whats-going-on.js'));
const why = require(path.join(ROOT, 'web/content/why.js'));
const places = require(path.join(ROOT, 'web/content/places.js'));
const starts = require(path.join(ROOT, 'web/content/starts.js'));
const examples = require(path.join(ROOT, 'web/content/examples.js'));

/*
  The order a person meets the screens, with the name the founder would use for each. Any key
  in strings-en.js that is not named here still gets printed, at the bottom, under "Not yet
  grouped" — so a new screen can never quietly go missing from this document.
*/
const SCREENS = [
  ['brand', 'The wordmark', 'BETR, all caps, everywhere a person reads it (rule 7).'],
  ['back', 'The back button', ''],
  ['nav', 'The three words at the bottom of every screen',
    'Three plain words, no icons, no counts, never a fourth (rule 10).'],
  ['start', 'Screen 1 — the front screen', 'The first thing anybody sees.'],
  ['waiting', 'Screen 1 — a test already on the go', 'Only drawn if something is unfinished.'],
  ['doors', 'Screen 2 — "What’s going on?"',
    'Since B19 this is the way in, not a side door. The wording around the list; the list ' +
    'itself is further down, under THE DOORS.'],
  ['pick', 'Screen 3 — "Which one?"',
    'The wording around the worry list. The worries themselves are under THE WORRY LIST.'],
  ['own', 'Screen 3a — writing your own worry', 'Three screens, one box each.'],
  ['refusal', 'Screen 3a — when BETR says no',
    'What a person is told when their own test involves the habit, the body, or anyone’s safety.'],
  ['belief', 'Screen 3b — "Which of these is it?"',
    'B20. The screen between the list and the test, where a person says which prediction under ' +
    'the worry is theirs. The three themselves are under THE WORRY LIST; these are the words ' +
    'around them.'],
  ['plan', 'Screen 4 — the test', 'What you do today, and what you leave out.'],
  ['locked', 'Screen 5 — locked in', ''],
  ['happened', 'Screen 6 — what happened', ''],
  ['sure', 'Screen 7 — are you still sure', ''],
  ['rate', 'Screen 7 — the five words', 'The only answers. There is no slider.'],
  ['result', 'Screen 8 — the result', 'The screen the whole thing is for.'],
  ['ladder', 'Screen 8 — the ladder labels', 'One belief’s grip, 1–10. Never a total (rule 5).'],
  ['ordinal', 'Screen 8 — 1st, 2nd, 3rd', ''],
  ['why', 'Screen 9 — "Why this one sticks"',
    'The wording around it. The twelve explanations are under WHY THIS ONE STICKS.'],
  ['mine', 'Screen 10 — Your worries', ''],
  ['install', 'Screen 11 — add to home screen', ''],
  ['crisis', 'Screen 12 — the crisis block',
    'Appears at the top of Help and under a refusal about self-harm. No phone number is ever ' +
    'written here — numbers live in helplines.js with the page and the day somebody read them.'],
  ['where', 'Screen 12 — where are you', 'Changes which helpline number shows, and nothing else.'],
  ['help', 'Screen 13 — Help', ''],
  ['io', 'Screen 13 — export and delete', ''],
  ['a11y', 'Said out loud, never shown',
    'What a screen reader reads where the screen alone would not say it.']
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
      lines.push(pad + '> **' + (i + 1) + '.** ' + item);
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
      value(v).forEach(w);
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

/* ---------------------------------------------------------------- the document */

const stamp = new Date().toISOString().slice(0, 10);

w('# BETR — every word, in one place');
w();
w('**Generated ' + stamp + ' by `node tools/copy-sheet.js`. Do not edit this file** — it is');
w('rewritten from the source every time that command runs, so anything typed here is lost.');
w('Mark it up, send it back, and the change gets made in the file named next to each section.');
w();
w('There are ' + examples.length + ' front-screen examples, ' + starts.items.length +
  ' suggestion starts, ' + worries.length + ' to borrow from, ' + doors.items.length + ' doors and ' +
  Object.keys(why).length + ' explanations in this build.');
w();
w('| Part | What it is | Which file |');
w('| --- | --- | --- |');
w('| [Frozen](#frozen) | Cannot be changed by anyone here | `strings-en.js` |');
w('| [The screens](#the-screens) | Every sentence of the interface | `strings-en.js` |');
w('| [The front-screen example](#the-front-screen-example) | The first thing anybody sees | `examples.js` |');
w('| [The suggestions](#the-suggestions) | What you can tap into the two blanks | `starts.js` |');
w('| [The list you can borrow from](#the-worry-list) | Six parts each | `worries.js` |');
w('| [The doors](#the-doors) | "What’s going on?" | `whats-going-on.js` |');
w('| [Why this one sticks](#why-this-one-sticks) | One explanation per worry | `why.js` |');
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
w('<a id="the-front-screen-example"></a>');
w();
w('## The finished test on the front screen');
w();
w('`web/content/examples.js`. The first thing anybody sees, and the only words in BETR read');
w('before a person has agreed to anything. One is shown per open, in this order.');
w();
w('It is an EXAMPLE and it is captioned as one — "What one test looks like", above the card.');
w('Shown as a real person’s result it would be a testimonial, and a testimonial reads as a');
w('claim. Nobody is named, nobody else’s number appears, and the ladder moves because that is');
w('what happened in this one.');
w();
w('| | You expected | What actually happened | Ladder |');
w('| --- | --- | --- | --- |');
examples.forEach((ex, i) => {
  w('| ' + (i + 1) + ' | ' + ex.prediction + ' | ' + ex.happened + ' | ' + ex.from + ' → ' + ex.to + ' |');
});
w();

w('---');
w();
w('<a id="the-suggestions"></a>');
w();
w('## The suggestions under the blanks');
w();
w('`web/content/starts.js`. The screen prints **If I** and **, then** either side of two gaps,');
w('and these are what a person can tap into them instead of typing. Fixed content in a fixed');
w('order; which set of predictions is offered depends on one thing only — whether the first');
w('gap holds one of these situations, word for word.');
w();
w('An **if** and a **then** are lowercase, because they follow printed words and have to read');
w('as one sentence. A **do** and a **leave out** are whole sentences and start with a capital.');
w();
w('### The general set — shown when somebody has written their own situation');
w();
w('| | |');
w('| --- | --- |');
w('| **then** | ' + starts.general.thens.join(' · ') + ' |');
w('| **do** | ' + starts.general.dos.join(' · ') + ' |');
w('| **leave out** | ' + starts.general.drops.join(' · ') + ' |');
w();
starts.items.forEach((it, i) => {
  w('### ' + (i + 1) + '. If I ' + it.if + '…');
  w();
  w('| | |');
  w('| --- | --- |');
  it.thens.forEach((line, j) => w('| **then** ' + (j + 1) + ' | ' + line + ' |'));
  it.dos.forEach((line, j) => w('| **do** ' + (j + 1) + ' | ' + line + ' |'));
  it.drops.forEach((line, j) => w('| **leave out** ' + (j + 1) + ' | ' + line + ' |'));
  w();
});

w('---');
w();
w('<a id="the-worry-list"></a>');
w();
w('## The list you can borrow from');
w();
w('`web/content/worries.js`. Since 2026-09-08 this is not the way in — it is one tap aside,');
w('behind *Not sure? Try one of these* — and picking one opens the build screen with the');
w('sentence half written and everything editable. The **id** never changes once anybody has');
w('used it, because a stored result points at it. No **test** and no **drop** may touch the');
w('habit itself; the build fails if one does.');
w();
w('**Read the three under each one together.** The **card sentence** is loose on purpose: it');
w('is read on a list of four to six, to work out which of these this is. The **three** are the');
w('chips on the next screen, one of which is yours — so each has to predict a different thing,');
w('and each has to be something that could turn out to be wrong. Every one of them starts');
w('**If I** and has a **, then** in it, because that is what the build screen prints.');
w('**Braced for** is the same prediction in the voice of somebody expecting it, and it is what');
w('BETR writes into "What you expect" when somebody keeps that sentence word for word.');
w();
worries.forEach((f, i) => {
  w('### ' + (i + 1) + '. ' + f.label);
  w();
  w('| | |');
  w('| --- | --- |');
  w('| **id** | `' + f.id + '` |');
  w('| **lane** | ' + f.lane + ' |');
  w('| **label** — the button | ' + f.label + ' |');
  w('| **card sentence** — under the label on the list | ' + f.belief + ' |');
  w('| **test** — the one thing, today | ' + f.test + ' |');
  w('| **drop** — what you leave out | ' + f.drop + ' |');
  w();
  w('The three a person chooses between, in the order they are shown:');
  w();
  w('| | If I ___, then ___ | braced for |');
  w('| --- | --- | --- |');
  f.beliefs.forEach((b, j) => {
    w('| ' + (j + 1) + ' | ' + b.belief + ' | ' + b.expect + ' |');
  });
  w();
});

w('---');
w();
w('<a id="the-doors"></a>');
w();
w('## The doors — "What’s going on?"');
w();
w('`web/content/whats-going-on.js`. Reached from *Not sure? Try one of these* on the front');
w('screen; a door opens onto four to six things to borrow. It is the one screen in BETR that');
w('names a behaviour rather than a prediction. Every label is what a person would say about');
w('themselves, in the first person, and never a diagnosis. Nothing here is ever tested: a door');
w('only points.');
w();
w('One door carries a **note** — a safety line, shown under that door and no other. It says');
w('what frozen sentence 4 already says, at the one moment it is relevant.');
w();
w('**`intro`**');
w();
value(doors.intro).forEach(w);
w();
w('**`foot`**');
w();
value(doors.foot).forEach(w);
w();
doors.items.forEach((d, i) => {
  w('### ' + (i + 1) + '. ' + d.label);
  w();
  w('| | |');
  w('| --- | --- |');
  w('| **id** | `' + d.id + '` |');
  w('| **label** | ' + d.label + ' |');
  w('| **under** | ' + d.under + ' |');
  if (d.note) w('| **note** — the safety line | ' + d.note + ' |');
  w('| **opens onto** | ' + d.worries.map((id) => {
    const f = worries.filter((x) => x.id === id)[0];
    return f ? f.label : '**missing: ' + id + '**';
  }).join(' · ') + ' |');
  w();
});

w('---');
w();
w('<a id="why-this-one-sticks"></a>');
w();
w('## Why this one sticks');
w();
w('`web/content/why.js`. Offered after somebody has a result of their own, never before. Two');
w('paragraphs per worry and no third field: everybody who taps a worry reads exactly the same');
w('words, forever. It never says how a test will turn out, never says anything about the');
w('reader, and never claims to fix anything.');
w();
w('The closing line is the same under all twelve and lives with the interface, as `why.foot`.');
w();
worries.forEach((f) => {
  const e = why[f.id];
  w('### ' + f.label + ' — `' + f.id + '`');
  w();
  if (!e) { w('**No explanation. The build fails on this.**'); w(); return; }
  w('**what** — what the worry is, underneath the situation');
  w();
  value(e.what).forEach(w);
  w();
  w('**why** — which safety behaviour keeps it from being tested');
  w();
  value(e.why).forEach(w);
  w();
});

w('---');
w();
w('<a id="places-on-help"></a>');
w();
w('## Places on Help');
w();
w('`web/content/places.js`. Every link in BETR, and the only place a link may be added. Plain');
w('`https`, no tracking of any kind, and nothing is ever fetched to support one. Signed off by');
w('Misha: **' + (places.signedOff ? 'yes' : 'not yet') + '**.');
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
  /* B24: a group may carry one line of its own, above its list. One does. */
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
w('  "the crisis block" above.');
w('- **Time zones** (`web/content/zones.js`), which are generated and hold no words.');
w('- **Anything in a second language.** English is the only one built. A translation copies');
w('  `strings-en.js`, keeps every key, and the nine sentences are approved once by a named');
w('  person and then frozen the same way.');
w();

fs.writeFileSync(path.join(ROOT, 'docs/COPY.md'), out.join('\n').replace(/\n{3,}/g, '\n\n') + '\n');
console.log('docs/COPY.md — ' + out.length + ' lines, ' + worries.length + ' worries, ' +
  doors.items.length + ' doors, ' + Object.keys(why).length + ' explanations');
