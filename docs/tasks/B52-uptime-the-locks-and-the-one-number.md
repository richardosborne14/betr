# B52: Uptime, the locks on the front door, and the only number we can honestly have

**Status:** **§5c is BUILT AND LIVE, and extended the same day by §11 (two counts) — the tally, 2026-09-10, on the founder's instruction ("just to know
how many people have viewed the page, no other data about it, just the pure number, even if
it's bots"). §10 is what was built.** Everything else is still a pitch. All findings were
checked on the live server and the live DNS on 2026-09-10; no number or setting is from memory.
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

**Recommendation at the time of writing was: don't buy it yet. The founder read that and said build it, the same day** — the number is wanted before the first Instagram post, not after it. Overruled knowingly; see §10. What follows is the argument as it stood.

**~~Recommendation: don't buy it yet.~~** The sentence is worth more than the number while the
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

---

## 9. One thing the address decides for us, now that it is decided

**Founder, 2026-09-10: `betr.trybeup.com` is production. Not a stopgap.** That closes half of
scope Q1 (the trademark and the name itself are untouched) and it removes the "1" from B3's
confidence score, which was only ever "this is a borrowed subdomain".

Two consequences, neither of them an argument against the decision, both of them things nobody
has said out loud yet.

**1. BETR's trust story now permanently rests on two accounts that are not BETR's.** The GoDaddy
account that holds `trybeup.com` and the DigitalOcean account that holds the droplet. Whoever
controls either one controls what a person loads when they type our name. That is not a reason
to move; it *is* the reason §4.6 and §4.1 are on this list and are not optional. **The domain
security items stop being hygiene and become the product's foundation.**

**2. The address says "TrybeUP" out loud, and rule 9 says we don't — until B6's gate opens.**
The link goes in the Instagram bio, under every post, in the store listing, and in every Reddit
reply. `docs/posting-on-social.md` §1 already puts it in the bio without noticing this.

**This is almost certainly fine and it is the founder's call, not a rule breach to fix.** Rule 9
bans TrybeUP being *promoted* outside the small print — never first, never a button, never
styled apart, no deep link, no campaign parameter, no referral code. **A URL is none of those
things**, and rule 9's own reasoning cuts the same way: research 08 is full of people who felt
sold to, and *having said it up front is the entire difference between honest and sneaky*. An
address that quietly carries the lineage is closer to honest than a bare name would be.

**But say so on purpose.** The one thing to avoid is a curious person discovering the connection
by reading a URL when the pinned post could have told them. `posting-on-social.md` already puts
*"Made by the people behind TrybeUP"* in the pinned post; **that line now does double duty and
must not be dropped**, because the address makes the question inevitable.

**Nothing to build. One line for the founder to agree with, and B7/B6 to note.**

---

## 10. What was built — the tally, 2026-09-10

**The founder's words:** *"Can we have the blind tally please? Just to know how many people have
viewed the page, no other data about it, just the pure number (even if it's bots or whatever I
guess?)"* — asked for **before** the uptime and security work, which is why it went first.

### What the server now keeps

**A "1".** That is the whole line written when somebody opens the page. Not a shortened address,
not a hashed one, not a browser, not a referrer, not a clock time. You can `cat` the file and
see a row of ones.

**The date is in the file name, never in a line.** What exists on disk is a set of files called
`2026-09-10.log`, each holding a row of `1`s. **That makes it a daily total by construction
rather than by promise:** the per-visit record does not exist to be kept, aggregated,
correlated, leaked or subpoenaed later, because it was never written.

Five lines of nginx, in `deploy/nginx.conf`, in BETR's own repo where anyone can read them:

```nginx
map $time_iso8601 $betr_day  { "~^(?<ymd>\d{4}-\d{2}-\d{2})"  $ymd;  default unknown; }
map $uri          $betr_page { default 0;  /index.html 1;  /  1; }
log_format betr_tally '1';
access_log /var/log/betr/$betr_day.log betr_tally if=$betr_page;
```

`$uri` is the *final* URI, after nginx resolves `/` to the index, so `/` and `/index.html` are
one thing and are counted exactly once. `if=$betr_page` is why `app.js`, the stylesheet and
every icon count for nothing: **one open is one mark.**

### Proved before it went near the droplet

Run locally in the same `nginx:alpine` image the server runs, against a real container:

| Asked for | Counted? |
| --- | --- |
| `/` | ✅ once |
| `/index.html` | ✅ once |
| `/?utm_source=instagram` | ✅ once — **a query string cannot inflate or distinguish anything; `$uri` excludes it** |
| A returning visitor's revalidation (304) | ✅ once |
| A `HEAD` request | ✅ once |
| `/app.js` | ❌ never |
| A 404 | ❌ never |

The file after seven such requests: `1 1 1 1 1 1 1`. Eight bytes.

### The tests, and they were mutation-checked rather than trusted

`tests/deploy.test.js` now holds the server to exactly this, and each of these was proved to
**fail** by making the change it forbids:

| Change somebody might make | Result |
| --- | --- |
| An address in the log format (`'$remote_addr'`) | ❌ build fails |
| A clock time in the file name (`$time_iso8601.log`) | ❌ build fails |
| Counting an asset as a page open | ❌ build fails |
| Dropping the `if=` so everything is logged | ❌ build fails |

**283 tests pass.** The guard is not "the tally exists"; it is **"the tally can never quietly
become anything else"**, which is the only part worth testing.

### The sentence changed in the same commit

`help.airplane` in `web/content/strings-en.js` said *"…and we keep no record of it."* It now
reads:

> *Turn on airplane mode. Everything still works, because nothing here ever needed the internet.
> Loading this page is the only thing any server ever sees. We keep a count of how many times it
> was opened each day, and nothing else — no address, no browser, nothing that could ever be
> traced to you.*

Walked on the Help screen at 390×844 at normal size and at 200% text: renders, no sideways
scroll, no overflow. `docs/00-scope.md` Q5a and `docs/learnings.md` were updated in the same
commit, because both quoted the old sentence as the thing to say.

**Two sentences were checked and deliberately NOT changed, so nobody re-litigates them later:**

- **Frozen sentence 8** — *"Everything you write stays on this device. There is no account, no
  server, and nothing is sent to us or anyone else."* It is about what a person **writes**, and
  nothing a person writes has ever left their phone. Untouched, still exactly true, and it is
  frozen (rule 7) so it could not have been changed here anyway.
- **`0 B sent to us, ever`**, the proof counter directly under the airplane line. Still true:
  the tally changed what we **keep**, not what is **sent**. The sentence that covers keeping is
  the one that changed.

### How the founder sees the number

**A button, not a command.** On github.com: the Actions tab → *How many times the page has been
opened* → **Run workflow**. `.github/workflows/views.yml` reads the folder over the existing
deploy key and prints a total and a day-by-day table into the run summary. It only reads;
nothing in it can change a count or delete a day.

### Four things that are true about this number and should stay written down

1. **It counts opens, not people.** One person opening it five times is five.
2. **Bots are in it, by decision** — and note we *could* not exclude them: excluding a bot means
   reading who is asking, and we do not read who is asking. The founder accepted this in the
   asking.
3. **Anything that asks for the page counts, including us.** So when §3's uptime monitor is
   built, **point it at `/app.js`, never at the page**, or it adds one every three minutes. The
   hourly integrity check must fetch the page to read the build hash, so it will add ~24 a day;
   that is known, constant, and worth subtracting.
4. **Offline opens never count.** Somebody who installed it to their home screen and uses it on
   the train is invisible here, which is the correct behaviour and also means **the number is a
   floor, not a total**.

### Live, 2026-09-10 12:03 UTC

The founder gave the go-ahead and it was run:

```
mkdir -p /var/log/betr && chown 101:121 /var/log/betr && chmod 750 /var/log/betr
cd /opt/betr && docker compose up -d
```

`101` is the `nginx` user *inside* the container, which is what opens the file. `121` is the
`betr` group, which is how the read-only workflow can see it. On the host that shows as
`drwxr-x--- systemd-resolve betr`, because host uid 101 happens to be `systemd-resolve` — it is
the right uid and a confusing name, so it is written down here.

**Checked immediately after, on the live address:**

| Check | Result |
| --- | --- |
| The site still answers, headers unchanged | ✅ 200; CSP with `connect-src 'none'`, nosniff, no-referrer, no `Set-Cookie` |
| The running container is on the new config | ✅ `betr_tally` present in the config nginx is actually using |
| Three page opens | ✅ three marks |
| Two requests for `app.js` | ✅ nothing written |
| The file | ✅ `2026-09-10.log`, contents `1 1 1 1`, eight bytes |
| nginx errors | ✅ none |
| The deploy account can **read** the tally | ✅ |
| The deploy account can **write** to it | ✅ refused — `Permission denied` |
| The button on github.com | ✅ run `34474636403`, returned the day and the total |

**The number is running and the founder can read it without a command.**

**Confidence: 9/10.** Built, run in the real image, mutation-tested, walked on the screen, and
now verified on the live address. The 1 is that nobody but us has opened the page yet, so the
first real day's number is still ahead.

---

## 11. The second count — "can it exclude bots?", 2026-09-10

The founder read §10 and asked: *"So there's no way that count can represent the 'real' opens
that day, excluding known bot IPs?"*

### The answer to the question as asked: no, and it should stay no

**BETR is never told who is asking.** TrybeUP's block passes it `Host` and `X-Forwarded-Proto`
and nothing else — no `X-Real-IP`, no `X-Forwarded-For` — so every request arrives looking like
it came from the proxy. **There is no address in BETR's server to compare against any list**,
and putting one there would undo the cleanest checkable fact the product has.

**And a "known bot IP list" is not a real thing.** Google, Bing and OpenAI publish their crawler
ranges; those are the polite ones. The bulk of automated traffic comes out of ordinary AWS,
Azure and residential-proxy ranges that are indistinguishable from a person on their phone. A
list like that is stale the week after it is written, and **a filter you cannot trust is worse
than no filter, because you believe the number.**

### What was built instead: two counts, by what the thing calls itself

The founder chose **two numbers rather than one** — neither of which pretends to be people.

| File | Holds |
| --- | --- |
| `2026-09-10.log` | every open, exactly as before |
| `2026-09-10.nobots.log` | the opens that did not say they were a robot |

Both hold a row of `1`s. The user agent is **read, compared to a fixed list in this repo, and
thrown away** — it is never written anywhere, which is why the Help sentence says *written
down* rather than *seen*. Nothing is fetched at runtime to keep the list current; a test fails
the build if a `resolver`, a `proxy_pass` or a scripting module ever appears in that file.

The entry that will matter most in practice: **Meta fetches every link shared on Instagram and
WhatsApp** to build the preview card. Without this, that would land in the number every time a
post travels.

**Checked against real user-agent strings, in the real image:**

| | Counted as a person | Counted at all |
| --- | --- | --- |
| iPhone Safari, desktop Chrome | ✅ | ✅ |
| Googlebot, GPTBot, Meta's link fetcher, `curl`, an uptime monitor, no user agent at all | ❌ | ✅ |
| `app.js` from a real browser | ❌ | ❌ |

Eight requests in: `1 1 1 1 1 1 1 1` in one file, `1 1` in the other.

### The guard this produced, and it is the best thing in B52

`tests/deploy.test.js` now holds `deploy/nginx.conf` to an **allow-list of what it may read at
all** — `$uri`, `$time_iso8601`, `$http_user_agent`, and the four variables built from them.
Anything else fails the build, named individually where it helps: the address, the referrer, the
query string, how long somebody stayed.

**An allow-list, not a ban-list, and that is the point:** a ban-list is only as good as the
imagination of whoever wrote it. Adding a variable to that set is a decision about the promise
and belongs to the founder, not to a refactor. Mutation-checked, like the rest:

| Change somebody might make | Result |
| --- | --- |
| Deciding robots by address (`map $remote_addr $betr_bot`) | ❌ 2 tests fail |
| Reading the address anywhere at all, even in a header | ❌ build fails |
| The second count quietly becoming a copy of the first | ❌ build fails |
| Dropping Meta's link fetcher from the list | ❌ build fails |
| Renaming the log format | ❌ build fails |

*(A variable named in a **comment** does not fail — comments are stripped before the scan. That
was checked too, so nobody discovers it by accident later.)*

### What is still true, and must not be forgotten

1. **"Not robots" means "did not say it was a robot."** A scraper that lies lands in that
   column, and most of them lie. **It is a floor on robots, not a truth about people.**
2. **Both numbers are opens, not people.** One person opening it five times is five, in both.
3. **The gap between the two columns is roughly the crawlers and link-preview fetchers**, and
   watching that gap change shape is itself information.

### The sentence changed a second time, the same day

> *…Loading this page is the only thing any server ever sees. We keep two counts — how many
> times the page was opened each day, and how many of those were not robots — and nothing else.
> Nothing about you is written down: not your address, not your browser, not even the time of
> day.*

**"not even the time of day" is exact, and was chosen over "not the time":** the *day* is
recorded, in the name of the file. The time of day is recorded nowhere. Walked on the Help
screen at 390×844 at normal size and at 200% text: renders, no sideways scroll.

**Confidence: 9/10.** The 1 is the honest limit of user-agent filtering, which is stated on the
number itself every time it is read rather than hidden in this file.

## 12. The second count never ran — found 2026-09-15

**Status: fixed in the repo; NOT fixed on the server, waiting on the founder's yes.**

The founder ran the tally, saw **1,144 opens and 0 "not robots"**, and asked whether the opens
from inside Instagram's and TikTok's own browsers could be told apart from bot farms. **The 0 was
not a measurement.** §11's config reached `/opt/betr/nginx.conf` on 2026-09-10 and the running
server has never read it: `docker exec betr-web grep -c nobots /etc/nginx/nginx.conf` → `0`, the
host file → `1`. There is no `.nobots.log` for any day. The mechanism is in `docs/learnings.md`,
2026-09-15 — rsync replaced the file, the single-file bind mount kept the old one, `up -d` is a
no-op, and the deploy check hashed the host's copy. **§11's "Checked … in the real image" was true
of the image on the laptop; §10's "verified on the live address" was of the first count only.**
The first count is fine: `a18fde8` landed before the container started at 12:03 UTC.

### What that means for the question as asked

- **Nothing was classed as a robot**, and **the in-app browsers would not have been.** Real user
  agents for Instagram (iOS and Android), TikTok (both) and Facebook were run through the three
  regexes: all "not robots". LinkedIn's in-app browser matches `linkedin` and is a robot.
- **The 1,144 already counted cannot be sorted, by anyone.** Each is a `1`. That is §5c working.
- **The shape still says something.** ~288 a day is one open every five minutes: 297, 303, 295,
  286 on the full days, 164 from 12:03 on the first, 98 by 07:38 on the 15th. Nothing on the
  droplet polls (no cron, no timer, no container), so it is outside, and it started no later than
  the tally did. **Take it off and about 55 opens in five days remain — people and robots
  together, the founder and Misha included.** An inference from a rhythm, not a measurement.
- **The number of people who tapped is Instagram's and TikTok's**, in their own insights (§7).

### Changed in the repo

1. **`views.yml`** — a missing `.nobots.log` is *not counted*, never `0`. Days before the first
   such file ever existed are *not counted*; days after it with no file really are 0 (nginx only
   creates the file on the first non-robot open). If the second count has never written a line,
   the heading says so and gives the command. Simulated on today's numbers and on a future week.
   Plus one bullet: ~288 a day is the rhythm of a machine.
2. **`deploy.yml`** — `rsync --inplace` for the server config, so a future edit is the same file
   the container holds; the notice now says **`docker compose up -d --force-recreate`** and how to
   check what the running server actually reads; the step no longer claims to check the running
   server, because it cannot.

### Waiting on the founder

1. **Recreate BETR's container** — `cd /opt/betr && docker compose up -d --force-recreate` on the
   droplet. About a second of downtime. A write under `/opt/`, so it is confirmed first.
2. **What checks the page every five minutes?** UptimeRobot's free plan is five minutes. If it is
   ours, point it at `/app.js` (§10's rule). Once (1) is done it will name itself and fall into
   the robot column, which is the confirmation.
3. **TrybeUP's port-80 block logs plain-`http://betr.trybeup.com` requests** — address, browser,
   time; four lines by the 15th, one of them GPTBot. It is the redirect block shared with
   trybeup.com and has no `access_log off`; the 443 block for BETR does. **Help says "Nothing about
   you is written down."** One line in `trybeup/trybeup-prod`, a write to TrybeUP's nginx.
4. **Offered, not built:** a third file counting opens from inside Instagram, TikTok and Facebook,
   by the same read-compare-discard of the user agent. It would answer the founder's question
   from here on; it changes the Help sentence a third time and adds a word list to §11's allow-list.

**Confidence: 9/10** on the diagnosis (the running file was read, not inferred). The five-minute
machine is a 6/10 until (1) and (2) are done.
