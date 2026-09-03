/*
  Betr v1 — the whole app.

  Seven screens for the loop (start, pick, test, locked, happened, sure, result), plus the
  second door, the three screens for a person's own entry, "your worries", and Help.
  Four taps and one sentence gets you all the way round.

  Under all of them, on every screen, three plain words: Your worries · New worry · Help.
  That row is not a tab bar and must not grow into one (B8, CLAUDE.md rule 10 as amended
  2026-09-03): no icons, no selected state, no badge, no count, no fourth item.

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

  /*
    The purpose statement. Rule: identical in the app, the manifest, the store listing and
    every post (research §5.4 — MHRA's worked example is a product that said one thing on its
    site and another on social). If you change it here, change it in index.html's <meta
    name="description">, manifest.webmanifest, and everywhere it has ever been published.
  */
  var PURPOSE = 'BETR helps you test unhelpful beliefs in everyday life. You pick a worry ' +
    'about how people will react, it gives you one small thing to try today, and you record ' +
    'what actually happened.';

  /*
    The nine sentences, verbatim from docs/research/10-cbt-gateway-approach.md §10.
    Do not reword them. Google Play requires the "not a medical device" one, Apple requires
    the "check with a doctor" one, and the rest are what keeps this a worksheet rather than a
    regulated device. Sentence 7 is repeated on its own below, on purpose.
  */
  var SENTENCES = [
    'This is a self-help worksheet, not therapy, and it is not a medical device. It does not diagnose, treat, cure or prevent any condition.',
    'It uses one technique from cognitive behavioural therapy (CBT), the behavioural experiment: write down a belief, predict what will happen, try it, record what actually happened, and rate the belief again.',
    'It can help you manage everyday worry and unhelpful beliefs. It will not solve them, and it is not a substitute for working with a qualified CBT therapist. If you can see one, please do.',
    'It is not for you right now if you are having thoughts of suicide or self-harm, have been told you have psychosis or bipolar disorder, have an eating disorder, PTSD or OCD, or are dependent on alcohol or drugs. Those need a person, not an app.',
    'If you are already in therapy, follow your therapist’s plan. Use this only if they agree.',
    'Choose experiments that are safe and legal. Never design one that involves the habit you’re trying to change, self-harm, restricting food, or putting yourself or anyone else at risk.',
    'If you are in danger or in crisis, call your local emergency number. In the US, call or text 988. In the UK and Ireland, call Samaritans free on 116 123. Elsewhere, findahelpline.com lists free helplines in over 175 countries.',
    'Everything you write stays on this device. There is no account, no server, and nothing is sent to us or anyone else. If you delete the app without exporting, your entries are gone.',
    'This was made by the people behind TrybeUP, not by a clinician or a health service. Nothing in it is medical advice, and using it does not create a therapist–client relationship.'
  ];
  var CRISIS = SENTENCES[6];

  var app = document.getElementById('app');
  var store = storeLib.create(safeStorage());
  var S = store.load();

  /* Scratch state: never persisted, because none of it should survive a reload. */
  var draft = { belief: '', test: '', drop: '' };
  var refusal = null;      /* the last guard refusal, shown once and cleared on the next tap */
  var installEvent = null; /* Android's beforeinstallprompt, if the browser offers one */
  var storageOk = true;
  var deleteArmed = false;

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

  /* The four screens that belong to a test in hand. Everywhere else is outside the loop. */
  var IN_LOOP = ['plan', 'locked', 'happened', 'sure'];

  /*
    The crisis numbers, tappable. Founder's ask, 2026-09-03: somebody reading that line is the
    least able person in the app to copy a number out by hand.

    The words do not change. This wraps three of them and nothing else, so sentence 7 still
    reads exactly as it is written in research §10 — `menu.test.js` strips the tags back off
    and compares, so it stays that way.

    A tel: link is inert until it is tapped, and then it is the phone's dialler, not us. It
    makes no request, sends nothing, and cannot tell us it was tapped. The airplane-mode proof
    is untouched, and 988 and 116 123 both work with no signal on any phone that can call at
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
    return '<nav class="menu" aria-label="Betr">' +
      '<button id="m-mine">Your worries</button>' +
      '<button id="m-new">New worry</button>' +
      '<button id="m-help">Help</button>' +
    '</nav>';
  }

  function paint(html) { app.innerHTML = html + menu(); }

  function wireMenu() {
    on('#m-mine', function () { go('mine'); });
    on('#m-new', function () { S.filter = null; go('pick'); });
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
  function resume(t, stage) {
    park();
    var i = S.open.indexOf(t);
    if (i !== -1) S.open.splice(i, 1);
    S.cur = t;
    go(stage || 'locked');
  }

  function worriesFor(doorId) {
    if (!doorId) return WORRIES;
    var door = null;
    for (var i = 0; i < DOORS.items.length; i++) if (DOORS.items[i].id === doorId) door = DOORS.items[i];
    if (!door) return WORRIES;
    return door.worries.map(function (id) { return content.byId(WORRIES, id); }).filter(Boolean);
  }

  function startFrom(f) {
    S.cur = {
      source: 'stock', id: f.id, label: f.label, belief: f.belief,
      x: f.expect, test: f.test, drop: f.drop,
      from: 'pick', editing: false, locked: null, missed: false
    };
  }

  function backButton() {
    return '<button class="back" id="back">← Back</button>';
  }
  function wireBack(target) { on('#back', function () { go(target); }); }

  /* ---------------------------------------------------------------- the ladder */

  /*
    Ten dots and the number, one row per test. Founder's call, 2026-09-02: their own CBT used
    1-10, and the thing that kept them going was watching it come down. It is the only number
    in Betr besides completed tests, and it belongs to one belief. It is never a score of the
    person, never added up, never averaged across worries, and never a line with a target on it.
  */
  function rung(when, level, said) {
    var dots = '';
    for (var i = 1; i <= rate.TOP; i++) dots += '<i' + (i <= level ? ' class="on"' : '') + '></i>';
    return '<div class="rung">' +
        '<span class="when">' + esc(when) + '</span>' +
        '<span class="dots" aria-hidden="true">' + dots + '</span>' +
        '<span class="num">' + level + '</span>' +
        '<span class="sr">out of 10</span>' +
      '</div>' +
      (said ? '<p class="said">' + esc(said) + '</p>' : '');
  }

  var ORDINALS = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'];
  function ordinal(n) { return ORDINALS[n - 1] || (n + 'th'); }

  /* Where it started, then one row per test, newest last. A long ladder keeps its ends. */
  function ladder(g, opts) {
    var said = !!(opts && opts.said);
    var shown = g.results;
    var skipped = '';
    if (shown.length > 6) {
      skipped = '<p class="said elided">' + (shown.length - 6) + ' earlier tests</p>';
      shown = shown.slice(-6);
    }
    var first = g.results.length - shown.length;
    return '<div class="ladder">' +
      rung('Started', rate.TOP, '') +
      skipped +
      shown.map(function (r, i) {
        var last = i === shown.length - 1;
        return rung(last ? 'Now' : ordinal(first + i + 1), rate.clamp(r.level), said ? r.o : '');
      }).join('') +
    '</div>';
  }

  /* Set up a repeat of something already tested. Stock wording is looked up fresh. */
  function again(d, from) {
    S.cur = {
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
      'own-belief': ownBelief, 'own-test': ownTest, 'own-drop': ownDrop,
      plan: plan, locked: locked, happened: happened, sure: sure,
      result: result, mine: mine, help: help,
      about: help   /* what a phone that saw the old "what this is" screen has stored */
    };
    /* Any half-finished loop that lost its item drops back to the start rather than crashing. */
    if (IN_LOOP.indexOf(S.stage) !== -1 && !S.cur) S.stage = 'start';
    (map[S.stage] || start)();
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
      return '<div class="note"><b>On the go.</b> ' + esc(S.open[0].test) +
        '<div class="row"><button class="ghost" id="pickup">Pick it up</button></div></div>';
    }
    return '<p class="tiny"><button id="pickup">Tests you’ve got on the go</button></p>';
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
        '<div class="kicker">BETR</div>' +
        '<h1>Sure it’ll go badly?</h1>' +
        '<p class="sub">Pick a worry. Get one tiny thing to do today. Come back and say what happened.</p>' +
        '<button class="big pulse" id="go">Pick a worry <span aria-hidden="true">→</span></button>' +
        waitingBlock() +
        '<p class="tiny"><button id="doors">Not sure which? Start from what’s going on</button></p>' +
        '<p class="tiny">No account. No AI. Nothing leaves your phone.</p>' +
        (storageOk ? '' :
          '<p class="tiny">This browser won’t let BETR remember anything — a private window usually does that. ' +
          'The loop still works; nothing will be here tomorrow.</p>') +
      '</div>');
    on('#go', function () { S.filter = null; go('pick'); });
    on('#doors', function () { go('doors'); });
    wireWaiting();
  }

  function doors() {
    paint( backButton() +
      '<div class="stage">' +
        '<h2>What’s going on?</h2>' +
        '<p class="sub">' + esc(DOORS.intro) + '</p>' +
        '<div class="list">' +
          DOORS.items.map(function (d) {
            return '<button data-door="' + esc(d.id) + '">' +
              '<span>' + esc(d.label) + '<span class="under">' + esc(d.under) + '</span></span>' +
              '<span class="go" aria-hidden="true">→</span></button>';
          }).join('') +
        '</div>' +
        '<p class="tiny">' + esc(DOORS.foot) + ' None of these is a diagnosis, and Betr never decides which one you are.</p>' +
      '</div>');
    wireBack('start');
    qa('[data-door]').forEach(function (b) {
      b.onclick = function () { S.filter = b.getAttribute('data-door'); go('pick'); };
    });
  }

  function pick() {
    var list = worriesFor(S.filter);
    paint( backButton() +
      '<div class="stage">' +
        '<h2>Which one?</h2>' +
        '<p class="sub">Tap the one that’s closest.</p>' +
        '<div class="list">' +
          list.map(function (f) {
            return '<button data-id="' + esc(f.id) + '"><span>' + esc(f.label) + '</span>' +
              '<span class="go" aria-hidden="true">→</span></button>';
          }).join('') +
          '<button class="own" id="own"><span>Something else</span><span class="go" aria-hidden="true">→</span></button>' +
        '</div>' +
        (S.filter
          ? '<p class="tiny"><button id="all">Show all ' + WORRIES.length + '</button></p>'
          : '<p class="tiny"><button id="doors">Not sure which? Start from what’s going on</button></p>') +
        '<p class="tiny">Not here on purpose: anything that tests the drink, the screen or the habit ' +
        'itself. Those aren’t tests. We test the worry underneath.</p>' +
      '</div>');
    wireBack(S.filter ? 'doors' : 'start');
    qa('[data-id]').forEach(function (b) {
      b.onclick = function () { startFrom(content.byId(WORRIES, b.getAttribute('data-id'))); go('plan'); };
    });
    on('#all', function () { S.filter = null; go('pick'); });
    on('#doors', function () { go('doors'); });
    on('#own', function () { draft = { belief: 'If I ', test: '', drop: '' }; go('own-belief'); });
  }

  /* -------- a person's own entry: three screens, one box each. Never a form. -------- */

  /*
    A refusal is the one place in the loop where the crisis lines can appear, and it is the
    place they matter most: somebody has just typed a test about hurting themselves. The
    numbers in it are tappable for the same reason they are on Help.
  */
  function warnBlock() {
    return refusal ? '<div class="warn">' + callable(refusal) + '</div>' : '';
  }

  function ownScreen(opts) {
    paint( backButton() +
      '<div class="stage">' +
        '<h2>' + opts.title + '</h2>' +
        '<p class="sub tight">' + opts.sub + '</p>' +
        warnBlock() +
        '<textarea id="t" class="short" placeholder="' + esc(opts.placeholder) + '">' + esc(opts.value) + '</textarea>' +
        '<button class="big wide" id="next">Next</button>' +
      '</div>');
    wireBack(opts.back);
    var t = q('#t');
    t.focus();
    t.setSelectionRange(t.value.length, t.value.length);
    on('#next', function () { opts.next(t.value); });
  }

  function ownBelief() {
    ownScreen({
      back: 'pick',
      title: 'What do you think will happen?',
      sub: 'One sentence, starting “If I…”. It has to be something that could turn out to be wrong.',
      placeholder: 'If I ask for a day off, my boss will think I’m not committed.',
      value: draft.belief,
      next: function (v) {
        draft.belief = v;
        var check = guards.checkBelief(v);
        if (!check.ok) { refusal = check.reason; render(); return; }
        go('own-test');
      }
    });
  }

  function ownTest() {
    ownScreen({
      back: 'own-belief',
      title: 'What will you do?',
      sub: 'One thing, today. Small, cheap, and entirely up to you.',
      placeholder: 'Ask for Friday off, in one sentence, with no reason given.',
      value: draft.test,
      next: function (v) {
        draft.test = v;
        var check = guards.checkTest(v);
        if (!check.ok) { refusal = check.reason; render(); return; }
        go('own-drop');
      }
    });
  }

  function ownDrop() {
    ownScreen({
      back: 'own-test',
      title: 'What will you leave out?',
      sub: 'The thing you’d normally do to take the edge off it. Leaving it out is what makes it a test.',
      placeholder: 'Don’t explain why. Don’t offer to make the time up.',
      value: draft.drop,
      next: function (v) {
        draft.drop = v;
        var check = guards.checkTest(v);
        if (!check.ok) { refusal = check.reason; render(); return; }
        S.cur = {
          source: 'own', id: null, label: 'Your own',
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
        '<div class="kicker">Here’s your test</div>' +
        '<div class="plan">' +
          '<p class="lbl">Today</p>' +
          '<p class="do">' + esc(c.test) + '</p>' +
          '<p class="line"><b>' + esc(c.drop) + '</b> That’s the bit that makes it count.</p>' +
          '<p class="lbl">What you expect</p>' +
          (c.editing
            ? '<textarea id="x" class="short">' + esc(c.x) + '</textarea><button class="edit" id="xdone">Done</button>'
            : '<p class="expect">' + esc(c.x) + '</p><button class="edit" id="xedit">Not quite? Change it</button>') +
        '</div>' +
        '<button class="big wide" id="lock">I’ll do it today</button>' +
        '<p class="tiny">That locks in what you expect, so later you can’t talk yourself out of ' +
        'what actually happened.</p>' +
      '</div>');
    /* Back goes where they actually came from, not back into a half-finished entry. */
    wireBack(c.from || 'pick');
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
        '<div class="kicker">Locked in</div>' +
        '<h2>Go and do it.</h2>' +
        '<p class="sub">' + esc(c.test) + '<br><b>' + esc(c.drop) + '</b></p>' +
        (c.missed
          ? '<div class="note">No problem. It’s still here for tomorrow. Smaller counts, too.</div>'
          : '') +
        (offerInstall ? installBlock() : '') +
        '<button class="big wide" id="done">Done it. Here’s what happened</button>' +
        '<p class="tiny"><button id="miss">Didn’t get to it</button></p>' +
      '</div>');
    on('#done', function () { go('happened'); });
    on('#miss', function () { S.cur.missed = true; save(); render(); });
    wireInstall();
  }

  function happened() {
    paint( backButton() +
      '<div class="stage">' +
        '<h2>What happened?</h2>' +
        '<p class="sub">Just what they said or did. No verdict.</p>' +
        '<textarea id="o" placeholder="He said “fair enough” and got his own coffee."></textarea>' +
        '<button class="big wide" id="next">Next</button>' +
      '</div>');
    wireBack('locked');
    var o = q('#o');
    o.value = S.cur.o || '';
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
        '<h2>Still think that’s what happens?</h2>' +
        '<p class="sub tight">“' + esc(c.belief) + '”</p>' +
        '<div class="ladder one">' + rung(tested ? 'Last time' : 'Started', at, '') + '</div>' +
        '<div class="choices">' +
          rate.CHOICES.filter(function (ch) { return !ch.quiet; }).map(function (ch) {
            return '<button data-key="' + esc(ch.key) + '">' + esc(ch.label) + '</button>';
          }).join('') +
        '</div>' +
        '<p class="tiny"><button data-key="more">More sure than before</button></p>' +
      '</div>');
    wireBack('happened');
    qa('[data-key]').forEach(function (b) {
      b.onclick = function () {
        var ch = rate.byKey(b.getAttribute('data-key'));
        S.done.push({
          id: c.id, source: c.source, label: c.label, belief: c.belief,
          x: c.x, test: c.test, drop: c.drop, o: c.o,
          level: rate.next(at, ch.key), rateLabel: ch.label,
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

    paint(
      '<div class="stage">' +
        '<div class="kicker">' + esc(last.label) + '</div>' +
        '<div class="result">' +
          '<p class="lbl">You expected</p>' +
          '<p class="you">' + esc(last.x) + '</p>' +
          '<p class="lbl">What actually happened</p>' +
          '<p class="real">' + esc(last.o) + '</p>' +
        '</div>' +
        '<div class="board">' +
          '<p class="lbl">How sure you are it goes badly</p>' +
          ladder(g) +
          (g.tests > 1 && g.level < rate.TOP
            ? '<p class="moved">Down ' + (rate.TOP - g.level) + ' since you started.</p>' : '') +
        '</div>' +
        '<div class="count">' + n + '</div>' +
        '<p class="sub">' + (n === 1
          ? 'One test done. The second one is where it starts to stick.'
          : n + ' tests done. Same worry, different day, keeps working.') + '</p>' +
        '<div class="row">' +
          '<button class="big" id="again">Do it again tomorrow</button>' +
          '<button class="ghost" id="other">Different worry</button>' +
        '</div>' +
      '</div>');

    on('#again', function () { again(last, 'result'); });
    on('#other', function () { S.filter = null; go('pick'); });
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
    if (!groups.length && !S.open.length) { go('pick'); return; }
    var n = S.done.length;

    /*
      One card per belief. A test that is waiting sits on the card for its own belief, and a
      belief you have started but never finished gets a card of its own, at the top. Nothing
      is combined across cards, and nothing is ordered by how long it has been waiting.
    */
    var cards = groups.map(function (g) {
      return { key: g.key, g: g, label: g.label, belief: g.belief, open: [] };
    });
    S.open.forEach(function (t) {
      var k = rate.keyOf(t);
      var card = null;
      cards.forEach(function (c) { if (c.key === k) card = c; });
      if (!card) {
        card = { key: k, g: null, label: t.label, belief: t.belief, open: [] };
        cards.unshift(card);
      }
      card.open.push(t);
    });

    paint( backButton() +
      '<div class="stage">' +
        '<h2>Your worries</h2>' +
        '<p class="sub">' + (n
          ? n + ' test' + (n === 1 ? '' : 's') + ' across ' +
            groups.length + ' worr' + (groups.length === 1 ? 'y' : 'ies') + '. Tap one to test it again.'
          : 'What you’ve got on the go. Nothing recorded yet.') + '</p>' +
        cards.map(function (c) {
          return '<div class="card">' +
            '<div class="kicker">' + esc(c.label) + '</div>' +
            '<p class="belief">“' + esc(c.belief) + '”</p>' +
            (c.g
              ? ladder(c.g, { said: true })
              : '<div class="ladder">' + rung('Started', rate.TOP, '') + '</div>') +
            c.open.map(function (t) {
              var i = S.open.indexOf(t);
              return '<div class="waiting">' +
                '<p class="lbl">On the go</p>' +
                '<p class="do">' + esc(t.test) + '</p>' +
                (t.missed ? '<p class="soft">No problem. It’s still here for tomorrow. Smaller counts, too.</p>' : '') +
                '<div class="row">' +
                  '<button class="ghost" data-did="' + i + '">Done it</button>' +
                  '<button class="ghost" data-notyet="' + i + '">Didn’t get to it</button>' +
                '</div>' +
              '</div>';
            }).join('') +
            (c.g ? '<button class="ghost" data-again="' + groups.indexOf(c.g) + '">Test this again</button>' : '') +
          '</div>';
        }).join('') +
        '<p class="tiny">Each one is its own. Nothing here is added up, and there is no target.</p>' +
      '</div>');

    wireBack('start');
    qa('[data-again]').forEach(function (b) {
      b.onclick = function () { again(groups[Number(b.getAttribute('data-again'))].last, 'mine'); };
    });
    qa('[data-did]').forEach(function (b) {
      b.onclick = function () { resume(S.open[Number(b.getAttribute('data-did'))], 'happened'); };
    });
    /* Not getting to it costs nothing and changes nothing. It stays exactly where it is. */
    qa('[data-notyet]').forEach(function (b) {
      b.onclick = function () {
        var t = S.open[Number(b.getAttribute('data-notyet'))];
        if (t) { t.missed = true; save(); render(); }
      };
    });
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
      '<b>Add this to your home screen.</b> Safari wipes a web page’s saved answers after a ' +
      'week or so of not opening it. On the home screen it stays.' +
      (installEvent
        ? '<div class="row"><button class="ghost" id="install">Add it</button>' +
          '<button class="ghost" id="nothanks">Not now</button></div>'
        : '<div class="row"><span class="tiny">Share → Add to Home Screen.</span>' +
          '<button class="ghost" id="nothanks">Got it</button></div>') +
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
      5. who made this, and the code

    Nothing on this screen is fetched. A link is inert until a person taps it, and then it is
    their browser going there — no favicon, no preview, no availability check, nothing counted.
    Turn wifi off and this screen still reads correctly, which is the proof that holds.
  */
  function help() {
    var build = document.querySelector('meta[name="betr-build"]');
    var hash = build ? build.getAttribute('content') : 'dev';

    paint( backButton() +
      '<div class="stage"><div class="sheet">' +

        '<h3>If you are in danger or in crisis</h3>' +
        '<p>' + callable(CRISIS) + '</p>' +

        /*
          The primer. Founder, 2026-09-03: there should be one clear thing to read about CBT,
          before the small print. It sits second, under the crisis lines and above everything
          else, and it is written fresh — not a word of it comes from CCI, Getselfhelp,
          Therapist Aid, Psychology Tools or the Beck Institute (rule 8). It explains and it
          points; it claims nothing the nine sentences below do not already say.
        */
        '<h3>What CBT is, and which bit of it this is</h3>' +
        '<div class="primer">' +
          '<p>CBT is a talking therapy. Its plainest idea is this: what you expect to happen ' +
          'decides what you do, and staying away from the thing keeps the expectation safe. ' +
          'You never find out you were wrong, so you stay sure.</p>' +
          '<p>The <b>behavioural experiment</b> is the part of CBT that finds out. You write ' +
          'down what you think will happen. You do one small thing. Then you write down what ' +
          'actually happened — not what it meant, just what was said or done. Beliefs move ' +
          'when the evidence is yours and you collected it yourself.</p>' +
          '<p>BETR is that one part, and nothing else. It doesn’t ask how your week has been, ' +
          'doesn’t score you, doesn’t decide anything about you, and can’t see any of it. ' +
          'A therapist does far more than this, and if you can see one, please do. This is ' +
          'the piece you can do on your own, today, in about a minute.</p>' +
          '<p>Written by us. If you want it from people who aren’t us:</p>' +
          '<ul class="places">' + PLACES.reading.map(function (r) {
            return '<li><a href="' + esc(r.url) + '" target="_blank" rel="noopener noreferrer">' +
              esc(r.name) + '</a> — ' + esc(r.what) + '</li>';
          }).join('') + '</ul>' +
        '</div>' +

        '<h3>What this is</h3>' +
        '<p>' + esc(PURPOSE) + '</p>' +
        '<ol>' + SENTENCES.map(function (t) { return '<li>' + callable(t) + '</li>'; }).join('') + '</ol>' +

        '<h3>Don’t take our word for it</h3>' +
        '<p>Turn on airplane mode. Everything still works, because nothing here ever needed ' +
        'the internet. Loading this page is the only thing any server ever sees, and we keep ' +
        'no record of it.</p>' +
        '<div class="proof">' +
          '<span><b>' + S.done.length + '</b><small>results on this phone</small></span>' +
          '<span><b>0</b><small>accounts</small></span>' +
          '<span><b>0 B</b><small>sent to us, ever</small></span>' +
        '</div>' +
        '<p><button class="plain" id="export">Export everything</button>' +
        '<button class="plain" id="wipe">Delete everything</button></p>' +
        '<div id="io"></div>' +

        '<h3>Other places, none of them run by us</h3>' +
        '<p>' + esc(PLACES.intro) + '</p>' +
        PLACES.groups.map(function (grp) {
          return '<h4>' + esc(grp.title) + '</h4>' +
            '<ul class="places">' + grp.items.map(function (place) {
              return '<li><a href="' + esc(place.url) + '" target="_blank" rel="noopener noreferrer">' +
                esc(place.name) + '</a> — ' + esc(place.what) + '</li>';
            }).join('') + '</ul>';
        }).join('') +

        '<h3>Who made this</h3>' +
        '<p>This is for doing it alone. The people who made it also make TrybeUP, where the ' +
        'same thing is done in small private groups. Only if and when you want that.</p>' +

        '<h3>The code</h3>' +
        '<p>BETR is plain HTML, CSS and JavaScript with no libraries, small enough to read in ' +
        'an evening. This build:</p>' +
        '<p class="build">' + (hash === 'dev' ? 'Dev build — not published' : esc(hash)) + '</p>' +

      '</div></div>');

    wireBack('start');
    on('#export', showExport);
    on('#wipe', armDelete);
  }

  function showExport() {
    var json = storeLib.exportJSON(S);
    var io = q('#io');
    io.innerHTML =
      '<p><button class="plain" id="copy">Copy it</button>' +
      (navigator.share ? '<button class="plain" id="share">Send it somewhere</button>' : '') +
      '</p><textarea id="dump" readonly></textarea>';
    q('#dump').value = json;
    on('#copy', function () {
      var t = q('#dump');
      t.select();
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(json);
        else document.execCommand('copy');
      } catch (e) { /* the text is selected either way; the person can copy it themselves */ }
      q('#copy').textContent = 'Copied';
    });
    on('#share', function () {
      /* The OS share sheet. It goes where the person sends it, and nowhere else. */
      try {
        var p = navigator.share({ title: 'BETR', text: json });
        if (p && p.catch) p.catch(function () { /* dismissed */ });
      } catch (e) { /* dismissed */ }
    });
  }

  function armDelete() {
    var io = q('#io');
    if (!deleteArmed) {
      deleteArmed = true;
      io.innerHTML = '<div class="warn">Delete everything on this phone? There is no copy ' +
        'anywhere else, and we cannot get it back for you.' +
        '<div class="row"><button class="ghost" id="yes">Delete it all</button>' +
        '<button class="ghost" id="no">Keep it</button></div></div>';
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

  render();
})();
