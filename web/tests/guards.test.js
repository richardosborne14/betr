/*
  The two guards on a person's own entry. Since B29 free text is the front door, so these are
  the only thing standing between a person's own words and a test about anyone's safety —
  which, since the same day, is the one hard stop there is.
*/
const { test } = require('node:test');
const assert = require('node:assert');
const guards = require('../lib/guards.js');

/*
  Since B15 a refusal carries a KEY, not a sentence: the words are in the string file so they
  can be translated. So these read the words out of content/strings-en.js rather than
  restating them here — the trap in learnings.md is a test that keeps its own copy of BETR's
  words, and B1 broke three of those in one afternoon.
*/
const strings = require('../content/strings-en.js');
const words = (key) => key.split('.').reduce((node, part) => node[part], strings.s);

test('"I am a bad person" is refused with the reframe, not accepted', () => {
  const r = guards.checkBelief('I am a bad person');
  assert.strictEqual(r.ok, false);
  assert.strictEqual(r.kind, 'verdict');
  assert.strictEqual(r.reason, 'refusal.verdict');
  assert.match(words(r.reason), /verdict, not a prediction/);
});

test('other verdict openings are caught too', () => {
  for (const s of ["I'm worthless", 'I’m useless', 'im a fraud', 'I never get it right']) {
    assert.strictEqual(guards.checkBelief(s).ok, false, s);
  }
});

test('a conditional belief with a consequence is accepted', () => {
  assert.strictEqual(guards.checkBelief('If I say no, people will think I am selfish').ok, true);
  assert.strictEqual(guards.checkBelief('If I rest then I will feel guilty all day').ok, true);
});

/*
  2026-09-04, and the test user who caused it. He typed "if I eat gluten, it won't go well"
  and the app refused it for a missing "then" — a sentence any reader understands, walled by
  grammar. Nothing about the shape is sent back any more.
*/
test('a clear prediction goes through whatever punctuation it has', () => {
  for (const s of ['if I eat gluten, it won’t go well',
                   'If I say no they will think I am selfish',
                   'My boss will think I am slacking if I leave at five',
                   'I’m going to get fired if I ask for Friday off']) {
    const r = guards.checkBelief(s);
    assert.strictEqual(r.ok, true, s);
    assert.ok(!r.soft, 'asked about a sentence that already reads as a prediction: ' + s);
  }
});

test('a belief with no consequence is asked about, not refused', () => {
  for (const s of ['If I say no', 'People will hate me']) {
    const r = guards.checkBelief(s);
    assert.strictEqual(r.ok, true, s);
    assert.strictEqual(r.soft, 'nudge.shape', s);
    assert.match(words(r.soft), /If I ___, then ___/);
  }
});

test('an empty box is one of the three things that cannot go on', () => {
  const r = guards.checkBelief('');
  assert.strictEqual(r.ok, false);
  assert.strictEqual(r.reason, 'refusal.emptyBelief');
});

/*
  2026-09-04, founder's call, and the wall that went back up. This box used to send a worry
  naming suicide straight on to "What will you do?" and stop it only once a plan had been
  typed into the next box. The refusal is the same one checkTest gives, so app.js draws the
  crisis lines under it (app.js: refusal.kind === 'harm').
*/
test('a belief naming anyone\u2019s safety is refused here, not one screen later', () => {
  for (const s of ['If I tell them how I really feel, then they will know I want to kill myself',
                   'If I say it out loud they will think I am suicidal',
                   'If I go home tonight I will hurt myself']) {
    const r = guards.checkBelief(s);
    assert.strictEqual(r.ok, false, s);
    assert.strictEqual(r.kind, 'harm', s);
    assert.strictEqual(r.reason, 'refusal.harm', s);
    assert.strictEqual(r.reason, guards.checkTest(s).reason, 'the two guards must say the same thing: ' + s);
  }
});


/*
  The narrow exemption that came with the loosening. "I'm going to get fired if I ask" is a
  textbook prediction and used to be refused as a verdict on its first two words. A sentence
  with "if" in it is a conditional; a bare one is still a core belief and still refused.
*/
test('a conditional is never read as a verdict, and a bare one still is', () => {
  assert.strictEqual(guards.checkBelief('I’m useless').ok, false);
  assert.strictEqual(guards.checkBelief('I’m no good at any of this').ok, false);
  assert.strictEqual(guards.checkBelief('I’m the one they’ll blame if the thing fails').ok, true);
});



/*
  B17 moved the numbers out of here. A refusal has to be answerable with the line for the
  country the person is actually in, and this file has no idea where anybody is — so it says
  why the test is refused and nothing else. The crisis block is put underneath it by
  crisisBlock() in app.js, and menu.test.js checks that it arrives.

  This test is the guard against them creeping back: a number in this file is a number shown
  to everybody on earth, which is the bug B17 existed to fix.
*/
/*
  B56, 2026-09-15. The habit and body lists are gone with the stock content they held BETR to.
  Nothing a person writes about drink, food or their body is refused, and there is no second
  list for anything to be wired back into. The one hard stop is anyone's safety, on both blanks.
*/
test('the one hard stop is the only list there is', () => {
  assert.strictEqual(guards.HABIT, undefined, 'the habit list is back');
  assert.strictEqual(guards.BODY, undefined, 'the body list is back');
  assert.ok(guards.HARM.indexOf('kill myself') !== -1);
  for (const s of ['stop drinking at the wedding', 'skip lunch and count calories', 'put a bet on and stop']) {
    assert.strictEqual(guards.checkPart(s, 'if').ok, true, 'a person\u2019s own words were refused: ' + s);
  }
  const r = guards.checkPart('I kill myself', 'if');
  assert.strictEqual(r.ok, false);
  assert.strictEqual(r.kind, 'harm');
  /* An empty blank names which blank, and nothing else. */
  assert.strictEqual(guards.checkPart('  ', 'if').reason, 'refusal.emptyIf');
  assert.strictEqual(guards.checkPart('', 'then').reason, 'refusal.emptyBelief');
});

test('a refusal about safety says why, and carries no phone number of its own', () => {
  const r = guards.checkTest('See how long I can go without wanting to hurt myself');
  assert.strictEqual(r.kind, 'harm');
  assert.match(words(r.reason), /can’t help with that one/);

  /* not in the guard, which has no words in it at all any more... */
  const src = require('node:fs').readFileSync(require.resolve('../lib/guards.js'), 'utf8');
  const code = src.replace(/\/\*[\s\S]*?\*\//g, '');
  assert.ok(!/[0-9]{3}/.test(code), 'a phone number is back in guards.js');

  /* ...and not in the words either, in any language. A number belongs to a country, and
     content/helplines.js is the only file allowed to hold one (B17). */
  for (const key of Object.keys(guards.REASON)) {
    const said = words(guards.REASON[key]);
    assert.ok(typeof said === 'string' && said.trim(), key + ' has no words in strings-en.js');
    assert.ok(!/[0-9]{3}/.test(said), 'a phone number is in the ' + key + ' refusal: ' + said);
  }
});

test('the name of the app does not trip the word "bet"', () => {
  assert.strictEqual(guards.checkTest('Open BETR and do the test before work').ok, true);
});

test('ordinary words that contain a banned word are not tripped', () => {
  for (const s of ['Ask for the fastest option', 'Weightlift-free evening: just walk',
                   'Tell them I drank the last of the milk']) {
    /* the third one is a genuine near-miss and must still be refused; the first two must not */
  }
  assert.strictEqual(guards.checkTest('Ask for the fastest option').ok, true);
  assert.strictEqual(guards.checkTest('Say I need a break, in one sentence').ok, true);
});

test('an ordinary, safe test is accepted', () => {
  assert.strictEqual(guards.checkTest('Ask my boss for Friday off, with no reason given').ok, true);
});

test('the expectation is taken from the second half of the belief', () => {
  assert.strictEqual(
    guards.expectationFrom('If I say no, they will be annoyed with me'),
    'They will be annoyed with me'
  );
  assert.strictEqual(
    guards.expectationFrom('If I rest then I will feel guilty'),
    'I will feel guilty'
  );
});
