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

/* Lock a stock worry in and walk away from it, leaving it waiting. */
function lockOne(a, item) {
  if (a.html().indexOf('id="go"') !== -1) a.tap('#go');   /* already on the pick list, or not */
  a.tap('[data-id]', item).tap('#lock');
  if (a.html().indexOf('id="nothanks"') !== -1) a.tap('#nothanks');
  return a;
}

/* ------------------------------------------------------- the three doors */

test('the menu is on every screen, and it is exactly three plain words', () => {
  const a = boot();
  const stops = [
    () => a.tap('#go'),                       /* pick */
    () => a.tap('[data-id]', 0),              /* plan */
    () => a.tap('#lock'),                     /* locked */
    () => a.tap('#nothanks').tap('#done'),    /* happened */
    () => a.type('#o', 'He said fair enough.').tap('#next'),  /* sure */
    () => a.tap('[data-key]', 1),             /* result */
    () => a.tap('#m-mine'),                   /* your worries */
    () => a.tap('#m-help'),                   /* help */
    () => a.tap('#back').tap('#doors')        /* what's going on */
  ];
  const check = () => {
    const items = a.html().match(/<nav class="menu"[^>]*>(.*?)<\/nav>/);
    assert.ok(items, 'no menu on screen: ' + a.html().slice(0, 120));
    const labels = [...items[1].matchAll(/<button[^>]*>([^<]+)</g)].map((m) => m[1]);
    assert.deepStrictEqual(labels, ['Your worries', 'New worry', 'Help']);
  };
  check();
  for (const step of stops) { step(); check(); }
});

test('every door on the menu works from every screen', () => {
  const from = [
    (a) => a,                                                     /* the start screen */
    (a) => a.tap('#go'),                                          /* pick */
    (a) => a.tap('#go').tap('[data-id]', 0),                      /* plan */
    (a) => lockOne(a, 0),                                         /* locked */
    (a) => lockOne(a, 0).tap('#done'),                            /* happened */
    (a) => a.tap('#doors'),                                       /* what's going on */
    (a) => a.tap('#go').tap('#own')                               /* a person's own entry */
  ];
  for (const at of from) {
    at(boot()).tap('#m-new').shows('Which one?');
    at(boot()).tap('#m-help').shows('If you are in danger or in crisis');
    /* nothing recorded and nothing waiting lands on the pick list, never on a dead end */
    const mine = at(boot()).tap('#m-mine').html();
    assert.ok(mine.indexOf('Your worries') !== -1 || mine.indexOf('Which one?') !== -1, mine.slice(0, 120));
  }
});

/* ------------------------------------------------------- tests that wait for you */

test('starting a new worry keeps the test you locked in, and it is waiting afterwards', () => {
  const a = boot();
  lockOne(a, 0).shows('Go and do it.');
  a.tap('#m-new').shows('Which one?');

  /* on the front screen, as one line with a way back in — not a list and not a number */
  a.tap('#back').shows('On the go').shows('to one small request today');
  a.hides('1 waiting').hides('overdue');

  /* and on Your worries, on its own card, with both ways out of it */
  a.tap('#m-mine').shows('Your worries').shows('On the go').shows('Done it');
  a.tap('[data-did]', 0).shows('What happened?');
  a.type('#o', 'He said fine.').tap('#next').tap('[data-key]', 1);
  a.shows('>1<').shows('>9<');
});

test('there is no cap on how many are on the go, and nothing counts them', () => {
  const a = boot();
  lockOne(a, 0).tap('#m-new');
  lockOne(a, 1).tap('#m-new');
  lockOne(a, 2).tap('#m-new');
  lockOne(a, 3).tap('#m-new');
  a.tap('#back');                       /* the front screen, with four waiting */
  a.shows('Tests you’ve got on the go');
  const front = a.html();
  for (const shame of ['4 ', 'overdue', 'waiting for', 'you missed', 'streak', 'behind']) {
    assert.ok(front.toLowerCase().indexOf(shame.toLowerCase()) === -1, 'front screen says "' + shame + '"');
  }
  /* they are all still there, and the menu still says nothing about how many */
  const mine = a.tap('#pickup').html();
  assert.strictEqual((mine.match(/data-did=/g) || []).length, 4);
  assert.ok(mine.indexOf('>4<') === -1, 'your worries counted the waiting tests');
});

test('a test that is waiting survives a reload, and "didn’t get to it" costs it nothing', () => {
  const a = boot();
  lockOne(a, 0).tap('#m-new');
  a.tap('#back').shows('On the go');

  const again = boot(a.mem);            /* the same phone, opened again tomorrow */
  again.shows('On the go').shows('to one small request today');
  again.tap('#m-mine').tap('[data-notyet]', 0).shows('still here for tomorrow');
  again.shows('On the go');
  again.hides('missed').hides('streak').hides('failed');
});

test('an unfinished test that was never locked in is simply let go', () => {
  const a = boot();
  a.tap('#go').tap('[data-id]', 0).shows('Here’s your test');
  a.tap('#m-new').tap('#back');
  a.hides('On the go');
});

test('export carries the tests that are waiting as well as the results', () => {
  const a = boot();
  lockOne(a, 0).tap('#m-new');
  a.tap('#m-help').tap('#export');
  const dump = JSON.parse(a.valueOf('#dump'));
  assert.strictEqual(dump.waiting.length, 1);
  assert.strictEqual(dump.waiting[0].worry, require('../content/worries.js')[0].label);
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
  rest += b.tap('#go').html();
  rest += b.tap('[data-id]', 0).html();
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
  a.tap('#go').tap('#own');
  a.type('#t', 'If I say no, people will think I am selfish').tap('#next');
  a.type('#t', 'Cut myself where nobody will see it').tap('#next');
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
  rest += b.tap('#go').tap('[data-id]', 0).html();
  rest += b.tap('#lock').tap('#nothanks').tap('#done').html();
  rest += b.type('#o', 'He said fine.').tap('#next').tap('[data-key]', 1).html();
  assert.ok(rest.toLowerCase().indexOf('trybeup') === -1, 'TrybeUP is outside Help');
});
