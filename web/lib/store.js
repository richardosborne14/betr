/*
  Everything Betr remembers, and the only place it is written.

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

  var KEY = 'betr.v1';

  /*
    2 added `level`, the rung a belief sits on after that test (rate.js). Version 1 stored
    `rate`, one of 80/55/30/10, which could not show movement. An old record is carried over
    onto the nearest rung rather than dropped, so nobody loses a result to the change.

    3 gave every result and every waiting test an id of its own, `rid`, and every result the
    word that was tapped, `move`, next to the rung it landed on (B9). Neither changes a
    single thing a person sees. What they change is what the record can survive: two devices
    each adding results without knowing about the other, and then the two histories being put
    together — by whatever sync eventually is, or by two exported files being joined by hand.

    Before this, a result carried the WORRY's id, shared by every test of that worry, so
    there was no way to tell "the same result, seen twice" from "two results that happen to
    look alike". And it carried the rung it landed on but not the word that took it there, so
    interleaving two histories left two rungs each claiming to be the latest and no way to
    work out what the person actually did. `move` makes the ladder the taps replayed in time
    order, which comes out the same however the results arrive.

    An old record loses nothing: `level` is still written, it is still the fallback for any
    ladder where a single result predates `move`, and normalise() gives an old record an id
    derived from itself, so the same file normalised twice gets the same ids.
  */
  /*
    4 is B30's, 2026-09-08, and it is a version bump with NO DATA MIGRATION — which is worth
    saying out loud, because the usual reason to bump is that something has to be converted.

    What changed is the shape of a NEW record. A test a person builds now carries `ifPart` and
    `thenPart` (the two halves of the sentence they typed) beside the joined `belief`, and it
    carries an `id` of its own for the first time. Before this, an own test had `id: null` and
    rate.keyOf() grouped its ladder by the sentence itself — so correcting a typo in the
    sentence started a new ladder and the old one looked lost. On a side path that was a
    wrinkle; as the main road it is a bug, so an own test gets a stable id at the moment it is
    built and keeps it.

    Nothing older needs converting, and that is by design rather than by luck: an own record
    made before today still has `id: null`, and rate.keyOf() still falls back to the sentence
    for exactly those. Their ladders draw the same rungs they drew yesterday, forever. The
    number is here so an exported file says which shape it is, and so the next change has
    something to migrate FROM.
  */
  /*
    5 is B40's, 2026-09-09, and it is the SECOND version bump in a row with NO DATA MIGRATION.

    What changed is what a record is allowed to know about itself. Until today, whether a test
    was one of BETR's or one of the person's own was decided by comparing their words to the
    stock sentence, letter for letter (app.js sameAsStock). Under the templates B41 builds, a
    filled-in sentence differs from its skeleton EVERY TIME, by design — so every templated run
    would have been a stranger to itself, every one would have started at the top of the ladder,
    and the one number in the product would silently never have moved. So the road decides now,
    not the words: while the person is on a stock item's road, the record keeps that item's id.

    Three fields ride along with it, and NONE OF THEM KEYS ANYTHING — rate.keyOf() still groups
    a ladder by the worry's id alone, because a worry's three predictions share one ladder
    (CLAUDE.md rule 5). They are for redrawing, for "Test this again" coming back with the
    person's own words in it, and for an export that says what was actually done:

      prediction  which of the item's three it started from, by index, or null
      slots       what the person typed into a skeleton's holes, name -> words (B41 fills it)
      size        which of the three sizes the test was done at (B42 fills it)

    Nothing older needs converting, again by design rather than by luck: a v4 record has none of
    these, every one of them reads as absent, and its ladder draws the rungs it drew yesterday.
    The number is here so an exported file says which shape it is.
  */
  var VERSION = 5;
  var OLD_RATES = { 80: 8, 55: 6, 30: 3, 10: 1 };

  /*
    An id for one result, or for one test locked in and waiting. Random, made once, never
    shown to anybody and never sent anywhere — there is nowhere to send it (rule 1). It says
    only "this record and that record are the same record", which is the whole of what a
    merge needs and no more than that.

    crypto.randomUUID is in every browser Betr supports. The fallback is there because it
    costs four lines and because the app must not depend on it being there.
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
    An id for a record made before there were ids, worked out from the record itself so that
    normalising the same file twice, on two devices or on two days, gets the same answer.
    FNV-1a twice over, for sixteen hex characters: no dependency, and nothing here is a
    secret, so a fast little hash is the right tool.
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

  /*
    What makes one old record different from another: when it was made, and which worry it
    belongs to. The worry is spelled out here rather than borrowed from rate.keyOf(), because
    this file has no business knowing how the ladder groups things and rate.js has no business
    knowing how a record is stored.

    `n` counts records that come out identical on both counts — two taps in the same
    millisecond on the same worry, which the app cannot produce but a joined file could. They
    get different ids, because dropping one of two real results would be worse than carrying
    a duplicate.
  */
  function withId(d, stamp, counts) {
    if (typeof d.rid === 'string' && d.rid) return d;
    var seed = (stamp || '') + '|' + (d.source || '') + '|' + (d.id || '') + '|' + (d.belief || '');
    var slot = '#' + seed;
    counts[slot] = (counts[slot] || 0) + 1;
    d.rid = stableId(seed + '|' + counts[slot]);
    return d;
  }

  /*
    The same record twice is one record. This is the only thing in v1 that a join needs and
    cannot do for itself, and it is two lines, so it lives here: concatenate two exports'
    results into one `done` and loading the file settles it.

    Records made before v3 are the exception, and honestly so: their ids are derived from
    what they contain, so a file joined to itself gives the second copy a different `n` and
    both are kept. There is no identity in an old record to recover. That is why B9 exists.
  */
  function dedupe(list) {
    var seen = {};
    var out = [];
    for (var i = 0; i < list.length; i++) {
      var slot = '#' + list[i].rid;
      if (seen[slot]) continue;
      seen[slot] = true;
      out.push(list[i]);
    }
    return out;
  }

  /*
    `open` is every test that has been locked in and not yet finished. It was added by B8,
    when the bottom row put a new test one tap away from every screen: before that, starting
    another one silently overwrote whatever you had promised yourself you would do today.

    There is no cap on how many are in here, on purpose (B8; research §3.1 and §3.3 — the
    risk in self-help is stopping, not doing too much). Nothing counts them, and nothing here
    is ever ordered by how long it has been waiting.

    It needs no version bump: a state saved before B8 simply has no `open`, and normalise
    gives it an empty one.

    `country` is the one B17 added, and it is the only thing BETR has ever stored about where
    a person is. Two letters, chosen by them off a list, used for one thing: which helpline
    number is on the crisis block. Null means we are guessing from the phone's time zone,
    which is read fresh every time it is needed and never written down. It is not sent
    anywhere — there is nowhere to send it — and it changes nothing else in the app.

    `lang` is B15's, and it is a different question from `country` on purpose (lib/i18n.js
    and lib/where.js never touch each other). Null means "whatever the browser asks for".
    Every language is already in the page, so choosing one fetches nothing.

    A NEW FIELD GOES IN THREE PLACES, not one: blank(), normalise() and isEmpty(). B17 put
    `country` in the first two, and a person's chosen country was thrown away on the next
    save because isEmpty() still thought the record was empty. Both of these are in all three.
  */
  /*
    `seen` is B31's, and it counts opens so the front screen's worked example is the NEXT one
    rather than a shuffle. It is the one stored field that isEmpty() deliberately ignores: a
    BETR that has never been used, and one that has just been wiped, must leave nothing at all
    behind, and which example comes next is not something anybody would miss.
  */
  function blank() {
    return { v: VERSION, stage: 'start', cur: null, country: null, lang: null, open: [], done: [], seenInstall: false, seen: 0 };
  }

  /* Anything we cannot vouch for is replaced, never repaired halfway. */
  function normalise(raw) {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return blank();
    var s = blank();
    if (typeof raw.stage === 'string') s.stage = raw.stage;
    if (raw.cur && typeof raw.cur === 'object' && !Array.isArray(raw.cur)) s.cur = raw.cur;
    if (Array.isArray(raw.open)) {
      var openCounts = {};
      s.open = dedupe(raw.open.filter(function (t) {
        return t && typeof t === 'object' && !Array.isArray(t) && typeof t.test === 'string' && t.locked;
      }).map(function (t) { return withId(t, t.locked, openCounts); }));
    }
    if (Array.isArray(raw.done)) {
      var doneCounts = {};
      s.done = dedupe(raw.done.filter(function (d) {
        return d && typeof d === 'object' && typeof d.o === 'string';
      }).map(withLevel).map(function (d) { return withId(d, d.when, doneCounts); }));
    }
    if (typeof raw.country === 'string' && /^[A-Z]{2}$/.test(raw.country)) s.country = raw.country;
    if (typeof raw.lang === 'string' && /^[a-zA-Z-]{2,12}$/.test(raw.lang)) s.lang = raw.lang;
    s.seenInstall = raw.seenInstall === true;
    if (typeof raw.seen === 'number' && raw.seen === raw.seen && raw.seen >= 0) {
      s.seen = Math.floor(raw.seen);
    }
    return s;
  }

  /*
    A rung between 1 and 10, from this record, from the version before it, or the top.

    Still written, still read. `move` is the better answer (B9) but it can only be the answer
    where every result in a ladder has one, and a phone that has been used since before v3
    has ladders where some do and some do not. Those draw from `level`, exactly as they did
    the day before the change. Nobody loses a result to a version bump; that is the whole
    point of there being a version.
  */
  function withLevel(d) {
    var n = d.level;
    if (typeof n !== 'number' || n !== n) n = OLD_RATES[d.rate];
    if (typeof n !== 'number') n = 10;
    n = Math.round(n);
    d.level = n < 1 ? 1 : (n > 10 ? 10 : n);
    return d;
  }

  /* Nothing a person would miss: no results, no test in flight, nothing they have dismissed. */
  function isEmpty(state) {
    if (!state) return true;
    return (!state.done || !state.done.length) && (!state.open || !state.open.length) &&
      !state.cur && state.seenInstall !== true && !state.country && !state.lang;
  }

  function create(storage) {
    return {
      key: KEY,

      load: function () {
        try {
          var raw = storage.getItem(KEY);
          if (!raw) return blank();
          return normalise(JSON.parse(raw));
        } catch (e) {
          return blank();
        }
      },

      /*
        Returns true if it actually persisted, so the app can tell the person if it didn't.

        A state with nothing in it removes the key rather than writing an empty record. So a
        Betr that has never been used, and a Betr that has just been wiped, leave nothing at
        all behind — which is what "delete everything" ought to mean, and what someone poking
        around in their browser storage after tapping it should find.
      */
      save: function (state) {
        try {
          if (isEmpty(state)) {
            storage.removeItem(KEY);
            return true;
          }
          storage.setItem(KEY, JSON.stringify(state));
          return true;
        } catch (e) {
          return false;
        }
      },

      clear: function () {
        try {
          storage.removeItem(KEY);
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

    The one sentence in it is handed in by the caller (B15), because it is a sentence a person
    reads and every one of those lives in web/content/strings-en.js. Left out, the file simply
    has no note in it; nothing else changes.
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
      waiting: (s.open || []).map(function (t) {
        return {
          id: t.rid || null,
          lockedIn: t.locked || null,
          /*
            The name of the thing, as a person would recognise it. A borrowed test has a label;
            one they built has no label and its own sentence is its name (B30). Never the id —
            an own id is a random string and means nothing to whoever opens this file.
          */
          worry: t.label || t.belief || null,
          belief: t.belief || null,
          expected: t.x || null,
          test: t.test || null,
          leftOut: t.drop || null,
          /*
            B40's three. `prediction` is 1, 2 or 3 as a person would count them rather than
            the index the app holds — this file is meant to be read by whoever opens it, and
            nobody outside a program counts from nought. All three are left out entirely
            where there is nothing to say, so a free-text test's entry looks exactly as it
            did before today.
          */
          prediction: typeof t.prediction === 'number' ? t.prediction + 1 : undefined,
          filledIn: t.slots && Object.keys(t.slots).length ? t.slots : undefined,
          size: t.size || undefined
        };
      }),
      results: (s.done || []).map(function (d) {
        return {
          /*
            The id and the tapped word are here so that two of these files can be JOINED and
            not merely read: without the id there is no telling one result from another that
            looks like it, and without the word there is no working out what the person did
            when two devices' rungs disagree. `stillSure` stays, because it is the sentence
            they actually tapped and this file is meant to be readable by whoever opens it.
          */
          id: d.rid || null,
          when: d.when || null,
          worry: d.label || d.belief || null,
          belief: d.belief || null,
          expected: d.x || null,
          test: d.test || null,
          leftOut: d.drop || null,
          happened: d.o || null,
          stillSure: d.rateLabel || null,
          stillSureKey: d.move || null,
          sureOutOfTen: typeof d.level === 'number' ? d.level : null,
          /* B40's three, as above: counted from one, and absent where there is nothing. */
          prediction: typeof d.prediction === 'number' ? d.prediction + 1 : undefined,
          filledIn: d.slots && Object.keys(d.slots).length ? d.slots : undefined,
          size: d.size || undefined
        };
      })
    }, null, 2);
  }

  return {
    KEY: KEY,
    VERSION: VERSION,
    blank: blank,
    isEmpty: isEmpty,
    normalise: normalise,
    withLevel: withLevel,
    rid: rid,
    create: create,
    exportJSON: exportJSON
  };
});
