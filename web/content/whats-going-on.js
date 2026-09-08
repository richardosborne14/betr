/*
  The doors. Since B19 this is the way in, not the side door.

  Founder's call, 2026-09-02 (B0 Q2a), and amended 2026-09-03 (B19) after two people were
  watched using the app. Both stalled on the pick list and neither stalled here: a door gives
  a label *and* a line under it, and that is the shape a person can read. So the front screen's
  one big button now leads here, and the worries behind a door carry their own sentence.

  It is still the one screen in Betr that names a behaviour rather than a worry, and scope
  §5.3a calls that the closest thing here to the regulatory line. That reasoning did not
  change when the door moved to the front; three rules hold exactly as they did:

    1. Every label is what a person would say about themselves in the first person. None is a
       diagnosis, a condition, or a category of person (research §5.4).
    2. Nothing here claims to treat, fix, reduce or track anything. A door opens onto four to
       six worries from the same fixed list; that is all it does.
    3. Nothing here becomes a test. Tapping a surface problem shows worries, and every test
       still comes from worries.js, so no test can touch the thing named on this screen.

  WHAT `under` IS FOR NOW. It used to preview the worries — "usually underneath: what people
  will say if…" — because the worries themselves said almost nothing. They say it themselves
  now, so `under` does the other job: recognition. What this looks like from the inside, so a
  person knows in one line whether this is their door.

  `note` IS A SAFETY LINE AND IT IS ON ONE DOOR (founder, 2026-09-03, option c). The `habit`
  door names drink and drugs, which is the wording people find themselves in fastest and also
  the wording that calls to the person frozen sentence 4 excludes — "or are dependent on
  alcohol or drugs. Those need a person, not an app." So that door says so, in the same words,
  at the one moment it is relevant. It is optional and no other door has one. It is not a
  place to hang anything else: web/lib/content.js allows the four fields and no fifth, for the
  reason a place on the Help screen has three — there must be nowhere to put a rule that shows
  one person different words from another.

  THE ORDER IS A DECISION AND IT CHANGED ON 2026-09-04 (B23, founder’s call, options a and c).
  `habit` was first. It is the door the product exists for — two of the three people watched
  in B21 tapped it and said “that’s me” — and it is also four words in which a third nearly
  closed the tab: “drink, weed, porn, betting — oh. Is this a recovery app? That’s not me at
  all.” Her door was sixth, below the fold, and she reached it only because she scrolled.

  So `habit` is second now, behind one door about a phone, and the intro says to read to the
  bottom before picking. That is enough for her: the first thing anybody reads is plainly not
  about recovery, which is the sentence her flinch was asking for.

  IT WAS THIRD FOR AN HOUR AND THE MEASUREMENT SENT IT BACK TO SECOND. The menu is `position:
  fixed` and covers the bottom 59px of the screen, so the first screenful is 785px, not 844.
  With `habit` third its `note` landed at 800–842 — behind the menu, invisible, unreachable
  without scrolling. That note is the one line on this screen that tells a dependent person to
  go somewhere else, and Marcus read it twice in B21. Second puts it at 643–685, clear by a
  hundred pixels. **Whatever else moves here, the door carrying `note` stays first or second**,
  and `content.test.js` fails if it does not.

  `work` is not first, and that was considered: read in four words, “Never letting myself stop”
  can be heard as never letting myself stop drinking, which sends the wrong person through it.

  RELEASE CONDITION: Misha signs off all six labels, all six lines, the note AND THE ORDER
  before this ships to anyone (B0 Q2a; the order is his and the founder’s together, B23).
  B19 rewrote every one of them and B23 moved them, so his read is of six new doors in a new
  order. Built, not cleared.
*/
var BETR_DOORS = {
  /*
    B33, 2026-09-08, and the length of this line is load-bearing. The safety note on door two
    has to be above the fold — B23 measured it at 643–685 with the menu fixed over 785 — and
    every line added above it spends that margin. B32 added a second sentence saying these are
    things to borrow, and the two together pushed the note to 701. So they are one line now,
    and this is the one that carries both jobs: read to the bottom (B23), and nothing here is
    tested as it stands (B32). RE-MEASURE IF YOU LENGTHEN IT.
  */
  intro: 'More than one might fit — read to the bottom. Nothing here gets tested as it is; you take one and change it into yours.',
  foot: 'None of these gets tested. What you expect to happen does.',
  items: [
    {
      id: 'phone',
      label: 'On my phone more than I want to be',
      under: 'Picking it up without deciding to, and the evening’s gone. Half of it is the scroll. Half is not being able to sit still without it.',
      worries: ['phone', 'feed', 'sit', 'reply']
    },
    {
      id: 'habit',
      label: 'Something I keep doing more than I mean to',
      under: 'The one you’ve quietly decided to stop more than once, and haven’t — drink, weed, porn, betting. BETR never goes near the thing itself. Only what you think happens if people see you without it.',
      note: 'If you’re dependent on alcohol or drugs, this isn’t the right thing. Help has places that are.',
      worries: ['sit', 'drink', 'early', 'strug', 'no']
    },
    {
      id: 'work',
      label: 'Never letting myself stop',
      under: 'There’s always something left, so sitting down feels like getting away with something. Nothing you hand over is quite finished either.',
      worries: ['rest', 'enough', 'check', 'mist']
    },
    {
      id: 'temper',
      label: 'Taking it out on the people closest to me',
      under: 'Snapping, going quiet, talking down to people, not really listening — and knowing it while you’re doing it.',
      worries: ['praise', 'hear', 'angry', 'sorry', 'right', 'joke']
    },
    {
      id: 'secret',
      label: 'Keeping it all to myself',
      under: 'Nobody around you knows the half of it. Not hiding it exactly; it just never seems like the moment.',
      worries: ['care', 'strug', 'low', 'mist', 'help']
    },
    {
      id: 'yes',
      label: 'Going along with things I don’t want to do',
      under: 'Yes when you meant no. Nothing said when something’s annoyed you. An answer sent the second the message lands.',
      worries: ['reply', 'no', 'angry', 'help']
    }
  ]
};

if (typeof module === 'object' && module.exports) module.exports = BETR_DOORS;
else (self.Betr = self.Betr || {}).doors = BETR_DOORS;
