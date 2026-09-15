/*
  Everything BETR remembers, and the only place it is written.

  Rules this file exists to keep:
    - one versioned key, so a future shape can migrate instead of vomiting
    - every read and every write inside try/catch: Safari in private mode throws on write,
      and a person in private mode should still get a working app, just a forgetful one
    - the app renders correctly with nothing stored, and with garbage stored
    - export is a file the person can read, and delete leaves nothing behind

  Storage is injected rather than reached for, so the tests can hand it a stub and a
  throwing stub without a browser.
*/
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else (root.Betr = root.Betr || {}).store = api;
})(typeof self !== 'undefined' ? self : this, function () {

  /*
    B56, 2026-09-15: one prediction, locked in, and your own results read back.

      betr.v2  { v: 6, stage, at, country, lang, seenInstall,
                 predictions: [ { id, sentence, made, locked, away,
                                  results: [ { tag, text, day, was? } ] } ] }

    B56 §5 calls this `betr.v5` and the thing before it `betr.v4`. Neither name was ever on a
    phone: every BETR from B1 to B55 wrote ONE key, `betr.v1`, and bumped the `v` INSIDE the
    record, up to 5. So the new shape gets the second key there has ever been, `betr.v2`, and
    the record's own `v` carries on counting from 5, so an exported file from either era says
    which one it is.

    `id`       random, made once, never the sentence — fixing a typo must not look like losing
               your history (the reason rate.keyOf() gave, and it still holds)
    `sentence` the whole "If I ___, then ___." as it was locked in. Never edited afterwards
    `made`     the day it was first locked in. A day, not a clock time: YYYY-MM-DD, local
    `locked`   the day it was locked in and not yet done, or null. Lock it in and Same again
               tomorrow set it; Keep it clears it; Not today leaves it exactly as it was.
               B56 §5 left this field out, and the screens cannot be drawn without it: "locked
               in and untested" is a state a prediction with three results can be in
    `away`     Done with this one. It moves the card under Put away and changes nothing else
    `tag`      'yeah', 'sort' or 'not' — the answer to "Did it go how you expected?" — or null
               for a result carried over from the old app, which never asked that question
    `text`     what happened, in their own words, exactly as typed
    `day`      the day it was kept, or null if the old record never said
    `was`      only on a carried-over result: the old app's own fields for it, kept so that
               nothing a person wrote is lost to the redesign
  */
  var KEY = 'betr.v2';
  var OLD_KEY = 'betr.v1';
  var VERSION = 6;
  var TAGS = ['yeah', 'sort', 'not'];
  var DAY = /^\d{4}-\d{2}-\d{2}$/;

  /*
    An id for one prediction. Random, made once, never shown to anybody and never sent
    anywhere — there is nowhere to send it (rule 1). crypto.randomUUID is in every browser
    BETR supports; the fallback costs four lines and means the app does not depend on it.
  */
  function rid() {
    if (typeof crypto !== 'undefined' && crypto && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }
    var out = '';
    for (var i = 0; i < 8; i++) {
      out += Math.floor(Math.random() * 0x10000 + 0x10000).toString(16).slice(1);
    }
    return out;
  }

  /*
    An id worked out from the thing itself, for a prediction carried over from the old record,
    so that migrating the same phone twice — say the first write failed — gets the same ids.
    FNV-1a twice over, for sixteen hex characters. Nothing here is a secret.
  */
  function fnv(s, h) {
    for (var i = 0; i < s.length; i++) {
      h = (h ^ s.charCodeAt(i)) >>> 0;
      h = (h + (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24)) >>> 0;
    }
    return ('0000000' + h.toString(16)).slice(-8);
  }
  function stableId(seed) {
    return fnv(seed, 0x811c9dc5) + fnv(seed, 0x9dc5811c);
  }

  function pad(n) { return (n < 10 ? '0' : '') + n; }

  /* The local day a moment fell on, as YYYY-MM-DD. Never a clock time: nothing needs one. */
  function dayOf(when) {
    var d = typeof when === 'string' || typeof when === 'number' ? new Date(when) : when;
    if (!d || typeof d.getTime !== 'function' || d.getTime() !== d.getTime()) return null;
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }

  function today() { return dayOf(new Date()); }

  function blank() {
    return { v: VERSION, stage: 'front', at: null, predictions: [], country: null, lang: null, seenInstall: false };
  }

  function isRecord(x) { return !!x && typeof x === 'object' && !Array.isArray(x); }

  /* Anything we cannot vouch for is dropped, never repaired halfway. */
  function cleanResult(r) {
    if (!isRecord(r) || typeof r.text !== 'string' || !r.text.trim()) return null;
    var out = {
      tag: TAGS.indexOf(r.tag) !== -1 ? r.tag : null,
      text: r.text,
      day: typeof r.day === 'string' && DAY.test(r.day) ? r.day : null
    };
    if (isRecord(r.was)) out.was = r.was;
    return out;
  }

  function cleanPrediction(p) {
    if (!isRecord(p) || typeof p.id !== 'string' || !p.id) return null;
    if (typeof p.sentence !== 'string' || !p.sentence.trim()) return null;
    return {
      id: p.id,
      sentence: p.sentence,
      made: typeof p.made === 'string' && DAY.test(p.made) ? p.made : null,
      locked: typeof p.locked === 'string' && DAY.test(p.locked) ? p.locked : null,
      away: p.away === true,
      results: Array.isArray(p.results) ? p.results.map(cleanResult).filter(Boolean) : []
    };
  }

  function normalise(raw) {
    if (!isRecord(raw)) return blank();
    var s = blank();
    if (typeof raw.stage === 'string') s.stage = raw.stage;
    if (typeof raw.at === 'string' && raw.at) s.at = raw.at;
    if (Array.isArray(raw.predictions)) {
      var seen = {};
      raw.predictions.forEach(function (p) {
        var clean = cleanPrediction(p);
        if (!clean || seen['#' + clean.id]) return;
        seen['#' + clean.id] = true;
        s.predictions.push(clean);
      });
    }
    if (typeof raw.country === 'string' && /^[A-Z]{2}$/.test(raw.country)) s.country = raw.country;
    if (typeof raw.lang === 'string' && /^[a-zA-Z-]{2,12}$/.test(raw.lang)) s.lang = raw.lang;
    s.seenInstall = raw.seenInstall === true;
    return s;
  }

  /*
    The old record, from B1 to B55: `done` (results), `open` (tests locked in and waiting) and
    `archived` (ladder keys), all under `betr.v1`. B56 §5 says how it comes across.

    ONE PREDICTION PER SENTENCE. Every old result and every waiting test carries the sentence
    it tested, `belief`, and that becomes the prediction. A stock worry offered three sentences
    and shared one ladder between them (old rule 5), so a person who tested two of its three
    gets two predictions here — which is what they actually wrote down, and the ladder that
    joined them is gone.

    WHAT HAPPENED IS KEPT WORD FOR WORD, and nothing else a person wrote is thrown away either:
    what they expected, what they did and what they left out ride along in `was`, with the
    words they tapped when they re-rated, so the export still has all of it.

    THE TAG IS NULL, AND THAT IS A DECISION, NOT A GAP. B56 §5 proposed reading a tag off the
    old re-rate — "a lot less sure" as Yeah!, and so on — and marked it as a guess. It is the
    wrong way round for the question the new app asks. "Did it go how you expected?" about "If
    I say no, then they'll think I'm selfish" is answered Yeah! when they DID think it; the old
    "a lot less sure" meant they did not. And turning it round does not rescue it: the re-rate
    was how sure a person still felt, not what happened, and the fixture phone below has "Still
    sure" beside "He said fair enough and got his own coffee". Any tag here would be BETR
    deciding how somebody's day went, and printing it in capitals beside their own words. So an
    old result shows its day and its words, and no tag; `was.move` is kept, so if the founder
    wants a mapping later it can be applied without anyone having lost anything.

    `archived` held ladder keys ("stock:<worry id>", "own:<id or sentence>"). A prediction whose
    records carry one of those keys comes across put away.

    Nothing carries over that was a draft (`cur`), the example counter (`seen`) or where the
    old app had got to (`stage`): a person opening the new app starts on the front screen.
  */
  function fromOld(raw) {
    var s = blank();
    if (!isRecord(raw)) return s;
    var archived = Array.isArray(raw.archived) ? raw.archived : [];
    var bySentence = {};

    function ladderKey(d) {
      return d.source === 'own' ? 'own:' + (d.id || d.belief || '') : 'stock:' + (d.id || d.label || '');
    }

    function predictionFor(d) {
      var words = typeof d.belief === 'string' ? d.belief.replace(/\s+/g, ' ').trim() : '';
      if (!words) return null;
      var p = bySentence['#' + words];
      if (!p) {
        p = bySentence['#' + words] = {
          id: stableId('prediction|' + words), sentence: words, made: null, locked: null, away: false, results: []
        };
        s.predictions.push(p);
      }
      if (archived.indexOf(ladderKey(d)) !== -1) p.away = true;
      return p;
    }

    function earliest(p, day) { if (day && (!p.made || day < p.made)) p.made = day; }

    /* Oldest first by the clock, array position as the tie-break (B9). */
    var done = (Array.isArray(raw.done) ? raw.done : [])
      .map(function (d, i) { return { d: d, i: i, t: isRecord(d) ? Date.parse(d.when) : NaN }; })
      .filter(function (e) { return isRecord(e.d) && typeof e.d.o === 'string' && e.d.o.trim(); })
      .sort(function (a, b) {
        var x = a.t === a.t ? a.t : Infinity;
        var y = b.t === b.t ? b.t : Infinity;
        return x === y ? a.i - b.i : x - y;
      });

    done.forEach(function (e) {
      var d = e.d;
      var p = predictionFor(d);
      if (!p) return;
      var day = dayOf(d.when);
      var was = {};
      if (typeof d.x === 'string' && d.x) was.expected = d.x;
      if (typeof d.test === 'string' && d.test) was.did = d.test;
      if (typeof d.drop === 'string' && d.drop) was.leftOut = d.drop;
      if (typeof d.rateLabel === 'string' && d.rateLabel) was.stillSure = d.rateLabel;
      if (typeof d.move === 'string' && d.move) was.move = d.move;
      var r = { tag: null, text: d.o, day: day };
      if (Object.keys(was).length) r.was = was;
      p.results.push(r);
      earliest(p, day);
    });

    (Array.isArray(raw.open) ? raw.open : []).forEach(function (w) {
      if (!isRecord(w) || !w.locked) return;
      var p = predictionFor(w);
      if (!p) return;
      var day = dayOf(w.locked);
      p.locked = day || today();
      earliest(p, day);
    });

    s.predictions.forEach(function (p) { if (!p.made) p.made = p.locked; });
    s.country = raw.country;
    s.lang = raw.lang;
    s.seenInstall = raw.seenInstall;
    return normalise(s);
  }

  /* Nothing a person would miss: no prediction, and nothing they chose or dismissed. */
  function isEmpty(state) {
    if (!state) return true;
    return (!state.predictions || !state.predictions.length) &&
      state.seenInstall !== true && !state.country && !state.lang;
  }

  function create(storage) {
    return {
      key: KEY,

      /*
        The new key if there is one. If there is not, the old one, carried across. Rubbish
        under the new key is a blank app — it is never "rescued" from the old key, because the
        old key only survives until the first successful write under the new one.
      */
      load: function () {
        try {
          var raw = storage.getItem(KEY);
          if (raw) return normalise(JSON.parse(raw));
          var old = storage.getItem(OLD_KEY);
          if (old) return fromOld(JSON.parse(old));
          return blank();
        } catch (e) {
          return blank();
        }
      },

      /*
        Returns true if it actually persisted, so the app can tell the person if it didn't.

        A state with nothing in it removes the key rather than writing an empty record, so a
        BETR that has never been used and one that has just been wiped leave nothing behind.
        The old key goes the moment the new one is safely written, and not a moment before:
        if the write throws, the old record is still there to be carried across next time.
      */
      save: function (state) {
        try {
          if (isEmpty(state)) {
            storage.removeItem(KEY);
            storage.removeItem(OLD_KEY);
            return true;
          }
          storage.setItem(KEY, JSON.stringify(state));
          storage.removeItem(OLD_KEY);
          return true;
        } catch (e) {
          return false;
        }
      },

      clear: function () {
        try {
          storage.removeItem(KEY);
          storage.removeItem(OLD_KEY);
          return true;
        } catch (e) {
          return false;
        }
      }
    };
  }

  /*
    What leaves the phone only when the person taps export, and only to where they send it.
    Kept boring on purpose: a person who opens this file should understand it at a glance.
    A prediction that is put away is in here exactly like any other (B56 §3 screen 6).

    The one sentence in it is handed in by the caller (B15), because every sentence a person
    reads lives in web/content/strings-en.js.
  */
  function exportJSON(state, note) {
    var s = state || blank();
    return JSON.stringify({
      app: 'BETR',
      version: VERSION,
      exported: new Date().toISOString(),
      note: note || undefined,
      /* Null unless they picked one themselves. A guess from the time zone is never stored. */
      country: s.country || null,
      predictions: (s.predictions || []).map(function (p) {
        return {
          id: p.id,
          prediction: p.sentence,
          made: p.made || null,
          lockedIn: p.locked || undefined,
          putAway: p.away || undefined,
          /* Oldest first, the order they happened in. */
          results: p.results.map(function (r) {
            return { day: r.day, howItWent: r.tag, happened: r.text, before: r.was };
          })
        };
      })
    }, null, 2);
  }

  return {
    KEY: KEY,
    OLD_KEY: OLD_KEY,
    VERSION: VERSION,
    TAGS: TAGS,
    blank: blank,
    isEmpty: isEmpty,
    normalise: normalise,
    fromOld: fromOld,
    rid: rid,
    dayOf: dayOf,
    today: today,
    create: create,
    exportJSON: exportJSON
  };
});
