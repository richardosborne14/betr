/*
  The "other places" list on the Help screen. Places to go that we do not run.

  PLACEHOLDER. Misha signs this list off before release, the same way he signs off the six
  surface-problem labels (B0 Q2a, B8). `signedOff` below is false until he has, and two groups
  most need him: doing it with other people, and — since B24 put it there — the first one.

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
    5. No entry implies anything about the reader. A group's title may name a condition —
       "If it's drinking or drugs" is addressed to somebody, not said about everybody — but no
       entry ever describes the person reading it (research §5.4).
       AMENDED 2026-09-04 (B24). This rule used to end "Naming a recovery fellowship would say
       'this app is for addicts' about whoever is reading it. None is named." The founder
       overruled that knowingly, and named one: UK SMART Recovery is on the list below. The
       reasoning they were given and took — the alternative was to link only the NHS page and
       let the NHS name the fellowships, which is one more tap for the person least able to
       spend it, and SMART Recovery is the closest thing to what BETR itself does. If this is
       ever reversed, drop that one item; the NHS pages beside it already name AA, Al-Anon and
       SMART Recovery themselves, so nothing is lost but a tap.
    6. TrybeUP is in the last group under the conditions in B8: never first, never a button,
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
    /*
      B24, 2026-09-04. The group that makes door one's note true.

      `whats-going-on.js` has carried this since B19, at the founder's request:

          "If you're dependent on alcohol or drugs, this isn't the right thing.
           Help has places that are."

      For a day it was not true. Help had no alcohol or drug service on it at all. It is the
      one sentence in BETR that deliberately sends somebody away — written for the person
      frozen sentence 4 excludes, at the exact moment it is relevant — and it sent them to
      nine links about CBT worksheets and therapist registers.

      It is FIRST because the person reading it was sent here by that sentence and should not
      have to scroll past worksheets to reach what they were just promised. Moving it down is
      one edit and breaks nothing.

      EVERY ENTRY WAS READ ON THE PROVIDER'S OWN SITE ON 2026-09-04. That is the discipline
      `helplines.js` holds for a phone number, held here for the same reason: a person in this
      state follows the first link and may only try once. No number is written here — not one,
      not anywhere; `helplines.js` is the only file allowed to hold one.

      Read on the day and deliberately left out, so nobody spends the afternoon finding out
      the same thing twice:

        Drinkaware   funded by the drinks industry. Not from this sentence, of all sentences.
        Adfam        a real charity, for the family of somebody who drinks. A different
                     promise; door one's note is about the person reading it.
        SAMHSA's own national-helpline page returned 403 both times it was asked.
                     FindTreatment.gov is the same agency and it rendered.
    */
    {
      /*
        The only group with an `id`, and it is an anchor and nothing else. Door one's note
        lands a person on this heading rather than at the top of a screen that is 4,700 pixels
        long — four screenfuls of CBT reading between the promise and what was promised. It is
        on the GROUP, it names a place on a page, and it is never read from anything a person
        typed; rule 3 above is about an ITEM and it still has three fields and no fourth.
      */
      id: 'substances',
      title: 'If it’s drinking or drugs',
      /*
        The country line. `helplines.js` shows NO number at all in a country nobody has
        checked, and says so; this is the same answer in the same voice. Founder's call,
        2026-09-04, over per-country places — which would need a fourth field on an item and
        would break rule 3 above.
      */
      note: 'These are the UK, and one for the United States. We haven’t checked anywhere ' +
        'else, and a wrong door is worse than no door.',
      items: [
        {
          name: 'NHS: alcohol support',
          url: 'https://www.nhs.uk/live-well/alcohol-advice/alcohol-support',
          what: 'Where the NHS says to start with drinking, and the services and groups it points you to. UK.'
        },
        {
          name: 'NHS: drug addiction, getting help',
          url: 'https://www.nhs.uk/live-well/addiction-support/drug-addiction-getting-help',
          what: 'What treatment for drugs actually involves, and how to get it. UK.'
        },
        {
          name: 'WithYou',
          url: 'https://www.wearewithyou.org.uk',
          what: 'Free and confidential. An online chat open seven days a week, and a search for services near you. England and Scotland.'
        },
        {
          name: 'Talk to Frank',
          url: 'https://www.talktofrank.com',
          what: 'Straight information about drugs, and a search for local services. Free. UK.'
        },
        {
          name: 'UK SMART Recovery',
          url: 'https://smartrecovery.org.uk',
          what: 'A charity running free meetings, in person and online, built on the same ideas CBT is. UK.'
        },
        {
          name: 'FindTreatment.gov',
          url: 'https://findtreatment.gov',
          what: 'The US government’s search for licensed treatment, for alcohol and for drugs. Confidential and anonymous. United States.'
        }
      ]
    },
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
