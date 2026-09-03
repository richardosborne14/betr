/*
  The "other places" list on the Help screen. Places to go that we do not run.

  PLACEHOLDER. Misha signs this list off before release, the same way he signs off the six
  surface-problem labels (B0 Q2a, B8). `signedOff` below is false until he has, and the third
  group — doing it with other people — is the one that most needs him.

  The rules this list lives under (B8, and CLAUDE.md rules 1, 8 and 9):

    1. Nothing is fetched to support a link. No favicon, no preview, no availability check,
       no analytics on a tap. A link is inert until a person taps it, and then it is their
       browser going there, not us. The airplane-mode proof has to survive this file.
    2. Every url is plain https, with no query string, no fragment, no campaign parameter, no
       referral code and no shortener. Ever. Including ours. web/lib/content.js enforces it
       and web/tests/menu.test.js holds the allow-list, so adding a link shows up in a diff.
    3. The list is identical for everyone. Nothing here may be chosen, ordered, filtered or
       emphasised by anything the person entered — which is why an item has three fields and
       no fourth. Fixed content is a chapter in a book; content chosen for someone is a
       device (research §5.2). If you are adding a `lane` or a `forDoor` here, stop.
    4. Linking to CCI, Getselfhelp and the rest is the correct way to point at their material.
       Copying their wording is not, and never becomes fine (rule 8). Every line below is ours.
    5. No entry implies anything about the reader. Naming a recovery fellowship would say "this
       app is for addicts" about whoever is reading it (research §5.4). None is named.
    6. TrybeUP is in the third group under the conditions in B8: never first, never a button,
       never styled apart, it says we made it and what it costs right there, and it never
       carries a link parameter of any kind.

  Prefer short, stable urls. Nothing here can check itself, a deep path rots first, and a dead
  link in a mental-health app is a real harm. Checking them is on the release checklist.
*/
var BETR_PLACES = {
  signedOff: false,

  intro: 'None of these is run by us. They open in your browser and need the internet. ' +
    'BETR doesn’t check them, doesn’t know whether you tapped one, and gets nothing if you do.',

  /*
    The two links under the CBT explainer at the top of Help. Founder, 2026-09-03: there
    should be one clear thing to read about CBT before anything else. The explaining is ours,
    in our own words (rule 8); these two are where to read it from people who are not us.
  */
  reading: [
    {
      name: 'NHS: cognitive behavioural therapy',
      url: 'https://www.nhs.uk/mental-health/talking-therapies-medicine-treatments/talking-therapies-and-counselling/cognitive-behavioural-therapy-cbt',
      what: 'What CBT is, what a course of it involves, and how to get it on the NHS.'
    },
    {
      name: 'BABCP: what is CBT?',
      url: 'https://www.babcp.com/About/What-is-CBT',
      what: 'The same thing from the UK body that accredits CBT therapists.'
    }
  ],

  groups: [
    {
      title: 'Free CBT worksheets and reading',
      items: [
        {
          name: 'Centre for Clinical Interventions',
          url: 'https://www.cci.health.wa.gov.au',
          what: 'A public health service in Western Australia. Free workbooks, written for people to use on their own.'
        },
        {
          name: 'Getselfhelp',
          url: 'https://www.getselfhelp.co.uk',
          what: 'Free CBT worksheets and sheets to print, put together by a therapist in the UK.'
        },
        {
          name: 'NHS Every Mind Matters',
          url: 'https://www.nhs.uk/every-mind-matters',
          what: 'The NHS’s own advice on sleep, worry and low mood. Free, and no account.'
        },
        {
          name: 'Mind',
          url: 'https://www.mind.org.uk/information-support',
          what: 'A UK charity. Plain explanations of what things are and what help exists.'
        }
      ]
    },
    {
      title: 'Finding a real therapist',
      items: [
        {
          name: 'BABCP',
          url: 'https://www.babcp.com',
          what: 'The UK register of accredited CBT therapists. Being on it means somebody checked.'
        },
        {
          name: 'Find a CBT Therapist',
          url: 'https://www.findcbt.org',
          what: 'The US directory, run by the Association for Behavioral and Cognitive Therapies.'
        },
        {
          name: 'EABCT',
          url: 'https://eabct.eu',
          what: 'Member associations across Europe. Each country’s association keeps its own register.'
        }
      ]
    },
    {
      title: 'Doing it with other people',
      items: [
        {
          name: 'Side by Side',
          url: 'https://sidebyside.mind.org.uk',
          what: 'Mind’s online community. Free, moderated, and you don’t have to say who you are.'
        },
        {
          name: 'TrybeUP',
          url: 'https://trybeup.com',
          what: 'Made by us — the same people who made BETR. It’s an account with people in it, ' +
            'doing this in small groups. One-to-one chat is free; the private groups need a paid plan.'
        }
      ]
    }
  ]
};

if (typeof module === 'object' && module.exports) module.exports = BETR_PLACES;
else (self.Betr = self.Betr || {}).places = BETR_PLACES;
