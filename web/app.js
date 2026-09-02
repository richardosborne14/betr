/*
  Betr v1 — the whole app.

  Seven screens for the loop (start, pick, test, locked, happened, sure, result), plus the
  second door, the three screens for a person's own entry, and "what this is". Four taps and
  one sentence gets you all the way round.

  Things that are deliberate and should not be "fixed":
    - no streak, no red day, no "you missed", no cap on rest. The only number is completed tests
    - no verdict anywhere. A bad outcome is data, and the re-rate is optional in spirit
    - no 0-100 slider. Four words, mapped to numbers the person never sees
    - the expectation is locked when the person taps "I'll do it today", and is read-only after
    - no console.log, no analytics, no crash reporter, no request of any kind after load
*/
(function () {
  'use strict';

  var guards = Betr.guards;
  var rate = Betr.rate;
  var storeLib = Betr.store;
  var content = Betr.content;
  var FEARS = Betr.fears;
  var DOORS = Betr.doors;

  /*
    The purpose statement. Rule: identical in the app, the manifest, the store listing and
    every post (research §5.4 — MHRA's worked example is a product that said one thing on its
    site and another on social). If you change it here, change it in index.html's <meta
    name="description">, manifest.webmanifest, and everywhere it has ever been published.
  */
  var PURPOSE = 'Betr helps you test unhelpful beliefs in everyday life. You pick a fear ' +
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

  function go(stage) {
    refusal = null;
    S.stage = stage;
    save();
    render();
    window.scrollTo(0, 0);
  }

  function q(sel) { return app.querySelector(sel); }
  function qa(sel) { return Array.prototype.slice.call(app.querySelectorAll(sel)); }
  function on(sel, fn) { var el = q(sel); if (el) el.onclick = fn; return el; }

  function fearsFor(doorId) {
    if (!doorId) return FEARS;
    var door = null;
    for (var i = 0; i < DOORS.items.length; i++) if (DOORS.items[i].id === doorId) door = DOORS.items[i];
    if (!door) return FEARS;
    return door.fears.map(function (id) { return content.byId(FEARS, id); }).filter(Boolean);
  }

  function startFrom(f) {
    S.cur = {
      source: 'stock', id: f.id, label: f.label, belief: f.belief,
      x: f.expect, test: f.test, drop: f.drop,
      from: 'pick', editing: false, locked: null, missed: false
    };
  }

  function backButton() {
    return '<button class="back" id="back">← back</button>';
  }
  function wireBack(target) { on('#back', function () { go(target); }); }

  /* ---------------------------------------------------------------- screens */

  function render() {
    var map = {
      start: start, doors: doors, pick: pick,
      'own-belief': ownBelief, 'own-test': ownTest, 'own-drop': ownDrop,
      plan: plan, locked: locked, happened: happened, sure: sure,
      result: result, about: about
    };
    /* Any half-finished loop that lost its item drops back to the start rather than crashing. */
    var needsCur = ['plan', 'locked', 'happened', 'sure'];
    if (needsCur.indexOf(S.stage) !== -1 && !S.cur) S.stage = 'start';
    (map[S.stage] || start)();
  }

  function start() {
    var n = S.done.length;
    app.innerHTML =
      '<div class="stage">' +
        '<div class="kicker">Betr</div>' +
        '<h1>Sure it’ll go badly?</h1>' +
        '<p class="sub">Pick a fear. Get one tiny thing to do today. Come back and say what happened.</p>' +
        '<button class="big pulse" id="go">Pick a fear <span aria-hidden="true">→</span></button>' +
        '<p class="tiny"><button id="doors">Not sure which? Start from what’s going on</button></p>' +
        '<p class="tiny">No account. No AI. Nothing leaves your phone.' +
          (n ? ' · <button id="hist">' + n + ' result' + (n === 1 ? '' : 's') + '</button>' : '') +
          ' · <button id="about">what this is</button></p>' +
        (storageOk ? '' :
          '<p class="tiny">This browser won’t let Betr remember anything — a private window usually does that. ' +
          'The loop still works; nothing will be here tomorrow.</p>') +
      '</div>';
    on('#go', function () { S.filter = null; go('pick'); });
    on('#doors', function () { go('doors'); });
    on('#about', function () { go('about'); });
    on('#hist', function () { go('result'); });
  }

  function doors() {
    app.innerHTML = backButton() +
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
      '</div>';
    wireBack('start');
    qa('[data-door]').forEach(function (b) {
      b.onclick = function () { S.filter = b.getAttribute('data-door'); go('pick'); };
    });
  }

  function pick() {
    var list = fearsFor(S.filter);
    app.innerHTML = backButton() +
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
        (S.filter ? '<p class="tiny"><button id="all">Show all ' + FEARS.length + '</button></p>' : '') +
        '<p class="tiny">Not here on purpose: anything that tests the drink, the screen or the habit ' +
        'itself. Those aren’t tests. We test the fear underneath.</p>' +
      '</div>';
    wireBack(S.filter ? 'doors' : 'start');
    qa('[data-id]').forEach(function (b) {
      b.onclick = function () { startFrom(content.byId(FEARS, b.getAttribute('data-id'))); go('plan'); };
    });
    on('#all', function () { S.filter = null; go('pick'); });
    on('#own', function () { draft = { belief: 'If I ', test: '', drop: '' }; go('own-belief'); });
  }

  /* -------- a person's own entry: three screens, one box each. Never a form. -------- */

  function warnBlock() {
    return refusal ? '<div class="warn">' + esc(refusal) + '</div>' : '';
  }

  function ownScreen(opts) {
    app.innerHTML = backButton() +
      '<div class="stage">' +
        '<h2>' + opts.title + '</h2>' +
        '<p class="sub tight">' + opts.sub + '</p>' +
        warnBlock() +
        '<textarea id="t" class="short" placeholder="' + esc(opts.placeholder) + '">' + esc(opts.value) + '</textarea>' +
        '<button class="big wide" id="next">Next</button>' +
      '</div>';
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
    app.innerHTML = backButton() +
      '<div class="stage">' +
        '<div class="kicker">Here’s your test</div>' +
        '<div class="plan">' +
          '<p class="lbl">Today</p>' +
          '<p class="do">' + esc(c.test) + '</p>' +
          '<p class="line"><b>' + esc(c.drop) + '</b> That’s the bit that makes it count.</p>' +
          '<p class="lbl">What you expect</p>' +
          (c.editing
            ? '<textarea id="x" class="short">' + esc(c.x) + '</textarea><button class="edit" id="xdone">done</button>'
            : '<p class="expect">' + esc(c.x) + '</p><button class="edit" id="xedit">not quite? change it</button>') +
        '</div>' +
        '<button class="big wide" id="lock">I’ll do it today</button>' +
        '<p class="tiny">That locks in what you expect, so later you can’t talk yourself out of ' +
        'what actually happened.</p>' +
      '</div>';
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
    app.innerHTML =
      '<div class="stage">' +
        '<div class="kicker">Locked in</div>' +
        '<h2>Go and do it.</h2>' +
        '<p class="sub">' + esc(c.test) + '<br><b>' + esc(c.drop) + '</b></p>' +
        (c.missed
          ? '<div class="note">No problem. It’s still here for tomorrow. Smaller counts, too.</div>'
          : '') +
        (offerInstall ? installBlock() : '') +
        '<button class="big wide" id="done">Done it. Here’s what happened</button>' +
        '<p class="tiny"><button id="miss">Didn’t get to it</button> · ' +
        '<button id="drop">Pick a different one</button></p>' +
      '</div>';
    on('#done', function () { go('happened'); });
    on('#miss', function () { S.cur.missed = true; save(); render(); });
    on('#drop', function () { S.cur = null; go('pick'); });
    wireInstall();
  }

  function happened() {
    app.innerHTML = backButton() +
      '<div class="stage">' +
        '<h2>What happened?</h2>' +
        '<p class="sub">Just what they said or did. No verdict.</p>' +
        '<textarea id="o" placeholder="He said “fair enough” and got his own coffee."></textarea>' +
        '<button class="big wide" id="next">Next</button>' +
      '</div>';
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

  function sure() {
    var c = S.cur;
    app.innerHTML = backButton() +
      '<div class="stage">' +
        '<h2>Still think that’s what happens?</h2>' +
        '<p class="sub">“' + esc(c.belief) + '”</p>' +
        '<div class="choices">' +
          rate.CHOICES.map(function (ch) {
            return '<button data-key="' + esc(ch.key) + '">' + esc(ch.label) + '</button>';
          }).join('') +
        '</div>' +
      '</div>';
    wireBack('happened');
    qa('[data-key]').forEach(function (b) {
      b.onclick = function () {
        var ch = rate.byKey(b.getAttribute('data-key'));
        S.done.push({
          id: c.id, source: c.source, label: c.label, belief: c.belief,
          x: c.x, test: c.test, drop: c.drop, o: c.o,
          rate: ch.value, rateLabel: ch.label,
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
    var earlier = S.done.slice(0, -1).reverse().map(function (d) {
      return '<div class="h">' +
        '<div class="e">' + esc(d.x) + '</div>' +
        '<div class="r">' + esc(d.o) + '</div>' +
        '<div class="meta">' + esc(d.label) + ' · ' + esc(String(d.rateLabel || '').toLowerCase()) + '</div>' +
      '</div>';
    }).join('');

    app.innerHTML =
      '<div class="stage">' +
        '<div class="kicker">' + esc(last.label) + '</div>' +
        '<div class="result">' +
          '<p class="lbl">You expected</p>' +
          '<p class="you">' + esc(last.x) + '</p>' +
          '<p class="lbl">What actually happened</p>' +
          '<p class="real">' + esc(last.o) + '</p>' +
        '</div>' +
        '<div class="count">' + n + '</div>' +
        '<p class="sub">' + (n === 1
          ? 'One test done. The second one is where it starts to stick.'
          : n + ' tests done. Same fear, different day, keeps working.') + '</p>' +
        '<div class="row">' +
          '<button class="big" id="again">Do it again tomorrow</button>' +
          '<button class="ghost" id="other">Different fear</button>' +
        '</div>' +
        (earlier ? '<div class="history"><p class="tiny head">Earlier</p>' + earlier + '</div>' : '') +
        '<p class="tiny"><button id="home">home</button> · <button id="about">what this is</button></p>' +
      '</div>';

    on('#again', function () {
      S.cur = {
        source: last.source, id: last.id, label: last.label, belief: last.belief,
        x: last.x, test: testFor(last), drop: dropFor(last),
        from: 'result', editing: false, locked: null, missed: false
      };
      go('plan');
    });
    on('#other', function () { S.filter = null; go('pick'); });
    on('#home', function () { go('start'); });
    on('#about', function () { go('about'); });
  }

  /*
    Repeating a test. A stock item is looked up fresh, so a corrected wording in fears.js
    reaches everyone who repeats it, including anyone whose old result still quotes the
    wording it had before. A person's own test falls back to what they wrote.
  */
  function testFor(d) {
    var f = d.id ? content.byId(FEARS, d.id) : null;
    return f ? f.test : (d.test || '');
  }
  function dropFor(d) {
    var f = d.id ? content.byId(FEARS, d.id) : null;
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

  /* ---------------------------------------------------------------- what this is */

  function about() {
    var build = document.querySelector('meta[name="betr-build"]');
    var hash = build ? build.getAttribute('content') : 'dev';

    app.innerHTML = backButton() +
      '<div class="stage"><div class="sheet">' +

        '<h3>Don’t take our word for it</h3>' +
        '<p>Turn on airplane mode. Everything still works, because nothing here ever needed ' +
        'the internet. Loading this page is the only thing any server ever sees, and we keep ' +
        'no record of it.</p>' +
        '<div class="proof">' +
          '<span><b>' + S.done.length + '</b><small>results on this phone</small></span>' +
          '<span><b>0</b><small>accounts</small></span>' +
          '<span><b>0 B</b><small>sent to us, ever</small></span>' +
        '</div>' +
        '<p><button class="plain" id="export">export everything</button>' +
        '<button class="plain" id="wipe">delete everything</button></p>' +
        '<div id="io"></div>' +

        '<h3>What this is</h3>' +
        '<p>' + esc(PURPOSE) + '</p>' +
        '<ol>' + SENTENCES.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ol>' +

        '<h3>If you are in danger or in crisis</h3>' +
        '<p>' + esc(CRISIS) + '</p>' +

        '<h3>When you want to do this with people who don’t know you</h3>' +
        '<p>This is for doing it alone. The people who made it also make TrybeUP, where the ' +
        'same thing is done in small private groups. Only if and when you want that.</p>' +

        '<h3>The code</h3>' +
        '<p>Betr is plain HTML, CSS and JavaScript with no libraries, small enough to read in ' +
        'an evening. This build:</p>' +
        '<p class="build">' + (hash === 'dev' ? 'dev build — not published' : esc(hash)) + '</p>' +

      '</div></div>';

    wireBack('start');
    on('#export', showExport);
    on('#wipe', armDelete);
  }

  function showExport() {
    var json = storeLib.exportJSON(S);
    var io = q('#io');
    io.innerHTML =
      '<p><button class="plain" id="copy">copy it</button>' +
      (navigator.share ? '<button class="plain" id="share">send it somewhere</button>' : '') +
      '</p><textarea id="dump" readonly></textarea>';
    q('#dump').value = json;
    on('#copy', function () {
      var t = q('#dump');
      t.select();
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(json);
        else document.execCommand('copy');
      } catch (e) { /* the text is selected either way; the person can copy it themselves */ }
      q('#copy').textContent = 'copied';
    });
    on('#share', function () {
      /* The OS share sheet. It goes where the person sends it, and nowhere else. */
      try {
        var p = navigator.share({ title: 'Betr', text: json });
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
