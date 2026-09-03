# Learnings

Hard-won, non-obvious things. Add an entry when something took more than thirty minutes to
understand or when a decision was reversed.

## 2026-09-01 — the interface

- **The founder rejects anything that has to be learned.** An app with tabs, an index card
  with labelled fields, and a scripted chat were each rejected within a minute. The approved
  shape is one big button that hands the person a pre-written test. When in doubt, remove a
  field, don't add a hint.
- **A chat shape reads as "an AI that wants your secrets" even with no AI in it.** The
  presence of a conversation is the tell, not the technology behind it.
- **Pre-written expectations are what removed the last typing step.** The person edits only
  if they want to. Typing is reserved for after the test, when they have something to say.

## 2026-09-01 — where it lives

- Decided "same repo as TrybeUP" and reversed it within the hour. The reason it reversed:
  "shares nothing with TrybeUP" has to be visible to anyone reading the source, and a folder
  inside another product's monorepo cannot say that.

## 2026-09-02 — building v1

- **A page opened off the filesystem cannot fetch JSON and cannot load an ES module.** Both are
  blocked as cross-origin from a `file://` page. Since the founder sees Betr by opening
  `web/index.html` directly, the content had to be `content/worries.js` rather than
  `worries.json`, and the library files had to be classic scripts with a small export shim
  rather than ES modules. Both the scope and B4's plan had assumed otherwise. It is still one
  plain array with no logic in it, and it is edited exactly as JSON would be.
- **A CSP that says `script-src 'self'` blocks the page's own scripts when it is opened off
  disk**, because `file://` is an opaque origin that `'self'` does not match. Adding `file:`
  to the source lists fixes it and costs nothing, because over https a `file:` URL cannot be
  loaded at all. `connect-src 'none'` is the line that actually matters and has no exception.
- **`node --test web/tests/` does not work on Node 22.** A directory as a positional argument
  is treated as a module path and fails with `MODULE_NOT_FOUND`, which reads like a broken
  test rather than a broken command. `node --test` on its own, from the repo root, finds
  everything. CLAUDE.md and B4 both said the broken form; both are corrected.
- **"Delete everything" was writing an empty record straight back**, because the next tap
  saved the blank state under the same key. Now a state with nothing in it removes the key
  instead of writing. An app that has never been used and an app that has just been wiped both
  leave the browser's storage genuinely empty, which is what the word "everything" promises.
- **The habit guard has to cover the "what will you leave out" line, not just the test.**
  Otherwise the habit walks in the back door: test "go to the party", leave out "don't drink".
  Guarding only the field the scope named would have shipped a hole.
- **Eighty lines of fake DOM in a test file paid for itself immediately.** It found that
  *back*, after repeating a person's own test, dropped them into the half-finished entry
  screens. No unit test could see that, and it would otherwise have been found by a person on
  a phone in the middle of their second loop. It is not a browser and does not replace the
  phone walk in `docs/journeys.md`.
- **Relative words stored as absolute numbers cannot show progress, and nobody notices until
  someone uses it twice.** The re-rate said "a bit less sure" — which only means anything next
  to where you already were — and stored a fixed 55 every time. Three days of honest re-rating
  wrote the same number three days running, so the one thing the product exists to show could
  not appear on any screen, and no test caught it because every test did one loop. Fixed by
  making each word *move* a 1–10 ladder rather than set a value. The general lesson: if the
  label on a control is comparative, what it stores has to be a change, not a state — and at
  least one test has to run the same loop three times.
- **A picture of the same screen twice is worth more than a passing test.** Headless Chrome
  against a seeded copy of the app showed the ladder in light and dark in about a minute
  (`--headless=new`, a `seed.js` that writes `localStorage` before `app.js` runs, served over
  a local http server because `file://` storage is opaque). Note that `--window-size` is not
  the CSS viewport in headless: the layout came out about 110px wider than asked, which looked
  exactly like a CSS overflow bug until the untouched start screen did it too. Check an
  unchanged screen before believing a layout finding from a headless screenshot.
- **A rule the founder set can be overruled by the founder, and the record has to say so.**
  "No tab bar" (CLAUDE.md rule 10) and "TrybeUP only in the small print" (rule 9) were both
  amended on 2026-09-03 by the person who wrote them. Amending the rule in place, with the date
  and the conditions attached, is the only thing that stops a later session deleting the new
  work as drift — or quietly widening the exception. Never leave the amendment only in a task
  file: the rules file is what gets read first.
- **A screenshot is not proof that a browser can save anything.** The ladder rendered perfectly
  from seeded storage long before anything proved a real second loop would keep its number. The
  proof was driving Chrome over CDP — plain `fetch` and `WebSocket` in Node 22, no dependencies
  — clicking through four loops on a real page and reading `localStorage` back. Worth the
  fifteen minutes for anything where the value only appears on the second use.

## 2026-09-03 — the menu (B8)

- **`Emulation.setDeviceMetricsOverride` is the only way to get a real phone viewport out of
  headless Chrome.** `--window-size=320,568` produced a 500×481 CSS viewport, which would have
  made the "does the menu cover the big button" check meaningless in the direction that hides
  the bug. One CDP call before the walk gives an honest 320×568, and the answer arrives in
  seconds: scroll to the bottom of every screen and measure `button.bottom - menu.top`. This
  is the second time `--window-size` has lied; stop reaching for it.
- **A fixed element on every screen forces every screen through one painter.** `innerHTML +=`
  after a screen has wired its handlers silently kills every one of them, because the browser
  re-parses the whole subtree. The fix was a two-line `paint(html)` that appends the menu
  before the assignment, and one call to `wireMenu()` at the end of `render()`. Rewriting the
  eleven `app.innerHTML = …` statements by hand would have been a regex; the statements span
  many lines and contain `;` inside `map()` callbacks, so it took a small paren-depth scanner
  instead. Worth knowing before trying to "just sed it".
- **The safest place for a rule about content is a shape the content cannot break.** The Help
  list may never be chosen for a person by anything they entered. That is enforced not by a
  test looking for suspicious code, but by a place having exactly three fields — `name`, `url`,
  `what` — with a test that fails on a fourth. There is nowhere to hang a lane, a door or a
  score off, so the wiring cannot be added by accident later.
- **Parking the in-flight test belongs in `go()`, not in the button that prompted it.** B8 asked
  that *New worry* not bin a locked-in test. Doing it in that one handler would have left the
  same hole behind Help, behind Your worries and behind the back button. One line at the top of
  `go()` — if the destination is outside the loop, put down what you are holding — closes all
  of them, and makes the rule true by construction rather than by remembering.
- **A sweep that only walks the happy path misses the screens people are shown when something
  goes wrong.** The wordmark test walked the loop, Your worries and Help, and passed — while
  both guard refusals still said "Betr". Refusals, empty states and error text are read by
  people at their worst moment and are the least likely to be in a test. When adding a rule
  about wording, walk it into a refusal.

- **"Is this state empty enough to delete the key?" is a question that has to be revisited every
  time a field is added.** `store.isEmpty()` decides whether to write the record or remove it,
  so that a BETR nobody has used leaves nothing behind. B17 added a country, and because
  `isEmpty` had not heard of it, somebody who picked their country and did nothing else had the
  choice silently thrown away on the next save. Nothing crashed and no test failed until one was
  written that reloaded. Any new field on the state has to be added in three places, not one:
  `blank()`, `normalise()` and `isEmpty()`.
- **Generate data from the source on the machine rather than typing it.** The time zone to
  country map came out of `/usr/share/zoneinfo` — `zone.tab` plus byte-comparing the compiled
  zone files to catch the legacy aliases a browser can still return. 550 zones, forty lines of
  generator, and no possibility of a remembered mapping being wrong. The same instinct is what
  `helplines.js` bans: a number that was not read off the provider's page that day is a number
  somebody made up, however confident they were.
- **The absence of an answer is a feature and needs its own test.** `EST`, `CET` and `UTC` are
  real time zone strings a browser can hand you, and none of them names a country. The
  temptation is to map them to the US. The test that matters most in B17 is the one asserting a
  country with no checked line contains no phone number at all, because the well-meaning change
  that breaks it — "surely showing 988 is better than nothing" — will look like an improvement
  to whoever makes it.
- **A fake DOM that only indexes `[data-x]` as a list makes tests count.** The harness parsed
  data attributes into one array per attribute name, so picking one country out of 247 meant
  knowing its index. Two lines to also index each element under `[data-cc="AU"]` turned a
  brittle test into a readable one. Worth doing the moment a list gets longer than a handful.
- **A test that asserts a content string is a test that breaks when the content improves.**
  Three assertions in `loop.test.js` and `menu.test.js` had worry labels typed into them, and
  B1's rewrite broke one of them on the wording of a button, not on any behaviour the test was
  about. The walk was checking *"the drinking door opens onto the right worry"*; what it
  actually compared was a sentence. They now read the label out of `content/worries.js`, which
  is what the assertion meant all along. The rule for this repo: content lives in
  `web/content/`, so a test may read from there, and may never restate it.
- **The words render differently from how they read in the file.** Two things only showed up
  once the loop was driven at phone size: straight `"quotes"` inside a test look wrong next to
  the app's own curly apostrophes, and a test starting *"Go, order something soft"* loses the
  worry's context, because the screen it lands on says HERE'S YOUR TEST and not the label.
  Neither is catchable by `node --test`; both took one screenshot. Write the words, then look
  at them on a phone-shaped screen before calling it done.
- **A locked-in test keeps its own copy of the words, and that is correct.** Screenshotting
  after a content change showed the *old* wording, because the in-flight test had been saved
  with the text it was created from. Results and waiting tests snapshot their strings and only
  point at the id, so a person mid-test never has the sentence change under them. When checking
  a content edit in a browser, clear storage first or you are looking at yesterday's words.
- **Driving Chrome over CDP by hand: send nothing until the WebSocket handshake has come
  back.** Writing a frame before the HTTP 101 arrives makes Chrome close the connection, and
  the symptom is not an error — the script exits 0 having done nothing. Resolve a promise when
  the `\r\n\r\n` is found in the socket buffer and await it before the first `send()`. Also,
  `/json/new` needs `PUT`, not `GET`.
