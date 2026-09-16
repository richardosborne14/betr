/*
  Every word a person can read in BETR, in French (B16, first draft, 2026-09-16).

  ── WHAT THIS IS, AND WHAT IT IS NOT ───────────────────────────────────────────────────

  This is a FIRST DRAFT, written in one session, and nobody has signed it off. B16 says the
  founder reads and approves the French themselves. Until they have, this file is something
  to read and argue with, not something to ship.

  ── WHAT NEEDS A SIGNATURE BEFORE IT SHIPS ────────────────────────────────────────

  Since 2026-09-16 every block is here, the whole of Help included, at the founder's ask.
  Three parts are DRAFTS OF THINGS THAT ARE NORMALLY FROZEN OR PINNED, and the founder — the
  named person who approves this language (B16) — signs them off before a French build ships:

    frozen   the purpose statement and the nine sentences. In English they are verbatim from
             the research and never reworded (CLAUDE.md rule 7). These are a faithful
             translation, NOT a rewrite: sentence 2 still says "rate the belief again" and the
             purpose still says "pick a worry", because the English does, and fixing those is
             B56 §9c's decision in both languages at once. Once signed off, these are frozen in
             French the same way. « dispositif médical » is the EU's legal term, on purpose,
             and B16 §3 asks for a jurisdiction look before any French store listing.
             Sentence 7 is the one place in this file with phone numbers in it, exactly as in
             English, and app.js makes them tappable by matching "988", "116 123" and
             "findahelpline.com" — so those three must stay written exactly like that.
    help.who*     B57, 2026-09-16: Digital Bricks, the code, and nothing about any other product.

  The links' descriptions on Help live in content/places.js, each with its French beside it.

  ── ELISION, BUILT 2026-09-16 ─────────────────────────────────────

  « Si je » becomes « Si j’ » in front of a vowel, and the app does it as the person types.
  `ifWordsElided` and `noElision` below are how, and both live here rather than in app.js
  because which words elide is a fact about French, not about BETR.

  ── THE RULES THAT TRAVEL WITH THIS FILE ───────────────────────────────────────────────

  - `tu` throughout, the founder's call, 2026-09-16. Not `vous`. Changing it changes every
    screen and it is a tone decision, not a grammar one.
  - The wordmark is BETR, all caps. Nothing a person taps is all-lowercase.
  - THE WORD FOR THE THING A PERSON WRITES IS « PARI » (founder, 2026-09-16) — for a hope and a
    worry alike. Not « prédiction », which read technical and a little like fortune-telling.
    CLAUDE.md rule 3 says "not bet" IN ENGLISH, because of the gambling echo there; the founder
    decided that echo is weaker in French, where « je te parie que… » is how people talk. It is
    recorded under rule 3, so a later session does not "correct" it back.
  - « PARI » IS MASCULINE, and French agrees. Every « le », « celui-ci », « écrit » and « Rangés »
    below agrees with it. Change the word and read every line of this file for agreement.
  - The act is « s’engager » and the state is « engagé » (founder, 2026-09-16): the button says
    « Je m’engage » and a locked-in pari is tagged ENGAGÉ. The thing is a pari; what you do with
    it is commit.
  - No crisis phone number is ever written in this file, EXCEPT inside frozen sentence 7, as in
    English. Numbers live in
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

    /* ------------------------------------------------------------------ frozen, in draft */

    /*
      A FAITHFUL TRANSLATION OF THE ENGLISH, NOT A REWRITE, awaiting the founder's sign-off
      (2026-09-16). See the header. `tu`, like the rest of the app. Where the English says "it"
      and French would have to pick a gender, sentence 1 names it a « fiche » and the rest say
      « elle »; sentences 5 and 6 are written to need no gender for the reader at all.
    */
    frozen: {
      purpose: 'BETR t’aide à mettre à l’épreuve, dans la vie de tous les jours, des croyances qui ne ' +
        't’aident pas. Tu choisis une inquiétude sur la façon dont les gens vont réagir, BETR te ' +
        'propose une petite chose à essayer aujourd’hui, et tu notes ce qui s’est réellement passé.',

      sentences: [
        'Ceci est une fiche d’exercices d’auto-assistance, pas une thérapie, et ce n’est pas un dispositif médical. Elle ne diagnostique, ne traite, ne guérit et ne prévient aucune maladie ni aucun trouble.',
        'Elle utilise une technique de la thérapie cognitivo-comportementale (TCC), l’expérience comportementale : écrire une croyance, prédire ce qui va se passer, essayer, noter ce qui s’est réellement passé, et évaluer à nouveau la croyance.',
        'Elle peut t’aider à gérer les inquiétudes du quotidien et les croyances qui ne t’aident pas. Elle ne les fera pas disparaître, et elle ne remplace pas un travail avec un thérapeute TCC qualifié. Si tu peux en voir un, fais-le.',
        'Elle n’est pas pour toi en ce moment si tu as des pensées suicidaires ou d’automutilation, si on t’a dit que tu avais une psychose ou un trouble bipolaire, si tu as un trouble du comportement alimentaire, un TSPT ou un TOC, ou en cas de dépendance à l’alcool ou aux drogues. Tout cela demande une personne, pas une application.',
        'Si tu es déjà en thérapie, suis ce que prévoit ta thérapie. N’utilise ceci qu’avec l’accord de la personne qui t’accompagne.',
        'Choisis des expériences sûres et légales. N’en conçois jamais une qui touche à l’habitude que tu essaies de changer, à l’automutilation, au fait de te priver de nourriture, ou qui te mette en danger, toi ou quelqu’un d’autre.',
        'Si tu es en danger ou en crise, appelle le numéro d’urgence local. Aux États-Unis, appelle ou envoie un SMS au 988. Au Royaume-Uni et en Irlande, appelle gratuitement les Samaritans au 116 123. Ailleurs, findahelpline.com répertorie des lignes d’écoute gratuites dans plus de 175 pays.',
        'Tout ce que tu écris reste sur cet appareil. Il n’y a pas de compte, pas de serveur, et rien n’est envoyé, ni à nous ni à personne. Si tu supprimes l’application sans exporter, tes entrées sont perdues.',
        'Elle a été faite par Digital Bricks, pas par un clinicien ni par un service de santé. Rien ici n’est un avis médical, et l’utiliser ne crée pas de relation entre un thérapeute et son patient.'
      ]
    },

    /* ------------------------------------------------------------------ everywhere */

    brand: 'BETR',
    back: 'Retour',

    foot: {
      label: 'BETR',
      mine: 'Tes paris',
      why: 'Comment ça marche',
      help: 'Aide'
    },

    /* ------------------------------------------------------------------ 1 · the front */

    front: {
      title: 'À ton avis, qu’est-ce qui va se passer ?',
      sub: 'Tout de suite, plus tard dans la journée, un jour dans ta vie — quand tu veux.',
      ifWords: 'Si je',
      /*
        Built 2026-09-16, the founder's call. « Si je » becomes « Si j’ » in front of a vowel
        — "si j’appelle", never "si je appelle" — and only the app can choose, because only the
        app knows what was typed. There is no space after it: the apostrophe is the join.
      */
      ifWordsElided: 'Si j’',
      /*
        THE EXCEPTION, AND IT IS A LIST BECAUSE THERE IS NO RULE. French elides in front of a
        MUTE h ("j’hésite", "j’habite") and refuses in front of an ASPIRATED one ("je hurle",
        "je hais"), and nothing about the spelling tells you which — it is learnt word by word,
        and dictionaries mark it. So: a word starting with h elides UNLESS it starts with one
        of these. Accents are folded before the match, so « harcèle » is matched by "harcel".

        These are the verbs somebody might actually write after « Si je », not the whole
        dictionary. Each stem is cut short enough to catch every conjugation and long enough
        NOT to catch a mute-h word that starts the same way — that is the whole difficulty of
        the list, and it is why some entries look oddly long:

          hume   and not "hum", which would swallow "humilie" — mute, so "j’humilie"
          honn   and not "hon",  which would swallow "honore"  — mute, so "j’honore"
          heriss and not "her",  which would swallow "hérite"  — mute, so "j’hérite"
          hale   and not "hal",  which would swallow "hallucine" — mute, so "j’hallucine"
          hue / hurl and never "hu", for the same reason as "hume"

        Getting one wrong costs an apostrophe, not a person's safety. Add to it freely.
      */
      noElision: 'hach hachur hais hait hale halet hanch handicap hant happ harangu harass ' +
        'harcel harnach harp harpon hasard hat hauss hav hel henni heriss hers heurt ' +
        'hierarch hiss hoch hongr honn hoquet hott houspill houss hue hulul hume hurl',
      thenWords: ', alors',
      stop: '.',
      ifLabel: 'Si je… — ce que tu vas faire',
      thenLabel: '…alors — ce que tu penses qu’il va se passer',
      /*
        "Lock it in" is the load-bearing word on this screen: the pari is locked BEFORE you find
        out, which is the whole method. « Je m’engage », the founder's choice, 2026-09-16, over
        « Je la verrouille » (literal, and sounded like a device). It says what locking in really
        means — committing — and it has no object, so it never needs to agree with anything.
      */
      lock: 'Je m’engage',
      note: 'Ensuite, va voir ce que ça donne. Rien ne quitte ton téléphone.',
      noteLocked: 'Il reste tel que tu l’as écrit : ce qui arrivera ne pourra pas le réécrire.'
    },

    /* ------------------------------------------------------------------ 3 · locked in */

    on: {
      /* Drawn in capitals by the stylesheet, so it is written normally here. */
      kicker: 'Engagé',
      ask: 'Va voir ce que ça donne.',
      /*
        The founder's own wording, 2026-09-16, and the English was changed to match it rather
        than the other way round. « le » and « écrit » agree with le pari: the participle agrees
        with the object in front of it. It was « la » and « écrite » while the word was prédiction.
      */
      sub: 'On le garde ici comme tu l’as écrit. Reviens dire dans tes propres mots ce qui ' +
        's’est passé.',
      done: 'C’est fait',
      notToday: 'Pas aujourd’hui. Garde-le pour demain.'
    },

    /* ------------------------------------------------------------------ 4 · how did it go */

    /*
      The friend asking "SOOOO, how did it go??". A question about the person's own
      prediction, never a verdict on them — and it must not become one in French either.
      These three words also label every result afterwards, in capitals.
    */
    go: {
      /* The founder's wording, 2026-09-16, in the passé composé: it happened once and it is
         over, so « ça s’est passé » rather than « ça se passait », which asks how it used to
         go. « l’avais imaginé » is warmer than « pensais » and keeps it a question about the
         prediction rather than about the person. */
      ask: 'Ça s’est passé comme tu l’avais imaginé ?',
      /* « Ouais » read too young (founder, 2026-09-16). */
      yeah: 'Tout à fait !',
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
      done: 'J’en ai fini avec celui-ci',
      back: 'Le reprendre'
    },

    /* ------------------------------------------------------------------ 7 · your predictions */

    mine: {
      title: 'Tes paris',
      new: 'Nouveau pari',
      /* A heading over several put-away paris, so masculine PLURAL. */
      away: 'Rangés',
      /* A tag on one card, so masculine singular, and the same word as the Locked in label. */
      locked: 'Engagé'
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
      write: 'En écrire un'
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
      harm: 'BETR ne peut pas t’aider avec celui-là, et ce serait malhonnête de faire semblant.',
      verdict: 'C’est un jugement, pas un pari. Qu’est-ce qui se passerait, d’après ' +
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
        'le tien tel quel.'
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

    /* ------------------------------------------------------------------ the crisis block */

    /*
      B16, 2026-09-16, the founder's ask. Read by somebody in trouble, so plain before pretty,
      and `tu` like everything else: switching to `vous` at the worst moment would read as the
      app stepping back from the person.

      NO NUMBER IS IN HERE, in any language. The number comes from helplines.js and the country
      decides it. These are only the words around it.

      « {country} : » and never « En {country} ». French puts a different word in front of every
      country — en France, au Canada, aux États-Unis, aux Pays-Bas — and a template cannot
      know which. A bare name after a colon is always right, for all 250, including the ones
      nobody has thought about. The same trick is used in `unchecked`, `where.guessing` and
      `a11y.countryChanged`. Do not "improve" any of them back into a preposition.

      A line reads: « France : Appelle le 3114 — Numéro national de prévention du suicide.
      Gratuit, 24 h/24. »
    */
    crisis: {
      title: 'Si tu es en danger ou en crise',
      emergency: 'Si tu es en danger en ce moment, appelle le numéro d’urgence local.',
      in: '{country} :',
      /* The number follows straight after: « Appelle le 116 123 », « …un SMS au 988 ». */
      call: 'Appelle le',
      callOrText: 'Appelle ou envoie un SMS au',
      free: 'Gratuit',
      allHours: '24 h/24',
      /* The browser names the language in French and in lower case: « en néerlandais ». */
      inLanguage: 'en {language}',
      unchecked: 'Ton pays, d’après ce téléphone : {country}. Personne n’a vérifié de numéro ' +
        'd’écoute pour ce pays, alors on ne va pas t’en montrer un venu d’ailleurs en espérant ' +
        'que ça marche.',
      noCountry: 'On n’arrive pas à savoir dans quel pays tu es, et on préfère ne te montrer aucun ' +
        'numéro plutôt que le mauvais.',
      notWhereYouAre: 'Ce n’est pas ton pays ?',
      sayWhere: 'Indique où tu es',
      directory: '{link} répertorie des lignes d’écoute gratuites dans plus de 175 pays, et ' +
        'trouve ton pays tout seul. C’est la seule chose sur cet écran qui a besoin d’internet.',
      howWeKnow: 'Comment on devine le pays : le fuseau horaire de ton téléphone, lu sur cet ' +
        'appareil au moment où cet écran s’affiche. Il n’est ni enregistré ni envoyé, et c’est ' +
        'la seule chose ici qui ait un rapport avec l’endroit où tu es. BETR ne demande jamais ' +
        'ta position à ton téléphone, et ne le fera jamais.'
    },

    /* The country list. Its country names come from the browser, in French, in French order. */
    where: {
      title: 'Où es-tu ?',
      sub: 'Seulement pour que le bon numéro d’écoute soit à l’écran quand ça compte. Ça reste ' +
        'sur ce téléphone, comme tout le reste, et ça n’a nulle part où aller.',
      unset: 'Revenir à ce que dit mon fuseau horaire',
      guessing: 'Pour l’instant, on devine d’après le fuseau horaire de ton téléphone, qui ' +
        'indique : {country}.',
      guessingUnknown: 'Pour l’instant, on devine d’après le fuseau horaire de ton téléphone, et il ' +
        'n’a rien indiqué.',
      chosen: 'Choisi'
    },

    /* ------------------------------------------------------------------ help */

    help: {
      safeTitle: 'En choisir un sans danger',
      cbtTitle: 'Ce qu’est la TCC, et la partie qu’on en garde ici',
      primer: [
        'La TCC est une thérapie par la parole. Son idée la plus simple, c’est celle-ci : ce que tu ' +
          't’attends à voir arriver décide de ce que tu fais, et éviter la chose protège ton attente. ' +
          'Tu ne découvres jamais que tu avais tort, alors tu n’en doutes jamais.',
        'L’expérience comportementale est la partie de la TCC qui va vérifier. Tu écris ce que tu ' +
          'penses qu’il va se passer, en une phrase en deux moitiés — si je fais ceci, alors cela va ' +
          'arriver. Tu fais la petite chose. Puis tu écris ce qui s’est réellement passé — pas ce que ça ' +
          'voulait dire, juste ce qui a été dit ou fait. Les croyances bougent quand les preuves sont ' +
          'les tiennes et que tu les as rassemblées toi-même.',
        'BETR, c’est cette partie-là, et rien d’autre. BETR ne te demande pas comment s’est passée ta ' +
          'semaine, ne te note pas, ne décide rien à ton sujet, et ne peut rien voir de tout ça. Un ' +
          'thérapeute fait bien plus que ça, et si tu peux en voir un, fais-le. Ceci, c’est le morceau ' +
          'que tu peux faire de ton côté, aujourd’hui, en une minute environ.'
      ],
      /* Set in bold inside the second paragraph, so it must appear there exactly like this. */
      experiment: 'expérience comportementale',
      readingIntro: 'Écrit par nous. Si tu veux l’entendre de gens qui ne sont pas nous :',

      whatThisTitle: 'Ce que c’est',

      proofTitle: 'Ne nous crois pas sur parole',
      /* The English's rule holds in French: if BETR ever has a thing to buy, THIS COMES OUT THE SAME DAY. */
      free: 'BETR est gratuit. Pas de pub, pas d’abonnement, rien à acheter et rien à débloquer.',
      /*
        A trust sentence, translated exactly: two counts of opens a day, nothing about the
        person. « adresse IP » and not « adresse », which in French reads as where you live.
        « ni même l’heure » is exact for the same reason the English is: the DAY is recorded, on
        the line, and the time is not. Change it only with the server setting.
      */
      airplane: 'Active le mode avion. Tout marche encore, parce que rien ici n’a jamais eu besoin ' +
        'd’internet. Le chargement de cette page est la seule chose qu’un serveur voit jamais. On tient ' +
        'deux comptes — combien de fois la page a été ouverte chaque jour, et combien de ces fois-là ' +
        'n’étaient pas des robots — et rien d’autre. Rien sur toi n’est noté : ni ton adresse IP, ni ' +
        'ton navigateur, ni même l’heure.',
      proofAccounts: 'comptes',
      proofSent: 'envoyés chez nous, en tout',
      /* o for octet: French does not say bytes. */
      zeroBytes: '0 o',

      placesTitle: 'D’autres endroits, dont aucun n’est géré par nous',

      whoTitle: 'Qui a fait ça',
      /* B57. « BETR » is masculine here as everywhere else in this file. */
      who: 'BETR est gratuit et open source. Il a été fait par Digital Bricks.',
      whoCode: 'Tout le code est sur {link}, et n’importe qui peut le lire et vérifier que rien ' +
        'dedans n’envoie quoi que ce soit, nulle part.',
      madeBy: 'Fait par Digital Bricks.',

      codeTitle: 'Le code',
      code: 'BETR, c’est du HTML, du CSS et du JavaScript tout simples, sans bibliothèque, assez ' +
        'petit pour être lu en une soirée. Cette version :',
      devBuild: 'Version de développement — non publiée',

      /* What a screen reader calls the picker at the top right, and the heading in Help. */
      langTitle: 'Langue',
      langNote: 'Toutes les langues de BETR sont déjà sur ce téléphone. En choisir une ne ' +
        'télécharge rien.'
    },

    /* ------------------------------------------------------------------ said, not shown */

    a11y: {
      countryChanged: 'Numéros d’écoute maintenant affichés pour : {country}.'
    },

    /* ------------------------------------------------------------------ export and delete */

    io: {
      export: 'Tout exporter',
      wipe: 'Tout supprimer',
      copy: 'Copier',
      copied: 'Copié',
      share: 'L’envoyer quelque part',
      deleteAsk: 'Tout supprimer sur ce téléphone ? Il n’y a de copie nulle part ailleurs, ' +
        'et nous ne pourrons rien récupérer pour toi.',
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
