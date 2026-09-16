/*
  BETR — the whole app (B56, 2026-09-15).

  One prediction, locked in, and your own results read back. The screens, in the order a
  person meets them, by the name each one has in S.stage:

    front     What do you think will happen?  If I ___, then ___.  Lock it in
    on        LOCKED IN · Go and find out.  Done it · Not today
    go        Did it go how you expected?  Yeah! · Sort of · Not really
    happened  What happened?  one box  Keep it
    log       the prediction, then every result in the person's own words, newest first
    mine      Your predictions
    why       How it works
    help      Help, and `where`, the country list it opens

  Under every one of them, three grey words: Your predictions · How it works · Help.

  NOT ONE SENTENCE A PERSON READS LIVES IN THIS FILE (B15). Every word is a key in
  web/content/strings-en.js, looked up through lib/i18n.js. web/tests/i18n.test.js reads this
  file and fails the build if English prose comes back into it.

  Things that are deliberate and should not be "fixed":
    - NO NUMBER. No tally, no count of predictions or results, no ladder, no score (B56 §2,
      founder: "they'll be able to put the puzzle together themselves"). A day is a label
    - no streak, no red day, no "you missed", no cap on rest. Not today records nothing
    - no verdict. "Did it go how you expected?" asks about the person's own prediction, and
      every answer to it is data
    - the prediction is locked when the person taps Lock it in, and is never edited after
    - nothing is deleted except by Delete everything. Done with this one puts a prediction away
    - no console.log, no analytics, no crash reporter, no request of any kind after load
*/
(function () {
  'use strict';

  var guards = Betr.guards;
  var look = Betr.theme;
  var storeLib = Betr.store;
  var PLACES = Betr.places;
  var W = Betr.where.create(Betr.zones, Betr.helplines);

  var app = document.getElementById('app');
  var store = storeLib.create(safeStorage());
  var S = store.load();

  /*
    ------------------------------------------------------------------ words

    The person's own choice first, then whatever the browser asks for, then English. Nothing
    is fetched to do it. This never looks at where the person is, and lib/where.js never looks
    at their language: two questions, and coupling them is the harm B17 exists to prevent.
  */
  var I = Betr.i18n.create(Betr.strings, { chosen: S.lang, prefer: myLanguages() });

  function myLanguages() {
    try {
      return navigator.languages || (navigator.language ? [navigator.language] : []);
    } catch (e) { return []; }
  }

  function t(key, vars) { return I.t(key, vars); }

  /* A sentence with ready-made markup put into its {holes}. Everything else in it is escaped. */
  function tHtml(key, parts) {
    return esc(t(key)).replace(/\{([a-zA-Z]+)\}/g, function (whole, name) {
      return parts && Object.prototype.hasOwnProperty.call(parts, name) ? parts[name] : whole;
    });
  }

  function bold(html, phrase) {
    var p = esc(phrase);
    return p ? html.split(p).join('<b>' + p + '</b>') : html;
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

  /* The purpose statement and the nine sentences are frozen (research §10, CLAUDE.md rule 7). */
  function purpose() { return t('frozen.purpose'); }
  function sentences() { return I.list('frozen.sentences'); }

  /*
    ------------------------------------------------------------------ scratch

    Never persisted, because none of it should survive a reload. `draft` is the two blanks
    while they are being written; `tag` is the answer on screen 4, carried to screen 5 and
    written down only when the person taps Keep it.
  */
  var draft = { ifPart: '', thenPart: '' };
  var tag = null;
  var refusal = null;      /* the last guard refusal, shown once and cleared on the next move */
  var installEvent = null; /* Android's beforeinstallprompt, if the browser offers one */
  var deleteArmed = false;
  var whereBack = 'help';  /* the screen the country list was opened from */
  var toSay = null;        /* what the next paint() should read out */

  /* The four screens that belong to one prediction. Everywhere else, nothing is in hand. */
  var LOOP = ['on', 'go', 'happened', 'log'];

  function safeStorage() {
    try {
      if (typeof localStorage !== 'undefined' && localStorage) return localStorage;
    } catch (e) { /* falls through */ }
    return { getItem: function () { return null; }, setItem: function () {}, removeItem: function () {} };
  }

  function save() { store.save(S); }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /*
    Markup with {holes} in it, filled with values that are ALREADY escaped. It exists so that a
    tag with several attributes can be written as one piece — split across concatenations, the
    attributes read as English to the i18n sweep, and they are not.
  */
  function markup(html, vars) {
    return html.replace(/\{([a-z]+)\}/g, function (whole, name) {
      return vars && vars[name] != null ? vars[name] : '';
    });
  }

  /*
    A person's own words, put back on the screen the way they typed them. A blank line is a
    new paragraph; single line breaks are kept by `.wrote` in the stylesheet. The words are
    never altered, only split: nothing is reflowed, shortened or tidied.
  */
  function paras(text, cls) {
    return String(text == null ? '' : text).replace(/\r\n?/g, '\n').split(/\n{2,}/)
      .map(function (p) { return p.replace(/\s+$/, ''); })
      .filter(function (p) { return p !== ''; })
      .map(function (p) {
        return '<p class="' + cls + '"><span class="wrote">' + esc(p) + '</span></p>';
      }).join('');
  }

  function q(sel) { return app.querySelector(sel); }
  function qa(sel) { return Array.prototype.slice.call(app.querySelectorAll(sel)); }
  function on(sel, fn) { var el = q(sel); if (el) el.onclick = fn; return el; }
  function focus(el) { if (el && el.focus) { try { el.focus(); } catch (e) { /* older browser */ } } }

  /*
    ------------------------------------------------------------------ heard, not seen

    Every screen's heading is `id="top" tabindex="-1"`, and paint() puts focus on it, so a
    screen reader is told the screen changed (B15). #say is a live region outside #app that
    survives every repaint, for what focusing a heading does not say: a refusal, an empty box.
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

  /* The one thing every screen goes through. Setting app.innerHTML anywhere else loses the foot. */
  function paint(html, kind) {
    app.innerHTML = '<div class="screen' + (kind ? ' ' + kind : '') + '">' +
      '<div class="top"><p class="wordmark">' + esc(t('brand')) + '</p>' + languagePick() + '</div>' +
      '<main class="main">' + html + '</main>' +
      foot() +
    '</div>';
    wireLanguagePick();
    focus(q('#top'));
    announce(toSay || '');
    toSay = null;
  }

  function head(tag, cls, text) {
    return '<' + tag + ' class="' + cls + '" id="top" tabindex="-1">' + esc(text) + '</' + tag + '>';
  }

  /* ---------------------------------------------------------------- the foot */

  /*
    Three grey words on every screen (B56 §2 item 13), and the rule the bottom bar lived under
    still holds (B8): plain words, no icons, no selected state, no badge, no count, never a
    fourth. Inside the loop too — leaving puts nothing at risk: a locked-in prediction stays
    locked in, and Your predictions is where it waits.
  */
  function foot() {
    return '<nav class="foot" aria-label="' + esc(t('foot.label')) + '">' +
      '<button id="f-mine">' + esc(t('foot.mine')) + '</button>' +
      '<button id="f-why">' + esc(t('foot.why')) + '</button>' +
      '<button id="f-help">' + esc(t('foot.help')) + '</button>' +
    '</nav>';
  }

  function wireFoot() {
    on('#f-mine', function () { go('mine'); });
    on('#f-why', function () { go('why'); });
    on('#f-help', function () { go('help'); });
  }

  function backRow() {
    return '<p class="backrow"><button class="link" id="back">' +
      '<span class="arrow" aria-hidden="true">←</span> ' + esc(t('back')) + '</button></p>';
  }

  /* ---------------------------------------------------------------- moving */

  function byId(id) {
    for (var i = 0; i < S.predictions.length; i++) if (S.predictions[i].id === id) return S.predictions[i];
    return null;
  }
  function cur() { return S.at ? byId(S.at) : null; }

  function go(stage) {
    refusal = null;
    deleteArmed = false;
    if (LOOP.indexOf(stage) === -1) { S.at = null; tag = null; }
    S.stage = stage;
    save();
    render();
    try { window.scrollTo(0, 0); } catch (e) { /* no window to scroll */ }
  }

  function render() {
    var map = {
      front: front, on: lockedIn, go: howDidItGo, happened: happened, log: results,
      mine: mine, why: why, help: help, where: whereScreen
    };
    /* A loop screen that has lost its prediction, or screen 5 that has lost its answer, falls
       back to where the person can carry on rather than crashing. */
    if (LOOP.indexOf(S.stage) !== -1 && !cur()) S.stage = 'front';
    if (S.stage === 'happened' && !tag) S.stage = 'go';
    if (!map[S.stage]) S.stage = 'front';
    map[S.stage]();
    wireCrisis();
    wireFoot();
  }

  /*
    The prediction, on paper, in the person's own words — on every screen from Locked in to the
    results, in the same words in the same place (old rule 10's one survivor, B56 §7). A loop
    screen that does not say which prediction it belongs to is the bug.
  */
  function said(p, small) {
    return '<p class="paper' + (small ? ' small' : '') + ' said">' + esc(p.sentence) + '</p>';
  }

  function tagPill(which) {
    if (!which) return '';
    return '<span class="tag ' + which + '">' + esc(t('go.' + which)) + '</span>';
  }

  /* ---------------------------------------------------------------- 1 · the front */

  /*
    The writing page (B56 §3 screens 1 and 2). The sentence is printed, and the two blanks are
    inside it — contenteditable, so a long answer wraps inside the sentence the way the canvas
    draws it, rather than running off the end of a one-line box.

    Focus goes to the heading, not the first blank. This is the first thing anybody sees, and a
    keyboard that jumps up on arrival covers the one question the screen is for. Each blank
    carries a name of its own, so a screen reader reads what it is for without the sentence.
  */
  function front() {
    var ready = !!(draft.ifPart.trim() && draft.thenPart.trim());
    paint(
      head('h1', 'headline', t('front.title')) +
      '<p class="sub">' + esc(t('front.sub')) + '</p>' +
      '<p class="paper sentence">' +
        /* The space is INSIDE the span, because the elided form has none and refreshLead()
           swaps the whole thing in one go as somebody types. */
        '<span class="fixed" id="ifwords">' + esc(leadNow()) + '</span>' +
        blank('if', draft.ifPart, t('front.ifLabel')) +
        '<span class="fixed">' + esc(t('front.thenWords')) + '</span> ' +
        blank('then', draft.thenPart, t('front.thenLabel')) +
        '<span class="fixed">' + esc(t('front.stop')) + '</span>' +
      '</p>' +
      warnBlock() +
      markup('<button class="big" id="lock" aria-disabled="{off}">{words}</button>',
        { off: ready ? 'false' : 'true', words: esc(t('front.lock')) }) +
      '<p class="say" id="note">' + esc(ready ? t('front.noteLocked') : t('front.note')) + '</p>'
    );
    wireBlank(q('#if'), 'if');
    wireBlank(q('#then'), 'then');
    on('#lock', lockIn);
  }

  function blank(id, value, label) {
    return markup('<span class="blank" id="{id}" contenteditable="true" role="textbox" ' +
      'aria-label="{label}" spellcheck="true" enterkeyhint="{key}">{value}</span>',
      { id: id, label: esc(label), value: esc(value), key: id === 'if' ? 'next' : 'done' });
  }

  function textOf(el) {
    return String(el && el.textContent != null ? el.textContent : '').replace(/ /g, ' ');
  }

  function readBlanks() {
    var a = q('#if');
    var b = q('#then');
    if (a) draft.ifPart = textOf(a);
    if (b) draft.thenPart = textOf(b);
  }

  /*
    Typing changes two things and repaints nothing: the button comes up from 45%, and the line
    under it changes (B56 §3 screen 2). A repaint here would move focus and the caret out from
    under somebody mid-word.
  */
  function refreshLock() {
    var ready = !!(draft.ifPart.trim() && draft.thenPart.trim());
    var btn = q('#lock');
    var note = q('#note');
    if (btn) btn.setAttribute('aria-disabled', ready ? 'false' : 'true');
    if (note) note.textContent = ready ? t('front.noteLocked') : t('front.note');
    refreshLead();
  }

  /*
    « Si je » ↔ « Si j’ » as the first blank is typed into (B16). One textContent on a span
    the caret is not in, so it changes under somebody mid-word without moving them — which is
    the same reason refreshLock() exists instead of a repaint.
  */
  function leadNow() {
    var lead = ifLead(flat(draft.ifPart));
    return lead.words + lead.glue;
  }

  function refreshLead() {
    var el = q('#ifwords');
    if (el) el.textContent = leadNow();
  }

  function wireBlank(el, which) {
    if (!el) return;
    el.oninput = function () { readBlanks(); refreshLock(); };
    /* One line each. Return moves to the second blank, and from the second, locks it in. */
    el.onkeydown = function (e) {
      if (!e || e.key !== 'Enter') return;
      e.preventDefault();
      if (which === 'if') focus(q('#then'));
      else lockIn();
    };
    /* Pasted words arrive as words: no bold, no links, no line breaks from somewhere else. */
    el.onpaste = function (e) {
      var text;
      try { text = e.clipboardData.getData('text/plain'); } catch (x) { return; }
      e.preventDefault();
      text = String(text || '').replace(/\s+/g, ' ');
      var done = false;
      try { done = document.execCommand('insertText', false, text); } catch (x) { done = false; }
      if (!done) el.textContent = textOf(el) + text;
      readBlanks();
      refreshLock();
    };
  }

  /*
    The words that open the sentence, and the glue between them and what the person wrote.

    English has one form, "If I", and the only thing that ever varied was the space: somebody
    who types "’m late" gets "If I’m late" and not "If I ’m late". French has TWO forms,
    « Si je » and « Si j’ », because the pronoun elides in front of a vowel, and only the app
    can choose between them because only the app knows what was typed (B16, 2026-09-16).

    No French lives in here. The second form and the list of words that refuse it are both in
    the language's own file; a language with no second form never reaches this at all, which
    is why English is untouched by any of it.
  */
  function ifLead(first) {
    var plain = t('front.ifWords');
    /* "’m late" takes no space and no elision: they wrote the pronoun themselves. */
    if (/^[’\u0027]/.test(first)) return { words: plain, glue: '' };
    var elided = t('front.ifWordsElided');
    if (elided && elides(first)) return { words: elided, glue: '' };
    return { words: plain, glue: ' ' };
  }

  /*
    A vowel, or an h that is not on the language's list of the ones that refuse. Accents are
    folded first, so écoute and harcèle are read as ecoute and harcele — without that, an
    accented first letter would never match and the whole thing would quietly never fire.
    `y` is deliberately not a vowel here: it opens a word as a consonant does.
  */
  function elides(first) {
    var w = String(first || '').toLowerCase().normalize('NFD').replace(/\p{Mn}/gu, '');
    if (!/^[aeiouh]/.test(w)) return false;
    if (w.charAt(0) !== 'h') return true;
    var refuse = t('front.noElision').split(' ');
    for (var i = 0; i < refuse.length; i++) {
      if (refuse[i] && w.indexOf(refuse[i]) === 0) return false;
    }
    return true;
  }

  /* "If I" + what they wrote + ", then" + what they wrote, and a full stop if they left it off. */
  function sentenceOf(a, b) {
    var first = flat(a)
      .replace(/^(if\s+)?i(?=[\s’\u0027])\s*/i, '')   /* they typed "If I" or "I" themselves */
      .replace(/[\s.,;:]+$/, '');
    var second = flat(b).replace(/^then\b[\s,]*/i, '');
    if (!/[.!?…]$/.test(second)) second += t('front.stop');
    var lead = ifLead(first);
    return lead.words + lead.glue + first + t('front.thenWords') + ' ' + second;
  }

  function flat(s) { return String(s || '').replace(/\s+/g, ' ').trim(); }

  /*
    Lock it in. An empty blank is not a refusal: the button is drawn at 45% and does nothing a
    sighted person can see — and a screen reader, which cannot see 45%, is told which blank
    is empty and is put in it. The harm stop runs on both blanks, and its refusal is the crisis
    block for the country the person is actually in. Their own words are never read back to them.
  */
  function lockIn() {
    readBlanks();
    var a = draft.ifPart.trim();
    var b = draft.thenPart.trim();
    if (!a || !b) {
      focus(q(a ? '#then' : '#if'));
      announce(a ? t('refusal.emptyBelief') : t('refusal.emptyIf'));
      return;
    }
    var check = guards.checkPart(a, 'if');
    if (check.ok) check = guards.checkPart(b, 'then');
    if (!check.ok) { refuse(check); return; }

    var day = storeLib.today();
    var p = { id: storeLib.rid(), sentence: sentenceOf(a, b), made: day, locked: day, away: false, results: [] };
    S.predictions.push(p);
    draft = { ifPart: '', thenPart: '' };
    S.at = p.id;
    askToPersist();
    go('on');
  }

  function refuse(check) {
    refusal = check;
    say(t(check.reason));
    render();
  }

  function warnBlock() {
    if (!refusal) return '';
    return '<div class="warn"><p>' + esc(t(refusal.reason)) + '</p>' +
      (refusal.kind === 'harm' ? crisisBlock() : '') + '</div>';
  }

  /* ---------------------------------------------------------------- 3 · locked in */

  function lockedIn() {
    var p = cur();
    paint(
      '<p class="label">' + esc(t('on.kicker')) + '</p>' +
      said(p) +
      head('h2', 'ask', t('on.ask')) +
      '<p class="sub">' + esc(t('on.sub')) + '</p>' +
      '<button class="big" id="done">' + esc(t('on.done')) + '</button>' +
      '<button class="link" id="nottoday">' + esc(t('on.notToday')) + '</button>'
    );
    on('#done', function () { go('go'); });
    /* Rule 5. Nothing recorded, still locked in, and waiting on Your predictions. */
    on('#nottoday', function () { go('mine'); });
  }

  /* ---------------------------------------------------------------- 4 · how did it go */

  /* The spark on Yeah! Drawn here, not an emoji, and hidden from a screen reader (B56 §3). */
  var SPARK = '<svg class="spark" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
    '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/></svg>';

  /*
    Founder, 2026-09-15: the friend who asks "SOOOO, how did it go??" before anything else.
    Yeah! is the party, Sort of is plain, Not really is quieter. KNOWN WRINKLE, for the reviewer
    and not for re-arguing here: a worry that came true is answered Yeah!, and the pill is a
    party (B56 §9b).
  */
  function howDidItGo() {
    var p = cur();
    paint(
      said(p, true) +
      head('h2', 'ask', t('go.ask')) +
      '<div class="pills">' +
        '<button class="pill yeah" data-tag="yeah">' + SPARK + ' ' + esc(t('go.yeah')) + '</button>' +
        '<button class="pill sort" data-tag="sort">' + esc(t('go.sort')) + '</button>' +
        '<button class="pill not" data-tag="not">' + esc(t('go.not')) + '</button>' +
      '</div>'
    );
    qa('[data-tag]').forEach(function (b) {
      b.onclick = function () { tag = b.getAttribute('data-tag'); go('happened'); };
    });
  }

  /* ---------------------------------------------------------------- 5 · what happened */

  /* Not skippable (B56 §3): the words are the evidence, and the evidence is the point. */
  function happened() {
    var p = cur();
    paint(
      said(p, true) +
      '<div class="askrow">' + tagPill(tag) + head('h2', 'ask', t('happened.ask')) + '</div>' +
      '<textarea class="paper small box" id="x" aria-labelledby="top" rows="5"></textarea>' +
      '<button class="big" id="keep">' + esc(t('happened.keep')) + '</button>'
    );
    on('#keep', function () {
      var box = q('#x');
      var text = String(box && box.value != null ? box.value : '').trim();
      if (!text) {
        focus(box);
        announce(t('happened.empty'));
        return;
      }
      p.results.push({ tag: tag, text: text, day: storeLib.today() });
      p.locked = null;
      tag = null;
      go('log');
    });
  }

  /* ---------------------------------------------------------------- 6 · your results */

  /*
    The evidence, growing (research/10 §11.6). The prediction, then every result in the
    person's own words, newest first, each with its tag and a day. No number anywhere on this
    screen, and no result screen of its own before it: "they'll be able to put the puzzle
    together themselves" (founder, B56 §2 item 7).

    The prediction is this screen's heading. It is the only title the screen has.
  */
  function results() {
    var p = cur();
    var list = p.results.slice().reverse();
    paint(
      markup('<h2 class="paper small said" id="top" tabindex="-1">{words}</h2>', { words: esc(p.sentence) }) +
      (list.length
        ? markup('<ol class="paper small results" aria-label="{label}">', { label: esc(t('log.list')) }) +
          list.map(entry).join('') + '</ol>'
        : '') +
      '<button class="big" id="again">' + esc(t('log.again')) + '</button>' +
      (p.away
        ? '<button class="link" id="bringback">' + esc(t('log.back')) + '</button>'
        : '<button class="link" id="away">' + esc(t('log.done')) + '</button>')
    );
    on('#again', function () { p.locked = storeLib.today(); p.away = false; go('on'); });
    /* Put away. Nothing is deleted; the export still has it; one tap brings it back. */
    on('#away', function () { p.away = true; go('mine'); });
    on('#bringback', function () { p.away = false; go('mine'); });
  }

  function entry(r) {
    var meta = tagPill(r.tag) + (r.day ? '<span class="day">' + esc(dayLabel(r.day)) + '</span>' : '');
    return '<li class="entry">' + (meta ? '<p class="meta">' + meta + '</p>' : '') + paras(r.text, 't') + '</li>';
  }

  /*
    A LABEL, NEVER A CALENDAR (B56 §3). The weekday for anything in the last week — SAT, as the
    canvas draws it — and the day and month for anything older, because five results all
    labelled SAT would be a puzzle nobody asked for. The year only once it could be confused.
    No gap is ever shown and nothing counts the days in between.
  */
  function dayLabel(day) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(day || '');
    if (!m) return '';
    var then = new Date(+m[1], +m[2] - 1, +m[3]);
    var now = new Date();
    var ago = Math.round((new Date(now.getFullYear(), now.getMonth(), now.getDate()) - then) / 86400000);
    var shape = ago >= 0 && ago < 7 ? { weekday: 'short' }
      : (ago < 300 ? { day: 'numeric', month: 'short' } : { day: 'numeric', month: 'short', year: 'numeric' });
    try { return new Intl.DateTimeFormat(I.lang(), shape).format(then); } catch (e) { return day; }
  }

  /* ---------------------------------------------------------------- 7 · your predictions */

  /*
    One card per prediction: the sentence, then its tags oldest to newest, and LOCKED IN at the
    end of the row if it is waiting. No count of predictions, no total of tags (B56 §3).
    Newest activity first. Put away sits at the bottom under its own quiet heading.
  */
  function mine() {
    var active = ordered(false);
    var away = ordered(true);
    paint(
      head('h2', 'ask', t('mine.title')) +
      active.map(card).join('') +
      '<button class="big" id="new">' + esc(t('mine.new')) + '</button>' +
      (away.length
        ? '<h3 class="label away">' + esc(t('mine.away')) + '</h3>' + away.map(card).join('')
        : '') +
      '<p class="quiet"><button class="link" id="export">' + esc(t('io.export')) + '</button>' +
        '<button class="link" id="wipe">' + esc(t('io.wipe')) + '</button></p>' +
      '<div id="io"></div>' +
      (showInstall() ? installBlock() : ''),
      'list'
    );
    qa('[data-p]').forEach(function (b) {
      b.onclick = function () {
        var p = byId(b.getAttribute('data-p'));
        if (!p) return;
        S.at = p.id;
        go(p.locked ? 'on' : 'log');
      };
    });
    on('#new', function () { go('front'); });
    on('#export', showExport);
    on('#wipe', armDelete);
    wireInstall();
  }

  function card(p) {
    var tags = p.results.map(function (r) { return tagPill(r.tag); }).join('') +
      (p.locked ? '<span class="tag locked">' + esc(t('mine.locked')) + '</span>' : '');
    return markup('<button class="paper small card" data-p="{id}">', { id: esc(p.id) }) +
      '<span class="said">' + esc(p.sentence) + '</span>' +
      (tags ? '<span class="tags">' + tags + '</span>' : '') +
    '</button>';
  }

  function lastDay(p) {
    var r = p.results[p.results.length - 1];
    return [p.locked, r && r.day, p.made].reduce(function (best, d) { return d && d > best ? d : best; }, '');
  }

  function ordered(away) {
    return S.predictions
      .map(function (p, i) { return { p: p, i: i, d: lastDay(p) }; })
      .filter(function (e) { return e.p.away === away; })
      .sort(function (a, b) { return a.d < b.d ? 1 : (a.d > b.d ? -1 : b.i - a.i); })
      .map(function (e) { return e.p; });
  }

  /* ---------------------------------------------------------------- 8 · how it works */

  function why() {
    paint(
      head('h2', 'ask', t('why.title')) +
      '<p class="plainsay">' + esc(t('why.guess')) + '</p>' +
      '<p class="plainsay">' + esc(t('why.method')) + '</p>' +
      '<p class="say start">' + esc(t('why.help')) + '</p>' +
      '<button class="big" id="write">' + esc(t('why.write')) + '</button>'
    );
    on('#write', function () { go('front'); });
  }

  /*
    ------------------------------------------------------------------ the crisis block

    The three numbers written into sentence 7 itself, made tappable. Sentence 7 is frozen and
    names the US and UK lines, so these wrap them and nothing else, and the sentence still reads
    word for word — menu.test.js strips the tags back off and compares.
  */
  var CALLABLE = [
    { text: '988', href: 'tel:988' },
    { text: '116 123', href: 'tel:116123' },
    { text: 'findahelpline.com', href: 'https://findahelpline.com' }
  ];

  function callable(sentence) {
    var html = esc(sentence);
    CALLABLE.forEach(function (n) {
      html = html.replace(n.text, '<a href="' + n.href + '">' + n.text + '</a>');
    });
    return html;
  }

  /*
    The four layers, always in this order (B17): the line that is true everywhere; the line for
    the country the person is in, or the plain admission that nobody has checked one; one tap to
    say where they actually are; findahelpline.com last, labelled as the part that needs the
    internet. Never a neighbour's number. Where the country comes from is lib/where.js.
  */
  function whereEnv() {
    var env = { timeZone: null, languages: null };
    try { env.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; } catch (e) { /* no Intl */ }
    try { env.languages = navigator.languages || (navigator.language ? [navigator.language] : null); } catch (e) { /* no navigator */ }
    return env;
  }

  function myCountry() { return W.resolve(S.country, whereEnv()); }

  function lineWords(l) {
    var after = [];
    if (l.free) after.push(t('crisis.free'));
    if (l.allHours) after.push(t('crisis.allHours'));
    if (l.language) after.push(t('crisis.inLanguage', { language: languageName(l.language) }));
    /* It starts a sentence, so it starts with a capital: a line whose only detail is its
       language used to read "…du Suicide. in French." in English, and in French too. */
    var tail = after.join(', ');
    tail = tail.charAt(0).toUpperCase() + tail.slice(1);
    return esc(l.text ? t('crisis.callOrText') : t('crisis.call')) + ' ' +
      '<a href="' + esc(l.tel) + '">' + esc(l.number) + '</a> — ' + esc(l.name) +
      (after.length ? '. ' + esc(tail) : '') + '.';
  }

  /*
    "Dutch" to somebody reading English, « néerlandais » to somebody reading French: the browser's
    own name for a language, in the language the person reads (B16). The code itself if the
    browser has no list, which is ugly and still true.
  */
  function languageName(code) {
    try {
      var n = new Intl.DisplayNames([I.code], { type: 'language' }).of(code);
      if (n && n !== code) return n;
    } catch (e) { /* no DisplayNames: the code stands */ }
    return code;
  }

  function crisisBlock() {
    var code = myCountry();
    var lines = W.linesFor(code);
    var html = '<p>' + esc(t('crisis.emergency')) + '</p>';

    if (lines.length === 1) {
      html += '<p>' + esc(t('crisis.in', { country: W.inWords(code, I.code) })) + ' ' + lineWords(lines[0]) + '</p>';
    } else if (lines.length) {
      html += '<p>' + esc(t('crisis.in', { country: W.inWords(code, I.code) })) + '</p><ul class="places">' +
        lines.map(function (l) { return '<li>' + lineWords(l) + '</li>'; }).join('') + '</ul>';
    } else if (code) {
      html += '<p>' + tHtml('crisis.unchecked', { country: '<b>' + esc(W.nameFor(code, I.code)) + '</b>' }) + '</p>';
    } else {
      html += '<p>' + esc(t('crisis.noCountry')) + '</p>';
    }

    html += '<p><button class="plain" id="where">' +
      esc(code ? t('crisis.notWhereYouAre') : t('crisis.sayWhere')) + '</button></p>' +
      '<p>' + tHtml('crisis.directory', {
        link: '<a href="https://findahelpline.com">findahelpline.com</a>'
      }) + '</p>';
    return html;
  }

  /* Both Help and a refusal can carry the block, so the one button in it is wired centrally. */
  function wireCrisis() {
    on('#where', function () { whereBack = S.stage; go('where'); });
  }

  /*
    The country list. It changes which helpline number is on the crisis block and nothing else
    in BETR, and it must not grow into a settings screen.
  */
  function whereScreen() {
    var code = myCountry();
    var chosen = W.known(S.country) ? S.country : null;

    paint(backRow() +
      '<div class="sheet">' +
        head('h2', 'title', t('where.title')) +
        '<p>' + esc(t('where.sub')) + '</p>' +
        (chosen
          ? '<p><button class="plain" id="unset">' + esc(t('where.unset')) + '</button></p>'
          : '<p>' + esc(code
              ? t('where.guessing', { country: W.nameFor(code, I.code) })
              : t('where.guessingUnknown')) + '</p>') +
        '<ul class="places countries">' + W.list(I.code).map(function (c) {
          return '<li><button class="plain" data-cc="' + esc(c.code) + '">' + esc(c.name) +
            (c.code === chosen
              ? ' <span aria-hidden="true">✓</span><span class="sr">' + esc(t('where.chosen')) + '</span>'
              : '') + '</button></li>';
        }).join('') + '</ul>' +
      '</div>', 'long');

    on('#back', function () { go(whereBack); });
    qa('[data-cc]').forEach(function (b) {
      b.onclick = function () {
        S.country = b.getAttribute('data-cc');
        save();
        say(t('a11y.countryChanged', { country: W.nameFor(S.country, I.code) }));
        go(whereBack);
      };
    });
    on('#unset', function () { S.country = null; save(); render(); });
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
    days without a visit, so a person who comes back in a fortnight has lost every result —
    harmed by our own privacy design. Home-screen install is what stops that.

    It is on Your predictions, once there is something there to lose, and nowhere in the loop:
    the canvas gives screens 1 to 6 nothing else, and a person who has just written what they
    are hoping for is not somebody to hand an instruction to.
  */
  function showInstall() { return !isInstalled() && !S.seenInstall && S.predictions.length > 0; }

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
    Help, unchanged in substance by B56 and restyled onto a paper sheet, because it is long and
    it is read, and long reading on the orange is hard. The order is the point (B8, B17, B26, B33):

      1. the crisis lines, above everything
      2. what it costs and what leaves the phone, and export and delete
      3. choosing one that is safe — frozen sentence 6, the only place the line is drawn
      4. what CBT is, and which bit of it this is
      5. what this is: the purpose statement and the nine sentences, word for word
      6. other places, none of them run by us
      7. who made this (B57 rewrites it), the language, and the code

    B56 took two things off it: the count of results on this phone (no number, anywhere) and the
    link to the old guide screen, which is gone. Nothing on this screen is fetched.
  */
  /*
    A place's text in the language being read (B16). places.js keeps each language's words
    beside the English — `fr: { what: … }` — and a field the language has not got falls back to
    the English one, a field at a time, the way strings do. Never a url: the link is the same
    for everybody, in every language.
  */
  function placeText(entry, field) {
    var mine = I.code !== 'en' && entry[I.code];
    return (mine && typeof mine[field] === 'string') ? mine[field] : entry[field];
  }

  function help() {
    var build = document.querySelector('meta[name="betr-build"]');
    var hash = build ? build.getAttribute('content') : 'dev';
    var primer = I.list('help.primer');

    paint(backRow() +
      '<div class="sheet">' +

        head('h2', 'title', t('crisis.title')) +
        crisisBlock() +
        '<p class="quiet">' + esc(t('crisis.howWeKnow')) + '</p>' +

        '<h2>' + esc(t('help.proofTitle')) + '</h2>' +
        '<p>' + esc(t('help.free')) + '</p>' +
        '<p>' + esc(t('help.airplane')) + '</p>' +
        '<div class="proof">' +
          '<span><b>0</b><small>' + esc(t('help.proofAccounts')) + '</small></span>' +
          '<span><b>' + esc(t('help.zeroBytes')) + '</b><small>' + esc(t('help.proofSent')) + '</small></span>' +
        '</div>' +
        '<p><button class="plain" id="export">' + esc(t('io.export')) + '</button>' +
        '<button class="plain" id="wipe">' + esc(t('io.wipe')) + '</button></p>' +
        '<div id="io"></div>' +

        '<h2>' + esc(t('help.safeTitle')) + '</h2>' +
        '<p>' + callable(sentences()[5]) + '</p>' +

        '<h2>' + esc(t('help.cbtTitle')) + '</h2>' +
        '<div class="primer">' +
          primer.map(function (p) {
            return '<p>' + bold(esc(p), t('help.experiment')) + '</p>';
          }).join('') +
          '<p>' + esc(t('help.readingIntro')) + '</p>' +
          '<ul class="places">' + PLACES.reading.map(function (r) {
            return '<li><a href="' + esc(r.url) + '" target="_blank" rel="noopener noreferrer">' +
              esc(placeText(r, 'name')) + '</a> — ' + esc(placeText(r, 'what')) + '</li>';
          }).join('') + '</ul>' +
        '</div>' +

        '<h2>' + esc(t('help.whatThisTitle')) + '</h2>' +
        '<p>' + esc(purpose()) + '</p>' +
        '<ol>' + sentences().map(function (s) { return '<li>' + callable(s) + '</li>'; }).join('') + '</ol>' +

        '<h2>' + esc(t('help.placesTitle')) + '</h2>' +
        '<p>' + esc(placeText(PLACES, 'intro')) + '</p>' +
        PLACES.groups.map(function (grp) {
          return '<h3' + (grp.id ? ' id="group-' + esc(grp.id) + '" tabindex="-1"' : '') +
            '>' + esc(placeText(grp, 'title')) + '</h3>' +
            (grp.note ? '<p class="tiny">' + esc(placeText(grp, 'note')) + '</p>' : '') +
            '<ul class="places">' + grp.items.map(function (place) {
              return '<li><a href="' + esc(place.url) + '" target="_blank" rel="noopener noreferrer">' +
                esc(placeText(place, 'name')) + '</a> — ' + esc(placeText(place, 'what')) + '</li>';
            }).join('') + '</ul>';
        }).join('') +

        /*
          B54 and rule 9, carried over as they stand until B57 ships: the block is on HELP and
          nowhere else, the logo is a file in this folder (img-src 'self'), and the wordmark is
          the system font. B57 §4a is the founder's answer to what replaces it.
        */
        '<h2 id="who-made" tabindex="-1">' + esc(t('help.whoTitle')) + '</h2>' +
        '<p>' + esc(t('help.who')) + '</p>' +
        '<div class="maker">' +
          '<p class="maker-lock">' +
            '<img src="trybeup-logo.png" alt="" width="125" height="144">' +
            '<span>' + esc(t('help.makerName')) + '</span>' +
          '</p>' +
          '<p class="maker-tag">' + esc(t('help.makerTag')) + '</p>' +
          '<p>' + esc(t('help.makerWhat')) + '</p>' +
          '<p>' + esc(t('help.makerAI')) + '</p>' +
          '<p class="maker-cost">' + esc(t('help.makerCost')) + '</p>' +
          '<p class="tiny">' + esc(t('help.makerApart')) + '</p>' +
          '<p class="maker-go"><a href="https://trybeup.com" target="_blank" rel="noopener noreferrer">' +
            esc(t('help.makerLink')) + '</a> — ' + esc(t('help.makerLinkWhat')) + '</p>' +
        '</div>' +

        languageBlock() +

        '<h2>' + esc(t('help.codeTitle')) + '</h2>' +
        '<p>' + esc(t('help.code')) + '</p>' +
        '<p class="build">' + (hash === 'dev' ? esc(t('help.devBuild')) : esc(hash)) + '</p>' +

      '</div>', 'long');

    on('#back', function () { go('front'); });
    on('#export', showExport);
    on('#wipe', armDelete);
    wireLanguage();
  }

  /*
    The language switch, in two places since 2026-09-16.

    TOP RIGHT OF EVERY SCREEN, the founder's call: a small grey two-letter code — EN, FR — on
    the wordmark's line. Until then it was one line in Help and nothing else (B15), and "never a
    picker on the front screen" was written down as a rule; the founder moved it, and CLAUDE.md
    rule 10 records that. It is deliberately quiet: no flag (a flag is a country, and language
    is never country — B17), no border, no box, and on every screen including a refusal,
    because somebody who cannot read the crisis block is exactly who needs to switch it.

    It is a real <select>, laid invisibly over the two letters. The letters are what a person
    sees; the select is what a finger, a keyboard and a screen reader actually use, and on a
    phone it opens the phone's own picker. The options carry each language's name in itself —
    Français, not French — so a person can find their own.

    AND IN HELP, which stays, because it carries the sentence that matters: every language is
    already on the phone and choosing one fetches nothing.

    While there is only one language, neither is drawn.
  */
  function languagePick() {
    var all = I.locales();
    if (all.length < 2) return '';
    return '<div class="lang"><span class="lang-code" aria-hidden="true">' + esc(I.code.toUpperCase()) + '</span>' +
      '<select id="lang" aria-label="' + esc(t('help.langTitle')) + '">' + all.map(function (l) {
        return '<option value="' + esc(l.code) + '" lang="' + esc(l.code) + '"' +
          (l.code === I.code ? ' selected' : '') + '>' + esc(l.name) + '</option>';
      }).join('') + '</select></div>';
  }

  function wireLanguagePick() {
    var el = q('#lang');
    if (el) el.onchange = function () { setLanguage(el.value); };
  }

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
      b.onclick = function () { setLanguage(b.getAttribute('data-lang')); };
    });
  }

  /* One road for both switches. Remembered on the phone, like everything else, and nowhere else. */
  function setLanguage(code) {
    S.lang = code;
    save();
    I = Betr.i18n.create(Betr.strings, { chosen: S.lang, prefer: myLanguages() });
    applyLanguage();
    render();
  }

  /* ---------------------------------------------------------------- export and delete */

  function showExport() {
    var json = storeLib.exportJSON(S, t('io.exportNote'));
    var io = q('#io');
    if (!io) return;
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
    if (!io || deleteArmed) return;
    deleteArmed = true;
    io.innerHTML = '<div class="warn">' + esc(t('io.deleteAsk')) +
      '<div class="row"><button class="ghost" id="yes">' + esc(t('io.deleteYes')) + '</button>' +
      '<button class="ghost" id="no">' + esc(t('io.deleteNo')) + '</button></div></div>';
    announce(t('io.deleteAsk'));
    on('#yes', function () {
      S = storeLib.blank();
      draft = { ifPart: '', thenPart: '' };
      tag = null;
      refusal = null;
      deleteArmed = false;
      render();
      try { window.scrollTo(0, 0); } catch (e) { /* no window to scroll */ }
      /* Last, so nothing is written back afterwards. The keys are gone until the next tap. */
      store.clear();
      /* And the look, so a wiped BETR and a fresh BETR are the same phone byte for byte. */
      look.forget();
    });
    on('#no', function () { deleteArmed = false; io.innerHTML = ''; });
  }

  /* ---------------------------------------------------------------- go */

  applyLanguage();
  render();
})();
