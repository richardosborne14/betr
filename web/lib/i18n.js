/*
  Looking a word up, and nothing else (B15).

  This is not i18next. The founder's call, 2026-09-03, taking the recommendation in the B15
  task file: i18next would cost a dependency in a repo whose whole trust story is "small
  enough for a stranger to read in an evening", it cannot come from a CDN (rule 1 forbids it
  and the CSP blocks it outright), so it would have to be checked in as a minified blob with
  a licence to carry — and what it would mostly buy us is plural rules, which every browser
  already ships as Intl.PluralRules.

  Four jobs, and it must never grow a fifth:

    pick      which language file to use — what the person chose, else what the browser asks
              for, else English. "en-GB" and "en-Latn-GB" both find "en".
    t         look up a dotted key, fill in {placeholders}, fall back to English PER KEY so a
              half-translated language is still a working app rather than a blank one
    plural    { one, other } picked by Intl.PluralRules, which knows every language's rules
    ordinal   "1st", "2nd", "3rd" — the same machinery, type: 'ordinal'

  Nothing here is fetched. Every language ships inside the page (rule 1), so the airplane-mode
  proof holds in all of them, and choosing a language makes no request of any kind.

  What a key that does not exist gets you is a blank, not "result.ladder.title" — a person must
  never read a key off a screen. It is recorded instead, and web/tests/i18n.test.js walks every
  screen and fails the build if unknownKeys() is not empty. That is what "visible in tests"
  has to mean when the alternative on screen is worse than nothing.
*/
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else (root.Betr = root.Betr || {}).i18n = api;
})(typeof self !== 'undefined' ? self : this, function () {

  var BASE = 'en';

  /*
    `x instanceof Array` is not safe here: the string file and this file can be loaded into
    two different JavaScript realms (the tests run the app inside node's vm, and a native
    wrap loads it inside a webview), and an array made in one realm fails an instanceof
    against the other realm's Array. This asks what the value is rather than where it is from.
  */
  function isList(v) { return Object.prototype.toString.call(v) === '[object Array]'; }

  /* 'help.primer.1' walks down the tree. Anything missing on the way is simply missing. */
  function at(tree, key) {
    var node = tree;
    var parts = String(key).split('.');
    for (var i = 0; i < parts.length; i++) {
      if (!node || typeof node !== 'object') return null;
      node = node[parts[i]];
      if (node === undefined) return null;
    }
    return node === undefined ? null : node;
  }

  function fill(text, vars) {
    return String(text).replace(/\{([a-zA-Z]+)\}/g, function (whole, name) {
      if (vars && Object.prototype.hasOwnProperty.call(vars, name)) return String(vars[name]);
      return whole;
    });
  }

  /*
    Which file to read. The person's own choice first, then every language the browser asks
    for in its own order, each one cut back at the dashes until something matches.

    This is the ONLY place a language is decided, and it never looks at where anybody is.
    Language and country are two different questions (B17, lib/where.js): there are tens of
    millions of Spanish speakers in the United States, and sending them to a Madrid helpline
    because of their keyboard would be the exact harm B17 exists to prevent.
  */
  function pick(locales, chosen, prefer) {
    var want = [];
    if (chosen) want.push(chosen);
    if (prefer && prefer.length) Array.prototype.forEach.call(prefer, function (l) { want.push(l); });

    for (var i = 0; i < want.length; i++) {
      var tag = String(want[i] || '').toLowerCase();
      while (tag) {
        for (var code in locales) {
          if (Object.prototype.hasOwnProperty.call(locales, code) && code.toLowerCase() === tag) return code;
        }
        var cut = tag.lastIndexOf('-');
        tag = cut === -1 ? '' : tag.slice(0, cut);
      }
    }
    return BASE;
  }

  function create(locales, opts) {
    opts = opts || {};
    locales = locales || {};

    var code = pick(locales, opts.chosen, opts.prefer);
    var here = locales[code] || {};
    var base = locales[BASE] || {};
    var gaps = [];      /* in English but not in this language: falls back, and is listed */
    var unknown = [];   /* in neither: a bug, and the build fails on it */
    var rules = {};

    function raw(key) {
      var v = at(here.s, key);
      if (v === null) {
        if (code !== BASE && gaps.indexOf(key) === -1) gaps.push(key);
        v = at(base.s, key);
      }
      if (v === null && unknown.indexOf(key) === -1) unknown.push(key);
      return v;
    }

    /* Intl.PluralRules is in every browser this app runs on. A browser without it gets English. */
    function form(n, type) {
      try {
        if (!rules[type]) rules[type] = new Intl.PluralRules(code, { type: type });
        return rules[type].select(n);
      } catch (e) {
        return n === 1 && type === 'cardinal' ? 'one' : 'other';
      }
    }

    function choose(shapes, n) {
      var f = form(n, 'cardinal');
      if (typeof shapes[f] === 'string') return shapes[f];
      return typeof shapes.other === 'string' ? shapes.other : null;
    }

    function t(key, vars) {
      var v = raw(key);
      if (typeof v !== 'string') return '';
      return fill(v, vars);
    }

    /* One test / two tests. `n` is available to the sentence as {n} without being passed in. */
    function plural(key, n, vars) {
      var v = raw(key);
      var text = (v && typeof v === 'object' && !isList(v)) ? choose(v, n)
        : (typeof v === 'string' ? v : null);
      if (text === null) { if (unknown.indexOf(key) === -1) unknown.push(key); return ''; }
      var all = { n: n };
      if (vars) for (var k in vars) if (Object.prototype.hasOwnProperty.call(vars, k)) all[k] = vars[k];
      return fill(text, all);
    }

    function ordinal(n) {
      var v = raw('ordinal');
      if (!v || typeof v !== 'object') return String(n);
      var text = v[form(n, 'ordinal')];
      if (typeof text !== 'string') text = v.other;
      return typeof text === 'string' ? fill(text, { n: n }) : String(n);
    }

    /* A list, not a tree: whatever is not a string is handed back as it is (the nine sentences). */
    function list(key) {
      var v = raw(key);
      return isList(v) ? v : [];
    }

    return {
      code: code,
      lang: function () { return here.lang || code; },
      dir: function () { return here.dir || 'ltr'; },
      /* Every language in the build, named in its own words: Français, never French. */
      locales: function () {
        var out = [];
        for (var c in locales) {
          if (Object.prototype.hasOwnProperty.call(locales, c)) out.push({ code: c, name: locales[c].name || c });
        }
        return out.sort(function (a, b) { return a.name < b.name ? -1 : a.name > b.name ? 1 : 0; });
      },
      t: t,
      plural: plural,
      ordinal: ordinal,
      list: list,
      has: function (key) { return typeof at(here.s, key) === 'string' || typeof at(base.s, key) === 'string'; },
      gapKeys: function () { return gaps.slice(); },
      unknownKeys: function () { return unknown.slice(); }
    };
  }

  return { BASE: BASE, pick: pick, create: create };
});
