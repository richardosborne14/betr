/*
  The server is part of the promise (B3, moved to Caddy in B57).

  Everything else in this repo is tested, and the server config is the one file where a
  quiet edit would break a sentence a person reads on screen without breaking anything they
  can see. What Help says about what any server keeps is true because of a handful of lines
  in deploy/betr.caddy. So they are asserted here, next to the rest of the rules, and they
  fail the build like any of them.

  The server keeps one thing: a count of page opens, one line per open holding the day and
  nothing else, in people.log or robots.log. The tests below are the reason that can never
  quietly become anything else — an address, a browser, a referrer, a clock time, a third
  file. A tally that grows a field is a different product, and it would ship green without
  these.

  These read deploy/betr.caddy. They never restate BETR's own words — that trap is in
  learnings.md — they assert the settings. Whether Caddy accepts the file is checked on the
  box (`caddy validate`) before it is ever reloaded; CI has no Caddy, and gets no dependency.
*/
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const conf = fs.readFileSync(path.join(ROOT, 'deploy', 'betr.caddy'), 'utf8');
const workflow = fs.readFileSync(
  path.join(ROOT, '.github', 'workflows', 'deploy.yml'), 'utf8');

/* Comments explain the settings; only the settings count. A # inside a quoted value is not
   a comment, and this file has none, so a plain strip is honest here. */
const code = conf.split('\n').map((l) => l.replace(/(^|\s)#.*$/, '')).join('\n');
const lines = code.split('\n').map((l) => l.trim()).filter(Boolean);

/* The body of a block that opens with `head {` — read to the brace that closes it. */
function block(head) {
  const at = code.indexOf(head);
  assert.ok(at >= 0, 'deploy/betr.caddy has no block starting ' + head);
  let depth = 0;
  for (let i = code.indexOf('{', at); i < code.length; i++) {
    if (code[i] === '{') depth++;
    if (code[i] === '}' && --depth === 0) return code.slice(code.indexOf('{', at) + 1, i);
  }
  assert.fail('the block starting ' + head + ' never closes');
}

const CSP = (code.match(/Content-Security-Policy "([^"]+)"/) || [])[1];

/* The header, line by line. The meta tag in index.html is belt; this is braces. */
test('the served policy blocks every request the app could ever make', () => {
  assert.ok(CSP, 'no Content-Security-Policy header in deploy/betr.caddy');
  assert.match(CSP, /connect-src 'none'/,
    "connect-src 'none' is the line that blocks fetch, XHR, WebSocket and sendBeacon");
  assert.match(CSP, /font-src 'none'/, 'a web font is a request to somebody');
  assert.match(CSP, /default-src 'none'/, 'nothing is allowed that is not named');
  assert.match(CSP, /frame-ancestors 'none'/, 'nobody embeds this in their own page');
  assert.match(CSP, /form-action 'none'/, 'nothing is ever posted anywhere');
});

test('the served policy has no file: entries and no unsafe-inline', () => {
  assert.ok(!/file:/.test(CSP),
    'file: belongs only in the meta tag, so the page works when opened off disk');
  assert.ok(!/unsafe-inline/.test(CSP),
    "there is no inline script or style, so 'unsafe-inline' must never appear");
});

test('the other promises are headers too', () => {
  assert.match(code, /X-Content-Type-Options nosniff/);
  assert.match(code, /Referrer-Policy no-referrer/, 'no page this links to learns it came from BETR');
  assert.match(code, /Strict-Transport-Security "max-age=\d+"/);
  assert.match(code, /^\s*-Server\s*$/m, "don't advertise the server to anyone scanning");
});

/*
  Exactly two logs, and both are the tally. A third `log`, or an `output` anywhere but the
  tally snippet, is something about a visit being written somewhere new.
*/
test('nothing about a visit is written down, except the mark that counts it', () => {
  const logs = lines.filter((l) => /^log(\s|$)/.test(l));
  assert.deepStrictEqual(logs, ['log people {', 'log robots {'],
    'exactly two logs may exist — people and robots. Found: ' + JSON.stringify(logs));

  assert.deepStrictEqual(block('log people {').trim(), 'import betr_tally people');
  assert.deepStrictEqual(block('log robots {').trim(), 'import betr_tally robots');

  const outputs = lines.filter((l) => /^output\b/.test(l));
  assert.deepStrictEqual(outputs, ['output file /var/log/betr/{args[0]}.log {'],
    'the tally is the only thing written, and it is written to /var/log/betr. Found: ' +
    JSON.stringify(outputs));
});

/*
  THE LINE WRITTEN PER OPEN. Caddy's access log normally carries the address, the browser,
  the page, the headers, the time to the microsecond. Each of those is a field, and each
  field is deleted here before anything reaches the disk. What is left is {"ts":"2026-09-16"}.
  This list is exact: a field removed from it comes back into the file.
*/
test('the tally records the day and nothing else', () => {
  const tally = block('(betr_tally) {');

  const deleted = [...tally.matchAll(/^\s*(\w+)\s+delete\s*$/gm)].map((m) => m[1]).sort();
  assert.deepStrictEqual(deleted,
    ['bytes_read', 'duration', 'request', 'resp_headers', 'size', 'status', 'user_id'],
    'every field Caddy writes for a request must be deleted. `request` alone holds the ' +
    'address, the browser, the page and every header. Found: ' + deleted.join(', '));

  assert.match(tally, /format filter \{/, 'only a filter can delete fields');
  assert.match(tally, /wrap json \{/);
  assert.ok(!/\b(rename|replace|ip_mask|hash|query|cookie|regexp)\b/.test(tally),
    'a field is deleted, never kept in a changed shape — a masked or hashed address is ' +
    'still a fact about a person');

  assert.match(tally, /time_format "2006-01-02"/,
    'the day and only the day — anything finer makes a visit findable in time');
  assert.ok(!/time_local/.test(tally), 'the day is UTC, the same for everyone');
  for (const key of ['message_key', 'level_key', 'name_key']) {
    assert.match(tally, new RegExp(key + ' ""'), key + ' must be empty so nothing else is written');
  }
});

/* One open is one line. Without this, every file the page pulls in would count too. */
test('only the page is counted, not the files it pulls in', () => {
  assert.ok(lines.includes('@notpage not path / /index.html'),
    'only / and /index.html may count');
  assert.ok(lines.includes('log_skip @notpage'), 'everything that is not the page is skipped');
});

/*
  THE ONE THAT MATTERS MOST.

  The founder asked whether the count could exclude bots by their address. It cannot, and
  this is what makes that answer permanent rather than a promise: everything Caddy knows about
  a request reaches this file as a {placeholder}, so the rule is an allow-list of
  placeholders, not a ban-list of bad ones — a ban-list is only as good as the imagination of
  whoever wrote it. Adding one is a decision about the promise, and it goes to the founder.
*/
test('the server may read only these things about a request, and nothing else', () => {
  const allowed = new Set([
    /* what the thing calls itself, to tell a robot from a person. Read, never written. */
    '{header.User-Agent}',
    /* which of our two files — not about the request at all */
    '{args[0]}'
  ]);
  const used = new Set(code.match(/\{[A-Za-z][\w.\-\[\]]*\}/g) || []);
  const extra = [...used].filter((p) => !allowed.has(p)).sort();
  assert.deepStrictEqual(extra, [],
    'deploy/betr.caddy started reading something new about a request: ' + extra.join(', ') +
    '. That is a decision about what BETR knows, and it belongs to the founder.');

  for (const [word, why] of [
    ['remote', 'the address of the person asking'],
    ['client_ip', 'the address of the person asking'],
    ['X-Forwarded-For', 'the address of the person asking'],
    ['Referer', 'where they came from'],
    ['query', 'what was on the end of the link they followed'],
    ['cookie', 'anything a browser keeps']
  ]) {
    assert.ok(!new RegExp('\\{[^}]*' + word, 'i').test(code),
      'BETR must never read ' + why + ' (' + word + ')');
  }
  /* Matchers can read a request without a placeholder, too. */
  assert.ok(!/\b(remote_ip|client_ip|header_regexp|query|protocol)\b/.test(code),
    'no matcher may read the address, the query or any header but the user agent');
});

test('a robot is told apart by what it calls itself, and by nothing else', () => {
  const robot = lines.find((l) => l.startsWith('@robot '));
  assert.ok(robot, 'the robot matcher must be written out where it can be read');
  const list = (robot.match(/^@robot expression `\{header\.User-Agent\}\.matches\('(.+)'\)`$/) || [])[1];
  assert.ok(list, 'the robot matcher reads the user agent and nothing else. Found: ' + robot);

  const re = new RegExp(list.replace(/^\(\?i\)/, ''), 'i');
  assert.ok(re.test(''), 'a request with no user agent at all is not a browser');
  for (const known of ['facebookexternalhit/1.1', 'Googlebot', 'HeadlessChrome', 'curl/8.4']) {
    assert.ok(re.test(known), 'the list must still catch ' + known + ' — Meta fetches every ' +
      'link shared on Instagram and WhatsApp, and that would otherwise land in the number');
  }
  assert.ok(!re.test('Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 ' +
    '(KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1'), 'an iPhone is a person');

  /* Order matters and only `route` keeps it: everyone is people, then robots are moved. */
  assert.deepStrictEqual(block('route {').trim().split('\n').map((l) => l.trim()),
    ['log_name people', 'log_name @robot robots'],
    'people first, robots second, inside route — outside it Caddy reorders them');
});

test('the tally is written where it can never be served', () => {
  assert.match(code, /root \* \/srv\/betr\/site/);
  assert.ok(!/\/srv\/betr\/site[^\n]*log/.test(code),
    'nothing that is written may live under the folder that is served');
});

test('the server serves files and talks to nothing', () => {
  assert.ok(!/Set-Cookie/i.test(code), 'BETR has no account and no session');
  for (const d of ['reverse_proxy', 'php_fastcgi', 'forward_auth', 'templates', 'request_body']) {
    assert.ok(!new RegExp('^\\s*' + d + '\\b', 'm').test(code), 'BETR serves files; no ' + d);
  }
  const imports = lines.filter((l) => l.startsWith('import '));
  assert.ok(imports.every((l) => /^import betr_tally (people|robots)$/.test(l)),
    'nothing is imported from outside this file: ' + JSON.stringify(imports));
});

test('the manifest is served as a manifest', () => {
  assert.match(code, /header \/manifest\.webmanifest Content-Type application\/manifest\+json/,
    'without this, installing to the home screen can fail silently');
});

/*
  Our filenames carry no content hash — app.js is always app.js. A browser holding yesterday's
  app.js against today's index.html would be running a build that was never published, and the
  hash printed on Help would be a lie.
*/
test('every file is revalidated, so the published hash is the truth', () => {
  assert.match(block('header {'), /Cache-Control "no-cache"/,
    'nothing here is fingerprinted, so nothing may be cached without revalidating');
  assert.ok(!/immutable/.test(code), 'an immutable file would outlive the build hash');
});

test('the publish gates on the tests, never ships web/tests/, and cannot touch the server config', () => {
  assert.match(workflow, /run:\s*node --test/,
    'a red test means a rule in CLAUDE.md is broken; no such build is published');
  assert.match(workflow, /--exclude='tests\/'/,
    'web/tests/ is not in the build hash, so serving it makes the hash uncheckable');
  assert.match(workflow, /build-hash\.js --write/, 'the page must print the hash it serves');
  /* Commands, not the sentences in echo lines that tell a person what to run. */
  const commands = workflow.split('\n').filter((l) => !/^\s*(#|echo\b)/.test(l)).join('\n');
  assert.ok(!/\bsudo\b|^\s*systemctl|^\s*caddy |:\/etc\//m.test(commands),
    'the account GitHub logs in as cannot change how BETR is served, and the workflow never tries');
  assert.match(workflow, /\/etc\/caddy\/conf\.d\/betr\.caddy/,
    'the workflow checks the config running on the box is this file');
});
