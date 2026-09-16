/*
  The loop itself (B56), walked end to end on the fake DOM in harness.js.

  It cannot see layout or CSS. What it catches is a crashing screen, a dead button, a broken
  guard and a rule quietly broken — a number appearing, a prediction losing its words, a word
  on a button that is not the word. The real walk is docs/journeys.md, on a phone.

  The words come from web/content/strings-en.js, never from a literal here, so a founder's edit
  on github.com does not break a test about behaviour. The one exception is the sentence a
  person types, which is theirs and not the app's.
*/
const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { boot } = require('./harness.js');
const s = require('../content/strings-en.js').s;

const IF = 'tell my best friend how I’ve really been';
const THEN = 'it’ll bring us closer';
const SENTENCE = 'If I tell my best friend how I’ve really been, then it’ll bring us closer.';

/* Write one and lock it in, from wherever the walk has got to. */
function lock(a, ifPart, thenPart) {
  if (a.html().indexOf('id="if"') === -1) a.tap('#f-mine').tap('#new');
  return a.type('#if', ifPart || IF).type('#then', thenPart || THEN).tap('#lock');
}
/* From Locked in to the results. */
function finish(a, tag, words) {
  return a.tap('#done').tap('[data-tag="' + tag + '"]').type('#x', words).tap('#keep');
}
const stored = (a) => JSON.parse(a.mem['betr.v2']);
const exported = (a) => { a.tap('#f-help').tap('#export'); return JSON.parse(a.valueOf('#dump')); };
const esc = (x) => x.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

/* ------------------------------------------------------------------ 1 · the front */

test('the front screen is the headline, one sentence with two blanks, and Lock it in — and nothing else', () => {
  const a = boot();
  a.showsText(s.front.title).showsText(s.front.sub).showsText(s.front.ifWords)
    .showsText(s.front.thenWords).showsText(s.front.lock).showsText(s.front.note);
  const h = a.html();
  assert.match(h, /<span class="blank" id="if" contenteditable="true"/);
  assert.match(h, /<span class="blank" id="then" contenteditable="true"/);
  assert.strictEqual(a.focusedId(), 'top', 'the keyboard jumps up over the first thing anybody sees');
  /* No door, no list, no example card (B56 §2 item 2): Lock it in and the three foot words. */
  const main = h.slice(h.indexOf('<main'), h.indexOf('</main>'));
  assert.deepStrictEqual([...main.matchAll(/<button[^>]*id="([^"]+)"/g)].map((m) => m[1]), ['lock']);
  assert.ok(main.indexOf('<textarea') === -1 && main.indexOf('<input') === -1, 'a second kind of field is on the front');
});

test('empty blanks do not lock, and a screen reader is told which one is empty', () => {
  const a = boot();
  assert.match(a.html(), /id="lock" aria-disabled="true"/, 'Lock it in is not drawn as not ready');
  a.tap('#lock');
  assert.ok(!('betr.v2' in a.mem), 'an empty sentence was stored');
  assert.strictEqual(a.focusedId(), 'if');
  assert.strictEqual(a.said(), s.refusal.emptyIf);
  a.showsText(s.front.title);

  a.type('#if', IF).tap('#lock');
  assert.strictEqual(a.focusedId(), 'then');
  assert.strictEqual(a.said(), s.refusal.emptyBelief);
  assert.ok(!('betr.v2' in a.mem));

  /* spaces are not words */
  const b = boot();
  b.type('#if', '   ').type('#then', '  ').tap('#lock');
  assert.ok(!('betr.v2' in b.mem));
});

test('Lock it in joins the two blanks into one sentence and locks it', () => {
  const a = lock(boot());
  a.showsText(s.on.kicker).showsText(SENTENCE).showsText(s.on.ask).showsText(s.on.sub)
    .showsText(s.on.done);
  const [p] = stored(a).predictions;
  assert.strictEqual(p.sentence, SENTENCE);
  assert.match(p.made, /^\d{4}-\d{2}-\d{2}$/);
  assert.strictEqual(p.locked, p.made, 'it is not locked in');
  assert.deepStrictEqual(p.results, []);
  assert.strictEqual(p.away, false);
});

test('the sentence is joined the way a person would have written it', () => {
  const cases = [
    [['ask for Friday off', 'my boss will think I’m slacking'], 'If I ask for Friday off, then my boss will think I’m slacking.'],
    [['If I ask for Friday off,', 'then my boss will mind.'], 'If I ask for Friday off, then my boss will mind.'],
    [['’m honest about the money', 'she’ll be relieved!'], 'If I’m honest about the money, then she’ll be relieved!'],
    [['I go outside for a bit', 'I’ll feel better'], 'If I go outside for a bit, then I’ll feel better.'],
    [['invite them round', '  they’ll say   yes '], 'If I invite them round, then they’ll say yes.']
  ];
  for (const [[ifPart, thenPart], want] of cases) {
    assert.strictEqual(stored(lock(boot(), ifPart, thenPart)).predictions[0].sentence, want);
  }
});

test('the harm stop refuses on either blank, shows the crisis block, and keeps the words where they were', () => {
  for (const [ifPart, thenPart] of [['hurt myself on purpose', 'nobody will notice'],
                                     ['tell them how I really feel', 'they’ll know I want to kill myself']]) {
    const a = boot(null, { timeZone: 'Europe/London' });
    a.type('#if', ifPart).type('#then', thenPart).tap('#lock');
    a.showsText(s.front.title).showsText(s.refusal.harm).showsText(s.crisis.emergency);
    a.shows('href="tel:116123"');
    assert.strictEqual(a.said(), s.refusal.harm);
    assert.ok(!('betr.v2' in a.mem), 'a refused sentence was stored');
    /* their words stay in the blanks, and the refusal never reads them back */
    const h = a.html();
    assert.ok(h.indexOf('id="if" contenteditable="true" role="textbox"') !== -1);
    assert.ok(h.indexOf('>' + esc(ifPart) + '</span>') !== -1, 'the first blank was emptied');
    assert.ok(h.indexOf('>' + esc(thenPart) + '</span>') !== -1, 'the second blank was emptied');
    const warn = h.slice(h.indexOf('class="warn"'), h.indexOf('</div>', h.indexOf('class="warn"')));
    assert.ok(warn.indexOf(esc(ifPart)) === -1 && warn.indexOf(esc(thenPart)) === -1, 'the refusal repeats their words');
  }
  /* and a safe sentence afterwards is simply taken */
  const b = boot();
  b.type('#if', 'hurt myself on purpose').type('#then', 'x').tap('#lock');
  b.type('#if', IF).type('#then', THEN).tap('#lock');
  b.showsText(s.on.kicker).hidesText(s.refusal.harm);
});

/* ------------------------------------------------------------------ 3 to 6 · the loop */

test('Done it opens the three answers, in order, and each one is a button with its words', () => {
  const a = lock(boot()).tap('#done');
  a.showsText(s.go.ask);
  const pills = [...a.html().matchAll(/<button class="pill (\w+)" data-tag="(\w+)">([\s\S]*?)<\/button>/g)];
  assert.deepStrictEqual(pills.map((m) => m[2]), ['yeah', 'sort', 'not']);
  assert.deepStrictEqual(pills.map((m) => m[3].replace(/<[^>]*>/g, '').trim()), [s.go.yeah, s.go.sort, s.go.not]);
  assert.match(pills[0][3], /<svg class="spark"[^>]*aria-hidden="true"/, 'Yeah! has lost its spark, or the spark is read aloud');
  assert.ok(pills[1][3].indexOf('<svg') === -1 && pills[2][3].indexOf('<svg') === -1, 'the spark is on more than Yeah!');
});

test('an answer opens What happened?, with the answer beside the question', () => {
  for (const tag of ['yeah', 'sort', 'not']) {
    const a = lock(boot()).tap('#done').tap('[data-tag="' + tag + '"]');
    a.showsText(s.happened.ask).showsText(s.happened.keep);
    a.shows('<span class="tag ' + tag + '">' + esc(s.go[tag]) + '</span>');
    a.shows('<textarea class="paper small box" id="x"');
  }
});

test('What happened cannot be skipped', () => {
  const a = lock(boot()).tap('#done').tap('[data-tag="sort"]');
  a.type('#x', '   ').tap('#keep');
  a.showsText(s.happened.ask);
  assert.strictEqual(a.said(), s.happened.empty);
  assert.strictEqual(a.focusedId(), 'x');
  assert.deepStrictEqual(stored(a).predictions[0].results, []);
});

test('Keep it lands on the results, newest first, in the person’s own words', () => {
  const a = finish(lock(boot()), 'yeah', 'Told her on the walk home.');
  a.tap('#again');
  finish(a, 'not', 'Tried on the phone.\n\nBad line, she was distracted.');

  const text = a.text();
  a.showsText(SENTENCE).showsText(s.log.again).showsText(s.log.done);
  const newer = text.indexOf('Bad line, she was distracted.');
  const older = text.indexOf('Told her on the walk home.');
  assert.ok(newer !== -1 && older !== -1 && newer < older, 'the results are not newest first');
  /* two paragraphs stay two paragraphs */
  a.shows('<span class="wrote">Tried on the phone.</span></p><p class="t"><span class="wrote">Bad line');

  const [p] = stored(a).predictions;
  assert.deepStrictEqual(p.results.map((r) => [r.tag, r.text]), [
    ['yeah', 'Told her on the walk home.'],
    ['not', 'Tried on the phone.\n\nBad line, she was distracted.']
  ]);
  assert.strictEqual(p.locked, null, 'a kept result left it locked in');
});

test('the prediction is on screen, in the same words, on every screen from Locked in to the results', () => {
  const a = lock(boot());
  const seen = { on: a.text() };
  seen.go = a.tap('#done').text();
  seen.happened = a.tap('[data-tag="sort"]').text();
  seen.log = a.type('#x', 'She said fine.').tap('#keep').text();
  for (const screen of Object.keys(seen)) {
    assert.ok(seen[screen].indexOf(SENTENCE) !== -1, 'the prediction is not on ' + screen);
  }
});

test('Same again tomorrow locks the same prediction in again, and keeps what it had', () => {
  const a = finish(lock(boot()), 'yeah', 'Told her on the walk home.');
  const id = stored(a).predictions[0].id;
  a.tap('#again');
  a.showsText(s.on.kicker).showsText(SENTENCE);
  const all = stored(a).predictions;
  assert.strictEqual(all.length, 1, 'Same again made a second prediction');
  assert.strictEqual(all[0].id, id);
  assert.ok(all[0].locked, 'it is not locked in again');
  assert.strictEqual(all[0].results.length, 1);
});

test('Not today records nothing, keeps it locked in, and says nothing about missing it', () => {
  const a = lock(boot()).tap('#nottoday');
  a.showsText(s.mine.title).showsText(SENTENCE).showsText(s.mine.locked);
  const [p] = stored(a).predictions;
  assert.ok(p.locked);
  assert.deepStrictEqual(p.results, []);
  for (const never of ['missed', 'streak', 'overdue', 'failed', 'behind']) a.hidesText(never);
  /* and the card goes straight back to it */
  a.tap('[data-p]');
  a.showsText(s.on.kicker).showsText(s.on.done);
});

test('Done with this one puts it away, nothing is deleted, and one tap brings it back', () => {
  const a = finish(lock(boot()), 'sort', 'She said fine.').tap('#away');
  a.showsText(s.mine.title).showsText(s.mine.away);
  const h = a.html();
  assert.ok(h.indexOf('class="label away"') < h.indexOf('data-p='), 'the card is not under Put away');
  assert.strictEqual(stored(a).predictions[0].away, true);
  assert.strictEqual(stored(a).predictions[0].results.length, 1, 'putting it away lost a result');

  a.tap('[data-p]');
  a.showsText('She said fine.').showsText(s.log.back).hidesText(s.log.done);
  a.tap('#bringback');
  a.hidesText(s.mine.away);
  assert.strictEqual(stored(a).predictions[0].away, false);

  const b = finish(lock(boot()), 'sort', 'She said fine.').tap('#away');
  const dump = exported(b);
  assert.strictEqual(dump.predictions.length, 1, 'the export lost a prediction that was put away');
  assert.strictEqual(dump.predictions[0].putAway, true);
  assert.strictEqual(dump.predictions[0].results[0].happened, 'She said fine.');
});

/* ------------------------------------------------------------------ 7 · your predictions */

test('Your predictions: one card each, its tags oldest to newest, and a locked one says so', () => {
  const a = finish(lock(boot()), 'yeah', 'First.');
  a.tap('#again');
  finish(a, 'not', 'Second.');
  lock(a, 'say no to my sister without a reason', 'she’ll take it as rude');
  a.tap('#f-mine');

  const cards = [...a.html().matchAll(/<button class="paper small card" data-p="[^"]+">([\s\S]*?)<\/button>/g)].map((m) => m[1]);
  assert.strictEqual(cards.length, 2);
  /* newest activity first: the one just locked in */
  assert.ok(cards[0].indexOf('say no to my sister') !== -1, 'the newest is not first');
  assert.match(cards[0], /<span class="tag locked">/);
  assert.ok(cards[0].indexOf('class="tag yeah"') === -1);
  const tags = [...cards[1].matchAll(/class="tag (\w+)"/g)].map((m) => m[1]);
  assert.deepStrictEqual(tags, ['yeah', 'not'], 'the tags are not oldest to newest');

  a.tap('#new');
  a.showsText(s.front.title);
});

/* ------------------------------------------------------------------ elision (B16) */

/*
  « Si je » becomes « Si j’ » in front of a vowel, and the app has to do it because only the
  app knows what was typed. Built 2026-09-16 on the founder's call.

  These run in FRENCH, which is the first test in this file that does. English is checked at
  the bottom to be completely untouched by it, because a language with no second form must
  never reach the elision at all.
*/
const fr = require('../content/strings-fr.js').s;
const inFrench = () => boot(null, { languages: ['fr-FR', 'fr'] });

test('« Si je » becomes « Si j’ » in front of a vowel, as the person types', () => {
  const a = inFrench();
  a.showsText(fr.front.title).shows('>' + esc(fr.front.ifWords));

  /* a consonant leaves it alone, and keeps the space */
  a.type('#if', 'demande mon vendredi');
  assert.strictEqual(a.textOf('#ifwords'), fr.front.ifWords + ' ');

  /* a vowel elides, and the apostrophe IS the join: no space after it */
  a.type('#if', 'appelle mon père');
  assert.strictEqual(a.textOf('#ifwords'), fr.front.ifWordsElided);

  /* and back again, because somebody rewrites the first word all the time */
  a.type('#if', 'parle à ma sœur');
  assert.strictEqual(a.textOf('#ifwords'), fr.front.ifWords + ' ');
});

test('an accent is still a vowel, and the sentence that gets stored says the same thing', () => {
  const a = inFrench();
  a.type('#if', 'écoute jusqu’au bout').type('#then', 'ça ira mieux').tap('#lock');
  const [p] = stored(a).predictions;
  assert.strictEqual(p.sentence, 'Si j’écoute jusqu’au bout, alors ça ira mieux.');
  a.showsText(p.sentence);
});

test('a mute h elides and an aspirated h does not — the list, not a rule', () => {
  const a = inFrench();
  /* h muet: "j’hésite", "j’habite" */
  a.type('#if', 'hésite avant de répondre');
  assert.strictEqual(a.textOf('#ifwords'), fr.front.ifWordsElided, 'a mute h did not elide');
  a.type('#if', 'habite encore chez mes parents');
  assert.strictEqual(a.textOf('#ifwords'), fr.front.ifWordsElided);
  /* h aspiré: "je hurle", "je hais", and harcèle which is only matched once accents are folded */
  for (const word of ['hurle', 'hais', 'harcèle']) {
    a.type('#if', word + ' quelqu’un');
    assert.strictEqual(a.textOf('#ifwords'), fr.front.ifWords + ' ', 'an aspirated h elided: ' + word);
  }
  /* the stems are cut so a mute-h word starting the same way is NOT caught */
  a.type('#if', 'honore ma parole');
  assert.strictEqual(a.textOf('#ifwords'), fr.front.ifWordsElided, '"honore" was caught by "honn"');
});

test('English never elides, because English has no second form', () => {
  const a = boot();
  assert.strictEqual(s.front.ifWordsElided, '', 'English grew a second form');
  for (const first of ['ask for Friday off', 'own up to it', 'hesitate', 'hurl the thing']) {
    a.type('#if', first);
    assert.strictEqual(a.textOf('#ifwords'), s.front.ifWords + ' ', 'English changed on: ' + first);
  }
  a.type('#if', 'ask her').type('#then', 'she will say no').tap('#lock');
  assert.strictEqual(stored(a).predictions[0].sentence, 'If I ask her, then she will say no.');
});

/* ------------------------------------------------------------------ the rules */

/*
  NO NUMBER (B56 §2 items 7 and 14). No screen in the loop or on the list shows a digit that
  counts anything. A day label is a label and is taken off first — and it is checked to be
  there before it is taken off, so this cannot pass by the label quietly disappearing.
*/
test('no screen in the loop or on the list shows a number', () => {
  const a = boot();
  const screens = {};
  screens.front = a.html();
  lock(a);
  screens.on = a.html();
  screens.go = a.tap('#done').html();
  screens.happened = a.tap('[data-tag="yeah"]').html();
  screens.log = a.type('#x', 'Told her on the walk home.').tap('#keep').html();
  a.tap('#again');
  finish(a, 'sort', 'Sort of went fine.');
  lock(a, 'go outside for a bit', 'I’ll feel better');
  finish(a, 'not', 'Rained.');
  lock(a, 'say no to my sister', 'she’ll take it as rude');
  screens.mine = a.tap('#f-mine').html();
  screens.results = a.tap('[data-p]', 1).html();
  screens.why = a.tap('#f-why').html();

  assert.ok(screens.results.indexOf('<span class="day">') !== -1, 'the day label is gone, so this proves nothing');
  for (const name of Object.keys(screens)) {
    const words = screens[name].replace(/<span class="day">[^<]*<\/span>/g, '').replace(/<[^>]*>/g, ' ');
    assert.ok(words.trim().length > 40, name + ' is nearly empty, so this proves nothing');
    assert.ok(!/\d/.test(words), name + ' shows a number: ' + (words.match(/.{0,30}\d.{0,30}/) || [])[0]);
  }
});

test('a day is a label: the weekday this week, the date before that', () => {
  const a = finish(lock(boot()), 'yeah', 'Today.');
  const today = new Intl.DateTimeFormat('en', { weekday: 'short' }).format(new Date());
  a.shows('<span class="day">' + today + '</span>');

  const old = new Date();
  old.setDate(old.getDate() - 30);
  const day = old.getFullYear() + '-' + String(old.getMonth() + 1).padStart(2, '0') + '-' + String(old.getDate()).padStart(2, '0');
  const seed = { v: 6, stage: 'log', at: 'p1', predictions: [{ id: 'p1', sentence: SENTENCE, made: day, locked: null, away: false, results: [{ tag: 'sort', text: 'A while ago.', day }] }] };
  const b = boot({ 'betr.v2': JSON.stringify(seed) });
  b.shows('<span class="day">' + new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short' }).format(old) + '</span>');
});

test('a reload lands where the person was, and never on a screen that has lost its answer', () => {
  const a = lock(boot());
  boot(a.mem).showsText(s.on.kicker).showsText(SENTENCE);

  a.tap('#done').tap('[data-tag="yeah"]');
  /* the answer on screen 4 is not stored until Keep it, so a reload asks again */
  boot(a.mem).showsText(s.go.ask).showsText(SENTENCE);

  const gone = { v: 6, stage: 'log', at: 'nothing-by-this-id', predictions: [] };
  boot({ 'betr.v2': JSON.stringify(gone) }).showsText(s.front.title);
  boot({ 'betr.v2': JSON.stringify({ stage: 'a-screen-from-the-old-app' }) }).showsText(s.front.title);
});

/* Every button and heading on every screen a person can reach, for the word rules below. */
function everyScreen() {
  const a = boot();
  let h = a.html();
  a.type('#if', 'hurt myself').type('#then', 'x').tap('#lock');
  h += a.html();
  lock(a, IF, THEN);
  h += a.html();
  h += a.tap('#done').html();
  h += a.tap('[data-tag="yeah"]').html();
  h += a.type('#x', 'Told her.').tap('#keep').html();
  h += a.tap('#away').html();
  h += a.tap('[data-p]').html();
  h += a.tap('#f-why').html();
  h += a.tap('#f-help').html();
  return h;
}

test('BETR in capitals, and nothing a person taps starts in lowercase', () => {
  const h = everyScreen();
  assert.ok(h.indexOf('<p class="wordmark">BETR</p>') !== -1);
  assert.ok(!/\bBetr\b/.test(h.replace(/<[^>]*>/g, ' ')), 'the wordmark is written Betr somewhere');
  const buttons = [...h.matchAll(/<button[^>]*>([\s\S]*?)<\/button>/g)]
    .map((m) => m[1].replace(/<[^>]*>/g, '').replace(/&[a-z]+;/g, '').replace(/^[^A-Za-z]+/, ''))
    .filter(Boolean);
  assert.ok(buttons.length > 20, 'only found ' + buttons.length + ' buttons');
  for (const b of buttons) assert.ok(!/^[a-z]/.test(b), 'a button starts in lowercase: ' + b);
});

test('the word is prediction: no button or heading says test or worry', () => {
  const h = everyScreen();
  const said = [...h.matchAll(/<(button|h[1-3])[^>]*>([\s\S]*?)<\/\1>/g)].map((m) => m[2].replace(/<[^>]*>/g, ''));
  for (const x of said) {
    /* a heading that IS the person's own sentence is theirs, and may say anything */
    if (x.indexOf(IF) !== -1) continue;
    assert.ok(!/\b(test|tests|worry|worries)\b/i.test(x), 'a button or heading says test or worry: ' + x);
  }
  assert.ok(said.some((x) => /prediction/i.test(x)), 'no button or heading says prediction at all');
});

test('the phrases that are never used are not in the page, the manifest or the strings', () => {
  const banned = ['digital cbt', 'improve your mental health', 'reduces symptoms', 'tracks your anxiety', 'irrational', 'streak'];
  const WEB = path.join(__dirname, '..');
  const all = ['index.html', 'manifest.webmanifest', 'content/strings-en.js', 'app.js']
    .map((f) => fs.readFileSync(path.join(WEB, f), 'utf8').toLowerCase()).join('\n');
  for (const phrase of banned) {
    const code = all.replace(/\/\*[\s\S]*?\*\//g, '');
    assert.ok(code.indexOf(phrase) === -1, '"' + phrase + '" is in the app');
  }
});

test('Delete everything leaves nothing on the phone, and the front is empty again', () => {
  const a = finish(lock(boot()), 'yeah', 'Told her.');
  a.tap('#f-mine').tap('#wipe').tap('#yes');
  assert.deepStrictEqual(Object.keys(a.mem), [], 'something is left behind: ' + Object.keys(a.mem));
  a.showsText(s.front.title);
  assert.match(a.html(), /id="if" contenteditable="true" role="textbox" aria-label="[^"]*" spellcheck="true" enterkeyhint="next"><\/span>/);
  a.tap('#f-mine');
  a.hides('data-p=');
});

test('a phone from the old app opens on the front, with its history waiting on Your predictions', () => {
  const V5 = fs.readFileSync(path.join(__dirname, 'fixtures', 'v5-phone.json'), 'utf8');
  const old = JSON.parse(V5);
  const a = boot({ 'betr.v1': V5 });
  a.showsText(s.front.title);
  a.tap('#f-mine');
  const sentences = new Set(old.done.concat(old.open).map((d) => d.belief.replace(/\s+/g, ' ').trim()));
  assert.strictEqual((a.html().match(/data-p=/g) || []).length, sentences.size);
  a.showsText(s.mine.away).showsText(s.mine.locked);
  /* an old result shows its words and its day, and no answer it was never asked for */
  a.hides('class="tag yeah"').hides('class="tag sort"').hides('class="tag not"');
  const first = old.done[0];
  const card = [...a.html().matchAll(/data-p="([^"]+)">[\s\S]*?<\/button>/g)]
    .findIndex((m) => m[0].indexOf(esc(first.belief.replace(/\s+/g, ' ').trim())) !== -1);
  a.tap('[data-p]', card);
  a.showsText(first.o).shows('<span class="day">');
  /* the first write moves it across */
  a.tap('#f-help');
  assert.ok('betr.v2' in a.mem && !('betr.v1' in a.mem), 'the old record was not moved across on the first save');
});
