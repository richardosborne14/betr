/*
  Every word a person can read in BETR, in English (B15, 2026-09-03; rewritten for B56, 2026-09-15).

  Before B15, roughly a hundred and fifty sentences lived as string literals inside app.js.
  That made a second language a rewrite rather than a translation, and it made it impossible
  to check in one place what the app actually says. Now app.js contains no sentence a person
  reads; web/tests/i18n.test.js fails the build if one comes back.

  B56 made this file about a third of the size it was. The stock list, the doors, the sizes,
  the ladder, the tally and every word around them are gone from the app, and so are their
  strings. What is left is the eight screens of the redesign, and — carried over byte for byte
  — the frozen sentences, the crisis block, the country list, Help, export and delete.

  How to add a language (B16, and it is mostly not a coding job):
    1. copy this file to strings-<code>.js, keep every key, translate the values
    2. set `lang`, `dir` ('rtl' for Arabic, Hebrew, Farsi, Urdu) and `name` — the name in the
       language's own words, so a person can find it: Français, not French
    3. add one <script> line to index.html and one to tests/harness.js. Nothing else changes.
  A missing key falls back to English on its own, so a half-finished language still works.

  Why this is a .js file and not strings-en.json: the founder opens web/index.html straight off
  the filesystem, and a browser will not fetch JSON (or load an ES module) from a file:// page.
  It is still plain data. No logic, ever.

  THE RULES THAT TRAVEL WITH THIS FILE

  - `frozen` below is frozen. The purpose statement and the nine sentences are verbatim from
    docs/research/10-cbt-gateway-approach.md §10, and CLAUDE.md rule 7 says they appear word
    for word. Do not tidy them, do not shorten them, do not "improve" them. In another
    language they are approved once, by a named person, in B16, and then frozen the same way.
  - The phrases that never appear, in any language: "digital CBT", "treats", "reduces
    symptoms", "for people with [diagnosis]", "tracks your anxiety", "improve your mental
    health", "irrational", "streak".
  - The wordmark is BETR, all caps, everywhere. Nothing a person taps is all-lowercase.
  - The word for the thing a person writes is PREDICTION (B56 §2, founder, 2026-09-15) — for a
    hope and a worry alike. Not test, not worry, not hope, not bet.
  - No crisis phone number is written in this file. Numbers live in content/helplines.js with
    the page they were read on and the day somebody read it there, and the country decides
    them — not the language. The words around a number are here; the number never is.

  `{country}` and the rest are filled in by the app; keep them, and move them wherever the
  sentence needs them to be.
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
      Three grey words at the foot of every screen (B56 §2 item 13). They replaced the row of
      three at the bottom (B8), and the rule that row lived under still holds: plain words, no
      icons, no selected state, no badge, no count, and never a fourth.
    */
    foot: {
      label: 'BETR',
      mine: 'Your predictions',
      why: 'How it works',
      help: 'Help'
    },

    /* ------------------------------------------------------------------ 1 · the front */

    /*
      The front screen is the writing page (B56 §2 item 2, founder: "Go with 1b"). The sentence
      a person locks in is four pieces joined — ifWords, the first blank, thenWords, the second
      blank, and stop if they did not end it themselves. So a translation that moves the
      blanks around is a job for app.js, not only for this file: say so in B16.
    */
    front: {
      title: 'What do you think will happen?',
      ifWords: 'If I',
      thenWords: ', then',
      stop: '.',
      /* What a screen reader calls each blank. Each one has to make sense read on its own. */
      ifLabel: 'If I… — what you’ll do',
      thenLabel: '…then — what you think will happen',
      lock: 'Lock it in',
      note: 'Then go and find out. Nothing leaves your phone.',
      /* Once both blanks have words in them (research/10 §2.3: the prediction is locked BEFORE). */
      noteLocked: 'That keeps it as you wrote it, so what happens can’t rewrite it.'
    },

    /* ------------------------------------------------------------------ 3 · locked in */

    on: {
      kicker: 'Locked in',
      ask: 'Go and find out.',
      done: 'Done it',
      /* Rule 5: nothing is recorded, nothing is lost, and nothing says you missed it. */
      notToday: 'Not today. Keep it for tomorrow.'
    },

    /* ------------------------------------------------------------------ 4 · how did it go */

    /*
      Founder, 2026-09-15: "like a friend being 'SOOOO, how did it go??'". The question comes
      first and the words come second. It is a question about the person's own prediction, not
      a verdict on them, and it must not become one in translation.

      The three words also label every result afterwards, in capitals, on the results and on
      Your predictions — so a change here changes the tag everywhere, which is the point.
    */
    go: {
      ask: 'Did it go how you expected?',
      yeah: 'Yeah!',
      sort: 'Sort of',
      not: 'Not really'
    },

    /* ------------------------------------------------------------------ 5 · what happened */

    happened: {
      ask: 'What happened?',
      keep: 'Keep it',
      /* Read out if Keep it is tapped with nothing written. The words are the point (B56 §3). */
      empty: 'Write down what happened first, in your own words.'
    },

    /* ------------------------------------------------------------------ 6 · your results */

    log: {
      /* What a screen reader calls the list. Never shown. */
      list: 'What happened, newest first',
      again: 'Same again tomorrow',
      /* Puts it away. Nothing is deleted, and the export still has it. */
      done: 'Done with this one',
      back: 'Bring it back'
    },

    /* ------------------------------------------------------------------ 7 · your predictions */

    mine: {
      title: 'Your predictions',
      new: 'New prediction',
      away: 'Put away',
      locked: 'Locked in'
    },

    /* ------------------------------------------------------------------ 8 · how it works */

    /*
      Research/12 §2: explaining it is the intervention. Fresh wording (rule 8). If the founder
      wants the fixed next steps (same again, raise it, without the safety net) they go here as
      one more paragraph and nowhere else — B56 §9a.
    */
    why: {
      title: 'How it works',
      guess: 'A hope you’ve never tested is a guess. So is a worry. You can carry either for ' +
        'years and never find out.',
      method: 'Write it down first, go and do it, then write down what happened. Do that a few ' +
        'times and read it back. That’s the whole method, and it’s one piece of a well-studied ' +
        'talking therapy — the piece you can do alone.',
      help: 'If you’re in a bad place right now, this isn’t the thing. Help has real people.',
      write: 'Write one'
    },

    /* ------------------------------------------------------------------ when BETR says no */

    /*
      One hard stop, on both blanks: a sentence about ending it, or hurting anyone. The rest of
      the keys are what lib/guards.js can still return; the front screen only ever shows harm,
      and reads out the two empty-blank lines rather than drawing them.
    */
    refusal: {
      harm: 'BETR can’t help with that one, and it would be wrong to pretend otherwise.',
      verdict: 'That’s a verdict, not a prediction. What do you think would happen because of it?',
      notConditional: 'Start it with “If I…”. It has to be something that could turn out to be wrong.',
      noConsequence: 'Say what you think happens next: “If I ___, then ___”.',
      emptyTest: 'Write the one thing you’ll do today.',
      emptyBelief: 'Write what you think will happen.',
      emptyIf: 'Write what you’ll do. It goes after “If I”.'
    },

    /* guards.checkBelief can still return this; nothing in the app draws it (B32). */
    nudge: {
      shape: 'These work best as “If I ___, then ___”. Like: If I ask for Friday off, then my ' +
        'boss will think I’m slacking. Or keep yours as it is.'
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
      /*
        B52, 2026-09-10, founder's call, and it changed twice that day. It said "and we keep
        no record of it" until the tally was built; then the founder asked whether the count
        could exclude robots, so a second count was added and this changed again. The
        sentence and the server setting move together or one of them is a lie.

        What the server keeps is two files of "1"s, named for the day: every open, and every
        open that did not say it was a robot. No address — BETR is not even told one — no
        referrer, no clock time. The user agent is READ to tell the two counts apart and is
        never written anywhere, which is why this says "written down" rather than "seen".

        "not even the time of day" is exact and was chosen over "not the time": the DAY is
        recorded, in the name of the file. The time of day is not recorded at all.

        `tests/deploy.test.js` holds the server to an allow-list of what it may read at all,
        and this sentence is why those tests exist.

        Frozen sentence 8 is untouched and still exactly true: it is about what a person
        WRITES, and nothing a person writes has ever left their phone.
      */
      airplane: 'Turn on airplane mode. Everything still works, because nothing here ever ' +
        'needed the internet. Loading this page is the only thing any server ever sees. We ' +
        'keep two counts — how many times the page was opened each day, and how many of ' +
        'those were not robots — and nothing else. Nothing about you is written down: not ' +
        'your address, not your browser, not even the time of day.',
      proofAccounts: 'accounts',
      proofSent: 'sent to us, ever',
      zeroBytes: '0 B',

      placesTitle: 'Other places, none of them run by us',

      whoTitle: 'Who made this',
      who: 'This is for doing it alone. The people who made it also make TrybeUP, where the ' +
        'same thing is done in small private groups. Only if and when you want that.',

      /*
        B54, 2026-09-12, the founder's call: the lineage was too quiet. Rule 9 has said since
        2026-09-01 that TrybeUP is "never styled apart", and this block is styled apart — a
        logo, the wordmark, and four sentences saying what TrybeUP is. The founder amended
        their own rule knowingly and it is recorded in CLAUDE.md rule 9 and in B54.

        THREE OF THESE FOUR SENTENCES ARE SAFEGUARDS, NOT COPY, and B8's conditions are why:

          makerCost   says what it costs BEFORE a person taps, including the paywall. A person
                      who meets an unexpected paid plan after signing up is the exact failure
                      B8's third condition exists to prevent, and research §7.1 is why B6's
                      bridge is still gated. `places.js` says the same thing in its own entry;
                      both say it, and if TrybeUP's free tier changes THEY BOTH CHANGE.
          makerAI     names the AI coach on purpose. BETR has no AI and says so; TrybeUP has
                      one. Hidden ownership or a hidden feature discovered later is the
                      betrayal this audience is braced for (research §4), so it is disclosed
                      here, beside the boundary, rather than found out after an account.
          makerApart  draws the line. It is the sentence that keeps a branded block from
                      reading as "and this app is part of that one".

        makerTag is TrybeUP's own headline, word for word, sitting under TrybeUP's own logo so
        there is no question who is speaking. Rule 8 is about CBT providers' wording; this is
        ours to use.
      */
      makerName: 'TrybeUP™',
      makerTag: 'Tell us one problem. We’ll give you one thing to do a day.',
      makerWhat: 'TrybeUP is a personal-change app. You describe what you most want to fix, ' +
        'in your own words, and it turns that into one small daily step, tracked honestly. ' +
        'Done, or rest — and rest never counts against you.',
      makerAI: 'Habits, workouts, nutrition, an AI coach and a community are a tap away when ' +
        'you want more of it.',
      makerCost: 'Free to start. One-to-one chat is free, and the private groups need a paid plan.',
      makerApart: 'It is an account on their servers, which is the opposite of BETR on ' +
        'purpose. Nothing you write here goes there, and BETR still sends nothing to them or ' +
        'to anybody else.',
      makerLink: 'TrybeUP.com',
      makerLinkWhat: 'their own description, in full. It opens in your browser and needs the internet.',

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

    a11y: {
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
