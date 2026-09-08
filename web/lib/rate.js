/*
  The re-rate, and the ladder it moves along.

  Five words, not a 0–100 slider. The slider was the single most "learn this first" element of
  every rejected prototype; five words are the same re-rating with nothing to learn.

  What changed on 2026-09-02, and why. The words are relative — "a bit less sure" only means
  anything next to where you were — but they used to be stored as fixed values (80/55/30/10).
  So tapping "a bit less sure" three days running recorded the same number three times, and
  the one thing a person is actually doing this for, watching the belief lose its grip, could
  not show up anywhere. Now each tap MOVES the belief down a ten-rung ladder from where it
  already was, which is what the words were always saying.

  Everything starts at 10, because that is the premise on the front screen: you are sure it
  will go badly. Nothing ever goes below 1; a belief you have stopped buying is not a zero.

  What this must never become (founder, 2026-09-02): a score of the person, an average across
  worries, a total, a trend line, a target, or anything that reads as a grade. It is one
  belief's grip, shown next to the days you tested it, and nothing else.
*/
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else (root.Betr = root.Betr || {}).rate = api;
})(typeof self !== 'undefined' ? self : this, function () {

  var TOP = 10;    /* where every belief starts: completely sure it goes badly */
  var FLOOR = 1;   /* "not sure at all" still leaves a rung. Nobody is at zero */

  /*
    quiet: true is the honest option that must be available and must not be prominent. A test
    can go badly and leave someone more convinced; refusing to record that would make the
    ladder a nicer story than the person's week. It sits small, under the four, in the same
    place "didn't get to it" sits on the locked screen.

    The words themselves are not here since B15 — they are `rate.<key>` in
    web/content/strings-en.js, so they can be translated. This file holds how far each one
    moves the belief, which is the part that must be the same in every language.
  */
  var CHOICES = [
    { key: 'still', step: 0 },
    { key: 'bit', step: -1 },
    { key: 'lot', step: -3 },
    { key: 'none', to: FLOOR },
    { key: 'more', step: 1, quiet: true }
  ];

  function byKey(key) {
    for (var i = 0; i < CHOICES.length; i++) if (CHOICES[i].key === key) return CHOICES[i];
    return null;
  }

  function clamp(n) {
    if (typeof n !== 'number' || n !== n) return TOP;
    n = Math.round(n);
    return n < FLOOR ? FLOOR : (n > TOP ? TOP : n);
  }

  /* Where the belief sits after this tap. An unknown key moves nothing. */
  function next(level, key) {
    var from = clamp(level);
    var c = byKey(key);
    if (!c) return from;
    if (typeof c.to === 'number') return clamp(c.to);
    return clamp(from + c.step);
  }

  /*
    Which results belong to the same belief.

    A stock item is its id, so a corrected wording in the list keeps the person's ladder.

    A test a person built is ITS OWN ID too, since B30 (2026-09-08). It used to be the
    sentence, on the reasoning that a different sentence is a different belief — true, and it
    also meant that fixing a typo the next day looked exactly like losing your history. A
    person editing three words of their own sentence has not started a new belief, and on the
    main road that happens constantly. Editing the sentence into something genuinely different
    is a NEW test, made at the build screen with a new id, which is the same answer arrived at
    honestly.

    An own record made before B30 has no id and falls back to its sentence, exactly as it did
    — which is why v4 needed no migration. Do not "tidy" the fallback away; it is somebody's
    ladder.
  */
  function keyOf(d) {
    if (!d) return 'stock:';
    if (d.source === 'own') return 'own:' + (d.id || d.belief || '');
    return 'stock:' + (d.id || d.label || '');
  }

  /*
    Oldest first by the clock, not by where a result happens to sit in the array (B9).

    They are the same thing today, because the only thing that ever appends to `done` is a
    person finishing a test. They stop being the same thing the moment two devices' histories
    are put together, or a file is re-imported, and then the ladder would quietly draw itself
    wrong. Array position is the tie-break, so two results in the same millisecond stay in the
    order they were made, and a record with no clock at all keeps its place at the end.
  */
  function inTimeOrder(done) {
    var held = (done || []).map(function (d, i) { return { d: d, i: i }; });
    held.sort(function (a, b) {
      var x = a.d && a.d.when ? String(a.d.when) : '';
      var y = b.d && b.d.when ? String(b.d.when) : '';
      if (x === y) return a.i - b.i;
      if (!x) return 1;
      if (!y) return -1;
      return x < y ? -1 : 1;
    });
    return held.map(function (h) { return h.d; });
  }

  /*
    The rungs of one belief, in order.

    Where every result says which word was tapped, the ladder IS those taps replayed from the
    top — so it comes out the same however the results arrived, which is what makes two
    histories joinable at all (B9). Where any result in the ladder was made before the word
    was written down, the whole ladder falls back to the rung each result stored at the time,
    and draws exactly what it drew the day before. Half replayed and half stored would be a
    ladder that is neither.
  */
  function rungsFor(results) {
    var replay = true;
    for (var i = 0; i < results.length; i++) if (!byKey(results[i].move)) replay = false;
    if (!replay) return results.map(function (r) { return clamp(r.level); });
    var here = TOP;
    return results.map(function (r) { here = next(here, r.move); return here; });
  }

  /*
    The results, grouped into one ladder per belief, oldest tap first inside each group and
    most recently tested group first. Nothing is added up across groups, on purpose.
  */
  function series(done) {
    var out = [];
    var index = {};
    inTimeOrder(done).forEach(function (d, i) {
      var k = keyOf(d);
      var g = index[k];
      if (!g) { g = index[k] = { key: k, id: d.id, source: d.source, results: [] }; out.push(g); }
      /* The newest wording wins, so a rewritten stock item is not quoted two ways at once. */
      g.label = d.label;
      g.belief = d.belief;
      g.newest = i;
      g.results.push(d);
    });
    out.forEach(function (g) {
      g.last = g.results[g.results.length - 1];
      g.tests = g.results.length;
      g.rungs = rungsFor(g.results);
      g.level = g.rungs[g.rungs.length - 1];
    });
    /* Most recently tested first, not first started: the one you are working on is at the top. */
    return out.sort(function (a, b) { return b.newest - a.newest; });
  }

  /* Where a belief already sits, before this test is rated. Unknown means the top. */
  function levelFor(done, item) {
    var k = keyOf(item);
    var mine = inTimeOrder(done).filter(function (d) { return keyOf(d) === k; });
    if (!mine.length) return TOP;
    var rungs = rungsFor(mine);
    return rungs[rungs.length - 1];
  }

  return {
    TOP: TOP, FLOOR: FLOOR, CHOICES: CHOICES,
    byKey: byKey, clamp: clamp, next: next,
    keyOf: keyOf, series: series, levelFor: levelFor,
    inTimeOrder: inTimeOrder, rungsFor: rungsFor
  };
});
