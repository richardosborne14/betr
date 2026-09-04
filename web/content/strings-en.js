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

    /* Three doors, on every screen. Not a tab bar (CLAUDE.md rule 10): never a fourth. */
    nav: {
      label: 'BETR',
      mine: 'Your worries',
      new: 'New worry',
      help: 'Help'
    },

    /* ------------------------------------------------------------------ the front screen */

    start: {
      /*
        2026-09-04. The front screen's job changed. It used to describe the loop; it now has to
        say, before anything else, WHICH WORRIES THIS IS FOR — because a test user wrote "if I
        eat gluten, then I'll feel sick" and the app had never once told him it was not for
        that. Nothing else in fifteen screens says it either.

        It cannot say "irrational". Research §4.3 rules that word out from three directions at
        once: Gilbert's clients could see their thoughts were irrational and felt no different,
        Luoma found fast shame reduction predicted MORE use later, and shame-proneness is the
        trait that predicts problems. "Irrational" is a verdict (rule 6) and it is the verdict
        this audience has already passed on themselves.

        So the boundary is drawn as a description instead of a rule, and the description is the
        rehearsal: the thing you run in your head every day and have never once let happen. A
        gluten intolerance has happened, every time. It fails the sentence on sight, and nobody
        has been told anything about themselves.
      */
      title: 'You’ve played it out a hundred times.',
      sub: 'It’s never once gone that way. Try it for real today, and write down what did happen.',
      /*
        B19. It used to say "Pick a worry" and lead straight to the list. It leads to the
        doors now, and "Not sure which? Start from what's going on" is gone with the change:
        it was the second way in, and the second way in turned out to be the only one two
        test users could read.
      */
      go: 'Pick a worry',
      /*
        B25, 2026-09-04. Scope §3: "Everything starts at 10 — that is what the front screen
        says." The old headline, "Sure it'll go badly?", said it in its first word. The new one
        does not, and the line went with it — so a test user finished his first test, saw
        10 → 9, and had nothing to read it against: he had arrived from a post showing
        somebody at 6.

        It says where the number starts and that it moves. It may never say how far, how fast,
        or where anybody else got to (rule 5, and research §5.4 on claims), and "what actually
        happens" is direction-neutral on purpose — a test can leave a person more sure.
      */
      ladder: 'Every worry starts at ten out of ten — that’s how sure you are. It moves when you find out what happens.',
      /* The trust line, with the human half first. §9.2: airplane mode is the proof. */
      promise: 'Nobody sees this but you. No account, no AI, nothing leaves your phone.',
      noStorage: 'This browser won’t let BETR remember anything — a private window usually ' +
        'does that. The loop still works; nothing will be here tomorrow.'
    },

    /* What is on the go. Never a tally, never an age, never a count (B8). */
    waiting: {
      onTheGo: 'On the go.',
      pickUp: 'Pick it up',
      many: 'Tests you’ve got on the go'
    },

    /* ------------------------------------------------------------------ the second door */

    doors: {
      title: 'What’s going on?',
      /* Nobody is in all six, and the way out of the screen is the way out of a door. */
      own: 'None of these — I’ll write my own',
      foot: 'None of these is a diagnosis, and BETR never decides which one you are.'
    },

    /* ------------------------------------------------------------------ picking a worry */

    pick: {
      title: 'Which one?',
      sub: 'Tap the one that’s closest.',
      own: 'Something else',
      notHere: 'Nothing here tests the thing itself, only what you expect to happen without ' +
        'it. That’s the worry underneath, and that’s what we test.'
    },

    /* ------------------------------------------------- which of these is it? (B20) */

    /*
      The screen between the list and the test. The worry's label is the heading, so these
      three lines are all the words around it: the three predictions themselves are in
      content/worries.js, because they are the product and not the interface.

      `sub` has one job and it is a hard one — to say "these are three different worries, not
      three ways of saying one" in a line and a half, to somebody who has tapped once and
      wants to get on with it. `foot` is why the choice matters at all, and it is the only
      place in BETR that explains what makes an experiment work, in a sentence.
    */
    belief: {
      sub: 'Which of these is the bit you’re actually worried about? Under each one is what you’d be braced for.',
      own: 'None of these — I’ll put it my own way',
      foot: 'Pick the one that would sting. A worry that’s only nearly yours can’t be proved wrong by anything that happens today.'
    },

    /* ------------------------------------------------------- a person's own entry */

    own: {
      label: 'Your own',
      next: 'Next',
      /* The second tap on a nudged sentence. Their words go through unchanged. */
      keep: 'Keep mine as it is',
      /* Already in the box when it opens: the opening half of a conditional, not a hint. */
      beliefSeed: 'If I ',
      belief: {
        title: 'What do you think will happen?',
        /*
          "Write the version you play out" is the front screen's sentence arriving where it is
          actionable. It also asks for the right thing clinically: the prediction has to be the
          feared one, specific enough to be checked (research §2.3), not a tidy summary.
        */
        sub: 'Write the version you play out. One sentence, and make it about people.',
        /*
          The boundary, and the whole reason 2026-09-04 happened. Every one of the twenty-one
          worries in content/worries.js is about what other people will think, say or do; not
          one is about what the world will physically do to you. That was true and unwritten.
          "Never found out" is the half that excludes a true worry without judging anybody.
        */
        only: 'Not the weather, and not your body. Only the ones you’ve never actually found out about.',
        placeholder: 'If I ask for a day off, my boss will think I’m not committed.'
      },
      test: {
        title: 'What will you do?',
        sub: 'One thing, today. Small, cheap, and entirely up to you.',
        placeholder: 'Ask for Friday off, in one sentence, with no reason given.'
      },
      drop: {
        title: 'What will you leave out?',
        sub: 'The thing you’d normally do to take the edge off it. Leaving it out is what makes it a test.',
        placeholder: 'Don’t explain why. Don’t offer to make the time up.'
      }
    },

    /*
      The refusals. lib/guards.js decides, this file says it — so the guard has no words in
      it and no phone number in it, which is what B17 fixed and what must not come back.
      A refusal explains, because refusing quietly teaches nothing.
    */
    refusal: {
      habit: 'That test involves the thing itself. Those aren’t tests — the worry underneath ' +
        'is. Try one about what people will think, or about what happens when you go ' +
        'without it.',
      body: 'BETR doesn’t do tests about food, weight or what your body is doing. Those need ' +
        'a person, not this.',
      harm: 'BETR can’t help with that one, and it would be wrong to pretend otherwise.',
      verdict: 'That’s a verdict, not a prediction. What do you think would happen because of it?',
      notConditional: 'Start it with “If I…”. It has to be something that could turn out to be wrong.',
      noConsequence: 'Say what you think happens next: “If I ___, then ___”.',
      emptyTest: 'Write the one thing you’ll do today.',
      emptyBelief: 'Write what you think will happen.'
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
      lock: 'I’ll do it today',
      lockNote: 'That locks in what you expect, so later you can’t talk yourself out of what ' +
        'actually happened.'
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
      title: 'Go and do it.',
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
        other: '{n} tests done. Same worry, different day, keeps working.'
      },
      again: 'Do it again tomorrow',
      other: 'Different worry'
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
      title: 'Your worries',
      summary: '{tests} across {worries}. Tap one to test it again.',
      tests: { one: '{n} test', other: '{n} tests' },
      worries: { one: '{n} worry', other: '{n} worries' },
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
      cbtTitle: 'What CBT is, and which bit of it this is',
      primer: [
        'CBT is a talking therapy. Its plainest idea is this: what you expect to happen ' +
          'decides what you do, and staying away from the thing keeps the expectation safe. ' +
          'You never find out you were wrong, so you stay sure.',
        'The behavioural experiment is the part of CBT that finds out. You write down what ' +
          'you think will happen. You do one small thing. Then you write down what actually ' +
          'happened — not what it meant, just what was said or done. Beliefs move when the ' +
          'evidence is yours and you collected it yourself.',
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
      rung: '{when}: {level} out of 10.',
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
