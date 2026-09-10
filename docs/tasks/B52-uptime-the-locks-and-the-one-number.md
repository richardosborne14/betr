# B52: Uptime, the locks on the front door, and the only number we can honestly have

**Status:** **Pitch. Nothing built.** Everything below was checked on the live server and the
live DNS on 2026-09-10; no number or setting in it is from memory.
**Confidence:** 8/10 on the findings, which are all first-hand. 7/10 on the Cloudflare
recommendation, which is a judgement call and is argued rather than asserted.
**Date opened:** 2026-09-10 · **Asked for by:** the founder, before the first Instagram posts
**Answers:** scope Q5a (hosting and logs) and Q7 (how we learn anything with zero telemetry)

---

## 0. The short version

**Three questions, three answers.**

1. **Uptime.** Two alarms, and neither of them touches a person who visits. One from outside
   every three minutes that says *it's down*; one of our own every hour that says something
   better — *it's up and it is still the exact thing we published*. Roughly zero pounds.
2. **Trolls and attack.** **The app itself cannot be trolled.** There is no account, no comment,
   no shared anything, nothing on any server that one person can put in front of another. There
   is genuinely nothing to deface, spam or poison. The exposure is in three other places: the
   Instagram account, the machine the page is served from, and the domain name. The machine has
   three doors open on it today that should not be, and the domain has the highest-consequence
   gap on the list.
3. **Usage.** You can have exactly one number from our own server honestly — page loads a day,
   with nothing in it. **It costs one sentence on the Help screen, and I don't think you should
   buy it yet**, because Instagram is about to give you the number that actually matters this
   month for free. §5 sets out the trade so you can decide against me.

---

## 1. What can actually be attacked

### 1a. What a troll cannot do, and it is most of what a troll does

Worth stating plainly, because it is the strongest fact in this document and it is a
consequence of decisions already taken:

- **There is no account**, so nobody can be impersonated, locked out, or have anything stolen.
- **Nothing a person writes ever reaches us**, so there is no database to dump, no leak to have,
  and nothing to subpoena.
- **No person can put words in front of another person.** No comments, no feed, no shared list,
  no ratings, no "community". The abuse vector that every other app in this space has to staff
  a moderation team for **does not exist here at all**.
- **There is nothing to spam.** No sign-up form, no contact form, no upload, no search box that
  hits a server. There is no form on the site of any kind; the CSP header says `form-action
  'none'` and the browser enforces it.
- **The files are read-only to the server that serves them** (`:ro` in the compose file), and
  the account that publishes them can't restart a container, use `sudo`, or touch anything of
  TrybeUP's.

So the moderation burden of this product is **zero**, and that is not luck.

### 1b. Where trolls actually land: the Instagram account

Not covered by anything technical, and it is the likeliest thing to happen in the next month.
`docs/posting-on-social.md` §7 already has the conventions. Add these, all of them free and all
of them on the platform rather than in our code:

- **Turn DMs off**, or set an auto-reply that points at the Help screen. Decision 5 in that
  document, still open. §7 is right that becoming a support service by accident is a real
  exposure, not squeamishness. **Note the hole this leaves: there is no email address anywhere
  in BETR.** If DMs are off, a person who wants to tell you something has nowhere to do it.
  See §5d.
- **Instagram's "Hidden Words"**: switch on the default offensive-comment filter and add your
  own list. Comments matching it are hidden from everyone but their author, who is not told.
  It is the single most effective troll control on the platform and it needs no moderation.
- **Limit comments and DMs from accounts that don't follow you** ("Limits"), which is designed
  for exactly a spike of attention from strangers. Switch it on before the first post travels,
  not after.
- **Never argue.** Already in §7 and it is the rule that matters most: `No AI in it. None.`,
  once, then stop.
- **Never a heart on a personal disclosure.** Already in §7.

### 1c. The three technical ways somebody could hurt BETR

Ranked by what it would cost us, not by how likely it is.

| | What it is | How bad | How likely |
| --- | --- | --- | --- |
| **1** | **Somebody changes what the page serves** — through the machine, the GitHub repo, or the domain — so people load a BETR that quietly does collect | **Total.** Every promise we have printed becomes a lie, over a valid padlock, and the only thing that would catch it is a build hash nobody checks | Low, but the doors in §2 are open |
| **2** | **The address stops answering** — flood, or the droplet falls over | Bad while it lasts. An Instagram post pointing at a dead link is the whole month's reach gone | Real. There is no rate limit anywhere and no alarm at all today |
| **3** | **Somebody floods it to run up a bill** | Low. It is a 130KB static page and DigitalOcean's transfer allowance is generous | Low |

**Number 1 is the one to spend money and attention on**, and almost nobody does, because it is
invisible until it has already happened.

---

## 2. What is true on the machine today

Checked on the droplet and against live DNS, 2026-09-10.

### Already right — do not undo any of it

- BETR's container listens on `172.17.0.1:8080`, the Docker bridge. **Not reachable from the
  internet at all**; the only way in is TLS on `betr.trybeup.com`.
- `access_log off` in BETR's nginx **and** Docker's log driver capped, so there is no copy at
  either layer. TrybeUP's pass-through block has `access_log off` too. **We currently keep no
  record of any visit, anywhere, and that is verified rather than assumed.**
- BETR is never told who is asking: TrybeUP's block deliberately sets no `X-Real-IP` and no
  `X-Forwarded-For`. (This has a consequence — see §4.3.)
- The cookie guard is in place, in TrybeUP's repo as well as on the server.
- Automatic security updates are on (`unattended-upgrades`).
- SSH passwords are off entirely; the auth log has **zero** failed password attempts.
- The certificate expires **2026-12-02** and is inside the alarm that emails on 14 days.

### Wrong, and fixable

| # | What I found | Why it matters | Whose |
| --- | --- | --- | --- |
| **1** | **The TrybeUP *dev* database (Postgres, port 5433), dev API (8001) and dev auth (9997) are open to the entire internet**, bound to `0.0.0.0`, no TLS in front of them | This is the realistic route to risk 1c-1. A database port open to the world is scanned within minutes of existing. Somebody who gets in gets the machine, and the machine serves BETR's files | **TrybeUP's**, but it is our machine too |
| **2** | **No firewall.** `ufw` is inactive; nothing filters anything | Everything above is reachable because of this | TrybeUP |
| **3** | **A kernel update has been waiting for a reboot since 06:44 this morning** | Automatic updates install the fix but cannot apply a kernel without a restart. The box has been up 190 days | TrybeUP |
| **4** | **No rate limiting in either nginx**, 2 shared CPUs, 1.9GB of memory with ~480MB free, **and no swap** | One bored person with a laptop can make the address unavailable. No swap means the machine does not slow down, it kills something | Both |
| **5** | **No HSTS header on `betr.trybeup.com`** | A phone that has visited before can still be talked into plain `http` on hostile wifi, where the page can be rewritten in front of them | **BETR's, our file** |
| **6** | **No CAA record on `trybeup.com`, and no DNSSEC** | Nothing tells the world that only Let's Encrypt may issue a certificate for our names | Founder (GoDaddy) |
| **7** | **root SSH login is permitted** (by key only, which is the part that matters) | Low risk given passwords are off. Worth tightening one day, not today | TrybeUP |

Two more that are not the droplet's and are on the standing list already: **the two API keys
that need rotating**, and **nobody owns re-checking the helplines**.

---

## 3. The plan — uptime

Three layers. The first two cost nothing and neither one is ever seen by a person using BETR.

**The principle that makes this allowed at all:** an uptime monitor is *a stranger knocking on
our door every few minutes.* It is our server answering our own request, from a company's
machines, about a page. **It puts nothing in the page, sets no cookie, sees no visitor and
knows no person.** Rule 1 is about what the app sends; this sends nothing and the app does not
change by one byte. Airplane mode still works. The Apple *Data Not Collected* label is
untouched.

### Layer 1 — the fast, dumb alarm: **Better Stack**, free

Every 3 minutes from outside, email and phone alert. Free tier is 10 monitors and 3-minute
checks, which is more than we need — we need two: `betr.trybeup.com` and, since it is the same
machine, `trybeup.com`.

**Not UptimeRobot**, though it is the better-known one: since 1 December 2024 its free plan is
licensed for **personal, non-commercial use only**, and BETR is a commercial project whatever
else it is. Their paid entry is about $7/month if you'd rather have the name you know.

### Layer 2 — the smart alarm, and it is the one I actually care about: our own, hourly

**`.github/workflows/watch.yml`** — a scheduled job in BETR's own repo, run every hour, that
checks not that the site is *up* but that it is **still exactly the thing we published**:

1. it answers 200;
2. the CSP header still carries `connect-src 'none'` and `font-src 'none'`;
3. no `Set-Cookie`, no `unsafe-inline`;
4. **the build hash printed on the page equals the hash of `main`** — the tamper alarm;
5. the manifest still arrives as a manifest (this one silently breaks "Add to Home Screen").

**Every one of these checks is already written**, in `.github/workflows/deploy.yml`, and runs on
every publish. This lifts them into a job that runs when nobody is publishing. It costs an hour
of somebody's time to write and nothing to run.

That fourth check is the answer to risk 1c-1 — the one that is otherwise invisible. If the files
on the server ever stop matching the repo, an email arrives. Today nothing in the world would
notice.

**Timing is unreliable on purpose-built schedules at GitHub**: scheduled runs are commonly 5–20
minutes late, occasionally an hour, and can be skipped entirely under load with no notice. That
is fine for an hourly integrity check and useless as a down alarm — **which is exactly why there
are two layers and not one.**

### Layer 3 — what happens when an alarm goes off, written down before it does

You are not going to run a command at 11pm, so the runbook has to be things you can actually do:

- **The site serves the wrong thing, or a publish went bad** → on github.com, the Actions tab,
  the publish workflow, **"Run workflow"**. That button already exists (`workflow_dispatch`) and
  re-publishes `main` over the top. This is a founder-usable recovery and it is already built.
- **The address is dead** → it is the droplet, and it needs a person. The one-page runbook says
  who and what to say.
- **The tamper alarm fires** → do not republish. That destroys the evidence. It needs a person
  the same hour.

One page, written when B52 is built, kept with the deploy notes.

---

## 4. The plan — security

In the order I would do them.

### 4.1 Close the three open doors — **DigitalOcean cloud firewall** *(founder's call: it touches TrybeUP)*
Free, set in DigitalOcean's control panel, and it sits **outside** the machine, so nothing on
the box has to be configured or can be misconfigured by a later deploy. Allow **22, 80 and 443**
inbound and nothing else. That closes 5433, 8001 and 9997 in one action without touching a
single file, and TrybeUP's dev site keeps working because nginx reaches those services from
inside the machine.

*The alternative, if you'd rather fix it at the source:* rebind those three dev containers to
`172.17.0.1` — **which is precisely what BETR's own container already does**, and TrybeUP's
nginx reaches them the same way it reaches BETR. Three lines in TrybeUP's dev compose file and a
restart of the dev containers only. Both are right; the firewall is faster and also catches
whatever gets exposed next.

**I need one thing from you for this: DigitalOcean access,** or ten minutes where you click and
I tell you exactly what to click. It is the one item on this list I cannot do myself.

### 4.2 Reboot the droplet for the kernel *(founder's call: TrybeUP goes down for ~2 minutes)*
Pick a quiet hour. Everything is `restart: unless-stopped` and comes back on its own; I will
watch it and check all four addresses after.

### 4.3 A rate limit — **and it has to go in TrybeUP's nginx, not ours, for an interesting reason**
BETR's own server **cannot** rate-limit a person, because we deliberately made sure it never
learns who is asking. Every request reaches it looking like it came from the proxy. **The
privacy decision and the flood defence are in tension, and the privacy decision wins** — so the
limit belongs one layer up, in TrybeUP's block, which does see the real address and already
throws it away unlogged.

What that means in plain terms: nginx would hold the visitor's address **in memory** for a few
minutes to count requests, and write it nowhere. Nothing is stored, nothing is on disk, nothing
survives a restart, nothing could ever be handed to anyone. It does not touch the app, the
label, or the airplane-mode proof. **But it is one layer up from where the promise is written,
so it is your call, not mine.** ~20 requests a second per address with a burst, which no real
person on a 130KB page will ever touch, plus a cap on simultaneous connections.

This will not survive a serious distributed attack. Nothing on one droplet will. It stops the
overwhelmingly likelier thing: one annoyed person, one laptop.

### 4.4 HSTS on `betr.trybeup.com` — one header, our file *(I can do this today)*
`Strict-Transport-Security: max-age=31536000`. After one visit, that phone will refuse plain
`http` to our name for a year. **Without `includeSubDomains` and without `preload`** — either of
those would bind every TrybeUP name too, and that is not ours to decide.

### 4.5 A CAA record on `trybeup.com` *(founder, at GoDaddy — one line)*
`0 issue "letsencrypt.org"`. It tells every certificate authority in the world to refuse a
certificate for our names unless it's ours. Cheap, one-time, and it closes the neatest version
of the attack where somebody serves a convincing fake over a real padlock.

### 4.6 The domain and the GitHub account — **the highest-consequence item on this page**
Whoever controls the GoDaddy account can point `betr.trybeup.com` at their own server, get their
own certificate in minutes, and serve a BETR that collects everything, with a padlock, and
**nothing we have built would notice** — except layer 2's hash check, which is the second reason
that job exists. Same for anyone who can push to `main`.

- **Two-factor on GoDaddy and on GitHub**, authenticator app, not SMS.
- **Registrar lock on** (GoDaddy calls it Domain Lock), so it cannot be transferred out.
- Check who else has access to either account, and remove anyone who doesn't need it today.

None of this is technical work; all of it is you, in a browser, in about fifteen minutes, and it
protects more than everything else on this page combined.

### 4.7 Two things I recommend **against**

**Cloudflare (or any CDN), for now — no.** It is the standard answer and it would genuinely
help with a real flood, cache the page worldwide, and hide the droplet's address. Here is what
it costs: **every visitor's request would end at a company we do not control**, which would see
their address and which page they asked for, and would hold the certificate for our name.
*"Loading this page is the only thing any server ever sees"* becomes *two* servers, one of them
somebody else's, and the Help screen would have to say so. **We would be trading a promise we
can prove for protection against a threat that has not happened.** Revisit it if we are actually
attacked — and if we ever switch it on, the sentence changes the same day, in the same commit.

**fail2ban — skip it.** It defends SSH against password guessing, and SSH passwords are already
off entirely with zero failed attempts in the log. It would be a lock on a welded door.

---

## 5. The number

### 5a. What the promise allows

Rule 1 forbids anything in the page: no analytics, no script, no beacon, no request. That is not
negotiable and this task does not ask to change it. `connect-src 'none'` means the browser
enforces it even if somebody adds one by accident.

**But loading the page is a request, to our server, that already happens.** The only honest
question is whether we may count that. Today we don't — `access_log off` — and the Help screen
says so.

### 5b. What you already get free, and it is more useful than what we could build

- **Instagram and TikTok outbound link clicks.** Reported natively, no parameter needed, no
  tracking of any kind on our side. **This is your "did the post work" number, and it is the
  number that matters in the first month.**
- **Store downloads**, once B5 ships. Free, and Apple gives it without you collecting anything.
- **People who write to you** — see 5d.

**Recommendation: for the first month, this is the whole of the measurement.** Not out of
principle-shaped stubbornness — because a click count and a load count would tell you the same
thing while the numbers are small, and only one of them costs a sentence.

### 5c. If you want a number from our own server: the blind tally

There is exactly one form of it I would be willing to build.

**What it is.** nginx writes **one blank line** for each load of the front page — not each file,
each page. No address. No time. No page name. No browser. No referrer. No cookie. Literally an
empty line. At midnight a job counts the lines, writes the number into a file of daily totals,
and empties it. **What is kept is a list of dates and counts and nothing else, and no line in it
can be traced to anybody, because there is nothing in the line.**

**What it can tell you:** loads a day, and the trend. And one thing the platforms cannot: if
loads run consistently higher than link clicks, **people are coming back or passing it on**.

**What it can never tell you:** how many people (one person opening it five times is five), who
returned, where they came from, what screen they reached, or whether anybody finished a test.

**What it costs.** `what.airplane` on the Help screen currently reads:

> *Turn on airplane mode. Everything still works, because nothing here ever needed the internet.
> Loading this page is the only thing any server ever sees, and we keep no record of it.*

The last clause would stop being exactly true, so it would have to change in the same commit —
something like:

> *…Loading this page is the only thing any server ever sees. We keep no address, no time and
> nothing that could ever be traced to you — only a count of how many times the page was opened.*

That is still a remarkable sentence and it is still honest. **It is also longer, more defensive,
and it invites a question the current one closes.** Note this is *not* one of the nine frozen
sentences, so it is yours to change: frozen sentence 8 is about what a person *writes*, and that
stays true either way.

**Recommendation: don't buy it yet.** The sentence is worth more than the number while the
number is small and Instagram is telling you the same thing. **Revisit the day you cannot tell
whether anyone is coming back** — that is the one question this answers and nothing else does.
The change is about an hour's work whenever you want it; nothing is lost by waiting, except the
days in between, which we will never have.

### 5d. The gap no measurement fills, and it is the important one

None of this tells you **whether the loop works for anybody**. Zero telemetry means that only
ever comes from two places: watching real people (`docs/journeys.md`, and the observed ones),
and **people telling you**. And right now:

- there is **no email address anywhere in BETR** — not on Help, not in the small print;
- `docs/posting-on-social.md` recommends turning Instagram DMs off.

Do both and there is no way for a person to reach you at all. **A plain address on the Help
screen** — one line, a `mailto:` link, no form, nothing that phones home — is the cheapest thing
on this page and it is the only inbound channel this product can have. It also answers scope
**Q5c**, because the store listing is going to demand a contact anyway.

---

## 6. Decisions for you

| # | Decision | Cost | Mine to do? |
| --- | --- | --- | --- |
| 1 | **DigitalOcean firewall** — close the dev database, dev API and dev auth ports | Free. Touches TrybeUP; nothing should break | Needs your DO access |
| 2 | **Reboot the droplet** for the kernel, at a quiet hour | ~2 min, TrybeUP down too | Yes, on your word |
| 3 | **Better Stack**, free, two monitors, alerts to you | Free, 15 min | Yes — needs an account in your name |
| 4 | **The hourly integrity check** in our repo | Free, ~1 hour | **Yes, and I'd do this first** |
| 5 | **HSTS header** on betr.trybeup.com | One line, our file | Yes |
| 6 | **Rate limit** in TrybeUP's nginx (address held in memory, never written) | One block, their file | Yes, on your word |
| 7 | **CAA record** at GoDaddy | One DNS line | **You** — I have no GoDaddy access |
| 8 | **2FA + registrar lock** on GoDaddy and GitHub | 15 min, and it matters most | **You** |
| 9 | **The blind tally** — a daily count, and the Help sentence changes | ~1 hour + one sentence | Your call. I say **not yet** |
| 10 | **An email address on the Help screen** | One line + an inbox | **You** — I need the address |
| 11 | **Cloudflare** | Free, but the promise changes | I say **no**, for now |

---

## 7. What this task may never do

- **Nothing goes in the page.** No script, no pixel, no beacon, no font, no third-party
  anything, no request of any kind after the page loads. `connect-src 'none'` stays.
- **No address is ever written down** — not whole, not truncated, not hashed, not "for a day".
  A hashed address is still an address, and reintroducing identity through a back door is
  exactly the move this product exists in opposition to.
- **No uniques, no sessions, no visitors, no paths, no referrers, no timestamps** beyond a date
  on a daily total.
- **Nothing that would make Apple's *Data Not Collected* or Google's *No data collected*
  untrue**, and nothing that would make the airplane-mode proof anything less than a proof.
- **If any sentence on any screen would stop being exactly true, it changes in the same commit,
  or the change does not happen.**

---

## 8. Recommendation

Do **4, 3, 5** this week (integrity check, uptime alarm, HSTS) — they are ours, they are free,
and they are the difference between finding out from an alarm and finding out from a stranger.
Do **8 and 7** yourself in the same fifteen minutes; they protect more than the rest combined.
Then **1 and 2** when you're ready to touch TrybeUP.

Leave **9** — the number — until Instagram stops answering the question. And decide **10**, the
address, before the first post goes up rather than after, because the first post is when
somebody will want to reply to it.

**Confidence: 8/10.** Everything in §1 and §2 was read off the live server and live DNS today.
The 2 is §4.3 and §5c: both put something slightly nearer the promise than it sits today, and
both are judgement calls that belong to the founder rather than to me.
