/*
  Every word a person can read in BETR, in English (B15, 2026-09-03).

  Before this file, roughly a hundred and fifty sentences lived as string literals inside
  app.js, guards.js and rate.js. That made a second language a rewrite rather than a
  translation, and it made it impossible to check in one place what the app actually says.
  Now app.js contains no sentence a person reads; web/tests/i18n.test.js fails the build if
  one comes back.

  How to add a language (B16, and it is mostly not a coding job):
    1. copy this file to strings-<code>.js, keep every key, translate the values
    2. set `lang`, `dir` ('rtl' for Arabic, Hebrew, Farsi, Urdu) and `name` — the name in the
       language's own words, so a person can find it: Français, not French
    3. add one <script> line to index.html and one to tests/harness.js. Nothing else changes.
  A missing key falls back to English on its own, so a half-finished language still works.

  Why this is a .js file and not strings-en.json: the same reason as worries.js — the founder
  opens web/index.html straight off the filesystem, and a browser will not fetch JSON (or load
  an ES module) from a file:// page. It is still plain data. No logic, ever.

  THE RULES THAT TRAVEL WITH THIS FILE

  - `frozen` below is frozen. The purpose statement and the nine sentences are verbatim from
    docs/research/10-cbt-gateway-approach.md §10, and CLAUDE.md rule 7 says they appear word
    for word. Do not tidy them, do not shorten them, do not "improve" them. In another
    language they are approved once, by a named person, in B16, and then frozen the same way.
  - The phrases that never appear, in any language: "digital CBT", "treats", "reduces
    symptoms", "for people with [diagnosis]", "tracks your anxiety", "improve your mental
    health", "irrational", "streak". The last of those is in the sweep because a translator
    with good intentions is exactly who would reintroduce it.
  - The wordmark is BETR, all caps, everywhere. Nothing a person taps is all-lowercase.
  - No crisis phone number is written in this file. Numbers live in content/helplines.js with
    the page they were read on and the day somebody read it there, and the country decides
    them — not the language. A Spanish speaker in Mexico shown a US number has been harmed by
    us. The words around a number are here; the number never is.

  A value with `one` / `other` (or `two` / `few`) is a plural: the app picks the form with
  Intl.PluralRules, which is built into every browser and knows the rules for every language.
  `{n}`, `{country}`, `{belief}` and the rest are filled in by the app; keep them, and move
  them wherever the sentence needs them to be.
*/
var BETR_STRINGS_EN = {
  lang: 'en',
  dir: 'ltr',
  name: 'English',

  s: {

    /* ------------------------------------------------------------------ frozen */

    frozen: {
      /*
        Identical in the app, index.html's <meta name="description">, the manifest, the store
        listing and every post (research §5.4). Change it here and change it in all of them.
      */
      purpose: 'BETR helps you test unhelpful beliefs in everyday life. You pick a worry ' +
        'about how people will react, it gives you one small thing to try today, and you ' +
        'record what actually happened.',

      /*
        The nine sentences. Google Play requires the "not a medical device" one, Apple
        requires the "check with a doctor" one, and the rest are what keeps this a worksheet
        rather than a regulated device. Sentence 7 names two countries' numbers inside
        itself; that is deliberate and frozen, and it is why the live crisis block exists.
      */
      sentences: [
        'This is a self-help worksheet, not therapy, and it is not a medical device. It does not diagnose, treat, cure or prevent any condition.',
        'It uses one technique from cognitive behavioural therapy (CBT), the behavioural experiment: write down a belief, predict what will happen, try it, record what actually happened, and rate the belief again.',
        'It can help you manage everyday worry and unhelpful beliefs. It will not solve them, and it is not a substitute for working with a qualified CBT therapist. If you can see one, please do.',
        'It is not for you right now if you are having thoughts of suicide or self-harm, have been told you have psychosis or bipolar disorder, have an eating disorder, PTSD or OCD, or are dependent on alcohol or drugs. Those need a person, not an app.',
        'If you are already in therapy, follow your therapist’s plan. Use this only if they agree.',
        'Choose experiments that are safe and legal. Never design one that involves the habit you’re trying to change, self-harm, restricting food, or putting yourself or anyone else at risk.',
        'If you are in danger or in crisis, call your local emergency number. In the US, call or text 988. In the UK and Ireland, call Samaritans free on 116 123. Elsewhere, findahelpline.com lists free helplines in over 175 countries.',
        'Everything you write stays on this device. There is no account, no server, and nothing is sent to us or anyone else. If you delete the app without exporting, your entries are gone.',
        'This was made by the people behind TrybeUP, not by a clinician or a health service. Nothing in it is medical advice, and using it does not create a therapist–client relationship.'
      ]
    },

    /* ------------------------------------------------------------------ everywhere */

    brand: 'BETR',
    back: 'Back',

    /*
      The corner chip, B35. It names the look you would GET by tapping it, not the one you are
      in — "Dark" means tap here for dark. The sun and the moon beside the words are
      decoration and are hidden from a screen reader, so the spelled-out label is the whole of
      what it says out loud.
    */
    look: {
      dark: 'Dark',
      light: 'Light',
      toDark: 'Switch to dark colours',
      toLight: 'Switch to light colours'
    },

    /* Three doors, on every screen. Not a tab bar (CLAUDE.md rule 10): never a fourth. */
    nav: {
      label: 'BETR',
      mine: 'Your tests',
      new: 'New test',
      help: 'Help'
    },

    /* ------------------------------------------------------------------ the front screen */

    start: {
      /*
        B31, 2026-09-08. THE FRONT SCREEN STOPPED DESCRIBING BETR AND STARTED SHOWING IT.

        What went, and it went on purpose: "You've played it out a hundred times." with its
        sub-line, and B25's "every test starts at ten out of ten". All three were the screen
        explaining the loop in words to somebody who had never seen one. The card underneath
        this caption does all three jobs at once — it shows the rehearsal, it shows the test,
        and its ladder starts at ten where a person can see it. B25's problem (a first result
        of 10 → 9 landing on a person with nothing to read it against) is answered by the
        picture rather than by a sentence, and `loop.test.js` now holds the ten to the card.

        `caption` is the most load-bearing string on the screen and it is four words long. It
        is what makes the card a page in a book rather than a testimonial — the MHRA reads a
        testimonial as an implied claim (research §5.2) — and it is the heading the screen is
        announced by. If the founder ever chooses to show a real result of their own, this is
        the line that changes, to say whose.
      */
      caption: 'What one test looks like',
      /*
        The big button. It used to say "Pick a worry", then "Start a test"; it asks the
        question instead now, because the card above it has just shown somebody else's.
      */
      go: 'What’s yours?',
      /* One tap aside, and never the main road: the stock list, as things to borrow (B32). */
      borrow: 'Not sure? Try one of these',
      /* The trust line, with the human half first. §9.2: airplane mode is the proof. */
      promise: 'Nobody sees this but you. No account, no AI, nothing leaves your phone.',
      noStorage: 'This browser won’t let BETR remember anything — a private window usually ' +
        'does that. The loop still works; nothing will be here tomorrow.'
    },

    /*
      B38, 2026-09-09. THE WORKED EXAMPLE HAS ITS OWN LABELS NOW, AND THAT IS A VOICE
      DECISION, NOT A TIDY-UP.

      The card on the front screen borrowed `result.*` for its labels, and with two of them
      — "You expected" and "What actually happened" — that read fine. B38 adds a third beat,
      what they actually did, and the moment there are three the card says YOU, then THEY,
      then nothing. B36 §12a: either the card is something you are SHOWN or something you
      are INVITED INTO; two voices in one card is not an option.

      This takes the SHOWN option, which is the one the mockup the founder saw takes. The
      card is somebody else's finished test, captioned "What one test looks like", and it
      reads as one all the way down. `result.*` is untouched, because on a person's own
      result screen "You expected" is exactly right.

      MISHA OWNS WHICH WAY ROUND THIS GOES. Flipping it back is these three strings and the
      a11y one under them; no code moves either way.
    */
    example: {
      expected: 'They expected',
      /*
        The beat the whole of B38 exists for. Short label, because what has to be read is the
        line under it — one sentence, and small enough that a person thinks "I could do that".
      */
      did: 'What they did',
      ladderLabel: 'How sure they were it goes badly'
    },

    /* What is on the go. Never a tally, never an age, never a count (B8). */
    waiting: {
      onTheGo: 'On the go.',
      pickUp: 'Pick it up',
      many: 'Tests you’ve got on the go'
    },

    /* ------------------------------------------------------------------ the second door */

    /*
      B32, 2026-09-08. The doors and the list behind them stopped being the way in and became
      things to BORROW, one tap aside from the front screen. `sub` is the line that says so,
      and `own` no longer reads as a failure to find a match — a person's own words are the
      front door now, and this is the side road, not the other way round.
    */
    doors: {
      title: 'What’s going on?',
      /*
        `sub` was here for a day. It said what `whats-going-on.js`'s own intro now says, and
        two lines above the safety note cost the note 58px of the margin B23 bought it. One
        line, in the file the founder edits.
      */
      own: 'None of these — I’ll write my own',
      foot: 'None of these is a diagnosis, and BETR never decides which one you are.'
    },

    /* ------------------------------------------------------------------ picking a worry */

    pick: {
      title: 'Which one?',
      sub: 'Tap the one that’s closest. You can change every word of it.',
      own: 'Something else',
      notHere: 'Nothing here tests the thing itself, only what you expect to happen without ' +
        'it. That’s the part that gets tested.'
    },

    /*
      THE `belief` BLOCK WENT ON 2026-09-08 (B32). It was the words around B20's screen —
      which of these three is it, and what you would be braced for under each. That screen is
      the build screen now and the three are a row of suggestion chips on it, so nothing reads
      these keys any more. B20's finding is untouched: a prediction that is only nearly yours
      cannot be disconfirmed by anything that happens, so the person still says which of the
      three is theirs — in one tap, on the screen where the sentence is being written.
    */

    /* ------------------------------------------------- the build screen (B30) */

    /*
      The way in, since 2026-09-08. One sentence with two blanks, then what you'll do.

      `ifWord` and `thenWord` are PRINTED, either side of the first blank, and they are also
      what the stored sentence is assembled from — one source of truth, so a translation can
      never end up with a screen that says one thing and a record that says another. Keep the
      comma inside `thenWord`; a language that does not want one takes it out and both the
      screen and the record follow.

      The blanks are not labelled on screen, because the sentence labels them by being a
      sentence. `ifLabel` and `thenLabel` are what a screen reader says instead, and they have
      to work read alone, out of order, with no sentence around them.

      The chips are suggestions and nothing more. They are in content/starts.js, in a fixed
      order, and which set is under the second blank depends on one thing: whether the first
      blank holds, word for word, one of the starts. That is a lookup, not a judgement.
    */
    build: {
      title: 'Set up a test',
      sub: 'One sentence: the thing you’d do, and what you’re sure would happen.',
      ifWord: 'If I',
      thenWord: ', then',
      ifLabel: 'If I — what would you do?',
      thenLabel: 'Then what — what are you sure will happen?',
      ifPlaceholder: 'say no without giving a reason',
      thenPlaceholder: 'they’ll think I’m being difficult',
      ifChips: 'Or start from one of these:',
      thenChips: 'Or one of these:',
      /*
        B32. The same screen, opened from the borrow list with the sentence half filled in.
        The heading changes because the job has: you are not starting from nothing, you are
        turning somebody else's words into yours, and "Set up a test" would hide that.
      */
      borrowTitle: 'Make it yours',
      borrowSub: 'Change any of it. It only counts if it’s the one that would sting.',
      /*
        B20's three, now a row of suggestions instead of a screen of their own. Each of them
        is a whole sentence and fills both blanks, so the line says so.
      */
      borrowChips: 'Three ways people usually put this. Tap one to fill it in:',
      /*
        B40, 2026-09-09. THE WAY OUT OF A WORRY'S ROAD, and the only one there is.

        Until today a person left by editing: change a word of a borrowed sentence and the test
        became theirs, with a ladder of its own. That rule cannot survive B41's skeletons, where
        the sentence arrives with holes and filling them changes the words every single time. So
        the road is what decides now, and leaving it has to be something a person does on
        purpose rather than something that happens to them while they type.

        One plain link, under the suggestions, on the borrowed road only. Not a mode, not a
        toggle, nothing to discover. It says what it does and it costs the 10% one tap (B37 §3).
      */
      /*
        B41, 2026-09-09. What a screen reader says at one of the small blanks inside a printed
        sentence. The sentence itself is read on the way past, so this only has to say what the
        blank is FOR — and the honest answer is "the word BETR put there, in your words". The
        default word is handed in, because it is the one thing that differs hole to hole and it
        is content rather than code.
      */
      holeLabel: 'Your own word instead of “{word}”',
      own: 'Write the whole thing myself',
      next: 'What will you do?',
      /* The second half. The sentence is above it, in the quiet strip, unchanged. */
      doTitle: 'What will you do today?',
      /*
        Short on purpose: at 125% text every line here pushes "Lock it in" behind the menu.
        B39, 2026-09-09, measured it — this ran to TWO lines at 125% and cost 36px of a screen
        that was already 279px over. One line, and it keeps the half that matters: the size,
        and that nobody but the person picks it.
      */
      doSub: 'One small thing, your pick.',
      doPlaceholder: 'Say no to one thing today, in one sentence.',
      /*
        B42. What the box says while the three sizes are under it. The other placeholder is a
        worked example, and over three named steps a worked example reads as a fourth one —
        or worse, as a plan already in the box. This one asks for the thing the three cannot
        give her, and says plainly that they are optional.
      */
      doOwnPlaceholder: 'Or put it in your own words.',
      doChips: 'Or one of these:',
      /*
        B42, 2026-09-09. THE DIAL, and every word of this line is doing a job.

        "How big" is the founder's small / medium / big said in the way a person would say it.
        "Any of them counts" is the half that has to be there: the smallest is not a warm-up
        for the real one, and a person who picks it twice has done two tests. There is no
        number in it, nothing is called a level, and nothing says which one to pick — see
        app.js sizeRow() for the four things that are deliberately absent from this row.
      */
      sizeChips: 'How big a go? Any of them counts:',
      /*
        The mark on the repeat screen, on the one that was done last time. It says what
        happened, not what to do: same again is a real answer, because doing something once
        and getting away with it is easy to put down to luck.
      */
      sizeLast: 'Last time',
      /* The folded row's label, once one of the three is in the box. Same shape as the
         leave-out's: what this half is, what it currently says, and the way back in. */
      sizeLabel: 'How big a go',
      /*
        What the folded row says on a repeat of a test that was never done at one of the three
        — one from before B42, or one whose plan the person wrote themselves. The three are
        still one tap away and nothing is missing; this only has to name what is in the plan.
      */
      sizeOther: 'Your own',
      /* The way back to the three, on both screens that fold them: the row on the build screen
         and the line inside the plan card on a repeat. One word doing one job in both places. */
      sizeChange: 'Change',
      dropLabel: 'And leave out',
      /*
        B39, 2026-09-09, the founder's call. THE LEAVE-OUT HALF IS ONE ROW UNTIL IT IS TOUCHED.

        Measured: the label, its line, the box and its suggestion row cost about 176px, and on
        the free-text road — the front door since B32 — that was most of the reason *Lock it in*
        started BELOW THE FOLD AT 100%, not at 125%. Collapsed to one row it costs about 60.

        The row SHOWS the words rather than hiding them, and that is the whole design. On the
        borrowed road what is in that box is BETR's, put there by BETR, and a plain link saying
        "add something to leave out" would let somebody lock in a sentence of ours they never
        read. So: the label, what it currently says, and the way to change it.
      */
      dropChange: 'Change',
      dropAdd: 'Add one',
      /*
        Optional, and it says so in its own line rather than in a note underneath — the note
        was a separate line of small print and it pushed "Lock it in" below the fold.
      */
      dropSub: 'Optional. It’s what counts.',
      dropPlaceholder: 'Don’t give a reason.',
      dropChips: 'Or one of these:',
      lock: 'Lock it in',
      /*
        B27 item 2, moved here by B30. This was `own.belief.only` and it sat under the blank
        box, because on 2026-09-04 a test user wrote a true thing about his own body into that
        box and nothing in fifteen screens had told him which ones BETR is for. That box is
        gone; THIS is the screen a person writes one on now, so the line moved with the job.
        It is under the sentence rather than above it, for the reason it always was: a rule
        read before you have written anything is a rule about somebody else.

        Widened on 2026-09-08 (B28 §3). It used to open "Not the weather, and not your body",
        which was a checkability hint working as a wall — the founder's own two examples, one
        about time and one about a feeling, both failed it. What is left is the half that
        excludes a settled fact, plus the risk line the founder asked for on the same day.
      */
      only: 'Only the ones you’ve never actually found out about. If it could put you or anyone else at risk, that one needs a person, not this.'
    },

    /*
      THE `own` BLOCK WENT WITH IT. It was the three one-box screens and the nudge: "What do
      you think will happen?", "What will you do?", "What will you leave out?", and "Keep mine
      as it is". All of it is `build.*` above now, on two screens instead of five, and
      `own.belief.only` became `build.only` in B30 — it is the one line that had a job left,
      and it is on the screen a person actually writes one on.
    */

    /*
      The refusals. lib/guards.js decides, this file says it — so the guard has no words in
      it and no phone number in it, which is what B17 fixed and what must not come back.
      A refusal explains, because refusing quietly teaches nothing.
    */
    refusal: {
      habit: 'That test involves the thing itself. Those aren’t tests — what you expect to ' +
        'happen without it is. Try one about what people will think, or about what happens ' +
        'when you go without it.',
      body: 'BETR doesn’t do tests about food, weight or what your body is doing. Those need ' +
        'a person, not this.',
      harm: 'BETR can’t help with that one, and it would be wrong to pretend otherwise.',
      verdict: 'That’s a verdict, not a prediction. What do you think would happen because of it?',
      notConditional: 'Start it with “If I…”. It has to be something that could turn out to be wrong.',
      noConsequence: 'Say what you think happens next: “If I ___, then ___”.',
      emptyTest: 'Write the one thing you’ll do today.',
      emptyBelief: 'Write what you think will happen.',
      /*
        B30. The first blank has its own empty line, because "write what you think will
        happen" is the answer to the second one and reads as nonsense under the first.
      */
      emptyIf: 'Say what you’d do differently. It goes after “If I”.'
    },

    /*
      Not a refusal. Founder's call, 2026-09-04, after a test user typed "if I eat gluten, it
      won't go well" and hit a wall over a missing "then". The grammar was never the point —
      that sentence is a clear prediction and any reader understands it instantly. So the shape
      rules ask once, show the shape that works, and let the person's own words through on the
      next tap. lib/guards.js decides when to ask; this says it.
    */
    nudge: {
      shape: 'These work best as “If I ___, then ___”. Like: If I ask for Friday off, then my ' +
        'boss will think I’m slacking. Or keep yours as it is.'
    },

    /* ------------------------------------------------------------------ the loop */

    plan: {
      today: 'Today',
      /* {drop} is the person's own words, in bold. Keep it where the sentence needs it. */
      line: '{drop} That’s the bit that makes it count.',
      expectLabel: 'What you expect',
      edit: 'Not quite? Change it',
      editDone: 'Done',
      /*
        B38, 2026-09-09. Was "I’ll do it today". BETR never asks anybody to be brave; it asks
        them to find something out. A dare needs permission from somebody with authority, which
        BETR has not got and cannot fake. A question needs none — nobody needs authorisation to
        go and find out what happens. That is the one structural advantage a behavioural-
        experiment app has over an exposure app, and the loop was not using it
        (research/12 §9.1; B36 §7, item 7).
      */
      lock: 'I’ll find out today',
      lockNote: 'That locks in what you expect, so later you can’t talk yourself out of what ' +
        'actually happened.',
      /*
        B42. The three sizes again, on the way back into something already tested. "Same
        again" leads on purpose: it is a real answer and the screen should not read as though
        the point were to work up to something.
      */
      sizeChips: 'Same again, or a different size:'
    },

    /*
      Two states, one screen. The second one is B27 item 1, 2026-09-04: a test user tapped
      "Didn’t get to it", got the right sentence, and read it under a heading that still said
      LOCKED IN · GO AND DO IT. He asked whether it had done anything. Rule 5 was honoured in
      the words and undercut by the screen — and the last thing somebody sees as they close
      the app is what they take away, so it cannot be an instruction they have just declined.
      The `rest` three are what the same screen says once the test is put down for today.
    */
    locked: {
      kicker: 'Locked in',
      /* B38: was "Go and do it." See plan.lock above for why every dare in the loop is a
         question now. This is the last screen somebody reads before they go out and do it. */
      title: 'Go and find out.',
      /*
        B38, 2026-09-09, and it is the whole of B36 §10a. The therapist's safety net is not
        their authority — it is that a bad outcome has already been thought about and is not
        a disaster. A person with no therapist can still have that, and it is one sentence
        said at the moment it matters. It is rule 6 (no verdicts) out loud, on the screen
        where somebody is about to risk something.
      */
      net: 'Bring back whatever happens. A bad one counts the same as a good one.',
      missed: 'No problem. It’s still here for tomorrow. Smaller counts, too.',
      done: 'Done it. Here’s what happened',
      miss: 'Didn’t get to it',
      restKicker: 'Set aside',
      restTitle: 'Nothing lost.',
      restDone: 'Actually, I did it'
    },

    happened: {
      title: 'What happened?',
      sub: 'Just what they said or did. No verdict.',
      placeholder: 'He said “fair enough” and got his own coffee.',
      next: 'Next'
    },

    /*
      The re-rate. Five words, no slider. "More sure than before" has to be here — a test can
      go badly and leave someone more convinced — and it has to be quiet, because it is not
      the point. lib/rate.js holds how far each one moves the belief; these are the words.
    */
    sure: {
      title: 'Still think that’s what happens?'
    },
    rate: {
      still: 'Still sure',
      bit: 'A bit less sure',
      lot: 'A lot less sure',
      none: 'Not sure at all',
      more: 'More sure than before'
    },

    result: {
      expected: 'You expected',
      happened: 'What actually happened',
      ladderLabel: 'How sure you are it goes badly',
      moved: 'Down {n} since you started.',
      count: {
        one: 'One test done. The second one is where it starts to stick.',
        other: '{n} tests done. Same test, different day, keeps working.'
      },
      again: 'Do it again tomorrow',
      other: 'Different test'
    },

    /*
      The ladder. One belief's grip, 1–10, never a total and never averaged across worries
      (CLAUDE.md rule 5). That rule applies to what a screen reader says as much as to what
      is on the screen: see a11y below.
    */
    ladder: {
      started: 'Started',
      now: 'Now',
      lastTime: 'Last time',
      earlier: { one: '{n} earlier test', other: '{n} earlier tests' }
    },

    /* "1st", "2nd", "3rd", "4th". Intl.PluralRules picks the form for the language. */
    ordinal: { one: '{n}st', two: '{n}nd', few: '{n}rd', other: '{n}th' },

    /* ------------------------------------------------------------------ your worries */

    /* ------------------------------------------------------------------ why this sticks */

    /*
      B18. The screen behind "Why this one sticks", offered only once a person has a result
      of their own — their evidence first, the explanation second. The twelve explanations
      are in content/why.js; these are the words around them.

      `foot` is the frozen one. It says three things and they are all load-bearing: the text
      is general (so it is a book, not a device), BETR cannot see anything, and a therapist is
      the real version of this. It is identical under all twelve, written once and translated
      once, and it points at Help rather than carrying a link of its own — every link in BETR
      lives in content/places.js and nowhere else (rule 1).
    */
    why: {
      link: 'Why this one sticks',
      title: 'Why \u201C{label}\u201D sticks',
      foot: 'This is general \u2014 it is not about you, and BETR cannot see anything you have ' +
        'written. If you want to understand it properly, that is what a CBT therapist is ' +
        'for, and Help has places to find one.'
    },

    mine: {
      title: 'Your tests',
      /*
        B29, 2026-09-08. Two counts on one screen and they mean different things: how many
        tests a person keeps, and how many times they have run them. Written as "{n} tests
        across {n} worries" the two words collided the moment "worry" became "test", so the
        second count is said as times rather than as a noun. Rule 5 is untouched: neither
        number is a score of anybody, and neither is added up across cards.
      */
      summary: '{kept}, {runs}. Tap one to do it again.',
      kept: { one: '{n} test', other: '{n} tests' },
      runs: { one: 'done once', other: 'done {n} times' },
      nothing: 'What you’ve got on the go. Nothing recorded yet.',
      onTheGo: 'On the go',
      did: 'Done it',
      notYet: 'Didn’t get to it',
      again: 'Test this again',
      foot: 'Each one is its own. Nothing here is added up, and there is no target.'
    },

    /* ------------------------------------------------------------------ install */

    install: {
      title: 'Add this to your home screen.',
      body: 'Safari wipes a web page’s saved answers after a week or so of not opening it. ' +
        'On the home screen it stays.',
      add: 'Add it',
      notNow: 'Not now',
      how: 'Share → Add to Home Screen.',
      gotIt: 'Got it'
    },

    /* ------------------------------------------------------------------ the crisis block */

    /*
      The four layers, in this order and no other (B17): the line that is true everywhere,
      then the country's own number or the plain admission that nobody has checked one, then
      one tap to say where you actually are, then the directory, labelled honestly as the
      part that needs the internet. Never a neighbour's number. Never a number from memory.
    */
    crisis: {
      title: 'If you are in danger or in crisis',
      emergency: 'If you are in danger right now, call your local emergency number.',
      in: 'In {country}:',
      call: 'Call',
      callOrText: 'Call or text',
      free: 'Free',
      allHours: '24 hours',
      unchecked: 'Your country here is {country}. Nobody has checked a helpline number for ' +
        'it, so we are not going to show you one from somewhere else and hope.',
      noCountry: 'We can’t tell which country you’re in, and we would rather show you no ' +
        'number than the wrong one.',
      notWhereYouAre: 'Not where you are?',
      sayWhere: 'Say where you are',
      directory: '{link} lists free helplines in over 175 countries, and works out your ' +
        'country itself. It is the one thing on this screen that needs the internet.',
      howWeKnow: 'How we work out the country: your phone’s time zone, read on this device ' +
        'when this screen is drawn. It is not stored, not sent, and it is the only thing ' +
        'here that has anything to do with where you are. BETR never asks your phone for ' +
        'your location and never will.'
    },

    /*
      The country list. It changes which helpline number is on the crisis block and nothing
      else in BETR — not a worry, not a test, not a word of the wording.
    */
    where: {
      title: 'Where are you?',
      sub: 'Only so the right helpline number is on the screen when it matters. It stays on ' +
        'this phone, like everything else, and there is nowhere for it to go.',
      unset: 'Go back to guessing from my time zone',
      guessing: 'Right now we are guessing from your phone’s time zone, which says {country}.',
      guessingUnknown: 'Right now we are guessing from your phone’s time zone, and it did not say.',
      chosen: 'Chosen'
    },

    /* ------------------------------------------------------------------ help */

    help: {
      /*
        B33, 2026-09-08, and it is the one line on Help that got MORE important that day.

        Frozen sentence 6 — "Choose experiments that are safe and legal…" — used to be the
        fourth thing a person read and one of nine in a numbered list. Then rule 4 loosened:
        the habit and body word lists stopped refusing a person's own test, so this sentence
        became THE ONLY PLACE THE LINE IS DRAWN. It is drawn twice now: here, third, where a
        person reads it before they read anything else about how BETR works, and again in its
        own place among the nine, word for word, because the nine are frozen as a block.

        The words are `frozen.sentences[5]`, not a copy — app.js draws that array element, so
        there is no second version of it to drift.
      */
      safeTitle: 'Choosing one that is safe',
      cbtTitle: 'What CBT is, and which bit of it this is',
      primer: [
        'CBT is a talking therapy. Its plainest idea is this: what you expect to happen ' +
          'decides what you do, and staying away from the thing keeps the expectation safe. ' +
          'You never find out you were wrong, so you stay sure.',
        'The behavioural experiment is the part of CBT that finds out. You write down what ' +
          'you think will happen, in one sentence with two halves — if I do this, then that ' +
          'will happen. You do the small thing. Then you write down what actually happened — ' +
          'not what it meant, just what was said or done. Beliefs move when the evidence is ' +
          'yours and you collected it yourself.',
        'BETR is that one part, and nothing else. It doesn’t ask how your week has been, ' +
          'doesn’t score you, doesn’t decide anything about you, and can’t see any of it. ' +
          'A therapist does far more than this, and if you can see one, please do. This is ' +
          'the piece you can do on your own, today, in about a minute.'
      ],
      /* The two words set in bold inside the second paragraph above. */
      experiment: 'behavioural experiment',
      readingIntro: 'Written by us. If you want it from people who aren’t us:',

      whatThisTitle: 'What this is',

      proofTitle: 'Don’t take our word for it',
      /*
        B26, founder 2026-09-04. The first thing under the heading, because it is the question
        a person taps Help with. Nothing in BETR said it until today — a test user went looking
        for the price before he would type a word into the app, and found four thousand pixels
        of correct writing that never once answered him (`docs/journeys-observed.md` finding 6).

        It names BETR and it does not speak for TrybeUP, whose paid plan is stated plainly in
        TrybeUP's own entry further down the same screen. If BETR ever gains a thing to buy,
        THIS SENTENCE COMES OUT THE SAME DAY. It is the one line here that could become a lie
        by something happening elsewhere, and menu.test.js only checks that it is present.
      */
      free: 'BETR is free. No ads, no subscription, nothing to buy, and nothing to unlock.',
      airplane: 'Turn on airplane mode. Everything still works, because nothing here ever ' +
        'needed the internet. Loading this page is the only thing any server ever sees, and ' +
        'we keep no record of it.',
      proofResults: 'results on this phone',
      proofAccounts: 'accounts',
      proofSent: 'sent to us, ever',
      zeroBytes: '0 B',

      placesTitle: 'Other places, none of them run by us',

      whoTitle: 'Who made this',
      who: 'This is for doing it alone. The people who made it also make TrybeUP, where the ' +
        'same thing is done in small private groups. Only if and when you want that.',

      codeTitle: 'The code',
      code: 'BETR is plain HTML, CSS and JavaScript with no libraries, small enough to read ' +
        'in an evening. This build:',
      devBuild: 'Dev build — not published',

      /*
        The language switch (B15). One line in Help, never a picker on the front screen and
        never a first-run question (CLAUDE.md rule 10). It is not drawn at all while English
        is the only language there is, which is why nobody sees these two lines yet.
      */
      langTitle: 'Language',
      langNote: 'Every language BETR has is already on this device. Choosing one fetches nothing.'
    },

    /* ------------------------------------------------------------------ export and delete */

    io: {
      export: 'Export everything',
      wipe: 'Delete everything',
      copy: 'Copy it',
      copied: 'Copied',
      share: 'Send it somewhere',
      deleteAsk: 'Delete everything on this phone? There is no copy anywhere else, and we ' +
        'cannot get it back for you.',
      deleteYes: 'Delete it all',
      deleteNo: 'Keep it',
      /* Written into the exported file itself, so the person reads it wherever it ends up. */
      exportNote: 'Everything BETR has ever stored on this device. There is no copy anywhere else.'
    },

    /* ------------------------------------------------------------------ said, not shown */

    /*
      What a screen reader reads and a sighted person never sees.

      Rule 5 applies here exactly as it applies to the screen: a rung is one belief's grip,
      out of ten, next to the day it was tested. There is no total here, no average across
      worries, no trend and no target — and if one is ever added to the screen it must not be
      added here either.
    */
    a11y: {
      ladder: 'How sure you are that: “{belief}”. Ten is completely sure, one is not sure at all.',
      ladderPlain: 'How sure you are it goes badly. Ten is completely sure, one is not sure at all.',
      /* The same group on the front screen's worked example, in that card's voice (B38). */
      ladderPlainExample: 'How sure they were it goes badly. Ten is completely sure, one is not sure at all.',
      rung: '{when}: {level} out of 10.',
      /* B42. Which size that test was done at, read out after the rung it moved to. A fact
         about the test; there is nothing here that compares one row with another. */
      rungSize: 'Done at: {size}.',
      down: { one: 'Down one rung.', other: 'Down {n} rungs.' },
      up: { one: 'Up one rung.', other: 'Up {n} rungs.' },
      same: 'No change.',
      /*
        The result screen is the product, so it gets a sentence rather than a shape. There is
        no full stop after {expected} or {happened}: the app puts one there if the person's
        own sentence did not already end in one, so it never reads out "coffee.. How sure".
      */
      result: 'You expected: {expected} What actually happened: {happened} How sure you ' +
        'are it goes badly: {level} out of 10.',
      dropped: 'Left out: {drop}.',
      countryChanged: 'Helpline numbers now shown for {country}.'
    }
  }
};

/*
  One line per language. B16 adds strings-fr.js with the same two lines and changes nothing
  else: the app reads Betr.strings, and i18n.js falls back to English key by key.
*/
if (typeof module === 'object' && module.exports) module.exports = BETR_STRINGS_EN;
else {
  self.Betr = self.Betr || {};
  self.Betr.strings = self.Betr.strings || {};
  self.Betr.strings.en = BETR_STRINGS_EN;
}
