/*
  The server is part of the promise (B3).

  Everything else in this repo is tested, and the server config is the one file where a
  quiet edit would break a sentence a person reads on screen without breaking anything they
  can see. What the Help screen says about what any server keeps is true because of a
  handful of lines in deploy/nginx.conf. So they are asserted here, next to the rest of the
  rules, and they fail the build like any of them.

  Since B52 the server keeps one thing: a count of page opens, a "1" per open, in a file
  named for the day. The tests below are the reason that can never quietly become anything
  else — an address, a browser, a referrer, a clock time, a second file. A tally that grows
  a field is a different product, and it would ship green without these.

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

test('nothing about a visit is written down, except the mark that counts it', () => {
  /* Comments talk about access_log; only real directives count. */
  const directives = conf
    .split('\n')
    .map((line) => line.replace(/#.*$/, '').trim().replace(/\s+/g, ' '))
    .filter((line) => line.startsWith('access_log'));

  assert.ok(directives.length > 0, 'deploy/nginx.conf must say what it does with access logs');

  const writing = directives.filter((d) => d !== 'access_log off;');
  assert.strictEqual(writing.length, 1,
    'exactly one access_log may write anything at all — the B52 tally. Found: ' +
    JSON.stringify(writing));

  /* The one that writes. Every part of it is load-bearing, so every part is asserted. */
  assert.strictEqual(writing[0],
    'access_log /var/log/betr/$betr_day.log betr_tally if=$betr_page;',
    'the tally line is quoted in the Help screen sentence and in B52; it may not drift');

  assert.match(compose, /max-size:\s*"1m"/, 'Docker must not keep an unbounded copy either');
  assert.match(conf, /error_log\s+\S+\s+crit;/,
    'error_log stays at crit: crit never records an ordinary request');
});

/*
  The line written per page open. If this ever contains a $, the server has started keeping
  something about a person, and the sentence on the Help screen has become a lie.
*/
test('the tally records a mark and nothing else — no variable, ever', () => {
  const formats = [...conf.matchAll(/^\s*log_format\s+(\w+)\s+(.*);\s*$/gm)];

  assert.strictEqual(formats.length, 1,
    'there is one log format and it is the tally. Found: ' +
    formats.map((f) => f[1]).join(', '));
  assert.strictEqual(formats[0][1], 'betr_tally', 'the only log format is the tally');
  assert.strictEqual(formats[0][2], "'1'",
    'a page open is written as the character 1. Not an address, not a shortened or hashed ' +
    'address, not a browser, not a referrer, not a time. Found: ' + formats[0][2]);
  assert.ok(!formats[0][2].includes('$'),
    'a $ in the log format is a fact about a person being written to disk');
});

/*
  The date lives in the FILE NAME and never in a line, so what is on disk is a daily total
  by construction rather than by promise. A clock time in the path would make each visit
  findable again.
*/
test('the only thing in the tally path is the day', () => {
  /* Not [^}] — the date pattern itself contains braces. Read to the closing line. */
  const day = conf.match(/map\s+\$time_iso8601\s+\$betr_day\s*\{([\s\S]*?)\n    \}/);
  assert.ok(day, '$betr_day must be derived from the date, in a map, where it can be read');

  assert.match(day[1], /\\d\{4\}-\\d\{2\}-\\d\{2\}/,
    'the day is a date and only a date — no hour, no minute');
  assert.ok(!/%|\bH\b|hour|minute/i.test(day[1]),
    'anything finer than a day makes a visit findable in time');

  const vars = [...conf.matchAll(/access_log\s+(\S+)/g)]
    .map((m) => m[1])
    .filter((v) => v.includes('$'))
    .flatMap((v) => [...v.matchAll(/\$(\w+)/g)].map((m) => m[1]));
  assert.deepStrictEqual(vars, ['betr_day'],
    'the only variable allowed in a log path is the day. Found: ' + vars.join(', '));
});

/*
  One open is one mark. Without the condition every file would be counted — app.js, the
  stylesheet, every icon — and the number would be a number about our server rather than
  about a person arriving.
*/
test('only the page is counted, not the files it pulls in', () => {
  const page = conf.match(/map\s+\$uri\s+\$betr_page\s*\{([\s\S]*?)\n    \}/);
  assert.ok(page, '$betr_page decides what counts, and it reads $uri and nothing else');

  const rules = page[1]
    .split('\n')
    .map((l) => l.replace(/#.*$/, '').trim())
    .filter(Boolean)
    .map((l) => l.replace(/;$/, '').split(/\s+/));

  const counted = rules.filter((r) => r[1] === '1').map((r) => r[0]).sort();
  assert.deepStrictEqual(counted, ['/', '/index.html'],
    'only the page itself may count. Found: ' + counted.join(', '));

  const fallback = rules.find((r) => r[0] === 'default');
  assert.ok(fallback && fallback[1] === '0',
    'anything not named must count for nothing — the default is 0');
});

/*
  The tally is not in the web root, so it is never served to anybody. Somebody who could
  read it could learn how many times the page was opened on a day, which is the same thing
  we would tell them if they asked.
*/
test('the tally is written where it can never be served', () => {
  assert.match(compose, /- \/var\/log\/betr:\/var\/log\/betr\s*$/m,
    'the tally directory is mounted writable, on its own, outside the web root');
  assert.ok(!/\/var\/www\/betr\/[^\n]*log/.test(conf),
    'nothing that is written may live under the folder that is served');
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
