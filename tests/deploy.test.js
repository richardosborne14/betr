/*
  The server is part of the promise (B3).

  Everything else in this repo is tested, and the server config is the one file where a
  quiet edit would break a sentence a person reads on screen without breaking anything they
  can see. "Loading this page is the only thing any server ever sees, and we keep no record
  of it" is true because of one line in deploy/nginx.conf. So it is asserted here, next to
  the rest of the rules, and it fails the build like any of them.

  These read deploy/nginx.conf. They never restate BETR's own words — that trap is in
  learnings.md — they assert the settings.
*/
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const conf = fs.readFileSync(path.join(ROOT, 'deploy', 'nginx.conf'), 'utf8');
const compose = fs.readFileSync(path.join(ROOT, 'deploy', 'docker-compose.yml'), 'utf8');
const workflow = fs.readFileSync(
  path.join(ROOT, '.github', 'workflows', 'deploy.yml'), 'utf8');

/* The header, line by line. The meta tag in index.html is belt; this is braces. */
test('the served policy blocks every request the app could ever make', () => {
  const csp = (conf.match(/add_header Content-Security-Policy "([^"]+)"/) || [])[1];
  assert.ok(csp, 'no Content-Security-Policy header in deploy/nginx.conf');

  assert.match(csp, /connect-src 'none'/,
    "connect-src 'none' is the line that blocks fetch, XHR, WebSocket and sendBeacon");
  assert.match(csp, /font-src 'none'/, 'a web font is a request to somebody');
  assert.match(csp, /default-src 'none'/, 'nothing is allowed that is not named');
  assert.match(csp, /frame-ancestors 'none'/, 'nobody embeds this in their own page');
  assert.match(csp, /form-action 'none'/, 'nothing is ever posted anywhere');
});

test('the served policy has no file: entries and no unsafe-inline', () => {
  const csp = (conf.match(/add_header Content-Security-Policy "([^"]+)"/) || [])[1];
  assert.ok(!/file:/.test(csp),
    'file: belongs only in the meta tag, so the page works when opened off disk');
  assert.ok(!/unsafe-inline/.test(csp),
    "there is no inline script or style, so 'unsafe-inline' must never appear");
});

test('nothing about a visit is written down, at either layer', () => {
  /* Comments talk about access_log; only real directives count. */
  const directives = conf
    .split('\n')
    .map((line) => line.replace(/#.*$/, '').trim().replace(/\s+/g, ' '))
    .filter((line) => line.startsWith('access_log'));

  assert.ok(directives.length > 0, 'deploy/nginx.conf must say what it does with access logs');
  for (const d of directives) {
    assert.strictEqual(d, 'access_log off;',
      'the "what this is" screen says we keep no record of a page load, so every ' +
      'access_log directive must be "off" — found: ' + d);
  }
  assert.match(compose, /max-size:\s*"1m"/, 'Docker must not keep an unbounded copy either');
});

test('the server never sets a cookie and never has one to set', () => {
  assert.ok(!/add_header\s+Set-Cookie/i.test(conf), 'BETR has no account and no session');
  assert.ok(!/proxy_pass/.test(conf), 'BETR serves files; it talks to nothing');
});

/*
  nginx ships no MIME type for .webmanifest. Without this the manifest arrives as
  application/octet-stream, the browser refuses it, and "Add to Home Screen" stops working
  with no error anywhere. On an iPhone that is not cosmetic: Safari deletes a web page's
  storage after seven days unused, and installing to the home screen is v1's only defence.
*/
test('the manifest is served as a manifest', () => {
  assert.match(conf, /application\/manifest\+json\s+webmanifest;/,
    'without this, installing to the home screen fails silently');
});

/*
  Our filenames carry no content hash — app.js is always app.js. A browser holding yesterday's
  app.js against today's index.html would be running a build that was never published, and the
  number printed on the "what this is" screen would be a lie.
*/
test('every file is revalidated, so the published hash is the truth', () => {
  assert.match(conf, /add_header Cache-Control "no-cache"/,
    'nothing here is fingerprinted, so nothing may be cached without revalidating');
  assert.ok(!/expires\s+1y/.test(conf), 'a year-long cache would outlive the build hash');
});

test('the publish gates on the tests and never ships web/tests/', () => {
  assert.match(workflow, /run:\s*node --test/,
    'a red test means a rule in CLAUDE.md is broken; no such build is published');
  assert.match(workflow, /--exclude='tests\/'/,
    'web/tests/ is not in the build hash, so serving it makes the hash uncheckable');
  assert.match(workflow, /build-hash\.js --write/, 'the page must print the hash it serves');
});
