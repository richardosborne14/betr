/*
  The published build hash. Its whole job is to let a stranger check that the page they
  loaded is the code they read, so it has to be reproducible outside our own script.
*/
const { test } = require('node:test');
const assert = require('node:assert');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const tool = require('../../tools/build-hash.js');
const WEB = path.join(__dirname, '..');

test('the hash is a sha-256 and is stable across runs', () => {
  const a = tool.buildHash();
  assert.match(a, /^[0-9a-f]{64}$/);
  assert.strictEqual(a, tool.buildHash());
});

test('it matches the same sum computed independently of the script', () => {
  const h = crypto.createHash('sha256');
  for (const rel of tool.shippedFiles(WEB)) {
    h.update(rel, 'utf8');
    h.update('\0');
    h.update(tool.contentFor(rel));
    h.update('\0');
  }
  assert.strictEqual(h.digest('hex'), tool.buildHash());
});

test('every file the browser can load is hashed, and the tests are not', () => {
  const files = tool.shippedFiles(WEB);
  for (const must of ['index.html', 'app.js', 'app.css', 'lib/guards.js', 'lib/store.js',
                      'lib/rate.js', 'lib/content.js', 'content/worries.js',
                      'content/whats-going-on.js', 'manifest.webmanifest']) {
    assert.ok(files.includes(must), 'not hashed: ' + must);
  }
  assert.ok(!files.some((f) => f.startsWith('tests/')), 'tests must not be part of the build');
});

test('stamping the hash into index.html does not change the hash', () => {
  /* Otherwise the number printed on the "what this is" screen could never be verified. */
  const before = tool.buildHash();
  const html = tool.contentFor('index.html').toString('utf8');
  assert.ok(!html.includes('content="dev"'), 'the meta value must be blanked before hashing');
  assert.ok(html.includes('<meta name="betr-build" content="">'));
  assert.strictEqual(before, tool.buildHash());
});

test('index.html actually carries the meta tag the deploy stamps', () => {
  const raw = fs.readFileSync(path.join(WEB, 'index.html'), 'utf8');
  assert.match(raw, /<meta name="betr-build" content="[^"]*">/);
});
