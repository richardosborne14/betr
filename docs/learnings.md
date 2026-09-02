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
  `web/index.html` directly, the content had to be `content/fears.js` rather than
  `fears.json`, and the library files had to be classic scripts with a small export shim
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
