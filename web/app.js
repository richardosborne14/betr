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
  var GENERAL = Betr.general;
  var FRONT = Betr.front;
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
    /*
      `dropOpen` is B39's: whether the leave-out half is a row showing what it says or the box
      itself. It starts closed on every road, opens when the person taps it, and stays open for
      the rest of the draft — nobody who has opened it wants it folding up under them. It is on
      the draft rather than in `S` because it is not a preference and it is not a record: a
      draft is let go unlocked (see newTest), and this goes with it.
    */
    /*
      B40's two. `prediction` is which of a borrowed item's three the sentence started from,
      by index, set when one of the chips is tapped and cleared the moment the second half
      stops being that one's. `slots` is what the person typed into a skeleton's holes, and it
      is an empty object until B41 puts holes in anything. NEITHER OF THEM KEYS A LADDER — the
      worry's id does that, and a worry's three predictions share one ladder (rule 5).
    */
    /*
      B42's two. `size` is the NAME of the size the person picked, or null — the name rather
      than an index, because it is what the export and the ladder row say out loud and because
      a list of three that gets reworded next month must not silently relabel what somebody
      already did. It keys nothing either; the worry's id keys the ladder and always has.

      There is no `planned` here any more. It existed to pre-fill BETR's own plan into the
      boxes exactly once; B45 §5b gave every worry three sizes and B45 §5e took the prefill
      out, because the three ARE the plan and a box arriving with one of them in it would be
      BETR having picked (rule 2). The boxes start empty on every road.
    */
    return { ifPart: '', thenPart: '', test: '', drop: '', stock: null, expect: '',
             prediction: null, slots: {}, dropOpen: false, size: null,
             sizeOpen: true };
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
  /*
    Which box the next paint of the do screen should land in, or null for its usual one (B39).
    Consumed once, like toSay: opening the leave-out row, and tapping one of its suggestions,
    both repaint the whole screen, and focus has to stay where the person is working.
  */
  var nextFocus = null;
  /*
    B42. Whether the three sizes on the repeat screen are showing or folded onto last time's.
    Not stored, and not on the record: it is which way one screen is drawn, like whyBack, and
    a person who reloads on it should land on the plan rather than half way into changing it.
  */
  var againOpen = false;
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
    /*
      B41. Where the worry has a skeleton the first half is ITS words, not the card's — the
      card sentence is the loose one and is never itself tested, and the skeleton is the exact
      action all three predictions are about. It is assembled with every hole at its default,
      so `draft.ifPart` reads properly from the first paint even though nothing is typed in
      yet, and everything downstream can go on treating it as one string.
    */
    draft.ifPart = saidPlainly(f);
    /*
      B42, 2026-09-09, AND FINISHED IN B45 §5e: THE PLAN IS NEVER PRE-FILLED. The three sizes
      ARE the choice, and a box arriving with one of them already in it would be BETR having
      picked a rung (rule 2). B42 moved the prefill from here to the do screen, where the holes
      are known; B45 §5b gave every worry three sizes, which made it unreachable; and this task
      took the last of it out. Nothing now reads a worry's `test` or `drop` — they are held
      word for word equal to its small go by checkSizes0 until §5c deletes the pair.
    */
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

    /*
      B42. Which size it was done at, on the row for that test — "A small go", under the rung
      it moved to. It is a fact about that test and it is drawn like one: the same quiet line
      what the person wrote is drawn in, in the same place, never in the number column and
      never next to the dots. IT IS NOT A GRADE. Nothing compares one row's size with
      another's, nothing adds them up, and no screen ever says a bigger one would be better.

      Only rows that have one draw it, so a ladder from before today, and every test written
      from nothing, look exactly as they did yesterday.
    */
    if (opts.size) spoken += ' ' + t('a11y.rungSize', { size: opts.size });

    return '<div class="rung">' +
        '<span class="when" aria-hidden="true">' + esc(when) + '</span>' +
        '<span class="dots" aria-hidden="true">' + dots + '</span>' +
        '<span class="num" aria-hidden="true">' + level + '</span>' +
        '<span class="sr">' + esc(spoken) + '</span>' +
      '</div>' +
      (opts.size ? '<p class="said size" aria-hidden="true">' + esc(opts.size) + '</p>' : '') +
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
          /* B42: the size that test was done at, where there is one. Off the result, like
             everything else on this row, so nothing is looked up and nothing is derived. */
          size: r.size || '',
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
      /*
        B40. Which of the three it was, and the words the person put in the holes, both come
        back with it — that is what makes "Test this again" come back with HER words in it
        rather than with the skeleton's. `size` comes back too, and B42's screen marks it as
        last time's rather than as the one to pick.
      */
      prediction: typeof d.prediction === 'number' ? d.prediction : null,
      slots: d.slots || null, size: d.size || null,
      from: from || 'mine', editing: false, locked: null, missed: false
    };
    /* B42: every repeat starts with the row folded on last time's answer. It is not stored,
       for the reason whyId is not: it is which way a screen is showing, not a preference. */
    againOpen = false;
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
      /* B44. Two screens with no state of their own, so a reload lands on either of them
         and reads correctly — unlike `why`, which knows its worry only in memory. */
      smaller: smallerScreen, written: writtenScreen,
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
    The worry a typed first blank matches, or null. Word for word, ignoring case and the
    punctuation a person's keyboard might have added — and nothing cleverer than that, ever.
  */
  /* \u0027 is a straight apostrophe. Written as an escape so the sweep in i18n.test.js,
     which reads this file's string literals, does not see a quote opening here. */
  function flat(text) {
    return String(text || '').toLowerCase()
      .replace(/[^a-z0-9\u2019\u0027 ]+/g, ' ').replace(/\s+/g, ' ').trim();
  }

  /*
    B45 §5c, 2026-09-10. IT USED TO LOOK IN THE OTHER FILE, AND THERE IS NO OTHER FILE.

    `startFor()` matched the first blank against the twelve `if` lines in starts.js — twelve
    sentences describing nine acts that were already worries here, in different words, with
    their own predictions and no sizes at all. Now the lookup is against the worries
    themselves, so a person who taps "say no to somebody without giving a reason" on the front
    door gets the predictions and the three sizes that the worry road has always had for it.

    IT IS STILL A LOOKUP AND NOT A JUDGEMENT (rules 2 and 3). Word for word or nothing: no
    scoring, no ranking, no closest match, and nothing decided by what this person has typed
    or done before. If a future session is tempted to add fuzzy matching, this is the line.

    AND IT DOES NOT BORROW. Matching hands back suggestions and never an id, so nothing here
    can attach a test to a worry's belief ladder. The road decides which worry a test belongs
    to; the words never do (B40, B45 §8.4).

    A worry is matched on its skeleton with every hole at its own default word, which is
    exactly the sentence the chip printed.
  */
  function saidPlainly(f) {
    return content.fill(f.skeleton.if, {}, f.skeleton.holes);
  }

  function matchFor(ifPart) {
    var want = flat(ifPart);
    if (!want) return null;
    for (var i = 0; i < WORRIES.length; i++) {
      if (flat(saidPlainly(WORRIES[i])) === want) return WORRIES[i];
    }
    return null;
  }

  /*
    The second blank's three suggestions: the matched worry's own three predictions where the
    first blank holds one of our sentences, and the general three everywhere else.

    B45 §5c, 2026-09-10, AND THIRTY-SIX SENTENCES WENT. A start carried three `thens` written
    for its own words, and the worry it duplicated carried three `beliefs` written for the
    same act. Two answers to one question, reviewed twice, free to drift apart on any day
    either was edited. The worry's are the ones that survive, because they are the ones a
    person meets on the worry road and the ones that carry an `expect` with them.

    A prediction is stored as a whole "If I ___, then ___", and what goes under the second
    blank is the half after ", then" — with the holes at their own default words, because on
    this road there is no blank to have typed one into. See saidPlainly() above.
  */
  function thensFor(ifPart) {
    var f = matchFor(ifPart);
    if (!f) return GENERAL.thens || [];
    return f.beliefs.map(function (b) {
      return splitBelief(content.fill(b.belief, {}, f.skeleton.holes))[1];
    });
  }

  /*
    B48, 2026-09-10. THE GREYED EXAMPLE IN THE SECOND BLANK, AND IT BELONGS TO THIS WORRY.

    It was one frozen string — `build.thenPlaceholder`, "somebody will think I'm selfish" —
    printed on every road on every worry. That string is the worry `no`'s first prediction, and
    it is right on exactly one screen in the app: the front door before anybody has tapped
    anything, where the blank above it reads as `no`'s sentence too and the two greyed halves
    are one whole example.

    Everywhere else it was a sentence about a different worry. Walked in Chrome:

      the worry road, `think`   If I tell [somebody] what I actually think,
                                then "somebody will think I'm selfish"
      the front door, chip #5   If I sit with the restlessness for ten minutes,
                                then "somebody will think I'm selfish"

    Neither is one of the three offered directly underneath, and the second is not a sentence
    anybody would write. **This is B34 D1 with the placeholder as the cause.** That bug is
    about a person who TYPES the greyed words instead of tapping — strings-en.js says so where
    the two placeholders are defined — and typing these got her a prediction BETR wrote for
    another act, on a road where it was never offered.

    So the hint is the then-half of the FIRST of the three currently under the blank, whichever
    road this is. It is one lookup with one answer, not a fourth prediction from nowhere.

    IT CANNOT HAND BACK NOTHING, and for the same reason sizesFor() cannot: `checkThens` makes
    `thens` required and non-empty on the general set, and three `beliefs` are required on every
    worry. There is no fallback here because there is nothing to fall back from.
  */
  function thenHint() {
    var f = borrowed();
    /* Her own word, carried, exactly as the three chips below carry it — repainted from
       draft.slots on every keystroke by refreshBorrow(). */
    if (f) return splitBelief(saidIn(f.beliefs[0].belief))[1];
    /*
      Nothing typed yet, so the blank above is reading as its own greyed example. The two
      halves have to be the two halves of ONE sentence — the first chip's — which is what
      loop.test.js has held about the frozen pair since §5c. Deriving it from `ifPlaceholder`
      rather than repeating `thenPlaceholder` is how that stays true when the front door's
      first suggestion changes: both halves move together, from the content, on their own.
    */
    var said = draft.ifPart.trim() ? draft.ifPart : t('build.ifPlaceholder');
    return thensFor(said)[0];
  }

  /*
    The hint, repainted without repainting the screen. Setting a placeholder moves no caret,
    so this can run on a keystroke where a render() cannot — the reason refreshThens() and
    refreshBorrow() exist at all.
  */
  function paintThenHint() {
    var box = q('#then');
    if (!box) return;
    /*
      The blanks first, and it is not optional. The hint is worked out from `draft.ifPart`,
      and typing does not repaint — so without this the answer is whatever the last paint
      decided and the keystroke that called it changes nothing. Both callers happen to read
      the blanks a line earlier; the one that did not was the one that was silently wrong.
    */
    readBlanks();
    try { box.placeholder = thenHint(); } catch (e) { /* older browser */ }
  }

  /*
    B42, 2026-09-09. THE THREE SIZES FOR WHATEVER ROAD THIS IS, AND THERE IS ALWAYS A ROAD.

    It is a fallback chain and not a judgement, exactly as thensFor() is: nothing here depends
    on what the person has done before, on how many tests they have finished, or on how any of
    them went. Three, always, in the same order, from the first screen to the fiftieth — see
    lib/content.js checkSizes for why that is a rule and not a habit.

      the worry's own three   the worry road: every worry has three (required since §5b)
      the matched worry's     the front door, where the blank holds one of our sentences word
                              for word — the same three, with the holes at their own defaults
      the general three       a sentence BETR did not write, which is the main road and is
                              meant to be. `sizes` is REQUIRED on the general set, so this
                              function cannot hand back nothing

    B45 §5e, 2026-09-10, AND IT IS THE FIX FOR THE WORST SINGLE FACT IN B45 §2.

    It used to stop at a matched start and hand back that start's two LOOSE suggestions,
    reaching the general three only when nothing matched at all. The result was exactly
    backwards, and it is not something anybody could have predicted from the screen:

      tapping one of BETR's own twelve suggestions got you the OLD do screen — two loose
      lines, no names, no dial. Typing something BETR had never seen got you the three
      named sizes.

    The same act — "say no without giving a reason" — had a dial on the worry road, where it
    is the worry `no`, and none on the front door, where it is start #01.

    So the do screen has one shape from every direction. What that cost on the day was real: a
    matched start had no sizes of its own, so twelve roads fell through to the generic three.

    B45 §5c, 2026-09-10, PAID IT BACK AND WROTE NOTHING. The lookup is against the worries
    now, and every worry has had three sizes since §5b — so the twelve chips on the front door
    hand back the same dial the worry road has always had for that act. Twelve roads stopped
    being generic because two files became one, not because anybody wrote a sentence.

    THE MIDDLE STEP FILLS ITS HOLES HERE, and it is the one thing this function does to a
    sentence. On the worry road the holes are filled downstream by saidIn(), from what she has
    typed. There is nothing typed on the front door — there is no blank to type it into — so a
    matched worry's three are filled from their own default words before they leave, and
    saidIn() then finds nothing left to do. A default is never marked as carried (fillParts),
    so nothing on that screen claims she said a word she did not.
  */
  function sizesFor(f, ifPart) {
    if (f && f.sizes) return f.sizes;
    var m = matchFor(ifPart);
    if (!m) return GENERAL.sizes;
    return m.sizes.map(function (z) {
      return {
        name: z.name,
        do: content.fill(z.do, {}, m.skeleton.holes),
        drop: content.fill(z.drop, {}, m.skeleton.holes)
      };
    });
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
  /*
    B39, 2026-09-09, the founder's call. THE LEAVE-OUT HALF, FOLDED INTO ONE ROW.

    THE MEASUREMENT THAT MADE IT NECESSARY. On the free-text road — the front door since B32 —
    *Lock it in* started 105px BELOW THE FOLD at 100% text, not at 125% as the task had it. The
    label, its line, the box and its suggestion row are about 176px of that; folded they are
    about 60. After this, and after the two lines on the screen were cut to one line each, the
    main road clears the fold at 100% for the first time since B32.

    AND THE ONE RULE IT IS BUILT AROUND: IT SHOWS THE WORDS, IT DOES NOT HIDE THEM. On the
    borrowed road what sits in that box is BETR's, put there by BETR. A plain "add something to
    leave out" link would let somebody lock in a sentence of ours they had never read, which is
    a worse thing than a screen that scrolls. So the row carries three things: what this half
    is, what it currently says, and the way in. The way in is "Change" when there is something
    there and "Add one" when there is not — never a bare chevron, because a chevron over an
    empty row says nothing about what it would open.

    It is a `<button>` with block children rather than a link with a field beside it: one tap
    target, one accessible name reading "And leave out, Change, No checking it just once before
    bed", and focus lands in the box itself once it is open, which is the announcement.
  */
  function foldedDrop(value) {
    var has = !!value.trim();
    return '<button class="folded" id="dropopen">' +
      '<span class="folded-top">' +
        '<span class="folded-lbl">' + esc(t('build.dropLabel')) + '</span>' +
        '<span class="folded-go">' + esc(has ? t('build.dropChange') : t('build.dropAdd')) + '</span>' +
      '</span>' +
      '<span class="folded-val' + (has ? ' wrote' : ' none') + '">' +
        esc(has ? value : t('build.dropSub')) + '</span>' +
    '</button>';
  }

  /*
    B42, AND IT IS B39's ROW APPLIED TO THE OTHER HALF OF THE SAME SCREEN — for the same reason
    and after the same measurement.

    Open, the three sizes are 257px at 100% text and 296 at 125%, and they put *Lock it in* at
    925 on a 390x844 phone whose fold is 780. That is precisely the failure B39 spent a day
    removing, and the answer it found is the one that works here: once the question is answered,
    the row says what the answer is instead of asking again.

    NOTHING IS TAKEN AWAY, WHICH IS B42's FIRST RULE. The row is folded, not gone: it says which
    size is in the box, and *Change* opens all three again in the order they were always in.
    That is the difference between a rung a person can get back to in one tap and a rung the app
    has decided they are past.

    AND IT IS ONLY FOLDED ONCE THERE IS AN ANSWER. Before the first pick it is open, and *Lock
    it in* does sit below the fold at 125% — which is not B39's failure, because with an empty
    plan that button refuses. What has to be visible in that state is the three, and it is.
  */
  function foldedSize(name) {
    return '<button class="folded" id="sizeopen">' +
      '<span class="folded-top">' +
        '<span class="folded-lbl">' + esc(t('build.sizeLabel')) + '</span>' +
        '<span class="folded-go">' + esc(t('build.sizeChange')) + '</span>' +
      '</span>' +
      '<span class="folded-val wrote">' + esc(name) + '</span>' +
    '</button>';
  }

  /*
    Which of the three is in the box, by index, or -1. It is answered off the WORDS rather than
    off `draft.size`, and that is deliberate: a person who came back through Back, or who typed
    one of them out by hand, is looking at the same sentence either way and the screen should
    say the same thing about it.
  */
  function pickedSize(lines, said) {
    var want = flat(said);
    if (!want) return -1;
    for (var i = 0; i < lines.length; i++) if (flat(lines[i]) === want) return i;
    return -1;
  }

  function chipRow(intro, list, attr, hide, html) {
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
      '<div class="chips" data-chiplist="' + esc(attr) + '">' + chipButtons(list, attr, html) + '</div>' +
    '</div>';
  }

  /*
    The buttons alone (B34 D1). Split out of chipRow because the second blank's row is
    reprinted in place when the first blank changes, and the row's heading — which a screen
    reader names the group by — has to survive that.
  */
  function chipButtons(list, attr, html) {
    return list.map(function (line, i) {
      /* `html` is the same line with the person's own words marked (B46). Absent — every row
         off the skeleton road — the line is simply escaped, which is what it always was. */
      return '<button class="chip" ' + attr + '="' + i + '">' +
        (html ? html[i] : esc(line)) + '</button>';
    }).join('');
  }

  /*
    B42, 2026-09-09. THE DIAL: three named steps, small to big, each one a whole sentence.

    It is the same row the suggestions are drawn in — a heading and a set of buttons — and the
    only differences are that each button carries its own name, and that tapping one fills both
    boxes rather than one. That is deliberate: the founder's small / medium / big arrives as
    three sentences a person can read rather than as three words they have to interpret, which
    is the whole of B36 item 8 and B37 §8.

    WHAT IS NOT HERE, AND EACH OF THESE IS A RULE RATHER THAN AN OVERSIGHT (B42):

    - no number on any of them, not "1 of 3", not a step count, not a bar. A number on a size
      is a level and a level is a point; B36 §9 has 38 studies and 8,110 people on why there
      are none of those here, and it would be a score of the person besides
    - none is marked as recommended, suggested, usual or "most people". Three plain buttons
    - none is ever disabled, greyed, hidden or unlocked by anything that happened before. A
      rung that appears because the last one went well is the app choosing (rule 2)
    - nothing is remembered ABOUT the person here. The `last` mark on the repeat screen says
      what was done last time and is a fact about that test, not a grade of anybody
  */
  function sizeRow(sizes, lines, hide, html) {
    return '<div class="chipset sizes" role="group" data-chips="data-size" aria-labelledby="chips-sizes"' +
      (hide ? ' hidden' : '') + '>' +
      '<p class="tiny chips-intro" id="chips-sizes">' + esc(t('build.sizeChips')) + '</p>' +
      '<div class="chips" data-chiplist="data-size">' + sizeButtons(sizes, lines, null, html) + '</div>' +
    '</div>';
  }

  /*
    The buttons alone. `marked` is a size name to mark as the one done last time, or null —
    only the repeat screen passes one, and it is a note about the last test rather than
    anything about what to do next. The mark is a word, never a tick and never a highlight,
    because a highlighted option is a recommended option.
  */
  function sizeButtons(sizes, lines, marked, html) {
    return sizes.map(function (z, i) {
      var mine = marked && flat(marked) === flat(z.name);
      return '<button class="chip size" data-size="' + i + '">' +
        '<b class="size-name">' + esc(z.name) + '</b>' +
        /* The space is not decoration: without it the row's accessible name runs the two
           together — "The whole thingLast time" — and the mark is read as part of the name. */
        (mine ? ' <span class="size-last">' + esc(t('build.sizeLast')) + '</span>' : '') +
        /* B46: her words marked here too. Screen 3 of the canvas is the same trick a second
           time — the word arrives in a size she has not read yet. */
        ' <span class="size-do">' + (html ? html[i] : esc(lines[i])) + '</span>' +
      '</button>';
    }).join('');
  }

  /*
    Is this sentence one of BETR's own, word for word? It answers one question and no other:
    whether the app may replace it. BETR's content may be replaced by BETR's content; a
    sentence a person wrote may not be touched by anything except the person.
  */
  function ours(said, lines) {
    var want = flat(said);
    for (var i = 0; i < lines.length; i++) if (flat(lines[i]) === want) return true;
    return false;
  }

  /*
    Both blanks, read back off the screen, so nothing typed is lost to a repaint.

    B41 put a third thing on this screen: on a skeleton road the first half is not one blank
    but printed words with small ones in them, and the if-half is DERIVED rather than typed.
    So the holes are read into `draft.slots` and `draft.ifPart` is assembled from them — which
    means everything downstream (the guard, sentenceOf, the do screen, `#ownit`) goes on
    reading one field and knows nothing about skeletons.
  */
  function readBlanks() {
    var sk = skeleton();
    if (sk) {
      Object.keys(sk.holes).forEach(function (name) {
        var el = q('#h-' + name);
        if (el) draft.slots[name] = el.value;
      });
      draft.ifPart = content.fill(sk.if, draft.slots, sk.holes);
    } else {
      var a = q('#if');
      if (a) draft.ifPart = a.value;
    }
    var b = q('#then');
    if (b) draft.thenPart = b.value;
  }

  /* The skeleton of the worry being borrowed, or null — which is most worries and both roads. */
  function skeleton() {
    var f = borrowed();
    return f && f.skeleton ? f.skeleton : null;
  }

  /*
    One of a borrowed item's three, with the person's words already in it.

    This is B37's whole idea and it is a string substitution: she types "my sister" once, into
    the if-half, and it is in all three predictions before she has read them. Nothing chose
    anything, nothing was ranked, no model ran (rule 2). Where there is no skeleton it hands
    the sentence back untouched, which is every other worry.
  */
  function saidIn(text) {
    var sk = skeleton();
    return sk ? content.fill(text, draft.slots, sk.holes) : text;
  }

  /*
    B46. The same sentence, as markup, with the words SHE typed marked where they land.

    This is the half of B37's idea that was never built. The substitution worked from B41 and
    it worked silently: she filled one blank, three sentences underneath became sentences about
    her sister, and nothing on the screen acknowledged that anything had happened. Marking them
    is the difference between a mechanic and a magic trick.

    It marks what the person typed and never a hole's own default word — see fillParts() for
    why that is the line and not a preference. Off the skeleton road there is nothing to mark
    and this is exactly esc(), which is why it can be used on every chip unconditionally.

    B34 D1 is untouched: the characters shown are the characters inserted. The plain list is
    still what a tap hands to the box; this only decides how the same list is drawn.
  */
  function saidHtml(text) {
    var sk = skeleton();
    if (!sk) return esc(text);
    return content.fillParts(text, draft.slots, sk.holes).map(function (part) {
      return part.carried ? '<span class="carried">' + esc(part.text) + '</span>' : esc(part.text);
    }).join('');
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

  /*
    B41. The if-half of a skeleton: the words BETR printed, and a small blank at every hole.

    It is the same two components the rest of the sentence is made of — a `.fixed` span and a
    `.blank` input — so there is no new control here and nothing to learn. What is new is that
    there are more of them and they are smaller, which is the whole of B37 §3: "a skeleton is
    more printed words and smaller blanks."

    A HOLE IS EMPTY, NOT PRE-FILLED, and the word is a greyed placeholder. Two reasons. A real
    value in a blank set in 800 weight looks like something the person wrote, and she would
    lock in "somebody" believing it was hers. And nobody is walled for leaving one alone: an
    empty hole assembles as its own word (content.fill), so the sentence always reads and the
    un-personalised test is a perfectly good test.
  */
  function skeletonHalf(sk) {
    var out = '<span class="fixed">' + esc(t('build.ifWord')) + '</span>';
    var last = 0;
    var re = /\{([a-z][a-z0-9]*)\}/g;
    var m;
    while ((m = re.exec(sk.if))) {
      var before = sk.if.slice(last, m.index).trim();
      if (before) out += '<span class="fixed">' + esc(before) + '</span>';
      out += '<input class="blank hole" type="text" autocomplete="off" autocapitalize="none" spellcheck="false" id="h-' +
        esc(m[1]) + '" data-hole="' + esc(m[1]) + '" aria-label="' +
        esc(t('build.holeLabel', { word: sk.holes[m[1]] })) + '" placeholder="' +
        esc(sk.holes[m[1]]) + '" value="' + esc(draft.slots[m[1]] || '') + '">';
      last = m.index + m[0].length;
    }
    var tail = sk.if.slice(last).trim();
    if (tail) out += '<span class="fixed">' + esc(tail) + '</span>';
    return '<span class="part skel">' + out + '</span>';
  }

  function build() {
    var f = borrowed();
    var sk = skeleton();
    /*
      B41. The three, with the person's words already substituted in. Worked out ONCE, here,
      exactly as B34 D1 made the second blank's chips be — the handlers below close over this
      same list, so a chip can only ever insert the words printed on it. When a hole changes,
      the row is reprinted and rewired against a fresh list (see refreshBorrow()).
    */
    var bChips = f ? f.beliefs.map(function (b) { return saidIn(b.belief); }) : [];
    /* B46. The same three, drawn with her own word marked wherever it landed. Screens 1 → 2 of
       the canvas: she fills one hole and it arrives in all three before she has read them. */
    var bMarks = f ? f.beliefs.map(function (b) { return saidHtml(b.belief); }) : [];
    /* B45 §5c. The front door's twelve, each printed as the worry's own skeleton with its
       default words in the holes — the same sentence matchFor() will recognise if she taps
       one. It fills the blank and nothing else: no worry is borrowed and no ladder is
       touched (B40). */
    var ifChips = FRONT.map(function (id) { return saidPlainly(content.byId(WORRIES, id)); });
    /*
      B34 D1. The second blank's suggestions are worked out ONCE, here, and the handlers below
      close over this same list — so a chip can only ever insert the words printed on it. They
      used to run the lookup again on the tap, which meant that a person who had TYPED the
      words of a start (the placeholder is one of them, word for word) tapped a chip saying one
      thing and got another sentence in the box.
    */
    var thenChips = thensFor(draft.ifPart);
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
          /* B41: printed words with small blanks in them where there is a skeleton, and the
             one big blank everywhere else. Same components, same sentence, different amount
             of it already written. */
          (sk ? skeletonHalf(sk)
              : '<span class="part"><span class="fixed">' + esc(t('build.ifWord')) + '</span>' +
                blank('if', t('build.ifLabel'), t('build.ifPlaceholder'), draft.ifPart) + '</span>') +
          '<span class="part"><span class="fixed">' + esc(t('build.thenWord')) + '</span>' +
            blank('then', t('build.thenLabel'), thenHint(), draft.thenPart) + '</span>' +
        '</p>' +
        '<button class="big wide" id="next">' + esc(t('build.next')) + '</button>' +
        /*
          B32, and it is what B20's screen became. A borrowed item carries three predictions
          and the person says which is theirs — but each of the three is a whole sentence with
          its OWN two halves, not three endings to one beginning. So a chip shows the whole
          sentence and fills both blanks. Anything else would weld the card's beginning to
          another prediction's ending and produce a sentence nobody wrote.
        */
        (f ? chipRow(t('build.borrowChips'), bChips, 'data-b', false, bMarks)
           /* One row at a time: the blank that has focus, and only while it is still empty. */
           : chipRow(t('build.ifChips'), ifChips, 'data-if', !!draft.ifPart.trim()) +
             chipRow(t('build.thenChips'), thenChips, 'data-then',
               !draft.ifPart.trim() || !!draft.thenPart.trim())) +
        /*
          B40's way out, on the borrowed road only: on the free-text road the person is already
          writing the whole thing themselves and a link offering it would be a puzzle.

          It shares the last small line's paragraph rather than taking one of its own, which is
          a measurement and not a preference — a second .tiny block costs 22px of margin plus
          its own line on a screen that B39 has only just got under the fold at 125%.
        */
        /*
          B44's link shares this paragraph for the same measured reason B40's does: a second
          .tiny block costs 22px of margin plus its own line, on a screen B39 has only just
          got under the fold at 125%. It is drawn on BOTH roads — the free-text road is where
          somebody most needs it, because why.js can never reach them (it is keyed to a stock
          worry and only appears after a result), and this screen is the first thing they see.
        */
        '<p class="tiny">' +
          (f ? '<button id="ownit">' + esc(t('build.own')) + '</button><br>' : '') +
          guideLink('written', 'writtenLink') + '<br>' +
          esc(t('build.only')) +
        '</p>' +
      '</div>');

    /*
      Always the front screen, wherever this was opened from. It is reached from three places
      — the front screen's big button, "New test" on the bottom row, and the borrow list — and
      a Back that guessed which would be a Back a person cannot predict.
    */
    wireBack('start');
    /* Both blanks are read before the screen changes, so a half-written sentence is still
       there when Back comes home. Same reason Back itself does it (B34 D2). */
    wireGuide('written', 'written', 'build', readBlanks);

    /*
      Focus goes to the first blank, not to the heading — this screen IS the box, the way the
      old one-box screens were, and it pays for it by naming both blanks (see build.ifLabel).
      An empty first blank takes it; a filled one hands over to the second.
    */
    /*
      B41. On a skeleton road there is no `#if` to land in, so focus goes to the first hole
      that is still empty — the first thing there is to do — and to the second blank once every
      hole has something in it.
    */
    var first;
    if (sk) {
      var names = Object.keys(sk.holes);
      for (var n = 0; n < names.length && !first; n++) {
        var hole = q('#h-' + names[n]);
        if (hole && !String(hole.value || '').trim()) first = hole;
      }
      if (!first) first = q('#then');
    } else {
      first = draft.ifPart.trim() && !draft.thenPart.trim() ? q('#then') : q('#if');
    }
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
          /*
            The second half is somebody else's now, so the prediction it came from and the
            expectation written for it both go. B40 added the first of those two; they are one
            fact said twice and they are cleared in the same breath on purpose.
          */
          draft.expect = '';
          draft.prediction = null;
          refusal = null;
          render();
        };
      });
    }

    /*
      B34 D1, the other half. The lookup ran at paint and nowhere else, so a person who
      TYPED our words was shown the general three while somebody who tapped the identical
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
      var list = thensFor(draft.ifPart);
      try { holder.innerHTML = chipButtons(list, 'data-then'); } catch (e) { return; }
      wireThens(list);
      /* B48. The row and the greyed example in the box are one answer to one lookup, so they
         are worked out in the same breath and can never say two different things. */
      paintThenHint();
    }

    /*
      Live, and deliberately without a repaint: a repaint here would move the caret to the end
      of the box on every keystroke. The suggestions simply get out of the way.
    */
    wireChips([['#if', 'data-if', null, paintThenHint], ['#then', 'data-then', refreshThens]]);

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
    /*
      One of the borrowed item's three. It fills both halves, and it carries the hand-written
      expectation written to go with it (B20) — what you would be braced for, which is not the
      same words as the prediction and is better than anything derived from it.

      B41, AND THE ONE PLACE THIS ROW IS NOT LIKE THE OTHER TWO.

      B34 D1's rule is that a chip inserts the words printed on it, and it was written the day
      a chip ran its lookup again on the tap and put a different SENTENCE in the box from the
      one it said. That rule is kept here in the part that matters: `data-b` is an index into
      the item's three and always means the same prediction, so which sentence you get is
      exactly the one you tapped and no lookup happens.

      What is re-derived on the tap is only the hole substitution, from `draft.slots` read a
      line earlier — and it has to be. The row is reprinted on every keystroke (refreshBorrow),
      but a browser that fired no input event would leave a list carrying "somebody" while the
      blank above it says "my sister", and inserting the stale one would hand her back a
      sentence about a person she is not testing. Her own word is never a lookup and is never
      something the app chose; it is the thing she typed, one line above, ten seconds ago.

      The first half is left alone on a skeleton road: it belongs to the holes, and taking the
      chip's would overwrite her words with a copy of themselves at best.
    */
    function wireBorrow() {
      qa('[data-b]').forEach(function (btn) {
        btn.onclick = function () {
          /* The holes first, exactly as the other two rows read the blanks first. */
          readBlanks();
          var i = Number(btn.getAttribute('data-b'));
          var halves = splitBelief(saidIn(f.beliefs[i].belief));
          if (!sk) draft.ifPart = halves[0];
          draft.thenPart = halves[1];
          draft.expect = saidIn(f.beliefs[i].expect);
          /* B40: which of the three, so the record and the export can say so. It keys nothing. */
          draft.prediction = i;
          refusal = null;
          render();
        };
      });
    }
    wireBorrow();

    /*
      B41, AND IT IS THE POINT OF THE WHOLE TASK: she types a name into the if-half once and
      it is in all three predictions before she has finished reading them.

      Reprinted rather than repainted, for the reason refreshThens() is: a repaint would move
      the caret to the end of the box on every keystroke. ONLY THE BUTTONS are rewritten, so
      the row's heading survives — a screen reader names the group by it (B33).
    */
    function refreshBorrow() {
      var holder = q('[data-chiplist="data-b"]');
      if (!holder || typeof holder.innerHTML !== 'string') return;
      readBlanks();
      var list = f.beliefs.map(function (b) { return saidIn(b.belief); });
      /* B46. Reprinted marked, so the mark tracks the keystroke rather than the last paint —
         the whole point is that she watches her word arrive. */
      var marks = f.beliefs.map(function (b) { return saidHtml(b.belief); });
      try { holder.innerHTML = chipButtons(list, 'data-b', marks); } catch (e) { return; }
      wireBorrow();
      /* B48. Her word lands in the greyed example too. It is the first of the three she is
         reading right there, so it moves with them or it is a fourth sentence. */
      paintThenHint();
    }
    qa('[data-hole]').forEach(function (el) {
      el.oninput = function () { growHole(el); refreshBorrow(); };
      growHole(el);
    });

    /*
      B40. Leaving the worry's road, and it is one line: forget which item this came from. The
      words stay in the blanks — the sentence is the person's now, not a thing to retype — and
      from this tap builtTest() makes an own test with an id and a ladder of its own. Under B41
      it is also what collapses a printed skeleton back into a plain pair of blanks, because a
      skeleton is drawn from the borrowed item and there is no longer one.

      The prediction and the holes go with it. A test that is nobody's but theirs cannot be
      "the second of three", and a record carrying that would make the export say something
      untrue about what was done.
    */
    on('#ownit', function () {
      readBlanks();
      draft.stock = null;
      draft.expect = '';
      draft.prediction = null;
      draft.slots = {};
      /* B42: and the size. A test that is nobody's but theirs was not "the small one of
         BETR's three", and a record saying so would make the export say something untrue. */
      draft.size = null;
      refusal = null;
      render();
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
  /*
    B39, 2026-09-09. A BOX THAT WAS SHORTER THAN ITS OWN CONTENTS.

    Measured on the walker, on the borrow road: at 100% text the `do` box reserves 92px of
    room and BETR's own pre-filled sentence needs 112, so the last line of a sentence somebody
    is about to lock in sits inside a scrollbar they have no reason to look for. At 125% it is
    165 into 99. At 200%, 351 into 138. IT WAS NEVER A ZOOM BUG — the zoom only made it
    bigger, and it was there at 100% on the road most people take.

    So the box grows to what is in it. The `min-height` in the stylesheet stays as the floor,
    because an empty box still has to look like something you write in, and this only ever
    adds. `+4` is the two borders: `box-sizing` is border-box and `scrollHeight` is not.

    It is guarded on the type of `scrollHeight` rather than on anything else, because the fake
    DOM in `harness.js` is flat and has no layout at all: in the tests this is a no-op, and
    the height it would have set is measured on the walker instead.
  */
  function grow(box) {
    /*
      TEXTAREAS ONLY. The build screen's two blanks are `<input type="text">` and go through
      the same wiring; an input's scrollHeight is its own single line, so this would set an
      inline height on it for no reason and drift by the border on every keystroke.
    */
    if (!box || box.tagName !== 'TEXTAREA') return;
    if (typeof box.scrollHeight !== 'number') return;
    try {
      box.style.height = 'auto';
      box.style.height = (box.scrollHeight + 4) + 'px';
    } catch (e) { /* older browser */ }
  }

  /*
    B41, and it is B39's lesson applied to a much smaller box.

    A hole sits INSIDE a printed sentence, so it cannot be a fixed width: too narrow and "my
    father-in-law" scrolls sideways inside a blank three words wide, too wide and "If I say no
    to ______________ without giving a reason" reads as a gap somebody forgot to close. So it
    is sized to what is in it, in `ch` so it answers to the person's text size, with a floor
    that keeps an empty one visibly a gap.

    Guarded on `style` rather than on layout, because the fake DOM has neither: in the tests
    this is a no-op and the width it would have set is measured on the walker instead.
  */
  var HOLE_MIN = 7;
  function growHole(box) {
    if (!box || !box.style) return;
    var text = String(box.value || box.placeholder || '');
    try { box.style.width = Math.max(HOLE_MIN, text.length + 1) + 'ch'; } catch (e) { /* older browser */ }
  }

  function wireChips(boxes) {
    boxes.forEach(function (pair) {
      var box = q(pair[0]);
      var set = q('[data-chips="' + pair[1] + '"]');
      /* Optional third: something to run before the row is shown, so it is right when it is
         read. Only the second blank has one — see refreshThens() (B34 D1). */
      var before = pair[2];
      /*
        B48. Optional fourth: something to run on every keystroke, and only the FIRST blank
        has one. A row of suggestions is hidden while the box above it is being typed in, so
        it can wait until focus. The greyed example in the OTHER blank is not hidden — it is
        on screen the whole time — and what it should say depends on what is being typed here.
        Left until focus it spends the whole of her sentence saying something about a
        different act, which is the whole of what B48 is fixing.
      */
      var typing = pair[3];
      if (!box) return;
      var show = function (on) {
        if (!set) return;
        try { set.hidden = !on || !!box.value.trim(); } catch (e) { /* older browser */ }
      };
      grow(box);
      box.oninput = function () { grow(box); show(true); if (typing) typing(); };
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
    /*
      B42. Three named sizes, and since B45 §5e there are three on EVERY road — sizesFor()
      cannot hand back nothing. Both lists are worked out here and closed over by the handlers
      below, which is B34 D1's rule and matters more on a skeleton road: a chip carries the
      person's own word in it, and a list re-derived on the tap could hand back the one it was
      printed with.
    */
    var sizes = sizesFor(f, draft.ifPart);
    var doChips = sizes.map(function (z) { return saidIn(z.do); });
    var dropChips = sizes.map(function (z) { return saidIn(z.drop); });
    /* B46. Her word marked in the sizes too — screen 3 of the canvas, where it arrives in a
       sentence she has not read yet. Off the skeleton road nothing was carried and saidHtml()
       is exactly esc(), which is why it can be worked out unconditionally. */
    var doMarks = sizes.map(function (z) { return saidHtml(z.do); });
    var dropMarks = sizes.map(function (z) { return saidHtml(z.drop); });
    /*
      Which box this paint is going to land in, worked out BEFORE the markup so the suggestion
      row belonging to it can be drawn already open (B39). It used to be left to wireChips's
      `onfocus`, which is right when a person taps a box and wrong on the way in: a programmatic
      focus does not fire a focus event in every browser, and somebody who had just tapped
      "Add one" landed in the empty box with its suggestions still hidden — the one moment they
      are certain to want them. One row at a time either way, which is B30's rule.
    */
    var landsIn = nextFocus || '#do';
    /* B42. Which of the three is in the box, worked out before the markup for the reason
       `landsIn` is: the row belonging to it has to be right on the paint a person lands on. */
    var picked = pickedSize(doChips, draft.test);
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
        /*
          B42, AND IT IS A MEASUREMENT. "One small thing, your pick" cost 47px on a screen the
          three sizes had just put 77px below the fold at 100% text — and on the size road it
          says a worse version of what the row underneath says better: how big a go, and that
          nobody but the person picks. So it stays on the road with the loose suggestions,
          where nothing else says it, and goes where the dial is.
        */
        warnBlock() +
        /*
          B42. THE PLACEHOLDER IS NOT A FOURTH SUGGESTION. "Say no to one thing today, in one
          sentence" is a good line to show somebody staring at an empty box with nothing under
          it; over three named sizes it reads as a plan already in the box, and it competes
          with the very three it is sitting on top of. So on the size road the box asks for
          her words instead, which is the one thing the three cannot offer.
        */
        '<textarea id="do" class="short" aria-labelledby="top" placeholder="' +
          esc(t('build.doOwnPlaceholder')) + '">' +
          esc(draft.test) + '</textarea>' +
        /*
          B42, AND IT IS WHY THE DIAL IS NOT SUBJECT TO B30's ONE-ROW-AT-A-TIME RULE IN FULL.

          A suggestion row gets out of the way the moment there are words in the box, because
          it has done its job. Three sizes have not: a person who taps "A small go" and wants
          "A bigger go" instead would find the dial gone, which is a rung taken away, and
          B42's first rule is that no rung is ever taken away. So the row stays while the box
          holds one of OUR OWN three, and goes the moment she writes something of her own.
        */
        (picked !== -1 && !draft.sizeOpen
          ? foldedSize(sizes[picked].name)
          : sizeRow(sizes, doChips,
              landsIn !== '#do' || (!!draft.test.trim() && picked === -1), doMarks)) +
        /*
          B44. UNDER THE BOX AND ITS SIZES, WHICH IS WHERE THE PERSON IS WHEN THEY FREEZE.

          Not at the bottom under "Lock it in": somebody who has just pictured the biggest
          possible version of the thing has stopped reading by then, and B36's whole finding
          was that they leave from HERE. It costs a line rather than a block — see .under in
          app.css, which trims the .tiny margin that would otherwise push the button down.

          It is drawn on every paint, whatever is in the box, whatever the size row is doing.
          A link that appeared when a person hesitated would be BETR reading them (research §6).
        */
        '<p class="tiny under">' + guideLink('smaller', 'smallerLink') + '</p>' +
        /*
          B39, 2026-09-09, the founder's call. Closed, this half is one row that says what it
          currently says; open, it is the box and its suggestions, exactly as before. Nothing
          is hidden either way — see foldedDrop() for why that is the whole point.
        */
        (draft.dropOpen
          ? '<p class="lbl drop-label" id="droplbl">' + esc(t('build.dropLabel')) + '</p>' +
            '<p class="sub tight">' + esc(t('build.dropSub')) + '</p>' +
            '<textarea id="drop" class="line" aria-labelledby="droplbl" placeholder="' +
              esc(t('build.dropPlaceholder')) + '">' + esc(draft.drop) + '</textarea>' +
            chipRow(t('build.dropChips'), dropChips, 'data-drop',
              landsIn !== '#drop' || !!draft.drop.trim(), dropMarks)
          : foldedDrop(draft.drop)) +
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
    /*
      B42: on the size road the row belonging to the first box is the dial, so that is the one
      that gets out of the way when the person moves to the leave-out. Hand wireChips the wrong
      name here and B30's one-row-at-a-time quietly stops holding on the road most people take.
    */
    wireChips([['#do', 'data-size'], ['#drop', 'data-drop']]);
    on('#dropopen', function () { readBoxes(); draft.dropOpen = true; nextFocus = '#drop'; render(); });
    /* Both boxes read first, for the reason Back reads them (B34 D2): a plan somebody has
       half typed must still be there when they come back from reading about sizes. */
    wireGuide('smaller', 'smaller', 'build-do', readBoxes);

    /*
      Usually the first box, which is what a11y.test.js holds this screen to. `nextFocus` is
      the exception and it is consumed here: after opening the leave-out row, or tapping one
      of its suggestions, the person is working in the second box and focus belongs there.

      AFTER wireChips, not before, and that is B39's bug and not a tidy-up. wireChips hangs the
      show-one-row-at-a-time logic on each box's `onfocus`; focusing before it is wired means
      the handler never runs, and somebody who had just tapped "Add one" landed in an empty box
      with its suggestions still hidden — the one moment they are certain to want them.
    */
    var box = (nextFocus && q(nextFocus)) || q('#do');
    nextFocus = null;
    box.focus();
    try { box.setSelectionRange(box.value.length, box.value.length); } catch (e) { /* older browser */ }

    function readBoxes() {
      var d = q('#do');
      var r = q('#drop');
      if (d) draft.test = d.value;
      if (r) draft.drop = r.value;
    }
    /*
      B42. One size, and it fills BOTH boxes — a size is a step and the leave-out that belongs
      to it, and a big go with a small leave-out is not a bigger test but a different one.

      EXCEPT where the leave-out is hers. If she has written her own, it stays: a size is
      BETR's content and may replace BETR's content, and it may never quietly delete a sentence
      a person wrote. What is stored is the size's NAME, and it says which rung was picked and
      nothing about the person (B42; rule 5).
    */
    qa('[data-size]').forEach(function (b) {
      b.onclick = function () {
        readBoxes();
        var i = Number(b.getAttribute('data-size'));
        draft.test = doChips[i];
        if (!draft.drop.trim() || ours(draft.drop, dropChips)) draft.drop = dropChips[i];
        draft.size = sizes[i].name;
        /* Answered, so the row folds to say what the answer is — see foldedSize(). It reopens
           on Change and folds again on the next pick, so it always tracks the box. */
        draft.sizeOpen = false;
        refusal = null;
        render();
      };
    });
    on('#sizeopen', function () { readBoxes(); draft.sizeOpen = true; render(); });
    qa('[data-drop]').forEach(function (b) {
      b.onclick = function () {
        readBoxes();
        draft.drop = dropChips[Number(b.getAttribute('data-drop'))];
        refusal = null;
        nextFocus = '#drop';
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
        /*
          B39: open it first. A refusal over a sentence that is folded into a row is a refusal
          about words a person cannot edit, and the refusal block is at the top of the screen
          where the box is not.
        */
        if (!two.ok) { draft.dropOpen = true; nextFocus = '#drop'; refuse(two); return; }
      }
      lockIn(builtTest());
    });
  }

  /*
    The test about to be locked in, built from whatever is in the draft.

    TWO KINDS COME OUT OF ONE SCREEN, AND THE ROAD DECIDES WHICH — not the words. That is
    B40's one sentence, 2026-09-09, and it reverses what B32 did four days earlier.

    B32's rule was that a borrowed item kept word for word IS that item, and that changing so
    much as one blank makes it yours, with a ladder of its own. Reasonable on a road where
    editing meant "this isn't quite my worry". It stops being reasonable the moment a sentence
    ARRIVES with holes in it: a filled-in skeleton differs from the skeleton every single time,
    by design, so under B41 every templated run would be a stranger to itself, every one would
    start at the top, and the belief ladder — the one number in the whole product — would never
    move off its first rung. Silently, with every test still passing.

    So: while `draft.stock` is set, this is that worry. Same `id`, same label, whatever the
    words say, because the app already knows where the person is — it printed the sentence they
    are editing. The only way out is the one plain link on the build screen (see `#ownit`), and
    from that tap it is an own test with an id of its own, exactly as before.

    THE WORDING IS A SEPARATE QUESTION FROM THE IDENTITY, and sameAsStock() still answers it.
    Where the sentence is still one of the item's three letter for letter, the record carries
    that prediction's own wording and B20's hand-written expectation — what you would be braced
    for, which is better than anything derived from the sentence. Where it is not, the record
    carries the person's words and an expectation read off them. That has not changed today and
    is why nothing on the screen looks different.

    `id` on an own test is its own, made once and kept: rate.keyOf() groups an own ladder by
    it, so fixing a typo tomorrow does not look like losing your history (B30).
  */
  function builtTest() {
    var said = sentenceOf(draft.ifPart, draft.thenPart);
    var f = borrowed();
    var same = f ? sameAsStock(f, said) : null;
    return {
      rid: storeLib.rid(),
      source: f ? 'stock' : 'own',
      id: f ? f.id : storeLib.rid(),
      label: f ? f.label : null,
      ifPart: draft.ifPart.trim(), thenPart: draft.thenPart.trim(),
      belief: same ? saidIn(same.belief) : said,
      /*
        B20's hand-written expectation, where the sentence is still B20's sentence — and since
        B41, with her own words in it, because the sentence it was written for has them too.
      */
      x: same ? upperFirst(saidIn(same.expect)) : guards.expectationFrom(said),
      test: draft.test.trim(), drop: draft.drop.trim(),
      /*
        B40's three, along for the ride and keying nothing. `prediction` and `slots` only mean
        anything on a worry's road, so an own test carries neither rather than carrying a stale
        one from a draft that was borrowed a minute ago.
      */
      prediction: f && typeof draft.prediction === 'number' ? draft.prediction : null,
      slots: f ? filled(draft.slots) : null,
      /*
        B42. The name of the size she picked, and nothing if she picked none — which is every
        test written from nothing and every one from before today. It is a fact about this
        test: which of the three steps was taken. It is never totalled, never compared across
        worries, and it keys nothing (rule 5; rate.keyOf still groups by the worry's id).

        It survives her editing the sentence afterwards, on purpose. She picked the rung; a
        word changed in BETR's wording of it does not make it a different rung, and clearing
        it there would mean the export could only ever say what was done by somebody who
        typed nothing.
      */
      size: draft.test.trim() ? (draft.size || null) : null,
      from: 'build-do', editing: false, locked: null, missed: false
    };
  }

  /*
    A copy of what was typed into a skeleton's holes, or null where nothing was.

    A copy, so a record and the draft it came from cannot edit each other afterwards. Null
    rather than an empty object, so that "this test had no holes in it" and "this test is older
    than holes" are the same thing to everything downstream — which is one fewer shape for B41
    and B42 to remember, and it keeps the export honest for free.
  */
  /*
    B41. An expectation that BEGINS with a hole begins with the person's own word, and hers is
    lowercase far more often than not — "my brother will go quiet, change the subject" is a
    sentence that starts in the middle of itself, drawn in 800 weight next to what actually
    happened. `guards.expectationFrom` has capitalised the first letter of a DERIVED expectation
    since the day it was written; this is that same rule applied to a hand-written one, and it
    is a no-op on every expectation that starts with a word of BETR's, which is most of them.

    Only the FIRST letter, and only on the expectation. Her words are not otherwise touched: a
    name she wrote in the middle of a sentence is hers to capitalise or not.
  */
  function upperFirst(s) {
    var text = String(s == null ? '' : s);
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  function filled(o) {
    var out = null;
    for (var k in o) {
      if (!Object.prototype.hasOwnProperty.call(o, k)) continue;
      if (!String(o[k] == null ? '' : o[k]).trim()) continue;
      (out = out || {})[k] = o[k];
    }
    return out;
  }

  /*
    Which of a borrowed item's three this is, word for word, or null if the words have moved on.

    Since B40 this decides the WORDING ONLY — which sentence is stored and which expectation
    travels with it. It stopped deciding whether the test belongs to the worry; see builtTest().

    B41 AND THE ONE THING THAT WOULD HAVE GONE QUIETLY WRONG. It compares against the item's
    three WITH THE PERSON'S WORDS ALREADY IN THEM, because on a skeleton road every one of them
    has a `{person}` in it and none would ever have matched a real sentence. The cost of missing
    that is not a crash: it is that B20's hand-written expectation — the thing she is braced
    for, written by a person to go with that exact prediction — silently stops travelling on the
    road templates put most people on, and one read off her own words takes its place.
  */
  function sameAsStock(f, said) {
    var want = flat(said);
    for (var i = 0; i < f.beliefs.length; i++) {
      if (flat(saidIn(f.beliefs[i].belief)) === want) return f.beliefs[i];
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
          sizeLine(c) +
          '<p class="lbl">' + esc(t('plan.expectLabel')) + '</p>' +
          (c.editing
            ? '<textarea id="x" class="short" aria-label="' + esc(t('plan.expectLabel')) + '">' +
              esc(c.x) + '</textarea><button class="edit" id="xdone">' + esc(t('plan.editDone')) + '</button>'
            : '<p class="expect wrote">' + esc(c.x) + '</p><button class="edit" id="xedit">' +
              esc(t('plan.edit')) + '</button>') +
        '</div>' +
        sizeAgain(c) +
        '<button class="big wide" id="lock">' + esc(t('plan.lock')) + '</button>' +
        '<p class="tiny">' + esc(t('plan.lockNote')) + '</p>' +
      '</div>');
    /* Back goes where they actually came from, not back into a half-finished entry. */
    wireBack(c.from || 'belief');
    wireSizeAgain(c);
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
    B42, ON A REPEAT. The same three, with last time marked — and marked is the whole of it.

    Doing something once and getting away with it is easy to put down to luck, so SAME AGAIN
    IS A REAL ANSWER and the screen has to let it be one. There is no nudge upward: the three
    are in the same order they always are, none is highlighted, none is recommended, and the
    mark on one of them says what happened last time rather than what to do next.

    It is drawn only where there are three to draw — the worry has its own, or she picked from
    the general three last time and there is a size on the record to mark. A test somebody
    wrote from nothing and planned themselves gets no row: BETR has nothing to offer it that
    would not be BETR proposing a plan for a test it did not write (B44 is the task that asks
    whether it should).
  */
  function sizesOn(d) {
    var f = d && d.id ? content.byId(WORRIES, d.id) : null;
    if (f && f.sizes) return f.sizes;
    return d && d.size ? (GENERAL.sizes || null) : null;
  }

  /*
    FOLDED UNTIL IT IS ASKED FOR, AND FOLDED INTO THE CARD RATHER THAN NEXT TO IT.

    Open, the three cost 277px and put "I'll find out today" at 919 on a 390x844 phone whose
    fold is 785 — and this screen, unlike the build screen, ALWAYS has an answer already: the
    plan she is carrying, at the size she did it at. So it says which that is and offers to
    change it, in one line, INSIDE the plan card next to the sentence it is about. A folded row
    of its own, the shape B39 used, cost 81px here; a line inside the card costs about 26,
    because a card that is already there has no second margin to pay.

    Nothing is taken away: Change opens all three, in the order they are always in, with last
    time marked. "Your own" is what it says where the plan is not one of the three — a test
    from before today, or one she wrote herself — and the three are still one tap away.
  */
  function sizeLine(c) {
    var sizes = sizesOn(c);
    if (!sizes || againOpen) return '';
    var at = pickedSize(sizes.map(function (z) { return z.name; }), c.size || '');
    return '<p class="size-line">' + esc(t('build.sizeLabel')) + ': <b>' +
      esc(at === -1 ? t('build.sizeOther') : sizes[at].name) + '</b> ' +
      '<button class="edit" id="sizeopen">' + esc(t('build.sizeChange')) + '</button></p>';
  }

  function sizeAgain(c) {
    var sizes = sizesOn(c);
    if (!sizes) return '';
    if (!againOpen) return '';
    return '<div class="chipset sizes" role="group" aria-labelledby="chips-again">' +
      '<p class="tiny chips-intro" id="chips-again">' + esc(t('plan.sizeChips')) + '</p>' +
      '<div class="chips">' + sizeButtons(sizes, sizes.map(function (z) {
        return content.fill(z.do, c.slots || {}, holesOn(c));
      }), c.size) + '</div>' +
    '</div>';
  }

  /* The holes of the worry a record belongs to, so a size reads with her own words in it on
     the way back. An own test has no worry and so has none, and fill() then hands the
     sentence back untouched. Every worry has a skeleton since B45 §5c. */
  function holesOn(d) {
    var f = d && d.id ? content.byId(WORRIES, d.id) : null;
    return f ? f.skeleton.holes : {};
  }

  function wireSizeAgain(c) {
    var sizes = sizesOn(c);
    if (!sizes) return;
    on('#sizeopen', function () {
      if (c.editing) { c.x = q('#x').value.trim() || c.x; c.editing = false; }
      againOpen = true;
      save();
      render();
    });
    qa('[data-size]').forEach(function (b) {
      b.onclick = function () {
        if (c.editing) { c.x = q('#x').value.trim() || c.x; c.editing = false; }
        var z = sizes[Number(b.getAttribute('data-size'))];
        var holes = holesOn(c);
        c.test = content.fill(z.do, c.slots || {}, holes);
        c.drop = content.fill(z.drop, c.slots || {}, holes);
        c.size = z.name;
        /* Answered, so it folds again and says what the answer is — the row always tracks
           the plan above it rather than latching open. */
        againOpen = false;
        save();
        render();
      };
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
          /* B40's three, carried from the test in hand. None of them keys this record. */
          prediction: typeof c.prediction === 'number' ? c.prediction : null,
          slots: c.slots || null, size: c.size || null,
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
    ------------------------------------------------------ the two guide screens (B44)

    "Too big? Make it smaller" and "Why it's written like this". B36 items 2 and 3, built
    last on purpose: B42 put three named sizes on the do screen itself, so the shrink stopped
    being a rescue behind a link and became teaching, which is a better job for it.

    Four rules decide their shape and none is cosmetic.

      1. THEY ARE ONLY EVER REACHED BY A LINK SOMEBODY TAPS. Never triggered, never after a
         pause, a refusal, a rating or a word anybody typed. A screen that arrives BECAUSE of
         what a person wrote is BETR deciding something about that person (research §6), and
         that is rule 2 and a medical device. This is why there is no condition anywhere in
         either function: the link is drawn on every paint of its screen, unconditionally.
      2. They read nothing. No S.done, no ladder, no rung, no draft, no worry id — the same
         line why.js is held to, one level up. Everybody reads the same words forever, which
         is what keeps them a chapter in a book. `guideBack` is the only state either has, and
         it is which screen Back returns to, not anything about anybody.
      3. They are screens, not overlays (rule 10), so paint() moves focus to the heading and
         a screen reader announces them. And they are NOT a fourth door: a link inside a
         screen, never a fifth word on the bottom row.
      4. The link is drawn where the person is when they freeze, and the box is read before
         the screen changes. That last half is B34 D2's bug: every other way off the do screen
         calls readBoxes() first, and a link that did not would quietly throw away the sentence
         somebody had half typed.
  */
  var guideBack = 'build';

  /* The link. It is the same object in all three places it appears, and it is never absent. */
  function guideLink(id, key) {
    return '<button id="' + id + '">' + esc(t('guide.' + key)) + '</button>';
  }

  /* One wiring for both, taking the reading-off of any boxes as a callback, so the screen
     that has boxes cannot forget and the two that do not need not pretend. */
  function wireGuide(id, stage, from, before) {
    on('#' + id, function () {
      if (before) before();
      guideBack = from;
      go(stage);
    });
  }

  /* Name and line, the shape both lists on the smaller screen share. */
  function guideList(cls, rows) {
    return '<ul class="' + cls + '">' + rows.map(function (r) {
      return '<li><b>' + esc(r.name) + '</b> ' + esc(r.line) + '</li>';
    }).join('') + '</ul>';
  }

  function smallerScreen() {
    paint( backButton() +
      '<div class="stage"><div class="sheet">' +
        head('h2', t('guide.smallerTitle')) +
        '<div class="primer">' +
          '<p>' + esc(t('guide.smallerOpen')) + '</p>' +
          '<p>' + esc(t('guide.smallest')) + '</p>' +
        '</div>' +
        '<p>' + esc(t('guide.dialsLabel')) + '</p>' +
        guideList('dials', I.list('guide.dials')) +
        '<p>' + esc(t('guide.smallerCounts')) + '</p>' +
        '<h3>' + esc(t('guide.shrinkLabel')) + '</h3>' +
        '<p class="belief wrote">\u201C' + esc(t('guide.shrinkSaid')) + '\u201D</p>' +
        guideList('dials', I.list('guide.shrink')) +
        '<p>' + esc(t('guide.shrinkFoot')) + '</p>' +
        '<p class="quiet">' + esc(t('why.foot')) + '</p>' +
      '</div></div>');

    wireBack(guideBack);
  }

  function writtenScreen() {
    paint( backButton() +
      '<div class="stage"><div class="sheet">' +
        head('h2', t('guide.writtenTitle')) +
        I.list('guide.written').map(function (e) {
          /* `same` names the key the answer comes from, so "why you start small" is the one
             sentence the other screen is built on rather than a second version of it. */
          return '<h3>' + esc(e.q) + '</h3><p>' + esc(e.a || t('guide.' + e.same)) + '</p>';
        }).join('') +
        '<p class="quiet">' + esc(t('why.foot')) + '</p>' +
      '</div></div>');

    wireBack(guideBack);
  }

  /*
    Repeating a test, and which plan comes back in the boxes.

    Two things have to be true at once. A corrected wording in worries.js should reach everyone
    who repeats that item, including anyone whose old result still quotes the wording it had
    before — so BETR's plan is looked up fresh rather than replayed out of the record. And what
    a person wrote themselves must come back exactly as they wrote it.

    Until B40 those never met: a plan a person had rewritten belonged to an OWN test, which had
    no item to look up. Now that the road decides rather than the words, a test can be filed
    under a worry with a plan the person typed over — and looking that up fresh would hand her
    BETR's sentence back and quietly throw hers away, on the one screen whose whole job is to
    bring her own test back. This is the second end of B40's identity change (docs/learnings.md:
    when identity moves, both ends have to move).

    So: unchanged from BETR's own words means BETR's, looked up fresh. Anything else — including
    a leave-out line she deliberately emptied — is hers, and comes back as she left it.
  */
  /*
    B42, AND IT IS THE COMPARISON THAT WOULD HAVE GONE QUIETLY WRONG THIS TIME (learnings.md:
    when content gains a variable, grep every comparison against it).

    A worry's plan may carry a `{person}` from today. Compared raw, BETR's own sentence with a
    hole in it can never equal the filled one in the record, so every repeat of a templated
    test would fall through to "hers" — harmless — but the moment it DIDN'T, on a record with
    no plan stored, the fallback would hand somebody a box with `{person}` printed in it.
    So both sides are filled from the slots that record carries before either is looked at.
  */
  function planFor(d, which) {
    var f = d.id ? content.byId(WORRIES, d.id) : null;
    var mine = typeof d[which] === 'string' ? d[which] : '';
    if (!f) return mine;
    var betr = content.fill(f[which], d.slots || {}, f.skeleton.holes);
    return flat(mine) === flat(betr) ? betr : mine;
  }
  function testFor(d) { return planFor(d, 'test'); }
  function dropFor(d) { return planFor(d, 'drop'); }

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
        /*
          B44. The primer says what CBT is; this says why BETR's one sentence is shaped the
          way it is. Under the primer because it is the smaller question, and on Help as well
          as on the build screen because somebody who has already written a test and wants to
          know why comes here, not back to a screen they have finished with.
        */
        '<p class="tiny under">' + guideLink('written', 'writtenLink') + '</p>' +

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
    wireGuide('written', 'written', 'help', null);
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
