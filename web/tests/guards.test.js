/*
  The two guards on a person's own entry. Custom entries are in v1 (B0 Q3), so these are the
  only thing standing between free text and a test that involves the habit.
*/
const { test } = require('node:test');
const assert = require('node:assert');
const guards = require('../lib/guards.js');

test('"I am a bad person" is refused with the reframe, not accepted', () => {
  const r = guards.checkBelief('I am a bad person');
  assert.strictEqual(r.ok, false);
  assert.strictEqual(r.kind, 'verdict');
  assert.match(r.reason, /verdict, not a prediction/);
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

test('a belief with no consequence is sent back', () => {
  assert.strictEqual(guards.checkBelief('If I say no').ok, false);
  assert.strictEqual(guards.checkBelief('People will hate me').ok, false);
  assert.strictEqual(guards.checkBelief('').ok, false);
});

test('a test mentioning the habit is refused with the reason', () => {
  for (const s of ['Have one beer and see what happens', 'Skip my evening joint',
                   'Put a bet on and stop', 'Watch porn once and see']) {
    const r = guards.checkTest(s);
    assert.strictEqual(r.ok, false, s);
    assert.strictEqual(r.kind, 'habit', s);
    assert.match(r.reason, /the worry underneath/);
  }
});

test('food, weight and body sensations are refused, with their own reason', () => {
  const r = guards.checkTest('Skip lunch and count calories');
  assert.strictEqual(r.kind, 'body');
});

/*
  B17 moved the numbers out of here. A refusal has to be answerable with the line for the
  country the person is actually in, and this file has no idea where anybody is — so it says
  why the test is refused and nothing else. The crisis block is put underneath it by
  crisisBlock() in app.js, and menu.test.js checks that it arrives.

  This test is the guard against them creeping back: a number in this file is a number shown
  to everybody on earth, which is the bug B17 existed to fix.
*/
test('a refusal about safety says why, and carries no phone number of its own', () => {
  const r = guards.checkTest('See how long I can go without wanting to hurt myself');
  assert.strictEqual(r.kind, 'harm');
  assert.match(r.reason, /can’t help with that one/);
  for (const reason of Object.values(guards.REASON)) {
    assert.ok(!/[0-9]{3}/.test(reason), 'a phone number is back in guards.js: ' + reason);
  }
});

test('the name of the app does not trip the word "bet"', () => {
  assert.strictEqual(guards.checkTest('Open Betr and do the test before work').ok, true);
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
