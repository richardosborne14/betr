# B58: The icon — the new colour, and something that says hope or testing

**Status:** Not started. Founder, 2026-09-15: *"We need a new PWA logo, the existing one is a weird blue thing with lines, now we need the new
colour plus something clear that represents hope or testing or a checklist or something."*
**Confidence:** —
**Date opened:** 2026-09-15
**Depends on:** B56's look (the terracotta and the paper are decided; the icon uses only those two and the marker yellow).
**Already done, 2026-09-15 (B56, branch `redesign`):** `theme_color` and `background_color` in the manifest and `<meta name="theme-color">` are `#C4532E`. The icons are not.
**Where:** `web/icon-192.png`, `web/icon-512.png`, `web/manifest.webmanifest`, `web/index.html` (the `apple-touch-icon` and `theme-color` lines),
and `web/icon.svg` as the source, committed.

## 1. Four candidates, on the canvas

The artboard **Icon** on *BETR, Bet on a Hope* (`https://claude.ai/artifact/RcR4SB27nUiW5P6PPJJBDc`) shows four, each on the terracotta, each
also at home-screen size so the founder can see which one still reads at 60px:

| | Idea | What it says |
| --- | --- | --- |
| **A** | A paper card with a bold tick | a test, done; a checklist |
| **B** | A sprout, two leaves | hope; something growing from what you wrote |
| **C** | A sunrise over a line | hope; tomorrow; "same again tomorrow" |
| **D** | A paper card with one yellow marker stroke | the app's own signature — what actually happened, in marker |

Recommendation: **D**, because it is the one thing on the screen nobody else's app has, and it is the moment the app is for. **B** if the
founder wants hope rather than method. The founder picks; none of the four is drawn from anybody else's mark.

## 2. Rules for the file

- **Flat, two colours plus the marker yellow at most.** `#C4532E` ground, `#FFF6EE` paper, `#FFE58A` marker. No gradient, no shadow, no text —
  the wordmark is not in the icon; at 60px letters are mud.
- **Maskable-safe.** Everything that matters sits inside the central circle of 80% diameter, so Android's masks (circle, squircle, rounded
  square) do not clip it. The manifest declares `"purpose": "any maskable"` on both sizes, and one plain-`any` copy if the maskable one looks
  small on iOS — iOS uses the `apple-touch-icon` and ignores `purpose`.
- **The source is `web/icon.svg`, committed**, drawn by hand in a text editor, under 2 KB. The PNGs are exported from it, never edited directly.
- **`theme_color` and `background_color` in the manifest become the terracotta** (`#C4532E`), and `<meta name="theme-color">` in `index.html`
  matches. `background_color` is what shows while the app loads on Android; the orange is right, the old off-white is not.
- The old blue icon is deleted, not kept.

## 3. Making the PNGs on this machine

There is no ImageMagick and no PIL here (learnings 2026-09-12). Two ways that exist:
1. `qlmanage -t -s 512 -o <dir> web/icon.svg` — macOS QuickLook renders an SVG to `<dir>/icon.svg.png`. Check the size with `sips -g pixelWidth`.
2. Or `tools/walk.js`: a one-line HTML page that draws the SVG at 512×512, then `shot`. It captures the whole page, so the page must be exactly
   512×512 with no margin.
Then `sips -Z 192 icon-512.png --out icon-192.png` for the small one, and a 180px copy for `apple-touch-icon` if the 192 looks soft.

## Done when

- [ ] The founder has picked one on the canvas
- [ ] `web/icon.svg` committed; `icon-192.png`, `icon-512.png` exported from it; manifest and `index.html` updated; the old files gone
- [ ] Installed to a home screen on an iPhone and an Android phone and looked at
- [ ] `hash.test.js` still green (the icons are in the build hash)
- [ ] Confidence ≥ 8/10 recorded here
