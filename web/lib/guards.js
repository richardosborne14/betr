/*
  The two guards on a person's own entry (scope §5.4, B0 Q3).

  Custom entries are in v1 by the founder's call, which puts free text back in front of the
  test. These are what make that safe:

    checkBelief  "I am a bad person" is a verdict. It is reframed at the door into a
                 prediction, because you cannot run an experiment against a verdict.
    checkTest    a test that involves the habit, food and body, or anyone's safety is
                 refused with the reason, not warned about. Refusing quietly teaches nothing;
                 refusing with the reason teaches the whole point of the product.

  The word lists are deliberately blunt and deliberately over-inclusive. A person whose real
  test is refused can word it differently in ten seconds. A person whose unsafe test is
  allowed has been let down by the one rule that never bends.
*/
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else (root.Betr = root.Betr || {}).guards = api;
})(typeof self !== 'undefined' ? self : this, function () {

  /* The thing you're trying to change. Never the subject of a test (CLAUDE.md rule 4). */
  var HABIT = [
    'drink', 'drinks', 'drinking', 'drunk', 'booze', 'boozing', 'alcohol', 'alcoholic',
    'beer', 'beers', 'wine', 'lager', 'cider', 'pint', 'pints', 'vodka', 'gin', 'rum',
    'whisky', 'whiskey', 'tequila', 'shots', 'hangover',
    'porn', 'pornography', 'wank', 'wanking', 'masturbate', 'masturbating', 'onlyfans',
    'smoke', 'smoking', 'cigarette', 'cigarettes', 'vape', 'vaping', 'nicotine',
    'weed', 'cannabis', 'joint', 'spliff', 'stoned', 'hash',
    'bet', 'bets', 'betting', 'gamble', 'gambling', 'casino', 'slots', 'roulette', 'poker',
    'coke', 'cocaine', 'heroin', 'meth', 'ketamine', 'mdma', 'pills', 'opioid', 'opioids',
    'benzo', 'benzos', 'valium', 'xanax'
  ];

  /* Food, weight and body sensations. Refused lanes (research §6). */
  var BODY = [
    'starve', 'starving', 'fasting', 'purge', 'purging', 'binge', 'bingeing', 'binging',
    'calories', 'calorie', 'weigh', 'weighing', 'weight', 'diet', 'dieting',
    'heart rate', 'pulse', 'dizzy', 'palpitations', 'panic attack', 'hyperventilate'
  ];

  /* Anyone's safety. Refused outright, with the crisis lines. */
  var HARM = [
    'suicide', 'suicidal', 'kill myself', 'end it', 'self harm', 'self-harm',
    'harm myself', 'hurt myself', 'cut myself', 'overdose', 'od'
  ];

  var REASON = {
    habit:
      'That test involves the thing itself. Those aren’t tests — the fear underneath is. ' +
      'Try one about what people will think, or about going without the crutch.',
    body:
      'Betr doesn’t do tests about food, weight or what your body is doing. Those need a ' +
      'person, not this.',
    harm:
      'Betr can’t help with that one, and it would be wrong to pretend otherwise. If you are ' +
      'in danger or in crisis, call your local emergency number. In the US, call or text 988. ' +
      'In the UK and Ireland, call Samaritans free on 116 123. Elsewhere, findahelpline.com ' +
      'lists free helplines in over 175 countries.'
  };

  /* Word-boundary match, so "Betr" never trips "bet" and "fastest" never trips "fasting". */
  function hit(text, words) {
    var t = ' ' + String(text || '').toLowerCase().replace(/[’']/g, '\'').replace(/[^a-z' ]+/g, ' ').replace(/\s+/g, ' ') + ' ';
    for (var i = 0; i < words.length; i++) {
      if (t.indexOf(' ' + words[i] + ' ') !== -1) return words[i];
    }
    return null;
  }

  /*
    A test, a drop line, or anything else the person writes that describes what they will do.
    Returns { ok: true } or { ok: false, kind, word, reason }.
  */
  function checkTest(text) {
    var s = String(text || '').trim();
    if (!s) return { ok: false, kind: 'empty', word: null, reason: 'Write the one thing you’ll do today.' };

    var w = hit(s, HARM);
    if (w) return { ok: false, kind: 'harm', word: w, reason: REASON.harm };

    w = hit(s, HABIT);
    if (w) return { ok: false, kind: 'habit', word: w, reason: REASON.habit };

    w = hit(s, BODY);
    if (w) return { ok: false, kind: 'body', word: w, reason: REASON.body };

    return { ok: true };
  }

  /*
    A belief. Conditional only: "If I ___, then ___".
    Returns { ok: true } or { ok: false, kind, reason }.
  */
  function checkBelief(text) {
    var s = String(text || '').trim().replace(/\s+/g, ' ');
    if (!s) return { ok: false, kind: 'empty', reason: 'Write what you think will happen.' };

    if (/^(i\s*am|i'm|i’m|im|i\s+will\s+always|i\s+never)\b/i.test(s)) {
      return {
        ok: false,
        kind: 'verdict',
        reason: 'That’s a verdict, not a prediction. What do you think would happen because of it?'
      };
    }

    if (!/^if\b/i.test(s)) {
      return {
        ok: false,
        kind: 'not-conditional',
        reason: 'Start it with "If I…". It has to be something that could turn out to be wrong.'
      };
    }

    var hasConsequence = s.indexOf(',') !== -1 || /\bthen\b/i.test(s);
    if (!hasConsequence || s.split(' ').length < 6) {
      return {
        ok: false,
        kind: 'no-consequence',
        reason: 'Say what you think happens next: "If I ___, then ___".'
      };
    }

    return { ok: true };
  }

  /*
    The consequence half of a belief, used as the pre-written expectation for a custom entry
    so the person never has to type it twice. Falls back to the whole belief.
  */
  function expectationFrom(belief) {
    var s = String(belief || '').trim().replace(/\s+/g, ' ');
    var m = s.match(/^if\b[^,]*,\s*(.+)$/i) || s.match(/^if\b.*?\bthen\b\s*(.+)$/i);
    var tail = m ? m[1] : s;
    tail = tail.replace(/^(then\s+)/i, '').trim();
    if (!tail) return s;
    return tail.charAt(0).toUpperCase() + tail.slice(1);
  }

  return {
    HABIT: HABIT,
    BODY: BODY,
    HARM: HARM,
    REASON: REASON,
    checkTest: checkTest,
    checkBelief: checkBelief,
    expectationFrom: expectationFrom
  };
});
