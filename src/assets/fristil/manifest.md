# Fristil asset manifest (Pass 4C)

**Asset cleanup (2026-07-22):** the `live-artister.webp` / `live-live.webp`
reserves (row below, never shipped on the page) were deleted — untracked in
git, no page dependency. Re-capture from https://www.fristilrecords.no/ if
needed again.

Evidence assets for `src/app/pages/FristilCaseStudy.tsx`. Two eras, both real and
both dated on the page: launch-era screenshots (April 2025, the pre-existing
`optimized/fristil-records-*.webp` files) and production captures taken from
https://www.fristilrecords.no/ on **2026-07-12** (headless Chromium, 1440×900 and
375×812 at 2×, resized to 1600/750 wide, WebP q82). Wireframes are the team's
Figma exports supplied 2026-07-12.

| File | Source | Content | Page placement |
|---|---|---|---|
| `wireframe-home.webp` | Supplied Figma export (1512×5071) | Full-page Hjem wireframe | Structure, FIG 03 |
| `wireframe-live.webp` | Supplied Figma export (1512×4006) | Full-page Live wireframe | Structure, FIG 03 |
| `wireframe-markedsforing.webp` | Supplied Figma export (1512×2933) | Full-page Markedsføring wireframe | Structure, FIG 03 |
| `wireframe-home-viewport.webp` | Crop of wireframe-home, top 1512×945 | First viewport, aspect-matched (1.6) to the live capture | Build pair, FIG 07 |
| `live-home.webp` | Capture 2026-07-12 | Production homepage, concert photography + logotype | Build pair, FIG 07 |
| `live-artister-grid.webp` | Capture 2026-07-12 | Artister page: photography row + Produsenter list (12 rows, one repeated pattern, yellow accent) | System, FIG 06 |
| `live-mobile-home.webp` | Capture 2026-07-12, 375px | Mobile homepage, stacked layout + menu | Build, FIG 08 |
| `live-artister.webp` / `live-live.webp` | Captures 2026-07-12 | Artister top / Live page | reserve |

## Verified facts (user answers + BAO302 + captures, 2026-07-12)

- **Team:** three-person bachelor project (BAO302 group 38); Damian's role: UX,
  UI, site build. Page states the team once in the hero.
- **Platform:** Wix with custom JavaScript; chosen with the client so they could
  update content and maintain the site themselves (BAO302 §1.2 documents the
  publishing-system evaluation).
- **Timeline:** 3 months design to launch (wireframes from ~Feb 2025 per GANTT);
  launched **April 2025**; metrics are the first measured month.
- **Metrics:** 1,783 pageviews · 789 sessions · 664 unique visitors · 2:55 avg
  session (launch month). Inquiry conversion and retention not measured.
- **Navigation at launch:** Hjem + Artister, Om oss, Markedsføring, Live
  (BAO302 §1.2 + launch-era homepage screenshot). **Navigation today
  (2026-07-12 capture):** Artister, Om oss, Live, Ledig stilling — the label
  reshaped the nav on the same templates, cited on the page as the
  scalability payoff. Nyheter (in BAO302's five-page expectation) shipped as a
  homepage/news section, not a top-level page; the page does not claim it.
- **Language note** (once, Structure intro): the site is in Norwegian.

Sites change; if a page section is re-captured, update the date here and in the
captions.

## Visual refinement pass (2026-07-17, no asset changes)

The page was restructured to the portfolio's semantic-surface template (plan doc
§4A.10): dark = hero + Visual system gallery only; Challenge/Research/Build/
Results on paper; Structure on the `--surface-paper-well` band, where the
black-filled wireframe exports read as printed proofs instead of glaring in dark
wells. No assets were added, cropped, or regenerated — this pass was staging and
conformance only (standfirst Challenge opener, raised insight cards, solid H2s at
34/44, Jakarta tabular metrics, motion reduced to hero + drawn rules, pagination
on light). The `live-artister.webp` / `live-live.webp` reserves remain unused.
