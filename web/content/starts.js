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
  `general` is the same four fields with no `if`: the short set shown when the blank holds
  something we did not write, which after the first week will be most of the time.

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
    dos: [
      'Do it once today, in the smallest version that still counts.',
      'Pick the version of it you could do in the next hour.'
    ],
    drops: [
      'Don’t explain yourself.',
      'Don’t line up a way out first.'
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
        'Tell one person one true sentence about how this week has been.',
        'Answer “how are you?” honestly, once, today.'
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
        'Finish one thing at good enough today and hand it over.',
        'Stop at the time you planned, and send what you have.'
      ],
      drops: [
        'No last read-through.',
        'Don’t say what you’d have done with more time.'
      ]
    },
    {
      if: 'send it without reading it again',
      thens: [
        'there’ll be a mistake in it',
        'it’ll come out blunter than I meant',
        'I’ll be going back to it all afternoon'
      ],
      dos: [
        'Write one message today, read it once, and send it.',
        'Send the next email the moment it’s written.'
      ],
      drops: [
        'No second read-through.',
        'Don’t go back and edit it after it’s gone.'
      ]
    },
    {
      if: 'don’t answer a message straight away',
      thens: [
        'they’ll think I don’t care',
        'they’ll assume I’m annoyed with them',
        'they’ll stop bothering to message me'
      ],
      dos: [
        'Leave one message a few hours before you answer it.',
        'Pick one message today and answer it this evening.'
      ],
      drops: [
        'Don’t open with “sorry, only just seen this”.',
        'Don’t explain the delay.'
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
        'Take two hours off today, and take them properly.',
        'Sit down for half an hour with nothing to show for it.'
      ],
      drops: [
        'No “I’ll just quickly do this one thing” first.',
        'Don’t keep the list where you can see it.'
      ]
    },
    {
      if: 'go an evening without my phone',
      thens: [
        'something will go wrong and nobody will reach me',
        'I’ll miss something I needed to see',
        'I won’t know what to do with myself'
      ],
      dos: [
        'Put it in a drawer from eight. In the morning, write down what you actually missed.',
        'Leave it in another room for one evening.'
      ],
      drops: [
        'No checking it “just once” before bed.',
        'Don’t tell anyone in advance where you’ll be.'
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
        'it’ll get brought up again',
        'I’ll be going over it all night'
      ],
      dos: [
        'Let one disagreement finish where it finishes today.',
        'Say your bit once, and stop.'
      ],
      drops: [
        'Don’t send the follow-up message.',
        'Don’t go back to it later.'
      ]
    },
    {
      if: 'let somebody see I got it wrong',
      thens: [
        'they’ll lose confidence in me',
        'they’ll bring it up again later',
        'they’ll stop trusting me with things'
      ],
      dos: [
        'Say “I got that wrong” once today, and leave it there.',
        'Own one mistake before anybody finds it.'
      ],
      drops: [
        'Don’t explain how it happened.',
        'Don’t offer to fix it before they ask.'
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
        'Tell one person one specific thing they did well.',
        'Say it out loud rather than in a message.'
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
      if: 'stop before it’s finished',
      thens: [
        'it’ll never get done',
        'I’ll have wasted the whole run at it',
        'somebody will see it half done'
      ],
      dos: [
        'Stop at the hour, mid-thing, and go and do something else.',
        'End one job today at a point that isn’t the end.'
      ],
      drops: [
        'Don’t tidy it up first.',
        'Don’t leave a note saying where you got to.'
      ]
    },
    {
      if: 'go to something on my own',
      thens: [
        'I’ll stand there with nobody to talk to',
        'everyone will notice I came alone',
        'I’ll want to leave within ten minutes'
      ],
      dos: [
        'Go to one thing today without arranging to meet anybody.',
        'Stay half an hour, and write down who spoke to you.'
      ],
      drops: [
        'Don’t hold your phone.',
        'Don’t line up an excuse to leave.'
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
    },
    {
      if: 'don’t check it a second time',
      thens: [
        'I’ll have missed something',
        'it’ll be wrong and I won’t know',
        'I won’t settle until I’ve looked'
      ],
      dos: [
        'Check once today, and write down the time you stopped wanting to look.',
        'Lock up once, and walk away.'
      ],
      drops: [
        'No second look.',
        'Don’t ask anybody else to check for you.'
      ]
    },
    {
      if: 'let a message sit unread',
      thens: [
        'it’ll turn out to be the urgent one',
        'they’ll see I’ve ignored it',
        'it’ll pile up and get worse'
      ],
      dos: [
        'Leave one message unopened until this evening.',
        'Turn the badge off for a day.'
      ],
      drops: [
        'Don’t read the preview.',
        'Don’t open it and leave it unanswered.'
      ]
    },
    {
      if: 'get through it without apologising',
      thens: [
        'they’ll think I don’t care',
        'it’ll sit between us',
        'somebody will say something about it'
      ],
      dos: [
        'Get through one small thing today without saying sorry.',
        'Say “thanks for waiting” instead of “sorry I’m late”, once.'
      ],
      drops: [
        'Don’t apologise in the first sentence.',
        'Don’t apologise for not apologising.'
      ]
    }
  ]
};

if (typeof module === 'object' && module.exports) module.exports = BETR_STARTS;
else (self.Betr = self.Betr || {}).starts = BETR_STARTS;
