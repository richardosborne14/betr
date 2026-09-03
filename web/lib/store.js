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
  */
  var VERSION = 2;
  var OLD_RATES = { 80: 8, 55: 6, 30: 3, 10: 1 };

  /*
    `open` is every test that has been locked in and not yet finished. It was added by B8,
    when "New worry" became one tap away from every screen: before that, starting another
    worry silently overwrote whatever you had promised yourself you would do today.

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
  function blank() {
    return { v: VERSION, stage: 'start', cur: null, country: null, lang: null, open: [], done: [], seenInstall: false };
  }

  /* Anything we cannot vouch for is replaced, never repaired halfway. */
  function normalise(raw) {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return blank();
    var s = blank();
    if (typeof raw.stage === 'string') s.stage = raw.stage;
    if (raw.cur && typeof raw.cur === 'object' && !Array.isArray(raw.cur)) s.cur = raw.cur;
    if (Array.isArray(raw.open)) {
      s.open = raw.open.filter(function (t) {
        return t && typeof t === 'object' && !Array.isArray(t) && typeof t.test === 'string' && t.locked;
      });
    }
    if (Array.isArray(raw.done)) {
      s.done = raw.done.filter(function (d) {
        return d && typeof d === 'object' && typeof d.o === 'string';
      }).map(withLevel);
    }
    if (typeof raw.country === 'string' && /^[A-Z]{2}$/.test(raw.country)) s.country = raw.country;
    if (typeof raw.lang === 'string' && /^[a-zA-Z-]{2,12}$/.test(raw.lang)) s.lang = raw.lang;
    s.seenInstall = raw.seenInstall === true;
    return s;
  }

  /* A rung between 1 and 10, from this record, from the version before it, or the top. */
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
          lockedIn: t.locked || null,
          worry: t.label || t.id || null,
          belief: t.belief || null,
          expected: t.x || null,
          test: t.test || null,
          leftOut: t.drop || null
        };
      }),
      results: (s.done || []).map(function (d) {
        return {
          when: d.when || null,
          worry: d.label || d.id || null,
          belief: d.belief || null,
          expected: d.x || null,
          test: d.test || null,
          leftOut: d.drop || null,
          happened: d.o || null,
          stillSure: d.rateLabel || null,
          sureOutOfTen: typeof d.level === 'number' ? d.level : null
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
    create: create,
    exportJSON: exportJSON
  };
});
