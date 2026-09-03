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
  var rate = Betr.rate;
  var storeLib = Betr.store;
  var content = Betr.content;
  var WORRIES = Betr.worries;
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

  /* Scratch state: never persisted, because none of it should survive a reload. */
  var draft = { belief: '', test: '', drop: '' };
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
  /*
    B20. The worry a person has tapped but not yet started: they are choosing which of its
    three "If I ___, then ___" is theirs, or writing their own. Not stored, for the same
    reason whyId is not — a reload here drops back to the doors rather than adding a field
    to a person's saved state for a screen they are two taps from anyway.
  */
  var pending = null;
  var toSay = null;        /* what the next paint() should read out. Cleared as it is used */

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
    app.innerHTML = html + menu();
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
  function worryHead(label, belief, heading) {
    return '<div class="worry' + (heading ? '' : ' quiet') + '">' +
      (heading ? head('h2', label, 'worry-label')
               : '<p class="worry-label">' + esc(label) + '</p>') +
      (belief ? '<p class="worry-belief wrote">\u201C' + esc(belief) + '\u201D</p>' : '') +
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
    on('#m-new', function () { S.filter = null; go('doors'); });
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
    `b` is the belief the person chose on the screen after the list — one of the worry's
    three, or the one they wrote themselves. It carries the expectation with it, because the
    two are the same prediction said twice and a mismatched pair is how the old single
    `expect` came to be wrong for so many people (B20).
  */
  function startFrom(f, b) {
    S.cur = {
      rid: storeLib.rid(),
      source: 'stock', id: f.id, label: f.label, belief: b.belief,
      x: b.expect, test: f.test, drop: f.drop,
      from: 'belief', editing: false, locked: null, missed: false
    };
  }

  /* The arrow is decoration and is flipped by the stylesheet in a right-to-left language. */
  function backButton() {
    return '<button class="back" id="back"><span class="arrow" aria-hidden="true">←</span> ' +
      esc(t('back')) + '</button>';
  }
  function wireBack(target) { on('#back', function () { go(target); }); }

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
      belief: beliefScreen, 'belief-own': beliefOwn,
      'own-belief': ownBelief, 'own-test': ownTest, 'own-drop': ownDrop,
      plan: plan, locked: locked, happened: happened, sure: sure,
      result: result, mine: mine, help: help, where: whereScreen, why: whyScreen,
      about: help   /* what a phone that saw the old "what this is" screen has stored */
    };
    /* Any half-finished loop that lost its item drops back to the start rather than crashing. */
    if (IN_LOOP.indexOf(S.stage) !== -1 && !S.cur) S.stage = 'start';
    /* Same for a reload on "Why this one sticks", which knows its worry only in memory. */
    if (S.stage === 'why' && !whyFor(whyId)) S.stage = 'mine';
    /* And for the two screens between the list and a test, which know theirs the same way. */
    if ((S.stage === 'belief' || S.stage === 'belief-own') && !pending) S.stage = 'doors';
    (map[S.stage] || start)();
    wireCrisis();
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

  function start() {
    paint(
      '<div class="stage">' +
        '<div class="kicker">' + esc(t('brand')) + '</div>' +
        head('h1', t('start.title')) +
        '<p class="sub">' + esc(t('start.sub')) + '</p>' +
        '<button class="big pulse" id="go">' + esc(t('start.go')) +
          ' <span class="arrow" aria-hidden="true">→</span></button>' +
        waitingBlock() +
        '<p class="tiny">' + esc(t('start.promise')) + '</p>' +
        (storageOk ? '' : '<p class="tiny">' + esc(t('start.noStorage')) + '</p>') +
      '</div>');
    /*
      B19. The one big button leads to the doors, not to the whole list. Two people were
      watched choosing from twenty-one two-word labels' worth of ambiguity and neither could;
      both read a door on sight. `start.doors` — "Not sure which?" — is gone with it, because
      it is no longer a second way in, it is the way in.
    */
    on('#go', function () { S.filter = null; go('doors'); });
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
              (d.note ? '<p class="doornote">' + esc(d.note) + '</p>' : '');
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
    /* Nobody is in all six. The way out of the screen is the same one as inside a door. */
    on('#own', function () { draft = { belief: t('own.beliefSeed'), test: '', drop: '' }; go('own-belief'); });
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
      B20. Tapping a worry no longer starts a test. It opens the one screen between the list
      and the plan, where the person says which prediction underneath it is actually theirs.
    */
    qa('[data-id]').forEach(function (b) {
      b.onclick = function () { pending = content.byId(WORRIES, b.getAttribute('data-id')); go('belief'); };
    });
    /* The box starts with the opening of a conditional already in it, in their language. */
    on('#own', function () { draft = { belief: t('own.beliefSeed'), test: '', drop: '' }; go('own-belief'); });
  }

  /* ---------------------------------------------- which of these is it? (B20) */

  /*
    The screen the whole of B20 exists for.

    A worry is a situation. The thing a behavioural experiment actually tests is the
    prediction underneath it — and there is more than one prediction under every situation on
    the list. One sentence per worry had to guess which, and test users read the guess and
    said it "sort of matches what my worry is, but not really". A prediction that is only
    nearly yours cannot be disconfirmed by anything that happens, so the loop runs and moves
    nothing.

    So the three are the common ones and the person says which is theirs, in one tap, with
    what they are braced for written under each so the choice is between two things they can
    feel rather than two sentences they have to parse. It is the same shape as the pick list
    and the doors, deliberately: three screens in a row that a person reads the same way.

    "I'll put it my own way" keeps everything else about the worry — the label it is filed
    under, the test, the thing to leave out, the explanation behind "Why this one sticks" —
    and replaces only the sentence being tested. It goes through the same guard a fully
    custom belief does, because it is one.
  */
  function beliefScreen() {
    var f = pending;
    paint( backButton() +
      '<div class="stage">' +
        worryHead(f.label, '', true) +
        '<p class="sub tight">' + esc(t('belief.sub')) + '</p>' +
        '<div class="list">' +
          f.beliefs.map(function (b, i) {
            return '<button data-b="' + i + '"><span>' + esc(b.belief) +
              '<span class="under">' + esc(b.expect) + '</span></span>' +
              '<span class="go arrow" aria-hidden="true">\u2192</span></button>';
          }).join('') +
          '<button class="own" id="own"><span>' + esc(t('belief.own')) + '</span>' +
          '<span class="go arrow" aria-hidden="true">\u2192</span></button>' +
        '</div>' +
        '<p class="tiny">' + esc(t('belief.foot')) + '</p>' +
      '</div>');
    wireBack('pick');
    qa('[data-b]').forEach(function (btn) {
      btn.onclick = function () {
        startFrom(f, f.beliefs[Number(btn.getAttribute('data-b'))]);
        go('plan');
      };
    });
    /* The box opens with the opening of a conditional in it, in their language. */
    on('#own', function () { draft.belief = t('own.beliefSeed'); go('belief-own'); });
  }

  /*
    Their own sentence, for a worry that is still ours. One box, the same words and the same
    guard as the first screen of a fully custom entry — a verdict is reframed here too, and
    "If I ___" is still the only shape that goes through. The placeholder is the worry's own
    general sentence, because the nearest thing to what they want to write is already written.
  */
  function beliefOwn() {
    var f = pending;
    ownScreen({
      back: 'belief',
      before: worryHead(f.label, '', false),
      title: t('own.belief.title'),
      sub: t('own.belief.sub'),
      placeholder: f.belief,
      value: draft.belief,
      next: function (v) {
        draft.belief = v;
        var check = guards.checkBelief(v);
        if (!check.ok) { refuse(check); return; }
        startFrom(f, { belief: v.trim(), expect: guards.expectationFrom(v) });
        go('plan');
      }
    });
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

  /* A refusal is read out, because focus goes to the heading and the heading has not changed. */
  function refuse(check) {
    refusal = check;
    say(t(check.reason));
    render();
  }

  function ownScreen(opts) {
    paint( backButton() +
      '<div class="stage">' +
        (opts.before || '') +
        head('h2', opts.title) +
        '<p class="sub tight">' + esc(opts.sub) + '</p>' +
        warnBlock() +
        '<textarea id="t" class="short" aria-labelledby="top" placeholder="' +
          esc(opts.placeholder) + '">' + esc(opts.value) + '</textarea>' +
        '<button class="big wide" id="next">' + esc(t('own.next')) + '</button>' +
      '</div>');
    wireBack(opts.back);
    var box = q('#t');
    box.focus();
    box.setSelectionRange(box.value.length, box.value.length);
    on('#next', function () { opts.next(box.value); });
  }

  function ownBelief() {
    ownScreen({
      back: 'pick',
      title: t('own.belief.title'),
      sub: t('own.belief.sub'),
      placeholder: t('own.belief.placeholder'),
      value: draft.belief,
      next: function (v) {
        draft.belief = v;
        var check = guards.checkBelief(v);
        if (!check.ok) { refuse(check); return; }
        go('own-test');
      }
    });
  }

  function ownTest() {
    ownScreen({
      back: 'own-belief',
      title: t('own.test.title'),
      sub: t('own.test.sub'),
      placeholder: t('own.test.placeholder'),
      value: draft.test,
      next: function (v) {
        draft.test = v;
        var check = guards.checkTest(v);
        if (!check.ok) { refuse(check); return; }
        go('own-drop');
      }
    });
  }

  function ownDrop() {
    ownScreen({
      back: 'own-test',
      title: t('own.drop.title'),
      sub: t('own.drop.sub'),
      placeholder: t('own.drop.placeholder'),
      value: draft.drop,
      next: function (v) {
        draft.drop = v;
        var check = guards.checkTest(v);
        if (!check.ok) { refuse(check); return; }
        S.cur = {
          rid: storeLib.rid(),
          source: 'own', id: null, label: t('own.label'),
          belief: draft.belief.trim(),
          x: guards.expectationFrom(draft.belief),
          test: draft.test.trim(),
          drop: draft.drop.trim(),
          from: 'own-drop', editing: false, locked: null, missed: false
        };
        go('plan');
      }
    });
  }

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

  function locked() {
    var c = S.cur;
    var offerInstall = !S.seenInstall && !isInstalled();
    paint(
      '<div class="stage">' +
        worryHead(c.label, c.belief, false) +
        '<div class="kicker">' + esc(t('locked.kicker')) + '</div>' +
        head('h2', t('locked.title')) +
        '<p class="sub wrote">' + esc(c.test) + '<br><b>' + esc(c.drop) + '</b></p>' +
        (c.missed ? '<div class="note">' + esc(t('locked.missed')) + '</div>' : '') +
        (offerInstall ? installBlock() : '') +
        '<button class="big wide" id="done">' + esc(t('locked.done')) + '</button>' +
        '<p class="tiny"><button id="miss">' + esc(t('locked.miss')) + '</button></p>' +
      '</div>');
    on('#done', function () { go('happened'); });
    /* Nothing happens visually below the fold, so the note is read out as well as drawn. */
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
              tests: I.plural('mine.tests', n),
              worries: I.plural('mine.worries', groups.length)
            })
          : t('mine.nothing')) + '</p>' +
        cards.map(function (c) {
          return '<div class="card">' +
            '<h3 class="kicker">' + esc(c.label) + '</h3>' +
            '<p class="belief wrote">“' + esc(c.belief) + '”</p>' +
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
      2. what CBT is and which bit of it this is — the one clear thing to read, asked for by
         the founder on 2026-09-03. B8's order had this screen going straight from the crisis
         lines into the small print; this is the deliberate change to it
      3. what this is: the purpose statement, the nine sentences, the airplane-mode proof,
         export and delete. This is the old "what this is" screen, word for word
      4. other places to go, none of them run by us, from content/places.js
      5. who made this, the language, and the code

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

        '<h2>' + esc(t('help.proofTitle')) + '</h2>' +
        '<p>' + esc(t('help.airplane')) + '</p>' +
        '<div class="proof">' +
          '<span><b>' + S.done.length + '</b><small>' + esc(t('help.proofResults')) + '</small></span>' +
          '<span><b>0</b><small>' + esc(t('help.proofAccounts')) + '</small></span>' +
          '<span><b>' + esc(t('help.zeroBytes')) + '</b><small>' + esc(t('help.proofSent')) + '</small></span>' +
        '</div>' +
        '<p><button class="plain" id="export">' + esc(t('io.export')) + '</button>' +
        '<button class="plain" id="wipe">' + esc(t('io.wipe')) + '</button></p>' +
        '<div id="io"></div>' +

        '<h2>' + esc(t('help.placesTitle')) + '</h2>' +
        '<p>' + esc(PLACES.intro) + '</p>' +
        PLACES.groups.map(function (grp) {
          return '<h3>' + esc(grp.title) + '</h3>' +
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
      });
      on('#no', function () { deleteArmed = false; io.innerHTML = ''; });
    }
  }

  /* ---------------------------------------------------------------- go */

  applyLanguage();
  render();
})();
