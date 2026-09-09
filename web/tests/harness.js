/*
  The smallest possible fake DOM, and a running copy of the app on top of it.

  Betr has no framework and no test browser, so this file carries about eighty lines of DOM:
  enough to hold an innerHTML string, find the elements the app wires handlers to, and click
  them. It is not a browser and does not pretend to be one — it cannot see layout, CSS, or
  anything a person would look at. What it can do is catch a crashing screen, a dead button
  and a broken guard, which is worth having between phone walks.

  The real walk is docs/journeys.md, on a phone, and this does not replace it.

  This is not itself a test file: node --test only picks up *.test.js, so nothing here runs
  on its own. It is required by loop.test.js and menu.test.js.

  B15 added three things to it, all of them things the app now does that could silently stop
  working: a real Intl.PluralRules, a <html> element to write lang and dir onto, and a record
  of what focus() was last called on. A second language is one more line in FILES.
*/
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const WEB = path.join(__dirname, '..');
const FILES = ['lib/theme.js', 'lib/guards.js', 'lib/rate.js', 'lib/store.js', 'lib/content.js', 'lib/where.js',
               'lib/i18n.js', 'content/strings-en.js',
               'content/worries.js', 'content/why.js', 'content/whats-going-on.js', 'content/places.js',
               'content/starts.js', 'content/examples.js',
               'content/zones.js', 'content/helplines.js', 'app.js'];


/*
  `focused` is the last element anything called focus() on. B15 moves focus to the new
  screen's heading on every repaint, because without it a screen reader is told nothing at
  all when the screen changes — so where focus went is now a thing worth asserting.
*/
let focused = null;

function makeEl(id) {
  return {
    _html: '', _id: id || null, _attrs: id ? { id } : null,
    value: '', textContent: '', onclick: null, children: {},
    get innerHTML() { return this._html; },
    set innerHTML(h) { this._html = h; this.children = parse(h); },
    focus() { focused = this; }, select() {}, setSelectionRange() {},
    getAttribute(n) { return this._attrs ? this._attrs[n] : null; },
    setAttribute(n, v) { (this._attrs = this._attrs || {})[n] = v; },
    querySelector(sel) { return find(this, sel); },
    querySelectorAll(sel) { return findAll(this, sel); }
  };
}

/*
  The app only ever reaches for elements by id or by a data- attribute, so that is all we
  index. A data- attribute goes in twice: once in the list the app walks, `[data-id]`, and
  once under its own value, `[data-cc="AU"]`, which is how a test picks one country out of
  two hundred and forty-seven without counting down the list.
*/
/*
  What the app escaped on the way out, undone on the way in. Only used for a box's contents:
  a textarea holds text, not markup, so this is the whole of it (see esc() in app.js).
*/
const unesc = (s) => s
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#39;/g, "'")
  .replace(/&amp;/g, '&');

function parse(html) {
  const kids = {};
  for (const m of html.matchAll(/id="([^"]+)"/g)) kids['#' + m[1]] = makeEl(m[1]);
  /*
    A box keeps what is written in it across a repaint, the way a real one does. Without this
    every re-render emptied the box, and a test could only ever check a screen that sends the
    person's words back — never one that hands them back, which is what a nudge does.
  */
  for (const m of html.matchAll(/<textarea[^>]*id="([^"]+)"[^>]*>([\s\S]*?)<\/textarea>/g)) {
    if (kids['#' + m[1]]) kids['#' + m[1]].value = unesc(m[2]);
  }
  /*
    B30. The build screen's two blanks are <input>s rather than boxes, and they keep what is
    written in them the same way — a repaint that emptied them would make every refusal look
    like the app had thrown the person's sentence away, which is the one thing it must not do.
  */
  for (const m of html.matchAll(/<input[^>]*>/g)) {
    const id = (m[0].match(/ id="([^"]+)"/) || [])[1];
    const val = (m[0].match(/ value="([^"]*)"/) || [])[1];
    if (id && kids['#' + id] && val !== undefined) kids['#' + id].value = unesc(val);
  }
  for (const m of html.matchAll(/data-([a-z]+)="([^"]+)"/g)) {
    const el = makeEl();
    el._attrs = { ['data-' + m[1]]: m[2] };
    const key = '[data-' + m[1] + ']';
    (kids[key] = kids[key] || []).push(el);
    kids['[data-' + m[1] + '="' + m[2] + '"]'] = el;
  }
  return kids;
}

function findAll(el, sel) {
  let out = [];
  const direct = el.children[sel];
  if (direct) out = out.concat(direct);
  for (const key of Object.keys(el.children)) {
    const kids = Array.isArray(el.children[key]) ? el.children[key] : [el.children[key]];
    for (const kid of kids) if (kid && kid.children) out = out.concat(findAll(kid, sel));
  }
  return out;
}
function find(el, sel) { return findAll(el, sel)[0] || null; }

/* ------------------------------------------------------- a running copy of the app */

/*
  boot(seed, env) — `env` is the phone this copy of the app thinks it is running on:

    { timeZone: 'Africa/Nairobi', languages: ['en-KE'] }

  Both are optional. Left out, the time zone is London and there is no language region, so a
  test that says nothing about where it is gets the UK. A test that cares says so (B17).

  B35 added a third: `dark: true` is a phone whose system is set to dark. Left out it is a
  light phone, which is what `matchMedia` returning false has always meant here.
*/
function boot(seed, env) {
  env = env || {};
  const timeZone = 'timeZone' in env ? env.timeZone : 'Europe/London';
  const languages = 'languages' in env ? env.languages : ['en'];
  const root = makeEl('app');
  /* The live region. It is outside #app in index.html so it survives every repaint. */
  const live = makeEl('say');
  const html = makeEl('html');
  focused = null;
  const mem = seed ? Object.assign({}, seed) : {};
  const box = {
    localStorage: {
      getItem: (k) => (k in mem ? mem[k] : null),
      setItem: (k, v) => { mem[k] = String(v); },
      removeItem: (k) => { delete mem[k]; }
    },
    navigator: { storage: { persist() {} }, languages, language: languages && languages[0] },
    /*
      Real Intl.DisplayNames, so the country list carries the names a browser would print,
      and a stubbed time zone, because that is the signal B17 turns on. A test can pass
      timeZone: null to be a phone whose browser will not say.
    */
    Intl: {
      DateTimeFormat: () => ({ resolvedOptions: () => ({ timeZone }) }),
      DisplayNames: Intl.DisplayNames,
      /* Real plural rules: lib/i18n.js picks "1 test" / "3 tests" and "1st" / "2nd" with them. */
      PluralRules: Intl.PluralRules
    },
    document: {
      documentElement: html,
      getElementById: (id) => (id === 'say' ? live : root),
      querySelector: (s) => (s.indexOf('betr-build') !== -1 ? { getAttribute: () => 'dev' } : null)
    },
    Date, JSON, Math, String, Array, Object, RegExp, Error
  };
  box.self = box;
  box.window = box;
  box.window.scrollTo = () => {};
  box.window.addEventListener = () => {};
  box.window.matchMedia = (q) => ({ matches: !!env.dark && String(q).indexOf('dark') !== -1 });
  vm.createContext(box);
  for (const f of FILES) {
    vm.runInContext(fs.readFileSync(path.join(WEB, f), 'utf8'), box, { filename: f });
  }

  const api = {
    mem,
    /* Everything currently on screen, including anything written into a child element. */
    html() {
      let h = root._html;
      for (const key of Object.keys(root.children)) {
        const kids = Array.isArray(root.children[key]) ? root.children[key] : [root.children[key]];
        for (const kid of kids) if (kid && kid._html) h += kid._html;
      }
      return h;
    },
    tap(sel, i) {
      const els = findAll(root, sel);
      const el = els[i || 0];
      assert.ok(el, 'no such control: ' + sel + '\non: ' + api.html().slice(0, 200));
      assert.ok(el.onclick, 'dead control: ' + sel + '\non: ' + api.html().slice(0, 200));
      el.onclick();
      return api;
    },
    type(sel, text) { find(root, sel).value = text; return api; },
    /* What a screen reader was told, and where the keyboard is (B15). */
    said() { return live.textContent; },
    focusedId() { return focused ? focused._id : null; },
    lang() { return html.getAttribute('lang'); },
    dir() { return html.getAttribute('dir'); },
    /* B35: light or dark, as written onto <html> by lib/theme.js. */
    look() { return html.getAttribute('data-theme'); },
    /* Read a box back. The export lands in a textarea's value, not in the markup. */
    valueOf(sel) { const el = find(root, sel); assert.ok(el, 'no such box: ' + sel); return el.value; },
    shows(s) { assert.ok(api.html().indexOf(s) !== -1, 'not on screen: ' + s + '\non: ' + api.html().slice(0, 300)); return api; },
    hides(s) { assert.ok(api.html().indexOf(s) === -1, 'still on screen: ' + s); return api; },
    /*
      B46. The screen with its tags taken off, so a sentence can be asserted whole even where
      part of it is wrapped in something.

      This exists because marking the carried word (B46) split every sentence carrying a hole
      into three nodes, and forty tests were asserting on raw markup — which had always been
      the fragile way to ask "is this sentence on screen", and only stopped working the day a
      span landed in the middle of one. Tags come off with no separator, which is what makes
      "…to <span>my sister</span> without…" read back as one sentence.

      `shows`/`hides` still exist and still read markup: use them for a class, an id or an
      attribute. Use these two for anything a person reads.
    */
    text() { return api.html().replace(/<[^>]*>/g, ''); },
    showsText(s) { assert.ok(api.text().indexOf(s) !== -1, 'not on screen: ' + s + '\nscreen reads: ' + api.text().slice(0, 400)); return api; },
    hidesText(s) { assert.ok(api.text().indexOf(s) === -1, 'still on screen: ' + s); return api; }
  };
  return api;
}

module.exports = { boot, makeEl, find, findAll };
