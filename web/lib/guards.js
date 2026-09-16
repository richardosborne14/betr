/*
  The guard on what a person writes (scope §5.4, B0 Q3).

  ONE HARD STOP, AND IT IS THE ONLY ONE (founder, 2026-09-08, B28/B29; unchanged by B56). A
  sentence about ending it, or hurting anyone, is refused on both blanks of the front screen,
  and app.js puts the crisis block for the person's own country underneath. The founder's own
  example of what must still be refused: "If I kill myself everyone will be better off".

  Everything else a person writes is theirs. The line about the rest is drawn once, by frozen
  sentence 6 on Help, and nowhere else in the app.

  B56, 2026-09-15: THE HABIT AND BODY LISTS ARE GONE. They survived B29 for one reason — BETR's
  own stock tests were held to them, so BETR could never propose the habit (old rule 4). The
  redesign has no stock content at all, so there is nothing of BETR's left to hold, and a list
  kept "just in case" is a list somebody wires back into a refusal by accident.

    checkPart    ONE BLANK of the front screen: refuses an empty blank and anyone's safety.
                 This is the only check the app calls.
    checkTest    the same two stops for a sentence with no blank around it.
    checkBelief  the old free-text sentence: empty, harm, a bare verdict ("I am a bad person"),
                 and a shape nudge. Nothing in the app reaches it — the front screen prints
                 "If I" and ", then", so every sentence made there is a conditional — and it is
                 kept because it is cheap, guards.test.js proves each branch, and the day a
                 sentence arrives by another road is not the day to find the check was deleted.

  A refusal carries a `reason` that is a KEY, not a sentence (B15): the words live in
  web/content/strings-en.js so they can be translated, and no phone number can ever creep into
  this file (B17 took two out of it).
*/
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else (root.Betr = root.Betr || {}).guards = api;
})(typeof self !== 'undefined' ? self : this, function () {

  /*
    Anyone's safety. Refused outright, with the crisis lines.

    ONE LIST FOR EVERY LANGUAGE, ON PURPOSE, and it is not indexed by the language the app is
    set to. A French speaker whose phone is in English writes French into the blanks, and a
    stop that only knew the interface language would let that straight through. Matching every
    language every time is strictly safer and it costs nothing. So: never split this per
    language, and never pass the language in.

    B16, 2026-09-16, and this is how the hole was found: the French app was walked, the
    founder's own example was typed into it in French — "Si je me tue, alors tout le monde ira
    mieux" — AND IT WAS LOCKED IN. The list was eleven English phrases, so the one hard stop
    in the whole product silently did not exist in French.

    THE FRENCH WORDS BELOW ARE MINE AND HAVE NOT BEEN REVIEWED. They mirror the English ones
    phrase for phrase. Two of them can fire on a sentence that meant nothing of the kind —
    "en finir" ("en finir avec ce projet") and "me tue" ("si je me tue à lui expliquer") — the
    same trade the English "end it" already makes. A stop that fires when it should not shows
    somebody a helpline they did not need; a stop that stays quiet is the harm this exists to
    prevent. That is the right way round, and it is still for the CBT reviewer to confirm.

    It is also, deliberately, still short. B56 gap (f) stands in both languages: this knows
    harm to YOURSELF, and a sentence about hurting somebody else goes through, though rule 3
    says "hurting anyone".
  */
  var HARM = [
    /* English */
    'suicide', 'suicidal', 'kill myself', 'end it', 'self harm', 'self-harm',
    'harm myself', 'hurt myself', 'cut myself', 'overdose', 'od',
    /* French (B16). 'suicide' and 'overdose' are the same word and are not repeated. */
    'suicidaire', 'me suicider', 'me tuer', 'me tue', 'en finir', 'en finis',
    'automutilation', 'me mutiler', 'me faire du mal', 'me blesser', 'me couper'
  ];

  var REASON = {
    harm: 'refusal.harm',
    verdict: 'refusal.verdict',
    notConditional: 'refusal.notConditional',
    noConsequence: 'refusal.noConsequence',
    emptyTest: 'refusal.emptyTest',
    emptyBelief: 'refusal.emptyBelief',
    emptyIf: 'refusal.emptyIf'
  };

  /* A nudge is a key too. Nothing in the app draws it (B32); see checkBelief. */
  var NUDGE = { shape: 'nudge.shape' };

  /*
    Word-boundary match, so "Betr" never trips anything and "method" never trips "od".

    Accents are folded before the strip (B16): the strip keeps only a-z, so without the fold
    an accented letter became a SPACE and split the word around it. Any language with accents
    would have had a harm list that could never match — quietly, with no test failing.

    NFD splits é into e plus a combining mark, and \p{Mn} is every combining mark there is, so
    this works for a language nobody has thought of yet. It is written that way rather than as
    a numeric range for a good reason: guards.test.js fails the build on three digits in a row
    in this file, because a phone number must never live here (B17), and a \u escape looks
    exactly like one. Keep it digit-free.
  */
  function hit(text, words) {
    var t = ' ' + String(text || '').toLowerCase()
      .normalize('NFD').replace(/\p{Mn}/gu, '')
      .replace(/[’']/g, '\'').replace(/[^a-z' ]+/g, ' ').replace(/\s+/g, ' ') + ' ';
    for (var i = 0; i < words.length; i++) {
      if (t.indexOf(' ' + words[i] + ' ') !== -1) return words[i];
    }
    return null;
  }

  /*
    One blank of "If I ___, then ___." `part` is 'if' or 'then' and decides ONE thing — which
    empty line is read out. It must not grow into a second set of rules for the second blank.
  */
  function checkPart(text, part) {
    var s = String(text || '').trim();
    if (!s) {
      return { ok: false, kind: 'empty',
        reason: part === 'if' ? REASON.emptyIf : REASON.emptyBelief };
    }
    var w = hit(s, HARM);
    if (w) return { ok: false, kind: 'harm', word: w, reason: REASON.harm };
    return { ok: true };
  }

  /* A sentence with no blank around it. Empty, and anyone's safety. Nothing else. */
  function checkTest(text) {
    var s = String(text || '').trim();
    if (!s) return { ok: false, kind: 'empty', word: null, reason: REASON.emptyTest };
    var w = hit(s, HARM);
    if (w) return { ok: false, kind: 'harm', word: w, reason: REASON.harm };
    return { ok: true };
  }

  /*
    The old free-text belief (loosened 2026-09-04, founder's call, after a test user was
    refused over a missing "then"). The shape rules are a nudge, not a refusal. Three stops
    stay hard, and none of them is a grammar preference:

      empty    there is nothing to test
      harm     the one wall, on this box as on every other
      verdict  "I am a bad person" is a CORE belief, and research §2.1 is explicit that a tool
               with no therapist must not go near one. A sentence with "if" in it is a
               conditional and is exempt: "I'm going to get fired if I ask" is a prediction.

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

    if (!conditional || s.split(' ').length < 5) {
      return { ok: true, soft: NUDGE.shape, kind: 'shape' };
    }

    return { ok: true };
  }

  /* The consequence half of a belief. Falls back to the whole belief. */
  function expectationFrom(belief) {
    var s = String(belief || '').trim().replace(/\s+/g, ' ');
    var m = s.match(/^if\b[^,]*,\s*(.+)$/i) || s.match(/^if\b.*?\bthen\b\s*(.+)$/i);
    var tail = m ? m[1] : s;
    tail = tail.replace(/^(then\s+)/i, '').trim();
    if (!tail) return s;
    return tail.charAt(0).toUpperCase() + tail.slice(1);
  }

  return {
    HARM: HARM,
    REASON: REASON,
    NUDGE: NUDGE,
    hit: hit,
    checkPart: checkPart,
    checkTest: checkTest,
    checkBelief: checkBelief,
    expectationFrom: expectationFrom
  };
});
