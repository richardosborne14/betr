/*
  The suggestions under the two blanks (B30, 2026-09-08). This is the "Practice" half of the
  founder's Present · Practice · Produce, arriving as help rather than as a menu.

  WHAT THIS FILE IS FOR. The way in is one sentence with two blanks — "If I ___, then ___" —
  and a person from a car types both halves in twenty seconds. A person who has never done
  this before stares at the first blank instead, which is the whole reason the stock list
  existed. So under each blank there is a row of plain suggestions. Tap one and it fills the
  blank; type instead and the suggestions stay where they are and are never mentioned again.

  IT IS FIXED CONTENT, IN A FIXED ORDER, AND BETR NEVER CHOOSES ONE (CLAUDE.md rules 2 and 3).
  Every person sees the same starts in the same order, forever. Which `thens` are shown depends
  on ONE thing and nothing else: whether the If blank holds, word for word, one of the `if`
  lines below. That is a lookup, not a judgement — there is no scoring, no ranking, no "closest
  match", and nothing here is decided by anything a person has ever typed or done before. If a
  future session is tempted to add fuzzy matching, that is the line it would be crossing.

  THE SHAPE
    if     the first blank, lowercase, because it follows the printed words "If I"
    thens  three predictions for that start, lowercase, because they follow ", then"
    dos    what a person might actually do about it. Full sentences, today, cheap, reversible
    drops  the safety behaviour to leave out. Full sentences. Research §2.3: dropping it is
           what makes the difference between a test and a day
    sizes  B42: three named steps, small to big, each a `name`, a `do` and the `drop` that
           belongs with it. Tapping one fills both boxes. Optional on a start and REQUIRED on
           `general`, because every road with no sizes of its own falls through to those

  NO SCREEN DRAWS `dos` OR `drops` ANY MORE (B45 §5e, 2026-09-10). READ THIS BEFORE EDITING ONE.

  They were the plan screen's other shape: two loose suggestions where the rest of the app
  shows three named sizes. Which shape a person got was decided by whether their first blank
  matched an `if` here word for word — so tapping one of BETR's own twelve suggestions got the
  old screen and typing something BETR had never seen got the new one, which is exactly
  backwards and is B45 §2's "worst single fact". Every road now falls through to `general.sizes`
  or a worry's own three, and the loose row is not drawn anywhere.

  The twenty-four sentences are still HERE, and still held to the three word lists by
  validateStarts, because they are B45 §5c's raw material: nine of these twelve starts are the
  same act as a worry in worries.js, and §5c decides for each overlapping pair which wording
  survives. That is the reviewer's call with the founder, not a session's, so nothing was
  thrown away. Until then: changing a line here changes nothing a person sees. `thens` and `if`
  still do.
  `general` is the set shown when the blank holds something we did not write, which after the
  first week will be most of the time. It has no `if`, and since B42 it has `thens` and
  `sizes` and no loose `dos` or `drops`: the two it used to carry became the three.

  THE RULES THAT TRAVEL WITH IT (web/tests/content.test.js holds every one)
    - every `if` starts lowercase; every `dos` and `drops` line is a sentence with a capital
    - no two `thens` under one start predict the same thing — two that do are one suggestion
      and a wasted tap, which is the easy mistake to make writing sixty of these in an evening
    - NOTHING HERE NAMES THE HABIT, food, weight or a body sensation, and nothing here names
      anyone's safety. Rule 4 as amended 2026-09-08 loosened what a PERSON may write; it did
      not loosen one word of what BETR proposes, and these are BETR proposing
    - every prediction can turn out to be wrong. "then I'll find it hard" is not a suggestion,
      it is a feeling with no evidence that could settle it

  Every phrase is written fresh (rule 8). Nothing here is adapted from CCI, Getselfhelp,
  Therapist Aid, Psychology Tools or Beck Institute material.

  It is a .js file and not .json for the reason worries.js is: the founder opens
  web/index.html straight off the filesystem, and a browser will not fetch JSON from a file://
  page. Still plain data. No logic, ever.

  NOT REVIEWED. Like worries.js, these sentences are a release condition: the paid CBT-trained
  reviewer reads them, and Misha reads them for tone and for who they sound like.
*/
var BETR_STARTS = {

  /*
    Shown when the If blank holds something BETR did not write — which is the main road, and
    is meant to be. Short on purpose: a person who has typed their own situation does not need
    a list, they need one nudge about the shape of a consequence.
  */
  general: {
    thens: [
      'they’ll think less of me',
      'they’ll go quiet with me',
      'it’ll be held against me later'
    ],
    /*
      B42, 2026-09-09. THE DIAL ON THE ROAD MOST PEOPLE ARE ON. These three replaced the two
      loose `dos` and two loose `drops` the general set used to carry, and they are the same
      sentences turned into a dial: a name, a whole step, and the leave-out that belongs to
      that step. Every road with no sizes of its own falls through to these, so the three are
      always there — never four, never two, never one that appears because the last one went
      well. See lib/content.js checkSizes for what that costs and why.

      Small to big, in that order, and nothing here is numbered.
    */
    sizes: [
      {
        name: 'A small go',
        do: 'Do it once today, in the smallest version that still counts.',
        drop: 'Don’t explain yourself.'
      },
      {
        name: 'A bigger go',
        do: 'Do the version of it you would normally talk yourself out of.',
        drop: 'Don’t line up a way out first.'
      },
      {
        name: 'The whole thing',
        do: 'Do the whole thing today, the way you would if you weren’t worried about it.',
        drop: 'Don’t soften it, and don’t apologise for it afterwards.'
      }
    ]
  },

  items: [
    {
      if: 'say no without giving a reason',
      thens: [
        'they’ll think I’m being difficult',
        'they’ll stop asking me',
        'they’ll be off with me for days'
      ],
      dos: [
        'Say no to one thing today, in one sentence.',
        'Turn down one request without explaining why.'
      ],
      drops: [
        'Don’t give a reason.',
        'Don’t offer to make up for it another way.'
      ]
    },
    {
      if: 'ask for what I actually want',
      thens: [
        'they’ll say no and I’ll feel stupid',
        'they’ll think I’m taking advantage',
        'it’ll change how they see me'
      ],
      dos: [
        'Ask for one thing today, straight out.',
        'Ask once, and don’t soften it.'
      ],
      drops: [
        'Don’t say “only if it’s no trouble”.',
        'Don’t ask for less than you want.'
      ]
    },
    {
      if: 'tell someone I’m struggling',
      thens: [
        'they’ll change the subject',
        'they’ll think less of me',
        'they’ll start treating me carefully'
      ],
      dos: [
        'Tell one person one true sentence about how this week has been.'
      ],
      drops: [
        'Don’t follow it with “but I’m fine”.',
        'Don’t make a joke of it.'
      ]
    },
    {
      if: 'hand something over before it’s perfect',
      thens: [
        'they’ll spot everything wrong with it',
        'they’ll think I’ve stopped caring',
        'it’ll come straight back to me with a list'
      ],
      dos: [
        'Leave one thing at good enough today and hand it over.',
        'Stop at the time you planned, and send what you have.'
      ],
      drops: [
        'No last read-through.',
        'Don’t say what you’d have done with more time.'
      ]
    },
    {
      if: 'sit still with the restlessness',
      thens: [
        'it’ll build until I have to do something about it',
        'I’ll be no use for the rest of the day',
        'it won’t pass on its own'
      ],
      dos: [
        'Set ten minutes and sit with it. Write down the time it eased.',
        'Stay where you are for one urge, and time it.'
      ],
      drops: [
        'Don’t pick anything up.',
        'Don’t get up to do a job.'
      ]
    },
    {
      if: 'rest while there’s still stuff to do',
      thens: [
        'I’ll feel guilty the whole time',
        'I won’t start again today',
        'somebody will think I’ve gone slack'
      ],
      dos: [
        'Take an hour off today and do something just for yourself.',
        'Sit down for half an hour with nothing to show for it.'
      ],
      drops: [
        'No “I’ll just quickly do this one thing” first.',
        'Put the to-do list out of sight before you sit down.'
      ]
    },
    {
      if: 'say what I actually think',
      thens: [
        'it’ll turn into a row',
        'they’ll go quiet with me',
        'they’ll decide I’m hard work'
      ],
      dos: [
        'Say the thing you’d normally leave, once, in one sentence.',
        'Disagree out loud with one person today.'
      ],
      drops: [
        'Don’t soften it with a joke.',
        'Don’t apologise for saying it.'
      ]
    },
    {
      if: 'don’t get the last word',
      thens: [
        'they’ll think they’ve won',
        'they won’t remember what I said',
        'I’ll be going over it all night'
      ],
      dos: [
        'Say your bit once, and stop.'
      ],
      drops: [
        'Don’t send the follow-up message.',
        'Don’t keep making new points.'
      ]
    },
    {
      /*
        The founder's own, 2026-09-08, driving home behind a slow car: "If I don't overtake
        slow cars, I'll end up late for my appointments — obviously not true on a ten-minute
        drive, and I'd reduce my belief pretty quickly." Written as the rule underneath it
        rather than as the car, so it is the same start for somebody who does not drive.
      */
      if: 'don’t rush to be early',
      thens: [
        'I’ll be late and it’ll look bad',
        'they’ll think I don’t take it seriously',
        'the whole day will run behind'
      ],
      dos: [
        'Leave at the time it actually takes, once, and write down when you arrived.',
        'Arrive on time rather than early, once.'
      ],
      drops: [
        'Don’t leave a buffer.',
        'Don’t message ahead to say where you are.'
      ]
    },
    {
      if: 'say something good about somebody',
      thens: [
        'it’ll come out wrong',
        'they’ll be embarrassed',
        'they’ll think I want something'
      ],
      dos: [
        'Tell one person one specific thing they did well.'
      ],
      drops: [
        'Don’t follow it with a joke.',
        'Don’t add “anyway”.'
      ]
    },
    {
      if: 'ask somebody for help',
      thens: [
        'they’ll think I can’t cope',
        'they’ll say yes and resent it',
        'they’ll say no'
      ],
      dos: [
        'Ask one person for one specific thing today.',
        'Ask for help with something you could just about manage alone.'
      ],
      drops: [
        'Don’t say “if you’ve got a minute”.',
        'Don’t do half of it first.'
      ]
    },
    {
      if: 'leave early and say plainly that I’m going',
      thens: [
        'they’ll take it as a snub',
        'they’ll ask questions I don’t want to answer',
        'I won’t get asked again'
      ],
      dos: [
        'Leave one thing when you want to, and say plainly that you’re off.',
        'Say goodbye once, and go.'
      ],
      drops: [
        'Don’t invent a reason.',
        'Don’t stay for one more of anything.'
      ]
    }
  ]
};

if (typeof module === 'object' && module.exports) module.exports = BETR_STARTS;
else (self.Betr = self.Betr || {}).starts = BETR_STARTS;
