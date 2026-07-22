# Harmoni asset manifest (Pass 4B, updated after the evidence audit)

**Asset cleanup (2026-07-22):** all "superseded"/"retired" files below
(`wf-v1-home.png`, `v2-first-view.png`, `job-home.png`, `job-podcast.png`,
`job-profil.png`, `job-mood.png`, `wf-hjelp.png`, `palette-semantic.png`)
were deleted, including `wf-v1-home.png` and `basic-colors.png`/
`typography.png` which earlier notes below said to keep as provenance/crop
sources — none were tracked in git and none had a page depending on them.
Re-crop from the supplied Figma exports (see table) if any are needed again.

Derived evidence assets, cropped from the existing figma:asset exports (wireframe
composite, V2 home export, palette board, final screens) or supplied as direct
Figma frame exports. Every value quoted in captions is visible in the artifact
itself. No Figma file key is confirmed for Harmoni yet — when the connector audit
produces the node manifest (plan doc Pass 4B §2), the remaining crops can be
replaced by direct 2× frame exports with the same filenames.

| File | Source | Content | Page placement |
|---|---|---|---|
| `v1-hjem-skjerm.png` | Supplied Figma export `Hjem skjerm.png` (430×932) | V1 home wireframe: Dagens øvelse + Start, activities, support chat at equal weight | Redesign pair, "Version 1 · wireframe, tested" |
| `wf-hjelp.png` | ca1766a3… composite r1c2 | "Trenger du hjelp?" urgent support call screen (wireframe) | Retired from System |
| `palette-semantic.png` | 32c96913… rows 5–6 | Green/Success + Red/Danger scales only | Retired from System |
| `basic-colors.png` | Supplied export `Grunnleggende farger.png` | Full foundational color system: black, white, primary, grey, success, danger, warning, and info scales | System, FIG 05 |
| `typography.png` | Supplied export `Typografi.png` | Full typography system for text and button styles | System, FIG 06 |
| `onboarding.png` | (pre-existing) | Velkommen! screen | Flow step 01 |
| `wf-v1-home.png` | ca1766a3… composite r1c1 | V1 home (composite crop, black border) | superseded by `v1-hjem-skjerm.png`; kept as provenance |
| `v2-first-view.png` | 8bcf6d47… first viewport | first-viewport crop | superseded: pair now uses the full 8bcf6d47 frame (identical aspect to V1) |
| `job-home.png` / `job-podcast.png` / `job-profil.png` / `job-mood.png` | region crops | one-job regions | superseded: audit requires full uncropped frames in the experience grid |

Full frames referenced directly from figma:asset imports: V2 home (8bcf6d47),
Podcast (0a9cce5a), Profil (65a0c25c), Humør (b90a0237), IA diagram (36e7b634,
captioned as simplified, primary path only).

## Visual refinement pass (2026-07-17, existing assets only)

The framed hero pair (09863dc3, 0017b373 — 327×675, baked device frames) is
retired; the hero now stages `onboarding.png` + the V2 home frame (8bcf6d47)
flat, matching the MatSpar hero grammar. New derived crops, all from files
already in the repo (no Figma retrieval):

| File | Source region | Content | Page placement |
|---|---|---|---|
| `crop-scales.png` | basic-colors.png (60,635)–(1420,1685) | Primary, Grey, Green/Success, Red/Danger, Yellow/Warning scales (alpha + Info rows cut) | System band, FIG 06 |
| `crop-type-a.png` | typography.png (60,190)–(520,755) | Text Font header + H1–H5 specimens | System band, FIG 07 plate col 1 |
| `crop-type-b.png` | typography.png (60,770)–(520,1330) | S1–S2, B1–B4, C1–C3, LABEL specimens | FIG 07 plate col 2 |
| `crop-type-buttons.png` | typography.png (60,1370)–(520,1900) | Button Font, Giant→Tiny | FIG 07 plate col 3 |
| `crop-progresjon.png` | Profil frame 65a0c25c (8,495)–(385,735) | "Målinger for psykisk helse" cards — green Status 60% Fremgang | System band, FIG 05 (in-situ colour proof) |

The V2 home frame in the redesign pair carries two drawn accent marks
(percentage-positioned in the page, not baked into the asset): the Råd & Tips
tab that moved into the main navigation (V1 shows Hjelp venn in that slot) and
the Dagens øvelse headline. Full boards (`basic-colors.png`, `typography.png`)
are retained as crop sources only and no longer ship on the page.

Retired from the page: full wireframe composite as a single figure, full palette
board, `imgProfile` (c02c5cb0…, duplicate), `ProfilScreen`/`Group82` live component
and its `ScaledProfilScreen` wrapper (flow uses the static export).

## Terminology and metric canon (audit, 2026-07-12)

- One metric phrase everywhere: **"started without prompting"** (no "unaided",
  no bare "started first exercise").
- The relationship is stated wherever both numbers appear: V1 = 3 of 5 started
  without prompting, the other 2 hesitated; V2 = 5 of 5.
- One term for the call surface: **"urgent support"**.
- The interface language is explained once (FIG 02 caption).
- The attached DPR5100 semester document covers the Harmoni mental-health app.
  Its solution section supports the palette, typography, and accessibility
  claims used in the System chapter.
