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

  Order matters: the first three get most of the taps, so they are the easiest to succeed at.

  Every phrase here is written fresh. Nothing is adapted from CCI, Getselfhelp, Therapist Aid,
  Psychology Tools or Beck Institute material; all of them restrict reuse in a product.

  Why this is a .js file and not worries.json: the founder opens web/index.html straight from
  the filesystem, and browsers refuse to fetch a .json (or load an ES module) from a file://
  page. A classic script tag is the only thing that works both there and on the dev host.
  It is still plain data — one array, no logic.
*/
var BETR_WORRIES = [
  {
    id: 'no',
    label: 'Saying no without an excuse',
    belief: 'If I say no without an excuse, people will think I’m selfish.',
    expect: 'They’ll be annoyed, and it’ll be awkward afterwards.',
    test: 'Say "No, I can’t this time" to one small request today.',
    drop: 'Don’t explain. Don’t apologise.',
    lane: 'assertiveness'
  },
  {
    id: 'help',
    label: 'Asking for help',
    belief: 'If I ask for help, I’ll be a burden.',
    expect: 'They’ll sigh, do it, and think less of me.',
    test: 'Ask one person for one small, specific favour today.',
    drop: 'Don’t say "sorry to bother you".',
    lane: 'assertiveness'
  },
  {
    id: 'strug',
    label: 'Admitting I’m struggling',
    belief: 'If I show I’m struggling, people will think less of me.',
    expect: 'They’ll go quiet and keep their distance.',
    test: 'Tell one person you trust one true, small thing that’s hard right now.',
    drop: 'Don’t follow it with "but I’m fine".',
    lane: 'social'
  },
  {
    id: 'funny',
    label: 'Not being the funny one',
    belief: 'If I’m not the funny one, nobody will want me around.',
    expect: 'The conversation will die and people will drift off.',
    test: 'One evening: listen and ask questions. No jokes.',
    drop: 'Don’t fill the silences.',
    lane: 'social'
  },
  {
    id: 'drink',
    label: 'Not drinking at a social thing',
    belief: 'If I turn up and don’t join in, people will notice and ask.',
    expect: 'Someone will make a comment and everyone will look.',
    test: 'Go, order something soft, and count how many people say anything about it.',
    drop: 'Don’t hold a glass as a prop.',
    lane: 'social'
  },
  {
    id: 'angry',
    label: 'Saying I’m annoyed, calmly',
    belief: 'If I say I’m annoyed calmly, it’ll turn into a fight.',
    expect: 'They’ll get defensive and it’ll blow up.',
    test: 'Say one annoyance in one sentence, calmly. Then stop.',
    drop: 'Don’t raise your voice. Don’t bring up a second thing.',
    lane: 'assertiveness'
  },
  {
    id: 'mist',
    label: 'Owning a mistake at work',
    belief: 'If I admit a mistake, it’ll be held against me.',
    expect: 'They’ll remember it and trust me less.',
    test: 'Tell someone about one small mistake before they find it.',
    drop: 'Don’t bury it in excuses.',
    lane: 'perfectionism'
  },
  {
    id: 'rest',
    label: 'Resting when there’s stuff to do',
    belief: 'If I rest instead of being productive, then I’m worthless.',
    expect: 'I’ll feel guilty the whole time and regret it.',
    test: 'Take a planned two-hour rest today. Notice how you feel after.',
    drop: 'Don’t "just quickly" do one task.',
    lane: 'rest'
  },
  {
    id: 'sit',
    label: 'Sitting with a bad feeling',
    belief: 'If I feel bored or restless, then I can’t sit with it.',
    expect: 'It’ll get worse and worse until I do something.',
    test: 'Set a 10-minute timer and do nothing. Notice when it peaks.',
    drop: 'Don’t pick up your phone.',
    lane: 'urge-timing'
  },
  {
    id: 'phone',
    label: 'An evening off my phone',
    belief: 'If I don’t check tonight, I’ll miss something that matters.',
    expect: 'There’ll be something urgent and I’ll have let someone down.',
    test: 'Put it in a drawer from 8pm. In the morning, list what you missed.',
    drop: 'Don’t check "just once".',
    lane: 'urge-timing'
  },
  {
    id: 'favour',
    label: 'Skipping a favour I always do',
    belief: 'If I stop doing favours, my friends will drift.',
    expect: 'They’ll notice, and be cooler with me.',
    test: 'Skip one favour you always do. See if anyone mentions it.',
    drop: 'Don’t offer before you’re asked.',
    lane: 'assertiveness'
  },
  {
    id: 'cut',
    label: 'Saying I’m cutting back',
    belief: 'If I say I’m cutting back, people will lecture or pity me.',
    expect: 'They’ll make a face and start asking questions.',
    test: 'Tell one person, in one sentence. Then change the subject.',
    drop: 'Don’t explain why.',
    lane: 'social'
  }
];

if (typeof module === 'object' && module.exports) module.exports = BETR_WORRIES;
else (self.Betr = self.Betr || {}).worries = BETR_WORRIES;
