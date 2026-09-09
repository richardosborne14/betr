/*
  B8: the three doors, the tests that wait for you, and Help.

  What these are guarding, in order of how easily it could be undone by accident:

    - the menu is three plain words on every screen, and stays three. A count, a badge or a
      fourth item is the thing the founder's rule 10 was protecting against
    - a test you locked in is never binned by the next thing you tap, and there is no cap on
      how many are waiting, and nothing anywhere counts them
    - Help opens with the crisis lines above everything else in the markup
    - every link is plain https with nothing attached, and every one of them is in the
      allow-list below, so adding a link is a deliberate act that shows up in a diff
*/
const { test } = require('node:test');
const assert = require('node:assert');
const { boot } = require('./harness.js');
const worries = require('../content/worries.js');
const allDoors = require('../content/whats-going-on.js');
const content = require('../lib/content.js');
const places = require('../content/places.js');
const en = require('../content/strings-en.js');
/* B19: a walk goes through a door, so "the first worry" is the first one behind one. */
const firstBehind = () => content.byId(worries, allDoors.items[0].worries[0]);

/*
  Lock a stock worry in and walk away from it, leaving it waiting.

  B47, 2026-09-09: `door` used to be hard-coded to the first one, and the cull took that door
  down to two worries, so a walk that wanted four fell off the end of the list. Which door a
  menu test walks through was never the point of the menu tests — pass one that is big enough.
*/
function lockOne(a, item, door) {
  if (a.html().indexOf('id="go"') !== -1) a.tap('#not-sure');   /* already past the front screen, or not */
  /* B30: "New test" opens the build screen, so the borrow road starts from the front screen. */
  if (a.html().indexOf('id="if"') !== -1) a.tap('#back').tap('#not-sure');
  if (a.html().indexOf('data-door=') !== -1) a.tap('[data-door]', door || 0);
  a.tap('[data-id]', item).tap('[data-b]', 0).tap('#next').tap('#lock');
  if (a.html().indexOf('id="nothanks"') !== -1) a.tap('#nothanks');
  return a;
}

/* ------------------------------------------------------- the three doors */

test('the menu is on every screen, and it is exactly three plain words', () => {
  const a = boot();
  const stops = [
    () => a.tap('#not-sure'),                       /* what's going on */
    () => a.tap('[data-door]', 0),            /* pick */
    () => a.tap('[data-id]', 0).tap('[data-b]', 0).tap('#next'),              /* plan */
    () => a.tap('#lock'),                     /* locked */
    () => a.tap('#nothanks').tap('#done'),    /* happened */
    () => a.type('#o', 'He said fair enough.').tap('#next'),  /* sure */
    () => a.tap('[data-key]', 1),             /* result */
    () => a.tap('#m-mine'),                   /* your worries */
    () => a.tap('#m-help'),                   /* help */
    () => a.tap('#back').tap('#m-new')        /* back to what's going on */
  ];
  const check = () => {
    const items = a.html().match(/<nav class="menu"[^>]*>(.*?)<\/nav>/);
    assert.ok(items, 'no menu on screen: ' + a.html().slice(0, 120));
    const labels = [...items[1].matchAll(/<button[^>]*>([^<]+)</g)].map((m) => m[1]);
    assert.deepStrictEqual(labels, ['Your tests', 'New test', 'Help']);
  };
  check();
  for (const step of stops) { step(); check(); }
});

test('every door on the menu works from every screen', () => {
  const from = [
    (a) => a,                                                     /* the start screen */
    (a) => a.tap('#not-sure'),                                          /* what's going on */
    (a) => a.tap('#not-sure').tap('[data-door]', 0),                    /* pick */
    (a) => a.tap('#not-sure').tap('[data-door]', 0).tap('[data-id]', 0).tap('[data-b]', 0).tap('#next'),  /* plan */
    (a) => lockOne(a, 0),                                         /* locked */
    (a) => lockOne(a, 0).tap('#done'),                            /* happened */
    (a) => a.tap('#m-new')                                        /* the build screen */
  ];
  for (const at of from) {
    /* B30: "New test" opens a new test, not the doors. The doors are one tap aside now. */
    at(boot()).tap('#m-new').shows(en.s.build.title);
    at(boot()).tap('#m-help').shows('If you are in danger or in crisis');
    /* nothing recorded and nothing waiting lands on the pick list, never on a dead end */
    const mine = at(boot()).tap('#m-mine').html();
    assert.ok(mine.indexOf('Your tests') !== -1 || mine.indexOf('What’s going on?') !== -1, mine.slice(0, 120));
  }
});

/* ------------------------------------------------------- tests that wait for you */

test('starting a new test keeps the one you locked in, and it is waiting afterwards', () => {
  const a = boot();
  lockOne(a, 0).shows(en.s.locked.title);
  a.tap('#m-new').shows(en.s.build.title);

  /* on the front screen, as one line with a way back in — not a list and not a number */
  a.tap('#back').shows('On the go').shows(firstBehind().test);
  a.hides('1 waiting').hides('overdue');

  /* and on Your tests, on its own card, with both ways out of it */
  a.tap('#m-mine').shows('Your tests').shows('On the go').shows('Done it');
  a.tap('[data-did]', 0).shows('What happened?');
  a.type('#o', 'He said fine.').tap('#next').tap('[data-key]', 1);
  a.shows('>1<').shows('>9<');
});

test('there is no cap on how many are on the go, and nothing counts them', () => {
  const a = boot();
  /* Four distinct worries, so through a door that has four (B47). */
  lockOne(a, 0, 3).tap('#m-new');
  lockOne(a, 1, 3).tap('#m-new');
  lockOne(a, 2, 3).tap('#m-new');
  lockOne(a, 3, 3).tap('#m-new');
  a.tap('#back');                       /* the front screen, with four waiting */
  a.shows('Tests you’ve got on the go');
  const front = a.html();
  for (const shame of ['overdue', 'waiting for', 'you missed', 'streak', 'behind']) {
    assert.ok(front.toLowerCase().indexOf(shame.toLowerCase()) === -1, 'front screen says "' + shame + '"');
  }
  /*
    And the count itself is nowhere on it. This used to look for the bare string "4 ", which
    stopped working on 2026-09-08: the front screen now carries a worked example whose ladder
    legitimately says "Down 4 rungs" (B31). So it checks the LINE about what is on the go,
    which is the one that would grow a tally, rather than the whole screen.
  */
  const line = front.slice(front.indexOf('Tests you’ve got on the go') - 200,
                           front.indexOf('Tests you’ve got on the go') + 60);
  assert.ok(!/\d/.test(line.replace(/<[^>]*>/g, '')), 'the line about what is on the go counts them: ' + line);
  /* they are all still there, and the menu still says nothing about how many */
  const mine = a.tap('#pickup').html();
  assert.strictEqual((mine.match(/data-did=/g) || []).length, 4);
  assert.ok(mine.indexOf('>4<') === -1, 'Your tests counted the waiting tests');
});

test('a test that is waiting survives a reload, and "didn’t get to it" costs it nothing', () => {
  const a = boot();
  lockOne(a, 0).tap('#m-new');
  a.tap('#back').shows('On the go');

  const again = boot(a.mem);            /* the same phone, opened again tomorrow */
  again.shows('On the go').shows(firstBehind().test);
  again.tap('#m-mine').tap('[data-notyet]', 0).shows('still here for tomorrow');
  again.shows('On the go');
  /* not bare "missed": a worry's own test may ask you to write down what you missed. */
  again.hides('you missed').hides('missed a').hides('streak').hides('failed');
});

test('an unfinished test that was never locked in is simply let go', () => {
  const a = boot();
  a.tap('#not-sure').tap('[data-door]', 0).tap('[data-id]', 0).tap('[data-b]', 0).tap('#next').shows(en.s.build.lock);
  a.tap('#m-new').tap('#back');
  a.hides('On the go');
});

test('export carries the tests that are waiting as well as the results', () => {
  const a = boot();
  lockOne(a, 0).tap('#m-new');
  a.tap('#m-help').tap('#export');
  const dump = JSON.parse(a.valueOf('#dump'));
  assert.strictEqual(dump.waiting.length, 1);
  assert.strictEqual(dump.waiting[0].worry, firstBehind().label);
  assert.ok(dump.waiting[0].lockedIn);
});

/* ------------------------------------------------------- help */

test('Help opens with the crisis lines, above everything else in the markup', () => {
  const a = boot();
  a.tap('#m-help');
  const h = a.html();
  const crisis = h.indexOf('If you are in danger or in crisis');
  assert.ok(crisis !== -1, 'no crisis block on Help');
  for (const later of ['What CBT is', 'What this is', 'Other places', 'Who made this', 'The code']) {
    assert.ok(crisis < h.indexOf(later), '"' + later + '" is above the crisis lines');
  }
  /* sentence 7, verbatim, and all three ways out of it */
  a.shows('call your local emergency number');
  a.shows('988').shows('116 123').shows('findahelpline.com');
});

/*
  B26, 2026-09-04. The order of the first two blocks, and it is the whole task.

  The crisis block is first because B17 put it there for the person who cannot scroll and gets
  one chance. The proof is second because the person checking for a catch is a different person
  and used to get the same screen: the counters were 2,607px down, three and a half screens,
  behind the CBT explainer and the nine sentences.

  Both halves of this fail the build. Moving the crisis block off the top has the standing of
  rule 1 and needs the founder in writing; moving the proof back down undoes B26 by accident,
  which is exactly how the front screen lost its ladder line the day before.
*/
test('Help answers the person checking for a catch on the first screen, under the crisis lines', () => {
  const a = boot();
  a.tap('#m-help');
  const h = a.html();
  const at = (s) => {
    const i = h.indexOf(s);
    assert.ok(i !== -1, 'not on Help: ' + s);
    return i;
  };
  const crisis = at('If you are in danger or in crisis');
  const proof = at('Don’t take our word for it');
  assert.ok(crisis < proof, 'the crisis lines are no longer first');
  for (const later of ['Choosing one that is safe', 'What CBT is', 'What this is',
    'This is a self-help worksheet', 'Other places', 'Who made this', 'The code']) {
    assert.ok(proof < at(later), '"' + later + '" is above the proof block');
  }

  /*
    B33, 2026-09-08. Frozen sentence 6 is third now, and the reason is rule 4 loosening on the
    same day: the habit and body word lists stopped refusing a person's own test, so this
    sentence is the only place the line is drawn at all. It was fourth, inside a numbered list
    of nine, which was the right place for a rule the app also enforced.

    Both halves of this fail the build. It may not climb above the crisis block or the proof —
    those are for the person who gets one chance at the screen — and it may not slide back
    below the CBT explainer, which is where it was when it was one of nine and no more.
  */
  const safe = at('Choosing one that is safe');
  assert.ok(proof < safe, 'the safe-experiments line has climbed above the proof block');
  assert.ok(safe < at('What CBT is'),
    'the safe-experiments line is below the CBT explainer again. Since 2026-09-08 it is the ' +
    'only place BETR draws the line at all (rule 4 as amended)');
  /* the counters and both ways out are inside that block, not stranded below the fold */
  for (const part of ['sent to us, ever', 'accounts', 'Turn on airplane mode']) {
    assert.ok(at(part) < at('What CBT is'), '"' + part + '" fell below the CBT explainer');
  }
});

/*
  B26, founder 2026-09-04. Help is where somebody goes to find the catch, and until this day
  BETR never said anywhere what it costs. §08: paywall complaints carry a −1.89 star penalty
  and outnumber AI complaints 34 to 1, so the unanswered question is not a small one.

  This test only checks the sentence is there and is read before the CBT explainer. IF BETR
  EVER GAINS A THING TO BUY, THE SENTENCE COMES OUT — no test can notice that for you.
*/
test('Help says in plain words what BETR costs, before anything else it explains', () => {
  const a = boot();
  a.tap('#m-help');
  a.shows('BETR is free');
  a.shows('nothing to buy');
  const h = a.html();
  assert.ok(h.indexOf('BETR is free') < h.indexOf('What CBT is'),
    'the price is below the CBT explainer again');
  /* it speaks for BETR; TrybeUP's paid plan is still stated in TrybeUP's own entry (rule 9) */
  assert.ok(h.indexOf('the private groups need a paid plan') > h.indexOf('BETR is free'),
    'TrybeUP\'s paywall admission has moved or gone');
});

/*
  And it is the SAME sentence, not a second copy of it: app.js draws the array element that
  the numbered list below draws. A copy would drift the first time somebody edited one of them,
  and this is a frozen sentence (rule 7) said in two places on one screen.
*/
test('the safe-experiments line said twice on Help is one sentence, word for word', () => {
  const en = require('../content/strings-en.js');
  const six = en.s.frozen.sentences[5];
  assert.match(six, /^Choose experiments that are safe and legal\./, 'sentence 6 has moved');

  const h = boot().tap('#m-help').html().replace(/<[^>]*>/g, '');
  const both = h.split(six).length - 1;
  assert.strictEqual(both, 2, 'sentence 6 is on Help ' + both + ' times, and it should be twice');

  /* the app has no copy of it, in any file: it draws frozen.sentences[5] */
  const src = require('node:fs').readFileSync(require.resolve('../app.js'), 'utf8');
  assert.ok(src.indexOf('Choose experiments') === -1, 'app.js has its own copy of sentence 6');
});

test('Help carries the nine sentences and the one clear thing to read about CBT', () => {
  const a = boot();
  a.tap('#m-help');
  a.shows('not a medical device').shows('It does not diagnose, treat, cure or prevent any condition');
  a.shows('made by the people behind TrybeUP');
  a.shows('behavioural experiment');
  a.shows('CBT is a talking therapy');
  a.shows('if you can see one, please do');
  a.shows('Turn on airplane mode');
  a.shows('Dev build — not published');
  /* the primer is above the small print, which is what "the thing to read" means */
  const h = a.html();
  assert.ok(h.indexOf('What CBT is') < h.indexOf('This is a self-help worksheet'));
});

/*
  The allow-list. Every link a person can tap in BETR is here, and nowhere else. Adding one
  means editing this list, which means it shows up in a diff and gets read by somebody.

  Misha signs the list itself off before release (B8). This test is about the shape of a
  link, not about whether the right places are on it.
*/
const ALLOWED = [
  'https://findahelpline.com',
  /* B24, all six read on the provider's own site on 2026-09-04. See content/places.js. */
  'https://www.nhs.uk/live-well/alcohol-advice/alcohol-support',
  'https://www.nhs.uk/live-well/addiction-support/drug-addiction-getting-help',
  'https://www.wearewithyou.org.uk',
  'https://www.talktofrank.com',
  'https://smartrecovery.org.uk',
  'https://findtreatment.gov',
  'https://www.nhs.uk/mental-health/talking-therapies-medicine-treatments/talking-therapies-and-counselling/cognitive-behavioural-therapy-cbt',
  'https://www.babcp.com/About/What-is-CBT',
  'https://www.cci.health.wa.gov.au',
  'https://www.getselfhelp.co.uk',
  'https://www.nhs.uk/every-mind-matters',
  'https://www.mind.org.uk/information-support',
  'https://www.babcp.com',
  'https://www.findcbt.org',
  'https://eabct.eu',
  'https://sidebyside.mind.org.uk',
  'https://trybeup.com'
];

/*
  The tappable crisis numbers. These are the only links allowed outside Help, because the
  refusal a person meets after typing a test about hurting themselves carries them too.

  Since B17 the numbers are not written here: they are every line in content/helplines.js,
  which is the file that carries a source URL and the date a person read it there. Adding a
  country still shows up in a diff, and it shows up in the file where it can be checked.
*/
const HELPLINES = require('../content/helplines.js');
const DIALLABLE = ['https://findahelpline.com'].concat(
  Object.keys(HELPLINES.countries).reduce((all, code) =>
    all.concat(HELPLINES.countries[code].lines.map((l) => l.tel)), [])
);

test('every link is plain https or tel, has nothing attached, and is on the allow-list', () => {
  const a = boot();
  const links = [...a.tap('#m-help').html().matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
  assert.ok(links.length >= 12, 'only found ' + links.length + ' links');
  for (const url of links) {
    if (url.startsWith('tel:')) {
      assert.ok(/^tel:[0-9]+$/.test(url), url + ' is not a plain number');
      assert.ok(DIALLABLE.indexOf(url) !== -1, url + ' is not one of the crisis numbers');
      continue;
    }
    assert.ok(url.startsWith('https://'), url + ' is not https');
    assert.ok(url.indexOf('?') === -1 && url.indexOf('#') === -1, url + ' carries a parameter');
    assert.ok(ALLOWED.indexOf(url) !== -1, url + ' is not on the allow-list in menu.test.js');
  }
  /* everywhere else in the app: nothing but the crisis numbers */
  const b = boot();
  let rest = b.html();
  rest += b.tap('#not-sure').html();
  rest += b.tap('[data-door]', 0).html();
  rest += b.tap('[data-id]', 0).tap('[data-b]', 0).tap('#next').html();
  rest += b.tap('#lock').html();
  rest += b.tap('#nothanks').tap('#done').html();
  for (const m of rest.matchAll(/href="([^"]+)"/g)) {
    assert.ok(DIALLABLE.indexOf(m[1]) !== -1, m[1] + ' turned up outside Help');
  }
});

/*
  Sentence 7 is frozen (research §10) and names the US and UK lines inside itself. B17 took
  it off the top of Help and put the live crisis block there instead — but the sentence is
  still in the list of nine, still word for word, still with its numbers tappable. The tags
  are stripped back off and compared character for character.
*/
test('sentence 7 is still word for word, and its numbers still dial', () => {
  const a = boot();
  const h = a.tap('#m-help').html();
  const list = h.slice(h.indexOf('<ol>'), h.indexOf('</ol>'));
  const items = [...list.matchAll(/<li>([\s\S]*?)<\/li>/g)].map((m) => m[1]);
  assert.strictEqual(items.length, 9, 'there are not nine sentences');
  assert.strictEqual(items[6].replace(/<[^>]+>/g, ''),
    'If you are in danger or in crisis, call your local emergency number. In the US, call ' +
    'or text 988. In the UK and Ireland, call Samaritans free on 116 123. Elsewhere, ' +
    'findahelpline.com lists free helplines in over 175 countries.',
    'sentence 7 was reworded');
  assert.ok(items[6].indexOf('href="tel:988"') !== -1, '988 does not dial');
  assert.ok(items[6].indexOf('href="tel:116123"') !== -1, '116 123 does not dial');
  assert.ok(items[6].indexOf('href="https://findahelpline.com"') !== -1, 'findahelpline.com is not a link');
});

test('a refusal about self-harm carries a number that dials, for the right country', () => {
  const a = boot(null, { timeZone: 'Europe/London' });
  a.tap('#m-new');
  a.type('#if', 'say no').type('#then', 'people will think I am selfish').tap('#next');
  a.type('#do', 'Cut myself where nobody will see it').tap('#lock');
  a.shows('href="tel:116123"').shows('Samaritans');
  a.shows('call your local emergency number');
  a.hides('href="tel:988"');
});

test('ours is on the Help list, never first, and says who made it and what it costs', () => {
  const a = boot();
  const h = a.tap('#m-help').html();
  const ours = h.indexOf('trybeup.com');
  assert.ok(ours !== -1, 'ours is not listed at all');

  /* one plain entry among the others: never first in its group, never a button */
  const group = h.slice(h.indexOf('Doing it with other people'));
  assert.ok(group.indexOf('sidebyside.mind.org.uk') < group.indexOf('trybeup.com'), 'ours is first');
  assert.ok(!/<button[^>]*>[^<]*TrybeUP/.test(h), 'ours is a button');

  a.shows('Made by us').shows('One-to-one chat is free').shows('need a paid plan');
  /* and it is not on the front screen, in the loop, in the result, or on the menu */
  const b = boot();
  let rest = b.html();
  rest += b.tap('#not-sure').tap('[data-door]', 0).tap('[data-id]', 0).tap('[data-b]', 0).tap('#next').html();
  rest += b.tap('#lock').tap('#nothanks').tap('#done').html();
  rest += b.type('#o', 'He said fine.').tap('#next').tap('[data-key]', 1).html();
  assert.ok(rest.toLowerCase().indexOf('trybeup') === -1, 'TrybeUP is outside Help');
});

/* ------------------------------------------------------- B24: the promise on door one */

/*
  Door one has said since B19: "If you're dependent on alcohol or drugs, this isn't the right
  thing. Help has places that are." For a day it was not true — places.js had no such service
  on it at all, and the one sentence in BETR that deliberately sends somebody away sent them
  to CBT worksheets and therapist registers.

  This test is why it cannot come apart silently again. It is deliberately written the way
  round it is: the promise is what is checked FOR, so deleting the group without deleting the
  sentence fails the build, and deleting the sentence too is the only way to make it pass —
  which is a decision somebody has to make on purpose, in a diff.
*/
test('if door one still promises places for alcohol and drugs, Help has them', () => {
  const promises = allDoors.items.filter((d) => d.note)
    .map((d) => d.note).join(' ');
  if (!/alcohol|drug/i.test(promises)) return;   /* the promise is gone; nothing left to keep */

  const group = places.groups.find((g) => /drink|drug|alcohol/i.test(g.title));
  assert.ok(group, 'door one promises Help has places for alcohol and drugs; places.js has no such group');
  assert.ok(group.items.length >= 3, 'only ' + group.items.length + ' places behind that promise');

  /* and they are actually drawn, not merely present in the file */
  const h = boot().tap('#m-help').html();
  for (const place of group.items) {
    assert.ok(h.indexOf(place.url) !== -1, place.name + ' is in places.js but not on the Help screen');
  }
  /* the group says which countries it covers, the way helplines.js does */
  assert.ok(typeof group.note === 'string' && /UK|United States/.test(group.note),
    'the group does not say where its places actually work');
  assert.ok(h.indexOf(group.note) !== -1, 'that line is not drawn');
});

/*
  Naming a screen is not the same as opening it. The note goes to Help when it is tapped —
  inside the app, not as a link, so the rule that only Help carries links is untouched.
*/
test('tapping door one\'s note opens Help, and lands on the places it promised', () => {
  const a = boot().tap('#not-sure');
  a.shows('data-note=');
  a.tap('[data-note]');
  a.shows(places.groups[0].items[0].url);

  /*
    Not the top of Help. Help is four screenfuls long and this person was told, one tap ago,
    that BETR is not the right thing for them. Focus is the assertion because it is what
    carries somebody listening as well as somebody looking.
  */
  assert.strictEqual(a.focusedId(), 'group-substances',
    'the note opened Help but left them at the top of it');

  /* it moved inside the app: the note itself is not a link out */
  const doors = boot().tap('#not-sure').html();
  const note = doors.slice(doors.indexOf('doornote'), doors.indexOf('doornote') + 400);
  assert.ok(note.indexOf('href=') === -1, 'the note is a link out, not a move inside the app');
});
