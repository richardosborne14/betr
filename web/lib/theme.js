/*
  Light or dark, and the one thing in BETR that remembers something a person did not write.

  B35, 2026-09-08, founder's call: "I actually liked the light mode … can we do light mode by
  default". Until today BETR wore whatever the phone wore — `prefers-color-scheme` and nothing
  else — and there was no way to say otherwise. Now:

    - LIGHT IS THE DEFAULT, whatever the phone is set to
    - one chip in the top corner switches it, on every screen
    - the choice is remembered, in a key of its own

  WHY THIS FILE IS LOADED IN THE HEAD AND NOT WITH THE REST. The choice has to be on <html>
  before the stylesheet is asked for, or somebody who chose dark gets a white flash on every
  screen. app.js is the last script on the page, which is far too late. So this is the first,
  it is twenty lines, and it touches nothing but one attribute and one meta tag.

  There is no inline script doing it instead, and there cannot be: the page's own CSP is
  `script-src 'self'`, which blocks inline script outright. That is deliberate (rule 1) and
  this file is the shape that respects it.

  A SEPARATE KEY, ON PURPOSE. This is not part of the record. It is not exported, it does not
  merge, and a person who has never used BETR still stores nothing — nothing is written here
  until the chip is actually tapped. It IS cleared by "Delete everything", so that a wiped
  BETR and a fresh BETR are the same phone down to the last byte (store.js says so, and
  loop.test.js checks it).

  TO GO BACK TO FOLLOWING THE PHONE: make DEFAULT null here, and in app.css turn
  `:root[data-theme="dark"]` back into
  `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { … } }`.
  Two edits, nothing else.
*/
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else (root.Betr = root.Betr || {}).theme = api;
})(typeof self !== 'undefined' ? self : this, function () {

  var KEY = 'betr.look';
  var DARK = 'dark';
  var LIGHT = 'light';
  var DEFAULT = LIGHT;

  /* localStorage can throw on access, not only on write — see safeStorage() in app.js. */
  function box() {
    try {
      if (typeof localStorage !== 'undefined' && localStorage) return localStorage;
    } catch (e) { /* falls through */ }
    return null;
  }

  function stored() {
    var b = box();
    if (!b) return null;
    try {
      var v = b.getItem(KEY);
      return v === DARK || v === LIGHT ? v : null;
    } catch (e) { return null; }
  }

  /* What is on screen now: what the person chose, or the default if they never said. */
  function now() { return stored() || DEFAULT; }

  /*
    One attribute and one meta tag. The attribute is what app.css keys off; the meta is what
    the browser paints the canvas with in the moment before app.css has arrived, which is the
    other half of not flashing.
  */
  function apply(v) {
    try {
      var el = document.documentElement;
      if (el && el.setAttribute) el.setAttribute('data-theme', v);
    } catch (e) { /* a page with no <html> to write on is still a working app */ }
    try {
      var meta = document.querySelector('meta[name="color-scheme"]');
      if (meta && meta.setAttribute) meta.setAttribute('content', v);
    } catch (e) { /* the stylesheet says the same thing a moment later */ }
  }

  function set(v) {
    var next = v === DARK ? DARK : LIGHT;
    var b = box();
    if (b) { try { b.setItem(KEY, next); } catch (e) { /* private mode: forgetful, not broken */ } }
    apply(next);
    return next;
  }

  function toggle() { return set(now() === DARK ? LIGHT : DARK); }

  /* "Delete everything" calls this, so a wiped phone stores nothing at all. */
  function forget() {
    var b = box();
    if (b) { try { b.removeItem(KEY); } catch (e) { /* nothing to do about it */ } }
    apply(DEFAULT);
  }

  function isDark() { return now() === DARK; }

  apply(now());

  return { now: now, isDark: isDark, set: set, toggle: toggle, forget: forget, KEY: KEY };
});
