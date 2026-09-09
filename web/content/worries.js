/*
  Betr's stock list. This file is the product; everything else is plumbing.

  Seven parts per item, all required (scope §5.2):
    id      stable, never reused, never renamed — stored results point at it
    label   the button text. The situation, in plain words. Never a diagnosis
    belief  the general shape of the worry, "If I ___, then ___". This one is the CARD:
            it is drawn under the label wherever a person picks a worry, and it is never
            itself tested. It is deliberately the loosest of the four
    beliefs three of them, and they are the ones a person actually tests. Each is one
            `belief` — a specific "If I ___, then ___" — and one `expect`, the thing they
            are braced for, shown pre-written on the test screen and editable there
    test    one line, doable today, cheap, legal, reversible, in the person's control
    drop    the safety behaviour to leave out. Without it the item is not an experiment
    lane    social | assertiveness | perfectionism | urge-timing | rest | sleep

  Hard rule: no `test` may touch the habit itself — no drink, screen, substance, food
  restriction, body sensation, checking ritual, or anyone's safety. web/tests/content.test.js
  enforces this against the same word list the custom-entry guard uses.

  B20, 2026-09-03. WHY THERE ARE NOW THREE OF THEM. Test users read the single "If I ___,
  then ___" each worry used to have and said it "sort of matches what my worry is, but not
  really". They were right, and the reason is structural: one sentence per worry has to guess
  which consequence the person is actually afraid of, and that guess was wrong about as often
  as it was right. A worry is a situation; the *prediction* underneath it varies from person
  to person, and the prediction is the thing a behavioural experiment tests.

  So the situation and the prediction are now two different fields. `label` and `belief` name
  the situation loosely enough to be recognisable on a list. The three in `beliefs` are the
  common predictions underneath it, and the person picks the one that is theirs — or writes
  their own on the same screen, which keeps the worry, the test and the drop and replaces only
  the sentence being tested.

  How the three are written, and it is the whole job:
    - each one predicts a DIFFERENT consequence, not the same one reworded. If two of them
      could be answered by the same evidence, one of them is wasted
    - every one of them could turn out to be wrong. "If I do this, then I'll find it hard" is
      not testable and does not belong here
    - the first is the most common one, because it is read first and most often taken
    - `expect` is the same prediction in the voice of somebody bracing for it, and it is
      small enough to be true: someone going quiet, a face, being filed away. Never a
      catastrophe, and never a verdict on the person

  B19, 2026-09-03, and it still holds: THE LABEL IS THE PART THAT HAS TO STAND ALONE.

      Somebody reading only the label knows what act is being proposed.

  Which rules out three things a label used to do. **A pronoun with nothing to point at** —
  "Handing it over" became "Handing something over". **An open channel** — "Not replying
  straight away" could have been a conversation; it is messages, and now it says so. And
  **a safety behaviour smuggled into the label**: "Saying I'm annoyed, calmly" put the `drop`
  on the button, which quietly narrowed the worry to people already willing to speak up. The
  worry is telling someone at all. "Calmly" belongs in `test`, and that is where it is.

  ORDER, AND WHY IT IS PER DOOR: the first tap has to be able to succeed on the day it is
  taken, or a person's first loop ends in "Didn't get to it" and they learn nothing on the one
  day they were certain to open this. Most items wait on the world — somebody has to ask you
  for something, a mistake has to exist, an evening has to be happening. So the first item
  behind every door is one that can be started today by somebody with nobody free, and
  web/tests/content.test.js holds that list by hand so a reordering shows up in a diff.
  The order of this array is the same rule applied to the whole list, and is only ever seen
  if a person reaches the pick screen without going through a door.

  EVERY BELIEF HERE STARTS "If I", AND SINCE 2026-09-08 THAT IS STRUCTURAL, not a habit. The
  build screen (B30) prints the words "If I" and ", then" either side of two blanks, and the
  borrow list (B32) fills those blanks from these sentences — so a sentence that does not start
  "If I" cannot be put on that screen at all. web/lib/content.js fails the build on one.

  Three were reworded that day for exactly that reason, and all three moved from a situation
  happening TO the person to an action the person takes, which is the shape a behavioural
  experiment actually tests: `phone` belief 1 ("If someone can't get hold of me" → "If I don't
  answer while it's away"), `rest` belief 2 ("If anyone sees me sitting down" → "If I let
  somebody see me sitting down"), `low` belief 0 ("If they know" → "If I tell them"). The
  prediction underneath each is unchanged. THE PAID CBT REVIEWER SHOULD READ THESE THREE
  ALONGSIDE THE REST; they are the only sentences in this file a session has rewritten since B1.

  `cut` (Saying I'm cutting back) was deleted on 2026-09-03 at the founder's call. Its id is
  retired, not reused, and its explanation went with it.

  Every phrase here is written fresh. Nothing is adapted from CCI, Getselfhelp, Therapist Aid,
  Psychology Tools or Beck Institute material; all of them restrict reuse in a product. The
  five-step method is not protected expression; the words are.

  Why this is a .js file and not worries.json: the founder opens web/index.html straight from
  the filesystem, and browsers refuse to fetch a .json (or load an ES module) from a file://
  page. A classic script tag is the only thing that works both there and on the dev host.
  It is still plain data — one array, no logic.
*/
var BETR_WORRIES = [

  /* ------------------------------------------------- can be started today, on your own */

  {
    id: 'sit',
    label: 'Sitting still when I feel restless',
    belief: 'If I feel restless, then I can’t just sit with it.',
    skeleton: {
      if: 'sit with the restlessness for {long}',
      holes: { long: 'ten minutes' }
    },
    beliefs: [
      {
        belief: 'If I sit with the restlessness for {long}, then it’ll build until I have to ' +
          'do something about it.',
        expect: 'By about the fifth minute I’ll be up and doing something else.'
      },
      {
        belief: 'If I sit with the restlessness for {long}, then I’ll be no use for the rest ' +
          'of the day.',
        expect: 'I’ll write the day off and get nothing done.'
      },
      {
        belief: 'If I sit with the restlessness for {long}, then everything I’ve been not ' +
          'thinking about will land at once.',
        expect: 'The whole list will arrive at once, and stopping will have cost me.'
      }
    ],
    test: 'Set a ten-minute timer and do nothing at all. Notice when it peaks, and whether it drops.',
    drop: 'Don’t reach for your phone, and don’t get up to do a task.',
    lane: 'urge-timing'
  },
  {
    id: 'phone',
    label: 'Going an evening without my phone',
    belief: 'If I’m not reachable for an evening, then something will go wrong.',
    skeleton: {
      if: 'go {long} without my phone',
      holes: { long: 'a whole evening' }
    },
    beliefs: [
      {
        belief: 'If I go {long} without my phone, then I’ll miss something that actually ' +
          'needed me.',
        expect: 'Something urgent will come in and I’ll have let someone down.'
      },
      {
        belief: 'If I go {long} without my phone, then people will think I’m ignoring them.',
        expect: 'There’ll be a short reply in the morning and a bit of an atmosphere.'
      },
      {
        belief: 'If I go {long} without my phone, then I’ll be twitchy the whole time and get ' +
          'nothing out of it anyway.',
        expect: 'I’ll spend the evening thinking about the phone instead of using it.'
      }
    ],
    test: 'Put it in a drawer from eight o’clock. In the morning, write down what you actually missed.',
    drop: 'No checking it “just once” before bed.',
    lane: 'urge-timing'
  },
  {
    /*
      B19. The other half of the phone door. `phone` is about being unreachable — something
      needs you in the gap. This one is about falling behind everybody else, which is a
      different prediction and a different evening.
    */
    id: 'feed',
    label: 'A day without checking social media',
    belief: 'If I stop keeping up with everyone, then I’ll fall out of things.',
    skeleton: {
      if: 'go {long} without opening the apps I scroll',
      holes: { long: 'a day' }
    },
    beliefs: [
      {
        belief: 'If I go {long} without opening the apps I scroll, then I’ll be the only one ' +
          'who hasn’t heard something.',
        expect: 'Someone will mention it and it’ll be obvious I’m out of the loop.'
      },
      {
        belief: 'If I go {long} without opening the apps I scroll, then people will think I’ve ' +
          'gone off them.',
        expect: 'Somebody will notice I’ve disappeared and read something into it.'
      },
      {
        belief: 'If I go {long} without opening the apps I scroll, then I’ll have nothing to ' +
          'talk about.',
        expect: 'I’ll be sitting there with nothing to say.'
      }
    ],
    test: 'Go one day without opening the apps you scroll. At the end, write down what you actually missed.',
    drop: 'No opening one “just to see if anyone’s messaged me”.',
    lane: 'urge-timing'
  },
  {
    id: 'reply',
    label: 'Not answering a message straight away',
    belief: 'If I don’t answer a message quickly, then people take it badly.',
    skeleton: {
      if: 'leave a message from {person} a few hours before I answer',
      holes: { person: 'somebody' }
    },
    beliefs: [
      {
        belief: 'If I leave a message from {person} a few hours before I answer, then {person} ' +
          'will think I don’t care.',
        expect: 'They’ll go a bit cooler with me, and I’ll have to make it up to them.'
      },
      {
        belief: 'If I leave a message from {person} a few hours before I answer, then {person} ' +
          'will assume I’m annoyed.',
        expect: 'They’ll ask if everything’s all right, in that careful way.'
      },
      {
        belief: 'If I leave a message from {person} a few hours before I answer, then {person} ' +
          'will stop bothering to message me.',
        expect: 'They’ll go to somebody else next time, and I’ll hear about it after.'
      }
    ],
    test: 'Pick one message today and leave it a few hours before you answer. Notice whether they chase you.',
    drop: 'Don’t open with “sorry, only just seen this”, and don’t explain the delay.',
    lane: 'social'
  },
  {
    id: 'check',
    label: 'Sending something without checking it again',
    belief: 'If I send something without going over it again, then it won’t be right.',
    skeleton: {
      if: 'send {thing} after reading it through once',
      holes: { thing: 'something' }
    },
    beliefs: [
      {
        belief: 'If I send {thing} after reading it through once, then there’ll be a mistake ' +
          'in it and I’ll look sloppy.',
        expect: 'Someone will spot something, and they’ll think I rushed it.'
      },
      {
        belief: 'If I send {thing} after reading it through once, then it’ll come out blunter ' +
          'than I meant it.',
        expect: 'They’ll take it the wrong way and I’ll spend the day fixing it.'
      },
      {
        belief: 'If I send {thing} after reading it through once, then I’ll be thinking about ' +
          'it all afternoon.',
        expect: 'I’ll keep going back to it and get nothing else done.'
      }
    ],
    test: 'Write one email or message today, read it through once, and send it.',
    drop: 'No second read-through, and don’t go back to edit it after it’s gone.',
    lane: 'perfectionism'
  },
  {
    /*
      B19. `check` is about a mistake getting through. This is about the standard itself —
      stopping at good enough when nothing is wrong with it. The founder asked for both.
    */
    id: 'enough',
    label: 'Handing something over before it’s perfect',
    belief: 'If I hand over something that’s only good enough, then it won’t be good enough.',
    skeleton: {
      if: 'hand over {thing} at good enough',
      holes: { thing: 'something' }
    },
    beliefs: [
      {
        belief: 'If I hand over {thing} at good enough, then people will think I don’t care ' +
          'about it.',
        expect: 'They’ll spot the rough edges and quietly decide I’ve dropped off.'
      },
      {
        belief: 'If I hand over {thing} at good enough, then it’ll come straight back to me ' +
          'with a list.',
        expect: 'I’ll end up doing it twice, and that’s worse than doing it properly.'
      },
      {
        belief: 'If I hand over {thing} at good enough, then that becomes what people expect ' +
          'from me.',
        expect: 'The standard slips, and I don’t get it back.'
      }
    ],
    test: 'Finish one thing today at good enough and hand it over. Write down the time you stopped.',
    drop: 'No last look through, and no message saying what you’d have done with more time.',
    lane: 'perfectionism'
  },
  {
    id: 'rest',
    label: 'Resting when there’s stuff to do',
    belief: 'If I rest before everything’s done, then I’ll pay for it.',
    skeleton: {
      if: 'rest for {long} while there’s still stuff to do',
      holes: { long: 'two hours' }
    },
    beliefs: [
      {
        belief: 'If I rest for {long} while there’s still stuff to do, then I’ll feel guilty ' +
          'the whole time.',
        expect: 'I’ll sit there thinking about the list and get nothing out of it.'
      },
      {
        belief: 'If I rest for {long} while there’s still stuff to do, then I won’t start ' +
          'again today.',
        expect: 'The afternoon will go, and tomorrow starts further behind.'
      },
      {
        belief: 'If I rest for {long} while there’s still stuff to do, then somebody will ' +
          'think I’m not pulling my weight.',
        expect: 'Somebody will make a comment about it, and it’ll stick.'
      }
    ],
    test: 'Plan two hours of rest today and actually take them. Notice how you feel after.',
    drop: 'No “I’ll just quickly do this one thing” first.',
    lane: 'rest'
  },
  {
    /*
      B19, founder's call. Split from `care`, which he asked for separately and was right to:
      the two look alike and their drops are opposite. `care` is about the size of what you
      would be admitting, and its crutch is the joke. This one is about what comes back, and
      its crutch is the fishing — one about yourself straight after, or waiting for a return.
    */
    id: 'praise',
    label: 'Paying someone a compliment',
    belief: 'If I say something good about someone, then it’ll land wrong.',
    skeleton: {
      if: 'say one specific good thing to {person} out loud',
      holes: { person: 'somebody' }
    },
    beliefs: [
      {
        belief: 'If I say one specific good thing to {person} out loud, then it’ll look like ' +
          'I was fishing for one back.',
        expect: 'There’ll be an odd beat, and I’ll wish I’d kept it to myself.'
      },
      {
        belief: 'If I say one specific good thing to {person} out loud, then {person} will ' +
          'think I want something.',
        expect: 'They’ll be polite about it and wait for the ask.'
      },
      {
        belief: 'If I say one specific good thing to {person} out loud, then it’ll come out ' +
          'wrong and make things awkward.',
        expect: 'It’ll sound odd, and neither of us will know what to say next.'
      }
    ],
    test: 'Say one specific good thing about somebody today, to their face.',
    drop: 'Don’t follow it with one about yourself, and don’t wait around for one back.',
    lane: 'social'
  },
  {
    id: 'care',
    label: 'Telling someone they matter to me',
    belief: 'If I tell someone what they mean to me, then it’ll be awkward.',
    skeleton: {
      if: 'tell {person} one specific thing I’m glad about them',
      holes: { person: 'somebody' }
    },
    beliefs: [
      {
        belief: 'If I tell {person} one specific thing I’m glad about them, then {person} ' +
          'won’t say it back.',
        expect: 'They’ll laugh it off, and I’ll wish I hadn’t said it.'
      },
      {
        belief: 'If I tell {person} one specific thing I’m glad about them, then it’ll change ' +
          'how we are with each other.',
        expect: 'It’ll be a bit stiff between us afterwards.'
      },
      {
        belief: 'If I tell {person} one specific thing I’m glad about them, then {person} will ' +
          'wonder what’s brought this on.',
        expect: 'They’ll ask if I’m all right, and I’ll have to explain myself.'
      }
    ],
    test: 'Tell one person, today, one specific thing you’re glad about them.',
    drop: 'Don’t turn it into a joke, and don’t move straight on to something else.',
    lane: 'social'
  },

  /* --------------------------------- waits on somebody else, or on the day itself */

  {
    id: 'no',
    label: 'Saying no without giving a reason',
    belief: 'If I say no and don’t explain, then people will think badly of me.',
    /*
      B41's first skeleton, 2026-09-09. NOT YET READ BY MISHA OR THE CBT REVIEWER.

      The three predictions were three slightly different actions before today — "say no and
      don't explain myself", "turn something down", "give no reason" — and they are one action
      now, with the same three consequences under it. That is what a skeleton is: the person
      fills in the action once and every prediction is about the thing she actually did.
      B20's rule is untouched, because B20's rule was about the CONSEQUENCES being different,
      and all three still are: thinking badly of her, stopping asking her, taking it as rude.
    */
    skeleton: {
      if: 'say no to {person} without giving a reason',
      /* The word the sentence uses while the blank is empty. It has to read in every one of
         the four places {person} appears, which is why it is "somebody" and not "a person". */
      holes: { person: 'somebody' }
    },
    beliefs: [
      {
        belief: 'If I say no to {person} without giving a reason, then {person} will think I’m selfish.',
        expect: 'There’ll be a pause, and {person} will be a bit off with me afterwards.'
      },
      {
        belief: 'If I say no to {person} without giving a reason, then {person} will stop asking me.',
        expect: 'I’ll be left out of the next one, and nobody will say why.'
      },
      {
        belief: 'If I say no to {person} without giving a reason, then {person} will take it as rude.',
        expect: 'They’ll take it personally, and it’ll sit there between us.'
      }
    ],
    /*
      B42's first three sizes, 2026-09-09. NOT YET READ BY MISHA OR THE CBT REVIEWER, and this
      is the same risk the skeleton above carries: it is BETR's voice in somebody's mouth.

      They are the same one action three sizes apart — who it is with does not change, and what
      is left out grows with the step, because a big go with a small leave-out is not a bigger
      test, it is a different one. Whether the smallest honest version should instead change
      WHO it is with is B42's open question and it is the reviewer's, with Misha.
    */
    sizes: [
      {
        name: 'A small go',
        do: 'Say no to {person} once today, about something small.',
        drop: 'Don’t give a reason.'
      },
      {
        name: 'A bigger go',
        do: 'Say no to {person} about something bigger than you would usually refuse.',
        drop: 'Don’t give a reason, and don’t offer them anything instead.'
      },
      {
        name: 'The whole thing',
        do: 'Say no to {person} today, and say nothing after it.',
        drop: 'No reason, no apology, and no making up for it later.'
      }
    ],
    test: 'Say no to {person} once today, about something small.',
    drop: 'Don’t give a reason.',
    lane: 'assertiveness'
  },
  {
    id: 'help',
    label: 'Asking someone for help',
    belief: 'If I ask someone for help, then it costs me something.',
    skeleton: {
      if: 'ask {person} for one small, specific favour',
      holes: { person: 'somebody' }
    },
    beliefs: [
      {
        belief: 'If I ask {person} for one small, specific favour, then I become a burden to ' +
          '{person}.',
        expect: 'They’ll do it, and quietly file me under people who can’t cope.'
      },
      {
        belief: 'If I ask {person} for one small, specific favour, then I’ll be trusted with ' +
          'less.',
        expect: 'Next time it’ll go to somebody else, without a word to me.'
      },
      {
        belief: 'If I ask {person} for one small, specific favour, then {person} will say yes ' +
          'and resent it.',
        expect: 'They’ll help, and be a bit short with me for a while after.'
      }
    ],
    test: 'Ask one person for one small, specific favour today.',
    drop: 'No “sorry to bother you”, and no offering something back.',
    lane: 'assertiveness'
  },
  {
    /*
      B19, and the founder pushed for it after the first draft folded it into `strug`. They
      are the closest pair on the list and they are not the same. `strug` is a situation you
      are finding hard, and this audience can just about say that out loud. This is a state
      you are in, and they never say it. If the CBT reviewer calls them one worry, this is
      the one that goes.
    */
    id: 'low',
    label: 'Telling someone I’ve been feeling low',
    belief: 'If I say I’ve been feeling low, then it changes how people treat me.',
    skeleton: {
      if: 'tell {person} I’ve been feeling low lately',
      holes: { person: 'somebody' }
    },
    beliefs: [
      {
        belief: 'If I tell {person} I’ve been feeling low lately, then {person} won’t know ' +
          'what to do with it.',
        expect: 'They’ll say something kind, change the subject, and be careful around me ' +
          'after.'
      },
      {
        belief: 'If I tell {person} I’ve been feeling low lately, then {person} will start ' +
          'worrying about me.',
        expect: 'They’ll check up on me, and I’ll wish I’d never said it.'
      },
      {
        belief: 'If I tell {person} I’ve been feeling low lately, then it’s the thing {person} ' +
          'thinks of every time they see me.',
        expect: 'I’ll be the one who isn’t doing well, and that’s what I’ll stay.'
      }
    ],
    test: 'Tell one person you trust, today, in one sentence, that you’ve been feeling low lately.',
    drop: 'Don’t add that it’s nothing really, and don’t ask whether that was too much.',
    lane: 'social'
  },
  {
    id: 'strug',
    label: 'Telling someone I’m struggling',
    belief: 'If I let someone see I’m struggling, then it costs me something with them.',
    /* B41's second skeleton. Same note as `no`: NOT YET READ BY MISHA OR THE CBT REVIEWER. */
    skeleton: {
      if: 'tell {person} one true thing I’m finding hard',
      holes: { person: 'somebody' }
    },
    beliefs: [
      {
        belief: 'If I tell {person} one true thing I’m finding hard, then {person} will think less of me.',
        expect: '{person} will go quiet, change the subject, and keep a bit of distance after.'
      },
      {
        belief: 'If I tell {person} one true thing I’m finding hard, then {person} will wonder what else I can’t manage.',
        expect: 'It’ll come up again the next time something needs doing.'
      },
      {
        belief: 'If I tell {person} one true thing I’m finding hard, then I’ll be the one everybody has to work around.',
        expect: 'People will start being careful with me, and I’ll hate it.'
      }
    ],
    /* B42's second three. Same note as `no`: NOT YET READ BY MISHA OR THE CBT REVIEWER. */
    sizes: [
      {
        name: 'A small go',
        do: 'Tell {person} one true sentence about how this week has been.',
        drop: 'Don’t finish it with “but I’m fine”.'
      },
      {
        name: 'A bigger go',
        do: 'Tell {person} the thing you would normally keep to yourself.',
        drop: 'Don’t make a joke of it, and don’t move it on afterwards.'
      },
      {
        name: 'The whole thing',
        do: 'Tell {person} what you are actually finding hard, and let it be a conversation.',
        drop: 'No “but I’m fine”, no joke, and no changing the subject.'
      }
    ],
    test: 'Tell {person} one true sentence about how this week has been.',
    drop: 'Don’t finish it with “but I’m fine”.',
    lane: 'social'
  },
  {
    id: 'mist',
    label: 'Owning up to a mistake before anyone finds it',
    belief: 'If I own up to a mistake, then it counts against me.',
    skeleton: {
      if: 'tell {person} about one small mistake of mine before they find it',
      holes: { person: 'somebody' }
    },
    beliefs: [
      {
        belief: 'If I tell {person} about one small mistake of mine before they find it, then ' +
          'it’ll be held against me later.',
        expect: 'They’ll remember this one, and trust me with less next time.'
      },
      {
        belief: 'If I tell {person} about one small mistake of mine before they find it, then ' +
          '{person} will start looking for others.',
        expect: 'Everything I do goes under the microscope after this.'
      },
      {
        belief: 'If I tell {person} about one small mistake of mine before they find it, then ' +
          '{person} will think worse of me than if I’d quietly fixed it.',
        expect: 'They’ll be fine to my face, and it’ll go on my record anyway.'
      }
    ],
    test: 'Tell someone about one small mistake of yours today, before they find it.',
    drop: 'Don’t bury it in excuses, and don’t wait until you’ve already fixed it.',
    lane: 'perfectionism'
  },
  {
    id: 'angry',
    label: 'Telling someone they’ve annoyed me',
    belief: 'If I say that something’s annoyed me, then it’ll go badly.',
    skeleton: {
      if: 'tell {person} one thing they’ve done that annoyed me',
      holes: { person: 'somebody' }
    },
    beliefs: [
      {
        belief: 'If I tell {person} one thing they’ve done that annoyed me, then it’ll turn ' +
          'into an argument.',
        expect: 'They’ll get defensive, and it’ll turn into a much bigger thing.'
      },
      {
        belief: 'If I tell {person} one thing they’ve done that annoyed me, then {person} will ' +
          'say I’m making something out of nothing.',
        expect: 'I’ll come out of it feeling like the unreasonable one.'
      },
      {
        belief: 'If I tell {person} one thing they’ve done that annoyed me, then things will ' +
          'be off between us for days.',
        expect: 'It’ll be polite and cold, and I’ll be the one who has to fix it.'
      }
    ],
    test: 'Say one thing that annoyed you, in one sentence, calmly. Then stop talking.',
    drop: 'Don’t raise your voice, and don’t bring up a second thing.',
    lane: 'assertiveness'
  },
  {
    /*
      B19. The founder's "being condescending because I feel inferior" — the worry is about
      status in a conversation, so it lives in the social lane, not assertiveness.
    */
    id: 'right',
    label: 'Letting someone else be right',
    belief: 'If I let someone else be right, then I lose something.',
    skeleton: {
      if: 'tell {person} they’re right and leave it there',
      holes: { person: 'somebody' }
    },
    beliefs: [
      {
        belief: 'If I tell {person} they’re right and leave it there, then I’ll look like I ' +
          'don’t know what I’m talking about.',
        expect: 'They’ll take it as a win, and I’ll go down in their estimation.'
      },
      {
        belief: 'If I tell {person} they’re right and leave it there, then {person} will talk ' +
          'over me from then on.',
        expect: 'Next time they won’t even wait for my answer.'
      },
      {
        belief: 'If I tell {person} they’re right and leave it there, then nobody will ask ' +
          'what I think again.',
        expect: 'The conversation will move on, and I’ll stay out of it.'
      }
    ],
    test: 'Once today, say “you’re right, I hadn’t thought of that” — and then stop.',
    drop: 'No “but”, and don’t add a point of your own to level it back up.',
    lane: 'social'
  },
  {
    /* B19. The founder's "not listening". */
    id: 'hear',
    label: 'Letting someone finish without interrupting',
    belief: 'If I don’t get in quickly, then I lose my place in the conversation.',
    skeleton: {
      if: 'let {person} finish before I say my bit',
      holes: { person: 'somebody' }
    },
    beliefs: [
      {
        belief: 'If I let {person} finish before I say my bit, then I’ll look like I’ve got ' +
          'nothing worth saying.',
        expect: 'The conversation will move on without me and I’ll have missed my go.'
      },
      {
        belief: 'If I let {person} finish before I say my bit, then I’ll forget what I was ' +
          'going to say.',
        expect: 'It’ll go out of my head and I’ll sit there with nothing.'
      },
      {
        belief: 'If I let {person} finish before I say my bit, then {person} will take the ' +
          'whole conversation.',
        expect: 'I’ll come out of it having said nothing at all.'
      }
    ],
    test: 'In one conversation today, let them finish, then ask one question before you say your bit.',
    drop: 'Don’t plan your answer while they’re still talking, and don’t finish their sentence.',
    lane: 'social'
  },
  {
    /* B19. The founder's "insulting or making fun of people". */
    id: 'joke',
    label: 'Getting through a conversation without a joke',
    belief: 'If I’m not the funny one, then people won’t want to talk to me.',
    skeleton: {
      if: 'say the plain thing to {person} where I’d normally reach for the joke',
      holes: { person: 'somebody' }
    },
    beliefs: [
      {
        belief: 'If I say the plain thing to {person} where I’d normally reach for the joke, ' +
          'then I’ll be dull and {person} will drift off.',
        expect: 'The conversation will go flat, and they’ll find someone else to talk to.'
      },
      {
        belief: 'If I say the plain thing to {person} where I’d normally reach for the joke, ' +
          'then it’ll get too serious and {person} will be uncomfortable.',
        expect: 'There’ll be a silence, and I’ll be the one who made it.'
      },
      {
        belief: 'If I say the plain thing to {person} where I’d normally reach for the joke, ' +
          'then nobody will bother keeping it going.',
        expect: 'It’ll be hard work, and they’ll leave earlier than they would have.'
      }
    ],
    test: 'In one conversation today, say the plain thing where you’d normally reach for the joke.',
    drop: 'No laughing it off when it gets serious, and no making anyone else the punchline.',
    lane: 'social'
  },
  {
    /* B19. Repair, which the twelve had no item for. */
    id: 'sorry',
    label: 'Apologising without explaining myself',
    belief: 'If I properly apologise, then it’ll be used against me.',
    skeleton: {
      if: 'say sorry to {person} for one specific thing I did',
      holes: { person: 'somebody' }
    },
    beliefs: [
      {
        belief: 'If I say sorry to {person} for one specific thing I did, then {person} will ' +
          'hold it over me from now on.',
        expect: 'They’ll accept it, and then bring it up the next time we disagree.'
      },
      {
        belief: 'If I say sorry to {person} for one specific thing I did, then {person} will ' +
          'think it was worse than it was.',
        expect: 'They’ll decide something’s wrong with me, on the strength of one bad day.'
      },
      {
        belief: 'If I say sorry to {person} for one specific thing I did, then I’ve taken the ' +
          'whole thing on myself.',
        expect: 'Their part in it never gets mentioned again.'
      }
    ],
    test: 'Say sorry to one person today, for one specific thing you did. One sentence.',
    drop: 'Don’t explain what kind of day you were having, and don’t ask whether you’re all right now.',
    lane: 'social'
  },
  {
    /*
      Q2d, and the one item Misha has the casting vote on. The worry is other people
      noticing, not the thing itself, so the label says so: nothing on the list should read
      as a test of the habit to someone in early recovery. If it still does, it comes out.
    */
    id: 'drink',
    label: 'Turning up and not joining in',
    belief: 'If I turn up and don’t join in, then it won’t go unnoticed.',
    skeleton: {
      if: 'turn up to {thing} and don’t join in',
      holes: { thing: 'something' }
    },
    beliefs: [
      {
        belief: 'If I turn up to {thing} and don’t join in, then everyone will notice and ask me ' +
          'why.',
        expect: 'Someone will say something, and then the whole table will be looking at me.'
      },
      {
        belief: 'If I turn up to {thing} and don’t join in, then I’ll spoil it for everybody ' +
          'else.',
        expect: 'It’ll go a bit flat, and they’ll wish I hadn’t come.'
      },
      {
        belief: 'If I turn up to {thing} and don’t join in, then I won’t enjoy any of it.',
        expect: 'I’ll be counting the minutes and wishing I’d stayed at home.'
      }
    ],
    test: 'Turn up, order something soft, and count how many people actually say anything.',
    drop: 'Don’t arrive with a reason ready, and don’t hold a glass as cover.',
    lane: 'social'
  },
  {
    /* B19. The other half of an evening out, and the cheaper one to try. */
    id: 'early',
    label: 'Leaving before everyone else does',
    belief: 'If I leave early, then it costs me something with them.',
    skeleton: {
      if: 'leave at the time I decided and say plainly that I’m going',
      holes: {}
    },
    beliefs: [
      {
        belief: 'If I leave at the time I decided and say plainly that I’m going, then people ' +
          'will think I’m boring and stop asking me.',
        expect: 'Someone will try to talk me into staying, and I’ll feel like I’ve let them ' +
          'down.'
      },
      {
        belief: 'If I leave at the time I decided and say plainly that I’m going, then they’ll ' +
          'talk about me once I’ve gone.',
        expect: 'There’ll be a comment about it, and I’ll hear it repeated later.'
      },
      {
        belief: 'If I leave at the time I decided and say plainly that I’m going, then I’ll ' +
          'have missed the part everyone remembers.',
        expect: 'They’ll be laughing about something next week and I won’t have been there.'
      }
    ],
    test: 'Decide before you go what time you’re leaving. At that time, say one sentence and go.',
    drop: 'Don’t apologise for going, and don’t promise to stay longer next time.',
    lane: 'social'
  }
];

if (typeof module === 'object' && module.exports) module.exports = BETR_WORRIES;
else (self.Betr = self.Betr || {}).worries = BETR_WORRIES;
