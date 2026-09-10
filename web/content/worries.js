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
    sizes   three of them, small to big, each one a name and the two sentences that go with
            it — a `do` and a `drop`. They are what the person picks between on the plan
            screen, and picking one fills both boxes. Required since B45 §5b
    test    one line, doable today, cheap, legal, reversible, in the person's control. It is
            `sizes[0].do` word for word, and content.js fails the build if it drifts
    drop    the safety behaviour to leave out. Without it the item is not an experiment. It
            is `sizes[0].drop` word for word, held the same way
    lane    social | assertiveness | perfectionism | urge-timing | rest | sleep

  B45 §5b, 2026-09-09. THREE SIZES ON EVERY WORRY, AND WHY IT WAS FIFTEEN LINES OF CONTENT
  AND NOT A FEATURE.

  B42 gave two worries three named sizes and left the other fifteen falling through to the
  generic three in starts.js — "Do it once today, in the smallest version that still counts".
  Worse than generic: those fifteen arrived on the plan screen with their own `test` already
  in the box, and a suggestion row gets out of the way the moment the box has words in it. So
  fifteen of seventeen worries had NO DIAL AT ALL on the screen the dial is for. B46 stopped
  the row hiding; this is the reason it was ever hidden.

  HOW THE THREE ARE WRITTEN, AND IT IS THE SAME JOB AS THE THREE PREDICTIONS:
    - they are ONE action, three sizes apart. Not three different actions
    - WHO IT IS WITH DOES NOT CHANGE between them. Whether the smallest honest version should
      instead turn that dial is B42's open question and it is the paid reviewer's, with Misha
      (`W-NO-D1` / `W-ST-D1` in docs/suggestions-review.csv). Nothing here pre-empts it
    - WHAT IS LEFT OUT GROWS WITH THE STEP. A big go with a small leave-out is not a bigger
      test, it is a different one
    - the smallest is the worry's own `test` and `drop`, so there is one wording per worry
      rather than two, and the reviewer scores it once

  NOT READ BY MISHA OR THE PAID CBT REVIEWER. SIXTY new sentences went in that day — two new
  sizes on each of fifteen worries, a `do` and a `drop` each — and every one of them is BETR
  proposing something, which is the half of rule 4 that did not loosen on 2026-09-08. All
  ninety rows are in docs/suggestions-review.csv as `W-*-D1`…`X3`, beside the predictions
  they belong to.

  FOURTEEN `test` LINES WERE REWORDED THE SAME DAY, and the reason is one thing: they had to
  carry the worry's hole. "Set a ten-minute timer" became "Set a timer for {long}", because
  the small go IS the `test` and a person who has typed "twenty minutes" into the blank
  cannot be handed a ten-minute timer three sentences later. Every one of them is a `W-*-D1`
  row. `low` lost more than a hole: "Tell one person you trust" is now "Tell {person}",
  because she names the person on the screen before this one, and being told to pick somebody
  she trusts after she has named them is a guard arriving too late to guard anything. If the
  reviewer wants it back it goes in the hole's own default word, not in the sentence.

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
  experiment actually tests: `rest` belief 2 ("If anyone sees me sitting down" → "If I let
  somebody see me sitting down"), `low` belief 0 ("If they know" → "If I tell them"), and
  `phone` belief 1, which went with `phone` in the B47 cull. The prediction underneath each is
  unchanged. THE PAID CBT REVIEWER SHOULD READ THE TWO SURVIVORS ALONGSIDE THE REST; they are
  the only sentences left in this file that a session has rewritten since B1.

  RETIRED IDS. An id in a person's own record cannot be brought back — `rate.keyOf()` keys a
  belief ladder by id — so a deleted worry's id is retired, never reused, and its explanation
  goes with it. `cut` (Saying I'm cutting back) went on 2026-09-03. `phone` (Going an evening
  without my phone), `reply` (Not answering a message straight away), `check` (Sending
  something without checking it again) and `mist` (Owning up to a mistake before anyone finds
  it) went on 2026-09-09, in B47's cull, at the founder's call. Six of them were the same
  thing said twice — `check` was #05 and #19 in starts.js, `reply` was #06 and #20 — and
  `phone` was cut because some people do have emergencies.

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
    sizes: [
      {
        name: 'A small go',
        do: 'Set a timer for {long} and do nothing at all. Notice when it peaks, and whether it drops.',
        drop: 'Don’t reach for your phone, and don’t get up to do a task.'
      },
      {
        name: 'A bigger go',
        do: 'Sit with the restlessness for {long} at the moment you’d normally get up and do something about it.',
        drop: 'Don’t reach for your phone, don’t get up to a task, and don’t start something else instead.'
      },
      {
        name: 'The whole thing',
        do: 'Sit with the restlessness for {long} and let it get as loud as it’s going to get.',
        drop: 'Nothing at all to break it up: no phone, no tidying, and nothing to do instead.'
      }
    ],
    test: 'Set a timer for {long} and do nothing at all. Notice when it peaks, and whether it drops.',
    drop: 'Don’t reach for your phone, and don’t get up to do a task.',
    lane: 'urge-timing'
  },
  {
    /*
      B19, and B47 left it carrying the door on its own. It used to be the other half of a
      pair: `phone` was about being unreachable, this one about falling behind everybody
      else. `phone` went in the cull, so what is left behind that door is the scroll and not
      being able to sit still without it — which is what the door's own line already says.
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
    sizes: [
      {
        name: 'A small go',
        do: 'Go {long} without opening the apps you scroll. At the end, write down what you actually missed.',
        drop: 'No opening one “just to see if anyone’s messaged me”.'
      },
      {
        name: 'A bigger go',
        do: 'Go {long} without opening them, and don’t ask anyone what you missed either.',
        drop: 'No opening one to check, and no catching up at the end of it.'
      },
      {
        name: 'The whole thing',
        do: 'Go {long} without opening them, and tell nobody you’re doing it.',
        drop: 'No warning anyone first, no explaining afterwards, and no scrolling back through it later.'
      }
    ],
    test: 'Go {long} without opening the apps you scroll. At the end, write down what you actually missed.',
    drop: 'No opening one “just to see if anyone’s messaged me”.',
    lane: 'urge-timing'
  },
  {
    /*
      B19, and since B47 it is the only one of its pair left. `check` was about a mistake
      getting through; this is about the standard itself — stopping at good enough when
      nothing is wrong with it. The founder asked for both in B19 and cut `check` in B47.
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
    sizes: [
      {
        name: 'A small go',
        do: 'Finish {thing} today at good enough and hand it over. Write down the time you stopped.',
        drop: 'No last look through, and no message saying what you’d have done with more time.'
      },
      {
        name: 'A bigger go',
        do: 'Hand over {thing} while you can still see things you’d change.',
        drop: 'No last look through, no message about the state of it, and no fixing it after you’ve sent it.'
      },
      {
        name: 'The whole thing',
        do: 'Hand over {thing} the moment it does the job, and don’t look at it again.',
        drop: 'Nothing checked over, nothing apologised for, and nothing put right afterwards.'
      }
    ],
    test: 'Finish {thing} today at good enough and hand it over. Write down the time you stopped.',
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
        /*
          B45 §5c, 2026-09-10, AND IT IS THE ONE OVERLAPPING PAIR WHERE THE START'S WORDING
          WON. This said "not pulling my weight". starts.js #08 said "somebody will think I've
          gone slack" for the same act, and that one had already been through the founder —
          `S08-P3` in the sheet — while this one had not. It also carried a word-list hit:
          "weight" is on the BODY list, so the moment the sweep in content.test.js widened to
          cover every prediction, an idiom about workload read as a sentence about a body.
        */
        belief: 'If I rest for {long} while there’s still stuff to do, then somebody will ' +
          'think I’ve gone slack.',
        expect: 'Somebody will make a comment about it, and it’ll stick.'
      }
    ],
    sizes: [
      {
        name: 'A small go',
        do: 'Plan {long} of rest today and actually take it. Notice how you feel after.',
        drop: 'No “I’ll just quickly do this one thing” first.'
      },
      {
        name: 'A bigger go',
        do: 'Rest for {long} at the point in the day you’d normally push on through.',
        drop: 'Nothing finished off first, and nothing made up for later.'
      },
      {
        name: 'The whole thing',
        do: 'Rest for {long} with the list untouched, and let the day end that way.',
        drop: 'Nothing done first, nothing done after, and no explaining the state of the list to anyone.'
      }
    ],
    test: 'Plan {long} of rest today and actually take it. Notice how you feel after.',
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
    sizes: [
      {
        name: 'A small go',
        do: 'Say one specific good thing about {person} today, to their face.',
        drop: 'Don’t follow it with one about yourself, and don’t wait around for one back.'
      },
      {
        name: 'A bigger go',
        do: 'Say the good thing you’ve thought about {person} and never said out loud.',
        drop: 'Don’t make a joke of it, don’t follow it with one about yourself, and don’t wait for one back.'
      },
      {
        name: 'The whole thing',
        do: 'Tell {person} the whole of it, in as many words as it takes, and stop there.',
        drop: 'No joke, nothing about yourself, and no moving straight on to something else.'
      }
    ],
    test: 'Say one specific good thing about {person} today, to their face.',
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
    sizes: [
      {
        name: 'A small go',
        do: 'Tell {person}, today, one specific thing you’re glad about them.',
        drop: 'Don’t turn it into a joke, and don’t move straight on to something else.'
      },
      {
        name: 'A bigger go',
        do: 'Tell {person} why they matter to you, in your own words.',
        drop: 'Don’t make a joke of it, and don’t change the subject straight after.'
      },
      {
        name: 'The whole thing',
        do: 'Tell {person} the whole of what you’d want them to know, and stay in the conversation after it.',
        drop: 'No joke, no changing the subject, and no leaving as soon as you’ve said it.'
      }
    ],
    test: 'Tell {person}, today, one specific thing you’re glad about them.',
    drop: 'Don’t turn it into a joke, and don’t move straight on to something else.',
    lane: 'social'
  },

  {
    /*
      B45 §5c, 2026-09-10, AND IT IS THE FOUNDER'S OWN, driving home behind a slow car on
      2026-09-08: "If I don't overtake slow cars, I'll end up late for my appointments —
      obviously not true on a ten-minute drive, and I'd reduce my belief pretty quickly."
      It lived in starts.js as start #09 and had no worry at all, so the front door offered
      it and the worry road had never heard of it. Written as the rule underneath rather
      than as the car, so it is the same test for somebody who does not drive.

      THE HOLE IS THE BUFFER AND NOT THE PLACE. "Leave for {thing}" made a sentence about
      an errand; the thing being tested is the extra time, so that is what she sizes.

      WEAKEST DOOR FIT OF THE TWENTY, AND IT IS A QUESTION FOR THE FOUNDER AND MISHA. It
      sits behind `work` because the standard being protected is the same one — nothing
      handed over until it cannot be faulted, nowhere arrived at without a margin. Nobody
      has said that is where a person would look for it.
    */
    id: 'ontime',
    label: 'Leaving later than I normally would',
    belief: 'If I cut the extra time out, then something will go wrong.',
    skeleton: {
      if: 'leave {long} later than I normally would',
      holes: { long: 'ten minutes' }
    },
    beliefs: [
      {
        belief: 'If I leave {long} later than I normally would, then I’ll be late and it’ll ' +
          'look bad.',
        expect: 'I’ll walk in after it started and everybody will clock it.'
      },
      {
        belief: 'If I leave {long} later than I normally would, then people will think I ' +
          'don’t take it seriously.',
        expect: 'Somebody will make a remark about the time I got there.'
      },
      {
        belief: 'If I leave {long} later than I normally would, then the rest of the day ' +
          'will run behind.',
        expect: 'One late start and everything after it slides.'
      }
    ],
    sizes: [
      {
        name: 'A small go',
        do: 'Leave {long} later than you normally would, once, and write down what time you actually arrived.',
        drop: 'Don’t message ahead to say where you are.'
      },
      {
        name: 'A bigger go',
        do: 'Leave {long} later for something that actually matters to you.',
        drop: 'Don’t message ahead, and don’t make the time back by hurrying.'
      },
      {
        name: 'The whole thing',
        do: 'Leave with nothing built in at all, and arrive when you arrive.',
        drop: 'No spare time, no message ahead, and no apologising for the time you got there.'
      }
    ],
    test: 'Leave {long} later than you normally would, once, and write down what time you actually arrived.',
    drop: 'Don’t message ahead to say where you are.',
    lane: 'perfectionism'
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
      B45 §5b gave the other fifteen worries three of their own on the same day; these two
      were the pattern the fifteen were written against, and they are unchanged.

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
    sizes: [
      {
        name: 'A small go',
        do: 'Ask {person} for one small, specific favour today.',
        drop: 'No “sorry to bother you”, and no offering something back.'
      },
      {
        name: 'A bigger go',
        do: 'Ask {person} for help with something you’d normally push through on your own.',
        drop: 'No “sorry to bother you”, no explaining why you can’t manage it, and nothing offered back.'
      },
      {
        name: 'The whole thing',
        do: 'Ask {person} for the help you actually need, and let them decide.',
        drop: 'Nothing softened, no apology for asking, and no making up for it afterwards.'
      }
    ],
    test: 'Ask {person} for one small, specific favour today.',
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
    sizes: [
      {
        name: 'A small go',
        do: 'Tell {person}, today, in one sentence, that you’ve been feeling low lately.',
        drop: 'Don’t add that it’s nothing really, and don’t ask whether that was too much.'
      },
      {
        name: 'A bigger go',
        do: 'Tell {person} how long it’s been going on for.',
        drop: 'Don’t say it’s nothing really, and don’t make it sound more finished than it is.'
      },
      {
        name: 'The whole thing',
        do: 'Tell {person} what it’s actually been like, and let them ask about it.',
        drop: 'No making light of it, no cutting it short, and no apologising for having said it.'
      }
    ],
    test: 'Tell {person}, today, in one sentence, that you’ve been feeling low lately.',
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
    sizes: [
      {
        name: 'A small go',
        do: 'Tell {person} one thing they’ve done that annoyed you, in one sentence, calmly. Then stop talking.',
        drop: 'Don’t raise your voice, and don’t bring up a second thing.'
      },
      {
        name: 'A bigger go',
        do: 'Tell {person} about the thing that has annoyed you more than once.',
        drop: 'Don’t soften it with a joke, and don’t say it’s fine afterwards.'
      },
      {
        name: 'The whole thing',
        do: 'Tell {person} the whole of what annoyed you, and let there be a silence after it.',
        drop: 'No joke, nothing taken back, and no making up for it later.'
      }
    ],
    test: 'Tell {person} one thing they’ve done that annoyed you, in one sentence, calmly. Then stop talking.',
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
    sizes: [
      {
        name: 'A small go',
        do: 'Once today, tell {person} “you’re right, I hadn’t thought of that” — and then stop.',
        drop: 'No “but”, and don’t add a point of your own to level it back up.'
      },
      {
        name: 'A bigger go',
        do: 'Tell {person} they’re right about something you’d normally argue.',
        drop: 'No “but”, nothing of your own added, and no going back to it an hour later.'
      },
      {
        name: 'The whole thing',
        do: 'Tell {person} they’re right, say what changed your mind, and leave it there.',
        drop: 'No “but”, no point of your own, and no bringing it up again another day.'
      }
    ],
    test: 'Once today, tell {person} “you’re right, I hadn’t thought of that” — and then stop.',
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
    sizes: [
      {
        name: 'A small go',
        do: 'In one conversation today, let {person} finish, then ask one question before you say your bit.',
        drop: 'Don’t plan your answer while they’re still talking, and don’t finish their sentence.'
      },
      {
        name: 'A bigger go',
        do: 'Let {person} finish the thing you already disagree with, and ask what they mean by it.',
        drop: 'Don’t plan your answer while they’re talking, don’t finish their sentence, and don’t jump in at the pause.'
      },
      {
        name: 'The whole thing',
        do: 'Let {person} say the whole thing, ask two questions about it, and only then say your bit.',
        drop: 'Nothing interrupted, nothing finished for them, and nothing planned while they’re still going.'
      }
    ],
    test: 'In one conversation today, let {person} finish, then ask one question before you say your bit.',
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
    sizes: [
      {
        name: 'A small go',
        do: 'In one conversation with {person} today, say the plain thing where you’d normally reach for the joke.',
        drop: 'No laughing it off when it gets serious, and no making anyone else the punchline.'
      },
      {
        name: 'A bigger go',
        do: 'Say the plain thing to {person} about something that actually matters to you.',
        drop: 'No laughing it off, nobody made the punchline, and no lightening it at the end.'
      },
      {
        name: 'The whole thing',
        do: 'Get through a whole conversation with {person} without one joke in it.',
        drop: 'No joke, no laughing it off, and nothing said to break it up when it gets serious.'
      }
    ],
    test: 'In one conversation with {person} today, say the plain thing where you’d normally reach for the joke.',
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
    sizes: [
      {
        name: 'A small go',
        do: 'Say sorry to {person} today, for one specific thing you did. One sentence.',
        drop: 'Don’t explain what kind of day you were having, and don’t ask whether you’re all right now.'
      },
      {
        name: 'A bigger go',
        do: 'Say sorry to {person} for the thing you’ve been hoping they’d forget.',
        drop: 'No reasons, and no asking whether you’re all right now.'
      },
      {
        name: 'The whole thing',
        do: 'Say sorry to {person}, say what you’d do differently, and stop there.',
        drop: 'No reasons, nothing asked for back, and no making up for it afterwards.'
      }
    ],
    test: 'Say sorry to {person} today, for one specific thing you did. One sentence.',
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
      /* B45 §5b: it was "something", and the small go now reads "Turn up to {thing},
         order something soft" — two somethings in one sentence. */
      holes: { thing: 'the next thing' }
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
    sizes: [
      {
        name: 'A small go',
        do: 'Turn up to {thing}, order something soft, and count how many people actually say anything.',
        drop: 'Don’t arrive with a reason ready, and don’t hold a glass as cover.'
      },
      {
        name: 'A bigger go',
        do: 'Turn up to {thing} and stay as long as you would have stayed anyway.',
        drop: 'No reason ready at the door, nothing held as cover, and no leaving when it gets awkward.'
      },
      {
        name: 'The whole thing',
        do: 'Turn up to {thing}, stay to the end, and say plainly that you’re not joining in.',
        drop: 'No reason ready, nothing in your hand as cover, and no going quiet to get through it.'
      }
    ],
    test: 'Turn up to {thing}, order something soft, and count how many people actually say anything.',
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
    sizes: [
      {
        name: 'A small go',
        do: 'Decide before you go what time you’re leaving. At that time, say one sentence and go.',
        drop: 'Don’t apologise for going, and don’t promise to stay longer next time.'
      },
      {
        name: 'A bigger go',
        do: 'Leave at the point you actually want to go, not at the next gap in the evening.',
        drop: 'Don’t apologise for going, don’t invent a reason, and don’t promise to stay longer next time.'
      },
      {
        name: 'The whole thing',
        do: 'Leave when you want to, say goodbye once, and go.',
        drop: 'No apology, no invented reason, and no staying for one more of anything.'
      }
    ],
    test: 'Decide before you go what time you’re leaving. At that time, say one sentence and go.',
    drop: 'Don’t apologise for going, and don’t promise to stay longer next time.',
    lane: 'social'
  },
  {
    /*
      B45 §5c, 2026-09-10. It was start #02 and had no worry, so the front door offered it
      and the worry road did not. It is not `help`: that one is a favour somebody does for
      you, and this one is the thing you want anyway and ask below.
    */
    id: 'want',
    label: 'Asking for what I actually want',
    belief: 'If I say what I actually want, then I’ll be asking too much.',
    skeleton: {
      if: 'ask {person} straight out for what I actually want',
      holes: { person: 'somebody' }
    },
    beliefs: [
      {
        belief: 'If I ask {person} straight out for what I actually want, then {person} will ' +
          'think I’m taking advantage.',
        expect: 'They’ll say yes, and think less of me for having asked.'
      },
      {
        belief: 'If I ask {person} straight out for what I actually want, then I’ll get a no ' +
          'and feel stupid for asking.',
        expect: 'A flat no, and I’ll wish I’d never brought it up.'
      },
      {
        belief: 'If I ask {person} straight out for what I actually want, then it’ll change ' +
          'how {person} sees me.',
        expect: 'I’ll be filed as somebody who wants a lot.'
      }
    ],
    sizes: [
      {
        name: 'A small go',
        do: 'Ask {person} for one thing you actually want today, in one sentence.',
        drop: 'Don’t ask for less than you want.'
      },
      {
        name: 'A bigger go',
        do: 'Ask {person} for the thing you’d normally settle below.',
        drop: 'Don’t ask for less than you want, and don’t offer anything in return.'
      },
      {
        name: 'The whole thing',
        do: 'Ask {person} for the whole of what you want, and let them answer it.',
        drop: 'Nothing scaled down, no “only if it’s no trouble”, and nothing offered back.'
      }
    ],
    test: 'Ask {person} for one thing you actually want today, in one sentence.',
    drop: 'Don’t ask for less than you want.',
    lane: 'assertiveness'
  },
  {
    /*
      B45 §5c, 2026-09-10, AND IT IS THE MOCKUP'S OWN EXAMPLE. The founder's canvas builds
      its seven screens on "Saying what I actually think", which existed only as start #07
      and had no entry here at all — so the screen the canvas draws could not be reached
      from the worry road. It is not `angry` (something they did) and not `right` (letting
      theirs stand): it is having an opinion out loud.
    */
    id: 'think',
    label: 'Saying what I actually think',
    belief: 'If I say what I really think, then it costs me more than it’s worth.',
    skeleton: {
      if: 'tell {person} what I actually think',
      holes: { person: 'somebody' }
    },
    beliefs: [
      {
        belief: 'If I tell {person} what I actually think, then it’ll turn into a row.',
        expect: 'It’ll go up a level and we’ll both say more than we meant.'
      },
      {
        belief: 'If I tell {person} what I actually think, then {person} will go quiet with me.',
        expect: 'A short answer, and then nothing for a couple of days.'
      },
      {
        belief: 'If I tell {person} what I actually think, then {person} will decide I’m hard ' +
          'work.',
        expect: 'I’ll be the difficult one from then on.'
      }
    ],
    sizes: [
      {
        name: 'A small go',
        do: 'Tell {person} one thing you think and would normally leave unsaid, in one sentence.',
        drop: 'Don’t soften it with a joke.'
      },
      {
        name: 'A bigger go',
        do: 'Tell {person} where you actually disagree with them, out loud.',
        drop: 'Don’t soften it with a joke, and don’t apologise for saying it.'
      },
      {
        name: 'The whole thing',
        do: 'Say the whole of what you think to {person}, and let it sit there.',
        drop: 'No joke, no apology, and nothing taken back later in the day.'
      }
    ],
    test: 'Tell {person} one thing you think and would normally leave unsaid, in one sentence.',
    drop: 'Don’t soften it with a joke.',
    lane: 'social'
  }

];

/*
  B45 §5c, 2026-09-10. WHAT IS LEFT OF starts.js, AND IT IS THE PART THAT WAS NEVER A WORRY.

  Until today two files described the same twenty-one things. `starts.js` held twelve items —
  an `if`, three `thens`, two `dos`, two `drops` — and nine of the twelve were the same act as
  a worry above, written a second time, in a second shape, reviewed twice and free to drift.
  The three that were not a worry now are: `want`, `think` and `ontime`.

  So the items are gone and these two are what remains. Neither describes a thing a person
  could pick; one is the fallback and one is an order.
*/

/*
  THE GENERAL SET: what the second blank and the plan screen offer when the first blank holds
  a sentence BETR did not write, which after the first week is most of the time.

  It is short on purpose. Somebody who has typed their own situation does not need a list;
  they need one nudge about the shape of a consequence. `sizes` is REQUIRED here — it is the
  end of the fallback chain, and sizesFor() must never be able to hand back nothing.

  Every line is BETR proposing something, so rule 4 applies to it in full: the version of rule
  4 that did NOT loosen on 2026-09-08. Nothing here names the habit, food, weight, the body or
  anyone's safety, and web/lib/content.js holds it to the same three word lists as a worry.
*/
var BETR_GENERAL = {
  thens: [
    'they’ll think less of me',
    'they’ll go quiet with me',
    'it’ll be held against me later'
  ],
  /*
    B42, 2026-09-09. THE DIAL ON THE ROAD MOST PEOPLE ARE ON. These three replaced the two
    loose `dos` and two loose `drops` the general set used to carry, and they are the same
    sentences turned into a dial: a name, a whole step, and the leave-out that belongs to that
    step. Small to big, in that order, and nothing here is numbered.
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
};

/*
  THE FRONT DOOR'S TWELVE, IN ORDER. Twelve ids and nothing else — no sentences of their own,
  because that is what the two files were.

  These are the suggestions under the first blank on the road a person reaches from the big
  button. Tapping one puts that worry's skeleton, with its own default words in the holes,
  into the box as plain text. It does NOT borrow the worry: the road decides which worry a
  test belongs to and the words never do (B40, B45 §8.4), so nothing here touches a ladder.

  WHAT A PERSON GETS THAT THEY DID NOT GET YESTERDAY. Until §5c the twelve starts each carried
  two loose plan lines and no sizes, so tapping one of them landed on the generic three. Now
  the words in the box match a worry word for word, and the lookup hands back that worry's own
  three predictions and its own three sizes. Twelve roads stopped being generic; nothing was
  written to make it happen.

  IT IS TWELVE AND NOT TWENTY, AND THAT IS A MEASUREMENT RATHER THAN A TASTE. The row is
  353–998px with twelve chips on a 390px phone. The founder's canvas draws three. Twenty would
  be the wrong direction, and which twelve is the founder's and Misha's — this is the same
  twelve starts.js shipped after B47's cull, in the same order, so nobody's list changed today.

  THE ORDER IS FIXED AND IS THE SAME FOR EVERY PERSON FOR EVER (rules 2 and 3). Nothing here
  is ranked, scored, recently-used or personalised, and content.test.js holds the list by hand
  so a reordering shows up in a diff.
*/
var BETR_FRONT = [
  'no',      /* was start #01, say no without giving a reason */
  'want',    /* was #02, and had no worry until today */
  'strug',   /* #03 */
  'enough',  /* #04 */
  'sit',     /* #05 */
  'rest',    /* #06 */
  'think',   /* #07, the mockup's own example, and had no worry until today */
  'right',   /* #08, "don’t get the last word" */
  'ontime',  /* #09, the founder's own, and had no worry until today */
  'praise',  /* #10 */
  'help',    /* #11 */
  'early'    /* #12 */
];

/*
  Three things out of one file, and in the browser they are three plain globals. Node gets the
  list itself, because every caller wants the list; the other two hang off it rather than
  wrapping it in an envelope, so nothing that already reads this file had to change.
*/
if (typeof module === 'object' && module.exports) {
  module.exports = BETR_WORRIES;
  module.exports.general = BETR_GENERAL;
  module.exports.front = BETR_FRONT;
} else {
  self.Betr = self.Betr || {};
  self.Betr.worries = BETR_WORRIES;
  self.Betr.general = BETR_GENERAL;
  self.Betr.front = BETR_FRONT;
}
