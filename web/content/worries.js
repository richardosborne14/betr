/*
  Betr's stock list. This file is the product; everything else is plumbing.

  Six parts per item, all required (scope §5.2):
    id      stable, never reused, never renamed — stored results point at it
    label   the button text. The situation, in plain words. Never a diagnosis
    belief  "If I ___, then ___". How people will react, or how it will feel
    expect  one sentence, the thing the person is braced for. Shown pre-written, editable
    test    one line, doable today, cheap, legal, reversible, in the person's control
    drop    the safety behaviour to leave out. Without it the item is not an experiment
    lane    social | assertiveness | perfectionism | urge-timing | rest | sleep

  Hard rule: no `test` may touch the habit itself — no drink, screen, substance, food
  restriction, body sensation, checking ritual, or anyone's safety. web/tests/content.test.js
  enforces this against the same word list the custom-entry guard uses.

  B19, 2026-09-03. Twenty-one items, four to six behind each door. THE LABEL IS THE PART
  THAT CHANGED. Two people were watched using the twelve, and both stalled on the pick list:
  what they were holding in their head was a problem, and what the screen offered was twelve
  two-word summaries of sentences the app would not show them for another four screens. The
  `belief` is now drawn under the label on the button, and every label was rewritten against
  one rule (founder, 2026-09-03):

      Somebody reading only the label knows what act is being proposed.

  Which rules out three things a label used to do. **A pronoun with nothing to point at** —
  "Handing it over" became "Handing something over". **An open channel** — "Not replying
  straight away" could have been a conversation; it is messages, and now it says so. And
  **a safety behaviour smuggled into the label**: "Saying I'm annoyed, calmly" put the `drop`
  on the button, which quietly narrowed the worry to people already willing to speak up. The
  worry is telling someone at all. "Calmly" belongs in `test`, and that is where it is.

  ORDER, AND WHY IT IS NOW PER DOOR: the first tap has to be able to succeed on the day it is
  taken, or a person's first loop ends in "Didn't get to it" and they learn nothing on the one
  day they were certain to open this. Most items wait on the world — somebody has to ask you
  for something, a mistake has to exist, an evening has to be happening. So the first item
  behind every door is one that can be started today by somebody with nobody free, and
  web/tests/content.test.js holds that list by hand so a reordering shows up in a diff.
  The order of this array is the same rule applied to the whole list, and is only ever seen
  if a person reaches the pick screen without going through a door.

  `cut` (Saying I'm cutting back) was deleted on 2026-09-03 at the founder's call. Its id is
  retired, not reused, and its explanation went with it.

  Every phrase here is written fresh. Nothing is adapted from CCI, Getselfhelp, Therapist Aid,
  Psychology Tools or Beck Institute material; all of them restrict reuse in a product. The
  five-step method is not protected expression; the words are.

  How these are written, and why (research §8, the language bank):
    - the audience is the person nobody knows this about — "the functional one". So an
      `expect` is what they are actually braced for, in their own voice, and small enough
      to be true: someone going quiet, a face, being filed away. Never a catastrophe.
    - every `test` ends in something a person can observe and report in one sentence,
      because that sentence is the whole record.
    - every `drop` names the safety behaviour by what they would actually do, not by a
      clinical label. It renders as: "<drop> That's the bit that makes it count."

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
    belief: 'If I feel restless or bored, then I can’t just sit there with it.',
    expect: 'It’ll build and build until I have to do something about it.',
    test: 'Set a ten-minute timer and do nothing at all. Notice when it peaks, and whether it drops.',
    drop: 'Don’t reach for your phone, and don’t get up to do a task.',
    lane: 'urge-timing'
  },
  {
    id: 'phone',
    label: 'Going an evening without my phone',
    belief: 'If I don’t check tonight, then I’ll miss something that matters.',
    expect: 'Something urgent will come in and I’ll have let someone down.',
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
    belief: 'If I stop keeping up with everyone, then I’ll fall out of things without noticing.',
    expect: 'I’ll be the only one who hasn’t heard something, and it’ll be obvious.',
    test: 'Go one day without opening the apps you scroll. At the end, write down what you actually missed.',
    drop: 'No opening one “just to see if anyone’s messaged me”.',
    lane: 'urge-timing'
  },
  {
    id: 'reply',
    label: 'Not answering a message straight away',
    belief: 'If I leave a message a few hours, then they’ll think I don’t care.',
    expect: 'They’ll go a bit cooler with me, and I’ll have to make it up to them.',
    test: 'Pick one message today and leave it a few hours before you answer. Notice whether they chase you.',
    drop: 'Don’t open with “sorry, only just seen this”, and don’t explain the delay.',
    lane: 'social'
  },
  {
    id: 'check',
    label: 'Sending something without checking it again',
    belief: 'If I send something without going over it again, then there’ll be a mistake in it and I’ll look sloppy.',
    expect: 'Someone will spot something, and they’ll think I rushed it.',
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
    belief: 'If I hand something in that’s only good enough, then they’ll think I don’t care about it.',
    expect: 'They’ll spot the rough edges and quietly decide I’ve dropped off.',
    test: 'Finish one thing today at good enough and hand it over. Write down the time you stopped.',
    drop: 'No last look through, and no message saying what you’d have done with more time.',
    lane: 'perfectionism'
  },
  {
    id: 'rest',
    label: 'Resting when there’s stuff to do',
    belief: 'If I rest while there’s still stuff to do, then I’m being lazy.',
    expect: 'I’ll feel guilty the whole time and wish I’d just got on with it.',
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
    belief: 'If I say something good about someone and nothing comes back, then it’ll look like I was fishing for one.',
    expect: 'There’ll be an odd beat, and I’ll wish I’d kept it to myself.',
    test: 'Say one specific good thing about somebody today, to their face.',
    drop: 'Don’t follow it with one about yourself, and don’t wait around for one back.',
    lane: 'social'
  },
  {
    id: 'care',
    label: 'Telling someone they matter to me',
    belief: 'If I tell someone what they mean to me, then it’ll be awkward and they won’t say it back.',
    expect: 'They’ll laugh it off, and I’ll wish I hadn’t said it.',
    test: 'Tell one person, today, one specific thing you’re glad about them.',
    drop: 'Don’t turn it into a joke, and don’t move straight on to something else.',
    lane: 'social'
  },

  /* --------------------------------------- waits on somebody else, or on the day itself */

  {
    id: 'no',
    label: 'Saying no without giving a reason',
    belief: 'If I say no and don’t explain myself, then people will think I’m selfish.',
    expect: 'There’ll be a pause, and they’ll be a bit off with me afterwards.',
    test: 'Say “No, I can’t this time” to one small request today.',
    drop: 'No reason, no apology, no softening it.',
    lane: 'assertiveness'
  },
  {
    id: 'help',
    label: 'Asking someone for help',
    belief: 'If I ask someone for help, then I become a burden to them.',
    expect: 'They’ll do it, and quietly file me under people who can’t cope.',
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
    belief: 'If I tell someone I’ve been feeling low, then they won’t know what to do with it and they’ll keep their distance.',
    expect: 'They’ll say something kind, change the subject, and be careful around me after.',
    test: 'Tell one person you trust, today, in one sentence, that you’ve been feeling low lately.',
    drop: 'Don’t add that it’s nothing really, and don’t ask whether that was too much.',
    lane: 'social'
  },
  {
    id: 'strug',
    label: 'Telling someone I’m struggling',
    belief: 'If I let someone see I’m struggling, then they’ll think less of me.',
    expect: 'They’ll go quiet, change the subject, and keep a bit of distance after.',
    test: 'Today, tell one person you trust one small, true thing you’re finding hard.',
    drop: 'Don’t finish it with “but I’m fine”.',
    lane: 'social'
  },
  {
    id: 'mist',
    label: 'Owning up to a mistake before anyone finds it',
    belief: 'If I admit I got something wrong, then it’ll be held against me later.',
    expect: 'They’ll remember this one, and trust me with less next time.',
    test: 'Tell someone about one small mistake of yours today, before they find it.',
    drop: 'Don’t bury it in excuses, and don’t wait until you’ve already fixed it.',
    lane: 'perfectionism'
  },
  {
    id: 'angry',
    label: 'Telling someone they’ve annoyed me',
    belief: 'If I tell someone they’ve annoyed me, then it’ll turn into an argument.',
    expect: 'They’ll get defensive, and it’ll turn into a much bigger thing.',
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
    belief: 'If I agree someone else has the better point, then I’ll look like I don’t know what I’m talking about.',
    expect: 'They’ll take it as a win, and I’ll go down in their estimation.',
    test: 'Once today, say “you’re right, I hadn’t thought of that” — and then stop.',
    drop: 'No “but”, and don’t add a point of your own to level it back up.',
    lane: 'social'
  },
  {
    /* B19. The founder's "not listening". */
    id: 'hear',
    label: 'Letting someone finish without interrupting',
    belief: 'If I don’t get in quickly, then I’ll look like I’ve got nothing worth saying.',
    expect: 'The conversation will move on without me and I’ll have missed my go.',
    test: 'In one conversation today, let them finish, then ask one question before you say your bit.',
    drop: 'Don’t plan your answer while they’re still talking, and don’t finish their sentence.',
    lane: 'social'
  },
  {
    /* B19. The founder's "insulting or making fun of people". */
    id: 'joke',
    label: 'Getting through a conversation without a joke',
    belief: 'If I don’t have something funny ready, then I’ll be dull and people will drift off.',
    expect: 'The conversation will go flat, and they’ll find someone else to talk to.',
    test: 'In one conversation today, say the plain thing where you’d normally reach for the joke.',
    drop: 'No laughing it off when it gets serious, and no making anyone else the punchline.',
    lane: 'social'
  },
  {
    /* B19. Repair, which the twelve had no item for. */
    id: 'sorry',
    label: 'Apologising without explaining myself',
    belief: 'If I properly apologise for how I acted, then they’ll hold it over me from now on.',
    expect: 'They’ll accept it, and then bring it up the next time we disagree.',
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
    belief: 'If I turn up and don’t join in, then everyone will notice and ask me why.',
    expect: 'Someone will say something, and then the whole table will be looking at me.',
    test: 'Turn up, order something soft, and count how many people actually say anything.',
    drop: 'Don’t arrive with a reason ready, and don’t hold a glass as cover.',
    lane: 'social'
  },
  {
    /* B19. The other half of an evening out, and the cheaper one to try. */
    id: 'early',
    label: 'Leaving before everyone else does',
    belief: 'If I leave while it’s still going, then they’ll think I’m boring and stop asking me.',
    expect: 'Someone will try to talk me into staying, and I’ll feel like I’ve let them down.',
    test: 'Decide before you go what time you’re leaving. At that time, say one sentence and go.',
    drop: 'Don’t apologise for going, and don’t promise to stay longer next time.',
    lane: 'social'
  }
];

if (typeof module === 'object' && module.exports) module.exports = BETR_WORRIES;
else (self.Betr = self.Betr || {}).worries = BETR_WORRIES;
