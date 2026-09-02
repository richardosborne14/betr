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

  function blank() {
    return { v: VERSION, stage: 'start', cur: null, done: [], seenInstall: false };
  }

  /* Anything we cannot vouch for is replaced, never repaired halfway. */
  function normalise(raw) {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return blank();
    var s = blank();
    if (typeof raw.stage === 'string') s.stage = raw.stage;
    if (raw.cur && typeof raw.cur === 'object' && !Array.isArray(raw.cur)) s.cur = raw.cur;
    if (Array.isArray(raw.done)) {
      s.done = raw.done.filter(function (d) {
        return d && typeof d === 'object' && typeof d.o === 'string';
      }).map(withLevel);
    }
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
    return (!state.done || !state.done.length) && !state.cur && state.seenInstall !== true;
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
  */
  function exportJSON(state) {
    var s = state || blank();
    return JSON.stringify({
      app: 'Betr',
      version: VERSION,
      exported: new Date().toISOString(),
      note: 'Everything Betr has ever stored on this device. There is no copy anywhere else.',
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
