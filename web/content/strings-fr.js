/*
  Every word a person can read in BETR, in French (B16, first draft, 2026-09-16).

  ── WHAT THIS IS, AND WHAT IT IS NOT ───────────────────────────────────────────────────

  This is a FIRST DRAFT, written in one session, and nobody has signed it off. B16 says the
  founder reads and approves the French themselves. Until they have, this file is something
  to read and argue with, not something to ship.

  ── WHAT IS DELIBERATELY MISSING ───────────────────────────────────────────────────────

  Three blocks are NOT here, and their absence is the point. A missing key falls back to
  English one key at a time (lib/i18n.js), so a French reader sees them in English:

    frozen   the purpose statement and the nine sentences. They are frozen (CLAUDE.md rule 7)
             and a translation of them is approved ONCE, by a named person, and then frozen
             the same way. A draft translation of a "not a medical device" sentence is not a
             small thing to get wrong, and it is not mine to write.
    crisis   the words around a helpline number, and the country list. Read by somebody in
             trouble. The founder signs these off separately, and the country NAMES come from
             content/helplines.js, which is English — so translating the wording alone would
             produce "les numéros de the United Kingdom". Both move together or neither does.
    help     the whole Help screen: what CBT is, the airplane-mode proof, TrybeUP's block,
             what it costs. Rule 9's three safeguard sentences live there and menu.test.js
             pins them; they get their own pass, not this one.

  So today a French reader gets: the loop in French, Help and the crisis block in English.
  That is a HALF-TRANSLATED APP and it is visible on the screen. It is fine on the `redesign`
  branch, which publishes nothing. It is not fine on the live address.

  ── THE ONE THING THAT NEEDS CODE, NOT WORDS ───────────────────────────────────────────

  `front.ifWords` is « Si je », and French elides: "si j’appelle", not "si je appelle". The
  app prints ifWords and then whatever the person typed, so a blank that starts with a vowel
  reads wrong. Nothing here can fix it — see B16 and docs/NEXT-SESSION.md. The two ways out
  are a `front.ifWordsElided` key the app picks when the blank starts with a vowel, or an
  ifWords of « Si » with the person writing "je" themselves. The founder chooses.

  ── THE RULES THAT TRAVEL WITH THIS FILE ───────────────────────────────────────────────

  - `tu` throughout, the founder's call, 2026-09-16. Not `vous`. Changing it changes every
    screen and it is a tone decision, not a grammar one.
  - The wordmark is BETR, all caps. Nothing a person taps is all-lowercase.
  - The word for the thing a person writes is « prédiction » — for a hope and a worry alike.
    It leans slightly more towards fortune-telling than the English does; that is a live
    question for the founder and it is written down in B16.
  - No crisis phone number is ever written in this file, in any language. Numbers live in
    content/helplines.js with the page they were read on and the day somebody read it there,
    and THE COUNTRY decides them, never the language: a French speaker in Texas gets 988.
  - The phrases that never appear, in any language, including in translation: "digital CBT",
    "treats", "reduces symptoms", "for people with [diagnosis]", "tracks your anxiety",
    "improve your mental health", "irrational", "streak".
  - Every apostrophe is ’ (U+2019), not '. House style, and also: the strings are quoted
    with ' and a plain apostrophe would end them mid-sentence.
*/
var BETR_STRINGS_FR = {
  lang: 'fr',
  dir: 'ltr',
  name: 'Français',

  s: {

    /* ------------------------------------------------------------------ everywhere */

    brand: 'BETR',
    back: 'Retour',

    foot: {
      label: 'BETR',
      mine: 'Tes prédictions',
      why: 'Comment ça marche',
      help: 'Aide'
    },

    /* ------------------------------------------------------------------ 1 · the front */

    front: {
      title: 'À ton avis, qu’est-ce qui va se passer ?',
      sub: 'Tout de suite, plus tard dans la journée, un jour dans ta vie — quand tu veux.',
      /* See the header: « Si je » does not elide, and only app.js can fix that. */
      ifWords: 'Si je',
      thenWords: ', alors',
      stop: '.',
      ifLabel: 'Si je… — ce que tu vas faire',
      thenLabel: '…alors — ce que tu penses qu’il va se passer',
      /*
        "Lock it in" is the load-bearing word on this screen: the prediction is locked BEFORE
        you find out, which is the whole method. « Je la verrouille » is literal and a little
        technical. For the founder, with « Je m’engage » and « C’est noté » as the other two.
      */
      lock: 'Je la verrouille',
      note: 'Ensuite, va voir ce que ça donne. Rien ne quitte ton téléphone.',
      noteLocked: 'Elle reste telle que tu l’as écrite : ce qui arrivera ne pourra pas la réécrire.'
    },

    /* ------------------------------------------------------------------ 3 · locked in */

    on: {
      /* Drawn in capitals by the stylesheet, so it is written normally here. */
      kicker: 'Verrouillé',
      ask: 'Va voir ce que ça donne.',
      sub: 'On la garde ici, dans tes mots à toi. Reviens dire ce qui s’est passé.',
      done: 'C’est fait',
      notToday: 'Pas aujourd’hui. Garde-la pour demain.'
    },

    /* ------------------------------------------------------------------ 4 · how did it go */

    /*
      The friend asking "SOOOO, how did it go??". A question about the person's own
      prediction, never a verdict on them — and it must not become one in French either.
      These three words also label every result afterwards, in capitals.
    */
    go: {
      ask: 'Ça s’est passé comme tu pensais ?',
      yeah: 'Ouais !',
      sort: 'À peu près',
      not: 'Pas vraiment'
    },

    /* ------------------------------------------------------------------ 5 · what happened */

    happened: {
      ask: 'Qu’est-ce qui s’est passé ?',
      keep: 'Je le garde',
      empty: 'Écris d’abord ce qui s’est passé, avec tes mots à toi.'
    },

    /* ------------------------------------------------------------------ 6 · your results */

    log: {
      list: 'Ce qui s’est passé, le plus récent en premier',
      again: 'Je recommence demain',
      done: 'J’en ai fini avec celle-ci',
      back: 'La reprendre'
    },

    /* ------------------------------------------------------------------ 7 · your predictions */

    mine: {
      title: 'Tes prédictions',
      new: 'Nouvelle prédiction',
      away: 'Rangées',
      locked: 'Verrouillée'
    },

    /* ------------------------------------------------------------------ 8 · how it works */

    why: {
      title: 'Comment ça marche',
      guess: 'Un espoir que tu n’as jamais vérifié, c’est une supposition. Une inquiétude ' +
        'aussi. Tu peux porter l’un ou l’autre pendant des années sans jamais savoir.',
      /* "de ton côté" rather than "seul", which would have to pick a gender. */
      method: 'Écris-le d’abord, va le faire, puis écris ce qui s’est passé. Fais ça ' +
        'plusieurs fois et relis-le. C’est toute la méthode, et c’est un morceau d’une ' +
        'thérapie par la parole très étudiée — le morceau que tu peux faire de ton côté.',
      help: 'Si ça va vraiment mal en ce moment, ce n’est pas ce qu’il te faut. La page Aide ' +
        'donne de vraies personnes.',
      write: 'En écrire une'
    },

    /* ------------------------------------------------------------------ when BETR says no */

    /*
      CAVEAT, and it is the loudest thing in this file: `harm` is drawn with the crisis block
      underneath it, and the crisis block is still English. A person who has just written the
      worst sentence they have reads one line of French and then a screen of English. That is
      the first thing to fix when the crisis wording is signed off, and it is why this file
      does not go anywhere near the live address on its own.
    */
    refusal: {
      harm: 'BETR ne peut pas t’aider avec celle-là, et ce serait malhonnête de faire semblant.',
      verdict: 'C’est un jugement, pas une prédiction. Qu’est-ce qui se passerait, d’après ' +
        'toi, à cause de ça ?',
      notConditional: 'Commence par « Si je… ». Il faut que ça puisse se révéler faux.',
      noConsequence: 'Dis ce qui se passe ensuite, d’après toi : « Si je ___, alors ___ ».',
      emptyTest: 'Écris la seule chose que tu vas faire aujourd’hui.',
      emptyBelief: 'Écris ce que tu penses qu’il va se passer.',
      emptyIf: 'Écris ce que tu vas faire. Ça vient après « Si je ».'
    },

    nudge: {
      shape: 'Ça marche mieux sous la forme « Si je ___, alors ___ ». Par exemple : Si je ' +
        'demande mon vendredi, alors mon patron va penser que je me la coule douce. Ou garde ' +
        'la tienne telle quelle.'
    },

    /* ------------------------------------------------------------------ install */

    install: {
      title: 'Ajoute BETR à ton écran d’accueil.',
      body: 'Safari efface ce qu’une page web a enregistré au bout d’une semaine environ ' +
        'sans l’ouvrir. Sur l’écran d’accueil, ça reste.',
      add: 'Je l’ajoute',
      notNow: 'Pas maintenant',
      how: 'Partager → Sur l’écran d’accueil.',
      gotIt: 'C’est compris'
    },

    /* ------------------------------------------------------------------ export and delete */

    io: {
      export: 'Tout exporter',
      wipe: 'Tout supprimer',
      copy: 'Copier',
      copied: 'Copié',
      share: 'L’envoyer quelque part',
      deleteAsk: 'Tout supprimer sur ce téléphone ? Il n’y a de copie nulle part ailleurs, ' +
        'et nous ne pourrons pas te la récupérer.',
      deleteYes: 'Oui, tout supprimer',
      deleteNo: 'Je garde tout',
      exportNote: 'Tout ce que BETR a enregistré sur cet appareil. Il n’y a de copie nulle ' +
        'part ailleurs.'
    }
  }
};

if (typeof module === 'object' && module.exports) module.exports = BETR_STRINGS_FR;
else {
  self.Betr = self.Betr || {};
  self.Betr.strings = self.Betr.strings || {};
  self.Betr.strings.fr = BETR_STRINGS_FR;
}
