# Start here

**Last refreshed:** 2026-09-15, 8th session — **one founder question about the tally, and it found that B52's robot count has never run. Nothing in `web/` changed. 296 tests pass.** Rewritten, never appended to. Cap: 120 lines.

## 1. Where we are

**This session, from one founder question:** the tally said *1,144 opens, 0 not robots*, read as "all robots", and they asked whether the opens from inside
Instagram's and TikTok's browsers could be told apart from bot farms. **All of it is in [`B52 §12`](tasks/B52-uptime-the-locks-and-the-one-number.md) and `learnings.md` 2026-09-15.**

1. **Nothing was classed as a robot. The second count (B52 §11) has never run.** The config reached `/opt/betr/nginx.conf` on 2026-09-10; the container
   mounts it as a single FILE, rsync replaced the file, the container kept the old one, and `docker compose up -d` is a no-op when the compose file is
   unchanged. The deploy's check hashed the host copy, so it went green; `views.yml` printed the missing file as `0`. **The first count is fine.**
2. **Instagram's, TikTok's and Facebook's in-app browsers are NOT on the robot list** — tested on their real user agents. LinkedIn's is.
3. **The number is mostly one machine: ~288 a day, one open every five minutes**, since the tally went live. Nothing on the droplet polls. **About 55
   opens in five days are everything else**, people and robots together. An inference from the rhythm, not a measurement.
4. **The 1,144 already counted can never be sorted** — each is a `1`, by design, and that design stays. **Instagram's and TikTok's own link-tap
   numbers are the count of people.**

**Fixed in the repo:** `views.yml` says *not counted* instead of `0`, and names the command; `deploy.yml` uses `rsync --inplace`, gives
`--force-recreate`, and no longer claims to check the running server. **Not fixed on the server — every write there waits on the founder.**

**Found on the way, and it is a promise:** TrybeUP's front nginx **logs plain-`http://betr.trybeup.com` requests** — address, browser, time — in the
port-80 redirect block it shares with trybeup.com (4 lines by the 15th). Help says *"Nothing about you is written down."* One `access_log off`, in
`trybeup/trybeup-prod`. And Help says *"We keep two counts"* while one runs: overstating, the safe direction, true the moment the container is recreated.

**Before this session (12 Sep):** [`B54`](tasks/B54-the-lineage-with-a-logo.md) — TrybeUP's logo (`web/trybeup-logo.png`, committed, never hotlinked),
`TrybeUP™` in the system font at 600, and seven sentences under *Who made this* on Help; three are safeguards held by tests (the paywall, the AI coach,
the account). [`B55`](tasks/B55-a-door-to-who-made-it.md) — **`BETR · Who made this?`** on the front screen and *Your tests*, opening Help at the block,
**not saying TrybeUP**, and NOT in the loop, the result, a refusal or `paint()`. [`B53`](tasks/B53-the-bottom-rung-and-the-archive.md) — nothing happens
at the bottom rung, on purpose; Archive. [`B51`](tasks/B51-the-second-question.md) §5 — *"And what would that mean for you?"* before *Lock it in*,
**Misha unread**, and §13.1: the reviewer's three questions are unanswered and the founder shipped ahead of them.

## 2. The next action

0. **The moment the founder says yes to recreating the container:** `ssh le-jibe 'cd /opt/betr && docker compose up -d --force-recreate'` (~1s down);
   then `docker exec betr-web grep -c nobots /etc/nginx/nginx.conf` must say **1**; `curl -sI https://betr.trybeup.com/` is 200; **`https://dev.trybeup.com`
   still answers** (CLAUDE.md). Next day, run the tally from github.com: *every open* ~290 and *not robots* ~10–15 means the five-minute machine named
   itself. **The port-80 fix, if agreed, is TrybeUP's repo** and its `CLAUDE.md` governs.
1. **The other nineteen worries' size holes.** Sixty sentences, an hour, one question: *"are there already words standing in for something a
   person would name?"* Where yes it is free, the way `no`'s was; **where no, leave it** — inventing one is BETR proposing a sentence.
2. **`happened.placeholder` — *"He said 'fair enough' and got his own coffee."*** The last frozen worked example in the app, on every worry, and that box
   has no suggestions under it. Decide it on purpose (B49 §8.4) — one string, the founder's.
3. **The bottom row's *New test* still opens the two empty blanks** — fine while free text was the entrance, a question since B50. The founder's.
4. **[`B51`](tasks/B51-the-second-question.md) §8, the post, is not started.** The correction pair the app makes room for is the pair the post needs.
5. **B45 §3 difference 7** — the repeat screen. Half shipped; its "all three open" half collides with difference 4, closed as a **no**.
**Do NOT take difference 4** (closed), **difference 6** (the chip row waits on a cull), or **the 60 `W-*-E` rows** (B51 §13.2, the reviewer's).

## 3. Waiting on people, not on code

0. **The founder, from this session (B52 §12):** **(a)** yes to recreating BETR's container; **(b)** what checks the page every five minutes — UptimeRobot's
   free plan is five minutes; if it is ours, point it at `/app.js`; **(c)** yes to `access_log off` on TrybeUP's port-80 block; **(d) offered, not built:** a
   third file counting opens from inside Instagram, TikTok and Facebook, same `1` method — it changes the Help sentence a third time.
1. **[`B52`](tasks/B52-uptime-the-locks-and-the-one-number.md), the rest, still a pitch** — **three TrybeUP dev ports open to the internet**, no firewall, no
   rate limit, no HSTS, no CAA, **no uptime alarm of ours**, eleven decisions in its §6. **Point any monitor at `/app.js`, never at the page.**
2. **The founder.** **(a) B54 §5.3 — the word *AI* in the new block**, and §4 — the landing page's three steps were left out. **(a2) B55 §2 — whether the
   front screen's question should SAY *Made by TrybeUP*, and §6.4 — whether *Your tests* keeps the line.** **(b) `docs/redraft-sheet.md`** — the Mine column,
   four renames, three questions (`S10-D2`, `S15-P1`, `S18-D1`). **(c) B47 §6c.** **(d) `ontime` is the weakest fit behind the `work` door.** **(e)
   `happened.placeholder`.** **(f) B53 §7.2 — *Test this again* and *Archive* are two ghost buttons of equal weight.** Then: J4 and J5 on a phone, B36 items
   6 and 9, five answers on *Why it's written like this*, rule 10's third amendment (B37 §9a), which example leads the front screen **and whether four stays
   four** (`example-tests-bank.md` §4), **the purpose statement**, the **`HARM` false refusal**, **B25**.
3. **Misha, in one ask.** `docs/COPY.md` is regenerated. **NEWEST: B55's `byline` (*Who made this?*) — the first three words in BETR written to sell. Then
   B54's** `help.makerName`, `makerTag` (TrybeUP's headline, word for word), `makerWhat`, `makerAI`, `makerCost`, `makerApart`, `makerLink`, `makerLinkWhat` —
   TrybeUP's copy on BETR's Help, so he matters most. **Then B53's five** (`mine.archive`, `mine.unarchive`, `mine.awayTitle`, **`mine.awayNote`**,
   `mine.allAway`). **LIVE AND UNREAD: `plan.expectLabel`**, on every road; B51 §9.1 has three other drafts. Still unread: `build.doOwnPlaceholder`,
   `build.dropPlaceholder`, `start.borrow`, `start.go`; the three new worries (`want`, `think`, `ontime`); the sixty size sentences; **the `yes` door's line,
   which names three worries and has five**; B41's skeletons, B42's sizes, B38–B40's strings, the four nouns, the door order, the chips, B36's tone, the red strike.
4. **The paid CBT reviewer, the critical path, and overdue. Send `docs/suggestions-review.csv`** — **295 live rows of 557**, plus **B51 §9.2's three**: is a
   second, cost-level prediction right for a tool with nobody in it; should the **60 `W-*-E` rows** follow one rule; Theory A/B and the survival experiment
   (§7). Standing: is the largest step safe (`W-*-D3`; `W-THINK-D3`, `W-ONTIME-D3` least sure); `G-Z1`; every `W-*-D1`; `W-LOW-D1`; `S07-P3`; `S03-D4`.
5. **A screen-reader AND CONTRAST pass on a real phone** — nobody has used it; **`--ink-3` on `--card` is about 3:1** (B51 §13.4). **Q1's name and trademark
   still block release; `betr.trybeup.com` IS production.** **Two API keys — Groq and Anthropic — need rotating**; nobody owns `guards.js`'s medication list.
   **Release:** Misha on `places.signedOff` and six door lines, J1–J5 on a phone, an owner for links. **`docs/journeys.md` J1 is stale.**

## 4. Environment facts

| | |
| --- | --- |
| Repo · stack | `github.com/richardosborne14/betr`, private, `main`; plain HTML/CSS/JS in `web/`; **`node --test` from the repo root** (296 pass); `node tools/copy-sheet.js` rewrites `docs/COPY.md` |
| **Walk it for real** | **`node tools/walk.js start`**, then `open` · `dump` · `tap` · `type` · `shot <file>` · **`eval <js>`** · `stop`. 390×844 @3x. **Always `stop`.** Live at **`https://betr.trybeup.com`** — every push to `main` touching `web/**` publishes it; cert expires 2026-12-02 |
| **The server** | `ssh le-jibe`. BETR's container is **`betr-web`**, config bind-mounted from `/opt/betr/nginx.conf`, tally in `/var/log/betr/`. TrybeUP's front is `trybeup-nginx-1`; read its live config with `docker exec trybeup-nginx-1 nginx -T`. **Read freely; every write confirmed** |
| **The tally** | github.com → Actions → *How many times the page has been opened* → Run workflow. Or `gh run view <id> --log`, which prints the raw day rows |
| **The canvas** | the B45 spec, `claude.ai/code/artifact/77d1cadb-…`. Read with the Artifact tool, then pull the artboards out of the `appifact-doc` script block — **parse the saved file** |
| **The sheet** | `docs/suggestions-review.csv`, **558 rows with the header**, **CRLF and a BOM — keep both**; `csv.writer(QUOTE_MINIMAL, lineterminator='\r\n')` round-trips; **match a Status exactly** |
| **Images** | **no ImageMagick, no PIL; every `sips -c` crop is CENTRED.** Decode PNGs in node with `zlib` (`png.js`). **`walk.js shot` captures the WHOLE page**, in RGB |

## 5. Gotchas, live

- **A CONFIG ON DISK IS NOT A CONFIG RUNNING.** A single-file bind mount keeps the file it started with; rsync replaces files; `compose up -d` recreates
  nothing. **Ask the container:** `docker exec betr-web nginx -T | grep <the line>`. **And never print an absence as a zero.**
- **AN ASSET ASKED FOR BY URL IS AN ASSET THAT MUST BE COMMITTED.** `img-src 'self' data:` and `font-src 'none'` — a remote image or a Google font does
  not fail loudly, **it just never appears**. Commit it, reference it relatively; size a logo in **`em`**.
- **`git checkout <file>` RESTORES HEAD, NOT WHAT YOU HAD.** **`cp` to the scratchpad and back**, assert the mutation anchor once, **run the baseline again**.
- **A SCREEN IS WHERE ITS CALLERS SEND YOU.** `go('plan')` has one caller, `again()` — it is the REPEAT screen. **Grep the callers and walk to it first.**
- **AN ABSENCE ASSERTION DIES SILENTLY WHEN THE STRING DOES.** **Name something that still exists**, and **mutate the code back and watch each test fail.**
- **A MADE-UP CUSTOM PROPERTY DISAPPEARS, IT DOES NOT FAIL.** The page colour is **`--ground`**. **Read a new colour back** with `getComputedStyle`.
  **Two classes beat one class and a tag**: `.plan p.line`.
- **`ch` IS THE WIDTH OF A “0”.** `growSaid()` answers in **`em`**. **Anything sized from content needs a `max-width`**. **Check every walk at 200%:**
  `eval 'JSON.stringify({scrollW:document.documentElement.scrollWidth, innerW:innerWidth})'` — equal is right.
- **A GREEN SUITE PROVES NOTHING ABOUT A SCREEN NOBODY READ.** A string wrong because content moved? **check every string of its kind.** Navigating by id
  tests nothing a person sees — **assert class and arrow** (B50).
- **`walk.js` CANNOT FIRE A FOCUS EVENT.** Call it: `eval '…#then").onfocus()'`.
- **THERE IS ONE CONTENT FILE FOR A WORRY.** `worries.js` holds the twenty plus `BETR_GENERAL` and `BETR_FRONT`. `skeleton`/`sizes` REQUIRED; `test` and
  `drop` are read by nothing — `sizes[0]` word for word (`checkSizes0`).
- **A WALK NEEDS A SIZE TAP, ON EVERY ROAD.** On `no`'s **A small go** there is no `#do` box. **`shows`/`hides` are SUBSTRING checks**; `tap` takes ONE selector.
- **A rewrite can reach outside the content file** — `shrinkSaid` quotes `S01-P3`; **`build.ifPlaceholder` is load-bearing twice**. **Grep first.** Culled
  ids are retired (`phone` `reply` `check` `mist` `cut`); `MIN_PER_DOOR = 4`; **two count canaries** (269 lines, 12 chips) move only for a cull.
- **Set the font size BEFORE navigating.** The fold is 785 / 780 / 774 / 720 at 100 / 125 / 150 / 200%. **A WIDENING IS MORE DANGEROUS THAN A CHANGE.**
- **`shot` on the front screen catches it mid-reveal. A dead `walk.js` returns a stale page, and its browser is DARK. After editing `web/`, `stop` and
  `start`.** Every word a person reads is in `web/content/`. Use `’` and `“ ”`. `zones.js` and `COPY.md` are generated; no number from memory.
