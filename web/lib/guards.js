/*
  The two guards on a person's own entry (scope §5.4, B0 Q3).

  Custom entries are in v1 by the founder's call, which puts free text back in front of the
  test. These are what make that safe:

    checkBelief  refuses an empty box, a worry naming anyone's safety, and a verdict
                 ("I am a bad person"), and nothing else: the shape rules ask once and let
                 the person's own words through. It does NOT screen for the habit or for
                 food and body, and that is deliberate — see checkBelief.
    checkTest    a test that involves the habit, food and body, or anyone's safety is
                 refused with the reason, not warned about. Refusing quietly teaches nothing;
                 refusing with the reason teaches the whole point of the product.

  The word lists are deliberately blunt and deliberately over-inclusive. A person whose real
  test is refused can word it differently in ten seconds. A person whose unsafe test is
  allowed has been let down by the one rule that never bends.

  Since B15 a refusal carries a `reason` that is a KEY, not a sentence: the words live in
  web/content/strings-en.js so they can be translated. The lists, the matching and the
  decision all still live here, and this file says nothing a person reads.
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

  /*
    What a refusal says is NOT in this file any more (B15). This maps each refusal to a key
    in web/content/strings-en.js, and app.js looks the words up in the person's language.

    Two things follow from that, and both are the point:
      - the reasons can be translated without touching a line of the guard's logic
      - no phone number can ever creep back in here. It did once: this file used to end the
        self-harm refusal with 988 and 116 123, so somebody in Lagos who had just typed the
        worst sentence of their week was handed two numbers that do not ring there. B17 took
        them out; the app puts the crisis block underneath, with the line for the country
        they are actually in. web/tests/guards.test.js fails the build if a digit comes back.
  */
  var REASON = {
    habit: 'refusal.habit',
    body: 'refusal.body',
    harm: 'refusal.harm',
    verdict: 'refusal.verdict',
    notConditional: 'refusal.notConditional',
    noConsequence: 'refusal.noConsequence',
    emptyTest: 'refusal.emptyTest',
    emptyBelief: 'refusal.emptyBelief'
  };

  /*
    What a nudge says. Same rule as REASON: a key, never a sentence, so it can be translated,
    and so no phone number can ever appear in this file.

    `notConditional` and `noConsequence` above are still keys a translator has to fill, and
    nothing reaches them any more: they were the two refusals that became this one nudge, and
    they are kept because a language file that dropped a key would fail i18n.test.js on the
    day somebody puts the wall back. Neither is shown.
  */
  var NUDGE = { shape: 'nudge.shape' };

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
    if (!s) return { ok: false, kind: 'empty', word: null, reason: REASON.emptyTest };

    var w = hit(s, HARM);
    if (w) return { ok: false, kind: 'harm', word: w, reason: REASON.harm };

    w = hit(s, HABIT);
    if (w) return { ok: false, kind: 'habit', word: w, reason: REASON.habit };

    w = hit(s, BODY);
    if (w) return { ok: false, kind: 'body', word: w, reason: REASON.body };

    return { ok: true };
  }

  /*
    A belief.

    LOOSENED 2026-09-04, founder's call, and the reason is a person. A test user typed
    "if I eat gluten, it won't go well" and was refused for a missing "then". The grammar was
    never the point: that sentence is a clear prediction, a reader understands it instantly,
    and the wall taught him nothing and cost him the session.

    So the shape rules are a NUDGE now, not a refusal. The app asks once, shows the shape that
    works, and the person's own words go through on the next tap. Four things went with it:
    "if" may sit anywhere in the sentence rather than only at the front, no comma is required,
    no "then" is required, and the six-word floor is a five-word one.

    Three stops stay hard, and none of them is a grammar preference:

      empty    there is nothing to test.
      harm     ADDED 2026-09-04, founder's call, and it is the one wall that went back up.
               checkTest has always refused a plan naming suicide or self-harm; this box
               did not, so somebody who wrote "if I tell them how I really feel, then
               they'll know I want to kill myself" was answered with "What will you do?"
               and only stopped once they had typed a plan for it. One screen late, at the
               worst possible moment. Same words as the test refusal, and app.js puts the
               crisis lines for their country underneath it.
      verdict  "I am a bad person" is a CORE belief. Research §2.1 is explicit that a tool with
               no therapist must not go near one: Padesky's client looks at contrary evidence
               and says "yes, and I am still bad". Reframed, never accepted. CLAUDE.md rule 3.
               A sentence with "if" in it is a conditional and is exempt, because
               "I'm going to get fired if I ask" used to be refused as a verdict and it is a
               textbook prediction.

    HABIT and BODY are checkTest's alone, on purpose. Rule 4 is about the *test*, and
    "if I stop drinking at the wedding, then they'll ask why" is exactly the worry door one
    exists to hold; its test never goes near a drink. Screening beliefs for those lists would
    refuse the people BETR is most for. Do not "make the two guards consistent".

    Returns { ok: false, kind, reason }  cannot go on
         or { ok: true }                 reads as a prediction
         or { ok: true, soft, kind }     goes on when the person taps again
  */
  function checkBelief(text) {
    var s = String(text || '').trim().replace(/\s+/g, ' ');
    if (!s) return { ok: false, kind: 'empty', reason: REASON.emptyBelief };

    var w = hit(s, HARM);
    if (w) return { ok: false, kind: 'harm', word: w, reason: REASON.harm };

    var conditional = /\bif\b/i.test(s);

    if (!conditional && /^(i\s*am|i'm|i’m|im|i\s+will\s+always|i\s+never)\b/i.test(s)) {
      return { ok: false, kind: 'verdict', reason: REASON.verdict };
    }

    /* Both halves of a prediction, roughly: the "if", and enough words to carry a consequence. */
    if (!conditional || s.split(' ').length < 5) {
      return { ok: true, soft: NUDGE.shape, kind: 'shape' };
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
    NUDGE: NUDGE,
    checkTest: checkTest,
    checkBelief: checkBelief,
    expectationFrom: expectationFrom
  };
});
