/*
  walk.js — drive BETR in a real browser, one step at a time.

  Opened for B21, where three characters walk the app from a cold start and every thought is
  written down before the tap that follows it. That only means anything if the walker cannot
  see the next screen in advance, so this keeps Chrome alive BETWEEN commands: one process per
  action, state on disk, no script written ahead of time.

    node tools/walk.js start          a local server and a headless Chrome, left running
    node tools/walk.js open [path]    clear storage, load it, dump the screen
    node tools/walk.js dump           what is on screen, and everything that can be tapped
    node tools/walk.js tap <sel>      tap it, then dump
    node tools/walk.js type <sel> <s> put words in a box
    node tools/walk.js shot <file>    a PNG of the phone screen
    node tools/walk.js eval <js>      last resort, for looking at something the dump misses
    node tools/walk.js stop           kill both

  No dependency, because BETR has none: child_process, http, fs and Node 22's global WebSocket.

  Three things here are scar tissue, all three in docs/learnings.md:
    - the viewport is set with Emulation.setDeviceMetricsOverride. --window-size resizes the
      window, and the page keeps rendering at desktop width inside it
    - /json/new is a PUT. A GET returns 405 and the message does not say why
    - the WebSocket handshake is awaited before the first send(), or the first command is
      written into a socket that is not open yet and is silently lost
*/
'use strict';

const { spawn, execSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const net = require('node:net');

const ROOT = path.join(__dirname, '..');
const WEB = path.join(ROOT, 'web');
const STATE = path.join(ROOT, '.walk.json');

/* A phone, not a small desktop. iPhone 14-ish: the width the founder tests on. */
const PHONE = { width: 390, height: 844, deviceScaleFactor: 3, mobile: true };
const TZ = 'Europe/London';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const read = () => (fs.existsSync(STATE) ? JSON.parse(fs.readFileSync(STATE, 'utf8')) : null);
const write = (s) => fs.writeFileSync(STATE, JSON.stringify(s, null, 2));

function freePort() {
  return new Promise((res) => {
    const srv = net.createServer();
    srv.listen(0, '127.0.0.1', () => { const p = srv.address().port; srv.close(() => res(p)); });
  });
}

const get = (url) => new Promise((res, rej) => {
  http.get(url, (r) => { let b = ''; r.on('data', (c) => (b += c)); r.on('end', () => res(b)); }).on('error', rej);
});

/* /json/new is a PUT. This is the whole reason this helper exists separately from get(). */
const put = (url) => new Promise((res, rej) => {
  const u = new URL(url);
  const req = http.request({ hostname: u.hostname, port: u.port, path: u.pathname + u.search, method: 'PUT' },
    (r) => { let b = ''; r.on('data', (c) => (b += c)); r.on('end', () => res(b)); });
  req.on('error', rej);
  req.end();
});

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function until(fn, tries, gap) {
  for (let i = 0; i < tries; i++) {
    try { return await fn(); } catch (e) { if (i === tries - 1) throw e; await wait(gap); }
  }
}

/* ------------------------------------------------------------------ one CDP conversation */

async function connect(wsUrl) {
  const ws = new WebSocket(wsUrl);
  /* Awaited, or the first send() goes into a socket that is not open and vanishes. */
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });

  let id = 0;
  const pending = new Map();
  ws.onmessage = (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) {
      const { res, rej } = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? rej(new Error(msg.error.message)) : res(msg.result);
    }
  };
  const send = (method, params) => new Promise((res, rej) => {
    const n = ++id;
    pending.set(n, { res, rej });
    ws.send(JSON.stringify({ id: n, method, params: params || {} }));
  });
  return { send, close: () => ws.close() };
}

/* The page, sized and zoned, ready for a command. */
async function page() {
  const s = read();
  if (!s) throw new Error('nothing running — node tools/walk.js start');
  const cdp = await connect(s.ws);
  await cdp.send('Emulation.setDeviceMetricsOverride', PHONE);
  await cdp.send('Emulation.setTimezoneOverride', { timezoneId: TZ });
  return { cdp, s };
}

const evaluate = async (cdp, expr) => {
  const r = await cdp.send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception.description || 'threw');
  return r.result.value;
};

/* ------------------------------------------------------------------ what is on the screen */

/*
  Text as a person reads it, then every control they could tap. The selector printed for each
  control is the one to hand back to `tap`, so a walk never has to guess at markup.
*/
const DUMP = `(() => {
  const seen = (el) => {
    const r = el.getBoundingClientRect();
    const st = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && st.visibility !== 'hidden' && st.display !== 'none';
  };
  const sel = (el) => {
    if (el.id) return '#' + el.id;
    for (const a of el.attributes) if (a.name.startsWith('data-')) return '[' + a.name + '="' + a.value + '"]';
    return null;
  };
  const text = document.body.innerText.trim();
  const taps = [];
  for (const el of document.querySelectorAll('button, a[href], [role="button"]')) {
    if (!seen(el)) continue;
    const r = el.getBoundingClientRect();
    taps.push({
      sel: sel(el),
      label: (el.innerText || el.getAttribute('aria-label') || '').replace(/\\s+/g, ' ').trim(),
      tag: el.tagName.toLowerCase(),
      href: el.getAttribute('href') || null,
      y: Math.round(r.top + window.scrollY),
      belowFold: r.top >= window.innerHeight
    });
  }
  const boxes = [...document.querySelectorAll('textarea, input')].filter(seen).map((el) => ({
    sel: sel(el), placeholder: el.placeholder || '', value: el.value
  }));
  return {
    title: document.title,
    text,
    taps,
    boxes,
    scrollHeight: document.documentElement.scrollHeight,
    viewport: window.innerHeight,
    /* Rule 1: anything at all that went out after load would show up here. */
    requests: (window.__walkRequests || []).slice()
  };
})()`;

function show(d) {
  console.log('┌─ ' + d.title);
  console.log(d.text.split('\n').map((l) => '│ ' + l).join('\n'));
  console.log('└─');
  const fold = d.scrollHeight > d.viewport
    ? `  (page is ${d.scrollHeight}px, screen is ${d.viewport}px — ${d.scrollHeight - d.viewport}px below the fold)`
    : '  (fits the screen)';
  console.log(fold);
  console.log('\nCAN TAP:');
  for (const t of d.taps) {
    console.log('  ' + (t.sel || '(no selector)').padEnd(26) +
      (t.belowFold ? '↓ ' : '  ') + JSON.stringify(t.label) + (t.href ? '  → ' + t.href : ''));
  }
  if (d.boxes.length) {
    console.log('\nCAN TYPE IN:');
    for (const b of d.boxes) console.log('  ' + (b.sel || '?').padEnd(26) + 'value=' + JSON.stringify(b.value));
  }
  if (d.requests.length) console.log('\n⚠ REQUESTS AFTER LOAD: ' + JSON.stringify(d.requests));
}

/* ------------------------------------------------------------------ the commands */

async function start() {
  stop(true);
  const port = await freePort();
  const dbg = await freePort();

  const server = spawn('python3', ['-m', 'http.server', String(port), '--bind', '127.0.0.1'],
    { cwd: WEB, detached: true, stdio: 'ignore' });
  server.unref();

  const profile = path.join(require('node:os').tmpdir(), 'betr-walk-' + Date.now());
  const chrome = spawn(CHROME, [
    '--headless=new', '--remote-debugging-port=' + dbg, '--user-data-dir=' + profile,
    '--no-first-run', '--no-default-browser-check', '--disable-gpu', 'about:blank'
  ], { detached: true, stdio: 'ignore' });
  chrome.unref();

  const version = await until(() => get(`http://127.0.0.1:${dbg}/json/version`), 40, 250);
  const target = JSON.parse(await put(`http://127.0.0.1:${dbg}/json/new?about:blank`));
  write({ port, dbg, ws: target.webSocketDebuggerUrl, server: server.pid, chrome: chrome.pid, profile });
  console.log('serving  http://127.0.0.1:' + port + '/');
  console.log('chrome   ' + JSON.parse(version).Browser);
  console.log('screen   ' + PHONE.width + '×' + PHONE.height + ' @' + PHONE.deviceScaleFactor + 'x, ' + TZ);
}

function stop(quiet) {
  const s = read();
  if (!s) { if (!quiet) console.log('nothing running'); return; }
  for (const pid of [s.server, s.chrome]) { try { process.kill(pid, 'SIGKILL'); } catch (e) {} }
  try { fs.rmSync(STATE); } catch (e) {}
  if (!quiet) console.log('stopped');
}

async function open(where) {
  const { cdp, s } = await page();
  const url = 'http://127.0.0.1:' + s.port + '/' + (where || '');
  /*
    A cold start means a cold start: storage cleared before the page that reads it loads, or
    the walk inherits the last character's worries.
  */
  await cdp.send('Page.enable');
  await cdp.send('Runtime.evaluate', { expression: 'try{localStorage.clear()}catch(e){}' });
  await cdp.send('Network.enable');
  await cdp.send('Page.navigate', { url });
  await wait(600);
  /* Rule 1's tripwire: anything fetched after load is recorded and printed by dump. */
  await evaluate(cdp, `(() => {
    window.__walkRequests = [];
    const f = window.fetch;
    window.fetch = (...a) => { window.__walkRequests.push(String(a[0])); return f(...a); };
    const X = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (m, u) { window.__walkRequests.push(String(u)); return X.apply(this, arguments); };
    return 1;
  })()`);
  show(await evaluate(cdp, DUMP));
  cdp.close();
}

async function dump() {
  const { cdp } = await page();
  show(await evaluate(cdp, DUMP));
  cdp.close();
}

async function tap(sel) {
  const { cdp } = await page();
  const hit = await evaluate(cdp, `(() => {
    const el = document.querySelector(${JSON.stringify(sel)});
    if (!el) return 'missing';
    el.scrollIntoView({ block: 'center' });
    el.click();
    return 'ok';
  })()`);
  if (hit === 'missing') { console.log('no such control: ' + sel); cdp.close(); return; }
  await wait(250);
  show(await evaluate(cdp, DUMP));
  cdp.close();
}

async function type(sel, text) {
  const { cdp } = await page();
  const ok = await evaluate(cdp, `(() => {
    const el = document.querySelector(${JSON.stringify(sel)});
    if (!el) return false;
    el.focus();
    el.value = ${JSON.stringify(text)};
    el.dispatchEvent(new Event('input', { bubbles: true }));
    return true;
  })()`);
  console.log(ok ? 'typed into ' + sel : 'no such box: ' + sel);
  cdp.close();
}

async function shot(file) {
  const { cdp } = await page();
  const r = await cdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, Buffer.from(r.data, 'base64'));
  console.log('wrote ' + file);
  cdp.close();
}

async function run() {
  const [cmd, ...rest] = process.argv.slice(2);
  if (cmd === 'start') return start();
  if (cmd === 'stop') return stop();
  if (cmd === 'open') return open(rest[0]);
  if (cmd === 'dump') return dump();
  if (cmd === 'tap') return tap(rest[0]);
  if (cmd === 'type') return type(rest[0], rest.slice(1).join(' '));
  if (cmd === 'shot') return shot(rest[0]);
  if (cmd === 'eval') { const { cdp } = await page(); console.log(JSON.stringify(await evaluate(cdp, rest.join(' ')), null, 2)); cdp.close(); return; }
  console.log(fs.readFileSync(__filename, 'utf8').split('*/')[0].split('\n').slice(1).join('\n'));
}

run().then(() => process.exit(0), (e) => { console.error(String(e.message || e)); process.exit(1); });
