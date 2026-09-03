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
*/
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const WEB = path.join(__dirname, '..');
const FILES = ['lib/guards.js', 'lib/rate.js', 'lib/store.js', 'lib/content.js',
               'content/worries.js', 'content/whats-going-on.js', 'content/places.js', 'app.js'];


function makeEl() {
  return {
    _html: '', _attrs: null, value: '', textContent: '', onclick: null, children: {},
    get innerHTML() { return this._html; },
    set innerHTML(h) { this._html = h; this.children = parse(h); },
    focus() {}, select() {}, setSelectionRange() {},
    getAttribute(n) { return this._attrs ? this._attrs[n] : null; },
    querySelector(sel) { return find(this, sel); },
    querySelectorAll(sel) { return findAll(this, sel); }
  };
}

/* The app only ever reaches for elements by id or by a data- attribute, so that is all we index. */
function parse(html) {
  const kids = {};
  for (const m of html.matchAll(/id="([^"]+)"/g)) kids['#' + m[1]] = makeEl();
  for (const m of html.matchAll(/data-([a-z]+)="([^"]+)"/g)) {
    const el = makeEl();
    el._attrs = { ['data-' + m[1]]: m[2] };
    const key = '[data-' + m[1] + ']';
    (kids[key] = kids[key] || []).push(el);
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

function boot(seed) {
  const root = makeEl();
  const mem = seed ? Object.assign({}, seed) : {};
  const box = {
    localStorage: {
      getItem: (k) => (k in mem ? mem[k] : null),
      setItem: (k, v) => { mem[k] = String(v); },
      removeItem: (k) => { delete mem[k]; }
    },
    navigator: { storage: { persist() {} } },
    document: {
      getElementById: () => root,
      querySelector: (s) => (s.indexOf('betr-build') !== -1 ? { getAttribute: () => 'dev' } : null)
    },
    Date, JSON, Math, String, Array, Object, RegExp, Error
  };
  box.self = box;
  box.window = box;
  box.window.scrollTo = () => {};
  box.window.addEventListener = () => {};
  box.window.matchMedia = () => ({ matches: false });
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
    /* Read a box back. The export lands in a textarea's value, not in the markup. */
    valueOf(sel) { const el = find(root, sel); assert.ok(el, 'no such box: ' + sel); return el.value; },
    shows(s) { assert.ok(api.html().indexOf(s) !== -1, 'not on screen: ' + s + '\non: ' + api.html().slice(0, 300)); return api; },
    hides(s) { assert.ok(api.html().indexOf(s) === -1, 'still on screen: ' + s); return api; }
  };
  return api;
}

module.exports = { boot, makeEl, find, findAll };
