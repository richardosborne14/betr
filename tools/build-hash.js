#!/usr/bin/env node
/*
  The published build hash (scope §7, B2 item 12).

  A person who is suspicious of us — the right instinct — should be able to check that the
  page they loaded is the code they read. This hashes every file the site serves, in a fixed
  order, and either prints the result or writes it into index.html's <meta name="betr-build">.

  B3 calls this in the deploy. It is run by us, never by the app, and it makes no requests.

    node tools/build-hash.js          print the hash
    node tools/build-hash.js --write  print it and stamp index.html
*/
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.join(__dirname, '..', 'web');

/* Everything the browser can load. Sorted, so the hash does not depend on the filesystem. */
function shippedFiles(dir, base) {
  base = base || '';
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter((e) => !e.name.startsWith('.'))
    .sort((a, b) => (a.name < b.name ? -1 : 1))
    .flatMap((e) => {
      const rel = base ? base + '/' + e.name : e.name;
      if (e.isDirectory()) return rel === 'tests' ? [] : shippedFiles(path.join(dir, e.name), rel);
      return [rel];
    });
}

/*
  index.html is hashed with the meta tag blanked out, so stamping the hash in cannot change
  the hash. Otherwise the value could never be verified by anyone.
*/
function contentFor(rel) {
  const buf = fs.readFileSync(path.join(ROOT, rel));
  if (rel !== 'index.html') return buf;
  return Buffer.from(
    buf.toString('utf8').replace(/(<meta name="betr-build" content=")[^"]*(">)/, '$1$2'),
    'utf8'
  );
}

function buildHash() {
  const h = crypto.createHash('sha256');
  for (const rel of shippedFiles(ROOT)) {
    h.update(rel, 'utf8');
    h.update('\0');
    h.update(contentFor(rel));
    h.update('\0');
  }
  return h.digest('hex');
}

function write(hash) {
  const p = path.join(ROOT, 'index.html');
  const before = fs.readFileSync(p, 'utf8');
  const after = before.replace(/(<meta name="betr-build" content=")[^"]*(">)/, '$1' + hash + '$2');
  if (before === after) throw new Error('no <meta name="betr-build"> in index.html');
  fs.writeFileSync(p, after);
}

module.exports = { buildHash, shippedFiles, contentFor };

if (require.main === module) {
  const hash = buildHash();
  if (process.argv.includes('--write')) write(hash);
  process.stdout.write(hash + '\n');
}
