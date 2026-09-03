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

  ORDER: the first taps have to be able to succeed on the day they are taken. Nine of the
  original twelve waited on the world — someone had to ask you for something, a mistake had
  to exist, an evening out had to be happening — so a person's first loop ended in "Didn't
  get to it" and they learned nothing on the one day they were certain to open this. The
  order now runs doable-today-and-alone first (founder's call, 2026-09-03). `strug` moved
  from third to seventh: it is the highest-stakes item on the list, it needs a trusted person
  to be free, and it was sitting in the slot scope §5.3c reserves for an easy win.

  Every phrase here is written fresh (B1, 2026-09-03). Nothing is adapted from CCI,
  Getselfhelp, Therapist Aid, Psychology Tools or Beck Institute material; all of them
  restrict reuse in a product. The five-step method is not protected expression; the words are.

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
  {
    id: 'no',
    label: 'Saying no without an excuse',
    belief: 'If I say no and don’t explain myself, then people will think I’m selfish.',
    expect: 'There’ll be a pause, and they’ll be a bit off with me afterwards.',
    test: 'Say “No, I can’t this time” to one small request today.',
    drop: 'No reason, no apology, no softening it.',
    lane: 'assertiveness'
  },
  {
    id: 'help',
    label: 'Asking for help',
    belief: 'If I ask someone for help, then I become a burden to them.',
    expect: 'They’ll do it, and quietly file me under people who can’t cope.',
    test: 'Ask one person for one small, specific favour today.',
    drop: 'No “sorry to bother you”, and no offering something back.',
    lane: 'assertiveness'
  },
  {
    /*
      Added 2026-09-03, replacing `funny`. Every other social item on this list needed a
      live, spoken, in-person conversation, and for most people under about thirty the worry
      lives in the messages instead. This one can be started inside an hour, alone, without
      anybody agreeing to take part — which is why it sits third (see ORDER above).
    */
    id: 'reply',
    label: 'Not replying straight away',
    belief: 'If I leave a message a few hours, then they’ll think I don’t care.',
    expect: 'They’ll go a bit cooler with me, and I’ll have to make it up to them.',
    test: 'Pick one message today and leave it a few hours before you answer. Notice whether they chase you.',
    drop: 'Don’t open with “sorry, only just seen this”, and don’t explain the delay.',
    lane: 'social'
  },
  {
    /*
      Added 2026-09-03, replacing `favour`. Perfectionism had one item and it needed a job.
      This one works for a student, somebody between jobs, somebody at home, and it is the
      cheapest reversible experiment in the lane.
    */
    id: 'check',
    label: 'Sending it without checking it again',
    belief: 'If I send something without going over it again, then there’ll be a mistake in it and I’ll look sloppy.',
    expect: 'Someone will spot something, and they’ll think I rushed it.',
    test: 'Write one email or message today, read it through once, and send it.',
    drop: 'No second read-through, and don’t go back to edit it after it’s gone.',
    lane: 'perfectionism'
  },
  {
    id: 'sit',
    label: 'Sitting with a bad feeling',
    belief: 'If I feel restless or bored, then I can’t just sit there with it.',
    expect: 'It’ll build and build until I have to do something about it.',
    test: 'Set a ten-minute timer and do nothing at all. Notice when it peaks, and whether it drops.',
    drop: 'Don’t reach for your phone, and don’t get up to do a task.',
    lane: 'urge-timing'
  },
  {
    id: 'phone',
    label: 'An evening off my phone',
    belief: 'If I don’t check tonight, then I’ll miss something that matters.',
    expect: 'Something urgent will come in and I’ll have let someone down.',
    test: 'Put it in a drawer from eight o’clock. In the morning, write down what you actually missed.',
    drop: 'No checking it “just once” before bed.',
    lane: 'urge-timing'
  },
  {
    id: 'strug',
    label: 'Admitting I’m struggling',
    belief: 'If I let someone see I’m struggling, then they’ll think less of me.',
    expect: 'They’ll go quiet, change the subject, and keep a bit of distance after.',
    test: 'Today, tell one person you trust one small, true thing you’re finding hard.',
    drop: 'Don’t finish it with “but I’m fine”.',
    lane: 'social'
  },
  {
    id: 'mist',
    label: 'Owning a mistake at work',
    belief: 'If I admit I got something wrong, then it’ll be held against me later.',
    expect: 'They’ll remember this one, and trust me with less next time.',
    test: 'Tell someone about one small mistake of yours today, before they find it.',
    drop: 'Don’t bury it in excuses, and don’t wait until you’ve already fixed it.',
    lane: 'perfectionism'
  },
  {
    id: 'angry',
    label: 'Saying I’m annoyed, calmly',
    belief: 'If I tell someone I’m annoyed, even calmly, then it’ll turn into an argument.',
    expect: 'They’ll get defensive, and it’ll turn into a much bigger thing.',
    test: 'Say one thing that annoyed you, in one sentence, calmly. Then stop talking.',
    drop: 'Don’t raise your voice, and don’t bring up a second thing.',
    lane: 'assertiveness'
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
      Q2d, and the one item Misha has the casting vote on. The worry is other people
      noticing, not the thing itself, so the label says so: nothing on the list should read
      as a test of the habit to someone in early recovery. If it still does, it comes out.
    */
    id: 'drink',
    label: 'Being the only one not joining in',
    belief: 'If I turn up and don’t join in, then everyone will notice and ask me why.',
    expect: 'Someone will say something, and then the whole table will be looking at me.',
    test: 'Turn up, order something soft, and count how many people actually say anything.',
    drop: 'Don’t arrive with a reason ready, and don’t hold a glass as cover.',
    lane: 'social'
  },
  {
    id: 'cut',
    label: 'Saying I’m cutting back',
    belief: 'If I tell someone I’m cutting back, then they’ll lecture me or feel sorry for me.',
    expect: 'They’ll pull a face, and start asking questions I don’t want to answer.',
    test: 'Tell one person, in one sentence, and then change the subject.',
    drop: 'Don’t explain why, and don’t make a joke of it.',
    lane: 'social'
  }
];

if (typeof module === 'object' && module.exports) module.exports = BETR_WORRIES;
else (self.Betr = self.Betr || {}).worries = BETR_WORRIES;
