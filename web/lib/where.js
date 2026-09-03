/*
  Which country to show a helpline for, and how the app finds out (B17).

  Everything here runs on the device and reads three things the browser already knows. It
  makes no request, asks no permission, touches no sensor, and stores nothing except the
  country a person picked for themselves. The Geolocation API is not used and never will be:
  a private mental-health app asking for your location is the most alarming thing it could
  do, and it would break CLAUDE.md rule 1 twice over.

  In order, each beating the one below it:

    1. what the person chose, if they ever chose. Theirs, so it wins.
    2. the time zone — Intl.DateTimeFormat().resolvedOptions().timeZone. "Africa/Lagos" is
       Nigeria. content/zones.js is that map. This is the strong signal.
    3. the region on the end of a language tag: en-GB, pt-BR, es-MX. Often absent, free when
       it is there, and only consulted when the time zone said nothing.
    4. nothing. Which is a real answer and the app handles it honestly, by naming no number
       at all rather than guessing one.

  Language and country are two different questions and this file couples them nowhere. There
  are tens of millions of Spanish speakers in the United States; sending them to a Madrid
  number is exactly the failure B17 exists to prevent. Step 3 reads the region subtag only,
  never the language, and it is the weakest signal on purpose.
*/
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else (root.Betr = root.Betr || {}).where = api;
})(typeof self !== 'undefined' ? self : this, function () {

  var CODE = /^[A-Z]{2}$/;

  function create(zones, helplines) {
    var byZone = {};
    var codes = [];

    Object.keys(zones || {}).forEach(function (code) {
      codes.push(code);
      String(zones[code]).split(' ').forEach(function (z) { if (z) byZone[z] = code; });
    });
    codes.sort();

    var lines = (helplines && helplines.countries) || {};

    /* "Africa/Lagos" -> "NG". Anything not in the map, including EST and UTC, is nothing. */
    function fromTimeZone(tz) {
      if (!tz || typeof tz !== 'string') return null;
      return byZone[tz] || null;
    }

    /*
      "en-GB" -> "GB". The region subtag is the second or third part and is always two
      letters; "en-Latn-GB" puts a script in between, and "en" has no region at all.
    */
    function fromLanguages(langs) {
      var list = [];
      if (typeof langs === 'string') list = [langs];
      else if (langs && langs.length) list = Array.prototype.slice.call(langs);

      for (var i = 0; i < list.length; i++) {
        var parts = String(list[i] || '').split('-');
        for (var j = 1; j < parts.length; j++) {
          var maybe = parts[j].toUpperCase();
          if (CODE.test(maybe) && codes.indexOf(maybe) !== -1) return maybe;
        }
      }
      return null;
    }

    /* env is { timeZone, languages }, read off the browser by app.js and passed in here. */
    function guess(env) {
      env = env || {};
      return fromTimeZone(env.timeZone) || fromLanguages(env.languages) || null;
    }

    function known(code) {
      return typeof code === 'string' && CODE.test(code) && codes.indexOf(code) !== -1;
    }

    /* The person's own choice beats every guess, and an unknown code is thrown away. */
    function resolve(chosen, env) {
      if (known(chosen)) return chosen;
      return guess(env);
    }

    function linesFor(code) {
      var entry = lines[code];
      return entry && entry.lines ? entry.lines : [];
    }

    /*
      The country's name. For the countries with a line it is written by hand in
      helplines.js, article and all, so "In the United Kingdom" reads like English. For
      everywhere else the browser's own list is used, which is why nothing is shipped for it.
      If the browser has no list, the two-letter code is shown, which is ugly and honest.
    */
    var displayNames = null;
    function browserNames() {
      if (displayNames !== null) return displayNames;
      try {
        displayNames = new Intl.DisplayNames(['en'], { type: 'region' });
      } catch (e) {
        displayNames = false;
      }
      return displayNames;
    }

    function nameFor(code) {
      if (!known(code)) return '';
      var dn = browserNames();
      if (dn) {
        try {
          var n = dn.of(code);
          if (n && n !== code) return n;
        } catch (e) { /* falls through to the code */ }
      }
      return code;
    }

    /* "the United Kingdom" — only ever right for a country that has a line. */
    function inWords(code) {
      var entry = lines[code];
      return (entry && entry.country) || nameFor(code);
    }

    /* Every country, alphabetically by the name a person reads. The picker's whole content. */
    function list() {
      return codes.map(function (code) {
        return { code: code, name: nameFor(code) };
      }).sort(function (a, b) {
        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
      });
    }

    return {
      fromTimeZone: fromTimeZone,
      fromLanguages: fromLanguages,
      guess: guess,
      resolve: resolve,
      known: known,
      linesFor: linesFor,
      nameFor: nameFor,
      inWords: inWords,
      list: list
    };
  }

  return { create: create };
});
