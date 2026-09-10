/*
  The rules the content has to pass, in one place, so the tests and the app check the same
  thing. B1 will replace the words in web/content/*.js; it may not replace these rules.
*/
(function (root, factory) {
  var api = factory(
    (typeof module === 'object' && module.exports) ? require('./guards.js')
      : (root.Betr && root.Betr.guards)
  );
  if (typeof module === 'object' && module.exports) module.exports = api;
  else (root.Betr = root.Betr || {}).content = api;
})(typeof self !== 'undefined' ? self : this, function (guards) {

  var LANES = ['social', 'assertiveness', 'perfectionism', 'urge-timing', 'rest', 'sleep'];
  /* The parts of a worry that are one sentence each. `beliefs` is the eighth and is a
     list, so checkBeliefs() below is what holds it to its own shape. */
  var FIELDS = ['id', 'label', 'belief', 'test', 'drop', 'lane'];

  /*
    B20. Three beliefs a person chooses between, and the number is not arbitrary.

    One was wrong. Test users read the single "If I ___, then ___" a worry used to carry and
    said it sort of matched their worry and not really — because one sentence per worry has
    to guess which consequence the person is actually afraid of, and that guess was wrong
    about as often as it was right. More than three would be a list to weigh up, and weighing
    up a list is the thing the doors exist to stop (B19). Three, plus "put it my own way",
    is a choice a person makes on sight.

    A belief is two fields and no third, for the same reason a place on the Help screen has
    three and an explanation has two: there is nowhere to hang a lane, a condition or a
    second version, so which sentence a person reads can never be decided for them by
    anything they entered (research §5.2).
  */
  var BELIEFS_PER_WORRY = 3;
  var BELIEF_FIELDS = ['belief', 'expect'];

  /*
    B42, 2026-09-09. THREE SIZES: the dial, as content rather than as a control.

    A worry may carry `sizes` — three, in the order small to big, each one a name and the two
    sentences that go with it:

      sizes: [ { name: 'A small go', do: 'Say no to {person} once today…',
                                     drop: 'Don’t give a reason.' }, … ]

    They are the founder's small / medium / big (B36 item 8) arriving as three concrete
    sentences instead of three abstract sizes, which is better: a rung you can read is a rung
    you can pick. Tapping one fills BOTH boxes, because a size is a do and a leave-out
    together — a big go with a small leave-out is not a bigger test, it is a different one.

    THREE, ALWAYS, AND THE RULES BELOW ARE WHY THIS FILE COUNTS THEM.

    - No rung is ever offered BECAUSE a previous one went well, and none is ever taken away.
      Availability that depended on what somebody had already done would be the app choosing
      (rule 2), and it would be a score of the person besides.
    - NO NUMBER ON A SIZE, EVER, and that is checked here rather than left to good manners:
      a digit in a name is a level, and a level is a point. B36 §9 — 38 studies and 8,110
      people, and gamification predicted neither the outcome nor whether anybody kept going.
    - A size is three fields and no fourth, for the reason a belief is two and a place is
      three (research §5.2): with nowhere to hang a lane or a condition, which size a person
      is offered can never be decided for them by anything they have entered or done.

    WHAT THIS FILE CANNOT CHECK, AND THE REVIEWER HOLDS IT: that they are actually in order,
    smallest first. A list of three in the wrong order still validates and would hand somebody
    "The whole thing" under the heading of a small go.
  */
  var SIZES_PER_WORRY = 3;
  var SIZE_FIELDS = ['name', 'do', 'drop'];

  /*
    B41, 2026-09-09. A SKELETON: the if-half printed, with named holes a person fills in.

    A worry may carry `skeleton: { if: 'say no to {person} without giving a reason',
    holes: { person: 'somebody' } }`. The build screen prints those words and puts a small
    blank at each `{hole}`; what she types arrives in all three predictions, in the same
    breath, because they carry the same holes. Nothing chose anything and no model ran — it is
    a string substitution, and it is the closest thing to intelligence BETR is allowed to have
    (B37 §2).

    TWO RULES THIS FILE CANNOT CHECK, AND THE REVIEWER HOLDS BOTH.

    1. **BETR owns the verb. The person owns the nouns.** A hole takes a person, a thing, a
       place — NEVER a verb. Rule 4 did not loosen for BETR on 2026-09-08: a suggested test is
       BETR proposing, so the action has to be BETR's own content. Let a hole take a verb and
       somebody can compose a sentence BETR appears to be proposing, which is the single thing
       that rule exists to prevent.
    2. **A hole's default word has to read naturally EVERYWHERE its hole appears** — in the
       if-half and in all three predictions. It is what the sentence says while the blank is
       still empty, and nobody is walled for leaving one empty. "somebody" survives both
       "say no to somebody" and "somebody will think I'm being difficult"; "a person" does not.

    What this file DOES check is below, in checkSkeleton(): the shape, that every `{hole}`
    used is declared and every hole declared is used, that the assembled sentence still comes
    apart the way the build screen needs, and that the three predictions share the skeleton's
    if-half word for word — which is what makes the carry-through honest rather than a second
    sentence that happens to look like the first.

    HOLES ARE ALLOWED IN THE PLAN SINCE B42, 2026-09-09, and the ban that used to sit here is
    worth remembering rather than deleting. Until that day a `{hole}` in `test` or `drop` was
    refused, because the plan was pre-filled into the draft at the moment a worry was borrowed
    — before anybody had typed into a hole — so it would have printed as itself on somebody's
    phone. B42 moved that prefill to the screen the plan is actually written on, where the
    holes are known, and lifted the ban in the same breath. THE REFUSAL THAT REPLACED IT is
    below: a `{hole}` anywhere in a worry that has NO skeleton, which is the same bug with
    nothing to fill it from.
  */
  var SKELETON_FIELDS = ['if', 'holes'];
  var HOLE = /\{([a-z][a-z0-9]*)\}/g;

  /* Every hole named in a piece of text, in the order it appears, without repeats. */
  function holesIn(text) {
    var out = [];
    String(text == null ? '' : text).replace(HOLE, function (_, name) {
      if (out.indexOf(name) === -1) out.push(name);
      return _;
    });
    return out;
  }

  /*
    A skeleton's text with its holes filled in. `said` is what the person has typed, name to
    words; anything she has not filled in falls back to the hole's own default, so the sentence
    always reads and an empty blank never walls anybody. An unknown hole is left as it is
    rather than blanked, because a sentence with a visible `{oops}` in it is a bug somebody
    reports and a sentence with a gap in it is a bug nobody notices.
  */
  function fill(text, said, holes) {
    return String(text == null ? '' : text).replace(HOLE, function (whole, name) {
      var mine = said && typeof said[name] === 'string' ? said[name].trim() : '';
      if (mine) return mine;
      var fallback = holes && typeof holes[name] === 'string' ? holes[name] : '';
      return fallback || whole;
    });
  }

  /*
    B46, 2026-09-09. THE SAME SUBSTITUTION, TAKEN APART SO A SCREEN CAN SHOW IT.

    fill() returns a finished string, and until today that was the whole of it: a person typed
    "my sister" into one blank, three sentences underneath quietly became sentences about her
    sister, and NOTHING ON SCREEN SAID SO. The mechanic that the founder's canvas calls "the
    closest thing to intelligence BETR is allowed to have" was invisible at the one moment it
    could have explained itself.

    So this returns the same text as a list of pieces, each marked with whether it is a word
    the PERSON put there. The caller wraps those and nothing else.

      carried: true   she typed this, and it is appearing somewhere she did not type it
      carried: false  BETR's printed words, or a hole's own default word

    A DEFAULT IS NEVER CARRIED, and that is the line rather than a nicety. Highlighting
    "somebody" would tell a person they had said something they had not, on a screen whose only
    job is to show her her own words coming back — and it would make BETR's content look like
    hers, which is the one direction that must never be blurred.

    fillParts(x).map(text).join('') === fill(x), and content.test.js holds it, because the
    moment those two disagree a chip shows one sentence and inserts another (B34 D1).
  */
  function fillParts(text, said, holes) {
    var src = String(text == null ? '' : text);
    /* Its own regex object: HOLE is /g and shared, and a half-finished exec() on it would
       leave lastIndex somewhere the next caller does not expect. */
    var re = new RegExp(HOLE.source, 'g');
    var out = [];
    var last = 0;
    var m;
    while ((m = re.exec(src))) {
      if (m.index > last) out.push({ text: src.slice(last, m.index), carried: false });
      var mine = said && typeof said[m[1]] === 'string' ? said[m[1]].trim() : '';
      var fallback = holes && typeof holes[m[1]] === 'string' ? holes[m[1]] : '';
      out.push({ text: mine || fallback || m[0], carried: !!mine });
      last = m.index + m[0].length;
    }
    if (last < src.length) out.push({ text: src.slice(last), carried: false });
    return out;
  }

  /*
    B19. The cap moved off the list and onto the door. It used to be twelve, because twelve
    was what a person could read on the front screen without scrolling — and the whole list
    was the front screen. Now a door is, and what has to fit on a phone is the four to six
    worries behind whichever one was tapped. Twenty-one unfiltered is a scroll, and the scroll
    is what stalled two test users; it is only ever seen by somebody who reached the pick
    screen without going through a door.
  */
  var MAX_PER_DOOR = 6;

  /*
    A door has four fields and no fifth. `note` is optional and exists for one thing: the
    first door names drink and drugs, so it carries the line that frozen sentence 4 already
    says — that somebody dependent on either needs a person, not this. Everything the
    three-field rule on a Help place is for applies here (research §5.2). There is nowhere to
    put a lane, a tag or a second version, so a door can route a person and can never say
    something different to one person than to another.
  */
  var DOOR_FIELDS = ['id', 'label', 'under', 'worries', 'note'];
  var DOOR_REQUIRED = ['id', 'label', 'under'];

  /*
    A place on the Help screen has three fields and no fourth. The missing fourth is the
    point: there is nowhere to put a lane, a door, a tag or a score, so nothing on that list
    can ever be chosen for the person by anything they entered (research §5.2, B8).
  */
  var PLACE_FIELDS = ['name', 'url', 'what'];

  /*
    "Why this one sticks" has two fields and no third, for the same reason a place has three
    and no fourth: there is nowhere to put a lane, a condition or a second version, so the
    text can never be chosen for the person by anything they did (research §5.2, B18).
  */
  var WHY_FIELDS = ['what', 'why'];

  /*
    B30. A start is four fields and no fifth, for the reason a place on the Help screen has
    three and an explanation has two: with nowhere to hang a lane, a condition or a second
    version, WHICH suggestions a person is offered can never be decided by anything they have
    typed or done. It is decided by one thing — whether the first blank holds, word for word,
    one of the `if` lines — and that is a lookup rather than a judgement (research §5.2).
  */
  /*
    B42, 2026-09-09, and it is a change to the general set only. `sizes` — the three named
    steps a person picks between on the plan screen — replaced the general `dos` and `drops`,
    which were two loose suggestions with no dial in them. THE TWENTY-ONE STARTS KEPT THEIRS:
    each of those pairs was hand-written for that exact if-half, which is more use to somebody
    who tapped it than a generic small/bigger/whole, and the day a start gains its own three
    sizes it takes over with no change to any of this. `sizes` is optional on a start and
    required on the general set, which is the one every other road falls through to.
  */
  /* B45 §5c, 2026-09-10. The general set is what is left of starts.js: the fallback the two
     blanks and the plan screen offer when the first blank holds a sentence BETR did not
     write. It has no `if`, because it is the one with no start. */
  var GENERAL_FIELDS = ['thens', 'sizes'];
  var OURS = 'trybeup.com';
  var SHORTENERS = ['bit.ly', 't.co', 'tinyurl.com', 'goo.gl', 'ow.ly', 'buff.ly', 'rebrand.ly', 'lnkd.in'];

  function byId(worries, id) {
    for (var i = 0; i < worries.length; i++) if (worries[i].id === id) return worries[i];
    return null;
  }

  /* Returns a list of plain-English problems. Empty means the list is shippable. */
  function validateWorries(worries) {
    var problems = [];
    var seen = {};

    if (!Array.isArray(worries) || !worries.length) return ['worries.js is empty'];

    worries.forEach(function (f, i) {
      var where = 'item ' + i + ' (' + (f && f.id ? f.id : 'no id') + ')';

      FIELDS.forEach(function (field) {
        if (!f || typeof f[field] !== 'string' || !f[field].trim()) {
          problems.push(where + ' is missing ' + field);
        }
      });
      if (!f) return;

      if (seen[f.id]) problems.push(where + ' reuses the id "' + f.id + '"');
      seen[f.id] = true;

      if (typeof f.belief === 'string') splits(f.belief, where + ' belief', problems);

      if (LANES.indexOf(f.lane) === -1) {
        problems.push(where + ' lane "' + f.lane + '" is not one of: ' + LANES.join(', '));
      }

      checkSkeleton(f, where, problems);
      checkSizes(f, where, problems, true);
      checkSizes0(f, where, problems);
      checkBeliefs(f, where, problems);

      /*
        B42. A `{hole}` anywhere in a worry that has no skeleton, which is the bug the old
        ban on holes in the plan was really about: there is nothing to fill it from, so it
        prints as itself on somebody's phone. checkSkeleton() holds the ones that DO have a
        skeleton to every hole being declared; this holds the other nineteen to having none.
      */
      if (!f.skeleton) {
        ['belief', 'test', 'drop', 'label'].forEach(function (field) {
          if (typeof f[field] === 'string' && holesIn(f[field]).length) {
            problems.push(where + ' puts a hole in ' + field + ' and has no skeleton to fill it from');
          }
        });
      }

      /*
        The rule that never bends for BETR'S OWN CONTENT: no stock test, and no stock drop
        line, touches the habit, food and body, or anyone's safety.

        B29, 2026-09-08. This used to be `guards.checkTest`, and on that day checkTest stopped
        refusing the habit and body lists so that a PERSON'S own test could name them (rule 4
        as amended). The rule about what BETR proposes did not change with it, so the check is
        spelled out here against the same three lists rather than borrowed from the guard a
        person meets. If this is ever "tidied" back into one call, the twenty-one stock tests
        stop being checked at all and nothing says so.
      */
      ['test', 'drop'].forEach(function (field) {
        if (typeof f[field] !== 'string') return;
        if (!f[field].trim()) return;   /* the missing-field check above already said so */
        [['harm', guards.HARM], ['habit', guards.HABIT], ['body', guards.BODY]].forEach(function (pair) {
          var word = guards.hit(f[field], pair[1]);
          if (word) {
            problems.push(where + ' ' + field + ' names something BETR may never propose (' +
              pair[0] + ': "' + word + '")');
          }
        });
      });
    });

    return problems;
  }

  /*
    The three a person actually chooses between, and the rules that keep them worth choosing
    between. The last rule is the one that matters: two of them predicting the same thing in
    different words are one belief and a wasted tap, which is an easy thing to write by
    accident and an invisible thing to read back.
  */
  /*
    B32, 2026-09-08, and it stopped being a style rule that day.

    Every sentence here is drawn on the build screen, which PRINTS the words "If I" and
    ", then" either side of two blanks and fills those blanks by taking the sentence apart
    (app.js splitBelief). A sentence that does not come apart cleanly puts half of itself in
    one blank and nothing in the other, and a person is handed a broken sentence to test.

    So: it starts "If I", it has a ", then", and both halves have words in them. Three
    sentences in worries.js were reworded on the day this rule arrived — see the note at the
    top of that file, which names them for the CBT reviewer.
  */
  function splits(said, at, problems) {
    var s = String(said || '').trim();
    if (!/^If\s+I\b/i.test(s)) {
      problems.push(at + ' does not start with "If I", so the build screen cannot draw it: "' + s + '"');
      return;
    }
    var m = s.match(/^If\s+I([\s\S]*?),\s*then\s+([\s\S]*)$/i);
    if (!m) {
      problems.push(at + ' has no ", then", so it is not a prediction: "' + s + '"');
      return;
    }
    if (!m[1].trim()) problems.push(at + ' has nothing between "If I" and ", then": "' + s + '"');
    if (!m[2].trim().replace(/\.$/, '')) problems.push(at + ' says nothing after ", then": "' + s + '"');
  }

  /*
    A worry's skeleton, and since B45 §5c EVERY WORRY HAS ONE. It was optional through B41 and
    B42, when two worries had one and fifteen did not, and the app had two build screens
    because of it: a printed verb with a blank in it on two roads, two empty blanks on the
    rest. §4's one journey is the verb constructor by default, so the absence of a skeleton is
    not a variant a person can be handed any more — it is a worry that cannot be drawn.

    Holes are still optional. `early` has none — "leave at the time I decided and say plainly
    that I'm going" has nobody in it — and that is a whole skeleton with nothing to fill, not
    half of one. The SCREEN is the same either way, which is what makes it one journey.
  */
  function checkSkeleton(f, where, problems) {
    if (f.skeleton === undefined) {
      problems.push(where + ' has no skeleton, and every worry has one since B45 §5c: the ' +
        'printed verb is the build screen, not a variant of it');
      return;
    }
    var sk = f.skeleton;
    if (!sk || typeof sk !== 'object' || Array.isArray(sk)) {
      problems.push(where + ' has a skeleton that is not a skeleton');
      return;
    }
    Object.keys(sk).forEach(function (field) {
      if (SKELETON_FIELDS.indexOf(field) === -1) {
        problems.push(where + ' skeleton has an extra field "' + field + '": a skeleton is ' +
          'the printed words and the holes in them, and nothing that could decide anything');
      }
    });
    if (typeof sk.if !== 'string' || !sk.if.trim()) {
      problems.push(where + ' skeleton is missing if');
      return;
    }
    if (!sk.holes || typeof sk.holes !== 'object' || Array.isArray(sk.holes)) {
      problems.push(where + ' skeleton is missing holes');
      return;
    }
    var declared = Object.keys(sk.holes);
    /*
      B46, 2026-09-09, AND IT IS A LOOSENING, ON PURPOSE.

      This used to refuse a skeleton with no holes — "so it is just an if-half" — and that was
      right while a skeleton was the exception. It is the default now, and the default's point
      is the PRINTED VERB, not the hole. Some worries have nobody and nothing in them: leaving
      at the time you decided is one action with no noun anybody could supply, and demanding a
      hole would have got a made-up one.

      What matters is that the SCREEN is identical either way — printed words, and a blank for
      the second half — so a person cannot tell which kind she is on. Everything below still
      applies: a hole that is declared must be used, a hole that is used must be declared, and
      every prediction must start from the skeleton. A skeleton with no holes simply has none
      of those to check.
    */
    declared.forEach(function (name) {
      if (typeof sk.holes[name] !== 'string' || !sk.holes[name].trim()) {
        problems.push(where + ' hole "' + name + '" has no word to fall back on, and an empty ' +
          'blank has to leave a sentence that still reads');
      }
    });

    /*
      Every hole used is declared, and every hole declared is used. The first stops a `{oops}`
      printing as itself on somebody's phone; the second stops a blank appearing on the screen
      that changes no sentence anywhere, which is a box that does nothing.
    */
    var used = holesIn(sk.if);
    var sentences = [sk.if];
    if (Array.isArray(f.beliefs)) {
      f.beliefs.forEach(function (b) {
        if (b && typeof b.belief === 'string') { sentences.push(b.belief); }
        if (b && typeof b.expect === 'string') { sentences.push(b.expect); }
      });
    }
    /*
      B42. The plan and the three sizes are in this list from today, and the reason to say so
      out loud is that adding a place a hole may appear is the change that goes quietly wrong:
      every one of these is filled through content.fill at paint time, so a hole named here
      and nowhere declared would print as itself, and a hole declared and used only here would
      have passed as unused a day ago.
    */
    ['test', 'drop'].forEach(function (field) {
      if (typeof f[field] === 'string') sentences.push(f[field]);
    });
    if (Array.isArray(f.sizes)) {
      f.sizes.forEach(function (z) {
        if (!z) return;
        if (typeof z.do === 'string') sentences.push(z.do);
        if (typeof z.drop === 'string') sentences.push(z.drop);
        /* A name is a label, not a sentence about anybody: a hole in one would put a
           person's word on a button, which is not what a size is for. */
        if (typeof z.name === 'string' && holesIn(z.name).length) {
          problems.push(where + ' puts a hole in a size name, and a name is a label rather ' +
            'than a sentence about anybody');
        }
      });
    }
    sentences.forEach(function (text) {
      holesIn(text).forEach(function (name) { if (used.indexOf(name) === -1) used.push(name); });
    });
    used.forEach(function (name) {
      if (declared.indexOf(name) === -1) problems.push(where + ' uses a hole "{' + name + '}" it never declares');
    });
    declared.forEach(function (name) {
      if (used.indexOf(name) === -1) problems.push(where + ' declares a hole "{' + name + '}" and never uses it');
    });

    /*
      B49, 2026-09-10. A HOLE THAT IS NOT IN THE IF-HALF HAS EXACTLY ONE PLACE ITS BLANK IS
      DRAWN, AND THAT IS A SIZE'S PLAN SENTENCE.

      Every other hole is filled on the build screen, where skeletonHalf() puts a blank at each
      one it finds in `if`. A hole that is only ever used somewhere else has no blank there —
      and until today it was declared, validated, and then silently printed its own default word
      for ever, which is B45 §5b's finding written down. app.js draws a blank for one on the
      plan screen, in the sentence, once that size is picked; there is nowhere it draws one in a
      prediction, in an expectation, or in a leave-out. So those may not carry one.

      `test` and `drop` are exempt because they are not a second place: content.js already holds
      them equal to sizes[0]'s two, word for word (checkSizes0).
    */
    var inIf = holesIn(sk.if);
    var elsewhere = [];
    if (Array.isArray(f.beliefs)) {
      f.beliefs.forEach(function (b) {
        if (!b) return;
        ['belief', 'expect'].forEach(function (field) {
          if (typeof b[field] === 'string') elsewhere.push([b[field], 'a prediction']);
        });
      });
    }
    if (Array.isArray(f.sizes)) {
      f.sizes.forEach(function (z) {
        if (z && typeof z.drop === 'string') elsewhere.push([z.drop, 'a size’s leave-out']);
      });
    }
    elsewhere.forEach(function (pair) {
      holesIn(pair[0]).forEach(function (name) {
        if (inIf.indexOf(name) !== -1) return;
        problems.push(where + ' puts the hole "{' + name + '}" in ' + pair[1] + ' without ' +
          'putting it in the if-half, and there is no screen that would ever draw a blank ' +
          'for it: it would print "' + sk.holes[name] + '" for ever');
      });
    });

    /*
      The assembled sentence, with every hole at its default, still has to come apart the way
      the build screen needs — and the three predictions have to share the skeleton's if-half
      WORD FOR WORD. That last one is what makes the carry-through honest: the person is
      filling in one action, and all three predictions are consequences of that same action.
      Let them drift and the chip fills a sentence whose first half is not the one on screen.
    */
    splits(fill('If I ' + sk.if + ', then it goes badly.', {}, sk.holes), where + ' skeleton', problems);
    if (!Array.isArray(f.beliefs)) return;
    var want = flatten(fill(sk.if, {}, sk.holes));
    f.beliefs.forEach(function (b, j) {
      if (!b || typeof b.belief !== 'string') return;
      var m = fill(b.belief, {}, sk.holes).match(/^If\s+I\s*([\s\S]*?),\s*then\s+/i);
      if (!m) return;   /* splits() in checkBeliefs already says so */
      if (flatten(m[1]) !== want) {
        problems.push(where + ' belief ' + j + ' does not start from the skeleton, so filling a ' +
          'hole in would change the words above it: "' + m[1].trim() + '"');
      }
    });
  }

  function flatten(s) {
    return String(s || '').toLowerCase().replace(/[^a-z0-9\u2019 ]+/g, ' ').replace(/\s+/g, ' ').trim();
  }

  /*
    B42. The three sizes, or the absence of them — most worries have none yet and fall through
    to the three generic ones in starts.js, so the dial is on every road either way.

    A NUMBER IS THE ONE THING A NAME MAY NOT CONTAIN. Everything else here is shape; that one
    is the rule. "Level 2" and "Step 3 of 3" are the same object as a badge, they turn a dial
    into a ladder with a top, and the top of a ladder is somewhere a person can fail to reach.
  */
  function checkSizes(f, where, problems, required) {
    if (f.sizes === undefined) {
      /*
        B45 §5b, 2026-09-09. EVERY WORRY HAS THREE NOW, and it is required rather than
        optional. Until today fifteen of the seventeen had none and fell through to the
        general three — which meant the dial on the road most people are on was generic, and
        worse, `test`/`drop` were pre-filled into the boxes so the row was hidden. B46 fixed
        the hiding; this fixes the reason it was ever there. A start may still have none:
        starts.js is merged into this file by B45 §5c and validated by its own rules until
        then.
      */
      if (required) {
        problems.push(where + ' has no sizes, and every worry has three: the dial is not ' +
          'something a road either has or does not have');
      }
      return;
    }
    if (!Array.isArray(f.sizes)) {
      problems.push(where + ' has sizes that are not a list');
      return;
    }
    if (f.sizes.length !== SIZES_PER_WORRY) {
      problems.push(where + ' offers ' + f.sizes.length + ' sizes, and it has to be ' +
        SIZES_PER_WORRY + ': three, always, from the first screen to the fiftieth');
    }
    var said = {};
    f.sizes.forEach(function (z, j) {
      var at = where + ' size ' + j;
      if (!z || typeof z !== 'object' || Array.isArray(z)) { problems.push(at + ' is not a size'); return; }
      Object.keys(z).forEach(function (field) {
        if (SIZE_FIELDS.indexOf(field) === -1) {
          problems.push(at + ' has an extra field "' + field + '": a size is a name and the ' +
            'two sentences that go with it, and nothing that could decide anything');
        }
      });
      SIZE_FIELDS.forEach(function (field) {
        if (typeof z[field] !== 'string' || !z[field].trim()) problems.push(at + ' is missing ' + field);
      });
      if (typeof z.name === 'string') {
        if (/[0-9]/.test(z.name)) {
          problems.push(at + ' has a number in its name ("' + z.name + '"), and a number on a ' +
            'size is a level, a level is a point, and there are none of those here (B36 §9)');
        }
        /* Founder, 2026-09-03: nothing a person taps is all-lowercase. A size name is a
           label on a button and is not exempt the way a sentence fragment on a chip is. */
        if (/^[a-z]/.test(z.name)) problems.push(at + ' name starts lowercase, and it is a label');
      }
      /*
        Both halves are whole sentences a person could act on, so both start with a capital —
        the same rule a `dos` or a `drops` line in starts.js is held to, for the same reason.
        And both are BETR PROPOSING SOMETHING, so both go through the three word lists exactly
        as the twenty-one stock tests do. Rule 4 loosened what a PERSON may write on
        2026-09-08 and loosened not one word of what BETR writes.
      */
      ['do', 'drop'].forEach(function (field) {
        var line = z[field];
        if (typeof line !== 'string' || !line.trim()) return;
        if (!/^[A-Z\u201C]/.test(line)) {
          problems.push(at + ' ' + field + ' does not start with a capital, and it is a whole sentence');
        }
        [['harm', guards.HARM], ['habit', guards.HABIT], ['body', guards.BODY]].forEach(function (pair) {
          var word = guards.hit(line, pair[1]);
          if (word) {
            problems.push(at + ' ' + field + ' names something BETR may never propose (' +
              pair[0] + ': "' + word + '")');
          }
        });
      });
      /* Two sizes that say the same thing are one size and a wasted tap — and worse here than
         on a suggestion row, because the whole point of three is that they are different sizes
         of the same step. */
      ['name', 'do'].forEach(function (field) {
        if (typeof z[field] !== 'string') return;
        var key = field + ':' + flatten(z[field]);
        if (said[key] !== undefined) problems.push(at + ' ' + field + ' says the same thing as size ' + said[key]);
        said[key] = j;
      });
    });
  }

  /*
    B45 §5b, 2026-09-09. THE SMALLEST OF THE THREE IS THE WORRY'S OWN `test` AND `drop`,
    word for word, and this is what stops one file holding two answers to one question.

    `test` and `drop` are two of the seven parts of a worry (scope §5.2) and they are the
    only plan the app had before B42. Now that every worry carries three sizes, nothing reads
    them: prefillPlan() returns the moment a worry has sizes, so a `test` that drifted from
    its own small go would be a sentence nobody could reach and everybody would keep
    reviewing. Holding them equal means there is one wording, the reviewer scores it once,
    and B45 §5c can delete the pair without deciding anything.

    It is checked on worries only. The general set in starts.js has sizes and no `test`.
  */
  function checkSizes0(f, where, problems) {
    if (!Array.isArray(f.sizes) || !f.sizes[0]) return;
    [['do', 'test'], ['drop', 'drop']].forEach(function (pair) {
      var mine = f.sizes[0][pair[0]];
      var theirs = f[pair[1]];
      if (typeof mine !== 'string' || typeof theirs !== 'string') return;
      if (mine !== theirs) {
        problems.push(where + ' has a small go that is not its own ' + pair[1] + ': "' + mine +
          '" against "' + theirs + '". They are one sentence, and only one of them is ever read');
      }
    });
  }

  function checkBeliefs(f, where, problems) {
    if (!Array.isArray(f.beliefs)) {
      problems.push(where + ' has no beliefs to choose from');
      return;
    }
    if (f.beliefs.length !== BELIEFS_PER_WORRY) {
      problems.push(where + ' offers ' + f.beliefs.length + ' beliefs, and it has to be ' + BELIEFS_PER_WORRY);
    }
    var seen = {};
    f.beliefs.forEach(function (b, j) {
      var at = where + ' belief ' + j;
      if (!b || typeof b !== 'object' || Array.isArray(b)) { problems.push(at + ' is not a belief'); return; }

      BELIEF_FIELDS.forEach(function (field) {
        if (typeof b[field] !== 'string' || !b[field].trim()) problems.push(at + ' is missing ' + field);
      });
      Object.keys(b).forEach(function (field) {
        if (BELIEF_FIELDS.indexOf(field) === -1) {
          problems.push(at + ' has an extra field "' + field + '": a belief is two fields, so that ' +
            'which sentence a person reads can never be decided for them');
        }
      });
      if (typeof b.belief !== 'string') return;

      splits(b.belief, at, problems);

      var flat = b.belief.toLowerCase().replace(/[^a-z ]+/g, ' ').replace(/\s+/g, ' ').trim();
      if (seen[flat] !== undefined) problems.push(at + ' says the same thing as belief ' + seen[flat]);
      seen[flat] = j;
    });
  }

  /*
    The suggestion chips. Two things are being kept true here and they pull in opposite
    directions, which is why both are spelled out.

    First, they have to READ as part of the sentence: a `then` follows the printed ", then",
    so it is a lowercase fragment and never a sentence of its own.

    Second, they are BETR PROPOSING SOMETHING. Rule 4 as amended 2026-09-08 loosened what a
    person may write for themselves and loosened nothing about what BETR writes, so every one
    of these goes through the same three word lists the twenty-one stock tests do.
  */
  function validateGeneral(general) {
    var problems = [];
    if (!general || typeof general !== 'object' || Array.isArray(general)) {
      return ['there is no general set, so a sentence BETR did not write gets nothing'];
    }
    checkThens('the general set', general, problems);
    Object.keys(general).forEach(function (field) {
      if (GENERAL_FIELDS.indexOf(field) === -1) {
        problems.push('the general set has an extra field "' + field + '": it is three ' +
          'predictions and three sizes, and nothing that could decide which of them a ' +
          'person is shown');
      }
    });
    if (!general.sizes) {
      problems.push('the general set has no sizes, so a road with none of its own has no dial');
    }
    checkSizes(general, 'the general set', problems);
    return problems;
  }

  /*
    B45 §5c, 2026-09-10. THE FRONT DOOR'S TWELVE, AND IT IS A LIST OF IDS AND NOTHING ELSE.

    It used to be twelve items in starts.js, each with an `if`, three `thens` and four plan
    lines of its own — nine of them describing an act that was already a worry, in different
    words. The sentences are the worries' now; this is only which of them the first blank
    offers, and in what order.

    So the one thing to check is that it points at worries that exist and does not point at
    one twice. Everything a person reads through it is validated as a worry.
  */
  function validateFront(front, worries) {
    var problems = [];
    if (!Array.isArray(front) || !front.length) {
      return ['there is no front-door list, so the first blank has no suggestions under it'];
    }
    var seen = {};
    front.forEach(function (id, i) {
      var where = 'front-door suggestion ' + i + ' (' + id + ')';
      if (typeof id !== 'string' || !id.trim()) { problems.push(where + ' is not an id'); return; }
      if (seen[id] !== undefined) {
        problems.push(where + ' is the same worry as suggestion ' + seen[id] + ', so one tap is wasted');
      }
      seen[id] = i;
      var f = byId(worries, id);
      if (!f) {
        problems.push(where + ' is not a worry, so the chip prints nothing');
      } else if (!f.skeleton) {
        problems.push(where + ' has no skeleton, so there is no sentence to put in the blank');
      }
    });
    return problems;
  }

  function checkThens(where, set, problems) {
    var list = set.thens;
    if (!Array.isArray(list) || !list.length) { problems.push(where + ' has no thens'); return; }
    var said = {};
    list.forEach(function (line, j) {
      var at = where + ' thens ' + j;
      if (typeof line !== 'string' || !line.trim()) { problems.push(at + ' is empty'); return; }

      /*
        A `then` follows ", then" and so is lowercase — except for "I", which is a capital in
        English wherever it stands and is how half of these have to begin.
      */
      if (/^[A-Z]/.test(line) && !/^I(\b|['\u2019])/.test(line)) {
        problems.push(at + ' starts with a capital, and it follows the printed ", then"');
      }

      /* Two that say the same thing are one suggestion and a wasted tap. */
      var flat = line.toLowerCase().replace(/[^a-z ]+/g, ' ').split(/\s+/).filter(Boolean).sort().join(' ');
      if (said[flat] !== undefined) problems.push(at + ' says the same thing as thens ' + said[flat]);
      said[flat] = j;

      /* BETR proposing it, so the three lists apply exactly as they do to a stock test. */
      [['harm', guards.HARM], ['habit', guards.HABIT], ['body', guards.BODY]].forEach(function (pair) {
        var word = guards.hit(line, pair[1]);
        if (word) {
          problems.push(at + ' names something BETR may never propose (' + pair[0] + ': "' + word + '")');
        }
      });
    });
  }

  function validateDoors(doors, worries) {
    var problems = [];
    if (!doors || !Array.isArray(doors.items) || !doors.items.length) {
      return ['whats-going-on.js is empty'];
    }
    var behind = {};
    doors.items.forEach(function (d, i) {
      var where = 'door ' + i + ' (' + (d && d.id ? d.id : 'no id') + ')';
      DOOR_REQUIRED.forEach(function (field) {
        if (!d || typeof d[field] !== 'string' || !d[field].trim()) problems.push(where + ' is missing ' + field);
      });
      if (!d) return;

      /* Four fields and no fifth: nowhere to put a rule that varies what a person reads. */
      Object.keys(d).forEach(function (field) {
        if (DOOR_FIELDS.indexOf(field) === -1) {
          problems.push(where + ' has an extra field "' + field + '": a door is four fields, so ' +
            'that nothing behind one can ever be chosen for the person');
        }
      });
      if ('note' in d && (typeof d.note !== 'string' || !d.note.trim())) {
        problems.push(where + ' has an empty note; leave it out instead');
      }

      if (!Array.isArray(d.worries) || d.worries.length < 2) {
        problems.push(where + ' should open onto at least two worries');
      } else {
        if (d.worries.length > MAX_PER_DOOR) {
          problems.push(where + ' opens onto ' + d.worries.length + ' worries: more than ' +
            MAX_PER_DOOR + ' is a scroll on a phone (B19)');
        }
        d.worries.forEach(function (id) {
          if (!byId(worries, id)) problems.push(where + ' points at unknown worry "' + id + '"');
          behind[id] = true;
        });
        var dupes = {};
        d.worries.forEach(function (id) {
          if (dupes[id]) problems.push(where + ' lists "' + id + '" twice');
          dupes[id] = true;
        });
      }
      /* A door names a behaviour. It must never itself read as a test. */
      if (/\btry\b|\btest\b|\btoday\b/i.test(d.label)) {
        problems.push(where + ' label reads like an instruction, not something a person would say about themselves');
      }
    });

    /*
      B19. A door is now the way in, so a worry behind no door is a worry almost nobody will
      ever reach. That is the failure this catches: not a crash, just an item quietly falling
      out of the product when a door is reworded.
    */
    (worries || []).forEach(function (f) {
      if (!behind[f.id]) problems.push('"' + f.id + '" is behind no door, so nothing leads to it');
    });

    return problems;
  }

  /*
    The Help list. Plain https, no parameters, no shorteners, and ours is never first.
    Returns plain-English problems; empty means the list is shippable, once Misha has read it.
  */
  function validatePlaces(places) {
    var problems = [];
    if (!places || !Array.isArray(places.groups) || !places.groups.length) {
      return ['places.js is empty'];
    }
    if (typeof places.intro !== 'string' || !places.intro.trim()) {
      problems.push('places.js has no intro line');
    }
    if (!Array.isArray(places.reading) || !places.reading.length) {
      problems.push('places.js has nothing to read about CBT');
    } else {
      checkItems('reading', places.reading, problems);
    }

    places.groups.forEach(function (grp, gi) {
      var where = 'group ' + gi + ' (' + ((grp && grp.title) || 'no title') + ')';
      if (!grp || typeof grp.title !== 'string' || !grp.title.trim()) {
        problems.push(where + ' is missing a title');
        return;
      }
      if (!Array.isArray(grp.items) || grp.items.length < 2) {
        problems.push(where + ' needs at least two places in it');
        return;
      }
      checkItems(where, grp.items, problems);
    });

    return problems;
  }

  /* Every link on the Help screen goes through this, wherever on the screen it sits. */
  function checkItems(where, items, problems) {
    items.forEach(function (p, i) {
      var at = where + ' item ' + i + ' (' + ((p && p.name) || 'no name') + ')';
      if (!p || typeof p !== 'object') { problems.push(at + ' is not a place'); return; }

      PLACE_FIELDS.forEach(function (field) {
        if (typeof p[field] !== 'string' || !p[field].trim()) problems.push(at + ' is missing ' + field);
      });
      Object.keys(p).forEach(function (field) {
        if (PLACE_FIELDS.indexOf(field) === -1) {
          problems.push(at + ' has an extra field "' + field + '": a place is three fields, so that nothing here can be picked for the person');
        }
      });
      if (typeof p.url !== 'string') return;

      if (!/^https:\/\/[a-z0-9.-]+(\/[A-Za-z0-9\/._-]*)?$/.test(p.url)) {
        problems.push(at + ' url "' + p.url + '" must be plain https with no query string, no fragment and no odd characters');
      }
      SHORTENERS.forEach(function (short) {
        if (p.url.indexOf('//' + short) !== -1) problems.push(at + ' uses a link shortener');
      });

      /* Rule 9, as amended by B8. Ours is listed, never led with, and never disguised. */
      if (p.url.indexOf(OURS) !== -1) {
        if (i === 0) problems.push(at + ' is ours and is first in its group; it may never be first');
        if (!/made by us/i.test(p.what || '')) {
          problems.push(at + ' is ours and does not say so in the entry itself');
        }
        if (!/\bfree\b/i.test(p.what || '') || !/\bpaid\b|\bcosts?\b/i.test(p.what || '')) {
          problems.push(at + ' is ours and does not say plainly what it costs');
        }
        if (/[?#]/.test(p.url)) problems.push(at + ' is ours and carries a parameter');
      }
    });
  }

  /*
    Every stock worry has an explanation, nothing has one that is not a stock worry, and an
    entry has exactly the two fields. The middle rule is what stops a stale entry surviving a
    worry being removed, which is how a person would end up reading about something that is
    no longer on the list.
  */
  function validateWhy(why, worries) {
    var problems = [];
    if (!why || typeof why !== 'object') return ['why.js is empty'];

    var ids = {};
    (worries || []).forEach(function (f) {
      ids[f.id] = true;
      if (!why[f.id]) problems.push('"' + f.id + '" has no explanation in why.js');
    });

    Object.keys(why).forEach(function (id) {
      var at = 'why.js "' + id + '"';
      if (!ids[id]) problems.push(at + ' is not a worry on the list');

      var entry = why[id];
      if (!entry || typeof entry !== 'object') { problems.push(at + ' is not an entry'); return; }

      WHY_FIELDS.forEach(function (field) {
        if (typeof entry[field] !== 'string' || !entry[field].trim()) {
          problems.push(at + ' is missing ' + field);
        }
      });
      Object.keys(entry).forEach(function (field) {
        if (WHY_FIELDS.indexOf(field) === -1) {
          problems.push(at + ' has a field called "' + field + '". Two fields and no third: ' +
            'a third is somewhere to aim this text at a person');
        }
      });
    });

    return problems;
  }

  return {
    LANES: LANES,
    FIELDS: FIELDS,
    PLACE_FIELDS: PLACE_FIELDS,
    DOOR_FIELDS: DOOR_FIELDS,
    BELIEF_FIELDS: BELIEF_FIELDS,
    SKELETON_FIELDS: SKELETON_FIELDS,
    SIZE_FIELDS: SIZE_FIELDS,
    SIZES_PER_WORRY: SIZES_PER_WORRY,
    holesIn: holesIn,
    fill: fill,
    fillParts: fillParts,
    BELIEFS_PER_WORRY: BELIEFS_PER_WORRY,
    MAX_PER_DOOR: MAX_PER_DOOR,
    GENERAL_FIELDS: GENERAL_FIELDS,
    byId: byId,
    validateWorries: validateWorries,
    validateGeneral: validateGeneral,
    validateFront: validateFront,
    validateDoors: validateDoors,
    validatePlaces: validatePlaces,
    WHY_FIELDS: WHY_FIELDS,
    validateWhy: validateWhy
  };
});
