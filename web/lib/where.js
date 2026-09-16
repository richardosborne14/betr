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
      The country's name, in the language the person is reading (B16, 2026-09-16 — until then
      it was always English).

      For the countries with a line, English is written by hand in helplines.js, article and
      all, so "In the United Kingdom" reads like English. That hand-written name IS ENGLISH and
      only English uses it. Every other language, and every country without a line, gets the
      browser's own name for it, which is why nothing is shipped for 250 countries in any
      language. If the browser has no list, the two-letter code is shown: ugly and honest.

      French does not get an article here on purpose. « en France », « au Canada », « aux
      États-Unis » all differ, so the French sentences are written to take a bare name after a
      colon — « France : » — and never need one. See strings-fr.js, crisis.
    */
    var displayNames = {};
    function browserNames(lang) {
      if (displayNames[lang] !== undefined) return displayNames[lang];
      try {
        displayNames[lang] = new Intl.DisplayNames([lang], { type: 'region' });
      } catch (e) {
        displayNames[lang] = false;
      }
      return displayNames[lang];
    }

    function nameFor(code, lang) {
      if (!known(code)) return '';
      var dn = browserNames(lang || 'en');
      if (dn) {
        try {
          var n = dn.of(code);
          if (n && n !== code) return n;
        } catch (e) { /* falls through to the code */ }
      }
      return code;
    }

    /* "the United Kingdom" — only ever right in English, and only for a country that has a line. */
    function inWords(code, lang) {
      var entry = lines[code];
      if ((lang || 'en') === 'en' && entry && entry.country) return entry.country;
      return nameFor(code, lang);
    }

    /*
      Every country, alphabetically by the name a person reads, in their language. The picker's
      whole content. localeCompare and not <, because < sorts « États-Unis » after Zimbabwe.
    */
    function list(lang) {
      return codes.map(function (code) {
        return { code: code, name: nameFor(code, lang) };
      }).sort(function (a, b) {
        return a.name.localeCompare(b.name, lang || 'en');
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
