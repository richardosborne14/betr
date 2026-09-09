/*
  Betr v1 — the whole app.

  Nine screens for the loop (start, doors, pick, which-of-these, test, locked, happened, sure,
  result), plus the two screens for putting a worry your own way, the three for a person's own
  entry from scratch, "your worries", "why this one sticks", the country list and Help.
  Six taps and one sentence gets you all the way round — it was four before B19 put a door in
  front of the list and B20 put the choice of prediction in front of the test.

  Under all of them, on every screen, three plain words: Your worries · New worry · Help.
  That row is not a tab bar and must not grow into one (B8, CLAUDE.md rule 10 as amended
  2026-09-03): no icons, no selected state, no badge, no count, no fourth item.

  NOT ONE SENTENCE A PERSON READS LIVES IN THIS FILE (B15, 2026-09-03). Every word is a key
  in web/content/strings-en.js, looked up through lib/i18n.js, which falls back to English
  one key at a time. web/tests/i18n.test.js reads this file and fails the build if English
  prose comes back into it, because that is how it got here in the first place.

  Things that are deliberate and should not be "fixed":
    - no streak, no red day, no "you missed", no cap on rest. Completed tests is still the
      metric; the ladder is one belief's grip, never a score of the person and never a total
    - no verdict anywhere. A bad outcome is data, and "more sure than before" is a real answer
    - no 0-100 slider. Five words, each of which moves the belief along a ten-rung ladder
    - the expectation is locked when the person taps "I'll do it today", and is read-only after
    - no console.log, no analytics, no crash reporter, no request of any kind after load
*/
(function () {
  'use strict';

  var guards = Betr.guards;
  var look = Betr.theme;
  var rate = Betr.rate;
  var storeLib = Betr.store;
  var content = Betr.content;
  var WORRIES = Betr.worries;
  var STARTS = Betr.starts;
  var EXAMPLES = Betr.examples;
  var DOORS = Betr.doors;
  var PLACES = Betr.places;
  var WHY = Betr.why;
  var W = Betr.where.create(Betr.zones, Betr.helplines);

  var app = document.getElementById('app');
  var store = storeLib.create(safeStorage());
  var S = store.load();

  /*
    ------------------------------------------------------------------ words

    The person's own choice first, then whatever the browser asks for, then English. Nothing
    is fetched to do it: every language is inside the page already (rule 1), which is why
    turning wifi off changes nothing in any of them.

    This never looks at where the person is, and lib/where.js never looks at their language.
    They are two questions and coupling them is the harm B17 exists to prevent.
  */
  var I = Betr.i18n.create(Betr.strings, { chosen: S.lang, prefer: myLanguages() });

  function myLanguages() {
    try { return navigator.languages || (navigator.language ? [navigator.language] : []); }
    catch (e) { return []; }
  }

  function t(key, vars) { return I.t(key, vars); }

  /*
    A sentence with something of the person's own set inside it — their words in bold, a
    country's name, a link. The sentence is escaped; the pieces are already-built HTML that
    the caller escaped itself. A translator sees {drop} and can move it wherever their own
    language needs it, which is the whole reason it is a placeholder and not a concatenation.
  */
  function tHtml(key, parts) {
    return esc(t(key)).replace(/\{([a-zA-Z]+)\}/g, function (whole, name) {
      return Object.prototype.hasOwnProperty.call(parts, name) ? parts[name] : whole;
    });
  }

  /*
    Something the person wrote, set inside a sentence that is read out. Their words may or may
    not end in a full stop, and a screen reader that says "coffee dot dot How sure" has made a
    mess of the one screen that matters.
  */
  function stop(s) {
    var v = String(s || '').trim();
    return (!v || /[.!?…]$/.test(v)) ? v : v + '.';
  }

  /* The other way round: a belief quoted inside a longer sentence brings its own full stop. */
  function unstop(s) { return String(s || '').trim().replace(/\.$/, ''); }

  /* Bold one phrase inside an already-escaped sentence, the first time it appears. */
  function bold(html, phrase) {
    var p = esc(phrase);
    if (!p) return html;
    return html.replace(p, '<b>' + p + '</b>');
  }

  function applyLanguage() {
    try {
      var el = document.documentElement;
      if (el && el.setAttribute) {
        el.setAttribute('lang', I.lang());
        el.setAttribute('dir', I.dir());
      }
    } catch (e) { /* a page with no <html> to write on is still a working app */ }
  }

  /*
    The purpose statement and the nine sentences are frozen (research §10, CLAUDE.md rule 7).
    They live in the string file marked as frozen, and a translation of one of them is
    approved once, by a named person, in B16 — never edited casually in a normal session.
  */
  function purpose() { return t('frozen.purpose'); }
  function sentences() { return I.list('frozen.sentences'); }

  /*
    Scratch state: never persisted, because none of it should survive a reload.

    B30 split the belief into the two halves a person actually types. B32 added the last two:
    `stock` is the id of the item being borrowed from, or null, and it decides two things and
    nothing else — which suggestions sit under the sentence, and whether locking in keeps that
    item's ladder. `expect` is the hand-written expectation that came with a stock prediction
    (B20), cleared the moment the sentence stops being that one.
  */
  var draft = blankDraft();

  function blankDraft() {
    return { ifPart: '', thenPart: '', test: '', drop: '', stock: null, expect: '' };
  }
  var refusal = null;      /* the last guard refusal, shown once and cleared on the next tap */
  var installEvent = null; /* Android's beforeinstallprompt, if the browser offers one */
  var storageOk = true;
  var deleteArmed = false;
  var whereBack = 'help';  /* the screen the country list was opened from */
  /*
    Which worry "Why this one sticks" is open on, and what Back goes to. Deliberately not
    stored, the same way whereBack is not: reloading on this screen drops to Your worries
    rather than adding a field to a person's saved state for a screen they can only reach
    from two places anyway (B18).
  */
  var whyId = null;
  var whyBack = 'mine';
  var toSay = null;        /* what the next paint() should read out. Cleared as it is used */
  /* Which worked example this open is showing (B31). Decided once, at the bottom of the file. */
  var shown = 0;

  /* localStorage itself can throw on access in a locked-down browser, not just on write. */
  function safeStorage() {
    try {
      if (typeof localStorage !== 'undefined' && localStorage) return localStorage;
    } catch (e) { /* falls through */ }
    return { getItem: function () { return null; }, setItem: function () {}, removeItem: function () {} };
  }

  function save() { storageOk = store.save(S) && storageOk; }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /*
    A person's own words, put back on the screen the way they typed them.

    Founder, 2026-09-03: what happened, typed as two paragraphs, came back out as one line —
    on the result screen and again on the card. A blank line means a new paragraph, so each
    paragraph gets its own element rather than one element with empty lines inside it: the
    yellow on the result screen is drawn around the text line by line, and an empty line drawn
    that way is a stray yellow stub. Single line breaks inside a paragraph are kept by the
    `wrote` class in the stylesheet, which is the only thing that tells a browser to draw them.

    The words are never altered, only split: nothing is reflowed, shortened or tidied.
  */
  function paras(text, cls) {
    var blocks = String(text == null ? '' : text).replace(/\r\n?/g, '\n').split(/\n{2,}/)
      .map(function (p) { return p.replace(/\s+$/, ''); })
      .filter(function (p) { return p !== ''; });
    return blocks.map(function (p) {
      return '<p class="' + cls + '"><span class="wrote">' + esc(p) + '</span></p>';
    }).join('');
  }

  /* The four screens that belong to a test in hand. Everywhere else is outside the loop. */
  var IN_LOOP = ['plan', 'locked', 'happened', 'sure'];

  /*
    ------------------------------------------------------------------ heard, not seen

    Two things, and between them they are the difference between BETR being awkward with a
    screen reader and being unusable with one (B15).

    1. Every screen's first heading is `id="top" tabindex="-1"`, and paint() puts focus on it.
       Without this, replacing #app's markup leaves the focus ring on a button that no longer
       exists: tapping the big button did nothing at all, out loud. A screen that wants focus
       somewhere else — a box to type in — takes it after paint(), which is why ownScreen()
       and happened() still get their textarea.

    2. A live region, #say, which is outside #app and therefore survives every repaint. It is
       for what focusing a heading does NOT say: a refusal, a note that appeared in place, the
       result screen read as a sentence. It is deliberately not used to repeat the heading a
       screen reader has just read, because hearing everything twice is its own kind of unusable.
  */
  var live = document.getElementById('say');

  function say(text) { toSay = text || null; }

  function announce(text) {
    if (!live) return;
    try {
      live.textContent = '';
      live.textContent = text;
    } catch (e) { /* nothing to do, and nothing to report */ }
  }

  /* The one thing every screen goes through. Setting app.innerHTML anywhere else loses the menu. */
  function paint(html) {
    app.innerHTML = html + themeChip() + menu();
    var top = q('#top');
    if (top && top.focus) { try { top.focus(); } catch (e) { /* older browser */ } }
    announce(toSay || '');
    toSay = null;
  }

  /*
    ------------------------------------------------------------------ the worry, everywhere

    B20, 2026-09-03, and it is half of what that task is for. The worry a person is working
    on now says the same two things, in the same words, in the same place, on every screen
    from choosing it to the result: the label they tapped, and the exact sentence they are
    testing. Before this, the pick list said one thing, the test screen said another and the
    result screen said a third, and a person three screens in could not tell whether they
    were still in the worry they had chosen.

    `heading` is true where the label is the only title the screen has — the test screen and
    the result — so it is the h2 that focus lands on and a screen reader reads. Everywhere
    else the screen has its own heading and this is a quiet strip above it.
  */
  /*
    B30, 2026-09-08. A test a person wrote has no label — its own sentence IS its title,
    everywhere, and never truncated. A borrowed one has both: the label it is filed under and
    the exact sentence being tested. So an empty label promotes the sentence rather than
    drawing an empty line above it, and this is the only place that decides it.
  */
  function titleOf(d) { return (d && (d.label || d.belief)) || ''; }

  /*
    B35, 2026-09-08, founder: "why is it small and left aligned when the rest is big and
    centred?" The two-part case — a borrowed label with the sentence quoted under it — is what
    this strip was drawn for, and it is untouched. The one-part case is not a label at all:
    a test somebody wrote themselves has no label, so its own SENTENCE was being drawn in the
    label's small bold left-aligned type, on a screen where the heading below it is large and
    centred. It read as a caption on the wrong screen.

    So an empty label gets `solo`, and the stylesheet draws it as what it is: the sentence,
    quoted the way the borrowed one is quoted, centred with everything else, a size up from
    the body rather than a size down. Same words, same place — only the type changes.
  */
  function worryHead(label, belief, heading) {
    var title = label || belief;
    var under = label ? belief : '';
    var solo = !heading && !label && !!belief;
    var quiet = heading ? '' : ' quiet' + (solo ? ' solo' : '');
    var name = solo ? '\u201C' + esc(title) + '\u201D' : esc(title);
    return '<div class="worry' + quiet + '">' +
      (heading ? head('h2', title, 'worry-label')
               : '<p class="worry-label">' + name + '</p>') +
      (under ? '<p class="worry-belief wrote">\u201C' + esc(under) + '\u201D</p>' : '') +
    '</div>';
  }

  /* The heading a screen is announced by, and the thing focus lands on. */
  function head(tag, text, cls) {
    return '<' + tag + (cls ? ' class="' + cls + '"' : '') + ' id="top" tabindex="-1">' +
      esc(text) + '</' + tag + '>';
  }

  /*
    ------------------------------------------------------------------ the crisis block

    The three numbers written into sentence 7 itself, made tappable. Founder's ask,
    2026-09-03: somebody reading that line is the least able person in the app to copy a
    number out by hand.

    Sentence 7 is frozen (research §10) and names the US and UK lines, so these three stay
    exactly where they are. This wraps them and nothing else, so the sentence still reads
    word for word as it is written — `menu.test.js` strips the tags back off and compares.

    The *live* crisis block, the one at the top of Help and under a self-harm refusal, is
    not this. It is crisisBlock() below, and it shows the line for the country the person is
    actually in. This one is the small print; that one is the part somebody needs.

    A tel: link is inert until it is tapped, and then it is the phone's dialler, not us. It
    makes no request, sends nothing, and cannot tell us it was tapped. The airplane-mode
    proof is untouched, and a short code works with no signal on any phone that can call at
    all. findahelpline.com is the one that needs the internet, which is why it is last.

    In the native wrap (B5) these must hand off to the system dialler and the system browser,
    never open inside our own webview.
  */
  var CALLABLE = [
    { text: '988', href: 'tel:988' },
    { text: '116 123', href: 'tel:116123' },
    { text: 'findahelpline.com', href: 'https://findahelpline.com' }
  ];

  function callable(sentence) {
    var html = esc(sentence);
    CALLABLE.forEach(function (n) {
      /* a plain string replaces the first match only, which is the only one there is */
      html = html.replace(n.text, '<a href="' + n.href + '">' + n.text + '</a>');
    });
    return html;
  }

  /*
    The four layers, always in this order (B17):

      1. the line that is true everywhere and needs no country, no data and no signal
      2. the helpline for the country the person is in — or, where we have not checked one,
         the plain admission that we have not. Never a neighbour's number. Never 988 because
         it happens to be the one we have. A wrong number is worse than no number, because a
         person tries it, and they may only be going to try once
      3. one tap to say where they actually are, because the guess can be wrong
      4. findahelpline.com last, labelled honestly as the part that needs the internet

    Where the country comes from is in web/lib/where.js: a choice they made, else the time
    zone, else a language tag's region, else nothing. No request, no permission, no sensor.
  */
  function whereEnv() {
    var env = { timeZone: null, languages: null };
    try { env.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; } catch (e) { /* no Intl */ }
    try { env.languages = navigator.languages || (navigator.language ? [navigator.language] : null); } catch (e) { /* no navigator */ }
    return env;
  }

  function myCountry() { return W.resolve(S.country, whereEnv()); }

  /* "Call 116 123 — Samaritans. Free, 24 hours." Anything the provider did not say is left out. */
  function lineWords(l) {
    var after = [];
    if (l.free) after.push(t('crisis.free'));
    if (l.allHours) after.push(t('crisis.allHours'));
    if (l.note) after.push(l.note);
    return esc(t(l.text ? 'crisis.callOrText' : 'crisis.call')) + ' ' +
      '<a href="' + esc(l.tel) + '">' + esc(l.number) + '</a> — ' + esc(l.name) +
      (after.length ? '. ' + esc(after.join(', ')) : '') + '.';
  }

  function crisisBlock() {
    var code = myCountry();
    var lines = W.linesFor(code);
    var html = '<p>' + esc(t('crisis.emergency')) + '</p>';

    if (lines.length === 1) {
      html += '<p>' + esc(t('crisis.in', { country: W.inWords(code) })) + ' ' + lineWords(lines[0]) + '</p>';
    } else if (lines.length) {
      html += '<p>' + esc(t('crisis.in', { country: W.inWords(code) })) + '</p><ul class="places">' +
        lines.map(function (l) { return '<li>' + lineWords(l) + '</li>'; }).join('') + '</ul>';
    } else if (code) {
      html += '<p>' + tHtml('crisis.unchecked', { country: '<b>' + esc(W.nameFor(code)) + '</b>' }) + '</p>';
    } else {
      html += '<p>' + esc(t('crisis.noCountry')) + '</p>';
    }

    html += '<p><button class="plain" id="where">' +
      esc(t(code ? 'crisis.notWhereYouAre' : 'crisis.sayWhere')) + '</button></p>' +
      '<p>' + tHtml('crisis.directory', {
        link: '<a href="https://findahelpline.com">findahelpline.com</a>'
      }) + '</p>';
    return html;
  }

  /* Both Help and a refusal can carry the block, so the one link in it is wired centrally. */
  function wireCrisis() {
    on('#where', function () { whereBack = S.stage; go('where'); });
  }

  /*
    The country list. A plain alphabetical list of every country, and one way back out of it.
    It is not a settings screen and must not grow into one (CLAUDE.md rule 10): nothing else
    in BETR varies by country, and nothing else ever will. Not the worries, not the tests,
    not a word of the wording. Only which helpline number is on the crisis block.
  */
  function whereScreen() {
    var code = myCountry();
    var chosen = W.known(S.country) ? S.country : null;

    paint( backButton() +
      '<div class="stage"><div class="sheet">' +
        head('h2', t('where.title')) +
        '<p>' + esc(t('where.sub')) + '</p>' +
        (chosen
          ? '<p><button class="plain" id="unset">' + esc(t('where.unset')) + '</button></p>'
          : '<p>' + esc(code
              ? t('where.guessing', { country: W.nameFor(code) })
              : t('where.guessingUnknown')) + '</p>') +
        '<ul class="places countries">' + W.list().map(function (c) {
          return '<li><button class="plain" data-cc="' + esc(c.code) + '">' + esc(c.name) +
            (c.code === chosen
              ? ' <span aria-hidden="true">✓</span><span class="sr">' + esc(t('where.chosen')) + '</span>'
              : '') + '</button></li>';
        }).join('') + '</ul>' +
      '</div></div>');

    wireBack(whereBack);
    qa('[data-cc]').forEach(function (b) {
      b.onclick = function () {
        S.country = b.getAttribute('data-cc');
        save();
        say(t('a11y.countryChanged', { country: W.nameFor(S.country) }));
        go(whereBack);
      };
    });
    on('#unset', function () { S.country = null; save(); render(); window.scrollTo(0, 0); });
  }

  function go(stage) {
    refusal = null;
    /*
      Leaving the loop puts whatever is in hand down safely: a locked-in test goes to Your
      worries and waits, an unlocked draft is let go. Nothing you promised yourself is ever
      quietly replaced by the next thing you tap (B8).
    */
    if (IN_LOOP.indexOf(stage) === -1) park();
    S.stage = stage;
    save();
    render();
    window.scrollTo(0, 0);
  }

  /* A blank sentence and a blank plan. Nothing is carried over from the last one. */
  function newTest() {
    draft = blankDraft();
    go('build');
  }

  /*
    Borrowing one (B32). The first blank comes from the item's CARD sentence — the loose one
    that is never itself tested — and the second is left empty, because which prediction is
    theirs is the one thing only they can say (B20). Its three are the chips underneath, and
    its plan is already in the boxes on the next screen. All of it editable.
  */
  function borrow(f) {
    if (!f) return;
    draft = blankDraft();
    draft.stock = f.id;
    draft.ifPart = splitBelief(f.belief)[0];
    draft.test = f.test;
    draft.drop = f.drop;
    go('build');
  }

  function q(sel) { return app.querySelector(sel); }
  function qa(sel) { return Array.prototype.slice.call(app.querySelectorAll(sel)); }
  function on(sel, fn) { var el = q(sel); if (el) el.onclick = fn; return el; }

  /* ---------------------------------------------------------------- the three doors */

  /*
    The menu the founder asked for on 2026-09-03, and the rule it lives under.

    It is three doors, not a place you live in. Plain words, no icons, no selected state, no
    badge, no dot, no count, no fourth item. A count here would turn "tests you have on the
    go" into a tally of things you said you would do and didn't, and that is a shame surface
    (B8; research §4.3). If someone proposes a fifth item, the answer is no.

    Every screen paints it, which is why every screen goes through paint() rather than
    setting innerHTML itself: setting innerHTML a second time would wipe the handlers the
    screen had just wired.
  */
  function menu() {
    return '<nav class="menu" aria-label="' + esc(t('nav.label')) + '">' +
      '<button id="m-mine">' + esc(t('nav.mine')) + '</button>' +
      '<button id="m-new">' + esc(t('nav.new')) + '</button>' +
      '<button id="m-help">' + esc(t('nav.help')) + '</button>' +
    '</nav>';
  }

  function wireMenu() {
    on('#m-mine', function () { go('mine'); });
    /*
      B30. "New test" opens a new test. It led to the doors until 2026-09-08, when the stock
      list stopped being the way in — the doors are one tap aside now, off the front screen
      and off the build screen (B32), not the thing this button means.
    */
    on('#m-new', function () { S.filter = null; newTest(); });
    on('#m-help', function () { go('help'); });
  }

  /*
    A test you have locked in is a promise you made to yourself, not a slot. With "New worry"
    one tap from everywhere, it would otherwise be overwritten without a word — so instead it
    waits for you, on Your worries, until you say what happened.

    There is no cap on how many wait (B8). The research points the other way: completed
    experiments are what moved the needle (§3.3), and the risk in unguided self-help is
    stopping, not doing too much (§3.1). What is protected is the day, not the number: nothing
    counts these, nothing calls them overdue, and nothing orders them by age.

    An unlocked draft is not a commitment, so it is simply let go.
  */
  function park() {
    var c = S.cur;
    S.cur = null;
    if (!c || !c.locked) return;
    if (S.open.indexOf(c) !== -1) return;
    S.open.push(c);
    save();
  }

  /* Pick a waiting test back up. Whatever was in hand waits its own turn. */
  function resume(tst, stage) {
    park();
    var i = S.open.indexOf(tst);
    if (i !== -1) S.open.splice(i, 1);
    S.cur = tst;
    go(stage || 'locked');
  }

  function worriesFor(doorId) {
    if (!doorId) return WORRIES;
    var door = null;
    for (var i = 0; i < DOORS.items.length; i++) if (DOORS.items[i].id === doorId) door = DOORS.items[i];
    if (!door) return WORRIES;
    return door.worries.map(function (id) { return content.byId(WORRIES, id); }).filter(Boolean);
  }

  /*
    Every test in hand gets its own id the moment it exists, and keeps it through locking in,
    waiting on Your worries, and becoming a result (B9). B8 made several waiting at once
    possible, and two devices' waiting lists cannot be put together without one.
  */
  /*
    `startFrom` lived here until 2026-09-08. It made a test out of a worry and the prediction
    somebody picked on the screen after the list; both screens went in B32 and one function,
    builtTest(), makes both kinds now — see it for why that is one function and not two.
  */

  /* The arrow is decoration and is flipped by the stylesheet in a right-to-left language. */
  function backButton() {
    return '<button class="back" id="back"><span class="arrow" aria-hidden="true">←</span> ' +
      esc(t('back')) + '</button>';
  }
  function wireBack(target) { on('#back', function () { go(target); }); }

  /*
    B35, founder's ask: light or dark, "always floating somewhere easy to click". It is drawn
    by paint(), so it is on every screen without any screen having to remember it, and it is
    the mirror of the Back chip rather than a new kind of object.

    It says what you would GET, not what you are in: in light it reads "Dark". lib/theme.js
    owns the choice and applies it from the head of the page; this is only the switch.
  */
  function themeChip() {
    var dark = look.isDark();
    return '<button class="look" id="look" aria-label="' +
      esc(dark ? t('look.toLight') : t('look.toDark')) + '">' + markAndWord(dark) + '</button>';
  }

  function markAndWord(dark) {
    return '<span class="mark" aria-hidden="true">' + (dark ? '\u2600' : '\u263E') + '</span> ' +
      esc(dark ? t('look.light') : t('look.dark'));
  }

  /*
    DELIBERATELY NOT A REPAINT. Two reasons, and the second is the one that matters: a repaint
    moves focus to the heading and reads the whole screen out again, and a repaint of the
    build screen while somebody is half way through a sentence is a repaint they would feel.
    The colours live in CSS variables on <html>, so changing them changes nothing on this page
    except the one word on the chip itself.
  */
  function wireTheme() {
    on('#look', function () {
      look.toggle();
      var el = q('#look');
      if (!el) return;
      var dark = look.isDark();
      try {
        el.innerHTML = markAndWord(dark);
        el.setAttribute('aria-label', dark ? t('look.toLight') : t('look.toDark'));
      } catch (e) { /* older browser: the colours changed, which is the part that counts */ }
    });
  }

  /* ---------------------------------------------------------------- the ladder */

  /*
    Ten dots and the number, one row per test. Founder's call, 2026-09-02: their own CBT used
    1-10, and the thing that kept them going was watching it come down. It is the only number
    in Betr besides completed tests, and it belongs to one belief. It is never a score of the
    person, never added up, never averaged across worries, and never a line with a target on it.

    Out loud (B15) it is the same thing and no more of it. The dots and the number are hidden
    from a screen reader, because ten circles say nothing, and one sentence replaces them:
    "Now: 7 out of 10. Down one rung." The belief it belongs to is on the ladder as a whole,
    once, rather than repeated on every rung. There is no total here and there must never be.
  */
  function rung(when, level, opts) {
    opts = opts || {};
    var dots = '';
    for (var i = 1; i <= rate.TOP; i++) dots += '<i' + (i <= level ? ' class="on"' : '') + '></i>';

    var spoken = t('a11y.rung', { when: when, level: level });
    if (typeof opts.prev === 'number') {
      var moved = opts.prev - level;
      if (moved > 0) spoken += ' ' + I.plural('a11y.down', moved);
      else if (moved < 0) spoken += ' ' + I.plural('a11y.up', -moved);
      else spoken += ' ' + t('a11y.same');
    }

    return '<div class="rung">' +
        '<span class="when" aria-hidden="true">' + esc(when) + '</span>' +
        '<span class="dots" aria-hidden="true">' + dots + '</span>' +
        '<span class="num" aria-hidden="true">' + level + '</span>' +
        '<span class="sr">' + esc(spoken) + '</span>' +
      '</div>' +
      (opts.said ? paras(opts.said, 'said') : '');
  }

  /* Where it started, then one row per test, newest last. A long ladder keeps its ends. */
  function ladder(g, opts) {
    var said = !!(opts && opts.said);
    var shown = g.results;
    var skipped = '';
    if (shown.length > 6) {
      skipped = '<p class="said elided">' + esc(I.plural('ladder.earlier', shown.length - 6)) + '</p>';
      shown = shown.slice(-6);
    }
    var first = g.results.length - shown.length;
    return '<div class="ladder" role="group" aria-label="' +
        esc(g.belief ? t('a11y.ladder', { belief: unstop(g.belief) }) : t('a11y.ladderPlain')) + '">' +
      rung(t('ladder.started'), rate.TOP, {}) +
      skipped +
      /*
        The rungs come off the group, not off each result: since B9 a ladder is the taps
        replayed in time order where every result says which word was tapped, and only falls
        back to the stored rung where one of them predates that. Reading r.level here would
        draw a different ladder from the one series() worked out.
      */
      shown.map(function (r, i) {
        var last = i === shown.length - 1;
        var at = first + i;
        return rung(last ? t('ladder.now') : I.ordinal(at + 1), g.rungs[at], {
          said: said ? r.o : '',
          prev: at === 0 ? rate.TOP : g.rungs[at - 1]
        });
      }).join('') +
    '</div>';
  }

  /* Set up a repeat of something already tested. Stock wording is looked up fresh. */
  function again(d, from) {
    /* A new id, not the old result's: this is another test of that worry, not that result. */
    S.cur = {
      rid: storeLib.rid(),
      source: d.source, id: d.id, label: d.label, belief: d.belief,
      x: d.x, test: testFor(d), drop: dropFor(d),
      from: from || 'mine', editing: false, locked: null, missed: false
    };
    go('plan');
  }

  /* ---------------------------------------------------------------- screens */

  function render() {
    var map = {
      start: start, doors: doors, pick: pick,
      build: build, 'build-do': buildDo,
      /*
        What a phone that saw one of the five screens B30 and B32 retired has stored. Every
        one of them was a person part way through writing a test, and the build screen is
        where that happens now.
      */
      'own-belief': build, 'own-test': build, 'own-drop': build,
      belief: build, 'belief-own': build,
      plan: plan, locked: locked, happened: happened, sure: sure,
      result: result, mine: mine, help: help, where: whereScreen, why: whyScreen,
      about: help   /* what a phone that saw the old "what this is" screen has stored */
    };
    /* Any half-finished loop that lost its item drops back to the start rather than crashing. */
    if (IN_LOOP.indexOf(S.stage) !== -1 && !S.cur) S.stage = 'start';
    /* Same for a reload on "Why this one sticks", which knows its worry only in memory. */
    if (S.stage === 'why' && !whyFor(whyId)) S.stage = 'mine';
    (map[S.stage] || start)();
    wireCrisis();
    wireTheme();
    wireMenu();
  }

  /*
    What is on the go, on the front screen, without becoming a tally (B8). One waiting test
    gets its own line and a way straight back into it. Several get one line that opens Your
    worries — never a stacked list of everything you said you would do, and never a number.
  */
  function waitingBlock() {
    if (!S.open.length) return '';
    if (S.open.length === 1) {
      return '<div class="note"><b>' + esc(t('waiting.onTheGo')) + '</b> ' + esc(S.open[0].test) +
        '<div class="row"><button class="ghost" id="pickup">' + esc(t('waiting.pickUp')) +
        '</button></div></div>';
    }
    return '<p class="tiny"><button id="pickup">' + esc(t('waiting.many')) + '</button></p>';
  }

  function wireWaiting() {
    on('#pickup', function () {
      if (S.open.length === 1) resume(S.open[0], 'locked');
      else go('mine');
    });
  }

  /*
    ---------------------------------------------------------------- the front screen (B31)

    It shows one finished test and then asks the question. It used to describe the loop in
    three sentences to somebody who had never seen one.

    THE CARD IS THE SAME CARD a person's own result is drawn in — `.result`, the same two
    labels, the same struck line, the same marker pen, the same ladder — because the point is
    "this is what you are about to make", and a different-looking card would be an advert for
    something else. What makes it an example rather than a testimonial is one line of four
    words above it (research §5.2: the MHRA reads a testimonial as an implied claim).

    THE FINAL STATE IS IN THE MARKUP. The reveal in app.css only DELAYS parts of it, and only
    under `prefers-reduced-motion: no-preference`. Nothing here depends on the animation
    having run: with reduced motion on, the finished card is simply there on paint.

    Rule 5 holds on this card as it holds everywhere. Its ladder moves because that is what
    happened in this example. The screen never says how far anybody else's will move, there is
    no "most people", no average, and the number belongs to the test rather than to a person.
  */
  function exampleCard() {
    var ex = EXAMPLES[exampleIndex()];
    if (!ex) return '';
    return '<div class="result example">' +
        '<p class="lbl">' + esc(t('example.expected')) + '</p>' +
        '<p class="you"><span class="wrote">' + esc(ex.prediction) + '</span></p>' +
        /*
          B38, 2026-09-09. The beat a newcomer stalls on, and the only one the card used to
          skip: what they actually did. It is drawn plain — not struck through like the
          prediction, not marker-penned like what happened — because it is neither a thing
          that turned out wrong nor the surprise. It is the size of the step, and the size is
          the lesson. `dropped` is optional and quieter: it is the second half of the same
          beat, not a fourth one.
        */
        '<p class="lbl mid">' + esc(t('example.did')) + '</p>' +
        '<p class="did mid wrote">' + esc(ex.did) + '</p>' +
        (ex.dropped ? '<p class="did dropped mid wrote">' + esc(ex.dropped) + '</p>' : '') +
        '<p class="lbl late">' + esc(t('result.happened')) + '</p>' +
        '<p class="real late"><span class="wrote">' + esc(ex.happened) + '</span></p>' +
        '<p class="lbl">' + esc(t('example.ladderLabel')) + '</p>' +
        /*
          Named with the plain line, not with the example's own sentence: this ladder belongs
          to a worked example and quoting it back would read as somebody's record.
        */
        '<div class="ladder" role="group" aria-label="' + esc(t('a11y.ladderPlainExample')) + '">' +
          rung(t('ladder.started'), ex.from, {}) +
          '<div class="last">' + rung(t('ladder.now'), ex.to, { prev: ex.from }) + '</div>' +
        '</div>' +
      '</div>';
  }

  /*
    Which one, and it is a counter rather than a shuffle: a person who reopens sees the next
    one, and anybody testing can say in advance which they will get.

    It is fixed for the whole session, decided once at the bottom of this file, so that
    walking back to the front screen mid-session does not swap the card underneath somebody.

    `S.seen` is deliberately NOT counted by store.isEmpty(). A BETR that has never been used,
    and one that has just been wiped, must leave nothing at all behind — and which example
    comes next is not something a person would miss. The cost is that somebody with nothing
    else stored sees the first one every time, which is the right way round anyway: the first
    one is the one the founder chose to lead with.
  */
  function exampleIndex() {
    if (!EXAMPLES.length) return 0;
    return ((shown % EXAMPLES.length) + EXAMPLES.length) % EXAMPLES.length;
  }

  function start() {
    paint(
      '<div class="stage">' +
        '<div class="kicker">' + esc(t('brand')) + '</div>' +
        head('h1', t('start.caption'), 'caption') +
        exampleCard() +
        '<button class="big pulse" id="go">' + esc(t('start.go')) +
          ' <span class="arrow" aria-hidden="true">→</span></button>' +
        '<p class="row"><button class="ghost" id="not-sure">' + esc(t('start.borrow')) + '</button></p>' +
        waitingBlock() +
        '<p class="tiny">' + esc(t('start.promise')) + '</p>' +
        (storageOk ? '' : '<p class="tiny">' + esc(t('start.noStorage')) + '</p>') +
      '</div>');
    /* The main road: their own sentence, from nothing. */
    on('#go', newTest);
    /*
      One tap aside, and it is the whole of what the doors and the stock list are now: things
      to borrow (B32). It was the way in until 2026-09-08.
    */
    on('#not-sure', function () { S.filter = null; go('doors'); });
    wireWaiting();
  }

  function doors() {
    paint( backButton() +
      '<div class="stage">' +
        head('h2', t('doors.title')) +
        '<p class="sub">' + esc(DOORS.intro) + '</p>' +
        '<div class="list">' +
          DOORS.items.map(function (d) {
            /*
              A door's `note` is a safety line, not a description, and it sits outside the
              button on purpose: inside, a screen reader would read it as part of the button's
              name, and it is not what the button does. One door has one (B19).
            */
            return '<button data-door="' + esc(d.id) + '">' +
              '<span>' + esc(d.label) + '<span class="under">' + esc(d.under) + '</span></span>' +
              '<span class="go arrow" aria-hidden="true">→</span></button>' +
              (d.note ? '<p class="doornote"><button class="plain" data-note="' + esc(d.id) +
                '">' + esc(d.note) + '</button></p>' : '');
          }).join('') +
          '<button class="own" id="own"><span>' + esc(t('doors.own')) + '</span>' +
          '<span class="go arrow" aria-hidden="true">→</span></button>' +
        '</div>' +
        '<p class="tiny">' + esc(DOORS.foot) + ' ' + esc(t('doors.foot')) + '</p>' +
      '</div>');
    wireBack('start');
    qa('[data-door]').forEach(function (b) {
      b.onclick = function () { S.filter = b.getAttribute('data-door'); go('pick'); };
    });
    /*
      B24, founder 2026-09-04. The note says "Help has places that are", and until today Help
      did not have them. Now that it does, the sentence goes there when it is tapped instead
      of naming a screen three taps away through a row this person may never have used.

      It moves inside the app; it is not a link, so the rule that only Help carries links is
      untouched (menu.test.js checks that on every other screen).
    */
    qa('[data-note]').forEach(function (b) {
      b.onclick = function () {
        go('help');
        /*
          And land on the group, not at the top. Help is four screenfuls long, and a person
          who has just been told "this isn't the right thing" should not have to scroll past
          an essay about CBT to reach what the sentence promised them.

          Focus, not a scroll: it moves the view for somebody looking and the reading point
          for somebody listening, which a scroll on its own does not (see "heard, not seen").
        */
        var h = q('#group-substances');
        if (h && h.focus) { try { h.focus(); } catch (e) { /* older browser */ } }
        /*
          focus() on its own scrolls the least it can get away with, which put the heading at
          the bottom of the screen with two of the six places under the fold. This puts it at
          the top. Both, in this order: the focus is what a screen reader follows, the scroll
          is what an eye follows, and neither does the other's job.
        */
        if (h && h.scrollIntoView) { try { h.scrollIntoView(); } catch (e) { /* older browser */ } }
      };
    });
    /* Nobody is in all six. The way out of the screen is the same one as inside a door. */
    on('#own', newTest);
  }

  function pick() {
    var list = worriesFor(S.filter);
    paint( backButton() +
      '<div class="stage">' +
        head('h2', t('pick.title')) +
        '<p class="sub">' + esc(t('pick.sub')) + '</p>' +
        '<div class="list">' +
          list.map(function (f) {
            /*
              B19, and the change the whole task exists for. The `belief` is the only part of
              a worry that explains itself, and until now the first place a person saw it was
              the re-rate — four screens after they had chosen. It is drawn here, under the
              label, in the shape a door already used and that two test users read on sight.
              Nothing new is written for it: it is the sentence being tested.
            */
            return '<button data-id="' + esc(f.id) + '"><span>' + esc(f.label) +
              '<span class="under">' + esc(f.belief) + '</span></span>' +
              '<span class="go arrow" aria-hidden="true">→</span></button>';
          }).join('') +
          '<button class="own" id="own"><span>' + esc(t('pick.own')) + '</span>' +
          '<span class="go arrow" aria-hidden="true">→</span></button>' +
        '</div>' +
        '<p class="tiny">' + esc(t('pick.notHere')) + '</p>' +
      '</div>');
    /*
      Back is always the doors now. "Show all" is gone with it: twenty-one worries carrying a
      sentence each is the scroll this task was opened to remove, and a person who is in none
      of the six has "Something else" on the doors screen itself.
    */
    wireBack('doors');
    /*
      B32. Tapping one no longer starts a test, and no longer opens a screen of its own: it
      opens the build screen with the sentence half written and the plan already in the boxes.
      A borrowed test is a test of your own with the blanks filled in.
    */
    qa('[data-id]').forEach(function (b) {
      b.onclick = function () { borrow(content.byId(WORRIES, b.getAttribute('data-id'))); };
    });
    /* Both of these now open the same blank build screen the front door does. */
    on('#own', newTest);
  }

  /*
    THE TWO SCREENS BETWEEN THE LIST AND THE TEST WENT ON 2026-09-08 (B32).

    `beliefScreen` was B20's, and B20's finding stands: a worry is a situation, the thing an
    experiment tests is the prediction underneath it, and there is more than one under every
    situation — so the person says which of three is theirs, because a prediction that is only
    nearly yours cannot be disconfirmed by anything that happens. `beliefOwn` was the fourth
    option on it, a box for putting it their own way.

    Neither is deleted so much as MOVED. The three predictions are a row of suggestion chips
    under the sentence on the build screen, and "my own way" is what the build screen IS: two
    blanks a person types into. The hand-written `expect` still travels with a prediction that
    is taken word for word — see builtTest().

    What it cost: two taps came off the borrow road, and six taps to a locked-in test is four
    again. Do not "restore" the screens; the founder was shown this shape and chose it.
  */

  /* ---------------------------------------------- the build screen (B30) */

  /*
    The way in since 2026-09-08, and the one place in BETR that is a form. The founder made
    rule 10 and overruled it here, knowingly (B28): "an If block and a Then block, each an
    open field with suggestions, then what they will do, with suggestions on every part."

    Why a form and not the three one-box screens it replaces. B28's diagnosis was that nobody's
    worry is a stock worry and the person's own words were the last button, three screens deep,
    labelled as a failure to find a match. Making them the front door means the sentence has to
    be visible AS a sentence while it is being written — "If I ___, then ___" with two gaps in
    it, not two questions in a row that a person has to hold in their head.

    THE SHAPE IS THE GUARD. Because the screen prints "If I" and ", then", every entry is
    conditional by construction: the three shape refusals and the shape nudge are unreachable
    from here, and so is the verdict refusal, because "I am a bad person" typed into the first
    blank comes out as a conditional. `guards.checkPart` is what is left — an empty blank, and
    anyone's safety, on either half. See the comment above it.

    THE CHIPS ARE HELP, NOT A MENU. They are drawn under a blank only while that blank is
    empty, so a person who types sees them once and never again; in a browser an `oninput`
    handler hides them the moment there is something in the box, which needs no repaint and so
    never moves the caret. Everything they hold is fixed content in content/starts.js in a
    fixed order, and which `thens` are offered depends on one thing — whether the first blank
    holds, word for word, one of the starts. A lookup, not a judgement (rule 2).

    THE BAR IS THE FOUNDER'S: from a car, under thirty seconds to Lock it in. Typing is the
    fast road and it is at the top of the screen; the chips are underneath, for somebody who
    does not yet know what to say.
  */

  /*
    The stored sentence, assembled from the same two fragments the screen prints.

    The one wrinkle is the apostrophe: "If I" plus "'m not reachable for an evening" is one
    word, not two, and half the stock sentences are written that way. So the space between
    them is dropped when the first blank opens with an apostrophe or a comma — which is also
    what a person gets if they type it that way themselves.
  */
  function sentenceOf(ifPart, thenPart) {
    var a = String(ifPart || '').trim().replace(/[.,;]+$/, '');
    var b = String(thenPart || '').trim();
    if (!a && !b) return '';
    var glue = /^[\u2019\u0027,]/.test(a) ? '' : ' ';
    var out = t('build.ifWord') + glue + a + t('build.thenWord') + ' ' + b;
    return /[.!?]$/.test(out) ? out : out + '.';
  }

  /*
    The start a typed first blank matches, or null. Word for word, ignoring case and the
    punctuation a person's keyboard might have added — and nothing cleverer than that, ever.
  */
  /* \u0027 is a straight apostrophe. Written as an escape so the sweep in i18n.test.js,
     which reads this file's string literals, does not see a quote opening here. */
  function flat(text) {
    return String(text || '').toLowerCase()
      .replace(/[^a-z0-9\u2019\u0027 ]+/g, ' ').replace(/\s+/g, ' ').trim();
  }

  function startFor(ifPart) {
    var want = flat(ifPart);
    if (!want) return null;
    for (var i = 0; i < STARTS.items.length; i++) {
      if (flat(STARTS.items[i].if) === want) return STARTS.items[i];
    }
    return null;
  }

  /* The four chip sets, each falling back to the general one. */
  function chipsFor(which, ifPart) {
    var start = startFor(ifPart);
    return (start && start[which]) || STARTS.general[which] || [];
  }

  /* The item being borrowed from, or null (B32). */
  function borrowed() {
    return draft.stock ? content.byId(WORRIES, draft.stock) : null;
  }

  /*
    A stock "If I ___, then ___" taken apart into the two things a person would have typed.
    Every one is held to that shape by lib/content.js, and content.test.js proves each splits
    cleanly, so a prefill can never land half a sentence in a blank.
  */
  function splitBelief(said) {
    var m = String(said || '').trim().match(/^If\s+I([\s\S]*?),\s*then\s+([\s\S]*)$/i);
    if (!m) return [String(said || '').trim(), ''];
    return [m[1].trim(), m[2].trim().replace(/\.$/, '')];
  }

  /*
    One row of suggestions. `attr` is what the tap handler reads the index off. Hidden with
    the `hidden` attribute rather than removed, so the browser's oninput can bring it back
    without a repaint.
  */
  function chipRow(intro, list, attr, hide) {
    if (!list.length) return '';
    /*
      The row is a named GROUP, and its name is the line already printed above it (B33). Read
      out on its own, "say no without giving a reason, button" says nothing about which blank
      it fills or that it is a suggestion at all — the sentence that makes sense of it is a
      paragraph a screen reader passes on its way in. `aria-labelledby` points at that same
      paragraph rather than repeating it, so nobody hears it twice.
    */
    var id = 'chips-' + esc(attr).replace(/[^a-z]/g, '');
    return '<div class="chipset" role="group" data-chips="' + esc(attr) +
      '" aria-labelledby="' + id + '"' + (hide ? ' hidden' : '') + '>' +
      '<p class="tiny chips-intro" id="' + id + '">' + esc(intro) + '</p>' +
      '<div class="chips" data-chiplist="' + esc(attr) + '">' + chipButtons(list, attr) + '</div>' +
    '</div>';
  }

  /*
    The buttons alone (B34 D1). Split out of chipRow because the second blank's row is
    reprinted in place when the first blank changes, and the row's heading — which a screen
    reader names the group by — has to survive that.
  */
  function chipButtons(list, attr) {
    return list.map(function (line, i) {
      return '<button class="chip" ' + attr + '="' + i + '">' + esc(line) + '</button>';
    }).join('');
  }

  /* Both blanks, read back off the screen, so nothing typed is lost to a repaint. */
  function readBlanks() {
    var a = q('#if');
    var b = q('#then');
    if (a) draft.ifPart = a.value;
    if (b) draft.thenPart = b.value;
  }

  /*
    One gap in the sentence. Every static attribute is in the first fragment on purpose:
    i18n.test.js reads the string literals out of this file looking for prose, and a fragment
    that starts mid-tag reads as two English words with a space between them.
  */
  function blank(id, label, placeholder, value) {
    return '<input class="blank" type="text" autocomplete="off" autocapitalize="none" spellcheck="false" id="' +
      id + '" aria-label="' + esc(label) + '" placeholder="' + esc(placeholder) + '" value="' +
      esc(value) + '">';
  }

  function build() {
    var f = borrowed();
    var ifChips = STARTS.items.map(function (it) { return it.if; });
    /*
      B34 D1. The second blank's suggestions are worked out ONCE, here, and the handlers below
      close over this same list — so a chip can only ever insert the words printed on it. They
      used to run the lookup again on the tap, which meant that a person who had TYPED the
      words of a start (the placeholder is one of them, word for word) tapped a chip saying one
      thing and got another sentence in the box.
    */
    var thenChips = chipsFor('thens', draft.ifPart);
    paint( backButton() +
      '<div class="stage">' +
        (f ? worryHead(f.label, '', false) : '') +
        head('h2', f ? t('build.borrowTitle') : t('build.title')) +
        '<p class="sub tight">' + esc(f ? t('build.borrowSub') : t('build.sub')) + '</p>' +
        warnBlock() +
        /*
          Two halves, each a printed fragment and the gap after it. They are wrapped in a
          group each so that the words stay with their own blank when the sentence runs onto
          two lines, which on a 390px phone it always does — before this, ", then" was left
          stranded at the end of the first line with its blank underneath.
        */
        '<p class="sentence">' +
          '<span class="part"><span class="fixed">' + esc(t('build.ifWord')) + '</span>' +
            blank('if', t('build.ifLabel'), t('build.ifPlaceholder'), draft.ifPart) + '</span>' +
          '<span class="part"><span class="fixed">' + esc(t('build.thenWord')) + '</span>' +
            blank('then', t('build.thenLabel'), t('build.thenPlaceholder'), draft.thenPart) + '</span>' +
        '</p>' +
        '<button class="big wide" id="next">' + esc(t('build.next')) + '</button>' +
        /*
          B32, and it is what B20's screen became. A borrowed item carries three predictions
          and the person says which is theirs — but each of the three is a whole sentence with
          its OWN two halves, not three endings to one beginning. So a chip shows the whole
          sentence and fills both blanks. Anything else would weld the card's beginning to
          another prediction's ending and produce a sentence nobody wrote.
        */
        (f ? chipRow(t('build.borrowChips'),
              f.beliefs.map(function (b) { return b.belief; }), 'data-b', false)
           /* One row at a time: the blank that has focus, and only while it is still empty. */
           : chipRow(t('build.ifChips'), ifChips, 'data-if', !!draft.ifPart.trim()) +
             chipRow(t('build.thenChips'), thenChips, 'data-then',
               !draft.ifPart.trim() || !!draft.thenPart.trim())) +
        /* Last, and small. A rule read before you have written anything is about somebody else. */
        '<p class="tiny">' + esc(t('build.only')) + '</p>' +
      '</div>');

    /*
      Always the front screen, wherever this was opened from. It is reached from three places
      — the front screen's big button, "New test" on the bottom row, and the borrow list — and
      a Back that guessed which would be a Back a person cannot predict.
    */
    wireBack('start');

    /*
      Focus goes to the first blank, not to the heading — this screen IS the box, the way the
      old one-box screens were, and it pays for it by naming both blanks (see build.ifLabel).
      An empty first blank takes it; a filled one hands over to the second.
    */
    var first = draft.ifPart.trim() && !draft.thenPart.trim() ? q('#then') : q('#if');
    if (first && first.focus) {
      first.focus();
      try { first.setSelectionRange(first.value.length, first.value.length); } catch (e) { /* older browser */ }
    }

    /*
      One tap on a second-blank suggestion. Wired against whatever list is printed at the time,
      so what a chip says is always what it puts in the box (B34 D1). Called again by
      refreshThens() when that list is reprinted.
    */
    function wireThens(list) {
      qa('[data-then]').forEach(function (b) {
        b.onclick = function () {
          readBlanks();
          draft.thenPart = list[Number(b.getAttribute('data-then'))];
          draft.expect = '';
          refusal = null;
          render();
        };
      });
    }

    /*
      B34 D1, the other half. `startFor()` ran at paint and nowhere else, so a person who
      TYPED a start's words was shown the general three while somebody who tapped the identical
      chip was shown the three written for it — and one screen later the plan suggestions
      matched, because that screen repaints. One journey, two answers to the same lookup.

      So the lookup runs again when the second blank takes focus, which is the moment before
      anybody can read that row. ONLY THE BUTTONS ARE REWRITTEN — not the screen, not the
      heading the row is named by, and nothing containing a caret. A repaint here is what would
      move the caret to the end of the box, which is why typing has never triggered one.

      Like the hiding and showing around it, this is live polish: the fake DOM in tests fires no
      events, so what a test sees is whatever the paint decided. The invariant that IS tested is
      the one above — a chip inserts the words printed on it.
    */
    function refreshThens() {
      var holder = q('[data-chiplist="data-then"]');
      if (!holder || typeof holder.innerHTML !== 'string') return;
      readBlanks();
      var list = chipsFor('thens', draft.ifPart);
      try { holder.innerHTML = chipButtons(list, 'data-then'); } catch (e) { return; }
      wireThens(list);
    }

    /*
      Live, and deliberately without a repaint: a repaint here would move the caret to the end
      of the box on every keystroke. The suggestions simply get out of the way.
    */
    wireChips([['#if', 'data-if'], ['#then', 'data-then', refreshThens]]);

    qa('[data-if]').forEach(function (b) {
      b.onclick = function () {
        readBlanks();
        draft.ifPart = ifChips[Number(b.getAttribute('data-if'))];
        refusal = null;
        render();
      };
    });
    wireThens(thenChips);
    /*
      One of the borrowed item's three. It fills both halves, and it carries the hand-written
      expectation written to go with it (B20) — what you would be braced for, which is not the
      same words as the prediction and is better than anything derived from it.
    */
    qa('[data-b]').forEach(function (btn) {
      btn.onclick = function () {
        var b = f.beliefs[Number(btn.getAttribute('data-b'))];
        var halves = splitBelief(b.belief);
        draft.ifPart = halves[0];
        draft.thenPart = halves[1];
        draft.expect = b.expect;
        refusal = null;
        render();
      };
    });

    on('#next', function () {
      readBlanks();
      var one = guards.checkPart(draft.ifPart, 'if');
      if (!one.ok) { refuse(one); return; }
      var two = guards.checkPart(draft.thenPart, 'then');
      if (!two.ok) { refuse(two); return; }
      go('build-do');
    });
  }

  /*
    "Under the ACTIVE blank" (B30) is what this is, and it is a measurement rather than a
    preference. With every chip row on screen at once, *Lock it in* sat at 981px on a 390x844
    phone and the menu is fixed over 785 — the button that ends the screen was invisible
    without scrolling, which is the same failure the doors' safety note had in B23.

    So one row at a time: the row for the box the person is in, and only while that box is
    still empty. A box gets its own row on focus and gives it up when it loses focus, which
    works for a finger and for a keyboard alike. None of it repaints, because a repaint here
    would move the caret to the end of the box on every keystroke.

    The fake DOM in tests fires no events, so what a test sees is whatever the paint decided.
    That is deliberate: the paint is the state a person lands on, and the rest is live polish.
  */
  function wireChips(boxes) {
    boxes.forEach(function (pair) {
      var box = q(pair[0]);
      var set = q('[data-chips="' + pair[1] + '"]');
      /* Optional third: something to run before the row is shown, so it is right when it is
         read. Only the second blank has one — see refreshThens() (B34 D1). */
      var before = pair[2];
      if (!box) return;
      var show = function (on) {
        if (!set) return;
        try { set.hidden = !on || !!box.value.trim(); } catch (e) { /* older browser */ }
      };
      box.oninput = function () { show(true); };
      box.onfocus = function () {
        if (before) before();
        show(true);
        boxes.forEach(function (other) {
          if (other[1] === pair[1]) return;
          var el = q('[data-chips="' + other[1] + '"]');
          try { if (el) el.hidden = true; } catch (e) { /* older browser */ }
        });
      };
    });
  }

  /*
    The second half. The sentence is at the top, in the same words in the same place it will
    be on every screen from here to the result (rule 10 as amended by B20).

    "And leave out" is optional and says so. Research §2.3 is why it is here at all — dropping
    the safety behaviour is the difference between a test and a day — and the founder's
    2026-09-08 note is why it does not block: freedom over completeness, on a box this small.
  */
  function buildDo() {
    var said = sentenceOf(draft.ifPart, draft.thenPart);
    var f = borrowed();
    /* Worked out once and closed over by the handlers, for the reason build() does it: a chip
       puts in the box what is printed on it, and cannot drift from it (B34 D1). */
    var doChips = chipsFor('dos', draft.ifPart);
    var dropChips = chipsFor('drops', draft.ifPart);
    paint( backButton() +
      '<div class="stage">' +
        /*
          Rule 10 as amended by B20: from the moment a sentence is chosen to the result, every
          screen says which test it belongs to, in the same words in the same place. A
          borrowed one has a label as well as the sentence; one built from nothing has only
          the sentence, and the sentence is its name (B30).
        */
        worryHead(f ? f.label : '', said, false) +
        head('h2', t('build.doTitle')) +
        '<p class="sub tight">' + esc(t('build.doSub')) + '</p>' +
        warnBlock() +
        '<textarea id="do" class="short" aria-labelledby="top" placeholder="' +
          esc(t('build.doPlaceholder')) + '">' + esc(draft.test) + '</textarea>' +
        chipRow(t('build.doChips'), doChips, 'data-do', !!draft.test.trim()) +
        '<p class="lbl drop-label" id="droplbl">' + esc(t('build.dropLabel')) + '</p>' +
        '<p class="sub tight">' + esc(t('build.dropSub')) + '</p>' +
        '<textarea id="drop" class="line" aria-labelledby="droplbl" placeholder="' +
          esc(t('build.dropPlaceholder')) + '">' + esc(draft.drop) + '</textarea>' +
        chipRow(t('build.dropChips'), dropChips, 'data-drop', true) +
        '<button class="big wide" id="lock">' + esc(t('build.lock')) + '</button>' +
        '<p class="tiny">' + esc(t('plan.lockNote')) + '</p>' +
      '</div>');

    /*
      B34 D2, and Back was the only way off this screen that did not do this. Both chip rows
      and *Lock it in* call readBoxes(); Back went straight to go('build'), so a person who
      typed a plan, went back one screen to fix a word of the sentence and came forward again
      found the plan gone — and on a borrowed test found the stock line sitting back in its
      place, which reads as BETR having overwritten them.
    */
    on('#back', function () { readBoxes(); go('build'); });
    var box = q('#do');
    box.focus();
    try { box.setSelectionRange(box.value.length, box.value.length); } catch (e) { /* older browser */ }

    wireChips([['#do', 'data-do'], ['#drop', 'data-drop']]);

    function readBoxes() {
      var d = q('#do');
      var r = q('#drop');
      if (d) draft.test = d.value;
      if (r) draft.drop = r.value;
    }
    qa('[data-do]').forEach(function (b) {
      b.onclick = function () {
        readBoxes();
        draft.test = doChips[Number(b.getAttribute('data-do'))];
        refusal = null;
        render();
      };
    });
    qa('[data-drop]').forEach(function (b) {
      b.onclick = function () {
        readBoxes();
        draft.drop = dropChips[Number(b.getAttribute('data-drop'))];
        refusal = null;
        render();
      };
    });

    on('#lock', function () {
      readBoxes();
      var one = guards.checkTest(draft.test);
      if (!one.ok) { refuse(one); return; }
      /* The drop is optional, so an empty one is not checked and not refused. */
      if (draft.drop.trim()) {
        var two = guards.checkTest(draft.drop);
        if (!two.ok) { refuse(two); return; }
      }
      lockIn(builtTest());
    });
  }

  /*
    The test about to be locked in, built from whatever is in the draft.

    TWO KINDS COME OUT OF ONE SCREEN, and which one is decided by the WORDS rather than by
    where they came from (B32). If somebody borrowed an item and locked in one of its three
    predictions word for word, this is that item: same `id`, same label, so rate.keyOf() hands
    them back the ladder they already had. Change so much as the first blank and it is their
    own test with an id of its own — and the borrowed item's card stays exactly where it was
    on Your tests, ladder untouched. That is the one place a person could feel they had lost
    one, which is why the card must still be there; `loop.test.js` proves it.

    `id` on an own test is its own, made once and kept: rate.keyOf() groups an own ladder by
    it, so fixing a typo tomorrow does not look like losing your history (B30).
  */
  function builtTest() {
    var said = sentenceOf(draft.ifPart, draft.thenPart);
    var f = borrowed();
    var same = f ? sameAsStock(f, said) : null;
    return {
      rid: storeLib.rid(),
      source: same ? 'stock' : 'own',
      id: same ? f.id : storeLib.rid(),
      label: same ? f.label : null,
      ifPart: draft.ifPart.trim(), thenPart: draft.thenPart.trim(),
      belief: same ? same.belief : said,
      /* B20's hand-written expectation, where the sentence is still B20's sentence. */
      x: same ? same.expect : guards.expectationFrom(said),
      test: draft.test.trim(), drop: draft.drop.trim(),
      from: 'build-do', editing: false, locked: null, missed: false
    };
  }

  /* Which of a borrowed item's three this is, word for word, or null if it is theirs now. */
  function sameAsStock(f, said) {
    var want = flat(said);
    for (var i = 0; i < f.beliefs.length; i++) {
      if (flat(f.beliefs[i].belief) === want) return f.beliefs[i];
    }
    return null;
  }

  /* Lock in and go. The same two lines the plan screen's button runs, in one place. */
  function lockIn(cur) {
    S.cur = cur;
    S.cur.locked = new Date().toISOString();
    askToPersist();
    go('locked');
  }

  /* -------- a person's own entry: three screens, one box each. Never a form. -------- */

  /*
    A refusal is the one place in the loop where the crisis block can appear, and it is the
    place it matters most: somebody has just typed a test about hurting themselves. It is the
    same block as the top of Help, so it names the country's own line — the person who has
    just typed that sentence is the last person who should be handed a number for somewhere
    they do not live (B17).
  */
  function warnBlock() {
    if (!refusal) return '';
    return '<div class="warn">' + esc(t(refusal.reason)) +
      (refusal.kind === 'harm' ? crisisBlock() : '') + '</div>';
  }

  /*
  /*
    THE NUDGE WENT ON 2026-09-08 (B32). It was the answer to a sentence that did not read as a
    prediction: show the shape that works once, and let the person's own words through on the
    next tap. The build screen prints "If I" and ", then" either side of the blanks, so a
    sentence that is not a prediction cannot be made there, and there is nothing left to ask
    about. `guards.checkBelief` still returns it and `guards.test.js` still proves it fires;
    nothing in the app reads it, which is the standing the two shape refusals have had since
    the day the nudge replaced them.
  */

  /* A refusal is read out, because focus goes to the heading and the heading has not changed. */
  function refuse(check) {
    refusal = check;
    say(t(check.reason));
    render();
  }

  /*
    ONE BOX, ONE QUESTION, ONE BUTTON — the shape `ownScreen` drew, and `takeBelief` decided
    what to do with what was typed. Both went on 2026-09-08 (B32) along with `ask`, the five
    screens that used them, and the nudge. What survives is the deciding, in lib/guards.js,
    where it always lived and where guards.test.js still proves every branch fires.

    Above them, until 2026-09-08, were `ownBelief`, `ownTest` and `ownDrop`: one question each,
    in a row — what do you think will happen, what will you do, what will you leave out. They
    were the last button on the third screen of the stock road, labelled as a failure to find a
    match, and the founder's B28 note is that nobody ever got that far. build() and buildDo()
    are the same three questions with the first two drawn as one sentence, at the front door.

    A phone that still has one of the five retired stage names stored lands on build(), which
    is where a person part way through writing a test belongs — see render().
  */

  /* ---------------------------------------------------------------- the loop */

  function plan() {
    var c = S.cur;
    paint( backButton() +
      '<div class="stage">' +
        worryHead(c.label, c.belief, true) +
        '<div class="plan">' +
          '<p class="lbl">' + esc(t('plan.today')) + '</p>' +
          '<p class="do wrote">' + esc(c.test) + '</p>' +
          '<p class="line wrote">' + tHtml('plan.line', { drop: '<b>' + esc(c.drop) + '</b>' }) + '</p>' +
          '<p class="lbl">' + esc(t('plan.expectLabel')) + '</p>' +
          (c.editing
            ? '<textarea id="x" class="short" aria-label="' + esc(t('plan.expectLabel')) + '">' +
              esc(c.x) + '</textarea><button class="edit" id="xdone">' + esc(t('plan.editDone')) + '</button>'
            : '<p class="expect wrote">' + esc(c.x) + '</p><button class="edit" id="xedit">' +
              esc(t('plan.edit')) + '</button>') +
        '</div>' +
        '<button class="big wide" id="lock">' + esc(t('plan.lock')) + '</button>' +
        '<p class="tiny">' + esc(t('plan.lockNote')) + '</p>' +
      '</div>');
    /* Back goes where they actually came from, not back into a half-finished entry. */
    wireBack(c.from || 'belief');
    on('#xedit', function () { c.editing = true; save(); render(); q('#x').focus(); });
    on('#xdone', function () { c.x = q('#x').value.trim() || c.x; c.editing = false; save(); render(); });
    on('#lock', function () {
      if (c.editing) { c.x = q('#x').value.trim() || c.x; c.editing = false; }
      c.locked = new Date().toISOString();
      askToPersist();
      go('locked');
    });
  }

  /*
    One screen, two states, and the second one is B27 item 1 (2026-09-04).

    Before it, tapping "Didn't get to it" added a kind sentence to a screen that otherwise did
    not move: the kicker still read LOCKED IN, the heading still said GO AND DO IT, and the
    button still offered to take the outcome. A test user asked whether it had registered.
    Rule 5 says a miss costs nothing, and the words said so while the screen went on issuing
    an instruction the person had just declined — which is the last thing they see, because
    tapping that is how somebody closes the app for the day.

    So `rest` is a state, not a sentence. Same screen, no new one (rule 10): the kicker and
    the heading change, the command softens to something a person could still take up, and
    "Didn't get to it" is not offered a second time, because it has already happened. The
    test and the drop stay exactly where they are — that is what is waiting for tomorrow.
  */
  function locked() {
    var c = S.cur;
    var offerInstall = !S.seenInstall && !isInstalled();
    var rest = !!c.missed;
    paint(
      '<div class="stage">' +
        worryHead(c.label, c.belief, false) +
        '<div class="kicker">' + esc(rest ? t('locked.restKicker') : t('locked.kicker')) + '</div>' +
        head('h2', rest ? t('locked.restTitle') : t('locked.title')) +
        '<p class="sub wrote">' + esc(c.test) + '<br><b>' + esc(c.drop) + '</b></p>' +
        (rest ? '<div class="note">' + esc(t('locked.missed')) + '</div>' : '') +
        /*
          B38 / B36 §10a. Only in the non-rest state: a person who has just put the test down
          for today is not about to find anything out, and B27's whole lesson was that this
          screen stops issuing things once they have declined.
        */
        (rest ? '' : '<p class="net">' + esc(t('locked.net')) + '</p>') +
        (offerInstall ? installBlock() : '') +
        '<button class="big wide" id="done">' +
          esc(rest ? t('locked.restDone') : t('locked.done')) + '</button>' +
        (rest ? '' : '<p class="tiny"><button id="miss">' + esc(t('locked.miss')) + '</button></p>') +
      '</div>');
    on('#done', function () { go('happened'); });
    /* The heading changes under them, so the note is read out as well as drawn. */
    on('#miss', function () { S.cur.missed = true; save(); say(t('locked.missed')); render(); });
    wireInstall();
  }

  function happened() {
    var c = S.cur;
    paint( backButton() +
      '<div class="stage">' +
        worryHead(c.label, c.belief, false) +
        head('h2', t('happened.title')) +
        '<p class="sub">' + esc(t('happened.sub')) + '</p>' +
        '<textarea id="o" aria-labelledby="top" placeholder="' + esc(t('happened.placeholder')) + '"></textarea>' +
        '<button class="big wide" id="next">' + esc(t('happened.next')) + '</button>' +
      '</div>');
    wireBack('locked');
    var o = q('#o');
    o.value = c.o || '';
    o.focus();
    on('#next', function () {
      var v = o.value.trim();
      if (!v) { o.focus(); return; }
      S.cur.o = v;
      save();
      go('sure');
    });
  }

  /*
    The re-rate. The four words sit in the grid; "more sure than before" sits small underneath,
    in the same place "didn't get to it" sits on the locked screen. It has to be there — a test
    can go badly and leave someone more convinced, and a ladder that can only fall is a nicer
    story than the person's week — and it has to be quiet, because it is not the point.
  */
  function sure() {
    var c = S.cur;
    var at = rate.levelFor(S.done, c);
    var tested = 0;
    S.done.forEach(function (d) { if (rate.keyOf(d) === rate.keyOf(c)) tested++; });
    paint( backButton() +
      '<div class="stage">' +
        worryHead(c.label, c.belief, false) +
        head('h2', t('sure.title')) +
        '<div class="ladder one" role="group" aria-label="' +
          esc(t('a11y.ladder', { belief: unstop(c.belief) })) + '">' +
          rung(t(tested ? 'ladder.lastTime' : 'ladder.started'), at, {}) +
        '</div>' +
        '<div class="choices">' +
          rate.CHOICES.filter(function (ch) { return !ch.quiet; }).map(function (ch) {
            return '<button data-key="' + esc(ch.key) + '">' + esc(t('rate.' + ch.key)) + '</button>';
          }).join('') +
        '</div>' +
        '<p class="tiny"><button data-key="more">' + esc(t('rate.more')) + '</button></p>' +
      '</div>');
    wireBack('happened');
    qa('[data-key]').forEach(function (b) {
      b.onclick = function () {
        var ch = rate.byKey(b.getAttribute('data-key'));
        /*
          `rid` is this result's own id, not the worry's — `id` is the worry's and every test
          of that worry shares it. It comes off the test in hand, which has carried it since
          the worry was picked, so a test locked in on Monday and finished on Thursday is one
          thing with one id from end to end (B9).

          `move` is the word that was tapped. `level` is where that landed, still written,
          because a ladder with one older result in it draws from those (rate.rungsFor).
        */
        S.done.push({
          rid: c.rid || storeLib.rid(),
          id: c.id, source: c.source, label: c.label, belief: c.belief,
          x: c.x, test: c.test, drop: c.drop, o: c.o,
          move: ch.key, level: rate.next(at, ch.key), rateLabel: t('rate.' + ch.key),
          when: new Date().toISOString()
        });
        S.cur = null;
        go('result');
      };
    });
  }

  function result() {
    var last = S.done[S.done.length - 1];
    if (!last) { go('start'); return; }
    var n = S.done.length;
    /* series() puts the most recently tested first, which is always the one just recorded. */
    var g = rate.series(S.done)[0];

    /*
      This screen is the product: what you were braced for, struck through, next to what
      actually happened. A shape does not survive being read aloud, so it is also one
      sentence in the live region — the one place the heading genuinely is not enough.
    */
    say(t('a11y.result', { expected: stop(last.x), happened: stop(last.o), level: g.level }));

    paint(
      '<div class="stage">' +
        worryHead(last.label, last.belief, true) +
        '<div class="result">' +
          '<p class="lbl">' + esc(t('result.expected')) + '</p>' +
          paras(last.x, 'you') +
          '<p class="lbl">' + esc(t('result.happened')) + '</p>' +
          paras(last.o, 'real') +
        '</div>' +
        '<div class="board">' +
          '<p class="lbl">' + esc(t('result.ladderLabel')) + '</p>' +
          ladder(g) +
          (g.tests > 1 && g.level < rate.TOP
            ? '<p class="moved">' + esc(t('result.moved', { n: rate.TOP - g.level })) + '</p>' : '') +
        '</div>' +
        '<div class="count" aria-hidden="true">' + n + '</div>' +
        '<p class="sub">' + esc(I.plural('result.count', n)) + '</p>' +
        '<div class="row">' +
          '<button class="big" id="again">' + esc(t('result.again')) + '</button>' +
          '<button class="ghost" id="other">' + esc(t('result.other')) + '</button>' +
        '</div>' +
        /* Last, and quiet. The result screen's run — expected, happened, ladder, count, do
           it again — is the product; this is an optional extra at the end of it, not a step. */
        whyLink(last.id, 'data-why') +
      '</div>');

    on('#again', function () { again(last, 'result'); });
    on('#other', function () { S.filter = null; go('doors'); });
    wireWhy('result');
  }

  /*
    Your worries. Founder, 2026-09-02: after two or three, you could not get back to an earlier
    one without hunting for it in the list, and the one thing you would want to see — the belief
    losing its grip test by test — was buried in a flat log. One card per belief, its ladder,
    what you wrote each time, and a way straight back into it.

    Nothing is combined across cards. Two worries are two separate things, and comparing them
    would be the beginning of a score.
  */
  function mine() {
    var groups = rate.series(S.done);
    if (!groups.length && !S.open.length) { go('doors'); return; }
    var n = S.done.length;

    /*
      One card per belief. A test that is waiting sits on the card for its own belief, and a
      belief you have started but never finished gets a card of its own, at the top. Nothing
      is combined across cards, and nothing is ordered by how long it has been waiting.
    */
    var cards = groups.map(function (g) {
      return { key: g.key, g: g, label: g.label, belief: g.belief, open: [] };
    });
    S.open.forEach(function (tst) {
      var k = rate.keyOf(tst);
      var card = null;
      cards.forEach(function (c) { if (c.key === k) card = c; });
      if (!card) {
        card = { key: k, g: null, label: tst.label, belief: tst.belief, open: [] };
        cards.unshift(card);
      }
      card.open.push(tst);
    });

    paint( backButton() +
      '<div class="stage">' +
        head('h2', t('mine.title')) +
        '<p class="sub">' + esc(n
          ? t('mine.summary', {
              kept: I.plural('mine.kept', groups.length),
              runs: I.plural('mine.runs', n)
            })
          : t('mine.nothing')) + '</p>' +
        cards.map(function (c) {
          /*
            B30. A borrowed test has a label and its sentence underneath; one a person built
            has no label, and its own sentence is the title. Never truncated, on either.
          */
          return '<div class="card">' +
            '<h3 class="kicker' + (c.label ? '' : ' said-it') + '">' +
              esc(titleOf(c)) + '</h3>' +
            (c.label ? '<p class="belief wrote">“' + esc(c.belief) + '”</p>' : '') +
            (c.g
              ? ladder(c.g, { said: true })
              : '<div class="ladder" role="group" aria-label="' +
                esc(t('a11y.ladder', { belief: unstop(c.belief) })) + '">' +
                rung(t('ladder.started'), rate.TOP, {}) + '</div>') +
            c.open.map(function (tst) {
              var i = S.open.indexOf(tst);
              return '<div class="waiting">' +
                '<p class="lbl">' + esc(t('mine.onTheGo')) + '</p>' +
                '<p class="do wrote">' + esc(tst.test) + '</p>' +
                (tst.missed ? '<p class="soft">' + esc(t('locked.missed')) + '</p>' : '') +
                '<div class="row">' +
                  '<button class="ghost" data-did="' + i + '">' + esc(t('mine.did')) + '</button>' +
                  '<button class="ghost" data-notyet="' + i + '">' + esc(t('mine.notYet')) + '</button>' +
                '</div>' +
              '</div>';
            }).join('') +
            (c.g ? '<button class="ghost" data-again="' + groups.indexOf(c.g) + '">' +
              esc(t('mine.again')) + '</button>' : '') +
            (c.g ? whyLink(c.g.id, 'data-why') : '') +
          '</div>';
        }).join('') +
        '<p class="tiny">' + esc(t('mine.foot')) + '</p>' +
      '</div>');

    wireBack('start');
    wireWhy('mine');
    qa('[data-again]').forEach(function (b) {
      b.onclick = function () { again(groups[Number(b.getAttribute('data-again'))].last, 'mine'); };
    });
    qa('[data-did]').forEach(function (b) {
      b.onclick = function () { resume(S.open[Number(b.getAttribute('data-did'))], 'happened'); };
    });
    /* Not getting to it costs nothing and changes nothing. It stays exactly where it is. */
    qa('[data-notyet]').forEach(function (b) {
      b.onclick = function () {
        var tst = S.open[Number(b.getAttribute('data-notyet'))];
        if (tst) { tst.missed = true; save(); say(t('locked.missed')); render(); }
      };
    });
  }

  /*
    ------------------------------------------------------------- why this one sticks

    B18, 2026-09-03. Two short paragraphs on what the worry actually is and what keeps it
    from being tested. It exists because the loop tells a person what to leave out and never
    says why leaving it out is the point of the whole thing.

    Three things decide its shape, and none is cosmetic:

      1. It is only offered once somebody has a result of their own. Read first, it is a
         lesson and it gets skimmed; read after their own evidence, it answers a question
         they have actually got. So it hangs off the result screen and off a card that has a
         ladder on it, and off nothing else. Never on Pick, never inside the loop.
      2. It is a screen, not an overlay (CLAUDE.md rule 10). Everything here goes through
         paint(), which moves focus to the heading and gets it read out; a modal would mean a
         focus trap, an escape key, an inert background and a scroll lock, all written by hand,
         in an app that has not yet been in front of anybody who uses a screen reader.
      3. The words come from content/why.js keyed by the worry id and by nothing else. It
         never reads S.done, a rung, a re-rate or a missed test. Everybody who taps this on
         the same worry reads the same two paragraphs forever, which is what keeps it a
         chapter in a book rather than something the app decided about a person (research
         §5.2). A person's own worry has no entry, so no link appears — which is also the
         answer for custom worries if Q3 ever lets them in.

    The closing line is frozen and identical under all twelve, and it points at Help rather
    than carrying a link: every link in BETR is in content/places.js and nowhere else.
  */
  function whyFor(id) {
    return (id && WHY && Object.prototype.hasOwnProperty.call(WHY, id)) ? WHY[id] : null;
  }

  /* The small link under a ladder. Draws nothing where there is nothing to read. */
  function whyLink(id, attr) {
    if (!whyFor(id)) return '';
    return '<p class="tiny"><button class="plain" ' + attr + '="' + esc(id) + '">' +
      esc(t('why.link')) + '</button></p>';
  }

  function wireWhy(from) {
    qa('[data-why]').forEach(function (b) {
      b.onclick = function () {
        var id = b.getAttribute('data-why');
        if (!whyFor(id)) return;
        whyId = id;
        whyBack = from;
        go('why');
      };
    });
  }

  function whyScreen() {
    var entry = whyFor(whyId);
    if (!entry) { go('mine'); return; }
    var f = content.byId(WORRIES, whyId);

    paint( backButton() +
      '<div class="stage"><div class="sheet">' +
        head('h2', t('why.title', { label: f ? f.label : '' })) +
        (f ? '<p class="belief wrote">\u201C' + esc(f.belief) + '\u201D</p>' : '') +
        '<div class="primer">' +
          '<p>' + esc(entry.what) + '</p>' +
          '<p>' + esc(entry.why) + '</p>' +
        '</div>' +
        '<p class="quiet">' + esc(t('why.foot')) + '</p>' +
      '</div></div>');

    wireBack(whyBack);
  }

  /*
    Repeating a test. A stock item is looked up fresh, so a corrected wording in worries.js
    reaches everyone who repeats it, including anyone whose old result still quotes the
    wording it had before. A person's own test falls back to what they wrote.
  */
  function testFor(d) {
    var f = d.id ? content.byId(WORRIES, d.id) : null;
    return f ? f.test : (d.test || '');
  }
  function dropFor(d) {
    var f = d.id ? content.byId(WORRIES, d.id) : null;
    return f ? f.drop : (d.drop || '');
  }

  /* ---------------------------------------------------------------- install */

  function isInstalled() {
    try {
      return (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) ||
        window.navigator.standalone === true;
    } catch (e) { return false; }
  }

  /*
    Not a nag and not a growth tactic. iPhone Safari clears a web page's storage after seven
    days without a visit, so a person who does three tests and comes back in a fortnight has
    lost them — harmed by our own privacy design. Home-screen install is what stops that.
  */
  function installBlock() {
    return '<div class="note">' +
      '<b>' + esc(t('install.title')) + '</b> ' + esc(t('install.body')) +
      (installEvent
        ? '<div class="row"><button class="ghost" id="install">' + esc(t('install.add')) + '</button>' +
          '<button class="ghost" id="nothanks">' + esc(t('install.notNow')) + '</button></div>'
        : '<div class="row"><span class="tiny">' + esc(t('install.how')) + '</span>' +
          '<button class="ghost" id="nothanks">' + esc(t('install.gotIt')) + '</button></div>') +
    '</div>';
  }

  function wireInstall() {
    on('#nothanks', function () { S.seenInstall = true; save(); render(); });
    on('#install', function () {
      S.seenInstall = true; save();
      if (installEvent) { installEvent.prompt(); installEvent = null; }
      render();
    });
  }

  /* Asks the browser to keep the data. No network, no permission dialog on most browsers. */
  function askToPersist() {
    try {
      if (navigator.storage && navigator.storage.persist) navigator.storage.persist();
    } catch (e) { /* nothing to do, and nothing to report */ }
  }

  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    installEvent = e;
  });

  /* ---------------------------------------------------------------- help */

  /*
    Help. Three doors down from every screen, and the order on it is the whole point: the
    person who needs the first block most is the least able to go looking for it (B8).

      1. the crisis lines, above everything, scrolled past by nobody
      2. what it costs and what leaves the phone: the free line, the airplane-mode proof, the
         three counters, export and delete. Second since B26, 2026-09-04 — it was fourth, and
         the person who taps Help to check for a catch had to scroll three and a half screens
         to find the strongest thing BETR has. Nothing was deleted to make room and nothing
         above it moved
      3. what CBT is and which bit of it this is — the one clear thing to read, asked for by
         the founder on 2026-09-03. B8's order had this screen going straight from the crisis
         lines into the small print; this is the deliberate change to it
      4. what this is: the purpose statement and the nine sentences, word for word
      5. other places to go, none of them run by us, from content/places.js
      6. who made this, the language, and the code

    The nine sentences are frozen in WORDING, not in position, and nothing about their own
    order changed here — a block moved above them. Their wording is checked by menu.test.js
    against research §10 and it is not this function's to touch.

    Nothing on this screen is fetched. A link is inert until a person taps it, and then it is
    their browser going there — no favicon, no preview, no availability check, nothing counted.
    Turn wifi off and this screen still reads correctly, which is the proof that holds.
  */
  function help() {
    var build = document.querySelector('meta[name="betr-build"]');
    var hash = build ? build.getAttribute('content') : 'dev';
    var primer = I.list('help.primer');

    paint( backButton() +
      '<div class="stage"><div class="sheet">' +

        head('h2', t('crisis.title')) +
        crisisBlock() +
        '<p class="quiet">' + esc(t('crisis.howWeKnow')) + '</p>' +

        /*
          B26, founder 2026-09-04. This block used to sit fourth, 2,607px down — three and a
          half screens. A test user tapped Help for one reason, to find out what BETR costs
          before typing anything into it, and the first thing he got was a suicide line. He
          scrolled, and what would have answered him was past the CBT explainer and the nine
          sentences (`docs/journeys-observed.md` finding 6).

          THE CRISIS BLOCK DID NOT MOVE and does not move. B17 put it first for the person who
          cannot scroll and gets one chance, and that person is still first. This is second
          now because the person checking for a catch is a different person, and until today
          they got the same screen.

          `help.free` is the answer to the question he actually arrived with, and BETR had
          never once said it — not here, not on the front screen, not anywhere. It names BETR
          and only BETR: TrybeUP's paid plan is stated in TrybeUP's own entry further down,
          and that admission is the other thing that kept him (rule 9 — it stays where it is).
        */
        '<h2>' + esc(t('help.proofTitle')) + '</h2>' +
        '<p>' + esc(t('help.free')) + '</p>' +
        '<p>' + esc(t('help.airplane')) + '</p>' +
        '<div class="proof">' +
          '<span><b>' + S.done.length + '</b><small>' + esc(t('help.proofResults')) + '</small></span>' +
          '<span><b>0</b><small>' + esc(t('help.proofAccounts')) + '</small></span>' +
          '<span><b>' + esc(t('help.zeroBytes')) + '</b><small>' + esc(t('help.proofSent')) + '</small></span>' +
        '</div>' +
        '<p><button class="plain" id="export">' + esc(t('io.export')) + '</button>' +
        '<button class="plain" id="wipe">' + esc(t('io.wipe')) + '</button></p>' +
        '<div id="io"></div>' +

        /*
          B33, 2026-09-08. Frozen sentence 6 said twice, and the second time is not a copy:
          this draws the same array element the numbered list below draws, so there is exactly
          one version of it in the build and it cannot drift.

          It is here, third, because of what happened to rule 4 on the same day. The habit and
          body word lists stopped refusing a person's own test — the founder's call — which
          makes this sentence the only place in BETR where the line is drawn at all. Fourth,
          buried in a numbered list, was the right position for a line the app also enforced.
          It is not any more.

          IT DOES NOT MOVE ABOVE THE CRISIS BLOCK (B17) OR THE PROOF (B26). Both of those are
          for a person who gets one chance at the screen, and this is for a person who is
          about to design something.
        */
        '<h2>' + esc(t('help.safeTitle')) + '</h2>' +
        '<p>' + callable(sentences()[5]) + '</p>' +

        /*
          The primer. Founder, 2026-09-03: there should be one clear thing to read about CBT,
          before the small print. It sits second, under the crisis lines and above everything
          else, and it is written fresh — not a word of it comes from CCI, Getselfhelp,
          Therapist Aid, Psychology Tools or the Beck Institute (rule 8). It explains and it
          points; it claims nothing the nine sentences below do not already say.
        */
        '<h2>' + esc(t('help.cbtTitle')) + '</h2>' +
        '<div class="primer">' +
          primer.map(function (p) {
            return '<p>' + bold(esc(p), t('help.experiment')) + '</p>';
          }).join('') +
          '<p>' + esc(t('help.readingIntro')) + '</p>' +
          '<ul class="places">' + PLACES.reading.map(function (r) {
            return '<li><a href="' + esc(r.url) + '" target="_blank" rel="noopener noreferrer">' +
              esc(r.name) + '</a> — ' + esc(r.what) + '</li>';
          }).join('') + '</ul>' +
        '</div>' +

        '<h2>' + esc(t('help.whatThisTitle')) + '</h2>' +
        '<p>' + esc(purpose()) + '</p>' +
        '<ol>' + sentences().map(function (s) { return '<li>' + callable(s) + '</li>'; }).join('') + '</ol>' +

        '<h2>' + esc(t('help.placesTitle')) + '</h2>' +
        '<p>' + esc(PLACES.intro) + '</p>' +
        PLACES.groups.map(function (grp) {
          /*
            B24. A group may carry one `note`, drawn under its title. One does: the alcohol
            and drug group, saying which countries it covers. It is on the GROUP and never on
            an item, so there is still nowhere to hang a rule that shows one person a
            different list from another (places.js rule 3).
          */
          return '<h3' + (grp.id ? ' id="group-' + esc(grp.id) + '" tabindex="-1"' : '') +
            '>' + esc(grp.title) + '</h3>' +
            (grp.note ? '<p class="tiny">' + esc(grp.note) + '</p>' : '') +
            '<ul class="places">' + grp.items.map(function (place) {
              return '<li><a href="' + esc(place.url) + '" target="_blank" rel="noopener noreferrer">' +
                esc(place.name) + '</a> — ' + esc(place.what) + '</li>';
            }).join('') + '</ul>';
        }).join('') +

        '<h2>' + esc(t('help.whoTitle')) + '</h2>' +
        '<p>' + esc(t('help.who')) + '</p>' +

        languageBlock() +

        '<h2>' + esc(t('help.codeTitle')) + '</h2>' +
        '<p>' + esc(t('help.code')) + '</p>' +
        '<p class="build">' + (hash === 'dev' ? esc(t('help.devBuild')) : esc(hash)) + '</p>' +

      '</div></div>');

    wireBack('start');
    on('#export', showExport);
    on('#wipe', armDelete);
    wireLanguage();
  }

  /*
    The language switch: one line in Help and nothing else (CLAUDE.md rule 10 — not a flag,
    not a picker on the front screen, not a first-run question). Each language is named in
    its own words, because a person looking for Français is not looking for "French".

    While English is the only language in the build there is nothing to choose between, so
    this draws nothing at all. B16 adds a second file and this appears on its own.
  */
  function languageBlock() {
    var all = I.locales();
    if (all.length < 2) return '';
    return '<h2>' + esc(t('help.langTitle')) + '</h2>' +
      '<p>' + esc(t('help.langNote')) + '</p>' +
      '<ul class="places languages">' + all.map(function (l) {
        return '<li><button class="plain" data-lang="' + esc(l.code) + '" lang="' + esc(l.code) + '">' +
          esc(l.name) +
          (l.code === I.code
            ? ' <span aria-hidden="true">✓</span><span class="sr">' + esc(t('where.chosen')) + '</span>'
            : '') + '</button></li>';
      }).join('') + '</ul>';
  }

  function wireLanguage() {
    qa('[data-lang]').forEach(function (b) {
      b.onclick = function () {
        S.lang = b.getAttribute('data-lang');
        save();
        I = Betr.i18n.create(Betr.strings, { chosen: S.lang, prefer: myLanguages() });
        applyLanguage();
        render();
        window.scrollTo(0, 0);
      };
    });
  }

  function showExport() {
    var json = storeLib.exportJSON(S, t('io.exportNote'));
    var io = q('#io');
    io.innerHTML =
      '<p><button class="plain" id="copy">' + esc(t('io.copy')) + '</button>' +
      (navigator.share ? '<button class="plain" id="share">' + esc(t('io.share')) + '</button>' : '') +
      '</p><textarea id="dump" readonly aria-label="' + esc(t('io.export')) + '"></textarea>';
    q('#dump').value = json;
    on('#copy', function () {
      var box = q('#dump');
      box.select();
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(json);
        else document.execCommand('copy');
      } catch (e) { /* the text is selected either way; the person can copy it themselves */ }
      q('#copy').textContent = t('io.copied');
      announce(t('io.copied'));
    });
    on('#share', function () {
      /* The OS share sheet. It goes where the person sends it, and nowhere else. */
      try {
        var p = navigator.share({ title: t('brand'), text: json });
        if (p && p.catch) p.catch(function () { /* dismissed */ });
      } catch (e) { /* dismissed */ }
    });
  }

  function armDelete() {
    var io = q('#io');
    if (!deleteArmed) {
      deleteArmed = true;
      io.innerHTML = '<div class="warn">' + esc(t('io.deleteAsk')) +
        '<div class="row"><button class="ghost" id="yes">' + esc(t('io.deleteYes')) + '</button>' +
        '<button class="ghost" id="no">' + esc(t('io.deleteNo')) + '</button></div></div>';
      announce(t('io.deleteAsk'));
      on('#yes', function () {
        S = storeLib.blank();
        deleteArmed = false;
        refusal = null;
        render();
        window.scrollTo(0, 0);
        /* Last, so nothing is written back afterwards. The key is gone until the next tap. */
        store.clear();
        /* And the look, so a wiped BETR and a fresh BETR are the same phone byte for byte. */
        look.forget();
      });
      on('#no', function () { deleteArmed = false; io.innerHTML = ''; });
    }
  }

  /* ---------------------------------------------------------------- go */

  /*
    One open, one step of the example counter (B31). Here rather than inside start(), so that
    walking back to the front screen during a session does not swap the card underneath
    somebody. It writes through save(), which for a person with nothing else stored is a
    no-op — see exampleIndex() for why that is the right way round.
  */
  shown = typeof S.seen === 'number' && S.seen === S.seen ? S.seen : 0;
  S.seen = shown + 1;
  save();

  applyLanguage();
  render();
})();
