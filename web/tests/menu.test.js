/*
  The foot (B56) and Help (B8 onwards).

  What these are guarding, in order of how easily it could be undone by accident:

    - the foot is three plain words on every screen, and stays three. A count, a badge or a
      fourth item is what the old bottom bar's rule protected against, and it still does
    - Help opens with the crisis lines above everything else in the markup, then what it
      costs and what leaves the phone
    - every link is plain https with nothing attached, and every one of them is in the
      allow-list below, so adding a link is a deliberate act that shows up in a diff
    - outside Help there are no links at all, except the crisis numbers under a refusal
    - who made it is Digital Bricks, said plainly on Help, and no other product is named (B57)
*/
const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { boot } = require('./harness.js');
const places = require('../content/places.js');
const s = require('../content/strings-en.js').s;

const IF = 'say no to my sister without a reason';
const THEN = 'she’ll take it as rude';
const locked = (a) => a.type('#if', IF).type('#then', THEN).tap('#lock');

const SCREENS = {
  front: (a) => a,
  on: (a) => locked(a),
  go: (a) => locked(a).tap('#done'),
  happened: (a) => locked(a).tap('#done').tap('[data-tag="yeah"]'),
  log: (a) => locked(a).tap('#done').tap('[data-tag="yeah"]').type('#x', 'She said fine.').tap('#keep'),
  mine: (a) => SCREENS.log(a).tap('#f-mine'),
  why: (a) => a.tap('#f-why'),
  help: (a) => a.tap('#f-help'),
  where: (a) => a.tap('#f-help').tap('#where')
};

/* Every screen outside Help, in one string. */
function outsideHelp() {
  return ['front', 'on', 'go', 'happened', 'log', 'mine', 'why'].map((n) => SCREENS[n](boot()).html()).join('\n');
}

/* ------------------------------------------------------------------ the foot */

test('the foot is on every screen, and it is exactly three plain words', () => {
  for (const name of Object.keys(SCREENS)) {
    const h = SCREENS[name](boot()).html();
    const feet = [...h.matchAll(/<nav class="foot" aria-label="BETR">([\s\S]*?)<\/nav>/g)];
    assert.strictEqual(feet.length, 1, name + ' has ' + feet.length + ' feet');
    const buttons = [...feet[0][1].matchAll(/<button([^>]*)>([\s\S]*?)<\/button>/g)];
    assert.deepStrictEqual(buttons.map((b) => b[2]), [s.foot.mine, s.foot.why, s.foot.help], name);
    for (const b of buttons) {
      assert.match(b[1], /^ id="f-[a-z]+"$/, name + ': a foot word has grown a class, a state or a badge: ' + b[1]);
    }
    assert.ok(!/\d|<img|<svg/.test(feet[0][1]), name + ': the foot has a number or an icon on it');
  }
});

test('every word on the foot works from every screen', () => {
  for (const name of Object.keys(SCREENS)) {
    const mine = SCREENS[name](boot()).tap('#f-mine');
    mine.shows('id="new"');
    /* the link's words and the screen's title are the same words, so test what only the screen has */
    const why = SCREENS[name](boot()).tap('#f-why');
    why.shows('id="write"').showsText(s.why.method);
    const help = SCREENS[name](boot()).tap('#f-help');
    help.showsText(s.crisis.title).shows('id="where"');
  }
});

test('a prediction that is locked in is still locked in after leaving through the foot', () => {
  const a = locked(boot()).tap('#f-help').tap('#f-why').tap('#f-mine');
  a.showsText(s.mine.locked);
  a.tap('[data-p]').showsText(s.on.kicker);
});

/* ------------------------------------------------------------------ help */

test('Help opens with the crisis lines, above everything else in the markup', () => {
  const a = boot().tap('#f-help');
  const h = a.html();
  const crisis = h.indexOf(s.crisis.title);
  assert.ok(crisis !== -1, 'no crisis block on Help');
  for (const later of [s.help.proofTitle, s.help.cbtTitle, s.help.whatThisTitle, s.help.placesTitle, s.help.whoTitle, s.help.codeTitle]) {
    assert.ok(h.indexOf(later) !== -1 && crisis < h.indexOf(later), '"' + later + '" is above the crisis lines');
  }
  a.shows('call your local emergency number').shows('988').shows('116 123').shows('findahelpline.com');
});

test('Help answers the person checking for a catch straight after the crisis lines', () => {
  const h = boot().tap('#f-help').text();
  const at = (x) => { const i = h.indexOf(x); assert.ok(i !== -1, 'not on Help: ' + x); return i; };
  const proof = at(s.help.proofTitle);
  assert.ok(at(s.crisis.title) < proof);
  const safe = at(s.help.safeTitle);
  assert.ok(proof < safe && safe < at(s.help.cbtTitle), 'the safe-experiments line has moved');
  for (const part of [s.help.free, s.help.proofSent, s.help.proofAccounts, 'Turn on airplane mode', s.io.export, s.io.wipe]) {
    assert.ok(at(part) < safe, '"' + part + '" fell below the safe-experiments line');
  }
  /* B56: no number anywhere that counts what a person did — the results counter is gone */
  assert.ok(!('proofResults' in s.help), 'the count of results is back in the strings');
});

test('the safe-experiments line said twice on Help is one sentence, word for word', () => {
  const h = boot().tap('#f-help').text();
  const six = s.frozen.sentences[5];
  assert.strictEqual(h.split(six).length - 1, 2, 'sentence 6 is not on Help exactly twice');
});

test('Help carries the purpose, the nine sentences, and the one clear thing to read about CBT', () => {
  const a = boot().tap('#f-help');
  a.showsText(s.frozen.purpose);
  for (const line of s.frozen.sentences) a.showsText(line);
  a.showsText('CBT is a talking therapy').showsText(s.help.free).showsText(s.help.devBuild);
  const h = a.html();
  assert.ok(h.indexOf(s.help.cbtTitle) < h.indexOf('This is a self-help worksheet'));
});

/*
  The allow-list. Every link a person can tap in BETR is here, and nowhere else. Adding one
  means editing this list, which means it shows up in a diff and gets read by somebody.
*/
const ALLOWED = [
  'https://findahelpline.com',
  /* B24, all six read on the provider's own site on 2026-09-04. See content/places.js. */
  'https://www.nhs.uk/live-well/alcohol-advice/alcohol-support',
  'https://www.nhs.uk/live-well/addiction-support/drug-addiction-getting-help',
  'https://www.wearewithyou.org.uk',
  'https://www.talktofrank.com',
  'https://smartrecovery.org.uk',
  'https://findtreatment.gov',
  'https://www.nhs.uk/mental-health/talking-therapies-medicine-treatments/talking-therapies-and-counselling/cognitive-behavioural-therapy-cbt',
  'https://www.babcp.com/About/What-is-CBT',
  'https://www.cci.health.wa.gov.au',
  'https://www.getselfhelp.co.uk',
  'https://www.nhs.uk/every-mind-matters',
  'https://www.mind.org.uk/information-support',
  'https://www.babcp.com',
  'https://www.findcbt.org',
  'https://eabct.eu',
  'https://sidebyside.mind.org.uk',
  'https://github.com/richardosborne14/betr'
];

/* The tappable crisis numbers: every line in content/helplines.js, which carries a source and a day. */
const HELPLINES = require('../content/helplines.js');
const DIALLABLE = ['https://findahelpline.com'].concat(
  Object.keys(HELPLINES.countries).reduce((all, code) =>
    all.concat(HELPLINES.countries[code].lines.map((l) => l.tel)), [])
);

test('every link is plain https or tel, has nothing attached, and is on the allow-list', () => {
  const links = [...boot().tap('#f-help').html().matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
  assert.ok(links.length >= 12, 'only found ' + links.length + ' links');
  for (const url of links) {
    if (url.startsWith('tel:')) {
      assert.ok(/^tel:[0-9]+$/.test(url), url + ' is not a plain number');
      assert.ok(DIALLABLE.indexOf(url) !== -1, url + ' is not one of the crisis numbers');
      continue;
    }
    assert.ok(url.startsWith('https://'), url + ' is not https');
    assert.ok(url.indexOf('?') === -1 && url.indexOf('#') === -1, url + ' carries a parameter');
    assert.ok(ALLOWED.indexOf(url) !== -1, url + ' is not on the allow-list in menu.test.js');
  }
  /* everywhere else in the app: no link at all */
  const rest = outsideHelp();
  assert.ok(rest.indexOf('href=') === -1, 'a link turned up outside Help: ' + (rest.match(/href="[^"]+"/) || [])[0]);
});

test('sentence 7 is still word for word, and its numbers still dial', () => {
  const h = boot().tap('#f-help').html();
  const list = h.slice(h.indexOf('<ol>'), h.indexOf('</ol>'));
  const items = [...list.matchAll(/<li>([\s\S]*?)<\/li>/g)].map((m) => m[1]);
  assert.strictEqual(items.length, 9, 'there are not nine sentences');
  assert.strictEqual(items[6].replace(/<[^>]+>/g, ''),
    'If you are in danger or in crisis, call your local emergency number. In the US, call ' +
    'or text 988. In the UK and Ireland, call Samaritans free on 116 123. Elsewhere, ' +
    'findahelpline.com lists free helplines in over 175 countries.',
    'sentence 7 was reworded');
  assert.ok(items[6].indexOf('href="tel:988"') !== -1, '988 does not dial');
  assert.ok(items[6].indexOf('href="tel:116123"') !== -1, '116 123 does not dial');
  assert.ok(items[6].indexOf('href="https://findahelpline.com"') !== -1, 'findahelpline.com is not a link');
});

test('a refusal about self-harm carries a number that dials, for the right country, and nothing else', () => {
  const a = boot(null, { timeZone: 'Europe/London' });
  a.type('#if', 'cut myself where nobody will see it').type('#then', 'I’ll feel better').tap('#lock');
  a.shows('href="tel:116123"').shows('Samaritans').shows('call your local emergency number');
  a.hides('href="tel:988"');
  for (const m of a.html().matchAll(/href="([^"]+)"/g)) {
    assert.ok(DIALLABLE.indexOf(m[1]) !== -1, m[1] + ' is on a refusal');
  }
});

/* ------------------------------------------------------------------ who made it (B57) */

/*
  Founder, 2026-09-15: "remove any references to [the old brand] and make it a purely OSS, free to use,
  no strings type app". The name is built from two halves so that `grep -rni` over the repo
  for it prints nothing, which is how B57 checks it is gone.
*/
const OLD_BRAND = new RegExp('tryb' + 'eup', 'i');

test('no other product is named anywhere in the app, in any file, in any language', () => {
  const WEB = path.join(__dirname, '..');
  const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? (e.name === 'tests' ? [] : walk(path.join(dir, e.name))) : [path.join(dir, e.name)]);
  for (const file of walk(WEB)) {
    assert.ok(!OLD_BRAND.test(file), path.relative(WEB, file) + ' is named for it');
    if (/\.(js|html|css|webmanifest|svg)$/.test(file)) {
      assert.ok(!OLD_BRAND.test(fs.readFileSync(file, 'utf8')), path.relative(WEB, file) + ' names it');
    }
  }
  for (const a of [boot().tap('#f-help'), frHelp()]) {
    assert.ok(!OLD_BRAND.test(a.html()), 'Help names it');
  }
  assert.ok(!OLD_BRAND.test(outsideHelp() + SCREENS.where(boot()).html()), 'a screen names it');
});

test('Who made this says Digital Bricks, free and open source, and links the code plainly', () => {
  const a = boot().tap('#f-help');
  a.showsText(s.help.who).showsText(s.help.madeBy);
  assert.match(s.help.who, /free and open source/);
  assert.match(s.help.who, /Digital Bricks/);
  const h = a.html();
  const who = h.slice(h.indexOf('id="who-made"'));
  assert.ok(who.indexOf('<a href="https://github.com/richardosborne14/betr" target="_blank" rel="noopener noreferrer">github.com/richardosborne14/betr</a>') !== -1,
    'the link to the code is not there, or is not plain');
  assert.ok(a.text().indexOf('{link}') === -1, 'the placeholder is showing');
  assert.ok(!/<img/.test(who), 'there is a logo again');
  /* the only company named is ours, and only on Help */
  assert.ok(outsideHelp().indexOf('Digital Bricks') === -1, 'the maker is named outside Help');
});

test('every image in the app is a file in the folder, and no font is ever fetched', () => {
  const WEB = path.join(__dirname, '..');
  const all = outsideHelp() + boot().tap('#f-help').html();
  const srcs = [...all.matchAll(/<img[^>]*\ssrc="([^"]+)"/g)].map((m) => m[1]);
  /* Since B57 there is no image at all (the logo went); the loop holds any that come back. */
  for (const src of srcs) {
    assert.ok(!/^[a-z]+:/i.test(src) && src.indexOf('//') === -1, src + ' is not a file in this folder');
    assert.ok(fs.existsSync(path.join(WEB, src)), src + ' is not in web/');
  }
  const css = fs.readFileSync(path.join(WEB, 'app.css'), 'utf8');
  assert.ok(css.indexOf('@font-face') === -1, 'a font has been added to the stylesheet');
  assert.ok(css.indexOf('fonts.googleapis') === -1 && css.indexOf('@import') === -1, 'the stylesheet fetches something');
  const html = fs.readFileSync(path.join(WEB, 'index.html'), 'utf8');
  assert.match(html, /font-src 'none'/, 'the no-web-font line has gone from the policy');
  assert.match(html, /img-src 'self' file: data:/, 'images are no longer held to this folder');
  assert.match(html, /connect-src 'none'/, 'the page is allowed to make a request');
});

/*
  B24's group, which no longer has a door promising it (the doors went with B56) and stays
  because frozen sentence 4 still sends somebody away who is dependent on alcohol or drugs,
  and somebody sent away should be sent somewhere.
*/
test('Help has the places for drinking and drugs, first, and says where they work', () => {
  const group = places.groups[0];
  assert.strictEqual(group.id, 'substances');
  assert.ok(group.items.length >= 3);
  const a = boot().tap('#f-help');
  const h = a.html();
  for (const place of group.items) assert.ok(h.indexOf(place.url) !== -1, place.name + ' is not drawn');
  assert.ok(typeof group.note === 'string' && /UK|United States/.test(group.note));
  a.showsText(group.note);
  assert.ok(h.indexOf('id="group-substances"') < h.indexOf(places.groups[1].items[0].url), 'the group is not first');
});

/* ------------------------------------------------------------------ Help in French (B16) */

/*
  2026-09-16: the whole of Help went into French. Every test above reads the English, so none of
  them would notice a French Help that quietly dropped a safeguard. These do.
*/
const fr = require('../content/strings-fr.js').s;
const frHelp = () => boot(null, { languages: ['fr-FR', 'fr'] }).tap('#f-help');

test('in French, Who made this says Digital Bricks and links the code', () => {
  const a = frHelp();
  a.showsText(fr.help.who).showsText(fr.help.madeBy);
  assert.match(fr.help.who, /Digital Bricks/);
  assert.match(fr.help.who, /gratuit/);
  assert.ok(a.html().indexOf('>github.com/richardosborne14/betr</a>') !== -1, 'the French lost the code link');
  assert.ok(a.text().indexOf('{link}') === -1);
});

test('in French, the places are French, and a translation never carries a link', () => {
  const h = frHelp().html();
  assert.ok(h.indexOf(places.fr.intro) !== -1, 'the places intro is not in French');
  assert.ok(h.indexOf(places.groups[0].fr.title) !== -1 && h.indexOf(places.groups[0].fr.note) !== -1);
  assert.ok(h.indexOf(places.groups[0].title) === -1, 'an English group title is on the French Help');

  /* `fr` holds the same text fields in French and nothing else: never a url, never a fourth thing */
  const allowed = ['intro', 'title', 'note', 'name', 'what'];
  const entries = [places].concat(places.reading, places.groups, ...places.groups.map((g) => g.items));
  for (const e of entries) {
    if (!e.fr) continue;
    for (const k of Object.keys(e.fr)) {
      assert.ok(allowed.indexOf(k) !== -1, 'a French place carries "' + k + '", which is not text');
      assert.ok(typeof e.fr[k] === 'string' && !/https?:/.test(e.fr[k]), 'a French place carries a link');
    }
  }
});

test('in French, the nine sentences are there, and sentence 7\u2019s numbers still dial', () => {
  const h = frHelp().html();
  assert.strictEqual(fr.frozen.sentences.length, 9);
  for (const line of fr.frozen.sentences) {
    const plain = h.replace(/<a [^>]*>([^<]*)<\/a>/g, '$1');
    assert.ok(plain.indexOf(line) !== -1, 'a French sentence is not on Help: ' + line.slice(0, 50));
  }
  assert.match(fr.frozen.sentences[0], /dispositif m\u00e9dical/, 'sentence 1 lost the words the regulator reads');
  assert.match(fr.frozen.sentences[7], /rien n\u2019est envoy\u00e9, ni \u00e0 nous ni \u00e0 personne/, 'sentence 8 lost rule 1');
  assert.ok(h.indexOf('<a href="tel:988">988</a>') !== -1 && h.indexOf('<a href="tel:116123">116 123</a>') !== -1,
    'a number in French sentence 7 does not dial');
});
